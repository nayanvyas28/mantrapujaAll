const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Need service role for schema changes if possible, but actually I'll just use SQL if I had a tool. 

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateSchema() {
    console.log('Adding columns to poojas table...');
    
    // We can't easily run ALTER TABLE via supabase-js unless we have a specific RPC or use the SQL API.
    // However, I can try to insert a record with these fields to see if they exist.
    
    const { data, error } = await supabase
        .from('poojas')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching poojas:', error);
        return;
    }

    const columns = Object.keys(data[0] || {});
    console.log('Current columns:', columns);

    const missingColumns = [];
    if (!columns.includes('date')) missingColumns.push('date TIMESTAMP WITH TIME ZONE');
    if (!columns.includes('location')) missingColumns.push('location TEXT');

    if (missingColumns.length === 0) {
        console.log('All columns already exist.');
        return;
    }

    console.log('Missing columns:', missingColumns);
    console.log('Please run the following SQL in Supabase Dashboard:');
    console.log(`ALTER TABLE poojas ADD COLUMN date TIMESTAMP WITH TIME ZONE, ADD COLUMN location TEXT;`);
}

updateSchema();
