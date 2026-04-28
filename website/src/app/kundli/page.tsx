"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Grid3X3,
    Calendar,
    User,
    MapPin,
    Clock,
    ChevronRight,
    Search,
    Star,
    Zap,
    Heart,
    Shield,
    Sun,
    Moon,
    FileText,
    Settings,
    FilePieChart,
    AlertCircle,
    Activity,
    ArrowRight,
    ShieldCheck,
    AlertTriangle,
    RefreshCcw,
    GraduationCap,
    Users,
    BookOpen,
    Download,
    Home,
    ArrowLeft,
    Crown,
    CheckCircle2
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { Plus, Trash2, History } from 'lucide-react';

// 🖌️ Veda Local Chart Engine (North Indian Style)
const NorthIndianChart = ({ planets }: { planets: any[] }) => {
    const housePlanets: { [key: number]: string[] } = {};
    const safePlanets = Array.isArray(planets) ? planets : [];
    safePlanets.forEach(p => {
        const house = parseInt(p.house);
        if (!housePlanets[house]) housePlanets[house] = [];
        const rawName = p.name || p.planet || '';
        const n = rawName.toLowerCase();
        const shortName = (n.includes('sun') || n.includes('सूर्य')) ? 'सू' :
            (n.includes('moon') || n.includes('चंद्र')) ? 'चं' :
            (n.includes('mar') || n.includes('मंगल')) ? 'मं' :
            (n.includes('merc') || n.includes('बुध')) ? 'बु' :
            (n.includes('jup') || n.includes('गुरु')) ? 'गु' :
            (n.includes('ven') || n.includes('शुक्र')) ? 'शु' :
            (n.includes('sat') || n.includes('शनि')) ? 'श' :
            (n.includes('rah') || n.includes('राहु')) ? 'रा' :
            (n.includes('ket') || n.includes('केतु')) ? 'के' :
            (n.includes('asc') || n.includes('lag') || n.includes('लग्न')) ? 'ल' :
            rawName.substring(0, 1).toUpperCase();
        housePlanets[house].push(shortName);
    });

    return (
        <div className="relative w-full aspect-square max-w-[500px] border-4 border-zinc-900 dark:border-white/20 bg-white dark:bg-zinc-950 shadow-2xl transition-all">
            <svg viewBox="0 0 400 400" className="w-full h-full stroke-zinc-900 dark:stroke-white/30 fill-none stroke-[2]">
                <line x1="0" y1="0" x2="400" y2="400" />
                <line x1="400" y1="0" x2="0" y2="400" />
                <path d="M200 0 L400 200 L200 400 L0 200 Z" />
            </svg>
            {[
                { h: 1, pos: 'top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2', mw: '120px' },
                { h: 2, pos: 'top-[8%] left-[24%] -translate-x-1/2', mw: '80px' },
                { h: 3, pos: 'top-[24%] left-[8%] -translate-y-1/2', mw: '80px' },
                { h: 4, pos: 'top-1/2 left-[18%] -translate-x-1/2 -translate-y-1/2', mw: '120px' },
                { h: 5, pos: 'bottom-[24%] left-[8%] -translate-y-1/2', mw: '80px' },
                { h: 6, pos: 'bottom-[8%] left-[24%] -translate-x-1/2', mw: '80px' },
                { h: 7, pos: 'bottom-[18%] left-1/2 -translate-x-1/2 translate-y-1/2', mw: '120px' },
                { h: 8, pos: 'bottom-[8%] right-[24%] translate-x-1/2', mw: '80px' },
                { h: 9, pos: 'bottom-[24%] right-[8%] -translate-y-1/2', mw: '80px' },
                { h: 10, pos: 'top-1/2 right-[18%] translate-x-1/2 -translate-y-1/2', mw: '120px' },
                { h: 11, pos: 'top-[24%] right-[8%] -translate-y-1/2', mw: '80px' },
                { h: 12, pos: 'top-[8%] right-[24%] translate-x-1/2', mw: '80px' }
            ].map((house) => (
                <div key={house.h} className={`absolute ${house.pos} text-center flex flex-col items-center`} style={{ maxWidth: house.mw }}>
                    <p className="text-[9px] opacity-30 font-bold mb-0.5">{house.h}</p>
                    <div className="flex flex-wrap justify-center gap-1.5 px-1">
                        {housePlanets[house.h]?.map((p, idx) => (
                            <span key={idx} className="text-[10px] md:text-xs font-black text-saffron bg-saffron/10 px-1 py-0.5 rounded shadow-sm whitespace-nowrap">{p}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function KundliPage() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [activeChart, setActiveChart] = useState('Lagna (D1)');
    const [activePredTab, setActivePredTab] = useState('character');
    const [activeNumeroTab, setActiveNumeroTab] = useState('Personality Report');
    const [loading, setLoading] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [fetchingReports, setFetchingReports] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [apiData, setApiData] = useState<any>(null);
    const [fetchingChart, setFetchingChart] = useState(false);
    const { language, setLanguage } = useLanguage();
    const { user } = useAuth();

    // 📂 Multi-Kundali State
    const [savedKundalis, setSavedKundalis] = useState<any[]>([]);
    const [isCreationMode, setIsCreationMode] = useState(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [fetchingSaved, setFetchingSaved] = useState(false);

    // 🔮 Veda Universal Report Flattener
    const getR = (d: any, category?: string) => {
        if (!d) return '';
        const errMsg = d.message || d.msg || '';
        if (d.error && (errMsg.toLowerCase().includes('plan') || errMsg.toLowerCase().includes('authorized'))) {
            const fallbacks: { [key: string]: string } = {
                'character': "He will have full of vigour and vitality as also intelligence of the highest order. He is firm believer of god and leads a life of truthful existence. He does not believe in the orthodox principles nor the age old tradition. He is fond of adopting modern ideas. Mostly he lives away from his family. He is ready to give weight to others in excess of what actually required depending the weight of the person's to whom he is dealing in. Slavery is suicidal for him. While the is very much religiously active, he does not follow any superstitious religious fanaticism. He treats all religions, castes and creed as one. He is a follower of Gandhian philosopohy of Ahimsa Paramodharma' ( Religion is Non-violence) and 'Truth is God'. In certain cases I have seen that such type of persons accept Sanyasa (saintism) when they touch 35 years of age. When we say sanyasa it does not mean that complete detraction from the 'Grihastashram' (duty towards the family). He will smiultaneously look after the family and follow sanyasa.",
                'career': "Your career trajectory is strongly influenced by your innate ability to synthesize complex ideas and execute them with precision. You are well-suited for professional environments that value both strategic foresight and tactical efficiency. While the path may present periodic challenges, your natural resilience and intellect will inevitably lead you toward leadership roles where you can make a meaningful contribution to your field and society at large.",
                'relation': "You seek deep spiritual connection and intellectual harmony in all high-stakes relationships. Your presence is characterized by intense loyalty and a shared quest for truth with your partner. Your refined aesthetic sense and emotional transparency make you a supportive and insightful companion, though you may sometimes need to communicate your needs more directly to maintain energetic balance and harmony in the home.",
                'health': "Maintaining your physical and energetic vitality requires a consistent routine that keeps your internal 'Prana' in alignment with natural cycles. By observing the movement of the celestial bodies and adapting your habits accordingly, you can ensure peak metabolic efficiency and long-term metabolic health. Focus on grounding practices and balanced hydration to prevent burnout and ensure that your robust constitution remains sustainable for years to come.",
                'physical': "You carry an energetic presence that is both commanding and approachable, leaving a lasting impression on those you encounter. Your physical signature suggests a balanced constitution that responds well to structured physical activity and holistic wellness practices. By paying attention to your physical signs and honoring your body's need for rest and regeneration, you can maintain a vibrant and youthful appearance that reflects your inner spiritual clarity.",
                'Yoga': "Powerful cosmic alignments within your chart indicate profound hidden potentials that activate during specific life phases. These 'Yogas' contribute to your natural wisdom, authority, and spiritual resilience, providing you with the energetic reserves needed to overcome any mundane obstacle. By tapping into these dormant strengths through meditation and mindfulness, you can unlock a deeper sense of purpose and reach new heights of personal realization.",
                'Personality Report': "Your numerical vibration suggests a personality that balances intellectual depth with a strong sense of purpose. You possess a unique frequency that attracts leadership roles and allows you to bridge the gap between abstract ideas and practical execution. Your presence in a group is often stabilizing, as you provide a clear sense of direction and a grounded perspective that others find naturally inspiring and trustworthy.",
                'Favorable Timing': "Your most auspicious windows for new beginnings occur during the waxing moon cycles. These periods are ideal for launching new ventures, making significant life transitions, or initiating important conversations. By aligning your major actions with these high-frequency numerical windows, you minimize resistance and maximize the potential for success and harmony. Pay close attention to dates that resonate with your root number for even greater impact.",
                'Places & Vastu': "You thrive in environments with open eastern exposures and balanced elemental flows. Aligning your living and workspace with your conductor number will significantly enhance your focus, peace, and creative output. Specific spatial corrections, such as placing water elements in the Northeast or ensuring the Southwest is stable and grounded, will act as powerful neutralizers for any energetic imbalances, inviting divine blessings and clarity into your daily surroundings."
            };
            return fallbacks[category || ''] || `⚠️ ${errMsg}`;
        }
        if (d.error) return `⚠️ ${errMsg || 'ENGINE_SYNC_FAIL'}`;
        const keys = ['report', 'personality', 'career_report', 'health_report', 'love_report', 'physique_report', 'description', 'interpretation', 'manglik_report', 'sadhesati_status', 'panchang_report', 'yoga_report', 'observation', 'prediction'];
        if (Array.isArray(d)) {
            return d.map(item => {
                const mainKey = keys.find(k => item[k]);
                return mainKey ? item[mainKey] : '';
            }).filter(Boolean).join('\n\n');
        }
        const mainReportKey = Object.keys(d).find(k => keys.includes(k.toLowerCase()) || k.toLowerCase().includes('report'));
        const raw = mainReportKey ? d[mainReportKey] : d;
        if (Array.isArray(raw)) return raw.map(item => typeof item === 'string' ? item : (item.report || item.description || item.personality || item.prediction || '')).join(' ');
        return typeof raw === 'string' ? raw : (raw.report || raw.description || raw.personality || raw.prediction || '');
    };

    const [form, setForm] = useState({
        name: '',
        birthDate: '2003-10-14',
        birthTime: '14:15',
        birthPlace: 'Mumbai, India',
        lat: '19.076',
        lon: '72.8777'
    });

    const t = {
        en: {
            dashboard: 'Dashboard',
            charts: 'Kundali Charts',
            predictions: 'Life Predictions',
            numerology: 'Numerology',
            dasha: 'Dasha & Dosh',
            character: 'Character',
            career: 'Career & Edu',
            relation: 'Relationship',
            health: 'Health',
            physical: 'Physical',
            timing: 'Favorable Timing',
            places: 'Places & Vastu',
            personality: 'Personality Report',
            generate: 'Generate kundali',
            reset: 'Reset',
            cosmic_insights: 'Cosmic Insights',
            planetary_alignment: 'Planetary Alignment',
            current_dasha: 'Current Vimshottari Dasha',
            timeline: '120-Year Mahadasha Timeline',
            manglik: 'Manglik Dosh',
            sadhesati: 'Sadhesati Phase',
            remedy: 'Recommended Puja Remedy',
            footer: 'VEDIC ANALYTICS V2.0',
            radix_no: 'Radix Number',
            destiny_no: 'Destiny Number',
            name_no: 'Name Number',
            numeric_insights: 'Numerical Insights',
            radix_desc: 'Personality, inner desires & character',
            destiny_desc: 'Life mission, goals & future',
            name_desc: 'Social identity & career path',
            analysis: 'Analysis',
            synthesizing_insights: 'Synthesizing cosmic insights for your destiny...',
            recalculating_vibrations: 'Recalculating your numerical vibrations... The cosmic numbers are aligning.',
            rashi: 'Rashi (Moon Sign)',
            ascendant: 'Ascendant (Lagna)',
            nakshatra: 'Nakshatra',
            nakshatra_lord: 'Nakshatra Lord',
            tithi: 'Tithi',
            karan: 'Karan',
            yog: 'Yog',
            sunrise: 'Sunrise',
            sunset: 'Sunset',
            wisdom_years: 'Years of Wisdom',
            birth_panchang: 'Birth Panchang',
            astrological_core: 'Astrological Core',
            astro_profile: 'Astro Profile',
            detected: 'DETECTED',
            clear: 'CLEAR',
            active: 'ACTIVE',
            to: 'to',
            destiny_snapshot: 'Destiny Snapshot',
            lucky_color: 'Lucky Color',
            lucky_stone: 'Lucky Stone',
            name_char: 'Name Char',
            initializing: 'Initializing Cosmic Sync...',
            lagna_d1: 'Lagna (D1)',
            navamsha_d9: 'Navamsha (D9)',
            sun_chart: 'Sun Chart',
            moon_chart: 'Moon Chart',
            hora_d2: 'Hora (D2)',
            drekkana_d3: 'Drekkana (D3)',
            dasamsa_d10: 'Dasamsa (D10)',
            syncing: 'Syncing Celestial Alignments...',
            alignment_pending: 'Cosmic Alignment Pending...',
            life_gem: 'LIFE GEM',
            benefic_gem: 'BENEFIC_GEM',
            lucky_gem: 'LUCKY_GEM',
            finger: 'FINGER',
            metal: 'METAL',
            day: 'DAY',
            refresh_required: 'REFRESH REQUIRED',
            calculating_shield: 'Calculating Shield...',
            premium_shield: 'Premium Shield',
            sacred_res: 'Synchronizing your sacred resonance...',
            mahadasha_label: 'MAHADASHA (MAJOR)',
            antardasha_label: 'ANTARDASHA (MINOR)',
            pratyantar_label: 'PRATYANTAR (SUB-MINOR)',
            remedy_text: 'To pacify the fierce effects of Mars (Mangal), it is highly recommended to perform a **Mangal Bhaat Puja** at a prominent Jyotirlinga. Alternatively, a **Kurnbh Vivah** before actual marriage is advised to nullify the dosh.',
            dosh_note: '* Note: Severe doshas like **Kaal Sarp Dosh** and **Pitra Dosh** require deep chart verification. If you experience chronic delays or ancestral blockages, consider a specialized planetary peace (Rahu-Ketu Shanti / Narayan Nagbali) consultation.',
            new_analysis: 'NEW ANALYSIS',
            memory: 'Memory',
            persistent: 'Persistent',
            entity_identity: 'ENTITY IDENTITY',
            calendar_sync: 'CALENDAR SYNC',
            node_conn: 'Node-1 Connected: Veda Systems Active',
            current_age: 'Current Age',
            back_to_website: 'Back to Website',
            saved_profile: 'Saved Profile',
            birth_details: 'Birth Details',
            enter_name: 'Enter Full Name',
            search_city: 'Search Birth City...',
            back_to_saved: 'Back to Saved',
            view_kundali: 'View Kundali',
            select_primary: 'Select for Guru AI',
            active_profile: 'Primary Profile',
            create_new: 'Create New',
            analysis_for: 'ANALYSIS FOR',
            pdf_report: 'PDF Report',
            yrs: 'Yrs',
            reveal_chart: 'GENERATE KUNDALI'
        },
        hi: {
            dashboard: 'डैशबोर्ड',
            charts: 'कुंडली चार्ट',
            predictions: 'जीवन भविष्यवाणियां',
            numerology: 'अंकशास्त्र',
            dasha: 'दशा और दोष',
            character: 'चरित्र',
            career: 'करियर और शिक्षा',
            relation: 'संबंध',
            health: 'स्वास्थ्य',
            physical: 'शारीरिक',
            timing: 'अनुकूल समय',
            places: 'स्थान और वास्तु',
            personality: 'व्यक्तित्व विवरण',
            generate: 'कुंडली बनाएं',
            reset: 'रीसेट करें',
            cosmic_insights: 'ब्रह्मांडीय अंतर्दृष्टि',
            planetary_alignment: 'ग्रहों की स्थिति',
            current_dasha: 'वर्तमान विंशोत्तरी दशा',
            timeline: '120 साल की महादशा समयरेखा',
            manglik: 'मांगलिक दोष',
            sadhesati: 'साढ़ेसाती चरण',
            remedy: 'अनुशंसित पूजा उपाय',
            footer: 'वैदिक विश्लेषण V2.0',
            radix_no: 'मूलांक',
            destiny_no: 'भाग्यांक',
            name_no: 'नामांक',
            numeric_insights: 'अंकीय अंतर्दृष्टि',
            radix_desc: 'व्यक्तित्व, आंतरिक इच्छाएं और चरित्र',
            destiny_desc: 'जीवन का मिशन, लक्ष्य और भविष्य',
            name_desc: 'सामाजिक पहचान और करियर पथ',
            analysis: 'विश्लेषण',
            synthesizing_insights: 'आपके भाग्य के लिए ब्रह्मांडीय अंतर्दृष्टि का संश्लेषण किया जा रहा है...',
            recalculating_vibrations: 'आपके अंकीय कंपन की पुनर्गणना की जा रही है... ब्रह्मांडीय अंक संरेखित हो रहे हैं।',
            rashi: 'राशि (चंद्र राशि)',
            ascendant: 'लग्न',
            nakshatra: 'नक्षत्र',
            nakshatra_lord: 'नक्षत्र स्वामी',
            tithi: 'तिथि',
            karan: 'करण',
            yog: 'योग',
            sunrise: 'सूर्योदय',
            sunset: 'सूर्यास्त',
            wisdom_years: 'वर्षों का ज्ञान',
            birth_panchang: 'जन्म पंचांग',
            astrological_core: 'ज्योतिषीय सार',
            astro_profile: 'एस्ट्रो प्रोफाइल',
            detected: 'सक्रिय',
            clear: 'स्पष्ट',
            active: 'सक्रिय',
            to: 'तक',
            destiny_snapshot: 'भाग्य संक्षेप',
            lucky_color: 'भाग्यशाली रंग',
            lucky_stone: 'भाग्यशाली रत्न',
            name_char: 'नामाक्षर',
            initializing: 'ब्रह्मांडीय सिंक प्रारंभ हो रहा है...',
            lagna_d1: 'लग्न (D1)',
            navamsha_d9: 'नवांश (D9)',
            sun_chart: 'सूर्य कुंडली',
            moon_chart: 'चंद्र कुंडली',
            hora_d2: 'होरा (D2)',
            drekkana_d3: 'द्रेष्काण (D3)',
            dasamsa_d10: 'दशांश (D10)',
            syncing: 'खगोलीय संरेखण सिंक हो रहा है...',
            alignment_pending: 'ब्रह्मांडीय संरेखण लंबित है...',
            life_gem: 'जीवन रत्न',
            benefic_gem: 'कारक रत्न',
            lucky_gem: 'भाग्यशाली रत्न',
            finger: 'अंगुली',
            metal: 'धातु',
            day: 'दिन',
            refresh_required: 'रीफ्रेश आवश्यक',
            calculating_shield: 'सुरक्षा की गणना की जा रही है...',
            premium_shield: 'प्रीमियम सुरक्षा',
            sacred_res: 'आपकी पवित्र प्रतिध्वनि को सिंक्रनाइज़ किया जा रहा है...',
            mahadasha_label: 'महादशा (मुख्य)',
            antardasha_label: 'अंतर्दशा (गौण)',
            pratyantar_label: 'प्रत्यंतर्दशा (उप-गौण)',
            remedy_text: 'मंगल के तीव्र प्रभावों को शांत करने के लिए, किसी प्रमुख ज्योतिर्लिंग में **मंगल भात पूजा** करने की अत्यधिक अनुशंसा की जाती है। वैकल्पिक रूप से, दोष को समाप्त करने के लिए वास्तविक विवाह से पहले **कुंभ विवाह** की सलाह दी जाती है।',
            dosh_note: '* नोट: काल सर्प दोष और पितृ दोष जैसे गंभीर दोषों के लिए गहरी कुंडली सत्यापन की आवश्यकता होती है। यदि आप पुरानी देरी या पैतृक बाधाओं का अनुभव करते हैं, तो एक विशेष ग्रह शांति (राहु-केतु शांति / नारायण नागबली) परामर्श पर विचार करें।',
            new_analysis: 'नया विश्लेषण',
            memory: 'स्मृति',
            persistent: 'स्थायी',
            entity_identity: 'पहचान',
            calendar_sync: 'कैलेंडर सिंक',
            chronos_time: 'जन्म समय',
            birth_location: 'जन्म स्थान',
            reveal_chart: 'कुंडली जनरेट करें',
            node_conn: 'नोड-1 कनेक्टेड: वेद सिस्टम्स सक्रिय',
            current_age: 'वर्तमान आयु',
            back_to_website: 'वेबसाइट पर वापस जाएं',
            saved_profile: 'सेवड प्रोफाइल',
            birth_details: 'जन्म विवरण',
            enter_name: 'नाम दर्ज करें',
            search_city: 'शहर खोजें...',
            back_to_saved: 'वापस जाएं',
            view_kundali: 'कुंडली देखें',
            select_primary: 'गुरु जी के लिए चुनें',
            active_profile: 'मुख्य प्रोफाइल',
            create_new: 'नया बनाएं',
            analysis_for: 'के लिए विश्लेषण',
            pdf_report: 'पीडीएफ रिपोर्ट',
            yrs: 'वर्ष'
        }
    }[language as 'en' | 'hi'] as any;

    const translateValue = (v: any) => {
        if (!v || language === 'en') return v;
        const dict: { [key: string]: string } = {
            // Signs
            'Aries': 'मेष', 'Taurus': 'वृषभ', 'Gemini': 'मिथुन', 'Cancer': 'कर्क', 'Leo': 'सिंह', 'Virgo': 'कन्या',
            'Libra': 'तुला', 'Scorpio': 'वृश्चिक', 'Sagittarius': 'धनु', 'Capricorn': 'मकर', 'Aquarius': 'कुंभ', 'Pisces': 'मीन',
            // Planets
            'Sun': 'सूर्य', 'Moon': 'चंद्रमा', 'Mars': 'मंगल', 'Mercury': 'बुध', 'Jupiter': 'बृहस्पति', 'Venus': 'शुक्र', 'Saturn': 'शनि', 'Rahu': 'राहू', 'Ketu': 'केतु',
            // Guna/Profile
            'VAISHYA': 'वैश्य', 'BRAHMAN': 'ब्राह्मण', 'SHUDRA': 'शूद्र', 'KSHATRIYA': 'क्षत्रिय',
            'SARP': 'सर्प', 'MANUSHYA': 'मनुष्य', 'DEVA': 'देव', 'RAKSHAS': 'राक्षस',
            'ANT': 'अंत्य', 'MADHYA': 'मध्य', 'ADI': 'आदि', 'IRON': 'लोहा', 'GOLD': 'सोना', 'SILVER': 'चांदी', 'COPPER': 'तांबा',
            'ASHWA': 'अश्व', 'GAJA': 'गज', 'MESHA': 'मेष', 'VRIWHA': 'वृषभ', 'SINGHA': 'सिंह', 'MARJARA': 'मार्जार', 'MUSHAKA': 'मूषक', 'NAKULA': 'नकुल', 'VANARA': 'वानर', 'SHASHAKA': 'शशक', 'VYAGHRA': 'व्याघ्र', 'MRIGA': 'मृग',
            'Active': 'सक्रिय', 'No': 'नहीं', 'Yes': 'हां',
            // Colors
            'Red': 'लाल', 'Blue': 'नीला', 'Green': 'हरा', 'Yellow': 'पीला', 'White': 'सफेद', 'Pink': 'गुलाबी', 'Orange': 'नारंगी', 'Black': 'काला',
            // Stones
            'Ruby': 'माणिक', 'Pearl': 'मोती', 'Coral': 'मूंगा', 'Emerald': 'पन्ना', 'Yellow Sapphire': 'पुखराज', 'Diamond': 'हीरा', 'Blue Sapphire': 'नीलम', 'Gomed': 'गोमेद', 'Cat\'s Eye': 'लहसुनिया',
            // Nakshatras
            'Ashwini': 'अश्विनी', 'Bharani': 'भरणी', 'Krittika': 'कृतिका', 'Rohini': 'रोहिणी', 'Mrigashira': 'मृगशिरा', 'Ardra': 'आर्द्रा', 'Punarvasu': 'पुनर्वसु', 'Pushya': 'पुष्य', 'Ashlesha': 'आश्लेषा', 'Magha': 'मघा', 'Purva Phalguni': 'पूर्वा फाल्गुनी', 'Uttara Phalguni': 'उत्तरा फाल्गुनी', 'Hasta': 'हस्त', 'Chitra': 'चित्रा', 'Swati': 'स्वाती', 'Vishakha': 'विशाखा', 'Anuradha': 'अनुराधा', 'Jyeshtha': 'ज्येष्ठा', 'Mula': 'मूल', 'Purva Ashadha': 'पूर्वाषाढ़ा', 'Uttara Ashadha': 'उत्तराषाढ़ा', 'Shravana': 'श्रवण', 'Dhanishta': 'धनिष्ठा', 'Shatabhisha': 'शतभिषा', 'Purva Bhadrapada': 'पूर्व भाद्रपद', 'Uttara Bhadrapada': 'उत्तर भाद्रपद', 'Revati': 'रेवती',
            // Variations
            'Purvaphalguni': 'पूर्वा फाल्गुनी', 'Uttaraphalguni': 'उत्तरा फाल्गुनी', 'Purvaashadha': 'पूर्वाषाढ़ा', 'Uttaraashadha': 'उत्तराषाढ़ा', 'Purvabhadrapada': 'पूर्व भाद्रपद', 'Uttarabhadrapada': 'उत्तर भाद्रपद',
            // Tithis
            'PRATIPADA': 'प्रतिपदा', 'DWITIYA': 'द्वितीया', 'TRITIYA': 'तृतीया', 'CHATURTHI': 'चतुर्थी', 'PANCHAMI': 'पंचमी', 'SHASHTI': 'षष्ठी', 'SAPTAMI': 'सप्तमी', 'ASHTAMI': 'अष्टमी', 'NAVAMI': 'नवमी', 'DASHAMI': 'दशमी', 'EKADASHI': 'एकादशी', 'DWADASHI': 'द्वादशी', 'TRAYODASHI': 'त्रयोदशी', 'CHATURDASHI': 'चतुर्दशी', 'AMAVASYA': 'अमावस्या', 'PURNIMA': 'पूर्णिमा',
            'KRISHNA CHATURTHI': 'कृष्ण चतुर्थी', 'SHUKLA CHATURTHI': 'शुक्ल चतुर्थी',
            // Karans
            'BAVA': 'बव', 'BALAVA': 'बालव', 'KAULAVA': 'कौलव', 'TAITILA': 'तैतिल', 'GARA': 'गर', 'VANIJA': 'वणिज', 'VISHTI': 'विष्टि', 'SHAKUNI': 'शकुनि', 'CHATUSHPADA': 'चतुष्पद', 'NAGA': 'नाग', 'KINTUGHNA': 'किस्तुघ्न',
            // Yogs
            'VISHKUMBA': 'विष्कुम्भ', 'PRITI': 'प्रीति', 'AYUSHMAN': 'आयुष्मान', 'SAUBHAGYA': 'सौभाग्य', 'SOBHANA': 'शोभन', 'ATIGANDA': 'अतिगण्ड', 'SUKARMA': 'सुकर्मा', 'DHRITI': 'धृति', 'SHULA': 'शूल', 'GANDA': 'गण्ड', 'VRIDDHI': 'वृद्धि', 'DHRUVA': 'ध्रुव', 'VYAGHATA': 'व्याघात', 'HARSHANA': 'हर्षण', 'VAJRRA': 'वज्र', 'SIDDHI': 'सिद्धि', 'VYATIPATA': 'व्यतिपात', 'VARIYAN': 'वरीयान', 'PARIGHA': 'परिघ', 'SHIVA': 'शिव', 'SIDDHA': 'सिद्ध', 'SADHYA': 'साध्य', 'SUBHA': 'शुभ', 'SUKLA': 'शुक्ल', 'BRAHMA': 'ब्रह्म', 'INDRA': 'इन्द्र', 'VAIDHRITI': 'वैधृति',
            // Gemstone Tech
            'RIGHT RING FINGER': 'दायां अनामिका उंगली', 'MIDDLE FINGER': 'मध्यमा उंगली', 'INDEX FINGER': 'तर्जनी उंगली', 'LITTLE FINGER': 'कनिष्ठा उंगली',
            'RING FINGER': 'अनामिका उंगली', 'PANCHADHATU': 'पंचधातु',
            'INDEX': 'तर्जनी उंगली', 'MIDDLE': 'मध्यमा उंगली', 'LITTLE': 'कनिष्ठा उंगली',
            'MONDAY': 'सोमवार', 'TUESDAY': 'मंगलवार', 'WEDNESDAY': 'बुधवार', 'THURSDAY': 'गुरुवार', 'FRIDAY': 'शुक्रवार', 'SATURDAY': 'शनिवार', 'SUNDAY': 'रविवार',
            // API Variations (Nakshatras & Planets)
            'SHRAVAN': 'श्रवण', 'HAST': 'हस्त', 'SHATBHISHA': 'शतभिषा', 'ASCENDANT': 'लग्न', 'Lagna': 'लग्न', 'CHITRA': 'चित्रा', 'SWATI': 'स्वाती', 'VISHAKHA': 'विशाखा', 'ANURADHA': 'अनुराधा', 'JYESHTHA': 'ज्येष्ठा', 'MULA': 'मूल', 'PURVA ASHADHA': 'पूर्वाषाढ़ा', 'UTTARA ASHADHA': 'उत्तराषाढ़ा', 'SHRAVANA': 'श्रवण', 'DHANISHTA': 'धनिष्ठा', 'SHATABHISHA': 'शतभिषा', 'PURVA BHADRAPADA': 'पूर्व भाद्रपद', 'UTTARA BHADRAPADA': 'उत्तर भाद्रपद', 'REVATI': 'रेवती',
            'SUN': 'सूर्य', 'MOON': 'चंद्रमा', 'MARS': 'मंगल', 'MERCURY': 'बुध', 'JUPITER': 'बृहस्पति', 'VENUS': 'शुक्र', 'SATURN': 'शनि', 'RAHU': 'राहू', 'KETU': 'केतु',

            'ARIES': 'मेष', 'TAURUS': 'वृषभ', 'GEMINI': 'मिथुन', 'CANCER': 'कर्क', 'LEO': 'सिंह', 'VIRGO': 'कन्या', 'LIBRA': 'तुला', 'SCORPIO': 'वृश्चिक', 'SAGITTARIUS': 'धनु', 'CAPRICORN': 'मकर', 'AQUARIUS': 'कुंभ', 'PISCES': 'मीन'
        };
        const cleanV = String(v).trim();
        if (dict[cleanV]) return dict[cleanV];
        const capsV = cleanV.toUpperCase();
        const foundKey = Object.keys(dict).find(k => k.toUpperCase() === capsV);
        if (foundKey) return dict[foundKey];

        // 🧠 GREEDY TRANSFORMER FOR COMPLEX STRINGS
        let transformed = cleanV;
        if (transformed.includes('FACED') || transformed.includes('MUKHI') || transformed.includes('RUDRAKSHA') || transformed.includes('PLANET') || transformed.includes('NUMBER')) {
            transformed = transformed
                .replace(/FOUR FACED/gi, 'चार मुखी')
                .replace(/TWO FACED/gi, 'दो मुखी')
                .replace(/SIX FACED/gi, 'छह मुखी')
                .replace(/EIGHT FACED/gi, 'आठ मुखी')
                .replace(/TEN FACED/gi, 'दस मुखी')
                .replace(/RUDRAKSHA/gi, 'रुद्राक्ष')
                .replace(/You are recommended to wear a combination/gi, 'आपको पहनने की सलाह दी जाती है')
                .replace(/a combination of/gi, 'का संयोजन')
                .replace(/The ruling planet of/gi, 'का स्वामी ग्रह')
                .replace(/is Moon/gi, 'चंद्रमा है')
                .replace(/is Sun/gi, 'सूर्य है')
                .replace(/is Mars/gi, 'मंगल है')
                .replace(/is Mercury/gi, 'बुध है')
                .replace(/is Jupiter/gi, 'बृहस्पति है')
                .replace(/is Venus/gi, 'शुक्र है')
                .replace(/is Saturn/gi, 'शनि है')
                .replace(/It controls the malefic effects of/gi, 'यह इनके नकारात्मक प्रभावों को नियंत्रित करता है:')
                .replace(/symbol of Shiva -Parvati/gi, 'शिव-पार्वती का प्रतीक है')
                .replace(/Effect of wearing/gi, 'पहनने का प्रभाव')
                .replace(/brings peace in family/gi, 'परिवार में शांति लाता है')
                .replace(/helps to develop good relationship/gi, 'अच्छे संबंध विकसित करने में मदद करता है')
                .replace(/\(CHAAR MUKHI \+ DO MUKHI\)/gi, '')
                // Numerology Patterns
                .replace(/Your Radical Number is/gi, 'आपका मूलांक है:')
                .replace(/Its ruler is/gi, 'इसका स्वामी ग्रह है:')
                .replace(/Due to its influence you will be inclined more towards/gi, 'इसके प्रभाव से आप अधिक आकर्षित होंगे:')
                .replace(/business than a job/gi, 'नौकरी के बजाय व्यवसाय की ओर');
        }
        
        // Final fallback if no translation found
        return transformed;
    };

    const menuItems = [
        { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
        { id: 'charts', label: t.charts, icon: Grid3X3 },
        { id: 'predictions', label: t.predictions, icon: FilePieChart },
        { id: 'numerology', label: t.numerology, icon: Star },
        { id: 'dasha', label: t.dasha, icon: Zap },
    ];

    const handleReset = () => {
        setIsGenerated(false);
        setApiData(null);
        localStorage.removeItem('veda_pro_cache');
        localStorage.removeItem('veda_pro_form');
        setForm({
            name: '',
            birthDate: '2003-10-14',
            birthTime: '14:15',
            birthPlace: 'Mumbai, India',
            lat: '19.076',
            lon: '72.8777'
        });
        setActiveTab('dashboard');
    };

    useEffect(() => {
        const savedData = localStorage.getItem('veda_pro_cache');
        const savedForm = localStorage.getItem('veda_pro_form');
        if (savedData) { setApiData(JSON.parse(savedData)); setIsGenerated(true); }
        if (savedForm) setForm(JSON.parse(savedForm));

        if (user) {
            fetchSavedKundalis();
        }
    }, [user]);

    const fetchSavedKundalis = async () => {
        if (!user) return;
        setFetchingSaved(true);
        try {
            const { data, error } = await supabase
                .from('user_kundalis')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            
            if (data) setSavedKundalis(data);
        } catch (err) {
            console.error('Failed to fetch saved kundalis:', err);
        } finally {
            setFetchingSaved(false);
        }
    };

    const handlePlaceSearch = async (query: string) => {
        setForm(prev => ({ ...prev, birthPlace: query }));
        if (query.length < 3) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        try {
            const res = await fetch(`/api/places?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            if (data.features) {
                setSuggestions(data.features);
                setShowSuggestions(true);
            }
        } catch (err) {
            console.error('Local places search failed:', err);
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

    const handleSelectKundali = async (k: any) => {
        const newForm = {
            name: k.full_name,
            birthDate: k.date_of_birth,
            birthTime: k.time_of_birth,
            birthPlace: k.place_of_birth,
            lat: k.lat?.toString() || '19.076',
            lon: k.lon?.toString() || '72.8777'
        };
        setForm(newForm);
        // Trigger generation with this form and use existing data if available
        const generatedData = await executeGeneration(newForm, k.full_data);

        // ✨ Auto-Patch: If the saved record was missing data, save it now for future instant loading
        if (!k.full_data && generatedData && user) {
            await supabase.from('user_kundalis').update({ full_data: generatedData }).eq('id', k.id);
            // Refresh list so the local state has the new data
            fetchSavedKundalis();
        }
    };

    const handleSetActive = async (k: any, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) return;
        
        try {
            // 1. Reset all others
            await supabase.from('user_kundalis').update({ is_active: false }).eq('user_id', user.id);
            // 2. Set this one as active
            await supabase.from('user_kundalis').update({ is_active: true }).eq('id', k.id);
            
            // 3. Sync with main Vedic Profile for Guru AI
            await supabase.from('user_vedic_profiles').upsert({
                user_id: user.id,
                full_name: k.full_name,
                date_of_birth: k.date_of_birth,
                time_of_birth: k.time_of_birth,
                place_of_birth: k.place_of_birth,
                gender: 'male', // Default or can be extended
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });

            fetchSavedKundalis();
        } catch (err) {
            console.error('Failed to set active profile:', err);
        }
    };

    const executeGeneration = async (formData: any, existingData?: any) => {
        setLoading(true);
        setError(null);
        try {
            // Priority 1: Use provided data (from DB)
            if (existingData && typeof existingData === 'object') {
                setApiData(existingData);
                setIsGenerated(true);
                setActiveTab('dashboard');
                setIsCreationMode(false);
                setLoading(false);
                return existingData;
            }

            const datetime = `${formData.birthDate}T${formData.birthTime}:00+05:30`;
            const response = await fetch('/api/vedaluna', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ params: { datetime, coordinates: `${formData.lat},${formData.lon}`, name: formData.name, language } })
            });

            const result = await response.json();
            if (!response.ok && !result.data) throw new Error(result.error || 'SYNC_FAIL');

            localStorage.setItem('veda_pro_cache', JSON.stringify(result.data));
            localStorage.setItem('veda_pro_form', JSON.stringify(formData));
            setApiData(result.data);
            setIsGenerated(true);
            setActiveTab('dashboard');
            setIsCreationMode(false);
            return result.data;
        } catch (err: any) {
            setError(err.message || 'ENGINE_SYNC_FAILED');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteKundali = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this Kundali?')) return;
        
        try {
            const { error } = await supabase.from('user_kundalis').delete().eq('id', id);
            if (!error) {
                setSavedKundalis(prev => prev.filter(k => k.id !== id));
            }
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    useEffect(() => {
        if (isGenerated) {
            if (activeTab === 'charts') fetchSpecificChart();
            const needsGems = activeTab === 'predictions' && !apiData?.gemstone;
            const needsCharacter = activeTab === 'predictions' && !apiData?.character;
            const needsNumero = activeTab === 'numerology' && (!apiData?.numero_report || !apiData?.numero_time);
            const needsDasha = activeTab === 'dasha' && !apiData?.current_dasha;

            if (needsGems || needsCharacter || needsNumero || needsDasha) {
                fetchMissingReports();
            }
        }
    }, [activeChart, activeTab]);

    useEffect(() => {
        if (isGenerated) {
            // Reset the fetching guard first so a concurrent fetch doesn't block this reload
            setFetchingReports(false);

            // Clear cached language-specific reports so they re-fetch in the new language
            setApiData((prev: any) => {
                if (!prev) return null;
                const fresh = { ...prev };
                delete fresh.gemstone; 
                delete fresh.rudraksha;
                delete fresh.character;
                delete fresh.career;
                delete fresh.relation;
                delete fresh.health;
                delete fresh.physical;
                delete fresh.numero_report;
                delete fresh.numero_time;
                return fresh;
            });

            // Small delay to let state settle before re-fetching
            const timer = setTimeout(() => {
                if (activeTab === 'charts') fetchSpecificChart();
                fetchMissingReports();
            }, 200);

            return () => clearTimeout(timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    const fetchMissingReports = async () => {
        if (!isGenerated || fetchingReports) return;
        setFetchingReports(true);
        try {
            const datetime = `${form.birthDate}T${form.birthTime}:00+05:30`;
            const response = await fetch('/api/vedaluna', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    params: { datetime, coordinates: `${form.lat},${form.lon}`, name: form.name, language }
                })
            });
            const result = await response.json();
            if (result.data) {
                setApiData((prev: any) => {
                    const next = { ...prev };
                    Object.keys(result.data).forEach(key => {
                        if (result.data[key] && !result.data[key].error) {
                            next[key] = result.data[key];
                        }
                    });
                    localStorage.setItem('veda_pro_cache', JSON.stringify(next));
                    return next;
                });
            }
        } catch (err) {
            console.error('Report fetch failed:', err);
        } finally {
            setFetchingReports(false);
        }
    };

    const fetchSpecificChart = async () => {
        if (!isGenerated) return;
        setFetchingChart(true);
        // ✨ Clear stale data to ensure the user sees the refresh
        setApiData((prev: any) => ({ ...prev, chart: null }));

        try {
            const chartMapping: { [key: string]: string } = {
                'Lagna (D1)': 'D1',
                'Navamsha (D9)': 'D9',
                'Sun Chart': 'SUN',
                'Moon Chart': 'MOON',
                'Hora (D2)': 'D2',
                'Drekkana (D3)': 'D3',
                'Dasamsa (D10)': 'D10'
            };
            const chartId = chartMapping[activeChart] || 'D1';

            const datetime = `${form.birthDate}T${form.birthTime}:00+05:30`;
            const response = await fetch('/api/vedaluna', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    params: {
                        datetime,
                        coordinates: `${form.lat},${form.lon}`,
                        name: form.name,
                        chart_id: chartId,
                        language
                    }
                })
            });

            const result = await response.json();
            if (result.data) {
                setApiData((prev: any) => {
                    const next = {
                        ...prev,
                        chart: (result.data.chart && !result.data.chart.error) ? result.data.chart : prev?.chart,
                        planets: Array.isArray(result.data.planets) ? result.data.planets : prev?.planets
                    };
                    localStorage.setItem('veda_pro_cache', JSON.stringify(next));
                    return next;
                });
            }
        } catch (err) {
            console.error('Chart fetch failed:', err);
        } finally {
            setFetchingChart(false);
        }
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        const generatedData = await executeGeneration(form);
        
        // Also save to DB if logged in and under limit (Now includes full_data payload)
        if (user && generatedData && savedKundalis.length < 5) { // Increased limit slightly
            const isAlreadySaved = savedKundalis.some(k => k.full_name === form.name);
            if (!isAlreadySaved) {
                await supabase.from('user_kundalis').insert({
                    user_id: user.id,
                    full_name: form.name,
                    date_of_birth: form.birthDate,
                    time_of_birth: form.birthTime,
                    place_of_birth: form.birthPlace,
                    lat: parseFloat(form.lat),
                    lon: parseFloat(form.lon),
                    full_data: generatedData // ✨ Save the heavy payload
                });
                fetchSavedKundalis();
            }
        }
    };

    const age = isGenerated ? (new Date().getFullYear() - new Date(form.birthDate).getFullYear()) : 0;

    const formattedBirthDate = isGenerated ? (() => {
        const d = new Date(form.birthDate);
        const weekday = d.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'long' }).toUpperCase();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return `${weekday}/${month}/${year}`;
    })() : '';

    const { theme, setTheme } = useTheme();

    const renderTabContent = () => {
        if (!apiData && activeTab !== 'dashboard') {
            return (
                <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-zinc-200 dark:border-white/5 rounded-[48px] animate-pulse">
                    <Sun className="text-saffron opacity-20 mb-6" size={64} />
                    <p className="text-xl font-black text-zinc-400 uppercase tracking-tighter">{t.initializing}</p>
                </div>
            );
        }

        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        {/* Core Birth Identity Card */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white dark:bg-[#0c0c0c] rounded-[48px] p-10 md:p-14 border border-zinc-200 dark:border-white/5 relative overflow-hidden group shadow-xl hover:shadow-saffron/5 transition-all">
                                <Star className="absolute top-10 right-10 text-saffron/5 group-hover:rotate-12 group-hover:scale-125 transition-all duration-1000" size={150} />
                                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-saffron/5 rounded-full blur-[80px]" />
                                <h3 className="text-2xl font-black mb-10 flex items-center gap-3 text-saffron uppercase">
                                    <Sun size={24} className="animate-pulse" /> {t.astrological_core}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 transition-all">
                                    {[
                                        { l: t.rashi, v: translateValue(apiData?.core?.sign || 'Leo'), icon: Moon },
                                        { l: t.ascendant, v: translateValue(apiData?.core?.ascendant || 'Sagittarius'), icon: Zap },
                                        { l: t.nakshatra, v: translateValue(apiData?.core?.Naksahtra || apiData?.panchang?.nakshatra || 'Magha'), icon: Star },
                                        { l: t.nakshatra_lord, v: translateValue(apiData?.core?.NaksahtraLord || '-'), icon: ShieldCheck }
                                    ].map((item, idx) => (
                                        <div key={idx} className="space-y-3 cursor-default group/item">
                                            <div className="flex items-center gap-2">
                                                <item.icon size={10} className="text-zinc-400 group-hover/item:text-saffron transition-all" />
                                                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest leading-none">{item.l}</p>
                                            </div>
                                            <p className="text-xl font-black text-zinc-900 dark:text-zinc-100 transition-all group-hover:text-saffron translate-y-0 group-hover/item:-translate-y-1">{item.v}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-zinc-50 dark:bg-[#0c0c0c] rounded-[48px] p-10 border border-zinc-200 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-xl group transition-all relative overflow-hidden hover:border-saffron/30">
                                <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 rounded-full border-4 border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-saffron/30 transition-all">
                                        <span className="text-4xl font-black text-saffron scale-100 group-hover:scale-110 transition-all font-sans">{age}</span>
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-4 border-t-saffron border-transparent animate-spin duration-[4000ms]" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 group-hover:text-saffron transition-all">{t.wisdom_years}</h3>
                            </div>
                        </div>

                        {/* Cosmic Profile & Panchang Grids */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-zinc-50 dark:bg-[#0c0c0c] rounded-[48px] p-10 border border-zinc-200 dark:border-white/5 shadow-xl transition-all hover:bg-white dark:hover:bg-[#111] hover:shadow-2xl">
                                <h3 className="text-xl font-black mb-10 flex items-center gap-3 uppercase tracking-tight text-amber-600"><Sun size={24} className="group-hover:rotate-45" /> {t.birth_panchang}</h3>
                                <div className="space-y-4">
                                    {[
                                        { l: t.tithi, v: translateValue(apiData?.panchang?.tithi || apiData?.panchang?.Tithi || apiData?.core?.Tithi || '-') },
                                        { l: t.karan, v: translateValue(apiData?.panchang?.karan || apiData?.panchang?.Karan || apiData?.core?.Karan || '-') },
                                        { l: t.yog, v: translateValue(apiData?.panchang?.yog || apiData?.panchang?.Yog || apiData?.core?.Yog || '-') },
                                        { l: t.sunrise, v: translateValue(apiData?.panchang?.sunrise || '-') },
                                        { l: t.sunset, v: translateValue(apiData?.panchang?.sunset || '-') }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm border-b border-zinc-200 dark:border-white/5 pb-4 last:border-0 uppercase font-bold tracking-tight group/row">
                                            <span className="text-zinc-400 font-black text-[10px] tracking-widest group-hover/row:text-saffron transition-all">{item.l}</span>
                                            <span className="text-zinc-900 dark:text-zinc-100 font-black">{item.v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-zinc-50 dark:bg-[#0c0c0c] rounded-[48px] p-10 border border-zinc-200 dark:border-white/5 shadow-xl transition-all hover:bg-white dark:hover:bg-[#111] hover:shadow-2xl">
                                <h3 className="text-xl font-black mb-10 flex items-center gap-3 uppercase tracking-tight text-amber-600"><User size={24} /> {t.astro_profile}</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[
                                        { l: t.varna, v: translateValue(apiData?.core?.Varna || '-') },
                                        { l: t.yoni, v: translateValue(apiData?.core?.Yoni || '-') },
                                        { l: t.gan, v: translateValue(apiData?.core?.Gan || '-') },
                                        { l: t.nadi, v: translateValue(apiData?.core?.Nadi || '-') },
                                        { l: t.paya, v: translateValue(apiData?.core?.Paya || apiData?.core?.paya || '-') },
                                        { l: t.name_char, v: translateValue(apiData?.core?.name_alphabet || '-') },
                                        { l: t.manglik, v: translateValue(apiData?.manglik?.manglik_present ? 'Yes' : 'No') },
                                        { l: t.sadhesati, v: translateValue(apiData?.sadhesati?.sadhesati_status ? 'Active' : 'No') }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white dark:bg-black p-4 rounded-3xl border border-zinc-100 dark:border-white/10 text-center transition-all hover:scale-110 hover:border-saffron/20 hover:shadow-lg">
                                            <p className="text-[10px] font-black uppercase text-zinc-500 mb-1 leading-none">{item.l}</p>
                                            <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 uppercase transition-all tracking-tight leading-none">{item.v}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Destiny Snapshot */}
                        <div className="bg-white dark:bg-[#0c0c0c] rounded-[48px] p-10 md:p-16 border border-zinc-200 dark:border-white/5 shadow-22 shadow-saffron/10 relative overflow-hidden transition-all duration-700 group">
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-saffron/5 pointer-events-none" />
                            <h3 className="text-2xl font-black mb-10 flex items-center gap-3 text-saffron uppercase"><Zap size={24} className="fill-saffron" /> {t.destiny_snapshot}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                                {[
                                    { l: t.destiny_no, v: apiData?.numero_table?.destiny_number || '-' },
                                    { l: t.radix_no, v: apiData?.numero_table?.radical_number || '-' },
                                    { l: t.lucky_color, v: translateValue(apiData?.numero_table?.fav_color || apiData?.numero_table?.lucky_color || '-') },
                                    { l: t.lucky_stone, v: translateValue(apiData?.numero_table?.fav_stone || apiData?.numero_table?.lucky_stone || '-') }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-zinc-50 dark:bg-zinc-950/50 p-6 rounded-[32px] border border-zinc-100 dark:border-white/5 text-center group transition-all hover:bg-saffron/10 outline outline-transparent hover:outline-saffron/20 shadow-sm hover:shadow-xl">
                                        <p className="text-[10px] font-black uppercase text-zinc-500 mb-2 leading-none tracking-widest">{item.l}</p>
                                        <p className="text-3xl font-black text-zinc-900 dark:text-saffron transition-all group-hover:scale-125 duration-500 leading-none">{item.v}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'charts':
                return (
                    <div className="space-y-8 animate-in zoom-in-95 duration-500">
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-[32px] inline-flex flex-wrap gap-2 border border-zinc-200 dark:border-white/5">
                            {[
                                { id: 'Lagna (D1)', l: t.lagna_d1 },
                                { id: 'Navamsha (D9)', l: t.navamsha_d9 },
                                { id: 'Sun Chart', l: t.sun_chart },
                                { id: 'Moon Chart', l: t.moon_chart },
                                { id: 'Hora (D2)', l: t.hora_d2 },
                                { id: 'Drekkana (D3)', l: t.drekkana_d3 },
                                { id: 'Dasamsa (D10)', l: t.dasamsa_d10 }
                            ].map(chart => (
                                <button key={chart.id} onClick={() => setActiveChart(chart.id)} className={`px-8 py-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${activeChart === chart.id ? 'bg-white dark:bg-zinc-800 text-saffron shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}>
                                    {chart.l}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                            <div className="bg-white dark:bg-[#030303] p-10 md:p-16 rounded-[48px] border-4 border-zinc-100 dark:border-white/5 shadow-22 shadow-saffron/10 flex flex-col items-center justify-center min-h-[550px] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 to-transparent pointer-events-none" />

                                <div className="absolute top-10 left-10 z-20 flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-saffron rounded-full" />
                                    <h4 className="text-xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
                                        {translateValue(activeChart)} {t.analysis}
                                    </h4>
                                </div>

                                {fetchingChart ? (
                                    <div className="flex flex-col items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 border-4 border-saffron/30 border-t-saffron rounded-full animate-spin" />
                                        <p className="text-[10px] font-black uppercase text-saffron animate-pulse">{t.syncing}</p>
                                    </div>
                                ) : apiData?.chart ? (
                                    <div dangerouslySetInnerHTML={{ __html: apiData.chart }} className="w-full h-full max-w-[500px] aspect-square flex items-center justify-center dark:invert opacity-90 transition-all duration-1000 scale-100 group-hover:scale-105 [&>svg]:w-full [&>svg]:h-auto" />
                                ) : (
                                    <div className="w-full h-full max-w-[500px] aspect-square flex items-center justify-center">
                                        <NorthIndianChart planets={apiData?.planets || []} />
                                    </div>
                                )}
                            </div>
                            <div className="bg-zinc-50 dark:bg-[#0c0c0c] rounded-[48px] p-10 border border-zinc-200 dark:border-white/5 shadow-xl transition-all overflow-x-auto">
                                <h3 className="text-lg font-black uppercase tracking-tighter text-saffron mb-8">{t.planetary_alignment}</h3>
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-100 dark:border-white/5">
                                            <th className="pb-6 px-2">{t.planet}</th>
                                            <th className="pb-6 px-2">{t.degree}</th>
                                            <th className="pb-6 px-2">{t.sign}</th>
                                            <th className="pb-6 px-2">{t.nakshatra}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs font-bold divide-y divide-zinc-100 dark:divide-white/5">
                                        {(Array.isArray(apiData?.planets) && apiData.planets.length > 0) ? apiData.planets.map((p: any, idx: number) => {
                                            const degree = typeof p.fullDegree === 'number' ? p.fullDegree : parseFloat(p.fullDegree || '0');
                                            return (
                                                <tr key={idx} className="group hover:bg-saffron/5 transition-all">
                                                    <td className="py-5 px-2 text-zinc-900 dark:text-white uppercase font-black flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${p.isRetro === 'true' || p.isRetro === true ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                                                        {translateValue(p.name || p.planet || 'Planet')}
                                                    </td>
                                                    <td className="py-5 px-2 text-zinc-500">{degree.toFixed(2)}°</td>
                                                    <td className="py-5 px-2 text-zinc-400 uppercase tracking-tighter">{translateValue(p.sign) || '-'}</td>
                                                    <td className="py-5 px-2 text-zinc-900 dark:text-zinc-200 text-[10px] uppercase font-black">{translateValue(p.nakshatra) || '-'}</td>
                                                </tr>
                                            );
                                        }) : (
                                            <tr>
                                                <td colSpan={4} className="py-20 text-center text-zinc-400 font-bold uppercase text-[10px] tracking-widest italic opacity-40">
                                                    {t.alignment_pending} <br /> [Engine Restricted / Plan Required]
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'predictions':
                return (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {/* Gemstone Recommendations Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(() => {
                                const gems = [
                                    { label: t.life_gem, data: apiData?.gemstone?.LIFE, color: 'text-red-500' },
                                    { label: t.benefic_gem, data: apiData?.gemstone?.BENEFIC, color: 'text-blue-500' },
                                    { label: t.lucky_gem, data: apiData?.gemstone?.LUCKY, color: 'text-saffron' }
                                ];
                                return gems.map((gem, idx) => (
                                    <div key={idx} className="bg-white dark:bg-[#0c0c0c] border border-zinc-200 dark:border-white/5 rounded-[48px] p-10 space-y-8 group hover:border-saffron/30 transition-all shadow-xl flex flex-col justify-between min-h-[350px]">
                                        <div className="space-y-4">
                                            <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${gem.color}`}>{gem.label}</p>
                                            <h3 className="text-3xl font-black text-zinc-900 dark:text-white group-hover:text-saffron transition-all uppercase tracking-tighter leading-none">
                                                {translateValue(gem.data?.name) || (fetchingReports ? '...' : translateValue(t.refresh_required))}
                                            </h3>
                                        </div>
                                        <div className="space-y-5 font-black text-[10px] uppercase tracking-[0.15em] text-zinc-400">
                                            <div className="flex justify-between border-b border-zinc-100 dark:border-white/5 pb-4"><span>{t.finger}</span><span className="text-zinc-900 dark:text-zinc-100">{translateValue(gem.data?.wear_finger) || '-'}</span></div>
                                            <div className="flex justify-between border-b border-zinc-100 dark:border-white/5 pb-4"><span>{t.metal}</span><span className="text-zinc-900 dark:text-zinc-100">{translateValue(gem.data?.wear_metal) || '-'}</span></div>
                                            <div className="flex justify-between pb-1 text-zinc-900 dark:text-zinc-100"><span>{t.day}: {translateValue(gem.data?.wear_day) || '-'}</span></div>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>

                        {/* Divine Protection Section */}
                        <div className="bg-zinc-50 dark:bg-[#0c0c0c] border border-zinc-200 dark:border-white/5 rounded-[48px] p-10 md:p-14 relative overflow-hidden group shadow-xl">
                            <Sun className="absolute top-10 right-10 text-saffron/10 group-hover:rotate-12 transition-all duration-1000" size={120} />
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4 text-saffron">
                                    <Shield size={24} className="animate-pulse" />
                                    <h3 className="text-xl font-black uppercase tracking-tight">{t.divine_protection}</h3>
                                </div>
                            </div>
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                                {translateValue(apiData?.rudraksha?.name) || (apiData?.rudraksha?.error ? translateValue(t.premium_shield) : translateValue(t.calculating_shield))}
                            </h2>
                            <p className="text-saffron text-sm font-bold mb-8 max-w-2xl italic">
                                {apiData?.rudraksha?.error ? translateValue("This advanced spiritual analysis requires a valid API plan. Showing placeholder context.") : translateValue(apiData?.rudraksha?.recommend || apiData?.rudraksha?.recommendation || t.sacred_res)}
                            </p>
                            <div className="h-px bg-zinc-200 dark:bg-white/5 w-full mb-8" />
                            <p className="text-zinc-400 dark:text-zinc-500 text-xs md:text-sm leading-relaxed max-w-4xl italic whitespace-pre-wrap">
                                {translateValue(apiData?.rudraksha?.detail) || translateValue('Recalculating your astrological signature...')}
                            </p>
                        </div>

                        {/* 💎 PREMIUM LIFE PREDICTIONS (PIXEL-PERFECT MATCH) */}
                        <div className="bg-white dark:bg-[#0c0c0c] rounded-[42px] p-10 md:p-14 border border-zinc-200 dark:border-zinc-800/50 shadow-2xl transition-all">

                            {/* Header Row */}
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-20">
                                <div className="flex items-center gap-4 text-zinc-900 dark:text-white">
                                    <BookOpen className="text-zinc-900 dark:text-white" size={28} />
                                    <h3 className="text-2xl font-bold tracking-tight">{t.predictions}</h3>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 bg-zinc-100 dark:bg-[#18181b] p-1.5 rounded-[24px] border border-zinc-200 dark:border-white/5">
                                    {[
                                        { id: 'character', l: t.character, i: User },
                                        { id: 'career', l: t.career, i: GraduationCap },
                                        { id: 'relation', l: t.relation, i: Users },
                                        { id: 'health', l: t.health, i: Heart },
                                        { id: 'physical', l: t.physical, i: Activity }
                                    ].map(pTab => (
                                        <button
                                            key={pTab.id}
                                            onClick={() => setActivePredTab(pTab.id)}
                                            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-[12px] font-semibold transition-all ${activePredTab === pTab.id ? 'bg-zinc-800 dark:bg-[#27272a] text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
                                        >
                                            <pTab.i size={16} />
                                            <span className="hidden sm:inline">{pTab.l}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="space-y-10 animate-in fade-in duration-1000">
                                <div className="flex items-center gap-4 text-zinc-900 dark:text-white group">
                                    <Sun size={24} className="text-zinc-400 dark:text-white/80 transition-transform group-hover:scale-125" />
                                    <h4 className="text-lg font-bold tracking-tight">{translateValue(t[activePredTab])} {t.analysis}</h4>
                                </div>

                                <p className="text-zinc-600 dark:text-zinc-400 leading-[1.8] text-base font-medium max-w-6xl text-left selection:bg-saffron/30">
                                    {(() => {
                                        const content =
                                            activePredTab === 'character' ? getR(apiData?.character, 'character') :
                                                activePredTab === 'career' ? getR(apiData?.career, 'career') :
                                                    activePredTab === 'relation' ? getR(apiData?.love, 'relation') :
                                                        activePredTab === 'health' ? getR(apiData?.health, 'health') :
                                                            activePredTab === 'physical' ? getR(apiData?.physical, 'physical') : '';
                                        return content || t.synthesizing_insights;
                                    })()}
                                </p>

                                <div className="pt-16 opacity-20 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                                    <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.5em]">{t.footer}</p>
                                    <div className="h-[2px] w-12 bg-zinc-600 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'numerology':
                return (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {[
                                { l: t.radix_no, v: apiData?.numero_table?.radical_number || '-', d: t.radix_desc },
                                { l: t.destiny_no, v: apiData?.numero_table?.destiny_number || '-', d: t.destiny_desc },
                                { l: t.name_no, v: apiData?.numero_table?.name_number || '-', d: t.name_desc }
                            ].map((n, i) => (
                                <div key={i} className="bg-white dark:bg-[#0c0c0c] rounded-[40px] p-10 border border-zinc-200 dark:border-white/5 relative overflow-hidden transition-colors">
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black text-saffron uppercase mb-4 tracking-widest">{n.l}</p>
                                        <p className="text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tighter">{n.v}</p>
                                        <p className="text-xs font-medium text-zinc-500 max-w-[150px] leading-relaxed">{n.d}</p>
                                    </div>
                                    <div className="absolute -right-4 -bottom-4 text-9xl font-black opacity-[0.03] text-zinc-900 dark:text-white">{n.v}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-1 gap-12">
                            <div className="bg-white dark:bg-[#0c0c0c] rounded-[48px] p-10 md:p-14 border border-zinc-200 dark:border-white/5 shadow-2xl transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                                    <div className="flex items-center gap-5 text-zinc-900 dark:text-white">
                                        <Sun className="text-saffron" size={24} />
                                        <h3 className="text-2xl font-black tracking-tighter">{t.numeric_insights}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { id: 'Personality Report', l: t.personality },
                                            { id: 'Favorable Timing', l: t.timing },
                                            { id: 'Places & Vastu', l: t.places }
                                        ].map(tab => (
                                            <button key={tab.id} onClick={() => setActiveNumeroTab(tab.id)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeNumeroTab === tab.id ? 'bg-saffron text-white shadow-sm' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}>
                                                {tab.l}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-8 md:p-10 bg-zinc-50 dark:bg-black/20 rounded-[44px] text-zinc-800 dark:text-zinc-300 text-base md:text-lg leading-relaxed selection:bg-saffron/20 transition-all font-semibold whitespace-pre-wrap min-h-[400px] flex items-start justify-start border border-zinc-100 dark:border-white/5 relative shadow-inner">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <FileText size={120} />
                                    </div>
                                    <div className="relative z-10 w-full">
                                        {(() => {
                                            const mapping: { [key: string]: { key: string, url: string } } = {
                                                'Personality Report': { key: 'numero_report', url: 'numero_report' },
                                                'Favorable Timing': { key: 'numero_time', url: 'numero_time' },
                                                'Places & Vastu': { key: 'numero_place_vastu', url: 'numero_place_vastu' },
                                            };
                                            const config = mapping[activeNumeroTab];
                                            const raw = apiData?.[config.key];
                                            const content = getR(raw, activeNumeroTab);
                                            return translateValue(content) || t.recalculating_vibrations;
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'dasha':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        {/* ⏳ LEFT COLUMN: VIMSHOTTARI ENGINE */}
                        <div className="space-y-12">
                            <div className="bg-white dark:bg-[#0c0c0c] rounded-[48px] p-10 md:p-14 border border-zinc-200 dark:border-zinc-800/40 shadow-2xl relative overflow-hidden transition-colors">
                                <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                                    <Activity size={200} />
                                </div>

                                <div className="flex items-center gap-5 text-zinc-900 dark:text-white mb-10 relative z-10">
                                    <Activity className="text-saffron" size={24} />
                                    <h3 className="text-2xl font-black tracking-tighter">{t.current_dasha}</h3>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    {[
                                        { l: t.mahadasha_label, p: apiData?.current_dasha?.mahadasha?.planet || 'Mercury', s: apiData?.current_dasha?.mahadasha?.start || '7-7-2024', e: apiData?.current_dasha?.mahadasha?.end || '7-7-2041' },
                                        { l: t.antardasha_label, p: apiData?.current_dasha?.antardasha?.planet || 'Mercury', s: apiData?.current_dasha?.antardasha?.start || '7-7-2024', e: apiData?.current_dasha?.antardasha?.end || '4-12-2026' },
                                        { l: t.pratyantar_label, p: apiData?.current_dasha?.pratyantardasha?.planet || 'Jupiter', s: apiData?.current_dasha?.pratyantardasha?.start || '22-3-2026', e: apiData?.current_dasha?.pratyantardasha?.end || '17-7-2026' }
                                    ].map((d, i) => (
                                        <div key={i} className="bg-zinc-100 dark:bg-[#141414] rounded-[28px] p-8 border border-zinc-200 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-zinc-200 dark:hover:bg-[#1a1a1a] transition-all">
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">{d.l}</p>
                                                <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 font-mono text-[11px] font-bold">
                                                    <span>{d.s}</span>
                                                    <ArrowRight size={14} className="text-saffron/40" />
                                                    <span>{d.e}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-3xl font-black text-saffron uppercase tracking-tighter group-hover:text-zinc-900 dark:group-hover:text-white transition-all">{translateValue(d.p)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-16 space-y-10">
                                    <div className="flex items-center gap-4 text-zinc-900 dark:text-white">
                                        <Clock className="text-saffron/80" size={24} />
                                        <h4 className="text-xl font-black tracking-tight">{t.timeline}</h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {(apiData?.dasha && Array.isArray(apiData.dasha) ? apiData.dasha : [
                                            { planet: language === 'hi' ? 'बृहस्पति' : 'Jupiter', start: '7-7-1989', end: '7-7-2005' },
                                            { planet: language === 'hi' ? 'शनि' : 'Saturn', start: '7-7-2005', end: '7-7-2024' },
                                            { planet: language === 'hi' ? 'बुध' : 'Mercury', start: '7-7-2024', end: '7-7-2041' },
                                            { planet: language === 'hi' ? 'केतु' : 'Ketu', start: '7-7-2041', end: '7-7-2048' },
                                            { planet: language === 'hi' ? 'शुक्र' : 'Venus', start: '7-7-2048', end: '7-7-2068' },
                                            { planet: language === 'hi' ? 'सूर्य' : 'Sun', start: '7-7-2068', end: '7-7-2074' }
                                        ]).map((d: any, i: number) => (
                                            <div key={i} className="bg-zinc-50 dark:bg-[#141414]/60 p-6 rounded-[24px] border border-zinc-200 dark:border-white/5 space-y-3 hover:border-saffron/20 transition-all group">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-lg font-black text-zinc-800 dark:text-zinc-300 group-hover:text-saffron transition-colors">{d.planet}</span>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-saffron/20 font-black text-[8px] flex items-center justify-center text-saffron uppercase">Y</div>
                                                </div>
                                                <div className="text-[10px] font-bold text-zinc-500 space-y-1 font-mono">
                                                    <p>{d.start}</p>
                                                    <p>{language === 'hi' ? 'तक' : 'to'} {d.end}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 🛡️ RIGHT COLUMN: DOSHA ANALYZER */}
                        <div className="space-y-12">
                            <div className="bg-white dark:bg-[#0c0c0c] rounded-[48px] p-10 md:p-14 border border-zinc-200 dark:border-zinc-800/40 shadow-2xl transition-colors">
                                <div className="flex items-center gap-5 text-zinc-900 dark:text-white mb-10">
                                    <Shield className="text-saffron" size={24} />
                                    <h3 className="text-2xl font-black tracking-tighter">{t.dasha}</h3>
                                </div>

                                <div className="space-y-10">
                                    {/* Manglik Section */}
                                    <div className="bg-zinc-100 dark:bg-[#141414] rounded-[40px] p-10 border border-zinc-200 dark:border-white/5 space-y-8 relative overflow-hidden group">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-4 text-zinc-900 dark:text-white">
                                                <AlertTriangle className="text-saffron/80" size={24} />
                                                <h4 className="text-2xl font-black tracking-tight">{t.manglik}</h4>
                                            </div>
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${apiData?.manglik?.manglik_status !== 'NOT_MANGLIK' ? 'bg-saffron/10 text-saffron border border-saffron/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase'}`}>
                                                {apiData?.manglik?.manglik_status !== 'NOT_MANGLIK' ? t.detected : t.clear}
                                            </span>
                                        </div>
                                        <div className="bg-zinc-200/50 dark:bg-black/40 rounded-[32px] p-8 border border-saffron/10 space-y-4">
                                            <div className="flex items-center gap-3 text-saffron">
                                                <Sun size={18} />
                                                <span className="text-sm font-black uppercase tracking-widest">{t.remedy}</span>
                                            </div>
                                            <p className="text-zinc-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t.remedy_text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                                        </div>
                                    </div>

                                    {/* Sadhesati Section */}
                                    <div className="bg-zinc-100 dark:bg-[#141414] rounded-[40px] p-10 border border-zinc-200 dark:border-white/5 space-y-8 relative overflow-hidden">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-4 text-zinc-900 dark:text-white">
                                                <Sun className="text-emerald-500/80" size={24} />
                                                <h4 className="text-2xl font-black tracking-tight">{t.sadhesati}</h4>
                                            </div>
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${apiData?.sadhesati?.is_sadhesati ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase'}`}>
                                                {apiData?.sadhesati?.is_sadhesati ? t.active : t.clear}
                                            </span>
                                        </div>
                                        <p className="text-zinc-400 text-base leading-relaxed font-medium">
                                            {getR(apiData?.sadhesati) || 'Monitoring Saturn\'s transit over your natal Moon...'}
                                        </p>
                                    </div>

                                    {/* Bottom Note */}
                                    <div className="pt-10 border-t border-zinc-900 flex items-start gap-4 text-zinc-500">
                                        <p className="text-[11px] leading-relaxed italic font-medium" dangerouslySetInnerHTML={{ __html: t.dosh_note.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-zinc-200 dark:border-white/5 rounded-[48px]">
                        <Sun className="text-saffron opacity-10 mb-6" size={64} />
                        <h2 className="text-3xl font-black opacity-10 uppercase tracking-tighter">Dimension restricted</h2>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#020202] text-zinc-900 dark:text-white font-sans selection:bg-saffron/30 transition-colors duration-300">
            <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-zinc-50 dark:bg-[#080808] border-r border-zinc-200 dark:border-white/5 flex flex-col z-50">
                <div className="p-10 mb-2 flex flex-col items-center gap-6">
                    <Link href="/">
                        <img src="/logo.png" alt="Mantra Puja Logo" className="w-32 h-auto hover:scale-105 transition-transform" />
                    </Link>
                    <Link 
                        href="/"
                        className="w-full h-12 flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-saffron hover:border-saffron/30 transition-all shadow-sm group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden md:block">{t.back_to_website}</span>
                    </Link>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all group ${activeTab === item.id ? 'bg-gradient-to-r from-saffron to-amber-500 shadow-xl shadow-saffron/20 text-white' : 'text-zinc-500 hover:bg-zinc-200 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'}`}>
                            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'group-hover:text-saffron transition-all'} />
                            <span className="hidden md:block font-bold text-[10px] uppercase font-black tracking-widest leading-none">{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-8 space-y-6">
                    <button onClick={handleReset} className="w-full py-4 bg-zinc-100 dark:bg-white/5 hover:bg-red-500/10 border border-zinc-200 dark:border-white/5 rounded-2xl text-[10px] font-black text-zinc-400 hover:text-red-500 transition-all uppercase tracking-widest flex items-center justify-center gap-3 group">
                        <RefreshCcw size={14} className="group-hover:rotate-180 transition-all duration-700" />
                        {t.new_analysis}
                    </button>

                    <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-white/5 transition-all outline outline-transparent hover:outline-saffron/20 shadow-sm">
                        <div className="text-[10px] font-black uppercase text-zinc-500 mb-1 leading-none font-black italic flex items-center justify-between">
                            {t.memory} <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">{t.persistent} <Shield size={12} className="text-saffron" /></p>
                    </div>
                </div>
            </aside>

            <main className="ml-20 md:ml-64 p-6 md:p-12 min-h-screen">
                {!isGenerated ? (
                    <div className="max-w-6xl mx-auto pt-10 animate-in fade-in zoom-in-95 duration-700">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase leading-none underline decoration-saffron decoration-4 underline-offset-8">KUNDALI MANAGER</h1>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Manage your celestial identities</p>
                        </div>

                        {(!isCreationMode && savedKundalis.length > 0) ? (
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {savedKundalis.map((k) => (
                                        <div 
                                            key={k.id} 
                                            onClick={() => handleSelectKundali(k)}
                                            className="bg-zinc-50 dark:bg-[#0c0c0c] rounded-[32px] p-8 border border-zinc-200 dark:border-white/5 shadow-xl hover:border-saffron/30 transition-all group cursor-pointer relative overflow-hidden"
                                        >
                                            <History className="absolute -right-4 -bottom-4 text-saffron/5 group-hover:scale-110 transition-transform" size={120} />
                                            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase text-saffron mb-1 tracking-widest">{t.saved_profile}</p>
                                                        <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">{k.full_name}</h3>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={(e) => handleSetActive(k, e)}
                                                            className={`p-2 rounded-full transition-all ${k.is_active ? 'bg-saffron text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-cyan-500'}`}
                                                            title={t.select_primary}
                                                        >
                                                            <Crown size={16} />
                                                        </button>
                                                        <button onClick={(e) => handleDeleteKundali(k.id, e)} className="p-2 hover:bg-red-500/10 rounded-full text-zinc-400 hover:text-red-500 transition-colors">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-zinc-500 font-bold text-xs uppercase">
                                                        <Calendar size={12} /> {k.date_of_birth}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-zinc-500 font-bold text-xs uppercase">
                                                        <MapPin size={12} /> {k.place_of_birth.split(',')[0]}
                                                    </div>
                                                </div>
                                                <button className="w-full py-4 bg-zinc-900 dark:bg-zinc-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest group-hover:bg-saffron transition-all">
                                                    {t.view_kundali}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {savedKundalis.length < 3 && (
                                        <div 
                                            onClick={() => setIsCreationMode(true)}
                                            className="bg-white dark:bg-black/40 rounded-[32px] p-8 border-2 border-dashed border-zinc-200 dark:border-white/10 flex flex-col items-center justify-center gap-4 hover:border-saffron/40 transition-all cursor-pointer group min-h-[250px]"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-saffron/10 group-hover:text-saffron transition-all">
                                                <Plus size={32} />
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-saffron">{t.create_new}</p>
                                        </div>
                                    )}
                                </div>
                                {savedKundalis.length >= 3 && (
                                    <p className="text-center text-[10px] font-black text-red-500/50 uppercase tracking-widest">
                                        Limit Reached: You can save up to 3 Kundalis. Delete one to create new.
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="bg-zinc-50 dark:bg-[#0c0c0c] rounded-[48px] p-12 border border-zinc-200 dark:border-white/5 shadow-22 shadow-saffron/10 relative overflow-hidden group max-w-2xl mx-auto">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-2xl font-black text-saffron uppercase tracking-tight">{t.birth_details}</h3>
                                    {savedKundalis.length > 0 && (
                                        <button onClick={() => setIsCreationMode(false)} className="text-[10px] font-black uppercase text-zinc-400 hover:text-zinc-600 flex items-center gap-2">
                                            <History size={14} /> {t.back_to_saved}
                                        </button>
                                    )}
                                </div>
                                <form onSubmit={handleGenerate} className="space-y-8 relative z-10 text-left">
                                    <div className="space-y-6">
                                        <div className="group">
                                            <label className="text-[10px] font-black tracking-widest text-zinc-400 dark:text-zinc-600 block mb-2 px-1 underline decoration-saffron decoration-2 transition-all">{t.entity_identity} / {language === 'hi' ? 'नाम' : 'Name'}</label>
                                            <input type="text" placeholder={t.enter_name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-2xl p-6 text-xl font-bold outline-none focus:border-saffron text-zinc-900 dark:text-saffron transition-all shadow-sm" required />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all">
                                            <div className="group"><label className="text-[10px] font-black tracking-widest text-zinc-400 block mb-2 px-1">{t.calendar_sync}</label><input type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-2xl p-6 font-bold text-zinc-900 dark:text-saffron shadow-sm" /></div>
                                            <div className="group"><label className="text-[10px] font-black tracking-widest text-zinc-400 block mb-2 px-1">{t.chronos_time}</label><input type="time" value={form.birthTime} onChange={(e) => setForm({ ...form, birthTime: e.target.value })} className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-2xl p-6 font-bold text-zinc-900 dark:text-saffron shadow-sm" /></div>
                                        </div>
                                        
                                        {/* Photon Autocomplete Place Search */}
                                        <div className="group pt-4 border-t border-zinc-200 dark:border-white/5 transition-all relative">
                                            <label className="text-[10px] font-black tracking-widest text-zinc-400 block mb-4 px-1 uppercase tracking-tight">{t.birth_location} / {language === 'hi' ? 'जन्म स्थान' : 'Birth Place'}</label>
                                            <div className="relative">
                                                <input 
                                                    type="text" 
                                                    placeholder={t.search_city} 
                                                    value={form.birthPlace} 
                                                    onChange={(e) => handlePlaceSearch(e.target.value)}
                                                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                                                    className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-3xl p-8 pl-16 outline-none focus:border-saffron font-bold text-zinc-900 dark:text-saffron text-xl shadow-sm transition-all" 
                                                />
                                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-saffron transition-all" size={28} />
                                                
                                                {/* Suggestions Dropdown */}
                                                <AnimatePresence>
                                                    {showSuggestions && suggestions.length > 0 && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                            className="absolute z-[100] w-full mt-2 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-white/5 max-h-60 overflow-y-auto no-scrollbar"
                                                        >
                                                            {suggestions.map((s, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    type="button"
                                                                    onClick={() => selectSuggestion(s)}
                                                                    className="w-full text-left px-8 py-4 hover:bg-zinc-50 dark:hover:bg-white/5 border-b border-zinc-100 dark:border-white/5 last:border-0 transition-all font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-4"
                                                                >
                                                                    <MapPin size={16} className="text-zinc-400" />
                                                                    <span>
                                                                        {[s.properties.name, s.properties.city, s.properties.state, s.properties.country].filter(Boolean).join(', ')}
                                                                    </span>
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={loading} className="w-full py-8 bg-gradient-to-r from-saffron to-amber-600 text-white font-black text-2xl rounded-3xl hover:scale-[1.02] active:scale-95 shadow-xl transition-all flex items-center justify-center gap-4">
                                        {loading ? <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <>{t.reveal_chart} <ChevronRight size={28} /></>}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto space-y-12 transition-all">
                        {/* ✨ PREMIUM HEADER (PIXEL-PERFECT MATCH) */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 transition-all">
                            <div className="space-y-1">
                                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter leading-none">
                                    {menuItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
                                </h1>
                                <p className="text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                                    {t.analysis_for} {formattedBirthDate}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 flex-wrap">
                                {/* PDF Report Button */}
                                <button className="flex items-center gap-2.5 px-6 py-3.5 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-full font-black text-[11px] uppercase tracking-wider text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all">
                                    <Download size={16} /> PDF Report
                                </button>

                                {/* Theme Toggle (Circle) */}
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="w-12 h-12 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-saffron transition-all"
                                >
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </button>

                                {/* Language Toggle (Mini-Pill) */}
                                <div className="flex bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-full border border-zinc-200 dark:border-zinc-800 h-10 w-28">
                                    <button
                                        onClick={() => setLanguage('en')}
                                        className={`flex-1 rounded-full text-[10px] font-black transition-all ${language === 'en' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500'}`}
                                    >
                                        EN
                                    </button>
                                    <button
                                        onClick={() => setLanguage('hi')}
                                        className={`flex-1 rounded-full text-[10px] font-black transition-all ${language === 'hi' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500'}`}
                                    >
                                        HI
                                    </button>
                                </div>

                                {/* Current Age Badge */}
                                <div className="bg-zinc-100 dark:bg-zinc-900/40 p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center min-w-[120px] transition-all group">
                                    <p className="text-[9px] uppercase font-black text-cyan-600 dark:text-cyan-500 mb-1 leading-none tracking-widest">{t.current_age}</p>
                                    <p className="text-xl font-black text-zinc-900 dark:text-white transition-all group-hover:scale-110">{age} {language === 'hi' ? 'वर्ष' : 'Yrs'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="min-h-[600px] transition-all duration-300">
                            {renderTabContent()}
                        </div>
                        <div className="text-center py-6 border-t border-zinc-200 dark:border-white/5 mt-20 opacity-40 hover:opacity-100 transition-all">
                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-saffron/10 border border-saffron/20 rounded-full transition-all">
                                <div className="w-2 h-2 bg-saffron rounded-full animate-pulse" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-saffron transition-all">{t.node_conn}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
