import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Dimensions,
  ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Wallet, 
  ChevronLeft, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft,
  History,
  Sparkles,
  Info
} from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function WalletScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchWalletInfo();
  }, [user]);

  const fetchWalletInfo = async () => {
    if (!user) return;
    try {
      // Fetch balance
      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', user.id)
        .single();

      if (walletError && walletError.code !== 'PGRST116') {
        console.error('Wallet Fetch Error:', walletError);
      } else if (walletData) {
        setBalance(walletData.balance);
      } else {
        // First time user? Might need to create wallet row if missing
        await supabase.from('wallets').upsert({ user_id: user.id, balance: 0 });
      }

      // Fetch sample transactions
      setHistory([
        { id: '1', type: 'credit', amount: 500, title: 'Welcome Bonus', date: '12 Apr 2026', status: 'Completed' },
        { id: '2', type: 'debit', amount: 101, title: 'Ganpati Puja Booking', date: '10 Apr 2026', status: 'Completed' },
      ]);
    } catch (error) {
       console.error('Wallet Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const TransactionBar = ({ item }: { item: any }) => (
    <View className="flex-row items-center mb-6 bg-white p-4 rounded-3xl border border-gray-50 shadow-sm">
      <View className={`w-12 h-12 rounded-2xl items-center justify-center ${item.type === 'credit' ? 'bg-green-50' : 'bg-orange-50'}`}>
        {item.type === 'credit' ? <ArrowDownLeft size={20} color="#22C55E" /> : <ArrowUpRight size={20} color="#FF4D00" />}
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-gray-900 font-bold text-sm">{item.title}</Text>
        <Text className="text-gray-400 text-[10px] mt-0.5">{item.date} • {item.status}</Text>
      </View>
      <Text className={`font-black text-base ${item.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
        {item.type === 'credit' ? '+' : '-'} ₹{item.amount}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-[#FDFCFB]">
      {/* Header & Balance Card */}
      <View className="bg-primary pt-16 pb-20 px-6 rounded-b-[60px] shadow-2xl shadow-primary/30">
        <View className="flex-row items-center justify-between mb-10">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center border border-white/20"
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-black text-lg">Divine Wallet</Text>
          <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center border border-white/20">
            <Info size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="items-center">
            <Text className="text-white/60 text-xs font-black uppercase tracking-[3px] mb-2">Available Balance</Text>
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <View className="flex-row items-start">
                    <Text className="text-white text-2xl font-black mt-2 mr-1">₹</Text>
                    <Text className="text-white text-6xl font-black">{balance.toLocaleString()}</Text>
                </View>
            )}
            
            <View className="flex-row items-center mt-6 bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
                <Sparkles size={12} color="white" />
                <Text className="text-white font-bold text-[10px] ml-2 uppercase">100% Secure Divine Credits</Text>
            </View>
        </View>
      </View>

      {/* Action Buttons Layer */}
      <View className="flex-row justify-center -mt-10 px-10 gap-4">
        <TouchableOpacity className="flex-1 bg-white h-20 rounded-3xl items-center justify-center shadow-xl shadow-black/5 border border-gray-50">
            <Plus size={24} color="#FF4D00" />
            <Text className="text-gray-900 font-bold text-[10px] mt-1 uppercase">Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-white h-20 rounded-3xl items-center justify-center shadow-xl shadow-black/5 border border-gray-50">
            <ArrowUpRight size={24} color="#FF4600" />
            <Text className="text-gray-900 font-bold text-[10px] mt-1 uppercase">Withdraw</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 mt-10" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
                <History size={18} color="#64748B" />
                <Text className="text-gray-900 font-black text-lg ml-2">Recent Transactions</Text>
            </View>
            <TouchableOpacity>
                <Text className="text-primary font-bold text-xs">See All</Text>
            </TouchableOpacity>
        </View>

        {loading ? (
            <ActivityIndicator color="#FF4D00" className="mt-10" />
        ) : history.length > 0 ? (
            history.map(item => <TransactionBar key={item.id} item={item} />)
        ) : (
            <View className="py-20 items-center justify-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                <Wallet size={40} color="#CBD5E1" />
                <Text className="text-gray-400 font-bold mt-4">No Transactions Yet</Text>
            </View>
        )}

        <View className="bg-orange-50 p-6 rounded-[32px] mb-10 border border-orange-100">
            <Text className="text-gray-900 font-bold text-base mb-2">Invite and Earn!</Text>
            <Text className="text-gray-500 text-xs leading-5">Share your divine referral code with friends and earn upto ₹500 in your Divine Wallet for every puja they book.</Text>
            <TouchableOpacity className="mt-4 bg-primary px-6 py-3 rounded-2xl self-start">
                <Text className="text-white font-bold text-xs uppercase">Refer Now</Text>
            </TouchableOpacity>
        </View>

        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
