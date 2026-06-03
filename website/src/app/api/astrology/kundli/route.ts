import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const res = await fetch('http://127.0.0.1:4000/api/astrology/kundli', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error: any) {
        console.error('[Next.js Kundli Proxy Error]:', error);
        return NextResponse.json({ error: error.message || 'Failed to proxy kundli request' }, { status: 500 });
    }
}
