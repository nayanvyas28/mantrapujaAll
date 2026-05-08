import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Helper to check if we have the required variables
const hasVars = supabaseUrl && supabaseKey;

// Create the client only if we have the vars, otherwise export a placeholder/null
// This prevents the build from crashing when env vars are missing
export const supabase = hasVars 
    ? createClient(supabaseUrl, supabaseKey) 
    : (null as any); 

/**
 * Utility to clear existing session from local storage.
 */
export const clearSession = async () => {
    if (typeof window !== 'undefined' && supabase) {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.includes('sb-') && key.includes('-auth-token')) {
                localStorage.removeItem(key);
            }
        });
        await supabase.auth.signOut();
    }
}

// Global listener to detect refresh token errors
if (typeof window !== 'undefined' && supabase) {
    supabase.auth.onAuthStateChange(async (event: any, session: any) => {
        // Auth state logic
    });
}
