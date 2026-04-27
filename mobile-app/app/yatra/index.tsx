import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  ActivityIndicator, 
  TextInput,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  MapPin, 
  Search, 
  Star,
  ArrowRight,
  Compass,
  Star
} from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Skeleton from '../../components/Skeleton';

const { width } = Dimensions.get('window');

export default function YatraListingScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name');

      if (error) throw error;
      setDestinations(data || []);
    } catch (error) {
      console.error('[Yatra] Fetch Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.tagline?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const YatraCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/yatra/${item.id}`)}
      activeOpacity={0.9}
      className="bg-white rounded-[40px] mb-8 shadow-xl shadow-black/5 border border-gray-50 overflow-hidden"
    >
      <View className="relative h-60">
        <Image 
          source={{ uri: item.image_url || 'https://via.placeholder.com/800x600' }} 
          className="w-full h-full" 
          resizeMode="cover" 
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          className="absolute inset-0"
        />
        <View className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
          <Text className="text-white text-[10px] font-bold uppercase tracking-widest">Spiritual Destination</Text>
        </View>
        <View className="absolute bottom-6 left-6 right-6">
          <Text className="text-white text-2xl font-black mb-1">{item.name}</Text>
          <View className="flex-row items-center">
            <MapPin size={12} color="white" />
            <Text className="text-white/80 text-xs ml-1 font-medium">{item.location || 'India'}</Text>
          </View>
        </View>
      </View>
      <View className="p-6">
        <Text className="text-gray-500 text-xs leading-5 italic" numberOfLines={2}>
            {item.tagline || 'Discover the divine energy and ancient wisdom of this sacred place.'}
        </Text>
        <View className="mt-4 flex-row justify-between items-center pt-4 border-t border-gray-50">
            <View className="flex-row items-center">
                <Star size={14} color="#FFD700" fill="#FFD700" />
                <Text className="text-gray-900 font-bold text-xs ml-1">Top Rated Journey</Text>
            </View>
            <View className="flex-row items-center">
                <Text className="text-primary font-bold text-xs mr-1 uppercase">Explore</Text>
                <ArrowRight size={14} color="#FF4D00" />
            </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#FDFCFB]">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="pt-14 pb-6 px-6 bg-white border-b border-gray-50 flex-row items-center justify-between">
        <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2 mr-2">
                <ChevronLeft color="#1A1A1A" size={24} />
            </TouchableOpacity>
            <View>
                <Text className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Sacred Journeys</Text>
                <Text className="text-xl font-bold text-gray-900">Spiritual <Text className="text-primary">Yatra</Text></Text>
            </View>
        </View>
        <View className="w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center border border-orange-100">
            <Compass size={24} color="#FF4D00" />
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FF4D00']} />}
      >
        {/* Search */}
        <View className="px-6 mt-6">
            <View className="bg-white h-14 rounded-2xl flex-row items-center px-4 border border-gray-100 shadow-sm">
                <Search size={20} color="#94A3B8" />
                <TextInput 
                    placeholder="Find your next spiritual retreat..."
                    className="flex-1 ml-3 text-gray-900 font-medium"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
        </View>

        {/* List Content */}
        <View className="px-6 mt-8 pb-32">
            {loading ? (
                <View>
                    {[1, 2, 3].map(i => (
                        <View key={i} className="mb-8">
                            <Skeleton width="100%" height={240} borderRadius={40} />
                            <Skeleton width="60%" height={15} borderRadius={6} className="mt-4" />
                            <Skeleton width="40%" height={10} borderRadius={4} className="mt-2" />
                        </View>
                    ))}
                </View>
            ) : filteredDestinations.length > 0 ? (
                filteredDestinations.map(item => <YatraCard key={item.id} item={item} />)
            ) : (
                <View className="py-20 items-center justify-center">
                    <MapPin size={48} color="#CBD5E1" />
                    <Text className="text-gray-400 mt-4 font-bold">No destinations found</Text>
                </View>
            )}
        </View>
      </ScrollView>
    </View>
  );
}
