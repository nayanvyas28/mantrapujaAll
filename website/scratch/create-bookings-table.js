const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://s1.mantrapuja.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro"
);

async function setup() {
    // Note: Creating tables via supabase-js is not directly supported without a specific RPC.
    // I will try to call a generic 'exec_sql' RPC if it exists, or provide the SQL for the user.
    
    const sql = `
        CREATE TABLE IF NOT EXISTS puja_bookings (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            created_at TIMESTAMPTZ DEFAULT now(),
            user_id UUID REFERENCES auth.users(id),
            sankalp_name TEXT NOT NULL,
            puja_name TEXT NOT NULL,
            puja_slug TEXT NOT NULL,
            package_name TEXT NOT NULL,
            price NUMERIC NOT NULL,
            status TEXT DEFAULT 'pending'
        );

        -- Add RLS policies
        ALTER TABLE puja_bookings ENABLE ROW LEVEL SECURITY;
        
        -- Allow users to see their own bookings
        CREATE POLICY "Users can view own bookings" ON puja_bookings
            FOR SELECT USING (auth.uid() = user_id);
            
        -- Allow authenticated users to insert their bookings
        CREATE POLICY "Users can insert own bookings" ON puja_bookings
            FOR INSERT WITH CHECK (auth.uid() = user_id);
    `;

    console.log("SQL to execute in Supabase SQL Editor:");
    console.log(sql);
    
    // Attempting to see if an exec_sql RPC exists (common in some setups)
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    if (error) {
        console.log("Auto-creation failed (RPC 'exec_sql' not found or accessible). Please run the SQL above in your Supabase Dashboard.");
    } else {
        console.log("Table created successfully via RPC!");
    }
}

setup();
