"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getBlogCategoryStyle } from "@/lib/uiMapping";
import { Clock, Eye, User, ArrowRight } from "lucide-react";

interface BlogCardProps {
    blog: any;
    priority?: boolean;
}

export default function BlogCard({ blog, priority = false }: BlogCardProps) {
    const title = blog.blog_title || blog.title;
    const imageUrl = blog.featured_image_url || blog.image_url;
    const dateStr = blog.created_at || blog.updated_at;
    const formattedDate = dateStr 
        ? new Date(dateStr).toLocaleDateString("en-GB", { 
            day: "numeric", 
            month: "short", 
            year: "numeric" 
          })
        : "Recent";

    const authorName = blog.author_name || blog.author?.name || "Mantra Guru Ji";
    const authorAvatar = blog.author_avatar || blog.author?.avatar || "/logo.png";
    const authorRole = blog.author_role || blog.author?.role || "Divine Guide";
    
    // Clean Slug Generation (removes dots, commas, etc)
    const authorSlug = authorName.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.5 }}
            className="group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900/80 backdrop-blur-md border border-saffron/10 dark:border-gold/20 hover:border-saffron/40 dark:hover:border-gold/50 shadow-sm hover:shadow-2xl dark:shadow-black/40 transition-all duration-500"
        >
            {/* Premium Shine Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-saffron/5 via-transparent to-gold/5"></div>
            </div>
            {/* Image Section - Wrapped in Link for Crawlability */}
            <header className="relative aspect-[4/3] overflow-hidden w-full">
                <Link href={`/blog/${blog.slug}`} className="block w-full h-full relative" aria-label={`Read more about ${title}`}>
                    <Image
                        src={imageUrl}
                        alt={`${title} - MantraPuja Blog`}
                        fill
                        priority={priority}
                        loading={priority ? "eager" : "lazy"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                </Link>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 rounded-full border text-[9px] uppercase font-black tracking-widest shadow-2xl ${getBlogCategoryStyle(blog.category)}`}>
                        {blog.category}
                    </span>
                </div>
            </header>

            {/* Content Section */}
            <div className="relative p-8 flex flex-col flex-1 z-10">
                <div className="flex items-center gap-2 mb-4">
                    <time dateTime={dateStr || ""} className="text-xs font-bold text-saffron dark:text-gold uppercase tracking-widest">
                        {formattedDate}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                    <span className="text-xs text-muted-foreground dark:text-slate-400">
                        {blog.views || 0} Views
                    </span>
                </div>

                <h2 className="text-2xl font-black text-foreground mb-4 leading-snug group-hover:text-saffron dark:group-hover:text-gold transition-colors font-serif line-clamp-2">
                    <Link href={`/blog/${blog.slug}`}>
                        {title}
                    </Link>
                </h2>

                <p className="text-muted-foreground dark:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                </p>

                <footer className="mt-auto flex items-center justify-between">
                    {/* Author Info */}
                    <Link 
                        href={`/authors/${authorSlug}`}
                        className="flex items-center gap-3 group/author z-20 relative"
                    >
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-border group-hover/author:border-saffron transition-colors relative flex-shrink-0">
                            <Image 
                                src={authorAvatar} 
                                alt={authorName} 
                                fill
                                sizes="32px"
                                className="object-cover" 
                                unoptimized
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-foreground group-hover/author:text-saffron transition-colors">
                                {authorName}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{authorRole}</span>
                        </div>
                    </Link>

                    <Link 
                        href={`/blog/${blog.slug}`}
                        className="flex items-center text-saffron dark:text-gold font-bold text-sm tracking-loose group/btn"
                        aria-label={`Read full article: ${title}`}
                    >
                        READ
                        <svg
                            className="w-4 h-4 ml-2 transform transition-transform group-hover/btn:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </footer>
            </div>
        </motion.article>
    );
}
