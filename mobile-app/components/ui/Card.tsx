import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

// Type-safe alias for React 19/Expo 54 compatibility
const RNView = View as any;

export interface CardProps extends ViewProps {
    variant?: 'glass' | 'solid' | 'elevated';
}

export function Card({
    style,
    variant = 'solid',
    children,
    ...props
}: CardProps) {
    const { theme, colors: themeColors } = useTheme();

    let cardStyle: ViewStyle = {
        backgroundColor: themeColors.card,
        borderColor: themeColors.border,
        borderWidth: 1,
        borderRadius: 16, // Soft corners
        padding: 16,
    };

    switch (variant) {
        case 'elevated':
            cardStyle.shadowColor = '#000';
            cardStyle.shadowOffset = { width: 0, height: 10 };
            cardStyle.shadowOpacity = theme === 'dark' ? 0.3 : 0.05;
            cardStyle.shadowRadius = 20;
            cardStyle.elevation = 10;
            break;
        case 'glass':
            // React Native doesn't have native backdrop-blur (requires expo-blur). 
            // We simulate glassmorphism by lowering opacity slightly and adjusting colors.
            cardStyle.backgroundColor = theme === 'dark'
                ? 'rgba(30, 41, 59, 0.7)'
                : '#ffffff'; // In light mode, user wants pure white cards
            // Add subtle border to define glass edge
            cardStyle.borderWidth = 1;
            cardStyle.borderColor = theme === 'dark'
                ? 'rgba(51, 65, 85, 0.5)'  // Slate 700 / 0.5
                : 'rgba(254, 215, 170, 0.5)'; // Orange 200 / 0.5
            break;
        case 'solid':
        default:
            cardStyle.shadowColor = '#000';
            cardStyle.shadowOffset = { width: 0, height: 2 };
            cardStyle.shadowOpacity = 0.05;
            cardStyle.shadowRadius = 4;
            cardStyle.elevation = 2;
            break;
    }

    return (
        <RNView style={[cardStyle, style]} {...props}>
            {children}
        </RNView>
    );
}
