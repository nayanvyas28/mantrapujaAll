-- Create Festivals Table
CREATE TABLE IF NOT EXISTS festivals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    date DATE NOT NULL,
    short_desc TEXT,
    description TEXT,
    hero_image TEXT,
    hero_image_alt TEXT,
    significance JSONB DEFAULT '{
        "mythology": "",
        "cultural": "",
        "spiritual": ""
    }'::JSONB,
    rituals JSONB DEFAULT '[]'::JSONB,
    regional_variations JSONB DEFAULT '{}'::JSONB,
    faqs JSONB DEFAULT '[]'::JSONB,
    gallery JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE festivals ENABLE ROW LEVEL SECURITY;

-- Create Policy for public read access
CREATE POLICY "Allow public read access to festivals" ON festivals
    FOR SELECT USING (true);

-- Create Policy for admin service role (full access)
CREATE POLICY "Allow all access to authenticated users" ON festivals
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert Initial Data (Maha Shivratri, Holi, etc.)
INSERT INTO festivals (name, slug, date, short_desc, description, hero_image, hero_image_alt, significance, rituals, regional_variations, faqs)
VALUES 
(
    'Maha Shivratri', 
    'maha-shivratri', 
    '2024-03-08', 
    'The Great Night of Lord Shiva, celebrating his cosmic dance and marriage to Parvati.', 
    'Maha Shivratri is a Hindu festival celebrated annually in honour of the god Shiva. The name also refers to the night when Shiva performs the heavenly dance.', 
    '/puja images/rudra abhishek 1.png', 
    'Shivlinga with milk offering during Maha Shivratri',
    '{"mythology": "It is believed that on this night Shiva performed the Tandava Nritya or the dance of primordial creation, preservation and destruction.", "cultural": "Devotees observe a strict fast and keep a night-long vigil (jagaran) while meditating on Shiva.", "spiritual": "It symbolizes the overcoming of darkness and ignorance in life and the world."}'::JSONB,
    '[{"name": "Abhishekam", "timing": "Throughout the night (4 Praharas)", "description": "Bathing the Shiva Linga with milk, honey, water, and bel leaves."}, {"name": "Fasting", "timing": "Sunrise to next Sunrise", "description": "Abstaining from food and water to purify the body and mind."}]'::JSONB,
    '{"north": "Celebrated with great fervor in Varanasi with processions to Kashi Vishwanath.", "south": "Special poojas in all major Shiva temples like Rameshwaram and Chidambaram."}'::JSONB,
    '[{"answer": "Staying awake (Jagaran) is believed to help the vertical upsurge of energy in the human system.", "question": "Why keep awake all night?"}, {"answer": "Bel patra (Bilva leaves), milk, and water are the most auspicious offerings.", "question": "What to offer Shiva?"}]'::JSONB
),
(
    'Holi', 
    'holi', 
    '2024-03-25', 
    'The Festival of Colors, signifying the victory of good over evil and the arrival of spring.', 
    'Holi is a popular ancient Hindu festival, also known as the "Festival of Love", the "Festival of Colors", and the "Festival of Spring".', 
    '/festivals/holi-hero.jpg', 
    'Vibrant colors of Holi festival celebration',
    '{"mythology": "Commemorates the burning of Holika and saving of Prahlad by Lord Vishnu (Narasimha Avatar).", "cultural": "People play with colors, visit friends and family, and share sweets like Gujiya.", "spiritual": "It marks the triumph of devotion and truth over ego and evil."}'::JSONB,
    '[{"name": "Holika Dahan", "timing": "Night before Holi", "description": "Bonfire lit on the night before Holi to symbolize burning of evil."}, {"name": "Rangwali Holi", "timing": "Morning of Holi", "description": "Playing with colored powders and water."}]'::JSONB,
    '{"north": "Lathmar Holi in Barsana and Nandgaon is famous.", "west": "In Maharashtra, Puran Poli is prepared and offered to the fire."}'::JSONB,
    '[{"answer": "To pray for the destruction of internal impurities and ego.", "question": "Why is Holika Dahan performed?"}, {"answer": "It is celebrated globally by the Indian diaspora and many others who enjoy the festive spirit.", "question": "Is Holi celebrated only in India?"}]'::JSONB
),
(
    'Ram Navami', 
    'ram-navami', 
    '2024-04-17', 
    'Birth anniversary of Lord Rama, the seventh avatar of Vishnu.', 
    'Ram Navami is a spring Hindu festival that celebrates the birthday of the god Rama. He is particularly important to the Vaishnavism tradition of Hinduism.', 
    '/festivals/ram-navami-hero.jpg', 
    'Idol of Lord Rama during Ram Navami',
    '{"mythology": "Marks the birth of Rama to King Dasharatha and Queen Kausalya in Ayodhya.", "cultural": "Temples are decorated, Ramayana is recited, and community meals (Bhandara) are organized.", "spiritual": "Celebrates the embodiment of dharma (righteousness) and virtue."}'::JSONB,
    '[{"name": "Rathyatra", "timing": "Mid-day", "description": "Chariot processions of Rama, Sita, Lakshmana, and Hanuman."}, {"name": "Kanya Pujan", "timing": "Morning", "description": "Worshipping young girls as forms of the Goddess (often concluding Navratri)."}]'::JSONB,
    '{"north": "Huge celebrations in Ayodhya, the birthplace of Rama.", "south": "In Bhadrachalam, huge wedding ceremony (Kalyanam) of Rama and Sita happens."}'::JSONB,
    '[{"answer": "Panakam (sweet drink) is offered to Rama and distributed as prasad, especially in South India.", "question": "What is the significance of Panakam?"}]'::JSONB
),
(
    'Ganesh Chaturthi', 
    'ganesh-chaturthi', 
    '2024-09-07', 
    'Ten-day festival celebrating the arrival of Ganesha to earth.', 
    'Ganesh Chaturthi is a Hindu festival celebrating the arrival of Ganesha to earth from Kailash Parvat with his mother Goddess Parvati.', 
    '/festivals/ganesh-chaturthi-hero.jpg', 
    'Ganesh Visarjan procession with large idol',
    '{"mythology": "Ganesha is revered as the remover of obstacles and the god of new beginnings.", "cultural": "Installation of clay idols at homes and public pandals.", "spiritual": "Invoking wisdom and prosperity while removing obstacles."}'::JSONB,
    '[{"name": "Prana Pratishtha", "timing": "Day 1", "description": "Infusing the deity into the idol with mantras."}, {"name": "Visarjan", "timing": "Day 10 (Anant Chaturdashi)", "description": "Immersion of the idol in water, symbolizing the cycle of creation and dissolution."}]'::JSONB,
    '{"west": "Maharashtra hosts the grandest celebrations with massive public idols.", "south": "Gowri Habba is celebrated a day before in Karnataka."}'::JSONB,
    '[{"answer": "To respect nature, as the idol returns to the earth (water) after the festival.", "question": "Why clay idols?"}]'::JSONB
),
(
    'Navratri (Sharad)', 
    'navratri', 
    '2024-10-03', 
    'Nine nights dedicated to the worship of the Divine Feminine (Durga).', 
    'Navratri is an annual Hindu festival observed in the honour of the goddess Durga. It spans over nine nights (and ten days), first in the month of Chaitra and again in the month of Ashvin.', 
    '/festivals/navratri-hero.jpg', 
    'Goddess Durga idol during Navratri festival',
    '{"mythology": "Celebrates Durga''s battle and victory over the buffalo demon Mahishasura.", "cultural": "Garba and Dandiya Raas dances in Gujarat/Mumbai. Durga Puja in Bengal.", "spiritual": "Purification of the mind and awakening of inner shakti (power)."}'::JSONB,
    '[{"name": "Ghatasthapana", "timing": "Day 1", "description": "Invoking the Goddess into a kalash (pot)."}, {"name": "Kanya Pujan", "timing": "Ashtami/Navami", "description": "Worship of young girls representing the nine forms of Durga."}]'::JSONB,
    '{"east": "Durga Puja involves elaborate pandals and idols of the Goddess.", "west": "Garba and Dandiya nights are the highlight."}'::JSONB,
    '[{"answer": "Each night is dedicated to one of the 9 avatars of Durga (Navadurga).", "question": "Why 9 nights?"}]'::JSONB
),
(
    'Diwali', 
    'diwali', 
    '2024-11-01', 
    'The Festival of Lights, celebrating the return of Rama and Lakshmi Puja.', 
    'Diwali is a festival of lights and one of the major festivals celebrated by Hindus, Jains, Sikhs and some Buddhists.', 
    '/festivals/diwali-hero.jpg', 
    'Earthen lamps (Diyas) lit for Diwali celebration',
    '{"mythology": "Return of Lord Rama to Ayodhya after 14 years of exile. Worship of Goddess Lakshmi.", "cultural": "Lighting lamps (diyas), bursting crackers, sharing sweets.", "spiritual": "Victory of light over darkness, good over evil, and knowledge over ignorance."}'::JSONB,
    '[{"name": "Lakshmi Puja", "timing": "Evening of Amavasya", "description": "Worship of Goddess Lakshmi for wealth and prosperity."}, {"name": "Dhanteras", "timing": "2 days before Diwali", "description": "Buying gold/silver/utensils as a sign of good luck."}]'::JSONB,
    '{"north": "Focus on Rama''s return.", "east": "Kali Puja is celebrated on the same night in Bengal."}'::JSONB,
    '[{"answer": "To guide Goddess Lakshmi into the home and dispel darkness.", "question": "Why light Diyas?"}]'::JSONB
);
