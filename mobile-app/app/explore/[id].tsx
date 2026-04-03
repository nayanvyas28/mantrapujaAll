import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Info,
  Landmark,
  MapPin,
  Sparkles,
} from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { FallbackImage } from "../../components/ui/FallbackImage";
import { Footer } from "../../components/ui/Footer";
import { Typography } from "../../components/ui/Typography";
import { useTheme } from "../../context/ThemeContext";
import { getImageSource } from "../../utils/imageResolver";
import { sanitizeData } from "../../utils/sanitizer";
import { supabase } from "../../utils/supabase";

// { width } = Dimensions.get("window"); // width removed as it was unused

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme, colors: themeColors } = useTheme();

  const [location, setLocation] = useState<any>(null);
  const [famousPoojas, setFamousPoojas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRelatedPoojas = useCallback(async (destName: string) => {
    try {
      // First try to find poojas that match the destination name
      let { data: poojas } = await supabase
        .from("poojas")
        .select("id, name, tagline, images, price")
        .eq("is_active", true)
        .ilike("seo_keywords", `%${destName}%`)
        .limit(3);

      if (poojas) setFamousPoojas(sanitizeData(poojas));
    } catch (err) {
      console.error("Error fetching related poojas:", err);
    }
  }, []);

  const fetchDestinationDetails = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        setLocation(sanitizeData(data));
        fetchRelatedPoojas(data.name);
      }
    } catch (err) {
      console.error("Error fetching destination details:", err);
    } finally {
      setLoading(false);
    }
  }, [id, fetchRelatedPoojas]);

  useEffect(() => {
    if (id) {
      fetchDestinationDetails();
    }
  }, [id, fetchDestinationDetails]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: themeColors.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={themeColors.saffron} />
      </View>
    );
  }

  if (!location) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: themeColors.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Typography variant="body" color={themeColors.foreground}>
          Destination not found.
        </Typography>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }

  // Safely parse content column if it exists and is an object
  const details =
    typeof location.content === "object" && location.content !== null
      ? location.content
      : {};
  const highlights = Array.isArray(details.highlights)
    ? details.highlights
    : [];
  const keyRituals = Array.isArray(details.keyRituals)
    ? details.keyRituals
    : [];

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <FallbackImage
            source={getImageSource(location.images)}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={styles.heroOverlay} />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.heroContent}>
            <Typography variant="h1" color="#fff" style={styles.heroTitle}>
              {location.name}
            </Typography>
            <View style={styles.locationTag}>
              <MapPin size={16} color={themeColors.saffron} />
              <Typography
                variant="bodySmall"
                color="#fed7aa"
                style={{ marginLeft: 6 }}
              >
                {location.tagline || location.description}
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.paddedContent}>
          {/* Significance Section */}
          {(details.significance || location.description) && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Info size={20} color={themeColors.saffron} />
                <Typography variant="h3" style={{ marginLeft: 10 }}>
                  Significance
                </Typography>
              </View>
              <Card variant="solid" style={styles.infoCard}>
                <Typography
                  variant="body"
                  color={themeColors.mutedForeground}
                  style={{ lineHeight: 24 }}
                >
                  {details.significance || location.description}
                </Typography>
              </Card>
            </View>
          )}

          {/* Famous Poojas Section */}
          {famousPoojas.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Sparkles size={20} color={themeColors.saffron} />
                <Typography variant="h3" style={{ marginLeft: 10 }}>
                  Famous Poojas Here
                </Typography>
              </View>
              <View style={styles.templeList}>
                {famousPoojas.map((puja: any, idx: number) => (
                  <TouchableOpacity
                    key={`puja-${puja.id || idx}`}
                    activeOpacity={0.8}
                    onPress={() => router.push(`/pujas/${puja.id}`)}
                  >
                    <Card variant="solid" style={styles.templeCard}>
                      <FallbackImage
                        source={getImageSource(puja.images)}
                        style={styles.pujaThumbnail}
                        contentFit="cover"
                      />
                      <View style={{ flex: 1 }}>
                        <Typography
                          variant="body"
                          style={{ fontWeight: "bold" }}
                          color={themeColors.foreground}
                        >
                          {puja.name}
                        </Typography>
                        <Typography
                          variant="bodySmall"
                          color={themeColors.mutedForeground}
                          numberOfLines={2}
                          style={{ marginTop: 2 }}
                        >
                          {puja.tagline}
                        </Typography>
                      </View>
                      <ArrowRight size={18} color={themeColors.saffron} />
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Temples to Visit */}
          {highlights.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Landmark size={20} color={themeColors.saffron} />
                <Typography variant="h3" style={{ marginLeft: 10 }}>
                  Sacred Highlights
                </Typography>
              </View>
              <View style={styles.templeList}>
                {highlights.map((highlight: any, idx: number) => (
                  <Card
                    key={`hi-${idx}`}
                    variant="solid"
                    style={styles.templeCard}
                  >
                    <View
                      style={[
                        styles.bullet,
                        { backgroundColor: themeColors.saffron },
                      ]}
                    />
                    <View style={{ flex: 1 }}>
                      <Typography variant="body" style={{ fontWeight: "bold" }}>
                        {highlight.name}
                      </Typography>
                      <Typography
                        variant="bodySmall"
                        color={themeColors.mutedForeground}
                      >
                        {highlight.description}
                      </Typography>
                    </View>
                  </Card>
                ))}
              </View>
            </View>
          )}

          {/* Sacred Rituals Section */}
          {keyRituals.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Sparkles size={20} color={themeColors.saffron} />
                <Typography variant="h3" style={{ marginLeft: 10 }}>
                  Local Rituals
                </Typography>
              </View>
              <View style={styles.templeList}>
                {keyRituals.map((ritual: any, idx: number) => (
                  <Card
                    key={`rit-${idx}`}
                    variant="solid"
                    style={styles.templeCard}
                  >
                    <View style={{ flex: 1 }}>
                      <Typography variant="body" style={{ fontWeight: "bold" }}>
                        {ritual.name}
                      </Typography>
                      <Typography
                        variant="bodySmall"
                        color={themeColors.mutedForeground}
                      >
                        {ritual.description}
                      </Typography>
                    </View>
                  </Card>
                ))}
              </View>
            </View>
          )}

          {/* History Section */}
          {details.history && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Calendar size={20} color={themeColors.saffron} />
                <Typography variant="h3" style={{ marginLeft: 10 }}>
                  Heritage & History
                </Typography>
              </View>
              <Typography
                variant="body"
                color={themeColors.mutedForeground}
                style={{ lineHeight: 24 }}
              >
                {details.history}
              </Typography>
            </View>
          )}

          <View style={{ marginTop: 40, marginBottom: 20 }}>
            <Footer />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  heroSection: {
    height: 380,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.4)", // Semi-transparent overlay
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  heroContent: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  locationTag: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  paddedContent: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoCard: {
    padding: 20,
  },
  templeList: {
    gap: 12,
  },
  templeCard: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 16,
  },
  pujaThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
});
