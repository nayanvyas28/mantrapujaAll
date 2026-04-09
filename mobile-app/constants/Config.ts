import Constants from 'expo-constants';

/**
 * Central configuration for the application.
 * Safely accesses environment variables and provides fallbacks for dev/prod.
 */
export const Config = {
    // Supabase
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
    
    // API Endpoints
    backendUrl: process.env.EXPO_PUBLIC_BACKEND_URL,
    adminApiUrl: process.env.EXPO_PUBLIC_ADMIN_URL || 'http://localhost:3001',
    
    // Security
    sessionSalt: process.env.EXPO_PUBLIC_SESSION_SALT || 'mantra_puja_dev_salt',
    
    // Support
    supportEmail: 'help.mantras@gmail.com',
    supportPhone: '+91 94247 50059',
    supportWhatsApp: '919424750059',
    disclaimer: 'For spiritual and informational purposes only. Results are not guaranteed.',
    
    // Flags
    isDevelopment: __DEV__,
    version: Constants.expoConfig?.version || '1.0.1',
};

// Validation for critical variables
if (!Config.supabaseUrl || !Config.supabaseAnonKey) {
    if (!Config.isDevelopment) {
        console.error('CRITICAL: Supabase configuration is missing in production!');
    } else {
        console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
    }
}

export default Config;
