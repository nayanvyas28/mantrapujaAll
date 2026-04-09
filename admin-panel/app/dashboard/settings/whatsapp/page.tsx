"use client";

import { useState } from "react";
import Link from "next/link";
import { Save, Loader2, Settings, ArrowLeft, Shield, Globe, User, Key, Send, FileText, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface Setting {
    key: string;
    value: string;
}

export default function WhatsAppSettingsPage() {
    const [settings, setSettings] = useState<Record<string, string>>({
        WHATSAPP_API_URL: "",
        WHATSAPP_API_USER: "",
        WHATSAPP_API_PASS: "",
        WHATSAPP_API_SENDER: "",
        WHATSAPP_TEMPLATE_NAME: "",
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [toastMessage, setToastMessage] = useState<{ text: string; isError: boolean } | null>(null);

    const showToast = (text: string, isError: boolean = false) => {
        setToastMessage({ text, isError });
        setTimeout(() => setToastMessage(null), 4000);
    };

    const fetchSettings = async () => {
        setFetching(true);
        setToastMessage(null);

        try {
            const res = await fetch(`/api/admin/settings`);
            const json = await res.json();

            if (!res.ok) {
                showToast(json.error || "Failed to fetch settings.", true);
                return;
            }

            const incomingSettings = json.data as Setting[];
            const updatedSettings = { ...settings };
            incomingSettings.forEach((s) => {
                if (s.key in updatedSettings) {
                    updatedSettings[s.key] = s.value;
                }
            });

            setSettings(updatedSettings);
            showToast("Settings loaded successfully.", false);
        } catch (error) {
            console.error("Fetch error:", error);
            showToast("Network error while fetching.", true);
        } finally {
            setFetching(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setToastMessage(null);

        const payloadSettings: Setting[] = Object.entries(settings).map(([key, value]) => ({ key, value }));

        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ settings: payloadSettings }),
            });
            const json = await res.json();

            if (res.ok) {
                showToast(json.message || "Settings published to the App successfully!", false);
            } else {
                showToast(json.error || "Failed to save settings.", true);
            }
        } catch (error) {
            console.error("Save error:", error);
            showToast("Network error while saving.", true);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            {/* Background identical to Home Settings */}
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none" />

            {/* Toast exactly identical to Home Settings */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className="fixed top-6 left-1/2 z-50 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium"
                    >
                        {toastMessage.isError ? (
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        ) : (
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        )}
                        {toastMessage.text}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors w-fit text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                {/* Header identical to Home Settings */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 rounded-xl border border-white/10">
                                <Settings className="w-6 h-6 text-purple-400" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">WhatsApp Manager</h1>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xl">
                            Configure the WhatsApp REST API routing variables. Changes made here will instantly sync with the App&apos;s OTP service.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchSettings}
                            disabled={fetching}
                            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all shadow-lg active:scale-[0.98] mt-5 disabled:opacity-70 disabled:cursor-not-allowed uppercase text-xs tracking-wider h-auth"
                        >
                            {fetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                            {fetching ? "Decrypting..." : "Decrypt & Load"}
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <aside className="lg:col-span-3 space-y-2">
                        <div className="w-full flex items-center justify-between p-4 rounded-2xl transition-all border bg-white/10 border-white/20 shadow-lg shadow-black/50">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-gray-300 text-purple-400" />
                                <span className="font-medium text-sm">BhashSMS Core</span>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                                5/5
                            </span>
                        </div>
                    </aside>

                    <main className="lg:col-span-9">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                                <div>
                                    <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
                                        <Shield className="w-6 h-6 text-purple-400" />
                                        Encryption Active
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        All routing credentials are AES-128-CBC encrypted before hitting Supabase.
                                    </p>
                                </div>
                            </div>
                            
                            <form onSubmit={handleSave} className="space-y-6">
                                
                                {/* URL */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                        Endpoint URL
                                    </label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="url"
                                            name="WHATSAPP_API_URL"
                                            value={settings.WHATSAPP_API_URL}
                                            onChange={handleChange}
                                            placeholder="https://bhashsms.com/api/sendmsg.php"
                                            className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-sm font-medium hover:border-white/20 focus:ring-4 focus:ring-purple-500/10 placeholder:text-gray-600"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Username */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                            API Username
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                name="WHATSAPP_API_USER"
                                                value={settings.WHATSAPP_API_USER}
                                                onChange={handleChange}
                                                placeholder="MisCRM"
                                                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-sm font-medium hover:border-white/20 focus:ring-4 focus:ring-purple-500/10 placeholder:text-gray-600"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                            API Password
                                        </label>
                                        <div className="relative">
                                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="password"
                                                name="WHATSAPP_API_PASS"
                                                value={settings.WHATSAPP_API_PASS}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-sm font-medium hover:border-white/20 focus:ring-4 focus:ring-purple-500/10 placeholder:text-gray-600"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Sender */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                            Sender ID
                                        </label>
                                        <div className="relative">
                                            <Send className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                name="WHATSAPP_API_SENDER"
                                                value={settings.WHATSAPP_API_SENDER}
                                                onChange={handleChange}
                                                placeholder="MisCRM"
                                                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-sm font-medium hover:border-white/20 focus:ring-4 focus:ring-purple-500/10 placeholder:text-gray-600"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Template */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                            Template String
                                        </label>
                                        <div className="relative">
                                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                name="WHATSAPP_TEMPLATE_NAME"
                                                value={settings.WHATSAPP_TEMPLATE_NAME}
                                                onChange={handleChange}
                                                placeholder="service_rejected_hindi"
                                                className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-sm font-medium hover:border-white/20 focus:ring-4 focus:ring-purple-500/10 placeholder:text-gray-600"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6 border-t border-white/5 mt-8">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 rounded-xl font-medium transition-all shadow-lg hover:shadow-purple-500/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed uppercase text-sm tracking-wider"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        {loading ? "Publishing..." : "Publish to DB"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
}
