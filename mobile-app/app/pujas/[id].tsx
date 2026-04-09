import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  Clock,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { FallbackImage } from "../../components/ui/FallbackImage";
import { Footer } from "../../components/ui/Footer";
import { Typography } from "../../components/ui/Typography";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { getImageSource } from "../../utils/imageResolver";
import { sanitizeData } from "../../utils/sanitizer";
import { supabase } from "../../utils/supabase";

export default function PujaDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme, colors: themeColors } = useTheme();

  const [pujaDetail, setPujaDetail] = useState<any>(null);
  const [basePrice, setBasePrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPujaDetail = useCallback(async () => {
    if (!id) return;
    try {
      // Optimistic Cache Load
      const cachedDetail = await AsyncStorage.getItem(`cached_puja_${id}`);
      if (cachedDetail && !pujaDetail) {
        setPujaDetail(sanitizeData(JSON.parse(cachedDetail)));
        setLoading(false);
      }

      const { data, error } = await supabase
        .from("poojas")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setPujaDetail(sanitizeData(data));
        await AsyncStorage.setItem(`cached_puja_${id}`, JSON.stringify(data));
      }

      // Fetch base_price from new table
      const { data: summaryData, error: summaryError } = await supabase
        .from("pooja_payment_summaries")
        .select("base_price")
        .eq("pooja_id", id)
        .single();

      if (!summaryError && summaryData) {
        setBasePrice(summaryData.base_price);
      } else {
        setBasePrice(data?.price || 0); // fallback
      }
    } catch (error) {
      console.error("Error fetching puja details:", error);
    } finally {
      setLoading(false);
    }
  }, [id, pujaDetail]);

  useEffect(() => {
    fetchPujaDetail();
  }, [fetchPujaDetail]);

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

  if (!pujaDetail) {
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
          Puja not found.
        </Typography>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }

  const pujaTitle = pujaDetail.name || "Divine Ritual";
  const price = pujaDetail.is_offer_999
    ? "₹999"
    : basePrice && basePrice > 0
      ? `₹${basePrice}`
      : pujaDetail.price && pujaDetail.price > 0
        ? `₹${pujaDetail.price}`
        : "Price on request";
  const description =
    pujaDetail.about_description ||
    pujaDetail.description ||
    "This powerful Vedic ritual is performed to seek the blessings of the divine.";
  const duration = pujaDetail.duration || "3-4 Hours";

  // Parse benefits, falling back to dummy if database array is empty or missing
  let benefitsList = pujaDetail.benefits;
  if (
    !benefitsList ||
    (Array.isArray(benefitsList) && benefitsList.length === 0)
  ) {
    benefitsList = [
      "Removes negative energies and doshas",
      "Brings mental peace and clarity",
      "Improves health and longevity",
      "Attracts prosperity and removes blockages",
    ];
  }

  const whyPerformTitle =
    pujaDetail.why_perform_section_title || "Why Perform this Puja?";
  const whyPerformCards = pujaDetail.why_perform_cards || [];

  const processTitle =
    pujaDetail.ritual_process_section_title || "Authentic Ritual Process";
  const processSteps =
    pujaDetail.ritual_steps || pujaDetail.process_steps || [];

  const { user } = useAuth();

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <StatusBar style="light" />

      {/* Header Image Area */}
      <View style={styles.imagePlaceholder}>
        <FallbackImage
          source={getImageSource(pujaDetail.images)}
          contentFit="cover"
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(0,0,0,0.45)" },
          ]}
        />

        <View style={styles.headerOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Typography variant="h2" color="#fff" style={styles.overlayTitle}>
          {pujaTitle}
        </Typography>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <View style={{ flex: 1 }}>
            <Typography variant="h2" color={themeColors.foreground}>
              {pujaTitle}
            </Typography>
            <View style={styles.ratingRow}>
              <Star
                size={16}
                color={themeColors.gold}
                fill={themeColors.gold}
              />
              <Typography
                variant="bodySmall"
                color={themeColors.foreground}
                style={{ marginLeft: 6, fontWeight: "bold" }}
              >
                4.9{" "}
                <Typography variant="bodySmall" color={themeColors.muted}>
                  (120+ Bookings)
                </Typography>
              </Typography>
            </View>
            {pujaDetail.is_offer_999 && (
              <View style={[styles.offerBadge, { backgroundColor: themeColors.saffron + '20' }]}>
                <Typography variant="label" color={themeColors.saffron} style={{ fontWeight: 'bold' }}>
                  ✨ SPECIAL OFFER @ ₹999
                </Typography>
              </View>
            )}
          </View>
        </View>

        {/* Quick Info Bar */}
        <View
          style={[
            styles.infoBar,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.borderMuted,
            },
          ]}
        >
          <View style={styles.infoItem}>
            <Clock size={20} color={themeColors.saffron} />
            <Typography
              variant="bodySmall"
              color={themeColors.foreground}
              style={styles.infoText}
            >
              {duration}
            </Typography>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <Users size={20} color={themeColors.saffron} />
            <Typography
              variant="bodySmall"
              color={themeColors.foreground}
              style={styles.infoText}
            >
              3 Pandits
            </Typography>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoItem}>
            <ShieldCheck size={20} color={themeColors.saffron} />
            <Typography
              variant="bodySmall"
              color={themeColors.foreground}
              style={styles.infoText}
            >
              Vedic
            </Typography>
          </View>
        </View>

        {/* Description */}
        <Typography
          variant="h3"
          color={themeColors.foreground}
          style={styles.sectionTitle}
        >
          About this Puja
        </Typography>
        <Typography
          variant="body"
          color={themeColors.mutedForeground}
          style={{ lineHeight: 24, marginBottom: 24 }}
        >
          {description}
        </Typography>

        {/* Benefits */}
        <Typography
          variant="h3"
          color={themeColors.foreground}
          style={styles.sectionTitle}
        >
          Key Benefits
        </Typography>
        <Card variant="solid" style={styles.benefitsCard}>
          {benefitsList.map((benefit: string, idx: number) => (
            <View key={idx} style={styles.benefitItem}>
              <View
                style={[
                  styles.bullet,
                  { backgroundColor: themeColors.saffron },
                ]}
              />
              <Typography
                variant="body"
                color={themeColors.foreground}
                style={{ flex: 1 }}
              >
                {benefit}
              </Typography>
            </View>
          ))}
        </Card>

        {/* Why Perform Section */}
        {whyPerformCards.length > 0 && (
          <View style={{ marginTop: 32 }}>
            <Typography
              variant="h3"
              color={themeColors.foreground}
              style={styles.sectionTitle}
            >
              {whyPerformTitle}
            </Typography>
            <View style={styles.whyPerformContainer}>
              {whyPerformCards.map((card: any, idx: number) => (
                <Card
                  key={`why-${idx}`}
                  variant="solid"
                  style={styles.whyPerformCard}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: themeColors.saffron + "20" },
                    ]}
                  >
                    <Typography variant="h3">{card.icon || "✨"}</Typography>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Typography
                      variant="body"
                      style={{ fontWeight: "bold", marginBottom: 4 }}
                      color={themeColors.foreground}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="bodySmall"
                      color={themeColors.mutedForeground}
                    >
                      {card.description}
                    </Typography>
                  </View>
                </Card>
              ))}
            </View>
          </View>
        )}

        {/* Ritual Process Section */}
        {processSteps.length > 0 && (
          <View style={{ marginTop: 32 }}>
            <Typography
              variant="h3"
              color={themeColors.foreground}
              style={styles.sectionTitle}
            >
              {processTitle}
            </Typography>
            <Card variant="solid" style={styles.processCard}>
              {processSteps.map((step: any, idx: number) => (
                <View key={`step-${idx}`} style={styles.processStepContainer}>
                  <View style={styles.stepIndicator}>
                    <View
                      style={[
                        styles.stepCircle,
                        { backgroundColor: themeColors.saffron },
                      ]}
                    >
                      <Typography
                        variant="label"
                        color="#fff"
                        style={{ fontWeight: "bold" }}
                      >
                        {step.step || (idx + 1).toString().padStart(2, "0")}
                      </Typography>
                    </View>
                    {/* Don't show connecting line on the last step */}
                    {idx < processSteps.length - 1 && (
                      <View
                        style={[
                          styles.stepLine,
                          { backgroundColor: themeColors.borderMuted },
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.stepContent}>
                    <Typography
                      variant="body"
                      style={{ fontWeight: "bold", marginBottom: 4 }}
                      color={themeColors.foreground}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="bodySmall"
                      color={themeColors.mutedForeground}
                    >
                      {step.description}
                    </Typography>
                  </View>
                </View>
              ))}
            </Card>
          </View>
        )}

        <View style={{ marginTop: 32 }}>
          <Footer />
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: themeColors.card,
            borderTopColor: themeColors.borderMuted,
          },
        ]}
      >
        <View>
          <Typography variant="label" color={themeColors.mutedForeground}>
            Total Price
          </Typography>
          <Typography variant="h2" color={themeColors.saffron}>
            {price}
          </Typography>
        </View>
        <Button
          title="Book Now"
          onPress={() => {
            if (!user) {
              router.push("/login");
            } else {
              router.push(`/pujas/book/${id}`);
            }
          }}
          style={{ paddingHorizontal: 40 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePlaceholder: {
    height: 300,
    backgroundColor: "#0f172a", // Cosmic Navy fallback
    justifyContent: "flex-end",
    padding: 24,
    position: "relative",
  },
  headerOverlay: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayTitle: {
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    zIndex: 10,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100, // accommodate bottom bar
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  infoBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 32,
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
  },
  infoText: {
    marginTop: 4,
    fontWeight: "600",
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: "#e2e8f0",
  },
  sectionTitle: {
    marginBottom: 16,
  },
  benefitsCard: {
    padding: 20,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
    marginRight: 12,
  },
  whyPerformContainer: {
    gap: 12,
  },
  whyPerformCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  processCard: {
    padding: 24,
    paddingTop: 32,
  },
  processStepContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  stepIndicator: {
    alignItems: "center",
    marginRight: 16,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  stepLine: {
    width: 2,
    flex: 1,
    marginTop: -4, // overlap slightly under circle
    marginBottom: -4,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 24, // spacing below content
    marginTop: 4, // align with circle text visually
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 34, // Safe area approximation for iOS
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  offerBadge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
});
