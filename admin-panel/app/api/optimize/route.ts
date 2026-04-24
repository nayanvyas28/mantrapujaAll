import { NextRequest, NextResponse } from 'next/server';
import { optimizeImage } from '@mantrapuja/image-optimizer';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Ultimate optimization: WebP, 75% quality, 1920px max width
        const optimizedBuffer = await optimizeImage(buffer, {
            quality: 75,
            width: 1920,
            format: 'webp'
        });

        // Set the filename and return the optimized buffer
        return new NextResponse(new Uint8Array(optimizedBuffer), {
            headers: {
                'Content-Type': 'image/webp',
                'Content-Disposition': `attachment; filename="optimized.webp"`,
            },
        });
    } catch (error: any) {
        console.error('Optimization error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
