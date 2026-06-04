import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

const ASTROLOGY_API_BASE_URL = "https://json.astrologyapi.com/v1";

const executeNodeRequest = async (node: any, endpoint: string, body: any, lang: string) => {
    const userId = node.user_id;
    const apiKey = node.api_key;
    const auth = `Basic ${Buffer.from(`${userId}:${apiKey}`).toString('base64')}`;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': auth,
        'x-astrologyapi-key': apiKey,
        'x-astrologyapi-language': lang || 'en'
    };

    const payload = {
        ...body,
        lat: Number(parseFloat(body.lat).toFixed(4)),
        lon: Number(parseFloat(body.lon).toFixed(4)),
        ayanamsa: 1,
        lan: lang || 'en',
        language: lang || 'en',
        name: body.name || 'User'
    };

    const url = `${ASTROLOGY_API_BASE_URL}/${endpoint}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000)
    });

    const data = await response.json().catch(() => ({ msg: "Internal Error" }));
    return { status: response.status, ok: response.ok, data };
};

const fetchEndpointSafely = async (ep: any, birthData: any, lang: string, nodes: any[]) => {
    let lastError = null;
    for (const node of nodes) {
        try {
            const result = await executeNodeRequest(node, ep.url, birthData, lang);
            if (result.ok) {
                const resData = result.data;
                const bodyMsg = resData.msg || resData.message || "";
                if (bodyMsg.toLowerCase().includes('plan') || bodyMsg.toLowerCase().includes('authorized')) {
                    lastError = bodyMsg;
                    continue; 
                }

                let value;
                if (ep.url.includes('horo_chart_image')) {
                    value = resData.svg || resData.svg_code || null;
                } else if (ep.key === 'planets') {
                    value = Array.isArray(resData) ? resData : (resData.planets || resData);
                } else {
                    value = resData;
                }
                return { key: ep.key, value };
            }
            lastError = result.data?.msg || result.data?.message || `HTTP ${result.status}`;
        } catch (error: any) {
            lastError = error.message;
        }
    }
    return { 
        key: ep.key, 
        value: { error: true, msg: 'FETCH_FAILED', detail: lastError } 
    };
};

export async function POST(req: NextRequest) {
    try {
        const { birthData, language } = await req.json();
        const lang = language || 'en';
        const bData = birthData?.birthData || birthData;

        if (!bData || !bData.day || !bData.month || !bData.year || bData.hour === undefined || bData.min === undefined || !bData.lat || !bData.lon || bData.tzone === undefined) {
            return NextResponse.json({ 
                success: false, 
                error: "INVALID_INPUT", 
                msg: "Required fields: day, month, year, hour, min, lat, lon, tzone" 
            }, { status: 400 });
        }

        const supabase = getSupabaseAdmin();
        let nodes = [
            { name: 'Premium', user_id: '651550', api_key: 'ak-36483fc8a7f94df8504faacc4db3a46cafb353bd', is_enabled: true },
            { name: 'Default', user_id: '637158', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0', is_enabled: true }
        ];
        
        if (supabase) {
            const { data: settings } = await supabase
                .from('kundli_settings')
                .select('setting_value')
                .eq('setting_key', 'api_config')
                .maybeSingle();
                
            if (settings?.setting_value?.apis) {
                const dbNodes = settings.setting_value.apis.filter((api: any) => api.is_enabled);
                if (dbNodes.length > 0) {
                    nodes = dbNodes;
                }
            }
        }

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
            { key: 'chart_d1', url: 'horo_chart_image/D1' },
            { key: 'chart_d9', url: 'horo_chart_image/D9' },
            { key: 'chart_sun', url: 'horo_chart_image/SUN' },
            { key: 'chart_moon', url: 'horo_chart_image/MOON' },
            { key: 'chart_d2', url: 'horo_chart_image/D2' },
            { key: 'chart_d3', url: 'horo_chart_image/D3' },
            { key: 'chart_d10', url: 'horo_chart_image/D10' }
        ];

        // Fetch all 26 endpoints in batches of 5 to avoid connection limits and rate-limiting
        const taskResults: any[] = [];
        const batchSize = 5;
        for (let i = 0; i < endpoints.length; i += batchSize) {
            const batch = endpoints.slice(i, i + batchSize);
            const batchTasks = batch.map(ep => fetchEndpointSafely(ep, bData, lang, nodes));
            const batchResults = await Promise.all(batchTasks);
            taskResults.push(...batchResults);
        }

        const compiledData: Record<string, any> = {};
        for (const resItem of taskResults) {
            compiledData[resItem.key] = resItem.value;
        }

        return NextResponse.json({ success: true, data: compiledData });
    } catch (error: any) {
        console.error('[Next.js Kundli API Error]:', error);
        return NextResponse.json({ success: false, error: "INTERNAL_SERVER_ERROR", msg: error.message }, { status: 500 });
    }
}
