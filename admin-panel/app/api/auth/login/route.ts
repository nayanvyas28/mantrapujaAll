import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    console.log('[Login Bridge] Received POST request');
    try {
        const body = await request.json();
        const { email, password } = body;
        console.log(`[Login Bridge] Attempting login for: ${email}`);

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const supabase = await createClient();
        console.log('[Login Bridge] Supabase client created');

        // Perform login on the server side to bypass CORS
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('[Login Bridge] Supabase error:', error.message);
            return NextResponse.json({ error: error.message }, { status: error.status || 400 });
        }

        console.log('[Login Bridge] Login successful');
        return NextResponse.json({ data });
    } catch (error: any) {
        console.error('[Login Bridge] Unexpected error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
