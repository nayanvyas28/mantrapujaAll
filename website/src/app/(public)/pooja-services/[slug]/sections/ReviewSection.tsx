"use client";

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, Flower } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface ReviewSectionProps {
    pujaSlug: string;
    initialTestimonials: any[];
    title?: string;
}

export const ReviewSection = ({ pujaSlug, initialTestimonials, title }: ReviewSectionProps) => {
    const [realReviews, setRealReviews] = useState<any[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        setIsMounted(true);
        const fetchReviews = async () => {
            try {
                const res = await fetch(`/api/puja-reviews/${pujaSlug}`);
                if (res.ok) {
                    const data = await res.json();
                    setRealReviews(data.reviews || []);
                }
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
            }
        };
        fetchReviews();
    }, [pujaSlug]);

    const allReviews = [...realReviews, ...initialTestimonials];

    if (!isMounted || allReviews.length === 0) return null;

    return (
        <section id="testimonials" className="py-8 md:py-16 relative z-10">
            <div className="container mx-auto px-4">
                <SectionHeading subtitle="Trust">{title || "What Devotees Say"}</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {allReviews.slice(0, 9).map((t, i) => (
                        <motion.div
                            key={i}
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : i * 0.05 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative group h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-[2rem] md:rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="relative bg-white/40 dark:bg-card/40 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/40 dark:border-white/10 hover:border-orange-500/40 transition-all duration-500 flex flex-col h-full overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 p-6 md:p-8 text-orange-500/10">
                                    <Flower className="w-12 h-12 md:w-16 md:h-16 rotate-12" />
                                </div>
                                <div className="flex text-amber-500 mb-6 md:mb-8 gap-1">
                                    {[...Array(5)].map((_, si) => (
                                        <Star key={si} className={`w-4 h-4 md:w-5 md:h-5 ${si < Math.floor(t.rating) ? "fill-current" : "opacity-20"}`} />
                                    ))}
                                </div>
                                <p className="text-base md:text-xl text-gray-800 dark:text-muted-foreground italic mb-8 md:mb-10 leading-relaxed font-serif relative z-10">"{t.comment}"</p>
                                <div className="flex items-center gap-4 md:gap-5 mt-auto">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-black text-lg md:text-2xl text-white shadow-lg overflow-hidden">
                                        {t.avatar && (t.avatar.startsWith('http') || t.avatar.startsWith('/') || t.avatar.includes('.')) ? (
                                            <img src={t.avatar} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{t.avatar || t.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-black font-serif text-lg md:text-xl text-gray-900 dark:text-white">{t.name}</p>
                                        <p className="text-[10px] md:text-sm text-orange-600 font-black uppercase tracking-widest">{t.location}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
