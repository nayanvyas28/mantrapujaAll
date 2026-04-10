import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import 'react-native-reanimated';

// Type-safe alias for React 19/Expo 54 compatibility
const RNView = View as any;
import { GuruFloatingButton } from '../components/GuruFloatingButton';
import { AnimatedStarfield } from '../components/ui/AnimatedStarfield';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { usePushNotifications } from '../hooks/usePushNotifications';
import '../utils/i18n'; // Initialize i18next

function RootLayoutContent() {
  const { theme, colors } = useTheme();
  usePushNotifications();

  return (
    <RNView style={{ flex: 1, backgroundColor: colors?.background || '#000' }}>
      {theme === 'dark' && (
        <RNView style={StyleSheet.absoluteFill}>
          <AnimatedStarfield />
        </RNView>
      )}
      
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="guru-ai" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="intro" />
        <Stack.Screen name="login" />
        <Stack.Screen name="zodiac" />
        <Stack.Screen name="permissions" />
        <Stack.Screen name="(tabs)" />
      </Stack>

      <GuruFloatingButton />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </RNView>
  );
}

import { GuruAssistantProvider } from '../context/GuruAssistantContext';
import { WalletProvider } from '../context/WalletContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WalletProvider>
          <GuruAssistantProvider>
            <RootLayoutContent />
          </GuruAssistantProvider>
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
