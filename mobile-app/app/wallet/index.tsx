import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { 
    ArrowDownLeft, 
    ArrowUpRight, 
    ChevronLeft, 
    History, 
    Plus, 
    ShieldCheck, 
    Users,
    Wallet as WalletIcon 
} from 'lucide-react-native';
import React from 'react';
import { 
    ActivityIndicator, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity, 
    View 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/ui/Card';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { useWallet } from '../../context/WalletContext';

export default function WalletDashboard() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const insets = useSafeAreaInsets();
    const { balance, transactions, loading } = useWallet();

    const recentTransactions = transactions.slice(0, 5);

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3" color={colors.foreground}>My Wallet</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Balance Card */}
                <Card variant="solid" style={[styles.balanceCard, { backgroundColor: colors.saffron }]}>
                    <View style={styles.balanceHeader}>
                        <View style={styles.iconContainer}>
                            <WalletIcon size={24} color="#fff" />
                        </View>
                        <Typography variant="body" color="rgba(255,255,255,0.8)">Available Balance</Typography>
                    </View>
                    <Typography variant="h1" color="#fff" style={styles.balanceAmount}>
                        ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </Typography>
                    
                    <View style={styles.balanceFooter}>
                        <View style={styles.secureRow}>
                            <ShieldCheck size={14} color="rgba(255,255,255,0.8)" />
                            <Typography variant="label" color="rgba(255,255,255,0.8)" style={{ marginLeft: 6 }}>100% Secure & Verified</Typography>
                        </View>
                    </View>
                </Card>

                {/* Quick Actions */}
                <View style={styles.actionsRow}>
                    <TouchableOpacity 
                        style={[styles.actionBtn, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}
                        onPress={() => router.push('/wallet/topup')}
                    >
                        <View style={[styles.actionIcon, { backgroundColor: colors.saffron + '20' }]}>
                            <Plus size={20} color={colors.saffron} />
                        </View>
                        <Typography variant="label" color={colors.foreground}>Add Money</Typography>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.actionBtn, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}
                        onPress={() => router.push('/wallet/history')}
                    >
                        <View style={[styles.actionIcon, { backgroundColor: colors.gold + '20' }]}>
                            <History size={20} color={colors.gold} />
                        </View>
                        <Typography variant="label" color={colors.foreground}>History</Typography>
                    </TouchableOpacity>
                </View>

                {/* Refer & Earn Promo - Premium Glow Card */}
                <TouchableOpacity 
                    onPress={() => router.push('/wallet/refer')}
                    activeOpacity={0.9}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    style={{ marginBottom: 32 }}
                >
                    <View style={[styles.referralGlowCard, { backgroundColor: colors.saffron }]}>
                        <View style={styles.referralGlowContent}>
                            <View style={styles.referralIconCircle}>
                                <Users size={24} color={colors.saffron} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 16 }}>
                                <Typography variant="h3" color="#fff" style={{ fontWeight: '800' }}>REFER & EARN ₹51</Typography>
                                <Typography variant="bodySmall" color="rgba(255,255,255,0.9)">
                                    Invite friends & get rewards instantly!
                                </Typography>
                            </View>
                            <View style={styles.referralGoBtn}>
                                <ArrowUpRight size={20} color={colors.saffron} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Recent Transactions */}
                <View style={styles.sectionHeader}>
                    <Typography variant="h3" color={colors.foreground}>Recent Transactions</Typography>
                    <TouchableOpacity onPress={() => router.push('/wallet/history')}>
                        <Typography variant="label" color={colors.saffron}>See All</Typography>
                    </TouchableOpacity>
                </View>

                <Card variant="solid" style={[styles.historyCard, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                    {loading ? (
                        <ActivityIndicator color={colors.saffron} style={{ padding: 20 }} />
                    ) : recentTransactions.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Typography variant="bodySmall" color={colors.mutedForeground}>No transactions yet.</Typography>
                        </View>
                    ) : (
                        recentTransactions.map((tx, index) => (
                            <View 
                                key={tx.id} 
                                style={[
                                    styles.txRow, 
                                    index < recentTransactions.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderMuted }
                                ]}
                            >
                                <View style={[styles.txTypeIcon, { backgroundColor: tx.type === 'credit' ? '#22c55e20' : '#ef444420' }]}>
                                    {tx.type === 'credit' ? (
                                        <ArrowDownLeft size={16} color="#22c55e" />
                                    ) : (
                                        <ArrowUpRight size={16} color="#ef4444" />
                                    )}
                                </View>
                                <View style={styles.txInfo}>
                                    <Typography variant="body" color={colors.foreground} numberOfLines={1}>{tx.description || tx.category}</Typography>
                                    <Typography variant="label" color={colors.mutedForeground}>
                                        {new Date(tx.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                    </Typography>
                                </View>
                                <Typography variant="body" style={{ fontWeight: 'bold' }} color={tx.type === 'credit' ? '#22c55e' : colors.foreground}>
                                    {tx.type === 'credit' ? '+' : '-'} ₹{tx.amount}
                                </Typography>
                            </View>
                        ))
                    )}
                </Card>

                {/* Footer Info */}
                <View style={styles.footerInfo}>
                    <Typography variant="bodySmall" color={colors.mutedForeground} style={{ textAlign: 'center' }}>
                        Wallet balance can be used for all services in Mantra Puja app. Refunds for cancelled services are credited back to your wallet.
                    </Typography>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
    backBtn: { padding: 4 },
    scrollContent: { padding: 20 },
    balanceCard: { padding: 24, borderRadius: 24, marginBottom: 24, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 10 },
    balanceHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    iconContainer: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    balanceAmount: { fontSize: 36, fontWeight: 'bold', marginBottom: 20 },
    balanceFooter: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 16 },
    secureRow: { flexDirection: 'row', alignItems: 'center' },
    actionsRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
    actionBtn: { flex: 1, padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center', gap: 10 },
    actionIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
    referralGlowCard: {
        padding: 2,
        borderRadius: 24,
        elevation: 8,
        shadowColor: "#f97316",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
    },
    referralGlowContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 18,
        borderRadius: 22,
    },
    referralIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    referralGoBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    historyCard: { borderRadius: 20, borderWidth: 1, padding: 8 },
    emptyState: { padding: 40, alignItems: 'center' },
    txRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 8 },
    txTypeIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    txInfo: { flex: 1 },
    footerInfo: { marginTop: 40, paddingHorizontal: 20, paddingBottom: 40 },
});
