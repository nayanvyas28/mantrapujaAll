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

        const { error } = await supabase
            .from('newsletter_subscribers')
            .delete()
            .eq('email', email);

        if (error) throw error;

        return NextResponse.json({ message: 'Successfully unsubscribed!' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
