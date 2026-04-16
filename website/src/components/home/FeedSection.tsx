"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import FeedPlayer from "../feed/FeedPlayer";
import { motion } from "framer-motion";
import { Video, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Reel {
    id: string;
    title: string;
    title_hi?: string;
    video_url: string;
    thumbnail_url?: string;
    category?: string;
}

const FeedSection = () => {
    const [reels, setReels] = useState<Reel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const fetchReels = async () => {
            const { data, error } = await supabase
                .from("reels")
                .select("*")
                .eq("is_active", true)
                .order("order_index", { ascending: false })
                .limit(4);

            if (!error && data) {
                setReels(data);
                if (data.length > 0) setActiveId(data[0].id);
            }
            setIsLoading(false);
        };

        fetchReels();
    }, []);

    if (isLoading && reels.length === 0) return null;
    if (reels.length === 0) return null;

    return (
        <section className="pt-20 pb-12 md:pt-28 md:pb-16 relative overflow-hidden bg-zinc-950">
            {/* Background Sacred Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffron/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-950/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-4">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-saffron/40"></div>
                        <span className="text-saffron font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Divine Experience</span>
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-saffron/40"></div>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-white mb-3 pb-1" style={{ fontFamily: 'Georgia, serif' }}>
                        Divine <span className="text-saffron">Feed</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm md:text-base text-zinc-400 font-light leading-relaxed mb-8">
                        Experience the sacred traditions through our curated spiritual reels. 
                        Witness the rituals, chants, and divine moments in high definition.
                    </p>
                    
                    <Link 
                        href="/feed"
                        className="group relative inline-flex items-center gap-3 px-6 py-3 md:px-10 md:py-4 rounded-full border-2 border-saffron/20 text-saffron hover:text-white transition-all duration-300 font-black overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-widest">
                            Explore Feed
                        </span>
                        <div className="absolute inset-0 overflow-hidden rounded-full transform translate-z-0">
                            <div className="absolute bottom-0 left-0 right-0 bg-saffron transition-all duration-500 ease-in-out h-[15%] group-hover:h-full"></div>
                            <div className="absolute bottom-[15%] left-0 w-[200%] h-4 bg-repeat-x animate-wave group-hover:bottom-[100%] transition-all duration-500 ease-in-out"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\' fill=\'%23f97316\' transform=\'scale(1, -1) translate(0, -120)\'/%3E%3C/svg%3E")', backgroundSize: '50% 100%' }}>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reels.map((reel, index) => (
                        <motion.div
                            key={reel.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setActiveId(reel.id)}
                            className="relative group h-[500px]"
                        >
                            <div className="absolute inset-0 z-0">
                                <FeedPlayer 
                                    url={reel.video_url} 
                                    isActive={activeId === reel.id} 
                                    title={reel.title}
                                    thumbnail={reel.thumbnail_url}
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 pointer-events-none" />
                            
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 pointer-events-none">
                                <span className="text-[10px] uppercase font-black tracking-widest text-saffron mb-2 block">
                                    {reel.category || "Divine"}
                                </span>
                                <h3 className="text-base md:text-lg font-bold text-white leading-tight mb-2 drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
                                    {reel.title}
                                </h3>
                                {reel.title_hi && (
                                    <p className="text-xs text-zinc-400 font-medium drop-shadow-md">
                                        {reel.title_hi}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeedSection;
