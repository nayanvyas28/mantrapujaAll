const { supabase } = require('../utils/supabase');
const HoroscopeService = require('../services/horoscopeService');
const axios = require('axios');
const cheerio = require('cheerio');

const ASTROLOGY_API_BASE_URL = "https://json.astrologyapi.com/v1";

/**
 * Shared logic to execute an AstrologyAPI request with a specific node
 */
const executeNodeRequest = async (node, endpoint, body, lang) => {
    let provider = node.provider || (node.api_key ? 'astrologyapi' : null);
    
    // 🔗 Basic Auth for AstrologyAPI (Match Website)
    const userId = node.user_id || '652693'; // Fallback to working node if missing
    const apiKey = node.api_key || 'ak-78d22f4e9a7680c4ac68ce28053f9d09fd3d56bf';
    const auth = `Basic ${Buffer.from(`${userId}:${apiKey}`).toString('base64')}`;

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': auth,
        'x-astrologyapi-key': apiKey,
        'x-astrologyapi-language': lang || 'en'
    };

    // ✨ Sync: Strict Validation and Precision (Match Website)
    const payload = {
        ...body,
        lat: Number(parseFloat(body.lat).toFixed(4)),
        lon: Number(parseFloat(body.lon).toFixed(4)),
        ayanamsa: 1,
        lan: lang || 'en',
        language: lang || 'en',
        name: body.name || 'User'
    };

    let url = `${ASTROLOGY_API_BASE_URL}/${endpoint}`;
    console.log(`[VedaNexus] Node ${node.name} calling ${endpoint} for User: ${userId}`);

    if (provider !== 'astrologyapi') {
        throw new Error(`Provider ${provider} not supported.`);
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000)
    });

    const data = await response.json().catch(() => ({ msg: "Internal Error" }));
    return { status: response.status, ok: response.ok, data };
};

/**
 * Proxy request for a single endpoint (Legacy/Standard)
 */
const proxyAstroRequest = async (req, res) => {
    const { endpoint } = req.params;
    const body = req.body;
    const lang = req.headers['accept-language'] || 'en';

    try {
        const { data: settings } = await supabase.from('kundli_settings').select('setting_value').eq('setting_key', 'api_config').single();
        const config = settings?.setting_value || { 
            apis: [
                { name: 'Primary Key 1', user_id: '651550', api_key: 'ak-36483fc8a7f94df8504faacc4db3a46cafb353bd', is_enabled: true },
                { name: 'Fallback Key 2', user_id: '637158', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0', is_enabled: true },
                { name: 'Astrology Engine 3', user_id: '652693', api_key: 'ak-78d22f4e9a7680c4ac68ce28053f9d09fd3d56bf', is_enabled: true }
            ], 
            failover_enabled: true 
        };

        const nodes = config.apis.filter(api => api.is_enabled);
        let lastError = null;

        for (const node of nodes) {
            try {
                const result = await executeNodeRequest(node, endpoint, body, lang);
                const bodyMsg = result.data?.msg || result.data?.message || "";
                const isLimitOrExpired = bodyMsg.toLowerCase().includes('limit') || 
                                         bodyMsg.toLowerCase().includes('expired') || 
                                         bodyMsg.toLowerCase().includes('invalid') ||
                                         bodyMsg.toLowerCase().includes('plan') ||
                                         bodyMsg.toLowerCase().includes('authorized');
                const isFailedStatus = result.data?.status === false;

                if (result.ok && !isLimitOrExpired && !isFailedStatus) {
                    return res.status(result.status).json(result.data);
                }
                lastError = { status: result.status, msg: bodyMsg || "Node Error" };
                if (!config.failover_enabled) break;
            } catch (err) {
                lastError = { status: 500, msg: err.message };
            }
        }
        return res.status(lastError?.status || 500).json({ error: "ALL_NODES_EXHAUSTED", msg: lastError?.msg });
    } catch (error) {
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR", msg: error.message });
    }
};

/**
 * Bundled Kundli Data (Mega Route for Mobile parity)
 */
const getKundliData = async (req, res) => {
    try {
        const { birthData, language } = req.body;
        const lang = language || 'en';
        // 🛡️ Robustness: Handle potential double-nesting from different frontend versions
        const bData = birthData?.birthData || birthData;

        console.log(`[AstroBundler] Incoming Request for ${bData?.day}/${bData?.month}/${bData?.year} | Gender: ${bData?.gender}`);
        console.log(`[AstroBundler] Payload:`, JSON.stringify(bData));

        const { data: settings } = await supabase.from('kundli_settings').select('setting_value').eq('setting_key', 'api_config').single();
        const config = settings?.setting_value || { 
            apis: [
                { name: 'Primary Key 1', user_id: '651550', api_key: 'ak-36483fc8a7f94df8504faacc4db3a46cafb353bd', is_enabled: true },
                { name: 'Fallback Key 2', user_id: '637158', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0', is_enabled: true },
                { name: 'Astrology Engine 3', user_id: '652693', api_key: 'ak-78d22f4e9a7680c4ac68ce28053f9d09fd3d56bf', is_enabled: true }
            ] 
        };
        const nodes = config.apis.filter(api => api.is_enabled);

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

        const results = {};
        const startTime = Date.now();

        if (!nodes || nodes.length === 0) {
            console.error('[AstroBundler] ❌ No enabled API nodes found in settings!');
            return res.status(500).json({ error: true, msg: "API Configuration Missing" });
        }

        console.log(`[AstroNexus] 🚀 Sequential sync for ${endpoints.length} endpoints starting...`);
        
        for (const ep of endpoints) {
            let success = false;
            let lastError = null;

            for (const node of nodes) {
                try {
                    const result = await executeNodeRequest(node, ep.url, bData, lang);
                    if (result.ok) {
                        const resData = result.data;
                        
                        // Check for errors in the response body even if status is 200
                        const bodyMsg = resData?.msg || resData?.message || "";
                        const isLimitOrExpired = bodyMsg.toLowerCase().includes('limit') || 
                                                 bodyMsg.toLowerCase().includes('expired') || 
                                                 bodyMsg.toLowerCase().includes('invalid') ||
                                                 bodyMsg.toLowerCase().includes('plan') ||
                                                 bodyMsg.toLowerCase().includes('authorized');
                                                 
                        if (resData?.status === false || isLimitOrExpired) {
                            lastError = bodyMsg || "Response status false";
                            console.warn(`[AstroBundler] ⚠️ ${ep.key} failed/unauthorized on ${node.name}: ${lastError}. Retrying next node...`);
                            continue; 
                        }

                        if (ep.url.includes('horo_chart_image')) {
                            results[ep.key] = resData.svg || resData.svg_code || null;
                        } else if (ep.key === 'planets' || ep.key === 'kp_planets') {
                            results[ep.key] = Array.isArray(resData) ? resData : (resData.planets || resData);
                        } else {
                            results[ep.key] = resData;
                        }
                        success = true;
                        break; 
                    }
                    
                    lastError = result.data?.msg || result.data?.message || `HTTP ${result.status}`;
                    console.error(`[AstroBundler] ❌ ${ep.key} failed on ${node.name}: ${lastError}`);
                } catch (error) {
                    lastError = error.message;
                    console.error(`[AstroBundler] ❌ ${ep.key} exception on ${node.name}: ${lastError}`);
                }
            }

            if (!success) {
                results[ep.key] = { error: true, msg: 'FETCH_FAILED', detail: lastError };
            }
        }
        
        console.log(`[AstroBundler] 🚀 Mega Route completed in ${Date.now() - startTime}ms`);
        return res.json({ success: true, data: results });

    } catch (error) {
        console.error('[AstroBundler] Critical Error:', error);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR", msg: error.message });
    }
};

const getHoroscopeData = async (req, res) => {
    try {
        const sign = req.query.sign || req.body.sign;
        const period = req.query.period || req.body.period || 'daily';

        if (!sign) {
            return res.status(400).json({ error: "Sign is required" });
        }

        const validPeriods = ['daily', 'weekly', 'monthly', 'yearly'];
        if (!validPeriods.includes(period)) {
            return res.status(400).json({ error: "Invalid period. Must be 'daily', 'weekly', 'monthly', or 'yearly'" });
        }

        console.log(`[HoroscopeController] Fetching ${period} horoscope for sign: ${sign}`);
        const data = await HoroscopeService.getHoroscope(sign, period);
        return res.json({ success: true, data });
    } catch (error) {
        console.error('[HoroscopeController] Error:', error);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR", msg: error.message });
    }
};

const resolveLanguage = (req) => {
    const raw = String(
        req.headers['x-accept-language'] ||
        req.body?.language ||
        req.query?.language ||
        req.body?.locale ||
        req.query?.locale ||
        req.headers['accept-language'] ||
        'en'
    ).toLowerCase();
    
    return ['hi', 'hi-in', 'hi_in'].includes(raw) ? 'hi' : 'en';
};

const mapPanchangResponse = (apiData, referenceDate, lat, lon, locale = 'en') => {
    const isHindi = locale === 'hi';
    const formatTime = (t) => {
        if (!t) return 'N/A';
        if (typeof t === 'string') return t;
        return `${String(t.hour).padStart(2, '0')}:${String(t.minute).padStart(2, '0')}:${String(t.second || 0).padStart(2, '0')}`;
    };

    const getEndString = (elem) => {
        if (!elem || !elem.details) return 'N/A';
        const name = elem.details.tithi_name || elem.details.nak_name || elem.details.yog_name || elem.details.karan_name || 'N/A';
        if (elem.end_time) {
            const endsText = isHindi ? 'समाप्त' : 'ends at';
            return `${name} (${endsText} ${String(elem.end_time.hour).padStart(2, '0')}:${String(elem.end_time.minute).padStart(2, '0')})`;
        }
        return name;
    };

    const weekday = apiData.day || 'N/A';
    const tithi = getEndString(apiData.tithi);
    const paksha = apiData.paksha || 'N/A';
    const sunrise = formatTime(apiData.sunrise || apiData.sun?.sunrise);
    const sunset = formatTime(apiData.sunset || apiData.sun?.sunset);
    const moonrise = formatTime(apiData.moonrise || apiData.moon?.moonrise);
    const moonset = formatTime(apiData.moonset || apiData.moon?.moonset);

    return {
        // Flat properties for app/(tabs)/home.tsx compatibility
        day: weekday,
        tithi,
        paksha,
        sunrise,
        sunset,
        moonrise,
        moonset,
        shubh_color: isHindi ? 'पीला' : 'Yellow',
        lucky_number: '7',
        mantra: isHindi ? 'ॐ नमः शिवाय' : 'Om Namah Shivaya',
        current_muhurat: isHindi ? 'अमृत' : 'Amrit',
        current_muhurat_time: isHindi ? '09:30 AM से 11:00 AM' : '09:30 AM - 11:00 AM',
        next_muhurat: isHindi ? 'शुभ' : 'Shubh',
        next_muhurat_time: isHindi ? '11:00 AM से 12:30 PM' : '11:00 AM - 12:30 PM',

        // Nested properties for app/panchang.tsx compatibility
        reference_date: referenceDate,
        title: isHindi ? `${referenceDate} का पंचांग` : `Panchang for ${referenceDate}`,
        location: isHindi 
            ? `अक्षांश: ${lat.toFixed(4)}, रेखांश: ${lon.toFixed(4)}` 
            : `Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`,
        panchang_for_today: {
            "Day": weekday,
            "Yoga": getEndString(apiData.yog || apiData.yoga),
            "Tithi": tithi,
            "Karana": getEndString(apiData.karan),
            "Paksha": paksha,
            "Nakshatra": getEndString(apiData.nakshatra),
            "Sun Sign": apiData.sun?.sun_sign || apiData.sun_sign || 'N/A'
        },
        sun_moon_calculations: {
            "Ritu": apiData.ritu || 'N/A',
            "Sun Set": sunset,
            "Moon Set": moonset,
            "Sun Rise": sunrise,
            "Moon Rise": moonrise,
            "Moon Sign": apiData.moon?.moon_sign || apiData.moon_sign || 'N/A'
        },
        hindu_month_year: {
            "Shaka Samvat": apiData.shaka_samvat ? `${apiData.shaka_samvat.year || apiData.shaka_samvat} (${apiData.shaka_samvat.samvat_name || apiData.shaka_samvat_name || ''})` : 'N/A',
            "Vikram Samvat": apiData.vikram_samvat ? `${apiData.vikram_samvat.year || apiData.vikram_samvat} (${apiData.vikram_samvat.samvat_name || apiData.vkram_samvat_name || ''})` : 'N/A',
            "Month Amanta": apiData.hindu_maheena?.amanta || apiData.hindu_maah?.amanta || 'N/A',
            "Month Purnimanta": apiData.hindu_maheena?.purnimanta || apiData.hindu_maah?.purnimanta || 'N/A'
        },
        inauspicious_timings: {
            "Rahu Kaal": apiData.rahukaal ? `${apiData.rahukaal.start_time || apiData.rahukaal.start || 'N/A'}` : 'N/A',
            "Yamaganda": apiData.yamghant_kaal ? `${apiData.yamghant_kaal.start_time || apiData.yamghant_kaal.start || 'N/A'}` : 'N/A',
            "Gulika Kaal": apiData.guli_kaal || apiData.guliKaal ? `${(apiData.guli_kaal || apiData.guliKaal).start_time || (apiData.guli_kaal || apiData.guliKaal).start || 'N/A'}` : 'N/A'
        },
        auspicious_timings: {
            "Abhijit": apiData.abhijit_muhurta ? `${apiData.abhijit_muhurta.start_time || apiData.abhijit_muhurta.start || 'N/A'}` : 'N/A'
        }
    };
};

const getPanchangData = async (req, res) => {
    const lang = resolveLanguage(req);
    const now = new Date();
    
    const day = Number(req.query.day || req.body?.day || now.getDate());
    const month = Number(req.query.month || req.body?.month || (now.getMonth() + 1));
    const year = Number(req.query.year || req.body?.year || now.getFullYear());
    const hour = Number(req.query.hour || req.body?.hour || now.getHours());
    const min = Number(req.query.min || req.body?.min || now.getMinutes());
    
    const lat = Number(req.query.lat || req.body?.lat || 28.6139);
    const lon = Number(req.query.lon || req.body?.lon || 77.2090);
    const tzone = Number(req.query.tzone || req.body?.tzone || 5.5);

    const referenceDateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const latFixed = Number(lat.toFixed(1));
    const lonFixed = Number(lon.toFixed(1));
    const tzoneFixed = Number(tzone.toFixed(1));

    try {
        // 1. Try DB cache first
        if (supabase) {
            try {
                const { data: existing } = await supabase
                    .from('panchangs')
                    .select('*')
                    .eq('reference_date', referenceDateStr)
                    .eq('lat', latFixed)
                    .eq('lon', lonFixed)
                    .eq('tzone', tzoneFixed)
                    .eq('locale', lang)
                    .maybeSingle();

                if (existing && existing.data) {
                    console.log(`[PanchangController] DB cache hit for ${referenceDateStr} [${lang}]`);
                    return res.json({ success: true, data: existing.data });
                }
            } catch (dbErr) {
                console.error('[PanchangController] DB Cache read error:', dbErr.message);
            }
        }

        // 2. Fetch API configuration settings from Supabase
        const { data: settings } = await supabase
            .from('kundli_settings')
            .select('setting_value')
            .eq('setting_key', 'api_config')
            .single();

        const config = settings?.setting_value || { 
            apis: [
                { name: 'Primary Key 1', user_id: '651550', api_key: 'ak-36483fc8a7f94df8504faacc4db3a46cafb353bd', is_enabled: true },
                { name: 'Fallback Key 2', user_id: '637158', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0', is_enabled: true },
                { name: 'Astrology Engine 3', user_id: '652693', api_key: 'ak-78d22f4e9a7680c4ac68ce28053f9d09fd3d56bf', is_enabled: true }
            ], 
            failover_enabled: true 
        };

        const nodes = config.apis.filter(api => api.is_enabled);
        let apiData = null;
        let lastError = null;

        const payload = {
            day,
            month,
            year,
            hour,
            min,
            lat: Number(lat.toFixed(4)),
            lon: Number(lon.toFixed(4)),
            tzone: tzoneFixed,
            lan: lang,
            language: lang
        };

        for (const node of nodes) {
            try {
                const userId = node.user_id;
                const apiKey = node.api_key;
                const auth = `Basic ${Buffer.from(`${userId}:${apiKey}`).toString('base64')}`;
                
                const url = `${ASTROLOGY_API_BASE_URL}/advanced_panchang`;
                console.log(`[PanchangController] Node ${node.name} calling advanced_panchang for User: ${userId} [${lang}]`);
                
                const response = await axios.post(url, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': auth,
                        'x-astrologyapi-key': apiKey,
                        'Accept-Language': lang,
                        'x-astrologyapi-language': lang
                    },
                    timeout: 15000
                });

                const bodyMsg = response.data?.msg || response.data?.message || "";
                const isLimitOrExpired = bodyMsg.toLowerCase().includes('limit') || 
                                         bodyMsg.toLowerCase().includes('expired') || 
                                         bodyMsg.toLowerCase().includes('invalid') ||
                                         bodyMsg.toLowerCase().includes('plan') ||
                                         bodyMsg.toLowerCase().includes('authorized');
                const isFailedStatus = response.data?.status === false;

                if (response.status === 200 && !isLimitOrExpired && !isFailedStatus) {
                    apiData = response.data;
                    break;
                }
                lastError = { status: response.status, msg: bodyMsg || "Node Error" };
                if (!config.failover_enabled) break;
            } catch (err) {
                lastError = { status: 500, msg: err.response?.data?.msg || err.message };
            }
        }

        if (!apiData) {
            throw new Error(lastError?.msg || "ALL_NODES_EXHAUSTED");
        }

        const mappedResult = mapPanchangResponse(apiData, referenceDateStr, lat, lon, lang);

        // 3. Save to DB cache
        if (supabase) {
            try {
                await supabase
                    .from('panchangs')
                    .upsert({
                        reference_date: referenceDateStr,
                        lat: latFixed,
                        lon: lonFixed,
                        tzone: tzoneFixed,
                        locale: lang,
                        data: mappedResult
                    }, { onConflict: 'reference_date,lat,lon,tzone,locale' });
                console.log(`[PanchangController] Saved to cache for ${referenceDateStr} [${lang}]`);
            } catch (saveError) {
                console.error('[PanchangController] DB Cache save error:', saveError.message);
            }
        }

        return res.json({ success: true, data: mappedResult });
    } catch (error) {
        console.error('[PanchangController] Failed:', error.message);
        
        // Final DB Fallback query (ignoring lat/lon match to maximize resilience if everything fails)
        try {
            if (supabase) {
                const { data: existing } = await supabase
                    .from('panchangs')
                    .select('*')
                    .eq('reference_date', referenceDateStr)
                    .eq('locale', lang)
                    .maybeSingle();

                if (existing && existing.data) {
                    console.log(`[PanchangController] DB recovery fallback success.`);
                    return res.json({ success: true, data: existing.data });
                }
            }
        } catch (dbErr) {
            console.error('[PanchangController] DB recovery fallback error:', dbErr.message);
        }

        return res.status(500).json({ success: false, error: "INTERNAL_SERVER_ERROR", msg: error.message });
    }
};

module.exports = {
    proxyAstroRequest,
    getKundliData,
    getHoroscopeData,
    getPanchangData
};
