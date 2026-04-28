"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Mail, Calendar, Trash2, Search, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SubscriberManager() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setSubscribers(data || []);
        setLoading(false);
    };

    const deleteSubscriber = async (id: string) => {
        if (!confirm("Remove this subscriber?")) return;
        const { error } = await supabase
            .from('newsletter_subscribers')
            .delete()
            .eq('id', id);
        
        if (!error) fetchSubscribers();
    };

    const exportCSV = () => {
        const headers = ["Email", "Subscription Date"];
        const rows = subscribers.map(s => [s.email, new Date(s.created_at).toLocaleDateString()]);
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "subscribers.csv");
        document.body.appendChild(link);
        link.click();
    };

    const filtered = subscribers.filter(s => 
        s.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Newsletter Subscribers</h2>
                    <p className="text-slate-500">Manage your spiritual family's mailing list</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button 
                        onClick={exportCSV}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors text-sm font-bold"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search emails..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Email Address</th>
                            <th className="px-6 py-4">Joined Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={3} className="px-6 py-10 text-center text-slate-400">Loading subscribers...</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={3} className="px-6 py-10 text-center text-slate-400">No subscribers found.</td></tr>
                        ) : (
                            filtered.map((s) => (
                                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-800">{s.email}</td>
                                    <td className="px-6 py-4 text-slate-500">{new Date(s.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => deleteSubscriber(s.id)}
                                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
