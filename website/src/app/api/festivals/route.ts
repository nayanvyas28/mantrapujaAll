import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin client (bypass RLS for automation)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        auth: {
            autoRefreshToken: false,
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
    try {
        const { data, error } = await supabaseAdmin
            .from('festivals')
            .select('*')
            .eq('is_active', true)
            .order('date', { ascending: true });

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
            description,
            date,
            month,
            year,
            images,
            content,
            seo_title,
            seo_description,
            is_active,
            secret
        } = body;

        // Webhook security
        if (!secret) {
            await supabaseAdmin.from('system_logs').insert({
                event_type: 'automation',
                status: 'warning',
                message: 'Festival Webhook: Missing Secret',
                details: { ip: 'unknown' }
            });
            return NextResponse.json({ error: 'Unauthorized: Secret is missing' }, { status: 401 });
        }

        if (secret !== process.env.N8N_WEBHOOK_SECRET) {
            await supabaseAdmin.from('system_logs').insert({
                event_type: 'automation',
                status: 'warning',
                message: 'Festival Webhook: Invalid Secret',
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

        // Parse date if provided as string
        if (date && typeof date === 'string') {
            date = new Date(date).toISOString().split('T')[0];
        }

        const { data, error } = await supabaseAdmin
            .from('festivals')
            .upsert([
                {
                    name,
                    slug,
                    description,
                    date,
                    month,
                    year: year || (date ? new Date(date).getFullYear() : null),
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
            await supabaseAdmin.from('system_logs').insert({
                event_type: 'automation',
                status: 'failed',
                message: `Festival Webhook Failed: ${error.message}`,
                details: { name, slug }
            });
            throw error;
        }

        // Log Success
        await supabaseAdmin.from('system_logs').insert({
            event_type: 'automation',
            status: 'success',
            message: `Festival Created/Updated via Webhook: ${name}`,
            details: { id: data[0].id, slug: data[0].slug }
        });

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
