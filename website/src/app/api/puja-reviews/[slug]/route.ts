import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;

        if (!slug) {
            return NextResponse.json({ error: 'Puja slug is required' }, { status: 400 });
        }

        // Fetch reviews from the new dedicated puja_reviews table
        const { data, error } = await supabaseAdmin
            .from('puja_reviews')
            .select(`
                rating,
                review_text,
                created_at,
                profiles:user_id (
                    full_name,
                    avatar_url
                )
            `)
            .eq('puja_slug', slug)
            .eq('is_published', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching reviews:', error);
            // Fallback to puja_bookings for old data if puja_reviews is empty or fails
            const { data: oldData, error: oldError } = await supabaseAdmin
                .from('puja_bookings')
                .select(`
                    rating,
                    review_text,
                    created_at,
                    profiles:user_id (
                        full_name,
                        avatar_url
                    )
                `)
                .eq('puja_slug', slug)
                .not('rating', 'is', null)
                .order('created_at', { ascending: false });
            
            if (oldError) {
                return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
            }
            return NextResponse.json({ reviews: formatReviews(oldData) }, { status: 200 });
        }

        return NextResponse.json({ reviews: formatReviews(data) }, { status: 200 });

    } catch (error: any) {
        console.error('API Error:', error);
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
