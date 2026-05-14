'use client';

import React, { useState, useEffect } from 'react';
import EmberParticles from '@/components/EmberParticles';
import { CosmicBackground } from '@/components/CosmicBackground';

const backgroundIcons = [
    "/zodiac/aquarius.png", "/zodiac/aries.png", "/zodiac/cancer.png", "/zodiac/capricorn.png",
    "/zodiac/leo.png", "/zodiac/libra.png", "/zodiac/pisces.png",
    "/zodiac/sagittarius.png", "/zodiac/scorpion.png", "/zodiac/taurus.png", "/zodiac/virgo.png",
    "/bhagwan/brahma.png", "/bhagwan/durga.png", "/bhagwan/ganesha.png", "/bhagwan/hanuman.png",
    "/bhagwan/krishna.png", "/bhagwan/lakshmi.png", "/bhagwan/rama.png", "/bhagwan/shiv.png",
    "/bhagwan/shiva.png", "/bhagwan/surya.png", "/bhagwan/vishnu.png",
    "/astrology/astrology.png", "/astrology/chiromancy.png", "/astrology/constellation.png",
    "/astrology/crystal-ball.png", "/astrology/fortune-wheel.png", "/astrology/galaxy.png",
    "/astrology/horoscope.png", "/astrology/stars.png", "/astrology/tarot.png",
    "/diya.png", "/havan.png", "/kalasha.png", "/moon.png", "/sun.png", "/premium-loader.png", "/temple.png"
];

const getIconName = (path: string): string => {
    const filename = path.split('/').pop() || '';
    return filename.replace('.png', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Vedic Symbol';
};

export const UnifiedPujaBackground = () => {
    const [shouldRender, setShouldRender] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Step 6.1: Delay initialization to avoid hydration-blocking
        const timer = setTimeout(() => setShouldRender(true), 200);

        // Step 6.2: Reduced Motion Support
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);

        return () => {
            clearTimeout(timer);
            mediaQuery.removeEventListener('change', handler);
        };
    }, []);

    if (!shouldRender) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {/* Light Mode - Rich Vedic Background from Homepage */}
            <div className="absolute inset-0 bg-background dark:hidden overflow-hidden">
                {/* Layer 1: Base Static Canvas */}
                <div className="absolute top-24 left-10 w-64 h-64 dark:bg-saffron-900/10 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute top-[80%] right-10 w-96 h-96 dark:bg-gold-900/10 rounded-full blur-3xl opacity-60"></div>

                {/* Ember Particles - Paused if reduced motion */}
                {!prefersReducedMotion && (
                    <EmberParticles count={20} color="bg-orange-400" className="opacity-50" />
                )}

                {/* Layer 2: Planetary Systems - Optimized Throttling */}
                <div className="hidden md:block">
                    {!prefersReducedMotion && (
                        <>
                            {/* System 1 (Top-Left) */}
                            <div className="absolute top-[15%] left-[5%] scale-[0.8] animate-drift-1" style={{ animationDuration: '60s' }}>
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-pulse shadow-[0_0_40px_rgba(251,146,60,0.6)]"></div>
                                    {[
                                        { r: 40, d: '8s', s: 'w-2 h-2', c: 'bg-stone-400' },
                                        { r: 60, d: '12s', s: 'w-3 h-3', c: 'bg-orange-400' },
                                        { r: 80, d: '15s', s: 'w-3 h-3', c: 'bg-blue-400' },
                                        { r: 100, d: '20s', s: 'w-2.5 h-2.5', c: 'bg-red-400' },
                                        { r: 140, d: '30s', s: 'w-8 h-8', c: 'bg-orange-200' },
                                    ].map((orbit, i) => (
                                        <div key={i} className="absolute rounded-full border border-dashed border-gray-400/30 animate-spin-slow"
                                            style={{ width: orbit.r * 2, height: orbit.r * 2, animationDuration: orbit.d }}>
                                            <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${orbit.s} ${orbit.c} shadow-sm`}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* System 2 (Bottom-Right) */}
                            <div className="absolute top-[85%] left-[90%] scale-[0.8] animate-drift-2" style={{ animationDuration: '70s' }}>
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-pulse shadow-[0_0_40px_rgba(251,146,60,0.6)]"></div>
                                    {[
                                        { r: 40, d: '8s', s: 'w-2 h-2', c: 'bg-stone-400' },
                                        { r: 60, d: '12s', s: 'w-3 h-3', c: 'bg-orange-400' },
                                        { r: 80, d: '15s', s: 'w-3 h-3', c: 'bg-blue-400' },
                                        { r: 100, d: '20s', s: 'w-2.5 h-2.5', c: 'bg-red-400' },
                                        { r: 140, d: '30s', s: 'w-8 h-8', c: 'bg-orange-200' },
                                    ].map((orbit, i) => (
                                        <div key={i} className="absolute rounded-full border border-dashed border-gray-400/30 animate-spin-slow"
                                            style={{ width: orbit.r * 2, height: orbit.r * 2, animationDuration: orbit.d }}>
                                            <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${orbit.s} ${orbit.c} shadow-sm`}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Layer 3: Vedic Icon Scatter - Throttled count for mobile/reduced motion */}
                <div className="hidden md:block">
                    {[...Array(prefersReducedMotion ? 4 : 12)].map((_, i) => {
                        const iconPath = backgroundIcons[(i + 15) % backgroundIcons.length];
                        const possibleSlots = [
                            { x: 4, y: 25 }, { x: 12, y: 20 }, { x: 5, y: 35 }, { x: 13, y: 40 },
                            { x: 95, y: 15 }, { x: 88, y: 25 }, { x: 96, y: 35 }, { x: 89, y: 45 },
                            { x: 4, y: 55 }, { x: 12, y: 60 }, { x: 95, y: 55 }, { x: 88, y: 65 }
                        ];

                        const slot = possibleSlots[i % possibleSlots.length];
                        const size = 30 + ((i * 7) % 20);
                        const animIndex = (i % 8) + 1;
                        const wanderClass = prefersReducedMotion ? '' : `animate-wander-${animIndex}`;
                        const spinClass = prefersReducedMotion ? '' : 'animate-spin-slow';

                        return (
                            <div
                                key={`v-icon-1-${i}`}
                                className={`absolute ${wanderClass}`}
                                style={{
                                    top: `${slot.y}%`,
                                    left: `${slot.x}%`,
                                    animationDuration: `${120 + ((i * 13) % 40)}s`,
                                    animationDelay: `${(i * 7) % 20}s`,
                                    transform: 'scale(1)',
                                }}
                            >
                                <img
                                    src={iconPath}
                                    alt={getIconName(iconPath)}
                                    className={`opacity-30 dark:opacity-10 select-none transition-all duration-700 ${spinClass}`}
                                    style={{
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        animationDuration: `${40 + ((i * 11) % 30)}s`,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dark Mode - Cosmic Background (Already partially optimized) */}
            <div className="hidden dark:block">
                <CosmicBackground />
            </div>
        </div>
    );
};
