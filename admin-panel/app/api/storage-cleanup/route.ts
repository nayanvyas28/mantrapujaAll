import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);
        const dryRun = searchParams.get('dryRun') !== 'false'; // Default to true

        const buckets = ['banners', 'pujas', 'popups', 'music', 'website', 'music_assets'];

        // 1. Gather all "Used" URLs from all possible tables
        const [
            { data: banners },
            { data: pujas },
            { data: popups },
            { data: blogs },
            { data: godImages },
            { data: songs },
            { data: features }
        ] = await Promise.all([
            supabase.from('home_banners').select('image_url'),
            supabase.from('poojas').select('image_url, images'),
            supabase.from('marketing_popups').select('image_mobile, image_web'),
            supabase.from('blogs').select('image_url'),
            supabase.from('music_gods').select('image_url'),
            supabase.from('music_songs').select('audio_url, image_url'),
            supabase.from('home_features').select('image_url')
        ]);

        // We store used items as "bucket:path" strings for easy matching
        const usedItems = new Set<string>();

        const addUrl = (url: string | null | undefined) => {
            if (!url) return;
            // Supabase URLs usually look like: .../storage/v1/object/public/BUCKET_NAME/PATH
            const parts = url.split('/storage/v1/object/public/');
            if (parts.length < 2) return;
            
            const pathWithBucket = decodeURIComponent(parts[1]);
            const firstSlashIndex = pathWithBucket.indexOf('/');
            if (firstSlashIndex === -1) return;
            
            const bucket = pathWithBucket.substring(0, firstSlashIndex);
            const path = pathWithBucket.substring(firstSlashIndex + 1);
            
            usedItems.add(`${bucket}:${path}`);
        };

        banners?.forEach(b => addUrl(b.image_url));
        pujas?.forEach(p => {
            addUrl(p.image_url);
            if (Array.isArray(p.images)) p.images.forEach(addUrl);
        });
        popups?.forEach(p => {
            addUrl(p.image_mobile);
            addUrl(p.image_web);
        });
        blogs?.forEach(b => addUrl(b.image_url));
        godImages?.forEach(g => addUrl(g.image_url));
        songs?.forEach(s => {
            addUrl(s.audio_url);
            addUrl(s.image_url);
        });
        features?.forEach(f => addUrl(f.image_url));

        console.log(`[Storage Cleanup] Total unique assets found in DB: ${usedItems.size}`);

        // 2. List all files in all buckets recursively
        const allFilesByBucket: Record<string, string[]> = {};
        let totalFilesFound = 0;
        
        for (const bucketName of buckets) {
            allFilesByBucket[bucketName] = [];
            
            async function listDir(path: string = '') {
                const { data, error } = await supabase.storage.from(bucketName).list(path, {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'name', order: 'asc' }
                });

                if (error) {
                    if (error.message?.includes('not found')) return; // Bucket might not exist yet
                    throw error;
                }
                if (!data) return;

                for (const item of data) {
                    const fullPath = path ? `${path}/${item.name}` : item.name;
                    if (item.id === null) {
                        // It's a folder
                        await listDir(fullPath);
                    } else {
                        // It's a file
                        allFilesByBucket[bucketName].push(fullPath);
                        totalFilesFound++;
                    }
                }
            }

            await listDir();
        }

        console.log(`[Storage Cleanup] Total files found in storage: ${totalFilesFound}`);

        // 3. Find Unused Files
        const unusedByBucket: Record<string, string[]> = {};
        let totalUnusedCount = 0;

        for (const bucketName of buckets) {
            unusedByBucket[bucketName] = allFilesByBucket[bucketName].filter(filePath => 
                !usedItems.has(`${bucketName}:${filePath}`)
            );
            totalUnusedCount += unusedByBucket[bucketName].length;
        }
        
        // 4. Perform Deletion if NOT dryRun
        if (!dryRun && totalUnusedCount > 0) {
            for (const bucketName of buckets) {
                const filesToDelete = unusedByBucket[bucketName];
                if (filesToDelete.length === 0) continue;

                // Delete in batches of 10
                for (let i = 0; i < filesToDelete.length; i += 10) {
                    const batch = filesToDelete.slice(i, i + 10);
                    const { error } = await supabase.storage.from(bucketName).remove(batch);
                    if (error) console.error(`Failed to delete batch from ${bucketName}:`, batch, error);
                }
            }
        }

        // Prepare sample list for UI
        const sampleUnused: string[] = [];
        for (const bucketName of buckets) {
            unusedByBucket[bucketName].forEach(f => {
                if (sampleUnused.length < 100) sampleUnused.push(`[${bucketName}] ${f}`);
            });
        }

        return NextResponse.json({
            success: true,
            dryRun,
            scannedInDb: usedItems.size,
            scannedInStorage: totalFilesFound,
            unusedCount: totalUnusedCount,
            unusedFiles: sampleUnused,
            note: totalUnusedCount > 100 ? `Plus ${totalUnusedCount - 100} more...` : undefined,
            status: dryRun ? 'Scanning Complete (No files deleted)' : `Cleanup Complete (${totalUnusedCount} files purged)`
        });

    } catch (error: any) {
        console.error('[Storage Cleanup Error]', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
