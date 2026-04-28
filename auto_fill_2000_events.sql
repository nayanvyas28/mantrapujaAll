-- SMART AUTO-FILL SCRIPT FOR 2000+ EVENTS
-- This script uses pattern matching to fill content for all festivals based on their names

DO $$ 
DECLARE
    f_row RECORD;
BEGIN
    FOR f_row IN SELECT id, name FROM festivals WHERE short_desc IS NULL OR short_desc = '' LOOP
        
        -- 1. EKADASHI
        IF f_row.name ILIKE '%Ekadashi%' THEN
            UPDATE festivals SET 
                short_desc = 'A sacred fast dedicated to Lord Vishnu, observed on the eleventh day of every lunar fortnight.',
                significance = '{"mythology": "Marks the day when devotees fast to please Lord Vishnu and seek spiritual purification.", "spiritual": "Helps in controlling the senses and mind through fasting and prayer.", "cultural": "Observed by millions with special prayers, chanting, and abstinence from grains."}'::jsonb,
                rituals = '[{"name": "Vrat (Fast)", "timing": "Full Day", "description": "Abstaining from grains and pulses."}, {"name": "Vishnu Sahasranama", "timing": "Morning", "description": "Chanting the 1000 names of Lord Vishnu."}]'::jsonb
            WHERE id = f_row.id;

        -- 2. PRADOSH
        ELSIF f_row.name ILIKE '%Pradosh%' THEN
            UPDATE festivals SET 
                short_desc = 'An auspicious twilight window dedicated to Lord Shiva for the dissolution of bad karma.',
                significance = '{"mythology": "The time when Shiva danced to save the world during the churning of the ocean.", "spiritual": "A powerful time to dissolve negative patterns and seek Shiva''s grace.", "cultural": "Devotees visit Shiva temples during the evening twilight."}'::jsonb,
                rituals = '[{"name": "Pradosh Vrat", "timing": "Evening", "description": "Observing a fast and performing Shiva Puja during the twilight."}, {"name": "Shiva Abhishekam", "timing": "Sunset", "description": "Offering milk and honey to the Shivling."}]'::jsonb
            WHERE id = f_row.id;

        -- 3. PURNIMA
        ELSIF f_row.name ILIKE '%Purnima%' THEN
            UPDATE festivals SET 
                short_desc = 'The full moon day, a time of peak spiritual energy and cosmic abundance.',
                significance = '{"mythology": "Associated with many divine manifestations and the completion of sacred cycles.", "spiritual": "A day when the mind can easily reach higher states of meditation.", "cultural": "Satyanarayan Puja and holy dips in sacred rivers are common."}'::jsonb,
                rituals = '[{"name": "Satyanarayan Puja", "timing": "Evening", "description": "Detailed worship and reading of the Satyanarayan Katha."}, {"name": "Moonlight Meditation", "timing": "Night", "description": "Meditating under the light of the full moon."}]'::jsonb
            WHERE id = f_row.id;

        -- 4. AMAVASYA
        ELSIF f_row.name ILIKE '%Amavasya%' THEN
            UPDATE festivals SET 
                short_desc = 'The new moon day, a time for introspection and honoring our ancestors (Pitrus).',
                significance = '{"mythology": "A day when the veil between worlds is thin, suitable for ancestral worship.", "spiritual": "Good for deep introspection and letting go of the old.", "cultural": "Tarpana and offering food to the needy in memory of ancestors."}'::jsonb,
                rituals = '[{"name": "Pitru Tarpan", "timing": "Morning", "description": "Offering water and sesame seeds to ancestors."}, {"name": "Donation", "timing": "Afternoon", "description": "Giving food or clothes to those in need."}]'::jsonb
            WHERE id = f_row.id;

        -- 5. SANKRANTI
        ELSIF f_row.name ILIKE '%Sankranti%' THEN
            UPDATE festivals SET 
                short_desc = 'The Sun''s entry into a new zodiac sign, marking a seasonal and cosmic shift.',
                significance = '{"mythology": "Associated with the Sun God Surya and the cycle of time.", "spiritual": "A time to align one''s inner energy with the solar cycle.", "cultural": "Holy baths and offering of fruits and seasonal produce."}'::jsonb
            WHERE id = f_row.id;

        -- 6. SHIVRATRI (Monthly)
        ELSIF f_row.name ILIKE '%Shivratri%' THEN
            UPDATE festivals SET 
                short_desc = 'The monthly night of Shiva, ideal for dissolving the ego and connecting with the eternal.',
                significance = '{"mythology": "A monthly reminder of the great Maha Shivratri energy.", "spiritual": "Focusing on the silence behind the sound of the universe.", "cultural": "Night prayers and chanting in Shiva temples."}'::jsonb
            WHERE id = f_row.id;

        -- 7. GENERIC FALLBACK (For any other event)
        ELSE
            UPDATE festivals SET 
                short_desc = 'An auspicious day in the Vedic calendar for spiritual growth and divine connection.',
                significance = '{"mythology": "Part of the eternal cycle of Tithis and Nakshatras defined by ancient Vedic wisdom.", "spiritual": "Every day is an opportunity to connect with the divine through awareness.", "cultural": "Traditional observance based on local customs and family traditions."}'::jsonb,
                rituals = '[{"name": "Prayer", "timing": "Morning", "description": "Offering sincere prayers to your Ishta Devata."}, {"name": "Awareness", "timing": "Full Day", "description": "Maintaining a sense of gratitude and mindfulness."}]'::jsonb
            WHERE id = f_row.id;
        END IF;

    END LOOP;
END $$;
