import React from 'react';
import { Compass } from 'lucide-react';

interface LocationArchitectureProps {
    architecture: string;
}

export const LocationArchitecture = ({ architecture }: LocationArchitectureProps) => {
    if (!architecture) return null;

    return (
        <section id="architecture" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-4 rounded-[24px] bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
                    <Compass className="w-8 h-8 text-emerald-500" />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Divine Design</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mt-2"></div>
                </div>
            </div>
            <div className="bg-emerald-500/5 backdrop-blur-xl border border-emerald-500/20 rounded-[48px] p-10 md:p-14 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"></div>
                <div className="text-xl md:text-2xl text-muted-foreground leading-relaxed whitespace-pre-line font-medium border-l-4 border-emerald-500/30 pl-8">
                    {architecture}
                </div>
            </div>
        </section>
    );
};
