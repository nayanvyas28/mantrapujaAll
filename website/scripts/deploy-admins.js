
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Load from .env.local logic (simplified)
const SUPABASE_URL = "http://supabasekong-ikokgwcgw8s44s4g0kckwgsw.34.93.68.183.sslip.io";
const SUPABASE_SERVICE_ROLE_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function deployAdmins() {
    console.log("Checking for 'admins' table...");

    // Check if table exists by trying to select from it
    const { error: checkError } = await supabase.from('admins').select('count').limit(1);

    if (checkError && checkError.code === '42P01') { // undefined_table
        console.error("❌ CRITICAL: Table 'admins' does not exist.");
        console.log("Please run this SQL in your Supabase SQL Editor:");
        console.log(`
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
        `);
        return;
    } else if (checkError) {
        console.error("Error checking table:", checkError);
        return;
    }

    console.log("✅ Table 'admins' exists. Seeding admin user...");

    const email = 'admin@mantrapooja.com';
    const password = 'admin'; // Default password
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from('admins')
        .upsert([
            {
                email,
                password_hash: hashedPassword,
                role: 'admin'
            }
        ], { onConflict: 'email' })
        .select();

    if (error) {
        console.error("Error creating admin user:", error);
    } else {
        console.log("Success! Admin user created/updated:", data);
        console.log(`Credentials: ${email} / ${password}`);
    }
}

deployAdmins();
