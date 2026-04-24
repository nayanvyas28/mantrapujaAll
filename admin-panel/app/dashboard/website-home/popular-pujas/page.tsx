"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Loader2, ArrowLeft, Save, Star, Search, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Puja {
    id: string;
    name: string;
    is_featured: boolean;
    image_url?: string;
    price: number;
}

export default function PopularPujasManager() {
    const supabase = createClient();
    const [pujas, setPujas] = useState<Puja[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchPujas();
    }, []);

    async function fetchPujas() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('poojas')
                .select('id, name, is_featured, image_url, price')
                .eq('is_active', true)
                .order('name');
            
            if (error) throw error;
            if (data) {
                setPujas(data);
                // Initialize selected Set based on current is_featured flag
                const initialSelected = new Set<string>();
                data.forEach(p => {
                    if (p.is_featured) initialSelected.add(p.id);
                });
                setSelectedIds(initialSelected);
            }
        } catch (error: any) {
            alert('Error fetching pujas: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                if (next.size >= 6) {
                    alert("You can only select a maximum of 6 popular pujas for the homepage.");
                    return prev;
                }
                next.add(id);
            }
            return next;
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/popular-pujas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selectedIds: Array.from(selectedIds) }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Save failed');

            alert(`Successfully saved ${result.count} Popular Pujas for the Homepage!`);
            fetchPujas(); // Refresh to confirm
        } catch (error: any) {
            alert('Error saving: ' + error.message);
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const filteredPujas = pujas.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
             {/* Background elements */}
             <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
            
             <div className="max-w-5xl mx-auto relative z-10 w-full">
                <Link
                    href="/dashboard/website-home"
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Website Home Settings
                </Link>

                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-gradient-to-tr from-amber-500/20 to-red-500/20 rounded-2xl border border-white/10 shadow-lg shadow-amber-500/5">
                                <Star className="w-6 h-6 text-amber-400" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                Popular Vedic Pujas
                            </h1>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                            Select up to <strong className="text-white">6 pujas</strong> to feature on the website's homepage. The selected rituals will appear in the "Popular Vedic Pujas" grid.
                        </p>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-2xl font-black transition-all shadow-xl hover:shadow-orange-500/20 active:scale-[0.98] uppercase text-xs tracking-widest disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Changes
                    </button>
                </header>

                <div className="mb-8 flex items-center justify-between">
                    <div className="relative group max-w-sm w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-amber-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search pujas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-amber-500/50 transition-all text-sm"
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                        <span className="text-sm text-gray-400">Selected:</span>
                        <span className={`text-lg font-bold ${selectedIds.size === 6 ? 'text-amber-400' : 'text-white'}`}>
                            {selectedIds.size} / 6
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-amber-500/50" />
                        <p className="text-gray-500 text-sm font-medium animate-pulse">Loading Pujas...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPujas.map((puja) => {
                            const isSelected = selectedIds.has(puja.id);
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={puja.id}
                                    onClick={() => toggleSelection(puja.id)}
                                    className={`relative cursor-pointer group flex items-center p-3 rounded-2xl border transition-all ${
                                        isSelected 
                                            ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                                            : 'bg-white/5 border-white/10 hover:border-white/20'
                                    }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 mr-4 border ${isSelected ? 'border-amber-500/50' : 'border-white/10'}`}>
                                        {puja.image_url ? (
                                            <img src={puja.image_url} alt={puja.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xs">No Img</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 pr-6">
                                        <h3 className={`font-semibold truncate text-sm ${isSelected ? 'text-amber-400' : 'text-gray-200'}`}>
                                            {puja.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-0.5">₹{puja.price}</p>
                                    </div>
                                    
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                            isSelected ? 'border-amber-500 bg-amber-500' : 'border-gray-500 group-hover:border-gray-400'
                                        }`}>
                                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#111]" />}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
             </div>
        </div>
    );
}
