const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkUserProfilesSchema() {
  try {
    // Try to insert only the ID first
    const testId = '00000000-0000-0000-0000-000000000001';
    const { error: e1 } = await supabase.from('user_profiles').insert({ id: testId });
    console.log('Insert ID Only Error:', e1 ? e1.message : 'Success');

    const { error: e2 } = await supabase.from('user_profiles').insert({ id: testId, full_name: 'Test' });
    console.log('Insert ID + full_name Error:', e2 ? e2.message : 'Success');

    const { error: e3 } = await supabase.from('user_profiles').insert({ id: testId, phone_number: '123' });
    console.log('Insert ID + phone_number Error:', e3 ? e3.message : 'Success');

    const { error: e4 } = await supabase.from('user_profiles').insert({ id: testId, marketing_source: 'Test' });
    console.log('Insert ID + marketing_source Error:', e4 ? e4.message : 'Success');

  } catch (err) {
    console.error(err);
  }
}

checkUserProfilesSchema();
