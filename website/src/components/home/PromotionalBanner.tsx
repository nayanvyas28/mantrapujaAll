"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PromotionalBanner() {
    const [slotsLeft, setSlotsLeft] = useState(221);

    useEffect(() => {
        const calculateSlots = () => {
            const now = new Date();
            const start = new Date("2026-04-10T00:00:00");
            const end = new Date("2026-04-20T23:59:59");

            const totalSlots = 500;
            const initialDone = 279;
            const availableSlots = totalSlots - initialDone;

            if (now < start) { setSlotsLeft(availableSlots); return; }
            if (now > end) { setSlotsLeft(0); return; }

            const totalDuration = end.getTime() - start.getTime();
            const elapsed = now.getTime() - start.getTime();
            const progress = elapsed / totalDuration;
            const noise = (Math.sin(now.getTime() / 10000) * 0.5);
            const remaining = Math.max(0, Math.floor(availableSlots * (1 - progress) + noise));
            setSlotsLeft(remaining);
        };

        calculateSlots();
        const timer = setInterval(calculateSlots, 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        /*
         * aspect-ratio: 10/1 → banner height = viewport-width / 10
         * At 375px mobile  → ~37px tall
         * At 768px tablet  → ~77px tall
         * At 1280px desktop→ ~128px tall
         * Everything scales proportionally with clamp() font sizes & vw units.
         */
        <section
            className="relative w-full overflow-hidden z-30"
            style={{ aspectRatio: '10 / 1' }}
        >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-1/2 -left-1/4 w-1/2 h-full bg-yellow-400/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-1/2 -right-1/4 w-1/2 h-full bg-orange-300/20 rounded-full blur-3xl"
                />
            </div>

            {/* Content — absolutely fills the 10:1 box */}
            <div className="absolute inset-0 flex items-center">
                <div className="w-full px-[2%] flex items-center justify-between gap-[1%]">

                    {/* ── LEFT: Price pill + Title ── */}
                    <div className="flex items-center gap-[1.5%] flex-1 min-w-0">
                        {/* Price Circle — size relative to banner height (10vw) */}
                        <motion.div
                            whileHover={{ scale: 1.08, rotate: 5 }}
                            className="flex-shrink-0 flex flex-col items-center justify-center bg-yellow-400 rounded-full border-[0.3vw] border-white -rotate-3"
                            style={{
                                width: 'clamp(24px, 7vw, 85px)',
                                height: 'clamp(24px, 7vw, 85px)',
                            }}
                        >
                            <span style={{ fontSize: 'clamp(4px, 0.8vw, 10px)' }} className="font-bold text-orange-800 uppercase leading-none">Just</span>
                            <span style={{ fontSize: 'clamp(9px, 2.4vw, 30px)' }} className="font-black text-red-700 leading-none">₹21</span>
                        </motion.div>

                        {/* Text */}
                        <div className="flex flex-col justify-center min-w-0">
                            <div className="flex items-center gap-[0.5%] mb-[0.3%]">
                                <span
                                    className="bg-yellow-400 text-orange-900 font-black uppercase tracking-widest px-[0.8%] rounded whitespace-nowrap"
                                    style={{ fontSize: 'clamp(4px, 0.75vw, 10px)', padding: '0.15% 0.6%' }}
                                >
                                    Special Offer
                                </span>
                                <span
                                    className="text-yellow-200 font-medium hidden sm:block whitespace-nowrap"
                                    style={{ fontSize: 'clamp(5px, 0.8vw, 11px)' }}
                                >
                                    · Akshaya Tritiya
                                </span>
                            </div>
                            <h2
                                className="font-black text-white leading-tight drop-shadow-md whitespace-nowrap overflow-hidden text-ellipsis"
                                style={{ fontSize: 'clamp(8px, 2vw, 26px)' }}
                            >
                                Akshaya Tritiya Special Puja
                            </h2>
                            <p
                                className="text-orange-50/90 font-medium hidden md:block mt-[0.3%] whitespace-nowrap overflow-hidden text-ellipsis"
                                style={{ fontSize: 'clamp(6px, 0.8vw, 11px)' }}
                            >
                                Complete Vedic rituals + Naam Sankalp with expert Pandit Ji from your home.
                            </p>
                        </div>
                    </div>

                    {/* ── RIGHT: Slots + CTA ── */}
                    <div className="flex items-center gap-[2%] flex-shrink-0">
                        {/* Slots counter */}
                        <div className="flex flex-col items-end">
                            <div className="hidden md:flex items-center gap-[0.5%] mb-[0.3%]">
                                <Users
                                    className="text-yellow-400"
                                    style={{ width: 'clamp(7px, 1vw, 12px)', height: 'clamp(7px, 1vw, 12px)' }}
                                />
                                <span
                                    className="font-bold uppercase tracking-wider text-orange-100 whitespace-nowrap"
                                    style={{ fontSize: 'clamp(5px, 0.7vw, 9px)' }}
                                >
                                    Limited Capacity
                                </span>
                            </div>
                            <div
                                className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 flex items-center"
                                style={{ padding: 'clamp(2px, 0.5%, 8px) clamp(4px, 1%, 14px)', gap: 'clamp(2px, 0.4%, 6px)' }}
                            >
                                <span
                                    className="font-black text-yellow-400 tracking-tighter tabular-nums"
                                    style={{ fontSize: 'clamp(9px, 2vw, 24px)' }}
                                >
                                    {slotsLeft}
                                </span>
                                <div className="flex flex-col leading-none">
                                    <span
                                        className="font-bold text-white/50 uppercase"
                                        style={{ fontSize: 'clamp(4px, 0.6vw, 8px)' }}
                                    >/ 500</span>
                                    <span
                                        className="font-bold text-white/80 uppercase"
                                        style={{ fontSize: 'clamp(4px, 0.6vw, 8px)' }}
                                    >Left</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link
                            href="/pooja-services/akshaya-tritiya-puja"
                            className="group relative flex items-center justify-center bg-white text-orange-700 rounded-xl font-black hover:-translate-y-0.5 transition-all duration-200 overflow-hidden whitespace-nowrap"
                            style={{
                                fontSize: 'clamp(7px, 1.2vw, 16px)',
                                padding: 'clamp(4px, 0.8%, 14px) clamp(8px, 2%, 28px)',
                                borderRadius: 'clamp(5px, 0.8vw, 14px)',
                            }}
                        >
                            <span className="relative z-10 flex items-center" style={{ gap: 'clamp(2px, 0.4%, 8px)' }}>
                                BOOK NOW
                                <ChevronRight
                                    style={{ width: 'clamp(7px, 1vw, 16px)', height: 'clamp(7px, 1vw, 16px)' }}
                                    className="group-hover:translate-x-0.5 transition-transform"
                                />
                            </span>
                            <div className="absolute inset-x-0 bottom-0 bg-yellow-400" style={{ height: 'clamp(1px, 0.2vw, 4px)' }} />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine" />
                        </Link>
                    </div>

                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg className="relative block w-[200%] h-[0.5vw] fill-white/10 animate-wave-slow" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
                </svg>
            </div>
        </section>
    );
}
