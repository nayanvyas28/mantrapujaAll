"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LogOut, User as UserIcon, LogIn, ChevronDown, Calendar, Settings, MapPin, Search, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { TranslationDropdown } from "./ui/TranslationDropdown";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
    const { user, profile, signOut } = useAuth();
    const { language } = useLanguage();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut();
            setIsProfileDropdownOpen(false);
            setIsMenuOpen(false);
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const t = {
        en: {
            welcome: "Namaste",
            logout: "Sign Out",
            signin_signup: "Join / Sign in",
            my_account: "Account"
        },
        hi: {
            welcome: "नमस्ते",
            logout: "लॉग आउट",
            signin_signup: "लॉग इन / साइन अप",
            my_account: "खाता"
        }
    }[language === 'hi' ? 'hi' : 'en'] as any;

    // --- Visual Editor Mode (Full Screen) ---
    if (pathname === '/admin/visual-editor') {
        return null;
    }

    // --- Admin Header Variant ---
    if (pathname?.startsWith('/admin')) {
        return (
            <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl shadow-sm border-b border-border py-4">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <img
                                src="/logo.png"
                                alt="MantraPuja - Admin Dashboard Logo"
                                className="h-14 w-auto group-hover:opacity-80 transition-opacity"
                            />
                        </Link>
                        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 border border-border overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none">
                            {[
                                { name: 'Visual Editor', view: null, icon: '🎨' },
                                { name: 'Categories', view: 'categories', icon: '🗂️' },
                                { name: 'Blogs', view: 'blogs', icon: '📝' },
                                { name: 'Pages', view: 'pages', icon: '📄' },
                                { name: 'SEO', view: 'seo', icon: '🌐' },
                                { name: 'Server', view: 'server', icon: '🌩️' },
                                { name: 'Import', view: 'import', icon: '📤' }
                            ].map((item) => {
                                const isActive = item.view
                                    ? pathname?.includes('dashboard') && searchParams?.get('view') === item.view
                                    : pathname?.includes('dashboard') && !searchParams?.get('view');

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.view ? `/admin/dashboard?view=${item.view}` : `/admin/dashboard`}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${isActive
                                            ? 'bg-background shadow-sm text-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                                            }`}
                                    >
                                        <span className="hidden sm:inline">{item.icon}</span>
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    // --- Standard Public Header ---
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Feed", href: "/feed" },
        { name: "Puja", href: "/pooja-services" },
        { name: "Festivals", href: "/festivals" },
        { name: "Locations", href: "/locations" },
        { name: "Blog", href: "/blog" }
    ];

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isMenuOpen
                ? "bg-white/95"
                : scrolled
                    ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-lg border-b border-orange-500/10"
                    : "bg-white dark:bg-transparent"
                }`}
        >
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group relative z-50">
                    <img
                        src="/logo.png"
                        alt="MantraPuja - Vedic Services Logo"
                        className="h-12 xs:h-14 md:h-18 w-auto group-hover:scale-105 transition-all duration-300"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-1 bg-zinc-50 dark:bg-white/5 px-2 py-1 rounded-full border border-zinc-200/50 dark:border-white/5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="px-5 py-2.5 text-sm font-black text-zinc-600 dark:text-zinc-300 hover:text-orange-600 transition-colors tracking-tight rounded-full hover:bg-white dark:hover:bg-white/10"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* 3D Primary Button: Book A Pooja */}
                    <Link
                        href="/pooja-services"
                        className="hidden sm:inline-flex items-center justify-center h-11 px-8 font-black text-xs text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-[0_4px_0_0_#9a3412] hover:translate-y-[1px] active:translate-y-[4px] transition-all tracking-widest"
                    >
                        Book Puja
                    </Link>

                    {/* Language and Theme Switchers */}
                    <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2">
                        <TranslationDropdown />
                        <ThemeToggle />
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center pl-3 ml-1 border-l border-zinc-200 dark:border-white/10">
                        {user ? (
                            <div className="relative">
                                    <button 
                                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                        className="flex items-center gap-2 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white font-bold shadow-md">
                                            {user.user_metadata?.avatar_url ? (
                                                <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <span>{(profile?.full_name?.charAt(0) || user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || user.phone?.slice(-10)?.charAt(0) || 'U').toUpperCase()}</span>
                                            )}
                                        </div>
                                        <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileDropdownOpen && (
                                            <>
                                                {/* Backdrop to close dropdown */}
                                                <div 
                                                    className="fixed inset-0 z-[190]" 
                                                    onClick={() => setIsProfileDropdownOpen(false)}
                                                />
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute right-0 mt-4 w-64 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/50 dark:border-white/10 rounded-3xl shadow-2xl z-[200] overflow-hidden"
                                                >
                                                    <div className="p-5 border-b border-zinc-100 dark:border-white/5">
                                                        <div className="font-black text-zinc-900 dark:text-white truncate">{profile?.full_name || user.user_metadata?.full_name || 'User'}</div>
                                                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest truncate">{user.email || profile?.phone || user.phone || 'Welcome'}</div>
                                                    </div>
                                                    
                                                    <div className="p-3">
                                                        <Link 
                                                            href="/profile?tab=overview" 
                                                            onClick={() => setIsProfileDropdownOpen(false)}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 dark:hover:bg-orange-500/10 text-zinc-600 dark:text-zinc-300 hover:text-orange-600 transition-all font-bold text-sm"
                                                        >
                                                            <UserIcon size={18} /> Profile Overview
                                                        </Link>
                                                        <Link 
                                                            href="/profile?tab=bookings" 
                                                            onClick={() => setIsProfileDropdownOpen(false)}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 dark:hover:bg-orange-500/10 text-zinc-600 dark:text-zinc-300 hover:text-orange-600 transition-all font-bold text-sm"
                                                        >
                                                            <Calendar size={18} /> My Bookings
                                                        </Link>
                                                        <Link 
                                                            href="/profile?tab=address" 
                                                            onClick={() => setIsProfileDropdownOpen(false)}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 dark:hover:bg-orange-500/10 text-zinc-600 dark:text-zinc-300 hover:text-orange-600 transition-all font-bold text-sm"
                                                        >
                                                            <MapPin size={18} /> Saved Address
                                                        </Link>
                                                        <Link 
                                                            href="/profile?tab=preferences" 
                                                            onClick={() => setIsProfileDropdownOpen(false)}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-orange-50 dark:hover:bg-orange-500/10 text-zinc-600 dark:text-zinc-300 hover:text-orange-600 transition-all font-bold text-sm"
                                                        >
                                                            <Settings size={18} /> Preferences
                                                        </Link>
                                                    </div>

                                                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50">
                                                        <button
                                                            onClick={handleLogout}
                                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-500 hover:text-white text-red-500 transition-all font-black text-sm"
                                                        >
                                                            <LogOut size={18} /> {t.logout}
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-all group"
                            >
                                <div className="hidden sm:flex flex-col items-end pr-3">
                                    <span className="text-xs font-black text-zinc-600 dark:text-zinc-300 tracking-tighter">
                                        {t.signin_signup}
                                    </span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-zinc-950 dark:bg-white/10 flex items-center justify-center text-white dark:text-orange-500 group-hover:scale-110 transition-transform">
                                    <UserIcon size={18} />
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-zinc-600 dark:text-zinc-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <div className="flex flex-col gap-1.5"><div className="w-6 h-0.5 bg-current" /><div className="w-6 h-0.5 bg-current" /><div className="w-6 h-0.5 bg-current" /></div>}
                    </button>
                </div>
            </div>


            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-x-0 top-full bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-white/5 p-6 lg:hidden"
                    >
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-black text-zinc-800 dark:text-zinc-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/pooja-services"
                                className="w-full py-4 bg-orange-500 text-white rounded-2xl text-center font-black"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Book A Puja
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
