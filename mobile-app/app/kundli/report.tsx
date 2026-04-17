import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Pressable, 
  TouchableOpacity, 
  ActivityIndicator, 
  Dimensions, 
  StyleSheet
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { 
  ArrowLeft, 
  LayoutDashboard, 
  Grid3X3, 
  Zap, 
  Star, 
  Shield, 
  Download,
  Share2,
  ChevronRight,
  Info,
  Menu,
  Check
} from 'lucide-react-native';
import { SvgXml } from 'react-native-svg';
import { api } from '../../lib/api';
import { LinearGradient } from 'expo-linear-gradient';
import { useSidebar } from '../../context/SidebarContext';

const { width } = Dimensions.get('window');

export default function KundliReportScreen() {
// static router used for better stability
    const { toggle } = useSidebar();
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [reportData, setReportData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchKundli = async () => {
            try {
                const apiPayload = {
                    day: parseInt((params.dob as string).split('-')[2]),
                    month: parseInt((params.dob as string).split('-')[1]),
                    year: parseInt((params.dob as string).split('-')[0]),
                    hour: parseInt((params.tob as string).split(':')[0]),
                    min: parseInt((params.tob as string).split(':')[1]),
                    lat: parseFloat(params.lat as string),
                    lon: parseFloat(params.lon as string),
                    tzone: 5.5
                };

                const result = await api.astrology.getKundliData(apiPayload);
                if (result.success) {
                    setReportData(result.data);
                } else {
                    setError('Failed to fetch sacred data');
                }
            } catch (err) {
                console.error('Report fetch error:', err);
                setError('Celestial sync failed. Check connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchKundli();
    }, [params]);

    if (loading) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <View className="mb-6">
                    <ActivityIndicator size="large" color="#FF4D00" />
                </View>
                <Text className="text-gray-900 font-black text-xl mb-2">Calculating Karma...</Text>
                <Text className="text-gray-400 font-bold tracking-[3px] uppercase text-[10px] italic">Syncing with Celestial Planes</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 bg-white items-center justify-center px-10">
                <View className="w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-6">
                    <Info size={40} color="#EF4444" />
                </View>
                <Text className="text-gray-900 font-black text-xl mb-2">Grah Dosh Detected</Text>
                <Text className="text-gray-500 font-medium text-center mb-8 leading-5">{error}</Text>
                <Pressable onPress={() => router.back()} className="bg-primary w-full h-14 rounded-2xl items-center justify-center shadow-lg shadow-primary/20">
                    <Text className="text-white font-black uppercase tracking-widest text-base">Rectify Path</Text>
                </Pressable>
            </View>
        );
    }

    const tabs = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'charts', label: 'Charts', icon: Grid3X3 },
        { id: 'dasha', label: 'Dasha', icon: Zap },
        { id: 'predictions', label: 'Reports', icon: Star },
    ];

    return (
        <View className="flex-1 bg-white">
            {/* Premium Header */}
            <LinearGradient 
                colors={['#FF4D00', '#FF8C00']} 
                style={{ paddingTop: 64, paddingBottom: 32, paddingHorizontal: 24, borderBottomLeftRadius: 50, borderBottomRightRadius: 50, elevation: 10 }}
            >
                <View className="flex-row justify-between items-center mb-8">
                    <Pressable 
                        onPress={() => router.back()} 
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                        <ArrowLeft color="white" size={24} />
                    </Pressable>
                    <View className="items-center">
                        <Text className="text-white/70 text-[10px] font-black uppercase tracking-[4px]">Vedic Insights</Text>
                        <Text className="text-white text-xl font-black">{params.name}</Text>
                    </View>
                    <Pressable 
                        onPress={() => toggle(true)}
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                        <Menu color="white" size={20} />
                    </Pressable>
                </View>

                {/* Tab Bar Refined */}
                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 28, padding: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab.id}
                            activeOpacity={0.7}
                            onPress={() => setActiveTab(tab.id)}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            style={{ 
                                flex: 1, 
                                paddingVertical: 14, 
                                alignItems: 'center', 
                                borderRadius: 16, 
                                flexDirection: 'row', 
                                justifyContent: 'center',
                                backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
                                ...(activeTab === tab.id ? { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 } : {})
                            }}
                        >
                            <tab.icon size={16} color={activeTab === tab.id ? '#FF4D00' : 'rgba(255,255,255,0.7)'} strokeWidth={activeTab === tab.id ? 3 : 2} />
                            {activeTab === tab.id && <Text style={{ marginLeft: 8, fontWeight: '900', fontSize: 10, color: '#FF4D00', textTransform: 'uppercase', letterSpacing: 1 }}>{tab.label}</Text>}
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>

            <ScrollView 
                className="flex-1 bg-[#FDFCFB]" 
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {activeTab === 'dashboard' && <DashboardView data={reportData} />}
                {activeTab === 'charts' && <ChartsView data={reportData} />}
                {activeTab === 'dasha' && <DashaView data={reportData} />}
                {activeTab === 'predictions' && <PredictionsView data={reportData} />}
            </ScrollView>
        </View>
    );
}

function DashboardView({ data }: { data: any }) {
    const p = data?.panchang || {};
    const core = data?.core || {};
    
    return (
        <View>
            <View className="flex-row items-center mb-6">
                <View className="bg-primary/10 w-8 h-8 rounded-xl items-center justify-center mr-3">
                    <Info size={16} color="#FF4D00" />
                </View>
                <Text className="text-gray-900 font-black text-xl">Birth Panchang</Text>
            </View>
            
            <View className="flex-row flex-wrap justify-between gap-y-4">
                <InfoCard label="Tithi" value={p.tithi?.details?.tithi_name || p.tithi} color="bg-orange-50" icon="🌙" />
                <InfoCard label="Nakshatra" value={p.nakshatra?.details?.nakshatra_name || p.nakshatra} color="bg-blue-50" icon="✨" />
                <InfoCard label="Yog" value={p.yog?.details?.yog_name || p.yog} color="bg-purple-50" icon="🌀" />
                <InfoCard label="Karan" value={p.karan?.details?.karan_name || p.karan} color="bg-green-50" icon="⚙️" />
                <InfoCard label="Rashi" value={core.sign} color="bg-red-50" icon="🦁" />
                <InfoCard label="Ascendant" value={core.ascendant} color="bg-teal-50" icon="⬆️" />
            </View>

            <View className="mt-10 bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
                <View className="flex-row items-center mb-6">
                    <View className="bg-primary w-2 h-6 rounded-full mr-4" />
                    <Text className="text-gray-900 font-black text-xl">Astro Core</Text>
                </View>
                <TableRow label="Varna (Phile)" value={core.varna || core.Varna} />
                <TableRow label="Vashya (Control)" value={core.vashya || core.Vashya} />
                <TableRow label="Yoni (Instinct)" value={core.yoni || core.Yoni} />
                <TableRow label="Gan (Temper)" value={core.gan || core.Gan} />
                <TableRow label="Nadi (Energy)" value={core.nadi || core.Nadi} />
            </View>
        </View>
    );
}

function ChartsView({ data }: { data: any }) {
    return (
        <View>
            <View className="flex-row items-center mb-8 justify-center">
                <Grid3X3 size={24} color="#FF4D00" />
                <Text className="text-gray-900 font-black text-xl ml-3">Planetary Alignments</Text>
            </View>
            
            <View className="mb-12">
                <View className="bg-primary px-4 py-1.5 rounded-full self-center mb-6">
                    <Text className="text-white font-black text-[10px] uppercase tracking-widest">Lagna Chart (D1)</Text>
                </View>
                <View className="bg-white p-6 rounded-[40px] shadow-2xl shadow-black/5 border border-gray-50 w-full aspect-square justify-center items-center">
                    {data.chart_d1 ? (
                        <View className="w-full h-full p-2">
                             <SvgXml xml={data.chart_d1} width="100%" height="100%" /> 
                        </View>
                    ) : <Text className="text-gray-400 italic">Awakening D1 Chart...</Text>}
                </View>
            </View>

            <View>
                <View className="bg-primary px-4 py-1.5 rounded-full self-center mb-6">
                    <Text className="text-white font-black text-[10px] uppercase tracking-widest">Navamsa Chart (D9)</Text>
                </View>
                <View className="bg-white p-6 rounded-[40px] shadow-2xl shadow-black/5 border border-gray-50 w-full aspect-square justify-center items-center">
                    {data.chart_d9 ? (
                        <View className="w-full h-full p-2">
                             <SvgXml xml={data.chart_d9} width="100%" height="100%" /> 
                        </View>
                    ) : <Text className="text-gray-400 italic">Awakening D9 Chart...</Text>}
                </View>
            </View>
        </View>
    );
}

function DashaView({ data }: { data: any }) {
    const current = data?.current_dasha || {};
    const major = data?.dasha || [];

    return (
        <View>
            <LinearGradient colors={['#FFF5E0', '#FFFCF5']} className="rounded-[40px] p-8 border border-orange-100 mb-10 shadow-sm">
                <Text className="text-primary font-black text-[10px] uppercase tracking-[3px] mb-6">Current Active Dasha</Text>
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-gray-900 font-black text-3xl uppercase tracking-tighter">{current.mahadasha}</Text>
                        <Text className="text-orange-600 font-black text-[10px] uppercase mt-1">Major Lord</Text>
                    </View>
                    <View className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
                        <Zap color="#FF4D00" size={24} />
                    </View>
                    <View className="items-end">
                        <Text className="text-gray-900 font-black text-2xl uppercase tracking-tighter">{current.antardasha}</Text>
                        <Text className="text-orange-600 font-black text-[10px] uppercase mt-1">Minor Lord</Text>
                    </View>
                </View>
            </LinearGradient>

            <Text className="text-gray-900 font-black text-xl mb-8">Vimshottari Timeline</Text>
            <View className="px-2">
                {major.slice(0, 5).map((d: any, i: number) => (
                    <View key={i} className="flex-row mb-8 relative">
                        <View className="items-center mr-6">
                            <View className={`w-14 h-14 rounded-2xl items-center justify-center border-2 ${i === 0 ? 'bg-primary border-primary shadow-lg shadow-primary/30' : 'bg-white border-gray-100'}`}>
                                <Text className={`font-black uppercase tracking-tighter ${i === 0 ? 'text-white' : 'text-gray-700'}`}>{d.mahadasha.slice(0, 2)}</Text>
                            </View>
                            {i < 4 && <View className="w-0.5 h-10 bg-gray-100 mt-2" />}
                        </View>
                        <View className="pt-2">
                            <Text className={`font-black text-lg ${i === 0 ? 'text-primary' : 'text-gray-900'}`}>{d.mahadasha}</Text>
                            <Text className="text-gray-400 font-bold text-xs mt-1 uppercase tracking-widest">{d.start} - {d.end}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

function PredictionsView({ data }: { data: any }) {
    return (
        <View>
            <ReportItem 
                title="Character Prediction" 
                icon="🧘"
                content={(Array.isArray(data.character?.report) ? data.character.report[0] : (data.character?.report || data.character?.character_report)) || "Your personality is deeply influenced by the alignment of your ascendant..."} 
            />
            <ReportItem 
                title="Gemstone Guidance" 
                icon="💎"
                content={`Life Gem: ${data.gemstone?.life_gem?.name || 'Ruby'} - ${data.gemstone?.life_gem?.gem_report || 'Wear for overall vitality and divine protection.'}`} 
            />
            <ReportItem 
                title="Manglik Analysis" 
                icon="🔥"
                content={data.manglik?.report || "Neutral alignment profile detected. No significant Manglik dosha affects your celestial path."} 
            />
        </View>
    );
}

function InfoCard({ label, value, color, icon }: { label: string, value: string, color: string, icon: string }) {
    return (
        <View className={`${color} rounded-3xl p-5 w-[48%] shadow-sm border border-white/50`}>
            <View className="flex-row justify-between items-start mb-3">
                <Text className="text-xl">{icon}</Text>
                <Check size={14} color="rgba(0,0,0,0.1)" />
            </View>
            <Text className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-1">{label}</Text>
            <Text className="text-gray-900 font-black text-sm" numberOfLines={1}>{value}</Text>
        </View>
    );
}

function TableRow({ label, value }: { label: string, value: string }) {
    return (
        <View className="flex-row justify-between py-4 border-b border-gray-50 last:border-0">
            <Text className="text-gray-400 font-black text-[10px] uppercase tracking-widest">{label}</Text>
            <Text className="text-gray-900 font-black text-sm uppercase">{value}</Text>
        </View>
    );
}

function ReportItem({ title, content, icon }: { title: string, content: string, icon: string }) {
    return (
        <View className="mb-8 bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm">
            <View className="flex-row items-center mb-5">
                <View className="bg-orange-50 w-12 h-12 rounded-2xl items-center justify-center mr-4">
                    <Text className="text-2xl">{icon}</Text>
                </View>
                <Text className="text-gray-900 font-black text-xl">{title}</Text>
            </View>
            <Text className="text-gray-500 leading-7 text-sm italic">"{content}"</Text>
        </View>
    );
}
