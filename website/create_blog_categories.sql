
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS blog_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Enable RLS
    ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies if they exist to avoid errors
    DROP POLICY IF EXISTS "Allow public select" ON blog_categories;
    DROP POLICY IF EXISTS "Allow all for service role" ON blog_categories;

    -- Allow select for all
    CREATE POLICY "Allow public select" ON blog_categories FOR SELECT USING (true);
    
    -- Authenticated users (admins) can do everything
    CREATE POLICY "Allow all for authenticated" ON blog_categories FOR ALL USING (auth.role() = 'authenticated');
  `;

  // Supabase doesn't have a direct 'sql' execution via JS client except via RPC or similar custom function.
  // I'll try to insert a dummy row to see if it triggers an error that I can use to confirm table existence,
  // but better to just use the SQL tool if available or create a function.
  
  console.log("Please run this SQL in Supabase Dashboard or I will try to use an RPC if available.");
  
  // Checking if I can use 'npx supabase' but that requires local setup.
  // I'll use the 'run_command' with 'psql' if it worked, but it didn't.
  
  // Wait, I can try to use 'npx supabase db execute' if the user has supabase CLI.
  // Or I can just create the table by trying to insert and if it fails, I know.
  // Actually, I'll just write the SQL to a file for the user to run, OR try to find an RPC.
}

createTable();
