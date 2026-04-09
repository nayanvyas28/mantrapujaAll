const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspectSchema() {
    // We can use a trick to get types by trying to select a non-existent column in a way that returns schema info?
    // Not easily in Supabase JS without RPC.
    // However, we can fetch one row and check the JS type.
    const { data, error } = await supabase
        .from('poojas')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    if (data.length > 0) {
        const item = data[0];
        console.log('Column | JS Type | Sample Value');
        console.log('-------|---------|-------------');
        Object.keys(item).forEach(key => {
            const val = item[key];
            const type = Array.isArray(val) ? 'Array' : typeof val;
            let sample = val;
            if (type === 'object' && val !== null) sample = JSON.stringify(val).substring(0, 30) + '...';
            console.log(`${key} | ${type} | ${sample}`);
        });
    } else {
        console.log('No data in "poojas" table to inspect.');
    }
}

inspectSchema();
