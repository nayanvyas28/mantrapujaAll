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

export default function HoroscopeScreen() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const { profile } = useAuth();
    const insets = useSafeAreaInsets();

    const [loading, setLoading] = useState(true);
    const [reading, setReading] = useState<string | null>(null);
    const [rashi, setRashi] = useState<string | null>(profile?.rashi || null);
    const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'yearly'>('daily');

    useEffect(() => {
        if (profile?.rashi) {
            setRashi(profile.rashi);
            fetchHoroscope(profile.rashi, activeTab);
        } else {
            setLoading(false);
        }
    }, [profile?.rashi, activeTab]);

    const fetchHoroscope = async (rashiName: string, tab: string) => {
        setLoading(true);
        try {
            if (tab === 'daily') {
                const now = new Date();
                const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                const { data, error } = await supabase
                    .from('daily_astro_notif')
                    .select('content')
                    .eq('rashi_name', rashiName)
                    .eq('target_date', today)
                    .maybeSingle();

                if (error && error.code !== 'PGRST116') console.error("Horoscope Fetch Error:", error);

                if (data && data.content) {
                    const content = typeof data.content === 'object' ? data.content.reading : data.content;
                    setReading(sanitizeText(content));
                } else {
                    setReading(sanitizeText(`[Mock Data] The cosmic energy today encourages spiritual reflection and inner peace for ${rashiName}. The alignment of stars suggests a day of growth and positive energy. Take a moment to meditate on your goals.`));
                }
            } else {
                const { data, error } = await supabase
                    .from('pages')
                    .select('content')
                    .eq('slug', `${rashiName.toLowerCase()}-${tab}`)
                    .maybeSingle();

                if (error && error.code !== 'PGRST116') console.error(`${tab} Horoscope Fetch Error:`, error);
                
                if (data && data.content) {
                    setReading(sanitizeText(data.content));
                } else {
                    if (tab === 'monthly') {
                        setReading(sanitizeText(`[Mock Data] The month ahead brings significant shifts in your cosmic alignment. The first half focuses on career opportunities and material growth, while the second half brings emotional fulfillment and relationship growth for ${rashiName}. Jupiter's influence provides a protective aura around your personal endeavors.`));
                    } else if (tab === 'yearly') {
                        setReading(sanitizeText(`[Mock Data] This year marks a major cycle of transformation for ${rashiName}. Saturn's transit promises discipline and long-term rewards in your spiritual and financial realms. Stay grounded as the middle of the year will bring pivotal choices that shape your ultimate destiny. Focus on your karma and consistency.`));
                    } else {
                        setReading(sanitizeText(`Your ${tab} reading will be available soon.`));
                    }
                }
            }
        } catch (err) {
            setReading(sanitizeText("Consult the divine within. Today's forecast is clouded, but your inner light remains bright."));
        } finally {
            setLoading(false);
        }
    };

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
                            onPress={() => router.push("/zodiac?from=horoscope")}
                        >
                            <Typography variant="h3" color="#fff">Select Rashi</Typography>
                        </TouchableOpacity>
                    </Card>
                ) : (
                    <>
                        <Card variant="solid" style={styles.readingCard}>
                            <View style={styles.rashiHeader}>
                                <Typography variant="h2" color={colors.saffron}>{rashi}</Typography>
                                <TouchableOpacity onPress={() => router.push("/zodiac?from=horoscope")}>
                                    <View style={[styles.changeBadge, { backgroundColor: colors.saffron + '15' }]}>
                                        <RefreshCw size={14} color={colors.saffron} />
                                        <Typography variant="label" color={colors.saffron} style={{ marginLeft: 6 }}>Change</Typography>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.tabsContainer, { backgroundColor: theme === 'dark' ? '#1e293b' : '#f1f5f9' }]}>
                                {['daily', 'monthly', 'yearly'].map((tab) => (
                                    <TouchableOpacity 
                                        key={tab} 
                                        style={[styles.tabButton, activeTab === tab && { backgroundColor: colors.saffron }]}
                                        onPress={() => setActiveTab(tab as any)}
                                    >
                                        <Typography 
                                            variant="label" 
                                            color={activeTab === tab ? '#FFF' : colors.mutedForeground}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </Typography>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.divider} />

                            {loading ? (
                                <View style={styles.loaderContainer}>
                                    <ActivityIndicator size="large" color={colors.saffron} />
                                    <Typography variant="bodySmall" style={{ marginTop: 12 }}>Consulting the stars...</Typography>
                                </View>
                            ) : (
                                <View style={styles.readingBox}>
                                    <Typography variant="body" style={styles.readingText}>
                                        {reading}
                                    </Typography>
                                </View>
                            )}
                        </Card>

                        <TouchableOpacity 
                            style={[styles.aiButton, { backgroundColor: colors.card, borderColor: colors.saffron }]}
                            onPress={() => router.push({
                                pathname: "/guru-ai",
                                params: { message: `Analyze my horoscope for ${rashi}` }
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
        borderRadius: 24,
        minHeight: 300,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    rashiHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    changeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    tabsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        borderRadius: 12,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 20,
    },
    loaderContainer: {
        padding: 40,
        alignItems: 'center',
    },
    readingBox: {
        paddingBottom: 20,
    },
    readingText: {
        lineHeight: 28,
        fontSize: 18,
    },
    aiButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        marginTop: 24,
    }
});
