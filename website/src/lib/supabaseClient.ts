
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Utility to clear existing session from local storage.
 * Useful when hit with "AuthApiError: Invalid Refresh Token"
 */
export const clearSession = async () => {
    if (typeof window !== 'undefined') {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.includes('sb-') && key.includes('-auth-token')) {
                localStorage.removeItem(key);
            }
        });
        // Also call signOut to be sure
        await supabase.auth.signOut();
    }
}

// Global listener to detect refresh token errors
if (typeof window !== 'undefined') {
    supabase.auth.onAuthStateChange(async (event, session) => {
        // If we get an error or a state that indicates token failure
        // we can proactively clear or alert.
    });
}
