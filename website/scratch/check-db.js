const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSchema() {
  try {
    const { data: profileCheck, error: pError } = await supabase.from('user_profiles').select('*').limit(1);
    console.log('User Profile Table Exists:', !pError);
    if (pError) console.log('Error checking user_profiles:', pError.message);

    const { data: vedicCheck, error: vError } = await supabase.from('user_vedic_profiles').select('*').limit(1);
    console.log('Vedic Profile Table Exists:', !vError);
  } catch (err) {
    console.error(err);
  }
}

checkSchema();
