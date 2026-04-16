"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Send, User, Loader2, 
    MessageCircle, ChevronDown, Trash2, Languages,
    ExternalLink, Heart, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

interface Message {
    role: 'user' | 'model';
    content: string;
}

export default function GuruAIChat() {
    const { user } = useAuth();
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [chatLanguage, setChatLanguage] = useState<'en' | 'hi'>(language === 'hi' ? 'hi' : 'en');
    const [showInvite, setShowInvite] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial greeting
    useEffect(() => {
        if (messages.length <= 1) { // Allow updating greeting if switching language at start
            setMessages([{
                role: 'model',
                content: chatLanguage === 'hi' 
                    ? "नमस्ते! मैं आपका आध्यात्मिक गुरु हूँ। आज मैं आपकी दिव्य यात्रा में कैसे सहायता कर सकता हूँ?" 
                    : "Namaste! I am Guru Ji, your spiritual guide. How may I assist you on your divine path today?"
            }]);
        }
    }, [chatLanguage]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Automatic invitation slider every 3 seconds
    useEffect(() => {
        if (isOpen) {
            setShowInvite(false);
            return;
        }

        const interval = setInterval(() => {
            setShowInvite(prev => !prev);
        }, 3000);

        return () => clearInterval(interval);
    }, [isOpen]);

    // Listen for global toggle event
    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        window.addEventListener('toggle-guru-chat', handleToggle);
        return () => window.removeEventListener('toggle-guru-chat', handleToggle);
    }, []);

    const handleSend = async (e?: React.FormEvent, overrideMessage?: string) => {
        if (e) e.preventDefault();
        
        const userMessage = overrideMessage || input.trim();
        if (!userMessage || isLoading) return;

        if (!overrideMessage) setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
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

            if (data.error) {
                setMessages(prev => [...prev, { 
                    role: 'model', 
                    content: "Forgive me, my spiritual connection is weak at the moment. Please try again in a few moments." 
                }]);
            } else {
                setMessages(prev => [...prev, { role: 'model', content: data.text }]);
                if (data.sessionId) setSessionId(data.sessionId);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { 
                role: 'model', 
                content: "The divine words could not reach me. Please check your connection." 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        if (confirm("Would you like to start a new spiritual session?")) {
            setMessages([{
                role: 'model',
                content: "Namaste! I am ready for a new journey. How can I help?"
            }]);
            setSessionId(null);
        }
    };

    return (
        <>
            {/* Floating Bubble Trigger */}
            <AnimatePresence>
                {!isOpen && (
                    <div className="fixed bottom-6 right-6 z-[999] flex items-center">
                        {/* Sleek Divine Petal Invitation */}
                        <AnimatePresence>
                            {showInvite && (
                                <motion.button
                                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 50, scale: 0.95 }}
                                    whileHover={{ scale: 1.05, x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsOpen(true)}
                                    className="mr-6 relative group py-2.5 px-8 flex items-center justify-center overflow-hidden rounded-l-full rounded-tr-full rounded-br-md shadow-[0_10px_30px_-5px_rgba(249,115,22,0.5)] cursor-pointer"
                                >
                                    {/* Neon Glowing Border Layer */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-saffron via-orange-400 to-saffron animate-[spin_4s_linear_infinite] opacity-50 blur-[2px]" />
                                    
                                    {/* Mesh Gradient / Aura Background */}
                                    <div className="absolute inset-[1.5px] bg-[#0f141f] rounded-l-full rounded-tr-full rounded-br-[4px] z-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-saffron/20 via-orange-600/10 to-transparent" />
                                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0,transparent_50%)] animate-pulse" />
                                    </div>

                                    {/* Clean Minimalist Text */}
                                    <span className="relative z-10 text-xs font-black text-white uppercase tracking-[0.25em] flex items-center gap-2.5 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">
                                        Talk to Guru Ji
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="w-1.5 h-1.5 bg-saffron rounded-full shadow-[0_0_10px_#f97316]"
                                        />
                                    </span>

                                    {/* Light Sweep Refined */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-light-sweep" style={{ animation: 'lightSweep 3s infinite ease-in-out' }} />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        <div className="relative">
                            {/* High-Density Divine Aura Particles */}
                            {[...Array(50)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                                    animate={{ 
                                        scale: [0, 1.5, 0],
                                        opacity: [0, 1, 0],
                                        x: (Math.random() - 0.5) * 160,
                                        y: (Math.random() - 0.5) * 160,
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 3,
                                        repeat: Infinity,
                                        delay: Math.random() * 5,
                                        ease: "easeOut"
                                    }}
                                    className="absolute inset-0 m-auto w-0.5 h-0.5 rounded-full z-0"
                                    style={{ 
                                        backgroundColor: i % 3 === 0 ? '#fbbf24' : (i % 3 === 1 ? '#f97316' : '#ea580c'),
                                        boxShadow: '0 0 6px rgba(245, 158, 11, 0.8)'
                                    }}
                                />
                            ))}

                            <motion.button
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setIsOpen(true)}
                                className="w-22 h-22 md:w-28 md:h-28 rounded-full bg-white shadow-[0_20px_80px_-20px_rgba(249,115,22,0.6)] flex items-center justify-center border-4 border-saffron relative group z-10 p-1"
                            >
                                {/* divine glow layers */}
                                <div className="absolute inset-[-20%] bg-saffron/20 rounded-full blur-3xl divine-glow-1" />
                                <div className="absolute inset-[-12%] border border-dashed border-orange-400/40 rounded-full divine-glow-2" />
                                <div className="absolute inset-[-35%] bg-orange-600/10 rounded-full blur-[40px] animate-pulse" />
                                
                                <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-saffron/10">
                                    <img 
                                        src="/pandit_ji_avatar.png" 
                                        alt="Guru Ji"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 relative z-10"
                                    />
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
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[1000] w-[calc(100%-32px)] md:w-[420px] h-[650px] max-h-[90vh] bg-white dark:bg-[#0f141f] rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-orange-100/30 dark:border-white/10"
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
                                {/* Language Toggle */}
                                <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20">
                                    <button 
                                        onClick={() => setChatLanguage('en')}
                                        className={`px-2.5 py-1 text-[9px] font-black rounded-lg transition-all ${chatLanguage === 'en' ? 'bg-white text-saffron shadow-sm' : 'text-white hover:bg-white/10'}`}
                                    >
                                        EN
                                    </button>
                                    <button 
                                        onClick={() => setChatLanguage('hi')}
                                        className={`px-2.5 py-1 text-[9px] font-black rounded-lg transition-all ${chatLanguage === 'hi' ? 'bg-white text-saffron shadow-sm' : 'text-white hover:bg-white/10'}`}
                                    >
                                        हि
                                    </button>
                                </div>

                                <button 
                                    onClick={clearChat}
                                    className="p-2.5 hover:bg-white/20 rounded-2xl transition-all"
                                    title="Start New Session"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2.5 hover:bg-white/20 rounded-2xl transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-7 space-y-7 custom-scrollbar bg-zinc-50/20 dark:bg-transparent">
                            {messages.length === 1 && (
                                <div className="grid grid-cols-1 gap-2.5 mb-6">
                                    {(chatLanguage === 'hi' ? [
                                        "मेरी कुंडली का विश्लेषण करें ☸️",
                                        "करियर के लिए पूजा बताएं 💼",
                                        "मेरा अंकशास्त्र नंबर क्या है? 🔢",
                                        "मुझे परिवार में शांति चाहिए 🕊️"
                                    ] : [
                                        "Analyze my Kundali ☸️",
                                        "Recommend a Puja for Career 💼",
                                        "What is my Numerology number? 🔢",
                                        "I want peace in many family 🕊️"
                                    ]).map((starter, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => handleSend(undefined, starter)}
                                            className="px-5 py-3 text-left text-[11px] font-black uppercase tracking-widest bg-white dark:bg-white/5 border border-orange-100 dark:border-white/10 rounded-xl text-orange-600 dark:text-orange-400 hover:bg-saffron hover:text-white transition-all shadow-sm active:scale-95 group"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform inline-block">{starter}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                            
                            {messages.map((m, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-4 max-w-[88%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center border-2 overflow-hidden shadow-sm ${
                                            m.role === 'model' 
                                            ? 'border-saffron/40' 
                                            : 'bg-zinc-100 border-zinc-200 text-zinc-600 dark:bg-white/10 dark:border-white/10'
                                        }`}>
                                            {m.role === 'model' ? <img src="/pandit_ji_avatar.png" className="w-full h-full object-cover" /> : <User className="w-5 h-5" />}
                                        </div>
                                        <div className={`p-5 rounded-[1.5rem] text-[15px] leading-relaxed shadow-sm transition-all ${
                                            m.role === 'model' 
                                            ? 'bg-white dark:bg-white/5 border border-orange-100/50 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-tl-none font-medium' 
                                            : 'bg-gradient-to-tr from-saffron to-orange-700 text-white rounded-tr-none shadow-orange-200/50 dark:shadow-none font-bold'
                                        }`}>
                                            {m.role === 'model' ? (
                                                <div className="space-y-4">
                                                    <p>{m.content.replace(/\[\[PUJA_LINK:.*?\]\]/g, '').trim()}</p>
                                                    {m.content.match(/\[\[PUJA_LINK:\s*(.*?)\s*\|\s*(.*?)\s*\]\]/) && (
                                                        <Link 
                                                            href={`/pooja-services/${m.content.match(/\[\[PUJA_LINK:\s*(.*?)\s*\|\s*(.*?)\s*\]\]/)?.[2]}`}
                                                            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-orange-50 dark:bg-white/10 border-2 border-orange-200 dark:border-white/20 text-orange-700 dark:text-orange-400 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-saffron hover:text-white transition-all shadow-sm"
                                                        >
                                                            <span>Book {m.content.match(/\[\[PUJA_LINK:\s*(.*?)\s*\|\s*(.*?)\s*\]\]/)?.[1]}</span>
                                                            <ArrowRight className="w-3.5 h-3.5" />
                                                        </Link>
                                                    )}
                                                </div>
                                            ) : (
                                                m.content
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-4 max-w-[85%]">
                                        <div className="w-9 h-9 rounded-full border-2 border-saffron/40 overflow-hidden shadow-sm">
                                            <img src="/pandit_ji_avatar.png" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-5 rounded-[1.5rem] bg-white dark:bg-white/5 border border-orange-100/50 dark:border-white/10 flex gap-1.5 items-center">
                                            <span className="w-2.5 h-2.5 bg-saffron rounded-full animate-bounce"></span>
                                            <span className="w-2.5 h-2.5 bg-saffron rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                            <span className="w-2.5 h-2.5 bg-saffron rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-7 bg-white dark:bg-[#0f141f] border-t border-orange-100/30 dark:border-white/10">
                            <form onSubmit={handleSend} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={chatLanguage === 'hi' ? "अपनी शंका यहाँ लिखें..." : "Describe your query..."}
                                    className="flex-1 bg-zinc-100/30 dark:bg-white/5 border-2 border-zinc-100 dark:border-white/10 rounded-[1.5rem] px-8 py-5 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-saffron/50 shadow-inner transition-all font-medium"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-3 p-3 bg-gradient-to-r from-saffron to-orange-700 text-white rounded-[1.25rem] hover:scale-105 transition-all shadow-xl disabled:opacity-50 disabled:grayscale"
                                >
                                    <Send className="w-6 h-6" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes divineGlow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.3); }
                }
                @keyframes divineRotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .divine-glow-1 {
                    animation: divineGlow 3s ease-in-out infinite;
                }
                .divine-glow-2 {
                    animation: divineRotate 10s linear infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(249, 115, 22, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(249, 115, 22, 0.5);
                }
            ` }} />
        </>
    );
}
