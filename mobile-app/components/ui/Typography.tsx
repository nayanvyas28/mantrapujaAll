import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

// Type-safe alias for React 19/Expo 54 compatibility
const RNText = Text as any;

// Font handling assumes you have 'Georgia' or 'sans-serif' system fonts available by default in React Native.
// In a full Expo setup with custom fonts (Geist, etc.), we would use useFonts and map families here.

export interface TypographyProps extends TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'label' | 'mono';
    color?: string;
    weight?: 'normal' | 'medium' | 'semibold' | 'bold' | '900';
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export function Typography({
    style,
    variant = 'body',
    color,
    weight,
    align = 'left',
    ...props
}: TypographyProps) {
    const { colors: themeColors } = useTheme();

    let variantStyle: any = {};

    switch (variant) {
        case 'h1': // Hero Titles
            variantStyle = {
                fontFamily: 'serif',
                fontSize: 36, // approximations for 6xl
                fontWeight: '900',
                lineHeight: 40,
                letterSpacing: -1,
            };
            break;
        case 'h2': // Section Headings
            variantStyle = {
                fontFamily: 'serif',
                fontSize: 28, // approximations for 4xl
                fontWeight: '900',
                lineHeight: 34,
                letterSpacing: -0.5,
            };
            break;
        case 'h3':
            variantStyle = {
                fontFamily: 'serif',
                fontSize: 22,
                fontWeight: 'bold',
                lineHeight: 28,
            };
            break;
        case 'body':
            variantStyle = {
                fontFamily: 'sans-serif',
                fontSize: 16,
                fontWeight: '400',
                lineHeight: 24,
            };
            break;
        case 'bodySmall':
            variantStyle = {
                fontFamily: 'sans-serif',
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 20,
            };
            break;
        case 'label':
            variantStyle = {
                fontFamily: 'sans-serif',
                fontSize: 12,
                fontWeight: '600',
                letterSpacing: 0.5,
                textTransform: 'uppercase',
            };
            break;
        case 'mono':
            variantStyle = {
                fontFamily: 'monospace',
                fontSize: 14,
            };
            break;
    }

    // Overrides
    const fw = weight || variantStyle.fontWeight;
    const col = color || themeColors.foreground;

    return (
        <RNText
            style={[
                variantStyle,
                { color: col, fontWeight: fw, textAlign: align },
                style,
            ]}
            {...props}
        />
    );
}
