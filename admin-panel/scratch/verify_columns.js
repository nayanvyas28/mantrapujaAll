const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local from parent dir (admin-panel)
const envPath = path.join(__dirname, '..', '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const supabase = createClient(
    envConfig.NEXT_PUBLIC_SUPABASE_URL,
    envConfig.SUPABASE_SERVICE_ROLE_KEY
);

async function inspectColumns() {
    const tables = ['marketing_popups', 'home_banners'];
    
    for (const table of tables) {
        console.log(`\n--- Inspecting ${table} ---`);
        const { data, error } = await supabase.from(table).select('*').limit(1).maybeSingle();
        
        if (error) {
            console.log(`Error reading ${table}:`, error.message);
        } else if (data) {
            console.log(`Columns in ${table}:`, Object.keys(data));
        } else {
            console.log(`No data in ${table} to inspect columns.`);
            // Try to select just one column to see if it errors
            const { error: colError } = await supabase.from(table).select('show_text_overlay').limit(1).maybeSingle();
            if (colError) {
                console.log(`Column 'show_text_overlay' does NOT exist in ${table}.`);
            } else {
                console.log(`Column 'show_text_overlay' EXISTS in ${table}.`);
            }
        }
    }
}

inspectColumns();
