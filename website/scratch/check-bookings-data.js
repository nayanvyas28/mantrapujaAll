const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://s1.mantrapuja.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro"
);

async function checkBookings() {
    // Service role bypasses RLS
    const { data, error } = await supabase
        .from('puja_bookings')
        .select('*');

    if (error) {
        console.error("DB Error:", error.message);
    } else {
        console.log(`Found ${data.length} bookings.`);
        if (data.length > 0) {
            console.log(data);
        }
    }
}

checkBookings();
