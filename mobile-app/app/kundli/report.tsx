import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  Info
} from 'lucide-react-native';
import { SvgXml } from 'react-native-svg';
import { api } from '../../lib/api';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function KundliReportScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [reportData, setReportData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchKundli = async () => {
            try {
                const birthData = {
                    datetime: `${params.dob}T${params.tob}:00+05:30`,
                    coordinates: `${params.lat},${params.lon}`,
                    name: params.name
                };
                
                // Construct required birthData format for API
                const dt = new Date(birthData.datetime);
                const [lat, lon] = birthData.coordinates.split(',').map(Number);
                
                const apiPayload = {
                    day: dt.getDate(), month: dt.getMonth() + 1, year: dt.getFullYear(),
                    hour: dt.getHours(), min: dt.getMinutes(),
                    lat, lon, tzone: 5.5
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
                <ActivityIndicator size="large" color="#FF4D00" />
                <Text className="mt-4 text-gray-500 font-bold tracking-widest uppercase text-xs italic">Syncing with Celestial Planes...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 bg-white items-center justify-center px-10">
                <Text className="text-red-500 font-bold text-center mb-4">{error}</Text>
                <TouchableOpacity onPress={() => router.back()} className="bg-primary px-8 py-3 rounded-xl">
                    <Text className="text-white font-bold">Go Back</Text>
                </TouchableOpacity>
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
            {/* Header */}
            <LinearGradient colors={['#FF4D00', '#FF8C00']} className="pt-12 pb-6 px-6 rounded-b-[40px] shadow-2xl">
                <View className="flex-row justify-between items-center mb-6">
                    <TouchableOpacity onPress={() => router.back()} className="bg-white/20 p-2 rounded-xl">
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text className="text-white/70 text-[10px] font-black uppercase tracking-[3px]">Kundali Analysis</Text>
                        <Text className="text-white text-xl font-black">{params.name}</Text>
                    </View>
                    <TouchableOpacity className="bg-white/20 p-2 rounded-xl">
                        <Share2 color="white" size={20} />
                    </TouchableOpacity>
                </View>

                {/* Tab Bar */}
                <View className="flex-row bg-black/10 rounded-2xl p-1.5">
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => setActiveTab(tab.id)}
                            className={`flex-1 py-3 items-center rounded-xl flex-row justify-center ${activeTab === tab.id ? 'bg-white shadow-sm' : ''}`}
                        >
                            <tab.icon size={16} color={activeTab === tab.id ? '#FF4D00' : 'rgba(255,255,255,0.7)'} strokeWidth={2.5} />
                            {activeTab === tab.id && <Text className="ml-2 font-black text-[10px] text-primary uppercase">{tab.label}</Text>}
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>

            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
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
            <Text className="text-gray-900 font-black text-xl mb-4">Birth Panchang</Text>
            <View className="flex-row flex-wrap gap-3">
                <InfoCard label="Tithi" value={p.tithi} color="bg-orange-50" icon="🌙" />
                <InfoCard label="Nakshatra" value={p.nakshatra} color="bg-blue-50" icon="✨" />
                <InfoCard label="Yog" value={p.yog} color="bg-purple-50" icon="🌀" />
                <InfoCard label="Karan" value={p.karan} color="bg-green-50" icon="⚙️" />
                <InfoCard label="Rashi" value={core.sign} color="bg-red-50" icon="🦁" />
                <InfoCard label="Ascendant" value={core.ascendant} color="bg-teal-50" icon="⬆️" />
            </View>

            <View className="mt-8 bg-gray-50 rounded-3xl p-6 border border-gray-100">
                <Text className="text-gray-900 font-black text-lg mb-4">Astro Core</Text>
                <TableRow label="Varna" value={core.varna} />
                <TableRow label="Vashya" value={core.vashya} />
                <TableRow label="Yoni" value={core.yoni} />
                <TableRow label="Gan" value={core.gan} />
                <TableRow label="Nadi" value={core.nadi} />
            </View>
        </View>
    );
}

function ChartsView({ data }: { data: any }) {
    return (
        <View>
            <Text className="text-gray-900 font-black text-xl mb-6 text-center">Planetary Alignments</Text>
            
            <View className="mb-10 items-center">
                <Text className="text-primary font-bold mb-4 uppercase tracking-[2px] text-xs">Lagna Chart (D1)</Text>
                <View className="bg-white p-2 rounded-3xl shadow-xl border border-gray-100 w-full aspect-square justify-center items-center">
                    {data.chart_d1 ? <SvgXml xml={data.chart_d1} width="100%" height="100%" /> : <Text>Syncing Chart...</Text>}
                </View>
            </View>

            <View className="items-center">
                <Text className="text-primary font-bold mb-4 uppercase tracking-[2px] text-xs">Navamsa Chart (D9)</Text>
                <View className="bg-white p-2 rounded-3xl shadow-xl border border-gray-100 w-full aspect-square justify-center items-center">
                    {data.chart_d9 ? <SvgXml xml={data.chart_d9} width="100%" height="100%" /> : <Text>Syncing Chart...</Text>}
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
            <View className="bg-primary/5 rounded-3xl p-6 border border-primary/20 mb-8">
                <Text className="text-primary font-black text-sm uppercase mb-4">Current Active Dasha</Text>
                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-gray-900 font-bold text-2xl uppercase">{current.mahadasha}</Text>
                        <Text className="text-gray-500 font-medium">Major Lord</Text>
                    </View>
                    <ChevronRight color="#FF4D00" size={32} />
                    <View className="items-end">
                        <Text className="text-gray-900 font-bold text-lg uppercase">{current.antardasha}</Text>
                        <Text className="text-gray-500 font-medium">Minor Lord</Text>
                    </View>
                </View>
            </View>

            <Text className="text-gray-900 font-black text-lg mb-4">Vimshottari Timeline</Text>
            <View className="border-l-2 border-gray-100 ml-4 pl-6 gap-6">
                {major.slice(0, 5).map((d: any, i: number) => (
                    <View key={i} className="relative">
                        <View className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-white border-2 border-primary" />
                        <Text className="text-gray-900 font-bold text-base">{d.mahadasha}</Text>
                        <Text className="text-gray-500 text-sm mt-1">{d.start} - {d.end}</Text>
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
                content={data.character?.report?.[0] || "Your personality is deeply influenced by the alignment of your ascendant..."} 
            />
            <ReportItem 
                title="Gemstone Recommendation" 
                content={`Life Gem: ${data.gemstone?.life_gem?.name || 'Ruby'} - ${data.gemstone?.life_gem?.gem_report || 'Wear for overall vitality.'}`} 
            />
            <ReportItem 
                title="Manglik Analysis" 
                content={data.manglik?.report || "Neutral alignment profile detected."} 
            />
        </View>
    );
}

function InfoCard({ label, value, color, icon }: { label: string, value: string, color: string, icon: string }) {
    return (
        <View className={`${color} rounded-2xl p-4 w-[31%] items-center`}>
            <Text className="text-lg mb-1">{icon}</Text>
            <Text className="text-gray-400 text-[8px] font-black uppercase mb-1">{label}</Text>
            <Text className="text-gray-900 font-bold text-[10px] text-center" numberOfLines={1}>{value}</Text>
        </View>
    );
}

function TableRow({ label, value }: { label: string, value: string }) {
    return (
        <View className="flex-row justify-between py-3 border-b border-gray-100 last:border-0">
            <Text className="text-gray-500 font-medium">{label}</Text>
            <Text className="text-gray-900 font-black">{value}</Text>
        </View>
    );
}

function ReportItem({ title, content }: { title: string, content: string }) {
    return (
        <View className="mb-6 bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
            <Text className="text-gray-900 font-black text-lg mb-3">{title}</Text>
            <Text className="text-gray-600 leading-6">{content}</Text>
        </View>
    );
}
