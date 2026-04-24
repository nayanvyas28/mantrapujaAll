'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Search, Trash2, Edit2, Upload, X, Check, Loader2, Sparkles, Tag, Info, ArrowLeft, Image as ImageIcon, Briefcase, IndianRupee, ChevronDown, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteFileFromStorage } from '@/lib/storage-utils';
import Link from 'next/link';

interface Category {
    id: string;
    name: string;
}

interface Puja {
    id: string;
    name: string;
    name_hi?: string;
    price: number;
    category_id: string;
    is_active: boolean;
    is_offer_999: boolean;
    offer_order: number;
    slug: string;
    show_on_home: boolean;
    home_order: number;
    sort_order: number;
    image_url?: string;
    images?: string[];
    description?: string;
    description_hi?: string;
    tagline?: string;
    tagline_hi?: string;
    about_description?: string;
    about_description_hi?: string;
    display_price?: number;
    packages?: any[];
    date?: string;
    location?: string;
}

export default function PujaManagementPage() {
    const supabase = createClient();
    const [pujas, setPujas] = useState<Puja[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Modals
    const [isPujaModalOpen, setIsPujaModalOpen] = useState(false);
    const [editingPuja, setEditingPuja] = useState<Puja | null>(null);

    // Form states
    const [pujasForm, setPujasForm] = useState({
        name: '',
        name_hi: '',
        price: 0,
        category_id: '',
        description: '',
        description_hi: '',
        tagline: '',
        tagline_hi: '',
        is_active: true,
        is_offer_999: false,
        offer_order: 0,
        slug: '',
        show_on_home: false,
        home_order: 0,
        sort_order: 0,
        about_description: '',
        about_description_hi: '',
        offer_999_tax: 0,
        offer_999_dakshina: 0,
        display_price: 0,
        date: '',
        location: '',
        packages: [
            { id: 'special', name: '₹1 Special Offer Package (Online)', price: 1, description: 'Exclusive online ritual for limited time.' },
            { id: 'individual', name: 'Individual Package (Offline)', price: 1100, description: 'Personal offline ritual at sacred location.' },
            { id: 'couple', name: 'Couple Package (Offline)', price: 2100, description: 'Offline ritual for couples at sacred location.' },
            { id: 'family', name: 'Family Package (Offline)', price: 5100, description: 'Offline ritual for families at sacred location.' },
        ],
        imageFile: null as File | null
    });

    const [isAutoSlug, setIsAutoSlug] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [aiGenerated, setAiGenerated] = useState({ name_hi: '', tagline_hi: '', description_hi: '', about_description_hi: '' });
    const [isTranslating, setIsTranslating] = useState(false);

    // Pagination
    const [hasMore, setHasMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const LIMIT = 10;

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        fetchData(true);
    }, [searchQuery, filterCategory]);

    // Real-time Auto-translation
    useEffect(() => {
        const timer = setTimeout(() => {
            performRealtimeTranslation();
        }, 1500);
        return () => clearTimeout(timer);
    }, [pujasForm.name, pujasForm.tagline, pujasForm.description]);

    // Auto-Slug Logic
    useEffect(() => {
        if (isAutoSlug && pujasForm.name && !editingPuja) {
            setPujasForm(prev => ({
                ...prev,
                slug: prev.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
            }));
        }
    }, [pujasForm.name, isAutoSlug]);

    const performRealtimeTranslation = async () => {
        // Only translate if there's English but the Hindi is either empty or was AI-generated
        const needsName = pujasForm.name && (!pujasForm.name_hi || pujasForm.name_hi === aiGenerated.name_hi);
        const needsTagline = pujasForm.tagline && (!pujasForm.tagline_hi || pujasForm.tagline_hi === aiGenerated.tagline_hi);
        const needsDescription = pujasForm.description && (!pujasForm.description_hi || pujasForm.description_hi === aiGenerated.description_hi);
        const needsAbout = pujasForm.about_description && (!pujasForm.about_description_hi || pujasForm.about_description_hi === aiGenerated.about_description_hi);

        if (!needsName && !needsTagline && !needsDescription && !needsAbout) return;

        setIsTranslating(true);
        try {
            const translationPayload: Record<string, string> = {};
            if (needsName) translationPayload.name_hi = pujasForm.name;
            if (needsTagline) translationPayload.tagline_hi = pujasForm.tagline;
            if (needsDescription) translationPayload.description_hi = pujasForm.description;
            if (needsAbout) translationPayload.about_description_hi = pujasForm.about_description;

            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: translationPayload })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server returned ${response.status}: ${errorText.substring(0, 50)}...`);
            }

            const results = await response.json();
            if (results) {
                setPujasForm(prev => ({
                    ...prev,
                    name_hi: needsName ? (results.name_hi || prev.name_hi) : prev.name_hi,
                    tagline_hi: needsTagline ? (results.tagline_hi || prev.tagline_hi) : prev.tagline_hi,
                    description_hi: needsDescription ? (results.description_hi || prev.description_hi) : prev.description_hi,
                    about_description_hi: needsAbout ? (results.about_description_hi || prev.about_description_hi) : prev.about_description_hi
                }));
                // Track these as AI generated so we know we can overwrite them next time
                setAiGenerated(prev => ({
                    ...prev,
                    name_hi: needsName ? results.name_hi : prev.name_hi,
                    tagline_hi: needsTagline ? results.tagline_hi : prev.tagline_hi,
                    description_hi: needsDescription ? results.description_hi : prev.description_hi,
                    about_description_hi: needsAbout ? results.about_description_hi : prev.about_description_hi
                }));
            }
        } catch (error) {
            console.error('Real-time translation failed:', error);
        } finally {
            setIsTranslating(false);
        }
    };

    async function fetchInitialData() {
        setIsLoading(true);
        try {
            const { data: categoryData } = await supabase.from('categories').select('id, name').order('name');
            if (categoryData) setCategories(categoryData);
        } catch (error) {
            console.error('Error fetching initial data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchData(reset = false) {
        const currentOffset = reset ? 0 : offset;
        try {
            let query = supabase
                .from('poojas')
                .select('*')
                .order('created_at', { ascending: false });

            // Apply Server-side Filters
            if (searchQuery) {
                query = query.ilike('name', `%${searchQuery}%`);
            }
            if (filterCategory !== 'all') {
                query = query.eq('category_id', filterCategory);
            }

            const { data: pujaData, error } = await query.range(currentOffset, currentOffset + LIMIT);

            if (error) throw error;

            if (pujaData) {
                const hasMoreData = pujaData.length > LIMIT;
                const itemsToDisplay = hasMoreData ? pujaData.slice(0, LIMIT) : pujaData;

                if (reset) {
                    setPujas(itemsToDisplay);
                    setOffset(LIMIT);
                } else {
                    setPujas(prev => [...prev, ...itemsToDisplay]);
                    setOffset(prev => prev + LIMIT);
                }
                setHasMore(hasMoreData);
            }
        } catch (error) {
            console.error('Error fetching pujas:', error);
        }
    }

    const loadMore = async () => {
        if (isMoreLoading) return;
        setIsMoreLoading(true);
        await fetchData(false);
        setIsMoreLoading(false);
    };

    const handleFileUpload = async (file: File) => {
        try {
            // 1. Optimize image through our Sharp-powered API
            const optimizeFormData = new FormData();
            optimizeFormData.append('file', file);

            const optimizeResponse = await fetch('/api/optimize', {
                method: 'POST',
                body: optimizeFormData
            });

            if (!optimizeResponse.ok) {
                const error = await optimizeResponse.json();
                throw new Error(error.error || 'Optimization failed');
            }

            const optimizedBlob = await optimizeResponse.blob();
            
            // 2. Upload the optimized WebP image via our secure proxy API (Fixes RLS Error)
            const fileName = `puja_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.webp`;
            
            const uploadFormData = new FormData();
            uploadFormData.append('file', optimizedBlob, fileName);
            uploadFormData.append('path', fileName);
            uploadFormData.append('bucket', 'pujas');

            const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
            });

            if (!uploadResponse.ok) {
                const error = await uploadResponse.json();
                throw new Error(error.error || 'Secure upload failed');
            }

            const uploadResult = await uploadResponse.json();

            // If updating and new file uploaded, delete old one
            if (editingPuja?.image_url) {
                console.log("[Pujas] Deleting old image:", editingPuja.image_url);
                await deleteFileFromStorage(editingPuja.image_url);
            }

            return uploadResult.url;
        } catch (error: any) {
            console.error('Upload & Optimization error:', error);
            throw new Error(`Failed to process image: ${error.message}`);
        }
    };

    const handleSavePuja = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            let imageUrl = editingPuja?.image_url || '';
            if (pujasForm.imageFile) {
                imageUrl = await handleFileUpload(pujasForm.imageFile);
            }

            const pujaData = {
                name: pujasForm.name,
                name_hi: pujasForm.name_hi,
                price: pujasForm.price,
                category_id: pujasForm.category_id || null,
                description: pujasForm.description,
                description_hi: pujasForm.description_hi,
                tagline: pujasForm.tagline,
                tagline_hi: pujasForm.tagline_hi,
                is_active: pujasForm.is_active,
                is_offer_999: pujasForm.is_offer_999,
                offer_order: pujasForm.offer_order,
                slug: pujasForm.slug || pujasForm.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
                show_on_home: pujasForm.show_on_home,
                home_order: pujasForm.home_order,
                sort_order: pujasForm.sort_order,
                about_description: pujasForm.about_description,
                about_description_hi: pujasForm.about_description_hi,
                display_price: pujasForm.display_price,
                packages: pujasForm.packages,
                date: pujasForm.date || null,
                location: pujasForm.location || null,
                image_url: imageUrl,
                images: imageUrl ? [imageUrl] : []
            };

            const summaryData = {
                pooja_name: pujasForm.name,
                base_price: pujasForm.price,
                total_payable: pujasForm.price,
                offer_999_tax: pujasForm.offer_999_tax,
                offer_999_dakshina: pujasForm.offer_999_dakshina
            };

            // 3. Save to database via secure proxy
            const dbRes = await fetch('/api/pujas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'save',
                    id: editingPuja?.id,
                    pujaData,
                    summaryData
                })
            });

            if (!dbRes.ok) {
                const errData = await dbRes.json();
                throw new Error(errData.error || 'Server-side save failed');
            }

            setIsPujaModalOpen(false);
            setEditingPuja(null);
            resetForm();
            fetchData(true);
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const resetForm = () => {
        setAiGenerated({ name_hi: '', tagline_hi: '', description_hi: '', about_description_hi: '' });
        setPujasForm({
            name: '',
            name_hi: '',
            price: 0,
            category_id: '',
            description: '',
            description_hi: '',
            tagline: '',
            tagline_hi: '',
            is_active: true,
            is_offer_999: false,
            offer_order: 0,
            slug: '',
            show_on_home: false,
            home_order: 0,
            sort_order: 0,
            about_description: '',
            about_description_hi: '',
            offer_999_tax: 0,
            offer_999_dakshina: 0,
            display_price: 0,
            date: '',
            location: '',
            packages: [
                { id: 'special', name: '₹1 Special Offer Package (Online)', price: 1, description: 'Exclusive online ritual for limited time.' },
                { id: 'individual', name: 'Individual Package (Offline)', price: 1100, description: 'Personal offline ritual at sacred location.' },
                { id: 'couple', name: 'Couple Package (Offline)', price: 2100, description: 'Offline ritual for couples at sacred location.' },
                { id: 'family', name: 'Family Package (Offline)', price: 5100, description: 'Offline ritual for families at sacred location.' },
            ],
            imageFile: null
        });
        setIsAutoSlug(true);
    };

    const handleEdit = async (puja: Puja) => {
        setEditingPuja(puja);
        const { data: summary } = await supabase
            .from('pooja_payment_summaries')
            .select('offer_999_tax, offer_999_dakshina')
            .eq('pooja_id', puja.id)
            .single();

        setPujasForm({
            name: puja.name,
            name_hi: puja.name_hi || '',
            price: puja.price,
            category_id: puja.category_id || '',
            description: puja.description || '',
            description_hi: puja.description_hi || '',
            tagline: puja.tagline || '',
            tagline_hi: puja.tagline_hi || '',
            is_active: puja.is_active,
            is_offer_999: puja.is_offer_999,
            offer_order: puja.offer_order,
            slug: puja.slug || '',
            show_on_home: puja.show_on_home || false,
            home_order: puja.home_order || 0,
            sort_order: puja.sort_order || 0,
            about_description: puja.about_description || '',
            about_description_hi: puja.about_description_hi || '',
            offer_999_tax: summary?.offer_999_tax || 0,
            offer_999_dakshina: summary?.offer_999_dakshina || 0,
            display_price: puja.display_price || 0,
            date: puja.date || '',
            location: puja.location || '',
            packages: puja.packages || [
                { id: 'special', name: '₹1 Special Offer Package (Online)', price: 1, description: 'Exclusive online ritual for limited time.' },
                { id: 'individual', name: 'Individual Package (Offline)', price: 1100, description: 'Personal offline ritual at sacred location.' },
                { id: 'couple', name: 'Couple Package (Offline)', price: 2100, description: 'Offline ritual for couples at sacred location.' },
                { id: 'family', name: 'Family Package (Offline)', price: 5100, description: 'Offline ritual for families at sacred location.' },
            ],
            imageFile: null
        });
        setIsAutoSlug(!puja.slug);
        setAiGenerated({
            name_hi: puja.name_hi || '',
            tagline_hi: puja.tagline_hi || '',
            description_hi: puja.description_hi || '',
            about_description_hi: puja.about_description_hi || ''
        });
        setIsPujaModalOpen(true);
    };

    const handleAutoTranslate = async () => {
        if (!pujasForm.name && !pujasForm.description && !pujasForm.tagline) {
            alert('Please enter English content first.');
            return;
        }

        setIsSaving(true);
        try {
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    text: {
                        name_hi: pujasForm.name,
                        tagline_hi: pujasForm.tagline,
                        description_hi: pujasForm.description,
                        about_description_hi: pujasForm.about_description
                    }
                })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error (${response.status})`);
            }

            const results = await response.json();
            if (results) {
                setPujasForm(prev => ({
                    ...prev,
                    name_hi: results.name_hi || prev.name_hi,
                    tagline_hi: results.tagline_hi || prev.tagline_hi,
                    description_hi: results.description_hi || prev.description_hi,
                    about_description_hi: results.about_description_hi || prev.about_description_hi
                }));
            }
        } catch (error) {
            console.error('Translation failed:', error);
            alert('AI Translation failed. Please try again or type manually.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        const pujaToDelete = pujas.find(p => p.id === id);
        if (!confirm(`Are you sure you want to delete Puja "${pujaToDelete?.name}"?`)) return;
        
        try {
            // Delete via secure proxy
            const delRes = await fetch('/api/pujas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });

            if (!delRes.ok) {
                const delErr = await delRes.json();
                throw new Error(delErr.error || 'Server-side delete failed');
            }

            // Delete storage file
            if (pujaToDelete?.image_url) {
                await deleteFileFromStorage(pujaToDelete.image_url);
            }

            fetchData(true);
        } catch (error: any) {
            alert('Error deleting puja: ' + error.message);
        }
    };

    const filteredPujas = pujas;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none" />

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
                            <div className="p-3 bg-gradient-to-tr from-orange-500/20 to-red-500/20 rounded-2xl border border-white/10 shadow-lg shadow-orange-500/5">
                                <Sparkles className="w-6 h-6 text-orange-400" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                Puja Manager
                            </h1>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                            Organize your spiritual rituals. Toggle visibility, curate pricing, and manage exclusive <span className="text-orange-400/80 font-semibold">₹999 promotional offers</span> for the mobile app home screen.
                        </p>
                    </div>

                    <button
                        onClick={() => { resetForm(); setEditingPuja(null); setIsPujaModalOpen(true); }}
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-2xl font-black transition-all shadow-xl hover:shadow-orange-500/20 active:scale-[0.98] uppercase text-xs tracking-widest group"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        Add New Ritual
                    </button>
                    <button
                        onClick={handleAutoTranslate}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-orange-500/30 hover:bg-orange-500/10 rounded-2xl font-bold transition-all shadow-lg active:scale-[0.98] text-[10px] tracking-widest uppercase text-orange-400 group"
                    >
                        <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                        ✨ Auto Translate Hindi
                    </button>
                </header>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex-1 max-w-md relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by puja name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                        <button
                            onClick={() => setFilterCategory('all')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${filterCategory === 'all' ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                        >
                            All Categories
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilterCategory(cat.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${filterCategory === cat.id ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-orange-500/50" />
                        <p className="text-gray-500 text-sm font-medium animate-pulse">Fetching Catalog...</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {filteredPujas.map(puja => (
                                <motion.div
                                    key={puja.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all shadow-xl"
                                >
                                    <div className="aspect-[16/10] bg-gray-900 relative overflow-hidden">
                                        {puja.image_url ? (
                                            <img src={puja.image_url} alt={puja.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                                <ImageIcon className="w-12 h-12 text-gray-700" />
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                        {puja.is_offer_999 && (
                                            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-orange-500 rounded-full shadow-lg shadow-orange-500/30 border border-white/20">
                                                <Sparkles className="w-3 h-3 text-white" />
                                                <span className="text-[10px] font-black tracking-tight uppercase">₹999 OFFER</span>
                                            </div>
                                        )}

                                        <div className="absolute bottom-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <button onClick={() => handleEdit(puja)} className="p-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 transition-all">
                                                <Edit2 className="w-4 h-4 text-white" />
                                            </button>
                                            <button onClick={() => handleDelete(puja.id)} className="p-2.5 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all">
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <h3 className="text-lg font-bold truncate group-hover:text-orange-400 transition-colors">
                                                {puja.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                                                <IndianRupee className="w-3 h-3 text-gray-400" />
                                                <span className="text-sm font-bold">{puja.price}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Tag className="w-3 h-3" />
                                            <span className="font-medium">{categories.find(c => c.id === puja.category_id)?.name || 'General Ritual'}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-700 mx-1" />
                                            <span className={puja.is_active ? 'text-green-500/70' : 'text-red-500/70'}>
                                                {puja.is_active ? 'Visible' : 'Hidden'}
                                            </span>
                                        </div>

                                        {puja.is_offer_999 && (
                                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                                                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Home Display Active</span>
                                                </div>
                                                <span className="text-[10px] text-gray-500 font-bold px-2 py-0.5 bg-white/5 rounded-md border border-white/5">ORDER: {puja.offer_order}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {hasMore && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={loadMore}
                            disabled={isMoreLoading}
                            className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-3">
                                {isMoreLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                                        <span className="text-sm font-bold text-gray-400 capitalize">Loading Rituals...</span>
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-5 h-5 text-orange-500 group-hover:translate-y-1 transition-transform" />
                                        <span className="text-sm font-bold text-gray-300 capitalize">View more spiritual rituals</span>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                )}

                {!isLoading && filteredPujas.length === 0 && (
                    <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl border-dashed">
                        <ImageIcon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-400">No Pujas Found</h3>
                        <p className="text-gray-500 mt-2">Adjust your filters or add a new puja to your catalog.</p>
                    </div>
                )}
            </div>

            {/* Premium Puja Modal */}
            <AnimatePresence>
                {isPujaModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsPujaModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#111] border border-white/10 w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
                        >
                            <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#111]/80 backdrop-blur-md z-20">
                                <div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                        {editingPuja ? 'Refine Puja Details' : 'Initialize New Ritual'}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">COMPLETE ALL NECESSARY FIELDS FOR APP CONSISTENCY</p>
                                </div>
                                <button onClick={() => setIsPujaModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSavePuja} className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-10">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                    {/* Left Column: Essential Logic */}
                                    <div className="lg:col-span-7 space-y-8">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                                                <Info className="w-4 h-4 text-orange-500" />
                                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Primary Configuration</h4>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Ritual Name (English)</label>
                                                    <input
                                                        type="text" required
                                                        value={pujasForm.name}
                                                        onChange={(e) => setPujasForm({ ...pujasForm, name: e.target.value })}
                                                        placeholder="e.g. Mahamrityunjaya Mantra Jaap"
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-medium text-sm text-white"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-orange-400 uppercase tracking-widest pl-1 flex items-center justify-between">
                                                        Ritual Name (Hindi)
                                                        {isTranslating && (pujasForm.name && (!pujasForm.name_hi || pujasForm.name_hi === aiGenerated.name_hi)) && (
                                                            <span className="flex items-center gap-1 text-[8px] animate-pulse">
                                                                <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                                                AI Translating...
                                                            </span>
                                                        )}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={pujasForm.name_hi}
                                                        onChange={(e) => setPujasForm({ ...pujasForm, name_hi: e.target.value })}
                                                        placeholder="अनुष्ठान का नाम"
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-orange-500/20 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-medium text-sm text-orange-100"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Ritual Category</label>
                                                    <div className="relative">
                                                        <select
                                                            required
                                                            value={pujasForm.category_id}
                                                            onChange={(e) => setPujasForm({ ...pujasForm, category_id: e.target.value })}
                                                            className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all appearance-none cursor-pointer font-medium text-sm text-gray-300"
                                                        >
                                                            <option value="" className="bg-[#111]">Select Category</option>
                                                            {categories.map(cat => <option key={cat.id} value={cat.id} className="bg-[#111] text-white">{cat.name}</option>)}
                                                        </select>
                                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Global Catalog Rank</label>
                                                    <input
                                                        type="number"
                                                        value={pujasForm.sort_order}
                                                        onChange={(e) => setPujasForm({ ...pujasForm, sort_order: parseInt(e.target.value) || 0 })}
                                                        placeholder="Priority in lists (higher = first)"
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-medium text-sm text-white"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Display Price on Card (₹)</label>
                                                    <div className="relative group">
                                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 group-focus-within:border-orange-500/30 transition-all">
                                                            <IndianRupee className="w-3.5 h-3.5 text-orange-400" />
                                                        </div>
                                                        <input
                                                            type="number"
                                                            value={pujasForm.display_price}
                                                            onChange={(e) => setPujasForm({ ...pujasForm, display_price: parseInt(e.target.value) || 0 })}
                                                            placeholder="0"
                                                            className="w-full pl-16 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-bold text-sm text-white"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 pb-2 border-b border-white/5 pt-4">
                                                <Calendar className="w-4 h-4 text-orange-500" />
                                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Ritual Schedule & Venue</h4>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Ritual Date & Time</label>
                                                    <div className="relative group">
                                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                                                            <Calendar className="w-3.5 h-3.5 text-orange-400" />
                                                        </div>
                                                        <input
                                                            type="datetime-local"
                                                            value={pujasForm.date}
                                                            onChange={(e) => setPujasForm({ ...pujasForm, date: e.target.value })}
                                                            className="w-full pl-16 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-medium text-sm text-white"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Sacred Location</label>
                                                    <div className="relative group">
                                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                                                            <MapPin className="w-3.5 h-3.5 text-orange-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={pujasForm.location}
                                                            onChange={(e) => setPujasForm({ ...pujasForm, location: e.target.value })}
                                                            placeholder="e.g. Kashi Vishwanath, Varanasi"
                                                            className="w-full pl-16 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-medium text-sm text-white"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6 pt-4">
                                                <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                                                    <Tag className="w-4 h-4 text-orange-500" />
                                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Identification & Branding</h4>
                                                </div>
                                                    <label className="block text-[10px] font-bold text-brand-blue uppercase tracking-widest pl-1 flex items-center justify-between">
                                                        URL Slug
                                                        <button 
                                                            type="button" 
                                                            onClick={() => setIsAutoSlug(!isAutoSlug)}
                                                            className={`text-[8px] px-2 py-0.5 rounded-md border transition-all ${isAutoSlug ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-white/5 border-white/10 text-gray-500'}`}
                                                        >
                                                            {isAutoSlug ? 'Auto-Sync ON' : 'Manual Edit'}
                                                        </button>
                                                    </label>
                                                    <input
                                                        type="text" required
                                                        value={pujasForm.slug}
                                                        onChange={(e) => {
                                                            setIsAutoSlug(false);
                                                            setPujasForm({ ...pujasForm, slug: e.target.value });
                                                        }}
                                                        placeholder="ritual-url-slug"
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-mono text-xs text-orange-200/60"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Short Tagline (English)</label>
                                                    <input
                                                        type="text"
                                                        value={pujasForm.tagline}
                                                        onChange={(e) => setPujasForm({ ...pujasForm, tagline: e.target.value })}
                                                        placeholder="Brief catchy phrase"
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-medium text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-orange-400 uppercase tracking-widest pl-1 flex items-center justify-between">
                                                        Short Tagline (Hindi)
                                                        {isTranslating && (pujasForm.tagline && (!pujasForm.tagline_hi || pujasForm.tagline_hi === aiGenerated.tagline_hi)) && (
                                                            <span className="flex items-center gap-1 text-[8px] animate-pulse">
                                                                <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                                                AI Translating...
                                                            </span>
                                                        )}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={pujasForm.tagline_hi}
                                                        onChange={(e) => setPujasForm({ ...pujasForm, tagline_hi: e.target.value })}
                                                        placeholder="संक्षिप्त विवरण"
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-orange-500/20 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-medium text-sm text-orange-100"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Base Price (₹)</label>
                                                    <div className="relative group">
                                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 group-focus-within:border-orange-500/30 transition-all">
                                                            <IndianRupee className="w-3.5 h-3.5 text-gray-400 group-focus-within:text-orange-400" />
                                                        </div>
                                                        <input
                                                            type="number" required
                                                            value={pujasForm.price}
                                                            onChange={(e) => setPujasForm({ ...pujasForm, price: parseInt(e.target.value) || 0 })}
                                                            className="w-full pl-16 pr-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all font-bold text-sm text-white"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 space-y-6">
                                                <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                                                    <Tag className="w-4 h-4 text-orange-500" />
                                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Ritual Knowledge &amp; Content</h4>
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.1em] mb-4">Quick Summary (Catalog Lists)</p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">English Summary</label>
                                                            <textarea
                                                                rows={3}
                                                                value={pujasForm.description}
                                                                onChange={(e) => setPujasForm({ ...pujasForm, description: e.target.value })}
                                                                placeholder="Spiritual significance..."
                                                                className="w-full px-6 py-5 bg-white/[0.03] border border-white/10 rounded-3xl focus:outline-none focus:border-orange-500/50 transition-all resize-none text-sm leading-relaxed text-white"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-bold text-orange-400 uppercase tracking-widest pl-1 flex items-center justify-between">
                                                                Hindi Summary
                                                                {isTranslating && (pujasForm.description && (!pujasForm.description_hi || pujasForm.description_hi === aiGenerated.description_hi)) && (
                                                                    <span className="flex items-center gap-1 text-[8px] animate-pulse">
                                                                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                                                        AI Translating...
                                                                    </span>
                                                                )}
                                                            </label>
                                                            <textarea
                                                                rows={3}
                                                                value={pujasForm.description_hi}
                                                                onChange={(e) => setPujasForm({ ...pujasForm, description_hi: e.target.value })}
                                                                placeholder="आध्यात्मिक महत्व..."
                                                                className="w-full px-6 py-5 bg-white/[0.03] border border-orange-500/20 rounded-3xl focus:outline-none focus:border-orange-500/50 transition-all resize-none text-sm leading-relaxed text-orange-100"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Tiered Packages Section */}
                                                    <div className="pt-8 space-y-6">
                                                        <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                                                            <Briefcase className="w-4 h-4 text-orange-500" />
                                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Booking Packages (Tiers)</h4>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {pujasForm.packages?.map((pkg, idx) => (
                                                                <div key={pkg.id} className="p-5 rounded-[2rem] bg-white/[0.02] border border-white/10 space-y-4 hover:border-orange-500/30 transition-all">
                                                                    <div className="flex flex-col gap-2">
                                                                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest px-2">{pkg.name}</span>
                                                                        <div className="flex items-center gap-3 px-2">
                                                                            <span className="text-[10px] font-bold text-gray-500 uppercase shrink-0">Price (₹):</span>
                                                                            <input 
                                                                                type="number"
                                                                                value={pkg.price}
                                                                                onChange={(e) => {
                                                                                    const newPkgs = [...pujasForm.packages!];
                                                                                    newPkgs[idx].price = parseInt(e.target.value) || 0;
                                                                                    setPujasForm({ ...pujasForm, packages: newPkgs });
                                                                                }}
                                                                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-orange-500/50"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="space-y-1 px-2">
                                                                        <label className="block text-[8px] font-bold text-gray-600 uppercase tracking-widest">Description</label>
                                                                        <textarea
                                                                            rows={2}
                                                                            value={pkg.description}
                                                                            onChange={(e) => {
                                                                                const newPkgs = [...pujasForm.packages!];
                                                                                newPkgs[idx].description = e.target.value;
                                                                                setPujasForm({ ...pujasForm, packages: newPkgs });
                                                                            }}
                                                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-400 focus:outline-none focus:border-orange-500/50 resize-none leading-relaxed"
                                                                            placeholder="Enter package benefits..."
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 pt-2">
                                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.1em] mb-4">Detailed Background (About Section)</p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">English Insight</label>
                                                            <textarea
                                                                rows={4}
                                                                value={pujasForm.about_description}
                                                                onChange={(e) => setPujasForm({ ...pujasForm, about_description: e.target.value })}
                                                                placeholder="In-depth details about the ritual..."
                                                                className="w-full px-6 py-5 bg-white/[0.03] border border-white/10 rounded-3xl focus:outline-none focus:border-orange-500/50 transition-all resize-none text-sm leading-relaxed text-white"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="block text-[10px] font-bold text-orange-400 uppercase tracking-widest pl-1 flex items-center justify-between">
                                                                Hindi Insight
                                                                {isTranslating && (pujasForm.about_description && (!pujasForm.about_description_hi || pujasForm.about_description_hi === aiGenerated.about_description_hi)) && (
                                                                    <span className="flex items-center gap-1 text-[8px] animate-pulse">
                                                                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                                                        AI Translating...
                                                                    </span>
                                                                )}
                                                            </label>
                                                            <textarea
                                                                rows={4}
                                                                value={pujasForm.about_description_hi}
                                                                onChange={(e) => setPujasForm({ ...pujasForm, about_description_hi: e.target.value })}
                                                                placeholder="विस्तृत विवरण..."
                                                                className="w-full px-6 py-5 bg-white/[0.03] border border-orange-500/20 rounded-3xl focus:outline-none focus:border-orange-500/50 transition-all resize-none text-sm leading-relaxed text-orange-100"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        <div className="flex items-center gap-5 p-6 rounded-3xl bg-white/[0.02] border border-white/10 group hover:border-orange-500/20 transition-all">
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    id="is_active_check"
                                                    checked={pujasForm.is_active}
                                                    onChange={(e) => setPujasForm({ ...pujasForm, is_active: e.target.checked })}
                                                    className="w-6 h-6 rounded-lg border-white/20 bg-black text-orange-500 focus:ring-orange-500/50 cursor-pointer"
                                                />
                                            </div>
                                            <label htmlFor="is_active_check" className="flex-1 cursor-pointer">
                                                <p className="text-sm font-bold text-gray-200">App Catalog Visibility</p>
                                                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-semibold flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${pujasForm.is_active ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                                                    Instantly toggle availability across all platforms
                                                </p>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Right Column: Promotional & Assets */}
                                    <div className="lg:col-span-5 space-y-8">
                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <Sparkles className="w-3.5 h-3.5" /> Promotional Engine
                                            </h4>

                                            <div className="p-6 rounded-[24px] bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-bold text-white">₹999 Special Offer</p>
                                                        <p className="text-[10px] text-orange-400/70 font-bold uppercase tracking-wider">Feature on home screen</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={pujasForm.is_offer_999}
                                                            onChange={(e) => setPujasForm({ ...pujasForm, is_offer_999: e.target.checked })}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-12 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500 shadow-inner"></div>
                                                    </label>
                                                </div>

                                                <AnimatePresence>
                                                    {pujasForm.is_offer_999 && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="space-y-5 overflow-hidden"
                                                        >
                                                            <div>
                                                                <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-wider">Section Ordering</label>
                                                                <input
                                                                    type="number"
                                                                    value={pujasForm.offer_order}
                                                                    onChange={(e) => setPujasForm({ ...pujasForm, offer_order: parseInt(e.target.value) || 0 })}
                                                                    placeholder="0"
                                                                    className="w-full px-4 py-2.5 bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 font-bold text-center"
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider">Tax (₹)</label>
                                                                    <input
                                                                        type="number"
                                                                        value={pujasForm.offer_999_tax}
                                                                        onChange={(e) => setPujasForm({ ...pujasForm, offer_999_tax: parseInt(e.target.value) || 0 })}
                                                                        className="w-full px-4 py-2.5 bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-bold"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider">Dakshina (₹)</label>
                                                                    <input
                                                                        type="number"
                                                                        value={pujasForm.offer_999_dakshina}
                                                                        onChange={(e) => setPujasForm({ ...pujasForm, offer_999_dakshina: parseInt(e.target.value) || 0 })}
                                                                        className="w-full px-4 py-2.5 bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 text-xs font-bold"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <div className="p-6 rounded-[24px] bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-bold text-blue-400">Main Home Showcase</p>
                                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">Top featured section</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={pujasForm.show_on_home}
                                                            onChange={(e) => setPujasForm({ ...pujasForm, show_on_home: e.target.checked })}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-12 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500 shadow-inner"></div>
                                                    </label>
                                                </div>

                                                {pujasForm.show_on_home && (
                                                    <div className="pt-5 border-t border-white/5">
                                                        <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-wider">Showcase Order</label>
                                                        <input
                                                            type="number"
                                                            value={pujasForm.home_order}
                                                            onChange={(e) => setPujasForm({ ...pujasForm, home_order: parseInt(e.target.value) || 0 })}
                                                            placeholder="0"
                                                            className="w-full px-4 py-2.5 bg-black/60 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 font-bold text-center"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <ImageIcon className="w-3.5 h-3.5" /> Media Asset
                                            </h4>

                                            <div className="relative aspect-video rounded-[24px] border-2 border-dashed border-white/10 bg-white/5 overflow-hidden group/upload hover:border-orange-500/50 transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setPujasForm({ ...pujasForm, imageFile: e.target.files?.[0] || null })}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                />
                                                {pujasForm.imageFile ? (
                                                    <div className="space-y-3">
                                                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                                            <Check className="w-6 h-6 text-green-500" />
                                                        </div>
                                                        <p className="text-xs font-bold truncate max-w-[200px]">{pujasForm.imageFile.name}</p>
                                                        <p className="text-[10px] text-gray-500 font-medium italic">Click to replace</p>
                                                    </div>
                                                ) : editingPuja?.image_url ? (
                                                    <img src={editingPuja.image_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover/upload:opacity-50 transition-opacity" />
                                                ) : null}

                                                {!pujasForm.imageFile && (
                                                    <div className="relative z-0">
                                                        <Upload className="w-10 h-10 text-gray-600 mb-3 mx-auto transition-transform group-hover/upload:-translate-y-1" />
                                                        <p className="text-xs font-bold text-gray-400">UPLOAD BANNER</p>
                                                        <p className="text-[10px] text-gray-600 font-medium mt-1 uppercase tracking-tight">Landscape JPG/PNG only</p>
                                                        <p className="text-[10px] text-orange-500 font-bold mt-2 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full w-fit mx-auto">Ratio 4:3</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsPujaModalOpen(false)}
                                        className="flex-1 py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all uppercase text-xs tracking-widest"
                                    >
                                        Discard Changes
                                    </button>
                                    <button
                                        disabled={isSaving}
                                        className="flex-[2] py-4 px-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-3 uppercase text-xs tracking-widest group"
                                    >
                                        {isSaving ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <>
                                                <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                {editingPuja ? 'Synchronize Updates' : 'Publish to Catalog'}
                                            </>
                                        )}
                                    </button>
                                </div>
                                <style dangerouslySetInnerHTML={{ __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            ` }} />
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
