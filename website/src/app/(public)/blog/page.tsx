import type { Metadata } from 'next';
import { getPaginatedBlogs } from '@/lib/contentService';
import BlogCard from '@/components/blog/BlogCard';
import BlogPagination from '@/components/blog/BlogPagination';
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import BlogHero from '@/components/blog/BlogHero';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { BlogCategory } from '@/data/blog-data';
import SpiritualFamilySection from '@/components/home/SpiritualFamilySection';

export const metadata: Metadata = {
    title: 'Spiritual Knowledge & Divine Insights | MantraPuja Blog',
    description: 'Explore our collection of articles on Vedic rituals, astrology, and spiritual growth. Discover ancient wisdom for modern life.',
    keywords: ['Vedic Blog', 'Astrology', 'Mantra Science', 'Spiritual Guidance', 'Hindu Rituals', 'Puja Guide'],
    alternates: {
        canonical: 'https://mantrapuja.com/blog',
    },
    openGraph: {
        title: 'MantraPuja Blog - Spiritual Knowledge & Divine Insights',
        description: 'Explore our collection of articles on Vedic rituals, astrology, and spiritual growth.',
        url: 'https://mantrapuja.com/blog',
        siteName: 'MantraPuja',
        type: 'website',
    }
};

export const revalidate = 60; // Cache for 1 minute

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const category = String(params.category || 'All');
    const search = String(params.search || '');
    const sort = String(params.sort || 'newest');
    const limit = 9;

    const { blogs, total, error } = await getPaginatedBlogs(currentPage, limit, category, search, sort);
    
    // Structured Data (JSON-LD)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "MantraPuja Blog - Spiritual Knowledge & Divine Insights",
        "description": "Explore our collection of articles on Vedic rituals, astrology, and spiritual growth.",
        "url": `https://mantrapuja.com/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": total,
            "itemListElement": blogs.map((blog, index) => ({
                "@type": "ListItem",
                "position": (currentPage - 1) * limit + index + 1,
                "url": `https://mantrapuja.com/blog/${blog.slug}`,
                "name": blog.blog_title || blog.title
            }))
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <UnifiedPujaBackground />
            
            {/* 🚀 ELITE SSR: Hero is rendered on server, interactive bits hydrate as islands */}
            <BlogHero />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                    {/* Sidebar Island */}
                    <BlogSidebar activeCategory={category as BlogCategory} />

                    {/* Main Content Area - DIRECT SEMANTIC HTML IN VIEW SOURCE */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                            <h2 className="text-xl font-bold font-serif">
                                {search ? `Search results for "${search}"` : category !== 'All' ? category : 'Recent Teachings'}
                                {!error && <span className="ml-3 text-xs font-medium text-muted-foreground">({total} Articles)</span>}
                            </h2>
                        </div>

                        {error ? (
                            <div className="text-center py-32 bg-red-500/5 rounded-[40px] border border-dashed border-red-500/20">
                                <h3 className="text-xl font-bold mb-2">Connection Interrupted</h3>
                                <p className="text-muted-foreground font-medium italic mb-8">We are having trouble connecting to the divine knowledge hub.</p>
                            </div>
                        ) : (
                            <>
                                {/* 🎯 ELITE SSR GRID: Visible in View Source as <article> tags */}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-12 w-full">
                                    {blogs.map((blog, index) => (
                                        <BlogCard 
                                            key={blog.id} 
                                            blog={blog} 
                                            priority={currentPage === 1 && index < 3} 
                                        />
                                    ))}
                                </div>

                                {blogs.length === 0 && (
                                    <div className="text-center py-32 bg-white/5 rounded-[40px] border border-dashed border-white/10">
                                        <p className="text-muted-foreground font-medium italic">No articles found matching your criteria.</p>
                                    </div>
                                )}

                                <BlogPagination 
                                    currentPage={currentPage} 
                                    totalCount={total} 
                                    limit={limit} 
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* 🔗 Community CTA Section (Standardized) */}
            <SpiritualFamilySection />
        </main>
    );
}
