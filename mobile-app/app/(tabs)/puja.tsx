import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Dimensions, StatusBar } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { Sparkles, MapPin, Calendar, Heart, Search, Filter, Star, ChevronRight } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';

const { width } = Dimensions.get('window');

export default function ServicesScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');
  const [pujas, setPujas] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>(['All']);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [{ data: pujaData, error: pujaError }, { data: catData, error: catError }] = await Promise.all([
        supabase.from('poojas').select('*').eq('is_active', true).order('sort_order', { ascending: false }),
        supabase.from('categories').select('*').order('name')
      ]);
      
      if (pujaError) throw pujaError;
      if (catError) throw catError;

      if (pujaData) setPujas(pujaData);
      if (catData) setCategories(['All', ...catData.map((c: any) => c.name)]);
    } catch (error) {
      console.error('[Puja] Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    if (!user) {
      router.push('/(auth)/login');
      return;
    }
    router.push('/coming-soon');
  };

  const PujaHorizontalSection = ({ title, data }: { title: string, data: any[] }) => {
    if (data.length === 0) return null;
    return (
      <View className="mb-10">
        <View className="px-6 flex-row justify-between items-center mb-5">
          <Text className="text-gray-900 text-2xl font-bold">{title}</Text>
          <TouchableOpacity>
            <Text className="text-primary font-bold text-xs uppercase tracking-widest">View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width * 0.8 + 20}
          snapToAlignment="start"
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 24 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={{ width: width * 0.8 }} 
              className="mr-5 bg-white rounded-[40px] shadow-xl shadow-black/5 border border-orange-50 overflow-hidden"
            >
              <View style={{ width: '100%', aspectRatio: 5/3 }} className="relative bg-gray-100">
                 <Image 
                    source={{ uri: item.image_url || 'https://via.placeholder.com/500x300?text=Puja' }} 
                    className="w-full h-full"
                    resizeMode="cover"
                 />
                 <View className="absolute top-4 left-4 bg-black/40 px-3 py-1.5 rounded-full border border-white/30">
                    <Text className="text-white text-[10px] font-bold uppercase">₹{item.price}</Text>
                 </View>
                 <TouchableOpacity className="absolute top-4 right-4 w-9 h-9 bg-white/80 rounded-full items-center justify-center border border-white shadow-sm">
                    <Heart size={18} color="#FF4D00" />
                 </TouchableOpacity>
              </View>

              <View className="p-6">
                 <Text className="text-[#1A1A1A] text-xl font-bold leading-tight">{item.name}</Text>
                 <Text className="text-gray-400 text-xs mt-1 font-medium italic">{item.tagline || 'Peace and Prosperity'}</Text>
                 
                 <View className="mt-4 flex-row items-center justify-between border-t border-gray-50 pt-5">
                    <View className="flex-row items-center">
                       <View className="w-8 h-8 rounded-full bg-orange-50 items-center justify-center mr-2 border border-orange-100">
                          <Sparkles size={14} color="#FF4D00" />
                       </View>
                       <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">Certified Vedic Ritual</Text>
                    </View>
                    <TouchableOpacity onPress={handleBook} className="bg-primary px-5 py-2.5 rounded-2xl shadow-lg shadow-primary/20">
                       <Text className="text-white font-bold text-xs uppercase">Book Now</Text>
                    </TouchableOpacity>
                 </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  // Filter logic
  const filteredPujas = activeTab === 'All' ? pujas : pujas.filter(p => {
    const catName = categories.find(c => c === activeTab);
    return true; // Simplified for now, in real logic we'd map category_id
  });

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDFB" />
      
      {/* Search Header */}
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-50">
        <Text className="text-3xl font-bold text-gray-900 leading-tight">Divine <Text className="text-primary">Services</Text></Text>
        
        <View className="flex-row items-center mt-6 space-x-3">
           <View className="flex-1 h-14 bg-gray-50 rounded-2xl flex-row items-center px-4 border border-gray-100 shadow-inner">
              <Search size={20} color="#94A3B8" />
              <Text className="ml-3 text-gray-400 text-sm">Search Pujas, Havans...</Text>
           </View>
           <TouchableOpacity className="w-14 h-14 bg-gray-50 rounded-2xl items-center justify-center border border-gray-100">
              <Filter size={20} color="#FF4D00" />
           </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-16 px-6 mt-6 mb-4">
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setActiveTab(cat)}
              className={`px-6 py-3 mr-3 rounded-2xl border ${activeTab === cat ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-white border-gray-100'}`}
            >
              <Text className={`${activeTab === cat ? 'text-white font-bold' : 'text-gray-600 font-medium'}`}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Horizontal Sections */}
        <View className="mt-4">
           <PujaHorizontalSection title="Popular Pujas" data={pujas.slice(0, 4)} />
           
           {/* Divine Offer Banner */}
           <TouchableOpacity className="mx-6 mb-10 bg-indigo-600 rounded-[40px] p-8 flex-row items-center justify-between overflow-hidden">
              <View className="absolute -right-10 -top-10 opacity-10">
                 <Sparkles size={160} color="white" />
              </View>
              <View className="flex-1 pr-4">
                 <View className="bg-white/20 self-start px-2 py-0.5 rounded-md mb-2">
                    <Text className="text-white text-[9px] font-bold uppercase">Limited Offer</Text>
                 </View>
                 <Text className="text-white text-xl font-bold leading-tight">Personalized Shanti Puja</Text>
                 <Text className="text-white/80 text-xs mt-1">Get 40% off on your first booking</Text>
              </View>
              <View className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-lg">
                 <ChevronRight size={24} color="#4F46E5" />
              </View>
           </TouchableOpacity>

           <PujaHorizontalSection title="Festival Special" data={pujas.slice(2, 6)} />
           
           <PujaHorizontalSection title="Upcoming Vrat" data={pujas.slice(4, 8)} />
        </View>

        {/* Trust Banner */}
        <View className="px-6 mb-32">
           <View className="bg-orange-50/50 p-8 rounded-[40px] border border-orange-100 items-center">
              <View className="flex-row items-center mb-4">
                 {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#FFD700" color="#FFD700" />)}
              </View>
              <Text className="text-gray-900 font-bold text-center text-lg leading-tight">Over 1,00,000 Pujas Conducted with Purity</Text>
              <Text className="text-gray-500 text-xs mt-2 text-center">Verified Pandits • Vedic Procedures • Satisfied Devotees</Text>
           </View>
        </View>
      </ScrollView>
    </View>
  );
}
