const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function check() {
  const { data, error } = await supabase.from('poojas').select('*').limit(1);
  if (error) {
    console.log('ERROR:', error.message);
  } else if (data && data.length > 0) {
    console.log('COLS:', Object.keys(data[0]).join(', '));
  } else {
    console.log('NO DATA');
  }
}
check();
