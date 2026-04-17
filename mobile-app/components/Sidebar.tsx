import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  Dimensions, 
  StyleSheet, 
  Image, 
  ScrollView,
  BackHandler
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, 
  Wallet, 
  Sparkles, 
  Settings, 
  LogOut, 
  Shield, 
  Info, 
  X,
  CreditCard,
  ChevronRight
} from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  
  const translateX = useRef(new Animated.Value(-width)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Local state to handle mounted vs visible
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -width,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRender(false);
      });
    }
  }, [isOpen]);

  // Handle hardware back button
  useEffect(() => {
    const handleBackPress = () => {
      if (isOpen) {
        onClose();
        return true; // prevent default behavior
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [isOpen, onClose]);

  if (!shouldRender && !isOpen) return null;

  const handleNavigate = (route: string) => {
    onClose();
    router.push(route as any);
  };

  const SidebarItem = ({ icon: Icon, title, onPress, color = "#64748B" }: any) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center py-4 px-2 mb-1"
    >
      <View className="w-10 h-10 rounded-2xl bg-gray-50 items-center justify-center mr-4">
        <Icon size={20} color={color} />
      </View>
      <Text className="flex-1 text-gray-700 font-bold text-base">{title}</Text>
      <ChevronRight size={16} color="#CBD5E1" />
    </TouchableOpacity>
  );

  return (
    <View 
      pointerEvents={isOpen ? 'auto' : 'none'}
      style={StyleSheet.absoluteFill} 
      className="z-[100]"
    >
      {/* Backdrop */}
      <Animated.View 
        style={{ 
          opacity: backdropOpacity,
          backgroundColor: 'rgba(15, 23, 42, 0.6)' 
        }}
        className="flex-1"
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={onClose} 
          className="flex-1" 
        />
      </Animated.View>

      {/* Sidebar Content */}
      <Animated.View 
        style={{ 
          transform: [{ translateX }],
          width: width * 0.85,
        }}
        className="absolute left-0 top-0 bottom-0 bg-white shadow-2xl"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Header */}
          <View className="bg-primary pt-16 pb-8 px-6 rounded-br-[60px]">
            <View className="flex-row justify-between items-start mb-6">
              <View className="w-20 h-20 bg-white/20 rounded-[32px] items-center justify-center border border-white/30 overflow-hidden shadow-sm">
                <User size={40} color="white" />
              </View>
              <TouchableOpacity 
                onPress={onClose}
                className="w-10 h-10 bg-white/10 rounded-full items-center justify-center border border-white/20"
              >
                <X size={20} color="white" />
              </TouchableOpacity>
            </View>
            
            {user ? (
              <View>
                <Text className="text-white font-black text-2xl" numberOfLines={1}>
                  {user.user_metadata?.full_name && !user.user_metadata.full_name.includes('******')
                    ? user.user_metadata.full_name
                    : 'Bhakt Ji 🙏'}
                </Text>
                <Text className="text-white/70 text-sm mt-1 font-medium">
                  {user.phone || user.email || 'Verified User'}
                </Text>
              </View>
            ) : (
              <TouchableOpacity onPress={() => handleNavigate('/(auth)/login')}>
                <Text className="text-white font-black text-2xl">Namaste 🙏</Text>
                <Text className="text-white/70 text-sm mt-1 font-bold uppercase tracking-widest">Login to Continue</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Menu Sections */}
          <View className="p-6">
            {user && (
              <>
                <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[2px] mb-4">Divine Finance</Text>
                <SidebarItem 
                  icon={Wallet} 
                  title="Divine Wallet" 
                  color="#FF4D00"
                  onPress={() => handleNavigate('/profile/wallet')} 
                />
                
                <View className="h-px bg-gray-50 my-4" />
                
                <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[2px] mb-4">Your Profile</Text>
                <SidebarItem 
                  icon={User} 
                  title="Edit Profile" 
                  onPress={() => handleNavigate('/profile/edit-profile')} 
                />
                <SidebarItem 
                  icon={Sparkles} 
                  title="My Bookings" 
                  onPress={() => handleNavigate('/profile/bookings')} 
                />
                <SidebarItem 
                  icon={CreditCard} 
                  title="Transactions" 
                  onPress={() => handleNavigate('/profile/wallet')} 
                />
                
                <View className="h-px bg-gray-50 my-4" />
              </>
            )}

            <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[2px] mb-4">App Guide</Text>
            <SidebarItem 
              icon={Info} 
              title="About Mantra Puja" 
              onPress={() => handleNavigate('/profile/legal?tab=about')} 
            />
            <SidebarItem 
              icon={Shield} 
              title="Privacy Policy" 
              onPress={() => handleNavigate('/profile/legal?tab=policy')} 
            />
            <SidebarItem 
              icon={Settings} 
              title="Settings" 
              onPress={() => handleNavigate('/(tabs)/profile')} 
            />
            
            {user && (
              <TouchableOpacity 
                onPress={() => {
                  onClose();
                  signOut();
                }}
                className="mt-10 mb-10 flex-row items-center justify-center bg-red-50 py-4 rounded-3xl border border-red-100"
              >
                <LogOut size={20} color="#EF4444" />
                <Text className="text-red-500 font-bold ml-2">Viraam (Sign Out)</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        
        {/* Footer */}
        <View className="p-8 items-center border-t border-gray-50 bg-gray-50/30">
          <Text className="text-gray-300 text-[10px] font-black uppercase tracking-[3px]">Version 1.0.8</Text>
        </View>
      </Animated.View>
    </View>
  );
}
