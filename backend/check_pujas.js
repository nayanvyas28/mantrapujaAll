const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPujas() {
    const { data, error } = await supabase
        .from('poojas')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching pujas:', error);
        return;
    }

    console.log('Puja columns:', Object.keys(data[0]));
    console.log('Sample Puja:', JSON.stringify(data[0], null, 2));
}

checkPujas();
