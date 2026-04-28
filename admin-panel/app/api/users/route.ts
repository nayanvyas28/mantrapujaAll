import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET: Fetch all users with their profile, kundali count, and AI usage
export async function GET() {
    try {
        const { data: { users }, error: usersError } = await supabaseAdmin.auth.admin.listUsers({
            page: 1,
            perPage: 1000
        });
        if (usersError) throw usersError;

        const { data: profiles } = await supabaseAdmin
            .from('profiles')
            .select('id, full_name, phone, phone_verified, created_at');

        const { data: aiUsage } = await supabaseAdmin
            .from('ai_usage')
            .select('user_id, query_count, last_query_at, custom_limit');

        const { data: kundalis } = await supabaseAdmin
            .from('user_kundalis')
            .select('user_id');

        const kundaliCountMap: Record<string, number> = {};
        kundalis?.forEach((k) => {
            kundaliCountMap[k.user_id] = (kundaliCountMap[k.user_id] || 0) + 1;
        });

        const enrichedUsers = users.map((u) => {
            const profile = profiles?.find((p) => p.id === u.id);
            const usage = aiUsage?.find((a) => a.user_id === u.id);
            return {
                id: u.id,
                email: u.email,
                phone: profile?.phone || u.phone,
                full_name: profile?.full_name || u.user_metadata?.full_name || '—',
                phone_verified: profile?.phone_verified || false,
                created_at: u.created_at,
                last_sign_in_at: u.last_sign_in_at,
                query_count: usage?.query_count || 0,
                last_query_at: usage?.last_query_at || null,
                custom_limit: usage?.custom_limit ?? null,
                kundali_count: kundaliCountMap[u.id] || 0,
            };
        });

        enrichedUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        return NextResponse.json({ users: enrichedUsers });
    } catch (err: any) {
        console.error('Admin Users API Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// PATCH: Update custom AI limit
export async function PATCH(req: Request) {
    try {
        const { userId, customLimit } = await req.json();
        if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

        const { error } = await supabaseAdmin
            .from('ai_usage')
            .upsert({
                user_id: userId,
                custom_limit: customLimit === '' ? null : Number(customLimit),
            }, { onConflict: 'user_id' });

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// PUT: Edit user profile (full_name, phone)
export async function PUT(req: Request) {
    try {
        const { userId, full_name, phone, query_count } = await req.json();
        if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

        // Update profiles table
        const profileUpdates: any = { updated_at: new Date().toISOString() };
        if (full_name !== undefined) profileUpdates.full_name = full_name;
        if (phone !== undefined) profileUpdates.phone = phone;

        const { error: profileErr } = await supabaseAdmin
            .from('profiles')
            .upsert({ id: userId, ...profileUpdates });
        if (profileErr) throw profileErr;

        // Update auth metadata if name changed
        if (full_name !== undefined) {
            const { data: { user: currentUser } } = await supabaseAdmin.auth.admin.getUserById(userId);
            await supabaseAdmin.auth.admin.updateUserById(userId, {
                user_metadata: { ...currentUser?.user_metadata, full_name }
            });
        }

        // Reset query count if requested
        if (query_count !== undefined) {
            const { error: usageErr } = await supabaseAdmin
                .from('ai_usage')
                .upsert({ user_id: userId, query_count: Number(query_count) }, { onConflict: 'user_id' });
            if (usageErr) throw usageErr;
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Admin Users PUT Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// DELETE: Remove a user and all their data
export async function DELETE(req: Request) {
    try {
        const { userId } = await req.json();
        if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

        // Delete all related data first (cascade safety)
        await Promise.allSettled([
            supabaseAdmin.from('profiles').delete().eq('id', userId),
            supabaseAdmin.from('ai_usage').delete().eq('user_id', userId),
            supabaseAdmin.from('user_kundalis').delete().eq('user_id', userId),
            supabaseAdmin.from('user_vedic_profiles').delete().eq('user_id', userId),
            supabaseAdmin.from('guru_chat_sessions').delete().eq('user_id', userId),
            supabaseAdmin.from('guru_chat_messages').delete().eq('user_id', userId),
            supabaseAdmin.from('puja_bookings').delete().eq('user_id', userId),
        ]);

        // Finally delete auth user
        const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Admin Users DELETE Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
