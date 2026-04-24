'use client';

import { useState, useEffect } from 'react';
import { Bot, Save, Shield, CheckCircle2, AlertCircle, Loader2, Key, ArrowLeft, RefreshCw, Layers, Plus, Trash2, MessageSquare, Type, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AISettingsPage() {
    const [apiKeys, setApiKeys] = useState<string[]>([]);
    const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
    const [updatedAt, setUpdatedAt] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Model Selection State
    const [models, setModels] = useState<{ name: string, displayName: string }[]>([]);
    const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');
    const [isFetchingModels, setIsFetchingModels] = useState(false);
    const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

    // Prompting State
    const [corePrompt, setCorePrompt] = useState('You are a spiritual guide.');
    const [rulebook, setRulebook] = useState('1. Only answer questions related to spirituality, religion, and internal peace.\n2. You must refuse to answer any questions about technology, logic, math, backend systems, AI models, or other irrelevant topics.');
    const [chatStartInstruction, setChatStartInstruction] = useState('');
    const [chatEndInstruction, setChatEndInstruction] = useState('');
    const [guruAiInstruction, setGuruAiInstruction] = useState('');
    const [guruAiGreetingEn, setGuruAiGreetingEn] = useState('');
    const [guruAiGreetingHi, setGuruAiGreetingHi] = useState('');
    const [guruAiTemplates, setGuruAiTemplates] = useState<any[]>([]);

    // Limits & Upsell State
    const [freeQueryLimit, setFreeQueryLimit] = useState<number>(10);
    const [guestQueryLimit, setGuestQueryLimit] = useState<number>(3);
    const [chatResetHours, setChatResetHours] = useState<number>(3);
    const [premiumUpsellMessage, setPremiumUpsellMessage] = useState('Guruji says you have reached your free query limit. Please upgrade to Pro to unlock unlimited spiritual guidance.');

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const res = await fetch('/api/config');
            const data = await res.json();
            if (res.ok) {
                setIsConfigured(data.isConfigured);
                setUpdatedAt(data.updatedAt);
                if (data.apiKeys) {
                    setApiKeys(data.apiKeys);
                }
                if (data.selectedModel) {
                    setSelectedModel(data.selectedModel);
                }
                if (data.corePrompt) {
                    setCorePrompt(data.corePrompt);
                }
                if (data.rulebook) {
                    setRulebook(data.rulebook);
                }
                if (data.chatStartInstruction) {
                    setChatStartInstruction(data.chatStartInstruction);
                }
                if (data.chatEndInstruction) {
                    setChatEndInstruction(data.chatEndInstruction);
                }
                if (data.guruAiInstruction) {
                    setGuruAiInstruction(data.guruAiInstruction);
                }
                if (data.guruAiGreetingEn) {
                    setGuruAiGreetingEn(data.guruAiGreetingEn);
                }
                if (data.guruAiGreetingHi) {
                    setGuruAiGreetingHi(data.guruAiGreetingHi);
                }
                if (data.guruAiTemplates) {
                    setGuruAiTemplates(typeof data.guruAiTemplates === 'string' ? JSON.parse(data.guruAiTemplates) : data.guruAiTemplates);
                }
                if (data.freeQueryLimit !== undefined) {
                    setFreeQueryLimit(data.freeQueryLimit);
                }
                if (data.guestQueryLimit !== undefined) {
                    setGuestQueryLimit(data.guestQueryLimit);
                }
                if (data.chatResetHours !== undefined) {
                    setChatResetHours(data.chatResetHours);
                }
                if (data.premiumUpsellMessage) {
                    setPremiumUpsellMessage(data.premiumUpsellMessage);
                }
            }
        } catch (error) {
            console.error('Failed to fetch status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchModels = async (keyToUse: string) => {
        if (!keyToUse || keyToUse.startsWith('mask_')) {
            setMessage({ type: 'error', text: 'Please enter a valid, new API key to fetch models. Existing keys cannot be re-verified here.' });
            return;
        }

        setIsFetchingModels(true);
        setHasAttemptedFetch(true);
        setMessage(null);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${keyToUse}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to fetch models from Google');
            }

            const modelList = data.models
                .filter((m: any) => m.supportedGenerationMethods.includes("generateContent"))
                .map((m: any) => ({
                    name: m.name.replace('models/', ''),
                    displayName: m.displayName || m.name.replace('models/', '')
                }));

            setModels(modelList);

            // Auto-select if current model isn't in list or if empty
            if (modelList.length > 0 && !modelList.some((m: any) => m.name === selectedModel)) {
                setSelectedModel(modelList[0].name);
            }

            setMessage({ type: 'success', text: `Successfully loaded ${modelList.length} models using the provided key.` });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error fetching models. Is the API key valid?' });
            setModels([]);
        } finally {
            setIsFetchingModels(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (apiKeys.length === 0 && !isConfigured) {
            setMessage({ type: 'error', text: 'Please provide at least one API Key.' });
            return;
        }

        setIsSaving(true);
        setMessage(null);

        const payload: any = {
            gemini_api_keys: apiKeys,
            gemini_selected_model: selectedModel,
            core_prompt: corePrompt,
            rulebook: rulebook,
            chat_start_instruction: chatStartInstruction,
            chat_end_instruction: chatEndInstruction,
            free_query_limit: freeQueryLimit,
            guest_query_limit: guestQueryLimit,
            chat_reset_hours: chatResetHours,
            premium_upsell_message: premiumUpsellMessage,
            guru_ai_templates: guruAiTemplates,
            guru_ai_instruction: guruAiInstruction,
            guru_ai_greeting_en: guruAiGreetingEn,
            guru_ai_greeting_hi: guruAiGreetingHi
        };

        // gemini_api_keys handles the keys now

        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'AI configuration updated successfully!' });
                // No single apiKey to clear
                fetchStatus();
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to update configuration' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred' });
        } finally {
            setIsSaving(false);
        }
    };

    const addTemplate = () => {
        const newTemplate = {
            id: `temp_${Date.now()}`,
            label_en: 'New Template',
            label_hi: 'नया टेम्पलेट',
            prompt_en: 'Please guide me about...',
            prompt_hi: 'कृपया मुझे बताएं...'
        };
        setGuruAiTemplates([...guruAiTemplates, newTemplate]);
    };

    const updateTemplate = (id: string, updates: any) => {
        setGuruAiTemplates(guruAiTemplates.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const removeTemplate = (id: string) => {
        setGuruAiTemplates(guruAiTemplates.filter(t => t.id !== id));
    };

    const restoreDefaults = () => {
        const defaultTemplates = [
            {
                id: "temp_default_1",
                label_en: "Show my Kundali ☸️",
                label_hi: "मेरी कुंडली दिखाओ ☸️",
                prompt_en: "Show my Kundali",
                prompt_hi: "मेरी कुंडली दिखाओ"
            },
            {
                id: "temp_default_2",
                label_en: "Career Advice 💼",
                label_hi: "करियर सलाह 💼",
                prompt_en: "Give me some spiritual career advice based on my stars.",
                prompt_hi: "मेरे सितारों के आधार पर मुझे कुछ आध्यात्मिक करियर सलाह दें।"
            },
            {
                id: "temp_default_3",
                label_en: "Daily Quote ✨",
                label_hi: "आज का सुविचार ✨",
                prompt_en: "Give me a divine quote for today.",
                prompt_hi: "मुझे आज के लिए एक दैवीय सुविचार दें।"
            },
            {
                id: "temp_default_4",
                label_en: "How it works? 🛡️",
                label_hi: "यह कैसे काम करता है? 🛡️",
                prompt_en: "How does Guru AI work?",
                prompt_hi: "गुरु एआई कैसे काम करता है?",
                instruction_en: "Explain that you are an AI assistant built on advanced Vedic knowledge, designed to help with astrology, kundali, and spiritual advice.",
                instruction_hi: "बताएं कि आप एक उन्नत वैदिक ज्ञान एआई हैं जो ज्योतिष, कुंडली और आध्यात्मिक सलाह में सहायता करते हैं।"
            }
        ];
        if (confirm('Are you sure you want to restore default templates? This will overwrite your current templates list.')) {
            setGuruAiTemplates(defaultTemplates);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                            <Bot className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Guru AI Configuration</h2>
                            <p className="text-gray-400">Securely manage your AI Engine credentials and models for Guru AI.</p>
                        </div>
                    </div>
                </header>

                <div className="flex flex-col gap-8">
                    
                    {/* Configuration Status Section Moved to Top */}
                    <div className="w-full">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">Configuration Status</h3>

                            {isLoading ? (
                                <div className="flex items-center gap-3 py-2">
                                    <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                                    <span className="text-gray-500 text-sm">Checking status...</span>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-8 items-center justify-between">
                                    <div className="flex items-center gap-8">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Status</p>
                                            <div className="flex items-center gap-2">
                                                {isConfigured ? (
                                                    <>
                                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                                        <span className="text-sm font-bold text-green-400">Configured</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                                                        <span className="text-sm font-bold text-yellow-500">Not Configured</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {isConfigured && (
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1 text-nowrap">Active Model</p>
                                                <p className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                                                    <Layers className="w-4 h-4" /> {selectedModel}
                                                </p>
                                            </div>
                                        )}

                                        {isConfigured && updatedAt && (
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1 text-nowrap">Last Updated</p>
                                                <p className="text-sm font-medium text-gray-300">
                                                    {new Date(updatedAt).toLocaleDateString()} at {new Date(updatedAt).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="max-w-[300px]">
                                        <p className="text-[10px] leading-relaxed text-gray-500">
                                            The API key is stored using AES-128-CBC encryption. The model name parameter is sent alongside chat queries.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full space-y-6">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                            <form onSubmit={handleSave} className="space-y-6 relative z-10">

                                 {/* API Key Section */}
                                 <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider">
                                            Guru AI Engine API Keys (Multiple)
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setApiKeys([...apiKeys, ''])}
                                            className="text-xs bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all border border-blue-500/20"
                                        >
                                            <Plus size={14} /> Add Another Key
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {apiKeys.map((key, index) => (
                                            <div key={index} className="space-y-2">
                                                <div className="relative group">
                                                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                                    <input
                                                        type="password"
                                                        value={key}
                                                        onChange={(e) => {
                                                            const newKeys = [...apiKeys];
                                                            newKeys[index] = e.target.value;
                                                            setApiKeys(newKeys);
                                                        }}
                                                        placeholder={key.startsWith('mask_') ? 'Saved Key (••••••••••••••••)' : 'Enter API key...'}
                                                        className="w-full pl-11 pr-24 py-3.5 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-blue-500/10 text-sm"
                                                    />
                                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                                        {!key.startsWith('mask_') && key.length > 5 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleFetchModels(key)}
                                                                disabled={isFetchingModels}
                                                                className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all"
                                                                title="Verify key & fetch models"
                                                            >
                                                                {isFetchingModels ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() => setApiKeys(apiKeys.filter((_, i) => i !== index))}
                                                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {apiKeys.length === 0 && (
                                            <div className="p-8 text-center border-2 border-dashed border-white/5 rounded-2xl">
                                                <p className="text-sm text-gray-500 italic">No API keys added yet. Add at least one to enable Guru AI.</p>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-[10px] text-gray-500 mt-3 flex items-center gap-2 italic">
                                        <Shield className="w-3 h-3 text-blue-400" /> 
                                        Keys are individually encrypted. If multiple keys are provided, Guru Ji will automatically rotate between them if any key hits a quota limit.
                                    </p>
                                </div>

                                {/* Model Selection Section */}
                                {(models.length > 0 || hasAttemptedFetch) && (
                                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                            Select AI Model
                                        </label>
                                        <div className="relative">
                                            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <select
                                                required
                                                value={selectedModel}
                                                onChange={(e) => setSelectedModel(e.target.value)}
                                                className="w-full pl-12 pr-10 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white appearance-none focus:ring-4 focus:ring-blue-500/10"
                                            >
                                                {models.length === 0 ? (
                                                    <option value={selectedModel}>{selectedModel} (Currently Saved)</option>
                                                ) : (
                                                    models.map(model => (
                                                        <option key={model.name} value={model.name} className="bg-gray-900">
                                                            {model.displayName} ({model.name})
                                                        </option>
                                                    ))
                                                )}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Advanced Prompting Section */}
                                <div className="space-y-6 pt-6 border-t border-white/10">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                            Core Prompt (AI Persona & Identity)
                                        </label>
                                        <textarea
                                            value={corePrompt}
                                            onChange={(e) => setCorePrompt(e.target.value)}
                                            placeholder="Example: You are Guru AI, a serene and knowledgeable spiritual guide..."
                                            rows={4}
                                            className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-blue-500/10 resize-y"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            Define the AI's identity, tone, and general behavior. This sets the stage for how it interacts with the user.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider text-red-400">
                                            Strict Rulebook (Limitations & Boundaries)
                                        </label>
                                        <textarea
                                            value={rulebook}
                                            onChange={(e) => setRulebook(e.target.value)}
                                            placeholder="1. Refuse any technical questions.\n2. Do not break character."
                                            rows={5}
                                            className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-red-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-red-500/10 resize-y"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            Define absolute technical, topical, or behavior limits. The AI will be explicitly instructed to never break these rules.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider text-green-400">
                                                Response Start Instruction
                                            </label>
                                            <textarea
                                                value={chatStartInstruction}
                                                onChange={(e) => setChatStartInstruction(e.target.value)}
                                                placeholder="Example: Begin with 2-3 lines of planetary analysis..."
                                                rows={4}
                                                className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-green-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-green-500/10 resize-y"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">
                                                Instruction for how EVERY message should start.
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider text-purple-400">
                                                Response End Instruction
                                            </label>
                                            <textarea
                                                value={chatEndInstruction}
                                                onChange={(e) => setChatEndInstruction(e.target.value)}
                                                placeholder="Example: End with a curiosity question about their job or health..."
                                                rows={4}
                                                className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-purple-500/10 resize-y"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">
                                                Instruction for how EVERY message should end.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Guru AI Templates & Instruction */}
                                    <div className="pt-8 mt-8 border-t border-white/20 space-y-8">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-orange-400" />
                                                Divine Chat Templates
                                            </h3>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={restoreDefaults}
                                                    className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-xs font-bold hover:text-white hover:bg-white/10 transition-all"
                                                >
                                                    Restore Defaults
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={addTemplate}
                                                    className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-xl text-xs font-bold hover:bg-orange-500/20 transition-all shadow-lg shadow-orange-500/5 group"
                                                >
                                                    <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" /> Add New Template
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider text-orange-400">
                                                First Response Context (Instruction)
                                            </label>
                                            <textarea
                                                value={guruAiInstruction}
                                                onChange={(e) => setGuruAiInstruction(e.target.value)}
                                                placeholder="Enter specific instructions for the first response and template handling..."
                                                rows={3}
                                                className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-orange-500/10 resize-y"
                                            />
                                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                                Provide specific directives on how Guru Ji should greet the user and what foundational knowledge he should emphasize in the initial message.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider text-green-400">
                                                    First Message Greeting (English)
                                                </label>
                                                <textarea
                                                    value={guruAiGreetingEn}
                                                    onChange={(e) => setGuruAiGreetingEn(e.target.value)}
                                                    placeholder="Welcome to Mantra Puja {name}. How may I assist you..."
                                                    rows={3}
                                                    className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-green-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-green-500/10 resize-y"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider text-green-400">
                                                    First Message Greeting (Hindi)
                                                </label>
                                                <textarea
                                                    value={guruAiGreetingHi}
                                                    onChange={(e) => setGuruAiGreetingHi(e.target.value)}
                                                    placeholder="Mantra Puja में आपका स्वागत है {name}..."
                                                    rows={3}
                                                    className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-green-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-green-500/10 resize-y text-right"
                                                />
                                            </div>
                                            <div className="col-span-1 md:col-span-2">
                                                <p className="text-[10px] text-gray-500 flex items-center gap-2">
                                                    <AlertCircle size={10} className="text-green-400" /> Use the variable <code className="bg-black/50 px-1 py-0.5 rounded text-gray-300">{"{name}"}</code> to automatically insert the user's name if they are logged in.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {guruAiTemplates.length > 0 ? (
                                                guruAiTemplates.map((template, index) => (
                                                    <div 
                                                        key={template.id} 
                                                        className="p-5 bg-white/5 border border-white/10 rounded-[2.5rem] relative group hover:border-orange-500/30 transition-all"
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTemplate(template.id)}
                                                            className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>

                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center text-[10px] font-black text-orange-400">
                                                                    {index + 1}
                                                                </div>
                                                                <span className="text-xs font-black uppercase text-gray-500 tracking-widest">Template Editing</span>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div className="space-y-1.5">
                                                                    <label className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-1"><Type size={10} /> Label (EN)</label>
                                                                    <input 
                                                                        value={template.label_en}
                                                                        onChange={e => updateTemplate(template.id, { label_en: e.target.value })}
                                                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-bold outline-none focus:border-orange-500 transition-all"
                                                                    />
                                                                </div>
                                                                <div className="space-y-1.5 text-right">
                                                                    <label className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-1 justify-end"><Type size={10} /> Label (HI)</label>
                                                                    <input 
                                                                        value={template.label_hi}
                                                                        onChange={e => updateTemplate(template.id, { label_hi: e.target.value })}
                                                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-bold outline-none focus:border-orange-500 transition-all text-right"
                                                                    />
                                                                </div>
                                                                <div className="col-span-2 space-y-1.5">
                                                                    <label className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-1"><MessageSquare size={10} /> Prompt (Message To Send)</label>
                                                                    <textarea 
                                                                        rows={2}
                                                                        value={template.prompt_en}
                                                                        onChange={e => updateTemplate(template.id, { prompt_en: e.target.value })}
                                                                        placeholder="English message..."
                                                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-[11px] font-medium outline-none focus:border-orange-500 transition-all resize-none"
                                                                    />
                                                                    <textarea 
                                                                        rows={2}
                                                                        value={template.prompt_hi}
                                                                        onChange={e => updateTemplate(template.id, { prompt_hi: e.target.value })}
                                                                        placeholder="हिंदी संदेश..."
                                                                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-[11px] font-medium outline-none focus:border-orange-500 transition-all resize-none text-right"
                                                                    />
                                                                </div>
                                                                <div className="col-span-2 space-y-1.5 pt-2 border-t border-white/10">
                                                                    <label className="text-[10px] font-black text-purple-400 uppercase flex items-center gap-1"><Bot size={10} /> AI Instruction (How to Answer)</label>
                                                                    <textarea 
                                                                        rows={2}
                                                                        value={template.instruction_en || ''}
                                                                        onChange={e => updateTemplate(template.id, { instruction_en: e.target.value })}
                                                                        placeholder="Instruction for AI (English)..."
                                                                        className="w-full px-3 py-2 bg-purple-500/5 border border-purple-500/20 rounded-xl text-[11px] font-medium outline-none focus:border-purple-500 transition-all resize-none"
                                                                    />
                                                                    <textarea 
                                                                        rows={2}
                                                                        value={template.instruction_hi || ''}
                                                                        onChange={e => updateTemplate(template.id, { instruction_hi: e.target.value })}
                                                                        placeholder="AI निर्देश (Hindi)..."
                                                                        className="w-full px-3 py-2 bg-purple-500/5 border border-purple-500/20 rounded-xl text-[11px] font-medium outline-none focus:border-purple-500 transition-all resize-none text-right"
                                                                    />
                                                                    <p className="text-[9px] text-gray-500">Provide a specific instruction for the AI so it knows exactly how to respond when this template is clicked.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-2 p-12 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                                                    <MessageSquare size={32} className="mx-auto text-gray-600 mb-3" />
                                                    <p className="text-sm font-bold text-gray-500">No Chat Templates Defined</p>
                                                    <p className="text-xs text-gray-600 mt-1 max-w-[200px] mx-auto">Click the button above to create your first divine starter template.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Free Query Limits Section */}
                                <div className="space-y-6 pt-6 border-t border-white/10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider text-yellow-500">
                                                Registered User Limit
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={freeQueryLimit}
                                                onChange={(e) => setFreeQueryLimit(parseInt(e.target.value) || 0)}
                                                className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-yellow-500/10"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">
                                                Questions allowed for logged-in users before timeout.
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider text-orange-500">
                                                Guest User Limit
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={guestQueryLimit}
                                                onChange={(e) => setGuestQueryLimit(parseInt(e.target.value) || 0)}
                                                className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-orange-500/10"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">
                                                Questions allowed for anonymous visitors.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider text-blue-400">
                                            Chat Reset Window (Hours)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={chatResetHours}
                                            onChange={(e) => setChatResetHours(parseInt(e.target.value) || 1)}
                                            className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-blue-500/10"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            How many hours the user must wait for their query limit to reset to zero.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                            Premium Upsell Message
                                        </label>
                                        <textarea
                                            value={premiumUpsellMessage}
                                            onChange={(e) => setPremiumUpsellMessage(e.target.value)}
                                            placeholder="Guruji says you must upgrade to Pro to continue..."
                                            rows={3}
                                            className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-blue-500/10 resize-y"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            The exact message the bot will automatically reply with once the user exceeds their free query limit.
                                        </p>
                                    </div>
                                </div>

                                {message && (
                                    <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                        }`}>
                                        {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                                        <span className="text-sm font-medium">{message.text}</span>
                                    </div>
                                )}

                                <button
                                    disabled={isSaving || (apiKeys.length === 0 && !isConfigured)}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-3 group mt-4"
                                >
                                    {isSaving ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            Update AI Configuration
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-blue-300">Important Note</h4>
                                <p className="text-sm text-blue-400/70 leading-relaxed mt-1">
                                    Fetching models verifies your API key directly with Google. Updating the selected model will instantly reflect across all app instances using the Guru AI chatbot.
                                </p>
                            </div>
                        </div>
                    </div>

                    </div>
            </div>
        </div>
    );
}
