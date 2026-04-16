import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Admin
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Normalizes phone number to 10 digits
 */
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
        const { phone } = await req.json();
        
        if (!phone) {
            return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
        }

        const cleanPhone = normalizePhone(phone);
        
        // 1. Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60000).toISOString(); // 10 minutes

        // 2. Store in Suapbase 'otps' table
        const { error: otpError } = await supabaseAdmin
            .from('otps')
            .upsert({
                phone: cleanPhone,
                otp: otp, // In a production app, this should be encrypted, but we'll follow previous pattern for now
                purpose: 'REGISTER',
                expires_at: expiresAt
            }, { onConflict: 'phone,purpose' });

        if (otpError) {
            console.error('OTP Upsert Error:', otpError);
            return NextResponse.json({ error: 'Failed to store OTP' }, { status: 500 });
        }

        // 3. Call BhashSMS API
        // Documentation parameters provided by user
        // 3. Return to client for browser-side dispatch (to bypass server network restrictions)
        const bhashConfig = {
            user: "MisCRM",
            pass: "123456",
            sender: "MisCRM",
            template: "service_rejected_hindi"
        };

        return NextResponse.json({ 
            success: true, 
            message: 'OTP generated',
            otp: otp,
            phone: cleanPhone,
            bhashConfig
        });

    } catch (err: any) {
        console.error('Send OTP Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
