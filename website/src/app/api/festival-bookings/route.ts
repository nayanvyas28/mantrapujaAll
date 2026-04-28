import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Incoming Booking Request:", body);
        const { name, phone, festival_name } = body;

        if (!name || !phone || !festival_name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('festival_bookings')
            .insert([{ name, phone, festival_name, status: 'Pending' }]);

        if (error) {
            console.error('Supabase Insert Error:', error);
            return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 });
        }

        console.log("Booking Inserted Successfully:", data);
        return NextResponse.json({ message: 'Booking successful', data });
    } catch (error: any) {
        console.error('Booking API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
