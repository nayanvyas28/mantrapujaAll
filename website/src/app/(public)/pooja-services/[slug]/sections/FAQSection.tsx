import React from 'react';
import { SectionHeading } from './SectionHeading';
import { ChevronDown } from 'lucide-react';

interface FAQSectionProps {
    faq: {
        title?: string;
        items: Array<{ question: string; answer: string }>;
    };
}

export const FAQSection = ({ faq }: FAQSectionProps) => {
    if (!faq.items || faq.items.length === 0) return null;

    return (
        <section id="faq" className="py-6 md:py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <SectionHeading subtitle="Common Questions">{faq.title || "Frequently Asked Questions"}</SectionHeading>
                <div className="space-y-4 md:space-y-6">
                    {faq.items.map((item, i) => (
                        <details
                            key={i}
                            open={i === 0}
                            className="group bg-white/40 dark:bg-card/40 backdrop-blur-xl p-5 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/40 dark:border-white/10 cursor-pointer open:bg-white/60 dark:open:bg-card shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            <summary className="font-black text-lg md:text-xl mb-2 flex items-center justify-between list-none select-none text-gray-900 dark:text-white">
                                <div className="flex items-start gap-3 md:gap-5">
                                    <div className="mt-0.5 md:mt-1 w-6 h-6 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-600 font-bold text-xs md:text-base">?</div>
                                    <span className="group-hover:text-orange-600 transition-colors leading-tight">{item.question}</span>
                                </div>
                                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-orange-500 group-open:rotate-180 transition-transform duration-500 flex-shrink-0" />
                            </summary>
                            <div className="text-gray-700 dark:text-muted-foreground ml-9 md:ml-13 mt-4 md:mt-6 leading-relaxed text-sm md:text-lg font-light">
                                {item.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};
