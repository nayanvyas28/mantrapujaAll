'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
    Settings, 
    Zap, 
    Shield, 
    ArrowLeft, 
    Save, 
    Loader2, 
    Check, 
    AlertCircle,
    LayoutDashboard,
    Globe,
    Lock,
    Plus,
    Trash2,
    Edit3,
    ArrowUpDown,
    Cpu,
    Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface AstrologyAPIConfig {
    id: string;
    provider: 'astrologyapi' | 'prokerala' | 'prokerala_v2';
    user_id?: string;
    api_key: string;
    is_enabled: boolean;
    name: string;
    priority: number; // For weighted load balancing or priority
}

export default function MultiKundliSettingsPage() {
    const supabase = createClient();
    const [config, setConfig] = useState<{
        apis: AstrologyAPIConfig[];
        load_balance_strategy: 'round-robin' | 'priority' | 'random';
        failover_enabled: boolean;
    }>({
        apis: [],
        load_balance_strategy: 'round-robin',
        failover_enabled: true
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('kundli_settings')
                .select('*')
                .eq('setting_key', 'api_config');
            
            if (error) throw error;
            if (data && data.length > 0) {
                setConfig(data[0].setting_value);
            } else {
                // Initialize with a healthy default if not found
                const defaultConfig = {
                    apis: [{
                        id: 'node_1',
                        name: 'Primary Node (Auto-Generated)',
                        provider: 'astrologyapi',
                        user_id: '',
                        api_key: '',
                        is_enabled: true,
                        priority: 1
                    }],
                    load_balance_strategy: 'round-robin',
                    failover_enabled: true
                };
                setConfig(defaultConfig as any);
            }
        } catch (error: any) {
            console.error('Fetch Error:', error);
            const errMsg = error.message || error.code || 'UNKNOWN_FETCH_ERROR';
            const details = error.details ? ` (${error.details})` : '';
            setMessage({ type: 'error', text: `SYNC_FETCH_FAILED: ${errMsg}${details}` });
        } finally {
            setIsLoading(false);
        }
    };

    const saveConfig = async (newConfig = config) => {
        setIsSaving(true);
        setMessage(null);
        try {
            const { error } = await supabase
                .from('kundli_settings')
                .upsert({ 
                    setting_key: 'api_config',
                    setting_value: newConfig, 
                    updated_at: new Date().toISOString() 
                }, { onConflict: 'setting_key' });

            if (error) throw error;
            
            setMessage({ type: 'success', text: 'All API configurations synchronized across systems' });
            setConfig(newConfig);
        } catch (error: any) {
            console.error('Save Error:', error);
            const errMsg = error.message || error.code || 'SAVE_FAILED';
            const hint = error.hint ? ` [Hint: ${error.hint}]` : '';
            setMessage({ type: 'error', text: `${errMsg}${hint}` });
        } finally {
            setIsSaving(false);
        }
    };

    const addAPI = () => {
        if (config.apis.length >= 10) {
            alert('Limit reached: Maximum 10 API configurations allowed for stability.');
            return;
        }

        const newApi: AstrologyAPIConfig = {
            id: `api_${Date.now()}`,
            provider: 'astrologyapi',
            user_id: '',
            api_key: '',
            is_enabled: true,
            name: `Astrology Engine ${config.apis.length + 1}`,
            priority: 1
        };

        const updated = { ...config, apis: [...config.apis, newApi] };
        setConfig(updated);
    };

    const updateAPI = (id: string, updates: Partial<AstrologyAPIConfig>) => {
        const updatedApis = config.apis.map(api => 
            api.id === id ? { ...api, ...updates } : api
        );
        setConfig({ ...config, apis: updatedApis });
    };

    const removeAPI = (id: string) => {
        if (!confirm('Are you sure you want to remove this API configuration? System traffic will be redistributed.')) return;
        const updatedApis = config.apis.filter(api => api.id !== id);
        setConfig({ ...config, apis: updatedApis });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-saffron" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-saffron/5 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="max-w-6xl mx-auto relative z-10 w-full">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-saffron/20 rounded-2xl border border-saffron/30">
                                <Cpu className="w-6 h-6 text-saffron" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight">Veda Load Balancer</h1>
                        </div>
                        <p className="text-gray-400 text-sm max-w-2xl">
                            Managing <span className="text-saffron font-bold">{config.apis.length}/10</span> active astrology engines. Our proprietary synchronization algorithm distributes cosmic traffic across these nodes to ensure 100% uptime and zero-latency charts.
                        </p>
                    </div>

                    <button
                        onClick={addAPI}
                        disabled={config.apis.length >= 10}
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-saffron to-amber-600 hover:scale-[1.02] active:scale-[0.98] rounded-2xl font-black transition-all shadow-xl shadow-saffron/20 disabled:opacity-30 disabled:scale-100 uppercase text-xs tracking-widest"
                    >
                        <Plus size={18} />
                        Attach New Engine
                    </button>
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Strategy Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-8">
                            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                <Network className="w-5 h-5 text-saffron" />
                                <h2 className="text-lg font-bold">Traffic Strategy</h2>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Distribution Algo</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { id: 'round-robin', label: 'Round Robin', desc: 'Cyclic distribution across all nodes' },
                                            { id: 'priority', label: 'Priority / Failover', desc: 'Uses primary node until threshold is met' },
                                            { id: 'random', label: 'Dynamic Random', desc: 'Pure random load spreading' }
                                        ].map(algo => (
                                            <button
                                                key={algo.id}
                                                onClick={() => setConfig({ ...config, load_balance_strategy: algo.id as any })}
                                                className={`p-4 rounded-2xl text-left border transition-all ${
                                                    config.load_balance_strategy === algo.id 
                                                    ? 'bg-saffron/10 border-saffron/50 text-white' 
                                                    : 'bg-black/20 border-white/5 text-gray-500 hover:border-white/20'
                                                }`}
                                            >
                                                <p className="text-sm font-bold">{algo.label}</p>
                                                <p className="text-[10px] opacity-70 mt-1">{algo.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
                                    <div>
                                        <p className="text-sm font-bold">Auto-Failover</p>
                                        <p className="text-[10px] text-gray-500">Retry on 2nd node if 1st fails</p>
                                    </div>
                                    <button 
                                        onClick={() => setConfig({ ...config, failover_enabled: !config.failover_enabled })}
                                        className={`w-12 h-6 rounded-full transition-all relative ${config.failover_enabled ? 'bg-saffron' : 'bg-white/10'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.failover_enabled ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => saveConfig()}
                                    disabled={isSaving}
                                    className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                                    SYNCHRONIZE CLUSTER
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Nodes Column */}
                    <div className="lg:col-span-8 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {config.apis.map((api, index) => (
                                <motion.div
                                    key={api.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white/5 border border-white/10 rounded-[32px] p-6 relative group overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => removeAPI(api.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="text-[10px] font-black bg-white/10 px-2 py-1 rounded text-saffron uppercase">Node {index + 1}</div>
                                                <input 
                                                    className="bg-transparent border-none text-lg font-bold outline-none focus:text-saffron w-full"
                                                    value={api.name}
                                                    onChange={e => updateAPI(api.id, { name: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <select 
                                                    value={api.provider}
                                                    onChange={e => updateAPI(api.id, { provider: e.target.value as any })}
                                                    className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-bold outline-none appearance-none cursor-pointer"
                                                >
                                                    <option value="astrologyapi">AstrologyAPI</option>
                                                    <option value="prokerala">Prokerala V1</option>
                                                    <option value="prokerala_v2">Prokerala V2</option>
                                                </select>
                                                <div className="relative">
                                                    <input 
                                                        type="number"
                                                        value={api.priority}
                                                        onChange={e => updateAPI(api.id, { priority: parseInt(e.target.value) || 1 })}
                                                        className="bg-black/40 border border-white/10 rounded-xl p-3 pl-8 text-xs font-bold outline-none w-full"
                                                        placeholder="Prior."
                                                    />
                                                    <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={12} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/5 md:pl-6 flex flex-col justify-center">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 px-3 py-2 bg-black/40 rounded-xl border border-white/10 group-focus-within:border-saffron/30 transition-all">
                                                    <Lock size={12} className="text-gray-500" />
                                                    <input 
                                                        type="text"
                                                        value={api.user_id}
                                                        onChange={e => updateAPI(api.id, { user_id: e.target.value })}
                                                        placeholder="User ID / Client ID"
                                                        className="bg-transparent border-none outline-none text-[11px] font-mono text-gray-300 w-full"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-2 bg-black/40 rounded-xl border border-white/10 group-focus-within:border-saffron/30 transition-all">
                                                    <Zap size={12} className="text-gray-500" />
                                                    <input 
                                                        type="password"
                                                        value={api.api_key}
                                                        onChange={e => updateAPI(api.id, { api_key: e.target.value })}
                                                        placeholder="Secret API Key"
                                                        className="bg-transparent border-none outline-none text-[11px] font-mono text-gray-300 w-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${api.is_enabled ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{api.is_enabled ? 'Node Online' : 'Node Suspended'}</span>
                                        </div>
                                        <button 
                                            onClick={() => updateAPI(api.id, { is_enabled: !api.is_enabled })}
                                            className={`text-[10px] font-black uppercase tracking-widest ${api.is_enabled ? 'text-orange-500 hover:text-orange-400' : 'text-green-500 hover:text-green-400'}`}
                                        >
                                            {api.is_enabled ? 'Pause Node' : 'Initialize Node'}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        
                        {config.apis.length === 0 && (
                            <div className="p-20 text-center bg-white/[0.02] border border-white/10 border-dashed rounded-[40px]">
                                <AlertCircle size={40} className="mx-auto text-gray-700 mb-4" />
                                <h3 className="text-xl font-bold text-gray-500">No Cluster Nodes Found</h3>
                                <p className="text-sm text-gray-600 mt-2">Add your first astrology engine to begin traffic load balancing.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                select {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 1rem center;
                    background-size: 1.5em;
                }
            `}</style>
        </div>
    );
}
