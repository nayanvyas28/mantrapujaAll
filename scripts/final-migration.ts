import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import fetch from 'node-fetch';

dotenv.config({ path: path.resolve(process.cwd(), 'admin-panel/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function migrate() {
    console.log('--- STORAGE MIGRATION START ---');

    const mappings = [
        { table: 'home_banners', column: 'image_url', targetBucket: 'banners' },
        { table: 'poojas', column: 'image_url', targetBucket: 'pujas' },
        { table: 'poojas', column: 'images', targetBucket: 'pujas', isArray: true },
        { table: 'marketing_popups', column: 'image_mobile', targetBucket: 'popups' },
        { table: 'marketing_popups', column: 'image_web', targetBucket: 'popups' },
        { table: 'blogs', column: 'image_url', targetBucket: 'website', pathPrefix: 'blogs/' },
        { table: 'music_gods', column: 'image_url', targetBucket: 'music', pathPrefix: 'deities/' },
        { table: 'music_songs', column: 'audio_url', targetBucket: 'music', pathPrefix: 'audio/' },
        { table: 'music_songs', column: 'image_url', targetBucket: 'music', pathPrefix: 'covers/' },
        { table: 'home_features', column: 'image_url', targetBucket: 'website', pathPrefix: 'features/' }
    ];

    for (const m of mappings) {
        console.log(`Checking ${m.table}.${m.column}...`);
        const { data, error } = await supabase.from(m.table).select(`id, ${m.column}`);
        if (error || !data) continue;

        for (const row of data) {
            const val = row[m.column];
            if (!val) continue;

            if (m.isArray && Array.isArray(val)) {
                const newArray = [];
                let changed = false;
                for (const url of val) {
                    if (url.includes('music_assets')) {
                        const newUrl = await migrateFile(url, m.targetBucket, m.pathPrefix || '');
                        newArray.push(newUrl);
                        changed = true;
                    } else {
                        newArray.push(url);
                    }
                }
                if (changed) {
                    await supabase.from(m.table).update({ [m.column]: newArray }).eq('id', row.id);
                }
            } else if (typeof val === 'string' && val.includes('music_assets')) {
                const newUrl = await migrateFile(val, m.targetBucket, m.pathPrefix || '');
                await supabase.from(m.table).update({ [m.column]: newUrl }).eq('id', row.id);
            }
        }
    }

    console.log('--- STORAGE MIGRATION COMPLETE ---');
    
    // Now delete legacy buckets
    console.log('Deleting legacy buckets...');
    const legacy = ['music_assets', 'avatars', 'puja'];
    for (const b of legacy) {
        // Must empty it first? No, we can try to just delete if it's empty or force delete contents
        console.log(`Cleaning up bucket: ${b}...`);
        await emptyAndDeleteBucket(b);
    }
}

async function migrateFile(oldUrl: string, targetBucket: string, prefix: string): Promise<string> {
    try {
        console.log(`  Migrating: ${oldUrl}`);
        
        // 1. Extract path from old URL
        const parts = oldUrl.split('/music_assets/');
        if (parts.length < 2) return oldUrl;
        const oldPath = decodeURIComponent(parts[1]);
        const fileName = oldPath.split('/').pop()!;
        const targetPath = `${prefix}${fileName}`;

        // 2. Download from old bucket
        const { data: blob, error: downloadError } = await supabase.storage.from('music_assets').download(oldPath);
        if (downloadError || !blob) {
            console.error(`    Download failed: ${downloadError?.message}`);
            return oldUrl;
        }

        // 3. Upload to NEW bucket
        const { error: uploadError } = await supabase.storage.from(targetBucket).upload(targetPath, blob, {
            contentType: blob.type,
            upsert: true
        });

        if (uploadError) {
             console.error(`    Upload failed: ${uploadError.message}`);
             return oldUrl;
        }

        // 4. Return new URL
        const { data: { publicUrl } } = supabase.storage.from(targetBucket).getPublicUrl(targetPath);
        console.log(`    Success -> ${publicUrl}`);
        return publicUrl;

    } catch (err) {
        console.error(`    Migration failed: ${err}`);
        return oldUrl;
    }
}

async function emptyAndDeleteBucket(bucketName: string) {
    async function listAndDelete(currentPath: string = '') {
        const { data, error } = await supabase.storage.from(bucketName).list(currentPath);
        if (error || !data) return;

        for (const item of data) {
            const fullPath = currentPath ? `${currentPath}/${item.name}` : item.name;
            if (item.id === null) {
                await listAndDelete(fullPath);
            } else {
                await supabase.storage.from(bucketName).remove([fullPath]);
            }
        }
    }

    await listAndDelete();
    const { error } = await supabase.storage.deleteBucket(bucketName);
    if (!error) console.log(`  Bucket ${bucketName} deleted.`);
    else console.log(`  Could not delete bucket ${bucketName}: ${error.message}`);
}

migrate();
