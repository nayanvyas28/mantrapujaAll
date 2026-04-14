"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, LogIn, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DRAWER_STORAGE_KEY = "mantrapuja_web_auth_drawer_seen";

export default function StickyAuthDrawer() {
    const { user, loading } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (loading || user || pathname === '/login' || pathname === '/signup' || pathname?.startsWith('/admin')) {
            setIsVisible(false);
            return;
        }

        const checkStatus = () => {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 3000); // Reduced to 3s
            return () => clearTimeout(timer);
        };

        checkStatus();
    }, [user, loading, pathname]);

    const handleClose = () => {
        localStorage.setItem(DRAWER_STORAGE_KEY, Date.now().toString());
        setIsVisible(false);
    };

    if (!isVisible || user) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 right-6 z-[9999] w-full max-w-sm px-4 sm:px-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-saffron/20 dark:border-saffron/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 sm:p-8"
                    >
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        
                        <button 
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-saffron/10 rounded-2xl border border-saffron/20">
                                    <Sparkles className="w-5 h-5 text-saffron" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black tracking-tight">Vedic Wisdom Awaits</h4>
                                    <p className="text-xs text-muted-foreground font-medium">Unlock your personalized sacred space</p>
                                </div>
                            </div>

                            <div className="space-y-3 py-2">
                                <div className="flex items-baseline gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-saffron" />
                                    <span className="text-xs font-semibold opacity-70">Sync rituals across mobile & web</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-saffron" />
                                    <span className="text-xs font-semibold opacity-70">Manage your Sacred Wallet & Coins</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-saffron" />
                                    <span className="text-xs font-semibold opacity-70">Track your Puja history & bookings</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-2">
                                <Link 
                                    href="/login"
                                    onClick={handleClose}
                                    className="flex items-center justify-center gap-2 w-full h-12 bg-saffron hover:bg-saffron/90 text-white font-black rounded-2xl transition-all shadow-lg shadow-saffron/20 active:scale-[0.98]"
                                >
                                    <LogIn size={18} />
                                    SIGN IN NOW
                                </Link>
                                <button 
                                    onClick={handleClose}
                                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors text-center"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
