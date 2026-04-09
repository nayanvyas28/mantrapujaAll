'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import {
    MapPin,
    Calendar,
    Plane,
    Train,
    Car,
    Info,
    ArrowLeft,
    Sparkles,
    Waves,
    Mountain,
    Compass,
    ChevronRight,
    BookText,
    History,
    CheckCircle2,
    Search,
    List,
    ChevronDown,
    Quote,
    MessageCircle,
    Users,
    Stethoscope,
    HandHelping
} from 'lucide-react';
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import { locations as staticLocations, Location } from '../../../data/spiritual-locations';
import { locationDetails, getDetailsForLocation, LocationDetail } from '../../../data/location-details';
import { useLoading } from "@/context/LoadingContext";

export default function DestinationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const [dbDetail, setDbDetail] = useState<any>(null);
    const [activeSection, setActiveSection] = useState('essence');
    const [loading, setLoading] = useState(true);
    const { setIsLoading } = useLoading();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

                const { data, error } = await supabase
                    .from('destinations')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (data) {
                    setDbDetail(data);
                }
            } catch (err) {
                console.error("Error fetching destination detail:", err);
            } finally {
                setLoading(false);
                setIsLoading(false);
            }
        };
        setIsLoading(true);
        fetchDetail();
    }, [slug]);

    const baseLocation = useMemo(() =>
        staticLocations.find(l => l.slug === slug),
        [slug]);

    const staticDetails = useMemo(() =>
        getDetailsForLocation(slug),
        [slug]);

    const fullDetails = useMemo(() => {
        if (dbDetail) {
            // Merge database data with static structure
            const content = dbDetail.content || {};
            return {
                id: dbDetail.id,
                name: dbDetail.name,
                slug: dbDetail.slug,
                type: dbDetail.type,
                description: dbDetail.description,
                image: (dbDetail.images && dbDetail.images.length > 0) ? dbDetail.images[0] : '/logo.png',
                stateId: dbDetail.state_id,
                x: dbDetail.x,
                y: dbDetail.y,
                ...content
            } as LocationDetail;
        }

        return {
            ...(baseLocation || {}),
            ...staticDetails
        } as LocationDetail;
    }, [baseLocation, staticDetails, dbDetail]);

    // Generate Sections for ToC
    const sections = useMemo(() => {
        const s = [
            { id: 'essence', label: 'Spiritual Essence', icon: Sparkles, color: 'text-saffron' },
        ];
        if (fullDetails.keyRituals?.length) s.push({ id: 'rituals', label: 'Sacred Rituals', icon: Waves, color: 'text-orange-500' });
        if (fullDetails.highlights?.length) s.push({ id: 'sites', label: 'Must-Visit Sites', icon: Mountain, color: 'text-amber-500' });
        if (fullDetails.longDescription) s.push({ id: 'narrative', label: 'Divine Narrative', icon: BookText, color: 'text-indigo-500' });
        if (fullDetails.spiritualArchitecture) s.push({ id: 'architecture', label: 'Architecture', icon: Compass, color: 'text-emerald-500' });
        if (fullDetails.vedicReferences) s.push({ id: 'vedic', label: 'Vedic Wisdom', icon: History, color: 'text-purple-500' });
        if (fullDetails.localLegends) s.push({ id: 'legends', label: 'Legends', icon: Sparkles, color: 'text-rose-500' });
        if (fullDetails.faqs?.length) s.push({ id: 'faqs', label: 'Insights (FAQ)', icon: Info, color: 'text-blue-500' });
        return s;
    }, [fullDetails]);

    // Handle Scroll for Active Section
    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = sections.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + 200;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const el = sectionElements[i];
                if (el && el.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsMobileMenuOpen(false);
    };

    // Handle Loading State
    if (loading) {
        return null; // Handled by global LoadingScreen
    }

    // Check if destination exists in either Static or DB
    const exists = baseLocation || locationDetails[slug] || dbDetail;

    if (!exists) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Destination Not Found</h2>
                    <Link href="/locations" className="text-saffron hover:underline flex items-center gap-2 justify-center">
                        <ArrowLeft className="w-4 h-4" /> Back to Sacred Map
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative pb-20">
            {/* Unified Background */}
            <UnifiedPujaBackground />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-saffron z-[100] origin-left"
                style={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
            />


            {/* 1. Immersive Hero Section */}
            <section className={`relative ${fullDetails.image && fullDetails.image !== 'null' && fullDetails.image !== '' ? 'h-[75vh] md:h-[85vh]' : 'h-[60vh]'} flex items-end overflow-hidden pt-20`}>
                {/* Background Image with Parallax Effect & Fallback */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-black/40 z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 z-15"></div>
                    {fullDetails.image && fullDetails.image !== 'null' && fullDetails.image !== '' ? (
                        <motion.img
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src={fullDetails.image}
                            alt=""
                            className="w-full h-full object-cover border-none outline-none"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#2a1a0f] to-[#0a0500]" />
                    )}
                </div>

                <div className="container mx-auto px-4 relative z-20 pb-16 md:pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl"
                    >
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-all font-bold tracking-widest text-[10px] uppercase group cursor-pointer bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                        >
                            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Return to Scared Map
                        </button>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="px-5 py-2 rounded-full bg-saffron text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_8px_30px_-5px_rgba(234,88,12,0.5)] border border-saffron/50 flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                {fullDetails.type}
                            </motion.span>
                            <div className="flex items-center gap-2 text-white/90 text-[10px] font-black uppercase tracking-[0.2em] bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                <MapPin className="w-3.5 h-3.5 text-saffron" />
                                {fullDetails.stateId?.toUpperCase()}
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white mb-8 leading-[0.9] tracking-tighter drop-shadow-2xl"
                            style={{ fontFamily: 'Georgia, serif', textShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                            {fullDetails.name}
                        </h1>

                        <p className="text-xl md:text-3xl text-white/95 font-light leading-relaxed max-w-3xl bg-black/20 backdrop-blur-lg rounded-2xl p-6 border-l-8 border-saffron shadow-2xl">
                            {fullDetails.description}
                        </p>
                    </motion.div>

                </div>
            </section>

            {/* Main Content Grid */}
            <div className="container mx-auto px-4 mt-12 md:mt-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left: Sticky ToC (2 cols) */}
                    <aside className="hidden lg:block lg:col-span-2 h-full">
                        <div className="sticky top-32 space-y-2 z-50">
                            <div className="flex items-center gap-2 mb-6 px-4">
                                <List className="w-4 h-4 text-saffron" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Chapters</span>
                            </div>
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-left group ${activeSection === section.id
                                        ? 'bg-saffron/10 text-saffron font-bold shadow-sm border border-saffron/20'
                                        : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                                        }`}
                                >
                                    <section.icon className={`w-4 h-4 shrink-0 transition-transform ${activeSection === section.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                                    <span className="text-xs tracking-tight">{section.label}</span>
                                    {activeSection === section.id && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-saffron"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Middle: Main Content (10 cols - expanded from 7) */}
                    <div className="lg:col-span-10 space-y-24">

                        {/* Relocated: Invoke Grace & Travel Intel (Combined Essentials) */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-32">
                            {/* Plan Puja CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative group overflow-hidden bg-gradient-to-br from-saffron to-orange-700 rounded-[40px] p-10 text-white shadow-3xl"
                            >
                                <div className="relative z-10">
                                    <h3 className="text-4xl font-black mb-6 font-serif leading-none italic">Invoke Grace in {fullDetails.name}</h3>
                                    <p className="text-white/90 text-sm mb-10 leading-relaxed font-medium">
                                        Connect with authentic Vedic priests and perform traditional rituals with complete guidance from Mantra Pooja.
                                    </p>
                                    <Link
                                        href={`/pooja-services?location=${fullDetails.slug}`}
                                        className="inline-flex items-center justify-center w-full py-5 px-8 bg-white text-saffron rounded-2xl font-black uppercase tracking-widest hover:bg-orange-50 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0 text-xs"
                                    >
                                        Initiate Your Ritual <ChevronRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000"></div>
                                <Sparkles className="absolute top-4 right-4 w-12 h-12 opacity-10 group-hover:rotate-12 transition-transform" />
                            </motion.div>

                            {/* Practical Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-[40px] overflow-hidden shadow-2xl"
                            >
                                <div className="bg-secondary/30 p-8 border-b border-border/40">
                                    <div className="flex items-center gap-3">
                                        <Info className="w-5 h-5 text-saffron" />
                                        <h3 className="font-black text-xs uppercase tracking-widest">Travel & Pilgrim Intel</h3>
                                    </div>
                                </div>

                                <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Auspicious Time</h4>
                                        <p className="text-xs font-bold leading-snug">{fullDetails.travelInfo?.bestTime}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                                            <Plane className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nearest Wings</h4>
                                        <p className="text-xs font-bold leading-snug">{fullDetails.travelInfo?.nearestAirport}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                                            <Train className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Devotion Rails</h4>
                                        <p className="text-xs font-bold leading-snug">{fullDetails.travelInfo?.nearestRailway}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </section>

                        {/* Spiritual Essence */}
                        <section id="essence" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 rounded-[24px] bg-saffron/10 border border-saffron/20 shadow-inner">
                                    <Sparkles className="w-8 h-8 text-saffron" />
                                </div>
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Spiritual Essence</h2>
                                    <div className="w-24 h-1.5 bg-gradient-to-r from-saffron to-transparent rounded-full mt-2"></div>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-[48px] p-8 md:p-12 shadow-2xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-saffron/20 to-transparent"></div>
                                <p className="text-xl md:text-2xl text-foreground/90 font-serif leading-relaxed mb-10 italic">
                                    {fullDetails.significance}
                                </p>

                                <div className="p-8 bg-saffron/5 border border-saffron/20 rounded-[32px] relative overflow-hidden">
                                    <History className="absolute -bottom-4 -right-4 w-32 h-32 text-saffron/5" />
                                    <div className="flex items-center gap-2 mb-4">
                                        <History className="w-4 h-4 text-saffron" />
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-saffron">Historical Legacy</h3>
                                    </div>
                                    <div className="text-lg text-muted-foreground leading-relaxed">
                                        {fullDetails.history}
                                    </div>
                                </div>
                            </motion.div>
                        </section>

                        {/* Sacred Rituals */}
                        {fullDetails.keyRituals?.length && (
                            <section id="rituals" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 rounded-[24px] bg-orange-500/10 border border-orange-500/20 shadow-inner">
                                        <Waves className="w-8 h-8 text-orange-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Sacred Rituals</h2>
                                        <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full mt-2"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-8">
                                    {fullDetails.keyRituals.map((ritual, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="group p-10 bg-card/60 backdrop-blur-xl border border-border/40 rounded-[40px] hover:border-orange-500/40 transition-all shadow-xl hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.2)]"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-start gap-8">
                                                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                                    <span className="text-2xl font-black italic">0{idx + 1}</span>
                                                </div>
                                                <div className="space-y-4">
                                                    <h3 className="text-3xl font-black font-serif text-foreground group-hover:text-orange-500 transition-colors">
                                                        {ritual.name}
                                                    </h3>
                                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                                        {ritual.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* CTA Button 1: Custom Ritual Request */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="p-1 gap-1 flex items-center justify-center"
                        >
                            <Link
                                href={`/contact?subject=Custom Ritual in ${fullDetails.name}`}
                                className="group relative px-12 py-6 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full text-white font-black uppercase tracking-[0.3em] text-xs shadow-[0_20px_50px_-10px_rgba(234,88,12,0.5)] hover:shadow-[0_30px_60px_-10px_rgba(234,88,12,0.7)] hover:-translate-y-2 transition-all duration-500 flex items-center gap-3 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                <span className="relative z-10">Request Custom Ritual</span>
                                <MessageCircle className="relative z-10 w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Must-Visit Sites */}
                        {fullDetails.highlights?.length && (
                            <section id="sites" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 rounded-[24px] bg-amber-500/10 border border-amber-500/20 shadow-inner">
                                        <Mountain className="w-8 h-8 text-amber-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">The Holy Circuit</h2>
                                        <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-transparent rounded-full mt-2"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {fullDetails.highlights.map((site, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            className="group p-8 bg-card/60 backdrop-blur-xl border border-border/40 rounded-[40px] hover:border-amber-500/40 transition-all shadow-lg text-center"
                                        >
                                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                                                <Compass className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl font-black font-serif mb-4 group-hover:text-amber-600 transition-colors">
                                                {site.name}
                                            </h3>
                                            <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                                                {site.description}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Long Description / Divine Narrative */}
                        {fullDetails.longDescription && (
                            <section id="narrative" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 rounded-[24px] bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
                                        <BookText className="w-8 h-8 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Divine Narrative</h2>
                                        <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-transparent rounded-full mt-2"></div>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <Quote className="absolute -top-10 -left-10 w-20 h-20 text-indigo-500/10 -scale-x-100" />
                                    <div className="text-xl md:text-3xl font-serif text-foreground/90 leading-[1.6] first-letter:text-8xl first-letter:font-black first-letter:text-saffron first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8] whitespace-pre-line text-justify hyphens-auto">
                                        {fullDetails.longDescription}
                                    </div>
                                </motion.div>
                            </section>
                        )}

                        {/* Spiritual Architecture */}
                        {fullDetails.spiritualArchitecture && (
                            <section id="architecture" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 rounded-[24px] bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
                                        <Compass className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Divine Design</h2>
                                        <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mt-2"></div>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-emerald-500/5 backdrop-blur-xl border border-emerald-500/20 rounded-[48px] p-10 md:p-14 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"></div>
                                    <div className="text-xl md:text-2xl text-muted-foreground leading-relaxed whitespace-pre-line font-medium border-l-4 border-emerald-500/30 pl-8">
                                        {fullDetails.spiritualArchitecture}
                                    </div>
                                </motion.div>
                            </section>
                        )}

                        {/* Vedic Wisdom */}
                        {fullDetails.vedicReferences && (
                            <section id="vedic" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 rounded-[24px] bg-purple-500/10 border border-purple-500/20 shadow-inner">
                                        <History className="w-8 h-8 text-purple-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Vedic Wisdom</h2>
                                        <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full mt-2"></div>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="p-10 md:p-16 rounded-[48px] border-4 border-double border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-background to-background relative overflow-hidden"
                                >
                                    <Sparkles className="absolute -top-10 -right-10 w-32 h-32 text-purple-500/10" />
                                    <div className="text-2xl md:text-4xl text-foreground font-serif leading-tight italic mb-8">
                                        "Scriptural Foundation"
                                    </div>
                                    <div className="text-xl md:text-2xl text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {fullDetails.vedicReferences}
                                    </div>
                                </motion.div>
                            </section>
                        )}

                        {/* CTA Button 2: Consult with a Scholar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-center py-10"
                        >
                            <Link
                                href="/scholars"
                                className="group relative flex items-center gap-6 p-1 pr-10 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 rounded-full transition-all duration-500 overflow-hidden"
                            >
                                <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                                    <HandHelping className="w-8 h-8" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 mb-1">Seek Wisdom</h4>
                                    <p className="text-xl font-black font-serif text-foreground">Consult with a Scholar</p>
                                </div>
                                <ChevronRight className="w-6 h-6 text-purple-500 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Legends & Miracles */}
                        {fullDetails.localLegends && (
                            <section id="legends" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 rounded-[24px] bg-rose-500/10 border border-rose-500/20 shadow-inner">
                                        <Sparkles className="w-8 h-8 text-rose-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Ancient Lore</h2>
                                        <div className="w-24 h-1.5 bg-gradient-to-r from-rose-500 to-transparent rounded-full mt-2"></div>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, rotate: -1 }}
                                    whileInView={{ opacity: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-[48px] p-10 md:p-14 border-dashed"
                                >
                                    <div className="text-xl md:text-2xl text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {fullDetails.localLegends}
                                    </div>
                                </motion.div>
                            </section>
                        )}

                        {/* Insights (FAQ) */}
                        {fullDetails.faqs?.length && (
                            <section id="faqs" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 rounded-[24px] bg-blue-500/10 border border-blue-500/20 shadow-inner">
                                        <Info className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Deep Insights</h2>
                                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full mt-2"></div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {fullDetails.faqs.map((faq, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="p-8 bg-card/60 backdrop-blur-xl border border-border/40 rounded-[32px] group hover:border-blue-500/30 transition-all"
                                        >
                                            <h3 className="text-2xl font-black mb-4 flex items-start gap-4 font-serif">
                                                <span className="text-blue-500 font-black">Q.</span>
                                                {faq.question}
                                            </h3>
                                            <p className="text-muted-foreground text-lg leading-relaxed pl-10 border-l-2 border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* CTA Button 3: Join the Sacred Community */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="relative group p-12 bg-card/60 backdrop-blur-xl border border-border/40 rounded-[48px] overflow-hidden text-center shadow-4xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 via-transparent to-orange-500/10"></div>
                            <div className="relative z-10 flex flex-col items-center gap-8">
                                <div className="p-6 rounded-full bg-gradient-to-tr from-saffron/20 to-orange-500/20 text-saffron border border-saffron/20">
                                    <Users className="w-12 h-12" />
                                </div>
                                <div className="max-w-xl mx-auto">
                                    <h3 className="text-4xl md:text-5xl font-black font-serif mb-4 leading-tight">Be Part of the <span className="text-saffron italic">Vedic Renaissance</span></h3>
                                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
                                        Join over 50,000+ devotees who receive weekly spiritual insights and exclusive early access to sacred rituals.
                                    </p>
                                    <Link
                                        href="/community"
                                        className="group relative inline-flex items-center gap-4 bg-foreground text-background px-12 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-saffron hover:text-white transition-all duration-500 shadow-2xl hover:shadow-saffron/50"
                                    >
                                        Join the Sacred Community <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-3 transition-transform duration-500" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex items-center gap-3 bg-saffron text-white px-8 py-4 rounded-full shadow-[0_15px_40px_-10px_rgba(234,88,12,0.6)] border border-white/20 active:scale-95 transition-all"
                >
                    <List className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
                    <span className="text-xs font-black uppercase tracking-widest">Explore Steps</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[80vw] bg-card/90 backdrop-blur-2xl border border-white/20 rounded-[40px] p-6 shadow-4xl"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${activeSection === section.id ? 'bg-saffron text-white' : 'bg-secondary/50 text-muted-foreground'}`}
                                >
                                    <section.icon className="w-4 h-4 shrink-0" />
                                    <span className="text-[10px] font-bold text-left leading-tight">{section.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* 3. Explore More CTA */}
            <section className="mt-32 py-32 relative z-20 overflow-hidden">
                <div className="absolute inset-0 bg-saffron/5 -skew-y-3 origin-right scale-y-110"></div>
                {/* Bottom Fade to blend with footer */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-5xl md:text-7xl font-black mb-6 font-serif">Continue Your <span className="text-saffron italic">Sacred Journey</span></h2>
                        <div className="w-32 h-1 bg-saffron mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                        {/* Sacred Map Card */}
                        <motion.div
                            whileHover={{ y: -12, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Link href="/locations" className="group relative block p-10 bg-card/40 backdrop-blur-xl border border-border/50 rounded-[40px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_-20px_rgba(249,115,22,0.2)] hover:border-saffron/40 transition-all overflow-hidden h-full">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-saffron/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-saffron group-hover:text-white transition-all duration-500 shadow-inner">
                                        <Compass className="w-10 h-10 group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-3">Sacred Map</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Discover other divine destinations and ancient energy centers across Bharat.
                                    </p>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Vedic Pujas Card */}
                        <motion.div
                            whileHover={{ y: -12, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Link href="/pooja-services" className="group relative block p-10 bg-card/40 backdrop-blur-xl border border-border/50 rounded-[40px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_-20px_rgba(234,88,12,0.2)] hover:border-orange-500/40 transition-all overflow-hidden h-full">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-inner">
                                        <Sparkles className="w-10 h-10 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-3">Vedic Pujas</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Explore ritual services performed with authentic methods by certified scholars.
                                    </p>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Sacred Blogs Card */}
                        <motion.div
                            whileHover={{ y: -12, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Link href="/blog" className="group relative block p-10 bg-card/40 backdrop-blur-xl border border-border/50 rounded-[40px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.2)] hover:border-blue-500/40 transition-all overflow-hidden h-full">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-inner">
                                        <Search className="w-10 h-10 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-3">Sacred Blogs</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Read deep insights, stories, and guides about yogic and spiritual life.
                                    </p>
                                </div>
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </section>
        </div>
    );
}
