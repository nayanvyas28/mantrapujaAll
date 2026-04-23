import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  StatusBar,
  Dimensions
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Filter, Search, MapPin, Calendar, Star } from 'lucide-react-native';
import { api } from '../../lib/api';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function PujaListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [pujas, setPujas] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>((params.category_id as string) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 🚀 Direct Supabase Fetch
      let pujaQuery = supabase.from('poojas').select('*').order('sort_order', { ascending: false });
      if (selectedCategory) {
        pujaQuery = pujaQuery.eq('category_id', selectedCategory);
      }

      const [pujasRes, categoriesRes] = await Promise.all([
        pujaQuery,
        supabase.from('categories').select('*').order('order')
      ]);

      if (pujasRes.error) throw pujasRes.error;
      if (categoriesRes.error) throw categoriesRes.error;

      setPujas(pujasRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="pt-14 pb-6 px-6 bg-white border-b border-gray-50 flex-row justify-between items-center">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center"
        >
          <ArrowLeft size={20} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-bold">Divine Rituals</Text>
        <TouchableOpacity className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
          <Search size={20} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* Categories Bar */}
      <View className="py-4">
        <FlatList
          data={[{ id: null, name: 'All' }, ...categories]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          keyExtractor={(item) => item.id?.toString() || 'all'}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item.id)}
              className={`mr-3 px-6 py-2.5 rounded-full border ${selectedCategory === item.id ? 'bg-primary border-primary' : 'bg-white border-gray-100'}`}
            >
              <Text className={`font-bold text-xs ${selectedCategory === item.id ? 'text-white' : 'text-gray-500'}`}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FF4D00" />
        </View>
      ) : (
        <FlatList
          data={pujas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/puja/${item.slug}` as any)}
              className="mb-8 bg-white rounded-[40px] shadow-xl shadow-black/5 border border-orange-50 overflow-hidden"
            >
              <View className="relative h-56 bg-gray-100">
                <Image
                  source={{ uri: item.image_url || 'https://via.placeholder.com/500x300' }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.4)']}
                  className="absolute inset-0"
                />
                <View className="absolute top-4 left-4 bg-primary px-3 py-1.5 rounded-full shadow-lg">
                  <Text className="text-white text-[10px] font-bold uppercase">Popular</Text>
                </View>
                <View className="absolute bottom-4 left-4 flex-row items-center">
                   <MapPin size={12} color="white" />
                   <Text className="text-white text-[10px] font-bold ml-1">{item.location}</Text>
                </View>
              </View>

              <View className="p-6">
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-1 mr-2">
                    <Text className="text-gray-900 text-xl font-bold" numberOfLines={1}>{item.name}</Text>
                    <Text className="text-gray-400 text-xs mt-0.5" numberOfLines={1}>{item.tagline || 'Experience the divine ritual'}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-primary font-black text-xl">₹{item.price}</Text>
                    <Text className="text-gray-400 text-[8px] font-bold uppercase">Starting</Text>
                  </View>
                </View>

                <View className="mt-4 pt-4 border-t border-gray-50 flex-row justify-between items-center">
                   <View className="flex-row items-center">
                      <Calendar size={14} color="#FF4D00" />
                      <Text className="text-gray-600 text-xs ml-1 font-medium">{new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</Text>
                   </View>
                   <View className="bg-orange-50 px-4 py-2 rounded-2xl">
                      <Text className="text-primary font-bold text-xs">View Details</Text>
                   </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="items-center justify-center mt-20">
               <Text className="text-gray-400 font-bold">No rituals found in this category.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}
