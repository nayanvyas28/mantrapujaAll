
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

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
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSchema() {
    try {
        const { data, error } = await supabase
            .from('poojas')
            .select('*')
            .limit(1)
            .single();

        if (error) {
            console.error('Error fetching data:', error);
            return;
        }

        console.log('Columns in poojas table:');
        console.log(JSON.stringify(Object.keys(data).sort(), null, 2));
    } catch (e) {
        console.error('Unexpected error:', e);
    }
}

checkSchema();
