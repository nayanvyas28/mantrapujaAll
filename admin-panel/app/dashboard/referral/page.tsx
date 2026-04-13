'use client';

import { useState, useEffect } from 'react';
import { Share2, Save, ArrowLeft, Loader2, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ReferralSettingsPage() {
    const [referralMessage, setReferralMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [updatedAt, setUpdatedAt] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const sampleReferralCode = 'MANTRA-EXAMP';

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/config');
            const data = await res.json();
            if (res.ok) {
                setReferralMessage(data.referralMessage || '');
                setUpdatedAt(data.updatedAt);
            }
        } catch (error) {
            console.error('Failed to fetch referral settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ referral_message: referralMessage }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Referral message updated successfully!' });
                fetchSettings();
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to update message' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred' });
        } finally {
            setIsSaving(false);
        }
    };

    const getPreview = () => {
        return referralMessage.replace(/\${referralCode}/g, sampleReferralCode);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                            <Share2 className="w-8 h-8 text-orange-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                Referral Manager
                            </h1>
                            <p className="text-gray-400">Customize the message users share when inviting their friends.</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

                            <form onSubmit={handleSave} className="space-y-6 relative z-10">
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                        Referral Message Template
                                    </label>
                                    <textarea
                                        value={referralMessage}
                                        onChange={(e) => setReferralMessage(e.target.value)}
                                        placeholder="Enter message template..."
                                        rows={8}
                                        className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500 transition-all text-white placeholder:text-gray-600 focus:ring-4 focus:ring-orange-500/10 resize-y"
                                    />
                                    <div className="flex items-start gap-2 mt-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                        <p className="text-xs text-blue-400/80">
                                            Use <code className="bg-blue-400/20 px-1.5 py-0.5 rounded text-blue-300 font-mono">${`{referralCode}`}</code> to insert the user&apos;s unique code.
                                        </p>
                                    </div>
                                </div>

                                {message && (
                                    <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
                                        message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                    }`}>
                                        {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                                        <span className="text-sm font-medium">{message.text}</span>
                                    </div>
                                )}

                                <button
                                    disabled={isSaving}
                                    className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-3 group"
                                >
                                    {isSaving ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            Save Referral Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex items-start gap-4">
                            <Info className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-orange-300">Tips for Better Referrals</h4>
                                <ul className="text-sm text-orange-400/70 leading-relaxed mt-1 list-disc list-inside space-y-1">
                                    <li>Keep it personal and inviting.</li>
                                    <li>Mention a clear benefit (e.g., bonus credits).</li>
                                    <li>Include the app download link clearly.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">Live Preview</h3>
                            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Share Preview</span>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {getPreview() || <span className="text-gray-600 italic">No message set...</span>}
                                </div>
                                <div className="pt-4 flex justify-between items-center text-[10px] text-gray-500 uppercase font-bold tracking-wider border-t border-white/5">
                                    <span>Sample User Info</span>
                                    <span>Code: {sampleReferralCode}</span>
                                </div>
                            </div>
                            {updatedAt && (
                                <p className="text-[10px] text-gray-600 mt-6 text-center">
                                    Last Updated: {new Date(updatedAt).toLocaleString()}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
