const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'website/.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function testUpsert() {
    const expiresAt = new Date(Date.now() + 10 * 60000).toISOString();
    const { error: upsertError } = await supabase
        .from('otps')
        .upsert({
            phone: 'test_upsert',
            otp: '123456', 
            purpose: 'REGISTER',
            expires_at: expiresAt
        }, { onConflict: 'phone,purpose' });
    
    if (upsertError) {
        console.log("Upsert Error:", upsertError.message);
        console.log("Error Details:", JSON.stringify(upsertError, null, 2));
    } else {
        console.log("Upsert Success!");
    }
}
testUpsert();
