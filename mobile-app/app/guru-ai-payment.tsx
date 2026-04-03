import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CheckCircle, ChevronLeft, Crown, ShieldCheck } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { useWallet } from '../context/WalletContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../components/ui/Typography';
import { useTheme } from '../context/ThemeContext';

export default function GuruAIPaymentScreen() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'play' | 'wallet'>('wallet');
    const { balance, processPayment } = useWallet();

    const planLabel = params.planLabel as string || 'Yearly';
    const planPrice = params.planPrice as string || '₹799';
    const planQueries = params.planQueries as string || 'Unlimited queries';

    const handlePayment = async () => {
        const numericPrice = parseInt(planPrice.replace('₹', ''));
        
        if (paymentMethod === 'wallet') {
            if (balance < numericPrice) {
                Alert.alert("Insufficient Balance", `Your wallet balance (₹${balance}) is less than the plan price (₹${numericPrice}).`, [
                    { text: "Top Up", onPress: () => router.push('/wallet/topup') },
                    { text: "OK" }
                ]);
                return;
            }

            setIsProcessing(true);
            const success = await processPayment(
                numericPrice,
                'ai_subscription',
                `GuruJi AI Pro - ${planLabel} Plan`,
                `AI-${Date.now()}`
            );
            setIsProcessing(false);

            if (success) {
                Alert.alert("Subscription Active", "Your GuruJi AI Pro subscription is now active!", [
                    { text: "Great", onPress: () => router.replace('/guru-ai') }
                ]);
            }
            return;
        }

        if (Platform.OS === 'android') {
            Alert.alert(
                '💳 Google Play Billing',
                'To comply with Google Play policies, all digital subscriptions must be processed via Google Play Billing. We are currently integrating this secure payment method. Please check back soon.',
                [{ text: 'OK', onPress: () => router.replace('/guru-ai') }]
            );
            return;
        }

        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            Alert.alert(
                '🙏 Coming Soon',
                'Checkout integration is under setup for non-Android platforms. Your account will be upgraded once available.',
                [{ text: 'OK', onPress: () => router.replace('/guru-ai') }]
            );
        }, 1200);
    };

    const lineItems = [
        { label: 'GuruJi AI Pro', value: planLabel },
        { label: 'Queries', value: planQueries },
        { label: 'Price', value: planPrice },
        { label: 'GST (18%)', value: '₹0' },
        { label: 'Discount', value: '₹0' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3" color={colors.foreground}>Payment Summary</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

            {/* Plan Summary Card */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.saffron + '40' }]}>
                <View style={styles.planHeader}>
                    <View style={[styles.icon, { backgroundColor: colors.saffron + '20' }]}>
                        <Crown size={22} color={colors.saffron} />
                    </View>
                    <View style={{ marginLeft: 12, flex: 1 }}>
                        <Typography variant="h3" color={colors.foreground}>GuruJi AI Pro</Typography>
                        <Typography variant="label" color={colors.saffron}>{planLabel} Plan</Typography>
                    </View>
                    <Typography variant="h2" color={colors.saffron}>{planPrice}</Typography>
                </View>
            </View>

            {/* Line Items */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                {lineItems.map((item, i) => (
                    <View key={i} style={[styles.lineItem, i < lineItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderMuted }]}>
                        <Typography variant="body" color={colors.mutedForeground}>{item.label}</Typography>
                        <Typography variant="body" color={colors.foreground} style={{ fontWeight: '600' }}>{item.value}</Typography>
                    </View>
                ))}
                {/* Total */}
                <View style={[styles.lineItem, { backgroundColor: colors.saffron + '10', borderRadius: 8, marginTop: 8 }]}>
                    <Typography variant="h3" color={colors.foreground}>Total</Typography>
                    <Typography variant="h3" color={colors.saffron}>{planPrice}</Typography>
                </View>
            </View>

            {/* What you get */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                <Typography variant="h3" color={colors.foreground} style={{ marginBottom: 12 }}>What you get</Typography>
                {[
                    'Unlimited conversations with GuruJi',
                    'Priority AI responses',
                    'Full chat history access',
                    'Ad-free spiritual guidance',
                ].map((f, i) => (
                    <View key={i} style={styles.featureRow}>
                        <CheckCircle size={14} color={colors.saffron} />
                        <Typography variant="bodySmall" color={colors.foreground} style={{ marginLeft: 8 }}>{f}</Typography>
                    </View>
                ))}
            </View>

            {/* Payment Method Selector */}
            <Typography variant="h3" color={colors.foreground} style={{ marginBottom: 12, marginTop: 12 }}>Choose Payment Method</Typography>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                <TouchableOpacity 
                    style={[styles.payMethodOption, paymentMethod === 'wallet' && { borderColor: colors.saffron, backgroundColor: colors.saffron + '10' }]} 
                    onPress={() => setPaymentMethod('wallet')}
                >
                     <View style={[styles.radio, { borderColor: paymentMethod === 'wallet' ? colors.saffron : colors.border }]} >
                        {paymentMethod === 'wallet' && <View style={[styles.radioInner, { backgroundColor: colors.saffron }]} />}
                     </View>
                     <View style={{ flex: 1, marginLeft: 12 }}>
                        <Typography variant="body" color={colors.foreground} style={{ fontWeight: '600' }}>Wallet Balance</Typography>
                        <Typography variant="label" color={colors.mutedForeground}>Available: ₹{balance}</Typography>
                     </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.payMethodOption, { marginTop: 12 }, paymentMethod === 'play' && { borderColor: colors.saffron, backgroundColor: colors.saffron + '10' }]} 
                    onPress={() => setPaymentMethod('play')}
                >
                     <View style={[styles.radio, { borderColor: paymentMethod === 'play' ? colors.saffron : colors.border }]} >
                        {paymentMethod === 'play' && <View style={[styles.radioInner, { backgroundColor: colors.saffron }]} />}
                     </View>
                     <View style={{ flex: 1, marginLeft: 12 }}>
                        <Typography variant="body" color={colors.foreground} style={{ fontWeight: '600' }}>{Platform.OS === 'android' ? 'Google Play' : 'App Store'}</Typography>
                        <Typography variant="label" color={colors.mutedForeground}>Secure checkout</Typography>
                     </View>
                </TouchableOpacity>
            </View>
        </ScrollView>

        {/* Pay Button */}
        <View style={styles.footer}>
                <View style={styles.secureRow}>
                    <ShieldCheck size={14} color={colors.mutedForeground} />
                    <Typography variant="label" color={colors.mutedForeground} style={{ marginLeft: 6, fontSize: 10 }}>
                        Secure & encrypted payment
                    </Typography>
                </View>

                <TouchableOpacity
                    onPress={handlePayment}
                    disabled={isProcessing}
                    style={[styles.payBtn, { backgroundColor: colors.saffron, opacity: isProcessing ? 0.7 : 1 }]}
                >
                    <Typography variant="h3" color="#fff">
                        {isProcessing ? 'Processing...' : `Pay ${planPrice}`}
                    </Typography>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
    backBtn: { padding: 4 },
    card: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
    planHeader: { flexDirection: 'row', alignItems: 'center' },
    icon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
    lineItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 4 },
    featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    footer: { position: 'absolute', bottom: 0, left: 16, right: 16, paddingBottom: 32 },
    secureRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
    payBtn: { paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
    payMethodOption: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'transparent' },
    radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
    radioInner: { width: 10, height: 10, borderRadius: 5 },
});
