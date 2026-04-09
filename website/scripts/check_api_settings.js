const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function check() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
        .from('kundli_settings')
        .select('*')
        .eq('setting_key', 'api_config')
        .single();

    if (error) {
        console.log('Error fetching settings:', error.message);
    } else {
        console.log('API Config Data:', JSON.stringify(data, null, 2));
    }
}

check();
