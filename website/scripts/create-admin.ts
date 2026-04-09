
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

async function createAdmin() {
    const email = 'admin@mantrapooja.com';
    const password = 'secure_password_123'; // Change this!
    const username = 'SuperAdmin';

    console.log(`Creating admin user: ${email}`);

    // 1. Create User in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (authError) {
        console.error('Error creating auth user:', authError.message);
        return;
    }

    console.log('Auth user created successfully:', authUser.user.id);

    // 2. Insert into public.admin table
    const { error: dbError } = await supabase
        .from('admin')
        .insert([
            {
                id: authUser.user.id, // Link to Auth ID
                username: username,
                // password_hash is not needed if using Supabase Auth, but schema has it. 
                // We will store a dummy value or handle legacy schema.
                password_hash: 'MANAGED_BY_SUPABASE_AUTH'
            }
        ]);

    if (dbError) {
        console.error('Error creating admin profile:', dbError.message);
    } else {
        console.log('Admin profile created successfully in public.admin table.');
    }
}

createAdmin();
