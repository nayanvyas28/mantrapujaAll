import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getActiveDestinations, getDestinationBySlug } from '@/lib/queries/destinations';
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import { 
    Sun, 
    Waves, 
    Mountain, 
    BookText, 
    Compass, 
    History, 
    Star, 
    Info 
} from 'lucide-react';
import Script from 'next/script';

// Import Sections
import { LocationHero } from './sections/LocationHero';
import { LocationRituals } from './sections/LocationRituals';
import { LocationSites } from './sections/LocationSites';
import { LocationNarrative } from './sections/LocationNarrative';
import { LocationArchitecture } from './sections/LocationArchitecture';
import { LocationWisdom } from './sections/LocationWisdom';
import { LocationLore } from './sections/LocationLore';
import { LocationFAQs } from './sections/LocationFAQs';
import LocationToC from './sections/LocationToC';

interface PageProps {
    params: { slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
    try {
        const locations = await getActiveDestinations();
        return locations.map((loc) => ({
            slug: loc.slug,
        }));
    } catch (e) {
        return [];
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = await getDestinationBySlug(slug);
    if (!data) return {};

    const title = `${data.name} | Spiritual Significance, Rituals & Lore`;
    const description = data.description || `Explore the sacred history, divine architecture, and key rituals of ${data.name}. Discover its Vedic significance and must-visit sites.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [data.image || '/logo.png'],
            type: 'website',
        },
        alternates: {
            canonical: `https://mantrapuja.com/locations/${slug}`,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [data.image || '/logo.png'],
        },
    };
}

export default async function DestinationDetailPage({ params }: PageProps) {
    const { slug } = await params;
    
    // 🔀 Backward Compatibility / Alias Mapping
    const aliasMap: Record<string, string> = {
        'kashi-vishwanath': 'varanasi',
        'trimbakeshwar': 'nashik',
        'haridwar-kumbh-mela': 'haridwar',
        'mahakaleshwar': 'ujjain',
        'nashik-shakti': 'nashik',
        'puri-shakti': 'puri',
        'varanasi-shakti': 'varanasi'
    };

    if (aliasMap[slug]) {
        const { permanentRedirect } = await import('next/navigation');
        permanentRedirect(`/locations/${aliasMap[slug]}`);
    }

    const fullDetails = await getDestinationBySlug(slug);

    if (!fullDetails) {
        notFound();
    }

    const sections = [
        { id: 'essence', label: 'Spiritual Essence', iconName: 'sun', color: 'text-saffron' },
    ];
    if (fullDetails.keyRituals?.length) sections.push({ id: 'rituals', label: 'Sacred Rituals', iconName: 'waves', color: 'text-orange-500' });
    if (fullDetails.highlights?.length) sections.push({ id: 'sites', label: 'Must-Visit Sites', iconName: 'mountain', color: 'text-amber-500' });
    if (fullDetails.longDescription || fullDetails.history) sections.push({ id: 'narrative', label: 'Divine Narrative', iconName: 'bookText', color: 'text-indigo-500' });
    if (fullDetails.spiritualArchitecture) sections.push({ id: 'architecture', label: 'Architecture', iconName: 'compass', color: 'text-emerald-500' });
    if (fullDetails.vedicReferences) sections.push({ id: 'vedic', label: 'Vedic Wisdom', iconName: 'history', color: 'text-purple-500' });
    if (fullDetails.localLegends) sections.push({ id: 'legends', label: 'Lore & Legends', iconName: 'star', color: 'text-rose-500' });
    if (fullDetails.faqs?.length) sections.push({ id: 'faqs', label: 'Insights', iconName: 'info', color: 'text-blue-500' });

    const schema = {
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        "name": fullDetails.name,
        "description": fullDetails.description,
        "image": fullDetails.image,
        "url": `https://mantrapuja.com/locations/${fullDetails.slug}`,
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": fullDetails.y, // Assuming y is lat-like
            "longitude": fullDetails.x // Assuming x is lng-like
        },
        "touristType": ["Spiritual", "Religious"],
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mantrapuja.com" },
                { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://mantrapuja.com/locations" },
                { "@type": "ListItem", "position": 3, "name": fullDetails.name, "item": `https://mantrapuja.com/locations/${fullDetails.slug}` }
            ]
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300 relative pb-20">
            <Script
                id="location-detail-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <UnifiedPujaBackground />

            <LocationHero 
                name={fullDetails.name}
                description={fullDetails.description}
                image={fullDetails.image}
                type={fullDetails.type}
                stateId={fullDetails.stateId}
            />

            <div className="container mx-auto px-4 mt-16 md:mt-24 relative z-30">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Sidebar - ToC */}
                    <aside className="w-full lg:w-80">
                        <LocationToC sections={sections} />
                    </aside>

                    {/* Right Content - Sections */}
                    <article className="flex-1 space-y-32">
                        {/* Spiritual Essence Section (Inline for simplicity) */}
                        <section id="essence" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 rounded-[24px] bg-saffron/10 border border-saffron/20 shadow-inner">
                                    <Sun className="w-8 h-8 text-saffron" />
                                </div>
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Spiritual Essence</h2>
                                    <div className="w-24 h-1.5 bg-gradient-to-r from-saffron to-transparent rounded-full mt-2"></div>
                                </div>
                            </div>
                            <div className="text-xl md:text-2xl text-muted-foreground leading-relaxed italic font-serif border-l-4 border-saffron/30 pl-8">
                                "{fullDetails.spiritualEssence || fullDetails.significance || 'A center of profound spiritual energy, connecting the seeker to the divine through ancient traditions and sacred geography.'}"
                            </div>
                        </section>

                        {fullDetails.keyRituals && <LocationRituals rituals={fullDetails.keyRituals} locationName={fullDetails.name} />}
                        
                        {fullDetails.highlights && <LocationSites sites={fullDetails.highlights} />}

                        <LocationNarrative narrative={(fullDetails.longDescription || fullDetails.history) as string} />

                        {fullDetails.spiritualArchitecture && <LocationArchitecture architecture={fullDetails.spiritualArchitecture} />}

                        {fullDetails.vedicReferences && <LocationWisdom wisdom={fullDetails.vedicReferences} locationName={fullDetails.name} />}

                        {fullDetails.localLegends && <LocationLore lore={fullDetails.localLegends} />}

                        {fullDetails.faqs && <LocationFAQs faqs={fullDetails.faqs} />}
                    </article>
                </div>
            </div>
        </main>
    );
}
