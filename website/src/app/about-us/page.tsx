'use client';

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import { Sun, Target, Eye, ChevronRight } from "lucide-react";

interface AboutPageData {
    content: {
        text: string;
    };
}

export default function AboutPage() {
    const [pageData, setPageData] = useState<AboutPageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );
            const { data } = await supabase
                .from('pages')
                .select('*')
                .eq('slug', 'about-us')
                .maybeSingle();

            if (data) setPageData(data);
            setLoading(false);
        };
        fetchPage();
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-saffron border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            <UnifiedPujaBackground />

            <div className="container mx-auto px-4 py-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-widest mb-6 border border-saffron/20 backdrop-blur-sm"
                    >
                        Our Sacred Legacy
                    </motion.span>
                    <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 text-saffron drop-shadow-sm">
                        About Mantra Puja
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-saffron to-transparent mx-auto mb-8"></div>
                    <p className="text-xl md:text-2xl text-muted-foreground/90 font-light leading-relaxed">
                        Preserving the sanctity of Vedic traditions through technology,
                        bridging the ancient with the modern to bring divine blessings to your doorstep.
                    </p>
                </motion.div>

                {pageData && pageData.content?.text ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-morphism p-8 md:p-12 rounded-[40px] prose dark:prose-invert max-w-none border border-white/10 shadow-2xl"
                    >
                        <div dangerouslySetInnerHTML={{ __html: pageData.content.text }} />
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        {/* Our Story Card - Masterfully Aligned Layout */}
                        <motion.div
                            variants={itemVariants}
                            className="glass-morphism p-10 md:p-14 rounded-[48px] border border-white/10 shadow-3xl relative overflow-hidden group"
                        >
                            <div className="absolute -top-10 -right-10 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-1000">
                                <Sun className="w-64 h-64 text-saffron" />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row gap-10 md:gap-14 items-start">
                                {/* Icon Container */}
                                <div className="w-20 h-20 shrink-0 rounded-[28px] bg-saffron/10 flex items-center justify-center border border-saffron/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-inner">
                                    <Sun className="w-10 h-10 text-saffron" />
                                </div>

                                {/* Content Container */}
                                <div className="flex-1">
                                    <h2 className="text-4xl md:text-6xl font-serif font-black text-foreground mb-6 leading-none tracking-tight">
                                        Our Story
                                    </h2>
                                    <div className="w-24 h-1.5 bg-gradient-to-r from-saffron to-transparent rounded-full mb-10"></div>
                                    <p className="text-xl md:text-3xl text-muted-foreground/90 font-light leading-relaxed md:leading-[1.6] max-w-4xl italic border-l-4 border-saffron/20 pl-6 py-2">
                                        Mantra Puja was born from a deep-seated desire to protect and promote the sacred Vedic traditions of Bharat.
                                        In an era of rapid digital transformation, we recognized the need for a platform that maintains the
                                        spiritual integrity of rituals while making them accessible to devotees globally.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mission & Vision Grid - Refined Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="glass-morphism p-10 rounded-[40px] border border-white/10 shadow-xl group flex flex-col items-start"
                            >
                                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 border border-orange-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <Target className="w-7 h-7 text-orange-500" />
                                </div>
                                <h2 className="text-3xl font-serif font-bold mb-4 text-foreground">Our Mission</h2>
                                <div className="w-12 h-0.5 bg-orange-500/30 mb-6"></div>
                                <p className="text-lg text-muted-foreground/90 leading-relaxed">
                                    To ensure every Vedic ritual is performed with precision, purity, and profound devotion,
                                    using authentic materials and guided by scholars who have dedicated their lives to the Vedas.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="glass-morphism p-10 rounded-[40px] border border-white/10 shadow-xl group flex flex-col items-start"
                            >
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <Eye className="w-7 h-7 text-blue-500" />
                                </div>
                                <h2 className="text-3xl font-serif font-bold mb-4 text-foreground">Our Vision</h2>
                                <div className="w-12 h-0.5 bg-blue-500/30 mb-6"></div>
                                <p className="text-lg text-muted-foreground/90 leading-relaxed">
                                    To become the global cornerstone for spiritual services, where tradition is honored and
                                    digital ease serves as a vessel for divine connection and inner peace.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                >
                    <Link
                        href="/pooja-services"
                        className="group relative inline-flex items-center gap-3 px-10 py-5 bg-saffron text-white rounded-full font-bold text-lg shadow-lg hover:shadow-saffron/40 transition-all hover:scale-105"
                    >
                        Explore Our Services
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            <style jsx global>{`
                .glass-morphism {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }
                .dark .glass-morphism {
                    background: rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
}

