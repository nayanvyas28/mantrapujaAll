import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Share, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Copy, Share2, Users, Gift, TrendingUp, CheckCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import * as Clipboard from 'expo-clipboard';
import { supabase } from '../../utils/supabase';

export default function ReferralScreen() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const { profile } = useAuth();
    const { transactions } = useWallet();
    const insets = useSafeAreaInsets();
    const isDark = theme === 'dark';

    const referralCode = profile?.referral_code || 'MANTRA-JOIN';
    const referralCredits = transactions.filter(t => t.category === 'referral');
    const totalEarned = referralCredits.reduce((sum, t) => sum + t.amount, 0);
    const friendsCount = referralCredits.length;
    const [referralMessageTemplate, setReferralMessageTemplate] = useState('Join me on Mantra Puja and unlock your spiritual journey! Use my referral code ${referralCode} to join.\n\nDownload now: https://mantrapuja.com/app');

    useEffect(() => {
        const fetchReferralMessage = async () => {
            try {
                const { data, error } = await supabase
                    .from('settings')
                    .select('value')
                    .eq('key', 'referral_message')
                    .single();
                
                if (!error && data?.value) {
                    setReferralMessageTemplate(data.value);
                }
            } catch (err) {
                console.error('Error fetching referral message:', err);
            }
        };

        fetchReferralMessage();
    }, []);

    const handleCopy = async () => {
        await Clipboard.setStringAsync(referralCode);
        Alert.alert('Copied!', 'Referral code copied to clipboard.');
    };

    const handleShare = async () => {
        try {
            const message = referralMessageTemplate.replace(/\${referralCode}/g, referralCode);
            await Share.share({
                message,
                title: 'Refer & Earn ₹51',
            });
        } catch (error) {
            console.error('Sharing Error:', error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10, borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h2" color={colors.foreground}>Refer & Earn</Typography>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}>
                {/* Banner - Elevated with Gradient Feel */}
                <View style={[styles.heroCard, { backgroundColor: colors.saffron }]}>
                    <View style={styles.heroTextContent}>
                        <Typography variant="h1" color="#fff" style={{ fontSize: 40, fontWeight: '900' }}>₹51</Typography>
                        <Typography variant="h3" color="#fff" style={{ marginTop: -4, fontWeight: '700' }}>FOR EVERY FRIEND!</Typography>
                        <Typography variant="bodySmall" color="#fff" style={{ opacity: 0.95, marginTop: 12, lineHeight: 18 }}>
                            Invite your circle to Mantra Puja and get ₹51 in your wallet as soon as they join the journey.
                        </Typography>
                    </View>
                    <Image 
                        source={require('../../assets/images/intro_horoscope.jpg')} 
                        style={styles.heroImage}
                        blurRadius={4}
                    />
                </View>

                {/* Referral Code Box - Premium Bordered */}
                <View style={[styles.codeSection, { backgroundColor: isDark ? '#1e293b' : '#fff', borderColor: colors.saffron + '40', shadowColor: colors.saffron }]}>
                    <Typography variant="label" color={colors.mutedForeground} style={{ marginBottom: 12, letterSpacing: 1 }}>YOUR UNIQUE CODE</Typography>
                    <View style={styles.codeRow}>
                        <Typography 
                            variant="h1" 
                            color={colors.saffron} 
                            style={styles.codeText}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                        >
                            {referralCode}
                        </Typography>
                        <View style={styles.codeActions}>
                            <TouchableOpacity onPress={handleCopy} style={[styles.iconBtn, { backgroundColor: colors.saffron + '15' }]}>
                                <Copy size={22} color={colors.saffron} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleShare} style={[styles.iconBtn, { backgroundColor: colors.saffron, marginLeft: 10 }]}>
                                <Share2 size={22} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <Card variant="solid" style={styles.statCard}>
                        <Users size={24} color={colors.saffron} />
                        <Typography variant="h2" style={{ marginTop: 8 }}>{friendsCount}</Typography>
                        <Typography variant="label" color={colors.mutedForeground}>Friends Joined</Typography>
                    </Card>
                    <Card variant="solid" style={styles.statCard}>
                        <TrendingUp size={24} color={colors.gold} />
                        <Typography variant="h2" style={{ marginTop: 8 }}>₹{totalEarned}</Typography>
                        <Typography variant="label" color={colors.mutedForeground}>Total Earned</Typography>
                    </Card>
                </View>

                {/* How it works */}
                <Typography variant="h3" style={{ marginTop: 32, marginBottom: 16 }}>How it works</Typography>
                <View style={styles.stepRow}>
                    <View style={[styles.stepIcon, { backgroundColor: colors.saffron + '15' }]}>
                        <Share2 size={20} color={colors.saffron} />
                    </View>
                    <View style={styles.stepText}>
                        <Typography variant="body" style={{ fontWeight: 'bold' }}>1. Share your code</Typography>
                        <Typography variant="bodySmall" color={colors.mutedForeground}>Invite your friends to Mantra Puja.</Typography>
                    </View>
                </View>
                <View style={styles.stepRow}>
                    <View style={[styles.stepIcon, { backgroundColor: colors.gold + '15' }]}>
                        <Gift size={20} color={colors.gold} />
                    </View>
                    <View style={styles.stepText}>
                        <Typography variant="body" style={{ fontWeight: 'bold' }}>2. They sign up</Typography>
                        <Typography variant="bodySmall" color={colors.mutedForeground}>Ask them to enter your code during signup.</Typography>
                    </View>
                </View>
                <View style={styles.stepRow}>
                    <View style={[styles.stepIcon, { backgroundColor: '#10b98115' }]}>
                        <CheckCircle size={20} color="#10b981" />
                    </View>
                    <View style={styles.stepText}>
                        <Typography variant="body" style={{ fontWeight: 'bold' }}>3. Earn ₹51</Typography>
                        <Typography variant="bodySmall" color={colors.mutedForeground}>₹51 is added to your wallet instantly!</Typography>
                    </View>
                </View>

                {/* Recent Rewards */}
                {referralCredits.length > 0 && (
                    <>
                        <Typography variant="h3" style={{ marginTop: 32, marginBottom: 16 }}>Recent Referral Rewards</Typography>
                        {referralCredits.map(t => (
                            <Card key={t.id} variant="solid" style={styles.historyItem}>
                                <View style={styles.historyIcon}>
                                    <Users size={18} color={colors.saffron} />
                                </View>
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Typography variant="body" style={{ fontWeight: 'bold' }}>Friend Joined</Typography>
                                    <Typography variant="label" color={colors.mutedForeground}>{new Date(t.created_at).toLocaleDateString()}</Typography>
                                </View>
                                <Typography variant="h3" color="#10b981">+₹{t.amount}</Typography>
                            </Card>
                        ))}
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
    heroCard: {
        borderRadius: 28,
        padding: 24,
        flexDirection: 'row',
        overflow: 'hidden',
        height: 180,
        marginBottom: 24,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    heroTextContent: {
        flex: 1,
        zIndex: 1,
        justifyContent: 'center',
    },
    heroImage: {
        position: 'absolute',
        right: -60,
        top: -20,
        width: 220,
        height: 220,
        opacity: 0.45,
        transform: [{ rotate: '-15deg' }],
    },
    codeSection: {
        borderRadius: 24,
        padding: 24,
        borderWidth: 2,
        borderStyle: 'dashed',
        elevation: 4,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    codeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    codeText: {
        fontSize: 32,
        letterSpacing: 4,
        fontWeight: '900',
        flex: 1,
        marginRight: 10,
    },
    codeActions: {
        flexDirection: 'row',
    },
    iconBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 24,
    },
    statCard: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        borderRadius: 20,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    stepIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepText: {
        marginLeft: 16,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        borderRadius: 16,
    },
    historyIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
