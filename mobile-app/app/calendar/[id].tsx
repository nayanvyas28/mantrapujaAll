import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, ArrowRight, Calendar as CalIcon, Clock, Info, Sparkles } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { FallbackImage } from '../../components/ui/FallbackImage';
import { Footer } from '../../components/ui/Footer';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { getImageSource } from '../../utils/imageResolver';
import { supabase } from '../../utils/supabase';

const { width } = Dimensions.get('window');

export default function FestivalDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { theme, colors: themeColors } = useTheme();

    const [festival, setFestival] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [recommendedPujas, setRecommendedPujas] = useState<any[]>([]);

    const fetchFestivalDetails = useCallback(async () => {
        try {
            setLoading(true);
            const cached = await AsyncStorage.getItem(`cached_festival_${id}`);
            if (cached) {
                setFestival(JSON.parse(cached));
                setLoading(false);
            }

            const { data, error } = await supabase
                .from('festivals')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                setFestival(data);
                await AsyncStorage.setItem(`cached_festival_${id}`, JSON.stringify(data));
            }
        } catch (err) {
            console.error('Error fetching festival details:', err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    const fetchRecommendations = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('poojas')
                .select('id, name, tagline, images')
                .eq('is_active', true)
                .eq('is_featured', true)
                .limit(2);
            if (data) {
                setRecommendedPujas(data);
            }
        } catch (err) { }
    }, []);

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/');
        }
    };

    useEffect(() => {
        if (id && id !== 'undefined' && typeof id === 'string') {
            fetchFestivalDetails();
            fetchRecommendations();
        } else {
            setLoading(false);
        }
    }, [id, fetchFestivalDetails, fetchRecommendations]);

    if (loading && !festival) {
        return (
            <View style={[styles.container, { backgroundColor: themeColors.background, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={themeColors.saffron} />
            </View>
        );
    }

    if (!festival) {
        return (
            <View style={[styles.container, { backgroundColor: themeColors.background, justifyContent: 'center', alignItems: 'center' }]}>
                <Typography variant="h3" color={themeColors.foreground}>Festival not found</Typography>
                <Button title="Go Back" onPress={handleBack} style={{ marginTop: 20 }} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: themeColors.background }]}>
            <StatusBar style="light" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <FallbackImage
                        source={getImageSource(festival.images)}
                        style={styles.heroImage}
                        contentFit="cover"
                    />
                    <View style={styles.heroOverlay} />

                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <ArrowLeft size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.heroContent}>
                        <View style={styles.dateTag}>
                            <CalIcon size={14} color={themeColors.saffron} />
                            <Typography variant="label" color="#fed7aa" style={{ marginLeft: 6 }}>
                                {festival.date}
                            </Typography>
                        </View>
                        <Typography variant="h1" color="#fff" style={styles.heroTitle}>
                            {festival.name}
                        </Typography>
                    </View>
                </View>

                <View style={styles.paddedContent}>
                    {/* Significance Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Info size={20} color={themeColors.saffron} />
                            <Typography variant="h3" style={{ marginLeft: 10 }}>Significance</Typography>
                        </View>
                        <Card variant="solid" style={styles.infoCard}>
                            <Typography variant="body" color={themeColors.mutedForeground} style={{ lineHeight: 24 }}>
                                {festival.content?.significance || festival.description}
                            </Typography>
                        </Card>
                    </View>

                    {/* Rituals & Timings */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Clock size={20} color={themeColors.saffron} />
                            <Typography variant="h3" style={{ marginLeft: 10 }}>Rituals & Timings</Typography>
                        </View>
                        <View style={styles.ritualList}>
                            {festival.content?.rituals?.map((ritual: any, idx: number) => (
                                <View key={idx} style={[styles.ritualItem, { borderColor: themeColors.borderMuted }]}>
                                    <View style={styles.ritualBadge} />
                                    <View style={styles.ritualContent}>
                                        <Typography variant="body" style={{ fontWeight: '600', color: themeColors.foreground }}>
                                            {typeof ritual === 'string' ? ritual : ritual.activity || ritual.name}
                                        </Typography>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Related Pujas Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Sparkles size={20} color={themeColors.saffron} />
                            <Typography variant="h3" style={{ marginLeft: 10 }}>Recommended Pujas</Typography>
                        </View>
                        <View style={styles.pujaList}>
                            {recommendedPujas.map((puja: any, idx: number) => (
                                <TouchableOpacity key={puja.id} activeOpacity={0.8} onPress={() => router.push(`/pujas/${puja.id}`)}>
                                    <Card variant="solid" style={styles.pujaCard}>
                                        <FallbackImage
                                            source={getImageSource(puja.images)}
                                            style={styles.pujaThumbnail}
                                            contentFit="cover"
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Typography variant="body" style={{ fontWeight: 'bold' }} color={themeColors.foreground}>{puja.name}</Typography>
                                            <Typography variant="bodySmall" color={themeColors.mutedForeground}>{puja.tagline}</Typography>
                                        </View>
                                        <ArrowRight size={18} color={themeColors.saffron} />
                                    </Card>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {festival.content?.history && (
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <CalIcon size={20} color={themeColors.saffron} />
                                <Typography variant="h3" style={{ marginLeft: 10 }}>Divine History</Typography>
                            </View>
                            <Typography variant="body" color={themeColors.mutedForeground} style={{ lineHeight: 24 }}>
                                {festival.content.history}
                            </Typography>
                        </View>
                    )}

                    <View style={{ marginTop: 40, marginBottom: 20 }}>
                        <Footer />
                    </View>
                </View>

            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    heroSection: {
        height: 380,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 24,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
    },
    heroContent: {
        position: 'absolute',
        bottom: 40,
        left: 24,
        right: 24,
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    dateTag: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    paddedContent: {
        padding: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoCard: {
        padding: 20,
    },
    ritualList: {
        paddingLeft: 4,
    },
    ritualItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingLeft: 16,
        borderLeftWidth: 2,
    },
    ritualTime: {
        width: 80,
    },
    ritualBadge: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#f97316',
        position: 'absolute',
        left: -5,
    },
    ritualContent: {
        flex: 1,
        marginLeft: 16,
    },
    pujaList: {
        gap: 12,
    },
    pujaCard: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    pujaThumbnail: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 16,
    },
});
