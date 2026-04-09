
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin client (Service Role)
// This bypasses RLS policies, which is fine for fetching public navigation data.
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        auth: {
            persistSession: false
        }
    }
);

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

export async function GET() {
    console.log("API /api/categories hit");
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error("CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing");
        return NextResponse.json({ error: "Server misconfiguration: Missing Service Key" }, { status: 500 });
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('categories')
            .select('*')
            .order('order', { ascending: true });

        if (error) {
            console.error("Supabase API Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        let {
            name,
            slug,
            description,
            content_structure_url,
            parent_id,
            order,
            secret
        } = body;

        // Webhook security
        if (!secret) {
            await supabaseAdmin.from('system_logs').insert({
                event_type: 'automation',
                status: 'warning',
                message: 'Category Webhook: Missing Secret',
                details: { ip: 'unknown' }
            });
            return NextResponse.json({ error: 'Unauthorized: Secret is missing' }, { status: 401 });
        }

        if (secret !== process.env.N8N_WEBHOOK_SECRET) {
            await supabaseAdmin.from('system_logs').insert({
                event_type: 'automation',
                status: 'warning',
                message: 'Category Webhook: Invalid Secret',
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

        const { data, error } = await supabaseAdmin
            .from('categories')
            .upsert([
                {
                    name,
                    slug,
                    description,
                    content_structure_url,
                    parent_id: parent_id || null,
                    order: order ?? 0,
                    updated_at: new Date().toISOString()
                }
            ], { onConflict: 'slug' })
            .select();

        if (error) {
            console.error("Supabase Insert Error:", error);
            await supabaseAdmin.from('system_logs').insert({
                event_type: 'automation',
                status: 'failed',
                message: `Category Webhook Failed: ${error.message}`,
                details: { name, slug }
            });
            throw error;
        }

        // Log Success
        await supabaseAdmin.from('system_logs').insert({
            event_type: 'automation',
            status: 'success',
            message: `Category Created/Updated via Webhook: ${name}`,
            details: { id: data[0].id, slug: data[0].slug }
        });

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
