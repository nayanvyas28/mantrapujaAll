import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

function getAdmin() {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase client not initialized");
    return supabase;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { bookingId, userId, rating, review_text } = body;

        if (!bookingId || !userId || !rating) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify booking ownership and status
        const { data: booking, error: fetchError } = await getAdmin()
            .from('puja_bookings')
            .select('*')
            .eq('id', bookingId)
            .single();

        if (fetchError || !booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        if (booking.user_id !== userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        if (booking.status !== 'completed') {
            return NextResponse.json({ error: 'Reviews can only be submitted for completed pujas' }, { status: 400 });
        }

        // Save review to the new dedicated table
        const { data, error } = await getAdmin()
            .from('puja_reviews')
            .insert([
                {
                    booking_id: bookingId,
                    user_id: userId,
                    puja_slug: booking.puja_slug, // Get from booking to maintain link
                    puja_name: booking.puja_name,
                    rating,
                    review_text,
                    is_published: true
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Insert Error:', error);
            return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
        }

        // Also update the booking to mark it as reviewed
        await getAdmin()
            .from('puja_bookings')
            .update({ rating, review_text })
            .eq('id', bookingId);

        return NextResponse.json({ message: 'Review submitted successfully', review: data }, { status: 200 });
        
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
