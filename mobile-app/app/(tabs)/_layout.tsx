import { Tabs } from 'expo-router';
import { Compass, Flame, Home, Music, UserRound } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { SidebarProvider, useSidebar } from '../../context/SidebarContext';
import { Sidebar } from '../../components/Sidebar';
import { View } from 'react-native';

function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  return (
    <View style={{ flex: 1 }}>
      {children}
      <Sidebar isVisible={isSidebarOpen} onClose={closeSidebar} />
    </View>
  );
}

export default function TabLayout() {
  const { theme, colors: themeColors } = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <SidebarProvider>
      <SidebarWrapper>
        <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: 'transparent' },
        tabBarActiveTintColor: themeColors.saffron,
        tabBarInactiveTintColor: themeColors.muted,
        tabBarStyle: {
          backgroundColor: themeColors.card,
          borderTopColor: themeColors.border,
          height: Platform.OS === 'android' ? 70 + insets.bottom : 60 + insets.bottom,
          paddingBottom: Platform.OS === 'android' ? 10 + insets.bottom : insets.bottom,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'sans-serif',
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home', 'Home'),
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pujas"
        options={{
          title: t('tabs.pujas', 'Pooja'),
          tabBarIcon: ({ color }) => <Flame size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          title: t('tabs.music', 'Music'),
          tabBarIcon: ({ color }) => <Music size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t('tabs.tirth', 'Tirth'),
          tabBarIcon: ({ color }) => <Compass size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
          title: t('tabs.profile', 'Profile'),
          tabBarIcon: ({ color }) => <UserRound size={24} color={color} />,
        }}
      />
    </Tabs>
      </SidebarWrapper>
    </SidebarProvider>
  );
}
