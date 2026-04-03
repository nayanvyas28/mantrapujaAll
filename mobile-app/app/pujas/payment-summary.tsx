import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, Droplets, Heart, Info, ShieldCheck, Sparkles } from "lucide-react-native";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Typography } from "../../components/ui/Typography";
import { useTheme } from "../../context/ThemeContext";

export default function PaymentSummaryScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { theme, colors } = useTheme();
    const params = useLocalSearchParams();

    const serviceName = params.service || "Sacred Ritual";
    const locationName = params.locationName || "Sacred Site";
    const amount = params.amount || "51.00";
    const iconName = params.icon || "Droplets";

    const renderIcon = () => {
        switch (iconName) {
            case 'Heart': return <Heart size={20} color={colors.saffron} />;
            case 'Sparkles': return <Sparkles size={20} color={colors.saffron} />;
            default: return <Droplets size={20} color={colors.saffron} />;
        }
    };

    const handlePayNow = () => {
        // Placeholder for actual payment gateway integration
        // We'll just show success for now
        router.replace({
            pathname: "/pujas/success" as any,
            params: { message: `${serviceName} booked successfully!` }
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
            <StatusBar style={theme === "dark" ? "light" : "dark"} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={28} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h2" color={colors.foreground}>Payment Summary</Typography>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Order Details Card */}
                <Typography variant="h3" color={colors.foreground} style={styles.sectionTitle}>Service Details</Typography>
                <Card variant="solid" style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <View style={[styles.iconBox, { backgroundColor: colors.saffron + '15' }]}>
                            {renderIcon()}
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Typography variant="body" style={{ fontWeight: 'bold' }}>{serviceName}</Typography>
                            <Typography variant="bodySmall" color={colors.mutedForeground}>{locationName}</Typography>
                        </View>
                        <Typography variant="body" style={{ fontWeight: 'bold' }}>₹{amount}</Typography>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.borderMuted }]} />

                    <View style={styles.infoRow}>
                        <Info size={16} color={colors.mutedForeground} />
                        <Typography variant="label" color={colors.mutedForeground} style={{ marginLeft: 8 }}>
                            Ritual will be performed with your name and gotra.
                        </Typography>
                    </View>
                </Card>

                {/* Bill Details */}
                <Typography variant="h3" color={colors.foreground} style={styles.sectionTitle}>Bill Summary</Typography>
                <Card variant="solid" style={styles.billCard}>
                    <View style={styles.billRow}>
                        <Typography variant="body" color={colors.mutedForeground}>Dakshina Amount</Typography>
                        <Typography variant="body" color={colors.foreground}>₹{amount}</Typography>
                    </View>
                    <View style={styles.billRow}>
                        <Typography variant="body" color={colors.mutedForeground}>Platform Fees</Typography>
                        <Typography variant="body" color={colors.foreground}>₹0.00</Typography>
                    </View>
                    <View style={[styles.divider, { backgroundColor: colors.borderMuted }]} />
                    <View style={styles.billRow}>
                        <Typography variant="h3" color={colors.foreground}>To Pay</Typography>
                        <Typography variant="h3" color={colors.saffron}>₹{amount}</Typography>
                    </View>
                </Card>

                {/* Trust Badge */}
                <View style={styles.trustBadge}>
                    <ShieldCheck size={18} color="#10b981" />
                    <Typography variant="label" color="#10b981" style={{ marginLeft: 6, fontWeight: 'bold' }}>
                        Verified Sacred Ritual Service
                    </Typography>
                </View>
            </ScrollView>

            {/* Action Footer */}
            <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.borderMuted, paddingBottom: insets.bottom + 16 }]}>
                <Button
                    title={`Pay ₹${amount}`}
                    onPress={handlePayNow}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
    backButton: { padding: 5 },
    scrollContent: { padding: 20 },
    sectionTitle: { marginBottom: 12, marginTop: 10 },
    summaryCard: { padding: 16, borderRadius: 16, marginBottom: 20 },
    summaryRow: { flexDirection: 'row', alignItems: 'center' },
    iconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    divider: { height: 1, marginVertical: 16 },
    infoRow: { flexDirection: 'row', alignItems: 'center' },
    billCard: { padding: 16, borderRadius: 16 },
    billRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    trustBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30 },
    footer: { padding: 20, borderTopWidth: 1 },
});
