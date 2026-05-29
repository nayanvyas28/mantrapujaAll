import { Metadata } from 'next';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { getActiveDestinations, Location } from '@/lib/queries/destinations';
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import LocationListingClient from './LocationListingClient';
import SpiritualFamilySection from "@/components/home/SpiritualFamilySection";
import Script from 'next/script';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
    title: 'Sacred Map of Bharat | 12 Jyotirlingas, Char Dham & Shakti Peeths',
    description: 'Explore the divine geography of India. Discover the locations of 12 Jyotirlingas, Char Dham, 51 Shakti Peeths, and sacred Kumbh Mela sites on our interactive spiritual map.',
    openGraph: {
        title: 'Sacred Map of Bharat | Explore India\'s Spiritual Geography',
        description: 'Discover the 12 Jyotirlingas, Char Dham, and 51 Shakti Peeths on our interactive spiritual map.',
        images: ['/logo.png'], // Replace with a map hero image if available
    },
    alternates: {
        canonical: 'https://mantrapuja.com/locations',
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sacred Map of Bharat | 12 Jyotirlingas, Char Dham & Shakti Peeths',
        description: 'Explore the divine geography of India. Discover the locations of 12 Jyotirlingas, Char Dham, and 51 Shakti Peeths.',
        images: ['/logo.png'],
    },
};

async function getLocationsPageData() {
    try {
        const supabase = getSupabaseServer();
        if (!supabase) return { locations: [], blogs: [] };

        const [locations, blogResult] = await Promise.all([
            getActiveDestinations(),
            supabase
                .from('Final_blog')
                .select('id, title, slug, image_url, category, excerpt, tags, created_at')
                .eq('published', true)
                .eq('is_active', true)
                .order('created_at', { ascending: false })
                .limit(3)
        ]);

        return { 
            locations, 
            blogs: blogResult.data || [] 
        };
    } catch (error) {
        console.error("Failed to fetch locations page data:", error);
        return { locations: [], blogs: [] };
    }
}

export default async function LocationsPage() {
    const { locations, blogs } = await getLocationsPageData();

    // JSON-LD Schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Sacred Locations of India",
        "description": "A collection of India's most sacred spiritual sites including Jyotirlingas, Char Dhams, and Shakti Peeths.",
        "url": "https://mantrapuja.com/locations",
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://mantrapuja.com"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Locations",
                    "item": "https://mantrapuja.com/locations"
                }
            ]
        },
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": locations.slice(0, 10).map((loc, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "item": {
                    "@type": "Place",
                    "name": loc.name,
                    "description": loc.description,
                    "image": loc.image,
                    "url": `https://mantrapuja.com/locations/${loc.slug}`
                }
            }))
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden">
            <Script
                id="locations-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            
            <UnifiedPujaBackground />
            
            <div className="pt-24 pb-12 relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl font-black mb-4 font-serif">
                    Sacred <span className="text-saffron">Geography</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto px-4">
                    Journey through the divine map of Bharatvarsha, from the peaks of the Himalayas to the southern shores.
                </p>
            </div>

            <LocationListingClient 
                initialLocations={locations} 
                blogs={blogs} 
            />

            <SpiritualFamilySection />
        </main>
    );
}
