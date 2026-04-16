const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://s1.mantrapuja.com",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro"
);

async function update() {
    const newValue = "Begin EVERY response by analyzing the current planetary positions (Grahas) and Houses in the user's birth chart (2-3 lines). Example: 'Aapki kundali mein Shani ka prabhav abhi prabal hai...'";
    
    const { error } = await supabase
        .from('settings')
        .update({ value: newValue })
        .eq('key', 'chat_start_instruction');

    if (error) {
        console.error("Update failed:", error.message);
    } else {
        console.log("Update successful!");
    }
}

update();
