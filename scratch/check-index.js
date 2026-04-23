const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'website/.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkIndex() {
    const { data, error } = await supabase.rpc('get_table_indices', { table_name: 'otps' });
    if (error) {
        console.log("Checking index manually via duplicate insert test");
        const expiresAt = new Date(Date.now() + 10 * 60000).toISOString();
        
        // Try to insert two records with same phone but different purpose
        const phone = '9999999999';
        await supabase.from('otps').delete().eq('phone', phone);
        
        console.log("Insert 1 (REGISTER)...");
        const r1 = await supabase.from('otps').insert({ phone, otp: '111111', purpose: 'REGISTER', expires_at: expiresAt });
        console.log("R1:", r1.error ? r1.error.message : "Success");
        
        console.log("Insert 2 (UPDATE_PHONE)...");
        const r2 = await supabase.from('otps').insert({ phone, otp: '222222', purpose: 'UPDATE_PHONE', expires_at: expiresAt });
        console.log("R2:", r2.error ? r2.error.message : "Success");
    } else {
        console.log("Indices:", data);
    }
}
checkIndex();
