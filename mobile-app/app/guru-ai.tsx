import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, ClipboardList, Crown, Mic, Send, Sparkles } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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
}

export default function GuruAIScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { theme, colors } = useTheme();
    const { user } = useAuth();
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

    const handleSend = useCallback(async (overrideText?: string, mode?: ChatMode, skipApiCall: boolean = false) => {
        const textToSend = overrideText || message;
        if (!textToSend.trim() || isLoading) return;

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
    }, [loadHistory]);

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

            // Remove the "Fill Form" button from previous messages
            setChatHistory(prev => prev.map(m => ({ ...m, showFillFormButton: false })));

            // Send the details as a user message
            handleSend(summary, 'kundli');

            // Clear params to avoid re-triggering on re-render
            router.setParams({ kundliSubmitted: undefined });
        }
    }, [params, handleSend, router]);

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
            setTimeout(() => {
                setChatHistory(prev => [...prev, {
                    role: 'guru',
                    text: 'To provide a precise Kundli analysis, I need your birth details. Please tap the button below to fill them in:',
                    showFillFormButton: true
                }]);
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

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

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
});
