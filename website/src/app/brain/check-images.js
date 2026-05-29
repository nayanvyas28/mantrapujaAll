const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSpecificImages() {
  const { data } = await supabase.from('poojas').select('name, images, hero_image, heroImage').ilike('name', '%Krishna%');
  console.log('Krishna Puja Images:', JSON.stringify(data, null, 2));

  const { data: data2 } = await supabase.from('poojas').select('name, images, hero_image, heroImage').ilike('name', '%Sanjivani%');
  console.log('Sanjivani Puja Images:', JSON.stringify(data2, null, 2));
}

checkSpecificImages();
