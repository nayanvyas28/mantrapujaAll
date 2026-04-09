'use client';

import { motion } from 'framer-motion';
import { Gavel, Users, BookOpen, Scale, AlertCircle } from 'lucide-react';
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";

export default function TermsOfServicePage() {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            icon: <Scale className="w-6 h-6 text-saffron" />,
            content: "By accessing and using MantraPuja, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, then you are prohibited from using the site and must discontinue use immediately."
        },
        {
            title: "2. Use of Services",
            icon: <Users className="w-6 h-6 text-saffron" />,
            content: "Our services are designed for your personal spiritual use. You agree not to use the services for any illegal or unauthorized purpose, nor to violate any laws in your jurisdiction through the use of the services."
        },
        {
            title: "3. User Accounts",
            icon: <BookOpen className="w-6 h-6 text-saffron" />,
            content: "To access certain features of the service, you may be required to register for an account. You represent and warrant that all information you provide is truthful and accurate, and you will maintain the accuracy of such information."
        },
        {
            title: "4. Intellectual Property",
            icon: <Gavel className="w-6 h-6 text-saffron" />,
            content: "Unless otherwise indicated, the Website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Website are owned or controlled by us."
        },
        {
            title: "5. Termination",
            icon: <AlertCircle className="w-6 h-6 text-saffron" />,
            content: "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation."
        }
    ];

    return (
        <div className="min-h-screen relative transition-colors duration-300 overflow-x-hidden">
            <UnifiedPujaBackground />

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-16 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-saffron/10 text-saffron text-xs font-bold uppercase tracking-widest mb-6 border border-saffron/20 backdrop-blur-sm">
                            Legal Agreement
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight font-serif">
                            Terms of <span className="text-saffron">Service</span>
                        </h1>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto italic">
                            "Guided by Dharma and mutual respect. Please read these terms carefully."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="relative z-10 pb-24 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="space-y-8">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group bg-card/60 backdrop-blur-xl border border-border/50 rounded-[32px] p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-saffron/30"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="p-4 rounded-2xl bg-saffron/5 border border-saffron/10 group-hover:bg-saffron/10 transition-colors">
                                        {section.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-black mb-4 font-serif text-foreground group-hover:text-saffron transition-colors">
                                            {section.title}
                                        </h2>
                                        <div className="w-12 h-1 bg-saffron/30 rounded-full mb-6 group-hover:w-20 transition-all duration-500"></div>
                                        <p className="text-muted-foreground leading-relaxed md:text-lg">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Agreement Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] rounded-[32px] p-10 text-white shadow-2xl text-center relative overflow-hidden border border-white/10"
                        >
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-4 font-serif">Acceptance</h3>
                                <p className="text-white/80 mb-8 max-w-md mx-auto">
                                    By using MantraPuja, you acknowledge that you have read and understood these Terms of Service.
                                </p>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="inline-flex items-center px-8 py-4 bg-saffron text-white rounded-full font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl hover:-translate-y-1"
                                >
                                    Return to Top
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Scale className="w-32 h-32" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
