const { decryptOTP } = require('../src/utils/crypto');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env.local') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDecryption() {
    console.log('--- Key Verification ---');
    console.log('AES_KEY Source:', process.env.PHONE_OPT_ENCRYPTION_STRING_KEY || process.env.ENCRYPTION_STRING_KEY || 'default');

    const { data: settingsData } = await supabase
        .from('admin_settings')
        .select('*');

    if (!settingsData) return console.log('No settings found.');

    for (const row of settingsData) {
        const decrypted = decryptOTP(row.encrypted_value);
        console.log(`Setting: ${row.setting_key} -> Decrypted: ${decrypted ? 'SUCCESS' : 'FAILED'}`);
    }
}

testDecryption();
