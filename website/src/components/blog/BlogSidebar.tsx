"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { BLOG_CATEGORIES, BlogCategory } from "@/data/blog-data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    image_url: string;
    created_at: string;
}

export default function BlogSidebar({ activeCategory: propActiveCategory }: { activeCategory?: BlogCategory }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const activeCategory = (searchParams.get('category') as BlogCategory) || propActiveCategory || 'All';

    const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const updateCategory = (category: BlogCategory) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === 'All') {
            params.delete('category');
        } else {
            params.set('category', category);
        }
        params.set('page', '1');
        router.push(`/blog?${params.toString()}`);
    };

    useEffect(() => {
        async function fetchRecentBlogs() {
            try {
                const { data, error } = await supabase
                    .from('Final_blog')
                    .select('id, title, slug, image_url, created_at')
                    .eq('published', true)
                    .eq('is_active', true)
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (data) setRecentPosts(data);
            } catch (error) {
                console.error('Error in fetchRecentBlogs:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchRecentBlogs();
    }, []);

    return (
        <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-80 shrink-0 space-y-6 lg:space-y-8 lg:sticky lg:top-32 h-fit mb-8 lg:mb-0"
        >
            {/* Categories Island */}
            <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-saffron/10 dark:border-gold/20 shadow-sm">
                <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-saffron rounded-full"></span>
                    Categories
                </h3>
                <ul className="flex flex-row overflow-x-auto pb-2 gap-3 lg:gap-0 lg:flex-col lg:space-y-3 lg:pb-0 no-scrollbar snap-x">
                    {BLOG_CATEGORIES.map((category) => (
                        <li key={category} className="shrink-0">
                            <button
                                onClick={() => updateCategory(category)}
                                className={cn(
                                    "w-full flex items-center justify-between transition-colors font-medium text-sm group text-left p-2 rounded-lg whitespace-nowrap gap-3",
                                    activeCategory === category
                                        ? "text-saffron dark:text-gold bg-saffron/5 dark:bg-gold/10 font-bold"
                                        : "text-muted-foreground hover:text-saffron dark:text-slate-300 dark:hover:text-gold hover:bg-saffron/5 dark:hover:bg-white/10"
                                )}
                            >
                                <span>{category}</span>
                                {activeCategory === category && (
                                    <span className="w-2 h-2 rounded-full bg-saffron"></span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recent Posts - Client-Side Hydrated Island */}
            <div className="hidden lg:block bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-saffron/10 dark:border-gold/20 shadow-sm">
                <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-saffron rounded-full"></span>
                    Recent Wisdom
                </h3>
                <div className="space-y-6">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-4 animate-pulse">
                                <div className="w-20 h-20 rounded-xl bg-saffron/10"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-saffron/10 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        recentPosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-4 group">
                                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-saffron/5 flex items-center justify-center">
                                    <img
                                        src={post.image_url || '/logo.png'}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-saffron dark:group-hover:text-gold">
                                        {post.title}
                                    </h4>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                    </span>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            <div className="hidden lg:block relative overflow-hidden rounded-3xl p-8 text-center bg-gradient-to-br from-saffron to-orange-600 text-white shadow-lg">
                <h3 className="text-2xl font-black font-serif mb-2 relative z-10">Divine Insights</h3>
                <p className="text-white/90 text-sm mb-6 relative z-10">Get weekly Vedic wisdom delivered to your inbox.</p>
                <button className="w-full py-3 rounded-xl bg-white text-saffron font-bold text-sm shadow-lg hover:scale-105 transition-all relative z-10">
                    Subscribe Free
                </button>
            </div>
        </motion.aside>
    );
}

// Note: Using '#' for category links for now as filtering happens on main page state.
// In a real app, these might be /blog/category/[slug] pages.
