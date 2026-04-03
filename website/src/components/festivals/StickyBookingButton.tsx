"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, Phone, User, Check } from 'lucide-react';

export const StickyBookingButton = ({ festivalName }: { festivalName: string }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        // Simulate API call
        setTimeout(() => {
            setFormState('success');
            setTimeout(() => {
                setIsModalOpen(false);
                setFormState('idle');
            }, 2000);
        }, 1500);
    };

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-10 right-10 z-50"
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full shadow-[0_15px_50px_-10px_rgba(249,115,22,0.6)] hover:shadow-[0_25px_60px_-10px_rgba(249,115,22,0.7)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-white/20 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity"></div>

                            <Calendar className="w-10 h-10 animate-pulse" />
                            <div className="text-left hidden sm:block">
                                <span className="block text-xs font-bold uppercase tracking-widest opacity-90">Book Now</span>
                                <span className="block text-lg font-bold leading-tight">Festival Puja</span>
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Booking Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        ></motion.div>

                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="relative w-full max-w-md bg-card border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 md:p-8"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {formState === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                                        <Check className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold font-serif">Request Sent!</h3>
                                    <p className="text-muted-foreground">
                                        Our Pandit ji will contact you shortly to discuss the {festivalName} puja details.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold font-serif mb-2">Book {festivalName} Puja</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Fill details to request a callback from our expert Pandits.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium pl-1">Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Your Full Name"
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium pl-1">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="+91 98765 43210"
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-saffron focus:ring-1 focus:ring-saffron outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formState === 'submitting'}
                                            className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold tracking-wide shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {formState === 'submitting' ? (
                                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            ) : (
                                                <>
                                                    Request Callback <Calendar className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
