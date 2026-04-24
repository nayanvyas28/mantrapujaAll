
import { NextRequest, NextResponse } from 'next/server';
import { HoroscopeService } from '@/lib/horoscopeService';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sign = searchParams.get('sign');
    const period = searchParams.get('period') || 'daily';

    if (!sign) {
        return NextResponse.json({ error: 'Sign is required' }, { status: 400 });
    }

    try {
        const data = await HoroscopeService.getHoroscope(sign, period as any);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Horoscope API Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch horoscope' }, { status: 500 });
    }
}
