import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, ChevronRight, Droplets, MapPin, Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { FallbackImage } from "../../components/ui/FallbackImage";
import { Typography } from "../../components/ui/Typography";
import { useGuruAssistant } from "../../context/GuruAssistantContext";
import { useTheme } from "../../context/ThemeContext";
import { getImageSource } from "../../utils/imageResolver";
import { supabase } from "../../utils/supabase";

const { width } = Dimensions.get("window");

export default function JalAbhishekScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { theme, colors } = useTheme();
    const { handleScroll } = useGuruAssistant();

    const [jyotirlingas, setJyotirlingas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedJyotirlinga, setSelectedJyotirlinga] = useState<any>(null);

    useEffect(() => {
        fetchJyotirlingas();
    }, []);

    const fetchJyotirlingas = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("destinations")
                .select("*")
                .eq("is_active", true);

            if (error) throw error;

            if (data) {
                const filtered = data.filter((item: any) => {
                    const content = (
                        item.name + " " +
                        (item.tagline || "") + " " +
                        (item.description || "") + " " +
                        (item.seo_keywords || "")
                    ).toLowerCase();
                    return content.includes("jyotirlinga") ||
                        content.includes("jotirling") ||
                        content.includes("mahakaal") ||
                        content.includes("vishwanath") ||
                        content.includes("somnath") ||
                        content.includes("kedarnath");
                });
                setJyotirlingas(filtered);
            }
        } catch (err) {
            console.error("Error fetching Jyotirlingas:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredList = jyotirlingas.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBooking = () => {
        if (!selectedJyotirlinga) return;

        // Navigate to payment summary with selected location details
        router.push({
            pathname: "/pujas/payment-summary",
            params: {
                locationId: selectedJyotirlinga.id,
                locationName: selectedJyotirlinga.name,
                service: "Jal Abhishek"
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
                <View style={styles.headerTitleContainer}>
                    <Typography variant="h2" color={colors.foreground}>Jal Abhishek</Typography>
                    <Typography variant="bodySmall" color={colors.saffron}>Sankalp at Sacred Jyotirlingas</Typography>
                </View>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={(e) => handleScroll(e.nativeEvent.contentOffset.y)}
            >
                {/* Banner Section */}
                <Card variant="solid" style={styles.bannerCard}>
                    <View style={[styles.bannerIconContainer, { backgroundColor: colors.saffron + '20' }]}>
                        <Droplets size={40} color={colors.saffron} />
                    </View>
                    <View style={styles.bannerTextContainer}>
                        <Typography variant="h3" color={colors.foreground}>Virtual Jal Arpan</Typography>
                        <Typography variant="bodySmall" color={colors.mutedForeground}>
                            Perform a sacred Jal Abhishek ritual at any of the 12 holy Jyotirlingas.
                        </Typography>
                        <View style={styles.priceBadge}>
                            <Typography variant="h3" color={colors.saffron}>₹51</Typography>
                        </View>
                    </View>
                </Card>

                {/* Search */}
                <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                    <Search size={20} color={colors.muted} />
                    <TextInput
                        placeholder="Search Jyotirlinga..."
                        placeholderTextColor={colors.muted}
                        style={[styles.searchInput, { color: colors.foreground }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <Typography variant="h3" color={colors.foreground} style={styles.sectionTitle}>
                    Select Holy Location
                </Typography>

                {loading ? (
                    <ActivityIndicator color={colors.saffron} style={{ marginTop: 40 }} />
                ) : filteredList.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Typography variant="body" color={colors.mutedForeground}>No Jyotirlingas found.</Typography>
                    </View>
                ) : (
                    <View style={styles.grid}>
                        {filteredList.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.gridItem}
                                onPress={() => setSelectedJyotirlinga(item)}
                            >
                                <Card
                                    variant={selectedJyotirlinga?.id === item.id ? "elevated" : "solid"}
                                    style={[
                                        styles.locationCard,
                                        selectedJyotirlinga?.id === item.id && { borderColor: colors.saffron, borderWidth: 2 }
                                    ]}
                                >
                                    <FallbackImage
                                        source={getImageSource(item.images)}
                                        style={styles.locationImage}
                                        contentFit="cover"
                                    />
                                    <View style={styles.locationInfo}>
                                        <Typography variant="body" style={{ fontWeight: 'bold' }} numberOfLines={1}>
                                            {item.name}
                                        </Typography>
                                        <View style={styles.locationRow}>
                                            <MapPin size={12} color={colors.mutedForeground} />
                                            <Typography variant="label" color={colors.mutedForeground} style={{ marginLeft: 4 }}>
                                                Sacred Site
                                            </Typography>
                                        </View>
                                    </View>
                                    {selectedJyotirlinga?.id === item.id && (
                                        <View style={styles.selectedBadge}>
                                            <View style={{ backgroundColor: colors.saffron, borderRadius: 10, padding: 2 }}>
                                                <ChevronRight size={14} color="#fff" />
                                            </View>
                                        </View>
                                    )}
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Sticky Booking Button - Only visible when location is selected */}
            {selectedJyotirlinga && (
                <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.borderMuted, paddingBottom: insets.bottom + 16 }]}>
                    <View style={styles.footerContent}>
                        <View>
                            <Typography variant="bodySmall" color={colors.mutedForeground}>Total Amount</Typography>
                            <Typography variant="h2" color={colors.foreground}>₹51.00</Typography>
                        </View>
                        <Button
                            title="Confirm & Pay"
                            onPress={handleBooking}
                            style={{ width: 200 }}
                        />
                    </View>
                </View>
            )}
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
    backButton: {
        padding: 5,
    },
    headerTitleContainer: {
        alignItems: "center",
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 120,
    },
    bannerCard: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        marginBottom: 25,
        borderRadius: 20,
    },
    bannerIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    bannerTextContainer: {
        flex: 1,
    },
    priceBadge: {
        marginTop: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 15,
        borderWidth: 1,
        marginBottom: 25,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
    },
    sectionTitle: {
        marginBottom: 20,
        fontWeight: '700',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: 16,
    },
    locationCard: {
        padding: 0,
        borderRadius: 15,
        overflow: 'hidden',
        position: 'relative',
    },
    locationImage: {
        width: '100%',
        height: 120,
    },
    locationInfo: {
        padding: 12,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    selectedBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
