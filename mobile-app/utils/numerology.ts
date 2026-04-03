/**
 * Refined Numerology & Astrological Logic
 * Using Vedic terms: Mulank (Driver) and Bhagyank (Conductor)
 */

const LETTER_VALUES: Record<string, number> = {
    a: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4,
    e: 5, n: 5, w: 5,
    f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, r: 9,
};

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

/**
 * Reduces a number to a single digit (1-9) as per Vedic Numerology.
 * Example: 29 -> 11 -> 2
 */
function reduceNumber(num: number): number {
    if (num < 10) return num;
    const sum = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    return reduceNumber(sum);
}

/**
 * Calculates Mulank (Driver Number) - Sum of Birth Day only
 */
export function calculateMulank(day: number): number {
    return reduceNumber(day);
}

/**
 * Calculates Bhagyank (Conductor Number) - Sum of ALL digits in full DOB
 */
export function calculateBhagyank(day: number, month: number, year: number): number {
    const fullStr = `${day}${month}${year}`;
    let total = 0;
    for (const d of fullStr) {
        if (!isNaN(parseInt(d))) {
            total += parseInt(d);
        }
    }
    return reduceNumber(total);
}

/**
 * Calculates Destiny Number based on Full Name
 */
export function calculateDestiny(name: string): number {
    const sanitized = name.toLowerCase().replace(/[^a-z]/g, '');
    let total = 0;
    for (const char of sanitized) {
        total += LETTER_VALUES[char] || 0;
    }
    return reduceNumber(total);
}

/**
 * Simplified Rashi (Zodiac) mapping based on Month and Day
 */
export function getRashi(day: number, month: number): { name: string, planet: string, element: string } {

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: "Mesh (Aries)", planet: "Mars", element: "Fire" };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: "Vrish (Taurus)", planet: "Venus", element: "Earth" };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: "Mithun (Gemini)", planet: "Mercury", element: "Air" };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: "Karka (Cancer)", planet: "Moon", element: "Water" };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: "Simha (Leo)", planet: "Sun", element: "Fire" };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: "Kanya (Virgo)", planet: "Mercury", element: "Earth" };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: "Tula (Libra)", planet: "Venus", element: "Air" };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: "Vrishchik (Scorpio)", planet: "Mars", element: "Water" };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: "Dhanu (Sagittarius)", planet: "Jupiter", element: "Fire" };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: "Makar (Capricorn)", planet: "Saturn", element: "Earth" };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: "Kumbha (Aquarius)", planet: "Saturn", element: "Air" };
    return { name: "Meen (Pisces)", planet: "Jupiter", element: "Water" };
}

export const NUMEROLOGY_INSIGHTS: Record<number, {
    title: string;
    desc: string;
    planet: string;
    luckyColor: string;
    luckyDay: string;
    traits: string[];
}> = {
    1: {
        title: "The Pioneer Leader",
        desc: "Ruled by the Sun, you possess strong leadership and original ideas. You are destined to shine and lead from the front.",
        planet: "Sun",
        luckyColor: "Saffron, Gold",
        luckyDay: "Sunday",
        traits: ["Leadership", "Ambitious", "Creative", "Ego-driven"]
    },
    2: {
        title: "The Diplomatic Artist",
        desc: "Ruled by the Moon, you are sensitive, emotional, and highly intuitive. You find strength in partnerships and harmony.",
        planet: "Moon",
        luckyColor: "White, Silver",
        luckyDay: "Monday",
        traits: ["Intuitive", "Peaceful", "Cooperative", "Emotional"]
    },
    3: {
        title: "The Creative Guru",
        desc: "Ruled by Jupiter, you are a natural-born teacher and communicator. Knowledge and expression are your greatest assets.",
        planet: "Jupiter",
        luckyColor: "Yellow",
        luckyDay: "Thursday",
        traits: ["Knowledgeable", "Optimistic", "Social", "Expressive"]
    },
    4: {
        title: "The Disciplined Builder",
        desc: "Ruled by Rahu, you are practical, systematic, and unconventional. You excel at providing structure to chaos.",
        planet: "Rahu",
        luckyColor: "Grey, Blue",
        luckyDay: "Saturday",
        traits: ["Reliable", "Practical", "Hardworking", "Stubborn"]
    },
    5: {
        title: "The Dynamic Explorer",
        desc: "Ruled by Mercury, you are quick-witted, versatile, and highly adaptable. Communication and change drive your spirit.",
        planet: "Mercury",
        luckyColor: "Green",
        luckyDay: "Wednesday",
        traits: ["Curious", "Fast", "Adaptable", "Nervous energy"]
    },
    6: {
        title: "The Harmonious Nurturer",
        desc: "Ruled by Venus, you are a lover of beauty, luxury, and family. You find success through creativity and relationships.",
        planet: "Venus",
        luckyColor: "White, Pink",
        luckyDay: "Friday",
        traits: ["Creative", "Responsible", "Loving", "Luxury-seeking"]
    },
    7: {
        title: "The Spiritual Seeker",
        desc: "Ruled by Ketu, you are philosophical, analytical, and drawn to the occult. You seek deeper truths beyond the material.",
        planet: "Ketu",
        luckyColor: "Aquamarine, White",
        luckyDay: "Monday",
        traits: ["Philosophical", "Introverted", "Spiritual", "Detached"]
    },
    8: {
        title: "The Karmic Achiever",
        desc: "Ruled by Saturn, you are the master of material success through hard work and balance. You face challenges to gain wisdom.",
        planet: "Saturn",
        luckyColor: "Black, Dark Blue",
        luckyDay: "Saturday",
        traits: ["Ambitious", "Disciplined", "Authoritative", "Karmic"]
    },
    9: {
        title: "The Universal Warrior",
        desc: "Ruled by Mars, you are courageous, compassionate, and ready to fight for a cause. You are the humanitarian warrior.",
        planet: "Mars",
        luckyColor: "Red",
        luckyDay: "Tuesday",
        traits: ["Courageous", "Compassionate", "Selfless", "Impulsive"]
    }
};
