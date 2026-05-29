const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function listAll() {
  const { data } = await supabase.from('poojas').select('name, categories(name)');
  const counts = {};
  data.forEach(p => {
    const cat = p.categories?.name || 'No Category';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  console.log('Category Counts:', counts);
  
  console.log('Business related but in other categories:');
  console.log(data.filter(p => p.name.toLowerCase().includes('business') || p.name.toLowerCase().includes('growth')));
}

listAll();
