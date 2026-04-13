const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'website/.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function inspectBanners() {
  const { data, error } = await supabase
    .from('home_banners')
    .select('*')
    .eq('is_active', true);
  
  if (error) {
    console.error('Error fetching banners:', error);
    return;
  }
  
  console.log('Active Banners:', JSON.stringify(data, null, 2));
}

inspectBanners();
