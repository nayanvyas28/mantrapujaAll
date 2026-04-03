"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
    ChevronLeft, 
    Heart, 
    Calculator as CalcIcon, 
    Sun, 
    Moon, 
    Star, 
    Users, 
    Compass, 
    Sparkles, 
    Activity,
    Shield,
    Flame,
    Car,
    Grid3X3,
    Calendar,
    Zap,
    Trophy,
    TrendingUp,
    Map
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    calculateCompatibility, 
    calculateLifePath, 
    calculateExpressionNumber, 
    getSunSign,
    getMoonSign,
    getNakshatra,
    calculateMangalDosha,
    calculateSadeSati,
    calculateIshtaDevata,
    calculateFlames,
    calculateLuckyVehicle,
    generateLoShuGrid,
    getDashaPeriod,
    getMoonPhase,
    getBirthChartData,
    calculateAtmakaraka,
    fetchAstrologyData
} from '@/utils/calculator-logic';
import { getCalculatorDescription, lifePathPredictions, zodiacPredictions, doshaPredictions } from '@/data/calculator-descriptions';

const calculatorConfig: any = {
    // Relationships
    'love': { 
        name: "Love Calculator", icon: Heart, color: "text-pink-600", fields: ['name1', 'name2'], 
        description: "Test romantic compatibility.", 
        longDescription: "The Love Calculator uses name numerology and ancient calculation patterns to determine the energetic harmony between two individuals. It's a fun way to explore the 'vibes' of a romantic connection.",
        apiEndpoint: null 
    },
    'friendship': { 
        name: "Friendship Calculator", icon: Users, color: "text-green-600", fields: ['name1', 'name2'], 
        description: "Check your vibe with friends.", 
        longDescription: "Friendship is built on shared energy and mutual understanding. This tool analyzes the numerical resonance of names to see how well you and your friends align on a spiritual level.",
        apiEndpoint: null 
    },
    'flames': { 
        name: "Flames Calculator", icon: Flame, color: "text-orange-600", fields: ['name1', 'name2'], 
        description: "Old school relationship predictor.", 
        longDescription: "A nostalgic classic! The FLAMES calculator (Friends, Lovers, Affection, Marriage, Enemies, Siblings) provides a playful prediction based on the letters in your names.",
        apiEndpoint: null 
    },
    
    // Zodiac
    'sun-sign': { 
        name: "Sun Sign", icon: Sun, color: "text-amber-600", fields: ['dob'], 
        description: "Your core personality traits.", 
        longDescription: "Your Sun Sign is the core of your astrological identity. It represents your basic personality, your will, and the way you shine in the world.",
        apiEndpoint: 'panchang' 
    },
    'moon-sign': { 
        name: "Moon Sign (Rasi)", icon: Moon, color: "text-indigo-600", fields: ['dob', 'time', 'place'], 
        description: "Your emotional blueprint.", 
        longDescription: "The Moon Sign reveals your inner emotional world, your subconscious, and your deepest needs. In Vedic astrology, the Rasi is a primary key to understanding one's soul.",
        apiEndpoint: 'panchang' 
    },
    'moon-phase': { 
        name: "Moon Phase", icon: Activity, color: "text-slate-600", fields: ['dob'], 
        description: "Current lunar cycle influence.", 
        longDescription: "The phase of the moon at your birth influences your temperament and the 'ebb and flow' of your life's energy. Discover which lunar archetype you belong to.",
        apiEndpoint: 'panchang' 
    },
    
    // Vedic
    'birth-chart': { 
        name: "Birth Chart (Natal)", icon: Map, color: "text-purple-600", fields: ['dob', 'time', 'place'], 
        description: "Full cosmic map of your birth.", 
        longDescription: "A Birth Chart (Kundli) is a snapshot of the sky at the exact moment of your birth. It serves as a cosmic blueprint for your entire life's journey.",
        apiEndpoint: 'yoga' 
    },
    'ascendant': { 
        name: "Ascendant (Lagna)", icon: TrendingUp, color: "text-blue-600", fields: ['dob', 'time', 'place'], 
        description: "Your rising sign & persona.", 
        longDescription: "The Ascendant is the zodiac sign that was rising on the eastern horizon at your birth. It determines your physical appearance and how others perceive you.",
        apiEndpoint: 'panchang' 
    },
    'nakshatra': { 
        name: "Nakshatra Calculator", icon: Star, color: "text-yellow-600", fields: ['dob', 'time', 'place'], 
        description: "Your lunar mansion.", 
        longDescription: "Nakshatras are 27 lunar mansions that provide deep insight into your personality, destiny, and mental tendencies in Vedic astrology.",
        apiEndpoint: 'nakshatra' 
    },
    'dasha': { 
        name: "Dasha Calculator", icon: Calendar, color: "text-rose-600", fields: ['dob', 'time', 'place'], 
        description: "Planetary time periods.", 
        longDescription: "Vimshottari Dasha calculates the planetary periods that influence different stages of your life, revealing when specific karmic events are likely to unfold.",
        apiEndpoint: 'vimshottari-dasha/current' 
    },
    'transit': { 
        name: "Transit Chart", icon: Compass, color: "text-emerald-600", fields: ['dob'], 
        description: "Current planetary movements.", 
        longDescription: "Transit charts show where the planets are currently moving in relation to your birth chart, helping you understand the 'weather' of your current life phase.",
        apiEndpoint: 'panchang' 
    },
    
    // Dosha
    'mangal-dosha': { 
        name: "Mangal Dosha", icon: Zap, color: "text-red-600", fields: ['dob', 'time', 'place'], 
        description: "Check for Mars affliction.", 
        longDescription: "Mangal Dosha is a placement of Mars that can bring intense energy to relationships. Recognizing it allows for conscious balancing and spiritual remedies.",
        apiEndpoint: 'mangal-dosha' 
    },
    'sade-sati': { 
        name: "Shani Sade Sati", icon: Shield, color: "text-stone-600", fields: ['dob'], 
        description: "Saturn's 7.5 year transit.", 
        longDescription: "Sade Sati is the 7.5-year transit of Saturn (Shani) over your natal moon. It is a time of profound learning, discipline, and building a strong foundation.",
        apiEndpoint: 'sade-sati' 
    },
    'kaal-sarp': { 
        name: "Kaal Sarp Dosh", icon: Activity, color: "text-gray-700", fields: ['dob', 'time', 'place'], 
        description: "Rahu-Ketu snake alignment.", 
        longDescription: "Kaal Sarp Dosh occurs when all planets are hemmed in between Rahu and Ketu. It signifies a life of struggle but also the potential for immense success.",
        apiEndpoint: 'kaal-sarp-dosha' 
    },
    
    // Numerology
    'numerology': { 
        name: "Name Numerology", icon: CalcIcon, color: "text-cyan-600", fields: ['name', 'dob'], 
        description: "Power of your name and numbers.", 
        longDescription: "Numerology interprets the vibrational frequency of numbers and letters. Your core numbers reveal your strengths, challenges, and soul's purpose.",
        apiEndpoint: null 
    },
    'lo-shu': { 
        name: "Lo Shu Grid", icon: Grid3X3, color: "text-teal-600", fields: ['dob'], 
        description: "Chinese grid numerology.", 
        longDescription: "The Lo Shu Grid is an ancient 3x3 square used in Chinese numerology (Feng Shui) to analyze a person's fate and potential based on their birth date.",
        apiEndpoint: null 
    },
    'lucky-vehicle': { 
        name: "Lucky Vehicle Number", icon: Car, color: "text-lime-600", fields: ['vehicleNumber'], 
        description: "Is your car plate lucky?", 
        longDescription: "Is your vehicle aligned with your energy? This tool uses numerology to determine if your vehicle number is beneficial for your journey.",
        apiEndpoint: null 
    },
    'ishta-devata': { 
        name: "Ishta Devata", icon: Sparkles, color: "text-saffron", fields: ['dob', 'time', 'place'], 
        description: "Find your guiding deity.", 
        longDescription: "In Vedic tradition, your Ishta Devata is your chosen deity or guiding light. This tool helps identify the form of divinity that resonates with your soul.",
        apiEndpoint: 'ishta-devata' 
    },
    'karaka': { 
        name: "Atma/Darakaraka", icon: Trophy, color: "text-violet-600", fields: ['dob', 'time', 'place'], 
        description: "Soul and Spouse significators.", 
        longDescription: "Chara Karakas are planets that represent key areas of your life. Atmakaraka represents your soul, while Darakaraka represents your spouse or partners.",
        apiEndpoint: 'chara-karaka' 
    }
};

export default function CalculatorTypePage() {
    const params = useParams();
    const type = params.type as string;
    const config = calculatorConfig[type];

    const [formData, setFormData] = useState<any>({
        name: '', name1: '', name2: '', dob: '', time: '12:00', place: 'Delhi', vehicleNumber: ''
    });

    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    if (!config) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Try API first if configured
        if (config.apiEndpoint) {
            const apiParams = {
                datetime: `${formData.dob}T${formData.time || '12:00'}:00+05:30`,
                coordinates: '28.6139,77.2090',
            };
            const apiRes = await fetchAstrologyData(config.apiEndpoint, apiParams);
            if (apiRes && apiRes.status === 'ok') {
                setResult({ ...apiRes.data, isDetailed: true });
                setLoading(false);
                return;
            }
        }

        // Fallback to local logic
        setTimeout(() => {
            let res: any = {};
            switch(type) {
                case 'love': case 'friendship': res = { score: calculateCompatibility(formData.name1, formData.name2, type) }; break;
                case 'flames': res = { status: calculateFlames(formData.name1, formData.name2) }; break;
                case 'sun-sign': res = { sign: getSunSign(formData.dob) }; break;
                case 'moon-sign': case 'rasi': res = { sign: getMoonSign(formData.dob, formData.time, 28, 77) }; break;
                case 'moon-phase': res = { phase: getMoonPhase(formData.dob) }; break;
                case 'numerology': res = { lifePath: calculateLifePath(formData.dob), expression: calculateExpressionNumber(formData.name) }; break;
                case 'mangal-dosha': {
                    const d = calculateMangalDosha(formData.dob, formData.time, 28, 77);
                    res = { verdict: d.verdict, has_dosha: d.has_dosha };
                    break;
                }
                case 'sade-sati': res = { phase: calculateSadeSati(formData.dob) }; break;
                case 'ishta-devata': res = { deity: calculateIshtaDevata(formData.dob) }; break;
                case 'lo-shu': res = { grid: generateLoShuGrid(formData.dob) }; break;
                case 'lucky-vehicle': res = { luckyNumber: calculateLuckyVehicle(formData.vehicleNumber) }; break;
                case 'nakshatra': res = { nakshatra: getNakshatra(formData.dob) }; break;
                case 'karaka': res = { atmakaraka: calculateAtmakaraka(formData.dob) }; break;
                case 'dasha': res = { periods: getDashaPeriod(formData.dob) }; break;
                case 'birth-chart': res = { chart: getBirthChartData(formData.dob) }; break;
                default: res = { message: "Result implementation coming soon." };
            }
            setResult(res);
            setLoading(false);
        }, 800);
    };

    const getPrimaryValue = (res: any, type: string) => {
        if (type === 'love' || type === 'friendship') return `${res.score}%`;
        if (type === 'flames') return res.status;
        if (type === 'sun-sign') return res.sign;
        if (type === 'moon-sign') return res.sign;
        if (type === 'numerology') return res.lifePath;
        if (type === 'mangal-dosha') return res.verdict || (res.has_dosha ? "Present" : "Not Present");
        if (type === 'sade-sati') return res.phase || (res.is_sade_sati ? "Active" : "Not Active");
        if (type === 'ishta-devata') return res.deity;
        if (type === 'nakshatra') return res.nakshatra || (res.panchang?.nakshatra?.[0]?.name);
        if (type === 'lucky-vehicle') return res.luckyNumber;
        return res.value || res.score || res.sign || res.status || res.verdict || res.deity || "Insight";
    };

    const renderResult = () => {
        if (result.isDetailed) {
            const description = getCalculatorDescription(type, result);
            const title = result.has_dosha !== undefined ? (result.has_dosha ? "Dosha Found" : "No Dosha Found") : 
                          result.mangal_dosha?.has_mangal_dosha !== undefined ? (result.mangal_dosha.has_mangal_dosha ? "Manglik Dosha Found" : "No Manglik Dosha") : 
                          result.panchang?.moon_sign?.name || result.yoga?.name || result.nakshatra?.name || 
                          (type === 'sade-sati' ? (result.is_sade_sati ? "Sade Sati Active" : "No Sade Sati") : 
                          type === 'sun-sign' ? `${result.sign || "Zodiac"} Sign` :
                          config.name || "Cosmic Insight");

            return (
                <div className="space-y-8 animate-fade-in">
                    <div className="p-8 bg-white rounded-[40px] border-2 border-slate-100 shadow-xl overflow-hidden relative">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-saffron/5 rounded-full blur-3xl opacity-50" />
                        
                        <div className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
                            {title}
                        </div>

                        {description && (
                            <div className="text-slate-600 font-medium leading-relaxed text-lg mb-8 text-left max-w-xl mx-auto border-l-4 border-saffron/20 pl-6 py-2">
                                {description}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            {result.has_dosha !== undefined && (
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</div>
                                    <div className={`text-lg font-black ${result.has_dosha ? 'text-red-600' : 'text-green-600'}`}>{result.has_dosha ? "YES" : "NO"}</div>
                                </div>
                            )}
                            {result.panchang?.tithi && (
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tithi</div>
                                    <div className="text-lg font-black text-slate-900">{result.panchang.tithi[0].name}</div>
                                </div>
                            )}
                            {result.panchang?.nakshatra && (
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nakshatra</div>
                                    <div className="text-lg font-black text-slate-900">{result.panchang.nakshatra[0].name}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {result.remedy && (
                        <div className="p-6 bg-saffron/5 rounded-3xl border border-saffron/20 text-left">
                            <div className="text-saffron font-black uppercase tracking-widest text-[10px] mb-3">Divine Remedy</div>
                            <p className="text-slate-700 font-bold leading-relaxed">{result.remedy}</p>
                        </div>
                    )}
                </div>
            )
        }
        
        // Custom UIs for specific mock types...
        if (type === 'lo-shu') {
            return (
                <div className="grid grid-cols-3 gap-2 max-w-[300px] mx-auto bg-slate-100 p-2 rounded-xl">
                    {(result.grid as any[]).flat().map((num: any, i: number) => (
                        <div key={i} className="aspect-square bg-white flex items-center justify-center text-2xl font-black text-teal-600 rounded-lg shadow-sm">
                            {num || ""}
                        </div>
                    ))}
                </div>
            );
        }
        if (type === 'birth-chart') {
            return (
                <div className="space-y-8">
                    <div className="relative aspect-square max-w-[300px] mx-auto border-4 border-slate-900 grid grid-cols-3 grid-rows-3 bg-white shadow-2xl">
                        <div className="border border-slate-200 p-1 text-[10px] font-bold">{result.chart?.houses?.[0]?.sign} {result.chart?.houses?.[0]?.planets?.join(', ')}</div>
                        <div className="border border-slate-200"></div>
                        <div className="border border-slate-200"></div>
                        <div className="border border-slate-200 flex items-center justify-center font-black text-slate-400 rotate-45 text-2xl opacity-10">KUNDLI</div>
                        <div className="border border-slate-200 flex items-center justify-center">
                            <Star className="text-saffron animate-pulse" />
                        </div>
                        <div className="border border-slate-200"></div>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-left">
                        <h3 className="text-lg font-black text-slate-900 mb-2">Vedic Birth Chart</h3>
                        <p className="text-sm text-slate-500 font-bold leading-relaxed">This chart represents the planetary positions at the exact moment of your birth. In Vedic astrology, it is the blueprint of your soul's journey in this lifetime.</p>
                    </div>
                </div>
            );
        }
        if (type === 'dasha') {
            return (
                <div className="space-y-4 text-left">
                    {result.periods.map((p: any, i: number) => (
                        <div key={i} className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex justify-between items-center">
                            <span className="font-black text-rose-600">{p.planet}</span>
                            <span className="text-sm font-bold text-slate-500">{p.start} - {p.end}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return (
            <div className="p-8 bg-slate-50 rounded-[40px] border-2 border-slate-100 shadow-inner">
                <div className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
                    {getPrimaryValue(result, type)}
                </div>
                <div className="text-saffron font-black uppercase tracking-widest text-sm mb-6">Your Divine Result</div>
                
                <div className="text-slate-600 font-medium leading-relaxed text-lg mb-4 text-left max-w-xl mx-auto border-l-4 border-saffron/20 pl-6 py-2">
                    {getCalculatorDescription(type, result.score || result.sign || result.phase || result.status || result.verdict || result.deity || result.nakshatra || result.atmakaraka || result.luckyNumber || result.lifePath)}
                </div>

                {(result.expression || result.lifePath) && type === 'numerology' && (
                    <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-2xl shadow-sm">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 font-sans">Life Path</div>
                            <div className="text-2xl font-black text-slate-900">{result.lifePath}</div>
                        </div>
                        <div className="p-4 bg-white rounded-2xl shadow-sm">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 font-sans">Expression</div>
                            <div className="text-2xl font-black text-slate-900">{result.expression}</div>
                        </div>
                    </div>
                )}

                {/* Zodiac Prediction Insight */}
                {(type === 'sun-sign' || type === 'moon-sign' || type === 'moon-phase' || type === 'rasi' || type === 'nakshatra') && (
                    <div className="mt-8 space-y-6 text-left">
                        {(() => {
                            const signName = result.sign || 
                                           (result.panchang?.moon_sign?.[0]?.name) || 
                                           (result.panchang?.sun_sign?.[0]?.name) || 
                                           result.nakshatra;
                            
                            if (!signName || typeof signName !== 'string') return null;
                            const pred = zodiacPredictions[signName];
                            if (!pred) return null;
                            return (
                                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-50 ${config.color || 'text-amber-600'}`}>
                                            <Sun size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 leading-none mb-1">{pred.title}</h3>
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none">Detailed Archetype Prediction</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                                            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 font-sans">Career & Success</h4>
                                            <p className="text-sm font-bold text-slate-700 leading-relaxed">{pred.career}</p>
                                        </div>
                                        <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
                                            <h4 className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-1 font-sans">Love & Relationships</h4>
                                            <p className="text-sm font-bold text-slate-700 leading-relaxed">{pred.love}</p>
                                        </div>
                                        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                                            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1 font-sans">Health & Wellness</h4>
                                            <p className="text-sm font-bold text-slate-700 leading-relaxed">{pred.wellness}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                )}

                {/* Dosha Prediction Insight */}
                {(type === 'mangal-dosha' || type === 'sade-sati') && (
                    <div className="mt-8 space-y-6 text-left">
                        {(() => {
                            let pred: any = null;
                            if (type === 'mangal-dosha') {
                                const hasDosha = result.has_dosha || 
                                               result.mangal_dosha?.has_mangal_dosha || 
                                               (typeof result.verdict === 'string' && result.verdict.includes("Present"));
                                const state = hasDosha ? 'present' : 'absent';
                                pred = doshaPredictions['mangal-dosha'][state];
                            } else if (type === 'sade-sati') {
                                const phaseText = (result.phase || result.status || "").toString();
                                const basePhase = phaseText.includes("Phase 1") ? "Phase 1" : 
                                                 phaseText.includes("Phase 2") ? "Phase 2" : 
                                                 phaseText.includes("Phase 3") ? "Phase 3" : null;
                                pred = basePhase ? doshaPredictions['sade-sati'][basePhase] : null;
                            }
                            
                            if (!pred) return null;
                            return (
                                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-50 text-red-600">
                                            <Shield size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 leading-none mb-1">Vedic Prediction</h3>
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none">Karmic Lifecycle Advice</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {pred.career && (
                                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 font-sans">Career Influence</h4>
                                                <p className="text-sm font-bold text-slate-700 leading-relaxed">{pred.career}</p>
                                            </div>
                                        )}
                                        {pred.love && (
                                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 font-sans">Personal Bonding</h4>
                                                <p className="text-sm font-bold text-slate-700 leading-relaxed">{pred.love}</p>
                                            </div>
                                        )}
                                        {pred.remedy && (
                                            <div className="p-4 bg-saffron/5 rounded-2xl border border-saffron/20">
                                                <h4 className="text-[10px] font-black text-saffron uppercase tracking-widest mb-1 font-sans">Karmic Remedy</h4>
                                                <p className="text-sm font-bold text-slate-700 leading-relaxed">{pred.remedy}</p>
                                            </div>
                                        )}
                                        {pred.wellness && (
                                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 font-sans">Health Care</h4>
                                                <p className="text-sm font-bold text-slate-700 leading-relaxed">{pred.wellness}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="container mx-auto max-w-2xl">
                <Link href="/calculators" className="inline-flex items-center text-slate-400 hover:text-saffron mb-10 font-bold transition-all group no-underline">
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1" /> BACK TO ALL TOOLS
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-50/50 rounded-[50px] p-8 md:p-12 border border-slate-100/50 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 bg-white shadow-xl ${config.color} border border-slate-100`}>
                            <config.icon size={40} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">{config.name}</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{config.description}</p>
                    </div>

                    {!result ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {(config.fields.includes('name1') || config.fields.includes('name2')) && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" required className="h-16 px-6 bg-white border-2 border-slate-100 rounded-3xl outline-none focus:border-saffron font-bold text-slate-800" value={formData.name1} onChange={e => setFormData({...formData, name1: e.target.value})} />
                                    <input type="text" placeholder="Second Name" required className="h-16 px-6 bg-white border-2 border-slate-100 rounded-3xl outline-none focus:border-saffron font-bold text-slate-800" value={formData.name2} onChange={e => setFormData({...formData, name2: e.target.value})} />
                                </div>
                            )}
                            {config.fields.includes('name') && <input type="text" placeholder="Full Name" required className="w-full h-16 px-6 bg-white border-2 border-slate-100 rounded-3xl outline-none focus:border-saffron font-bold text-slate-800" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />}
                            {config.fields.includes('vehicleNumber') && <input type="text" placeholder="Vehicle Number (e.g. DL 01 AB 1234)" required className="w-full h-16 px-6 bg-white border-2 border-slate-100 rounded-3xl outline-none focus:border-saffron font-bold text-slate-800" value={formData.vehicleNumber} onChange={e => setFormData({...formData, vehicleNumber: e.target.value})} />}
                            {config.fields.includes('dob') && (
                                <div className="space-y-4">
                                    <label className="block text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Date of Birth</label>
                                    <input type="date" required className="w-full h-16 px-6 bg-white border-2 border-slate-100 rounded-3xl outline-none focus:border-saffron font-bold text-slate-800" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                                </div>
                            )}
                            {config.fields.includes('time') && <input type="time" className="w-full h-16 px-6 bg-white border-2 border-slate-100 rounded-3xl outline-none focus:border-saffron font-bold text-slate-800" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />}
                            {config.fields.includes('place') && <input type="text" placeholder="Birth Place (City)" className="w-full h-16 px-6 bg-white border-2 border-slate-100 rounded-3xl outline-none focus:border-saffron font-bold text-slate-800" value={formData.place} onChange={e => setFormData({...formData, place: e.target.value})} />}

                            <button type="submit" disabled={loading} className="w-full h-20 bg-slate-900 text-white rounded-[30px] font-black text-xl hover:bg-saffron hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-4">
                                {loading ? <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" /> : "REVEAL DESTINY"}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <AnimatePresence mode="wait">
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                    {renderResult()}
                                    <button onClick={() => setResult(null)} className="mt-12 text-slate-400 font-bold hover:text-saffron transition-all uppercase tracking-widest text-xs">Calculate Again</button>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>

                {/* About this Tool Section */}
                {config.longDescription && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 bg-slate-50/30 rounded-[40px] p-8 md:p-12 border border-slate-100/50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm ${config.color}`}>
                                <CalcIcon size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">About this Tool</h2>
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed text-lg">
                            {config.longDescription}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
