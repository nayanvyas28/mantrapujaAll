
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

async function insertTestData() {
    console.log('Inserting test puja data...');

    const testPujas = [
        {
            name: "Ganesh Puja Test",
            slug: "ganesh-puja-test",
            tagline: "Remove obstacles and begin your journey with divine blessings",
            hero_badge_text: "Sacred New Beginnings",
            hero_glass_badge_label: "Conducted By",
            hero_glass_badge_value: "Varanasi Scholars",
            about_heading: "Divine Obstacle Remover",
            about_subheading: "Start Every Task with Peace",
            description: "Lord Ganesha is the Vighnaharta, the remover of obstacles. This puja is performed before any major undertaking to ensure success and harmony.",
            about_significance_text: "Ganesh Puja is the foundation of all Vedic rituals. It invokes the energy of wisdom and protection.",
            about_target_audience_text: "Ideal for business owners, students, and families starting new ventures or moving into a new home.",
            theme_color: "gold",
            is_active: true,
            why_perform_cards: [
                { icon: "🌟", title: "Success", description: "Ensure smooth completion of projects" },
                { icon: "💡", title: "Wisdom", description: "Gain clarity and intellectual strength" },
                { icon: "🛡️", title: "Protection", description: "Guard against negative energies" }
            ],
            ritual_process_section_title: "Authentic Vinayaka Ritual",
            ritual_steps: [
                "Ganpati Sthapana: Invoking Lord Ganesha in the sacred Kalash",
                "Shodashopachara: Offering 16 types of sacred items",
                "Aarti & Pushpanjali: Final prayers and offering of flowers"
            ],
            ritual_badges: ["Live Streaming Available", "Prasad Delivery", "Digital Certificate"],
            blessings_cards: [
                { icon: "🕉️", title: "Peace", description: "Mental serenity and focus" },
                { icon: "💰", title: "Prosperity", description: "Financial growth and stability" }
            ],
            timing_subtitle: "Best Timing",
            timing_muhurat_text: "Wednesday Morning or Chaturthi Tithi",
            footer_title: "Bring Success to Your Life",
            footer_description: "Connect with Lord Ganesha today for a hurdle-free tomorrow."
        },
        {
            name: "Maha Shivratri Special Test",
            slug: "maha-shivratri-test",
            tagline: "Celebrate the Great Night of Shiva for spiritual liberation",
            hero_badge_text: "Exclusive Spiritual Ritual",
            about_heading: "The Eternal Path",
            about_subheading: "Awaken Your Inner Consciousness",
            description: "Maha Shivratri is the most auspicious night for the devotees of Lord Shiva. This special puja is designed for deep meditation and karmic cleansing.",
            theme_color: "purple",
            is_active: true,
            ritual_steps: [
                "Abhishekam: Ceremonial bathing of the Shiva Lingam with Panchamrut",
                "Bilva Arpan: Offering of sacred Bilva leaves with chanting",
                "Jagran Jaap: Continuous chanting of Om Namah Shivaya throughout the night"
            ],
            footer_title: "Experience the Shiva Tattva",
            footer_description: "Join the collective consciousness on this sacred night."
        }
    ];

    for (const puja of testPujas) {
        const { data, error } = await supabase
            .from('poojas')
            .upsert(puja, { onConflict: 'slug' });

        if (error) {
            console.error(`Error inserting ${puja.name}:`, error);
        } else {
            console.log(`Successfully inserted/updated ${puja.name}`);
        }
    }
}

insertTestData();
