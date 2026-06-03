/**
 * Standalone Janam Kundli API for Express (Node.js)
 * 
 * This file is completely self-contained. It fetches all natal charts, dasha periods, 
 * planetary positions, gemstone suggestions, and predictions (29 endpoints) in parallel/sequence 
 * and returns a compiled mega-JSON payload to your mobile application.
 * 
 * Prerequisites:
 * npm install express axios
 * 
 * How to integrate:
 * 1. Save this file as `kundliApi.js` on your other laptop.
 * 2. Mount it in your Express app:
 *    const kundliRouter = require('./kundliApi');
 *    app.use('/api', kundliRouter);
 * 3. Call it from your Android App:
 *    POST http://localhost:4000/api/astrology/kundli
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');

const ASTROLOGY_API_BASE_URL = "https://json.astrologyapi.com/v1";

// Default Premium Credentials (feel free to override using Env Vars)
const USER_ID = process.env.ASTROLOGY_USER_ID || '629910';
const API_KEY = process.env.ASTROLOGY_API_KEY || 'd33e9d8924b10499e15df332f99580b0';

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

    // Format lat/lon to 4 decimal places matching the standard
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
 * Mega Endpoint: Fetches all 29 Kundli endpoints & returns compiled data
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

        // All 29 Vedic & Astro endpoints to fetch
        const endpoints = [
            { key: 'core', url: 'astro_details' },
            { key: 'panchang', url: 'basic_panchang' },
            { key: 'dasha', url: 'major_vdasha' },
            { key: 'current_dasha', url: 'current_vdasha' },
            { key: 'gemstone', url: 'basic_gem_suggestion' },
            { key: 'rudraksha', url: 'rudraksha_suggestion' },
            { key: 'character', url: 'personal_characteristics' },
            { key: 'career', url: 'career_report' },
            { key: 'health', url: 'health_report' },
            { key: 'love', url: 'love_report' },
            { key: 'physical', url: 'physique_report' },
            { key: 'numero_table', url: 'numero_table' },
            { key: 'numero_report', url: 'numero_report' },
            { key: 'numero_time', url: 'numero_time' },
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

        const results = {};
        const startTime = Date.now();

        // Fetch all endpoints sequentially to prevent API throttling
        for (const ep of endpoints) {
            const res = await executeAstroRequest(ep.url, bData, lang);
            if (res.ok) {
                if (ep.url.includes('horo_chart_image')) {
                    results[ep.key] = res.data.svg || res.data.svg_code || null;
                } else if (ep.key === 'planets' || ep.key === 'kp_planets') {
                    results[ep.key] = Array.isArray(res.data) ? res.data : (res.data.planets || res.data);
                } else {
                    results[ep.key] = res.data;
                }
            } else {
                console.warn(`[KundliAPI] Warning: Failed to fetch ${ep.key}. Error: ${res.msg}`);
                results[ep.key] = { error: true, msg: 'FETCH_FAILED', detail: res.msg };
            }
        }

        console.log(`[KundliAPI] Completed compiled fetch in ${Date.now() - startTime}ms`);
        return res.json({ success: true, data: results });

    } catch (error) {
        console.error('[KundliAPI] Critical Exception:', error);
        return res.status(500).json({ success: false, error: "INTERNAL_SERVER_ERROR", msg: error.message });
    }
});

module.exports = router;
