'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import { useAuth } from '@/context/AuthContext';

export default function ContactPage() {
    const { user } = useAuth();
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="relative min-h-screen">
            <UnifiedPujaBackground />

            <div className="container mx-auto px-4 py-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-saffron drop-shadow-sm">
                        Connect with the Divine
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-saffron to-transparent mx-auto"></div>
                    <p className="mt-6 text-lg text-muted-foreground/80 max-w-2xl mx-auto">
                        Seek guidance for your spiritual journey or inquire about our sacred Vedic services.
                        Our team is here to assist you at every step.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {[
                            {
                                icon: Phone,
                                title: "Phone & WhatsApp",
                                value: "+91 89892 71245",
                                sub: "Available 9 AM - 9 PM",
                                color: "from-orange-500/20 to-saffron/20",
                                href: "https://wa.me/918989271245"
                            },
                            {
                                icon: Mail,
                                title: "Email Address",
                                value: "info@mantrapuja.com",
                                sub: "We reply within 24 hours",
                                color: "from-blue-500/20 to-indigo-500/20",
                                href: "mailto:info@mantrapuja.com"
                            },
                            {
                                icon: MapPin,
                                title: "Sacred Location",
                                value: "501,502 Shagun Tower, Vijay Nagar, Indore, Madhya Pradesh, India",
                                sub: "Visit our head office",
                                color: "from-red-500/20 to-orange-500/20",
                                href: "#"
                            }
                        ].map((item, idx) => (
                            <motion.a
                                key={idx}
                                href={item.href}
                                target={item.href.startsWith('http') ? "_blank" : undefined}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, x: 10 }}
                                className="group flex items-center p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 shadow-xl transition-all hover:border-saffron/30 cursor-pointer"
                            >
                                <div className={`p-4 rounded-xl bg-gradient-to-br ${item.color} text-saffron group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-saffron transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-lg font-medium text-foreground/90">{item.value}</p>
                                    <p className="text-sm text-muted-foreground/70">{item.sub}</p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-saffron/30 to-gold/30 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>

                        <form 
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const data = {
                                    name: formData.get('name'),
                                    email: formData.get('email'),
                                    message: formData.get('message'),
                                    subject: new URLSearchParams(window.location.search).get('subject') || 'General Inquiry',
                                    user_id: user?.id || null
                                };
                                
                                setFormStatus('loading');
                                try {
                                    const res = await fetch('/api/contact', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(data)
                                    });
                                    if (res.ok) {
                                        setFormStatus('success');
                                        (e.target as HTMLFormElement).reset();
                                    } else {
                                        setFormStatus('error');
                                    }
                                } catch (err) {
                                    setFormStatus('error');
                                }
                            }}
                            className="relative bg-card/60 backdrop-blur-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10 dark:border-white/5 space-y-6"
                        >
                            <h3 className="text-3xl font-serif font-bold mb-8 text-foreground flex items-center">
                                <span className="w-8 h-8 rounded-full bg-saffron/10 flex items-center justify-center mr-3">
                                    <Send className="w-4 h-4 text-saffron" />
                                </span>
                                Send a Message
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Arjun Sharma"
                                        className="w-full p-4 bg-background/50 border border-border/50 rounded-2xl focus:ring-2 focus:ring-saffron/50 focus:border-saffron outline-none transition-all placeholder:text-muted-foreground/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="arjun@example.com"
                                        className="w-full p-4 bg-background/50 border border-border/50 rounded-2xl focus:ring-2 focus:ring-saffron/50 focus:border-saffron outline-none transition-all placeholder:text-muted-foreground/40"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground ml-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="How can we help you today?"
                                    className="w-full p-4 bg-background/50 border border-border/50 rounded-2xl focus:ring-2 focus:ring-saffron/50 focus:border-saffron outline-none transition-all resize-none placeholder:text-muted-foreground/40"
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={formStatus === 'loading'}
                                className="w-full py-4 bg-gradient-to-r from-saffron to-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-saffron/30 hover:shadow-saffron/50 transition-all flex items-center justify-center space-x-2 text-lg disabled:opacity-50"
                            >
                                {formStatus === 'loading' ? (
                                    <span className="animate-pulse">Sending...</span>
                                ) : formStatus === 'success' ? (
                                    <span>Message Sent!</span>
                                ) : (
                                    <>
                                        <span>Seek Assistance</span>
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>

                            {formStatus === 'error' && (
                                <p className="text-red-500 text-center font-bold text-sm">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

