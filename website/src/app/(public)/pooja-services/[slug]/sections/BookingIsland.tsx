"use client";

import React, { useState, useEffect } from 'react';
import { IndianRupee, MessageCircle, Phone, X, Loader2, ArrowRight, CheckCircle, Star, UserCheck, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import BookingPackagesPopup from "@/components/BookingPackagesPopup";
import FireParticles from "@/components/FireParticles";

interface BookingIslandProps {
    pujaName: string;
    pujaSlug: string;
    packages: any[];
    footerTitle?: string;
    footerDescription?: string;
    theme?: any;
    themeColor?: string;
}

export const BookingIsland = ({ 
    pujaName, 
    pujaSlug, 
    packages, 
    footerTitle, 
    footerDescription,
    theme = { 
        shadowHex: "#9a3412", 
        gradient: "from-orange-500 to-red-600", 
        rgba: "249,115,22", 
        lightHex: "#fbbf24", 
        hex: "#f97316",
        darkHex: "#ea580c"
    } 
}: BookingIslandProps) => {
    const { user } = useAuth();
    const { language } = useLanguage();
    const router = useRouter();
    
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState<'selecting' | 'naming' | 'success'>('selecting');
    const [selectedPkg, setSelectedPkg] = useState<any>(null);
    const [sankalpName, setSankalpName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Success screen config
    const config = (packages || []).find(p => p.id === '__config__') as any;
    const successTitle = config?.successTitle || 'Jai Ho! 🎉';
    const successMessage = config?.successMessage || 'Booking Confirmed Successfully';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        
        if (window.location.hash === '#packages') {
            const timer = setTimeout(() => scrollToBooking(), 500);
            return () => {
                window.removeEventListener('scroll', handleScroll);
                clearTimeout(timer);
            };
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, [user]);

    const scrollToBooking = () => {
        if (!user) {
            router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
            return;
        }
        setBookingStep('selecting');
        setIsBookingModalOpen(true);
    };

    const handlePackageSelect = (pkg: any) => {
        setSelectedPkg(pkg);
        setBookingStep('naming');
    };

    const handleBookingConfirm = async () => {
        if (!sankalpName.trim()) return;
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/puja-bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sankalp_name: sankalpName,
                    puja_name: pujaName,
                    puja_slug: pujaSlug,
                    package_name: selectedPkg.name,
                    price: selectedPkg.price,
                    user_id: user?.id
                })
            });

            if (response.ok) {
                setBookingStep('success');
            } else {
                const err = await response.json();
                alert(err.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to book. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* --- HERO ACTIONS --- */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start pt-2 md:pt-4">
                <button
                    onClick={scrollToBooking}
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

                <a href="tel:+918989271245" className="group relative flex w-full sm:w-auto items-center justify-center gap-2 md:gap-3 h-14 md:h-16 px-6 sm:px-10 font-bold text-base md:text-lg text-green-600 bg-white border-2 border-white rounded-full shadow-[0_6px_0_0_#d1d5db] hover:shadow-[0_3px_0_0_#d1d5db] hover:translate-y-[3px] active:translate-y-[6px] transition-all animate-pulse-ring">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 animate-shake-call" />
                    <span className="relative z-10 text-gray-800 text-xs md:text-base">Talk to Pandit</span>
                </a>
            </div>

            {/* --- FINAL CTA BUTTON --- */}
            {/* This is a portal-like approach, we will use this component twice or split it. 
                For now, I will include the logic to trigger the same modal from other sections. */}

            {/* --- MODALS --- */}
            <BookingPackagesPopup 
                isOpen={isBookingModalOpen && bookingStep === 'selecting'}
                onClose={() => setIsBookingModalOpen(false)}
                pujaName={pujaName}
                packages={packages || []}
                onSelect={handlePackageSelect}
                isHindi={language === 'hi'}
            />

            <AnimatePresence>
                {isBookingModalOpen && bookingStep === 'naming' && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsBookingModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[32px] border border-orange-500/20 shadow-2xl p-8 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600" />
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white font-serif">Sankalp Ritual Details</h3>
                                <button onClick={() => setIsBookingModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full"><X className="w-6 h-6 text-gray-400" /></button>
                            </div>
                            <div className="space-y-6">
                                <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-500/5 border border-orange-100">
                                    <p className="text-lg font-bold text-gray-800 dark:text-white">{selectedPkg?.name}</p>
                                    <p className="text-xl font-black text-orange-600 flex items-center"><IndianRupee size={18} /> {selectedPkg?.price}</p>
                                </div>
                                <input type="text" value={sankalpName} onChange={(e) => setSankalpName(e.target.value)} placeholder="Full Name (for Vedic chanting)" className="w-full px-6 py-4 rounded-2xl border-2 border-orange-100 dark:border-white/10 bg-gray-50 dark:bg-black/20 focus:border-orange-500 outline-none text-lg font-bold" />
                                <button onClick={handleBookingConfirm} disabled={!sankalpName.trim() || isSubmitting} className="w-full py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-lg shadow-xl shadow-orange-500/20 hover:scale-[1.02] flex items-center justify-center gap-3">
                                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Complete Booking <ArrowRight className="w-6 h-6" /></>}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {isBookingModalOpen && bookingStep === 'success' && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-emerald-950/90 backdrop-blur-xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[40px] border-4 border-emerald-500/20 shadow-2xl p-10 text-center overflow-hidden">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-emerald-500 rounded-full mx-auto flex items-center justify-center mb-8"><CheckCircle className="w-12 h-12 text-white" strokeWidth={3} /></motion.div>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white font-serif mb-4">{successTitle}</h3>
                            <p className="text-xl font-bold text-emerald-600 mb-10">{successMessage}</p>
                            <a href={`https://wa.me/918989271245?text=${encodeURIComponent(`Namaste! My booking for ${selectedPkg?.name} is confirmed for ${pujaName} (Sankalp: ${sankalpName}).`)}`} target="_blank" rel="noopener noreferrer" className="w-full py-5 rounded-2xl bg-[#25D366] text-white font-black text-lg flex items-center justify-center gap-3 shadow-xl">
                                <MessageCircle className="w-6 h-6 fill-current" /> WhatsApp Pandit Ji
                            </a>
                        </motion.div>
                    </div>
                )}

                {isScrolled && (
                    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none md:hidden">
                        <button onClick={scrollToBooking} className="pointer-events-auto bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 border-2 border-white/20">
                            <span>Book Now</span><ArrowRight className="w-5 h-5 ml-1" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
