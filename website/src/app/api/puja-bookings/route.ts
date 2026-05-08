import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

export async function POST(request: Request) {
    try {
        const supabase = getSupabaseAdmin();
        if (!supabase) throw new Error("Supabase client not initialized");

        const body = await request.json();
        const { sankalp_name, puja_name, puja_slug, package_name, price, user_id } = body;

        // Basic validation
        if (!sankalp_name || !puja_name || !package_name || !price || !user_id) {
            return NextResponse.json(
                { error: 'Missing required booking details or user auth.' },
                { status: 400 }
            );
        }

        // Insert booking
        const { data, error } = await supabase
            .from('puja_bookings')
            .insert([
                {
                    user_id: user_id,
                    sankalp_name: sankalp_name.trim(),
                    puja_name,
                    puja_slug,
                    package_name,
                    price,
                    status: 'pending'
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Database Error:', error);
            return NextResponse.json(
                { error: 'Failed to record booking: ' + error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Booking successful', booking: data },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
