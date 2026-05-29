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
        let { 
            title, 
            content, 
            slug, 
            image_url, 
            tags, 
            meta_title, 
            meta_description, 
            meta_tags, 
            published, 
            secret, 
            author_name, 
            author_avatar,
            author_role,
            author_bio,
            category 
        } = body;

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

        // Author Profiles for Random Selection
        const authorProfiles = [
            { name: 'Mantra Guru Ji', role: 'Divine Guide', avatar: '/logo.png' },
            { name: 'Aacharya Dr. Ram Ramanuj', role: 'Vedic Scholar', avatar: '/logo.png' },
            { name: 'Pandit Ravi Shastri', role: 'Head Priest', avatar: '/logo.png' },
            { name: 'Acharya Meera', role: 'Senior Astrologer', avatar: '/logo.png' }
        ];

        const selectedProfile = authorProfiles[Math.floor(Math.random() * authorProfiles.length)];

        // 4. Map to new schema (Hybrid for legacy compatibility - Matched to DB Schema)
        const newBlogEntry = {
            id: crypto.randomUUID(),
            // Title Sync
            title: title,
            blog_title: title,
            // Slug & Identification
            slug: slug,
            excerpt: body.excerpt || "",
            // Content Sync
            content: finalContent,
            blog_content: finalContent,
            // Image Sync
            featured_image_url: image_url,
            image_url: image_url,
            image_alt_text: body.image_alt_text || title,
            // Metadata
            category: category || 'Devta & Divine Knowledge',
            tags: JSON.stringify(finalMetaTags),
            reading_time: body.reading_time || "7",
            language: 'en',
            // Author Metadata (Randomized if not provided)
            author_name: author_name || selectedProfile.name,
            author_avatar: author_avatar || selectedProfile.avatar,
            author_role: author_role || selectedProfile.role,
            // Status
            published: published ?? true,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            // SEO Sync
            meta_title: meta_title || title,
            meta_description: meta_description || "",
            meta_tags: finalMetaTags,
            seo: {
                meta_title: meta_title || title,
                meta_description: meta_description || "",
                meta_tags: finalMetaTags,
                og_title: meta_title || title,
                og_description: meta_description || "",
                canonical_url: `https://mantrapuja.com/blog/${slug}`
            }
        };

        const { data, error } = await getClient()
            .from('Final_blog')
            .upsert([newBlogEntry], { onConflict: 'slug' })
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
