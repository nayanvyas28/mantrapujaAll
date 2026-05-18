import Link from "next/link";
import Image from "next/image";

interface PoojaLocation {
    id?: string | number;
    name: string;
    title: string;
    location: string;
    desc: string;
    image: string;
    slug: string;
}

export default function SacredLocationsSection({ locations }: { locations: PoojaLocation[] }) {
    return (
        <section className="pt-36 pb-20 md:pt-48 md:pb-32 relative overflow-hidden z-10 bg-[#fffcf9] dark:bg-slate-950/40 backdrop-blur-[2px] transition-colors duration-500">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-saffron/40"></div>
                        <span className="text-saffron-dark font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Sacred Kshetras</span>
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-saffron/40"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                        Pujas Performed at <span className="text-saffron">Sacred Location</span>
                    </h2>
                    <p className="max-w-4xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                        Experience the magnified spiritual potency of rituals performed at the holiest pilgrimage sites in India.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                    {locations.map((loc, idx) => (
                        <Link
                            key={idx}
                            href={`/locations/${loc.slug || '#'}`}
                            className="group relative aspect-[9/16] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl hover:shadow-saffron/30 transition-all duration-700 hover:-translate-y-4 border border-black/5 dark:border-white/10 block"
                        >
                            <div className="absolute inset-0 bg-slate-900">
                                <Image
                                    src={loc.image || '/logo.png'}
                                    alt={loc.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-110 transition-transform duration-[1.5s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                            </div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-xl md:text-2xl font-black text-white drop-shadow-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                        {loc.name}
                                    </h3>
                                    <p className="text-saffron font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2 drop-shadow-md">
                                        <span className="w-8 h-0.5 bg-saffron inline-block"></span>
                                        {loc.title || "Sacred Site"}
                                    </p>
                                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                                        <div className="overflow-hidden">
                                            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 border-l-2 border-saffron pl-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-medium">
                                                {loc.desc || ""}
                                            </p>
                                            <span className="inline-flex items-center gap-3 text-white text-xs font-black uppercase tracking-[0.3em] border-b-2 border-saffron pb-1">
                                                Explore Rituals
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/locations" className="group relative inline-flex items-center gap-4 px-12 py-6 md:px-16 md:py-8 rounded-full border-2 border-saffron/20 text-saffron hover:text-white transition-all duration-300 font-black overflow-hidden">
                        <span className="relative z-10 flex items-center gap-4 text-xl uppercase tracking-widest">
                            EXPLORE ALL SACRED LOCATIONS
                        </span>
                        <div className="absolute inset-0 bg-saffron translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
