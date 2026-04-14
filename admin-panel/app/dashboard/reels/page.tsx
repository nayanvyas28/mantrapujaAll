'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Search, Trash2, Edit2, X, Check, Loader2, Sparkles, Video, Globe, ArrowLeft, Play, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Reel {
    id: string;
    title: string;
    title_hi?: string;
    video_url: string;
    thumbnail_url?: string;
    category?: string;
    order_index: number;
    is_active: boolean;
    created_at: string;
}

export default function ReelsManagementPage() {
    const supabase = createClient();
    const [reels, setReels] = useState<Reel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReel, setEditingReel] = useState<Reel | null>(null);

    // Form
    const [form, setForm] = useState({
        title: '',
        title_hi: '',
        video_url: '',
        thumbnail_url: '',
        category: 'Spiritual',
        order_index: 0,
        is_active: true
    });

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchReels();
    }, []);

    async function fetchReels() {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('reels')
                .select('*')
                .order('order_index', { ascending: false });

            if (error) throw error;
            setReels(data || []);
        } catch (error) {
            console.error('Error fetching reels:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const reelData = {
                ...form,
            };

            if (editingReel) {
                const { error } = await supabase.from('reels').update(reelData).eq('id', editingReel.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('reels').insert(reelData);
                if (error) throw error;
            }

            setIsModalOpen(false);
            setEditingReel(null);
            resetForm();
            fetchReels();
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const resetForm = () => {
        setForm({
            title: '',
            title_hi: '',
            video_url: '',
            thumbnail_url: '',
            category: 'Spiritual',
            order_index: 0,
            is_active: true
        });
    };

    const handleEdit = (reel: Reel) => {
        setEditingReel(reel);
        setForm({
            title: reel.title,
            title_hi: reel.title_hi || '',
            video_url: reel.video_url,
            thumbnail_url: reel.thumbnail_url || '',
            category: reel.category || 'Spiritual',
            order_index: reel.order_index,
            is_active: reel.is_active
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this Reel?')) return;
        const { error } = await supabase.from('reels').delete().eq('id', id);
        if (error) alert(error.message);
        else fetchReels();
    };

    const toggleStatus = async (reel: Reel) => {
        const { error } = await supabase.from('reels').update({ is_active: !reel.is_active }).eq('id', reel.id);
        if (error) alert(error.message);
        else fetchReels();
    };

    const filteredReels = reels.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 shadow-lg shadow-blue-500/5">
                                <Video className="w-6 h-6 text-blue-400" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                Divine Feed Management
                            </h1>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                            Manage your vertical video reels. These will appear in the center "Feed" tab of the mobile app. Support for direct MP4 links, YouTube Shorts, and Instagram Reels.
                        </p>
                    </div>

                    <button
                        onClick={() => { resetForm(); setEditingReel(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl font-black transition-all shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] uppercase text-xs tracking-widest group"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        Add New Reel
                    </button>
                </header>

                <div className="mb-10 max-w-md relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                    />
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-500/50" />
                        <p className="text-gray-500 text-sm font-medium animate-pulse">Loading Divine Content...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredReels.map(reel => (
                            <motion.div
                                key={reel.id}
                                layout
                                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all shadow-xl"
                            >
                                <div className="aspect-[9/16] bg-gray-900 relative overflow-hidden">
                                    {reel.thumbnail_url ? (
                                        <img src={reel.thumbnail_url} alt={reel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                            <Play className="w-12 h-12 text-gray-700 mb-2" />
                                            <span className="text-[10px] text-gray-600 uppercase font-black">Video Reel</span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                                    
                                    <div className="absolute top-4 left-4">
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${reel.is_active ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                            {reel.is_active ? 'Active' : 'Inactive'}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-white font-bold leading-tight line-clamp-2 mb-1">{reel.title}</h3>
                                        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">{reel.category}</p>
                                    </div>

                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                                        <button onClick={() => handleEdit(reel)} className="p-3 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all">
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(reel.id)} className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl hover:bg-red-500/20 transition-all">
                                            <Trash2 className="w-5 h-5 text-red-400" />
                                        </button>
                                        <a href={reel.video_url} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl hover:bg-blue-500/20 transition-all">
                                            <ExternalLink className="w-5 h-5 text-blue-400" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Reel Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
                        >
                            <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {editingReel ? 'Edit Reel' : 'Add New Divine Feed'}
                                    </h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Configure your vertical video content</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-8 space-y-6 overflow-y-auto">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Title (English)</label>
                                    <input
                                        type="text" required
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="Enter reel title"
                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest pl-1">Title (Hindi)</label>
                                    <input
                                        type="text"
                                        value={form.title_hi}
                                        onChange={(e) => setForm({ ...form, title_hi: e.target.value })}
                                        placeholder="शीर्षक दर्ज करें"
                                        className="w-full px-6 py-4 bg-white/[0.03] border border-blue-500/20 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Video URL (MP4 / YT Shorts / Insta)</label>
                                    <input
                                        type="text" required
                                        value={form.video_url}
                                        onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all font-mono text-xs"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Thumbnail URL (Optional)</label>
                                    <input
                                        type="text"
                                        value={form.thumbnail_url}
                                        onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all font-mono text-xs"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Category</label>
                                        <select
                                            value={form.category}
                                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                                            className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="Spiritual" className="bg-[#111]">Spiritual</option>
                                            <option value="Aarti" className="bg-[#111]">Aarti</option>
                                            <option value="Mantra" className="bg-[#111]">Mantra</option>
                                            <option value="Temple" className="bg-[#111]">Temple</option>
                                            <option value="Other" className="bg-[#111]">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Order Index</label>
                                        <input
                                            type="number"
                                            value={form.order_index}
                                            onChange={(e) => setForm({ ...form, order_index: parseInt(e.target.value) || 0 })}
                                            className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 py-4 px-6 bg-white/5 rounded-2xl border border-white/10">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={form.is_active}
                                        onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                                        className="w-5 h-5 rounded border-white/20 bg-transparent text-blue-500 focus:ring-blue-500/50"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-bold text-gray-300">Active and visible in mobile app</label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                                >
                                    {isSaving ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Confirm & Save Reel'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
