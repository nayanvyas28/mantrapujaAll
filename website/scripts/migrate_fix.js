
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
    env.SUPABASE_SERVICE_ROLE_KEY
);

async function migrate() {
    console.log('Adding ritual_process_subtitle...');

    // SQL to add missing column
    const sql = `
    ALTER TABLE poojas 
    ADD COLUMN IF NOT EXISTS ritual_process_subtitle TEXT DEFAULT 'Vedic Vidhi';
    `;

    try {
        const { error } = await supabase.rpc('exec_sql', { sql_query: sql });

        if (error) {
            console.error('Migration error:', error);
            return;
        }

        console.log('Migration completed successfully!');
    } catch (e) {
        console.error('Unexpected error:', e);
    }
}

migrate();
