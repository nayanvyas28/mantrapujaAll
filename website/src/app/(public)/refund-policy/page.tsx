'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { RefreshCcw, CreditCard, Clock, CheckCircle, HelpCircle } from 'lucide-react';
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";

export default function RefundPolicyPage() {
    const sections = [
        {
            title: "1. Refund Eligibility",
            icon: <CheckCircle className="w-6 h-6 text-saffron" />,
            content: "Refunds for puja services are generally considered if a service is cancelled by the customer at least 48 hours prior to the scheduled time or if the service could not be rendered due to unforeseen circumstances on our end."
        },
        {
            title: "2. Cancellation Process",
            icon: <RefreshCcw className="w-6 h-6 text-saffron" />,
            content: "To request a cancellation and subsequent refund, please contact our support team with your booking ID. Each request is evaluated based on the specific circumstances and the advance timing of the cancellation."
        },
        {
            title: "3. Refund Timeline",
            icon: <Clock className="w-6 h-6 text-saffron" />,
            content: "Once a refund is approved, it may take 5-7 business days for the amount to reflect in your original payment method. We appreciate your patience as we process the transaction through our banking partners."
        },
        {
            title: "4. Non-Refundable Items",
            icon: <CreditCard className="w-6 h-6 text-saffron" />,
            content: "Materials or samagri already procured specifically for a custom ritual may be non-refundable. Services already performed or in-progress are also generally ineligible for refunds."
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
                            Trust & Transparency
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight font-serif">
                            Refund <span className="text-saffron">Policy</span>
                        </h1>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto italic">
                            "A fair and clear process for your peace of mind and satisfaction."
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
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group bg-card/60 backdrop-blur-xl border border-border/50 rounded-[32px] p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-saffron/30"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="p-4 rounded-2xl bg-saffron/5 border border-saffron/10 group-hover:bg-saffron/10 transition-colors text-saffron">
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

                        {/* Help Desk Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-card/80 backdrop-blur-2xl border-2 border-dashed border-saffron/30 rounded-[32px] p-10 text-center relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <HelpCircle className="w-12 h-12 text-saffron mx-auto mb-6 opacity-50" />
                                <h3 className="text-2xl font-black mb-4 font-serif">Need Assistance?</h3>
                                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                    Our support team is here to guide you through any questions about cancellations or refunds.
                                </p>
                                <Link
                                    href="/contact-us"
                                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                                >
                                    Contact Support
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
