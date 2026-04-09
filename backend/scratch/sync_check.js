const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env.local') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncCheck() {
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) return console.error(authError);

    const { data: profiles, error: profError } = await supabase.from('profiles').select('id, phone');
    if (profError) return console.error(profError);

    const profileIds = new Set(profiles.map(p => p.id));
    const missing = users.filter(u => !profileIds.has(u.id));

    console.log(`Total Auth Users: ${users.length}`);
    console.log(`Total Profiles: ${profiles.length}`);
    console.log(`Users missing profiles: ${missing.length}`);
    
    if (missing.length > 0) {
        console.log('Missing Users Sample:', JSON.stringify(missing.map(u => ({ id: u.id, phone: u.phone, email: u.email })), null, 2));
    }
}

syncCheck();
