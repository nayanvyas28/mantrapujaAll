const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'mobile-app/.env' });

const supabaseUrl = 'https://s1.mantrapuja.com';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectProfiles() {
    console.log("Inspecting 'profiles' table...");
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Error:", error.message);
        return;
    }

    if (data && data.length > 0) {
        console.log("Sample Profile Columns:", Object.keys(data[0]));
    } else {
        console.log("No profiles found to inspect.");
    }
}

inspectProfiles();
