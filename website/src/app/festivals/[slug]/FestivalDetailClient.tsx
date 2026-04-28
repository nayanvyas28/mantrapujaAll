"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, ChevronDown, CheckCircle, Sun, Star, Flame, User, MessageCircle, Phone, IndianRupee, Flower, Heart, Scroll, ShieldCheck, BadgeCheck, Sparkle, X } from "lucide-react";
import Link from "next/link";

// Related Puja Data Generator
const getRelatedPujas = (festivalName: string) => {
    const common = [
        { name: "Panchamrit Abhishekam", desc: "Sacred bathing of the deity with 5 divine elements.", image: "/puja images/abhishekam.jpg" },
        { name: "Sahasranama Archana", desc: "Chanting of 1000 divine names with flower offerings.", image: "/puja images/archana.jpg" },
        { name: "Shanti Homa", desc: "Vedic fire ritual for peace and cosmic balance.", image: "/puja images/homa.jpg" }
    ];

    const name = festivalName.toLowerCase();
    if (name.includes('shiva') || name.includes('pradosh') || name.includes('rudra')) {
        return [
            { name: "Rudra Abhishek", desc: "Powerful Vedic ritual for Lord Shiva to dissolve sins.", image: "/puja images/rudra abhishek 1.png" },
            { name: "Maha Mrityunjaya Path", desc: "Chanting for longevity and healing energy.", image: "/puja images/mahamrit.jpg" },
            { name: "Shiva Sahasranama", desc: "1000 names of Shiva for spiritual awakening.", image: "/puja images/shiva-sah.jpg" }
        ];
    }
    
    if (name.includes('ekadashi') || name.includes('vishnu') || name.includes('narayana')) {
        return [
            { name: "Satyanarayan Puja", desc: "Invoking the Lord of Truth for prosperity.", image: "/puja images/satyanarayan.jpg" },
            { name: "Vishnu Sahasranama", desc: "Most potent chanting for wealth and peace.", image: "/puja images/vishnu-sah.jpg" },
            { name: "Tulsi Archana", desc: "Sacred worship with holy basil for Vishnu's grace.", image: "/puja images/tulsi.jpg" }
        ];
    }

    if (name.includes('ganesh') || name.includes('vinayaka') || name.includes('ganpati')) {
        return [
            { name: "Ganpati Atharvashirsha", desc: "Sacred recitation for wisdom and obstacle removal.", image: "/puja images/ganesha.jpg" },
            { name: "Modak Arpan", desc: "Offering of 21 modaks to satisfy the Lord of Ganas.", image: "/puja images/modak.jpg" },
            { name: "Sankat Mochan Path", desc: "Hymns to overcome any life crisis with Ganesha's grace.", image: "/puja images/sankat.jpg" }
        ];
    }

    return common;
};
import { supabase } from '@/lib/supabaseClient';
import { Festival } from "@/lib/festivalData";
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import FireParticles from "@/components/FireParticles";
import SpiritualFamilySection from "@/components/home/SpiritualFamilySection";

interface FestivalDetailClientProps {
    festival: Festival;
}

export default function FestivalDetailClient({ festival }: FestivalDetailClientProps) {
    const [isScrolled, setIsScrolled] = useState(false);

// --- VISUAL UTILITIES FROM POOJA PAGE ---
const colorMap: Record<string, string> = {
    'orange-500': '#f97316', 'red-500': '#ef4444', 'red-600': '#dc2626',
    'indigo-500': '#6366f1', 'purple-600': '#9333ea', 'amber-400': '#fbbf24',
    'orange-400': '#fb923c', 'blue-500': '#3b82f6', 'indigo-600': '#4f46e5',
    'purple-500': '#a855f7', 'emerald-500': '#10b981', 'teal-600': '#0d9488',
    'rose-500': '#f43f5e', 'yellow-400': '#facc15', 'amber-500': '#f59e0b'
};

const getHexFromTailwind = (tailwindClass: string) => {
    if (!tailwindClass) return '#f97316';
    const parts = tailwindClass.split('-');
    if (parts.length < 3) return '#f97316';
    const key = `${parts[1]}-${parts[2]}`;
    return colorMap[key] || '#f97316';
};

const extractGradientColors = (gradient: string) => {
    if (!gradient) return { from: '#f97316', to: '#dc2626' };
    const parts = gradient.split(' ');
    const from = parts.find(p => p.startsWith('from-')) || 'from-orange-500';
    const to = parts.find(p => p.startsWith('to-')) || 'to-red-600';
    return { from: getHexFromTailwind(from), to: getHexFromTailwind(to) };
};

    const [blogs, setBlogs] = useState<any[]>([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true);
    const [recommendedPujas, setRecommendedPujas] = useState<any[]>([]);
    
    // Booking Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({ name: '', phone: '' });

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        try {
            const response = await fetch('/api/festival-bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    festival_name: festival.name
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Server responded with status ${response.status}`);
            }

            setFormState('success');
            setTimeout(() => {
                setIsModalOpen(false);
                setFormState('idle');
                setFormData({ name: '', phone: '' });
            }, 3000);
        } catch (error: any) {
            console.error("Booking error details:", error);
            setFormState('idle');
            alert("Error: " + error.message + "\nCheck if the API route is correctly deployed.");
        }
    };

    useEffect(() => {
        const fetchRelatedData = async () => {
            try {
                // 1. Fetch Related Blogs
                const { data: blogData } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('published', true)
                    .or(`title.ilike.%${festival.name}%,tags.cs.{${festival.name}}`)
                    .limit(3);

                if (blogData && blogData.length > 0) {
                    setBlogs(blogData);
                } else {
                    const { data: generalBlogs } = await supabase
                        .from('blogs')
                        .select('*')
                        .eq('published', true)
                        .limit(3);
                    setBlogs(generalBlogs || []);
                }

                // 2. Fetch Recommended Pujas (REAL DATA)
                let searchTerms = [festival.name];
                const name = festival.name.toLowerCase();
                if (name.includes('shiva') || name.includes('pradosh')) searchTerms.push('shiva', 'rudra', 'lingam');
                if (name.includes('ekadashi') || name.includes('vishnu')) searchTerms.push('vishnu', 'narayana', 'satyanarayan');
                if (name.includes('ganesh') || name.includes('ganpati')) searchTerms.push('ganesh', 'vinayaka');

                const orQuery = searchTerms.map(term => `name.ilike.%${term}%`).join(',');
                
                const { data: pujaData } = await supabase
                    .from('poojas')
                    .select('*')
                    .eq('is_active', true)
                    .or(orQuery)
                    .limit(3);

                if (pujaData && pujaData.length > 0) {
                    setRecommendedPujas(pujaData);
                } else {
                    // Fallback to featured pujas if no specific match
                    const { data: featuredPujas } = await supabase
                        .from('poojas')
                        .select('*')
                        .eq('is_active', true)
                        .eq('is_featured', true)
                        .limit(3);
                    setRecommendedPujas(featuredPujas || []);
                }

            } catch (error) {
                console.error("Error fetching related data:", error);
            } finally {
                setLoadingBlogs(false);
            }
        };

        fetchRelatedData();
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
            <section className="relative pt-2 pb-0 lg:pt-4 lg:pb-0 overflow-hidden min-h-[75vh] flex items-center">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src={festival.heroImage} alt={festival.heroImageAlt || festival.name} className="w-full h-full object-cover opacity-30 dark:opacity-20 blur-sm animate-zoom-in" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/60"></div>
                </div>

                <div className="w-full mx-auto px-2 md:px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 lg:gap-6">
                        {/* Text Content */}
                        <div className="lg:w-3/5 space-y-8 text-center lg:text-left flex flex-col justify-center lg:pl-20">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-saffron/20 bg-saffron/10 text-saffron backdrop-blur-md">
                                    Auspicious Vedic Festival
                                </span>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 md:mb-4 leading-[1.2] md:leading-[1.1] font-serif text-transparent bg-clip-text bg-gradient-to-r from-saffron via-gold to-saffron animate-gradient pb-2 px-2">
                                    {festival.name}
                                </h1>
                                <div className="relative">
                                    <div className="absolute -left-4 top-0 w-1 h-full bg-saffron/30 rounded-full hidden lg:block"></div>
                                    <p className="text-lg md:text-xl lg:text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed w-full mx-auto lg:mx-0 italic font-serif line-clamp-2">
                                        {festival.shortDesc || "Explore the divine significance, sacred rituals, and mythological history of this auspicious occasion."}
                                    </p>
                                </div>
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
                                    onClick={() => setIsModalOpen(true)}
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
                                    href="https://wa.me/918989271245"
                                    className="group relative flex w-full sm:w-auto items-center justify-center gap-2 md:gap-3 h-16 md:h-20 px-8 sm:px-12 font-bold text-lg md:text-xl text-green-600 bg-white border-2 border-white rounded-full shadow-[0_6px_0_0_#d1d5db] hover:shadow-[0_3px_0_0_#d1d5db] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all duration-150 overflow-visible animate-pulse-ring"
                                >
                                    <MessageCircle className="w-6 h-6 fill-current" />
                                    <span className="relative z-10 text-gray-800 text-sm md:text-lg">WhatsApp Pandit</span>
                                </a>
                            </motion.div>
                        </div>

                        <div className="lg:w-2/5 relative mt-8 lg:mt-0 w-full flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative w-full max-w-lg rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white/10 aspect-square group"
                            >
                                <img src={festival.heroImage} alt={festival.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:from-black/80 md:via-transparent"></div>

                                {/* Floating Glass Badge */}
                                <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 right-4 sm:right-6 md:right-10 p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-saffron flex items-center justify-center">
                                            <Sun className="w-5 h-5 md:w-6 md:h-6 text-white" />
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

            {/* --- RECOMMENDED PUJAS SECTION --- */}
            <section className="pt-0 pb-8 relative z-20 -mt-8 md:-mt-12 mb-8">
                <div className="w-full mx-auto px-2 md:px-4">
                    <div className="bg-white/60 dark:bg-black/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/30 dark:border-white/10 shadow-xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl md:text-3xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-saffron to-orange-600">Recommended Pujas</h2>
                                <p className="text-xs text-muted-foreground italic">Auspicious rituals for {festival.name}</p>
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-saffron/20 to-transparent mx-6 hidden md:block"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
                            {recommendedPujas.map((puja, idx) => {
                                const rotatingGradients = [
                                    'from-indigo-500 to-purple-600',
                                    'from-red-500 to-red-800',
                                    'from-emerald-500 to-teal-600',
                                    'from-amber-400 to-orange-500',
                                    'from-pink-500 to-rose-500',
                                    'from-blue-500 to-indigo-600'
                                ];
                                const displayGradient = rotatingGradients[idx % rotatingGradients.length];
                                const colors = extractGradientColors(displayGradient);
                                const gradientId = `border-gradient-rec-${puja.id}`;

                                return (
                                    <div key={puja.id} className="group relative max-w-[360px] mx-auto w-full">
                                        {/* 3D Glow Effect */}
                                        <div className={`absolute -inset-1 bg-gradient-to-t ${displayGradient} rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 z-0`}></div>
                                        
                                        {/* Red Zigzag Special Offer Badge */}
                                        {puja.is_special_offer && (
                                            <div className="absolute top-0 left-0 z-50 -translate-x-1/4 -translate-y-1/4 pointer-events-none transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative w-24 h-24 flex items-center justify-center drop-shadow-2xl">
                                                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-[#e11d48]">
                                                        <path d="M50 0 L55 10 L65 5 L68 16 L79 13 L79 24 L90 24 L87 35 L97 40 L91 50 L100 60 L89 65 L92 76 L81 77 L81 88 L70 86 L65 96 L55 91 L50 100 L45 91 L35 96 L30 86 L20 88 L19 77 L8 76 L11 65 L0 60 L9 50 L3 40 L13 35 L10 24 L21 24 L21 13 L32 16 L35 5 L45 10 Z" />
                                                    </svg>
                                                    <div className="relative z-10 flex flex-col items-center justify-center text-white text-center leading-tight">
                                                        <span className="text-[10px] font-bold opacity-90">मात्र</span>
                                                        <span className="text-xl font-black">₹{puja.special_offer_price}</span>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        )}

                                        {/* Animated Snake Border */}
                                        <svg className="absolute -inset-[2px] -translate-y-[5px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-40">
                                            <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="18" ry="18" fill="none" stroke={`url(#${gradientId})`} strokeWidth="4" strokeDasharray="20 10" className="animate-snake-border" />
                                            <defs>
                                                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor={colors.from} stopOpacity="0.8" />
                                                    <stop offset="100%" stopColor={colors.to} stopOpacity="1" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        <div className="relative h-full bg-card/95 dark:bg-card/90 backdrop-blur-md text-card-foreground rounded-2xl p-4 flex flex-col transition-all duration-500 shadow-md border border-white/10 group-hover:-translate-y-2 z-10">
                                            <Link href={`/pooja-services/${puja.slug}`} className="block group/content">
                                                <div className="relative w-full aspect-[2/1] mb-4 rounded-xl overflow-hidden bg-white/50 dark:bg-slate-900/50 border border-white/10">
                                                    <img src={(puja.images && puja.images.length > 0) ? puja.images[0] : '/diya.png'} alt={puja.name} className="w-full h-full object-cover transition-transform duration-700 group-hover/content:scale-110" />
                                                </div>
                                                <h3 className="text-xl font-black text-foreground group-hover/content:text-saffron transition-all duration-300 mb-1 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                                                    {puja.name}
                                                </h3>
                                                <p className="text-muted-foreground font-medium mb-4 leading-relaxed text-[13px] line-clamp-2">
                                                    {puja.description || puja.tagline}
                                                </p>
                                            </Link>

                                            <div className="mb-6 flex flex-wrap gap-1.5">
                                                {(puja.benefits || []).slice(0, 3).map((benefit: any, i: number) => (
                                                    <span key={i} className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide bg-secondary/40 border border-border/30 text-muted-foreground flex items-center gap-1">
                                                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${displayGradient}`}></div>
                                                        {benefit}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mt-auto">
                                                <button 
                                                    onClick={() => setIsModalOpen(true)}
                                                    className="group/btn relative inline-flex items-center justify-center w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 bg-[length:200%_auto] bg-right hover:bg-left transition-all duration-500 shadow-md"
                                                >
                                                    <span className="relative z-10 text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                        Book Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SIGNIFICANCE SECTION (Bento Style) --- */}
            <section className="py-10 md:py-16 relative z-10">
                <div className="w-full mx-auto px-2 md:px-4 relative">
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
                            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{festival.significance?.mythology || "Explore the ancient scriptures and sacred legends that define the origin of this divine occasion."}</p>
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
                            <p className="text-muted-foreground leading-relaxed relative z-10 text-base md:text-lg">{festival.significance?.spiritual || "Connect with the inner light and higher consciousness through the spiritual vibrations of this sacred day."}</p>
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
                            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{festival.significance?.cultural || "Witness the vibrant celebrations, community unity, and timeless traditions across our diverse landscape."}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- RITUALS SECTION (Snake Cards) --- */}
            <section className="py-10 md:py-16 relative z-10">
                <div className="w-full mx-auto px-2 md:px-4">
                    <SectionHeading subtitle="Vedic Vidhi">Sacred Rituals</SectionHeading>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
                        {(festival.rituals && festival.rituals.length > 0) ? (
                            festival.rituals.map((ritual, i) => (
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
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 bg-card/40 rounded-[32px] border border-dashed border-saffron/30">
                                <p className="text-muted-foreground italic font-serif">Sacred Vidhi details are being compiled by our Vedic scholars...</p>
                            </div>
                        )}
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
                <div className="w-full mx-auto px-2 md:px-4">
                    <SectionHeading subtitle="Queries">Common Questions</SectionHeading>                    <div className="space-y-4">
                        {(festival.faqs && festival.faqs.length > 0) ? (
                            festival.faqs.map((item, i) => (
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
                            ))
                        ) : (
                            <div className="text-center py-10 bg-card/20 rounded-2xl border border-white/5">
                                <p className="text-muted-foreground italic">Detailed spiritual guidance for this festival is coming soon...</p>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            <section id="book-now" className="py-10 md:py-24 relative overflow-hidden">
                <div className="w-full mx-auto px-2 md:px-4 relative z-10">
                    <div className="w-full mx-auto">
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
                                    href="https://wa.me/918989271245"
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
                                        <Sun className="w-8 h-8 text-white animate-pulse" />
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
                    <div className="w-full mx-auto px-2 md:px-4">
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

            {/* --- BOOKING MODAL --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        ></motion.div>

                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl p-8 md:p-10"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {formState === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-black font-serif">Request Sent!</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400">
                                        Our Pandit ji will contact you shortly to discuss the <span className="text-saffron font-bold">{festival.name}</span> puja details.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <div className="flex items-center gap-2 text-saffron font-bold tracking-widest uppercase text-xs mb-2">
                                            <Calendar className="w-4 h-4" />
                                            Sacred Booking
                                        </div>
                                        <h3 className="text-black dark:text-white text-3xl font-black font-serif mb-2 leading-tight">Book {festival.name} Puja</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                                            Request a divine callback from our expert Vedic Pandits.
                                        </p>
                                    </div>

                                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 pl-1">Your Full Name</label>
                                            <div className="relative group">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-saffron transition-colors" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Enter your name"
                                                    className="text-black dark:text-white w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-white/10 focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition-all font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 pl-1">WhatsApp Number</label>
                                            <div className="relative group">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-saffron transition-colors" />
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="+91 00000 00000"
                                                    className="text-black dark:text-white w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-white/10 focus:border-saffron focus:ring-4 focus:ring-saffron/10 outline-none transition-all font-medium"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formState === 'submitting'}
                                            className="w-full py-5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group/btn"
                                        >
                                            {formState === 'submitting' ? (
                                                <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            ) : (
                                                <>
                                                    Confirm Booking <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
