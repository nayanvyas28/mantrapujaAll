"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    Map as MapIcon, 
    Grid, 
    MapPin, 
    ArrowRight, 
    Compass, 
    Sun 
} from 'lucide-react';
import IndiaMap from '@/components/IndiaMap';
import { Location, LocationType } from '@/lib/queries/destinations';
import { 
    MAP_OFFSET_X, 
    MAP_OFFSET_Y, 
    MAP_WIDTH, 
    MAP_HEIGHT 
} from '@/data/india-map-data';

interface LocationListingClientProps {
    initialLocations: Location[];
    blogs: any[];
}

const filters: { label: string; value: LocationType | 'Spiritual City'; count: number; desc: string }[] = [
    { label: "Char Dham", value: "Char Dham", count: 4, desc: "Cardinal Directions" },
    { label: "Jyotirlinga", value: "Jyotirlinga", count: 12, desc: "Radiant Signs of Shiva" },
    { label: "Shakti Peeth", value: "Shakti Peeth", count: 51, desc: "Seats of Power" },
    { label: "Spiritual City", value: "Spiritual City" as any, count: 30, desc: "Vedic Centers" },
    { label: "Kumbh Mela", value: "Kumbh Mela", count: 4, desc: "Sacred Gatherings" },
];

export default function LocationListingClient({ initialLocations, blogs }: LocationListingClientProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
    const [mapFilter, setMapFilter] = useState<LocationType | 'All'>('All');
    const [listFilter, setListFilter] = useState<LocationType | 'All'>('All');
    const [listSearchQuery, setListSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const filteredListLocations = useMemo(() => {
        return initialLocations.filter(loc => {
            const matchesType = listFilter === 'All' || loc.type?.includes(listFilter);
            const matchesSearch = (loc.name?.toLowerCase() || '').includes(listSearchQuery.toLowerCase()) ||
                (loc.description?.toLowerCase() || '').includes(listSearchQuery.toLowerCase());
            return matchesType && matchesSearch;
        });
    }, [listFilter, listSearchQuery, initialLocations]);

    const filteredMapLocations = useMemo(() => {
        return initialLocations.filter(loc => {
            return mapFilter === 'All' || loc.type?.includes(mapFilter);
        });
    }, [mapFilter, initialLocations]);

    const visibleLocations = filteredListLocations.slice(0, visibleCount);
    const hasMore = visibleCount < filteredListLocations.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 6, filteredListLocations.length));
    };

    return (
        <div className="relative z-10">
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
                        <section className="py-10 relative z-20">
                            <div className="container mx-auto px-4 max-w-7xl">

                                {/* Filter & Search Bar */}
                                <div className="relative z-[60] bg-card/60 dark:bg-[#111827]/40 backdrop-blur-xl border border-border/40 dark:border-white/5 rounded-[32px] p-6 md:p-8 mb-12 max-w-6xl mx-auto shadow-2xl">
                                    <div className="flex flex-col xl:flex-row gap-6 md:gap-8 items-center justify-between">
                                        {/* Search Input */}
                                        <div className="relative w-full xl:w-80 2xl:w-96 group">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                                <Search className="w-5 h-5 text-muted-foreground/40 dark:text-white/30 group-focus-within:text-saffron transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Search sacred cities..."
                                                value={listSearchQuery}
                                                onChange={(e) => { setListSearchQuery(e.target.value); setVisibleCount(6); }}
                                                className="w-full bg-muted/30 dark:bg-slate-900/40 border border-border/50 dark:border-white/10 rounded-2xl pl-14 pr-6 py-4 text-foreground dark:text-white placeholder:text-muted-foreground/40 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-saffron/20 focus:border-saffron/40 transition-all"
                                            />
                                        </div>

                                        {/* Category Tabs - Single Row with Scroll on Mobile */}
                                        <div className="flex items-center gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
                                            {['All', 'Char Dham', 'Jyotirlinga', 'Shakti Peeth', 'Kumbh Mela'].map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => { setListFilter(cat as any); setVisibleCount(6); }}
                                                    className={`px-6 md:px-8 py-3 md:py-4 rounded-full text-xs md:text-sm font-bold tracking-tight transition-all duration-500 border whitespace-nowrap ${listFilter === cat
                                                        ? 'bg-gradient-to-r from-[#ff4d00] to-[#ff0000] text-white border-transparent shadow-[0_10px_25px_-5px_rgba(255,77,0,0.4)] scale-105'
                                                        : 'bg-muted/30 dark:bg-slate-900/40 text-muted-foreground dark:text-white/40 border-border/50 dark:border-white/5 hover:bg-muted/50 dark:hover:bg-slate-800/60 hover:text-foreground dark:hover:text-white/80'
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
                                    {visibleLocations.map((loc, idx) => (
                                        <motion.div
                                            key={loc.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                                            className="group relative h-full bg-card/90 dark:bg-card/90 backdrop-blur-md text-card-foreground rounded-[32px] p-6 flex flex-col transition-all duration-500 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] border border-white/20 dark:border-white/5 hover:-translate-y-2"
                                        >
                                            <Link href={`/locations/${loc.slug}`} className="block">
                                                <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden bg-white/50 dark:bg-slate-900/50 border border-white/10 group-hover:border-saffron/20 transition-colors flex items-center justify-center cursor-pointer">
                                                    <Image
                                                        src={loc.image || 'https://s1.mantrapuja.com/storage/v1/object/public/spritual%20places/sp.png'}
                                                        alt={`${loc.name} - ${loc.type} in ${loc.stateId}`}
                                                        fill
                                                        priority={idx < 3}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                                        </motion.div>
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
                            </div>
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sacred Insights */}
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
                        {blogs.map((blog, idx) => (
                            <Link
                                key={idx}
                                href={`/blog/${blog.slug}`}
                                className="group relative bg-card rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 block h-full flex flex-col"
                            >
                                <div className={`h-2 bg-gradient-to-r ${[ "from-orange-500 to-red-600", "from-amber-500 to-orange-600", "from-yellow-500 to-amber-600"][idx % 3]}`}></div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between mb-4">
                                        <span className="text-4xl">{["✨", "🕉️", "🪔"][idx % 3]}</span>
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
        </div>
    );
}
