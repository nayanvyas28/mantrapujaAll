"use client";

import { useState, useEffect, Suspense, useRef } from "react";
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
    const [viewingMonth, setViewingMonth] = useState<Date>(new Date());
    const [blogs, setBlogs] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const [selectedFestival, setSelectedFestival] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    
    // Refs for auto-scrolling and height matching
    const festivalRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const calendarColRef = useRef<HTMLDivElement>(null);
    const [calendarHeight, setCalendarHeight] = useState<number | undefined>(undefined);

    useEffect(() => {
        setMounted(true);
        
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

    // Sync sidebar height with calendar height
    useEffect(() => {
        if (mounted) {
            const updateHeight = () => {
                if (calendarColRef.current) {
                    setCalendarHeight(calendarColRef.current.offsetHeight);
                }
            };
            
            // Update on mount, month change and window resize
            updateHeight();
            const timer = setTimeout(updateHeight, 100); // 100ms for browser to paint calendar grid
            window.addEventListener('resize', updateHeight);
            
            return () => {
                window.removeEventListener('resize', updateHeight);
                clearTimeout(timer);
            };
        }
    }, [mounted, viewingMonth, allFestivals]);

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

        // Auto-scroll to the festival in the sidebar
        if (festival) {
            setTimeout(() => {
                festivalRefs.current[festival.id]?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'nearest'
                });
            }, 100);
        }
    };

    const festivalsInMonth = allFestivals.filter(f => 
        f.date.getMonth() === viewingMonth.getMonth() && 
        f.date.getFullYear() === viewingMonth.getFullYear()
    );

    const monthName = viewingMonth.toLocaleString('default', { month: 'long' });

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

            <div className="container mx-auto px-4 pb-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Column: Interactive Calendar (The Height Master) */}
                    <div ref={calendarColRef} className="lg:col-span-7 animate-in fade-in slide-in-from-left-8 duration-1000">
                        <FestivalCalendar
                            festivals={allFestivals}
                            selectedDate={selectedDate}
                            onDateSelect={handleDateSelect}
                            onMonthChange={setViewingMonth}
                        />
                    </div>

                    {/* Right Column: Month Festival List (Dynamically Matched Height) */}
                    <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-8 duration-1000 sticky top-24 self-start">
                        <div 
                            className="flex flex-col bg-[#fafaf5]/50 dark:bg-white/[0.02] rounded-[40px] border border-saffron/10 p-6 md:p-8 overflow-hidden"
                            style={{ height: calendarHeight ? `${calendarHeight}px` : 'auto' }}
                        >
                            <div className="flex-shrink-0 flex items-center justify-between mb-6">
                                <h2 className="text-xl md:text-2xl font-black font-serif text-slate-900 dark:text-white">
                                    {monthName} <span className="text-saffron">Festivals</span>
                                </h2>
                                <span className="px-3 py-1 bg-saffron/10 rounded-full text-[9px] font-black text-saffron uppercase tracking-widest border border-saffron/20">
                                    {festivalsInMonth.length} Events
                                </span>
                            </div>

                            <div 
                                ref={scrollContainerRef}
                                className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow"
                            >
                                {festivalsInMonth.length > 0 ? (
                                    festivalsInMonth.map((festival) => (
                                        <Link
                                            key={festival.id}
                                            ref={(el: HTMLAnchorElement | null) => { if (el) festivalRefs.current[festival.id] = el; }}
                                            href={`/festivals/${festival.slug}`}
                                            className={`group block p-4 rounded-[24px] border transition-all duration-500 overflow-hidden relative ${selectedDate && new Date(festival.date).toDateString() === selectedDate.toDateString() ? 'bg-white dark:bg-white/10 border-saffron/40 shadow-xl scale-[1.02]' : 'bg-white/50 dark:bg-white/[0.02] border-white/20 hover:border-saffron/20 hover:bg-white'}`}
                                        >
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className={`flex-shrink-0 w-11 h-11 rounded-lg flex flex-col items-center justify-center border transition-all duration-500 group-hover:scale-110 ${selectedDate && new Date(festival.date).toDateString() === selectedDate.toDateString() ? 'bg-saffron text-white border-saffron' : 'bg-white dark:bg-white/10 text-saffron border-saffron/10'}`}>
                                                    <span className="text-base font-black">{new Date(festival.date).getDate()}</span>
                                                    <span className="text-[7px] uppercase font-black tracking-widest opacity-60">{new Date(festival.date).toLocaleString('default', { month: 'short' })}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-black font-serif mb-0.5 group-hover:text-saffron transition-colors line-clamp-1">{festival.name}</h4>
                                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light line-clamp-1">{festival.shortDesc || "Sacred celebration."}</p>
                                                </div>
                                            </div>
                                            
                                            {selectedDate && new Date(festival.date).toDateString() === selectedDate.toDateString() && (
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-saffron/10 rounded-bl-full -mr-8 -mt-8 blur-2xl" />
                                            )}
                                        </Link>
                                    ))
                                ) : (
                                    <div className="py-20 text-center bg-white/20 dark:bg-white/[0.02] rounded-[40px] border border-dashed border-slate-200 dark:border-white/10 h-full flex flex-col justify-center items-center">
                                        <Calendar className="w-8 h-8 text-slate-300 mb-4" />
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">No events in {monthName}</p>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={() => {
                                    const today = new Date();
                                    setSelectedDate(today);
                                }}
                                className="flex-shrink-0 w-full mt-6 py-3 rounded-xl border border-dashed border-saffron/30 text-saffron text-[9px] font-black uppercase tracking-[0.2em] hover:bg-saffron/5 transition-all text-center"
                            >
                                Jump to Today
                            </button>
                        </div>
                    </div>
                </div>

                {/* Selected Festival Detail Card - Positioned relative to main grid */}
                {selectedDate && (
                    <div className="mt-10 animate-in zoom-in-95 duration-500 max-w-5xl mx-auto">
                        <div className={`relative p-8 md:p-12 rounded-[48px] border overflow-hidden transition-all duration-700 ${selectedFestival ? 'bg-gradient-to-br from-saffron/[0.08] to-amber/[0.02] border-saffron/20 shadow-[0_40px_80px_-15px_rgba(249,115,22,0.15)]' : 'bg-white/50 dark:bg-white/5 border-white/20'}`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/5 rounded-bl-full -mr-16 -mt-16 blur-3xl" />
                            
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="px-4 py-1.5 bg-white dark:bg-white/5 rounded-full text-[10px] font-black text-saffron uppercase tracking-[0.2em] border border-saffron/10 shadow-sm">
                                            {selectedDate.toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black mb-3 font-serif text-slate-900 dark:text-white leading-tight">
                                        {selectedFestival ? selectedFestival.name : "Peaceful Day"}
                                    </h3>
                                    <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light line-clamp-3">
                                        {selectedFestival ? selectedFestival.shortDesc : "A day for personal reflection and spiritual connection with the divine."}
                                    </p>
                                </div>

                                {selectedFestival && (
                                    <Link
                                        href={`/festivals/${selectedFestival.slug}`}
                                        className="group inline-flex items-center justify-center px-10 py-4 bg-saffron text-white font-black rounded-2xl shadow-lg hover:-translate-y-1 transition-all duration-300 text-xs uppercase tracking-widest whitespace-nowrap"
                                    >
                                        Full Insight
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Featured Blog Section */}
            <div className="max-w-6xl mx-auto mt-20 px-4">
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
                                <div className={`h-2 bg-gradient-to-r ${blog.gradient || gradients[idx % gradients.length]}`}></div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                            {blog.icon || icons[idx % icons.length]}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-wider">
                                            {blog.tags?.[0] || blog.category || "Festival Insight"}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-foreground mb-3 leading-snug group-hover:text-saffron transition-colors duration-300 line-clamp-2 font-serif">
                                        {blog.title}
                                    </h3>
                                    <div className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-grow">
                                        {blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : '')}
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {blog.readTime || "5 min read"}
                                        </span>
                                        <span className="text-saffron font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12 pb-20">
                    <Link href="/blog" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-saffron to-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <span>Explore All Articles</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
            <SpiritualFamilySection />
        </div>
    );
}

