"use client";

import { useState, useEffect, useCallback } from "react";
import { MOCK_BLOGS, BlogCategory, BlogPost } from "@/data/blog-data";
import BlogHero from "./BlogHero";
import BlogCard from "./BlogCard";
import BlogSidebar from "./BlogSidebar";
import SpiritualFamilySection from "../home/SpiritualFamilySection";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const PAGE_SIZE = 9;

export default function BlogContent() {
    const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [timeFilter, setTimeFilter] = useState("all");
    const [fetchError, setFetchError] = useState<string | null>(null);

    // Fetch Blogs function
    const fetchBlogs = useCallback(async (pageToFetch: number, isNewSearch: boolean = false) => {
        try {
            setFetchError(null);

            // 1. Fetch Authors Safely
            let authorsData: any[] = [];
            try {
                const { data: aData } = await supabase.from('blog_authors').select('*');
                authorsData = aData || [];
            } catch (aErr) {
                console.warn("Authors fetch failed:", aErr);
            }

            const authorIdMap = new Map();
            const authorNameMap = new Map();
            authorsData.forEach(a => {
                if (a && a.id) authorIdMap.set(a.id, a);
                if (a && a.name) authorNameMap.set(a.name.trim().toLowerCase(), a);
            });

            // 2. Build Query
            let query = supabase
                .from('Final_blog')
                .select('*')
                .eq('published', true)
                .eq('is_active', true) // Added is_active check from new schema
                .neq('slug', 'cache-buster-' + Date.now()); // Safe string-based cache buster

            // Apply Sorting
            if (sortBy === "popular") {
                query = query.order('views', { ascending: false });
            } else if (sortBy === "oldest") {
                query = query.order('created_at', { ascending: true });
            } else {
                query = query.order('created_at', { ascending: false });
            }

            // Apply Time Filter
            if (timeFilter !== "all") {
                const now = new Date();
                let filterDate = new Date();
                if (timeFilter === "today") filterDate.setHours(0, 0, 0, 0);
                else if (timeFilter === "week") filterDate.setDate(now.getDate() - 7);
                else if (timeFilter === "month") filterDate.setMonth(now.getMonth() - 1);
                query = query.gte('created_at', filterDate.toISOString());
            }

            // Apply Category
            if (activeCategory !== "All") {
                query = query.eq('category', activeCategory);
            }

            // Apply Smart Search
            if (searchTerm) {
                const words = searchTerm.trim().split(/\s+/).filter(w => w.length > 0);
                if (words.length > 0) {
                    // Create an OR filter for each word across multiple columns
                    const orFilters = words.map(word => 
                        `title.ilike.%${word}%,excerpt.ilike.%${word}%,category.ilike.%${word}%`
                    ).join(',');
                    query = query.or(orFilters);
                }
            }

            // Pagination
            const from = pageToFetch * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;
            query = query.range(from, to);

            const { data, error } = await query;

            if (error) {
                setFetchError(error.message);
                throw error;
            }

            if (data) {
                const mappedBlogs: BlogPost[] = data.map((b: any) => {
                    return {
                        id: b.id,
                        title: b.title,
                        excerpt: b.excerpt || b.meta_description || "Read this amazing article on MantraPuja.",
                        slug: b.slug,
                        image_url: b.image_url || "https://images.unsplash.com/photo-1605218453416-59e3c9c94494?q=80&w=1200",
                        created_at: b.created_at,
                        category: (b.category as BlogCategory) || "Scriptures & Ancient Wisdom",
                        tags: b.tags || [],
                        views: b.views || 0,
                        author: {
                            name: b.author_name || "MantraPuja Team",
                            avatar: b.author_avatar || "/logo.png",
                            role: b.author_role || "Editor"
                        }
                    };
                });

                setBlogs(prev => isNewSearch ? mappedBlogs : [...prev, ...mappedBlogs]);
                setHasMore(data.length === PAGE_SIZE);
            }
        } catch (err: any) {
            console.error("Critical: Failed to fetch blogs:", err);
            setFetchError(err.message || "Unknown error occurred");
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
        }
    }, [activeCategory, searchTerm, sortBy, timeFilter]);

    const [isFirstLoad, setIsFirstLoad] = useState(true);

    // Initial Load & Filter Changes
    useEffect(() => {
        setIsLoading(true);
        setPage(0);
        // We don't clear blogs here to keep the "Direct" feel during search
        fetchBlogs(0, true).then(() => {
            setIsFirstLoad(false);
        });
    }, [activeCategory, searchTerm, sortBy, timeFilter, fetchBlogs]);

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

            {/* Only show full loading screen on absolute first visit */}
            {isFirstLoad && isLoading && <LoadingScreen />}

            <BlogHero onSearch={setSearchTerm} onSort={setSortBy} onFilter={setTimeFilter} />

            <div className="container mx-auto px-4 pb-24 -mt-10 relative z-20">

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <BlogSidebar
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                    />

                    {/* Main Content Grid */}
                    <div className="flex-1">
                        {/* Debug Info */}
                        {!isLoading && blogs.length === 0 && (
                            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-xs font-mono">
                                Debug: Blogs=0 | Category={activeCategory} | Search={searchTerm} | Status=Loaded
                            </div>
                        )}

                        <div className={`transition-all duration-500 ${isLoading ? "opacity-60 blur-[1px] pointer-events-none" : "opacity-100"}`}>
                            {blogs.length > 0 ? (
                             <>
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                                !isLoading && (
                                    <div className="text-center py-20 bg-card/30 rounded-[2.5rem] border border-border border-dashed">
                                        <h3 className="text-2xl font-bold mb-2">No wisdom found</h3>
                                        <p className="text-muted-foreground">Try adjusting your search or category.</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <SpiritualFamilySection />
        </div>
    );
}
