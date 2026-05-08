"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Search, Edit2, Trash2, Globe, Save, X, Image as ImageIcon, Filter } from "lucide-react";

type SeoData = {
    id?: string;
    path: string;
    title: string;
    description: string;
    keywords: string;
    og_image: string;
    updated_at: string;
};

type RouteEntry = {
    path: string;
    type: 'static' | 'category' | 'service' | 'blog' | 'custom';
    name: string;
    seo: SeoData | null;
};

const STATIC_ROUTES = [
    { path: '/', name: 'Home' },
    { path: '/about-us', name: 'About Us' },
    { path: '/contact-us', name: 'Contact Us' },
    { path: '/locations', name: 'Locations' },
    { path: '/pooja-services', name: 'All Services' },
    { path: '/blog', name: 'Blog Home' },
];

export default function SeoManager() {
    const [routes, setRoutes] = useState<RouteEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<string>('all');

    // Modal & Editing State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRoute, setEditingRoute] = useState<RouteEntry | null>(null);
    const [formData, setFormData] = useState<SeoData>({
        path: "",
        title: "",
        description: "",
        keywords: "",
        og_image: "",
        updated_at: ""
    });

    useEffect(() => {
        fetchAllRoutes();
    }, []);

    const fetchAllRoutes = async () => {
        setLoading(true);
        const allRoutes: RouteEntry[] = [];

        try {
            // 1. Static Routes
            STATIC_ROUTES.forEach(r => {
                allRoutes.push({
                    path: r.path,
                    type: 'static',
                    name: r.name,
                    seo: null
                });
            });

            // 2. Fetch Categories (Dynamic)
            const { data: categories } = await supabase.from('categories').select('id, name, slug');
            if (categories) {
                categories.forEach((cat: any) => {
                    allRoutes.push({
                        path: `/${cat.slug}`,
                        type: 'category',
                        name: `Category: ${cat.name}`,
                        seo: null
                    });
                });
            }

            // 3. Fetch Service Pages
            // We need category slug for the path. We'll join in JS to be safe.
            const { data: pages } = await supabase.from('pages').select('id, title, slug, category_id');
            if (pages && categories) {
                pages.forEach((page: any) => {
                    const cat = categories.find((c: any) => c.id === page.category_id);
                    if (cat) {
                        allRoutes.push({
                            path: `/${cat.slug}/${page.slug}`,
                            type: 'service',
                            name: page.title,
                            seo: null
                        });
                    }
                });
            }

            // 4. Fetch Blog Posts
            const { data: blogs } = await supabase.from('Final_blog').select('id, title, slug').eq('published', true).eq('is_active', true);
            if (blogs) {
                blogs.forEach((blog: any) => {
                    allRoutes.push({
                        path: `/blog/${blog.slug}`,
                        type: 'blog',
                        name: blog.title,
                        seo: null
                    });
                });
            }

            // 5. Fetch Existing SEO Metadata
            const { data: seoEntries } = await supabase.from('seo_metadata').select('*');

            // 6. Merge SEO Data
            if (seoEntries) {
                // Map SEO entries to existing routes
                seoEntries.forEach((seo: any) => {
                    const existingRoute = allRoutes.find(r => r.path === seo.path);
                    if (existingRoute) {
                        existingRoute.seo = seo;
                    } else {
                        // This is a "Custom" route (maybe deleted page or manual entry)
                        allRoutes.push({
                            path: seo.path,
                            type: 'custom',
                            name: 'Custom Route',
                            seo: seo
                        });
                    }
                });
            }

            // Sort by Path
            allRoutes.sort((a, b) => a.path.localeCompare(b.path));
            setRoutes(allRoutes);

        } catch (error) {
            console.error("Error fetching routes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (route: RouteEntry) => {
        setEditingRoute(route);
        setFormData({
            path: route.path,
            title: route.seo?.title || route.name, // Default to page name if no SEO title
            description: route.seo?.description || "",
            keywords: route.seo?.keywords || "",
            og_image: route.seo?.og_image || "",
            updated_at: route.seo?.updated_at || ""
        });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!formData.title) {
            alert("Title is required.");
            return;
        }

        const dataToSave = {
            path: formData.path,
            title: formData.title,
            description: formData.description,
            keywords: formData.keywords,
            og_image: formData.og_image,
            updated_at: new Date().toISOString()
        };

        let resultError;

        if (editingRoute?.seo?.id) {
            // Update existing
            const { error } = await supabase
                .from('seo_metadata')
                .update(dataToSave)
                .eq('id', editingRoute.seo.id);
            resultError = error;
        } else {
            // Insert new
            const { error } = await supabase
                .from('seo_metadata')
                .insert([dataToSave]);
            resultError = error;
        }

        if (resultError) {
            alert("Error saving SEO data: " + resultError.message);
        } else {
            setIsModalOpen(false);
            fetchAllRoutes(); // Refresh list
            // alert("SEO Data Saved!"); // Optional: less intrusive notification preferable
        }
    };

    const handleDelete = async (seoId: string, path: string) => {
        if (!confirm(`Are you sure you want to delete custom SEO data for "${path}"? This will revert the page to default SEO.`)) return;

        const { error } = await supabase.from('seo_metadata').delete().eq('id', seoId);
        if (error) {
            alert("Error deleting: " + error.message);
        } else {
            fetchAllRoutes();
        }
    };

    // Filter Logic
    const filteredRoutes = routes.filter(r => {
        const matchesSearch =
            r.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (r.seo?.title && r.seo.title.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesType = filterType === 'all' || r.type === filterType;

        return matchesSearch && matchesType;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Globe className="text-blue-500" /> SEO Manager
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage metadata for all {routes.length} pages. Pages with <span className="text-green-600 font-bold">Custom SEO</span> override defaults.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    {/* Filter Type */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="pl-10 pr-8 py-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="all">All Types</option>
                            <option value="static">Static Pages</option>
                            <option value="category">Categories</option>
                            <option value="service">Services</option>
                            <option value="blog">Blog Posts</option>
                            <option value="custom">Custom Paths</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search pages..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => {
                            setEditingRoute({
                                path: '/',
                                type: 'custom',
                                name: 'New Custom Route',
                                seo: null
                            });
                            setFormData({
                                path: "/",
                                title: "",
                                description: "",
                                keywords: "",
                                og_image: "",
                                updated_at: ""
                            });
                            setIsModalOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors whitespace-nowrap justify-center"
                    >
                        <Plus size={18} /> Add Custom
                    </button>
                </div>
            </header>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-250px)]">
                <div className="overflow-auto flex-1">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-gray-500 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 font-medium w-1/4">Page / Path</th>
                                <th className="px-6 py-4 font-medium w-32">Type</th>
                                <th className="px-6 py-4 font-medium w-1/4">SEO Title</th>
                                <th className="px-6 py-4 font-medium w-1/3">Description</th>
                                <th className="px-6 py-4 font-medium text-right w-24">Status</th>
                                <th className="px-6 py-4 font-medium text-right w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {loading ? (
                                <tr><td colSpan={6} className="p-12 text-center text-gray-400">Loading pages...</td></tr>
                            ) : filteredRoutes.length === 0 ? (
                                <tr><td colSpan={6} className="p-12 text-center text-gray-400 italic">No pages found matching your filters.</td></tr>
                            ) : (
                                filteredRoutes.map((route, idx) => (
                                    <tr key={`${route.path}-${idx}`} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900 dark:text-gray-100">{route.name}</div>
                                            <div className="font-mono text-xs text-blue-600 dark:text-blue-400 truncate max-w-[250px]" title={route.path}>
                                                {route.path}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                                                ${route.type === 'static' ? 'bg-gray-100 text-gray-600' :
                                                    route.type === 'category' ? 'bg-purple-100 text-purple-600' :
                                                        route.type === 'service' ? 'bg-orange-100 text-orange-600' :
                                                            route.type === 'blog' ? 'bg-green-100 text-green-600' :
                                                                'bg-blue-100 text-blue-600'
                                                }`}>
                                                {route.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {route.seo ? (
                                                <span className="text-gray-800 dark:text-gray-200 font-medium">{route.seo.title}</span>
                                            ) : (
                                                <span className="text-gray-400 italic text-xs">Default</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 truncate max-w-xs" title={route.seo?.description || ""}>
                                            {route.seo?.description || <span className="text-gray-300 italic">-</span>}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {route.seo ? (
                                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Custom</span>
                                            ) : (
                                                <span className="text-xs text-gray-400">Default</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(route)}
                                                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                    title={route.seo ? "Edit SEO" : "Add SEO"}
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                {route.seo && (
                                                    <button
                                                        onClick={() => handleDelete(route.seo!.id!, route.path)}
                                                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Reset to Default"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs text-center text-gray-500">
                    Showing {filteredRoutes.length} of {routes.length} total pages
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-700 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Edit SEO Metadata
                                </h3>
                                <div className="text-sm font-mono text-blue-600 mt-1">{formData.path}</div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 overflow-y-auto">
                            {editingRoute?.type === 'custom' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Path *</label>
                                    <input
                                        type="text"
                                        placeholder="/custom-path"
                                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                                        value={formData.path}
                                        onChange={e => setFormData({ ...formData, path: e.target.value })}
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Page Title *</label>
                                <input
                                    type="text"
                                    placeholder="Page Title"
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                                <div className="text-right text-xs mt-1 text-gray-400">{formData.title.length} / 60 chars</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Description</label>
                                <textarea
                                    rows={3}
                                    placeholder="A brief description of the page for search engines..."
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                                <div className="text-right text-xs mt-1 text-gray-400">{formData.description.length} / 160 chars</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keywords</label>
                                <input
                                    type="text"
                                    placeholder="pooja, vedic rituals, hinduism"
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.keywords}
                                    onChange={e => setFormData({ ...formData, keywords: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OG Image URL</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                            value={formData.og_image}
                                            onChange={e => setFormData({ ...formData, og_image: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-500/30 transition-colors font-bold flex items-center gap-2"
                            >
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
