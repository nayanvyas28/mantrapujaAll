"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
    Calendar, Phone, User, Clock, 
    CheckCircle2, AlertCircle, Trash2, 
    Search, Filter, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function FestivalBookingManager() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data, error } = await supabase
                .from('festival_bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Supabase Fetch Error:", error);
                alert("Fetch Error: " + error.message);
                throw error;
            }
            console.log("Fetched Bookings Data:", data);
            setBookings(data || []);
        } catch (error) {
            console.error("Fetch bookings error:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const { error } = await supabase
                .from('festival_bookings')
                .update({ status })
                .eq('id', id);

            if (error) throw error;
            fetchBookings(); // Refresh data
        } catch (error) {
            console.error("Update status error:", error);
        }
    };

    const deleteBooking = async (id: string) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;
        try {
            const { error } = await supabase
                .from('festival_bookings')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchBookings();
        } catch (error) {
            console.error("Delete booking error:", error);
        }
    };

    const filteredBookings = bookings.filter(b => 
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.festival_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.phone.includes(searchTerm)
    );

    if (loading) return <div className="p-20 text-center text-slate-400">Loading Bookings...</div>;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name, festival or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchBookings} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 text-sm font-bold">
                        <Clock className="w-4 h-4" /> Refresh
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Festival Interest</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-slate-400 italic">No bookings found matching your criteria.</td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{booking.name}</p>
                                                    <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                                                        <Phone className="w-3 h-3" /> {booking.phone}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-orange-500" />
                                                <span className="font-medium text-slate-700">{booking.festival_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <select 
                                                value={booking.status}
                                                onChange={(e) => updateStatus(booking.id, e.target.value)}
                                                className={`text-xs font-black uppercase px-3 py-1.5 rounded-full border-none ring-1 ring-inset outline-none cursor-pointer transition-all ${
                                                    booking.status === 'Pending' ? 'bg-amber-50 text-amber-600 ring-amber-200' :
                                                    booking.status === 'Contacted' ? 'bg-blue-50 text-blue-600 ring-blue-200' :
                                                    'bg-emerald-50 text-emerald-600 ring-emerald-200'
                                                }`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Contacted">Contacted</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm text-slate-500 font-medium">
                                                {new Date(booking.created_at).toLocaleDateString('en-US', { 
                                                    month: 'short', day: 'numeric', year: 'numeric' 
                                                })}
                                            </p>
                                            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                                                {new Date(booking.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a 
                                                    href={`https://wa.me/91${booking.phone.replace(/[^0-9]/g, '')}`} 
                                                    target="_blank" 
                                                    className="p-2 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors"
                                                    title="WhatsApp User"
                                                >
                                                    <MessageCircleIcon />
                                                </a>
                                                <button 
                                                    onClick={() => deleteBooking(booking.id)}
                                                    className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                                                    title="Delete Entry"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function MessageCircleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
    );
}
