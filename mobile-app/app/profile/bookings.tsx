import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar, Clock, MapPin, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export default function BookingsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = useCallback(async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('puja_bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error('[Bookings] Fetch Error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED': return '#10B981'; // Green
      case 'PENDING': return '#F59E0B'; // Amber
      case 'REJECTED': return '#EF4444'; // Red
      case 'COMPLETED': return '#3B82F6'; // Blue
      default: return '#64748B'; // Gray
    }
  };

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="pt-14 pb-4 px-6 bg-white border-b border-gray-50 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2">
          <ChevronLeft color="#1A1A1A" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 ml-2">Mera <Text className="text-primary">Anusthan</Text></Text>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FF4D00" />
          <Text className="text-gray-400 mt-4 font-medium">Shubh Muhurat dekh rahe hain...</Text>
        </View>
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          className="flex-1 px-4 pt-6"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FF4D00']} />
          }
        >
          {bookings.length > 0 ? (
            bookings.map((item) => (
              <View key={item.id} className="bg-white rounded-[32px] mb-6 shadow-sm border border-gray-100 overflow-hidden">
                <View className="p-6">
                  <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-1">
                      <Text className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Booking ID: #{item.id.slice(0, 8)}</Text>
                      <Text className="text-gray-900 font-bold text-lg leading-tight">{item.puja_name}</Text>
                    </View>
                    <View 
                      style={{ backgroundColor: getStatusColor(item.status) + '15' }}
                      className="px-3 py-1 rounded-full border"
                      style={{ borderColor: getStatusColor(item.status) + '30', backgroundColor: getStatusColor(item.status) + '10' }}
                    >
                      <Text 
                        style={{ color: getStatusColor(item.status) }}
                        className="text-[9px] font-black uppercase tracking-tighter"
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>

                  <View className="space-y-3 mb-6">
                    <View className="flex-row items-center">
                      <Calendar size={14} color="#FF4D00" />
                      <Text className="text-gray-600 text-xs ml-2 font-medium">Anusthan Date: {new Date(item.scheduled_date || item.created_at).toLocaleDateString()}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Clock size={14} color="#FF4D00" />
                      <Text className="text-gray-600 text-xs ml-2 font-medium text-nowrap">
                        Booked on {new Date(item.created_at).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <View>
                      <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Amount Paid</Text>
                      <Text className="text-primary font-black text-lg">₹{item.price}</Text>
                    </View>
                    <TouchableOpacity 
                       className="bg-white px-4 py-2 rounded-xl border border-gray-200"
                    >
                       <Text className="text-gray-700 font-bold text-[10px] uppercase">Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {item.status === 'CONFIRMED' && (
                  <View className="bg-emerald-50 px-6 py-4 flex-row items-center justify-between border-t border-emerald-100">
                    <View className="flex-row items-center">
                      <CheckCircle2 size={18} color="#059669" />
                      <Text className="text-emerald-700 text-[10px] font-black uppercase tracking-tight ml-2">Pandit ji Assigned</Text>
                    </View>
                    <Sparkles size={16} color="#059669" />
                  </View>
                )}
                
                {item.status === 'PENDING' && (
                  <View className="bg-amber-50 px-6 py-4 flex-row items-center justify-between border-t border-amber-100">
                    <View className="flex-row items-center">
                      <AlertCircle size={18} color="#D97706" />
                      <Text className="text-amber-700 text-[10px] font-black uppercase tracking-tight ml-2">Awaiting Confirmation</Text>
                    </View>
                  </View>
                )}
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-20 px-10">
               <View className="w-24 h-24 bg-orange-50 rounded-[40px] items-center justify-center mb-6">
                 <Sparkles size={48} color="#FF4D00" opacity={0.2} />
               </View>
               <Text className="text-gray-900 font-bold text-lg text-center mb-2">Abhi tak koi booking nahi hai</Text>
               <Text className="text-gray-500 text-sm text-center leading-relaxed">Divine puja aur anusthan book karein aur Pandit ji ka ashirwad payein.</Text>
               <TouchableOpacity 
                 onPress={() => router.push('/(tabs)')}
                 className="mt-8 bg-primary px-8 py-4 rounded-3xl shadow-lg shadow-primary/20"
               >
                 <Text className="text-white font-black uppercase tracking-widest text-xs">Book My First Puja</Text>
               </TouchableOpacity>
            </View>
          )}
          <View className="h-32" />
        </ScrollView>
      )}
    </View>
  );
}
