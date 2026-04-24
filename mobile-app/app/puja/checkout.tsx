import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator, 
  Alert,
  Dimensions,
  Image
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  CreditCard, 
  User, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  Wallet as WalletIcon,
  Plus
} from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function CheckoutScreen() {
  const { slug, pkg } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [puja, setPuja] = useState<any>(null);
  const [selectedPkg, setSelectedPkg] = useState<any>(null);
  const [balance, setBalance] = useState(0);
  const [sankalpName, setSankalpName] = useState('');
  const [gotra, setGotra] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, [slug, user]);

  const fetchInitialData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      
      // Fetch Puja
      const { data: pujaData, error: pujaError } = await supabase
        .from('poojas')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (pujaError) throw pujaError;
      setPuja(pujaData);
      
      if (pujaData.packages && pkg !== undefined) {
        setSelectedPkg(pujaData.packages[parseInt(pkg as string)]);
      }

      // Fetch Wallet
      const { data: walletData } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', user.id)
        .single();
      
      if (walletData) setBalance(walletData.balance);
      
      // Pre-fill sankalp name if user profile exists
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      if (profileData?.full_name) setSankalpName(profileData.full_name);

    } catch (error) {
      console.error('Checkout Error:', error);
      Alert.alert('Error', 'Failed to load checkout details.');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!sankalpName.trim()) {
      Alert.alert('Details Missing', 'Please enter a name for the Sankalp.');
      return;
    }

    const price = selectedPkg?.price || puja?.price || 0;
    
    if (balance < price) {
      Alert.alert(
        'Insufficient Balance', 
        `Your wallet balance (₹${balance}) is less than the required amount (₹${price}).`,
        [
          { text: 'Add Money', onPress: () => router.push('/profile/wallet') },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
      return;
    }

    try {
      setBookingLoading(true);

      // 1. Create Booking
      const { data: booking, error: bookingError } = await supabase
        .from('puja_bookings')
        .insert({
          user_id: user?.id,
          sankalp_name: sankalpName,
          puja_name: puja.name,
          puja_slug: puja.slug,
          package_name: selectedPkg?.name || 'Standard Package',
          price: price,
          status: 'pending'
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // 2. Deduct Balance
      const { error: walletError } = await supabase
        .from('wallets')
        .update({ balance: balance - price })
        .eq('user_id', user?.id);

      if (walletError) throw walletError;

      // 3. Record Transaction
      const { data: walletData } = await supabase.from('wallets').select('id').eq('user_id', user?.id).single();
      if (walletData) {
          await supabase.from('wallet_transactions').insert({
            wallet_id: walletData.id,
            amount: price,
            type: 'debit',
            title: `Puja Booking: ${puja.name}`,
            status: 'completed'
          });
      }

      Alert.alert(
        'Jai Mata Di!', 
        'Your puja has been booked successfully. Our team will contact you shortly.',
        [{ text: 'View My Bookings', onPress: () => router.push('/profile/bookings') }]
      );

    } catch (error: any) {
      console.error('Booking Finalization Error:', error);
      Alert.alert('Booking Failed', error.message || 'Something went wrong.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#FF4D00" />
      </View>
    );
  }

  const totalPrice = selectedPkg?.price || puja?.price || 0;

  return (
    <View className="flex-1 bg-[#FDFCFB]">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="pt-14 pb-4 px-6 bg-white border-b border-gray-50 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2">
          <ChevronLeft color="#1A1A1A" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 ml-2">Ritual <Text className="text-primary">Checkout</Text></Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Puja Summary Card */}
        <View className="m-6 bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex-row items-center">
            <View className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden mr-4">
                <Image source={{ uri: puja?.image_url }} className="w-full h-full" resizeMode="cover" />
            </View>
            <View className="flex-1">
                <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">{selectedPkg?.name || 'Vedic Ritual'}</Text>
                <Text className="text-gray-900 font-bold text-lg leading-tight" numberOfLines={2}>{puja?.name}</Text>
                <View className="flex-row items-center mt-2">
                    <Calendar size={12} color="#FF4D00" />
                    <Text className="text-gray-500 text-[10px] ml-1 font-medium">Coming Friday • 10:30 AM</Text>
                </View>
            </View>
        </View>

        {/* Sankalp Details Form */}
        <View className="px-6 mb-10">
            <View className="flex-row items-center mb-6">
                <View className="w-10 h-10 bg-orange-50 rounded-2xl items-center justify-center mr-3">
                    <User size={20} color="#FF4D00" />
                </View>
                <Text className="text-gray-900 text-xl font-black">Sankalp Details</Text>
            </View>

            <View className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">Name for Ritual (Sankalp)</Text>
                <TextInput 
                    className="bg-gray-50 p-4 rounded-2xl text-gray-900 font-bold border border-gray-100"
                    placeholder="Enter full name..."
                    value={sankalpName}
                    onChangeText={setSankalpName}
                />

                <View className="mt-6">
                    <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">Gotra (Optional)</Text>
                    <TextInput 
                        className="bg-gray-50 p-4 rounded-2xl text-gray-900 font-bold border border-gray-100"
                        placeholder="e.g. Kashyap, Bhardwaj..."
                        value={gotra}
                        onChangeText={setGotra}
                    />
                </View>

                <View className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex-row items-center">
                    <Sparkles size={16} color="#3B82F6" />
                    <Text className="text-blue-700 text-[10px] font-bold ml-2 flex-1">Our Pandit ji will take this name during the sacred ritual for personalized blessings.</Text>
                </View>
            </View>
        </View>

        {/* Payment Options */}
        <View className="px-6 mb-10">
            <View className="flex-row items-center mb-6">
                <View className="w-10 h-10 bg-orange-50 rounded-2xl items-center justify-center mr-3">
                    <CreditCard size={20} color="#FF4D00" />
                </View>
                <Text className="text-gray-900 text-xl font-black">Payment Method</Text>
            </View>

            <TouchableOpacity 
                className={`p-6 rounded-[32px] border-2 flex-row items-center justify-between ${balance >= totalPrice ? 'border-primary bg-orange-50/20' : 'border-gray-100 bg-white'}`}
            >
                <View className="flex-row items-center">
                    <View className="w-12 h-12 bg-white rounded-2xl items-center justify-center border border-gray-100 mr-4 shadow-sm">
                        <WalletIcon size={24} color="#FF4D00" />
                    </View>
                    <View>
                        <Text className="text-gray-900 font-bold text-sm">Divine Wallet</Text>
                        <Text className="text-gray-500 text-[10px]">Balance: ₹{balance}</Text>
                    </View>
                </View>
                {balance >= totalPrice ? (
                    <ShieldCheck size={24} color="#FF4D00" />
                ) : (
                    <TouchableOpacity 
                        onPress={() => router.push('/profile/wallet')}
                        className="bg-primary px-3 py-1.5 rounded-lg"
                    >
                        <Text className="text-white text-[8px] font-black uppercase">Add Money</Text>
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View className="px-6 mb-32">
            <View className="bg-gray-900 p-8 rounded-[40px] shadow-2xl shadow-black/20">
                <Text className="text-white/50 text-[10px] font-black uppercase tracking-[2px] mb-6">Order Summary</Text>
                
                <View className="flex-row justify-between mb-4">
                    <Text className="text-white/70 text-sm">Base Price</Text>
                    <Text className="text-white font-bold text-sm">₹{totalPrice}</Text>
                </View>
                
                <View className="flex-row justify-between mb-4">
                    <Text className="text-white/70 text-sm">GST (Included)</Text>
                    <Text className="text-white font-bold text-sm">₹0</Text>
                </View>

                <View className="h-[1px] bg-white/10 my-4" />

                <View className="flex-row justify-between items-center">
                    <Text className="text-white text-lg font-black uppercase">Total Payable</Text>
                    <Text className="text-primary text-2xl font-black">₹{totalPrice}</Text>
                </View>
            </View>
        </View>

      </ScrollView>

      {/* Sticky Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6">
        <TouchableOpacity 
          onPress={handleBooking}
          disabled={bookingLoading}
          className={`h-16 rounded-2xl shadow-xl flex-row items-center justify-center ${bookingLoading ? 'bg-gray-400' : 'bg-primary shadow-primary/30'}`}
        >
          {bookingLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text className="text-white font-black text-lg mr-2 uppercase tracking-tighter">Confirm Booking</Text>
              <Sparkles size={20} color="white" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
