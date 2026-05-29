import React from 'react';
import { Star, UserCheck } from 'lucide-react';
import CollapsibleText from "@/components/ui/CollapsibleText";

interface AboutSectionProps {
    about: {
        title: string;
        heading?: string;
        subheading?: string;
        description: string;
        significance: string;
        significanceTitle?: string;
        whoShouldPerform: string;
        whoShouldPerformTitle?: string;
    };
    themeColor?: string;
}

export const AboutSection = ({ about, themeColor = "saffron" }: AboutSectionProps) => {
    return (
        <section id="about" className="py-6 md:py-10 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                    <div className="order-2 md:order-1 relative">
                        {/* Decorative Animated Blobs */}
                        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-orange-500/10 dark:bg-orange-950/20 rounded-full blur-[100px] animate-drift-1 pointer-events-none"></div>
                        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-yellow-500/10 dark:bg-yellow-950/20 rounded-full blur-[100px] animate-drift-2 pointer-events-none"></div>

                        <div className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden group">
                            {/* Decorative Side Ornament */}
                            <div className="absolute top-0 left-0 w-1.5 md:w-2 h-full bg-gradient-to-b from-orange-500 via-yellow-500 to-orange-600 opacity-80"></div>

                            <h2 className="text-xl md:text-3xl font-black mb-3 md:mb-4 font-serif flex items-center gap-3 md:gap-4 text-gray-900 dark:text-white">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full animate-pulse"></div>
                                    <div className="relative p-2 md:p-3 bg-orange-500/20 rounded-xl md:rounded-2xl border border-orange-500/30">
                                        <Star className="w-6 h-6 md:w-8 md:h-8 text-orange-500" fill="currentColor" />
                                    </div>
                                </div>
                                {about.significanceTitle || "Spiritual Significance"}
                            </h2>
                            <p className="text-base md:text-xl leading-relaxed text-gray-700 dark:text-white/80 mb-4 md:mb-5 font-light">
                                {about.significance}
                            </p>
                            <div className="relative p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-orange-500/[0.08] to-yellow-500/[0.04] border border-orange-500/20 dark:border-white/5 shadow-inner group/box overflow-hidden">
                                <h3 className="relative z-10 font-black flex items-center gap-2 md:gap-3 mb-3 md:mb-4 text-base md:text-lg text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                                    <UserCheck className="w-5 h-5 md:w-6 md:h-6" /> {about.whoShouldPerformTitle || "Who Should Perform?"}
                                </h3>
                                <p className="relative z-10 text-sm md:text-gray-700 dark:text-starlight/80 leading-relaxed italic">{about.whoShouldPerform}</p>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 space-y-6 md:space-y-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-serif mb-4 md:mb-6 leading-tight">
                                <span className="text-orange-600">{about.heading || "Ancient Wisdom"}</span> <br />
                                {about.subheading || "For Modern Life"}
                            </h2>
                            <CollapsibleText
                                text={about.description}
                                lineClamp={3}
                                className="text-base md:text-xl text-muted-foreground leading-relaxed"
                                buttonClassName="text-sm md:text-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
