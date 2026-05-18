import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Festival } from '@/lib/festivalData';

interface FestivalRitualsProps {
    festival: Festival;
}

export const FestivalRituals = ({ festival }: FestivalRitualsProps) => {
    return (
        <section className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12 bg-saffron/30"></div>
                        <span className="text-saffron font-black tracking-[0.3em] uppercase text-xs">Vedic Vidhi</span>
                        <div className="h-px w-12 bg-saffron/30"></div>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black font-serif text-foreground leading-tight">
                        Sacred <span className="text-saffron">Rituals</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {(festival.rituals && festival.rituals.length > 0) ? (
                        festival.rituals.map((ritual, i) => (
                            <article key={i} className="group relative">
                                {/* Bottom Glow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-saffron/10 to-transparent rounded-[3rem] translate-y-6 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                <div className="relative bg-card rounded-[3rem] p-10 md:p-12 border border-border/50 shadow-xl transition-all duration-500 group-hover:-translate-y-3 overflow-hidden h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-saffron/10 flex items-center justify-center text-saffron shadow-inner">
                                            <CheckCircle className="w-8 h-8" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-4 py-1.5 rounded-full bg-secondary/50 border border-border shadow-sm">
                                            {ritual.timing}
                                        </span>
                                    </div>
                                    <h3 className="font-black text-3xl mb-6 font-serif group-hover:text-saffron transition-colors leading-tight">{ritual.name}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-lg flex-grow">{ritual.description}</p>
                                    
                                    <div className="mt-8 pt-8 border-t border-border/30 flex items-center gap-2 text-saffron font-bold text-xs uppercase tracking-widest">
                                        <div className="w-2 h-2 rounded-full bg-saffron animate-pulse"></div>
                                        Core Ritual
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-card/20 rounded-[3rem] border-2 border-dashed border-saffron/20">
                            <p className="text-muted-foreground italic font-serif text-xl">Sacred Vidhi details are being compiled by our Vedic scholars...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
