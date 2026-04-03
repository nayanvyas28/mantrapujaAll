import React from 'react';

export const TempleIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 10H8V20H16V10H20L12 2Z" fill={color} stroke="none" />
        <path d="M12 4L6 10H10V18H14V10H18L12 4Z" fill="white" fillOpacity="0.3" />
        <rect x="10" y="14" width="4" height="6" fill="#3f1a08" />
        <circle cx="12" cy="7" r="1" fill="#fbbf24" />
    </svg>
);

export const LingamIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="14" rx="8" ry="4" fill="#374151" /> {/* Base (Yoni) */}
        <path d="M8 14C8 14 8 8 12 8C16 8 16 14 16 14" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" /> {/* Lingam */}
        <path d="M8 14C8 14 8 8 12 8C16 8 16 14 16 14" stroke="black" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 10H14" stroke="#fbbf24" strokeWidth="1" /> {/* Tripundra */}
        <path d="M10 11H14" stroke="#fbbf24" strokeWidth="1" />
        <path d="M10 12H14" stroke="#fbbf24" strokeWidth="1" />
    </svg>
);

export const TrishulIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V22" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M5 8C5 8 5 14 8 16C11 18 13 18 16 16C19 14 19 8 19 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M5 8V4" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M19 8V4" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M12 16V8" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.5" fill="#ef4444" />
    </svg>
);

export const KalashIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="14" r="6" fill={color} />
        <path d="M8 8L6 4H18L16 8H8Z" fill={color} />
        <circle cx="12" cy="14" r="3" fill="white" fillOpacity="0.2" />
        <path d="M12 2V4" stroke={color} strokeWidth="2" />
        <path d="M10 4H14" stroke={color} strokeWidth="2" />
    </svg>
);
