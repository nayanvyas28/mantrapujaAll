-- MASSIVE SQL CONTENT UPDATE
-- Run this in Supabase SQL Editor to fill ALL festival details

-- 1. RAM NAVAMI
UPDATE festivals
SET 
    short_desc = 'Celebrating the birth of Lord Rama, the epitome of righteousness and the seventh incarnation of Lord Vishnu.',
    significance = '{
        "mythology": "Marks the descent of Lord Rama in Ayodhya to destroy the demon king Ravana and re-establish Dharma on earth.",
        "spiritual": "Reminds us of the power of truth and duty (Dharma). Chanting Rama Nama is believed to bring peace and liberation.",
        "cultural": "Grand rath yatras, community feasts (Bhandara), and continuous recitations of the Ramayana in temples."
    }'::jsonb,
    rituals = '[
        {"name": "Rama Puja", "timing": "Madhyahna (Noon)", "description": "Special worship at noon, the exact time of Rama''s birth, with flowers and sweets."},
        {"name": "Ramayana Path", "timing": "Full Day", "description": "Continuous reading or listening of the Ramcharitmanas to invoke divine virtues."},
        {"name": "Panakam Offering", "timing": "Afternoon", "description": "Distribution of Panakam (sweet jaggery water) to symbolize cooling of the soul."}
    ]'::jsonb,
    faqs = '[
        {"question": "Why is Ram Navami celebrated at noon?", "answer": "Lord Rama was born during the Madhyahna period (mid-day) when the sun was at its peak."},
        {"question": "What is the importance of fasting on this day?", "answer": "Fasting helps in purifying the mind and focusing on the virtues of Lord Rama."}
    ]'::jsonb
WHERE slug = 'ram-navami';

-- 2. NAVRATRI
UPDATE festivals
SET 
    short_desc = 'Nine sacred nights dedicated to the worship of the Divine Mother Durga in her nine powerful forms.',
    significance = '{
        "mythology": "Celebrates the victory of Goddess Durga over the buffalo demon Mahishasura after a battle of nine nights.",
        "spiritual": "A period for internal purification, awakening the Kundalini Shakti, and overcoming the ego.",
        "cultural": "Vibrant Garba and Dandiya dances, elaborate Durga Puja pandals, and community worship."
    }'::jsonb,
    rituals = '[
        {"name": "Ghatasthapana", "timing": "Day 1", "description": "Installing a sacred pot (Kalash) to invite the Goddess into the home."},
        {"name": "Kanya Pujan", "timing": "Ashtami/Navami", "description": "Worshipping nine young girls as living representations of the Navadurga."},
        {"name": "Akhand Jyoti", "timing": "All 9 Nights", "description": "Keeping a lamp burning continuously as a symbol of eternal divine presence."}
    ]'::jsonb,
    faqs = '[
        {"question": "What do the nine forms of Durga represent?", "answer": "Each form represents a different aspect of energy, such as courage, wisdom, and compassion."},
        {"question": "Why do we sow barley (Jowar) during Navratri?", "answer": "It symbolizes growth, prosperity, and the first crop of the season."}
    ]'::jsonb
WHERE slug = 'navratri';

-- 3. DIWALI
UPDATE festivals
SET 
    short_desc = 'The festival of lights symbolizing the victory of light over darkness and the return of Lord Rama to Ayodhya.',
    significance = '{
        "mythology": "Commemorates Lord Rama''s return after 14 years of exile and the worship of Goddess Lakshmi for prosperity.",
        "spiritual": "Represents the awakening of the inner light (Atma) and the removal of spiritual ignorance.",
        "cultural": "Decorating homes with Rangoli and Diyas, sharing sweets, and performing Lakshmi Puja with family."
    }'::jsonb,
    rituals = '[
        {"name": "Lakshmi Puja", "timing": "Pradosh Kaal", "description": "Evening worship of Goddess Lakshmi and Lord Ganesha to invite wealth and wisdom."},
        {"name": "Deepotsav", "timing": "Night", "description": "Lighting rows of earthen lamps (Diyas) to dispel the darkness of Amavasya."},
        {"name": "Govardhan Puja", "timing": "Next Day", "description": "Offering a mountain of food to Lord Krishna in memory of him lifting the Govardhan hill."}
    ]'::jsonb,
    faqs = '[
        {"question": "Why is Goddess Lakshmi worshipped on Diwali?", "answer": "She is the goddess of wealth and beauty, and it is believed she visits clean and well-lit homes on this night."},
        {"question": "What is the spiritual meaning of a Diya?", "answer": "The oil represents our vasanas (tendencies) and the flame represents the light of knowledge."}
    ]'::jsonb
WHERE slug = 'diwali';

-- 4. MAHA SHIVRATRI (Double check update)
UPDATE festivals
SET 
    short_desc = 'The great night of Shiva, a time for deep meditation, spiritual awakening, and celebrating the cosmic union of Shiva and Shakti.',
    significance = '{
        "mythology": "Commemorates the night Shiva performed the Tandava and the day he married Goddess Parvati.",
        "spiritual": "A night to overcome darkness and ignorance. Fasting and meditation help in self-realization.",
        "cultural": "Celebrated with all-night vigils, chanting, and offering Bilva leaves to the Shiva Lingam."
    }'::jsonb,
    rituals = '[
        {"name": "Abhishekam", "timing": "Nishita Kaal", "description": "Bathing the Shiva Lingam with milk, honey, ghee, and water."},
        {"name": "Jagran", "timing": "Night Long", "description": "Staying awake all night in prayer and meditation."},
        {"name": "Bilva Patra Offering", "timing": "All Day", "description": "Offering three-leafed Bilva stalks which represent Shiva''s three eyes."}
    ]'::jsonb,
    faqs = '[
        {"question": "Why is Maha Shivratri celebrated?", "answer": "It marks the marriage of Shiva and Parvati and the night he saved the world from poison."},
        {"question": "Can I eat during the fast?", "answer": "Most observe a strict fast, while some consume fruits and milk."}
    ]'::jsonb
WHERE slug = 'maha-shivratri';

-- 5. HOLI (Double check update)
UPDATE festivals
SET 
    short_desc = 'The vibrant festival of colors that marks the arrival of spring and the triumph of good over evil.',
    significance = '{
        "mythology": "Celebrates the burning of Holika and the protection of Prahlad by Lord Vishnu.",
        "spiritual": "A time for forgiveness, repair of broken relationships, and celebrating life.",
        "cultural": "People play with dry and wet colors, share sweets, and gather around the bonfire."
    }'::jsonb,
    rituals = '[
        {"name": "Holika Dahan", "timing": "Eve of Holi", "description": "Lighting a bonfire to symbolize the burning of evil tendencies."},
        {"name": "Dhulandi", "timing": "Holi Morning", "description": "The main day of playing with colors and water."},
        {"name": "Puran Poli Offering", "timing": "Lunch", "description": "Traditional sweet flatbread offered to the fire and shared with family."}
    ]'::jsonb,
    faqs = '[
        {"question": "What is the meaning of the Holika bonfire?", "answer": "It represents the victory of true devotion over ego and evil."},
        {"question": "Why colors?", "answer": "Colors represent the vibrant energy of spring and the equality of all beings."}
    ]'::jsonb
WHERE slug = 'holi';

-- 6. GANESH CHATURTHI (Double check update)
UPDATE festivals
SET 
    short_desc = 'Celebrating the birth of Lord Ganesha, the remover of obstacles and the god of new beginnings.',
    significance = '{
        "mythology": "The day Lord Ganesha was created by Goddess Parvati and became the leader of all Ganas.",
        "spiritual": "Removes obstacles from our path, granting wisdom and prosperity.",
        "cultural": "Vibrant processions, beautifully crafted idols, and 10 days of community worship."
    }'::jsonb,
    rituals = '[
        {"name": "Prana Pratishtha", "timing": "Day 1", "description": "Invoking the life force into the Ganesha idol through Vedic hymns."},
        {"name": "Modak Bhog", "timing": "Daily", "description": "Offering 21 Modaks, flowers, and Durva grass to Lord Ganesha."},
        {"name": "Visarjan", "timing": "Day 10", "description": "Immersing the idol in water, signifying the cycle of creation and dissolution."}
    ]'::jsonb,
    faqs = '[
        {"question": "Why is Modak offered to Ganesha?", "answer": "It is his favorite sweet, symbolizing the sweet reward of spiritual effort."},
        {"question": "What is the significance of Visarjan?", "answer": "It teaches that everything that has a form must return to the formless reality."}
    ]'::jsonb
WHERE slug = 'ganesh-chaturthi';
