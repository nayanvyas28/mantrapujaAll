import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Star, Clock } from 'lucide-react';
import { BookingTrigger } from './BookingTrigger';

interface TimingSectionProps {
    timing: {
        subtitle?: string;
        title: string;
        occasions: string[];
        occasionsTitle?: string;
        muhuratTitle?: string;
        muhurat: string;
    };
}

export const TimingSection = ({ timing }: TimingSectionProps) => {
    return (
        <section id="timing" className="py-6 md:py-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            ></div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <SectionHeading subtitle={timing.subtitle || "Muhurat"}>{timing.title}</SectionHeading>

                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-orange-500/20 dark:border-white/10 shadow-2xl group transition-all duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
                            {/* Left: Occasions */}
                            <div className="p-6 sm:p-10 md:p-14 text-left border-b md:border-b-0 md:border-r border-orange-500/10 dark:border-white/10 relative overflow-hidden backdrop-blur-sm">
                                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-3 md:mb-5 font-serif flex items-center gap-3 md:gap-4 text-gray-900 dark:text-white">
                                    <div className="relative w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-inner">
                                        <Star className="w-4 h-4 md:w-6 md:h-6 text-orange-500" fill="currentColor" />
                                    </div>
                                    {timing.occasionsTitle || "Cosmic Alignment"}
                                </h2>

                                <ul className="space-y-3 md:space-y-6 relative z-10">
                                    {timing.occasions.map((occasion, i) => (
                                        <li key={i} className="flex items-start gap-3 md:gap-4 p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-white/40 dark:bg-white/5 border border-transparent hover:border-orange-500/30 transition-all duration-300 group/item">
                                            <div className="mt-1 bg-orange-500/10 p-1 md:p-1.5 rounded-lg">
                                                <Star className="w-3.5 h-3.5 md:w-4 h-4 text-orange-500 opacity-60 group-hover/item:opacity-100 transition-all" />
                                            </div>
                                            <span className="text-sm md:text-lg text-gray-700 dark:text-white/80 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors font-medium tracking-tight">
                                                {occasion}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                    {/* Cosmic Pulse Button */}
                                    <div className="relative w-full mt-8">
                                        <BookingTrigger variant="primary" />
                                    </div>
                            </div>

                            {/* Right: Muhurat Display */}
                            <div className="p-6 sm:p-10 md:p-14 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-transparent to-orange-500/[0.03] dark:to-orange-500/[0.05]">
                                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 font-serif text-gray-900 dark:text-white text-center md:text-left flex items-center justify-center md:justify-start gap-3 md:gap-4">
                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner">
                                        <Clock className="w-4 h-4 md:w-6 md:h-6 text-purple-600 dark:text-purple-300" />
                                    </div>
                                    {timing.muhuratTitle || "Shubh Muhurat"}
                                </h2>

                                <div className="relative mb-8 group/date">
                                    <div className="relative bg-white/70 dark:bg-slate-900/70 border border-orange-500/30 dark:border-white/10 p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] text-center shadow-xl backdrop-blur-xl">
                                        <p className="text-lg md:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-500 dark:to-orange-400 tracking-wide font-serif leading-relaxed">
                                            "{timing.muhurat}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
