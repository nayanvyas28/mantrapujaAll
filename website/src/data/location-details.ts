import { Location } from './spiritual-locations';

export interface LocationDetail extends Location {
    significance: string;
    history: string;
    keyRituals: {
        name: string;
        description: string;
    }[];
    highlights: {
        name: string;
        description: string;
    }[];
    travelInfo: {
        bestTime: string;
        nearestAirport: string;
        nearestRailway: string;
        howToReach: string;
    };
    tips: string[];
    longDescription?: string;
    spiritualArchitecture?: string;
    vedicReferences?: string;
    localLegends?: string;
    faqs?: {
        question: string;
        answer: string;
    }[];
}

export const locationDetails: Record<string, Partial<LocationDetail>> = {
    'kashi-vishwanath': {
        significance: "Kashi (Varanasi) is the spiritual capital of India and one of the oldest living cities in the world. It is believed that anyone who dies in Kashi attains 'Moksha' or liberation from the cycle of birth and death.",
        history: "Varanasi has been a center of learning and civilization for over 3,000 years. It is home to the Kashi Vishwanath Temple, dedicated to Lord Shiva, which has been destroyed and rebuilt several times throughout history.",
        keyRituals: [
            { name: "Ganga Aarti", description: "A spectacular evening ritual performed at the Dashashwamedh Ghat, involving fire, chants, and devotion." },
            { name: "Rudrabhishek", description: "A powerful ritual performed to please Lord Shiva, involving the pouring of sacred liquids on the Shiva Lingam." },
            { name: "Maha Mrityunjaya Homa", description: "Performed for longevity and protection from untimely death." }
        ],
        highlights: [
            { name: "Kashi Vishwanath Temple", description: "One of the 12 Jyotirlingas, the most sacred shrine of Lord Shiva." },
            { name: "Manikarnika Ghat", description: "The primary cremation ghat, symbolizing the cycle of life and death." },
            { name: "Sarnath", description: "Where Lord Buddha gave his first sermon, located just 10km from the city." }
        ],
        travelInfo: {
            bestTime: "October to March (Winter months are pleasant for sightseeing)",
            nearestAirport: "Lal Bahadur Shastri International Airport (VNS)",
            nearestRailway: "Varanasi Junction (BSB) or Banaras (BSBS)",
            howToReach: "Well-connected by air, rail, and road to all major Indian cities."
        },
        tips: [
            "Experience the early morning boat ride on the Ganga.",
            "Wear modest clothing while visiting temples.",
            "Be prepared for narrow lanes and crowded ghats.",
            "Try the local Banarasi silk and street food."
        ]
    },
    'haridwar': {
        significance: "Haridwar, literally 'Gateway to God', is one of the seven holiest places in Hinduism. It is situated where the holy River Ganga leaves the mountains to enter the plains.",
        history: "Ancient scriptures mention Haridwar as Kapila, and it has been a sacred site for millennia. It is one of the four venues for the Kumbh Mela.",
        keyRituals: [
            { name: "Ganga Aarti at Har Ki Pauri", description: "A divine evening ceremony where thousands of lamps are lit and floated on the river." },
            { name: "Pitru Tarpan", description: "Rituals performed for the salvation of ancestors." },
            { name: "Shanti Path", description: "Prayers for universal peace and individual mental tranquility." }
        ],
        highlights: [
            { name: "Har Ki Pauri", description: "The most sacred ghat where the celestial nectar is said to have fallen." },
            { name: "Mansa Devi Temple", description: "Situated atop Bilwa Parvat, accessible by a cable car ride." },
            { name: "Chandi Devi Temple", description: "Another hilltop temple dedicated to Goddess Chandi." }
        ],
        travelInfo: {
            bestTime: "September to April",
            nearestAirport: "Jolly Grant Airport, Dehradun (DED)",
            nearestRailway: "Haridwar Junction (HW)",
            howToReach: "Haridwar is a major railhead and well-connected by NH 58."
        },
        tips: [
            "Take a holy dip in the Ganga, but be mindful of the current.",
            "Attend the evening Aarti at least 30 minutes early to get a spot.",
            "Haridwar is a pure vegetarian and alcohol-free city."
        ]
    },
    'kedarnath': {
        significance: "Located high in the Himalayas, Kedarnath is one of the holiest pilgrimages (Chota Char Dham) and the most important of the 12 Jyotirlingas.",
        history: "The temple is said to have been built by the Pandavas and later revived by Adi Shankaracharya in the 8th century.",
        keyRituals: [
            { name: "Shiva Sahasranama Path", description: "Recitation of the 1000 names of Lord Shiva." },
            { name: "Abhishek", description: "Morning ritual involving the bathing of the holy Lingam." }
        ],
        highlights: [
            { name: "Kedarnath Temple", description: "An architectural marvel built of grey stone slabs." },
            { name: "Bhairav Nath Temple", description: "The protector of the valley during the winter months." },
            { name: "Vasuki Tal", description: "A stunning high-altitude lake nearby." }
        ],
        travelInfo: {
            bestTime: "May to June and September to October (Closed in winter)",
            nearestAirport: "Jolly Grant Airport, Dehradun",
            nearestRailway: "Rishikesh or Haridwar",
            howToReach: "A 16km trek from Gaurikund, or available via helicopter services."
        },
        tips: [
            "Carry heavy woollens even in summer.",
            "Get a medical checkup due to high altitude.",
            "Register for the Yatra in advance."
        ]
    }
};

export const getDetailsForLocation = (slug: string): Partial<LocationDetail> => {
    return locationDetails[slug] || {
        significance: "A sacred destination steeped in Vedic tradition and spiritual energy.",
        history: "This holy site has been a center of pilgrimage for centuries, mentioned in ancient Puranas.",
        keyRituals: [
            { name: "Daily Prayers", description: "Traditional morning and evening prayers offered to the presiding deity." }
        ],
        highlights: [
            { name: "Main Shrine", description: "The central temple complex known for its spiritual vibrations." }
        ],
        travelInfo: {
            bestTime: "October to March",
            nearestAirport: "Varies - check major hubs",
            nearestRailway: "Well connected to major grids",
            howToReach: "Accessible by road and rail from nearby metro cities."
        },
        tips: ["Respect local customs", "Carry traditional attire"]
    };
};
