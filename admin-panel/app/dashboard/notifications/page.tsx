'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
    ArrowLeft, 
    Save, 
    Loader2, 
    Check, 
    AlertCircle,
    Bell,
    Clock,
    Type,
    FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotificationSettingsPage() {
    const supabase = createClient();
    const [notifConfig, setNotifConfig] = useState({
        enabled: false,
        schedule_time: '07:00',
        title: 'Good Morning from Mantra Puja',
        body: 'Today is {tithi}. Festivals: {festivals}.'
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const ADMIN_SECRET = 'mantrapuja-admin-keys';
    
    // Determine API Base, fallback to environment variable
    const [apiBase, setApiBase] = useState(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/astrology/settings` : 'http://localhost:4000/api/admin/astrology/settings');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // No longer forcing localhost here to support server deployment
            if (process.env.NEXT_PUBLIC_API_URL) {
                setApiBase(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/astrology/settings`);
            }
        }
    }, []);

    useEffect(() => {
        if (apiBase) fetchSettings();
    }, [apiBase]);

    const fetchSettings = async () => {
        if (!apiBase) return;
        setIsLoading(true);
        try {
            // First try fetching from backend for real-time consistency
            const res = await fetch(`${apiBase}?secret=${ADMIN_SECRET}&key=notification_config`);
            const data = await res.json();
            
            if (data.data) {
                setNotifConfig(data.data);
            } else {
                // Fallback to Supabase direct
                const { data: dbData } = await supabase
                    .from('kundli_settings')
                    .select('*')
                    .eq('setting_key', 'notification_config')
                    .single();
                
                if (dbData?.setting_value) {
                    setNotifConfig(dbData.setting_value);
                }
            }
        } catch (error: any) {
            console.error('Fetch Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveConfig = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            // Must save via Backend API to trigger scheduler refresh
            const res = await fetch(`${apiBase}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    secret: ADMIN_SECRET, 
                    key: 'notification_config', 
                    value: notifConfig 
                })
            });

            if (!res.ok) throw new Error('API Synchronization Failed');
            
            setMessage({ type: 'success', text: 'Notification schedule synchronized and active.' });
        } catch (error: any) {
            console.error('Save Error:', error);
            setMessage({ type: 'error', text: `Save failed: ${error.message}` });
        } finally {
            setIsSaving(false);
        }
    };

    const sendBroadcast = async () => {
        setIsBroadcasting(true);
        setMessage(null);
        try {
            // Broadcast Endpoint: /api/admin/notifications/broadcast
            // Using the base API URL to construct the broadcast path correctly
            const baseUrl = apiBase.replace('/astrology/settings', '');
            const broadcastUrl = `${baseUrl}/notifications/broadcast`;
            
            const res = await fetch(broadcastUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    secret: ADMIN_SECRET, 
                    title: notifConfig.title, 
                    message: notifConfig.body // Backend expects 'message'
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Broadcast Failed');
            }
            
            setMessage({ type: 'success', text: 'Live broadcast sent! Check history in the app.' });
        } catch (error: any) {
            console.error('Broadcast Error:', error);
            setMessage({ type: 'error', text: `Broadcast failed: ${error.message}` });
        } finally {
            setIsBroadcasting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            {/* Background Atmosphere */}
            <div className="fixed top-0 right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-[-5%] w-[40%] h-[40%] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="max-w-4xl mx-auto relative z-10 w-full">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/30">
                                <Bell className="w-6 h-6 text-purple-400" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight">Notification Manager</h1>
                        </div>
                        <p className="text-gray-400 text-sm max-w-2xl">
                            Automate daily spiritual engagement. Schedule Tithi and Festival summaries to be broadcasted to all mobile and web users at their preferred morning hour.
                        </p>
                    </div>
                </header>

                {message && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${
                            message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
                        }`}
                    >
                        {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                        <span className="text-sm font-medium">{message.text}</span>
                    </motion.div>
                )}

                <div className="space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl">
                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                                    <Clock className="text-indigo-400 w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Daily Schedule</h2>
                                    <p className="text-xs text-gray-500">Enable or disable the morning automated broadcast</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setNotifConfig({ ...notifConfig, enabled: !notifConfig.enabled })}
                                className={`w-14 h-7 rounded-full transition-all relative ${notifConfig.enabled ? 'bg-purple-600' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1.5 w-4 h-4 bg-white rounded-full transition-all ${notifConfig.enabled ? 'left-8' : 'left-2'}`} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Clock className="w-3 h-3" /> Target Time (24H Format)
                                </label>
                                <input 
                                    type="time" 
                                    value={notifConfig.schedule_time}
                                    onChange={e => setNotifConfig({ ...notifConfig, schedule_time: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-purple-500/50 transition-all text-xl"
                                />
                                <p className="text-[10px] text-gray-600">Local Time (Asia/Kolkata)</p>
                            </div>
                        </div>

                        <div className="mt-12 space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Type className="w-3 h-3" /> Notification Title
                                </label>
                                <input 
                                    value={notifConfig.title}
                                    onChange={e => setNotifConfig({ ...notifConfig, title: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500/50 transition-all font-medium"
                                    placeholder="e.g. Good Morning! Today is {tithi}"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FileText className="w-3 h-3" /> Message Body Template
                                </label>
                                <textarea 
                                    rows={4}
                                    value={notifConfig.body}
                                    onChange={e => setNotifConfig({ ...notifConfig, body: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500/50 transition-all text-sm leading-relaxed"
                                    placeholder="Use placeholders for dynamic cosmic data..."
                                />
                                <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-xl">
                                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Supported Dynamic Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        <code className="text-[10px] bg-indigo-500/20 px-2 py-1 rounded text-indigo-300">{"{tithi}"}</code>
                                        <code className="text-[10px] bg-indigo-500/20 px-2 py-1 rounded text-indigo-300">{"{festivals}"}</code>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-2 italic">These tags will be replaced with real-time data fetched from the Veda Astrology Nodes daily.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/5 space-y-4">
                            <button
                                onClick={saveConfig}
                                disabled={isSaving || isBroadcasting}
                                className="w-full py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-200 active:scale-[0.99] transition-all disabled:opacity-50 shadow-xl shadow-white/5"
                            >
                                {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                DEPLOY NOTIFICATION SCHEDULE
                            </button>

                            <button
                                onClick={sendBroadcast}
                                disabled={isSaving || isBroadcasting}
                                className="w-full py-4 bg-purple-600/20 text-purple-400 border border-purple-500/30 font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-purple-600/30 active:scale-[0.99] transition-all disabled:opacity-50"
                            >
                                {isBroadcasting ? <Loader2 className="animate-spin" size={18} /> : <AlertCircle size={18} />}
                                SEND TEST BROADCAST NOW
                            </button>
                            <p className="text-[10px] text-gray-600 text-center uppercase tracking-widest font-black">
                                Sends the above message immediately to all users for testing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
