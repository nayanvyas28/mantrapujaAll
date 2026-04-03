'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    ArrowLeft,
    Sparkles,
    Share2,
    BookOpen,
    MessageSquare,
    ChevronRight,
    Search
} from 'lucide-react';
import CollapsibleText from '@/components/ui/CollapsibleText';
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import { getBlogCategoryStyle } from '@/lib/uiMapping';

interface BlogDetailClientProps {
    blog: any;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
    return (
        <article className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden pb-24">
            {/* Unified Background */}
            <UnifiedPujaBackground />

            {/* Hero Header with Image Fallback */}
            <div className={`relative ${blog.image_url && blog.image_url !== 'null' && blog.image_url !== '' ? 'h-[60vh] md:h-[70vh]' : 'h-[50vh]'} w-full overflow-hidden pt-20`}>
                <div className="absolute inset-0 z-0">
                    {blog.image_url && blog.image_url !== 'null' && blog.image_url !== '' ? (
                        <>
                            <motion.img
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                src={blog.image_url}
                                alt=""
                                onError={(e) => {
                                    e.currentTarget.style.opacity = '0';
                                    e.currentTarget.style.display = 'none';
                                }}
                                className="w-full h-full object-cover transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/40 to-transparent z-10"></div>
                        </>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#2a1a0f] to-[#0a0500] flex items-center justify-center border-none outline-none">
                            <div className="absolute inset-0 opacity-10">
                                <Sparkles className="w-full h-full p-40" />
                            </div>
                        </div>
                    )}
                    {/* Consistent dark bottom overlay - Adjusted to prevent bleed-through */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/40 to-transparent z-10"></div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-20 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <Link href="/blog" className="inline-flex items-center text-black dark:text-white/80 hover:text-saffron mb-8 transition-all font-bold tracking-widest text-xs uppercase group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Articles
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {blog.tags && blog.tags.map((tag: string, idx: number) => (
                                <motion.span
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-1.5 rounded-full bg-saffron text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_8px_20px_-4px_rgba(234,88,12,0.5)] border border-saffron/50 flex items-center justify-center"
                                >
                                    <Sparkles className="w-3 h-3 mr-1.5 text-white/80" />
                                    {tag}
                                </motion.span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl" style={{ fontFamily: 'Georgia, serif' }}>
                            {blog.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-bold tracking-wide">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-saffron" />
                                {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-saffron/50 hidden md:block"></span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-saffron" />
                                5 min read
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-saffron/50 hidden md:block"></span>
                            <span className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-saffron" />
                                Divine Wisdom
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 -mt-16 relative z-30">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-6xl mx-auto bg-card/40 backdrop-blur-xl rounded-[48px] p-8 md:p-20 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.5)] border border-border/40 relative"
                >
                    {/* Floating Ornaments */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-saffron/10 rounded-full blur-[60px] pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-600/5 rounded-full blur-[80px] pointer-events-none"></div>


                    {/* Blog Content Logic */}
                    {(() => {
                        let structuredContent = null;
                        try {
                            if (blog.content) {
                                let parsed = null;
                                if (typeof blog.content === 'object') {
                                    parsed = blog.content;
                                } else if (typeof blog.content === 'string') {
                                    const trimmed = blog.content.trim();
                                    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                                        parsed = JSON.parse(trimmed);
                                    }
                                }

                                // Check if it has the required structure (allow empty intro)
                                if (parsed && Array.isArray(parsed.sections)) {
                                    structuredContent = parsed;
                                }
                            }
                        } catch (e) {
                            console.error("Failed to parse blog content JSON:", e);
                        }

                        if (structuredContent) {
                            return (
                                <div className="space-y-20 relative z-10">
                                    {/* Introduction */}
                                    <section>
                                        <div className="border-l-4 border-saffron pl-8 italic relative">
                                            <div className="absolute top-0 left-0 -translate-x-full pr-4 opacity-20">
                                                <Sparkles className="w-12 h-12 text-saffron" />
                                            </div>
                                            <CollapsibleText
                                                text={structuredContent.introduction}
                                                lineClamp={4}
                                                className="text-xl md:text-2xl leading-relaxed font-serif font-medium text-foreground/90"
                                                buttonClassName="text-saffron font-black uppercase tracking-widest text-xs mt-4"
                                            />
                                        </div>
                                    </section>

                                    {/* Sections */}
                                    <div className="space-y-24">
                                        {structuredContent.sections.map((section: any, idx: number) => (
                                            <section key={idx} className="group">
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="p-3 rounded-2xl bg-saffron/10 border border-saffron/20 group-hover:scale-110 transition-transform">
                                                        <BookOpen className="w-6 h-6 text-saffron" />
                                                    </div>
                                                    <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tight">
                                                        {section.heading}
                                                    </h2>
                                                </div>

                                                <p className="text-lg md:text-xl leading-relaxed text-foreground/80 mb-10">
                                                    {section.content}
                                                </p>

                                                {section.key_points && section.key_points.length > 0 && (
                                                    <div className="grid gap-6 bg-secondary/30 backdrop-blur-sm p-8 md:p-12 rounded-[40px] border border-border/40 hover:border-saffron/30 transition-all shadow-inner">
                                                        {section.key_points.map((point: string, kIdx: number) => (
                                                            <div key={kIdx} className="flex items-start gap-5">
                                                                <div className="mt-2 w-2 h-2 rounded-full bg-saffron shadow-[0_0_10px_rgba(249,115,22,0.8)] shrink-0"></div>
                                                                <span className="text-base md:text-lg font-medium text-foreground/90">{point}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </section>
                                        ))}
                                    </div>

                                    {/* FAQ Section */}
                                    {structuredContent.faq && structuredContent.faq.length > 0 && (
                                        <section className="bg-gradient-to-br from-saffron/5 to-orange-600/5 rounded-[48px] p-8 md:p-16 border border-saffron/10 shadow-2xl">
                                            <div className="flex items-center gap-4 mb-12">
                                                <div className="w-12 h-12 rounded-2xl bg-saffron flex items-center justify-center text-white shadow-lg">
                                                    <MessageSquare className="w-6 h-6" />
                                                </div>
                                                <h2 className="text-3xl md:text-4xl font-black font-serif">Deep Insights (FAQ)</h2>
                                            </div>

                                            <div className="space-y-10">
                                                {structuredContent.faq.map((item: any, fIdx: number) => (
                                                    <div key={fIdx} className="group transition-all">
                                                        <h3 className="font-black text-xl md:text-2xl mb-4 flex items-start gap-4">
                                                            <span className="text-saffron italic font-serif text-3xl opacity-50">Q.</span>
                                                            {item.question}
                                                        </h3>
                                                        <div className="pl-12">
                                                            <p className="text-lg text-foreground/70 leading-relaxed border-l border-border/50 pl-6 group-hover:border-saffron/50 transition-colors">
                                                                {item.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Conclusion */}
                                    {structuredContent.conclusion && (
                                        <div className="text-center py-16 px-8 bg-black/5 rounded-[40px] border border-white/10 relative overflow-hidden group">
                                            <div className="absolute top-0 left-0 p-8 opacity-5">
                                                <Sparkles className="w-32 h-32" />
                                            </div>
                                            <p className="text-2xl md:text-3xl font-serif font-black text-foreground italic leading-tight max-w-2xl mx-auto relative z-10">
                                                "{structuredContent.conclusion}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        } else {
                            // Fallback to legacy HTML rendering
                            return (
                                <div
                                    className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
                                    prose-headings:font-serif prose-headings:font-black prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-p:leading-relaxed prose-p:text-foreground/80
                                    prose-a:text-saffron prose-a:font-bold hover:prose-a:underline
                                    prose-img:rounded-[32px] prose-img:shadow-2xl prose-quoteless"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />
                            );
                        }
                    })()}

                    {/* Footer / Share & Next Steps */}
                    <div className="mt-24 pt-12 border-t border-border/40">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                            <div className="text-center md:text-left">
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-saffron mb-4">Share the Wisdom</h4>
                                <div className="flex gap-4">
                                    {[
                                        { icon: "X", color: "bg-white/5" },
                                        { icon: "f", color: "bg-blue-600/10 text-blue-500" },
                                        { icon: "in", color: "bg-blue-700/10 text-blue-600" }
                                    ].map((social, i) => (
                                        <motion.button
                                            key={i}
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`w-12 h-12 rounded-full ${social.color} border border-border/50 flex items-center justify-center font-black text-lg shadow-lg hover:shadow-xl transition-all`}
                                        >
                                            {social.icon}
                                        </motion.button>
                                    ))}
                                    <motion.button
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-12 h-12 rounded-full bg-saffron text-white flex items-center justify-center shadow-lg hover:shadow-saffron/40 transition-all"
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-full md:w-auto"
                            >
                                <Link
                                    href="/pooja-services"
                                    className="group flex items-center gap-4 bg-gradient-to-r from-orange-600 to-amber-600 p-6 md:p-8 rounded-[32px] text-white shadow-2xl hover:shadow-orange-500/30 transition-all relative overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Spiritual Path</p>
                                        <h5 className="text-lg font-black font-serif">Book a Vedic Puja</h5>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative z-10 group-hover:translate-x-2 transition-transform">
                                        <ChevronRight className="w-6 h-6" />
                                    </div>
                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                        <Sparkles className="w-20 h-32" />
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </article>
    );
}
