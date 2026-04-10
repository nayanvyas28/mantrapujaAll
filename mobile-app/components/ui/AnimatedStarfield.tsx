import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

// Type-safe aliases for React 19/Expo 54 compatibility
const RNView = View as any;
const RNAnimatedView = Animated.View as any;

const { width, height } = Dimensions.get('window');
const STAR_COUNT = 50;

const Star = ({ size, startX }: any) => {
    const translateY = useRef(new Animated.Value(height + 50)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const duration = Math.random() * 20000 + 15000; // 15s to 35s
        const phaseDelay = Math.random() * 10000;

        const moveAnim = Animated.loop(
            Animated.timing(translateY, {
                toValue: -100,
                duration: duration,
                useNativeDriver: true,
            })
        );

        const pulseAnim = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: Math.random() * 0.5 + 0.3,
                    duration: Math.random() * 2000 + 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: Math.random() * 2000 + 1500,
                    useNativeDriver: true,
                })
            ])
        );

        const timeout = setTimeout(() => {
            moveAnim.start();
            pulseAnim.start();
        }, phaseDelay);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <RNAnimatedView
            style={{
                position: 'absolute',
                left: startX,
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: '#ffffff',
                opacity: opacity,
                transform: [{ translateY }]
            }}
        />
    );
};

export function AnimatedStarfield() {
    const stars = useMemo(() => {
        return Array.from({ length: STAR_COUNT }).map((_, i) => ({
            id: i,
            size: Math.random() * 2.5 + 0.5,
            startX: Math.random() * width,
        }));
    }, []);

    return (
        <RNView style={StyleSheet.absoluteFillObject} pointerEvents="none">
            {stars.map((star) => (
                <Star key={star.id} {...star} />
            ))}
        </RNView>
    );
}
