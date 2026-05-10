export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

function getClient() {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase client not initialized");
    return supabase;
}

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

export async function GET() {
    try {
        const { data, error } = await getClient()
            .from('Final_blog')
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

import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        let { title, content, slug, image_url, tags, meta_title, meta_description, meta_tags, published, secret, author_name, category } = body;

        if (!secret) {
            console.warn('[Blog Webhook] Missing secret in request body');
            await getClient().from('system_logs').insert({ event_type: 'automation', status: 'warning', message: 'Blog Webhook: Missing Secret', details: { ip: 'unknown' } });
            return NextResponse.json({ error: 'Unauthorized: Secret is missing' }, { status: 401 });
        }
        
        const expectedSecret = process.env.N8N_WEBHOOK_SECRET;
        
        if (secret !== expectedSecret) {
            console.error(`[Blog Webhook] Invalid Secret. Received: "${secret}", Expected: "${expectedSecret}"`);
            await getClient().from('system_logs').insert({ event_type: 'automation', status: 'warning', message: 'Blog Webhook: Invalid Secret', details: { received: secret, expected: expectedSecret } });
            return NextResponse.json({ error: 'Unauthorized: Invalid Secret' }, { status: 401 });
        }

        if (!title) {
            return NextResponse.json({ error: 'Bad Request: Missing title' }, { status: 400 });
        }

        if (!content) {
            return NextResponse.json({ error: 'Bad Request: Missing content' }, { status: 400 });
        }

        // Ensure JSONB fields are objects (if sent as strings by n8n)
        const ensureObject = (val: any) => {
            if (typeof val === 'string') {
                try { return JSON.parse(val); } catch (e) { return val; }
            }
            return val;
        };

        const finalContent = ensureObject(content);
        const finalTags = ensureObject(tags || []);
        const finalMetaTags = ensureObject(meta_tags || []);

        // Auto-generate slug if missing
        if (!slug) {
            slug = generateSlug(title) + '-' + Date.now();
        }

        // Default image if missing
        if (!image_url) {
            image_url = '/logo.png';
        }

        const { data, error } = await getClient()
            .from('Final_blog')
            .upsert([
                {
                    id: crypto.randomUUID(), // Required by your new schema (no default in DB)
                    title,
                    slug,
                    content: finalContent,
                    image_url,
                    tags: finalTags,
                    meta_title,
                    meta_description,
                    meta_tags: finalMetaTags,
                    author_name: author_name || 'MantraPuja AI',
                    category: category || 'Spirituality',
                    published: published ?? true,
                    created_at: new Date().toISOString(), // Added to fix the 1970 date issue
                    updated_at: new Date().toISOString(),
                    is_active: true
                }
            ], { onConflict: 'slug' })
            .select();

        if (error) {
            console.error("Supabase Insert Error:", error);
            await getClient().from('system_logs').insert({
                event_type: 'automation',
                status: 'failed',
                message: `Blog Webhook Failed: ${error.message}`,
                details: { title, slug }
            });
            throw error;
        }

        // Log Success
        await getClient().from('system_logs').insert({
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
