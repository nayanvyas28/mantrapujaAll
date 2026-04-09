import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card } from "../../components/ui/Card";
import { FallbackImage } from "../../components/ui/FallbackImage";
import { Footer } from "../../components/ui/Footer";
import { Typography } from "../../components/ui/Typography";
import { useTheme } from "../../context/ThemeContext";
import { getImageSource } from "../../utils/imageResolver";
import { supabase } from "../../utils/supabase";

export default function Offer999Screen() {
    const router = useRouter();
    const { theme, colors, toggleTheme } = useTheme();
    const { t } = useTranslation();

    const [pujas, setPujas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOfferPujas = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("poojas")
                .select("*")
                .eq("is_active", true)
                .eq("is_offer_999", true)
                .order("offer_order", { ascending: true })
                .limit(15);

            if (error) throw error;
            setPujas(data || []);
        } catch (error) {
            console.error("Error fetching offer pujas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOfferPujas();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={theme === "dark" ? "light" : "dark"} />

            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.borderMuted }]}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <ArrowLeft size={24} color={colors.foreground} />
                    </TouchableOpacity>
                    <View>
                        <Typography variant="h2" color={colors.foreground}>
                            Special Offer
                        </Typography>
                        <Typography variant="bodySmall" color={colors.saffron} style={{ fontWeight: "600" }}>
                            Sacred Pujas @ ₹999
                        </Typography>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
                        {theme === "dark" ? <Sun size={22} color={colors.gold} /> : <Moon size={22} color={colors.foreground} />}
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <ActivityIndicator color={colors.saffron} style={{ marginTop: 100 }} size="large" />
                ) : pujas.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Typography variant="body" color={colors.mutedForeground}>
                            No active offers at the moment.
                        </Typography>
                    </View>
                ) : (
                    <View style={styles.grid}>
                        {pujas.map((puja) => (
                            <TouchableOpacity
                                key={puja.id}
                                activeOpacity={0.9}
                                style={styles.cardContainer}
                                onPress={() => router.push(`/pujas/${puja.id}`)}
                            >
                                <Card variant="solid" style={styles.listCard}>
                                    <View style={styles.imageWrapper}>
                                        <FallbackImage
                                            source={getImageSource(puja.images)}
                                            style={styles.cardImage}
                                            contentFit="cover"
                                        />
                                    </View>
                                    <View style={styles.cardContent}>
                                        <Typography variant="body" style={{ fontWeight: "bold" }} color={colors.foreground} numberOfLines={1}>
                                            {puja.name}
                                        </Typography>
                                        <Typography variant="bodySmall" color={colors.saffron} style={{ fontWeight: 'bold', fontSize: 10, marginTop: 4 }}>
                                            SPECIAL OFFER
                                        </Typography>
                                        <View style={styles.actionRow}>
                                            <Typography variant="label" color={colors.saffron}>View Details</Typography>
                                            <ArrowRight size={14} color={colors.saffron} style={{ marginLeft: 4 }} />
                                        </View>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                <Footer />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 16,
        borderBottomWidth: 1,
        zIndex: 10,
    },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
    headerRight: { flexDirection: "row", alignItems: "center", gap: 16 },
    backButton: { padding: 4 },
    iconButton: { padding: 4 },
    scrollContent: { padding: 24, paddingBottom: 100 },
    grid: { gap: 16, marginBottom: 40 },
    cardContainer: { width: "100%" },
    listCard: {
        flexDirection: "row",
        padding: 12,
        borderRadius: 16,
        alignItems: "center",
        shadowColor: "#0f172a",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    imageWrapper: { position: "relative" },
    cardImage: { width: 100, height: 100, borderRadius: 12 },
    priceTag: {
        position: "absolute",
        top: 6,
        left: 6,
        backgroundColor: "#f97316",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    cardContent: { flex: 1, marginLeft: 16 },
    actionRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
    emptyContainer: { alignItems: "center", marginTop: 100 },
});
