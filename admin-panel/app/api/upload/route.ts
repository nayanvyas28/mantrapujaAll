
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process with SHARP
    const optimizedBuffer = await sharp(buffer)
      .resize(800, 800, { // Standard max size
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 85, effort: 6 }) // Sharp webp optimization
      .toBuffer();

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
    const filePath = `${folder}/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from('blog-assets')
      .upload(filePath, optimizedBuffer, {
        contentType: 'image/webp',
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('blog-assets')
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error('Sharp Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
