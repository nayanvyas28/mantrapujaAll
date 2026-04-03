"use client";

import { useState, useEffect } from "react";
import {
    getPoojas, updatePooja, Pooja,
    getBlogs, updateBlog, Blog,
    getLocations, updateLocation, Location,
    getServingCities, createServingCity, updateServingCity, deleteServingCity, ServingCity,
    bulkUpdateCityOrder
} from "@/lib/contentService";
import { Reorder } from "framer-motion";
import {
    ShoppingBag, BookOpen, MapPin,
    CheckCircle2, Circle, Search,
    Zap, Star, Loader2, Plus, Trash2,
    MoveUp, MoveDown, Globe, GripVertical, Pencil, Save, X
} from "lucide-react";

type Section = 'poojas' | 'blogs' | 'locations' | 'cities';

export default function HomeCustomizer() {
    const [activeSection, setActiveSection] = useState<Section>('poojas');
    const [poojas, setPoojas] = useState<Pooja[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [cities, setCities] = useState<ServingCity[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [newCityName, setNewCityName] = useState("");

    // Edit State
    const [editingCityId, setEditingCityId] = useState<string | null>(null);
    const [editCityName, setEditCityName] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [pData, bData, lData, cData] = await Promise.all([
                getPoojas(),
                getBlogs(),
                getLocations(),
                getServingCities()
            ]);
            setPoojas(pData);
            setBlogs(bData);
            setLocations(lData);
            setCities(cData);
            console.log("Admin: Loaded serving cities:", cData);
        } catch (error) {
            console.error("Failed to load data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePooja = async (pooja: Pooja, field: 'is_hero' | 'is_featured') => {
        setUpdatingId(`${pooja.id}-${field}`);
        try {
            await updatePooja(pooja.id, { [field]: !pooja[field] });
            setPoojas(prev => prev.map(p => p.id === pooja.id ? { ...p, [field]: !p[field] } : p));
        } catch (error) {
            alert("Update failed: " + (error as any).message);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleToggleBlog = async (blog: Blog) => {
        setUpdatingId(blog.id);
        try {
            await updateBlog(blog.id, { is_featured: !blog.is_featured });
            setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, is_featured: !b.is_featured } : b));
        } catch (error) {
            alert("Update failed: " + (error as any).message);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleToggleLocation = async (location: Location) => {
        setUpdatingId(location.id);
        try {
            await updateLocation(location.id, { is_featured: !location.is_featured });
            setLocations(prev => prev.map(l => l.id === location.id ? { ...l, is_featured: !l.is_featured } : l));
        } catch (error) {
            alert("Update failed: " + (error as any).message);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleAddCity = async () => {
        if (!newCityName.trim()) return;
        setSubmitting(true);
        try {
            const newCity = await createServingCity({
                name: newCityName.trim(),
                display_order: cities.length + 1,
                is_active: true
            });
            if (newCity) {
                setCities(prev => [...prev, newCity]);
                setNewCityName("");
            }
        } catch (error) {
            console.error("Add city failed:", error);
            alert("Failed to add city: " + (error as any).message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleCity = async (city: ServingCity) => {
        if (!city.id) return;
        setUpdatingId(city.id);
        try {
            await updateServingCity(city.id, { is_active: !city.is_active });
            setCities(prev => prev.map(c => c.id === city.id ? { ...c, is_active: !c.is_active } : c));
        } catch (error) {
            alert("Update failed: " + (error as any).message);
        } finally {
            setUpdatingId(null);
        }
    };

    const startEditing = (city: ServingCity) => {
        setEditingCityId(city.id!);
        setEditCityName(city.name);
    };

    const cancelEditing = () => {
        setEditingCityId(null);
        setEditCityName("");
    };

    const saveEditCity = async () => {
        if (!editingCityId || !editCityName.trim()) return;
        setUpdatingId(editingCityId);
        try {
            const updated = await updateServingCity(editingCityId, { name: editCityName.trim() });
            if (updated) {
                setCities(prev => prev.map(c => c.id === editingCityId ? updated : c));
                setEditingCityId(null);
                setEditCityName("");
            }
        } catch (error) {
            console.error("Save edit failed:", error);
            alert("Failed to save changes: " + (error as any).message);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDeleteCity = async (id: string) => {
        setUpdatingId(id);
        try {
            console.log("Attempting to delete city:", id);
            await deleteServingCity(id);
            setCities(prev => prev.filter(c => c.id !== id));
            console.log("City deleted successfully");
        } catch (error) {
            console.error("Delete failed:", error);
            const msg = (error as any).message || "Unknown error";
            alert(`Delete failed: ${msg}. Check console for details.`);
        } finally {
            setUpdatingId(null);
        }
    };


    const persistCityOrder = async (newCities: ServingCity[]) => {
        setCities(newCities);
        try {
            const updates = newCities.map((city, idx) => ({
                id: city.id!,
                display_order: idx + 1
            }));
            await bulkUpdateCityOrder(updates);
        } catch (error) {
            console.error("Failed to persist city order:", error);
        }
    };

    const filteredItems = () => {
        const query = searchQuery.toLowerCase();
        if (activeSection === 'poojas') {
            return poojas.filter(p => p.name.toLowerCase().includes(query) || p.slug.toLowerCase().includes(query));
        } else if (activeSection === 'blogs') {
            return blogs.filter(b => b.title.toLowerCase().includes(query) || b.slug.toLowerCase().includes(query));
        } else {
            return locations.filter(l => l.name.toLowerCase().includes(query) || l.slug.toLowerCase().includes(query));
        }
    };

    const counts = {
        hero: poojas.filter(p => p.is_hero).length,
        featuredPoojas: poojas.filter(p => p.is_featured).length,
        featuredBlogs: blogs.filter(b => b.is_featured).length,
        featuredLocations: locations.filter(l => l.is_featured).length,
        activeCities: cities.filter(c => c.is_active).length
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20">
            <Loader2 className="animate-spin text-orange-500 mb-4" size={48} />
            <p className="text-gray-500 font-medium tracking-tight">Loading home page content...</p>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#111] p-4 rounded-xl border dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-lg"><Zap size={18} /></div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hero Section</span>
                    </div>
                    <div className="text-2xl font-black">{counts.hero}<span className="text-gray-400 text-sm font-normal"> / 3</span></div>
                </div>
                <div className="bg-white dark:bg-[#111] p-4 rounded-xl border dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg"><Star size={18} /></div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Featured Pujas</span>
                    </div>
                    <div className="text-2xl font-black">{counts.featuredPoojas}<span className="text-gray-400 text-sm font-normal"> / 3</span></div>
                </div>
                <div className="bg-white dark:bg-[#111] p-4 rounded-xl border dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-lg"><BookOpen size={18} /></div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Top Blogs</span>
                    </div>
                    <div className="text-2xl font-black">{counts.featuredBlogs}<span className="text-gray-400 text-sm font-normal"> / 3</span></div>
                </div>
                <div className="bg-white dark:bg-[#111] p-4 rounded-xl border dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-pink-100 dark:bg-pink-900/20 text-pink-600 rounded-lg"><Globe size={18} /></div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Serving Cities</span>
                    </div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">{counts.activeCities}<span className="text-gray-400 text-sm font-normal"> Active</span></div>
                </div>
            </div>

            {/* Navigation & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-[#111] p-4 rounded-xl border dark:border-gray-800 shadow-sm">
                <div className="flex bg-gray-100 dark:bg-[#1a1a1a] p-1 rounded-xl w-full md:w-auto">
                    <button
                        onClick={() => setActiveSection('poojas')}
                        className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeSection === 'poojas' ? 'bg-white dark:bg-[#222] shadow-md text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <ShoppingBag size={16} /> Pujas
                    </button>
                    <button
                        onClick={() => setActiveSection('blogs')}
                        className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeSection === 'blogs' ? 'bg-white dark:bg-[#222] shadow-md text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <BookOpen size={16} /> Articles
                    </button>
                    <button
                        onClick={() => setActiveSection('locations')}
                        className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeSection === 'locations' ? 'bg-white dark:bg-[#222] shadow-md text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <MapPin size={16} /> Locations
                    </button>
                    <button
                        onClick={() => setActiveSection('cities')}
                        className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeSection === 'cities' ? 'bg-white dark:bg-[#222] shadow-md text-pink-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Globe size={16} /> Footer Cities
                    </button>
                </div>

                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder={`Search ${activeSection}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] border dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </div>

            {/* Selection Grid / List */}
            {activeSection !== 'cities' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems().map((item: any) => (
                        <div
                            key={item.id}
                            className={`group p-4 bg-white dark:bg-[#111] rounded-2xl border dark:border-gray-800 transition-all hover:shadow-lg ${(activeSection === 'poojas' && (item.is_featured || item.is_hero)) ||
                                item.is_featured ? 'ring-2 ring-orange-500/50 border-orange-500/50 bg-orange-50/5 dark:bg-orange-500/5' : ''
                                }`}
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#222] flex-shrink-0">
                                    <img
                                        src={(item.images?.[0]) || (item.image_url) || "/logo.png"}
                                        alt={item.name || item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 dark:text-white truncate" title={item.name || item.title}>
                                        {item.name || item.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 font-mono truncate">{item.slug}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 items-center justify-between border-t dark:border-gray-800 pt-4">
                                {activeSection === 'poojas' ? (
                                    <>
                                        <button
                                            disabled={updatingId?.includes(item.id)}
                                            onClick={() => handleTogglePooja(item, 'is_hero')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${item.is_hero ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 hover:bg-gray-200'}`}
                                        >
                                            {updatingId === `${item.id}-is_hero` ? <Loader2 size={12} className="animate-spin" /> : <Zap size={14} />}
                                            Hero Selection
                                        </button>
                                        <button
                                            disabled={updatingId?.includes(item.id)}
                                            onClick={() => handleTogglePooja(item, 'is_featured')}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${item.is_featured ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 hover:bg-gray-200'}`}
                                        >
                                            {updatingId === `${item.id}-is_featured` ? <Loader2 size={12} className="animate-spin" /> : <Star size={14} />}
                                            Featured Card
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        disabled={updatingId === item.id}
                                        onClick={() => activeSection === 'blogs' ? handleToggleBlog(item) : handleToggleLocation(item)}
                                        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${item.is_featured ? 'bg-emerald-600 text-white' : 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 hover:bg-gray-200'}`}
                                    >
                                        {updatingId === item.id ? <Loader2 size={12} className="animate-spin" /> : (item.is_featured ? <CheckCircle2 size={14} /> : <Circle size={14} />)}
                                        {item.is_featured ? 'Selected for Home' : 'Show on Home Page'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {filteredItems().length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-500">
                            <Search size={48} className="mx-auto mb-4 opacity-10" />
                            <p className="font-medium">No results found for "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white dark:bg-[#111] rounded-2xl border dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Enter new city name (e.g. Mumbai, Surat)..."
                                value={newCityName}
                                onChange={(e) => setNewCityName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddCity()}
                                className="flex-1 px-4 py-2.5 bg-white dark:bg-[#1a1a1a] border dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
                            />
                            <button
                                onClick={handleAddCity}
                                disabled={!newCityName.trim() || submitting}
                                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
                            >
                                {submitting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                                Add City
                            </button>
                        </div>
                    </div>

                    <div className="divide-y dark:divide-gray-800 max-h-[600px] overflow-y-auto">
                        {!searchQuery.trim() ? (
                            <Reorder.Group
                                axis="y"
                                values={cities}
                                onReorder={persistCityOrder}
                                className="divide-y dark:divide-gray-800"
                            >
                                {cities.map((city) => (
                                    <Reorder.Item
                                        key={city.id}
                                        value={city}
                                        className="p-4 flex items-center justify-between group transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/40 bg-white dark:bg-[#111]"
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="cursor-grab active:cursor-grabbing text-gray-400 p-1 hover:text-orange-500 transition-colors">
                                                <GripVertical size={18} />
                                            </div>
                                            <div className="flex-1">
                                                {editingCityId === city.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={editCityName}
                                                            onChange={(e) => setEditCityName(e.target.value)}
                                                            className="px-2 py-1 text-sm border rounded dark:bg-[#222] dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                            autoFocus
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') saveEditCity();
                                                                if (e.key === 'Escape') cancelEditing();
                                                            }}
                                                        />
                                                        <button onClick={saveEditCity} disabled={updatingId === city.id} className="text-emerald-500 hover:text-emerald-600 p-1"><Save size={16} /></button>
                                                        <button onClick={cancelEditing} className="text-gray-400 hover:text-gray-600 p-1"><X size={16} /></button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <p className={`font-bold text-gray-900 dark:text-white ${!city.is_active ? 'text-gray-400 line-through' : ''}`}>
                                                            {city.name || "Untitled City"}
                                                        </p>
                                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Order: {city.display_order}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {editingCityId !== city.id && (
                                                <button
                                                    onClick={() => startEditing(city)}
                                                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                                    title="Edit Name"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleToggleCity(city)}
                                                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${city.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}
                                            >
                                                {city.is_active ? 'Active' : 'Hidden'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCity(city.id!)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        ) : (
                            <div className="divide-y dark:divide-gray-800">
                                {cities.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((city) => (
                                    <div key={city.id} className="p-4 flex items-center justify-between group transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/40">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="text-gray-300 p-1">
                                                <GripVertical size={18} />
                                            </div>
                                            <div className="flex-1">
                                                {editingCityId === city.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={editCityName}
                                                            onChange={(e) => setEditCityName(e.target.value)}
                                                            className="px-2 py-1 text-sm border rounded dark:bg-[#222] dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                            autoFocus
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') saveEditCity();
                                                                if (e.key === 'Escape') cancelEditing();
                                                            }}
                                                        />
                                                        <button onClick={saveEditCity} disabled={updatingId === city.id} className="text-emerald-500 hover:text-emerald-600 p-1"><Save size={16} /></button>
                                                        <button onClick={cancelEditing} className="text-gray-400 hover:text-gray-600 p-1"><X size={16} /></button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <p className={`font-bold text-gray-900 dark:text-white ${!city.is_active ? 'text-gray-400 line-through' : ''}`}>
                                                            {city.name}
                                                        </p>
                                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Order: {city.display_order}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {editingCityId !== city.id && (
                                                <button
                                                    onClick={() => startEditing(city)}
                                                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                                    title="Edit Name"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleToggleCity(city)}
                                                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${city.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}
                                            >
                                                {city.is_active ? 'Active' : 'Hidden'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCity(city.id!)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
