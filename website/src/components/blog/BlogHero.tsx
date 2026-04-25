"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { getBlogCategoryStyle } from "@/lib/uiMapping";

export default function BlogHero({ onSearch, onSort, onFilter }: { onSearch: (term: string) => void, onSort: (val: string) => void, onFilter: (val: string) => void }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    if (!mounted) return null;

    return (
        <section className="relative pt-10 md:pt-14 pb-16 md:pb-20 overflow-hidden">
            {/* Background Animations */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Light Mode Particles */}
                <div className="absolute inset-0 dark:hidden">
                    <div className="absolute top-28 left-20 w-4 h-4 rounded-full bg-saffron/20 animate-float-particle"></div>
                    <div className="absolute top-48 right-40 w-6 h-6 rounded-full bg-saffron/10 animate-float-particle delay-1000"></div>
                    <div className="absolute bottom-20 left-1/3 w-3 h-3 rounded-full bg-gold/20 animate-float-particle delay-2000"></div>
                </div>

                {/* Dark Mode Stars & Nebula */}
                <div className="hidden dark:block absolute inset-0">
                    {/* Stars */}
                    <div className="absolute top-24 left-10 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
                    <div className="absolute top-32 left-1/2 w-1 h-1 bg-white/70 rounded-full animate-twinkle delay-500"></div>
                    <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-gold/50 rounded-full animate-twinkle delay-1000"></div>
                    <div className="absolute bottom-40 left-20 w-1 h-1 bg-white rounded-full animate-twinkle delay-1500"></div>

                    {/* Nebula Glow */}
                    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl animate-nebula-pulse"></div>
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl animate-nebula-pulse delay-2000"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 dark:bg-saffron/20 text-saffron dark:text-saffron-light text-xs font-bold uppercase tracking-widest mb-6 border border-saffron/20 backdrop-blur-sm">
                        Knowledge & Wisdom
                    </span>

                    <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 leading-snug tracking-tight font-serif">
                        Spiritual <span className="text-saffron dark:text-gold-highlight text-transparent bg-clip-text bg-gradient-to-r from-saffron to-gold py-2">Insights</span>
                    </h1>

                    <p className="text-xl text-muted-foreground font-light leading-relaxed mb-10 max-w-2xl mx-auto dark:text-gray-300">
                        Explore our collection of sacred articles on Vedic rituals, astrology, and spiritual growth to guide your journey.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="flex flex-col lg:flex-row items-center gap-4 max-w-4xl mx-auto">
                        <div className="relative flex-1 group w-full lg:w-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-saffron to-gold rounded-full opacity-25 group-hover:opacity-50 blur transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for mantras, rituals or guidance..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full px-8 py-4 rounded-full bg-white dark:bg-slate-900/80 backdrop-blur-md border border-saffron/20 dark:border-gold/30 text-foreground dark:text-slate-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-saffron/50 dark:focus:ring-gold/50 transition-all placeholder:text-muted-foreground/50 dark:placeholder:text-slate-400"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-saffron dark:text-gold">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Sort/Filter Controls */}
                        <div className="flex flex-row items-center gap-2 w-full lg:w-auto">
                            {/* Sort Dropdown */}
                            <div className="relative group w-1/2 lg:w-36">
                                <select 
                                    onChange={(e) => onSort(e.target.value)}
                                    className="w-full appearance-none px-4 py-4 rounded-full bg-white dark:bg-slate-900/80 backdrop-blur-md border border-saffron/20 dark:border-gold/30 text-[10px] font-black uppercase tracking-widest text-saffron dark:text-gold shadow-lg focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all cursor-pointer pr-8"
                                >
                                    <option value="newest">Latest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="popular">Popular</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-saffron opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Time Filter Dropdown */}
                            <div className="relative group w-1/2 lg:w-36">
                                <select 
                                    onChange={(e) => onFilter(e.target.value)}
                                    className="w-full appearance-none px-4 py-4 rounded-full bg-white dark:bg-slate-900/80 backdrop-blur-md border border-saffron/20 dark:border-gold/30 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all cursor-pointer pr-8"
                                >
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">Week</option>
                                    <option value="month">Month</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Popular Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest py-2 mr-2">Popular:</span>
                        {['Mantras', 'Rituals', 'Astrology', 'Meditation', 'Vedic Wisdom'].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => { setSearchTerm(tag); onSearch(tag); }}
                                className="px-4 py-1.5 rounded-full bg-white/5 border border-saffron/10 text-[10px] font-bold text-slate-500 hover:text-saffron hover:border-saffron/40 transition-all uppercase tracking-tighter"
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
