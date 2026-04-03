const { supabase } = require('../utils/supabase');

const ASTROLOGY_API_BASE_URL = "https://json.astrologyapi.com/v1";

/**
 * Proxy request to AstrologyAPI/Prokerala with automatic failover and load balancing
 */
const proxyAstroRequest = async (req, res) => {
    const { endpoint } = req.params;
    const body = req.body;
    const lang = req.headers['accept-language'] || 'en';

    try {
        // 1. Fetch Dynamic Configuration from Supabase
        const { data: settings, error: fetchError } = await supabase
            .from('kundli_settings')
            .select('setting_value')
            .eq('setting_key', 'api_config')
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('[AstroProxy] DB Fetch Error:', fetchError);
        }

        const config = settings?.setting_value || {
            apis: [
                { id: 'h1', name: 'Hardcoded Fallback 1', provider: 'astrologyapi', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0', is_enabled: true, priority: 1 },
                { id: 'h2', name: 'Hardcoded Fallback 2', provider: 'astrologyapi', api_key: 'ak-36483fc8a7f94df8504faacc4db3a46cafb353bd', is_enabled: true, priority: 1 }
            ],
            load_balance_strategy: 'round-robin',
            failover_enabled: true
        };

        // 2. Filter and Sort Nodes
        let nodes = config.apis.filter(api => api.is_enabled);
        
        if (config.load_balance_strategy === 'priority') {
            nodes.sort((a, b) => (a.priority || 1) - (b.priority || 1));
        } else if (config.load_balance_strategy === 'random') {
            nodes.sort(() => Math.random() - 0.5);
        }

        if (nodes.length === 0) {
            throw new Error("No active astrology nodes configured in Veda Manager.");
        }

        let lastError = null;

        // 3. Execution Loop with Failover
        for (const node of nodes) {
            try {
                console.log(`[AstroProxy] Attempting ${endpoint} with Node: ${node.name} (${node.provider})`);

                let headers = {
                    'Content-Type': 'application/json',
                    'Accept-Language': lang
                };

                let url = `${ASTROLOGY_API_BASE_URL}/${endpoint}`;

                if (node.provider === 'astrologyapi') {
                    headers['x-astrologyapi-key'] = node.api_key;
                    // Some endpoints might need basic auth instead of header
                    if (node.user_id) {
                        const auth = Buffer.from(`${node.user_id}:${node.api_key}`).toString('base64');
                        headers['Authorization'] = `Basic ${auth}`;
                    }
                } else if (node.provider.startsWith('prokerala')) {
                    // Placeholder for Prokerala implementation if needed
                    // For now, only AstrologyAPI is fully mapped in this proxy
                    console.warn(`[AstroProxy] Provider ${node.provider} not fully supported in Node.js Proxy yet.`);
                    continue; 
                }

                const response = await fetch(url, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(body),
                    signal: AbortSignal.timeout(15000)
                });

                const responseData = await response.json().catch(() => ({ msg: "Internal Error" }));

                if (response.ok) {
                    // Check for internal API errors disguised as 200 OK
                    const isLimit = responseData.msg?.toLowerCase().includes('limit') || responseData.msg?.toLowerCase().includes('expired');
                    if (isLimit) {
                        console.warn(`[AstroProxy] Limit detected on node ${node.name}. Triggering failover...`);
                        lastError = { status: 429, msg: responseData.msg };
                        continue;
                    }

                    console.log(`[AstroProxy] Success with Node: ${node.name}`);
                    return res.status(response.status).json(responseData);
                }

                console.error(`[AstroProxy] Node ${node.name} Failed (${response.status}):`, responseData.msg || response.statusText);
                
                if (!config.failover_enabled) {
                    return res.status(response.status).json(responseData);
                }

                lastError = { status: response.status, msg: responseData.msg || response.statusText };
                continue;

            } catch (err) {
                console.error(`[AstroProxy] Exception on Node ${node.name}:`, err.message);
                lastError = { status: 500, msg: err.message };
                continue;
            }
        }

        // Exhausted all nodes
        return res.status(lastError?.status || 500).json({
            error: "ALL_NODES_EXHAUSTED",
            msg: lastError?.msg || "Veda Cluster failed to process request.",
            nodes_attempted: nodes.length
        });

    } catch (error) {
        console.error('[AstroProxy] CRITICAL FAILURE:', error);
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR", msg: error.message });
    }
};

module.exports = {
    proxyAstroRequest
};
