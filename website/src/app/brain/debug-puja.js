const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function debugSpecificPuja() {
  const { data, error } = await supabase
    .from('poojas')
    .select('name, categories(name)')
    .ilike('name', '%Business Growth%');

  if (error) console.error(error);
  console.log('Puja Debug:', JSON.stringify(data, null, 2));
}

debugSpecificPuja();
