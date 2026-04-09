import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Send, Sparkles, MessageCircle } from 'lucide-react-native';
import { ResultDisclaimer } from '../../components/ui/ResultDisclaimer';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
}

export default function ChatbotScreen() {
    const router = useRouter();
    const { theme, colors: themeColors } = useTheme();
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Namaste! I am Sanatan AI, your spiritual guide. How can I help you on your journey today?',
            isUser: false,
        }
    ]);

    const SUGGESTED_PROMPTS = [
        "What is the significance of Ekadashi?",
        "Suggest a simple daily puja routine.",
        "Meaning of Maha Mrityunjaya Mantra"
    ];

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const newMsg: Message = { id: Date.now().toString(), text, isUser: true };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');

        // Simulate AI response
        setTimeout(() => {
            const response: Message = {
                id: (Date.now() + 1).toString(),
                text: 'This is a simulated response. In a real app, this would connect to an LLM trained on Vedic scriptures.',
                isUser: false
            };
            setMessages(prev => [...prev, response]);
        }, 1000);
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >

                {/* Header */}
                <View style={[styles.header, { borderBottomColor: themeColors.borderMuted, backgroundColor: themeColors.background }]}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ArrowLeft size={24} color={themeColors.foreground} />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Sparkles size={20} color={themeColors.saffron} />
                        <Typography variant="h3" style={{ marginLeft: 8 }}>Sanatan AI</Typography>
                    </View>
                    <View style={{ width: 40 }} />
                </View>

                {/* Disclaimer */}
                <ResultDisclaimer centered={true} style={{ backgroundColor: themeColors.card, paddingVertical: 10 }} />

                <ScrollView
                    contentContainerStyle={styles.chatScroll}
                    showsVerticalScrollIndicator={false}
                >
                    {messages.length === 1 && (
                        <View style={styles.suggestionsContainer}>
                            <Typography variant="label" color={themeColors.mutedForeground} style={{ marginBottom: 12 }}>
                                Suggested Questions
                            </Typography>
                            {SUGGESTED_PROMPTS.map((prompt, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={[styles.suggestionChip, { borderColor: themeColors.border, backgroundColor: themeColors.card }]}
                                    onPress={() => handleSend(prompt)}
                                >
                                    <MessageCircle size={14} color={themeColors.saffron} style={{ marginRight: 8 }} />
                                    <Typography variant="bodySmall" color={themeColors.foreground}>{prompt}</Typography>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {messages.map((msg) => (
                        <View
                            key={msg.id}
                            style={[
                                styles.messageWrapper,
                                msg.isUser ? styles.messageUser : styles.messageAI
                            ]}
                        >
                            <View style={[
                                styles.messageBubble,
                                msg.isUser
                                    ? { backgroundColor: themeColors.saffron }
                                    : { backgroundColor: themeColors.card, borderWidth: 1, borderColor: themeColors.borderMuted }
                            ]}>
                                <Typography variant="body" color={msg.isUser ? '#ffffff' : themeColors.foreground}>
                                    {msg.text}
                                </Typography>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Input Area */}
                <View style={[styles.inputContainer, { backgroundColor: themeColors.background, borderTopColor: themeColors.borderMuted }]}>
                    <TextInput
                        style={[styles.input, { backgroundColor: themeColors.card, borderColor: themeColors.border, color: themeColors.foreground }]}
                        placeholder="Ask a spiritual question..."
                        placeholderTextColor={themeColors.muted}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, { backgroundColor: inputText.trim() ? themeColors.saffron : themeColors.muted }]}
                        onPress={() => handleSend(inputText)}
                        disabled={!inputText.trim()}
                    >
                        <Send size={20} color="#ffffff" />
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatScroll: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 24,
    },
    suggestionsContainer: {
        marginBottom: 24,
        marginTop: 16,
    },
    suggestionChip: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    messageWrapper: {
        marginVertical: 4,
        maxWidth: '85%',
    },
    messageUser: {
        alignSelf: 'flex-end',
    },
    messageAI: {
        alignSelf: 'flex-start',
    },
    messageBubble: {
        padding: 14,
        borderRadius: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 16,
        paddingBottom: Platform.OS === 'ios' ? 16 : 24,
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        minHeight: 48,
        maxHeight: 120,
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 14,
        marginRight: 12,
        fontSize: 16,
    },
    sendButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
