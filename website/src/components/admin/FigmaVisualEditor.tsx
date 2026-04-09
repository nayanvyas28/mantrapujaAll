"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { supabase } from "@/lib/supabaseClient";
import { getSiteStructure, SiteNode, updatePage, createPage, getSavedComponents, SavedComponent, saveComponent, deleteComponent, getCategories, updateCategory } from "@/lib/contentService";
import { Category } from "@/types/content";
import { systemComponents } from "@/lib/systemComponents";
import {
    Folder, FileText, ChevronRight, ChevronDown, Save,
    Monitor, Smartphone, Tablet, MousePointer, Type,
    Layers, Settings, Eye, EyeOff, Zap, Search, Plus, MoreHorizontal, ArrowLeft,
    Box, Image as ImageIcon, Grid, Palette, Trash2, Layout, Maximize, Move,
    AlignLeft, AlignCenter, AlignRight, AlignJustify, LogOut, FileJson, // Icons for Sidebar Rail
    ShoppingBag, Database, UploadCloud, Globe, Settings2, Home // Admin Sidebar Icons
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AssetManager from "./AssetManager";
import CategoryManager from "@/components/admin/CategoryManager";
import PageManager from "@/components/admin/PageManager";
import SeoManager from "@/components/admin/SeoManager";
import ServerManager from "@/components/admin/ServerManager";
import BulkImport from "@/components/admin/BulkImport";
import ProductManager from "@/components/admin/ProductManager";
import HomeCustomizer from "@/components/admin/HomeCustomizer";

// --- Types ---
type DeviceMode = 'desktop' | 'tablet' | 'mobile';

function SavedComponentsList() {
    const [components, setComponents] = useState<SavedComponent[]>([]);
    const [loading, setLoading] = useState(true);
    const [previewComponent, setPreviewComponent] = useState<SavedComponent | null>(null);

    useEffect(() => {
        loadComponents();

        // Listen for new components saved from overlay
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'COMPONENT_SAVED') {
                loadComponents();
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const loadComponents = async () => {
        setLoading(true);
        try {
            const data = await getSavedComponents();
            // Merge System Components (at the top) with User Components
            setComponents([...systemComponents, ...data]);
        } catch (e) {
            console.error("Failed to load components", e);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Delete this component?")) return;
        await deleteComponent(id);
        loadComponents();
    };

    const handleDragStart = (e: React.DragEvent, component: SavedComponent) => {
        e.dataTransfer.setData("application/json", JSON.stringify(component));
        e.dataTransfer.effectAllowed = "copy";
    };

    if (loading) return <div className="text-xs text-center text-gray-500 mt-10">Loading components...</div>;

    if (components.length === 0) return (
        <div className="p-4 text-center text-gray-500 text-xs">
            <Box size={32} className="mx-auto mb-2 opacity-20" />
            No saved components.<br />Right-click an element in the editor to save it.
        </div>
    );

    return (
        <>
            <div className="space-y-2 p-1">
                {components.map(comp => (
                    <div
                        key={comp.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, comp)}
                        onClick={() => setPreviewComponent(comp)}
                        className="bg-[#333] p-3 rounded border border-[#444] cursor-pointer hover:border-blue-500 group relative transition-all hover:bg-[#3a3a3a]"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-xs font-bold text-gray-200 truncate pr-4">{comp.name}</div>
                            <div className="flex items-center gap-2">
                                <div className="text-[9px] text-gray-500 uppercase tracking-wider">{comp.category || 'GEN'}</div>
                                {comp.id.startsWith('sys_') && (
                                    <span className="text-[8px] bg-blue-900 text-blue-200 px-1 rounded">SYS</span>
                                )}
                            </div>
                        </div>

                        {!comp.id.startsWith('sys_') && (
                            <button
                                onClick={(e) => handleDelete(comp.id, e)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                                title="Delete"
                            >
                                <Trash2 size={12} />
                            </button>
                        )}

                        {/* Visual Preview (Scaled Grid) */}
                        <div className="bg-white rounded overflow-hidden h-16 flex items-center justify-center relative overscroll-none">
                            {/* Render HTML sanitized/scaled */}
                            <div
                                className="origin-center scale-[0.4] w-[200%] h-[200%] flex items-center justify-center pointer-events-none select-none text-black"
                                dangerouslySetInnerHTML={{ __html: comp.content.html || (typeof comp.content === 'string' ? comp.content : JSON.stringify(comp.content)) }}
                            />
                            {/* Overlay to prevent interaction */}
                            <div className="absolute inset-0 bg-transparent"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Full Preview Modal - Portaled to body to avoid clipping */}
            {previewComponent && typeof document !== 'undefined' && createPortal(
                <div
                    className="visual-editor-portal-modal fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    style={{ zIndex: 2147483647, pointerEvents: 'auto' }}
                    onClick={(e) => {
                        console.log("Backdrop clicked - closing modal");
                        // Ensure we don't close if clicking children (though children stop prop, good verify)
                        if (e.target === e.currentTarget) {
                            setPreviewComponent(null);
                        }
                    }}
                >
                    <div
                        className="bg-white rounded-lg shadow-2xl w-[85vw] h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
                        onClick={(e) => {
                            console.log("Modal content clicked - stopping propagation");
                            e.stopPropagation();
                        }}
                    >
                        <div className="h-14 bg-gray-100 border-b flex items-center justify-between px-6">
                            <h3 className="font-bold text-gray-800 text-lg">{previewComponent.name}</h3>
                            <button
                                onClick={() => {
                                    console.log("X Button clicked");
                                    setPreviewComponent(null);
                                }}
                                className="text-gray-500 hover:text-gray-800 transition-transform hover:rotate-90"
                            >
                                <Plus className="rotate-45" size={28} />
                            </button>
                        </div>
                        <div className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-gray-50 p-10 overflow-hidden flex items-center justify-center relative">
                            {/* Render using Iframe for isolation and style injection */}
                            <iframe
                                title="Component Preview"
                                className="w-full h-full border-none bg-transparent"
                                style={{ pointerEvents: 'none' }} // Disable interaction inside preview
                                srcDoc={`
                                    <!DOCTYPE html>
                                    <html>
                                    <head>
                                        <meta charset="utf-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1">
                                        <script src="https://cdn.tailwindcss.com"></script>
                                        <script>
                                            tailwind.config = {
                                                darkMode: "class",
                                                theme: {
                                                    extend: {
                                                        colors: {
                                                            saffron: { DEFAULT: "#f97316", dark: "#ea580c", light: "#fb923c" },
                                                            gold: { DEFAULT: "#f59e0b", highlight: "#fbbf24", shadow: "#d97706" },
                                                            "cosmic-navy": { DEFAULT: "#0f172a", card: "#1e293b" },
                                                            starlight: { DEFAULT: "#ffffff", warm: "#fff7ed" },
                                                            background: "var(--background)",
                                                            foreground: "var(--foreground)",
                                                            primary: { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
                                                            card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
                                                            popover: { DEFAULT: "var(--popover)", foreground: "var(--popover-foreground)" },
                                                            secondary: { DEFAULT: "var(--secondary)", foreground: "var(--secondary-foreground)" },
                                                            muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
                                                            accent: { DEFAULT: "var(--accent)", foreground: "var(--accent-foreground)" },
                                                            destructive: { DEFAULT: "var(--destructive)", foreground: "var(--destructive-foreground)" },
                                                            border: "var(--border)",
                                                            input: "var(--input)",
                                                            ring: "var(--ring)",
                                                        },
                                                        fontFamily: {
                                                            sans: ["sans-serif"],
                                                            serif: ["serif"],
                                                            mono: ["monospace"],
                                                        }
                                                    }
                                                }
                                            }
                                        </script>
                                        <style>
                                            :root {
                                                --background: #ffffff;
                                                --foreground: #0f172a;
                                                --card: #ffffff;
                                                --card-foreground: #0f172a;
                                                --popover: #ffffff;
                                                --popover-foreground: #0f172a;
                                                --primary: #f97316;
                                                --primary-foreground: #ffffff;
                                                --secondary: #f1f5f9;
                                                --secondary-foreground: #0f172a;
                                                --muted: #f1f5f9;
                                                --muted-foreground: #475569;
                                                --accent: #f97316;
                                                --accent-foreground: #ffffff;
                                                --destructive: #ef4444;
                                                --destructive-foreground: #ffffff;
                                                --border: #e2e8f0;
                                                --input: #e2e8f0;
                                                --ring: #f97316;
                                                --radius: 0.5rem;
                                            }
                                            .dark {
                                                --background: #0f172a;
                                                --foreground: #ffffff;
                                                --card: #1e293b;
                                                --card-foreground: #ffffff;
                                                --popover: #0f172a;
                                                --popover-foreground: #ffffff;
                                                --primary: #f97316;
                                                --primary-foreground: #ffffff;
                                                --secondary: #1e293b;
                                                --secondary-foreground: #ffffff;
                                                --muted: #1e293b;
                                                --muted-foreground: #94a3b8;
                                                --accent: #f97316;
                                                --accent-foreground: #ffffff;
                                                --destructive: #7f1d1d;
                                                --destructive-foreground: #ffffff;
                                                --border: #1e293b;
                                                --input: #1e293b;
                                                --ring: #f97316;
                                            }
                                            body { 
                                                display: flex; 
                                                align-items: center; 
                                                justify-content: center; 
                                                min-height: 100vh; 
                                                background: transparent;
                                                margin: 0;
                                                color: var(--foreground);
                                            }
                                        </style>
                                    </head>
                                    <body>
                                        ${previewComponent.content.html || (typeof previewComponent.content === 'string' ? previewComponent.content : JSON.stringify(previewComponent.content))}
                                    </body>
                                    </html>
                                `}
                            />
                        </div>
                        <div className="h-16 bg-white border-t flex items-center justify-between px-6">
                            <div className="text-sm text-gray-500 flex flex-col">
                                <span className="font-bold text-gray-700">{previewComponent.category || 'General'}</span>
                                <span className="text-xs">Created {new Date(previewComponent.created_at || '').toLocaleDateString()}</span>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        console.log("Close Button clicked");
                                        setPreviewComponent(null);
                                    }}
                                    className="px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg border border-transparent hover:border-gray-300 transition-all"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        console.log("Done Button clicked");
                                        setPreviewComponent(null);
                                    }}
                                    className="px-5 py-2 text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

export default function FigmaVisualEditor() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin");
    };
    const [structure, setStructure] = useState<SiteNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPage, setSelectedPage] = useState<SiteNode | null>(null);
    const [pageContent, setPageContent] = useState("");
    const [saving, setSaving] = useState(false);
    const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

    // Figma State
    const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
    const [zoom, setZoom] = useState(100);
    const [activeTool, setActiveTool] = useState<'layers' | 'components' | 'assets' | 'admin' | 'schema'>('layers');
    const [adminView, setAdminView] = useState<'category_engine' | 'products' | 'seo' | 'server' | 'import' | 'home_customizer'>('category_engine');
    const [categoryView, setCategoryView] = useState<'manager' | 'pages' | 'schema'>('manager');

    // Schema Builder State
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [schemaContent, setSchemaContent] = useState("{}");

    useEffect(() => {
        const fetchCategory = async () => {
            if (activeTool === 'schema' && selectedPage) {
                // Find category from structure
                // Access structure from state directly or pass it if needed. 
                // Since structure is in state, we can traverse it.
                // But structure might be large.
                // Actually, specific logic:
                // If page is a child of a category node in `structure`, we can find it.

                let foundCatId: string | null = null;

                // 1. Check if selectedPage is a category itself (unlikely to be selected as pageContent, but possible in tree)
                if (selectedPage.type === 'category') {
                    foundCatId = selectedPage.id;
                } else {
                    // 2. Find parent
                    for (const cat of structure) {
                        if (cat.type === 'category') {
                            if (cat.children?.some(child => child.id === selectedPage.id)) {
                                foundCatId = cat.id;
                                break;
                            }
                        }
                    }
                }

                if (foundCatId) {
                    // We need to fetch the full category data to get content_structure
                    // `structure` only has basic node info.
                    // We can reuse getCategories but that fetches all.
                    // Let's iterate `structure` which might have data if we hydrated it, but `getSiteStructure` returns lightweight nodes?
                    // Let's use `getCategories` or a cached list if we had it.
                    // For now, let's just fetch all categories and find one, or add `getCategoryById`? 
                    // `getCategoryBySlug` exists.
                    // Let's use `getCategories` for now as it's cached/fast enough or add a specific fetch.
                    // Actually, let's just use `getCategories` since we probably want them all anyway.
                    // Or better, let's rely on `currentCategory` state and fetch it properly.

                    try {
                        const cats = await getCategories();
                        const cat = cats.find(c => c.id === foundCatId);
                        if (cat) {
                            setCurrentCategory(cat);
                            setSchemaContent(JSON.stringify(cat.content_structure || {}, null, 2));
                        }
                    } catch (e) {
                        console.error("Error fetching category for schema:", e);
                    }
                } else {
                    setCurrentCategory(null);
                    setSchemaContent("{}");
                }
            }
        };

        fetchCategory();
    }, [activeTool, selectedPage, structure]);

    // Sync URL with State
    useEffect(() => {
        const view = searchParams.get('view');

        if (!view) {
            // Default to editor if no view is specified
            router.replace('/admin/dashboard?view=editor');
            return;
        }

        if (view === 'editor') {
            if (activeTool === 'admin') {
                setActiveTool('layers'); // Default tool for editor
            }
        } else if (['products', 'seo', 'server', 'import'].includes(view)) {
            setActiveTool('admin');
            setAdminView(view as any);
        } else if (['category_engine', 'manager', 'pages', 'schema', 'categories', 'blogs'].includes(view)) {
            setActiveTool('admin');
            setAdminView('category_engine');
            // Check if specific category view
            if (['manager', 'pages', 'schema'].includes(view)) {
                setCategoryView(view as any);
            } else if (view === 'categories') {
                setCategoryView('manager');
            } else if (view === 'blogs') {
                // TODO: Add Blog Manager
                setCategoryView('manager');
            }
        }
    }, [searchParams]);

    const [leftPanelOpen, setLeftPanelOpen] = useState(true);
    const [rightPanelOpen, setRightPanelOpen] = useState(true);
    const [previewMode, setPreviewMode] = useState(false);

    // Right Panel Tabs
    const [activeRightTab, setActiveRightTab] = useState<'properties' | 'settings' | 'design'>('properties');
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [selectedElement, setSelectedElement] = useState<any>(null); // Visual Element selected in Iframe

    useEffect(() => {
        loadStructure();
    }, []);

    const loadStructure = async () => {
        setLoading(true);
        try {
            const data = await getSiteStructure();
            setStructure(data);
            const expanded: Record<string, boolean> = {};
            data.forEach(cat => expanded[cat.id] = true);
            setExpandedCats(expanded);
        } catch (error) {
            console.error("Error loading structure:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleCat = (id: string) => {
        setExpandedCats(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handlePageSelect = (node: SiteNode) => {
        setSelectedPage(node);

        // Reset SEO info
        setSeoTitle("");
        setSeoDescription("");

        if (node.type === 'page' || node.type === 'static' || node.type === 'blog') {
            let content = "";
            const raw = node.data?.content;
            if (typeof raw === 'string') content = raw;
            else if (typeof raw === 'object' && raw?.text) content = raw.text; // Dynamic Page format
            else if (node.type === 'static' && !node.data) {
                // Initial State for Static Page (before it's overridden)
                content = "";
            }
            setPageContent(content);

            // Populate SEO Fields
            if (node.data) {
                setSeoTitle(node.data.seo_title || node.name || "");
                setSeoDescription(node.data.seo_description || "");
            }
        }
    };

    const [iframeKey, setIframeKey] = useState(0);

    const handleSaveTemplate = async () => {
        const name = prompt("Enter a name for this template:");
        if (!name) return;

        setSaving(true);
        try {
            const { error } = await supabase.from('templates').insert({
                name,
                content: { html: pageContent },
                description: `Created from ${selectedPage?.name || 'Visual Editor'}`
            });

            if (error) throw error;
            alert("Template saved successfully!");
        } catch (err: any) {
            console.error("Error saving template:", err);
            alert("Failed to save template: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleSave = async () => {
        if (!selectedPage) return;
        setSaving(true);
        try {
            if (selectedPage.type === 'page') {
                // Normal Dynamic Page Update
                await updatePage(selectedPage.id, {
                    content: { text: pageContent },
                    seo_title: seoTitle,
                    seo_description: seoDescription
                });
                setIframeKey(prev => prev + 1); // Refresh iframe
            } else if (selectedPage.type === 'static') {
                // --- CONVERTING STATIC TO DYNAMIC OVERRIDE ---
                // We need to upsert this into the 'pages' table.

                // 1. Get a Category ID to attach to (e.g., 'General' or the first one found)
                // If it's a root page (slug starts with / and has no other path segments), we can leave category_id null

                const isRootPage = selectedPage.slug === '/' || selectedPage.slug === '/about-us' || selectedPage.slug === '/contact-us';

                let categoryId = null;

                if (!isRootPage) {
                    categoryId = structure.find(n => n.type === 'category')?.id || null;
                }

                // 2. Create the Page Record
                const newPage = await createPage({
                    title: selectedPage.name,
                    slug: selectedPage.slug === '/' ? '/' : selectedPage.slug.replace(/^\//, ''), // Keep '/' for home, else remove leading slash
                    content: { text: pageContent },
                    category_id: categoryId,
                    order: 0,
                    seo_title: seoTitle || selectedPage.name,
                    seo_description: seoDescription
                });

                if (newPage) {
                    alert("Static page overridden! It is now dynamic.");
                    // Refresh structure to see it as a 'page' type now
                    await loadStructure();
                    setIframeKey(prev => prev + 1); // Refresh iframe
                }
            } else if (selectedPage.type === 'blog') {
                // Blog update logic (if we want to support it here)
                alert("Blog editing is best done in the Blog tab, but saving here is possible if implemented.");
            }

            alert("Saved!");
        } catch (error: any) {
            console.error(error);
            alert("Failed to save: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'ELEMENT_SELECTED') {
                setSelectedElement(event.data.payload);
                if (!rightPanelOpen) setRightPanelOpen(true);
            }
            if (event.data?.type === 'UPDATE_CONTENT') {
                setPageContent(event.data.payload);
            }
            if (event.data?.type === 'SAVE_COMPONENT') {
                console.log("Received SAVE_COMPONENT message:", event.data.payload);
                const { name, content, category } = event.data.payload;
                saveComponent(name, content, category)
                    .then((data) => {
                        console.log("Component saved successfully:", data);
                        alert("Component saved!");
                        window.postMessage({ type: 'COMPONENT_SAVED' }, '*');
                    })
                    .catch(err => {
                        console.error("Failed to save component:", err);
                        alert("Failed to save: " + err.message);
                    });
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [rightPanelOpen]);

    // --- Render Helpers ---

    const getDeviceWidth = () => {
        switch (deviceMode) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            default: return '100%';
        }
    };

    const toggleLeftPanel = (tool: 'layers' | 'components' | 'assets' | 'admin' | 'schema') => {
        if (activeTool === tool && leftPanelOpen) {
            setLeftPanelOpen(false); // Close if clicking same tool
        } else {
            setActiveTool(tool);
            setLeftPanelOpen(true); // Open if different or closed
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-[#1e1e1e] text-white overflow-hidden font-sans">
            {/* --- Top Toolbar --- */}
            {/* --- Top Toolbar Removed (Relocated to Canvas) --- */}

            {/* --- Main Workspace --- */}
            <div className="flex-1 flex overflow-hidden">

                {/* 1. Sidebar Rail (Icon Menu) */}
                {!previewMode && (
                    <div className="w-[48px] bg-[#2c2c2c] border-r border-[#111] flex flex-col items-center py-4 gap-4 z-40">
                        <button
                            onClick={() => toggleLeftPanel('layers')}
                            className={`p-2 rounded-lg transition-all ${activeTool === 'layers' && leftPanelOpen ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                            title="Layers"
                        >
                            <Layers size={20} />
                        </button>
                        <button
                            onClick={() => toggleLeftPanel('components')}
                            className={`p-2 rounded-lg transition-all ${activeTool === 'components' && leftPanelOpen ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                            title="Components"
                        >
                            <Box size={20} />
                        </button>
                        <button
                            onClick={() => toggleLeftPanel('assets')}
                            className={`p-2 rounded-lg transition-all ${activeTool === 'assets' && leftPanelOpen ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                            title="Assets"
                        >
                            <Grid size={20} />
                        </button>
                        <button
                            onClick={() => {
                                setActiveTool('admin'); // Force state update
                                router.push('/admin/dashboard?view=category_engine');
                            }}
                            className={`p-2 rounded-lg transition-all ${activeTool === 'admin' ? 'bg-bhagwa text-white shadow-lg' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                            title="Admin Dashboard"
                        >
                            <Layout size={20} />
                        </button>
                        <button
                            onClick={() => toggleLeftPanel('schema')}
                            className={`p-2 rounded-lg transition-all ${activeTool === 'schema' && leftPanelOpen ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                            title="JSON Format Maker"
                        >
                            <FileJson size={20} />
                        </button>

                        <div className="mt-auto flex flex-col gap-4 items-center w-full pb-4">
                            <button
                                onClick={() => {
                                    if (activeTool !== 'admin') {
                                        setActiveRightTab('settings');
                                        if (!rightPanelOpen) setRightPanelOpen(true);
                                    } else {
                                        alert("Exit Admin Mode first to view Page Settings");
                                    }
                                }}
                                className={`p-2 rounded-lg transition-all ${activeRightTab === 'settings' && rightPanelOpen && activeTool !== 'admin' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                                title="Page Settings"
                            >
                                <Settings size={20} />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {/* 2. Collapsible Left Panel (Drawer) */}
                {leftPanelOpen && !previewMode && (
                    <div className="w-[260px] bg-[#252525] border-r border-[#111] flex flex-col shadow-xl z-30 animate-in slide-in-from-left-5 duration-200">
                        <div className="p-3 border-b border-[#111] flex items-center justify-between">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                {activeTool === 'layers' ? 'Layers' : activeTool === 'admin' ? 'Admin Menu' : activeTool === 'components' ? 'Saved' : 'Assets'}
                            </h3>
                            <div className="flex gap-2 text-gray-500">
                                <Search size={14} className="hover:text-white cursor-pointer" />
                                <Plus size={14} className="hover:text-white cursor-pointer" />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-transparent">
                            {activeTool === 'layers' && (
                                loading ? (
                                    <div className="text-xs text-center text-gray-500 mt-10">Loading map...</div>
                                ) : (
                                    <div className="space-y-0.5">
                                        {structure.map(node => (
                                            <div key={node.id}>
                                                {(node.type === 'category' || node.type === 'blog_root') ? (
                                                    <>
                                                        <div
                                                            className={`flex items-center px-2 py-1.5 rounded cursor-pointer group ${selectedPage?.id === node.id ? 'bg-[#0d99ff]/20 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}
                                                            onClick={() => { toggleCat(node.id); handlePageSelect(node); }}
                                                        >
                                                            <span className="p-0.5 rounded hover:bg-white/10 mr-1" onClick={(e) => { e.stopPropagation(); toggleCat(node.id); }}>
                                                                {expandedCats[node.id] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                                            </span>
                                                            <Folder size={14} className={`mr-2 ${node.type === 'blog_root' ? 'text-purple-400' : 'text-yellow-500'}`} />
                                                            <span className="text-xs font-medium truncate select-none">{node.name}</span>
                                                        </div>
                                                        {expandedCats[node.id] && (
                                                            <div className="ml-4 border-l border-[#444] pl-1 mt-0.5 space-y-0.5">
                                                                {node.children?.map(child => (
                                                                    <div
                                                                        key={child.id}
                                                                        onClick={() => handlePageSelect(child)}
                                                                        className={`flex items-center px-2 py-1.5 rounded cursor-pointer ${selectedPage?.id === child.id ? 'bg-[#0d99ff] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}
                                                                    >
                                                                        <span className="w-3"></span>
                                                                        <span className="mr-2 opacity-80">
                                                                            {child.type === 'static' ? '🏠' : child.type === 'blog' ? '📄' : <FileText size={12} />}
                                                                        </span>
                                                                        <span className="text-xs truncate select-none">{child.name}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div
                                                        onClick={() => handlePageSelect(node)}
                                                        className={`flex items-center px-2 py-1.5 rounded cursor-pointer ${selectedPage?.id === node.id ? 'bg-[#0d99ff] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}
                                                    >
                                                        <span className="w-4"></span>
                                                        <span className="mr-2 opacity-80">
                                                            {node.slug === '/' ? '🏠' : '📄'}
                                                        </span>
                                                        <span className="text-xs font-medium truncate select-none">{node.name}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}

                            {activeTool === 'components' && (
                                <SavedComponentsList />
                            )}

                            {activeTool === 'assets' && (
                                <AssetManager onSelect={(url) => {
                                    // If an image is selected in the canvas, update it
                                    if (selectedElement && selectedElement.tagName === 'IMG') {
                                        const iframe = document.querySelector('iframe');
                                        iframe?.contentWindow?.postMessage({
                                            type: 'UPDATE_ATTRIBUTE',
                                            payload: {
                                                id: selectedElement.id,
                                                attribute: 'src',
                                                value: url
                                            }
                                        }, '*');
                                        // Update local state
                                        setSelectedElement((prev: any) => prev ? { ...prev, src: url } : null);
                                    } else {
                                        // Otherwise, maybe just copy to clipboard or show alert
                                        // For now, let's copy to clipboard as implemented in AssetManager
                                    }
                                }} />
                            )}

                            {/* Admin Menu Removed from Sidebar (Moved to Top Header) */}

                            {activeTool === 'schema' && (
                                <div className="p-4 space-y-4">
                                    <h3 className="text-sm font-bold text-gray-300 mb-2 border-b border-gray-700 pb-2">Category Schema</h3>

                                    {!selectedPage ? (
                                        <div className="text-gray-500 text-xs text-center mt-10">
                                            Select a page to edit its category schema.
                                        </div>
                                    ) : (
                                        <>
                                            <div className="text-xs text-gray-400 mb-2">
                                                Page: <span className="text-white font-medium">{selectedPage.name}</span>
                                            </div>

                                            {loading ? (
                                                <div className="text-xs text-center text-gray-500">Loading category...</div>
                                            ) : currentCategory ? (
                                                <div className="space-y-3">
                                                    <div className="text-xs text-gray-400">
                                                        Category: <span className="text-saffron font-medium">{currentCategory.name}</span>
                                                    </div>

                                                    <textarea
                                                        value={schemaContent}
                                                        onChange={(e) => setSchemaContent(e.target.value)}
                                                        className="w-full h-[400px] bg-[#111] border border-[#333] rounded p-2 text-xs font-mono text-green-400 focus:outline-none focus:border-blue-500"
                                                        placeholder="{}"
                                                    />

                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={async () => {
                                                                try {
                                                                    if (!currentCategory) return;
                                                                    const parsed = JSON.parse(schemaContent);
                                                                    // Save to category
                                                                    await updateCategory(currentCategory.id, { content_structure: parsed });
                                                                    alert("Schema saved!");
                                                                } catch (e) {
                                                                    alert("Invalid JSON");
                                                                }
                                                            }}
                                                            className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded"
                                                        >
                                                            Save Schema
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                try {
                                                                    setSchemaContent(JSON.stringify(JSON.parse(schemaContent), null, 2));
                                                                } catch (e) {
                                                                    alert("Invalid JSON");
                                                                }
                                                            }}
                                                            className="px-3 py-1.5 bg-[#333] hover:bg-[#444] text-white text-xs rounded"
                                                        >
                                                            Format
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-xs text-red-400 text-center">
                                                    Could not find category for this page.
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 3. Canvas (Center) */}
                <div className="flex-1 bg-[#1e1e1e] relative overflow-hidden flex flex-col">
                    {activeTool === 'admin' ? (
                        <div className="flex-1 bg-gray-50 dark:bg-black h-full overflow-hidden flex flex-col animate-in fade-in duration-300">

                            {/* --- 1. TOP MODULE NAVIGATION --- */}
                            <header className="bg-white dark:bg-[#111] border-b border-gray-200 dark:border-gray-800 h-14 flex items-center justify-between px-4 z-30 shrink-0">
                                <div className="flex items-center gap-6">
                                    {/* Logo / Brand */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-bhagwa text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-orange-500/20">
                                            M
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-none">Admin</h2>
                                        </div>
                                    </div>

                                    {/* Module Tabs */}
                                    <nav className="flex items-center gap-1">
                                        <button
                                            onClick={() => router.push('/admin/dashboard?view=category_engine')}
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${adminView === 'category_engine' ? 'bg-bhagwa/10 text-bhagwa' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
                                        >
                                            <Folder size={16} /> Category Engine
                                        </button>
                                        <button
                                            onClick={() => router.push('/admin/dashboard?view=products')}
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${adminView === 'products' ? 'bg-bhagwa/10 text-bhagwa' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
                                        >
                                            <ShoppingBag size={16} /> Product Module
                                        </button>
                                        <button
                                            onClick={() => router.push('/admin/dashboard?view=seo')}
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${adminView === 'seo' ? 'bg-bhagwa/10 text-bhagwa' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
                                        >
                                            <Globe size={16} /> Global SEO
                                        </button>
                                        <button
                                            onClick={() => router.push('/admin/dashboard?view=server')}
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${adminView === 'server' ? 'bg-bhagwa/10 text-bhagwa' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
                                        >
                                            <Database size={16} /> Server Config
                                        </button>
                                        <button
                                            onClick={() => setAdminView('home_customizer')}
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${adminView === 'home_customizer' ? 'bg-bhagwa/10 text-bhagwa' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
                                        >
                                            <Home size={16} /> Home Setup
                                        </button>
                                    </nav>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => {
                                            router.push('/admin/dashboard?view=editor');
                                        }}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors border border-gray-200 dark:border-gray-700"
                                    >
                                        <Layout size={16} /> Exit to Visual Editor
                                    </button>
                                    <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-800 mx-1"></div>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                        <Settings size={18} />
                                    </button>
                                </div>
                            </header>

                            {/* --- 2. WORKSPACE (Sidebar + Content) --- */}
                            <div className="flex-1 flex overflow-hidden">

                                {/* --- CONTEXTUAL SIDEBAR --- */}
                                <aside className="w-60 bg-white dark:bg-[#111] border-r border-gray-200 dark:border-gray-800 flex flex-col z-20 overflow-y-auto">

                                    {/* Sidebar Header (Context Title) */}
                                    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            {adminView === 'category_engine' ? 'Category Tools' :
                                                adminView === 'products' ? 'Product Tools' : 'System Tools'}
                                        </h3>
                                    </div>

                                    {/* Sidebar Menu Items */}
                                    <nav className="flex-1 p-2 space-y-1">

                                        {/* CATEGORY ENGINE MENU */}
                                        {adminView === 'category_engine' && (
                                            <>
                                                <button
                                                    onClick={() => router.push('/admin/dashboard?view=manager')}
                                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all ${categoryView === 'manager' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                                >
                                                    <Folder size={16} /> Category Manager
                                                </button>
                                                <button
                                                    onClick={() => router.push('/admin/dashboard?view=pages')}
                                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all ${categoryView === 'pages' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                                >
                                                    <FileText size={16} /> Page Manager
                                                </button>
                                                <button
                                                    onClick={() => { router.push('/admin/dashboard?view=schema'); toggleLeftPanel('schema'); }}
                                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all ${categoryView === 'schema' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                                >
                                                    <FileJson size={16} /> Schema Architect
                                                </button>
                                                <div className="h-[1px] bg-gray-100 dark:bg-gray-800 my-2 mx-3"></div>
                                                <button
                                                    onClick={() => router.push('/admin/dashboard?view=import')}
                                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5`}
                                                >
                                                    <UploadCloud size={16} /> Bulk Category Import
                                                </button>
                                            </>
                                        )}

                                        {/* PRODUCT MODULE MENU */}
                                        {adminView === 'products' && (
                                            <>
                                                <button
                                                    onClick={() => router.push('/admin/dashboard?view=products')}
                                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all bg-bhagwa/10 text-bhagwa font-medium`}
                                                >
                                                    <ShoppingBag size={16} /> Pooja Manager
                                                </button>
                                                <button
                                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all text-gray-400 cursor-not-allowed`}
                                                >
                                                    <Settings2 size={16} /> Entities & Pricing
                                                </button>
                                            </>
                                        )}

                                        {/* SEO MENU */}
                                        {adminView === 'seo' && (
                                            <button
                                                onClick={() => router.push('/admin/dashboard?view=seo')}
                                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all bg-blue-50 text-blue-600 font-medium`}
                                            >
                                                <Globe size={16} /> SEO Manager
                                            </button>
                                        )}

                                        {/* SERVER MENU */}
                                        {adminView === 'server' && (
                                            <button
                                                onClick={() => router.push('/admin/dashboard?view=server')}
                                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all bg-gray-100 text-gray-800 font-medium`}
                                            >
                                                <Database size={16} /> Server Config
                                            </button>
                                        )}

                                        {/* IMPORT MENU (Fallback if clicked via top) */}
                                        {adminView === 'import' && (
                                            <button
                                                onClick={() => router.push('/admin/dashboard?view=import')}
                                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all bg-green-50 text-green-600 font-medium`}
                                            >
                                                <UploadCloud size={16} /> Bulk Import
                                            </button>
                                        )}

                                    </nav>
                                </aside>

                                {/* --- ADMIN CONTENT AREA --- */}
                                <main className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50 dark:bg-[#0a0a0a] relative">
                                    {/* Header */}
                                    <header className="bg-white dark:bg-[#111] border-b border-gray-200 dark:border-gray-800 px-8 py-5 flex items-center justify-between shadow-sm z-10">
                                        <div>
                                            <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                                                {adminView === 'category_engine' ? (
                                                    categoryView === 'manager' ? 'Category Manager' :
                                                        categoryView === 'pages' ? 'Page Manager' : 'Schema Architect'
                                                ) :
                                                    adminView === 'products' ? 'Product Module' :
                                                        adminView === 'home_customizer' ? 'Home Page Customizer' :
                                                            adminView === 'seo' ? 'SEO & Metadata' :
                                                                adminView === 'server' ? 'Server Configuration' : 'Bulk Import'}
                                            </h1>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {adminView === 'category_engine' ? 'Manage your categories, pages, and content structures.' :
                                                    adminView === 'products' ? 'Manage your product catalog and pricing.' :
                                                        adminView === 'home_customizer' ? 'Select featured poojas, blogs, and locations for your home page.' :
                                                            'Configure system variables and metadata.'}
                                            </p>
                                        </div>
                                    </header>

                                    {/* Scrollable Content */}
                                    <div className="flex-1 overflow-y-auto p-8">
                                        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                                            {adminView === 'category_engine' && (
                                                <>
                                                    {categoryView === 'manager' && <CategoryManager />}
                                                    {categoryView === 'pages' && <PageManager />}
                                                    {categoryView === 'schema' && (
                                                        <div className="bg-white dark:bg-[#151515] border border-dashed border-gray-300 dark:border-gray-800 rounded-xl p-12 text-center">
                                                            <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                                                <FileJson className="text-orange-500" size={32} />
                                                            </div>
                                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Schema Architect Active</h3>
                                                            <p className="text-gray-500 max-w-lg mx-auto mb-8">
                                                                The Schema Editor is now active in the left sidebar. Use it to define the JSON structure for your categories.
                                                            </p>
                                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#222] rounded-lg text-sm text-gray-600 dark:text-gray-400">
                                                                <ArrowLeft size={16} /> Look at the sidebar on the left
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {adminView === 'products' && <ProductManager />}
                                            {adminView === 'home_customizer' && <HomeCustomizer />}
                                            {adminView === 'server' && <ServerManager />}
                                            {adminView === 'seo' && <SeoManager />}
                                            {adminView === 'import' && <BulkImport />}

                                        </div>
                                    </div>
                                </main>

                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="absolute inset-0 z-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                            {/* Floating Toolbar (Replacing Top Navbar) */}
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-[#2c2c2c]/90 backdrop-blur border border-[#444] p-2 rounded-xl shadow-2xl">
                                <div className="flex bg-[#111] rounded-lg p-1">
                                    <button onClick={() => setDeviceMode('desktop')} className={`p-1.5 rounded ${deviceMode === 'desktop' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-gray-300'}`}><Monitor size={16} /></button>
                                    <button onClick={() => setDeviceMode('tablet')} className={`p-1.5 rounded ${deviceMode === 'tablet' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-gray-300'}`}><Tablet size={16} /></button>
                                    <button onClick={() => setDeviceMode('mobile')} className={`p-1.5 rounded ${deviceMode === 'mobile' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-gray-300'}`}><Smartphone size={16} /></button>
                                </div>
                                <div className="w-[1px] h-6 bg-[#444]"></div>
                                <div className="flex items-center gap-2 text-xs">
                                    <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="hover:text-white text-gray-400">-</button>
                                    <span>{zoom}%</span>
                                    <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="hover:text-white text-gray-400">+</button>
                                </div>
                                <div className="w-[1px] h-6 bg-[#444]"></div>
                                <button onClick={handleSave} disabled={saving} className="text-xs font-bold bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-500 text-white transition-colors">
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                                <button onClick={() => setPreviewMode(!previewMode)} className="text-gray-400 hover:text-white" title="Toggle Preview">
                                    {previewMode ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                                <div className="w-[1px] h-6 bg-[#444]"></div>
                                <button
                                    onClick={() => {
                                        setActiveTool('admin'); // Force state update
                                        router.push('/admin/dashboard?view=category_engine');
                                    }}
                                    className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-2"
                                    title="Go to Admin Dashboard"
                                >
                                    <Layout size={14} /> Admin
                                </button>
                            </div>

                            {/* Device Frame */}
                            <div className="relative z-10 flex-1 flex items-center justify-center p-10 overflow-auto">
                                {selectedPage ? (
                                    <div
                                        className={`bg-white shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out relative origin-center`}
                                        style={{
                                            width: getDeviceWidth(),
                                            height: deviceMode !== 'desktop' ? '800px' : '100%',
                                            transform: `scale(${zoom / 100})`,
                                            borderRadius: deviceMode !== 'desktop' ? '20px' : '4px'
                                        }}
                                    >
                                        <iframe
                                            key={iframeKey}
                                            src={`${selectedPage.slug.startsWith('/') ? selectedPage.slug : `/${selectedPage.slug}`}?edit=true`}
                                            className="w-full h-full border-none bg-white"
                                            title="Visual Preview"
                                            style={{ borderRadius: deviceMode !== 'desktop' ? '18px' : '0' }}
                                        />
                                        <div className="absolute inset-0 pointer-events-none ring-1 ring-black/5 rounded-[inherit]"></div>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 flex flex-col items-center">
                                        <MousePointer size={48} className="mb-4 opacity-20" />
                                        <p className="text-sm">Select a frame to edit</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* 4. Properties Panel (Right) */}
                {rightPanelOpen && !previewMode && activeTool !== 'admin' && (
                    <div className="w-[300px] bg-[#2c2c2c] border-l border-[#111] flex flex-col">
                        {/* Tab Switcher */}
                        <div className="flex border-b border-[#111]">
                            <button
                                onClick={() => setActiveRightTab('properties')}
                                className={`flex-1 py-3 text-xs font-medium flex items-center justify-center gap-2 ${activeRightTab === 'properties' ? 'text-white border-b-2 border-blue-500 bg-[#333]' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Settings size={14} /> Props
                            </button>
                            <button
                                onClick={() => setActiveRightTab('design')}
                                className={`flex-1 py-3 text-xs font-medium flex items-center justify-center gap-2 ${activeRightTab === 'design' ? 'text-white border-b-2 border-blue-500 bg-[#333]' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Palette size={14} /> Design
                            </button>
                            <button
                                onClick={() => setActiveRightTab('settings')}
                                className={`flex-1 py-3 text-xs font-medium flex items-center justify-center gap-2 ${activeRightTab === 'settings' ? 'text-white border-b-2 border-blue-500 bg-[#333]' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <Monitor size={14} /> Page
                            </button>
                        </div>

                        {/* CONTENT: Design Panel */}
                        {activeRightTab === 'design' && (
                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                {!selectedElement ? (
                                    <div className="text-center text-gray-500 py-10">
                                        <MousePointer size={32} className="mx-auto mb-2 opacity-20" />
                                        <p className="text-xs">Select an element to edit styles</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Typography */}
                                        <div>
                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Type size={12} /> Typography
                                            </h4>
                                            <div className="space-y-2">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="text-[10px] text-gray-500 block mb-1">Font Size</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                            placeholder="16px"
                                                            defaultValue={selectedElement.styles?.fontSize}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    const val = (e.target as HTMLInputElement).value;
                                                                    const iframe = document.querySelector('iframe');
                                                                    iframe?.contentWindow?.postMessage({
                                                                        type: 'UPDATE_STYLE',
                                                                        payload: { id: selectedElement.id, style: 'fontSize', value: val }
                                                                    }, '*');
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] text-gray-500 block mb-1">Font Weight</label>
                                                        <select
                                                            className="w-full bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                            defaultValue={selectedElement.styles?.fontWeight || '400'}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                const iframe = document.querySelector('iframe');
                                                                iframe?.contentWindow?.postMessage({
                                                                    type: 'UPDATE_STYLE',
                                                                    payload: { id: selectedElement.id, style: 'fontWeight', value: val }
                                                                }, '*');
                                                            }}
                                                        >
                                                            <option value="100">Thin (100)</option>
                                                            <option value="300">Light (300)</option>
                                                            <option value="400">Regular (400)</option>
                                                            <option value="500">Medium (500)</option>
                                                            <option value="600">SemiBold (600)</option>
                                                            <option value="700">Bold (700)</option>
                                                            <option value="900">Black (900)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-gray-500 block mb-1">Color</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-8 h-8 rounded bg-transparent border-none cursor-pointer"
                                                            defaultValue={selectedElement.styles?.color || '#000000'}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                const iframe = document.querySelector('iframe');
                                                                iframe?.contentWindow?.postMessage({
                                                                    type: 'UPDATE_STYLE',
                                                                    payload: { id: selectedElement.id, style: 'color', value: val }
                                                                }, '*');
                                                            }}
                                                        />
                                                        <input
                                                            type="text"
                                                            className="flex-1 bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                            placeholder="#000000"
                                                            defaultValue={selectedElement.styles?.color}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    const val = (e.target as HTMLInputElement).value;
                                                                    const iframe = document.querySelector('iframe');
                                                                    iframe?.contentWindow?.postMessage({
                                                                        type: 'UPDATE_STYLE',
                                                                        payload: { id: selectedElement.id, style: 'color', value: val }
                                                                    }, '*');
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-gray-500 block mb-1">Text Align</label>
                                                    <div className="flex bg-[#222] rounded border border-[#444] p-1">
                                                        {['left', 'center', 'right', 'justify'].map(align => (
                                                            <button
                                                                key={align}
                                                                className="flex-1 p-1 hover:bg-[#333] rounded text-gray-400 hover:text-white"
                                                                onClick={() => {
                                                                    const iframe = document.querySelector('iframe');
                                                                    iframe?.contentWindow?.postMessage({
                                                                        type: 'UPDATE_STYLE',
                                                                        payload: { id: selectedElement.id, style: 'textAlign', value: align }
                                                                    }, '*');
                                                                }}
                                                                title={align}
                                                            >
                                                                {align === 'left' && <AlignLeft size={12} />}
                                                                {align === 'center' && <AlignCenter size={12} />}
                                                                {align === 'right' && <AlignRight size={12} />}
                                                                {align === 'justify' && <AlignJustify size={12} />}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="border-[#333]" />

                                        {/* Layout */}
                                        <div>
                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Layout size={12} /> Layout
                                            </h4>
                                            <div className="space-y-2">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="text-[10px] text-gray-500 block mb-1">Display</label>
                                                        <select
                                                            className="w-full bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                            defaultValue={selectedElement.styles?.display || 'block'}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                const iframe = document.querySelector('iframe');
                                                                iframe?.contentWindow?.postMessage({
                                                                    type: 'UPDATE_STYLE',
                                                                    payload: { id: selectedElement.id, style: 'display', value: val }
                                                                }, '*');
                                                            }}
                                                        >
                                                            <option value="block">Block</option>
                                                            <option value="flex">Flex</option>
                                                            <option value="grid">Grid</option>
                                                            <option value="inline-block">Inline Block</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] text-gray-500 block mb-1">Direction</label>
                                                        <select
                                                            className="w-full bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                            defaultValue={selectedElement.styles?.flexDirection || 'row'}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                const iframe = document.querySelector('iframe');
                                                                iframe?.contentWindow?.postMessage({
                                                                    type: 'UPDATE_STYLE',
                                                                    payload: { id: selectedElement.id, style: 'flexDirection', value: val }
                                                                }, '*');
                                                            }}
                                                        >
                                                            <option value="row">Row</option>
                                                            <option value="column">Column</option>
                                                            <option value="row-reverse">Row Reverse</option>
                                                            <option value="column-reverse">Col Reverse</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="text-[10px] text-gray-500 block mb-1">Justify</label>
                                                        <select
                                                            className="w-full bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                            defaultValue={selectedElement.styles?.justifyContent || 'flex-start'}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                const iframe = document.querySelector('iframe');
                                                                iframe?.contentWindow?.postMessage({
                                                                    type: 'UPDATE_STYLE',
                                                                    payload: { id: selectedElement.id, style: 'justifyContent', value: val }
                                                                }, '*');
                                                            }}
                                                        >
                                                            <option value="flex-start">Start</option>
                                                            <option value="center">Center</option>
                                                            <option value="flex-end">End</option>
                                                            <option value="space-between">Between</option>
                                                            <option value="space-around">Around</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] text-gray-500 block mb-1">Align</label>
                                                        <select
                                                            className="w-full bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                            defaultValue={selectedElement.styles?.alignItems || 'stretch'}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                const iframe = document.querySelector('iframe');
                                                                iframe?.contentWindow?.postMessage({
                                                                    type: 'UPDATE_STYLE',
                                                                    payload: { id: selectedElement.id, style: 'alignItems', value: val }
                                                                }, '*');
                                                            }}
                                                        >
                                                            <option value="stretch">Stretch</option>
                                                            <option value="flex-start">Start</option>
                                                            <option value="center">Center</option>
                                                            <option value="flex-end">End</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="border-[#333]" />

                                        {/* Spacing (Margin/Padding) */}
                                        <div>
                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Maximize size={12} /> Spacing
                                            </h4>
                                            <div className="space-y-2">
                                                {/* Visual Box Model Placeholder */}
                                                <div className="text-xs text-gray-500 mb-2">Margin (m-*) / Padding (p-*)</div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input
                                                        type="text"
                                                        className="bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                        placeholder="Margin (e.g. 10px auto)"
                                                        defaultValue={selectedElement.styles?.margin}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                const val = (e.target as HTMLInputElement).value;
                                                                const iframe = document.querySelector('iframe');
                                                                iframe?.contentWindow?.postMessage({
                                                                    type: 'UPDATE_STYLE',
                                                                    payload: { id: selectedElement.id, style: 'margin', value: val }
                                                                }, '*');
                                                            }
                                                        }}
                                                    />
                                                    <input
                                                        type="text"
                                                        className="bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                        placeholder="Padding (e.g. 1rem)"
                                                        defaultValue={selectedElement.styles?.padding}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                const val = (e.target as HTMLInputElement).value;
                                                                const iframe = document.querySelector('iframe');
                                                                iframe?.contentWindow?.postMessage({
                                                                    type: 'UPDATE_STYLE',
                                                                    payload: { id: selectedElement.id, style: 'padding', value: val }
                                                                }, '*');
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="border-[#333]" />

                                        {/* Appearance */}
                                        <div>
                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <Palette size={12} /> Appearance
                                            </h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <label className="text-[10px] text-gray-500 block mb-1">Background Color</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="color"
                                                            className="w-8 h-8 rounded bg-transparent border-none cursor-pointer"
                                                            defaultValue={selectedElement.styles?.backgroundColor || '#ffffff'}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                const iframe = document.querySelector('iframe');
                                                                iframe?.contentWindow?.postMessage({
                                                                    type: 'UPDATE_STYLE',
                                                                    payload: { id: selectedElement.id, style: 'backgroundColor', value: val }
                                                                }, '*');
                                                            }}
                                                        />
                                                        <input
                                                            type="text"
                                                            className="flex-1 bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                            placeholder="#ffffff"
                                                            defaultValue={selectedElement.styles?.backgroundColor}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    const val = (e.target as HTMLInputElement).value;
                                                                    const iframe = document.querySelector('iframe');
                                                                    iframe?.contentWindow?.postMessage({
                                                                        type: 'UPDATE_STYLE',
                                                                        payload: { id: selectedElement.id, style: 'backgroundColor', value: val }
                                                                    }, '*');
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="text-[10px] text-gray-500 block mb-1">Border Radius</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                            placeholder="0px"
                                                            defaultValue={selectedElement.styles?.borderRadius}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    const val = (e.target as HTMLInputElement).value;
                                                                    const iframe = document.querySelector('iframe');
                                                                    iframe?.contentWindow?.postMessage({
                                                                        type: 'UPDATE_STYLE',
                                                                        payload: { id: selectedElement.id, style: 'borderRadius', value: val }
                                                                    }, '*');
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] text-gray-500 block mb-1">Border Width</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-[#222] border border-[#444] rounded px-2 py-1 text-xs text-white"
                                                            placeholder="0px"
                                                            defaultValue={selectedElement.styles?.borderWidth}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    const val = (e.target as HTMLInputElement).value;
                                                                    const iframe = document.querySelector('iframe');
                                                                    iframe?.contentWindow?.postMessage({
                                                                        type: 'UPDATE_STYLE',
                                                                        payload: { id: selectedElement.id, style: 'borderWidth', value: val }
                                                                    }, '*');
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* CONTENT: Page Settings */}
                        {activeRightTab === 'settings' && (
                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">SEO Metadata</h3>

                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-bold uppercase">SEO Title</label>
                                        <input
                                            type="text"
                                            value={seoTitle}
                                            onChange={(e) => setSeoTitle(e.target.value)}
                                            className="w-full bg-[#111] border border-[#333] text-xs text-white p-2 rounded focus:outline-none focus:border-blue-500"
                                            placeholder="Page Title for Search Engines"
                                        />
                                        <p className="text-[10px] text-gray-600">Recommended length: 50-60 chars</p>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-bold uppercase">SEO Description</label>
                                        <textarea
                                            value={seoDescription}
                                            onChange={(e) => setSeoDescription(e.target.value)}
                                            className="w-full bg-[#111] border border-[#333] text-xs text-white p-2 rounded focus:outline-none focus:border-blue-500 min-h-[80px]"
                                            placeholder="Brief summary for search results..."
                                        />
                                        <p className="text-[10px] text-gray-600">Recommended length: 150-160 chars</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-[#444]">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Page Info</h3>

                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-bold uppercase">Slug (URL)</label>
                                        <input
                                            type="text"
                                            value={selectedPage?.slug || ''}
                                            disabled
                                            className="w-full bg-[#222] border border-[#333] text-xs text-gray-400 p-2 rounded opacity-70 cursor-not-allowed"
                                        />
                                        <p className="text-[10px] text-gray-600">Slug cannot be changed here.</p>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] text-gray-500 font-bold uppercase">Type</label>
                                        <div className="px-2 py-1 bg-[#222] rounded text-xs text-gray-300 inline-block border border-[#333]">
                                            {selectedPage?.type?.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CONTENT: Properties (Existing) */}
                        {activeRightTab === 'properties' && (
                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                {!selectedElement ? (
                                    <div className="text-center text-gray-500 text-xs py-10 opacity-60">
                                        <MousePointer size={24} className="mx-auto mb-2" />
                                        Select an element in the preview to edit properties.
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="space-y-2 pb-4 border-b border-[#444]">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] text-blue-400 font-bold uppercase">Current Selection</label>
                                                <button
                                                    onClick={() => setSelectedElement(null)}
                                                    className="text-[10px] text-gray-500 hover:text-white"
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                            <div className="text-lg font-bold text-white font-mono break-all leading-tight">
                                                &lt;{selectedElement.tagName.toLowerCase()}&gt;
                                            </div>
                                            {selectedElement.id && (
                                                <div className="text-xs font-mono text-yellow-400">#{selectedElement.id}</div>
                                            )}
                                            {selectedElement.className && (
                                                <div className="text-xs font-mono text-green-400">.{selectedElement.className.split(' ').join('.')}</div>
                                            )}
                                        </div>

                                        {/* Data Binding Section - NEW */}
                                        {['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'DIV', 'LI', 'A', 'BUTTON'].includes(selectedElement.tagName) && (
                                            <div className="space-y-2 pt-2 border-t border-[#444]">
                                                <label className="text-[10px] text-purple-400 font-bold uppercase flex items-center gap-2">
                                                    <Zap size={10} /> Dynamic Data Binding
                                                </label>
                                                <select
                                                    className="w-full bg-[#111] border border-[#333] text-xs text-white p-2 rounded focus:outline-none focus:border-purple-500"
                                                    value={selectedElement.innerText.startsWith('{') && selectedElement.innerText.endsWith('}') ? selectedElement.innerText : ''}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (val) {
                                                            // Update Text in Iframe
                                                            const iframe = document.querySelector('iframe');
                                                            iframe?.contentWindow?.postMessage({
                                                                type: 'UPDATE_TEXT',
                                                                payload: {
                                                                    id: selectedElement.id,
                                                                    text: val
                                                                }
                                                            }, '*');
                                                            // Optimistically update local state for UI feedback
                                                            setSelectedElement((prev: any) => prev ? { ...prev, innerText: val } : null);
                                                        }
                                                    }}
                                                >
                                                    <option value="">Static Text (No Binding)</option>
                                                    <optgroup label="Page Properties">
                                                        <option value="{page.title}">Page Title</option>
                                                        <option value="{page.slug}">Page Slug</option>
                                                        <option value="{page.updated_at}">Last Updated Date</option>
                                                    </optgroup>
                                                    <optgroup label="Global">
                                                        <option value="{global.siteName}">Site Name</option>
                                                        <option value="{global.phone}">Phone Number</option>
                                                        <option value="{global.email}">Email Address</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-500 font-bold uppercase">Content Preview</label>
                                            <div className="text-xs text-gray-300 italic bg-[#1e1e1e] p-2 rounded max-h-24 overflow-hidden border border-[#444]">
                                                {selectedElement.innerText || "No text content"}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-0.5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-blue-300 font-medium mb-1">Inline Editing Active</p>
                                                        <p className="text-[10px] text-blue-400/80 leading-relaxed">
                                                            Double-click the element in the preview to edit text directly.
                                                            Changes are synced automatically.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {selectedElement.tagName === 'IMG' && (
                                                <div className="space-y-2 pt-4 border-t border-[#444]">
                                                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
                                                        <ImageIcon size={10} /> Image Source
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-[#111] border border-[#333] text-xs text-white p-2 rounded focus:outline-none focus:border-blue-500"
                                                        placeholder="Enter image URL..."
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                const url = e.currentTarget.value;
                                                                if (url) {
                                                                    const iframe = document.querySelector('iframe');
                                                                    iframe?.contentWindow?.postMessage({
                                                                        type: 'UPDATE_ATTRIBUTE',
                                                                        payload: {
                                                                            id: selectedElement.id,
                                                                            attribute: 'src',
                                                                            value: url
                                                                        }
                                                                    }, '*');
                                                                    e.currentTarget.value = '';
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <p className="text-[10px] text-gray-500">Press Enter to apply.</p>
                                                </div>
                                            )}

                                            <div className="space-y-3 pt-4 border-t border-[#444]">
                                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Style & Layout</label>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-[#111] p-2 rounded border border-[#333] flex flex-col gap-1">
                                                        <span className="text-[10px] text-gray-500">Display</span>
                                                        <span className="text-xs text-gray-300 font-mono">block</span>
                                                    </div>
                                                    <div className="bg-[#111] p-2 rounded border border-[#333] flex flex-col gap-1">
                                                        <span className="text-[10px] text-gray-500">Position</span>
                                                        <span className="text-xs text-gray-300 font-mono">relative</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div >
                )}
            </div>
        </div >
    );
}
