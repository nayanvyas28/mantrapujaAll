"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    List, 
    ChevronDown,
    Sun,
    Waves,
    Mountain,
    BookText,
    Compass,
    History,
    Star,
    Info
} from 'lucide-react';

interface Section {
    id: string;
    label: string;
    iconName: string;
    color: string;
}

interface LocationToCProps {
    sections: Section[];
}

const ICON_MAP: Record<string, any> = {
    sun: Sun,
    waves: Waves,
    mountain: Mountain,
    bookText: BookText,
    compass: Compass,
    history: History,
    star: Star,
    info: Info
};

export default function LocationToC({ sections }: LocationToCProps) {
    const [activeSection, setActiveSection] = useState('essence');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = sections.map(s => document.getElementById(s.id));
            const scrollPosition = window.scrollY + 200;

            for (let i = sectionElements.length - 1; i >= 0; i--) {
                const el = sectionElements[i];
                if (el && el.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden lg:block sticky top-32 h-fit space-y-4 pr-8">
                <div className="flex items-center gap-3 mb-8 px-4">
                    <div className="p-2.5 rounded-xl bg-saffron/10 border border-saffron/20 shadow-inner">
                        <List className="w-5 h-5 text-saffron" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">The Sacred Way</span>
                </div>
                <div className="space-y-2 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-7 top-0 bottom-0 w-[1px] bg-border/40"></div>
                    
                    {sections.map((section) => {
                        const Icon = ICON_MAP[section.iconName] || Info;
                        const isActive = activeSection === section.id;
                        return (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`group w-full flex items-center gap-6 px-4 py-3 rounded-2xl transition-all duration-500 relative z-10 ${
                                    isActive 
                                    ? 'bg-secondary/80 backdrop-blur-md shadow-lg translate-x-2' 
                                    : 'hover:bg-secondary/40'
                                }`}
                            >
                                <div className={`relative w-6 h-6 shrink-0 flex items-center justify-center transition-all duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    <div className={`absolute inset-0 rounded-full blur-md opacity-20 ${section.color.replace('text-', 'bg-')}`}></div>
                                    <Icon className={`w-full h-full relative z-10 transition-colors duration-500 ${isActive ? section.color : 'text-muted-foreground/40 group-hover:text-muted-foreground'}`} />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-500 ${isActive ? 'text-foreground' : 'text-muted-foreground/40 group-hover:text-muted-foreground'}`}>
                                    {section.label}
                                </span>
                                {isActive && (
                                    <motion.div 
                                        layoutId="toc-indicator"
                                        className="absolute right-0 w-1 h-6 bg-saffron rounded-full"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="lg:hidden fixed bottom-8 right-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-16 h-16 rounded-full bg-saffron text-white shadow-2xl flex items-center justify-center border-4 border-white/20 backdrop-blur-xl animate-bounce-slow"
                >
                    <List className="w-7 h-7" />
                </button>
                
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="absolute bottom-20 right-0 w-72 bg-card/95 backdrop-blur-2xl rounded-[32px] p-4 shadow-2xl border border-border/40 mb-4"
                        >
                            <div className="space-y-1">
                                {sections.map((section) => {
                                    const Icon = ICON_MAP[section.iconName] || Info;
                                    const isActive = activeSection === section.id;
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${isActive ? 'bg-saffron/10 text-saffron' : 'text-muted-foreground'}`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{section.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
