import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
);

const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const getTestData = () => {
    return ZODIAC_SIGNS.map(sign => ({
        sign,
        slug: sign.toLowerCase(),
        daily: `Today's cosmic alignment for ${sign} brings positive energy and new opportunities. Stay focused on your goals.`,
        monthly: `This month, ${sign} will experience significant growth in career and personal relationships. A perfect time for new beginnings.`,
        yearly: `2026 is a transformative year for ${sign}. Your hard work will finally pay off, leading to long-term stability and success.`
    }));
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const isTest = searchParams.get('test') === 'true';
    const sign = searchParams.get('sign');

    if (isTest) {
        let data = getTestData();
        if (sign) {
            data = data.filter(d => d.slug === sign.toLowerCase());
        }
        return NextResponse.json(data);
    }

    try {
        // 1. Get Rashifal Category
        const { data: category, error: catError } = await supabaseAdmin
            .from('categories')
            .select('id')
            .eq('slug', 'rashifal')
            .maybeSingle();

        if (catError || !category) {
             // If category doesn't exist yet, return test data as fallback
             return NextResponse.json(getTestData());
        }

        // 2. Get Pages (Zodiac Signs) in this category
        const { data: pages, error: pageError } = await supabaseAdmin
            .from('pages')
            .select('*')
            .eq('category_id', category.id);

        if (pageError) throw pageError;

        const formattedData = (pages || []).map(p => ({
            sign: p.title,
            slug: p.slug,
            ...(p.content || {})
        }));

        if (sign) {
            const single = formattedData.find(d => d.slug === sign.toLowerCase());
            return NextResponse.json(single || { error: 'Sign not found' }, { status: single ? 200 : 404 });
        }

        return NextResponse.json(formattedData);

    } catch (error: any) {
        console.error("Rashifal API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
