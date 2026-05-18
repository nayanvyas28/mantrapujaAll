import { getSupabaseServer } from '@/lib/supabaseServer';

export type LocationType = 'Char Dham' | 'Jyotirlinga' | 'Shakti Peeth' | 'Jyotirlinga & Shakti Peeth' | 'Kumbh Mela' | 'Spiritual City' | 'Sacred Destination' | 'All';

export interface Location {
    id: string | number;
    name: string;
    slug: string;
    type: LocationType;
    description: string;
    image: string;
    stateId: string;
    x: number;
    y: number;
    size: 'small' | 'medium' | 'large';
}

export interface LocationDetail extends Location {
    spiritualEssence?: string;
    significance?: string;
    longDescription?: string;
    history?: string;
    keyRituals?: { name: string; description: string; }[];
    highlights?: { name: string; description: string; }[];
    travelInfo?: {
        bestTime: string;
        nearestAirport: string;
        nearestRailway: string;
        howToReach: string;
    };
    tips?: string[];
    spiritualArchitecture?: string;
    vedicReferences?: string;
    localLegends?: string;
    faqs?: { question: string; answer: string; }[];
}

const getStateCenter = (stateId: string | null): { x: number; y: number } => {
    const stateCenters: Record<string, { x: number, y: number }> = {
        'ut': { x: 240, y: 160 }, 'gj': { x: 70, y: 350 }, 'or': { x: 350, y: 410 },
        'tn': { x: 220, y: 600 }, 'up': { x: 270, y: 250 }, 'mh': { x: 150, y: 430 },
        'as': { x: 500, y: 260 }, 'mp': { x: 220, y: 320 }, 'br': { x: 360, y: 280 },
        'rj': { x: 150, y: 260 }, 'ap': { x: 250, y: 500 }, 'ka': { x: 180, y: 520 },
        'kl': { x: 170, y: 620 }, 'wb': { x: 420, y: 330 }, 'jh': { x: 360, y: 320 },
        'ct': { x: 290, y: 400 }, 'tg': { x: 230, y: 460 }, 'pb': { x: 170, y: 160 },
        'hr': { x: 190, y: 180 }, 'dl': { x: 195, y: 200 }, 'hp': { x: 210, y: 140 },
        'jk': { x: 180, y: 80 }, 'lk': { x: 220, y: 80 }, 'sk': { x: 424, y: 236 },
        'tr': { x: 493, y: 324 }, 'ml': { x: 487, y: 281 }, 'mn': { x: 536, y: 301 },
        'nl': { x: 548, y: 273 }, 'mz': { x: 516, y: 335 }, 'an': { x: 520, y: 602 },
        'ch': { x: 180, y: 161 }
    };
    return stateCenters[stateId?.toLowerCase() || 'in'] || { x: 306, y: 348 };
};

export async function getActiveDestinations(): Promise<Location[]> {
    const supabase = getSupabaseServer();
    if (!supabase) return [];

    const { data: destData, error } = await supabase
        .from('spiritual_places')
        .select('id, name, slug, type, description, images, state_id, x, y, size')
        .eq('is_active', true)
        .order('order_rank', { ascending: true })
        .order('name', { ascending: true });

    if (error || !destData) {
        console.error("Error fetching destinations:", error);
        return [];
    }

    return destData.map((dbDest: any) => {
        let name = dbDest.name;
        if (name === 'Chandigrah') name = 'Chandigarh';
        if (name === 'Varnasi') name = 'Varanasi';

        let x = dbDest.x;
        let y = dbDest.y;

        if (!x || !y) {
            const center = getStateCenter(dbDest.state_id);
            x = x || center.x;
            y = y || center.y;
        }

        const image = (dbDest.images && dbDest.images.length > 0)
            ? dbDest.images[0]
            : 'https://s1.mantrapuja.com/storage/v1/object/public/spritual%20places/sp.png';

        return {
            id: dbDest.id,
            name: name,
            slug: dbDest.slug,
            description: dbDest.description || '',
            image: image,
            type: (dbDest.type || 'All') as LocationType,
            stateId: dbDest.state_id || 'IN',
            x: x,
            y: y,
            size: dbDest.size === 15 ? 'large' :
                dbDest.size >= 12 ? 'medium' : 'small'
        };
    });
}

export async function getDestinationBySlug(slug: string): Promise<LocationDetail | null> {
    const supabase = getSupabaseServer();
    if (!supabase) return null;

    const { data: dbDest, error } = await supabase
        .from('spiritual_places')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !dbDest) {
        if (error?.code !== 'PGRST116') { // Do not log "Row not found" as a huge error
            console.error(`Error fetching destination ${slug}:`, JSON.stringify(error, null, 2));
        }
        return null;
    }

    const content = dbDest.content || {};

    let x = dbDest.x;
    let y = dbDest.y;
    if (!x || !y) {
        const center = getStateCenter(dbDest.state_id);
        x = x || center.x;
        y = y || center.y;
    }

    const image = (dbDest.images && dbDest.images.length > 0)
        ? dbDest.images[0]
        : 'https://s1.mantrapuja.com/storage/v1/object/public/spritual%20places/sp.png';

    return {
        id: dbDest.id,
        name: dbDest.name,
        slug: dbDest.slug,
        type: dbDest.type as LocationType,
        description: dbDest.description || '',
        image: image,
        stateId: dbDest.state_id || 'IN',
        x: x,
        y: y,
        size: dbDest.size === 15 ? 'large' : dbDest.size >= 12 ? 'medium' : 'small',
        ...content
    };
}
