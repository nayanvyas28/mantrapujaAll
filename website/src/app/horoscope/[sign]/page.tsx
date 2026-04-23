"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, Loader2, Star,
    ArrowRight, Heart, Briefcase, Users, Home, Coins, Moon, Sun, Compass,
    Lightbulb, Palette, Hash, FlaskConical, CalendarDays
} from 'lucide-react';
import Link from 'next/link';
import StarsGalaxyBackground from "@/components/ui/StarsGalaxyBackground";

type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

const periods: { id: Period; label: string; icon: string }[] = [
    { id: 'daily', label: 'Today', icon: '☀️' },
    { id: 'weekly', label: 'Weekly', icon: '🌙' },
    { id: 'monthly', label: 'Monthly', icon: '📅' },
    { id: 'yearly', label: 'Yearly', icon: '🪐' },
];

const signDetails: Record<string, any> = {
    aries:       { image: "/zodiac/aries.png",       gradient: "from-red-500 to-orange-500",     glow: "rgba(239,68,68,0.3)",     element: "Fire 🔥",  planet: "Mars",    symbol: "♈",  dates: "Mar 21 – Apr 19" },
    taurus:      { image: "/zodiac/taurus.png",      gradient: "from-emerald-500 to-teal-500",   glow: "rgba(16,185,129,0.3)",    element: "Earth 🌍", planet: "Venus",   symbol: "♉",  dates: "Apr 20 – May 20" },
    gemini:      { image: "/zodiac/gemini.png",      gradient: "from-yellow-400 to-amber-500",   glow: "rgba(251,191,36,0.3)",    element: "Air 💨",  planet: "Mercury", symbol: "♊",  dates: "May 21 – Jun 20" },
    cancer:      { image: "/zodiac/cancer.png",      gradient: "from-blue-400 to-indigo-500",    glow: "rgba(96,165,250,0.3)",    element: "Water 💧",planet: "Moon",    symbol: "♋",  dates: "Jun 21 – Jul 22" },
    leo:         { image: "/zodiac/leo.png",         gradient: "from-orange-500 to-yellow-500",  glow: "rgba(249,115,22,0.3)",    element: "Fire 🔥",  planet: "Sun",     symbol: "♌",  dates: "Jul 23 – Aug 22" },
    virgo:       { image: "/zodiac/virgo.png",       gradient: "from-stone-500 to-stone-700",    glow: "rgba(168,162,158,0.3)",   element: "Earth 🌍", planet: "Mercury", symbol: "♍",  dates: "Aug 23 – Sep 22" },
    libra:       { image: "/zodiac/libra.png",       gradient: "from-pink-400 to-rose-500",      glow: "rgba(244,114,182,0.3)",   element: "Air 💨",  planet: "Venus",   symbol: "♎",  dates: "Sep 23 – Oct 22" },
    scorpio:     { image: "/zodiac/scorpion.png",    gradient: "from-purple-600 to-indigo-700",  glow: "rgba(147,51,234,0.3)",    element: "Water 💧",planet: "Mars",    symbol: "♏",  dates: "Oct 23 – Nov 21" },
    sagittarius: { image: "/zodiac/sagittarius.png", gradient: "from-indigo-500 to-blue-600",    glow: "rgba(99,102,241,0.3)",    element: "Fire 🔥",  planet: "Jupiter", symbol: "♐",  dates: "Nov 22 – Dec 21" },
    capricorn:   { image: "/zodiac/capricorn.png",   gradient: "from-slate-600 to-gray-800",     glow: "rgba(100,116,139,0.3)",   element: "Earth 🌍", planet: "Saturn",  symbol: "♑",  dates: "Dec 22 – Jan 19" },
    aquarius:    { image: "/zodiac/aquarius.png",    gradient: "from-cyan-500 to-blue-500",      glow: "rgba(6,182,212,0.3)",     element: "Air 💨",  planet: "Uranus",  symbol: "♒",  dates: "Jan 20 – Feb 18" },
    pisces:      { image: "/zodiac/pisces.png",      gradient: "from-blue-500 to-emerald-500",   glow: "rgba(59,130,246,0.3)",    element: "Water 💧",planet: "Neptune", symbol: "♓",  dates: "Feb 19 – Mar 20" },
};

const ratingIconMap: Record<string, React.ReactNode> = {
    'Health':       <Heart className="w-4 h-4" />,
    'Wealth':       <Coins className="w-4 h-4" />,
    'Family':       <Home className="w-4 h-4" />,
    'Love Matters': <Heart className="w-4 h-4 fill-current" />,
    'Occupation':   <Briefcase className="w-4 h-4" />,
    'Married Life': <Users className="w-4 h-4" />,
};

const sectionIconMap = (heading: string): React.ReactNode => {
    const h = heading.toLowerCase();
    if (h.includes('love'))    return <Heart className="w-5 h-5" />;
    if (h.includes('career') || h.includes('occup') || h.includes('work')) return <Briefcase className="w-5 h-5" />;
    if (h.includes('family'))  return <Home className="w-5 h-5" />;
    if (h.includes('finance') || h.includes('wealth') || h.includes('money')) return <Coins className="w-5 h-5" />;
    if (h.includes('health'))  return <Heart className="w-5 h-5" />;
    if (h.includes('month') || h.includes('week')) return <CalendarDays className="w-5 h-5" />;
    return <Moon className="w-5 h-5" />;
};

function StarBar({ score }: { score: number }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-5 h-5 rounded-full transition-all ${i <= score ? 'bg-saffron shadow-sm shadow-saffron/50' : 'bg-black/10 dark:bg-white/10'}`} />
            ))}
        </div>
    );
}

function ExpandableText({ text, limit = 200, className = "" }: { text: string; limit?: number; className?: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    if (!text) return null;
    if (text.length <= limit) return <p className={className}>{text}</p>;
    
    const displayText = isExpanded ? text : text.slice(0, limit) + '...';
    
    return (
        <div className="relative">
            <p className={className}>{displayText}</p>
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-saffron font-bold text-sm mt-2 hover:underline focus:outline-none flex items-center gap-1"
            >
                {isExpanded ? 'Show Less' : 'View More'}
            </button>
        </div>
    );
}

export default function SignHoroscopePage() {
    const params = useParams();
    const sign = ((params.sign as string) || 'aries').toLowerCase();
    const detail = signDetails[sign] || signDetails.aries;

    const [period, setPeriod] = useState<Period>('daily');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/horoscope?sign=${sign}&period=${period}`);
                const json = await res.json();
                if (!res.ok) throw new Error(json.error || 'Failed to fetch');
                setData(json);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [sign, period]);

    return (
        <div className="min-h-screen bg-orange-50/30 dark:bg-background relative overflow-hidden pb-24 transition-colors duration-500">
            <div className="absolute inset-0 z-0 dark:block hidden opacity-60">
                <StarsGalaxyBackground />
            </div>

            {/* Glowing orb behind sign image */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-[120px] opacity-20 dark:opacity-30 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${detail.glow}, transparent 70%)` }}
            />

            {/* ─── Header navigation ───────────────────────────────────── */}
            <div className="relative z-10 pt-8 px-4 container mx-auto flex items-center justify-between">
                <Link
                    href="/horoscope"
                    className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                >
                    <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">All Signs</span>
                </Link>

                {/* Breadcrumb info pill */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-full border border-orange-100 dark:border-white/10 shadow-sm">
                    <span className="text-2xl">{detail.symbol}</span>
                    <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />
                    <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest">{detail.element}</span>
                    <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />
                    <span className="text-xs font-bold text-slate-700 dark:text-white">{detail.planet}</span>
                </div>
            </div>

            {/* ─── Sign Hero ────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 mt-10 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                        {/* Sign Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.7, type: 'spring' }}
                            className="relative w-40 h-40 md:w-52 md:h-52 shrink-0"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${detail.gradient} blur-3xl opacity-25 dark:opacity-40 rounded-full animate-pulse`} />
                            <img
                                src={detail.image}
                                alt={sign}
                                className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_24px_rgba(255,255,255,0.25)]"
                            />
                        </motion.div>

                        {/* Sign title + period tabs */}
                        <div className="text-center md:text-left flex-1">
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 justify-center md:justify-start">
                                    <span className="text-saffron font-bold tracking-[0.4em] uppercase text-xs">{period} Astro Predictions</span>
                                </div>
                                <h1 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white capitalize leading-none">
                                    {sign}
                                    <span className="text-3xl md:text-4xl ml-3 opacity-40">{detail.symbol}</span>
                                </h1>

                                {/* Period tabs */}
                                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                                    {periods.map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => setPeriod(p.id)}
                                            className={`relative flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${period === p.id
                                                ? 'text-white shadow-lg'
                                                : 'text-slate-600 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white bg-black/5 dark:bg-white/5'
                                                }`}
                                        >
                                            {period === p.id && (
                                                <motion.div
                                                    layoutId="activePeriod"
                                                    className={`absolute inset-0 bg-gradient-to-r ${detail.gradient} rounded-full -z-10`}
                                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                                />
                                            )}
                                            <span>{p.icon}</span>
                                            <span>{p.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* ─── Content Area ─────────────────────────────────────── */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={period + sign}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-32 gap-4">
                                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${detail.gradient} animate-pulse flex items-center justify-center`}>
                                        <Compass className="w-8 h-8 text-white animate-spin" />
                                    </div>
                                    <p className="text-slate-500 dark:text-zinc-400 font-medium animate-pulse">Reading the stars for you...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-20">
                                    <p className="text-red-400 text-lg">{error}</p>
                                </div>
                            ) : (
                                <div className="grid lg:grid-cols-3 gap-6">
                                    {/* ── Left: Main Prediction + Sections ── */}
                                    <div className="lg:col-span-2 flex flex-col gap-6">

                                        {/* Date badge */}
                                        {data?.date_label && (
                                            <div className="flex items-center gap-2">
                                                <div className={`h-px flex-1 bg-gradient-to-r ${detail.gradient} opacity-30`} />
                                                <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-slate-600 dark:text-zinc-300 bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                                    <CalendarDays className="w-3 h-3 inline mr-1.5 opacity-60" />
                                                    {data.date_label}
                                                </span>
                                                <div className={`h-px flex-1 bg-gradient-to-l ${detail.gradient} opacity-30`} />
                                            </div>
                                        )}

                                        {/* Main Prediction Card */}
                                        <div className="bg-white/90 dark:bg-zinc-900/50 backdrop-blur-xl border border-orange-100/50 dark:border-white/5 rounded-3xl p-8 shadow-xl dark:shadow-2xl">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${detail.gradient} flex items-center justify-center shadow-lg shrink-0`}>
                                                    <Moon className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-black text-slate-900 dark:text-white capitalize">{period} Forecast</h2>
                                                    <p className="text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-wider">{sign}</p>
                                                </div>
                                            </div>

                                            <ExpandableText 
                                                text={data?.content || "No prediction available. Check back soon."}
                                                limit={250}
                                                className="text-lg text-slate-700 dark:text-zinc-200 leading-[1.9] font-light"
                                            />
                                        </div>

                                        {/* Sub-sections (weekly/monthly/yearly love, career etc) */}
                                        {data?.sections && data.sections.length > 0 && (
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {data.sections.map((sec: { heading: string; body: string }, i: number) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, y: 16 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: i * 0.08 }}
                                                        className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md border border-orange-50 dark:border-white/5 rounded-2xl p-6 shadow-md dark:shadow-xl flex flex-col gap-3"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${detail.gradient} flex items-center justify-center text-white shrink-0`}>
                                                                {sectionIconMap(sec.heading)}
                                                            </div>
                                                            <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{sec.heading}</h3>
                                                        </div>
                                                        <ExpandableText 
                                                            text={sec.body}
                                                            limit={120}
                                                            className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed"
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Star Ratings (daily only) */}
                                        {data?.ratings && data.ratings.length > 0 && (
                                            <div className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md border border-orange-50 dark:border-white/5 rounded-2xl p-6 shadow-md">
                                                <h3 className="text-base font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                                                    <Star className="w-5 h-5 text-saffron fill-saffron" />
                                                    Today's Cosmic Ratings
                                                </h3>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                    {data.ratings.map((r: { label: string; score: number }, i: number) => (
                                                        <div key={i} className="flex flex-col gap-1.5">
                                                            <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400">
                                                                {ratingIconMap[r.label] || <Star className="w-4 h-4" />}
                                                                <span className="text-xs font-bold uppercase tracking-wide">{r.label}</span>
                                                            </div>
                                                            <StarBar score={r.score} />
                                                            <span className="text-xs text-slate-400 dark:text-zinc-500">{r.score}/5</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* ── Right Sidebar ── */}
                                    <div className="flex flex-col gap-5">

                                        {/* Lucky Info Card */}
                                        {(data?.lucky_number || data?.lucky_color) && (
                                            <div className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md border border-orange-50 dark:border-white/5 rounded-2xl p-6 shadow-md">
                                                <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                                    <Sun className="w-5 h-5 text-saffron" />
                                                    Lucky for Today
                                                </h3>
                                                <ul className="space-y-3">
                                                    {data.lucky_number && (
                                                        <li className="flex items-center justify-between">
                                                            <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
                                                                <Hash className="w-4 h-4" /> Number
                                                            </span>
                                                            <span className="px-3 py-1 rounded-lg text-white text-sm font-bold bg-saffron/80 shadow-sm">{data.lucky_number}</span>
                                                        </li>
                                                    )}
                                                    {data.lucky_color && (
                                                        <li className="flex items-center justify-between">
                                                            <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
                                                                <Palette className="w-4 h-4" /> Color
                                                            </span>
                                                            <span className="px-3 py-1 rounded-lg text-white text-sm font-bold shadow-sm" style={{ background: detail.glow.replace('0.3', '0.9') }}>{data.lucky_color}</span>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Remedy Card */}
                                        {data?.remedy && (
                                            <div className={`bg-gradient-to-br ${detail.gradient} rounded-2xl p-6 shadow-xl relative overflow-hidden`}>
                                                <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-3xl -mr-8 -mt-8" />
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <FlaskConical className="w-5 h-5 text-white/80" />
                                                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Today's Remedy</h3>
                                                    </div>
                                                    <p className="text-white/90 text-sm leading-relaxed font-medium">{data.remedy}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Element / Planet quick stats */}
                                        <div className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md border border-orange-50 dark:border-white/5 rounded-2xl p-6 shadow-md">
                                            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                                <Moon className="w-5 h-5 text-saffron" />
                                                Sign Profile
                                            </h3>
                                            <div className="space-y-3">
                                                {[
                                                    { label: 'Symbol', value: detail.symbol },
                                                    { label: 'Element', value: detail.element },
                                                    { label: 'Planet', value: detail.planet },
                                                    { label: 'Birth Range', value: detail.dates },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wide">{item.label}</span>
                                                        <span className="text-sm font-bold text-slate-800 dark:text-white">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA: Get Full Kundli */}
                                        <Link href="/kundli" className="block group">
                                            <div className="bg-gradient-to-r from-saffron to-orange-600 rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-saffron/20 transition-all group-hover:shadow-saffron/40 group-hover:-translate-y-1">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                                                <h3 className="text-xl font-black text-white mb-1 relative z-10">Get Your Kundli</h3>
                                                <p className="text-white/80 text-sm font-medium mb-4 relative z-10">Free 25+ page personalized birth chart report.</p>
                                                <div className="flex items-center gap-2 text-white font-bold text-sm relative z-10">
                                                    Check Now <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Tip card */}
                                        <div className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md border border-orange-50 dark:border-white/5 rounded-2xl p-6 shadow-md">
                                            <div className="flex items-start gap-3">
                                                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-800 dark:text-white mb-1">Astrological Note</h4>
                                                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">These predictions are based on your Moon sign for general guidance. For personalized insights, consult a Vedic astrologer.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
