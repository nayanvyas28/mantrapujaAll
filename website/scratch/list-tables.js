const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function listTables() {
  try {
    // We can't list tables directly with supabase-js easily without RPC
    // But we can check for common names
    const tables = ['profiles', 'user_profiles', 'users', 'user_vedic_profiles'];
    for (const table of tables) {
      const { error } = await supabase.from(table).select('*').limit(0);
      console.log(`Table '${table}' status:`, error ? `Error: ${error.message}` : 'Exists');
    }
  } catch (err) {
    console.error(err);
  }
}

listTables();
