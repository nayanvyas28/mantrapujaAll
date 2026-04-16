const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkUserProfiles() {
  try {
    const { data, error } = await supabase.from('user_profiles').select('*').limit(1);
    if (error) {
      console.error('Error selecting from user_profiles:', error.message);
    } else {
      console.log('user_profiles data:', data);
    }

    // Try to get column names via a different method if possible
    // Since we don't have migrations easily accessible, we'll try to insert a dummy row with a random UUID
    const { error: insertError } = await supabase.from('user_profiles').insert({ id: '00000000-0000-0000-0000-000000000000' });
    if (insertError) {
      console.log('Insert Error (to see columns):', insertError.message);
    }
  } catch (err) {
    console.error(err);
  }
}

checkUserProfiles();
