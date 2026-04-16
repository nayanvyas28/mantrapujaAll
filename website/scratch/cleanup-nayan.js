import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from website directory
dotenv.config({ path: path.join(process.cwd(), 'website', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanup() {
    console.log("Cleaning up 'Nayan Vyas' data...");
    
    // 1. Delete from user_kundalis
    const { data: kDeleted, error: kError } = await supabase
        .from('user_kundalis')
        .delete()
        .ilike('full_name', '%Nayan Vyas%');
        
    if (kError) console.error("Error deleting Kundalis:", kError);
    else console.log("Deleted Kundalis successfully.");

    // 2. Delete from user_vedic_profiles
    const { data: vDeleted, error: vError } = await supabase
        .from('user_vedic_profiles')
        .delete()
        .ilike('full_name', '%Nayan Vyas%');
        
    if (vError) console.error("Error deleting Vedic Profiles:", vError);
    else console.log("Deleted Vedic Profiles successfully.");
}

cleanup();
