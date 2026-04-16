"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageCode = string;

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<LanguageCode>('en');

    useEffect(() => {
        // Initialize from cookie if exists (for Google Translate compatibility)
        const getCookie = (name: string) => {
            if (typeof document === 'undefined') return null;
            const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
            return v ? v[2] : null;
        };

        const googTrans = getCookie('googtrans');
        if (googTrans) {
            const lang = googTrans.split('/')[2];
            if (lang) {
                setLanguageState(lang);
            }
        } else {
            // Check localStorage fallback
            const saved = localStorage.getItem('mp_language');
            if (saved) setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        localStorage.setItem('mp_language', lang);

        // 🔗 Trigger Google Translate sync
        const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (combo) {
            combo.value = lang;
            combo.dispatchEvent(new Event('change'));
        }

        // 🍪 Update cookie for persistence
        document.cookie = `googtrans=/en/${lang}; path=/; domain=${window.location.hostname}`;
        // Also for specific subdomains if needed
        document.cookie = `googtrans=/en/${lang}; path=/;`;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
