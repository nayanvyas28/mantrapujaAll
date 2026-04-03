import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { Footer } from '../../components/ui/Footer';
import { ArrowLeft, Bell, Gift, Info } from 'lucide-react-native';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

type Notification = {
    id: string;
    title: string;
    message: string;
    type: string;
    image_url: string | null;
    created_at: string;
    is_read: boolean;
};

export default function NotificationsScreen() {
    const router = useRouter();
    const { theme, colors } = useTheme();
    const { profile } = useAuth();
    const { t } = useTranslation();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, [profile]);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) return;

            // Fetch notifications (targeted at user OR broadcast to all)
            const { data: notifData, error: notifError } = await supabase
                .from('notifications')
                .select('*')
                .gte('created_at', session.user.created_at)
                .order('created_at', { ascending: false })
                .limit(50);

            if (notifError) throw notifError;

            // Fetch user's read receipts
            const { data: readData, error: readError } = await supabase
                .from('user_notification_reads')
                .select('notification_id')
                .eq('user_id', session.user.id);

            if (readError) throw readError;

            const readIds = new Set(readData.map(r => r.notification_id));

            // Merge read status into notifications
            const merged = (notifData || []).map(n => ({
                ...n,
                is_read: readIds.has(n.id)
            }));

            setNotifications(merged);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId: string, isRead: boolean) => {
        if (isRead) return; // Already read

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) return;

            // Optimistic update
            setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n));

            // Insert into DB
            await supabase
                .from('user_notification_reads')
                .insert([{ user_id: session.user.id, notification_id: notificationId }]);
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'PROMO': return <Gift size={20} color={colors.saffron} />;
            case 'BOOKING_UPDATE': return <Bell size={20} color={colors.saffron} />;
            default: return <Info size={20} color={colors.saffron} />;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h2" color={colors.foreground}>{t('notifications.title', 'Notifications')}</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.saffron} style={{ marginTop: 40 }} />
                ) : notifications.length === 0 ? (
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Bell size={48} color={colors.borderMuted} style={{ marginBottom: 16 }} />
                        <Typography variant="body" color={colors.mutedForeground}>
                            {t('notifications.no_notifications', 'No new notifications.')}
                        </Typography>
                    </View>
                ) : (
                    notifications.map((notif) => (
                        <TouchableOpacity
                            key={notif.id}
                            activeOpacity={0.8}
                            onPress={() => markAsRead(notif.id, notif.is_read)}
                            style={[
                                styles.notifCard,
                                { backgroundColor: notif.is_read ? (theme === 'dark' ? '#1e293b' : '#f8fafc') : (theme === 'dark' ? '#334155' : '#ffffff'), borderColor: colors.borderMuted },
                                !notif.is_read && { borderColor: colors.saffron, borderWidth: 1 }
                            ]}
                        >
                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: notif.is_read ? 'transparent' : colors.saffron + '15' }]}>
                                    {getIconForType(notif.type)}
                                </View>
                                <View style={styles.notifInfo}>
                                    <View style={styles.titleRow}>
                                        <Typography variant="body" style={{ fontWeight: notif.is_read ? '500' : '700' }} color={colors.foreground}>
                                            {notif.title}
                                        </Typography>
                                        {!notif.is_read && <View style={[styles.unreadDot, { backgroundColor: colors.saffron }]} />}
                                    </View>

                                    <Typography variant="bodySmall" color={colors.mutedForeground} style={{ marginTop: 4, opacity: notif.is_read ? 0.8 : 1 }}>
                                        {notif.message}
                                    </Typography>

                                    <Typography variant="label" color={colors.muted} style={{ marginTop: 8 }}>
                                        {formatDate(notif.created_at)}
                                    </Typography>
                                </View>
                            </View>

                            {notif.image_url && (
                                <Image source={{ uri: notif.image_url }} style={styles.notificationImage} resizeMode="cover" />
                            )}
                        </TouchableOpacity>
                    ))
                )}

                <View style={{ marginTop: 32 }}>
                    <Footer />
                </View>
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
        borderBottomWidth: 1,
        zIndex: 10,
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    notifCard: {
        padding: 16,
        borderRadius: 12,
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 1,
        marginBottom: 16,
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    notifInfo: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    notificationImage: {
        width: '100%',
        height: 150,
        borderRadius: 12,
        marginTop: 16,
    }
});
