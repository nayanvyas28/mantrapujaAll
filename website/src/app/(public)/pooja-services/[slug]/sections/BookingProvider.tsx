"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import BookingPackagesPopup from "@/components/BookingPackagesPopup";
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, MessageCircle, X, Loader2, ArrowRight, CheckCircle } from 'lucide-react';

interface BookingContextType {
    openBooking: (pkg?: any) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) throw new Error("useBooking must be used within a BookingProvider");
    return context;
}

export const BookingProvider = ({ children, puja }: { children: React.ReactNode, puja: any }) => {
    const { user } = useAuth();
    const { language } = useLanguage();
    const router = useRouter();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState<'selecting' | 'naming' | 'success'>('selecting');
    const [selectedPkg, setSelectedPkg] = useState<any>(null);
    const [sankalpName, setSankalpName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const config = (puja.packages || []).find((p: any) => p.id === '__config__') as any;
    const successTitle = config?.successTitle || 'Jai Ho! 🎉';
    const successMessage = config?.successMessage || 'Booking Confirmed Successfully';

    const openBooking = (pkg?: any) => {
        if (!user) {
            router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
            return;
        }
        if (pkg) {
            setSelectedPkg(pkg);
            setStep('naming');
        } else {
            setStep('selecting');
        }
        setIsModalOpen(true);
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
                    puja_name: puja.name,
                    puja_slug: puja.slug,
                    package_name: selectedPkg.name,
                    price: selectedPkg.price,
                    user_id: user?.id
                })
            });
            if (response.ok) setStep('success');
            else alert('Something went wrong');
        } catch (error) {
            alert('Failed to book');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <BookingContext.Provider value={{ openBooking }}>
            {children}

            <BookingPackagesPopup 
                isOpen={isModalOpen && step === 'selecting'}
                onClose={() => setIsModalOpen(false)}
                pujaName={puja.name}
                packages={puja.packages || []}
                onSelect={(pkg) => { setSelectedPkg(pkg); setStep('naming'); }}
                isHindi={language === 'hi'}
            />

            <AnimatePresence>
                {isModalOpen && step === 'naming' && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[32px] border border-orange-500/20 shadow-2xl p-8 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600" />
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white font-serif">Sankalp Ritual Details</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full"><X className="w-6 h-6 text-gray-400" /></button>
                            </div>
                            <div className="space-y-6">
                                <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-500/5 border border-orange-100">
                                    <p className="text-lg font-bold">{selectedPkg?.name}</p>
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

                {isModalOpen && step === 'success' && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-emerald-950/90 backdrop-blur-xl" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[40px] border-4 border-emerald-500/20 shadow-2xl p-10 text-center overflow-hidden">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-emerald-500 rounded-full mx-auto flex items-center justify-center mb-8"><CheckCircle className="w-12 h-12 text-white" strokeWidth={3} /></motion.div>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white font-serif mb-4">{successTitle}</h3>
                            <p className="text-xl font-bold text-emerald-600 mb-10">{successMessage}</p>
                            <a href={`https://wa.me/918989271245?text=${encodeURIComponent(`Namaste! My booking for ${selectedPkg?.name} is confirmed for ${puja.name} (Sankalp: ${sankalpName}).`)}`} target="_blank" rel="noopener noreferrer" className="w-full py-5 rounded-2xl bg-[#25D366] text-white font-black text-lg flex items-center justify-center gap-3 shadow-xl">
                                <MessageCircle className="w-6 h-6 fill-current" /> WhatsApp Pandit Ji
                            </a>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </BookingContext.Provider>
    );
};
