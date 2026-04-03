/**
 * Detailed Descriptions and Interpretations for Calculator Results
 */

export interface NumerologyPrediction {
    title: string;
    description: string;
    traits: string[];
    career: string;
    love: string;
    challenges: string;
}

export const lifePathPredictions: Record<number, NumerologyPrediction> = {
    1: {
        title: "The Visionary Leader",
        description: "You are a natural born pioneer, driven by ambition and a strong desire for independence.",
        traits: ["Independent", "Ambitious", "Creative", "Strong-willed"],
        career: "You thrive in leadership roles, entrepreneurship, and any field where you can innovate.",
        love: "You seek a partner who respects your independence and matches your drive.",
        challenges: "Learn to manage impatience and avoid being overly self-centered or dominating."
    },
    2: {
        title: "The Harmonious Diplomat",
        description: "Your strength lies in your intuition, empathy, and ability to create balance.",
        traits: ["Cooperative", "Intuitive", "Supportive", "Sensitive"],
        career: "Excellence in mediation, counseling, teaching, or any collaborative environment.",
        love: "You are a devoted and romantic partner who values emotional stability and peace.",
        challenges: "Avoid over-sensitivity and learn to express your own needs clearly."
    },
    3: {
        title: "The Creative Communicator",
        description: "You are blessed with a vibrant imagination and an infectious joy for life.",
        traits: ["Expressive", "Optimistic", "Artistic", "Charming"],
        career: "Arts, entertainment, writing, marketing, or any field involving public expression.",
        love: "You bring fun and spontaneity to relationships, seeking a partner who enjoys social life.",
        challenges: "Work on staying focused and avoiding scattered energy or superficiality."
    },
    4: {
        title: "The Disciplined Architect",
        description: "You are the foundation-builder of society, valuing order, hard work, and loyalty.",
        traits: ["Practical", "Organized", "Loyal", "Methodical"],
        career: "Success in engineering, finance, management, or any field requiring precision.",
        love: "You are a stable and reliable partner who takes commitment very seriously.",
        challenges: "Try to avoid being overly rigid or stubborn, and embrace change when needed."
    },
    5: {
        title: "The Dynamic Adventurer",
        description: "You are a lover of freedom, change, and experiencing life in its full spectrum.",
        traits: ["Versatile", "Adaptable", "Social", "Resilient"],
        career: "Travel, sales, journalism, or any fast-paced, ever-changing environment.",
        love: "You need a partner who shares your love for adventure and won't restrict your freedom.",
        challenges: "Stay disciplined and avoid being restless or over-indulgent in pleasures."
    },
    6: {
        title: "The Compassionate Guardian",
        description: "Your life revolves around service, family, and creating beauty in your surroundings.",
        traits: ["Nurturing", "Responsible", "Idealistic", "Protective"],
        career: "Human services, healthcare, design, teaching, or community leadership.",
        love: "You are an incredibly caring partner who prioritizes harmony at home.",
        challenges: "Watch out for a tendency to be overly critical or trying to control others for 'their own good'."
    },
    7: {
        title: "The Spiritual Scholar",
        description: "You are a seeker of truth, possessing a deep, analytical mind and a spiritual soul.",
        traits: ["Analytical", "Introspective", "Knowledgeable", "Mystical"],
        career: "Scientific research, philosophy, IT, writing, or spiritual consulting.",
        love: "You value solitude but seek a deep, intellectual, and soulful connection with a partner.",
        challenges: "Learn to open up emotionally and avoid becoming too detached or cynical."
    },
    8: {
        title: "The Powerful Manifestor",
        description: "You have the vision and drive to achieve great success and material abundance.",
        traits: ["Authoritative", "Strategic", "Confident", "Efficient"],
        career: "Business, finance, law, or large-scale project management.",
        love: "You are a strong provider but need a partner who can stand their ground and share your vision.",
        challenges: "Balance your material drive with spiritual values and avoid over-working."
    },
    9: {
        title: "The Global Humanitarian",
        description: "Your path is one of selfless service, compassion, and spiritual enlightenment.",
        traits: ["Selfless", "Tolerant", "Gifted", "Charitable"],
        career: "Non-profit work, politics, law, environmental causes, or the healing arts.",
        love: "You have a big heart and need a partner who shares your philanthropic ideals.",
        challenges: "Learn to let go of the past and avoid taking on more emotional burden than you can carry."
    },
    11: {
        title: "The Inspired Illumina",
        description: "As a master number, you possess heightened intuition and spiritual potential.",
        traits: ["Intuitive", "Inspiring", "Enlightened", "Empathetic"],
        career: "Spiritual teaching, psychology, art, or any role as a visionary guide.",
        love: "You seek a spiritual union and a partner who can handle your intense energy.",
        challenges: "Manage nervous energy and avoid becoming overly idealistic or detached."
    },
    22: {
        title: "The Master Architect",
        description: "You have the unique ability to turn grand visions into tangible, world-changing realities.",
        traits: ["Visionary", "Pragmatic", "Capable", "Masterful"],
        career: "Large-scale construction, international business, or influential leadership roles.",
        love: "You need a supportive partner who understands your grand mission in life.",
        challenges: "Avoid feeling overwhelmed by your own potential and stay grounded in reality."
    },
    33: {
        title: "The Divine Teacher",
        description: "Your energy is pure compassion, dedicated to the spiritual awakening of others.",
        traits: ["Compassionate", "Devoted", "Wise", "Saintly"],
        career: "Spiritual leadership, profound healing, or influential teaching.",
        love: "A deeply spiritual and sacrificial partner who loves unconditionally.",
        challenges: "Protect your energy from being drained and avoid being too self-sacrificing."
    }
};

export interface ZodiacPrediction {
    title: string;
    description: string;
    career: string;
    love: string;
    wellness: string;
}

export const zodiacPredictions: Record<string, ZodiacPrediction> = {
    "Aries": {
        title: "The Courageous Pioneer",
        description: "Bold, energetic, and courageous. You are a natural leader who loves challenges.",
        career: "Natural leadership makes you a powerhouse in management, entrepreneurship, or competitive fields.",
        love: "You bring passion and directness to romance, seeking a partner who can match your intensity.",
        wellness: "Focus on cooling activities and head-body balance to manage your high fire energy."
    },
    "Taurus": {
        title: "The Steady Provider",
        description: "Reliable, patient, and practical. You value security, beauty, and the finer things in life.",
        career: "Thrives in finance, real estate, arts, or any field requiring long-term stability and taste.",
        love: "A deeply loyal and sensual partner who values long-term commitment and physical comfort.",
        wellness: "Grounding activities like gardening or nature walks help maintain your natural equilibrium."
    },
    "Gemini": {
        title: "The Versatile Socialite",
        description: "Adaptable, curious, and communicative. You are quick-witted and love learning new things.",
        career: "Excels in communications, media, sales, and any fast-paced intellectual environment.",
        love: "Needs intellectual stimulation and variety; you seek a companion who can keep up with your wit.",
        wellness: "Mindfulness and breathing exercises are key to calming your active, sometimes anxious, mind."
    },
    "Cancer": {
        title: "The Intuitive Nurturer",
        description: "Nurturing, intuitive, and protective. You are deeply connected to home and family.",
        career: "Success in caregiving, hospitality, history, or roles requiring high emotional intelligence.",
        love: "Deeply sensitive and protective; you seek a 'safe harbor' and a soulful emotional connection.",
        wellness: "Emotional catharsis and staying near water are vital for your psychological well-being."
    },
    "Leo": {
        title: "The Radiant Sovereign",
        description: "Confident, charismatic, and generous. You love to shine and inspire those around you.",
        career: "Performing arts, leadership roles, and any position where you can entertain or inspire others.",
        love: "A grand, warm-hearted lover who seeks adoration and a partner who shares the spotlight.",
        wellness: "Cardiovascular health and maintaining a positive 'heart-centered' outlook are essential."
    },
    "Virgo": {
        title: "The Analytical Healer",
        description: "Detail-oriented, practical, and hardworking. You seek perfection and love to be helpful.",
        career: "Excellence in data analysis, healthcare, editing, and roles requiring meticulous precision.",
        love: "Shows love through acts of service; you seek a practical, reliable partner who values growth.",
        wellness: "Digestive health and a structured daily routine are the pillars of your vitality."
    },
    "Libra": {
        title: "The Harmonious Diplomat",
        description: "Diplomatic, fair, and social. You value harmony, balance, and beautiful partnerships.",
        career: "Law, diplomacy, design, and any field where mediation and aesthetics are key.",
        love: "Values partnership above all; you seek a balanced, refined, and socially graceful companion.",
        wellness: "Maintaining balance in all things—work, play, and diet—is your secret to health."
    },
    "Scorpio": {
        title: "The Intense Transformer",
        description: "Intense, passionate, and mysterious. You have a deep emotional strength and powerful intuition.",
        career: "Research, psychology, crisis management, and roles requiring deep investigative work.",
        love: "Seeks profound soul-depth; your love is all-or-nothing, requiring absolute trust and intimacy.",
        wellness: "Metabolic health and activities that allow for deep emotional release are crucial."
    },
    "Sagittarius": {
        title: "The Philosophical Explorer",
        description: "Optimistic, adventurous, and philosophical. You love freedom and exploring new horizons.",
        career: "Education, travel, law, and any field that offers variety and broad perspectives.",
        love: "A fun-loving and freedom-seeking partner who wants a fellow traveler on life's journey.",
        wellness: "Physical activity that feels like an adventure is necessary for your high spirit."
    },
    "Capricorn": {
        title: "The Ambitious Builder",
        description: "Disciplined, ambitious, and responsible. You are focused on long-term goals and success.",
        career: "Corporate leadership, government, architecture, and any field requiring long-term strategy.",
        love: "A serious and committed partner who seeks to build a lasting legacy with a companion.",
        wellness: "Bone and joint health require attention; discipline in skeletal care is vital."
    },
    "Aquarius": {
        title: "The Visionary Reformer",
        description: "Innovative, independent, and humanitarian. You value original thinking and social progress.",
        career: "Technology, social activism, science, and any role that involves the future or community.",
        love: "Seeks a 'best friend' connection first; you value independence and unconventional bonds.",
        wellness: "Circulatory health and social interaction that stimulates your mind are important."
    },
    "Pisces": {
        title: "The Dreamy Mystic",
        description: "Compassionate, imaginative, and spiritual. You are deeply intuitive and have a rich inner world.",
        career: "Creative arts, counseling, spirituality, and roles requiring deep empathy and vision.",
        love: "Romantic and soulful; you seek a dream-like connection and an empathic soulmate.",
        wellness: "Foot health and psychic protection exercises are essential to your delicate energy."
    }
};

export const doshaPredictions: Record<string, any> = {
    "mangal-dosha": {
        present: {
            career: "Use your intense Martian energy in competitive fields or physical activities to avoid internal friction.",
            love: "Cultivate patience and communication. Awareness of your intensity can turn it into a source of passion.",
            remedy: "Consider chanting the Hanuman Chalisa or performing selfless service on Tuesdays."
        },
        absent: {
            career: "Your balanced energy allows for steady progress in collaborative environments.",
            love: "You possess a natural harmony in partnerships, allowing for smooth emotional bonding.",
            remedy: "Maintain your inner balance through regular meditation and gratitude."
        }
    },
    "sade-sati": {
        "Phase 1": {
            career: "A time for careful planning and building foundations. Don't rush into major new ventures.",
            love: "Focus on building trust and taking responsibility within your relationships.",
            wellness: "Prioritize consistent sleep and a grounding diet to manage rising stress."
        },
        "Phase 2": {
            career: "The 'Peak' requires maximum discipline. Stay ethical and diligent; rewards come through persistence.",
            love: "Old patterns may be tested. Honesty and spiritual maturity will strengthen your bond.",
            wellness: "Spiritual practice (Sadhana) is your greatest support during this intense time."
        },
        "Phase 3": {
            career: "Pressure begins to lift. You are now being rewarded for the hard work of previous phases.",
            love: "Relationships become wiser and more stable after the trials of the peak phase.",
            wellness: "Gradually re-engage with more active pursuits as your energy returns."
        }
    }
};

export const flamesDescriptions: Record<string, string> = {
    "Friends": "Your bond is built on trust, laughter, and mutual understanding. You are each other's backbone.",
    "Lovers": "There's a deep, passionate spark between you. A romantic journey full of chemistry awaits.",
    "Affection": "You share a warm, caring, and gentle connection that feels safe and comfortable.",
    "Marriage": "A soulmate connection that points towards a lifelong commitment and deep partnership.",
    "Enemies": "There's intense friction and misunderstanding. It might be a karmic challenge to overcome.",
    "Siblings": "A deep, protective, and playful bond, much like family. You understand each other without words."
};

export const compatibilityInterpretations = (score: number): string => {
    if (score >= 90) return "Exceptional Match! You are perfectly in sync and share a rare soul connection.";
    if (score >= 80) return "Very High Compatibility. You have a strong foundation for a beautiful and lasting relationship.";
    if (score >= 70) return "Good Vibe. You share many common interests and values, with a solid potential for growth.";
    if (score >= 60) return "Potential Match. There's an initial spark, but you'll need patience and effort to grow together.";
    return "Challenging Connection. You may have different perspectives, which can lead to unique growth opportunities.";
};

export const getCalculatorDescription = (type: string, value: any): string => {
    if (typeof value === 'object' && value !== null && value.description) return value.description;

    switch (type) {
        case 'life-path': return lifePathPredictions[value]?.description || "Your life path number holds the key to your destiny and purpose.";
        case 'numerology': return lifePathPredictions[value]?.description || "Your numbers hold vibrations that shape your destiny.";
        case 'sun-sign': 
        case 'moon-sign': return zodiacPredictions[value]?.description || "Your zodiac sign represents a core part of your astrological blueprint.";
        case 'flames': return flamesDescriptions[value] || "The flames result reveals the underlying nature of your connection.";
        case 'compatibility': return compatibilityInterpretations(value);
        case 'mangal-dosha': 
            if (value === "Present (Anshik)") return "You have a mild Manglik Dosha. This can bring intensity to relationships, but with awareness and simple remedies, it can be harmonized.";
            if (value === "Not Present") return "No Manglik Dosha found. Your Martian energy is well-balanced for partnership.";
            return "Mangal Dosha affects compatibility and marital harmony.";
        case 'sade-sati':
            if (typeof value === 'string') {
                if (value.includes("Phase 1")) return "You are in the rising phase of Sade Sati. It's a time for discipline, hard work, and building inner strength.";
                if (value.includes("Phase 2")) return "You are in the peak phase (Dhaiya). This is the most intense period, requiring patience, spiritual practice, and careful decision-making.";
                if (value.includes("Phase 3")) return "You are in the setting phase. Challenges are beginning to ease, and you are reaping the wisdom of your journey.";
            }
            return "Sade Sati is a period of transformation and karmic balancing.";
        default: return "The stars have spoken. Here is your personalized cosmic insight.";
    }
};
