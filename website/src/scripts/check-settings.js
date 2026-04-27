const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSettings() {
    const { data, error } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', ['guru_ai_templates', 'guru_ai_greeting_en', 'guru_ai_greeting_hi']);

    if (error) {
        console.error('Error fetching settings:', error);
        return;
    }

    console.log('Settings found:', data);
}

checkSettings();
