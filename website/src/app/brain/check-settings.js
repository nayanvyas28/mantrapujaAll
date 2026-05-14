require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'home_quick_access')
    .single();

  if (error) {
    console.log("❌ Error fetching settings:", error.message);
  } else {
    console.log("✅ Current home_quick_access value:");
    console.log(JSON.stringify(data.value, null, 2));
  }
}

checkSettings();
