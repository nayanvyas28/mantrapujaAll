const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSettings() {
    const { data, error } = await supabase
        .from('kundli_settings')
        .select('*')
        .eq('setting_key', 'api_config')
        .single();

    if (error) {
        console.error('Error fetching settings:', error);
        return;
    }

    console.log('API Config:', JSON.stringify(data.setting_value, null, 2));
}

checkSettings();
