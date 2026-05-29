import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

function getAdmin() {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase client not initialized");
    return supabase;
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        if (!slug) return NextResponse.json({ error: 'Puja slug is required' }, { status: 400 });

        console.log(`[ReviewsAPI] Fetching for slug: ${slug}`);

        // Try to fetch from puja_reviews first
        const { data, error } = await getAdmin()
            .from('puja_reviews')
            .select('rating, review_text, created_at, profiles:user_id(full_name)')
            .eq('puja_slug', slug)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[ReviewsAPI] puja_reviews error:', error);
            // Fallback to bookings
            const { data: oldData, error: oldError } = await getAdmin()
                .from('puja_bookings')
                .select('rating, review_text, created_at, profiles:user_id(full_name)')
                .eq('puja_slug', slug)
                .not('rating', 'is', null)
                .order('created_at', { ascending: false });
            
            if (oldError) return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
            return NextResponse.json({ reviews: formatReviews(oldData || []) });
        }

        return NextResponse.json({ reviews: formatReviews(data || []) });

    } catch (error: any) {
        console.error('[ReviewsAPI] Critical Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Helper to format reviews
function formatReviews(data: any[]) {
    return data.map((review: any) => ({
        name: review.profiles?.full_name || 'Anonymous Devotee',
        location: 'Verified User',
        comment: review.review_text,
        rating: review.rating,
        avatar: review.profiles?.avatar_url || null,
        date: review.created_at
    }));
}
