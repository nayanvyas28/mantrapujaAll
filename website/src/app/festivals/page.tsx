"use client";

import { useState, useEffect, Suspense } from "react";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FestivalCalendar } from '@/components/festivals/FestivalCalendar';
import { festivals, getUpcomingFestivals } from '@/lib/festivalData';
import EnhancedBackground from '@/components/EnhancedBackground';
import { ArrowRight, Calendar, Info } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
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

export default function FestivalPageWrapper() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><span className="text-saffron animate-pulse font-black">Aligning Sacred Stars...</span></div>}>
            <FestivalPage />
        </Suspense>
    );
}

function FestivalPage() {
    const [allFestivals, setAllFestivals] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [blogs, setBlogs] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const [viewMode, setViewMode] = useState<'festivals' | 'calendar'>('festivals');
    const [selectedFestival, setSelectedFestival] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const view = searchParams.get('view');
        if (view === 'calendar') {
            setViewMode('calendar');
        }
        
        const fetchData = async () => {
            try {
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

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
        
        // Find if there is a festival on this date to show in the preview card
        const festival = allFestivals.find(f => {
            const d = new Date(f.date);
            d.setHours(0, 0, 0, 0);
            const target = new Date(date);
            target.setHours(0, 0, 0, 0);
            return d.getTime() === target.getTime();
        });
        
        setSelectedFestival(festival || null);
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
                {/* View Toggles: High-End Minimalist (Matching Mobile) */}
                <div className="flex justify-center mb-16 relative z-20">
                    <div className="inline-flex p-2 bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-[24px] border border-white/20 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                        <button
                            onClick={() => setViewMode('festivals')}
                            className={`px-10 py-4 rounded-[18px] text-[11px] font-black tracking-[0.2em] transition-all duration-500 uppercase ${viewMode === 'festivals' ? 'bg-saffron text-white shadow-2xl shadow-saffron/40 scale-105' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
                        >
                            Recent / Upcoming
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-10 py-4 rounded-[18px] text-[11px] font-black tracking-[0.2em] transition-all duration-500 uppercase ${viewMode === 'calendar' ? 'bg-saffron text-white shadow-2xl shadow-saffron/40 scale-105' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
                        >
                            Hindu Calendar View
                        </button>
                    </div>
                </div>

                {viewMode === 'calendar' ? (
                    <div className="max-w-5xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <FestivalCalendar
                            festivals={allFestivals}
                            selectedDate={selectedDate}
                            onDateSelect={handleDateSelect}
                        />

                        {/* Selected Festival Preview Card: "Sacred Scroll" Edition */}
                        {selectedDate && (
                            <div className="mt-12 animate-in zoom-in-95 duration-500">
                                <div className={`relative p-10 md:p-14 rounded-[48px] border overflow-hidden transition-all duration-700 ${selectedFestival ? 'bg-gradient-to-br from-saffron/[0.08] to-amber/[0.02] border-saffron/20 shadow-[0_40px_80px_-15px_rgba(249,115,22,0.15)]' : 'bg-white/50 dark:bg-white/5 border-white/20'}`}>
                                    
                                    {/* Scroll Decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/5 rounded-bl-full -mr-16 -mt-16 blur-3xl" />
                                    
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="px-5 py-2 bg-white dark:bg-white/5 rounded-full text-[11px] font-black text-saffron uppercase tracking-[0.2em] border border-saffron/10 shadow-sm">
                                                    {selectedDate.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </div>
                                                {selectedFestival && (
                                                    <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/10 rounded-full text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em] border border-emerald-500/20">
                                                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                                        Sacred Day
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <h3 className="text-4xl md:text-5xl font-black mb-4 font-serif text-slate-900 dark:text-white leading-tight">
                                                {selectedFestival ? selectedFestival.name : "A Peaceful Day"}
                                            </h3>
                                            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl font-light">
                                                {selectedFestival ? selectedFestival.shortDesc : "Take this time for personal reflection and meditation. No major collective festivals are recorded for this date in the Vedic calendar."}
                                            </p>
                                        </div>

                                        {selectedFestival && (
                                            <Link
                                                href={`/festivals/${selectedFestival.slug}`}
                                                className="group inline-flex items-center justify-center px-12 py-5 bg-saffron text-white font-black rounded-2xl shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(249,115,22,0.5)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 text-[13px] uppercase tracking-widest"
                                            >
                                                Discover Significance
                                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Upcoming Festivals List: High-End Card Layout */
                    <div className="mb-24 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black font-serif text-slate-900 dark:text-white mb-4">
                                {selectedDate ? `Events for ${selectedDate.toLocaleDateString('default', { day: 'numeric', month: 'long' })}` : "Upcoming Sacred Timings"}
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-saffron to-transparent mx-auto opacity-30" />
                        </div>

                        <div className="space-y-8">
                            {displayFestivals.length > 0 ? (
                                displayFestivals.map((festival) => (
                                    <Link
                                        key={festival.id}
                                        href={`/festivals/${festival.slug}`}
                                        className={`group block transition-all duration-500 hover:-translate-y-1 ${selectedDate && new Date(festival.date).getDate() === selectedDate.getDate() && new Date(festival.date).getMonth() === selectedDate.getMonth() ? 'scale-105' : ''}`}
                                    >
                                        <div className={`p-8 md:p-10 rounded-[40px] border transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col md:flex-row gap-8 md:items-center ${selectedDate && new Date(festival.date).getDate() === selectedDate.getDate() && new Date(festival.date).getMonth() === selectedDate.getMonth() ? 'bg-white dark:bg-white/10 border-saffron/40 shadow-[0_30px_70px_-20px_rgba(249,115,22,0.2)]' : 'bg-white/80 dark:bg-white/[0.02] border-white/20 hover:border-saffron/20'}`}>
                                            
                                            {/* Date Box: Floating Style */}
                                            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-white to-saffron/[0.05] dark:from-white/10 dark:to-saffron/5 rounded-3xl flex flex-col items-center justify-center text-saffron border border-saffron/10 group-hover:border-saffron/30 shadow-sm transition-all duration-500 group-hover:scale-110">
                                                <span className="text-3xl font-black tracking-tight">{new Date(festival.date).getDate()}</span>
                                                <span className="text-[11px] uppercase font-black tracking-[0.2em] opacity-60">{new Date(festival.date).toLocaleString('default', { month: 'short' })}</span>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <h3 className="text-2xl md:text-3xl font-black font-serif group-hover:text-saffron transition-colors duration-300">
                                                        {festival.name}
                                                    </h3>
                                                    <div className="h-px flex-1 bg-saffron/10" />
                                                </div>
                                                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-6 line-clamp-2 font-light">
                                                    {festival.shortDesc}
                                                </p>
                                                <div className="flex flex-wrap gap-4">
                                                    <span className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-saffron text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-saffron/20 hover:shadow-saffron/40 transition-all duration-300">
                                                        Explore Wisdom <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                    <button className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-saffron/10 text-saffron text-[11px] font-black uppercase tracking-[0.2em] hover:bg-saffron/5 transition-all duration-300">
                                                        Prepare Ritual
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-28 bg-white/20 dark:bg-white/[0.02] rounded-[48px] border border-dashed border-saffron/10">
                                    <Info className="w-16 h-16 text-saffron mx-auto mb-6 opacity-20" />
                                    <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[11px]">Heavenly Silence • No Events Found</p>
                                </div>
                            )}
                        </div>

                        {selectedDate && (
                            <div className="mt-12 text-center animate-in fade-in duration-1000">
                                <button
                                    onClick={() => {
                                        setSelectedDate(null);
                                        setSelectedFestival(null);
                                    }}
                                    className="px-8 py-3 rounded-full border border-saffron/10 text-saffron font-black text-[11px] uppercase tracking-[0.3em] hover:bg-saffron hover:text-white hover:border-saffron transition-all duration-500 shadow-sm"
                                >
                                    Universe View / All Upcoming
                                </button>
                            </div>
                        )}
                    </div>
                )}

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

