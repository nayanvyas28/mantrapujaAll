"use client";

import React, { createContext, useContext, useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isThemeTransitioning: boolean;
    performThemeTransition: (newTheme: string, setTheme: (t: string) => void) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// 🔍 Sub-component to handle search params without blocking the provider's SSR
function SearchParamsWatcher({ onChange }: { onChange: () => void }) {
    const searchParams = useSearchParams();
    useEffect(() => {
        onChange();
    }, [searchParams, onChange]);
    return null;
}

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
    const pathname = usePathname();

    const triggerLoading = () => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    };

    // Trigger loader on pathname changes
    useEffect(() => {
        return triggerLoading();
    }, [pathname]);

    const performThemeTransition = (newTheme: string, setTheme: (t: string) => void) => {
        setIsThemeTransitioning(true);
        setTimeout(() => {
            setTheme(newTheme);
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }, 600);
        setTimeout(() => {
            setIsThemeTransitioning(false);
        }, 1200);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, isThemeTransitioning, performThemeTransition }}>
            <Suspense fallback={null}>
                <SearchParamsWatcher onChange={triggerLoading} />
            </Suspense>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
