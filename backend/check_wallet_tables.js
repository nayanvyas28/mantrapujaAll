const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkWalletTables() {
    const tables = ['wallets', 'referrals', 'wallet_transactions', 'referral_codes', 'user_profiles'];
    console.log('Checking for tables...');
    
    for (const table of tables) {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(1);
        
        if (error) {
            console.log(`Table '${table}' does not exist or error:`, error.message);
        } else {
            console.log(`Table '${table}' exists. Columns:`, Object.keys(data[0] || {}));
        }
    }
}

checkWalletTables();
