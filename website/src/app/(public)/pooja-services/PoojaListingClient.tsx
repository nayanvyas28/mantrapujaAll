'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, ArrowRight, Sun, Zap, IndianRupee, Star, Clock, Calendar, MapPin, Video, Headphones, Gift, X, Loader2, CheckCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UnifiedPujaBackground } from '@/components/UnifiedPujaBackground';
import SpiritualFamilySection from "@/components/home/SpiritualFamilySection";
import { getBlogCategoryStyle } from '@/lib/uiMapping';
import FireParticles from '@/components/FireParticles';
import EmberParticles from '@/components/EmberParticles';
import { CosmicBackground } from '@/components/CosmicBackground';

interface Puja {
    id: string;
    name: string;
    slug: string;
    category?: string;
    image: string;
    isPlaceholder?: boolean;
    imageType?: string;
    desc: string;
    benefits: string[];
    price: number;
    display_price?: number;
    tags?: string[];
    special_offer_price?: number;
    is_special_offer?: boolean;
    badge?: string;
    gradient?: string;
}

interface PoojaListingClientProps {
    initialPujas: Puja[];
    initialCategories: string[];
    initialBlogs: any[];
}

const colorMap: Record<string, string> = {
    'orange-500': '#f97316',
    'red-500': '#ef4444',
    'red-600': '#dc2626',
    'indigo-500': '#6366f1',
    'purple-600': '#9333ea',
    'amber-400': '#fbbf24',
    'orange-400': '#fb923c',
    'blue-500': '#3b82f6',
    'indigo-600': '#4f46e5',
    'purple-500': '#a855f7',
    'slate-600': '#475569',
    'slate-900': '#0f172a',
    'emerald-500': '#10b981',
    'teal-600': '#0d9488',
    'pink-500': '#ec4899',
    'rose-500': '#f43f5e',
    'red-800': '#991b1b',
    'yellow-400': '#facc15',
    'amber-500': '#f59e0b',
    'stone-500': '#78716c',
    'stone-700': '#44403c',
    'gray-500': '#6b7280',
    'gray-700': '#374151',
    'blue-400': '#60a5fa',
    'pink-400': '#f472b6',
    'yellow-500': '#eab308',
    'green-500': '#22c55e',
    'blue-600': '#2563eb',
    'indigo-700': '#4338ca',
};

const getHexFromTailwind = (tailwindClass: string) => {
    if (!tailwindClass) return '#f97316';
    const parts = tailwindClass.split('-');
    if (parts.length < 3) return '#f97316';
    const key = `${parts[1]}-${parts[2]}`;
    return colorMap[key] || '#f97316';
};

const extractGradientColors = (gradient: string) => {
    if (!gradient) return { from: '#f97316', to: '#dc2626' };
    const parts = gradient.split(' ');
    const from = parts.find(p => p.startsWith('from-')) || 'from-orange-500';
    const to = parts.find(p => p.startsWith('to-')) || 'to-red-600';
    return {
        from: getHexFromTailwind(from),
        to: getHexFromTailwind(to)
    };
};

const prefixGradient = (gradient: string, prefix: string) => {
    if (!gradient) return '';
    return gradient.split(' ').map(cls => `${prefix}:${cls}`).join(' ');
};

const getTagStyle = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes('wealth') || t.includes('money') || t.includes('lakshmi')) return 'from-emerald-500 to-teal-600 shadow-emerald-500/20';
    if (t.includes('health') || t.includes('healing') || t.includes('ayush')) return 'from-blue-500 to-indigo-600 shadow-blue-500/20';
    if (t.includes('marriage') || t.includes('love') || t.includes('mangal')) return 'from-rose-500 to-pink-600 shadow-rose-500/20';
    if (t.includes('protection') || t.includes('hanuman') || t.includes('shani')) return 'from-orange-600 to-red-700 shadow-orange-600/20';
    if (t.includes('education') || t.includes('wisdom') || t.includes('saraswati')) return 'from-yellow-400 to-amber-500 shadow-yellow-400/20';
    return 'from-slate-500 to-slate-700 shadow-slate-500/20';
};

export default function PoojaListingClient({ initialPujas, initialCategories, initialBlogs }: PoojaListingClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(12);
    const [sortBy, setSortBy] = useState('Most Popular');
    const [priceFilter, setPriceFilter] = useState('Price: All');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);

    const sortOptions = ['Most Popular', 'Price: Low to High', 'Price: High to Low', 'Name: A-Z'];
    const priceOptions = ['Price: All', 'Under ₹5,001', '₹5,001 - ₹15,000', 'Above ₹15,000'];

    const filteredPujas = useMemo(() => {
        let result = initialPujas.filter(puja => {
            const matchesSearch = puja.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 puja.desc.toLowerCase().includes(searchQuery.toLowerCase());
            
            const pujaCat = (puja.category || '').trim().toLowerCase();
            const targetCat = (activeCategory || '').trim().toLowerCase();
            const matchesCategory = targetCat === 'all' || targetCat === 'all pujas' || pujaCat === targetCat;

            // Price Filter Logic
            let matchesPrice = true;
            if (priceFilter === 'Under ₹5,001') matchesPrice = puja.price <= 5000;
            else if (priceFilter === '₹5,001 - ₹15,000') matchesPrice = puja.price > 5000 && puja.price <= 15000;
            else if (priceFilter === 'Above ₹15,000') matchesPrice = puja.price > 15000;

            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Sorting Logic
        if (sortBy === 'Price: Low to High') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'Price: High to Low') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'Name: A-Z') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            // Default: Most Popular (Image Priority)
            const currentCat = (activeCategory || '').trim().toLowerCase();
            if (currentCat === 'all' || currentCat === 'all pujas') {
                result.sort((a, b) => {
                    const aIsBad = a.isPlaceholder;
                    const bIsBad = b.isPlaceholder;
                    if (!aIsBad && bIsBad) return -1;
                    if (aIsBad && !bIsBad) return 1;
                    return 0; 
                });
            }
        }

        return result;
    }, [initialPujas, searchQuery, activeCategory, sortBy, priceFilter]);

    const visiblePujas = filteredPujas.slice(0, visibleCount);
    const hasMore = filteredPujas.length > visibleCount;

    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden pb-24">
            <CosmicBackground />
            <FireParticles />
            <EmberParticles />
            <UnifiedPujaBackground />
            
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 py-12 md:py-20">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center text-center mb-12 max-w-4xl mx-auto">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black font-serif mb-6 leading-tight"
                    >
                        Sacred Rituals for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Divine Alignment</span>
                    </motion.h1>
                    <p className="text-muted-foreground text-base md:text-lg font-medium max-w-2xl">
                        Experience the power of authentic Vedic traditions performed by certified Pandits.
                    </p>
                </div>

                {/* 1. New Search & Filter Console - Matching Screenshot */}
                <div className="bg-[#1a222e]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 mb-16 shadow-2xl relative">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
                        {/* Search Bar */}
                        <div className="relative w-full lg:max-w-md group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-500 group-hover:text-orange-500 transition-colors" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search divine rituals..." 
                                className="block w-full bg-[#0f172a]/80 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Dropdowns Console */}
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:flex-none">
                                <button 
                                    onClick={() => { setIsSortOpen(!isSortOpen); setIsPriceOpen(false); }}
                                    className={`flex items-center justify-between gap-3 bg-[#0f172a]/80 border ${isSortOpen ? 'border-orange-500/50 ring-2 ring-orange-500/20' : 'border-white/10'} rounded-xl px-4 py-3 text-xs font-black text-slate-300 w-full hover:border-white/20 transition-all`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Sun className={`w-3.5 h-3.5 ${isSortOpen ? 'text-orange-500 animate-spin-slow' : 'text-orange-500'}`} />
                                        {sortBy}
                                    </div>
                                    <Filter className="w-3.5 h-3.5 text-slate-500" />
                                </button>
                                
                                <AnimatePresence>
                                    {isSortOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
                                        >
                                            {sortOptions.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                                                    className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors ${sortBy === opt ? 'text-orange-500 bg-orange-500/5' : 'text-slate-400'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="relative flex-1 lg:flex-none">
                                <button 
                                    onClick={() => { setIsPriceOpen(!isPriceOpen); setIsSortOpen(false); }}
                                    className={`flex items-center justify-between gap-3 bg-[#0f172a]/80 border ${isPriceOpen ? 'border-orange-500/50 ring-2 ring-orange-500/20' : 'border-white/10'} rounded-xl px-4 py-3 text-xs font-black text-slate-300 w-full hover:border-white/20 transition-all`}
                                >
                                    <div className="flex items-center gap-2">
                                        <IndianRupee className="w-3.5 h-3.5 text-orange-500" />
                                        {priceFilter}
                                    </div>
                                    <Filter className="w-3.5 h-3.5 text-slate-500" />
                                </button>

                                <AnimatePresence>
                                    {isPriceOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
                                        >
                                            {priceOptions.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => { setPriceFilter(opt); setIsPriceOpen(false); }}
                                                    className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors ${priceFilter === opt ? 'text-orange-500 bg-orange-500/5' : 'text-slate-400'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Category Pills Row */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button 
                            onClick={() => setActiveCategory('All')}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${activeCategory === 'All' ? 'bg-gradient-to-r from-orange-600 to-orange-400 border-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-white/5 border-white/10 hover:border-orange-500/50 text-slate-400 hover:text-white'}`}
                        >
                            All Pujas
                        </button>
                        {initialCategories.map((cat) => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat ? 'bg-gradient-to-r from-orange-600 to-orange-400 border-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-white/5 border-white/10 hover:border-orange-500/50 text-slate-400 hover:text-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Puja Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-12">
                    {visiblePujas.map((puja, idx) => {
                        const rotatingGradients = [
                            'from-indigo-500 to-purple-600',
                            'from-red-500 to-red-800',
                            'from-emerald-500 to-teal-600',
                            'from-amber-400 to-orange-500',
                            'from-pink-500 to-rose-500',
                            'from-blue-500 to-indigo-600'
                        ];
                        const displayGradient = rotatingGradients[idx % rotatingGradients.length];
                        const colors = extractGradientColors(displayGradient);
                        const gradientId = `border-gradient-${puja.id}`;

                        return (
                            <motion.div
                                key={puja.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: Math.min(idx * 0.05, 0.3),
                                    ease: [0.21, 0.47, 0.32, 0.98]
                                }}
                                className="group relative max-w-[360px] mx-auto w-full"
                            >
                                {/* 3D Glow Effects */}
                                <div className={`absolute -inset-1 bg-gradient-to-t ${displayGradient} rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 z-0`}></div>
                                <div className={`absolute -inset-2 bg-gradient-to-b ${displayGradient} rounded-[32px] blur-[64px] opacity-0 group-hover:opacity-40 transition duration-1000 z-0`}></div>

                                {/* Snake Border SVG */}
                                <svg className="absolute -inset-[2px] -translate-y-[5px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-40">
                                    <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="18" ry="18" fill="none" stroke={`url(#${gradientId})`} strokeWidth="4" strokeDasharray="20 10" className="animate-snake-border" />
                                    <defs>
                                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={colors.from} stopOpacity="0.8" />
                                            <stop offset="50%" stopColor={colors.to} stopOpacity="1" />
                                            <stop offset="100%" stopColor={colors.from} stopOpacity="0.8" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Red Special Offer Badge */}
                                {(puja as any).is_special_offer && (
                                    <div className="absolute top-0 left-0 z-50 -translate-x-1/4 -translate-y-1/4 pointer-events-none transition-all duration-500 group-hover:-translate-y-[40%] group-hover:rotate-12 group-hover:scale-110">
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative w-24 h-24 flex items-center justify-center">
                                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-[#e11d48] filter drop-shadow-lg">
                                                <path d="M50 0 L55 10 L65 5 L68 16 L79 13 L79 24 L90 24 L87 35 L97 40 L91 50 L100 60 L89 65 L92 76 L81 77 L81 88 L70 86 L65 96 L55 91 L50 100 L45 91 L35 96 L30 86 L20 88 L19 77 L8 76 L11 65 L0 60 L9 50 L3 40 L13 35 L10 24 L21 24 L21 13 L32 16 L35 5 L45 10 Z" />
                                                {/* Stitched Border */}
                                                <path 
                                                    d="M50 10 L54 18 L62 14 L64 22 L73 20 L73 29 L82 29 L80 37 L88 41 L83 49 L90 57 L81 61 L84 70 L75 71 L75 80 L66 78 L62 86 L54 82 L50 89 L46 82 L38 86 L34 78 L25 80 L25 71 L16 70 L19 61 L10 57 L17 49 L12 41 L20 37 L18 29 L27 29 L27 20 L36 22 L38 14 L46 18 Z" 
                                                    fill="none" 
                                                    stroke="white" 
                                                    strokeWidth="1" 
                                                    strokeDasharray="2 2" 
                                                    className="opacity-40"
                                                />
                                            </svg>
                                            <div className="relative z-10 flex flex-col items-center justify-center text-white text-center leading-tight">
                                                <span className="text-[10px] font-black opacity-90 mb-0.5">मात्र</span>
                                                <span className="text-xl md:text-2xl font-black tracking-tighter">₹{puja.special_offer_price}</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}

                                <Link href={`/pooja-services/${puja.slug}`} className="block group/card h-full">
                                    <div className={`relative h-full bg-card/95 dark:bg-card/90 backdrop-blur-md text-card-foreground rounded-2xl p-4 flex flex-col transition-all duration-500 shadow-md border border-white/10 group-hover/card:-translate-y-2 group-hover/card:shadow-xl z-10`}>
                                        
                                        <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2">
                                            {(puja.tags && puja.tags.length > 0 ? puja.tags : ['Vedic Ritual']).slice(0, 1).map((tag, i) => (
                                                <div key={i} className="relative">
                                                    <div className={`absolute inset-0 blur-md rounded-full opacity-50 bg-gradient-to-r ${getTagStyle(tag).split(' ')[0]} ${getTagStyle(tag).split(' ')[1]}`}></div>
                                                    <span className={`relative px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] text-white bg-gradient-to-r shadow-lg ${getTagStyle(tag)}`}>
                                                        {tag}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className={`relative w-full aspect-[2/1] mb-4 rounded-xl overflow-hidden bg-white/5 dark:bg-slate-900/50 border border-white/10 group-hover/card:border-white/40 transition-colors flex items-center justify-center`}>
                                            <Image 
                                                src={puja.image} 
                                                alt={puja.name} 
                                                fill 
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className={`object-cover transition-all duration-700 group-hover/card:scale-110 ${puja.isPlaceholder ? 'opacity-40 grayscale blur-[2px] group-hover/card:opacity-60 group-hover/card:blur-0' : 'opacity-100'}`}
                                                loading={idx < 6 ? "eager" : "lazy"}
                                            />
                                            {puja.isPlaceholder && (
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <div className="w-12 h-12 rounded-full bg-orange-500/10 backdrop-blur-md flex items-center justify-center shadow-2xl border border-orange-500/20">
                                                        <span className="text-2xl animate-pulse">🕉️</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <h3 className={`text-xl font-black font-serif mb-1 line-clamp-1 group-hover/card:text-orange-500 transition-colors`}>
                                                {puja.name}
                                            </h3>
                                            <p className="text-muted-foreground font-medium mb-4 leading-relaxed text-[13px] line-clamp-2">
                                                {puja.desc}
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex flex-nowrap gap-1.5 overflow-x-hidden">
                                                {puja.benefits.slice(0, 3).map((benefit, i) => (
                                                    <span key={i} className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide bg-secondary/40 border border-border/30 text-muted-foreground flex items-center gap-1 shrink-0">
                                                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${displayGradient}`}></div>
                                                        {benefit}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <div className={`group/btn relative inline-flex items-center justify-center w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 bg-[length:200%_auto] bg-right group-hover/card:bg-left transition-all duration-500 shadow-md overflow-hidden`}>
                                                <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                                                <span className="relative z-10 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                    Book Now <ArrowRight className="w-4 h-4 group-hover/card:translate-x-1 transition-transform" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View More Button */}
                {hasMore && (
                    <div className="text-center mt-12 mb-20">
                        <button onClick={() => setVisibleCount(prev => prev + 12)} className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:border-orange-500 transition-all duration-300">
                            View More Pujas <ArrowRight className="w-3 h-3 ml-2 inline-block" />
                        </button>
                    </div>
                )}

                {/* Latest Insights - Integrated Icon Card Design */}
                <section className="border-t border-border/50 pt-20">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-black font-serif text-white">Latest Insights</h2>
                        <Link href="/blog" className="text-orange-500 font-bold text-sm hover:underline flex items-center gap-2">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {initialBlogs.map((blog, idx) => {
                            const blogGradients = [
                                'from-orange-600 to-red-600',
                                'from-blue-500 to-indigo-600',
                                'from-emerald-500 to-teal-600'
                            ];
                            const cardGradient = blogGradients[idx % blogGradients.length];
                            
                            // Simple icon mapping based on title/category
                            const getBlogIcon = (title: string) => {
                                const t = title.toLowerCase();
                                if (t.includes('satyanarayan')) return '🕉️';
                                if (t.includes('kaal sarp')) return '🐍';
                                if (t.includes('rudra')) return '🔱';
                                return '✨';
                            };

                            return (
                                <Link 
                                    key={idx} 
                                    href={`/blog/${blog.slug}`} 
                                    className="group relative bg-[#1a222e] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10"
                                >
                                    {/* Colored Top Border */}
                                    <div className={`h-2 w-full bg-gradient-to-r ${cardGradient}`}></div>
                                    
                                    {/* Blog Image Section */}
                                    <div className="relative aspect-[21/9] overflow-hidden">
                                        <Image 
                                            src={blog.image_url || '/diya.png'} 
                                            alt={blog.title} 
                                            fill 
                                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a222e] to-transparent opacity-60"></div>
                                        
                                        {/* Floating Icon */}
                                        <div className="absolute bottom-4 left-8">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-xl">
                                                {getBlogIcon(blog.title)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 pt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            {/* Category Badge */}
                                            <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-slate-400 group-hover:text-white transition-colors">
                                                {blog.category}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-black font-serif mb-3 line-clamp-2 text-white group-hover:text-orange-500 transition-colors leading-tight">
                                            {blog.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm line-clamp-2 mb-8 font-medium leading-relaxed opacity-70">
                                            {blog.excerpt}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                                <Clock className="w-4 h-4" />
                                                {idx % 3 + 4} min read
                                            </div>
                                            <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 group-hover:translate-x-1 transition-transform font-serif">
                                                Read More <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
            
            <SpiritualFamilySection />
        </main>
    );
}
