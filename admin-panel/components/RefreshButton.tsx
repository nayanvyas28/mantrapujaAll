"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RefreshButton() {
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Perform a full window reload to ensure everything is refreshed
        window.location.reload();
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-orange-500/30 transition-all group disabled:opacity-50"
            title="Refresh Dashboard Data"
        >
            <RefreshCw 
                size={16} 
                className={`text-orange-400 group-hover:rotate-180 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </span>
        </motion.button>
    );
}
