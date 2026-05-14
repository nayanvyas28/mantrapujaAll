const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function listPujas() {
  const { data } = await supabase.from('poojas').select('name, images');
  data.forEach(p => {
    if (p.images && p.images.length > 0) {
        console.log(`GOOD: ${p.name} - ${p.images[0]}`);
    } else {
        console.log(`BAD: ${p.name}`);
    }
  });
}

listPujas();
