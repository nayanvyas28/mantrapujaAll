import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'admin-panel/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function findReferencedFiles() {
    const tables = [
        ['home_banners', 'image_url'],
        ['poojas', 'image_url'],
        ['poojas', 'images'], // array
        ['marketing_popups', 'image_mobile'],
        ['marketing_popups', 'image_web'],
        ['blogs', 'image_url'],
        ['music_gods', 'image_url'],
        ['music_songs', 'audio_url'],
        ['music_songs', 'image_url'],
        ['home_features', 'image_url']
    ];

    const referencedInMusicAssets: string[] = [];

    for (const [table, col] of tables) {
        const { data } = await supabase.from(table).select(col);
        if (!data) continue;
        
        data.forEach((row: any) => {
            const val = row[col];
            if (Array.isArray(val)) {
                val.forEach(v => {
                    if (v && v.includes('music_assets')) referencedInMusicAssets.push(v);
                });
            } else if (val && val.includes('music_assets')) {
                referencedInMusicAssets.push(val);
            }
        });
    }

    console.log('Files still referenced in music_assets:');
    referencedInMusicAssets.forEach(f => console.log(` - ${f}`));
}

findReferencedFiles();
