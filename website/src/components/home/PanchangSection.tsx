"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Calendar, Sun, Moon, Clock, 
    ArrowRight, AlertCircle, Info,
    SunDim, Sunrise, Sunset,
    Moon as MoonIcon,
    AlertTriangle, CheckCircle2,
    CalendarDays, Compass, MapPin, 
    Wind, Zap, Mountain, Flame,
    User, Sparkles, Stars
} from 'lucide-react';

interface PanchangData {
    reference_date: string;
    title: string;
    location: string;
    panchang_for_today: Record<string, string>;
    sun_moon_calculations: Record<string, string>;
    hindu_month_year: Record<string, string>;
    inauspicious_timings: Record<string, string>;
    auspicious_timings: Record<string, string>;
}

export default function PanchangSection() {
    const [data, setData] = useState<PanchangData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPanchang = async () => {
            try {
                const res = await fetch('/api/panchang');
                if (!res.ok) throw new Error('Failed to fetch panchang');
                const panchangData = await res.json();
                setData(panchangData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPanchang();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                    <p className="text-zinc-500 font-medium animate-pulse">Consulting the Cosmic Calendar...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="w-full py-12 flex justify-center">
                <div className="flex items-center gap-3 px-6 py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/30">
                    <AlertCircle className="w-5 h-5" />
                    <p className="font-medium">Unable to load today's Panchang. Please try again later.</p>
                </div>
            </div>
        );
    }

    const getIconForLabel = (label: string) => {
        const lowerLabel = label.toLowerCase();
        if (lowerLabel.includes('tithi')) return <MoonIcon className="w-3.5 h-3.5 text-blue-400" />;
        if (lowerLabel.includes('nakshatra')) return <Stars className="w-3.5 h-3.5 text-purple-400" />;
        if (lowerLabel.includes('yoga')) return <Wind className="w-3.5 h-3.5 text-teal-400" />;
        if (lowerLabel.includes('karana')) return <Zap className="w-3.5 h-3.5 text-amber-400" />;
        if (lowerLabel.includes('vaar')) return <CalendarDays className="w-3.5 h-3.5 text-red-400" />;
        if (lowerLabel.includes('sunrise')) return <Sunrise className="w-3.5 h-3.5 text-orange-400" />;
        if (lowerLabel.includes('sunset')) return <Sunset className="w-3.5 h-3.5 text-orange-600" />;
        if (lowerLabel.includes('moonrise')) return <Moon className="w-3.5 h-3.5 text-indigo-400" />;
        if (lowerLabel.includes('moonset')) return <Moon className="w-3.5 h-3.5 text-indigo-600" />;
        if (lowerLabel.includes('rahu')) return <AlertTriangle className="w-3.5 h-3.5 text-red-500" />;
        if (lowerLabel.includes('abhijit')) return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
        return null;
    };

    const Section = ({ title, icon: Icon, items, colorClass }: { title: string, icon: any, items: Record<string, string>, colorClass: string }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full group"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-2xl ${colorClass} bg-opacity-10 shadow-inner`}>
                    <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="text-lg font-black tracking-widest text-zinc-800 dark:text-zinc-100 uppercase">{title}</h3>
            </div>
            <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 group-hover:-translate-y-1">
                <div className="space-y-5">
                    {Object.entries(items).map(([label, value], idx) => (
                        <div key={idx} className="flex items-start gap-4 pb-4 border-b border-zinc-50 dark:border-white/5 last:border-0 last:pb-0">
                            <div className="mt-1">
                                {getIconForLabel(label) || <Info className="w-3.5 h-3.5 text-zinc-300" />}
                            </div>
                            <div className="flex flex-col gap-1.5 flex-1">
                                <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">{label}</span>
                                <span className="text-sm md:text-base font-bold text-zinc-700 dark:text-zinc-200 tracking-tight">{value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );

    return (
        <section className="pt-8 pb-12 md:pt-12 md:pb-20 relative overflow-hidden bg-zinc-50/50 dark:bg-transparent">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-400/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold tracking-widest uppercase text-sm mb-3">
                            <Calendar className="w-4 h-4" />
                            Daily Vedic Insights
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 leading-tight italic" style={{ fontFamily: 'Georgia, serif' }}>
                            {data.title}
                        </h2>
                        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-medium">
                            <Info className="w-4 h-4" />
                            Calculated for: <span className="text-zinc-900 dark:text-zinc-200 font-bold">{data.location}</span>
                        </div>
                    </div>
                </div>

                {/* Grid Layout - 2x2 for Balance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {/* Column 1: Core Panchang */}
                    <Section 
                        title="Vedic Pillars" 
                        icon={Mountain} 
                        items={data.panchang_for_today} 
                        colorClass="bg-orange-600" 
                    />

                    <Section 
                        title="Celestial Events" 
                        icon={MoonIcon} 
                        items={data.sun_moon_calculations} 
                        colorClass="bg-purple-600" 
                    />

                    <Section 
                        title="Shubha Muhurat" 
                        icon={CheckCircle2} 
                        items={data.auspicious_timings} 
                        colorClass="bg-emerald-600" 
                    />

                    <Section 
                        title="Ashubha Muhurat" 
                        icon={Flame} 
                        items={data.inauspicious_timings} 
                        colorClass="bg-red-600" 
                    />
                </div>

                {/* Bottom Row - Wide items */}
                {/* Bottom Row - Wide items (Parallel) */}
                {/* Bottom Row - Wide items (Parallel & Balanced) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12 items-stretch">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group flex flex-col justify-center min-h-[420px] border border-white/5"
                    >
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-10 flex items-center gap-4 text-orange-400">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-inner">
                                    <Stars className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-1">Traditional</span>
                                    Vedic Calendar Details
                                </div>
                            </h3>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-10">
                                {Object.entries(data.hindu_month_year).map(([label, value], idx) => (
                                    <div key={idx} className="flex flex-col gap-2.5">
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
                                        <span className="text-lg font-black text-zinc-100 leading-tight tracking-tight">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-stretch bg-gradient-to-br from-orange-500 to-red-600 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(249,115,22,0.3)] group relative min-h-[420px] border border-white/10"
                    >
                        {/* Avatar Left Side */}
                        <div className="w-full md:w-[45%] p-10 flex flex-col items-center justify-center bg-black/10 backdrop-blur-md relative border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-[40px] animate-pulse"></div>
                                <img 
                                    src="/pandit_ji_avatar.png" 
                                    alt="Guru Ji" 
                                    className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-full border-4 border-white shadow-2xl relative z-10"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-full shadow-2xl z-20">
                                    <Sparkles className="w-5 h-5 text-orange-500" />
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-3 border border-white/20 inline-block">Divine Guide</span>
                                <h4 className="text-xl font-black text-white italic leading-tight" style={{ fontFamily: 'Georgia, serif' }}>Acharya Guru Ji</h4>
                            </div>
                        </div>

                        {/* Content Right Side */}
                        <div className="flex-1 p-10 md:p-12 relative flex flex-col justify-center bg-gradient-to-br from-transparent to-black/10">
                            <div className="relative z-10">
                                <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-3 block">Personalized Advice</span>
                                <h3 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter italic text-white leading-[0.9]" style={{ fontFamily: 'Georgia, serif' }}>
                                    Know Your <br /><span className="text-white underline decoration-white/30 decoration-4 underline-offset-8">Divine Destiny</span>
                                </h3>
                                <div className="bg-black/20 backdrop-blur-md p-6 rounded-[2.5rem] mb-8 border border-white/10 shadow-inner">
                                    <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed italic">
                                        "Unlock sacred insights hidden within your unique birth chart."
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <button 
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-guru-chat'))}
                                        className="w-full py-5 bg-white text-orange-600 font-black rounded-full hover:bg-orange-50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)] group/btn"
                                    >
                                        ASK GURU JI
                                        <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                                    </button>
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="flex -space-x-3">
                                            {['aries', 'leo', 'sagittarius'].map(sign => (
                                                <div key={sign} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/20 p-1.5 backdrop-blur-sm shadow-lg">
                                                    <img src={`/zodiac/${sign}.png`} alt={sign} className="w-full h-full object-contain brightness-0 invert" title={sign} />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Active Today</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
