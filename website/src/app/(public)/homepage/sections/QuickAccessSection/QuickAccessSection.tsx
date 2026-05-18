import Link from "next/link";
import Image from "next/image";

interface QuickAccessItem {
    name: string;
    img: string;
    link: string;
    color: string;
    border: string;
}

interface QuickAccessSectionProps {
    items: QuickAccessItem[];
}

export default function QuickAccessSection({ items }: QuickAccessSectionProps) {
    return (
        <section className="pt-0 pb-2 md:pb-6 bg-zinc-50/50 dark:bg-black/40 relative z-30 overflow-visible">
            <div className="max-w-[1440px] mx-auto px-1 sm:px-4 overflow-visible">
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-1 sm:gap-x-6 gap-y-10 sm:gap-y-16 py-3 md:py-6 justify-items-center justify-center items-center overflow-y-visible">
                    {items.map((item, j) => (
                        <Link 
                            href={item.link} 
                            key={j} 
                            className="flex flex-col items-center gap-4 group relative z-10"
                        >
                            <div className="w-28 h-28 xs:w-32 xs:h-32 md:w-40 md:h-40 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.05)] transition-all duration-500 flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.2)] group-hover:-translate-y-2">
                                
                                {/* SVG Snake Border Effect - CSS Only Animation */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                                    <rect
                                        x="2"
                                        y="2"
                                        width="calc(100% - 4px)"
                                        height="calc(100% - 4px)"
                                        rx="30"
                                        ry="30"
                                        fill="none"
                                        stroke={item.border}
                                        strokeWidth="4"
                                        strokeDasharray="30 15"
                                        className="animate-snake-border"
                                    />
                                </svg>

                                {/* Image Container - Full bleed */}
                                <div className="relative z-10 w-full h-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
                                    <Image 
                                        src={item.img} 
                                        alt={item.name} 
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-40 transition-opacity`}></div>
                                </div>

                                {/* Subtle Glow Effect */}
                                <div 
                                    className="absolute -inset-1 rounded-[2rem] md:rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity z-0"
                                    style={{ backgroundColor: item.border }}
                                ></div>
                            </div>
                            <span className="text-[11px] md:text-base font-black text-center text-zinc-800 dark:text-zinc-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-all tracking-tighter md:tracking-widest uppercase">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
