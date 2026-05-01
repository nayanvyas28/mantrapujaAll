
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  FileText, 
  RefreshCw,
  X,
  Check,
  AlertCircle,
  Eye,
  Calendar,
  User,
  Tag,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  author_name: string;
  author_role: string;
  author_avatar: string;
  created_at: string;
  published: boolean;
}

interface Category { id: string; name: string; }
interface Writer { id: string; name: string; role: string; avatar: string; }

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [writers, setWriters] = useState<Writer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogsRes, catsRes, writersRes] = await Promise.all([
        fetch('/api/blogs'),
        fetch('/api/blog-categories'),
        fetch('/api/blog-authors')
      ]);
      
      const [blogsData, catsData, writersData] = await Promise.all([
        blogsRes.json(),
        catsRes.json(),
        writersRes.json()
      ]);

      setBlogs(blogsData);
      setCategories(catsData);
      setWriters(writersData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const method = currentBlog?.id ? 'PUT' : 'POST';
      const res = await fetch('/api/blogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentBlog),
      });
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      
      await fetchData();
      setIsModalOpen(false);
      setCurrentBlog(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      await fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredBlogs = blogs.filter(b => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return true;
    
    const words = searchLower.split(/\s+/).filter(w => w.length > 0);
    const title = b.title.toLowerCase();
    const category = (b.category || '').toLowerCase();
    const excerpt = (b.excerpt || '').toLowerCase();

    // Smart Search: Match any of the words in title, category, or excerpt
    return words.some(word => 
      title.includes(word) || 
      category.includes(word) || 
      excerpt.includes(word)
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Sacred Blogs</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total</span>
              <span className="text-sm font-bold text-white">{blogs.length}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="text-[10px] font-bold text-green-500/60 uppercase tracking-widest">Published</span>
              <span className="text-sm font-bold text-green-400">{blogs.filter(b => b.published).length}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
              <span className="text-[10px] font-bold text-orange-500/60 uppercase tracking-widest">Drafts</span>
              <span className="text-sm font-bold text-orange-400">{blogs.filter(b => !b.published).length}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => {
            setCurrentBlog({ 
              title: '', 
              slug: '', 
              content: '', 
              excerpt: '', 
              category: categories[0]?.name || '', 
              published: true,
              image_url: 'https://images.unsplash.com/photo-1605218453416-59e3c9c94494?q=80&w=1200'
            });
            setIsModalOpen(true);
          }}
          className="group relative flex items-center gap-3 px-8 py-4 bg-[#f97316] rounded-[2rem] text-white font-bold uppercase tracking-widest text-[11px] shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:shadow-[0_0_40px_rgba(249,115,22,0.8)] hover:-translate-y-1 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#fbbf24] to-transparent opacity-0 group-hover:opacity-40 transition-opacity" />
          <div className="p-1.5 bg-white/20 rounded-xl">
            <Plus size={16} strokeWidth={3} />
          </div>
          <span className="relative z-10">Create New Blog</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-saffron transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by title or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-saffron/50 transition-all text-white"
            />
          </div>
          <button 
            onClick={fetchData}
            className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all w-fit"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold border-b border-white/5">
                <th className="px-8 py-5">Article</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Author</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-saffron/20 border-t-saffron rounded-full animate-spin" />
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Loading Wisdom...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                            <img src={blog.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white group-hover:text-saffron transition-colors line-clamp-1">{blog.title}</span>
                            <span className="text-[10px] text-gray-500 font-mono">{blog.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-saffron/10 border border-saffron/20 rounded-full text-[10px] font-bold text-saffron uppercase tracking-widest">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                            <img src={blog.author_avatar} className="w-5 h-5 rounded-full" alt="" />
                            <span className="text-xs text-gray-400 font-medium">{blog.author_name}</span>
                        </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        blog.published 
                          ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                          : 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
                      }`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setCurrentBlog(blog);
                            setIsModalOpen(true);
                          }}
                          className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(blog.id)}
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
                  <td colSpan={6} className="px-8 py-20 text-center text-gray-500 italic text-sm">
                    No blogs found. Time to write some sacred content!
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
              className="absolute inset-0 bg-[#0f172a]/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#0f172a] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-saffron/10 rounded-2xl border border-saffron/20">
                        <FileText className="text-saffron" size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">
                        {currentBlog?.id ? 'Edit Spiritual Article' : 'Write New Article'}
                        </h3>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Universal Wisdom Console</p>
                    </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all">
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-saffron shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                                Article Title
                            </label>
                            <input 
                                required
                                type="text" 
                                value={currentBlog?.title || ''}
                                onChange={(e) => {
                                    const title = e.target.value;
                                    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                    setCurrentBlog(prev => ({ ...prev, title, slug }));
                                }}
                                placeholder="The spiritual significance of..."
                                className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-lg font-bold focus:outline-none focus:border-saffron/50 transition-all text-white placeholder:text-gray-700 shadow-inner"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-saffron shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                                Full Content
                            </label>
                            <textarea 
                                required
                                rows={12}
                                value={currentBlog?.content || ''}
                                onChange={(e) => setCurrentBlog(prev => ({ ...prev, content: e.target.value }))}
                                placeholder="Enter the sacred knowledge here (Markdown or Plain Text)..."
                                className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-3xl text-sm leading-relaxed focus:outline-none focus:border-saffron/50 transition-all text-gray-300 resize-none font-light"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-saffron shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                                Brief Excerpt
                            </label>
                            <textarea 
                                required
                                rows={3}
                                value={currentBlog?.excerpt || ''}
                                onChange={(e) => setCurrentBlog(prev => ({ ...prev, excerpt: e.target.value }))}
                                placeholder="Short summary for the blog card..."
                                className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-sm focus:outline-none focus:border-saffron/50 transition-all text-gray-400 resize-none"
                            />
                        </div>
                    </div>

                    {/* Right Column - Meta & Settings */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Status Card */}
                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Publish Status</span>
                                <button 
                                    type="button"
                                    onClick={() => setCurrentBlog(prev => ({ ...prev, published: !prev?.published }))}
                                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-tighter transition-all ${
                                        currentBlog?.published 
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                        : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                    }`}
                                >
                                    {currentBlog?.published ? 'Public' : 'Draft'}
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <Tag size={12} className="text-saffron" /> Category
                                    </label>
                                    <select 
                                        required
                                        value={currentBlog?.category || ''}
                                        onChange={(e) => setCurrentBlog(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-saffron/50 appearance-none cursor-pointer"
                                    >
                                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <User size={12} className="text-saffron" /> Select Writer
                                    </label>
                                    <select 
                                        required
                                        value={currentBlog?.author_name || ''}
                                        onChange={(e) => {
                                            const writer = writers.find(w => w.name === e.target.value);
                                            if (writer) {
                                                setCurrentBlog(prev => ({ 
                                                    ...prev, 
                                                    author_name: writer.name,
                                                    author_role: writer.role,
                                                    author_avatar: writer.avatar
                                                }));
                                            }
                                        }}
                                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-white focus:outline-none focus:border-saffron/50 appearance-none cursor-pointer"
                                    >
                                        <option value="">Choose a Writer</option>
                                        {writers.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Image Preview Card */}
                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <ImageIcon size={12} className="text-saffron" /> Cover Image URL
                            </label>
                            <div className="aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl group relative">
                                <img src={currentBlog?.image_url} alt="Cover" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-[#0f172a]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ImageIcon size={32} className="text-white/50" />
                                </div>
                            </div>
                            <input 
                                type="text" 
                                value={currentBlog?.image_url || ''}
                                onChange={(e) => setCurrentBlog(prev => ({ ...prev, image_url: e.target.value }))}
                                placeholder="Paste image URL here..."
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono text-gray-500 focus:outline-none focus:border-saffron/50 transition-all"
                            />
                        </div>

                        <div className="p-6 rounded-[2rem] bg-orange-500/5 border border-orange-500/10 space-y-3">
                            <div className="flex items-center gap-2 text-orange-400">
                                <Calendar size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Metadata</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">URL Slug (Click to view)</p>
                                <a 
                                    href={`http://localhost:3000/blogs/${currentBlog?.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-[10px] text-orange-400 font-mono hover:text-orange-300 transition-colors group/link"
                                >
                                    <span className="truncate">{currentBlog?.slug || 'auto-generated-slug'}</span>
                                    {currentBlog?.slug && <ExternalLink size={12} className="shrink-0 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
              </form>

              <div className="p-8 border-t border-white/5 bg-white/[0.02] flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-8 py-5 border-2 border-red-500/30 rounded-3xl text-xs font-black uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                  >
                    Discard Changes
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    type="button"
                    className="group relative flex-[1.5] flex items-center justify-center gap-3 px-8 py-5 bg-[#f97316] rounded-3xl text-white font-bold uppercase tracking-[0.2em] text-[10px] shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_45px_rgba(249,115,22,0.6)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#fbbf24] to-transparent opacity-0 group-hover:opacity-40 transition-opacity" />
                    {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Check size={18} strokeWidth={3} />}
                    <span className="relative z-10">
                        {currentBlog?.id ? 'Update Wisdom' : 'Publish Article'}
                    </span>
                  </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
