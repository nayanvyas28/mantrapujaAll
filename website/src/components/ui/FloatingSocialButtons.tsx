"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Instagram, Facebook, MessageCircle, Plus, X, Send } from "lucide-react";

const socialLinks = [
    {
        name: "WhatsApp",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.752 8.995h-.013c-2.104 0-4.17-.567-5.975-1.637l-.428-.254-4.443 1.165 1.186-4.333-.278-.443c-1.176-1.87-1.798-4.04-1.798-6.267 0-6.441 5.244-11.685 11.688-11.685 3.12 0 6.054 1.216 8.261 3.424 2.208 2.208 3.422 5.142 3.422 8.26 0 6.443-5.242 11.685-11.685 11.685m10.222-18.784c-2.731-2.73-6.362-4.234-10.222-4.234-7.962 0-14.442 6.481-14.442 14.444 0 2.544.664 5.027 1.921 7.238l-2.043 7.462 7.639-2.004c2.143 1.168 4.558 1.786 7.014 1.786h.016c7.965 0 14.444-6.481 14.444-14.444 0-3.854-1.503-7.478-4.233-10.208" />
            </svg>
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
        href: "https://www.instagram.com/mantrapujaa/",
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
            <div className="fixed right-6 bottom-24 z-[60] flex flex-col gap-4">
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
        <div className="fixed right-6 bottom-6 z-[60] flex flex-col items-center gap-4">
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
                                <div className="relative z-10 scale-90">{social.icon}</div>
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
