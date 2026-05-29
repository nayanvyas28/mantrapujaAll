"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BadgeCheck, Calendar, Clock, HelpCircle, MapPin, MessageCircle, Phone, Star, User, UserCheck, ArrowRight, ShieldCheck, Sun, CheckCircle, ChevronDown, IndianRupee, Flower, Scroll, Flame, Heart, X, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PujaData } from "@/lib/pujaData";
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import FireParticles from "@/components/FireParticles"; // Ensure this component exists or remove if not needed
import CollapsibleText from "@/components/ui/CollapsibleText";
import SpiritualFamilySection from "@/components/home/SpiritualFamilySection";
import BookingPackagesPopup from "@/components/BookingPackagesPopup";
import { useLanguage } from "@/context/LanguageContext";

export default function PoojaDetailClient({ puja }: { puja: PujaData }) {
    // Helper to render icons
    const getIcon = (icon: string | React.ReactNode) => {
        if (typeof icon !== 'string') return icon;
        const lower = icon.toLowerCase();

        // Premium Icon Mapping
        if (lower.includes('rupee') || icon === '💰') return <IndianRupee className="w-10 h-10" />;
        if (lower.includes('peace') || icon === '☮️' || icon === '🧘' || icon === '🕊️') return <Flower className="w-10 h-10" />;
        if (lower.includes('heart') || icon === '❤️') return <Heart className="w-10 h-10" />;
        if (icon === '🌟' || icon === '✨' || icon === '🚀' || icon === '💡' || icon === '🔓') return <Sun className="w-10 h-10" />;
        if (icon === '🏠' || icon === '🏡' || icon === '🚧' || icon === '📍') return <MapPin className="w-10 h-10" />;
        if (icon === '🎓' || icon === '🧠' || icon === '📜') return <Scroll className="w-10 h-10" />;
        if (icon === '⚕️' || icon === '💪' || icon === '🔥' || icon === '🌱') return <Flame className="w-10 h-10" />;
        if (icon === '🛡️') return <ShieldCheck className="w-10 h-10" />;
        if (icon === '🕉️') return <Sun className="w-10 h-10" />;

        return <Star className="w-10 h-10" />;
    };
    // Theme color map for dynamic styling - Expanded for modern UI
    const brandTheme = {
        bg: "bg-orange-50 dark:bg-orange-950/20",
        text: "text-orange-600 dark:text-orange-400",
        border: "border-orange-200 dark:border-orange-800",
        gradient: "from-orange-500 to-red-600",
        glow: "shadow-orange-500/50",
        hex: "#f97316",
        shadowHex: "#9a3412",
        rgba: "249,115,22",
        lightHex: "#fbbf24",
        darkHex: "#ea580c"
    };

    const theme = brandTheme;
    const themeColor = "saffron"; // Standardize for tailwind class prefixes

    const {
        name,
        tagline,
        heroImage,
        heroBenefits,
        about,
        whyPerform,
        process,
        benefits,
        timing,
        testimonials,
        faq,
        hero,
        footer
    } = puja;

    const { user } = useAuth();
    const { language } = useLanguage();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    
    // Booking Flow State
    const [bookingStep, setBookingStep] = useState<'selecting' | 'naming' | 'success'>('selecting');
    const [selectedPkg, setSelectedPkg] = useState<any>(null);
    const [sankalpName, setSankalpName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [realReviews, setRealReviews] = useState<any[]>([]);

    // Extract success screen config
    const config = (puja.packages || []).find(p => p.id === '__config__') as any;
    const successTitle = config?.successTitle || 'Jai Ho! 🎉';
    const successMessage = config?.successMessage || 'Booking Confirmed Successfully';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);

        // Auto-open packages if hash is present
        if (window.location.hash === '#packages') {
            // Use a small timeout to ensure everything is mounted and user state is loaded
            const timer = setTimeout(() => {
                scrollToBooking();
            }, 500);
            return () => {
                window.removeEventListener('scroll', handleScroll);
                clearTimeout(timer);
            };
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [user]); // Re-run when user state changes to ensure scrollToBooking has the right auth context

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`/api/puja-reviews/${puja.slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setRealReviews(data.reviews || []);
                }
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
            }
        };
        fetchReviews();
    }, [puja.slug]);

    const allReviews = [...realReviews, ...(testimonials.reviews || [])];

    const scrollToBooking = () => {
        if (!user) {
            // Force login for booking
            router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
            return;
        }
        setBookingStep('selecting');
        setIsBookingModalOpen(true);
    };

    const handlePackageSelect = (pkg: any) => {
        setSelectedPkg(pkg);
        setBookingStep('naming');
    };

    const handleBookingConfirm = async () => {
        if (!sankalpName.trim()) return;
        
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/puja-bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sankalp_name: sankalpName,
                    puja_name: name,
                    puja_slug: puja.slug,
                    package_name: selectedPkg.name,
                    price: selectedPkg.price,
                    user_id: user?.id
                })
            });

            if (response.ok) {
                setBookingStep('success');
            } else {
                const err = await response.json();
                alert(err.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to book. Please try again or check if the database table exists.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => {
        // Divine Saffron Gradient for the title
        const titleGradient = "from-orange-500 via-yellow-500 to-orange-600";

        return (
            <div className="text-center mb-4 md:mb-6 relative z-10 px-4">
                {subtitle && (
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className={`h-[1px] w-6 md:w-12 bg-gradient-to-r from-transparent to-${themeColor}-500/50`}></div>
                        <span className={`text-${themeColor}-500 font-bold tracking-[0.15rem] md:tracking-[0.2em] uppercase text-[9px] md:text-xs`}>{subtitle}</span>
                        <div className={`h-[1px] w-6 md:w-12 bg-gradient-to-l from-transparent to-${themeColor}-500/50`}></div>
                    </div>
                )}
                <h2 className={`text-2xl sm:text-3xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${titleGradient} bg-[length:200%_auto] animate-gradient mb-2 md:mb-3 pb-1 leading-tight`} style={{ fontFamily: 'Georgia, serif' }}>
                    {children}
                </h2>
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-300 font-sans">
            <article>
            {/* Global Background Animation (Synced with Main Page) */}
            <UnifiedPujaBackground />

            {/* --- HERO SECTION --- */}
            <section id="hero" className="relative pt-4 pb-2 lg:pt-8 lg:pb-6 overflow-hidden min-h-[60vh] flex items-center">

                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        loading="lazy"
                        sizes="20vw"
                        className="object-cover opacity-40 dark:opacity-30 blur-[4px] scale-110"
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90"></div>
                </div>

                {/* Animated Background Blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-16">
                        {/* Text Content */}
                        <div className="lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className={`inline-block px-5 py-1.5 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] mb-2 md:mb-3 border border-${themeColor}-500/20 bg-${themeColor}-500/10 text-${themeColor}-600 backdrop-blur-md`}>
                                    {hero?.badgeText || "Premium Vedic Ritual"}
                                </span>
                                <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-3 leading-[1.2] md:leading-[1.1] font-serif text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 animate-gradient pb-2 px-2`}>
                                    {name}
                                </h1>
                                <CollapsibleText
                                    text={tagline}
                                    lineClamp={3}
                                    className="text-sm sm:text-base lg:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2 sm:px-4 md:px-0"
                                    buttonClassName="mx-auto lg:mx-0 text-xs sm:text-sm"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4"
                            >
                                {heroBenefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-card/40 border border-white/10 backdrop-blur-sm text-[10px] sm:text-xs md:text-sm font-medium">
                                        <BadgeCheck className={`w-3.5 h-3.5 md:w-4 h-4 ${theme.text}`} />
                                        {benefit}
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start pt-2 md:pt-4"
                            >
                                {/* 3D Primary Button with Fire Particles - Copied from HomeClient */}
                                <button
                                    onClick={scrollToBooking}
                                    className="group relative flex w-full sm:w-auto items-center justify-center h-14 md:h-16 px-6 sm:px-10 font-bold text-base md:text-lg text-white rounded-full transition-all duration-150 overflow-visible"
                                    style={{
                                        boxShadow: `0 6px 0 0 ${theme.shadowHex}`,
                                        transform: 'translateY(0)'
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(6px)';
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.boxShadow = `0 6px 0 0 ${theme.shadowHex}`;
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {/* Animated Snake Border */}
                                    <svg className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none" style={{ filter: `drop-shadow(0 0 4px rgba(${theme.rgba},0.6))`, zIndex: 20 }}>
                                        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="32" fill="none" stroke={theme.lightHex} strokeWidth="3" strokeDasharray="20 80" className="animate-snake-border" strokeLinecap="round" />
                                        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="32" fill="none" stroke={theme.hex} strokeWidth="3" strokeDasharray="20 10" className="animate-snake-border" style={{ strokeDashoffset: 500, animationDelay: '-4s' }} strokeLinecap="round" />
                                    </svg>

                                    <div className={`absolute inset-0 rounded-full overflow-hidden bg-gradient-to-r ${theme.gradient}`}>
                                        <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                            <FireParticles />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
                                    </div>
                                    <span className="relative z-10 flex items-center gap-2 md:gap-3 text-xs md:text-sm uppercase tracking-[0.2em]">
                                        Book Puja Now <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>

                                {/* Call Us Button - Pulse Ring */}
                                <a
                                    href="tel:+918989271245"
                                    className="group relative flex w-full sm:w-auto items-center justify-center gap-2 md:gap-3 h-14 md:h-16 px-6 sm:px-10 font-bold text-base md:text-lg text-green-600 bg-white border-2 border-white rounded-full shadow-[0_6px_0_0_#d1d5db] hover:shadow-[0_3px_0_0_#d1d5db] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all duration-150 overflow-visible animate-pulse-ring"
                                >
                                    <Phone className="w-4 h-4 md:w-5 md:h-5 animate-shake-call" />
                                    <span className="relative z-10 text-gray-800 text-xs md:text-base">Talk to Pandit</span>
                                </a>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2 relative w-full max-w-2xl mx-auto lg:max-w-none lg:h-auto">
                            <motion.div
                                initial={{ opacity: 1, scale: 0.98, rotate: -1 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white/10 w-full aspect-[4/3] group"
                            >
                                <Image
                                    src={heroImage}
                                    alt={name}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:from-black/80 md:via-transparent"></div>

                                {/* Floating Glass Badge */}
                                <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 right-4 sm:right-6 md:right-10 p-4 sm:p-6 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                                            <Sun className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest opacity-80">{hero?.glassBadgeLabel || "Performed By"}</p>
                                            <p className="text-xl font-bold font-serif">{hero?.glassBadgeValue || "Certified Vedic Archaryas"}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ABOUT SECTION --- */}
            <section id="about" className="py-6 md:py-10 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div className="order-2 md:order-1 relative">
                            {/* Decorative Animated Blobs */}
                            <div className={`absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-orange-500/10 dark:bg-orange-950/20 rounded-full blur-[100px] animate-drift-1 pointer-events-none`}></div>
                            <div className={`absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-yellow-500/10 dark:bg-yellow-950/20 rounded-full blur-[100px] animate-drift-2 pointer-events-none`}></div>

                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden group"
                            >
                                {/* Decorative Side Ornament */}
                                <div className="absolute top-0 left-0 w-1.5 md:w-2 h-full bg-gradient-to-b from-orange-500 via-yellow-500 to-orange-600 opacity-80"></div>

                                {/* Animated Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none"></div>

                                <h2 className="text-xl md:text-3xl font-black mb-3 md:mb-4 font-serif flex items-center gap-3 md:gap-4 text-gray-900 dark:text-white">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full animate-pulse"></div>
                                        <div className="relative p-2 md:p-3 bg-orange-500/20 rounded-xl md:rounded-2xl border border-orange-500/30">
                                            <Star className={`w-6 h-6 md:w-8 md:h-8 text-saffron`} fill="currentColor" />
                                        </div>
                                    </div>
                                    {about.significanceTitle || "Spiritual Significance"}
                                </h2>
                                <p className="text-base md:text-xl leading-relaxed text-gray-700 dark:text-white/80 mb-4 md:mb-5 font-light">
                                    {about.significance}
                                </p>
                                <div className={`relative p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-orange-500/[0.08] to-yellow-500/[0.04] border border-orange-500/20 dark:border-white/5 shadow-inner group/box overflow-hidden`}>
                                    {/* Box Glow */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover/box:bg-orange-500/20 transition-all duration-500"></div>

                                    <h3 className={`relative z-10 font-black flex items-center gap-2 md:gap-3 mb-3 md:mb-4 text-base md:text-lg text-saffron dark:text-orange-400 uppercase tracking-wider`}>
                                        <UserCheck className="w-5 h-5 md:w-6 md:h-6" /> {about.whoShouldPerformTitle || "Who Should Perform?"}
                                    </h3>
                                    <p className="relative z-10 text-sm md:text-gray-700 dark:text-starlight/80 leading-relaxed italic">{about.whoShouldPerform}</p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="order-1 md:order-2 space-y-6 md:space-y-8">
                            <div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-serif mb-4 md:mb-6 leading-tight">
                                    <span className={`text-${themeColor}-600`}>{about.heading || "Ancient Wisdom"}</span> <br />
                                    {about.subheading || "For Modern Life"}
                                </h2>
                                <CollapsibleText
                                    text={about.description}
                                    lineClamp={3}
                                    className="text-base md:text-xl text-muted-foreground leading-relaxed"
                                    buttonClassName="text-sm md:text-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3️⃣ WHY PEOPLE PERFORM THIS PUJA (Snake Cards) */}
            <section id="why-perform" className="py-8 md:py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <SectionHeading subtitle="Purpose">{whyPerform.title}</SectionHeading>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {whyPerform.reasons.map((reason, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className={`group relative p-1 rounded-3xl md:rounded-[32px] bg-gradient-to-br from-white/30 to-white/10 dark:from-white/10 dark:to-transparent backdrop-blur-xl border border-white/20 hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.3)] overflow-hidden`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-10 -translate-y-10 animate-pulse`}></div>

                                <div className="relative p-6 md:p-8 h-full flex flex-col items-center text-center z-10">
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
                                        <div className={`absolute inset-0 bg-orange-500/30 rounded-2xl blur-xl group-hover:blur-2xl group-hover:bg-orange-500/50 transition-all duration-500 scale-75 group-hover:scale-110 animate-pulse`}></div>
                                        <div className={`relative w-full h-full bg-gradient-to-br from-white to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl md:rounded-3xl flex items-center justify-center border border-orange-500/20 shadow-xl group-hover:scale-105 transition-transform duration-500`}>
                                            <div className="text-orange-500 scale-90 md:scale-100 group-hover:scale-110 transition-transform duration-300">
                                                {getIcon(reason.icon)}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className={`font-black text-lg md:text-xl mb-3 md:mb-4 font-serif text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors uppercase tracking-tight`}>{reason.title}</h3>
                                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">{reason.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button - Floating Water Animation */}
                    <div className="text-center mt-6 md:mt-10 px-4">
                        <button
                            onClick={scrollToBooking}
                            className={`group relative inline-flex items-center justify-center gap-2 md:gap-3 px-8 md:px-14 py-6 md:py-10 rounded-full border-2 border-saffron/20 text-saffron hover:text-white transition-all duration-300 font-black overflow-hidden shadow-[0_0_40px_-10px_rgba(249,115,22,0.6)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.8)] hover:-translate-y-1`}
                        >
                            <span className="relative z-10 flex items-center gap-2 text-base md:text-lg">
                                BOOK THIS PUJA NOW
                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                            {/* Wave Animation */}
                            <div className="absolute inset-0 overflow-hidden rounded-full transform translate-z-0">
                                <div className={`absolute bottom-0 left-0 right-0 bg-saffron transition-all duration-500 ease-in-out h-[15%] group-hover:h-full`}></div>
                                <div className="absolute bottom-[15%] left-0 w-[200%] h-4 bg-repeat-x animate-wave group-hover:bottom-[100%] transition-all duration-500 ease-in-out"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23f97316' transform='scale(1, -1) translate(0, -120)'/%3E%3C/svg%3E")`,
                                        backgroundSize: '50% 100%'
                                    }}>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* --- PROCESS SECTION --- */}
            <section id="ritual-process" className={`py-8 md:py-16 relative overflow-hidden bg-gradient-to-b from-transparent via-${themeColor}-500/5 to-transparent dark:via-${themeColor}-900/10`}>
                {/* Subtle Texture Overlay (CSS-based to avoid 404) */}
                <div
                    className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                ></div>
                <div className="container mx-auto px-4 relative z-10">
                    <SectionHeading subtitle={process.subtitle || "Vedic Vidhi"}>{process.title}</SectionHeading>

                    <div className="mt-8 relative">
                        {/* Enhanced Process Timeline Line with Shimmer effect */}
                        <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 lg:block overflow-hidden">
                            {/* Base Glow Line */}
                            <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-saffron to-transparent opacity-30 blur-[2px]`}></div>
                            {/* Solid Base Line */}
                            <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-saffron/40 to-transparent`}></div>
                            {/* Animated Shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-snake-border" style={{ animationDuration: '4s' }}></div>
                        </div>

                        <div className="space-y-6 md:space-y-12 lg:relative">
                            {process.steps.map((step, idx) => (
                                <div key={idx} className={`flex flex-col lg:flex-row items-start lg:items-center gap-8 ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>

                                    {/* Enhanced Content Card */}
                                    <div className="w-full lg:w-5/12 pl-12 lg:pl-0 pr-2 lg:pr-0">
                                        <div className={`group relative bg-white/70 dark:bg-card/40 backdrop-blur-xl p-5 md:p-8 rounded-2xl md:rounded-3xl border border-${themeColor}-500/20 dark:border-white/10 hover:border-${themeColor}-500/50 hover:bg-white/80 dark:hover:bg-card/60 shadow-lg hover:shadow-[0_20px_50px_-5px_rgba(${theme.rgba},0.2)] transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3`}>

                                            {/* Glow Effect on Hover */}
                                            <div className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-${themeColor}-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                                            <div className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                                            <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                                                {/* Premium Number Badge with Glow */}
                                                <div className="relative flex-shrink-0">
                                                    <div className={`absolute inset-0 bg-orange-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                                    <div className={`relative w-10 h-10 md:w-12 lg:w-14 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center text-orange-600 dark:text-orange-400 font-black text-lg md:text-xl lg:text-2xl border-2 border-orange-500/30 dark:border-orange-500/30 group-hover:scale-110 group-hover:border-orange-600 dark:group-hover:border-orange-400 transition-all duration-300 shadow-inner`}>
                                                        {step.step}
                                                    </div>
                                                </div>

                                                {/* Enhanced Title with Gradient */}
                                                <h3 className={`text-lg md:text-2xl lg:text-3xl font-black font-serif pt-1 md:pt-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-${themeColor}-600 group-hover:to-${themeColor}-800 dark:group-hover:from-orange-400 dark:group-hover:to-red-400 transition-all duration-300 leading-tight`}>
                                                    {step.title}
                                                </h3>
                                            </div>

                                            <p className="text-xs md:text-base text-gray-600 dark:text-muted-foreground leading-relaxed pl-0 md:pl-[4rem] relative z-10 group-hover:text-gray-800 dark:group-hover:text-white/90 transition-colors">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Enhanced Timeline Node with Pulse Animation */}
                                    <div className="absolute left-6 lg:left-1/2 w-8 h-8 -translate-x-1/2 flex lg:flex items-center justify-center z-20">
                                        <div className="absolute w-8 h-8 rounded-full bg-saffron/30 animate-ping"></div>
                                        <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-saffron to-orange-600 ring-4 ring-white dark:ring-slate-900 shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                                    </div>

                                    <div className="hidden lg:block w-5/12"></div>
                                </div>
                            ))}
                        </div>

                        {/* Features Grid at Bottom */}
                        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {process.features.map((feature, idx) => (
                                <div key={idx} className={`flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white/50 dark:bg-card/30 border border-${themeColor}-500/10 dark:border-white/5 hover:bg-white/70 dark:hover:bg-card/50 hover:border-${themeColor}-500/30 dark:hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-sm md:text-base text-gray-700 dark:text-foreground">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Enhanced "Sacred Fire" CTA Button */}
                        <div className="text-center mt-10 relative z-20">
                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="group relative inline-flex items-center justify-center h-16 px-12 font-bold text-lg text-white rounded-full transition-all duration-150 overflow-visible"
                                style={{
                                    boxShadow: `0 8px 0 0 ${theme.shadowHex}`,
                                    transform: 'translateY(0)'
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(8px)';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.boxShadow = `0 8px 0 0 ${theme.shadowHex}`;
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* Multi-layer Animated Border */}
                                <svg className="absolute -inset-[3px] w-[calc(100%+6px)] h-[calc(100%+6px)] pointer-events-none" style={{ filter: `drop-shadow(0 0 8px rgba(${theme.rgba},0.6))`, zIndex: 20 }}>
                                    <rect x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" rx="32" fill="none" stroke="url(#grad1)" strokeWidth="3" strokeDasharray="20 80" className="animate-snake-border" strokeLinecap="round" />
                                    <rect x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" rx="32" fill="none" stroke="url(#grad2)" strokeWidth="3" strokeDasharray="20 10" className="animate-snake-border" style={{ strokeDashoffset: 500, animationDelay: '-4s' }} strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={theme.lightHex} />
                                            <stop offset="100%" stopColor={theme.hex} />
                                        </linearGradient>
                                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor={theme.hex} />
                                            <stop offset="100%" stopColor={theme.darkHex} />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Background with Fire Particles */}
                                <div className={`absolute inset-0 rounded-full overflow-hidden bg-gradient-to-r ${theme.gradient}`}>
                                    {/* Layered Fire Effect */}
                                    <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                        <FireParticles />
                                    </div>

                                    {/* Floating Glow */}
                                    <div className={`absolute -inset-2 bg-gradient-to-r from-${themeColor}-400/0 via-${themeColor}-300/30 to-${themeColor}-400/0 blur-xl animate-pulse`}></div>

                                    {/* Enhanced Shimmer */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite]"></div>
                                </div>

                                <span className="relative z-10 flex items-center gap-3 text-base uppercase tracking-[0.25em] drop-shadow-lg">
                                    <Sun className="w-5 h-5 animate-pulse" />
                                    Start Your Sacred Journey
                                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6️⃣ BENEFITS GRID (Snake Cards) */}
            <section id="benefits" className="py-8 md:py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <SectionHeading subtitle="Blessings">{benefits.title}</SectionHeading>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.cards.map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative h-full"
                            >
                                <div className={`relative h-full bg-white/40 dark:bg-card/40 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] md:rounded-[32px] border border-white/40 dark:border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl overflow-hidden flex flex-col group`}>

                                    {/* Animated Aura Gradient */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                    {/* Top Sparkle */}
                                    <div className="absolute top-0 right-0 p-6 md:p-8 opacity-0 group-hover:opacity-20 transition-opacity">
                                        <Star className={`w-16 h-16 md:w-24 md:h-24 text-orange-500 rotate-12`} />
                                    </div>

                                    <div className="text-4xl md:text-6xl mb-6 md:mb-8 transform group-hover:scale-110 md:group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500 origin-left filter drop-shadow-2xl">
                                        {card.icon}
                                    </div>
                                    <h3 className={`text-xl md:text-2xl font-black mb-3 md:mb-4 font-serif text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors tracking-tight`}>{card.title}</h3>
                                    <p className="text-sm md:text-lg text-muted-foreground leading-relaxed flex-grow font-light">{card.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button - Floating Water Animation */}
                    <div className="text-center mt-6 md:mt-10 px-4">
                        <button
                            onClick={scrollToBooking}
                            className={`group relative inline-flex items-center justify-center gap-2 md:gap-3 px-8 md:px-14 py-6 md:py-10 rounded-full border-2 border-saffron/20 text-saffron hover:text-white transition-all duration-300 font-black overflow-hidden shadow-[0_0_40px_-10px_rgba(249,115,22,0.6)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.8)] hover:-translate-y-1`}
                        >
                            <span className="relative z-10 flex items-center gap-2 text-base md:text-lg">
                                BOOK THIS PUJA NOW
                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                            {/* Wave Animation */}
                            <div className="absolute inset-0 overflow-hidden rounded-full transform translate-z-0">
                                <div className={`absolute bottom-0 left-0 right-0 bg-saffron transition-all duration-500 ease-in-out h-[15%] group-hover:h-full`}></div>
                                <div className="absolute bottom-[15%] left-0 w-[200%] h-4 bg-repeat-x animate-wave group-hover:bottom-[100%] transition-all duration-500 ease-in-out"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23f97316' transform='scale(1, -1) translate(0, -120)'/%3E%3C/svg%3E")`,
                                        backgroundSize: '50% 100%'
                                    }}>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* 7️⃣ WHEN TO PERFORM */}
            <section id="timing" className="py-6 md:py-12 relative overflow-hidden">
                {/* Subtle Texture Overlay (CSS-based to avoid 404) */}
                <div
                    className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                ></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <SectionHeading subtitle={timing.subtitle || "Muhurat"}>{timing.title}</SectionHeading>

                    <div className="max-w-5xl mx-auto">
                        <div className={`relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-saffron/20 dark:border-white/10 shadow-2xl group transition-all duration-500`}>

                            {/* Decorative Background Elements */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-saffron/10 rounded-full blur-[100px] animate-pulse"></div>
                                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] dark:opacity-[0.05]"></div>
                            </div>

                            {/* Animated Gradient Border Pulse */}
                            <div className="absolute inset-0 p-[2px] rounded-[2rem] md:rounded-[3rem] overflow-hidden pointer-events-none">
                                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-saffron/40 to-transparent -translate-x-full group-hover:animate-shine opacity-60`}></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
                                {/* Left: Occasions (Cosmic Alignment) */}
                                <div className={`p-6 sm:p-10 md:p-14 text-left border-b md:border-b-0 md:border-r border-saffron/10 dark:border-white/10 relative overflow-hidden backdrop-blur-sm`}>
                                    <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-5 font-serif flex items-center gap-3 md:gap-4 text-gray-900 dark:text-white">
                                        <div className={`relative w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-saffron/10 flex items-center justify-center border border-saffron/20 shadow-inner`}>
                                            <Star className={`w-4 h-4 md:w-6 md:h-6 text-saffron`} fill="currentColor" />
                                        </div>
                                        {timing.occasionsTitle || "Cosmic Alignment"}
                                    </h2>

                                    <ul className="space-y-3 md:space-y-6 relative z-10">
                                        {timing.occasions.map((occasion, i) => (
                                            <li key={i} className={`flex items-start gap-3 md:gap-4 p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-white/40 dark:bg-white/5 border border-transparent hover:border-saffron/30 dark:hover:border-saffron/30 hover:bg-saffron/[0.03] transition-all duration-300 group/item`}>
                                                <div className="mt-1 bg-saffron/10 p-1 md:p-1.5 rounded-lg">
                                                    <Star className={`w-3.5 h-3.5 md:w-4 h-4 text-saffron opacity-60 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all`} />
                                                </div>
                                                <span className="text-sm md:text-lg text-gray-700 dark:text-white/80 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors font-medium tracking-tight">
                                                    {occasion}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right: Muhurat & Action */}
                                <div className="p-6 sm:p-10 md:p-14 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-transparent to-saffron/[0.03] dark:to-saffron/[0.05]">
                                    <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 font-serif text-gray-900 dark:text-white text-center md:text-left flex items-center justify-center md:justify-start gap-3 md:gap-4">
                                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner">
                                            <Clock className="w-4 h-4 md:w-6 md:h-6 text-purple-600 dark:text-purple-300" />
                                        </div>
                                        {timing.muhuratTitle || "Shubh Muhurat"}
                                    </h2>

                                    {/* Muhurat Display Box */}
                                    <div className="relative mb-8 md:mb-12 group/date">
                                        <div className={`absolute inset-0 bg-gradient-to-r from-saffron to-orange-600 blur-2xl opacity-10 group-hover/date:opacity-20 transition-opacity duration-500`}></div>
                                        <div className={`relative bg-white/70 dark:bg-slate-900/70 border border-saffron/30 dark:border-white/10 p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] text-center shadow-xl backdrop-blur-xl group-hover/date:-translate-y-1 transition-transform duration-300`}>
                                            <p className={`text-lg md:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-saffron to-orange-700 dark:from-saffron dark:to-orange-400 tracking-wide font-serif leading-relaxed`}>
                                                "{timing.muhurat}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Cosmic Pulse Button */}
                                    <button
                                        onClick={scrollToBooking}
                                        className={`relative w-full group/btn overflow-hidden rounded-xl bg-gradient-to-r from-${themeColor}-500 to-${themeColor}-700 dark:from-${themeColor}-600 dark:to-${themeColor}-800 p-[1px] shadow-[0_5px_20px_-5px_rgba(${theme.rgba},0.4)] hover:shadow-[0_8px_30px_-5px_rgba(${theme.rgba},0.6)] transition-all duration-300 hover:scale-[1.02]`}
                                    >
                                        <div className="relative h-full bg-white/20 dark:bg-black/30 backdrop-blur-sm rounded-xl px-4 md:px-8 py-3.5 md:py-5 flex items-center justify-center gap-2 md:gap-3 overflow-hidden">
                                            <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-90 group-hover/btn:opacity-100 transition-opacity`}></div>

                                            {/* Shine Effect */}
                                            <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                                            <span className="relative z-10 font-bold text-sm md:text-lg text-white uppercase tracking-widest flex items-center gap-2 md:gap-3">
                                                Book Now
                                                <ArrowRight className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </button>

                                    <p className="text-xs text-center md:text-left text-gray-500 dark:text-white/30 mt-4 uppercase tracking-wider font-medium">
                                        * Verified by Vedic Astrologers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            {allReviews.length > 0 && (
                <section id="testimonials" className="py-8 md:py-16 relative z-10">
                    <div className="container mx-auto px-4">
                        <SectionHeading subtitle="Trust">{testimonials.title || "What Devotees Say"}</SectionHeading>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {allReviews.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative group h-full"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 dark:from-orange-500/5 dark:to-transparent rounded-[2rem] md:rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="relative bg-white/40 dark:bg-card/40 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/40 dark:border-white/10 hover:border-orange-500/40 hover:bg-white/60 dark:hover:bg-card/60 shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden">
                                        <div className="absolute top-0 right-0 p-6 md:p-8 text-orange-500/10 group-hover:text-orange-500/20 transition-colors">
                                            <Flower className="w-12 h-12 md:w-16 md:h-16 rotate-12" />
                                        </div>
                                        <div className="flex text-amber-500 mb-6 md:mb-8 gap-0.5 md:gap-1">
                                            {[...Array(5)].map((_, si) => (
                                                <Star key={si} className={`w-4 h-4 md:w-5 md:h-5 ${si < Math.floor(t.rating) ? "fill-current" : "opacity-20"} animate-pulse`} style={{ animationDelay: `${si * 0.2}s` }} />
                                            ))}
                                        </div>
                                        <p className="text-base md:text-xl text-gray-800 dark:text-muted-foreground italic mb-8 md:mb-10 leading-relaxed font-serif relative z-10">"{t.comment}"</p>
                                        <div className="flex items-center gap-4 md:gap-5 mt-auto">
                                            <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-black text-lg md:text-2xl text-white shadow-lg overflow-hidden`}>
                                                {t.avatar && (t.avatar.startsWith('http') || t.avatar.startsWith('/') || t.avatar.includes('.')) ? (
                                                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span>{t.avatar || t.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-black font-serif text-lg md:text-xl text-gray-900 dark:text-white">{t.name}</p>
                                                <p className={`text-[10px] md:text-sm text-orange-600 font-black uppercase tracking-widest`}>{t.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- FAQ SECTION --- */}
            {faq.items && faq.items.length > 0 && (
                <section id="faq" className="py-6 md:py-12">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <SectionHeading subtitle="Common Questions">{faq.title || "Frequently Asked Questions"}</SectionHeading>
                        <div className="space-y-4 md:space-y-6">
                            {faq.items.map((item, i) => (
                                <motion.details
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    open={i === 0}
                                    className="group bg-white/40 dark:bg-card/40 backdrop-blur-xl p-5 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/40 dark:border-white/10 cursor-pointer open:bg-white/60 dark:open:bg-card shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                                >
                                    <summary className="font-black text-lg md:text-xl mb-2 flex items-center justify-between list-none select-none text-gray-900 dark:text-white">
                                        <div className="flex items-start gap-3 md:gap-5">
                                            <div className={`mt-0.5 md:mt-1 w-6 h-6 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-600 font-bold group-open:scale-110 transition-transform text-xs md:text-base`}>?</div>
                                            <span className="group-hover:text-orange-600 transition-colors leading-tight">{item.question}</span>
                                        </div>
                                        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-orange-500 group-open:rotate-180 transition-transform duration-500 flex-shrink-0" />
                                    </summary>
                                    <div className="text-gray-700 dark:text-muted-foreground ml-9 md:ml-13 mt-4 md:mt-6 leading-relaxed animate-fade-in text-sm md:text-lg font-light">
                                        {item.answer}
                                    </div>
                                </motion.details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- FINAL BOOKING CTA --- */}
            <section id="book-now" className="py-10 md:py-16 relative overflow-hidden bg-background transition-colors duration-1000">
                {/* Background: Clean & Sacred Aura */}
                <div className="absolute inset-0 pointer-events-none select-none">
                    {/* Radial Brand Gradient */}
                    <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(${theme.rgba},0.08),transparent_70%)] opacity-80`}></div>

                    {/* Centered Rotating Mandala (Slightly smaller for better containment) */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] max-w-[1000px] aspect-square opacity-[0.05] dark:opacity-[0.1]"
                    >
                        <svg viewBox="0 0 100 100" className={`w-full h-full text-saffron`}>
                            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.05" strokeDasharray="2 2" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
                            {[...Array(12)].map((_, i) => (
                                <g key={i} transform={`rotate(${i * 30} 50 50)`}>
                                    <path d="M50 5 C52 15, 48 15, 50 5 Z" fill="currentColor" opacity="0.3" />
                                </g>
                            ))}
                        </svg>
                    </motion.div>

                    {/* Subtle Texture Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className={`relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white dark:border-white/5 shadow-2xl p-6 md:p-16 lg:p-24 text-center group`}
                        >
                            {/* Inner Accent Frame */}
                            <div className="absolute inset-4 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/40 dark:border-white/5 pointer-events-none"></div>

                            {/* Corner Decorative Ornaments (More subtle) */}
                            <div className="absolute top-0 right-0 p-6 md:p-10 opacity-10 dark:opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                                <Sun className="w-16 h-16 md:w-24 md:h-24 text-saffron" strokeWidth={0.5} />
                            </div>
                            <div className="absolute bottom-0 left-0 p-6 md:p-10 opacity-10 dark:opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-1000 rotate-180">
                                <Sun className="w-16 h-16 md:w-24 md:h-24 text-saffron" strokeWidth={0.5} />
                            </div>

                            {/* Floating Sacred Elements (Reduced for better arrangement) */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                                {[...Array(4)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ y: [0, -20, 0], opacity: [0, 0.1, 0] }}
                                        transition={{ duration: 5 + i, repeat: Infinity, delay: i * 2 }}
                                        className="absolute text-xl text-saffron"
                                        style={{ left: `${20 + i * 20}%`, top: `${30 + (i % 2) * 40}%` }}
                                    >
                                        {i % 2 === 0 ? '🕉️' : '🪷'}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Interactive Shimmer Sweep */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1500">
                                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-[250%] group-hover:translate-x-[250%] transition-transform duration-[4000ms] ease-linear`}></div>
                            </div>

                            {/* Main Content */}
                            <div className="relative z-10">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-saffron/10 border border-saffron/20 text-saffron font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-[10px] md:text-xs mb-2 md:mb-4"
                                >
                                    <Star className="w-3 h-3 md:w-3.5 md:h-3.5 animate-pulse" />
                                    Divine Vedic Tradition
                                    <Star className="w-3 h-3 md:w-3.5 md:h-3.5 animate-pulse" />
                                </motion.div>

                                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black font-serif mb-4 md:mb-6 leading-[1.2] md:leading-[1.15] text-gray-900 dark:text-white tracking-tight px-2">
                                    {footer?.title?.split('\n').map((line, lid) => (
                                        <React.Fragment key={lid}>
                                            {line} <br className="hidden md:block" />
                                        </React.Fragment>
                                    )) || (
                                            <>
                                                Ready for your <br className="hidden md:block" />
                                                <span className={`text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-gold to-orange-500 dark:from-orange-400 dark:via-gold dark:to-orange-300 animate-gradient bg-[length:200%_auto] filter drop-shadow-sm px-1`}>
                                                    Divine Transformation?
                                                </span>
                                            </>
                                        )}
                                </h2>

                                <p className="text-sm md:text-xl text-gray-600 dark:text-white/60 mb-4 md:mb-6 max-w-2xl mx-auto font-light leading-relaxed px-4">
                                    {footer?.description || "Experience the sacred peace of ancient rituals. Our Vedic experts are here to help you invite prosperity into your home."}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-6 md:mb-8 px-4">
                                    <a
                                        href="https://wa.me/918989271245"
                                        className="group/wa relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-[#25D366] text-white font-black text-base md:text-xl shadow-[0_15px_30_rgba(37,211,102,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 md:gap-4 overflow-hidden"
                                    >
                                        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-current relative z-10 animate-shake" />
                                        <span className="relative z-10 tracking-tight">Chat on WhatsApp</span>
                                    </a>

                                    <button
                                        onClick={scrollToBooking}
                                        className={`group/call relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-white dark:bg-white/5 border-2 border-orange-100 dark:border-white/10 text-gray-900 dark:text-white font-black text-base md:text-xl hover:bg-gray-50 dark:hover:bg-white/10 hover:border-orange-500 transition-all duration-300 flex items-center justify-center gap-3 md:gap-4 hover:-translate-y-1 shadow-lg glass-glow`}
                                    >
                                        <Phone className={`w-5 h-5 md:w-6 md:h-6 text-saffron animate-phone-vibrate`} />
                                        <span className="relative z-10 tracking-tight uppercase">Call Pandit Ji</span>
                                    </button>
                                </div>

                                {/* Premium Trust Indicators */}
                                {/* Trust Indicators - Clean Row */}
                                <div className="pt-8 md:pt-12 border-t border-gray-100 dark:border-white/5 flex flex-wrap justify-center gap-6 md:gap-16">
                                    {[
                                        { icon: UserCheck, text: "Divine Path", val: "10k+ Devotees" },
                                        { icon: Star, text: "Sacred Merit", val: "4.9/5 Rating" },
                                        { icon: CheckCircle, text: "Expert Gurus", val: "Vedic Certified" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 md:gap-4 text-left group/item cursor-default">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-saffron/5 border border-saffron/10 flex items-center justify-center group-hover/item:bg-saffron/10 transition-colors duration-300">
                                                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-saffron group-hover/item:scale-110 transition-transform" />
                                            </div>
                                            <div>
                                                <div className="text-[9px] md:text-[10px] font-black text-saffron uppercase tracking-widest leading-none mb-1">{item.text}</div>
                                                <div className="text-[10px] md:text-xs font-bold text-gray-600 dark:text-white/40">{item.val}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Spiritual Family Section */}
            <SpiritualFamilySection />

            {/* STICKY FLOATING BUTTON (Mobile Only) */}
            <AnimatePresence>
                {
                    isScrolled && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none md:hidden"
                        >
                            <button
                                onClick={scrollToBooking}
                                className={`pointer-events-auto bg-gradient-to-r ${theme.gradient} text-white px-8 py-4 rounded-full font-bold shadow-2xl shadow-orange-500/40 flex items-center gap-3 animate-float hover:scale-105 transition-transform border-2 border-white/20`}
                            >
                                <span>Book Now</span>
                                <ArrowRight className="w-5 h-5 ml-1" />
                            </button>
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <BookingPackagesPopup 
                isOpen={isBookingModalOpen && bookingStep === 'selecting'}
                onClose={() => setIsBookingModalOpen(false)}
                pujaName={name}
                packages={puja.packages || []}
                onSelect={handlePackageSelect}
                isHindi={language === 'hi'}
            />

            {/* Step 2: Sankalp Name Entry */}
            <AnimatePresence>
                {isBookingModalOpen && bookingStep === 'naming' && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsBookingModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[32px] border border-orange-500/20 shadow-2xl p-8 overflow-hidden"
                        >
                            {/* Decorative element */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600" />
                            
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white font-serif">Sankalp Ritual Details</h3>
                                    <p className="text-xs text-orange-500 font-bold uppercase tracking-widest mt-1">Personalizing your puja</p>
                                </div>
                                <button onClick={() => setIsBookingModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/10 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                        <p className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-tighter">Selected Package</p>
                                    </div>
                                    <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">{selectedPkg?.name}</p>
                                    <p className="text-xl font-black text-orange-600 mt-1 flex items-center"><IndianRupee size={18} /> {selectedPkg?.price}</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Entrance Name for Sankalp</label>
                                    <input 
                                        type="text"
                                        value={sankalpName}
                                        onChange={(e) => setSankalpName(e.target.value)}
                                        placeholder="Full Name (for Vedic chanting)"
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-orange-100 dark:border-white/10 bg-gray-50 dark:bg-black/20 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-all text-lg font-bold"
                                        autoFocus
                                    />
                                    <p className="text-[10px] text-gray-400 mt-2 italic px-1">This name will be used by our Panditji during the ritual invocation.</p>
                                </div>

                                <button 
                                    onClick={handleBookingConfirm}
                                    disabled={!sankalpName.trim() || isSubmitting}
                                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-lg shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            Complete Booking <ArrowRight className="w-6 h-6" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Step 3: Success Screen */}
            <AnimatePresence>
                {isBookingModalOpen && bookingStep === 'success' && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-emerald-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[40px] border-4 border-emerald-500/20 shadow-2xl p-10 text-center overflow-hidden"
                        >
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
                            
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                                className="w-24 h-24 bg-emerald-500 rounded-full mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/40"
                            >
                                <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
                            </motion.div>

                            <h3 className="text-3xl font-black text-gray-900 dark:text-white font-serif mb-4">{successTitle}</h3>
                            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{successMessage}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
                                Divine blessings await you, <span className="text-gray-900 dark:text-white font-black">{sankalpName}</span>. Your ritual has been scheduled.
                            </p>

                            <div className="space-y-4">
                                <a
                                    href={`https://wa.me/918989271245?text=${encodeURIComponent(`Namaste! My booking for ${selectedPkg?.name} is confirmed for ${name} (Sankalp: ${sankalpName}). Please share the ritual details.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-5 rounded-2xl bg-[#25D366] text-white font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-emerald-500/20"
                                >
                                    <MessageCircle className="w-6 h-6 fill-current" />
                                    पंडित जी से WhatsApp पर बात करें
                                </a>
                                
                                <button 
                                    onClick={() => setIsBookingModalOpen(false)}
                                    className="w-full py-4 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Close and Continue
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            </article>
        </main >
    );
}
