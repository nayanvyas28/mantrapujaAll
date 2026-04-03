
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
    console.log('Inserting test puja data using confirmed schema...');

    const testPujas = [
        {
            name: "Ganesh Puja Standard",
            slug: "ganesh-puja-standard",
            tagline: "Begin your journey with the Remover of Obstacles",
            hero_badge_text: "Sacred New Start",
            hero_glass_badge_label: "Conducted By",
            hero_glass_badge_value: "Varanasi High Priests",
            about_heading: "Lord of Wisdom",
            about_subheading: "Invoking Divine Success",
            description: "Ganesha, the elephant-headed deity, is the first to be worshiped in any Vedic ritual. This puja ensures that your path is cleared of all hurdles.",
            about_significance_text: "Performing this ritual brings clarity of thought and ensures that no external obstacles hinder your progress.",
            about_target_audience_text: "Perfect for students before exams, professionals starting new jobs, or families moving into a new home.",
            theme_color: "gold",
            is_active: true,
            why_perform_cards: [
                { icon: "🌟", title: "Victory", description: "Succeed in your endeavors" },
                { icon: "💡", title: "Knowledge", description: "Gain better understanding" }
            ],
            ritual_process_section_title: "Vinayaka Vidhi",
            ritual_steps: [
                "Sankalp: Taking the holy vow for your specific intent",
                "Abhishekam: Sacred bath with honey, milk, and curd",
                "Arati: Final light offering with hymns"
            ],
            ritual_badges: ["Expert Pandits", "Prasad Home Delivery"],
            blessings_cards: [
                { icon: "🕉️", title: "Stability", description: "Emotional and professional balance" }
            ],
            timing_subtitle: "Shubh Muhurat",
            timing_muhurat_text: "Morning hours on any Wednesday",
            footer_title: "Invite Success Home",
            footer_description: "Take the first step towards a blessed life."
        },
        {
            name: "Durga Puja Standard",
            slug: "durga-puja-standard",
            tagline: "Invoke the Supreme Shakti for strength and protection",
            hero_badge_text: "Divine Power Ritual",
            about_heading: "The Great Mother",
            about_subheading: "Victory Over Evil Forces",
            description: "Durga Puja is a celebration of the victory of Goddess Durga over the buffalo demon Mahishasura. It is a ritual of protection and courage.",
            theme_color: "maroon",
            is_active: true,
            ritual_steps: [
                "Durga Saptshati Jaap: Recitation of 700 verses of the Goddess",
                "Homa: Sacred fire ceremony for purifying energy",
                "Shakti Sanchar: Invoking divine strength within"
            ],
            timing_subtitle: "Sacred Timing",
            timing_muhurat_text: "During Navratri or Ashtami Tithi",
            footer_title: "Awaken Your Inner Shakti",
            footer_description: "Connect with the Supreme Goddess for ultimate protection."
        }
    ];

    for (const puja of testPujas) {
        // Remove ritual_process_subtitle from the object since it's not in the confirmed schema
        const { ritual_process_subtitle, ...pujaToInsert } = puja;

        const { data, error } = await supabase
            .from('poojas')
            .upsert(pujaToInsert, { onConflict: 'slug' });

        if (error) {
            console.error(`Error inserting ${puja.name}:`, error);
        } else {
            console.log(`Successfully inserted/updated ${puja.name}`);
        }
    }
}

insertTestData();
