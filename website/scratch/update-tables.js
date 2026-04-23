const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
    "https://s1.mantrapuja.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro"
);

async function updateSchema() {
    const sql = `
        ALTER TABLE puja_bookings ADD COLUMN IF NOT EXISTS scheduled_date TIMESTAMPTZ;
        ALTER TABLE puja_bookings ADD COLUMN IF NOT EXISTS rating INT;
        ALTER TABLE puja_bookings ADD COLUMN IF NOT EXISTS review_text TEXT;
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address JSONB;
    `;

    console.log("SQL to execute:");
    console.log(sql);
    
    fs.writeFileSync('schema_update.sql', sql);

    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    if (error) {
        console.error("Auto-creation failed (RPC 'exec_sql' mostly likely not found):", error);
        console.log("--> PLEASE COPY THE SQL FROM schema_update.sql AND RUN IN SUPABASE SQL EDITOR <--");
    } else {
        console.log("Tables altered successfully via RPC!");
    }
}

updateSchema();
