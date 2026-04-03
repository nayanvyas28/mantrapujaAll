"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, ChevronDown, CheckCircle, Sparkles, Star, Flame, User, MessageCircle, Phone, IndianRupee, Flower, Heart, Scroll, ShieldCheck, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js';
import { Festival } from "@/lib/festivalData";
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import FireParticles from "@/components/FireParticles";
import SpiritualFamilySection from "@/components/home/SpiritualFamilySection";

interface FestivalDetailClientProps {
    festival: Festival;
}

export default function FestivalDetailClient({ festival }: FestivalDetailClientProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    const [blogs, setBlogs] = useState<any[]>([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchRelatedBlogs = async () => {
            try {
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

                // Fetch blogs where title or tags contain the festival name
                const { data } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('published', true)
                    .or(`title.ilike.%${festival.name}%,tags.cs.{${festival.name}}`)
                    .limit(3);

                if (data && data.length > 0) {
                    setBlogs(data);
                } else {
                    // Fallback to general spiritual blogs if no specific matches
                    const { data: generalBlogs } = await supabase
                        .from('blogs')
                        .select('*')
                        .eq('published', true)
                        .limit(3);
                    setBlogs(generalBlogs || []);
                }
            } catch (error) {
                console.error("Error fetching related blogs:", error);
            } finally {
                setLoadingBlogs(false);
            }
        };

        fetchRelatedBlogs();
    }, [festival.name]);

    const scrollToBooking = () => {
        const element = document.getElementById('book-now');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
        <div className="text-center mb-10 md:mb-16 relative z-10">
            {subtitle && (
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-saffron/50"></div>
                    <span className="text-saffron font-bold tracking-[0.2rem] md:tracking-[0.2em] uppercase text-[10px] md:text-sm">{subtitle}</span>
                    <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-saffron/50"></div>
                </div>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-saffron via-gold to-saffron bg-[length:200%_auto] animate-gradient mb-4 md:mb-6 pb-2 px-4" style={{ fontFamily: 'Georgia, serif' }}>
                {children}
            </h2>
        </div>
    );

    return (
        <div className="min-h-screen bg-transparent text-foreground relative overflow-hidden transition-colors duration-300 font-sans">
            {/* Global Background Animation */}
            <UnifiedPujaBackground />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-8 pb-10 lg:pt-12 lg:pb-16 overflow-hidden min-h-[85vh] flex items-center">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src={festival.heroImage} alt={festival.heroImageAlt || festival.name} className="w-full h-full object-cover opacity-30 dark:opacity-20 blur-sm animate-zoom-in" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/60"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-16">
                        {/* Text Content */}
                        <div className="lg:w-1/2 space-y-8 text-center lg:text-left flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-saffron/20 bg-saffron/10 text-saffron backdrop-blur-md">
                                    Auspicious Vedic Festival
                                </span>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-6 leading-[1.2] md:leading-[1.1] font-serif text-transparent bg-clip-text bg-gradient-to-r from-saffron via-gold to-saffron animate-gradient pb-2 px-2">
                                    {festival.name}
                                </h1>
                                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 px-4 md:px-0">
                                    {festival.shortDesc}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-wrap justify-center lg:justify-start gap-4"
                            >
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 border border-white/10 backdrop-blur-sm text-sm font-medium">
                                    <Calendar className="w-4 h-4 text-saffron" />
                                    {new Date(festival.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 border border-white/10 backdrop-blur-sm text-sm font-medium">
                                    <Clock className="w-4 h-4 text-saffron" />
                                    Auspicious Tithi
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 border border-white/10 backdrop-blur-sm text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                    <BadgeCheck className="w-4 h-4" />
                                    Vedic Verified
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4"
                            >
                                {/* 3D Primary Button with Fire Particles */}
                                <button
                                    onClick={scrollToBooking}
                                    className="group relative flex w-full sm:w-auto items-center justify-center h-16 md:h-20 px-8 sm:px-12 font-bold text-lg md:text-xl text-white rounded-full shadow-[0_6px_0_0_#9a3412] hover:shadow-[0_3px_0_0_#9a3412] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all duration-150 overflow-visible"
                                >
                                    {/* Animated Snake Border */}
                                    <svg className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none" style={{ filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.6))', zIndex: 20 }}>
                                        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="40" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="30 70" className="animate-snake-border" strokeLinecap="round" />
                                        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="40" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="30 20" className="animate-snake-border" style={{ strokeDashoffset: 500, animationDelay: '-4s' }} strokeLinecap="round" />
                                    </svg>

                                    <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-red-500">
                                        <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                            <FireParticles />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
                                    </div>
                                    <span className="relative z-10 flex items-center gap-2 md:gap-3 text-xs md:text-sm uppercase tracking-[0.2em]">
                                        Book Special Puja <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                {/* WhatsApp Button */}
                                <a
                                    href="https://wa.me/919999999999"
                                    className="group relative flex w-full sm:w-auto items-center justify-center gap-2 md:gap-3 h-16 md:h-20 px-8 sm:px-12 font-bold text-lg md:text-xl text-green-600 bg-white border-2 border-white rounded-full shadow-[0_6px_0_0_#d1d5db] hover:shadow-[0_3px_0_0_#d1d5db] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all duration-150 overflow-visible animate-pulse-ring"
                                >
                                    <MessageCircle className="w-6 h-6 fill-current" />
                                    <span className="relative z-10 text-gray-800 text-sm md:text-lg">WhatsApp Pandit</span>
                                </a>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2 relative mt-8 lg:mt-0 w-full max-w-2xl mx-auto lg:max-w-none lg:h-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white/10 aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full group"
                            >
                                <img src={festival.heroImage} alt={festival.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:from-black/80 md:via-transparent"></div>

                                {/* Floating Glass Badge */}
                                <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 right-4 sm:right-6 md:right-10 p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-saffron flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-80">Divine Occasion</p>
                                            <p className="text-lg md:text-xl font-bold font-serif">{festival.name} 2024</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SIGNIFICANCE SECTION (Bento Style) --- */}
            <section className="py-10 md:py-16 relative z-10">
                <div className="container mx-auto px-4 relative">
                    {/* Decorative Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-[120%] h-[120%] bg-saffron/5 rounded-full blur-3xl -z-10"></div>
                    <SectionHeading subtitle="Divine Meaning">Significance & Lore</SectionHeading>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Mythology */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-card/50 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-orange-500/20 transition-colors"></div>
                            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                                <Scroll className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold font-serif mb-4 group-hover:text-saffron transition-colors">Mythology</h3>
                            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{festival.significance.mythology}</p>
                        </motion.div>

                        {/* Spiritual Essence */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-gradient-to-br from-saffron/10 via-saffron/5 to-transparent p-8 md:p-10 rounded-[2.5rem] border border-saffron/20 shadow-2xl relative overflow-hidden group backdrop-blur-md"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-saffron/30 blur-[60px] rounded-full pointer-events-none animate-pulse-slow"></div>
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron to-orange-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-saffron/40 group-hover:rotate-12 transition-transform">
                                <Flame className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold font-serif mb-4 text-foreground">Spiritual Essence</h3>
                            <p className="text-muted-foreground leading-relaxed relative z-10 text-base md:text-lg">{festival.significance.spiritual}</p>
                        </motion.div>

                        {/* Cultural Impact */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-card/50 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10 group-hover:bg-blue-500/20 transition-colors"></div>
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                <User className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold font-serif mb-4 group-hover:text-blue-500 transition-colors">Cultural Impact</h3>
                            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{festival.significance.cultural}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- RITUALS SECTION (Snake Cards) --- */}
            <section className="py-10 md:py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <SectionHeading subtitle="Vedic Vidhi">Sacred Rituals</SectionHeading>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {festival.rituals.map((ritual, i) => (
                            <div key={i} className="group relative">
                                {/* Bottom Glow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-saffron/20 to-transparent rounded-[32px] translate-y-4 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

                                <div className="relative bg-card text-card-foreground rounded-[32px] p-8 md:p-10 border border-border/50 shadow-lg transition-all duration-300 group-hover:-translate-y-2 overflow-hidden h-full">
                                    {/* Snake Border SVG */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ zIndex: 10 }}>
                                        <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="32" ry="32" fill="none" stroke="url(#saffronGradient)" strokeWidth="3" strokeDasharray="30 15" className="animate-snake-border" style={{ strokeDashoffset: 1000 }} />
                                        <defs>
                                            <linearGradient id="saffronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                                                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    <div className="flex flex-col h-full">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center text-saffron">
                                                <CheckCircle className="w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-3 py-1 rounded-full bg-secondary/50 border border-border">
                                                {ritual.timing}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-2xl mb-4 font-serif group-hover:text-saffron transition-colors">{ritual.name}</h3>
                                        <p className="text-muted-foreground leading-relaxed text-base">{ritual.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="text-center mt-12 md:mt-20 px-4">
                        <button
                            onClick={scrollToBooking}
                            className="group relative inline-flex items-center gap-3 md:gap-4 px-10 md:px-16 py-8 md:py-12 rounded-full border-2 border-saffron/20 text-saffron hover:text-white transition-all duration-300 font-black overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3 text-lg md:text-xl uppercase">
                                Participate in Rituals
                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                            <div className="absolute inset-0 overflow-hidden rounded-full transform translate-z-0">
                                <div className="absolute bottom-0 left-0 right-0 bg-saffron transition-all duration-500 ease-in-out h-[15%] group-hover:h-full"></div>
                                <div className="absolute bottom-[15%] left-0 w-[200%] h-4 bg-repeat-x animate-wave group-hover:bottom-[100%] transition-all duration-500 ease-in-out"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\' fill=\'%23f97316\' transform=\'scale(1, -1) translate(0, -120)\'/%3E%3C/svg%3E")', backgroundSize: '50% 100%' }}>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="py-10 md:py-16 relative z-10">
                <div className="container mx-auto px-4 max-w-4xl">
                    <SectionHeading subtitle="Queries">Common Questions</SectionHeading>
                    <div className="space-y-4">
                        {festival.faqs.map((item, i) => (
                            <details key={i} open={i === 0} className="group bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 cursor-pointer open:bg-card open:shadow-lg transition-all duration-300">
                                <summary className="font-bold text-lg mb-2 flex items-center justify-between list-none select-none">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-saffron/10 flex items-center justify-center text-saffron text-sm">?</div>
                                        {item.question}
                                    </div>
                                    <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="text-muted-foreground ml-10 mt-4 leading-relaxed animate-fade-in opacity-80">
                                    {item.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section id="book-now" className="py-10 md:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="relative rounded-[3rem] overflow-hidden bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-saffron/20 dark:border-white/10 shadow-2xl p-8 md:p-12 lg:p-20 text-center group">

                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black font-serif mb-8 leading-tight">
                                Experience {festival.name} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-orange-600 animate-gradient">with Devotion</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-gray-600 dark:text-white/70 mb-12 max-w-3xl mx-auto font-light">
                                Connect with the divine through authentic Vedic rituals performed on your behalf during this sacred window.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                                <a
                                    href="https://wa.me/919999999999"
                                    className="group relative px-12 py-6 rounded-full bg-emerald-500 text-white font-bold text-2xl shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-2 transition-all flex items-center gap-4 overflow-visible"
                                >
                                    <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600">
                                        <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                            <FireParticles baseHue={140} />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine"></div>
                                    </div>

                                    <MessageCircle className="w-8 h-8 fill-current relative z-10 animate-shake-call" />
                                    <span className="relative z-10">Talk to Pandit</span>
                                </a>

                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    className="group relative inline-flex items-center justify-center h-16 md:h-20 px-10 md:px-14 font-bold text-xl md:text-2xl text-white rounded-full shadow-[0_8px_0_0_#9a3412] hover:shadow-[0_4px_0_0_#9a3412] hover:translate-y-[4px] active:translate-y-[8px] active:shadow-none transition-all duration-150 overflow-visible"
                                >

                                    <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-r from-saffron via-orange-600 to-red-600">
                                        <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                            <FireParticles />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine"></div>
                                    </div>

                                    <span className="relative z-10 flex items-center gap-3">
                                        <Sparkles className="w-8 h-8 text-white animate-pulse" />
                                        <span>Book Ritual Now</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SACRED INSIGHTS (Related Blogs) --- */}
            {blogs.length > 0 && (
                <section className="py-10 md:py-24 relative z-10">
                    <div className="container mx-auto px-4">
                        <SectionHeading subtitle="Knowledge Center">Sacred Insights & Guidance</SectionHeading>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blogs.map((blog, idx) => (
                                <Link
                                    key={idx}
                                    href={`/blog/${blog.slug}`}
                                    className="group relative bg-card/40 backdrop-blur-xl rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/10 hover:border-saffron/50 block cursor-pointer flex flex-col h-full"
                                >
                                    {/* Gradient Header */}
                                    <div className={`h-2 bg-gradient-to-r from-saffron to-orange-600`}></div>

                                    <div className="p-8 flex flex-col flex-1">
                                        {/* Icon & Category */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                                {blog.icon || (idx % 2 === 0 ? "🕉️" : "🪔")}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-wider">
                                                {blog.tags?.[0] || blog.category || "Insight"}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-black text-foreground mb-3 leading-tight group-hover:text-saffron transition-colors duration-300 line-clamp-2" style={{ fontFamily: 'Georgia, serif' }}>
                                            {blog.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <div className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 overflow-hidden text-ellipsis flex-grow">
                                            {blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : '')}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-border/10 mt-auto">
                                            <span className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {blog.readTime || "5 min read"}
                                            </span>
                                            <span className="text-saffron font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                                Read More
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-saffron/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            <SpiritualFamilySection />
        </div>
    );
}
