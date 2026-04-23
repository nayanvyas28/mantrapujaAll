import { NextRequest, NextResponse } from 'next/server';
import { PanchangService } from '@/lib/panchangService';

export async function GET(req: NextRequest) {
    try {
        const data = await PanchangService.getTodayPanchang();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Panchang API Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch panchang' }, { status: 500 });
    }
}
