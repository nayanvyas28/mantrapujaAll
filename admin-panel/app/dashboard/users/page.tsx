'use client';

import { useState, useEffect, useCallback } from 'react';
import { Users, Search, RefreshCw, Shield, ShieldOff, MessageSquare, Moon, Mail, Calendar, ChevronUp, ChevronDown, Infinity, Save, X, CheckCircle, Pencil, Trash2, Globe, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserRow {
    id: string; email: string; phone: string; full_name: string;
    phone_verified: boolean; created_at: string; last_sign_in_at: string | null;
    query_count: number; last_query_at: string | null; custom_limit: number | null;
    kundali_count: number;
}
type SortKey = 'created_at' | 'last_sign_in_at' | 'query_count' | 'kundali_count';

export default function UsersPage() {
    const [users, setUsers] = useState<UserRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<SortKey>('created_at');
    const [sortAsc, setSortAsc] = useState(false);

    // Global limit
    const [globalDefault, setGlobalDefault] = useState(10);
    const [editingGlobal, setEditingGlobal] = useState(false);
    const [globalInput, setGlobalInput] = useState('10');
    const [savingGlobal, setSavingGlobal] = useState(false);

    // Per-user limit inline edit
    const [editingLimit, setEditingLimit] = useState<Record<string, string>>({});
    const [savingId, setSavingId] = useState<string | null>(null);
    const [savedId, setSavedId] = useState<string | null>(null);

    // Edit User Modal
    const [editUser, setEditUser] = useState<UserRow | null>(null);
    const [editForm, setEditForm] = useState({ full_name: '', phone: '', query_count: '' });
    const [savingEdit, setSavingEdit] = useState(false);

    // Delete Confirmation
    const [deleteUser, setDeleteUser] = useState<UserRow | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data.users || []);
        } catch (e) { console.error(e); }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchUsers();
        fetch('/api/guru-ai/config').then(r => r.json()).then(d => {
            const lim = d.freeQueryLimit || 10;
            setGlobalDefault(Number(lim));
            setGlobalInput(String(lim));
        }).catch(() => {});
    }, [fetchUsers]);

    const saveGlobalLimit = async () => {
        setSavingGlobal(true);
        try {
            await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ free_query_limit: Number(globalInput) })
            });
            setGlobalDefault(Number(globalInput));
            setEditingGlobal(false);
        } catch (e) { console.error(e); }
        setSavingGlobal(false);
    };

    const saveLimit = async (userId: string) => {
        setSavingId(userId);
        const val = editingLimit[userId];
        try {
            await fetch('/api/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, customLimit: val })
            });
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, custom_limit: val === '' ? null : Number(val) } : u));
            setEditingLimit(prev => { const n = { ...prev }; delete n[userId]; return n; });
            setSavedId(userId); setTimeout(() => setSavedId(null), 2000);
        } catch (e) { console.error(e); }
        setSavingId(null);
    };

    const openEdit = (u: UserRow) => {
        setEditUser(u);
        setEditForm({ full_name: u.full_name === '—' ? '' : u.full_name, phone: u.phone || '', query_count: String(u.query_count) });
    };

    const saveEdit = async () => {
        if (!editUser) return;
        setSavingEdit(true);
        try {
            await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: editUser.id, ...editForm, query_count: Number(editForm.query_count) })
            });
            setUsers(prev => prev.map(u => u.id === editUser.id ? {
                ...u, full_name: editForm.full_name || '—', phone: editForm.phone, query_count: Number(editForm.query_count)
            } : u));
            setEditUser(null);
        } catch (e) { console.error(e); }
        setSavingEdit(false);
    };

    const confirmDelete = async () => {
        if (!deleteUser) return;
        setDeletingId(deleteUser.id);
        try {
            await fetch('/api/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: deleteUser.id })
            });
            setUsers(prev => prev.filter(u => u.id !== deleteUser.id));
            setDeleteUser(null);
        } catch (e) { console.error(e); }
        setDeletingId(null);
    };

    const handleSort = (key: SortKey) => {
        if (sortKey === key) setSortAsc(p => !p);
        else { setSortKey(key); setSortAsc(false); }
    };

    const filtered = users
        .filter(u =>
            u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
            u.email?.toLowerCase().includes(search.toLowerCase()) ||
            u.phone?.includes(search)
        )
        .sort((a, b) => {
            let av: any = a[sortKey], bv: any = b[sortKey];
            if (typeof av === 'string') av = new Date(av).getTime();
            if (typeof bv === 'string') bv = new Date(bv).getTime();
            av = av ?? -1; bv = bv ?? -1;
            return sortAsc ? av - bv : bv - av;
        });

    const fmt = (d: string | null) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
    const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
        <button onClick={() => handleSort(k)} className="flex items-center gap-1 hover:text-white transition-colors">
            {label}
            {sortKey === k ? (sortAsc ? <ChevronUp size={11} /> : <ChevronDown size={11} />) : <ChevronDown size={11} className="opacity-20" />}
        </button>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <Users size={18} className="text-white" />
                        </div>
                        User Management
                    </h1>
                    <p className="text-gray-500 text-sm mt-1 ml-12">Manage devotees and their AI chat limits</p>
                </div>

                {/* Global Limit Control */}
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <Globe size={14} className="text-orange-400" />
                        <span className="text-xs text-gray-400 font-semibold">Global AI Limit:</span>
                        {editingGlobal ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="number" min="1"
                                    value={globalInput}
                                    onChange={e => setGlobalInput(e.target.value)}
                                    className="w-16 px-2 py-1 bg-black border border-orange-500/50 rounded-lg text-xs text-white outline-none font-bold text-center"
                                    autoFocus
                                />
                                <button onClick={saveGlobalLimit} disabled={savingGlobal} className="p-1.5 bg-orange-500 hover:bg-orange-600 rounded-lg transition-all disabled:opacity-50">
                                    {savingGlobal ? <RefreshCw size={11} className="animate-spin text-white" /> : <Save size={11} className="text-white" />}
                                </button>
                                <button onClick={() => { setEditingGlobal(false); setGlobalInput(String(globalDefault)); }} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg">
                                    <X size={11} className="text-gray-400" />
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setEditingGlobal(true)} className="flex items-center gap-1.5 group/g">
                                <span className="text-sm font-black text-orange-400">{globalDefault}</span>
                                <Pencil size={10} className="text-gray-600 group-hover/g:text-orange-400 transition-colors" />
                            </button>
                        )}
                    </div>
                    <button onClick={fetchUsers} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                        <RefreshCw size={15} className={`text-gray-400 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'Total Users', value: users.length, color: 'text-white' },
                    { label: 'Verified Phone', value: users.filter(u => u.phone_verified).length, color: 'text-green-400' },
                    { label: 'Custom Limits', value: users.filter(u => u.custom_limit !== null).length, color: 'text-orange-400' },
                    { label: 'Total Kundalis', value: users.reduce((s, u) => s + u.kundali_count, 0), color: 'text-purple-400' },
                ].map(s => (
                    <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{s.label}</p>
                        <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, email or phone..."
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-white text-sm outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-600"
                />
            </div>

            {/* Table */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1.2fr_auto] gap-3 px-5 py-3 border-b border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <div>User</div>
                    <div><SortBtn k="created_at" label="Joined" /></div>
                    <div><SortBtn k="query_count" label="Chats" /></div>
                    <div><SortBtn k="kundali_count" label="Kundalis" /></div>
                    <div><SortBtn k="last_sign_in_at" label="Last Active" /></div>
                    <div>Chat Limit</div>
                    <div>Actions</div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20 gap-3 text-gray-600">
                        <RefreshCw size={16} className="animate-spin" /><span className="text-sm">Loading devotees...</span>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-16 text-center text-gray-600 text-sm">No users found</div>
                ) : (
                    <div className="divide-y divide-white/[0.03]">
                        {filtered.map((u, i) => {
                            const isEditing = editingLimit[u.id] !== undefined;
                            const isSaving = savingId === u.id;
                            const isSaved = savedId === u.id;
                            const effectiveLimit = u.custom_limit !== null ? u.custom_limit : globalDefault;
                            const usedPct = Math.min((u.query_count / (effectiveLimit || 1)) * 100, 100);

                            return (
                                <motion.div key={u.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.015 }}
                                    className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1.2fr_auto] gap-3 px-5 py-4 items-center hover:bg-white/[0.02] transition-all"
                                >
                                    {/* User */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-white/5 flex items-center justify-center shrink-0 text-sm font-black text-orange-400">
                                            {(u.full_name?.[0] || u.email?.[0] || '?').toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-white truncate">{u.full_name}</p>
                                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                                {u.email && <span className="text-[10px] text-gray-500 flex items-center gap-1"><Mail size={9} />{u.email}</span>}
                                                {u.phone && <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                                    {u.phone_verified ? <Shield size={9} className="text-green-500" /> : <ShieldOff size={9} className="text-gray-600" />}
                                                    {u.phone}
                                                </span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Joined */}
                                    <div className="text-[10px] text-gray-500 flex items-center gap-1"><Calendar size={9} className="shrink-0" />{fmt(u.created_at)}</div>

                                    {/* Chats */}
                                    <div>
                                        <div className="flex items-center gap-1 mb-1">
                                            <MessageSquare size={9} className="text-orange-400" />
                                            <span className="text-xs font-bold text-white">{u.query_count}</span>
                                            <span className="text-[9px] text-gray-600">/{effectiveLimit}</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden w-14">
                                            <div className={`h-full rounded-full ${usedPct >= 90 ? 'bg-red-500' : usedPct >= 60 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${usedPct}%` }} />
                                        </div>
                                    </div>

                                    {/* Kundalis */}
                                    <div className="flex items-center gap-1.5"><Moon size={10} className="text-purple-400" /><span className="text-xs font-bold text-white">{u.kundali_count}</span><span className="text-[9px] text-gray-600">/3</span></div>

                                    {/* Last Active */}
                                    <div className="text-[10px] text-gray-600">{fmt(u.last_sign_in_at)}</div>

                                    {/* Limit */}
                                    <div className="flex items-center gap-1.5">
                                        {isEditing ? (
                                            <>
                                                <input type="number" min="0" value={editingLimit[u.id]}
                                                    onChange={e => setEditingLimit(prev => ({ ...prev, [u.id]: e.target.value }))}
                                                    className="w-14 px-2 py-1.5 bg-black border border-orange-500/50 rounded-lg text-xs text-white outline-none font-bold text-center" autoFocus
                                                />
                                                <button onClick={() => saveLimit(u.id)} disabled={isSaving} className="p-1.5 bg-orange-500 hover:bg-orange-600 rounded-lg disabled:opacity-50">
                                                    {isSaving ? <RefreshCw size={10} className="animate-spin text-white" /> : <Save size={10} className="text-white" />}
                                                </button>
                                                <button onClick={() => setEditingLimit(prev => { const n = { ...prev }; delete n[u.id]; return n; })} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg">
                                                    <X size={10} className="text-gray-400" />
                                                </button>
                                            </>
                                        ) : (
                                            <button onClick={() => setEditingLimit(prev => ({ ...prev, [u.id]: u.custom_limit !== null ? String(u.custom_limit) : '' }))}
                                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/5 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all"
                                            >
                                                {isSaved ? <CheckCircle size={10} className="text-green-400" />
                                                    : u.custom_limit !== null ? <span className="text-xs font-black text-orange-400">{u.custom_limit}</span>
                                                    : <Infinity size={10} className="text-gray-500" />}
                                                <span className="text-[9px] text-gray-600">{u.custom_limit !== null ? 'custom' : 'default'}</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1.5">
                                        <button onClick={() => openEdit(u)} title="Edit User"
                                            className="p-2 rounded-lg bg-white/[0.04] border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all group/e">
                                            <Pencil size={12} className="text-gray-500 group-hover/e:text-blue-400 transition-colors" />
                                        </button>
                                        <button onClick={() => setDeleteUser(u)} title="Delete User"
                                            className="p-2 rounded-lg bg-white/[0.04] border border-white/5 hover:bg-red-500/10 hover:border-red-500/30 transition-all group/d">
                                            <Trash2 size={12} className="text-gray-500 group-hover/d:text-red-400 transition-colors" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
            <p className="text-center text-[10px] text-gray-700">{filtered.length} of {users.length} users · Click limit badge to set custom AI limit · Edit/Delete from action buttons</p>

            {/* Edit User Modal */}
            <AnimatePresence>
                {editUser && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={e => e.target === e.currentTarget && setEditUser(null)}
                    >
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#111] border border-white/10 rounded-3xl p-7 w-full max-w-md shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-black text-white flex items-center gap-2"><Pencil size={16} className="text-orange-400" />Edit Devotee</h3>
                                <button onClick={() => setEditUser(null)} className="p-2 hover:bg-white/5 rounded-xl transition-all"><X size={16} className="text-gray-400" /></button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Full Name', key: 'full_name', type: 'text', placeholder: 'User full name' },
                                    { label: 'Phone', key: 'phone', type: 'tel', placeholder: '10-digit mobile number' },
                                    { label: 'Reset AI Chat Count', key: 'query_count', type: 'number', placeholder: '0' },
                                ].map(f => (
                                    <div key={f.key}>
                                        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{f.label}</label>
                                        <div className="relative">
                                            {f.key === 'query_count' && <RotateCcw size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" />}
                                            <input type={f.type}
                                                value={(editForm as any)[f.key]}
                                                onChange={e => setEditForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                                placeholder={f.placeholder}
                                                className={`w-full ${f.key === 'query_count' ? 'pl-9' : 'pl-4'} pr-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-600`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setEditUser(null)} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm font-bold hover:bg-white/10 transition-all">Cancel</button>
                                <button onClick={saveEdit} disabled={savingEdit} className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-black transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                    {savingEdit ? <><RefreshCw size={14} className="animate-spin" />Saving...</> : <><Save size={14} />Save Changes</>}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteUser && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={e => e.target === e.currentTarget && setDeleteUser(null)}
                    >
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#111] border border-red-500/20 rounded-3xl p-7 w-full max-w-sm shadow-2xl"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                                <Trash2 size={24} className="text-red-400" />
                            </div>
                            <h3 className="text-lg font-black text-white text-center mb-1">Delete Devotee?</h3>
                            <p className="text-sm text-gray-500 text-center mb-1">
                                <span className="text-white font-bold">{deleteUser.full_name}</span>
                            </p>
                            <p className="text-xs text-red-400/80 text-center mb-6">This will permanently delete the user and all their data — Kundalis, chat history, bookings. This cannot be undone.</p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteUser(null)} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm font-bold hover:bg-white/10 transition-all">Cancel</button>
                                <button onClick={confirmDelete} disabled={!!deletingId} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-black transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                    {deletingId ? <><RefreshCw size={14} className="animate-spin" />Deleting...</> : <><Trash2 size={14} />Delete</>}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
