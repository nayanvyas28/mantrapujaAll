import { Metadata } from "next";
import { getSeoMetadata } from "@/lib/seo";
import { supabase } from "@/lib/supabaseClient";
import { getHomeQuickAccess, resolveImageUrl } from '@/lib/contentService';
import { resolvePujaImage } from '@/lib/imageResolver';
import { Suspense } from "react";

// Server Components
import QuickAccessSection from "./homepage/sections/QuickAccessSection/QuickAccessSection";
import FeaturedPujasSection from "./homepage/sections/FeaturedPujasSection/FeaturedPujasSection";
import WhyChooseUsSection from "./homepage/sections/WhyChooseUsSection/WhyChooseUsSection";
import SacredLocationsSection from "./homepage/sections/SacredLocationsSection/SacredLocationsSection";
import BlogsSection from "./homepage/sections/BlogsSection/BlogsSection";
import FAQSection from "./homepage/sections/FAQSection/FAQSection";
import CTASection from "./homepage/sections/CTASection/CTASection";
import SpiritualFamilySection from "@/components/home/SpiritualFamilySection";

// Client Islands
import HeroSliderIsland from "./homepage/sections/Islands/HeroSliderIsland";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export async function generateMetadata() {
    const defaultMetadata: Metadata = {
        title: "MantraPuja - Book Authentic Vedic Poojas",
        description: "Find and book the right Pooja for every purpose. Authentic Vedic rituals at your home.",
        keywords: ["pooja", "vedic", "rituals", "hinduism", "pandit"],
        openGraph: {
            type: "website",
            locale: "en_US",
            url: "https://mantrapuja.com/",
            siteName: "MantraPuja",
        },
    };
    return getSeoMetadata("/", defaultMetadata);
}

export default async function Home() {
    // 🚀 Parallel Server-Side Data Fetching
    const [
        blogsRes,
        locationsRes,
        pujasRes,
        featuresRes,
        bannersRes,
        quickAccess
    ] = await Promise.all([
        supabase.from('Final_blog').select('id, title, slug, image_url, category, excerpt, tags').eq('published', true).order('created_at', { ascending: false }).limit(3),
        supabase.from('spiritual_places').select('id, name, type, state_id, description, images, slug, home_image_url').eq('show_on_home', true).eq('is_active', true).order('home_order', { ascending: true }).limit(4),
        supabase.from('poojas').select('id, name, slug, images, description, price, is_featured, is_special_offer, special_offer_price, tags').eq('is_active', true).order('is_featured', { ascending: false }).order('created_at', { ascending: false }).limit(6),
        supabase.from('home_features').select('*').eq('is_active', true).order('display_order', { ascending: true }),
        supabase.from('home_banners').select('*').eq('is_active', true).or('target.eq.web,target.eq.both').order('display_order', { ascending: true }).limit(5),
        getHomeQuickAccess()
    ]);

    // Data Mapping
    const mappedLocations = (locationsRes.data || []).map((l: any) => ({
        id: l.id,
        name: l.name,
        title: l.type || "Sacred Site",
        location: l.state_id || "India",
        desc: l.description || "",
        image: resolveImageUrl(l.home_image_url || (l.images?.[0] || "/logo.png")),
        slug: l.slug
    }));

    const mappedPujas = (pujasRes.data || []).map((p: any) => {
        const resolved = resolvePujaImage(p.images);
        return {
            id: p.id,
            name: p.name,
            slug: p.slug,
            image: resolved.url,
            desc: p.description,
            price: p.price,
            is_special_offer: p.is_special_offer,
            special_offer_price: p.special_offer_price,
            tags: p.tags || []
        };
    });

    // JSON-LD Schemas
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "MantraPuja",
        "url": "https://mantrapuja.com",
        "logo": "https://mantrapuja.com/logo.png",
        "sameAs": [
            "https://facebook.com/mantrapuja",
            "https://instagram.com/mantrapuja"
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "MantraPuja",
        "url": "https://mantrapuja.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://mantrapuja.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <main className="min-h-screen bg-background">
            {/* SEO JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, websiteSchema]) }}
            />

            {/* 1. Hero Section (Client Island) */}
            <HeroSliderIsland banners={bannersRes.data || []} currentLang="en" />

            {/* 2. Quick Access (Server) */}
            <QuickAccessSection items={quickAccess} />

            {/* 3. Featured Pujas (Server) */}
            <FeaturedPujasSection pujas={mappedPujas} />

            {/* 4. Why Choose Us (Server) */}
            <WhyChooseUsSection features={featuresRes.data || []} />

            {/* 5. CTA Section (Server) - Mid Page Conversion */}
            <CTASection isDarkTheme={true} />

            {/* 6. Sacred Locations (Suspense/Server) */}
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingScreen /></div>}>
                <SacredLocationsSection locations={mappedLocations} />
            </Suspense>

            {/* 7. Blogs Section (Suspense/Server) */}
            <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingScreen /></div>}>
                <BlogsSection blogs={blogsRes.data || []} />
            </Suspense>

            {/* 8. FAQs (Server) */}
            <FAQSection />

            {/* 9. Spiritual Family (Server) */}
            <SpiritualFamilySection />
        </main>
    );
}
