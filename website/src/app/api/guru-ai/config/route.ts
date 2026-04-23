import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Admin
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
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
