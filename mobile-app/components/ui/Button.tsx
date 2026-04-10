import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { getThemeColors, ThemeType } from '../../theme/colors';

// Type-safe alias for React 19/Expo 54 compatibility
const RNText = Text as any;

export interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    themeContext?: ThemeType;
    loading?: boolean;
}

export function Button({
    title,
    variant = 'primary',
    size = 'md',
    themeContext = 'light',
    style,
    disabled,
    ...props
}: ButtonProps) {
    const themeColors = getThemeColors(themeContext);

    let btnStyle: ViewStyle = { ...styles.baseButton };
    let txtStyle: TextStyle = { ...styles.baseText };

    // Size styling
    switch (size) {
        case 'sm':
            btnStyle.paddingVertical = 8;
            btnStyle.paddingHorizontal = 16;
            txtStyle.fontSize = 14;
            break;
        case 'md':
            btnStyle.paddingVertical = 14;
            btnStyle.paddingHorizontal = 24;
            txtStyle.fontSize = 16;
            break;
        case 'lg':
            btnStyle.paddingVertical = 18;
            btnStyle.paddingHorizontal = 32;
            txtStyle.fontSize = 18;
            break;
    }

    // Variant styling
    switch (variant) {
        case 'primary':
            btnStyle.backgroundColor = themeColors.saffron;
            btnStyle.shadowColor = themeColors.saffron;
            txtStyle.color = '#ffffff';
            break;
        case 'secondary':
            btnStyle.backgroundColor = themeColors.card;
            btnStyle.borderColor = themeColors.border;
            btnStyle.borderWidth = 1;
            // Secondary subtle shadow
            btnStyle.shadowColor = themeColors.foreground;
            btnStyle.shadowOpacity = 0.05;
            txtStyle.color = themeColors.saffron;
            break;
        case 'outline':
            btnStyle.backgroundColor = 'transparent';
            btnStyle.borderColor = themeColors.saffron;
            btnStyle.borderWidth = 1.5;
            txtStyle.color = themeColors.saffron;
            break;
        case 'ghost':
            btnStyle.backgroundColor = 'transparent';
            btnStyle.shadowOpacity = 0;
            btnStyle.elevation = 0;
            txtStyle.color = themeColors.mutedForeground;
            break;
    }

    if (disabled) {
        btnStyle.opacity = 0.5;
    }

    return (
        <TouchableOpacity
            style={[btnStyle, style]}
            disabled={disabled}
            activeOpacity={0.8}
            {...props}
        >
            <RNText style={[txtStyle, { fontWeight: 'bold' }]}>{title}</RNText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    baseButton: {
        borderRadius: 12, // Soft corners (3xl approximation)
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // Base shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    baseText: {
        fontFamily: 'sans-serif',
    },
});
