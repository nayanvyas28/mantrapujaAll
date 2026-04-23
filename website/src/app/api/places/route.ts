import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
        return NextResponse.json({ features: [] });
    }

    try {
        // Photon often requires a User-Agent or some servers block standard fetch from clients
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'MantraPuja/1.0'
            }
        });

        if (!response.ok) {
            throw new Error(`Photon responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Proxy Photon Error:', error);
        return NextResponse.json({ features: [], error: 'Failed to fetch places' }, { status: 500 });
    }
}
