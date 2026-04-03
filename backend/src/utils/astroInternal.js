const { supabase } = require('./supabase');

/**
 * Internal helper to make astrology API requests using the configured node cluster.
 * Reuses the same failover and load balancing logic from astrology controller.
 */
async function callInternalAstro(endpoint, body = {}, lang = 'en') {
    try {
        // 1. Fetch Dynamic Configuration from Supabase
        const { data: settings, error: fetchError } = await supabase
            .from('kundli_settings')
            .select('setting_value')
            .eq('setting_key', 'api_config')
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('[InternalAstro] DB Fetch Error:', fetchError);
        }

        const config = settings?.setting_value || {
            apis: [
                { id: 'h1', name: 'Fallback 1', provider: 'astrologyapi', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0', is_enabled: true, priority: 1 },
                { id: 'h2', name: 'Fallback 2', provider: 'astrologyapi', api_key: 'ak-36483fc8a7f94df8504faacc4db3a46cafb353bd', is_enabled: true, priority: 1 }
            ],
            load_balance_strategy: 'round-robin',
            failover_enabled: true
        };

        let nodes = config.apis.filter(api => api.is_enabled);
        if (config.load_balance_strategy === 'priority') {
            nodes.sort((a, b) => (a.priority || 1) - (b.priority || 1));
        } else if (config.load_balance_strategy === 'random') {
            nodes.sort(() => Math.random() - 0.5);
        }

        if (nodes.length === 0) throw new Error("No active astrology nodes.");

        let lastError = null;
        for (const node of nodes) {
            try {
                let headers = { 'Content-Type': 'application/json', 'Accept-Language': lang };
                let url = `https://json.astrologyapi.com/v1/${endpoint}`;

                if (node.provider === 'astrologyapi') {
                    if (node.user_id) {
                        const auth = Buffer.from(`${node.user_id}:${node.api_key}`).toString('base64');
                        headers['Authorization'] = `Basic ${auth}`;
                    } else {
                        headers['x-astrologyapi-key'] = node.api_key;
                    }
                } else {
                    continue; // Prokerala not supported yet
                }

                const response = await fetch(url, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(body),
                    signal: AbortSignal.timeout(10000)
                });

                const data = await response.json().catch(() => ({ msg: "Internal Error" }));
                if (response.ok) {
                    const isLimit = data.msg?.toLowerCase().includes('limit') || data.msg?.toLowerCase().includes('expired');
                    if (isLimit) continue;
                    return data;
                }
                lastError = data.msg || response.statusText;
            } catch (err) {
                lastError = err.message;
                continue;
            }
        }
        throw new Error(`Nodes exhausted: ${lastError}`);
    } catch (error) {
        console.error('[InternalAstro] Critical Error:', error.message);
        throw error;
    }
}

module.exports = { callInternalAstro };
