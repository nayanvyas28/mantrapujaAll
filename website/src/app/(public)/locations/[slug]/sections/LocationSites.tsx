import React from 'react';
import { Mountain, Compass } from 'lucide-react';

interface Site {
    name: string;
    description: string;
}

interface LocationSitesProps {
    sites: Site[];
}

export const LocationSites = ({ sites }: LocationSitesProps) => {
    if (!sites?.length) return null;

    return (
        <section id="sites" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-4 rounded-[24px] bg-amber-500/10 border border-amber-500/20 shadow-inner">
                    <Mountain className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight">The Holy Circuit</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-transparent rounded-full mt-2"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sites.map((site, idx) => (
                    <div
                        key={idx}
                        className="group p-8 bg-card/60 backdrop-blur-xl border border-border/40 rounded-[40px] hover:border-amber-500/40 transition-all shadow-lg text-center"
                    >
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                            <Compass className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black font-serif mb-4 group-hover:text-amber-600 transition-colors">
                            {site.name}
                        </h3>
                        <p className="text-muted-foreground text-base leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                            {site.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
