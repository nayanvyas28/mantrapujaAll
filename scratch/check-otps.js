const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'website/.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkOtps() {
    const { data: cols, error } = await supabase.from('otps').select('*').limit(1);
    if (error) console.error(error);
    else console.log("OTPs columns:", Object.keys(cols[0] || {}));
    
    // Check constraints if possible via RPC or just try a dummy insert to see error
    const { error: insertError } = await supabase.from('otps').insert({ phone: 'test', otp: '123456', purpose: 'UPDATE_PHONE' });
    console.log("Insert Test Result:", insertError ? insertError.message : "Success");
}
checkOtps();
