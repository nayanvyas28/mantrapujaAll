'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map as MapIcon, Grid, List, Sparkles, ChevronDown, ArrowRight, Filter, IndianRupee, MapPin, Compass } from 'lucide-react';
import IndiaMap from '../../components/IndiaMap';
import { createClient } from '@supabase/supabase-js';
import { locations as staticLocations, Location, LocationType } from '../../data/spiritual-locations';
import { MOCK_BLOGS } from '../../data/blog-data';
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import { useLoading } from "@/context/LoadingContext";
import { CustomDropdown } from '@/components/CustomDropdown';
import SpiritualFamilySection from "@/components/home/SpiritualFamilySection";

const filters: { label: string; value: LocationType; count: number; desc: string }[] = [
    { label: "Char Dham", value: "Char Dham", count: 4, desc: "Cardinal Directions" },
    { label: "Jyotirlinga", value: "Jyotirlinga", count: 12, desc: "Radiant Signs of Shiva" },
    { label: "Shakti Peeth", value: "Shakti Peeth", count: 51, desc: "Seats of Power" },
    { label: "Kumbh Mela", value: "Kumbh Mela", count: 4, desc: "Sacred Gatherings" },
];

export default function LocationsPage() {
    const [mapFilter, setMapFilter] = useState<LocationType | 'All'>('All');
    const [listFilter, setListFilter] = useState<LocationType | 'All'>('All');
    const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [listSearchQuery, setListSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);
    const [isMobile, setIsMobile] = useState(false);
    const [dynamicLocations, setDynamicLocations] = useState<Location[]>([]);
    const [dynamicBlogs, setDynamicBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { setIsLoading } = useLoading();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

                // 1. Fetch Destinations - From new destinations table
                const { data: destData, error: destError } = await supabase
                    .from('destinations')
                    .select('*')
                    .eq('is_featured', true)
                    .order('created_at', { ascending: false });

                if (destError) {
                    console.error('Error fetching destinations:', destError);
                }

                if (destData && destData.length > 0) {
                    // Map database fields to component format
                    const mapped = destData.map((dbDest: any) => {
                        // 1. Fix common typos and normalize names
                        let name = dbDest.name;
                        if (name === 'Chandigrah') name = 'Chandigarh';
                        if (name === 'Varnasi') name = 'Varanasi';

                        // 2. Determine base coordinates
                        let x = dbDest.x;
                        let y = dbDest.y;

                        // 3. Fallback logic for missing coordinates
                        if (!x || !y) {
                            const stateCenters: Record<string, { x: number, y: number }> = {
                                'ut': { x: 240, y: 160 }, 'gj': { x: 70, y: 350 }, 'or': { x: 350, y: 410 },
                                'tn': { x: 220, y: 600 }, 'up': { x: 270, y: 250 }, 'mh': { x: 150, y: 430 },
                                'as': { x: 500, y: 260 }, 'mp': { x: 220, y: 320 }, 'br': { x: 360, y: 280 },
                                'rj': { x: 150, y: 260 }, 'ap': { x: 250, y: 500 }, 'ka': { x: 180, y: 520 },
                                'kl': { x: 170, y: 620 }, 'wb': { x: 420, y: 330 }, 'jh': { x: 360, y: 320 },
                                'ct': { x: 290, y: 400 }, 'tg': { x: 230, y: 460 }, 'pb': { x: 170, y: 160 },
                                'hr': { x: 190, y: 180 }, 'dl': { x: 195, y: 200 }, 'hp': { x: 210, y: 140 },
                                'jk': { x: 180, y: 80 }, 'lk': { x: 220, y: 80 }, 'sk': { x: 424, y: 236 },
                                'tr': { x: 493, y: 324 }, 'ml': { x: 487, y: 281 }, 'mn': { x: 536, y: 301 },
                                'nl': { x: 548, y: 273 }, 'mz': { x: 516, y: 335 }, 'an': { x: 520, y: 602 },
                                'ch': { x: 180, y: 161 }
                            };
                            const center = stateCenters[dbDest.state_id?.toLowerCase() || 'in'] || { x: 306, y: 348 };
                            x = x || center.x;
                            y = y || center.y;
                        }

                        // Get image from images array or use fallback
                        const image = (dbDest.images && dbDest.images.length > 0)
                            ? dbDest.images[0]
                            : '/logo.png';

                        return {
                            id: dbDest.id,
                            name: name,
                            slug: dbDest.slug,
                            description: dbDest.description || '',
                            image: image,
                            type: (dbDest.type || 'All') as LocationType,
                            stateId: dbDest.state_id || 'IN',
                            x: x,
                            y: y,
                            size: dbDest.size === 15 ? 'large' :
                                dbDest.size >= 12 ? 'medium' : 'small'
                        } as Location;
                    });
                    setDynamicLocations(mapped);
                } else {
                    // No data from database
                    console.log('No destinations found in database');
                    setDynamicLocations([]);
                }

                // 2. Fetch Blogs
                const { data: bData } = await supabase
                    .from('blogs')
                    .select('*')
                    .limit(3);

                if (bData) setDynamicBlogs(bData);

            } catch (error) {
                console.error("Failed to fetch dynamic data:", error);
                setDynamicLocations([]);
            } finally {
                setLoading(false);
                setIsLoading(false);
            }
        };
        setIsLoading(true);
        fetchData();
    }, []);

    const gradients = [
        "from-orange-500 to-red-600",
        "from-amber-500 to-orange-600",
        "from-yellow-500 to-amber-600"
    ];

    const icons = ["✨", "🕉️", "🪔"];

    const cityBlogs = useMemo(() => {
        if (dynamicBlogs.length > 0) return dynamicBlogs;
        // Filter blogs that are in "Sacred Places & Yatra" category or have relevant tags
        return MOCK_BLOGS.filter(blog =>
            blog.category === "Sacred Places & Yatra" ||
            blog.tags.some(tag => ["Char Dham", "Banaras", "Shiva", "Pilgrimage", "Ujjain", "Kedarnath", "Himalayas"].includes(tag))
        ).slice(0, 3);
    }, [dynamicBlogs]);

    const mergedLocations = useMemo(() => {
        const staticWithIds = staticLocations.map(loc => ({ ...loc, isStatic: true }));
        const dynamicWithIds = dynamicLocations.map(loc => ({ ...loc, isStatic: false }));

        // Merge: static locations take precedence for coordinates/placement
        const combined = [...staticWithIds];
        const staticSlugs = new Set(staticWithIds.map(s => s.slug));
        const staticNames = new Set(staticWithIds.map(s => (s.name || '').toLowerCase()));
        
        dynamicWithIds.forEach(d => {
            const lowerName = (d.name || '').toLowerCase();
            const isDuplicate = staticSlugs.has(d.slug) || 
                               staticNames.has(lowerName) ||
                               (d.slug === 'varanasi' && staticSlugs.has('kashi-vishwanath'));

            if (!isDuplicate) {
                combined.push(d);
            }
        });

        return combined;
    }, [dynamicLocations]);

    const filteredMapLocations = useMemo(() => {
        return mergedLocations.filter(loc => {
            return mapFilter === 'All' || loc.type === mapFilter;
        });
    }, [mapFilter, mergedLocations]);

    const filteredListLocations = useMemo(() => {
        return mergedLocations.filter(loc => {
            const matchesType = listFilter === 'All' || loc.type === listFilter;
            const matchesSearch = (loc.name?.toLowerCase() || '').includes(listSearchQuery.toLowerCase()) ||
                (loc.description?.toLowerCase() || '').includes(listSearchQuery.toLowerCase());
            return matchesType && matchesSearch;
        });
    }, [listFilter, listSearchQuery, mergedLocations]);

    const visibleLocations = filteredListLocations.slice(0, visibleCount);
    const hasMore = visibleCount < filteredListLocations.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 6, filteredListLocations.length));
    };

    if (loading) {
        return null; // Handled by global LoadingScreen
    }
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden">
            {/* Unified Background with Animations */}
            <UnifiedPujaBackground />
            {/* 1. Hero Section - Tightened and compensated for fixed header */}
            <section className="relative h-[30vh] md:h-[35vh] flex items-center justify-center overflow-hidden z-20 pt-16 md:pt-20">
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-sm font-bold uppercase tracking-widest mb-4 border border-saffron/20 backdrop-blur-sm">
                            Sacred Geography
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-saffron via-gold to-orange-500 mb-4 drop-shadow-sm leading-snug py-2" style={{ fontFamily: 'Georgia, serif' }}>
                            Spiritual Map of India
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                            Explore the divine landscape of Bharatvarsha, featuring the Char Dhams, 12 Jyotirlingas, 51 Shakti Peeths, and sacred Kumbh Mela sites.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-4 md:py-6 relative z-10" onClick={() => setSelectedLocation(null)}>
                <div className="container mx-auto px-4 max-w-[1400px]">

                    {/* Filters & Legend Grid - Tightened margin */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-8 items-center lg:items-start justify-center">

                        {/* Filters Column */}
                        <div className="flex-1 w-full max-w-4xl">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setMapFilter('All'); }}
                                    className={`relative px-4 py-3 rounded-2xl transition-all duration-300 border ${mapFilter === 'All'
                                        ? 'bg-gradient-to-br from-saffron to-orange-600 border-transparent shadow-lg shadow-orange-500/25 scale-105 text-white'
                                        : 'bg-card border-border hover:border-saffron/50 hover:shadow-md text-foreground'
                                        }`}
                                >
                                    <div className="text-center font-bold font-serif">All Sites</div>
                                    <div className="text-[10px] uppercase tracking-tighter opacity-70">Unified View</div>
                                </button>
                                {filters.map((filter) => (
                                    <button
                                        key={filter.value}
                                        onClick={(e) => { e.stopPropagation(); setMapFilter(filter.value); }}
                                        className={`relative group px-4 py-3 rounded-2xl transition-all duration-300 border ${mapFilter === filter.value
                                            ? 'bg-gradient-to-br from-saffron to-orange-600 border-transparent shadow-lg shadow-orange-500/25 scale-105'
                                            : 'bg-card border-border hover:border-saffron/50 hover:shadow-md'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center">
                                            <span className={`text-sm md:text-base font-bold font-serif ${mapFilter === filter.value ? 'text-white' : 'text-foreground'}`}>
                                                {filter.label}
                                            </span>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${mapFilter === filter.value ? 'bg-white/20 text-white' : 'bg-secondary text-secondary-foreground'}`}>
                                                    {filter.count}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Legend Column */}
                        <div className="hidden lg:flex flex-col gap-2 p-4 bg-card/50 backdrop-blur-sm border border-border rounded-2xl w-64 shadow-inner">
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 mb-2 border-b border-border/50 pb-2">Legend</h3>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"></span>
                                <span className="font-medium">Major Temples</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="w-3 h-3 rounded-full bg-slate-600 shadow-[0_0_8px_rgba(71,85,105,0.4)]"></span>
                                <span className="font-medium">Shiva Shrines</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]"></span>
                                <span className="font-medium">Shakti Energy</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]"></span>
                                <span className="font-medium">Mela Sites</span>
                            </div>
                        </div>
                    </div>

                    {/* Map Container - Optimized for responsiveness */}
                    <div className="relative w-full aspect-[612/696] overflow-visible mt-2 sm:mt-4 mb-8 sm:mb-16 min-h-[450px] sm:min-h-[600px] mx-auto max-w-[612px]">

                        <IndiaMap
                            locations={filteredMapLocations}
                            activeFilter={mapFilter}
                            selectedStateId={selectedLocation?.stateId}
                            onLocationClick={setSelectedLocation}
                        />

                        {/* Click-to-reveal Card - Premium Glassmorphic UI */}
                        <AnimatePresence>
                            {selectedLocation && (
                                <motion.div
                                    key={selectedLocation.id} // Re-animate on location change
                                    initial={{ opacity: 0, scale: 0.85, y: 20, rotateX: 10 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: -10 + (Math.sin(selectedLocation.id) * 8), // Smoother deterministic offset
                                        x: Math.cos(selectedLocation.id) * 12,
                                        rotateX: 0
                                    }}
                                    exit={{ opacity: 0, scale: 0.85, y: 10, rotateX: -5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className={`${isMobile ? 'fixed inset-x-4 bottom-8 top-auto' : 'absolute'} z-[4000] perspective-1000`}
                                    onClick={(e) => e.stopPropagation()}
                                    style={!isMobile ? {
                                        left: `${(selectedLocation.x / 612) * 100}%`,
                                        top: `${(selectedLocation.y / 696) * 100}%`,
                                        transform: 'translate(-50%, -150%)',
                                        width: 'max-content'
                                    } : {}}
                                >
                                    {/* Premium Outer Container - 72 width for compactness, full width on mobile */}
                                    <div className={`relative ${isMobile ? 'w-full' : 'w-72'} bg-white/95 dark:bg-slate-950/95 rounded-[28px] p-0.5 shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_30px_rgba(249,115,22,0.1)] border border-white/50 dark:border-slate-800/50 backdrop-blur-2xl overflow-hidden`}>

                                        {/* Inner Content Component */}
                                        <div className="bg-gradient-to-b from-white to-orange-50/20 dark:from-slate-900 dark:to-slate-950/20 rounded-[26px] p-5">

                                            {/* Header Section */}
                                            <div className="relative mb-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="px-2.5 py-0.5 rounded-full bg-saffron/10 text-saffron text-[10px] font-black uppercase tracking-wider border border-saffron/20">
                                                        {selectedLocation.type}
                                                    </span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedLocation(null);
                                                        }}
                                                        className="p-1.5 rounded-full hover:bg-saffron/10 text-muted-foreground hover:text-saffron transition-all duration-300"
                                                        aria-label="Close"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <Link
                                                    href={`/locations/${selectedLocation.slug}`}
                                                    className="block group/title"
                                                >
                                                    <h4 className="text-2xl font-black text-orange-950 dark:text-orange-50 font-serif leading-none tracking-tight group-hover/title:text-saffron transition-colors">
                                                        {selectedLocation.name}
                                                    </h4>
                                                </Link>
                                                <div className="w-10 h-0.5 bg-saffron/50 rounded-full mt-2"></div>
                                            </div>

                                            {/* Details Section */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-saffron/70">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="text-[10px] font-black tracking-widest uppercase">{selectedLocation.stateId.toUpperCase()}</span>
                                                </div>

                                                <Link
                                                    href={`/locations/${selectedLocation.slug}`}
                                                    className="block bg-saffron/5 p-3 rounded-xl border border-saffron/10 hover:bg-saffron/10 transition-all group/desc"
                                                >
                                                    <p className="text-sm text-foreground/90 font-medium leading-normal italic group-hover/desc:text-saffron transition-colors">
                                                        "{selectedLocation.description}"
                                                    </p>
                                                </Link>
                                            </div>

                                            {/* Bottom Decorative Flow */}
                                            <div className="mt-6 pt-3 border-t border-saffron/10 flex justify-between items-center text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                                                <span>Holy Destination</span>
                                                <div className="flex gap-1.5">
                                                    <div className="w-1 h-1 rounded-full bg-saffron/30"></div>
                                                    <div className="w-1 h-1 rounded-full bg-saffron/10"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Subtle Corner Glow */}
                                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-saffron/10 rounded-full blur-[30px] pointer-events-none"></div>
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="text-center mt-4 mb-12">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/40 backdrop-blur-md text-xs text-muted-foreground border border-border/50 shadow-inner">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron"></span>
                            </span>
                            Explore the sacred terrain of Bharatvarsha • Use the map or filter below to discover sites
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Sacred Destinations Card Grid - Puja Page Style */}
            <section className="py-20 relative z-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-snug font-serif">
                            Sacred <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 animate-gradient py-2">Destinations</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Browse centers of spiritual energy across the subcontinent, from ancient temples to mystical gathering sites.
                        </p>
                    </div>

                    {/* Filter & Search Bar - Puja Page Design */}
                    <div className="relative z-40 bg-card/80 backdrop-blur-md border border-border/40 rounded-2xl p-6 mb-12 max-w-5xl mx-auto shadow-sm ring-1 ring-black/5">
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                            {/* Search */}
                            <div className="relative w-full md:w-80 group">
                                <input
                                    type="text"
                                    placeholder="Search sacred cities..."
                                    value={listSearchQuery}
                                    onChange={(e) => { setListSearchQuery(e.target.value); setVisibleCount(6); }}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-2 border-orange-100/50 dark:border-slate-700/50 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-saffron transition-colors" />
                            </div>

                            {/* Category Pills */}
                            <div className="flex overflow-x-auto pb-2 no-scrollbar gap-2 w-full md:w-auto justify-center">
                                {['All', 'Char Dham', 'Jyotirlinga', 'Shakti Peeth', 'Kumbh Mela'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => { setListFilter(cat as any); setVisibleCount(6); }}
                                        className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border ${listFilter === cat
                                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-md scale-105 transform-gpu'
                                            : 'bg-white/40 dark:bg-slate-800/40 text-muted-foreground border-orange-100/50 dark:border-slate-700 hover:bg-white hover:text-foreground'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card Grid - Puja Page Card Style Without Border Animation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
                        <AnimatePresence mode="popLayout">
                            {visibleLocations.map((loc) => (
                                <motion.div
                                    key={loc.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group relative h-full"
                                >
                                    <div className="relative h-full bg-card/90 dark:bg-card/90 backdrop-blur-md text-card-foreground rounded-[32px] p-6 flex flex-col transition-all duration-500 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] border border-white/20 dark:border-white/5 hover:-translate-y-2">

                                        {/* Image Container */}
                                        <Link href={`/locations/${loc.slug}`} className="block">
                                            <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden bg-white/50 dark:bg-slate-900/50 border border-white/10 group-hover:border-saffron/20 transition-colors flex items-center justify-center cursor-pointer">
                                                <img
                                                    src={loc.image}
                                                    alt={`${loc.name} - ${loc.type} Sacred Site`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = '/logo.png';
                                                    }}
                                                />
                                                {/* Badge */}
                                                <div className="absolute top-4 right-4 z-20">
                                                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm border border-white/20">
                                                        {loc.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Content */}
                                        <div className="mb-6 flex-grow">
                                            <Link href={`/locations/${loc.slug}`} className="block">
                                                <h3 className="text-2xl font-black mb-2 leading-snug font-serif transition-colors group-hover:text-saffron cursor-pointer">
                                                    {loc.name}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest mb-4">
                                                <MapPin className="w-3 h-3 text-saffron" />
                                                {loc.stateId.toUpperCase()}
                                            </div>
                                            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed italic">
                                                "{loc.description}"
                                            </p>
                                        </div>

                                        {/* Action Button - Updated to Local Detail Page */}
                                        <Link
                                            href={`/locations/${loc.slug}`}
                                            className="group/btn relative inline-flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-[length:200%_auto] bg-right hover:bg-left transition-all duration-500 shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.6)] overflow-hidden"
                                        >
                                            <span className="relative z-10 text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                Explore Destination <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Load More */}
                    {hasMore && (
                        <div className="text-center">
                            <button
                                onClick={handleLoadMore}
                                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-card border-2 border-border/50 rounded-full font-bold text-foreground hover:border-saffron hover:text-saffron transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Load More Sites <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* 4. Sacred Insights - Blog Section (Homepage Style) */}
            <section className="py-24 relative overflow-hidden z-10 border-t border-border/50">
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-[0.02]">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-saffron rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-widest mb-6 border border-saffron/20 backdrop-blur-sm">
                            Knowledge Center
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-snug font-serif">
                            Sacred Insights & <span className="text-saffron">Guidance</span>
                        </h2>
                        <p className="text-xl text-muted-foreground font-light leading-relaxed">
                            Discover ancient wisdom and practical guidance for your spiritual journey to Bharat's holiest sites.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cityBlogs.map((blog, idx) => (
                            <Link
                                key={idx}
                                href={`/blog/${blog.slug}`}
                                className="group relative bg-card rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-saffron/50 block cursor-pointer flex flex-col h-full"
                            >
                                {/* Gradient Header */}
                                <div className={`h-2 bg-gradient-to-r ${gradients[idx % gradients.length]}`}></div>

                                <div className="p-8 flex flex-col flex-1">
                                    {/* Icon & Category */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                            {icons[idx % icons.length]}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-wider">
                                            {blog.tags?.[0] || blog.category || "Insight"}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-black text-foreground mb-3 leading-tight group-hover:text-saffron transition-colors duration-300 line-clamp-2 font-serif">
                                        {blog.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <div className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 overflow-hidden text-ellipsis flex-grow">
                                        {blog.excerpt}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            5 min read
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

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <Link href="/blog" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <span>Explore All Articles</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <SpiritualFamilySection />
        </div>
    );
}
