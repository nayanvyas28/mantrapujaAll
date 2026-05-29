"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowLeft, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export default function ChadavaPage() {
    return (
        <div className="min-h-screen bg-[#0a0f18] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Sacred Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[150px] animate-pulse delay-1000" />
            </div>

            {/* Content Container */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center max-w-2xl"
            >
                {/* Icon Circle */}
                <div className="mb-12 relative inline-block">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-orange-500/30 rounded-full scale-150"
                    />
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.5)]">
                        <ShoppingBag className="w-14 h-14 text-white" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
                    Chadava <span className="text-orange-500 italic">&</span> Offerings
                </h1>
                
                <div className="flex items-center justify-center gap-3 mb-10">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-500" />
                    <span className="flex items-center gap-2 text-orange-400 font-bold uppercase tracking-[0.3em] text-sm">
                        <Star className="w-4 h-4" />
                        Coming Soon
                    </span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-500" />
                </div>

                <p className="text-zinc-400 text-lg md:text-xl mb-12 leading-relaxed font-light">
                    We are currently consecrating this digital space to bring you authentic temple offerings and sacred chadava services from across India.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link 
                        href="/"
                        className="group flex items-center gap-3 px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-300 transform active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                        Back To Home
                    </Link>
                    
                    <div className="flex items-center gap-6 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Launching In</span>
                            <span className="text-orange-400 font-black">Summer 2026</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Floating Decorative Icons */}
            <Sun className="absolute top-20 right-[15%] w-12 h-12 text-orange-500/20 animate-spin-slow" />
            <Moon className="absolute bottom-20 left-[15%] w-10 h-10 text-blue-500/10 animate-bounce" />
        </div>
    );
}
