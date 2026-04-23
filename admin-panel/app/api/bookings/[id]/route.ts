import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(request: Request, context: { params: { id: string } }) {
    try {
        const id = context.params.id;
        const body = await request.json();
        const { status, scheduled_date } = body;

        if (!id) {
            return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
        }

        const updates: any = {};
        if (status) updates.status = status;
        if (scheduled_date !== undefined) updates.scheduled_date = scheduled_date;

        const { data, error } = await supabaseAdmin
            .from('puja_bookings')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Database Error:', error);
            return NextResponse.json(
                { error: 'Failed to update booking: ' + error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: 'Booking updated successfully', booking: data }, { status: 200 });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
