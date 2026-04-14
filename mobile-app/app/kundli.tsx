import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Calendar, ChevronLeft, Clock, MapPin, Wand2, Flame, Trash2, CheckCircle2, User, Share2, Download, AlertCircle, MessageCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Share, Platform, Modal } from 'react-native';

const RNView = View as any;
const RNScrollView = ScrollView as any;
const RNTextInput = TextInput as any;
const RNActivityIndicator = ActivityIndicator as any;
const RNModal = Modal as any;
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/ui/Card';
import { ResultDisclaimer } from '../components/ui/ResultDisclaimer';
import { Typography } from '../components/ui/Typography';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { fetchAstroData } from '../services/astrologyService';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Wallet, CreditCard, Lock, Check, X } from 'lucide-react-native';

const formatToDMY = (d: Date) => {
    const day = d.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
};

export default function KundliScreen() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const { t } = useTranslation();
    const { profile, user } = useAuth();
    const insets = useSafeAreaInsets();
    const isDark = theme === 'dark';

    // Protect Screen
    useEffect(() => {
        if (!user) {
            Alert.alert(
                t('common.login_required', 'Login Required'),
                t('common.login_msg', 'Please log in to continue with your personalized Kundli.'),
                [
                    { text: t('common.cancel', 'Cancel'), onPress: () => router.back(), style: 'cancel' },
                    { text: t('common.login', 'Log In'), onPress: () => router.replace('/login') }
                ]
            );
        }
    }, [user]);

    if (!user) return null; // Prevent flicker before alert

    // Step state: 1 (Details), 2 (Ready to Generate), 3 (Report)
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form state
    const [personName, setPersonName] = useState('');
    const [dob, setDob] = useState(new Date());
    const [tob, setTob] = useState(new Date());
    const [pob, setPob] = useState('');
    const [dobSet, setDobSet] = useState(false);
    const [tobSet, setTobSet] = useState(false);

    // Pickers
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Modal state
    const [isPremium, setIsPremium] = useState(false);
    const [payModalVisible, setPayModalVisible] = useState(false);
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [infoTitle, setInfoTitle] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [infoType, setInfoType] = useState<'info' | 'warning' | 'error' | 'success'>('info');

    const showInfo = (title: string, message: string, type: 'info' | 'warning' | 'error' | 'success' = 'info') => {
        setInfoTitle(title);
        setInfoMessage(message);
        setInfoType(type);
        setInfoModalVisible(true);
    };

    const handleUnlock = () => {
        setPayModalVisible(true);
    };

    const processPayment = async () => {
        setLoading(true);
        // Simulate payment logic
        setTimeout(async () => {
            setIsPremium(true);
            setPayModalVisible(false);
            setLoading(false);
            showInfo("Payment Successful ✨", "Unlock completed! Your premium astrological insights are now ready to explore.", 'success');

            // Persist premium status in the history entry if possible
            if (reportData) {
                try {
                    const existing = await AsyncStorage.getItem('saved_kundlis');
                    let savedList = existing ? JSON.parse(existing) : [];
                    
                    // Find the current one by name, DOB and pob (the unique identifer used in handleGenerate)
                    const index = savedList.findIndex((k: any) => 
                        k.name === (personName || 'User') && 
                        (k.dobFormatted.includes(formatToDMY(dob)) || k.dobFormatted.includes(`${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`)) &&
                        k.pob === pob
                    );

                    if (index !== -1) {
                        savedList[index].isPremium = true;
                        await AsyncStorage.setItem('saved_kundlis', JSON.stringify(savedList));
                        setHistory(savedList);
                    }
                } catch (err) {
                    console.warn('Failed to persist premium status', err);
                }
            }
        }, 1500);
    };

    // Report results and history
    const [reportData, setReportData] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);

    const handleShareReport = async () => {
        if (!reportData) return;
        try {
            const summary = `✨ Kundli Report ✨\n\nName: ${personName || profile?.name}\nBirth: ${formatToDMY(dob)}\nPlace: ${pob}\n\n🌙 Rashi: ${reportData.details?.sign}\n☀️ Sun: ${reportData.details?.sun_sign || '--'}\n🌟 Nakshatra: ${reportData.details?.Naksahtra}\n\nGenerated via Mantra Puja App`;
            await Share.share({
                message: summary,
                title: 'My Kundli Report'
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDownloadReport = async () => {
        if (!reportData) return;
        if (!isPremium) {
            handleUnlock();
            return;
        }
        setLoading(true);
        try {
            const html = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>AstroDekho Kundli Report</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
                        .header { text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 20px; margin-bottom: 30px; }
                        h1 { color: #f97316; margin: 0; }
                        .section { margin-bottom: 25px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
                        .section-title { font-size: 18px; font-weight: bold; color: #f97316; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; }
                        .grid { display: flex; flex-wrap: wrap; gap: 20px; }
                        .grid-item { flex: 1; min-width: 200px; margin-bottom: 10px; }
                        .label { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold; }
                        .value { font-size: 16px; font-weight: 600; color: #1e293b; }
                        .footer { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 50px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>AstroDekho</h1>
                        <p>Detailed Vedic Astrology Report</p>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">Birth Details</div>
                        <div class="grid">
                            <div class="grid-item"><div class="label">Name</div><div class="value">${personName || 'User'}</div></div>
                            <div class="grid-item"><div class="label">Date of Birth</div><div class="value">${formatToDMY(dob)}</div></div>
                            <div class="grid-item"><div class="label">Time of Birth</div><div class="value">${tob.toLocaleTimeString()}</div></div>
                            <div class="grid-item"><div class="label">Place of Birth</div><div class="value">${pob}</div></div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">Astrological Summary</div>
                        <div class="grid">
                            <div class="grid-item"><div class="label">Rashi (Moon Sign)</div><div class="value">${reportData.details?.sign || '--'}</div></div>
                            <div class="grid-item"><div class="label">Ascendant</div><div class="value">${reportData.details?.ascendant || '--'}</div></div>
                            <div class="grid-item"><div class="label">Sunrise</div><div class="value">${reportData.details?.sunrise || reportData.details?.sun_rise || '--'}</div></div>
                            <div class="grid-item"><div class="label">Sunset</div><div class="value">${reportData.details?.sunset || reportData.details?.sun_set || '--'}</div></div>
                            <div class="grid-item"><div class="label">Nakshatra</div><div class="value">${reportData.details?.Naksahtra || '--'}</div></div>
                            <div class="grid-item"><div class="label">Charan</div><div class="value">${reportData.details?.Charan || '--'}</div></div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">Planetary Profile</div>
                        <div class="grid">
                            <div class="grid-item"><div class="label">Varna</div><div class="value">${reportData.details?.Varna || reportData.details?.varna || '--'}</div></div>
                            <div class="grid-item"><div class="label">Yoni</div><div class="value">${reportData.details?.Yoni || reportData.details?.yoni || '--'}</div></div>
                            <div class="grid-item"><div class="label">Gan</div><div class="value">${reportData.details?.Gan || reportData.details?.gan || '--'}</div></div>
                            <div class="grid-item"><div class="label">Nadi</div><div class="value">${reportData.details?.Nadi || reportData.details?.nadi || '--'}</div></div>
                        </div>
                    </div>

                    <div class="footer">
                        Generated via Mantra Puja | AstroDekho App. All rights reserved.
                    </div>
                </body>
            </html>`;

            const { uri } = await Print.printToFileAsync({ html });
            if (Platform.OS === 'ios') {
                await Sharing.shareAsync(uri);
            } else {
                await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Download Kundli PDF', UTI: 'com.adobe.pdf' });
            }
        } catch (error) {
            console.error("PDF Generate Error:", error);
            showInfo("PDF Error", "Could not generate PDF. Please check your permissions or try again.", 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Load history array when component mounts
        loadHistory();
        
        // Pre-fill if profile exists
        if (profile) {
            const onboarding = profile.onboarding_data || {};
            const dobStr = onboarding.dob || profile.dob;
            const timeStr = onboarding.time || profile.time || profile.tob;
            const placeStr = onboarding.place || profile.place || profile.birth_place;
            const nameStr = profile.full_name || profile.name || personName;

            if (nameStr) {
                setPersonName(nameStr);
            }
            if (dobStr) {
                setDob(new Date(dobStr));
                setDobSet(true);
            }
            if (timeStr) {
                const parts = timeStr.split(':');
                if (parts.length >= 2) {
                    let h = parseInt(parts[0]);
                    const m_and_ampm = parts[1].split(' ');
                    let m = parseInt(m_and_ampm[0]);
                    if (m_and_ampm[1]) {
                        const ampm = m_and_ampm[1].toLowerCase();
                        if (ampm === 'pm' && h < 12) h += 12;
                        if (ampm === 'am' && h === 12) h = 0;
                    }
                    const newTob = new Date();
                    newTob.setHours(h, m, 0, 0);
                    setTob(newTob);
                    setTobSet(true);
                }
            }
            if (placeStr) {
                setPob(placeStr);
            }
        }
    }, [profile]);

    const loadHistory = async () => {
        try {
            const val = await AsyncStorage.getItem('saved_kundlis');
            if (val) setHistory(JSON.parse(val));
        } catch (e) {
            console.log('Failed to load history', e);
        }
    };

    const handleDeleteKundli = (id: string, name: string) => {
        Alert.alert(
            "Delete Kundli",
            `Are you sure you want to remove ${name}'s Kundli?`,
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    style: "destructive",
                    onPress: async () => {
                        const updated = history.filter((item: any) => item.id !== id);
                        setHistory(updated);
                        await AsyncStorage.setItem('saved_kundlis', JSON.stringify(updated));
                    }
                }
            ]
        );
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDob(selectedDate);
            setDobSet(true);
        }
    };

    const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setTob(selectedTime);
            setTobSet(true);
        }
    };

    const handleGenerate = async () => {
        if (!dobSet || !pob.trim()) {
            showInfo("Incomplete Details", "Please provide your Date and Place of Birth to calculate the Kundli.", 'warning');
            return;
        }

        setLoading(true);
        try {
            // Prepare request from state
            const req = {
                day: dob.getDate(),
                month: dob.getMonth() + 1,
                year: dob.getFullYear(),
                hour: tob.getHours(),
                min: tob.getMinutes(),
                lat: 25.3176, // Varanasi
                lon: 82.9739,
                tzone: 5.5,
            };

            // Parallel fetching of all Kundli modules for high performance
            const [
                details, planets, d1Chart, moonChart, sunChart, d9Chart, chalitChart, 
                dasha, numeroTable, numeroReport, personality, sunLife, moonLife, 
                marsLife, venusLife, jupiterLife, manglik, kalsarpa, gems, rudra
            ] = await Promise.all([
                fetchAstroData('astro_details', req),
                fetchAstroData('planets', req),
                fetchAstroData('horo_chart_image/D1', req),
                fetchAstroData('horo_chart_image/moon', req),
                fetchAstroData('horo_chart_image/sun', req),
                fetchAstroData('horo_chart_image/D9', req),
                fetchAstroData('horo_chart_image/chalit', req),
                fetchAstroData('major_vdasha', req),
                fetchAstroData('numero_table', req),
                fetchAstroData('numero_report', req),
                fetchAstroData('general_ascendant_report', req),
                fetchAstroData('general_house_report/sun', req),
                fetchAstroData('general_house_report/moon', req),
                fetchAstroData('general_house_report/mars', req),
                fetchAstroData('general_house_report/venus', req),
                fetchAstroData('general_house_report/jupiter', req),
                fetchAstroData('manglik', req),
                fetchAstroData('kalsarpa_details', req),
                fetchAstroData('basic_gem_suggestion', req),
                fetchAstroData('rudraksha_suggestion', req),
            ]);

            const fetchedReport = { 
                details, planets, d1Chart, moonChart, sunChart, d9Chart, chalitChart, dasha, 
                numeroTable, numeroReport, personality, sunLife, moonLife, marsLife, venusLife, jupiterLife, 
                gems, rudra, manglik, kalsarpa
            };
            setReportData(fetchedReport);

            // Save to AsyncStorage explicitly linking the personName
            try {
                const savedKundli = {
                    id: Date.now().toString(),
                    name: personName || 'User',
                    generatedAt: new Date().toISOString(),
                    reqData: req,
                    pob: pob,
                    dobFormatted: `${formatToDMY(dob)} at ${tob.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                    reportData: fetchedReport
                };
                const existing = await AsyncStorage.getItem('saved_kundlis');
                let savedList = existing ? JSON.parse(existing) : [];
                
                // Deduplicate: Don't spam the same Kundli if Name, DOB and Place exactly match
                const duplicateIndex = savedList.findIndex((k: any) => 
                    k.name.trim().toLowerCase() === savedKundli.name.trim().toLowerCase() &&
                    k.dobFormatted === savedKundli.dobFormatted &&
                    k.pob.trim().toLowerCase() === savedKundli.pob.trim().toLowerCase()
                );

                if (duplicateIndex !== -1) {
                    // If it already exists, remove the old one so we can update it at the top
                    savedList.splice(duplicateIndex, 1);
                }

                savedList.unshift(savedKundli);

                // Optional: Keep only the latest 20 charts in history to avoid memory bloat
                if (savedList.length > 20) {
                    savedList = savedList.slice(0, 20);
                }

                await AsyncStorage.setItem('saved_kundlis', JSON.stringify(savedList));
                setHistory(savedList);
            } catch (saveErr) {
                console.warn('Failed to save Kundli locally', saveErr);
            }

            setStep(3);
        } catch (e) {
            console.error("Kundli Generation Flow Error:", e);
            Alert.alert("Cosmic Delay", "Failed to connect with the celestial servers. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <RNView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />

            {/* Header */}
            <RNView style={[styles.header, { paddingTop: insets.top, borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <RNView style={{ flex: 1, alignItems: 'center' }}>
                    <Typography variant="h2" color={colors.foreground} adjustsFontSizeToFit numberOfLines={1}>{t('kundli.title')}</Typography>
                </RNView>
                <RNView style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {step === 3 && (
                        <>
                            <TouchableOpacity onPress={handleDownloadReport} style={{ marginRight: 16 }}>
                                <Download size={22} color={colors.foreground} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleShareReport} style={{ marginRight: 12 }}>
                                <Share2 size={22} color={colors.foreground} />
                            </TouchableOpacity>
                        </>
                    )}
                    {!reportData && <RNView style={{ width: 44 }} />}
                </RNView>
            </RNView>

            <RNScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}>
                {step === 1 && (
                    <RNView style={styles.formContainer}>
                        <Typography variant="h3" style={{ marginBottom: 24 }} color={colors.foreground}>Enter Personal Details</Typography>

                        {/* Name Input */}
                        <RNView style={[styles.inputWrapper, { marginBottom: 16, backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}>
                            <Typography variant="label" color={colors.saffron} style={{ marginRight: 16 }}>{'@'}</Typography>
                            <RNView style={{ flex: 1 }}>
                                <Typography variant="label" color={colors.mutedForeground}>PERSON NAME</Typography>
                                <RNTextInput
                                    style={[styles.textInput, { color: colors.foreground }]}
                                    placeholder="Enter name..."
                                    placeholderTextColor={colors.mutedForeground}
                                    value={personName}
                                    onChangeText={setPersonName}
                                />
                            </RNView>
                        </RNView>

                        {/* DOB Picker */}
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            style={[styles.inputWrapper, { backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}
                        >
                            <Calendar size={20} color={colors.saffron} style={styles.inputIcon} />
                            <RNView style={{ flex: 1 }}>
                                <Typography variant="label" color={colors.mutedForeground}>{t('kundli.date_of_birth')}</Typography>
                                <Typography variant="body" color={dobSet ? colors.foreground : colors.mutedForeground}>
                                    {dobSet ? formatToDMY(dob) : 'Select Date'}
                                </Typography>
                            </RNView>
                        </TouchableOpacity>

                        {/* TOB Picker */}
                        <TouchableOpacity
                            onPress={() => setShowTimePicker(true)}
                            style={[styles.inputWrapper, { marginTop: 16, backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}
                        >
                            <Clock size={20} color={colors.saffron} style={styles.inputIcon} />
                            <RNView style={{ flex: 1 }}>
                                <Typography variant="label" color={colors.mutedForeground}>{t('kundli.time_of_birth')}</Typography>
                                <Typography variant="body" color={tobSet ? colors.foreground : colors.mutedForeground}>
                                    {tobSet ? tob.toLocaleTimeString('en-IN', { hour12: true, hour: '2-digit', minute: '2-digit' }) : 'Select Time'}
                                </Typography>
                            </RNView>
                        </TouchableOpacity>

                        {/* POB Input */}
                        <RNView style={[styles.inputWrapper, { marginTop: 16, backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}>
                            <MapPin size={20} color={colors.saffron} style={styles.inputIcon} />
                            <RNView style={{ flex: 1 }}>
                                <Typography variant="label" color={colors.mutedForeground}>{t('kundli.place_of_birth')}</Typography>
                                <RNTextInput
                                    style={[styles.textInput, { color: colors.foreground }]}
                                    placeholder="City, State"
                                    placeholderTextColor={colors.mutedForeground}
                                    value={pob}
                                    onChangeText={setPob}
                                />
                            </RNView>
                        </RNView>

                        <TouchableOpacity
                            style={[styles.primaryBtn, { backgroundColor: colors.saffron, marginTop: 32 }]}
                            onPress={() => {
                                if (!dobSet || !pob.trim() || !personName.trim()) {
                                    showInfo("Missing Details", "Please enter Name, Date, and Place of Birth to continue exploring your cosmic journey.", 'warning');
                                } else {
                                    setStep(2);
                                }
                            }}
                        >
                            <Typography variant="h3" color="#fff">{t('kundli.continue_btn', 'Continue')}</Typography>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.secondaryBtn, { borderColor: colors.saffron, borderWidth: 1, marginTop: 12 }]}
                            onPress={() => router.push('/guru-ai')}
                        >
                            <Typography variant="body" style={[styles.btnText, { color: colors.saffron, fontWeight: '700', marginRight: 8 }]}>Talk to Pandit</Typography>
                            <MessageCircle size={20} color={colors.saffron} />
                        </TouchableOpacity>


                        {/* Saved Kundlis History List */}
                        {history.length > 0 && (
                            <RNView style={{ marginTop: 40, width: '100%' }}>
                                <Typography variant="label" color={colors.mutedForeground} style={{ marginBottom: 12, textTransform: 'uppercase' }}>PAST KUNDLIS</Typography>
                                {history.map(record => (
                                    <RNView key={record.id} style={[styles.inputWrapper, { padding: 8, paddingLeft: 16, marginBottom: 16, backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}>
                                        <RNView style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.saffron + '20', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                                            <Typography variant="h3" color={colors.saffron}>{record.name.charAt(0)}</Typography>
                                        </RNView>
                                        <TouchableOpacity 
                                            style={{ flex: 1, paddingVertical: 8 }} 
                                            onPress={() => {
                                                setReportData(record.reportData);
                                                setIsPremium(!!record.isPremium);
                                                setStep(3);
                                            }}
                                        >
                                            <Typography variant="body" color={colors.foreground} style={{ fontWeight: 'bold' }}>{record.name}</Typography>
                                            <Typography variant="bodySmall" color={colors.mutedForeground}>{record.dobFormatted?.split(' at ')[0] || '--'} | {record.pob}</Typography>
                                            {record.reportData?.details?.sign && (
                                                <Typography variant="bodySmall" color={colors.foreground} style={{ marginTop: 2 }}>
                                                    Rashi: <Typography variant="bodySmall" style={{ fontWeight: 'bold' }}>{record.reportData.details.sign}</Typography>
                                                </Typography>
                                            )}
                                            <Typography variant="bodySmall" color={colors.saffron} style={{ fontSize: 10, marginTop: 4 }}>{t('common.view_all', 'VIEW CHART')}</Typography>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={{ paddingHorizontal: 16, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' }} 
                                            onPress={() => handleDeleteKundli(record.id, record.name)}
                                        >
                                            <Trash2 size={20} color="#ef4444" />
                                        </TouchableOpacity>
                                    </RNView>
                                ))}
                            </RNView>
                        )}

                        {showDatePicker && (
                            <DateTimePicker value={dob} mode="date" onChange={handleDateChange} maximumDate={new Date()} />
                        )}
                        {showTimePicker && (
                            <DateTimePicker value={tob} mode="time" onChange={handleTimeChange} />
                        )}
                    </RNView>
                )}

                {step === 2 && (
                    <RNView style={styles.generateContainer}>
                        <RNView style={styles.previewBox}>
                            <Typography variant="label" color={colors.saffron}>{t('kundli.ready_to_calc')}</Typography>
                            <Typography variant="h1" align="center" style={{ marginVertical: 8 }}>{pob}</Typography>
                            <Typography variant="body" color={colors.mutedForeground}>{formatToDMY(dob)} at {tob.toLocaleTimeString()}</Typography>

                            <TouchableOpacity onPress={() => setStep(1)} style={{ marginTop: 16 }}>
                                <Typography variant="label" color={colors.saffron}>{t('kundli.edit_details')}</Typography>
                            </TouchableOpacity>
                        </RNView>

                        <TouchableOpacity
                            style={[styles.megaBtn, { backgroundColor: colors.saffron, borderColor: colors.gold + '50' }]}
                            onPress={handleGenerate}
                            disabled={loading}
                        >
                            {loading ? (
                                <RNActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Wand2 size={24} color="#fff" style={{ marginRight: 12 }} />
                                    <Typography variant="h3" color="#fff" style={{ flexShrink: 1 }} adjustsFontSizeToFit numberOfLines={1}>{t('kundli.generate_btn', 'Generate Kundala')}</Typography>
                                </>
                            )}
                        </TouchableOpacity>
                        <Typography variant="bodySmall" align="center" color={colors.mutedForeground} style={{ marginTop: 20 }}>
                            Using official AstrologyAPI servers with your private access.
                        </Typography>
                    </RNView>
                )}

                {step === 3 && reportData && (
                    <KundliResultsView 
                        reportData={reportData} 
                        colors={colors} 
                        isDark={isDark} 
                        isPremium={isPremium} 
                        handleUnlock={handleUnlock}
                        userDetails={{
                            name: personName || profile?.name || 'Vedic Soul',
                            dob: formatToDMY(dob),
                            tob: tob.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            pob: pob
                        }}
                    />
                )}

                {/* GENERIC INFO/WARNING MODAL */}
                <RNModal
                    visible={infoModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setInfoModalVisible(false)}
                >
                    <RNView style={styles.modalOverlay}>
                        <RNView style={[styles.modalContent, { backgroundColor: isDark ? '#1e293b' : '#fff' }]}>
                            {/* Top decorative bar */}
                            <RNView style={[styles.modalTopBar, { backgroundColor: infoType === 'warning' ? '#f59e0b' : (infoType === 'error' ? '#dc2626' : (infoType === 'success' ? '#16a34a' : colors.saffron)) }]} />
                            
                            <RNView style={[styles.modalIconBox, { backgroundColor: infoType === 'warning' ? '#fffbeb' : (infoType === 'error' ? '#fee2e2' : (infoType === 'success' ? '#f0fdf4' : colors.saffron + '15')) }]}>
                                {infoType === 'warning' && <AlertCircle size={36} color="#f59e0b" />}
                                {infoType === 'error' && <X size={36} color="#dc2626" />}
                                {infoType === 'success' && <Check size={36} color="#16a34a" />}
                                {infoType === 'info' && <User size={36} color={colors.saffron} />}
                            </RNView>

                            <Typography variant="h2" align="center" style={{ marginBottom: 12, paddingHorizontal: 12 }}>{infoTitle}</Typography>
                            <Typography variant="body" align="center" color={colors.mutedForeground} style={{ marginBottom: 32, paddingHorizontal: 20 }}>
                                {infoMessage}
                            </Typography>

                            <TouchableOpacity 
                                style={[styles.primaryBtn, { width: '100%', backgroundColor: infoType === 'error' ? '#dc2626' : (infoType === 'warning' ? '#f59e0b' : colors.saffron), height: 56, borderRadius: 16 }]}
                                onPress={() => setInfoModalVisible(false)}
                            >
                                <Typography variant="h3" color="#fff">Continue</Typography>
                            </TouchableOpacity>
                        </RNView>
                    </RNView>
                </RNModal>

                {/* PREMIUM PAYMENT MODAL */}
                <RNModal
                    visible={payModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setPayModalVisible(false)}
                >
                    <RNView style={styles.modalOverlay}>
                        <RNView style={[styles.modalContent, { backgroundColor: isDark ? '#1e293b' : '#fff' }]}>
                            <RNView style={[styles.modalTopBar, { backgroundColor: colors.saffron, width: '40%', opacity: 0.5 }]} />
                            
                            <TouchableOpacity 
                                style={styles.closeBtn} 
                                onPress={() => setPayModalVisible(false)}
                            >
                                <X size={20} color={colors.mutedForeground} />
                            </TouchableOpacity>

                            <RNView style={[styles.modalIconBox, { backgroundColor: colors.saffron + '15', marginTop: 12 }]}>
                                <Lock size={36} color={colors.saffron} />
                            </RNView>

                            <Typography variant="h2" align="center" style={{ marginBottom: 12 }}>Unlock Full Kundli</Typography>
                            <Typography variant="body" align="center" color={colors.mutedForeground} style={{ marginBottom: 28, paddingHorizontal: 24 }}>
                                Get instant access to Detailed Predictions, Dosha Remedies, and Dasha Analysis for life.
                            </Typography>

                            <RNView style={[styles.priceTag, { backgroundColor: isDark ? '#334155' : '#f8fafc', paddingVertical: 24 }]}>
                                <Typography variant="label" color={colors.mutedForeground} style={{ letterSpacing: 2 }}>ONE TIME ACCESS</Typography>
                                <Typography variant="h1" style={{ fontSize: 40, marginTop: 8, color: colors.saffron }}>₹21</Typography>
                            </RNView>

                            <RNView style={{ marginBottom: 32, width: '100%', paddingHorizontal: 16 }}>
                                <RNView style={styles.benefitRow}>
                                    <CheckCircle2 size={18} color="#16a34a" />
                                    <Typography variant="bodySmall" style={{ marginLeft: 12, fontWeight: '500' }}>Vimshottari Dasha Analysis</Typography>
                                </RNView>
                                <RNView style={styles.benefitRow}>
                                    <CheckCircle2 size={18} color="#16a34a" />
                                    <Typography variant="bodySmall" style={{ marginLeft: 12, fontWeight: '500' }}>Manglik & Kalsarpa Dosha Reports</Typography>
                                </RNView>
                                <RNView style={styles.benefitRow}>
                                    <CheckCircle2 size={18} color="#16a34a" />
                                    <Typography variant="bodySmall" style={{ marginLeft: 12, fontWeight: '500' }}>Download High-Quality PDF</Typography>
                                </RNView>
                            </RNView>

                            <TouchableOpacity 
                                style={[styles.primaryBtn, { width: '100%', backgroundColor: colors.saffron, height: 60, borderRadius: 20, elevation: 8, shadowColor: colors.saffron, shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }]}
                                onPress={processPayment}
                                disabled={loading}
                            >
                                {loading ? (
                                    <RNActivityIndicator color="#fff" />
                                ) : (
                                    <RNView style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Wallet size={20} color="#fff" style={{ marginRight: 10 }} />
                                        <Typography variant="h3" color="#fff" style={{ fontSize: 18 }}>Pay ₹21 & Unlock</Typography>
                                    </RNView>
                                )}
                            </TouchableOpacity>

                            <Typography variant="bodySmall" align="center" color={colors.mutedForeground} style={{ marginTop: 20, fontSize: 11 }}>
                                ✨ Secure transaction via SSL & Razorpay
                            </Typography>
                        </RNView>
                    </RNView>
                </RNModal>
            </RNScrollView>
        </RNView>
    );
}

function KundliResultsView({ reportData, colors, isDark, isPremium, handleUnlock, userDetails }: any) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(t('kundli.tab_dashboard', 'Dashboard'));
    const [predTab, setPredTab] = useState('Character');
    
    const tabs = [t('kundli.tab_dashboard', 'Dashboard'), t('kundli.tab_charts'), t('kundli.tab_dasha_dosha', 'Dasha & Dosha'), t('kundli.tab_predictions', 'Predictions'), t('kundli.tab_numero')];

    const PremiumLock = ({ title, desc }: any) => (
        <RNView style={{ padding: 24, alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
            <RNView style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.saffron + '10', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Flame size={40} color={colors.saffron} />
            </RNView>
            <Typography variant="h2" align="center" style={{ marginBottom: 8 }}>{title}</Typography>
            <Typography variant="body" align="center" color={colors.mutedForeground} style={{ marginBottom: 32 }}>{desc}</Typography>
            
            <TouchableOpacity 
                style={[styles.primaryBtn, { width: '100%', backgroundColor: colors.saffron }]}
                onPress={handleUnlock}
            >
                <Typography variant="h3" color="#fff">Unlock for ₹21</Typography>
            </TouchableOpacity>
        </RNView>
    );

    const predCategories = [
        { id: 'Character', label: 'Character', color: colors.blue, data: reportData.personality?.asc_report?.report },
        { id: 'Career', label: 'Career & Edu', color: colors.saffron, data: reportData.sunLife?.house_report },
        { id: 'Relationship', label: 'Relationship', color: colors.gold, data: reportData.venusLife?.house_report },
        { id: 'Health', label: 'Health', color: '#ef4444', data: reportData.marsLife?.house_report },
        { id: 'Jupiter', label: 'Physical', color: '#10b981', data: reportData.jupiterLife?.house_report }
    ];
    const activePred = predCategories.find(c => c.id === predTab);

    const responsiveSvg = (svgHtml: string) => {
        if (!svgHtml) return '';
        let processed = svgHtml;
        if (!processed.includes('viewBox')) {
            processed = processed.replace('<svg ', '<svg viewBox="0 0 350 350" ');
        }
        processed = processed.replace(/width="[0-9]+"/i, 'width="100%"').replace(/height="[0-9]+"/i, 'height="100%"');
        return processed;
    };

    const stripHtml = (html: string) => {
        if (!html) return '';
        return html.replace(/<br\s*\/?>/gi, '\n')
                   .replace(/<\/p>/gi, '\n\n')
                   .replace(/<[^>]+>/g, '')
                   .trim();
    };

    return (
        <RNView style={{ padding: 16 }}>
            {/* BIRTH PROFILE HEADER */}
            <Card variant="solid" style={{ padding: 16, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: colors.saffron }}>
                <RNView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <Typography variant="h3" color={colors.saffron}>{userDetails.name}</Typography>
                    <RNView style={{ backgroundColor: colors.saffron + '15', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                        <Typography variant="label" style={{ fontSize: 10 }} color={colors.saffron}>MALE</Typography>
                    </RNView>
                </RNView>
                <RNView style={{ flexDirection: 'row', gap: 16 }}>
                    <RNView style={{ flex: 1 }}>
                        <Typography variant="label" style={{ fontSize: 10 }} color={colors.mutedForeground}>DATE & TIME</Typography>
                        <Typography variant="bodySmall" style={{ fontWeight: '600' }}>{userDetails.dob} | {userDetails.tob}</Typography>
                    </RNView>
                    <RNView style={{ flex: 1 }}>
                        <Typography variant="label" style={{ fontSize: 10 }} color={colors.mutedForeground}>PLACE</Typography>
                        <Typography variant="bodySmall" style={{ fontWeight: '600' }} numberOfLines={1}>{userDetails.pob}</Typography>
                    </RNView>
                </RNView>
            </Card>

            {/* Custom Mini Tab Navigation */}
            <RNScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ gap: 8, marginBottom: 24, paddingHorizontal: 4 }}
            >
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={[
                            styles.tabButton, 
                            { 
                                backgroundColor: activeTab === tab ? colors.saffron : (isDark ? '#1e293b' : '#f1f5f9'),
                                borderColor: activeTab === tab ? colors.saffron : 'transparent'
                            }
                        ]}
                    >
                        <Typography 
                            variant="label" 
                            color={activeTab === tab ? '#fff' : colors.mutedForeground}
                        >
                            {tab}
                        </Typography>
                    </TouchableOpacity>
                ))}
            </RNScrollView>

            {/* TAB: DASHBOARD (Rich UI mapping AstroDekho) */}
            {activeTab === t('kundli.tab_dashboard', 'Dashboard') && (
                <RNView style={{ animationDuration: '0.3s' }}>
                    {/* TOP STATS */}
                    <RNView style={styles.summaryGrid}>
                        <RNView style={[styles.summaryItem, { borderLeftColor: colors.saffron }]}>
                            <Typography variant="label" style={{marginBottom: 4}}>Rashi (Moon Sign)</Typography>
                            <Typography variant="h3" color={colors.foreground}>{reportData.details?.sign || '--'}</Typography>
                        </RNView>
                        <RNView style={[styles.summaryItem, { borderLeftColor: colors.gold }]}>
                            <Typography variant="label" style={{marginBottom: 4}}>Ascendant (Lagna)</Typography>
                            <Typography variant="h3" color={colors.foreground}>{reportData.details?.ascendant || '--'}</Typography>
                        </RNView>
                    </RNView>
                    <RNView style={[styles.summaryGrid, { marginTop: 12 }]}>
                        <RNView style={[styles.summaryItem, { borderLeftColor: colors.blue }]}>
                            <Typography variant="label" style={{marginBottom: 4}}>Nakshatra</Typography>
                            <Typography variant="h3" color={colors.foreground}>{reportData.details?.Naksahtra || reportData.details?.nakshatra || '--'}</Typography>
                        </RNView>
                        <RNView style={[styles.summaryItem, { borderLeftColor: '#10b981' }]}>
                            <Typography variant="label" style={{marginBottom: 4}}>Charan / Pada</Typography>
                            <Typography variant="h3" color={colors.foreground}>{reportData.details?.Charan || reportData.details?.charan || '--'}</Typography>
                        </RNView>
                    </RNView>

                    {/* BIRTH PANCHANG */}
                    <RNView style={{ marginTop: 24 }}>
                        <RNView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <Calendar size={18} color={colors.saffron} style={{ marginRight: 8 }} />
                            <Typography variant="h3">Birth Panchang</Typography>
                        </RNView>
                        <RNView style={styles.summaryGrid}>
                            {[
                                { label: 'Tithi', value: reportData.details?.Tithi || reportData.details?.tithi || '--', color: colors.saffron },
                                { label: 'Karan', value: reportData.details?.Karan || reportData.details?.karan || '--', color: colors.gold },
                                { label: 'Yog', value: reportData.details?.Yog || reportData.details?.yoga || '--', color: colors.blue },
                                { label: 'Sunrise', value: reportData.details?.Sunrise || reportData.details?.sunrise || reportData.details?.sun_rise || '--', color: '#10b981' },
                                { label: 'Sunset', value: reportData.details?.Sunset || reportData.details?.sunset || reportData.details?.sun_set || '--', color: '#f43f5e' }
                            ].map((item, i) => (
                                <RNView key={i} style={[styles.summaryItem, { borderLeftColor: item.color }]}>
                                    <Typography variant="label" color={colors.mutedForeground} style={{ fontSize: 10, textTransform: 'uppercase' }}>{item.label}</Typography>
                                    <Typography variant="body" style={{ fontWeight: '600', marginTop: 4 }} color={colors.foreground}>{item.value}</Typography>
                                </RNView>
                            ))}
                        </RNView>
                    </RNView>

                    {/* ASTROLOGICAL PROFILE GRID */}
                    <RNView style={{ marginTop: 24 }}>
                        <RNView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <User size={18} color={colors.blue} style={{ marginRight: 8 }} />
                            <Typography variant="h3">Astrological Profile</Typography>
                        </RNView>
                        <RNView style={styles.summaryGrid}>
                            {[
                                { label: 'Varna', value: reportData.details?.Varna || reportData.details?.varna || '--', color: colors.blue },
                                { label: 'Yoni', value: reportData.details?.Yoni || reportData.details?.yoni || '--', color: colors.saffron },
                                { label: 'Gan', value: reportData.details?.Gan || reportData.details?.gan || '--', color: colors.gold },
                                { label: 'Nadi', value: reportData.details?.Nadi || reportData.details?.nadi || '--', color: colors.blue },
                                { label: 'Tatva', value: reportData.details?.Tatva || reportData.details?.tatva || '--', color: '#10b981' },
                                { label: 'Vashya', value: reportData.details?.Vashya || reportData.details?.vashya || '--', color: colors.gold },
                                { label: 'Paya', value: reportData.details?.Paya || reportData.details?.paya || '--', color: colors.blue },
                                { label: 'Name Char', value: reportData.details?.name_alphabet || '--', color: colors.saffron }
                            ].map((item, i) => (
                                <RNView key={i} style={[styles.summaryItem, { borderLeftColor: item.color }]}>
                                    <Typography variant="label" style={{ fontSize: 10, marginBottom: 4 }}>{item.label.toUpperCase()}</Typography>
                                    <Typography variant="body" style={{ fontWeight: '600' }}>{item.value}</Typography>
                                </RNView>
                            ))}
                        </RNView>
                    </RNView>

                    {/* DESTINY SNAPSHOT */}
                    <RNView style={{ marginTop: 24, marginBottom: 20 }}>
                        <RNView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <Flame size={18} color={colors.gold} style={{ marginRight: 8 }} />
                            <Typography variant="h3">Quick Destiny Snapshot</Typography>
                        </RNView>
                        <RNView style={styles.summaryGrid}>
                            {[
                                { label: 'Destiny No.', value: reportData.numeroTable?.destiny_number || reportData.numeroTable?.destiny_num || '--', sub: 'Life Path' },
                                { label: 'Radical No.', value: reportData.numeroTable?.radical_number || reportData.numeroTable?.radical_num || '--', sub: 'Core Trait' },
                                { label: 'Lucky Color', value: reportData.numeroTable?.fav_color || '--', sub: 'Aura' },
                                { label: 'Lucky Stone', value: reportData.numeroTable?.fav_stone || '--', sub: 'Gem' }
                            ].map((item, i) => (
                                <RNView key={i} style={[styles.summaryItem, { borderLeftColor: colors.gold, alignItems: 'center', paddingVertical: 16 }]}>
                                    <Typography variant="label" style={{ fontSize: 10, marginBottom: 4 }}>{item.label.toUpperCase()}</Typography>
                                    <Typography variant="h2" color={colors.gold}>{item.value}</Typography>
                                    {item.sub && <Typography variant="bodySmall" style={{ fontSize: 10, marginTop: 4, opacity: 0.6 }}>{item.sub}</Typography>}
                                </RNView>
                            ))}
                        </RNView>
                    </RNView>
                </RNView>
            )}

            {/* TAB: PREDICTIONS */}
            {activeTab === t('kundli.tab_predictions', 'Predictions') && (
                !isPremium ? 
                    <PremiumLock 
                        title="Detailed Life Predictions" 
                        desc="Unlock Career, Marriage, Health and Gemstone recommendations based on your birth chart."
                    />
                : 
                    <RNView style={{ animationDuration: '0.3s' }}>
                        {reportData.gems && (
                            <RNView style={{ marginBottom: 24 }}>
                                <Typography variant="h3" style={{ marginBottom: 12 }}>Gemstone Recommendations</Typography>
                                <RNScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
                                    {[
                                        { key: 'LIFE', label: 'LIFE GEM', data: reportData.gems.LIFE, color: colors.blue },
                                        { key: 'BENEFIC', label: 'BENEFIC GEM', data: reportData.gems.BENEFIC, color: colors.saffron },
                                        { key: 'LUCKY', label: 'LUCKY GEM', data: reportData.gems.LUCKY, color: '#10b981' }
                                    ].map((gemType, idx) => gemType.data && (
                                        <Card key={idx} variant="solid" style={{ width: 220, padding: 16, backgroundColor: isDark ? '#1e293b' : '#f8fafc', borderColor: isDark ? '#334155' : '#e2e8f0', borderWidth: 1 }}>
                                            <Typography variant="label" color={gemType.color} style={{ marginBottom: 4 }}>{gemType.label}</Typography>
                                            <Typography variant="h3" style={{ marginBottom: 16 }} color={colors.foreground}>{gemType.data.name}</Typography>
                                            
                                            <RNView style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <Typography variant="bodySmall" color={colors.mutedForeground}>Finger</Typography>
                                                <Typography variant="bodySmall" color={colors.foreground} style={{ fontWeight: '600' }}>{gemType.data.wear_finger}</Typography>
                                            </RNView>
                                            <RNView style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <Typography variant="bodySmall" color={colors.mutedForeground}>Metal</Typography>
                                                <Typography variant="bodySmall" color={colors.foreground} style={{ fontWeight: '600' }}>{gemType.data.wear_metal}</Typography>
                                            </RNView>
                                            <RNView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Typography variant="bodySmall" color={colors.mutedForeground}>Day</Typography>
                                                <Typography variant="bodySmall" color={colors.foreground} style={{ fontWeight: '600' }}>{gemType.data.wear_day}</Typography>
                                            </RNView>
                                        </Card>
                                    ))}
                                </RNScrollView>
                            </RNView>
                        )}

                        {reportData.rudra && (
                            <RNView style={{ marginBottom: 24 }}>
                                <Typography variant="label" color={colors.saffron} style={{ marginBottom: 8, textTransform: 'uppercase' }}>Divine Protection</Typography>
                                <Card variant="solid" style={{ padding: 16, borderColor: 'rgba(245, 158, 11, 0.2)', backgroundColor: isDark ? 'rgba(245, 158, 11, 0.05)' : '#fffbeb' }}>
                                    <RNView style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
                                        <Typography variant="h3" color={colors.foreground}>{reportData.rudra.name}</Typography>
                                        <Sparkles size={18} color={colors.saffron} />
                                    </RNView>
                                    <Typography variant="body" color={colors.mutedForeground} style={{ fontStyle: 'italic', marginBottom: 12 }}>{reportData.rudra.recommend}</Typography>
                                    <Typography variant="bodySmall" color={colors.foreground} style={{ lineHeight: 20 }}>
                                        {reportData.rudra.detail}
                                    </Typography>
                                </Card>
                            </RNView>
                        )}

                        <Typography variant="h3" style={{ marginTop: 8, marginBottom: 16 }}>Life Predictions</Typography>
                        
                        <Card variant="solid" style={{ padding: 0, overflow: 'hidden' }}>
                            <RNScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: colors.borderMuted }}>
                                {predCategories.map(cat => (
                                    <TouchableOpacity 
                                        key={cat.id} 
                                        onPress={() => setPredTab(cat.id)}
                                        style={{ 
                                            paddingVertical: 8, 
                                            paddingHorizontal: 16, 
                                            borderRadius: 12, 
                                            backgroundColor: predTab === cat.id ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                                            borderWidth: 1,
                                            borderColor: predTab === cat.id ? colors.saffron : colors.borderMuted
                                        }}
                                    >
                                        <Typography variant="label" color={predTab === cat.id ? colors.saffron : colors.mutedForeground}>{cat.label}</Typography>
                                    </TouchableOpacity>
                                ))}
                            </RNScrollView>
                            <RNView style={{ padding: 20 }}>
                                <Typography variant="label" color={activePred?.color} style={{ marginBottom: 8 }}>{activePred?.label.toUpperCase()}</Typography>
                                <Typography variant="body" color={colors.foreground} style={{ lineHeight: 24 }}>
                                    {activePred?.data ? stripHtml(activePred.data) : "Analysis pending celestial calculations..."}
                                </Typography>
                            </RNView>
                        </Card>
                    </RNView>
            )}

            {/* TAB: PLANETS AND CHARTS */}
            {activeTab === t('kundli.tab_charts') && (
                <RNView>
                    <Typography variant="h3" style={{ marginBottom: 16 }}>{t('kundli.chart_title')}</Typography>
                    <RNScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingBottom: 16 }}>
                        {reportData.d1Chart?.svg && (
                            <Card variant="solid" style={styles.chartCardHorizontal}>
                                <Typography variant="label" style={{ marginBottom: 12 }} color={colors.saffron}>{t('kundli.lagna_d1')}</Typography>
                                <RNView style={styles.chartFrameHorizontal}>
                                    <RNView style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                                        <WebView
                                            source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><style>body,html{margin:0;padding:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;} svg{width:100%;height:100%;max-width:100vmin;}</style></head><body>${responsiveSvg(reportData.d1Chart.svg)}</body></html>` }}
                                            style={{ flex: 1, backgroundColor: 'transparent' }}
                                            javaScriptEnabled={true}
                                            scalesPageToFit={false}
                                            bounces={false}
                                            scrollEnabled={false}
                                        />
                                    </RNView>
                                </RNView>
                            </Card>
                        )}

                        {reportData.moonChart?.svg && (
                            <Card variant="solid" style={styles.chartCardHorizontal}>
                                <Typography variant="label" style={{ marginBottom: 12 }} color={colors.gold}>{t('kundli.moon_chart')}</Typography>
                                <RNView style={styles.chartFrameHorizontal}>
                                    <RNView style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                                        <WebView
                                            source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><style>body,html{margin:0;padding:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;} svg{width:100%;height:100%;max-width:100vmin;}</style></head><body>${responsiveSvg(reportData.moonChart.svg)}</body></html>` }}
                                            style={{ flex: 1, backgroundColor: 'transparent' }}
                                            javaScriptEnabled={true}
                                            scalesPageToFit={false}
                                            bounces={false}
                                            scrollEnabled={false}
                                        />
                                    </RNView>
                                </RNView>
                            </Card>
                        )}

                        {reportData.sunChart?.svg && (
                            <Card variant="solid" style={styles.chartCardHorizontal}>
                                <Typography variant="label" style={{ marginBottom: 12 }} color={colors.saffron}>{t('kundli.sun_chart', 'SUN CHART')}</Typography>
                                <RNView style={styles.chartFrameHorizontal}>
                                    <RNView style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                                        <WebView
                                            source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><style>body,html{margin:0;padding:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;} svg{width:100%;height:100%;max-width:100vmin;}</style></head><body>${responsiveSvg(reportData.sunChart.svg)}</body></html>` }}
                                            style={{ flex: 1, backgroundColor: 'transparent' }}
                                            javaScriptEnabled={true}
                                            scalesPageToFit={false}
                                            bounces={false}
                                            scrollEnabled={false}
                                        />
                                    </RNView>
                                </RNView>
                            </Card>
                        )}

                        {reportData.d9Chart?.svg && (
                            <Card variant="solid" style={styles.chartCardHorizontal}>
                                <Typography variant="label" style={{ marginBottom: 12 }} color={colors.blue}>{t('kundli.navamsha_chart', 'NAVAMSHA (D9)')}</Typography>
                                <RNView style={styles.chartFrameHorizontal}>
                                    <RNView style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                                        <WebView
                                            source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><style>body,html{margin:0;padding:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;} svg{width:100%;height:100%;max-width:100vmin;}</style></head><body>${responsiveSvg(reportData.d9Chart.svg)}</body></html>` }}
                                            style={{ flex: 1, backgroundColor: 'transparent' }}
                                            javaScriptEnabled={true}
                                            scalesPageToFit={false}
                                            bounces={false}
                                            scrollEnabled={false}
                                        />
                                    </RNView>
                                </RNView>
                            </Card>
                        )}

                        {reportData.chalitChart?.svg && (
                            <Card variant="solid" style={styles.chartCardHorizontal}>
                                <Typography variant="label" style={{ marginBottom: 12 }} color={'#10b981'}>{t('kundli.chalit_chart', 'BHAV CHALIT')}</Typography>
                                <RNView style={styles.chartFrameHorizontal}>
                                    <RNView style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                                        <WebView
                                            source={{ html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><style>body,html{margin:0;padding:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;} svg{width:100%;height:100%;max-width:100vmin;}</style></head><body>${responsiveSvg(reportData.chalitChart.svg)}</body></html>` }}
                                            style={{ flex: 1, backgroundColor: 'transparent' }}
                                            javaScriptEnabled={true}
                                            scalesPageToFit={false}
                                            bounces={false}
                                            scrollEnabled={false}
                                        />
                                    </RNView>
                                </RNView>
                            </Card>
                        )}
                    </RNScrollView>

                    <Typography variant="h3" style={{ marginTop: 24, marginBottom: 12 }}>{t('kundli.planet_positions')}</Typography>
                    <Card variant="solid" style={styles.planetCard}>
                        <RNView style={styles.planetHeader}>
                            <Typography variant="label" style={{ flex: 1.5, paddingRight: 4 }} adjustsFontSizeToFit numberOfLines={1}>{t('kundli.planet_name')}</Typography>
                            <Typography variant="label" style={{ flex: 1.5, paddingRight: 4 }} adjustsFontSizeToFit numberOfLines={1}>{t('kundli.planet_sign')}</Typography>
                            <Typography variant="label" style={{ flex: 1, textAlign: 'right' }} adjustsFontSizeToFit numberOfLines={1}>{t('kundli.planet_deg')}</Typography>
                        </RNView>
                        {reportData.planets?.map((p: any, i: number) => (
                            <RNView key={i} style={[styles.planetRow, { borderTopColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                                <Typography variant="label" style={{ flex: 1.5, fontWeight: 'bold', paddingRight: 4 }} adjustsFontSizeToFit numberOfLines={1}>{p.name}</Typography>
                                <Typography variant="bodySmall" style={{ flex: 1.5, paddingRight: 4 }} adjustsFontSizeToFit numberOfLines={1}>{p.sign}</Typography>
                                <Typography variant="bodySmall" style={{ flex: 1, textAlign: 'right' }}>{Math.floor(p.normDegree || p.fullDegree || 0)}°</Typography>
                            </RNView>
                        ))}
                    </Card>
                </RNView>
            )}

            {/* TAB: DASHA & DOSHA */}
            {activeTab === t('kundli.tab_dasha_dosha', 'Dasha & Dosha') && (
                !isPremium ? 
                    <PremiumLock 
                        title="Dasha & Dosha Analysis" 
                        desc="Identify Manglik/Kalsarpa Doshas and check your current Vimshottari Mahadasha timeline."
                    />
                : 
                    <RNView>
                        {/* Dosha Highlights */}
                        <RNView style={{ marginBottom: 24 }}>
                            <Typography variant="h3" style={{ marginBottom: 12 }}>Major Doshas</Typography>
                            <RNView style={{ flexDirection: 'row', gap: 12 }}>
                                <Card variant="solid" style={{ flex: 1, padding: 16, alignItems: 'center', borderLeftWidth: 4, borderLeftColor: reportData.manglik?.is_manglik_present ? '#ef4444' : '#10b981' }}>
                                    <Typography variant="label" color={colors.mutedForeground}>MANGLIK</Typography>
                                    <Typography variant="h3" color={reportData.manglik?.is_manglik_present ? '#ef4444' : '#10b981'} style={{ marginTop: 4 }}>
                                        {reportData.manglik?.is_manglik_present ? "YES" : "NO"}
                                    </Typography>
                                </Card>
                                <Card variant="solid" style={{ flex: 1, padding: 16, alignItems: 'center', borderLeftWidth: 4, borderLeftColor: reportData.kalsarpa?.present ? '#ef4444' : '#10b981' }}>
                                    <Typography variant="label" color={colors.mutedForeground}>KALSARPA</Typography>
                                    <Typography variant="h3" color={reportData.kalsarpa?.present ? '#ef4444' : '#10b981'} style={{ marginTop: 4 }}>
                                        {reportData.kalsarpa?.present ? "YES" : "NO"}
                                    </Typography>
                                </Card>
                            </RNView>
                            {reportData.manglik?.report && (
                                <Typography variant="bodySmall" color={colors.mutedForeground} style={{ marginTop: 12, fontStyle: 'italic' }}>
                                    {reportData.manglik.report}
                                </Typography>
                            )}
                        </RNView>

                        <Typography variant="h3" style={{ marginBottom: 12 }}>{t('kundli.dasha_title')}</Typography>
                        <Typography variant="body" color={colors.mutedForeground} style={{ marginBottom: 16 }}>
                            {t('kundli.dasha_desc')}
                        </Typography>
                        
                        <Card variant="solid" style={styles.planetCard}>
                            <RNView style={styles.planetHeader}>
                                <Typography variant="label" style={{ flex: 1.2, paddingRight: 4 }} adjustsFontSizeToFit numberOfLines={1}>{t('kundli.dasha_lord')}</Typography>
                                <Typography variant="label" style={{ flex: 1, paddingRight: 4 }} adjustsFontSizeToFit numberOfLines={1}>{t('kundli.start_date')}</Typography>
                                <Typography variant="label" style={{ flex: 1, textAlign: 'right' }} adjustsFontSizeToFit numberOfLines={1}>{t('kundli.end_date')}</Typography>
                            </RNView>
                            {reportData.dasha?.map((d: any, i: number) => (
                                <RNView key={i} style={[styles.planetRow, { borderTopColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                                    <RNView style={{ flex: 1.2, flexDirection: 'row', alignItems: 'center', paddingRight: 4 }}>
                                        <RNView style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.saffron, marginRight: 8 }} />
                                        <Typography variant="label" style={{ fontWeight: 'bold', flex: 1 }} adjustsFontSizeToFit numberOfLines={1}>{d.planet}</Typography>
                                    </RNView>
                                    <Typography variant="bodySmall" style={{ flex: 1, paddingRight: 4 }} adjustsFontSizeToFit numberOfLines={1}>{d.start}</Typography>
                                    <Typography variant="bodySmall" style={{ flex: 1, textAlign: 'right' }} adjustsFontSizeToFit numberOfLines={1}>{d.end}</Typography>
                                </RNView>
                            ))}
                        </Card>
                    </RNView>
            )}

            {/* TAB: NUMEROLOGY */}
            {activeTab === t('kundli.tab_numero') && (
                !isPremium ? 
                    <PremiumLock 
                        title="Numerology Deep-Dive" 
                        desc="Unlock your Radical, Destiny, and Name numbers with detailed character reports and lucky factors."
                    />
                : 
                    <RNView>
                        <Typography variant="h3" style={{ marginBottom: 12 }}>{t('kundli.numero_title')}</Typography>
                        
                        {reportData.numeroTable && (
                            <RNView style={{ marginBottom: 24 }}>
                                <RNView style={[styles.summaryGrid, { marginBottom: 24 }]}>
                                    <RNView style={[styles.summaryItem, { borderLeftColor: colors.saffron }]}>
                                        <Typography variant="label" adjustsFontSizeToFit numberOfLines={1}>{t('kundli.radical')}</Typography>
                                        <Typography variant="h2" align="center" style={{ marginTop: 8 }}>{reportData.numeroTable.radical_number || '--'}</Typography>
                                    </RNView>
                                    <RNView style={[styles.summaryItem, { borderLeftColor: colors.gold }]}>
                                        <Typography variant="label" adjustsFontSizeToFit numberOfLines={1}>{t('kundli.destiny')}</Typography>
                                        <Typography variant="h2" align="center" style={{ marginTop: 8 }}>{reportData.numeroTable.destiny_number || '--'}</Typography>
                                    </RNView>
                                    <RNView style={[styles.summaryItem, { borderLeftColor: colors.saffron }]}>
                                        <Typography variant="label" adjustsFontSizeToFit numberOfLines={1}>{t('kundli.name')}</Typography>
                                        <Typography variant="h2" align="center" style={{ marginTop: 8 }}>{reportData.numeroTable.name_number || '--'}</Typography>
                                    </RNView>
                                </RNView>

                                <Typography variant="h3" style={{ marginBottom: 12 }}>{t('kundli.lucky_numbers', 'Numbers Profile')}</Typography>
                                <RNView style={[styles.summaryGrid, { gap: 12, marginBottom: 24, marginTop: 0 }]}>
                                    {reportData.numeroTable.friendly_num && (
                                        <RNView style={[styles.summaryItem, { borderLeftColor: colors.saffron, flexBasis: '47%' }]}>
                                            <Typography variant="label" color={colors.mutedForeground}>{t('kundli.friendly_num', 'FRIENDLY NUMBERS')}</Typography>
                                            <Typography variant="body" color={colors.foreground} style={{ fontWeight: 'bold' }} numberOfLines={2}>{reportData.numeroTable.friendly_num}</Typography>
                                        </RNView>
                                    )}
                                    {reportData.numeroTable.fav_stone && (
                                        <RNView style={[styles.summaryItem, { borderLeftColor: colors.gold, flexBasis: '47%' }]}>
                                            <Typography variant="label" color={colors.mutedForeground}>{t('kundli.fav_stone', 'FAVORABLE STONE')}</Typography>
                                            <Typography variant="body" color={colors.foreground} style={{ fontWeight: 'bold' }} numberOfLines={2}>{reportData.numeroTable.fav_stone}</Typography>
                                        </RNView>
                                    )}
                                    {reportData.numeroTable.fav_day && (
                                        <RNView style={[styles.summaryItem, { borderLeftColor: colors.blue, flexBasis: '47%' }]}>
                                            <Typography variant="label" color={colors.mutedForeground}>{t('kundli.fav_day', 'LUCKY DAY')}</Typography>
                                            <Typography variant="body" color={colors.foreground} style={{ fontWeight: 'bold' }} numberOfLines={2}>{reportData.numeroTable.fav_day}</Typography>
                                        </RNView>
                                    )}
                                    {reportData.numeroTable.fav_metal && (
                                        <RNView style={[styles.summaryItem, { borderLeftColor: '#94a3b8', flexBasis: '47%' }]}>
                                            <Typography variant="label" color={colors.mutedForeground}>{t('kundli.fav_metal', 'FAVORABLE METAL')}</Typography>
                                            <Typography variant="body" color={colors.foreground} style={{ fontWeight: 'bold' }} numberOfLines={2}>{reportData.numeroTable.fav_metal}</Typography>
                                        </RNView>
                                    )}
                                    {reportData.numeroTable.fav_god && (
                                        <RNView style={[styles.summaryItem, { borderLeftColor: colors.saffron, flexBasis: '47%' }]}>
                                            <Typography variant="label" color={colors.mutedForeground}>{t('kundli.fav_god', 'LUCKY GOD')}</Typography>
                                            <Typography variant="body" color={colors.foreground} style={{ fontWeight: 'bold' }} numberOfLines={2}>{reportData.numeroTable.fav_god}</Typography>
                                        </RNView>
                                    )}
                                    {reportData.numeroTable.fav_mantra && (
                                        <RNView style={[styles.summaryItem, { borderLeftColor: colors.gold, width: '100%', flexBasis: '100%', marginTop: 8 }]}>
                                            <Typography variant="label" color={colors.mutedForeground}>{t('kundli.fav_mantra', 'FAVORABLE MANTRA')}</Typography>
                                            <Typography variant="bodySmall" color={colors.foreground} style={{ marginTop: 4 }}>{reportData.numeroTable.fav_mantra}</Typography>
                                        </RNView>
                                    )}
                                </RNView>
                            </RNView>
                        )}

                        {reportData.numeroReport && Array.isArray(reportData.numeroReport) 
                            ? reportData.numeroReport.map((report: any, index: number) => (
                                <Card key={index} variant="solid" style={{ padding: 20, marginBottom: 16 }}>
                                    <Typography variant="label" color={colors.saffron} style={{ marginBottom: 8, textTransform: 'uppercase' }}>
                                        {report.title}
                                    </Typography>
                                    <Typography variant="body" color={colors.mutedForeground} style={{ lineHeight: 22 }}>
                                        {stripHtml(report.description)}
                                    </Typography>
                                </Card>
                            ))
                            : (reportData.numeroReport?.title && (
                                <Card variant="solid" style={{ padding: 20, marginBottom: 16 }}>
                                    <Typography variant="label" color={colors.saffron} style={{ marginBottom: 8, textTransform: 'uppercase' }}>
                                        {reportData.numeroReport.title}
                                    </Typography>
                                    <Typography variant="body" color={colors.mutedForeground} style={{ lineHeight: 22 }}>
                                        {stripHtml(reportData.numeroReport.description)}
                                    </Typography>
                                </Card>
                            ))
                        }
                    </RNView>
            )}


            <ResultDisclaimer style={{ marginTop: 32 }} />
        </RNView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    backButton: { width: 44, height: 44, justifyContent: 'center' },
    scrollContent: { padding: 20 },
    formContainer: {
        marginTop: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
    },
    inputIcon: { marginRight: 16 },
    textInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        padding: 0,
    },
    primaryBtn: {
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryBtn: {
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnText: {
        fontSize: 16,
    },
    generateContainer: {
        marginTop: 20,
    },
    previewBox: {
        alignItems: 'center',
        padding: 32,
        borderRadius: 28,
        backgroundColor: 'rgba(249, 115, 22, 0.05)',
        marginBottom: 40,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'rgba(249, 115, 22, 0.2)',
    },
    megaBtn: {
        flexDirection: 'row',
        height: 76,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    reportContainer: {
        marginTop: 0,
    },
    chartCard: {
        padding: 24,
        borderRadius: 32,
    },
    chartTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    actionRow: {
        flexDirection: 'row',
    },
    chartFrame: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 24,
        overflow: 'hidden',
    },
    chartCardHorizontal: {
        padding: 16,
        borderRadius: 24,
        alignItems: 'center',
    },
    chartFrameHorizontal: {
        width: 300,
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 20,
        overflow: 'hidden',
    },
    kundliImg: {
        width: '100%',
        height: '100%',
    },
    summaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 12,
        gap: 10,
    },
    summaryItem: {
        flexGrow: 1,
        flexBasis: '47%',
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 16,
        borderLeftWidth: 4,
    },
    planetCard: {
        padding: 16,
        borderRadius: 24,
    },
    planetHeader: {
        flexDirection: 'row',
        marginBottom: 8,
        opacity: 0.6,
    },
    planetRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderTopWidth: 1,
    },
    tabButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.75)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        borderRadius: 32,
        padding: 24,
        paddingTop: 32,
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        overflow: 'hidden',
    },
    modalTopBar: {
        position: 'absolute',
        top: 0,
        height: 6,
        width: '100%',
    },
    modalIconBox: {
        width: 84,
        height: 84,
        borderRadius: 42,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
    },
    priceTag: {
        width: '100%',
        paddingVertical: 20,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        width: '100%',
    }
});
