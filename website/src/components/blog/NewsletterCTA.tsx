"use client";

import { Sun, Star } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterCTA() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        
        // Simulating API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 mt-24">
            <div className="p-12 md:p-20 rounded-[60px] bg-gradient-to-br from-saffron/30 via-orange-600/20 to-gold/20 border border-saffron/30 relative overflow-hidden text-center group shadow-[0_0_50px_rgba(249,115,22,0.1)]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Star className="w-40 h-40 text-gold" />
                </div>
                <div className="absolute -bottom-10 -left-10 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <Sun className="w-32 h-32 text-saffron" />
                </div>

                <Sun className="w-12 h-12 text-saffron mx-auto mb-8 animate-pulse shadow-saffron/50" />
                <h3 className="text-3xl md:text-5xl font-serif font-black mb-6 text-white tracking-tight">Receive Divine Guidance</h3>
                <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
                    Join our spiritual community and receive weekly insights, ritual guides, and celestial updates directly in your inbox.
                </p>
                
                {status === 'success' ? (
                    <div className="bg-saffron/20 border border-saffron/30 rounded-3xl p-8 text-saffron font-black text-xl animate-in fade-in zoom-in duration-500 backdrop-blur-md">
                        🙏 Welcome to the Spiritual Family! 🙏
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto relative z-10">
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address" 
                            className="flex-1 bg-white/5 border border-white/20 rounded-2xl px-8 py-5 outline-none focus:border-saffron focus:bg-white/10 transition-all text-white placeholder:text-white/30 backdrop-blur-md"
                        />
                        <button 
                            disabled={status === 'loading'}
                            className="bg-saffron hover:bg-gold text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_30px_rgba(249,115,22,0.4)] hover:-translate-y-1 disabled:opacity-50 active:scale-95"
                        >
                            {status === 'loading' ? 'Joining...' : 'Subscribe Now'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
