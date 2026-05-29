import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Lazy initialization to prevent build-time errors when ENV vars are missing
let serverInstance: any = null;
let adminInstance: any = null;

/**
 * Public client for server-side pre-fetching.
 * Uses Anon key for safety.
 */
export const getSupabaseServer = () => {
    if (!serverInstance) {
        if (!supabaseUrl || !supabaseKey) {
            // During build, we might not have these. Return a proxy or handled error.
            console.warn('[SupabaseServer] Missing environment variables during initialization');
            return null;
        }
        serverInstance = createClient(supabaseUrl!, supabaseKey!);
    }
    return serverInstance;
};

/**
 * Admin client for server-side operations that bypass RLS.
 */
export const getSupabaseAdmin = () => {
    if (!adminInstance) {
        if (!supabaseUrl || (!serviceKey && !supabaseKey)) {
             console.warn('[SupabaseAdmin] Missing environment variables during initialization');
             return null;
        }
        adminInstance = createClient(supabaseUrl!, (serviceKey || supabaseKey)!);
    }
    return adminInstance;
};

// For backward compatibility, but use with caution as they might be null during build
export const supabaseServer = (typeof window === 'undefined' && supabaseUrl && supabaseKey) ? createClient(supabaseUrl!, supabaseKey!) : (null as any);
export const supabaseAdmin = (typeof window === 'undefined' && supabaseUrl && (serviceKey || supabaseKey)) ? createClient(supabaseUrl!, serviceKey! || supabaseKey!) : (null as any);
