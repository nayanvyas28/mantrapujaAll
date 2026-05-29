import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

export async function POST(request: Request) {
    try {
        const supabase = getSupabaseAdmin();
        if (!supabase) throw new Error("Supabase client not initialized");

        const { name, email, message, subject, user_id } = await request.json();

        if (!email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('contact_inquiries')
            .insert([{ 
                name, 
                email, 
                message, 
                subject: subject || 'General Inquiry',
                status: 'pending',
                user_id: user_id || null
            }])
            .select();

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Inquiry received successfully!', data }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
