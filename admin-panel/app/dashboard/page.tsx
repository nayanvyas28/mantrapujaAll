import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { 
  Users, 
  ShoppingBag, 
  IndianRupee, 
  ArrowUpRight, 
  ArrowDownRight, 
  Flame, 
  Search,
  Activity,
  TrendingUp,
  ChevronRight,
  Globe,
  Smartphone
} from 'lucide-react';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Parallel Fetch for all Dashboard Stats
    const [
        { count: totalUsers },
        { count: activeBookings },
        { data: revenueData },
        { data: recentBookings }
    ] = await Promise.all([
        // 1. Fetch Total Users
        supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true }),

        // 2. Fetch Active Bookings (Puja Bookings via Wallet)
        supabase
            .from('wallet_transactions')
            .select('*', { count: 'exact', head: true })
            .eq('category', 'puja_booking')
            .eq('status', 'success'),

        // 3. Fetch Revenue Data (Selective Column)
        supabase
            .from('wallet_transactions')
            .select('amount')
            .eq('category', 'puja_booking')
            .eq('status', 'success'),

        // 4. Fetch Recent Bookings for the "Live Feed"
        supabase
            .from('wallet_transactions')
            .select('*, profiles(full_name, email)')
            .eq('category', 'puja_booking')
            .order('created_at', { ascending: false })
            .limit(5)
    ]);

    const revenue = revenueData?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-2">
                        Website Management Hub
                    </h1>
                    <p className="text-gray-400 text-sm max-w-xl leading-relaxed font-medium">
                        Central console for Mantra Puja Website operations. 
                        Monitoring <span className="text-orange-400 uppercase text-[10px] font-black tracking-widest px-2 py-0.5 bg-orange-500/10 rounded-md border border-orange-500/20 ml-1">Universal Database</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 group hover:border-orange-500/30 transition-all cursor-default text-decoration-none">
                        <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-all">
                            <Activity size={16} className="text-green-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Admin Sync</span>
                            <span className="text-xs font-bold text-white">Live Connection Active</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Management Universe Quick Select */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-[2rem] bg-gradient-to-br from-orange-600/10 to-transparent border border-orange-500/20 flex items-center justify-between group hover:border-orange-500/40 transition-all cursor-pointer">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                            <Globe size={24} className="text-orange-400" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">Website Universe</h4>
                            <p className="text-xs text-gray-500">Catalog, Orders & SEO</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-700 group-hover:text-orange-400 transition-all group-hover:translate-x-1" />
                </div>

                <div className="p-6 rounded-[2rem] bg-gradient-to-br from-purple-600/10 to-transparent border border-white/5 flex items-center justify-between group hover:border-purple-500/20 transition-all cursor-pointer opacity-60">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                            <Smartphone size={24} className="text-purple-400" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">App Legacy</h4>
                            <p className="text-xs text-gray-500">Music, Reels & Alerts</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-700 group-hover:text-purple-400 transition-all group-hover:translate-x-1" />
                </div>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Users Card */}
                <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 relative overflow-hidden group hover:border-purple-500/40 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-purple-500/10 transition-colors">
                        <Users size={80} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                <Users size={20} className="text-purple-400" />
                            </div>
                            <span className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-lg">
                                <TrendingUp size={12} /> +12%
                            </span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Total Users</h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-4xl font-black text-white">{totalUsers?.toLocaleString() || '0'}</p>
                            <p className="text-xs text-gray-500 font-medium">Registered Profiles</p>
                        </div>
                    </div>
                </div>

                {/* Active Bookings Card */}
                <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 relative overflow-hidden group hover:border-orange-500/40 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-orange-500/10 transition-colors">
                        <ShoppingBag size={80} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                <ShoppingBag size={20} className="text-orange-400" />
                            </div>
                            <span className="flex items-center gap-1 text-orange-400 text-xs font-bold bg-orange-400/10 px-2 py-1 rounded-lg">
                                <Activity size={12} /> Live
                            </span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Active Bookings</h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-4xl font-black text-white">{activeBookings?.toLocaleString() || '0'}</p>
                            <p className="text-xs text-gray-500 font-medium">Puja Sessions</p>
                        </div>
                    </div>
                </div>

                {/* Revenue Card */}
                <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 relative overflow-hidden group hover:border-green-500/40 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-green-500/10 transition-colors">
                        <IndianRupee size={80} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                <IndianRupee size={20} className="text-green-400" />
                            </div>
                            <span className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-lg">
                                <TrendingUp size={12} /> Net Sales
                            </span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Total Revenue</h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-4xl font-black text-white">₹{revenue?.toLocaleString() || '0'}</p>
                            <p className="text-xs text-gray-500 font-medium">Volume</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Recent Activity & Action Center */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Recent Activity Feed */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                                <TrendingUp size={18} className="text-purple-400" />
                            </div>
                            <h2 className="text-lg font-bold tracking-tight">Recent Puja Bookings</h2>
                        </div>
                        <button className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest">
                            View All Bookings
                        </button>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-sm">
                        <div className="p-4 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black">
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Package</th>
                                        <th className="px-6 py-4 text-center">Amount</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4 text-right">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.03]">
                                    {recentBookings && recentBookings.length > 0 ? (
                                        recentBookings.map((booking: any) => (
                                            <tr key={booking.id} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                                                            {booking.profiles?.full_name || 'Anonymous User'}
                                                        </span>
                                                        <span className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors">
                                                            {booking.profiles?.email || 'No email provided'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-semibold text-gray-400 truncate max-w-[150px]">
                                                            {booking.description || 'Puja Booking'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="text-sm font-black text-white">₹{booking.amount}</span>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className={`
                                                        px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                                                        ${booking.status === 'success' 
                                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                                            : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}
                                                    `}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                                        {new Date(booking.created_at).toLocaleDateString()}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-10 text-center text-gray-500 font-medium text-sm italic">
                                                No recent bookings detected in the catalog.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Featured Stat */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                            <Flame size={18} className="text-orange-400" />
                        </div>
                        <h2 className="text-lg font-bold tracking-tight">AI Insights</h2>
                    </div>

                    <div className="p-8 rounded-[40px] bg-gradient-to-br from-purple-600/20 to-orange-600/10 border border-purple-500/20 space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest">Platform Growth</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                User registration is up by <span className="text-white font-bold">12%</span> this week. Recommend launching a new festival popup to capitalize on the momentum.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/5 space-y-4">
                            <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                        <Activity size={16} className="text-purple-400" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">System Logs</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                        <Users size={16} className="text-orange-400" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">User Support</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
