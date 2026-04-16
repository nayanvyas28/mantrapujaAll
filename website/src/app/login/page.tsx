"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Phone, AlertCircle, ArrowRight, MessageSquare, ShieldCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const router = useRouter();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        try {
            const res = await fetch('/api/auth/otp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.error || 'Failed to send OTP');
            } else {
                // Browser-side dispatch to BhashSMS (to bypass server network limits)
                if (data.otp && data.bhashConfig) {
                    const { user, pass, sender, template } = data.bhashConfig;
                    const bhashUrl = `http://bhashsms.com/api/sendmsg.php?user=${user}&pass=${pass}&sender=${sender}&phone=${data.phone}&text=${template}&priority=wa&stype=normal&Params=${data.otp},OTP`;
                    
                    // Call the API (using no-cors as these legacy APIs rarely have CORS headers)
                    fetch(bhashUrl, { mode: 'no-cors' }).catch(e => console.error("BhashSMS Browser Error:", e));
                }
                setStep('otp');
            }
        } catch (err: any) {
            console.error("OTP Send Error:", err);
            setErrorMsg('Failed to send OTP. Please check the number and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        try {
            // 1. Verify via local API
            const verifyRes = await fetch('/api/auth/otp/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, otp }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
                setErrorMsg(verifyData.error || 'Invalid OTP');
                setLoading(false);
                return;
            }

            // 2. Final Sign In via Auth Handshake
            // We use the EXACT phone format the server found in Supabase Auth
            const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
                phone: verifyData.finalAuthPhone,
                password: verifyData.bridgePassword,
            });

            if (authError) {
                setErrorMsg(authError.message);
                setLoading(false);
            } else if (user) {
                router.push('/');
            }
        } catch (err: any) {
            console.error("OTP Verify Error:", err);
            setErrorMsg('Invalid or expired OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-10 px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/90 dark:bg-card/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[3rem] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.1)] p-10 md:p-12 overflow-hidden relative">
                    {/* Progress Indicator */}
                    <div className="absolute top-0 left-0 right-0 h-2 flex">
                        <div className={`flex-1 transition-all duration-500 ${step === 'phone' || step === 'otp' ? 'bg-saffron' : 'bg-transparent'}`} />
                        <div className={`flex-1 transition-all duration-500 ${step === 'otp' ? 'bg-orange-600' : 'bg-zinc-100 dark:bg-white/10'}`} />
                    </div>

                    <div className="text-center mb-10">
                        <Link href="/" className="inline-block mb-8 hover:opacity-80 transition-opacity">
                            <img src="/logo.png" alt="Mantra Puja" className="h-20 mx-auto drop-shadow-xl" />
                        </Link>
                        <h1 className="text-4xl font-black font-serif text-foreground mb-3 tracking-tight">
                            {step === 'phone' ? 'Join Us' : 'Verify Identity'}
                        </h1>
                        <p className="text-muted-foreground font-medium text-lg leading-snug">
                            {step === 'phone' 
                                ? 'Enter your mobile to begin your spiritual journey' 
                                : `Enter the code sent to ${phone}`}
                        </p>
                    </div>

                    {errorMsg && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-8 p-5 bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-4 text-red-600 dark:text-red-400"
                        >
                            <AlertCircle className="w-6 h-6 flex-shrink-0" />
                            <span className="text-sm font-bold tracking-wide leading-tight">{errorMsg}</span>
                        </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                        {step === 'phone' ? (
                            <motion.form
                                key="phone-step"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleSendOtp}
                                className="space-y-6"
                            >
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/50 ml-2">Mobile Number</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-2 border-r border-zinc-200 dark:border-white/10">
                                            <Phone className="w-5 h-5 text-saffron" />
                                        </div>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full pl-16 pr-5 py-5 bg-zinc-50 dark:bg-white/5 border-2 border-zinc-100 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-saffron/10 focus:border-saffron outline-none transition-all text-xl font-bold tracking-widest placeholder:text-zinc-400"
                                            placeholder="98765 43210"
                                            required
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground text-center font-bold uppercase tracking-widest mt-2">
                                        WE'LL SEND A SECURE OTP VIA WHATSAPP
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 bg-gradient-to-r from-saffron to-orange-600 text-white font-black uppercase tracking-[0.25em] text-sm rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
                                >
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>Continue <ArrowRight className="w-5 h-5" /></>
                                    )}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="otp-step"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleVerifyOtp}
                                className="space-y-6"
                            >
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/50 ml-2">6-Digit OTP</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-2 border-r border-zinc-200 dark:border-white/10">
                                            <ShieldCheck className="w-5 h-5 text-saffron" />
                                        </div>
                                        <input
                                            type="text"
                                            maxLength={6}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                            className="w-full pl-16 pr-5 py-5 bg-zinc-50 dark:bg-white/5 border-2 border-zinc-100 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-saffron/10 focus:border-saffron outline-none transition-all text-3xl font-black tracking-[0.4em] placeholder:text-zinc-300"
                                            placeholder="000000"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between items-center px-2">
                                        <button 
                                            type="button"
                                            onClick={() => setStep('phone')}
                                            className="text-[10px] font-black uppercase tracking-widest text-saffron hover:underline"
                                        >
                                            Change Number
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={handleSendOtp}
                                            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Resend OTP
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || otp.length < 6}
                                    className="w-full py-5 bg-gradient-to-r from-saffron to-orange-600 text-white font-black uppercase tracking-[0.25em] text-sm rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex justify-center items-center gap-3"
                                >
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>Verify & Login <ShieldCheck className="w-5 h-5" /></>
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    <div className="pt-10 text-center relative z-10">
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                            Secure Login by Supabase Auth
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
