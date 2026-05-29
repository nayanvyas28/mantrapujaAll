"use client";
import React from 'react';

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

export default function VedicBackground({ sectionId = 1 }: { sectionId?: number }) {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Layer 1: Base Static Canvas */}
            <div className="absolute top-10 left-10 w-64 h-64 dark:bg-saffron-900/10 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 dark:bg-gold-900/10 rounded-full blur-3xl opacity-60"></div>

            {/* Layer 2: Planetary Systems - Hidden on Mobile */}
            <div className="hidden md:block">
                {[1, 2, 3].map((sys) => (
                    <div key={sys} className={`absolute scale-[0.8] animate-drift-${sys}`} 
                        style={{ 
                            top: sys === 1 ? '10%' : sys === 2 ? '85%' : '75%',
                            left: sys === 1 ? '5%' : sys === 2 ? '90%' : '10%',
                            animationDuration: `${60 + sys * 5}s` 
                        }}>
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-pulse shadow-[0_0_40px_rgba(251,146,60,0.6)]"></div>
                            {[
                                { r: 40, d: '8s', s: 'w-2 h-2', c: 'bg-stone-400' },
                                { r: 60, d: '12s', s: 'w-3 h-3', c: 'bg-orange-400' },
                                { r: 80, d: '15s', s: 'w-3 h-3', c: 'bg-blue-400' },
                                { r: 100, d: '20s', s: 'w-2.5 h-2.5', c: 'bg-red-400' },
                                { r: 140, d: '30s', s: 'w-8 h-8', c: 'bg-orange-200' },
                            ].map((orbit, i) => (
                                <div key={i} className="absolute rounded-full border border-dashed border-gray-400/60 dark:border-gray-600 animate-spin-slow"
                                    style={{ width: orbit.r * 2, height: orbit.r * 2, animationDuration: orbit.d }}>
                                    <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${orbit.s} ${orbit.c} shadow-sm`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Layer 3: Vedic Icon Scatter */}
            <div className="hidden md:block">
                {[...Array(16)].map((_, i) => {
                    const iconPath = backgroundIcons[(i + (sectionId * 10)) % backgroundIcons.length];
                    const possibleSlots = [
                        { x: 4, y: 25 }, { x: 12, y: 20 }, { x: 5, y: 35 }, { x: 13, y: 40 },
                        { x: 4, y: 55 }, { x: 12, y: 60 }, { x: 8, y: 90 }, { x: 95, y: 15 },
                        { x: 88, y: 25 }, { x: 96, y: 35 }, { x: 89, y: 45 }, { x: 95, y: 55 },
                        { x: 88, y: 65 }, { x: 94, y: 75 }, { x: 87, y: 10 }, { x: 95, y: 5 }
                    ];
                    const slot = possibleSlots[i % possibleSlots.length];
                    const jitterX = (i % 3) - 1.5;
                    const jitterY = (i % 2) - 1;
                    const finalLeft = slot.x + jitterX;
                    const finalTop = slot.y + jitterY;
                    const size = 30 + ((i * 7) % 20);
                    const spinDuration = 40 + ((i * 11) % 30);

                    return (
                        <div
                            key={`v-icon-${sectionId}-${i}`}
                            className={`absolute animate-wander-${(i % 8) + 1}`}
                            style={{
                                top: `${finalTop}%`,
                                left: `${finalLeft}%`,
                                animationDuration: `${120 + (i * 5)}s`,
                            }}
                        >
                            <img
                                src={iconPath}
                                alt={getIconName(iconPath)}
                                className="opacity-20 dark:opacity-30 select-none animate-spin-slow transition-all duration-700 hover:scale-125"
                                style={{
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    animationDuration: `${spinDuration}s`,
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
