#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
);

async function checkColumns() {
    console.log('Checking poojas table structure...\n');

    const { data, error } = await supabase
        .from('poojas')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error:', error);
        return;
    }

    if (data && data.length > 0) {
        console.log('Current columns in poojas table:');
        Object.keys(data[0]).forEach(col => console.log(`  - ${col}`));

        const hasIsActive = 'is_active' in data[0];
        console.log(`\n✓ is_active column exists: ${hasIsActive ? 'YES' : 'NO'}`);
    }
}

checkColumns();
