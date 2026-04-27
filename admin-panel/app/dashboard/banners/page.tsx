'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
    Plus, Search, Trash2, Edit2, Upload, X, Check, Loader2, Star, 
    Tag, Info, ArrowLeft, Image as ImageIcon, ExternalLink, 
    Eye, EyeOff, Layout, Smartphone, Globe, ChevronDown, Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Banner {
    id: string;
    title: string;
    title_hi?: string;
    subtitle?: string;
    subtitle_hi?: string;
    image_url: string;
    route?: string;
    target: 'app' | 'web' | 'both';
    is_active: boolean;
    display_order: number;
    show_offer: boolean;
    show_text_overlay: boolean;
    offer_tag?: string;
    offer_tag_hi?: string;
    created_at: string;
}

export default function BannerManagementPage() {
    const supabase = createClient();
    const [banners, setBanners] = useState<Banner[]>([]);
    const [pujas, setPujas] = useState<{ id: string, name: string, slug: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

    // Form states
    const [form, setForm] = useState({
        title: '',
        title_hi: '',
        subtitle: '',
        subtitle_hi: '',
        image_url: '',
        route: '',
        target: 'both' as 'app' | 'web' | 'both',
        is_active: true,
        display_order: 0,
        imageFile: null as File | null,
        linkType: 'custom' as 'custom' | 'puja',
        selectedPujaSlug: '',
        show_offer: false,
        show_text_overlay: true,
        offer_tag: '',
        offer_tag_hi: ''
    });

    const [isTranslating, setIsTranslating] = useState(false);
    const [aiGenerated, setAiGenerated] = useState({ title_hi: '', subtitle_hi: '', offer_tag_hi: '' });

    useEffect(() => {
        fetchBanners();
        fetchPujas();
    }, []);

    // Real-time Auto-translation
    useEffect(() => {
        const timer = setTimeout(() => {
            performRealtimeTranslation();
        }, 1500);
        return () => clearTimeout(timer);
    }, [form.title, form.subtitle, form.offer_tag]);

    const fetchPujas = async () => {
        try {
            const { data, error } = await supabase
                .from('poojas')
                .select('id, name, slug')
                .eq('is_active', true)
                .order('name');
            if (error) throw error;
            setPujas(data || []);
        } catch (err) {
            console.error('Error fetching pujas:', err);
        }
    };

    const fetchBanners = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/banners');
            if (!res.ok) throw new Error('Failed to load banners');
            const data = await res.json();
            setBanners(data || []);
        } catch (error) {
            console.error('Error fetching banners:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const performRealtimeTranslation = async () => {
        const needsTitle = form.title && (!form.title_hi || form.title_hi === aiGenerated.title_hi);
        const needsSubtitle = form.subtitle && (!form.subtitle_hi || form.subtitle_hi === aiGenerated.subtitle_hi);
        const needsOffer = form.offer_tag && (!form.offer_tag_hi || form.offer_tag_hi === aiGenerated.offer_tag_hi || form.offer_tag_hi === '');

        if (!needsTitle && !needsSubtitle && !needsOffer) return;

        setIsTranslating(true);
        try {
            const payload: Record<string, string> = {};
            if (needsTitle) payload.title_hi = form.title;
            if (needsSubtitle) payload.subtitle_hi = form.subtitle;
            if (needsOffer) payload.offer_tag_hi = form.offer_tag;

            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: payload })
            });
            
            if (!response.ok) throw new Error('Translation failed');

            const results = await response.json();
            if (results) {
                setAiGenerated(prev => ({
                    ...prev,
                    title_hi: results.title_hi || prev.title_hi,
                    subtitle_hi: results.subtitle_hi || prev.subtitle_hi,
                    offer_tag_hi: results.offer_tag_hi || prev.offer_tag_hi
                }));
                setForm(prev => ({
                    ...prev,
                    title_hi: results.title_hi || prev.title_hi,
                    subtitle_hi: results.subtitle_hi || prev.subtitle_hi,
                    offer_tag_hi: results.offer_tag_hi || prev.offer_tag_hi
                }));
            }
        } catch (error) {
            console.error('Translation failed:', error);
        } finally {
            setIsTranslating(false);
        }
    };

    const handleFileUpload = async (file: File) => {
        try {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            if (editingBanner?.image_url) {
                uploadFormData.append('existingUrl', editingBanner.image_url);
            }

            const res = await fetch('/api/banners/upload', {
                method: 'POST',
                body: uploadFormData,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Upload failed');
            }

            const { publicUrl } = await res.json();
            return publicUrl as string;
        } catch (error: any) {
            console.error('[Banners] Upload error:', error);
            throw new Error(`Failed to process image: ${error.message}`);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            let imageUrl = form.image_url;
            if (form.imageFile) {
                imageUrl = await handleFileUpload(form.imageFile);
            }

            if (!imageUrl) throw new Error('Image is required');

            const bannerData = {
                id: editingBanner?.id,
                title: form.title || `Homepage Banner ${new Date().toLocaleDateString()}`,
                title_hi: '',
                subtitle: '',
                subtitle_hi: '',
                image_url: imageUrl,
                route: '/',
                target: 'both',
                is_active: form.is_active,
                display_order: form.display_order,
                show_offer: false,
                show_text_overlay: false,
                offer_tag: '',
                offer_tag_hi: ''
            };

            const res = await fetch('/api/banners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bannerData),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Save failed');
            }

            setIsModalOpen(false);
            fetchBanners();
            resetForm();
        } catch (error: any) {
            console.error('[Banners] Save error:', error);
            alert('Error saving banner: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this banner?')) return;
        try {
            const res = await fetch(`/api/banners?id=${id}`, { method: 'DELETE' });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Delete failed');
            }
            fetchBanners();
        } catch (error: any) {
            console.error('[Banners] Delete error:', error);
            alert('Error deleting banner: ' + error.message);
        }
    };

    const resetForm = () => {
        setForm({
            title: '',
            title_hi: '',
            subtitle: '',
            subtitle_hi: '',
            image_url: '',
            route: '',
            target: 'both',
            is_active: true,
            display_order: 0,
            imageFile: null,
            linkType: 'custom',
            selectedPujaSlug: '',
            show_offer: false,
            show_text_overlay: true,
            offer_tag: '',
            offer_tag_hi: ''
        });
        setEditingBanner(null);
        setAiGenerated({ title_hi: '', subtitle_hi: '', offer_tag_hi: '' });
    };

    const openEditModal = (banner: Banner) => {
        setEditingBanner(banner);
        setForm({
            title: banner.title,
            title_hi: banner.title_hi || '',
            subtitle: banner.subtitle || '',
            subtitle_hi: banner.subtitle_hi || '',
            image_url: banner.image_url,
            route: banner.route || '',
            target: banner.target,
            is_active: banner.is_active,
            display_order: banner.display_order,
            imageFile: null,
            linkType: banner.route?.startsWith('puja:') ? 'puja' : 'custom',
            selectedPujaSlug: banner.route?.startsWith('puja:') ? banner.route.split(':')[1] : '',
            show_offer: banner.show_offer || false,
            show_text_overlay: banner.show_text_overlay !== false,
            offer_tag: banner.offer_tag || '',
            offer_tag_hi: banner.offer_tag_hi || ''
        });
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-6 font-sans relative overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-white/10 pb-6">
                    <div>
                        <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm font-medium group">
                            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 rounded-xl border border-white/10">
                                <ImageIcon className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight mb-1">Home Page Banners</h1>
                                <p className="text-gray-400 text-xs max-w-xl opacity-80">
                                    Manage high-impact sliding banners for the Mobile App and Website.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-500 hover:to-purple-500 rounded-xl font-black transition-all shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] uppercase text-[10px] tracking-widest"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Banner
                    </button>
                </header>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                        <p className="text-gray-500 font-medium animate-pulse">Loading Banners...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {banners.map((banner) => (
                                <motion.div
                                    key={banner.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`group relative bg-white/[0.03] backdrop-blur-xl border ${banner.is_active ? 'border-white/10' : 'border-white/5 opacity-60'} rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-500 flex flex-col`}
                                >
                                    {/* Banner Preview */}
                                    <div className="relative h-32 overflow-hidden">
                                    <img 
                                        src={banner.image_url} 
                                        alt={banner.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className={`px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5`}>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400"># {banner.display_order}</span>
                                        </div>
                                    </div>

                                    {/* Status Indicator */}
                                    <div className="absolute top-4 right-4">
                                        {banner.is_active ? (
                                            <div className="px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full border border-green-500/30 flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                                <span className="text-[9px] font-black uppercase tracking-widest text-green-400">Active</span>
                                            </div>
                                        ) : (
                                            <div className="px-3 py-1 bg-red-500/20 backdrop-blur-md rounded-full border border-red-500/30 flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                                <span className="text-[9px] font-black uppercase tracking-widest text-red-400">Hidden</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col gap-3 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Order</span>
                                            <span className="text-xs font-black text-white"># {banner.display_order}</span>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <button 
                                                onClick={() => openEditModal(banner)}
                                                className="p-2 bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/50 rounded-xl transition-all"
                                            >
                                                <Edit2 className="w-3.5 h-3.5 text-orange-400" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(banner.id)}
                                                className="p-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-xl transition-all"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {banners.length === 0 && (
                            <div className="col-span-full py-24 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                                <ImageIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-400">No banners found</h3>
                                <p className="text-gray-600 mt-2">Start by adding your first promotional banner.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Edit/Add Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                        >
                            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-transparent">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-500/20 rounded-xl border border-orange-500/30">
                                        <Star className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black">{editingBanner ? 'Edit Banner' : 'Create New Banner'}</h2>
                                        <p className="text-[10px] text-gray-500 font-medium">Configure visuals and targeting</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-6">
                                    <div className="space-y-4">
                                        {/* Image Upload Area */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Banner Visual</label>
                                            <div className="relative group aspect-video rounded-2xl overflow-hidden bg-white/5 border-2 border-dashed border-white/10 hover:border-orange-500/50 transition-all">
                                                {form.imageFile || form.image_url ? (
                                                    <>
                                                        <img 
                                                            src={form.imageFile ? URL.createObjectURL(form.imageFile) : form.image_url} 
                                                            className="w-full h-full object-cover" 
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                                                                Replace
                                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })} />
                                                            </label>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                                                        <Upload className="w-8 h-8 text-gray-600 mb-2 group-hover:text-orange-500 group-hover:scale-110 transition-all" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Upload Banner</span>
                                                        <span className="text-[9px] text-gray-600 mt-1 font-medium">Recommended: 1600 x 400px (4:1 Ratio)</span>
                                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })} />
                                                    </label>
                                                )}
                                            </div>
                                        </div>

                                        {/* Visibility and Order hidden or simplified */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Order</label>
                                                <input
                                                    type="number"
                                                    value={form.display_order}
                                                    onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) })}
                                                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 transition-all font-bold text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Status</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setForm({ ...form, is_active: !form.is_active })}
                                                    className={`w-full px-4 py-3 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all ${form.is_active ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}
                                                >
                                                    {form.is_active ? 'Active' : 'Hidden'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                                            <div className="flex items-start gap-3">
                                                <div className="p-1.5 bg-blue-500/10 rounded-lg">
                                                    <Info className="w-4 h-4 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-white mb-0.5">Simple Mode</h4>
                                                    <p className="text-[10px] text-gray-500 leading-relaxed">
                                                        High-impact image only display. No text overlays.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                <div className="flex gap-3 pt-6 border-t border-white/5">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-[2] px-6 py-4 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-500 hover:to-purple-500 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Publish
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes shine {
                    from { transform: translateX(-100%) skewX(-20deg); }
                    to { transform: translateX(200%) skewX(-20deg); }
                }
                .animate-shine {
                    animation: shine 3s infinite;
                }
            ` }} />
        </div>
    );
}

