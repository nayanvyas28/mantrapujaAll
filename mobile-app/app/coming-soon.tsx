import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Bell, Sparkles, Moon, Sun } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function ComingSoonScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#FFFDFB]">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm"
        >
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Divine Discovery</Text>
        <View className="w-10" />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-10 pb-20 mt-10">
        <View className="items-center">
          {/* Animated/Visual Element */}
          <View className="relative w-48 h-48 mb-10">
            <View className="absolute inset-0 bg-orange-100 rounded-full opacity-30 scale-125" />
            <View className="absolute inset-0 bg-primary/5 rounded-full opacity-50 scale-110" />
            <View className="w-full h-full bg-white rounded-full items-center justify-center shadow-2xl border-2 border-orange-50">
              <Sparkles size={72} color="#FF4D00" />
            </View>
          </View>

          <Text className="text-4xl font-extrabold text-gray-900 text-center tracking-tight leading-tight">
            Sacred <Text className="text-primary">Evolutions</Text>
          </Text>
          <Text className="text-gray-500 text-center mt-6 leading-7 text-[15px] font-medium px-4">
            Our Pandits are currently purifying this ritual experience. This feature is being refined with Vedic precision and will be available in the next moon cycle.
          </Text>

          <View className="w-full mt-14 space-y-4">
             <TouchableOpacity className="bg-primary h-18 py-4 rounded-3xl flex-row items-center justify-center shadow-2xl shadow-primary/40">
                <Bell size={22} color="white" />
                <Text className="text-white font-bold text-lg ml-3">Notify Me on Arrival</Text>
             </TouchableOpacity>

             <TouchableOpacity 
               onPress={() => router.back()}
               className="h-18 py-4 rounded-3xl items-center justify-center border-2 border-orange-100 bg-white"
             >
                <Text className="text-primary font-bold text-lg">Return to Sanctuary</Text>
             </TouchableOpacity>
          </View>

          {/* Footer Spiritual Icons */}
          <View className="flex-row mt-20 space-x-12 opacity-10">
             <Moon size={28} color="#000" />
             <Sun size={28} color="#000" />
             <Sparkles size={28} color="#000" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
