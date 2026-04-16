"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Menu, X, Compass, Calendar as CalendarIcon, Calculator, MessageSquare, LogOut, User as UserIcon, Scroll, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { TranslationDropdown } from "./ui/TranslationDropdown";
import { ThemeToggle } from "./ThemeToggle";

const TopBar = () => {
    const { user } = useAuth();
    const { language } = useLanguage();
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Handle scroll for glass effect intensification
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const t = {
        en: {
            horoscope: "Daily Rashifal",
            calendar: "Calendar 2026",
            kundali: "Kundali",
            calculator: "Calculators",
            calculators_heading: "Tools",
            more: "Options",
            live_chat: "Guru AI",
            all_calculators: "All Calculators",
            numerology: "Numerology",
            love: "Love Match",
            sun_sign: "Sun Sign",
            moon_sign: "Moon Sign",
            mangal_dosha: "Mangal Dosha",
            sade_sati: "Shani Sade Sati",
            birth_chart: "Birth Chart",
            lo_shu: "Lo Shu Grid"
        },
        hi: {
            horoscope: "दैनिक राशिफल",
            calendar: "2026 कैलेंडर",
            kundali: "कुंडली",
            calculator: "कैलकुलेटर",
            calculators_heading: "टूल्स",
            more: "विकल्प",
            live_chat: "गुरु AI",
            all_calculators: "सभी कैलकुलेटर",
            numerology: "अंकशास्त्र",
            love: "लव कैलकुलेटर",
            sun_sign: "सूर्य राशि",
            moon_sign: "चंद्र राशि",
            mangal_dosha: "मंगल दोष",
            sade_sati: "शनि की साढ़ेसाती",
            birth_chart: "जन्म कुंडली",
            lo_shu: "लो शु ग्रिड"
        }
    }[language === 'hi' ? 'hi' : 'en'] as any;

    const topLinks = [
        { name: t.horoscope, href: "/today-horoscope", icon: Compass },
        { name: t.calendar, href: "/calendar-2026", icon: CalendarIcon },
    ];

    const calculators = [
        { name: t.numerology, href: "/calculators/numerology", icon: Star },
        { name: t.love, href: "/calculators/love", icon: null },
        { name: t.sun_sign, href: "/calculators/sun-sign", icon: null },
        { name: t.moon_sign, href: "/calculators/moon-sign", icon: null },
        { name: t.mangal_dosha, href: "/calculators/mangal-dosha", icon: null },
        { name: t.sade_sati, href: "/calculators/sade-sati", icon: null },
        { name: t.birth_chart, href: "/calculators/birth-chart", icon: null },
        { name: t.lo_shu, href: "/calculators/lo-shu", icon: null },
        { name: t.all_calculators, href: "/calculators", icon: ChevronRight },
    ];

    return (
        <div className="w-full z-[100] border-t border-zinc-100 dark:border-white/5">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="container mx-auto px-4 flex items-center justify-between py-2.5 gap-4"
            >
                {/* -- LEFT: Options -- */}
                <div className="flex items-center gap-1.5 md:gap-2">
                    {/* Desktop Links */}
                    <div className="flex items-center gap-1 bg-zinc-100/50 dark:bg-white/5 p-1 rounded-full border border-zinc-200/50 dark:border-white/5">
                        {topLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-3 md:px-5 py-2 rounded-full flex items-center gap-2.5 hover:bg-white dark:hover:bg-white/10 transition-all group"
                            >
                                <link.icon size={15} className="text-orange-500 group-hover:rotate-12 transition-transform" />
                                <span className="text-[11px] font-black tracking-wider text-zinc-600 dark:text-zinc-300 group-hover:text-orange-600 transition-colors">
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                        
                        {user && (
                            <Link
                                href="/kundli"
                                className="px-3 md:px-5 py-2 rounded-full flex items-center gap-2.5 hover:bg-white dark:hover:bg-white/10 transition-all group"
                            >
                                <Scroll size={15} className="text-orange-500 group-hover:rotate-12 transition-transform" />
                                <span className="text-[11px] font-black tracking-wider text-zinc-600 dark:text-zinc-300 group-hover:text-orange-600">
                                    {t.kundali}
                                </span>
                            </Link>
                        )}

                        <div 
                            className="relative hidden sm:block"
                            onMouseEnter={() => setIsCalculatorOpen(true)}
                            onMouseLeave={() => setIsCalculatorOpen(false)}
                        >
                            <button className={`px-5 py-3 rounded-full flex items-center gap-2.5 transition-all ${isCalculatorOpen ? 'bg-white dark:bg-white/10 text-orange-600 shadow-sm' : 'hover:bg-white dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-300'}`}>
                                <Calculator size={15} className="text-orange-500" />
                                <span className="text-[11px] font-black tracking-wider">{t.calculator}</span>
                                <ChevronDown size={13} className={`transition-transform duration-300 ${isCalculatorOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isCalculatorOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                        className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-zinc-900 rounded-[24px] shadow-2xl border border-orange-200/30 dark:border-white/10 py-3 overflow-hidden z-[1000]"
                                    >
                                        <div className="px-5 py-3 mb-2 border-b border-zinc-100 dark:border-white/5">
                                            <p className="text-[11px] font-black text-orange-500 tracking-widest">{t.calculators_heading}</p>
                                        </div>
                                        <div className="max-h-[50vh] overflow-y-auto no-scrollbar px-2">
                                            {calculators.map((calc) => (
                                                <Link
                                                    key={calc.name}
                                                    href={calc.href}
                                                    className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-white/5 transition-all group"
                                                >
                                                    <span className="text-[11px] font-black text-zinc-700 dark:text-zinc-300 group-hover:text-orange-600 tracking-tight">
                                                        {calc.name}
                                                    </span>
                                                    <ChevronRight size={13} className="text-zinc-300 dark:text-zinc-700 group-hover:text-orange-500" />
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* -- RIGHT: Actions & Settings -- */}
                <div className="flex items-center gap-2 pr-0 md:pr-1.5 transition-all">
                    {/* Live Guru Chat Button */}
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('toggle-guru-chat'))}
                        className="bg-orange-500 hover:bg-orange-600 px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-lg shadow-orange-500/25 flex items-center gap-2 active:scale-95 transition-all group hidden sm:flex"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-30" />
                            <div className="relative w-2 h-2 bg-white rounded-full" />
                        </div>
                        <span className="text-[11px] font-black text-white tracking-widest">
                            {t.live_chat}
                        </span>
                    </button>

                    <div className="flex items-center gap-1 md:gap-2 pl-2 border-l border-zinc-200 dark:border-white/10">
                        <TranslationDropdown />
                        <ThemeToggle />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TopBar;
