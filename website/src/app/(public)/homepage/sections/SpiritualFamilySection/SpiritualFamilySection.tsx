"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, MessageCircle, Instagram, Youtube, Facebook, Twitter, Mail, Phone } from "lucide-react";

export default function SpiritualFamilySection() {
    const [contact, setContact] = useState("");

    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-background">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-saffron rounded-full animate-spin-slow"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        Join Our <span className="text-saffron">Spiritual Family</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-light">
                        Over 50,000+ devotees have entrusted us with their sacred rituals. Become a part of our global community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    {/* Card 1: Newsletter */}
                    <div className="bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 shadow-xl flex flex-col items-center text-center group transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
                            <Mail className="w-8 h-8 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Sacred Wisdom</h3>
                        <p className="text-sm text-muted-foreground mb-8">Receive daily spiritual insights and Vedic wisdom directly.</p>
                        
                        <div className="w-full relative mt-auto">
                            <input 
                                type="text" 
                                placeholder="Email or Phone"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="w-full h-14 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-white/10 px-6 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            />
                            <button className="absolute right-1 top-1 bottom-1 px-4 bg-orange-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-colors">
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Card 2: WhatsApp */}
                    <div className="bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 shadow-xl flex flex-col items-center text-center group transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                            <MessageCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">WhatsApp Group</h3>
                        <p className="text-sm text-muted-foreground mb-8">Join our community for instant updates and live rituals.</p>
                        
                        <Link 
                            href="https://chat.whatsapp.com/your-group-id" 
                            target="_blank"
                            className="w-full h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center text-sm font-black uppercase tracking-widest hover:bg-green-600 transition-colors mt-auto"
                        >
                            Join Now
                        </Link>
                    </div>

                    {/* Card 3: Telegram */}
                    <div className="bg-white/50 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 shadow-xl flex flex-col items-center text-center group transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6">
                            <Send className="w-8 h-8 text-sky-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Telegram Channel</h3>
                        <p className="text-sm text-muted-foreground mb-8">Stay updated with sacred calendars and festival alerts.</p>
                        
                        <Link 
                            href="https://t.me/your-channel-id" 
                            target="_blank"
                            className="w-full h-14 bg-sky-500 text-white rounded-2xl flex items-center justify-center text-sm font-black uppercase tracking-widest hover:bg-sky-600 transition-colors mt-auto"
                        >
                            Join Channel
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-8">
                    <p className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em]">Follow Our Journey</p>
                    <div className="flex gap-4">
                        {[
                            { Icon: Instagram, href: "https://instagram.com/mantrapuja" },
                            { Icon: Youtube, href: "https://youtube.com/mantrapuja" },
                            { Icon: Facebook, href: "https://facebook.com/mantrapuja" },
                            { Icon: Twitter, href: "https://twitter.com/mantrapuja" }
                        ].map((social, i) => (
                            <Link 
                                key={i} 
                                href={social.href}
                                target="_blank"
                                className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-saffron hover:text-white transition-all duration-300 shadow-sm"
                            >
                                <social.Icon size={24} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
