import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // We make a simple signout action for the server-side component form
    async function signOut() {
        'use server';
        const supabase = await createClient();
        await supabase.auth.signOut();
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="flex items-center justify-between mb-12 py-4 border-b border-white/10">
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                            Mantra Pooja Admin
                        </h1>
                        <p className="text-sm text-gray-400">Welcome back, {user.email}</p>
                    </div>
                    <form action={signOut}>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium text-gray-300 hover:text-white">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </form>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* NEW: Notification Manager at 1st Position */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 to-indigo-900/30 border border-purple-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-1">Notification Manager</h2>
                            <p className="text-sm text-gray-300 mb-4">Schedule daily Tithi and Festival alerts. Configure delivery time and message templates.</p>
                        </div>
                        <a
                            href="/dashboard/notifications"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Manage Notifications
                        </a>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 to-orange-900/30 border border-purple-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-1">App Home Settings</h2>
                            <p className="text-sm text-gray-300 mb-4">Curate exactly what displays on the Mobile App Home Screen.</p>
                        </div>
                        <a
                            href="/dashboard/home-settings"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Manage Home
                        </a>
                    </div>

                    {/* NEW: Website Homepage Settings */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-900/40 to-purple-900/30 border border-orange-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-1">Website Homepage</h2>
                            <p className="text-sm text-gray-300 mb-4">Manage Top Banners and Popular Vedic Pujas displayed on the main Website Homepage.</p>
                        </div>
                        <a
                            href="/dashboard/website-home"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Manage Website Home
                        </a>
                    </div>

                    {/* NEW: Marketing Popups */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-900/40 to-amber-900/30 border border-orange-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-1">Marketing Popups</h2>
                            <p className="text-sm text-gray-300 mb-4">Launch cross-platform popup campaigns with smart scheduling and targeting.</p>
                        </div>
                        <a
                            href="/dashboard/popups"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Manage Popups
                        </a>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-cyan-900/30 border border-blue-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">Music Manager</h2>
                            <p className="text-sm text-gray-300 mb-4">Add & Manage Deities, Bhajans, Mantras and more Assets.</p>
                        </div>
                        <a
                            href="/dashboard/music"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Manage Music
                        </a>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-900/40 to-red-900/30 border border-orange-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-1">Puja Manager</h2>
                            <p className="text-sm text-gray-300 mb-4">Manage your Puja catalog and configure ₹999 Special Offers.</p>
                        </div>
                        <a
                            href="/dashboard/pujas"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Manage Pujas
                        </a>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/30 border border-blue-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-1">AI Guru Chat</h2>
                            <p className="text-sm text-gray-300 mb-4">Configure the AI engine to power the smart spiritual assistant.</p>
                        </div>
                        <a
                            href="/dashboard/settings"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Configure AI
                        </a>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-r from-green-900/40 to-teal-900/30 border border-green-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-1">WhatsApp API Info</h2>
                            <p className="text-sm text-gray-300 mb-4">Securely configure the dynamic WhatsApp REST API for App user authentication routing.</p>
                        </div>
                        <a
                            href="/dashboard/settings/whatsapp"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Configure WhatsApp
                        </a>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-900/40 to-amber-900/30 border border-orange-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-1">Referral Manager</h2>
                            <p className="text-sm text-gray-300 mb-4">Customize the message users share when inviting friends.</p>
                        </div>
                        <a
                            href="/dashboard/referral"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Manage Referrals
                        </a>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-r from-saffron to-amber-900/30 border border-orange-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-saffron bg-clip-text text-transparent mb-1">Kundli Manager</h2>
                            <p className="text-sm text-gray-300 mb-4">Manage Astrology API providers, pricing, and display settings for the Kundli section.</p>
                        </div>
                        <a
                            href="/dashboard/kundli"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Manage Kundli
                        </a>
                    </div>

                    {/* NEW: Reels/Feed Manager */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-purple-900/30 border border-blue-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">Divine Reels Feed</h2>
                            <p className="text-sm text-gray-300 mb-4">Curate vertical video "reels" for the center Feed tab on the mobile app.</p>
                        </div>
                        <a
                            href="/dashboard/reels"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Manage Reels
                        </a>
                    </div>
                </div>

                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
                        <h2 className="text-lg font-semibold mb-2">Total Users</h2>
                        <p className="text-3xl font-bold text-purple-400">1,248</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-colors">
                        <h2 className="text-lg font-semibold mb-2">Active Bookings</h2>
                        <p className="text-3xl font-bold text-orange-400">34</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
                        <h2 className="text-lg font-semibold mb-2">Revenue</h2>
                        <p className="text-3xl font-bold text-purple-400">₹45,200</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
