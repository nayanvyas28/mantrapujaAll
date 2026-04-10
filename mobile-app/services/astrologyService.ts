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

/**
 * Fetch Astrology Data with automatic failover support
 */
export const fetchAstroData = async (endpoint: string, data: any) => {
    const lang = i18n.language || 'en';
    
    // 1. ATTEMPT BACKEND PROXY (Port 4000 handles failover automatically)
    try {
        console.log(`[AstroService] Trying Backend Proxy for ${endpoint}...`);
        const response = await fetch(`${BACKEND_URL}/${endpoint.replace(/^\//, '')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': lang
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return await response.json();
        }
        
        console.warn(`[AstroService] Backend Proxy returned ${response.status}. Falling back to Direct API...`);
    } catch (proxyError) {
        console.warn("[AstroService] Backend Proxy unreachable. Falling back to Direct API...");
    }

    // 2. DIRECT API FALLBACK (Manual rotation in case backend is down)
    for (const key of API_KEYS) {
        try {
            console.log(`[AstroService] Attempting Direct API for ${endpoint} with key ${key.slice(0, 8)}...`);
            const response = await fetch(`${DIRECT_API_URL}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'x-astrologyapi-key': key,
                    'Content-Type': 'application/json',
                    'Accept-Language': lang,
                    'User-Agent': 'Mozilla/5.0 (MantraPuja/1.0.1)',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                return await response.json();
            }

            const errorBody = await response.text();
            if (response.status === 429) {
                console.warn(`[AstroService] Key ${key.slice(0, 8)} reached limit. Trying next...`);
                continue;
            }

            console.error(`[AstroService] Direct API Error (${response.status}):`, errorBody);
        } catch (directError) {
            console.error("[AstroService] Direct API Exception:", directError);
        }
    }

    return null; // All attempts failed
};

/**
 * Normalizes user birth details for the API
 */
export const prepareAstroRequestData = (onboardingData: any) => {
    if (!onboardingData || !onboardingData.dob) return null;

    try {
        const dob = new Date(onboardingData.dob);
        const timeStr = onboardingData.time || "12:00 PM";
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

        const coords = getCityCoords(onboardingData.place || 'Varanasi');

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
