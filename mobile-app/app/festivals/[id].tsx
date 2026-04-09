import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { Footer } from '../../components/ui/Footer';
import { Calendar, MoonStar, ArrowLeft, ArrowRight } from 'lucide-react-native';
import { sanitizeText } from '../../utils/sanitizer';

export default function FestivalDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { theme, colors: themeColors } = useTheme();

    // Dummy data
    const festivalTitle = id === '1' ? 'Maha Shivaratri' : 'Navratri';

    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <StatusBar style="light" />

            {/* Header Image Area */}
            <View style={styles.imagePlaceholder}>
                <View style={styles.headerOverlay}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ArrowLeft size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Typography variant="h2" color="#fff" style={styles.overlayTitle}>{festivalTitle}</Typography>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Date & Tithi Info */}
                <Card variant="solid" style={styles.dateCard}>
                    <View style={styles.dateInfoItem}>
                        <Calendar size={20} color={themeColors.saffron} />
                        <Typography variant="body" style={{ fontWeight: 'bold', marginTop: 8 }}>8 March 2024</Typography>
                        <Typography variant="bodySmall" color={themeColors.mutedForeground}>Friday</Typography>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.dateInfoItem}>
                        <MoonStar size={20} color={themeColors.saffron} />
                        <Typography variant="body" style={{ fontWeight: 'bold', marginTop: 8 }}>Chaturdashi</Typography>
                        <Typography variant="bodySmall" color={themeColors.mutedForeground}>Krishna Paksha</Typography>
                    </View>
                </Card>

                {/* Significance */}
                <Typography variant="h3" style={styles.sectionTitle}>Significance</Typography>
                <Typography variant="body" color={themeColors.mutedForeground} style={{ lineHeight: 24, marginBottom: 32 }}>
                    {sanitizeText("Maha Shivaratri is a Hindu festival celebrated annually in honour of Lord Shiva. The name also refers to the night when Shiva performs the heavenly dance. It marks a remembrance of \"overcoming darkness and ignorance\" in life and the world. It is observed by remembering Shiva and chanting prayers, fasting, and meditating on ethics and virtues such as honesty, non-injury to others, charity, forgiveness, and the discovery of Shiva.")}
                </Typography>

                {/* Suggested Pujas */}
                <Typography variant="h3" style={styles.sectionTitle}>Suggested Pujas for this Day</Typography>

                <Card variant="solid" style={styles.pujaCard}>
                    <View style={[styles.pujaCardImage, { backgroundColor: themeColors.muted }]} />
                    <View style={styles.pujaCardInfo}>
                        <Typography variant="body" style={{ fontWeight: 'bold' }}>Rudra Abhishek</Typography>
                        <Typography variant="bodySmall" color={themeColors.mutedForeground}>Highly auspicious on Shivaratri.</Typography>
                        <View style={styles.pujaCardFooter}>
                            <Typography variant="label" color={themeColors.saffron}>From ₹5,100</Typography>
                            <TouchableOpacity style={styles.viewBtn} onPress={() => router.push('/pujas/2')}>
                                <Typography variant="label" color={themeColors.saffron}>View</Typography>
                                <ArrowRight size={14} color={themeColors.saffron} style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>

                <View style={{ marginTop: 32 }}>
                    <Footer />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagePlaceholder: {
        height: 250,
        backgroundColor: '#0f172a', // Cosmic Navy
        justifyContent: 'flex-end',
        padding: 24,
    },
    headerOverlay: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlayTitle: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    dateCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        marginBottom: 32,
        marginTop: -40, // Overlap the header image
    },
    dateInfoItem: {
        flex: 1,
        alignItems: 'center',
    },
    separator: {
        width: 1,
        height: 40,
        backgroundColor: '#e2e8f0',
    },
    sectionTitle: {
        marginBottom: 16,
    },
    pujaCard: {
        flexDirection: 'row',
        padding: 12,
    },
    pujaCardImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 16,
    },
    pujaCardInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    pujaCardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    viewBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
});
