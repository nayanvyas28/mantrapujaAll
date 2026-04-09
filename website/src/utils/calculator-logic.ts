/**
 * Core Logic for Spiritual and Astrological Calculators
 */

// --- Numerology Logic ---

const pythagoreanChart: Record<string, number> = {
    a: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4,
    e: 5, n: 5, w: 5,
    f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, r: 9
};

/**
 * Reduces a number to a single digit (except master numbers 11, 22, 33)
 */
export const reduceNumber = (num: number, allowMaster = true): number => {
    if (allowMaster && [11, 22, 33].includes(num)) return num;
    if (num < 10) return num;
    const sum = String(num).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    return reduceNumber(sum, allowMaster);
};

export const calculateLifePath = (dob: string): number => {
    // dob format: YYYY-MM-DD
    const digits = dob.replace(/-/g, '').split('').map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);
    return reduceNumber(sum);
};

export const calculateExpressionNumber = (name: string): number => {
    const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
    let sum = 0;
    for (const char of cleanName) {
        sum += pythagoreanChart[char] || 0;
    }
    return reduceNumber(sum);
};

// --- Love & Friendship Compatibility ---

export const calculateCompatibility = (name1: string, name2: string, seed?: string): number => {
    const s1 = name1.toLowerCase().trim();
    const s2 = name2.toLowerCase().trim();
    
    if (!s1 || !s2) return 0;
    
    // Deterministic but "random" looking calculation
    let total = 0;
    for (let i = 0; i < s1.length; i++) total += s1.charCodeAt(i);
    for (let i = 0; i < s2.length; i++) total += s2.charCodeAt(i);
    
    if (seed) {
        for (let i = 0; i < seed.length; i++) total += seed.charCodeAt(i);
    }

    // Hash-like reduction to a percentage
    const percentage = (total % 41) + 60; // Range 60% to 100% for "meaningful" results
    return percentage;
};

// --- Sun Sign Logic ---

export const getSunSign = (dob: string): string => {
    const date = new Date(dob);
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    return "Pisces";
};

// --- Mock Astrological Logic (Placeholders for complex calculations) ---
// In a real app, these would use a library like 'astrology-js' or an API

export const getMoonSign = (dob: string, time: string, lat: number, lon: number): string => {
    // Simplified: uses a rotation based on date
    const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const date = new Date(dob);
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    return signs[(dayOfYear + Math.floor(lat + lon)) % 12];
};

export const getNakshatra = (dob: string): string => {
    const nakshatras = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Svati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"];
    const date = new Date(dob);
    return nakshatras[date.getDate() % 27];
};

// --- Advanced Vedic Astrological Logic (Approximated) ---

export const calculateMangalDosha = (dob: string, time: string, lat: number, lon: number): { verdict: string, has_dosha: boolean } => {
    const date = new Date(dob);
    const marsPos = (date.getDate() * 13 + date.getMonth() * 30) % 12; // Pseudo-mars position
    const houses = [1, 2, 4, 7, 8, 12];
    const isDosha = houses.includes((marsPos % 12) + 1);
    return {
        verdict: isDosha ? "Present (Anshik)" : "Not Present",
        has_dosha: isDosha
    };
};

export const calculateSadeSati = (dob: string): string => {
    const date = new Date(dob);
    const year = date.getFullYear();
    const cycle = (year - 1900) % 30;
    if (cycle < 7.5) return "Phase 1: Rising";
    if (cycle < 15) return "Phase 2: Peak (Dhaiya)";
    if (cycle < 22.5) return "Phase 3: Setting";
    return "No active Sade Sati currently.";
};

export const calculateIshtaDevata = (dob: string): string => {
    const signs = ["Vishnu", "Shiva", "Durga", "Ganesha", "Hanuman", "Lakshmi", "Saraswati", "Kartikeya", "Surya"];
    const date = new Date(dob);
    return signs[date.getDate() % signs.length];
};

export const calculateAtmakaraka = (dob: string): string => {
    const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
    return planets[new Date(dob).getDate() % 7];
};

// --- Fun & Social Calculators ---

export const calculateFlames = (name1: string, name2: string): string => {
    const s1 = name1.toLowerCase().replace(/\s/g, '');
    const s2 = name2.toLowerCase().replace(/\s/g, '');
    const flames = ["Friends", "Lovers", "Affection", "Marriage", "Enemies", "Siblings"];
    let count = s1.length + s2.length;
    return flames[count % 6];
};

// --- Professional Numerology ---

export const calculateLuckyVehicle = (numberStr: string): number => {
    const digits = numberStr.replace(/[^0-9]/g, '').split('').map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);
    return reduceNumber(sum, false);
};

export const generateLoShuGrid = (dob: string): (number | null)[][] => {
    const digits = dob.replace(/-/g, '').split('').map(Number);
    const grid: (number | null)[][] = [
        [4, 9, 2],
        [3, 5, 7],
        [8, 1, 6]
    ];
    return grid.map(row => row.map(cell => (cell !== null && digits.includes(cell)) ? cell : null));
};

// --- Complex Charts (Placeholders) ---

export const getDashaPeriod = (dob: string): any[] => {
    return [
        { planet: "Ketu", start: "Birth", end: "7 years" },
        { planet: "Venus", start: "7 years", end: "27 years" },
        { planet: "Sun", start: "27 years", end: "33 years" }
    ];
};

export const getMoonPhase = (dob: string): string => {
    const phases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
    return phases[new Date(dob).getDate() % 8];
};

/**
 * Fetches real astrology data from our internal proxy
 */
export const fetchAstrologyData = async (endpoint: string, params: any) => {
    try {
        const response = await fetch('/api/astrology', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint, params })
        });
        
        const data = await response.json();
        if (response.ok) return data;
        throw new Error(data.message || 'API Error');
    } catch (e) {
        console.error('Fetch Error:', e);
        return null;
    }
};

/**
 * Mock Birth Chart Data (Fallback)
 */
export const getBirthChartData = (dob: string): any => {
    return {
        houses: [
            { id: 1, sign: "Leo", planets: ["Sun"] },
            { id: 2, sign: "Virgo", planets: [] },
            { id: 3, sign: "Libra", planets: ["Mars"] },
            { id: 4, sign: "Scorpio", planets: ["Venus"] },
            { id: 10, sign: "Taurus", planets: ["Jupiter"] }
        ]
    };
};
