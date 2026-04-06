
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkCategories() {
    console.log("Checking 'categories' table...");
    const { data: categories, error } = await supabase.from('categories').select('*');

    if (error) {
        console.error("Error fetching categories:", error);
    } else {
        console.log(`Found ${categories.length} categories.`);
        if (categories.length > 0) {
            console.log("Sample Category:", JSON.stringify(categories[0], null, 2));
        }
    }
}

checkCategories();
