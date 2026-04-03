"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TranslationDropdown } from "./ui/TranslationDropdown";
import { supabase } from "@/lib/supabaseClient";
import { LogOut, User as UserIcon, LogIn } from "lucide-react";
import TopBar from "./TopBar";

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);

    // Track Auth Session
    useEffect(() => {
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
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
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <img
                                src="/logo.png"
                                alt="MantraPuja - Admin Dashboard Logo"
                                className="h-12 w-auto group-hover:opacity-80 transition-opacity"
                            />
                        </Link>

                        {/* Admin Navigation Tabs */}
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

                    {/* Utilities */}
                    <div className="flex items-center gap-4">
                        <TranslationDropdown />
                        <ThemeToggle />
                    </div>
                </div>
            </header>
        );
    }

    // --- Standard Public Header ---
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Puja", href: "/pooja-services" },
        { name: "Festivals", href: "/festivals" },
        { name: "Locations", href: "/locations" },
        { name: "Blog", href: "/blog" }
    ];

    const allLinks = navLinks;


    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isMenuOpen
                ? "bg-white/90 shadow-md pb-4 pt-0"
                : scrolled
                    ? "bg-background/80 lg:backdrop-blur-xl shadow-md border-b border-saffron/20 pb-2 sm:pb-4 pt-0"
                    : "bg-white/90 lg:bg-transparent pb-3 sm:pb-5 lg:pb-6 pt-0"
                } max-lg:bg-white/90 max-lg:pb-3 max-lg:pt-0`}
        >
            <TopBar />
            <div className="container mx-auto px-4 flex items-center justify-between pt-2">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group relative z-50">
                    <img
                        src="/logo.png"
                        alt="MantraPuja - Vedic Services Logo"
                        className="h-10 xs:h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto group-hover:scale-105 transition-all duration-300"
                    />
                </Link>

                {/* Desktop Navigation - Upgraded to lg for better tablet space */}
                <nav className="hidden lg:flex items-center space-x-1 bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/40 shadow-sm">
                    {allLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative px-4 xl:px-6 py-2 text-sm xl:text-base font-semibold text-foreground/80 hover:text-saffron transition-colors duration-300 group rounded-full hover:bg-saffron/10 whitespace-nowrap"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* Auth Status removed from Header - now in TopBar */}

                    {/* 3D Primary Button: Book A Pooja */}
                    <Link
                        href="/pooja-services"
                        className="hidden sm:inline-flex items-center justify-center h-9 sm:h-10 xl:h-11 px-4 sm:px-6 xl:px-10 font-bold text-xs sm:text-sm xl:text-base text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-[0_4px_0_0_#9a3412] hover:shadow-[0_2px_0_0_#9a3412] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all duration-150 min-w-[110px] xl:min-w-[150px]"
                    >
                        Book Puja
                    </Link>

                    <div className="border-l border-border/50 pl-2 sm:pl-4 ml-1 sm:ml-2 flex items-center gap-2">
                        <TranslationDropdown />
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button - Now visible up to lg */}
                    <button
                        className={`lg:hidden p-2 transition-colors z-50 ${isMenuOpen ? "text-slate-900" : "text-foreground/80 hover:text-saffron"}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Menu</span>
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white/90 backdrop-blur-2xl z-40 lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full pt-20 sm:pt-24 pb-12 overflow-y-auto no-scrollbar">
                    <div className="flex flex-col items-center space-y-6 sm:space-y-8 p-4 sm:p-6">
                        {allLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xl sm:text-2xl font-bold text-slate-900 hover:text-saffron transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col space-y-4 w-full max-w-[280px] sm:max-w-xs pt-8 border-t border-border">
                            <Link
                                href="/pooja-services"
                                className="flex items-center justify-center w-full h-12 font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-[0_4px_0_0_#9a3412] active:translate-y-[4px] active:shadow-none transition-all duration-150"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Book A Pooja
                            </Link>
                            {/* Auth Status removed from Mobile Menu - now in TopBar */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
