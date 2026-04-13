const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function inspectSchema() {
    console.log("Detecting required columns (pass 2)...");
    // Generate a unique slug to avoid uniqueness constraint failures
    const slug = 'test-' + Date.now();
    const { data, error } = await supabase.from('poojas').insert({ name: 'Test', slug: slug }).select();
    
    if (error) {
        console.log("Requirement check failed:", error.message);
    } else {
        console.log("Success! Only 'name' and 'slug' were mandatory.");
        console.log("Inserted row sample:", data[0]);
    }
}

inspectSchema();
