"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Moon, Sun, ArrowLeft, RefreshCw, ScrollText, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

const ZODIAC_SIGNS = [
    { name: 'Aries', hindiName: 'मेष', slug: 'aries', icon: '/zodiac/aries.png', color: 'from-red-500 to-orange-500' },
    { name: 'Taurus', hindiName: 'वृष', slug: 'taurus', icon: '/zodiac/taurus.png', color: 'from-green-500 to-emerald-700' },
    { name: 'Gemini', hindiName: 'मिथुन', slug: 'gemini', icon: '/zodiac/gemini.png', color: 'from-blue-400 to-indigo-500' },
    { name: 'Cancer', hindiName: 'कर्क', slug: 'cancer', icon: '/zodiac/cancer.png', color: 'from-blue-600 to-cyan-500' },
    { name: 'Leo', hindiName: 'सिंह', slug: 'leo', icon: '/zodiac/leo.png', color: 'from-orange-500 to-yellow-500' },
    { name: 'Virgo', hindiName: 'कन्या', slug: 'virgo', icon: '/zodiac/virgo.png', color: 'from-emerald-500 to-teal-600' },
    { name: 'Libra', hindiName: 'तुला', slug: 'libra', icon: '/zodiac/libra.png', color: 'from-pink-400 to-rose-500' },
    { name: 'Scorpio', hindiName: 'वृश्चिक', slug: 'scorpio', icon: '/zodiac/scorpion.png', color: 'from-purple-600 to-indigo-700' },
    { name: 'Sagittarius', hindiName: 'धनु', slug: 'sagittarius', icon: '/zodiac/sagittarius.png', color: 'from-indigo-500 to-purple-500' },
    { name: 'Capricorn', hindiName: 'मकर', slug: 'capricorn', icon: '/zodiac/capricorn.png', color: 'from-slate-600 to-zinc-800' },
    { name: 'Aquarius', hindiName: 'कुंभ', slug: 'aquarius', icon: '/zodiac/aquarius.png', color: 'from-cyan-400 to-blue-500' },
    { name: 'Pisces', hindiName: 'मीन', slug: 'pisces', icon: '/zodiac/pisces.png', color: 'from-blue-400 to-teal-400' },
];

export default function SignHoroscopePage() {
    const params = useParams();
    const router = useRouter();
    const signSlug = params.sign as string;
    const sign = ZODIAC_SIGNS.find(s => s.slug === signSlug);

    const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'yearly'>('daily');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!sign) {
            router.push('/rashifal');
            return;
        }

        const fetchHoroscope = async () => {
            setLoading(true);
            try {
                // Fetch from the new API route (using test mode as fallback/sample)
                const res = await fetch(`/api/horoscope/${signSlug}?test=true`);
                if (!res.ok) throw new Error('Failed to fetch data');
                const json = await res.json();
                setData(json);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHoroscope();
    }, [signSlug, sign, router]);

    if (!sign) return null;

    const tabs = [
        { id: 'daily', label: 'Daily', icon: Sun },
        { id: 'monthly', label: 'Monthly', icon: Calendar },
        { id: 'yearly', label: 'Yearly', icon: Star },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-28 pb-20 px-4 transition-colors">
            <div className="container mx-auto max-w-5xl">
                {/* Back Button */}
                <Link 
                    href="/rashifal"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-saffron font-black uppercase text-xs tracking-widest mb-10 transition-all group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to signs
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Sign Identity Card */}
                    <div className="lg:col-span-4 sticky top-28">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-[48px] p-10 text-center shadow-xl relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${sign.color}`} />
                            <div className="relative w-32 h-32 mx-auto mb-6 transform transition-transform hover:scale-110 duration-700">
                                <div className="absolute inset-0 bg-saffron/10 rounded-full blur-2xl animate-pulse" />
                                <img src={sign.icon} alt={sign.name} className="w-full h-full object-contain relative z-10" />
                            </div>
                            <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">{sign.name}</h1>
                            <p className="text-saffron font-bold text-2xl mb-4">{sign.hindiName}</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-200 dark:border-white/5">Zodiac</span>
                                <span className="px-3 py-1 bg-saffron/10 rounded-full text-[10px] font-black text-saffron uppercase tracking-widest border border-saffron/20">Active</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Content Tabs */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Tab Switcher */}
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-full p-2 flex gap-2 shadow-sm relative overflow-hidden">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-saffron text-white shadow-lg' : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-white/5'}`}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Horoscope Scroll Card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-[#fff9ef] dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-800 rounded-[56px] relative min-h-[500px] overflow-hidden group shadow-2xl"
                            >
                                {/* Sacred Scroll Aesthetic Decorations */}
                                <div className="absolute top-0 left-0 w-full h-8 bg-[url('/border-pattern.png')] opacity-10 bg-repeat-x" />
                                <div className="absolute top-10 right-10 text-saffron/10 group-hover:rotate-12 transition-all duration-1000 rotate-0">
                                    <ScrollText size={300} strokeWidth={0.5} />
                                </div>
                                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-saffron/5 rounded-full blur-[80px]" />

                                <div className="p-12 md:p-16 relative z-10">
                                    {/* Content Header */}
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-16 h-16 rounded-3xl bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center text-saffron shadow-xl animate-pulse">
                                            {activeTab === 'daily' && <Sun size={32} />}
                                            {activeTab === 'monthly' && <Calendar size={32} />}
                                            {activeTab === 'yearly' && <Star size={32} />}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                                                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Forecast
                                            </h2>
                                            <p className="text-saffron font-bold uppercase tracking-[0.2em] text-[10px]">Planetary Insight</p>
                                        </div>
                                    </div>

                                    {/* Dynamic Text Content */}
                                    <div className="space-y-6">
                                        {loading ? (
                                            <div className="space-y-4 animate-pulse">
                                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
                                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-[90%]" />
                                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-[95%]" />
                                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-[80%]" />
                                            </div>
                                        ) : error ? (
                                            <p className="text-red-500 font-bold uppercase tracking-widest text-xs italic">
                                                Error syncing with the cosmos: {error}
                                            </p>
                                        ) : (
                                            <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 font-medium leading-[1.6] drop-shadow-sm">
                                                {data?.[activeTab]}
                                            </p>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-16 flex flex-col sm:flex-row gap-4">
                                        <button className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-3xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl group">
                                            Talk to Astrologer
                                            <Sparkles size={16} className="text-saffron animate-pulse" />
                                        </button>
                                        <button className="flex items-center justify-center gap-3 px-8 py-5 border-2 border-zinc-200 dark:border-white/10 rounded-3xl font-black uppercase text-xs tracking-widest text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all">
                                            <RefreshCw size={16} /> Sync Ritual
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
