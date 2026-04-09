
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const logFile = path.resolve(process.cwd(), 'scripts', 'db-test-result.txt');
function log(msg: string) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

// Clear log file
if (fs.existsSync(logFile)) fs.unlinkSync(logFile);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    log('Missing Supabase environment variables');
    process.exit(1);
}

// Create client with ANON key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuthAndTables() {
    log('Testing connection with ANON KEY...');

    // 1. Try fetching without login (Should fail or return empty if RLS works)
    log('--- Attempting fetch WITHOUT login ---');
    const { data: noAuthData, error: noAuthError } = await supabase
        .from('system_logs')
        .select('*')
        .limit(1);

    log(`No-Auth Fetch Result (system_logs): Data length: ${noAuthData?.length ?? 0}, Error: ${noAuthError ? JSON.stringify(noAuthError) : 'None'}`);

    // 1b. Try fetching seo_metadata without login (Should SUCCEED for public access)
    log('--- Attempting fetch seo_metadata WITHOUT login ---');
    const { data: noAuthSeo, error: noAuthSeoError } = await supabase
        .from('seo_metadata')
        .select('*')
        .limit(1);

    log(`No-Auth Fetch Result (seo_metadata): Data length: ${noAuthSeo?.length ?? 0}, Error: ${noAuthSeoError ? JSON.stringify(noAuthSeoError) : 'None'}`);

    // 2. Login
    log('--- Attempting Login ---');
    const email = 'admin@mantrapooja.com';
    const password = 'admin123';

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (authError) {
        log(`Login Failed: ${authError.message}`);
        return;
    }

    log(`Login Successful! User ID: ${authData.user.id}, Role: ${authData.user.role}`);

    // 3. Fetch with Auth
    log('--- Attempting fetch WITH login ---');

    // System Logs
    try {
        const { data, error, count } = await supabase
            .from('system_logs')
            .select('*', { count: 'exact', head: true });

        if (error) {
            log(`Error accessing system_logs (Auth): ${JSON.stringify(error, null, 2)}`);
        } else {
            log(`Success! system_logs count (Auth): ${count}`);
        }
    } catch (e) {
        log(`Exception querying system_logs: ${e}`);
    }

    // SEO Metadata
    try {
        const { data, error, count } = await supabase
            .from('seo_metadata')
            .select('*', { count: 'exact', head: true });

        if (error) {
            log(`Error accessing seo_metadata (Auth): ${JSON.stringify(error, null, 2)}`);
        } else {
            log(`Success! seo_metadata count (Auth): ${count}`);
        }
    } catch (e) {
        log(`Exception querying seo_metadata: ${e}`);
    }
}

(async () => {
    try {
        await testAuthAndTables();
    } catch (e) {
        log(`Fatal error: ${e}`);
    }
})();
