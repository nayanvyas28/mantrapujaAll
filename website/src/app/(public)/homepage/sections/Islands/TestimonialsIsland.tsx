"use client";
import { Star, Quote } from "lucide-react";

export default function TestimonialsIsland() {
    const reviews = [
        { name: "Rahul Sharma", text: "The Ganpati Puja was performed with such devotion. I felt the positive energy immediately in my home.", rating: 5, city: "Mumbai" },
        { name: "Priya Patel", text: "Authentic Vedic experience. The Pandit explained every ritual beautifully. Highly recommended!", rating: 5, city: "London" },
        { name: "Anil Kumar", text: "Seamless booking process and very professional service. The live stream was crystal clear.", rating: 5, city: "Delhi" }
    ];

    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-950/50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                        What Our <span className="text-saffron">Devotees Say</span>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {reviews.map((rev, i) => (
                        <div key={i} className="max-w-md bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-white/5 relative">
                            <Quote className="absolute top-4 right-4 w-12 h-12 text-saffron/10" />
                            <div className="flex gap-1 mb-4">
                                {[...Array(rev.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-saffron text-saffron" />)}
                            </div>
                            <p className="text-lg text-muted-foreground italic mb-6">"{rev.text}"</p>
                            <div>
                                <h4 className="font-bold text-foreground">{rev.name}</h4>
                                <p className="text-sm text-zinc-500">{rev.city}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
