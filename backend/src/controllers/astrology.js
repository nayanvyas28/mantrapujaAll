const { supabase } = require('../utils/supabase');

const ASTROLOGY_API_BASE_URL = "https://json.astrologyapi.com/v1";

/**
 * Shared logic to execute an AstrologyAPI request with a specific node
 */
const executeNodeRequest = async (node, endpoint, body, lang) => {
    let provider = node.provider || (node.api_key ? 'astrologyapi' : null);
    
    // 🔗 Basic Auth for AstrologyAPI (Match Website)
    const userId = node.user_id || '629910'; // Fallback to premium if missing
    const apiKey = node.api_key;
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
        const config = settings?.setting_value || { apis: [{ name: 'Default', user_id: '637158', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0', is_enabled: true }], failover_enabled: true };

        const nodes = config.apis.filter(api => api.is_enabled);
        let lastError = null;

        for (const node of nodes) {
            try {
                const result = await executeNodeRequest(node, endpoint, body, lang);
                const isLimit = result.data.msg?.toLowerCase().includes('limit') || result.data.msg?.toLowerCase().includes('expired');

                if (result.ok && !isLimit) {
                    return res.status(result.status).json(result.data);
                }
                lastError = { status: result.status, msg: result.data.msg || "Node Error" };
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
        const config = settings?.setting_value || { apis: [{ name: 'Premium', user_id: '629910', api_key: 'd33e9d8924b10499e15df332f99580b0', is_enabled: true }] };
        const nodes = config.apis.filter(api => api.is_enabled);

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
                        
                        // Check for plan/authorization errors in the response body even if status is 200
                        const bodyMsg = resData.msg || resData.message || "";
                        if (bodyMsg.toLowerCase().includes('plan') || bodyMsg.toLowerCase().includes('authorized')) {
                            lastError = bodyMsg;
                            console.warn(`[AstroBundler] ⚠️ ${ep.key} unauthorized on ${node.name}: ${lastError}. Retrying next node...`);
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

module.exports = {
    proxyAstroRequest,
    getKundliData
};
