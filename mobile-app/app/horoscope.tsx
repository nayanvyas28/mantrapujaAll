import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, MessageSquare, RefreshCw, Sun } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/ui/Card';
import { ResultDisclaimer } from '../components/ui/ResultDisclaimer';
import { Typography } from '../components/ui/Typography';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { sanitizeText } from '../utils/sanitizer';
import { supabase } from '../utils/supabase';

const RASHI_MAP: Record<string, string> = {
    'Mesh': 'aries',
    'Vrishabh': 'taurus',
    'Mithun': 'gemini',
    'Karka': 'cancer',
    'Simha': 'leo',
    'Kanya': 'virgo',
    'Tula': 'libra',
    'Vrishchik': 'scorpio',
    'Dhanu': 'sagittarius',
    'Makar': 'capricorn',
    'Kumbh': 'aquarius',
    'Meen': 'pisces'
};

export default function HoroscopeScreen() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const { profile } = useAuth();
    const insets = useSafeAreaInsets();

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'yearly'>('daily');
    const [horoscopeData, setHoroscopeData] = useState<any>(null);
    const [rashi, setRashi] = useState<string | null>(profile?.rashi || null);

    useEffect(() => {
        if (profile?.rashi) {
            setRashi(profile.rashi);
            fetchHoroscope(profile.rashi);
        } else {
            setLoading(false);
        }
    }, [profile?.rashi]);

    const fetchHoroscope = async (rashiName: string) => {
        setLoading(true);
        try {
            const slug = RASHI_MAP[rashiName] || rashiName.toLowerCase();
            
            // 1. Get Rashifal Category
            const { data: category } = await supabase
                .from('categories')
                .select('id')
                .eq('slug', 'rashifal')
                .maybeSingle();

            if (!category) {
                // If category doesn't exist, we'll use fallbacks in the next step
                setHoroscopeData({
                    daily: "The stars suggest a day of growth and positive energy. Focus on your spiritual well-being.",
                    monthly: "Align your intentions with the moon this month for clarity and peace.",
                    yearly: "2026 is a year of expansion and personal discovery. The cosmos is with you."
                });
                setLoading(false);
                return;
            }

            // 2. Get Page (Zodiac Sign)
            const { data: page, error } = await supabase
                .from('pages')
                .select('*')
                .eq('category_id', category.id)
                .eq('slug', slug)
                .maybeSingle();

            if (error) console.error("Horoscope Fetch Error:", error);

            if (page && page.content) {
                setHoroscopeData(page.content);
            } else {
                // Fallback / Placeholder
                setHoroscopeData({
                    daily: "The stars suggest a day of growth and positive energy for you. Take a moment to meditate on your goals.",
                    monthly: "Align your actions with celestial patterns this month for peak spiritual harmony.",
                    yearly: "2026 is a year of transformation and deep spiritual realization for your sign."
                });
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setHoroscopeData({
                daily: "Consult the divine within. Today's forecast is clouded, but your inner light remains bright.",
                monthly: "Focus on inner peace and character building throughout this lunar cycle.",
                yearly: "Your journey this year is one of discovery and spiritual awakening."
            });
        } finally {
            setLoading(false);
        }
    };

    const reading = horoscopeData ? horoscopeData[activeTab] : null;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top, borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h2" color={colors.foreground}>Daily Horoscope</Typography>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}>
                {!rashi ? (
                    <Card variant="solid" style={styles.emptyCard}>
                        <Sun size={48} color={colors.saffron} style={{ marginBottom: 16 }} />
                        <Typography variant="h3" style={{ textAlign: 'center', marginBottom: 12 }}>Rashi Not Selected</Typography>
                        <Typography variant="body" color={colors.mutedForeground} style={{ textAlign: 'center', marginBottom: 24 }}>
                            Please select your Rashi to see your personalized daily horoscope and spiritual guidance.
                        </Typography>
                        <TouchableOpacity 
                            style={[styles.primaryButton, { backgroundColor: colors.saffron }]}
                            onPress={() => router.push("/zodiac")}
                        >
                            <Typography variant="h3" color="#fff">Select Rashi</Typography>
                        </TouchableOpacity>
                    </Card>
                ) : (
                    <>
                        <Card variant="solid" style={[styles.readingCard, { backgroundColor: theme === 'dark' ? colors.card : '#fffcf5' }]}>
                            <View style={styles.rashiHeader}>
                                <View>
                                    <Typography variant="h2" color={colors.saffron}>{rashi}</Typography>
                                    <Typography variant="label" color={colors.mutedForeground} style={{ marginTop: 2 }}>Zodiac Insight</Typography>
                                </View>
                                <TouchableOpacity onPress={() => router.push("/zodiac")}>
                                    <View style={[styles.changeBadge, { backgroundColor: colors.saffron + '15' }]}>
                                        <RefreshCw size={14} color={colors.saffron} />
                                        <Typography variant="label" color={colors.saffron} style={{ marginLeft: 6 }}>Change</Typography>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Tab Selection */}
                            <View style={[styles.tabContainer, { backgroundColor: theme === 'dark' ? colors.background : '#f8f4e9', borderColor: colors.borderMuted }]}>
                                {(['daily', 'monthly', 'yearly'] as const).map((tab) => (
                                    <TouchableOpacity 
                                        key={tab}
                                        onPress={() => setActiveTab(tab)}
                                        style={[
                                            styles.tabItem, 
                                            activeTab === tab && [styles.activeTabItem, { backgroundColor: colors.saffron }]
                                        ]}
                                    >
                                        <Typography 
                                            variant="label" 
                                            color={activeTab === tab ? '#fff' : colors.mutedForeground}
                                            style={{ fontWeight: '800', textTransform: 'uppercase' }}
                                        >
                                            {tab}
                                        </Typography>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={[styles.divider, { backgroundColor: colors.borderMuted }]} />

                            {loading ? (
                                <View style={styles.loaderContainer}>
                                    <ActivityIndicator size="large" color={colors.saffron} />
                                    <Typography variant="bodySmall" style={{ marginTop: 12 }}>Consulting the stars...</Typography>
                                </View>
                            ) : (
                                <View style={styles.readingBox}>
                                    <Typography variant="body" style={[styles.readingText, { color: colors.foreground }]}>
                                        {sanitizeText(reading)}
                                    </Typography>
                                </View>
                            )}
                        </Card>

                        <TouchableOpacity 
                            style={[styles.aiButton, { backgroundColor: colors.card, borderColor: colors.saffron }]}
                            onPress={() => router.push({
                                pathname: "/guru-ai",
                                params: { message: `Analyze my ${activeTab} horoscope for ${rashi}` }
                            })}
                        >
                            <MessageSquare size={20} color={colors.saffron} />
                            <Typography variant="h3" color={colors.saffron} style={{ marginLeft: 12 }}>Detailed GuruJi Analysis</Typography>
                        </TouchableOpacity>

                        <ResultDisclaimer style={{ marginTop: 24, marginBottom: 12 }} />
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    backButton: { width: 44, height: 44, justifyContent: 'center' },
    scrollContent: { padding: 20 },
    emptyCard: {
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        borderRadius: 24,
    },
    primaryButton: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    readingCard: {
        padding: 24,
        borderRadius: 32,
        minHeight: 400,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        borderWidth: 1.5,
        borderColor: 'rgba(249, 115, 22, 0.1)',
    },
    rashiHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    tabContainer: {
        flexDirection: 'row',
        padding: 4,
        borderRadius: 20,
        marginBottom: 24,
        borderWidth: 1,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 16,
    },
    activeTabItem: {
        elevation: 4,
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    changeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    divider: {
        height: 1,
        marginBottom: 24,
    },
    loaderContainer: {
        padding: 40,
        alignItems: 'center',
    },
    readingBox: {
        paddingBottom: 20,
    },
    readingText: {
        lineHeight: 30,
        fontSize: 18,
        fontWeight: '500',
    },
    aiButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 24,
        borderWidth: 2,
        marginTop: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    }
});
