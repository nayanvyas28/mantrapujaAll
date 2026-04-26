import sharp from 'sharp';

export interface OptimizeOptions {
    quality?: number;
    width?: number;
    format?: 'webp' | 'jpeg' | 'png';
}

/**
 * Optimizes an image using Sharp.
 * Defaults to WebP format, 75% quality, and max 1920px width.
 */
export async function optimizeImage(
    buffer: Buffer | Uint8Array,
    options: OptimizeOptions = {}
): Promise<Buffer> {
    const { 
        quality = 75, 
        width = 1920, 
        format = 'webp' 
    } = options;
    
    let pipeline = sharp(buffer);

    // Apply resizing (only if larger than the target width)
    if (width) {
        pipeline = pipeline.resize({
            width,
            withoutEnlargement: true, // Don't upscale small images
            fit: 'inside'
        });
    }

    // Format-specific optimization
    switch (format) {
        case 'webp':
            pipeline = pipeline.webp({ quality });
            break;
        case 'jpeg':
            pipeline = pipeline.jpeg({ quality, mozjpeg: true }); // MozJPEG-style optimization
            break;
        case 'png':
            pipeline = pipeline.png({ quality });
            break;
        default:
            pipeline = pipeline.webp({ quality });
    }

    return await pipeline.toBuffer();
}
