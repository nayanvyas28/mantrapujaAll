
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // Manually parse .env.local
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) {
            throw new Error('.env.local not found');
        }
        const envContent = fs.readFileSync(envPath, 'utf8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                env[key.trim()] = value.trim();
            }
        });

        const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
        const supabaseServiceKey = env['SUPABASE_SERVICE_ROLE_KEY'];

        if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error('Missing credentials in .env.local');
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        const email = 'admin@mantrapooja.com';
        const password = 'ChangeMe123!';

        console.log(`Creating admin user: ${email}`);

        // 1. Create User in Supabase Auth
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { role: 'admin' }
        });

        if (authError) {
            console.error('Error creating auth user:', authError.message);
            // If user already exists, we can proceed to check public table
        } else {
            console.log('Auth user created successfully:', authUser.user.id);
        }

        // 2. Insert into public.admin table
        // Fetch user ID if creation failed (likely exists)
        let userId = authUser?.user?.id;
        if (!userId) {
            const { data: listData } = await supabase.auth.admin.listUsers();
            const existing = listData?.users?.find(u => u.email === email);
            userId = existing?.id;
            console.log("Found existing user ID:", userId);
        }

        if (userId) {
            const { error: dbError } = await supabase
                .from('admin')
                .upsert([
                    {
                        id: userId,
                        username: 'SuperAdmin',
                        password_hash: 'MANAGED_BY_SUPABASE'
                    }
                ]);

            if (dbError) {
                console.error('Error upserting into public.admin:', dbError.message);
            } else {
                console.log('Admin profile upserted in public.admin.');
            }
        }
    } catch (error) {
        console.error("FATAL SCRIPT ERROR:", error);
        process.exit(1);
    }
}

main();
