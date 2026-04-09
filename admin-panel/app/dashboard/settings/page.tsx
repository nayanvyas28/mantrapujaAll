'use client';

import { useState, useEffect } from 'react';
import { Bot, Save, Shield, CheckCircle2, AlertCircle, Loader2, Key, ArrowLeft, RefreshCw, Layers } from 'lucide-react';
import Link from 'next/link';

export default function AISettingsPage() {
    const [apiKey, setApiKey] = useState('');
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

    // Limits & Upsell State
    const [freeQueryLimit, setFreeQueryLimit] = useState<number>(5);
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
                if (data.selectedModel) {
                    setSelectedModel(data.selectedModel);
                }
                if (data.corePrompt) {
                    setCorePrompt(data.corePrompt);
                }
                if (data.rulebook) {
                    setRulebook(data.rulebook);
                }
                if (data.freeQueryLimit !== undefined) {
                    setFreeQueryLimit(data.freeQueryLimit);
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

    const handleFetchModels = async () => {
        if (!apiKey) {
            setMessage({ type: 'error', text: 'Please enter an API key first to fetch models.' });
            return;
        }

        setIsFetchingModels(true);
        setHasAttemptedFetch(true);
        setMessage(null);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
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

            setMessage({ type: 'success', text: `Successfully loaded ${modelList.length} models.` });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error fetching models. Is the API key valid?' });
            setModels([]);
        } finally {
            setIsFetchingModels(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        // Allow saving if just updating model when key is already configured
        if (!apiKey && !isConfigured) {
            setMessage({ type: 'error', text: 'Please provide an API Key.' });
            return;
        }

        setIsSaving(true);
        setMessage(null);

        const payload: any = {
            gemini_selected_model: selectedModel,
            core_prompt: corePrompt,
            rulebook: rulebook,
            free_query_limit: freeQueryLimit,
            premium_upsell_message: premiumUpsellMessage
        };

        if (apiKey) {
            payload.gemini_api_key = apiKey;
        }

        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'AI configuration updated successfully!' });
                setApiKey(''); // Clear security field
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
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                AI Configuration
                            </h1>
                            <p className="text-gray-400">Securely manage your Gemini API credentials and models for Guru AI.</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                            <form onSubmit={handleSave} className="space-y-6 relative z-10">

                                {/* API Key Section */}
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider">
                                            Google Gemini API Key
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleFetchModels}
                                            disabled={isFetchingModels || !apiKey}
                                            className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                                        >
                                            {isFetchingModels ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                                            Fetch Models
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="password"
                                            required={!isConfigured}
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            placeholder={isConfigured ? '•••••••••••••••• (Leave blank to keep existing key)' : 'Enter your API key here...'}
                                            className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-blue-500/10"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                                        <Shield className="w-3 h-3 text-blue-400" /> Your key is encrypted before being stored. Enter key and fetch models before saving.
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
                                </div>

                                {/* Free Query Limits Section */}
                                <div className="space-y-6 pt-6 border-t border-white/10">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider text-yellow-500">
                                            Free Query Limit (Per User)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={freeQueryLimit}
                                            onChange={(e) => setFreeQueryLimit(parseInt(e.target.value) || 0)}
                                            className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-yellow-500/10"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            Number of free questions a single user device can ask before hitting the paywall. Set to 0 to require Premium immediately.
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
                                    disabled={isSaving || (!apiKey && !isConfigured)}
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

                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">Configuration Status</h3>

                            {isLoading ? (
                                <div className="flex items-center gap-3 py-2">
                                    <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                                    <span className="text-gray-500 text-sm">Checking status...</span>
                                </div>
                            ) : (
                                <div className="space-y-6">
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

                                    <div className="pt-4 border-t border-white/5">
                                        <p className="text-[10px] leading-relaxed text-gray-500">
                                            The API key is stored using AES-128-CBC encryption. The model name parameter is sent alongside chat queries.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
