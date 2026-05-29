import React from 'react';
import { Info, MessageCircle } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

interface LocationFAQsProps {
    faqs: FAQ[];
}

export const LocationFAQs = ({ faqs }: LocationFAQsProps) => {
    if (!faqs?.length) return null;

    return (
        <section id="faqs" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-4 rounded-[24px] bg-blue-500/10 border border-blue-500/20 shadow-inner">
                    <Info className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Divine Insights</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full mt-2"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {faqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className="group p-8 md:p-10 bg-card/60 backdrop-blur-xl border border-border/40 rounded-[40px] hover:border-blue-500/40 transition-all shadow-lg"
                    >
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black font-serif mb-4 text-foreground group-hover:text-blue-600 transition-colors">
                                    {faq.question}
                                </h3>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
