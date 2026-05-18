import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLookup() {
    const testEncoded = '%e0%a4%b9%e0%a4%a8%e0%a5%81%e0%a4%ae%e0%a4%be%e0%a4%a8-%e0%a4%9a%e0%a4%be%e0%a4%b2%e0%a5%80%e0%a4%b8%e0%a4%be';
    const testDecoded = decodeURIComponent(testEncoded);

    console.log(`1. Testing direct DB query with DECODED slug: "${testDecoded}"`);
    const { data: dataDecoded, error: errDecoded } = await supabase
        .from('Final_blog')
        .select('title, slug')
        .eq('slug', testDecoded);
    console.log("Result:", dataDecoded, "Error:", errDecoded);

    console.log(`\n2. Testing direct DB query with ENCODED slug: "${testEncoded}"`);
    const { data: dataEncoded, error: errEncoded } = await supabase
        .from('Final_blog')
        .select('title, slug')
        .eq('slug', testEncoded);
    console.log("Result:", dataEncoded, "Error:", errEncoded);
}

testLookup();
