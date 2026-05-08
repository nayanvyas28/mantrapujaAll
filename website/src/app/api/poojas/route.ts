import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

function getAdmin() {
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
        const { data, error } = await getAdmin()
            .from('poojas')
            .select('*, categories(*)')
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
            description,
            price,
            benefits,
            category_id,
            duration,
            requirements,
            process,
            faqs,
            content,
            images,
            seo_title,
            seo_description,
            is_active,
            secret
        } = body;

        // Webhook security
        if (!secret) {
            await getAdmin().from('system_logs').insert({
                event_type: 'automation',
                status: 'warning',
                message: 'Pooja Webhook: Missing Secret',
                details: { ip: 'unknown' }
            });
            return NextResponse.json({ error: 'Unauthorized: Secret is missing' }, { status: 401 });
        }

        if (secret !== process.env.N8N_WEBHOOK_SECRET) {
            await getAdmin().from('system_logs').insert({
                event_type: 'automation',
                status: 'warning',
                message: 'Pooja Webhook: Invalid Secret',
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

        const { data, error } = await getAdmin()
            .from('poojas')
            .upsert([
                {
                    name,
                    slug,
                    description,
                    price: price ? parseFloat(price) : 0,
                    benefits: benefits || [],
                    category_id: category_id || null,
                    duration,
                    requirements: requirements || [],
                    process: process || {},
                    faqs: faqs || [],
                    content: content || {},
                    images: images || [],
                    seo_title: seo_title || name,
                    seo_description: seo_description || description,
                    is_active: is_active ?? true,
                    updated_at: new Date().toISOString()
                }
            ], { onConflict: 'slug' })
            .select();

        if (error) {
            console.error("Supabase Insert Error:", error);
            await getAdmin().from('system_logs').insert({
                event_type: 'automation',
                status: 'failed',
                message: `Pooja Webhook Failed: ${error.message}`,
                details: { name, slug }
            });
            throw error;
        }

        // Log Success
        await getAdmin().from('system_logs').insert({
            event_type: 'automation',
            status: 'success',
            message: `Pooja Created/Updated via Webhook: ${name}`,
            details: { id: data[0].id, slug: data[0].slug }
        });

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
