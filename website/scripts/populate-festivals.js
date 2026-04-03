const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const festivals = [
    {
        name: 'Makar Sankranti',
        slug: 'makar-sankranti-2026',
        description: "Harvest festival marking the sun's transition into Capricorn. Celebrated with kite flying, sesame sweets, and holy dips.",
        date: '2026-01-14',
        month: 'January',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1578632292335-df3abbb0d586'],
        content: {
            significance: 'Marks the end of winter solstice',
            rituals: ['Kite flying', 'Holy bath in Ganga', 'Til-gul sweets'],
            regional_names: { Maharashtra: 'Makar Sankranti', 'Tamil Nadu': 'Pongal', Punjab: 'Lohri' }
        },
        seo_title: 'Makar Sankranti 2026 - Date, Significance & Celebrations',
        seo_description: 'Celebrate Makar Sankranti 2026 on January 14. Learn about harvest festival traditions, kite flying, and regional celebrations across India.',
        is_active: true
    },
    {
        name: 'Maha Shivratri',
        slug: 'maha-shivratri-2026',
        description: 'The great night of Lord Shiva, celebrated with fasting, night-long vigil, and offering of Bel leaves.',
        date: '2026-02-26',
        month: 'February',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220'],
        content: {
            significance: 'Night when Shiva performed the Tandava dance',
            rituals: ['All-night vigil', 'Abhishekam with milk and honey', 'Chanting Om Namah Shivaya'],
            fasting: 'Complete fast or fruits only',
            best_temples: ['Kashi Vishwanath', 'Somnath', 'Mahakaleshwar']
        },
        seo_title: 'Maha Shivratri 2026 - Vrat, Puja Vidhi & Significance',
        seo_description: 'Maha Shivratri 2026 falls on February 26. Complete guide to fasting, puja rituals, and significance of the great night of Lord Shiva.',
        is_active: true
    },
    {
        name: 'Holi',
        slug: 'holi-2026',
        description: 'Festival of colors celebrating the victory of good over evil and the arrival of spring.',
        date: '2026-03-14',
        month: 'March',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1583241800698-1d31c2eb7b1e'],
        content: {
            significance: 'Victory of Prahlad over Holika, love of Radha-Krishna',
            rituals: ['Holika Dahan bonfire', 'Playing with colors', 'Thandai and sweets'],
            regional_variations: { Mathura: 'Lathmar Holi', Bengal: 'Dol Jatra', Punjab: 'Hola Mohalla' }
        },
        seo_title: 'Holi 2026 - Festival of Colors Date & Celebrations',
        seo_description: "Holi 2026 on March 14. Discover the significance, rituals, and colorful traditions of India's most vibrant spring festival.",
        is_active: true
    },
    {
        name: 'Ram Navami',
        slug: 'ram-navami-2026',
        description: 'Birthday of Lord Rama, the seventh avatar of Vishnu, celebrated with bhajans and readings of Ramayana.',
        date: '2026-04-02',
        month: 'April',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1580477667995-2b94f01c9516'],
        content: {
            significance: 'Birth of Lord Rama in Ayodhya',
            rituals: ['Ramayana recitation', 'Bhajans and kirtans', 'Chariot processions'],
            fasting: 'Many devotees observe fast',
            best_places: ['Ayodhya', 'Rameswaram', 'Bhadrachalam']
        },
        seo_title: 'Ram Navami 2026 - Lord Rama Birthday Celebration',
        seo_description: 'Ram Navami 2026 on April 2. Learn about the birth of Lord Rama, puja vidhi, and celebrations across India.',
        is_active: true
    },
    {
        name: 'Hanuman Jayanti',
        slug: 'hanuman-jayanti-2026',
        description: 'Birthday of Lord Hanuman, celebrated with special pujas and recitation of Hanuman Chalisa.',
        date: '2026-04-16',
        month: 'April',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1609619385002-f40f2a13f2c2'],
        content: {
            significance: 'Birth of Lord Hanuman, symbol of strength and devotion',
            rituals: ['108 times Hanuman Chalisa', 'Offering of sindoor and jasmine oil', 'Visiting Hanuman temples'],
            benefits: 'Removes obstacles, grants strength and courage'
        },
        seo_title: 'Hanuman Jayanti 2026 - Date, Puja Vidhi & Significance',
        seo_description: "Hanuman Jayanti 2026 on April 16. Complete guide to celebrating Lord Hanuman's birthday with puja rituals and mantras.",
        is_active: true
    },
    {
        name: 'Raksha Bandhan',
        slug: 'raksha-bandhan-2026',
        description: 'Festival celebrating the bond between brothers and sisters, marked by tying of sacred thread (rakhi).',
        date: '2026-08-03',
        month: 'August',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1597059171311-c6c6c0c1b1e3'],
        content: {
            significance: 'Sacred bond of protection between siblings',
            rituals: ["Sister ties rakhi on brother's wrist", 'Brother gives gifts and promises protection', 'Family gatherings'],
            muhurat: 'Morning hours are most auspicious'
        },
        seo_title: 'Raksha Bandhan 2026 - Rakhi Tying Muhurat & Significance',
        seo_description: 'Raksha Bandhan 2026 on August 3. Find auspicious muhurat for rakhi tying and celebrate sibling bond with traditions.',
        is_active: true
    },
    {
        name: 'Krishna Janmashtami',
        slug: 'krishna-janmashtami-2026',
        description: 'Birthday of Lord Krishna, celebrated with fasting, midnight puja, and Dahi Handi festivities.',
        date: '2026-08-11',
        month: 'August',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1599639957043-f3aa5c986398'],
        content: {
            significance: 'Birth of Lord Krishna at midnight in Mathura prison',
            rituals: ['Midnight puja', 'Dahi Handi', 'Jhula decoration', 'Bhajans and dance'],
            fasting: 'Fast until midnight',
            best_celebrations: ['Mathura-Vrindavan', 'Dwarka', 'Mumbai Dahi Handi']
        },
        seo_title: 'Krishna Janmashtami 2026 - Puja Muhurat & Celebrations',
        seo_description: 'Krishna Janmashtami 2026 on August 11. Midnight puja timings, fasting rules, and Dahi Handi celebrations guide.',
        is_active: true
    },
    {
        name: 'Ganesh Chaturthi',
        slug: 'ganesh-chaturthi-2026',
        description: 'Birthday of Lord Ganesha, celebrated with elaborate idol installations and 10-day festivities.',
        date: '2026-09-01',
        month: 'September',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1567157577867-05ccb1388e66'],
        content: {
            significance: 'Birth of Lord Ganesha, remover of obstacles',
            rituals: ['Ganesha idol installation', 'Daily puja for 10 days', 'Visarjan (immersion) on Anant Chaturdashi', 'Modak offerings'],
            duration: '1.5, 3, 5, 7, or 10 days',
            best_celebrations: ['Mumbai', 'Pune', 'Hyderabad']
        },
        seo_title: 'Ganesh Chaturthi 2026 - Installation Muhurat & Celebrations',
        seo_description: 'Ganesh Chaturthi 2026 starting September 1. Complete guide to idol installation, puja vidhi, and 10-day celebrations.',
        is_active: true
    },
    {
        name: 'Navratri',
        slug: 'navratri-2026',
        description: 'Nine nights dedicated to Goddess Durga, celebrated with fasting, garba, and dandiya.',
        date: '2026-10-13',
        month: 'October',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1603893547438-a1c05e0f3c13'],
        content: {
            significance: 'Victory of Goddess Durga over Mahishasura',
            rituals: ['9 days of fasting', 'Durga puja', 'Garba and Dandiya', 'Kanya puja on Ashtami'],
            nine_forms: ['Shailaputri', 'Brahmacharini', 'Chandraghanta', 'Kushmanda', 'Skandamata', 'Katyayani', 'Kalaratri', 'Mahagauri', 'Siddhidatri'],
            regional_celebrations: { Gujarat: 'Garba nights', Bengal: 'Durga Puja', 'North India': 'Ram Leela' }
        },
        seo_title: 'Navratri 2026 - 9 Days of Goddess Durga Worship',
        seo_description: 'Navratri 2026 from October 13. Complete guide to 9 days of fasting, puja vidhi, and garba celebrations.',
        is_active: true
    },
    {
        name: 'Dussehra',
        slug: 'dussehra-2026',
        description: 'Victory of Lord Rama over Ravana, marking the triumph of good over evil.',
        date: '2026-10-22',
        month: 'October',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944'],
        content: {
            significance: 'Victory of Rama over Ravana, end of Navratri',
            rituals: ['Ravana effigy burning', 'Ram Leela performances', 'Durga idol immersion', 'Shami tree worship'],
            regional_names: { 'South India': 'Vijayadashami', Bengal: 'Durga Visarjan' }
        },
        seo_title: 'Dussehra 2026 - Vijayadashami Date & Significance',
        seo_description: 'Dussehra 2026 on October 22. Celebrate the victory of good over evil with Ravana Dahan and regional traditions.',
        is_active: true
    },
    {
        name: 'Diwali',
        slug: 'diwali-2026',
        description: 'Festival of lights celebrating the return of Lord Rama to Ayodhya and the victory of light over darkness.',
        date: '2026-11-11',
        month: 'November',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1605811345999-09c0c2c85a9f'],
        content: {
            significance: 'Return of Lord Rama to Ayodhya, Lakshmi puja',
            rituals: ['Lakshmi-Ganesh puja', 'Lighting diyas and candles', 'Fireworks', 'Rangoli', 'Sweets and gifts'],
            five_days: ['Dhanteras', 'Naraka Chaturdashi', 'Diwali', 'Govardhan Puja', 'Bhai Dooj'],
            best_celebrations: ['Ayodhya', 'Varanasi', 'Jaipur', 'Amritsar']
        },
        seo_title: 'Diwali 2026 - Festival of Lights Date & Lakshmi Puja Muhurat',
        seo_description: 'Diwali 2026 on November 11. Complete guide to Lakshmi puja muhurat, 5-day celebrations, and festival traditions.',
        is_active: true
    },
    {
        name: 'Chhath Puja',
        slug: 'chhath-puja-2026',
        description: 'Ancient Vedic festival dedicated to Sun God, observed with rigorous fasting and holy river rituals.',
        date: '2026-11-14',
        month: 'November',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1609254925600-5b5b9e5e7f4a'],
        content: {
            significance: 'Worship of Sun God and Chhathi Maiya',
            rituals: ['36-hour fast without water', 'Arghya to setting and rising sun', 'Standing in river water', 'Thekua and fruit offerings'],
            duration: '4 days',
            main_regions: ['Bihar', 'Jharkhand', 'Eastern UP']
        },
        seo_title: 'Chhath Puja 2026 - Date, Rituals & Significance',
        seo_description: 'Chhath Puja 2026 on November 14. Learn about the ancient sun worship festival, fasting rules, and river rituals.',
        is_active: true
    },
    {
        name: 'Kartik Purnima',
        slug: 'kartik-purnima-2026',
        description: 'Sacred full moon day for holy baths, lighting diyas, and worshipping Lord Vishnu and Shiva.',
        date: '2026-11-30',
        month: 'November',
        year: 2026,
        images: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220'],
        content: {
            significance: 'Birth of Kartikeya, Matsya avatar of Vishnu',
            rituals: ['Holy bath in sacred rivers', 'Lighting diyas on riverbanks', 'Tulsi vivah', 'Charity and donations'],
            best_places: ['Varanasi', 'Pushkar', 'Haridwar']
        },
        seo_title: 'Kartik Purnima 2026 - Dev Deepawali & Tulsi Vivah',
        seo_description: 'Kartik Purnima 2026 on November 30. Celebrate Dev Deepawali with holy baths, diya lighting, and Tulsi Vivah.',
        is_active: true
    }
];

async function populate() {
    console.log('Populating festivals...');
    const { data, error } = await supabase
        .from('festivals')
        .upsert(festivals, { onConflict: 'slug' });

    if (error) {
        console.error('Error populating festivals:', error);
    } else {
        console.log('Successfully populated 13 festivals!');
    }
}

populate();
