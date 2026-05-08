import React from 'react';
export const revalidate = 0; // Disable caching for dynamic data
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getSupabaseServer } from '@/lib/supabaseServer';
import PoojaDetailClient from './PoojaDetailClient';
import { getPujaBySlug, PujaData } from '@/lib/pujaData';

interface PageProps {
    params: {
        slug: string;
    };
}

// Helper function to get puja by slug from Supabase OR fallback to hardcoded data
async function getPujaData(rawSlug: string): Promise<PujaData | null> {
    const slug = decodeURIComponent(rawSlug);
    const supabase = getSupabaseServer();
    if (!supabase) return getPujaBySlug(slug) || null;

    try {
        // First: Try to get from Supabase
        const { data, error } = await supabase
            .from('poojas')
            .select('*')
            .eq('slug', slug)
            .eq('is_active', true)
            .single();

        if (data && !error) {
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

            // Convert Supabase data format to PujaData format
            const pujaData: PujaData = {
                id: data.id,
                slug: data.slug,
                name: data.name,
                tagline: data.tagline || data.description || 'Experience divine blessings',
                heroImage: (data.images && data.images.length > 0) ? data.images[0] : '/diya.png',
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
            return pujaData;
        }
    } catch (error) {
        console.error('Error fetching from Supabase:', error);
    }

    // Fallback: Check hardcoded data
    const hardcodedPuja = getPujaBySlug(slug);
    return hardcodedPuja || null;
}

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

export default async function PoojaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: rawSlug } = await params;
    const slug = decodeURIComponent(rawSlug);
    const puja = await getPujaData(slug);

    if (!puja) {
        notFound();
    }

    // Generate JSON-LD structured data for rich snippets
    const jsonLd = {
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
        availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: `https://mantrapuja.com/pooja-services/${slug}`,
        },
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            url: `https://mantrapuja.com/pooja-services/${slug}`,
        },
        image: puja.heroImage,
        aggregateRating: puja.testimonials.reviews && puja.testimonials.reviews.length > 0 ? {
            '@type': 'AggregateRating',
            ratingValue: (puja.testimonials.reviews.reduce((sum: number, t: any) => sum + t.rating, 0) / puja.testimonials.reviews.length).toFixed(1),
            reviewCount: puja.testimonials.reviews.length,
        } : undefined,
        review: puja.testimonials.reviews && puja.testimonials.reviews.length > 0 ? puja.testimonials.reviews.slice(0, 3).map((testimonial: any) => ({
            '@type': 'Review',
            author: {
                '@type': 'Person',
                name: testimonial.name,
            },
            reviewRating: {
                '@type': 'Rating',
                ratingValue: testimonial.rating,
            },
            reviewBody: testimonial.comment,
        })) : undefined,
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PoojaDetailClient puja={puja} />
        </>
    );
}
