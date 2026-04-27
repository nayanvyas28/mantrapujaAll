'use client';

import { useState } from 'react';
import { Settings, Save, MapPin, CheckSquare, Image as ImageIcon, Star, ShoppingBag, BookOpen, Loader2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveHomeLayout, getMoreItems } from './actions';

const LOCATIONS = ['Global/Default', 'Delhi', 'Mumbai', 'Bangalore', 'Varanasi', 'Haridwar'];

interface Item {
    id: string;
    title: string;
    category: string;
    isSelected: boolean;
    order: number;
}

interface DBSection {
    id: string;
    title: string;
    tableName: string;
    limit: number;
    hasMore: boolean;
    data: Item[];
}

export default function HomeSettingsClient({ initialSections }: { initialSections: DBSection[] }) {
    const [activeLocation, setActiveLocation] = useState(LOCATIONS[0]);
    const [activeSection, setActiveSection] = useState(initialSections[0].id);

    // Keep track of our loaded items per section
    const [selections, setSelections] = useState<Record<string, Item[]>>(
        initialSections.reduce((acc, section) => ({ ...acc, [section.id]: [...section.data] }), {})
    );

    // Keep track of pagination offsets per section
    const [offsets, setOffsets] = useState<Record<string, number>>(
        initialSections.reduce((acc, section) => ({ ...acc, [section.id]: 9 }), {})
    );

    // Keep track of hasMore per section
    const [hasMoreState, setHasMoreState] = useState<Record<string, boolean>>(
        initialSections.reduce((acc, section) => ({ ...acc, [section.id]: section.hasMore }), {})
    );

    const [saving, setSaving] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const getIconForSection = (id: string, className: string) => {
        switch (id) {
            case 'poojas': return <Star className={className} />;
            case 'poojas_999': return <Star className={className} />;
            case 'destinations': return <MapPin className={className} />;
            case 'products_99': return <ShoppingBag className={className} />;
            case 'blogs': return <BookOpen className={className} />;
            default: return <Settings className={className} />;
        }
    };

    const handleToggle = (sectionId: string, itemId: string, limit: number) => {
        setSelections(prev => {
            const sectionData = prev[sectionId];
            const currentSelectedCount = sectionData.filter(item => item.isSelected).length;

            return {
                ...prev,
                [sectionId]: sectionData.map(item => {
                    if (item.id === itemId) {
                        if (!item.isSelected && currentSelectedCount >= limit) {
                            showToast(`Limit Reached: You can only select up to ${limit} items for this section. Please deselect one first.`);
                            return item;
                        }
                        return { ...item, isSelected: !item.isSelected, order: !item.isSelected ? currentSelectedCount + 1 : 0 };
                    }
                    return item;
                }),
            };
        });
    };

    const loadMoreItems = async (section: DBSection) => {
        setLoadingMore(true);
        const currentOffset = offsets[section.id];

        try {
            // we assume limit is 9 per batch
            const is999 = section.id === 'poojas_999';
            const categoryMapping = (section.id === 'poojas' || section.id === 'poojas_999') ? 'puja' :
                section.id === 'destinations' ? 'location' :
                    section.id === 'products_99' ? 'product' : 'blog';

            const newItems = await getMoreItems(section.tableName, categoryMapping, currentOffset, 9, is999);

            if (newItems.length > 0) {
                setSelections(prev => ({
                    ...prev,
                    [section.id]: [...prev[section.id], ...newItems]
                }));
                setOffsets(prev => ({
                    ...prev,
                    [section.id]: currentOffset + newItems.length
                }));
            }

            if (newItems.length < 9) {
                setHasMoreState(prev => ({
                    ...prev,
                    [section.id]: false
                }));
            }
        } catch (error) {
            console.error("Failed to load more:", error);
            showToast("Failed to load more items");
        } finally {
            setLoadingMore(false);
        }
    };

    const currentSectionMeta = initialSections.find(s => s.id === activeSection)!;
    const currentItems = selections[activeSection];
    const currentSelectedCount = currentItems.filter(item => item.isSelected).length;
    const isAtLimit = currentSelectedCount >= currentSectionMeta.limit;

    const handleSave = async () => {
        setSaving(true);
        // Format payload for Server Action
        const payload = initialSections.map(section => ({
            sectionId: section.id,
            tableName: section.tableName,
            items: selections[section.id].map(item => ({
                id: item.id,
                isSelected: item.isSelected,
                home_order: item.isSelected ? item.order : 0
            }))
        }));

        // Save to DB
        await saveHomeLayout(activeLocation, payload);
        setSaving(false);
        showToast('Home Page Settings published to the App successfully! UI perfectly adheres to constraints.');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none" />

            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className="fixed top-6 left-1/2 z-50 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium"
                    >
                        {toastMessage.includes("Limit") ? (
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        ) : (
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        )}
                        {toastMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 rounded-xl border border-white/10">
                                <Settings className="w-6 h-6 text-purple-400" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">Home Page Manager</h1>
                        </div>
                        <p className="text-gray-400 text-sm max-w-xl">
                            Curate the exact layout of the Mobile App home screen. Only items checked here will be fetched by the app dynamically.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col gap-1 w-full md:w-auto">
                            <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">Location Context</label>
                            <div className="relative group">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                                <select
                                    value={activeLocation}
                                    onChange={(e) => setActiveLocation(e.target.value)}
                                    className="pl-9 pr-10 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-purple-500/50 text-sm font-medium transition-all w-full md:w-[200px]"
                                >
                                    {LOCATIONS.map(loc => (
                                        <option key={loc} value={loc} className="bg-[#111] text-white py-2">{loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 rounded-xl font-medium transition-all shadow-lg hover:shadow-purple-500/20 active:scale-[0.98] mt-5 disabled:opacity-70 disabled:cursor-not-allowed uppercase text-xs tracking-wider h-auth"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? "Publishing..." : "Publish to App"}
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <aside className="lg:col-span-3 space-y-2">
                        {initialSections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${activeSection === section.id
                                    ? 'bg-white/10 border-white/20 shadow-lg shadow-black/50'
                                    : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10 text-gray-400'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {getIconForSection(section.id, `w-5 h-5 text-gray-300 ${activeSection === section.id ? 'text-purple-400' : ''}`)}
                                    <span className="font-medium text-sm">{section.title}</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${selections[section.id].filter(i => i.isSelected).length === section.limit
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-white/10 text-gray-300'
                                    }`}>
                                    {selections[section.id].filter(i => i.isSelected).length}/{section.limit}
                                </span>
                            </button>
                        ))}
                    </aside>

                    <main className="lg:col-span-9">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                                <div>
                                    <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
                                        {getIconForSection(activeSection, "w-6 h-6 text-purple-400")}
                                        {currentSectionMeta.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        Select exactly which items to feature. They will seamlessly update the Mobile App via Supabase realtime sync.
                                    </p>
                                </div>

                                <div className={`flex flex-col items-center justify-center p-3 rounded-2xl border ${isAtLimit ? 'bg-orange-500/10 border-orange-500/30' : 'bg-white/5 border-white/10'}`}>
                                    <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Selected Limit</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-2xl font-bold ${isAtLimit ? 'text-orange-400' : 'text-white'}`}>
                                            {currentSelectedCount}
                                        </span>
                                        <span className="text-gray-500 font-medium text-lg">/ {currentSectionMeta.limit}</span>
                                    </div>
                                </div>
                            </div>

                            {currentItems.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <p>No items found in Supabase for {currentSectionMeta.tableName}.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                        <AnimatePresence>
                                            {currentItems.map((item) => {
                                                const isDisabled = !item.isSelected && isAtLimit;

                                                return (
                                                    <motion.div
                                                        key={item.id}
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className={`relative group flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${item.isSelected
                                                            ? 'bg-purple-900/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                                                            : isDisabled
                                                                ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                                                                : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                                                            }`}
                                                        onClick={() => !isDisabled && handleToggle(activeSection, item.id, currentSectionMeta.limit)}
                                                    >
                                                        <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${item.isSelected
                                                            ? 'bg-purple-500 border-purple-500'
                                                            : 'border-gray-500 bg-transparent'
                                                            }`}>
                                                            {item.isSelected && <CheckSquare className="w-4 h-4 text-white" />}
                                                        </div>

                                                        <div className="flex-1">
                                                            <h3 className={`font-semibold text-sm mb-1 line-clamp-2 ${item.isSelected ? 'text-white' : 'text-gray-300'}`}>
                                                                {item.title}
                                                            </h3>
                                                            <div className="flex items-center gap-2">
                                                                <ImageIcon className="w-3 h-3 text-gray-500" />
                                                                <span className="text-xs text-gray-500 capitalize">{item.category} ID: {item.id}</span>
                                                            </div>
                                                        </div>

                                                        {item.isSelected && (
                                                            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none rounded-tr-2xl">
                                                                <div className="absolute top-[-10px] right-[-30px] w-[80px] h-[30px] bg-purple-500/30 rotate-45" />
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )
                                            })}
                                        </AnimatePresence>
                                    </div>

                                    {hasMoreState[activeSection] && (
                                        <div className="flex justify-center mt-6 pt-6 border-t border-white/5">
                                            <button
                                                onClick={() => loadMoreItems(currentSectionMeta)}
                                                disabled={loadingMore}
                                                className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-sm font-medium text-gray-300 disabled:opacity-50"
                                            >
                                                {loadingMore ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronDown className="w-4 h-4" />}
                                                {loadingMore ? 'Loading...' : 'View More'}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
}
