import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image as RNImage } from "expo-image";
const Image = RNImage as any;
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowRight,
  Bell,
  Calendar,
  Droplets,
  Gift,
  Globe,
  Header,
  Heart,
  Languages,
  Sun,
  Users,
  Wallet,
  Check,
  X
} from "lucide-react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator as RNActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  ScrollView as RNScrollView,
  StyleSheet,
  TouchableOpacity as RNTouchableOpacity,
  View as RNView,
  Modal as RNModal,
  Text as RNText
} from "react-native";
import { getLocalized } from "../../utils/translation";

// Type-safe aliases for React 19/Expo 54 compatibility
const View = RNView as any;
const ScrollView = RNScrollView as any;
const TouchableOpacity = RNTouchableOpacity as any;
const ActivityIndicator = RNActivityIndicator as any;
const Text = RNText as any;
import { AnimatedWaveButton } from "../../components/ui/AnimatedWaveButton";
import { Card } from "../../components/ui/Card";
import { FallbackImage } from "../../components/ui/FallbackImage";
import { Footer } from "../../components/ui/Footer";
import { Typography } from "../../components/ui/Typography";
import { useTheme } from "../../context/ThemeContext";
import { getImageSource } from "../../utils/imageResolver";
import { sanitizeData, sanitizeText } from "../../utils/sanitizer";
import { supabase } from "../../utils/supabase";

import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useGuruAssistant } from "../../context/GuruAssistantContext";
import { useWallet } from "../../context/WalletContext";
import { AstroSection } from "../../components/AstroSection";
// import { PRODUCTS_LIST } from "../../utils/mockData"; // Removed in favor of Supabase

export default function HomeScreen() {
  const router = useRouter();
  const { theme, colors, toggleTheme } = useTheme();
  const { user, profile } = useAuth(); // dynamically get auth state
  const { t, i18n } = useTranslation();
  const { handleScroll } = useGuruAssistant();
  const { balance } = useWallet();

  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  const handleLanguageChange = () => {
    setIsLanguageModalVisible(true);
  };

  const changeLanguage = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      await AsyncStorage.setItem("appLanguage", lang);
      setIsLanguageModalVisible(false);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  // Dynamic state
  const isGuest = !user;
  const userName = profile?.full_name || user?.email?.split('@')[0] || t("home.guest", "Guest");
  const spiritualSubheading = t("home.subtitle", "Awaken Your Spirit");
  const userRashi = profile?.onboarding_data?.rashi?.name || null;

  const { width } = Dimensions.get("window");
  const bannerWidth = width - 48; // screen width minus horizontal padding
  const [activeBanner, setActiveBanner] = useState(0);
  const bannerScrollRef = useRef<ScrollView>(null);

  const [blogs, setBlogs] = useState<any[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [blogsErrorMsg, setBlogsErrorMsg] = useState<string | null>(null);

  const [popularPujas, setPopularPujas] = useState<any[]>([]);
  const [pujasLoading, setPujasLoading] = useState(true);
  const [pujasErrorMsg, setPujasErrorMsg] = useState<string | null>(null);

  const [festivals, setFestivals] = useState<any[]>([]);
  const [festivalsLoading, setFestivalsLoading] = useState(true);

  const [destinations, setDestinations] = useState<any[]>([]);
  const [destinationsLoading, setDestinationsLoading] = useState(true);

  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [offerPujas, setOfferPujas] = useState<any[]>([]);
  const [offerPujasLoading, setOfferPujasLoading] = useState(true);

  const [dynamicBanners, setDynamicBanners] = useState<any[]>([]);
  const [bannersLoading, setBannersLoading] = useState(true);

  // Daily Astro Reading
  const [dailyAstro, setDailyAstro] = useState<string | null>(null);

  const BANNERS = useMemo(() => [
    {
      id: "1",
      title: t("home.banner1.title", "Special Mahashivratri Puja"),
      subtitle: t("home.banner1.subtitle", "Book sacred rituals at Kashi Vishwanath."),
      image: require("../../assets/images/banner_shivratri.jpg"),
      route: "/pujas/1",
    },
    {
      id: "2",
      title: t("home.banner2.title", "Sacred Spiritual Walk"),
      subtitle: t("home.banner2.subtitle", "Experience local traditions."),
      image: require("../../assets/images/vedic_blog.jpg"),
      route: "/explore",
    },
    {
      id: "3",
      title: t("home.banner3.title", "Sacred Ganga Aarti"),
      subtitle: t("home.banner3.subtitle", "Live streaming from Dashashwamedh Ghat."),
      image: require("../../assets/images/ujjain_location.jpg"),
      route: "/explore/1",
    },
  ], [t]);

  useEffect(() => {
    // fetchRecentBlogs(); // Hidden for Play Store Compliance
    fetchPopularPujas();
    fetchOfferPujas();
    fetchUpcomingFestivals();
    fetchDestinations();
    fetchProducts();
    fetchDynamicBanners();
    if (!isGuest && userRashi) {
      fetchDailyAstro(userRashi);
    } else if (!isGuest && !userRashi) {
      // maybe fetch generic astro or nothing
    }

    // --- REALTIME SUBSCRIPTIONS ---
    // Use a unique channel name per session to avoid collision warnings
    const channelId = `home-content-${Date.now()}`;
    const contentSubscription = supabase
      .channel(channelId)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'poojas' },
        () => {
          fetchPopularPujas();
          fetchOfferPujas();
        }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'blogs' },
        () => fetchRecentBlogs()
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'destinations' },
        () => fetchDestinations()
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'products_99' },
        () => fetchProducts()
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'home_banners' },
        () => fetchDynamicBanners()
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(contentSubscription);
    };
  }, [userRashi, isGuest]);

  // Utils
  const handleProtectedNavigation = (route: string) => {
    if (isGuest) {
      Alert.alert(
        t("common.login_required", "Login Required"),
        t("common.login_msg", "Please log in to access this feature."),
        [
          { text: t("common.cancel", "Cancel"), style: "cancel" },
          { text: t("common.login", "Log In"), onPress: () => router.push("/login") }
        ]
      );
    } else {
      router.push(route as any);
    }
  };

  const fetchDailyAstro = async (rashiName: string) => {
    try {
      const now = new Date();
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const cacheKey = `daily_astro_${rashiName}_${today}`;

      // Try local cache first
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        console.log(`[HomeScreen] Serving daily astro for ${rashiName} from cache.`);
        setDailyAstro(cached);
        return;
      }

      console.log(`[HomeScreen] Fetching fresh daily astro for ${rashiName}...`);
      const { data, error } = await supabase
        .from('daily_astro_notif')
        .select('content')
        .eq('rashi_name', rashiName)
        .eq('target_date', today)
        .maybeSingle();

      if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
        throw error;
      }

      let contentStr = "Your spiritual energy is high today. Check back later for a specific reading.";
      if (data && data.content) {
        contentStr = sanitizeText(typeof data.content === 'object' ? data.content.reading : data.content) || contentStr;
      }

      setDailyAstro(contentStr);
      // Cache for the day
      await AsyncStorage.setItem(cacheKey, contentStr);
    } catch (err) {
      console.error("Error fetching daily astro:", err);
    }
  };

  const fetchDestinations = async () => {
    try {
      setDestinationsLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name, tagline, description, images')
        .eq('show_on_home', true)
        .order('home_order', { ascending: true })
        .limit(4);

      if (error || !data || data.length === 0) {
        // Fallback to is_active if admin columns don't exist yet or are unused
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('destinations')
          .select('id, name, tagline, description, images')
          .limit(4);

        if (fallbackError) throw fallbackError;
        if (fallbackData) setDestinations(sanitizeData(fallbackData));
      } else {
        setDestinations(sanitizeData(data));
      }
    } catch (err) {
      console.error('Error fetching destinations:', err);
    } finally {
      setDestinationsLoading(false);
    }
  };

  const fetchUpcomingFestivals = async () => {
    try {
      setFestivalsLoading(true);
      const now = new Date();
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

      // Try to read from calendar's complete cache first
      const cached = await AsyncStorage.getItem("cached_all_festivals");
      if (cached) {
        const allFestivals = JSON.parse(cached);
        // Dynamic filter: only show festivals that are >= today
        const upcoming = allFestivals
          .filter((f: any) => f.date >= today)
          .slice(0, 5);
        
        if (upcoming.length > 0) {
          setFestivals(sanitizeData(upcoming));
          setFestivalsLoading(false);
        }
      }

      // Fetch fresh data
      const { data, error } = await supabase
        .from("festivals")
        .select("*")
        .eq("is_active", true)
        .gte("date", today) // Real-time server side filter
        .order("date", { ascending: true })
        .limit(5);

      if (error) throw error;
      if (data) {
        setFestivals(sanitizeData(data));
      }
    } catch (err) {
      console.error("Error fetching upcoming festivals:", err);
    } finally {
      setFestivalsLoading(false);
    }
  };

  const fetchPopularPujas = async () => {
    try {
      setPujasLoading(true);

      const sortPujas = (pujas: any[]) => {
        return [...pujas]
          .sort((a, b) => {
            const getWeight = (name: string) => {
              const lower = name.toLowerCase();
              if (lower.includes("shani")) return 1;
              if (lower.includes("pitru")) return 2;
              if (lower.includes("kaal sarp") || lower.includes("kaal"))
                return 3;
              return 4;
            };
            return getWeight(a.name) - getWeight(b.name);
          })
          .slice(0, 3);
      };

      // Try offline cache first
      const cached = await AsyncStorage.getItem("cached_all_pujas");
      if (cached) {
        const allPujas = JSON.parse(cached);
        const popular = allPujas.filter((p: any) => p.is_featured);
        if (popular.length > 0) {
          setPopularPujas(sanitizeData(sortPujas(popular)));
          setPujasLoading(false);
        }
      }

      // Fetch fresh data based on Admin Home Page Ordering
      const { data, error } = await supabase
        .from("poojas")
        .select("id, name, tagline, about_description, images, is_featured")
        .eq("is_active", true)
        .eq("show_on_home", true)
        .order("home_order", { ascending: true })
        .limit(3);
  
      if (error || !data || data.length === 0) {
        // Fallback to is_featured or latest if admin columns don't exist yet or empty
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("poojas")
          .select("id, name, tagline, about_description, images, is_featured")
          .order("created_at", { ascending: false })
          .limit(10);
  
        if (fallbackError) throw fallbackError;
        if (fallbackData) setPopularPujas(sanitizeData(sortPujas(fallbackData)));
      } else {
        setPopularPujas(sanitizeData(data));
      }
    } catch (err: any) {
      console.error("Error fetching popular pujas for home:", err);
      setPujasErrorMsg(t("common.error_loading", "Could not load pujas."));
    } finally {
      setPujasLoading(false);
    }
  };

  const fetchOfferPujas = async () => {
    try {
      setOfferPujasLoading(true);
      const { data, error } = await supabase
        .from("poojas")
        .select("id, name, tagline, about_description, images")
        .eq("is_active", true)
        .eq("is_offer_999", true)
        .order("offer_order", { ascending: true })
        .limit(5);

      // Handle cases where columns might not exist yet gracefully
      if (error) {
        if (error.code === '42703') { // undefined_column
          console.warn("is_offer_999 columns not found yet. Please run DB guide.");
          setOfferPujas([]);
        } else {
          throw error;
        }
      } else {
        setOfferPujas(sanitizeData(data || []));
      }
    } catch (err) {
      console.error("Error fetching offer pujas:", err);
    } finally {
      setOfferPujasLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const { data, error } = await supabase
        .from('products_99')
        .select('*')
        .eq('is_active', true)
        .eq('show_on_home', true)
        .order('home_order', { ascending: true })
        .limit(5);

      if (error || !data || data.length === 0) {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('products_99')
          .select('*')
          .limit(5);

        if (fallbackError) throw fallbackError;
        if (fallbackData) setProducts(sanitizeData(fallbackData));
      } else {
        setProducts(sanitizeData(data));
      }
    } catch (err) {
      console.error('Error fetching products for home:', err);
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchDynamicBanners = async () => {
    try {
      setBannersLoading(true);
      const { data, error } = await supabase
        .from('home_banners')
        .select('*')
        .eq('is_active', true)
        .or('target.eq.app,target.eq.both')
        .order('display_order', { ascending: true });

      if (error) {
        if (error.code === '42P01') {
          console.log('[HomeScreen] Banners table not created yet, using defaults.');
        } else {
          console.error('Error fetching dynamic banners:', error);
        }
        return;
      }

      if (data && data.length > 0) {
        setDynamicBanners(sanitizeData(data));
      }
    } catch (err) {
      console.error('Error in fetchDynamicBanners:', err);
    } finally {
      setBannersLoading(false);
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      setBlogsLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("show_on_home", true)
        .order("home_order", { ascending: true })
        .limit(3);

      if (error || !data || data.length === 0) {
        // Fallback to newest blogs if show_on_home columns don't exist yet or no true values
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (fallbackError) {
          throw new Error('Fallback also failed: ' + fallbackError.message);
        }

        if (!fallbackData || fallbackData.length === 0) {
          setBlogsErrorMsg("No blogs found in DB (even in fallback)");
        }
        setBlogs(fallbackData || []);
      } else {
        setBlogs(data || []);
      }
    } catch (err: any) {
      console.error("Error fetching recent blogs:", err);
      setBlogsErrorMsg(err.message || 'Unknown error');
    } finally {
      setBlogsLoading(false);
    }
  };

  // Auto-scroll logic (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeBanner + 1) % BANNERS.length;
      bannerScrollRef.current?.scrollTo({
        x: nextIndex * (bannerWidth + 16),
        animated: true,
      });
      setActiveBanner(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeBanner, bannerWidth, BANNERS.length, dynamicBanners.length]);

  const activeBannersSource = dynamicBanners.length > 0 ? dynamicBanners : BANNERS;

  const QUICK_ACTIONS = [
    {
      id: "1",
      title: "Jal Abhishek",
      icon: <Droplets size={24} color={colors.saffron} />,
      color: theme === "dark" ? "#334155" : "#ffffff",
      route: "/pujas/jal-abhishek",
    },
    {
      id: "3",
      title: "Prasad",
      icon: <Gift size={24} color={colors.saffron} />,
      color: theme === "dark" ? "#334155" : "#ffffff",
      route: "/prasad",
    },
    {
      id: "4",
      title: "Gau Seva",
      icon: <Heart size={24} color={colors.saffron} />,
      color: theme === "dark" ? "#334155" : "#ffffff",
      route: "/seva", // Placeholder route
    },
  ];

  const renderBlogImage = (imageUrl: string) => {
    if (!imageUrl || imageUrl === "/logo.png") {
      return require("../../assets/images/vedic_blog.jpg");
    }
    return imageUrl;
  };

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
            {userName}
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
            onPress={handleLanguageChange}
          >
            <Globe size={20} color={colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleProtectedNavigation("/notifications")}
          >
            <Bell size={22} color={colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/calendar" as any)}
          >
            <Calendar size={22} color={colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleProtectedNavigation("/wallet")}
          >
            <Wallet size={22} color={colors.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e: any) => handleScroll(e.nativeEvent.contentOffset.y)}
      >
        {/* Scrollable Banner */}
        <View style={styles.bannerWrapper}>
          <ScrollView
            ref={bannerScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e: any) => {
              const x = e.nativeEvent.contentOffset.x;
              setActiveBanner(Math.round(x / bannerWidth));
            }}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={bannerWidth + 16} // width + margin
            style={styles.bannerScroll}
          >
            {activeBannersSource.map((banner, index) => (
              <TouchableOpacity
                key={banner.id}
                style={[styles.bannerContainer, { width: bannerWidth }]}
                activeOpacity={0.9}
                onPress={() => {
                  if (banner.route) {
                    if (banner.route.startsWith('puja:')) {
                      const slug = banner.route.split(':')[1];
                      router.push(`/pujas/${slug}` as any);
                    } else {
                      router.push(banner.route as any);
                    }
                  }
                }}
              >
                <Image
                  source={banner.image_url ? { uri: banner.image_url } : banner.image}
                  style={styles.bannerBg}
                  contentFit="cover"
                />

                {/* NEW: Special Offer Badge on the RIGHT */}
                {banner.show_offer && (
                  <View style={styles.offerBadgeContainer}>
                    <View style={styles.offerBadgeGradient}>
                      <Gift size={12} color="white" />
                      <Text style={styles.offerBadgeText} numberOfLines={1}>
                        {i18n.language === 'hi' ? banner.offer_tag_hi : banner.offer_tag}
                      </Text>
                    </View>
                  </View>
                )}
                <View style={styles.bannerOverlay}>
                  <View style={styles.bannerContent}>
                    <Typography variant="h3" color="#ffffff">
                      {getLocalized(banner, 'title', i18n.language) || banner.title}
                    </Typography>
                    <Typography
                      variant="bodySmall"
                      color="#fed7aa"
                      style={{ marginTop: 4 }}
                    >
                      {getLocalized(banner, 'subtitle', i18n.language) || banner.subtitle}
                    </Typography>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {activeBannersSource.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor:
                      activeBanner === index ? colors.saffron : colors.border,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Astro Section: Kundli & Know Yourself */}
        <AstroSection />

        {/* Daily Rashi Phal Section */}
        {!isGuest && userRashi && dailyAstro && (
            <TouchableOpacity 
                style={{ marginHorizontal: 24, marginBottom: 24 }} 
                activeOpacity={0.9} 
                onPress={() => router.push('/horoscope' as any)}
            >
                <Card 
                    variant="solid" 
                    style={{ 
                        padding: 20, 
                        borderRadius: 20, 
                        borderWidth: 1, 
                        borderColor: colors.saffron + '30', 
                        backgroundColor: theme === 'dark' ? colors.card : '#fffaf0' 
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: colors.saffron + '15', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                                <Sun size={24} color={colors.saffron} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Typography variant="h3" color={colors.foreground} style={{ fontSize: 18 }}>Daily Rashifal</Typography>
                                <Typography variant="label" color={colors.saffron} style={{ marginTop: 2, fontWeight: '600' }}>
                                    {userRashi.charAt(0).toUpperCase() + userRashi.slice(1)} • {new Date().getDate().toString().padStart(2, '0')} {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][new Date().getMonth()]} {new Date().getFullYear()}
                                </Typography>
                            </View>
                        </View>
                        <ArrowRight size={20} color={colors.mutedForeground} style={{ marginTop: 12 }} />
                    </View>
                    
                    <Typography variant="body" color={theme === 'dark' ? colors.mutedForeground : '#334155'} style={{ lineHeight: 24 }} numberOfLines={3}>
                        {dailyAstro.replace('[Mock Data] ', '')}
                    </Typography>
                </Card>
            </TouchableOpacity>
        )}

        {/* Quick Action Cards (3 cards) */}
        <View style={styles.quickActionsContainer}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionItem}
              activeOpacity={0.7}
              onPress={() => router.push(action.route as any)}
            >
              <View
                style={[styles.actionIconBg, { backgroundColor: action.color }]}
              >
                {action.icon}
              </View>
              <Typography
                variant="bodySmall"
                style={styles.actionTitle}
                color={colors.foreground}
                numberOfLines={1}
              >
                {action.title}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>

        {/* ₹99 Products */}
        <View style={styles.sectionHeader}>
          <Typography variant="h3" color={colors.foreground}>
            {t("home.99_products", "Sacred Items @ ₹99")}
          </Typography>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push("/products" as any)}
          >
            <Typography variant="label" color={colors.saffron}>
              {t("common.see_all", "See All")}
            </Typography>
            <ArrowRight size={14} color={colors.saffron} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 24 }}
          style={styles.productsHorizontalScroll}
        >
          {productsLoading ? (
            <View style={{ width: 100, height: 200, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color={colors.saffron} />
            </View>
          ) : products.length === 0 ? (
            <View style={{ padding: 20 }}>
              <Typography variant="bodySmall" color={colors.mutedForeground}>No products available.</Typography>
            </View>
          ) : products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCardWrapper}
              activeOpacity={0.9}
              onPress={() => router.push(`/products/${product.id}` as any)}
            >
              <Card variant="solid" style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <FallbackImage
                    source={getImageSource(product.image_url)}
                    style={styles.productImage}
                    contentFit="cover"
                  />
                  <View style={styles.productPriceTag}>
                    <Typography variant="label" style={{ fontWeight: 'bold' }} color="#ffffff">
                      ₹{product.price}
                    </Typography>
                  </View>
                </View>
                <View style={styles.productInfo}>
                  <Typography variant="label" color={colors.saffron} style={{ marginBottom: 4 }}>
                    {product.category}
                  </Typography>
                  <Typography variant="body" style={{ fontWeight: 'bold' }} color={colors.foreground} numberOfLines={2}>
                    {product.name}
                  </Typography>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ₹999 Special Offer Pujas */}
        {offerPujas.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Typography variant="h3" color={colors.foreground}>
                {t("home.999_offer", "Special Offer @ ₹999")}
              </Typography>
              <TouchableOpacity
                style={styles.seeAllButton}
                onPress={() => router.push("/pujas/offer999" as any)}
              >
                <Typography variant="label" color={colors.saffron}>
                  {t("common.see_all", "See All")}
                </Typography>
                <ArrowRight size={14} color={colors.saffron} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 24 }}
              style={styles.productsHorizontalScroll}
            >
              {offerPujasLoading ? (
                <View style={{ width: 100, height: 200, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator color={colors.saffron} />
                </View>
              ) : offerPujas.map((puja) => (
                <TouchableOpacity
                  key={puja.id}
                  style={styles.productCardWrapper}
                  activeOpacity={0.9}
                  onPress={() => router.push(`/pujas/${puja.id}` as any)}
                >
                  <Card variant="solid" style={styles.productCard}>
                    <View style={styles.productImageContainer}>
                      <FallbackImage
                        source={getImageSource(puja.images)}
                        style={styles.productImage}
                        contentFit="cover"
                      />
                    </View>
                    <View style={styles.productInfo}>
                      <Typography variant="body" style={{ fontWeight: 'bold' }} color={colors.foreground} numberOfLines={2}>
                        {puja.name}
                      </Typography>
                      <Typography variant="bodySmall" color={colors.saffron} style={{ fontWeight: 'bold', fontSize: 10, marginTop: 4 }}>
                        SPECIAL OFFER
                      </Typography>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {/* Popular Pujas */}
        <View style={styles.sectionHeader}>
          <Typography variant="h3" color={colors.foreground}>
            {t("home.popular_pujas", "Popular Pujas")}
          </Typography>
        </View>
        <View style={styles.pujasGrid}>
          {pujasLoading && popularPujas.length === 0 ? (
            <ActivityIndicator
              color={colors.saffron}
              style={{ marginVertical: 20, alignSelf: "center", width: "100%" }}
            />
          ) : pujasErrorMsg ? (
            <View style={{ width: "100%", alignItems: "center", padding: 20 }}>
              <Typography variant="bodySmall" color={colors.mutedForeground}>{pujasErrorMsg}</Typography>
              <TouchableOpacity onPress={fetchPopularPujas} style={{ marginTop: 8 }}>
                <Typography variant="label" color={colors.saffron}>RETRY</Typography>
              </TouchableOpacity>
            </View>
          ) : (
            popularPujas.map((puja, index) => {
              // Create an alternating layout logic where the first 2 are half width, the 3rd is full width, etc.
              const isFullWidth = (index + 1) % 3 === 0;
              return (
                <TouchableOpacity
                  key={puja.id}
                  activeOpacity={0.8}
                  style={{
                    width: isFullWidth ? "100%" : "48%",
                    marginTop: index > 1 ? 16 : 0,
                  }}
                  onPress={() => router.push(`/pujas/${puja.id}`)}
                >
                  <Card
                    variant="solid"
                    style={[
                      styles.gridCard,
                      { width: "100%", minHeight: isFullWidth ? "auto" : 210 },
                    ]}
                  >
                    <FallbackImage
                      source={getImageSource(puja.images)}
                      style={styles.cardImageMock}
                      contentFit="cover"
                    />
                    <Typography
                      variant="body"
                      style={{
                        fontWeight: "bold",
                        marginTop: 12,
                        minHeight: isFullWidth ? "auto" : 44,
                      }}
                      numberOfLines={isFullWidth ? undefined : 2}
                      color={colors.foreground}
                    >
                      {getLocalized(puja, 'name')}
                    </Typography>
                    <Typography
                      variant="bodySmall"
                      color={colors.mutedForeground}
                      numberOfLines={1}
                      style={{ marginTop: 4 }}
                    >
                      {getLocalized(puja, 'tagline') || getLocalized(puja, 'about_description')}
                    </Typography>
                  </Card>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        <View style={{ marginBottom: 24 }}>
          <AnimatedWaveButton
            title={t("home.explore_all_pujas", "EXPLORE ALL POOJA SERVICES")}
            onPress={() => router.push("/(tabs)/pujas")}
          />
        </View>

        {/* Upcoming Festivals */}
        <View style={styles.sectionHeader}>
          <Typography variant="h3" color={colors.foreground}>
            {t("home.upcoming_festivals", "Upcoming Festivals")}
          </Typography>
          <TouchableOpacity onPress={() => router.push("/calendar")}>
            <Typography
              variant="bodySmall"
              color={colors.saffron}
              style={{ fontWeight: "600" }}
            >
              {t("common.see_all", "See All")}
            </Typography>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {festivalsLoading && festivals.length === 0 ? (
            <ActivityIndicator
              color={colors.saffron}
              style={{ marginHorizontal: 24, marginVertical: 20 }}
            />
          ) : (
            festivals.map((fest) => {
              const monthStr = fest.month
                ? fest.month.substring(0, 3).toUpperCase()
                : "---";
              const dayStr = fest.date ? fest.date.split("-")[2] : "--";

              return (
                <TouchableOpacity
                  key={fest.id}
                  activeOpacity={0.9}
                  onPress={() => router.push(`/calendar/${fest.id}`)}
                >
                  <Card variant="solid" style={styles.horizontalCard}>
                    <View
                      style={[
                        styles.festivalDateBox,
                        {
                          backgroundColor:
                            theme === "dark" ? "#334155" : "#ffffff",
                        },
                      ]}
                    >
                      <Typography
                        variant="label"
                        color={colors.saffron}
                        style={{ fontWeight: "bold" }}
                      >
                        {monthStr}
                      </Typography>
                      <Typography variant="h1" color={colors.foreground}>
                        {dayStr}
                      </Typography>
                    </View>
                    <View style={styles.festivalInfo}>
                      <Typography
                        variant="body"
                        style={{ fontWeight: "bold" }}
                        color={colors.foreground}
                      >
                        {fest.name}
                      </Typography>
                      <Typography
                        variant="bodySmall"
                        color={colors.mutedForeground}
                        numberOfLines={2}
                        style={{ marginTop: 4 }}
                      >
                        {fest.description}
                      </Typography>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>

        {/* Spiritual Locations */}
        <View style={styles.sectionHeader}>
          <Typography variant="h3" color={colors.foreground}>
            {t("home.spiritual_locations", "Spiritual Locations")}
          </Typography>
          <TouchableOpacity onPress={() => router.push("/explore")}>
            <Typography
              variant="bodySmall"
              color={colors.saffron}
              style={{ fontWeight: "600" }}
            >
              {t("common.see_all", "See All")}
            </Typography>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {destinationsLoading && destinations.length === 0 ? (
            <ActivityIndicator color={colors.saffron} style={{ marginHorizontal: 24, marginVertical: 20 }} />
          ) : (
            destinations.map((loc) => (
              <TouchableOpacity
                key={loc.id}
                activeOpacity={0.9}
                onPress={() => router.push(`/explore/${loc.id}`)}
              >
                <Card variant="solid" style={styles.locationCard}>
                  <FallbackImage
                    source={getImageSource(loc.images)}
                    style={styles.locationImage}
                    contentFit="cover"
                  />
                  <Typography
                    variant="body"
                    style={{ fontWeight: "bold", marginTop: 12 }}
                    color={colors.foreground}
                  >
                    {loc.name}
                  </Typography>
                  <Typography
                    variant="bodySmall"
                    color={colors.mutedForeground}
                    style={{ marginTop: 4 }}
                    numberOfLines={2}
                  >
                    {loc.tagline || loc.description}
                  </Typography>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Blog Section - Hidden for Play Store Compliance */}
        {/* 
        <View style={styles.sectionHeader}>
          <Typography variant="h3" color={colors.foreground}>
            {t("home.spiritual_insights", "Spiritual Insights")}
          </Typography>
        </View>
        <View style={styles.blogGrid}>
          {blogsLoading ? (
            <ActivityIndicator color={colors.saffron} style={{ padding: 20 }} />
          ) : blogsErrorMsg ? (
            <View style={{ padding: 20 }}>
              <Typography variant="body" color="red">{"Error: " + blogsErrorMsg}</Typography>
            </View>
          ) : blogs.length === 0 ? (
            <View style={{ padding: 20 }}>
              <Typography variant="body" color={colors.mutedForeground}>No spiritual insights selected or available yet.</Typography>
            </View>
          ) : (
            blogs.map((blog) => (
              <TouchableOpacity
                key={blog.id}
                activeOpacity={0.8}
                onPress={() => router.push(`/blogs/${blog.id}`)}
              >
                <Card variant="solid" style={styles.blogRowCard}>
                  <Image
                    source={renderBlogImage(blog.image_url)}
                    style={styles.blogImageMock}
                    contentFit="cover"
                  />
                  <View style={styles.blogContent}>
                    <Typography
                      variant="bodySmall"
                      color={colors.saffron}
                      style={{ fontWeight: "bold", marginBottom: 4 }}
                    >
                      {(blog.category || "VEDIC").toUpperCase()}
                    </Typography>
                    <Typography
                      variant="body"
                      style={{ fontWeight: "bold" }}
                      color={colors.foreground}
                      numberOfLines={2}
                    >
                      {blog.title}
                    </Typography>
                  </View>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </View>
        */}

        <View style={{ marginBottom: 24 }}>
          <AnimatedWaveButton
            title={t("home.read_all_insights", "READ ALL SPIRITUAL INSIGHTS")}
            onPress={() => router.push("/blogs" as any)}
          />
        </View>

        {/* Refer & Earn Promo - Premium Glow Card */}
        <TouchableOpacity 
          onPress={() => router.push("/wallet/refer" as any)}
          activeOpacity={0.9}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{ marginBottom: 40, marginHorizontal: 24 }}
        >
          <View style={[styles.referralGlowCard, { backgroundColor: colors.saffron }]}>
             <View style={styles.referralGlowContent}>
                <View style={styles.referralIconCircle}>
                  <Users size={24} color={colors.saffron} />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Typography variant="h3" color="#fff" style={{ fontWeight: '800' }}>REFER & EARN ₹51</Typography>
                  <Typography variant="bodySmall" color="rgba(255,255,255,0.9)">
                    Invite friends & get rewards instantly!
                  </Typography>
                </View>
                <View style={styles.referralGoBtn}>
                  <ArrowRight size={20} color={colors.saffron} />
                </View>
             </View>
          </View>
        </TouchableOpacity>

        {/* Footer */}
        <Footer />
        {/* Custom Language Selection Modal */}
        <RNModal
          visible={isLanguageModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsLanguageModalVisible(false)}
        >
          <RNTouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={() => setIsLanguageModalVisible(false)}
          >
            <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
              <View style={styles.modalHeader}>
                <Typography variant="h3">{t("settings.select_language", "Select Language")}</Typography>
                <RNTouchableOpacity onPress={() => setIsLanguageModalVisible(false)} style={styles.closeBtn}>
                  <X size={24} color={colors.foreground} />
                </RNTouchableOpacity>
              </View>

              <View style={styles.optionsList}>
                <RNTouchableOpacity 
                  style={[
                    styles.languageOption, 
                    i18n.language === 'en' && { borderColor: colors.saffron, backgroundColor: colors.saffron + '05' }
                  ]}
                  onPress={() => changeLanguage('en')}
                >
                  <View style={styles.optionLeft}>
                    <View style={[styles.langIcon, { backgroundColor: '#E0E7FF' }]}>
                      <Typography style={{ fontWeight: 'bold', color: '#4F46E5' }}>EN</Typography>
                    </View>
                    <Typography style={{ marginLeft: 16, fontWeight: i18n.language === 'en' ? '700' : '400' }}>English</Typography>
                  </View>
                  {i18n.language === 'en' && <Check size={20} color={colors.saffron} />}
                </RNTouchableOpacity>

                <RNTouchableOpacity 
                  style={[
                    styles.languageOption, 
                    i18n.language === 'hi' && { borderColor: colors.saffron, backgroundColor: colors.saffron + '05' }
                  ]}
                  onPress={() => changeLanguage('hi')}
                >
                  <View style={styles.optionLeft}>
                    <View style={[styles.langIcon, { backgroundColor: '#FEF3C7' }]}>
                      <Typography style={{ fontWeight: 'bold', color: '#D97706' }}>हि</Typography>
                    </View>
                    <Typography style={{ marginLeft: 16, fontWeight: i18n.language === 'hi' ? '700' : '400' }}>हिन्दी (Hindi)</Typography>
                  </View>
                  {i18n.language === 'hi' && <Check size={20} color={colors.saffron} />}
                </RNTouchableOpacity>
              </View>
            </View>
          </RNTouchableOpacity>
        </RNModal>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 100,
  },
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
    gap: 12, // Reduced gap for more icons
  },
  iconButton: {
    padding: 4,
    marginLeft: 8,
  },

  bannerWrapper: {
    marginBottom: 24,
  },
  bannerScroll: {
    overflow: "visible",
  },
  bannerContainer: {
    marginRight: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bannerBg: {
    width: "100%",
    height: 140,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)", // Dark overlay so white text always pops
    padding: 24,
    justifyContent: "center",
  },
  bannerContent: {
    maxWidth: "80%",
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  actionItem: {
    alignItems: "center",
    width: "30%",
  },
  actionIconBg: {
    width: 64,
    height: 64,
    borderRadius: 16, // Softer square
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#f59e0b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  actionTitle: {
    textAlign: "center",
    fontWeight: "600",
  },
  sectionHeader: {
    marginTop: 24, // Reduced from 40
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  pujasGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  productsHorizontalScroll: {
    marginLeft: -24,
    paddingLeft: 24,
    marginBottom: 32,
  },
  productCardWrapper: {
    width: 160,
    marginRight: 16,
  },
  productCard: {
    padding: 0,
    borderRadius: 16,
    overflow: "hidden",
    height: 220,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  productImageContainer: {
    width: "100%",
    height: 120,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productPriceTag: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  productInfo: {
    padding: 12,
    flex: 1,
  },
  gridCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  cardImageMock: {
    height: 100,
    borderRadius: 12,
    width: "100%",
  },
  horizontalScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  horizontalCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: 280,
    marginRight: 16,
    borderRadius: 12,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  festivalDateBox: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 12,
    minWidth: 70,
    marginRight: 16,
  },
  festivalInfo: {
    flex: 1,
  },
  locationCard: {
    width: 200,
    marginRight: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  locationImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  blogGrid: {
    gap: 16,
    marginBottom: 24,
  },
  blogRowCard: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  blogImageMock: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  blogContent: {
    flex: 1,
  },
  referralGlowCard: {
    padding: 2,
    borderRadius: 24,
    elevation: 8,
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  referralGlowContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 22,
    backgroundColor: "transparent", // Will be handled by the outer saffron container
  },
  referralIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  referralGoBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  closeBtn: {
    padding: 4,
  },
  optionsList: {
    gap: 16,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerBadgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 30,
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  offerBadgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ea580c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  offerBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
