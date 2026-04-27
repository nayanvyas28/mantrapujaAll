import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  ActivityIndicator, 
  StatusBar,
  Share,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  ShoppingBag, 
  Star, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  ShoppingCart
} from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { addToCart, cartCount } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products_99')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!product) return;
    try {
      await Share.share({
        message: `Check out this ${product.name} on Mantra Puja! ${product.description}\n\nShop now: https://mantrapuja.com/shop/${product.id}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#FF4D00" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-10">
        <Info size={48} color="#FF4D00" />
        <Text className="text-gray-900 text-xl font-bold mt-4 text-center">Product Not Found</Text>
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mt-8 bg-primary px-8 py-3 rounded-2xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#FFFDFB]">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Image Section */}
        <View className="relative h-[400px] bg-gray-50">
          <Image 
            source={{ uri: product.image_url || 'https://via.placeholder.com/800' }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'transparent', 'rgba(0,0,0,0.1)']}
            className="absolute inset-0"
          />
          
          {/* Header Actions */}
          <View className="absolute top-12 left-0 right-0 px-6 flex-row justify-between items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full items-center justify-center border border-white/50 shadow-sm"
            >
              <ArrowLeft size={20} color="#1A1A1A" />
            </TouchableOpacity>
            <View className="flex-row space-x-3">
              <TouchableOpacity 
                onPress={handleShare}
                className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full items-center justify-center border border-white/50 shadow-sm"
              >
                <Share2 size={20} color="#1A1A1A" />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => router.push('/shop/cart')}
                className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full items-center justify-center border border-white/50 shadow-sm relative"
              >
                <ShoppingCart size={20} color="#FF4D00" />
                {cartCount > 0 && (
                  <View className="absolute -top-1 -right-1 bg-primary w-4 h-4 rounded-full items-center justify-center">
                    <Text className="text-white text-[8px] font-black">{cartCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="px-6 -mt-10 bg-[#FFFDFB] rounded-t-[40px] pt-10">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-4">
                <View className="flex-row items-center mb-2">
                    <View className="bg-orange-50 px-2 py-1 rounded-md">
                        <Text className="text-primary text-[8px] font-bold uppercase">{product.category || 'Divine'}</Text>
                    </View>
                    <View className="flex-row items-center ml-3">
                        <Star size={10} color="#FFD700" fill="#FFD700" />
                        <Text className="text-gray-900 text-[10px] font-bold ml-1">4.8 (120 Reviews)</Text>
                    </View>
                </View>
                <Text className="text-gray-900 text-3xl font-black leading-tight">{product.name}</Text>
            </View>
            <View className="items-end">
                <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Price</Text>
                <Text className="text-primary text-3xl font-black">₹{product.price}</Text>
            </View>
          </View>

          {/* Highlights */}
          <View className="flex-row justify-between mt-8 p-6 bg-gray-50 rounded-[32px] border border-gray-100">
             <View className="items-center flex-1">
                <ShieldCheck size={20} color="#FF4D00" />
                <Text className="text-gray-900 font-bold text-[10px] mt-2">100% Pure</Text>
             </View>
             <View className="w-[1px] h-10 bg-gray-200 self-center" />
             <View className="items-center flex-1">
                <Zap size={20} color="#FF4D00" />
                <Text className="text-gray-900 font-bold text-[10px] mt-2">Energized</Text>
             </View>
             <View className="w-[1px] h-10 bg-gray-200 self-center" />
             <View className="items-center flex-1">
                <Info size={20} color="#FF4D00" />
                <Text className="text-gray-900 font-bold text-[10px] mt-2">Certified</Text>
             </View>
          </View>

          {/* Description */}
          <View className="mt-10">
            <Text className="text-gray-900 text-xl font-black mb-4">About Product</Text>
            <Text className="text-gray-600 leading-relaxed text-[15px]">
                {product.description || 'Experience the divine presence with our premium spiritual item, meticulously sourced and energized for your sacred rituals and meditation.'}
            </Text>
          </View>

          {/* Vedic Wisdom Section */}
          <View className="mt-10 p-6 bg-orange-50 rounded-[32px] border border-orange-100">
            <View className="flex-row items-center mb-3">
                <Star size={18} color="#FF4D00" />
                <Text className="text-gray-900 font-bold text-base ml-2">Vedic Significance</Text>
            </View>
            <Text className="text-gray-600 text-xs leading-5 italic">
                "According to Vedic traditions, pure samagri creates positive vibrations and purifies the atmosphere, inviting divine energies into your home."
            </Text>
          </View>

        </View>
      </ScrollView>

      {/* Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6 flex-row items-center justify-between">
        <View className="flex-row items-center bg-gray-50 px-4 py-4 rounded-2xl border border-gray-100">
            <Text className="text-gray-900 font-bold text-base mr-3">Qty: 1</Text>
        </View>
        <TouchableOpacity 
          onPress={() => {
            addToCart(product);
            Alert.alert('Success', 'Item added to your divine basket.');
          }}
          className="bg-primary flex-1 ml-4 h-16 rounded-2xl shadow-xl shadow-primary/30 flex-row items-center justify-center"
        >
          <ShoppingCart size={20} color="white" />
          <Text className="text-white font-black text-base ml-3 uppercase tracking-tighter">Add to Basket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
