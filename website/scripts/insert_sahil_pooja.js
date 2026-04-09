
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

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

async function insertSahilPooja() {
    console.log('Inserting Sahil Pooja SEO-friendly data...');

    const sahilPooja = {
        name: 'Sahil Pooja',
        slug: 'sahil-pooja',
        tagline: 'Unlock hidden potential and manifest your deepest desires through ancient Vedic science',
        about_description: 'Sahil Pooja is a specialized spiritual ritual designed to align your personal energy with the cosmic frequencies of success and protection. It combines standard Vedic mantras with personalized intentions to create a powerful breakthrough in personal and professional life.',
        theme_color: 'blue',
        is_active: true,

        // SEO Fields
        seo_title: 'Sahil Pooja | Divine Breakthrough & Success Ritual - MantraPuja',
        seo_description: 'Experience the transformative Sahil Pooja for career growth, protection, and mental clarity. Book online with certified Pandits and receive live video and prasad.',
        seo_keywords: 'Sahil Pooja, Vedic Rituals, Career Success Puja, Spiritual Protection, Online Puja Services',

        // Hero Section
        hero_badge_text: 'Exclusive Spiritual Breakthrough',
        hero_glass_badge_label: 'Conducted By',
        hero_glass_badge_value: 'Kashi Vishwanath Scholars',

        // About Section
        about_heading: 'Ancient Science',
        about_subheading: 'For Modern Manifestation',
        about_significance_text: 'This puja acts as a bridge between inherited karma and future aspiration, clearing the path for immediate results.',
        about_target_audience_text: 'Designed for ambitious individuals, entrepreneurs, and anyone seeking a significant shift in their life trajectory.',

        // Process Section
        ritual_process_section_title: 'Authentic Manifestation Process',
        ritual_steps: [
            { "step": 1, "title": "Sankalp", "description": "Defining your specific personal goals and aligning your intent with the ritual." },
            { "step": 2, "title": "Energy Invocation", "description": "Chanting of secret Beej Mantras to activate inner consciousness." },
            { "step": 3, "title": "Homa Ceremony", "description": "Sacred fire ritual to purify your aura and environment." },
            { "step": 4, "title": "Purnahuti", "description": "Final offering indicating the successful completion of your request." }
        ],
        ritual_badges: ['Personalized Intention', 'Live Dashdasham', 'Manifestation Certificate'],

        // Benefits Section
        blessings_section_title: 'Transformative Divine Benefits',
        blessings_cards: [
            { "icon": "🚀", "title": "Rapid Growth", "description": "Accelerate your career and business milestones." },
            { "icon": "🛡️", "title": "Karmic Shield", "description": "Protection against unseen obstacles and negativity." },
            { "icon": "💎", "title": "Inner Clarity", "description": "Enhanced decision-making and mental peace." }
        ],

        // Timing Section
        timing_section_title: 'Optimal Cosmic Windows',
        timing_subtitle: 'Galactic Alignment',
        timing_muhurat_text: 'Preferably during the Brahma Muhurat or as advised after astrological consultation.',

        // Footer Section
        footer_title: 'Is Today the Day of Your Breakthrough?',
        footer_description: 'The universe rewards the brave. Take the first step toward your destined success right now.',

        price: 2100.00,
        images: ['/diya.png']
    };

    const { data, error } = await supabase
        .from('poojas')
        .upsert(sahilPooja, { onConflict: 'slug' });

    if (error) {
        console.error('Error inserting Sahil Pooja:', error);
    } else {
        console.log('Successfully inserted/updated Sahil Pooja with SEO fields!');
    }
}

insertSahilPooja();
