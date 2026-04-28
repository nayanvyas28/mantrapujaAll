'use client';

import React, { useState, useEffect } from 'react';
import { 
    Search, Calendar, Phone, User, Trash2, 
    Loader2, RefreshCw, CheckCircle, Clock, XCircle
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';

const STATUS_STYLES: Record<string, string> = {
    'Pending':   'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Contacted': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Completed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Cancelled': 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function FestivalBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const supabase = createClient();

    const fetchBookings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('festival_bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) setBookings(data);
        else if (error) alert('Error: ' + error.message);
        setLoading(false);
    };

    useEffect(() => { fetchBookings(); }, []);

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase
            .from('festival_bookings')
            .update({ status })
            .eq('id', id);
        if (!error) fetchBookings();
    };

    const deleteBooking = async (id: string) => {
        if (!confirm('Delete this booking entry?')) return;
        const { error } = await supabase
            .from('festival_bookings')
            .delete()
            .eq('id', id);
        if (!error) fetchBookings();
    };

    const filtered = bookings.filter(b =>
        b.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.festival_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.phone?.includes(searchQuery)
    );

    const counts = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'Pending').length,
        contacted: bookings.filter(b => b.status === 'Contacted').length,
        completed: bookings.filter(b => b.status === 'Completed').length,
    };

    return (
        <div className="p-6 md:p-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2 font-serif tracking-tight">Festival Booking Leads</h1>
                    <p className="text-gray-400 text-sm">Manage puja booking requests from festival pages</p>
                </div>
                <button onClick={fetchBookings} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-sm hover:bg-white/10 transition-all">
                    <RefreshCw size={16} /> Refresh
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Leads', value: counts.total, color: 'text-white' },
                    { label: 'Pending', value: counts.pending, color: 'text-amber-400' },
                    { label: 'Contacted', value: counts.contacted, color: 'text-blue-400' },
                    { label: 'Completed', value: counts.completed, color: 'text-emerald-400' },
                ].map(stat => (
                    <div key={stat.label} className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                    type="text"
                    placeholder="Search by name, festival, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-orange-500 transition-colors outline-none"
                />
            </div>

            {/* Table */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden">
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <Loader2 className="animate-spin text-orange-500" size={40} />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">User</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Festival Interest</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-gray-600 italic">
                                            No bookings found.
                                        </td>
                                    </tr>
                                ) : filtered.map((b) => (
                                    <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-orange-600/10 border border-orange-500/20 flex items-center justify-center">
                                                    <User size={16} className="text-orange-400" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-sm">{b.name}</p>
                                                    <a href={`tel:${b.phone}`} className="text-gray-500 text-[11px] flex items-center gap-1 hover:text-orange-400 transition-colors">
                                                        <Phone size={10} /> {b.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-orange-500 flex-shrink-0" />
                                                <span className="text-gray-300 text-sm font-medium">{b.festival_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={b.status || 'Pending'}
                                                onChange={(e) => updateStatus(b.id, e.target.value)}
                                                className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full border outline-none cursor-pointer transition-all ${STATUS_STYLES[b.status] || STATUS_STYLES['Pending']}`}
                                                style={{ background: 'transparent' }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Contacted">Contacted</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs">
                                            {new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            <br/>
                                            <span className="text-[10px]">{new Date(b.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={`https://wa.me/91${b.phone?.replace(/\D/g, '')}`}
                                                    target="_blank"
                                                    className="p-2 bg-white/5 hover:bg-emerald-500/10 rounded-lg text-gray-500 hover:text-emerald-400 transition-all"
                                                    title="WhatsApp"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
                                                </a>
                                                <button
                                                    onClick={() => deleteBooking(b.id)}
                                                    className="p-2 bg-white/5 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
