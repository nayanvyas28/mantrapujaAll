import Constants from 'expo-constants';
import { Config } from '../constants/Config';

/**
 * Robust API URL Resolver with Failover Support
 */

export const PRODUCTION_BASE_URL = 'http://lk8ogw0kkok0sso484swc0wc.34.93.68.183.sslip.io';

let discoveredBaseUrl: string | null = null;

/**
 * Sets the working base URL for the remainder of the session.
 * Used by the failover mechanism in components.
 */
export const setWorkingBaseUrl = (url: string) => {
    console.log(`[ApiResolver] Working URL detected and locked: ${url}`);
    discoveredBaseUrl = url;
};

export const getBackendBaseUrl = () => {
    // 1. If we have already successfully connected to a URL this session, keep using it.
    if (discoveredBaseUrl) {
        return discoveredBaseUrl;
    }

    // 2. Prioritize explicit .env configuration (if not a placeholder)
    const envUrl = Config.backendUrl;
    const isSupabase = envUrl?.includes('mantrapuja.com') || envUrl?.includes('supabase.co');
    if (envUrl && !isSupabase) {
        return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
    }

    // 3. Try Dynamic Metro Resolution (Only works in Expo Go / Development)
    const debuggerHost = Constants.expoConfig?.hostUri;
    if (debuggerHost) {
        const ip = debuggerHost.split(':')[0];
        return `http://${ip}:4000`;
    }

    // 4. Fallback to production
    return PRODUCTION_BASE_URL;
};

export const getAuthUrl = () => `${getBackendBaseUrl()}/api/auth`;
export const getAdminUrl = () => `${getBackendBaseUrl()}/api/admin`;
export const getAstrologyUrl = () => `${getBackendBaseUrl()}/api/astrology`;
