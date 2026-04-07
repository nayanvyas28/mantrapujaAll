import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, ClipboardList, Crown, Mic, Send, Sparkles, Star, Users, Instagram, Youtube, Share2, Check } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Modal, Linking, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FallbackImage } from '../components/ui/FallbackImage';
import { ResultDisclaimer } from '../components/ui/ResultDisclaimer';
import { Typography } from '../components/ui/Typography';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { aiService, ChatMessage } from '../services/ai';
import { sanitizeText } from '../utils/sanitizer';
import { supabase } from '../utils/supabase';

// { width } = Dimensions.get('window'); // width removed as it was unused

type ChatMode = 'normal' | 'kundli' | 'vastu' | 'horoscope';

interface Message {
    role: 'user' | 'guru' | 'system';
    text: string;
    type?: 'suggestion' | 'form' | 'details';
    showFillFormButton?: boolean;
    showExistingDetailsPrompt?: boolean;
    existingDetails?: {
        name: string;
        dob: string;
        time: string;
        place: string;
    };
}

export default function GuruAIScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { theme, colors } = useTheme();
    const { user, profile } = useAuth();
    const insets = useSafeAreaInsets();
    const scrollRef = useRef<ScrollView>(null);

    const CHAT_STORAGE_KEY = `guru_chat_history_${user?.id || 'anon'}`;
    const DEFAULT_GREETING: Message[] = [
        { role: 'guru', text: 'Pranam! I am your spiritual guide. How can I assist you on your journey today?' }
    ];

    const [message, setMessage] = useState('');
    const [chatMode, setChatMode] = useState<ChatMode>('normal');
    const [isLoading, setIsLoading] = useState(false);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const [chatHistory, setChatHistory] = useState<Message[]>(DEFAULT_GREETING);
    
    // Task-based Unlock Logic
    const [msgCountSinceTask, setMsgCountSinceTask] = useState(0);
    const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
    const TASK_COUNT_KEY = `guru_task_msg_count_${user?.id || 'anon'}`;
    const TASK_THRESHOLD = 5;

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
            // Get real AI response from our admin proxy, passing userId for limit tracking
            const aiResponseText = await aiService.chat(textToSend, formatHistory(chatHistory), user?.id);

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
                text: "I am having trouble connecting to the celestial spheres right now. Please try again in a moment."
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

    const loadHistory = useCallback(async () => {
        if (!user?.id) return; // Wait for auth to be ready

        try {
            // 1. Try Supabase cloud history first
            const { data, error } = await supabase
                .from('ai_usage')
                .select('chat_history')
                .eq('user_id', user.id)
                .single();

            if (!error && data?.chat_history && Array.isArray(data.chat_history) && data.chat_history.length > 0) {
                // Map from DB format {role, content} => App format {role: 'guru'/'user', text}
                const mapped: Message[] = (data.chat_history as any[])
                    .map((m) => ({
                        role: (m.role === 'model' ? 'guru' : 'user') as Message['role'],
                        text: (m.content || m.text || '') as string,
                    }))
                    .filter((m) => m.text.length > 0);

                if (mapped.length > 0) {
                    setChatHistory(mapped);
                    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 200);
                    return; // Success — no need to check AsyncStorage
                }
            }

            // 2. Fallback: try AsyncStorage (local device)
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
    }, [user?.id, CHAT_STORAGE_KEY]);

    // Load chat history: from Supabase first (cloud), fallback to AsyncStorage (local)
    useEffect(() => {
        loadHistory();
        
        // Load task message count
        AsyncStorage.getItem(TASK_COUNT_KEY).then(val => {
            if (val) setMsgCountSinceTask(parseInt(val, 10));
        });
    }, [loadHistory, TASK_COUNT_KEY]);

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

            // Remove the "Fill Form" and "Confirm" buttons from previous messages
            setChatHistory(prev => prev.map(m => ({ ...m, showFillFormButton: false, showConfirmEditButtons: false })));

            // Send the details as a user message
            handleSend(summary, 'kundli');

            // Clear params to avoid re-triggering on re-render
            router.setParams({ kundliSubmitted: undefined });
        }
    }, [params, handleSend, router]);

    const handleConfirmDetails = useCallback(() => {
        const dob = profile?.dob || profile?.onboarding_data?.dob;
        const time = profile?.time_of_birth || profile?.onboarding_data?.tob || profile?.onboarding_data?.time || 'Not set';
        const place = profile?.onboarding_data?.pob || profile?.onboarding_data?.place || 'Not set';
        const name = profile?.full_name || 'User';
        const gender = profile?.gender || 'Not specified';

        const summary = `My Birth Details:\n• Name: ${name}\n• Gender: ${gender}\n• DOB: ${dob}\n• Time: ${time}\n• Place: ${place}`;

        // Remove the confirmation buttons from previous messages
        setChatHistory(prev => prev.map(m => ({ ...m, showConfirmEditButtons: false })));

        // Send the details as a user message
        handleSend(summary, 'kundli');
    }, [profile, handleSend]);

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
            // Entry-point: show the kundli form prompt
            handleSend(suggestion.text, 'kundli', true);
            
            const hasDetails = profile?.full_name && (profile?.dob || profile?.onboarding_data?.dob);
            
            setTimeout(() => {
                const onboarding = profile?.onboarding_data;
                const hasDetails = profile?.dob && onboarding?.place;

                if (hasDetails) {
                    const details = {
                        name: profile.full_name || 'User',
                        dob: profile.dob || onboarding.dob || '',
                        time: onboarding.tob || onboarding.time_of_birth || onboarding.time || '',
                        place: onboarding.place || onboarding.pob || ''
                    };

                    setChatHistory(prev => [...prev, {
                        role: 'guru',
                        text: `I see your birth details in my cosmic records:\n• Name: ${details.name}\n• DOB: ${details.dob}\n• Time: ${details.time}\n• Place: ${details.place}\n\nWould you like me to use these details for your analysis, or would you like to edit them?`,
                        showExistingDetailsPrompt: true,
                        existingDetails: details
                    }]);
                } else {
                    setChatHistory(prev => [...prev, {
                        role: 'guru',
                        text: 'To provide a precise Kundli analysis, I need your birth details. Please tap the button below to fill them in:',
                        showFillFormButton: true
                    }]);
                }
                setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
            }, 600);
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

    const TaskUnlockModal = () => (
        <Modal
            visible={isTaskModalVisible}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.taskModalContent, { backgroundColor: colors.card }]}>
                    <View style={[styles.modalHeaderDecor, { backgroundColor: colors.saffron }]} />
                    
                    <View style={[styles.modalIconCircle, { backgroundColor: colors.saffron + '15' }]}>
                        <Crown size={32} color={colors.saffron} />
                    </View>

                    <Typography variant="h2" style={{ textAlign: 'center', marginBottom: 8 }}>Unlock More Wisdom</Typography>
                    <Typography variant="body" color={colors.mutedForeground} style={{ textAlign: 'center', marginBottom: 24, paddingHorizontal: 10 }}>
                        To continue your journey with GuruJi, please complete any 1 task below:
                    </Typography>

                    <View style={styles.taskList}>
                        <TouchableOpacity style={[styles.taskItem, { borderColor: colors.borderMuted }]} onPress={() => performTask('rate')}>
                            <View style={[styles.taskIcon, { backgroundColor: '#FFD70020' }]}><Star size={20} color="#FFB800" /></View>
                            <Typography variant="body" style={{ flex: 1, fontWeight: '600' }}>5-Star Rating on Play Store</Typography>
                            <ChevronLeft size={18} color={colors.muted} style={{ transform: [{ rotate: '180deg'}] }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.taskItem, { borderColor: colors.borderMuted }]} onPress={() => performTask('refer')}>
                            <View style={[styles.taskIcon, { backgroundColor: '#4ADE8020' }]}><Users size={20} color="#22C55E" /></View>
                            <Typography variant="body" style={{ flex: 1, fontWeight: '600' }}>Refer to 2 Friends</Typography>
                            <ChevronLeft size={18} color={colors.muted} style={{ transform: [{ rotate: '180deg'}] }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.taskItem, { borderColor: colors.borderMuted }]} onPress={() => performTask('social')}>
                            <View style={[styles.taskIcon, { backgroundColor: '#EC489920' }]}><Instagram size={20} color="#DB2777" /></View>
                            <Typography variant="body" style={{ flex: 1, fontWeight: '600' }}>Follow on Instagram</Typography>
                            <ChevronLeft size={18} color={colors.muted} style={{ transform: [{ rotate: '180deg'}] }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.taskItem, { borderColor: colors.borderMuted }]} onPress={() => performTask('story')}>
                            <View style={[styles.taskIcon, { backgroundColor: '#8B5CF620' }]}><Share2 size={20} color="#7C3AED" /></View>
                            <Typography variant="body" style={{ flex: 1, fontWeight: '600' }}>Reshare our Story</Typography>
                            <ChevronLeft size={18} color={colors.muted} style={{ transform: [{ rotate: '180deg'}] }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.taskItem, { borderColor: colors.borderMuted, borderBottomWidth: 0 }]} onPress={() => performTask('youtube')}>
                            <View style={[styles.taskIcon, { backgroundColor: '#EF444420' }]}><Youtube size={20} color="#DC2626" /></View>
                            <Typography variant="body" style={{ flex: 1, fontWeight: '600' }}>Subscribe on Youtube</Typography>
                            <ChevronLeft size={18} color={colors.muted} style={{ transform: [{ rotate: '180deg'}] }} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        style={[styles.premiumUnlockBtn, { backgroundColor: colors.saffron + '10', borderColor: colors.saffron }]}
                        onPress={() => { setIsTaskModalVisible(false); router.push('/guru-ai-upgrade'); }}
                    >
                        <Crown size={16} color={colors.saffron} />
                        <Typography variant="label" color={colors.saffron} style={{ fontWeight: '700', marginLeft: 6 }}>UNLOCK PERMANENTLY (PRO)</Typography>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <TaskUnlockModal />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top, backgroundColor: colors.card, borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>

                <View style={styles.headerTitle}>
                    <View style={[styles.avatarSmall, { borderColor: colors.saffron }]}>
                        <FallbackImage
                            source={require('../assets/images/guru_avatar.png')}
                            style={styles.avatarImage}
                        />
                    </View>
                    <View>
                        <Typography variant="h3" color={colors.foreground}>GuruJi AI</Typography>
                        <View style={styles.onlineBadge}>
                            <View style={styles.greenDot} />
                            <Typography variant="label" color={colors.mutedForeground} style={{ fontSize: 10 }}>Wisdom Real-time</Typography>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => { setChatHistory([{ role: 'guru', text: 'Pranam! How can I help?' }]); setChatMode('normal'); }}
                    style={styles.resetBtn}
                >
                    <Sparkles size={18} color={colors.saffron} />
                </TouchableOpacity>
            </View>

            <ScrollView
                ref={scrollRef}
                contentContainerStyle={[styles.scrollContent]}
                showsVerticalScrollIndicator={false}
            >
                <ResultDisclaimer style={{ marginBottom: 16 }} />
                {chatHistory.map((chat, index) => (
                    <View key={index} style={[
                        styles.messageWrapper,
                        chat.role === 'user' ? styles.userWrapper :
                            chat.role === 'system' ? styles.systemWrapper : styles.guruWrapper
                    ]}>
                        {chat.role === 'system' ? (
                            <View style={[styles.systemMessage, { backgroundColor: colors.saffron + '10', borderColor: colors.saffron + '30' }]}>
                                <Typography variant="bodySmall" color={colors.saffron} style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                    {sanitizeText(chat.text)}
                                </Typography>
                            </View>
                        ) : (
                            <View style={[
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
                            </View>
                        )}
                        {chat.showFillFormButton && (
                            <TouchableOpacity
                                style={[styles.inlineFormBtn, { borderColor: colors.saffron, backgroundColor: colors.saffron + '10' }]}
                                onPress={() => router.push('/kundli-form')}
                            >
                                <ClipboardList size={18} color={colors.saffron} />
                                <Typography variant="body" color={colors.saffron} style={{ fontWeight: '600' }}>Please Fill the Form</Typography>
                            </TouchableOpacity>
                        )}
                        {chat.showExistingDetailsPrompt && chat.existingDetails && (
                            <View style={styles.promptActions}>
                                <TouchableOpacity
                                    style={[styles.inlineBtnSmall, { backgroundColor: colors.saffron }]}
                                    onPress={() => {
                                        const d = chat.existingDetails!;
                                        const summary = `My Birth Details:\n• Name: ${d.name}\n• Gender: \n• DOB: ${d.dob}\n• Time: ${d.time}\n• Place: ${d.place}`;
                                        setChatHistory(prev => prev.map(m => ({ ...m, showExistingDetailsPrompt: false })));
                                        handleSend(summary, 'kundli');
                                    }}
                                >
                                    <Check size={16} color="#fff" />
                                    <Typography variant="label" color="#fff" style={{ fontWeight: '700' }}>CONFIRM & ANALYZE</Typography>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.inlineBtnSmall, { borderColor: colors.saffron, borderWidth: 1 }]}
                                    onPress={() => {
                                        setChatHistory(prev => prev.map(m => ({ ...m, showExistingDetailsPrompt: false })));
                                        router.push('/kundli-form');
                                    }}
                                >
                                    <ClipboardList size={16} color={colors.saffron} />
                                    <Typography variant="label" color={colors.saffron} style={{ fontWeight: '700' }}>EDIT DETAILS</Typography>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}

                {isLoading && (
                    <View style={[styles.messageWrapper, styles.guruWrapper]}>
                        <View style={[styles.bubble, styles.guruBubble, { backgroundColor: colors.card, borderColor: colors.borderMuted, flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
                            <ActivityIndicator size="small" color={colors.saffron} />
                            <Typography variant="bodySmall" color={colors.mutedForeground}>Guruji is thinking...</Typography>
                        </View>
                    </View>
                )}

                {/* Upgrade Banner — shows when query limit is reached */}
                {isLimitReached && (
                    <View style={[styles.upgradeCard, { backgroundColor: colors.saffron + '15', borderColor: colors.saffron }]}>
                        <Crown size={20} color={colors.saffron} />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Typography variant="h3" color={colors.foreground} style={{ fontSize: 14 }}>You&apos;ve reached your limit</Typography>
                            <Typography variant="bodySmall" color={colors.mutedForeground}>Upgrade to Pro to continue chatting with GuruJi</Typography>
                        </View>
                        <TouchableOpacity
                            onPress={() => router.push('/guru-ai-upgrade')}
                            style={[styles.upgradeBtn, { backgroundColor: colors.saffron }]}
                        >
                            <Typography variant="label" color="#fff" style={{ fontWeight: '700' }}>Upgrade</Typography>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {/* Input & Suggestions Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                style={{ flex: 0 }}
            >
                <View style={[styles.bottomArea, { backgroundColor: colors.card }]}>
                    {/* Horizontal Suggestion Chips */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.suggestionsScroll}
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
                    </ScrollView>

                    <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 10, backgroundColor: colors.card, borderTopColor: colors.borderMuted }]}>
                        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.saffron + '15' }]}>
                            <Mic size={22} color={colors.saffron} />
                        </TouchableOpacity>

                        <TextInput
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
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
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
    promptActions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
        width: '100%',
    },
    inlineBtnSmall: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
        borderRadius: 14,
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
    }
});
