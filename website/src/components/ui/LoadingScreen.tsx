"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-colors duration-500">
            <div className="relative">
                {/* Subtle Pulse Rings - More subtle for white theme */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 -m-8 rounded-full border-2 border-saffron/20 blur-[2px]"
                />
                
                {/* Central Rotating Swastika SVG */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        rotate: {
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        scale: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }
                    }}
                    className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center drop-shadow-xl"
                >
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <defs>
                            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f59e0b" />
                                <stop offset="50%" stopColor="#fbbf24" />
                                <stop offset="100%" stopColor="#d97706" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Sacred Swastika Path (Clockwise/Auspicious) */}
                        <path 
                            d="M50 50 V15 H85 M50 50 H85 V85 M50 50 V85 H15 M50 50 H15 V15" 
                            stroke="url(#goldGradient)" 
                            strokeWidth="10" 
                            fill="none" 
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#glow)"
                        />
                        {/* Auspicious Dots */}
                        <circle cx="30" cy="30" r="4" fill="#d97706" />
                        <circle cx="70" cy="30" r="4" fill="#d97706" />
                        <circle cx="70" cy="70" r="4" fill="#d97706" />
                        <circle cx="30" cy="70" r="4" fill="#d97706" />
                    </svg>
                </motion.div>

                {/* Atmospheric Glow */}
                <div className="absolute inset-0 rounded-full bg-saffron/5 blur-3xl -z-10" />
            </div>

            {/* Spiritual Text */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16 text-center"
            >
                <motion.p
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="text-saffron font-bold tracking-[0.3em] uppercase text-xs md:text-sm"
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    Connecting to the Divine
                </motion.p>
                <div className="mt-6 flex items-center justify-center gap-3">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.2, 0.7, 0.2],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.3,
                            }}
                            className="w-2 h-2 rounded-full bg-saffron/30"
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
