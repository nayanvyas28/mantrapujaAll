const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Use PUBLIC key to simulate user behavior
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkRLS() {
  try {
    const { data, error } = await supabase.from('user_profiles').insert({ id: '00000000-0000-0000-0000-000000000001' });
    console.log('Public Client Insert Error:', error);
  } catch (err) {
    console.error(err);
  }
}

checkRLS();
