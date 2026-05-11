"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Instagram, Facebook, MessageCircle, Plus, X, Send } from "lucide-react";

const socialLinks = [
    {
        name: "WhatsApp",
        icon: (
            <img 
                src="/whatsapp-icon.png" 
                alt="WhatsApp" 
                className="w-10 h-10 object-contain pointer-events-none"
            />
        ),
        color: "bg-[#25D366]",
        href: "https://wa.me/918989271245",
        pulseColor: "rgba(37, 211, 102, 0.4)",
    },
    {
        name: "YouTube",
        icon: <Youtube className="w-6 h-6" />,
        color: "bg-[#FF0000]",
        href: "https://www.youtube.com/@MantraPujaOfficials",
        pulseColor: "rgba(255, 0, 0, 0.4)",
    },
    {
        name: "Instagram",
        icon: <Instagram className="w-6 h-6" />,
        color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
        href: "https://www.instagram.com/mantrapujaa",
        pulseColor: "rgba(238, 42, 123, 0.4)",
    },
    {
        name: "Facebook",
        icon: <Facebook className="w-6 h-6" />,
        color: "bg-[#1877F2]",
        href: "https://www.facebook.com/mantrapujaa",
        pulseColor: "rgba(24, 119, 242, 0.4)",
    },
    {
        name: "Telegram",
        icon: <Send className="w-6 h-6" />,
        color: "bg-[#0088cc]",
        href: "https://t.me/mantrapuja",
        pulseColor: "rgba(0, 136, 204, 0.4)",
    }
];

export const FloatingSocialButtons = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (!mounted) return null;

    // Desktop View: Always show all buttons
    if (!isMobile) {
        return (
            <div className="fixed right-6 bottom-48 z-[60] flex flex-col gap-4">
                {socialLinks.map((social, idx) => (
                    <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: idx * 0.1,
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        whileHover={{ scale: 1.15, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`group relative flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg ${social.color} transition-all duration-300`}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 0, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: idx * 0.2
                            }}
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: social.pulseColor }}
                        />
                        <div className="relative z-10">{social.icon}</div>
                        <span className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl border border-white/10 backdrop-blur-md">
                            {social.name}
                            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-slate-900/90" />
                        </span>
                    </motion.a>
                ))}
            </div>
        );
    }

    // Mobile View: Single toggle with dropup
    return (
        <div className="fixed right-6 bottom-40 z-[60] flex flex-col items-center gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col gap-4 mb-4"
                    >
                        {socialLinks.map((social, idx) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: (socialLinks.length - idx) * 0.1,
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                whileTap={{ scale: 0.9 }}
                                className={`group relative flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg ${social.color} transition-all duration-300`}
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.3, 0, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: idx * 0.2
                                    }}
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: social.pulseColor }}
                                />
                                <div className="relative z-10">{social.icon}</div>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative flex items-center justify-center w-14 h-14 rounded-full text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-r from-saffron to-orange-600 z-[61] border-2 border-white/20 transition-all duration-500 ${isOpen ? 'rotate-180' : ''}`}
            >
                <div className="absolute inset-0 rounded-full bg-saffron/20 blur-xl animate-pulse"></div>
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <X className="w-8 h-8" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            className="flex items-center justify-center"
                        >
                            <Plus className="w-8 h-8" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};
