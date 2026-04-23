const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function deepCheckTables() {
    const tables = ['wallets', 'referrals', 'wallet_transactions', 'referral_codes', 'settings'];
    console.log('--- Deep Table Audit ---');
    
    for (const table of tables) {
        // Try to get one row to see columns
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(1);
        
        if (error) {
            if (error.code === 'PGRST116') {
                 // Table exists but no rows
                 console.log(`Table '${table}': EXISTS (But empty)`);
            } else if (error.message.includes('does not exist')) {
                 console.log(`Table '${table}': DOES NOT EXIST`);
            } else {
                 console.log(`Table '${table}': ERROR - ${error.message}`);
            }
        } else {
            console.log(`Table '${table}': EXISTS`);
            if (data && data.length > 0) {
                console.log(`  Columns: ${Object.keys(data[0]).join(', ')}`);
            } else {
                console.log(`  Columns: Could not determine (Table empty)`);
            }
        }
    }
}

deepCheckTables();
