"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BadgeCheck, Zap, Video, Headphones, MapPin, Gift, Sparkles, Landmark, Heart, ChevronRight } from "lucide-react";
import { createClient } from '@supabase/supabase-js';
import FireParticles from "@/components/FireParticles";
import EmberParticles from "@/components/EmberParticles";
import StarsGalaxyBackground from "@/components/ui/StarsGalaxyBackground";
import { supabase } from '@/lib/supabaseClient';
import { getUiConfig, UiConfig, getBlogCategoryStyle } from '@/lib/uiMapping';
import CollapsibleText from "@/components/ui/CollapsibleText";
import { FloatingSocialButtons } from "@/components/ui/FloatingSocialButtons";
import SpiritualFamilySection from "@/components/home/SpiritualFamilySection";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import PromotionalBanner from "@/components/home/PromotionalBanner";

interface Puja extends UiConfig {
    id: string;
    name: string;
    slug: string;
    image: string;
    desc: string;
    description?: string;
    benefits: string[];
    price: number;
    is_featured?: boolean;
    is_hero?: boolean;
    tags?: string[];
}

interface DatabasePooja {
    id: string;
    name: string;
    slug: string;
    images?: string[];
    description: string;
    benefits: string[];
    price: number;
    is_featured: boolean;
    is_hero: boolean;
    tags?: string[];
}

interface DatabaseLocation {
    id: string;
    name: string;
    type: string;
    state_id: string;
    description: string;
    images: string[];
    slug: string;
}

interface PoojaLocation {
    id?: string | number;
    name: string;
    title: string;
    location: string;
    desc: string;
    description?: string;
    image: string;
    slug: string;
    delay: string;
    badge?: string;
}

interface Blog {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    image_url: string;
    category?: string;
    readTime?: string;
    gradient?: string;
    tags?: string[];
    content?: string;
    icon?: string;
}


// Enhanced Ember Particle Component for Sacred Fire Effect
// Enhanced Ember Particle Component for Sacred Fire Effect - Moved to @/components/EmberParticles

// Helper to map puja names to relevant icons
const getPujaIcon = (name: string): string => {
    const n = name.toLowerCase();
    if (n.includes('ganesh')) return '/bhagwan/ganesha.png';
    if (n.includes('shiv') || n.includes('rudra') || n.includes('mrityunjaya')) return '/bhagwan/shiv.png';
    if (n.includes('satyanarayan')) return '/kalasha.png';
    if (n.includes('vishnu')) return '/bhagwan/vishnu.png';
    if (n.includes('lakshmi')) return '/bhagwan/lakshmi.png';
    if (n.includes('durga')) return '/bhagwan/durga.png';
    if (n.includes('rama')) return '/bhagwan/rama.png';
    if (n.includes('hanuman')) return '/bhagwan/hanuman.png';
    if (n.includes('shiva')) return '/bhagwan/shiva.png';
    if (n.includes('surya')) return '/sun.png';
    if (n.includes('vastu') || n.includes('pravesh')) return '/temple.png';
    if (n.includes('graha')) return '/astrology/stars.png';
    if (n.includes('kaal') || n.includes('sarp')) return '/zodiac/scorpion.png';
    if (n.includes('pitra')) return '/moon.png';
    if (n.includes('chandi') || n.includes('homam') || n.includes('jaap')) return '/havan.png';
    if (n.includes('navaratri')) return '/diya.png';
    return '/om.png';
};

// Helper to get descriptive name from icon path
const getIconName = (path: string): string => {
    const filename = path.split('/').pop() || '';
    return filename.replace('.png', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Vedic Symbol';
};

// Helper for Tag Colors - Vibrant Gradient Style (Badge Look)
const getTagStyle = (tag: string): string => {
    const t = tag.toLowerCase();

    // 1. WEALTH (Pink/Rose)
    if (t.includes('wealth') || t.includes('lakshmi') || t.includes('prosperity') || t.includes('finance'))
        return 'from-pink-500 to-rose-500 shadow-rose-500/20';

    // 2. SHIVA / MOKSHA (Indigo/Violet)
    if (t.includes('shiva') || t.includes('rudra') || t.includes('moksha') || t.includes('liberation'))
        return 'from-indigo-500 to-violet-600 shadow-indigo-500/20';

    // 3. GANESH / SUCCESS (Amber/Orange)
    if (t.includes('ganesh') || t.includes('success') || t.includes('career') || t.includes('obstacle'))
        return 'from-amber-400 to-orange-500 shadow-amber-500/20';

    // 4. HANUMAN / POWER (Deep Red / Crimson) - Distinct from Default
    if (t.includes('hanuman') || t.includes('courage') || t.includes('power') || t.includes('strength') || t.includes('victory'))
        return 'from-red-600 to-rose-700 shadow-red-500/20';

    // 5. SHANI / PROTECTION (Blue/Dark Blue)
    if (t.includes('shani') || t.includes('protection') || t.includes('dosha') || t.includes('negativity') || t.includes('planetary'))
        return 'from-blue-600 to-indigo-700 shadow-blue-500/20';

    // 6. LOVE / MARRIAGE (Pink/Rose)
    if (t.includes('love') || t.includes('marriage') || t.includes('relationship') || t.includes('harmony') && !t.includes('peace'))
        return 'from-rose-400 to-pink-500 shadow-rose-500/20';

    // 7. PEACE / FAMILY (Sky Blue / Cyan) - Distinct!
    if (t.includes('peace') || t.includes('family') || t.includes('calm') || t.includes('mind') || t.includes('harmony'))
        return 'from-sky-400 to-cyan-500 shadow-sky-500/20';

    // 8. HEALTH (Emerald/Teal)
    if (t.includes('health') || t.includes('healing') || t.includes('wellness') || t.includes('life'))
        return 'from-emerald-400 to-teal-600 shadow-emerald-500/20';

    // 9. SARASWATI / EDUCATION (Yellow/Gold)
    if (t.includes('saraswati') || t.includes('education') || t.includes('knowledge') || t.includes('wisdom'))
        return 'from-yellow-400 to-amber-500 shadow-yellow-500/20 text-black'; // Black text for contrast on yellow

    // 10. ANCESTRAL (Stone/Gray)
    if (t.includes('ancestral') || t.includes('pitra'))
        return 'from-stone-500 to-stone-700 shadow-stone-500/20';

    // Default (Saffron/Orange)
    return 'from-orange-500 to-amber-600 shadow-orange-500/20';
};

export default function HomeClient() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const isDarkTheme = mounted && theme === 'dark';

    const backgroundIcons = [
        "/zodiac/aquarius.png", "/zodiac/aries.png", "/zodiac/cancer.png", "/zodiac/capricorn.png",
        "/zodiac/gemini.png", "/zodiac/leo.png", "/zodiac/libra.png", "/zodiac/pisces.png",
        "/zodiac/sagittarius.png", "/zodiac/scorpion.png", "/zodiac/taurus.png", "/zodiac/virgo.png",
        "/bhagwan/brahma.png", "/bhagwan/durga.png", "/bhagwan/ganesha.png", "/bhagwan/hanuman.png",
        "/bhagwan/krishna.png", "/bhagwan/lakshmi.png", "/bhagwan/rama.png", "/bhagwan/shiv.png",
        "/bhagwan/shiva.png", "/bhagwan/surya.png", "/bhagwan/vishnu.png",
        "/astrology/astrology.png", "/astrology/chiromancy.png", "/astrology/constellation.png",
        "/astrology/crystal-ball.png", "/astrology/fortune-wheel.png", "/astrology/galaxy.png",
        "/astrology/horoscope.png", "/astrology/stars.png", "/astrology/tarot.png",
        "/diya.png", "/havan.png", "/kalasha.png", "/moon.png", "/sun.png", "/premium-loader.png", "/temple.png"
    ];
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [locations, setLocations] = useState<PoojaLocation[]>([]);
    const [popularPujas, setPopularPujas] = useState<Puja[]>([]);
    const [heroPujas, setHeroPujas] = useState<Puja[]>([]);
    const [loadingPujas, setLoadingPujas] = useState(true);
    const [pageData, setPageData] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

                // 1. Fetch Dynamic Page Override
                const { data: page } = await supabase
                    .from('pages')
                    .select('*')
                    .or('slug.eq./,slug.eq.home')
                    .maybeSingle();

                if (page) setPageData(page);

                // 2. Fetch Featured Blogs
                const { data: bData } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('published', true)
                    .eq('is_featured', true)
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (bData && bData.length > 0) {
                    setBlogs(bData);
                } else {
                    // Fallback to latest 3 blogs if none featured
                    const { data: fallbackBlogs } = await supabase
                        .from('blogs')
                        .select('*')
                        .eq('published', true)
                        .order('created_at', { ascending: false })
                        .limit(3);
                    setBlogs(fallbackBlogs || []);
                }

                // 2.5 Fetch Featured Destinations (Sacred Locations)
                const { data: lData } = await supabase
                    .from('destinations')
                    .select('*')
                    .eq('is_featured', true)
                    .limit(4);

                if (lData && lData.length > 0) {
                    const mappedLocations: PoojaLocation[] = (lData as unknown as DatabaseLocation[]).map((l, idx) => ({
                        id: l.id,
                        name: l.name,
                        title: l.type || "Sacred Site",
                        location: l.state_id || "India",
                        desc: l.description || "",
                        image: (l.images && l.images.length > 0) ? l.images[0] : "/logo.png",
                        slug: l.slug,
                        delay: (idx * 100).toString()
                    }));
                    setLocations(mappedLocations);
                }

                // 3. Fetch Popular Pujas
                try {
                    const { data: pData, error } = await supabase
                        .from('poojas')
                        .select('*')
                        .eq('is_active', true);

                    if (pData) {
                        const mappedPujas: Puja[] = (pData as unknown as DatabasePooja[]).map((item) => {
                            const uiConfig = getUiConfig(item.slug);
                            return {
                                ...uiConfig,
                                id: item.id,
                                name: item.name,
                                slug: item.slug,
                                image: (item.images && item.images.length > 0) ? item.images[0] : '/logo.png',
                                desc: item.description,
                                benefits: item.benefits || [],
                                price: item.price,
                                is_featured: item.is_featured,
                                is_hero: item.is_hero,
                                tags: item.tags || []
                            };
                        });

                        // 1. Filter for Hero Pujas
                        const hero = mappedPujas.filter(p => p.is_hero).slice(0, 3);
                        setHeroPujas(hero);

                        // 2. Filter for Popular/Featured ones - prioritize featured, then others up to 6
                        const featured = mappedPujas.filter(p => p.is_featured);
                        const nonFeaturedOthers = mappedPujas.filter(p => !p.is_featured && !p.is_hero);

                        // Combine and take first 6
                        const displayPujas = [...featured, ...nonFeaturedOthers].slice(0, 6);

                        setPopularPujas(displayPujas);
                    }
                } catch (e) {
                    console.error("Error loading pujas", e);
                } finally {
                    setLoadingPujas(false);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
                // Fallback on error
                setBlogs([
                    {
                        id: "1",
                        title: "The Science Behind Vedic Mantras",
                        excerpt: "Discover how ancient sound vibrations impact your mental and spiritual well-being.",
                        slug: "science-behind-vedic-mantras",
                        image_url: "https://images.unsplash.com/photo-1605218453416-59e3c9c94494?q=80&w=600&auto=format&fit=crop"
                    },
                    {
                        id: "2",
                        title: "Why Rudrabhishek is Powerful?",
                        excerpt: "Understanding the significance of Lord Shiva's most potent ritual for peace and prosperity.",
                        slug: "power-of-rudrabhishek",
                        image_url: "https://images.unsplash.com/photo-1542353436-312f0e1f67ff?q=80&w=600&auto=format&fit=crop"
                    },
                    {
                        id: "3",
                        title: "Navratri 2024: Complete Guide",
                        excerpt: "Everything you need to know about the 9 days of Goddess Durga worship.",
                        slug: "navratri-guide-2024",
                        image_url: "https://images.unsplash.com/photo-1634914040989-13824ee1c9f4?q=80&w=600&auto=format&fit=crop"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const gradients = [
        "from-orange-500 to-red-600",
        "from-amber-500 to-orange-600",
        "from-yellow-500 to-amber-600"
    ];

    const icons = ["✨", "🕉️", "🪔"];

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative transition-colors duration-300">
            {/* Promotional Banner */}
            <PromotionalBanner />

            {/* Global Dark Mode Background Animation */}
            <StarsGalaxyBackground />

            {/* Hero Section */}
            <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
                {/* Hero Background Image - Visible in Both Modes */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://cdn.shopaccino.com/divine-rudraksha/products/navdurga-chaitra-navratri-puja-261228243841428_m.jpg?v=523"
                        alt="Temple Background with Navdurga"
                        className="w-full h-full object-cover opacity-80 animate-zoom-in"
                    />
                    {/* Dark Mode Overlay - Applied to Both Modes */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cosmic-navy/90 via-cosmic-navy/60 to-cosmic-navy/90"></div>
                </div>

                {/* Animated Background - Nebula (Visible in Both Modes) */}
                <div className="absolute inset-0 bg-nebula animate-nebula-move bg-[length:200%_200%] z-0 opacity-50 mix-blend-overlay"></div>

                <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-[length:200%_auto] animate-gradient mb-6 drop-shadow-2xl tracking-tighter leading-[1.1] pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        Divine Blessings for a <br /> Prosperous Life
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-starlight/95 mb-10 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up [animation-delay:200ms]" style={{ fontFamily: 'ui-sans-serif, sans-serif' }}>
                        Experience authentic Vedic rituals performed by verified Pandits at your home or sacred temples. Connect with the divine energy of the cosmos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up [animation-delay:400ms]">
                        {/* 3D Primary Button with Fire Particles */}
                        <Link
                            href="/pooja-services"
                            className="group relative inline-flex items-center justify-center h-16 px-12 font-bold text-lg text-white rounded-full shadow-[0_6px_0_0_#9a3412] hover:shadow-[0_3px_0_0_#9a3412] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all duration-150 overflow-visible"
                        >
                            {/* Animated Running Border Segments */}
                            <svg className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none" style={{ filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.6))', zIndex: 20 }}>
                                <rect
                                    x="1"
                                    y="1"
                                    width="calc(100% - 2px)"
                                    height="calc(100% - 2px)"
                                    rx="32"
                                    fill="none"
                                    stroke="#fbbf24"
                                    strokeWidth="3"
                                    strokeDasharray="20 80"
                                    className="animate-snake-border"
                                    strokeLinecap="round"
                                />
                                <rect
                                    x="1"
                                    y="1"
                                    width="calc(100% - 2px)"
                                    height="calc(100% - 2px)"
                                    rx="32"
                                    fill="none"
                                    stroke="#f97316"
                                    strokeWidth="3"
                                    strokeDasharray="20 10"
                                    className="animate-snake-border"
                                    style={{ strokeDashoffset: 500, animationDelay: '-4s' }}
                                    strokeLinecap="round"
                                />
                            </svg>

                            {/* Inner Clipped Container for Background & Effects */}
                            <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-red-500">
                                {/* Fire Particles Effect */}
                                <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                    <FireParticles />
                                </div>

                                {/* Shine Effect - Now Clipped */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
                            </div>

                            <span className="relative z-10 flex items-center gap-3 text-sm uppercase tracking-[0.2em]">
                                Book Puja Now
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </span>
                        </Link>

                        {/* Call Us Button - White Theme with Call Animation */}
                        <Link
                            href="tel:+919876543210"
                            className="group relative inline-flex items-center justify-center gap-3 h-16 px-12 font-bold text-lg text-green-600 bg-white border-2 border-white rounded-full shadow-[0_6px_0_0_#d1d5db] hover:shadow-[0_3px_0_0_#d1d5db] hover:translate-y-[3px] active:translate-y-[6px] active:shadow-none transition-all duration-150 overflow-visible animate-shake-call animate-pulse-ring"
                        >
                            {/* Animated Running Border Segments */}
                            <svg className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none" style={{ filter: 'drop-shadow(0 0 4px rgba(34,197,94,0.6))' }}>
                                <rect
                                    x="1"
                                    y="1"
                                    width="calc(100% - 2px)"
                                    height="calc(100% - 2px)"
                                    rx="32"
                                    fill="none"
                                    stroke="#22c55e"
                                    strokeWidth="3"
                                    strokeDasharray="50 450"
                                    className="animate-snake-border"
                                    style={{ strokeDashoffset: 1000 }}
                                    strokeLinecap="round"
                                />
                                <rect
                                    x="1"
                                    y="1"
                                    width="calc(100% - 2px)"
                                    height="calc(100% - 2px)"
                                    rx="32"
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="3"
                                    strokeDasharray="50 450"
                                    className="animate-snake-border"
                                    style={{ strokeDashoffset: 500, animationDelay: '-2s' }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            {/* Modern Phone Icon */}
                            <svg className="w-6 h-6 relative z-10 animate-shake-call" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            <span className="relative z-10 text-gray-800">Call Us</span>
                            <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
                        </Link>
                    </div>

                </div>
            </section>

            {/* Featured Poojas Section */}
            <section className="py-24 relative bg-background z-10 overflow-hidden">
                {/* Animated Star & Galaxy Background */}
                {/* Detailed Vedic Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                    {/* Layer 1: Base Static Canvas */}
                    <div className="absolute top-10 left-10 w-64 h-64 dark:bg-saffron-900/10 rounded-full blur-3xl opacity-60"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 dark:bg-gold-900/10 rounded-full blur-3xl opacity-60"></div>

                    {/* Layer 2: Planetary Systems - Hidden on Mobile */}
                    <div className="hidden md:block">
                        {/* System 1 (Top-Left) */}
                        <div className="absolute top-[10%] left-[5%] scale-[0.8] animate-drift-1" style={{ animationDuration: '60s' }}>
                            <div className="relative flex items-center justify-center">
                                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-pulse shadow-[0_0_40px_rgba(251,146,60,0.6)]"></div>
                                {[
                                    { r: 40, d: '8s', s: 'w-2 h-2', c: 'bg-stone-400' },
                                    { r: 60, d: '12s', s: 'w-3 h-3', c: 'bg-orange-400' },
                                    { r: 80, d: '15s', s: 'w-3 h-3', c: 'bg-blue-400' },
                                    { r: 100, d: '20s', s: 'w-2.5 h-2.5', c: 'bg-red-400' },
                                    { r: 140, d: '30s', s: 'w-8 h-8', c: 'bg-orange-200' },
                                ].map((orbit, i) => (
                                    <div key={i} className="absolute rounded-full border border-dashed border-gray-400/60 dark:border-gray-600 animate-spin-slow"
                                        style={{ width: orbit.r * 2, height: orbit.r * 2, animationDuration: orbit.d }}>
                                        <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${orbit.s} ${orbit.c} shadow-sm`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* System 2 (Bottom-Right) */}
                        <div className="absolute top-[85%] left-[90%] scale-[0.8] animate-drift-2" style={{ animationDuration: '70s' }}>
                            <div className="relative flex items-center justify-center">
                                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-pulse shadow-[0_0_40px_rgba(251,146,60,0.6)]"></div>
                                {[
                                    { r: 40, d: '8s', s: 'w-2 h-2', c: 'bg-stone-400' },
                                    { r: 60, d: '12s', s: 'w-3 h-3', c: 'bg-orange-400' },
                                    { r: 80, d: '15s', s: 'w-3 h-3', c: 'bg-blue-400' },
                                    { r: 100, d: '20s', s: 'w-2.5 h-2.5', c: 'bg-red-400' },
                                    { r: 140, d: '30s', s: 'w-8 h-8', c: 'bg-orange-200' },
                                ].map((orbit, i) => (
                                    <div key={i} className="absolute rounded-full border border-dashed border-gray-400/60 dark:border-gray-600 animate-spin-slow"
                                        style={{ width: orbit.r * 2, height: orbit.r * 2, animationDuration: orbit.d }}>
                                        <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${orbit.s} ${orbit.c} shadow-sm`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* System 3 (Bottom-Left) */}
                        <div className="absolute top-[75%] left-[10%] scale-[0.6] animate-drift-3" style={{ animationDuration: '65s' }}>
                            <div className="relative flex items-center justify-center">
                                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-pulse shadow-[0_0_40px_rgba(251,146,60,0.6)]"></div>
                                {[
                                    { r: 40, d: '8s', s: 'w-2 h-2', c: 'bg-stone-400' },
                                    { r: 60, d: '12s', s: 'w-3 h-3', c: 'bg-orange-400' },
                                    { r: 80, d: '15s', s: 'w-3 h-3', c: 'bg-blue-400' },
                                    { r: 100, d: '20s', s: 'w-2.5 h-2.5', c: 'bg-red-400' },
                                    { r: 140, d: '30s', s: 'w-8 h-8', c: 'bg-orange-200' },
                                ].map((orbit, i) => (
                                    <div key={i} className="absolute rounded-full border border-dashed border-gray-400/60 dark:border-gray-600 animate-spin-slow"
                                        style={{ width: orbit.r * 2, height: orbit.r * 2, animationDuration: orbit.d }}>
                                        <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${orbit.s} ${orbit.c} shadow-sm`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Layer 3: Vedic Icon Scatter (Strict Grid Layout for Spacing) */}
                    <div className="hidden md:block">
                        {[...Array(16)].map((_, i) => { // Reduced count for spacing
                            const iconPath = backgroundIcons[(i + 15) % backgroundIcons.length];

                            // Define strict slots (Grid: 2 columns per side x 10 rows)
                            // Left Gutter: 2-8%, 10-15% | Right Gutter: 85-90%, 92-98%
                            // Rows: 5, 15, 25... 95%
                            const possibleSlots = [
                                // Left Side
                                { x: 4, y: 25 }, { x: 12, y: 20 },
                                { x: 5, y: 35 }, { x: 13, y: 40 },
                                { x: 4, y: 55 }, { x: 12, y: 60 },
                                { x: 8, y: 90 }, // Near bottom left but avoiding planet

                                // Right Side
                                { x: 95, y: 15 }, { x: 88, y: 25 },
                                { x: 96, y: 35 }, { x: 89, y: 45 },
                                { x: 95, y: 55 }, { x: 88, y: 65 },
                                { x: 94, y: 75 }, { x: 87, y: 10 },
                            ];

                            // Specific exclusions for Solar Systems
                            // System 1: Top-Left (10%, 5%) -> Avoid top left
                            // System 3: Bottom-Left (75%, 10%) -> Avoid bottom left
                            // System 2: Bottom-Right (85%, 90%) -> Avoid bottom right

                            // Select slot based on index (deterministic but scattered)
                            const slot = possibleSlots[i % possibleSlots.length];

                            // Add slight jitter for organic feel within the strict slot
                            const jitterX = (i % 3) - 1.5;
                            const jitterY = (i % 2) - 1;

                            const finalLeft = slot.x + jitterX;
                            const finalTop = slot.y + jitterY;

                            const size = 30 + ((i * 7) % 20); // 30-50px
                            const animIndex = (i % 8) + 1;
                            const wanderClass = `animate-wander-${animIndex}`;
                            const wanderDuration = 120 + ((i * 13) % 40); // Slower drift
                            const wanderDelay = (i * 7) % 20;
                            const spinDuration = 40 + ((i * 11) % 30);
                            const spinDirection = (i % 2 === 0) ? 'normal' : 'reverse';

                            return (
                                <div
                                    key={`v-icon-1-${i}`}
                                    className={`absolute ${wanderClass}`}
                                    style={{
                                        top: `${finalTop}%`,
                                        left: `${finalLeft}%`,
                                        animationDuration: `${wanderDuration}s`, // Very slow drift to maintain spacing
                                        animationDelay: `${wanderDelay}s`,
                                        transform: 'scale(1)',
                                    }}
                                >
                                    <img
                                        src={iconPath}
                                        alt={getIconName(iconPath)}
                                        className="opacity-20 dark:opacity-30 select-none animate-spin-slow transition-all duration-700 hover:scale-125"
                                        style={{
                                            width: `${size}px`,
                                            height: `${size}px`,
                                            animationDuration: `${spinDuration}s`,
                                            animationDirection: spinDirection,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-saffron via-gold to-saffron bg-[length:200%_auto] animate-gradient mb-6 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
                            Popular Vedic Pujas
                        </h2>
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-saffron/40"></div>
                            <span className="text-saffron-dark font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Divine Rituals</span>
                            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-saffron/40"></div>
                        </div>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                            Experience the power of authentic Vedic traditions performed by
                            <span className="text-saffron-dark font-medium"> verified acharyas</span> for your peace and prosperity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
                        {loadingPujas ? (
                            <div className="col-span-full text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-saffron border-t-transparent"></div>
                                <p className="mt-4 text-muted-foreground">Loading pujas...</p>
                            </div>
                        ) : popularPujas.map((puja, idx) => (
                            <div key={puja.id || idx} className="group relative">
                                <div className="relative h-full bg-white/90 dark:bg-card/40 dark:backdrop-blur-xl text-slate-900 dark:text-white/90 rounded-[32px] p-6 md:p-7 flex flex-col transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-black/5 dark:border-white/10 group-hover:-translate-y-2 overflow-hidden">

                                    {/* Animated Snake Border SVG - Restored */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ zIndex: 10 }}>
                                        <rect
                                            x="2"
                                            y="2"
                                            width="calc(100% - 4px)"
                                            height="calc(100% - 4px)"
                                            rx="32"
                                            ry="32"
                                            fill="none"
                                            stroke="url(#saffronGradient)"
                                            strokeWidth="3"
                                            strokeDasharray="20 10"
                                            className="animate-snake-border"
                                        />
                                        <defs>
                                            <linearGradient id="saffronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                                                <stop offset="50%" stopColor="#fb923c" stopOpacity="1" />
                                                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Top Badge - Floating - Replaced by Tags */}
                                    <div className="absolute top-5 right-5 z-20 flex flex-col items-end gap-2">
                                        {/* Original Badge if exists */}
                                        {puja.badge && (
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-orange-500/20 blur-md rounded-full"></div>
                                                <span className={`relative px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] text-white bg-gradient-to-r ${puja.gradient || 'from-orange-500 to-red-600'} shadow-lg shadow-orange-500/20`}>
                                                    {puja.badge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Dynamic Tags */}
                                        {(puja.tags && puja.tags.length > 0 ? puja.tags : ['Vedic Ritual']).slice(0, 1).map((tag, i) => (
                                            <div key={i} className="relative">
                                                <div className={`absolute inset-0 blur-md rounded-full opacity-50 bg-gradient-to-r ${getTagStyle(tag).split(' ')[0]} ${getTagStyle(tag).split(' ')[1]}`}></div>
                                                <span className={`relative px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] text-white bg-gradient-to-r shadow-lg ${getTagStyle(tag)}`}>
                                                    {tag}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Image Container - Rectangular Thumbnail */}
                                    <Link href={`/pooja-services/${puja.slug}`} className="block">
                                        <div className="relative w-full h-48 mb-6 mt-2 rounded-2xl overflow-hidden shadow-lg border border-black/5 dark:border-white/10 group-hover:shadow-2xl transition-all duration-500 cursor-pointer">
                                            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                                            <img
                                                src={puja.image}
                                                alt={puja.name}
                                                className="relative z-10 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>
                                    </Link>

                                    {/* Text Content - Serif Title */}
                                    <Link href={`/pooja-services/${puja.slug}`} className="block">
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight hover:text-orange-500 transition-colors duration-300 cursor-pointer" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                                            {puja.name}
                                        </h3>
                                    </Link>

                                    {/* Description - Muted Blue/Gray */}
                                    <div className="relative flex-grow mb-10">
                                        <p className="text-slate-600 dark:text-white/70 font-medium leading-relaxed text-base transition-colors duration-300">
                                            Invoke the divine energies for peace, prosperity, and spiritual growth. Ideal for all sacred beginnings.
                                        </p>
                                    </div>

                                    {/* 3D Action Button */}
                                    <Link
                                        href={`/pooja-services/${puja.slug}`}
                                        className="group/btn relative inline-flex items-center justify-center h-16 px-10 font-black text-white rounded-2xl transition-all duration-150 overflow-visible"
                                    >
                                        {/* 3D Shadow/Bottom Part */}
                                        <div className="absolute inset-0 top-1.5 bg-[#8B2000] rounded-2xl"></div>

                                        {/* Main Button Surface */}
                                        <div className="absolute inset-x-0 top-0 bottom-1.5 bg-gradient-to-r from-[#FF6B00] to-[#E60000] rounded-2xl shadow-xl transition-transform duration-100 group-hover/btn:translate-y-[1px] group-active/btn:translate-y-[3px]">
                                            {/* Glow Overlay */}
                                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity rounded-2xl"></div>
                                        </div>

                                        <span className="relative z-10 flex items-center gap-3 text-lg uppercase tracking-[0.1em] transition-transform duration-100 group-hover/btn:translate-y-[1px] group-active/btn:translate-y-[3px]">
                                            BOOK NOW
                                            <svg className="w-5 h-5 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-20">
                        <Link
                            href="/pooja-services"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-14 md:py-10 rounded-full border-2 border-saffron/20 text-saffron hover:text-white transition-all duration-300 font-black overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-lg">
                                EXPLORE ALL POOJA SERVICES
                            </span>
                            {/* Wave Animation */}
                            {/* Proper Liquid Wave Animation */}
                            <div className="absolute inset-0 overflow-hidden rounded-full transform translate-z-0">
                                <div className="absolute bottom-0 left-0 right-0 bg-saffron transition-all duration-500 ease-in-out h-[15%] group-hover:h-full"></div>
                                <div className="absolute bottom-[15%] left-0 w-[200%] h-4 bg-repeat-x animate-wave group-hover:bottom-[100%] transition-all duration-500 ease-in-out"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\' fill=\'%23f97316\' transform=\'scale(1, -1) translate(0, -120)\'/%3E%3C/svg%3E")', backgroundSize: '50% 100%' }}>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section >

            {/* Why Choose Us Section - Redesigned with Bento Grid & Sacred Glass */}
            <section className="py-24 relative bg-background overflow-hidden z-10">
                {/* Copied Background from Popular Vedic Pujas */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                    {/* Layer 1: Base Static Canvas */}
                    <div className="absolute top-10 left-10 w-64 h-64 bg-saffron-50 dark:bg-saffron-900/10 rounded-full blur-3xl opacity-60"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-50 dark:bg-gold-900/10 rounded-full blur-3xl opacity-60"></div>

                    {/* Layer 2: Planetary Systems - Hidden on Mobile */}
                    <div className="hidden md:block">
                        {/* System 1 (Top-Left) */}
                        <div className="absolute top-[10%] left-[5%] scale-[0.8] animate-drift-1" style={{ animationDuration: '60s' }}>
                            <div className="relative flex items-center justify-center">
                                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-pulse shadow-[0_0_40px_rgba(251,146,60,0.6)]"></div>
                                {[
                                    { r: 40, d: '8s', s: 'w-2 h-2', c: 'bg-stone-400' },
                                    { r: 60, d: '12s', s: 'w-3 h-3', c: 'bg-orange-400' },
                                    { r: 80, d: '15s', s: 'w-3 h-3', c: 'bg-blue-400' },
                                    { r: 100, d: '20s', s: 'w-2.5 h-2.5', c: 'bg-red-400' },
                                    { r: 140, d: '30s', s: 'w-8 h-8', c: 'bg-orange-200' },
                                ].map((orbit, i) => (
                                    <div key={i} className="absolute rounded-full border border-dashed border-gray-400/60 dark:border-gray-600 animate-spin-slow"
                                        style={{ width: orbit.r * 2, height: orbit.r * 2, animationDuration: orbit.d }}>
                                        <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${orbit.s} ${orbit.c} shadow-sm`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* System 2 (Bottom-Right) */}
                        <div className="absolute top-[85%] left-[90%] scale-[0.8] animate-drift-2" style={{ animationDuration: '70s' }}>
                            <div className="relative flex items-center justify-center">
                                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-pulse shadow-[0_0_40px_rgba(251,146,60,0.6)]"></div>
                                {[
                                    { r: 40, d: '8s', s: 'w-2 h-2', c: 'bg-stone-400' },
                                    { r: 60, d: '12s', s: 'w-3 h-3', c: 'bg-orange-400' },
                                    { r: 80, d: '15s', s: 'w-3 h-3', c: 'bg-blue-400' },
                                    { r: 100, d: '20s', s: 'w-2.5 h-2.5', c: 'bg-red-400' },
                                    { r: 140, d: '30s', s: 'w-8 h-8', c: 'bg-orange-200' },
                                ].map((orbit, i) => (
                                    <div key={i} className="absolute rounded-full border border-dashed border-gray-400/60 dark:border-gray-600 animate-spin-slow"
                                        style={{ width: orbit.r * 2, height: orbit.r * 2, animationDuration: orbit.d }}>
                                        <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${orbit.s} ${orbit.c} shadow-sm`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* System 3 (Bottom-Left) */}
                        <div className="absolute top-[75%] left-[10%] scale-[0.6] animate-drift-3" style={{ animationDuration: '65s' }}>
                            <div className="relative flex items-center justify-center">
                                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-pulse shadow-[0_0_40px_rgba(251,146,60,0.6)]"></div>
                                {[
                                    { r: 40, d: '8s', s: 'w-2 h-2', c: 'bg-stone-400' },
                                    { r: 60, d: '12s', s: 'w-3 h-3', c: 'bg-orange-400' },
                                    { r: 80, d: '15s', s: 'w-3 h-3', c: 'bg-blue-400' },
                                    { r: 100, d: '20s', s: 'w-2.5 h-2.5', c: 'bg-red-400' },
                                    { r: 140, d: '30s', s: 'w-8 h-8', c: 'bg-orange-200' },
                                ].map((orbit, i) => (
                                    <div key={i} className="absolute rounded-full border border-dashed border-gray-400/60 dark:border-gray-600 animate-spin-slow"
                                        style={{ width: orbit.r * 2, height: orbit.r * 2, animationDuration: orbit.d }}>
                                        <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${orbit.s} ${orbit.c} shadow-sm`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Layer 3: Vedic Icon Scatter (Strict Grid Layout for Spacing) */}
                    <div className="hidden md:block">
                        {[...Array(16)].map((_, i) => { // Reduced count for spacing
                            const iconPath = backgroundIcons[(i + 15) % backgroundIcons.length];

                            // Fixed Slots for Section 2 (Avoiding Overlap with its own Solar Systems)
                            // Solar System Positions: Top-Left (10,5), Bottom-Right (85,90), Bottom-Left (75,10)

                            // Safe Slots
                            const possibleSlots = [
                                // Left Side
                                { x: 12, y: 15 }, // Near top but right of planet
                                { x: 5, y: 30 },
                                { x: 13, y: 45 },
                                { x: 5, y: 55 },
                                { x: 12, y: 95 }, // Very bottom left

                                // Right Side
                                { x: 95, y: 10 },
                                { x: 88, y: 25 },
                                { x: 96, y: 40 },
                                { x: 89, y: 55 },
                                { x: 95, y: 70 },
                                { x: 88, y: 15 },
                                { x: 94, y: 5 }
                            ];

                            const slot = possibleSlots[i % possibleSlots.length];

                            const jitterX = (i % 3) - 1.5;
                            const jitterY = (i % 2) - 1;

                            const finalLeft = slot.x + jitterX;
                            const finalTop = slot.y + jitterY;

                            const size = 30 + ((i * 7) % 20);
                            const animIndex = (i % 8) + 1;
                            const wanderClass = `animate-wander-${animIndex}`;
                            const wanderDuration = 120 + ((i * 13) % 40);
                            const wanderDelay = (i * 7) % 20;
                            const spinDuration = 40 + ((i * 11) % 30);
                            const spinDirection = (i % 2 === 0) ? 'normal' : 'reverse';

                            return (
                                <div
                                    key={`v-icon-2-${i}`}
                                    className={`absolute ${wanderClass}`}
                                    style={{
                                        top: `${finalTop}%`,
                                        left: `${finalLeft}%`,
                                        animationDuration: `${wanderDuration}s`,
                                        animationDelay: `${wanderDelay}s`,
                                        transform: 'scale(1)',
                                    }}
                                >
                                    <img
                                        src={iconPath}
                                        alt={getIconName(iconPath)}
                                        className="opacity-20 dark:opacity-30 select-none animate-spin-slow transition-all duration-700 hover:scale-125"
                                        style={{
                                            width: `${size}px`,
                                            height: `${size}px`,
                                            animationDuration: `${spinDuration}s`,
                                            animationDirection: spinDirection,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-widest mb-6 border border-saffron/20 backdrop-blur-sm shadow-lg shadow-saffron/10">
                            The Vedic Difference
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-saffron via-gold to-saffron bg-[length:200%_auto] animate-gradient mb-6 leading-tight pb-2 drop-shadow-sm" style={{ fontFamily: 'Georgia, serif' }}>
                            Why Choose Mantra Puja?
                        </h2>
                        <p className="text-xl text-muted-foreground font-light leading-relaxed">
                            We preserve the sanctity of ancient traditions while embracing modern accessibility, offering you a spiritual experience that is both authentic and hassle-free.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                Icon: Sparkles,
                                title: "Vedic Authenticity",
                                desc: "Every ritual is performed in strict accordance with Vedic scriptures by certified Pandits.",
                                colorClass: "text-[#FFB800]"
                            },
                            {
                                Icon: Landmark,
                                title: "Sacred Locations",
                                desc: "Pujas conducted in powerful vortexes (Kshetras) like Kashi, Ujjain, and Haridwar.",
                                colorClass: "text-[#A5B4FC]"
                            },
                            {
                                Icon: Video,
                                title: "Live & Transparent",
                                desc: "Witness your Sankalp and Puja via live streaming or receive high-quality video recordings.",
                                colorClass: "text-[#FF4D94]"
                            },
                            {
                                Icon: Heart,
                                title: "Personalized Support",
                                desc: "Dedicated spiritual guides to answer your queries and assist you at every step.",
                                colorClass: "text-[#FF6B6B]"
                            },
                            {
                                Icon: Zap,
                                title: "Instant Booking",
                                desc: "Seamless digital platform to book complex rituals in just a few clicks.",
                                colorClass: "text-[#FF8A00]"
                            },
                            {
                                isOm: true,
                                title: "Karma Free Pricing",
                                desc: "Transparent Dakshina with no hidden costs. Satisfaction of supporting Vedic culture.",
                                colorClass: "text-[#A855F7]"
                            }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-white/80 dark:bg-card/40 dark:backdrop-blur-md rounded-[32px] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(249,115,22,0.2)] overflow-hidden border border-slate-200/50 dark:border-white/10"
                            >
                                {/* Previous Hover Effects Restored */}
                                <div className="absolute inset-0 bg-gradient-to-br from-saffron/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-saffron/20 to-gold/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-10 -translate-y-10"></div>

                                <div className="relative p-0 h-full flex flex-col items-center text-center z-10 w-full">
                                    <div className="relative w-24 h-24 mb-6">
                                        {/* Icon Container Glow Restored */}
                                        <div className="absolute inset-0 bg-saffron/10 rounded-2xl blur-xl group-hover:blur-2xl group-hover:bg-saffron/30 transition-all duration-500 scale-75 group-hover:scale-100"></div>

                                        <div className="relative w-full h-full bg-[#1A1F2B] rounded-3xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-500">
                                            {feature.isOm ? (
                                                <div className={`text-4xl font-bold ${feature.colorClass}`}>ॐ</div>
                                            ) : feature.Icon && (
                                                <feature.Icon className={`w-12 h-12 ${feature.colorClass}`} strokeWidth={2} />
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-saffron transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-white/70 font-medium leading-relaxed text-base max-w-[280px] transition-colors duration-300">
                                        {feature.desc}
                                    </p>
                                </div>

                                {/* Animated Bottom Bar Restored */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-saffron to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                            </div>
                        ))}
                    </div>

                    {/* Final CTA Button */}
                    <div className="mt-20 text-center">
                        <Link
                            href="/pooja-services"
                            className="group relative inline-flex items-center justify-center gap-4 px-6 py-3 md:px-12 md:py-10 rounded-full border-2 border-saffron/20 text-saffron hover:text-white transition-all duration-300 font-black overflow-hidden shadow-[0_0_40px_-10px_rgba(249,115,22,0.6)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.8)] hover:-translate-y-1"
                        >
                            <span className="relative z-10 text-xl font-bold uppercase tracking-widest drop-shadow-md flex items-center gap-2">
                                Begin Your Sacred Journey
                            </span>
                            {/* Wave Animation */}
                            <div className="absolute inset-0 overflow-hidden rounded-full transform translate-z-0">
                                <div className="absolute bottom-0 left-0 right-0 bg-saffron transition-all duration-500 ease-in-out h-[15%] group-hover:h-full"></div>
                                <div className="absolute bottom-[15%] left-0 w-[200%] h-4 bg-repeat-x animate-wave group-hover:bottom-[100%] transition-all duration-500 ease-in-out"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\' fill=\'%23f97316\' transform=\'scale(1, -1) translate(0, -120)\'/%3E%3C/svg%3E")', backgroundSize: '50% 100%' }}>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>


            {/* CTA Section - Divine Om Redesign (Dual Theme - Explicitly Managed) */}
            <section className={`py-32 relative overflow-hidden z-10 transition-colors duration-500 ${isDarkTheme ? 'bg-slate-950 border-t border-white/5' : 'bg-white'}`}>
                {/* Large Central Om Icon with Aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-40">
                    {/* Aura layers */}
                    <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse transition-all duration-700 ${isDarkTheme ? 'bg-gradient-to-r from-saffron/30 to-orange-600/30' : 'bg-gradient-to-r from-orange-200/20 to-saffron/10'}`}></div>
                    <div className={`absolute inset-0 scale-75 rounded-full blur-2xl animate-pulse transition-all duration-700 ${isDarkTheme ? 'bg-gradient-to-r from-saffron/20 to-orange-500/20' : 'bg-gradient-to-r from-orange-100/15 to-saffron/10'}`} style={{ animationDelay: '0.5s' }}></div>
                    <div className={`absolute inset-0 scale-50 rounded-full blur-xl animate-pulse transition-all duration-700 ${isDarkTheme ? 'bg-gradient-to-r from-saffron/10 to-orange-400/10' : 'bg-gradient-to-r from-white/20 to-orange-100/20'}`} style={{ animationDelay: '1s' }}></div>

                    {/* Central Om Icon */}
                    <img
                        src="/om.png"
                        alt="Om Symbol"
                        className={`absolute inset-0 w-full h-full object-contain filter drop-shadow-2xl transition-all duration-700 ${isDarkTheme ? 'opacity-100 brightness-125' : 'opacity-60'}`}
                    />
                </div>

                {/* Dark Mode Cosmic Sparks (Ember Effect) */}
                {isDarkTheme && (
                    <div className="absolute inset-0">
                        <EmberParticles count={25} color="bg-saffron/30" />
                    </div>
                )}

                {/* Final Scratch Implementation: Local Animation Styles to ensure visibility */}
                <style>{`
                    @keyframes om-float-up-refined {
                        0% { transform: translateY(0); opacity: 0; }
                        25% { opacity: 0.8; }
                        75% { opacity: 0.8; }
                        100% { transform: translateY(-1100px); opacity: 0; }
                    }
                `}</style>

                {/* Scattered Om1 Icons with Area-Specific Animation (Surrounds text closely) */}
                {[...Array(60)].map((_, i) => {
                    // Force spawn on Left (2-33%) or Right (67-98%) margins to keep text area clear
                    const isLeft = i % 2 === 0;
                    const left = isLeft ? ((i * 13) % 31) + 2 : ((i * 13) % 31) + 67;

                    const size = 15 + ((i * 4) % 35); // Delicate: 15px to 50px
                    const delay = (i * 0.3) % 18;
                    const duration = 12 + ((i * 2) % 15);

                    return (
                        <div
                            key={`om-final-polish-${i}`}
                            className="absolute pointer-events-none"
                            style={{
                                top: '100%',
                                left: `${left}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                opacity: 0, // Ensure invisible during animationDelay
                                animationName: 'om-float-up-refined',
                                animationDuration: `${duration}s`,
                                animationTimingFunction: 'linear',
                                animationIterationCount: 'infinite',
                                animationDelay: `${delay}s`,
                                animationFillMode: 'both',
                                zIndex: 1
                            }}
                        >
                            <img
                                src="/om1.png"
                                alt="Om Symbol Pattern"
                                className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                            />
                        </div>
                    );
                })}

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="mb-10 inline-block relative">
                        <span className={`inline-block px-6 py-2 rounded-full border-2 transition-all duration-500 text-xs font-bold uppercase tracking-widest shadow-lg ${isDarkTheme ? 'bg-slate-900 border-white/10 text-saffron-light' : 'bg-white border-saffron/20 text-saffron'}`}>
                            Begin Your Sacred Journey
                        </span>
                    </div>

                    <h2 className={`text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight relative drop-shadow-sm transition-colors duration-500 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: 'Georgia, serif' }}>
                        Ready to Invite <br />
                        <span className="relative inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-saffron via-orange-500 to-gold">
                            Divine Positivity?
                        </span>
                    </h2>

                    <p className={`text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-light leading-relaxed transition-colors duration-500 ${isDarkTheme ? 'text-slate-300' : 'text-slate-700'}`}>
                        Book your custom Vedic ritual today and embark on a spiritually fulfilling journey guided by expert Pandits.
                    </p>

                    <div className="relative inline-block group">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-600 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                        <Link
                            href="/pooja-services"
                            className={`relative inline-flex items-center justify-center h-14 px-8 text-lg md:h-20 md:px-16 md:text-2xl font-black text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-2xl hover:shadow-[0_20px_50px_rgba(249,115,22,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden border-4 ${isDarkTheme ? 'border-slate-800' : 'border-white'}`}
                        >
                            <span className="relative z-10 flex items-center gap-4 tracking-widest font-serif">
                                START YOUR JOURNEY
                                <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </span>

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-20"></div>
                        </Link>
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-8 opacity-70">
                        <span className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors duration-500 ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
                            <span className="text-xl">🔒</span> Secure Payment
                        </span>
                        <span className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors duration-500 ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
                            <span className="text-xl">✅</span> Verified Pandits
                        </span>
                        <span className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors duration-500 ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
                            <span className="text-xl">🌟</span> 4.9/5 Rating
                        </span>
                    </div>
                </div>
            </section>

            {/* Sacred Locations Section - Window to the Divine */}
            <section className={`py-24 relative overflow-hidden z-10 border-t transition-colors duration-500 ${isDarkTheme ? 'bg-slate-950/40 border-white/5 backdrop-blur-[2px]' : 'bg-[#fffcf9] border-orange-100/50'}`}>
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-widest mb-6 border border-saffron/20 backdrop-blur-sm">
                            Sacred Kshetras
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                            Pujas Performed at <span className="text-saffron">Sacred Locations</span>
                        </h2>
                        <p className="text-xl text-muted-foreground font-light leading-relaxed">
                            Experience the magnified spiritual potency of rituals performed at the holiest pilgrimage sites in India.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
                        {locations.map((loc, idx) => (
                            <Link
                                key={idx}
                                href={`/locations/${loc.slug || '#'}`}
                                className="group relative h-[450px] rounded-[32px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-black/5 dark:border-white/10 block"
                                style={{ animationDelay: `${(idx * 100)}ms` }}
                            >
                                {/* Background Image with Zoom Effect */}
                                <div className="absolute inset-0 bg-slate-900">
                                    <img
                                        src={loc.image || ""}
                                        alt={loc.name}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-110 transition-transform duration-[1.5s]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end relative z-10">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex justify-between items-end mb-2">
                                            <h3 className="text-3xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
                                                {loc.name}
                                            </h3>
                                        </div>
                                        <p className="text-saffron font-bold text-sm tracking-widest uppercase mb-4 opacity-100 flex items-center gap-2 drop-shadow-md">
                                            <span className="w-8 h-0.5 bg-saffron inline-block shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
                                            {loc.title || "Sacred Site"}
                                        </p>

                                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                                            <div className="overflow-hidden">
                                                <p className="text-white/90 text-sm leading-relaxed mb-6 border-l-2 border-saffron pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-sm font-medium">
                                                    {loc.desc || ""}
                                                </p>
                                                <span className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider group/link opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 drop-shadow-md">
                                                    {loc.id ? "Book Ritual Now" : "Explore Rituals"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-20">
                        <Link
                            href="/locations"
                            className="group relative inline-flex items-center gap-3 px-6 py-3 md:px-14 md:py-10 rounded-full border-2 border-saffron/20 text-saffron hover:text-white transition-all duration-300 font-black overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-lg">
                                EXPLORE ALL SACRED LOCATIONS
                            </span>
                            {/* Wave Animation */}
                            <div className="absolute inset-0 overflow-hidden rounded-full transform translate-z-0">
                                <div className="absolute bottom-0 left-0 right-0 bg-saffron transition-all duration-500 ease-in-out h-[15%] group-hover:h-full"></div>
                                <div className="absolute bottom-[15%] left-0 w-[200%] h-4 bg-repeat-x animate-wave group-hover:bottom-[100%] transition-all duration-500 ease-in-out"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\' fill=\'%23f97316\' transform=\'scale(1, -1) translate(0, -120)\'/%3E%3C/svg%3E")', backgroundSize: '50% 100%' }}>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section >

            {/* Featured Blog Section - Spiritual Insights */}
            < section className="py-24 bg-background relative overflow-hidden z-10" >
                {/* Decorative Background */}
                < div className="absolute inset-0 opacity-[0.02]" >
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-saffron rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]"></div>
                </div >

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-widest mb-6 border border-saffron/20 backdrop-blur-sm">
                            Knowledge Center
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                            Spiritual Insights & <span className="text-saffron">Guidance</span>
                        </h2>
                        <p className="text-xl text-muted-foreground font-light leading-relaxed">
                            Discover ancient wisdom and practical guidance for your spiritual journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogs.map((blog, idx) => (
                            <Link
                                key={idx}
                                href={blog.slug && blog.slug !== '#' ? `/blog/${blog.slug}` : '#'}
                                className="group relative bg-card rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-saffron/50 block cursor-pointer flex flex-col h-full"
                            >
                                {/* Gradient Header */}
                                <div className={`h-2 bg-gradient-to-r ${blog.gradient || gradients[idx % gradients.length]}`}></div>

                                <div className="p-8 flex flex-col flex-1">
                                    {/* Icon & Category */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                            {blog.icon || icons[idx % icons.length]}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getBlogCategoryStyle(blog.tags?.[0] || blog.category || "Insight")}`}>
                                            {blog.tags?.[0] || blog.category || "Insight"}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-black text-foreground mb-3 leading-tight group-hover:text-saffron transition-colors duration-300 line-clamp-2" style={{ fontFamily: 'Georgia, serif' }}>
                                        {blog.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <div className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 overflow-hidden text-ellipsis flex-grow">
                                        {/* Simple HTML strip for safety while searching/excerpting */}
                                        {blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : '')}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {blog.readTime || "5 min read"}
                                        </span>
                                        <span className="text-saffron font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Read More
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-saffron/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </Link>
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <Link href="/blog" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-saffron to-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            <span>Explore All Articles</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section >
            {/* Spiritual Family Section */}
            <SpiritualFamilySection />

            {/* Floating Social Buttons */}
            <FloatingSocialButtons />
        </div >
    );
}
