import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sign = searchParams.get('sign');
    const period = searchParams.get('period') || 'daily';

    if (!sign) {
        return NextResponse.json({ error: 'Sign is required' }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:4000';
    try {
        const res = await fetch(`${backendUrl}/api/astrology/horoscope?sign=${sign}&period=${period}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error: any) {
        console.error('[Next.js Horoscope Proxy Error]:', error);
        return NextResponse.json({ error: error.message || 'Failed to proxy horoscope request' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:4000';
    try {
        const body = await req.json();
        const res = await fetch(`${backendUrl}/api/astrology/horoscope`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error: any) {
        console.error('[Next.js Horoscope Proxy Error]:', error);
        return NextResponse.json({ error: error.message || 'Failed to proxy horoscope request' }, { status: 500 });
    }
}
