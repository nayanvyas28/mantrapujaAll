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

        console.log(`[AstroBundler] Incoming Request for ${birthData?.day}/${birthData?.month}/${birthData?.year} | Gender: ${birthData?.gender}`);
        console.log(`[AstroBundler] Payload:`, JSON.stringify(birthData));

        const { data: settings } = await supabase.from('kundli_settings').select('setting_value').eq('setting_key', 'api_config').single();
        const config = settings?.setting_value || { apis: [{ name: 'Default', user_id: '637158', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0', is_enabled: true }] };
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
        const startTime = Date.now();

        if (!nodes || nodes.length === 0) {
            console.error('[AstroBundler] ❌ No enabled API nodes found in settings!');
            return res.status(500).json({ error: true, msg: "API Configuration Missing" });
        }

        console.log(`[AstroBundler] Using ${nodes.length} API nodes.`);
        
        // Split endpoints into smaller chunks to avoid 429 Rate Limits
        const chunks = [];
        const chunkSize = 2; // Reduced to 2 for even more safety
        for (let i = 0; i < endpoints.length; i += chunkSize) {
            chunks.push(endpoints.slice(i, i + chunkSize));
        }

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            console.log(`[AstroBundler] Batch ${i+1}/${chunks.length} starting...`);
            
            const chunkPromises = chunk.map(async (ep) => {
                let lastError = null;
                const retryDelays = [4000, 8000]; 

                for (let attempt = 0; attempt <= 2; attempt++) {
                    const node = nodes[attempt % nodes.length];
                    try {
                        const result = await executeNodeRequest(node, ep.url, birthData, lang);
                        
                        if (result.ok) {
                            const data = result.data;
                            const isLimit = data.msg?.toLowerCase().includes('limit') || data.msg?.toLowerCase().includes('expired');
                            
                            if (isLimit) {
                                console.warn(`[AstroBundler] ⚠️ Node ${node.name} reported limit for ${ep.key}`);
                                lastError = data.msg;
                                continue;
                            }

                            results[ep.key] = ep.url.includes('chart') ? (data.svg || null) : data;
                            console.log(`[AstroBundler] ✅ ${ep.key} (Node: ${node.name})`);
                            return; 
                        }

                        lastError = result.data?.msg || `HTTP ${result.status}`;
                        console.warn(`[AstroBundler] ❌ ${ep.key} failed on ${node.name}: ${lastError}`);

                        if (result.status === 405) break; 

                        if (result.status === 429 && attempt < 2) {
                            console.log(`[AstroBundler] ⏳ 429 for ${ep.key}, waiting ${retryDelays[attempt]}ms...`);
                            await new Promise(resolve => setTimeout(resolve, retryDelays[attempt]));
                            continue;
                        }
                    } catch (error) {
                        lastError = error.message;
                        console.error(`[AstroBundler] 💥 Exception for ${ep.key}:`, error.message);
                    }
                }
                results[ep.key] = { error: true, msg: 'FETCH_FAILED', detail: lastError };
            });

            await Promise.all(chunkPromises);
            
            if (i < chunks.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1500));
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
