import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, FlatList, Dimensions, Animated, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Heart, Wallet, Bell, Sparkles, Calendar, ChevronRight, Star, ShoppingBag, MapPin, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

const { width } = Dimensions.get('window');

const TESTIMONIALS = [
  { id: '1', user: 'Rahul S.', text: 'Very detailed Kundli analysis. Highly recommended!', rating: 5 },
  { id: '2', user: 'Priya M.', text: 'The Pandit ji was very knowledgeable. Satisfied.', rating: 5 },
];

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Bhakt';

  // Sidebar Animation
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarTranslateX = useRef(new Animated.Value(-width * 0.8)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const toggleSidebar = (open: boolean) => {
    setIsSidebarOpen(open);
    Animated.parallel([
      Animated.timing(sidebarTranslateX, {
        toValue: open ? 0 : -width * 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: open ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const categories = [
    { id: 'kundli', name: 'Kundli', free: true, icon: '📜', route: '/coming-soon' },
    { id: 'rashifal', name: 'Rashifal', free: false, icon: '♈', route: '/coming-soon' },
    { id: 'shop', name: 'Shop', free: false, icon: '🛍️', route: '/coming-soon' },
  ];

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
  }, [banners, activeBannerIndex, loading]);

  const fetchHomeData = async () => {
    try {
      const [
        { data: pujaData },
        { data: bannerData },
        { data: productData },
        { data: destinationData }
      ] = await Promise.all([
        supabase.from('poojas').select('*').eq('is_active', true).eq('show_on_home', true).order('sort_order', { ascending: false }),
        supabase.from('home_banners').select('*').eq('is_active', true).order('display_order'),
        supabase.from('products_99').select('*').eq('is_active', true).eq('show_on_home', true).order('home_order'),
        supabase.from('destinations').select('*').eq('is_active', true).eq('show_on_home', true).order('home_order')
      ]);
        
      if (pujaData) setUpcomingPujas(pujaData);
      if (bannerData) setBanners(bannerData);
      if (productData) setProducts(productData);
      if (destinationData) setDestinations(destinationData);
    } catch (error) {
      console.error('[Home] Fetch Data Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar barStyle="light-content" backgroundColor="#FF4D00" />
      
      {/* Premium Navbar */}
      <View className="bg-primary pt-12 pb-6 px-6 rounded-b-[40px] shadow-2xl shadow-primary/40">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity 
            onPress={() => toggleSidebar(true)}
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
        <View className="mt-6">
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
        <View className="px-6 mt-8">
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

        {/* Promo Bar */}
        <View className="px-6 mt-10">
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
      <View className="absolute bottom-10 left-6 right-6 flex-row justify-between items-center pointer-events-none">
        
        {/* Floating Calendar Widget (Vertical Left Center - Moved to side in actual app logic, but placing here for completeness) */}
        <TouchableOpacity 
          className="absolute -left-6 bottom-32 w-12 h-14 bg-white border-y border-r border-primary/20 rounded-r-2xl items-center justify-center shadow-xl shadow-black/10 pointer-events-auto"
          style={{ elevation: 15 }}
        >
          <Calendar size={20} color="#FF4D00" />
          <View className="w-1 h-3 bg-primary/20 rounded-full mt-1" />
        </TouchableOpacity>

        {/* Floating AI Pandit Widget (Bottom Right) */}
        <TouchableOpacity 
          onPress={() => router.push('/chat')}
          className="absolute -right-2 bottom-20 w-24 h-24 items-center justify-center pointer-events-auto"
          style={{ elevation: 15 }}
        >
          <View className="absolute inset-0 bg-primary/20 rounded-full scale-110" />
          <View className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-2xl border-2 border-primary">
             <Image 
                source={require('../../assets/images/3d_pandit.jpg')} 
                className="w-16 h-16 rounded-full"
                resizeMode="contain"
             />
          </View>
          <View className="absolute -top-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white" />
        </TouchableOpacity>
      </View>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <View style={StyleSheet.absoluteFill} className="z-50">
          <Animated.View 
            style={{ opacity: backdropOpacity }}
            className="flex-1 bg-black/50"
          >
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={() => toggleSidebar(false)} 
              className="flex-1" 
            />
          </Animated.View>

          <Animated.View 
            style={{ 
              transform: [{ translateX: sidebarTranslateX }],
              width: width * 0.8,
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              backgroundColor: '#FFFFFF',
              borderTopRightRadius: 40,
              borderBottomRightRadius: 40,
              paddingTop: 60,
              paddingHorizontal: 30,
            }}
            className="shadow-2xl"
          >
            {/* Sidebar Header */}
            <View className="items-center mb-10">
              <View className="w-20 h-20 rounded-3xl bg-primary/10 items-center justify-center mb-4 border border-primary/20">
                 <Image 
                   source={require('../../assets/images/logo.png')} 
                   className="w-16 h-16" 
                   resizeMode="contain" 
                 />
              </View>
              <Text className="text-xl font-bold text-gray-900">Mantra Pooja</Text>
              <Text className="text-gray-400 text-xs">Divine Spiritual Haven</Text>
            </View>

            {/* Profile Section & Links */}
            <View className="flex-1">
              {user ? (
                <>
                  <View className="bg-gray-50 p-4 rounded-3xl mb-8 border border-gray-100">
                    <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Logged in as</Text>
                    <Text className="text-gray-900 font-bold text-lg mt-1">{user.user_metadata?.full_name || 'Bhakt ji'}</Text>
                    <Text className="text-gray-400 text-xs">{user.phone || user.email}</Text>
                  </View>

                  <TouchableOpacity className="flex-row items-center py-4 mb-2">
                    <View className="w-10 h-10 rounded-2xl bg-orange-50 items-center justify-center mr-4">
                      <Sparkles size={20} color="#FF4D00" />
                    </View>
                    <Text className="text-gray-700 font-bold text-base">My Bookings</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-row items-center py-4 mb-2">
                    <View className="w-10 h-10 rounded-2xl bg-orange-50 items-center justify-center mr-4">
                      <Wallet size={20} color="#FF4D00" />
                    </View>
                    <Text className="text-gray-700 font-bold text-base">Divine Wallet</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="flex-row items-center py-4 mb-8">
                    <View className="w-10 h-10 rounded-2xl bg-gray-50 items-center justify-center mr-4">
                       <Layout size={20} color="#64748B" />
                    </View>
                    <Text className="text-gray-700 font-bold text-base">Settings</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => {
                      toggleSidebar(false);
                      signOut();
                    }}
                    className="flex-row items-center py-4 border-t border-gray-100"
                  >
                    <Text className="text-red-500 font-bold text-base">Sign Out</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View className="flex-1 justify-center -mt-20">
                  <Text className="text-center text-gray-400 mb-6">Create an account to track your rituals and bookings.</Text>
                  <TouchableOpacity 
                    onPress={() => {
                      toggleSidebar(false);
                      router.push('/(auth)/login');
                    }}
                    className="bg-primary h-14 rounded-2xl items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Text className="text-white font-bold text-lg">Login / Sign Up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Footer */}
            <View className="pb-10 items-center">
              <Text className="text-gray-300 text-[10px] uppercase font-bold tracking-widest">Version 1.0.0</Text>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
}
