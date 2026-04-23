import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { action, id, pujaData, summaryData } = body;

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
                const { error } = await supabaseAdmin.from('poojas').update(pujaData).eq('id', id);
                if (error) throw error;
            } else {
                // Insert
                const { data, error } = await supabaseAdmin.from('poojas').insert(pujaData).select().single();
                if (error) throw error;
                activeId = data.id;
            }

            // Also update summary
            if (summaryData && activeId) {
                const { error: summaryError } = await supabaseAdmin
                    .from('pooja_payment_summaries')
                    .upsert({
                        pooja_id: activeId,
                        ...summaryData
                    }, { onConflict: 'pooja_id' });
                
                if (summaryError) {
                    console.warn('[Pujas API] Summary update failed (Non-critical):', summaryError);
                }
            }
        } else if (action === 'delete') {
            if (!id) throw new Error('ID required for delete');
            const { error } = await supabaseAdmin.from('poojas').delete().eq('id', id);
            if (error) throw error;
        }

        return NextResponse.json({ success: true, id: activeId });
    } catch (error: any) {
        console.error('[Pujas API Error]:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
