'use client';

import React, { useState, useEffect } from 'react';
import { 
    Plus, 
    Search, 
    Calendar as CalendarIcon, 
    Edit2, 
    Trash2, 
    ChevronRight, 
    Globe, 
    Image as ImageIcon,
    Loader2,
    X,
    Save,
    Layout
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

export default function FestivalsPage() {
    const [festivals, setFestivals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFestival, setEditingFestival] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    const supabase = createClient();

    const fetchFestivals = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('festivals')
            .select('*')
            .order('date', { ascending: true });

        if (!error && data) setFestivals(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchFestivals();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this festival?')) return;
        
        const { error } = await supabase
            .from('festivals')
            .delete()
            .eq('id', id);

        if (!error) fetchFestivals();
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        const formData = new FormData(e.target as HTMLFormElement);
        const festivalData = {
            name: formData.get('name'),
            slug: formData.get('slug'),
            date: formData.get('date'),
            short_desc: formData.get('short_desc'),
            description: formData.get('description'),
            hero_image: formData.get('hero_image'),
            hero_image_alt: formData.get('hero_image_alt'),
            // Keep JSON fields as they are or initialize them
            significance: editingFestival?.significance || { mythology: '', cultural: '', spiritual: '' },
            rituals: editingFestival?.rituals || [],
            regional_variations: editingFestival?.regional_variations || {},
            faqs: editingFestival?.faqs || [],
            gallery: editingFestival?.gallery || []
        };

        let error;
        if (editingFestival?.id) {
            const { error: updateError } = await supabase
                .from('festivals')
                .update(festivalData)
                .eq('id', editingFestival.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('festivals')
                .insert([festivalData]);
            error = insertError;
        }

        setIsSaving(false);
        if (!error) {
            setIsModalOpen(false);
            fetchFestivals();
        } else {
            alert('Error saving festival: ' + error.message);
        }
    };

    const filteredFestivals = festivals.filter(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 md:p-10 space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2 font-serif tracking-tight">Divine Festivals</h1>
                    <p className="text-gray-400 text-sm">Manage spiritual celebrations and event details</p>
                </div>
                <button 
                    onClick={() => {
                        setEditingFestival(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-bold shadow-lg shadow-orange-600/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus size={20} />
                    Add New Festival
                </button>
            </div>

            {/* Stats / Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Festivals</p>
                    <p className="text-3xl font-black text-white">{festivals.length}</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Upcoming This Month</p>
                    <p className="text-3xl font-black text-orange-500">
                        {festivals.filter(f => {
                            const d = new Date(f.date);
                            return d.getMonth() === new Date().getMonth();
                        }).length}
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Search Festivals</p>
                    <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input 
                            type="text"
                            placeholder="Filter by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-orange-500 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Main List */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden">
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <Loader2 className="animate-spin text-orange-500" size={40} />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Festival</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Slug</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFestivals.map((festival) => (
                                    <tr key={festival.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center overflow-hidden">
                                                    {festival.hero_image ? (
                                                        <img src={festival.hero_image} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <ImageIcon className="text-orange-500" size={20} />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-sm">{festival.name}</p>
                                                    <p className="text-gray-500 text-[10px] line-clamp-1 max-w-[200px]">{festival.short_desc}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                                                <CalendarIcon size={14} className="text-orange-500" />
                                                {new Date(festival.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-xs font-mono">
                                            /{festival.slug}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-tighter border border-emerald-500/20">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => {
                                                        setEditingFestival(festival);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(festival.id)}
                                                    className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal for Add/Edit */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
                        >
                            <form onSubmit={handleSave} className="flex flex-col max-h-[90vh]">
                                {/* Modal Header */}
                                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-white font-serif">
                                        {editingFestival ? 'Edit Festival' : 'New Festival'}
                                    </h2>
                                    <button 
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                    >
                                        <X size={24} className="text-gray-400" />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="p-8 overflow-y-auto space-y-6 custom-scrollbar">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Festival Name</label>
                                            <input 
                                                name="name"
                                                defaultValue={editingFestival?.name}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-orange-500 transition-colors"
                                                placeholder="e.g. Diwali"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">URL Slug</label>
                                            <input 
                                                name="slug"
                                                defaultValue={editingFestival?.slug}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-orange-500 transition-colors"
                                                placeholder="e.g. diwali"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Festival Date</label>
                                        <input 
                                            name="date"
                                            type="date"
                                            defaultValue={editingFestival?.date ? new Date(editingFestival.date).toISOString().split('T')[0] : ''}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-orange-500 transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Short Description</label>
                                        <textarea 
                                            name="short_desc"
                                            defaultValue={editingFestival?.short_desc}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-orange-500 transition-colors h-24 resize-none"
                                            placeholder="Catchy one-liner for cards..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Main Description</label>
                                        <textarea 
                                            name="description"
                                            defaultValue={editingFestival?.description}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-orange-500 transition-colors h-32 resize-none"
                                            placeholder="Detailed festival story..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Hero Image URL</label>
                                            <input 
                                                name="hero_image"
                                                defaultValue={editingFestival?.hero_image}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-orange-500 transition-colors"
                                                placeholder="/images/hero.jpg"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Alt Text</label>
                                            <input 
                                                name="hero_image_alt"
                                                defaultValue={editingFestival?.hero_image_alt}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-orange-500 transition-colors"
                                                placeholder="Descriptive text"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-end gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3 text-gray-400 hover:text-white transition-colors text-sm font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-xl font-black text-sm hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50"
                                    >
                                        {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                        {editingFestival ? 'Update Festival' : 'Create Festival'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
