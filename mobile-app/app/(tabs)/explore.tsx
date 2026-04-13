import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Bell, Calendar, CircleX, Moon, Search, Sun, Instagram } from "lucide-react-native";
import { SocialMediaModal } from "../../components/SocialMediaModal";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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

const CATEGORIES = [
  "All",
  "Jyotirlinga",
  "Shakti Peeth",
  "Char Dham",
  "Ancient",
  "Holy River",
];

export default function ExploreTabScreen() {
  const router = useRouter();
  const { theme, colors, toggleTheme } = useTheme();
  const { handleScroll } = useGuruAssistant();
  const { t } = useTranslation();

  const [destinations, setDestinations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isSocialModalVisible, setIsSocialModalVisible] = useState(false);

  useEffect(() => {
    fetchDestinations();

    // --- REALTIME SUBSCRIPTION ---
    const destinationSubscription = supabase
      .channel('explore-list-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'destinations' },
        () => fetchDestinations()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(destinationSubscription);
    };
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("destinations")
        .select("id, name, tagline, description, images")
        .eq("is_active", true)
        .order("order_rank", { ascending: true });

      if (error) throw error;
      if (data) setDestinations(sanitizeData(data));
    } catch (err) {
      console.error("Error fetching destinations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reset pagination on search or filter change
  useEffect(() => {
    setVisibleCount(8);
  }, [searchQuery, selectedCategory]);

  // Filter Logic
  const filteredDestinations = destinations.filter((loc) => {
    const name = loc.name?.toLowerCase() || "";
    const tagline = loc.tagline?.toLowerCase() || "";
    const description = loc.description?.toLowerCase() || "";
    const keywords = loc.seo_keywords?.toLowerCase() || "";
    const query = searchQuery.trim().toLowerCase();

    // Combined desc for existing category logic
    const desc = (tagline || description || "");

    const matchesSearch =
      name.includes(query) ||
      tagline.includes(query) ||
      description.includes(query) ||
      keywords.includes(query);

    if (selectedCategory === "All") return matchesSearch;

    let matchesCategory = false;
    const categoryId = selectedCategory.toLowerCase();

    // In a real app we'd map tags, but for now we fallback to simple text scanning for the mock categories
    if (
      loc.seo_keywords &&
      loc.seo_keywords.toLowerCase().includes(categoryId)
    ) {
      matchesCategory = true;
    } else {
      if (
        categoryId === "jyotirlinga" &&
        (name.includes("ujjain") ||
          name.includes("varanasi") ||
          desc.includes("jyotirlinga"))
      )
        matchesCategory = true;
      if (
        categoryId === "shakti peeth" &&
        (name.includes("kamakhya") || desc.includes("shakti"))
      )
        matchesCategory = true;
      if (
        categoryId === "holy river" &&
        (name.includes("haridwar") ||
          name.includes("varanasi") ||
          name.includes("rishikesh") ||
          desc.includes("ganga"))
      )
        matchesCategory = true;
      if (
        categoryId === "ancient" &&
        (name.includes("ayodhya") ||
          name.includes("mathura") ||
          desc.includes("ancient"))
      )
        matchesCategory = true;
      if (
        categoryId === "char dham" &&
        (name.includes("badrinath") ||
          name.includes("puri") ||
          name.includes("dwarka") ||
          name.includes("rameswaram") ||
          desc.includes("char dham"))
      )
        matchesCategory = true;
    }

    return matchesSearch && matchesCategory;
  });

  const popularDestinations = destinations.slice(0, 4);

  const isSearchingOrFiltering =
    searchQuery.trim() !== "" || selectedCategory !== "All";

  return (
    <View style={[styles.container, { backgroundColor: "transparent" }]}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      {/* Top Navigation Bar */}
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
            {t("explore.title", "Sacred Places")}
          </Typography>
          <Typography
            variant="bodySmall"
            color={colors.saffron}
            style={{ marginTop: 4, fontWeight: "600" }}
          >
            {t("explore.subtitle", "Discover the divine")}
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
          <TouchableOpacity style={styles.iconButton} onPress={() => setIsSocialModalVisible(true)}>
            <Instagram size={22} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <SocialMediaModal 
        isVisible={isSocialModalVisible} 
        onClose={() => setIsSocialModalVisible(false)} 
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => handleScroll(e.nativeEvent.contentOffset.y)}
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
            placeholder={t("explore.search_placeholder", "Search sacred destinations...")}
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

        {loading && destinations.length === 0 ? (
          <ActivityIndicator
            color={colors.saffron}
            style={{ marginVertical: 32 }}
          />
        ) : (
          <>
            {!isSearchingOrFiltering && (
              <>
                {/* Popular Destinations (4 Cards, 2 Rows layout) */}
                <View style={styles.sectionHeader}>
                  <Typography variant="h3" color={colors.foreground}>
                    {t("explore.popular_destinations", "Popular Destinations")}
                  </Typography>
                </View>
                <View style={styles.destinationsGrid}>
                  {popularDestinations.map((loc, idx) => (
                    <TouchableOpacity
                      key={`pop-${loc.id || idx}`}
                      style={styles.gridCard}
                      activeOpacity={0.9}
                      onPress={() => router.push(`/explore/${loc.id}`)}
                    >
                      <Card variant="solid" style={{ flex: 1, padding: 0 }}>
                        <FallbackImage
                          source={getImageSource(loc.images)}
                          style={styles.cardImageMock}
                          contentFit="cover"
                        />
                        <View style={styles.cardContent}>
                          <Typography
                            variant="body"
                            style={{ fontWeight: "bold" }}
                            numberOfLines={1}
                            color={colors.foreground}
                          >
                            {loc.name}
                          </Typography>
                          <Typography
                            variant="bodySmall"
                            color={colors.mutedForeground}
                            numberOfLines={2}
                            style={{ marginTop: 2 }}
                          >
                            {loc.tagline || loc.description}
                          </Typography>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {/* All Destinations (List) */}
            <View
              style={[
                styles.sectionHeader,
                { marginTop: isSearchingOrFiltering ? 8 : 32 },
              ]}
            >
              <Typography variant="h3" color={colors.foreground}>
                {isSearchingOrFiltering ? t("explore.search_results", "Search Results") : t("explore.all_destinations", "All Destinations")}
              </Typography>
            </View>
            {filteredDestinations.length === 0 ? (
              <View style={{ alignItems: "center", marginVertical: 40 }}>
                <Typography variant="body" color={colors.mutedForeground}>
                  {t("explore.no_destinations", "No Destinations found.")}
                </Typography>
                <Button
                  title={t("explore.clear_filters", "Clear Filters")}
                  variant="outline"
                  onPress={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  style={{ marginTop: 16 }}
                />
              </View>
            ) : (
              <View style={styles.allDestinationsList}>
                {filteredDestinations.slice(0, visibleCount).map((loc, idx) => (
                  <TouchableOpacity
                    key={`all-${loc.id || idx}`}
                    activeOpacity={0.9}
                    onPress={() => router.push(`/explore/${loc.id}`)}
                  >
                    <Card variant="solid" style={styles.listCard}>
                      <FallbackImage
                        source={getImageSource(loc.images)}
                        style={styles.listImageMock}
                        contentFit="cover"
                      />
                      <View style={styles.listContent}>
                        <Typography
                          variant="body"
                          style={{ fontWeight: "bold" }}
                          color={colors.foreground}
                        >
                          {loc.name}
                        </Typography>
                        <Typography
                          variant="bodySmall"
                          color={colors.mutedForeground}
                          numberOfLines={2}
                          style={{ marginTop: 4 }}
                        >
                          {loc.tagline ||
                            loc.description ||
                            t("explore.fallback_desc", { name: loc.name, defaultValue: `Explore temples, sacred ghats, and deep spiritual history located in ${loc.name}.` })}
                        </Typography>
                      </View>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* View More Button */}
            {filteredDestinations.length > 0 &&
              visibleCount < filteredDestinations.length && (
                <TouchableOpacity
                  style={[
                    styles.viewMoreButton,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.borderMuted,
                    },
                  ]}
                  onPress={() => setVisibleCount((prev) => prev + 8)}
                  activeOpacity={0.8}
                >
                  <Typography
                    variant="body"
                    color={colors.foreground}
                    style={{ fontWeight: "600" }}
                  >
                    {t("explore.view_more", "View More Destinations")}
                  </Typography>
                </TouchableOpacity>
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
    marginBottom: 20,
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
    marginBottom: 16,
  },
  destinationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridCard: {
    width: "48%",
    padding: 0,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  cardImageMock: {
    height: 100,
    width: "100%",
  },
  cardContent: {
    padding: 12,
  },
  allDestinationsList: {
    gap: 16,
    marginBottom: 20,
  },
  viewMoreButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
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
