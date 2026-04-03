"use client";

import { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/contentService";
import { Category } from "@/types/content";

export default function CategoryManager() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        order: 0,
        content_structure: "{}"
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        // ... (error handling same as before)
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error: any) {
            console.error("Error fetching categories:", error);
            alert("Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'order' ? parseInt(value) || 0 : value
        }));

        if (name === 'name' && !editingCategory) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let parsedStructure = {};
        try {
            parsedStructure = JSON.parse(formData.content_structure);
        } catch (err) {
            alert("Invalid JSON in Content Structure!");
            return;
        }

        const dataToSave = {
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
            order: formData.order,
            content_structure: parsedStructure
        };

        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, dataToSave);
                alert("Category updated successfully!");
            } else {
                await createCategory(dataToSave);
                alert("Category created successfully!");
            }
            setFormData({ name: "", slug: "", description: "", order: 0, content_structure: "{}" });
            setEditingCategory(null);
            fetchCategories();
        } catch (error: any) {
            console.error("Error saving category:", error);
            alert("Failed to save category: " + error.message);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || "",
            order: category.order,
            content_structure: JSON.stringify(category.content_structure || {}, null, 2)
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will delete all pages within this category!")) return;
        try {
            await deleteCategory(id);
            fetchCategories();
        } catch (error: any) {
            alert("Failed to delete: " + error.message);
        }
    };

    const handleCancel = () => {
        setEditingCategory(null);
        setFormData({ name: "", slug: "", description: "", order: 0, content_structure: "{}" });
    };

    if (loading) return <div>Loading Categories...</div>;

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">{editingCategory ? "Edit Category" : "Add New Category"}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                rows={2}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium">Content Structure (JSON)</label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        try {
                                            const formatted = JSON.stringify(JSON.parse(formData.content_structure), null, 2);
                                            setFormData(prev => ({ ...prev, content_structure: formatted }));
                                        } catch (e) {
                                            alert("Invalid JSON");
                                        }
                                    }}
                                    className="text-xs text-blue-400 hover:text-blue-300"
                                >
                                    Format JSON
                                </button>
                            </div>
                            <textarea
                                name="content_structure"
                                value={formData.content_structure}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 font-mono text-sm"
                                rows={8}
                                placeholder="{}"
                            />
                            <p className="text-xs text-gray-500 mt-1">Define the JSON schema for pages in this category.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Order</label>
                            <input
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-saffron text-white rounded hover:bg-orange-600 transition disabled:opacity-50"
                        >
                            {editingCategory ? "Update Category" : "Create Category"}
                        </button>
                        {editingCategory && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4">Existing Categories</h3>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b dark:border-gray-700">
                            <th className="p-2">Order</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Slug</th>
                            <th className="p-2">JSON</th>
                            <th className="p-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="p-2">{cat.order}</td>
                                <td className="p-2 font-medium">{cat.name}</td>
                                <td className="p-2 text-gray-500">{cat.slug}</td>
                                <td className="p-2 text-xs font-mono text-gray-500 truncate max-w-[150px]">
                                    {cat.content_structure ? JSON.stringify(cat.content_structure).slice(0, 20) + '...' : '{}'}
                                </td>
                                <td className="p-2 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">No categories found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
