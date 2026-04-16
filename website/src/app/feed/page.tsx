"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import FeedPlayer from "@/components/feed/FeedPlayer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sun, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Reel {
    id: string;
    title: string;
    title_hi?: string;
    video_url: string;
    thumbnail_url?: string;
    category?: string;
}

export default function FeedPage() {
    const [reels, setReels] = useState<Reel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReels = async () => {
            const { data, error } = await supabase
                .from("reels")
                .select("*")
                .eq("is_active", true)
                .order("order_index", { ascending: false });

            if (!error && data) {
                setReels(data);
            }
            setIsLoading(false);
        };

        fetchReels();
    }, []);

    return (
        <main className="min-h-screen bg-black">
            <Header />
            
            <section className="py-20 container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-12">
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-saffron/10 rounded-2xl border border-saffron/20">
                                    <Sun className="w-6 h-6 text-saffron" />
                                </div>
                                <h1 className="text-4xl font-bold text-white tracking-tight">Divine <span className="text-saffron">Feed</span></h1>
                            </div>
                            <p className="text-zinc-500 max-w-lg">
                                Watch authentic Vedic rituals, sacred chants, and spiritual moments curated for your soul's journey.
                            </p>
                        </div>
                        <Link 
                            href="/"
                            className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </header>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-6">
                            <div className="w-16 h-16 border-4 border-saffron/20 border-t-saffron rounded-full animate-spin" />
                            <p className="text-zinc-500 animate-pulse font-medium tracking-widest uppercase text-xs">
                                Connecting to Divine Stream...
                            </p>
                        </div>
                    ) : reels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {reels.map((reel, index) => (
                                <motion.div
                                    key={reel.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group space-y-6"
                                >
                                    <div className="aspect-[9/16] max-h-[700px] w-full relative">
                                        <FeedPlayer 
                                            url={reel.video_url} 
                                            isActive={false} // Full page list doesn't autoplay all
                                            title={reel.title}
                                            thumbnail={reel.thumbnail_url}
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-saffron">
                                                {reel.category || "Divine"}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{reel.title}</h2>
                                        {reel.title_hi && (
                                            <p className="text-zinc-400 font-medium">{reel.title_hi}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40 bg-white/5 rounded-[40px] border border-dashed border-white/10">
                            <ImageIcon className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-zinc-400">No Content Available</h3>
                            <p className="text-zinc-600 mt-2">The Divine Feed is currently empty. Check back soon for new videos.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
