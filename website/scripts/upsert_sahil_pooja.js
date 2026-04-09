
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length === 2) {
        env[parts[0].trim()] = parts[1].trim();
    }
});

const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
);

async function upsertSahilPooja() {
    console.log('Upserting Sahil Pooja data via JS client...');

    const sahilData = {
        name: 'Sahil Pooja',
        slug: 'sahil-pooja',
        tagline: 'A Sacred Journey of Divine Protection and Infinite Prosperity',
        hero_badge_text: 'Premium Vedic Selection',
        hero_glass_badge_label: 'Blessed by',
        hero_glass_badge_value: '1k+ Devotees',
        theme_color: 'blue',
        benefits: ['Shield against negative energies', 'Personalized Sankalp via Video', 'Authentic Vedic Mantras'],
        ritual_badges: ['100% Vedic Ritual', 'Certified Senior Pandits', 'Prasad Delivery Included'],
        about_heading: 'Eternal Protection',
        about_subheading: 'For Modern Souls',
        about_description: 'The Sahil Pooja is a specialized Vedic ritual designed to harmonize your inner energies with the cosmic vibrations of protection and success. Rooted in ancient scriptures, this pooja invokes divine guardians to clear obstacles and establish a fortress of positive energy around your life and family.',
        about_significance_label: 'Spiritual Significance',
        about_significance_text: 'This pooja acts as a bridge between the physical and spiritual realms, neutralizing negative influences and aligning one\'s destiny with the higher purpose of peace and abundance.',
        about_target_audience_label: 'Who Should Perform?',
        about_target_audience_text: 'Ideal for individuals seeking spiritual clarity, protection from negative energies, or those embarking on significant new life chapters like careers, building homes, or starting families.',
        why_perform_section_title: 'Why Perform this Puja?',
        why_perform_cards: [
            { "icon": "Protection", "title": "Divine Shield", "description": "Creates a protective aura that wards off negativity and ensures peace of mind." },
            { "icon": "Success", "title": "Obstacle Removal", "description": "Clears the path for career growth and removes hidden hurdles in business ventures." },
            { "icon": "Peace", "title": "Inner Harmony", "description": "Reduces stress and anxiety by aligning your chakras with divine vibrations." },
            { "icon": "Prosperity", "title": "Financial Growth", "description": "Invokes the blessings of prosperity to ensure steady progress and wealth." }
        ],
        ritual_process_section_title: 'Our Authentic Ritual Process',
        ritual_steps: [
            { "step": "01", "title": "Sankalpam", "description": "The sacred resolve where the devotee's intent is offered to the divine with specific gotra and name." },
            { "step": "02", "title": "Vighneshvara Puja", "description": "Invoking Lord Ganesha to ensure the ritual proceeds without any interruptions." },
            { "step": "03", "title": "Invoking Guardians", "description": "Special mantras to call upon the protective deities of the eight directions." },
            { "step": "04", "title": "Main Ritual", "description": "The core offering of sacred herbs and mantras specifically for the Sahil Pooja deity." },
            { "step": "05", "title": "Purnahuti", "description": "The final offering that symbolizes the completion and acceptance of the pooja by the divine." }
        ],
        blessings_section_title: 'Divine Benefits & Blessings',
        blessings_cards: [
            { "icon": "🛡️", "title": "Total Protection", "description": "Safeguard your home and workplace from negative vibrations and evil eye." },
            { "icon": "📈", "title": "Rapid Progress", "description": "Noticeable shifts in professional growth and decision-making clarity." },
            { "icon": "🧘", "title": "Emotional Balance", "description": "Attain a state of meditative calm even in high-pressure situations." },
            { "icon": "💰", "title": "Steady Abundance", "description": "Manifestation of sustained wealth and ancestral blessings." }
        ],
        timing_section_title: 'Best Time for Divine Alignment',
        timing_subtitle: 'Celestial Sync',
        // timing_muhurat_title: 'Sacred Muhurat', // Skipping as column doesn't exist yet
        timing_occasions_list: ['Brahma Muhurta', 'New Moon Days', 'Auspicious Tithis', 'Sunrise and Sunset'],
        timing_muhurat_text: 'Most effective when performed during the early morning hours for maximum cosmic reception.',
        testimonials_list: [
            { "name": "Ananya Sharma", "location": "Delhi", "comment": "The Sahil Pooja brought such peace to our new home. The priest was very professional and explained every step.", "rating": 5, "avatar": "AS" },
            { "name": "Rahul Mehta", "location": "Mumbai", "comment": "I booked this for career obstacles and within a month, I felt a significant positive shift in my workplace dynamics.", "rating": 5, "avatar": "RM" },
            { "name": "Priya Iyer", "location": "Bangalore", "comment": "Authentic rituals and very convenient online booking. Highly recommended for spiritual protection.", "rating": 5, "avatar": "PI" }
        ],
        faq_list: [
            { "question": "How long does the Sahil Pooja take?", "answer": "The complete ritual takes approximately 2 to 2.5 hours depending on the specific family traditions and requirements." },
            { "question": "Can I attend the Pooja via video call?", "answer": "Yes, we provide high-definition live streaming for those who cannot be physically present. You can perform the sankalp remotely." },
            { "question": "What items do I need to prepare?", "answer": "For online puja, we arrange everything. For home puja, we will provide a comprehensive list of simple items like flowers and fruits." }
        ],
        footer_title: 'Ready to Transform \n Your Life?',
        footer_description: 'Take the first step towards a protected and prosperous future. Our expert priests are ready to guide you through this sacred journey.',
        seo_title: 'Sahil Pooja | Divine Protection & Prosperity | Book Online',
        seo_description: 'Transform your life with Sahil Pooja. Experience authentic Vedic rituals for protection, success, and prosperity. Guided by expert priests. Book your online pooja today.',
        seo_keywords: 'Sahil Pooja, Vedic Ritual, Divine Protection, Online Pooja Booking, Spiritual Prosperity, Success Mantra',
        price: 5100.00,
        is_active: true,
        is_featured: true,
        is_hero: true,
        images: ['/sahil-pooja-hero.jpg'] // Placeholder or existing image
    };

    const { data, error } = await supabase
        .from('poojas')
        .upsert(sahilData, { onConflict: 'slug' });

    if (error) {
        console.error('Error upserting Sahil Pooja:', error.message);
        // If error is about a missing column, try to remove it and retry
        return;
    }

    console.log('Sahil Pooja upserted successfully! ✅');
}

upsertSahilPooja();
