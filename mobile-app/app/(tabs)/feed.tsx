import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Share } from 'react-native';
import { Heart, MessageCircle, Share2, MoreHorizontal, Sparkles } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const POSTS = [
  {
    id: '1',
    author: 'Pandit Asha ji',
    time: '2 hours ago',
    text: 'Today is a powerful day for Mahamrityunjaya Mantra. May Lord Shiva bless you with health and longevity. 🙏✨',
    image: 'https://images.unsplash.com/photo-1545063914-a1a6ec821c88?q=80&w=1000&auto=format&fit=crop',
    likes: '1.2K',
    comments: 45
  },
  {
    id: '2',
    author: 'Sunil Vedic',
    time: '5 hours ago',
    text: 'The alignment of Jupiter suggests a great time for starting new ventures this week. Stay positive!',
    image: 'https://images.unsplash.com/photo-1567113379515-6e85ee7c30ab?q=80&w=1000&auto=format&fit=crop',
    likes: '850',
    comments: 21
  }
];

export default function FeedScreen() {
  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="pt-14 pb-4 px-6 bg-white border-b border-gray-50 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-gray-900">Divine <Text className="text-primary">Feed</Text></Text>
        <TouchableOpacity className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center">
          <Sparkles size={20} color="#FF4D00" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4 pt-4">
        {POSTS.map((post) => (
          <View key={post.id} className="bg-white rounded-[32px] mb-6 shadow-sm border border-gray-100 overflow-hidden">
            {/* Author */}
            <View className="p-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 items-center justify-center">
                  <Text className="text-primary font-bold">{post.author[0]}</Text>
                </View>
                <View className="ml-3">
                  <Text className="font-bold text-gray-900">{post.author}</Text>
                  <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{post.time}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <MoreHorizontal size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Content Text */}
            <View className="px-4 pb-3">
              <Text className="text-gray-700 leading-relaxed text-[15px]">{post.text}</Text>
            </View>

            {/* Image */}
            <View className="w-full aspect-video bg-gray-100">
               <Image source={{ uri: post.image }} className="w-full h-full" resizeMode="cover" />
            </View>

            {/* Actions */}
            <View className="p-5 flex-row items-center justify-between bg-white">
              <View className="flex-row items-center space-x-6">
                 <TouchableOpacity className="flex-row items-center">
                    <Heart size={20} color="#94A3B8" />
                    <Text className="ml-2 text-xs font-bold text-gray-500">{post.likes}</Text>
                 </TouchableOpacity>
                 <TouchableOpacity className="flex-row items-center">
                    <MessageCircle size={20} color="#94A3B8" />
                    <Text className="ml-2 text-xs font-bold text-gray-500">{post.comments}</Text>
                 </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => Share.share({ message: post.text })}>
                 <Share2 size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
