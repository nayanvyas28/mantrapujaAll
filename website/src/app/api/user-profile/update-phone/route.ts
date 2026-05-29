export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
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
        const { userId, newPhone, otp } = await req.json();

        if (!userId || !newPhone || !otp) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        const cleanPhone = normalizePhone(newPhone);
        const authPhonePlussed = `+91${cleanPhone}`;

        // 1. Verify OTP
        const { data: otpData, error: otpError } = await getAdmin()
            .from('otps')
            .select('*')
            .eq('phone', cleanPhone)
            .eq('purpose', 'REGISTER')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (otpError || !otpData) {
            return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
        }

        if (otpData.otp !== otp) {
            return NextResponse.json({ error: 'Incorrect OTP' }, { status: 400 });
        }

        if (new Date(otpData.expires_at) < new Date()) {
            return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
        }
        
        // 3. Update Supabase Auth User Identity - MERGING METADATA
        const { data: { user: currentUser } } = await getAdmin().auth.admin.getUserById(userId);
        const metadataUpdates: any = { ...(currentUser?.user_metadata || {}) };
        metadataUpdates.phone = cleanPhone;

        const { error: authError } = await getAdmin().auth.admin.updateUserById(userId, {
            phone: authPhonePlussed,
            phone_confirm: true,
            user_metadata: metadataUpdates
        });

        if (authError) {
            console.error('Auth User Update Error:', authError);
            return NextResponse.json({ error: 'This phone number may already be linked to another account' }, { status: 400 });
        }

        // 4. Update Profiles Table
        await getAdmin()
            .from('profiles')
            .update({ phone: cleanPhone })
            .eq('id', userId);

        // 5. Cleanup OTP
        await getAdmin().from('otps').delete().eq('id', otpData.id);

        return NextResponse.json({ success: true, message: 'Phone number updated successfully' }, { status: 200 });

    } catch (err: any) {
        console.error('Update Phone Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
