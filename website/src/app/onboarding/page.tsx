"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { ChevronRight, Check, Sun, MapPin, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();

    // Form states
    const [source, setSource] = useState('');
    const [situation, setSituation] = useState('');
    const [goals, setGoals] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
            } else {
                router.push('/login');
            }
        };
        getUser();
    }, [router]);

    const handleSubmit = async () => {
        if (!userId) return;
        setLoading(true);

        try {
            // 1. Insert into user_onboarding
            const { error: onboardingError } = await supabase.from('user_onboarding').insert({
                user_id: userId,
                source,
                current_situation: situation,
                goals
            });

            if (onboardingError) throw onboardingError;

            // 2. Update user_profiles flag
            const { error: profileError } = await supabase
                .from('user_profiles')
                .update({ onboarding_completed: true, marketing_source: source })
                .eq('id', userId);

            if (profileError) throw profileError;

            router.push('/');
        } catch (error) {
            console.error("Onboarding Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(s => s + 1);

    if (!userId) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-10 h-10 border-4 border-saffron border-t-transparent rounded-full animate-spin"></div></div>;

    const progressWidth = ((step) / 3) * 100;

    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px] opacity-60" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] opacity-60" />
            </div>

            {/* Header / Progress */}
            <div className="relative z-10 pt-8 pb-4 px-6 border-b border-border/40 backdrop-blur-md bg-background/50 sticky top-0">
                <div className="max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <img src="/logo.png" alt="Mantra Puja" className="h-10" />
                        <span className="text-sm font-bold text-muted-foreground">Step {step} of 3</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-saffron to-orange-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressWidth}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-grow flex items-center justify-center p-4 relative z-10">
                <div className="w-full max-w-2xl">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Source */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/90 dark:bg-card/90 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5"
                            >
                                <div className="mb-8">
                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 mb-6">
                                        <Sun className="w-6 h-6" />
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black font-serif mb-4 leading-tight">How did you find us?</h2>
                                    <p className="text-lg text-muted-foreground">We'd love to know the beginning of this connection.</p>
                                </div>

                                <div className="space-y-3 mb-10">
                                    {['Google Search', 'Social Media (Instagram/Facebook)', 'Friend/Family Recommendation', 'YouTube', 'Advertisements'].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => setSource(option)}
                                            className={`w-full p-4 md:p-5 text-left rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${source === option
                                                ? 'border-saffron bg-saffron/5 shadow-md'
                                                : 'border-border/60 hover:border-saffron/40 hover:bg-muted/50'}`}
                                        >
                                            <span className={`font-semibold text-lg ${source === option ? 'text-saffron' : 'text-foreground/80'}`}>{option}</span>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${source === option ? 'border-saffron bg-saffron text-white' : 'border-muted-foreground/30 group-hover:border-saffron/40'}`}>
                                                {source === option && <Check className="w-3.5 h-3.5" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={nextStep}
                                        disabled={!source}
                                        className="h-14 px-10 bg-gradient-to-r from-saffron to-orange-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
                                    >
                                        Continue <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Situation */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/90 dark:bg-card/90 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5"
                            >
                                <div className="mb-8">
                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-6">
                                        <Heart className="w-6 h-6" />
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black font-serif mb-4 leading-tight">What brings you here?</h2>
                                    <p className="text-lg text-muted-foreground">Share a bit about your current situation or state of mind.</p>
                                </div>

                                <div className="mb-10">
                                    <textarea
                                        value={situation}
                                        onChange={(e) => setSituation(e.target.value)}
                                        className="w-full h-40 p-6 rounded-2xl border-2 border-border/60 focus:border-saffron focus:ring-4 focus:ring-saffron/10 bg-background/50 resize-none transition-all text-lg leading-relaxed placeholder:text-muted-foreground/50"
                                        placeholder="I am looking for peace and clarity in my life..."
                                    />
                                    <div className="mt-4 flex justify-end">
                                        <span className={`text-sm ${situation.length > 20 ? 'text-green-600' : 'text-muted-foreground'}`}>
                                            {situation.length > 0 ? 'Thanks for sharing!' : 'Please describe briefly'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={nextStep}
                                        disabled={!situation.trim()}
                                        className="h-14 px-10 bg-gradient-to-r from-saffron to-orange-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
                                    >
                                        Next Step <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Goals */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/90 dark:bg-card/90 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5"
                            >
                                <div className="mb-8">
                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 mb-6">
                                        <MapPin className="w-6 h-6" />
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-black font-serif mb-4 leading-tight">Your Aspiration?</h2>
                                    <p className="text-lg text-muted-foreground">What do you hope to achieve with Mantra Puja?</p>
                                </div>

                                <div className="space-y-3 mb-10">
                                    {[
                                        { label: 'Book a specific Puja Ritual', desc: 'Perform a sacred ceremony' },
                                        { label: 'Seek Spiritual Guidance', desc: 'Connect with expert Pandits' },
                                        { label: 'Learn Vedic Knowledge', desc: 'Understand ancient wisdom' },
                                        { label: 'Explore & Discover', desc: 'Just looking around for now' }
                                    ].map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={() => setGoals(item.label)}
                                            className={`w-full p-5 text-left rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${goals === item.label
                                                ? 'border-saffron bg-saffron/5 shadow-md'
                                                : 'border-border/60 hover:border-saffron/40 hover:bg-muted/50'}`}
                                        >
                                            <div>
                                                <span className={`block font-bold text-lg mb-1 ${goals === item.label ? 'text-saffron' : 'text-foreground/90'}`}>{item.label}</span>
                                                <span className="text-sm text-muted-foreground">{item.desc}</span>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${goals === item.label ? 'border-saffron bg-saffron text-white' : 'border-muted-foreground/30 group-hover:border-saffron/40'}`}>
                                                {goals === item.label && <Check className="w-3.5 h-3.5" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!goals || loading}
                                        className="h-14 px-10 bg-gradient-to-r from-saffron to-orange-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-orange-500/20 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Start My Journey'
                                        )}
                                        {!loading && <ChevronRight className="w-5 h-5" />}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Simple Footer */}
            <div className="py-6 text-center text-sm text-muted-foreground relative z-10">
                <p>&copy; {new Date().getFullYear()} Mantra Puja. All blessings reserved.</p>
            </div>
        </div>
    );
}
