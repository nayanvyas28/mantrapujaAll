"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

import { useLoading } from "@/context/LoadingContext";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { performThemeTransition } = useLoading();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-16 h-9 bg-muted rounded-full opacity-50" />;
    }

    const isDark = theme === "dark";

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => performThemeTransition(isDark ? "light" : "dark", setTheme)}
            className={`
                relative w-16 h-9 rounded-full p-1.5 transition-colors overflow-hidden
                focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:ring-offset-2 focus:ring-offset-background
                ${isDark ? "bg-slate-900 shadow-inner" : "bg-orange-100/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-orange-200/50"}
            `}
            aria-label="Toggle theme"
        >
            {/* Dynamic Sky Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Sun Glow (Light Mode) */}
                <motion.div
                    animate={{
                        opacity: isDark ? 0 : 1,
                        scale: isDark ? 0.5 : 1,
                    }}
                    className="absolute top-0 right-0 w-12 h-12 bg-yellow-200/40 blur-xl rounded-full"
                />

                {/* Stars (Dark Mode) */}
                <AnimatePresence>
                    {isDark && (
                        <>
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0.4, 1, 0.4],
                                        scale: 1,
                                    }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.5
                                    }}
                                    className="absolute rounded-full bg-white"
                                    style={{
                                        width: i === 0 ? '1.5px' : '1px',
                                        height: i === 0 ? '1.5px' : '1px',
                                        top: `${20 + (i * 25)}%`,
                                        left: `${15 + (i * 20)}%`
                                    }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Toggle Handle */}
            <motion.div
                initial={false}
                animate={{
                    x: isDark ? 28 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                }}
                className={`
                    relative w-6 h-6 rounded-full shadow-lg flex items-center justify-center z-10
                    ${isDark ? "bg-slate-800" : "bg-white"}
                `}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={theme}
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isDark ? (
                            <Moon className="h-4 w-4 text-blue-300 drop-shadow-[0_0_8px_rgba(147,197,253,0.5)]" />
                        ) : (
                            <Sun className="h-4 w-4 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            <span className="sr-only">Toggle theme</span>
        </motion.button>
    );
}
