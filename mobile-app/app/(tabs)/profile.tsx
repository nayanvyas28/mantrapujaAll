import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { Footer } from '../../components/ui/Footer';
import {
    LogOut,
    Ticket,
    BellRing,
    Palette,
    User,
    Users,
    ChevronRight,
    Globe,
    ShieldCheck,
    FileText,
    HelpCircle,
    Info,
    Calendar,
    Heart,
    Star,
    Trash2,
    Wallet,
    Settings
} from 'lucide-react-native';
import Config from '../../constants/Config';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { useTranslation } from 'react-i18next';

export default function ProfileTabScreen() {
    const router = useRouter();
    const { theme, colors, toggleTheme } = useTheme();
    const { user, profile, signOut } = useAuth();
    const { balance } = useWallet();
    const { t } = useTranslation();

    const name = profile?.full_name || user?.email?.split('@')[0] || "Guest User";
    const isGuest = !user;

    const handleProtectedNavigation = (route: string) => {
        if (isGuest) {
            Alert.alert(
                "Login Required",
                "Please log in or create an account to access this feature.",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Log In", onPress: () => router.replace('/login') }
                ]
            );
        } else {
            router.push(route as any);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            router.replace('/login');
        } catch (e) {
            console.error('Failed to logout', e);
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            "Delete Account & Data",
            "This will permanently delete your account and all associated data (birth details, reports, saved preferences). This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Permanently Delete", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            // In a real app, you would call a backend service to delete user data
                            // and purge from Supabase.
                            await signOut();
                            Alert.alert(
                                "Request Received", 
                                `Your account has been signed out. A data deletion request has been logged and will be processed within the next 30 days. For immediate confirmation, please email ${Config.supportEmail}.`
                            );
                            router.replace('/login');
                        } catch (e) {
                            console.error('Failed to delete account', e);
                            Alert.alert("Error", "Could not process deletion request. Please try again later.");
                        }
                    } 
                }
            ]
        );
    };

    const SettingItem = ({ icon: Icon, label, onPress, rightElement, isLast }: any) => (
        <TouchableOpacity
            style={[
                styles.listItem,
                !isLast && { borderBottomColor: colors.borderMuted, borderBottomWidth: 1 }
            ]}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.listItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: colors.muted + '20' }]}>
                    <Icon size={18} color={colors.saffron} />
                </View>
                <Typography variant="body" color={colors.foreground} style={{ marginLeft: 12 }}>{label}</Typography>
            </View>
            {rightElement ? rightElement : <ChevronRight size={18} color={colors.muted} />}
        </TouchableOpacity>
    );


    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Profile Header */}
                <View style={styles.header}>
                    {profile?.onboarding_data?.avatar_url ? (
                        <Image source={{ uri: profile.onboarding_data.avatar_url }} style={[styles.profileAvatar, { borderColor: colors.saffron, borderWidth: 2 }]} />
                    ) : (
                        <View style={[styles.profileAvatar, { borderColor: colors.saffron, borderWidth: 2 }]}>
                            <Typography variant="h1" color="#ffffff">{name.charAt(0)}</Typography>
                        </View>
                    )}
                    <View style={styles.profileInfo}>
                        <TouchableOpacity onPress={() => handleProtectedNavigation('/profile/edit')} style={styles.nameRow}>
                            <Typography variant="h2" color={colors.foreground}>
                                {name}
                            </Typography>
                            {!isGuest && <User size={16} color={colors.saffron} style={{ marginLeft: 8 }} />}
                        </TouchableOpacity>
                    </View>
                </View>


                {/* Account Settings */}
                <View style={styles.sectionContainer}>
                    <Typography variant="label" style={styles.sectionTitle} color={colors.mutedForeground}>
                        {t('profile.account', 'ACCOUNT')}
                    </Typography>
                    <Card variant="solid" style={styles.cardList}>
                        <SettingItem
                            icon={User}
                            label={t('profile.edit_profile', 'Edit Profile')}
                            onPress={() => handleProtectedNavigation('/profile/edit')}
                        />
                        <SettingItem
                            icon={Wallet}
                            label={t('profile.my_wallet', 'My Wallet')}
                            onPress={() => handleProtectedNavigation('/wallet')}
                            rightElement={<Typography variant="body" color={colors.saffron} style={{ fontWeight: 'bold' }}>₹{balance}</Typography>}
                        />
                        <SettingItem
                            icon={Ticket}
                            label={t('profile.my_bookings', 'My Bookings')}
                            onPress={() => handleProtectedNavigation('/profile/bookings')}
                            isLast
                        />
                    </Card>
                </View>

                {/* Admin Tools - Visible only to Admins */}
                {(profile?.role === 'admin' || profile?.is_admin) && (
                    <View style={styles.sectionContainer}>
                        <Typography variant="label" style={styles.sectionTitle} color={colors.saffron}>
                            ADMINISTRATIVE TOOLS
                        </Typography>
                        <Card variant="solid" style={[styles.cardList, { borderColor: colors.saffron + '30', borderWidth: 1 }]}>
                            <SettingItem
                                icon={Settings}
                                label="Kundli API Manager"
                                onPress={() => router.push('/admin/kundli-api')}
                                isLast
                            />
                        </Card>
                    </View>
                )}



                {/* Preferences */}
                <View style={styles.sectionContainer}>
                    <Typography variant="label" style={styles.sectionTitle} color={colors.mutedForeground}>
                        {t('profile.preferences', 'PREFERENCES')}
                    </Typography>
                    <Card variant="solid" style={styles.cardList}>
                        <SettingItem
                            icon={BellRing}
                            label={t('profile.notifications', 'Notifications')}
                            onPress={() => handleProtectedNavigation('/profile/notifications')}
                        />
                        <SettingItem
                            icon={Globe}
                            label={t('profile.title', 'Language')}
                            onPress={() => router.push('/profile/language')}
                        />
                        <SettingItem
                            icon={Palette}
                            label={t('profile.dark_mode', 'Dark Mode')}
                            rightElement={
                                <Switch
                                    value={theme === 'dark'}
                                    onValueChange={toggleTheme}
                                    trackColor={{ false: '#cbd5e1', true: colors.saffron }}
                                    thumbColor="#ffffff"
                                />
                            }
                            isLast
                        />
                    </Card>
                </View>

                {/* Support & Legal */}
                <View style={styles.sectionContainer}>
                    <Typography variant="label" style={styles.sectionTitle} color={colors.mutedForeground}>
                        {t('profile.support_legal', 'SUPPORT & LEGAL')}
                    </Typography>
                    <Card variant="solid" style={styles.cardList}>
                        <SettingItem
                            icon={HelpCircle}
                            label={t('profile.help_support', 'Help & Support')}
                            onPress={() => router.push('/profile/support')}
                        />
                        <SettingItem
                            icon={ShieldCheck}
                            label={t('profile.privacy_policy', 'Privacy Policy')}
                            onPress={() => router.push('/profile/legal')}
                        />
                        <SettingItem
                            icon={FileText}
                            label={t('profile.terms_service', 'Terms of Service')}
                            onPress={() => router.push('/profile/legal')}
                        />
                        <SettingItem
                            icon={Info}
                            label={t('profile.about_us', 'About Us')}
                            onPress={() => router.push('/profile/about')}
                            isLast
                        />
                    </Card>
                </View>

                {/* Logout or Account Deletion */}
                {!isGuest && (
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <LogOut size={20} color="#ef4444" />
                            <Typography variant="body" style={{ marginLeft: 8, fontWeight: '600' }} color="#ef4444">
                                {t('profile.log_out', 'Log Out')}
                            </Typography>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.deleteButton, { marginTop: 12 }]} 
                            onPress={handleDeleteAccount}
                        >
                            <Trash2 size={20} color={colors.muted} />
                            <Typography variant="body" style={{ marginLeft: 8 }} color={colors.muted}>
                                {t('profile.delete_account', 'Delete Account')}
                            </Typography>
                        </TouchableOpacity>
                    </View>
                )}

                {isGuest && (
                    <TouchableOpacity
                        style={[styles.logoutButton, { backgroundColor: 'rgba(249, 115, 22, 0.08)', borderColor: 'rgba(249, 115, 22, 0.15)', marginTop: 10 }]}
                        onPress={() => router.replace('/login')}
                    >
                        <User size={20} color="#f97316" />
                        <Typography variant="body" style={{ marginLeft: 8, fontWeight: '600' }} color="#f97316">
                            {t('profile.log_in', 'Log In / Create Account')}
                        </Typography>
                    </TouchableOpacity>
                )}

                {/* Version Info */}
                <Typography variant="label" color={colors.muted} style={styles.versionInfo}>
                    Version {Config.version}
                </Typography>

                <Footer />
                <View style={{ height: 40 }} />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 80,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    profileAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f97316',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    profileInfo: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        marginBottom: 10,
        marginLeft: 4,
        letterSpacing: 1,
        fontSize: 10,
        fontWeight: '700',
    },
    cardList: {
        padding: 0,
        overflow: 'hidden',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    listItemLeft: {
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
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: 10,
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.15)',
    },
    versionInfo: {
        textAlign: 'center',
        marginTop: 24,
        marginBottom: 24,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    }
});
