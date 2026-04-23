import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { bookingId, userId, rating, review_text } = body;

        if (!bookingId || !userId || !rating) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify booking ownership and status
        const { data: booking, error: fetchError } = await supabaseAdmin
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

        // Save review
        const { data, error } = await supabaseAdmin
            .from('puja_bookings')
            .update({ rating, review_text })
            .eq('id', bookingId)
            .select()
            .single();

        if (error) {
            console.error('Update Error:', error);
            return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Review submitted successfully', booking: data }, { status: 200 });
        
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
