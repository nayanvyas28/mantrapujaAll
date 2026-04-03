"use client";

import { useState, useEffect } from "react";
import { getSiteStructure, SiteNode, updatePage } from "@/lib/contentService";
import { Folder, FileText, ChevronRight, ChevronDown, Save } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import DevicePreview from "./DevicePreview";

export default function SiteStructure() {
    const [structure, setStructure] = useState<SiteNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPage, setSelectedPage] = useState<SiteNode | null>(null);
    const [pageContent, setPageContent] = useState("");
    const [saving, setSaving] = useState(false);
    const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

    useEffect(() => {
        loadStructure();
    }, []);

    const loadStructure = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getSiteStructure();
            setStructure(data);
            // Default expand all
            const expanded: Record<string, boolean> = {};
            data.forEach(cat => expanded[cat.id] = true);
            setExpandedCats(expanded);
        } catch (error: any) {
            console.error("Error loading structure:", error);
            setError(error.message || "Failed to load site structure");
        } finally {
            setLoading(false);
        }
    };

    const toggleCat = (id: string) => {
        setExpandedCats(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handlePageSelect = (node: SiteNode) => {
        // Allow selecting all types now
        if (node.type === 'category' || node.type === 'blog_root') return;

        // Check if unsaved changes? (Omitting for simplicity now)
        setSelectedPage(node);

        // Parse content
        let content = "";
        const raw = node.data.content;
        if (typeof raw === 'string') content = raw;
        else if (typeof raw === 'object' && raw?.text) content = raw.text;

        setPageContent(content);
    };

    const handleSave = async () => {
        if (!selectedPage) return;
        setSaving(true);
        try {
            await updatePage(selectedPage.id, {
                content: { text: pageContent }
            });

            // Update local state to reflect saved data
            setStructure(prev => prev.map(cat => ({
                ...cat,
                children: cat.children?.map(p =>
                    p.id === selectedPage.id
                        ? { ...p, data: { ...p.data, content: { text: pageContent } } }
                        : p
                )
            })));

            alert("Page saved successfully!");
        } catch (error: any) {
            console.error("Save error:", error);
            alert("Failed to save: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading Site Structure...</div>;

    return (
        <div className="flex h-[calc(100vh-140px)] border rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-900">
            {/* Sidebar: Site Tree */}
            <div className="w-1/4 min-w-[250px] border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 overflow-y-auto p-4">
                <h3 className="font-semibold text-gray-500 uppercase text-xs mb-4">Site Architecture</h3>
                <div className="space-y-1">
                    {loading && <div className="p-4 text-center text-gray-500">Loading...</div>}

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded text-sm mb-4">
                            <p className="font-bold">Error:</p>
                            <p>{error}</p>
                            <button onClick={loadStructure} className="mt-2 text-xs underline">Retry</button>
                        </div>
                    )}

                    {!loading && !error && structure.map(node => (
                        <div key={node.id}>
                            {/* Check if node is a container (Category/BlogRoot) or a Leaf (Page/Static) */}
                            {(node.type === 'category' || node.type === 'blog_root') ? (
                                <>
                                    <button
                                        onClick={() => toggleCat(node.id)}
                                        className="flex items-center w-full p-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
                                    >
                                        {expandedCats[node.id] ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
                                        <Folder size={16} className={`mr-2 ${node.type === 'blog_root' ? 'text-blue-500' : 'text-saffron'}`} />
                                        <span className="truncate">{node.name}</span>
                                    </button>

                                    {expandedCats[node.id] && (
                                        <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-gray-800 pl-2">
                                            {node.children?.map(page => (
                                                <button
                                                    key={page.id}
                                                    onClick={() => handlePageSelect(page)}
                                                    className={`flex items-center w-full p-2 text-sm rounded text-left transition-colors ${selectedPage?.id === page.id
                                                        ? 'bg-saffron/10 text-saffron font-semibold'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                                                        }`}
                                                >
                                                    <span className="mr-2 flex-shrink-0 opacity-70">
                                                        {page.type === 'static' ? '🏠' : page.type === 'blog' ? '📝' : <FileText size={14} />}
                                                    </span>
                                                    <span className="truncate">{page.name}</span>
                                                </button>
                                            ))}
                                            {(!node.children || node.children.length === 0) && (
                                                <div className="text-xs text-gray-400 italic pl-2 py-1">No items</div>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* Root Level Page (Static or standalone Page) */
                                <button
                                    onClick={() => handlePageSelect(node)}
                                    className={`flex items-center w-full p-2 text-sm font-medium rounded text-left transition-colors ${selectedPage?.id === node.id
                                        ? 'bg-saffron/10 text-saffron font-semibold'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <span className="mr-1 w-[14px]"></span> {/* Indent to align with folder text */}
                                    <span className="mr-2 flex-shrink-0 opacity-70">
                                        {node.slug === '/' ? '🏠' : <FileText size={16} />}
                                    </span>
                                    <span className="truncate">{node.name}</span>
                                </button>
                            )}
                        </div>
                    ))}

                    {!loading && !error && structure.length === 0 && (
                        <div className="p-6 text-center">
                            <p className="text-gray-500 mb-4">No structure found.</p>
                            <p className="text-xs text-gray-400 mb-4">Create your first category to get started.</p>
                            <button
                                onClick={() => alert("Please go to the 'Categories' tab to create structure.")}
                                className="px-3 py-1.5 bg-saffron text-white text-xs rounded hover:bg-orange-600 transition"
                            >
                                Go to Categories
                            </button>
                            <button onClick={loadStructure} className="block w-full mt-4 text-xs text-blue-500 hover:underline">
                                Refresh
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Area: Visual Editor */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                {selectedPage ? (
                    <div className="flex flex-col h-full">
                        {/* Editor Header */}
                        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold">{selectedPage.name}</h2>
                                <p className="text-xs text-gray-500">/{selectedPage.slug}</p>
                            </div>

                            {selectedPage.type === 'page' ? (
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center px-4 py-2 bg-saffron text-white rounded hover:bg-orange-600 transition disabled:opacity-50"
                                >
                                    <Save size={16} className="mr-2" />
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            ) : (
                                <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 text-xs rounded border border-gray-200 dark:border-gray-600">
                                    {selectedPage.type === 'static' ? 'Static Page (Code Managed)' : 'Blog Post (View Only)'}
                                </div>
                            )}
                        </div>

                        {/* Editor Canvas */}
                        <div className="flex-1 overflow-y-auto p-8">
                            {selectedPage.type === 'page' ? (
                                <DevicePreview>
                                    <RichTextEditor
                                        content={pageContent}
                                        onChange={setPageContent}
                                    />
                                </DevicePreview>
                            ) : (
                                <div className="h-full flex flex-col">
                                    <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100 flex items-center">
                                        <span className="mr-2">ℹ️</span>
                                        {selectedPage.type === 'static'
                                            ? "This is a static page built with React. Content cannot be edited visually here."
                                            : "Blogs are managed via the Automation tab or Blogs section."}
                                    </div>
                                    <div className="flex-1 border rounded-lg overflow-hidden bg-white shadow-inner relative">
                                        <iframe
                                            src={selectedPage.slug.startsWith('/') ? selectedPage.slug : `/${selectedPage.slug}`}
                                            className="w-full h-full"
                                            title="Page Preview"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 flex-col">
                        <FileText size={48} className="mb-4 opacity-20" />
                        <p>Select a page from the sidebar to edit visually.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
