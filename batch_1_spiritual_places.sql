-- 1. CREATE THE NEW TABLE
CREATE TABLE IF NOT EXISTS "public"."spiritual_places" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "name" text NOT NULL,
    "slug" text NOT NULL UNIQUE,
    "type" text,
    "state_id" text,
    "description" text,
    "x" text,
    "y" text,
    "size" text,
    "images" text[],
    "is_featured" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()),
    "is_active" boolean DEFAULT true,
    "tagline" text,
    "seo_title" text,
    "seo_description" text,
    "seo_keywords" text,
    "order_rank" text,
    "content" jsonb,
    "show_on_home" boolean DEFAULT false,
    "home_order" integer,
    "name_hi" text,
    "tagline_hi" text,
    "description_hi" text,
    "home_image_url" text
);

-- 2. INSERT BATCH 1 (THE SUPREME HUBS)
INSERT INTO "public"."spiritual_places"  (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES 
-- [DUPLICATE NEUTRALIZED] (
    'Kedarnath', 
    'kedarnath', 
    'Jyotirlinga', 
    'uk', 
    'Situated at an altitude of 3,583m in the Rudraprayag district, Kedarnath is the highest of the 12 Jyotirlingas. It is the site of the primordial Bull hump, representing Shiva''s refusal to leave his devotees even in the face of absolute cosmic retreat.', 
    '205.2', 
    '105.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Eternal Throne of the Rudra Himalaya', 
    'Kedarnath Dham | Highest Jyotirlinga, Ancient Lore & Deep Insights', 
    'Dive into the deep spiritual mysteries of Kedarnath. Explore the Pandava history, the Panch Kedar legends, and the profound esoteric significance of the Bull-form Shiva.', 
    'Kedarnath, Jyotirlinga, Lord Shiva, Chota Char Dham, Uttarakhand, Himalayan Temple, Pandavas, Moksha, Panch Kedar', 
    '1', 
    '{
        "spiritualEssence": "Kedarnath is the pinnacle of Shaivite asceticism, a realm where the boundary between the physical and the metaphysical vanishes. Guarded by the towering Kedar Peak and the Chorabari Glacier, the shrine represents the absolute stillness of the cosmic mind. The vibration here is not merely quiet; it is a resonant silence that echoes the primordial sound of ''Aum''. It is the place where the ego is sacrificed at the feet of the Lord of the Wilds. Pilgrims trekking these heights are not just moving through space, but through layers of consciousness, stripping away the mundane to reach the sacred center of the self.",
        "longDescription": "The antiquity of Kedarnath is as vast as the Himalayas. While the present stone temple is attributed to Adi Shankaracharya in the 8th century, the site has been a beacon of light since the Satya Yuga. The Mahabharata recounts how the Pandavas, burdened by the guilt of the Kurukshetra war, sought Shiva for redemption. Shiva, playing the role of the elusive ascetic, fled from them, transforming into a bull at Guptkashi. When Bheem, the strongest of the brothers, tried to seize him, the Bull dove into the earth, leaving its hump at Kedarnath. This triangular lingam is the very symbol of the Lord''s resilience. Over the millennia, the temple has stood against the crushing weight of snow and the fury of floods, most notably the 2013 catastrophe where a massive boulder (Bheem Shila) diverted the waters, sparing the sanctum—a miracle that reaffirmed the shrine''s divine status to the modern world.",
        "deepInsights": "Esoterically, Kedarnath represents the Vishuddha and Sahasrara chakras of the earth. The upward trek is a metaphor for the raising of the Kundalini. The Lord here is worshipped as the ''Kedar'' (the protector of the fields), specifically the field of the human heart. The ritual of smearing the lingam with ghee and fragrant herbs signifies the softening of the hardened heart through devotion. The temple is also the gateway to the other four Panch Kedar shrines, forming a cosmic map of the Shiva-body across the Garhwal Himalayas.",
        "ancientLore": "A lesser-known legend states that Lord Shiva once performed his cosmic dance (Tandava) here to settle the tectonic plates of the newly formed Himalayas. The footprints of the Lord are said to be etched in the surrounding peaks. Another lore speaks of the celestial sage Narada, who resides in the Narad Kund nearby, performing secret midnight rituals when the temple is closed to humans during the winter months.",
        "spiritualArchitecture": "The Kedarnath temple is a marvel of ancient engineering, built using massive, interlocked grey stone slabs without the use of mortar. It is a classic Katyuri style structure, characterized by its high rectangular plinth and a towering, tiered spire. The entrance is guarded by a massive bronze Nandi, the celestial bull. The inner walls are carved with figures of the Pandavas, Lord Krishna, and the Goddess Parvati. The Garbhagriha contains the natural rock formation (the hump), which is worshipped in its raw, uncarved state, symbolizing the primordial nature of existence.",
        "vedicReferences": "The Kedar Khanda of the Skanda Purana is dedicated entirely to this region. It states: ''By merely seeing the peak of Kedarnath, one is liberated from all sins.'' The Shiva Purana lists it as the supreme pilgrimage for those seeking Moksha (final liberation).",
        "keyRituals": [
            {"name": "Maha Abhishek", "description": "Performed at 4 AM, involving the bathing of the deity in milk, curd, honey, and sacred water from the Alaknanda."},
            {"name": "Shiva Sahasranamam", "description": "The recitation of the 1000 names of Shiva, believed to create a protective sonic field around the devotee."},
            {"name": "Evening Aarti", "description": "A spectacular ritual of lamps and bells that resonates through the entire valley at sunset."}
        ],
        "highlights": [
            {"name": "Bheem Shila", "description": "The massive rock that miraculously saved the temple during the 2013 floods."},
            {"name": "Chorabari Lake (Gandhi Sarovar)", "description": "A crystal clear lake located 3km above the temple, associated with the Lord''s first teaching of yoga to the Saptarishis."},
            {"name": "Bhairav Nath Temple", "description": "The protector of the Kedar valley, located 500m above the main shrine; his permission is sought before entering Kedarnath."}
        ],
        "travelInfo": {
            "bestTime": "May to June; September to October.",
            "howToReach": "16-22km trek from Gauri Kund or via Helicopter from Phata/Sirsi.",
            "nearestAirport": "Dehradun (Jolly Grant).",
            "nearestRailway": "Rishikesh/Haridwar."
        }
    }'
),
-- [DUPLICATE NEUTRALIZED] (
    'Somnath', 
    'somnath', 
    'Jyotirlinga', 
    'gj', 
    'The first of the twelve Jyotirlingas, Somnath stands as a testament to the indestructible nature of faith. Located on the Prabhas Kshetra coast, it is the site where the Moon God regained his light through the grace of Mahadeva.', 
    '68.5', 
    '425.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Eternal Shrine of Time and Light', 
    'Somnath Jyotirlinga | Legend of Chandra, Ancient Resilience & Insights', 
    'Explore the deep history of Somnath, the first Jyotirlinga. Discover the Moon God''s penance, its architectural splendor, and its spiritual victory over time.', 
    'Somnath, Jyotirlinga, Lord Shiva, Gujarat, Moon God, Chandra, Eternal Shrine, Hindu Pilgrimage', 
    '2', 
    '{
        "spiritualEssence": "Somnath is the manifestation of the Lord as the healer of the cosmos. Located at the Triveni Sangam (confluence of three rivers) and the Arabian Sea, it represents the meeting of the individual soul with the universal ocean of consciousness. The energy here is rhythmic, governed by the tides and the waxing and waning of the moon. It is the site of ultimate renewal; just as the Moon was restored to his full glory here, a devotee finds their spiritual luster restored in the presence of Somnath. The temple is a lighthouse of the soul, standing firm against the storms of time and destruction.",
        "longDescription": "The history of Somnath is an epic of resilience. According to the Puranas, Chandra (the Moon) married the 27 daughters of Daksha Prajapati but loved only Rohini. Daksha cursed him to wither away. Chandra performed intense penance at this spot, and Lord Shiva, moved by his devotion, partially reversed the curse, allowing the moon to cycle through phases. In gratitude, Chandra built a golden temple. This temple was destroyed and rebuilt seven times—in silver by Ravana, sandalwood by Krishna, and stone by various kings. Each time invaders tried to extinguish its light, it rose again, more majestic than before. The current temple, built in the Chalukyan style, was inaugurated in 1951, symbolizing the rebirth of India''s spiritual identity.",
        "deepInsights": "The name ''Prabhas'' means ''shining light''. Somnath represents the Agni (fire) and Soma (coolness) balance of the universe. It is the center for lunar-based spiritual practices. The shrine is unique because it is the only Jyotirlinga that has seen the entire cycle of cosmic time (Kalpa) and has been restored in every era. This teaches the seeker that while the physical may perish, the underlying spiritual truth is eternal.",
        "ancientLore": "Legend says that the original Jyotirlinga was a self-manifested (Swayambhu) pillar of light that pierced the earth and the heavens. Another lore states that Lord Krishna took his last earthly step at the nearby Bhalka Teerth, connecting the legacy of the Avatar to the eternal presence of the Lord of the Moon. Ancient texts suggest that the Triveni Sangam here is the earthly reflection of a celestial alignment that occurs only once in a thousand years.",
        "spiritualArchitecture": "The temple is built in the Kailash Mahameru Prasad style. Its spire reaches 150 feet, adorned with a flag that flutters with the sea breeze. The Baan Stambh (Arrow Pillar) is a remarkable astronomical feature; an arrow points towards the South Pole, indicating that there is no land mass in a straight line from that point to Antarctica. The intricate carvings on the sandstone walls depict the incarnations of Vishnu and the various forms of Shiva, creating a visual Vedic library for the pilgrim.",
        "keyRituals": [
            {"name": "Somanatha Mahapuja", "description": "An elaborate morning worship involving 16 steps (Shodashopachara) and chanting of the Sri Rudram."},
            {"name": "Samudra Aarti", "description": "Evening ritual where the ocean itself is worshipped as the Lord''s cosmic footstool."},
            {"name": "Gangajal Abhishek", "description": "Pouring of holy Ganges water over the lingam, symbolizing the union of all sacred waters."}
        ]
    }'
),
-- [DUPLICATE NEUTRALIZED] (
    'Kashi Vishwanath', 
    'kashi-vishwanath', 
    'Jyotirlinga', 
    'up', 
    'The spiritual capital of the world, Varanasi is the city of Lord Shiva. The Vishwanath temple is the center of the universe, where the Lord bestows the gift of liberation (Moksha) to all who seek him in the city of Light.', 
    '410.5', 
    '250.3', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Eternal City of Light and Liberation', 
    'Kashi Vishwanath Temple | Varanasi, Jyotirlinga & Ancient Insights', 
    'Dive into the eternal spirit of Kashi Vishwanath. Discover the legends of Varanasi, the significance of the Golden Spires, and the path to ultimate Moksha.', 
    'Kashi Vishwanath, Varanasi, Jyotirlinga, Lord Shiva, Ganga, Moksha, Kashi, Hindu Pilgrimage, Golden Temple', 
    '3', 
    '{
        "spiritualEssence": "Kashi is not just a city; it is a state of being. It is believed that Varanasi stands on the tip of Lord Shiva''s Trishul, detached from the physical laws of the earth. The Vishwanath lingam is the luminous pillar of light (Jyotirlinga) that settled the cosmic dispute between Brahma and Vishnu. The energy here is a potent mixture of life and death, celebration and surrender. To be in Kashi is to be at the center of the cosmic dance. The Lord here is ''Vishwanath'', the master of the entire universe, who guarantees that anyone who dies within the sacred boundary of the city will receive the Taraka Mantra and achieve immediate liberation.",
        "longDescription": "Varanasi is the oldest living city on Earth, continuously inhabited for over 3,000 years. The Kashi Vishwanath temple has been the spiritual heart of India through countless ages. The current structure was built by the visionary Queen Ahilyabai Holkar in 1780. Its two massive spires are covered in 800 kilograms of pure gold, a gift from Maharaja Ranjit Singh. The temple has survived multiple invasions, each time emerging with greater spiritual authority. The recent Vishwanath Corridor has opened the temple directly to the Mother Ganges, allowing pilgrims to walk from the river to the sanctum in a single spiritual flow, recreating the ancient Vedic layout of the city.",
        "deepInsights": "Kashi is the Ajna Chakra (Third Eye) of the earth. It is the place of absolute clarity. The Taraka Mantra whispered by Shiva is the sound of the ultimate truth that dissolves the illusion of the material world. The city''s circular layout (Pancha Kroshi) represents the cycle of time and the path to its exit. Spiritual seekers come here not to find something new, but to lose the false identity of the ego.",
        "ancientLore": "A profound lore tells of how Shiva and Parvati once left Kailash to reside in Kashi because the Goddess was so enamored with the city''s beauty. Another legend states that even when the universe is destroyed (Pralaya), Shiva carries Kashi on his trident to protect it. The Manikarnika Ghat, adjacent to the temple, is said to be the spot where Shiva''s earring fell, making it the most sacred ground for cremation and transition.",
        "keyRituals": [
            {"name": "Sapta Rishi Aarti", "description": "A hypnotic ritual where seven priests, representing the celestial sages, perform a synchronized worship of the Lord."},
            {"name": "Mangala Aarti", "description": "The 3 AM awakening ritual, considered the most intimate time for Darshan."},
            {"name": "Ganga Jal Arpan", "description": "The offering of Ganges water, symbolizing the purification of the soul through the divine mother."}
        ]
    }'
),
-- [DUPLICATE NEUTRALIZED] (
    'Mahakaleshwar (Ujjain)', 
    'mahakaleshwar', 
    'Jyotirlinga & Shakti Peeth', 
    'mp', 
    'Ujjain''s Mahakaleshwar is the unique south-facing Jyotirlinga, the conqueror of death. It is a dual powerhouse of divinity where the Lord of Time meets the Goddess Harsiddhi in a cosmic union of Shiva and Shakti.', 
    '215.8', 
    '320.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lord of Time, Transformation, and Eternity', 
    'Mahakaleshwar Jyotirlinga | Ujjain Bhasma Aarti, Lore & Deep Insights', 
    'Uncover the mysteries of Mahakaleshwar, the South-facing Jyotirlinga. Explore the unique Bhasma Aarti, the Shakti Peeth connection, and the ancient wisdom of Ujjain.', 
    'Mahakaleshwar, Ujjain, Jyotirlinga, Shakti Peeth, Bhasma Aarti, Lord Shiva, Time, Mahakal, Ancient Lore', 
    '4', 
    '{
        "spiritualEssence": "Mahakal is the absolute master of time and transformation. As the only south-facing (Dakshinamurti) Jyotirlinga, Mahakaleshwar represents the force that transcends death itself. The energy in Ujjain is visceral and raw. It is the place where one confronts the reality of dissolution and realizes the eternal nature of the soul. Because Sati''s upper lip fell here, it is also a seat of high Shakti. This dual energy makes it a focal point for Tantric and Vedic practices alike. To be in the presence of Mahakal is to step out of the linear flow of time and into the eternal present.",
        "longDescription": "Ujjain (Avantika) was the prime meridian of ancient Indian geography and astronomy. The legend of Mahakal describes how the Lord appeared as a terrifying pillar of light to destroy the demon Dushana who was harassing the Vedic scholars of Ujjain. The temple is a five-story architectural marvel. The Bhasma Aarti—where the deity is smeared with sacred ash—is the most famous ritual in the Hindu world. It signifies that everything material eventually returns to ash, but the divine consciousness remains. The shrine has been a center for great poets like Kalidasa and kings like Vikramaditya, making it a hub of both spiritual and cultural renaissance.",
        "deepInsights": "Mahakal represents the Mahaprana—the great breath that creates and destroys universes. The south-facing orientation is significant because south is the direction of Yama (the God of Death). By facing south, Shiva absorbs the fear of death from his devotees. The temple is also the center of the Universe in the ancient Indian coordinate system, making it the grounding point for all celestial calculations.",
        "ancientLore": "Lore tells of the subterranean city of Ujjain where thousands of Naga sadhus reside, emerging only during the Kumbh Mela. Another legend states that the Lord Mahakal personally guards the city, and historically, no king was allowed to stay overnight in Ujjain, as there can only be one King—Mahakal. The temple''s top floor houses the Nagchandreshwar temple, which opens only once a year on Nag Panchami.",
        "keyRituals": [
            {"name": "Bhasma Aarti", "description": "The pre-dawn ritual where the Lord is worshipped with sacred ash, a sight of incomparable spiritual intensity."},
            {"name": "Shahi Sawari", "description": "The royal procession of the Lord through the streets of Ujjain during the month of Shravan."},
            {"name": "Harsiddhi Mata Puja", "description": "Evening ritual at the adjacent Shakti Peeth to honor the divine feminine energy."}
        ]
    }'
),
-- [DUPLICATE NEUTRALIZED] (
    'Dwarka', 
    'dwarka', 
    'Char Dham', 
    'gj', 
    'Dwarka, the ''Gateway to Heaven,'' was the magnificent kingdom of Lord Krishna. Situated at the confluence of the Gomti River and the Arabian Sea, it is one of the four most sacred cardinal Char Dhams of India.', 
    '20.5', 
    '350.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582201943021-e8e5b3061b33?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Kingdom of the Jagadguru Lord Krishna', 
    'Dwarkadhish Temple | Dwarka Char Dham, Krishna''s Legacy & Deep Insights', 
    'Step into the golden legacy of Dwarka. Discover the Dwarkadhish temple, the archaeological mysteries of the Sunken City, and the royal spirituality of Krishna.', 
    'Dwarka, Char Dham, Lord Krishna, Gujarat, Dwarkadhish, Gomti River, Hindu Pilgrimage, Sunken City, Lore', 
    '5', 
    '{
        "spiritualEssence": "Dwarka is the realm of the Jagadguru—the teacher of the universe. The energy here is one of royal dharma, strategic wisdom, and the beauty of the Lord Krishna (Dwarkadhish). It is where the divine took on the role of a king to establish a new order of righteousness. The sea breeze at Dwarka is believed to carry the vibrations of the Bhagavad Gita. A visit here is not just a pilgrimage; it is an audience with the King of Kings. It is a site of absolute protection and divine guidance.",
        "longDescription": "The city of Dwarka was built by the divine architect Vishwakarma at the request of Krishna to settle the Yadava clan. After Krishna''s departure from the physical plane, the original golden city was reclaimed by the Arabian Sea. Modern underwater archaeology has found massive stone walls and anchors that confirm the Puranic accounts. The Dwarkadhish Temple, also known as Jagat Mandir, is a five-storied limestone structure rising majestically against the sea. The temple flag (Dhwaja) is a massive silk cloth changed five times a day, representing the five elements and the Lord''s dominion over them.",
        "deepInsights": "Dwarka represents the ''Moksha-dwara'' or the door to liberation. While Badrinath is for penance, Dwarka is for the active practice of Dharma in the world. It teaches that one can be a householder or a king and still be completely realized. The location on the westernmost tip of India signifies the setting of the sun—the end of the cycle of birth and death.",
        "ancientLore": "One ancient lore speaks of the Gopi Talav, where the soil turned yellow (Gopi Chandan) because the Gopis of Vrindavan came here to meet Krishna and merged into the earth. Another legend states that Krishna personally designed the city to be a fortress that no earthly weapon could penetrate. The Rukmini Devi temple, located outside the city, tells the story of a curse by Sage Durvasa that separated the Lord and his consort, explaining why they are worshipped apart.",
        "keyRituals": [
            {"name": "Dhwaja Arohan", "description": "The complex and sacred ceremony of hoisting the new flag, involving massive communal participation."},
            {"name": "Gomti Snan", "description": "Purifying dip in the Gomti river, which is said to be the daughter of the Sage Vashistha."},
            {"name": "Shringar Aarti", "description": "The morning ritual where the Lord is dressed in royal finery and jewels, reflecting his status as the King of Dwarka."}
        ]
    }'
),
-- [DUPLICATE NEUTRALIZED] (
    'Puri', 
    'puri', 
    'Char Dham', 
    'or', 
    'Puri is the abode of Lord Jagannath, the Lord of the Universe. It is one of the four cardinal Char Dhams, famous for its massive Ratha Yatra and a temple where the laws of nature are said to bend before the divine.', 
    '495.3', 
    '385.6', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Land of Eternal Bliss and Universal Love', 
    'Jagannath Temple Puri | Char Dham, Rath Yatra, Lore & Deep Insights', 
    'Discover the mysteries of Puri Jagannath temple. Explore the sacred Mahaprasad, the wooden deities, and the profound spiritual equality of the Rath Yatra.', 
    'Puri, Jagannath, Char Dham, Odisha, Rath Yatra, Mahaprasad, Lord Krishna, Hindu Pilgrimage, Ancient Lore', 
    '6', 
    '{
        "spiritualEssence": "Puri is the realm of Prema (divine love). Jagannath is the deity who has no eyelids because he never stops looking after his devotees, and no hands or feet because he is everywhere simultaneously. The energy in Puri is vibrant, inclusive, and joyful. It is the site of the ''Mahaprasad''—the Great Food—which is cooked by the Goddess Lakshmi herself. In Puri, the Lord comes out of the temple during the Rath Yatra to meet his devotees, breaking all barriers of caste and status. It is a site where the divine is deeply personal and accessible.",
        "longDescription": "The Jagannath Temple, built in the 12th century by the Ganga dynasty, is a masterpiece of Kalinga architecture. The deities—Jagannath, Balabhadra, and Subhadra—are uniquely made of wood (Neem) and are replaced in a secret ritual every 19 years known as Nabakalebara. The temple is famous for several unexplained phenomena: the flag always flutters against the wind, no birds fly over the dome, and the shadow of the main dome is never seen on the ground. The temple kitchen is the largest in the world, where 56 varieties of food (Chapan Bhog) are cooked daily for the Lord and thousands of pilgrims.",
        "deepInsights": "Puri represents the Anahata (Heart) chakra of India. It is where the emotional connection to the divine is prioritized over rituals. The wide road in front of the temple (Bada Danda) symbolizes the broad path of spiritual inclusion. The wood of the deities signifies the living, organic nature of the divine, which periodically undergoes rebirth, teaching us the cycle of the soul.",
        "ancientLore": "A deep lore tells of the ''Brahma Padartha''—the divine soul—that is transferred from the old idols to the new ones by priests who are blindfolded and wear gloves. It is said to be a piece of the heart of Lord Krishna that survived the cremation and was found by King Indradyumna. Another legend explains why the deities have unfinished hands and feet, attributing it to the King''s impatience while the divine architect Vishwakarma was carving them.",
        "keyRituals": [
            {"name": "Ratha Yatra", "description": "The world''s oldest and largest chariot festival, where the Lord visits his aunt''s temple (Gundicha)."},
            {"name": "Chhera Pahanra", "description": "The symbolic sweeping of the chariots by the King of Puri with a golden broom."},
            {"name": "Suna Besha", "description": "The day when the deities are adorned with massive quantities of gold jewelry on their chariots."}
        ]
    }'
),
-- [DUPLICATE NEUTRALIZED] (
    'Rameswaram', 
    'rameswaram', 
    'Char Dham, Jyotirlinga & Shakti Peeth', 
    'tn', 
    'Rameswaram is the island where the Ramayana meets the presence of Shiva. It is a rare confluence of a Char Dham, a Jyotirlinga, and a Shakti Peeth, marking the site where Lord Rama built a bridge to divine grace.', 
    '330.2', 
    '850.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Bridge to Eternal Purification and Peace', 
    'Rameswaram Temple | Char Dham, Jyotirlinga, Rama Lore & Deep Insights', 
    'Experience the profound purification of Rameswaram. Discover the 22 holy wells, the world''s longest corridors, and the dual legacy of Rama and Shiva.', 
    'Rameswaram, Char Dham, Jyotirlinga, Shakti Peeth, Lord Rama, Tamil Nadu, Hindu Pilgrimage, Sethu, Lore', 
    '7', 
    '{
        "spiritualEssence": "Rameswaram is the sanctuary of atonement and peace. It is where Lord Rama, after the battle of Lanka, sought to cleanse the sin of killing Ravana (a Brahmana). The energy is one of deep emotional and spiritual washing. Walking through the 22 Teerthams (holy wells) is a physical act of internal cleansing. It is a place of absolute harmony; Rama (the devotee) worships Shiva (the Lord), and Shiva in turn honors Rama. It is the bridge between the human struggle and divine mercy, located at the very edge of the subcontinent where the ocean and the land become one.",
        "longDescription": "The Ramanathaswamy Temple is a pinnacle of Dravidian architecture, featuring the longest temple corridor in the world (nearly 4,000 feet). The main lingam, the Ramalingam, was fashioned by Sita from sand, while the second lingam, the Vishwalingam, was brought by Hanuman from Kashi. The temple is also one of the 51 Shakti Peeths, where the upper arm of Sati fell, making the Goddess Parvathavardhini a powerful presence here. The Agni Teertham (the sea) is the starting point of the pilgrimage, where devotees perform ancestral rites before entering the temple.",
        "deepInsights": "Rameswaram represents the Muladhara (Root) chakra of the national spiritual body. It is about grounding and clearing the past. The 22 wells represent the 22 layers of the human personality that must be purified to reach the center. The sand-lingam of Sita teaches that devotion can manifest the divine from even the most humble material.",
        "ancientLore": "Lore tells of the Sethu Bandhanam—the construction of the bridge to Lanka by the monkey army, where even a small squirrel helped by rolling in the sand. Another legend states that the Lord Rama personally marked the spot for the 22 wells with his arrow. The Kothandaramaswamy temple nearby marks the spot where Vibhishana surrendered to Rama, highlighting the theme of surrender and grace.",
        "keyRituals": [
            {"name": "22 Teertham Snanam", "description": "The unique process of being bathed with water from 22 distinct wells, each with different spiritual properties."},
            {"name": "Mani Darshanam", "description": "Viewing the Sphatika (Crystal) Lingam gifted by Adi Shankaracharya."},
            {"name": "Sethu Madhava Puja", "description": "Worship of the Vishnu form that guards the sacred bridge."}
        ]
    }'
),
(
    'Vaishno Devi', 
    'vaishno-devi', 
    'Shakti Peeth', 
    'jk', 
    'Vaishno Devi is the supreme pilgrimage of the Divine Mother in the Trikuta mountains. The Goddess resides in a natural cave in the form of three self-manifested Pindis, representing the cosmic forces of creation, sustenance, and destruction.', 
    '165.5', 
    '50.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Call of the Cosmic Mother', 
    'Vaishno Devi Katra | Shakti Peeth, Trikuta Lore & Deep Insights', 
    'Discover the spiritual power of Maa Vaishno Devi. Explore the journey of the soul to Trikuta, the mysteries of the Ardhkuwari cave, and the Pindi darshan.', 
    'Vaishno Devi, Katra, Shakti Peeth, Jammu, Trikuta Mountains, Durga, Hindu Pilgrimage, Maa Vaishno, Lore', 
    '8', 
    '{
        "spiritualEssence": "Vaishno Devi is the personification of the Mother''s grace (Kripa). The trek to the Bhawan is not a physical exercise; it is a spiritual ascent. The energy here is nurturing, fierce, and protective. It is believed that no one reaches her doorstep without her ''Bulawa'' (call). The three Pindis—Mahakali, Mahalakshmi, and Mahasaraswati—are unified in a single silence inside the ancient cave. To be in the Bhawan is to return to the womb of the universe, emerging reborn and empowered.",
        "longDescription": "The legend of Vaishno Devi is an epic of the soul''s pursuit. The Goddess Vaishnavi, born to help humanity, was pursued by the egoistic Tantric Bhairon Nath. She retreated into the Trikuta mountains, performing penance in the Ardhkuwari cave for nine months (symbolizing gestation). When Bhairon Nath finally cornered her, she manifested her supreme form and beheaded him. In his death, Bhairon attained wisdom and was forgiven, with the Mother decreeing that his shrine must be visited to complete the pilgrimage. Today, millions walk the 12km path from Katra, fueled by the chant of ''Jai Mata Di'', making it one of the most vibrant spiritual movements on earth.",
        "deepInsights": "Trikuta means ''Three Peaks'', representing the three Gunas (Sattva, Rajas, Tamas) that the devotee must balance. The Ardhkuwari cave represents the Ardhanareshwara (Shiva-Shakti) balance. The path to the Bhawan is narrow, symbolizing the ''razor''s edge'' of the spiritual path. The Mother here is ''Vaishno'' because she is the Shakti of Vishnu—the force of preservation and compassion.",
        "ancientLore": "Lore tells of the Sridhar, a poor Brahmin who first discovered the cave through the guidance of the Goddess herself appearing as a young girl. Another legend says that during the Nine nights of Navratri, all the gods of the Hindu pantheon descend into the cave to pay homage to the Mother. The Banganga river, where pilgrims wash themselves, is said to have been created by the Goddess shooting an arrow into the rock to quench the thirst of Hanuman.",
        "keyRituals": [
            {"name": "Atka Aarti", "description": "The morning and evening group worship involving the singing of sacred hymns inside the Bhawan."},
            {"name": "Panchamrit Snan", "description": "The bathing of the Pindis in the pre-dawn hours by the head priests."},
            {"name": "Sanjhi Chat Prayer", "description": "The moment of pause and prayer at the highest point of the trek before the final descent to the Bhawan."}
        ]
    }'
);
