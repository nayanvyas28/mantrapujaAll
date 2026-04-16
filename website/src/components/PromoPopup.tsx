"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { usePathname } from "next/navigation";

const POPUP_STORAGE_KEY = "mantrapuja_web_popup_seen_";
const POPUP_LAST_SEEN_KEY = "mantrapuja_web_popup_last_seen_";

interface PopupData {
    id: string;
    name: string;
    image_web: string;
    redirect_type: "internal" | "external" | "none";
    redirect_value: string;
    frequency: "once" | "session" | "always";
    recurrence_interval_mins: number;
    show_text_overlay?: boolean;
    display_delay_ms?: number;
}

export default function PromoPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [popup, setPopup] = useState<PopupData | null>(null);
    const pathname = usePathname();

    const fetchActivePopup = useCallback(async () => {
        // Skip on admin pages
        if (pathname?.startsWith('/admin')) return;

        try {
            const now = new Date().toISOString();
            console.log("[PromoPopup] Fetching for time:", now);

            let data: any = null;
            let error: any = null;

            // Fetch active popups for web that are within the schedule
            const firstResult = await supabase
                .from("marketing_popups")
                .select("id, name, image_web, redirect_type, redirect_value, display_delay_ms, frequency, start_date, end_date, show_text_overlay, recurrence_interval_mins")
                .eq("is_active", true)
                .eq("show_on_web", true)
                .lte("start_date", now)
                .or(`end_date.is.null,end_date.gte.${now}`)
                .order("created_at", { ascending: false })
                .limit(1)
                .single();
            
            data = firstResult.data;
            error = firstResult.error;

            // Fallback if column doesn't exist yet
            if (error && error.code === '42703') {
                console.warn("[PromoPopup] show_text_overlay column missing, falling back...");
                const result = await supabase
                    .from("marketing_popups")
                    .select("id, name, image_web, redirect_type, redirect_value, display_delay_ms, frequency, start_date, end_date, recurrence_interval_mins")
                    .eq("is_active", true)
                    .eq("show_on_web", true)
                    .lte("start_date", now)
                    .or(`end_date.is.null,end_date.gte.${now}`)
                    .order("created_at", { ascending: false })
                    .limit(1)
                    .single();
                data = result.data;
                error = result.error;
                if (data) (data as any).show_text_overlay = true;
            }

            if (error) {
                if (error.code !== 'PGRST116') { // PGRST116 is "No rows found"
                    console.error("[PromoPopup] Supabase error:", error);
                } else {
                    console.log("[PromoPopup] No active campaigns found for this time.");
                }
                return;
            }

            if (!data || !data.image_web) {
                console.log("[PromoPopup] Campaign found but missing web image:", data?.name);
                return;
            }

            console.log("[PromoPopup] Candidate found:", data.name);

            // Check frequency
            const storageKey = `${POPUP_STORAGE_KEY}${data.id}`;
            const seenData = localStorage.getItem(storageKey);
            const sessionSeen = sessionStorage.getItem(storageKey);

            if (data.frequency === "once" && seenData) {
                console.log("[PromoPopup] Skipping: Frequency 'once' and already seen.");
                return;
            }
            if (data.frequency === "session" && sessionSeen) {
                console.log("[PromoPopup] Skipping: Frequency 'session' and already seen.");
                return;
            }

            // Check Recurrence Interval (New Feature)
            if (data.recurrence_interval_mins && data.recurrence_interval_mins > 0) {
                const lastSeenKey = `${POPUP_LAST_SEEN_KEY}${data.id}`;
                const lastSeen = localStorage.getItem(lastSeenKey);
                
                if (lastSeen) {
                    const lastSeenTime = parseInt(lastSeen);
                    const nowTime = Date.now();
                    const diffMins = (nowTime - lastSeenTime) / (1000 * 60);

                    if (diffMins < data.recurrence_interval_mins) {
                        console.log(`[PromoPopup] Skipping: Recurrence interval of ${data.recurrence_interval_mins}m not yet met. (Mins since last seen: ${diffMins.toFixed(1)})`);
                        return;
                    }
                }
            }

            setPopup(data as PopupData);

            // Display after delay
            const delay = data.display_delay_ms || 2000;
            console.log(`[PromoPopup] Scheduling display in ${delay}ms`);
            
            setTimeout(() => {
                setIsVisible(true);
                console.log("[PromoPopup] Modal visible now");
            }, delay);

        } catch (err) {
            console.error("[PromoPopup] Critical error:", err);
        }
    }, [pathname]);

    useEffect(() => {
        fetchActivePopup();
    }, [fetchActivePopup]);

    const handleClose = () => {
        if (popup) {
            const storageKey = `${POPUP_STORAGE_KEY}${popup.id}`;
            const lastSeenKey = `${POPUP_LAST_SEEN_KEY}${popup.id}`;
            localStorage.setItem(storageKey, "true");
            localStorage.setItem(lastSeenKey, Date.now().toString());
            sessionStorage.setItem(storageKey, "true");
        }
        setIsVisible(false);
    };

    if (!isVisible || !popup) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20"
                    >
                        {/* Close Button - Enhanced visibility */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-[100] bg-black/40 hover:bg-black/80 backdrop-blur-lg text-white p-2.5 rounded-full transition-all hover:scale-110 active:scale-90 border border-white/20 group/close"
                        >
                            <X size={20} className="transition-transform group-hover/close:rotate-90" />
                        </button>

                        <div className="relative aspect-video group cursor-pointer" onClick={() => {
                            if (popup.redirect_type === 'external' && popup.redirect_value) {
                                window.open(popup.redirect_value, '_blank');
                            }
                        }}>
                            {popup.redirect_type === 'internal' && popup.redirect_value ? (
                                <Link 
                                    href={popup.redirect_value.startsWith('puja:') ? `/pujas/${popup.redirect_value.replace('puja:', '')}` : popup.redirect_value}
                                    onClick={handleClose}
                                >
                                    <img 
                                        src={popup.image_web} 
                                        alt={popup.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </Link>
                            ) : (
                                <img 
                                    src={popup.image_web} 
                                    alt={popup.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}

                            {/* Banner Text Overlay - Respecting show_text_overlay toggle */}
                            {popup.show_text_overlay && popup.redirect_type !== 'none' && (
                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-white text-2xl font-bold">{popup.name}</h3>
                                        <div className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-orange-500/30 group-hover:bg-orange-600 transition-all pointer-events-auto">
                                            {popup.redirect_type === 'external' ? 'Learn More' : 'Book Now'}
                                            {popup.redirect_type === 'external' ? <ExternalLink size={18} /> : <ChevronRight size={20} />}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
