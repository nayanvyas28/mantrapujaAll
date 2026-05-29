import Link from "next/link";
import Image from "next/image";
import VedicBackground from "../VedicBackground";

interface Puja {
    id: string;
    name: string;
    slug: string;
    image: string;
    desc: string;
    is_special_offer?: boolean;
    special_offer_price?: number;
    tags?: string[];
    badge?: string;
    gradient?: string;
}

const getTagStyle = (tag: string): string => {
    const t = tag.toLowerCase();
    if (t.includes('wealth') || t.includes('lakshmi') || t.includes('prosperity')) return 'from-pink-500 to-rose-500 shadow-rose-500/20';
    if (t.includes('shiva') || t.includes('rudra')) return 'from-indigo-500 to-violet-600 shadow-indigo-500/20';
    if (t.includes('ganesh') || t.includes('success')) return 'from-amber-400 to-orange-500 shadow-amber-500/20';
    if (t.includes('hanuman') || t.includes('power')) return 'from-red-600 to-rose-700 shadow-red-500/20';
    if (t.includes('shani') || t.includes('protection')) return 'from-blue-600 to-indigo-700 shadow-blue-500/20';
    if (t.includes('love') || t.includes('marriage')) return 'from-rose-400 to-pink-500 shadow-rose-500/20';
    if (t.includes('peace') || t.includes('family')) return 'from-sky-400 to-cyan-500 shadow-sky-500/20';
    if (t.includes('health') || t.includes('healing')) return 'from-emerald-400 to-teal-600 shadow-emerald-500/20';
    if (t.includes('saraswati') || t.includes('knowledge')) return 'from-yellow-400 to-amber-500 shadow-yellow-500/20 text-black';
    if (t.includes('planetary') || t.includes('relief')) return 'from-blue-500 to-indigo-600 shadow-blue-500/20';
    if (t.includes('rituals')) return 'from-orange-400 to-red-500 shadow-orange-500/20';
    return 'from-orange-500 to-amber-600 shadow-orange-500/20';
};

export default function FeaturedPujasSection({ pujas }: { pujas: Puja[] }) {
    return (
        <section className="pt-16 pb-10 md:pt-24 md:pb-12 relative bg-background z-10 overflow-hidden">
            <VedicBackground sectionId={1} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-saffron via-gold to-saffron bg-[length:200%_auto] animate-gradient mb-6 pb-1" style={{ fontFamily: 'Georgia, serif' }}>
                        Popular Vedic Pujas
                    </h2>
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-saffron/40"></div>
                        <span className="text-saffron-dark font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Divine Rituals</span>
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-saffron/40"></div>
                    </div>
                    <p className="max-w-4xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                        Experience the power of authentic Vedic traditions performed by
                        <span className="text-saffron-dark font-medium"> verified acharyas</span> for your peace and prosperity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
                    {pujas.map((puja, idx) => (
                        <div key={puja.id || idx} className="group relative">
                            {puja.is_special_offer && (
                                <div className="absolute top-0 left-0 z-50 -translate-x-1/3 -translate-y-1/3 pointer-events-none transition-all duration-500 group-hover:-translate-y-[40%] group-hover:rotate-12 group-hover:scale-110">
                                    <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center drop-shadow-2xl">
                                        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-[#e11d48]">
                                            <path d="M50 0 L55 10 L65 5 L68 16 L79 13 L79 24 L90 24 L87 35 L97 40 L91 50 L100 60 L89 65 L92 76 L81 77 L81 88 L70 86 L65 96 L55 91 L50 100 L45 91 L35 96 L30 86 L20 88 L19 77 L8 76 L11 65 L0 60 L9 50 L3 40 L13 35 L10 24 L21 24 L21 13 L32 16 L35 5 L45 10 Z" />
                                            <path d="M50 5 L54 14 L63 10 L66 19 L76 17 L76 27 L85 27 L83 36 L91 40 L86 48 L94 57 L84 62 L86 71 L77 72 L77 82 L67 80 L63 89 L54 85 L50 93 L46 85 L37 89 L33 80 L23 82 L23 72 L14 71 L16 62 L6 57 L14 48 L9 40 L17 36 L15 27 L24 27 L24 17 L34 19 L37 10 L46 14 Z" fill="none" stroke="white" strokeWidth="0.8" strokeDasharray="2 1" opacity="0.6" />
                                        </svg>
                                        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center leading-tight">
                                            <span className="text-[10px] md:text-xs font-bold opacity-90 mb-0.5">मात्र</span>
                                            <span className="text-xl md:text-2xl font-black">₹{puja.special_offer_price}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="relative h-full bg-white/90 dark:bg-card/40 dark:backdrop-blur-xl text-slate-900 dark:text-white/90 rounded-[24px] flex flex-col transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-black/5 dark:border-white/10 group-hover:-translate-y-2 overflow-hidden">
                                <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1.5">
                                    {puja.badge && (
                                        <span className={`relative px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] text-white bg-gradient-to-r ${puja.gradient || 'from-orange-500 to-red-600'} shadow-lg`}>
                                            {puja.badge}
                                        </span>
                                    )}
                                    {(puja.tags || ['Vedic Ritual']).slice(0, 1).map((tag, i) => (
                                        <span key={i} className={`relative px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] text-white bg-gradient-to-r shadow-lg ${getTagStyle(tag)}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Link href={`/pooja-services/${puja.slug}`} className="block shrink-0">
                                    <div className="relative w-full aspect-[2/1] overflow-hidden">
                                        <Image
                                            src={puja.image}
                                            alt={puja.name}
                                            fill
                                            priority={idx < 2}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                </Link>

                                <div className="flex flex-col flex-grow p-3 md:p-4">
                                    <Link href={`/pooja-services/${puja.slug}`} className="block">
                                        <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight hover:text-orange-500 transition-colors duration-300" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                                            {puja.name}
                                        </h3>
                                    </Link>
                                    <div className="relative flex-grow mb-8">
                                        <p className="text-slate-600 dark:text-white/70 font-medium leading-relaxed text-base line-clamp-2">
                                            {puja.desc || "Invoke the divine energies for peace, prosperity, and spiritual growth."}
                                        </p>
                                    </div>

                                    <Link href={`/pooja-services/${puja.slug}#packages`} className="group/btn relative inline-flex items-center justify-center h-14 px-10 font-black text-white rounded-xl transition-all duration-150">
                                        <div className="absolute inset-0 top-1 bg-[#8B2000] rounded-xl"></div>
                                        <div className="absolute inset-x-0 top-0 bottom-1 bg-gradient-to-r from-[#FF6B00] to-[#E60000] rounded-xl shadow-xl transition-transform duration-100 group-hover/btn:translate-y-[1px] group-active/btn:translate-y-[3px]"></div>
                                        <span className="relative z-10 text-lg uppercase tracking-[0.1em] transition-transform duration-100 group-hover/btn:translate-y-[1px] group-active/btn:translate-y-[3px]">
                                            BOOK NOW
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/pooja-services" className="group relative inline-flex items-center gap-3 px-10 py-5 md:px-14 md:py-6 rounded-full border-2 border-saffron/20 text-saffron hover:text-white transition-all duration-300 font-black overflow-hidden">
                        <span className="relative z-10 flex items-center gap-3 text-lg uppercase tracking-widest">
                            EXPLORE ALL POOJA SERVICES
                        </span>
                        <div className="absolute inset-0 bg-saffron translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
