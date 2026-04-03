import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin client (bypass RLS for automation)
// We prioritize the SERVICE_ROLE_KEY for backend operations
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

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('blogs')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });

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
        let { title, content, slug, image_url, tags, meta_title, meta_description, meta_tags, published, secret } = body;

        if (!secret) {
            await supabaseAdmin.from('system_logs').insert({ event_type: 'automation', status: 'warning', message: 'Blog Webhook: Missing Secret', details: { ip: 'unknown' } });
            return NextResponse.json({ error: 'Unauthorized: Secret is missing' }, { status: 401 });
        }
        if (secret !== process.env.N8N_WEBHOOK_SECRET) {
            await supabaseAdmin.from('system_logs').insert({ event_type: 'automation', status: 'warning', message: 'Blog Webhook: Invalid Secret', details: { ip: 'unknown' } });
            return NextResponse.json({ error: 'Unauthorized: Invalid Secret' }, { status: 401 });
        }

        if (!title) {
            return NextResponse.json({ error: 'Bad Request: Missing title' }, { status: 400 });
        }

        if (!content) {
            return NextResponse.json({ error: 'Bad Request: Missing content' }, { status: 400 });
        }

        // Auto-generate slug if missing
        if (!slug) {
            slug = generateSlug(title) + '-' + Date.now();
        }

        // Default image if missing
        if (!image_url) {
            image_url = 'https://via.placeholder.com/800x400?text=' + encodeURIComponent(title);
        }

        const { data, error } = await supabaseAdmin
            .from('blogs')
            .upsert([
                {
                    title,
                    slug,
                    content,
                    image_url,
                    tags: tags || [],
                    meta_title,
                    meta_description,
                    meta_tags: meta_tags || [],
                    published: published ?? true,
                    updated_at: new Date().toISOString()
                }
            ], { onConflict: 'slug' })
            .select();

        if (error) {
            console.error("Supabase Insert Error:", error);
            await supabaseAdmin.from('system_logs').insert({
                event_type: 'automation',
                status: 'failed',
                message: `Blog Webhook Failed: ${error.message}`,
                details: { title, slug }
            });
            throw error;
        }

        // Log Success
        await supabaseAdmin.from('system_logs').insert({
            event_type: 'automation',
            status: 'success',
            message: `Blog Created via Automation: ${title}`,
            details: { id: data[0].id, slug: data[0].slug }
        });

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
