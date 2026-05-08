export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';

import { getSupabaseAdmin } from '@/lib/supabaseServer';

const ADMIN_SECRET = 'mantrapuja-admin-keys';

function getAdmin() {
    const admin = getSupabaseAdmin();
    if (!admin) throw new Error('Supabase URL or Service Role Key is missing');
    return admin;
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    if (secret !== ADMIN_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { data, error } = await (getSupabaseAdmin()
            .from('settings')
            .select('key, value')
            .in('key', ['guru_ai_templates', 'guru_ai_instruction']) as any);

        if (error) throw error;

        // Map to object for easier consumption
        const settings = {
            templates: data?.find((s: any) => s.key === 'guru_ai_templates')?.value || '[]',
            instruction: data?.find((s: any) => s.key === 'guru_ai_instruction')?.value || ''
        };

        return NextResponse.json({ data: settings });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { secret, templates, instruction } = body;

        if (secret !== ADMIN_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const updates = [
            { key: 'guru_ai_templates', value: typeof templates === 'string' ? templates : JSON.stringify(templates) },
            { key: 'guru_ai_instruction', value: instruction }
        ];

        for (const item of updates) {
            const { error } = await getAdmin()
                .from('settings')
                .upsert(item, { onConflict: 'key' });
            
            if (error) throw error;
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
