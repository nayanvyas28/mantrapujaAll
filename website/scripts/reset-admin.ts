
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function forceCreateAdmin() {
    const email = 'admin@mantrapooja.com';
    const password = 'admin123';

    console.log(`Checking admin user: ${email}`);

    // 1. Delete existing user to ensure clean state (optional, but good for reset)
    // We need the user ID first to delete
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
        console.error("Error listing users:", listError);
        return;
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        console.log(`User exists (ID: ${existingUser.id}). Deleting to recreate...`);
        const { error: delError } = await supabase.auth.admin.deleteUser(existingUser.id);
        if (delError) {
            console.error("Error deleting user:", delError);
            return;
        }
    }

    // 2. Create User
    console.log("Creating new admin user...");
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role: 'admin' }
    });

    if (authError) {
        console.error('Error creating auth user:', authError.message);
        return;
    }

    console.log('SUCCESS! Admin user created.');
    console.log('Email:', email);
    console.log('Password:', password);
}

forceCreateAdmin();
