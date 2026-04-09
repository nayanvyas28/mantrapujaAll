
const { createClient } = require('@supabase/supabase-js');

// Load from credentials (same as before)
const SUPABASE_URL = "http://supabasekong-t4kssg8owoocg48swk04kw88.34.93.68.183.sslip.io";
const SUPABASE_SERVICE_ROLE_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDgxNzU2MCwiZXhwIjo0OTI2NDkxMTYwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.kh1BMtLMlRERIVE4eOJ70Jma6L4U9xXgpmtjIImsXJ4";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function createAdmin() {
    const email = 'admin@mantrapooja.com';
    const password = 'admin'; // Simple password for local dev

    console.log(`Creating/Updating admin user: ${email}`);

    // Check if user exists
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
        console.error("Error listing users:", listError);
        return;
    }

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        console.log("User exists. Updating password...");
        const { data, error } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password: password, email_confirm: true }
        );
        if (error) console.error("Error updating password:", error);
        else console.log("Success! Password updated.");
    } else {
        console.log("User does not exist. Creating...");
        const { data, error } = await supabase.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true
        });
        if (error) console.error("Error creating user:", error);
        else console.log("Success! User created.");
    }
}

createAdmin();
