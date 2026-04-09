import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { Config } from '../constants/Config';
import { Platform } from 'react-native';

// Custom storage engine for Expo
const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        if (Platform.OS === 'web') {
            if (typeof localStorage === 'undefined') return Promise.resolve(null);
            return Promise.resolve(localStorage.getItem(key));
        }
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        if (Platform.OS === 'web') {
            if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
            return Promise.resolve();
        }
        return SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        if (Platform.OS === 'web') {
            if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
            return Promise.resolve();
        }
        return SecureStore.deleteItemAsync(key);
    },
};

const supabaseUrl = Config.supabaseUrl;
const supabaseAnonKey = Config.supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

/**
 * Generates a SHA-256 Hash Lock for the session
 * Ensures the session key is bound to a hashed signature
 */
export const generateSessionHash = async (accessToken: string) => {
    try {
        // Simple hash lock using SHA-256
        const hash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            accessToken + Config.sessionSalt // Adding a salt for robustness
        );
        return hash;
    } catch (error) {
        console.error('Error generating session hash:', error);
        return null;
    }
};
