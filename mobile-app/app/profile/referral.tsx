import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Share,
  Clipboard,
  Alert,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  Copy, 
  Share2, 
  Users, 
  Gift, 
  Trophy, 
  ArrowRight,
  ShieldCheck,
  Coins
} from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

export default function ReferralScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState('');
  const [stats, setStats] = useState({ totalReferrals: 0, totalEarned: 0 });

  useEffect(() => {
    fetchReferralInfo();
  }, [user]);

  const fetchReferralInfo = async () => {
    if (!user) return;
    try {
      // Get or create referral code from PROFILES table
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('referral_code')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile Fetch Error:', profileError);
      } else if (profileData?.referral_code) {
        setReferralCode(profileData.referral_code);
      } else {
        // Create new code if missing in profile
        const newCode = `MANTRAPUJA${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ referral_code: newCode })
          .eq('id', user.id);
        
        if (!updateError) setReferralCode(newCode);
      }

      // Fetch stats from REFERRALS table
      const { data: referrals, error: refError } = await supabase
        .from('referrals')
        .select('reward_amount')
        .eq('referrer_id', user.id);
      
      if (!refError && referrals) {
        const earned = referrals.reduce((acc, curr) => acc + (curr.reward_amount || 0), 0);
        setStats({ totalReferrals: referrals.length, totalEarned: earned });
      }
    } catch (error) {
      console.error('Referral Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Success', 'Referral code copied to clipboard!');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on Mantra Puja and start your spiritual journey! Use my referral code: ${referralCode} to get 100 Puja Coins instantly. Download now: https://mantrapuja.org/app`,
      });
    } catch (error) {
      console.error('Share Error:', error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#FF4D00" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      {/* Header */}
      <View className="pt-16 pb-6 px-6 bg-white border-b border-gray-50 flex-row items-center justify-between">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center"
        >
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="text-gray-900 font-black text-lg">Refer & Earn</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Banner Section */}
        <View className="px-6 mt-8">
            <LinearGradient
                colors={['#FF4D00', '#FF8C00']}
                className="p-8 rounded-[40px] items-center relative overflow-hidden"
            >
                <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                <Gift size={48} color="white" strokeWidth={1.5} />
                <Text className="text-white text-2xl font-black mt-4 text-center">Give 100 PC, Get 500 PC</Text>
                <Text className="text-white/80 text-xs mt-2 text-center">Share the divine light with your friends and family</Text>
            </LinearGradient>
        </View>

        {/* Code Section */}
        <View className="mx-6 mt-10 p-8 bg-white rounded-[40px] border border-orange-50 shadow-xl shadow-black/5 items-center">
            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">Your Referral Code</Text>
            <View className="flex-row items-center bg-gray-50 px-6 py-4 rounded-3xl border border-dashed border-primary/30 w-full justify-between">
                <Text className="text-primary font-black text-xl tracking-tighter">{referralCode}</Text>
                <TouchableOpacity onPress={copyToClipboard} className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                    <Copy size={20} color="#FF4D00" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                onPress={handleShare}
                className="bg-primary w-full mt-6 py-4 rounded-[20px] flex-row items-center justify-center shadow-lg shadow-primary/30"
            >
                <Share2 size={20} color="white" />
                <Text className="text-white font-bold text-base ml-2 uppercase">Share with Friends</Text>
            </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View className="flex-row px-6 mt-8 gap-4">
            <View className="flex-1 bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm items-center">
                <Users size={24} color="#FF4D00" />
                <Text className="text-gray-900 font-black text-xl mt-2">{stats.totalReferrals}</Text>
                <Text className="text-gray-400 text-[8px] font-bold uppercase">Total Joinees</Text>
            </View>
            <View className="flex-1 bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm items-center">
                <Coins size={24} color="#FF4D00" />
                <Text className="text-gray-900 font-black text-xl mt-2">{stats.totalEarned}</Text>
                <Text className="text-gray-400 text-[8px] font-bold uppercase">Total Coins Earned</Text>
            </View>
        </View>

        {/* How it works */}
        <View className="px-6 mt-12">
            <Text className="text-gray-900 font-black text-xl mb-6">How it works</Text>
            
            <View className="space-y-6">
                {[
                    { icon: <Share2 size={20} color="#FF4D00" />, title: 'Share your code', desc: 'Send your unique referral code to your friends.' },
                    { icon: <ArrowRight size={20} color="#FF4D00" />, title: 'They join Mantra Puja', desc: 'When they sign up using your code, they get 100 Puja Coins.' },
                    { icon: <Trophy size={20} color="#FF4D00" />, title: 'Get Reward', desc: 'When they complete their first puja booking, you get 500 Puja Coins!' }
                ].map((step, i) => (
                    <View key={i} className="flex-row items-start mb-6">
                        <View className="w-10 h-10 bg-orange-50 rounded-2xl items-center justify-center">
                            {step.icon}
                        </View>
                        <View className="flex-1 ml-4">
                            <Text className="text-gray-900 font-bold text-sm">{step.title}</Text>
                            <Text className="text-gray-500 text-xs mt-1">{step.desc}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>

        {/* Trust Seal */}
        <View className="mx-6 mt-10 p-6 bg-gray-50 rounded-[32px] flex-row items-center border border-gray-100">
            <ShieldCheck size={24} color="#94A3B8" />
            <Text className="text-gray-400 text-[10px] ml-4 font-medium flex-1">Rewards are processed within 24 hours of successful ritual completion.</Text>
        </View>
      </ScrollView>
    </View>
  );
}
