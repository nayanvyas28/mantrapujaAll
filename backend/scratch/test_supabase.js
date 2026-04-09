require('dotenv').config({ path: '../.env.local' });
require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('URL:', SUPABASE_URL);
console.log('Key length:', SUPABASE_SERVICE_ROLE_KEY ? SUPABASE_SERVICE_ROLE_KEY.length : 0);

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function test() {
    console.log('Testing connection...');
    
    // 1. Test standard data access
    const { data: profileData, error: profileError } = await supabase.from('profiles').select('id').limit(1);
    if (profileError) {
        console.error('Profile Fetch Error:', profileError);
    } else {
        console.log('Profile Fetch Success:', profileData);
    }

    // 2. Test Auth Admin access (List Users)
    console.log('Testing Auth Admin access...');
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers({ perPage: 1 });
    if (userError) {
        console.error('Auth Admin Error:', userError);
    } else {
        console.log('Auth Admin Success: Found', userData.users.length, 'users');
    }
}

test();
