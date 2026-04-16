"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
    Plus, Search, Trash2, Edit2, Upload, X, Check, Loader2, Sparkles, 
    Info, ArrowLeft, Image as ImageIcon, Eye, EyeOff, Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Feature {
    id: string;
    title: string;
    title_hi?: string;
    description: string;
    description_hi?: string;
    image_url: string;
    is_active: boolean;
    display_order: number;
    created_at: string;
}

export default function FeaturesManagementPage() {
    const supabase = createClient();
    const [features, setFeatures] = useState<Feature[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFeature, setEditingFeature] = useState<Feature | null>(null);

    // Form states
    const [form, setForm] = useState({
        title: '',
        title_hi: '',
        description: '',
        description_hi: '',
        image_url: '',
        is_active: true,
        display_order: 0,
        imageFile: null as File | null
    });

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('home_features')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setFeatures(data || []);
        } catch (err) {
            console.error('Error fetching features:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (file: File) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `features/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('pujas') // Reusing the 'pujas' bucket for simplicity if it exists, or common bucket
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('pujas')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let finalImageUrl = form.image_url;
            if (form.imageFile) {
                finalImageUrl = await handleFileUpload(form.imageFile);
            }

            if (!finalImageUrl) {
                alert('Please upload an image first');
                setIsSaving(false);
                return;
            }

            const featureData = {
                title: form.title,
                title_hi: form.title_hi,
                description: form.description,
                description_hi: form.description_hi,
                image_url: finalImageUrl,
                is_active: form.is_active,
                display_order: form.display_order
            };

            let error;
            if (editingFeature) {
                const { error: err } = await supabase
                    .from('home_features')
                    .update(featureData)
                    .eq('id', editingFeature.id);
                error = err;
            } else {
                const { error: err } = await supabase
                    .from('home_features')
                    .insert([featureData]);
                error = err;
            }

            if (error) throw error;

            setIsModalOpen(false);
            fetchFeatures();
            resetForm();
        } catch (error: any) {
            alert('Error saving feature: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this feature?')) return;
        try {
            const { error } = await supabase.from('home_features').delete().eq('id', id);
            if (error) throw error;
            fetchFeatures();
        } catch (error: any) {
            alert('Error deleting feature: ' + error.message);
        }
    };

    const resetForm = () => {
        setForm({
            title: '',
            title_hi: '',
            description: '',
            description_hi: '',
            image_url: '',
            is_active: true,
            display_order: 0,
            imageFile: null
        });
        setEditingFeature(null);
    };

    const openEditModal = (feature: Feature) => {
        setEditingFeature(feature);
        setForm({
            title: feature.title,
            title_hi: feature.title_hi || '',
            description: feature.description,
            description_hi: feature.description_hi || '',
            image_url: feature.image_url,
            is_active: feature.is_active,
            display_order: feature.display_order,
            imageFile: null
        });
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="max-w-6xl mx-auto relative z-10 w-full">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <Link href="/dashboard/website-home" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm font-medium group">
                            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                            Back to Website Home Settings
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-2xl border border-white/10">
                                <Sparkles className="w-8 h-8 text-purple-400" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    Why Choose Us?
                                </h1>
                                <p className="text-gray-400 mt-1 text-sm">Manage the 6 feature cards for the homepage difference section.</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all shadow-xl hover:shadow-white/5 active:scale-95 uppercase text-xs tracking-widest"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Feature
                    </button>
                </header>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-purple-500/50" />
                        <p className="text-gray-500 text-sm font-medium animate-pulse">Loading Features...</p>
                    </div>
                ) : features.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-400">No Features Added Yet</h3>
                        <p className="text-sm text-gray-500 mt-1">Click the button above to add your first "Why Choose Us" card.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <motion.div
                                key={feature.id}
                                layoutId={feature.id}
                                className={`group relative bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/[0.07] transition-all duration-500 ${!feature.is_active ? 'opacity-50 grayscale' : ''}`}
                            >
                                <div className="aspect-square relative overflow-hidden bg-black/40">
                                    <img 
                                        src={feature.image_url} 
                                        alt={feature.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => openEditModal(feature)}
                                            className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(feature.id)}
                                            className="p-2 bg-red-500/10 hover:bg-red-500/20 backdrop-blur-md rounded-xl text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold text-gray-400">
                                            Order: {feature.display_order}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">{feature.title}</h3>
                                    <p className="text-xs text-gray-400 italic mb-3 opacity-60 font-medium tracking-wide">
                                        {feature.title_hi || "No Hindi title"}
                                    </p>
                                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
                        >
                            <form onSubmit={handleSave} className="flex flex-col h-full max-h-[90vh]">
                                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-2xl font-bold">{editingFeature ? 'Edit Feature' : 'Add New Feature'}</h2>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
                                    {/* Image Upload Area */}
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4" /> Feature Image
                                            <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">Ratio 1:1</span>
                                        </label>
                                        <div className="flex gap-6">
                                            <div className="w-32 h-32 rounded-2xl bg-white/5 border border-dashed border-white/20 overflow-hidden flex items-center justify-center relative group shrink-0">
                                                {form.imageFile || form.image_url ? (
                                                    <>
                                                        <img 
                                                            src={form.imageFile ? URL.createObjectURL(form.imageFile) : form.image_url} 
                                                            className="w-full h-full object-cover" 
                                                            alt="Preview" 
                                                        />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <Upload className="w-6 h-6 text-white" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <Upload className="w-8 h-8 text-gray-600" />
                                                )}
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                                                    Upload a square image for the feature card. Preferred size: 800x800px.
                                                </p>
                                                <div className="relative">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Or paste direct image URL..."
                                                        value={form.image_url}
                                                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Title Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Feature Title (English)</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={form.title}
                                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500/50 transition-all font-medium"
                                                placeholder="e.g., Vedic Authenticity"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Title (Hindi)</label>
                                            <input 
                                                type="text"
                                                value={form.title_hi}
                                                onChange={(e) => setForm({ ...form, title_hi: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500/50 transition-all font-medium"
                                                placeholder="उदा. वैदिक प्रमाणिकता"
                                            />
                                        </div>
                                    </div>

                                    {/* Description Fields */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Description (English)</label>
                                            <textarea 
                                                required
                                                value={form.description}
                                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                                rows={3}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500/50 transition-all resize-none leading-relaxed"
                                                placeholder="Describe the benefit..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Description (Hindi)</label>
                                            <textarea 
                                                value={form.description_hi}
                                                onChange={(e) => setForm({ ...form, description_hi: e.target.value })}
                                                rows={3}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-purple-500/50 transition-all resize-none leading-relaxed"
                                                placeholder="विवरण हिंदी में..."
                                            />
                                        </div>
                                    </div>

                                    {/* Display Settings */}
                                    <div className="flex items-center justify-between p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                                        <div className="flex items-center gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Order</label>
                                                <input 
                                                    type="number" 
                                                    value={form.display_order}
                                                    onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) })}
                                                    className="w-20 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
                                                />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setForm({ ...form, is_active: !form.is_active })}
                                                    className={`w-12 h-6 rounded-full relative transition-colors ${form.is_active ? 'bg-purple-500' : 'bg-gray-700'}`}
                                                >
                                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${form.is_active ? 'left-7' : 'left-1'}`} />
                                                </button>
                                                <span className="text-xs font-bold text-gray-400">Section Active</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-black/40 border-t border-white/5 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-[2] px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all shadow-xl disabled:opacity-50 uppercase text-xs tracking-widest"
                                    >
                                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (editingFeature ? 'Update Feature' : 'Create Feature')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
