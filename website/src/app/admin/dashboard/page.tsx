"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import {
    Users, LayoutDashboard, Settings, LogOut,
    Menu, Bell, Edit3, Package, Globe, FileText,
    Image as ImageIcon, Server, Database, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import original admin components
import FigmaVisualEditor from '@/components/admin/FigmaVisualEditor';
import ProductManager from '@/components/admin/ProductManager';
import PageManager from '@/components/admin/PageManager';
import SeoManager from '@/components/admin/SeoManager';
import AssetManager from '@/components/admin/AssetManager';
import ServerManager from '@/components/admin/ServerManager';
import CategoryManager from '@/components/admin/CategoryManager';
import SitemapManager from '@/app/(admin)/admin/sitemaps/page';
import KundliApiManager from '@/components/admin/KundliApiManager';

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalUsers: 0, recentSignups: 0 });
    const [recentUsers, setRecentUsers] = useState<any[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentTab, setCurrentTab] = useState('overview');

    useEffect(() => {
        const checkSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/admin');
                return;
            }
            fetchDashboardData();
        };
        checkSession();
    }, [router]);

    const fetchDashboardData = async () => {
        try {
            const { count: totalCount } = await supabase.from('user_onboarding').select('*', { count: 'exact', head: true });
            const { data: recent } = await supabase.from('user_onboarding').select('*').order('created_at', { ascending: false }).limit(5);
            setStats({ totalUsers: totalCount || 0, recentSignups: recent ? recent.length : 0 });
            setRecentUsers(recent || []);
        } catch (error) {
            console.error("Dashboard data error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin');
    };

    const renderContent = () => {
        switch (currentTab) {
            case 'overview': return <Overview stats={stats} recentUsers={recentUsers} />;
            case 'editor': return <FigmaVisualEditor />;
            case 'pujas': return <ProductManager />;
            case 'pages': return <PageManager />;
            case 'seo': return <SeoManager />;
            case 'sitemaps': return <SitemapManager />;
            case 'assets': return <AssetManager />;
            case 'categories': return <CategoryManager />;
            case 'server': return <ServerManager />;
            case 'kundli-api': return <KundliApiManager />;
            default: return <Overview stats={stats} recentUsers={recentUsers} />;
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden h-screen">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? 260 : 80 }}
                className="bg-slate-900 text-white flex-shrink-0 h-full hidden md:flex flex-col border-r border-slate-800 shadow-xl z-20 transition-all duration-300"
            >
                <div className="h-20 flex items-center px-6 border-b border-slate-800">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex-shrink-0"></div>
                        {sidebarOpen && <span className="font-bold text-xl tracking-tight whitespace-nowrap">Mantra Admin</span>}
                    </div>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                    <SidebarItem icon={LayoutDashboard} label="Overview" id="overview" current={currentTab} set={setCurrentTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={Edit3} label="Visual Editor" id="editor" current={currentTab} set={setCurrentTab} collapsed={!sidebarOpen} />
                    <div className="h-px bg-slate-800 my-4 mx-2" />
                    <SidebarItem icon={Package} label="Pujas/Products" id="pujas" current={currentTab} set={setCurrentTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={Database} label="Categories" id="categories" current={currentTab} set={setCurrentTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={FileText} label="Page Manager" id="pages" current={currentTab} set={setCurrentTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={Globe} label="SEO Settings" id="seo" current={currentTab} set={setCurrentTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={Globe} label="Sitemap Manager" id="sitemaps" current={currentTab} set={setCurrentTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={ImageIcon} label="Asset Library" id="assets" current={currentTab} set={setCurrentTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={Server} label="Server Config" id="server" current={currentTab} set={setCurrentTab} collapsed={!sidebarOpen} />
                    <SidebarItem icon={Zap} label="Kundli API" id="kundli-api" current={currentTab} set={setCurrentTab} collapsed={!sidebarOpen} />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button onClick={handleLogout} className={`flex items-center gap-3 text-slate-400 hover:text-white transition-colors w-full p-3 rounded-xl hover:bg-white/5 ${!sidebarOpen && 'justify-center'}`}>
                        <LogOut className="w-5 h-5" />
                        {sidebarOpen && <span>Sign Out</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex-shrink-0 px-8 flex items-center justify-between z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
                            <Menu className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-bold text-slate-800 capitalize">
                            {currentTab.replace('-', ' ')}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col text-right hidden lg:block">
                            <span className="text-sm font-bold text-slate-700">Admin User</span>
                            <span className="text-xs text-slate-500">Master Control</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Admin`} alt="Admin" />
                        </div>
                    </div>
                </header>

                {/* Content Panel */}
                <div className="flex-1 overflow-auto bg-slate-50 p-6 md:p-8 custom-scrollbar">
                    <div className="max-w-[1600px] mx-auto">
                        <Suspense fallback={<div className="p-20 text-center text-slate-400">Loading Tool...</div>}>
                            {renderContent()}
                        </Suspense>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
            `}</style>
        </div>
    );
}

function SidebarItem({ icon: Icon, label, id, current, set, collapsed }: any) {
    const active = current === id;
    return (
        <button
            onClick={() => set(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'} ${collapsed ? 'justify-center' : ''}`}
        >
            <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : ''}`} />
            {!collapsed && <span className="font-medium whitespace-nowrap overflow-hidden">{label}</span>}
        </button>
    );
}

function Overview({ stats, recentUsers }: any) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Spiritual Family" value={stats.totalUsers} icon={Users} trend="+12%" color="indigo" />
                <StatCard title="Recent Onboarding" value={stats.recentSignups} icon={Edit3} trend="Last 5 days" color="emerald" />
                <StatCard title="Server Health" value="Stable" icon={Server} trend="100% Uptime" color="blue" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-lg">Recent User Submissions</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Source</th>
                                <th className="px-6 py-4">Situation</th>
                                <th className="px-6 py-4">Goal</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentUsers.map((user: any) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-indigo-600">{user.source || 'N/A'}</td>
                                    <td className="px-6 py-4 text-slate-600 max-w-sm truncate">{user.current_situation}</td>
                                    <td className="px-6 py-4 text-slate-800">{user.goals}</td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
    const bg = color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600';
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5">
            <div className={`p-4 rounded-xl ${bg}`}><Icon className="w-7 h-7" /></div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                <p className="text-xs text-slate-400 mt-1">{trend}</p>
            </div>
        </div>
    );
}

function LoadingScreen() {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="w-12 h-12 border-4 border-indigo-500 border-t-white rounded-full animate-spin" /></div>;
}
