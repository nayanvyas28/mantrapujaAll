
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

/**
 * Public client for server-side pre-fetching.
 * Uses Anon key for safety.
 */
export const supabaseServer = createClient(supabaseUrl, supabaseKey);

/**
 * Admin client for server-side operations that bypass RLS.
 * USE SPARINGLY.
 */
export const supabaseAdmin = createClient(supabaseUrl, serviceKey || supabaseKey);
