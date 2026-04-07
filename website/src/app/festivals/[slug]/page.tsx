import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { UnifiedPujaBackground } from '@/components/UnifiedPujaBackground';
import { StickyBookingButton } from '@/components/festivals/StickyBookingButton';
import FestivalDetailClient from './FestivalDetailClient';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function FestivalDetailPage({ params }: PageProps) {
    const { slug } = await params;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: festivalData, error } = await supabase
        .from('festivals')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!festivalData || error) {
        notFound();
    }

    // --- INTELLIGENT FALLBACKS ---
    // Standard Vedic Rituals if the DB is empty
    const defaultRituals = [
        { name: "Mantra Japa", description: "Sacred chanting of specialized mantras to align with the cosmic energy of this day.", timing: "Brahma Muhurat" },
        { name: "Daan (Charity)", description: "Offering food, clothes, or support to the needy as a gesture of selflessness.", timing: "During the day" },
        { name: "Sattvic Aahar", description: "Consuming pure, light, and vegetarian food to maintain spiritual clarity.", timing: "Whole day" }
    ];

    // Standard Festival FAQs if the DB is empty
    const defaultFaqs = [
        { 
            question: "What is the primary spiritual goal of this festival?", 
            answer: "The goal is to cleanse the mind, seek divine blessings, and align one's inner consciousness with the cyclic patterns of the universe." 
        },
        { 
            question: "How can I participate if I am far from a temple?", 
            answer: "Physical presence is secondary to internal devotion. You can light a lamp (Diya), meditate on the deity, and perform simple puja at your home altar." 
        },
        { 
            question: "Are there specific dietary guidelines for this day?", 
            answer: "Most Vedic festivals recommend a Sattvic diet—avoiding onion, garlic, and non-vegetarian food to keep the body light for meditation." 
        }
    ];

    // Map database structure to the interface expected by FestivalDetailClient
    const mappedFestival: any = {
        ...festivalData,
        id: festivalData.id,
        name: festivalData.name,
        slug: festivalData.slug,
        date: new Date(festivalData.date),
        shortDesc: festivalData.description || "A sacred day of Vedic significance.",
        heroImage: festivalData.images?.[0] || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220',
        significance: {
            mythology: festivalData.content?.significance || festivalData.description || "Ancient scriptures highlight this as a day of divine victory and spiritual awakening.",
            cultural: festivalData.content?.cultural || "Observed with traditional prayers, regional gatherings, and sacred observances.",
            spiritual: festivalData.content?.spiritual || festivalData.description || "Focusing on 'Antaryatra' (inner journey) to attain higher consciousness."
        },
        rituals: (festivalData.content?.rituals && festivalData.content.rituals.length > 0) 
            ? festivalData.content.rituals.map((r: any) => ({
                name: typeof r === 'string' ? r : (r.name || "Sacred Ritual"),
                description: r.description || "Traditional Vedic ritual performed with deep devotion.",
                timing: r.timing || "Auspicious Muhurat"
            })) 
            : defaultRituals,
        regionalVariations: festivalData.content?.regional_names || null, // Set to null to trigger hiding if empty
        faqs: (festivalData.content?.faqs && festivalData.content.faqs.length > 0)
            ? festivalData.content.faqs
            : defaultFaqs,
        gallery: []
    };

    return (
        <div className="min-h-screen bg-transparent relative overflow-hidden">
            <StickyBookingButton festivalName={mappedFestival.name} />
            <FestivalDetailClient festival={mappedFestival} />
        </div>
    );
}

