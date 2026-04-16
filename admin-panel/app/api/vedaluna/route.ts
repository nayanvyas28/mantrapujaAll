import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const runtime = 'nodejs';

const ASTROLOGY_API_BASE_URL = 'https://json.astrologyapi.com/v1';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { params } = body;
        const supabase = await createClient();

        // 🔗 Sync with Node Config
        const { data: settings } = await supabase
            .from('kundli_settings')
            .select('setting_value')
            .eq('setting_key', 'api_config')
            .single();

        // 🔄 MULTI-NODE FAILOVER ENGINE (Same as Website)
        const activeNodes = (settings?.setting_value?.apis || []).filter((node: any) => node.is_enabled);
        const fallbackNodes = activeNodes.length > 0 ? activeNodes : [{ user_id: '637158', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0', name: 'Fallback-Trial' }];

        const fetchWithRetry = async (url: string, payload: any) => {
            let lastError = null;

            for (const node of fallbackNodes) {
                try {
                    const u = node.user_id;
                    const k = node.api_key;
                    const auth = `Basic ${Buffer.from(`${u}:${k}`).toString('base64')}`;

                    console.log(`[AdminVeda] Fetching ${url} using node: ${node.name || 'API'}`);

                    const res = await fetch(`${ASTROLOGY_API_BASE_URL}/${url}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': auth,
                            'x-astrologyapi-key': k,
                            'x-astrologyapi-language': payload.language || 'en',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload),
                        signal: AbortSignal.timeout(12000)
                    });

                    const data = await res.json();
                    const isLimit = data.msg?.toLowerCase().includes('limit') || data.msg?.toLowerCase().includes('expired');

                    if (res.ok && !isLimit) {
                        if (data.status === false && !data.report && !data.description && !data.personality_report && !Array.isArray(data)) {
                            throw new Error(data.msg);
                        }
                        return data;
                    }

                    lastError = data.msg || `Node ${node.name || 'API'} Error (${res.status})`;
                } catch (err: any) {
                    lastError = err.message;
                    continue;
                }
            }
            throw new Error(lastError || 'All API nodes exhausted');
        };

        const dt = new Date(params.datetime);
        const [lat, lon] = params.coordinates?.split(',').map(Number) || [19.076, 72.8777];

        const basePayload = {
            day: dt.getDate(), month: dt.getMonth() + 1, year: dt.getFullYear(),
            hour: dt.getHours(), min: dt.getMinutes(),
            lat: Number(lat.toFixed(4)), lon: Number(lon.toFixed(4)),
            tzone: 5.5, name: params.name || 'User',
            ayanamsa: 1,
            language: params.language || 'en',
            lan: params.language || 'en'
        };

        const allEndpoints: { key: string; url: string }[] = [
            { key: 'core', url: 'astro_details' },
            { key: 'panchang', url: 'basic_panchang' },
            { key: 'dasha', url: 'major_vdasha' },
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
            { key: 'current_dasha', url: 'current_vdasha' },
            { key: 'manglik', url: 'manglik' },
            { key: 'sadhesati', url: 'sadhesati_current_status' },
            { key: 'chart', url: `horo_chart_image/${params.chart_id || 'D1'}` }
        ];

        const results: any = {};
        const selected = params.chart_id ? allEndpoints.filter(e => e.key === 'chart' || e.key === 'planets') : allEndpoints;

        for (const ep of selected) {
            try {
                let data = await fetchWithRetry(ep.url, basePayload);
                results[ep.key] = ep.key === 'chart' ? (data.svg || null) : data;
            } catch (err: any) {
                results[ep.key] = { error: true, msg: err.message };
            }
        }

        return NextResponse.json({ success: true, data: results });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
