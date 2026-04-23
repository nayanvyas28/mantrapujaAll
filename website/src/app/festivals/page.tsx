"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { FestivalCalendar } from '@/components/festivals/FestivalCalendar';
import { festivals, getUpcomingFestivals } from '@/lib/festivalData';
import EnhancedBackground from '@/components/EnhancedBackground';
import { ArrowRight, Calendar, Info } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import SpiritualFamilySection from "@/components/home/SpiritualFamilySection";

// Fallback constants for blog styles if dynamic data is missing
const gradients = [
    "from-orange-500 to-red-600",
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-amber-400 to-orange-500"
];

const icons = ["🕉️", "📜", "🕯️", "✨", "🙏", "🚩"];

export default function FestivalPage() {
    const [allFestivals, setAllFestivals] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const fetchData = async () => {
            try {
                // Using imported supabase singleton

                // 1. Fetch Festivals
                const { data: festivalData, error: festivalError } = await supabase
                    .from('festivals')
                    .select('*')
                    .eq('is_active', true)
                    .order('date', { ascending: true });

                if (festivalData && festivalData.length > 0) {
                    setAllFestivals(festivalData.map(f => ({
                        ...f,
                        id: f.id,
                        date: new Date(f.date),
                        shortDesc: f.description
                    })));
                }

                // 2. Fetch Blogs
                // ... (rest of blog fetch logic remains same)
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .or('category.eq.Festivals,tags.cs.{Festivals}')
                    .eq('published', true)
                    .order('created_at', { ascending: false })
                    .limit(3);


                if (data && data.length > 0) {
                    setBlogs(data);
                } else {
                    // Fallback to latest 3 blogs if no festival-specific blogs found
                    const { data: latestData } = await supabase
                        .from('blogs')
                        .select('*')
                        .eq('published', true)
                        .order('created_at', { ascending: false })
                        .limit(3);

                    if (latestData && latestData.length > 0) {
                        setBlogs(latestData);
                    } else {
                        // Hard fallback to static data (matching HomeClient)
                        setBlogs([
                            {
                                id: 1,
                                title: "Vedic Significance of Hindu Festivals",
                                excerpt: "Discover why festivals are more than just celebrations in the Vedic tradition.",
                                slug: "vedic-significance-festivals",
                                image_url: "https://images.unsplash.com/photo-1605218453416-59e3c9c94494?q=80&w=600&auto=format&fit=crop",
                                category: "Festivals",
                                readTime: "5 min read",
                                gradient: "from-orange-500 to-red-600",
                                icon: "🕉️"
                            },
                            {
                                id: 2,
                                title: "Navratri: The Nine Nights of Shakti",
                                excerpt: "Understanding the deep spiritual meaning behind the worship of the Divine Mother.",
                                slug: "navratri-shakti-worship",
                                image_url: "https://images.unsplash.com/photo-1634914040989-13824ee1c9f4?q=80&w=600&auto=format&fit=crop",
                                category: "Festivals",
                                readTime: "7 min read",
                                gradient: "from-yellow-500 to-amber-600",
                                icon: "✨"
                            },
                            {
                                id: 3,
                                title: "Deepavali: The Victory of Light",
                                excerpt: "How to perform the ancient rituals for prosperity and inner illumination.",
                                slug: "deepavali-ritual-guide",
                                image_url: "https://images.unsplash.com/photo-1542353436-312f0e1f67ff?q=80&w=600&auto=format&fit=crop",
                                category: "Festivals",
                                readTime: "6 min read",
                                gradient: "from-amber-500 to-orange-600",
                                icon: "🕯️"
                            }
                        ]);
                    }
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    // Corrected filter logic for "Show only 3 cards" and "selected date prioritized"
    const getDisplayFestivals = () => {
        if (allFestivals.length === 0) return [];

        let result = [];
        const baseDate = selectedDate || new Date();
        baseDate.setHours(0, 0, 0, 0);

        // 1. Try to find festival exactly on selected date
        const onDate = allFestivals.find(f => {
            const d = new Date(f.date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() === baseDate.getTime();
        });

        if (onDate) {
            result.push(onDate);
        }

        // 2. Get upcoming festivals after baseDate (excluding the one already picked)
        const upcoming = allFestivals.filter(f => {
            if (onDate && f.id === onDate.id) return false;
            const d = new Date(f.date);
            d.setHours(0, 0, 0, 0);
            return d.getTime() >= baseDate.getTime();
        });

        result = [...result, ...upcoming];

        // 3. Fallback: if we still need more, take from before baseDate (loop around)
        if (result.length < 3) {
            const past = allFestivals.filter(f => {
                const d = new Date(f.date);
                d.setHours(0, 0, 0, 0);
                return d.getTime() < baseDate.getTime();
            });
            result = [...result, ...past];
        }

        return result.slice(0, 3);
    };

    const displayFestivals = getDisplayFestivals();

    // Prevent hydration issues
    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <EnhancedBackground />

            {/* Hero Section */}
            <div className="relative pt-20 pb-12 text-center px-4 z-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-widest mb-6 border border-saffron/20 backdrop-blur-sm">
                    Sacred Timings
                </span>
                <h1 className="text-4xl md:text-6xl font-black mb-6 text-foreground font-serif leading-snug">
                    Hindu Festival <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 py-2">Calendar</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Explore sacred dates, mythological significance, and Vedic rituals for upcoming Hindu festivals.
                </p>
            </div>

            <div className="container mx-auto px-4 pb-24 relative z-10">
                {/* Calendar Component - Moved ABOVE for better flow */}
                <div className="max-w-5xl mx-auto mb-20">
                    <FestivalCalendar
                        festivals={allFestivals}
                        selectedDate={selectedDate}
                        onDateSelect={handleDateSelect}
                    />
                </div>

                {/* Upcoming Festivals List */}
                <div className="mb-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold font-serif mb-8 text-center flex items-center justify-center gap-3">
                        <span className="w-8 h-1 bg-saffron rounded-full"></span>
                        {selectedDate ? `Festivals for ${selectedDate.toLocaleDateString('default', { day: 'numeric', month: 'long' })}` : "Upcoming Festivals"}
                        <span className="w-8 h-1 bg-saffron rounded-full"></span>
                    </h2>

                    <div className="space-y-5">
                        {displayFestivals.length > 0 ? (
                            displayFestivals.map((festival) => (
                                <Link
                                    key={festival.id}
                                    href={`/festivals/${festival.slug}`}
                                    className={`group block bg-card dark:bg-card/80 backdrop-blur-sm border rounded-3xl overflow-hidden hover:border-saffron/30 transition-all duration-300 hover:shadow-lg ${selectedDate && new Date(festival.date).getDate() === selectedDate.getDate() && new Date(festival.date).getMonth() === selectedDate.getMonth() ? 'ring-2 ring-saffron border-saffron/50' : 'border-border/50'}`}
                                >
                                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center">
                                        {/* Date Box */}
                                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-saffron/10 to-amber/10 rounded-2xl flex flex-col items-center justify-center text-saffron border border-saffron/20 group-hover:border-saffron/40 group-hover:bg-saffron/5 transition-all">
                                            <span className="text-2xl font-bold">{festival.date.getDate()}</span>
                                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">{festival.date.toLocaleString('default', { month: 'short' })}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            <h3 className="text-xl md:text-2xl font-bold font-serif mb-2 group-hover:text-saffron transition-colors">
                                                {festival.name}
                                                {selectedDate && new Date(festival.date).getDate() === selectedDate.getDate() && new Date(festival.date).getMonth() === selectedDate.getMonth() && (
                                                    <span className="ml-3 text-xs bg-saffron text-white px-2 py-0.5 rounded-full font-sans uppercase">On Selected Date</span>
                                                )}
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                                                {festival.shortDesc}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-saffron text-white text-xs font-semibold hover:bg-saffron/90 transition-colors">
                                                    View Details <ArrowRight className="w-3.5 h-3.5" />
                                                </span>
                                                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-muted-foreground text-xs font-semibold hover:border-saffron/50 hover:text-saffron transition-colors">
                                                    Book Pandit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-card/50 rounded-3xl border border-dashed border-border">
                                <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                                <p className="text-muted-foreground">No festivals found for this period.</p>
                            </div>
                        )}
                    </div>

                    {selectedDate && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="text-saffron font-bold text-sm hover:underline"
                            >
                                Clear Selection / Show All Upcoming
                            </button>
                        </div>
                    )}
                </div>

                {/* Featured Blog Section - Spiral/Ancient Design (from HomeClient) */}
                <div className="max-w-6xl mx-auto mt-20">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-widest mb-6 border border-saffron/20 backdrop-blur-sm">
                            Knowledge Center
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-snug font-serif">
                            Spiritual Insights & <span className="text-saffron">Guidance</span>
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                            Discover ancient wisdom and practical guidance related to Hindu festivals and Vedic traditions.
                        </p>
                    </div>

                    {!loading && blogs.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blogs.map((blog, idx) => (
                                <Link
                                    key={idx}
                                    href={blog.slug && blog.slug !== '#' ? `/blog/${blog.slug}` : '#'}
                                    className="group relative bg-card rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-saffron/50 block cursor-pointer flex flex-col h-full"
                                >
                                    {/* Gradient Header */}
                                    <div className={`h-2 bg-gradient-to-r ${blog.gradient || gradients[idx % gradients.length]}`}></div>

                                    <div className="p-8 flex flex-col flex-1">
                                        {/* Icon & Category */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                                {blog.icon || icons[idx % icons.length]}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-wider">
                                                {blog.tags?.[0] || blog.category || "Festival Insight"}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-black text-foreground mb-3 leading-snug group-hover:text-saffron transition-colors duration-300 line-clamp-2 font-serif">
                                            {blog.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <div className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 overflow-hidden text-ellipsis flex-grow">
                                            {blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : '')}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                                            <span className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {blog.readTime || "5 min read"}
                                            </span>
                                            <span className="text-saffron font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                                Read More
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-saffron/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link href="/blog" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-saffron to-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <span>Explore All Articles</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
            <SpiritualFamilySection />
        </div>
    );
}

