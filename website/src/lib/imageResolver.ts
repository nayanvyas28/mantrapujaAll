/**
 * Centralized Image Resolution Utility for Puja Listing
 * Ensures deterministic, stable rendering of Puja cards.
 */

export interface ResolvedImage {
    url: string;
    type: 'supabase' | 'local' | 'fallback';
    isPlaceholder: boolean;
}

const VALID_LOCAL_IMAGES = [
    "hanumangarhisindoorpuja.png",
    "durgapuja.png",
    "ganeshpuja.png",
    "hanuman.png",
    "kaal sarp 1.png",
    "kaal sarp.png",
    "kalipuja.png",
    "krishnapuja.png",
    "lakshmipuja.png",
    "navgrahapuja.png",
    "rampuja.png",
    "rudra abhishek 1.png",
    "rudra abhishek 2.png",
    "rudraabhishek.png",
    "saraswatipuja.png",
    "shivpuja.png",
    "vishnupuja.png"
];

export function resolvePujaImage(rawPath: string | string[] | null | undefined): ResolvedImage {
    const DEFAULT_FALLBACK: ResolvedImage = { 
        url: '/diya.png', 
        type: 'fallback', 
        isPlaceholder: true 
    };

    if (!rawPath) return DEFAULT_FALLBACK;

    // Handle array or string
    let path = Array.isArray(rawPath) ? rawPath[0] : rawPath;
    if (typeof path !== 'string' || path.trim() === '') return DEFAULT_FALLBACK;

    path = path.trim();

    // 1. Check if it's a valid remote URL (Supabase/S3/etc.)
    // We strictly prioritize s1.mantrapuja.com (new storage)
    if (path.startsWith('http')) {
        // Blacklist legacy broken domains
        if (path.includes('mantrapuja.com/webroot')) return DEFAULT_FALLBACK;
        
        return {
            url: path.replace('http://', 'https://'),
            type: 'supabase',
            isPlaceholder: false
        };
    }

    // 2. Check if it's a local path
    // Normalize path for check
    const filename = path.split('/').pop()?.toLowerCase();
    
    // Check if the filename exists in our validated inventory
    if (filename && VALID_LOCAL_IMAGES.includes(filename)) {
        // Map any .webp request in DB to the actual .png we found in local audit
        const actualFilename = VALID_LOCAL_IMAGES.find(f => f === filename);
        return {
            url: `/pujaimages/${actualFilename}`,
            type: 'local',
            isPlaceholder: false
        };
    }

    // Special case for exact local path matches (e.g. from UI mapping)
    if (path === '/diya.png') return DEFAULT_FALLBACK;

    return DEFAULT_FALLBACK;
}
