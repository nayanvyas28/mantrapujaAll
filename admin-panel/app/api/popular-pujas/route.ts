import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
}

// POST /api/popular-pujas — save featured puja selection
export async function POST(req: NextRequest) {
    try {
        const supabase = getAdminClient();
        const { selectedIds } = await req.json() as { selectedIds: string[] };

        if (!Array.isArray(selectedIds)) {
            return NextResponse.json({ error: 'selectedIds must be an array' }, { status: 400 });
        }
        if (selectedIds.length > 6) {
            return NextResponse.json({ error: 'Maximum 6 pujas allowed' }, { status: 400 });
        }

        // Step 1: Clear all is_featured flags
        const { error: clearError } = await supabase
            .from('poojas')
            .update({ is_featured: false })
            .eq('is_featured', true);

        if (clearError) throw clearError;

        // Step 2: Set selected ones to true
        if (selectedIds.length > 0) {
            const { error: setError } = await supabase
                .from('poojas')
                .update({ is_featured: true })
                .in('id', selectedIds);

            if (setError) throw setError;
        }

        return NextResponse.json({ success: true, count: selectedIds.length });
    } catch (error: any) {
        console.error('[Popular Pujas] Save error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
