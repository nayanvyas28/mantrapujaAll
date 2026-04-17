import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { User, Settings, CreditCard, Bell, Shield, LogOut, ChevronRight, Wallet } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <View className="flex-1 bg-white px-8 items-center justify-center">
        <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-6">
          <User size={48} color="#FF4D00" />
        </View>
        <Text className="text-2xl font-bold text-gray-900 text-center">Your Spiritual Profile</Text>
        <Text className="text-gray-500 text-center mt-3 mb-10 leading-6">
          Sign in to track your puja bookings, set up personalized reminders, and manage your account.
        </Text>
        
        <TouchableOpacity 
          onPress={() => router.push('/(auth)/login')}
          className="w-full bg-primary h-14 rounded-2xl items-center justify-center shadow-lg shadow-primary/20"
        >
          <Text className="text-white text-lg font-bold">Sign In to Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push('/(auth)/signup')}
          className="mt-6"
        >
          <Text className="text-primary font-bold">Create an Account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", onPress: signOut, style: "destructive" }
      ]
    );
  };

  const MenuItem = ({ icon, title, subtitle, onPress }: { icon: any, title: string, subtitle?: string, onPress?: () => void }) => (
    <TouchableOpacity 
      onPress={onPress || (() => router.push('/coming-soon'))}
      className="flex-row items-center px-6 py-4 bg-white border-b border-gray-50"
    >
      <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 font-semibold">{title}</Text>
        {subtitle && <Text className="text-gray-500 text-xs mt-0.5">{subtitle}</Text>}
      </View>
      <ChevronRight size={20} color="#CBD5E1" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Profile Header */}
        <View className="bg-white px-6 pt-16 pb-8 items-center border-b border-gray-100">
           <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm">
             <User size={48} color="#FF4D00" />
           </View>
           <Text className="text-2xl font-bold text-gray-900">{user?.user_metadata?.full_name || 'Bhakt'}</Text>
           <Text className="text-gray-500">{user?.email}</Text>
           
           <TouchableOpacity 
             onPress={() => router.push('/profile/edit-profile')}
             className="mt-4 px-6 py-2 bg-gray-100 rounded-full"
           >
             <Text className="text-gray-700 font-medium text-sm">Edit Profile</Text>
           </TouchableOpacity>
        </View>

        {/* Menu Groups */}
        <View className="mt-8">
           <Text className="px-6 text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Account</Text>
           <MenuItem 
             icon={<Wallet size={20} color="#FF4D00" />} 
             title="Divine Wallet" 
             subtitle="Check balance & add divine credits" 
             onPress={() => router.push('/profile/wallet')}
           />
           <MenuItem icon={<Settings size={20} color="#64748B" />} title="Settings" subtitle="Notifications, Appearance, Data" />
           <MenuItem icon={<CreditCard size={20} color="#64748B" />} title="My Bookings" subtitle="Manage your puja and astrology orders" />
           <MenuItem icon={<Bell size={20} color="#64748B" />} title="Reminders" subtitle="Aarti and Mantra notifications" />
        </View>

        <View className="mt-8">
           <Text className="px-6 text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Support</Text>
           <MenuItem 
             icon={<Shield size={20} color="#64748B" />} 
             title="Privacy Policy" 
             onPress={() => router.push('/profile/legal?tab=policy')}
           />
           <MenuItem 
             icon={<Info size={20} color="#64748B" />} 
             title="About App" 
             onPress={() => router.push('/profile/legal?tab=about')}
           />
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity 
          onPress={handleSignOut}
          className="mx-6 mt-10 mb-10 flex-row items-center justify-center bg-red-50 py-4 rounded-2xl border border-red-100"
        >
          <LogOut size={20} color="#EF4444" />
          <Text className="text-red-500 font-bold ml-2">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
