import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Alert, Modal, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Star, 
  Plus, 
  ChevronRight, 
  User, 
  History, 
  Compass, 
  Shield, 
  Zap,
  Clock,
  MapPin,
  Trash2,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Wind,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Info,
  Menu
} from 'lucide-react-native';
import { api } from '../../lib/api';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { useSidebar } from '../../context/SidebarContext';

const getIconForLabel = (label: string, color: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('tithi')) return <Moon color={color} size={14} />;
    if (lowerLabel.includes('nakshatra')) return <Sparkles color={color} size={14} />;
    if (lowerLabel.includes('yoga')) return <Wind color={color} size={14} />;
    if (lowerLabel.includes('karana')) return <Shield color={color} size={14} />;
    if (lowerLabel.includes('day') || lowerLabel.includes('vaar')) return <Calendar color={color} size={14} />;
    if (lowerLabel.includes('sunrise')) return <Sunrise color={color} size={14} />;
    if (lowerLabel.includes('sunset')) return <Sunset color={color} size={14} />;
    if (lowerLabel.includes('moonrise')) return <Moon color={color} size={14} />;
    if (lowerLabel.includes('moonset')) return <Moon color={color} size={14} />;
    if (lowerLabel.includes('rahu')) return <AlertTriangle color={color} size={14} />;
    if (lowerLabel.includes('abhijit')) return <CheckCircle2 color={color} size={14} />;
    return <Info color={color} size={14} />;
};

export default function AstroScreen() {
    const router = useRouter();
    const { toggle } = useSidebar();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [savedKundalis, setSavedKundalis] = useState<any[]>([]);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [panchangData, setPanchangData] = useState<any>(null);
    const [panchangModalVisible, setPanchangModalVisible] = useState(false);

    const fetchData = async () => {
        try {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            setUser(currentUser);

            // Fetch Panchang details in parallel
            const panRes = await api.astrology.getPanchangData().catch((err: any) => {
                console.error("Panchang Fetch Error:", err);
                return null;
            });
            if (panRes && panRes.success) {
                setPanchangData(panRes.data);
            }

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

    const handleDelete = async (id: string, name: string) => {
        Alert.alert(
            "Delete Chart",
            `Are you sure you want to remove ${name}'s sacred chart from your archive?`,
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await api.astrology.deleteKundali(id);
                            fetchData();
                        } catch (error) {
                            console.error('Delete Error:', error);
                            Alert.alert("Error", "Could not remove the chart at this time.");
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator size="large" color="#FF4D00" />
                <Text className="mt-4 text-gray-500 font-medium tracking-[3px] uppercase text-[10px]">Aligning Stars...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
            >
                {/* Premium Header */}
                <LinearGradient colors={['#FF4D00', '#FF8C00']} className="px-6 pt-16 pb-12 rounded-b-[40px] shadow-2xl">
                    <View className="flex-row justify-between items-center mb-6">
                        <View>
                            <Text className="text-white/60 font-black tracking-[4px] text-[10px] mb-1 uppercase">Astro Insights</Text>
                            <Text className="text-3xl font-black text-white">Vedic <Text className="text-white/70">Aura</Text></Text>
                        </View>
                        <View className="flex-row gap-3">
                            <TouchableOpacity 
                                onPress={() => router.push('/kundli/new')}
                                className="bg-white/20 w-12 h-12 rounded-2xl items-center justify-center border border-white/20"
                            >
                                <Plus color="white" size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => toggle(true)}
                                className="bg-white/20 w-12 h-12 rounded-2xl items-center justify-center border border-white/20"
                            >
                                <Menu color="white" size={20} />
                            </TouchableOpacity>
                        </View>
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
                                <Star color="#FF4D00" size={32} />
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
                                <Star color="white" size={32} />
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
                        <TouchableOpacity onPress={() => Alert.alert("Cosmic Archive", "The full library of your charts is being synchronized. Coming soon!")}>
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
                                    <TouchableOpacity 
                                        onPress={() => handleDelete(item.id, item.full_name)}
                                        className="p-2 mr-1"
                                    >
                                        <Trash2 color="#FDA4AF" size={18} />
                                    </TouchableOpacity>
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
                         desc={panchangData ? "Muhurat Active" : "Daily Muhurat"} 
                         icon={<Clock size={24} color="#FFD700" />} 
                         color="bg-yellow-50"
                         onPress={() => setPanchangModalVisible(true)}
                        />
                        <ServiceCard 
                         title="Gemstone" 
                         desc="Lucky Stones" 
                         icon={<Shield size={24} color="#00C853" />} 
                         color="bg-green-50"
                         onPress={() => Alert.alert("Gemstone Guide", "Calculating your life stone energy... Coming soon.")}
                        />
                        <ServiceCard 
                         title="Numerology" 
                         desc="Number Power" 
                         icon={<Star size={24} color="#6200EA" />} 
                         color="bg-purple-50"
                         onPress={() => Alert.alert("Numerology", "Decoding your birth numbers... Coming soon.")}
                        />
                        <ServiceCard 
                         title="Yoga/Remedy" 
                         desc="Divine Fixes" 
                         icon={<Zap size={24} color="#FF1744" />} 
                         color="bg-red-50"
                         onPress={() => Alert.alert("Divine Remedies", "Prescribing celestial fixes for your chart... Coming soon.")}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Panchang Bottom Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={panchangModalVisible}
                onRequestClose={() => setPanchangModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent} className="bg-white">
                        {/* Drag Handle */}
                        <View style={styles.dragHandle} />

                        {/* Modal Header */}
                        <View className="flex-row justify-between items-center mb-6">
                            <View className="flex-1 pr-4">
                                <Text className="text-[10px] font-black text-primary tracking-[3px] uppercase">Aaj Ka Panchang</Text>
                                <Text className="text-lg font-black text-gray-900" numberOfLines={1}>{panchangData?.title || 'Daily Panchang'}</Text>
                                <View className="flex-row items-center mt-1">
                                    <MapPin size={12} color="#64748B" />
                                    <Text className="text-gray-400 text-xs ml-1 font-semibold">{panchangData?.location || 'New Delhi, India'}</Text>
                                </View>
                            </View>
                            <TouchableOpacity 
                                onPress={() => setPanchangModalVisible(false)}
                                className="bg-gray-100 px-4 py-2 rounded-full"
                            >
                                <Text className="font-black text-gray-500 text-xs">CLOSE</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Modal Body */}
                        {/* Modal Body */}
                        {panchangData ? (() => {
                            const orderedSectionKeys = [
                                "panchang_for_today",
                                "sun_moon_calculations",
                                "auspicious_timings",
                                "inauspicious_timings",
                                "hindu_month_year"
                            ];                            const sectionConfig: Record<string, {
                                title: string;
                                accentColor: string;
                                titleClass: string;
                                containerClass: string;
                                keyClass: string;
                                valClass: string;
                                itemBgClass: string;
                                isGrid?: boolean;
                            }> = {
                                panchang_for_today: {
                                    title: "VEDIC PILLARS",
                                    accentColor: "#ea580c", // Orange
                                    titleClass: "text-[10px] font-black text-orange-600 uppercase tracking-[3px] mb-3 px-1",
                                    containerClass: "bg-orange-50/10 rounded-[28px] p-4 mb-6 border border-orange-100/50 gap-y-3",
                                    keyClass: "text-[9px] text-orange-700 font-extrabold uppercase tracking-wider mb-0.5",
                                    valClass: "text-orange-950 font-bold text-sm",
                                    itemBgClass: "bg-orange-50/40 border-l-[3px] border-orange-500"
                                },
                                sun_moon_calculations: {
                                    title: "CELESTIAL EVENTS",
                                    accentColor: "#7c3aed", // Purple
                                    titleClass: "text-[10px] font-black text-purple-600 uppercase tracking-[3px] mb-3 px-1",
                                    containerClass: "bg-purple-50/10 rounded-[28px] p-4 mb-6 border border-purple-100/50 gap-y-3",
                                    keyClass: "text-[9px] text-purple-700 font-extrabold uppercase tracking-wider mb-0.5",
                                    valClass: "text-purple-950 font-bold text-sm",
                                    itemBgClass: "bg-purple-50/40 border-l-[3px] border-purple-500"
                                },
                                auspicious_timings: {
                                    title: "SHUBHA MUHURAT",
                                    accentColor: "#10b981", // Green
                                    titleClass: "text-[10px] font-black text-emerald-600 uppercase tracking-[3px] mb-3 px-1",
                                    containerClass: "bg-emerald-50/10 rounded-[28px] p-4 mb-6 border border-emerald-100/50 gap-y-3",
                                    keyClass: "text-[9px] text-emerald-700 font-extrabold uppercase tracking-wider mb-0.5",
                                    valClass: "text-emerald-950 font-bold text-sm",
                                    itemBgClass: "bg-emerald-50/40 border-l-[3px] border-emerald-500"
                                },
                                inauspicious_timings: {
                                    title: "ASHUBHA MUHURAT",
                                    accentColor: "#ef4444", // Red
                                    titleClass: "text-[10px] font-black text-rose-600 uppercase tracking-[3px] mb-3 px-1",
                                    containerClass: "bg-rose-50/10 rounded-[28px] p-4 mb-6 border border-rose-100/50 gap-y-3",
                                    keyClass: "text-[9px] text-rose-700 font-extrabold uppercase tracking-wider mb-0.5",
                                    valClass: "text-rose-950 font-bold text-sm",
                                    itemBgClass: "bg-rose-50/40 border-l-[3px] border-rose-500"
                                },
                                hindu_month_year: {
                                    title: "Traditional Vedic Calendar Details",
                                    accentColor: "#f97316", // Saffron orange
                                    titleClass: "text-[10px] font-black text-orange-500 uppercase tracking-[3px] mb-3 px-1",
                                    containerClass: "bg-slate-900 rounded-[28px] p-5 mb-6 border border-slate-800 flex-row flex-wrap justify-between gap-y-5 shadow-2xl",
                                    keyClass: "text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1.5",
                                    valClass: "text-white font-black text-sm leading-tight",
                                    itemBgClass: "",
                                    isGrid: true
                                }
                            };

                             return (
                                <ScrollView showsVerticalScrollIndicator={false} className="max-h-[70vh]">
                                    {orderedSectionKeys.map((sectionKey) => {
                                        const sectionVal = panchangData[sectionKey];
                                        if (!sectionVal || typeof sectionVal !== "object" || Object.keys(sectionVal).length === 0) {
                                            return null;
                                        }

                                        const theme = sectionConfig[sectionKey];
                                        if (!theme) return null;

                                        // Define exact key order as shown on the website screenshot to ensure identical layout
                                        const preferredOrders: Record<string, string[]> = {
                                            panchang_for_today: ["Day", "Yoga", "Tithi", "Karana", "Paksha", "Nakshatra"],
                                            sun_moon_calculations: ["Ritu", "Sun Set", "Moon Set", "Sun Rise", "Moon Rise", "Moon Sign"],
                                            auspicious_timings: ["Abhijit"],
                                            inauspicious_timings: ["Kulika", "Rahu Kaal", "Yamaganda", "Yamashanta", "Gulika Kaal", "Dushta Muhurtas", "Kantaka / Mrityu", "Kalavela / Ardhayaam"],
                                            hindu_month_year: ["Kali Samvat", "Day Duration", "Month Amanta", "Shaka Samvat", "Vikram Samvat", "Month Purnimanta", "Pravishte / Gate", "Pravishhte / Gate"]
                                        };

                                        const order = preferredOrders[sectionKey] || [];
                                        const sortedEntries = [...Object.entries(sectionVal)].sort((a, b) => {
                                            const indexA = order.findIndex(key => key.toLowerCase() === a[0].toLowerCase());
                                            const indexB = order.findIndex(key => key.toLowerCase() === b[0].toLowerCase());
                                            if (indexA === -1 && indexB === -1) return a[0].localeCompare(b[0]);
                                            if (indexA === -1) return 1;
                                            if (indexB === -1) return -1;
                                            return indexA - indexB;
                                        });

                                        return (
                                            <View key={sectionKey}>
                                                <Text className={theme.titleClass}>{theme.title}</Text>
                                                <View className={theme.containerClass}>
                                                    {sortedEntries.map(([key, val]: any) => {
                                                        if (theme.isGrid) {
                                                            return (
                                                                <View key={key} style={{ width: '31%', minWidth: 80 }}>
                                                                    <Text className={theme.keyClass} numberOfLines={1}>{key}</Text>
                                                                    <Text className={theme.valClass}>{val}</Text>
                                                                </View>
                                                            );
                                                        } else {
                                                            return (
                                                                <View 
                                                                    key={key} 
                                                                    className={`flex-row items-center rounded-2xl px-3 py-2.5 gap-x-3 ${theme.itemBgClass}`}
                                                                >
                                                                    <View className="w-8 h-8 rounded-xl items-center justify-center bg-white shadow-sm border border-black/5">
                                                                        {getIconForLabel(key, theme.accentColor)}
                                                                    </View>
                                                                    <View className="flex-1">
                                                                        <Text className={theme.keyClass}>{key}</Text>
                                                                        <Text className={theme.valClass}>{val}</Text>
                                                                    </View>
                                                                </View>
                                                            );
                                                        }
                                                    })}
                                                </View>
                                            </View>
                                        );
                                    })}
                                </ScrollView>
                            );
                        })() : (
                            <View className="py-20 items-center justify-center">
                                <ActivityIndicator size="small" color="#FF4D00" />
                                <Text className="text-gray-400 font-medium text-xs mt-2">Loading Vedic parameters...</Text>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

function ServiceCard({ title, desc, icon, color, onPress }: { title: string, desc: string, icon: any, color: string, onPress?: () => void }) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.7}
            className={`w-[47%] ${color} p-5 rounded-3xl border border-black/5 shadow-sm`}
        >
            <View className="mb-3">{icon}</View>
            <Text className="text-gray-900 font-black text-base">{title}</Text>
            <Text className="text-gray-500 text-xs mt-1">{desc}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingTop: 12,
        minHeight: '60%',
        maxHeight: '90%',
    },
    dragHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#CBD5E1',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 16,
    }
});
