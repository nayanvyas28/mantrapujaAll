import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LanguageCode = 'en' | 'hi';

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<LanguageCode>('hi'); // Default to Hindi as per user preference often

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const saved = await AsyncStorage.getItem('mp_language');
                if (saved) {
                    setLanguageState(saved as LanguageCode);
                }
            } catch (err) {
                console.error('Failed to load language:', err);
            }
        };
        loadLanguage();
    }, []);

    const setLanguage = async (lang: LanguageCode) => {
        setLanguageState(lang);
        try {
            await AsyncStorage.setItem('mp_language', lang);
        } catch (err) {
            console.error('Failed to save language:', err);
        }
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
