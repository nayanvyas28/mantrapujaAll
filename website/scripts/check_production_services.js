const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from website/.env.local
const envPath = path.resolve(__dirname, '..', '.env.local');
dotenv.config({ path: envPath });

async function checkUrl(name, url) {
    console.log(`Checking ${name} at: ${url}...`);
    try {
        const start = Date.now();
        const response = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(6000) });
        const text = await response.text();
        const duration = Date.now() - start;
        console.log(`✅ [${name}] Status: ${response.status} (${duration}ms)`);
        if (response.status >= 400) {
            console.log(`   Response starting text: ${text.substring(0, 150)}`);
        }
        return { ok: response.ok, status: response.status, text: text.substring(0, 100) };
    } catch (error) {
        console.log(`❌ [${name}] Error: ${error.message}`);
        return { ok: false, error: error.message };
    }
}

async function checkSupabase() {
    console.log('\n--- Checking Supabase Database ---');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log(`URL: ${supabaseUrl}`);
    console.log(`Anon Key defined? ${!!supabaseAnonKey}`);

    if (!supabaseUrl || !supabaseAnonKey) {
        console.log('❌ Supabase environment variables are missing from .env.local!');
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Test categories fetch
    try {
        console.log('Fetching from categories table...');
        const { data, error, count } = await supabase
            .from('categories')
            .select('*', { count: 'exact' });

        if (error) {
            console.log(`❌ Error fetching categories: ${JSON.stringify(error)}`);
        } else {
            console.log(`✅ Successfully queried 'categories' table! Row count: ${count}`);
            if (data && data.length > 0) {
                console.log(`   Sample category: ${JSON.stringify(data[0])}`);
            } else {
                console.log('   Warning: categories table is empty!');
            }
        }
    } catch (e) {
        console.log(`❌ Exception querying categories: ${e.message}`);
    }

    // Test poojas fetch
    try {
        console.log('Fetching from poojas table...');
        const { data, error, count } = await supabase
            .from('poojas')
            .select('id, name', { count: 'exact' });

        if (error) {
            console.log(`❌ Error fetching poojas: ${JSON.stringify(error)}`);
        } else {
            console.log(`✅ Successfully queried 'poojas' table! Row count: ${count}`);
        }
    } catch (e) {
        console.log(`❌ Exception querying poojas: ${e.message}`);
    }
}

async function runDiagnostics() {
    console.log('====================================');
    console.log('MANTRA PUJA PRODUCTION DIAGNOSTICS');
    console.log('====================================');

    // 1. Check Frontend
    await checkUrl('Production Frontend (mantrapuja.com)', 'https://mantrapuja.com');
    await checkUrl('Production Frontend (www.mantrapuja.com)', 'https://www.mantrapuja.com');

    // 2. Check Backend
    const backendUrl = process.env.BACKEND_URL || 'https://bc.mantrapuja.com/';
    const staticApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://lk8ogw0kkok0sso484swc0wc.34.126.219.127.sslip.io';

    await checkUrl('Backend URL (env)', backendUrl);
    await checkUrl('Backend Health (env)', `${backendUrl.replace(/\/$/, '')}/health`);
    await checkUrl('Static API URL (env)', staticApiUrl);
    await checkUrl('Static API Health (env)', `${staticApiUrl.replace(/\/$/, '')}/health`);

    // 3. Check Supabase
    await checkSupabase();

    console.log('\n====================================');
}

runDiagnostics();
