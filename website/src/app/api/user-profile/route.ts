export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

function getAdmin() {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase client not initialized");
    return supabase;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Fetch User Profile and Bookings first
        const [profileRes, bookingsRes] = await Promise.all([
            getAdmin().from('profiles').select('*').eq('id', userId).single(),
            getAdmin().from('puja_bookings').select('*').eq('user_id', userId).order('created_at', { ascending: false })
        ]);

        const profile = profileRes.data;
        const bookings = bookingsRes.data || [];

        // Fetch Inquiries using both ID and Email from profile
        let inquiries: any[] = [];
        if (profile) {
            const { data: inqData, error: inqError } = await getAdmin()
                .from('contact_inquiries')
                .select('*')
                .or(`user_id.eq.${userId},email.eq.${profile.email}`)
                .order('created_at', { ascending: false });
            
            if (!inqError) inquiries = inqData || [];
            else console.error("Inquiries Fetch Error:", inqError);
        }

        if (profileRes.error && profileRes.error.code !== 'PGRST116') {
            console.error("Profile Error:", profileRes.error);
        }

        if (bookingsRes.error) {
            console.error("Bookings Error:", bookingsRes.error);
            return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
        }

        // Optimized Auto-Complete Logic: Single update for all past pending bookings
        const now = new Date().toISOString();
        const pendingPastBookings = bookings.filter((b: any) => b.status === 'pending' && b.scheduled_date && b.scheduled_date < now);
        
        let finalBookings = bookings;
        if (pendingPastBookings.length > 0) {
            const { error: updateError } = await getAdmin()
                .from('puja_bookings')
                .update({ status: 'completed' })
                .eq('user_id', userId)
                .eq('status', 'pending')
                .lt('scheduled_date', now);
            
            if (!updateError) {
                // Refresh bookings to reflect updates
                const { data: refreshed } = await getAdmin()
                    .from('puja_bookings')
                    .select('*')
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false });
                if (refreshed) finalBookings = refreshed;
            }
        }

        return NextResponse.json({
            profile: profile || null,
            bookings: finalBookings,
            inquiries: inquiries
        }, { status: 200 });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { userId, address, preferences, full_name, avatar_url } = body;

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const updates: any = { updated_at: new Date().toISOString() };
        if (address !== undefined) updates.address = address;
        if (preferences !== undefined) updates.preferences = preferences;
        if (full_name !== undefined) updates.full_name = full_name;
        if (avatar_url !== undefined) updates.avatar_url = avatar_url;

        // If updating Auth metadata directly (full_name or avatar_url)
        if (full_name !== undefined || avatar_url !== undefined) {
             const { data: { user: currentUser }, error: fetchError } = await getAdmin().auth.admin.getUserById(userId);
             
             if (!fetchError && currentUser) {
                  const metadataUpdates: any = { ...currentUser.user_metadata };
                  if (full_name !== undefined) metadataUpdates.full_name = full_name;
                  if (avatar_url !== undefined) metadataUpdates.avatar_url = avatar_url;
                  
                  await getAdmin().auth.admin.updateUserById(userId, {
                      user_metadata: metadataUpdates
                  });
             }
        }

        // Try to update profiles table. 
        const { data, error } = await getAdmin()
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) {
            console.error('Update Error:', error);
            // If the error is due to missing column, try updating without avatar_url as fallback
            if (error.message.includes('column "avatar_url" of relation "profiles" does not exist')) {
                delete updates.avatar_url;
                const { data: fallbackData, error: fallbackError } = await getAdmin()
                    .from('profiles')
                    .update(updates)
                    .eq('id', userId)
                    .select()
                    .single();
                
                if (fallbackError) return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
                return NextResponse.json({ message: 'Profile updated (Auth only) successfully', profile: fallbackData }, { status: 200 });
            }
            return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Profile updated successfully', profile: data }, { status: 200 });
        
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
