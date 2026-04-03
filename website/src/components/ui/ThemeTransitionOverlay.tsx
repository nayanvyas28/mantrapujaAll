"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Star } from "lucide-react";
import { useLoading } from "@/context/LoadingContext";

export function ThemeTransitionOverlay() {
    const { theme } = useTheme();
    const { isThemeTransitioning } = useLoading();

    const isDark = theme === "dark";

    return (
        <AnimatePresence>
            {isThemeTransitioning && (
                <motion.div
                    key="theme-transition-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden"
                >
                    {/* Background Wash - Radial Gradient */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`absolute inset-0 ${isDark
                                ? "bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.8)_0%,transparent_70%)]"
                                : "bg-[radial-gradient(circle_at_center,rgba(255,247,237,0.8)_0%,transparent_70%)]"
                            }`}
                    />

                    {/* Stars - Only for Dark Mode transition */}
                    {isDark && (
                        <div className="absolute inset-0">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1, 0.5],
                                        y: [0, -20, 0]
                                    }}
                                    transition={{
                                        duration: 1 + Math.random(),
                                        repeat: Infinity,
                                        delay: Math.random() * 0.5
                                    }}
                                    className="absolute"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`
                                    }}
                                >
                                    <Star className="w-1 h-1 md:w-2 md:h-2 text-white fill-white" />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Celestial Body Arc - More refined parabolic path */}
                    <motion.div
                        initial={{
                            x: "-80vw",
                            y: "60vh",
                            rotate: -90,
                            scale: 0.5
                        }}
                        animate={{
                            x: ["-80vw", "0vw", "80vw"],
                            y: ["60vh", "0vh", "-60vh"],
                            rotate: [-90, 0, 90],
                            scale: [0.5, 1.5, 0.5]
                        }}
                        transition={{
                            duration: 1.2,
                            times: [0, 0.5, 1],
                            ease: "easeInOut"
                        }}
                        className="relative flex items-center justify-center"
                    >
                        {isDark ? (
                            <div className="relative group">
                                <Moon className="w-24 h-24 md:w-48 md:h-48 text-blue-100 drop-shadow-[0_0_40px_rgba(191,219,254,0.6)]" />
                                <motion.div
                                    animate={{
                                        boxShadow: ["0 0 20px rgba(147,197,253,0.3)", "0 0 60px rgba(147,197,253,0.6)", "0 0 20px rgba(147,197,253,0.3)"]
                                    }}
                                    transition={{ duration: 1.2, repeat: Infinity }}
                                    className="absolute inset-0 rounded-full"
                                />
                            </div>
                        ) : (
                            <div className="relative group">
                                <Sun className="w-24 h-24 md:w-48 md:h-48 text-orange-400 drop-shadow-[0_0_60px_rgba(251,146,60,0.8)]" />
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="absolute -inset-4 border-2 border-dashed border-orange-300/40 rounded-full"
                                />
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

