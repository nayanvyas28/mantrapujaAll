"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, Save, RefreshCw, AlertCircle, 
    CheckCircle2, Sun, Moon, Calendar, 
    Star, LayoutGrid, List, Sparkles,
    ChevronRight, ExternalLink
} from 'lucide-react';

const ZODIAC_SIGNS = [
    { name: 'Aries', slug: 'aries', icon: '/zodiac/aries.png' },
    { name: 'Taurus', slug: 'taurus', icon: '/zodiac/taurus.png' },
    { name: 'Gemini', slug: 'gemini', icon: '/zodiac/gemini.png' },
    { name: 'Cancer', slug: 'cancer', icon: '/zodiac/cancer.png' },
    { name: 'Leo', slug: 'leo', icon: '/zodiac/leo.png' },
    { name: 'Virgo', slug: 'virgo', icon: '/zodiac/virgo.png' },
    { name: 'Libra', slug: 'libra', icon: '/zodiac/libra.png' },
    { name: 'Scorpio', slug: 'scorpio', icon: '/zodiac/scorpion.png' },
    { name: 'Sagittarius', slug: 'sagittarius', icon: '/zodiac/sagittarius.png' },
    { name: 'Capricorn', slug: 'capricorn', icon: '/zodiac/capricorn.png' },
    { name: 'Aquarius', slug: 'aquarius', icon: '/zodiac/aquarius.png' },
    { name: 'Pisces', slug: 'pisces', icon: '/zodiac/pisces.png' },
];

export default function HoroscopeManager() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [horoscopes, setHoroscopes] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeSign, setActiveSign] = useState<any>(null);

    // Initial Load & Category Setup
    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                // 1. Ensure "Rashifal" category exists
                let { data: cat } = await supabase
                    .from('categories')
                    .select('id')
                    .eq('slug', 'rashifal')
                    .maybeSingle();

                if (!cat) {
                    const { data: newCat, error: createError } = await supabase
                        .from('categories')
                        .insert([{ 
                            name: 'Rashifal', 
                            slug: 'rashifal', 
                            description: 'Daily, Monthly, Yearly Horoscopes',
                            order: 10 
                        }])
                        .select()
                        .single();
                    
                    if (createError) throw createError;
                    cat = newCat;
                }
                if (cat) {
                    setCategoryId(cat.id);

                    // 2. Fetch existing sign pages
                    const { data: pages } = await supabase
                        .from('pages')
                        .select('*')
                        .eq('category_id', cat.id);

                    // 3. Merge with default ZODIAC_SIGNS to ensure all 12 exist
                    const merged = ZODIAC_SIGNS.map(z => {
                        const existing = (pages || []).find(p => p.slug === z.slug);
                        return {
                            id: existing?.id || null,
                            title: z.name,
                            slug: z.slug,
                            icon: z.icon,
                            content: existing?.content || { daily: '', monthly: '', yearly: '' }
                        };
                    });
                    setHoroscopes(merged);
                }
            } catch (err) {
                console.error("Horoscope Manager Error:", err);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    const handleSave = async (sign: any) => {
        setSaving(sign.slug);
        try {
            if (sign.id) {
                // Update
                const { error } = await supabase
                    .from('pages')
                    .update({ content: sign.content })
                    .eq('id', sign.id);
                if (error) throw error;
            } else {
                // Create
                const { data: newPage, error } = await supabase
                    .from('pages')
                    .insert([{
                        category_id: categoryId,
                        title: sign.title,
                        slug: sign.slug,
                        content: sign.content,
                        order: ZODIAC_SIGNS.findIndex(z => z.slug === sign.slug)
                    }])
                    .select()
                    .single();
                if (error) throw error;
                
                // Update local state with new ID
                setHoroscopes(prev => prev.map(h => h.slug === sign.slug ? { ...h, id: newPage.id } : h));
            }
            alert(`Saved ${sign.title} successfully!`);
        } catch (err: any) {
            alert(`Error saving: ${err.message}`);
        } finally {
            setSaving(null);
        }
    };

    const updateContent = (slug: string, field: string, value: string) => {
        setHoroscopes(prev => prev.map(h => 
            h.slug === slug ? { ...h, content: { ...h.content, [field]: value } } : h
        ));
    };

    const filteredHoroscopes = horoscopes.filter(h => 
        h.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                <RefreshCw className="animate-spin text-saffron" size={48} />
                <p className="text-zinc-500 font-black uppercase text-xs tracking-widest">Consulting the Stars...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-[40px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div>
                    <h2 className="text-3xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
                        <Sparkles className="text-saffron" />
                        Horoscope Manager
                    </h2>
                    <p className="text-zinc-500 font-medium">Manage Daily, Monthly, and Yearly Rashifal for all 12 Zodiac signs.</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find a sign..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-full text-sm font-medium focus:ring-2 focus:ring-saffron"
                        />
                    </div>
                </div>
            </div>

            {/* Grid of Signs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredHoroscopes.map((sign) => (
                    <motion.div 
                        key={sign.slug}
                        layoutId={sign.slug}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-800 p-2 border border-zinc-100 dark:border-white/5 group-hover:rotate-6 transition-transform">
                                    <img src={sign.icon} alt={sign.title} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-xl font-black text-zinc-900 dark:text-white">{sign.title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleSave(sign)}
                                    disabled={saving === sign.slug}
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${saving === sign.slug ? 'bg-zinc-100' : 'bg-saffron/10 text-saffron hover:bg-saffron hover:text-white'}`}
                                >
                                    {saving === sign.slug ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
                                </button>
                                <Link target="_blank" href={`/rashifal/${sign.slug}`} className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center hover:text-zinc-900 dark:hover:text-white">
                                    <ExternalLink size={20} />
                                </Link>
                            </div>
                        </div>

                        {/* Quick Inputs */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    <span className="flex items-center gap-1"><Sun size={12} className="text-orange-500" /> Daily</span>
                                    <span>{sign.content.daily.length} chars</span>
                                </div>
                                <textarea 
                                    value={sign.content.daily}
                                    onChange={(e) => updateContent(sign.slug, 'daily', e.target.value)}
                                    placeholder="Write daily horoscope..."
                                    className="w-full h-24 p-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-xs font-medium resize-none focus:ring-1 focus:ring-saffron"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    <span className="flex items-center gap-1"><Calendar size={12} className="text-blue-500" /> Monthly</span>
                                    <span>{sign.content.monthly.length} chars</span>
                                </div>
                                <textarea 
                                    value={sign.content.monthly}
                                    onChange={(e) => updateContent(sign.slug, 'monthly', e.target.value)}
                                    placeholder="Write monthly horoscope..."
                                    className="w-full h-24 p-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-xs font-medium resize-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    <span className="flex items-center gap-1"><Star size={12} className="text-purple-500" /> Yearly</span>
                                    <span>{sign.content.yearly.length} chars</span>
                                </div>
                                <textarea 
                                    value={sign.content.yearly}
                                    onChange={(e) => updateContent(sign.slug, 'yearly', e.target.value)}
                                    placeholder="Write yearly horoscope..."
                                    className="w-full h-24 p-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-xs font-medium resize-none focus:ring-1 focus:ring-purple-500"
                                />
                            </div>
                        </div>

                        {!sign.id && (
                            <div className="mt-6 flex items-center justify-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 rounded-2xl">
                                <AlertCircle size={14} className="text-amber-600" />
                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">New Entry - Needs initial save</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
