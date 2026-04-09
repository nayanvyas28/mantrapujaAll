#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
);

async function checkTables() {
    console.log('Checking which tables exist...\n');

    const tables = ['festivals', 'locations', 'poojas', 'categories'];

    for (const table of tables) {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(1);

        if (error) {
            console.log(`❌ ${table}: Does NOT exist (${error.code})`);
        } else {
            console.log(`✅ ${table}: EXISTS`);
            if (data && data.length > 0) {
                const hasIsActive = 'is_active' in data[0];
                console.log(`   - has is_active column: ${hasIsActive ? 'YES' : 'NO'}`);
            }
        }
    }
}

checkTables();
