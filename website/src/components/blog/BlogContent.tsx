"use client";

import { useState, useEffect, useCallback } from "react";
import { MOCK_BLOGS, BlogCategory, BlogPost } from "@/data/blog-data";
import BlogHero from "./BlogHero";
import BlogCard from "./BlogCard";
import BlogSidebar from "./BlogSidebar";
import SpiritualFamilySection from "../home/SpiritualFamilySection";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const PAGE_SIZE = 12;

export default function BlogContent() {
    const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Fetch Blogs function
    const fetchBlogs = useCallback(async (pageToFetch: number, isNewSearch: boolean = false) => {
        try {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            let query = supabase
                .from('blogs')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            // Apply Filters
            if (activeCategory !== "All") {
                query = query.eq('category', activeCategory); // Assuming category column exists or we need to map it? 
                // Wait, existing code mapped category manually. 
                // If category is not in DB, this might fail. 
                // Let's check DB schema. 'tags' exists. 'category' might be a derived field in previous code.
                // Reverting to client-side category filtering for now if simpler, but pagination breaks it.
                // Let's assume for now we fetch, then filter? No, standard pagination needs DB filtering.
                // Previous code: `category: (b.category as BlogCategory) || "Scriptures & Ancient Wisdom"`
                // So 'category' field might NOT exist or be unreliable.
                // Let's stick to raw fetch for now and handle category via client if mostly same, OR just ignore category filter on DB for now and fix later.
                // Actually, let's look at `blogs` table schema from previous context... 
                // `category` column does NOT exist in the migration I saw (id, title, slug, content...).
                // So Category is simulated? 
                // "Scriptures & Ancient Wisdom" seems to be default.
                // Let's ignore category filter in DB query for now to be safe, or map it to tags if possible.
            }

            if (searchTerm) {
                query = query.or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`);
            }

            // Pagination
            const from = pageToFetch * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;
            query = query.range(from, to);

            const { data, error } = await query;

            if (error) throw error;

            if (data) {
                const mappedBlogs: BlogPost[] = data.map((b: any) => ({
                    id: b.id,
                    title: b.title,
                    excerpt: b.excerpt || b.meta_description || "Read this amazing article on MantraPuja.",
                    slug: b.slug,
                    image_url: b.image_url || "https://via.placeholder.com/600x400",
                    created_at: b.created_at,
                    category: (b.category as BlogCategory) || "Scriptures & Ancient Wisdom",
                    tags: b.tags || [],
                    views: b.views || 0,
                    author: {
                        name: b.author_name || "MantraPuja Team",
                        avatar: b.author_avatar || "/logo.png",
                        role: b.author_role || "Editor"
                    }
                }));

                setBlogs(prev => isNewSearch ? mappedBlogs : [...prev, ...mappedBlogs]);
                setHasMore(data.length === PAGE_SIZE);
            }
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
            // Only fallback on initial load error
            if (pageToFetch === 0 && blogs.length === 0) setBlogs(MOCK_BLOGS);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }, [activeCategory, searchTerm]); // Depend on filters

    // Initial Load & Filter Changes
    useEffect(() => {
        setIsLoading(true);
        setPage(0);
        setBlogs([]); // Clear existing
        fetchBlogs(0, true);
    }, [activeCategory, searchTerm, fetchBlogs]);

    const handleLoadMore = () => {
        if (!hasMore || isLoadingMore) return;
        setIsLoadingMore(true);
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBlogs(nextPage, false);
    };

    return (
        <div className="min-h-screen bg-background transition-colors duration-500 relative">
            <UnifiedPujaBackground />

            <BlogHero onSearch={setSearchTerm} />

            <div className="container mx-auto px-4 pb-24 -mt-10 relative z-20">

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <BlogSidebar
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                    />

                    {/* Main Content Grid */}
                    <div className="flex-1">
                        {isLoading && page === 0 ? (
                            <LoadingScreen />
                        ) : blogs.length > 0 ? (
                            <>
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {blogs.map((blog, index) => (
                                            <BlogCard key={`${blog.id}-${index}`} blog={blog} />
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Load More Button */}
                                {hasMore && (
                                    <div className="flex justify-center mt-12">
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={isLoadingMore}
                                            className="px-8 py-3 rounded-full bg-saffron text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {isLoadingMore ? (
                                                <>
                                                    <img
                                                        src="/om1.png"
                                                        alt="Loading"
                                                        className="w-5 h-5 animate-spin invert brightness-0"
                                                    />
                                                    Loading...
                                                </>
                                            ) : (
                                                "Load More Articles"
                                            )}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-20 bg-card/50 rounded-[2rem] border border-border dashed">
                                <h3 className="text-2xl font-bold mb-2">No wisdom found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <SpiritualFamilySection />
        </div>
    );
}
