const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkVedicProfileSchema() {
  try {
    const { data, error } = await supabase.from('user_vedic_profiles').select('*').limit(1);
    if (data && data.length > 0) {
      console.log('user_vedic_profiles columns:', Object.keys(data[0]));
    } else {
        // Try to probe
        const columns = ['id', 'user_id', 'full_name', 'date_of_birth', 'time_of_birth', 'place_of_birth', 'gender', 'lat', 'lon'];
        for (const col of columns) {
          const { error } = await supabase.from('user_vedic_profiles').select(col).limit(1);
          console.log(`Column '${col}':`, error ? 'MISSING' : 'EXISTS');
        }
    }
  } catch (err) {
    console.error(err);
  }
}

checkVedicProfileSchema();
