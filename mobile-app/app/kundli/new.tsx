import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight,
  Search,
  Users
} from 'lucide-react-native';
import { api } from '../../lib/api';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

export default function NewKundaliScreen() {
    const router = useRouter();
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
            alert('Please fill all required fields');
            return;
        }

        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            // 1. Save to DB if logged in
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

            // 2. Navigate to report
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
            alert('Failed to save Kundali. Please try again.');
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
                {/* Header */}
                <View className="px-6 pt-12 pb-6 flex-row items-center border-b border-gray-100">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <ArrowLeft color="#1E293B" size={24} />
                    </TouchableOpacity>
                    <Text className="text-xl font-black text-gray-900">New Kundali</Text>
                </View>

                <ScrollView className="flex-1 px-6 pt-6" contentContainerStyle={{ paddingBottom: 100 }}>
                    <Text className="text-gray-400 font-bold tracking-widest text-[10px] mb-6 uppercase italic">Enter Sacred Birth Details</Text>

                    {/* Name */}
                    <View className="mb-6">
                        <Text className="text-gray-900 font-bold mb-2 ml-1">Full Name</Text>
                        <View className="bg-gray-50 border border-gray-100 rounded-2xl flex-row items-center px-4 h-14">
                            <User size={20} color="#94A3B8" />
                            <TextInput 
                                className="flex-1 ml-3 text-gray-900 font-medium"
                                placeholder="e.g. Rahul Sharma"
                                value={form.name}
                                onChangeText={(val) => setForm(prev => ({ ...prev, name: val }))}
                            />
                        </View>
                    </View>

                    {/* Birth Date & Time Row */}
                    <View className="flex-row gap-4 mb-6">
                        <View className="flex-1">
                            <Text className="text-gray-900 font-bold mb-2 ml-1">Birth Date</Text>
                            <View className="bg-gray-50 border border-gray-100 rounded-2xl flex-row items-center px-4 h-14">
                                <Calendar size={18} color="#94A3B8" />
                                <TextInput 
                                    className="flex-1 ml-3 text-gray-900 font-medium text-sm"
                                    placeholder="YYYY-MM-DD"
                                    value={form.birthDate}
                                    onChangeText={(val) => setForm(prev => ({ ...prev, birthDate: val }))}
                                />
                            </View>
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-900 font-bold mb-2 ml-1">Birth Time</Text>
                            <View className="bg-gray-50 border border-gray-100 rounded-2xl flex-row items-center px-4 h-14">
                                <Clock size={18} color="#94A3B8" />
                                <TextInput 
                                    className="flex-1 ml-3 text-gray-900 font-medium text-sm"
                                    placeholder="HH:MM (24h)"
                                    value={form.birthTime}
                                    onChangeText={(val) => setForm(prev => ({ ...prev, birthTime: val }))}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Birth Place with Autocomplete */}
                    <View className="mb-6 relative z-50">
                        <Text className="text-gray-900 font-bold mb-2 ml-1">Birth Place</Text>
                        <View className="bg-gray-50 border border-gray-100 rounded-2xl flex-row items-center px-4 h-14">
                            <MapPin size={20} color="#94A3B8" />
                            <TextInput 
                                className="flex-1 ml-3 text-gray-900 font-medium"
                                placeholder="Search City..."
                                value={form.birthPlace}
                                onChangeText={handlePlaceSearch}
                            />
                            {showSuggestions && <ActivityIndicator size="small" color="#FF4D00" />}
                        </View>

                        {/* Suggestions List */}
                        {showSuggestions && suggestions.length > 0 && (
                            <View className="absolute top-24 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                                {suggestions.map((item, index) => (
                                    <TouchableOpacity 
                                        key={index}
                                        onPress={() => selectSuggestion(item)}
                                        className="p-4 border-b border-gray-50 flex-row items-center"
                                    >
                                        <MapPin size={16} color="#CBD5E1" className="mr-3" />
                                        <Text className="text-gray-700 text-sm flex-1" numberOfLines={1}>
                                            {item.properties.name}, {item.properties.city || item.properties.state}, {item.properties.country}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Gender Selection */}
                    <View className="mb-10">
                        <Text className="text-gray-900 font-bold mb-3 ml-1">Gender</Text>
                        <View className="flex-row gap-4">
                            {['male', 'female'].map((g) => (
                                <TouchableOpacity 
                                    key={g}
                                    onPress={() => setForm(prev => ({ ...prev, gender: g }))}
                                    className={`flex-1 h-14 rounded-2xl border items-center justify-center flex-row ${form.gender === g ? 'bg-primary/5 border-primary' : 'bg-gray-50 border-gray-100'}`}
                                >
                                    <View className={`w-4 h-4 rounded-full border mr-3 items-center justify-center ${form.gender === g ? 'border-primary' : 'border-gray-300'}`}>
                                        {form.gender === g && <View className="w-2 h-2 rounded-full bg-primary" />}
                                    </View>
                                    <Text className={`capitalize font-bold ${form.gender === g ? 'text-primary' : 'text-gray-500'}`}>{g}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Generate Button */}
                    <TouchableOpacity 
                        onPress={handleGenerate}
                        disabled={loading}
                        className="bg-primary h-16 rounded-2xl items-center justify-center shadow-lg shadow-primary/30"
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <View className="flex-row items-center">
                                <Text className="text-white font-black text-lg mr-2 uppercase tracking-widest">Reveal Destiny</Text>
                                <ChevronRight color="white" size={20} />
                            </View>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
