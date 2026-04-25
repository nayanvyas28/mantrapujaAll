"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [mode, setMode] = useState<'subscribe' | 'unsubscribe'>('subscribe');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'already_subscribed'>('idle');
    const [message, setMessage] = useState("");

    useEffect(() => {
        const isSubscribed = localStorage.getItem('newsletter_subscribed');
        const storedEmail = localStorage.getItem('newsletter_email');
        if (isSubscribed === 'true' && storedEmail && mode === 'subscribe') {
            setStatus('already_subscribed');
            setEmail(storedEmail);
        }
    }, [mode]);

    const handleAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const endpoint = mode === 'subscribe' ? '/api/newsletter' : '/api/newsletter/unsubscribe';

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (res.ok) {
                if (mode === 'subscribe') {
                    setStatus('success');
                    setMessage(data.message || "Welcome to the Family!");
                    localStorage.setItem('newsletter_subscribed', 'true');
                    localStorage.setItem('newsletter_email', email);
                } else {
                    setStatus('success');
                    setMessage("Successfully Unsubscribed");
                    localStorage.removeItem('newsletter_subscribed');
                    localStorage.removeItem('newsletter_email');
                    setTimeout(() => {
                        setMode('subscribe');
                        setStatus('idle');
                        setEmail("");
                    }, 2000);
                }
            } else {
                if (data.message === 'Already subscribed!') {
                    setStatus('already_subscribed');
                    localStorage.setItem('newsletter_subscribed', 'true');
                    localStorage.setItem('newsletter_email', email);
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Something went wrong');
                }
            }
        } catch (err) {
            setStatus('error');
            setMessage("Connection failed");
        }
    };

    if (status === 'success') {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 flex flex-col items-center justify-center gap-2 text-sm font-bold ${mode === 'subscribe' ? 'text-green-600' : 'text-orange-600'}`}
            >
                <CheckCircle2 className="w-6 h-6" />
                {message}
            </motion.div>
        );
    }

    if (status === 'already_subscribed' && mode === 'subscribe') {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="flex items-center gap-2 text-saffron font-bold text-base">
                    <CheckCircle2 className="w-5 h-5" />
                    Devotee Subscribed!
                </div>
                <button 
                    onClick={() => { setMode('unsubscribe'); setStatus('idle'); }}
                    className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest underline decoration-dotted underline-offset-4"
                >
                    Want to Unsubscribe?
                </button>
            </motion.div>
        );
    }

    return (
        <div className="w-full relative">
            <div className="flex items-center justify-between mb-3 px-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {mode === 'subscribe' ? 'Newsletter' : 'Unsubscribe'}
                </span>
                {mode === 'unsubscribe' && (
                    <button 
                        onClick={() => { setMode('subscribe'); setStatus('idle'); }}
                        className="text-[10px] font-black uppercase tracking-widest text-saffron flex items-center gap-1"
                    >
                        <ArrowLeft size={10} /> Back
                    </button>
                )}
            </div>

            <form onSubmit={handleAction} className="w-full relative group/input">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={status === 'loading'}
                    className={`w-full h-14 pl-8 pr-40 rounded-full bg-background border outline-none transition-all shadow-inner text-base text-foreground dark:text-white disabled:opacity-50 ${
                        mode === 'unsubscribe' ? 'border-red-500/30 focus:border-red-500' : 'border-muted focus:border-saffron/50'
                    }`}
                    required
                />
                <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className={`absolute right-1.5 top-1.5 bottom-1.5 uppercase px-10 rounded-full text-white font-bold text-base tracking-wider hover:shadow-lg hover:scale-105 transition-all disabled:grayscale disabled:opacity-50 flex items-center justify-center min-w-[140px] ${
                        mode === 'unsubscribe' ? 'bg-gradient-to-r from-red-600 to-red-800' : 'bg-gradient-to-r from-saffron to-orange-600'
                    }`}
                >
                    {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === 'subscribe' ? 'JOIN' : 'REMOVE'}
                </button>
            </form>
            
            {mode === 'subscribe' && status === 'idle' && (
                <button 
                    onClick={() => setMode('unsubscribe')}
                    className="mt-3 text-[9px] font-bold text-slate-400 hover:text-saffron transition-colors uppercase tracking-widest block mx-auto"
                >
                    Already Subscribed? Unsubscribe
                </button>
            )}

            {status === 'error' && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-red-500"
                >
                    <AlertCircle className="w-4 h-4" />
                    {message}
                </motion.div>
            )}
        </div>
    );
}
