const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://s1.mantrapuja.com';
const supabaseKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro';
const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_PATH = '/Users/sahilpatel/Documents/Mantra-puja_app/MP_app_test/MP_App1/assets/images/music/music__img/';
const BUCKET = 'music_assets';

const filesToUpload = [
    { local: '1M.jpeg', remote: 'god_images/1M.jpeg', type: 'image/jpeg' },
    { local: '2M.jpg', remote: 'god_images/2M.jpg', type: 'image/jpeg' },
    { local: '1M.jpeg', remote: 'song_covers/1M.jpeg', type: 'image/jpeg' },
    { local: '2M.jpg', remote: 'song_covers/2M.jpg', type: 'image/jpeg' },
    { local: 'I_Love_to_Travel_Khush_Hone_Ko_by_Rahgir_Song_of_Gratitude_Shubhodeep_Roy_Lateeb_Khan_LOW.mp4', remote: 'audio_files/song_low.mp4', type: 'video/mp4' },
    { local: 'I_Love_to_Travel_Khush_Hone_Ko_by_Rahgir_Song_of_Gratitude_Shubhodeep_Roy_Lateeb_Khan_128KBPS.mp4', remote: 'audio_files/song_high.mp4', type: 'video/mp4' }
];

async function uploadFiles() {
    console.log('Starting upload...');
    for (const file of filesToUpload) {
        const filePath = path.join(BASE_PATH, file.local);
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            continue;
        }

        const fileBuffer = fs.readFileSync(filePath);
        const { data, error } = await supabase.storage
            .from(BUCKET)
            .upload(file.remote, fileBuffer, {
                contentType: file.type,
                upsert: true
            });

        if (error) {
            console.error(`Error uploading ${file.local}:`, error.message);
        } else {
            const { data: publicUrlData } = supabase.storage
                .from(BUCKET)
                .getPublicUrl(file.remote);
            console.log(`Successfully uploaded ${file.local} to ${file.remote}`);
            console.log(`Public URL: ${publicUrlData.publicUrl}`);
        }
    }
    console.log('Upload finished.');
}

uploadFiles();
