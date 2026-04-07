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
import { LinearGradient } from 'expo-linear-gradient';
import { Sun, Sparkles, Megaphone, Calendar as CalendarIcon } from 'lucide-react-native';

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

        // Subscribe to real-time notification updates
        const channel = supabase
            .channel('notification-updates')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications'
                },
                (payload) => {
                    const newNotif = payload.new as Notification;
                    // Check if notification is relevant to the user (broadcast OR targeted)
                    if (!newNotif.target_user_id || newNotif.target_user_id === profile?.id) {
                        setNotifications(prev => [
                            { ...newNotif, is_read: false },
                            ...prev
                        ]);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
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
            case 'DAILY_SUMMARY': return <Sun size={22} color={colors.saffron} />;
            case 'PROMO': return <Gift size={22} color="#f43f5e" />;
            case 'NEWS': return <Megaphone size={22} color="#0ea5e9" />;
            case 'BOOKING_UPDATE': return <CalendarIcon size={22} color="#10b981" />;
            default: return <Sparkles size={22} color={colors.saffron} />;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const renderMessageWithChips = (message: string) => {
        // Regex to find [TYPE: content]
        const markerRegex = /\[(TITHI|FEST):\s*([^\]]+)\]/g;
        const chips: React.ReactNode[] = [];
        let cleanMessage = message;

        let match;
        while ((match = markerRegex.exec(message)) !== null) {
            const type = match[1];
            const content = match[2];
            
            chips.push(
                <View key={`${type}-${content}`} style={[styles.dataChip, { backgroundColor: type === 'TITHI' ? colors.saffron + '15' : 'rgba(16, 185, 129, 0.1)' }]}>
                    {type === 'TITHI' ? <Moon size={12} color={colors.saffron} /> : <Sparkles size={12} color="#10b981" />}
                    <Typography variant="label" style={{ fontSize: 10, marginLeft: 4, textTransform: 'none' }} color={type === 'TITHI' ? colors.saffron : '#10b981'}>
                        {content}
                    </Typography>
                </View>
            );
            
            // Remove the marker from the clean message
            cleanMessage = cleanMessage.replace(match[0], '');
        }

        return (
            <View>
                {chips.length > 0 && <View style={styles.chipsContainer}>{chips}</View>}
                <Typography variant="bodySmall" color={colors.foreground} style={{ marginTop: 6, lineHeight: 20, opacity: 0.9, fontWeight: '400' }}>
                    {cleanMessage.trim().replace(/\s+/g, ' ')}
                </Typography>
            </View>
        );
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
                
                {notifications.some(n => !n.is_read) ? (
                    <TouchableOpacity onPress={() => notifications.forEach(n => markAsRead(n.id, n.is_read))}>
                        <Typography variant="label" color={colors.saffron} style={{ fontSize: 10 }}>Mark All Read</Typography>
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 60 }} />
                )}
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
                                styles.premiumCard,
                                { 
                                    backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.4)' : '#ffffff',
                                    borderColor: notif.is_read ? colors.borderMuted : colors.saffron + '60',
                                    borderWidth: notif.is_read ? 1 : 1.5,
                                }
                            ]}
                        >
                            {!notif.is_read && (
                                <LinearGradient
                                    colors={[colors.saffron, '#fb923c']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.newBadgeGradient}
                                >
                                    <Typography variant="label" style={{ fontSize: 9, color: '#fff', fontWeight: '900' }}>NEW</Typography>
                                </LinearGradient>
                            )}
                            
                            <View style={styles.cardHeader}>
                                <View style={[styles.styledIconBox, { backgroundColor: theme === 'dark' ? '#1e293b' : '#f8fafc', borderColor: notif.is_read ? colors.borderMuted : colors.saffron + '30' }]}>
                                    {getIconForType(notif.type)}
                                </View>
                                <View style={styles.notifInfo}>
                                    <View style={styles.titleRow}>
                                        <Typography variant="body" style={{ fontWeight: '800', letterSpacing: -0.3, fontSize: 17 }} color={colors.foreground}>
                                            {notif.title}
                                        </Typography>
                                    </View>

                                    {renderMessageWithChips(notif.message)}

                                    <View style={styles.metaRow}>
                                        <Typography variant="label" color={colors.muted} style={{ fontSize: 10, fontWeight: '700' }}>
                                            {formatDate(notif.created_at)}
                                        </Typography>
                                        <View style={[styles.typeTag, { backgroundColor: notif.type === 'DAILY_SUMMARY' ? 'rgba(249, 115, 22, 0.1)' : 'rgba(99, 102, 241, 0.1)' }]}>
                                            <Typography variant="label" style={{ fontSize: 9, color: notif.type === 'DAILY_SUMMARY' ? colors.saffron : '#6366f1' }}>
                                                {notif.type === 'DAILY_SUMMARY' ? '✨ SPIRITUAL' : notif.type}
                                            </Typography>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {notif.image_url && (
                                <Image source={{ uri: notif.image_url }} style={styles.premiumImage} resizeMode="cover" />
                            )}
                            
                            {!notif.is_read && (
                                <View style={[styles.unreadGlow, { backgroundColor: colors.saffron }]} />
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
    premiumCard: {
        padding: 18,
        borderRadius: 24,
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 15,
        elevation: 4,
    },
    newBadgeGradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderBottomLeftRadius: 16,
        zIndex: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    styledIconBox: {
        width: 56,
        height: 56,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    notifInfo: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
    },
    typeTag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    premiumImage: {
        width: '100%',
        height: 160,
        borderRadius: 16,
        marginTop: 16,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 4,
        marginBottom: 4,
    },
    dataChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    unreadGlow: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
    }
});
