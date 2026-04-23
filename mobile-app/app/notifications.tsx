import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Bell, Sparkles, ShoppingBag, Gift, Clock, Trash2 } from 'lucide-react-native';

const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    type: 'divine',
    title: 'Daily Darshan is Live!',
    message: 'Start your day with the divine blessing of Lord Shiva. Watch now.',
    time: '2 mins ago',
    read: false,
    icon: <Sparkles size={20} color="#FF4D00" />
  },
  {
    id: '2',
    type: 'offer',
    title: 'Special Shanti Puja Offer',
    message: 'Get 40% off on your first personalized Shanti Puja booking.',
    time: '1 hour ago',
    read: false,
    icon: <Gift size={20} color="#10B981" />
  },
  {
    id: '3',
    type: 'order',
    title: 'Ritual Confirmed',
    message: 'Your Rudrabhishek Puja has been confirmed for tomorrow at 8:00 AM.',
    time: '3 hours ago',
    read: true,
    icon: <ShoppingBag size={20} color="#4F46E5" />
  },
  {
    id: '4',
    type: 'divine',
    title: 'Guru AI Insight',
    message: 'Your stars are aligning for a prosperous week. Check your report.',
    time: '1 day ago',
    read: true,
    icon: <Clock size={20} color="#F59E0B" />
  }
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="pt-14 pb-6 px-6 bg-white border-b border-gray-50 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
            <ChevronLeft color="#1A1A1A" size={28} />
          </TouchableOpacity>
          <Text className="text-2xl font-extrabold text-gray-900">Divine <Text className="text-primary">Alerts</Text></Text>
        </View>
        
        {notifications.length > 0 && (
          <TouchableOpacity onPress={clearNotifications} className="p-2">
            <Trash2 size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {notifications.length > 0 ? (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 py-6 flex-row justify-between items-center">
             <Text className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Recent Activities</Text>
             <TouchableOpacity onPress={markAllRead}>
                <Text className="text-primary font-bold text-xs">Mark all as read</Text>
             </TouchableOpacity>
          </View>

          <View className="px-6 pb-20">
            {notifications.map((item) => (
              <TouchableOpacity 
                key={item.id}
                className={`mb-4 p-5 rounded-[32px] border ${item.read ? 'bg-white border-gray-50' : 'bg-orange-50/30 border-orange-100 shadow-sm shadow-orange-200/20'}`}
              >
                <View className="flex-row">
                  <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${item.read ? 'bg-gray-50' : 'bg-white shadow-sm'}`}>
                    {item.icon}
                  </View>
                  <View className="flex-1">
                    <View className="flex-row justify-between items-start mb-1">
                      <Text className={`text-base flex-1 pr-2 ${item.read ? 'font-bold text-gray-700' : 'font-black text-gray-900'}`}>{item.title}</Text>
                      {!item.read && <View className="w-2 h-2 rounded-full bg-primary mt-1.5" />}
                    </View>
                    <Text className="text-gray-500 text-xs leading-5" numberOfLines={2}>{item.message}</Text>
                    <Text className="text-gray-400 text-[9px] font-bold uppercase mt-3 tracking-tighter">{item.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-10">
          <View className="w-24 h-24 bg-gray-50 rounded-full items-center justify-center mb-6">
            <Bell size={40} color="#CBD5E1" />
          </View>
          <Text className="text-xl font-bold text-gray-900 text-center">Peaceful Silence</Text>
          <Text className="text-gray-500 text-sm text-center mt-2">You don't have any divine notifications at the moment.</Text>
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mt-8 bg-primary px-8 py-4 rounded-2xl shadow-lg shadow-primary/20"
          >
            <Text className="text-white font-bold">Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
