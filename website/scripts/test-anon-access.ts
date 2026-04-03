
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

// Initialize with ANON key (simulating frontend)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkAnonAccess() {
    console.log("Attempting to fetch 'categories' with ANON key...");
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .limit(1);

    if (error) {
        console.error("❌ RLS Error or Access Denied:", error);
    } else {
        console.log("✅ Success! Public access is working.");
        console.log("Data sample:", data);
        if (data.length === 0) console.log("(Table is empty, but access worked)");
    }
}

checkAnonAccess();
