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

async function checkSahil() {
    const { data, error } = await supabase
        .from('poojas')
        .select('*')
        .eq('slug', 'sahil-pooja')
        .single();

    if (error) {
        console.error('Sahil Pooja not found or error:', error.message);
        return;
    }

    console.log('Sahil Pooja found. Populated columns:');
    Object.keys(data).forEach(key => {
        if (data[key] !== null) {
            console.log(`- ${key}: ${typeof data[key]} (${Array.isArray(data[key]) ? 'Array' : ''})`);
        }
    });
}

checkSahil();
