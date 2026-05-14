"use client";

import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { useBooking } from './BookingProvider';
import FireParticles from "@/components/FireParticles";

interface BookingTriggerProps {
    variant?: 'primary' | 'secondary' | 'final';
    theme?: any;
}

export const BookingTrigger = ({ variant = 'primary', theme = { shadowHex: "#9a3412", gradient: "from-orange-500 to-red-600", rgba: "249,115,22", lightHex: "#fbbf24", hex: "#f97316" } }: BookingTriggerProps) => {
    const { openBooking } = useBooking();

    if (variant === 'primary') {
        return (
            <button
                onClick={() => openBooking()}
                className="group relative flex w-full sm:w-auto items-center justify-center h-14 md:h-16 px-6 sm:px-10 font-bold text-base md:text-lg text-white rounded-full transition-all duration-150 overflow-visible"
                style={{ boxShadow: `0 6px 0 0 ${theme.shadowHex}` }}
                onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(6px)'; }}
                onMouseUp={(e) => { e.currentTarget.style.boxShadow = `0 6px 0 0 ${theme.shadowHex}`; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
                <svg className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none" style={{ filter: `drop-shadow(0 0 4px rgba(${theme.rgba},0.6))`, zIndex: 20 }}>
                    <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="32" fill="none" stroke={theme.lightHex} strokeWidth="3" strokeDasharray="20 80" className="animate-snake-border" strokeLinecap="round" />
                </svg>
                <div className={`absolute inset-0 rounded-full overflow-hidden bg-gradient-to-r ${theme.gradient}`}>
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                        <FireParticles />
                    </div>
                </div>
                <span className="relative z-10 flex items-center gap-2 md:gap-3 text-xs md:text-sm uppercase tracking-[0.2em]">
                    Book Puja Now <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
            </button>
        );
    }

    if (variant === 'final') {
        return (
            <button
                onClick={() => openBooking()}
                className="group/call relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-white dark:bg-white/5 border-2 border-orange-100 dark:border-white/10 text-gray-900 dark:text-white font-black text-base md:text-xl hover:bg-gray-50 dark:hover:bg-white/10 hover:border-orange-500 transition-all duration-300 flex items-center justify-center gap-3 md:gap-4 hover:-translate-y-1 shadow-lg glass-glow"
            >
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-orange-500 animate-phone-vibrate" />
                <span className="relative z-10 tracking-tight uppercase">Call Pandit Ji</span>
            </button>
        );
    }

    // Default or other variants
    return (
        <button
            onClick={() => openBooking()}
            className="group relative inline-flex items-center justify-center gap-2 md:gap-3 px-8 md:px-14 py-6 md:py-10 rounded-full border-2 border-orange-500/20 text-orange-500 hover:text-white transition-all duration-300 font-black overflow-hidden shadow-lg hover:-translate-y-1"
        >
            <span className="relative z-10 flex items-center gap-2 text-base md:text-lg">
                BOOK THIS PUJA NOW <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute bottom-0 left-0 right-0 bg-orange-500 transition-all duration-500 ease-in-out h-[15%] group-hover:h-full"></div>
            </div>
        </button>
    );
};
