"use client";

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Wallet, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const TopBar = () => {
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isCalculatorOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPos({
                top: rect.bottom,
                left: Math.min(rect.left, window.innerWidth - 260) // Keep in viewport
            });
        }
    }, [isCalculatorOpen]);

    const topLinks = [
        { name: "Rashifal", href: "/rashifal" },
        { name: "Kundli", href: "/kundli" },
        { name: "Calendar 2026", href: "/festivals?view=calendar" },
    ];

    const calculators = [
        { name: "Numerology Calculator", href: "/calculators/numerology" },
        { name: "Love Calculator", href: "/calculators/love" },
        { name: "Sun Sign", href: "/calculators/sun-sign" },
        { name: "Moon Sign (Rasi)", href: "/calculators/moon-sign" },
        { name: "Mangal Dosha", href: "/calculators/mangal-dosha" },
        { name: "Shani Sade Sati", href: "/calculators/sade-sati" },
        { name: "Birth Chart (Natal)", href: "/calculators/birth-chart" },
        { name: "Lo Shu Grid", href: "/calculators/lo-shu" },
        { name: "All 19+ Calculators", href: "/calculators" },
    ];

    return (
        <div className="bg-[#FFB100] w-full py-2 px-3 sm:px-4 border-b border-orange-600/10">
            <div className="container mx-auto flex items-center justify-between gap-4">
                {/* Left: Logo & Links */}
                <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    {/* <Link href="/" className="shrink-0">
                        <img src="/logo.png" alt="Logo" className="h-8 w-auto invert brightness-0 opacity-80" />
                    </Link> */}
                    
                    <nav className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-3 sm:gap-4 md:gap-5 scroll-smooth py-1">
                        {topLinks.map((link, index) => (
                            <React.Fragment key={link.name}>
                                <Link 
                                    href={link.href}
                                    className="text-xs xl:text-sm font-semibold text-orange-950 hover:text-black whitespace-nowrap transition-colors"
                                >
                                    {link.name}
                                </Link>
                                <span className="shrink-0 text-orange-900/20 text-[10px] hidden sm:block">|</span>
                            </React.Fragment>
                        ))}

                        {/* Calculator Dropdown - Inside scrollable area */}
                        <div 
                            ref={buttonRef}
                            className="relative flex items-center py-1 cursor-pointer"
                            onMouseEnter={() => setIsCalculatorOpen(true)}
                            onMouseLeave={() => setIsCalculatorOpen(false)}
                            onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                        >
                            <button className="flex items-center gap-1 text-xs xl:text-sm font-semibold text-orange-950 hover:text-black whitespace-nowrap transition-colors pointer-events-none">
                                Calculator
                                <span className={`inline-block transition-transform duration-200 ${isCalculatorOpen ? 'rotate-180 text-black' : 'text-orange-900/50'}`}>▾</span>
                            </button>

                            {/* Dropdown Menu - Fixed position to avoid clipping */}
                            {isCalculatorOpen && (
                                <div 
                                    className="fixed bg-white rounded-md shadow-2xl border border-orange-200 py-3 z-[2000] animate-in fade-in zoom-in-95 duration-200 origin-top"
                                    style={{ 
                                        top: `${dropdownPos.top}px`, 
                                        left: `${dropdownPos.left}px`,
                                        width: '256px'
                                    }}
                                >
                                    <div className="flex flex-col">
                                        {calculators.map((calc) => (
                                            <Link
                                                key={calc.name}
                                                href={calc.href}
                                                className="block px-5 py-2.5 text-xs xl:text-sm font-bold text-gray-800 hover:bg-orange-50 hover:text-orange-700 transition-colors border-b border-gray-50 last:border-0"
                                                onClick={() => setIsCalculatorOpen(false)}
                                            >
                                                {calc.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 shrink-0">
                    {/* Chat Button */}
                    <button 
                        className="flex items-center gap-2 bg-white px-2 sm:px-3 py-1 rounded-md shadow-sm hover:bg-gray-50 transition-all group scale-95 sm:scale-100"
                        title="Chat with Astrologer"
                    >
                        <MessageCircle className="w-4 h-4 text-gray-600" />
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-700 hidden xs:block">Chat</span>
                        <span className="hidden md:inline text-xs font-semibold text-gray-700">with Astrologer</span>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                    </button>

                    {/* Wallet */}
                    {/* <div className="flex items-center gap-2 border border-orange-400/50 px-2 py-1 rounded-md bg-[#FFB100]/50 scale-90 xl:scale-100">
                        <Wallet className="w-4 h-4 text-gray-800" />
                        <span className="text-xs font-bold text-gray-900">₹ 0</span>
                    </div> */}

                    {/* Auth */} 
                    <Link 
                        href="/login"
                        className="text-[10px] sm:text-xs xl:text-sm font-black text-orange-950 hover:text-black transition-colors flex items-center gap-1 sm:gap-1.5 ml-1 sm:ml-4 whitespace-nowrap"
                    >
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">SIGN IN / SIGN UP</span>
                        <span className="sm:hidden">LOGIN</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
