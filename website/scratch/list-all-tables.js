const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://s1.mantrapuja.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro"
);

async function list() {
    const { data, error } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');

    if (error) {
        // Fallback: try common tables or RPC
        console.error("Error listing tables:", error.message);
        console.log("Common tables check:");
        const tables = ['profiles', 'wallet_transactions', 'puja_bookings', 'settings'];
        for (const t of tables) {
            const { error: te } = await supabase.from(t).select('id', { count: 'exact', head: true });
            console.log(`Table '${t}' ${te ? 'does not exist' : 'exists'}`);
        }
    } else {
        console.log("Tables:", data.map(t => t.tablename));
    }
}

list();
