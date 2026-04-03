
export interface UiConfig {
    id: string; // Sanity check to match DB ID if possible, but slug is safer
    slug: string;
    gradient: string;
    badge?: string;
    emoji?: string;
    featured?: boolean;
}

export const PUJA_UI_CONFIG: Record<string, UiConfig> = {
    'satyanarayan-pooja': {
        id: '1',
        slug: 'satyanarayan-pooja',
        gradient: 'from-orange-500 to-red-500',
        badge: 'Most Popular',
        emoji: '🕉️',
        featured: true
    },
    'kaal-sarp-dosh-puja': {
        id: '2',
        slug: 'kaal-sarp-dosh-puja',
        gradient: 'from-indigo-500 to-purple-600',
        badge: 'Powerful',
        emoji: '🐍',
        featured: true
    },
    'ganesh-pooja': {
        id: '3',
        slug: 'ganesh-pooja',
        gradient: 'from-amber-400 to-orange-500',
        badge: 'Success',
        emoji: '🐘',
        featured: true
    },
    'rudra-abhishek': {
        id: '4',
        slug: 'rudra-abhishek',
        gradient: 'from-blue-500 to-indigo-600',
        badge: 'Sacred',
        emoji: '🔱',
        featured: true
    },
    'mahamrityunjaya-jaap': {
        id: '5',
        slug: 'mahamrityunjaya-jaap',
        gradient: 'from-purple-500 to-indigo-500',
        badge: 'Healing',
        emoji: '🕉️',
        featured: true
    },
    'navagraha-shanti': {
        id: '6',
        slug: 'navagraha-shanti',
        gradient: 'from-slate-600 to-slate-900',
        badge: 'Destiny',
        emoji: '🪐',
        featured: false
    },
    'griha-pravesh': {
        id: '7',
        slug: 'griha-pravesh',
        gradient: 'from-emerald-500 to-teal-600',
        badge: 'New Home',
        emoji: '🏠',
        featured: false
    },
    'lakshmi-puja': {
        id: '8',
        slug: 'lakshmi-puja',
        gradient: 'from-pink-500 to-rose-500',
        emoji: '🪷',
        featured: false
    },
    'durga-puja': {
        id: '9',
        slug: 'durga-puja',
        gradient: 'from-red-600 to-rose-700',
        badge: 'Power',
        emoji: '🦁',
        featured: false
    },
    'saraswati-puja': {
        id: '10',
        slug: 'saraswati-puja',
        gradient: 'from-yellow-400 to-amber-500',
        badge: 'Wisdom',
        emoji: '📚',
        featured: false
    },
    'mangal-dosh': {
        id: '11',
        slug: 'mangal-dosh',
        gradient: 'from-red-500 to-red-800',
        badge: 'Marriage',
        emoji: '🔥',
        featured: false
    },
    'pitra-dosh': {
        id: '12',
        slug: 'pitra-dosh',
        gradient: 'from-stone-500 to-stone-700',
        badge: 'Ancestors',
        emoji: '🌳',
        featured: false
    },
    'ketu-shanti': {
        id: '13',
        slug: 'ketu-shanti',
        gradient: 'from-gray-500 to-gray-700',
        badge: 'Clarity',
        emoji: '🌫️',
        featured: false
    },
    'chandi-homam': {
        id: '14',
        slug: 'chandi-homam',
        gradient: 'from-orange-600 to-red-600',
        badge: 'Very Powerful',
        emoji: '🔥',
        featured: true
    },
    'sudarshana-homam': {
        id: '15',
        slug: 'sudarshana-homam',
        gradient: 'from-yellow-500 to-orange-500',
        badge: 'Protection',
        emoji: '☸️',
        featured: false
    },
    'annaprashan': {
        id: '16',
        slug: 'annaprashan',
        gradient: 'from-pink-400 to-rose-400',
        badge: 'Kids',
        emoji: '👶',
        featured: false
    },
    'namakaranam': {
        id: '17',
        slug: 'namakaranam',
        gradient: 'from-blue-400 to-indigo-400',
        badge: 'Kids',
        emoji: '✒️',
        featured: false
    },
    'upanayana': {
        id: '18',
        slug: 'upanayana',
        gradient: 'from-amber-500 to-yellow-600',
        badge: 'Tradition',
        emoji: '🧵',
        featured: false
    },
    'vastu-shanti': {
        id: '19',
        slug: 'vastu-shanti',
        gradient: 'from-green-500 to-emerald-600',
        badge: 'Harmony',
        emoji: '📐',
        featured: false
    },
    'office-opening': {
        id: '20',
        slug: 'office-opening',
        gradient: 'from-blue-600 to-indigo-700',
        badge: 'Business',
        emoji: '🏢',
        featured: false
    },
    'bhai-dooj-puja': {
        id: '21',
        slug: 'bhai-dooj-puja',
        gradient: 'from-orange-400 to-red-500',
        badge: 'Brotherhood',
        emoji: '👦',
        featured: true
    },
    'diwali-lakshmi-puja': {
        id: '22',
        slug: 'diwali-lakshmi-puja',
        gradient: 'from-orange-500 via-gold to-yellow-500',
        badge: 'Festive',
        emoji: '🪔',
        featured: true
    }
};

export const getUiConfig = (slug: string): UiConfig => {
    if (!slug) return {
        id: 'default',
        slug: 'default',
        gradient: 'from-orange-500 to-red-500',
        emoji: '✨',
        featured: false
    };

    const normalizedSlug = slug.toLowerCase();

    // Try exact match first
    if (PUJA_UI_CONFIG[normalizedSlug]) return PUJA_UI_CONFIG[normalizedSlug];

    // Try finding by slug value in case keys are different (though they shouldn't be)
    const found = Object.values(PUJA_UI_CONFIG).find(config => config.slug.toLowerCase() === normalizedSlug);
    if (found) return found;

    // Fallback with some variety based on slug length or hash to avoid everyone being orange
    const fallbacks = [
        'from-orange-500 to-red-500',
        'from-blue-500 to-indigo-600',
        'from-emerald-500 to-teal-600',
        'from-purple-500 to-indigo-500',
        'from-amber-400 to-orange-500',
        'from-pink-500 to-rose-500'
    ];
    const hash = normalizedSlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradient = fallbacks[hash % fallbacks.length];

    return {
        id: 'default',
        slug: slug,
        gradient: gradient,
        badge: undefined,
        emoji: '✨',
        featured: false
    };
};

export const getBlogCategoryStyle = (category: string) => {
    // Normalize category for consistent matching
    const cat = category || "Insight";

    // Check for keywords or exact matches
    if (cat.includes("Astrology")) return "bg-purple-500/20 text-purple-100 border-purple-500/30";
    if (cat.includes("Puja") || cat.includes("Ritual")) return "bg-orange-500/20 text-orange-100 border-orange-500/30";
    if (cat.includes("Sacred") || cat.includes("Yatra") || cat.includes("Place")) return "bg-emerald-500/20 text-emerald-100 border-emerald-500/30";
    if (cat.includes("Devta") || cat.includes("Divine") || cat.includes("Knowledge")) return "bg-yellow-500/20 text-yellow-100 border-yellow-500/30";
    if (cat.includes("Scripture") || cat.includes("Wisdom") || cat.includes("Ancient")) return "bg-blue-500/20 text-blue-100 border-blue-500/30";
    if (cat.includes("Life") || cat.includes("Guidance") || cat.includes("Problem")) return "bg-teal-500/20 text-teal-100 border-teal-500/30";
    if (cat.includes("Devotion") || cat.includes("Culture") || cat.includes("Bhakti")) return "bg-pink-500/20 text-pink-100 border-pink-500/30";

    // Default
    return "bg-slate-500/20 text-slate-100 border-slate-500/30";
};
