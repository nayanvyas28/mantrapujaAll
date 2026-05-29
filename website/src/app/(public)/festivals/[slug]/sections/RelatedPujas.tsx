import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getSupabaseServer } from '@/lib/supabaseServer';

import { resolvePujaImage } from '@/lib/imageResolver';

interface RelatedPujasProps {
    festivalName: string;
}

export const RelatedPujas = async ({ festivalName }: RelatedPujasProps) => {
    const supabase = getSupabaseServer();
    if (!supabase) return null;

    let searchTerms = [festivalName];
    const name = festivalName.toLowerCase();
    if (name.includes('shiva') || name.includes('pradosh')) searchTerms.push('shiva', 'rudra', 'lingam');
    if (name.includes('ekadashi') || name.includes('vishnu')) searchTerms.push('vishnu', 'narayana', 'satyanarayan');
    if (name.includes('ganesh') || name.includes('ganpati')) searchTerms.push('ganesh', 'vinayaka');

    const orQuery = searchTerms.map(term => `name.ilike.%${term}%`).join(',');
    
    const { data: pujas } = await supabase
        .from('poojas')
        .select('id, name, slug, description, tagline, images, is_special_offer, special_offer_price')
        .eq('is_active', true)
        .or(orQuery)
        .limit(3);

    const displayPujas = (pujas && pujas.length > 0) ? pujas : [];
    
    if (displayPujas.length === 0) {
        // Fallback to featured
        const { data: featured } = await supabase
            .from('poojas')
            .select('id, name, slug, description, tagline, images, is_special_offer, special_offer_price')
            .eq('is_active', true)
            .eq('is_featured', true)
            .limit(3);
        if (featured) displayPujas.push(...featured);
    }

    if (displayPujas.length === 0) return null;

    return (
        <section className="py-24 relative z-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white/60 dark:bg-black/60 backdrop-blur-3xl rounded-[3.5rem] border border-white/30 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] p-10 md:p-16">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl md:text-6xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-saffron to-orange-600 pb-2">Recommended Pujas</h2>
                            <p className="text-sm text-muted-foreground italic font-medium">Auspicious rituals traditionally performed during {festivalName}</p>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-saffron/30 to-transparent mx-8 hidden md:block"></div>
                        <Link href="/pooja-services" className="px-8 py-4 rounded-2xl bg-saffron/10 text-saffron font-black uppercase tracking-widest text-xs border border-saffron/20 hover:bg-saffron hover:text-white transition-all">
                            View All Pujas
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {displayPujas.map((puja: any, idx: number) => {
                            const resolved = resolvePujaImage(puja.images);
                            return (
                                <div key={puja.id} className="group relative flex flex-col h-full">
                                    {/* Special Offer Badge */}
                                    {puja.is_special_offer && (
                                        <div className="absolute -top-4 -left-4 z-30 transform -rotate-12">
                                            <div className="bg-red-600 text-white px-4 py-2 rounded-xl font-black shadow-lg border-2 border-white/20">
                                                ₹{puja.special_offer_price}
                                            </div>
                                        </div>
                                    )}

                                    <Link href={`/pooja-services/${puja.slug}`} className="relative h-full bg-card rounded-[2.5rem] p-6 border border-border/50 shadow-xl transition-all duration-500 group-hover:-translate-y-3 flex flex-col">
                                        <div className="relative w-full aspect-[4/3] mb-8 rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-border/30 shadow-inner">
                                            <Image 
                                                src={resolved.url} 
                                                alt={puja.name || 'Puja Service'} 
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 30vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>

                                        <h3 className="text-2xl font-black text-foreground mb-4 font-serif group-hover:text-saffron transition-colors line-clamp-1">{puja.name}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-8 flex-grow">{puja.description || puja.tagline}</p>
                                        
                                        <div className="mt-auto pt-6 border-t border-border/30 flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-saffron">Auspicious Pick</span>
                                            <span className="flex items-center gap-2 text-saffron font-black text-xs uppercase group-hover:gap-4 transition-all">
                                                Book Now <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
