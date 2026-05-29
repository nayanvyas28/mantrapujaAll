import VedicBackground from "../VedicBackground";
import Link from "next/link";
import Image from "next/image";

interface HomeFeature {
    id: string;
    title: string;
    description: string;
    image_url: string;
}

export default function WhyChooseUsSection({ features }: { features: HomeFeature[] }) {
    const defaultFeatures = [
        { id: 'f1', title: "Vedic Authenticity", description: "Every ritual is performed in strict accordance with Vedic scriptures by certified Pandits.", image_url: "/logo.png" },
        { id: 'f2', title: "Sacred Locations", description: "Pujas conducted in powerful vortexes (Kshetras) like Kashi, Ujjain, and Haridwar.", image_url: "/logo.png" },
        { id: 'f3', title: "Live & Transparent", description: "Witness your Sankalp and Puja via live streaming or receive high-quality video recordings.", image_url: "/logo.png" },
        { id: 'f4', title: "Personalized Support", description: "Dedicated spiritual guides to answer your queries and assist you at every step.", image_url: "/logo.png" },
        { id: 'f5', title: "Instant Booking", description: "Seamless digital platform to book complex rituals in just a few clicks.", image_url: "/logo.png" },
        { id: 'f6', title: "Karma Free Pricing", description: "Transparent Dakshina with no hidden costs. Satisfaction of supporting Vedic culture.", image_url: "/logo.png" }
    ];

    const displayFeatures = features.length > 0 ? features : defaultFeatures;

    return (
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative bg-background overflow-hidden z-10">
            <VedicBackground sectionId={2} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-saffron/40"></div>
                        <span className="text-saffron-dark font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">The Vedic Difference</span>
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-saffron/40"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-saffron via-gold to-saffron bg-[length:200%_auto] animate-gradient mb-6 pb-1" style={{ fontFamily: 'Georgia, serif' }}>
                        Why Choose Mantra Puja?
                    </h2>
                    <p className="max-w-4xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                        We preserve the sanctity of ancient traditions while embracing modern accessibility, offering you a spiritual experience that is both authentic and hassle-free.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayFeatures.map((feature, idx) => (
                        <div key={feature.id || idx} className="group relative bg-white/80 dark:bg-card/40 dark:backdrop-blur-md rounded-[24px] flex flex-col transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(249,115,22,0.2)] overflow-hidden border border-slate-200/50 dark:border-white/10">
                            <div className="relative w-full aspect-video overflow-hidden">
                                <Image 
                                    src={feature.image_url || "/logo.png"} 
                                    alt={feature.title} 
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-saffron/15 to-transparent z-10"></div>
                            </div>
                            <div className="relative p-8 flex-grow flex flex-col items-center text-center z-10 w-full">
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-saffron transition-colors duration-300" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-white/70 font-medium leading-relaxed text-base transition-colors duration-300 flex-grow">
                                    {feature.description}
                                </p>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-saffron to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/pooja-services" className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 md:px-12 md:py-5 rounded-full border-2 border-saffron/50 text-saffron hover:text-white transition-all duration-300 font-black overflow-hidden shadow-lg hover:-translate-y-1">
                        <span className="relative z-10 text-lg font-bold uppercase tracking-widest">
                            Begin Your Sacred Journey
                        </span>
                        <div className="absolute inset-0 bg-saffron translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
