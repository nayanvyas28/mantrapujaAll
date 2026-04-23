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

    const fetchKundli = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiPayload = {
                day: parseInt((params.dob as string).split('-')[2]),
                month: parseInt((params.dob as string).split('-')[1]),
                year: parseInt((params.dob as string).split('-')[0]),
                hour: parseInt((params.tob as string).split(':')[0]),
                min: parseInt((params.tob as string).split(':')[1]),
                lat: parseFloat(params.lat as string),
                lon: parseFloat(params.lon as string),
                tzone: 5.5,
                gender: params.gender as string || 'male'
            };

            // Safety check for NaN values
            if (isNaN(apiPayload.day) || isNaN(apiPayload.lat)) {
                console.error('[Report] Invalid birth data detected:', params);
                setError('Invalid birth details. Please go back and try again.');
                setLoading(false);
                return;
            }

            console.log('[Report] Fetching Kundli with payload:', JSON.stringify(apiPayload, null, 2));

            const result = await api.astrology.getKundliData(apiPayload);
            console.log('[Report] API Result success:', result.success);

            if (result.success) {
                setReportData(result.data);
                // Check if key data is missing
                if (result.data.core?.error) {
                    console.warn('[Report] Core data failed to load from all nodes');
                }
            } else {
                setError('Vedic server returned an error. Please try again.');
            }
        } catch (err: any) {
            console.error('[Report] Critical fetch error:', err);
            setError(err.message || 'Celestial sync failed. Check connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
                <Text className="text-gray-300 text-[9px] mt-4">Usually takes 15-20 seconds</Text>
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
                
                <Pressable onPress={fetchKundli} className="bg-primary w-full h-14 rounded-2xl items-center justify-center shadow-lg shadow-primary/20 mb-4">
                    <Text className="text-white font-black uppercase tracking-widest text-base">Retry Sync</Text>
                </Pressable>

                <Pressable onPress={() => router.back()}>
                    <Text className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Go Back</Text>
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
                    <TouchableOpacity 
                        onPress={() => router.back()} 
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 4 }}>Vedic Insights</Text>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: '900' }}>{params.name || 'Your Chart'}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => toggle(true)}
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                    >
                        <Menu color="white" size={20} />
                    </TouchableOpacity>
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
                                borderRadius: 20, 
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
                style={{ flex: 1, backgroundColor: '#FDFCFB' }}
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Subtle warning for partial failures only if main sections missing */}
                {(reportData && (!reportData.core || reportData.core.error)) && (
                    <View style={{ marginBottom: 20, padding: 16, backgroundColor: '#FEF2F2', borderRadius: 24, borderLeftWidth: 4, borderLeftColor: '#EF4444' }}>
                        <Text style={{ color: '#991B1B', fontSize: 14, fontWeight: '800', marginBottom: 2 }}>Cosmic Insights Delayed</Text>
                        <Text style={{ color: '#B91C1C', fontSize: 12, fontWeight: '500' }}>
                            Some essential data is still aligning. Please check your connection.
                        </Text>
                    </View>
                )}
                
                {reportData && activeTab === 'dashboard' && <DashboardView data={reportData} />}
                {reportData && activeTab === 'charts' && <ChartsView data={reportData} />}
                {reportData && activeTab === 'dasha' && <DashaView data={reportData} />}
                {reportData && activeTab === 'predictions' && <PredictionsView data={reportData} />}
                
                {!reportData && !loading && (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                        <Text style={{ color: '#9CA3AF', fontStyle: 'italic' }}>Celestial data not received...</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

function DashboardView({ data }: { data: any }) {
    if (!data) return null;
    const p = data?.panchang || {};
    const core = data?.core || {};
    
    const getVal = (field: any) => {
        if (!field) return "Not Available";
        if (typeof field === 'string') return field;
        return field.details?.value || field.details?.tithi_name || field.details?.nakshatra_name || field.name || "N/A";
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                <View style={{ backgroundColor: 'rgba(255, 77, 0, 0.1)', width: 32, height: 32, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <Info size={16} color="#FF4D00" />
                </View>
                <Text style={{ color: '#111827', fontWeight: '900', fontSize: 20 }}>Birth Panchang</Text>
            </View>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <InfoCard label="Tithi" value={getVal(p.tithi)} color="#FFF7ED" icon="🌙" />
                <InfoCard label="Nakshatra" value={getVal(p.nakshatra)} color="#EFF6FF" icon="✨" />
                <InfoCard label="Yog" value={getVal(p.yog)} color="#FAF5FF" icon="🌀" />
                <InfoCard label="Karan" value={getVal(p.karan)} color="#F0FDF4" icon="⚙️" />
                <InfoCard label="Rashi" value={core.sign || "N/A"} color="#FEF2F2" icon="🦁" />
                <InfoCard label="Lagna" value={core.ascendant || "N/A"} color="#F0FDFA" icon="⬆️" />
            </View>

            <View style={{ marginTop: 40, backgroundColor: 'white', borderRadius: 40, padding: 32, borderWidth: 1, borderColor: '#F3F4F6', elevation: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                    <View style={{ backgroundColor: '#FF4D00', width: 8, height: 24, borderRadius: 4, marginRight: 16 }} />
                    <Text style={{ color: '#111827', fontWeight: '900', fontSize: 20 }}>Astro Core</Text>
                </View>
                <TableRow label="Varna (Phile)" value={core.varna || core.Varna || "N/A"} />
                <TableRow label="Vashya (Control)" value={core.vashya || core.Vashya || "N/A"} />
                <TableRow label="Yoni (Instinct)" value={core.yoni || core.Yoni || "N/A"} />
                <TableRow label="Gan (Temper)" value={core.gan || core.Gan || "N/A"} />
                <TableRow label="Nadi (Energy)" value={core.nadi || core.Nadi || "N/A"} />
            </View>
        </View>
    );
}

function ChartsView({ data }: { data: any }) {
    if (!data) return null;
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, justifyContent: 'center' }}>
                <Grid3X3 size={24} color="#FF4D00" />
                <Text style={{ color: '#111827', fontWeight: '900', fontSize: 20, marginLeft: 12 }}>Planetary Alignments</Text>
            </View>
            
            <View style={{ marginBottom: 48 }}>
                <View style={{ backgroundColor: '#FF4D00', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, alignSelf: 'center', marginBottom: 24 }}>
                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Lagna Chart (D1)</Text>
                </View>
                <View style={{ backgroundColor: 'white', padding: 12, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5, borderWidth: 1, borderColor: '#F3F4F6', width: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                    {data.chart_d1 && typeof data.chart_d1 === 'string' ? (
                        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                             <SvgXml xml={data.chart_d1} width="95%" height="95%" /> 
                        </View>
                    ) : <Text style={{ color: '#9CA3AF', fontStyle: 'italic' }}>D1 Chart Unavailable</Text>}
                </View>
            </View>

            <View>
                <View style={{ backgroundColor: '#FF4D00', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, alignSelf: 'center', marginBottom: 24 }}>
                    <Text style={{ color: 'white', fontWeight: '900', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Navamsa Chart (D9)</Text>
                </View>
                <View style={{ backgroundColor: 'white', padding: 12, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5, borderWidth: 1, borderColor: '#F3F4F6', width: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                    {data.chart_d9 && typeof data.chart_d9 === 'string' ? (
                        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                             <SvgXml xml={data.chart_d9} width="95%" height="95%" /> 
                        </View>
                    ) : <Text style={{ color: '#9CA3AF', fontStyle: 'italic' }}>D9 Chart Unavailable</Text>}
                </View>
            </View>
        </View>
    );
}

function DashaView({ data }: { data: any }) {
    if (!data) return null;
    const current = data?.current_dasha || {};
    const major = data?.dasha || [];

    // Flexible extraction helper
    const getPlanetName = (obj: any, type: 'maha' | 'antar') => {
        if (!obj) return 'N/A';
        if (type === 'maha') {
            return obj.mahadasha || obj.major?.planet || obj.planet || 'N/A';
        }
        return obj.antardasha || obj.minor?.planet || 'N/A';
    };

    const mahaName = getPlanetName(current, 'maha');
    const antarName = getPlanetName(current, 'antar');

    return (
        <View>
            <View style={{ backgroundColor: '#FFF5E0', borderRadius: 40, padding: 32, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 40, elevation: 2 }}>
                <Text style={{ color: '#FF4D00', fontWeight: '900', fontSize: 10, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 24 }}>Current Active Dasha</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ color: '#111827', fontWeight: '900', fontSize: 30, textTransform: 'uppercase', letterSpacing: -1 }}>{mahaName}</Text>
                        <Text style={{ color: '#EA580C', fontWeight: '900', fontSize: 10, textTransform: 'uppercase', marginTop: 4 }}>Major Lord</Text>
                    </View>
                    <View style={{ width: 48, height: 48, backgroundColor: 'white', borderRadius: 24, alignItems: 'center', justifyContent: 'center', elevation: 2 }}>
                        <Zap color="#FF4D00" size={24} />
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: '#111827', fontWeight: '900', fontSize: 24, textTransform: 'uppercase', letterSpacing: -1 }}>{antarName}</Text>
                        <Text style={{ color: '#EA580C', fontWeight: '900', fontSize: 10, textTransform: 'uppercase', marginTop: 4 }}>Minor Lord</Text>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 28, marginTop: 12 }}>
                <View style={{ backgroundColor: '#FF4D00', width: 4, height: 20, borderRadius: 2, marginRight: 12 }} />
                <Text style={{ color: '#111827', fontWeight: '900', fontSize: 20, letterSpacing: -0.5 }}>Vimshottari Timeline</Text>
            </View>

            <View style={{ paddingLeft: 4 }}>
                {Array.isArray(major) ? major.slice(0, 10).map((d: any, i: number) => {
                    const dName = d.mahadasha || d.planet || 'N/A';
                    const isActive = i === 0; // Assuming first one is current or based on date
                    
                    const getPlanetInfo = (name: string) => {
                        const n = name.toLowerCase();
                        if (n.includes('sun') || n.includes('surya')) return { icon: '☀️', color: '#F59E0B' };
                        if (n.includes('moon') || n.includes('chandra')) return { icon: '🌙', color: '#94A3B8' };
                        if (n.includes('mars') || n.includes('mangal')) return { icon: '🔴', color: '#EF4444' };
                        if (n.includes('merc') || n.includes('budh')) return { icon: '🟢', color: '#10B981' };
                        if (n.includes('jup') || n.includes('guru')) return { icon: '🟡', color: '#EAB308' };
                        if (n.includes('ven') || n.includes('shukra')) return { icon: '💎', color: '#EC4899' };
                        if (n.includes('sat') || n.includes('shani')) return { icon: '🪐', color: '#475569' };
                        if (n.includes('rah')) return { icon: '🌑', color: '#1E293B' };
                        if (n.includes('ket')) return { icon: '☄️', color: '#78350F' };
                        return { icon: '✨', color: '#FF4D00' };
                    };

                    const info = getPlanetInfo(dName);

                    return (
                        <View key={i} style={{ flexDirection: 'row', position: 'relative' }}>
                            {/* Vertical Stepper Line */}
                            <View style={{ alignItems: 'center', width: 40 }}>
                                <View style={{ 
                                    width: 32, 
                                    height: 32, 
                                    borderRadius: 12, 
                                    backgroundColor: isActive ? '#FF4D00' : 'white', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    zIndex: 2,
                                    borderWidth: 2,
                                    borderColor: isActive ? '#FF4D00' : '#F1F5F9',
                                    shadowColor: isActive ? '#FF4D00' : '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: isActive ? 0.3 : 0.05,
                                    shadowRadius: 8,
                                    elevation: isActive ? 8 : 2
                                }}>
                                    <Text style={{ fontSize: 14 }}>{info.icon}</Text>
                                </View>
                                {i < (major.length - 1) && i < 9 && (
                                    <View style={{ 
                                        width: 2, 
                                        flex: 1, 
                                        backgroundColor: isActive ? '#FF4D00' : '#F1F5F9',
                                        opacity: isActive ? 0.5 : 1,
                                        marginVertical: 4,
                                        borderRadius: 1
                                    }} />
                                )}
                            </View>

                            {/* Content Card */}
                            <View style={{ 
                                flex: 1, 
                                marginLeft: 16, 
                                marginBottom: 24, 
                                backgroundColor: isActive ? '#FFF' : '#FFF', 
                                padding: 20, 
                                borderRadius: 28,
                                borderWidth: 1,
                                borderColor: isActive ? '#FFEDD5' : '#F8FAFC',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.03,
                                shadowRadius: 10,
                                elevation: 1
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <Text style={{ fontWeight: '900', fontSize: 18, color: isActive ? '#FF4D00' : '#111827', letterSpacing: -0.5 }}>{dName}</Text>
                                    {isActive && (
                                        <View style={{ backgroundColor: '#F0FDF4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#DCFCE7' }}>
                                            <Text style={{ color: '#16A34A', fontSize: 8, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 }}>Active Now</Text>
                                        </View>
                                    )}
                                </View>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Calendar size={12} color="#94A3B8" />
                                    <Text style={{ color: '#64748B', fontWeight: '700', fontSize: 12, marginLeft: 6 }}>{d.start} — {d.end}</Text>
                                </View>

                                {isActive && (
                                    <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F8FAFC' }}>
                                        <Text style={{ color: '#94A3B8', fontSize: 10, fontWeight: '600', fontStyle: 'italic' }}>This planetary period governs your current celestial path.</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    );
                }) : (
                    <View style={{ padding: 40, alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 32, borderStyle: 'dashed', borderWidth: 2, borderColor: '#E2E8F0' }}>
                        <Zap size={32} color="#CBD5E1" strokeWidth={1.5} />
                        <Text style={{ color: '#94A3B8', textAlign: 'center', marginTop: 12, fontWeight: '700', fontSize: 13 }}>
                            Timeline data is currently aligning...
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

function PredictionsView({ data }: { data: any }) {
    if (!data) return null;
    const formatReport = (report: any) => {
        if (!report) return null;
        if (Array.isArray(report)) return report.join(' ');
        if (typeof report === 'string') return report;
        if (report.report && Array.isArray(report.report)) return report.report.join(' ');
        if (report.report) return report.report;
        return null;
    };

    return (
        <View>
            <ReportItem 
                title="Character Prediction" 
                icon="🧘"
                content={formatReport(data.character) || "Your personality is deeply influenced by the alignment of your ascendant and planetary positions at birth, shaping a unique spiritual and mental aura."} 
            />
            <ReportItem 
                title="Gemstone Guidance" 
                icon="💎"
                content={data.gemstone?.life_gem ? `Life Gem: ${data.gemstone.life_gem.name} - ${data.gemstone.life_gem.gem_report}` : 'Analyzing your celestial minerals... Wear for overall vitality and divine protection.'} 
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
        <View style={{ backgroundColor: color, borderRadius: 24, padding: 16, width: '48%', marginBottom: 16, borderWidth: 1, borderColor: 'white', elevation: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <Text style={{ fontSize: 20 }}>{icon}</Text>
                <Check size={14} color="rgba(0,0,0,0.1)" />
            </View>
            <Text style={{ color: '#9CA3AF', fontSize: 9, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{label}</Text>
            <Text style={{ color: '#111827', fontWeight: '900', fontSize: 13 }} numberOfLines={1}>{value}</Text>
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
        <View style={{ marginBottom: 32, backgroundColor: 'white', borderWidth: 1, borderColor: '#F3F4F6', padding: 32, borderRadius: 40, elevation: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <View style={{ backgroundColor: '#FFF7ED', width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                    <Text style={{ fontSize: 24 }}>{icon}</Text>
                </View>
                <Text style={{ color: '#111827', fontWeight: '900', fontSize: 20 }}>{title}</Text>
            </View>
            <Text style={{ color: '#4B5563', lineHeight: 28, fontSize: 14, fontStyle: 'italic' }}>"{content}"</Text>
        </View>
    );
}
