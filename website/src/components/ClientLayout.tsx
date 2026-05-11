"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ThemeTransitionOverlay } from "@/components/ui/ThemeTransitionOverlay";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisualEditorOverlay from "@/components/admin/VisualEditorOverlay";
import PromoPopup from "@/components/PromoPopup";
import GuruAIChat from "@/components/GuruAIChat";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <LayoutContent>{children}</LayoutContent>
        </LoadingProvider>
    );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);
    const { isLoading } = useLoading();
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Only show global loader if we are actually loading new data, 
    // NOT just because the component is mounting. This prevents SSR blocking.
    const showLoader = isLoading;

    return (
        <>
            <ThemeTransitionOverlay />
            
            <AnimatePresence mode="wait">
                {showLoader && (
                    <motion.div
                        key="global-loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999]"
                    >
                        <LoadingScreen />
                    </motion.div>
                )}
            </AnimatePresence>

            <Suspense fallback={null}>
                <VisualEditorOverlay />
            </Suspense>

            <PromoPopup />
            <GuruAIChat />

            {!pathname?.startsWith('/kundli') && <Header />}
            <main className={`flex-1 ${pathname?.startsWith('/kundli') ? 'bg-black' : ''}`} id="website-content-root">
                {children}
            </main>
            {!pathname?.startsWith('/kundli') && <Footer />}
        </>
    );
}
