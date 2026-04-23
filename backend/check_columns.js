const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
    console.log('--- Checking Columns via SQL (if possible) ---');
    
    // We can't run arbitrary SQL easily, but we can try to insert a dummy row and rollback, 
    // or just use the select with a non-existent column to see the error message which might list columns.
    
    const tables = ['referrals', 'wallet_transactions'];
    
    for (const table of tables) {
        const { error } = await supabase
            .from(table)
            .select('non_existent_column_test_123');
        
        if (error) {
            console.log(`Table '${table}' error:`, error.message);
        }
    }
}

checkColumns();
