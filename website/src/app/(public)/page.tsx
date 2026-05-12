import { Metadata } from "next";
import { getSeoMetadata } from "@/lib/seo";
import HomeClient from "@/components/home/HomeClient";
import { supabase } from "@/lib/supabaseClient";
import { getHomeQuickAccess } from '@/lib/contentService';
import { getUiConfig } from '@/lib/uiMapping';

export async function generateMetadata() {
    const defaultMetadata: Metadata = {
        title: "Mantra Puja - Book Authentic Vedic Poojas",
        description: "Find and book the right Pooja for every purpose. Authentic Vedic rituals at your home.",
        keywords: ["pooja", "vedic", "rituals", "hinduism", "pandit"],
        openGraph: {
            type: "website",
            locale: "en_US",
            url: "https://mantrapooja.com/",
            siteName: "Mantra Pooja",
        },
        twitter: {
            card: "summary_large_image",
        },
    };

    return getSeoMetadata("/", defaultMetadata);
}

export default async function Home() {
    // 🚀 Parallel Server-Side Data Fetching
    const [
        pDataResponse,
        fBlogsResponse,
        lDataResponse,
        pujasDataResponse,
        fDataResponse,
        bannersResponse
    ] = await Promise.all([
        supabase.from('pages').select('id, slug, title').or('slug.eq./,slug.eq.home').maybeSingle(),
        supabase.from('Final_blog').select('id, title, slug, image_url, category, excerpt, tags, created_at').eq('published', true).eq('is_active', true).order('created_at', { ascending: false }).limit(3),
        supabase.from('destinations').select('id, name, type, state_id, description, images, slug, home_image_url, show_on_home, home_order').eq('show_on_home', true).order('home_order', { ascending: true }).limit(4),
        supabase.from('poojas').select('id, name, slug, images, description, benefits, price, is_featured, is_hero, tags, is_special_offer, special_offer_price').eq('is_active', true).limit(500),
        supabase.from('home_features').select('id, title, description, image_url, display_order').eq('is_active', true).order('display_order', { ascending: true }),
        supabase.from('home_banners').select('*, show_text_overlay').eq('is_active', true).or('target.eq.web,target.eq.both').order('display_order', { ascending: true })
    ]);

    // 1. Process Locations
    const mappedLocations = (lDataResponse.data || []).map((l: any, idx: number) => ({
        id: l.id,
        name: l.name,
        title: l.type || "Sacred Site",
        location: l.state_id || "India",
        desc: l.description || "",
        image: l.home_image_url || (l.images && l.images.length > 0 ? l.images[0] : "/logo.png"),
        slug: l.slug,
        delay: (idx * 100).toString()
    }));

    // 2. Process Poojas
    const mappedPujas = (pujasDataResponse.data || []).map((item: any) => ({
        ...getUiConfig(item.slug),
        id: item.id,
        name: item.name,
        slug: item.slug,
        image: (item.images && item.images.length > 0 && item.images[0]) ? item.images[0] : '/logo.png',
        desc: item.description,
        benefits: item.benefits || [],
        price: item.price,
        is_featured: item.is_featured,
        is_hero: item.is_hero,
        is_special_offer: item.is_special_offer,
        special_offer_price: item.special_offer_price,
        tags: item.tags || []
    }));

    const heroPujas = mappedPujas.filter(p => p.is_hero).slice(0, 3);
    const featuredPujas = mappedPujas.filter(p => p.is_featured);
    const popularPujas = featuredPujas.length > 0 ? featuredPujas.slice(0, 6) : mappedPujas.filter(p => !p.is_hero).slice(0, 6);

    // 3. Quick Access
    const quickAccess = await getHomeQuickAccess();
    const finalQuickAccess = (quickAccess && quickAccess.length > 0) ? quickAccess : [
        { name: "Kundali", img: "/features/kundali.png", link: "/kundli", color: "from-orange-500/10 to-red-500/10", border: "#f97316" },
        { name: "Rashifal", img: "/features/rashifal.png", link: "/horoscope", color: "from-amber-500/10 to-orange-500/10", border: "#f59e0b" },
        { name: "Panchang", img: "/features/panchang.png", link: "/panchang", color: "from-yellow-500/10 to-amber-500/10", border: "#eab308" },
        { name: "Calculator", img: "/features/calculator.png", link: "/calculators", color: "from-red-500/10 to-pink-500/10", border: "#ef4444" },
        { name: "Chadava", img: "/features/chadava.png", link: "/chadava", color: "from-purple-500/10 to-indigo-500/10", border: "#a855f7" },
        { name: "Guru Ji AI", img: "/features/guru-ai.png", link: "/chat", color: "from-cyan-500/10 to-blue-500/10", border: "#06b6d4" }
    ];

    return (
        <HomeClient 
            initialBanners={bannersResponse.data || []}
            initialBlogs={fBlogsResponse.data || []}
            initialLocations={mappedLocations}
            initialPopularPujas={popularPujas}
            initialHeroPujas={heroPujas}
            initialFeatures={fDataResponse.data || []}
            initialQuickAccess={finalQuickAccess}
            initialPageData={pDataResponse.data}
        />
    );
}
