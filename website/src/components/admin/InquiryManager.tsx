"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
    MessageSquare, Mail, User, Calendar, 
    CheckCircle2, Clock, Trash2, Search, Filter 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InquiryManager() {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contact_inquiries')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setInquiries(data || []);
        setLoading(false);
    };

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase
            .from('contact_inquiries')
            .update({ status })
            .eq('id', id);
        
        if (!error) fetchInquiries();
    };

    const deleteInquiry = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const { error } = await supabase
            .from('contact_inquiries')
            .delete()
            .eq('id', id);
        
        if (!error) fetchInquiries();
    };

    const filtered = inquiries.filter(i => 
        i.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Contact Inquiries</h2>
                    <p className="text-slate-500">Manage messages from the Contact Us page</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search inquiries..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="p-20 text-center text-slate-400">Loading inquiries...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-20 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
                        No inquiries found.
                    </div>
                ) : (
                    filtered.map((inquiry) => (
                        <motion.div 
                            key={inquiry.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            inquiry.status === 'resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                                        }`}>
                                            {inquiry.status || 'pending'}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(inquiry.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            {inquiry.subject}
                                        </h3>
                                        <p className="text-slate-600 mt-2 line-clamp-3 italic">"{inquiry.message}"</p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 pt-2">
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <User className="w-4 h-4" />
                                            <span className="font-medium text-slate-700">{inquiry.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Mail className="w-4 h-4" />
                                            <a href={`mailto:${inquiry.email}`} className="hover:text-indigo-600 underline transition-colors">{inquiry.email}</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex md:flex-col justify-end gap-2 shrink-0">
                                    {inquiry.status !== 'resolved' && (
                                        <button 
                                            onClick={() => updateStatus(inquiry.id, 'resolved')}
                                            className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-2 px-4 text-sm font-bold"
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            Mark Resolved
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => deleteInquiry(inquiry.id)}
                                        className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-2 px-4 text-sm font-bold"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
