import React from 'react';
import { BookText, Quote } from 'lucide-react';

interface LocationNarrativeProps {
    narrative: string;
}

export const LocationNarrative = ({ narrative }: LocationNarrativeProps) => {
    if (!narrative) return null;

    return (
        <section id="narrative" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-4 rounded-[24px] bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
                    <BookText className="w-8 h-8 text-indigo-500" />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Divine Narrative</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-transparent rounded-full mt-2"></div>
                </div>
            </div>

            <div className="relative">
                <Quote className="absolute -top-10 -left-10 w-20 h-20 text-indigo-500/10 -scale-x-100" />
                <div className="text-xl md:text-3xl font-serif text-foreground/90 leading-[1.6] first-letter:text-8xl first-letter:font-black first-letter:text-saffron first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8] whitespace-pre-line text-justify hyphens-auto">
                    {narrative}
                </div>
            </div>
        </section>
    );
};
