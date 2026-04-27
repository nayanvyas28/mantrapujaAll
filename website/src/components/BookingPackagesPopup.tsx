"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, IndianRupee, ArrowRight, ShieldCheck, Sun, Heart, Info, Circle, Star } from "lucide-react";

interface Package {
    id: string;
    name: string;
    price: number;
    description?: string;
    inclusions?: string[];
    image?: string;
    tag?: string;
}

interface BookingPackagesPopupProps {
    isOpen: boolean;
    onClose: () => void;
    pujaName: string;
    packages: Package[];
    onSelect: (pkg: Package) => void;
    isHindi?: boolean;
}

// Dynamic Inclusions Mapping
const getInclusions = (id: string, name: string) => {
    const lowerName = name.toLowerCase();
    
    if (id === 'special' || lowerName.includes('special') || lowerName.includes('offer')) {
        return [
            "Special Sankalp with your Name and Gotra inclusion.",
            "Group participation ritual along with other devotees.",
            "High-definition video recording shared on WhatsApp.",
            "Digital Aashirwad and blessings from the sacred ritual."
        ];
    }
    
    if (id === 'individual' || lowerName.includes('individual')) {
        return [
            "Dedicated Panditji for your personalized Sankalp ritual.",
            "Exclusive participation with focused divine attention.",
            "Live interaction and guidance from Panditji via call.",
            "Blessed Prasad and Tirth delivered directly to your home."
        ];
    }
    
    if (id === 'couple' || lowerName.includes('couple') || lowerName.includes('partner')) {
        return [
            "Dual Sankalp for harmony, love, and marital prosperity.",
            "Personalized rituals involving both partners with Vedic chants.",
            "Extended consultation with Panditji regarding the ritual.",
            "Premium Aashirwad Hamper with sacred souvenirs and Prasad."
        ];
    }
    
    if (id === 'family' || lowerName.includes('family')) {
        return [
            "Shanthi Puja rituals for protection of all family members.",
            "Multi-generational Sankalp for lineage and household peace.",
            "VIP scheduling and dedicated support throughout the ritual.",
            "Deluxe Gift Box with Vastram, Tirth, and Sacred Prasad."
        ];
    }

    // Default Fallback
    return [
        "Traditional Vedic ritual performed by certified Pandits.",
        "Sankalp in your name with authentic mantra chanting.",
        "Detailed video and photographic proof of the ritual.",
        "Sacred Prasad and Aashirwad sent to your location."
    ];
};

export default function BookingPackagesPopup({
    isOpen,
    onClose,
    pujaName,
    packages,
    onSelect
}: BookingPackagesPopupProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    if (!isOpen) return null;

    const defaultPackages: Package[] = [
        { id: 'special', name: '₹1 Special Offer Package (Online)', price: 1, description: 'Exclusive online ritual for limited time.', image: '/packages/special_offer_puja_1776300974472.png', tag: 'Limited' },
        { id: 'individual', name: 'Individual Package (Offline)', price: 1100, description: 'Personal offline ritual at sacred location.', image: '/packages/individual_puja_pandit_1776300989004.png', tag: 'Popular' },
        { id: 'couple', name: 'Couple Package (Offline)', price: 2100, description: 'Offline ritual for couples at sacred location.', image: '/packages/couple_puja_temple_1776301004592.png', tag: 'Recommended' },
        { id: 'family', name: 'Family Package (Offline)', price: 5100, description: 'Offline ritual for families at sacred location.', image: '/packages/family_puja_gathering_1776301019356.png', tag: 'Best Value' },
    ];

    // Extract config if present in packages
    const configItem = (packages || []).find(p => p.id === '__config__') as any;
    const settings = {
        title: configItem?.title || 'Divine Package Selection',
        subtitle: (configItem?.subtitle || '{pujaName} • Authentic Vedic Rituals').replace('{pujaName}', pujaName),
        selectionHeading: configItem?.selectionHeading || 'Select Your Sacred Package'
    };

    const actualPackages = (packages || []).filter(p => p.id !== '__config__');

    const displayPackages = (actualPackages && actualPackages.length > 0 ? actualPackages : defaultPackages).map((p, i) => {
        const inclusions = isHindi ? ((p as any).inclusions_hi || (p as any).inclusions || getInclusions(p.id, p.name)) : ((p as any).inclusions || getInclusions(p.id, p.name));
        return {
            ...p,
            image: (p as any).image || defaultPackages[i % 4].image,
            tag: (p as any).tag || defaultPackages[i % 4].tag,
            inclusions: inclusions
        };
    });

    // Default selection
    if (!selectedId && displayPackages.length > 0) {
        setSelectedId(displayPackages[0].id);
    }

    const selectedPkg = displayPackages.find(p => p.id === selectedId) || displayPackages[0];
    const currentInclusions = selectedPkg.inclusions;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 dark:bg-[#050505]/95 backdrop-blur-xl"
                />

                {/* Animated Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-saffron/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                    className="relative w-full max-w-4xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 sm:rounded-[48px] shadow-2xl overflow-hidden flex flex-col max-h-[98vh] backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/5"
                >
                    {/* Header */}
                    <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                        <div className="flex flex-col gap-1">
                             <div className="flex items-center gap-3">
                                <Sun className="w-5 h-5 text-saffron" />
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
                                    {settings.title}
                                </h3>
                             </div>
                             <p className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-500 dark:text-gray-500">
                                {settings.subtitle}
                             </p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-2xl transition-all border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 active:scale-90"
                        >
                            <X className="w-6 h-6 text-slate-600 dark:text-white" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar pt-6 pb-48">
                        {/* Dynamic Inclusions Section */}
                        <div className="px-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-10">
                            {currentInclusions.map((item, idx) => (
                                <motion.div 
                                    key={idx + selectedPkg.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="w-6 h-6 rounded-full bg-saffron/10 border border-saffron/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors group-hover:bg-saffron/20">
                                        <CheckCircle2 className="w-4 h-4 text-saffron" />
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-gray-400 font-bold leading-relaxed transition-colors group-hover:text-slate-900 dark:group-hover:text-gray-200">
                                        {item}
                                    </p>
                                </motion.div>
                            ))}
                        </div>


                        {/* Tier Selection */}
                        <div className="px-8">
                            <h4 className="text-xl font-black mb-8 text-slate-900 dark:text-white font-serif flex items-center gap-3">
                                <div className="h-px w-8 bg-saffron/40"></div>
                                {settings.selectionHeading}
                                <div className="h-px w-8 bg-saffron/40"></div>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {displayPackages.map((pkg) => {
                                    const isSelected = selectedId === pkg.id;

                                    return (
                                        <motion.div 
                                            key={pkg.id}
                                            onClick={() => setSelectedId(pkg.id)}
                                            whileHover={{ y: -5 }}
                                            className="group relative cursor-pointer"
                                        >
                                            {/* Glow effect on selected */}
                                            {isSelected && (
                                                <div className="absolute -inset-4 bg-saffron/20 blur-3xl rounded-[40px] animate-pulse"></div>
                                            )}

                                            <div className={`relative h-full p-5 rounded-[32px] border-2 transition-all duration-500 flex flex-col overflow-hidden backdrop-blur-md ${isSelected 
                                                ? 'bg-saffron/5 border-saffron shadow-2xl shadow-saffron/10' 
                                                : 'bg-slate-50/50 dark:bg-white/[0.02] border-slate-100 dark:border-white/10 hover:border-slate-200 dark:hover:border-white/20'}`}
                                            >
                                                {/* Snake Border SVG (Only if selected) */}
                                                {isSelected && (
                                                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                                                        <rect
                                                            x="1.5"
                                                            y="1.5"
                                                            width="calc(100% - 3px)"
                                                            height="calc(100% - 3px)"
                                                            rx="30"
                                                            ry="30"
                                                            fill="none"
                                                            stroke="#f97316"
                                                            strokeWidth="3"
                                                            strokeDasharray="15 5"
                                                            className="animate-snake-border"
                                                        />
                                                    </svg>
                                                )}

                                                <div className="relative z-10 flex flex-col h-full">
                                                    {/* Top Section */}
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${isSelected ? 'bg-saffron text-white shadow-lg' : 'bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-gray-500'}`}>
                                                            {pkg.tag}
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-saffron border-saffron' : 'border-slate-300 dark:border-white/20'}`}>
                                                            {isSelected ? <div className="w-1.5 h-1.5 bg-white rounded-full" /> : <Circle className="w-3.2 h-3.2 text-transparent" />}
                                                        </div>
                                                    </div>

                                                    {/* Title */}
                                                    <h5 className={`text-sm font-black mb-4 h-10 line-clamp-2 transition-colors ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400'}`}>
                                                        {pkg.name}
                                                    </h5>

                                                    {/* Divine Image */}
                                                    <div className={`mb-5 relative aspect-square rounded-2xl overflow-hidden ring-1 shadow-inner transition-all duration-500 ${isSelected ? 'ring-saffron/40' : 'ring-slate-200 dark:ring-white/10 opacity-80 group-hover:opacity-100'}`}>
                                                        <img 
                                                            src={pkg.image} 
                                                            alt={pkg.name}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40 dark:opacity-80"></div>
                                                    </div>

                                                    {/* Price Bottom */}
                                                    <div className="mt-auto">
                                                        <div className={`text-xl font-black flex items-center transition-all ${isSelected ? 'text-saffron scale-110 origin-left' : 'text-slate-600 dark:text-gray-300'}`}>
                                                            <IndianRupee className="w-4 h-4 mr-0.5" strokeWidth={3} />
                                                            {pkg.price}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Note Section */}
                        <div className="mx-8 p-5 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 flex items-start gap-4 mt-8 mb-4 group hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all">
                            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-500">
                                <Info size={18} />
                            </div>
                            <p className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest leading-loose">
                                Additional offerings like <span className="text-emerald-600 dark:text-emerald-400">Vastra Daan</span>, <span className="text-emerald-600 dark:text-emerald-400">Anna Daan</span>, or <span className="text-emerald-600 dark:text-emerald-400">Gau Seva</span> can be added during Checkout.
                            </p>
                        </div>
                        
                        {/* Spacer for scroll clarity */}
                        <div className="h-10"></div>
                    </div>

                    {/* Footer - Cosmetic Action Bar */}
                    <div className="absolute bottom-0 inset-x-0 p-8 pt-4 bg-white/95 dark:bg-black/90 backdrop-blur-3xl border-t border-slate-100 dark:border-white/5 flex flex-col gap-6 z-20">
                        {/* Trust Micro-Badges */}
                        <div className="flex justify-center items-center gap-10">
                             <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] group">
                                <ShieldCheck size={16} className="text-emerald-500 transition-transform group-hover:scale-110" />
                                SECURE BOOKING
                             </div>
                             <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] group">
                                <Star size={16} className="text-saffron transition-transform group-hover:scale-110" />
                                CERTIFIED PANDITS
                             </div>
                             <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] group">
                                <Heart size={16} className="text-rose-500 transition-transform group-hover:scale-110" />
                                DIVINE BLESSINGS
                             </div>
                        </div>

                        {/* Grand Proceed Button */}
                        <div className="relative group/btn">
                             {/* Pulsing button glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-[2.5rem] blur opacity-40 group-hover/btn:opacity-75 transition-opacity duration-500"></div>
                            
                            <button 
                                onClick={() => onSelect(selectedPkg)}
                                disabled={!selectedId}
                                className="relative w-full h-20 rounded-[2.5rem] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-2xl shadow-emerald-900/40 transition-all active:scale-[0.98] flex items-center justify-between px-10 border border-emerald-400/20 dark:border-white/10"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1 text-2xl font-black tracking-tighter">
                                        <IndianRupee className="w-6 h-6" strokeWidth={3} />
                                        {selectedPkg.price}
                                    </div>
                                    <div className="text-[9px] uppercase font-black tracking-[0.2em] opacity-60">
                                        {selectedPkg.name}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 font-black uppercase tracking-[0.3em] text-sm">
                                    Proceed to Ritual
                                    <ArrowRight className="w-7 h-7 group-hover/btn:translate-x-2 transition-transform" strokeWidth={3} />
                                </div>
                            </button>
                        </div>
                    </div>
                </motion.div>
                
                {/* Style adjustments for snake border */}
            
                <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes snake-border {
                        0% { stroke-dashoffset: 1000; }
                        100% { stroke-dashoffset: 0; }
                    }
                    .animate-snake-border {
                        animation: snake-border 20s linear infinite;
                    }
                ` }} />
            </div>
        </AnimatePresence>
    );
}
