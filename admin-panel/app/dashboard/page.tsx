import { createClient as createServiceClient } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, ShoppingBag, IndianRupee, TrendingUp, Activity,
  MessageCircle, Mail, Calendar, Flame, BookOpen, MapPin,
  Settings, Moon, ArrowRight, Star, Zap, Bell, Globe
} from 'lucide-react';

export default async function DashboardPage() {
    // Auth check with cookie client (needs user session)
    const authClient = await createClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) redirect('/login');

    // Use service role client to bypass RLS for all data queries
    const supabase = createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
    const lastDayLastMonth  = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).toISOString();

    const [
        { count: totalUsers },
        { count: newUsersThisMonth },
        { count: totalBookings },
        { count: bookingsThisMonth },
        { data: revenueData },
        { data: revenueThisMonthData },
        { count: totalInquiries },
        { count: pendingInquiries },
        { count: totalPujas },
        { count: totalBlogs },
        { count: totalFestivals },
        { count: totalSubscribers },
        { data: recentBookings },
    ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', firstDayThisMonth),
        supabase.from('puja_bookings').select('*', { count: 'exact', head: true }),
        supabase.from('puja_bookings').select('*', { count: 'exact', head: true }).gte('created_at', firstDayThisMonth),
        supabase.from('puja_bookings').select('price'),
        supabase.from('puja_bookings').select('price').gte('created_at', firstDayThisMonth),
        supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('poojas').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('festivals').select('*', { count: 'exact', head: true }),
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
        supabase.from('puja_bookings').select('id, sankalp_name, puja_name, package_name, price, status, created_at, user_id').order('created_at', { ascending: false }).limit(6),
    ]);

    const totalRevenue = revenueData?.reduce((s, i) => s + (Number(i.price) || 0), 0) || 0;
    const monthRevenue = revenueThisMonthData?.reduce((s, i) => s + (Number(i.price) || 0), 0) || 0;

    const statCards = [
        {
            label: 'Total Users',
            value: totalUsers?.toLocaleString() || '0',
            sub: `+${newUsersThisMonth || 0} this month`,
            icon: Users,
            color: 'purple',
            href: null,
            glow: 'rgba(168,85,247,0.15)',
            border: 'border-purple-500/20',
            iconBg: 'bg-purple-500/10',
            iconColor: 'text-purple-400',
            tagColor: 'text-purple-400 bg-purple-400/10',
        },
        {
            label: 'Puja Bookings',
            value: totalBookings?.toLocaleString() || '0',
            sub: `${bookingsThisMonth || 0} this month`,
            icon: ShoppingBag,
            color: 'orange',
            href: '/dashboard/bookings',
            glow: 'rgba(249,115,22,0.15)',
            border: 'border-orange-500/20',
            iconBg: 'bg-orange-500/10',
            iconColor: 'text-orange-400',
            tagColor: 'text-orange-400 bg-orange-400/10',
        },
        {
            label: 'Total Revenue',
            value: `₹${totalRevenue.toLocaleString()}`,
            sub: `₹${monthRevenue.toLocaleString()} this month`,
            icon: IndianRupee,
            color: 'green',
            href: null,
            glow: 'rgba(34,197,94,0.15)',
            border: 'border-green-500/20',
            iconBg: 'bg-green-500/10',
            iconColor: 'text-green-400',
            tagColor: 'text-green-400 bg-green-400/10',
        },
        {
            label: 'Inquiries',
            value: totalInquiries?.toLocaleString() || '0',
            sub: `${pendingInquiries || 0} pending reply`,
            icon: MessageCircle,
            color: 'sky',
            href: '/dashboard/inquiries',
            glow: 'rgba(14,165,233,0.15)',
            border: 'border-sky-500/20',
            iconBg: 'bg-sky-500/10',
            iconColor: 'text-sky-400',
            tagColor: 'text-sky-400 bg-sky-400/10',
        },
    ];

    const quickLinks = [
        { label: 'Puja Catalog', icon: Flame, href: '/dashboard/pujas', desc: `${totalPujas || 0} active pujas`, color: 'from-orange-600/20 to-transparent border-orange-500/20', iconColor: 'text-orange-400', iconBg: 'bg-orange-500/10' },
        { label: 'Festivals', icon: Star, href: '/dashboard/festivals', desc: `${totalFestivals || 0} listed`, color: 'from-yellow-600/20 to-transparent border-yellow-500/20', iconColor: 'text-yellow-400', iconBg: 'bg-yellow-500/10' },
        { label: 'Blog Posts', icon: BookOpen, href: '/dashboard/categories', desc: `${totalBlogs || 0} published`, color: 'from-blue-600/20 to-transparent border-blue-500/20', iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10' },
        { label: 'Newsletter', icon: Mail, href: '/dashboard/newsletter', desc: `${totalSubscribers || 0} subscribers`, color: 'from-pink-600/20 to-transparent border-pink-500/20', iconColor: 'text-pink-400', iconBg: 'bg-pink-500/10' },
        { label: 'Locations', icon: MapPin, href: '/dashboard/locations', desc: 'Sacred cities', color: 'from-emerald-600/20 to-transparent border-emerald-500/20', iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10' },
        { label: 'Kundali Hub', icon: Moon, href: '/dashboard/kundli', desc: 'Vedic profiles', color: 'from-violet-600/20 to-transparent border-violet-500/20', iconColor: 'text-violet-400', iconBg: 'bg-violet-500/10' },
        { label: 'Guru AI', icon: Zap, href: '/dashboard/settings', desc: 'AI config & prompts', color: 'from-amber-600/20 to-transparent border-amber-500/20', iconColor: 'text-amber-400', iconBg: 'bg-amber-500/10' },
        { label: 'Website Home', icon: Globe, href: '/dashboard/website-home', desc: 'UI & banners', color: 'from-cyan-600/20 to-transparent border-cyan-500/20', iconColor: 'text-cyan-400', iconBg: 'bg-cyan-500/10' },
    ];

    const greeting = () => {
        const h = now.getHours();
        if (h < 12) return 'Suprabhat 🌅';
        if (h < 17) return 'Jai Shri Ram 🙏';
        return 'Shubh Sandhya 🌙';
    };

    return (
        <div className="space-y-8 pb-10">

            {/* ── HERO HEADER ── */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1a0a2e] via-[#120820] to-[#0d0d0d] border border-white/5 p-8 md:p-10">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-orange-600/10 rounded-full blur-[120px] -mr-40 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[200px] bg-purple-600/10 rounded-full blur-[100px] -ml-20 -mb-10 pointer-events-none" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <p className="text-[11px] font-black text-orange-400 uppercase tracking-[0.25em] mb-2">{greeting()}</p>
                        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-orange-100 to-gray-400 bg-clip-text text-transparent leading-tight mb-3">
                            Mantra Puja Control Center
                        </h1>
                        <p className="text-gray-400 text-sm font-medium max-w-lg leading-relaxed">
                            Welcome back, Admin. Here's your real-time overview of the divine digital platform.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-green-500/10 border border-green-500/20 rounded-2xl">
                            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
                            <span className="text-green-400 text-xs font-black uppercase tracking-widest">Live</span>
                        </div>
                        <div className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl">
                            <span className="text-gray-400 text-xs font-bold">
                                {now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── STAT CARDS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        className={`relative overflow-hidden rounded-[1.75rem] bg-white/[0.03] border ${card.border} p-6 group hover:bg-white/[0.06] transition-all duration-300`}
                        style={{ boxShadow: `0 0 40px ${card.glow}` }}
                    >
                        {/* Background icon watermark */}
                        <div className="absolute -right-4 -top-4 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity">
                            <card.icon size={120} />
                        </div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-5">
                                <div className={`w-11 h-11 rounded-2xl ${card.iconBg} border ${card.border} flex items-center justify-center`}>
                                    <card.icon size={20} className={card.iconColor} />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-xl ${card.tagColor}`}>
                                    <TrendingUp size={10} className="inline mr-1" />
                                    Active
                                </span>
                            </div>
                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.18em] mb-1.5">{card.label}</p>
                            <p className="text-3xl font-black text-white mb-1">{card.value}</p>
                            <p className="text-[11px] text-gray-500 font-medium">{card.sub}</p>
                        </div>
                        {card.href && (
                            <Link href={card.href} className="absolute inset-0 rounded-[1.75rem]" aria-label={card.label} />
                        )}
                    </div>
                ))}
            </div>

            {/* ── QUICK ACTION GRID ── */}
            <div>
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                        <Activity size={16} className="text-orange-400" />
                    </div>
                    <h2 className="text-lg font-black text-white tracking-tight">Quick Access</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`group relative p-5 rounded-[1.5rem] bg-gradient-to-br ${link.color} border hover:scale-[1.02] transition-all duration-200`}
                        >
                            <div className={`w-10 h-10 rounded-xl ${link.iconBg} flex items-center justify-center mb-4`}>
                                <link.icon size={18} className={link.iconColor} />
                            </div>
                            <p className="text-sm font-black text-white mb-0.5">{link.label}</p>
                            <p className="text-[11px] text-gray-500 font-medium">{link.desc}</p>
                            <ArrowRight size={14} className="absolute bottom-4 right-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* ── BOTTOM: RECENT BOOKINGS + SYSTEM STATUS ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Bookings Table */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                <ShoppingBag size={16} className="text-purple-400" />
                            </div>
                            <h2 className="text-lg font-black text-white tracking-tight">Recent Bookings</h2>
                        </div>
                        <Link href="/dashboard/bookings" className="flex items-center gap-1.5 text-[11px] font-black text-purple-400 hover:text-purple-300 uppercase tracking-widest transition-colors">
                            View All <ArrowRight size={12} />
                        </Link>
                    </div>
                    <div className="bg-white/[0.025] border border-white/[0.06] rounded-[2rem] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/[0.05]">
                                        <th className="px-5 py-3.5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">User</th>
                                        <th className="px-5 py-3.5 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Package</th>
                                        <th className="px-5 py-3.5 text-center text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Amount</th>
                                        <th className="px-5 py-3.5 text-center text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Status</th>
                                        <th className="px-5 py-3.5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.03]">
                                    {recentBookings && recentBookings.length > 0 ? (
                                        recentBookings.map((b: any) => (
                                            <tr key={b.id} className="hover:bg-white/[0.025] transition-colors group">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600/30 to-orange-600/20 flex items-center justify-center shrink-0">
                                                            <span className="text-xs font-black text-white">
                                                                {(b.sankalp_name || 'A').charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                                                                {b.sankalp_name || 'Anonymous'}
                                                            </p>
                                                            <p className="text-[10px] text-gray-600">{b.user_id?.slice(0, 8)}...</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="text-[11px] font-semibold text-gray-400 truncate max-w-[130px] block">
                                                        {b.puja_name || 'Puja Booking'}
                                                    </span>
                                                    {b.package_name && (
                                                        <span className="text-[10px] text-purple-500 font-bold">{b.package_name}</span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <span className="text-sm font-black text-white">₹{Number(b.price)?.toLocaleString()}</span>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                        b.status === 'completed'
                                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                            : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                                    }`}>
                                                        {b.status || 'pending'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                                                        {new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-600 text-sm italic font-medium">
                                                No bookings yet. Your divine platform awaits its first booking. 🙏
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Platform Health */}
                <div className="space-y-5">
                    {/* Platform Pulse */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                <Activity size={16} className="text-green-400" />
                            </div>
                            <h2 className="text-lg font-black text-white tracking-tight">Platform Pulse</h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: 'Website', status: 'Operational', color: 'green' },
                                { label: 'Guru AI', status: 'Active', color: 'green' },
                                { label: 'Supabase DB', status: 'Connected', color: 'green' },
                                { label: 'Newsletter', status: `${totalSubscribers || 0} subs`, color: 'blue' },
                                { label: 'Inquiries', status: `${pendingInquiries || 0} pending`, color: pendingInquiries && pendingInquiries > 0 ? 'orange' : 'green' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
                                    <span className="text-xs font-bold text-gray-400">{item.label}</span>
                                    <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${
                                        item.color === 'green' ? 'text-green-400' :
                                        item.color === 'orange' ? 'text-orange-400' : 'text-blue-400'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            item.color === 'green' ? 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]' :
                                            item.color === 'orange' ? 'bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.8)]' :
                                            'bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]'
                                        } animate-pulse`} />
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* This Month Summary */}
                    <div className="p-5 bg-gradient-to-br from-orange-600/10 via-purple-600/5 to-transparent border border-orange-500/10 rounded-[1.75rem]">
                        <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-4">This Month</p>
                        <div className="space-y-3">
                            {[
                                { label: 'New Users', value: `+${newUsersThisMonth || 0}`, icon: Users },
                                { label: 'New Bookings', value: `+${bookingsThisMonth || 0}`, icon: ShoppingBag },
                                { label: 'Revenue', value: `₹${monthRevenue.toLocaleString()}`, icon: IndianRupee },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <item.icon size={14} className="text-gray-500" />
                                        <span className="text-xs font-semibold text-gray-400">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-black text-white">{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5">
                            <Link href="/dashboard/bookings" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-widest hover:bg-orange-500/20 transition-all">
                                Full Report <ArrowRight size={12} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
