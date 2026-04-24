
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'website/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase env vars");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearToday() {
    const today = new Date().toISOString().split('T')[0];
    console.log(`Clearing horoscopes for date: ${today}`);
    
    const { data, error } = await supabase
        .from('horoscopes')
        .delete()
        .eq('reference_date', today);
        
    if (error) {
        console.error("Delete error:", error);
    } else {
        console.log("Deleted today's cached horoscopes successfully.");
    }
}

clearToday();
