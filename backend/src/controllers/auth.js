const { supabase, supabaseClientAuth } = require('../utils/supabase');
const crypto = require('crypto');
const { encryptOTP, decryptOTP } = require('../utils/crypto');

// Shared bridge password for frictionless mobile handover
const AUTH_BRIDGE_PASSWORD = 'Mantra@OTP#Verified2024';

// Utility to generate 6 digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const normalizePhone = (phone) => {
    if (!phone) return '';
    // Remove all non-digits
    let cleaned = phone.replace(/[^\d]/g, '');
    
    // If it starts with 91 and is 12 digits, strip 91
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
        cleaned = cleaned.substring(2);
    } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
        // Handle leading zero
        cleaned = cleaned.substring(1);
    }
    return cleaned;
};

const sendWhatsApp = async (phone, otpCode, templateName = process.env.WHATSAPP_TEMPLATE_NAME || "service_rejected_hindi") => {
    try {
        const { data: settingsData, error: settingsError } = await supabase
            .from('admin_settings')
            .select('*');

        if (settingsError) {
            console.error('[WhatsApp Auth] Supabase Error fetching admin_settings:', settingsError.message);
            return;
        }

        if (!settingsData || settingsData.length === 0) {
            console.warn('[WhatsApp Auth] No settings found in admin_settings table.');
            return;
        }

        console.log(`[WhatsApp Auth] Found ${settingsData.length} settings in admin_settings.`);

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
    console.log(`[AuthDebug] POST /register - Request Body:`, JSON.stringify(req.body));
    const rawPhone = req.body.phone;
    const phone = normalizePhone(rawPhone);

    try {
        const { password, full_name, email } = req.body;
        console.log(`[AuthDebug] initiateRegister: phone=${phone}, email=${email}, full_name=${full_name}`);

        if (!phone) {
            return res.status(400).json({ error: 'Phone is required' });
        }

        // 1. Check if user already exists in `profiles` and is verified
        console.log(`[Register] Checking existing profile for: ${phone}`);
        const { data: profileCheck, error: profileError } = await supabase
            .from('profiles')
            .select('id, phone, email, phone_verified')
            .or(`phone.eq.${phone},phone.eq.+91${phone},phone.eq.91${phone}${email ? `,email.eq.${email}` : ''}`)
            .maybeSingle();

        if (profileError) {
            console.error('[Register] Profile check error:', profileError);
            throw profileError;
        }

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
                console.error('[Register] Unverified User Upsert Error:', uvError);
                return res.status(500).json({ error: 'Failed to initiate registration: DB Error' });
            }
        }

        // 3. Generate and store OTP
        const otp = generateOTP();
        const otpExpiresAt = new Date(Date.now() + 60 * 60000).toISOString(); // 1 Hour

        console.log(`[Register] Generating OTP for ${phone}`);

        console.log(`\n[TESTING] OTP for ${phone} (REGISTER): ${otp}\n`);

        const { error: otpError } = await supabase
            .from('otps')
            .upsert(
                { phone, otp: encryptOTP(otp), purpose: 'REGISTER', expires_at: otpExpiresAt },
                { onConflict: 'phone,purpose' } // Assumes unique constraint on phone+purpose
            );

        if (otpError) {
            console.error('[Register] OTP Store Error:', otpError);
            return res.status(500).json({ error: 'Failed to generate OTP: ' + otpError.message });
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
    console.log(`[Auth] POST /verify-otp - Request Body:`, JSON.stringify(req.body));
    try {
        const { otp, purpose } = req.body;
        const phone = normalizePhone(req.body.phone);

        if (!phone || !otp || !purpose) {
            return res.status(400).json({ error: 'Phone, OTP, and Purpose are required' });
        }

        // 1. Fetch encrypted OTP based purely on phone and purpose
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
        const dateToParse = (typeof rawExpiry === 'string' && !rawExpiry.includes('Z') && !rawExpiry.includes('+')) 
            ? rawExpiry + 'Z' 
            : rawExpiry;
        const expiryTime = new Date(dateToParse).getTime();

        if (expiryTime < now) {
            return res.status(400).json({ error: 'This OTP has expired' });
        }

        // 2. Handle Purpose Logic
        if (purpose === 'REGISTER') {
            const passwordToUse = req.body.password || AUTH_BRIDGE_PASSWORD;
            
            // Masked phone as a unique default name
            const maskedPhone = phone.length > 4 ? `+91 ******${phone.slice(-4)}` : phone;

            if (!req.body.password && !req.body.is_handshake) {
                return res.status(200).json({ message: 'OTP Verified successfully', verified: true, allow_details: true });
            }

            // Fetch unverified user data
            const { data: uvUser } = await supabase
                .from('unverified_users')
                .select('*')
                .eq('phone', phone)
                .single();

            // 2.A) Ensure Supabase Auth User exists
            let { data: authData, error: authError } = await supabase.auth.admin.createUser({
                phone: phone, 
                email: uvUser?.email || undefined,
                password: passwordToUse,
                phone_confirm: true,
                user_metadata: {
                    full_name: uvUser?.full_name || maskedPhone,
                    provider: 'phone_otp'
                }
            });

            const isConflict = authError && (
                authError.message.toLowerCase().includes("exists") || 
                authError.message.toLowerCase().includes("already") ||
                authError.status === 422
            );

            if (isConflict) {
                const { data: userList } = await supabase.auth.admin.listUsers({ perPage: 1000 });
                const phonesMatch = (p1, p2) => {
                    const clean = (p) => p?.replace(/[^\d]/g, '') || '';
                    return clean(p1).endsWith(clean(p2)) || clean(p2).endsWith(clean(p1));
                };

                const existingUser = userList?.users?.find(u => phonesMatch(u.phone, phone));

                if (existingUser) {
                    await supabase.auth.admin.updateUserById(existingUser.id, {
                        password: passwordToUse,
                        phone_confirm: true,
                        user_metadata: {
                            // Only update name if it was never set
                            full_name: existingUser.user_metadata?.full_name || uvUser?.full_name || maskedPhone
                        }
                    });
                    authData = { user: existingUser };
                    authError = null;
                }
            }

            if (authError) return res.status(500).json({ error: authError.message });

            const finalUser = authData.user;
            const finalPhoneStr = finalUser.phone || `+91${phone}`;

            // Sync Profile
            await supabase.from('profiles').upsert({
                id: finalUser.id,
                phone: phone,
                email: uvUser?.email || finalUser.email,
                phone_verified: true,
                full_name: uvUser?.full_name || finalUser.user_metadata?.full_name,
            }, { onConflict: 'id' });

            // Cleanup
            await supabase.from('unverified_users').delete().eq('phone', phone);
            await supabase.from('otps').delete().eq('id', otpData.id);

            return res.status(200).json({ 
                message: 'Registration complete', 
                verified: true, 
                bridgePassword: AUTH_BRIDGE_PASSWORD,
                finalAuthPhone: finalPhoneStr 
            });

        } else if (purpose === 'RESET_PASSWORD' || purpose === 'LOGIN_VERIFICATION') {
            // Force Bridge Handshake for Login/Reset
            const { data: userList } = await supabase.auth.admin.listUsers({ perPage: 1000 });
            const phonesMatch = (p1, p2) => {
                const clean = (p) => p?.replace(/[^\d]/g, '') || '';
                return clean(p1).endsWith(clean(p2)) || clean(p2).endsWith(clean(p1));
            };
            const existingUser = userList?.users?.find(u => phonesMatch(u.phone, phone));

            if (existingUser) {
                await supabase.auth.admin.updateUserById(existingUser.id, {
                    password: AUTH_BRIDGE_PASSWORD,
                    phone_confirm: true
                });

                await supabase.from('profiles').update({ phone_verified: true }).eq('id', existingUser.id);
            }

            await supabase.from('otps').delete().eq('id', otpData.id);
            
            return res.status(200).json({ 
                message: 'OTP Verified. Handshake ready.', 
                otp_verified: true, 
                verified: true,
                bridgePassword: AUTH_BRIDGE_PASSWORD,
                finalAuthPhone: existingUser?.phone || phone
            });
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
        const phone = normalizePhone(req.body.phone);
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
        const phone = normalizePhone(req.body.phone);
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
        const { otp } = req.body;
        const phone = normalizePhone(req.body.phone);

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

        console.log(`[OTP Verification] phone=${phone} purpose=LOGIN_VERIFICATION stored=${rawExpiry} parsed=${new Date(expiryTime).toISOString()} now=${new Date(now).toISOString()}`);

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
    console.log(`[AuthDebug] GET /check-user - Query:`, JSON.stringify(req.query));
    try {
        const phone = normalizePhone(req.query.phone);
        if (!phone) {
            console.warn(`[AuthDebug] checkUser: No phone provided`);
            return res.status(400).json({ error: 'Phone number required' });
        }

        console.log(`[AuthDebug] checkUser: looking up phone ${phone}`);

        // 1. Check in Profiles table (Fast)
        const { data, error } = await supabase
            .from('profiles')
            .select('id, phone_verified')
            .or(`phone.eq.${phone},phone.eq.+91${phone},phone.eq.91${phone}`)
            .maybeSingle();

        if (error && error.code !== 'PGRST116') {
             console.error('[AuthDebug] [CheckUser] Profiles Error:', error.message, 'Code:', error.code, 'Status:', error.status);
        }

        if (data) {
            return res.status(200).json({
                exists: true,
                verified: data.phone_verified || false,
                source: 'profiles'
            });
        }

        // 2. Fallback: Check in Auth Users (Slow but thorough for missing profiles)
        try {
            const { data: userList } = await supabase.auth.admin.listUsers({ perPage: 1000 });
            
            const phonesMatch = (p1, p2) => {
                if (!p1 || !p2) return false;
                const clean = (p) => p.replace(/[^\d]/g, '');
                return clean(p1).endsWith(clean(p2)) || clean(p2).endsWith(clean(p1));
            };

            const existingAuthUser = userList?.users?.find(u => phonesMatch(u.phone, phone));

            if (existingAuthUser) {
                return res.status(200).json({
                    exists: true,
                    verified: existingAuthUser.phone_confirmed_at ? true : false,
                    source: 'auth'
                });
            }
        } catch (authError) {
            console.error('[CheckUser] Auth List Error:', authError.message);
        }

        return res.status(200).json({
            exists: false,
            verified: false
        });
    } catch (err) {
        console.error('Check User Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { userId, full_name, email, dob, location, address } = req.body;
        if (!userId) return res.status(400).json({ error: 'User ID is required' });

        const updateData = {};
        if (full_name) updateData.full_name = full_name;
        if (email) updateData.email = email;
        if (dob) updateData.dob = dob;
        if (location) updateData.location = location;
        if (address) updateData.address = address;

        // 1. Update Profiles table
        const { error: profileError } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', userId);

        if (profileError) {
            console.error('[UpdateProfile] Profile Error:', profileError);
            return res.status(500).json({ error: 'Failed to update profiles table' });
        }

        // 2. Update Supabase Auth User Metadata (if name or email changed)
        if (full_name || email) {
            const authData = {};
            if (full_name) authData.data = { full_name };
            if (email) authData.email = email;

            const { error: authError } = await supabase.auth.admin.updateUserById(userId, authData);
            if (authError) {
                console.warn('[UpdateProfile] Auth Update Warning:', authError.message);
                // We don't return 500 here because the profiles table is updated
            }
        }

        return res.status(200).json({ message: 'Profile updated successfully', success: true });
    } catch (err) {
        console.error('Update Profile Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    initiateRegister,
    verifyOtp,
    initiateForgotPassword,
    checkLoginVerification,
    verifyLoginAuth,
    checkUser,
    updateProfile
};
