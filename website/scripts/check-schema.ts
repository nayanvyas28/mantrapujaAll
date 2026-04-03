
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
    console.log("Checking 'categories' table...");
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('count', { count: 'exact', head: true });

    if (catError) {
        console.error("❌ Error accessing 'categories' table:", catError.message);
        if (catError.code === '42P01') {
            console.error("   -> Reason: Table does not exist. Please run the migration '20240523_create_content_structure.sql'.");
        }
    } else {
        console.log("✅ 'categories' table exists.");
    }

    console.log("Checking 'pages' table...");
    const { data: pages, error: pageError } = await supabase
        .from('pages')
        .select('count', { count: 'exact', head: true });

    if (pageError) {
        console.error("❌ Error accessing 'pages' table:", pageError.message);
    } else {
        console.log("✅ 'pages' table exists.");
    }
}

checkSchema();
