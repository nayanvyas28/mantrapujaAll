const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTable() {
  console.log('Attempting to create user_vedic_profiles table...');
  
  // NOTE: Supabase JS client doesn't support raw SQL easily unless we have an edge function/RPC.
  // I will try to perform a dummy select to check if it exists, and if not, I'll inform the user or try to use an RPC if available.
  // However, I can also try to insert a dummy row to create it if it's dynamic, but Postgres isn't dynamic like that.
  
  // Actually, I can use the 'run_command' with psql if it were available. It's not.
  // I'll check if I can use an RPC 'exec_sql' if it exists.
  
  const { data, error } = await supabase.rpc('exec_sql', { 
    sql_query: `
      CREATE TABLE IF NOT EXISTS user_vedic_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        full_name TEXT,
        date_of_birth DATE,
        time_of_birth TEXT,
        place_of_birth TEXT,
        gender TEXT,
        rashi TEXT,
        nakshatra TEXT,
        numerology_number INT,
        additional_context TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id)
      );
    `
  });

  if (error) {
    console.error('Error creating table (likely rpc exec_sql not enabled):', error.message);
    console.log('I will assume the table needs to be created manually or via migrations if possible.');
  } else {
    console.log('Table created successfully or already exists.');
  }
}

createTable();
