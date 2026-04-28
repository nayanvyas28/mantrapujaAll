-- DEDICATED FAQ FILLER FOR 2000+ EVENTS
-- Run this in Supabase SQL Editor

DO $$ 
DECLARE
    f_row RECORD;
BEGIN
    FOR f_row IN SELECT id, name FROM festivals WHERE faqs IS NULL OR faqs = '[]'::jsonb LOOP
        
        -- 1. EKADASHI FAQs
        IF f_row.name ILIKE '%Ekadashi%' THEN
            UPDATE festivals SET faqs = '[
                {"question": "What is the importance of Ekadashi?", "answer": "Ekadashi is considered the most sacred Tithi for Lord Vishnu, helping devotees attain spiritual merit and mental clarity through fasting."},
                {"question": "Can I eat fruits during Ekadashi?", "answer": "Yes, consuming fruits, milk, and nuts (Phalahar) is allowed for those who cannot observe a waterless fast."}
            ]'::jsonb WHERE id = f_row.id;

        -- 2. PRADOSH FAQs
        ELSIF f_row.name ILIKE '%Pradosh%' THEN
            UPDATE festivals SET faqs = '[
                {"question": "Why is Pradosh Kaal important?", "answer": "It is the time when Lord Shiva is in his most compassionate form, making it easier for devotees to dissolve their sins."},
                {"question": "What should I offer to Shiva during Pradosh?", "answer": "Milk, honey, Bilva leaves, and water are highly auspicious offerings during this window."}
            ]'::jsonb WHERE id = f_row.id;

        -- 3. PURNIMA FAQs
        ELSIF f_row.name ILIKE '%Purnima%' THEN
            UPDATE festivals SET faqs = '[
                {"question": "Why is Satyanarayan Puja done on Purnima?", "answer": "The full moon symbolizes total manifestation of truth, making it the perfect day to worship the Lord of Truth."},
                {"question": "What is the benefit of a holy dip on Purnima?", "answer": "Taking a bath in sacred rivers during Purnima is believed to purify the soul and remove karmic blockages."}
            ]'::jsonb WHERE id = f_row.id;

        -- 4. AMAVASYA FAQs
        ELSIF f_row.name ILIKE '%Amavasya%' THEN
            UPDATE festivals SET faqs = '[
                {"question": "Why honor ancestors on Amavasya?", "answer": "It is believed that on this moonless day, our ancestors come closer to the earthly realm to receive our gratitude and offerings."},
                {"question": "Is it good to start new work on Amavasya?", "answer": "Usually, Amavasya is better for introspection and clearing old energy rather than starting new external ventures."}
            ]'::jsonb WHERE id = f_row.id;

        -- 5. GENERIC FAQs (For everything else)
        ELSE
            UPDATE festivals SET faqs = '[
                {"question": "How to observe this day spiritually?", "answer": "Maintaining a clean mind, practicing kindness, and performing a small lamp-lighting (Deep Daan) at home is beneficial for any Vedic event."},
                {"question": "Why does the Vedic calendar have so many festivals?", "answer": "Each festival is designed to align our energy with specific cosmic and seasonal rhythms for overall well-being."}
            ]'::jsonb WHERE id = f_row.id;
        END IF;

    END LOOP;
END $$;
