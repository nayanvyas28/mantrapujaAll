import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const day = searchParams.get('day');
    const month = searchParams.get('month');
    const year = searchParams.get('year');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    
    let query = '';
    const params = new URLSearchParams();
    if (day) params.append('day', day);
    if (month) params.append('month', month);
    if (year) params.append('year', year);
    if (lat) params.append('lat', lat);
    if (lon) params.append('lon', lon);
    if (params.toString()) {
        query = `?${params.toString()}`;
    }

    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:4000';
    try {
        const res = await fetch(`${backendUrl}/api/astrology/panchang${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error: any) {
        console.error('[Next.js Panchang Proxy Error]:', error);
        return NextResponse.json({ error: error.message || 'Failed to proxy panchang request' }, { status: 500 });
    }
}
