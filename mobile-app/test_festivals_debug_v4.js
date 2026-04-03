const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

function getEnv() {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    const lines = envFile.split('\n');
    const env = {};
    lines.forEach(line => {
        const match = line.match(/^(\w+)\s*=\s*(.*)$/);
        if (match) {
            env[match[1]] = match[2].replace(/"/g, '').trim();
        }
    });
    return env;
}

const env = getEnv();
const supabaseUrl = env.EXPO_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.EXPO_PUBLIC_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    const { data: first } = await supabase
        .from('festivals')
        .select('*')
        .order('date', { ascending: true })
        .limit(20);

    console.log('--- ALL FETCHED DATA (FIRST 20) ---');
    first.forEach(f => {
        console.log(`[${f.date}] "${f.name}" (Active: ${f.is_active})`);
    });
}
test();
