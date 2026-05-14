import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Star } from 'lucide-react';
import { BookingTrigger } from './BookingTrigger';

interface BenefitsSectionProps {
    benefits: {
        title: string;
        cards: Array<{ icon: string; title: string; description: string }>;
    };
}

export const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
    return (
        <section id="benefits" className="py-8 md:py-16 relative z-10">
            <div className="container mx-auto px-4">
                <SectionHeading subtitle="Blessings">{benefits.title}</SectionHeading>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.cards.map((card, idx) => (
                        <div key={idx} className="group relative h-full">
                            <div className="relative h-full bg-white/40 dark:bg-card/40 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] md:rounded-[32px] border border-white/40 dark:border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl overflow-hidden flex flex-col">
                                {/* Animated Aura Gradient (CSS based) */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Top Sparkle */}
                                <div className="absolute top-0 right-0 p-6 md:p-8 opacity-0 group-hover:opacity-20 transition-opacity">
                                    <Star className="w-16 h-16 md:w-24 md:h-24 text-orange-500 rotate-12" />
                                </div>

                                <div className="text-4xl md:text-6xl mb-6 md:mb-8 transform group-hover:scale-110 md:group-hover:rotate-6 transition-transform duration-500 origin-left filter drop-shadow-2xl">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 font-serif text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors tracking-tight">
                                    {card.title}
                                </h3>
                                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed flex-grow font-light">
                                    {card.description}
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
