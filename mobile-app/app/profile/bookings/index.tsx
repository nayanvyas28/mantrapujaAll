import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../../components/ui/Typography';
import { Card } from '../../../components/ui/Card';
import { useTheme } from '../../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Calendar, User, ChevronRight, Ticket } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookingsScreen() {
    const router = useRouter();
    const { colors } = useTheme();

    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const stored = await AsyncStorage.getItem('my_bookings');
                if (stored) {
                    setBookings(JSON.parse(stored).reverse());
                }
            } catch (error) {
                console.error('Failed to load bookings', error);
            } finally {
                setLoading(false);
            }
        };
        loadBookings();
    }, []);

    const BookingCard = ({ id, title, date, status, type }: any) => (
        <Card variant="solid" style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
                <View style={[styles.typeBadge, { backgroundColor: colors.saffron + '15' }]}>
                    <Typography variant="label" color={colors.saffron}>{type}</Typography>
                </View>
                <Typography variant="label" color={status === 'Confirmed' ? colors.success : colors.mutedForeground}>
                    {status}
                </Typography>
            </View>
            <Typography variant="body" style={{ fontWeight: '700', marginVertical: 8 }}>{title}</Typography>
            <View style={styles.bookingFooter}>
                <View style={styles.infoRow}>
                    <Calendar size={14} color={colors.muted} />
                    <Typography variant="bodySmall" color={colors.mutedForeground} style={{ marginLeft: 6 }}>{date}</Typography>
                </View>
                <TouchableOpacity onPress={() => router.push(`/profile/bookings/${id}`)}>
                    <Typography variant="bodySmall" color={colors.saffron}>View Details</Typography>
                </TouchableOpacity>
            </View>
        </Card>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />

            <View style={[styles.header, { borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3">My Bookings</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.saffron} style={{ marginTop: 40 }} />
                ) : bookings.length === 0 ? (
                    <View style={{ alignItems: 'center', marginTop: '40%' }}>
                        <Ticket size={48} color={colors.borderMuted} style={{ marginBottom: 16 }} />
                        <Typography variant="body" color={colors.mutedForeground}>You do not have any bookings yet.</Typography>
                    </View>
                ) : (
                    <>
                        {bookings.map((booking: any) => (
                            <BookingCard
                                key={booking.id}
                                id={booking.id}
                                title={booking.pooja_name}
                                date={`${booking.pooja_date} ${booking.pooja_time ? `, ${booking.pooja_time}` : ''}`}
                                status="Confirmed"
                                type="Puja"
                            />
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        padding: 24,
    },
    sectionHeader: {
        marginBottom: 12,
        letterSpacing: 1,
    },
    bookingCard: {
        marginBottom: 16,
        padding: 16,
    },
    bookingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    typeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    bookingFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        paddingTop: 12,
        marginTop: 4,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
