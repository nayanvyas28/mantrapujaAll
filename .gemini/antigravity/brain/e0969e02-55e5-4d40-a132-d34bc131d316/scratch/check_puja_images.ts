
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: 'website/.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkPujas() {
  const { data, error } = await supabase
    .from('poojas')
    .select('name, slug, images')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching pujas:', error);
    return;
  }

  console.log('--- Pujas Image Audit ---');
  data.forEach((p: any) => {
    const hasImage = p.images && p.images.length > 0 && p.images[0] !== '/logo.png';
    console.log(`${p.name} (${p.slug}): ${hasImage ? '✅ Has Image' : '❌ No/Logo Image'} -> ${p.images?.[0] || 'none'}`);
  });
}

checkPujas();
