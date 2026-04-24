import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  ActivityIndicator, 
  StatusBar,
  Share,
  Alert,
  Linking
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Clock, 
  Sparkles, 
  ChevronRight,
  Info,
  Calendar,
  Car,
  Heart,
  Phone
} from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../../context/LanguageContext';
import Skeleton from '../../components/Skeleton';

const { width } = Dimensions.get('window');

export default function YatraDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { language } = useLanguage();
  
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setDestination(data);
    } catch (error) {
      console.error('Error fetching yatra detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!destination) return;
    try {
      await Share.share({
        message: `Plan your spiritual journey to ${destination.name}! ${destination.tagline}\n\nExplore more on Mantra Puja app.`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCall = () => {
    Linking.openURL('tel:+919999999999'); // Placeholder support number
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#FF4D00" />
      </View>
    );
  }

  if (!destination) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-10">
        <Info size={48} color="#FF4D00" />
        <Text className="text-gray-900 text-xl font-bold mt-4 text-center">Destination Not Found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-8 bg-primary px-8 py-3 rounded-2xl">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar barStyle="light-content" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Banner Section */}
        <View className="relative h-[450px]">
          <Image 
            source={{ uri: destination.image_url || 'https://via.placeholder.com/800' }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.8)']}
            className="absolute inset-0"
          />
          
          <View className="absolute top-12 left-0 right-0 px-6 flex-row justify-between items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full items-center justify-center border border-white/20"
            >
              <ArrowLeft size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleShare}
              className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full items-center justify-center border border-white/20"
            >
              <Share2 size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View className="absolute bottom-10 left-6 right-6">
            <View className="bg-primary/80 self-start px-3 py-1 rounded-md mb-3 border border-white/20">
                <Text className="text-white text-[10px] font-black uppercase tracking-widest">Spiritual Journey</Text>
            </View>
            <Text className="text-white text-4xl font-black leading-tight">{destination.name}</Text>
            <View className="flex-row items-center mt-2">
                <MapPin size={14} color="white" />
                <Text className="text-white/80 text-sm ml-2 font-medium">{destination.location || 'Ancient Sacred Site'}</Text>
            </View>
          </View>
        </View>

        {/* Info Grid */}
        <View className="px-6 -mt-6 bg-[#FFFDFB] rounded-t-[40px] pt-10">
          <View className="flex-row justify-between mb-10">
            <View className="items-center flex-1">
                <View className="w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center mb-2">
                    <Calendar size={20} color="#FF4D00" />
                </View>
                <Text className="text-gray-400 text-[10px] font-bold uppercase">Best Time</Text>
                <Text className="text-gray-900 font-bold text-xs mt-1">{destination.best_time_to_visit || 'Oct - Mar'}</Text>
            </View>
            <View className="w-[1px] h-10 bg-gray-100 self-center" />
            <View className="items-center flex-1">
                <View className="w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center mb-2">
                    <Clock size={20} color="#3B82F6" />
                </View>
                <Text className="text-gray-400 text-[10px] font-bold uppercase">Duration</Text>
                <Text className="text-gray-900 font-bold text-xs mt-1">2-3 Days</Text>
            </View>
            <View className="w-[1px] h-10 bg-gray-100 self-center" />
            <View className="items-center flex-1">
                <View className="w-12 h-12 bg-green-50 rounded-2xl items-center justify-center mb-2">
                    <Car size={20} color="#22C55E" />
                </View>
                <Text className="text-gray-400 text-[10px] font-bold uppercase">Access</Text>
                <Text className="text-gray-900 font-bold text-xs mt-1">Easy</Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-10">
            <Text className="text-gray-900 text-2xl font-black mb-4">About the Yatra</Text>
            <Text className="text-gray-600 leading-relaxed text-[15px]">
                {destination.description || 'Embark on a soul-stirring journey to this sacred destination, where ancient traditions and divine energies converge to offer a profound spiritual experience.'}
            </Text>
          </View>

          {/* Architecture Section */}
          {destination.spiritualArchitecture && (
            <View className="mb-10 p-8 bg-gray-900 rounded-[40px] shadow-2xl shadow-black/20">
                <View className="flex-row items-center mb-6">
                    <Sparkles size={20} color="#FFD700" />
                    <Text className="text-white text-xl font-black ml-3">Sacred Architecture</Text>
                </View>
                <Text className="text-white/70 leading-relaxed text-sm">
                    {destination.spiritualArchitecture}
                </Text>
            </View>
          )}

          {/* How to Reach */}
          <View className="mb-10">
            <Text className="text-gray-900 text-xl font-black mb-4">How to Reach</Text>
            <View className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <Text className="text-gray-600 text-[14px] leading-6">
                    {destination.how_to_reach || 'This sacred site is well-connected by road, rail, and air. Major transport hubs are nearby, making it accessible for pilgrims from all over the world.'}
                </Text>
            </View>
          </View>

          {/* Quick Support */}
          <View className="p-6 bg-orange-50 rounded-[32px] border border-orange-100 flex-row items-center justify-between">
            <View className="flex-1 pr-4">
                <Text className="text-gray-900 font-bold text-base">Need Assistance?</Text>
                <Text className="text-gray-500 text-xs mt-1">Our spiritual guides can help you plan your journey.</Text>
            </View>
            <TouchableOpacity 
                onPress={handleCall}
                className="w-12 h-12 bg-primary rounded-2xl items-center justify-center shadow-lg shadow-primary/20"
            >
                <Phone size={20} color="white" />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6">
        <TouchableOpacity 
          onPress={() => Alert.alert('Inquiry Sent', 'Our representative will contact you shortly to help you plan this sacred yatra.')}
          className="bg-primary h-16 rounded-2xl shadow-xl shadow-primary/30 flex-row items-center justify-center"
        >
          <Sparkles size={20} color="white" />
          <Text className="text-white font-black text-base ml-3 uppercase tracking-tighter">Plan My Yatra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
