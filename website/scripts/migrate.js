
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
    env.SUPABASE_SERVICE_ROLE_KEY // Use service role for DDL
);

async function migrate() {
    console.log('Starting migration...');

    // SQL to add columns
    const sql = `
    ALTER TABLE poojas 
    ADD COLUMN IF NOT EXISTS hero_badge_text TEXT DEFAULT 'Premium Vedic Ritual',
    ADD COLUMN IF NOT EXISTS hero_glass_badge_label TEXT DEFAULT 'Performed By',
    ADD COLUMN IF NOT EXISTS hero_glass_badge_value TEXT DEFAULT 'Certified Vedic Archaryas',
    ADD COLUMN IF NOT EXISTS about_heading TEXT DEFAULT 'Ancient Wisdom',
    ADD COLUMN IF NOT EXISTS about_subheading TEXT DEFAULT 'For Modern Life',
    ADD COLUMN IF NOT EXISTS timing_subtitle TEXT DEFAULT 'Cosmic Alignment',
    ADD COLUMN IF NOT EXISTS footer_title TEXT DEFAULT 'Ready to Invite Divine Blessings?',
    ADD COLUMN IF NOT EXISTS footer_description TEXT DEFAULT 'Don''t wait for the "perfect time". The moment you decide to connect with the divine is the perfect muhurat.';
    `;

    // Note: Supabase JS client doesn't support direct DDL via .rpc() unless a specific function exists.
    // However, we can try to use a generic 'exec_sql' if it exists, or suggest manual application if not.
    // Usually, in these environments, we might have a helper or can use the REST API for simple things.
    // Given the constraints, I will try to use the most likely path or provide the SQL clearly.

    try {
        const { error } = await supabase.rpc('exec_sql', { sql_query: sql });

        if (error) {
            if (error.message.includes('function "exec_sql" does not exist')) {
                console.log('--- MANUAL ACTION REQUIRED ---');
                console.log('Automatic DDL execution failed because "exec_sql" function is missing.');
                console.log('Please run the following SQL in your Supabase SQL Editor:');
                console.log(sql);
                console.log('------------------------------');
            } else {
                console.error('Migration error:', error);
            }
            return;
        }

        console.log('Migration completed successfully!');
    } catch (e) {
        console.error('Unexpected error:', e);
    }
}

migrate();
