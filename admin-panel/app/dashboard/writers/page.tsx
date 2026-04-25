
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  User, 
  RefreshCw,
  X,
  Check,
  AlertCircle,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  created_at: string;
}

export default function WritersPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState<Partial<Author> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blog-authors');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAuthors(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    // Auto-generate avatar if empty
    if (!currentAuthor?.avatar) {
      currentAuthor!.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentAuthor?.name || '')}&background=random&color=fff&bold=true`;
    }

    try {
      const method = currentAuthor?.id ? 'PUT' : 'POST';
      const res = await fetch('/api/blog-authors', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentAuthor),
      });
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      
      await fetchAuthors();
      setIsModalOpen(false);
      setCurrentAuthor(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this writer? Existing blogs will still show their name but they will not be selectable for new blogs.')) return;
    
    try {
      const res = await fetch(`/api/blog-authors?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      await fetchAuthors();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredAuthors = authors.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Spiritual Writers</h1>
          <p className="text-gray-400 text-sm">Manage the gurus, pandits, and scholars who contribute to your wisdom library.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentAuthor({ name: '', role: '', avatar: '', bio: '' });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white font-bold shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={18} />
          Add Writer
        </button>
      </div>

      {/* Grid of Writers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full bg-white/5 border border-white/10 p-4 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                <input 
                type="text" 
                placeholder="Search by name or role..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/50 transition-all text-white"
                />
            </div>
            <button 
                onClick={fetchAuthors}
                className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all w-fit"
            >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
        </div>

        {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 rounded-[2.5rem] bg-white/5 animate-pulse border border-white/10" />
            ))
        ) : filteredAuthors.length > 0 ? (
            filteredAuthors.map((author) => (
                <motion.div 
                    layout
                    key={author.id}
                    className="p-6 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group relative overflow-hidden"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 overflow-hidden shadow-lg">
                            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={() => {
                                    setCurrentAuthor(author);
                                    setIsModalOpen(true);
                                }}
                                className="p-2 hover:bg-white/10 rounded-xl text-gray-500 hover:text-white transition-all"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button 
                                onClick={() => handleDelete(author.id)}
                                className="p-2 hover:bg-red-500/10 rounded-xl text-gray-500 hover:text-red-400 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{author.name}</h3>
                        <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-4">{author.role}</p>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed italic">
                            {author.bio || "No biography provided for this scholar."}
                        </p>
                    </div>

                    {/* Decorative background element */}
                    <div className="absolute -bottom-6 -right-6 text-white/[0.02] group-hover:text-purple-500/[0.05] transition-colors rotate-12">
                        <User size={120} />
                    </div>
                </motion.div>
            ))
        ) : (
            <div className="col-span-full py-20 text-center text-gray-500 italic">
                No writers found. Create your spiritual team today!
            </div>
        )}
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
              className="relative w-full max-w-xl bg-[#0d0d0d] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  {currentAuthor?.id ? 'Edit Writer' : 'Add New Writer'}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                            required
                            type="text" 
                            value={currentAuthor?.name || ''}
                            onChange={(e) => setCurrentAuthor(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g. Pandit Rajesh Sharma"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/50 transition-all text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Professional Role</label>
                        <input 
                            required
                            type="text" 
                            value={currentAuthor?.role || ''}
                            onChange={(e) => setCurrentAuthor(prev => ({ ...prev, role: e.target.value }))}
                            placeholder="e.g. Head Priest / Astrologer"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/50 transition-all text-white"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Writer Avatar</label>
                  <div className="flex items-center gap-6 p-6 bg-white/5 border border-dashed border-white/20 rounded-3xl group hover:border-purple-500/50 transition-all">
                    <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-xl flex-shrink-0">
                        {currentAuthor?.avatar ? (
                            <img src={currentAuthor.avatar} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-700">
                                <User size={32} />
                            </div>
                        )}
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                // Show local preview immediately
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    setCurrentAuthor(prev => ({ ...prev, avatar: event.target?.result as string }));
                                };
                                reader.readAsDataURL(file);

                                // Upload to server-side SHARP API
                                setIsSaving(true);
                                try {
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    formData.append('folder', 'writers');

                                    const res = await fetch('/api/upload', {
                                        method: 'POST',
                                        body: formData,
                                    });
                                    
                                    const data = await res.json();
                                    if (data.error) throw new Error(data.error);

                                    setCurrentAuthor(prev => ({ ...prev, avatar: data.url }));
                                } catch (err: any) {
                                    setError('Sharp Upload failed: ' + err.message);
                                } finally {
                                    setIsSaving(false);
                                }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera size={20} className="text-white" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-white mb-1">Click to change image</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Sharp Processing Active (WebP)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Biography / About</label>
                  <textarea 
                    rows={3}
                    value={currentAuthor?.bio || ''}
                    onChange={(e) => setCurrentAuthor(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Briefly describe the writer's spiritual journey or expertise..."
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/50 transition-all text-white resize-none"
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
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Check size={18} />}
                    {currentAuthor?.id ? 'Update' : 'Add Writer'}
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
