import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Bell, Gift, Info } from 'lucide-react-native';
import { supabase } from '../../utils/supabase';

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
    const { colors } = useTheme();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

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
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />

            {/* Header */}
            <View style={[styles.header, { borderBottomColor: colors.borderMuted, backgroundColor: colors.card }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3">Inbox</Typography>
                <View style={{ width: 40 }} />
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={colors.saffron} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {notifications.length === 0 ? (
                        <View style={styles.center}>
                            <Bell size={48} color={colors.borderMuted} style={{ marginBottom: 16 }} />
                            <Typography variant="h3" color={colors.mutedForeground}>No Notifications Yet</Typography>
                            <Typography variant="body" color={colors.mutedForeground} style={{ textAlign: 'center', marginTop: 8 }}>
                                Updates from the Mantrapuja team will appear here.
                            </Typography>
                        </View>
                    ) : (
                        notifications.map((notif) => (
                            <TouchableOpacity
                                key={notif.id}
                                style={[styles.notificationCard, { backgroundColor: notif.is_read ? colors.background : colors.card, borderColor: colors.borderMuted }]}
                                onPress={() => markAsRead(notif.id, notif.is_read)}
                                activeOpacity={0.7}
                            >
                                {!notif.is_read && <View style={[styles.unreadDot, { backgroundColor: colors.saffron }]} />}

                                <View style={styles.cardHeader}>
                                    <View style={[styles.iconContainer, { backgroundColor: colors.saffron + '15' }]}>
                                        {getIconForType(notif.type)}
                                    </View>
                                    <View style={styles.titleContainer}>
                                        <Typography variant="body" style={{ fontWeight: notif.is_read ? '500' : '700' }}>
                                            {notif.title}
                                        </Typography>
                                        <Typography variant="bodySmall" color={colors.mutedForeground}>
                                            {formatDate(notif.created_at)}
                                        </Typography>
                                    </View>
                                </View>

                                {notif.image_url && (
                                    <Image source={{ uri: notif.image_url }} style={styles.notificationImage} resizeMode="cover" />
                                )}

                                <Typography variant="body" color={colors.foreground} style={{ marginTop: 12, opacity: notif.is_read ? 0.8 : 1 }}>
                                    {notif.message}
                                </Typography>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            )}
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
        paddingTop: 60,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
    scrollContent: { padding: 16, paddingBottom: 40 },
    notificationCard: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12,
        position: 'relative',
        overflow: 'hidden',
    },
    unreadDot: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    notificationImage: {
        width: '100%',
        height: 150,
        borderRadius: 12,
        marginTop: 12,
    }
});
