import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { slug } = body;
        const secret = request.headers.get('x-secret');

        // 1. Validate Secret
        if (secret !== process.env.REVALIDATE_SECRET) {
            return NextResponse.json(
                { message: 'Invalid secret' },
                { status: 401 }
            );
        }

        // 2. Validate Slug
        if (!slug) {
            return NextResponse.json(
                { message: 'Slug is required' },
                { status: 400 }
            );
        }

        // 3. Trigger Revalidation
        // Revalidate the individual blog page
        revalidatePath(`/blog/${slug}`);
        
        // Revalidate the main blog listing page so the new post appears there too
        revalidatePath('/blog');

        console.log(`[Revalidate] Success for slug: ${slug}`);

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            path: `/blog/${slug}`
        });
    } catch (err) {
        console.error('[Revalidate] Error:', err);
        return NextResponse.json(
            { message: 'Error revalidating', error: err instanceof Error ? err.message : String(err) },
            { status: 500 }
        );
    }
}
