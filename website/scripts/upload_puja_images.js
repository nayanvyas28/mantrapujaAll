require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const imagesDir = path.join(process.cwd(), 'public', 'puja images');
const bucketName = 'puja';

async function uploadImages() {
    try {
        if (!fs.existsSync(imagesDir)) {
            console.error(`Directory not found: ${imagesDir}`);
            return;
        }

        const files = fs.readdirSync(imagesDir);
        console.log(`Found ${files.length} files in ${imagesDir}`);

        for (const file of files) {
            const filePath = path.join(imagesDir, file);
            const fileBuffer = fs.readFileSync(filePath);
            const contentType = file.endsWith('.png') ? 'image/png' : 'image/jpeg'; // naive check

            console.log(`Uploading ${file}...`);

            const { data, error } = await supabase
                .storage
                .from(bucketName)
                .upload(file, fileBuffer, {
                    contentType: contentType,
                    upsert: true
                });

            if (error) {
                console.error(`Error uploading ${file}:`, error.message);
            } else {
                console.log(`Successfully uploaded ${file}:`, data.path);
            }
        }
        console.log('Upload process completed.');

    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

uploadImages();
