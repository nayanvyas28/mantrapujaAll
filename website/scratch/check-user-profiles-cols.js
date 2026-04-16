const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkUserProfilesSchema() {
  try {
    // Check if user_profiles has columns
    // We already know id exists.
    const columns = ['full_name', 'phone_number', 'marketing_source', 'onboarding_completed'];
    for (const col of columns) {
      const { error } = await supabase.from('user_profiles').select(col).limit(1);
      console.log(`Column '${col}' in user_profiles:`, error ? 'MISSING' : 'EXISTS');
    }
  } catch (err) {
    console.error(err);
  }
}

checkUserProfilesSchema();
