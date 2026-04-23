'use client';

import { useState } from 'react';
import { Database, Trash2, RefreshCcw, CheckCircle, AlertTriangle, Loader2, ArrowLeft, Layers, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function StorageSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const runCleanup = async (dryRun: boolean) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/storage-cleanup?dryRun=${dryRun}`, {
                method: 'POST'
            });
            const data = await response.json();
            if (data.success) {
                setResult(data);
            } else {
                setError(data.error);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-sans relative overflow-x-hidden">
            <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 w-full">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-gradient-to-tr from-orange-500/20 to-red-500/20 rounded-2xl border border-white/10 shadow-lg shadow-orange-500/5">
                            <Database className="w-6 h-6 text-orange-400" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Storage Optimization
                        </h1>
                    </div>
                    <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                        Scan your Supabase 'music_assets' bucket for orphaned files that are no longer referenced in any database table. Reclaim space and maintain system integrity.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 space-y-6 hover:border-orange-500/30 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                            <RefreshCcw className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2">Safe Scan</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Identify unused images and files across all categories (Banners, Pujas, Music, Popups) without deleting anything. Recommended before final purging.
                            </p>
                        </div>
                        <button
                            onClick={() => runCleanup(true)}
                            disabled={isLoading}
                            className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Layers className="w-4 h-4" />}
                            Execute Dry Run
                        </button>
                    </div>

                    <div className="p-8 rounded-[32px] bg-red-950/10 border border-red-500/10 space-y-6 hover:border-red-500/30 transition-all group">
                        <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                            <Trash2 className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2">Production Purge</h3>
                            <p className="text-xs text-gray-500 leading-relaxed text-red-400/80">
                                Irreversibly delete all orphaned assets from the primary storage bucket. Ensure you have recently scanned via Dry Run to verify results.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                if (confirm('Are you absolutely sure? This will delete orphaned files from storage permanently.')) {
                                    runCleanup(false);
                                }
                            }}
                            disabled={isLoading}
                            className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all text-red-400 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                            Purge Unused Assets
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3 mb-6"
                        >
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            {error}
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6 animate-in fade-in duration-500"
                        >
                            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center gap-4">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                                <div>
                                    <h4 className="font-bold text-green-400">{result.status}</h4>
                                    <p className="text-xs text-green-400/60 font-medium">{result.dryRun ? 'This was a safe scan. No files were modified.' : 'Files have been permanently removed.'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 text-center">
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Files Scanned</p>
                                    <p className="text-3xl font-black">{result.scannedInStorage}</p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 text-center">
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Used in DB</p>
                                    <p className="text-3xl font-black text-blue-400">{result.scannedInDb}</p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 text-center">
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Orphaned</p>
                                    <p className="text-3xl font-black text-orange-400">{result.unusedCount}</p>
                                </div>
                            </div>

                            {result.unusedFiles?.length > 0 && (
                                <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
                                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Orphaned Files Detected ({result.unusedCount})</h4>
                                    </div>
                                    <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                                        <div className="grid grid-cols-1 gap-2">
                                            {result.unusedFiles.map((file: string, idx: number) => (
                                                <div key={idx} className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[10px] font-mono text-gray-400 truncate">
                                                    {file}
                                                </div>
                                            ))}
                                            {result.note && (
                                                <div className="px-4 py-2 text-center text-xs font-bold text-orange-400/50 italic">
                                                    {result.note}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
