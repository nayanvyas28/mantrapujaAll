import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, Clock, Gift, Info, MapPin, ShieldCheck, Star } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { FallbackImage } from "../../components/ui/FallbackImage";
import { Typography } from "../../components/ui/Typography";
import { useGuruAssistant } from "../../context/GuruAssistantContext";
import { useTheme } from "../../context/ThemeContext";
import { supabase } from "../../utils/supabase";

// { width } = Dimensions.get("window"); // width removed as it was unused

export default function TemplePrasadDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { theme, colors } = useTheme();
    const { handleScroll } = useGuruAssistant();

    const [temple, setTemple] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchTempleDetail = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("temple")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            if (data) setTemple(data);
        } catch (err) {
            console.error("Error fetching temple details:", err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) fetchTempleDetail();
    }, [id, fetchTempleDetail]);

    const handleBooking = () => {
        router.push({
            pathname: "/pujas/payment-summary",
            params: {
                service: "Sacred Prasad",
                locationName: temple.name,
                amount: temple.prasad_price || "101.00",
                icon: "Gift"
            }
        });
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator color={colors.saffron} size="large" />
            </View>
        );
    }

    if (!temple) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
                <Typography variant="body" color={colors.foreground}>Temple not found.</Typography>
                <Button title="Go Back" onPress={() => router.back()} style={{ marginTop: 20 }} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />

            {/* Absolute Header Overlay (Back Button) */}
            <TouchableOpacity
                style={[styles.backButton, { top: insets.top + 10 }]}
                onPress={() => router.back()}
            >
                <ChevronLeft size={28} color="#fff" />
            </TouchableOpacity>

            <ScrollView
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={(e) => handleScroll(e.nativeEvent.contentOffset.y)}
            >
                {/* Hero Section inside ScrollView for guaranteed Z-order */}
                <View style={styles.heroSection}>
                    <FallbackImage
                        source={{ uri: temple.image_url }}
                        style={styles.heroImage}
                        contentFit="cover"
                    />
                    <View style={styles.imageOverlay} />

                    <View style={styles.heroTextContainer}>
                        <View style={styles.categoryTag}>
                            <Typography variant="label" color="#fff" style={{ fontWeight: 'bold', fontSize: 10 }}>
                                {temple.category?.toUpperCase()}
                            </Typography>
                        </View>
                        <Typography variant="h1" color="#fff" style={styles.templeName}>
                            {temple.name}
                        </Typography>
                        <View style={styles.locationRow}>
                            <MapPin size={16} color="#fff" />
                            <Typography variant="body" color="#fff" style={{ marginLeft: 6, fontWeight: '500' }}>
                                {temple.city}, {temple.state}
                            </Typography>
                        </View>
                    </View>
                </View>

                {/* Info Bar with guaranteed visibility */}
                <View style={[styles.infoBar, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                    <View style={styles.infoItem}>
                        <Clock size={20} color={colors.saffron} />
                        <Typography variant="label" color={colors.mutedForeground} style={{ marginTop: 4, fontSize: 10 }}>TIMINGS</Typography>
                        <Typography variant="bodySmall" color={colors.foreground} style={{ fontWeight: 'bold' }} numberOfLines={1}>
                            {temple.timings || "Open"}
                        </Typography>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.infoItem}>
                        <Star size={20} color={colors.saffron} />
                        <Typography variant="label" color={colors.mutedForeground} style={{ marginTop: 4, fontSize: 10 }}>RATING</Typography>
                        <Typography variant="bodySmall" color={colors.foreground} style={{ fontWeight: 'bold' }}>4.9/5.0</Typography>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.infoItem}>
                        <ShieldCheck size={20} color={colors.saffron} />
                        <Typography variant="label" color={colors.mutedForeground} style={{ marginTop: 4, fontSize: 10 }}>VERIFIED</Typography>
                        <Typography variant="bodySmall" color={colors.foreground} style={{ fontWeight: 'bold' }}>Sacred</Typography>
                    </View>
                </View>

                <View style={styles.contentBody}>
                    {/* Description Section */}
                    <Typography variant="h3" color={colors.foreground} style={styles.sectionTitle}>Spiritual History</Typography>
                    <Typography variant="body" color={colors.mutedForeground} style={styles.descriptionText}>
                        {temple.history || temple.description}
                    </Typography>

                    {/* Prasad Details Card */}
                    <Typography variant="h3" color={colors.foreground} style={styles.sectionTitle}>Sacred Prasad Box</Typography>
                    <Card variant="solid" style={styles.prasadCard}>
                        <View style={styles.prasadHeader}>
                            <Gift size={24} color={colors.saffron} />
                            <Typography variant="h3" color={colors.foreground} style={{ marginLeft: 12 }}>Items in the Box</Typography>
                        </View>

                        <View style={styles.itemsGrid}>
                            {temple.prasad_items?.map((item: string, idx: number) => (
                                <View key={idx} style={styles.listItem}>
                                    <View style={[styles.bullet, { backgroundColor: colors.saffron + '20' }]}>
                                        <Typography variant="label" color={colors.saffron}>✓</Typography>
                                    </View>
                                    <Typography variant="body" color={colors.foreground} style={{ flex: 1 }}>{item}</Typography>
                                </View>
                            ))}
                        </View>

                        <View style={[styles.cardDivider, { backgroundColor: colors.borderMuted }]} />

                        <View style={styles.cardFooter}>
                            <View>
                                <Typography variant="label" color={colors.mutedForeground}>Total Prasad Dakshina</Typography>
                                <Typography variant="h2" color={colors.saffron}>₹{temple.prasad_price || "101"}</Typography>
                            </View>
                        </View>
                    </Card>

                    {/* How it works */}
                    <View style={[styles.howItWorks, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                        <Info size={18} color={colors.saffron} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Typography variant="body" style={{ fontWeight: 'bold', marginBottom: 2 }}>Order Delivery Info</Typography>
                            <Typography variant="label" color={colors.mutedForeground} style={{ lineHeight: 18 }}>
                                The Prasad is offered in your name. We hygienically pack it at the shrine and ship it to your home within 7 working days.
                            </Typography>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Bottom Footer */}
            <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.borderMuted, paddingBottom: insets.bottom + 16 }]}>
                <View style={styles.footerContent}>
                    <View>
                        <Typography variant="bodySmall" color={colors.mutedForeground}>To Pay</Typography>
                        <Typography variant="h2" color={colors.foreground}>₹{temple.prasad_price || "101"}</Typography>
                    </View>
                    <Button
                        title="Sponsor Prasad"
                        onPress={handleBooking}
                        style={{ minWidth: 200 }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    heroSection: {
        height: 380,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    heroTextContainer: {
        position: 'absolute',
        bottom: 60, // Higher bottom to make space for overlapping bar
        left: 20,
        right: 20,
    },
    categoryTag: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(249, 115, 22, 0.9)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 8,
    },
    templeName: {
        marginBottom: 8,
        lineHeight: 38,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentBody: {
        paddingHorizontal: 20,
    },
    infoBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        marginTop: -40, // Floating effect
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 10,
        zIndex: 10,
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
    },
    separator: {
        width: 1,
        height: 40,
        backgroundColor: '#e2e8f0',
        alignSelf: 'center',
    },
    sectionTitle: {
        marginBottom: 12,
        fontWeight: '700',
    },
    descriptionText: {
        lineHeight: 22,
        marginBottom: 32,
    },
    prasadCard: {
        padding: 20,
        borderRadius: 24,
        marginBottom: 32,
    },
    prasadHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    itemsGrid: {
        gap: 12,
        marginBottom: 20,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    bullet: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardDivider: {
        height: 1,
        marginBottom: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    howItWorks: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 20,
        borderRadius: 18,
        borderWidth: 1,
        marginBottom: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingTop: 18,
        borderTopWidth: 1,
    },
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
