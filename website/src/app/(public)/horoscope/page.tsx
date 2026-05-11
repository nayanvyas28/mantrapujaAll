
"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Moon, Sun, Stars } from 'lucide-react';
import StarsGalaxyBackground from "@/components/ui/StarsGalaxyBackground";

const zodiacSigns = [
    { name: "Aries", image: "/zodiac/aries.png", date: "Mar 21 - Apr 19", gradient: "from-red-500 to-orange-500" },
    { name: "Taurus", image: "/zodiac/taurus.png", date: "Apr 20 - May 20", gradient: "from-emerald-500 to-teal-500" },
    { name: "Gemini", image: "/zodiac/gemini.png", date: "May 21 - Jun 20", gradient: "from-yellow-400 to-amber-500" },
    { name: "Cancer", image: "/zodiac/cancer.png", date: "Jun 21 - Jul 22", gradient: "from-blue-400 to-indigo-500" },
    { name: "Leo", image: "/zodiac/leo.png", date: "Jul 23 - Aug 22", gradient: "from-orange-500 to-yellow-500" },
    { name: "Virgo", image: "/zodiac/virgo.png", date: "Aug 23 - Sep 22", gradient: "from-brown-500 to-stone-600" },
    { name: "Libra", image: "/zodiac/libra.png", date: "Sep 23 - Oct 22", gradient: "from-pink-400 to-rose-500" },
    { name: "Scorpio", image: "/zodiac/scorpion.png", date: "Oct 23 - Nov 21", gradient: "from-purple-600 to-indigo-700" },
    { name: "Sagittarius", image: "/zodiac/sagittarius.png", date: "Nov 22 - Dec 21", gradient: "from-indigo-500 to-blue-600" },
    { name: "Capricorn", image: "/zodiac/capricorn.png", date: "Dec 22 - Jan 19", gradient: "from-slate-600 to-gray-800" },
    { name: "Aquarius", image: "/zodiac/aquarius.png", date: "Jan 20 - Feb 18", gradient: "from-cyan-500 to-blue-500" },
    { name: "Pisces", image: "/zodiac/pisces.png", date: "Feb 19 - Mar 20", gradient: "from-blue-500 to-emerald-500" },
];

export default function HoroscopePage() {
    return (
        <div className="min-h-screen bg-orange-50/30 dark:bg-background relative overflow-hidden pb-20 transition-colors duration-500">
            <div className="absolute inset-0 z-0 dark:block hidden opacity-60">
                <StarsGalaxyBackground />
            </div>

            {/* Hero Section */}
            <div className="relative pt-24 pb-16 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-2 mb-4 text-saffron drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">
                        <Stars className="w-6 h-6 animate-pulse" />
                        <span className="uppercase tracking-[0.3em] text-sm font-bold">Daily Predictions</span>
                        <Stars className="w-6 h-6 animate-pulse" />
                    </div>
                    
                    <h1 className="relative z-10 text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-white dark:to-white/40 mb-6 drop-shadow-sm dark:drop-shadow-2xl">
                        Free Daily Horoscope
                    </h1>
                    
                    <p className="relative z-10 text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Discover what the stars have in store for you today. Explore daily, weekly, and monthly insights into your destiny.
                    </p>
                </motion.div>
            </div>

            {/* Zodiac Grid */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                    {zodiacSigns.map((sign, idx) => (
                        <motion.div
                            key={sign.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05, duration: 0.5 }}
                        >
                            <Link href={`/horoscope/${sign.name.toLowerCase()}`}>
                                <div className="group relative bg-white/80 dark:bg-zinc-900/40 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-[2rem] p-6 text-center hover:bg-orange-50 dark:hover:bg-zinc-800/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-xl dark:shadow-2xl">
                                    {/* Animated Hover Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${sign.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                    
                                    <div className="relative z-10">
                                        <div className="w-20 h-20 mx-auto mb-4 relative">
                                            <div className={`absolute inset-0 bg-gradient-to-r ${sign.gradient} blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full`} />
                                            <img 
                                                src={sign.image} 
                                                alt={sign.name} 
                                                className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500" 
                                            />
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-saffron transition-all">
                                            {sign.name}
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium tracking-wide">
                                            {sign.date}
                                        </p>
                                    </div>

                                    {/* Bottom Border Glow */}
                                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${sign.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Premium Features Section */}
            <div className="max-w-6xl mx-auto px-4 mt-32 relative">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Sun className="w-8 h-8" />, title: "Daily Insights", desc: "Get fresh predictions every morning before you start your day." },
                        { icon: <Moon className="w-8 h-8" />, title: "Weekly & Monthly", desc: "Plan your future with comprehensive long-term celestial guidance." },
                        { icon: <Star className="w-8 h-8" />, title: "Love & Career", desc: "Specific insights into your personal and professional relationships." }
                    ].map((feature, i) => (
                        <div key={i} className="bg-white/80 dark:bg-white/5 border border-orange-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-lg dark:shadow-none">
                            <div className="text-saffron mb-4">{feature.icon}</div>
                            <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{feature.title}</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

