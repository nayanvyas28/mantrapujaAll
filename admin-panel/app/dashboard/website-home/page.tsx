import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { LogOut, ArrowLeft, Image as ImageIcon, Star, Layout } from 'lucide-react';
import Link from 'next/link';

export default async function WebsiteHomeSettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    async function signOut() {
        'use server';
        const supabaseClient = await createClient();
        await supabaseClient.auth.signOut();
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="flex items-center justify-between mb-12 py-4 border-b border-white/10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/dashboard" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group">
                                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                            </Link>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                Website Homepage Settings
                            </h1>
                        </div>
                        <p className="text-sm text-gray-400 pl-12">Manage what appears on the Mantra Pooja Website homepage</p>
                    </div>
                    <form action={signOut}>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium text-gray-300 hover:text-white">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </form>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Banners */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-900/40 to-purple-900/30 border border-orange-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Home Page Banners</h2>
                            </div>
                            <p className="text-sm text-gray-300 mb-2 mt-2">Manage sliding banners for the top section. Note: Changing this also affects the Mobile App.</p>
                            <p className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded w-fit mb-4">Recommended Ratio: 4:1 (e.g., 1600x400px)</p>
                        </div>
                        <a
                            href="/dashboard/banners"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg cursor-pointer"
                        >
                            Manage top Banner
                        </a>
                    </div>

                    {/* Popular Pujas */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-900/40 to-red-900/30 border border-amber-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                                    <Star className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Popular Vedic Pujas</h2>
                            </div>
                            <p className="text-sm text-gray-300 mb-4 mt-2">Select exactly 6 pujas that will show up in the "Popular Vedic Pujas" section on the website homepage.</p>
                        </div>
                        <Link
                            href="/dashboard/website-home/popular-pujas"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Select Popular Pujas
                        </Link>
                    </div>

                    {/* Why Choose Us */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 to-blue-900/30 border border-purple-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                    <Star className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Why Choose Us?</h2>
                            </div>
                            <p className="text-sm text-gray-300 mb-2 mt-2">Manage the 6 feature cards (dynamic images, titles, and descriptions) for the "Why Choose Mantra Puja?" section.</p>
                            <p className="text-[11px] font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded w-fit mb-4">Recommended Ratio: 16:9</p>
                        </div>
                        <Link
                            href="/dashboard/website-home/features"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Manage Features
                        </Link>
                    </div>

                    {/* Quick Access Cards */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-900/40 to-blue-900/30 border border-cyan-500/20 flex flex-col justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                                    <Layout className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Quick Access Cards</h2>
                            </div>
                            <p className="text-sm text-gray-300 mb-2 mt-2">Manage the 6 quick access cards (Kundali, Rashifal, etc.) below the main banner.</p>
                            <p className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded w-fit mb-4">Recommended Ratio: 1:1 (Square)</p>
                        </div>
                        <Link
                            href="/dashboard/website-home/quick-access"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors w-full justify-center shadow-lg"
                        >
                            Manage Quick Access
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
