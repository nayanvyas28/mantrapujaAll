const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function inspectColumns() {
    console.log("Fetching column names for 'poojas'...");
    const { data, error } = await supabase.rpc('get_column_names', { table_name: 'poojas' });
    
    if (error) {
        // Fallback: try to select one row and see keys
        const { data: row, error: rowError } = await supabase.from('poojas').select('*').limit(1).single();
        if (rowError) {
            console.log("Error:", rowError.message);
        } else {
            console.log("Columns found via row inspection:", Object.keys(row));
        }
    } else {
        console.log("Columns:", data);
    }
}

inspectColumns();
