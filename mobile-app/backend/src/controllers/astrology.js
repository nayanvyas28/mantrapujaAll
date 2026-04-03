/**
 * Astrology API Failover Controller
 * Rotates multiple trial keys to bypass 429 limits
 */
const axios = require('axios');

// POOL OF TRIAL KEYS (Found in codebase)
const API_KEYS = [
    "ak-66b9096f4750db40bac3636c3ab52a00122319d0", // Primary (Fresh)
    "ak-36483fc8a7f94df8504faacc4db3a46cafb353bd"  // Secondary (Capped)
];

const BASE_URL = "https://json.astrologyapi.com/v1";

/**
 * Proxy request to AstrologyAPI with automatic failover
 */
const proxyAstroRequest = async (req, res) => {
    const { endpoint } = req.params;
    const body = req.body;
    const lang = req.headers['accept-language'] || 'en';

    let lastError = null;

    // Try each key in the pool until one works
    for (let i = 0; i < API_KEYS.length; i++) {
        const apiKey = API_KEYS[i];
        
        try {
            console.log(`[AstroProxy] Attempting ${endpoint} with Key #${i+1}...`);
            
            const response = await axios.post(`${BASE_URL}/${endpoint}`, body, {
                headers: {
                    'x-astrologyapi-key': apiKey,
                    'Content-Type': 'application/json',
                    'Accept-Language': lang
                },
                timeout: 10000 // 10s timeout
            });

            // If success, return immediately
            console.log(`[AstroProxy] Success with Key #${i+1}`);
            return res.status(response.status).json(response.data);

        } catch (error) {
            lastError = error;
            const status = error.response?.status;
            const errorMsg = error.response?.data?.msg || error.message;

            console.error(`[AstroProxy] Key #${i+1} Failed (${status}):`, errorMsg);

            // ONLY failover if it is a 429 (Limit) or 401 (Auth) or 5xx (Server)
            if (status === 429 || status === 401 || (status >= 500)) {
                console.warn(`[AstroProxy] Failover triggered. Trying next key...`);
                continue; // Try next key in the loop
            } else {
                // For 400 (Bad Request), return immediately
                return res.status(status || 500).json({ 
                    error: "Astro API Error", 
                    msg: errorMsg 
                });
            }
        }
    }

    // If we've exhausted all keys
    console.error(`[AstroProxy] All ${API_KEYS.length} keys exhausted.`);
    return res.status(lastError?.response?.status || 500).json({
        error: "CRITICAL_LIMIT_EXCEEDED",
        msg: "All available Astrology API trial keys have reached their daily limit.",
        recovery: "Please wait 24 hours or upgrade to a paid plan."
    });
};

module.exports = {
    proxyAstroRequest
};
