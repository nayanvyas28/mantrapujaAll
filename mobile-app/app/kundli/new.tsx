import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';


const CustomInput = ({ label, icon: Icon, value, onChangeText, placeholder, keyboardType = 'default', onPress, editable = true }: any) => (
    <View className="mb-6">
        <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[3px] mb-2 ml-1">{label}</Text>
        <Pressable 
            onPress={onPress}
            className="bg-gray-50 border border-gray-100 rounded-2xl flex-row items-center px-4 h-14"
        >
            <Icon size={18} color="#FF4D00" opacity={0.5} />
            <TextInput 
                className="flex-1 ml-3 text-gray-900 font-bold text-sm"
                placeholder={placeholder}
                placeholderTextColor="#CBD5E1"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                editable={editable && !onPress}
                pointerEvents={onPress ? 'none' : 'auto'}
            />
            {value.length > 2 && <Check size={16} color="#22C55E" />}
        </Pressable>
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

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

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

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const dateStr = selectedDate.toISOString().split('T')[0];
            setForm(prev => ({ ...prev, birthDate: dateStr }));
        }
    };

    const onTimeChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) {
            const timeStr = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            setForm(prev => ({ ...prev, birthTime: timeStr }));
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
                <LinearGradient 
                    colors={['#FF4D00', '#FF8C00']} 
                    style={{ paddingTop: 64, paddingBottom: 48, paddingHorizontal: 24, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, elevation: 12 }}
                >
                    <View className="flex-row items-center justify-between">
                        <Pressable 
                            onPress={() => router.back()}
                            style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                            <ArrowLeft color="white" size={24} />
                        </Pressable>
                        <Text className="text-xl font-black text-white">New Kundali</Text>
                        <Pressable 
                            onPress={() => toggle(true)}
                            style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                            <Menu color="white" size={20} />
                        </Pressable>
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
                                onPress={() => setShowDatePicker(true)}
                                placeholder="YYYY-MM-DD"
                            />
                        </View>
                        <View className="flex-1">
                            <CustomInput 
                                label="Birth Time" 
                                icon={Clock} 
                                value={form.birthTime}
                                onPress={() => setShowTimePicker(true)}
                                placeholder="HH:MM (24h)"
                            />
                        </View>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date(form.birthDate)}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}

                    {showTimePicker && (
                        <DateTimePicker
                            value={new Date(`1970-01-01T${form.birthTime}:00`)}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onTimeChange}
                        />
                    )}

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
                                    <Pressable 
                                        key={index}
                                        onPress={() => selectSuggestion(item)}
                                        className="p-4 border-b border-gray-50 flex-row items-center"
                                    >
                                        <MapPin size={16} color="#CBD5E1" className="mr-3" />
                                        <Text className="text-gray-700 text-sm flex-1 font-medium" numberOfLines={1}>
                                            {item.properties.name}, {item.properties.city || item.properties.state}, {item.properties.country}
                                        </Text>
                                    </Pressable>
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
                                    style={{ 
                                        flex: 1, 
                                        height: 56, 
                                        borderRadius: 16, 
                                        borderWidth: 1, 
                                        flexDirection: 'row',
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        backgroundColor: form.gender === g ? 'rgba(255, 77, 0, 0.05)' : '#F9FAFB',
                                        borderColor: form.gender === g ? '#FF4D00' : '#F1F5F9'
                                    }}
                                >
                                    <View className={`w-4 h-4 rounded-full border mr-3 items-center justify-center ${form.gender === g ? 'border-primary' : 'border-gray-300'}`}>
                                        {form.gender === g && <View className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                    </View>
                                    <Text style={{ 
                                        textTransform: 'capitalize', 
                                        fontWeight: '900', 
                                        fontSize: 12, 
                                        letterSpacing: 1.2,
                                        color: form.gender === g ? '#FF4D00' : '#94A3B8'
                                    }}>{g}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Generate Button */}
                    <Pressable 
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
                    </Pressable>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
