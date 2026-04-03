const { supabase, supabaseClientAuth } = require('../utils/supabase');
const crypto = require('crypto');
const { encryptOTP, decryptOTP } = require('../utils/crypto');

// Utility to generate 6 digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendWhatsApp = async (phone, otpCode, templateName = process.env.WHATSAPP_TEMPLATE_NAME || "service_rejected_hindi") => {
    try {
        const { data: settingsData, error: settingsError } = await supabase
            .from('admin_settings')
            .select('*');

        if (settingsError || !settingsData || settingsData.length === 0) {
            console.warn('[WhatsApp Auth] Missing WhatsApp API credentials in admin_settings table.');
            return;
        }

        // Decrypt all settings into a config object
        const config = {};
        for (const row of settingsData) {
            config[row.setting_key] = decryptOTP(row.encrypted_value);
        }

        const baseUrl = config['WHATSAPP_API_URL'];
        const token = config['WHATSAPP_ACCESS_TOKEN'];
        const phoneId = config['WHATSAPP_PHONE_NUMBER_ID'];
        const template = config['WHATSAPP_TEMPLATE_NAME'] || templateName;

        // Determine if we are using the Meta/Graph API (specified in docs) or the previous provider
        if (phoneId && token) {
            // --- Meta WhatsApp Business API Flow ---
            const url = `${baseUrl}/${phoneId}/messages`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: phone,
                    type: "template",
                    template: {
                        name: template,
                        language: { code: "en_US" },
                        components: [
                            {
                                type: "body",
                                parameters: [
                                    { type: "text", text: String(otpCode) }
                                ]
                            }
                        ]
                    }
                })
            });
            const responseData = await response.json();
            console.log(`[WhatsApp Auth] Meta API Success:`, responseData);

        } else {
            // --- Legacy / Generic Provider Flow (BhashSMS style) ---
            const user = config['WHATSAPP_API_USER'];
            const pass = config['WHATSAPP_API_PASS'];
            const sender = config['WHATSAPP_API_SENDER'];

            if (!baseUrl || !user || !pass || !sender) {
                console.warn('[WhatsApp Auth] Missing required configuration for generic WhatsApp provider.');
                return;
            }

            const url = `${baseUrl}?user=${user}&pass=${pass}&sender=${sender}&phone=${phone}&text=${template}&priority=wa&stype=normal&Params=${otpCode},OTP`;
            const response = await fetch(url);
            const responseTxt = await response.text();
            console.log(`[WhatsApp Auth] Legacy Provider Success for ${phone}:`, responseTxt);
        }

    } catch (error) {
        console.error(`[WhatsApp Auth] Failed to send message to ${phone}:`, error.message || error);
    }
};

/**
 * Endpoint to start User Registration.
 * Creates an entry in `unverified_users` temporarily with an OTP, rather than cluttering Supabase Auth.
 */
const initiateRegister = async (req, res) => {
    try {
        const { phone, password, full_name, email } = req.body;

        if (!phone) {
            return res.status(400).json({ error: 'Phone is required' });
        }

        // 1. Check if user already exists in `profiles` and is verified
        const { data: profileCheck } = await supabase
            .from('profiles')
            .select('id, phone, email, phone_verified')
            .or(`phone.eq.${phone},phone.eq.+91${phone}${email ? `,email.eq.${email}` : ''}`)
            .maybeSingle();

        if (profileCheck && profileCheck.phone_verified) {
            console.log(`[Register] Verified profile already exists for ${phone}/${email}. Redirecting to login.`);
            return res.status(400).json({ 
                error: 'An account with this phone or email already exists. Please log in.',
                exists: true,
                verified: true
            });
        }

        // 2. Proactive Supabase Auth Check (Search by phone and email)
        // This handles users who exist in Auth but were never added to Profiles (trigger failure/interrupted reg)
        try {
            const { data: userList } = await supabase.auth.admin.listUsers({ perPage: 1000 });
            
            const phonesMatch = (p1, p2) => {
                if (!p1 || !p2) return false;
                const clean = (p) => p.replace(/[^\d]/g, '');
                return clean(p1).endsWith(clean(p2)) || clean(p2).endsWith(clean(p1));
            };

            const existingAuthUser = userList?.users?.find(u => 
                phonesMatch(u.phone, phone) || 
                (email && u.email?.toLowerCase() === email.toLowerCase())
            );

            if (existingAuthUser) {
                // If it's the SAME phone, we allow them to proceed to OTP to "bridge" or "re-verify"
                // But if it's a DIFFERENT phone for the same email, it's a conflict!
                if (email && existingAuthUser.email?.toLowerCase() === email.toLowerCase() && !phonesMatch(existingAuthUser.phone, phone)) {
                    return res.status(400).json({ error: 'This email is already registered with a different phone number.' });
                }
                
                // If they exist in Auth but not in Profiles, we proceed but log it
                console.log(`[Register] User ${phone} found in Auth but missing/unverified in Profiles. Proceeding to bridge.`);
            }
        } catch (authLookError) {
            console.error("[Register] Auth list check failed:", authLookError);
            // We ignore errors here and proceed anyway
        }

        // 2. Insert or Update into unverified_users table (ONLY if details are provided)
        if (password) {
            const expiresAt = new Date(Date.now() + 15 * 60000).toISOString(); // 15 mins
            const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

            const { error: uvError } = await supabase
                .from('unverified_users')
                .upsert(
                    { phone, full_name, email, password_hash: passwordHash, expires_at: expiresAt },
                    { onConflict: 'phone' }
                );

            if (uvError) {
                console.error(uvError);
                return res.status(500).json({ error: 'Failed to initiate registration' });
            }
        }

        // 3. Generate and store OTP
        const otp = generateOTP();
        const otpExpiresAt = new Date(Date.now() + 60 * 60000).toISOString(); // 1 Hour

        console.log(`\n[TESTING] OTP for ${phone} (REGISTER): ${otp}\n`);

        const { error: otpError } = await supabase
            .from('otps')
            .upsert(
                { phone, otp: encryptOTP(otp), purpose: 'REGISTER', expires_at: otpExpiresAt },
                { onConflict: 'phone,purpose' } // Assumes unique constraint on phone+purpose
            );

        if (otpError) {
            console.error(otpError);
            return res.status(500).json({ error: 'Failed to generate OTP' });
        }

        // 4. Send Real OTP via WhatsApp API in the BACKGROUND
        // We do NOT await this because we want to respond to the app INSTANTLY.
        sendWhatsApp(phone, otp).catch(e => console.error("Background OTP send failed:", e));

        console.log(`[Register] Responding to client instantly while OTP sends for ${phone}`);
        return res.status(200).json({ message: 'OTP Sent successfully', purpose: 'REGISTER' });

    } catch (err) {
        console.error('Register Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Verify OTP Endpoint wrapper for both REGISTER and RESET_PASSWORD
 */
const verifyOtp = async (req, res) => {
    try {
        const { phone, otp, purpose } = req.body;

        if (!phone || !otp || !purpose) {
            return res.status(400).json({ error: 'Phone, OTP, and Purpose are required' });
        }

        // 1. Fetch encrypted OTP based purely on phone and purpose (without filtering by plain-text OTP securely stored)
        const { data: otpData, error: otpError } = await supabase
            .from('otps')
            .select('*')
            .eq('phone', phone)
            .eq('purpose', purpose)
            .single();

        if (otpError || !otpData) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        const decryptedOTP = decryptOTP(otpData.otp);

        if (!decryptedOTP || decryptedOTP !== otp) {
            return res.status(400).json({ error: 'Invalid OTP provided' });
        }

        const rawExpiry = otpData.expires_at;
        const now = Date.now();
        // If the date string doesn't have Z or + (common with some DB drivers), append Z to force UTC parsing
        const dateToParse = (typeof rawExpiry === 'string' && !rawExpiry.includes('Z') && !rawExpiry.includes('+')) 
            ? rawExpiry + 'Z' 
            : rawExpiry;
        const expiryTime = new Date(dateToParse).getTime();

        console.log(`[OTP Verification] phone=${phone} purpose=${purpose} stored=${rawExpiry} parsed=${new Date(expiryTime).toISOString()} now=${new Date(now).toISOString()}`);

        if (expiryTime < now) {
            return res.status(400).json({ error: 'This OTP has expired' });
        }

        // 2. Handle Purpose Logic
        if (purpose === 'REGISTER') {
            // In our new flow, if we are just verifying the OTP (Step 1 -> Step 3),
            // there won't be an unverified_user entry yet.
            if (!req.body.password) {
                return res.status(200).json({ message: 'OTP Verified successfully', verified: true, allow_details: true });
            }

            // Fetch unverified user data (only if we are trying to finalize reg)
            const { data: uvUser } = await supabase
                .from('unverified_users')
                .select('*')
                .eq('phone', phone)
                .single();

            if (!uvUser) {
                return res.status(400).json({ error: 'Registration request expired or not found' });
            }

            // 2.A) Create Supabase Auth User
            let { data: authData, error: authError } = await supabase.auth.admin.createUser({
                phone: phone, 
                email: uvUser.email || undefined,
                password: req.body.password,
                phone_confirm: true,
                user_metadata: {
                    full_name: uvUser.full_name,
                    provider: 'phone'
                }
            });

            // Handle Recovery if User already exists (idempotent registration)
            // Broader check for "already exists" patterns
            const isConflict = authError && (
                authError.message.toLowerCase().includes("exists") || 
                authError.message.toLowerCase().includes("already") ||
                authError.code === '23505' || // Postgres unique constraint
                authError.status === 422
            );

            if (isConflict) {
                console.log(`[Verify] Auth conflict detected for ${phone}. Attempting recovery/bridge. Error: ${authError.message}`);
                
                // Helper to check if phone numbers match regardless of + prefix
                const phonesMatch = (p1, p2) => {
                    if (!p1 || !p2) return false;
                    const clean = (p) => p.replace(/[^\d]/g, '');
                    const c1 = clean(p1);
                    const c2 = clean(p2);
                    return (c1 && c2) && (c1.endsWith(c2) || c2.endsWith(c1));
                };

                // Fetch users with a larger limit to ensure we find the existing user
                // If the user count grows beyond 1000, we might need true pagination, but this covers most cases.
                const { data: userList, error: listError } = await supabase.auth.admin.listUsers({
                    perPage: 1000
                });

                if (listError) console.error("[Verify] listUsers failed:", listError);

                const existingUser = userList?.users?.find(u => 
                    phonesMatch(u.phone, phone) || 
                    (uvUser.email && u.email?.toLowerCase() === uvUser.email.toLowerCase())
                );

                if (existingUser) {
                    console.log(`[Verify] Found existing Auth user ${existingUser.id} during recovery for ${phone}`);
                    // Security Check: If email exists but phone doesn't match, it's a conflict!
                    if (existingUser.phone && !phonesMatch(existingUser.phone, phone)) {
                         console.warn(`[Verify] Recovery Conflict: Email ${uvUser.email} belongs to ${existingUser.phone}, not ${phone}`);
                         return res.status(400).json({ error: 'This email is already associated with a different phone number.' });
                    }
                    authData = { user: existingUser };
                    authError = null;
                } else {
                    console.warn(`[Verify] Recovery failed: User ${phone}/${uvUser.email} not found in Auth list despite error.`);
                }
            }

            // Handle Bridge Fallback natively using Admin if Phone fails (Standard bridge logic)
            let finalUser = authData?.user;
            if (authError && authError.message.toLowerCase().includes("phone")) {
                console.log("Falling back to email-phone bridge (ADMIN API)");
                const bridgeEmail = uvUser.email || `${phone}@mantrapooja.auth`;
                const bridgeFallback = await supabase.auth.admin.createUser({
                    email: bridgeEmail,
                    password: req.body.password,
                    email_confirm: true,
                    user_metadata: {
                        phone: phone,
                        full_name: uvUser.full_name,
                        provider: 'phone'
                    }
                });
                if (bridgeFallback.error) {
                    return res.status(500).json({ error: bridgeFallback.error.message });
                }
                finalUser = bridgeFallback.data.user;
            } else if (authError) {
                return res.status(500).json({ error: authError.message });
            }

            // Make sure profile exists and lists phone_verified
            // USE UPSERT: This handles cases where the auth row exists but profile creation trigger failed or was missed.
            const { error: profileSyncError } = await supabase.from('profiles').upsert({
                id: finalUser.id,
                phone: phone,
                email: uvUser.email || finalUser.email,
                phone_verified: true,
                full_name: uvUser.full_name || finalUser.user_metadata?.full_name,
            }, { onConflict: 'id' });

            if (profileSyncError) {
                console.error(`[Verify] Profile Sync Failed for ${finalUser.id}:`, profileSyncError);
                // We don't return 500 here because the Auth account IS created/verified, 
                // but this might cause login issues later if profiles table is empty.
            }

            // Cleanup
            await supabase.from('unverified_users').delete().eq('phone', phone);
            await supabase.from('otps').delete().eq('id', otpData.id);

            // Log them in natively to return Session via client library trick or just tell frontend to call standard login
            return res.status(200).json({ message: 'Registration complete', verified: true, next_step: 'login' });

        } else if (purpose === 'RESET_PASSWORD') {
            // For Password Reset, simply issue a temporary verified token or tell frontend to set new password NOW

            if (!req.body.new_password) {
                // Return success so frontend can show "Enter New Password" input
                return res.status(200).json({ message: 'OTP Verified. Proceed to reset.', otp_verified: true, otp_id: otpData.id });
            }

            // If frontend passes new_password, perform reset
            // 1. Fetch user by phone in profiles
            const { data: profileData } = await supabase.from('profiles').select('id, email').eq('phone', phone).single();
            if (!profileData) {
                return res.status(404).json({ error: 'User not found in profiles' });
            }

            const { error: resetError } = await supabase.auth.admin.updateUserById(
                profileData.id,
                { password: req.body.new_password }
            );

            if (resetError) {
                return res.status(500).json({ error: 'Failed to reset password: ' + resetError.message });
            }

            // Delete OTP and return
            await supabase.from('otps').delete().eq('id', otpData.id);
            return res.status(200).json({ message: 'Password reset successful', verified: true });
        }


    } catch (err) {
        console.error('Verify OTP Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


/**
 * Endpoint to initiate Forgot Password Flow
 */
const initiateForgotPassword = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ error: 'Phone is required' });

        // 1. Check if user exists
        const { data: profileCheck } = await supabase
            .from('profiles')
            .select('id, phone_verified')
            .eq('phone', phone)
            .single();

        if (!profileCheck) {
            return res.status(404).json({ error: 'No account found with this phone number' });
        }

        // Optional: Block reset if phone is not verified
        // if(!profileCheck.phone_verified) {
        //   // But we can verify them implicitly doing reset! We'll just update it later
        // }

        // 2. Generate and store OTP
        const otp = generateOTP();
        const otpExpiresAt = new Date(Date.now() + 60 * 60000).toISOString(); // 1 Hour

        console.log(`\n[TESTING] OTP for ${phone} (RESET_PASSWORD): ${otp}\n`);

        const { error: otpError } = await supabase
            .from('otps')
            .upsert(
                { phone, otp: encryptOTP(otp), purpose: 'RESET_PASSWORD', expires_at: otpExpiresAt },
                { onConflict: 'phone,purpose' }
            );

        if (otpError) {
            console.error('OTP Upsert Error', otpError)
            return res.status(500).json({ error: 'Failed to generate Reset OTP' });
        }

        // 3. Send Real OTP via WhatsApp API
        await sendWhatsApp(phone, otp);

        return res.status(200).json({ message: 'Reset OTP Sent successfully', purpose: 'RESET_PASSWORD' });


    } catch (err) {
        console.error('Forget Password Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Standard Login pre-check to ensure phone is verified
 */
const checkLoginVerification = async (req, res, next) => {
    try {
        const { phone } = req.body;
        if (!phone) return next();

        const { data: profileCheck } = await supabase
            .from('profiles')
            .select('id, phone_verified')
            .eq('phone', phone)
            .single();

        if (profileCheck && profileCheck.phone_verified === false) {
            // User exists but isn't verified. Tell frontend it needs verification.

            // We can auto-gen an OTP here!
            const otp = generateOTP();
            const otpExpiresAt = new Date(Date.now() + 60 * 60000).toISOString(); // 1 Hour

            await supabase
                .from('otps')
                .upsert(
                    { phone, otp: encryptOTP(otp), purpose: 'LOGIN_VERIFICATION', expires_at: otpExpiresAt },
                    { onConflict: 'phone,purpose' }
                );

            await sendWhatsApp(phone, otp);

            return res.status(403).json({
                error: 'unverified',
                message: 'Your phone number is not verified. An OTP has been sent.',
                purpose: 'LOGIN_VERIFICATION'
            });
        }

        // Pass to normal login or next route if this was a middleware
        next();
    } catch (e) {
        console.error('Check Login Error:', e);
        next();
    }
}

// Dedicated Verify for the pre-check flow
const verifyLoginAuth = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        const { data: otpData, error: otpError } = await supabase
            .from('otps')
            .select('*')
            .eq('phone', phone)
            .eq('purpose', 'LOGIN_VERIFICATION')
            .single();

        if (otpError || !otpData) return res.status(400).json({ error: 'Invalid or expired OTP' });

        const decryptedOTP = decryptOTP(otpData.otp);

        if (!decryptedOTP || decryptedOTP !== otp) {
            return res.status(400).json({ error: 'Invalid OTP provided' });
        }

        const rawExpiry = otpData.expires_at;
        const now = Date.now();
        // If the date string doesn't have Z or + (common with some DB drivers), append Z to force UTC parsing
        const dateToParse = (typeof rawExpiry === 'string' && !rawExpiry.includes('Z') && !rawExpiry.includes('+')) 
            ? rawExpiry + 'Z' 
            : rawExpiry;
        const expiryTime = new Date(dateToParse).getTime();

        console.log(`[OTP Verification] phone=${phone} purpose=${purpose} stored=${rawExpiry} parsed=${new Date(expiryTime).toISOString()} now=${new Date(now).toISOString()}`);

        if (expiryTime < now) {
            return res.status(400).json({ error: 'This OTP has expired' });
        }

        // Mark as verified
        const { data: profileData } = await supabase.from('profiles').select('id').eq('phone', phone).single();
        if (profileData) {
            await supabase.from('profiles').update({ phone_verified: true }).eq('id', profileData.id);
        }

        await supabase.from('otps').delete().eq('id', otpData.id);

        return res.status(200).json({ message: 'Phone verified successfully. Please log in again.', verified: true });

    } catch (e) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


const checkUser = async (req, res) => {
    try {
        const { phone } = req.query;
        if (!phone) return res.status(400).json({ error: 'Phone number required' });

        const { data, error } = await supabase
            .from('profiles')
            .select('id, phone_verified')
            .or(`phone.eq.${phone},phone.eq.+91${phone}`)
            .maybeSingle();

        if (error && error.code !== 'PGRST116') {
             return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({
            exists: !!data,
            verified: data?.phone_verified || false
        });
    } catch (err) {
        console.error('Check User Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const finalizeRegister = async (req, res) => {
    try {
        const { phone, password, full_name, email } = req.body;

        if (!phone || !password || !full_name) {
            return res.status(400).json({ error: 'Phone, password, and full name are required' });
        }

        // 1. Check if user already exists (idempotent check)
        const { data: profileCheck } = await supabase
            .from('profiles')
            .select('id')
            .or(`phone.eq.${phone},phone.eq.+91${phone}`)
            .maybeSingle();

        // We don't error out here if profile exists. 
        // We let the logic proceed to ensure auth is synced and profile is upserted.

        // 2. Create or Find Supabase Auth User
        let { data: authData, error: authError } = await supabase.auth.admin.createUser({
            phone: phone,
            email: email || undefined,
            password: password,
            phone_confirm: true,
            user_metadata: {
                full_name: full_name,
                provider: 'phone'
            }
        });

        const isConflict = authError && (
            authError.message.toLowerCase().includes("exists") || 
            authError.message.toLowerCase().includes("already") ||
            authError.code === '23505' ||
            authError.status === 422
        );

        let finalUser = authData?.user;

        if (isConflict) {
            console.log(`[FinalizeRegister] Auth conflict detected for ${phone}. Attempting recovery/bridge.`);
            const { data: userList } = await supabase.auth.admin.listUsers({ perPage: 1000 });
            
            const phonesMatch = (p1, p2) => {
                if (!p1 || !p2) return false;
                const clean = (p) => p.replace(/[^\d]/g, '');
                return clean(p1).endsWith(clean(p2)) || clean(p2).endsWith(clean(p1));
            };

            const existingUser = userList?.users?.find(u => phonesMatch(u.phone, phone));
            
            if (existingUser) {
                finalUser = existingUser;
                authError = null;
                // Also update password if they are here
                await supabase.auth.admin.updateUserById(existingUser.id, { password: password });
            }
        }

        if (authError) {
            return res.status(500).json({ error: authError.message });
        }

        if (!finalUser) {
            return res.status(500).json({ error: 'Failed to create or find user.' });
        }

        // 3. Create Profile
        const { error: profileError } = await supabase.from('profiles').upsert({
            id: finalUser.id,
            phone: phone,
            email: email || finalUser.email,
            phone_verified: true,
            full_name: full_name || finalUser.user_metadata?.full_name,
        }, { onConflict: 'id' });

        if (profileError) {
            console.error('[FinalizeRegister] Profile sync error:', profileError);
        }

        return res.status(200).json({ message: 'Registration complete', verified: true });

    } catch (err) {
        console.error('Finalize Register Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    initiateRegister,
    verifyOtp,
    initiateForgotPassword,
    checkLoginVerification,
    verifyLoginAuth,
    checkUser,
    finalizeRegister
};
