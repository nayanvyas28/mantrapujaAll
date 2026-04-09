import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import hi from './locales/hi.json';

const resources = {
    en: { translation: en },
    hi: { translation: hi },
};

const initI18n = async () => {
    let savedLanguage = 'en';
    try {
        const lang = await AsyncStorage.getItem('appLanguage');
        if (lang) {
            savedLanguage = lang;
        }
    } catch (error) {
        console.warn('Error reading language from AsyncStorage', error);
    }

    i18n
        .use(initReactI18next)
        .init({
            resources,
            lng: savedLanguage,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
            react: {
                useSuspense: false,
            }
        });
};

initI18n();

export default i18n;
