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
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react-native';
import { api } from '../../lib/api';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function PujaDetailScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const [puja, setPuja] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    fetchPuja();
  }, [slug]);

  useEffect(() => {
    if (puja?.date) {
      const timer = setInterval(() => {
        const eventDate = new Date(puja.date).getTime();
        const now = new Date().getTime();
        const diff = eventDate - now;

        if (diff > 0) {
          setCountdown({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          });
        }
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [puja]);

  const fetchPuja = async () => {
    try {
      setLoading(true);
      // 🚀 Direct Supabase Fetch (More reliable than backend API during dev)
      const { data, error } = await supabase
        .from('poojas')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setPuja(data);
    } catch (error) {
      console.error('Error fetching puja:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Experience the divine ${puja.name} at ${puja.location}. Book your ritual now on Mantra Puja!`,
        url: `https://mantrapuja.org/puja/${puja.slug}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#FF4D00" />
        <Text className="text-gray-400 mt-4 font-bold uppercase tracking-widest text-[10px]">Loading Ritual Details...</Text>
      </View>
    );
  }

  if (!puja) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-10">
        <Info size={48} color="#FF4D00" />
        <Text className="text-gray-900 text-xl font-bold mt-4 text-center">Ritual Not Found</Text>
        <Text className="text-gray-500 text-center mt-2">This ritual might have been completed or moved.</Text>
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mt-8 bg-primary px-8 py-3 rounded-2xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar barStyle="light-content" transparent />
      
      {/* Header Image Section */}
      <View className="relative h-[400px]">
        <Image 
          source={{ uri: puja.image_url || 'https://via.placeholder.com/1000x800' }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)']}
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

        {/* Floating Info Over Image */}
        <View className="absolute bottom-10 left-6 right-6">
          <View className="flex-row items-center mb-2">
            <View className="bg-primary px-3 py-1 rounded-full flex-row items-center">
              <Zap size={12} color="white" fill="white" />
              <Text className="text-white text-[10px] font-bold uppercase ml-1">Live Event</Text>
            </View>
            <View className="bg-white/20 px-3 py-1 rounded-full ml-2 border border-white/30">
              <Text className="text-white text-[10px] font-bold uppercase">Limited Seats</Text>
            </View>
          </View>
          <Text className="text-white text-3xl font-black leading-tight">{puja.name}</Text>
          <View className="flex-row items-center mt-2">
            <MapPin size={14} color="#FFD700" />
            <Text className="text-white/80 text-xs ml-1 font-medium">{puja.location}</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1 -mt-6 bg-[#FFFDFB] rounded-t-[40px]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Quick Stats Bar */}
        <View className="flex-row justify-between px-6 mt-8">
          <View className="items-center flex-1">
            <View className="w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center mb-1">
              <Calendar size={20} color="#FF4D00" />
            </View>
            <Text className="text-gray-900 font-bold text-xs">{new Date(puja.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</Text>
            <Text className="text-gray-400 text-[8px] font-bold uppercase">Date</Text>
          </View>
          <View className="w-[1px] h-10 bg-gray-100 self-center" />
          <View className="items-center flex-1">
            <View className="w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center mb-1">
              <Clock size={20} color="#FF4D00" />
            </View>
            <Text className="text-gray-900 font-bold text-xs">{new Date(puja.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</Text>
            <Text className="text-gray-400 text-[8px] font-bold uppercase">Time</Text>
          </View>
          <View className="w-[1px] h-10 bg-gray-100 self-center" />
          <View className="items-center flex-1">
            <View className="w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center mb-1">
              <ShieldCheck size={20} color="#FF4D00" />
            </View>
            <Text className="text-gray-900 font-bold text-xs">Verified</Text>
            <Text className="text-gray-400 text-[8px] font-bold uppercase">Temple</Text>
          </View>
        </View>

        {/* Countdown Timer Widget */}
        <View className="mx-6 mt-8">
           <LinearGradient
             colors={['#FF4D00', '#FF8C00']}
             start={{ x: 0, y: 0 }}
             end={{ x: 1, y: 1 }}
             className="p-6 rounded-[32px] flex-row justify-between items-center shadow-xl shadow-primary/30"
           >
             <View>
                <Text className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Ritual Starts In</Text>
                <Text className="text-white text-lg font-bold">Booking Closing Soon</Text>
             </View>
             <View className="flex-row items-center space-x-2">
                <View className="items-center">
                    <Text className="text-white text-xl font-black">{countdown.days}</Text>
                    <Text className="text-white/70 text-[8px] font-bold uppercase">Days</Text>
                </View>
                <Text className="text-white text-xl font-black">:</Text>
                <View className="items-center">
                    <Text className="text-white text-xl font-black">{countdown.hours}</Text>
                    <Text className="text-white/70 text-[8px] font-bold uppercase">Hrs</Text>
                </View>
                <Text className="text-white text-xl font-black">:</Text>
                <View className="items-center">
                    <Text className="text-white text-xl font-black">{countdown.mins}</Text>
                    <Text className="text-white/70 text-[8px] font-bold uppercase">Min</Text>
                </View>
             </View>
           </LinearGradient>
        </View>

        {/* About Description */}
        <View className="px-6 mt-10">
          <Text className="text-gray-900 text-xl font-bold mb-3">Divine Description</Text>
          <Text className="text-gray-600 leading-relaxed text-sm">
            {puja.about_description || puja.description}
          </Text>
        </View>

        {/* Ritual Packages Section */}
        <View className="mt-10">
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="text-gray-900 text-xl font-bold">Select Package</Text>
            <View className="bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
               <Text className="text-primary text-[10px] font-bold">Tax Included</Text>
            </View>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {puja.packages && puja.packages.map((pkg: any, idx: number) => (
              <TouchableOpacity 
                key={idx}
                onPress={() => setSelectedPackage(idx)}
                className={`mr-4 p-5 rounded-[32px] border-2 w-64 ${selectedPackage === idx ? 'border-primary bg-orange-50/30' : 'border-gray-100 bg-white'}`}
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View className={`w-8 h-8 rounded-full items-center justify-center ${selectedPackage === idx ? 'bg-primary' : 'bg-gray-100'}`}>
                    <CheckCircle2 size={16} color={selectedPackage === idx ? 'white' : '#CBD5E1'} />
                  </View>
                  <Text className={`font-black text-xl ${selectedPackage === idx ? 'text-primary' : 'text-gray-900'}`}>₹{pkg.price}</Text>
                </View>
                <Text className="text-gray-900 font-bold text-sm mb-1">{pkg.name}</Text>
                <Text className="text-gray-500 text-[10px] leading-4" numberOfLines={2}>{pkg.description}</Text>
                
                <View className="mt-4 pt-4 border-t border-gray-50 flex-row items-center">
                  <Text className="text-primary font-bold text-[10px] uppercase">Select Ritual</Text>
                  <ChevronRight size={12} color="#FF4D00" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Social Proof Bar */}
        <View className="mx-6 mt-10 p-6 bg-gray-50 rounded-[32px] border border-gray-100 flex-row items-center">
           <View className="flex-row -space-x-3">
              {[1,2,3,4].map(i => (
                <View key={i} className="w-8 h-8 rounded-full border-2 border-white bg-orange-100 items-center justify-center overflow-hidden">
                   <Image source={{ uri: `https://i.pravatar.cc/100?u=${i}` }} className="w-full h-full" />
                </View>
              ))}
              <View className="w-8 h-8 rounded-full border-2 border-white bg-primary items-center justify-center">
                 <Text className="text-white text-[8px] font-bold">+2k</Text>
              </View>
           </View>
           <View className="ml-4">
              <Text className="text-gray-900 font-bold text-xs">2,480+ Devotees</Text>
              <Text className="text-gray-500 text-[10px]">Have booked this ritual this month</Text>
           </View>
        </View>

      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6 flex-row items-center justify-between">
        <View>
          <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Total Price</Text>
          <Text className="text-gray-900 text-2xl font-black">₹{puja.packages?.[selectedPackage]?.price || puja.price}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/coming-soon')}
          className="bg-primary px-10 py-4 rounded-[20px] shadow-xl shadow-primary/40 flex-row items-center"
        >
          <Text className="text-white font-bold text-base mr-2 uppercase tracking-tighter">Book Ritual</Text>
          <ChevronRight size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
