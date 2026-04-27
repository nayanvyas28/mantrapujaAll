
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    User, 
    BookOpen, 
    Star, 
    MessageSquare, 
    Sun, 
    Award, 
    Target, 
    Heart, 
    ArrowRight,
    ArrowLeft,
    Share2,
    Calendar,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import { UnifiedPujaBackground } from "@/components/UnifiedPujaBackground";

export default function AuthorProfileClient({ author }: { author: any }) {
    // Generate placeholder content for sections if not in DB
    // Generate premium fallback content based on role
    const getFallbackContent = () => {
        const role = (author.role || "").toLowerCase();
        if (role.includes('priest') || role.includes('pandit')) {
            return {
                bio: `${author.name} is a distinguished Vedic Priest with over two decades of experience in conducting sacred rituals across India's most prominent temples. Born into a lineage of traditional scholars in Kashi, he mastered the complex nuances of Shukla Yajurveda and Shodasha Upachara at a very young age. His training involved rigorous discipline under the guidance of venerable gurus, ensuring that the ancient oral traditions are preserved with absolute purity.\n\nThroughout his journey, he has guided thousands of families in performing transformative pujas like Mahamrityunjaya, Rudrabhishek, and Navagraha Shanti. His deep understanding of 'Sankalpa' and 'Vaisheshika' ensures that every ritual is not just a ceremony, but a profound spiritual experience aimed at bringing peace, prosperity, and divine protection to the devotee. He is particularly known for his mastery over the 'Swasti Vachan' and his ability to invoke cosmic energies through precise mudras.\n\nBeyond rituals, ${author.name} is a mentor to young aspirants in the field of Karmakand, teaching them that the true essence of a priest lies in selfless service and unwavering devotion. His presence at any ritual brings a sense of divine calm and assurance, as he meticulously follows the steps outlined in the Grihya Sutras while explaining their significance to the participants, making the ancient wisdom accessible to all.`,
                philosophy: "Every mantra is a bridge between the human soul and the divine cosmic energy. When performed with pure intent and precise pronunciation, a ritual can alter the very vibrations of one's destiny.",
                expertise: ["Shukla Yajurveda Mastery", "Complex Karmakand Rituals", "Vastu Shanti Expert", "Advanced Vedic Astrology"]
            };
        } else if (role.includes('scholar') || role.includes('acharya') || role.includes('dr.')) {
            return {
                bio: `${author.name} is a renowned Vedic Scholar and Researcher specializing in the intersections of ancient scriptures and modern psychology. With an academic background in Sanskrit Literature from the University of Varanasi and a deep-seated passion for spiritual evolution, she has dedicated her life to translating esoteric texts into practical wisdom for the 21st century. Her research bridges the gap between ancient metaphysical concepts and modern cognitive science.\n\nHer work focuses on the scientific reasoning behind Vedic traditions, explaining how sound frequencies (Mantras) and geometric patterns (Yantras) affect the human subconscious. She is a frequent speaker at international spiritual summits and has authored several papers on the 'Psychology of Rituals', exploring how symbolic actions can heal deep-seated emotional trauma and provide mental clarity. She believes that the Vedas are not just religious texts, but a manual for optimized human living.\n\nIn her workshops, ${author.name} teaches participants how to apply Vedic principles to their daily routines, from 'Dinacharya' (daily regimen) to 'Swadhyaya' (self-study). Her approach is intellectual yet deeply spiritual, attracting a global audience of professionals, scientists, and spiritual seekers alike. By demystifying the rituals and explaining their underlying logic, she empowers individuals to take charge of their spiritual journey with both faith and reason.`,
                philosophy: "Wisdom is not found in the repetition of the past, but in the realization of eternal truths within the context of our current existence. Knowledge is the ultimate liberation.",
                expertise: ["Sanskrit Scriptural Analysis", "Spiritual Psychology", "Upanishadic Wisdom", "Mantra Frequency Science"]
            };
        } else {
            return {
                bio: `${author.name} is a compassionate Spiritual Guide and Mentor dedicated to helping individuals find their inner sanctuary in an increasingly chaotic world. Drawing from various mystical traditions and years of silent meditation in the Himalayas, they provide a holistic approach to spiritual growth that combines ancient practices with modern mindfulness. Their teaching style is rooted in the 'Advaita' (non-dual) philosophy, emphasizing the inherent divinity within every being.\n\nTheir guidance has helped countless seekers navigate life's challenges, find their true purpose, and cultivate a deeper connection with the Divine. Known for their gentle approach and profound clarity, they emphasize the importance of 'Bhakti' (devotion) and 'Sadhana' (disciplined practice) as the twin pillars of a fulfilled life. They often use parables and stories from the Puranas to illustrate complex spiritual truths, making them relatable to everyone regardless of their background.\n\n${author.name} believes that true spirituality is reflected in how we treat others and ourselves. They advocate for 'Seva' (selfless service) as a means to purify the heart and expand one's consciousness. Through retreats and satsangs, they create a sacred space for transformation, allowing participants to shed their limiting beliefs and experience the boundless joy of the soul. Their mission is to ignite the spark of spiritual inquiry in every heart they touch.`,
                philosophy: "The path to the Divine is not outside, but a journey inward. Once you light the lamp of awareness within, the entire universe reveals its sacred beauty to you.",
                expertise: ["Mindfulness & Meditation", "Bhakti Yoga Guidance", "Inner Child Healing", "Spiritual Life Coaching"]
            };
        }
    };

    const fallback = getFallbackContent();
    // Prioritize biography from DB, then fallback. Use bio only as a last resort if biography and fallback fail
    const biography = author.biography || fallback.bio;
    const philosophy = author.philosophy || fallback.philosophy;
    const expertise = author.expertise 
        ? (typeof author.expertise === 'string' ? author.expertise.split(',').map((s: string) => s.trim()) : author.expertise)
        : fallback.expertise;

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden pb-24">
            <UnifiedPujaBackground />

            {/* Header / Nav */}
            <div className="container mx-auto px-4 pt-8 relative z-50">
                <Link href="/blog" className="inline-flex items-center text-foreground/60 hover:text-saffron transition-all font-bold tracking-widest text-xs uppercase group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Wisdom Hub
                </Link>
            </div>

            {/* Hero Section */}
            <section className="relative pt-12 pb-20 z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] overflow-hidden border-4 border-saffron/20 shadow-[0_32px_64px_-16px_rgba(234,88,12,0.3)] flex-shrink-0 relative group"
                        >
                            <img src={author.avatar} alt={author.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-saffron/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>

                        <div className="flex-1 text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <p className="text-saffron font-black uppercase tracking-[0.4em] text-[10px] mb-3 flex items-center justify-center md:justify-start gap-2">
                                    <Sun className="w-4 h-4" />
                                    Spiritual Contributor
                                </p>
                                <h1 className="text-4xl md:text-7xl font-black font-serif mb-4 leading-tight">
                                    {author.name}
                                </h1>
                                <p className="text-xl md:text-2xl font-bold text-muted-foreground uppercase tracking-widest">
                                    {author.role}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="relative z-10">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        {/* Main Content (Left) */}
                        <div className="lg:col-span-2 space-y-16">
                            {/* Biography */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-card/30 backdrop-blur-xl p-10 md:p-16 rounded-[48px] border border-white/10 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <User size={120} />
                                </div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-saffron/10 border border-saffron/20">
                                        <Award className="w-6 h-6 text-saffron" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black font-serif">Biography</h2>
                                </div>
                                <div className="prose prose-lg dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-foreground/80 font-medium">
                                    {biography.split('\n\n').map((p: string, i: number) => (
                                        <p key={i} className="mb-6">{p}</p>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Philosophy */}
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-saffron/5 to-orange-600/5 p-10 md:p-16 rounded-[48px] border border-saffron/10 relative"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-saffron/10 border border-saffron/20">
                                        <Heart className="w-6 h-6 text-saffron" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black font-serif">Spiritual Philosophy</h2>
                                </div>
                                <blockquote className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed border-l-4 border-saffron pl-8">
                                    "{philosophy}"
                                </blockquote>
                            </motion.div>
                        </div>

                        {/* Sidebar Content (Right) */}
                        <div className="space-y-8">
                            {/* Expertise Card */}
                            <motion.div 
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-card/40 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-2xl"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-xl bg-saffron/10">
                                        <Target className="w-5 h-5 text-saffron" />
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-widest">Expertise</h3>
                                </div>
                                <ul className="space-y-4">
                                    {expertise.map((item: string, i: number) => (
                                        <li key={i} className="flex items-center gap-3 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-saffron group-hover:scale-150 transition-transform shadow-[0_0_8px_rgba(234,88,12,0.8)]" />
                                            <span className="text-base font-bold text-foreground/80 group-hover:text-saffron transition-colors">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Recent Articles */}
                            <motion.div 
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center justify-between px-4">
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-saffron">Recent Wisdom</h3>
                                    <BookOpen className="w-4 h-4 text-saffron/40" />
                                </div>
                                <div className="space-y-4">
                                    {author.blogs && author.blogs.length > 0 ? (
                                        author.blogs.map((blog: any) => (
                                            <Link key={blog.id} href={`/blog/${blog.slug}`} className="block group">
                                                <div className="bg-white/5 border border-white/10 rounded-3xl p-5 hover:bg-saffron/5 hover:border-saffron/30 transition-all">
                                                    <h4 className="font-bold text-sm mb-3 group-hover:text-saffron transition-colors line-clamp-2">
                                                        {blog.title}
                                                    </h4>
                                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {new Date(blog.created_at).toLocaleDateString()}
                                                        </span>
                                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-xs text-muted-foreground italic border border-dashed border-white/10 rounded-3xl">
                                            New articles coming soon...
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
