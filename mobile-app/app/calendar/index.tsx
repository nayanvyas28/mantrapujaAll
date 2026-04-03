import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { Footer } from '../../components/ui/Footer';
import { ArrowLeft, Ticket, ChevronRight } from 'lucide-react-native';
import { CalendarGrid } from '../../components/CalendarGrid';
import { supabase } from '../../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function CalendarScreen() {
    const router = useRouter();
    const { theme, colors } = useTheme();
    const { t } = useTranslation();
    const [viewMode, setViewMode] = useState<'festivals' | 'calendar'>('festivals');
    const [festivals, setFestivals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(4);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [latestBooking, setLatestBooking] = useState<any>(null);
    const [selectedFestival, setSelectedFestival] = useState<any>(null);

    // Optimize: Memoize filtered upcoming festivals
    const upcomingFestivals = useMemo(() => {
        const now = new Date();
        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        return festivals.filter(f => (f.date || '') >= today);
    }, [festivals]);

    // Optimize: Memoize current display list with pagination
    const displayList = useMemo(() => {
        return upcomingFestivals.slice(0, visibleCount);
    }, [upcomingFestivals, visibleCount]);

    useEffect(() => {
        fetchFestivals();
    }, []);

    const fetchFestivals = async () => {
        try {
            setLoading(true);
            const cached = await AsyncStorage.getItem('cached_all_festivals');
            if (cached) {
                setFestivals(JSON.parse(cached));
                setLoading(false);
            }

            const { data, error } = await supabase
                .from('festivals')
                .select('*')
                .eq('is_active', true)
                .order('date', { ascending: true });

            if (error) throw error;
            if (data) {
                setFestivals(data);
                await AsyncStorage.setItem('cached_all_festivals', JSON.stringify(data));
            }
        } catch (err) {
            console.error('Error fetching festivals:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const stored = await AsyncStorage.getItem('my_bookings');
                if (stored) {
                    const bookingsList = JSON.parse(stored);
                    if (bookingsList.length > 0) {
                        setLatestBooking(bookingsList[bookingsList.length - 1]);
                    }
                }
            } catch (e) { }
        };
        loadBookings();
    }, []);

    const festivalsMap = useMemo(() => {
        const map: Record<string, any> = {};
        festivals.forEach(f => {
            if (f.date) map[f.date] = f;
        });
        return map;
    }, [festivals]);

    const handleDateSelect = (date: Date, festival?: any) => {
        if (festival) {
            const shortMonth = festival.month ? festival.month.substring(0, 3) : '';
            const dayNum = festival.date ? festival.date.split('-')[2] : '';
            setSelectedFestival({
                id: festival.id,
                name: festival.name,
                desc: festival.description || '',
                date: `${shortMonth} ${dayNum}`,
                fullDate: festival.date // Store full ISO date for comparison
            });
        } else {
            setSelectedFestival(null);
        }
    };

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/');
        }
    };

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        // Artificial delay for UI feedback and frame stability
        setTimeout(() => {
            setVisibleCount(prev => prev + 10);
            setIsLoadingMore(false);
        }, 500);
    };

    const renderFestivalItem = (fest: any) => (
        <TouchableOpacity key={fest.id} activeOpacity={0.8} onPress={() => router.push(`/calendar/${fest.id}`)}>
            <Card variant="solid" style={styles.festivalListCard}>
                <View style={[styles.festivalDateBox, { backgroundColor: theme === 'dark' ? '#334155' : '#ffffff' }]}>
                    <Typography variant="label" color={colors.saffron}>{fest.month?.substring(0, 3).toUpperCase()}</Typography>
                    <Typography variant="h2" color={colors.foreground}>{fest.date?.split('-')[2]}</Typography>
                </View>
                <View style={styles.festivalListInfo}>
                    <Typography variant="body" style={{ fontWeight: 'bold' }} color={colors.foreground}>{fest.name}</Typography>
                    <Typography variant="bodySmall" color={colors.mutedForeground} style={{ marginTop: 4 }}>{fest.description}</Typography>
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.background }]}>
                <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h2" color={colors.foreground}>{t('calendar.title', 'Festivals')}</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                removeClippedSubviews={Platform.OS === 'android'}
            >
                {/* User Bookings Section */}
                {latestBooking && (
                    <View style={styles.bookingsSection}>
                        <View style={styles.sectionHeader}>
                            <Typography variant="h3" color={colors.foreground}>{t('calendar.my_bookings', 'My Bookings')}</Typography>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/profile/bookings')}>
                            <Card variant="solid" style={styles.bookingCard}>
                                <View style={[styles.iconBox, { backgroundColor: theme === 'dark' ? colors.muted + '20' : '#ffffff' }]}>
                                    <Ticket size={24} color={colors.saffron} />
                                </View>
                                <View style={styles.bookingInfo}>
                                    <Typography variant="body" style={{ fontWeight: 'bold' }} color={colors.foreground}>{latestBooking.pooja_name}</Typography>
                                    <Typography variant="bodySmall" color={colors.saffron} style={{ marginTop: 4 }}>{t('calendar.confirmed', 'Confirmed')} • {latestBooking.pooja_date}</Typography>
                                </View>
                                <ChevronRight size={20} color={colors.muted} />
                            </Card>
                        </TouchableOpacity>
                    </View>
                )}

                {/* View Toggles */}
                <View style={[styles.toggleWrapper, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                    <TouchableOpacity
                        style={[styles.toggleBtn, viewMode === 'festivals' && { backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9' }]}
                        onPress={() => setViewMode('festivals')}
                    >
                        <Typography variant="label" color={viewMode === 'festivals' ? colors.foreground : colors.muted}>{t('calendar.recent_upcoming', 'Recent / Upcoming')}</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleBtn, viewMode === 'calendar' && { backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9' }]}
                        onPress={() => setViewMode('calendar')}
                    >
                        <Typography variant="label" color={viewMode === 'calendar' ? colors.foreground : colors.muted}>{t('calendar.calendar_view', 'Hindu Calendar View')}</Typography>
                    </TouchableOpacity>
                </View>

                {/* Main Content */}
                {viewMode === 'festivals' ? (
                    <View style={styles.listContainer}>
                        {loading && festivals.length === 0 ? (
                            <ActivityIndicator color={colors.saffron} style={{ marginVertical: 20 }} />
                        ) : (
                            <View>
                                {displayList.map(renderFestivalItem)}
                                
                                {visibleCount < upcomingFestivals.length && (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        disabled={isLoadingMore}
                                        style={[styles.viewAllButton, { borderColor: colors.border, opacity: isLoadingMore ? 0.6 : 1 }]}
                                        onPress={handleLoadMore}
                                    >
                                        {isLoadingMore ? (
                                            <ActivityIndicator color={colors.saffron} />
                                        ) : (
                                            <Typography variant="body" color={colors.foreground} style={{ fontWeight: '600' }}>
                                                {t('calendar.view_more', 'View More Festivals')}
                                            </Typography>
                                        )}
                                    </TouchableOpacity>
                                )}
                                {visibleCount >= upcomingFestivals.length && upcomingFestivals.length > 4 && (
                                    <View style={styles.infoBox}>
                                        <Typography variant="body" color={colors.mutedForeground} style={{ textAlign: 'center' }}>
                                            {"Don't see your festival? Currently we're only highlighting major events."}
                                        </Typography>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={styles.calendarContainer}>
                        <CalendarGrid onSelectDate={handleDateSelect} festivalsMap={festivalsMap} />
                        {selectedFestival && (
                            <TouchableOpacity activeOpacity={0.9} style={styles.previewContainer} onPress={() => router.push(`/calendar/${selectedFestival.id}`)}>
                                <Card variant="glass" style={[styles.previewCard, { borderColor: colors.saffron }]}>
                                    <View style={styles.previewHeader}>
                                        <View style={styles.previewInfo}>
                                            {(() => {
                                                const now = new Date();
                                                const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                                                let statusLabel = t('calendar.upcoming_label', 'UPCOMING');
                                                
                                                if (selectedFestival.fullDate === todayStr) {
                                                    statusLabel = t('calendar.today_label', 'TODAY');
                                                } else if (selectedFestival.fullDate < todayStr) {
                                                    statusLabel = t('calendar.past_label', 'PAST');
                                                }

                                                return (
                                                    <Typography variant="label" color={colors.saffron}>
                                                        {selectedFestival.date} • {statusLabel}
                                                    </Typography>
                                                );
                                            })()}
                                            <Typography variant="h3" style={{ marginTop: 4 }}>{selectedFestival.name}</Typography>
                                            <Typography variant="bodySmall" color={colors.mutedForeground} numberOfLines={2} style={{ marginTop: 4 }}>{selectedFestival.desc}</Typography>
                                        </View>
                                        <View style={[styles.goIcon, { backgroundColor: colors.saffron }]}>
                                            <ChevronRight size={24} color="#fff" />
                                        </View>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        )}
                        <View style={styles.calendarLegend}>
                            <View style={styles.legendItem}>
                                <View style={[styles.dot, { backgroundColor: colors.saffron }]} />
                                <Typography variant="bodySmall" color={colors.mutedForeground}>{t('calendar.legend_festival', 'Festival / Tithi')}</Typography>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.dot, { backgroundColor: colors.muted }]} />
                                <Typography variant="bodySmall" color={colors.mutedForeground}>{t('calendar.legend_today', 'Today')}</Typography>
                            </View>
                        </View>
                    </View>
                )}

                <Footer />
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
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 16,
        zIndex: 10,
    },
    backBtn: { width: 40, height: 40, justifyContent: 'center' },
    scrollContent: { padding: 24, paddingBottom: 40 },
    bookingsSection: { marginBottom: 32 },
    sectionHeader: { marginBottom: 16 },
    bookingCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, elevation: 2 },
    iconBox: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    bookingInfo: { flex: 1 },
    toggleWrapper: { flexDirection: 'row', borderRadius: 12, borderWidth: 1, padding: 4, marginBottom: 24 },
    toggleBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
    listContainer: { gap: 16 },
    infoBox: { marginTop: 24, padding: 16 },
    calendarContainer: { marginBottom: 24 },
    previewContainer: { marginTop: 20 },
    previewCard: { padding: 16, borderWidth: 1, borderRadius: 16 },
    previewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    previewInfo: { flex: 1, marginRight: 16 },
    goIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    calendarLegend: { flexDirection: 'row', justifyContent: 'center', marginTop: 16, gap: 20 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    dot: { width: 6, height: 6, borderRadius: 3 },
    festivalListCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, elevation: 2, marginBottom: 16 },
    festivalDateBox: { alignItems: 'center', justifyContent: 'center', borderRadius: 12, padding: 12, minWidth: 70, marginRight: 16 },
    festivalListInfo: { flex: 1 },
    viewAllButton: { width: '100%', paddingVertical: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 16, marginTop: 8 }
});
