import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Send, ChevronLeft, MoreVertical, Plus, Star, Gift, Youtube, Instagram, Share2, ExternalLink } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'pandit';
  time: string;
  role?: 'user' | 'model'; // for Gemini format
  actionType?: 'review' | 'referral' | 'youtube' | 'instagram' | 'share';
}

export default function ChatScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [messageCount, setMessageCount] = useState(0);
  const [chat, setChat] = useState<Message[]>([
    { 
      id: '1', 
      text: 'Namaste! Main Pandit Asha hoon. Kaise main aapki sahayata kar sakta hoon?', 
      sender: 'pandit', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: 'model'
    },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMsg: Message = { 
      id: Date.now().toString(), 
      text: message, 
      sender: 'user', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: 'user'
    };

    setChat(prev => [...prev, userMsg]);
    const currentMessage = message;
    setMessage('');
    setLoading(true);

    try {
      // Format history for Gemini Backend
      const history = chat.map(m => ({
        role: m.role || (m.sender === 'user' ? 'user' : 'model'),
        parts: [{ text: m.text }]
      }));

      const response = await api.guruChat({
        message: currentMessage,
        chatHistory: history,
        userId: user?.id,
        sessionId: sessionId,
        language: 'hi' // Defaulting to Hindi as per user preference
      });

      if (response.error && response.error.includes('quota')) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Namaste! Abhi Guruji dhyan (meditation) mein hain aur unki divya urja simit hai. Kripya thodi der baad punah prayas karein. (Guru is currently resting due to high demand. Please try again in few minutes.)',
          sender: 'pandit',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          role: 'model'
        };
        setChat(prev => [...prev, aiMsg]);
        return;
      }

      if (response.text) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: response.text,
          sender: 'pandit',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          role: 'model'
        };
        setChat(prev => [...prev, aiMsg]);
        if (response.sessionId) setSessionId(response.sessionId);
      }
    } catch (error: any) {
      console.error('Chat Error:', error);
      Alert.alert('Guruji is resting', 'Kripya thodi der baad prayas karein. Guruji abhi kisi mahatvapurna puja mein vyast hain. (Guru is busy in a puja, please try again later.)');
    } finally {
      setLoading(false);
      
      // Increment count and show action card after every 5 messages
      const newCount = messageCount + 1;
      setMessageCount(newCount);
      
      if (newCount % 5 === 0) {
        const actionTypes: ('review' | 'referral' | 'youtube' | 'instagram' | 'share')[] = ['review', 'referral', 'youtube', 'instagram', 'share'];
        const currentAction = actionTypes[Math.floor((newCount / 5 - 1) % actionTypes.length)];
        
        setTimeout(() => {
          const actionMsg: Message = {
            id: `action-${Date.now()}`,
            text: '',
            sender: 'pandit',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actionType: currentAction
          };
          setChat(prev => [...prev, actionMsg]);
        }, 1000);
      }
    }
  };

  const renderActionCard = (type: string) => {
    switch (type) {
      case 'review':
        return (
          <View className="bg-amber-50 p-5 rounded-3xl border border-amber-200">
            <View className="flex-row items-center mb-3">
              <Star size={24} color="#D97706" fill="#D97706" />
              <Text className="ml-3 font-black text-amber-900 text-base">App Review</Text>
            </View>
            <Text className="text-amber-800 text-sm mb-4">Guruji's wisdom help you? Please share your experience on Play Store.</Text>
            <TouchableOpacity className="bg-amber-600 py-3 rounded-2xl items-center shadow-md">
              <Text className="text-white font-bold">Rate Us 5 Stars</Text>
            </TouchableOpacity>
          </View>
        );
      case 'referral':
        return (
          <View className="bg-emerald-50 p-5 rounded-3xl border border-emerald-200">
            <View className="flex-row items-center mb-3">
              <Gift size={24} color="#059669" />
              <Text className="ml-3 font-black text-emerald-900 text-base">Refer & Earn</Text>
            </View>
            <Text className="text-emerald-800 text-sm mb-4">Invite your family to join Mantra Puja and earn 100 Puja Coins!</Text>
            <TouchableOpacity onPress={() => router.push('/profile/referral')} className="bg-emerald-600 py-3 rounded-2xl items-center shadow-md">
              <Text className="text-white font-bold">Invite Now</Text>
            </TouchableOpacity>
          </View>
        );
      case 'youtube':
        return (
          <View className="bg-red-50 p-5 rounded-3xl border border-red-200">
            <View className="flex-row items-center mb-3">
              <Youtube size={24} color="#DC2626" />
              <Text className="ml-3 font-black text-red-900 text-base">Subscribe YT</Text>
            </View>
            <Text className="text-red-800 text-sm mb-4">Watch daily darshan and rituals on our YouTube channel.</Text>
            <TouchableOpacity className="bg-red-600 py-3 rounded-2xl items-center shadow-md">
              <Text className="text-white font-bold">Watch Now</Text>
            </TouchableOpacity>
          </View>
        );
      case 'instagram':
        return (
          <View className="bg-purple-50 p-5 rounded-3xl border border-purple-200">
            <View className="flex-row items-center mb-3">
              <Instagram size={24} color="#7C3AED" />
              <Text className="ml-3 font-black text-purple-900 text-base">Follow Us</Text>
            </View>
            <Text className="text-purple-800 text-sm mb-4">Follow us for daily astrology and spiritual motivation.</Text>
            <TouchableOpacity className="bg-purple-600 py-3 rounded-2xl items-center shadow-md">
              <Text className="text-white font-bold">Follow on Instagram</Text>
            </TouchableOpacity>
          </View>
        );
      case 'share':
        return (
          <View className="bg-blue-50 p-5 rounded-3xl border border-blue-200">
            <View className="flex-row items-center mb-3">
              <Share2 size={24} color="#2563EB" />
              <Text className="ml-3 font-black text-blue-900 text-base">Share Story</Text>
            </View>
            <Text className="text-blue-800 text-sm mb-4">Spread the divine energy. Share this app on your story.</Text>
            <TouchableOpacity className="bg-blue-600 py-3 rounded-2xl items-center shadow-md flex-row justify-center">
              <Text className="text-white font-bold mr-2">Share to WhatsApp</Text>
              <ExternalLink size={16} color="white" />
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-[#FFFDFB]"
    >
      <StatusBar style="light" />
      
      {/* Divine Header */}
      <View className="bg-primary pt-12 pb-5 px-4 flex-row items-center shadow-2xl shadow-primary/40 rounded-b-[32px]">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-1">
          <ChevronLeft color="white" size={28} />
        </TouchableOpacity>
        
        <View className="flex-1 flex-row items-center">
          <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center border border-white/30 p-1 shadow-sm">
             <Image 
                source={require('../assets/images/3d_pandit.jpg')} 
                className="w-full h-full"
                resizeMode="contain"
             />
          </View>
          <View className="ml-3">
            <Text className="text-white font-bold text-lg tracking-tight">Asha Pandit ji</Text>
            <View className="flex-row items-center mt-0.5">
              <View className="w-2 h-2 rounded-full bg-green-400 mr-2 shadow-sm shadow-green-400/50" />
              <Text className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Divine Energy</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity className="p-2 opacity-60">
          <MoreVertical color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 px-5 pt-6"
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      >
        {chat.map((msg) => (
          <View 
            key={msg.id} 
            className={`mb-6 ${msg.actionType ? 'w-full' : 'max-w-[85%]'} ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
          >
            {msg.actionType ? (
              <View className="w-full">
                {renderActionCard(msg.actionType)}
              </View>
            ) : (
              <>
                <View 
                  className={`p-4 rounded-[28px] ${
                    msg.sender === 'user' 
                      ? 'bg-primary shadow-lg shadow-primary/20 rounded-tr-none' 
                      : 'bg-white rounded-tl-none shadow-md shadow-black/5 border border-orange-50'
                  }`}
                >
                  <Text className={`text-[15px] leading-relaxed ${msg.sender === 'user' ? 'text-white font-medium' : 'text-gray-800'}`}>
                    {msg.text}
                  </Text>
                </View>
                <Text className={`text-[10px] mt-2 text-gray-400 font-bold uppercase ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </Text>
              </>
            )}
          </View>
        ))}

        {loading && (
          <View className="self-start mb-6 max-w-[85%] animate-pulse">
            <View className="p-4 bg-white rounded-[28px] rounded-tl-none shadow-sm border border-orange-50 flex-row items-center">
               <ActivityIndicator size="small" color="#FF4D00" />
               <Text className="ml-3 text-gray-400 text-xs italic">Guruji is contemplating...</Text>
            </View>
          </View>
        )}
        <View className="h-10" />
      </ScrollView>

      {/* Spiritual Input Bar */}
      <View className="p-4 bg-white shadow-2xl border-t border-gray-50 pb-8">
        <View className="flex-row items-center bg-gray-50/80 rounded-[28px] px-5 py-2 border border-gray-100 h-16 shadow-inner">
          <TouchableOpacity className="p-1">
            <Plus size={24} color="#FF4D00" />
          </TouchableOpacity>
          
          <TextInput
            placeholder="Apne sawal punchein..."
            className="flex-1 mx-2 h-full text-gray-800 text-[15px]"
            value={message}
            onChangeText={setMessage}
            placeholderTextColor="#9CA3AF"
          />
          
          <TouchableOpacity 
            onPress={sendMessage}
            disabled={!message.trim() || loading}
            className={`w-12 h-12 rounded-2xl items-center justify-center shadow-lg ${message.trim() && !loading ? 'bg-primary shadow-primary/20' : 'bg-gray-200 shadow-none'}`}
          >
            {loading ? <ActivityIndicator size="small" color="white" /> : <Send size={20} color="white" />}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
