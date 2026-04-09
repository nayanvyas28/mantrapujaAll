
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

async function runMigration() {
    console.log('Running Sahil Pooja Migration...');

    // 1. Add missing column first (if it doesn't exist)
    // We can't run raw SQL easily via the JS client without an RPC, 
    // but the migrate.js used rpc('exec_sql'). Let's see if we can use it.

    const alterSql = `
        ALTER TABLE public.poojas 
        ADD COLUMN IF NOT EXISTS timing_muhurat_title TEXT DEFAULT 'Shubh Muhurat';
    `;

    console.log('Attemping to add timing_muhurat_title column...');
    const { error: alterError } = await supabase.rpc('exec_sql', { sql_query: alterSql });

    if (alterError) {
        console.warn('Could not add column via exec_sql RPC (might not exist):', alterError.message);
        console.log('Continuing with data migration assuming column exists or will be added manually.');
    } else {
        console.log('Column timing_muhurat_title checked/added successfully.');
    }

    // 2. Read and run the Sahil Pooja SQL
    const sqlPath = path.resolve(__dirname, '../supabase/migrations/add_sahil_pooja.sql');
    const sahilSql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing Sahil Pooja SQL...');
    const { error: sahilError } = await supabase.rpc('exec_sql', { sql_query: sahilSql });

    if (sahilError) {
        console.error('Error executing Sahil Pooja SQL:', sahilError.message);
        return;
    }

    console.log('Sahil Pooja Migration completed successfully! ✅');
}

runMigration();
