import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CheckCircle, Crown, Sparkles, Star, X } from 'lucide-react-native';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../components/ui/Typography';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const PLANS = [
    {
        id: 'monthly',
        label: 'Monthly',
        price: '₹99',
        per: '/month',
        queries: '500 queries',
        badge: null,
    },
    {
        id: 'yearly',
        label: 'Yearly',
        price: '₹799',
        per: '/year',
        queries: 'Unlimited queries',
        badge: 'BEST VALUE',
    },
];

const FEATURES = [
    'Unlimited GuruJi AI conversations',
    'Kundli & Vastu deep analysis',
    'Priority spiritual guidance',
    'Save & access full chat history',
    'Ad-free experience',
];

export default function GuruAIUpgradeScreen() {
    const router = useRouter();
    const { theme, colors } = useTheme();
    const insets = useSafeAreaInsets();
    const [selectedPlan, setSelectedPlan] = React.useState('yearly');

    const handleUpgrade = () => {
        const plan = PLANS.find(p => p.id === selectedPlan);
        router.push({
            pathname: '/guru-ai-payment',
            params: {
                planId: selectedPlan,
                planLabel: plan?.label,
                planPrice: plan?.price,
                planQueries: plan?.queries,
            }
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            {/* Close Button */}
            <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                <X size={22} color={colors.mutedForeground} />
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.header}>
                <View style={[styles.crownBadge, { backgroundColor: colors.saffron + '20' }]}>
                    <Crown size={28} color={colors.saffron} />
                </View>
                <Typography variant="h2" color={colors.foreground} style={{ textAlign: 'center', marginTop: 12 }}>
                    Unlock GuruJi Pro
                </Typography>
                <Typography variant="body" color={colors.mutedForeground} style={{ textAlign: 'center', marginTop: 6 }}>
                    You&apos;re reached your free limit. Upgrade to continue your spiritual journey.
                </Typography>
            </View>

            {/* Features */}
            <View style={[styles.featuresCard, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                {FEATURES.map((feature, i) => (
                    <View key={i} style={styles.featureRow}>
                        <CheckCircle size={16} color={colors.saffron} />
                        <Typography variant="body" color={colors.foreground} style={{ marginLeft: 10, flex: 1 }}>
                            {feature}
                        </Typography>
                    </View>
                ))}
            </View>

            {/* Plan Selection */}
            <View style={styles.plansRow}>
                {PLANS.map((plan) => (
                    <TouchableOpacity
                        key={plan.id}
                        onPress={() => setSelectedPlan(plan.id)}
                        style={[
                            styles.planCard,
                            {
                                backgroundColor: selectedPlan === plan.id ? colors.saffron + '15' : colors.card,
                                borderColor: selectedPlan === plan.id ? colors.saffron : colors.borderMuted,
                            }
                        ]}
                    >
                        {plan.badge && (
                            <View style={[styles.planBadge, { backgroundColor: colors.saffron }]}>
                                <Typography variant="label" color="#fff" style={{ fontSize: 9, fontWeight: '700' }}>
                                    {plan.badge}
                                </Typography>
                            </View>
                        )}
                        <Star size={18} color={selectedPlan === plan.id ? colors.saffron : colors.mutedForeground} />
                        <Typography variant="h3" color={colors.foreground} style={{ marginTop: 8 }}>
                            {plan.price}
                        </Typography>
                        <Typography variant="label" color={colors.mutedForeground}>{plan.per}</Typography>
                        <Typography variant="label" color={colors.saffron} style={{ marginTop: 4, fontSize: 10 }}>
                            {plan.queries}
                        </Typography>
                        <Typography variant="label" color={colors.mutedForeground} style={{ fontSize: 11, marginTop: 2 }}>
                            {plan.label}
                        </Typography>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Upgrade Button */}
            <TouchableOpacity
                onPress={handleUpgrade}
                style={[styles.upgradeBtn, { backgroundColor: colors.saffron }]}
            >
                <Sparkles size={18} color="#fff" />
                <Typography variant="h3" color="#fff" style={{ marginLeft: 8 }}>
                    Upgrade to Pro
                </Typography>
            </TouchableOpacity>

            <Typography variant="label" color={colors.mutedForeground} style={{ textAlign: 'center', marginTop: 12, fontSize: 10 }}>
                Cancel anytime • Secure payment
            </Typography>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20 },
    closeBtn: { alignSelf: 'flex-end', padding: 8, marginTop: 8 },
    header: { alignItems: 'center', marginTop: 8, marginBottom: 20 },
    crownBadge: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
    featuresCard: {
        borderRadius: 16, borderWidth: 1, padding: 16,
        marginBottom: 20, gap: 12,
    },
    featureRow: { flexDirection: 'row', alignItems: 'center' },
    plansRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    planCard: {
        flex: 1, borderRadius: 16, borderWidth: 2,
        padding: 16, alignItems: 'center', position: 'relative',
    },
    planBadge: {
        position: 'absolute', top: -10, paddingHorizontal: 8,
        paddingVertical: 3, borderRadius: 20,
    },
    upgradeBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        paddingVertical: 16, borderRadius: 16,
    },
});
