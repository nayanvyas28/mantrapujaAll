"use client";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
    q: string;
    a: string;
}

export default function FAQIsland({ faqs }: { faqs: FAQ[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
                <div 
                    key={i} 
                    className={`group rounded-3xl transition-all duration-500 border ${
                        openIndex === i 
                        ? 'bg-white dark:bg-zinc-900 shadow-2xl border-saffron/30 scale-[1.02]' 
                        : 'bg-white/50 dark:bg-zinc-900/30 border-zinc-200 dark:border-white/5 hover:border-saffron/20'
                    }`}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full p-6 md:p-8 flex items-center justify-between text-left gap-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${openIndex === i ? 'bg-saffron text-white' : 'bg-saffron/10 text-saffron'}`}>
                                <HelpCircle size={20} />
                            </div>
                            <span className={`text-lg md:text-xl font-bold transition-colors ${openIndex === i ? 'text-saffron' : 'text-foreground group-hover:text-saffron'}`}>
                                {faq.q}
                            </span>
                        </div>
                        <ChevronDown 
                            className={`w-6 h-6 text-zinc-400 transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-saffron' : ''}`} 
                        />
                    </button>
                    
                    <AnimatePresence>
                        {openIndex === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 md:px-8 pb-8 pt-0">
                                    <div className="h-[1px] w-full bg-gradient-to-r from-saffron/20 via-saffron/10 to-transparent mb-6"></div>
                                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg pl-14">
                                        {faq.a}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
