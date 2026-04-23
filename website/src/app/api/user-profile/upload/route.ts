import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { optimizeImage } from '@mantrapuja/image-optimizer';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const userId = formData.get('userId') as string;

        if (!file || !userId) {
            return NextResponse.json({ error: 'File and User ID are required' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 1. Optimize Image (Resize to 400px and convert to WebP)
        const optimizedBuffer = await optimizeImage(buffer, {
            quality: 80,
            width: 400,
            format: 'webp'
        });

        const fileName = `${userId}_${Date.now()}.webp`;

        // 2. Upload to the dedicated 'avatars' bucket
        const { error: uploadError } = await supabaseAdmin.storage
            .from('avatars')
            .upload(fileName, optimizedBuffer, {
                contentType: 'image/webp',
                upsert: true 
            });

        if (uploadError) {
            console.error('Upload Error:', uploadError);
            return NextResponse.json({ error: 'Storage upload failed' }, { status: 500 });
        }

        // 3. Generate the public URL
        const { data } = supabaseAdmin.storage
            .from('avatars')
            .getPublicUrl(fileName);

        return NextResponse.json({ publicUrl: data.publicUrl }, { status: 200 });

    } catch (err: any) {
        console.error('File Upload Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
