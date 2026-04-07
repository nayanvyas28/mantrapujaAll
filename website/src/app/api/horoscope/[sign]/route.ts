import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
);

export async function GET(request: NextRequest, { params }: { params: { sign: string } }) {
    const { sign } = await params;
    const { searchParams } = new URL(request.url);
    const isTest = searchParams.get('test') === 'true';

    if (isTest) {
        return NextResponse.json({
            sign: sign.charAt(0).toUpperCase() + sign.slice(1),
            slug: sign.toLowerCase(),
            daily: `Today's cosmic alignment for ${sign} brings positive energy and new opportunities. Stay focused on your goals.`,
            monthly: `This month, ${sign} will experience significant growth in career and personal relationships. A perfect time for new beginnings.`,
            yearly: `2026 is a transformative year for ${sign}. Your hard work will finally pay off, leading to long-term stability and success.`
        });
    }

    try {
        // 1. Get Rashifal Category
        const { data: category, error: catError } = await supabaseAdmin
            .from('categories')
            .select('id')
            .eq('slug', 'rashifal')
            .maybeSingle();

        if (catError || !category) return NextResponse.json({ error: 'Rashifal category not found' }, { status: 404 });

        // 2. Get Page (Zodiac Sign)
        const { data: page, error: pageError } = await supabaseAdmin
            .from('pages')
            .select('*')
            .eq('category_id', category.id)
            .eq('slug', sign.toLowerCase())
            .maybeSingle();

        if (pageError || !page) return NextResponse.json({ error: 'Sign not found' }, { status: 404 });

        const result = {
            sign: page.title,
            slug: page.slug,
            ...(page.content || {})
        };

        return NextResponse.json(result);

    } catch (error: any) {
        console.error("Horoscope API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
