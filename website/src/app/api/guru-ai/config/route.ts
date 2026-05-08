import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

let supabaseAdmin: ReturnType<typeof createClient> | null = null;

// Lazy initialization to avoid instantiating if not needed, and to reuse across requests
function getSupabaseAdmin() {
    if (!supabaseAdmin) {
        supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { auth: { persistSession: false } }
        );
    }
    return supabaseAdmin;
}

export async function GET() {
    try {
        const adminClient = getSupabaseAdmin();
        const { data, error } = await adminClient
            .from('settings')
            .select('key, value')
            .in('key', ['guru_ai_templates', 'guru_ai_greeting_en', 'guru_ai_greeting_hi']);

        if (error) throw error;

        const templatesStr = data?.find(s => s.key === 'guru_ai_templates')?.value || '[]';
        const greetingEn = data?.find(s => s.key === 'guru_ai_greeting_en')?.value || '';
        const greetingHi = data?.find(s => s.key === 'guru_ai_greeting_hi')?.value || '';
        
        return NextResponse.json({ 
            templates: JSON.parse(templatesStr),
            greetingEn,
            greetingHi
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
