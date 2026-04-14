import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, ClipboardList, Crown, Mic, Send, Flame, Star, Users, Instagram, Youtube, Share2, User, Calendar, Clock, MapPin } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Modal, Linking, Share, Dimensions, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FallbackImage } from '../components/ui/FallbackImage';
import { ResultDisclaimer } from '../components/ui/ResultDisclaimer';
import { Typography } from '../components/ui/Typography';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { aiService, ChatMessage } from '../services/ai';
import { sanitizeText } from '../utils/sanitizer';
import { supabase } from '../utils/supabase';

// Type-safe aliases for React 19/Expo 54 compatibility
const RNView = View as any;
const RNScrollView = ScrollView as any;
const RNTextInput = TextInput as any;
const RNActivityIndicator = ActivityIndicator as any;
const RNModal = Modal as any;
const RNKeyboardAvoidingView = KeyboardAvoidingView as any;

// { width } = Dimensions.get('window'); // width removed as it was unused

type ChatMode = 'normal' | 'kundli' | 'vastu' | 'horoscope';

interface Message {
    role: 'user' | 'guru' | 'system';
    text: string;
    type?: 'suggestion' | 'form' | 'details' | 'inline_kundli_form';
    showFillFormButton?: boolean;
}

export default function GuruAIScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { theme, colors } = useTheme();
    const { user, profile } = useAuth();
    const insets = useSafeAreaInsets();
    const scrollRef = useRef<any>(null);
    const { t } = useTranslation();

    const CHAT_STORAGE_KEY = `guru_chat_history_${user?.id || 'anon'}`;
    const DEFAULT_GREETING: Message[] = [
        { role: 'guru', text: t("guru.greeting", 'Pranam! I am your spiritual guide. How can I assist you on your journey today?') }
    ];

    const [message, setMessage] = useState('');
    const [chatMode, setChatMode] = useState<ChatMode>('normal');
    const [isLoading, setIsLoading] = useState(false);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const [chatHistory, setChatHistory] = useState<Message[]>(DEFAULT_GREETING);
    
    // Session State
    const [sessions, setSessions] = useState<any[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);

    const [selectedChatLanguage, setSelectedChatLanguage] = useState<'hi' | 'en'>('hi');
    const LANG_STORAGE_KEY = `guru_chat_lang_${user?.id || 'anon'}`;

    // Task-based Unlock Logic
    const [msgCountSinceTask, setMsgCountSinceTask] = useState(0);
    const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
    const TASK_COUNT_KEY = `guru_task_msg_count_${user?.id || 'anon'}`;
    const TASK_THRESHOLD = 5;

    // Load language preference
    useEffect(() => {
        AsyncStorage.getItem(LANG_STORAGE_KEY).then(val => {
            if (val === 'hi' || val === 'en') setSelectedChatLanguage(val);
        });
    }, [LANG_STORAGE_KEY]);

    const toggleLanguage = async () => {
        const newLang = selectedChatLanguage === 'hi' ? 'en' : 'hi';
        setSelectedChatLanguage(newLang);
        await AsyncStorage.setItem(LANG_STORAGE_KEY, newLang);
    };

    // Inline Form State
    const [kundliForm, setKundliForm] = useState({
        name: profile?.onboarding_data?.name || profile?.full_name || '',
        dob: profile?.onboarding_data?.dob || '',
        time: profile?.onboarding_data?.time || '',
        place: profile?.onboarding_data?.place_of_birth || ''
    });

    const handleSend = useCallback(async (overrideText?: string, mode?: ChatMode, skipApiCall: boolean = false) => {
        const textToSend = overrideText || message;
        if (!textToSend.trim() || isLoading || isTaskModalVisible) return;

        const newUserMessage: Message = { role: 'user', text: textToSend };
        const currentHistory = [...chatHistory, newUserMessage];
        setChatHistory(currentHistory);
        setMessage('');

        if (mode) setChatMode(mode);

        // Automatically scroll to bottom
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

        if (skipApiCall) return;

        setIsLoading(true);

        try {
            // Get real AI response from our admin proxy, passing userId, currentSessionId and language
            const result = await aiService.chat(
                textToSend, 
                formatHistory(chatHistory), 
                user?.id, 
                currentSessionId || undefined,
                selectedChatLanguage
            );
            const aiResponseText = result.text;
            
            // If it was a new session, update the state
            if (!currentSessionId && result.sessionId) {
                setCurrentSessionId(result.sessionId);
                fetchSessions(); // Refresh history list
            }

            // Detect if the server returned a limit-reached or upsell message
            const lowerText = aiResponseText?.toLowerCase() || '';
            const isUpsell = lowerText.includes('pro') || lowerText.includes('limit') || lowerText.includes('credit') || lowerText.includes('upgrade');

            if (isUpsell) {
                setIsLimitReached(true);
            }

            const guruResponse: Message = {
                role: 'guru',
                text: aiResponseText
            };

            setChatHistory(prev => [...prev, guruResponse]);
        } catch (error) {
            console.error('Chat Error:', error);
            const errorMessage: Message = {
                role: 'guru',
                text: t("guru.error", "I am having trouble connecting to the celestial spheres right now. Please try again in a moment.")
            };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            
            // Increment task counter for unpaid users after each successful exchange
            const isPremium = profile?.is_premium || profile?.role === 'premium';
            if (!isPremium) {
                setMsgCountSinceTask(prev => {
                    const next = prev + 1;
                    AsyncStorage.setItem(TASK_COUNT_KEY, next.toString());
                    if (next >= TASK_THRESHOLD) {
                        setTimeout(() => setIsTaskModalVisible(true), 1500);
                    }
                    return next;
                });
            }

            setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
        }
    }, [message, isLoading, chatHistory, user?.id]);

    const fetchSessions = useCallback(async () => {
        if (!user?.id) return;
        try {
            setIsHistoryLoading(true);
            const { data, error } = await supabase
                .from('guru_chat_sessions')
                .select('*')
                .eq('user_id', user.id)
                .order('last_message_at', { ascending: false });
            
            if (!error && data) {
                setSessions(data);
            }
        } catch (err) {
            console.error('Error fetching sessions:', err);
        } finally {
            setIsHistoryLoading(false);
        }
    }, [user?.id]);

    const loadSessionMessages = useCallback(async (sessionId: string) => {
        try {
            setIsLoading(true);
            setCurrentSessionId(sessionId);
            setIsHistoryVisible(false);

            const { data, error } = await supabase
                .from('guru_chat_messages')
                .select('*')
                .eq('session_id', sessionId)
                .order('created_at', { ascending: true });

            if (!error && data) {
                const mapped: Message[] = data.map(m => ({
                    role: m.role === 'model' ? 'guru' : 'user',
                    text: m.content
                }));
                setChatHistory(mapped);
                setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 200);
            }
        } catch (err) {
            console.error('Error loading session messages:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const startNewChat = () => {
        setCurrentSessionId(null);
        setChatHistory(DEFAULT_GREETING);
        setIsHistoryVisible(false);
    };

    const loadHistory = useCallback(async () => {
        if (!user?.id) return; // Wait for auth to be ready
        
        // Always refresh the session list
        fetchSessions(); 

        try {
            // 1. Try to load the most recent session's messages
            const { data: latestSession, error: sError } = await supabase
                .from('guru_chat_sessions')
                .select('id')
                .eq('user_id', user.id)
                .order('last_message_at', { ascending: false })
                .limit(1)
                .single();

            if (!sError && latestSession) {
                loadSessionMessages(latestSession.id);
                return;
            }

            // 2. Fallback: Legacy history check (one long JSON column)
            const { data: legacyData, error: legacyError } = await supabase
                .from('ai_usage')
                .select('chat_history')
                .eq('user_id', user.id)
                .single();

            if (!legacyError && legacyData?.chat_history && Array.isArray(legacyData.chat_history) && legacyData.chat_history.length > 0) {
                // Map from DB format {role, content} => App format {role: 'guru'/'user', text}
                const mapped: Message[] = (legacyData.chat_history as any[])
                    .map((m) => ({
                        role: (m.role === 'model' ? 'guru' : 'user') as Message['role'],
                        text: (m.content || m.text || '') as string,
                    }))
                    .filter((m) => m.text.length > 0);

                if (mapped.length > 0) {
                    setChatHistory(mapped);
                    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 200);
                    return; // Success
                }
            }

            // 3. Fallback: try AsyncStorage (local device)
            const saved = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
            if (saved) {
                const parsed: Message[] = JSON.parse(saved);
                if (parsed.length > 0) {
                    setChatHistory(parsed);
                    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 200);
                }
            }
        } catch (e: any) {
            console.error('Failed to load chat history:', e);
            // Non-critical: just stay with greeting if all fails
        }
    }, [user?.id, CHAT_STORAGE_KEY, fetchSessions, loadSessionMessages]);

    // Load chat history on mount or user change
    useEffect(() => {
        loadHistory();
        
        // Load task count
        AsyncStorage.getItem(TASK_COUNT_KEY).then(val => {
            if (val) setMsgCountSinceTask(val ? parseInt(val, 10) : 0);
        });
    }, [loadHistory, TASK_COUNT_KEY]);
    
    // Auto-scroll on keyboard show
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
        });
        return () => showSubscription.remove();
    }, []);

    const saveHistory = useCallback(async () => {
        try {
            // Only save when we have a real user and more than just the greeting
            if (chatHistory.length > 1) {
                await AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
            }
        } catch (e) {
            console.error('Failed to save chat history:', e);
        }
    }, [chatHistory, CHAT_STORAGE_KEY]);

    // Save chat history to AsyncStorage whenever it changes
    useEffect(() => {
        saveHistory();
    }, [saveHistory]);

    // Format history for Gemini API
    const formatHistory = useCallback((history: Message[]): ChatMessage[] => {
        return history
            .filter(m => m.role !== 'system') // Filter out system UI messages
            .map(m => ({
                role: m.role === 'guru' ? 'model' : 'user',
                parts: [{ text: m.text }]
            }));
    }, []);

    // Handle data returning from Kundli Form screen
    useEffect(() => {
        if (params.kundliSubmitted === 'true' && params.name) {
            const { name, gender, dob, time, place } = params;
            const summary = `My Birth Details:\n• Name: ${name}\n• Gender: ${gender}\n• DOB: ${dob}\n• Time: ${time}\n• Place: ${place}`;

            setChatHistory(prev => prev.map(m => ({ ...m, showFillFormButton: false })));
            handleSend(summary, 'kundli');
            router.setParams({ kundliSubmitted: undefined });
        }
    }, [params, handleSend, router]);

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/');
        }
    };

    // Dynamic suggestions that change based on what the user is chatting about
    const SUGGESTIONS = chatMode === 'kundli' ? [
        { id: 'kundli_lucky', text: 'What are my lucky numbers?' },
        { id: 'kundli_moon', text: 'What is my moon sign?' },
        { id: 'kundli_planet', text: 'Which planet rules my life?' },
        { id: 'kundli_career', text: 'What does my Kundli say about my career?' },
        { id: 'kundli_marriage', text: 'When will I get married?' },
        { id: 'kundli_remedies', text: 'What remedies does my Kundli suggest?' },
    ] : chatMode === 'vastu' ? [
        { id: 'vastu_bedroom', text: 'Best direction for bedroom?' },
        { id: 'vastu_kitchen', text: 'Ideal Vastu for kitchen?' },
        { id: 'vastu_wealth', text: 'Which direction attracts wealth?' },
        { id: 'vastu_main_door', text: 'Is my main door direction auspicious?' },
        { id: 'vastu_remedies', text: 'What are quick Vastu remedies?' },
    ] : [
        { id: 'kundli', text: 'Tell me about my Kundli' },
        { id: 'vastu', text: 'Analyze Home/Office Vastu' },
    ];

    const handleSuggestionPress = (suggestion: { id: string; text: string }) => {
        if (suggestion.id === 'kundli') {
            // Check if user already has data in profile
            const ob = profile?.onboarding_data;
            if (ob?.dob || profile?.dob) {
                handleSend(suggestion.text, 'kundli', true);
                setTimeout(() => {
                    setChatHistory(prev => [...prev, {
                        role: 'guru',
                        text: `I have your birth details on record (DOB: ${ob?.dob || profile?.dob}). Would you like to use these or provide new details?`,
                        type: 'details'
                    }]);
                    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
                }, 600);
            } else {
                handleSend(suggestion.text, 'kundli', true);
                setTimeout(() => {
                    setChatHistory(prev => [...prev, {
                        role: 'guru',
                        text: 'To provide a precise Kundli analysis, I need your birth details. Please fill them in below:',
                        type: 'inline_kundli_form'
                    }]);
                    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
                }, 600);
            }
        } else if (suggestion.id === 'vastu') {
            // Entry-point: show the vastu form prompt
            handleSend(suggestion.text, 'vastu', true);
            setTimeout(() => {
                setChatHistory(prev => [...prev, {
                    role: 'system',
                    text: 'Is this analysis for your Residence or Workspace? Please describe the direction of the main entrance.',
                    type: 'form'
                }]);
                setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
            }, 600);
        } else {
            // All context-aware follow-up suggestions (kundli_*, vastu_*) go straight to GuruJi as questions
            handleSend(suggestion.text);
        }
    };

    const performTask = async (taskId: string) => {
        try {
            switch (taskId) {
                case 'rate':
                    // Open Play Store 5-star rating (placeholder package name)
                    await Linking.openURL('market://details?id=com.mantrapuja.app&showAllReviews=true');
                    break;
                case 'refer':
                    // Open Share dialog for referral
                    await Share.share({
                        message: 'I am getting amazing spiritual guidance from GuruJi AI on Mantra Puja! Download now: https://mantrapuja.com/app',
                        title: 'Mantra Puja Referral'
                    });
                    break;
                case 'social':
                    // Follow on Instagram
                    await Linking.openURL('https://instagram.com/mantrapuja_official');
                    break;
                case 'story':
                    // Reshare Story (opens share dialog for story-like reshare)
                    await Share.share({
                        message: 'Ask anything to GuruJi AI! 🕉️✨ #MantraPuja #GuruJiAI https://mantrapuja.com/app',
                    });
                    break;
                case 'youtube':
                    // Subscribe on YouTube
                    await Linking.openURL('https://youtube.com/@MantraPuja');
                    break;
            }
            
            // Mark task as done and unlock chat
            setMsgCountSinceTask(0);
            await AsyncStorage.setItem(TASK_COUNT_KEY, '0');
            setIsTaskModalVisible(false);
        } catch (error) {
            console.error('Task execution error:', error);
            // Even if it fails, we let them proceed on error to not block UI forever
            setIsTaskModalVisible(false);
        }
    };


    return (
        <RNKeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={[styles.container, { backgroundColor: colors.background }]}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : insets.bottom}
        >
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <RNModal
                visible={isTaskModalVisible}
                transparent={true}
                animationType="slide"
            >
                <RNView style={styles.modalOverlay}>
                    <RNView style={[styles.taskModalContent, { backgroundColor: colors.card }]}>
                        <RNView style={[styles.modalHeaderDecor, { backgroundColor: colors.saffron }]} />
                        
                        <RNView style={[styles.modalIconCircle, { backgroundColor: colors.saffron + '15' }]}>
                            <Crown size={32} color={colors.saffron} />
                        </RNView>

                        <Typography variant="h2" style={{ textAlign: 'center', marginBottom: 8 }}>Unlock More Wisdom</Typography>
                        <Typography variant="body" color={colors.mutedForeground} style={{ textAlign: 'center', marginBottom: 24, paddingHorizontal: 10 }}>
                            To continue your journey with GuruJi, please complete any 1 task below:
                        </Typography>

                        <RNView style={styles.taskList}>
                            <TouchableOpacity style={[styles.taskItem, { borderColor: colors.borderMuted }]} onPress={() => performTask('rate')}>
                                <RNView style={[styles.taskIcon, { backgroundColor: '#FFD70020' }]}><Star size={20} color="#FFB800" /></RNView>
                                <Typography variant="body" style={{ flex: 1, fontWeight: '600' }}>5-Star Rating on Play Store</Typography>
                                <ChevronLeft size={18} color={colors.muted} style={{ transform: [{ rotate: '180deg'}] }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.taskItem, { borderColor: colors.borderMuted }]} onPress={() => performTask('refer')}>
                                <RNView style={[styles.taskIcon, { backgroundColor: '#4ADE8020' }]}><Users size={20} color="#22C55E" /></RNView>
                                <Typography variant="body" style={{ flex: 1, fontWeight: '600' }}>Refer to 2 Friends</Typography>
                                <ChevronLeft size={18} color={colors.muted} style={{ transform: [{ rotate: '180deg'}] }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.taskItem, { borderColor: colors.borderMuted }]} onPress={() => performTask('social')}>
                                <RNView style={[styles.taskIcon, { backgroundColor: '#EC489920' }]}><Instagram size={20} color="#DB2777" /></RNView>
                                <Typography variant="body" style={{ flex: 1, fontWeight: '600' }}>Follow on Instagram</Typography>
                                <ChevronLeft size={18} color={colors.muted} style={{ transform: [{ rotate: '180deg'}] }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.taskItem, { borderColor: colors.borderMuted }]} onPress={() => performTask('story')}>
                                <RNView style={[styles.taskIcon, { backgroundColor: '#8B5CF620' }]}><Share2 size={20} color="#7C3AED" /></RNView>
                                <Typography variant="body" style={{ flex: 1, fontWeight: '600' }}>Reshare our Story</Typography>
                                <ChevronLeft size={18} color={colors.muted} style={{ transform: [{ rotate: '180deg'}] }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.taskItem, { borderColor: colors.borderMuted, borderBottomWidth: 0 }]} onPress={() => performTask('youtube')}>
                                <RNView style={[styles.taskIcon, { backgroundColor: '#EF444420' }]}><Youtube size={20} color="#DC2626" /></RNView>
                                <Typography variant="body" style={{ flex: 1, fontWeight: '600' }}>Subscribe on Youtube</Typography>
                                <ChevronLeft size={18} color={colors.muted} style={{ transform: [{ rotate: '180deg'}] }} />
                            </TouchableOpacity>
                        </RNView>

                        <TouchableOpacity 
                            style={[styles.premiumUnlockBtn, { backgroundColor: colors.saffron + '10', borderColor: colors.saffron }]}
                            onPress={() => { setIsTaskModalVisible(false); router.push('/guru-ai-upgrade'); }}
                        >
                            <Crown size={16} color={colors.saffron} />
                            <Typography variant="label" color={colors.saffron} style={{ fontWeight: '700', marginLeft: 6 }}>UNLOCK PERMANENTLY (PRO)</Typography>
                        </TouchableOpacity>
                    </RNView>
                </RNView>
            </RNModal>

            {/* Header */}
            <RNView style={[styles.header, { paddingTop: insets.top, backgroundColor: colors.card, borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>

                <RNView style={styles.headerTitle}>
                    <RNView style={[styles.avatarSmall, { borderColor: colors.saffron }]}>
                        <FallbackImage
                            source={require('../assets/images/guru_avatar.png')}
                            style={styles.avatarImage}
                        />
                    </RNView>
                    <RNView>
                        <Typography variant="h2" color={colors.foreground}>{t("guru.title", "GuruJi AI")}</Typography>
                        <RNView style={styles.onlineBadge}>
                            <RNView style={styles.greenDot} />
                            <Typography variant="label" color={colors.mutedForeground} style={{ fontSize: 10 }}>Wisdom Real-time</Typography>
                        </RNView>
                    </RNView>
                </RNView>

                <RNView style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity
                        onPress={() => setIsHistoryVisible(true)}
                        style={styles.resetBtn}
                    >
                        <Clock size={20} color={colors.saffron} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={startNewChat}
                        style={styles.resetBtn}
                    >
                        <Flame size={18} color={colors.saffron} />
                    </TouchableOpacity>
                </RNView>
            </RNView>

            {/* Language Selector Bar */}
            <RNView style={[styles.langSelectorBar, { backgroundColor: colors.card, borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity 
                    onPress={() => setSelectedChatLanguage('hi')}
                    style={[
                        styles.langOption, 
                        selectedChatLanguage === 'hi' && { backgroundColor: colors.saffron + '15', borderColor: colors.saffron }
                    ]}
                >
                    <Typography 
                        variant="body" 
                        style={{ color: selectedChatLanguage === 'hi' ? colors.saffron : colors.mutedForeground, fontWeight: '700' }}
                    >
                        हिन्दी
                    </Typography>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => setSelectedChatLanguage('en')}
                    style={[
                        styles.langOption, 
                        selectedChatLanguage === 'en' && { backgroundColor: colors.saffron + '15', borderColor: colors.saffron }
                    ]}
                >
                    <Typography 
                        variant="body" 
                        style={{ color: selectedChatLanguage === 'en' ? colors.saffron : colors.mutedForeground, fontWeight: '700' }}
                    >
                        English
                    </Typography>
                </TouchableOpacity>
            </RNView>

            {/* History Modal */}
            <RNModal
                visible={isHistoryVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsHistoryVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    activeOpacity={1} 
                    onPress={() => setIsHistoryVisible(false)}
                >
                    <RNView style={[styles.historyModalContent, { backgroundColor: colors.card }]}>
                        <RNView style={styles.historyHeader}>
                            <Typography variant="h2" color={colors.foreground}>Chat History</Typography>
                            <TouchableOpacity onPress={() => setIsHistoryVisible(false)} style={styles.closeBtn}>
                                <ChevronLeft size={24} color={colors.muted} style={{ transform: [{rotate: '90deg'}] }} />
                            </TouchableOpacity>
                        </RNView>

                        {isHistoryLoading ? (
                            <RNActivityIndicator color={colors.saffron} style={{ marginVertical: 40 }} />
                        ) : sessions.length === 0 ? (
                            <RNView style={styles.emptyHistory}>
                                <Typography variant="body" color={colors.mutedForeground}>No previous chats found.</Typography>
                            </RNView>
                        ) : (
                            <RNScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
                                {sessions.map((session) => (
                                    <TouchableOpacity 
                                        key={session.id} 
                                        style={[
                                            styles.historyItem, 
                                            { 
                                                borderColor: colors.borderMuted,
                                                backgroundColor: currentSessionId === session.id ? colors.saffron + '10' : 'transparent'
                                            }
                                        ]}
                                        onPress={() => loadSessionMessages(session.id)}
                                    >
                                        <RNView style={styles.historyIcon}>
                                            <Flame size={16} color={colors.saffron} />
                                        </RNView>
                                        <RNView style={{ flex: 1 }}>
                                            <Typography variant="body" color={colors.foreground} numberOfLines={1} style={{ fontWeight: '600' }}>
                                                {session.title || 'Spiritual Session'}
                                            </Typography>
                                            <Typography variant="label" color={colors.mutedForeground}>
                                                {new Date(session.last_message_at).toLocaleDateString()}
                                            </Typography>
                                        </RNView>
                                    </TouchableOpacity>
                                ))}
                            </RNScrollView>
                        )}

                        <TouchableOpacity 
                            style={[styles.startNewBtn, { backgroundColor: colors.saffron }]}
                            onPress={startNewChat}
                        >
                            <Typography variant="body" color="#FFF" style={{ fontWeight: 'bold' }}>START NEW CHAT</Typography>
                        </TouchableOpacity>
                    </RNView>
                </TouchableOpacity>
            </RNModal>

            <RNScrollView
                ref={scrollRef}
                contentContainerStyle={[styles.scrollContent]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <ResultDisclaimer style={{ marginBottom: 16 }} />
                {chatHistory.map((chat, index) => (
                    <RNView key={index} style={[
                        styles.messageWrapper,
                        chat.role === 'user' ? styles.userWrapper :
                            chat.role === 'system' ? styles.systemWrapper : styles.guruWrapper
                    ]}>
                        {chat.role === 'system' ? (
                            <RNView style={[styles.systemMessage, { backgroundColor: colors.saffron + '10', borderColor: colors.saffron + '30' }]}>
                                <Typography variant="bodySmall" color={colors.saffron} style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                    {sanitizeText(chat.text)}
                                </Typography>
                            </RNView>
                        ) : (
                            <RNView style={[
                                styles.bubble,
                                chat.role === 'user'
                                    ? [styles.userBubble, { backgroundColor: colors.saffron }]
                                    : [styles.guruBubble, { backgroundColor: colors.card, borderColor: colors.borderMuted }]
                            ]}>
                                <Typography
                                    variant="body"
                                    color={chat.role === 'user' ? '#ffffff' : colors.foreground}
                                >
                                    {chat.role === 'user' ? chat.text : sanitizeText(chat.text)}
                                </Typography>
                            </RNView>
                        )}
                        {chat.showFillFormButton && (
                            <TouchableOpacity
                                style={[styles.inlineFormBtn, { borderColor: colors.saffron, backgroundColor: colors.saffron + '10' }]}
                                onPress={() => {
                                    setChatHistory(prev => prev.map(m => m === chat ? { ...m, showFillFormButton: false, type: 'inline_kundli_form' } : m));
                                }}
                            >
                                <ClipboardList size={18} color={colors.saffron} />
                                <Typography variant="body" color={colors.saffron} style={{ fontWeight: '600' }}>Please Fill the Form</Typography>
                            </TouchableOpacity>
                        )}
                        {chat.type === 'details' && (
                            <RNView style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                                <TouchableOpacity
                                    style={[styles.inlineFormBtn, { flex: 1, marginTop: 0, borderColor: colors.borderMuted, backgroundColor: colors.background }]}
                                    onPress={() => {
                                        setChatHistory(prev => prev.map(m => m === chat ? { ...m, type: 'inline_kundli_form' } : m));
                                    }}
                                >
                                    <RNView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="body" color={colors.foreground} style={{ fontWeight: '600' }}>Edit Details</Typography>
                                    </RNView>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[styles.inlineFormBtn, { flex: 1, marginTop: 0, borderColor: colors.saffron, backgroundColor: colors.saffron }]}
                                    onPress={() => {
                                        const ob = profile?.onboarding_data;
                                        const summary = `My Birth Details:\n• Name: ${ob?.name || profile?.full_name || 'N/A'}\n• Gender: ${ob?.gender || 'N/A'}\n• DOB: ${ob?.dob}\n• Time: ${ob?.time}\n• Place: ${ob?.place_of_birth}`;
                                        
                                        // Remove details buttons manually
                                        setChatHistory(prev => prev.map(m => m === chat ? { ...m, type: undefined } : m));
                                        handleSend(summary, 'kundli');
                                    }}
                                >
                                    <RNView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="body" color="#FFF" style={{ fontWeight: '600' }}>Continue Chat</Typography>
                                    </RNView>
                                </TouchableOpacity>
                            </RNView>
                        )}
                        {chat.type === 'inline_kundli_form' && (
                            <RNView style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderMuted, borderRadius: 20, padding: 16, marginTop: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, width: '100%' }}>
                                <RNView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                    <RNView style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: colors.saffron + '15', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                        <Flame size={16} color={colors.saffron} />
                                    </RNView>
                                    <Typography variant="h3" color={colors.foreground} style={{ fontSize: 16 }}>Confirm Details</Typography>
                                </RNView>

                                <RNView style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.borderMuted, paddingBottom: 8, marginBottom: 16 }}>
                                   <User size={18} color={colors.mutedForeground} style={{ marginTop: 2, marginRight: 10 }} />
                                   <RNTextInput
                                        style={{ flex: 1, color: colors.foreground, fontSize: 15, padding: 0 }}
                                        placeholder={t("guru.placeholder", "Ask GuruJi anything...")}
                                        placeholderTextColor={colors.mutedForeground}
                                        value={kundliForm.name}
                                        onChangeText={(t: string) => setKundliForm(prev => ({ ...prev, name: t }))}
                                   />
                                </RNView>

                                <RNView style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
                                    <RNView style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.borderMuted, paddingBottom: 8, alignItems: 'center' }}>
                                        <Calendar size={18} color={colors.mutedForeground} style={{ marginRight: 6 }} />
                                        <RNTextInput
                                            style={{ flex: 1, color: colors.foreground, fontSize: 14, padding: 0 }}
                                            placeholder="DD/MM/YYYY"
                                            placeholderTextColor={colors.mutedForeground}
                                            value={kundliForm.dob}
                                            onChangeText={(t: string) => setKundliForm(prev => ({ ...prev, dob: t }))}
                                        />
                                    </RNView>
                                    <RNView style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.borderMuted, paddingBottom: 8, alignItems: 'center' }}>
                                        <Clock size={18} color={colors.mutedForeground} style={{ marginRight: 6 }} />
                                        <RNTextInput
                                            style={{ flex: 1, color: colors.foreground, fontSize: 14, padding: 0 }}
                                            placeholder="HH:MM"
                                            placeholderTextColor={colors.mutedForeground}
                                            value={kundliForm.time}
                                            onChangeText={(t: string) => setKundliForm(prev => ({ ...prev, time: t }))}
                                        />
                                    </RNView>
                                </RNView>

                                <RNView style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.borderMuted, paddingBottom: 8, marginBottom: 24, alignItems: 'center' }}>
                                   <MapPin size={18} color={colors.mutedForeground} style={{ marginRight: 8 }} />
                                   <RNTextInput
                                        style={{ flex: 1, color: colors.foreground, fontSize: 14, padding: 0 }}
                                        placeholder="City, State"
                                        placeholderTextColor={colors.mutedForeground}
                                        value={kundliForm.place}
                                        onChangeText={(t: string) => setKundliForm(prev => ({ ...prev, place: t }))}
                                   />
                                </RNView>

                                <TouchableOpacity
                                    style={{ backgroundColor: colors.saffron, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}
                                    onPress={() => {
                                        const summary = `My Birth Details:\n• Name: ${kundliForm.name || 'Not provided'}\n• DOB: ${kundliForm.dob || 'Not provided'}\n• Time: ${kundliForm.time || 'Not provided'}\n• Place: ${kundliForm.place || 'Not provided'}`;
                                        setChatHistory(prev => prev.map(m => m === chat ? { ...m, type: undefined } : m));
                                        handleSend(summary, 'kundli');
                                    }}
                                >
                                    <Typography variant="body" color="#FFF" style={{ fontWeight: '700', textAlign: 'center' }}>Confirm & Send</Typography>
                                    <ChevronLeft size={18} color="#FFF" style={{ transform: [{ rotate: '180deg' }], marginLeft: 6 }} />
                                </TouchableOpacity>
                            </RNView>
                        )}
                    </RNView>
                ))}

                {isLoading && (
                    <RNView style={[styles.messageWrapper, styles.guruWrapper]}>
                        <RNView style={[styles.bubble, styles.guruBubble, { backgroundColor: colors.card, borderColor: colors.borderMuted, flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
                            <RNActivityIndicator size="small" color={colors.saffron} />
                            <Typography variant="bodySmall" color={colors.mutedForeground}>Guruji is thinking...</Typography>
                        </RNView>
                    </RNView>
                )}

                {/* Upgrade Banner — shows when query limit is reached */}
                {isLimitReached && (
                    <RNView style={[styles.upgradeCard, { backgroundColor: colors.saffron + '15', borderColor: colors.saffron }]}>
                        <Crown size={20} color={colors.saffron} />
                        <RNView style={{ flex: 1, marginLeft: 10 }}>
                            <Typography variant="h3" color={colors.foreground} style={{ fontSize: 14 }}>You&apos;ve reached your limit</Typography>
                            <Typography variant="bodySmall" color={colors.mutedForeground}>Upgrade to Pro to continue chatting with GuruJi</Typography>
                        </RNView>
                        <TouchableOpacity
                            onPress={() => router.push('/guru-ai-upgrade')}
                            style={[styles.upgradeBtn, { backgroundColor: colors.saffron }]}
                        >
                            <Typography variant="label" color="#fff" style={{ fontWeight: '700' }}>Upgrade</Typography>
                        </TouchableOpacity>
                    </RNView>
                )}
            </RNScrollView>

            {/* Input & Suggestions Area */}
            <RNView style={[styles.bottomArea, { backgroundColor: colors.card }]}>
                {/* Horizontal Suggestion Chips */}
                <RNScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.suggestionsScroll}
                    keyboardShouldPersistTaps="handled"
                >
                    {SUGGESTIONS.map((suggestion) => (
                        <TouchableOpacity
                            key={suggestion.id}
                            style={[styles.chip, { backgroundColor: colors.saffron + '10', borderColor: colors.saffron + '40' }]}
                            onPress={() => handleSuggestionPress(suggestion)}
                        >
                            <Typography variant="label" color={colors.saffron} style={{ fontWeight: '600' }}>
                                {suggestion.text}
                            </Typography>
                        </TouchableOpacity>
                    ))}
                </RNScrollView>

                <RNView style={[styles.inputContainer, { paddingBottom: insets.bottom + 10, backgroundColor: colors.card, borderTopColor: colors.borderMuted }]}>
                    <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.saffron + '15' }]}>
                        <Mic size={22} color={colors.saffron} />
                    </TouchableOpacity>

                    <RNTextInput
                        style={[styles.input, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.borderMuted }]}
                        placeholder={chatMode !== 'normal' ? `Asking about ${chatMode}...` : "Ask GuruJi..."}
                        placeholderTextColor={colors.mutedForeground}
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />

                    <TouchableOpacity
                        style={[styles.sendBtn, { backgroundColor: message.trim() ? colors.saffron : colors.mutedForeground + '50' }]}
                        onPress={() => handleSend()}
                        disabled={!message.trim()}
                    >
                        <Send size={20} color="#ffffff" />
                    </TouchableOpacity>
                </RNView>
            </RNView>
        </RNKeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 15,
        borderBottomWidth: 1,
        elevation: 4,
    },
    backButton: { width: 44, height: 44, justifyContent: 'center' },
    headerTitle: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
    avatarSmall: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, overflow: 'hidden' },
    avatarImage: { width: '100%', height: '100%' },
    onlineBadge: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981' },
    langSelectorBar: {
        flexDirection: 'row',
        padding: 8,
        gap: 8,
        borderBottomWidth: 1,
        elevation: 2,
    },
    langOption: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    resetBtn: { padding: 10 },
    scrollContent: { padding: 16, gap: 16, paddingBottom: 110 },
    messageWrapper: { flexDirection: 'column', maxWidth: '85%' },
    userWrapper: { alignSelf: 'flex-end' },
    guruWrapper: { alignSelf: 'flex-start' },
    systemWrapper: { alignSelf: 'center', maxWidth: '100%', width: '100%' },
    systemMessage: { width: '100%', padding: 12, borderRadius: 12, borderWidth: 1, borderStyle: 'dashed' },
    bubble: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20 },
    userBubble: { borderBottomRightRadius: 4 },
    guruBubble: { borderBottomLeftRadius: 4, borderWidth: 1 },
    bottomArea: {
        width: '100%',
    },
    suggestionsScroll: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        elevation: 1,
    },
    inputContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, gap: 12, borderTopWidth: 1 },
    iconBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
    input: { flex: 1, minHeight: 44, maxHeight: 100, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10, fontSize: 16, borderWidth: 1 },
    sendBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
    formCard: {
        width: '100%',
        marginTop: 8,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
    },
    formRow: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: 10
    },
    formInput: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 12,
        fontSize: 14,
    },
    submitBtn: {
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 6,
        elevation: 3,
    },
    inlineFormBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    upgradeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 10,
        padding: 14,
        borderRadius: 16,
        borderWidth: 1.5,
    },
    upgradeBtn: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        padding: 24,
    },
    taskModalContent: {
        borderRadius: 28,
        padding: 24,
        alignItems: 'center',
        overflow: 'hidden',
    },
    modalHeaderDecor: {
        position: 'absolute',
        top: 0,
        height: 6,
        width: '100%',
    },
    modalIconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    taskList: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderRadius: 20,
        marginBottom: 20,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
    },
    taskIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    premiumUnlockBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    historyModalContent: {
        width: '100%',
        borderRadius: 24,
        padding: 20,
        maxHeight: '80%',
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    closeBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyHistory: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 10,
    },
    historyIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,165,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    startNewBtn: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    }
});
