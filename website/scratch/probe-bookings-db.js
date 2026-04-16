const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://s1.mantrapuja.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro"
);

async function checkTable() {
    const { error } = await supabase
        .from('puja_bookings')
        .select('*')
        .limit(1);

    if (error) {
        if (error.code === '42P01') {
            console.log("TABLE_MISSING: The 'puja_bookings' table does not exist.");
        } else {
            console.log("DB_ERROR:", error.message);
        }
    } else {
        console.log("TABLE_EXISTS: 'puja_bookings' is ready.");
    }
}

checkTable();
