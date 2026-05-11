"use client";

import React from 'react';
import Link from 'next/link';
import { 
    Calculator, 
    Heart, 
    Users, 
    Star, 
    Moon, 
    Sun, 
    Compass, 
    Activity,
    Shield,
    Flame,
    Car,
    Grid3X3,
    Calendar,
    Zap,
    Trophy,
    Eye,
    TrendingUp,
    Map
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
    {
        title: "Relationships & Love",
        calculators: [
            { name: "Love Calculator", href: "/calculators/love", icon: Heart, color: "bg-pink-50 text-pink-600 border-pink-100", desc: "Test romantic compatibility." },
            { name: "Friendship Calculator", href: "/calculators/friendship", icon: Users, color: "bg-green-50 text-green-600 border-green-100", desc: "Check your vibe with friends." },
            { name: "Flames Calculator", href: "/calculators/flames", icon: Flame, color: "bg-orange-50 text-orange-600 border-orange-100", desc: "Old school relationship predictor." },
        ]
    },
    {
        title: "Zodiac & Daily Tools",
        calculators: [
            { name: "Sun Sign", href: "/calculators/sun-sign", icon: Sun, color: "bg-amber-50 text-amber-600 border-amber-100", desc: "Your core personality traits." },
            { name: "Moon Sign (Rasi)", href: "/calculators/moon-sign", icon: Moon, color: "bg-indigo-50 text-indigo-600 border-indigo-100", desc: "Your emotional blueprint." },
            { name: "Moon Phase", href: "/calculators/moon-phase", icon: Activity, color: "bg-slate-50 text-slate-600 border-slate-100", desc: "Current lunar cycle influence." },
        ]
    },
    {
        title: "Vedic Astrology",
        calculators: [
            { name: "Birth Chart (Natal)", href: "/calculators/birth-chart", icon: Map, color: "bg-purple-50 text-purple-600 border-purple-100", desc: "Full cosmic map of your birth." },
            { name: "Ascendant (Lagna)", href: "/calculators/ascendant", icon: TrendingUp, color: "bg-blue-50 text-blue-600 border-blue-100", desc: "Your rising sign & persona." },
            { name: "Nakshatra Calculator", href: "/calculators/nakshatra", icon: Star, color: "bg-yellow-50 text-yellow-600 border-yellow-100", desc: "Your lunar mansion." },
            { name: "Dasha Calculator", href: "/calculators/dasha", icon: Calendar, color: "bg-rose-50 text-rose-600 border-rose-100", desc: "Planetary time periods." },
            { name: "Transit Chart", href: "/calculators/transit", icon: Compass, color: "bg-emerald-50 text-emerald-600 border-emerald-100", desc: "Current planetary movements." },
        ]
    },
    {
        title: "Vedic Dosha & Remedies",
        calculators: [
            { name: "Mangal Dosha", href: "/calculators/mangal-dosha", icon: Zap, color: "bg-red-50 text-red-600 border-red-100", desc: "Check for Mars affliction." },
            { name: "Shani Sade Sati", href: "/calculators/sade-sati", icon: Shield, color: "bg-stone-50 text-stone-600 border-stone-100", desc: "Saturn's 7.5 year transit." },
            { name: "Kaal Sarp Dosh", href: "/calculators/kaal-sarp", icon: Activity, color: "bg-gray-50 text-gray-700 border-gray-200", desc: "Rahu-Ketu snake alignment." },
        ]
    },
    {
        title: "Numerology & Destiny",
        calculators: [
            { name: "Name Numerology", href: "/calculators/numerology", icon: Calculator, color: "bg-cyan-50 text-cyan-600 border-cyan-100", desc: "Power of your name and numbers." },
            { name: "Lo Shu Grid", href: "/calculators/lo-shu", icon: Grid3X3, color: "bg-teal-50 text-teal-600 border-teal-100", desc: "Chinese grid numerology." },
            { name: "Lucky Vehicle Number", href: "/calculators/lucky-vehicle", icon: Car, color: "bg-lime-50 text-lime-600 border-lime-100", desc: "Is your car plate lucky?" },
            { name: "Ishta Devata", href: "/calculators/ishta-devata", icon: Sun, color: "bg-saffron/10 text-saffron border-saffron/20", desc: "Find your guiding deity." },
            { name: "Atma/Darakaraka", href: "/calculators/karaka", icon: Trophy, color: "bg-violet-50 text-violet-600 border-violet-100", desc: "Soul and Spouse significators." },
        ]
    }
];

export default function CalculatorsPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-12 pb-24">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        Divine <span className="text-saffron">Calculators</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-lg md:text-xl font-medium"
                    >
                        Master your destiny with ancient wisdom and precision algorithms. Explore all 19+ tools below.
                    </motion.p>
                </div>

                {/* Categories Flow */}
                <div className="space-y-16">
                    {categories.map((cat, catIdx) => (
                        <div key={cat.title}>
                            <motion.h2 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-2xl font-black text-slate-800 mb-8 border-l-4 border-saffron pl-4 uppercase tracking-widest"
                            >
                                {cat.title}
                            </motion.h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {cat.calculators.map((calc, index) => (
                                    <motion.div
                                        key={calc.name}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link 
                                            href={calc.href}
                                            className="group block bg-white rounded-3xl p-6 h-full shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-2 ring-1 ring-slate-100 hover:ring-saffron/20"
                                        >
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${calc.color} group-hover:rotate-6 transition-all duration-500`}>
                                                <calc.icon className="w-7 h-7" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-saffron transition-colors">
                                                {calc.name}
                                            </h3>
                                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                                {calc.desc}
                                            </p>
                                            <div className="mt-8 flex items-center text-saffron font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                                                START CALCULATION <span className="ml-2">→</span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Insight */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 p-10 bg-slate-900 rounded-[40px] text-white text-center relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                    <Sun className="w-12 h-12 text-saffron mx-auto mb-6 animate-pulse" />
                    <h3 className="text-3xl font-black mb-4">Cosmic Wisdom Awaits</h3>
                    <p className="text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
                        Our suite of calculators combines ancient Vedic scriptures with modern astronomical data to provide you with the most accurate spiritual insights possible.
                    </p>
                    <div className="flex justify-center gap-4">
                        <div className="px-6 py-2 bg-saffron/10 border border-saffron/20 rounded-full text-saffron font-bold text-sm uppercase">19+ Tools</div>
                        <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 font-bold text-sm uppercase">Vedic Wisdom</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
