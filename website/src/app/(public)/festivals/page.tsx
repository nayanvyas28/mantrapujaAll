import { Metadata } from 'next';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { getUpcomingFestivals, Festival } from '@/lib/festivalData';
import EnhancedBackground from '@/components/EnhancedBackground';
import FestivalListingClient from './FestivalListingClient';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import Script from 'next/script';
import { resolveFestivalHeroImage } from '@/utils/festivalUtils';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
    title: 'Hindu Festival Calendar 2024-2025 | Auspicious Tithis & Rituals',
    description: 'Explore the complete Hindu festival calendar. Find dates, Vedic significance, and sacred rituals for Ekadashi, Purnima, Sankranti, and major festivals.',
    openGraph: {
        title: 'Hindu Festival Calendar | Auspicious Tithis & Rituals',
        description: 'Discover the divine significance and sacred rituals of upcoming Hindu festivals.',
        images: ['/logo.png'],
    },
    alternates: {
        canonical: 'https://mantrapuja.com/festivals',
    },
};

async function getFestivalPageData() {
    try {
        const supabase = getSupabaseServer();
        if (!supabase) return { festivals: [], blogs: [] };

        // Fetch festivals and blogs in parallel
        const [festivals, blogResult] = await Promise.all([
            getUpcomingFestivals(12),
            supabase
                .from('Final_blog')
                .select('id, title, slug, image_url, category, excerpt, tags, created_at')
                .eq('published', true)
                .order('created_at', { ascending: false })
                .limit(3)
        ]);

        return { 
            festivals, 
            blogs: blogResult.data || [] 
        };
    } catch (error) {
        console.error("Failed to fetch festival page data:", error);
        return { festivals: [], blogs: [] };
    }
}

export default async function FestivalPage() {
    const { festivals, blogs } = await getFestivalPageData();

    // --- PHASES 3: SEMANTIC & SCHEMA OVERHAUL (AI-SEARCH OPTIMIZATION) ---
    const baseUrl = 'https://mantrapuja.com';
    
    const schemas = [
        // 1. Collection Page & Event List
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Hindu Festival Calendar 2024-2025",
            "description": "A comprehensive guide to upcoming Hindu festivals, their auspicious timings, and sacred rituals.",
            "url": `${baseUrl}/festivals`,
            "publisher": {
                "@type": "Organization",
                "name": "MantraPuja",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/logo.png`
                }
            },
            "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": festivals.length,
                "itemListElement": festivals.map((fest, idx) => {
                    const heroImage = resolveFestivalHeroImage(fest.name, (fest as any).heroImage);
                    return {
                        "@type": "ListItem",
                        "position": idx + 1,
                        "item": {
                            "@type": "Event",
                            "name": fest.name,
                            "startDate": fest.date.toISOString().split('T')[0],
                            "description": fest.shortDesc,
                            "url": `${baseUrl}/festivals/${fest.slug}`,
                            "image": [heroImage, `${baseUrl}/logo.png`],
                            "eventStatus": "https://schema.org/EventScheduled",
                            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
                            "location": {
                                "@type": "VirtualLocation",
                                "url": `${baseUrl}/festivals/${fest.slug}`
                            }
                        }
                    };
                })
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
                }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-background relative overflow-x-hidden">
            <Script
                id="festivals-listing-rich-results"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
            />
            
            <EnhancedBackground />

            {/* Hero Section - Rendered on Server */}
            <header className="relative pt-24 pb-12 px-4 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-saffron/20 backdrop-blur-sm">
                        Sacred Time & Traditions
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 text-foreground font-serif leading-tight">
                        Hindu Festival <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 py-2">Calendar</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Navigate the auspicious cycles of the cosmic calendar. Discover the Vedic wisdom, rituals, and significance behind every sacred occasion.
                    </p>
                </div>
            </header>

            {/* Interactive Calendar Section - Hybrid */}
            <section className="relative z-20 px-4 pb-20">
                <FestivalListingClient initialFestivals={festivals} />
            </section>

            {/* Blogs Section - Fully Server Rendered */}
            <section className="max-w-7xl mx-auto px-4 py-24 relative z-10 border-t border-border/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <h2 className="text-4xl md:text-5xl font-black font-serif">Spiritual <span className="text-saffron">Wisdom</span></h2>
                    <Link href="/blog" className="text-saffron font-bold hover:underline flex items-center gap-2 text-lg group">
                        Explore Knowledge <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog: any, idx: number) => {
                        const gradient = ["from-orange-500 to-red-600", "from-blue-500 to-indigo-600", "from-green-500 to-emerald-600"][idx % 3];
                        return (
                            <Link
                                key={blog.id || idx}
                                href={`/blogs/${blog.slug}`}
                                className="group relative bg-card rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-saffron/50 flex flex-col h-full"
                            >
                                <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-saffron/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                            🕉️
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron text-[10px] font-black uppercase tracking-wider">
                                            {blog.category || "Wisdom"}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-foreground mb-3 leading-tight group-hover:text-saffron transition-colors duration-300 font-serif line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-2 flex-grow text-sm">
                                        {blog.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-saffron" /> 5 MIN READ
                                        </span>
                                        <span className="text-saffron font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Read <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </section>
        </main>
    );
}
