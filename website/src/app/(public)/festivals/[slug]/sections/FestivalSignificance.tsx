import React from 'react';
import { Scroll, Flame, User } from 'lucide-react';
import { Festival } from '@/lib/festivalData';

interface FestivalSignificanceProps {
    festival: Festival;
}

export const FestivalSignificance = ({ festival }: FestivalSignificanceProps) => {
    return (
        <section className="py-24 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative">
                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-saffron/5 rounded-full blur-[120px] -z-10"></div>
                
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-12 bg-saffron/30"></div>
                        <span className="text-saffron font-black tracking-[0.3em] uppercase text-xs">Divine Meaning</span>
                        <div className="h-px w-12 bg-saffron/30"></div>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black font-serif text-foreground leading-tight">
                        Significance <span className="text-saffron">&</span> Lore
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Mythology */}
                    <article className="bg-card/40 backdrop-blur-xl p-10 rounded-[3rem] border border-border/50 shadow-xl group hover:border-saffron/30 transition-all duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                            <Scroll className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black font-serif mb-6 group-hover:text-saffron transition-colors">Mythology</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {festival.significance?.mythology || "Explore the ancient scriptures and sacred legends that define the origin of this divine occasion."}
                        </p>
                    </article>

                    {/* Spiritual Essence */}
                    <article className="bg-gradient-to-br from-saffron/20 via-saffron/5 to-transparent p-12 rounded-[3.5rem] border-2 border-saffron/20 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-saffron/20 blur-[80px] rounded-full"></div>
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-saffron to-orange-600 flex items-center justify-center text-white mb-8 shadow-2xl shadow-saffron/40 group-hover:rotate-12 transition-transform relative z-10">
                            <Flame className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-black font-serif mb-6 text-foreground relative z-10">Spiritual Essence</h3>
                        <p className="text-foreground/80 leading-relaxed text-xl font-medium relative z-10">
                            {festival.significance?.spiritual || "Connect with the inner light and higher consciousness through the spiritual vibrations of this sacred day."}
                        </p>
                    </article>

                    {/* Cultural Impact */}
                    <article className="bg-card/40 backdrop-blur-xl p-10 rounded-[3rem] border border-border/50 shadow-xl group hover:border-blue-500/30 transition-all duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                            <User className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black font-serif mb-6 group-hover:text-blue-500 transition-colors">Cultural Impact</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {festival.significance?.cultural || "Witness the vibrant celebrations, community unity, and timeless traditions across our diverse landscape."}
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
};
