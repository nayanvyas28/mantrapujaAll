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

const getPanchangData = async (req, res) => {
    try {
        const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        console.log(`[PanchangController] Scraping fresh live Panchang from AstroSage...`);

        const url = 'https://panchang.astrosage.com/panchang/aajkapanchang?language=en';
        
        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml',
            },
            timeout: 20000,
        });

        const $ = cheerio.load(html);
        
        const result = {
            reference_date: today,
            title: '',
            location: '',
            panchang_for_today: {},
            sun_moon_calculations: {},
            hindu_month_year: {},
            inauspicious_timings: {},
            auspicious_timings: {},
        };

        const titleText = $('title').text().trim();
        result.title = titleText.split('Panchangam for')[0].trim() || 'Today Panchang';
        result.location = titleText.split('Panchangam for')[1]?.trim() || 'New Delhi, India';

        const parseSection = (sectionTitle, targetObj) => {
            $(`h4:contains("${sectionTitle}")`).next('.row').find('.pan-row').each((_, el) => {
                const label = $(el).find('div').first().text().trim();
                let value = $(el).find('div').last().text().trim();
                value = value.replace(/\s+/g, ' ').trim();
                if (label && value) {
                    targetObj[label] = value;
                }
            });
        };

        parseSection('Panchang For Today', result.panchang_for_today);
        parseSection('Sun And Moon Calculations', result.sun_moon_calculations);
        parseSection('Hindu Month And Year', result.hindu_month_year);
        parseSection('Inauspicious Timings', result.inauspicious_timings);
        parseSection('Auspicious Timings', result.auspicious_timings);

        // 3. Save to DB cache
        if (supabase) {
            const { error: saveError } = await supabase
                .from('panchangs')
                .upsert({
                    reference_date: today,
                    data: result
                }, { onConflict: 'reference_date' });

            if (saveError) console.error('[PanchangController] DB Save Error:', saveError);
        }

        return res.json({ success: true, data: result });
    } catch (error) {
        console.error('[PanchangController] Scraping failed, trying DB cache...', error.message);
        try {
            if (supabase) {
                const { data: existing } = await supabase
                    .from('panchangs')
                    .select('*')
                    .eq('reference_date', today)
                    .maybeSingle();

                if (existing && existing.data) {
                    console.log(`[PanchangController] DB fallback success.`);
                    return res.json({ success: true, data: existing.data });
                }
            }
        } catch (dbErr) {
            console.error('[PanchangController] DB fallback error:', dbErr.message);
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
