'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
    Plus, Search, Trash2, Edit2, Upload, X, Check, 
    Loader2, Star, Tag, Info, ArrowLeft, 
    Image as ImageIcon, MapPin, ChevronDown, 
    Compass, Landmark, Map, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteFileFromStorage } from '@/lib/storage-utils';
import Link from 'next/link';

interface Destination {
    id: string;
    name: string;
    name_hi?: string;
    type: string;
    state_id: string;
    description: string;
    description_hi?: string;
    images: string[];
    slug: string;
    is_featured: boolean;
    is_active: boolean;
    show_on_home: boolean;
    home_order: number;
    home_image_url?: string;
    x?: number;
    y?: number;
}

const LOCATION_TYPES = [
    "Char Dham",
    "Jyotirlinga",
    "Shakti Peeth",
    "Kumbh Mela",
    "Holy City",
    "Ancient Temple"
];

const STATES = [
    { id: 'ut', name: 'Uttarakhand' },
    { id: 'up', name: 'Uttar Pradesh' },
    { id: 'mh', name: 'Maharashtra' },
    { id: 'gj', name: 'Gujarat' },
    { id: 'tn', name: 'Tamil Nadu' },
    { id: 'or', name: 'Odisha' },
    { id: 'mp', name: 'Madhya Pradesh' },
    { id: 'br', name: 'Bihar' },
    { id: 'rj', name: 'Rajasthan' },
    { id: 'as', name: 'Assam' },
    { id: 'wb', name: 'West Bengal' },
    { id: 'ka', name: 'Karnataka' },
    { id: 'kl', name: 'Kerala' },
    { id: 'ap', name: 'Andhra Pradesh' },
    { id: 'tg', name: 'Telangana' },
    { id: 'jk', name: 'Jammu & Kashmir' },
    { id: 'hp', name: 'Himachal Pradesh' },
    { id: 'pb', name: 'Punjab' },
    { id: 'hr', name: 'Haryana' },
    { id: 'dl', name: 'Delhi' }
];

export default function LocationManagementPage() {
    const supabase = createClient();
    const [locations, setLocations] = useState<Destination[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState<Destination | null>(null);

    // Form states
    const [form, setForm] = useState({
        name: '',
        name_hi: '',
        type: 'Char Dham',
        state_id: 'ut',
        description: '',
        description_hi: '',
        slug: '',
        is_featured: true,
        is_active: true,
        show_on_home: false,
        home_order: 0,
        x: 0,
        y: 0,
        mainImageFile: null as File | null,
        homeImageFile: null as File | null,
        existingImages: [] as string[],
        existingHomeImage: ''
    });

    const [isAutoSlug, setIsAutoSlug] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [isTranslating, setIsTranslating] = useState(false);

    useEffect(() => {
        fetchLocations();
    }, []);

    useEffect(() => {
        if (isAutoSlug && form.name && !editingLocation) {
            const slug = form.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            setForm(prev => ({ ...prev, slug }));
        }
    }, [form.name, isAutoSlug, editingLocation]);

    const fetchLocations = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('destinations')
                .select('*')
                .order('name', { ascending: true });
            
            if (error) throw error;
            setLocations(data || []);
        } catch (error) {
            console.error('Error fetching locations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (location: Destination) => {
        setEditingLocation(location);
        setForm({
            name: location.name,
            name_hi: location.name_hi || '',
            type: location.type,
            state_id: location.state_id,
            description: location.description,
            description_hi: location.description_hi || '',
            slug: location.slug,
            is_featured: location.is_featured,
            is_active: location.is_active,
            show_on_home: location.show_on_home,
            home_order: location.home_order,
            x: location.x || 0,
            y: location.y || 0,
            mainImageFile: null,
            homeImageFile: null,
            existingImages: location.images || [],
            existingHomeImage: location.home_image_url || ''
        });
        setIsAutoSlug(false);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setForm({
            name: '',
            name_hi: '',
            type: 'Char Dham',
            state_id: 'ut',
            description: '',
            description_hi: '',
            slug: '',
            is_featured: true,
            is_active: true,
            show_on_home: false,
            home_order: 0,
            x: 0,
            y: 0,
            mainImageFile: null,
            homeImageFile: null,
            existingImages: [],
            existingHomeImage: ''
        });
        setEditingLocation(null);
        setIsAutoSlug(true);
    };

    const handleAutoTranslate = async () => {
        if (!form.name && !form.description) return;
        setIsTranslating(true);
        try {
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    text: {
                        name_hi: form.name,
                        description_hi: form.description
                    }
                })
            });
            const results = await response.json();
            if (results) {
                setForm(prev => ({
                    ...prev,
                    name_hi: results.name_hi || prev.name_hi,
                    description_hi: results.description_hi || prev.description_hi
                }));
            }
        } catch (error) {
            console.error('Translation failed:', error);
        } finally {
            setIsTranslating(false);
        }
    };

    const handleFileUpload = async (file: File, type: 'main' | 'home') => {
        try {
            // 1. Optimize image
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
            
            // 2. Upload
            const folder = type === 'main' ? 'locations' : 'home_locations';
            const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.webp`;
            
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
                throw new Error(error.error || 'Upload failed');
            }

            const uploadResult = await uploadResponse.json();
            return uploadResult.url;
        } catch (error: any) {
            console.error(`[Locations] ${type} upload error:`, error);
            throw error;
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let mainImageUrl = form.existingImages[0] || '';
            let homeImageUrl = form.existingHomeImage || '';

            // Upload Main Image if changed
            if (form.mainImageFile) {
                mainImageUrl = await handleFileUpload(form.mainImageFile, 'main');
            }

            // Upload Home Image (Portrait) if changed
            if (form.homeImageFile) {
                homeImageUrl = await handleFileUpload(form.homeImageFile, 'home');
            }

            // If updating and new files uploaded, delete old ones
            if (editingLocation) {
                if (form.mainImageFile && editingLocation.images?.[0]) {
                    await deleteFileFromStorage(editingLocation.images[0]);
                }
                if (form.homeImageFile && editingLocation.home_image_url) {
                    await deleteFileFromStorage(editingLocation.home_image_url);
                }
            }

            const locationData = {
                name: form.name,
                name_hi: form.name_hi,
                type: form.type,
                state_id: form.state_id,
                description: form.description,
                description_hi: form.description_hi,
                slug: form.slug,
                is_featured: form.is_featured,
                is_active: form.is_active,
                show_on_home: form.show_on_home,
                home_order: form.home_order,
                home_image_url: homeImageUrl,
                images: [mainImageUrl].filter(Boolean),
                x: form.x,
                y: form.y
            };

            const res = await fetch('/api/destinations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'save',
                    id: editingLocation?.id,
                    locationData
                })
            });

            if (!res.ok) throw new Error('Failed to save');
            
            setIsModalOpen(false);
            fetchLocations();
            resetForm();
        } catch (error: any) {
            alert('Error saving location: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this sacred location?')) return;
        try {
            const res = await fetch('/api/destinations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', id })
            });
            if (!res.ok) throw new Error('Delete failed');
            fetchLocations();
        } catch (error: any) {
            alert('Error deleting location: ' + error.message);
        }
    };

    const filteredLocations = locations.filter(loc => {
        const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || loc.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-[-10%] w-[50%] h-[50%] bg-saffron/10 blur-[150px] rounded-full pointer-events-none" />

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
                            <div className="p-3 bg-gradient-to-tr from-saffron/20 to-orange-500/20 rounded-2xl border border-white/10 shadow-lg shadow-saffron/5">
                                <Compass className="w-6 h-6 text-saffron" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-serif">
                                Sacred Locations
                            </h1>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                            Manage pilgrimage sites and sacred temples. Configure both global location cards and special <span className="text-saffron font-bold">9:16 portrait cards</span> for the homepage.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleAutoTranslate}
                            disabled={isTranslating}
                            className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-saffron/30 hover:bg-saffron/10 rounded-2xl font-bold transition-all active:scale-[0.98] text-[10px] tracking-widest uppercase text-saffron"
                        >
                            <Star className="w-4 h-4" />
                            Auto Translate
                        </button>
                        <button
                            onClick={() => { resetForm(); setIsModalOpen(true); }}
                            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-saffron to-orange-600 hover:from-saffron/80 hover:to-orange-500 rounded-2xl font-black transition-all shadow-xl hover:shadow-saffron/20 active:scale-[0.98] uppercase text-xs tracking-widest"
                        >
                            <Plus className="w-5 h-5" />
                            Add Location
                        </button>
                    </div>
                </header>

                {/* Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex-1 max-w-md relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-saffron transition-colors" />
                        <input
                            type="text"
                            placeholder="Search sacred cities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-saffron/50 transition-all text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                        <button
                            onClick={() => setFilterType('all')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${filterType === 'all' ? 'bg-saffron/10 border-saffron/50 text-saffron' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                        >
                            All Sites
                        </button>
                        {LOCATION_TYPES.map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${filterType === type ? 'bg-saffron/10 border-saffron/50 text-saffron' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-saffron/50" />
                        <p className="text-gray-500 text-sm font-medium animate-pulse">Scanning Bharat...</p>
                    </div>
                ) : filteredLocations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 bg-white/5 border border-dashed border-white/10 rounded-[40px] text-center">
                        <div className="w-20 h-20 bg-saffron/10 rounded-full flex items-center justify-center mb-6">
                            <MapPin className="w-10 h-10 text-saffron/40" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No Sacred Locations Found</h3>
                        <p className="text-gray-500 text-sm max-w-sm mb-8">
                            Start building your spiritual map by adding sacred temples and pilgrimage sites.
                        </p>
                        <button
                            onClick={() => { resetForm(); setIsModalOpen(true); }}
                            className="flex items-center gap-2 px-8 py-4 bg-saffron/10 border border-saffron/30 hover:bg-saffron/20 text-saffron rounded-2xl font-black transition-all uppercase text-[10px] tracking-widest"
                        >
                            <Plus className="w-4 h-4" />
                            Create Your First Tirtha
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredLocations.map(loc => (
                                <motion.div
                                    key={loc.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-saffron/30 transition-all shadow-xl"
                                >
                                    <div className="aspect-[16/10] bg-gray-900 relative overflow-hidden">
                                        <img 
                                            src={loc.images?.[0] || '/logo.png'} 
                                            alt={loc.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        
                                        {loc.show_on_home && (
                                            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-saffron rounded-full shadow-lg border border-white/20">
                                                <LayoutGrid className="w-3 h-3 text-white" />
                                                <span className="text-[10px] font-black tracking-tight uppercase">Home Featured</span>
                                            </div>
                                        )}

                                        <div className="absolute bottom-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <button onClick={() => handleEdit(loc)} className="p-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 transition-all">
                                                <Edit2 className="w-4 h-4 text-white" />
                                            </button>
                                            <button onClick={() => handleDelete(loc.id)} className="p-2.5 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all">
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <h3 className="text-lg font-bold truncate group-hover:text-saffron transition-colors font-serif">
                                                {loc.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                                                <MapPin className="w-3 h-3 text-saffron" />
                                                <span className="text-sm font-bold uppercase">{loc.state_id}</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-2 italic mb-4">"{loc.description}"</p>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                            <Landmark className="w-3 h-3" />
                                            {loc.type}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Modal */}
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
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#111] border border-white/10 w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
                        >
                            <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-[#111] z-30">
                                <div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-serif">
                                        {editingLocation ? 'Configure Sacred Site' : 'Add New Tirtha'}
                                    </h3>
                                    <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-widest">Global & Home Presentation</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors border border-white/5">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                                <div className="p-8 space-y-12">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                        {/* Left Column: Basic Info */}
                                        <div className="lg:col-span-7 space-y-8">
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                                                    <Info className="w-4 h-4 text-saffron" />
                                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">General Information</h4>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Location Name</label>
                                                        <input
                                                            type="text" required
                                                            value={form.name}
                                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                            placeholder="e.g. Kedarnath Temple"
                                                            className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-saffron/50 transition-all font-medium text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-bold text-saffron uppercase tracking-widest pl-1">Hindi Name</label>
                                                        <input
                                                            type="text"
                                                            value={form.name_hi}
                                                            onChange={(e) => setForm({ ...form, name_hi: e.target.value })}
                                                            placeholder="स्थान का नाम"
                                                            className="w-full px-6 py-4 bg-white/[0.03] border border-saffron/20 rounded-2xl focus:outline-none focus:border-saffron/50 transition-all font-medium text-sm text-saffron-100"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Category Type</label>
                                                        <div className="relative">
                                                            <select
                                                                value={form.type}
                                                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                                                className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl appearance-none cursor-pointer text-sm"
                                                            >
                                                                {LOCATION_TYPES.map(t => <option key={t} value={t} className="bg-[#111]">{t}</option>)}
                                                            </select>
                                                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">State / Region</label>
                                                        <div className="relative">
                                                            <select
                                                                value={form.state_id}
                                                                onChange={(e) => setForm({ ...form, state_id: e.target.value })}
                                                                className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl appearance-none cursor-pointer text-sm"
                                                            >
                                                                {STATES.map(s => <option key={s.id} value={s.id} className="bg-[#111]">{s.name}</option>)}
                                                            </select>
                                                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1 flex items-center justify-between">
                                                        URL Slug
                                                        <button 
                                                            type="button" 
                                                            onClick={() => setIsAutoSlug(!isAutoSlug)}
                                                            className={`text-[8px] px-2 py-0.5 rounded-md border transition-all ${isAutoSlug ? 'bg-saffron/10 border-saffron/30 text-saffron' : 'bg-white/5 border-white/10 text-gray-500'}`}
                                                        >
                                                            {isAutoSlug ? 'Auto-Sync ON' : 'Manual'}
                                                        </button>
                                                    </label>
                                                    <input
                                                        type="text" required
                                                        value={form.slug}
                                                        onChange={(e) => { setIsAutoSlug(false); setForm({ ...form, slug: e.target.value }); }}
                                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl font-mono text-xs text-saffron/60"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Short Description (English)</label>
                                                        <textarea
                                                            rows={3}
                                                            value={form.description}
                                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                                            className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl resize-none text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-bold text-saffron uppercase tracking-widest pl-1">Short Description (Hindi)</label>
                                                        <textarea
                                                            rows={3}
                                                            value={form.description_hi}
                                                            onChange={(e) => setForm({ ...form, description_hi: e.target.value })}
                                                            className="w-full px-6 py-4 bg-white/[0.03] border border-saffron/20 rounded-2xl resize-none text-sm text-saffron-100"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Map Coordinates */}
                                            <div className="space-y-6 pt-4">
                                                <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                                                    <Map className="w-4 h-4 text-saffron" />
                                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Map Positioning</h4>
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">X Coordinate (0-612)</label>
                                                        <input type="number" value={form.x} onChange={e => setForm({...form, x: parseInt(e.target.value) || 0})} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Y Coordinate (0-696)</label>
                                                        <input type="number" value={form.y} onChange={e => setForm({...form, y: parseInt(e.target.value) || 0})} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column: Imagery & Display */}
                                        <div className="lg:col-span-5 space-y-8">
                                            {/* Home Display Section */}
                                            <div className="p-6 rounded-[24px] bg-gradient-to-br from-saffron/10 to-transparent border border-saffron/20 space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-bold text-white">Homepage Spotlight</p>
                                                        <p className="text-[10px] text-saffron/70 font-bold uppercase tracking-wider">Feature in sacred locations section</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={form.show_on_home}
                                                            onChange={(e) => setForm({ ...form, show_on_home: e.target.checked })}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-12 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-saffron shadow-inner"></div>
                                                    </label>
                                                </div>

                                                <AnimatePresence>
                                                    {form.show_on_home && (
                                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 overflow-hidden">
                                                            <div className="pt-4 border-t border-white/5">
                                                                <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-wider">Home Display Order (1-4)</label>
                                                                <input
                                                                    type="number"
                                                                    value={form.home_order}
                                                                    onChange={(e) => setForm({ ...form, home_order: parseInt(e.target.value) || 0 })}
                                                                    className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-xl font-bold text-center"
                                                                />
                                                            </div>
                                                            
                                                            <div className="space-y-4">
                                                                <label className="block text-[10px] font-black text-saffron uppercase tracking-widest">Portrait Showcase Image (9:16)</label>
                                                                <div className="relative aspect-[9/16] max-w-[200px] mx-auto rounded-2xl border-2 border-dashed border-saffron/30 bg-saffron/5 overflow-hidden group flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:border-saffron transition-all">
                                                                    <input
                                                                        type="file" accept="image/*"
                                                                        onChange={(e) => setForm({ ...form, homeImageFile: e.target.files?.[0] || null })}
                                                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                                    />
                                                                    {form.homeImageFile ? (
                                                                        <div className="relative z-0 h-full w-full">
                                                                            <img src={URL.createObjectURL(form.homeImageFile)} className="w-full h-full object-cover rounded-lg" />
                                                                        </div>
                                                                    ) : form.existingHomeImage ? (
                                                                        <img src={form.existingHomeImage} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                                                    ) : (
                                                                        <div className="space-y-2">
                                                                            <Upload className="w-8 h-8 text-saffron mx-auto" />
                                                                            <p className="text-[10px] font-bold text-saffron/70">UPLOAD PORTRAIT IMAGE</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Standard Images */}
                                            <div className="space-y-6">
                                                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                    <ImageIcon className="w-3.5 h-3.5" /> Global Assets
                                                </h4>
                                                <div className="relative aspect-video rounded-3xl border-2 border-dashed border-white/10 bg-white/5 overflow-hidden flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-saffron/50 transition-all">
                                                    <input
                                                        type="file" accept="image/*"
                                                        onChange={(e) => setForm({ ...form, mainImageFile: e.target.files?.[0] || null })}
                                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                    />
                                                    {form.mainImageFile ? (
                                                        <div className="space-y-2">
                                                            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto"><Check className="w-5 h-5 text-green-500" /></div>
                                                            <p className="text-xs font-bold">{form.mainImageFile.name}</p>
                                                        </div>
                                                    ) : form.existingImages[0] ? (
                                                        <img src={form.existingImages[0]} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                                                    ) : (
                                                        <div className="space-y-2">
                                                            <Upload className="w-10 h-10 text-gray-600 mb-2 mx-auto" />
                                                            <p className="text-xs font-bold text-gray-400">MAIN LOCATION IMAGE</p>
                                                            <p className="text-[10px] text-gray-600">Landscape 16:9 recommended</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-bold">Visibility State</p>
                                                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Active Tirtha in Catalog</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={form.is_active}
                                                        onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sticky Footer */}
                                <div className="px-8 py-6 border-t border-white/10 bg-[#111] flex flex-col md:flex-row gap-4 z-30 mt-auto">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all uppercase text-[10px] tracking-widest border border-white/5"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={isSaving}
                                        className="flex-[2] py-4 px-6 bg-gradient-to-r from-saffron to-orange-600 hover:from-saffron/80 hover:to-orange-500 text-white font-black rounded-2xl shadow-xl shadow-saffron/20 disabled:opacity-50 flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest"
                                    >
                                        {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                            <>
                                                <Check className="w-5 h-5" />
                                                {editingLocation ? 'Update Location' : 'Publish Location'}
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
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
            ` }} />
        </div>
    );
}
