"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FestivalCalendar } from '@/components/festivals/FestivalCalendar';
import { Festival } from '@/lib/festivalData';

interface FestivalListingClientProps {
    initialFestivals: Festival[];
}

export default function FestivalListingClient({ initialFestivals }: FestivalListingClientProps) {
    const [allFestivals, setAllFestivals] = useState<Festival[]>(initialFestivals);
    const [displayFestivals, setDisplayFestivals] = useState<Festival[]>(initialFestivals.slice(0, 4));
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [loading, setLoading] = useState(false);

    const fetchFestivalsForMonth = async (date: Date) => {
        setLoading(true);
        try {
            // In a real production app, we might call an API route here
            // or use a Server Action. For now, we'll maintain the current logic
            // but optimized for hydration.
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            
            const startStr = `${firstDay.getFullYear()}-${(firstDay.getMonth() + 1).toString().padStart(2, '0')}-01`;
            const endStr = `${lastDay.getFullYear()}-${(lastDay.getMonth() + 1).toString().padStart(2, '0')}-${lastDay.getDate().toString().padStart(2, '0')}`;

            // We'll use the public client for this interactive fetch
            const { createClient } = await import('@supabase/supabase-js');
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            const { data: festivalData } = await supabase
                .from('festivals')
                .select('id, name, slug, date, short_desc')
                .gte('date', startStr)
                .lte('date', endStr)
                .order('date', { ascending: true });

            if (festivalData) {
                const transformed = festivalData.map(f => ({
                    ...f,
                    date: new Date(f.date)
                })) as unknown as Festival[];
                
                setAllFestivals(transformed);
                
                const now = new Date();
                if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                    const todayStr = now.toISOString().split('T')[0];
                    const upcoming = transformed.filter((f: any) => f.date.toISOString().split('T')[0] >= todayStr);
                    setDisplayFestivals(upcoming.slice(0, 4));
                } else {
                    setDisplayFestivals(transformed.slice(0, 4));
                }
            }
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        const selStr = date.toISOString().split('T')[0];

        const onDate = allFestivals.filter(f => f.date.toISOString().split('T')[0] === selStr);
        const upcoming = allFestivals.filter(f => f.date.toISOString().split('T')[0] > selStr);

        const combined = [...onDate, ...upcoming].slice(0, 4);

        if (combined.length > 0) {
            setDisplayFestivals(combined);
        } else {
            setDisplayFestivals(allFestivals.slice(-4));
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12 max-w-[1600px] mx-auto items-start">
            {/* Calendar - Client Island */}
            <div className="lg:w-7/12 w-full">
                <FestivalCalendar
                    festivals={allFestivals}
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    onMonthChange={fetchFestivalsForMonth}
                />
            </div>

            {/* Event List - Interactive Section */}
            <div className="lg:w-5/12 w-full sticky top-28 self-start">
                <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl">
                    <h2 className="text-2xl md:text-3xl font-black font-serif mb-8 flex items-center gap-4 text-foreground">
                        <span className="w-8 h-1 bg-saffron rounded-full"></span>
                        {selectedDate ? `Festivals for ${selectedDate.toLocaleDateString('default', { day: 'numeric', month: 'short' })}` : "Upcoming Festivals"}
                    </h2>

                    <div className="space-y-5">
                        {displayFestivals.length > 0 ? displayFestivals.map((fest, idx) => {
                            const dateObj = new Date(fest.date);
                            const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                            const monthLabel = months[dateObj.getMonth()];
                            const dayLabel = dateObj.getDate();
                            
                            const isSelected = selectedDate && 
                                dayLabel === selectedDate.getDate() && 
                                dateObj.getMonth() === selectedDate.getMonth() &&
                                dateObj.getFullYear() === selectedDate.getFullYear();

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
                                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-18 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                                        <div className="w-full bg-saffron text-white py-0.5 text-[8px] font-black uppercase text-center">
                                            {monthLabel}
                                        </div>
                                        <div className="flex-grow flex items-center justify-center text-xl font-black text-zinc-800 dark:text-zinc-100 font-serif">
                                            {dayLabel}
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 font-serif group-hover:text-saffron transition-colors">
                                            {fest.name}
                                        </h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-[11px] line-clamp-1 mt-1">
                                            {fest.shortDesc || "Explore the divine significance."}
                                        </p>
                                        {isSelected && (
                                            <div className="mt-2 px-2 py-0.5 inline-block rounded-full bg-saffron text-white text-[8px] font-black uppercase">
                                                Selected
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        }) : (
                            <div className="text-center py-10 opacity-50">
                                <p className="italic">No upcoming festivals in this window.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
