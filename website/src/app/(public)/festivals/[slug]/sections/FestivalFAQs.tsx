import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Festival } from '@/lib/festivalData';

interface FestivalFAQsProps {
    festival: Festival;
}

export const FestivalFAQs = ({ festival }: FestivalFAQsProps) => {
    return (
        <section className="py-24 relative z-10">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12 bg-saffron/30"></div>
                        <span className="text-saffron font-black tracking-[0.3em] uppercase text-xs">Queries</span>
                        <div className="h-px w-12 bg-saffron/30"></div>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black font-serif text-foreground leading-tight">
                        Common <span className="text-saffron">Questions</span>
                    </h2>
                </div>

                <div className="space-y-6">
                    {(festival.faqs && festival.faqs.length > 0) ? (
                        festival.faqs.map((item, i) => (
                            <details 
                                key={i} 
                                className="group bg-card/40 backdrop-blur-xl p-8 rounded-3xl border border-border/50 cursor-pointer open:bg-card open:shadow-2xl transition-all duration-500"
                            >
                                <summary className="font-black text-xl md:text-2xl mb-2 flex items-center justify-between list-none select-none font-serif">
                                    <div className="flex items-start gap-5">
                                        <div className="mt-1 w-10 h-10 rounded-2xl bg-saffron/10 flex items-center justify-center text-saffron shadow-sm flex-shrink-0 group-open:bg-saffron group-open:text-white transition-colors">
                                            <HelpCircle className="w-5 h-5" />
                                        </div>
                                        <span className="group-hover:text-saffron transition-colors pr-4">{item.question}</span>
                                    </div>
                                    <ChevronDown className="w-6 h-6 text-muted-foreground group-open:rotate-180 transition-transform duration-500 flex-shrink-0" />
                                </summary>
                                <div className="text-muted-foreground ml-14 mt-6 leading-relaxed text-lg animate-fade-in border-l-2 border-saffron/20 pl-8 pb-2">
                                    {item.answer}
                                </div>
                            </details>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-card/20 rounded-[3rem] border border-dashed border-border">
                            <p className="text-muted-foreground italic font-serif text-lg">Detailed spiritual guidance for this festival is coming soon...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
