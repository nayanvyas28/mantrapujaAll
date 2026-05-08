import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

export async function POST(request: Request) {
    try {
        const supabase = getSupabaseAdmin();
        if (!supabase) throw new Error("Supabase client not initialized");

        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .insert([{ email }])
            .select();

        if (error) {
            if (error.code === '23505') {
                return NextResponse.json({ message: 'Already subscribed!' }, { status: 200 });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Successfully subscribed!', data }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
