"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
    Plus, Trash2, Edit2, Upload, X, Check, Loader2, 
    ArrowLeft, ImageIcon, Layout, Save
} from 'lucide-react';
import { deleteFileFromStorage } from '@/lib/storage-utils';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface QuickAccessCard {
    id: string;
    name: string;
    name_hi?: string;
    img: string;
    link: string;
    color: string;
    border: string;
}

const DEFAULT_CARDS: QuickAccessCard[] = [
    { id: '1', name: "Kundali", name_hi: "कुण्डली", img: "/features/kundali.png", link: "/kundli", color: "from-orange-500/10 to-red-500/10", border: "#f97316" },
    { id: '2', name: "Rashifal", name_hi: "राशिफल", img: "/features/rashifal.png", link: "/horoscope", color: "from-amber-500/10 to-orange-500/10", border: "#f59e0b" },
    { id: '3', name: "Panchang", name_hi: "पंचांग", img: "/features/panchang.png", link: "/panchang", color: "from-yellow-500/10 to-amber-500/10", border: "#eab308" },
    { id: '4', name: "Calculator", name_hi: "कैलकुलेटर", img: "/features/calculator.png", link: "/calculators", color: "from-red-500/10 to-pink-500/10", border: "#ef4444" },
    { id: '5', name: "Chadava", name_hi: "चढ़ावा", img: "/features/chadava.png", link: "/chadava", color: "from-purple-500/10 to-indigo-500/10", border: "#a855f7" },
    { id: '6', name: "Guru Ji AI", name_hi: "गुरु जी AI", img: "/features/guru-ai.png", link: "/chat", color: "from-cyan-500/10 to-blue-500/10", border: "#06b6d4" }
];

export default function QuickAccessManagementPage() {
    const supabase = createClient();
    const [cards, setCards] = useState<QuickAccessCard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCard, setEditingCard] = useState<QuickAccessCard | null>(null);

    // Form states
    const [form, setForm] = useState({
        name: '',
        name_hi: '',
        img: '',
        link: '',
        color: '',
        border: '',
        imageFile: null as File | null
    });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/config');
            if (!response.ok) throw new Error('Failed to fetch config');
            const data = await response.json();
            
            let loadedCards = [];
            try {
                loadedCards = typeof data.homeQuickAccess === 'string' 
                    ? JSON.parse(data.homeQuickAccess) 
                    : data.homeQuickAccess;
            } catch (e) {
                loadedCards = [];
            }

            if (!Array.isArray(loadedCards) || loadedCards.length === 0) {
                setCards(DEFAULT_CARDS);
            } else {
                setCards(loadedCards);
            }
        } catch (err) {
            console.error('Error fetching quick access config:', err);
            setCards(DEFAULT_CARDS);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (file: File) => {
        try {
            // 1. Optimize image (optional but recommended)
            const optimizeFormData = new FormData();
            optimizeFormData.append('file', file);
            const optimizeResponse = await fetch('/api/optimize', { method: 'POST', body: optimizeFormData });
            
            let uploadContent: Blob | File = file;
            let fileName = `${Math.random().toString(36).substring(2)}.${file.name.split('.').pop()}`;
            let contentType = file.type;

            if (optimizeResponse.ok) {
                uploadContent = await optimizeResponse.blob();
                fileName = `${Math.random().toString(36).substring(2)}.webp`;
                contentType = 'image/webp';
            }

            const filePath = `quick-access/${fileName}`;

            // 2. Upload using Admin API to bypass RLS
            const uploadFormData = new FormData();
            uploadFormData.append('file', uploadContent, fileName);
            uploadFormData.append('bucket', 'website');
            uploadFormData.append('path', filePath);

            const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                body: uploadFormData
            });

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.error || 'Failed to upload image');
            }

            const { url } = await uploadResponse.json();
            return url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const handleSaveCard = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            let finalImageUrl = form.img;
            if (form.imageFile) {
                // If replacing, clean up old one if it's a storage URL
                if (editingCard?.img && editingCard.img.includes('supabase.co')) {
                    await deleteFileFromStorage(editingCard.img);
                }
                finalImageUrl = await handleFileUpload(form.imageFile);
            }

            const cardData: QuickAccessCard = {
                id: editingCard?.id || Math.random().toString(36).substring(2),
                name: form.name,
                name_hi: form.name_hi,
                img: finalImageUrl,
                link: form.link,
                color: form.color || "from-orange-500/10 to-red-500/10",
                border: form.border || "#f97316"
            };

            let updatedCards;
            if (editingCard) {
                updatedCards = cards.map(c => c.id === editingCard.id ? cardData : c);
            } else {
                updatedCards = [...cards, cardData];
            }

            // Save entire config
            const response = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ home_quick_access: JSON.stringify(updatedCards) })
            });

            if (!response.ok) throw new Error('Failed to save config');

            setCards(updatedCards);
            setIsModalOpen(false);
            resetForm();
        } catch (error: any) {
            alert('Error saving card: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteCard = async (id: string) => {
        const cardToDelete = cards.find(c => c.id === id);
        if (!confirm(`Are you sure you want to delete card "${cardToDelete?.name}"?`)) return;
        
        try {
            const updatedCards = cards.filter(c => c.id !== id);
            
            // Save entire config
            const response = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ home_quick_access: JSON.stringify(updatedCards) })
            });

            if (!response.ok) throw new Error('Failed to save config');

            if (cardToDelete?.img && cardToDelete.img.includes('supabase.co')) {
                await deleteFileFromStorage(cardToDelete.img);
            }
            
            setCards(updatedCards);
        } catch (error: any) {
            alert('Error deleting card: ' + error.message);
        }
    };

    const resetForm = () => {
        setForm({
            name: '',
            name_hi: '',
            img: '',
            link: '',
            color: '',
            border: '',
            imageFile: null
        });
        setEditingCard(null);
    };

    const openEditModal = (card: QuickAccessCard) => {
        setEditingCard(card);
        setForm({
            name: card.name,
            name_hi: card.name_hi || '',
            img: card.img,
            link: card.link,
            color: card.color,
            border: card.border,
            imageFile: null
        });
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="max-w-6xl mx-auto relative z-10 w-full">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <Link href="/dashboard/website-home" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm font-medium group">
                            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                            Back to Website Home Settings
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-2xl border border-white/10">
                                <Layout className="w-8 h-8 text-cyan-400" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    Quick Access Cards
                                </h1>
                                <p className="text-gray-400 mt-1 text-sm">Manage the 6 quick access cards below the homepage banner.</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all shadow-xl hover:shadow-white/5 active:scale-95 uppercase text-xs tracking-widest"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Card
                    </button>
                </header>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-cyan-500/50" />
                        <p className="text-gray-500 text-sm font-medium animate-pulse">Loading Cards...</p>
                    </div>
                ) : cards.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Layout className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-400">No Cards Configured</h3>
                        <p className="text-sm text-gray-500 mt-1">Click the button above to create your quick access section.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card) => (
                            <motion.div
                                key={card.id}
                                className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] p-6 hover:bg-white/[0.07] transition-all duration-500"
                            >
                                <div className="flex items-center gap-6 mb-4">
                                    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                                        <img 
                                            src={card.img} 
                                            alt={card.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-xl font-bold text-white truncate">{card.name}</h3>
                                        <p className="text-xs text-gray-400 italic opacity-60 font-medium tracking-wide">
                                            {card.name_hi || "No Hindi name"}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                                        <span>Link</span>
                                        <span className="text-gray-300 lowercase font-medium">{card.link}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                                        <span>Border Color</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.border }} />
                                            <span className="text-gray-300 font-medium">{card.border}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => openEditModal(card)}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors text-xs font-bold"
                                    >
                                        <Edit2 className="w-4 h-4 text-cyan-400" />
                                        Edit Card
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteCard(card.id)}
                                        className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
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
                            <form onSubmit={handleSaveCard} className="flex flex-col h-full max-h-[90vh]">
                                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-cyan-500/20 rounded-xl text-cyan-400">
                                            <Layout className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-2xl font-bold">{editingCard ? 'Edit Card' : 'Add New Card'}</h2>
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
                                            <ImageIcon className="w-4 h-4" /> Card Icon / Image
                                            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">Ratio 1:1</span>
                                        </label>
                                        <div className="flex gap-6">
                                            <div className="w-32 h-32 rounded-3xl bg-white/5 border border-dashed border-white/20 overflow-hidden flex items-center justify-center relative group shrink-0">
                                                {form.imageFile || form.img ? (
                                                    <>
                                                        <img 
                                                            src={form.imageFile ? URL.createObjectURL(form.imageFile) : form.img} 
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
                                                    Upload a square icon for the card. Preferred size: 512x512px.
                                                </p>
                                                <div className="relative">
                                                    <input 
                                                        type="text" 
                                                        placeholder="Or paste direct image URL..."
                                                        value={form.img}
                                                        onChange={(e) => setForm({ ...form, img: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Name Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Card Name (English)</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                                                placeholder="e.g., Kundali"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Name (Hindi)</label>
                                            <input 
                                                type="text"
                                                value={form.name_hi}
                                                onChange={(e) => setForm({ ...form, name_hi: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                                                placeholder="उदा. कुण्डली"
                                            />
                                        </div>
                                    </div>

                                    {/* Link and Style Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Navigation Link</label>
                                            <input 
                                                type="text" 
                                                required
                                                value={form.link}
                                                onChange={(e) => setForm({ ...form, link: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                                                placeholder="/kundli"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Border Color (Hex)</label>
                                            <div className="flex gap-3">
                                                <input 
                                                    type="color"
                                                    value={form.border}
                                                    onChange={(e) => setForm({ ...form, border: e.target.value })}
                                                    className="w-14 h-14 bg-transparent border-none p-0 cursor-pointer"
                                                />
                                                <input 
                                                    type="text"
                                                    value={form.border}
                                                    onChange={(e) => setForm({ ...form, border: e.target.value })}
                                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                                                    placeholder="#f97316"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Background Gradient Classes (Tailwind)</label>
                                        <input 
                                            type="text"
                                            value={form.color}
                                            onChange={(e) => setForm({ ...form, color: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                                            placeholder="from-orange-500/10 to-red-500/10"
                                        />
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
                                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (editingCard ? 'Update Card' : 'Create Card')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{ __html: `
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
            ` }} />
        </div>
    );
}
