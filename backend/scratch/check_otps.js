const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env.local') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkOtps() {
    const { data, error } = await supabase
        .from('otps')
        .select('*')
        .limit(10);
    
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('OTPs:', JSON.stringify(data, null, 2));
    }
}

checkOtps();
