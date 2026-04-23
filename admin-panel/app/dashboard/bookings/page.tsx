'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  Scroll, 
  Search, 
  Phone, 
  User, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingsPage() {
    const supabase = createClient();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingBooking, setEditingBooking] = useState<any>(null);
    const [editStatus, setEditStatus] = useState("pending");
    const [editDate, setEditDate] = useState("");
    const [editTime, setEditTime] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/bookings');
            if (response.ok) {
                const data = await response.json();
                setBookings(data.bookings || []);
            } else {
                console.error("Fetch error:", await response.text());
            }
        } catch (error) {
            console.error("API error:", error);
        }
        setLoading(false);
    };

    const filteredBookings = bookings.filter(b => 
        b.sankalp_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.profiles?.phone?.includes(searchQuery) ||
        b.puja_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'pending': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    const handleEditClick = (booking: any) => {
        setEditingBooking(booking);
        setEditStatus(booking.status || 'pending');
        if (booking.scheduled_date) {
            const dateObj = new Date(booking.scheduled_date);
            setEditDate(dateObj.toISOString().split('T')[0]);
            setEditTime(dateObj.toTimeString().slice(0,5));
        } else {
            setEditDate("");
            setEditTime("");
        }
    };

    const handleSaveEdit = async () => {
        if (!editingBooking) return;
        setIsSaving(true);
        let scheduled_date = null;
        if (editDate) {
            scheduled_date = new Date(`${editDate}T${editTime || '00:00'}`).toISOString();
        }

        try {
            const res = await fetch(`/api/bookings/${editingBooking.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: editStatus, scheduled_date })
            });

            if (res.ok) {
                await fetchBookings();
                setEditingBooking(null);
            } else {
                const err = await res.json();
                alert(err.error || "Failed to update booking");
            }
        } catch (error) {
            console.error(error);
            alert("Network error");
        }
        setIsSaving(false);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                            <Scroll className="text-purple-400" size={20} />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Puja Bookings</h1>
                    </div>
                    <p className="text-sm text-gray-400">Manage sacred puja requests and user sankalps.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                        <input 
                            type="text"
                            placeholder="Search name or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#1a1a1a] border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-white focus:outline-none focus:border-purple-500/50 transition-all w-full md:w-80"
                        />
                    </div>
                    <button onClick={fetchBookings} className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all">
                        <Filter className="text-gray-400" size={20} />
                    </button>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sankalp / User</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Contact</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Puja Detail</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Price</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status / Date</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-8 py-10 h-24 bg-white/[0.01]" />
                                    </tr>
                                ))
                            ) : filteredBookings.length > 0 ? (
                                filteredBookings.map((booking) => (
                                    <motion.tr 
                                        key={booking.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="group hover:bg-white/[0.02] transition-all cursor-default"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-orange-500/10 flex items-center justify-center border border-white/5 text-purple-400 font-bold text-sm">
                                                    {booking.sankalp_name?.[0]}
                                                </div>
                                                <div>
                                                    <div className="text-gray-200 font-semibold text-sm group-hover:text-purple-400 transition-colors capitalize">
                                                        {booking.sankalp_name}
                                                    </div>
                                                    <div className="text-gray-500 text-[10px] flex items-center gap-1 mt-0.5">
                                                        <User size={10} /> {booking.profiles?.full_name || 'Anonymous'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="space-y-0.5">
                                                <a href={`tel:${booking.profiles?.phone}`} className="text-gray-400 text-xs font-medium hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
                                                    <Phone size={12} className="text-emerald-500/50" />
                                                    {booking.profiles?.phone || 'N/A'}
                                                </a>
                                                <div className="text-[9px] text-gray-500 truncate max-w-[120px]">
                                                    {booking.profiles?.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="bg-white/5 border border-white/5 rounded-lg p-2 group-hover:border-purple-500/20 transition-all">
                                                <div className="text-gray-200 text-xs font-semibold truncate max-w-[160px] mb-0.5">{booking.puja_name}</div>
                                                <div className="text-[9px] text-purple-500 font-bold uppercase opacity-80">{booking.package_name}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-sm font-bold text-gray-200">
                                                <span className="text-orange-500 mr-0.5 text-xs">₹</span>
                                                {booking.price}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col gap-1 items-start">
                                                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[9px] font-bold uppercase tracking-wide ${getStatusStyle(booking.status)}`}>
                                                    {booking.status === 'completed' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                                                    {booking.status}
                                                </div>
                                                {booking.scheduled_date && (
                                                    <div className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 mt-1">
                                                        <Calendar size={10} className="inline mr-1 text-purple-400" />
                                                        {new Date(booking.scheduled_date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button 
                                                onClick={() => handleEditClick(booking)}
                                                className="px-3 py-1.5 bg-white/5 hover:bg-purple-500/20 text-gray-300 hover:text-purple-400 rounded-lg text-xs font-bold transition-all border border-transparent hover:border-purple-500/30"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 grayscale opacity-30">
                                            <AlertCircle size={48} className="text-gray-400" />
                                            <p className="text-gray-400 font-bold uppercase tracking-widest">No bookings found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingBooking && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative"
                        >
                            <h3 className="text-xl font-bold text-white mb-4">Edit Booking</h3>
                            <p className="text-sm text-gray-400 mb-6 uppercase tracking-wider font-bold">
                                {editingBooking.puja_name}
                            </p>
                            
                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Status</label>
                                    <select 
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                                        value={editStatus}
                                        onChange={e => setEditStatus(e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Scheduled Date</label>
                                        <input 
                                            type="date"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                                            value={editDate}
                                            onChange={e => setEditDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Scheduled Time</label>
                                        <input 
                                            type="time"
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                                            value={editTime}
                                            onChange={e => setEditTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 justify-end mt-4">
                                <button 
                                    onClick={() => setEditingBooking(null)}
                                    className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 font-bold hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSaveEdit}
                                    disabled={isSaving}
                                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
