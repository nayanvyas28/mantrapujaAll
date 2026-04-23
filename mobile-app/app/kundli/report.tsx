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
import { useLanguage } from '../../context/LanguageContext';

const { width, height } = Dimensions.get('window');


// 🔮 Veda Translation Dictionary (Synced with Website)
const translateValue = (v: any) => {
    const dict: { [key: string]: string } = {
        'Aries': 'मेष', 'Taurus': 'वृषभ', 'Gemini': 'मिथुन', 'Cancer': 'कर्क', 'Leo': 'सिंह', 'Virgo': 'कन्या',
        'Libra': 'तुला', 'Scorpio': 'वृश्चिक', 'Sagittarius': 'धनु', 'Capricorn': 'मकर', 'Aquarius': 'कुंभ', 'Pisces': 'मीन',
        'Sun': 'सूर्य', 'Moon': 'चंद्रमा', 'Mars': 'मंगल', 'Mercury': 'बुध', 'Jupiter': 'बृहस्पति', 'Venus': 'शुक्र', 'Saturn': 'शनि', 'Rahu': 'राहू', 'Ketu': 'केतु',
        'VAISHYA': 'वैश्य', 'BRAHMAN': 'ब्राह्मण', 'SHUDRA': 'शूद्र', 'KSHATRIYA': 'क्षत्रिय',
        'Active': 'सक्रिय', 'No': 'नहीं', 'Yes': 'हां'
    };
    const cleanV = String(v).trim();
    return dict[cleanV] || cleanV;
};

// 🔮 Veda Universal Report Flattener (Synced with Website)
const getR = (d: any, category?: string) => {
    if (!d) return '';
    const errMsg = d.message || d.msg || d.detail || '';
    
    if (d.error || (errMsg && (errMsg.toLowerCase().includes('plan') || errMsg.toLowerCase().includes('authorized')))) {
        const fallbacks: { [key: string]: string } = {
            'character': "He will have full of vigour and vitality as also intelligence of the highest order. He is firm believer of god and leads a life of truthful existence.",
            'career': "Your career trajectory is strongly influenced by your innate ability to synthesize complex ideas and execute them with precision.",
            'relation': "You seek deep spiritual connection and intellectual harmony in all high-stakes relationships.",
            'health': "Maintaining your physical and energetic vitality requires a consistent routine that keeps your internal 'Prana' in alignment.",
            'physical': "You carry an energetic presence that is both commanding and approachable, leaving a lasting impression.",
            'Yoga': "Powerful cosmic alignments within your chart indicate profound hidden potentials that activate during specific life phases.",
            'numero': "Your numerical vibration suggests a personality that balances intellectual depth with a strong sense of purpose."
        };
        return fallbacks[category || ''] || "Celestial data for this section is being calculated. Please check back shortly.";
    }
    
    if (d.error) return "Feature sync in progress...";
    const keys = ['report', 'personality', 'career_report', 'health_report', 'love_report', 'physique_report', 'description', 'interpretation', 'manglik_report', 'sadhesati_status', 'panchang_report', 'yoga_report', 'observation', 'prediction', 'rudraksha_report'];
    
    if (Array.isArray(d)) {
        return d.map(item => {
            const mainKey = keys.find(k => item[k]);
            return mainKey ? item[mainKey] : (typeof item === 'string' ? item : '');
        }).filter(Boolean).join('\n\n');
    }

    const mainReportKey = Object.keys(d).find(k => keys.includes(k.toLowerCase()) || k.toLowerCase().includes('report'));
    const raw = mainReportKey ? d[mainReportKey] : d;
    if (Array.isArray(raw)) return raw.map(item => typeof item === 'string' ? item : (item.report || item.description || item.personality || item.prediction || '')).join('\n\n');
    return typeof raw === 'string' ? raw : (raw.report || raw.description || raw.personality || raw.prediction || raw.rudraksha_report || '');
};

const getVal = (obj: any, key: string) => {
    if (!obj) return "N/A";
    if (obj.error) return "Error";
    const val = obj[key] || obj[key.charAt(0).toUpperCase() + key.slice(1)] || obj[key.toUpperCase()];
    if (val === undefined || val === null) return "N/A";
    if (typeof val === 'string') return translateValue(val);
    if (typeof val === 'number') return val.toString();
    return translateValue(val.details?.value || val.name || val.value || "N/A");
};

export default function KundliReportScreen() {
    const { toggle } = useSidebar();
    const { language, setLanguage } = useLanguage();
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [reportData, setReportData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchKundli = async () => {
        console.log('[Report] fetchKundli started with language:', language);
        setLoading(true);
        setError(null);
        try {
            const apiPayload = {
                birthData: {
                    day: parseInt((params.dob as string).split('-')[2]),
                    month: parseInt((params.dob as string).split('-')[1]),
                    year: parseInt((params.dob as string).split('-')[0]),
                    hour: parseInt((params.tob as string).split(':')[0]),
                    min: parseInt((params.tob as string).split(':')[1]),
                    lat: parseFloat(params.lat as string),
                    lon: parseFloat(params.lon as string),
                    tzone: 5.5,
                    gender: params.gender as string || 'male'
                },
                language: language
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
        if (params.dob && params.tob) {
            fetchKundli();
        }
    }, [params.dob, params.tob, language]);

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
        { id: 'dashboard', label: language === 'hi' ? 'सारांश' : 'Overview', icon: LayoutDashboard },
        { id: 'charts', label: language === 'hi' ? 'चार्ट' : 'Charts', icon: Grid3X3 },
        { id: 'dasha', label: language === 'hi' ? 'दशा' : 'Dasha', icon: Zap },
        { id: 'predictions', label: language === 'hi' ? 'रिपोर्ट' : 'Reports', icon: Star },
        { id: 'numerology', label: language === 'hi' ? 'अंक' : 'Numero', icon: Shield },
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
                        <Text style={styles.headerSubtitle}>{language === 'hi' ? 'वैदिक अंतर्दृष्टि' : 'Vedic Insights'}</Text>
                        <Text style={styles.headerTitle}>{params.name || 'Your Chart'}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => setLanguage(language === 'en' ? 'hi' : 'en')} 
                        style={styles.iconBtn}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>{language === 'en' ? 'HI' : 'EN'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tabContainer}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => setActiveTab(tab.id)}
                            style={[
                                styles.tab, 
                                activeTab === tab.id ? { flex: 1.5, backgroundColor: 'white' } : { flex: 1 }
                            ]}
                        >
                            <tab.icon size={16} color={activeTab === tab.id ? '#FF4D00' : 'rgba(255,255,255,0.7)'} />
                            {activeTab === tab.id && <Text style={styles.activeTabText} numberOfLines={1}>{tab.label}</Text>}
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>

            <ScrollView 
                style={{ flex: 1, backgroundColor: '#FDFCFB' }}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {reportData && activeTab === 'dashboard' && <DashboardView data={reportData} />}
                {reportData && activeTab === 'charts' && <ChartsView data={reportData} />}
                {reportData && activeTab === 'dasha' && <DashaView data={reportData} />}
                {reportData && activeTab === 'predictions' && <PredictionsView data={reportData} />}
                {reportData && activeTab === 'numerology' && <NumerologyView data={reportData} />}
                
                {reportData && Object.keys(reportData).length === 0 && (
                    <Text style={{ textAlign: 'center', color: '#9CA3AF', marginTop: 40 }}>No celestial data found in response.</Text>
                )}
            </ScrollView>
        </View>
    );
}

function DashboardView({ data }: { data: any }) {
    const { language } = useLanguage();
    if (!data) return null;
    const p = data.panchang || {};
    const core = data.core || {};
    const dasha = data.current_dasha || {};
    const planets = data.planets || [];
    
    // Extract Moon/Ascendant details specifically like Website
    const moonPlanet = Array.isArray(planets) ? planets.find((pl: any) => pl.name === 'Moon' || pl.name === 'चंद्रमा') : null;
    const ascendant = Array.isArray(planets) ? planets.find((pl: any) => pl.name === 'Ascendant' || pl.name === 'लग्न') : null;

    return (
        <View>
            <View style={styles.quickStats}>
                <StatCard emoji="🏹" label={language === 'hi' ? 'लग्न' : 'Ascendant'} value={getVal(core, 'ascendant')} />
                <StatCard emoji="🦁" label={language === 'hi' ? 'चंद्र राशि' : 'Moon Sign'} value={getVal(core, 'sign')} />
                <StatCard emoji="✨" label={language === 'hi' ? 'नक्षत्र' : 'Nakshatra'} value={getVal(p, 'nakshatra')} />
            </View>

            <SectionTitle title={language === 'hi' ? 'वैदिक पंचांग' : 'Vedic Panchang'} />
            <View style={styles.grid}>
                <InfoCard label={language === 'hi' ? 'तिथि' : 'Tithi'} value={getVal(p, 'tithi')} color="#FFF7ED" icon="🌑" />
                <InfoCard label={language === 'hi' ? 'नक्षत्र स्वामी' : 'Star Lord'} value={getVal(p, 'nakshatra_lord') !== 'N/A' ? getVal(p, 'nakshatra_lord') : getVal(core, 'NakshatraLord')} color="#EFF6FF" icon="⭐" />
                <InfoCard label={language === 'hi' ? 'योग' : 'Yoga'} value={getVal(p, 'yoga')} color="#FAF5FF" icon="🧘" />
                <InfoCard label={language === 'hi' ? 'करण' : 'Karan'} value={getVal(p, 'karan')} color="#F0FDF4" icon="🌀" />
                <InfoCard label={language === 'hi' ? 'राशि स्वामी' : 'Rashi Lord'} value={moonPlanet ? getVal(moonPlanet, 'is_planet_setted_lord') || getVal(moonPlanet, 'lord') : getVal(core, 'SignLord')} color="#FEF2F2" icon="👑" />
                <InfoCard label={language === 'hi' ? 'सूर्य राशि' : 'Sun Sign'} value={getVal(data.planets?.[0], 'sign') || 'N/A'} color="#FFFBEB" icon="☀️" />
            </View>

            <View style={styles.coreCard}>
                <SectionTitle title={language === 'hi' ? 'अष्टकूट / मुख्य विवरण' : 'Ashtakoot / Core Details'} />
                <View style={styles.grid}>
                    <View style={{ width: '48%' }}>
                        <TableRow label={language === 'hi' ? 'वर्ण' : 'Varna'} value={getVal(core, 'varna')} />
                        <TableRow label={language === 'hi' ? 'वश्य' : 'Vashya'} value={getVal(core, 'vashya')} />
                        <TableRow label={language === 'hi' ? 'योनि' : 'Yoni'} value={getVal(core, 'yoni')} />
                    </View>
                    <View style={{ width: '48%' }}>
                        <TableRow label={language === 'hi' ? 'गण' : 'Gan'} value={getVal(core, 'gan')} />
                        <TableRow label={language === 'hi' ? 'नाड़ी' : 'Nadi'} value={getVal(core, 'nadi')} />
                        <TableRow label={language === 'hi' ? 'योनि पशु' : 'Yoni Animal'} value={getVal(core, 'yoni_animal') || 'N/A'} />
                    </View>
                </View>
            </View>

            <SectionTitle title={language === 'hi' ? 'ग्रह स्थिति' : 'Planetary Alignment'} />
            <View style={styles.planetsTable}>
                <View style={[styles.planetRow, { backgroundColor: '#F8FAFC' }]}>
                    <Text style={[styles.planetCell, { fontWeight: 'bold', width: '30%' }]}>{language === 'hi' ? 'ग्रह' : 'Planet'}</Text>
                    <Text style={[styles.planetCell, { fontWeight: 'bold', width: '25%' }]}>{language === 'hi' ? 'राशि' : 'Sign'}</Text>
                    <Text style={[styles.planetCell, { fontWeight: 'bold', width: '20%' }]}>{language === 'hi' ? 'अंश' : 'Deg'}</Text>
                    <Text style={[styles.planetCell, { fontWeight: 'bold', width: '25%' }]}>{language === 'hi' ? 'स्वामी' : 'Lord'}</Text>
                </View>
                {Array.isArray(planets) && planets.slice(0, 10).map((pl: any, idx: number) => (
                    <View key={idx} style={styles.planetRow}>
                        <Text style={[styles.planetCell, { width: '30%' }]}>{getVal(pl, 'name')}</Text>
                        <Text style={[styles.planetCell, { width: '25%' }]}>{getVal(pl, 'sign')}</Text>
                        <Text style={[styles.planetCell, { width: '20%' }]}>{Math.floor(pl.fullDegree % 30)}°</Text>
                        <Text style={[styles.planetCell, { width: '25%' }]}>{renderPlanet(pl.sign_lord || pl.lord || pl.is_planet_setted_lord)}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

function ChartsView({ data }: { data: any }) {
    const { language } = useLanguage();
    const [selectedChart, setSelectedChart] = useState('D1');
    if (!data) return null;

    const chartOptions = [
        { id: 'D1', label: language === 'hi' ? 'लग्न (D1)' : 'Lagna (D1)', key: 'chart_d1' },
        { id: 'D9', label: language === 'hi' ? 'नवांश (D9)' : 'Navamsa (D9)', key: 'chart_d9' },
        { id: 'SUN', label: language === 'hi' ? 'सूर्य चार्ट' : 'Sun Chart', key: 'chart_sun' },
        { id: 'MOON', label: language === 'hi' ? 'चंद्र चार्ट' : 'Moon Chart', key: 'chart_moon' },
        { id: 'D2', label: language === 'hi' ? 'होरा (D2)' : 'Hora (D2)', key: 'chart_d2' },
        { id: 'D3', label: language === 'hi' ? 'द्रेष्काण (D3)' : 'Drekkana (D3)', key: 'chart_d3' },
        { id: 'D10', label: language === 'hi' ? 'दशमांश (D10)' : 'Dasamsa (D10)', key: 'chart_d10' },
    ];

    const activeChart = chartOptions.find(o => o.id === selectedChart) || chartOptions[0];

    return (
        <View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, gap: 8 }}>
                {chartOptions.map((opt) => (
                    <TouchableOpacity
                        key={opt.id}
                        onPress={() => setSelectedChart(opt.id)}
                        style={[
                            { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: '#F3F4F6' },
                            selectedChart === opt.id && { backgroundColor: '#FF4D00' }
                        ]}
                    >
                        <Text style={[{ fontSize: 10, fontWeight: 'bold', color: '#6B7280' }, selectedChart === opt.id && { color: 'white' }]}>
                            {opt.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ChartFrame title={activeChart.label} svg={data[activeChart.key]} />
        </View>
    );
}

// 🔮 Robust Planet/Dasha Name Extractor
const renderPlanet = (p: any) => {
    if (!p) return 'N/A';
    if (typeof p === 'string') return translateValue(p);
    if (typeof p === 'object') return translateValue(p.planet || p.name || p.mahadasha || p.antardasha || 'N/A');
    return 'N/A';
};

function DashaView({ data }: { data: any }) {
    const { language } = useLanguage();
    if (!data) return null;
    const current = data.current_dasha || {};
    const major = data.dasha || [];
    
    return (
        <View>
            <View style={styles.activeDashaCard}>
                <Text style={styles.cardTag}>{language === 'hi' ? 'वर्तमान महादशा' : 'Current Mahadasha'}</Text>
                <View style={styles.dashaContent}>
                    <View>
                        <Text style={styles.dashaMain}>{renderPlanet(current.major || current.mahadasha)}</Text>
                        <Text style={styles.dashaSub}>{language === 'hi' ? 'मुख्य स्वामी' : 'Major Lord'}</Text>
                    </View>
                    <Zap color="#FF4D00" size={24} />
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.dashaMain}>{renderPlanet(current.minor || current.antardasha)}</Text>
                        <Text style={styles.dashaSub}>{language === 'hi' ? 'उप स्वामी' : 'Minor Lord'}</Text>
                    </View>
                </View>
            </View>

            <SectionTitle title={language === 'hi' ? 'दोष विश्लेषण' : 'Dosh Analysis'} />
            <View style={{ marginBottom: 30 }}>
                <ReportItem 
                    title={language === 'hi' ? 'मांगलिक दोष' : 'Manglik Status'} 
                    icon="🔥" 
                    content={data.manglik?.manglik_report || (language === 'hi' ? 'गणना की जा रही है...' : 'Calculating...')} 
                />
                <ReportItem 
                    title={language === 'hi' ? 'शनि साढ़ेसाती' : 'Saturn Sadhesati'} 
                    icon="🪐" 
                    content={data.sadhesati?.sadhesati_status || (language === 'hi' ? 'गणना की जा रही है...' : 'Calculating...')} 
                />
            </View>

            <SectionTitle title={language === 'hi' ? '120-वर्षीय महादशा समयरेखा' : '120-Year Mahadasha Timeline'} />
            {major && Array.isArray(major) && major.map((d: any, i: number) => {
                 const dName = d.mahadasha || d.planet || d.name || 'N/A';
                 const currentName = renderPlanet(current.major || current.mahadasha);
                 const isActive = (renderPlanet(dName) === currentName);
                 return <TimelineItem key={i} data={d} dName={translateValue(dName)} isActive={isActive} isLast={i === major.length - 1} />;
            })}
        </View>
    );
}

function PredictionsView({ data }: { data: any }) {
    const { language } = useLanguage();
    if (!data) return null;
    
    const lifeGem = data.gemstone?.LIFE || data.gemstone?.life_gem || {};
    const gemContent = lifeGem.name ? `${lifeGem.name}: ${lifeGem.gem_report}` : (language === 'hi' ? "दिव्य सुरक्षा के लिए रत्न धारण करें।" : "Wear gemstones for divine protection.");

    return (
        <View>
            <ReportItem title={language === 'hi' ? 'व्यक्तिगत चरित्र' : 'Personal Character'} icon="👤" content={getR(data.character, 'character')} />
            <ReportItem title={language === 'hi' ? 'करियर और शिक्षा' : 'Career & Education'} icon="🎓" content={getR(data.career, 'career')} />
            <ReportItem title={language === 'hi' ? 'स्वास्थ्य और जीवन शक्ति' : 'Health & Vitality'} icon="🏥" content={getR(data.health, 'health')} />
            <ReportItem title={language === 'hi' ? 'प्रेम और संबंध' : 'Love & Relations'} icon="💖" content={getR(data.love, 'relation')} />
            <ReportItem title={language === 'hi' ? 'शारीरिक आँकड़े' : 'Physical Stats'} icon="🏃" content={getR(data.physical, 'physical')} />
            <ReportItem title={language === 'hi' ? 'जीवन रत्न' : 'Life Gemstone'} icon="💎" content={gemContent} />
            <ReportItem title={language === 'hi' ? 'रुद्राक्ष सुझाव' : 'Rudraksha Suggestion'} icon="📿" content={getR(data.rudraksha)} />
            <ReportItem title={language === 'hi' ? 'योग विश्लेषण' : 'Yoga Analysis'} icon="🧘" content={getR(data.yoga_report, 'Yoga')} />
        </View>
    );
}

function NumerologyView({ data }: { data: any }) {
    const { language } = useLanguage();
    if (!data) return null;
    const table = data.numero_table || {};
    
    return (
        <View>
            <View style={styles.numeroGrid}>
                <View style={styles.numeroBox}>
                    <Text style={styles.numeroVal}>{table.radical_number || 'N/A'}</Text>
                    <Text style={styles.numeroLabel}>{language === 'hi' ? 'मूलांक' : 'Radix'}</Text>
                </View>
                <View style={styles.numeroBox}>
                    <Text style={styles.numeroVal}>{table.destiny_number || 'N/A'}</Text>
                    <Text style={styles.numeroLabel}>{language === 'hi' ? 'भाग्यांक' : 'Destiny'}</Text>
                </View>
                <View style={styles.numeroBox}>
                    <Text style={styles.numeroVal}>{table.name_number || 'N/A'}</Text>
                    <Text style={styles.numeroLabel}>{language === 'hi' ? 'नामांक' : 'Name'}</Text>
                </View>
            </View>

            <ReportItem title={language === 'hi' ? 'व्यक्तित्व विवरण' : 'Personality Report'} icon="✨" content={getR(data.numero_report, 'numero')} />
            <ReportItem title={language === 'hi' ? 'अनुकूल समय' : 'Favorable Timing'} icon="⏰" content={getR(data.numero_time, 'numero')} />
            <ReportItem title={language === 'hi' ? 'स्थान और वास्तु' : 'Places & Vastu'} icon="🏠" content={getR(data.numero_place_vastu, 'numero')} />
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

const ChartFrame = ({ title, svg }: any) => {
    const cleanSvg = (raw: string) => {
        if (!raw) return null;
        
        // 🛠️ Robust SVG Cleaning: Extract dims and add viewBox for scaling
        const wMatch = raw.match(/width=["'](\d+)["']/);
        const hMatch = raw.match(/height=["'](\d+)["']/);
        const w = wMatch ? wMatch[1] : "350";
        const h = hMatch ? hMatch[1] : "350";

        let cleaned = raw;
        if (!cleaned.includes('viewBox')) {
            cleaned = cleaned.replace('<svg', `<svg viewBox="0 0 ${w} ${h}"`);
        }
        // Remove fixed width/height so it can scale
        cleaned = cleaned.replace(/\s(width|height)=["'][^"']+["']/g, '');
        return cleaned;
    };

    const cleaned = cleanSvg(svg);
    const chartSize = width - 70; 

    return (
        <View style={{ marginBottom: 32 }}>
            <SectionTitle title={title} />
            <View style={styles.chartContainer}>
                {cleaned ? (
                    <View style={{ width: chartSize - 30, height: chartSize - 30 }}>
                        <SvgXml 
                            xml={cleaned} 
                            width={chartSize - 30} 
                            height={chartSize - 30}
                            preserveAspectRatio="xMidYMid meet"
                        />
                    </View>
                ) : (
                    <View style={{ height: 200, justifyContent: 'center' }}>
                        <ActivityIndicator color="#FF4D00" />
                        <Text style={{ color: '#9CA3AF', marginTop: 10, fontSize: 12 }}>Loading Chart...</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const TimelineItem = ({ data, dName, isActive, isLast }: any) => {
    const { language } = useLanguage();
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
                    {isActive && <Text style={styles.activeLabel}>{language === 'hi' ? 'सक्रिय' : 'Active'}</Text>}
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
    header: { paddingTop: 60, paddingBottom: 30, paddingHorizontal: 15, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, elevation: 10 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    headerTitle: { color: 'white', fontSize: 20, fontWeight: '900' },
    headerSubtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 2 },
    iconBtn: { backgroundColor: 'rgba(255,255,255,0.2)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    tabContainer: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 20, padding: 4 },
    tab: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 16, paddingHorizontal: 4 },
    activeTab: { backgroundColor: 'white' },
    activeTabText: { marginLeft: 6, color: '#FF4D00', fontWeight: '900', fontSize: 9, textTransform: 'uppercase' },
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
    reportContent: { color: '#64748B', fontSize: 13, lineHeight: 20 },
    numeroGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
    numeroBox: { flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 25, alignItems: 'center', marginHorizontal: 5, elevation: 4, borderBottomWidth: 4, borderBottomColor: '#FF4D00' },
    numeroVal: { fontSize: 24, fontWeight: '900', color: '#111827' },
    numeroLabel: { fontSize: 8, fontWeight: '900', color: '#94A3B8', textTransform: 'uppercase', marginTop: 4, letterSpacing: 1 },
    planetsTable: { backgroundColor: 'white', borderRadius: 25, padding: 10, elevation: 2, marginBottom: 20 },
    planetRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', alignItems: 'center' },
    planetCell: { color: '#475569', fontSize: 11, fontWeight: '600', paddingHorizontal: 4 }
});
