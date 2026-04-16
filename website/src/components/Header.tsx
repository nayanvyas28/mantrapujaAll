"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LogOut, User as UserIcon, LogIn, ChevronDown } from "lucide-react";
import TopBar from "./TopBar";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const { user, signOut } = useAuth();
    const { language } = useLanguage();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleLogout = async () => {
        await signOut();
        setIsMenuOpen(false);
        router.push('/');
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
            signin_signup: "Join / Sign In",
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
                                className="h-12 w-auto group-hover:opacity-80 transition-opacity"
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
            <div className="container mx-auto px-4 flex items-center justify-between py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group relative z-50">
                    <img
                        src="/logo.png"
                        alt="MantraPuja - Vedic Services Logo"
                        className="h-8 xs:h-9 md:h-11 w-auto group-hover:scale-105 transition-all duration-300"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-1 bg-zinc-50 dark:bg-white/5 px-2 py-1 rounded-full border border-zinc-200/50 dark:border-white/5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="px-4 py-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-orange-600 transition-colors uppercase tracking-tight rounded-full hover:bg-white dark:hover:bg-white/10"
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
                        className="hidden sm:inline-flex items-center justify-center h-9 px-6 font-black text-[10px] text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-[0_3px_0_0_#9a3412] hover:translate-y-[1px] active:translate-y-[3px] transition-all uppercase tracking-widest"
                    >
                        Book Puja
                    </Link>

                    {/* Auth Section */}
                    <div className="flex items-center gap-2 pl-2 border-l border-zinc-200 dark:border-white/10">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link href="/profile" className="hidden border-r md:flex flex-col items-end pr-3 border-zinc-200 dark:border-white/10">
                                    <span className="text-[10px] font-black text-zinc-900 dark:text-white capitalize truncate max-w-[100px]">
                                        {user.email?.split('@')[0]}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-red-500 hover:text-white transition-all text-zinc-600 dark:text-zinc-400"
                                    title={t.logout}
                                >
                                    <LogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-all group"
                            >
                                <div className="hidden sm:flex flex-col items-end pr-2">
                                    <span className="text-[9px] font-black text-zinc-600 dark:text-zinc-300 uppercase tracking-tighter">
                                        {t.signin_signup}
                                    </span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-zinc-950 dark:bg-white/10 flex items-center justify-center text-white dark:text-orange-500 group-hover:scale-110 transition-transform">
                                    <UserIcon size={16} />
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-zinc-600 dark:text-zinc-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <LogOut size={24} /> : <div className="flex flex-col gap-1.5"><div className="w-6 h-0.5 bg-current" /><div className="w-6 h-0.5 bg-current" /></div>}
                    </button>
                </div>
            </div>

            {/* TopBar moved below the main header content */}
            <TopBar />

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
                                    className="text-lg font-bold text-zinc-800 dark:text-zinc-100"
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
