const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkCols() {
  try {
    const { data: up, error: ue } = await supabase.from('user_profiles').select('*').limit(1);
    console.log('user_profiles row:', up);
    if (up && up.length > 0) {
      console.log('user_profiles columns:', Object.keys(up[0]));
    }

    const { data: p, error: pe } = await supabase.from('profiles').select('*').limit(1);
    console.log('profiles row:', p);
    if (p && p.length > 0) {
      console.log('profiles columns:', Object.keys(p[0]));
    }
  } catch (err) {
    console.error(err);
  }
}

checkCols();
