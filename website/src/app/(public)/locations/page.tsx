'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map as MapIcon, Grid, List, Sun, ChevronDown, ArrowRight, Filter, IndianRupee, MapPin, Compass } from 'lucide-react';
import IndiaMap from '@/components/IndiaMap';
import { supabase } from '@/lib/supabaseClient';
import { 
    MAP_OFFSET_X, 
    MAP_OFFSET_Y, 
    MAP_WIDTH, 
    MAP_HEIGHT 
} from '@/data/india-map-data';
import { locations as staticLocations, Location, LocationType } from '@/data/spiritual-locations';
import { MOCK_BLOGS } from '@/data/blog-data';
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
                // Using imported supabase singleton

                // 1. Fetch Destinations - From new destinations table
                const { data: destData, error: destError } = await supabase
                    .from('destinations')
                    .select('*')
                    .eq('is_active', true)
                    .order('name', { ascending: true });

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
        const allowedTypes = ['Char Dham', 'Jyotirlinga', 'Shakti Peeth', 'Kumbh Mela'];
        const staticWithIds = staticLocations
            .filter(loc => allowedTypes.includes(loc.type))
            .map(loc => ({ ...loc, isStatic: true }));
        const dynamicWithIds = dynamicLocations
            .filter(loc => allowedTypes.includes(loc.type))
            .map(loc => ({ ...loc, isStatic: false }));

        // Create a map of database locations by slug for easy lookup/override
        const dbMap = new Map(dynamicWithIds.map(d => [d.slug, d]));
        
        // Final merged list
        const combined: Location[] = [];
        
        // Process static locations: if a DB override exists, use it; otherwise use static
        staticWithIds.forEach(s => {
            if (dbMap.has(s.slug)) {
                combined.push(dbMap.get(s.slug)!);
                dbMap.delete(s.slug); // Remove from map as it's processed
            } else {
                combined.push(s as Location);
            }
        });

        // Add remaining DB locations that didn't have a static counterpart
        dbMap.forEach(d => combined.push(d));

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

    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

    if (loading) {
        return null; // Handled by global LoadingScreen
    }
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden">
            {/* Unified Background with Animations */}
            <UnifiedPujaBackground />
            

            {/* View Switcher Toggle */}
            <div className="sticky top-16 z-40 flex justify-center mb-10 md:mb-16 px-4">
                <div className="p-1.5 md:p-2 bg-card/90 backdrop-blur-2xl border border-border/40 rounded-[22px] md:rounded-[28px] shadow-2xl flex items-center gap-1 md:gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`relative flex items-center gap-2 md:gap-3 px-4 md:px-10 py-2.5 md:py-4 rounded-[18px] md:rounded-[22px] transition-all duration-500 ${viewMode === 'grid'
                            ? 'text-white'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                            }`}
                    >
                        {viewMode === 'grid' && (
                            <motion.div
                                layoutId="active-view"
                                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 rounded-[18px] md:rounded-[22px] shadow-lg shadow-orange-500/20"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <Grid className={`relative z-10 w-4 h-4 md:w-5 md:h-5 ${viewMode === 'grid' ? 'animate-pulse' : ''}`} />
                        <span className="relative z-10 text-[10px] md:text-sm font-black uppercase tracking-widest">Destinations Grid</span>
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`relative flex items-center gap-2 md:gap-3 px-4 md:px-10 py-2.5 md:py-4 rounded-[18px] md:rounded-[22px] transition-all duration-500 ${viewMode === 'map'
                            ? 'text-white'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                            }`}
                    >
                        {viewMode === 'map' && (
                            <motion.div
                                layoutId="active-view"
                                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 rounded-[18px] md:rounded-[22px] shadow-lg shadow-orange-500/20"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <MapIcon className={`relative z-10 w-4 h-4 md:w-5 md:h-5 ${viewMode === 'map' ? 'animate-pulse' : ''}`} />
                        <span className="relative z-10 text-[10px] md:text-sm font-black uppercase tracking-widest">Sacred Map</span>
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                    <motion.div
                        key="grid-view"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {/* 2. Sacred Destinations Card Grid */}
                        <section className="py-10 relative z-20">
                            <div className="container mx-auto px-4 max-w-7xl">
                                <div className="text-center mb-8">
                                    <h2 className="text-4xl md:text-5xl font-black mb-2 leading-snug font-serif">
                                        Sacred <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 animate-gradient py-2">Destinations</span>
                                    </h2>
                                    <p className="text-muted-foreground max-w-none mx-auto">
                                        Browse centers of spiritual energy across the subcontinent, from ancient temples to mystical gathering sites.
                                    </p>
                                </div>

                                {/* Filter & Search Bar */}
                                <div className="relative z-[60] bg-card/80 backdrop-blur-md border border-border/40 rounded-2xl p-6 mb-8 max-w-5xl mx-auto shadow-sm ring-1 ring-black/5">
                                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
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

                                        <div className="flex overflow-x-auto pb-2 no-scrollbar gap-2 w-full md:w-auto justify-start md:justify-center px-2">
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

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
                                    {visibleLocations.map((loc) => (
                                        <div
                                            key={loc.id}
                                            className="group relative h-full bg-card/90 dark:bg-card/90 backdrop-blur-md text-card-foreground rounded-[32px] p-6 flex flex-col transition-all duration-500 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] border border-white/20 dark:border-white/5 hover:-translate-y-2"
                                        >
                                            <Link href={`/locations/${loc.slug}`} className="block">
                                                <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden bg-white/50 dark:bg-slate-900/50 border border-white/10 group-hover:border-saffron/20 transition-colors flex items-center justify-center cursor-pointer">
                                                    <img
                                                        src={loc.image || (loc as any).images?.[0] || '/logo.png'}
                                                        alt={`${loc.name}`}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = '/logo.png';
                                                        }}
                                                    />
                                                    <div className="absolute top-4 right-4 z-20">
                                                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm border border-white/20">
                                                            {loc.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>

                                            <div className="mb-6 flex-grow">
                                                <Link href={`/locations/${loc.slug}`} className="block">
                                                    <h3 className="text-2xl font-black mb-2 font-serif transition-colors group-hover:text-saffron">
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

                                            <Link
                                                href={`/locations/${loc.slug}`}
                                                className="group/btn relative inline-flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-[length:200%_auto] bg-right hover:bg-left transition-all duration-500 shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)]"
                                            >
                                                <span className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                    Explore Destination <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                                </span>
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                {hasMore && (
                                    <div className="text-center">
                                        <button
                                            onClick={handleLoadMore}
                                            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-card border-2 border-border/50 rounded-full font-bold text-foreground hover:border-saffron hover:text-saffron transition-all duration-300"
                                        >
                                            Load More Sites <Compass className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>
                    </motion.div>
                ) : (
                    <motion.div
                        key="map-view"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {/* 3. Interactive Map Section */}
                        <section className="py-10 relative z-10" onClick={() => setSelectedLocation(null)}>
                            <div className="container mx-auto px-4 max-w-[1400px]">
                                <div className="text-center mb-8 max-w-4xl mx-auto">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-sm font-bold uppercase tracking-widest mb-4 border border-saffron/20 backdrop-blur-sm">
                                        Sacred Geography
                                    </span>
                                    <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-saffron via-gold to-orange-500 mb-2 drop-shadow-sm leading-snug py-2" style={{ fontFamily: 'Georgia, serif' }}>
                                        Spiritual Map of India
                                    </h2>
                                    <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                                        Explore the divine landscape of Bharatvarsha, featuring the Char Dhams, 12 Jyotirlingas, 51 Shakti Peeths, and sacred Kumbh Mela sites.
                                    </p>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-6 mb-8 items-center lg:items-start justify-center relative z-[60]">
                                    <div className="flex-1 w-full max-w-4xl">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setMapFilter('All'); }}
                                                className={`px-4 py-3 rounded-2xl border transition-all duration-300 ${mapFilter === 'All'
                                                    ? 'bg-gradient-to-br from-saffron to-orange-600 text-white'
                                                    : 'bg-card'
                                                    }`}
                                            >
                                                <div className="font-bold font-serif">All Sites</div>
                                            </button>
                                            {filters.map((filter) => (
                                                <button
                                                    key={filter.value}
                                                    onClick={(e) => { e.stopPropagation(); setMapFilter(filter.value); }}
                                                    className={`px-4 py-3 rounded-2xl border transition-all duration-300 ${mapFilter === filter.value
                                                        ? 'bg-gradient-to-br from-saffron to-orange-600 text-white'
                                                        : 'bg-card'
                                                        }`}
                                                >
                                                    <div className="font-bold font-serif">{filter.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="hidden lg:flex flex-col gap-2 p-4 bg-card/50 rounded-2xl w-64 border border-border">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 mb-2 border-b pb-2">Legend</h3>
                                        {['Major Temples', 'Shiva Shrines', 'Shakti Energy', 'Mela Sites'].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm font-medium">
                                                <span className={`w-3 h-3 rounded-full ${[ 'bg-orange-500', 'bg-slate-600', 'bg-red-600', 'bg-yellow-500'][i]}`}></span>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={`relative w-full aspect-[${MAP_WIDTH}/${MAP_HEIGHT}] mt-4 mb-16 min-h-[450px] sm:min-h-[600px] mx-auto max-w-[${MAP_WIDTH}px]`}>
                                    <IndiaMap
                                        locations={filteredMapLocations}
                                        activeFilter={mapFilter}
                                        selectedStateId={selectedLocation?.stateId}
                                        onLocationClick={setSelectedLocation}
                                    />
                                    
                                    <AnimatePresence>
                                        {selectedLocation && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                                className={`${isMobile ? 'fixed inset-x-4 bottom-8' : 'absolute'} z-[4000]`}
                                                style={!isMobile ? {
                                                     left: `${((selectedLocation.x - MAP_OFFSET_X) / MAP_WIDTH) * 100}%`,
                                                     top: `${((selectedLocation.y - MAP_OFFSET_Y) / MAP_HEIGHT) * 100}%`,
                                                    transform: 'translate(-50%, -150%)',
                                                    width: 'max-content'
                                                } : {}}
                                            >
                                                <div className="bg-white/95 dark:bg-slate-950/95 rounded-[28px] p-5 shadow-2xl border border-saffron/20 backdrop-blur-xl w-72">
                                                    <div className="flex justify-between mb-4">
                                                        <span className="text-[10px] font-black uppercase text-saffron">{selectedLocation.type}</span>
                                                        <button onClick={() => setSelectedLocation(null)} className="text-muted-foreground hover:text-saffron">
                                                            <ArrowRight className="w-5 h-5 rotate-[135deg]" />
                                                        </button>
                                                    </div>
                                                    <Link href={`/locations/${selectedLocation.slug}`}>
                                                        <h4 className="text-2xl font-black font-serif mb-2 hover:text-saffron transition-colors">{selectedLocation.name}</h4>
                                                    </Link>
                                                    <p className="text-sm italic text-muted-foreground">"{selectedLocation.description}"</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="text-center">
                                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/40 backdrop-blur-md text-xs text-muted-foreground border border-border/50">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron"></span>
                                        </span>
                                        Explore the sacred terrain geographically
                                    </div>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 4. Sacred Insights */}
            <section className="py-24 relative overflow-hidden z-10 border-t border-border/50">
                <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-widest mb-6 border border-saffron/20 backdrop-blur-sm">
                            Knowledge Center
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 font-serif">
                            Sacred Insights & <span className="text-saffron">Guidance</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cityBlogs.map((blog, idx) => (
                            <Link
                                key={idx}
                                href={`/blog/${blog.slug}`}
                                className="group relative bg-card rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 block h-full flex flex-col"
                            >
                                <div className={`h-2 bg-gradient-to-r ${gradients[idx % gradients.length]}`}></div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between mb-4">
                                        <span className="text-4xl">{icons[idx % icons.length]}</span>
                                        <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase">{blog.category || "Insight"}</span>
                                    </div>
                                    <h3 className="text-xl font-black mb-3 font-serif group-hover:text-saffron transition-colors">{blog.title}</h3>
                                    <div className="text-sm text-muted-foreground line-clamp-3 flex-grow">{blog.excerpt}</div>
                                    <div className="flex justify-between items-center pt-4 border-t mt-4">
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">5 min read</span>
                                        <span className="text-saffron font-bold text-sm flex items-center gap-1">Read More <ArrowRight className="w-4 h-4" /></span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/blog" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Explore All Articles <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            <SpiritualFamilySection />
        </div>
    );
}
