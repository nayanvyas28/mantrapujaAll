import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sun, MapPin } from 'lucide-react';

interface LocationHeroProps {
    name: string;
    description: string;
    image: string;
    type: string;
    stateId: string;
}

export const LocationHero = ({ name, description, image, type, stateId }: LocationHeroProps) => {
    const hasImage = image && image !== 'null' && image !== '';

    return (
        <section className={`relative w-full ${hasImage ? 'aspect-square md:aspect-[21/9]' : 'aspect-video md:aspect-[3/1]'} flex items-end overflow-hidden pt-20`}>
            {/* Background Image with Parallax Effect & Fallback */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-black/40 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 z-15"></div>
                {hasImage ? (
                    <Image
                        src={image}
                        alt={`${name} - ${type}`}
                        fill
                        priority
                        className="w-full h-full object-cover border-none outline-none"
                        sizes="100vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#2a1a0f] to-[#0a0500]" />
                )}
            </div>

            <div className="container mx-auto px-4 relative z-20 pb-16 md:pb-24">
                <div className="max-w-6xl">
                    <Link
                        href="/locations"
                        className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-all font-bold tracking-widest text-[10px] uppercase group cursor-pointer bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Return to Sacred Map
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-5 py-2 rounded-full bg-saffron text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_8px_30px_-5px_rgba(234,88,12,0.5)] border border-saffron/50 flex items-center justify-center gap-2">
                            <Sun className="w-3.5 h-3.5" />
                            {type}
                        </span>
                        <div className="flex items-center gap-2 text-white/90 text-[10px] font-black uppercase tracking-[0.2em] bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                            <MapPin className="w-3.5 h-3.5 text-saffron" />
                            {stateId?.toUpperCase()}
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white mb-8 leading-[0.9] tracking-tighter drop-shadow-2xl"
                        style={{ fontFamily: 'Georgia, serif', textShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                        {name}
                    </h1>

                    <p className="text-xl md:text-3xl text-white/95 font-light leading-relaxed max-w-3xl bg-black/20 backdrop-blur-lg rounded-2xl p-6 border-l-8 border-saffron shadow-2xl">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
};
