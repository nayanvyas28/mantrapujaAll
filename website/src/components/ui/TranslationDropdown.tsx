"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
    { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
    { code: "en", label: "English", native: "English", flag: "🇺🇸" },
    { code: "mr", label: "Marathi", native: "मराठी", flag: "🇮🇳" },
    { code: "fr", label: "French", native: "Français", flag: "🇫🇷" },
    { code: "de", label: "German", native: "Deutsch", flag: "🇩🇪" },
    { code: "ru", label: "Russian", native: "Русский", flag: "🇷🇺" },
    { code: "gu", label: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳" },
    { code: "ta", label: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
    { code: "te", label: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
    { code: "kn", label: "Kannada", native: "ಕನ್ನಡ", flag: "🇮🇳" },
    { code: "bn", label: "Bengali", native: "বাংলা", flag: "🇮🇳" },
    { code: "ml", label: "Malayalam", native: "മലയാളം", flag: "🇮🇳" },
    { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
];

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: () => void;
    }
}

export function TranslationDropdown() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentLang, setCurrentLang] = React.useState("en");
    const [mounted, setMounted] = React.useState(false);

    // Initialize Google Translate
    React.useEffect(() => {
        setMounted(true);

        const googleTranslateScriptId = "google-translate-script";

        if (!document.getElementById(googleTranslateScriptId)) {
            const script = document.createElement("script");
            script.id = googleTranslateScriptId;
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);

            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: LANGUAGES.map(l => l.code).join(","),
                        autoDisplay: false,
                    },
                    "google_translate_element"
                );
            };
        }

        // Check for existing cookie to set initial state
        const getCookie = (name: string) => {
            const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
            return v ? v[2] : null;
        };

        const googTrans = getCookie("googtrans");
        if (googTrans) {
            // Format is usually /en/hi
            const lang = googTrans.split("/")[2];
            if (lang) setCurrentLang(lang);
        }
    }, []);

    const changeLanguage = (langCode: string) => {
        setCurrentLang(langCode);
        setIsOpen(false);

        const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (combo) {
            combo.value = langCode;
            combo.dispatchEvent(new Event("change"));
        } else {
            // Fallback if the combo isn't ready yet (rare)
            console.warn("Google Translate combo not found");
        }
    };

    if (!mounted) return null;

    return (
        <div className="relative z-50">
            {/* Hidden Google Translate Element */}
            <div id="google_translate_element" className="fixed bottom-0 right-0 pointer-events-none opacity-0" />

            {/* Custom Dropdown Trigger */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className="relative w-10 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                aria-label="Change Language"
            >
                <span>{LANGUAGES.find(l => l.code === currentLang)?.flag || "🌐"}</span>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden py-2"
                    >
                        <div className="max-h-60 overflow-y-auto no-scrollbar">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-sm transition-colors ${currentLang === lang.code
                                        ? "bg-saffron/10 text-saffron font-medium"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    <span className="flex flex-col">
                                        <span className="leading-none">{lang.native}</span>
                                        <span className="text-[10px] text-muted-foreground opacity-70 mt-0.5">{lang.label}</span>
                                    </span>
                                    {currentLang === lang.code && <Check className="w-3.5 h-3.5" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
