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
  StyleSheet
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  Calendar, 
  Clock, 
  Info,
  ChevronRight,
  Star,
  Zap,
  CheckCircle2
} from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');

export default function FestivalDetailScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [festival, setFestival] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pujas, setPujas] = useState<any[]>([]);

  useEffect(() => {
    fetchFestival();
  }, [slug]);

  const fetchFestival = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('festivals')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setFestival(data);

      // Fetch 3 relevant pujas
      const { data: pujaData } = await supabase
        .from('poojas')
        .select('*')
        .eq('is_active', true)
        .limit(3);
      
      if (pujaData) setPujas(pujaData);

    } catch (error) {
      console.error('Error fetching festival:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!festival) return;
    try {
      const name = language === 'hi' ? (festival.name_hi || festival.name) : festival.name;
      await Share.share({
        message: `Celebrate ${name} with Mantra Puja! Discover rituals, significance, and book divine services.\n\nRead more: https://mantrapuja.org/festivals/${festival.slug}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#FF4D00" />
        <Text className="text-gray-400 mt-4 font-bold uppercase tracking-widest text-[10px]">Aligning Divine Stars...</Text>
      </View>
    );
  }

  if (!festival) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-10">
        <Info size={48} color="#FF4D00" />
        <Text className="text-gray-900 text-xl font-bold mt-4 text-center">Festival Not Found</Text>
        <Text className="text-gray-500 text-center mt-2">The festival details you are looking for are currently being updated by our Pandits.</Text>
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mt-8 bg-primary px-8 py-3 rounded-2xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const fDate = new Date(festival.date);
  const name = language === 'hi' ? (festival.name_hi || festival.name) : festival.name;
  const description = language === 'hi' ? (festival.description_hi || festival.description) : festival.description;
  const imageUrl = festival.images?.[0] || 'https://via.placeholder.com/1000x800?text=Festival';

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header Image Section */}
      <View className="relative h-[450px]">
        <Image 
          source={{ uri: imageUrl.startsWith('http') ? imageUrl : 'https://mantrapuja.com/logo.png' }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.8)']}
          className="absolute inset-0"
        />
        
        {/* Navigation Bar */}
        <View className="absolute top-12 left-0 right-0 px-6 flex-row justify-between items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border border-white/30"
          >
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>
          <View className="flex-row space-x-3">
            <TouchableOpacity 
              onPress={handleShare}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border border-white/30"
            >
              <Share2 size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border border-white/30">
              <Heart size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title Overlay */}
        <View className="absolute bottom-12 left-6 right-6">
          <View className="bg-white/20 self-start px-3 py-1 rounded-full border border-white/30 mb-3 backdrop-blur-sm">
            <Text className="text-white text-[10px] font-black uppercase tracking-widest">
              {festival.month} {festival.year}
            </Text>
          </View>
          <Text className="text-white text-4xl font-black leading-tight shadow-xl">{name}</Text>
          <View className="flex-row items-center mt-3">
            <Calendar size={16} color="#FFD700" />
            <Text className="text-white/90 text-sm ml-2 font-bold">
              {fDate.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1 -mt-10 bg-[#FFFDFB] rounded-t-[40px] shadow-2xl"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Significance Section */}
        <View className="px-6 mt-10">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-orange-50 rounded-2xl items-center justify-center mr-3">
              <Star size={20} color="#FF4D00" />
            </View>
            <Text className="text-gray-900 text-xl font-black">{language === 'hi' ? 'महत्व' : 'Significance'}</Text>
          </View>
          <Text className="text-gray-600 leading-relaxed text-[15px]">
            {description}
          </Text>
          {festival.content?.significance && (
             <Text className="text-gray-600 leading-relaxed text-[15px] mt-4">
                {festival.content.significance}
             </Text>
          )}
        </View>

        {/* Rituals Section */}
        {festival.content?.rituals && festival.content.rituals.length > 0 && (
          <View className="px-6 mt-10">
            <View className="flex-row items-center mb-6">
              <View className="w-10 h-10 bg-orange-50 rounded-2xl items-center justify-center mr-3">
                <CheckCircle2 size={20} color="#FF4D00" />
              </View>
              <Text className="text-gray-900 text-xl font-black">{language === 'hi' ? 'मुख्य अनुष्ठान' : 'Key Rituals'}</Text>
            </View>
            
            <View className="gap-4">
              {festival.content.rituals.map((ritual: string, index: number) => (
                <View key={index} className="flex-row bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                  <View className="w-8 h-8 bg-primary/10 rounded-full items-center justify-center mr-4">
                    <Text className="text-primary font-black text-xs">{index + 1}</Text>
                  </View>
                  <Text className="text-gray-800 font-bold flex-1 self-center">{ritual}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Recommended Pujas Section */}
        <View className="mt-12">
          <View className="px-6 flex-row justify-between items-center mb-6">
            <View>
                <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Recommended</Text>
                <Text className="text-gray-900 text-xl font-black">{language === 'hi' ? 'विशेष पूजा' : 'Special Pujas'}</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/puja')}>
              <Text className="text-primary font-bold text-xs">View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {pujas.map((item) => (
              <TouchableOpacity 
                key={item.id}
                onPress={() => router.push(`/puja/${item.slug}`)}
                className="mr-5 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden w-64"
              >
                <Image source={{ uri: item.image_url }} className="w-full h-32" resizeMode="cover" />
                <View className="p-4">
                  <Text className="text-gray-900 font-bold text-sm mb-1" numberOfLines={1}>{item.name}</Text>
                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-primary font-black">₹{item.price}</Text>
                    <View className="bg-orange-50 px-2 py-1 rounded-md">
                        <Text className="text-primary text-[8px] font-bold uppercase">Book Now</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View className="h-20" />
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6">
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/puja')}
          className="bg-primary py-4 rounded-2xl shadow-xl shadow-primary/30 flex-row items-center justify-center"
        >
          <Text className="text-white font-black text-base mr-2 uppercase tracking-tighter">
            {language === 'hi' ? 'दिव्य पूजा बुक करें' : 'Book Divine Ritual'}
          </Text>
          <ChevronRight size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
