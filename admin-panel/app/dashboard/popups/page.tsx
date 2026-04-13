'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
    Plus, Trash2, Edit2, X, Check, Loader2,
    ImageIcon, ArrowLeft, Smartphone, Globe,
    Calendar, Clock, Layout, MapPin, Sparkles, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface MarketingPopup {
    id: string;
    name: string;
    image_mobile: string;
    image_web: string;
    redirect_type: 'internal' | 'external' | 'none';
    redirect_value: string;
    location_id: string | null;
    is_active: boolean;
    start_date: string;
    end_date: string;
    display_delay_ms: number;
    frequency: 'once' | 'session' | 'always';
    show_on_app: boolean;
    show_on_web: boolean;
    created_at: string;
}

export default function PopupManagementPage() {
    const supabase = createClient();
    const [popups, setPopups] = useState<MarketingPopup[]>([]);
    const [locations, setLocations] = useState<{ id: string, name: string }[]>([]);
    const [pujas, setPujas] = useState<{ id: string, name: string, slug: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPopup, setEditingPopup] = useState<MarketingPopup | null>(null);

    const [form, setForm] = useState({
        name: '',
        image_mobile: '',
        image_web: '',
        redirect_type: 'none' as 'internal' | 'external' | 'none',
        redirect_value: '',
        location_id: '' as string,
        is_active: true,
        start_date: new Date().toISOString().slice(0, 16),
        end_date: '',
        display_delay_ms: 2000,
        frequency: 'once' as 'once' | 'session' | 'always',
        show_on_app: true,
        show_on_web: true,
        mobileImageFile: null as File | null,
        webImageFile: null as File | null,
    });

    useEffect(() => {
        fetchPopups();
        fetchLocations();
        fetchPujas();
    }, []);

    const fetchLocations = async () => {
        const { data } = await supabase.from('locations').select('id, name').order('name');
        setLocations(data || []);
    };

    const fetchPujas = async () => {
        const { data } = await supabase.from('poojas').select('id, name, slug').eq('is_active', true).order('name');
        setPujas(data || []);
    };

    const fetchPopups = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('marketing_popups')
                .select('*')
                .order('created_at', { ascending: false });

            if (error && error.code !== '42P01') throw error;
            setPopups(data || []);
        } catch (error) {
            console.error('Error fetching popups:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (file: File, type: 'mobile' | 'web') => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${type}_popup_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `marketing/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('music_assets')
            .upload(filePath, file);

        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('music_assets').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            let mobileUrl = form.image_mobile;
            let webUrl = form.image_web;

            if (form.mobileImageFile) mobileUrl = await handleFileUpload(form.mobileImageFile, 'mobile');
            if (form.webImageFile) webUrl = await handleFileUpload(form.webImageFile, 'web');

            const popupData: any = {
                name: form.name,
                image_mobile: mobileUrl,
                image_web: webUrl,
                redirect_type: form.redirect_type,
                redirect_value: form.redirect_value,
                location_id: form.location_id || null,
                is_active: form.is_active,
                start_date: form.start_date,
                end_date: form.end_date || null,
                display_delay_ms: form.display_delay_ms,
                frequency: form.frequency,
                show_on_app: form.show_on_app,
                show_on_web: form.show_on_web,
            };

            let error;
            if (editingPopup) {
                const { error: err } = await supabase.from('marketing_popups').update(popupData).eq('id', editingPopup.id);
                error = err;
            } else {
                const { error: err } = await supabase.from('marketing_popups').insert([popupData]);
                error = err;
            }

            if (error) throw error;
            setIsModalOpen(false);
            fetchPopups();
        } catch (error: any) {
            alert('Error saving popup: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this campaign?')) return;
        try {
            const { error } = await supabase.from('marketing_popups').delete().eq('id', id);
            if (error) throw error;
            fetchPopups();
        } catch (error: any) {
            alert('Error deleting: ' + error.message);
        }
    };

    const openCreateModal = () => {
        setEditingPopup(null);
        setForm({
            name: '',
            image_mobile: '',
            image_web: '',
            redirect_type: 'none',
            redirect_value: '',
            location_id: '',
            is_active: true,
            start_date: new Date().toISOString().slice(0, 16),
            end_date: '',
            display_delay_ms: 2000,
            frequency: 'once',
            show_on_app: true,
            show_on_web: true,
            mobileImageFile: null,
            webImageFile: null,
        });
        setIsModalOpen(true);
    };

    const openEditModal = (popup: MarketingPopup) => {
        setEditingPopup(popup);
        setForm({
            name: popup.name,
            image_mobile: popup.image_mobile,
            image_web: popup.image_web,
            redirect_type: popup.redirect_type,
            redirect_value: popup.redirect_value,
            location_id: popup.location_id || '',
            is_active: popup.is_active,
            start_date: new Date(popup.start_date).toISOString().slice(0, 16),
            end_date: popup.end_date ? new Date(popup.end_date).toISOString().slice(0, 16) : '',
            display_delay_ms: popup.display_delay_ms,
            frequency: popup.frequency,
            show_on_app: popup.show_on_app,
            show_on_web: popup.show_on_web,
            mobileImageFile: null,
            webImageFile: null,
        });
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-hidden">
            {/* Background Decorations */}
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm font-medium group">
                            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 rounded-2xl border border-white/10 shadow-lg">
                                <Sparkles className="w-8 h-8 text-orange-400" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Marketing Popups</h1>
                                <p className="text-gray-400 text-sm max-w-xl">
                                    Manage global popup campaigns for App & Web. Drive engagement with smart scheduling and location-based targeting.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl shadow-white/5 active:scale-95"
                    >
                        <Plus size={20} />
                        Launch Campaign
                    </button>
                </header>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-gray-500">
                        <Loader2 className="animate-spin mb-4" size={48} />
                        <p className="font-medium">Fetching campaigns...</p>
                    </div>
                ) : popups.length === 0 ? (
                    <div className="text-center py-40 rounded-[2.5rem] bg-white/[0.02] border-2 border-dashed border-white/10">
                        <div className="bg-white/5 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Smartphone className="text-gray-600" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-300">No Campaigns Yet</h3>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto">Click "Launch Campaign" to start showing beautiful popups to your users.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {popups.map((popup) => (
                            <motion.div
                                key={popup.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative bg-white/[0.03] rounded-[2rem] border border-white/10 overflow-hidden hover:border-orange-500/50 transition-all shadow-2xl hover:shadow-orange-500/10"
                            >
                                <div className="relative aspect-[4/3] bg-purple-900/10">
                                    {popup.image_web ? (
                                        <img src={popup.image_web} alt={popup.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700">
                                            <ImageIcon size={64} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border ${popup.is_active ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                                            {popup.is_active ? 'LIVE' : 'PAUSED'}
                                        </div>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a0a] to-transparent p-6">
                                        <h3 className="text-xl font-bold text-white line-clamp-1">{popup.name}</h3>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-500 font-bold uppercase tracking-wider">Scheduled</span>
                                            <span className="text-gray-300">
                                                {new Date(popup.start_date).toLocaleDateString()} - {popup.end_date ? new Date(popup.end_date).toLocaleDateString() : 'Forever'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-500 font-bold uppercase tracking-wider">Platforms</span>
                                            <div className="flex gap-3">
                                                {popup.show_on_app && <Smartphone size={16} className="text-orange-400" />}
                                                {popup.show_on_web && <Globe size={16} className="text-blue-400" />}
                                            </div>
                                        </div>
                                        {popup.location_id && (
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-500 font-bold uppercase tracking-wider">Target</span>
                                                <span className="text-amber-400 font-bold px-2 py-0.5 bg-amber-400/10 rounded-lg">
                                                    {locations.find(l => l.id === popup.location_id)?.name}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => openEditModal(popup)}
                                            className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-2xl transition-all border border-white/10 font-bold text-sm"
                                        >
                                            <Edit2 size={16} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(popup.id)}
                                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Premium Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="bg-[#111] rounded-[3rem] border border-white/10 shadow-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col z-10"
                        >
                            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                                <div>
                                    <h2 className="text-2xl font-black text-white">
                                        {editingPopup ? 'Edit Campaign' : 'Configure Campaign'}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">Set your visuals, targets, and scheduling rules.</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="bg-white/5 p-3 rounded-2xl text-gray-400 hover:text-white border border-white/10 transition-all">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-10 space-y-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <div className="space-y-8">
                                        <section>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Internal Identifier</label>
                                            <input
                                                required
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white font-medium"
                                                placeholder="e.g. Navratri 2024 Celebration"
                                            />
                                        </section>

                                        <section className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Platforms</label>
                                                <div className="flex gap-3 p-1.5 bg-white/[0.03] rounded-2xl border border-white/10">
                                                    <button
                                                        type="button"
                                                        onClick={() => setForm({ ...form, show_on_app: !form.show_on_app })}
                                                        className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl transition-all ${form.show_on_app ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-500 hover:text-gray-300'}`}
                                                    >
                                                        <Smartphone size={20} className="mb-1" />
                                                        <span className="text-[10px] font-black">APP</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setForm({ ...form, show_on_web: !form.show_on_web })}
                                                        className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl transition-all ${form.show_on_web ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-gray-500 hover:text-gray-300'}`}
                                                    >
                                                        <Globe size={20} className="mb-1" />
                                                        <span className="text-[10px] font-black">WEB</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Display Delay (ms)</label>
                                                <div className="relative">
                                                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />
                                                    <input
                                                        type="number"
                                                        step="500"
                                                        min="0"
                                                        value={form.display_delay_ms}
                                                        onChange={(e) => setForm({ ...form, display_delay_ms: parseInt(e.target.value) || 0 })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white font-bold"
                                                        placeholder="2000"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Frequency</label>
                                                <div className="relative">
                                                    <Layout size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                                                    <select
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-orange-500 outline-none appearance-none font-bold text-sm text-white"
                                                        value={form.frequency}
                                                        onChange={(e) => setForm({ ...form, frequency: e.target.value as any })}
                                                    >
                                                        <option className="bg-[#111]" value="once">Total Only Once</option>
                                                        <option className="bg-[#111]" value="session">Once per Session</option>
                                                        <option className="bg-[#111]" value="always">Show Every Time</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </section>

                                        <section>
                                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Redirection</label>
                                            <div className="grid grid-cols-3 gap-3 mb-4">
                                                {['none', 'internal', 'external'].map(type => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        onClick={() => setForm({ ...form, redirect_type: type as any, redirect_value: '' })}
                                                        className={`py-3 px-1 rounded-xl text-[10px] font-black border transition-all uppercase tracking-widest ${form.redirect_type === type ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-gray-500'}`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                            
                                            {form.redirect_type === 'internal' ? (
                                                <select
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-500 outline-none text-white font-bold"
                                                    value={form.redirect_value}
                                                    onChange={(e) => setForm({ ...form, redirect_value: e.target.value })}
                                                >
                                                    <option className="bg-[#111]" value="">Select Internal View</option>
                                                    <optgroup className="bg-[#111]" label="Tab Sections">
                                                        <option value="/index">Home Dashboard</option>
                                                        <option value="/pujas">Pujas Listing</option>
                                                        <option value="/music">Spiritual Music</option>
                                                        <option value="/explore">Tirth Explorer</option>
                                                        <option value="/profile">User Profile</option>
                                                    </optgroup>
                                                    <optgroup className="bg-[#111]" label="Divine Services">
                                                        <option value="/guru-ai">Guru AI (Spiritual Chat)</option>
                                                        <option value="/kundli">Kundli (Astrology)</option>
                                                        <option value="/horoscope">Daily Horoscope</option>
                                                        <option value="/calendar">Hindu Calendar</option>
                                                        <option value="/zodiac">Zodiac Signs</option>
                                                        <option value="/seva">Seva Services</option>
                                                    </optgroup>
                                                    <optgroup className="bg-[#111]" label="Wallet & Rewards">
                                                        <option value="/wallet">Coin Wallet</option>
                                                        <option value="/referral">Refer & Earn</option>
                                                    </optgroup>
                                                    <optgroup className="bg-[#111]" label="Specific Puja Link">
                                                        {pujas.map(p => (
                                                            <option key={p.id} value={`puja:${p.slug}`}>{p.name}</option>
                                                        ))}
                                                    </optgroup>
                                                </select>
                                            ) : form.redirect_type === 'external' ? (
                                                <input
                                                    required
                                                    type="url"
                                                    value={form.redirect_value}
                                                    onChange={(e) => setForm({ ...form, redirect_value: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-white font-medium"
                                                    placeholder="https://yourwebsite.com/sale"
                                                />
                                            ) : null}
                                        </section>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="bg-white/[0.02] p-6 rounded-[2rem] border border-white/5">
                                            <label className="block text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                                <Clock size={16} className="text-orange-500" />
                                                Campaign Scheduling
                                            </label>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-600 uppercase mb-2">Startup</p>
                                                    <input
                                                        type="datetime-local"
                                                        value={form.start_date}
                                                        onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-600 uppercase mb-2">Completion</p>
                                                    <input
                                                        type="datetime-local"
                                                        value={form.end_date}
                                                        onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none text-white"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        id="is_active"
                                                        checked={form.is_active}
                                                        onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                                                        className="w-5 h-5 accent-orange-500 rounded-lg cursor-pointer"
                                                    />
                                                    <label htmlFor="is_active" className="text-sm font-bold text-gray-300">Set Live Immediately</label>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Popup Delay</p>
                                                    <span className="text-xs text-orange-400 font-bold">{form.display_delay_ms}ms</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 text-center">App (Portrait)</label>
                                                <div className={`relative aspect-[3/4] rounded-3xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center p-4 ${form.show_on_app ? 'border-orange-500/30 bg-orange-500/5' : 'border-white/5 bg-transparent opacity-30 grayscale'}`}>
                                                    {(form.mobileImageFile || form.image_mobile) ? (
                                                        <img src={form.mobileImageFile ? URL.createObjectURL(form.mobileImageFile) : form.image_mobile} className="absolute inset-0 w-full h-full object-cover" />
                                                    ) : (
                                                        <Smartphone size={32} className="text-white/20 mb-3" />
                                                    )}
                                                    <input
                                                        disabled={!form.show_on_app}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => setForm({ ...form, mobileImageFile: e.target.files?.[0] || null })}
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 text-center">Web (Standard)</label>
                                                <div className={`relative aspect-[3/4] rounded-3xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center p-4 ${form.show_on_web ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/5 bg-transparent opacity-30 grayscale'}`}>
                                                    {(form.webImageFile || form.image_web) ? (
                                                        <img src={form.webImageFile ? URL.createObjectURL(form.webImageFile) : form.image_web} className="absolute inset-0 w-full h-full object-cover" />
                                                    ) : (
                                                        <Globe size={32} className="text-white/20 mb-3" />
                                                    )}
                                                    <input
                                                        disabled={!form.show_on_web}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => setForm({ ...form, webImageFile: e.target.files?.[0] || null })}
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div className="p-8 border-t border-white/10 flex gap-4 bg-white/[0.03]">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-transparent border border-white/10 text-gray-400 font-bold py-4 rounded-2xl hover:text-white hover:border-white/20 transition-all"
                                >
                                    Discard Changes
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex-[2] bg-white text-black font-black py-4 rounded-2xl shadow-xl shadow-white/5 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            Synchronizing...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={24} />
                                            Save Campaign
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
