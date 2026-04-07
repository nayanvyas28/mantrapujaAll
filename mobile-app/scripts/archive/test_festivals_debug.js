const { createClient } = require('@supabase/supabase-js');
const dotnet = require('dotenv');
const fs = require('fs');

const env = dotnet.parse(fs.readFileSync('.env.local'));
const supabaseUrl = env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    console.log('Current Today String:', today);

    const { data, error } = await supabase
        .from('festivals')
        .select('name, date, is_active')
        .order('date', { ascending: true })
        .limit(10);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('First 10 festivals in DB:');
    console.table(data);

    const { data: upcoming, error: err2 } = await supabase
        .from('festivals')
        .select('name, date')
        .gte('date', today)
        .order('date', { ascending: true })
        .limit(5);

    if (err2) {
        console.error('GTE Error:', err2);
        return;
    }

    console.log('GTE Result for', today, ':');
    console.table(upcoming);
}

test();
