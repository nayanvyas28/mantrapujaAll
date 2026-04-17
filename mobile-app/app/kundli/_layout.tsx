import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useSidebar } from '../../context/SidebarContext';
import Sidebar from '../../components/Sidebar';

export default function KundliLayout() {
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="new" options={{ title: 'New Kundli' }} />
        <Stack.Screen name="report" options={{ title: 'Kundli Report' }} />
      </Stack>
      <Sidebar isOpen={isOpen} onClose={() => toggle(false)} />
    </>
  );
}
