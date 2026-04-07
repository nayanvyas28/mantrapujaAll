import Constants from 'expo-constants';
import { Platform } from 'react-native';

const debuggerHost = Constants.expoConfig?.hostUri;
const localIp = debuggerHost ? debuggerHost.split(':')[0] : 'localhost';

const resolveLocalUrl = (envUrl: string | undefined, defaultPort: number) => {
    // If we have a fully qualified URL from env, use it unless it points to localhost/127.0.0.1
    const rawUrl = envUrl || `http://localhost:${defaultPort}`;
    
    // In production, always use the env URL as is
    if (!__DEV__) return rawUrl;
    
    // In development, handle the localhost -> 10.0.2.2/local-ip mapping for mobile
    if (rawUrl.includes('localhost') || rawUrl.includes('127.0.0.1')) {
        const portMatch = rawUrl.match(/:(\d+)/);
        const port = portMatch ? portMatch[1] : defaultPort;
        
        if (Platform.OS === 'android' && !debuggerHost) {
            return `http://10.0.2.2:${port}`;
        }
        return `http://${localIp}:${port}`;
    }
    
    return rawUrl;
};

/**
 * Central configuration for the application.
 * Safely accesses environment variables and provides fallbacks for dev/prod.
 */
export const Config = {
    // Supabase
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
    
    // API Endpoints
    backendUrl: resolveLocalUrl(process.env.EXPO_PUBLIC_BACKEND_URL, 4000),
    adminApiUrl: resolveLocalUrl(process.env.EXPO_PUBLIC_ADMIN_URL, 3001),
    
    // Auth Endpoint shorthand
    authApiUrl: resolveLocalUrl(process.env.EXPO_PUBLIC_BACKEND_URL, 4000) + '/api/auth',
    
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
