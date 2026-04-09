import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../../components/ui/Typography';
import { Card } from '../../../components/ui/Card';
import { useTheme } from '../../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    User,
    FileText,
    CreditCard,
    Download,
    Share2,
    MessageCircle,
    Copy
} from 'lucide-react-native';

export default function BookingDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { colors } = useTheme();

    // In a real app, fetch data based on ID
    const booking = {
        id: id || '101',
        title: 'Maha Mrityunjaya Jaap',
        date: '14 April 2024',
        time: '09:00 AM - 11:30 AM',
        status: 'Confirmed',
        type: 'Puja',
        pandit: 'Pandit Somnath Sharma',
        location: 'Kashi Vishwanath Temple, Varanasi (or Virtual)',
        amount: '₹5,100',
        transactionId: 'TXN88294021',
        description: 'A powerful puja dedicated to Lord Shiva for good health and longevity.',
        instructions: [
            'Please take a bath before the ceremony begins.',
            'Keep some flowers and fruits ready if attending virtually.',
            'Maintain silence during the Mantrachar.'
        ]
    };

    const onShare = async () => {
        try {
            await Share.share({
                message: `Booking Details for ${booking.title}\nDate: ${booking.date}\nStatus: ${booking.status}`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const InfoRow = ({ icon: Icon, label, value, showCopy }: any) => (
        <View style={styles.infoRow}>
            <View style={[styles.iconContainer, { backgroundColor: colors.saffron + '10' }]}>
                <Icon size={18} color={colors.saffron} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Typography variant="label" color={colors.mutedForeground}>{label}</Typography>
                <Typography variant="body" style={{ fontWeight: '600' }}>{value}</Typography>
            </View>
            {showCopy && (
                <TouchableOpacity onPress={() => { }}>
                    <Copy size={16} color={colors.muted} />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />

            <View style={[styles.header, { borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3">Booking Details</Typography>
                <TouchableOpacity style={styles.shareButton} onPress={onShare}>
                    <Share2 size={20} color={colors.foreground} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Status Card */}
                <Card variant="solid" style={styles.statusCard}>
                    <View style={styles.statusHeader}>
                        <View style={[styles.typeBadge, { backgroundColor: colors.saffron + '15' }]}>
                            <Typography variant="label" color={colors.saffron}>{booking.type}</Typography>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
                            <Typography variant="label" color={colors.success}>{booking.status}</Typography>
                        </View>
                    </View>
                    <Typography variant="h2" style={styles.title}>{booking.title}</Typography>
                    <Typography variant="bodySmall" color={colors.mutedForeground}>{booking.description}</Typography>
                </Card>

                {/* Main Info */}
                <Typography variant="label" color={colors.mutedForeground} style={styles.sectionTitle}>SCHEDULE & LOCATION</Typography>
                <Card variant="solid" style={styles.infoCard}>
                    <InfoRow icon={Calendar} label="Date" value={booking.date} />
                    <View style={[styles.divider, { backgroundColor: colors.borderMuted }]} />
                    <InfoRow icon={Clock} label="Time" value={booking.time} />
                    <View style={[styles.divider, { backgroundColor: colors.borderMuted }]} />
                    <InfoRow icon={MapPin} label="Location" value={booking.location} />
                </Card>

                {/* Pandit Info */}
                <Typography variant="label" color={colors.mutedForeground} style={styles.sectionTitle}>PANDIT DETAILS</Typography>
                <Card variant="solid" style={styles.infoCard}>
                    <View style={styles.panditRow}>
                        <View style={[styles.panditAvatar, { backgroundColor: colors.saffron }]}>
                            <User size={24} color="#ffffff" />
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Typography variant="body" style={{ fontWeight: '700' }}>{booking.pandit}</Typography>
                            <Typography variant="bodySmall" color={colors.mutedForeground}>Vedic Scholar & Priest</Typography>
                        </View>
                        <TouchableOpacity style={[styles.chatBtn, { borderColor: colors.saffron }]}>
                            <MessageCircle size={18} color={colors.saffron} />
                        </TouchableOpacity>
                    </View>
                </Card>

                {/* Instructions */}
                <Typography variant="label" color={colors.mutedForeground} style={styles.sectionTitle}>INSTRUCTIONS</Typography>
                <Card variant="solid" style={styles.infoCard}>
                    {booking.instructions.map((item, index) => (
                        <View key={index} style={styles.instructionItem}>
                            <View style={[styles.dot, { backgroundColor: colors.saffron }]} />
                            <Typography variant="bodySmall" style={{ flex: 1 }}>{item}</Typography>
                        </View>
                    ))}
                </Card>

                {/* Payment Info */}
                <Typography variant="label" color={colors.mutedForeground} style={styles.sectionTitle}>PAYMENT SUMMARY</Typography>
                <Card variant="solid" style={styles.infoCard}>
                    <InfoRow icon={CreditCard} label="Total Paid" value={booking.amount} />
                    <View style={[styles.divider, { backgroundColor: colors.borderMuted }]} />
                    <InfoRow icon={FileText} label="Transaction ID" value={booking.transactionId} showCopy />
                </Card>

                <TouchableOpacity style={[styles.downloadBtn, { backgroundColor: colors.saffron }]}>
                    <Download size={18} color="#ffffff" style={{ marginRight: 8 }} />
                    <Typography variant="body" color="#ffffff" style={{ fontWeight: '700' }}>Download Invoice</Typography>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
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
    shareButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        padding: 24,
    },
    statusCard: {
        padding: 20,
        marginBottom: 24,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    typeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 20,
    },
    title: {
        marginBottom: 8,
    },
    sectionTitle: {
        marginBottom: 12,
        letterSpacing: 1,
    },
    infoCard: {
        padding: 16,
        marginBottom: 24,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        marginVertical: 12,
    },
    panditRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    panditAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 6,
        marginRight: 10,
    },
    downloadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    }
});
