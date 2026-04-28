-- FIXED SQL script with correct slugs from migration
-- Run this in your Supabase SQL Editor

UPDATE festivals
SET 
    short_desc = 'The great night of Shiva, a time for deep meditation, spiritual awakening, and celebrating the cosmic union of Shiva and Shakti.',
    significance = '{
        "mythology": "Commemorates the night Shiva performed the Tandava and the day he married Goddess Parvati, symbolizing the union of consciousness and energy.",
        "spiritual": "A night to overcome darkness and ignorance in one''s life. Fasting and meditation on this day help in self-realization.",
        "cultural": "Celebrated across India with all-night vigils, chanting of ''Om Namah Shivaya'', and offering Bilva leaves to the Shiva Lingam."
    }'::jsonb,
    rituals = '[
        {"name": "Abhishekam", "timing": "Nishita Kaal", "description": "Bathing the Shiva Lingam with milk, honey, ghee, and water while chanting Vedic mantras."},
        {"name": "Jagran", "timing": "Night Long", "description": "Staying awake all night in prayer, meditation, and devotional singing to Shiva."},
        {"name": "Bilva Patra Offering", "timing": "Morning/Evening", "description": "Offering three-leafed Bilva stalks which represent the three eyes of Shiva."}
    ]'::jsonb,
    faqs = '[
        {"question": "Why is Maha Shivratri celebrated?", "answer": "It marks the marriage of Shiva and Parvati and the night Shiva saved the world by drinking poison during Samudra Manthan."},
        {"question": "Can I eat during the fast?", "answer": "Many devotees observe a strict fast, while some consume fruits and milk (Phalahar)."}
    ]'::jsonb
WHERE slug = 'maha-shivratri';

UPDATE festivals
SET 
    short_desc = 'The vibrant festival of colors that marks the arrival of spring and the triumph of good over evil.',
    significance = '{
        "mythology": "Celebrates the burning of Holika and the protection of Prahlad by Lord Vishnu, as well as the playful love of Radha and Krishna.",
        "spiritual": "A time for forgiveness, repair of broken relationships, and celebrating the diversity of life through colors.",
        "cultural": "People play with dry and wet colors, share sweets like Gujiya, and gather around the Holika bonfire."
    }'::jsonb,
    rituals = '[
        {"name": "Holika Dahan", "timing": "Eve of Holi", "description": "Lighting a bonfire to symbolize the burning of evil tendencies and the triumph of faith."},
        {"name": "Dhulandi", "timing": "Holi Morning", "description": "The main day of playing with colors, where barriers of caste and creed are broken."},
        {"name": "Mathura Lathmar", "timing": "Traditional", "description": "Unique celebrations in Braj where women playfully hit men with sticks."}
    ]'::jsonb,
    faqs = '[
        {"question": "What is the meaning of the Holika bonfire?", "answer": "It represents the victory of Prahlad over the demoness Holika, signifying that true devotion is always protected."},
        {"question": "What colors are traditionally used?", "answer": "Historically, natural colors from Tesu flowers and turmeric were used (Gulal)."}
    ]'::jsonb
WHERE slug = 'holi';

UPDATE festivals
SET 
    short_desc = 'Celebrating the birth of Lord Ganesha, the remover of obstacles and the god of new beginnings.',
    significance = '{
        "mythology": "The day Lord Ganesha was created by Goddess Parvati from clay, becoming the leader (Ganapati) of all celestial beings.",
        "spiritual": "Removes mental and physical obstacles from our path, granting wisdom and prosperity to devotees.",
        "cultural": "Vibrant public processions, beautifully crafted idols, and 10 days of community worship ending in Visarjan."
    }'::jsonb,
    rituals = '[
        {"name": "Prana Pratishtha", "timing": "Day 1", "description": "Invoking the life force into the Ganesha idol through sacred Vedic hymns."},
        {"name": "Shodashopachara", "timing": "Daily", "description": "16-step ritual of worship including offering Modaks, flowers, and incense."},
        {"name": "Visarjan", "timing": "Day 10", "description": "Immersing the idol in water, signifying the cycle of creation and dissolution."}
    ]'::jsonb,
    faqs = '[
        {"question": "Why is Modak offered to Ganesha?", "answer": "Modak is believed to be Lord Ganesha''s favorite sweet, symbolizing the sweet fruit of spiritual knowledge."},
        {"question": "What is the significance of Visarjan?", "answer": "It teaches that everything that has a form must eventually return to the formless reality."}
    ]'::jsonb
WHERE slug = 'ganesh-chaturthi';
