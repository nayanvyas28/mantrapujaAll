'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
    Settings, 
    Zap, 
    Shield, 
    ArrowLeft, 
    Save, 
    Loader2, 
    Check, 
    AlertCircle,
    Plus,
    Trash2,
    ArrowUpDown,
    Cpu,
    Network,
    Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AstrologyAPIConfig {
    id: string;
    provider: 'astrologyapi' | 'prokerala' | 'prokerala_v2';
    user_id?: string;
    api_key: string;
    is_enabled: boolean;
    name: string;
    priority: number;
}

export default function KundliApiManager() {
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
                const defaultConfig = {
                    apis: [{
                        id: 'node_1',
                        name: 'Primary Node',
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
            setMessage({ type: 'error', text: `Failed to fetch API settings: ${error.message}` });
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
            
            setMessage({ type: 'success', text: 'API configurations synchronized.' });
            setConfig(newConfig);
        } catch (error: any) {
            console.error('Save Error:', error);
            setMessage({ type: 'error', text: `Save failed: ${error.message}` });
        } finally {
            setIsSaving(false);
        }
    };

    const addAPI = () => {
        if (config.apis.length >= 10) return;
        const newApi: AstrologyAPIConfig = {
            id: `api_${Date.now()}`,
            provider: 'astrologyapi',
            user_id: '',
            api_key: '',
            is_enabled: true,
            name: `Astrology Engine ${config.apis.length + 1}`,
            priority: 1
        };
        setConfig({ ...config, apis: [...config.apis, newApi] });
    };

    const updateAPI = (id: string, updates: Partial<AstrologyAPIConfig>) => {
        const updatedApis = config.apis.map(api => 
            api.id === id ? { ...api, ...updates } : api
        );
        setConfig({ ...config, apis: updatedApis });
    };

    const removeAPI = (id: string) => {
        const updatedApis = config.apis.filter(api => api.id !== id);
        setConfig({ ...config, apis: updatedApis });
    };

    if (isLoading) {
        return (
            <div className="p-20 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Kundli API Manager</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Active nodes: <span className="font-bold text-indigo-600">{config.apis.length}/10</span>. Failover and load balancing across providers.
                    </p>
                </div>
                <button
                    onClick={addAPI}
                    disabled={config.apis.length >= 10}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
                >
                    <Plus size={18} /> Add New Node
                </button>
            </header>

            {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                    {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                    <span className="text-sm font-medium">{message.text}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Strategy */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                            <Network size={16} /> Strategy
                        </h2>
                        
                        <div className="space-y-3">
                            {[
                                { id: 'round-robin', label: 'Round Robin', desc: 'Cyclic distribution' },
                                { id: 'priority', label: 'Priority', desc: 'Strict sequence' },
                                { id: 'random', label: 'Random', desc: 'Dynamic spreading' }
                            ].map(algo => (
                                <button
                                    key={algo.id}
                                    onClick={() => setConfig({ ...config, load_balance_strategy: algo.id as any })}
                                    className={`w-full p-4 rounded-xl text-left border transition-all ${
                                        config.load_balance_strategy === algo.id 
                                        ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-600/10' 
                                        : 'bg-slate-50 border-transparent text-slate-500 hover:border-slate-300'
                                    }`}
                                >
                                    <p className={`text-sm font-bold ${config.load_balance_strategy === algo.id ? 'text-indigo-900' : ''}`}>{algo.label}</p>
                                    <p className="text-[11px] opacity-70">{algo.desc}</p>
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                             <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Auto-Failover</p>
                                    <p className="text-[11px] text-slate-500">Enable retry on next node</p>
                                </div>
                                <button 
                                    onClick={() => setConfig({ ...config, failover_enabled: !config.failover_enabled })}
                                    className={`w-11 h-6 rounded-full transition-all relative ${config.failover_enabled ? 'bg-indigo-600' : 'bg-slate-300'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config.failover_enabled ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>

                            <button
                                onClick={() => saveConfig()}
                                disabled={isSaving}
                                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50"
                            >
                                {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>

                {/* Nodes List */}
                <div className="lg:col-span-8 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {config.apis.map((api, index) => (
                            <motion.div
                                key={api.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`bg-white border rounded-2xl p-6 relative group transition-all ${api.is_enabled ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}
                            >
                                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => updateAPI(api.id, { is_enabled: !api.is_enabled })}
                                        className={`p-2 rounded-lg transition-all ${api.is_enabled ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}
                                        title={api.is_enabled ? "Disable Node" : "Enable Node"}
                                    >
                                        <Zap size={16} />
                                    </button>
                                    <button 
                                        onClick={() => removeAPI(api.id)} 
                                        className="p-2 bg-red-50 text-red-600 rounded-lg"
                                        title="Remove Node"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded">Node {index + 1}</div>
                                            <input 
                                                className="bg-transparent border-none text-base font-bold outline-none text-slate-800 w-full"
                                                value={api.name}
                                                onChange={e => updateAPI(api.id, { name: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <select 
                                                value={api.provider}
                                                onChange={e => updateAPI(api.id, { provider: e.target.value as any })}
                                                className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold outline-none"
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
                                                    className="bg-slate-50 border border-slate-200 rounded-lg p-2 pl-7 text-xs font-semibold outline-none w-full"
                                                    placeholder="Priority"
                                                />
                                                <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-4 md:pt-0 md:pl-6 md:border-l border-slate-100">
                                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                                            <Lock size={12} className="text-slate-400" />
                                            <input 
                                                type="text"
                                                value={api.user_id}
                                                onChange={e => updateAPI(api.id, { user_id: e.target.value })}
                                                placeholder="User/Client ID"
                                                className="bg-transparent border-none outline-none text-[11px] font-mono text-slate-600 w-full"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                                            <Zap size={12} className="text-slate-400" />
                                            <input 
                                                type="password"
                                                value={api.api_key}
                                                onChange={e => updateAPI(api.id, { api_key: e.target.value })}
                                                placeholder="API Key/Secret"
                                                className="bg-transparent border-none outline-none text-[11px] font-mono text-slate-600 w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {config.apis.length === 0 && (
                        <div className="p-12 text-center bg-slate-50 border border-slate-200 border-dashed rounded-3xl">
                            <Cpu size={32} className="mx-auto text-slate-300 mb-3" />
                            <h3 className="text-sm font-bold text-slate-500">Zero Active Nodes</h3>
                            <button onClick={addAPI} className="text-indigo-600 text-xs font-bold mt-2">Initialize Cluster</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
