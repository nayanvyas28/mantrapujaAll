import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

function getAdmin() {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase client not initialized");
    return supabase;
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const sessionId = searchParams.get('sessionId');

        if (!userId && !sessionId) {
            return NextResponse.json({ error: 'Missing userId or sessionId' }, { status: 400 });
        }

        let query = getAdmin()
            .from('guru_chat_messages')
            .select('*')
            .order('created_at', { ascending: false })
            .order('id', { ascending: false })
            .limit(50);

        if (userId) {
            query = query.eq('user_id', userId);
        } else if (sessionId) {
            query = query.eq('session_id', sessionId);
        }

        const { data, error } = await query;

        if (error) throw error;

        // Return in chronological order
        return NextResponse.json({ messages: data.reverse() });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const sessionId = searchParams.get('sessionId');

        if (!userId && !sessionId) {
            return NextResponse.json({ error: 'Missing userId or sessionId' }, { status: 400 });
        }

        if (userId) {
            // Delete all messages for user
            await getAdmin().from('guru_chat_messages').delete().eq('user_id', userId);
            // Delete all sessions for user
            await getAdmin().from('guru_chat_sessions').delete().eq('user_id', userId);
        } else {
            // Delete specific session
            await getAdmin().from('guru_chat_messages').delete().eq('session_id', sessionId);
            await getAdmin().from('guru_chat_sessions').delete().eq('id', sessionId);
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
