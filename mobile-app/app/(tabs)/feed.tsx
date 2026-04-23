import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Share, ActivityIndicator, RefreshControl } from 'react-native';
import { Heart, MessageCircle, Share2, MoreHorizontal, Sparkles, Play } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../lib/supabase';

export default function FeedScreen() {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReels = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('reels')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setReels(data || []);
    } catch (err) {
      console.error('[Feed] Fetch Error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchReels();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchReels();
  };

  const handleShare = async (reel: any) => {
    try {
      await Share.share({
        message: `${reel.title}\n\nDekhiye ye divya video: ${reel.video_url}\n\nShared via Mantra Puja App`,
      });
    } catch (error) {
      console.error('Share Error:', error);
    }
  };

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="pt-14 pb-4 px-6 bg-white border-b border-gray-50 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-gray-900">Divine <Text className="text-primary">Feed</Text></Text>
          <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Spiritual Vichaar & Reels</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center">
          <Sparkles size={20} color="#FF4D00" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FF4D00" />
          <Text className="text-gray-400 mt-4 font-medium">Loading divine content...</Text>
        </View>
      ) : (
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          className="flex-1 px-4 pt-4"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FF4D00']} />
          }
        >
          {reels.length > 0 ? (
            reels.map((post) => (
              <View key={post.id} className="bg-white rounded-[32px] mb-6 shadow-sm border border-gray-100 overflow-hidden">
                {/* Author Info (Dynamic or Default) */}
                <View className="p-4 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 items-center justify-center overflow-hidden">
                       <Image 
                          source={require('../../assets/images/logo.png')} 
                          className="w-6 h-6 opacity-60" 
                          resizeMode="contain"
                       />
                    </View>
                    <View className="ml-3">
                      <Text className="font-bold text-gray-900">{post.category || 'Mantra Puja'}</Text>
                      <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <MoreHorizontal size={20} color="#94A3B8" />
                  </TouchableOpacity>
                </View>

                {/* Content Text */}
                <View className="px-5 pb-4">
                  <Text className="text-gray-900 font-bold text-lg leading-tight mb-1">{post.title_hi || post.title}</Text>
                  {post.title_hi && <Text className="text-gray-500 text-xs italic">{post.title}</Text>}
                </View>

                {/* Video/Image Container */}
                <TouchableOpacity 
                   activeOpacity={0.9}
                   className="w-full aspect-[4/5] bg-gray-900 relative"
                >
                   <Image 
                      source={{ uri: post.thumbnail_url || 'https://via.placeholder.com/1080x1350?text=Spiritual+Content' }} 
                      className="w-full h-full" 
                      resizeMode="cover" 
                   />
                   <View className="absolute inset-0 items-center justify-center bg-black/10">
                      <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center border border-white/30 backdrop-blur-md">
                         <Play size={32} color="white" fill="white" />
                      </View>
                   </View>
                   
                   {/* Reel Badge */}
                   <View className="absolute bottom-4 left-4 bg-black/40 px-3 py-1.5 rounded-full border border-white/20">
                      <Text className="text-white text-[10px] font-black uppercase tracking-widest">Spiritual Reel</Text>
                   </View>
                </TouchableOpacity>

                {/* Actions */}
                <View className="p-5 flex-row items-center justify-between bg-white">
                  <View className="flex-row items-center space-x-6">
                     <TouchableOpacity className="flex-row items-center">
                        <Heart size={22} color="#94A3B8" />
                        <Text className="ml-2 text-xs font-bold text-gray-500">Divine</Text>
                     </TouchableOpacity>
                     <TouchableOpacity className="flex-row items-center">
                        <MessageCircle size={22} color="#94A3B8" />
                        <Text className="ml-2 text-xs font-bold text-gray-500">Pranam</Text>
                     </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => handleShare(post)}>
                     <Share2 size={22} color="#94A3B8" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-20">
               <Sparkles size={48} color="#FF4D00" opacity={0.2} />
               <Text className="text-gray-400 mt-4 font-bold text-center px-10 leading-relaxed">Divine content abhi dhyan (meditation) mein hai. Jaldi hi wapas aayenge!</Text>
            </View>
          )}
          <View className="h-32" />
        </ScrollView>
      )}
    </View>
  );
}
