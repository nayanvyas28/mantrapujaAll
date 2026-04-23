"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Send, User, Loader2, 
    MessageCircle, ChevronDown, Trash2, Languages,
    ExternalLink, Heart, ArrowRight, Star, MapPin, ShieldCheck, Phone,
    LogOut, Calendar, Clock, Sun, Maximize2, Minimize2, ShoppingBag
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabaseClient';

const COLLECTION_STEPS = [
    {
        id: 'name',
        en: "Sure! To begin, please tell me your Full Name.",
        hi: "ठीक है! शुरू करने के लिए, कृपया मुझे अपना पूरा नाम बताएं।"
    },
    {
        id: 'dob',
        en: "Thank you. What is your Date of Birth? (e.g., YYYY-MM-DD)",
        hi: "धन्यवाद। आपकी जन्म तिथि क्या है? (जैसे, YYYY-MM-DD)"
    },
    {
        id: 'time',
        en: "And your Birth Time? (e.g., HH:MM / 14:30)",
        hi: "और आपके जन्म का समय? (जैसे, HH:MM / 14:30)"
    },
    {
        id: 'place',
        en: "Almost there! What is your Birth Place (City)?",
        hi: "बस थोड़ा और! आपका जन्म स्थान (शहर) क्या है?"
    },
    {
        id: 'gender',
        en: "Finally, please select your Gender.",
        hi: "अंत में, कृपया अपना लिंग चुनें।"
    }
];

interface ChatTemplate {
    id: string;
    label_en: string;
    label_hi: string;
    prompt_en: string;
    prompt_hi: string;
}

interface Message {
    role: 'user' | 'model';
    content: string;
    isStreaming?: boolean;
}

const Typewriter = ({ text, speed = 20, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);

    // Reset local state if text changes (safety for reused components)
    useEffect(() => {
        setDisplayText('');
        setIndex(0);
    }, [text]);

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayText((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        } else {
            // Typing complete
            if (onComplete) {
                const timer = setTimeout(() => onComplete(), 100);
                return () => clearTimeout(timer);
            }
        }
    }, [index, text, speed, onComplete]);

    return (
        <div dangerouslySetInnerHTML={{ __html: formatDivineMessage(displayText) }} className="space-y-1.5" />
    );
};

const formatDivineMessage = (text: string) => {
    // Escape HTML first to prevent XSS (basic)
    let safeText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Remove tags that we parse separately later
    safeText = safeText.replace(/\[\[PUJA_LINK:.*?\]\]/g, '');
    safeText = safeText.replace(/\[\[START_KUNDLI_FLOW\]\]/g, '');
    
    // Format Headings
    safeText = safeText.replace(/^### (.*?)$/gm, '<h3 class="text-[17px] font-black text-saffron mt-4 mb-2 leading-tight">$1</h3>');
    safeText = safeText.replace(/^#### (.*?)$/gm, '<h4 class="text-[15px] font-bold text-orange-600 dark:text-orange-400 mt-3 mb-1.5 leading-tight">$1</h4>');
    
    // Format Bold
    safeText = safeText.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-saffron">$1</strong>');
    
    // Format Bullet points
    safeText = safeText.replace(/^(?:-|\*) (.*?)$/gm, '<li class="ml-4 mb-1 pl-1 relative before:content-[\'•\'] before:absolute before:-left-4 before:text-saffron before:font-bold">$1</li>');
    
    // Wrap consecutive lists in ul (simple hack)
    safeText = safeText.replace(/(<li.*<\/li>\n*)+/g, match => `<ul class="my-2 space-y-1">${match}</ul>`);
    
    // Newlines to br (ignore if inside block tags)
    safeText = safeText.replace(/\n(?!<)/g, '<br/>');
    
    return safeText.trim();
};

export default function GuruAIChat() {
    const { user } = useAuth();
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [chatLanguage, setChatLanguage] = useState<'en' | 'hi'>('hi');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showInvite, setShowInvite] = useState(false);
    const [dynamicTemplates, setDynamicTemplates] = useState<ChatTemplate[]>([]);
    
    // Auth State for Chat
    const [authStep, setAuthStep] = useState<null | 'phone' | 'otp'>(null);
    const [tempPhone, setTempPhone] = useState('');
    const [pendingAction, setPendingAction] = useState<any>(null);
    const [queuedMessages, setQueuedMessages] = useState<Message[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Queue Processor Effect with Self-Correction
    useEffect(() => {
        const checkQueue = () => {
            // Safety: If there is a message marked as streaming for more than 30 seconds, force clear it
            const streamingMsg = messages.find(m => m.isStreaming);
            if (streamingMsg && !isLoading && queuedMessages.length > 0) {
                // If we are stuck streaming but not loading and have queue, maybe something failed
                // We'll let it be for now, but the standard check below is the main logic
            }

            if (queuedMessages.length > 0 && !messages.some(m => m.isStreaming)) {
                const nextMessage = queuedMessages[0];
                setMessages(prev => [...prev, { ...nextMessage, isStreaming: true }]);
                setQueuedMessages(prev => prev.slice(1));
            }
        };

        const timer = setTimeout(checkQueue, 100);
        return () => clearTimeout(timer);
    }, [queuedMessages, messages, isLoading]);

    // Local Data Collection State
    const [collectionStep, setCollectionStep] = useState<number | null>(null);
    const [collectedData, setCollectedData] = useState<any>({});
    const [placeSuggestions, setPlaceSuggestions] = useState<any[]>([]);
    const [showPlaceSuggestions, setShowPlaceSuggestions] = useState(false);

    const lastActionRef = useRef<{ content: string; time: number } | null>(null);

    // Initial greeting & Database Check
    useEffect(() => {
        const initializeChat = async () => {
            if (messages.length === 0) {
                // Default fallback greetings
                let baseGreetingHi = "Mantra Puja में आपका स्वागत है। नमस्ते! मैं आपका आध्यात्मिक गुरु हूँ।";
                let baseGreetingEn = "Welcome to Mantra Puja. Namaste! I am Guru Ji, your spiritual guide.";
                let dataTextHi = " आज मैं आपकी दिव्य यात्रा में कैसे सहायता कर सकता हूँ?";
                let dataTextEn = " How may I assist you on your divine path today?";
                
                let adminGreetingHi = '';
                let adminGreetingEn = '';

                // 1. Fetch Admin Custom Greetings
                try {
                    const res = await fetch('/api/guru-ai/config');
                    const configData = await res.json();
                    if (configData.greetingHi) adminGreetingHi = configData.greetingHi;
                    if (configData.greetingEn) adminGreetingEn = configData.greetingEn;
                } catch (err) {
                    console.error("Failed to fetch custom greeting config:", err);
                }

                // 2. Fetch User Context
                let userName = '';
                if (user) {
                    try {
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('full_name')
                            .eq('id', user.id)
                            .single();
                            
                        if (profile?.full_name) {
                            userName = profile.full_name;
                        }

                        const { data: vedicProfile } = await supabase
                            .from('user_vedic_profiles')
                            .select('rashi')
                            .eq('user_id', user.id)
                            .single();

                        if (userName) {
                            baseGreetingHi = `हर हर महादेव ${userName} जी! मैं आपका आध्यात्मिक गुरु हूँ।`;
                            baseGreetingEn = `Har Har Mahadev ${userName} ji! I am Guru Ji, your spiritual guide.`;
                        }

                        if (vedicProfile) {
                            dataTextHi = ` मैंने आपके जन्म विवरण और ${vedicProfile.rashi || 'कुंडली'} का अध्ययन कर लिया है। आपके ग्रहों के अनुसार मैं आपको सटीक मार्गदर्शन देने के लिए तैयार हूँ।`;
                            dataTextEn = ` I have studied your birth details and ${vedicProfile.rashi || 'Kundali'}. I am ready to provide you accurate guidance based on your stars.`;
                        } else {
                            const { data: existingK } = await supabase
                                .from('user_kundalis')
                                .select('id')
                                .eq('user_id', user.id)
                                .order('created_at', { ascending: false })
                                .limit(1);

                            if (existingK && existingK.length > 0) {
                                dataTextHi = " मैंने आपकी कुंडली डेटाबेस से प्राप्त कर ली है और मैं आपकी सहायता के लिए तैयार हूँ।";
                                dataTextEn = " I have fetched your Kundali from the database and I am ready to guide you.";
                            }
                        }
                    } catch (error) {
                        console.error("Greeting DB check failed:", error);
                    }
                }

                // 3. Assemble Final Greeting
                let finalWelcomeText = '';
                
                if (chatLanguage === 'hi') {
                    if (adminGreetingHi) {
                        finalWelcomeText = adminGreetingHi.replace('{name}', userName ? `${userName} जी` : '');
                    } else {
                        finalWelcomeText = baseGreetingHi + dataTextHi;
                    }
                } else {
                    if (adminGreetingEn) {
                        finalWelcomeText = adminGreetingEn.replace('{name}', userName ? userName : '');
                    } else {
                        finalWelcomeText = baseGreetingEn + dataTextEn;
                    }
                }

                setQueuedMessages([{ role: 'model', content: finalWelcomeText.trim() }]);
            }
        };

        initializeChat();
    }, [chatLanguage, messages.length, user]);

    // Reset Chat on Logout (Transition based)
    const prevUserRef = useRef(user);
    useEffect(() => {
        if (prevUserRef.current && !user) {
            // User just logged out
            setMessages([]);
            setAuthStep(null);
            setPendingAction(null);
            setCollectionStep(null);
            setCollectedData({});
            setSessionId(null);
        }
        prevUserRef.current = user;
    }, [user]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Automatic invitation slider
    useEffect(() => {
        if (isOpen) {
            setShowInvite(false);
            return;
        }
        const interval = setInterval(() => setShowInvite(prev => !prev), 3000);
        return () => clearInterval(interval);
    }, [isOpen]);

    // Listen for global toggle/open events
    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('toggle-guru-chat', handleToggle);
        window.addEventListener('open-guru-chat', handleOpen);
        return () => {
            window.removeEventListener('toggle-guru-chat', handleToggle);
            window.removeEventListener('open-guru-chat', handleOpen);
        };
    }, []);

    // Fetch History on Open
    useEffect(() => {
        const loadHistory = async () => {
            if (isOpen && (user || sessionId)) {
                try {
                    const params = new URLSearchParams();
                    if (user) params.append('userId', user.id);
                    else if (sessionId) params.append('sessionId', sessionId);

                    const res = await fetch(`/api/chat/history?${params.toString()}`);
                    const data = await res.json();
                    
                    if (data.messages && data.messages.length > 0) {
                        setMessages(prev => {
                            // Only load history if we haven't already started chatting extensively in this session natively
                            if (prev.length <= 2) {
                                return data.messages.map((m: any) => ({
                                    role: m.role,
                                    content: m.content
                                }));
                            }
                            return prev;
                        });
                    }
                } catch (err) {
                    console.error("Failed to load chat history:", err);
                }
            }
        };

        loadHistory();
    }, [isOpen, user, sessionId]);

    // Fetch Dynamic Templates
    const resendOtpLocal = async (phone: string) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/otp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phone.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
            
            if (data.otp && data.bhashConfig) {
                const { user: bUser, pass, sender, template } = data.bhashConfig;
                const bhashUrl = `https://bhashsms.com/api/sendmsg.php?user=${bUser}&pass=${pass}&sender=${sender}&phone=${data.phone}&text=${template}&priority=wa&stype=normal&Params=${data.otp},OTP`;
                fetch(bhashUrl, { mode: 'no-cors' }).catch(e => console.warn("SMS Handshake (Non-Critical):", e.message));
            }

            setMessages(prev => [...prev, { 
                role: 'model', 
                content: chatLanguage === 'hi'
                    ? `क्षमा करें, पिछला OTP काम नहीं किया या आप तक नहीं पहुँचा। मैंने एक नया कोड भेजा है, कृपया उसे यहाँ दर्ज करें।`
                    : `Apologies, it seems the last OTP didn't work or reach you. I've sent a fresh one, please enter it here.`
            }]);
        } catch (err: any) {
            console.error("Resend OTP Error:", err);
            setMessages(prev => [...prev, { 
                role: 'model', 
                content: chatLanguage === 'hi' 
                    ? "सर्वर में कुछ समस्या है, कृपया थोड़ी देर बाद प्रयास करें।" 
                    : "Something went wrong on our end, please try again in a few moments." 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await fetch('/api/guru-ai/config');
                const data = await res.json();
                if (data.templates) {
                    setDynamicTemplates(data.templates);
                }
            } catch (err) {
                console.error("Failed to fetch Guru AI templates:", err);
            }
        };
        fetchTemplates();
    }, []);

    const handleSend = async (e?: React.FormEvent, overrideMessage?: string, skipAuth = false, templateInstruction?: string) => {
        if (e) e.preventDefault();
        
        // Prevent sending if already waiting for a response or typing
        if (isLoading || queuedMessages.length > 0 || messages.some(m => m.isStreaming)) {
            return;
        }

        const userMessage = overrideMessage || input.trim();
        if (!userMessage) return;

        // --- LOOP & REPEAT PROTECTION ---
        const now = Date.now();
        if (lastActionRef.current && lastActionRef.current.content === userMessage && now - lastActionRef.current.time < 2000) {
            console.warn("Duplicate message suppressed");
            return;
        }
        lastActionRef.current = { content: userMessage, time: now };

        if (isLoading && !overrideMessage && !skipAuth) return;

        if (!overrideMessage) setInput('');
        if (!skipAuth) {
            setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        }

        // --- AUTH FLOW INTERCEPTOR ---
        if (!user && authStep === null && !skipAuth) {
            // Trigger Auth Request
            setAuthStep('phone');
            setPendingAction({ message: userMessage });
                setQueuedMessages(prev => [...prev, { 
                    role: 'model', 
                    content: chatLanguage === 'hi'
                        ? "नमस्ते! आगे बढ़ने के लिए कृपया अपना मोबाइल नंबर दर्ज करें।"
                        : "Namaste! To proceed with your spiritual request, please provide your mobile number for a quick verification."
                }]);
            return;
        }

        if (authStep === 'phone' && !skipAuth) {
            setIsLoading(true);
            try {
                const res = await fetch('/api/auth/otp/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone: userMessage.trim() }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

                // Browser-side dispatch (to bypass server network limits)
                if (data.otp && data.bhashConfig) {
                    const { user: bUser, pass, sender, template } = data.bhashConfig;
                    const bhashUrl = `https://bhashsms.com/api/sendmsg.php?user=${bUser}&pass=${pass}&sender=${sender}&phone=${data.phone}&text=${template}&priority=wa&stype=normal&Params=${data.otp},OTP`;
                    fetch(bhashUrl, { mode: 'no-cors' }).catch(e => console.warn("SMS Handshake (Non-Critical):", e.message));
                }

                setTempPhone(userMessage.trim());
                setAuthStep('otp');
                setQueuedMessages(prev => [...prev, { 
                    role: 'model', 
                    content: chatLanguage === 'hi'
                        ? `धन्यवाद! मैंने आपके WhatsApp पर एक OTP भेजा है। कृपया यहाँ कोड दर्ज करें।`
                        : `Thank you! I've sent a 6-digit OTP to your WhatsApp. Please enter it here to verify.`
                }]);
            } catch (err: any) {
                console.error("Chat Auth Send Error:", err);
                setMessages(prev => [...prev, { 
                    role: 'model', 
                    content: chatLanguage === 'hi' 
                        ? "क्षमा करें, OTP भेजने में असमर्थ। कृपया नंबर जांचें।" 
                        : "Forgive me, I couldn't send the OTP. Please check your number and try again." 
                }]);
            } finally {
                setIsLoading(false);
            }
            return;
        }
        if (authStep === 'otp' && !skipAuth) {
            setIsLoading(true);
            try {
                const verifyRes = await fetch('/api/auth/otp/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone: tempPhone, otp: userMessage.trim() }),
                });

                if (!verifyRes.ok) {
                    await resendOtpLocal(tempPhone);
                    return;
                }
                const vData = await verifyRes.json();

                // 2. Final Sign In via Auth Handshake (Internal reliability hack)
                console.log("Attempting Auth Handshake sign-in...");
                const { data: { user: authUser }, error: authError } = await supabase.auth.signInWithPassword({
                    phone: vData.finalAuthPhone,
                    password: vData.bridgePassword
                });

                if (authError) {
                    console.error("Handshake SignIn Error:", authError.message);
                    throw authError;
                }

                if (authUser) {
                    setAuthStep(null);
                    const resumeMessage = pendingAction?.message;
                    setPendingAction(null);

                    // Standardize profile in correct table
                    await supabase.from('profiles').upsert({ 
                        id: authUser.id, 
                        phone: tempPhone,
                        phone_verified: true,
                        updated_at: new Date().toISOString()
                    });

                    setQueuedMessages(prev => [...prev, { 
                        role: 'model', 
                        content: chatLanguage === 'hi' ? "सफलतापूर्वक सत्यापित! अब मैं आपकी सहायता कर सकता हूँ।" : "Verified successfully! I am now ready to assist you further."
                    }]);
                    
                    // Resume pending action if exists
                    if (resumeMessage) {
                        setTimeout(() => handleSend(undefined, resumeMessage, true), 1000);
                    }
                }
            } catch (err: any) {
                console.error("Chat Auth Verify/SignIn Error:", err);
                setMessages(prev => [...prev, { 
                    role: 'model', 
                    content: chatLanguage === 'hi' ? "अमान्य OTP या कनेक्शन एरर। कृपया पुनः प्रयास करें।" : "Invalid OTP or Connection Error. Please try again." 
                }]);
            } finally {
                setIsLoading(false);
            }
            return;
        }

        // --- KUNDLI COLLECTION INTERCEPTOR ---
        if (collectionStep !== null) {
            const currentStep = COLLECTION_STEPS[collectionStep];
            const newData = { ...collectedData, [currentStep.id]: userMessage };
            if (collectedData.lat && currentStep.id === 'place') {
                newData.lat = collectedData.lat;
                newData.lon = collectedData.lon;
            }

            if (collectionStep < COLLECTION_STEPS.length - 1) {
                const nextStepIndex = collectionStep + 1;
                setCollectedData(newData);
                setCollectionStep(nextStepIndex);
                setQueuedMessages(prev => [...prev, { 
                    role: 'model', 
                    content: COLLECTION_STEPS[nextStepIndex][chatLanguage] 
                }]);
                return;
            } else {
                setCollectionStep(null);
                setCollectedData(newData);
                handleFinalSubmission(newData);
                return;
            }
        }

        setIsLoading(true);
        const chatHistory = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.content }]
        }));
        // Get active user ID (ensuring it's not stale after immediate login)
        let activeUserId = user?.id;
        if (!activeUserId && skipAuth) {
            const { data: { session } } = await supabase.auth.getSession();
            activeUserId = session?.user?.id;
        }

        let attempts = 0;
        const maxAttempts = 3;

        const attemptFetch = async (): Promise<void> => {
            attempts++;
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: userMessage,
                        chatHistory,
                        userId: activeUserId,
                        sessionId: sessionId,
                        language: chatLanguage,
                        templateInstruction: templateInstruction
                    })
                });

                const data = await response.json();
                if (data.error) throw new Error(data.error);
                
                if (data.text?.includes('[[START_KUNDLI_FLOW]]')) {
                    const cleanText = data.text.replace('[[START_KUNDLI_FLOW]]', '').trim();
                    const msgsToQueue: Message[] = [];
                    if (cleanText) msgsToQueue.push({ role: 'model', content: cleanText });
                    msgsToQueue.push({ role: 'model', content: COLLECTION_STEPS[0][chatLanguage] });
                    
                    setQueuedMessages(prev => [...prev, ...msgsToQueue]);
                    setCollectionStep(0);
                } else {
                    setQueuedMessages(prev => [...prev, { role: 'model', content: data.text }]);
                }
                if (data.sessionId) setSessionId(data.sessionId);
            } catch (error: any) {
                console.error(`Guru AI Chat Attempt ${attempts} Error:`, error);
                
                // If it's a high demand error and we have attempts left, retry after a short delay
                if (attempts < maxAttempts && (error.message?.includes('demand') || error.message?.includes('503') || error.message?.includes('429'))) {
                    await new Promise(resolve => setTimeout(resolve, 1500 * attempts));
                    return attemptFetch();
                }

                setQueuedMessages(prev => [...prev, { 
                    role: 'model', 
                    content: chatLanguage === 'hi' 
                        ? "क्षमा करें, दिव्य संपर्क में अभी बाधा आ रही है। गुरु जी गहन ध्यान में हैं। कृपया कुछ क्षणों बाद पुनः प्रयास करें या चैट रिसेट करें। [[CHAT_RESET_BTN]]" 
                        : "Forgive me, the divine connection is currently unstable as Guru Ji is in deep meditation. Please try again in a moment or reset the chat. [[CHAT_RESET_BTN]]" 
                }]);
            }
        };

        setIsLoading(true);
        await attemptFetch();
        setIsLoading(false);
    };

    const handleFinalSubmission = async (formData: any) => {
        setIsLoading(true);
        try {
            if (!user) {
                setIsLoading(false);
                return;
            }

            // 1. Fetch current Kundalis for this user to check limits and duplicates
            const { data: existingK, error: fetchErr } = await supabase
                .from('user_kundalis')
                .select('id, full_name, date_of_birth')
                .eq('user_id', user.id);

            if (fetchErr) throw fetchErr;

            // 2. Duplicate Check (Name + DOB)
            const isDuplicate = existingK?.find(k => 
                k.full_name?.toLowerCase() === formData.name?.toLowerCase() &&
                k.date_of_birth === formData.dob
            );

            if (isDuplicate) {
                setMessages(prev => [...prev, { 
                    role: 'model', 
                    content: chatLanguage === 'hi' 
                        ? `सावधान! ${formData.name} की कुंडली पहले से ही सुरक्षित है। मैं इसी जानकारी के आधार पर आपकी सहायता करने के लिए तैयार हूँ। [[VIEW_KUNDALI_BTN]]` 
                        : `Wait! A Kundali for ${formData.name} already exists in your sacred records. I am ready to assist you based on this profile! [[VIEW_KUNDALI_BTN]]`
                }]);
                setIsLoading(false);
                return;
            }

            // 3. Limit Check (Max 3)
            if (existingK && existingK.length >= 3) {
                setMessages(prev => [...prev, { 
                    role: 'model', 
                    content: chatLanguage === 'hi' 
                        ? "क्षमा करें! आप अधिकतम 3 कुंडलियाँ ही बना सकते हैं। कृपया अपनी मौजूदा कुंडलियाँ देखें या नए सवाल पूछें।" 
                        : "Forgive me! You can create a maximum of 3 unique Kundalis. Please explore your existing ones or continue our spiritual conversation." 
                }]);
                setIsLoading(false);
                return;
            }

            const datetime = `${formData.dob}T${formData.time}:00+05:30`;
            const res = await fetch('/api/vedaluna', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    params: { 
                        datetime, 
                        coordinates: `${formData.lat || '19.076,72.8777'}`, 
                        language: chatLanguage 
                    } 
                })
            });
            const result = await res.json();
            if (result.success && result.data && user) {
                await supabase.from('user_kundalis').insert({
                    user_id: user.id,
                    full_name: formData.name,
                    date_of_birth: formData.dob,
                    time_of_birth: formData.time,
                    place_of_birth: formData.place,
                    gender: formData.gender,
                    full_data: result.data
                });
                await supabase.from('user_vedic_profiles').upsert({
                    user_id: user.id,
                    full_name: formData.name,
                    date_of_birth: formData.dob,
                    time_of_birth: formData.time,
                    place_of_birth: formData.place,
                    gender: formData.gender,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' });
                localStorage.setItem('veda_pro_cache', JSON.stringify(result.data));
                const successMsg = chatLanguage === 'hi' 
                    ? `आपकी कुंडली बिल्कुल तैयार है, अब आप सवाल पूछें [[VIEW_KUNDALI_BTN]]`
                    : `Your Kundali is ready, you can now ask your questions [[VIEW_KUNDALI_BTN]]`;
                setIsLoading(false);
                setQueuedMessages(prev => [...prev, { role: 'model', content: successMsg }]);
            } else {
                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
        }
    };

    const handlePlaceSearchLocal = async (query: string) => {
        setInput(query);
        if (query.length < 3) {
            setPlaceSuggestions([]);
            setShowPlaceSuggestions(false);
            return;
        }
        try {
            const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`);
            const data = await res.json();
            if (data.features) {
                setPlaceSuggestions(data.features);
                setShowPlaceSuggestions(true);
            }
        } catch (err) {
            console.error('Place search failed:', err);
        }
    };

    const selectPlaceLocal = (f: any) => {
        const { name, city, state, country } = f.properties;
        const [lon, lat] = f.geometry.coordinates;
        const placeName = [name, city, state, country].filter(Boolean).join(', ');
        setCollectedData((prev: any) => ({ ...prev, lat: String(lat), lon: String(lon) }));
        setPlaceSuggestions([]);
        setShowPlaceSuggestions(false);
        setTimeout(() => handleSend(undefined, placeName), 50);
    };

    const clearChat = async () => {
        if (confirm(chatLanguage === 'hi' ? "क्या आप अपनी आध्यात्मिक बातचीत को मिटाना चाहते हैं?" : "Would you like to clear your spiritual history?")) {
            try {
                const params = new URLSearchParams();
                if (user) params.append('userId', user.id);
                else if (sessionId) params.append('sessionId', sessionId);

                await fetch(`/api/chat/history?${params.toString()}`, { method: 'DELETE' });

                setMessages([{
                    role: 'model',
                    content: chatLanguage === 'hi'
                        ? "नमस्ते! मैं एक नई आध्यात्मिक यात्रा के लिए तैयार हूँ। मैं आपकी कैसे सहायता कर सकता हूँ?"
                        : "Namaste! I am ready for a new divine journey. How can I help you today?"
                }]);
                setSessionId(null);
                setAuthStep(null);
                setCollectionStep(null);
            } catch (err) {
                console.error("Failed to clear chat:", err);
            }
        }
    };

    return (
        <>
            {/* Floating Bubble Trigger */}
            <AnimatePresence>
                {!isOpen && (
                    <div className="fixed bottom-8 right-8 z-[999] flex items-center">
                        <AnimatePresence>
                            {showInvite && (
                                <motion.button
                                    initial={{ opacity: 0, x: 30, scale: 0.85 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 30, scale: 0.85 }}
                                    onClick={() => setIsOpen(true)}
                                    className="mr-6 px-10 py-5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-2 border-saffron/40 rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(249,115,22,0.4)] flex items-center gap-4 group relative overflow-hidden"
                                >
                                    {/* Shimmer Effect for Banner */}
                                    <div className="absolute inset-x-[-100%] inset-y-0 bg-gradient-to-r from-transparent via-saffron/10 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
                                    
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-saffron shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                                        <img src="/pandit_ji_avatar.png" className="w-full h-full object-cover" alt="Guru Ji Avatar" />
                                    </div>
                                    <div className="flex flex-col items-start translate-y-[-1px]">
                                        <span className="text-[10px] font-black text-saffron uppercase tracking-[0.2em] opacity-80 mb-0.5">Divine Guidance</span>
                                        <span className="text-sm md:text-base font-black uppercase tracking-tight text-foreground group-hover:text-saffron transition-colors">
                                            {chatLanguage === 'hi' ? 'गुरुजी से पूछें' : 'Consult Guru Ji'}
                                        </span>
                                    </div>
                                </motion.button>
                            )}
                        </AnimatePresence>
 
                        <div className="relative">
                            {/* Mesmerizing Aura Rings */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ 
                                        scale: [1, 1.4, 1.8],
                                        opacity: [0.6, 0.3, 0],
                                    }}
                                    transition={{ 
                                        duration: 3, 
                                        repeat: Infinity, 
                                        delay: i * 1,
                                        ease: "easeOut"
                                    }}
                                    className="absolute inset-0 rounded-full border-2 border-saffron/30 -z-10"
                                />
                            ))}

                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                onClick={() => setIsOpen(true)}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white dark:bg-zinc-900 shadow-[0_25px_100px_-20px_rgba(249,115,22,0.8)] flex items-center justify-center border-4 border-saffron relative group z-10 p-1.5 transition-all duration-500"
                            >
                                <div className="absolute inset-[-15%] bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-saffron/20 bg-gradient-to-b from-orange-50 to-white dark:from-zinc-800 dark:to-zinc-900 shadow-inner">
                                    <img src="/pandit_ji_avatar.png" alt="Guru Ji" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 relative z-10" />
                                </div>
                                <span className="absolute bottom-3 right-3 flex h-6 w-6 z-20">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-6 w-6 bg-green-500 border-2 border-white dark:border-zinc-900 shadow-lg"></span>
                                </span>
                            </motion.button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
 
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for FullScreen/Enlarged Mode */}
                        {isFullScreen && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsFullScreen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[999] cursor-pointer"
                            />
                        )}
                        <motion.div
                            initial={isFullScreen ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 50, rotateX: 10, transformOrigin: 'bottom right' }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50, rotateX: 10 }}
                            className={`fixed ${isFullScreen 
                                ? 'left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[1000] w-[calc(100%-24px)] md:w-[700px] h-[85vh] md:h-[750px] max-h-[95vh] rounded-[2rem] md:rounded-[2.5rem]' 
                                : 'bottom-4 right-4 md:bottom-6 md:right-6 z-[1000] w-[calc(100%-32px)] md:w-[400px] h-[550px] md:h-[680px] max-h-[90vh] rounded-[2rem] md:rounded-[2.5rem]'
                            } bg-white dark:bg-[#0a0f18] shadow-[0_50px_150px_-30px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden border border-orange-100/30 dark:border-white/10 transition-all duration-500 ease-in-out`}
                        >
                        {/* Header */}
                        <div className="p-5 md:p-6 bg-gradient-to-r from-saffron via-orange-600 to-red-600 text-white relative flex items-center justify-between shadow-xl overflow-hidden group shrink-0">
                            {/* Decorative Sparkle */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-pulse" />
                            
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white p-0.5 border-2 border-white/20 relative shadow-lg">
                                    <img src="/pandit_ji_avatar.png" alt="Guru Ji" className="w-full h-full object-cover rounded-full" />
                                    <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                                </div>
                                <div>
                                    <h3 className="font-black text-lg md:text-xl tracking-tight leading-none mb-1 drop-shadow-md">Guru Ji AI</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-orange-50/80">Spiritual Guide</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 relative z-10">
                                <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/10">
                                    <button onClick={() => setChatLanguage('en')} className={`px-2 py-1 text-[9px] font-black rounded-lg transition-all ${chatLanguage === 'en' ? 'bg-white text-saffron shadow-sm' : 'text-white hover:bg-white/10'}`}>EN</button>
                                    <button onClick={() => setChatLanguage('hi')} className={`px-2 py-1 text-[9px] font-black rounded-lg transition-all ${chatLanguage === 'hi' ? 'bg-white text-saffron shadow-sm' : 'text-white hover:bg-white/10'}`}>हि</button>
                                </div>
                                <div className="flex items-center">
                                    <button onClick={() => setIsFullScreen(!isFullScreen)} className="p-2 hover:bg-white/20 rounded-xl transition-all hidden md:block">
                                        {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                    </button>
                                    <button onClick={clearChat} className="p-2 hover:bg-white/20 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                                    <button onClick={() => { setIsOpen(false); setIsFullScreen(false); }} className="p-2 hover:bg-white/20 rounded-xl transition-all"><X className="w-5 h-5" /></button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 custom-scrollbar bg-zinc-50/30 dark:bg-black/5">
                            {messages.map((m, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-3 max-w-[90%] ${m.role === 'user' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                                        <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center border-2 overflow-hidden shadow-sm ${m.role === 'model' ? 'border-saffron/30' : 'bg-zinc-100 border-zinc-200 text-zinc-600 dark:bg-white/5 dark:border-white/10'}`}>
                                            {m.role === 'model' ? (
                                                <img src="/pandit_ji_avatar.png" className="w-full h-full object-cover" />
                                            ) : (
                                                user?.user_metadata?.avatar_url ? (
                                                    <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" />
                                                ) : <User className="w-5 h-5" />
                                            )}
                                        </div>
                                        <div className={`p-4 rounded-[1.5rem] text-[14px] md:text-[15px] leading-relaxed shadow-sm transition-all ${m.role === 'model' ? 'bg-white dark:bg-zinc-900 border border-orange-100/50 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-tl-none' : 'bg-gradient-to-tr from-saffron to-orange-600 text-white rounded-tr-none font-bold'}`}>
                                            {m.content.includes('[[VIEW_KUNDALI_BTN]]') ? (
                                                <div className="space-y-4">
                                                    <div dangerouslySetInnerHTML={{ __html: formatDivineMessage(m.content.replace('[[VIEW_KUNDALI_BTN]]', '')) }} className="space-y-1.5" />
                                                    <Link 
                                                        href="/kundli" 
                                                        target="_blank"
                                                        className="flex items-center justify-center gap-2 w-full py-3 bg-saffron hover:bg-orange-600 text-white font-black rounded-xl shadow-lg transition-all active:scale-95 text-[10px] uppercase tracking-widest px-4"
                                                    >
                                                        <Sun className="w-4 h-4" />
                                                        {chatLanguage === 'hi' ? 'अपनी कुंडली देखें' : 'View My Kundali'}
                                                    </Link>
                                                </div>
                                            ) : m.content.includes('[[CHAT_RESET_BTN]]') ? (
                                                <div className="space-y-4">
                                                    <div dangerouslySetInnerHTML={{ __html: formatDivineMessage(m.content.replace('[[CHAT_RESET_BTN]]', '')) }} className="space-y-1.5" />
                                                    <button 
                                                        onClick={() => {
                                                            setMessages([]);
                                                            setAuthStep(null);
                                                            setCollectionStep(null);
                                                            setSessionId(null);
                                                        }}
                                                        className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-800 hover:bg-black text-white font-black rounded-xl shadow-lg transition-all active:scale-95 text-[10px] uppercase tracking-widest px-4"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        {chatLanguage === 'hi' ? 'चैट रिसेट करें' : 'Reset Divine Chat'}
                                                    </button>
                                                </div>
                                            ) : m.content.match(/\[\[PUJA_LINK:.*?\|.*?\]\]/) ? (() => {
                                                const match = m.content.match(/\[\[PUJA_LINK: (.*?) \| (.*?)\]\]/);
                                                const pujaName = match ? match[1] : '';
                                                const pujaSlug = match ? match[2] : '';
                                                const cleanText = m.content.replace(/\[\[PUJA_LINK:.*?\|.*?\]\]/g, '').trim();
                                                
                                                return (
                                                    <div className="space-y-4">
                                                        <div dangerouslySetInnerHTML={{ __html: formatDivineMessage(cleanText) }} className="space-y-1.5" />
                                                        {pujaName && pujaSlug && (
                                                            <Link 
                                                                href={`/pooja-services/${pujaSlug}`}
                                                                target="_blank"
                                                                className="flex flex-col gap-1 w-full group"
                                                            >
                                                                <div className="flex items-center justify-between gap-3 w-full py-4 bg-gradient-to-r from-saffron to-orange-600 hover:from-orange-600 hover:to-saffron text-white font-black rounded-2xl shadow-xl shadow-saffron/20 transition-all active:scale-[0.98] px-5 border-b-4 border-orange-800">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="p-2 bg-white/20 rounded-lg">
                                                                            <ShoppingBag className="w-4 h-4" />
                                                                        </div>
                                                                        <div className="flex flex-col items-start leading-tight">
                                                                            <span className="text-sm tracking-tight">{pujaName}</span>
                                                                        </div>
                                                                    </div>
                                                                    <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded-full">{chatLanguage === 'hi' ? 'मात्र ₹1 में' : '@ ₹1'}</span>
                                                                </div>
                                                            </Link>
                                                        )}
                                                    </div>
                                                );
                                            })() : m.isStreaming ? (
                                                <Typewriter 
                                                    text={m.content} 
                                                    onComplete={() => {
                                                        setMessages(prev => prev.map((msg, i) => i === idx ? { ...msg, isStreaming: false } : msg));
                                                    }}
                                                />
                                            ) : (
                                                <div dangerouslySetInnerHTML={{ __html: formatDivineMessage(m.content) }} className="space-y-1.5" />
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 max-w-[85%]">
                                        <div className="w-9 h-9 rounded-xl border-2 border-saffron/30 overflow-hidden shadow-sm"><img src="/pandit_ji_avatar.png" className="w-full h-full object-cover" /></div>
                                        <div className="p-4 rounded-[1.5rem] bg-white dark:bg-zinc-900 border border-orange-100 flex gap-1.5 items-center">
                                            {[...Array(3)].map((_, i) => <span key={i} className="w-2 h-2 bg-saffron rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></span>)}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className={`px-5 py-5 md:px-7 md:py-6 bg-white dark:bg-[#0a0f18] border-t border-orange-100/20 dark:border-white/5 relative shrink-0 transition-opacity duration-300 ${(isLoading || queuedMessages.length > 0 || messages.some(m => m.isStreaming)) ? 'opacity-80' : 'opacity-100'}`}>
                            {/* Persistent Templates / Starters */}
                            <div className="flex gap-2 overflow-x-auto pb-4 mb-1 no-scrollbar scroll-smooth snap-x">
                                {dynamicTemplates.length > 0 ? (
                                    dynamicTemplates.map((template) => (
                                        <button 
                                            key={template.id}
                                            disabled={isLoading || queuedMessages.length > 0 || messages.some(m => m.isStreaming)}
                                            onClick={() => handleSend(undefined, chatLanguage === 'hi' ? template.prompt_hi : template.prompt_en, false, chatLanguage === 'hi' ? template.instruction_hi : template.instruction_en)}
                                            className="whitespace-nowrap px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-zinc-50 dark:bg-white/5 border border-orange-100/30 dark:border-white/10 rounded-xl text-orange-600 dark:text-orange-400 hover:bg-saffron hover:text-white transition-all shadow-sm active:scale-95 snap-start disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed"
                                        >
                                            {chatLanguage === 'hi' ? template.label_hi : template.label_en}
                                        </button>
                                    ))
                                ) : (
                                    (chatLanguage === 'hi' ? [
                                        "मेरी कुंडली दिखाओ ☸️",
                                        "करियर सलाह 💼",
                                        "आज का सुविचार ✨"
                                    ] : [
                                        "Show my Kundali ☸️",
                                        "Career Advice 💼",
                                        "Daily Quote ✨"
                                    ]).map((starter, i) => (
                                        <button 
                                            key={i}
                                            disabled={isLoading || queuedMessages.length > 0 || messages.some(m => m.isStreaming)}
                                            onClick={() => handleSend(undefined, starter)}
                                            className="whitespace-nowrap px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-zinc-50 dark:bg-white/5 border border-orange-100/30 dark:border-white/10 rounded-xl text-orange-600 dark:text-orange-400 hover:bg-saffron hover:text-white transition-all shadow-sm active:scale-95 snap-start disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed"
                                        >
                                            {starter}
                                        </button>
                                    ))
                                )}
                            </div>
                            
                            <AnimatePresence>
                                {collectionStep === 3 && showPlaceSuggestions && placeSuggestions.length > 0 && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full left-5 right-5 mb-4 bg-white dark:bg-zinc-900 border-2 border-orange-100 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[1001]">
                                        {placeSuggestions.map((s, idx) => (
                                            <button key={idx} onClick={() => selectPlaceLocal(s)} className="w-full text-left px-5 py-4 text-xs border-b border-zinc-100 dark:border-white/5 hover:bg-orange-50 dark:hover:bg-white/5 transition-all flex items-center gap-3"><MapPin className="w-4 h-4 text-saffron shrink-0" /><span className="truncate font-medium">{[s.properties.name, s.properties.city, s.properties.country].filter(Boolean).join(', ')}</span></button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSend} className="relative flex items-center gap-3">
                                <div className="relative flex-1 group">
                                    <input
                                        type={authStep === 'otp' ? 'text' : (collectionStep === 1 ? 'date' : (collectionStep === 2 ? 'time' : 'text'))}
                                        value={input}
                                        onChange={(e) => authStep === 'phone' ? setInput(e.target.value.replace(/\D/g, '').slice(0, 10)) : (collectionStep === 3 ? handlePlaceSearchLocal(e.target.value) : setInput(e.target.value))}
                                        placeholder={
                                            (isLoading || queuedMessages.length > 0 || messages.some(m => m.isStreaming))
                                                ? (chatLanguage === 'hi' ? "गुरु जी उत्तर दे रहे हैं..." : "Guru Ji is responding...")
                                                : (chatLanguage === 'hi'
                                                    ? (authStep === 'phone' ? "मोबाइल नंबर..." : (authStep === 'otp' ? "OTP दर्ज करें..." : (collectionStep !== null ? "जानकारी दर्ज करें..." : "गुरु जी से पूछें...")))
                                                    : (authStep === 'phone' ? "Mobile No..." : (authStep === 'otp' ? "Enter OTP..." : (collectionStep !== null ? "Your details..." : "Ask Guru Ji..."))))
                                        }
                                        className="w-full pl-6 pr-14 py-4 bg-zinc-100 dark:bg-white/5 border border-transparent focus:border-saffron/30 focus:bg-white dark:focus:bg-zinc-900 rounded-2xl outline-none transition-all font-bold text-[12px] md:text-[13px] text-slate-800 dark:text-white placeholder:text-slate-400 placeholder:text-[11px] md:placeholder:text-[12px] placeholder:font-medium"
                                    />
                                    {collectionStep === 4 && (
                                        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex gap-1.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm p-1 rounded-xl border border-zinc-200 dark:border-white/10 shadow-lg z-10 scale-90">
                                            {['male', 'female', 'other'].map((g) => (
                                                <button key={g} disabled={isLoading || queuedMessages.length > 0 || messages.some(m => m.isStreaming)} onClick={() => handleSend(undefined, g)} className="px-3 py-1.5 text-[9px] font-black uppercase bg-zinc-100 dark:bg-white/10 hover:bg-saffron hover:text-white rounded-lg transition-all disabled:opacity-50">{g}</button>
                                            ))}
                                        </div>
                                    )}
                                    <button 
                                        type="submit"
                                        disabled={isLoading || queuedMessages.length > 0 || messages.some(m => m.isStreaming) || (!input.trim() && !authStep)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-saffron text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 disabled:opacity-50 disabled:grayscale transition-all"
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
                )}
            </AnimatePresence>
        </>
    );
}
