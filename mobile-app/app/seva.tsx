import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, Heart, Info, ShieldCheck, Sparkles, Sprout } from "lucide-react-native";
import React from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Typography } from "../components/ui/Typography";
import { useGuruAssistant } from "../context/GuruAssistantContext";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function GauSevaScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { theme, colors } = useTheme();
    const { handleScroll } = useGuruAssistant();

    const handleBooking = () => {
        router.push({
            pathname: "/pujas/payment-summary",
            params: {
                service: "Gau Seva (Grass/Fodder)",
                locationName: "Sacred Gaushala, Kashi",
                amount: "51",
                icon: "Heart"
            }
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
                <Typography variant="h2" color={colors.foreground}>Gau Seva</Typography>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={(e) => handleScroll(e.nativeEvent.contentOffset.y)}
            >
                {/* Banner Section */}
                <View style={styles.heroSection}>
                    <Image
                        source={require("../assets/images/vedic_blog.jpg")} // Using a spiritual background as placeholder
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <View style={styles.imageOverlay} />
                    <View style={styles.heroText}>
                        <Typography variant="h1" color="#fff">Protect the Divine</Typography>
                        <Typography variant="body" color="#fed7aa">Service to the Cow is service to God</Typography>
                    </View>
                </View>

                <Card variant="solid" style={styles.infoCard}>
                    <View style={[styles.priceBadge, { backgroundColor: colors.saffron + '15' }]}>
                        <Typography variant="h3" color={colors.saffron}>₹51.00</Typography>
                    </View>
                    <Typography variant="h3" color={colors.foreground} style={styles.cardTitle}>Daily Gau Seva</Typography>
                    <Typography variant="bodySmall" color={colors.mutedForeground} style={{ lineHeight: 20 }}>
                        A contribution of ₹51 provides one day of fresh grass, fodder, and medical care for a cow at our sacred Gaushala.
                    </Typography>
                </Card>

                {/* Importance Section */}
                <Typography variant="h3" color={colors.foreground} style={styles.sectionTitle}>Why Gau Seva?</Typography>

                <View style={styles.benefitsContainer}>
                    <View style={styles.benefitItem}>
                        <View style={[styles.iconBox, { backgroundColor: '#fdf2f2' }]}>
                            <Heart size={20} color="#ef4444" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Typography variant="body" style={{ fontWeight: 'bold' }}>Spiritual Merit</Typography>
                            <Typography variant="bodySmall" color={colors.mutedForeground}>
                                Attain the blessings of 33 crore deities believed to reside within the cow.
                            </Typography>
                        </View>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={[styles.iconBox, { backgroundColor: '#f0fdf4' }]}>
                            <Sprout size={20} color="#10b981" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Typography variant="body" style={{ fontWeight: 'bold' }}>Karmic Shield</Typography>
                            <Typography variant="bodySmall" color={colors.mutedForeground}>
                                Feeding a cow is said to remove negative planetary effects and bring peace.
                            </Typography>
                        </View>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={[styles.iconBox, { backgroundColor: '#eff6ff' }]}>
                            <Sparkles size={20} color="#3b82f6" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Typography variant="body" style={{ fontWeight: 'bold' }}>Prosperity</Typography>
                            <Typography variant="bodySmall" color={colors.mutedForeground}>
                                Brings abundance and good fortune to the household according to Vedic texts.
                            </Typography>
                        </View>
                    </View>
                </View>

                {/* Important Info */}
                <Card variant="glass" style={styles.warningCard}>
                    <View style={styles.warningRow}>
                        <Info size={18} color={colors.saffron} />
                        <Typography variant="bodySmall" color={colors.foreground} style={{ marginLeft: 10, fontWeight: 'bold' }}>
                            Authentic Process
                        </Typography>
                    </View>
                    <Typography variant="label" color={colors.mutedForeground} style={{ marginTop: 8, lineHeight: 18 }}>
                        Upon booking, we will feed the cow in your name or your family&apos;s name. You will receive a video/photo proof of the Gau Seva within 24-48 hours.
                    </Typography>
                </Card>

                <View style={styles.trustFooter}>
                    <ShieldCheck size={16} color={colors.mutedForeground} />
                    <Typography variant="label" color={colors.mutedForeground} style={{ marginLeft: 6 }}>
                        Verified Sacred Gaushala Partnership
                    </Typography>
                </View>
            </ScrollView>

            {/* Booking Action */}
            <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.borderMuted, paddingBottom: insets.bottom + 16 }]}>
                <Button
                    title="Sponsor for ₹51"
                    onPress={handleBooking}
                    style={styles.bookButton}
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
    scrollContent: { paddingBottom: 120 },
    heroSection: {
        height: 220,
        width: '100%',
        position: 'relative',
        marginBottom: -40,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    heroText: {
        position: 'absolute',
        bottom: 60,
        left: 20,
    },
    infoCard: {
        marginHorizontal: 20,
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    priceBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginBottom: 12,
    },
    cardTitle: {
        marginBottom: 8,
        fontWeight: 'bold',
    },
    sectionTitle: {
        marginHorizontal: 20,
        marginTop: 32,
        marginBottom: 16,
        fontWeight: '700',
    },
    benefitsContainer: {
        paddingHorizontal: 20,
        gap: 20,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningCard: {
        marginHorizontal: 20,
        marginTop: 32,
        padding: 16,
        borderRadius: 16,
    },
    warningRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trustFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        paddingBottom: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        borderTopWidth: 1,
    },
    bookButton: {
        width: '100%',
    }
});
