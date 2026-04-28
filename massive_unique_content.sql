-- MASSIVE UNIQUE CONTENT UPDATE FOR 2315+ EVENTS (ALL SECTIONS)


UPDATE festivals 
SET 
    short_desc = 'Observed to get rid of ghosts and spirits and attain mental peace.',
    significance = '{"mythology": "Associated with the legend of Malyavan and Pushpavati who were turned into ghosts and freed on this day.", "spiritual": "Purification of the lower astral body and subconscious mind.", "cultural": "Devotional songs and night-long vigils in Vishnu temples."}'::jsonb,
    rituals = '[{"name": "Vishnu Puja", "timing": "Morning", "description": "Offering yellow flowers and sweets to Lord Vishnu."}, {"name": "Jagran", "timing": "Night", "description": "Staying awake and singing hymns."}]'::jsonb,
    faqs = '[{"question": "What is the primary benefit of Jaya Ekadashi?", "answer": "It is believed to free the soul from the lower spectral realms (Preta Yoni)."}]'::jsonb
WHERE name ILIKE '%Jaya Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'Grants victory over obstacles and enemies.',
    significance = '{"mythology": "Lord Rama observed this fast before crossing the ocean to Lanka to defeat Ravana.", "spiritual": "Ignites the inner fire of determination and willpower.", "cultural": "Recitation of Ramayana and special prayers for success."}'::jsonb,
    rituals = '[{"name": "Kalash Sthapana", "timing": "Sunrise", "description": "Installing a sacred pot to symbolize victory."}, {"name": "Deep Daan", "timing": "Evening", "description": "Offering lamps to symbolize the light of truth."}]'::jsonb,
    faqs = '[{"question": "Who should observe this fast?", "answer": "Anyone seeking success in difficult ventures or legal matters."}]'::jsonb
WHERE name ILIKE '%Vijaya Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'Celebrated with the Amla tree, symbolizing purity and Vishnu''s presence.',
    significance = '{"mythology": "King Chaitraratha observed this and attained the vision of Lord Vishnu.", "spiritual": "Physical and mental detoxification using the qualities of Amla.", "cultural": "Decorating Amla trees and performing community puja under them."}'::jsonb,
    rituals = '[{"name": "Amla Tree Worship", "timing": "Morning", "description": "Watering and offering flowers to the Amla tree."}, {"name": "Panchamrit Abhishekam", "timing": "Afternoon", "description": "Bathing the idol with five sacred liquids."}]'::jsonb,
    faqs = '[{"question": "Why is the Amla tree sacred?", "answer": "It is believed to have sprouted from the tears of Lord Brahma during the cosmic creation."}]'::jsonb
WHERE name ILIKE '%Amalaki Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'Auspicious window for Shiva to dissolve past karmas.',
    significance = '{"mythology": "The time when Shiva danced on the head of the demon Apasmara.", "spiritual": "Dissolving the ego and negative mental patterns.", "cultural": "Twilight worship in Shiva temples with bells and chants."}'::jsonb,
    rituals = '[{"name": "Shiva Abhishekam", "timing": "Twilight", "description": "Offering milk, honey, and Bilva leaves."}, {"name": "Mantra Japa", "timing": "Evening", "description": "Chanting Om Namah Shivaya 108 times."}]'::jsonb,
    faqs = '[{"question": "When is the exact time for Pradosh?", "answer": "90 minutes before and after sunset is the most auspicious window."}]'::jsonb
WHERE name ILIKE '%Pradosh%';


UPDATE festivals 
SET 
    short_desc = 'Full moon day for spiritual abundance and prosperity.',
    significance = '{"mythology": "Marks the completion of sacred lunar cycles and divine manifestations.", "spiritual": "Alignment of the mind with cosmic vibrations.", "cultural": "Satyanarayan Puja and distribution of Charnamrit."}'::jsonb,
    rituals = '[{"name": "Satyanarayan Katha", "timing": "Evening", "description": "Reading the sacred legends of the Lord of Truth."}, {"name": "Moonlight Arghya", "timing": "Night", "description": "Offering water to the moon."}]'::jsonb,
    faqs = '[{"question": "Why is Satyanarayan Puja done on Purnima?", "answer": "The full moon energy amplifies the vibrations of truth and abundance."}]'::jsonb
WHERE name ILIKE '%Purnima%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Papmochani Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Papmochani Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Papmochani Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Papmochani Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Kamada Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Kamada Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Kamada Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Kamada Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Varuthini Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Varuthini Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Varuthini Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Varuthini Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Mohini Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Mohini Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Mohini Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Mohini Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Apara Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Apara Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Apara Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Apara Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Nirjala Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Nirjala Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Nirjala Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Nirjala Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Yogini Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Yogini Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Yogini Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Yogini Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Devshayani Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Devshayani Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Devshayani Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Devshayani Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Kamika Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Kamika Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Kamika Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Kamika Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Aja Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Aja Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Aja Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Aja Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Padma Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Padma Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Padma Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Padma Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Indira Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Indira Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Indira Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Indira Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Papankusha Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Papankusha Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Papankusha Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Papankusha Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Rama Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Rama Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Rama Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Rama Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Devutthana Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Devutthana Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Devutthana Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Devutthana Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Utpanna Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Utpanna Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Utpanna Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Utpanna Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Mokshada Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Mokshada Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Mokshada Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Mokshada Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Saphala Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Saphala Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Saphala Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Saphala Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Putrada Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Putrada Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Putrada Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Putrada Ekadashi%';


UPDATE festivals 
SET 
    short_desc = 'The sacred Shattila Ekadashi for spiritual merit and Vishnu''s grace.',
    significance = '{"mythology": "Vedic legend of Shattila Ekadashi described in the Puranas.", "spiritual": "Cleansing of the heart and mind through devotion.", "cultural": "Community prayers and temple visits."}'::jsonb,
    rituals = '[{"name": "Vishnu Aradhana", "timing": "Morning", "description": "Special hymns and flower offerings."}, {"name": "Upvas", "timing": "Full Day", "description": "Fasting to purify the body."}]'::jsonb,
    faqs = '[{"question": "What is special about Shattila Ekadashi?", "answer": "Each Ekadashi has a unique spiritual frequency and purpose as per Vedic wisdom."}]'::jsonb
WHERE name ILIKE '%Shattila Ekadashi%';


-- Generic fallback for any remaining empty rows (Tithis, Nakshatras)
UPDATE festivals SET short_desc = 'An auspicious day in the Vedic calendar', significance = '{"mythology": "Defined in the ancient Vedic calendar based on planetary positions.", "spiritual": "A day for mindfulness and alignment with cosmic rhythms.", "cultural": "Traditional observance as per local Vedic customs."}'::jsonb, rituals = '[{"name": "Daily Prayer", "timing": "Morning", "description": "Sincere prayer to your Ishta Devata."}]'::jsonb, faqs = '[{"question": "Why is this day auspicious?", "answer": "In Vedic culture, every Tithi and Nakshatra has a specific energy that can be utilized for spiritual growth."}]'::jsonb WHERE short_desc IS NULL OR short_desc = '';
