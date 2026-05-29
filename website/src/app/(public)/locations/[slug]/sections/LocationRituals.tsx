import React from 'react';
import { Waves, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Ritual {
    name: string;
    description: string;
}

interface LocationRitualsProps {
    rituals: Ritual[];
    locationName: string;
}

const ritualToPuja: Record<string, string> = {
    'Rudra Abhishek': 'rudra-abhishek',
    'Rudrabhishek': 'rudra-abhishek',
    'Mahamrityunjaya': 'mahamrityunjaya-jaap',
    'Satyanarayan': 'satyanarayan-pooja',
    'Ganesh Puja': 'ganesh-pooja',
    'Kaal Sarp': 'kaal-sarp-dosh-puja',
    'Ganga Aarti': 'ganga-aarti',
    'Shanti Puja': 'navagraha-shanti',
    'Maha Mrityunjaya': 'mahamrityunjaya-jaap',
};

export const LocationRituals = ({ rituals, locationName }: LocationRitualsProps) => {
    if (!rituals?.length) return null;

    return (
        <section id="rituals" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-4 rounded-[24px] bg-orange-500/10 border border-orange-500/20 shadow-inner">
                    <Waves className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">Sacred Rituals</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-transparent rounded-full mt-2"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-12">
                {rituals.map((ritual, idx) => {
                    const pujaSlug = ritualToPuja[ritual.name] || Object.entries(ritualToPuja).find(([key]) => ritual.name.includes(key))?.[1];
                    
                    return (
                        <div
                            key={idx}
                            className="group p-10 bg-card/60 backdrop-blur-xl border border-border/40 rounded-[40px] hover:border-orange-500/40 transition-all shadow-xl hover:shadow-[0_20px_50px_-20px_rgba(249,115,22,0.2)]"
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-8">
                                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <span className="text-2xl font-black italic">0{idx + 1}</span>
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <h3 className="text-3xl font-black font-serif text-foreground group-hover:text-orange-500 transition-colors">
                                            {ritual.name}
                                        </h3>
                                        {pujaSlug && (
                                            <Link 
                                                href={`/pooja-services/${pujaSlug}`}
                                                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-xs font-black uppercase tracking-widest hover:bg-saffron hover:text-white transition-all"
                                            >
                                                Book This Puja <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        {ritual.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center justify-center">
                <Link
                    href={`/contact-us?subject=Custom Ritual in ${locationName}`}
                    className="group relative px-12 py-6 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full text-white font-black uppercase tracking-[0.3em] text-xs shadow-[0_20px_50px_-10px_rgba(234,88,12,0.5)] hover:shadow-[0_30px_60px_-10px_rgba(234,88,12,0.7)] hover:-translate-y-2 transition-all duration-500 flex items-center gap-3 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <span className="relative z-10">Request Custom Ritual</span>
                    <MessageCircle className="relative z-10 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Link>
            </div>
        </section>
    );
};
