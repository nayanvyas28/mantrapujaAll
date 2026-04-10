import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../utils/i18n';
import { getCityCoords } from '../utils/geo';

// PRIMARY KEY POOL FOR LOCAL FALLBACK
const API_KEYS = [
    "ak-36483fc8a7f94df8504faacc4db3a46cafb353bd", // Primary
    "ak-66b9096f4750db40bac3636c3ab52a00122319d0"  // Secondary
];

const getAstroBackendUrl = () => {
    const rawUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    
    // 1. Handle Hosted Production Server (sslip.io)
    // Ensure the /api/astrology/proxy path is appended if it's missing
    if (rawUrl && rawUrl.includes('sslip.io')) {
        const base = rawUrl.replace(/\/$/, '');
        if (!base.includes('/api/astrology/proxy')) {
            return `${base}/api/astrology/proxy`;
        }
        return base;
    }

    // 2. Development Mode (Local Fallbacks)
    if (__DEV__) {
        if (!rawUrl || rawUrl.includes('mantrapuja.com') || rawUrl.includes('localhost')) {
            // Priority: the local IP address of your dev machine. 
            // 4000 is the backend port.
            return "http://10.228.144.64:4000/api/astrology/proxy";
        }
    }
    
    // 3. Standard resolution (Ensuring replace logic for /auth or fallback)
    return (rawUrl || "http://10.228.144.64:4000/api/auth").replace('/auth', '/astrology/proxy');
};

const BACKEND_URL = getAstroBackendUrl();
const DIRECT_API_URL = "https://json.astrologyapi.com/v1";

const getCacheKey = (endpoint: string, data: any, lang: string) => {
    const dataString = JSON.stringify(data);
    // Simple sanitization for AsyncStorage key compatibility
    return `astro_cache_${lang}_${endpoint.replace(/\//g, '_')}_${dataString.slice(0, 500)}`;
};

// Request Deduplication Map
const pendingRequests = new Map<string, Promise<any>>();

/**
 * Fetch Astrology Data with automatic failover support and local caching
 */
export const fetchAstroData = async (endpoint: string, data: any) => {
    const lang = i18n.language || 'en';
    const cacheKey = getCacheKey(endpoint, data, lang);

    // 0. CHECK CACHE FIRST
    try {
        const cachedData = await AsyncStorage.getItem(cacheKey);
        if (cachedData) {
            console.log(`[AstroService] Serving ${endpoint} from CACHE.`);
            return JSON.parse(cachedData);
        }
    } catch (cacheError) {
        console.warn("[AstroService] Cache read error:", cacheError);
    }

    // 0.1 DEDUPLICATE ACTIVE REQUESTS
    if (pendingRequests.has(cacheKey)) {
        console.log(`[AstroService] Joining existing request for ${endpoint}...`);
        return pendingRequests.get(cacheKey);
    }

    const requestPromise = (async () => {
        try {
            // 1. ATTEMPT BACKEND PROXY (Strict 3s timeout)
            try {
                console.log(`[AstroService] Trying Network (Proxy) for ${endpoint}...`);
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

                const response = await fetch(`${BACKEND_URL}/${endpoint.replace(/^\//, '')}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Language': lang
                    },
                    body: JSON.stringify(data),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (response.ok) {
                    const result = await response.json();
                    if (result) {
                        await AsyncStorage.setItem(cacheKey, JSON.stringify(result));
                    }
                    return result;
                }
                
                console.warn(`[AstroService] Proxy returned ${response.status}. Falling back...`);
            } catch (proxyError: any) {
                console.warn(`[AstroService] Proxy Failed/Timed out: ${proxyError.message}. Falling back...`);
            }

            // 2. DIRECT API FALLBACK (Manual rotation)
            for (const key of API_KEYS) {
                try {
                    console.log(`[AstroService] Trying Direct API for ${endpoint} (Key: ${key.slice(0, 5)})...`);
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s for direct API

                    const response = await fetch(`${DIRECT_API_URL}/${endpoint}`, {
                        method: 'POST',
                        headers: {
                            'x-astrologyapi-key': key,
                            'Content-Type': 'application/json',
                            'Accept-Language': lang,
                            'User-Agent': 'MantraPuja/1.0.1',
                        },
                        body: JSON.stringify(data),
                        signal: controller.signal
                    });
                    clearTimeout(timeoutId);

                    if (response.ok) {
                        const result = await response.json();
                        if (result) {
                            await AsyncStorage.setItem(cacheKey, JSON.stringify(result));
                        }
                        return result;
                    }

                    if (response.status === 429) continue;
                    console.error(`[AstroService] Direct API Error (${response.status})`);
                } catch (directError) {
                    console.error("[AstroService] Direct API Exception:", directError);
                }
            }

            return null;
        } finally {
            pendingRequests.delete(cacheKey);
        }
    })();

    pendingRequests.set(cacheKey, requestPromise);
    return requestPromise;
};

/**
 * Normalizes user birth details for the API
 */
export const prepareAstroRequestData = (data: any) => {
    if (!data) return null;

    try {
        // Handle both direct profile (data.dob) and onboarding_data wrapper (data.onboarding_data.dob)
        const onboarding = data.onboarding_data || {};
        const dobStr = onboarding.dob || data.dob;
        const timeStr = onboarding.time || data.time || data.tob || "12:00 PM";
        const placeStr = onboarding.place || data.place || data.birth_place || 'Varanasi';

        if (!dobStr) return null;

        const dob = new Date(dobStr);
        const parts = timeStr.split(':');
        
        if (parts.length < 2) return null;

        let h = parseInt(parts[0]);
        const m_and_ampm = parts[1].split(' ');
        let m = parseInt(m_and_ampm[0]);
        
        if (m_and_ampm[1]) {
            const ampm = m_and_ampm[1].toLowerCase();
            if (ampm === 'pm' && h < 12) h += 12;
            if (ampm === 'am' && h === 12) h = 0;
        }

        const coords = getCityCoords(placeStr);

        return {
            day: dob.getDate(),
            month: dob.getMonth() + 1,
            year: dob.getFullYear(),
            hour: h,
            min: m,
            lat: coords.lat,
            lon: coords.lon,
            tzone: 5.5,
        };
    } catch (err) {
        console.error("Error preparing astro data:", err);
        return null;
    }
};
