"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import FeedPlayer from "../feed/FeedPlayer";
import { motion } from "framer-motion";
import { Video, ChevronRight, Sparkles } from "lucide-react";
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
        <section className="py-24 relative overflow-hidden bg-zinc-950">
            {/* Background Sacred Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saffron/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-950/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron/10 border border-saffron/20 mb-6"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-saffron" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-saffron">Divine Experience</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            Divine <span className="text-saffron">Feed</span>
                        </h2>
                        <p className="text-zinc-400 text-lg">
                            Experience the sacred traditions through our curated spiritual reels. 
                            Witness the rituals, chants, and divine moments in high definition.
                        </p>
                    </div>

                    <Link 
                        href="/feed"
                        className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all active:scale-95"
                    >
                        Explore Feed
                        <ChevronRight className="w-4 h-4 text-saffron group-hover:translate-x-1 transition-transform" />
                    </Link>
                </header>

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
                                <h3 className="text-xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
                                    {reel.title}
                                </h3>
                                {reel.title_hi && (
                                    <p className="text-sm text-zinc-400 font-medium drop-shadow-md">
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
