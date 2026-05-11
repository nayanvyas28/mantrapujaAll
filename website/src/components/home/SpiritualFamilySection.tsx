"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Instagram, Facebook, Youtube, Twitter, Mail } from "lucide-react";
import NewsletterForm from "../NewsletterForm";

export default function SpiritualFamilySection() {
    return (
        <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden">
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
                        <h2 className="text-4xl md:text-6xl font-black mb-6 pb-1" style={{ fontFamily: 'Georgia, serif' }}>
                            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-gold">Spiritual Family</span>
                        </h2>
                        <p className="max-w-4xl mx-auto text-lg md:text-xl text-muted-foreground dark:text-gray-300 font-light leading-relaxed">
                            Connect with us for daily encouragement, exclusive rituals, and divine wisdom.
                        </p>
                    </motion.div>

                    {/* 3 Columns Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        {/* Newsletter card */}
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="bg-white dark:bg-card p-8 rounded-[32px] border border-saffron/20 shadow-xl shadow-saffron/5 flex flex-col items-center text-center relative overflow-hidden group h-full"
                        >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-900/10 flex items-center justify-center text-saffron mb-8 group-hover:scale-110 transition-transform duration-300">
                                <Mail className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Weekly Wisdom</h3>
                            <p className="text-base text-muted-foreground mb-10 leading-relaxed flex-grow">Get curated mantras & astrology insights delivered to your inbox.</p>

                            <NewsletterForm />
                        </motion.div>

                        {/* WhatsApp */}
                        <motion.a
                            href="https://wa.me/918989271245"
                            target="_blank"
                            whileHover={{ y: -8 }}
                            className="bg-green-50/50 dark:bg-green-950/10 p-8 rounded-[32px] border border-green-200/50 dark:border-green-800/30 flex flex-col items-center text-center relative overflow-hidden group h-full cursor-pointer"
                        >
                            <div className="w-24 h-24 rounded-full bg-green-100/50 dark:bg-green-900/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 relative">
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
                                    className="w-14 h-14 object-contain relative z-10"
                                />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>WhatsApp Group</h3>
                            <p className="text-base text-muted-foreground mb-10 leading-relaxed flex-grow">Join 10,000+ devotees for daily updates & community.</p>
                            <div className="w-full h-16 rounded-full bg-[#25D366] text-white font-bold text-xl shadow-lg shadow-green-500/20 group-hover:shadow-xl group-hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
                                Join Community
                            </div>
                        </motion.a>

                        {/* Telegram */}
                        <motion.a
                            href="https://t.me/mantrapuja"
                            target="_blank"
                            whileHover={{ y: -8 }}
                            className="bg-blue-50/50 dark:bg-blue-950/10 p-8 rounded-[32px] border border-blue-200/50 dark:border-blue-800/30 flex flex-col items-center text-center relative overflow-hidden group h-full cursor-pointer"
                        >
                            <div className="w-24 h-24 rounded-full bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center text-[#0088cc] mb-8 group-hover:scale-110 transition-transform duration-300">
                                <Send className="w-10 h-10 ml-1" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Telegram Channel</h3>
                            <p className="text-base text-muted-foreground mb-10 leading-relaxed flex-grow">Instant alerts for auspicious timings (Muhurat) & reminders.</p>
                            <div className="w-full h-16 rounded-full bg-[#0088cc] text-white font-bold text-xl shadow-lg shadow-blue-500/20 group-hover:shadow-xl group-hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
                                Join Channel
                            </div>
                        </motion.a>
                    </div>

                    {/* Social Media Section */}
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block relative"
                        >
                            <div className="absolute inset-0 bg-saffron/20 blur-3xl rounded-full"></div>
                            <h3 className="text-xl md:text-3xl font-black mb-8 relative z-10" style={{ fontFamily: 'Georgia, serif' }}>Follow Our Journey</h3>
                        </motion.div>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                            {[
                                { icon: Instagram, color: "text-white", bg: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500", label: "Instagram", handle: "@mantrapujaa", href: "https://www.instagram.com/mantrapujaa" },
                                { icon: Youtube, color: "text-white", bg: "bg-[#FF0000]", label: "YouTube", handle: "MantraPuja Officials", href: "https://www.youtube.com/@MantraPujaOfficials" },
                                { icon: Facebook, color: "text-white", bg: "bg-[#1877F2]", label: "Facebook", handle: "MantraPuja", href: "https://www.facebook.com/mantrapujaa" },
                                { icon: Twitter, color: "text-white", bg: "bg-[#000000]", label: "Twitter", handle: "@mantrapuja", href: "https://x.com/mantrapuja" }
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className="group relative w-32 h-32 md:w-40 md:h-40 rounded-[32px] bg-white dark:bg-card border border-border shadow-2xl flex flex-col items-center justify-center gap-4 hover:border-transparent transition-all overflow-hidden"
                                >
                                    {/* Hover Background Fill */}
                                    <div className={`absolute inset-0 ${social.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                    <social.icon className={`w-12 h-12 md:w-16 md:h-16 text-muted-foreground group-hover:text-white transition-colors duration-300 relative z-10`} />
                                    <span className="text-sm md:text-base font-bold text-muted-foreground group-hover:text-white/90 transition-colors duration-300 relative z-10">{social.label}</span>

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
