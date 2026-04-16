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

interface Message {
    role: 'user' | 'model';
    content: string;
}

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
    
    // Auth State for Chat
    const [authStep, setAuthStep] = useState<null | 'phone' | 'otp'>(null);
    const [tempPhone, setTempPhone] = useState('');
    const [pendingAction, setPendingAction] = useState<any>(null);

    // Local Data Collection State
    const [collectionStep, setCollectionStep] = useState<number | null>(null);
    const [collectedData, setCollectedData] = useState<any>({});
    const [placeSuggestions, setPlaceSuggestions] = useState<any[]>([]);
    const [showPlaceSuggestions, setShowPlaceSuggestions] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const lastActionRef = useRef<{ content: string; time: number } | null>(null);

    // Initial greeting & Database Check
    useEffect(() => {
        const initializeChat = async () => {
            if (messages.length === 0) {
                let baseGreetingHi = "Mantra Puja में आपका स्वागत है। नमस्ते! मैं आपका आध्यात्मिक गुरु हूँ।";
                let baseGreetingEn = "Welcome to Mantra Puja. Namaste! I am Guru Ji, your spiritual guide.";
                let dataTextHi = " आज मैं आपकी दिव्य यात्रा में कैसे सहायता कर सकता हूँ?";
                let dataTextEn = " How may I assist you on your divine path today?";

                if (user) {
                    try {
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('full_name')
                            .eq('id', user.id)
                            .single();
                            
                        const { data: vedicProfile } = await supabase
                            .from('user_vedic_profiles')
                            .select('rashi')
                            .eq('user_id', user.id)
                            .single();

                        if (profile?.full_name) {
                            baseGreetingHi = `हर हर महादेव ${profile.full_name} जी! मैं आपका आध्यात्मिक गुरु हूँ।`;
                            baseGreetingEn = `Har Har Mahadev ${profile.full_name} ji! I am Guru Ji, your spiritual guide.`;
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

                const finalWelcomeText = chatLanguage === 'hi' ? baseGreetingHi + dataTextHi : baseGreetingEn + dataTextEn;
                setMessages([{ role: 'model', content: finalWelcomeText }]);
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

    // Listen for global toggle event
    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        window.addEventListener('toggle-guru-chat', handleToggle);
        return () => window.removeEventListener('toggle-guru-chat', handleToggle);
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

    const handleSend = async (e?: React.FormEvent, overrideMessage?: string, skipAuth = false) => {
        if (e) e.preventDefault();
        
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
            setTimeout(() => {
                setMessages(prev => [...prev, { 
                    role: 'model', 
                    content: chatLanguage === 'hi'
                        ? "नमस्ते! आगे बढ़ने के लिए कृपया अपना मोबाइल नंबर दर्ज करें।"
                        : "Namaste! To proceed with your spiritual request, please provide your mobile number for a quick verification."
                }]);
            }, 600);
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
                setMessages(prev => [...prev, { 
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
                    const vError = await verifyRes.json();
                    throw new Error(vError.error || 'Invalid OTP');
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

                    setMessages(prev => [...prev, { 
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
                setTimeout(() => {
                    setMessages(prev => [...prev, { 
                        role: 'model', 
                        content: COLLECTION_STEPS[nextStepIndex][chatLanguage] 
                    }]);
                }, 600);
                return;
            } else {
                setCollectionStep(null);
                setCollectedData(newData);
                handleFinalSubmission(newData);
                return;
            }
        }

        setIsLoading(true);
        try {
            const chatHistory = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.content }]
            }));
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    chatHistory,
                    userId: user?.id,
                    sessionId: sessionId,
                    language: chatLanguage
                })
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            
            if (data.text?.includes('[[START_KUNDLI_FLOW]]')) {
                const cleanText = data.text.replace('[[START_KUNDLI_FLOW]]', '').trim();
                if (cleanText) setMessages(prev => [...prev, { role: 'model', content: cleanText }]);
                setCollectionStep(0);
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: 'model', content: COLLECTION_STEPS[0][chatLanguage] }]);
                }, 400);
            } else {
                setMessages(prev => [...prev, { role: 'model', content: data.text }]);
            }
            if (data.sessionId) setSessionId(data.sessionId);
        } catch (error: any) {
            console.error("Guru AI Chat Error:", error);
            setMessages(prev => [...prev, { 
                role: 'model', 
                content: chatLanguage === 'hi' 
                    ? "क्षमा करें, दिव्य संपर्क में बाधा आई है। कृपया चैट को रिसेट करें। [[CHAT_RESET_BTN]]" 
                    : "Forgive me, the divine connection is unstable. Please reset the chat. [[CHAT_RESET_BTN]]" 
            }]);
        } finally {
            setIsLoading(false);
        }
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
                        name: formData.name, 
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
                // Directly show as model response for better UX
                setMessages(prev => [...prev, { role: 'model', content: successMsg }]);
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
                    <div className="fixed bottom-6 right-6 z-[999] flex items-center">
                        <AnimatePresence>
                            {showInvite && (
                                <motion.button
                                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                    onClick={() => setIsOpen(true)}
                                    className="mr-4 px-6 py-3 bg-white dark:bg-card border border-saffron/20 rounded-2xl shadow-2xl flex items-center gap-3 group"
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-saffron/30">
                                        <img src="/pandit_ji_avatar.png" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-foreground/80 group-hover:text-saffron transition-colors">
                                        {chatLanguage === 'hi' ? 'गुरुजी से पूछें' : 'Consult Guru Ji'}
                                    </span>
                                </motion.button>
                            )}
                        </AnimatePresence>

                        <div className="relative">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ 
                                        scale: [0, 1.5, 0], opacity: [0, 1, 0],
                                        x: (Math.random() - 0.5) * 160, y: (Math.random() - 0.5) * 160,
                                    }}
                                    transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5, ease: "easeOut" }}
                                    className="absolute inset-0 m-auto w-0.5 h-0.5 rounded-full z-0"
                                    style={{ backgroundColor: i % 3 === 0 ? '#fbbf24' : (i % 3 === 1 ? '#f97316' : '#ea580c'), boxShadow: '0 0 6px rgba(245, 158, 11, 0.8)' }}
                                />
                            ))}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setIsOpen(true)}
                                className="w-22 h-22 md:w-28 md:h-28 rounded-full bg-white shadow-[0_20px_80px_-20px_rgba(249,115,22,0.6)] flex items-center justify-center border-4 border-saffron relative group z-10 p-1"
                            >
                                <div className="absolute inset-[-20%] bg-saffron/20 rounded-full blur-3xl" />
                                <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-saffron/10">
                                    <img src="/pandit_ji_avatar.png" alt="Guru Ji" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 relative z-10" />
                                </div>
                                <span className="absolute bottom-2 right-2 flex h-5 w-5 z-20">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white shadow-sm"></span>
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
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] cursor-pointer"
                            />
                        )}
                        <motion.div
                            initial={isFullScreen ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 50, transformOrigin: 'bottom right' }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            className={`fixed ${isFullScreen 
                                ? 'left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[1000] w-[calc(100%-32px)] md:w-[650px] lg:w-[750px] h-[85vh] md:h-[750px] lg:h-[850px] max-h-[95vh] rounded-[3rem]' 
                                : 'bottom-4 right-4 md:bottom-6 md:right-6 z-[1000] w-[calc(100%-32px)] md:w-[420px] h-[650px] max-h-[92vh] rounded-[3rem]'
                            } bg-white dark:bg-[#0f141f] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-orange-100/30 dark:border-white/10 transition-all duration-500 ease-in-out`}
                        >
                        {/* Header */}
                        <div className="p-7 bg-gradient-to-r from-saffron to-orange-600 text-white relative flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-white p-0.5 border-2 border-white/30 relative overflow-hidden shadow-inner">
                                    <img src="/pandit_ji_avatar.png" alt="Guru Ji" className="w-full h-full object-cover rounded-full" />
                                    <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="font-black text-xl tracking-tight leading-none mb-1">Guru Ji</h3>
                                    <div className="flex items-center gap-1.5 opacity-90">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-100">Divine Spiritual Guide</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20">
                                    <button onClick={() => setChatLanguage('en')} className={`px-2.5 py-1 text-[9px] font-black rounded-lg transition-all ${chatLanguage === 'en' ? 'bg-white text-saffron shadow-sm' : 'text-white hover:bg-white/10'}`}>EN</button>
                                    <button onClick={() => setChatLanguage('hi')} className={`px-2.5 py-1 text-[9px] font-black rounded-lg transition-all ${chatLanguage === 'hi' ? 'bg-white text-saffron shadow-sm' : 'text-white hover:bg-white/10'}`}>हि</button>
                                </div>
                                <button onClick={() => setIsFullScreen(!isFullScreen)} className="p-2.5 hover:bg-white/20 rounded-2xl transition-all hidden md:block">
                                    {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                                </button>
                                <button onClick={clearChat} className="p-2.5 hover:bg-white/20 rounded-2xl transition-all"><Trash2 className="w-5 h-5" /></button>
                                <button onClick={() => { setIsOpen(false); setIsFullScreen(false); }} className="p-2.5 hover:bg-white/20 rounded-2xl transition-all"><X className="w-6 h-6" /></button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-7 space-y-7 custom-scrollbar bg-zinc-50/20 dark:bg-transparent">

                            {messages.map((m, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-4 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center border-2 overflow-hidden shadow-sm ${m.role === 'model' ? 'border-saffron/40' : 'bg-zinc-100 border-zinc-200 text-zinc-600 dark:bg-white/10 dark:border-white/10'}`}>
                                            {m.role === 'model' ? <img src="/pandit_ji_avatar.png" className="w-full h-full object-cover" /> : <User className="w-5 h-5" />}
                                        </div>
                                        <div className={`p-5 rounded-[1.5rem] text-[15px] font-medium leading-relaxed shadow-sm transition-all ${m.role === 'model' ? 'bg-white dark:bg-white/5 border border-orange-100/50 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-tl-none font-medium' : 'bg-gradient-to-tr from-saffron to-orange-700 text-white rounded-tr-none font-bold'}`}>
                                            {m.content.includes('[[VIEW_KUNDALI_BTN]]') ? (
                                                <div className="space-y-4 text-center sm:text-left">
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
                                                                <div className="flex items-center justify-between gap-2 w-full py-4 bg-gradient-to-r from-saffron to-orange-600 hover:from-orange-600 hover:to-saffron text-white font-black rounded-2xl shadow-xl shadow-saffron/20 transition-all active:scale-[0.98] px-6 border-b-4 border-orange-800">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                                                                            <ShoppingBag className="w-4 h-4" />
                                                                        </div>
                                                                        <div className="flex flex-col items-start leading-tight">
                                                                            <span className="text-sm tracking-tight">{pujaName}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col items-end leading-none">
                                                                        <span className="text-[10px] font-black uppercase tracking-widest">{chatLanguage === 'hi' ? 'मात्र ₹1 में बुक करें' : 'Book at Only ₹1'}</span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )}
                                                    </div>
                                                );
                                            })() : (
                                                <div dangerouslySetInnerHTML={{ __html: formatDivineMessage(m.content) }} className="space-y-1.5" />
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-4 max-w-[85%]">
                                        <div className="w-9 h-9 rounded-full border-2 border-saffron/40 overflow-hidden shadow-sm"><img src="/pandit_ji_avatar.png" className="w-full h-full object-cover" /></div>
                                        <div className="p-5 rounded-[1.5rem] bg-white dark:bg-white/5 border border-orange-100/50 dark:border-white/10 flex gap-1.5 items-center">
                                            {[...Array(3)].map((_, i) => <span key={i} className="w-2.5 h-2.5 bg-saffron rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></span>)}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="px-5 py-4 md:px-7 md:py-6 bg-white dark:bg-[#0f141f] border-t border-orange-100/30 dark:border-white/10 relative">
                            {/* Persistent Templates / Starters */}
                            <div className="flex gap-2.5 overflow-x-auto pb-4 mb-2 no-scrollbar scroll-smooth snap-x">
                                {(chatLanguage === 'hi' ? [
                                    "मेरी कुंडली दिखाओ ☸️",
                                    "करियर सलाह 💼",
                                    "आज का सुविचार ✨",
                                    "यह कैसे काम करता है? 🛡️"
                                ] : [
                                    "Show my Kundali ☸️",
                                    "Career Advice 💼",
                                    "Daily Quote ✨",
                                    "How it works? 🛡️"
                                ]).map((starter, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => handleSend(undefined, starter)}
                                        className="whitespace-nowrap px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-zinc-50 dark:bg-white/5 border border-orange-100/30 dark:border-white/10 rounded-xl text-orange-600 dark:text-orange-400 hover:bg-saffron hover:text-white transition-all shadow-sm active:scale-95 snap-start"
                                    >
                                        {starter}
                                    </button>
                                ))}
                            </div>
                            {/* Local Flow Helpers */}
                            <AnimatePresence>
                                {collectionStep === 3 && showPlaceSuggestions && placeSuggestions.length > 0 && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full left-7 right-7 mb-4 bg-white dark:bg-zinc-900 border border-orange-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[1001]">
                                        {placeSuggestions.map((s, idx) => (
                                            <button key={idx} onClick={() => selectPlaceLocal(s)} className="w-full text-left px-5 py-4 text-xs border-b border-zinc-100 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/5 transition-all flex items-center gap-3"><MapPin className="w-4 h-4 text-saffron shrink-0" /><span className="truncate">{[s.properties.name, s.properties.city, s.properties.country].filter(Boolean).join(', ')}</span></button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSend} className="relative flex items-center gap-3">
                                <div className="relative flex-1 group">
                                    <input
                                        type={authStep === 'otp' ? 'text' : (collectionStep === 1 ? 'date' : (collectionStep === 2 ? 'time' : 'text'))}
                                        value={input}
                                        onChange={(e) => authStep === 'phone' ? setInput(e.target.value) : (collectionStep === 3 ? handlePlaceSearchLocal(e.target.value) : setInput(e.target.value))}
                                        placeholder={
                                            chatLanguage === 'hi'
                                                ? (authStep === 'phone' ? "मोबाइल नंबर दर्ज करें..." : (authStep === 'otp' ? "6-अंकों का OTP दर्ज करें..." : (collectionStep !== null ? "अपनी जानकारी दर्ज करें..." : "गुरु जी से कुछ भी पूछें...")))
                                                : (authStep === 'phone' ? "Enter Mobile No..." : (authStep === 'otp' ? "Enter 6-digit OTP..." : (collectionStep !== null ? "Your details..." : "Ask Guru Ji anything...")))
                                        }
                                        className="w-full pl-6 pr-14 py-4.5 bg-zinc-100 dark:bg-white/5 border border-transparent focus:border-saffron/30 rounded-2xl outline-none transition-all font-medium text-slate-800 dark:text-white placeholder:text-slate-400"
                                    />
                                    {collectionStep === 4 && (
                                        <div className="absolute right-2 top-1.2 flex gap-1.5 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-1.5 rounded-xl border border-zinc-200 dark:border-white/10 shadow-sm z-10 scale-90">
                                            {['male', 'female', 'other'].map((g) => (
                                                <button key={g} onClick={() => handleSend(undefined, g)} className="px-3 py-1.5 text-[10px] font-black uppercase bg-zinc-50 dark:bg-white/5 hover:bg-saffron hover:text-white rounded-lg transition-all">{g}</button>
                                            ))}
                                        </div>
                                    )}
                                    <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-3 bg-saffron text-white rounded-xl shadow-lg shadow-orange-500/20 disabled:opacity-50 active:scale-95 transition-all"><Send className="w-5 h-5" /></button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>)}
            </AnimatePresence>
        </>
    );
}
