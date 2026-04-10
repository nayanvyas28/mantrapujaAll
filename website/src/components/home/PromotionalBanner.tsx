"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Clock, Users, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PromotionalBanner() {
    const [slotsLeft, setSlotsLeft] = useState(20);

    // Subtle countdown effect for slots
    useEffect(() => {
        const timer = setInterval(() => {
            setSlotsLeft(prev => (prev > 5 ? prev - 1 : prev));
        }, 15000); // Reduce a slot every 15 seconds for urgency feel
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full overflow-hidden z-30">
            {/* Animated Background with Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 animate-gradient-slow overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                {/* Floating Glow Effects */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3] 
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-400/30 rounded-full blur-3xl"
                ></motion.div>
                <motion.div 
                    animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.5, 0.2] 
                    }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"
                ></motion.div>
            </div>

            <div className="container mx-auto px-4 py-3 md:py-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-8">
                    
                    {/* Left Side: Content */}
                    <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
                        {/* Highlights: Special Price Circle */}
                        <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center shadow-2xl border-2 md:border-4 border-white transform -rotate-3"
                        >
                            <span className="text-[8px] md:text-xs font-bold text-orange-800 uppercase leading-none">Just</span>
                            <span className="text-lg md:text-3xl font-black text-red-700 leading-none">₹21</span>
                        </motion.div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <span className="bg-yellow-400 text-orange-900 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest shadow-lg">Special Offer</span>
                                <div className="flex items-center text-yellow-200 text-sm">
                                    <Sparkles size={14} className="animate-pulse mr-1" />
                                    <span className="font-medium">Akshaya Tritiya</span>
                                </div>
                            </div>
                            <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-md">
                                Akshaya Tritiya Special Puja
                            </h2>
                            <p className="text-sm md:text-base text-orange-50/90 font-medium max-w-xl">
                                Complete Vedic rituals + Naam Sankalp with our expert Pandit Ji from the comfort of your home.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Urgency & CTA */}
                    <div className="flex flex-row lg:flex-row items-center gap-4 md:gap-8">
                        {/* Slots Counter */}
                        <div className="flex flex-col items-center sm:items-end">
                            <div className="flex items-center gap-2 text-white mb-1">
                                <Users size={16} className="text-yellow-400" />
                                <span className="text-xs font-bold uppercase tracking-wider text-orange-100">Limited Capacity</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <div className="bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                                    <span className="text-2xl font-black text-yellow-400 tracking-tighter tabular-nums">
                                        {slotsLeft}
                                    </span>
                                    <span className="text-[10px] font-bold text-white/80 uppercase">Slots Left</span>
                                </div>
                                <motion.div 
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#fbbf24]"
                                ></motion.div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link 
                            href="/pooja-services/akshaya-tritiya-puja"
                            className="group relative flex items-center justify-center bg-white text-orange-700 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                BOOK NOW
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400"></div>
                            {/* Hover Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine"></div>
                        </Link>
                    </div>

                </div>
            </div>

            {/* Decorative Bottom Wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
                <svg className="relative block w-[200%] h-4 fill-white/10 animate-wave-slow" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
                </svg>
            </div>
        </section>
    );
}
