/**
 * Standalone Vedic Panchang API for Express (Node.js)
 * 
 * Replaces AstroSage scraping with dynamic, location-accurate AstrologyAPI `/advanced_panchang` integrations.
 * 
 * Dependencies:
 * npm install express axios
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');

const ASTROLOGY_API_BASE_URL = "https://json.astrologyapi.com/v1";

// Attempt to load Supabase for DB caching
let supabase = null;
try {
    const supabaseModule = require('./backend/src/utils/supabase') || require('./src/utils/supabase');
    supabase = supabaseModule.supabase;
} catch (e) {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        try {
            const { createClient } = require('@supabase/supabase-js');
            supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        } catch (err) {
            console.warn('[PanchangAPI] Supabase client could not be loaded:', err.message);
        }
    }
}

/**
 * Maps the rich AstrologyAPI advanced panchang details into the client's expected format.
 */
const mapPanchangResponse = (apiData, referenceDate, lat, lon) => {
    const formatTime = (t) => {
        if (!t) return 'N/A';
        if (typeof t === 'string') return t;
        return `${String(t.hour).padStart(2, '0')}:${String(t.minute).padStart(2, '0')}:${String(t.second || 0).padStart(2, '0')}`;
    };

    const getEndString = (elem) => {
        if (!elem || !elem.details) return 'N/A';
        const name = elem.details.tithi_name || elem.details.nak_name || elem.details.yog_name || elem.details.karan_name || 'N/A';
        if (elem.end_time) {
            return `${name} (ends at ${String(elem.end_time.hour).padStart(2, '0')}:${String(elem.end_time.minute).padStart(2, '0')})`;
        }
        return name;
    };

    return {
        reference_date: referenceDate,
        title: `Panchang for ${referenceDate}`,
        location: `Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`,
        panchang_for_today: {
            "Tithi": getEndString(apiData.tithi),
            "Nakshatra": getEndString(apiData.nakshatra),
            "Yoga": getEndString(apiData.yog || apiData.yoga),
            "Karan": getEndString(apiData.karan),
            "Weekday": apiData.day || 'N/A',
            "Ritu": apiData.ritu || 'N/A',
            "Paksha": apiData.paksha || 'N/A',
            "Sun Sign": apiData.sun?.sun_sign || apiData.sun_sign || 'N/A',
            "Moon Sign": apiData.moon?.moon_sign || apiData.moon_sign || 'N/A'
        },
        sun_moon_calculations: {
            "Sunrise": formatTime(apiData.sunrise || apiData.sun?.sunrise),
            "Sunset": formatTime(apiData.sunset || apiData.sun?.sunset),
            "Moonrise": formatTime(apiData.moonrise || apiData.moon?.moonrise),
            "Moonset": formatTime(apiData.moonset || apiData.moon?.moonset)
        },
        hindu_month_year: {
            "Shaka Samvat": apiData.shaka_samvat ? `${apiData.shaka_samvat.year} (${apiData.shaka_samvat.samvat_name || ''})` : 'N/A',
            "Vikram Samvat": apiData.vikram_samvat ? `${apiData.vikram_samvat.year} (${apiData.vikram_samvat.samvat_name || ''})` : 'N/A',
            "Month Amanta": apiData.hindu_maheena?.amanta || 'N/A',
            "Month Purnimanta": apiData.hindu_maheena?.purnimanta || 'N/A'
        },
        inauspicious_timings: {
            "Rahu Kaal": apiData.rahukaal ? `${apiData.rahukaal.start_time} - ${apiData.rahukaal.end_time}` : 'N/A',
            "Yamaganda": apiData.yamghant_kaal ? `${apiData.yamghant_kaal.start_time} - ${apiData.yamghant_kaal.end_time}` : 'N/A',
            "Gulika": apiData.guli_kaal ? `${apiData.guli_kaal.start_time} - ${apiData.guli_kaal.end_time}` : 'N/A'
        },
        auspicious_timings: {
            "Abhijit Muhurta": apiData.abhijit_muhurta ? `${apiData.abhijit_muhurta.start_time} - ${apiData.abhijit_muhurta.end_time}` : 'N/A'
        }
    };
};

/**
 * Endpoint: GET/POST /astrology/panchang
 */
const handlePanchangRequest = async (req, res) => {
    try {
        const now = new Date();
        
        // Accept parameters from query (GET) or body (POST)
        const day = Number(req.query.day || req.body.day || now.getDate());
        const month = Number(req.query.month || req.body.month || (now.getMonth() + 1));
        const year = Number(req.query.year || req.body.year || now.getFullYear());
        const hour = Number(req.query.hour || req.body.hour || now.getHours());
        const min = Number(req.query.min || req.body.min || now.getMinutes());
        
        // Default to New Delhi coordinates
        const lat = Number(req.query.lat || req.body.lat || 28.6139);
        const lon = Number(req.query.lon || req.body.lon || 77.2090);
        const tzone = Number(req.query.tzone || req.body.tzone || 5.5);

        const referenceDateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        console.log(`[PanchangAPI] Request for ${referenceDateStr} at Lat: ${lat}, Lon: ${lon}`);

        // 1. Try DB cache first (only for default parameters to prevent coordinates mismatch in simple key cache)
        const isDefaultLocation = Math.abs(lat - 28.6139) < 0.01 && Math.abs(lon - 77.2090) < 0.01;
        if (supabase && isDefaultLocation) {
            try {
                const { data: existing } = await supabase
                    .from('panchangs')
                    .select('*')
                    .eq('reference_date', referenceDateStr)
                    .maybeSingle();

                if (existing && existing.data) {
                    console.log(`[PanchangAPI] DB cache hit for date ${referenceDateStr}`);
                    return res.json({ success: true, data: existing.data });
                }
            } catch (dbErr) {
                console.error('[PanchangAPI] DB Cache read error:', dbErr.message);
            }
        }

        // 2. Fetch from AstrologyAPI /advanced_panchang
        const userId = process.env.ASTROLOGY_USER_ID;
        const apiKey = process.env.ASTROLOGY_API_KEY;

        if (!userId || !apiKey) {
            console.error('[PanchangAPI] Credentials missing in environment variables.');
            return res.status(500).json({ 
                success: false, 
                error: "CONFIGURATION_ERROR", 
                msg: "AstrologyAPI credentials not configured in environment variables." 
            });
        }

        const auth = `Basic ${Buffer.from(`${userId}:${apiKey}`).toString('base64')}`;
        const url = `${ASTROLOGY_API_BASE_URL}/advanced_panchang`;

        const payload = {
            day,
            month,
            year,
            hour,
            min,
            lat: Number(lat.toFixed(4)),
            lon: Number(lon.toFixed(4)),
            tzone
        };

        console.log(`[PanchangAPI] Requesting URL: ${url}`);
        console.log(`[PanchangAPI] Payload:`, JSON.stringify(payload));
        console.log("PANCHANG URL:", url);
        console.log("PANCHANG PAYLOAD:", payload);
        
        const apiResponse = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
                'x-astrologyapi-key': apiKey
            },
            timeout: 15000
        });

        console.log(`[PanchangAPI] Response Status: ${apiResponse.status}`);
        console.log(`[PanchangAPI] Response Body:`, JSON.stringify(apiResponse.data));

        const mappedResult = mapPanchangResponse(apiResponse.data, referenceDateStr, lat, lon);

        // 3. Save to DB cache
        if (supabase) {
            try {
                await supabase
                    .from('panchangs')
                    .upsert({
                        reference_date: referenceDateStr,
                        data: mappedResult
                    }, { onConflict: 'reference_date' });
                console.log(`[PanchangAPI] DB cache updated for date ${referenceDateStr}`);
            } catch (saveError) {
                console.error('[PanchangAPI] DB Cache save error:', saveError.message);
            }
        }

        return res.json({ success: true, data: mappedResult });

    } catch (error) {
        console.error(error);
        console.error(error.stack);
        console.error('[PanchangAPI] Error Stack:', error.stack || error.message);
        if (error.response) {
            console.error('[PanchangAPI] Error Response Status:', error.response.status);
            console.error('[PanchangAPI] Error Response Body:', JSON.stringify(error.response.data));
        }
        return res.status(500).json({ 
            success: false, 
            error: "INTERNAL_SERVER_ERROR", 
            msg: error.response?.data?.msg || error.message 
        });
    }
};

router.get('/astrology/panchang', handlePanchangRequest);
router.post('/astrology/panchang', handlePanchangRequest);

module.exports = router;
