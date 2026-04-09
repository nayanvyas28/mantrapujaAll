const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Error: Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const migrations = [
    'supabase/migrations/20260401_create_kundli_settings.sql',
    'supabase/migrations/20260401_unlock_kundli_settings.sql'
];

async function runSQL(sql) {
    // Try exec_sql first
    let { data, error } = await supabase.rpc('exec_sql', { sql });
    if (error && error.message.includes('function "exec_sql" does not exist')) {
        // Try alternate name
        ({ data, error } = await supabase.rpc('exec_sql_query', { query: sql }));
    }
    if (error && error.message.includes('function "exec_sql_query" does not exist')) {
        // Final attempt: maybe the user already has a way to run it?
        // Or maybe just try running statements one by one? (Complex)
        throw new Error('No SQL execution RPC found. Please run the SQL manually in the Supabase Dashboard.');
    }
    if (error) throw error;
    return data;
}

async function main() {
    console.log('--- STARTING KUNDLI MIGRATIONS ---');
    for (const migration of migrations) {
        console.log(`Running: ${migration}...`);
        try {
            const sql = fs.readFileSync(migration, 'utf8');
            await runSQL(sql);
            console.log(`✅ Success: ${migration}`);
        } catch (e) {
            console.error(`❌ Failed: ${migration}`);
            console.error(e.message);
            // Don't stop for now, try the next one
        }
    }
    console.log('--- MIGRATIONS FINISHED ---');
}

main();
