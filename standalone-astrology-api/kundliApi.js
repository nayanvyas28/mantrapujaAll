/**
 * Standalone Janam Kundli API for Express (Node.js)
 * 
 * Compiles 26 essential Kundli endpoints in parallel.
 * 
 * Dependencies:
 * npm install express axios
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');

const ASTROLOGY_API_BASE_URL = "https://json.astrologyapi.com/v1";

// Active Credentials Fallback
const USER_ID = process.env.ASTROLOGY_USER_ID || '652693';
const API_KEY = process.env.ASTROLOGY_API_KEY || 'ak-78d22f4e9a7680c4ac68ce28053f9d09fd3d56bf';

/**
 * Executes a single request against AstrologyAPI
 */
const executeAstroRequest = async (endpoint, birthData, lang = 'en') => {
    const auth = `Basic ${Buffer.from(`${USER_ID}:${API_KEY}`).toString('base64')}`;
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth,
        'x-astrologyapi-key': API_KEY,
        'x-astrologyapi-language': lang
    };

    // Format lat/lon to 4 decimal places matching the standard precision
    const payload = {
        day: Number(birthData.day),
        month: Number(birthData.month),
        year: Number(birthData.year),
        hour: Number(birthData.hour),
        min: Number(birthData.min),
        lat: Number(parseFloat(birthData.lat).toFixed(4)),
        lon: Number(parseFloat(birthData.lon).toFixed(4)),
        tzone: Number(birthData.tzone),
        gender: birthData.gender || 'male',
        ayanamsa: 1,
        lan: lang,
        language: lang
    };

    const url = `${ASTROLOGY_API_BASE_URL}/${endpoint}`;

    try {
        const response = await axios.post(url, payload, { headers, timeout: 15000 });
        return { ok: true, data: response.data };
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        const msg = error.response && error.response.data ? (error.response.data.msg || error.response.data.message) : error.message;
        return { ok: false, status, msg };
    }
};

/**
 * Fetches an endpoint safely so that individual sub-endpoint failures do not crash the entire request.
 */
const fetchEndpointSafely = async (ep, birthData, lang) => {
    try {
        const res = await executeAstroRequest(ep.url, birthData, lang);
        if (res.ok) {
            let value;
            if (ep.url.includes('horo_chart_image')) {
                value = res.data.svg || res.data.svg_code || null;
            } else if (ep.key === 'planets' || ep.key === 'kp_planets') {
                value = Array.isArray(res.data) ? res.data : (res.data.planets || res.data);
            } else {
                value = res.data;
            }
            return { key: ep.key, value };
        } else {
            console.warn(`[KundliAPI] Safe Fetch: Node returned error for ${ep.key} (${ep.url}): ${res.msg}`);
            return { 
                key: ep.key, 
                value: { error: true, msg: 'FETCH_FAILED', detail: res.msg } 
            };
        }
    } catch (error) {
        console.error(`[KundliAPI] Exception fetching ${ep.key}:`, error.message);
        return { 
            key: ep.key, 
            value: { error: true, msg: 'FETCH_FAILED', detail: error.message } 
        };
    }
};

/**
 * Mega Endpoint: Fetches all 26 Kundli endpoints concurrently & returns compiled data
 */
router.post('/astrology/kundli', async (req, res) => {
    try {
        const { birthData, language } = req.body;
        const lang = language || 'en';
        
        // Handle potential nested birthData object
        const bData = birthData?.birthData || birthData;

        if (!bData || !bData.day || !bData.month || !bData.year || bData.hour === undefined || bData.min === undefined || !bData.lat || !bData.lon || bData.tzone === undefined) {
            return res.status(400).json({ 
                success: false, 
                error: "INVALID_INPUT", 
                msg: "Required fields: day, month, year, hour, min, lat, lon, tzone" 
            });
        }

        console.log(`[KundliAPI] Compiling birth chart for Date: ${bData.day}/${bData.month}/${bData.year} Time: ${bData.hour}:${bData.min}`);

        // All 26 essential Kundli endpoints to fetch
        const endpoints = [
            { key: 'core', url: 'astro_details' },
            { key: 'panchang', url: 'basic_panchang' },
            { key: 'dasha', url: 'major_vdasha' },
            { key: 'current_dasha', url: 'current_vdasha' },
            { key: 'gemstone', url: 'basic_gem_suggestion' },
            { key: 'rudraksha', url: 'rudraksha_suggestion' },
            { key: 'character', url: 'general_ascendant_report' },
            { key: 'career', url: 'career_report' },
            { key: 'health', url: 'health_report' },
            { key: 'love', url: 'manglik' },
            { key: 'physical', url: 'general_ascendant_report' },
            { key: 'numero_table', url: 'numero_table' },
            { key: 'numero_report', url: 'numero_report' },
            { key: 'numero_time', url: 'numero_fav_time' },
            { key: 'numero_place_vastu', url: 'numero_place_vastu' },
            { key: 'planets', url: 'planets' },
            { key: 'yoga_report', url: 'yoga_report' },
            { key: 'manglik', url: 'manglik' },
            { key: 'sadhesati', url: 'sadhesati_current_status' },
            { key: 'kp_planets', url: 'kp_planets' },
            { key: 'kp_house_cusps', url: 'kp_house_cusps' },
            { key: 'sarvashtak', url: 'sarvashtak' },
            { key: 'chart_d1', url: 'horo_chart_image/D1' },
            { key: 'chart_d9', url: 'horo_chart_image/D9' },
            { key: 'chart_sun', url: 'horo_chart_image/SUN' },
            { key: 'chart_moon', url: 'horo_chart_image/MOON' },
            { key: 'chart_d2', url: 'horo_chart_image/D2' },
            { key: 'chart_d3', url: 'horo_chart_image/D3' },
            { key: 'chart_d10', url: 'horo_chart_image/D10' }
        ];

        const startTime = Date.now();

        // Fetch all 26 endpoints concurrently
        const tasks = endpoints.map(ep => fetchEndpointSafely(ep, bData, lang));
        const taskResults = await Promise.all(tasks);

        // Compile results dictionary
        const compiledData = {};
        for (const resItem of taskResults) {
            compiledData[resItem.key] = resItem.value;
        }

        console.log(`[KundliAPI] Completed compiled parallel fetch in ${Date.now() - startTime}ms`);
        return res.json({ success: true, data: compiledData });

    } catch (error) {
        console.error('[KundliAPI] Critical Exception:', error);
        return res.status(500).json({ 
            success: false, 
            error: "INTERNAL_SERVER_ERROR", 
            msg: error.message 
        });
    }
});

module.exports = router;
