import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowRight,
  Bell,
  Calendar,
  Filter,
  Moon,
  Search,
  CircleX,
  Stars,
  Sun
} from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedWaveButton } from "../../components/ui/AnimatedWaveButton";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { FallbackImage } from "../../components/ui/FallbackImage";
import { Footer } from "../../components/ui/Footer";
import { Typography } from "../../components/ui/Typography";
import { useGuruAssistant } from "../../context/GuruAssistantContext";
import { useTheme } from "../../context/ThemeContext";
import { getImageSource } from "../../utils/imageResolver";
import { sanitizeData } from "../../utils/sanitizer";
import { supabase } from "../../utils/supabase";
import { getLocalized } from "../../utils/translation";

export default function PujasTabScreen() {
  const router = useRouter();
  const { theme, colors, toggleTheme } = useTheme();
  const { handleScroll } = useGuruAssistant();
  const { t } = useTranslation();

  const CATEGORIES = [
    t("music.categories.all", "All"),
    t("hi.json:pujas.categories.vedic_ritual", "Vedic Ritual"),
    t("hi.json:pujas.categories.dosh_nivarana", "Dosh Nivarana"),
    t("hi.json:pujas.categories.shanti_path", "Shanti Path"),
    t("hi.json:pujas.categories.healing", "Healing"),
    t("hi.json:pujas.categories.spiritual", "Spiritual"),
  ];

  const [pujas, setPujas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);



  const fetchPujas = useCallback(async () => {
    try {
      // Optimistic Offline Storage Load
      const cachedPujas = await AsyncStorage.getItem("cached_all_pujas");
      if (cachedPujas && pujas.length === 0) {
        setPujas(sanitizeData(JSON.parse(cachedPujas)));
        setLoading(false); // Stop loading immediately if cache exists
      }

      const { data, error } = await supabase
        .from("poojas")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) {
        // Fallback to newest if sort_order doesn't exist
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("poojas")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (fallbackError) throw fallbackError;
        if (fallbackData) {
          setPujas(sanitizeData(fallbackData));
          await AsyncStorage.setItem("cached_all_pujas", JSON.stringify(fallbackData));
        }
      } else if (data) {
        setPujas(sanitizeData(data));
        await AsyncStorage.setItem("cached_all_pujas", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error fetching pujas:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [pujas.length]);

  useEffect(() => {
    fetchPujas();

    // --- REALTIME SUBSCRIPTION ---
    const pujaSubscription = supabase
      .channel('puja-list-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'poojas' },
        () => fetchPujas()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(pujaSubscription);
    };
  }, [fetchPujas]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPujas();
  };

  // Filter Logic
  const filteredPujas = pujas.filter((puja) => {
    const name = puja.name?.toLowerCase() || "";
    const desc = puja.about_description?.toLowerCase() || "";
    const tagline = puja.tagline?.toLowerCase() || "";
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch = 
      name.includes(query) || 
      desc.includes(query) || 
      tagline.includes(query) ||
      (puja.tags && Array.isArray(puja.tags) && puja.tags.some((t: string) => t.toLowerCase().includes(query)));

    if (selectedCategory === "All") return matchesSearch;

    let matchesCategory = false;
    const categoryId = selectedCategory.toLowerCase();

    // Match against exact tags if they exist
    if (puja.tags && Array.isArray(puja.tags)) {
      matchesCategory = puja.tags.some((tag: string) =>
        tag.toLowerCase().includes(categoryId),
      );
    }

    // Expanded logical fallback matching based on names (especially for Hindi titles)
    if (!matchesCategory) {
      if (
        categoryId === "dosh nivarana" &&
        (name.includes("dosh") || name.includes("दोष"))
      )
        matchesCategory = true;
      if (
        categoryId === "shanti path" &&
        (name.includes("shanti") || name.includes("शांति"))
      )
        matchesCategory = true;
      if (
        categoryId === "healing" &&
        (name.includes("rog") ||
          name.includes("रोग") ||
          name.includes("sanjeevani") ||
          name.includes("संजीवनी"))
      )
        matchesCategory = true;
      if (
        categoryId === "spiritual" &&
        (name.includes("rudra") ||
          name.includes("रुद्र") ||
          name.includes("katha") ||
          name.includes("कथा"))
      )
        matchesCategory = true;
      if (
        categoryId === "vedic ritual" &&
        (name.includes("puja") ||
          name.includes("पूजा") ||
          name.includes("yagya") ||
          name.includes("यज्ञ"))
      )
        matchesCategory = true;
    }

    return matchesSearch && matchesCategory;
  });

  const popularPujas = pujas.filter((puja) => puja.is_featured);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(8);
  }, [searchQuery, selectedCategory]);

  const isSearchingOrFiltering =
    searchQuery.trim() !== "" || selectedCategory !== "All";

  return (
    <View style={[styles.container, { backgroundColor: "transparent" }]}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      {/* Top Navigation Bar (Fixed) */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.borderMuted,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <Typography variant="h2" color={colors.foreground}>
            {t("pujas.title", "Divine Pujas")}
          </Typography>
          <Typography
            variant="bodySmall"
            color={colors.saffron}
            style={{ marginTop: 4, fontWeight: "600" }}
          >
            {spiritualSubheading}
          </Typography>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/notifications")}
          >
            <Bell size={22} color={colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/calendar")}
          >
            <Calendar size={22} color={colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
            {theme === "dark" ? (
              <Sun size={22} color={colors.gold} />
            ) : (
              <Moon size={22} color={colors.foreground} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => handleScroll(e.nativeEvent.contentOffset.y)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.saffron}
          />
        }
      >
        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: colors.card, borderColor: colors.borderMuted },
          ]}
        >
          <Search size={20} color={colors.muted} />
          <TextInput
            placeholder={t("pujas.search_placeholder", "Search divine pujas...")}
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

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isSelected
                      ? colors.saffron
                      : "transparent",
                    borderColor: isSelected
                      ? colors.saffron
                      : colors.borderMuted,
                  },
                ]}
              >
                <Typography
                  variant="bodySmall"
                  style={{ fontWeight: isSelected ? "bold" : "600" }}
                  color={isSelected ? "#fff" : colors.mutedForeground}
                >
                  {category}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Spiritual Tools (Missing Section Restored) */}
        {!isSearchingOrFiltering && (
          <View style={{ marginBottom: 32 }}>
            <View style={styles.sectionHeader}>
              <Typography variant="h3" color={colors.foreground}>
                {t("pujas.spiritual_tools", "Spiritual Tools")}
              </Typography>
            </View>
            <View style={styles.toolsContainer}>
              <TouchableOpacity
                style={[styles.toolCard, { backgroundColor: colors.card, width: "48%" }]}
                activeOpacity={0.8}
                onPress={() => router.push("/horoscope" as any)}
              >
                <View style={[styles.toolIconBg, { backgroundColor: colors.saffron + '15' }]}>
                  <Sun size={24} color={colors.saffron} />
                </View>
                <Typography variant="body" style={{ fontWeight: 'bold', marginTop: 12 }} color={colors.foreground}>
                  {t("pujas.tools.horoscope", "Horoscope")}
                </Typography>
                <Typography variant="label" color={colors.mutedForeground} style={{ marginTop: 4 }}>
                  {t("pujas.tools.horoscope_desc", "Daily cosmic insights")}
                </Typography>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.toolCard, { backgroundColor: colors.card, width: "48%" }]}
                activeOpacity={0.8}
                onPress={() => router.push("/numerology" as any)}
              >
                <View style={[styles.toolIconBg, { backgroundColor: colors.saffron + '15' }]}>
                  <Stars size={24} color={colors.saffron} />
                </View>
                <Typography variant="body" style={{ fontWeight: 'bold', marginTop: 12 }} color={colors.foreground}>
                  {t("pujas.tools.numerology", "Numerology")}
                </Typography>
                <Typography variant="label" color={colors.mutedForeground} style={{ marginTop: 4 }}>
                  {t("pujas.tools.numerology_desc", "Discover your numbers")}
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* --- HIDE THESE SECTIONS WHEN SEARCHING --- */}
        {!isSearchingOrFiltering && (
          <>

            {/* Popular Pujas */}
            {!loading && popularPujas.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <Typography variant="h3" color={colors.foreground}>
                    {t("home.popular_pujas", "Popular Pujas")}
                  </Typography>
                  <TouchableOpacity>
                    <Typography
                      variant="bodySmall"
                      color={colors.saffron}
                      style={{ fontWeight: "600" }}
                    >
                      {t("common.see_all", "View All")}
                    </Typography>
                  </TouchableOpacity>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.horizontalScroll}
                >
                  {popularPujas.map((puja) => (
                    <TouchableOpacity
                      key={`pop-${puja.id}`}
                      activeOpacity={0.9}
                      onPress={() => router.push(`/pujas/${puja.id}`)}
                    >
                      <Card variant="solid" style={styles.pujaCard}>
                        <FallbackImage
                          source={getImageSource(puja.images)}
                          style={styles.pujaCardImageMock}
                          contentFit="cover"
                        />
                        <View style={styles.pujaCardContent}>
                          <Typography
                            variant="body"
                            style={{ fontWeight: "bold" }}
                            color={colors.foreground}
                          >
                            {getLocalized(puja, 'name')}
                          </Typography>
                          <Typography
                            variant="bodySmall"
                            color={colors.mutedForeground}
                            numberOfLines={2}
                            style={{ marginTop: 4 }}
                          >
                            {getLocalized(puja, 'tagline') || getLocalized(puja, 'about_description')}
                          </Typography>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginTop: 12,
                            }}
                          >
                            <Typography variant="label" color={colors.saffron}>
                              View Details
                            </Typography>
                            <ArrowRight
                              size={14}
                              color={colors.saffron}
                              style={{ marginLeft: 4 }}
                            />
                          </View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}
          </>
        )}
        {/* --- END SEARCH HIDE --- */}

        {/* All Pujas / Search Results */}
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <ActivityIndicator size="large" color={colors.saffron} />
          </View>
        ) : (
          <>
            <View
              style={[
                styles.sectionHeader,
                { marginTop: isSearchingOrFiltering ? 8 : 32 },
              ]}
            >
              <Typography variant="h3" color={colors.foreground}>
                {isSearchingOrFiltering ? t("pujas.search_results", "Search Results") : t("pujas.all_pujas", "All Pujas")}
              </Typography>
            </View>

            {filteredPujas.length === 0 ? (
              <View style={{ alignItems: "center", marginVertical: 40 }}>
                <Filter
                  size={48}
                  color={colors.borderMuted}
                  style={{ marginBottom: 16 }}
                />
                <Typography variant="body" color={colors.mutedForeground}>
                  {t("pujas.no_pujas_found", "No Pujas found matching your criteria.")}
                </Typography>
                <Button
                  title={t("pujas.clear_filters", "Clear Filters")}
                  variant="outline"
                  onPress={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  style={{ marginTop: 16 }}
                />
              </View>
            ) : (
              <View style={styles.allPujasList}>
                {filteredPujas.slice(0, visibleCount).map((puja) => (
                  <TouchableOpacity
                    key={`all-${puja.id}`}
                    activeOpacity={0.9}
                    onPress={() => router.push(`/pujas/${puja.id}`)}
                  >
                    <Card variant="solid" style={styles.listCard}>
                      <FallbackImage
                        source={getImageSource(puja.images)}
                        style={styles.listImageMock}
                        contentFit="cover"
                      />
                      <View style={styles.listContent}>
                        <Typography
                          variant="body"
                          style={{ fontWeight: "bold" }}
                          color={colors.foreground}
                        >
                          {getLocalized(puja, 'name')}
                        </Typography>
                        <Typography
                          variant="bodySmall"
                          color={colors.mutedForeground}
                          numberOfLines={2}
                          style={{ marginTop: 4 }}
                        >
                          {getLocalized(puja, 'tagline') || getLocalized(puja, 'about_description')}
                        </Typography>
                        {puja.is_offer_999 && (
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                            <View style={{ backgroundColor: colors.saffron + '15', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                              <Typography variant="label" color={colors.saffron} style={{ fontWeight: 'bold', fontSize: 10 }}>
                                SPECIAL OFFER
                              </Typography>
                            </View>
                          </View>
                        )}
                      </View>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {filteredPujas.length > 0 &&
              visibleCount < filteredPujas.length && (
                <View style={{ marginBottom: 40 }}>
                  <AnimatedWaveButton
                    title={t("pujas.view_more_pujas", "VIEW MORE PUJAS")}
                    onPress={() => setVisibleCount((prev) => prev + 8)}
                  />
                </View>
              )}
          </>
        )}

        {/* Footer */}
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
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    zIndex: 10,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconButton: {
    padding: 4,
    marginLeft: 8,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 100,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 32,
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  categoriesScroll: {
    marginBottom: 32,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  toolsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  toolCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: "flex-start",
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
    minHeight: 140,
  },
  toolIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  pujaCard: {
    width: 260,
    marginRight: 16,
    padding: 0,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  pujaCardImageMock: {
    height: 120,
    width: "100%",
  },
  pujaCardContent: {
    padding: 16,
  },
  allPujasList: {
    gap: 16,
    marginBottom: 40,
  },
  listCard: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  listImageMock: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  listContent: {
    flex: 1,
  },
});
