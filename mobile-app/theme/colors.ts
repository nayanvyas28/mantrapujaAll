export const COLORS = {
    // Brand Colors
    primary: {
        saffron: '#f97316',
        gold: '#f59e0b',
        antiqueGold: '#d97706',
    },

    // Functional Colors
    functional: {
        success: '#10b981', // Emerald
        destructive: '#ef4444', // Red
        muted: '#64748b', // Slate
        borderMuted: '#e2e8f0', // Slate 200
    },

    // Light Theme
    light: {
        background: '#fffbf5', // Warm Cream
        foreground: '#0f172a', // Dark Navy
        card: '#ffffff', // Pure White
        border: '#fed7aa', // Orange-tinted
        mutedForeground: '#475569', // Slate 600
    },

    // Dark Theme
    dark: {
        background: '#0f172a', // Cosmic Navy
        foreground: '#ffffff', // White
        card: '#1e293b', // Celestial Blue/Navy
        border: '#334155', // Subtle dark border
        mutedForeground: '#94a3b8', // Slate 400
    }
};

export type ThemeType = 'light' | 'dark';

export const getThemeColors = (theme: ThemeType) => {
    return {
        ...COLORS.primary,
        ...COLORS.functional,
        ...(theme === 'dark' ? COLORS.dark : COLORS.light),
    };
};
