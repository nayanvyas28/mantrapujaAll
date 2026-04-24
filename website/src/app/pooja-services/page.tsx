'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, ArrowRight, Star, Sun, Clock, Calendar, BadgeCheck, MapPin, Video, Headphones, Zap, Gift, IndianRupee } from 'lucide-react';
import { CustomDropdown } from '@/components/CustomDropdown';
import FireParticles from '@/components/FireParticles';
import EmberParticles from '@/components/EmberParticles';
import { CosmicBackground } from '@/components/CosmicBackground';
import { UnifiedPujaBackground } from '@/components/UnifiedPujaBackground';
import { useLoading } from "@/context/LoadingContext";
import SpiritualFamilySection from "@/components/home/SpiritualFamilySection";
import BookingPackagesPopup from "@/components/BookingPackagesPopup";

const backgroundIcons = [
    "/zodiac/aquarius.png", "/zodiac/aries.png", "/zodiac/cancer.png", "/zodiac/capricorn.png",
    "/zodiac/leo.png", "/zodiac/libra.png", "/zodiac/pisces.png",
    "/zodiac/sagittarius.png", "/zodiac/scorpio.png", "/zodiac/taurus.png", "/zodiac/virgo.png",
    "/om.png", "/premium-loader.png", "/kalasha.png", "/premium-loader.png",
    "/diya.png", "/temple.png", "/sun.png", "/moon.png"
];

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

// --- VISUAL ASSETS & DATA ---
// --- DYNAMIC DATA FETCHING ---
import { supabase } from '@/lib/supabaseClient';
import { getUiConfig, UiConfig } from '@/lib/uiMapping';

interface Puja extends UiConfig {
    id: string;
    name: string;
    slug: string;
    category?: string;
    image: string;
    desc: string;
    benefits: string[];
    price: number;
    display_price?: number;
    packages?: any[];
    tags?: string[];
}

interface DatabasePooja {
    id: string;
    name: string;
    slug: string;
    images?: string[];
    description?: string;
    about_description?: string;
    tagline?: string;
    benefits: string[];
    price: number;
    display_price?: number;
    packages?: any[];
    tags?: string[];
}

// Helper for Tag Colors - Vibrant Gradient Style (Badge Look)
const getTagStyle = (tag: string): string => {
    const t = tag.toLowerCase();

    // 1. WEALTH (Pink/Rose)
    if (t.includes('wealth') || t.includes('lakshmi') || t.includes('prosperity') || t.includes('finance'))
        return 'from-pink-500 to-rose-500 shadow-rose-500/20';

    // 2. SHIVA / MOKSHA (Indigo/Violet)
    if (t.includes('shiva') || t.includes('rudra') || t.includes('moksha') || t.includes('liberation'))
        return 'from-indigo-500 to-violet-600 shadow-indigo-500/20';

    // 3. GANESH / SUCCESS (Amber/Orange)
    if (t.includes('ganesh') || t.includes('success') || t.includes('career') || t.includes('obstacle'))
        return 'from-amber-400 to-orange-500 shadow-amber-500/20';

    // 4. HANUMAN / POWER (Deep Red / Crimson) - Distinct from Default
    if (t.includes('hanuman') || t.includes('courage') || t.includes('power') || t.includes('strength') || t.includes('victory'))
        return 'from-red-600 to-rose-700 shadow-red-500/20';

    // 5. SHANI / PROTECTION (Blue/Dark Blue)
    if (t.includes('shani') || t.includes('protection') || t.includes('dosha') || t.includes('negativity') || t.includes('planetary'))
        return 'from-blue-600 to-indigo-700 shadow-blue-500/20';

    // 6. LOVE / MARRIAGE (Pink/Rose)
    if (t.includes('love') || t.includes('marriage') || t.includes('relationship') || t.includes('harmony') && !t.includes('peace'))
        return 'from-rose-400 to-pink-500 shadow-rose-500/20';

    // 7. PEACE / FAMILY (Sky Blue / Cyan) - Distinct!
    if (t.includes('peace') || t.includes('family') || t.includes('calm') || t.includes('mind') || t.includes('harmony'))
        return 'from-sky-400 to-cyan-500 shadow-sky-500/20';

    // 8. HEALTH (Emerald/Teal)
    if (t.includes('health') || t.includes('healing') || t.includes('wellness') || t.includes('life'))
        return 'from-emerald-400 to-teal-600 shadow-emerald-500/20';

    // 9. SARASWATI / EDUCATION (Yellow/Gold)
    if (t.includes('saraswati') || t.includes('education') || t.includes('knowledge') || t.includes('wisdom'))
        return 'from-yellow-400 to-amber-500 shadow-yellow-500/20 text-black'; // Black text for contrast on yellow

    // 10. ANCESTRAL (Stone/Gray)
    if (t.includes('ancestral') || t.includes('pitra'))
        return 'from-stone-500 to-stone-700 shadow-stone-500/20';

    // Default (Saffron/Orange)
    return 'from-orange-500 to-amber-600 shadow-orange-500/20';
};


const CATEGORIES = [
    'All Pujas', 'Rituals', 'Dosh Nivaran', 'Career & Business', 'Health & Peace', 'Festival'
];

const BLOGS = [
    {
        title: "Importance of Satyanarayan Puja",
        excerpt: "Why this ritual is essential for every Hindu household.",
        readTime: "5 min read",
        category: "Rituals",
        icon: "🕉️",
        gradient: "from-orange-500 to-red-600"
    },
    {
        title: "Understanding Kaal Sarp Dosh",
        excerpt: "Symptoms, remedies, and the science behind this astrological condition.",
        readTime: "7 min read",
        category: "Astrology",
        icon: "🐍",
        gradient: "from-blue-500 to-indigo-600"
    },
    {
        title: "Benefits of Rudra Abhishek",
        excerpt: "How invoke Lord Shiva's blessings for health and longevity.",
        readTime: "4 min read",
        category: "Health",
        icon: "🔱",
        gradient: "from-emerald-500 to-teal-600"
    }
];

export default function PoojaServicesPage() {
    const [pujas, setPujas] = useState<Puja[]>([]);
    const [loading, setLoading] = useState(true);
    const { setIsLoading } = useLoading();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Pujas');
    const [visibleCount, setVisibleCount] = useState(9);
    const [sortBy, setSortBy] = useState('popularity');
    const [priceFilter, setPriceFilter] = useState('all');

    // Booking Popup State
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedPujaForBooking, setSelectedPujaForBooking] = useState<Puja | null>(null);

    const handleBookNow = (puja: Puja) => {
        setSelectedPujaForBooking(puja);
        setIsBookingOpen(true);
    };

    const handlePackageSelect = (pkg: any) => {
        if (!selectedPujaForBooking) return;

        const message = `Namaste, I want to book ${selectedPujaForBooking.name}.\n\nSelected Package: ${pkg.name}\nPrice: ₹${pkg.price}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/918989271245?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        setIsBookingOpen(false);
    };

    useEffect(() => {
        const fetchPujas = async () => {
            try {
                const { data, error } = await supabase
                    .from('poojas')
                    .select('*')
                    .eq('is_active', true);

                if (error) throw error;

                let mappedPujas: Puja[] = [];
                if (data) {
                    mappedPujas = (data as unknown as DatabasePooja[]).map((item) => {
                        const uiConfig = getUiConfig(item.slug);
                        return {
                            ...uiConfig,
                            id: item.id,
                            name: item.name,
                            slug: item.slug,
                            image: (item.images && item.images.length > 0) ? item.images[0] : (uiConfig.slug === 'satyanarayan-puja' ? 'https://m.media-amazon.com/images/I/51RWFX3n4nL._AC_UF1000,1000_QL80_.jpg' : '/diya.png'),
                            desc: item.description || item.about_description || item.tagline || '',
                            benefits: item.benefits || [],
                            price: item.price,
                            display_price: item.display_price,
                            packages: item.packages,
                            category: item.slug.includes('festival') ? 'Festival' : 'Rituals',
                            tags: item.tags || []
                        };
                    });
                }


                setPujas(mappedPujas);
            } catch (error) {
                console.error('Error fetching pujas:', error);
            } finally {
                setLoading(false);
                setIsLoading(false);
            }
        };

        setIsLoading(true);
        fetchPujas();
    }, []);

    const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
        <div className="text-center mb-10 md:mb-16 relative z-10">
            {subtitle && (
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-saffron/50"></div>
                    <span className="text-saffron font-bold tracking-[0.2rem] md:tracking-[0.2em] uppercase text-[10px] md:text-xs">{subtitle}</span>
                    <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-saffron/50"></div>
                </div>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-saffron via-gold to-saffron bg-[length:200%_auto] animate-gradient mb-4 md:mb-6 py-3 px-4" style={{ fontFamily: 'Georgia, serif' }}>
                {children}
            </h2>
        </div>
    );

    const filteredPujas = useMemo(() => {
        const result = pujas.filter(puja => {
            const matchesSearch = (puja.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (puja.desc || '').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All Pujas' || puja.category === selectedCategory;

            let matchesPrice = true;
            if (priceFilter === 'under-5000') matchesPrice = (puja.display_price || puja.price) < 5000;
            if (priceFilter === '5000-10000') matchesPrice = (puja.display_price || puja.price) >= 5000 && (puja.display_price || puja.price) <= 10000;
            if (priceFilter === 'above-10000') matchesPrice = (puja.display_price || puja.price) > 10000;

            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Sorting
        if (sortBy === 'price-low') {
            result.sort((a, b) => (a.display_price || a.price) - (b.display_price || b.price));
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => (b.display_price || b.price) - (a.display_price || a.price));
        } else {
            // Default: Popularity (Featured first, then ID)
            result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        return result;
    }, [pujas, searchQuery, selectedCategory, sortBy, priceFilter]);

    const visiblePujas = filteredPujas.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPujas.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 9, filteredPujas.length));
    };

    if (loading) {
        return null; // Handled by global LoadingScreen in ClientLayout
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
            {/* Unified Background with Animations */}
            <UnifiedPujaBackground />

            <div className="relative z-10 pt-10 pb-20 container mx-auto px-2 md:px-6 max-w-[1450px]">

                {/* Header Section */}
                <div className="text-center max-w-6xl mx-auto mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest mb-2 border border-orange-100 dark:border-orange-800/50">
                        Sacred Rituals
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-3 leading-snug text-foreground tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                        Browse Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 animate-gradient whitespace-nowrap py-2">Divine Pujas</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                        Explore our collection of authentic Vedic rituals performed by experienced pandits for your spiritual well-being.
                    </p>
                </div>

                {/* Modern Filter Bar with Golden Glow - STATIC (No Sticky) */}
                <div className="relative z-40 bg-card/80 dark:bg-card/80 backdrop-blur-md border border-border/40 dark:border-border/10 rounded-2xl shadow-[0_8px_32_rgba(249,115,22,0.05)] dark:shadow-xl p-6 mb-12 max-w-[1450px] mx-auto transition-all duration-300 ring-1 ring-black/5 hover:shadow-[0_8px_32px_rgba(249,115,22,0.1)] hover:border-saffron/20">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">

                        {/* Search Input */}
                        <div className="relative w-full md:flex-1 lg:max-w-2xl group">
                            <input
                                type="text"
                                placeholder="Search divine rituals..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(9); }}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-orange-100/50 dark:border-slate-700/50 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-muted-foreground/70 text-foreground font-medium shadow-inner"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-saffron transition-colors" />
                        </div>

                        {/* Filters & Sort Container */}
                        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">

                            {/* Sort Dropdown */}
                            <div className="w-full sm:w-auto min-w-[180px]">
                                <CustomDropdown
                                    value={sortBy}
                                    onChange={setSortBy}
                                    options={[
                                        { value: "popularity", label: "Most Popular" },
                                        { value: "price-low", label: "Price: Low to High" },
                                        { value: "price-high", label: "Price: High to Low" }
                                    ]}
                                    icon={<Sun className="w-4 h-4" />}
                                />
                            </div>

                            {/* Price Filter */}
                            <div className="w-full sm:w-auto min-w-[180px]">
                                <CustomDropdown
                                    value={priceFilter}
                                    onChange={setPriceFilter}
                                    options={[
                                        { value: "all", label: "Price: All" },
                                        { value: "under-5000", label: "Under ₹5,000" },
                                        { value: "5000-10000", label: "₹5,000 - ₹10,000" },
                                        { value: "above-10000", label: "Above ₹10,000" }
                                    ]}
                                    icon={<span className="font-bold text-xs">₹</span>}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Category Pills - Centered & Polished */}
                    <div className="mt-8 pt-6 border-t border-border/30 overflow-x-auto pb-2 no-scrollbar flex md:justify-center">
                        <div className="flex gap-3">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setSelectedCategory(cat); setVisibleCount(9); }}
                                    className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border backdrop-blur-md ${selectedCategory === cat
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg shadow-orange-500/30 scale-105 transform-gpu ring-2 ring-orange-200 dark:ring-orange-900/50'
                                        : 'bg-white/40 dark:bg-slate-800/40 text-muted-foreground border-orange-100/50 dark:border-slate-700 hover:bg-white hover:text-foreground hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>



                {/* Puja Grid - Premium "Snake Border" Style (Replicated from Homepage) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
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
                            <div key={puja.id} className="group relative">
                                {/* 3D Glow Effect Behind Card - Enhanced for "Behind" hover feeling */}
                                <div className={`absolute -inset-1 bg-gradient-to-t ${displayGradient} rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-300 z-0`}></div>
                                <div className={`absolute -inset-2 bg-gradient-to-b ${displayGradient} rounded-[32px] blur-[64px] opacity-0 group-hover:opacity-40 transition duration-1000 group-hover:duration-500 z-0`}></div>

                                {/* Background Layer for Hover color (Behind the card) */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${displayGradient} rounded-[32px] opacity-0 group-hover:opacity-[0.15] dark:group-hover:opacity-[0.25] transition-all duration-500 scale-95 group-hover:scale-105 z-0 blur-md`}></div>

                                <div className={`relative h-full bg-card/95 dark:bg-card/90 backdrop-blur-md text-card-foreground rounded-[32px] p-6 flex flex-col transition-all duration-500 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-white/20 dark:border-white/5 group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden z-10`}>
                                    {/* Subtle Content Accent */}
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${displayGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                    {/* Animated Snake Border SVG */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ zIndex: 10 }}>
                                        <rect
                                            x="2"
                                            y="2"
                                            width="calc(100% - 4px)"
                                            height="calc(100% - 4px)"
                                            rx="32"
                                            ry="32"
                                            fill="none"
                                            stroke={`url(#${gradientId})`}
                                            strokeWidth="3"
                                            strokeDasharray="20 10"
                                            className="animate-snake-border"
                                            style={{ strokeDashoffset: 1000 }}
                                        />
                                        <defs>
                                            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor={colors.from} stopOpacity="0.8" />
                                                <stop offset="50%" stopColor={colors.to} stopOpacity="1" />
                                                <stop offset="100%" stopColor={colors.from} stopOpacity="0.8" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Top Badge - Floating - Replaced by Tags */}
                                    <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2 text-right">

                                        {/* Original Badge if exists */}
                                        {puja.badge && (
                                            <div className="relative">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] text-white bg-gradient-to-r ${puja.gradient || 'from-orange-500 to-red-600'} shadow-lg shadow-orange-500/20`}>
                                                    {puja.badge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Dynamic Tags */}
                                        {(puja.tags && puja.tags.length > 0 ? puja.tags : ['Vedic Ritual']).slice(0, 1).map((tag, i) => (
                                            <div key={i} className="relative">
                                                <div className={`absolute inset-0 blur-md rounded-full opacity-50 bg-gradient-to-r ${getTagStyle(tag).split(' ')[0]} ${getTagStyle(tag).split(' ')[1]}`}></div>
                                                <span className={`relative px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] text-white bg-gradient-to-r shadow-lg ${getTagStyle(tag)}`}>
                                                    {tag}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Clickable Area for Navigation */}
                                    <Link href={`/pooja-services/${puja.slug}`} className="block group/content">
                                        {/* 1. Image Container (Rectangle First) */}
                                        <div className={`relative w-full h-48 mb-6 rounded-2xl overflow-hidden bg-white/50 dark:bg-slate-900/50 border border-white/10 group-hover/content:border-white/40 transition-colors`}>
                                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                                <img
                                                    src={puja.image}
                                                    alt={puja.name}
                                                    className="w-full h-full object-contain drop-shadow-md transition-transform duration-700 group-hover/content:scale-110"
                                                />
                                            </div>
                                            {/* Dynamic color accent inside image container on hover */}
                                            <div className={`absolute inset-0 bg-gradient-to-tr ${displayGradient} opacity-0 group-hover/content:opacity-10 transition-opacity duration-500`}></div>
                                        </div>

                                        {/* 2. Headings & Colored Text */}
                                        <div className="mb-4">
                                            <h3 className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80 group-hover/content:bg-gradient-to-r ${prefixGradient(displayGradient, 'group-hover/content')} transition-all duration-300 mb-2 leading-tight`} style={{ fontFamily: 'Georgia, serif' }}>
                                                {puja.name}
                                            </h3>

                                            <p className="text-muted-foreground font-medium mb-6 leading-relaxed text-sm line-clamp-2 group-hover/content:text-foreground/80 transition-colors">
                                                {puja.desc}
                                            </p>
                                        </div>
                                    </Link>

                                    {/* 3. Benefits (Outcomes) - Single Row Pills */}
                                    <div className="mb-6">
                                        <div className="flex flex-nowrap gap-1.5 overflow-x-hidden">
                                            {puja.benefits.slice(0, 3).map((benefit, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide bg-secondary/40 border border-border/30 text-muted-foreground flex items-center gap-1 shrink-0 whitespace-nowrap">
                                                    <div className={`w-1 h-1 shrink-0 rounded-full bg-gradient-to-r ${displayGradient}`}></div>
                                                    {benefit}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Spacer */}
                                    <div className="mt-auto"></div>

                                    {/* 4. Action Button - Attractive Glow */}
                                    <button
                                        onClick={() => handleBookNow(puja)}
                                        className={`group/btn relative inline-flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 bg-[length:200%_auto] bg-right hover:bg-left transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden`}
                                    >
                                        {/* Inner Glow */}
                                        <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>

                                        <span className="relative z-10 text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                            Book Now <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Load More Button */}
                {hasMore && (
                    <div className="text-center mb-20">
                        <button
                            onClick={handleLoadMore}
                            className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-full font-bold text-slate-700 dark:text-white shadow-sm hover:border-orange-500 hover:text-orange-600 transition-all duration-300 overflow-hidden"
                        >

                            <span className="relative z-10 flex items-center gap-2">
                                View More Pujas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                )}


                {/* Blog Section */}
                <section className="border-t border-border/50 pt-20">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-black font-serif">Latest Insights</h2>
                        <Link href="/blog" className="text-saffron font-bold hover:underline flex items-center gap-2">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {BLOGS.map((blog, idx) => (
                            <Link
                                key={idx}
                                href="/blog"
                                className="group relative bg-card rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-saffron/50 block cursor-pointer"
                            >
                                <div className={`h-2 bg-gradient-to-r ${blog.gradient}`}></div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{blog.icon}</span>
                                        <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-wider">{blog.category}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-saffron transition-colors duration-300 font-serif">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                                        {blog.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                                            <Clock className="w-4 h-4" /> {blog.readTime}
                                        </span>
                                        <span className="text-saffron font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-saffron/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

            <SpiritualFamilySection />

            {/* Direct Booking Popup */}
            {selectedPujaForBooking && (
                <BookingPackagesPopup
                    isOpen={isBookingOpen}
                    onClose={() => setIsBookingOpen(false)}
                    pujaName={selectedPujaForBooking.name}
                    packages={selectedPujaForBooking.packages || []}
                    onSelect={handlePackageSelect}
                />
            )}
        </div>
    );
}
