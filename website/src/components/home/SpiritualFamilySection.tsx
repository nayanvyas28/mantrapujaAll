"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Send, Instagram, Facebook, Youtube, Twitter, Mail } from "lucide-react";

export default function SpiritualFamilySection() {
    return (
        <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 overflow-hidden">
            {/* Backgrounds */}
            <div className="absolute inset-0 border-t border-saffron/10 dark:border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-saffron/5 to-transparent dark:via-purple-900/10"></div>
                {/* Decorative blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-2 md:px-6 relative z-10">
                <div className="max-w-[1450px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-4"
                    >
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-saffron/40"></div>
                            <span className="text-saffron-dark font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Divine Community</span>
                            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-saffron/40"></div>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black mb-3 pb-1" style={{ fontFamily: 'Georgia, serif' }}>
                            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-gold">Spiritual Family</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-sm md:text-base text-muted-foreground dark:text-gray-300 font-light leading-relaxed">
                            Connect with us for daily encouragement, exclusive rituals, and divine wisdom.
                        </p>
                    </motion.div>

                    {/* 3 Columns Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        {/* Newsletter card */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="bg-white dark:bg-card p-6 rounded-[24px] border border-saffron/20 shadow-xl shadow-saffron/5 flex flex-col items-center text-center relative overflow-hidden group"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-900/10 flex items-center justify-center text-saffron mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-base md:text-lg font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>Weekly Wisdom</h3>
                            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">Get curated mantras & astrology insights delivered to your inbox.</p>

                            <div className="w-full relative group/input">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full h-10 pl-6 pr-32 rounded-full bg-background border border-muted focus:border-saffron/50 outline-none transition-all shadow-inner text-xs"
                                />
                                <button className="absolute right-1 top-1 bottom-1 uppercase px-4 rounded-full bg-gradient-to-r from-saffron to-orange-600 text-white font-bold text-[10px] tracking-wider hover:shadow-lg hover:scale-105 transition-all">
                                    Subscribe
                                </button>
                            </div>
                        </motion.div>

                        {/* WhatsApp */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="bg-green-50/50 dark:bg-green-950/10 p-6 rounded-[24px] border border-green-200/50 dark:border-green-800/30 flex flex-col items-center text-center relative overflow-hidden group"
                        >
                            <div className="w-16 h-16 rounded-full bg-green-100/50 dark:bg-green-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.1, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 rounded-full bg-[#25D366]/40"
                                />
                                <img 
                                    src="/whatsapp-icon.png" 
                                    alt="WhatsApp" 
                                    className="w-10 h-10 object-contain relative z-10"
                                />
                            </div>
                            <h3 className="text-base md:text-lg font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>WhatsApp Group</h3>
                            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">Join 10,000+ devotees for daily updates & community.</p>
                            <button className="w-full h-10 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-lg shadow-green-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                                Join Community
                            </button>
                        </motion.div>

                        {/* Telegram */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="bg-blue-50/50 dark:bg-blue-950/10 p-6 rounded-[24px] border border-blue-200/50 dark:border-blue-800/30 flex flex-col items-center text-center relative overflow-hidden group"
                        >
                            <div className="w-16 h-16 rounded-full bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center text-[#0088cc] mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Send className="w-6 h-6 ml-1" />
                            </div>
                            <h3 className="text-base md:text-lg font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>Telegram Channel</h3>
                            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">Instant alerts for auspicious timings (Muhurat) & reminders.</p>
                            <button className="w-full h-10 rounded-full bg-[#0088cc] text-white font-bold text-xs shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                                Join Channel
                            </button>
                        </motion.div>
                    </div>

                    {/* Social Media Section */}
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block relative"
                        >
                            <div className="absolute inset-0 bg-saffron/20 blur-3xl rounded-full"></div>
                            <h3 className="text-base md:text-lg font-black mb-4 relative z-10" style={{ fontFamily: 'Georgia, serif' }}>Follow Our Journey</h3>
                        </motion.div>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                            {[
                                { icon: Instagram, color: "text-white", bg: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500", label: "Instagram", handle: "@mantrapooja" },
                                { icon: Youtube, color: "text-white", bg: "bg-[#FF0000]", label: "YouTube", handle: "MantraPooja TV" },
                                { icon: Facebook, color: "text-white", bg: "bg-[#1877F2]", label: "Facebook", handle: "MantraPooja" },
                                { icon: Twitter, color: "text-white", bg: "bg-[#1DA1F2]", label: "Twitter", handle: "@mantra_pooja" }
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href="#"
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className="group relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white dark:bg-card border border-border shadow-2xl flex flex-col items-center justify-center gap-2 hover:border-transparent transition-all overflow-hidden"
                                >
                                    {/* Hover Background Fill */}
                                    <div className={`absolute inset-0 ${social.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                    <social.icon className={`w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-white transition-colors duration-300 relative z-10`} />
                                    <span className="text-[10px] md:text-xs font-bold text-muted-foreground group-hover:text-white/90 transition-colors duration-300 relative z-10">{social.label}</span>

                                    {/* Shine Effect */}
                                    <div className="absolute -inset-full top-0 block -rotate-45 translate-y-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer z-20"></div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
