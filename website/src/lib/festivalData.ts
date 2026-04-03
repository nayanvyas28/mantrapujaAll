export interface GalleryImage {
    id: string;
    url: string;
    alt: string;
    category: 'ritual' | 'temple' | 'crowd' | 'decoration';
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Ritual {
    name: string;
    description: string;
    timing: string;
}

export interface Festival {
    id: string;
    name: string;
    slug: string;
    date: Date; // 2024 dates or current year
    shortDesc: string;
    description: string;
    heroImage: string;
    heroImageAlt?: string;
    significance: {
        mythology: string;
        cultural: string;
        spiritual: string;
    };
    rituals: Ritual[];
    regionalVariations: {
        north?: string;
        south?: string;
        east?: string;
        west?: string;
    };
    faqs: FAQ[];
    gallery: GalleryImage[];
}

export const festivals: Festival[] = [
    {
        id: '1',
        name: 'Maha Shivratri',
        slug: 'maha-shivratri',
        date: new Date('2024-03-08'),
        shortDesc: 'The Great Night of Lord Shiva, celebrating his cosmic dance and marriage to Parvati.',
        description: 'Maha Shivratri is a Hindu festival celebrated annually in honour of the god Shiva. The name also refers to the night when Shiva performs the heavenly dance.',
        heroImage: '/puja images/rudra abhishek 1.png', // Placeholder
        heroImageAlt: 'Shivlinga with milk offering during Maha Shivratri',
        significance: {
            mythology: 'It is believed that on this night Shiva performed the Tandava Nritya or the dance of primordial creation, preservation and destruction.',
            cultural: 'Devotees observe a strict fast and keep a night-long vigil (jagaran) while meditating on Shiva.',
            spiritual: 'It symbolizes the overcoming of darkness and ignorance in life and the world.'
        },
        rituals: [
            { name: 'Abhishekam', description: 'Bathing the Shiva Linga with milk, honey, water, and bel leaves.', timing: 'Throughout the night (4 Praharas)' },
            { name: 'Fasting', description: 'Abstaining from food and water to purify the body and mind.', timing: 'Sunrise to next Sunrise' }
        ],
        regionalVariations: {
            north: 'Celebrated with great fervor in Varanasi with processions to Kashi Vishwanath.',
            south: 'Special poojas in all major Shiva temples like Rameshwaram and Chidambaram.'
        },
        faqs: [
            { question: 'Why keep awake all night?', answer: 'Staying awake (Jagaran) is believed to help the vertical upsurge of energy in the human system.' },
            { question: 'What to offer Shiva?', answer: 'Bel patra (Bilva leaves), milk, and water are the most auspicious offerings.' }
        ],
        gallery: []
    },
    {
        id: '2',
        name: 'Holi',
        slug: 'holi',
        date: new Date('2024-03-25'),
        shortDesc: 'The Festival of Colors, signifying the victory of good over evil and the arrival of spring.',
        description: 'Holi is a popular ancient Hindu festival, also known as the "Festival of Love", the "Festival of Colors", and the "Festival of Spring".',
        heroImage: '/festivals/holi-hero.jpg',
        heroImageAlt: 'Vibrant colors of Holi festival celebration',
        significance: {
            mythology: 'Commemorates the burning of Holika and saving of Prahlad by Lord Vishnu (Narasimha Avatar).',
            cultural: 'People play with colors, visit friends and family, and share sweets like Gujiya.',
            spiritual: 'It marks the triumph of devotion and truth over ego and evil.'
        },
        rituals: [
            { name: 'Holika Dahan', description: 'Bonfire lit on the night before Holi to symbolize burning of evil.', timing: 'Night before Holi' },
            { name: 'Rangwali Holi', description: 'Playing with colored powders and water.', timing: 'Morning of Holi' }
        ],
        regionalVariations: {
            north: 'Lathmar Holi in Barsana and Nandgaon is famous.',
            west: 'In Maharashtra, Puran Poli is prepared and offered to the fire.'
        },
        faqs: [
            { question: 'Why is Holika Dahan performed?', answer: 'To pray for the destruction of internal impurities and ego.' },
            { question: 'Is Holi celebrated only in India?', answer: 'It is celebrated globally by the Indian diaspora and many others who enjoy the festive spirit.' }
        ],
        gallery: []
    },
    {
        id: '3',
        name: 'Ram Navami',
        slug: 'ram-navami',
        date: new Date('2024-04-17'),
        shortDesc: 'Birth anniversary of Lord Rama, the seventh avatar of Vishnu.',
        description: 'Ram Navami is a spring Hindu festival that celebrates the birthday of the god Rama. He is particularly important to the Vaishnavism tradition of Hinduism.',
        heroImage: '/festivals/ram-navami-hero.jpg',
        heroImageAlt: 'Idol of Lord Rama during Ram Navami',
        significance: {
            mythology: 'Marks the birth of Rama to King Dasharatha and Queen Kausalya in Ayodhya.',
            cultural: 'Temples are decorated, Ramayana is recited, and community meals (Bhandara) are organized.',
            spiritual: 'Celebrates the embodiment of dharma (righteousness) and virtue.'
        },
        rituals: [
            { name: 'Rathyatra', description: 'Chariot processions of Rama, Sita, Lakshmana, and Hanuman.', timing: 'Mid-day' },
            { name: 'Kanya Pujan', description: 'Worshipping young girls as forms of the Goddess (often concluding Navratri).', timing: 'Morning' }
        ],
        regionalVariations: {
            north: 'Huge celebrations in Ayodhya, the birthplace of Rama.',
            south: 'In Bhadrachalam, huge wedding ceremony (Kalyanam) of Rama and Sita happens.'
        },
        faqs: [
            { question: 'What is the significance of Panakam?', answer: 'Panakam (sweet drink) is offered to Rama and distributed as prasad, especially in South India.' }
        ],
        gallery: []
    },
    {
        id: '4',
        name: 'Ganesh Chaturthi',
        slug: 'ganesh-chaturthi',
        date: new Date('2024-09-07'),
        shortDesc: 'Ten-day festival celebrating the arrival of Ganesha to earth.',
        description: 'Ganesh Chaturthi is a Hindu festival celebrating the arrival of Ganesha to earth from Kailash Parvat with his mother Goddess Parvati.',
        heroImage: '/festivals/ganesh-chaturthi-hero.jpg',
        heroImageAlt: 'Ganesh Visarjan procession with large idol',
        significance: {
            mythology: 'Ganesha is revered as the remover of obstacles and the god of new beginnings.',
            cultural: 'Installation of clay idols at homes and public pandals.',
            spiritual: 'Invoking wisdom and prosperity while removing obstacles.'
        },
        rituals: [
            { name: 'Prana Pratishtha', description: 'Infusing the deity into the idol with mantras.', timing: 'Day 1' },
            { name: 'Visarjan', description: 'Immersion of the idol in water, symbolizing the cycle of creation and dissolution.', timing: 'Day 10 (Anant Chaturdashi)' }
        ],
        regionalVariations: {
            west: 'Maharashtra hosts the grandest celebrations with massive public idols.',
            south: 'Gowri Habba is celebrated a day before in Karnataka.'
        },
        faqs: [
            { question: 'Why clay idols?', answer: 'To respect nature, as the idol returns to the earth (water) after the festival.' }
        ],
        gallery: []
    },
    {
        id: '5',
        name: 'Navratri (Sharad)',
        slug: 'navratri',
        date: new Date('2024-10-03'),
        shortDesc: 'Nine nights dedicated to the worship of the Divine Feminine (Durga).',
        description: 'Navratri is an annual Hindu festival observed in the honour of the goddess Durga. It spans over nine nights (and ten days), first in the month of Chaitra and again in the month of Ashvin.',
        heroImage: '/festivals/navratri-hero.jpg',
        heroImageAlt: 'Goddess Durga idol during Navratri festival',
        significance: {
            mythology: 'Celebrates Durga\'s battle and victory over the buffalo demon Mahishasura.',
            cultural: 'Garba and Dandiya Raas dances in Gujarat/Mumbai. Durga Puja in Bengal.',
            spiritual: 'Purification of the mind and awakening of inner shakti (power).'
        },
        rituals: [
            { name: 'Ghatasthapana', description: 'Invoking the Goddess into a kalash (pot).', timing: 'Day 1' },
            { name: 'Kanya Pujan', description: 'Worship of young girls representing the nine forms of Durga.', timing: 'Ashtami/Navami' }
        ],
        regionalVariations: {
            east: 'Durga Puja involves elaborate pandals and idols of the Goddess.',
            west: 'Garba and Dandiya nights are the highlight.'
        },
        faqs: [
            { question: 'Why 9 nights?', answer: 'Each night is dedicated to one of the 9 avatars of Durga (Navadurga).' }
        ],
        gallery: []
    },
    {
        id: '6',
        name: 'Diwali',
        slug: 'diwali',
        date: new Date('2024-11-01'),
        shortDesc: 'The Festival of Lights, celebrating the return of Rama and Lakshmi Puja.',
        description: 'Diwali is a festival of lights and one of the major festivals celebrated by Hindus, Jains, Sikhs and some Buddhists.',
        heroImage: '/festivals/diwali-hero.jpg',
        heroImageAlt: 'Earthen lamps (Diyas) lit for Diwali celebration',
        significance: {
            mythology: 'Return of Lord Rama to Ayodhya after 14 years of exile. Worship of Goddess Lakshmi.',
            cultural: 'Lighting lamps (diyas), bursting crackers, sharing sweets.',
            spiritual: 'Victory of light over darkness, good over evil, and knowledge over ignorance.'
        },
        rituals: [
            { name: 'Lakshmi Puja', description: 'Worship of Goddess Lakshmi for wealth and prosperity.', timing: 'Evening of Amavasya' },
            { name: 'Dhanteras', description: 'Buying gold/silver/utensils as a sign of good luck.', timing: '2 days before Diwali' }
        ],
        regionalVariations: {
            north: 'Focus on Rama\'s return.',
            east: 'Kali Puja is celebrated on the same night in Bengal.'
        },
        faqs: [
            { question: 'Why light Diyas?', answer: 'To guide Goddess Lakshmi into the home and dispel darkness.' }
        ],
        gallery: []
    }
];

export const getUpcomingFestivals = (limit = 3) => {
    const today = new Date();
    // For demo purposes, if today is past 2024, reset years or just show all sorted
    // In a real app, we'd filter > today
    // Since our mock dates are 2024, let's just sort by date
    return [...festivals].sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, limit);
};

export const getFestivalBySlug = (slug: string) => {
    return festivals.find(f => f.slug === slug);
};
