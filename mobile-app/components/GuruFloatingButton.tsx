import { usePathname, useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { useGuruAssistant } from '../context/GuruAssistantContext';
import { useTheme } from '../context/ThemeContext';
import { Typography } from './ui/Typography';

const BUTTON_SIZE = 64;
const LABEL_WIDTH = 130;

export function GuruFloatingButton() {
    const router = useRouter();
    const pathname = usePathname();
    const segments = useSegments();
    const { colors } = useTheme();
    const { labelAnimatedValue, hintText } = useGuruAssistant();
    const [isReady, setIsReady] = useState(false);

    const { user } = useAuth();
    
    // Animations
    const translateY = useSharedValue(0);
    const glowOpacity = useSharedValue(0);
    const glowScale = useSharedValue(1);
    const scale = useSharedValue(1);

    const handlePress = () => {
        scale.value = withSequence(
            withTiming(1.2, { duration: 200 }),
            withTiming(1, { duration: 200 })
        );
        // Slight delay for animation feel
        setTimeout(() => {
            if (!user) {
                // User is a guest - prompt for contact number (login)
                Alert.alert(
                    'Login Required',
                    'Please log in to chat with GuruJi and get spiritual guidance.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Log In', onPress: () => router.push('/login') }
                    ]
                );
            } else {
                router.push('/guru-ai');
            }
        }, 150);
    };

    useEffect(() => {
        // Breathing/Floating animation
        translateY.value = withRepeat(
            withSequence(
                withTiming(-8, { duration: 2500, easing: Easing.inOut(Easing.sin) }),
                withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.sin) })
            ),
            -1, // Loop infinitely
            true // Reverse
        );

        // Glow pulse animation
        glowOpacity.value = withRepeat(
            withSequence(
                withDelay(3000, withTiming(0.6, { duration: 1500 })),
                withTiming(0, { duration: 1500 })
            ),
            -1,
            false
        );

        glowScale.value = withRepeat(
            withSequence(
                withDelay(3000, withTiming(1.4, { duration: 1500 })),
                withTiming(1, { duration: 0 })
            ),
            -1,
            false
        );

        // Delay appearance slightly so the splash screen or layout transition is fully clear
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const containerStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { scale: scale.value }
        ],
    }));

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glowOpacity.value,
        transform: [{ scale: glowScale.value }],
    }));

    // ANIMATION: Slide and shrink label into/behind the icon
    const labelStyle = useAnimatedStyle(() => {
        // As it hides (value goes 1 -> 0):
        // 1. Move to the right (positive translateX)
        // 2. Shrink in width (scaleX)
        // 3. Fade out (opacity)

        const currentTranslateX = interpolate(labelAnimatedValue.value, [0, 1], [LABEL_WIDTH / 2, 0]);
        const currentScaleX = interpolate(labelAnimatedValue.value, [0, 1], [0, 1]);
        const currentOpacity = interpolate(labelAnimatedValue.value, [0, 0.5], [0, 1], 'clamp');

        return {
            opacity: currentOpacity,
            transform: [
                { translateX: currentTranslateX },
                { scaleX: currentScaleX }
            ],
            // Move anchor point to the right so it shrinks towards the icon
            transformOrigin: 'right',
        };
    });

    const textStyle = useAnimatedStyle(() => ({
        opacity: interpolate(labelAnimatedValue.value, [0.7, 1], [0, 1], 'clamp'),
        transform: [
            { translateX: interpolate(labelAnimatedValue.value, [0, 1], [10, 0]) }
        ]
    }));

    // Determine visibility based on Expo Router segments
    // segments[0] is often '(tabs)' when inside the main tab layout
    const isTabsRoot = segments[0] === '(tabs)';
    
    // Check if current screen is one of the allowed tabs
    // Home tab corresponds to the index file in (tabs), so segments array has length 1
    const isHome = isTabsRoot && segments.length === 1;
    const isPujas = isTabsRoot && segments[1] === 'pujas';
    const isExplore = isTabsRoot && segments[1] === 'explore';

    const isVisible = isHome || isPujas || isExplore;

    // Hide if not ready, or if not on an allowed screen
    if (!isReady || !isVisible) return null;

    return (
        <View style={styles.absoluteLayer} pointerEvents="box-none">
            <Animated.View style={[styles.container, containerStyle]}>

                {/* Sacred Label (Layered behind the icon) */}
                <Animated.View style={[
                    styles.labelContainer,
                    { backgroundColor: '#ffffff', borderColor: colors.borderMuted },
                    labelStyle
                ]}>
                    <Animated.View style={[styles.textWrapper, textStyle]}>
                        <Typography
                            variant="label"
                            color={colors.saffron}
                            style={{ fontWeight: '600' }}
                            numberOfLines={1}
                        >
                            {hintText || 'Ask GuruJi'}
                        </Typography>
                    </Animated.View>
                </Animated.View>

                {/* Guru Icon (Top Layer) */}
                <View style={styles.iconWrapper}>
                    {/* Glow Effect */}
                    <Animated.View
                        style={[
                            styles.glow,
                            glowStyle,
                            { backgroundColor: colors.saffron }
                        ]}
                    />

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handlePress}
                        style={[
                            styles.button,
                            {
                                backgroundColor: '#ffffff',
                                borderColor: colors.saffron,
                            }
                        ]}
                    >
                        <Image
                            source={require('../assets/images/guru_avatar.png')}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    absoluteLayer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        zIndex: 1000,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    container: {
        bottom: 100, // Above tab bar
        right: 20,
        height: BUTTON_SIZE,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // Make sure container expands to the left for the label
        minWidth: BUTTON_SIZE,
    },
    labelContainer: {
        position: 'absolute',
        right: 32, // Midpoint of the circular icon
        height: 44,
        width: LABEL_WIDTH,
        borderRadius: 22,
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 40,
        zIndex: 5,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        overflow: 'hidden',
    },
    textWrapper: {
        width: LABEL_WIDTH - 56,
        alignItems: 'center',
    },
    iconWrapper: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    avatar: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
    },
    glow: {
        position: 'absolute',
        width: BUTTON_SIZE + 10,
        height: BUTTON_SIZE + 10,
        borderRadius: (BUTTON_SIZE + 10) / 2,
        zIndex: -1,
    }
});
