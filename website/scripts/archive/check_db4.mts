import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; // EXACTLY what UI uses
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error, count } = await supabase
    .from('poojas')
    .select('*', { count: 'exact' })
    .eq('is_active', true);
  if (error) console.error(error);
  else console.log("Fetched with anon key:", count, data?.length);
  
  if (data && data.length > 0) {
     console.log("Sample:", data[2]?.name, "Category:", data[2]?.slug.includes('festival') ? 'Festival' : 'Rituals');
  }
}
check();
