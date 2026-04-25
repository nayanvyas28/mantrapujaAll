const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setAdmin() {
    console.log("Setting navneetparate7@gmail.com as Admin...");
    const { data, error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('email', 'navneetparate7@gmail.com')
        .select();

    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("✅ Success! navneetparate7@gmail.com is now an Admin.");
        console.table(data);
    }
}

setAdmin();
