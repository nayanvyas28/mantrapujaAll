import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { locations as staticLocations } from '@/data/spiritual-locations';

export async function GET() {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { auth: { persistSession: false } }
        );

        // 1. Get all cities from the footer source
        const { data: cities } = await supabase.from('serving_cities').select('name').eq('is_active', true);
        
        // 2. Get all existing destinations
        const { data: destinations } = await supabase.from('destinations').select('slug, name');

        const cityList = cities || [];
        const existingSlugs = new Set([
            ...staticLocations.map(l => l.slug),
            ...(destinations || []).map(d => d.slug)
        ]);

        const slugMap: Record<string, string> = {
            "Varanasi": "kashi-vishwanath",
            "Ujjain": "mahakaleshwar",
            "Nashik": "trimbakeshwar",
            "Deoghar": "baidyanath",
            "Aurangabad": "grishneshwar",
            "Srisailam": "mallikarjuna",
            "Bodh Gaya": "gaya",
            "Vaishno Devi": "vaishno-devi"
        };

        const brokenCities = cityList.filter(city => {
            const slug = slugMap[city.name] || city.name.toLowerCase().replace(/\s+/g, '-');
            return !existingSlugs.has(slug);
        });

        return NextResponse.json({
            total_cities: cityList.length,
            broken_count: brokenCities.length,
            broken_cities: brokenCities.map(c => c.name)
        });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
