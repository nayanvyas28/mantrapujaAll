"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, ArrowRight, Clock } from 'lucide-react';
import EnhancedBackground from '@/components/EnhancedBackground';
import { FestivalCalendar } from '@/components/festivals/FestivalCalendar';
import { supabase } from '@/lib/supabaseClient';

export default function FestivalPage() {
    const [mounted, setMounted] = useState(false);
    const [allFestivals, setAllFestivals] = useState<any[]>([]);
    const [displayFestivals, setDisplayFestivals] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFestivalsForMonth = async (date: Date) => {
        setLoading(true);
        try {
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            
            const startStr = `${firstDay.getFullYear()}-${(firstDay.getMonth() + 1).toString().padStart(2, '0')}-01`;
            const endStr = `${lastDay.getFullYear()}-${(lastDay.getMonth() + 1).toString().padStart(2, '0')}-${lastDay.getDate().toString().padStart(2, '0')}`;

            const { data: festivalData } = await supabase
                .from('festivals')
                .select('*')
                .gte('date', startStr)
                .lte('date', endStr)
                .order('date', { ascending: true });

            if (festivalData) {
                setAllFestivals(festivalData);
                
                // If it's current month, show festivals from today onwards by default
                const now = new Date();
                if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                    const todayStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
                    const upcoming = festivalData.filter((f: any) => f.date >= todayStr);
                    setDisplayFestivals(upcoming.slice(0, 4));
                } else {
                    setDisplayFestivals(festivalData.slice(0, 4));
                }
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMounted(true);
        const fetchData = async () => {
            await fetchFestivalsForMonth(new Date());
            
            try {
                // 2. Fetch Blogs
                const { data: blogData } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (blogData) setBlogs(blogData);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchData();
    }, []);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        
        // Use local date parts to build YYYY-MM-DD string to avoid timezone shifts
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date.getDate().toString().padStart(2, '0');
        const selStr = `${y}-${m}-${d}`;

        // 1. Exact matches for this date
        const onDate = allFestivals.filter(f => f.date === selStr);

        // 2. Upcoming events after this date
        const upcoming = allFestivals.filter(f => f.date > selStr);

        const combined = [...onDate, ...upcoming].slice(0, 4);

        if (combined.length > 0) {
            setDisplayFestivals(combined);
        } else {
            setDisplayFestivals(allFestivals.slice(-4));
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-background relative">
            <EnhancedBackground />

            {/* Hero Section */}
            <div className="relative pt-10 pb-4 px-4 z-10">
                <h1 className="text-4xl md:text-6xl font-black mb-2 text-foreground font-serif leading-snug text-center">
                    Hindu Festival <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 py-2">Calendar</span>
                </h1>
                
                <div className="w-full mt-12 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 max-w-[1600px] mx-auto items-start">
                        {/* Calendar - Single Source of Truth */}
                        <div className="lg:w-7/12 w-full">
                            <FestivalCalendar
                                festivals={allFestivals.map(f => ({ ...f, date: new Date(f.date) }))}
                                selectedDate={selectedDate}
                                onDateSelect={handleDateSelect}
                                onMonthChange={(date) => fetchFestivalsForMonth(date)}
                            />
                        </div>

                        {/* Event List - Direct from Database */}
                        <div className="lg:w-5/12 w-full sticky top-28 self-start">
                            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl">
                                <h2 className="text-2xl md:text-3xl font-black font-serif mb-8 flex items-center gap-4">
                                    <span className="w-8 h-1 bg-saffron rounded-full"></span>
                                    {selectedDate ? `Festivals for ${selectedDate.toLocaleDateString('default', { day: 'numeric', month: 'short' })}` : "Upcoming Festivals"}
                                </h2>

                                <div className="space-y-5">
                                    {displayFestivals.map((fest, idx) => {
                                        // Simple string parsing for display
                                        const [y, m, d] = fest.date.split('-');
                                        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                                        const monthLabel = months[parseInt(m) - 1];
                                        
                                        const isSelected = selectedDate && 
                                            parseInt(d) === selectedDate.getDate() && 
                                            (parseInt(m) - 1) === selectedDate.getMonth() &&
                                            parseInt(y) === selectedDate.getFullYear();

                                        return (
                                            <Link
                                                key={`${fest.id}-${idx}`}
                                                href={`/festivals/${fest.slug}`}
                                                className={`group flex gap-5 p-5 rounded-3xl transition-all duration-300 border ${
                                                    isSelected 
                                                    ? 'bg-saffron/5 border-saffron shadow-md' 
                                                    : 'bg-white dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-700 hover:border-saffron/30'
                                                }`}
                                            >
                                                {/* Date Visual from Database String */}
                                                <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-18 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                                                    <div className="w-full bg-saffron text-white py-0.5 text-[8px] font-black uppercase text-center">
                                                        {monthLabel}
                                                    </div>
                                                    <div className="flex-grow flex items-center justify-center text-xl font-black text-zinc-800 dark:text-zinc-100 font-serif">
                                                        {parseInt(d)}
                                                    </div>
                                                </div>

                                                <div className="flex-grow">
                                                    <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 font-serif group-hover:text-saffron transition-colors">
                                                        {fest.name}
                                                    </h3>
                                                    <p className="text-zinc-500 dark:text-zinc-400 text-[11px] line-clamp-1 mt-1">
                                                        {fest.short_desc || "Explore the divine significance."}
                                                    </p>
                                                    {isSelected && (
                                                        <div className="mt-2 px-2 py-0.5 inline-block rounded-full bg-saffron text-white text-[8px] font-black uppercase">
                                                            Selected
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blogs Section */}
            <div className="max-w-7xl mx-auto px-4 py-24 relative z-10 border-t border-border/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <h2 className="text-3xl md:text-5xl font-black font-serif">Spiritual <span className="text-saffron">Wisdom</span></h2>
                    <Link href="/blog" className="text-saffron font-bold hover:underline flex items-center gap-2 text-lg">
                        View All <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog, idx) => {
                        const icon = blog.icon || "🕉️";
                        const gradient = blog.gradient || ["from-orange-500 to-red-600", "from-blue-500 to-indigo-600", "from-green-500 to-emerald-600"][idx % 3];
                        const readTime = blog.readTime || "5 min read";
                        return (
                            <Link
                                key={blog.id || idx}
                                href={`/blogs/${blog.slug}`}
                                className="group relative bg-card rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-saffron/50 block cursor-pointer"
                            >
                                <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
                                        <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-wider">{blog.category || "Wisdom"}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-saffron transition-colors duration-300 font-serif line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                                        {blog.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                                            <Clock className="w-4 h-4" /> {readTime}
                                        </span>
                                        <span className="text-saffron font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-saffron/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
