"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useBooking } from './BookingProvider';

export const StickyBookingButton = () => {
    const { openBooking } = useBooking();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isScrolled && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none md:hidden"
                >
                    <button
                        onClick={() => openBooking()}
                        className="pointer-events-auto bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 border-2 border-white/20"
                    >
                        <span>Book Now</span>
                        <ArrowRight className="w-5 h-5 ml-1" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
