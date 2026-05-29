"use client";

import React, { useState } from 'react';
import BlogCard from './BlogCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface BlogGridProps {
    blogs: any[];
}

export default function BlogGrid({ blogs }: BlogGridProps) {
    const INITIAL_COUNT = 12; // 4 rows of 3
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const hasMore = visibleCount < blogs.length;

    const loadMore = () => {
        setVisibleCount(prev => prev + 12); // Load another 4 rows
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full mb-20">
                <AnimatePresence mode="popLayout">
                    {blogs.slice(0, visibleCount).map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                        >
                            <BlogCard blog={blog} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {hasMore && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={loadMore}
                    className="group relative flex items-center gap-3 px-12 py-5 rounded-2xl bg-white/5 border border-saffron/20 hover:border-saffron/50 transition-all overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-saffron/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <span className="relative z-10 text-saffron font-black uppercase tracking-[0.2em] text-xs">
                        Discover More Wisdom
                    </span>
                    <ChevronDown className="relative z-10 w-4 h-4 text-saffron group-hover:translate-y-1 transition-transform" />
                    
                    {/* Glow Effect */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-saffron/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
            )}

            {!hasMore && blogs.length > INITIAL_COUNT && (
                <p className="text-muted-foreground font-serif italic text-lg">
                    You have reached the end of current revelations.
                </p>
            )}
        </div>
    );
}
