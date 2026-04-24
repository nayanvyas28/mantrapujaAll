import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Service role client — bypasses RLS, server-only
function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
}

// GET /api/banners — fetch all banners
export async function GET() {
    const supabase = getAdminClient();
    const { data, error } = await supabase
        .from('home_banners')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

// POST /api/banners — create or update a banner
export async function POST(req: NextRequest) {
    const supabase = getAdminClient();
    const body = await req.json();
    const { id, ...bannerData } = body;

    let error;
    if (id) {
        const { error: err } = await supabase
            .from('home_banners')
            .update(bannerData)
            .eq('id', id);
        error = err;
    } else {
        const { error: err } = await supabase
            .from('home_banners')
            .insert([bannerData]);
        error = err;
    }

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}

// DELETE /api/banners?id=xxx — delete a banner
export async function DELETE(req: NextRequest) {
    const supabase = getAdminClient();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const { error } = await supabase
        .from('home_banners')
        .delete()
        .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
