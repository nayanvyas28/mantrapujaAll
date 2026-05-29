import React from 'react';
import { SectionHeading } from './SectionHeading';
import { getPujaIcon } from './utils';
import { BookingTrigger } from './BookingTrigger';

interface WhyPerformSectionProps {
    whyPerform: {
        title: string;
        reasons: Array<{ icon: string; title: string; description: string }>;
    };
}

export const WhyPerformSection = ({ whyPerform }: WhyPerformSectionProps) => {
    return (
        <section id="why-perform" className="py-8 md:py-16 relative z-10">
            <div className="container mx-auto px-4">
                <SectionHeading subtitle="Purpose">{whyPerform.title}</SectionHeading>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {whyPerform.reasons.map((reason, idx) => (
                        <div
                            key={idx}
                            className="group relative p-1 rounded-3xl md:rounded-[32px] bg-gradient-to-br from-white/30 to-white/10 dark:from-white/10 dark:to-transparent backdrop-blur-xl border border-white/20 hover:border-orange-500/50 transition-all duration-500 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative p-6 md:p-8 h-full flex flex-col items-center text-center z-10">
                                <div className="relative w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6">
                                    <div className="relative w-full h-full bg-gradient-to-br from-white to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl md:rounded-3xl flex items-center justify-center border border-orange-500/20 shadow-xl">
                                        <div className="text-orange-500 scale-90 md:scale-100 group-hover:scale-110 transition-transform duration-300">
                                            {getPujaIcon(reason.icon)}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-black text-lg md:text-xl mb-3 md:mb-4 font-serif text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                                    {reason.title}
                                </h3>
                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                                    {reason.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* CTA Button */}
                <div className="text-center mt-6 md:mt-10 px-4">
                    <BookingTrigger variant="secondary" />
                </div>
            </div>
        </section>
    );
};
