import React from 'react';
import { Sun, Star, MessageCircle, Phone, UserCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { BookingTrigger } from './BookingTrigger';

interface FinalCTASectionProps {
    puja: {
        name: string;
        slug: string;
        packages?: any[];
        footer?: {
            title?: string;
            description?: string;
        };
    };
}

export const FinalCTASection = ({ puja }: FinalCTASectionProps) => {
    const { footer, name } = puja;

    return (
        <section id="book-now" className="py-10 md:py-16 relative overflow-hidden bg-background">
            {/* Background: Clean & Sacred Aura */}
            <div className="absolute inset-0 pointer-events-none select-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08),transparent_70%)] opacity-80"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-3xl border border-white dark:border-white/5 shadow-2xl p-6 md:p-16 lg:p-24 text-center group">
                        
                        {/* Corner Decorative Ornaments */}
                        <div className="absolute top-0 right-0 p-6 md:p-10 opacity-10 dark:opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                            <Sun className="w-16 h-16 md:w-24 md:h-24 text-orange-500" strokeWidth={0.5} />
                        </div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-10 opacity-10 dark:opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-1000 rotate-180">
                            <Sun className="w-16 h-16 md:w-24 md:h-24 text-orange-500" strokeWidth={0.5} />
                        </div>

                        {/* Main Content */}
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-[10px] md:text-xs mb-2 md:mb-4">
                                <Star className="w-3 h-3 md:w-3.5 md:h-3.5 animate-pulse" />
                                Divine Vedic Tradition
                                <Star className="w-3 h-3 md:w-3.5 md:h-3.5 animate-pulse" />
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black font-serif mb-4 md:mb-6 leading-[1.2] md:leading-[1.15] text-gray-900 dark:text-white tracking-tight px-2">
                                {footer?.title?.split('\n').map((line, lid) => (
                                    <React.Fragment key={lid}>
                                        {line} <br className="hidden md:block" />
                                    </React.Fragment>
                                )) || (
                                    <>
                                        Ready for your <br className="hidden md:block" />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-500 animate-gradient bg-[length:200%_auto] filter drop-shadow-sm px-1">
                                            Divine Transformation?
                                        </span>
                                    </>
                                )}
                            </h2>

                            <p className="text-sm md:text-xl text-gray-600 dark:text-white/60 mb-4 md:mb-6 max-w-2xl mx-auto font-light leading-relaxed px-4">
                                {footer?.description || "Experience the sacred peace of ancient rituals. Our Vedic experts are here to help you invite prosperity into your home."}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-6 md:mb-8 px-4">
                                <a
                                    href="https://wa.me/918989271245"
                                    className="group/wa relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-[#25D366] text-white font-black text-base md:text-xl shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 md:gap-4 overflow-hidden"
                                >
                                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-current relative z-10" />
                                    <span className="relative z-10 tracking-tight">Chat on WhatsApp</span>
                                </a>

                                <BookingTrigger 
                                    variant="primary"
                                />
                            </div>

                            {/* Trust Indicators */}
                            <div className="pt-8 md:pt-12 border-t border-gray-100 dark:border-white/5 flex flex-wrap justify-center gap-6 md:gap-16">
                                {[
                                    { icon: UserCheck, text: "Divine Path", val: "10k+ Devotees" },
                                    { icon: Star, text: "Sacred Merit", val: "4.9/5 Rating" },
                                    { icon: CheckCircle, text: "Expert Gurus", val: "Vedic Certified" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 md:gap-4 text-left group/item cursor-default">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-center group-hover/item:bg-orange-500/10 transition-colors duration-300">
                                            <item.icon className="w-5 h-5 md:w-6 md:h-6 text-orange-500 group-hover/item:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <div className="text-[9px] md:text-[10px] font-black text-orange-500 uppercase tracking-widest leading-none mb-1">{item.text}</div>
                                            <div className="text-[10px] md:text-xs font-bold text-gray-600 dark:text-white/40">{item.val}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
