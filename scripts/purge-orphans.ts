import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.local from admin-panel
dotenv.config({ path: path.resolve(process.cwd(), 'admin-panel/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase credentials in admin-panel/.env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function purgeOrphans() {
    console.log('Starting Global Storage Purge...');

    const buckets = ['banners', 'pujas', 'popups', 'music', 'website', 'music_assets'];

    // 1. Gather all "Used" URLs
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

    const usedItems = new Set<string>();

    const addUrl = (url: string | null | undefined) => {
        if (!url) return;
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

    console.log(`Unique assets referenced in DB: ${usedItems.size}`);

    // 2. Scan and Delete
    let totalDeleted = 0;

    for (const bucketName of buckets) {
        console.log(`Scanning bucket: ${bucketName}...`);
        
        const allFiles: string[] = [];
        async function listDir(dirPath: string = '') {
            const { data, error } = await supabase.storage.from(bucketName).list(dirPath, { limit: 100 });
            if (error) return;
            if (!data) return;

            for (const item of data) {
                const fullPath = dirPath ? `${dirPath}/${item.name}` : item.name;
                if (item.id === null) await listDir(fullPath);
                else allFiles.push(fullPath);
            }
        }

        await listDir();
        
        const unused = allFiles.filter(f => !usedItems.has(`${bucketName}:${f}`));
        
        if (unused.length > 0) {
            console.log(`Deleting ${unused.length} orphaned files from ${bucketName}...`);
            // Delete in batches
            for (let i = 0; i < unused.length; i += 10) {
                const batch = unused.slice(i, i + 10);
                const { error } = await supabase.storage.from(bucketName).remove(batch);
                if (error) console.error(`Error deleting batch from ${bucketName}:`, error.message);
                else totalDeleted += batch.length;
            }
        }
    }

    console.log(`Purge Complete. Total files deleted: ${totalDeleted}`);
}

purgeOrphans();
