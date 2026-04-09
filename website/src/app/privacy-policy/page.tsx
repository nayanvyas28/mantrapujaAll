'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";

export default function PrivacyPolicyPage() {
    const sections = [
        {
            title: "1. Introduction",
            icon: <Shield className="w-6 h-6 text-saffron" />,
            content: "Welcome to MantraPuja. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us."
        },
        {
            title: "2. Information We Collect",
            icon: <Eye className="w-6 h-6 text-saffron" />,
            content: "We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us."
        },
        {
            title: "3. How We Use Your Information",
            icon: <Lock className="w-6 h-6 text-saffron" />,
            content: "We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations."
        },
        {
            title: "4. Sharing Your Information",
            icon: <FileText className="w-6 h-6 text-saffron" />,
            content: "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on legal basis such as consent, legitimate interests, performance of a contract, and legal obligations."
        },
        {
            title: "5. Cookies and Tracking",
            icon: <ChevronRight className="w-6 h-6 text-saffron" />,
            content: "We may use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice."
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
                            Legal Protection
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight font-serif">
                            Privacy <span className="text-saffron">Policy</span>
                        </h1>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto italic">
                            "Last updated: February 16, 2026. Your trust and privacy are sacred to us."
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

                        {/* Contact Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-orange-600 to-red-600 rounded-[32px] p-10 text-white shadow-2xl text-center relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-4 font-serif">Questions?</h3>
                                <p className="text-white/80 mb-8 max-w-md mx-auto">
                                    If you have any questions about our Privacy Policy, please contact our support team.
                                </p>
                                <a
                                    href="mailto:contact@mantrapuja.com"
                                    className="inline-flex items-center px-8 py-4 bg-white text-orange-600 rounded-full font-bold uppercase tracking-widest hover:bg-orange-50 transition-all shadow-xl hover:-translate-y-1"
                                >
                                    Email Us
                                </a>
                            </div>
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Shield className="w-32 h-32" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
