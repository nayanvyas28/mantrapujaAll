import React, { useRef, useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, FlatList, Dimensions, Animated, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { useCart } from '../../context/CartContext';
import Skeleton from '../../components/Skeleton';
import { Heart, Wallet, Bell, Star, Calendar, ChevronRight, Star, ShoppingBag, MapPin, Users, Coins, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

import { useLanguage } from '../../context/LanguageContext';

const { width } = Dimensions.get('window');

const TESTIMONIALS = [
  { id: '1', user: 'Rahul S.', text: 'Very detailed Kundli analysis. Highly recommended!', rating: 5 },
  { id: '2', user: 'Priya M.', text: 'The Pandit ji was very knowledgeable. Satisfied.', rating: 5 },
];

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const { toggle } = useSidebar();
  const { language, setLanguage } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || (language === 'hi' ? 'भक्त' : 'Bhakt');

  const [categories, setCategories] = useState<any[]>([]);
  const [upcomingPujas, setUpcomingPujas] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [reels, setReels] = useState<any[]>([]);
  const [balance, setBalance] = useState(0);
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
      // 🚀 Batch 1: High Priority (Visible on top)
      const [
        { data: bannerData },
        { data: categoryData }
      ] = await Promise.all([
        supabase.from('home_banners').select('*').order('display_order'),
        supabase.from('categories').select('*').order('order')
      ]);

      if (bannerData) setBanners(bannerData);
      if (categoryData) setCategories(categoryData);
      
      // Fetch Wallet Balance if user is logged in
      if (user) {
        const { data: walletData } = await supabase
          .from('wallets')
          .select('balance')
          .eq('user_id', user.id)
          .single();
        if (walletData) setBalance(walletData.balance);
      }
      
      // Let the UI show Batch 1 first
      setLoading(false);

      // 🚀 Batch 2: Secondary Priority (Scrollable content)
      const [
        { data: pujaData },
        { data: productData },
        { data: destinationData },
        { data: reelData }
      ] = await Promise.all([
        supabase.from('poojas').select('*').eq('show_on_home', true).order('home_order', { ascending: true }),
        supabase.from('products_99').select('*').eq('is_active', true).eq('show_on_home', true).order('home_order'),
        supabase.from('destinations').select('*').eq('is_active', true).eq('show_on_home', true).order('home_order'),
        supabase.from('reels').select('*').eq('is_active', true).order('order_index', { ascending: false }).limit(6)
      ]);

      if (pujaData) setUpcomingPujas(pujaData);
      if (productData) setProducts(productData);
      if (destinationData) setDestinations(destinationData);
      if (reelData) setReels(reelData);
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
              <Text className="text-white/60 text-[10px] font-bold uppercase tracking-[2px]">{language === 'hi' ? 'नमस्ते,' : 'Namaste,'}</Text>
              <Text className="text-white font-bold text-lg leading-tight">{firstName}<Text className="text-white/60 font-medium"> {language === 'hi' ? 'जी' : 'ji'}</Text></Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row items-center pl-4">
            <TouchableOpacity
              onPress={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="w-9 h-9 bg-white/20 rounded-xl items-center justify-center border border-white/30"
            >
              <Text className="text-white font-black text-[10px]">{language === 'en' ? 'HI' : 'EN'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-9 h-9 bg-white/10 rounded-xl items-center justify-center border border-white/10 ml-3">
              <Heart size={18} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => router.push('/notifications')}
              className="w-9 h-9 bg-white/10 rounded-xl items-center justify-center border border-white/10 ml-3"
            >
              <Bell size={18} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
               onPress={() => router.push('/profile/wallet')}
               className="h-9 px-3 bg-white/20 rounded-xl flex-row items-center justify-center border border-white/30 ml-3"
            >
              <Coins size={16} color="white" />
              <Text className="text-white text-[11px] font-black ml-1.5">{balance.toLocaleString()}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Main Banner Slider - Live Data */}
        <View className="mt-2">
          {loading ? (
            <View className="px-6">
              <Skeleton width="100%" height={150} borderRadius={32} />
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
                    style={{ width: width - 48 }}
                    className="h-36 rounded-[32px] overflow-hidden bg-gray-100"
                  >
                    <Image
                      source={{ uri: item.image_url || 'https://via.placeholder.com/1200x600' }}
                      className="w-full h-full"
                      defaultSource={require('../../assets/images/icon.png')}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <TouchableOpacity
              style={{ width: width - 40 }}
              className="h-44 rounded-[40px] overflow-hidden bg-primary/10 self-center items-center justify-center border border-primary/20"
            >
              <Star size={40} color="#FF4D00" opacity={0.2} />
              <Text className="text-primary font-bold text-lg mt-2">Welcome to Mantra Pooja</Text>
              <Text className="text-primary/60 text-xs">Explore divine rituals and items</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Action Grid */}
        {loading ? (
          <View className="px-6 mt-3 flex-row">
            {[1, 2, 4, 5].map(i => (
              <View key={i} className="mr-5 items-center">
                <Skeleton width={56} height={56} borderRadius={20} />
                <Skeleton width={32} height={8} borderRadius={4} className="mt-1.5" />
              </View>
            ))}
          </View>
        ) : categories && categories.length > 0 ? (
          <View className="px-6 mt-3">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => router.push({ pathname: '/puja', params: { category_id: cat.id } } as any)}
                  className="mr-5 items-center"
                >
                  <View className="w-14 h-14 bg-orange-50 rounded-[20px] items-center justify-center mb-1 border border-orange-100 shadow-sm">
                    <Text className="text-xl">{cat.icon || '🕉️'}</Text>
                  </View>
                  <Text className="text-gray-700 text-[9px] font-bold uppercase tracking-tight">{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : null}

        {/* Astro Guidance Section - Compact Version */}
        <View className="px-6 mt-8">
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/astro')}
            className="bg-white rounded-[32px] p-6 border border-saffron-100 shadow-lg shadow-saffron-200/10 overflow-hidden"
          >
            <LinearGradient
              colors={['#FFF8F0', 'white']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
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
                <Star size={28} color="#FF4D00" />
              </View>
            </View>

            <View className="mt-4 flex-row items-center">
              <Text className="text-primary font-bold uppercase text-[9px] tracking-widest mr-1">Check Astrology</Text>
              <ChevronRight size={12} color="#FF4D00" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Promo Bar */}
        <View className="px-6 mt-6">
          <TouchableOpacity 
            onPress={() => router.push('/puja')}
            className="bg-primary/5 rounded-[32px] p-6 border border-primary/10 flex-row items-center justify-between"
          >
            <View>
              <Text className="text-primary text-lg font-bold">Special Divine Offers</Text>
              <Text className="text-gray-500 text-xs mt-0.5">Explore curated rituals for your growth</Text>
            </View>
            <View className="w-10 h-10 bg-primary rounded-full items-center justify-center shadow-lg shadow-primary/30">
              <ChevronRight size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Upcoming Puja Carousel (5:3 Ratio) */}
        {upcomingPujas.length > 0 && (
          <View className="mt-10">
            <View className="px-6 flex-row justify-between items-end mb-4">
              <View>
                <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{language === 'hi' ? 'आगामी' : 'Upcoming'}</Text>
                <Text className="text-gray-900 text-2xl font-bold">{language === 'hi' ? 'दिव्य पूजा' : 'Divine Puja'}</Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/puja')}>
                <Text className="text-primary font-bold text-xs">{language === 'hi' ? 'सभी देखें' : 'View All'}</Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <View className="px-6 flex-row">
                {[1, 2].map(i => (
                  <View key={i} style={{ width: width * 0.6 }} className="mr-4">
                    <Skeleton width="100%" height={140} borderRadius={24} />
                    <Skeleton width="90%" height={12} borderRadius={4} className="mt-3" />
                  </View>
                ))}
              </View>
            ) : upcomingPujas.length > 0 ? (
              <FlatList
                data={upcomingPujas}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 10 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => router.push(`/puja/${item.slug}` as any)}
                    style={{ width: width * 0.6 }}
                    className="mr-4 bg-white rounded-[24px] shadow-sm border border-orange-50 overflow-hidden"
                  >
                    <View style={{ width: '100%', aspectRatio: 5 / 3 }} className="relative bg-gray-100">
                      <Image
                        source={{ uri: item.image_url || 'https://via.placeholder.com/500x300' }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                      <View className="absolute top-4 left-4 bg-black/40 px-3 py-1.5 rounded-full border border-white/30">
                        <Text className="text-white text-[10px] font-bold uppercase tracking-tighter">Recommended</Text>
                      </View>
                      <TouchableOpacity className="absolute top-4 right-4 w-9 h-9 bg-white/80 rounded-full items-center justify-center border border-white shadow-sm">
                        <Heart size={18} color="#FF4D00" />
                      </TouchableOpacity>
                    </View>

                    <View className="p-4">
                      <Text className="text-[#1A1A1A] text-xl font-bold leading-tight" numberOfLines={1}>{item.name}</Text>
                      <Text className="text-gray-500 text-[10px] mt-1 font-medium italic" numberOfLines={1}>{item.tagline || 'Experience sacred traditions'}</Text>

                      <View className="mt-4 flex-row items-center justify-between border-t border-gray-50 pt-4">
                        <View>
                           <Text className="text-gray-400 text-[8px] font-bold uppercase tracking-widest">Starting from</Text>
                           <Text className="text-primary font-black text-lg">₹{item.price || '501'}</Text>
                        </View>
                        <TouchableOpacity 
                          onPress={() => router.push(`/puja/${item.slug}` as any)}
                          className="bg-primary px-5 py-2.5 rounded-2xl shadow-lg shadow-primary/20"
                        >
                          <Text className="text-white font-bold text-xs uppercase">Book Now</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View className="h-44 items-center justify-center">
                 <ActivityIndicator size="small" color="#FF4D00" />
                 <Text className="text-gray-400 text-[10px] font-bold uppercase mt-2 tracking-widest">Finding Rituals...</Text>
              </View>
            )}
          </View>
        )}

        {/* Divine Solutions Section - ₹999 Offers */}
        {upcomingPujas.filter(p => p.is_offer_999).length > 0 && (
          <View className="mt-10">
            <View className="px-6 flex-row justify-between items-center mb-5">
              <View>
                <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{language === 'hi' ? 'दिव्य समाधान' : 'Divine Solutions'}</Text>
                <Text className="text-gray-900 text-2xl font-bold">{language === 'hi' ? 'विशेष पूजा ऑफर' : 'Special Puja Offers'}</Text>
              </View>
              <TouchableOpacity onPress={() => router.push('/puja')}>
                <Text className="text-primary text-xs font-bold">{language === 'hi' ? 'सभी देखें' : 'View All'}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
              {upcomingPujas.filter(p => p.is_offer_999).map((item) => (
                <TouchableOpacity 
                   key={item.id} 
                   onPress={() => router.push(`/puja/${item.slug}` as any)}
                   className="mr-4 bg-white p-5 rounded-[32px] border border-orange-50 shadow-sm items-center w-40"
                >
                  <View className="bg-orange-50 w-16 h-16 rounded-2xl items-center justify-center mb-3 overflow-hidden">
                    <Image source={{ uri: item.image_url }} className="w-full h-full rounded-2xl" resizeMode="cover" />
                  </View>
                  <Text className="text-gray-900 font-bold text-[10px] text-center" numberOfLines={2}>{item.name}</Text>
                  <Text className="text-orange-500 text-[8px] font-black mt-1 uppercase">₹999 Only</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Divine Shop Section - Premium Live Products */}
        {loading ? (
          <View className="mt-6 mb-6">
            <View className="px-6 flex-row justify-between items-center mb-6">
                <View>
                    <Skeleton width={80} height={10} borderRadius={4} className="mb-2" />
                    <Skeleton width={120} height={20} borderRadius={6} />
                </View>
            </View>
            <View className="px-6 flex-row">
                {[1, 2, 3].map(i => (
                    <View key={i} className="mr-4 w-32">
                        <Skeleton width="100%" height={120} borderRadius={24} />
                        <Skeleton width="80%" height={10} borderRadius={4} className="mt-2" />
                    </View>
                ))}
            </View>
          </View>
        ) : products.length > 0 && (
          <View className="mt-6 mb-6">
            <View className="px-6 flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{language === 'hi' ? 'शुद्ध सामग्री' : 'Pure Samagri'}</Text>
                <Text className="text-gray-900 text-xl font-bold">{language === 'hi' ? 'दिव्य दुकान' : 'Divine Shop'}</Text>
              </View>
              <TouchableOpacity 
                onPress={() => router.push('/shop')} 
                className="bg-orange-50 px-3 py-1.5 rounded-xl flex-row items-center border border-orange-100"
              >
                <ShoppingBag size={12} color="#FF4D00" />
                <Text className="text-primary text-[10px] font-black ml-1.5 uppercase tracking-tighter">{language === 'hi' ? 'सभी देखें' : 'View All'}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 5 }}
            >
              {products.map((item) => (
                <TouchableOpacity 
                   key={item.id} 
                   onPress={() => router.push(`/shop/${item.id}`)}
                   activeOpacity={0.9}
                   className="mr-4 bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden w-32"
                >
                  <View className="p-2.5">
                    <View className="w-full aspect-square bg-gray-50 rounded-[18px] items-center justify-center overflow-hidden relative">
                      <Image 
                        source={{ uri: item.image_url || 'https://via.placeholder.com/400' }} 
                        className="w-full h-full" 
                        resizeMode="cover" 
                      />
                    </View>
                    
                    <View className="mt-3 px-1 pb-0.5">
                      <Text className="text-gray-900 font-bold text-[10px]" numberOfLines={1}>{item.name}</Text>
                      <View className="flex-row justify-between items-center mt-1.5">
                        <Text className="text-primary font-black text-[12px]">₹{item.price}</Text>
                        <TouchableOpacity 
                          onPress={() => {
                            addToCart(item);
                            Alert.alert('Success', 'Item added to basket.');
                          }}
                          className="w-6 h-6 bg-primary rounded-lg items-center justify-center"
                        >
                          <Plus size={14} color="white" strokeWidth={3} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Live Spiritual Locations Section - Yatra */}
        {loading ? (
          <View className="mt-6 mb-16 px-6">
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Skeleton width={80} height={10} borderRadius={4} className="mb-2" />
                    <Skeleton width={140} height={15} borderRadius={6} />
                </View>
            </View>
            <View className="flex-row">
                <View className="mr-4 w-48">
                    <Skeleton width="100%" height={180} borderRadius={32} />
                </View>
                <View className="w-48">
                    <Skeleton width="100%" height={180} borderRadius={32} />
                </View>
            </View>
          </View>
        ) : destinations.length > 0 && (
          <View className="mt-6 mb-16 px-6">
            <View className="flex-row justify-between items-center mb-4">
               <View>
                  <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Explore Tirth</Text>
                  <Text className="text-gray-900 text-xl font-bold">Spiritual Yatra</Text>
               </View>
               <TouchableOpacity onPress={() => router.push('/yatra')}>
                  <Text className="text-primary font-bold text-[10px] uppercase">View All</Text>
               </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
              {destinations.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  onPress={() => router.push(`/yatra/${item.id}`)}
                  className="mr-4 w-48 bg-white rounded-[32px] shadow-sm border border-gray-50 overflow-hidden"
                >
                  <View className="h-44 relative">
                    <Image 
                      source={{ uri: item.image_url || 'https://via.placeholder.com/600x600' }} 
                      className="w-full h-full" 
                      resizeMode="cover" 
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.6)']}
                      className="absolute inset-0"
                    />
                    <View className="absolute bottom-4 left-4 right-4">
                      <Text className="text-white font-bold text-sm leading-tight">{item.name}</Text>
                    </View>
                  </View>
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
                  {[1, 2, 3, 4, 5].map(i => (
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

        {/* Floating Calendar Widget (Panchang) */}
        <TouchableOpacity
          onPress={() => router.push('/calendar')}
          activeOpacity={0.9}
          className="absolute left-0 bottom-44 w-14 h-16 bg-white border-y border-r border-saffron-200/50 rounded-r-[20px] items-center justify-center shadow-2xl shadow-saffron-500/20"
          style={{ 
            elevation: 25, 
            zIndex: 100,
            shadowColor: '#FF4D00',
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 10
          }}
        >
          <LinearGradient
            colors={['#FFF8F0', 'white']}
            className="absolute inset-0 rounded-r-[20px]"
          />
          <View className="items-center">
            <Calendar size={22} color="#FF4D00" strokeWidth={2.5} />
            <View className="w-6 h-1 bg-saffron-500/20 rounded-full mt-1.5" />
          </View>
          {/* Notification dot for upcoming festivals */}
          <View className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full border border-white" />
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
