import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { 
    AlertCircle, 
    ChevronLeft, 
    CreditCard, 
    ShieldCheck, 
    Zap 
} from 'lucide-react-native';
import React, { useState } from 'react';
import { 
    Alert, 
    ScrollView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    View,
    ActivityIndicator
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/ui/Card';
import { Typography } from '../../components/ui/Typography';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useWallet } from '../../context/WalletContext';

const QUICK_AMOUNTS = [100, 500, 1000, 2000, 5000];

export default function WalletTopup() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const { user, profile } = useAuth();
    const insets = useSafeAreaInsets();
    const { addFunds } = useWallet();
    
    const [amount, setAmount] = useState('500');
    const [loading, setLoading] = useState(false);

    const handleTopup = async () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount < 10) {
            Alert.alert("Invalid Amount", "Please enter an amount of at least ₹10.");
            return;
        }

        const razorpayKeyId = process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID;
        if (!razorpayKeyId) {
            Alert.alert("Error", "Payment gateway key missing. Contact support.");
            return;
        }

        setLoading(true);

        const options = {
            description: 'Wallet Top-up',
            image: 'https://your-logo-url.com/logo.png',
            currency: 'INR',
            key: razorpayKeyId,
            amount: numAmount * 100,
            name: 'Mantra Puja',
            prefill: {
                email: user?.email || '',
                contact: profile?.phone || '',
                name: profile?.full_name || 'User',
            },
            theme: { color: colors.saffron }
        };

        try {
            RazorpayCheckout.open(options)
                .then(async (data: any) => {
                    const success = await addFunds(numAmount, data.razorpay_payment_id);
                    if (success) {
                        Alert.alert("Success", "Funds added successfully to your wallet!");
                        router.replace('/wallet');
                    } else {
                        Alert.alert("Wallet Update Failed", "Payment was successful but your wallet balance hasn't updated. Please contact support with payment ID: " + data.razorpay_payment_id);
                    }
                })
                .catch((error: any) => {
                    Alert.alert("Payment Failed", error.description || "The payment could not be completed.");
                });
        } catch (err) {
            console.error("Razorpay Error:", err);
            Alert.alert("Error", "Could not initialize payment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3" color={colors.foreground}>Add Money</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Input Card */}
                <Card variant="solid" style={[styles.inputCard, { borderColor: colors.borderMuted }]}>
                    <Typography variant="label" color={colors.mutedForeground} style={{ marginBottom: 12 }}>Enter Amount</Typography>
                    <View style={styles.inputWrapper}>
                        <Typography variant="h1" color={colors.foreground}>₹</Typography>
                        <TextInput
                            style={[styles.input, { color: colors.foreground }]}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="0"
                            placeholderTextColor={colors.mutedForeground}
                            autoFocus
                        />
                    </View>
                    
                    <View style={styles.quickAmounts}>
                        {QUICK_AMOUNTS.map(amt => (
                            <TouchableOpacity 
                                key={amt}
                                style={[
                                    styles.amtChip, 
                                    { borderColor: colors.borderMuted, backgroundColor: amount === amt.toString() ? colors.saffron + '20' : 'transparent' },
                                    amount === amt.toString() && { borderColor: colors.saffron }
                                ]}
                                onPress={() => setAmount(amt.toString())}
                            >
                                <Typography variant="label" color={amount === amt.toString() ? colors.saffron : colors.foreground}>+₹{amt}</Typography>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Card>

                {/* Secure Badge */}
                <View style={[styles.secureBadge, { backgroundColor: '#22c55e10' }]}>
                    <ShieldCheck size={18} color="#22c55e" />
                    <Typography variant="bodySmall" color="#22c55e" style={{ marginLeft: 8 }}>
                        Securely processed by Razorpay. Funds will be available instantly.
                    </Typography>
                </View>

                {/* Method Preview */}
                <View style={styles.methodPreview}>
                    <Typography variant="h3" color={colors.foreground} style={{ marginBottom: 16 }}>Payment Method</Typography>
                    <Card variant="solid" style={[styles.methodCard, { borderColor: colors.borderMuted }]}>
                        <CreditCard size={24} color={colors.saffron} />
                        <View style={{ flex: 1, marginLeft: 16 }}>
                            <Typography variant="body" color={colors.foreground}>UPI, Cards, NetBanking</Typography>
                            <Typography variant="label" color={colors.mutedForeground}>Safe & secure transactions</Typography>
                        </View>
                        <Zap size={20} color={colors.gold} />
                    </Card>
                </View>

                <View style={styles.infoRow}>
                    <AlertCircle size={14} color={colors.mutedForeground} />
                    <Typography variant="label" color={colors.mutedForeground} style={{ marginLeft: 8 }}>
                        By proceeding, you agree to our terms of wallet usage.
                    </Typography>
                </View>

            </ScrollView>

            <View style={[styles.footer, { paddingBottom: insets.bottom + 20, borderTopColor: colors.borderMuted }]}>
                <TouchableOpacity 
                    style={[styles.payBtn, { backgroundColor: colors.saffron }]}
                    onPress={handleTopup}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Typography variant="h3" color="#fff">Add ₹{amount} to Wallet</Typography>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
    backBtn: { padding: 4 },
    scrollContent: { padding: 24 },
    inputCard: { padding: 24, borderRadius: 24, borderWidth: 1, marginBottom: 20 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 10, marginBottom: 20 },
    input: { flex: 1, fontSize: 32, fontWeight: 'bold', marginLeft: 10 },
    quickAmounts: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    amtChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
    secureBadge: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 32 },
    methodPreview: { marginBottom: 32 },
    methodCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, borderWidth: 1 },
    infoRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 },
    footer: { padding: 24, borderTopWidth: 1 },
    payBtn: { height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
});
