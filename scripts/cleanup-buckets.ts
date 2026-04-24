import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'admin-panel/.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function inspectAndCleanup() {
    const bucketsToDelete = ['puja', 'avatars', 'music_assets'];

    for (const b of bucketsToDelete) {
        console.log(`Checking bucket: ${b}...`);
        const { data: files, error: listError } = await supabase.storage.from(b).list('', { limit: 100 });
        
        if (listError) {
            console.log(`Bucket ${b} does not exist or error: ${listError.message}`);
            continue;
        }

        console.log(`Bucket ${b} has ${files?.length || 0} top-level items.`);
        
        if (files && files.length > 0) {
            console.log(`WARNING: Bucket ${b} is NOT empty. Listing items:`);
            files.forEach(f => console.log(` - ${f.name} (${f.id ? 'File' : 'Folder'})`));
        } else {
            console.log(`Bucket ${b} is empty. Deleting...`);
            const { error: delError } = await supabase.storage.deleteBucket(b);
            if (delError) console.error(`Failed to delete bucket ${b}:`, delError.message);
            else console.log(`Bucket ${b} deleted successfully.`);
        }
    }
}

inspectAndCleanup();
