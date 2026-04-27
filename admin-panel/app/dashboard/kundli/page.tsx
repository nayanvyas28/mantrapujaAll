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
    Network,
    Search,
    User,
    Eye,
    FileText,
    History,
    FilePieChart,
    Star,
    Calendar,
    Clock,
    MapPin,
    Grid3X3,
    Activity,
    Zap as ZapIcon
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
    const [activeTab, setActiveTab] = useState<'cluster' | 'profiles' | 'viewer'>('cluster');
    
    // 📂 Saved Profiles & Viewer State
    const [savedKundalis, setSavedKundalis] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKundali, setSelectedKundali] = useState<any>(null);
    const [viewerData, setViewerData] = useState<any>(null);
    const [isViewerLoading, setIsViewerLoading] = useState(false);
    const [activeViewerTab, setActiveViewerTab] = useState('dashboard');

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

    const fetchSavedProfiles = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('user_kundalis')
                .select(`
                    *,
                    user_id
                `)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setSavedKundalis(data || []);
        } catch (err) {
            console.error('Fetch Profiles Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchViewerData = async (k: any) => {
        setIsViewerLoading(true);
        setViewerData(null);
        setSelectedKundali(k);
        setActiveTab('viewer');
        try {
            const datetime = `${k.date_of_birth}T${k.time_of_birth}:00+05:30`;
            const res = await fetch('/api/vedaluna', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ params: { datetime, coordinates: `${k.lat},${k.lon}`, name: k.full_name, language: 'en' } })
            });
            const result = await res.json();
            if (result.data) setViewerData(result.data);
        } catch (err) {
            console.error('Viewer Fetch Error:', err);
        } finally {
            setIsViewerLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'profiles') fetchSavedProfiles();
    }, [activeTab]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-saffron" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-saffron/5 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="max-w-[1400px] mx-auto relative z-10 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div className="flex items-center gap-6">
                        <Link
                            href="/dashboard"
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight uppercase">Veda Intelligence</h1>
                            <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mt-1">Celestial Data & API Infrastructure</p>
                        </div>
                    </div>

                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                        {[
                            { id: 'cluster', l: 'Node Cluster', i: Cpu },
                            { id: 'profiles', l: 'Saved Profiles', i: History },
                            { id: 'viewer', l: 'Data Viewer', i: Eye },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-saffron text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                            >
                                <tab.i size={16} /> {tab.l}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === 'cluster' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {message && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-xl flex items-center gap-3 ${
                                    message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                }`}
                            >
                                {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                                <span className="text-sm font-medium">{message.text}</span>
                            </motion.div>
                        )}
                        
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                                                {['round-robin', 'priority', 'random'].map(algo => (
                                                    <button key={algo} onClick={() => setConfig({ ...config, load_balance_strategy: algo as any })} className={`p-4 rounded-2xl text-left border transition-all ${config.load_balance_strategy === algo ? 'bg-saffron/10 border-saffron/50 text-white' : 'bg-black/20 border-white/5 text-gray-500'}`}>
                                                        <p className="text-sm font-bold uppercase tracking-tight">{algo.replace('-', ' ')}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button onClick={() => saveConfig()} disabled={isSaving} className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50">
                                            {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                                            SYNCHRONIZE CLUSTER
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-8 space-y-6">
                                <button onClick={addAPI} disabled={config.apis.length >= 10} className="w-full py-10 border-2 border-dashed border-white/5 rounded-[32px] flex flex-col items-center justify-center gap-3 text-gray-500 hover:border-saffron/30 hover:text-saffron transition-all group">
                                    <Plus size={32} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-black uppercase tracking-widest">Attach New Astro Engine</span>
                                </button>
                                {config.apis.map((api, index) => (
                                    <div key={api.id} className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-6 relative group">
                                         <div className="absolute top-6 right-6 flex gap-2">
                                            <button onClick={() => updateAPI(api.id, { is_enabled: !api.is_enabled })} className={`p-2 rounded-lg transition-all ${api.is_enabled ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                                                {api.is_enabled ? <ZapIcon size={16} /> : <ZapIcon className="opacity-20" size={16} />}
                                            </button>
                                            <button onClick={() => removeAPI(api.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
                                                <Trash2 size={16} />
                                            </button>
                                         </div>
                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <input className="bg-transparent border-none text-2xl font-black outline-none focus:text-saffron w-full" value={api.name} onChange={e => updateAPI(api.id, { name: e.target.value })} />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <select value={api.provider} onChange={e => updateAPI(api.id, { provider: e.target.value as any })} className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-black uppercase">
                                                        <option value="astrologyapi">AstrologyAPI</option>
                                                        <option value="prokerala">Prokerala</option>
                                                    </select>
                                                    <input type="number" value={api.priority} onChange={e => updateAPI(api.id, { priority: parseInt(e.target.value) || 1 })} className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-bold" />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <input value={api.user_id} onChange={e => updateAPI(api.id, { user_id: e.target.value })} placeholder="User ID" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-mono" />
                                                <input type="password" value={api.api_key} onChange={e => updateAPI(api.id, { api_key: e.target.value })} placeholder="API Key" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-mono" />
                                            </div>
                                         </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'profiles' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Saved Astrological Profiles</h2>
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search by name..." 
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-saffron transition-all"
                                />
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                    <tr>
                                        <th className="p-8">Entity Name</th>
                                        <th className="p-8">Birth Data</th>
                                        <th className="p-8">Location</th>
                                        <th className="p-8">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {savedKundalis.filter(k => k.full_name.toLowerCase().includes(searchTerm.toLowerCase())).map(k => (
                                        <tr key={k.id} className="group hover:bg-white/[0.01] transition-all">
                                            <td className="p-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center text-saffron font-black text-xl">
                                                        {k.full_name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-lg">{k.full_name}</p>
                                                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{k.gender || 'Not specified'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-bold">{new Date(k.date_of_birth).toLocaleDateString()}</p>
                                                    <p className="text-xs text-gray-400 font-mono italic">{k.time_of_birth}</p>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <MapPin size={14} />
                                                    <span className="text-sm font-medium">{k.place_of_birth.split(',')[0]}</span>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <button 
                                                    onClick={() => fetchViewerData(k)}
                                                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-saffron rounded-xl text-[10px] font-black uppercase tracking-widest transition-all group-hover:bg-saffron hover:text-white"
                                                >
                                                    <Eye size={14} /> View Report
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {savedKundalis.length === 0 && (
                                <div className="p-20 text-center opacity-40 italic">No saved profiles found in the cosmic repository.</div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'viewer' && (
                    <div className="space-y-10 animate-in zoom-in-95 duration-500">
                        {selectedKundali ? (
                            <div className="space-y-12">
                                {/* Profile Banner */}
                                <div className="bg-gradient-to-r from-saffron/20 to-transparent border border-saffron/20 rounded-[40px] p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                    <div className="flex items-center gap-8">
                                        <div className="w-20 h-20 rounded-3xl bg-saffron flex items-center justify-center text-white text-4xl font-black">
                                            {selectedKundali.full_name.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-black uppercase tracking-tighter">{selectedKundali.full_name}</h2>
                                            <div className="flex items-center gap-4 text-gray-400 text-sm font-bold uppercase tracking-widest mt-2">
                                                <Calendar size={14} /> {selectedKundali.date_of_birth}
                                                <span className="opacity-20">|</span>
                                                <Clock size={14} /> {selectedKundali.time_of_birth}
                                                <span className="opacity-20">|</span>
                                                <MapPin size={14} /> {selectedKundali.place_of_birth}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setActiveTab('profiles')} className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all">
                                        Select Different Profile
                                    </button>
                                </div>

                                {isViewerLoading ? (
                                    <div className="py-40 flex flex-col items-center justify-center gap-6">
                                        <Loader2 className="w-16 h-16 animate-spin text-saffron" />
                                        <p className="text-sm font-black text-gray-500 uppercase tracking-widest animate-pulse">Consulting Cosmic Sources...</p>
                                    </div>
                                ) : viewerData ? (
                                    <div className="space-y-12">
                                        {/* Viewer Tabs */}
                                        <div className="flex flex-wrap gap-4 bg-white/5 p-2 rounded-[32px] border border-white/10">
                                            {[
                                                { id: 'dashboard', l: 'Dashboard', i: LayoutDashboard },
                                                { id: 'charts', l: 'Charts', i: Grid3X3 },
                                                { id: 'predictions', l: 'Predictions', i: FilePieChart },
                                                { id: 'dasha', l: 'Dasha & Dosh', i: History },
                                            ].map(vTab => (
                                                <button
                                                    key={vTab.id}
                                                    onClick={() => setActiveViewerTab(vTab.id)}
                                                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeViewerTab === vTab.id ? 'bg-saffron text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                                                >
                                                    <vTab.i size={14} /> {vTab.l}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Viewer Body */}
                                        <div className="bg-white/5 border border-white/10 rounded-[48px] p-12 min-h-[500px]">
                                            {activeViewerTab === 'dashboard' && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in slide-in-from-bottom-5 duration-700">
                                                    {[
                                                        { l: 'Rashi', v: viewerData.core?.sign || '-', c: 'border-saffron/30' },
                                                        { l: 'Nakshatra', v: viewerData.core?.Naksahtra || '-', c: 'border-blue-500/30' },
                                                        { l: 'Ascendant', v: viewerData.core?.ascendant || '-', c: 'border-emerald-500/30' },
                                                        { l: 'Tithi', v: viewerData.panchang?.tithi || '-', c: 'border-purple-500/30' }
                                                    ].map((item, i) => (
                                                        <div key={i} className={`p-10 rounded-[32px] border bg-black/40 ${item.c} text-center space-y-4`}>
                                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{item.l}</p>
                                                            <p className="text-3xl font-black text-white">{item.v}</p>
                                                        </div>
                                                    ))}
                                                    <div className="md:col-span-2 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
                                                         {[
                                                            { l: 'Varna', v: viewerData.core?.Varna || '-' },
                                                            { l: 'Yoni', v: viewerData.core?.Yoni || '-' },
                                                            { l: 'Gan', v: viewerData.core?.Gan || '-' },
                                                            { l: 'Nadi', v: viewerData.core?.Nadi || '-' },
                                                            { l: 'Destiny No', v: viewerData.numero_table?.destiny_number || '-' },
                                                            { l: 'Radical No', v: viewerData.numero_table?.radical_number || '-' },
                                                            { l: 'Manglik', v: viewerData.manglik?.manglik_status || 'Checking...' },
                                                            { l: 'Sadesati', v: viewerData.sadhesati?.is_sadhesati ? 'ACTIVE' : 'NO' }
                                                         ].map((x, i) => (
                                                             <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                                                                <p className="text-[9px] font-black text-gray-500 uppercase mb-2">{x.l}</p>
                                                                <p className="text-base font-bold text-gray-100">{x.v}</p>
                                                             </div>
                                                         ))}
                                                    </div>
                                                </div>
                                            )}

                                            {activeViewerTab === 'charts' && (
                                                <div className="flex flex-col items-center gap-10 py-10 animate-in zoom-in-95 duration-500">
                                                    <div className="bg-white p-10 rounded-[32px] shadow-2xl invert dark:invert-0 h-full w-full max-w-2xl flex items-center justify-center">
                                                        {viewerData.chart ? (
                                                            <div dangerouslySetInnerHTML={{ __html: viewerData.chart }} className="w-full [&>svg]:w-full [&>svg]:h-auto" />
                                                        ) : (
                                                            <div className="p-20 text-black font-black uppercase tracking-widest opacity-20">NO CHART DATA</div>
                                                        )}
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                                        {viewerData.planets?.map((p: any, i: number) => (
                                                            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                                                <p className="text-[9px] font-black text-saffron uppercase mb-1">{p.name || p.planet}</p>
                                                                <p className="text-sm font-bold">{p.fullDegree?.toFixed(2)}° in {p.sign}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {activeViewerTab === 'predictions' && (
                                                <div className="space-y-10 animate-in fade-in duration-1000">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        {[
                                                            { l: 'Characteristic', v: viewerData.character?.report || viewerData.character?.prediction },
                                                            { l: 'Career Report', v: viewerData.career?.report || viewerData.career?.prediction },
                                                            { l: 'Love Report', v: viewerData.love?.report || viewerData.love?.prediction },
                                                            { l: 'Health Report', v: viewerData.health?.report || viewerData.health?.prediction }
                                                        ].map((p, i) => (
                                                            <div key={i} className="bg-black/20 p-10 rounded-[32px] border border-white/5 space-y-6">
                                                                <h4 className="text-xl font-black text-saffron uppercase tracking-tight">{p.l}</h4>
                                                                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap line-clamp-6 hover:line-clamp-none transition-all cursor-zoom-in">
                                                                    {Array.isArray(p.v) ? p.v.join('\n') : (p.v || 'Synthesis pending...')}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {activeViewerTab === 'dasha' && (
                                                <div className="space-y-10 animate-in slide-in-from-right-10 duration-700">
                                                    <div className="bg-black/40 p-10 rounded-[32px] border border-white/5">
                                                        <h4 className="text-2xl font-black text-saffron mb-8 tracking-tighter uppercase">Current Vimshottari Phase</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                            {[
                                                                { l: 'Mahadasha', d: viewerData.current_dasha?.mahadasha },
                                                                { l: 'Antardasha', d: viewerData.current_dasha?.antardasha },
                                                                { l: 'Pratyantar', d: viewerData.current_dasha?.pratyantardasha }
                                                            ].map((x, i) => (
                                                                <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
                                                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{x.l}</p>
                                                                    <p className="text-3xl font-black text-white">{x.d?.planet || '-'}</p>
                                                                    <p className="text-[10px] text-gray-600 font-mono">{x.d?.start} to {x.d?.end}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-40 text-center opacity-40">Failed to synthesize cosmic data. Check API nodes.</div>
                                )}
                            </div>
                        ) : (
                            <div className="py-40 text-center bg-white/5 border border-white/10 border-dashed rounded-[48px]">
                                <History className="mx-auto text-gray-700 mb-6" size={64} />
                                <h3 className="text-2xl font-black text-gray-500">Awaiting Signal Access</h3>
                                <p className="text-gray-600 mt-2">Select a saved profile from the Manager tab to begin intelligence analysis.</p>
                                <button onClick={() => setActiveTab('profiles')} className="mt-8 px-8 py-4 bg-saffron text-white rounded-2xl font-black uppercase tracking-widest text-xs">Browse Profiles</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                select {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 1rem center;
                    background-size: 1.5em;
                }
            ` }} />
        </div>
    );
}
