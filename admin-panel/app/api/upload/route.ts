import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const bucket = formData.get('bucket') as string || 'pujas';
        const path = formData.get('path') as string;

        if (!file || !path) {
            return NextResponse.json({ error: 'Missing file or path' }, { status: 400 });
        }

        // Use SERVICE_ROLE_KEY to bypass RLS for administrative uploads
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        const { data, error: uploadError } = await supabaseAdmin.storage
            .from(bucket)
            .upload(path, file, {
                upsert: true,
                contentType: file.type || 'image/webp'
            });

        if (uploadError) {
            console.error('[Upload API] Supabase Error:', uploadError);
            throw uploadError;
        }

        const { data: { publicUrl } } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);

        return NextResponse.json({ 
            success: true, 
            url: publicUrl,
            path: path
        });
    } catch (error: any) {
        console.error('[Upload API] Catch Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
