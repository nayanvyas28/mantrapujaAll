"use client";

import { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import { Upload, FileUp, Check, AlertTriangle, Play, Save, Download, Plus, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type ParsedData = {
    headers: string[];
    rows: Record<string, string>[];
};

type Template = {
    id: string;
    name: string;
    description: string;
    content: unknown;
};

type Category = {
    id: string;
    name: string;
    slug: string;
};

export default function BulkImport() {
    const [file, setFile] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<ParsedData | null>(null);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

    // Category Selection State
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategorySlug, setNewCategorySlug] = useState("");

    const [mapping, setMapping] = useState<Record<string, string>>({}); // Target Field -> CSV Header
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch templates and categories on mount
    useEffect(() => {
        fetchTemplates();
        fetchCategories();
    }, []);

    async function fetchTemplates() {
        const { data, error } = await supabase.from('templates').select('*');
        if (data) setTemplates(data);
        if (error) console.error("Error fetching templates:", error);
    }

    async function fetchCategories() {
        const { data, error } = await supabase.from('categories').select('*').order('name');
        if (data) setCategories(data);
        if (error) console.error("Error fetching categories:", error);
    }

    const handleCreateCategory = async () => {
        if (!newCategoryName || !newCategorySlug) return;

        const { data, error } = await supabase.from('categories').insert({
            name: newCategoryName,
            slug: newCategorySlug
        }).select().single();

        if (error) {
            alert("Error creating category: " + error.message);
        } else if (data) {
            setCategories(prev => [...prev, data]);
            setSelectedCategoryId(data.id);
            setIsCreatingCategory(false);
            setNewCategoryName("");
            setNewCategorySlug("");
            alert(`Category "${data.name}" created!`);
        }
    };

    const downloadExampleCSV = () => {
        const headers = [
            "Title",
            "Description",
            "Content",
            "Image URL",
            "Image Prompt",
            "Author",
            "Meta Title",
            "Meta Description",
            "Meta Tags"
        ];
        const rows = [
            [
                "Example Page Title",
                "A brief description of the page content.",
                "This is the main content of the page. It can be plain text or HTML.",
                "https://example.com/image.jpg",
                "A beautiful sunrise over the mountains",
                "John Doe",
                "Example Page SEO Title",
                "SEO Description for search engines.",
                "keyword1, keyword2, keyword3"
            ]
        ];

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.map(cell => `"${cell}"`).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "example_bulk_import.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (!uploadedFile) return;

        setFile(uploadedFile);
        setLoading(true);

        Papa.parse(uploadedFile, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const headers = results.meta.fields || [];
                const rows = results.data as Record<string, string>[];

                setParsedData({ headers, rows });
                setLoading(false);

                // Auto-map fields
                const newMapping: Record<string, string> = {};
                const standardFields = [
                    'Title', 'Description', 'Content', 'Image URL', 'Image Prompt',
                    'Author', 'Meta Title', 'Meta Description', 'Meta Tags'
                ];

                standardFields.forEach(field => {
                    const match = headers.find(h => h.toLowerCase() === field.toLowerCase());
                    if (match) newMapping[field] = match;
                });

                setMapping(newMapping);
            },
            error: (error) => {
                console.error("CSV Parse Error:", error);
                setLoading(false);
                alert("Failed to parse CSV file.");
            }
        });
    };

    const handleGenerate = async () => {
        if (!parsedData || !selectedTemplateId || !selectedCategoryId) {
            alert("Please select a template and a category.");
            return;
        }

        const template = templates.find(t => t.id === selectedTemplateId);
        if (!template) return;

        const category = categories.find(c => c.id === selectedCategoryId);
        if (!category) return;

        setGenerating(true);
        setLogs([]);
        setProgress(0);

        try {
            const total = parsedData.rows.length;
            let successCount = 0;

            for (let i = 0; i < total; i++) {
                const row = parsedData.rows[i];

                // Extract mapped data
                const title = row[mapping['Title'] || 'Title'] || `Untitled ${i}`;
                const description = row[mapping['Description'] || 'Description'] || '';
                const contentText = row[mapping['Content'] || 'Content'] || '';
                const imageUrl = row[mapping['Image URL'] || 'Image URL'] || '';
                const imagePrompt = row[mapping['Image Prompt'] || 'Image Prompt'] || '';
                const author = row[mapping['Author'] || 'Author'] || '';
                const metaTitle = row[mapping['Meta Title'] || 'Meta Title'] || title;
                const metaDesc = row[mapping['Meta Description'] || 'Meta Description'] || description;
                const metaTags = row[mapping['Meta Tags'] || 'Meta Tags'] || '';

                // Generate Slug from Title
                const slug = title.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');

                // Prepare Page Content JSON
                // Start with template content structure
                let finalContent = JSON.parse(JSON.stringify(template.content));

                // If template content is just a string (rare for visual editor but possible)
                if (typeof finalContent === 'string') {
                    // Simple replacement
                    finalContent = finalContent
                        .replace(/{page.title}/g, title)
                        .replace(/{page.description}/g, description)
                        .replace(/{data.image}/g, imageUrl)
                        .replace(/{data.author}/g, author);
                } else if (typeof finalContent === 'object') {
                    // Deep traverse replacement (simplified stringify approach)
                    let contentString = JSON.stringify(finalContent);
                    contentString = contentString
                        .replace(/{page.title}/g, title)
                        .replace(/{page.description}/g, description)
                        .replace(/{data.image}/g, imageUrl)
                        .replace(/{data.author}/g, author)
                        .replace(/{data.content}/g, contentText);

                    finalContent = JSON.parse(contentString);
                }

                // Insert into Pages
                const { error: insertError } = await supabase.from('pages').insert({
                    category_id: category.id,
                    title: title,
                    slug: slug,
                    content: finalContent, // The visual editor JSON with injected values
                    seo_title: metaTitle,
                    seo_description: metaDesc,
                    // If we had an 'author' column, we'd map it here. 
                    // Since we don't, it must be in the content directly.
                    // Created_at is auto.
                });

                if (insertError) {
                    if (insertError.code === '23505') { // Unique violation
                        setLogs(prev => [...prev, `⚠️ Row ${i + 1}: Skipped - Slug "${slug}" already exists in this category.`]);
                    } else {
                        setLogs(prev => [...prev, `❌ Row ${i + 1}: Failed - ${insertError.message}`]);
                    }
                } else {
                    successCount++;
                    // Try to get origin safely
                    const origin = typeof window !== 'undefined' ? window.location.origin : '';
                    const fullUrl = `${origin}/${category.slug}/${slug}`;
                    setLogs(prev => [...prev, `✅ Row ${i + 1}: Created "${title}" -> ${fullUrl}`]);
                }

                setProgress(((i + 1) / total) * 100);
            }

            setGenerating(false);
            if (successCount > 0) {
                await supabase.from('system_logs').insert({
                    event_type: 'bulk_import',
                    message: `Bulk Import Completed: ${successCount} pages created.`,
                    details: { category: category.name, template: template.name, total_rows: total },
                    status: 'success'
                });
                alert(`Generation Complete! Created ${successCount} pages in category "${category.name}".`);
            }

        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error("Generation Error:", err);
            setLogs(prev => [...prev, `🔥 Critical Error: ${errorMessage}`]);

            // Log Failure
            await supabase.from('system_logs').insert({
                event_type: 'bulk_import',
                message: `Bulk Import Failed: ${errorMessage}`,
                details: { error: errorMessage },
                status: 'failed'
            });

            setGenerating(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <FileUp className="text-blue-500" /> Bulk Page Generator
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Import content from CSV to create multiple pages at once.</p>
                </div>
                <button
                    onClick={downloadExampleCSV}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                >
                    <Download size={16} /> Download Example CSV
                </button>
            </div>

            {/* Step 1: Select Category */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    Select Destination Category
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Existing Category</label>
                        <select
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                            disabled={isCreatingCategory}
                        >
                            <option value="">-- Choose a Category --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name} (/{cat.slug})</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end">
                        {!isCreatingCategory ? (
                            <button
                                onClick={() => setIsCreatingCategory(true)}
                                className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Plus size={16} /> Create New Category
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-left-2">
                                <div className="flex-1 space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Category Name"
                                        className="w-full px-3 py-1.5 text-sm border rounded"
                                        value={newCategoryName}
                                        onChange={(e) => {
                                            setNewCategoryName(e.target.value);
                                            setNewCategorySlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="slug"
                                        className="w-full px-3 py-1.5 text-xs border rounded bg-gray-50 text-gray-500"
                                        value={newCategorySlug}
                                        readOnly
                                    />
                                </div>
                                <button
                                    onClick={handleCreateCategory}
                                    disabled={!newCategoryName}
                                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    title="Save Category"
                                >
                                    <Check size={16} />
                                </button>
                                <button
                                    onClick={() => setIsCreatingCategory(false)}
                                    className="p-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                                    title="Cancel"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Step 2: Select Template */}
            <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden transition-all ${!selectedCategoryId ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    Select Design Template
                </h3>

                {templates.length === 0 ? (
                    <div className="text-center text-gray-500 py-4 bg-gray-50 rounded-lg dashed-border">
                        No templates found. <br />
                        <span className="text-xs">Go to the Visual Editor, design a page, and click &quot;Save Template&quot;.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
                        {templates.map(t => (
                            <div
                                key={t.id}
                                onClick={() => setSelectedTemplateId(t.id)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedTemplateId === t.id ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-200' : 'border-gray-200 dark:border-gray-700'}`}
                            >
                                <div className="font-bold text-gray-800 dark:text-white text-sm truncate">{t.name}</div>
                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{t.description || "No description"}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Step 3: Upload & Map */}
            <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden transition-all ${!selectedTemplateId ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    Upload & Map Data
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upload Area */}
                    <div>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-500 hover:bg-green-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                            onClick={() => fileInputRef.current?.click()}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept=".csv"
                                className="hidden"
                            />
                            <Upload className="mx-auto h-10 w-10 text-gray-400 group-hover:text-green-500 mb-3 transition-colors" />
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                {file ? file.name : "Click to upload CSV"}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Supports .csv files</p>
                        </div>
                        {parsedData && (
                            <div className="mt-2 text-center text-xs text-green-600 font-bold">
                                ✓ Parsed {parsedData.rows.length} rows
                            </div>
                        )}
                    </div>

                    {/* Mapping Area */}
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {parsedData ? (
                            <>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between px-1">
                                    <span>Target Field</span>
                                    <span>CSV Header</span>
                                </div>
                                {[
                                    'Title', 'Description', 'Content',
                                    'Image URL', 'Image Prompt', 'Author',
                                    'Meta Title', 'Meta Description', 'Meta Tags'
                                ].map(field => (
                                    <div key={field} className="flex items-center justify-between gap-4 p-2 bg-gray-50 dark:bg-gray-900 rounded border border-gray-100 dark:border-gray-700">
                                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/3 truncate" title={field}>{field}</div>
                                        <select
                                            className="flex-1 bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs outline-none focus:border-blue-500"
                                            value={mapping[field] || ''}
                                            onChange={(e) => setMapping(prev => ({ ...prev, [field]: e.target.value }))}
                                        >
                                            <option value="">(Ignore)</option>
                                            {parsedData.headers.map(h => (
                                                <option key={h} value={h}>{h}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
                                Upload a CSV file to map columns.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Generate Action */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500">
                    {generating ? 'Processing...' : 'Ready to generate.'}
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={generating || !selectedTemplateId || !selectedCategoryId || !parsedData}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-[1.02] transition-all"
                >
                    {generating ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Generating {Math.round(progress)}%
                        </>
                    ) : (
                        <><Play className="fill-white" size={20} /> Generate Pages</>
                    )}
                </button>
            </div>

            {/* Logs Console */}
            {logs.length > 0 && (
                <div className="bg-[#111] text-green-400 p-5 rounded-xl font-mono text-xs h-64 overflow-y-auto border border-gray-800 shadow-inner">
                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-800 text-gray-500">
                        <span>Generation Log</span>
                        <span className="cursor-pointer hover:text-white" onClick={() => setLogs([])}>Clear</span>
                    </div>
                    {logs.map((log, i) => (
                        <div key={i} className={`py-1 border-b border-gray-800/50 ${log.includes('❌') ? 'text-red-400' : log.includes('⚠️') ? 'text-yellow-400' : ''}`}>
                            {log}
                        </div>
                    ))}
                    <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
                </div>
            )}
        </div>
    );
}
