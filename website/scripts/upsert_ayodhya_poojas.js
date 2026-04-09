const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const ayodhyaPoojas = [
    {
        name: 'Hanuman Garhi Sindoor Pooja',
        slug: 'hanuman-garhi-sindoor',
        tagline: 'Invoking the Strength & Protection of the Monkey God',
        hero_badge_text: 'Exclusive Ayodhya Ritual',
        hero_glass_badge_label: 'Performed at',
        hero_glass_badge_value: 'Hanuman Garhi Fort',
        theme_color: 'saffron',
        benefits: ['Strength & Fearlessness', 'Protection from Negativity', 'Saturn Dosha Relief'],
        ritual_badges: ['Sindoor from Hanuman Garhi', 'Vedic Hanuman Chalisa Path', 'Prasad from Ayodhya'],
        about_heading: 'Vajrate Bhaktim',
        about_subheading: 'Unwavering Devotion',
        about_description: 'The Hanuman Garhi Sindoor Pooja is a sacred ritual performed at the historic fort-temple of Lord Hanuman in Ayodhya. Offering Sindoor (Vermilion) to Hanuman Ji symbolises his eternal devotion to Lord Ram and is believed to grant the devotee immense mental strength, protection from evil energies, and relief from the malefic effects of Shani (Saturn).',
        about_significance_label: 'Spiritual Significance',
        about_significance_text: 'In the Ramayana, Hanuman Ji applied Sindoor over his entire body to ensure Lord Ram\'s longevity. Performing this pooja establishes a deep connection with Hanuman Ji\'s protective energy.',
        about_target_audience_label: 'Who Should Perform?',
        about_target_audience_text: 'Those seeking protection, career stability, or those facing difficult life phases (Shani Sadesati).',
        why_perform_section_title: 'Why Perform this Pooja?',
        why_perform_cards: [
            { icon: '🛡️', title: 'Divine Protection', description: 'Creates a shield against hidden enemies and negative vibrations.' },
            { icon: '💪', title: 'Mental Fortitude', description: 'Removes fear and anxiety, replacing them with courage.' },
            { icon: '🪐', title: 'Shani Shanti', description: 'Pacifies the negative effects of Planet Saturn.' },
            { icon: '🔥', title: 'Inner Energy', description: 'Ignites the fire of devotion and spiritual growth.' }
        ],
        ritual_process_section_title: 'Authentic Ritual Process',
        ritual_steps: [
            { step: '01', title: 'Sankalpam', description: 'Personalized vow with name and gotra by the priest at Hanuman Garhi.' },
            { step: '02', title: 'Sindoor Arpan', description: 'Special Vermilion mixed with jasmine oil is offered to Lord Hanuman.' },
            { step: '03', title: 'Chalisa Path', description: 'Chanting of Hanuman Chalisa by Vedic scholars.' },
            { step: '04', title: 'Maha Aarti', description: 'The grand lamps are waved to celebrate the deity\'s presence.' },
            { step: '05', title: 'Prasad Arpan', description: 'Gram flour laddoos are offered and then shared as blessings.' }
        ],
        blessings_section_title: 'Divine Blessings',
        blessings_cards: [
            { icon: '🦁', title: 'Courage', description: 'Attain the heart of a lion to face life\'s challenges.' },
            { icon: '🧘', title: 'Focus', description: 'Improved concentration and clarity in decision making.' },
            { icon: '🏠', title: 'Safety', description: 'Protect your home and family from evil eye.' },
            { icon: '✨', title: 'Grace', description: 'Receive the special grace of the supreme devotee.' }
        ],
        timing_section_title: 'Auspicious Timing',
        timing_subtitle: 'Hanuman Garhi Muhurat',
        timing_occasions_list: ['Tuesdays', 'Saturdays', 'Hanuman Jayanti', 'Sunrise Period'],
        timing_muhurat_text: 'Most effective when performed on Tuesdays and Saturdays early in the morning.',
        testimonials_list: [
            { name: 'Vikram Singh', location: 'Ayodhya', comment: 'The energy at Hanuman Garhi is unmatched. This pooja gave me great strength during my crisis.', rating: 5, avatar: 'VS' }
        ],
        faq_list: [
            { question: 'How do I receive the Sindoor?', answer: 'The energized Sindoor prasad is shipped to your registered address via express courier.' },
            { question: 'Can I watch it live?', answer: 'Yes, we provide a live link for the Sankalpam and initial steps of the pooja.' }
        ],
        footer_title: 'Invoke the Protector',
        footer_description: 'Experience the raw power of Lord Hanuman from his own fort in Ayodhya.',
        seo_title: 'Hanuman Garhi Sindoor Pooja | Ayodhya Protection Ritual | Book Online',
        seo_description: 'Book Hanuman Garhi Sindoor Pooja in Ayodhya. Authentic Vedic ritual for protection, health, and relief from Shani Dosha. Performed by expert priests. Receive prasad at home.',
        seo_keywords: 'Hanuman Garhi Sindoor Pooja, Ayodhya Hanuman Puja, Protection Ritual, Shani Shanti Pooja',
        price: 3100.00,
        is_active: true,
        is_featured: true,
        is_hero: false
    },
    {
        name: 'Sita Rasoi Annakut Pooja',
        slug: 'sita-rasoi-annakut',
        tagline: 'Blessings of Abundance from Mother Sita\'s Sacred Kitchen',
        hero_badge_text: 'Prosperity & Health',
        hero_glass_badge_label: 'Sanctified at',
        hero_glass_badge_value: 'Sita Rasoi, Ayodhya',
        theme_color: 'gold',
        benefits: ['Food Abundance', 'Family Harmony', 'Health for Women'],
        ritual_badges: ['Annakut Offering', 'Mantra Path for Sita Mata', 'Kitchen Prosperity Blessing'],
        about_heading: 'Annapurna Krupa',
        about_subheading: 'Eternal Nourishment',
        about_description: 'Sita Rasoi is the legendary kitchen of Mata Sita in Ayodhya. The Annakut Pooja performed here involves offering a mountain of various food preparations to the divine mother. This ritual is primarily performed to ensure that the devotee\'s home is always filled with abundance, health, and peace.',
        about_significance_label: 'Spiritual Significance',
        about_significance_text: 'Mata Sita is an incarnation of Goddess Lakshmi (Annapurna). Worshipping her in her kitchen aspect ensures that one never faces scarcity of food or resources.',
        about_target_audience_label: 'Who Should Perform?',
        about_target_audience_text: 'Families, newly-weds, and those wishing to bless their household with lasting prosperity.',
        why_perform_section_title: 'Why Perform this Pooja?',
        why_perform_cards: [
            { icon: '🍚', title: 'Food Security', description: 'Ensures your kitchen and home never run out of nourishment.' },
            { icon: '👨‍👩‍👦', title: 'Family Bonds', description: 'Strengthens the unity and love between family members.' },
            { icon: '🩺', title: 'Women\'s Health', description: 'Special blessings for the health of women and children.' },
            { icon: '💰', title: 'Prosperity', description: 'Attracts financial growth and stable income.' }
        ],
        ritual_process_section_title: 'Vedic Ritual Steps',
        ritual_steps: [
            { step: '01', title: 'Kitchen Sanctification', description: 'The sacred area of Sita Rasoi is prepared with Vedic chants.' },
            { step: '02', title: 'Annakut Preparation', description: '56 types of foods (Chhappan Bhog) are symbolically prepared.' },
            { step: '03', title: 'Sita-Ram Puja', description: 'Joint worship of Sita Mata and Lord Ram.' },
            { step: '04', title: 'Naivedya Arpan', description: 'The food mountain is offered to the deities with specialized mantras.' },
            { step: '05', title: 'Aarti', description: 'Gratitude prayer for the abundance received.' }
        ],
        blessings_section_title: 'Divine Blessings',
        blessings_cards: [
            { icon: '🏠', title: 'Happy Home', description: 'Establish a vibration of peace and joy in your living space.' },
            { icon: '🍇', title: 'Abundance', description: 'Manifestation of material and spiritual wealth.' },
            { icon: '🛡️', title: 'Protection', description: 'Shielding of the family from health issues.' },
            { icon: '🌿', title: 'Stability', description: 'Consistent growth in business and career.' }
        ],
        timing_section_title: 'Auspicious Timing',
        timing_subtitle: 'Sita Mata Muhurat',
        timing_occasions_list: ['Full Moon Days (Purnima)', 'Fridays', 'Diwali Annakut', 'Navratri'],
        timing_muhurat_text: 'Most effective on Fridays and Purnima days for prosperity.',
        testimonials_list: [
            { name: 'Priya Iyer', location: 'Bangalore', comment: 'A very unique pooja. Felt a lot of positive energy in my home after booking this.', rating: 5, avatar: 'PI' }
        ],
        faq_list: [
            { question: 'What is included in the Prasad?', answer: 'You receive dry fruits, sacred soil from Ayodhya, and a miniature Sita Rasoi yantra.' }
        ],
        footer_title: 'Invite Abundance',
        footer_description: 'Let Mother Sita bless your home with eternal nourishment and joy.',
        seo_title: 'Sita Rasoi Annakut Pooja | Ayodhya Family Prosperity | Book Online',
        seo_description: 'Book Sita Rasoi Annakut Pooja in Ayodhya. Authentic ritual for family harmony, health, and financial abundance. Performed at the sacred kitchen of Mata Sita.',
        seo_keywords: 'Sita Rasoi Pooja, Annakut Pooja Ayodhya, Sita Mata Puja, Prosperity Ritual',
        price: 2500.00,
        is_active: true,
        is_featured: false,
        is_hero: false
    },
    {
        name: 'Sarayu Snan Pooja',
        slug: 'sarayu-snan-pooja',
        tagline: 'Purify Your Soul in the Sacred Waters of Sarayu',
        hero_badge_text: 'Purification & Peace',
        hero_glass_badge_label: 'Conducted at',
        hero_glass_badge_value: 'Sarayu Ghats, Ayodhya',
        theme_color: 'blue',
        benefits: ['Sin Cleansing', 'Ancestral Peace', 'Spiritual Clarity'],
        ritual_badges: ['Sarayu River Puja', 'Deep Dan (Lamp Offering)', 'Vedic River Chants'],
        about_heading: 'Punya Salila',
        about_subheading: 'The River of Liberation',
        about_description: 'The Sarayu river is deeply connected to the life and departure of Lord Ram. A Snan (holy dip) or the Sarayu Snan Pooja at the banks of this sacred river is believed to purify one from lifetimes of negative karma (sins) and provide peace to one\'s ancestors (Pitrus).',
        about_significance_label: 'Spiritual Significance',
        about_significance_text: 'Sarayu is mentioned in ancient Puranas as the river that witnessed the entire Ramayana. It is the gate to Vaikuntha for Ayodhya residents.',
        about_target_audience_label: 'Who Should Perform?',
        about_target_audience_text: 'Those seeking spiritual purification, relief from Pitru Dosha, or spiritual peace.',
        why_perform_section_title: 'Why Perform this Pooja?',
        why_perform_cards: [
            { icon: '💧', title: 'Karma Purification', description: 'Washes away negative energies and past sins.' },
            { icon: '🕊️', title: 'Pitru Shanti', description: 'Grants peace to departed family members and ancestors.' },
            { icon: '🧘', title: 'Mental Clarity', description: 'The river\'s energy calms the mind and enhances wisdom.' },
            { icon: '🕉️', title: 'Lord Ram\'s Grace', description: 'Direct spiritual connection with the essence of Ram Lalla.' }
        ],
        ritual_process_section_title: 'Ritual Process steps',
        ritual_steps: [
            { step: '01', title: 'Ghat Sankalpam', description: 'Pooja begins at the Sarayu ghat with your name and intent.' },
            { step: '02', title: 'Saryu Maiya Puja', description: 'Worship of the river goddess with milk and flowers.' },
            { step: '03', title: 'Symbolic Snan', description: 'If remote, the priest performs a dip on your behalf with specific mantras.' },
            { step: '04', title: 'Deep Dan', description: 'Sacred lamps are floated in the river for ancestral peace.' },
            { step: '05', title: 'Ganga-Saryu Aarti', description: 'Concluding prayers to the life-giving waters.' }
        ],
        blessings_section_title: 'Divine Blessings',
        blessings_cards: [
            { icon: '🌈', title: 'Inner Peace', description: 'Freedom from stress and mental agitations.' },
            { icon: '👨‍👩‍👧', title: 'Ancestral Grace', description: 'Blessings from forefathers for future generations.' },
            { icon: '✨', title: 'Aura Cleansing', description: 'Establishing a vibrant and positive personal aura.' },
            { icon: '🙏', title: 'Liberation', description: 'Path towards spiritual freedom and enlightenment.' }
        ],
        timing_section_title: 'Timings for Snan',
        timing_subtitle: 'Celestial Flow',
        timing_occasions_list: ['Sunrise Hour', 'Amavasya', 'Purnima', 'Solar Or Lunar Eclipse'],
        timing_muhurat_text: 'Most powerful when performed during the Brahma Muhurta (sunrise) period.',
        testimonials_list: [
            { name: 'Ananya Sharma', location: 'Delhi', comment: 'A very calming experience even through the virtual participation. Highly recommended.', rating: 5, avatar: 'AS' }
        ],
        faq_list: [
            { question: 'How do you do snan for me?', answer: 'The priest takes a dip in the Sarayu on your behalf after taking your Sankalp, ensuring the spiritual benefit is transferred to you.' }
        ],
        footer_title: 'Purify Your Life',
        footer_description: 'Let the sacred Sarayu wash away your obstacles and bring eternal peace.',
        seo_title: 'Sarayu Snan Pooja | Ayodhya River Purification | Book Online',
        seo_description: 'Book Sarayu Snan Pooja in Ayodhya. Authentic Vedic ritual for sin purification, ancestral peace, and spiritual clarity. Performed at the sacred Sarayu Ghats.',
        seo_keywords: 'Sarayu Snan Pooja, Ayodhya River Puja, Pitru Shanti Ayodhya, River Ritual',
        price: 2100.00,
        is_active: true,
        is_featured: false,
        is_hero: false
    },
    {
        name: 'Ram Navami Special Seva',
        slug: 'ram-navami-special',
        tagline: 'Celebrate the Divine Advent of Maryada Purushottam Shri Ram',
        hero_badge_text: 'Festival Special',
        hero_glass_badge_label: 'Celebrated at',
        hero_glass_badge_value: 'Ayodhya Dham',
        theme_color: 'saffron',
        benefits: ['General Well-being', 'Family Harmony', 'Spiritual Enlightenment'],
        ritual_badges: ['Ram Lalla Janamotsav', 'Special Alankaram Seva', 'Maha Prasad from Ayodhya'],
        about_heading: 'Shri Ram Janmotsav',
        about_subheading: 'The Birth of Divinity',
        about_description: 'Ram Navami marks the birth of Lord Ram. The Special Seva in Ayodhya during this time is a grand affair, involving elaborate rituals, continuous chanting, and magnificent decorations. Participating in this seva is believed to bring the special grace of Lord Ram for overall success and peace in life.',
        about_significance_label: 'Spiritual Significance',
        about_significance_text: 'Ram Navami is the apex of the Hindu calendar in Ayodhya. It represents the triumph of Dharma over Adharma.',
        about_target_audience_label: 'Who Should Perform?',
        about_target_audience_text: 'Every devotee of Lord Ram wishing to celebrate his advent in his own birthplace.',
        why_perform_section_title: 'Why Perform this Pooja?',
        why_perform_cards: [
            { icon: '🔱', title: 'Establish Dharma', description: 'Helps in aligning your life with the principles of righteousness.' },
            { icon: '🏹', title: 'Victory', description: 'Blessings for overcoming life\'s major battles and challenges.' },
            { icon: '👨‍👩‍👧', title: 'Family Unity', description: 'Lord Ram is the ideal for family relationships.' },
            { icon: '🌟', title: 'Supreme Grace', description: 'Tapping into the intense positive energy of the festival.' }
        ],
        ritual_process_section_title: 'Grand Ritual Process',
        ritual_steps: [
            { step: '01', title: 'Festival Sankalpam', description: 'Grand vow taking for all participants of the special seva.' },
            { step: '02', title: 'Ram Raksha Stotra', description: 'Continuous chanting of protective hymns for 24 hours.' },
            { step: '03', title: 'Kanak Bhawan Seva', description: 'Special offerings made to the deities in their golden abode.' },
            { step: '04', title: 'Janamotsav Puja', description: 'The peak ritual at 12 noon celebrating the birth of Lord Ram.' },
            { step: '05', title: 'Maha Prasad Distribution', description: 'Sharing the blessed food with thousands of devotees.' }
        ],
        blessings_section_title: 'Divine Blessings',
        blessings_cards: [
            { icon: '📈', title: 'Global Success', description: 'Manifestation of goals on a large scale.' },
            { icon: '🛡️', title: 'Divine Protection', description: 'Lord Ram\'s bow protects you from all directions.' },
            { icon: '🧘', title: 'Wisdom', description: 'Gaining the intellect to choose right from wrong.' },
            { icon: '💰', title: 'Prosperity', description: 'Establishment of Ram-Rajya in your own life.' }
        ],
        timing_section_title: 'Festival Timing',
        timing_subtitle: 'Ram Navami Muhurat',
        timing_occasions_list: ['Ram Navami Day', 'Chaitra Navratri', 'Sunrise to Midnight'],
        timing_muhurat_text: 'Most effective at 12:00 PM on the day of Ram Navami.',
        testimonials_list: [
            { name: 'Rahul Mehta', location: 'Mumbai', comment: 'Unforgettable energy. Booking this was the best decision for my family this year.', rating: 5, avatar: 'RM' }
        ],
        faq_list: [
            { question: 'How early should I book?', answer: 'Ram Navami slots fill up 2-3 weeks in advance. We recommend booking early for inclusion in the Sankalpam list.' }
        ],
        footer_title: 'Celebrate the King',
        footer_description: 'Be part of the grandest celebration in the history of Ayodhya.',
        seo_title: 'Ram Navami Special Seva | Ayodhya Janmotsav | Book Online',
        seo_description: 'Book Ram Navami Special Seva in Ayodhya. Participate in the birth celebrations of Lord Ram with authentic Vedic rituals, puja, and prasad.',
        seo_keywords: 'Ram Navami Pooja, Ayodhya Ram Navami, Ram Janmotsav Seva, Festival Puja Ayodhya',
        price: 5100.00,
        is_active: true,
        is_featured: true,
        is_hero: true
    },
    {
        name: 'Hanuman Garhi Festival Seva',
        slug: 'hanuman-garhi-festival',
        tagline: 'Join the Grand Festivities at the Fort of Lord Hanuman',
        hero_badge_text: 'Festival Celebration',
        hero_glass_badge_label: 'Location',
        hero_glass_badge_value: 'Hanuman Garhi, Ayodhya',
        theme_color: 'saffron',
        benefits: ['Collective Positive Energy', 'Victory Over Obstacles', 'Community Blessings'],
        ritual_badges: ['Special Alankaram', 'Grand Chhappan Bhog', 'Night-long Kirtan Seva'],
        about_heading: 'Mahaveer Jayanti',
        about_subheading: 'The Celebration of Power',
        about_description: 'During festivals like Hanuman Jayanti or Diwali, Hanuman Garhi transforms into a hub of intense spiritual energy. The Festival Seva includes special decorations (Alankaram), grand food offerings, and powerful mantra chanting. It is meant for those who want to be part of the collective auspiciousness of these events.',
        about_significance_label: 'Spiritual Significance',
        about_significance_text: 'Festivals enhance the manifest power of the deity. Hanuman Garhi is where Hanuman Ji resides to protect Ayodhya.',
        about_target_audience_label: 'Who Should Perform?',
        about_target_audience_text: 'Groups, communities, or individuals seeking to tap into the high-vibration energy of sacred festivals.',
        why_perform_section_title: 'Why Perform this Pooja?',
        why_perform_cards: [
            { icon: '🚩', title: 'Victory', description: 'Harness the energy of Hanuman Ji to win over difficulties.' },
            { icon: '🤝', title: 'Unity', description: 'Builds collective strength and community bonds.' },
            { icon: '🍬', title: 'Gratitude', description: 'A way to offer grand thanks for recent successes.' },
            { icon: '🌀', title: 'Vibration', description: 'Immersion in the high-frequency chanting and bells of the fort.' }
        ],
        ritual_process_section_title: 'Festival Ritual Flow',
        ritual_steps: [
            { step: '01', title: 'Grand Sankalpam', description: 'Massive prayer session to initiate the festival activities.' },
            { step: '02', title: 'Special Abhishek', description: 'Bathing of the deity with rare herbs and panchamrit.' },
            { step: '03', title: 'Vastra Seva', description: 'Offering new silken robes and jewelry to Hanuman Ji.' },
            { step: '04', title: 'Chhappan Bhog', description: '56 types of sweets and savories are offered in a magnificent display.' },
            { step: '05', title: 'Shahi Aarti', description: 'Royal lamps are lit with thousands of oil wicks.' }
        ],
        blessings_section_title: 'Divine Blessings',
        blessings_cards: [
            { icon: '🛡️', title: 'Invincibility', description: 'Strengthening of the protective aura around the devotee.' },
            { icon: '📈', title: 'Rapid Growth', description: 'Festival sevas are known for manifesting results faster.' },
            { icon: '🧘', title: 'Deep Devotion', description: 'Experiencing the peak of spiritual bliss.' },
            { icon: '🎁', title: 'Blessings', description: 'Unique prasad that only festival participants receive.' }
        ],
        timing_section_title: 'Auspicious Festival Timing',
        timing_subtitle: 'Festival Muhurat',
        timing_occasions_list: ['Hanuman Jayanti', 'Diwali', 'Kartik Purnima', 'Tuesdays of Chaitra'],
        timing_muhurat_text: 'Most effective during the peak festival hours as advised by the main temple priest.',
        testimonials_list: [
            { name: 'Suresh Reddy', location: 'Hyderabad', comment: 'The Alankaram was beautiful. I felt a direct connection with the deity through the photos sent.', rating: 5, avatar: 'SR' }
        ],
        faq_list: [
            { question: 'How do I see the decoration?', answer: 'We send high-resolution photos and video clips of the Alankaram performed in your name.' }
        ],
        footer_title: 'Join the Grandeur',
        footer_description: 'Don\'t just watch the festival, be a part of its divine essence.',
        seo_title: 'Hanuman Garhi Festival Seva | Ayodhya Grand Puja | Book Online',
        seo_description: 'Book Hanuman Garhi Festival Seva in Ayodhya. join special celebrations for Hanuman Jayanti and other festivals with authentic rituals and grand offerings.',
        seo_keywords: 'Hanuman Garhi Festival Seva, Ayodhya Hanuman Jayanti, Special Puja Ayodhya, Chhappan Bhog Seva',
        price: 4500.00,
        is_active: true,
        is_featured: false,
        is_hero: false
    },
    {
        name: 'Ram Janmabhoomi Maha Abhishek',
        slug: 'ram-janmabhoomi-maha-abhishek',
        tagline: 'The Grandest Ritual for the Sovereign of the Cosmos',
        hero_badge_text: 'Most Premium Seva',
        hero_glass_badge_label: 'Performed at',
        hero_glass_badge_value: 'Ram Janmabhoomi, Ayodhya',
        theme_color: 'saffron',
        benefits: ['Supreme Protection', 'Universal Success', 'Royal Abundance'],
        ritual_badges: ['Panchamrit Abhishek', 'Shahi Shringaar Seva', 'Vedic Maha Havan'],
        about_heading: 'Rajadhiraja Seva',
        about_subheading: 'Imperial Devotion',
        about_description: 'The Maha Abhishek at Ram Janmabhoomi is the most elaborate and premium ritual dedicated to Lord Ram Lalla. It involves the ritualistic bathing of the deity with precious items, followed by a royal decoration (Shringaar). This seva is for those who seek the highest level of divine connection and sovereign-like abundance in their lives.',
        about_significance_label: 'Spiritual Significance',
        about_significance_text: 'Abhishek is a process of deep purification and energisation. At the birthplace of Lord Ram, this energy is at its absolute peak.',
        about_target_audience_label: 'Who Should Perform?',
        about_target_audience_text: 'Leaders, business owners, and those seeking an extraordinary divine intervention in their lives.',
        why_perform_section_title: 'Why Perform this Pooja?',
        why_perform_cards: [
            { icon: '👑', title: 'Royal Success', description: 'Commanding successes and achievements in your chosen field.' },
            { icon: '🛡️', title: 'Total Shielding', description: 'Unbreakable protection from all four directions.' },
            { icon: '💎', title: 'Abundance', description: 'Attracting quality, luxury, and material prosperity.' },
            { icon: '🌌', title: 'Supreme Grace', description: 'Direct spiritual line to the Lord of the Universe (Ram Lalla).' }
        ],
        ritual_process_section_title: 'The Shahi Ritual Process',
        ritual_steps: [
            { step: '01', title: 'Vedic Sankalpam', description: 'Detailed resolution taking including ancestors and family lineage.' },
            { step: '02', title: 'Panchamrit Snanam', description: 'Bathing with Milk, Curd, Ghee, Honey, and Sugarcane Juice.' },
            { step: '03', title: 'Shahi Shringaar', description: 'The deity is dressed in royal silken garments and gold-plated jewelry.' },
            { step: '04', title: 'Maha Havan', description: 'Powerful fire ritual with expensive herbs and continuous Vedic chants.' },
            { step: '05', title: 'Shahi Aarti', description: 'The final royal waving of lamps with traditional Ayodhya nagados (drums).' }
        ],
        blessings_section_title: 'Divine Blessings',
        blessings_cards: [
            { icon: '🏰', title: 'Stability', description: 'Establishment of a firm foundation in business and family life.' },
            { icon: '📈', title: 'Leadership', description: 'Enhanced decision making and commanding presence.' },
            { icon: '✨', title: 'Brilliance', description: 'A radiant and charismatic aura for the devotee.' },
            { icon: '💰', title: 'Infinite Wealth', description: 'Blessings of Goddess Lakshmi through Lord Ram.' }
        ],
        timing_section_title: 'Royal Timing',
        timing_subtitle: 'Maha Abhishek Muhurat',
        timing_occasions_list: ['Pushya Nakshatra', 'Ram Navami', 'Janmabhoomi Anniversary', 'Sundays'],
        timing_muhurat_text: 'Most powerful when performed during Pushya Nakshatra or early Sunday mornings.',
        testimonials_list: [
            { name: 'Anil Ambani (Sample)', location: 'Mumbai', comment: 'A truly grand and spiritually uplifting ceremony. The details were handled with great care.', rating: 5, avatar: 'AA' }
        ],
        faq_list: [
            { question: 'How long does it take?', answer: 'The complete Maha Abhishek with Shringaar takes approximately 4-5 hours.' },
            { question: 'What is Shahi Shringaar?', answer: 'It is a special decoration style where the deity is adorned in regal and expensive fabrics and ornaments.' }
        ],
        footer_title: 'Enter the Royal Court',
        footer_description: 'Experience the majesty of Ram Lalla and transform your destiny.',
        seo_title: 'Ram Janmabhoomi Maha Abhishek | Ayodhya Premium Seva | Book Online',
        seo_description: 'Book the grand Ram Janmabhoomi Maha Abhishek in Ayodhya. Our most premium seva for success, protection, and royal abundance. Performed with full Vedic vidhi.',
        seo_keywords: 'Ram Janmabhoomi Maha Abhishek, Ayodhya Premium Pooja, Ram Lalla Abhishek, Royal Shringaar Seva',
        price: 11000.00,
        is_active: true,
        is_featured: true,
        is_hero: false
    },
    {
        name: 'Ramcharitmanas Path',
        slug: 'ramcharitmanas-path',
        tagline: 'Immerse in the Nectar of Tulsidas\' Eternal Epic',
        hero_badge_text: 'Wisdom & Peace',
        hero_glass_badge_label: 'Conducted by',
        hero_glass_badge_value: 'Ayodhya Scholars',
        theme_color: 'saffron',
        benefits: ['Wisdom & Knowledge', 'Peace at Home', 'Guidance in Life'],
        ritual_badges: ['Complete Akhand Path Option', 'Special Ayodhya Melodies', 'Katha Interpretation'],
        about_heading: 'Manas Bhakti',
        about_subheading: 'The Path of Truth',
        about_description: 'The Ramcharitmanas Path is the rhythmic and devoted recital of the epic poem written by Saint Tulsidas. In Ayodhya, the birth city of the story\'s hero, the path holds special power. It is performed to invite the values of Lord Ram into one\'s home, clear the mental clutter, and find guidance for life\'s difficult decisions.',
        about_significance_label: 'Spiritual Significance',
        about_significance_text: 'Ramcharitmanas is considered the \'Lake of the Acts of Ram\'. Reading or hearing it cleanses the mind of ignorance.',
        about_target_audience_label: 'Who Should Perform?',
        about_target_audience_text: 'Seekers of wisdom, students, and families going through periods of confusion or internal conflict.',
        why_perform_section_title: 'Why Perform this Pooja?',
        why_perform_cards: [
            { icon: '📖', title: 'Wisdom', description: 'Gaining deep insights into life and spiritual truths.' },
            { icon: '🕊️', title: 'Mental Peace', description: 'The rhythmic verses act as a meditation, calming the nerves.' },
            { icon: '🧭', title: 'Life Guidance', description: 'Finding answers to your current dilemmas in the acts of Lord Ram.' },
            { icon: '🏠', title: 'Sanctified Home', description: 'The sound frequency of the verses purifies the house.' }
        ],
        ritual_process_section_title: 'Vedic Recital Process',
        ritual_steps: [
            { step: '01', title: 'Path Arambh', description: 'Invocation of Lord Ganesha and Hanuman Ji to begin the recital.' },
            { step: '02', title: 'Kanda Reading', description: 'Specific chapters (Kandas) are sung with traditional Ayodhya melodies.' },
            { step: '03', title: 'Manas Katha', description: 'The priest explains the hidden meanings of critical verses.' },
            { step: '04', title: 'Bhajan Kirtan', description: 'Devotional songs in between the path segments.' },
            { step: '05', title: 'Manas Aarti', description: 'Worship of the sacred book and the divine couple Sita-Ram.' }
        ],
        blessings_section_title: 'Divine Blessings',
        blessings_cards: [
            { icon: '🧠', title: 'Intellect', description: 'Enhanced memory and analytical skills for students.' },
            { icon: '☮️', title: 'Harmony', description: 'Reduction of ego and conflicts in the family.' },
            { icon: '✨', title: 'Spiritual Growth', description: 'Ascending to higher states of consciousness.' },
            { icon: '🙏', title: 'Humility', description: 'Developing a heart full of devotion and truth.' }
        ],
        timing_section_title: 'Auspicious Reading Time',
        timing_subtitle: 'Manas Muhurat',
        timing_occasions_list: ['Morning (Brahma Muhurta)', 'Evening Sandhya', 'During Navratri', 'Ram Navami'],
        timing_muhurat_text: 'Most effective when heard or read during the early morning hours for absorption.',
        testimonials_list: [
            { name: 'Amit Verma', location: 'Delhi', comment: 'The chanting style was very traditional. It brought a lot of peace to our ancestors.', rating: 5, avatar: 'AV' }
        ],
        faq_list: [
            { question: 'How long does a path take?', answer: 'A partial specialized path takes 3-4 hours, while a full Akhand Path can take 24 hours.' }
        ],
        footer_title: 'Dive into Truth',
        footer_description: 'Let the eternal story of Lord Ram guide you towards a life of purpose.',
        seo_title: 'Ramcharitmanas Path | Ayodhya Vedic Recitation | Book Online',
        seo_description: 'Book Ramcharitmanas Path in Ayodhya. Authentic recitation of the sacred epic by Vedic scholars. Find peace, wisdom, and spiritual guidance through the life of Lord Ram.',
        seo_keywords: 'Ramcharitmanas Path, Ayodhya Manas Path, Ram Katha Ayodhya, Vedic Recitation',
        price: 3500.00,
        is_active: true,
        is_featured: false,
        is_hero: false
    },
    {
        name: 'Ram Janmabhoomi Abhishek',
        slug: 'ram-janmabhoomi-abhishek',
        tagline: 'Daily Divine Connection with Lord Ram Lalla',
        hero_badge_text: 'Standard Vedic Seva',
        hero_glass_badge_label: 'Performed at',
        hero_glass_badge_value: 'Ram Janmabhoomi, Ayodhya',
        theme_color: 'saffron',
        benefits: ['Steady Progress', 'Daily Protection', 'Peace of Mind'],
        ritual_badges: ['Jal Abhishek', 'Chandan Tilak Seva', 'Daily Morning Aarti'],
        about_heading: 'Nitya Seva',
        about_subheading: 'Daily Devotion',
        about_description: 'The Ram Janmabhoomi Abhishek is the standard yet powerful daily ritual performed at the birthplace of Lord Ram. It involves the offering of sacred water, sandalwood paste, and flowers to Ram Lalla. This seva is ideal for devotees who wish to maintain a consistent spiritual bond with the Lord and receive his daily blessings for a balanced life.',
        about_significance_label: 'Spiritual Significance',
        about_significance_text: 'Abhishek is the act of cooling the deity as a mark of respect and love, which in turn cools the agitations of our own lives.',
        about_target_audience_label: 'Who Should Perform?',
        about_target_audience_text: 'Anyone seeking consistent growth, protection, and a daily connection with the divine energy of Ayodhya.',
        why_perform_section_title: 'Why Perform this Pooja?',
        why_perform_cards: [
            { icon: '📈', title: 'Steady Growth', description: 'Ensures incremental and stable progress in all aspects of life.' },
            { icon: '🛡️', title: 'Regular Protection', description: 'A daily shield against common stresses and negative influences.' },
            { icon: '🕊️', title: 'Inner Calm', description: 'Keeping the mind steady even in a fast-paced world.' },
            { icon: '🌻', title: 'Gratitude', description: 'A beautiful way to start or end the day with divine thanks.' }
        ],
        ritual_process_section_title: 'Authentic Daily Process',
        ritual_steps: [
            { step: '01', title: 'Nitya Sankalpam', description: 'Short daily vow for current well-being and success.' },
            { step: '02', title: 'Jal Abhishek', description: 'Offering of pure water (often from Saryu) to the deity.' },
            { step: '03', title: 'Gandhaarpanam', description: 'Applying fragrant sandalwood Paste (Chandan).' },
            { step: '04', title: 'Pushpa Varsha', description: 'Shower of fresh, fragrant flowers from the local gardens.' },
            { step: '05', title: 'Daily Aarti', description: 'Connecting through the rhythmic light offering.' }
        ],
        blessings_section_title: 'Daily Blessings',
        blessings_cards: [
            { icon: '🧘', title: 'Consistency', description: 'Developing a disciplined spiritual habit.' },
            { icon: '🌞', title: 'Bright Aura', description: 'A more magnetic and positive presence every day.' },
            { icon: '✨', title: 'Ease', description: 'Situations in life start flowing with more ease and less friction.' },
            { icon: '🙏', title: 'Devotion', description: 'Gradual increase in deep love for the divine.' }
        ],
        timing_section_title: 'Daily Seva Timing',
        timing_subtitle: 'Nitya Muhurat',
        timing_occasions_list: ['Early Morning', 'Mid Morning', 'Late Evening', 'Noon Aarti'],
        timing_muhurat_text: 'Most effective when performed early in the morning alongside temple timing.',
        testimonials_list: [
            { name: 'Rahul Sharma', location: 'Ayodhya', comment: 'Simple yet deeply moving. I book this every month for my family\'s health.', rating: 5, avatar: 'RS' }
        ],
        faq_list: [
            { question: 'Is this same as Maha Abhishek?', answer: 'No, this is a simplified version for daily or regular participation. Maha Abhishek is much more elaborate.' }
        ],
        footer_title: 'Stay Connected',
        footer_description: 'Maintain a lifelong bond with Lord Ram Lalla from his sacred birthplace.',
        seo_title: 'Ram Janmabhoomi Abhishek | Ayodhya Daily Seva | Book Online',
        seo_description: 'Book Ram Janmabhoomi Abhishek in Ayodhya. A powerful daily ritual for protection, peace, and consistent growth. Performed by Ayodhya priests with Vedic vidhi.',
        seo_keywords: 'Ram Janmabhoomi Abhishek, Ram Lalla Daily Seva, Ayodhya Puja, Morning Abhishek',
        price: 1500.00,
        is_active: true,
        is_featured: false,
        is_hero: false
    }
];

async function upsertAyodhyaPoojas() {
    console.log(`Starting upsert of ${ayodhyaPoojas.length} Ayodhya Poojas...`);

    for (const pooja of ayodhyaPoojas) {
        process.stdout.write(`Upserting ${pooja.name}... `);
        const { data, error } = await supabase
            .from('poojas')
            .upsert(pooja, { onConflict: 'slug' });

        if (error) {
            console.log('FAILED');
            console.error(error);
        } else {
            console.log('SUCCESS');
        }
    }

    console.log('Upsert complete.');
}

upsertAyodhyaPoojas();
