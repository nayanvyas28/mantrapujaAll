const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://s1.mantrapuja.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro"
);

async function check() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Profile sample:", data[0]);
    }
}

check();
