import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  ActivityIndicator, 
  TextInput,
  RefreshControl,
  FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  ShoppingBag, 
  Search, 
  Filter, 
  Sparkles,
  Plus,
  ShoppingCart,
  ArrowRight
} from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { StatusBar } from 'expo-status-bar';
import Skeleton from '../../components/Skeleton';

const { width } = Dimensions.get('window');

export default function ShopScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const { addToCart, cartCount } = useCart();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('products_99')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setProducts(data || []);

      // Extract unique categories
      const cats = ['All', ...new Set((data || []).map((p: any) => p.category).filter(Boolean))];
      setCategories(cats);

    } catch (error) {
      console.error('[Shop] Fetch Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const ProductCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/shop/${item.id}`)}
      activeOpacity={0.9}
      className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden mb-5 w-[47%]"
    >
      <View className="p-3">
        <View className="w-full aspect-square bg-gray-50 rounded-[24px] items-center justify-center overflow-hidden relative">
          <Image 
            source={{ uri: item.image_url || 'https://via.placeholder.com/400' }} 
            className="w-full h-full" 
            resizeMode="cover" 
          />
          {item.category && (
            <View className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-gray-100">
              <Text className="text-gray-600 text-[8px] font-bold uppercase">{item.category}</Text>
            </View>
          )}
        </View>
        
        <View className="mt-4 px-1 pb-1">
          <Text className="text-gray-900 font-bold text-xs" numberOfLines={1}>{item.name}</Text>
          <View className="flex-row justify-between items-center mt-2">
            <View>
              <Text className="text-gray-400 text-[8px] font-bold uppercase tracking-tighter">Price</Text>
              <Text className="text-primary font-black text-sm">₹{item.price}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => addToCart(item)}
              className="w-9 h-9 bg-primary rounded-xl items-center justify-center shadow-lg shadow-primary/20"
            >
              <Plus size={18} color="white" strokeWidth={3} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#FDFCFB]">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="pt-14 pb-6 px-6 bg-white border-b border-gray-50 flex-row items-center justify-between">
        <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center -ml-2 mr-2">
                <ChevronLeft color="#1A1A1A" size={24} />
            </TouchableOpacity>
            <View>
                <Text className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Vedic Essentials</Text>
                <Text className="text-xl font-bold text-gray-900">Divine <Text className="text-primary">Shop</Text></Text>
            </View>
        </View>
        <TouchableOpacity 
            onPress={() => router.push('/shop/cart')}
            className="w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center border border-gray-100 relative"
        >
            <ShoppingBag size={22} color="#FF4D00" />
            {cartCount > 0 && (
                <View className="absolute -top-1 -right-1 bg-primary w-5 h-5 rounded-full items-center justify-center border-2 border-white">
                    <Text className="text-white text-[8px] font-black">{cartCount}</Text>
                </View>
            )}
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FF4D00']} />}
      >
        {/* Search Bar */}
        <View className="px-6 mt-6">
            <View className="bg-white h-14 rounded-2xl flex-row items-center px-4 border border-gray-100 shadow-sm">
                <Search size={20} color="#94A3B8" />
                <TextInput 
                    placeholder={language === 'hi' ? 'सामग्री खोजें...' : 'Search sacred items...'}
                    className="flex-1 ml-3 text-gray-900 font-medium"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity className="p-2 bg-orange-50 rounded-xl">
                    <Filter size={16} color="#FF4D00" />
                </TouchableOpacity>
            </View>
        </View>

        {/* Categories Scroller */}
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="mt-6 px-6 max-h-12"
        >
            {loading ? (
                [1, 2, 3, 4].map(i => (
                    <Skeleton key={i} width={80} height={36} borderRadius={12} className="mr-3" />
                ))
            ) : categories.map((cat) => (
                <TouchableOpacity 
                    key={cat}
                    onPress={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 mr-3 rounded-xl border ${activeCategory === cat ? 'bg-primary border-primary' : 'bg-white border-gray-100'}`}
                >
                    <Text className={`text-xs font-bold ${activeCategory === cat ? 'text-white' : 'text-gray-500'}`}>{cat}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>

        {/* Featured Banner */}
        <View className="px-6 mt-8">
            <LinearGradient
                colors={['#FF4D00', '#FF8C00']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="p-6 rounded-[32px] overflow-hidden relative"
            >
                <View className="absolute -right-10 -top-10 opacity-20">
                    <Sparkles size={120} color="white" />
                </View>
                <View className="pr-20">
                    <View className="bg-white/20 self-start px-2 py-0.5 rounded-md mb-2">
                        <Text className="text-white text-[8px] font-black uppercase">Pure & Certified</Text>
                    </View>
                    <Text className="text-white text-xl font-black leading-tight">Shubh Samagri Combo</Text>
                    <Text className="text-white/80 text-[10px] mt-1">Get 10% off on complete puja sets</Text>
                    <TouchableOpacity className="bg-white mt-4 px-4 py-2 rounded-xl self-start flex-row items-center">
                        <Text className="text-primary font-black text-[10px] uppercase">Shop Now</Text>
                        <ArrowRight size={12} color="#FF4D00" className="ml-2" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>

        {/* Product Grid */}
        <View className="px-6 mt-8 pb-32">
            <View className="flex-row justify-between items-end mb-6">
                <View>
                    <Text className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Products</Text>
                    <Text className="text-xl font-black text-gray-900">{activeCategory === 'All' ? 'All Samagri' : activeCategory}</Text>
                </View>
                <Text className="text-gray-400 text-[10px] font-bold">{filteredProducts.length} items</Text>
            </View>

            {loading ? (
                <View className="flex-row flex-wrap justify-between">
                    {[1, 2, 3, 4].map(i => (
                        <View key={i} className="mb-5 w-[47%]">
                            <Skeleton width="100%" height={160} borderRadius={32} />
                            <Skeleton width="80%" height={12} borderRadius={4} className="mt-3" />
                            <Skeleton width="40%" height={10} borderRadius={4} className="mt-2" />
                        </View>
                    ))}
                </View>
            ) : filteredProducts.length > 0 ? (
                <View className="flex-row flex-wrap justify-between">
                    {filteredProducts.map(p => <ProductCard key={p.id} item={p} />)}
                </View>
            ) : (
                <View className="py-20 items-center justify-center">
                    <ShoppingBag size={48} color="#CBD5E1" />
                    <Text className="text-gray-400 mt-4 font-bold">No items found</Text>
                </View>
            )}
        </View>
      </ScrollView>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
          <TouchableOpacity 
            onPress={() => router.push('/shop/cart')}
            className="absolute bottom-10 left-6 right-6 h-16 bg-primary rounded-2xl flex-row items-center px-6 shadow-2xl shadow-primary/40"
          >
            <View className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center">
                <ShoppingCart size={20} color="white" />
            </View>
            <View className="flex-1 ml-4">
                <Text className="text-white font-black text-sm">{cartCount} Items in Basket</Text>
                <Text className="text-white/70 text-[10px]">Tap to view cart and checkout</Text>
            </View>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>
      )}
    </View>
  );
}
