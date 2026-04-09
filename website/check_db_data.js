
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkData() {
    console.log("Checking 'poojas' table...");
    const { data: pujas, error } = await supabase.from('poojas').select('*');

    if (error) {
        console.error("Error fetching pujas:", error);
    } else {
        console.log(`Found ${pujas.length} pujas.`);
        if (pujas.length > 0) {
            console.log("Sample Puja:", JSON.stringify(pujas[0], null, 2));
        }
    }
}

checkData();
