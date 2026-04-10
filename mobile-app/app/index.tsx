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
    try {
      // Check if user has seen intro
      const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");
      
      if (!hasSeenIntro) {
        // 1. FIRST TIME USER - Show animation then go to Intro
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.replace("/intro");
        return;
      }

      // 2. REPEAT USER - Skip animation, go straight to Dashboard
      // Check if user is logged in for specific data, but always land on Home
      router.replace("/(tabs)");
    } catch (e) {
      console.error("Failed to read status", e);
      router.replace("/(tabs)");
    }
  }, [user, profile, router]);

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
