"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Gift, Loader2 } from "lucide-react";

interface Banner {
    id: string;
    image_url: string;
    title: string;
    title_hi?: string;
    subtitle: string;
    subtitle_hi?: string;
    route: string;
    show_offer?: boolean;
    offer_tag?: string;
    offer_tag_hi?: string;
    show_text_overlay?: boolean;
}

export default function HeroSliderIsland({ banners, currentLang }: { banners: Banner[], currentLang: string }) {
    const [activeBanner, setActiveBanner] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (banners.length > 1) {
            timerRef.current = setInterval(() => {
                setActiveBanner(prev => (prev + 1) % banners.length);
            }, 6000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [banners]);

    if (banners.length === 0) return null;

    const banner = banners[activeBanner];

    return (
        <section className="relative pt-4 md:pt-6 pb-2 px-4 md:px-8 lg:px-12 bg-white dark:bg-slate-950">
            <div className="max-w-[1600px] mx-auto">
                <div className="relative w-full aspect-[4/1] overflow-hidden rounded-[1.2rem] md:rounded-[2.2rem] group bg-slate-900">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={banner.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 cursor-pointer"
                            onClick={() => {
                                const route = banner.route?.startsWith('puja:')
                                    ? `/pooja-services/${banner.route.split(':')[1]}`
                                    : (banner.route || '/pooja-services');
                                window.location.href = route;
                            }}
                        >
                            <motion.div
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={banner.image_url || '/logo.png'}
                                    alt={banner.title}
                                    fill
                                    priority
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                            {banner.show_text_overlay !== false && (
                                <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
                                    <motion.h1 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-widest leading-tight uppercase"
                                        style={{ fontFamily: 'Georgia, serif' }}
                                    >
                                        {currentLang === 'hi' ? (banner.title_hi || banner.title) : banner.title}
                                    </motion.h1>

                                    <motion.p 
                                        initial={{ y: 15, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-base md:text-xl text-white/90 mb-8 max-w-2xl font-light leading-relaxed"
                                    >
                                        {currentLang === 'hi' ? (banner.subtitle_hi || banner.subtitle) : banner.subtitle}
                                    </motion.p>

                                    <div className="flex gap-4">
                                        <button className="px-10 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold hover:scale-105 transition-all">
                                            {currentLang === 'hi' ? "अभी बुक करें" : "BOOK NOW"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
