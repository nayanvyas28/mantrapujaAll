import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, CheckCircle2, CreditCard, Wallet } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Card } from '../../components/ui/Card';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { useWallet } from '../../context/WalletContext';
import { supabase } from '../../utils/supabase';

// import { PRODUCTS_LIST } from '../../utils/mockData'; // Removed in favor of Supabase

export default function PaymentSummaryScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { theme, colors } = useTheme();
    const [loading, setLoading] = useState(false);
    const [fetchingProduct, setFetchingProduct] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'wallet'>('wallet');
    const { balance, processPayment } = useWallet();

    const fetchProduct = useCallback(async () => {
        if (!id) return;
        try {
            setFetchingProduct(true);
            const { data, error } = await supabase
                .from('products_99')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) setProduct(data);
        } catch (err) {
            console.error('Error fetching product for payment:', err);
        } finally {
            setFetchingProduct(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    if (fetchingProduct) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.saffron} />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Typography variant="body" color={colors.foreground}>Product not found.</Typography>
            </View>
        );
    }

    const shipping = 0; // Free shipping
    const total = product.price + shipping;

    const handlePayment = async () => {
        if (selectedMethod === 'wallet') {
            if (balance < total) {
                Alert.alert(
                    "Insufficient Balance",
                    `Your wallet balance (₹${balance}) is less than the total (₹${total}). Please top up your wallet first.`,
                    [{ text: "Top Up", onPress: () => router.push('/wallet/topup') }, { text: "OK" }]
                );
                return;
            }

            setLoading(true);
            const success = await processPayment(
                total,
                'product_order',
                `Order for ${product.name}`,
                `ORD-${Date.now()}`
            );

            setLoading(false);
            if (success) {
                Alert.alert(
                    "Payment Successful",
                    "Your order has been placed using wallet balance.",
                    [{ text: "OK", onPress: () => router.push('/(tabs)') }]
                );
            }
            return;
        }

        setLoading(true);
        // Simulate other payment methods (Razorpay integration would go here)
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                "Payment Successful",
                `Your order for ${product.name} has been placed successfully.`,
                [{ text: "OK", onPress: () => router.push('/(tabs)') }]
            );
        }, 1500);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            <View style={[styles.header, { borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3" color={colors.foreground}>Payment Summary</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <Card variant="solid" style={styles.orderCard}>
                    <Typography variant="h3" color={colors.foreground} style={{ marginBottom: 16 }}>
                        Order Details
                    </Typography>
                    <View style={styles.row}>
                        <Typography variant="body" color={colors.foreground} style={{ flex: 1 }}>{product.name}</Typography>
                        <Typography variant="body" color={colors.foreground} style={{ fontWeight: 'bold' }}>₹{product.price}</Typography>
                    </View>
                    <View style={styles.row}>
                        <Typography variant="body" color={colors.mutedForeground}>Delivery Fee</Typography>
                        <Typography variant="body" color={colors.saffron} style={{ fontWeight: 'bold' }}>FREE</Typography>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.borderMuted }]} />

                    <View style={styles.row}>
                        <Typography variant="h3" color={colors.foreground}>Total Amount</Typography>
                        <Typography variant="h2" color="#ef4444">₹{total}</Typography>
                    </View>
                </Card>

                <Typography variant="h3" color={colors.foreground} style={{ marginTop: 24, marginBottom: 16 }}>
                    Select Payment Method
                </Typography>

                <TouchableOpacity
                    style={[
                        styles.paymentMethod,
                        { borderColor: selectedMethod === 'wallet' ? colors.saffron : colors.borderMuted, backgroundColor: colors.card }
                    ]}
                    onPress={() => setSelectedMethod('wallet')}
                    activeOpacity={0.8}
                >
                    <View style={styles.methodLeft}>
                        <Wallet size={24} color={selectedMethod === 'wallet' ? colors.saffron : colors.mutedForeground} />
                        <View style={{ marginLeft: 16 }}>
                            <Typography variant="body" color={colors.foreground} style={{ fontWeight: '500' }}>Wallet Balance</Typography>
                            <Typography variant="label" color={colors.mutedForeground}>Available: ₹{balance}</Typography>
                        </View>
                    </View>
                    {selectedMethod === 'wallet' && <CheckCircle2 size={24} color={colors.saffron} />}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.paymentMethod,
                        { borderColor: selectedMethod === 'upi' ? colors.saffron : colors.borderMuted, backgroundColor: colors.card }
                    ]}
                    onPress={() => setSelectedMethod('upi')}
                    activeOpacity={0.8}
                >
                    <View style={styles.methodLeft}>
                        <CreditCard size={24} color={selectedMethod === 'upi' ? colors.saffron : colors.mutedForeground} />
                        <Typography variant="body" color={colors.foreground} style={styles.methodText}>UPI / NetBanking</Typography>
                    </View>
                    {selectedMethod === 'upi' && <CheckCircle2 size={24} color={colors.saffron} />}
                </TouchableOpacity>

            </ScrollView>

            <View style={[styles.fixedBottomBar, { backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderTopColor: colors.borderMuted }]}>
                <View style={styles.totalInfo}>
                    <Typography variant="label" color={colors.mutedForeground}>Total to pay</Typography>
                    <Typography variant="h2" color={colors.foreground}>₹{total}</Typography>
                </View>

                <TouchableOpacity
                    style={[styles.payButton, { backgroundColor: '#10b981' }]} // Green for payment
                    onPress={handlePayment}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Typography variant="h3" color="#ffffff" style={{ textAlign: 'center' }}>
                            Pay Now
                        </Typography>
                    )}
                </TouchableOpacity>
            </View>
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
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -8,
        borderRadius: 20,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    orderCard: {
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    divider: {
        height: 1,
        width: '100%',
        marginVertical: 16,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderWidth: 2,
        borderRadius: 12,
        marginBottom: 12,
    },
    methodLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    methodText: {
        marginLeft: 16,
        fontWeight: '500',
    },
    fixedBottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalInfo: {
        flex: 1,
    },
    payButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
