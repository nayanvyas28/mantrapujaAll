import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TempleIcon, LingamIcon, TrishulIcon, KalashIcon } from './icons/SpiritualIcons';
import { Location } from '../data/spiritual-locations';
import { INDIA_MAP_PATHS, INDIA_MAP_VIEWBOX } from '../data/india-map-data';

interface IndiaMapProps {
    locations: Location[];
    activeFilter: string;
    selectedStateId?: string | null;
    onLocationClick?: (loc: Location | null) => void;
}

const COLOR_PALETTE = [
    { from: 'rgba(249, 115, 22, 0.4)', mid: 'rgba(245, 158, 11, 0.6)', to: 'rgba(234, 88, 12, 0.5)' }, // Saffron Glass
    { from: 'rgba(6, 182, 212, 0.4)', mid: 'rgba(34, 211, 238, 0.6)', to: 'rgba(8, 145, 178, 0.5)' }, // Cyan Glass
    { from: 'rgba(139, 92, 246, 0.4)', mid: 'rgba(167, 139, 250, 0.6)', to: 'rgba(124, 58, 237, 0.5)' }, // Violet Glass
    { from: 'rgba(16, 185, 129, 0.4)', mid: 'rgba(52, 211, 153, 0.6)', to: 'rgba(5, 150, 105, 0.5)' }, // Emerald Glass
    { from: 'rgba(244, 63, 94, 0.4)', mid: 'rgba(251, 113, 133, 0.6)', to: 'rgba(225, 29, 72, 0.5)' }, // Rose Glass
    { from: 'rgba(234, 179, 8, 0.4)', mid: 'rgba(250, 204, 21, 0.6)', to: 'rgba(202, 138, 4, 0.5)' }, // Amber Glass
    { from: 'rgba(99, 102, 241, 0.4)', mid: 'rgba(129, 140, 248, 0.6)', to: 'rgba(79, 70, 229, 0.5)' }, // Indigo Glass
];

const IndiaMap = ({ locations, activeFilter, selectedStateId, onLocationClick }: IndiaMapProps) => {
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // State-specific hover colors inspired by the reference image
    const getHoverColor = (stateId: string) => {
        const colors: Record<string, string> = {
            'rj': '#ef4444',     // Rajasthan
            'gj': '#f59e0b',     // Gujarat
            'mh': '#3b82f6',     // Maharashtra
            'up': '#10b981',     // Uttar Pradesh
            'mp': '#8b5cf6',     // Madhya Pradesh
            'ka': '#f97316',     // Karnataka
            'tn': '#ec4899',     // Tamil Nadu
            'kl': '#059669',     // Kerala
            'tg': '#8b5cf6',     // Telangana
            'ap': '#0891b2',     // Andhra Pradesh
            'or': '#d97706',     // Odisha
            'wb': '#059669',     // West Bengal
            'br': '#ca8a04',     // Bihar
            'hr': '#4f46e5',     // Haryana
            'pb': '#f59e0b',     // Punjab
            'jk': '#0ea5e9',     // Jammu & Kashmir
            'hp': '#0d9488',     // Himachal Pradesh
            'ut': '#6366f1',     // Uttarakhand
            'ct': '#b91c1c',     // Chhattisgarh
            'jh': '#15803d',     // Jharkhand
            'as': '#166534',     // Assam
        };
        return colors[stateId] || '#f59e0b';
    };

    // Helper to get the correct icon
    const getIcon = (type: string) => {
        switch (type) {
            case 'Char Dham': return <TempleIcon className="w-full h-full text-white drop-shadow-md" />;
            case 'Jyotirlinga': return <LingamIcon className="w-full h-full text-white drop-shadow-md" />;
            case 'Shakti Peeth': return <TrishulIcon className="w-full h-full text-white drop-shadow-md" />;
            case 'Kumbh Mela': return <KalashIcon className="w-full h-full text-white drop-shadow-md" />;
            default: return <div className="w-full h-full bg-white rounded-full" />;
        }
    };

    // Helper to get Pin Color
    const getPinColor = (type: string) => {
        switch (type) {
            case 'Char Dham': return '#f97316'; // Saffron
            case 'Jyotirlinga': return '#475569'; // Slate
            case 'Shakti Peeth': return '#dc2626'; // Red
            case 'Kumbh Mela': return '#eab308'; // Amber
            default: return '#f97316';
        }
    };

    const getPinScale = (size?: string) => {
        switch (size) {
            case 'large': return 'scale-110';
            case 'medium': return 'scale-90';
            case 'small': return 'scale-75';
            default: return 'scale-90';
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center transition-all duration-300 w-full overflow-visible min-h-[400px] sm:min-h-[600px] md:min-h-[800px]">

            {/* 3D Scene Wrapper - Adding Perspective */}
            <div className={`relative w-full max-w-[900px] aspect-[612/696] flex justify-center`} style={{ perspective: isMobile ? '1000px' : '2000px' }}>

                {/* Rotating Container */}
                <motion.div
                    initial={{ rotateX: 0, rotateZ: 0 }}
                    animate={{
                        rotateX: isMobile ? 15 : 28,
                        rotateZ: isMobile ? -2 : -6,
                        scale: isMobile ? 1.05 : 1,
                        y: isMobile ? 10 : 0
                    }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="relative w-full aspect-[612/696] preserve-3d mx-auto"
                >
                    {/* "INDIA" Background Text - Positioned at the top center */}
                    <div className="absolute top-[-10%] sm:top-[-15%] left-1/2 -translate-x-1/2 z-0 pointer-events-none select-none w-full text-center">
                        <span className="text-[60px] sm:text-[140px] md:text-[220px] font-black tracking-[0.1em] sm:tracking-[0.2em] text-[#fbbf24] opacity-20 sm:opacity-30 font-sans leading-none" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.1))' }}>
                            BHARAT
                        </span>
                    </div>

                    {/* Map Gradient Glow - Below everything */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-slate-300/10 rounded-[100%] blur-[100px] pointer-events-none -z-10 translate-z-[-60px]"></div>

                    {/* SVG Map Scene */}
                    <svg
                        viewBox={INDIA_MAP_VIEWBOX}
                        className="w-full h-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.12)] overflow-visible"
                    >
                        <defs>
                            {/* Inner Glow/Shadow for AO effect */}
                            <filter id="innerAO" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="1.2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="out" result="glow" />
                                <feFlood floodColor="#000" floodOpacity="0.12" result="flood" />
                                <feComposite in="flood" in2="glow" operator="in" />
                                <feMerge>
                                    <feMergeNode in="SourceGraphic" />
                                    <feMergeNode />
                                </feMerge>
                            </filter>

                            {/* State Gradients - Cleaner White Gradients */}
                            <linearGradient id="whiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#f1f5f9" />
                            </linearGradient>

                            {/* Pedestal Gradient - Monochromatic Grey */}
                            <radialGradient id="pedestalGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
                            </radialGradient>
                        </defs>

                        {/* Pedestal / Subcontinental Base */}
                        <ellipse
                            cx="306" cy="348" rx="550" ry="600"
                            fill="url(#pedestalGrad)"
                            transform="translate(0, 50)"
                            className="opacity-30"
                        />

                        {/* Monochromatic Depth Layers */}
                        {INDIA_MAP_PATHS.map((state) => (
                            <path
                                key={`depth-shadow-${state.id}`}
                                d={state.path}
                                fill="#475569"
                                fillOpacity="0.04"
                                transform="translate(0, 18)"
                            />
                        ))}

                        {/* Layer 3: Main Extrusion Edge */}
                        {INDIA_MAP_PATHS.map((state) => (
                            <path
                                key={`depth-edge-${state.id}`}
                                d={state.path}
                                fill="#94a3b8"
                                fillOpacity="0.25"
                                transform="translate(0, 10)"
                            />
                        ))}

                        {/* Layer 2: Near Edge Side Shadow */}
                        {INDIA_MAP_PATHS.map((state) => (
                            <path
                                key={`edge-near-${state.id}`}
                                d={state.path}
                                fill="#e2e8f0"
                                transform="translate(0, 5)"
                            />
                        ))}

                        {/* Layer 1: The Main Top Surface - Full White */}
                        {INDIA_MAP_PATHS.map((state) => (
                            <g key={`state-group-${state.id}`}>
                                <motion.path
                                    key={state.id}
                                    d={state.path}
                                    stroke="#cbd5e1"
                                    strokeWidth="0.6"
                                    fill={selectedStateId === state.id ? getHoverColor(state.id) : "url(#whiteGrad)"}
                                    filter="url(#innerAO)"
                                    className="transition-all duration-300 pointer-events-none"
                                    initial={false}
                                />
                            </g>
                        ))}
                    </svg>

                    {/* Pins Overlay - Positioned in the same 3D space */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none preserve-3d">
                        <AnimatePresence>
                            {locations.map((loc) => {
                                const pinColor = getPinColor(loc.type);
                                const xPercent = (loc.x / 612) * 100;
                                const yPercent = (loc.y / 696) * 100;

                                const isStateSelected = selectedStateId === loc.stateId;
                                const baseZIndex = Math.floor(yPercent) + 10 + (isStateSelected ? 100 : 0);

                                return (
                                    <motion.div
                                        key={loc.id}
                                        initial={{ scale: 0, opacity: 0, z: -20 }}
                                        animate={{
                                            scale: 1,
                                            opacity: 1,
                                            z: isStateSelected ? 30 : 0,
                                            y: isStateSelected ? -20 : 0,
                                            zIndex: baseZIndex
                                        }}
                                        exit={{ scale: 0, opacity: 0, z: 0 }}
                                        transition={{
                                            type: "spring", stiffness: 300, damping: 20,
                                            delay: loc.id * 0.002
                                        }}
                                        style={{
                                            left: `${xPercent}%`,
                                            top: `${yPercent}%`,
                                        }}
                                        className={`absolute -translate-x-1/2 -translate-y-full cursor-pointer pointer-events-auto origin-bottom ${getPinScale(loc.size)} hover:z-[2000] hover:scale-125 hover:opacity-100 transition-all duration-300`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onLocationClick?.(loc);
                                        }}
                                    >
                                        {/* Pin Structure */}
                                        <div className="relative group/pin perspective-500 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex flex-col items-center justify-end">

                                            {/* Pulsing Light Glow */}
                                            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full mix-blend-screen animate-pulse`} style={{ backgroundColor: pinColor, filter: 'blur(8px)', opacity: 0.6 }}></div>

                                            {/* Pin Shape */}
                                            <div className="absolute bottom-0 w-full h-full transition-transform duration-300 group-hover/pin:-translate-y-3">
                                                <svg viewBox="0 0 384 512" className="w-full h-full drop-shadow-xl" style={{ filter: `drop-shadow(0 4px 6px ${pinColor}44)` }}>
                                                    <path
                                                        d="M192 512c-4.4 0-8.6-2.1-11.3-5.6C163.6 484.8 0 335.4 0 192C0 85.961 85.961 0 192 0s192 85.961 192 192c0 143.4-163.6 292.8-180.7 314.4c-2.7 3.5-6.9 5.6-11.3 5.6z"
                                                        fill={pinColor}
                                                        stroke="white"
                                                        strokeWidth="20"
                                                    />
                                                </svg>

                                                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[55%] h-[55%] flex items-center justify-center text-white">
                                                    {getIcon(loc.type)}
                                                </div>

                                                <div className="absolute top-[5%] left-[20%] w-[20%] h-[12%] bg-white/50 rounded-full blur-[1px]"></div>
                                            </div>

                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* Removed Redundant Hover State Label */}
        </div>
    );
};

export default IndiaMap;
