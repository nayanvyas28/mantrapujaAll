"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { BLOG_CATEGORIES, BlogCategory } from "@/data/blog-data";
import { cn } from "@/lib/utils";
import { getBlogCategoryStyle } from "@/lib/uiMapping";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    image_url: string;
    created_at: string;
}

interface BlogSidebarProps {
    activeCategory: BlogCategory;
    onSelectCategory: (category: BlogCategory) => void;
}

export default function BlogSidebar({ activeCategory, onSelectCategory }: BlogSidebarProps) {
    const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecentBlogs() {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('id, title, slug, image_url, created_at')
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (error) {
                    console.error('Error fetching recent blogs:', error);
                    console.error('Error details:', JSON.stringify(error, null, 2));
                } else if (data) {
                    console.log('Fetched blogs:', data);
                    setRecentPosts(data);
                } else {
                    console.log('No data returned from query');
                }
            } catch (error) {
                console.error('Error in fetchRecentBlogs:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchRecentBlogs();
    }, []);

    return (
        <aside className="w-full lg:w-80 shrink-0 space-y-6 lg:space-y-8 lg:sticky lg:top-32 h-fit mb-8 lg:mb-0">
            {/* Categories */}
            <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-saffron/10 dark:border-gold/20 shadow-sm">
                <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-saffron rounded-full"></span>
                    Categories
                </h3>
                <ul className="flex flex-row overflow-x-auto pb-2 gap-3 lg:gap-0 lg:flex-col lg:space-y-3 lg:pb-0 no-scrollbar snap-x">
                    {BLOG_CATEGORIES.map((category) => (
                        <li key={category} className="shrink-0">
                            <button
                                onClick={() => onSelectCategory(category)}
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

            {/* Recent Posts - Desktop Only */}
            <div className="hidden lg:block bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-saffron/10 dark:border-gold/20 shadow-sm">
                <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-saffron rounded-full"></span>
                    Recent Wisdom
                </h3>
                <div className="space-y-6">
                    {loading ? (
                        // Loading skeleton
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-4 animate-pulse">
                                <div className="w-20 h-20 rounded-xl bg-saffron/10"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-saffron/10 rounded w-3/4"></div>
                                    <div className="h-3 bg-saffron/10 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))
                    ) : recentPosts.length === 0 ? (
                        // Empty state
                        <div className="text-center py-8 text-muted-foreground text-sm">
                            <p>No recent blogs available</p>
                        </div>
                    ) : (
                        // Blog posts
                        recentPosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-4 group">
                                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-saffron/5 flex items-center justify-center">
                                    <img
                                        src={(post.image_url && post.image_url.trim()) ? post.image_url : '/logo.png'}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/logo.png';
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-saffron dark:group-hover:text-gold transition-colors">
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

            {/* Newsletter/ad placeholder - Desktop Only */}
            <div className="hidden lg:block relative overflow-hidden rounded-3xl p-8 text-center bg-gradient-to-br from-saffron to-orange-600 text-white shadow-lg shadow-saffron/20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <h3 className="text-2xl font-black font-serif mb-2 relative z-10">Divine Insights</h3>
                <p className="text-white/90 text-sm mb-6 relative z-10">Get weekly Vedic wisdom delivered to your inbox.</p>
                <button className="w-full py-3 rounded-xl bg-white text-saffron font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all relative z-10">
                    Subscribe Free
                </button>
            </div>
        </aside>
    );
}

// Note: Using '#' for category links for now as filtering happens on main page state.
// In a real app, these might be /blog/category/[slug] pages.
