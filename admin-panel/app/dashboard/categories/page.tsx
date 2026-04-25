
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Tag, 
  RefreshCw,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blog-categories');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const method = currentCategory?.id ? 'PUT' : 'POST';
      const res = await fetch('/api/blog-categories', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentCategory),
      });
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      
      await fetchCategories();
      setIsModalOpen(false);
      setCurrentCategory(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? Blogs using this category might be affected.')) return;
    
    try {
      const res = await fetch(`/api/blog-categories?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      await fetchCategories();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Blog Categories</h1>
          <p className="text-gray-400 text-sm">Manage topics and tags for your sacred wisdom collection.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentCategory({ name: '', slug: '' });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl text-white font-bold shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Tag size={16} className="text-orange-400" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Categories</span>
              </div>
              <p className="text-2xl font-black text-white">{categories.length}</p>
          </div>
      </div>

      {/* Search & Table */}
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-orange-500/50 transition-all"
            />
          </div>
          <button 
            onClick={fetchCategories}
            className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black border-b border-white/5">
                <th className="px-8 py-5">Name</th>
                <th className="px-8 py-5">Slug</th>
                <th className="px-8 py-5">Created</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Fetching Sacred Data...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{cat.name}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-gray-400 group-hover:text-gray-300">
                        {cat.slug}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-xs text-gray-500">
                      {new Date(cat.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setCurrentCategory(cat);
                            setIsModalOpen(true);
                          }}
                          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.id)}
                          className="p-2 hover:bg-red-500/10 rounded-xl text-gray-400 hover:text-red-400 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-gray-500 italic text-sm">
                    No categories found. Start by adding one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  {currentCategory?.id ? 'Edit Category' : 'New Category'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6">
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Category Name</label>
                  <input 
                    required
                    type="text" 
                    value={currentCategory?.name || ''}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                      setCurrentCategory(prev => ({ ...prev, name, slug }));
                    }}
                    placeholder="e.g. Vedic Rituals"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-orange-500/50 transition-all text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">URL Slug</label>
                  <input 
                    required
                    type="text" 
                    value={currentCategory?.slug || ''}
                    onChange={(e) => setCurrentCategory(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-orange-500/50 transition-all text-gray-400 font-mono"
                  />
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={isSaving}
                    type="submit"
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl text-white font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Check size={18} />}
                    {currentCategory?.id ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
