import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeColors } from '../theme/colors';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeMode;
    colors: ReturnType<typeof getThemeColors>;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeMode>('light');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Load theme from storage on mount
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('@theme');
                if (storedTheme === 'light' || storedTheme === 'dark') {
                    setThemeState(storedTheme);
                }
            } catch (error) {
                console.error('Failed to load theme:', error);
            } finally {
                setIsReady(true);
            }
        };
        loadTheme();
    }, []);

    const setTheme = async (mode: ThemeMode) => {
        setThemeState(mode);
        try {
            await AsyncStorage.setItem('@theme', mode);
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const colors = getThemeColors(theme);

    if (!isReady) {
        return null; // or a loading spinner if preferred
    }

    return (
        <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
