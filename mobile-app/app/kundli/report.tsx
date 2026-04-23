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
  Check,
  Calendar
} from 'lucide-react-native';
import { SvgXml } from 'react-native-svg';
import { api } from '../../lib/api';
import { LinearGradient } from 'expo-linear-gradient';
import { useSidebar } from '../../context/SidebarContext';

const { width, height } = Dimensions.get('window');

export default function KundliReportScreen() {
    const { toggle } = useSidebar();
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [reportData, setReportData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchKundli = async () => {
        console.log('[Report] fetchKundli started');
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

            console.log('[Report] Calling API with:', JSON.stringify(apiPayload));
            const result = await api.astrology.getKundliData(apiPayload);
            console.log('[Report] API Response Success:', result?.success);

            if (result && result.success) {
                setReportData(result.data);
                console.log('[Report] Data keys received:', Object.keys(result.data));
            } else {
                setError('Vedic server returned an error. Please try again.');
            }
        } catch (err: any) {
            console.error('[Report] Fetch Error:', err);
            setError(err.message || 'Celestial sync failed. Check connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.dob && params.tob && !reportData && !error) {
            fetchKundli();
        }
    }, [params.dob, params.tob]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#FF4D00" />
                <Text style={styles.loadingText}>Calculating Karma...</Text>
                <Text style={styles.loadingSub}>Syncing with Celestial Planes</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Info size={48} color="#EF4444" />
                <Text style={styles.errorText}>Grah Dosh Detected</Text>
                <Text style={styles.errorSub}>{error}</Text>
                <TouchableOpacity onPress={fetchKundli} style={styles.retryBtn}>
                    <Text style={styles.retryText}>Retry Sync</Text>
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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <LinearGradient 
                colors={['#FF4D00', '#FF8C00']} 
                style={styles.header}
            >
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.headerSubtitle}>Vedic Insights</Text>
                        <Text style={styles.headerTitle}>{params.name || 'Your Chart'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => toggle(true)} style={styles.iconBtn}>
                        <Menu color="white" size={20} />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabContainer}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => setActiveTab(tab.id)}
                            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
                        >
                            <tab.icon size={16} color={activeTab === tab.id ? '#FF4D00' : 'rgba(255,255,255,0.7)'} />
                            {activeTab === tab.id && <Text style={styles.activeTabText}>{tab.label}</Text>}
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>

            <ScrollView 
                style={{ flex: 1, backgroundColor: '#FDFCFB' }}
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {reportData && activeTab === 'dashboard' && <DashboardView data={reportData} />}
                {reportData && activeTab === 'charts' && <ChartsView data={reportData} />}
                {reportData && activeTab === 'dasha' && <DashaView data={reportData} />}
                {reportData && activeTab === 'predictions' && <PredictionsView data={reportData} />}
                
                {/* Fallback if no data keys found */}
                {reportData && Object.keys(reportData).length === 0 && (
                    <Text style={{ textAlign: 'center', color: '#9CA3AF', marginTop: 40 }}>No celestial data found in response.</Text>
                )}
            </ScrollView>
        </View>
    );
}

function DashboardView({ data }: { data: any }) {
    if (!data) return null;
    const p = data.panchang || {};
    const core = data.core || {};
    
    const getVal = (obj: any, key: string) => {
        if (!obj) return "N/A";
        if (obj.error) return "Error";
        
        const val = obj[key] || obj[key.charAt(0).toUpperCase() + key.slice(1)] || obj[key.toUpperCase()];
        if (val === undefined || val === null) return "N/A";
        
        if (typeof val === 'string') return val;
        if (typeof val === 'number') return val.toString();
        
        return val.details?.value || val.name || val.value || "N/A";
    };

    return (
        <View>
            <View style={styles.quickStats}>
                <StatCard emoji="🏹" label="Ascendant" value={getVal(core, 'ascendant')} />
                <StatCard emoji="🦁" label="Moon Sign" value={getVal(core, 'sign')} />
                <StatCard emoji="✨" label="Star Lord" value={getVal(p, 'nakshatra_lord')} />
            </View>

            <SectionTitle title="Birth Panchang" />
            <View style={styles.grid}>
                <InfoCard label="Tithi" value={getVal(p, 'tithi')} color="#FFF7ED" icon="🌑" />
                <InfoCard label="Nakshatra" value={getVal(p, 'nakshatra')} color="#EFF6FF" icon="⭐" />
                <InfoCard label="Yog" value={getVal(p, 'yoga')} color="#FAF5FF" icon="🧘" />
                <InfoCard label="Karan" value={getVal(p, 'karan')} color="#F0FDF4" icon="🌀" />
            </View>

            <View style={styles.coreCard}>
                <SectionTitle title="Astro Core Metrics" />
                <TableRow label="Varna" value={getVal(core, 'varna')} />
                <TableRow label="Vashya" value={getVal(core, 'vashya')} />
                <TableRow label="Yoni" value={getVal(core, 'yoni')} />
                <TableRow label="Gan" value={getVal(core, 'gan')} />
                <TableRow label="Nadi" value={getVal(core, 'nadi')} />
            </View>
        </View>
    );
}

function ChartsView({ data }: { data: any }) {
    if (!data) return null;
    return (
        <View>
            <ChartFrame title="Birth Chart (Lagna - D1)" svg={data.chart_d1} />
            <ChartFrame title="Navamsa Chart (D9)" svg={data.chart_d9} />
        </View>
    );
}

function DashaView({ data }: { data: any }) {
    if (!data) return null;
    const current = data.current_dasha || {};
    const major = data.dasha || [];
    
    const getPlanet = (obj: any) => {
        if (!obj) return 'N/A';
        const target = obj.major || obj.minor || obj;
        return target.planet || target.mahadasha || target.antardasha || target.name || 'N/A';
    };

    const mahaName = getPlanet(current.major || current);
    const antarName = getPlanet(current.minor || current);

    return (
        <View>
            <View style={styles.activeDashaCard}>
                <Text style={styles.cardTag}>Active Dasha</Text>
                <View style={styles.dashaContent}>
                    <View>
                        <Text style={styles.dashaMain}>{mahaName}</Text>
                        <Text style={styles.dashaSub}>Major Lord</Text>
                    </View>
                    <Zap color="#FF4D00" size={24} />
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.dashaMain}>{antarName}</Text>
                        <Text style={styles.dashaSub}>Minor Lord</Text>
                    </View>
                </View>
            </View>

            <SectionTitle title="Vimshottari Timeline" />
            {major && Array.isArray(major) && major.slice(0, 10).map((d: any, i: number) => {
                 const dName = d.mahadasha || d.planet || d.name || 'N/A';
                 return <TimelineItem key={i} data={d} dName={dName} isActive={i === 0} isLast={i === 9} />;
            })}
        </View>
    );
}

function PredictionsView({ data }: { data: any }) {
    if (!data) return null;
    
    const format = (r: any) => {
        if (!r) return null;
        if (r.error) return `Feature Unavailable: ${r.detail || 'Access Restricted'}`;
        return r.report || r.manglik_report || r.toString();
    };

    const lifeGem = data.gemstone?.LIFE || data.gemstone?.life_gem || {};
    const gemContent = lifeGem.name ? `${lifeGem.name}: ${lifeGem.gem_report}` : "Wear gemstones for divine protection.";

    return (
        <View>
            <ReportItem 
                title="Character" 
                icon="🧘" 
                content={format(data.character) || "Your personality is uniquely shaped by celestial alignments."} 
            />
            <ReportItem 
                title="Gemstone" 
                icon="💎" 
                content={gemContent} 
            />
            <ReportItem 
                title="Manglik" 
                icon="🔥" 
                content={format(data.manglik) || "Neutral Manglik profile."} 
            />
            <ReportItem 
                title="Yoga Report" 
                icon="🧘‍♀️" 
                content={format(data.yoga_report) || "Special planetary combinations in your chart."} 
            />
        </View>
    );
}

// Reusable Components
const StatCard = ({ emoji, label, value }: any) => (
    <View style={styles.statCard}>
        <Text style={{ fontSize: 24 }}>{emoji}</Text>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value || 'N/A'}</Text>
    </View>
);

const InfoCard = ({ label, value, color, icon }: any) => (
    <View style={[styles.infoCard, { backgroundColor: color }]}>
        <Text style={{ fontSize: 20, marginBottom: 8 }}>{icon}</Text>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const TableRow = ({ label, value }: any) => (
    <View style={styles.tableRow}>
        <Text style={styles.tableLabel}>{label}</Text>
        <Text style={styles.tableValue}>{value}</Text>
    </View>
);

const ChartFrame = ({ title, svg }: any) => (
    <View style={{ marginBottom: 32 }}>
        <SectionTitle title={title} />
        <View style={styles.chartContainer}>
            {svg ? <SvgXml xml={svg} width={width - 80} height={width - 80} /> : <Text style={{ color: '#9CA3AF' }}>Loading Chart...</Text>}
        </View>
    </View>
);

const TimelineItem = ({ data, dName, isActive, isLast }: any) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', width: 40 }}>
                <View style={[styles.timelineDot, isActive && styles.activeDot]}>
                    <Text style={{ fontSize: 12 }}>{isActive ? '✨' : '💫'}</Text>
                </View>
                {!isLast && <View style={[styles.timelineLine, isActive && { backgroundColor: '#FF4D00' }]} />}
            </View>
            <View style={[styles.timelineCard, isActive && styles.activeTimelineCard]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.timelineTitle, isActive && { color: '#FF4D00' }]}>{dName}</Text>
                    {isActive && <Text style={styles.activeLabel}>Active</Text>}
                </View>
                <Text style={styles.timelineDate}>{data.start} — {data.end}</Text>
            </View>
        </View>
    );
};

const ReportItem = ({ title, content, icon }: any) => (
    <View style={styles.reportItem}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 20, marginRight: 12 }}>{icon}</Text>
            <Text style={styles.reportTitle}>{title}</Text>
        </View>
        <Text style={styles.reportContent}>{content}</Text>
    </View>
);

const SectionTitle = ({ title }: { title: string }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ width: 4, height: 16, backgroundColor: '#FF4D00', borderRadius: 2, marginRight: 8 }} />
        <Text style={{ color: '#111827', fontWeight: '900', fontSize: 16 }}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    center: { flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 40 },
    loadingText: { color: '#111827', fontSize: 18, fontWeight: '900', marginTop: 20 },
    loadingSub: { color: '#9CA3AF', fontSize: 10, fontWeight: '900', textTransform: 'uppercase', marginTop: 8, letterSpacing: 2 },
    errorText: { color: '#111827', fontSize: 18, fontWeight: '900', marginTop: 20 },
    errorSub: { color: '#6B7280', textAlign: 'center', marginTop: 8, marginBottom: 24 },
    retryBtn: { backgroundColor: '#FF4D00', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 16 },
    retryText: { color: 'white', fontWeight: '900', textTransform: 'uppercase' },
    header: { paddingTop: 60, paddingBottom: 30, paddingHorizontal: 20, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, elevation: 10 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    headerTitle: { color: 'white', fontSize: 20, fontWeight: '900' },
    headerSubtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 2 },
    iconBtn: { backgroundColor: 'rgba(255,255,255,0.2)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    tabContainer: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 20, padding: 4 },
    tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 16 },
    activeTab: { backgroundColor: 'white' },
    activeTabText: { marginLeft: 8, color: '#FF4D00', fontWeight: '900', fontSize: 10, textTransform: 'uppercase' },
    quickStats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    statCard: { flex: 1, backgroundColor: 'white', padding: 15, borderRadius: 20, alignItems: 'center', marginHorizontal: 4, elevation: 3 },
    statLabel: { color: '#94A3B8', fontSize: 8, fontWeight: '900', textTransform: 'uppercase', marginTop: 4 },
    statValue: { color: '#111827', fontSize: 12, fontWeight: '900' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    infoCard: { width: '48%', padding: 16, borderRadius: 20, marginBottom: 15, elevation: 2 },
    infoLabel: { color: '#9CA3AF', fontSize: 8, fontWeight: '900', textTransform: 'uppercase' },
    infoValue: { color: '#111827', fontSize: 13, fontWeight: '900' },
    coreCard: { backgroundColor: 'white', padding: 20, borderRadius: 25, marginTop: 10, elevation: 2 },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
    tableLabel: { color: '#94A3B8', fontSize: 9, fontWeight: '900', textTransform: 'uppercase' },
    tableValue: { color: '#111827', fontSize: 12, fontWeight: '900' },
    chartContainer: { backgroundColor: 'white', padding: 15, borderRadius: 25, elevation: 5, alignItems: 'center' },
    activeDashaCard: { backgroundColor: '#FFF7ED', padding: 20, borderRadius: 25, marginBottom: 30, borderWidth: 1, borderColor: '#FFEDD5' },
    cardTag: { color: '#FF4D00', fontWeight: '900', fontSize: 8, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 },
    dashaContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    dashaMain: { color: '#111827', fontSize: 22, fontWeight: '900' },
    dashaSub: { color: '#94A3B8', fontSize: 8, fontWeight: '900', textTransform: 'uppercase' },
    timelineDot: { width: 30, height: 30, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', zIndex: 2, elevation: 2 },
    activeDot: { backgroundColor: '#FF4D00' },
    timelineLine: { width: 2, flex: 1, backgroundColor: '#F1F5F9' },
    timelineCard: { flex: 1, marginLeft: 15, marginBottom: 20, backgroundColor: 'white', padding: 15, borderRadius: 20, elevation: 1 },
    activeTimelineCard: { borderColor: '#FFEDD5', borderWidth: 1 },
    timelineTitle: { color: '#111827', fontWeight: '900', fontSize: 15 },
    timelineDate: { color: '#94A3B8', fontSize: 10, fontWeight: '600' },
    activeLabel: { backgroundColor: '#F0FDF4', color: '#16A34A', fontSize: 8, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
    reportItem: { backgroundColor: 'white', padding: 20, borderRadius: 25, marginBottom: 15, elevation: 2 },
    reportTitle: { color: '#111827', fontSize: 16, fontWeight: '900' },
    reportContent: { color: '#64748B', fontSize: 13, lineHeight: 20 }
});
