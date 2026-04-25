"use client";

import React, { useState, useEffect } from "react";
import { 
    Mail, 
    Search, 
    Download, 
    Trash2, 
    Filter, 
    MoreVertical, 
    Calendar,
    UserCheck,
    Loader2,
    CheckCircle2,
    XCircle,
    Copy,
    ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@/utils/supabase/client';

export default function NewsletterSubscribers() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const supabase = createClient();

    useEffect(() => {
        fetchSubscribers();
    }, []);

    async function fetchSubscribers() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/newsletter/list');
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || 'Failed to fetch');
            
            setSubscribers(data || []);
        } catch (error: any) {
            console.error("Error fetching subscribers:", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const filteredSubscribers = subscribers.filter(sub => {
        const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" || sub.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add a toast here
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this subscriber?")) return;
        
        try {
            const res = await fetch(`/api/newsletter/delete?id=${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || 'Failed to delete');
            
            setSubscribers(subscribers.filter(s => s.id !== id));
        } catch (error: any) {
            alert(error.message);
        }
    };

    const exportToCSV = () => {
        const headers = ["Email", "Status", "Subscribed At"];
        const rows = filteredSubscribers.map(sub => [
            sub.email,
            sub.status,
            new Date(sub.created_at).toLocaleString()
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="p-6 space-y-8 min-h-screen bg-[#f8fafc] dark:bg-[#020617]">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="p-2 bg-saffron/10 rounded-xl">
                            <Mail className="w-8 h-8 text-saffron" />
                        </div>
                        Newsletter Community
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                        Manage your {subscribers.length} "Weekly Wisdom" devotees
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={exportToCSV}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                            <UserCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Devotees</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{subscribers.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                                {subscribers.filter(s => s.status === 'active').length}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
                            <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">This Month</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                                {subscribers.filter(s => {
                                    const date = new Date(s.created_at);
                                    const now = new Date();
                                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                                }).length}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-saffron transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search by email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-saffron focus:ring-4 focus:ring-saffron/10 transition-all font-medium"
                    />
                </div>
                <div className="flex gap-2">
                    <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-saffron font-bold text-slate-700 dark:text-slate-200"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="unsubscribed">Unsubscribed</option>
                    </select>
                    <button 
                        onClick={fetchSubscribers}
                        className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600"
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-8 py-5 text-sm font-black text-slate-500 uppercase tracking-widest">Email Devotee</th>
                                <th className="px-8 py-5 text-sm font-black text-slate-500 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-sm font-black text-slate-500 uppercase tracking-widest">Joined On</th>
                                <th className="px-8 py-5 text-sm font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <Loader2 className="w-10 h-10 text-saffron animate-spin" />
                                                <p className="text-slate-500 font-bold">Summoning subscriber list...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4 text-red-500">
                                                <XCircle className="w-10 h-10" />
                                                <p className="font-bold">Error: {error}</p>
                                                <p className="text-sm text-slate-500">Make sure your profile role is set to 'admin' in Supabase.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredSubscribers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <Mail className="w-12 h-12 text-slate-300" />
                                                <p className="text-slate-500 font-bold">No devotees found in the cosmic record.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredSubscribers.map((sub, idx) => (
                                    <motion.tr 
                                        key={sub.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 group-hover:bg-saffron/10 group-hover:text-saffron transition-all">
                                                    {sub.email[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                                                        {sub.email}
                                                        <button 
                                                            onClick={() => copyToClipboard(sub.email)}
                                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all"
                                                        >
                                                            <Copy className="w-3 h-3 text-slate-400" />
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-slate-400 font-medium">UID: {sub.id.split('-')[0]}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                sub.status === 'active' 
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                            }`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                                                    {new Date(sub.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </span>
                                                <span className="text-[10px] text-slate-400">
                                                    {new Date(sub.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => handleDelete(sub.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-saffron hover:bg-saffron/10 rounded-xl transition-all">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
