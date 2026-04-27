import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Bell, Star, ShoppingBag, Gift, Clock, Trash2 } from 'lucide-react-native';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function NotificationsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Fetch Notifications Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = async () => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id);
      
      if (!error) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      }
    } catch (error) {
      console.error('Mark Read Error:', error);
    }
  };

  const clearNotifications = async () => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('user_id', user.id);
      
      if (!error) {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Clear Notifications Error:', error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'divine': return <Star size={20} color="#FF4D00" />;
      case 'offer': return <Gift size={20} color="#10B981" />;
      case 'order': return <ShoppingBag size={20} color="#4F46E5" />;
      default: return <Clock size={20} color="#F59E0B" />;
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#FFFDFB] items-center justify-center">
        <ActivityIndicator size="large" color="#FF4D00" />
      </View>
    );
  }

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
                    {getIcon(item.type)}
                  </View>
                  <View className="flex-1">
                    <View className="flex-row justify-between items-start mb-1">
                      <Text className={`text-base flex-1 pr-2 ${item.read ? 'font-bold text-gray-700' : 'font-black text-gray-900'}`}>{item.title}</Text>
                      {!item.read && <View className="w-2 h-2 rounded-full bg-primary mt-1.5" />}
                    </View>
                    <Text className="text-gray-500 text-xs leading-5" numberOfLines={2}>{item.message}</Text>
                    <Text className="text-gray-400 text-[9px] font-bold uppercase mt-3 tracking-tighter">
                      {new Date(item.created_at).toLocaleDateString()}
                    </Text>
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
