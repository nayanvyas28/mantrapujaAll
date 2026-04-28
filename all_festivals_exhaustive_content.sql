-- ALL-IN-ONE EXHAUSTIVE FESTIVAL CONTENT UPDATE
-- Run this in Supabase SQL Editor to fill content for 15+ major festivals

-- 1. RAM NAVAMI
UPDATE festivals SET short_desc = 'Birth of Lord Rama', significance = '{"mythology": "Marks the descent of Lord Rama in Ayodhya.", "spiritual": "Reminds us of Dharma.", "cultural": "Grand rath yatras."}'::jsonb WHERE slug = 'ram-navami';

-- 2. NAVRATRI
UPDATE festivals SET short_desc = 'Nine nights of Divine Mother', significance = '{"mythology": "Victory over Mahishasura.", "spiritual": "Internal purification.", "cultural": "Garba and Dandiya."}'::jsonb WHERE slug = 'navratri';

-- 3. DIWALI
UPDATE festivals SET short_desc = 'Festival of Lights', significance = '{"mythology": "Rama''s return to Ayodhya.", "spiritual": "Inner light awakening.", "cultural": "Diyas and Rangoli."}'::jsonb WHERE slug = 'diwali';

-- 4. JANMASHTAMI
UPDATE festivals SET short_desc = 'Birth of Lord Krishna', significance = '{"mythology": "Divine birth in Mathura.", "spiritual": "Divine love and wisdom.", "cultural": "Dahi Handi."}'::jsonb WHERE slug = 'janmashtami';

-- 5. DUSSEHRA
UPDATE festivals SET short_desc = 'Victory of Good over Evil', significance = '{"mythology": "Death of Ravana.", "spiritual": "Victory over ego.", "cultural": "Ravana Dahan."}'::jsonb WHERE slug = 'dussehra';

-- 6. RAKSHA BANDHAN
UPDATE festivals SET short_desc = 'Bond of Protection', significance = '{"mythology": "Krishna and Draupadi bond.", "spiritual": "Duty to protect.", "cultural": "Rakhi tying."}'::jsonb WHERE slug = 'raksha-bandhan';

-- 7. KARWA CHAUTH
UPDATE festivals SET short_desc = 'Wife''s prayer for husband', significance = '{"mythology": "Legend of Queen Veervati.", "spiritual": "Strength of resolve.", "cultural": "Moon sighting fast."}'::jsonb WHERE slug = 'karwa-chauth';

-- 8. HANUMAN JAYANTI
UPDATE festivals SET short_desc = 'Birth of Lord Hanuman', significance = '{"mythology": "Birth of Anjaneya.", "spiritual": "Selfless service.", "cultural": "Hanuman Chalisa path."}'::jsonb WHERE slug = 'hanuman-jayanti';

-- 9. MAKAR SANKRANTI
UPDATE festivals SET short_desc = 'Harvest & Sun Transition', significance = '{"mythology": "God Surya transition.", "spiritual": "New beginnings.", "cultural": "Kite flying."}'::jsonb WHERE slug = 'makar-sankranti';

-- 10. GUDI PADWA
UPDATE festivals SET short_desc = 'Hindu New Year', significance = '{"mythology": "Brahma created universe.", "spiritual": "Cleaning home/mind.", "cultural": "Gudi hoisting."}'::jsonb WHERE slug = 'gudi-padwa';

-- 11. GURU PURNIMA
UPDATE festivals SET short_desc = 'Gratitude to Teachers', significance = '{"mythology": "Birth of Veda Vyasa.", "spiritual": "Surrender ego to Guru.", "cultural": "Guru Paduka Puja."}'::jsonb WHERE slug = 'guru-purnima';

-- 12. BASANT PANCHAMI
UPDATE festivals SET short_desc = 'Goddess Saraswati Day', significance = '{"mythology": "Birth of Saraswati.", "spiritual": "Invoking creative energy.", "cultural": "Yellow clothes & puja."}'::jsonb WHERE slug = 'basant-panchami';

-- 13. BHAI DOOJ
UPDATE festivals SET short_desc = 'Brother-Sister Celebration', significance = '{"mythology": "Yama visits Yamuna.", "spiritual": "Eternal protection.", "cultural": "Tilak and feast."}'::jsonb WHERE slug = 'bhai-dooj';

-- 14. PONGAL
UPDATE festivals SET short_desc = 'Tamil Harvest Festival', significance = '{"mythology": "Lord Krishna lifting Govardhan.", "spiritual": "Gratitude to nature.", "cultural": "Cooking Pongal pot."}'::jsonb WHERE slug = 'pongal';

-- 15. PRADOSHAM (General Content)
UPDATE festivals SET short_desc = 'Auspicious Window for Shiva', significance = '{"mythology": "Shiva drank poison during churning.", "spiritual": "Dissolving bad karma.", "cultural": "Twilight puja."}'::jsonb WHERE slug = 'pradosham';

-- [Detailed Content Example for major ones]
-- (Adding more detailed rituals for the big 3)

UPDATE festivals SET 
rituals = '[{"name": "Abhishekam", "timing": "Night", "description": "Bathing Lingam."}, {"name": "Jagran", "timing": "All Night", "description": "Staying awake."}]'::jsonb 
WHERE slug = 'maha-shivratri';

UPDATE festivals SET 
rituals = '[{"name": "Holika Dahan", "timing": "Eve", "description": "Bonfire."}, {"name": "Colors", "timing": "Morning", "description": "Playing with Gulal."}]'::jsonb 
WHERE slug = 'holi';

UPDATE festivals SET 
rituals = '[{"name": "Prana Pratishtha", "timing": "Day 1", "description": "Invoking life."}, {"name": "Visarjan", "timing": "Day 10", "description": "Immersion."}]'::jsonb 
WHERE slug = 'ganesh-chaturthi';
