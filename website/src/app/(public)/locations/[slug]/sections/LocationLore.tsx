import React from 'react';
import { Star } from 'lucide-react';

interface LocationLoreProps {
    lore: string;
}

export const LocationLore = ({ lore }: LocationLoreProps) => {
    if (!lore) return null;

    return (
        <section id="legends" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-4 rounded-[24px] bg-rose-500/10 border border-rose-500/20 shadow-inner">
                    <Star className="w-8 h-8 text-rose-500" />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Ancient Lore</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-rose-500 to-transparent rounded-full mt-2"></div>
                </div>
            </div>
            <div className="bg-rose-500/5 backdrop-blur-xl border border-rose-500/20 rounded-[48px] p-10 md:p-14 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[100px]"></div>
                <div className="text-xl md:text-3xl text-foreground/90 leading-relaxed italic font-serif text-center px-4">
                    "{lore}"
                </div>
            </div>
        </section>
    );
};
