import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { cache } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getPujaBySlug, PujaData } from '@/lib/pujaData';

// Pre-generate paths for the top 50 most important pujas.
export async function generateStaticParams() {
    try {
        const { data, error } = await supabase
            .from('poojas')
            .select('slug')
            .eq('is_active', true)
            .not('slug', 'is', null)
            .order('is_featured', { ascending: false })
            .order('is_special_offer', { ascending: false })
            .limit(20);

        if (error || !data) return [];

        return (data as any[])
            .filter((puja: any) => puja.slug && typeof puja.slug === 'string' && puja.slug.trim() !== '')
            .map((puja: any) => ({
                slug: puja.slug.trim(),
            }));
    } catch (e) {
        console.error('[generateStaticParams] Critical error for pujas:', e);
        return [];
    }
}

export const revalidate = 3600; // Revalidate every hour

// Helper function to get puja by slug from Supabase OR fallback to hardcoded data
// Wrapped in cache() to deduplicate calls between generateMetadata and the page body
const getPujaData = cache(async (rawSlug: string): Promise<PujaData | null> => {
    const slug = decodeURIComponent(rawSlug);
    console.log(`[getPujaData] Fetching for slug: "${slug}"`);
    try {
        const startTime = Date.now();
        // First: Try to get from Supabase - Selecting ONLY required fields to thin the payload
        const { data, error } = await supabase
            .from('poojas')
            .select('*')
            .eq('slug', slug)
            .eq('is_active', true)
            .single();

        const dbTime = Date.now() - startTime;
        console.log(`[getPujaData] DB Fetch for "${slug}" took ${dbTime}ms`);

        if (error) {
            console.error(`[getPujaData] Supabase error for "${slug}":`, error.message);
        }

        if (data && !error) {
            console.log(`[getPujaData] Found in Supabase: "${slug}"`);
            // Helper to transform string array steps to object array
            const transformSteps = (steps: any) => {
                if (!steps || !Array.isArray(steps)) return [];
                if (steps.length > 0 && typeof steps[0] === 'object') return steps;

                return steps.map((item: string, idx: number) => {
                    const parts = item.split(':');
                    return {
                        step: idx + 1,
                        title: parts[0]?.trim() || `Step ${idx + 1}`,
                        description: parts.slice(1).join(':').trim() || item
                    };
                });
            };

            const transformStart = Date.now();
            // SANITIZE IMAGE URLS - ROBUST FALLBACK SYSTEM
            let heroImage = '/diya.png';
            
            // 1. Try Supabase images array
            if (data.images && Array.isArray(data.images) && data.images.length > 0 && data.images[0] && data.images[0].trim() !== '') {
                heroImage = data.images[0].trim();
            } 
            // 2. Try legacy/dynamic field names defensively
            else {
                const legacyImage = (data as any).hero_image || (data as any).heroImage;
                if (legacyImage && typeof legacyImage === 'string' && legacyImage.trim() !== '') {
                    heroImage = legacyImage.trim();
                }
            }

            // Sanitize the resolved URL
            if (heroImage.startsWith('http://')) {
                heroImage = heroImage.replace('http://', 'https://');
            }
            heroImage = heroImage.replace('/puja images/', '/pujaimages/');
            if (heroImage.startsWith('/pujaimages/')) {
                heroImage = heroImage.replace(/\.(webp|jpg|jpeg)$/, '.png');
            }
            
            // Final safety
            if (!heroImage || heroImage === '') heroImage = '/diya.png';

            const pujaData: PujaData = {
                id: data.id,
                slug: data.slug,
                name: data.name,
                tagline: data.tagline || data.description || 'Experience divine blessings',
                heroImage: heroImage,
                themeColor: data.theme_color || 'saffron',
                heroBenefits: data.hero_benefits || data.benefits || [],
                hero: {
                    badgeText: data.hero_badge_text || 'Premium Vedic Ritual',
                    glassBadgeLabel: data.hero_glass_badge_label || 'Performed By',
                    glassBadgeValue: data.hero_glass_badge_value || 'Certified Vedic Archaryas'
                },
                about: {
                    title: data.main_about_title || data.about_title || `What is ${data.name}?`,
                    heading: data.about_heading || 'Ancient Wisdom',
                    subheading: data.about_subheading || 'For Modern Life',
                    description: data.about_description || data.description || '',
                    significance: data.about_significance_text || data.significance || '',
                    significanceTitle: data.about_significance_label || data.significance_title || 'Spiritual Significance',
                    whoShouldPerform: data.about_target_audience_text || data.who_should_perform || 'Anyone seeking divine blessings',
                    whoShouldPerformTitle: data.about_target_audience_label || data.who_should_perform_title || 'Who Should Perform?'
                },
                whyPerform: {
                    title: data.why_perform_section_title || data.why_perform_title || 'Why Perform this Puja?',
                    reasons: data.why_perform_cards || data.why_perform || []
                },
                process: {
                    title: data.ritual_process_section_title || data.process_title || 'Our Authentic Ritual Process',
                    subtitle: data.ritual_process_subtitle || 'Vedic Vidhi',
                    steps: transformSteps(data.ritual_steps || data.process_steps),
                    features: data.ritual_badges || data.process_features || []
                },
                howItWorks: {
                    steps: (data.how_it_works && data.how_it_works.length > 0) ? data.how_it_works : [
                        { icon: '📅', title: 'Book Online', description: 'Select your preferred date and provide details.' },
                        { icon: '🙏', title: 'Puja Performance', description: 'Our Pandits perform the ritual with strict Vedic vidhi.' },
                        { icon: '📦', title: 'Receive Blessings', description: 'Get the video recording and sacred Prasad delivered.' }
                    ]
                },
                benefits: {
                    title: data.blessings_section_title || data.benefits_title || 'Divine Benefits',
                    cards: data.blessings_cards || data.benefits_cards || []
                },
                timing: {
                    subtitle: data.timing_subtitle || 'Muhurat',
                    title: data.timing_section_title || data.timing_title || 'Best Time to Perform',
                    occasions: data.timing_occasions_list || data.timing_occasions || [],
                    muhuratTitle: data.timing_muhurat_title || data.timing_subtitle || 'Shubh Muhurat',
                    muhurat: data.timing_muhurat_text || data.timing_muhurat || 'As per Panchang'
                },
                footer: {
                    title: data.footer_title || 'Ready to Invite Divine Blessings?',
                    description: data.footer_description || 'Don\'t wait for the "perfect time". The moment you decide to connect with the divine is the perfect muhurat.'
                },
                testimonials: {
                    title: data.testimonials_section_title || data.testimonials_title || 'Devotee Experiences',
                    reviews: data.testimonials_list || data.testimonials || []
                },
                faq: {
                    title: 'Frequently Asked Questions',
                    items: data.faq_list || data.faq || []
                },
                seoTitle: data.seo_title,
                seoDescription: data.seo_description,
                packages: data.packages || []
            };
            const transformTime = Date.now() - transformStart;
            console.log(`[getPujaData] Transform for "${slug}" took ${transformTime}ms`);
            return pujaData;
        }
    } catch (error) {
        console.error(`[getPujaData] Catch block for "${slug}":`, error);
    }

    console.log(`[getPujaData] Not found in Supabase, checking fallback for: "${slug}"`);
    // Fallback: Check hardcoded data
    const hardcodedPuja = getPujaBySlug(slug);
    if (hardcodedPuja) {
        console.log(`[getPujaData] Found in Fallback: "${slug}"`);
    } else {
        console.log(`[getPujaData] NOT FOUND ANYWHERE: "${slug}"`);
    }
    return hardcodedPuja || null;
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    const puja = await getPujaData(slug);

    if (!puja) {
        return {
            title: 'Puja Not Found - MantraPuja',
            description: 'The requested puja service could not be found.',
        };
    }

    // Extract keywords from benefits and name
    const keywords = [
        puja.name,
        'vedic puja',
        'hindu rituals',
        'online puja booking',
        'pandit services',
        'authentic vedic ceremonies',
        ...puja.heroBenefits.slice(0, 3),
        ...(puja.benefits.cards.slice(0, 3).map(b => b.title))
    ].join(', ');

    const canonicalUrl = `https://mantrapuja.com/pooja-services/${slug}`;
    const siteName = 'MantraPuja';

    // Prioritize database SEO title and description
    const fullTitle = puja.seoTitle || `${puja.name} | Book Online - ${siteName}`;
    const fullDescription = puja.seoDescription || puja.about.description || puja.tagline;

    return {
        title: fullTitle,
        description: fullDescription,
        keywords: keywords,

        // Open Graph (for Facebook, LinkedIn, etc.)
        openGraph: {
            type: 'website',
            url: canonicalUrl,
            title: `${puja.name} | Authentic Vedic Rituals`,
            description: fullDescription,
            siteName: siteName,
            images: [
                {
                    url: puja.heroImage,
                    width: 1200,
                    height: 630,
                    alt: `${puja.name} - Vedic Puja Service`,
                }
            ],
            locale: 'en_IN',
        },

        // Twitter Card
        twitter: {
            card: 'summary_large_image',
            title: `${puja.name} | Authentic Vedic Rituals`,
            description: fullDescription,
            images: [puja.heroImage],
            creator: '@mantrapuja',
            site: '@mantrapuja',
        },

        // Canonical URL
        alternates: {
            canonical: canonicalUrl,
        },

        // Robots
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        // Additional metadata
        category: 'Religion & Spirituality',
        authors: [{ name: siteName }],
    };
}

import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { WhyPerformSection } from './sections/WhyPerformSection';
import { ProcessSection } from './sections/ProcessSection';
import { BenefitsSection } from './sections/BenefitsSection';
import { TimingSection } from './sections/TimingSection';
import { FAQSection } from './sections/FAQSection';
import { ReviewSection } from './sections/ReviewSection';
import { FinalCTASection } from './sections/FinalCTASection';
import { BookingProvider } from './sections/BookingProvider';
import { StickyBookingButton } from './sections/StickyBookingButton';
import { UnifiedPujaBackground } from '@/components/UnifiedPujaBackground';
import SpiritualFamilySection from '@/components/home/SpiritualFamilySection';

import { Suspense } from 'react';

export default async function PoojaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    const puja = await getPujaData(slug);

    if (!puja) {
        console.error(`[PoojaDetailPage] No puja data for slug: "${slug}", triggering notFound()`);
        notFound();
    }

    // Generate multiple JSON-LD schemas for rich snippets
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: puja.name,
            description: puja.about.description || puja.tagline,
            provider: {
                '@type': 'Organization',
                name: 'MantraPuja',
                url: 'https://mantrapuja.com',
            },
            serviceType: 'Vedic Puja Service',
            areaServed: 'IN',
            image: puja.heroImage,
            aggregateRating: (puja.testimonials.reviews && puja.testimonials.reviews.length > 0) ? {
                '@type': 'AggregateRating',
                ratingValue: (() => {
                    const reviewsWithRating = puja.testimonials.reviews.filter((t: any) => t && typeof t.rating === 'number');
                    if (reviewsWithRating.length === 0) return "5.0";
                    return (reviewsWithRating.reduce((sum: number, t: any) => sum + t.rating, 0) / reviewsWithRating.length).toFixed(1);
                })(),
                reviewCount: puja.testimonials.reviews.length,
            } : undefined,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: puja.faq.items.map((item: any) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                },
            })),
        },
        {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: `How to perform ${puja.name}`,
            step: puja.process.steps.map((step: any, idx: number) => ({
                '@type': 'HowToStep',
                position: idx + 1,
                name: step.title,
                itemListElement: [{
                    '@type': 'HowToDirection',
                    text: step.description
                }]
            })),
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://mantrapuja.com',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Puja Services',
                    item: 'https://mantrapuja.com/pooja-services',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: puja.name,
                    item: `https://mantrapuja.com/pooja-services/${slug}`,
                },
            ],
        },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-300 font-sans">
            {/* JSON-LD Structured Data - Visible in SSR View Source */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <article>
                {/* Background Layer - Client Component (Optimized in next step) */}
                <UnifiedPujaBackground />

                {/* Primary Interaction Shell (Hero + Booking Flow) */}
                <BookingProvider puja={puja}>
                    <HeroSection puja={{ ...puja, packages: puja.packages || [] }} />
                    
                    <AboutSection about={puja.about} />
                    
                    <WhyPerformSection whyPerform={puja.whyPerform} />
                    
                    <ProcessSection process={puja.process} />
                    
                    <BenefitsSection benefits={puja.benefits} />

                    <TimingSection timing={puja.timing} />

                    {/* Secondary Sections - Wrapped in Suspense for Progressive Streaming */}
                    <Suspense fallback={<div className="h-40 animate-pulse bg-orange-500/5 rounded-3xl m-8" />}>
                        <ReviewSection 
                            pujaSlug={puja.slug} 
                            initialTestimonials={puja.testimonials.reviews || []} 
                            title={puja.testimonials.title}
                        />
                    </Suspense>

                    <Suspense fallback={null}>
                        <FAQSection faq={puja.faq} />
                    </Suspense>

                    <FinalCTASection puja={{ ...puja, packages: puja.packages || [] }} />
                    
                    {/* Mobile Client Island: Sticky CTA */}
                    <StickyBookingButton />
                </BookingProvider>
                
                <SpiritualFamilySection />
            </article>
        </main>
    );
}
