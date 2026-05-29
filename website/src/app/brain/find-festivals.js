const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function findFestivals() {
  const keywords = ['diwali', 'navratri', 'ganesh', 'shivratri', 'holi', 'janmashtami', 'chaturthi', 'purnima'];
  const { data } = await supabase.from('poojas').select('name');
  
  const matches = data.filter(p => {
    const n = p.name.toLowerCase();
    return keywords.some(k => n.includes(k));
  });
  
  console.log('Potential Festival Pujas:', matches);
}

findFestivals();
