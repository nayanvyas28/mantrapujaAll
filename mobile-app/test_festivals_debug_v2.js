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

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    console.log('Current Today String:', today);

    const { data: firstTen, error: err1 } = await supabase
        .from('festivals')
        .select('name, date, is_active')
        .order('date', { ascending: true })
        .limit(10);

    if (err1) {
        console.error('Error 1:', err1);
        return;
    }

    console.log('First 10 festivals in DB (all):');
    console.table(firstTen);

    const { data: upcoming, error: err2 } = await supabase
        .from('festivals')
        .select('name, date')
        .gte('date', today)
        .order('date', { ascending: true })
        .limit(5);

    if (err2) {
        console.error('Error 2:', err2);
        return;
    }

    console.log('--- RESULTS FOR Filter: date >=', today, '---');
    if (upcoming.length === 0) {
        console.log('NO UPCOMING FESTIVALS FOUND in DB.');
    } else {
        console.table(upcoming);
    }
}

test();
