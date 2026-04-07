import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error, count } = await supabase
    .from('poojas')
    .select('id, name, slug, is_featured', { count: 'exact' });
    
  if (error) {
    console.error('Error fetching poojas:', error);
  } else {
    console.log(`Total poojas in DB: ${count}`);
    if (data && data.length > 0) {
      console.log('Sample poojas:');
      data.slice(0, 5).forEach(p => console.log(`- ${p.name} (slug: ${p.slug}, featured: ${p.is_featured})`));
    } else {
        console.log("No poojas found in the database. The insert might not have committed properly, or you are pointing to a different environment.");
    }
  }
}

check();
