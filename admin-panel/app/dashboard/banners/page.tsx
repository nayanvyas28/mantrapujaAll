'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
    Plus, Search, Trash2, Edit2, Upload, X, Check, Loader2, Sparkles, 
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
            const { data, error } = await supabase
                .from('home_banners')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
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
        const fileExt = file.name.split('.').pop();
        const fileName = `banner_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `banner_images/${fileName}`;

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
            let imageUrl = form.image_url;
            if (form.imageFile) {
                imageUrl = await handleFileUpload(form.imageFile);
            }

            if (!imageUrl) throw new Error('Image is required');

            // Handle Smart Route
            let finalRoute = form.route;
            if (form.linkType === 'puja' && form.selectedPujaSlug) {
                finalRoute = `puja:${form.selectedPujaSlug}`;
            }

            const bannerData = {
                title: form.title,
                title_hi: form.title_hi,
                subtitle: form.subtitle,
                subtitle_hi: form.subtitle_hi,
                image_url: imageUrl,
                route: finalRoute,
                target: form.target,
                is_active: form.is_active,
                display_order: form.display_order,
                show_offer: form.show_offer,
                show_text_overlay: form.show_text_overlay,
                offer_tag: form.offer_tag,
                offer_tag_hi: form.offer_tag_hi
            };

            let error;
            if (editingBanner) {
                const { error: err } = await supabase
                    .from('home_banners')
                    .update(bannerData)
                    .eq('id', editingBanner.id);
                error = err;
            } else {
                const { error: err } = await supabase
                    .from('home_banners')
                    .insert([bannerData]);
                error = err;
            }

            if (error) throw error;

            setIsModalOpen(false);
            fetchBanners();
            resetForm();
        } catch (error: any) {
            alert('Error saving banner: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this banner?')) return;
        try {
            const { error } = await supabase.from('home_banners').delete().eq('id', id);
            if (error) throw error;
            fetchBanners();
        } catch (error: any) {
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
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm font-medium group">
                            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 rounded-2xl border border-white/10">
                                <ImageIcon className="w-8 h-8 text-orange-400" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tight mb-2">Home Page Banners</h1>
                                <p className="text-gray-400 text-sm max-w-xl">
                                    Manage high-impact sliding banners for the Mobile App and Website. Use targeting to direct users to specific rituals or pages.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-500 hover:to-purple-500 rounded-2xl font-black transition-all shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] uppercase text-xs tracking-widest"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Banner
                    </button>
                </header>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                        <p className="text-gray-500 font-medium animate-pulse">Loading Banners...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {banners.map((banner) => (
                            <motion.div
                                key={banner.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`group relative bg-white/[0.03] backdrop-blur-xl border ${banner.is_active ? 'border-white/10' : 'border-white/5 opacity-60'} rounded-[32px] overflow-hidden hover:border-orange-500/30 transition-all duration-500 flex flex-col`}
                            >
                                {/* Banner Preview */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={banner.image_url} 
                                        alt={banner.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    
                                    {/* Offer Badge Preview */}
                                    {banner.show_offer && (
                                        <div className="absolute top-4 right-12 px-3 py-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full border border-white/20 shadow-[0_0_15px_rgba(234,88,12,0.4)] flex items-center gap-1.5 animate-pulse">
                                            <Sparkles className="w-3 h-3 text-white" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-white italic">{banner.offer_tag}</span>
                                        </div>
                                    )}

                                    {/* Target Badges */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        {banner.target === 'both' || banner.target === 'app' ? (
                                            <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5">
                                                <Smartphone className="w-3 h-3 text-orange-400" />
                                                <span className="text-[10px] font-black uppercase tracking-wider">App</span>
                                            </div>
                                        ) : null}
                                        {banner.target === 'both' || banner.target === 'web' ? (
                                            <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5">
                                                <Globe className="w-3 h-3 text-blue-400" />
                                                <span className="text-[10px] font-black uppercase tracking-wider">Web</span>
                                            </div>
                                        ) : null}
                                    </div>

                                    {/* Status Indicator */}
                                    <div className="absolute top-4 right-4">
                                        {banner.is_active ? (
                                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                        )}
                                    </div>

                                    <div className="absolute bottom-4 left-6 right-6">
                                        <h3 className="text-xl font-bold line-clamp-1">{banner.title}</h3>
                                        <p className="text-xs text-gray-300 line-clamp-1 mt-1 opacity-80">{banner.subtitle}</p>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col gap-4 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Display Order</span>
                                            <span className="text-lg font-black text-white"># {banner.display_order}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => openEditModal(banner)}
                                                className="p-3 bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/50 rounded-2xl transition-all"
                                            >
                                                <Edit2 className="w-4 h-4 text-orange-400" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(banner.id)}
                                                className="p-3 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-2xl transition-all"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/5 space-y-2">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            {banner.route?.startsWith('puja:') ? (
                                                <Sparkles className="w-3 h-3 text-purple-400" />
                                            ) : (
                                                <ExternalLink className="w-3 h-3" />
                                            )}
                                            <span className="text-[10px] uppercase font-bold tracking-widest truncate">
                                                {banner.route?.startsWith('puja:') 
                                                    ? `Linked: ${pujas.find(p => p.slug === banner.route?.split(':')[1])?.name || banner.route.split(':')[1]}` 
                                                    : (banner.route || 'No Link Route')}
                                            </span>
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
                            className="relative bg-[#111] border border-white/10 rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                        >
                            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-transparent">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-orange-500/20 rounded-2xl border border-orange-500/30">
                                        <Sparkles className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black">{editingBanner ? 'Edit Banner' : 'Create New Banner'}</h2>
                                        <p className="text-sm text-gray-500 font-medium">Configure visuals and targeting</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-8">
                                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        {/* Image Upload Area */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Banner Visual</label>
                                            <div className="relative group aspect-video rounded-3xl overflow-hidden bg-white/5 border-2 border-dashed border-white/10 hover:border-orange-500/50 transition-all">
                                                {form.imageFile || form.image_url ? (
                                                    <>
                                                        <img 
                                                            src={form.imageFile ? URL.createObjectURL(form.imageFile) : form.image_url} 
                                                            className="w-full h-full object-cover" 
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <label className="cursor-pointer bg-white text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                                                                Replace Image
                                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })} />
                                                            </label>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                                                        <Upload className="w-12 h-12 text-gray-600 mb-4 group-hover:text-orange-500 group-hover:scale-110 transition-all" />
                                                        <span className="text-xs font-black uppercase tracking-widest text-gray-500">Upload High-Res Banner</span>
                                                        <span className="text-[10px] text-gray-600 mt-2 font-medium">Recommended: 1200 x 600px</span>
                                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })} />
                                                    </label>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Configuration</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div 
                                                    onClick={() => setForm({ ...form, show_offer: !form.show_offer })}
                                                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${form.show_offer ? 'bg-orange-500/20 border-orange-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <Gift size={16} className={form.show_offer ? 'text-orange-500' : 'text-gray-500'} />
                                                        <div className={`w-8 h-4 rounded-full relative transition-colors ${form.show_offer ? 'bg-orange-500' : 'bg-white/10'}`}>
                                                            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${form.show_offer ? 'left-4.5' : 'left-0.5'}`} />
                                                        </div>
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${form.show_offer ? 'text-white' : 'text-gray-500'}`}>Offer Badge</span>
                                                </div>

                                                <div 
                                                    onClick={() => setForm({ ...form, show_text_overlay: !form.show_text_overlay })}
                                                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${form.show_text_overlay ? 'bg-blue-500/20 border-blue-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <Layout size={16} className={form.show_text_overlay ? 'text-blue-500' : 'text-gray-500'} />
                                                        <div className={`w-8 h-4 rounded-full relative transition-colors ${form.show_text_overlay ? 'bg-blue-500' : 'bg-white/10'}`}>
                                                            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${form.show_text_overlay ? 'left-4.5' : 'left-0.5'}`} />
                                                        </div>
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${form.show_text_overlay ? 'text-white' : 'text-gray-500'}`}>Text Overlay</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Display Order</label>
                                            <input
                                                type="number"
                                                value={form.display_order}
                                                onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) })}
                                                className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500 transition-all font-bold"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between px-1">
                                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Click Interaction</label>
                                                <div className="flex bg-white/5 rounded-full p-1 border border-white/10 scale-90 origin-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => setForm({ ...form, linkType: 'custom' })}
                                                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${form.linkType === 'custom' ? 'bg-white text-black' : 'text-gray-500'}`}
                                                    >Custom URL</button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setForm({ ...form, linkType: 'puja' })}
                                                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${form.linkType === 'puja' ? 'bg-white text-black' : 'text-gray-500'}`}
                                                    >Link to Puja</button>
                                                </div>
                                            </div>

                                            {form.linkType === 'puja' ? (
                                                <div className="relative group">
                                                    <Tag className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                                                    <select
                                                        value={form.selectedPujaSlug}
                                                        onChange={(e) => setForm({ ...form, selectedPujaSlug: e.target.value })}
                                                        className="w-full pl-16 pr-10 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500 transition-all font-bold text-sm appearance-none cursor-pointer"
                                                    >
                                                        <option value="" className="bg-[#111]">-- Select a Ritual --</option>
                                                        {pujas.map(p => (
                                                            <option key={p.id} value={p.slug} className="bg-[#111]">{p.name}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none group-hover:text-white transition-colors" />
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    <Layout className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <input
                                                        type="text"
                                                        value={form.route}
                                                        onChange={(e) => setForm({ ...form, route: e.target.value })}
                                                        placeholder="/pujas/navgraha or https://..."
                                                        className="w-full pl-16 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500 transition-all font-bold text-sm"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-6">
                                            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                                <Sparkles className={`w-4 h-4 ${isTranslating ? 'text-orange-500 animate-spin' : 'text-purple-500'}`} />
                                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Content & Localization</h3>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Banner Title (English)</label>
                                                    <input
                                                        type="text"
                                                        value={form.title}
                                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                                        required
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500 transition-all font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-2 relative">
                                                    <label className="text-[10px] font-black text-orange-500/80 uppercase tracking-widest pl-1">Banner Title (Hindi)</label>
                                                    <input
                                                        type="text"
                                                        value={form.title_hi}
                                                        onChange={(e) => setForm({ ...form, title_hi: e.target.value })}
                                                        className="w-full px-6 py-4 bg-orange-950/20 border border-orange-900/30 rounded-2xl focus:outline-none focus:border-orange-500 transition-all font-bold text-orange-100"
                                                    />
                                                    {isTranslating && <div className="absolute right-4 top-10"><Loader2 className="w-4 h-4 animate-spin text-orange-500" /></div>}
                                                </div>
                                            </div>

                                            <div className="pt-2 space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Subtitle (English)</label>
                                                    <textarea
                                                        rows={2}
                                                        value={form.subtitle}
                                                        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500 transition-all font-bold text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-2 relative">
                                                    <label className="text-[10px] font-black text-orange-500/80 uppercase tracking-widest pl-1">Subtitle (Hindi)</label>
                                                    <textarea
                                                        rows={2}
                                                        value={form.subtitle_hi}
                                                        onChange={(e) => setForm({ ...form, subtitle_hi: e.target.value })}
                                                        className="w-full px-6 py-4 bg-orange-950/20 border border-orange-900/30 rounded-2xl focus:outline-none focus:border-orange-500 transition-all font-bold text-sm text-orange-100"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold">Visibility Status</h4>
                                                <p className="text-xs text-gray-500">Inactive banners will not fetch on App/Web</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setForm({ ...form, is_active: !form.is_active })}
                                                className={`w-14 h-8 rounded-full relative transition-all duration-300 ${form.is_active ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-white/10'}`}
                                            >
                                                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 shadow-lg ${form.is_active ? 'left-7' : 'left-1'}`} />
                                            </button>
                                        </div>

                                        {/* NEW: Offer Badge Toggle */}
                                        <div className="p-6 bg-gradient-to-r from-orange-600/10 to-transparent border border-orange-500/20 rounded-3xl space-y-5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-orange-500/20 rounded-xl border border-orange-500/30">
                                                        <Gift className="w-4 h-4 text-orange-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold">Offer Badge</h4>
                                                        <p className="text-[10px] text-gray-400 font-medium">Highlight special deals on banner</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setForm({ ...form, show_offer: !form.show_offer })}
                                                    className={`w-12 h-6 rounded-full relative transition-all duration-300 ${form.show_offer ? 'bg-orange-600' : 'bg-white/10'}`}
                                                >
                                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-lg ${form.show_offer ? 'left-7' : 'left-1'}`} />
                                                </button>
                                            </div>

                                            {form.show_offer && (
                                                <div className="space-y-4 pt-2 border-t border-orange-500/10 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Tag Text (e.g. 50% OFF)</label>
                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                value={form.offer_tag}
                                                                onChange={(e) => setForm({ ...form, offer_tag: e.target.value })}
                                                                className="w-full px-5 py-3 bg-white/[0.03] border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 transition-all font-bold text-xs"
                                                                placeholder="SPECIAL OFFER"
                                                            />
                                                            {isTranslating && <div className="absolute right-4 top-3"><Loader2 className="w-3 h-3 animate-spin text-orange-500" /></div>}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-orange-500/80 uppercase tracking-widest pl-1">Tag Text (Hindi)</label>
                                                        <input
                                                            type="text"
                                                            value={form.offer_tag_hi}
                                                            onChange={(e) => setForm({ ...form, offer_tag_hi: e.target.value })}
                                                            className="w-full px-5 py-3 bg-orange-950/20 border border-orange-900/30 rounded-xl focus:outline-none focus:border-orange-500 transition-all font-bold text-xs text-orange-100"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                <div className="flex gap-4 pt-8 border-t border-white/5">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-[2] px-8 py-5 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-500 hover:to-purple-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Uploading & Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-5 h-5" />
                                                Publish Banner
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @keyframes shine {
                    from { transform: translateX(-100%) skewX(-20deg); }
                    to { transform: translateX(200%) skewX(-20deg); }
                }
                .animate-shine {
                    animation: shine 3s infinite;
                }
            `}</style>
        </div>
    );
}

