"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Stars, Moon, Sun, ScrollText } from 'lucide-react';

const ZODIAC_SIGNS = [
    { name: 'Aries', hindiName: 'मेष', slug: 'aries', icon: '/zodiac/aries.png', element: 'Fire', color: 'from-red-500 to-orange-500' },
    { name: 'Taurus', hindiName: 'वृष', slug: 'taurus', icon: '/zodiac/taurus.png', element: 'Earth', color: 'from-green-500 to-emerald-700' },
    { name: 'Gemini', hindiName: 'मिथुन', slug: 'gemini', icon: '/zodiac/gemini.png', element: 'Air', color: 'from-blue-400 to-indigo-500' },
    { name: 'Cancer', hindiName: 'कर्क', slug: 'cancer', icon: '/zodiac/cancer.png', element: 'Water', color: 'from-blue-600 to-cyan-500' },
    { name: 'Leo', hindiName: 'सिंह', slug: 'leo', icon: '/zodiac/leo.png', element: 'Fire', color: 'from-orange-500 to-yellow-500' },
    { name: 'Virgo', hindiName: 'कन्या', slug: 'virgo', icon: '/zodiac/virgo.png', element: 'Earth', color: 'from-emerald-500 to-teal-600' },
    { name: 'Libra', hindiName: 'तुला', slug: 'libra', icon: '/zodiac/libra.png', element: 'Air', color: 'from-pink-400 to-rose-500' },
    { name: 'Scorpio', hindiName: 'वृश्चिक', slug: 'scorpio', icon: '/zodiac/scorpion.png', element: 'Water', color: 'from-purple-600 to-indigo-700' },
    { name: 'Sagittarius', hindiName: 'धनु', slug: 'sagittarius', icon: '/zodiac/sagittarius.png', element: 'Fire', color: 'from-indigo-500 to-purple-500' },
    { name: 'Capricorn', hindiName: 'मकर', slug: 'capricorn', icon: '/zodiac/capricorn.png', element: 'Earth', color: 'from-slate-600 to-zinc-800' },
    { name: 'Aquarius', hindiName: 'कुंभ', slug: 'aquarius', icon: '/zodiac/aquarius.png', element: 'Air', color: 'from-cyan-400 to-blue-500' },
    { name: 'Pisces', hindiName: 'मीन', slug: 'pisces', icon: '/zodiac/pisces.png', element: 'Water', color: 'from-blue-400 to-teal-400' },
];

export default function RashifalPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-28 pb-20 px-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20 dark:opacity-30">
                <Stars className="absolute top-20 left-10 text-saffron/30 animate-pulse" size={100} />
                <Moon className="absolute bottom-20 right-10 text-saffron/20 animate-bounce" size={120} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-saffron/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-xs font-black uppercase tracking-[0.2em]"
                    >
                        <Sparkles size={14} className="animate-pulse" />
                        Cosmic Guidance
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter"
                    >
                        Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-amber-500">Rashifal</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium"
                    >
                        Discover your fate through the ancient science of Vedic Astrology. Get personalized insights for your career, health, and relationships.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {ZODIAC_SIGNS.map((sign, idx) => (
                        <Link 
                            key={sign.slug} 
                            href={`/rashifal/${sign.slug}`}
                            className="group"
                        >
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.05 * idx }}
                                className="relative bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-[32px] p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:shadow-saffron/10 hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Active State Background Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${sign.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                
                                {/* Icon Container */}
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="absolute inset-0 bg-saffron/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
                                    <img 
                                        src={sign.icon} 
                                        alt={sign.name} 
                                        className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" 
                                    />
                                </div>

                                {/* Names */}
                                <div className="space-y-1 relative z-10">
                                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">{sign.name}</h3>
                                    <p className="text-saffron font-bold text-lg">{sign.hindiName}</p>
                                    <span className="inline-block text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">{sign.element}</span>
                                </div>

                                {/* Arrow Button */}
                                <div className="mt-8 relative z-10">
                                    <div className="w-12 h-12 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-saffron group-hover:border-saffron group-hover:text-white transition-all duration-300">
                                        <ScrollText size={20} />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Footer Section */}
                <div className="mt-20 p-12 bg-saffron/5 border border-saffron/10 rounded-[48px] text-center max-w-4xl mx-auto space-y-6">
                    <h2 className="text-3xl font-black text-zinc-800 dark:text-white">Why check your Rashifal?</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        In Vedic astrology, your Rashi (Moon Sign) influences your emotional state and major life events. Regular checking of your Rashifal helps you align your actions with the cosmic rhythm, ensuring you're prepared for challenges and ready for opportunities.
                    </p>
                </div>
            </div>
        </div>
    );
}
