
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length === 2) {
        env[parts[0].trim()] = parts[1].trim();
    }
});

const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSchema() {
    console.log('Checking poojas table schema...');

    // Get one row to see columns
    const { data, error } = await supabase
        .from('poojas')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    if (data && data.length > 0) {
        console.log('Columns found in poojas table:');
        console.log(Object.keys(data[0]).join(', '));
    } else {
        console.log('No data in poojas table, attempting to get columns via alternate method...');
        // Try a dummy query that might return column metadata if supported
    }
}

checkSchema();
