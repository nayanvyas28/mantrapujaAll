import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
    try {
        const { data: bookingsData, error } = await supabaseAdmin
            .from('puja_bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Admin Fetch error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        let finalData = bookingsData || [];

        // Manual join with profiles
        if (finalData.length > 0) {
            const userIds = [...new Set(finalData.map(b => b.user_id).filter(Boolean))];
            
            if (userIds.length > 0) {
                const { data: profilesData } = await supabaseAdmin
                    .from('profiles')
                    .select('id, phone, full_name, email')
                    .in('id', userIds);
                
                const profilesMap = (profilesData || []).reduce((acc: any, profile: any) => {
                    acc[profile.id] = profile;
                    return acc;
                }, {});

                finalData = finalData.map(b => ({
                    ...b,
                    profiles: profilesMap[b.user_id] || null
                }));
            }
        }

        return NextResponse.json({ bookings: finalData }, { status: 200 });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
