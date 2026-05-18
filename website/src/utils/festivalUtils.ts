/**
 * Festival Image Resolver
 * Resolves canonical hero images for recurring festivals based on name patterns.
 */

const FESTIVAL_IMAGE_MAP: Record<string, string> = {
    'diwali': 'https://s1.mantrapuja.com/storage/v1/object/public/festivals/diwali-main.jpg',
    'navratri': 'https://s1.mantrapuja.com/storage/v1/object/public/festivals/navratri-main.jpg',
    'ekadashi': 'https://s1.mantrapuja.com/storage/v1/object/public/festivals/ekadashi-universal.jpg',
    'shivratri': 'https://s1.mantrapuja.com/storage/v1/object/public/festivals/maha-shivratri.jpg',
    'holi': 'https://s1.mantrapuja.com/storage/v1/object/public/festivals/holi-ritual.jpg',
    'ganesh': 'https://s1.mantrapuja.com/storage/v1/object/public/festivals/ganesh-chaturthi.jpg',
    'janmashtami': 'https://s1.mantrapuja.com/storage/v1/object/public/festivals/janmashtami.jpg'
};

export function resolveFestivalHeroImage(name: string, dbImage?: string): string {
    // 1. If DB has a custom image that isn't a fallback, use it
    if (dbImage && !dbImage.includes('undefined') && !dbImage.includes('logo.png')) {
        return dbImage;
    }

    // 2. Pattern match for recurring festivals
    const lowerName = name.toLowerCase();
    for (const [key, url] of Object.entries(FESTIVAL_IMAGE_MAP)) {
        if (lowerName.includes(key)) return url;
    }

    // 3. Global fallback
    return '/logo.png';
}

/**
 * Metadata Enrichment Layer
 * Generates SEO-optimized titles and descriptions for festivals.
 */
export function generateFestivalMetadata(festival: { name: string; date: Date; shortDesc?: string }) {
    const year = festival.date.getFullYear();
    const name = festival.name;

    // Optimized Title logic
    let title = `${name} ${year} | Date, Puja Muhurat & Spiritual Significance`;
    if (name.toLowerCase().includes('ekadashi')) {
        title = `${name} ${year} | Vrat Vidhi, Paran Time & Significance`;
    }

    // Optimized Description
    const description = festival.shortDesc || `Explore the divine significance, sacred rituals, and mythological history of ${name} in ${year}. Book authentic Vedic pujas performed by expert Pandits.`;

    return { title, description };
}
