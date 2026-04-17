const { supabase } = require('../utils/supabase');

const ASTROLOGY_API_BASE_URL = "https://json.astrologyapi.com/v1";

/**
 * Shared logic to execute an AstrologyAPI request with a specific node
 */
const executeNodeRequest = async (node, endpoint, body, lang) => {
    let provider = node.provider || (node.api_key ? 'astrologyapi' : null);
    
    let headers = {
        'Content-Type': 'application/json',
        'Accept-Language': lang
    };

    let url = `${ASTROLOGY_API_BASE_URL}/${endpoint}`;

    if (provider === 'astrologyapi') {
        headers['x-astrologyapi-key'] = node.api_key;
        if (node.user_id) {
            const auth = Buffer.from(`${node.user_id}:${node.api_key}`).toString('base64');
            headers['Authorization'] = `Basic ${auth}`;
        }
    } else {
        throw new Error(`Provider ${provider} not supported.`);
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
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
        const config = settings?.setting_value || { apis: [{ name: 'Default', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0' }], failover_enabled: true };

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

        const { data: settings } = await supabase.from('kundli_settings').select('setting_value').eq('setting_key', 'api_config').single();
        const config = settings?.setting_value || { apis: [{ name: 'Default', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0' }] };
        const nodes = config.apis.filter(api => api.is_enabled);

        const endpoints = [
            { key: 'core', url: 'astro_details' },
            { key: 'panchang', url: 'basic_panchang' },
            { key: 'dasha', url: 'major_vdasha' },
            { key: 'current_dasha', url: 'current_vdasha' },
            { key: 'gemstone', url: 'basic_gem_suggestion' },
            { key: 'character', url: 'personal_characteristics' },
            { key: 'planets', url: 'planets' },
            { key: 'yoga_report', url: 'yoga_report' },
            { key: 'manglik', url: 'manglik' },
            { key: 'sadhesati', url: 'sadhesati_current_status' },
            { key: 'chart_d1', url: 'horo_chart_image/D1' },
            { key: 'chart_d9', url: 'horo_chart_image/D9' }
        ];

        const results = {};
        
        // Execute sequentially to avoid rate limiting on trial keys, but use failover nodes
        for (const ep of endpoints) {
            let epSuccess = false;
            for (const node of nodes) {
                try {
                    const result = await executeNodeRequest(node, ep.url, birthData, lang);
                    const isLimit = result.data.msg?.toLowerCase().includes('limit') || result.data.msg?.toLowerCase().includes('expired');
                    
                    if (result.ok && !isLimit) {
                        results[ep.key] = ep.url.includes('chart') ? (result.data.svg || null) : result.data;
                        epSuccess = true;
                        break;
                    }
                } catch (err) {
                    console.error(`[AstroBundler] Node ${node.name} failed for ${ep.key}`);
                }
            }
            if (!epSuccess) results[ep.key] = { error: true, msg: "FETCH_FAILED" };
        }

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
