"use client";

import { useState, useEffect } from "react";
import { Pooja, getPoojas, createPooja, updatePooja, deletePooja } from "@/lib/contentService";
import { Plus, Edit, Trash2, Save, X, Search, Image as ImageIcon } from "lucide-react";

export default function ProductManager() {
    const [poojas, setPoojas] = useState<Pooja[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPooja, setEditingPooja] = useState<Pooja | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Form State
    const [formData, setFormData] = useState<Partial<Pooja>>({
        name: "",
        slug: "",
        description: "",
        price: 0,
        seo_title: "",
        seo_description: "",
        is_featured: false,
        is_hero: false
    });

    useEffect(() => {
        loadPoojas();
    }, []);

    const loadPoojas = async () => {
        setLoading(true);
        try {
            const data = await getPoojas();
            setPoojas(data);
        } catch (error) {
            console.error("Error loading poojas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setFormData({
            name: "",
            slug: "",
            description: "",
            price: 0,
            seo_title: "",
            seo_description: "",
            is_featured: false,
            is_hero: false
        });
        setIsCreating(true);
        setEditingPooja(null);
    };

    const handleEdit = (pooja: Pooja) => {
        setFormData({
            name: pooja.name,
            slug: pooja.slug,
            description: pooja.description,
            price: pooja.price,
            seo_title: pooja.seo_title,
            seo_description: pooja.seo_description,
            is_featured: pooja.is_featured,
            is_hero: pooja.is_hero
        });
        setEditingPooja(pooja);
        setIsCreating(true); // Open form
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingPooja) {
                await updatePooja(editingPooja.id, formData);
                alert("Pooja updated!");
            } else {
                await createPooja(formData);
                alert("Pooja created!");
            }
            setIsCreating(false);
            setEditingPooja(null);
            loadPoojas();
        } catch (error: any) {
            alert("Error saving: " + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this Pooja?")) return;
        try {
            await deletePooja(id);
            loadPoojas();
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    const filteredPoojas = poojas.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-2xl">🛍️</span> Product Module (Poojas)
                </h2>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search poojas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-[#111] dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <Plus size={16} /> Add Pooja
                    </button>
                </div>
            </div>

            {isCreating && (
                <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-gray-800 animate-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">{editingPooja ? 'Edit Pooja' : 'New Pooja'}</h3>
                        <button onClick={() => setIsCreating(false)}><X size={20} className="text-gray-400 hover:text-red-500" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value, slug: !editingPooja ? e.target.value.toLowerCase().replace(/ /g, '-') : formData.slug })}
                                    className="w-full text-sm p-2 bg-white dark:bg-[#111] border dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Slug</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full text-sm p-2 bg-white dark:bg-[#111] border dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Price (₹)</label>
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                    className="w-full text-sm p-2 bg-white dark:bg-[#111] border dark:border-gray-700 rounded focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full text-sm p-2 bg-white dark:bg-[#111] border dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t dark:border-gray-800">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Home Display Settings</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 p-3 bg-white dark:bg-[#111] border dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_featured}
                                        onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div>
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">Home Featured</div>
                                        <div className="text-[10px] text-gray-500">Show in "Popular Vedic Pujas" section</div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 bg-white dark:bg-[#111] border dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_hero}
                                        onChange={e => setFormData({ ...formData, is_hero: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                    />
                                    <div>
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">Hero Section</div>
                                        <div className="text-[10px] text-gray-500">Show in the top Hero section</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4 border-t dark:border-gray-800">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">SEO Metadata</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">SEO Title</label>
                                    <input
                                        type="text"
                                        value={formData.seo_title}
                                        onChange={e => setFormData({ ...formData, seo_title: e.target.value })}
                                        className="w-full text-sm p-2 bg-white dark:bg-[#111] border dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">SEO Description</label>
                                    <input
                                        type="text"
                                        value={formData.seo_description}
                                        onChange={e => setFormData({ ...formData, seo_description: e.target.value })}
                                        className="w-full text-sm p-2 bg-white dark:bg-[#111] border dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-colors"
                            >
                                <Save size={16} /> Save Product
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow border border-gray-100 dark:border-gray-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-[#252525] border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Name</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Slug</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Display</th>
                            <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-400">Loading products...</td></tr>
                        ) : filteredPoojas.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-400">No poojas found.</td></tr>
                        ) : (
                            filteredPoojas.map(pooja => (
                                <tr key={pooja.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium">{pooja.name}</td>
                                    <td className="p-4 text-sm text-gray-500 font-mono">{pooja.slug}</td>
                                    <td className="p-4 font-mono text-emerald-600 font-bold">₹{pooja.price}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {pooja.is_featured && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-blue-200">Featured</span>}
                                            {pooja.is_hero && <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-orange-200">Hero</span>}
                                            {!pooja.is_featured && !pooja.is_hero && <span className="text-[10px] text-gray-400 italic">None</span>}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <button onClick={() => handleEdit(pooja)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(pooja.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
