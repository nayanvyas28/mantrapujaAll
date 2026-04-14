"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ThemeTransitionOverlay } from "@/components/ui/ThemeTransitionOverlay";
import { LoadingProvider, useLoading } from "@/context/LoadingContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisualEditorOverlay from "@/components/admin/VisualEditorOverlay";
import PromoPopup from "@/components/PromoPopup";
import StickyAuthDrawer from "@/components/StickyAuthDrawer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <LoadingProvider>
                <LayoutContent>{children}</LayoutContent>
            </LoadingProvider>
        </Suspense>
    );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);
    const { isLoading } = useLoading();

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);

        // Mandatory Onboarding Check
        const checkOnboarding = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('user_profiles')
                    .select('onboarding_completed')
                    .eq('id', user.id)
                    .single();

                const isAuthPage = pathname === '/onboarding' || pathname === '/login' || pathname === '/signup' || pathname?.startsWith('/admin');

                if (profile && !profile.onboarding_completed && !isAuthPage) {
                    router.push('/onboarding');
                }
            }
        };

        if (isMounted) {
            checkOnboarding();
        }
    }, [isMounted, pathname, router]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Show loader for initial hydration OR global loading states
    const showLoader = !isMounted || isLoading;

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

            {!pathname?.startsWith('/kundli') && <Header />}
            <main className={`flex-1 ${pathname?.startsWith('/kundli') ? 'bg-black' : ''}`} id="website-content-root">
                {children}
            </main>
            {!pathname?.startsWith('/kundli') && <Footer />}
        </>
    );
}
