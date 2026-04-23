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

const buckets = ['banners', 'pujas', 'popups', 'music', 'website'];

async function setupBuckets() {
    console.log('Starting bucket setup...');
    
    for (const bucketName of buckets) {
        console.log(`Checking bucket: ${bucketName}`);
        const { data: bucket, error: getError } = await supabase.storage.getBucket(bucketName);
        
        if (getError) {
            console.log(`Creating bucket: ${bucketName}`);
            const { data, error: createError } = await supabase.storage.createBucket(bucketName, {
                public: true,
                allowedMimeTypes: ['image/*', 'audio/*'],
                fileSizeLimit: 52428800 // 50MB
            });
            
            if (createError) {
                console.error(`Failed to create bucket ${bucketName}:`, createError.message);
            } else {
                console.log(`Successfully created bucket: ${bucketName}`);
            }
        } else {
            console.log(`Bucket already exists: ${bucketName}`);
        }
    }
    
    console.log('Bucket setup complete.');
}

setupBuckets();
