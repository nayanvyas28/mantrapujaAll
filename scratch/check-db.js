const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSchema() {
  const { data: pujas, error: pError } = await supabase.from('poojas').select('name, slug').limit(5);
  console.log('Pujas Sample:', pujas);

  const { data: settings, error: sError } = await supabase.from('settings').select('key, value');
  console.log('Settings Keys:', settings?.map(s => s.key));

  const { data: profileCheck, error: prError } = await supabase.from('user_vedic_profiles').select('*').limit(1);
  console.log('Vedic Profile Table Exists:', !prError);
}

checkSchema();
