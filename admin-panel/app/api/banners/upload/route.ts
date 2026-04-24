import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { optimizeImage } from '@mantrapuja/image-optimizer';

// Service role client — bypasses RLS for storage uploads
function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const existingUrl = formData.get('existingUrl') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const supabase = getAdminClient();
        const buffer = Buffer.from(await file.arrayBuffer());

        // Optimize image to WebP
        const optimizedBuffer = await optimizeImage(buffer, {
            quality: 80,
            width: 2400,
            format: 'webp',
        });

        const fileName = `banner_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.webp`;

        // Upload to Supabase storage using service role
        const { error: uploadError } = await supabase.storage
            .from('banners')
            .upload(fileName, optimizedBuffer, {
                contentType: 'image/webp',
                upsert: true,
            });

        if (uploadError) throw uploadError;

        // Delete old image if replacing
        if (existingUrl) {
            try {
                const url = new URL(existingUrl);
                const pathParts = url.pathname.split('/object/public/banners/');
                if (pathParts.length > 1) {
                    await supabase.storage.from('banners').remove([pathParts[1]]);
                }
            } catch {
                // Non-fatal — old image cleanup failure is OK
            }
        }

        const { data } = supabase.storage.from('banners').getPublicUrl(fileName);
        return NextResponse.json({ publicUrl: data.publicUrl });

    } catch (error: any) {
        console.error('[Banner Upload] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
