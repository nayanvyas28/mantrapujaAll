"use client";

import React, { useState, useEffect } from "react";
import { 
    MessageSquare, 
    Search, 
    Trash2, 
    CheckCircle2, 
    Clock, 
    Mail, 
    User, 
    Calendar,
    Filter,
    Loader2,
    Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@/utils/supabase/client';

export default function ContactInquiries() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [responses, setResponses] = useState<{[key: string]: string}>({});
    const supabase = createClient();

    useEffect(() => {
        fetchInquiries();
    }, []);

    async function fetchInquiries() {
        setLoading(true);
        const { data, error } = await supabase
            .from('contact_inquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setInquiries(data || []);
        setLoading(false);
    }

    async function updateStatus(id: string, status: string) {
        const admin_response = responses[id] || "";
        const { error } = await supabase
            .from('contact_inquiries')
            .update({ 
                status,
                admin_response: admin_response || null 
            })
            .eq('id', id);
        
        if (!error) {
            fetchInquiries();
            // Clear response state for this id
            const newResponses = {...responses};
            delete newResponses[id];
            setResponses(newResponses);
        }
    }

    async function deleteInquiry(id: string) {
        if (!confirm("Are you sure?")) return;
        const { error } = await supabase
            .from('contact_inquiries')
            .delete()
            .eq('id', id);
        
        if (!error) fetchInquiries();
    }

    const filtered = inquiries.filter(i => {
        const matchesSearch = 
            i.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            i.subject?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || i.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-6 space-y-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white flex items-center gap-3">
                        <div className="p-2 bg-orange-500/10 rounded-xl">
                            <MessageSquare className="w-8 h-8 text-orange-400" />
                        </div>
                        Contact Inquiries
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">Manage user messages and support requests</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search by name, email or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-orange-500/50 transition-all text-white"
                    />
                </div>
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-orange-500/50 text-white font-bold"
                >
                    <option value="all">All Status</option>
                    <option value="pending" className="bg-[#0d0d0d]">Pending</option>
                    <option value="resolved" className="bg-[#0d0d0d]">Resolved</option>
                </select>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="p-20 text-center flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                        <p className="text-gray-500 font-bold">Fetching inquiries...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="p-20 text-center bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                        <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                        <p className="text-gray-500 font-bold">No inquiries found matching your criteria.</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filtered.map((inquiry) => (
                            <motion.div 
                                key={inquiry.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:border-white/20 transition-all group relative overflow-hidden"
                            >
                                {inquiry.status === 'resolved' && (
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <CheckCircle2 size={120} className="text-green-500" />
                                    </div>
                                )}

                                <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                                inquiry.status === 'resolved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                            }`}>
                                                {inquiry.status || 'pending'}
                                            </span>
                                            <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                                                <Calendar size={12} />
                                                {new Date(inquiry.created_at).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{inquiry.subject || 'General Inquiry'}</h3>
                                            <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                                                <p className="text-gray-400 leading-relaxed text-sm italic">
                                                    "{inquiry.message}"
                                                </p>
                                                
                                                {inquiry.admin_response ? (
                                                    <div className="pt-3 border-t border-white/5">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-1 flex items-center gap-1.5">
                                                            <CheckCircle2 size={12} /> MantraPuja Team Response
                                                        </p>
                                                        <p className="text-sm text-gray-200">{inquiry.admin_response}</p>
                                                    </div>
                                                ) : inquiry.status !== 'resolved' && (
                                                    <div className="pt-3 border-t border-white/5">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">Write Resolution Message (MantraPuja Team)</p>
                                                        <textarea 
                                                            placeholder="Type your response here... Devotee will see this in their profile."
                                                            value={responses[inquiry.id] || ""}
                                                            onChange={(e) => setResponses({...responses, [inquiry.id]: e.target.value})}
                                                            className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-orange-500/50 resize-none"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6 text-sm">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <User size={14} className="text-orange-400" />
                                                <span className="font-bold text-gray-200">{inquiry.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Mail size={14} className="text-orange-400" />
                                                <a href={`mailto:${inquiry.email}`} className="hover:text-white transition-colors">{inquiry.email}</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col justify-end gap-2 shrink-0">
                                        {inquiry.status !== 'resolved' && (
                                            <button 
                                                onClick={() => updateStatus(inquiry.id, 'resolved')}
                                                className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold text-xs hover:bg-green-600 transition-all flex items-center gap-2 shadow-lg shadow-green-500/20"
                                            >
                                                <CheckCircle2 size={16} />
                                                Mark Resolved & Notify
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => deleteInquiry(inquiry.id)}
                                            className="px-6 py-3 bg-white/5 text-gray-400 rounded-xl font-bold text-xs hover:bg-red-500/10 hover:text-red-500 transition-all flex items-center gap-2 border border-white/5"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
