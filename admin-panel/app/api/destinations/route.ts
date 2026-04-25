import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, id, locationData } = body;

        if (!action) {
            return NextResponse.json({ error: 'Missing action' }, { status: 400 });
        }

        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        let activeId = id;

        if (action === 'save') {
            if (id) {
                // Update
                const { error } = await supabaseAdmin.from('destinations').update(locationData).eq('id', id);
                if (error) throw error;
            } else {
                // Insert
                const { data, error } = await supabaseAdmin.from('destinations').insert(locationData).select().single();
                if (error) throw error;
                activeId = data.id;
            }
        } else if (action === 'delete') {
            if (!id) throw new Error('ID required for delete');
            const { error } = await supabaseAdmin.from('destinations').delete().eq('id', id);
            if (error) throw error;
        }

        return NextResponse.json({ success: true, id: activeId });
    } catch (error: any) {
        console.error('[Destinations API Error]:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
