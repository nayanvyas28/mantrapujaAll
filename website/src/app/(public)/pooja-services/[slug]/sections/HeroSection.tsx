import React from 'react';
import Image from 'next/image';
import { BadgeCheck, Sun, Phone } from 'lucide-react';
import { BookingTrigger } from './BookingTrigger';
import CollapsibleText from "@/components/ui/CollapsibleText";

interface HeroSectionProps {
    puja: {
        name: string;
        tagline: string;
        heroImage: string;
        heroBenefits: string[];
        slug: string;
        packages?: any[];
        hero?: {
            badgeText?: string;
            glassBadgeLabel?: string;
            glassBadgeValue?: string;
        };
    };
}

export const HeroSection = ({ puja }: HeroSectionProps) => {
    const { name, tagline, heroImage, heroBenefits, hero } = puja;

    return (
        <section id="hero" className="relative pt-4 pb-2 lg:pt-8 lg:pb-6 overflow-hidden min-h-[60vh] flex items-center">
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                    src={heroImage}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="20vw"
                    className="object-cover opacity-40 dark:opacity-30 blur-[4px] scale-110"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90"></div>
            </div>

            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left flex flex-col justify-center">
                        <div>
                            <span className="inline-block px-5 py-1.5 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] mb-2 md:mb-3 border border-orange-500/20 bg-orange-500/10 text-orange-600 backdrop-blur-md">
                                {hero?.badgeText || "Premium Vedic Ritual"}
                            </span>
                            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-3 leading-[1.2] md:leading-[1.1] font-serif text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 animate-gradient pb-2 px-2">
                                {name}
                            </h1>
                            <CollapsibleText
                                text={tagline}
                                lineClamp={3}
                                className="text-sm sm:text-base lg:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2 sm:px-4 md:px-0"
                                buttonClassName="mx-auto lg:mx-0 text-xs sm:text-sm"
                            />
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                            {heroBenefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-card/40 border border-white/10 backdrop-blur-sm text-[10px] sm:text-xs md:text-sm font-medium">
                                    <BadgeCheck className="w-3.5 h-3.5 md:w-4 h-4 text-orange-600" />
                                    {benefit}
                                </div>
                            ))}
                        </div>

                        {/* Interactive Client Island (Buttons + Modal Logic) */}
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start pt-2 md:pt-4">
                            <BookingTrigger variant="primary" />
                            <a href="tel:+918989271245" className="group relative flex w-full sm:w-auto items-center justify-center gap-2 md:gap-3 h-14 md:h-16 px-6 sm:px-10 font-bold text-base md:text-lg text-green-600 bg-white border-2 border-white rounded-full shadow-[0_6px_0_0_#d1d5db] hover:shadow-[0_3px_0_0_#d1d5db] hover:translate-y-[3px] active:translate-y-[6px] transition-all animate-pulse-ring">
                                <Phone className="w-4 h-4 md:w-5 md:h-5 animate-shake-call" />
                                <span className="relative z-10 text-gray-800 text-xs md:text-base">Talk to Pandit</span>
                            </a>
                        </div>
                    </div>

                    {/* Image Showcase */}
                    <div className="lg:w-1/2 relative w-full max-w-2xl mx-auto lg:max-w-none lg:h-auto">
                        <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white/10 w-full aspect-[4/3] group">
                            <Image
                                src={heroImage}
                                alt={name}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:from-black/80 md:via-transparent"></div>

                            {/* Floating Glass Badge */}
                            <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-4 sm:left-6 md:left-10 right-4 sm:right-6 md:left-10 p-4 sm:p-6 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                        <Sun className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest opacity-80">{hero?.glassBadgeLabel || "Performed By"}</p>
                                        <p className="text-xl font-bold font-serif">{hero?.glassBadgeValue || "Certified Vedic Archaryas"}</p>
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
