"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Send, Instagram, Facebook, Youtube, Twitter, Mail } from "lucide-react";

export default function BlogCTA() {
    return (
        <section className="relative py-10 overflow-hidden mt-4">
            {/* Backgrounds */}
            <div className="absolute inset-0 border-t border-saffron/10 dark:border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-saffron/5 to-transparent dark:via-purple-900/10"></div>
                {/* Decorative blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-black font-serif mb-6 tracking-tight">
                            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-gold">Spiritual Family</span>
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Connect with us for daily encouragement, exclusive rituals, and divine wisdom.
                        </p>
                    </motion.div>

                    {/* 3 Columns Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        {/* Newsletter card */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="bg-white dark:bg-card p-8 rounded-[2.5rem] border border-saffron/20 shadow-xl shadow-saffron/5 flex flex-col items-center text-center relative overflow-hidden group"
                        >
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-900/10 flex items-center justify-center text-saffron mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 font-serif">Weekly Wisdom</h3>
                            <p className="text-muted-foreground mb-8 leading-relaxed">Get curated mantras & astrology insights delivered to your inbox.</p>

                            <div className="w-full relative group/input">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full h-14 pl-6 pr-36 rounded-full bg-background border-2 border-muted focus:border-saffron/50 outline-none transition-all shadow-inner"
                                />
                                <button className="absolute right-1.5 top-1.5 bottom-1.5 uppercase px-6 rounded-full bg-gradient-to-r from-saffron to-orange-600 text-white font-bold text-xs tracking-wider hover:shadow-lg hover:scale-105 transition-all">
                                    Subscribe
                                </button>
                            </div>
                        </motion.div>

                        {/* WhatsApp */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="bg-green-50/50 dark:bg-green-950/10 p-8 rounded-[2.5rem] border border-green-200/50 dark:border-green-800/30 flex flex-col items-center text-center relative overflow-hidden group"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-100/50 dark:bg-green-900/20 flex items-center justify-center text-[#25D366] mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 .5.5c.34.43 1.09 1.48 2.22 2.22.46.3.5.5.5.5" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 font-serif">WhatsApp Group</h3>
                            <p className="text-muted-foreground mb-8 leading-relaxed">Join 10,000+ devotees for daily updates & community.</p>
                            <button className="w-full h-14 rounded-full bg-[#25D366] text-white font-bold text-lg shadow-lg shadow-green-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                                Join Community
                            </button>
                        </motion.div>

                        {/* Telegram */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="bg-blue-50/50 dark:bg-blue-950/10 p-8 rounded-[2.5rem] border border-blue-200/50 dark:border-blue-800/30 flex flex-col items-center text-center relative overflow-hidden group"
                        >
                            <div className="w-20 h-20 rounded-full bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center text-[#0088cc] mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Send className="w-8 h-8 ml-1" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 font-serif">Telegram Channel</h3>
                            <p className="text-muted-foreground mb-8 leading-relaxed">Instant alerts for auspicious timings (Muhurat) & reminders.</p>
                            <button className="w-full h-14 rounded-full bg-[#0088cc] text-white font-bold text-lg shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
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
                            <h3 className="text-3xl md:text-4xl font-black font-serif mb-4 relative z-10">Follow Our Journey</h3>
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
                                    className="group relative w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white dark:bg-card border border-border shadow-2xl flex flex-col items-center justify-center gap-2 hover:border-transparent transition-all overflow-hidden"
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
