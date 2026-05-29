import React from 'react';
import { SectionHeading } from './SectionHeading';
import { CheckCircle } from 'lucide-react';
import { BookingTrigger } from './BookingTrigger';

interface ProcessSectionProps {
    process: {
        title: string;
        subtitle?: string;
        steps: Array<{ step: number; title: string; description: string }>;
        features: string[];
    };
    themeColor?: string;
    onBookClick?: () => void; // This will be passed from the page level (handled by a client island)
}

export const ProcessSection = ({ process, themeColor = "saffron" }: ProcessSectionProps) => {
    return (
        <section id="ritual-process" className={`py-8 md:py-16 relative overflow-hidden bg-gradient-to-b from-transparent via-orange-500/5 to-transparent dark:via-orange-900/10`}>
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            ></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <SectionHeading subtitle={process.subtitle || "Vedic Vidhi"}>{process.title}</SectionHeading>

                <div className="mt-8 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 lg:block overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-30 blur-[2px]"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/40 to-transparent"></div>
                    </div>

                    <div className="space-y-6 md:space-y-12 lg:relative">
                        {process.steps.map((step, idx) => (
                            <div key={idx} className={`flex flex-col lg:flex-row items-start lg:items-center gap-8 ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="w-full lg:w-5/12 pl-12 lg:pl-0 pr-2 lg:pr-0">
                                    <div className="group relative bg-white/70 dark:bg-card/40 backdrop-blur-xl p-5 md:p-8 rounded-2xl md:rounded-3xl border border-orange-500/20 dark:border-white/10 hover:border-orange-500/50 transition-all duration-500">
                                        <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                                            <div className="relative flex-shrink-0">
                                                <div className="relative w-10 h-10 md:w-12 lg:w-14 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center text-orange-600 dark:text-orange-400 font-black text-lg md:text-xl lg:text-2xl border-2 border-orange-500/30">
                                                    {step.step}
                                                </div>
                                            </div>
                                            <h3 className="text-lg md:text-2xl lg:text-3xl font-black font-serif pt-1 md:pt-3 text-gray-900 dark:text-white leading-tight">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className="text-xs md:text-base text-gray-600 dark:text-muted-foreground leading-relaxed pl-0 md:pl-[4rem] relative z-10">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute left-6 lg:left-1/2 w-8 h-8 -translate-x-1/2 flex items-center justify-center z-20">
                                    <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 ring-4 ring-white dark:ring-slate-900 shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                                </div>
                                <div className="hidden lg:block w-5/12"></div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {process.features.map((feature, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white/50 dark:bg-card/30 border border-orange-500/10 hover:border-orange-500/30 transition-all">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <span className="font-semibold text-sm md:text-base">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* Enhanced "Sacred Fire" CTA Button */}
                    <div className="text-center mt-10 relative z-20">
                        <BookingTrigger />
                    </div>
                </div>
            </div>
        </section>
    );
};
