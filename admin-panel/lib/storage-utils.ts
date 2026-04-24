import { createClient } from '@/utils/supabase/client';

/**
 * Extracts both bucket name and path from a Supabase Public URL.
 * Example URL: https://xyz.supabase.co/storage/v1/object/public/my_bucket/my_folder/test.webp
 * Output: { bucket: 'my_bucket', path: 'my_folder/test.webp' }
 */
export const extractBucketAndPath = (url: string) => {
    try {
        if (!url) return null;
        
        // Supabase URLs usually look like: .../storage/v1/object/public/BUCKET_NAME/PATH
        const parts = url.split('/storage/v1/object/public/');
        if (parts.length < 2) return null;
        
        const pathWithBucket = parts[1];
        const firstSlashIndex = pathWithBucket.indexOf('/');
        if (firstSlashIndex === -1) return null;
        
        const bucket = pathWithBucket.substring(0, firstSlashIndex);
        const path = pathWithBucket.substring(firstSlashIndex + 1);
        
        return { bucket, path };
    } catch (error) {
        console.error('Error extracting bucket and path from URL:', error);
        return null;
    }
};

/**
 * Extracts the storage path from a Supabase Public URL.
 * (Legacy support, but now dynamic)
 */
export const extractPathFromUrl = (url: string, bucketName?: string) => {
    const extracted = extractBucketAndPath(url);
    return extracted?.path || null;
};

/**
 * Deletes a file from Supabase storage if it exists.
 * Now detects bucket automatically from URL.
 */
export const deleteFileFromStorage = async (url: string, fallbackBucket: string = 'music_assets') => {
    try {
        const extracted = extractBucketAndPath(url);
        if (!extracted) return;

        const { bucket, path } = extracted;
        const supabase = createClient();

        console.log(`[StorageUtils] Deleting file: ${path} from bucket: ${bucket}`);
        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            console.error('[StorageUtils] Delete error:', error);
        }
    } catch (err) {
        console.error('[StorageUtils] Exception during delete:', err);
    }
};
