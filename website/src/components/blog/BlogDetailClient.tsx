"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Calendar, 
    Clock, 
    ArrowLeft, 
    ChevronRight 
} from 'lucide-react';
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";
import { getBlogCategoryStyle } from '@/lib/uiMapping';

interface BlogDetailClientProps {
    blog: {
        title: string;
        image_url: string;
        category?: string;
        created_at: string;
        reading_time?: string;
        author?: any;
        slug: string;
    };
    children: React.ReactNode;
    socialShare?: React.ReactNode;
    toc?: React.ReactNode;
    newsletter?: React.ReactNode;
}

export default function BlogDetailClient({ blog, children, socialShare, toc, newsletter }: BlogDetailClientProps) {
    const title = blog.title;
    const imageUrl = blog.image_url;
    const date = blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    }) : 'Divine Wisdom';

    return (
        <article className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden pb-24">
            <UnifiedPujaBackground />
            
            {/* --- Hero Header Section --- */}
            <div className="relative min-h-[50vh] md:min-h-[65vh] w-full flex items-end pb-16 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {imageUrl && imageUrl.trim() !== "" ? (
                        <Image 
                            src={imageUrl} 
                            alt={title}
                            fill
                            priority
                            fetchPriority="high"
                            className="w-full h-full object-cover scale-105"
                            sizes="100vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-saffron/20 scale-105" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <nav className="flex items-center gap-2 text-white/80 text-[11px] font-black uppercase tracking-[0.25em] mb-8 overflow-x-auto no-scrollbar whitespace-nowrap drop-shadow-md">
                            <Link href="/" className="hover:text-saffron transition-colors text-saffron">Home</Link>
                            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                            <Link href="/blog" className="hover:text-saffron transition-colors">Blog</Link>
                            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                            <span className="text-white/60 truncate max-w-[300px]">{title}</span>
                        </nav>

                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            {[blog.category || 'Spiritual', 'Divine', 'Wisdom'].map((tag) => (
                                <span key={tag} className="px-4 py-1.5 rounded-full bg-saffron/20 border border-saffron/30 text-[10px] font-black uppercase tracking-widest text-saffron backdrop-blur-md shadow-xl">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black font-serif text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                            {title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-white/80 text-xs font-bold uppercase tracking-[0.2em]">
                            <time dateTime={blog.created_at} className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-saffron" />
                                {date}
                            </time>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-saffron" />
                                {blog.reading_time || '5 min read'}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- Single Column Article Body --- */}
            <div className="container mx-auto px-4 -mt-16 md:-mt-24 relative z-30 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto bg-card/95 dark:bg-card/70 backdrop-blur-3xl rounded-[40px] md:rounded-[60px] p-8 md:p-20 shadow-2xl border border-border/50 dark:border-white/10 relative overflow-hidden"
                >
                    {/* Glowing Ornaments */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-saffron/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10 prose dark:prose-invert prose-orange max-w-none prose-p:text-foreground/80 dark:prose-p:text-white/80 prose-headings:text-foreground dark:prose-headings:text-white">
                        {children}
                    </div>
                    
                    {blog.author && (
                        <div className="mt-20 p-8 md:p-12 rounded-[40px] bg-secondary/40 dark:bg-white/5 border border-border/50 dark:border-white/10 flex flex-col md:flex-row items-center gap-8 group backdrop-blur-md">
                            <div className="w-24 h-24 rounded-full border-4 border-saffron overflow-hidden shrink-0 transform group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                                <img src={blog.author.avatar || "/logo.png"} alt={blog.author.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <Link 
                                    href={`/authors/${blog.author.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                                    className="group/author"
                                >
                                    <h4 className="text-2xl font-serif font-black mb-2 text-foreground dark:text-white group-hover/author:text-saffron transition-colors">
                                        {blog.author.name}
                                    </h4>
                                </Link>
                                <p className="text-muted-foreground dark:text-white/60 leading-relaxed italic text-lg">
                                    "{blog.author.bio || 'Sharing the light of Vedic wisdom to guide modern seekers on their spiritual journey.'}"
                                </p>
                            </div>
                        </div>
                    )}

                    {socialShare}
                </motion.div>

                {/* Newsletter Section */}
                <div className="mt-20">
                    {newsletter}
                </div>
            </div>
        </article>
    );
}
