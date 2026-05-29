export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

function getClient() {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase client not initialized");
    return supabase;
}

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

export async function GET() {
    try {
        const { data, error } = await getClient()
            .from('locations')
            .select('*')
            .eq('is_active', true)
            .order('name', { ascending: true });

        if (error) {
            console.error("Supabase Read Error:", error);
            throw error;
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        let {
            name,
            slug,
            type,
            state_id,
            description,
            x,
            y,
            size,
            images,
            content,
            seo_title,
            seo_description,
            is_active,
            secret
        } = body;

        // Webhook security
        if (!secret) {
            await getClient().from('system_logs').insert({
                event_type: 'automation',
                status: 'warning',
                message: 'Location Webhook: Missing Secret',
                details: { ip: 'unknown' }
            });
            return NextResponse.json({ error: 'Unauthorized: Secret is missing' }, { status: 401 });
        }

        if (secret !== process.env.N8N_WEBHOOK_SECRET) {
            await getClient().from('system_logs').insert({
                event_type: 'automation',
                status: 'warning',
                message: 'Location Webhook: Invalid Secret',
                details: { ip: 'unknown' }
            });
            return NextResponse.json({ error: 'Unauthorized: Invalid Secret' }, { status: 401 });
        }

        // Validation
        if (!name) {
            return NextResponse.json({ error: 'Bad Request: Missing name' }, { status: 400 });
        }

        // Auto-generate slug if missing
        if (!slug) {
            slug = generateSlug(name);
        }

        const { data, error } = await getClient()
            .from('locations')
            .upsert([
                {
                    name,
                    slug,
                    type,
                    state_id,
                    description,
                    x: x ? parseFloat(x) : null,
                    y: y ? parseFloat(y) : null,
                    size: size || 10,
                    images: images || [],
                    content: content || {},
                    seo_title: seo_title || name,
                    seo_description: seo_description || description,
                    is_active: is_active ?? true,
                    updated_at: new Date().toISOString()
                }
            ], { onConflict: 'slug' })
            .select();

        if (error) {
            console.error("Supabase Insert Error:", error);
            await getClient().from('system_logs').insert({
                event_type: 'automation',
                status: 'failed',
                message: `Location Webhook Failed: ${error.message}`,
                details: { name, slug }
            });
            throw error;
        }

        // Log Success
        await getClient().from('system_logs').insert({
            event_type: 'automation',
            status: 'success',
            message: `Location Created/Updated via Webhook: ${name}`,
            details: { id: data[0].id, slug: data[0].slug }
        });

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
