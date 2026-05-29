import React from 'react';
import { History, Sun, HandHelping, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface LocationWisdomProps {
    wisdom: string;
    locationName: string;
}

export const LocationWisdom = ({ wisdom, locationName }: LocationWisdomProps) => {
    if (!wisdom) return null;

    return (
        <section id="vedic" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-4 rounded-[24px] bg-purple-500/10 border border-purple-500/20 shadow-inner">
                    <History className="w-8 h-8 text-purple-500" />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Vedic Wisdom</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full mt-2"></div>
                </div>
            </div>
            <div className="p-10 md:p-16 rounded-[48px] border-4 border-double border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-background to-background relative overflow-hidden mb-12">
                <Sun className="absolute -top-10 -right-10 w-32 h-32 text-purple-500/10" />
                <div className="text-2xl md:text-4xl text-foreground font-serif leading-tight italic mb-8">
                    "Scriptural Foundation"
                </div>
                <div className="text-xl md:text-2xl text-muted-foreground leading-relaxed whitespace-pre-line">
                    {wisdom}
                </div>
            </div>

            <div className="flex items-center justify-center">
                <Link
                    href={`/contact-us?subject=Scholar Consultation for ${locationName}`}
                    className="group relative flex items-center gap-6 p-1 pr-10 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 rounded-full transition-all duration-500 overflow-hidden"
                >
                    <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                        <HandHelping className="w-8 h-8" />
                    </div>
                    <div className="text-left">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 mb-1">Seek Wisdom</h4>
                        <p className="text-xl font-black font-serif text-foreground">Consult with a Scholar</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-purple-500 group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>
        </section>
    );
};
