const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'website/.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
    const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'profiles' });
    if (error) {
        // Fallback to direct query if RPC doesn't exist
        console.log("RPC failed, trying direct select");
        const { data: cols, error: err2 } = await supabase.from('profiles').select('*').limit(1);
        if (err2) console.error(err2);
        else console.log("Columns found:", Object.keys(cols[0] || {}));
    } else {
        console.log("Columns:", data);
    }
}
check();
