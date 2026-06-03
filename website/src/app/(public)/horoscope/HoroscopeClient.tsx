"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Moon, Sun, Compass, ArrowRight } from 'lucide-react';
import { UnifiedPujaBackground } from '@/components/UnifiedPujaBackground';
import FireParticles from '@/components/FireParticles';
import EmberParticles from '@/components/EmberParticles';
import { CosmicBackground } from '@/components/CosmicBackground';
import SpiritualFamilySection from '@/components/home/SpiritualFamilySection';

const zodiacSigns = [
    { name: "Aries", image: "/zodiac/aries.png", date: "Mar 21 - Apr 19", gradient: "from-red-500 to-orange-500", hindi: "मेष" },
    { name: "Taurus", image: "/zodiac/taurus.png", date: "Apr 20 - May 20", gradient: "from-emerald-500 to-teal-500", hindi: "वृषभ" },
    { name: "Gemini", image: "/zodiac/gemini.png", date: "May 21 - Jun 20", gradient: "from-yellow-400 to-amber-500", hindi: "मिथुन" },
    { name: "Cancer", image: "/zodiac/cancer.png", date: "Jun 21 - Jul 22", gradient: "from-blue-400 to-indigo-500", hindi: "कर्क" },
    { name: "Leo", image: "/zodiac/leo.png", date: "Jul 23 - Aug 22", gradient: "from-orange-500 to-yellow-500", hindi: "सिंह" },
    { name: "Virgo", image: "/zodiac/virgo.png", date: "Aug 23 - Sep 22", gradient: "from-stone-500 to-stone-700", hindi: "कन्या" },
    { name: "Libra", image: "/zodiac/libra.png", date: "Sep 23 - Oct 22", gradient: "from-pink-400 to-rose-500", hindi: "तुला" },
    { name: "Scorpio", image: "/zodiac/scorpion.png", date: "Oct 23 - Nov 21", gradient: "from-purple-600 to-indigo-700", hindi: "वृश्चिक" },
    { name: "Sagittarius", image: "/zodiac/sagittarius.png", date: "Nov 22 - Dec 21", gradient: "from-indigo-500 to-blue-600", hindi: "धनु" },
    { name: "Capricorn", image: "/zodiac/capricorn.png", date: "Dec 22 - Jan 19", gradient: "from-slate-600 to-gray-800", hindi: "मकर" },
    { name: "Aquarius", image: "/zodiac/aquarius.png", date: "Jan 20 - Feb 18", gradient: "from-cyan-500 to-blue-500", hindi: "कुंभ" },
    { name: "Pisces", image: "/zodiac/pisces.png", date: "Feb 19 - Mar 20", gradient: "from-blue-500 to-emerald-500", hindi: "मीन" },
];

const astrologyTools = [
    {
        name: "Janam Kundli",
        desc: "Generate your detailed Vedic birth chart and planetary house alignments.",
        href: "/calculators/birth-chart",
        icon: "🕉️",
        badge: "Most Popular",
        gradient: "from-purple-500 to-indigo-600 shadow-purple-500/20"
    },
    {
        name: "Daily Panchang",
        desc: "Check today's Tithi, Nakshatra, Yoga, Karana, and auspicious Rahu Kaal timings.",
        href: "/panchang",
        icon: "📅",
        badge: "Daily Update",
        gradient: "from-amber-400 to-orange-500 shadow-amber-400/20"
    },
    {
        name: "Numerology Report",
        desc: "Unveil the mystical power of your name and birth date numbers.",
        href: "/calculators/numerology",
        icon: "🔢",
        badge: "Destiny Number",
        gradient: "from-cyan-500 to-blue-600 shadow-cyan-500/20"
    },
    {
        name: "Kundli Matching",
        desc: "Verify gun-milan and compatibility between couples for marriage.",
        href: "/calculators/love",
        icon: "💖",
        badge: "Gun Milan",
        gradient: "from-rose-500 to-pink-600 shadow-rose-500/20"
    }
];

export default function HoroscopePage() {
    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden pb-24">
            <CosmicBackground />
            <FireParticles />
            <EmberParticles />
            <UnifiedPujaBackground />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 py-12 md:py-20">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center text-center mb-16 max-w-4xl mx-auto">
                    <span className="uppercase tracking-[0.3em] text-[10px] font-black text-saffron mb-4">Vedic Astrology & Guidance</span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black font-serif mb-6 leading-tight"
                    >
                        Astrology & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Rashifal Hub</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-base md:text-lg font-medium max-w-2xl"
                    >
                        Discover what the planets and stars have aligned for you today. Explore your natal chart, daily Rashifal, and Vedic panchang parameters.
                    </motion.p>
                </div>

                {/* 1. Astrology & Vedic Tools Console */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black font-serif text-slate-800 dark:text-white border-l-4 border-saffron pl-4 uppercase tracking-widest text-[13px] md:text-sm">
                            Astrology Calculators & Services
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {astrologyTools.map((tool, idx) => (
                            <motion.div
                                key={tool.name}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="group relative"
                            >
                                {/* Hover Glow */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${tool.gradient} rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500 z-0`}></div>
                                
                                <Link 
                                    href={tool.href}
                                    className="relative block h-full bg-card/95 dark:bg-[#1a222e]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 z-10"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-secondary/50 dark:bg-white/5 border border-border/30 dark:border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                            {tool.icon}
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider bg-saffron/10 text-saffron border border-saffron/20">
                                            {tool.badge}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-black text-foreground dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                                        {tool.name}
                                    </h3>
                                    <p className="text-muted-foreground text-xs font-medium leading-relaxed opacity-70">
                                        {tool.desc}
                                    </p>

                                    <div className="mt-8 flex items-center text-saffron font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                        Open Tool <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 2. Daily Rashifal Grid */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black font-serif text-slate-800 dark:text-white border-l-4 border-saffron pl-4 uppercase tracking-widest text-[13px] md:text-sm">
                            Daily Rashifal / Zodiac Signs
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {zodiacSigns.map((sign, idx) => (
                            <motion.div
                                key={sign.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.03 }}
                                className="group relative"
                            >
                                <Link href={`/horoscope/${sign.name.toLowerCase()}`}>
                                    <div className="relative bg-card/95 dark:bg-[#1a222e]/80 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 text-center hover:bg-orange-500/5 dark:hover:bg-zinc-800/40 transition-all duration-300 shadow-md group-hover:-translate-y-2 group-hover:shadow-2xl overflow-hidden">
                                        
                                        {/* Colored Back Glow */}
                                        <div className={`absolute -inset-10 bg-gradient-to-br ${sign.gradient} opacity-0 group-hover:opacity-5 blur-2xl transition-all duration-500`} />
                                        
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="w-16 h-16 mb-4 relative">
                                                <div className={`absolute inset-0 bg-gradient-to-r ${sign.gradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full`} />
                                                <img 
                                                    src={sign.image} 
                                                    alt={sign.name} 
                                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                                                />
                                            </div>
                                            
                                            <h3 className="text-lg font-black text-foreground dark:text-white mb-0.5 group-hover:text-saffron transition-colors">
                                                {sign.name}
                                            </h3>
                                            <span className="text-[10px] font-black text-saffron uppercase tracking-widest mb-1.5 opacity-80">
                                                {sign.hindi}
                                            </span>
                                            <p className="text-[10px] text-muted-foreground font-semibold">
                                                {sign.date}
                                            </p>
                                        </div>

                                        {/* Bottom Glow Border */}
                                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${sign.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. Astrological Wisdom Block */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 bg-gradient-to-r from-saffron/10 to-orange-500/10 dark:from-[#1a222e]/80 dark:to-[#1a222e]/80 border border-saffron/20 dark:border-white/5 rounded-[2.5rem] text-center relative overflow-hidden shadow-xl"
                >
                    <Sun className="w-10 h-10 text-saffron mx-auto mb-6 animate-pulse" />
                    <h3 className="text-2xl font-black font-serif text-slate-800 dark:text-white mb-4">Vedic Astrology & Cosmic Guidance</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed mb-6 text-sm">
                        Vedic Astrology, or Jyotish Shastra, is the ancient system that translates planetary cycles and stellar alignments into practical guidance. Calculate your charts, understand your planetary periods (dasha), and align your actions with the cosmic rhythm.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <span className="px-5 py-2 bg-saffron/10 rounded-full text-saffron font-bold text-xs uppercase tracking-wider border border-saffron/20">Vedic Wisdom</span>
                        <span className="px-5 py-2 bg-secondary rounded-full text-muted-foreground font-bold text-xs uppercase tracking-wider border border-border">100% Authentic Scrapes</span>
                    </div>
                </motion.div>
            </div>

            <SpiritualFamilySection />
        </main>
    );
}
