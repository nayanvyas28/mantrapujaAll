import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight,
  Menu,
  Check
} from 'lucide-react-native';
import { api } from '../../lib/api';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';


const CustomInput = ({ label, icon: Icon, value, onChangeText, placeholder, keyboardType = 'default' }: any) => (
    <View className="mb-6">
        <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[3px] mb-2 ml-1">{label}</Text>
        <View className="bg-gray-50 border border-gray-100 rounded-2xl flex-row items-center px-4 h-14">
            <Icon size={18} color="#FF4D00" opacity={0.5} />
            <TextInput 
                className="flex-1 ml-3 text-gray-900 font-bold text-sm"
                placeholder={placeholder}
                placeholderTextColor="#CBD5E1"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
            {value.length > 2 && <Check size={16} color="#22C55E" />}
        </View>
    </View>
);

export default function NewKundaliScreen() {
    const router = useRouter();
    const { toggle } = useSidebar();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        birthDate: '1995-01-01',
        birthTime: '12:00',
        birthPlace: '',
        lat: '19.076',
        lon: '72.8777',
        gender: 'male'
    });

    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handlePlaceSearch = async (query: string) => {
        setForm(prev => ({ ...prev, birthPlace: query }));
        if (query.length < 3) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        try {
            const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`);
            const data = await res.json();
            if (data.features) {
                setSuggestions(data.features);
                setShowSuggestions(true);
            }
        } catch (err) {
            console.error('Search failed:', err);
        }
    };

    const selectSuggestion = (feature: any) => {
        const { name, city, country, state } = feature.properties;
        const [lon, lat] = feature.geometry.coordinates;
        const placeName = [name, city, state, country].filter(Boolean).join(', ');
        
        setForm(prev => ({
            ...prev,
            birthPlace: placeName,
            lat: lat.toString(),
            lon: lon.toString()
        }));
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleGenerate = async () => {
        if (!form.name || !form.birthPlace) {
            Alert.alert('Required', 'Please fill all sacred details to continue.');
            return;
        }

        if (!user) {
            router.push('/(auth)/login');
            return;
        }

        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
                await api.astrology.saveKundali({
                    user_id: user.id,
                    full_name: form.name,
                    date_of_birth: form.birthDate,
                    time_of_birth: form.birthTime,
                    place_of_birth: form.birthPlace,
                    lat: parseFloat(form.lat),
                    lon: parseFloat(form.lon),
                    gender: form.gender
                });
            }

            router.push({
                pathname: '/kundli/report',
                params: { 
                    name: form.name,
                    dob: form.birthDate,
                    tob: form.birthTime,
                    pob: form.birthPlace,
                    lat: form.lat,
                    lon: form.lon,
                    gender: form.gender
                }
            });
        } catch (error) {
            console.error('Generation Error:', error);
            Alert.alert('Celestial Error', 'Failed to synchronize with the stars. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        >
            <View className="flex-1">
                {/* Premium Header */}
                <LinearGradient colors={['#FF4D00', '#FF8C00']} className="px-6 pt-16 pb-12 rounded-b-[50px] shadow-2xl">
                    <View className="flex-row items-center justify-between">
                        <TouchableOpacity 
                            onPress={() => router.back()}
                            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center border border-white/20"
                        >
                            <ArrowLeft color="white" size={24} />
                        </TouchableOpacity>
                        <Text className="text-xl font-black text-white">New Kundali</Text>
                        <TouchableOpacity 
                            onPress={() => toggle(true)}
                            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center border border-white/20"
                        >
                            <Menu color="white" size={20} />
                        </TouchableOpacity>
                    </View>
                    <View className="mt-8 items-center">
                        <Text className="text-white/60 text-[10px] font-black uppercase tracking-[4px]">Birth Chart Generation</Text>
                        <Text className="text-white text-sm mt-1 font-medium italic opacity-80">"Yatha Pinde Tatha Brahmande"</Text>
                    </View>
                </LinearGradient>

                <ScrollView 
                    className="flex-1 px-6 pt-10" 
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <CustomInput 
                        label="Devotee Name" 
                        icon={User} 
                        value={form.name}
                        onChangeText={(val: string) => setForm(prev => ({ ...prev, name: val }))}
                        placeholder="e.g. Rahul Sharma"
                    />

                    <View className="flex-row gap-4">
                        <View className="flex-1">
                            <CustomInput 
                                label="Birth Date" 
                                icon={Calendar} 
                                value={form.birthDate}
                                onChangeText={(val: string) => setForm(prev => ({ ...prev, birthDate: val }))}
                                placeholder="YYYY-MM-DD"
                            />
                        </View>
                        <View className="flex-1">
                            <CustomInput 
                                label="Birth Time" 
                                icon={Clock} 
                                value={form.birthTime}
                                onChangeText={(val: string) => setForm(prev => ({ ...prev, birthTime: val }))}
                                placeholder="HH:MM (24h)"
                            />
                        </View>
                    </View>

                    {/* Birth Place with Autocomplete */}
                    <View className="mb-6 relative z-50">
                        <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[3px] mb-2 ml-1">Birth Location</Text>
                        <View className="bg-gray-50 border border-gray-100 rounded-2xl flex-row items-center px-4 h-14">
                            <MapPin size={18} color="#FF4D00" opacity={0.5} />
                            <TextInput 
                                className="flex-1 ml-3 text-gray-900 font-bold text-sm"
                                placeholder="Search City..."
                                placeholderTextColor="#CBD5E1"
                                value={form.birthPlace}
                                onChangeText={handlePlaceSearch}
                            />
                            {showSuggestions && <ActivityIndicator size="small" color="#FF4D00" />}
                        </View>

                        {/* Suggestions List */}
                        {showSuggestions && suggestions.length > 0 && (
                            <View className="absolute top-24 left-0 right-0 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 overflow-hidden">
                                {suggestions.map((item, index) => (
                                    <TouchableOpacity 
                                        key={index}
                                        onPress={() => selectSuggestion(item)}
                                        className="p-4 border-b border-gray-50 flex-row items-center"
                                    >
                                        <MapPin size={16} color="#CBD5E1" className="mr-3" />
                                        <Text className="text-gray-700 text-sm flex-1 font-medium" numberOfLines={1}>
                                            {item.properties.name}, {item.properties.city || item.properties.state}, {item.properties.country}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Gender Selection */}
                    <View className="mb-10">
                        <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[3px] mb-4 ml-1">Sacred Gender</Text>
                        <View className="flex-row gap-4">
                            {['male', 'female'].map((g) => (
                                <TouchableOpacity 
                                    key={g}
                                    onPress={() => setForm(prev => ({ ...prev, gender: g }))}
                                    className={`flex-1 h-14 rounded-2xl border items-center justify-center flex-row ${form.gender === g ? 'bg-primary/5 border-primary shadow-sm shadow-primary/20' : 'bg-gray-50 border-gray-100'}`}
                                >
                                    <View className={`w-4 h-4 rounded-full border mr-3 items-center justify-center ${form.gender === g ? 'border-primary' : 'border-gray-300'}`}>
                                        {form.gender === g && <View className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                    </View>
                                    <Text className={`capitalize font-black text-xs tracking-widest ${form.gender === g ? 'text-primary' : 'text-gray-400'}`}>{g}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Generate Button */}
                    <TouchableOpacity 
                        onPress={handleGenerate}
                        disabled={loading}
                        className="bg-primary h-16 rounded-[24px] items-center justify-center shadow-2xl shadow-primary/40"
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <View className="flex-row items-center">
                                <Text className="text-white font-black text-lg mr-2 uppercase tracking-[3px]">Reveal Destiny</Text>
                                <ChevronRight color="white" size={20} />
                            </View>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
