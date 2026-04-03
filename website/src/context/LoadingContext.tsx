"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isThemeTransitioning: boolean;
    performThemeTransition: (newTheme: string, setTheme: (t: string) => void) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Trigger loader on route changes
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Shorter transition for route changes

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    const performThemeTransition = (newTheme: string, setTheme: (t: string) => void) => {
        setIsThemeTransitioning(true);

        // Wait for the animation to reach its peak before switching the theme
        setTimeout(() => {
            setTheme(newTheme);
            // Manual class update for immediate feedback
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }, 600); // Peak of the arc

        // Cleanup the transition state after full animation
        setTimeout(() => {
            setIsThemeTransitioning(false);
        }, 1200);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, isThemeTransitioning, performThemeTransition }}>
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
