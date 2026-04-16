"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Mail, Lock, AlertCircle, ArrowRight, User, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignupPage() {
    const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            let signupResponse;
            if (authMethod === 'email') {
                signupResponse = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            phone_number: phone
                        }
                    }
                });
            } else {
                // Phone signup logic (Supabase phone auth)
                signupResponse = await supabase.auth.signUp({
                    phone: phone,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            email: email
                        }
                    }
                });
            }

            const { data, error } = signupResponse;

            if (error) {
                setErrorMsg(error.message);
            } else if (data.user) {
                // Create profile in user_profiles table
                const { error: profileError } = await supabase
                    .from('user_profiles')
                    .insert([
                        {
                            id: data.user.id,
                            full_name: fullName,
                            phone_number: phone,
                            marketing_source: 'Signup Page'
                        }
                    ]);

                if (profileError) {
                    console.error("Profile Creation Failed:", {
                        code: profileError.code,
                        message: profileError.message,
                        details: profileError.details,
                        hint: profileError.hint
                    });
                }

                // Successful signup, redirect to onboarding
                router.push('/onboarding');
            }
        } catch (err: any) {
            console.error("Signup Error:", err);
            setErrorMsg('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-10">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_100%,rgba(249,115,22,0.1),transparent_50%)]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg p-4 relative z-10"
            >
                <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl p-8 md:p-10">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
                            <img src="/logo.png" alt="Mantra Puja" className="h-16 mx-auto" />
                        </Link>
                        <h1 className="text-3xl font-black font-serif text-foreground mb-2">Join Our Family</h1>
                        <p className="text-muted-foreground">Start your spiritual journey today</p>
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

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-foreground/80 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-saffron transition-colors" />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {authMethod === 'email' ? (
                                <motion.div
                                    key="email-field"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-foreground/80 ml-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-saffron transition-colors" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all"
                                                placeholder="you@example.com"
                                                required={authMethod === 'email'}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-foreground/80 ml-1">Phone (Optional)</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-saffron transition-colors" />
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all"
                                                placeholder="+91 00000 00000"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="phone-field"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-foreground/80 ml-1">Phone Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-saffron transition-colors" />
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all"
                                                placeholder="+91 00000 00000"
                                                required={authMethod === 'phone'}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-foreground/80 ml-1">Email (Optional)</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-saffron transition-colors" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-foreground/80 ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-saffron transition-colors" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-foreground/80 ml-1">Confirm</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-saffron transition-colors" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-saffron/20 focus:border-saffron outline-none transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                        required
                                    />
                                </div>
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
                                <>Create Account <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>

                        <div className="pt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <Link href="/login" className="text-saffron font-bold hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
