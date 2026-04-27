import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  ActivityIndicator, 
  Alert,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Wallet as WalletIcon,
  Star
} from 'lucide-react-native';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function CartScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');

  const handleCheckout = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login to place an order.');
      return;
    }

    if (cart.length === 0) return;

    if (!address.trim()) {
      Alert.alert('Address Missing', 'Please enter your delivery address.');
      return;
    }

    try {
      setLoading(true);
      
      // Since we don't have a formal product_orders table yet, we'll simulate the process.
      // In a real app, you would:
      // 1. Create an entry in orders table
      // 2. Create entries in order_items table
      // 3. Deduct from wallet if applicable
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Order Placed!', 
        'Your sacred items are on their way. You will receive a notification shortly.',
        [{ text: 'Jai Mata Di', onPress: () => {
          clearCart();
          router.push('/(tabs)');
        }}]
      );

    } catch (error) {
      console.error('Checkout Error:', error);
      Alert.alert('Error', 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  const CartItem = ({ item }: { item: any }) => (
    <View className="bg-white rounded-[32px] p-4 mb-4 border border-gray-100 shadow-sm flex-row items-center">
      <View className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden mr-4">
        <Image source={{ uri: item.image_url || 'https://via.placeholder.com/200' }} className="w-full h-full" resizeMode="cover" />
      </View>
      
      <View className="flex-1">
        <Text className="text-gray-900 font-bold text-sm" numberOfLines={1}>{item.name}</Text>
        <Text className="text-primary font-black text-base mt-1">₹{item.price}</Text>
        
        <View className="flex-row items-center mt-3">
          <TouchableOpacity 
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center border border-gray-100"
          >
            <Minus size={14} color="#1A1A1A" />
          </TouchableOpacity>
          <Text className="mx-4 font-bold text-gray-900">{item.quantity}</Text>
          <TouchableOpacity 
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center border border-gray-100"
          >
            <Plus size={14} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        onPress={() => removeFromCart(item.id)}
        className="w-10 h-10 bg-red-50 rounded-xl items-center justify-center ml-2"
      >
        <Trash2 size={18} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-[#FDFCFB]">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="pt-14 pb-4 px-6 bg-white border-b border-gray-50 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2">
          <ChevronLeft color="#1A1A1A" size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 ml-2">Divine <Text className="text-primary">Basket</Text></Text>
      </View>

      <ScrollView 
        className="flex-1 px-6 pt-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        {cart.length > 0 ? (
          <>
            <View className="mb-8">
              {cart.map(item => <CartItem key={item.id} item={item} />)}
            </View>

            {/* Delivery Address */}
            <View className="mb-10">
                <Text className="text-gray-900 text-lg font-black mb-4">Delivery Address</Text>
                <View className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                    <TextInput 
                        className="bg-gray-50 p-4 rounded-2xl text-gray-900 font-bold border border-gray-100"
                        placeholder="Enter full delivery address..."
                        multiline
                        numberOfLines={3}
                        value={address}
                        onChangeText={setAddress}
                        textAlignVertical="top"
                    />
                    <View className="mt-4 flex-row items-center">
                        <ShieldCheck size={14} color="#22C55E" />
                        <Text className="text-green-600 text-[10px] font-bold ml-2">Safe & Touchless Delivery Guaranteed</Text>
                    </View>
                </View>
            </View>

            {/* Order Summary */}
            <View className="bg-gray-900 p-8 rounded-[40px] shadow-2xl shadow-black/20 mb-10">
                <Text className="text-white/50 text-[10px] font-black uppercase tracking-[2px] mb-6">Order Summary</Text>
                
                <View className="flex-row justify-between mb-4">
                    <Text className="text-white/70 text-sm">Subtotal</Text>
                    <Text className="text-white font-bold text-sm">₹{cartTotal}</Text>
                </View>
                
                <View className="flex-row justify-between mb-4">
                    <Text className="text-white/70 text-sm">Shipping</Text>
                    <Text className="text-green-400 font-bold text-sm uppercase">Free</Text>
                </View>

                <View className="h-[1px] bg-white/10 my-4" />

                <View className="flex-row justify-between items-center">
                    <Text className="text-white text-lg font-black uppercase">Total Payable</Text>
                    <Text className="text-primary text-2xl font-black">₹{cartTotal}</Text>
                </View>
            </View>
          </>
        ) : (
          <View className="py-20 items-center justify-center">
            <View className="w-24 h-24 bg-orange-50 rounded-[40px] items-center justify-center mb-6">
                <ShoppingBag size={48} color="#FF4D00" opacity={0.2} />
            </View>
            <Text className="text-gray-900 font-bold text-xl text-center mb-2">Your basket is empty</Text>
            <Text className="text-gray-500 text-sm text-center px-10">Add sacred items and puja samagri to start your spiritual journey.</Text>
            <TouchableOpacity 
                onPress={() => router.push('/shop')}
                className="mt-10 bg-primary px-8 py-4 rounded-3xl shadow-xl shadow-primary/30"
            >
                <Text className="text-white font-black uppercase tracking-widest text-xs">Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Sticky Action */}
      {cart.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6">
            <TouchableOpacity 
                onPress={handleCheckout}
                disabled={loading}
                className={`h-16 rounded-2xl flex-row items-center justify-center shadow-xl ${loading ? 'bg-gray-400' : 'bg-primary shadow-primary/30'}`}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <>
                        <Text className="text-white font-black text-lg mr-2 uppercase tracking-tighter">Place Order</Text>
                        <ArrowRight size={20} color="white" />
                    </>
                )}
            </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
