import Link from "next/link";

export default function CTASection({ isDarkTheme = false }: { isDarkTheme?: boolean }) {
    return (
        <section className={`pt-36 pb-28 md:pt-48 md:pb-40 relative overflow-hidden z-10 transition-colors duration-500 ${isDarkTheme ? 'bg-slate-950' : 'bg-white'}`}>
            {/* Large Central Om Icon with Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-40">
                <div className={`absolute inset-0 rounded-full blur-3xl animate-pulse transition-all duration-700 ${isDarkTheme ? 'bg-gradient-to-r from-saffron/30 to-orange-600/30' : 'bg-gradient-to-r from-orange-200/20 to-saffron/10'}`}></div>
                <img
                    src="/om.png"
                    alt="Om Symbol"
                    className={`absolute inset-0 w-full h-full object-contain filter drop-shadow-2xl transition-all duration-700 ${isDarkTheme ? 'opacity-100 brightness-125' : 'opacity-60'}`}
                />
            </div>

            {/* CSS-Only Floating Om Pattern (Replacing Framer Motion for SSR) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float-up opacity-0"
                        style={{
                            left: `${(i * 7) % 100}%`,
                            bottom: '-50px',
                            animationDelay: `${i * 1.5}s`,
                            animationDuration: `${15 + (i % 10)}s`
                        }}
                    >
                        <img src="/om1.png" alt="" className="w-8 h-8 opacity-20" />
                    </div>
                ))}
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="mb-4 inline-block relative">
                    <span className={`inline-block px-6 py-2 rounded-full border-2 transition-all duration-500 text-xs font-bold uppercase tracking-widest shadow-lg ${isDarkTheme ? 'bg-slate-900 border-white/10 text-saffron-light' : 'bg-white border-saffron/20 text-saffron'}`}>
                        Begin Your Sacred Journey
                    </span>
                </div>

                <h2 className={`text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight drop-shadow-sm transition-colors duration-500 ${isDarkTheme ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: 'Georgia, serif' }}>
                    Ready to Invite <br />
                    <span className="relative inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-saffron via-orange-500 to-gold">
                        Divine Positivity?
                    </span>
                </h2>

                <p className={`text-lg md:text-xl mb-12 max-w-4xl mx-auto font-light leading-relaxed transition-colors duration-500 ${isDarkTheme ? 'text-slate-300' : 'text-slate-700'}`}>
                    Book your custom Vedic ritual today and embark on a spiritually fulfilling journey guided by expert Pandits.
                </p>

                <div className="relative inline-block group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-600 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                    <Link
                        href="/pooja-services"
                        className={`relative inline-flex items-center justify-center h-28 px-24 text-2xl md:text-3xl font-black text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden border-2 ${isDarkTheme ? 'border-saffron/40' : 'border-white'}`}
                    >
                        <span className="relative z-10 flex items-center gap-4 tracking-widest font-serif">
                            START YOUR JOURNEY
                            <svg className="w-10 h-10 transform group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent z-20"></div>
                    </Link>
                </div>

                <div className="mt-16 flex items-center justify-center gap-8 opacity-70">
                    {['🔒 Secure Payment', '✅ Verified Pandits', '🌟 4.9/5 Rating'].map((item, i) => (
                        <span key={i} className={`text-sm font-bold tracking-widest uppercase transition-colors duration-500 ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
