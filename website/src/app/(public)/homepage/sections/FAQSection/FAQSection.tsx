import FAQIsland from "../Islands/FAQIsland";

export default function FAQSection() {
    const faqs = [
        {
            q: "How do I book a Puja on Mantra Puja?",
            a: "Booking is simple. Browse our categories, select your desired ritual, choose a package, and provide your Sankalp details. Our team will contact you to finalize the date and time."
        },
        {
            q: "Are the Pandits verified and qualified?",
            a: "Yes, 100%. We only work with certified Acharyas and Pandits from renowned Vedic institutions. Every Pandit undergoes a strict background check and ritual proficiency test."
        },
        {
            q: "Can I witness the Puja live if I'm not physically present?",
            a: "Absolutely. We offer live streaming services for most our rituals via Zoom, Google Meet, or WhatsApp Video. You will also receive a recording of the important Sankalp and Havan moments."
        },
        {
            q: "What is a 'Sankalp' and why is it important?",
            a: "Sankalp is a sacred vow where the Pandit mentions your name, Gotra, and purpose of the ritual. It establishes your spiritual connection to the Puja, ensuring the divine benefits reach you directly."
        }
    ];

    return (
        <section className="py-24 md:py-36 bg-zinc-50/50 dark:bg-black/40 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-saffron/40"></div>
                        <span className="text-saffron-dark font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">Clarifications</span>
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-saffron/40"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        Frequently Asked <span className="text-saffron">Questions</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-light leading-relaxed">
                        Answers to the most common queries about our sacred traditions, booking process, and ritual transparency.
                    </p>
                </div>

                <FAQIsland faqs={faqs} />
            </div>
        </section>
    );
}
