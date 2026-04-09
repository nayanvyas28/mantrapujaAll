const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function check() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    try {
        const { data, error } = await supabase.rpc('exec_sql', { sql: 'SELECT 1' });
        if (error) {
            console.log('RPC failed:', error.message);
        } else {
            console.log('RPC succeeded:', data);
        }
    } catch (e) {
        console.log('Unexpected error:', e.message);
    }
}

check();
