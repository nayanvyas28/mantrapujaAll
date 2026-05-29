import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFestivalBySlug } from '@/lib/festivalData';
import { Suspense } from 'react';
import Script from 'next/script';
import { resolveFestivalHeroImage, generateFestivalMetadata } from '@/utils/festivalUtils';

// Sections
import { FestivalHero } from './sections/FestivalHero';
import { FestivalSignificance } from './sections/FestivalSignificance';
import { FestivalRituals } from './sections/FestivalRituals';
import { FestivalFAQs } from './sections/FestivalFAQs';
import { RelatedPujas } from './sections/RelatedPujas';
import { RelatedBlogs } from './sections/RelatedBlogs';

// Components
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import { StickyBookingButton } from '@/components/festivals/StickyBookingButton';
import SpiritualFamilySection from "@/components/home/SpiritualFamilySection";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const festival = await getFestivalBySlug(slug);

    if (!festival) return { title: 'Festival Not Found' };

    const { title, description } = generateFestivalMetadata(festival);
    const heroImage = resolveFestivalHeroImage(festival.name, festival.heroImage);

    return {
        title: `${title} | MantraPuja`,
        description: description,
        openGraph: {
            title: `${festival.name} | Sacred Vedic Traditions`,
            description: festival.shortDesc,
            images: [heroImage],
            type: 'article',
        },
        alternates: {
            canonical: `https://mantrapuja.com/festivals/${festival.slug}`,
        },
        robots: {
            index: true,
            follow: true,
        }
    };
}

export default async function FestivalDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const festival = await getFestivalBySlug(slug);

    if (!festival) {
        notFound();
    }

    const heroImage = resolveFestivalHeroImage(festival.name, festival.heroImage);

    // --- PHASES 3: SEMANTIC & SCHEMA OVERHAUL (AI-SEARCH OPTIMIZATION) ---
    const baseUrl = 'https://mantrapuja.com';
    const festivalUrl = `${baseUrl}/festivals/${festival.slug}`;
    
    const schemas = [
        // 1. Event/Festival Schema
        {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": festival.name,
            "alternateName": festival.name,
            "description": festival.description || festival.shortDesc,
            "startDate": festival.date.toISOString().split('T')[0],
            "image": [heroImage, "/logo.png"],
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "location": {
                "@type": "VirtualLocation",
                "url": festivalUrl
            },
            "organizer": {
                "@type": "Organization",
                "name": "MantraPuja",
                "url": baseUrl,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/logo.png`
                }
            },
            "about": {
                "@type": "Thing",
                "name": "Hindu Festival",
                "description": "Vedic spiritual tradition and ritual celebration"
            }
        },
        // 2. Breadcrumb Schema
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": baseUrl
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Festivals",
                    "item": `${baseUrl}/festivals`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": festival.name,
                    "item": festivalUrl
                }
            ]
        }
    ];

    // 3. FAQ Schema (if available)
    if (festival.faqs && festival.faqs.length > 0) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": festival.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            })) as any
        } as any);
    }

    return (
        <main className="min-h-screen bg-transparent relative overflow-hidden font-sans">
            <Script
                id="festival-rich-results"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            
            <UnifiedPujaBackground />
            
            {/* 1. Hero Section - Immediate SSR */}
            <FestivalHero festival={festival} />

            {/* 2. Significance - Immediate SSR */}
            <FestivalSignificance festival={festival} />

            {/* 3. Rituals - Immediate SSR */}
            <FestivalRituals festival={festival} />

            {/* 4. Related Pujas - Streamed via Suspense */}
            <Suspense fallback={<div className="py-24 text-center opacity-50 font-serif italic">Invoking sacred ritual recommendations...</div>}>
                <RelatedPujas festivalName={festival.name} />
            </Suspense>

            {/* 5. FAQs - Immediate SSR */}
            <FestivalFAQs festival={festival} />

            {/* 6. Related Blogs - Streamed via Suspense */}
            <Suspense fallback={<div className="py-24 text-center opacity-50 font-serif italic">Gathering sacred insights...</div>}>
                <RelatedBlogs festivalName={festival.name} />
            </Suspense>

            {/* 7. Community Section */}
            <SpiritualFamilySection />

            {/* Interactive Islands */}
            <StickyBookingButton festivalName={festival.name} />
        </main>
    );
}
