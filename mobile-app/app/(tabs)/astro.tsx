import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Sparkles, 
  Plus, 
  ChevronRight, 
  User, 
  History, 
  Star, 
  Compass, 
  Shield, 
  Zap,
  Clock,
  MapPin
} from 'lucide-react-native';
import { api } from '../../lib/api';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';

export default function AstroScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [savedKundalis, setSavedKundalis] = useState<any[]>([]);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    const fetchData = async () => {
        try {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            setUser(currentUser);

            if (currentUser) {
                const [kundalis, profile] = await Promise.all([
                    api.astrology.fetchSavedKundalis(currentUser.id),
                    supabase.from('user_vedic_profiles').select('*').eq('user_id', currentUser.id).single()
                ]);
                setSavedKundalis(kundalis || []);
                setUserProfile(profile.data);
            }
        } catch (error) {
            console.error('Astro Error:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    if (loading) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator size="large" color="#FF4D00" />
                <Text className="mt-4 text-gray-500 font-medium">Aligning Stars...</Text>
            </View>
        );
    }

    return (
        <ScrollView 
            className="flex-1 bg-gray-50" 
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {/* Header */}
            <LinearGradient colors={['#FFF5F0', '#FFFFFF']} className="px-6 pt-16 pb-8">
                <View className="flex-row justify-between items-end">
                    <View>
                        <Text className="text-gray-400 font-bold tracking-widest text-xs mb-1 uppercase">Astro Insights</Text>
                        <Text className="text-3xl font-black text-gray-900">Vedic <Text className="text-primary">Aura</Text></Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => router.push('/kundli/new')}
                        className="bg-primary w-12 h-12 rounded-2xl items-center justify-center shadow-lg shadow-primary/30"
                    >
                        <Plus color="white" size={24} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* Quick Actions / Profile Recommendation */}
            <View className="px-6 -mt-4">
                {userProfile ? (
                    <TouchableOpacity 
                        onPress={() => router.push({
                            pathname: '/kundli/report',
                            params: { 
                                name: userProfile.full_name,
                                dob: userProfile.date_of_birth,
                                tob: userProfile.time_of_birth,
                                pob: userProfile.place_of_birth,
                                lat: userProfile.lat || '19.076',
                                lon: userProfile.lon || '72.8777'
                            }
                        })}
                        className="bg-white rounded-3xl p-5 shadow-sm border border-saffron-100 flex-row items-center"
                    >
                        <View className="w-16 h-16 bg-saffron-50 rounded-2xl items-center justify-center mr-4">
                            <Sparkles color="#FF4D00" size={32} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-900 font-bold text-lg">My Destiny Insight</Text>
                            <Text className="text-gray-500 text-sm">View full analysis for {userProfile.full_name}</Text>
                        </View>
                        <ChevronRight color="#94A3B8" size={20} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity 
                        onPress={() => router.push('/kundli/new')}
                        className="bg-primary/5 rounded-3xl p-5 border border-primary/10 flex-row items-center"
                    >
                        <View className="w-16 h-16 bg-primary rounded-2xl items-center justify-center mr-4">
                            <Sparkles color="white" size={32} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-primary font-bold text-lg">Setup Vedic Profile</Text>
                            <Text className="text-primary/60 text-sm">Fill details for Guru AI analysis</Text>
                        </View>
                        <ChevronRight color="#FF4D00" size={20} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Saved Kundalis Section */}
            <View className="mt-8 px-6">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-black text-gray-900">Saved Kundalis</Text>
                    <TouchableOpacity>
                        <Text className="text-primary font-bold text-sm">View All</Text>
                    </TouchableOpacity>
                </View>

                {savedKundalis.length > 0 ? (
                    <View className="gap-4">
                        {savedKundalis.slice(0, 3).map((item) => (
                            <TouchableOpacity 
                                key={item.id}
                                onPress={() => router.push({
                                    pathname: '/kundli/report',
                                    params: { 
                                        name: item.full_name,
                                        dob: item.date_of_birth,
                                        tob: item.time_of_birth,
                                        pob: item.place_of_birth,
                                        lat: item.lat,
                                        lon: item.lon,
                                        id: item.id
                                    }
                                })}
                                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-row items-center"
                            >
                                <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center mr-4 border border-gray-100">
                                    <User color="#64748B" size={20} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-900 font-bold">{item.full_name}</Text>
                                    <Text className="text-gray-400 text-xs mt-0.5">{item.date_of_birth} • {item.place_of_birth}</Text>
                                </View>
                                <ChevronRight color="#CBD5E1" size={18} />
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <View className="bg-gray-100 rounded-2xl p-8 items-center justify-center border border-dashed border-gray-300">
                        <History color="#94A3B8" size={32} />
                        <Text className="text-gray-400 font-medium mt-2">No saved charts yet</Text>
                    </View>
                )}
            </View>

            {/* Astro Features / Highlights */}
            <View className="mt-10 px-6">
                <Text className="text-lg font-black text-gray-900 mb-4">Cosmic Services</Text>
                
                <View className="flex-row flex-wrap gap-4">
                   <ServiceCard 
                    title="Panchang" 
                    desc="Daily Muhurat" 
                    icon={<Clock size={24} color="#FFD700" />} 
                    color="bg-yellow-50"
                   />
                   <ServiceCard 
                    title="Gemstone" 
                    desc="Lucky Stones" 
                    icon={<Shield size={24} color="#00C853" />} 
                    color="bg-green-50"
                   />
                   <ServiceCard 
                    title="Numerology" 
                    desc="Number Power" 
                    icon={<Star size={24} color="#6200EA" />} 
                    color="bg-purple-50"
                   />
                   <ServiceCard 
                    title="Yoga/Remedy" 
                    desc="Divine Fixes" 
                    icon={<Zap size={24} color="#FF1744" />} 
                    color="bg-red-50"
                   />
                </View>
            </View>
        </ScrollView>
    );
}

function ServiceCard({ title, desc, icon, color }: { title: string, desc: string, icon: any, color: string }) {
    return (
        <TouchableOpacity className={`w-[47%] ${color} p-5 rounded-3xl border border-black/5`}>
            <View className="mb-3">{icon}</View>
            <Text className="text-gray-900 font-black text-base">{title}</Text>
            <Text className="text-gray-500 text-xs mt-1">{desc}</Text>
        </TouchableOpacity>
    );
}
