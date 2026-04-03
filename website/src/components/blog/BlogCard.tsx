"use client";

import Link from "next/link";
import { BlogPost } from "@/data/blog-data";
import { motion } from "framer-motion";
import { getBlogCategoryStyle } from "@/lib/uiMapping";

export default function BlogCard({ blog }: { blog: BlogPost }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className="h-full"
        >
            <Link href={`/blog/${blog.slug}`} className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] transition-all duration-500">

                {/* Visual Card Background - Theme Dependent */}
                <div className="absolute inset-0 bg-white dark:bg-slate-900/80 backdrop-blur-md border border-saffron/10 dark:border-gold/20 group-hover:border-saffron/40 dark:group-hover:border-gold/50 shadow-sm group-hover:shadow-xl dark:shadow-black/40 transition-all duration-500"></div>

                {/* Image Section */}
                <div className="relative h-60 overflow-hidden w-full">
                    <img
                        src={blog.image_url}
                        alt={`${blog.title} - MantraPuja Blog`}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 text-[10px] uppercase font-bold tracking-wider">
                            {blog.category}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative p-8 flex flex-col flex-1 z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-bold text-saffron dark:text-gold uppercase tracking-widest">
                            {new Date(blog.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                        <span className="text-xs text-muted-foreground dark:text-slate-400">
                            {blog.views} Views
                        </span>
                    </div>

                    <h3 className="text-2xl font-black text-foreground mb-4 leading-snug group-hover:text-saffron dark:group-hover:text-gold transition-colors font-serif line-clamp-2">
                        {blog.title}
                    </h3>

                    <p className="text-muted-foreground dark:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                        {blog.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
                                <img src={blog.author.avatar} alt={blog.author.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Handle author click - ideally navigation
                                        console.log(`Clicked author: ${blog.author.name}`);
                                    }}
                                    className="text-xs font-bold text-foreground hover:text-saffron cursor-pointer z-20"
                                >
                                    {blog.author.name}
                                </span>
                                <span className="text-[10px] text-muted-foreground">{blog.author.role}</span>
                            </div>
                        </div>

                        <div className="flex items-center text-saffron dark:text-gold font-bold text-sm tracking-loose group/btn">
                            READ
                            <svg
                                className="w-4 h-4 ml-2 transform transition-transform group-hover/btn:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
