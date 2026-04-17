import React, { useRef, useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, FlatList, Dimensions, Animated, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { Heart, Wallet, Bell, Sparkles, Calendar, ChevronRight, Star, ShoppingBag, MapPin, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const TESTIMONIALS = [
  { id: '1', user: 'Rahul S.', text: 'Very detailed Kundli analysis. Highly recommended!', rating: 5 },
  { id: '2', user: 'Priya M.', text: 'The Pandit ji was very knowledgeable. Satisfied.', rating: 5 },
];

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const { toggle } = useSidebar();
  const router = useRouter();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Bhakt';


  const [categories, setCategories] = useState<any[]>([]);

  const [upcomingPujas, setUpcomingPujas] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const bannerRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  // Auto-slide banners
  useEffect(() => {
    if (banners.length > 1 && !loading) {
      const timer = setInterval(() => {
        const nextIndex = (activeBannerIndex + 1) % banners.length;
        setActiveBannerIndex(nextIndex);
        bannerRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [banners.length, activeBannerIndex, loading]);

  const fetchHomeData = useCallback(async () => {
    try {
      const [
        { data: pujaData },
        { data: bannerData },
        { data: productData },
        { data: destinationData },
        { data: categoryData }
      ] = await Promise.all([
        supabase.from('poojas').select('*').eq('is_active', true).eq('show_on_home', true).order('sort_order', { ascending: false }),
        supabase.from('home_banners').select('*').eq('is_active', true).order('display_order'),
        supabase.from('products_99').select('*').eq('is_active', true).eq('show_on_home', true).order('home_order'),
        supabase.from('destinations').select('*').eq('is_active', true).eq('show_on_home', true).order('home_order'),
        supabase.from('categories').select('*').eq('is_active', true).order('sort_order')
      ]);
        
      if (pujaData) setUpcomingPujas(pujaData);
      if (bannerData) setBanners(bannerData);
      if (productData) setProducts(productData);
      if (destinationData) setDestinations(destinationData);
      if (categoryData) setCategories(categoryData);
    } catch (error) {
      console.error('[Home] Fetch Data Error:', error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar barStyle="light-content" backgroundColor="#FF4D00" />
      
      {/* Premium Navbar */}
      <View className="bg-primary pt-10 pb-4 px-6 rounded-b-[40px] shadow-2xl shadow-primary/40">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity 
            onPress={() => toggle(true)}
            className="flex-row items-center"
          >
            <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center border border-white/30">
               <Image 
                  source={require('../../assets/images/logo.png')} 
                  className="w-10 h-10"
                  resizeMode="contain"
               />
            </View>
            <View className="ml-3">
               <Text className="text-white/60 text-[10px] font-bold uppercase tracking-[2px]">Namaste,</Text>
               <Text className="text-white font-bold text-lg leading-tight">{firstName}<Text className="text-white/60 font-medium"> ji</Text></Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row space-x-2">
            <TouchableOpacity className="w-9 h-9 bg-white/10 rounded-xl items-center justify-center border border-white/10">
              <Heart size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-9 h-9 bg-white/10 rounded-xl items-center justify-center border border-white/10">
              <Wallet size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-9 h-9 bg-white/10 rounded-xl items-center justify-center border border-white/10">
              <Bell size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Main Banner Slider - Live Data */}
        <View className="mt-4"> 
          {loading ? (
            <View className="items-center justify-center h-44 mx-6 bg-gray-50 rounded-[40px] border border-gray-100">
               <Image 
                 source={require('../../assets/images/logo.png')} 
                 style={{ width: 60, height: 60, opacity: 0.3 }} 
                 resizeMode="contain"
               />
            </View>
          ) : banners.length > 0 ? (
            <FlatList
              ref={bannerRef}
              data={banners}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={width}
              snapToAlignment="center"
              decelerationRate="fast"
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / width);
                setActiveBannerIndex(index);
              }}
              keyExtractor={(item) => item.id?.toString()}
              renderItem={({ item }) => (
                <View style={{ width: width }} className="items-center">
                  <TouchableOpacity 
                     onPress={() => item.route && item.route !== "#" ? router.push(item.route) : router.push("/coming-soon")}
                     style={{ width: width - 40 }} 
                     className="h-44 rounded-[40px] overflow-hidden bg-gray-100"
                  >
                     <Image 
                        source={{ uri: item.image_url || 'https://via.placeholder.com/1200x600?text=Special+Offer' }} 
                        className="w-full h-full" 
                        defaultSource={require('../../assets/images/icon.png')}
                     />
                     {item.show_text_overlay && (
                       <View className="absolute inset-x-0 bottom-0 p-6 bg-black/40">
                          <Text className="text-white font-bold text-xl">{item.title}</Text>
                          <Text className="text-white/90 text-xs mt-1">{item.subtitle}</Text>
                       </View>
                     )}
                     {item.show_offer && (
                       <View className="absolute top-4 right-4 bg-orange-600 px-3 py-1 rounded-full border border-white/20 shadow-lg">
                          <Text className="text-white text-[9px] font-black uppercase tracking-widest">{item.offer_tag}</Text>
                       </View>
                     )}
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <TouchableOpacity 
               style={{ width: width - 40 }} 
               className="h-44 rounded-[40px] overflow-hidden bg-primary/10 self-center items-center justify-center border border-primary/20"
            >
               <Sparkles size={40} color="#FF4D00" opacity={0.2} />
               <Text className="text-primary font-bold text-lg mt-2">Welcome to Mantra Pooja</Text>
               <Text className="text-primary/60 text-xs">Explore divine rituals and items</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Action Grid */}
        {categories.length > 0 && (
          <View className="px-6 mt-4">
             <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1">
                {categories.map((cat) => (
                  <TouchableOpacity 
                     key={cat.id} 
                     onPress={() => router.push(cat.route as any)}
                     className="mr-6 items-center"
                  >
                    <View className="w-16 h-16 bg-orange-50 rounded-[24px] items-center justify-center mb-1 border border-orange-100 shadow-sm shadow-orange-200/50">
                      <Text className="text-2xl">{cat.icon}</Text>
                      {cat.free && (
                        <View className="absolute -top-2 -right-2 bg-green-500 px-1.5 py-0.5 rounded-md">
                          <Text className="text-white text-[8px] font-bold uppercase">Free</Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-gray-700 text-[10px] font-bold uppercase tracking-tight">{cat.name}</Text>
                  </TouchableOpacity>
                ))}
             </ScrollView>
          </View>
        )}
  
         {/* Astro Guidance Section - Compact Version */}
         <View className="px-6 mt-4">
            <TouchableOpacity 
              onPress={() => router.push('/(tabs)/astro')}
              className="bg-white rounded-[32px] p-6 border border-saffron-100 shadow-lg shadow-saffron-200/10 overflow-hidden"
            >
              <LinearGradient 
                colors={['#FFF8F0', 'white']} 
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 1}} 
                style={StyleSheet.absoluteFill} 
              />
              <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-3">
                  <View className="bg-primary/10 self-start px-2 py-0.5 rounded-full mb-2">
                    <Text className="text-primary font-black text-[8px] uppercase tracking-widest">Vedic Insight</Text>
                  </View>
                  <Text className="text-gray-900 font-extrabold text-lg leading-tight">Reveal Your Cosmic Path</Text>
                  <Text className="text-gray-500 text-[10px] mt-1 leading-4" numberOfLines={2}>Get detailed Kundli analysis and daily guidance from Guru AI.</Text>
                </View>
                <View className="w-14 h-14 bg-primary/10 rounded-2xl items-center justify-center">
                  <Sparkles size={28} color="#FF4D00" />
                </View>
              </View>
              
              <View className="mt-4 flex-row items-center">
                <Text className="text-primary font-bold uppercase text-[9px] tracking-widest mr-1">Check Astrology</Text>
                <ChevronRight size={12} color="#FF4D00" />
              </View>
            </TouchableOpacity>
         </View>

        {/* Promo Bar */}
        <View className="px-6 mt-4">
           <TouchableOpacity className="bg-primary/5 rounded-[32px] p-6 border border-primary/10 flex-row items-center justify-between">
              <View>
                 <Text className="text-primary text-lg font-bold">All for Rupees ₹1 only</Text>
                 <Text className="text-gray-500 text-xs mt-0.5">Limited time divine offers</Text>
              </View>
              <View className="w-10 h-10 bg-primary rounded-full items-center justify-center shadow-lg shadow-primary/30">
                 <ChevronRight size={20} color="white" />
              </View>
           </TouchableOpacity>
        </View>

        {/* Upcoming Puja Carousel (5:3 Ratio) */}
        <View className="mt-10">
          <View className="px-6 flex-row justify-between items-end mb-4">
             <View>
                <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Upcoming</Text>
                <Text className="text-gray-900 text-2xl font-bold">Divine Puja</Text>
             </View>
             <TouchableOpacity>
                <Text className="text-primary font-bold text-xs">View All</Text>
             </TouchableOpacity>
          </View>

          <FlatList
            data={upcomingPujas}
            horizontal
            loading={loading}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={{ width: width * 0.8 }} 
                className="mr-5 bg-white rounded-[40px] shadow-xl shadow-black/5 border border-orange-50 overflow-hidden"
              >
                {/* 5:3 Aspect Ratio Image Container */}
                <View style={{ width: '100%', aspectRatio: 5/3 }} className="relative bg-gray-100">
                   <Image 
                      source={{ uri: item.image_url || 'https://via.placeholder.com/500x300?text=Puja' }} 
                      className="w-full h-full"
                      resizeMode="cover"
                   />
                   {/* Badges */}
                   <View className="absolute top-4 left-4 bg-black/40 px-3 py-1.5 rounded-full border border-white/30">
                      <Text className="text-white text-[10px] font-bold uppercase">{item.seats} Seats Left</Text>
                   </View>
                   <TouchableOpacity className="absolute top-4 right-4 w-9 h-9 bg-white/80 rounded-full items-center justify-center border border-white shadow-sm">
                      <Heart size={18} color="#FF4D00" />
                   </TouchableOpacity>
                </View>

                {/* Card Details */}
                <View className="p-6">
                   <Text className="text-[#1A1A1A] text-xl font-bold leading-tight">{item.name}</Text>
                   
                   <View className="mt-3 space-y-2">
                      <View className="flex-row items-center">
                         <MapPin size={14} color="#FF4D00" />
                         <Text className="text-gray-500 text-xs ml-2 font-medium">{item.location}</Text>
                      </View>
                      <View className="flex-row items-center">
                         <Calendar size={14} color="#FF4D00" />
                         <Text className="text-gray-500 text-xs ml-2 font-medium">{item.date}</Text>
                      </View>
                   </View>

                   <View className="mt-6 flex-row items-center justify-between border-t border-gray-50 pt-5">
                      <View className="flex-row items-center">
                         <View className="flex-row -space-x-2 mr-2">
                            {[1,2,3].map(i => (
                              <View key={i} className="w-6 h-6 rounded-full bg-orange-100 border-2 border-white" />
                            ))}
                         </View>
                         <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">Trusted by {item.trustedBy}</Text>
                      </View>
                      <TouchableOpacity className="bg-primary px-5 py-2.5 rounded-2xl shadow-lg shadow-primary/20">
                         <Text className="text-white font-bold text-xs uppercase">Book Now</Text>
                      </TouchableOpacity>
                   </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Divine Solutions Section - Live Mapping */}
        <View className="mt-10">
          <View className="px-6 flex-row justify-between items-center mb-5">
            <View>
              <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Divine Solutions</Text>
              <Text className="text-gray-900 text-2xl font-bold">Life Problem Rituals</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/puja')}>
               <Text className="text-primary text-xs font-bold">View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
            {upcomingPujas.filter(p => p.is_offer_999).map((item) => (
              <TouchableOpacity key={item.id} className="mr-4 bg-white p-5 rounded-[32px] border border-orange-50 shadow-sm items-center w-40">
                <View className="bg-orange-50 w-16 h-16 rounded-2xl items-center justify-center mb-3">
                   <Image source={{ uri: item.image_url }} className="w-full h-full rounded-2xl" />
                </View>
                <Text className="text-gray-900 font-bold text-[10px] text-center">{item.name}</Text>
                <Text className="text-orange-500 text-[8px] font-black mt-1 uppercase">Remedy</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Divine Shop Section - Live Products */}
        <View className="mt-10 mb-10">
          <View className="px-6 flex-row justify-between items-center mb-5">
            <Text className="text-gray-900 text-2xl font-bold">Divine Shop</Text>
            <TouchableOpacity className="flex-row items-center">
               <ShoppingBag size={14} color="#FF4D00" />
               <Text className="text-primary text-xs font-bold ml-2">All Products</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
            {products.map((item) => (
              <TouchableOpacity key={item.id} className="mr-4 bg-white p-5 rounded-[32px] border border-orange-50 shadow-sm items-center w-36">
                <View className="w-16 h-16 bg-gray-50 rounded-2xl items-center justify-center mb-3 overflow-hidden">
                  <Image source={{ uri: item.image_url || 'https://via.placeholder.com/200' }} className="w-full h-full" resizeMode="contain" />
                </View>
                <Text className="text-gray-700 font-bold text-[10px] text-center line-clamp-1">{item.name}</Text>
                <Text className="text-primary text-[10px] font-extrabold mt-1">₹{item.price || item.mrp}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Live Spiritual Locations Section - Yatra */}
        {destinations.length > 0 && (
          <View className="mt-6 mb-16 px-6">
            <View className="flex-row justify-between items-center mb-6">
               <Text className="text-gray-900 text-2xl font-bold">Spiritual Yatra</Text>
               <MapPin size={20} color="#FF4D00" />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
               {destinations.map((dest) => (
                 <TouchableOpacity key={dest.id} className="mr-6 items-center">
                    <View className="w-20 h-20 rounded-full border-2 border-primary/20 p-1">
                       <Image source={{ uri: dest.image_url }} className="w-full h-full rounded-full" />
                    </View>
                    <Text className="text-gray-900 text-[10px] font-bold mt-2 uppercase tracking-tighter">{dest.name}</Text>
                 </TouchableOpacity>
               ))}
            </ScrollView>
          </View>
        )}

        {/* Testimonials Footer */}
        <View className="bg-gray-50 pt-12 pb-24 rounded-t-[60px] border-t border-gray-100">
           <View className="items-center mb-8 px-10">
              <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Social Proof</Text>
              <Text className="text-gray-900 text-2xl font-bold text-center">Trusted by 10 Lakh+ Devotees</Text>
           </View>

           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
              {TESTIMONIALS.map((item) => (
                <View key={item.id} className="mr-5 bg-white p-8 rounded-[40px] w-72 shadow-sm border border-gray-100">
                   <View className="flex-row mb-3">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={14} fill={i <= item.rating ? "#FFD700" : "none"} color="#FFD700" />
                      ))}
                   </View>
                   <Text className="text-gray-600 text-sm italic leading-relaxed">"{item.text}"</Text>
                   <View className="mt-5 flex-row items-center">
                      <View className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center mr-3">
                         <Text className="text-primary font-bold text-xs">{item.user[0]}</Text>
                      </View>
                      <Text className="text-gray-900 font-bold text-xs">{item.user}</Text>
                   </View>
                </View>
              ))}
           </ScrollView>

           <View className="items-center mt-12 mb-6">
              <Image 
                source={require('../../assets/images/icon.png')} 
                className="w-12 h-12 rounded-2xl opacity-20 grayscale"
                resizeMode="contain"
              />
              <Text className="text-gray-400 text-[10px] mt-4 font-bold uppercase tracking-widest">Mantra Puja • Pure Spiritual Guidance</Text>
           </View>
        </View>

        {/* Extra Spacing */}
        <View className="h-20" />
      </ScrollView>

      {/* Floating Widgets Container */}
      <View 
        pointerEvents="box-none"
        style={{ zIndex: 99 }}
        className="absolute inset-x-0 bottom-0 h-64"
      >
        
        {/* Floating Calendar Widget */}
        <TouchableOpacity 
          onPress={() => router.push('/coming-soon')}
          className="absolute left-0 bottom-44 w-12 h-14 bg-white border-y border-r border-primary/20 rounded-r-2xl items-center justify-center shadow-xl shadow-black/10"
          style={{ elevation: 25, zIndex: 100 }}
        >
          <Calendar size={20} color="#FF4D00" />
          <View className="w-1 h-3 bg-primary/20 rounded-full mt-1" />
        </TouchableOpacity>

        {/* Floating AI Pandit Widget (Bottom Right) */}
        <TouchableOpacity 
          onPress={() => {
            console.log('Chat button pressed');
            router.push('/chat');
          }}
          activeOpacity={0.7}
          className="absolute right-4 bottom-24 w-24 h-24 items-center justify-center"
          style={{ elevation: 30, zIndex: 101 }}
        >
          <View className="absolute inset-0 bg-primary/20 rounded-full scale-110" />
          <View className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-2xl border-2 border-primary" style={{ overflow: 'hidden' }}>
             <Image 
                source={require('../../assets/images/3d_pandit.jpg')} 
                className="w-16 h-16 rounded-full"
                resizeMode="contain"
             />
          </View>
          <View className="absolute -top-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white" />
        </TouchableOpacity>
      </View>

    </View>
  );
}
