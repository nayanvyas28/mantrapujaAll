const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://s1.mantrapuja.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro"
);

async function check() {
    console.log("Checking tables...");
    const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .limit(1);

    if (error) {
        if (error.code === 'PGRST116' || error.message.includes("does not exist")) {
            console.log("Table 'chat_messages' does not exist.");
        } else {
            console.error("Error checking table:", error.message);
        }
    } else {
        console.log("Table 'chat_messages' exists!");
    }
}

check();
