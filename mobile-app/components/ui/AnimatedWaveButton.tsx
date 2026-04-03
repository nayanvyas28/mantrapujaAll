import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface AnimatedWaveButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
}

export function AnimatedWaveButton({ title, onPress, style }: AnimatedWaveButtonProps) {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#0f172a' : '#fffbf5';
    const borderColor = isDark ? '#7c2d12' : '#fed7aa';

    useEffect(() => {
        const startAnimation = () => {
            rotateAnim.setValue(0);
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 6000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        };

        startAnimation();
        return () => rotateAnim.stopAnimation();
    }, [rotateAnim]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.container, style, { borderColor }]}>
            {/* Theme responsive background base */}
            <View style={[styles.background, { backgroundColor: bgColor }]} />

            {/* The animated wave (a rounded square rotating) */}
            <Animated.View style={[
                styles.waveShape,
                { transform: [{ rotate: spin }] }
            ]} />

            {/* A second wave slightly offset for a cool liquid effect */}
            <Animated.View style={[
                styles.waveShape2,
                { transform: [{ rotate: spin }] }
            ]} />

            {/* Button Text placed above the wave */}
            <View style={styles.textContainer}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        borderRadius: 28, // Capsule shape
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    waveShape: {
        position: 'absolute',
        width: 800,
        height: 800,
        backgroundColor: '#ea580c', // Darker orange
        borderRadius: 350, // Slightly irregular shape
        // Pushing the giant circle very far down relative to the 56px height 
        // to only show the top edge spanning ~20% of the box height
        // Center of the blob will be lower, so the corners max out strictly at bottom 20%
        top: 62,
        left: -200,
        opacity: 0.9,
    },
    waveShape2: {
        position: 'absolute',
        width: 800,
        height: 800,
        backgroundColor: '#f97316', // Lighter orange (Saffron)
        borderRadius: 340, // Slightly different irregular shape
        top: 66,
        left: -180,
        opacity: 0.9,
    },
    textContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    text: {
        color: '#f97316', // Orange text
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});
