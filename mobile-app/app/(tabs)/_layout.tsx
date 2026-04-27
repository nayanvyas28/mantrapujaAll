import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Home, Star, User, Layout, Rss, Play, Headphones } from 'lucide-react-native';
import { useSidebar } from '../../context/SidebarContext';
import Sidebar from '../../components/Sidebar';

export default function TabLayout() {
  const { isOpen, toggle } = useSidebar();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarActiveTintColor: '#FF4D00',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 20,
            height: 75,
            paddingBottom: 15,
            paddingTop: 10,
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -10 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
          },
          tabBarLabelStyle: {
            fontSize: 8,
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: 0.2,
            marginTop: 2,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="feed"
          options={{
            title: 'Feed',
            tabBarIcon: ({ color }) => <Rss size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="puja"
          options={{
            title: 'Puja',
            tabBarIcon: ({ color }) => <Star size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <View className={`w-14 h-14 rounded-full items-center justify-center -mt-9 ${focused ? 'bg-primary shadow-xl shadow-primary/40' : 'bg-white border border-gray-100 shadow-sm'}`}>
                <Home size={26} color={focused ? 'white' : '#FF4D00'} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="astro"
          options={{
            title: 'Astro',
            tabBarIcon: ({ color }) => <Layout size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="music"
          options={{
            title: 'Music',
            tabBarIcon: ({ color }) => <Play size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: null,
          }}
        />
      </Tabs>
      <Sidebar isOpen={isOpen} onClose={() => toggle(false)} />
    </View>
  );
}
