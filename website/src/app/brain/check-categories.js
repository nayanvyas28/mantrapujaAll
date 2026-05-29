const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkCategories() {
  const { data: categories } = await supabase.from('categories').select('name');
  console.log('Categories Table:', categories);

  const { data: poojas } = await supabase.from('poojas').select('name, categories(name)').limit(5);
  console.log('Poojas Categories Join:', JSON.stringify(poojas, null, 2));
}

checkCategories();
