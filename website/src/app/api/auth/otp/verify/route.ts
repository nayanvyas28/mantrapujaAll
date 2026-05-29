import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

import { getSupabaseAdmin } from '@/lib/supabaseServer';

function getAdmin() {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase client not initialized");
    return supabase;
}


const normalizePhone = (phone: string) => {
    let cleaned = phone.replace(/[^\d]/g, '');
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
        cleaned = cleaned.substring(2);
    } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
        cleaned = cleaned.substring(1);
    }
    return cleaned;
};

export async function POST(req: Request) {
    try {
        const { phone, otp } = await req.json();
        const cleanPhone = normalizePhone(phone);
        const bridgePassword = 'Mantra@OTP#Verified2024'; // Authentication Bridge Key
        const shadowEmail = `otp_${cleanPhone}@mantrapuja.com`; // 100% reliable login identifier

        console.log('--- VERIFY OTP DEBUG ---');
        console.log('Phone:', phone, 'OTP:', otp);
        console.log('CleanPhone:', cleanPhone);
        console.log('ShadowEmail:', shadowEmail);

        if (!phone || !otp) {
            return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 });
        }

        // 1. Check OTP in table (RE-ADDED)
        const { data: otpData, error: otpError } = await getAdmin()
            .from('otps')
            .select('*')
            .eq('phone', cleanPhone)
            .eq('purpose', 'REGISTER')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (otpError || !otpData) {
            console.log('OTP Record Not Found for:', cleanPhone);
            return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
        }

        // 2. Validate OTP value and expiry
        if (otpData.otp !== otp) {
            console.log('OTP Mismatch. Expected:', otpData.otp, 'Got:', otp);
            return NextResponse.json({ error: 'Incorrect OTP' }, { status: 400 });
        }

        if (new Date(otpData.expires_at) < new Date()) {
            console.log('OTP Expired');
            return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
        }

        // 3. AUTH BRIDGE: Ensure Supabase User exists
        const formattedPhone = cleanPhone;
        const authPhonePlussed = `+91${cleanPhone}`;
        
        // Find existing user (checking both formats)
        const { data: { users: userList } } = await getAdmin().auth.admin.listUsers({ perPage: 1000 });
        console.log('Search List Count:', userList?.length || 0);
        
        const existingUser = userList?.find((u: any) => 
            u.phone === authPhonePlussed || 
            u.phone === formattedPhone || 
            u.user_metadata?.phone === formattedPhone ||
            u.user_metadata?.phone === authPhonePlussed
        );

        let userId;
        let finalAuthPhone = authPhonePlussed; // Default to plussed

        if (!existingUser) {
            console.log('User Not Found. Creating new account...');
            const { data: newUser, error: createError } = await getAdmin().auth.admin.createUser({
                phone: authPhonePlussed,
                password: bridgePassword,
                phone_confirm: true,
                user_metadata: { phone: formattedPhone, provider: 'whatsapp_otp' }
            });

            if (createError) {
                console.log('Create Error:', createError.message);
                return NextResponse.json({ error: 'Failed to create account: ' + createError.message }, { status: 500 });
            }
            userId = newUser.user.id;
            finalAuthPhone = newUser.user.phone || authPhonePlussed;
        } else {
            userId = existingUser.id;
            finalAuthPhone = existingUser.phone || authPhonePlussed;
            console.log('Existing User Found:', userId, 'Stored Phone Format:', finalAuthPhone);

            // Force update password to bridge key
            const { error: updateError } = await getAdmin().auth.admin.updateUserById(userId, {
                password: bridgePassword,
                phone_confirm: true
            });
            if (updateError) console.log('UpdateUser Error:', updateError.message);
        }

        // 4. Update Profile
        const { error: profileError } = await getAdmin()
            .from('profiles')
            .upsert({
                id: userId,
                phone: cleanPhone,
                phone_verified: true,
                updated_at: new Date().toISOString()
            }, { onConflict: 'id' });

        if (profileError) console.error('Profile sync error:', profileError);

        // 5. Cleanup OTP
        await getAdmin().from('otps').delete().eq('id', otpData.id);

        console.log('Verification Success for userId:', userId, 'Using for login:', finalAuthPhone);
        return NextResponse.json({ 
            success: true, 
            message: 'Verification successful',
            bridgePassword: bridgePassword,
            finalAuthPhone: finalAuthPhone // THE HANDSHAKE: Tell the client EXACTLY what string to use for login
        });

    } catch (err: any) {
        console.error('Verify OTP Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
