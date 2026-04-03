import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LogoAnimationScreen() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Start animation immediately
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const checkState = useCallback(async () => {
    // Only wait a minimum of 1s total for visual pleasing effect (usually parallel with auth load)
    const minimumDelay = new Promise((resolve) => setTimeout(resolve, 1000));
    await minimumDelay;

    try {
      // If a user is active in Supabase Session (App minimized and reopened)
      if (user) {
        console.log(`[LogoAnimation] User Logged In: ${user.id}`);
        console.log(`[LogoAnimation] Profile Data:`, JSON.stringify(profile?.onboarding_data, null, 2));

        // Persistent Onboarding State Check
        const hasBirthData = profile?.onboarding_data?.dob || profile?.dob;
        const hasRashi = profile?.rashi || profile?.onboarding_data?.rashi;
        const hasFinishedOnboarding = await AsyncStorage.getItem("hasFinishedOnboarding");

        console.log(`[LogoAnimation] Flags - Birth: ${!!hasBirthData}, Rashi: ${!!hasRashi}, Finished: ${hasFinishedOnboarding}`);

        if (hasFinishedOnboarding === "true") {
          console.log("[LogoAnimation] Onboarding marked finished -> Home");
          router.replace("/(tabs)");
        } else if (hasRashi && hasBirthData) {
          console.log("[LogoAnimation] Complete profile found -> Home");
          router.replace("/(tabs)");
        } else if (hasBirthData) {
          console.log("[LogoAnimation] Partial data (Birth) -> Zodiac");
          router.replace("/zodiac");
        } else if (hasRashi) {
          console.log("[LogoAnimation] Partial data (Rashi) -> Home (Safe fallback)");
          router.replace("/(tabs)");
        } else {
          console.log("[LogoAnimation] No data found -> Onboarding");
          router.replace("/onboarding-details");
        }
        return; // Exit here, bypassing Intro and Login completely
      }

      // For New Users or Logged Out Users:
      const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");

      if (!hasSeenIntro) {
        router.replace("/intro");
      } else {
        router.replace("/login");
      }
    } catch (e) {
      console.error("Failed to read status", e);
      router.replace("/login");
    }
  }, [user, router]);

  useEffect(() => {
    // Wait until AuthContext finishes its initial supabase session check
    if (authLoading) return;

    checkState();
  }, [authLoading, checkState]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo_intro_bg.jpg")}
        style={styles.background}
        contentFit="cover"
      />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require("../assets/images/MP_logo.png")}
          style={styles.logo}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
