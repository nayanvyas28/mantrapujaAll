
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSchema() {
  const { data, error } = await supabase.rpc('inspect_table', { table_name: 'blogs' });
  if (error) {
    // If RPC doesn't exist, try a simple select
    console.log("RPC failed, trying select * limit 1");
    const { data: data2, error: error2 } = await supabase.from('blogs').select('*').limit(1);
    if (error2) console.error(error2);
    else console.log("Columns:", Object.keys(data2[0] || {}));
  } else {
    console.log(data);
  }
  
  const { data: catData, error: catError } = await supabase.from('blog_categories').select('*').limit(1);
  if (catError) {
    console.log("blog_categories table does not exist or error:", catError.message);
  } else {
    console.log("blog_categories table exists");
  }
}

checkSchema();
