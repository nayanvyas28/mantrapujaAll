import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';

// Type-safe alias for React 19/Expo 54 compatibility
const RNView = View as any;

import { useTheme } from '../../context/ThemeContext';
import { Heart } from 'lucide-react-native';

export function Footer() {
    const { colors } = useTheme();

    return (
        <RNView style={[styles.footer, { borderTopColor: colors.borderMuted }]}>
            <Typography variant="h3" color={colors.foreground} style={{ marginBottom: 8 }}>Mantra Puja</Typography>
            <RNView style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Typography variant="bodySmall" color={colors.mutedForeground}>Created with </Typography>
                <Heart size={14} color="#ef4444" fill="#ef4444" style={{ marginHorizontal: 2 }} />
                <Typography variant="bodySmall" color={colors.mutedForeground}> in Ujjain, India</Typography>
            </RNView>
        </RNView>
    );
}

const styles = StyleSheet.create({
    footer: {
        alignItems: 'center',
        paddingVertical: 32,
        borderTopWidth: 1,
        marginTop: 16,
    },
});
