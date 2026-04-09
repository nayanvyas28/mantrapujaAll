"use client";

import { useState, useEffect } from "react";
import { getCategories, getPagesByCategory, createPage, updatePage, deletePage } from "@/lib/contentService";
import { Category, Page } from "@/types/content";
import RichTextEditor from "./RichTextEditor";
import DevicePreview from "./DevicePreview";

export default function PageManager() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(false);

    // Page Form State
    const [editingPage, setEditingPage] = useState<Page | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        order: 0,
        seo_title: "",
        seo_description: ""
    });

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        if (selectedCategoryId) {
            fetchPages(selectedCategoryId);
        } else {
            setPages([]);
        }
    }, [selectedCategoryId]);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
            if (data.length > 0) setSelectedCategoryId(data[0].id);
        } catch (error: any) {
            console.error("Error loading categories:", {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            });
        }
    };

    const fetchPages = async (catId: string) => {
        setLoading(true);
        try {
            const data = await getPagesByCategory(catId);
            setPages(data);
        } catch (error) {
            console.error("Error fetching pages:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'order' ? parseInt(value) || 0 : value
        }));

        if (name === 'title' && !editingPage) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategoryId) return alert("Please select a category first.");

        try {
            const pageData = {
                ...formData,
                category_id: selectedCategoryId,
                content: { text: formData.content } // Simple JSON wrapper for now
            };

            if (editingPage) {
                await updatePage(editingPage.id, pageData);
                alert("Page updated successfully!");
            } else {
                await createPage(pageData);
                alert("Page created successfully!");
            }
            setFormData({ title: "", slug: "", content: "", order: 0, seo_title: "", seo_description: "" });
            setEditingPage(null);
            fetchPages(selectedCategoryId);
        } catch (error: any) {
            console.error("Error saving page:", error);
            alert("Failed to save page: " + error.message);
        }
    };

    const handleEdit = (page: Page) => {
        setEditingPage(page);
        setFormData({
            title: page.title,
            slug: page.slug,
            content: page.content?.text || "",
            order: page.order,
            seo_title: page.seo_title || "",
            seo_description: page.seo_description || ""
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this page?")) return;
        try {
            await deletePage(id);
            fetchPages(selectedCategoryId);
        } catch (error: any) {
            alert("Failed to delete: " + error.message);
        }
    };

    const handleCancel = () => {
        setEditingPage(null);
        setFormData({ title: "", slug: "", content: "", order: 0, seo_title: "", seo_description: "" });
    };

    return (
        <div className="space-y-8">
            {/* Category Selector */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <label className="block text-sm font-medium mb-2">Select Category to Manage Pages</label>
                <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="" disabled>-- Select Category --</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {selectedCategoryId && (
                <>
                    {/* Add/Edit Form */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">{editingPage ? "Edit Page" : "Add New Page"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Slug</label>
                                    <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
                                </div>

                                // ... (inside component)

                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-medium mb-1">Content</label>
                                    <DevicePreview>
                                        <RichTextEditor
                                            content={formData.content}
                                            onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                                        />
                                    </DevicePreview>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Order</label>
                                    <input type="number" name="order" value={formData.order} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">SEO Title</label>
                                    <input type="text" name="seo_title" value={formData.seo_title} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">SEO Description</label>
                                    <textarea name="seo_description" value={formData.seo_description} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" rows={2} />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button type="submit" className="px-4 py-2 bg-saffron text-white rounded hover:bg-orange-600 transition">
                                    {editingPage ? "Update Page" : "Create Page"}
                                </button>
                                {editingPage && (
                                    <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Pages List */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-x-auto">
                        <h3 className="text-lg font-semibold mb-4">Pages in this Category</h3>
                        {loading ? <p>Loading...</p> : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className="p-2">Order</th>
                                        <th className="p-2">Title</th>
                                        <th className="p-2">Slug</th>
                                        <th className="p-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.map((page) => (
                                        <tr key={page.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="p-2">{page.order}</td>
                                            <td className="p-2 font-medium">{page.title}</td>
                                            <td className="p-2 text-gray-500">{page.slug}</td>
                                            <td className="p-2 text-right space-x-2">
                                                <button onClick={() => handleEdit(page)} className="text-blue-500 hover:text-blue-700">Edit</button>
                                                <button onClick={() => handleDelete(page.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {pages.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-4 text-center text-gray-500">No pages found in this category.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
