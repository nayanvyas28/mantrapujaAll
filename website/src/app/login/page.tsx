"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Mail, Lock, AlertCircle, ArrowRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
    const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        try {
            let loginResponse;
            if (authMethod === 'email') {
                loginResponse = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
            } else {
                loginResponse = await supabase.auth.signInWithPassword({
                    phone: phone,
                    password,
                });
            }

            const { error, data: { user } } = loginResponse;

            if (error) {
                setErrorMsg(error.message);
            } else if (user) {
                // Check onboarding status
                const { data: profile } = await supabase
                    .from('user_profiles')
                    .select('onboarding_completed')
                    .eq('id', user.id)
                    .single();

                if (profile && !profile.onboarding_completed) {
                    router.push('/onboarding');
                } else {
                    router.push('/');
                }
            }
        } catch (err: any) {
            console.error("Login Error:", err);
            setErrorMsg('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-10">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.15),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-4 relative z-10 mx-4"
            >
                <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl p-8 md:p-10">
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
                            <img src="/logo.png" alt="Mantra Puja" className="h-16 mx-auto" />
                        </Link>
                        <h1 className="text-3xl font-black font-serif text-foreground mb-2">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to continue your spiritual journey</p>
                    </div>

                    {/* Auth Method Toggle */}
                    <div className="flex bg-muted/50 p-1 rounded-xl mb-8 border border-border">
                        <button
                            onClick={() => setAuthMethod('email')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${authMethod === 'email' ? 'bg-white dark:bg-slate-800 shadow-sm text-saffron' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <Mail className="w-4 h-4" /> Email
                        </button>
                        <button
                            onClick={() => setAuthMethod('phone')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${authMethod === 'phone' ? 'bg-white dark:bg-slate-800 shadow-sm text-saffron' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <Phone className="w-4 h-4" /> Phone
                        </button>
                    </div>

                    {errorMsg && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-medium">{errorMsg}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <AnimatePresence mode="wait">
                            {authMethod === 'email' ? (
                                <motion.div
                                    key="email-login"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="space-y-2"
                                >
                                    <label className="text-sm font-bold text-foreground/80 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-saffron transition-colors" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all"
                                            placeholder="you@example.com"
                                            required={authMethod === 'email'}
                                        />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="phone-login"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="space-y-2"
                                >
                                    <label className="text-sm font-bold text-foreground/80 ml-1">Phone Number</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-saffron transition-colors" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all"
                                            placeholder="+91 00000 00000"
                                            required={authMethod === 'phone'}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-foreground/80">Password</label>
                                <a href="#" className="text-xs font-semibold text-saffron hover:text-saffron-dark transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-saffron transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-saffron to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-4"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>

                        <div className="pt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link href="/signup" className="text-saffron font-bold hover:underline">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
