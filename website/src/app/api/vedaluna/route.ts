import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const runtime = 'nodejs';

const ASTROLOGY_API_BASE_URL = 'https://json.astrologyapi.com/v1';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { params } = body;

        // 🔗 Sync with Admin Panel Config Node
        const { data: settings } = await supabase
            .from('kundli_settings')
            .select('setting_value')
            .eq('setting_key', 'api_config')
            .single();

        // 🔄 ADVANCED MULTI-NODE FAILOVER ENGINE
        const activeNodes = (settings?.setting_value?.apis || []).filter((node: any) => node.is_enabled);
        const fallbackNodes = activeNodes.length > 0 ? activeNodes : [{ user_id: '637158', api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0', name: 'Fallback-Trial' }];

        const fetchWithRetry = async (url: string, payload: any) => {
            let lastError = null;

            for (const node of fallbackNodes) {
                try {
                    const u = node.user_id;
                    const k = node.api_key;
                    const auth = `Basic ${Buffer.from(`${u}:${k}`).toString('base64')}`;

                    console.log(`[VedaNexus] Fetching ${url} using node: ${node.name || 'API'}`);

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
                            console.warn(`[VedaNexus] Node ${node.name} failed for ${url}:`, data.msg);
                            throw new Error(data.msg);
                        }
                        console.log(`[VedaNexus] SUCCESS for ${url} (Node: ${node.name})`);
                        return data;
                    }

                    lastError = data.msg || `Node ${node.name || 'API'} Error (${res.status})`;
                    console.warn(`[VedaNexus] Node ${node.name || 'API'} failed for ${url}: ${lastError}. Retrying next...`);
                } catch (err: any) {
                    lastError = err.message;
                    continue;
                }
            }
            throw new Error(lastError || 'All API nodes exhausted');
        };

        const dt = new Date(params.datetime);
        const [lat, lon] = params.coordinates?.split(',').map(Number) || [19.076, 72.8777];
        const chartId = params.chart_id || 'D1';

        const birthData = {
            day: dt.getDate(), month: dt.getMonth() + 1, year: dt.getFullYear(),
            hour: dt.getHours(), min: dt.getMinutes(),
            lat: Number(lat.toFixed(4)), lon: Number(lon.toFixed(4)),
            tzone: 5.5, name: params.name || 'User',
            ayanamsa: 1
        };

        const basePayload = {
            ...birthData,
            language: params.language || 'en',
            lan: params.language || 'en' // Fallback for legacy/specific nodes
        };

        const allPossibleEndpoints: { key: string; url: string }[] = [
            { key: 'core', url: 'astro_details' },
            { key: 'panchang', url: 'basic_panchang' },
            { key: 'dasha', url: 'major_vdasha' },
            { key: 'gemstone', url: 'basic_gem_suggestion' },
            { key: 'rudraksha', url: 'rudraksha_suggestion' },
            { key: 'character', url: 'general_ascendant_report' }, // Updated from personal_characteristics
            { key: 'career', url: 'career_report' },
            { key: 'health', url: 'health_report' },
            { key: 'love', url: 'manglik' }, // Updated from love_report
            { key: 'physical', url: 'general_ascendant_report' }, // Updated from physique_report
            { key: 'numero_table', url: 'numero_table' },
            { key: 'numero_report', url: 'numero_report' },
            { key: 'numero_time', url: 'numero_fav_time' }, // Updated from numero_time
            { key: 'numero_place_vastu', url: 'numero_place_vastu' },
            { key: 'planets', url: 'planets' },
            { key: 'current_dasha', url: 'current_vdasha' },
            { key: 'kp_planets', url: 'kp_planets' },
            { key: 'kp_house_cusps', url: 'kp_house_cusps' },
            { key: 'sarvashtak', url: 'sarvashtak' },
            { key: 'yoga_report', url: 'yoga_report' },
            { key: 'manglik', url: 'manglik' },
            { key: 'sadhesati', url: 'sadhesati_current_status' }
        ];

        let endpoints = [];
        if (params.chart_id) {
            endpoints = [
                { key: 'chart', url: `horo_chart_image/${params.chart_id || 'D1'}` },
                { key: 'planets', url: `planets` }
            ];
        } else if (params.keys && Array.isArray(params.keys)) {
            endpoints = allPossibleEndpoints.filter(ep => params.keys.includes(ep.key));
        } else {
            // Default load - only essential dashboard + charts data to keep it fast
            endpoints = allPossibleEndpoints.filter(ep => [
                'core', 'panchang', 'planets', 'numero_table', 
                'manglik', 'sadhesati', 'current_dasha', 'dasha'
            ].includes(ep.key));
        }

        const results: any = {};

        // Parallel processing with concurrency limit (Batch size: 5)
        const batchSize = 5;
        for (let i = 0; i < endpoints.length; i += batchSize) {
            const batch = endpoints.slice(i, i + batchSize);
            await Promise.all(batch.map(async (ep) => {
                try {
                    let data = await fetchWithRetry(ep.url, basePayload);
                    if (ep.key === 'chart') {
                        results[ep.key] = data.svg || null;
                    } else {
                        results[ep.key] = data;
                    }
                } catch (err: any) {
                    console.error(`[VedaNexus] Total failure for ${ep.key}:`, err.message);
                    results[ep.key] = { error: true, msg: err.message };
                }
            }));
        }

        return NextResponse.json({
            success: true,
            data: results,
            engine: 'VedaNexus-Failover-V2.0-Parallel',
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('[VedaNexus] CRITICAL_ERROR:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
