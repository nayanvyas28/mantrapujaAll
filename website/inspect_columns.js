const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function listColumns() {
    console.log("Querying column types for 'poojas' table...");
    const { data, error } = await supabase.rpc('inspect_table_columns', { table_name_input: 'poojas' });

    // If RPC doesn't exist, we'll try a direct select from information_schema via query (if possible)
    // Actually, supabase-js doesn't support raw SQL easily unless we use an RPC.
    // Let's try to just select the columns from information_schema using .from() if it's exposed

    console.log("Trying to fetch from information_schema.columns...");
    const { data: cols, error: colError } = await supabase
        .from('columns') // This might not work if not exposed in public schema
        .select('column_name, data_type')
        .eq('table_name', 'poojas');

    if (colError) {
        console.log("Could not access information_schema directly. Using sample row keys.");
        // We already have the keys from the previous step. 
        // Let's just trust the keys we found.
    } else {
        console.log("Column Types:");
        console.table(cols);
    }
}

listColumns();
