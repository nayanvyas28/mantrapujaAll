const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('************************************************');
    console.error('CRITICAL ERROR: SUPABASE CONFIGURATION MISSING');
    console.error('Please add the following to Coolify Env Vars:');
    console.error('- NEXT_PUBLIC_SUPABASE_URL');
    console.error('- SUPABASE_SERVICE_ROLE_KEY');
    console.error('************************************************');
}

const ws = require('ws');

// Create a Supabase Client with the Service Role Key
const supabase = (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    },
    realtime: {
        transport: ws
    }
}) : null;

// A standard client just for signing in to get a user session object (bypassing the service key)
const supabaseClientAuth = (SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ? createClient(SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    },
    realtime: {
        transport: ws
    }
}) : null;


module.exports = {
    supabase,
    supabaseClientAuth
};
