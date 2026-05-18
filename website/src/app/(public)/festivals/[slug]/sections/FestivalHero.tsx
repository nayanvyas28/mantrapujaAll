import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, BadgeCheck } from 'lucide-react';
import { Festival } from '@/lib/festivalData';
import FireParticles from "@/components/FireParticles";

import { resolveFestivalHeroImage } from '@/utils/festivalUtils';

interface FestivalHeroProps {
    festival: Festival;
}

export const FestivalHero = ({ festival }: FestivalHeroProps) => {
    const heroImage = resolveFestivalHeroImage(festival.name, festival.heroImage);
    return (
        <section className="relative pt-2 pb-0 lg:pt-4 lg:pb-0 overflow-hidden min-h-[85vh] flex items-center">
            {/* Hero Background Image - Using next/image for optimization */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src={heroImage} 
                    alt={festival.heroImageAlt || festival.name || 'Festival Hero'} 
                    fill
                    priority
                    className="object-cover opacity-30 dark:opacity-20 blur-sm animate-zoom-in"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/60"></div>
            </div>

            <div className="w-full mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12">
                    {/* Text Content */}
                    <div className="lg:w-3/5 space-y-10 text-center lg:text-left flex flex-col justify-center">
                        <div className="space-y-6">
                            <span className="inline-block px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-saffron/20 bg-saffron/10 text-saffron backdrop-blur-md">
                                Auspicious Vedic Festival
                            </span>
                            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 leading-[0.9] font-serif text-transparent bg-clip-text bg-gradient-to-r from-saffron via-gold to-saffron animate-gradient pb-4">
                                {festival.name}
                            </h1>
                            <div className="relative max-w-3xl">
                                <div className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-saffron to-transparent rounded-full hidden lg:block"></div>
                                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed italic font-serif">
                                    {festival.shortDesc || "Explore the divine significance, sacred rituals, and mythological history of this auspicious occasion."}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/40 border border-white/10 backdrop-blur-md text-sm font-bold shadow-xl">
                                <Calendar className="w-5 h-5 text-saffron" />
                                {new Date(festival.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/40 border border-white/10 backdrop-blur-md text-sm font-bold shadow-xl">
                                <Clock className="w-5 h-5 text-saffron" />
                                Auspicious Tithi
                            </div>
                            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/40 border border-white/10 backdrop-blur-md text-sm font-bold text-emerald-600 dark:text-emerald-400 shadow-xl">
                                <BadgeCheck className="w-5 h-5" />
                                Vedic Verified
                            </div>
                        </div>
                    </div>

                    {/* Image Box */}
                    <div className="lg:w-2/5 relative w-full flex items-center justify-center">
                        <div className="relative w-full max-w-lg rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-4 border-white/10 aspect-square group">
                            <Image 
                                src={heroImage} 
                                alt={festival.name || 'Festival'} 
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            
                            {/* Floating Glass Badge */}
                            <div className="absolute bottom-10 left-10 right-10 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-saffron flex items-center justify-center shadow-lg shadow-saffron/20">
                                        <BadgeCheck className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Divine Occasion</p>
                                        <p className="text-2xl font-black font-serif">{festival.name} {new Date(festival.date).getFullYear()}</p>
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
