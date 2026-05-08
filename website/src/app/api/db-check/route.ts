import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
    try {
        // Try to get count from festival_bookings
        const { count, error: countError } = await supabase
            .from('festival_bookings')
            .select('*', { count: 'exact', head: true });

        // Get table list
        const { data: tablesData, error: tablesError } = await supabase
            .from('pg_catalog.pg_tables')
            .select('tablename')
            .eq('schemaname', 'public');

        return NextResponse.json({ 
            total_bookings: count || 0,
            tables: tablesData?.map((t: any) => t.tablename) || [],
            error: countError?.message || tablesError?.message
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
