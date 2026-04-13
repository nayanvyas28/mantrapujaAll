import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Animated } from 'react-native';
import { Image } from 'expo-image';
import { Typography } from './ui/Typography';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { ChevronRight, Sparkles, Moon, Star, Sun, Compass } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { fetchAstroData, prepareAstroRequestData } from '../services/astrologyService';

// Type-safe aliases for React 19/Expo 54 compatibility
const RNView = View as any;
const RNActivityIndicator = ActivityIndicator as any;
const RNAnimatedView = Animated.View as any;

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48; // Exact banner width compatibility

export const AstroSection = () => {
    const { colors, theme } = useTheme();
    const { profile } = useAuth();
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [astroDetails, setAstroDetails] = useState<any>(null);

    const pulseAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const hasBirthData = profile?.onboarding_data?.dob || profile?.dob;
    const isDark = theme === 'dark';

    useEffect(() => {
        if (hasBirthData) {
            loadAstroDetails();
        }
        
        // Appear animation
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400, // Faster appear
            useNativeDriver: true,
        }).start();

        // Subtle pulse for eye-catching effect
        const pulseLoop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        );
        
        pulseLoop.start();

        return () => {
            pulseLoop.stop();
        };
    }, [hasBirthData, i18n.language]);

    const loadAstroDetails = async () => {
        // Skip loading spinner if we already have some data to show (e.g. from previous render within session)
        if (!astroDetails) setLoading(true);
        try {
            const requestData = prepareAstroRequestData(profile);
            if (requestData) {
                const data = await fetchAstroData('astro_details', requestData);
                if (data) setAstroDetails(data);
            }
        } catch (error) {
            console.error("Failed to load astro details", error);
        } finally {
            setLoading(false);
        }
    };

    if (!hasBirthData) {
        return (
            <RNAnimatedView style={[styles.outerContainer, { opacity: fadeAnim }]}>
                <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={() => router.push('/onboarding-details')}
                    style={[styles.premiumCard, { backgroundColor: isDark ? '#1e293b' : '#ffffff', width: CARD_WIDTH, borderColor: colors.saffron + '30' }]}
                >
                    <RNView style={styles.glowEffect} />
                    <RNAnimatedView style={{ transform: [{ scale: pulseAnim }], marginRight: 16 }}>
                        <RNView style={[styles.miniIconBox, { backgroundColor: colors.saffron + '15' }]}>
                            <Compass size={36} color={colors.saffron} />
                        </RNView>
                    </RNAnimatedView>
                    <RNView style={styles.textContainer}>
                        <RNView style={styles.badgeRow}>
                            <Sparkles size={12} color={colors.saffron} />
                            <Typography variant="label" color={colors.saffron} style={styles.badgeText}>{t('kundli.unlock_destiny', 'UNLOCK DESTINY')}</Typography>
                        </RNView>
                        <Typography variant="h3" color={colors.foreground}>{t('kundli.know_yourself', 'Know Your Self')}</Typography>
                        <Typography variant="bodySmall" color={colors.mutedForeground}>{t('kundli.discover_blueprint', 'Discover your cosmic blueprint.')}</Typography>
                    </RNView>
                    <RNView style={[styles.arrowCircle, { backgroundColor: colors.saffron }]}>
                        <ChevronRight size={18} color="#fff" />
                    </RNView>
                </TouchableOpacity>
            </RNAnimatedView>
        );
    }

    return (
        <RNAnimatedView style={[styles.outerContainer, { opacity: fadeAnim }]}>
            <TouchableOpacity 
                activeOpacity={0.95}
                onPress={() => router.push('/kundli')}
                style={[styles.premiumCardExpanded, { backgroundColor: isDark ? '#1e293b' : '#ffffff', width: CARD_WIDTH, borderColor: colors.gold + '20' }]}
            >
                <RNView style={styles.cardHeader}>
                    <RNView style={styles.profileBox}>
                        <RNAnimatedView style={{ transform: [{ scale: pulseAnim }] }}>
                            <RNView style={[styles.miniIconBox, { backgroundColor: colors.saffron + '15' }]}>
                                <Compass size={32} color={colors.saffron} />
                            </RNView>
                        </RNAnimatedView>
                    </RNView>
                    <RNView style={styles.profileText}>
                        <Typography variant="label" color={colors.saffron} style={styles.profileLabel}>{t('kundli.vaidik_identity', 'VAIDIK IDENTITY')}</Typography>
                        <Typography variant="h2" color={colors.foreground} style={styles.rashiName}>
                            {astroDetails?.sign || '--'}
                        </Typography>
                        <Typography variant="bodySmall" color={colors.mutedForeground} style={{ marginTop: -2 }}>
                            {astroDetails?.ascendant || '--'} {t('kundli.ascendant', 'Ascendant')}
                        </Typography>
                    </RNView>
                    <RNView style={styles.actionBtnBox}>
                         <RNView style={[styles.pillBtn, { backgroundColor: colors.saffron + '15' }]}>
                            <Typography variant="label" color={colors.saffron} style={{ fontSize: 10 }}>{t('common.view_all', 'VIEW CHART')}</Typography>
                         </RNView>
                    </RNView>
                </RNView>

                {loading ? (
                    <RNView style={styles.loaderBox}>
                        <RNActivityIndicator size="small" color={colors.saffron} />
                    </RNView>
                ) : (
                    <RNView style={styles.gridRow}>
                        <RNView style={styles.gridItem}>
                            <RNView style={[styles.iconBox, { backgroundColor: colors.gold + '10' }]}>
                                <Star size={14} color={colors.gold} />
                            </RNView>
                            <RNView style={{ marginLeft: 8 }}>
                                <Typography variant="label" style={styles.gridLabel}>Nakshatra</Typography>
                                <Typography variant="bodySmall" color={colors.foreground} style={styles.gridValue}>{astroDetails?.Naksahtra || astroDetails?.nakshatra || '--'}</Typography>
                            </RNView>
                        </RNView>
                        <RNView style={styles.separator} />
                        <RNView style={styles.gridItem}>
                            <RNView style={[styles.iconBox, { backgroundColor: colors.saffron + '10' }]}>
                                <Sun size={14} color={colors.saffron} />
                            </RNView>
                            <RNView style={{ marginLeft: 8 }}>
                                <Typography variant="label" style={styles.gridLabel}>Nadi</Typography>
                                <Typography variant="bodySmall" color={colors.foreground} style={styles.gridValue}>{astroDetails?.Nadi || astroDetails?.nadi || '--'}</Typography>
                            </RNView>
                        </RNView>
                    </RNView>
                )}
            </TouchableOpacity>
        </RNAnimatedView>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
        marginVertical: 4,
    },
    premiumCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 24,
        borderWidth: 1,
        elevation: 12,
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        overflow: 'hidden',
    },
    premiumCardExpanded: {
        padding: 16,
        borderRadius: 24,
        borderWidth: 1.5,
        elevation: 10,
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        overflow: 'hidden',
    },
    glowEffect: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(249, 115, 22, 0.08)',
        zIndex: 0,
    },
    iconHero: {
        width: 56,
        height: 56,
        marginRight: 16,
        zIndex: 1,
    },
    textContainer: {
        flex: 1,
        zIndex: 1,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    badgeText: {
        fontSize: 9,
        marginLeft: 4,
        fontWeight: '800',
        letterSpacing: 1.5,
    },
    arrowCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    profileBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: 'rgba(249, 115, 22, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(249, 115, 22, 0.2)',
    },
    miniIconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileText: {
        flex: 1,
        marginLeft: 16,
    },
    profileLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        opacity: 0.8,
    },
    rashiName: {
        fontSize: 22,
        marginTop: 0,
    },
    actionBtnBox: {
        alignSelf: 'center',
    },
    pillBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(249, 115, 22, 0.1)',
    },
    loaderBox: {
        height: 44,
        justifyContent: 'center',
    },
    gridRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(249, 115, 22, 0.03)',
        padding: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(249, 115, 22, 0.05)',
    },
    gridItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridLabel: {
        fontSize: 9,
        opacity: 0.6,
        textTransform: 'uppercase',
    },
    gridValue: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: -2,
    },
    separator: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        marginHorizontal: 12,
    }
});
