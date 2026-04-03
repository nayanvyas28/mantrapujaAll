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

    // Map database structure to the interface expected by FestivalDetailClient
    const mappedFestival: any = {
        ...festivalData,
        id: festivalData.id,
        name: festivalData.name,
        slug: festivalData.slug,
        date: new Date(festivalData.date),
        shortDesc: festivalData.description,
        description: festivalData.description,
        heroImage: festivalData.images?.[0] || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220',
        significance: {
            mythology: festivalData.content?.significance || festivalData.description,
            cultural: festivalData.content?.rituals?.join(', ') || 'Authentic Vedic traditions and celebrations.',
            spiritual: festivalData.content?.spiritual || 'Seeking divine blessings and inner purification.'
        },
        rituals: festivalData.content?.rituals?.map((r: string) => ({
            name: r,
            description: "Traditional vedic ritual performed with devotion.",
            timing: "Auspicious Muhurat"
        })) || [],
        regionalVariations: festivalData.content?.regional_names || {},
        faqs: festivalData.content?.faqs || [],
        gallery: []
    };

    return (
        <div className="min-h-screen bg-transparent relative overflow-hidden">
            <StickyBookingButton festivalName={mappedFestival.name} />
            <FestivalDetailClient festival={mappedFestival} />
        </div>
    );
}

