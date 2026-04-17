import '../global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import { View, ActivityIndicator, Animated, Image } from 'react-native';
import Sidebar from '../components/Sidebar';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <SidebarProvider>
        <RootLayoutNav />
      </SidebarProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    // Only redirect logged-in users away from auth screens (home is public)
    if (user && inAuthGroup) {
      const timer = setTimeout(() => {
        router.replace('/(tabs)');
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [user?.id, loading, segments[0]]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <Image 
          source={require('../assets/images/logo.png')} 
          style={{ width: 120, height: 120, marginBottom: 20 }} 
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#FF4D00" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="kundli" options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="coming-soon" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
