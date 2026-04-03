import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronLeft, CircleX, MapPin, Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card } from "../../components/ui/Card";
import { FallbackImage } from "../../components/ui/FallbackImage";
import { Typography } from "../../components/ui/Typography";
import { useGuruAssistant } from "../../context/GuruAssistantContext";
import { useTheme } from "../../context/ThemeContext";
import { supabase } from "../../utils/supabase";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 40 - 16) / 2; // 20 padding each side, 16 gap

const CATEGORIES = ["All", "Jyotirlinga", "Char Dham", "Shakti Peeth", "Vishnu", "Shiva", "Ganesha"];

export default function PrasadListingScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { theme, colors } = useTheme();
    const { handleScroll } = useGuruAssistant();

    const [temples, setTemples] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetchTemples();
    }, []);

    const fetchTemples = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("temple")
                .select("*")
                .eq("is_active", true)
                .order("name", { ascending: true });

            if (error) throw error;
            if (data) setTemples(data);
        } catch (err) {
            console.error("Error fetching temples:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredTemples = temples.filter((t) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = 
            t.name.toLowerCase().includes(query) ||
            t.city.toLowerCase().includes(query) ||
            (t.description && t.description.toLowerCase().includes(query));
        const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const renderTempleItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.cardWrapper}
            activeOpacity={0.9}
            onPress={() => router.push(`/prasad/${item.id}`)}
        >
            <Card variant="solid" style={styles.templeCard}>
                <FallbackImage
                    source={{ uri: item.image_url }}
                    style={styles.templeImage}
                    contentFit="cover"
                />
                <View style={styles.cardContent}>
                    <View style={styles.categoryBadge}>
                        <Typography variant="label" color={colors.saffron} style={{ fontSize: 10, fontWeight: 'bold' }}>
                            {item.category}
                        </Typography>
                    </View>
                    <Typography variant="body" color={colors.foreground} numberOfLines={1} style={{ fontWeight: 'bold' }}>
                        {item.name}
                    </Typography>
                    <View style={styles.locationRow}>
                        <MapPin size={10} color={colors.mutedForeground} />
                        <Typography variant="label" color={colors.mutedForeground} numberOfLines={1} style={{ marginLeft: 4, flex: 1 }}>
                            {item.city}
                        </Typography>
                    </View>
                    <View style={styles.priceRow}>
                        <Typography variant="h3" color={colors.saffron} style={{ fontSize: 16 }}>₹{item.prasad_price}</Typography>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
            <StatusBar style={theme === "dark" ? "light" : "dark"} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={28} color={colors.foreground} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Typography variant="h2" color={colors.foreground}>Sacred Prasad</Typography>
                    <Typography variant="bodySmall" color={colors.saffron}>Blessings Delivery</Typography>
                </View>
                <View style={{ width: 28 }} />
            </View>

            <View style={styles.searchSection}>
                <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                    <Search size={20} color={colors.muted} />
                    <TextInput
                        placeholder="Search Temple or City..."
                        placeholderTextColor={colors.muted}
                        style={[styles.searchInput, { color: colors.foreground }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery("")}>
                            <CircleX size={18} color={colors.muted} />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.categoryScroll}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={CATEGORIES}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => setSelectedCategory(item)}
                                style={[
                                    styles.categoryPill,
                                    {
                                        backgroundColor: selectedCategory === item ? colors.saffron : colors.card,
                                        borderColor: selectedCategory === item ? colors.saffron : colors.borderMuted
                                    }
                                ]}
                            >
                                <Typography
                                    variant="label"
                                    color={selectedCategory === item ? "#fff" : colors.foreground}
                                    style={{ fontWeight: 'bold' }}
                                >
                                    {item}
                                </Typography>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>

            {loading ? (
                <ActivityIndicator color={colors.saffron} style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={filteredTemples}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTempleItem}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={(e) => handleScroll(e.nativeEvent.contentOffset.y)}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Typography variant="body" color={colors.mutedForeground}>No temples found.</Typography>
                        </View>
                    }
                />
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
    backButton: { padding: 5 },
    headerTitleContainer: { alignItems: "center" },
    searchSection: {
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 15,
        borderWidth: 1,
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
    },
    categoryScroll: {
        marginBottom: 10,
    },
    categoryPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 10,
    },
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    cardWrapper: {
        width: ITEM_WIDTH,
        marginBottom: 16,
    },
    templeCard: {
        padding: 0,
        borderRadius: 16,
        overflow: 'hidden',
    },
    templeImage: {
        width: '100%',
        height: 120,
    },
    cardContent: {
        padding: 10,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        backgroundColor: '#fff7ed',
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    priceRow: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
});
