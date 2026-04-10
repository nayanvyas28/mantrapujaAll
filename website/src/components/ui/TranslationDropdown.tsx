"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
    { code: "hi", label: "Hindi", native: "हिन्दी", countryCode: "in" },
    { code: "en", label: "English", native: "English", countryCode: "us" },
    { code: "mr", label: "Marathi", native: "मराठी", countryCode: "in" },
    { code: "fr", label: "French", native: "Français", countryCode: "fr" },
    { code: "de", label: "German", native: "Deutsch", countryCode: "de" },
    { code: "ru", label: "Russian", native: "Русский", countryCode: "ru" },
    { code: "gu", label: "Gujarati", native: "ગુજરાતી", countryCode: "in" },
    { code: "ta", label: "Tamil", native: "தமிழ்", countryCode: "in" },
    { code: "te", label: "Telugu", native: "తెలుగు", countryCode: "in" },
    { code: "kn", label: "Kannada", native: "ಕನ್ನಡ", countryCode: "in" },
    { code: "bn", label: "Bengali", native: "বাংলা", countryCode: "in" },
    { code: "ml", label: "Malayalam", native: "മലയാളം", countryCode: "in" },
    { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", countryCode: "in" },
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
                className="relative w-10 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors overflow-hidden"
                aria-label="Change Language"
            >
                {mounted && (
                    <img 
                        src={`https://flagcdn.com/w40/${LANGUAGES.find(l => l.code === currentLang)?.countryCode || 'us'}.png`}
                        alt="flag"
                        className="w-6 h-auto rounded-sm"
                    />
                )}
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
                                    <span className="flex items-center gap-3">
                                        <img 
                                            src={`https://flagcdn.com/w40/${lang.countryCode}.png`}
                                            alt={lang.label}
                                            className="w-5 h-auto rounded-sm border border-slate-100"
                                        />
                                        <span className="flex flex-col">
                                            <span className="leading-none">{lang.native}</span>
                                            <span className="text-[10px] text-muted-foreground opacity-70 mt-0.5">{lang.label}</span>
                                        </span>
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
