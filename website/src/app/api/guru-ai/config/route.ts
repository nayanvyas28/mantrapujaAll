import { NextResponse } from 'next/server';

import { getSupabaseAdmin } from '@/lib/supabaseServer';

export async function GET() {
    try {
        const adminClient = getSupabaseAdmin();
        if (!adminClient) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });

        const { data, error } = await (adminClient
            .from('settings')
            .select('key, value')
            .in('key', ['guru_ai_templates', 'guru_ai_greeting_en', 'guru_ai_greeting_hi']) as any);

        if (error) throw error;

        const templatesStr = data?.find((s: any) => s.key === 'guru_ai_templates')?.value || '[]';
        const greetingEn = data?.find((s: any) => s.key === 'guru_ai_greeting_en')?.value || '';
        const greetingHi = data?.find((s: any) => s.key === 'guru_ai_greeting_hi')?.value || '';
        
        return NextResponse.json({ 
            templates: JSON.parse(templatesStr),
            greetingEn,
            greetingHi
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
