-- GOLD STANDARD PART 1 for Spritual_locations

CREATE TABLE IF NOT EXISTS "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
    'Experience the divine call of Maa Vaishno Devi. Discover the journey to Katra, the sacred Bhawan cave, and the blessings of the three Pindis.', 
    'Vaishno Devi, Katra, Shakti Peeth, Jammu, Trikuta Mountains, Durga, Hindu Pilgrimage, Maa Vaishno', 
    '9', 
    '{
        "spiritualEssence": "Vaishno Devi is the mother''s unconditional love. The trek is a spiritual ascent. The three Pindis represent creation, preservation, and transformation.",
        "longDescription": "Legend says Vaishnavi was pursued by Bhairon Nath. She stayed in Ardhkuwari for 9 months before enter the cave and beheading him. Bhairon was forgiven and granted a boon to be visited to complete the pilgrimage.",
        "spiritualArchitecture": "The Bhawan is located at 5,200 ft. The main cave is about 98 feet long. Modern structures have been built around the cave to manage millions of pilgrims.",
        "vedicReferences": "Vaishno Devi is revered as the Shakti of Vishnu. She is mentioned as a powerful deity in various regional texts and Puranic lore.",
        "localLegends": "Lore tells of Sridhar, who discovered the cave. Another legend says during Navratri, all gods descend to the cave to pay homage to the Mother.",
        "keyRituals": [
            {"name": "Atka Aarti", "description": "The morning and evening group worship inside the Bhawan."},
            {"name": "Panchamrit Snan", "description": "Sacred bathing of the Pindis at dawn and dusk."},
            {"name": "Bhairon Nath Darshan", "description": "The mandatory visit to the Bhairon temple after the main Darshan."}
        ],
        "highlights": [
            {"name": "Ardhkuwari", "description": "The cave where the Goddess meditated for nine months."},
            {"name": "Bhairon Ghati", "description": "The site of the Bhairon Nath temple at a higher altitude."},
            {"name": "Banganga", "description": "The holy river where pilgrims take a bath before the trek."}
        ],
        "travelInfo": {
            "bestTime": "March to October.",
            "howToReach": "Trek from Katra (12km); Battery cars and helicopter services are available.",
            "nearestAirport": "Jammu Airport (approx 50km).",
            "nearestRailway": "Shri Mata Vaishno Devi Katra Railway Station."
        },
        "tips": [
            "Book your Yatra Parcha online in advance.",
            "Avoid carrying heavy luggage during the trek.",
            "Carry a medical kit for common ailments like muscle pain."
        ],
        "faqs": [
            {"question": "How long is the trek?", "answer": "The trek from Katra to Bhawan is approximately 12 kilometers."},
            {"question": "Is there a battery car service?", "answer": "Yes, battery cars operate between Ardhkuwari and Bhawan for elderly and sick pilgrims."},
            {"question": "What is the Ardhkuwari cave significance?", "answer": "It is where the Goddess stayed for nine months, just like a child in a womb, hence the name ''Ardhkuwari''."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Kurukshetra', 
    'kurukshetra', 
    'Spiritual City', 
    'hr', 
    'The ''Field of Dharma'' (Dharmakshetra), Kurukshetra is the site of the epic Mahabharata war and the place where Lord Krishna delivered the Bhagavad Gita to Arjuna. It is a land of immense historical and spiritual depth, representing the struggle for righteousness.', 
    '440.2', 
    '260.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Threshold of Eternal Wisdom and Duty', 
    'Kurukshetra | Dharmakshetra, Bhagavad Gita & Ancient Lore', 
    'Explore the spiritual heritage of Kurukshetra. Discover the Brahma Sarovar, the site of the Gita Upadesh, and the profound legacy of the Mahabharata war.', 
    'Kurukshetra, Haryana, Bhagavad Gita, Lord Krishna, Mahabharata, Hindu Pilgrimage, Ancient Lore, Dharmakshetra', 
    '88', 
    '{
        "spiritualEssence": "Kurukshetra is the manifestation of the divine as the field of moral action and wisdom. The energy here is solemn, intellectual, and intensely focused on the concept of Dharma. It is the site where the absolute reality (Krishna) addressed the fundamental dilemmas of human existence. The vibration is one of ''Jnana-Yoga'' (the path of knowledge). As a vast plain of ancient battles, the vibration is one of sacrifice and the ultimate victory of truth. A visit here is believed to grant the devotee the clarity to perform their duties without attachment. The air is always vibrant with the silent echoes of the conch shells and the eternal verses of the Gita.",
        "longDescription": "Kurukshetra, located in Haryana, is one of the most sacred lands in India. It is where the 18-day battle between the Pandavas and the Kauravas took place. The town is home to the Brahma Sarovar, a massive sacred pool said to have been created by Lord Brahma himself. The Jyotisar temple marks the exact spot where Krishna is believed to have delivered the Bhagavad Gita under a banyan tree. The city is a major center for Vedic learning and features several archaeological sites that link it to the ancient Harappan and Aryan civilizations. Kurukshetra is not just a geographical site but a spiritual symbol of the internal war between the higher and lower selves of every human being.",
        "spiritualArchitecture": "The architecture of Kurukshetra is characterized by its massive sacred tanks and modern memorial structures. The Brahma Sarovar is a magnificent water body with stone-paved ghats and a central temple. The Jyotisar complex features a grand marble chariot depicting Krishna and Arjuna, and an ancient banyan tree that is worshipped as a living witness to the Gita. The city also features several high-tech museums like the Sri Krishna Museum and the Panorama and Science Center, which use modern technology to narrate the ancient epics. The use of red stone and white marble in the modern shrines creates a sense of regal spiritual power.",
        "vedicReferences": "Kurukshetra is mentioned in the Rig Veda and is the opening word of the Bhagavad Gita (Dharmakshetre Kurukshetre). It is hailed as the supreme site for the performance of sacred sacrifices.",
        "deepInsights": "The delivery of the Gita in the middle of a battlefield represents the presence of spiritual wisdom in the midst of life''s greatest conflicts. Kurukshetra teaches that the soul is eternal and the performance of Dharma is the highest goal.",
        "ancientLore": "Lore tells that King Kuru, the ancestor of the Pandavas, performed intense penance here to make the land a field of righteousness. Another legend says that during a solar eclipse, all the sacred waters of the world gather in the Brahma Sarovar, granting immense merit to those who bathe in it.",
        "keyRituals": [
                {
                        "name": "Gita Jayanti",
                        "description": "The grand annual celebration of the birth of the Bhagavad Gita, featuring mass recitations and processions."
                },
                {
                        "name": "Brahma Sarovar Snan",
                        "description": "The ritual bath in the massive tank, especially during solar eclipses, believed to wash away all sins."
                },
                {
                        "name": "Jyotisar Deepotsava",
                        "description": "The festival of lamps at the site of the Gita Upadesh, illuminating the ancient banyan tree."
                },
                {
                        "name": "Mahabharata Tirthayatra",
                        "description": "Visiting the various sites associated with the warriors and events of the great war."
                }
        ],
        "highlights": [
                {
                        "name": "Brahma Sarovar",
                        "description": "One of the largest and most sacred man-made water bodies in India."
                },
                {
                        "name": "Jyotisar",
                        "description": "The sacred spot of the Gita Upadesh, featuring an ancient banyan tree and a marble chariot."
                },
                {
                        "name": "Sri Krishna Museum",
                        "description": "A world-class museum dedicated to the life and philosophy of Lord Krishna."
                },
                {
                        "name": "Sannihit Sarovar",
                        "description": "The sacred tank where the seven holy Saraswati rivers are said to meet."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "160km from Delhi and 90km from Chandigarh, well connected by the NH-44. Kurukshetra has its own railway station.",
                "nearestAirport": "Chandigarh Airport / Indira Gandhi International Airport, Delhi.",
                "nearestRailway": "Kurukshetra Junction."
        },
        "tips": [
                "Visit during the Gita Jayanti (usually in December) to see the city in its full spiritual and cultural glory.",
                "Allow a full day to explore the museums, as they offer deep insights into the Mahabharata history.",
                "Take a quiet moment under the banyan tree at Jyotisar to meditate on the verses of the Gita."
        ],
        "faqs": [
                {
                        "question": "Where was the Gita delivered?",
                        "answer": "It was delivered at Jyotisar, about 5km from the main Kurukshetra town, under an ancient banyan tree."
                },
                {
                        "question": "Is the battleground still visible?",
                        "answer": "While the specific 48-kos region is identified, the battleground itself is now a series of archaeological and spiritual sites within the city."
                },
                {
                        "question": "How large is the Brahma Sarovar?",
                        "answer": "It is approximately 1100 meters by 500 meters, making it one of the largest man-made sacred tanks in the world."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Srimushnam', 
    'srimushnam', 
    'Sacred Destination', 
    'tn', 
    'One of the eight Swayambhu Kshetras (self-manifested sites) of Vishnu, Srimushnam is home to the Bhuvaraha Swamy temple. It is a site of immense antiquity where the Lord manifested as the Varaha (Boar) avatar to rescue the earth from the depths of the ocean.', 
    '260.2', 
    '740.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lord who Lifted the Earth and the Secret Stone', 
    'Srimushnam Bhuvaraha Swamy | Tamil Nadu, Varaha & Ancient Lore', 
    'Discover the spiritual power of Srimushnam. Explore the Swayambhu Bhuvaraha shrine, the unique architectural fusion, and the profound significance of the earth-redeemer.', 
    'Srimushnam, Tamil Nadu, Bhuvaraha Swamy, Lord Vishnu, Varaha Avatar, Hindu Pilgrimage, Ancient Lore, Swayambhu', 
    '89', 
    '{
        "spiritualEssence": "Srimushnam is the manifestation of the divine as the tireless protector and the stabilizer of the world. The energy here is deep, earthy, and intensely primordial. It is the site where the Lord personally touched the earth to bring it into the light. The vibration is one of ''Dharini-Raksha'' (protection of the earth). As a Swayambhu Kshetra, the vibration is one of unmediated spiritual presence. A visit here is believed to grant the devotee the same stability and resilience that the Lord gave to the earth. The air is always vibrant with the scent of the sacred Tulsi and the silent, heavy power of the ancient granite pillars.",
        "longDescription": "The Bhuvaraha Swamy temple in Srimushnam is one of the most important Vaishnavite sites in South India. The main deity is a small, self-manifested stone idol of the Varaha avatar, shown with its face turned toward the side, as if just emerging from the ocean with the Earth Goddess. Srimushnam is unique because it is worshipped by both Hindus and Muslims; according to local tradition, the Lord saved a Muslim devotee, and to this day, a festival is held where the Lord visits the nearby Muslim village. The temple complex is a grand display of Vijayanagara and Nayak architecture, featuring several spectacular mandapams and a massive gopuram. It is a site where the ancient Puranic story of the Varaha avatar is brought to life through continuous rituals and deep-rooted community traditions.",
        "spiritualArchitecture": "The temple is an architectural jewel, especially the Purushasukta Mandapam, which is built in the shape of a chariot with stone wheels and horses. The architecture is characterized by its high-quality granite work and the intricate relief carvings of the various avatars of Vishnu. The 131-foot tall Rajagopuram is a majestic sight, visible from miles away across the paddy fields. A unique feature is the inner sanctum where the Swayambhu idol is placed in a small, intense chamber. The complex also features a separate shrine for the Goddess Ambujavalli Thayar, built in the elegant later Nayak style with beautiful floral motifs in stone.",
        "vedicReferences": "Srimushnam is celebrated in the Varaha Purana and the Padma Purana. It is considered one of the eight supreme sites where the Lord is self-manifested in stone.",
        "deepInsights": "The Varaha avatar represents the emergence of consciousness from the depths of ignorance. Srimushnam teaches that no matter how deep the fall, the divine is always ready to dive in and lift the seeker back to the light.",
        "ancientLore": "Lore tells that the Lord sweat after the intense battle to lift the earth, and his sweat became the sacred tank (Nitya Pushkarani) of the temple. Another legend says that the Lord personally commanded that his Muslim devotees be included in his annual festivals to show the unity of his children.",
        "keyRituals": [
                {
                        "name": "Brahmotsavam at Srimushnam",
                        "description": "The grand 10-day festival where the Lord travels to various nearby villages, including the Muslim settlement of Killai."
                },
                {
                        "name": "Varaha Jayanti",
                        "description": "The celebration of the Lord''s manifestation as the boar, with special Abhishekam and prayers."
                },
                {
                        "name": "Thirumanjanam",
                        "description": "The ritual bathing of the processional idols with sacred herbs and waters."
                },
                {
                        "name": "Nitya Pushkarani Snan",
                        "description": "Taking a ritual bath in the sacred tank, believed to be created from the Lord''s own sweat."
                }
        ],
        "highlights": [
                {
                        "name": "Swayambhu Bhuvaraha Idol",
                        "description": "The ancient, self-manifested stone image of the Varaha avatar."
                },
                {
                        "name": "Purushasukta Mandapam",
                        "description": "The chariot-shaped hall, a masterpiece of Vijayanagara stone artistry."
                },
                {
                        "name": "Rajagopuram",
                        "description": "The 131-foot tall entrance tower, a landmark of the region."
                },
                {
                        "name": "Nitya Pushkarani",
                        "description": "The sacred temple tank with high medicinal and spiritual value."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "35km from Chidambaram and 20km from Vridhachalam, well connected by road. Regular buses run from Chidambaram.",
                "nearestAirport": "Tiruchirappalli International Airport / Chennai Airport.",
                "nearestRailway": "Vridhachalam Junction."
        },
        "tips": [
                "Visit during the Brahmotsavam to see the unique communal harmony of the temple festivals.",
                "Observe the intricate chariot design of the Purushasukta Mandapam closely; it is one of the best in Tamil Nadu.",
                "Combine your visit with Chidambaram (Nataraja Temple) located nearby."
        ],
        "faqs": [
                {
                        "question": "What is a Swayambhu Kshetra?",
                        "answer": "It is a site where the idol is believed to have manifested on its own, not carved by human hands."
                },
                {
                        "question": "Is it open to everyone?",
                        "answer": "Yes, while the inner sanctum follows traditional protocols, the temple is known for its inclusive history and festivals."
                },
                {
                        "question": "How far from Chidambaram?",
                        "answer": "It is approximately 35 kilometers and takes about 45-60 minutes by road."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Kanchipuram', 
    'kanchipuram', 
    'Spiritual City', 
    'tn', 
    'The ''City of a Thousand Temples'' and one of the seven holiest cities (Sapta Puri) of India, Kanchipuram is a site of immense spiritual and architectural power. It is the only city that is sacred to both Shaivites and Vaishnavites, once a grand capital of the Pallava and Chola empires.', 
    '380.2', 
    '750.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Golden Citadel of Knowledge and Devotion', 
    'Kanchipuram | City of Thousand Temples, Kamakshi & Ancient Lore', 
    'Experience the profound heritage of Kanchipuram. Discover the Kamakshi Amman temple, the architectural marvel of Kailasanathar, and the legacy of the Silk city.', 
    'Kanchipuram, Tamil Nadu, Kamakshi Amman, Ekambareswarar, Varadharaja Perumal, Hindu Pilgrimage, Ancient Lore, Sapta Puri', 
    '90', 
    '{
        "spiritualEssence": "Kanchipuram is the manifestation of the divine as the supreme seat of wisdom and power. The energy here is scholarly, royal, and intensely diverse. It is the site where the great philosophies of India were debated and refined. The vibration is one of ''Jnana'' (Knowledge) and the harmony of all deities. As one of the Sapta Puri, the vibration is one of eternal liberation. A visit here is believed to grant the devotee the same merit as visiting all the other sacred cities of India. The air is always vibrant with the scent of the temple jasmine and the rhythmic sound of the looms weaving the world-famous Kanchipuram silk.",
        "longDescription": "Kanchipuram is divided into two parts: Shiva Kanchi and Vishnu Kanchi. It is home to the Kamakshi Amman temple, one of the three most important Shakti seats in India. The Ekambareswarar temple houses the Earth Lingam (Prithvi Lingam), one of the five elemental lingams. The Varadharaja Perumal temple is one of the most sacred sites for Vaishnavites. Kanchipuram was the capital of the Pallava dynasty, who pioneered the rock-cut and structural temple architecture of South India. The city is also a primary center for the Kanchi Kamakoti Peetham, established by Adi Shankaracharya. Beyond its temples, Kanchipuram is globally famous for its hand-woven silk sarees, which are considered a part of the city''s spiritual and cultural fabric.",
        "spiritualArchitecture": "The architecture of Kanchipuram spans centuries of development. The Kailasanathar temple is a masterpiece of early Pallava sandstone architecture, known for its intricate relief carvings. The Ekambareswarar temple features a massive 59-meter tall gopuram, one of the tallest in India. The Varadharaja Perumal temple is famous for its 100-pillared hall and the chain of stone rings carved from a single block of granite. The architecture is characterized by its grand scale, the use of diverse materials from sandstone to granite, and the incredible complexity of its iconographic programs.",
        "vedicReferences": "Kanchipuram is mentioned in the Brahmanda Purana and is hailed as the ''Gaya of the South'' for its spiritual importance in ancestral liberation.",
        "deepInsights": "The presence of both Shiva and Vishnu temples in equal measure represents the non-dual nature of the supreme reality. Kanchipuram teaches that all forms of the divine are reflections of the one truth.",
        "ancientLore": "Lore tells that Goddess Parvati made a lingam out of sand under a mango tree to worship Shiva, and the Lord appeared when the river flooded to protect her. Another legend says that the Goddess Kamakshi is the central power of all temples in Kanchipuram, and hence they all face her shrine.",
        "keyRituals": [
                {
                        "name": "Brahmotsavam at Varadharaja Perumal",
                        "description": "The grand annual festival featuring the famous Garuda Sevai procession."
                },
                {
                        "name": "Navratri at Kamakshi Temple",
                        "description": "A 10-day celebration of the Goddess with spectacular decorations and music."
                },
                {
                        "name": "Mahashivratri at Ekambareswarar",
                        "description": "The night-long prayer dedicated to the Earth Lingam."
                },
                {
                        "name": "Silk Weaving Tradition",
                        "description": "The sacred art of weaving, often seen as a form of meditation and service to the community."
                }
        ],
        "highlights": [
                {
                        "name": "Kamakshi Amman Temple",
                        "description": "The supreme seat of the Goddess in Kanchipuram."
                },
                {
                        "name": "Ekambareswarar Temple",
                        "description": "The temple of the Earth Lingam, featuring a 3500-year-old mango tree."
                },
                {
                        "name": "Kailasanathar Temple",
                        "description": "The oldest and most architecturally significant Pallava temple in the city."
                },
                {
                        "name": "Varadharaja Perumal Temple",
                        "description": "The massive Vishnu temple known for its 100-pillared hall."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "75km from Chennai, well connected by road and rail. Regular buses run from Chennai.",
                "nearestAirport": "Chennai International Airport.",
                "nearestRailway": "Kanchipuram Railway Station / Chennai Junction."
        },
        "tips": [
                "Dedicate at least two full days to see the major temples, as they are spread across the city.",
                "Buy Kanchipuram silk from government-approved cooperative societies to ensure authenticity.",
                "Visit the Kailasanathar temple at sunset for the most spectacular view of the sandstone carvings."
        ],
        "faqs": [
                {
                        "question": "How many temples are there?",
                        "answer": "Historically called the city of a thousand temples, several hundred still survive in various states of preservation."
                },
                {
                        "question": "Is it a part of the Char Dham?",
                        "answer": "No, it is one of the Sapta Puri (Seven Holy Cities), not the Char Dham."
                },
                {
                        "question": "How far is it from Chennai?",
                        "answer": "It is about 75 kilometers and takes approximately 2 hours by road."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Draksharama', 
    'draksharama', 
    'Sacred Destination', 
    'ap', 
    'One of the five Pancharama Kshetras, Draksharama is known as the ''Dakshina Kashi'' (Kashi of the South). It is a site of immense antiquity where the Lord manifested as a 14-foot tall crystalline Lingam, and where the energy of Shiva and Shakti coexist in perfect balance.', 
    '640.2', 
    '520.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Crystalline Heart of the South', 
    'Draksharama Bheemeshwara Swamy | Andhra Pradesh, Pancharama & Ancient Lore', 
    'Experience the profound power of Draksharama. Discover the 14-foot crystalline Lingam, the legend of the Daksha Yagna, and the spiritual grandeur of the Kashi of the South.', 
    'Draksharama, Andhra Pradesh, Pancharama, Lord Shiva, Dakshina Kashi, Hindu Pilgrimage, Ancient Lore, Bheemeshwara Swamy', 
    '98', 
    '{
        "spiritualEssence": "Draksharama is the manifestation of the divine as the unshakeable foundation and the supreme bridge between worlds. The energy here is ancient, heavy, and intensely stable. It is the site where the crystal light of the universe is grounded into the earth. The vibration is one of ''Sthirata'' (Stability) and the absolute union of Shiva and Shakti. As one of the Pancharama Kshetras, the vibration is one of primordial power. A visit here is believed to grant the devotee the same liberation as visiting Kashi. The air is always vibrant with the scent of the sacred Bilva leaves and the silent, crystalline hum of the massive Lingam.",
        "longDescription": "Draksharama is located in the East Godavari district and is one of the most significant pilgrimage sites in South India. The main deity is Lord Bheemeshwara Swamy, a 14-foot tall crystalline Lingam that spans two stories of the temple. Legend says that the Lingam is a part of the original Atma-Lingam of Shiva that was shattered by Kartikeya to defeat the demon Taraka. The site is also one of the 18 Maha Shakti Peethas, where the left cheek of Goddess Sati is said to have fallen, worshipped here as Manikyamba. The temple complex is a grand fortress-like structure with massive stone walls and intricate carvings that reflect the patronage of the Eastern Chalukyas and the Cholas. Draksharama is unique for its strict adherence to ancient Vedic rituals and its status as a site where the Lord is worshipped with the same protocols as in Varanasi.",
        "spiritualArchitecture": "The architecture of Draksharama is a magnificent example of the Chalukyan-Chola fusion. The temple is built as a two-storied structure to accommodate the 14-foot Lingam. The lower floor allows for the worship of the base of the Lingam, while the upper floor is where the main Abhishekam is performed for the head of the Lingam. The temple features massive stone pillars with detailed relief carvings of the Puranas. The complex is surrounded by high stone walls (Prakaram) that give it the appearance of a spiritual fortress. The use of dark granite and the precision of the stone joints create an atmosphere of timelessness and regal power.",
        "vedicReferences": "Draksharama is mentioned in the Skanda Purana and the Brahmanda Purana. It is celebrated as one of the three eyes of the Trilinga Desa (the land of three lingams).",
        "deepInsights": "The 14-foot Lingam represents the scale of the cosmic consciousness that spans multiple planes of existence. Draksharama teaches that the divine is both the foundation (below) and the peak (above).",
        "ancientLore": "Lore tells that this site was originally the place where Daksha Prajapati performed his ill-fated Yagna, leading to the self-immolation of Sati. Another legend says that the sages chose this spot because the Godavari river bends here in a way that creates a unique spiritual vortex.",
        "keyRituals": [
                {
                        "name": "Mahanyasa Purvaka Ekadasa Rudrabhishekam",
                        "description": "The elaborate 11-fold ritual bathing of the massive crystalline Lingam with Vedic chants."
                },
                {
                        "name": "Karthika Masam Deepotsavam",
                        "description": "The festival of lamps where the entire two-storied complex is illuminated, reflecting on the sacred waters."
                },
                {
                        "name": "Maha Shivaratri",
                        "description": "The grand annual celebration where the 14-foot Lingam is worshipped throughout the night with continuous rituals."
                },
                {
                        "name": "Manikyamba Sahasranama",
                        "description": "The ritual chanting of the thousand names of the Goddess at the Shakti Peeth shrine."
                }
        ],
        "highlights": [
                {
                        "name": "14-foot Crystalline Lingam",
                        "description": "The massive, self-manifested crystal pillar that spans two floors."
                },
                {
                        "name": "Manikyamba Shakti Peeth",
                        "description": "The ancient shrine of the Goddess, one of the 18 Maha Shakti Peeths."
                },
                {
                        "name": "Sapta Godavari Tank",
                        "description": "The sacred temple tank believed to contain the waters of all seven holy rivers."
                },
                {
                        "name": "Two-Storied Sanctum",
                        "description": "The unique architectural layout designed for the worship of the colossal Lingam."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Karthika Masam).",
                "howToReach": "30km from Kakinada and 40km from Rajahmundry, well connected by road. Regular buses run from both cities.",
                "nearestAirport": "Rajahmundry Airport.",
                "nearestRailway": "Kakinada Town / Rajahmundry Junction."
        },
        "tips": [
                "Climb to the first floor of the sanctum to witness the main Abhishekam of the Lingam''s head; it is a unique perspective.",
                "Visit during the month of Karthika to see the temple in its most vibrant ritual state.",
                "Maintain silence and follow the traditional dress code expected in this highly orthrodox shrine."
        ],
        "faqs": [
                {
                        "question": "How tall is the Lingam?",
                        "answer": "The Lingam is approximately 14 feet tall and is made of a unique crystalline stone."
                },
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the 18 Maha Shakti Peeths where the cheek of Sati is said to have fallen."
                },
                {
                        "question": "Why is it called Dakshina Kashi?",
                        "answer": "Due to its immense spiritual power, antiquity, and the similarity of its rituals to the Kashi Vishwanath temple."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Samalkot (Kumararama)', 
    'samalkot-kumararama', 
    'Sacred Destination', 
    'ap', 
    'The second of the Pancharama Kshetras, Kumararama Bheemeshwara Swamy was built by the Chalukyan king Bhima I. It is a site of architectural elegance and spiritual focus, housing a 14-foot limestone Lingam that symbolizes the victory of divine light over darkness.', 
    '645.5', 
    '525.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Limestone Pillar of the Divine Prince', 
    'Samalkot Kumararama Bheemeshwara | Andhra Pradesh, Pancharama & Ancient Lore', 
    'Discover the architectural beauty of Samalkot. Explore the 14-foot limestone Lingam, the legend of Kartikeya, and the profound legacy of the Chalukyan kings.', 
    'Samalkot, Andhra Pradesh, Pancharama, Lord Shiva, Kumararama, Hindu Pilgrimage, Ancient Lore, Chalukya', 
    '99', 
    '{
        "spiritualEssence": "Samalkot is the manifestation of the divine as the focused and triumphant energy of the soul. The energy here is sharp, clear, and intensely purposeful. It is the site where the warrior-spirit of the divine (Kartikeya) established the foundation of peace. The vibration is one of ''Sankalpa'' (Will) and the clarity of the intellect. As one of the Pancharama Kshetras, the vibration is one of ancient, structured spiritual power. A visit here is believed to grant the devotee the strength to overcome their internal demons and the clarity to see their path. The air is always vibrant with the scent of the temple jasmine and the silent, white radiance of the limestone Lingam.",
        "longDescription": "The Kumararama temple in Samalkot is an architectural twin of the Draksharama temple, built by the same king, Chalukya Bhima I, in the late 9th century. The temple is dedicated to Lord Shiva as Bheemeshwara Swamy. The main deity is a 14-foot tall limestone Lingam that spans two stories. The site is called Kumararama because legend says the Lingam was installed here by Kumara (Kartikeya) himself after the shattering of the demon Taraka''s Atma-Lingam. The temple is famous for its 100-pillared hall and its beautifully preserved carvings. Samalkot is a site where the history of the Chalukyan empire and the mythology of the Pancharamas are perfectly integrated, offering a serene and profound spiritual experience.",
        "spiritualArchitecture": "The temple follows the same two-storied plan as Draksharama, designed to accommodate the massive 14-foot Lingam. The architecture is a classic example of the Dravidian-Chalukyan style, featuring a grand gopuram and a spacious courtyard. The 100-pillared hall is the highlight, with each pillar featuring unique relief carvings of deities and celestial beings. The use of white limestone for the main Lingam creates a unique visual contrast with the dark granite of the sanctum. The architecture is designed to emphasize the verticality of the Lingam, drawing the devotee''s gaze upward from the material to the spiritual.",
        "vedicReferences": "Samalkot is celebrated in the local sthalapuranas and is considered a primary site for the study of the medieval religious architecture of the Andhra region.",
        "deepInsights": "The white limestone of the Lingam represents the purity of the consciousness that remains untouched by the darkness of ignorance. Samalkot teaches that true victory is the one that establishes a foundation for eternal peace.",
        "ancientLore": "Lore tells that when the Atma-Lingam of Taraka was shattered, five pieces fell in different places, and this was the spot where the second piece fell. Another legend says that the King Bhima personally supervised the construction to ensure it matched the spiritual power of Draksharama.",
        "keyRituals": [
                {
                        "name": "Mahashivaratri Brahmotsavam",
                        "description": "The grand annual festival celebrated with 10 days of elaborate rituals and processions."
                },
                {
                        "name": "Abhishekam on the First Floor",
                        "description": "The ritual worship performed for the top of the 14-foot Lingam, accessible via the upper gallery."
                },
                {
                        "name": "Nandi Puja",
                        "description": "Special worship of the massive and beautifully carved Nandi at the temple entrance."
                },
                {
                        "name": "Pradosha Vratam",
                        "description": "The twilight worship of the Lord, attracting large numbers of local devotees."
                }
        ],
        "highlights": [
                {
                        "name": "14-foot Limestone Lingam",
                        "description": "The massive white stone pillar at the heart of the two-storied sanctum."
                },
                {
                        "name": "100-Pillared Hall",
                        "description": "A magnificent pillared corridor with intricate carvings from the 9th century."
                },
                {
                        "name": "Chalukya Bhima''s Inscriptions",
                        "description": "Ancient records etched into the temple walls detailing its royal history."
                },
                {
                        "name": "Twin Temple Layout",
                        "description": "The unique architectural similarity with Draksharama, reflecting the King''s vision."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "15km from Kakinada and well connected by rail; Samalkot is a major railway junction.",
                "nearestAirport": "Rajahmundry Airport.",
                "nearestRailway": "Samalkot Junction."
        },
        "tips": [
                "Visit both Draksharama and Samalkot on the same day to appreciate their architectural and spiritual twin-ship.",
                "Take the time to examine the pillars in the 100-pillared hall; the detail is extraordinary for its age.",
                "The temple is quieter than Draksharama, making it ideal for peaceful meditation."
        ],
        "faqs": [
                {
                        "question": "How is it different from Draksharama?",
                        "answer": "While architecturally similar, Samalkot features a white limestone Lingam and was built slightly later; it is also generally less crowded."
                },
                {
                        "question": "Who built it?",
                        "answer": "It was built by the Eastern Chalukyan King Bhima I in the late 9th century CE."
                },
                {
                        "question": "Is it a functioning temple?",
                        "answer": "Yes, it is an active place of worship with regular daily rituals and major festivals."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Amaravathi (Aramarama)', 
    'amaravathi-aramarama', 
    'Sacred Destination', 
    'ap', 
    'The capital of the ancient Satavahana empire and the third of the Pancharama Kshetras, Aramarama is home to the Amareshwara Swamy temple. Located on the banks of the Krishna river, it is a site where Hindu and Buddhist heritages converge in a land of eternal peace.', 
    '600.2', 
    '550.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lord of the Immortal Abode and the River of Grace', 
    'Amaravathi Amareshwara Swamy | Andhra Pradesh, Pancharama & Ancient Lore', 
    'Experience the spiritual depth of Amaravathi. Discover the Amareshwara temple, the ancient Buddhist stupas, and the profound energy of the Krishna river pilgrimage.', 
    'Amaravathi, Andhra Pradesh, Pancharama, Lord Shiva, Amareshwara, Hindu Pilgrimage, Ancient Lore, Krishna River', 
    '100', 
    '{
        "spiritualEssence": "Amaravathi is the manifestation of the divine as the immortal and all-pervading consciousness. The energy here is expansive, peaceful, and intensely historical. It is the site where the material world (the capital) was completely dedicated to the spiritual (the temple). The vibration is one of ''Amritatvam'' (Immortality) and the continuity of life. As a site on the Krishna river, the vibration is one of cleansing and renewal. A visit here is believed to grant the devotee the freedom from the fear of death and the realization of the eternal self. The air is always vibrant with the scent of the river silt and the silent, ancient power of the massive stone Lingam.",
        "longDescription": "Amaravathi, situated on the south bank of the Krishna river, has been a major spiritual and political center for over 2000 years. The Amareshwara temple is one of the five Pancharama Kshetras, where a part of the original Atma-Lingam is said to have been installed. The temple is dedicated to Lord Shiva as Amareshwara. The city was also the site of the Great Stupa of Amaravathi, one of the most important Buddhist monuments in the world. This convergence of Shaivism and Buddhism made Amaravathi a global center for learning and pilgrimage. The temple is famous for its 15-foot tall white marble Lingam, which required the construction of a unique three-tiered sanctum. Amaravathi remains the spiritual heart of the new Andhra capital region, representing the enduring legacy of the land''s ancient wisdom.",
        "spiritualArchitecture": "The temple features a unique three-tiered architecture. The first tier is the base, the second is the gallery for the middle of the Lingam, and the third is the upper deck for the Abhishekam of the head. The main tower (Gopuram) is built in the Dravidian style and is known for its height and intricate sculptures. The use of white marble for the main Lingam is a unique feature that reflects the local material used in the ancient Buddhist stupas. The complex is surrounded by high walls and features several beautiful mandapams. The architecture is designed to reflect the scale and grandeur of a capital city''s primary shrine.",
        "vedicReferences": "Amaravathi is mentioned in the Skanda Purana and the Padma Purana. It is celebrated as the site where Lord Indra performed penance to be cured of a curse.",
        "deepInsights": "The name Amaravathi (the city of the immortals) represents the state of mind that has transcended the cycles of time. Amaravathi teaches that true power is the one that is rooted in spiritual immortality.",
        "ancientLore": "Lore tells that the Lingam in Amaravathi was growing so fast that a nail was driven into its top to stop its growth, leading to a blood-like stain that is still visible. Another legend says that the Goddess Parvati herself performed penance on the banks of the Krishna here.",
        "keyRituals": [
                {
                        "name": "Amareshwara Brahmotsavam",
                        "description": "The grand annual festival celebrated during the month of Magha, attracting lakhs of pilgrims."
                },
                {
                        "name": "Krishna Nadi Snanam",
                        "description": "The ritual bath in the sacred river Krishna, believed to be highly auspicious before entering the temple."
                },
                {
                        "name": "Mahanyasa Abhishekam",
                        "description": "The elaborate Vedic ritual performed for the 15-foot marble Lingam."
                },
                {
                        "name": "Linga Utsavam",
                        "description": "The ritual procession where the processional deity is taken around the ancient city ruins."
                }
        ],
        "highlights": [
                {
                        "name": "15-foot White Marble Lingam",
                        "description": "The colossal self-manifested stone pillar at the heart of the temple."
                },
                {
                        "name": "Ancient Buddhist Stupa Ruins",
                        "description": "Located nearby, showing the convergence of two great spiritual traditions."
                },
                {
                        "name": "Krishna River Ghats",
                        "description": "The beautiful and sacred steps leading down to the river."
                },
                {
                        "name": "The Amaravathi Museum",
                        "description": "Housing some of the most spectacular Buddhist and Hindu stone carvings in India."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "35km from Guntur and 40km from Vijayawada, well connected by road. Regular buses run from both cities.",
                "nearestAirport": "Vijayawada International Airport.",
                "nearestRailway": "Guntur Junction / Vijayawada Junction."
        },
        "tips": [
                "Visit the Buddhist Stupa ruins and the museum first to understand the historical context of the city.",
                "The river bath is essential for the full experience; use the well-maintained ghats near the temple.",
                "Try to visit during the full moon of the month of Magha for the most powerful spiritual experience."
        ],
        "faqs": [
                {
                        "question": "Why is the Lingam so tall?",
                        "answer": "As one of the Pancharamas, it represents a large fragment of the primordial Atma-Lingam; the three-tiered sanctum was built to allow for its proper worship."
                },
                {
                        "question": "Is it the new capital of Andhra?",
                        "answer": "The spiritual town of Amaravathi is the inspiration and the core of the new capital region being developed nearby."
                },
                {
                        "question": "Can I see the blood stain on the Lingam?",
                        "answer": "The red mark at the top of the Lingam is visible during the Abhishekam and is a part of its ancient lore."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Bhimavaram (Somarama)', 
    'bhimavaram-somarama', 
    'Sacred Destination', 
    'ap', 
    'The fourth of the Pancharama Kshetras, Somarama in Bhimavaram is unique for its Lingam that changes color according to the lunar cycle. Established by the Moon God (Soma), it is a site of immense celestial and emotional healing.', 
    '630.5', 
    '530.8', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lunar Pillar of Changing Colors and Inner Peace', 
    'Bhimavaram Somarama | Andhra Pradesh, Pancharama & Ancient Lore', 
    'Discover the celestial mystery of Bhimavaram. Explore the color-changing Lingam, the legend of the Moon God, and the profound energy of the lunar pilgrimage.', 
    'Bhimavaram, Andhra Pradesh, Pancharama, Lord Shiva, Somarama, Hindu Pilgrimage, Ancient Lore, Moon God', 
    '101', 
    '{
        "spiritualEssence": "Bhimavaram is the manifestation of the divine as the rhythmic and healing power of the mind. The energy here is cool, reflective, and intensely restorative. It is the site where the cycles of nature are directly reflected in the sacred stone. The vibration is one of ''Chandratvam'' (Lunar quality) and the balance of the emotions. As one of the Pancharama Kshetras, the vibration is one of ancient, celestial spiritual power. A visit here is believed to grant the devotee the healing of the mind and the peace of the soul. The air is always vibrant with the scent of the temple lotus and the silent, shifting radiance of the color-changing Lingam.",
        "longDescription": "The Someshwara Swamy temple in Bhimavaram is one of the most mysterious and beloved of the Pancharamas. The main deity is Lord Shiva as Someshwara. The Lingam here is unique because it changes its color: it is milky white during the full moon and gradually turns dark or black during the new moon. Legend says that the Lingam was installed here by the Moon God (Soma) to be cured of a curse. The temple complex is a beautiful and serene site, featuring a large sacred tank (Chandra Pushkarani) and a two-storied sanctum. The town of Bhimavaram is a major hub of the West Godavari district, but the temple remains a secluded oasis of celestial energy.",
        "spiritualArchitecture": "The temple follows the classic Pancharama two-storied layout. The first floor allows for the worship of the Goddess Annapurna, while the second floor is where the main Abhishekam of the Someshwara Lingam is performed. The architecture is characterized by its clean lines and the beautiful carvings of the various lunar deities. The Chandra Pushkarani is a central feature, reflecting the moonlight onto the temple walls. The use of specific stones that respond to the lunar cycle is a subject of great interest and a testament to the ancient knowledge of the Chalukyan builders.",
        "vedicReferences": "Bhimavaram is celebrated in the Skanda Purana and is considered a primary site for the worship of Shiva in his aspect as the Lord of the Moon.",
        "deepInsights": "The changing color of the Lingam represents the dynamic and ever-changing nature of the human mind and emotions. Bhimavaram teaches that the divine remains constant even through the cycles of growth and decay.",
        "ancientLore": "Lore tells that the Moon God was cursed by Daksha and lost his radiance, which he regained after bathing in the tank here and installing this Lingam. Another legend says that the site was originally a forest of white lotuses that bloomed only by the moonlight.",
        "keyRituals": [
                {
                        "name": "Full Moon Mahabhishekam",
                        "description": "The special ritual bathing of the Lingam when it is at its brightest white state."
                },
                {
                        "name": "Chandra Pushkarani Snanam",
                        "description": "Taking a ritual bath in the sacred tank during the night of the full moon."
                },
                {
                        "name": "Annapurna Puja",
                        "description": "Worshipping the Goddess of Abundance on the ground floor of the sanctum."
                },
                {
                        "name": "Maha Shivaratri",
                        "description": "The night-long celebration with special emphasis on the lunar alignment."
                }
        ],
        "highlights": [
                {
                        "name": "Color-Changing Lingam",
                        "description": "The unique stone pillar that shifts from white to black according to the moon."
                },
                {
                        "name": "Chandra Pushkarani",
                        "description": "The massive and sacred temple tank associated with the Moon God."
                },
                {
                        "name": "Annapurna Shrine",
                        "description": "The ground-floor shrine that must be visited before the main deity."
                },
                {
                        "name": "Chalukyan Stone Work",
                        "description": "Intricate relief carvings from the early medieval period."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during full moon nights).",
                "howToReach": "Well connected by rail and road; Bhimavaram is a major town in West Godavari.",
                "nearestAirport": "Rajahmundry Airport / Vijayawada Airport.",
                "nearestRailway": "Bhimavaram Junction."
        },
        "tips": [
                "Try to visit on a full moon night (Purnima) to see the Lingam in its most radiant white state.",
                "The temple is located in Gunupudi area of the city; it is easy to reach by auto-rickshaw.",
                "Respect the peaceful atmosphere of the temple, which is known for its meditative quality."
        ],
        "faqs": [
                {
                        "question": "How does it change color?",
                        "answer": "It is a rare natural phenomenon where the stone reacts to the specific light and atmospheric conditions of the lunar cycle."
                },
                {
                        "question": "Who founded it?",
                        "answer": "Legend attributes the foundation to the Moon God (Soma), while the current structure was built by the Chalukyas."
                },
                {
                        "question": "Which floor is the main deity on?",
                        "answer": "The Someshwara Lingam is on the first floor, while the Goddess is on the ground floor."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Palakollu (Kshirarama)', 
    'palakollu-kshirarama', 
    'Sacred Destination', 
    'ap', 
    'The fifth of the Pancharama Kshetras, Kshirarama in Palakollu is famous for its massive 120-foot tall white gopuram and its crystalline Lingam. It is a site of absolute purity where the Lord is said to have gifted a sea of milk to his devotee.', 
    '635.2', 
    '535.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Milky Pillar of Infinite Grace and Purity', 
    'Palakollu Kshirarama | Andhra Pradesh, Pancharama & Ancient Lore', 
    'Experience the profound purity of Palakollu. Discover the 120-foot tall Gopuram, the crystalline Lingam, and the legend of the Sea of Milk.', 
    'Palakollu, Andhra Pradesh, Pancharama, Lord Shiva, Kshirarama, Hindu Pilgrimage, Ancient Lore, Milk Sea', 
    '102', 
    '{
        "spiritualEssence": "Palakollu is the manifestation of the divine as the infinite and pure nourishment of the soul. The energy here is soft, sweet, and intensely graceful. It is the site where the maternal aspect of the divine was channeled through the form of the Lord. The vibration is one of ''Shuddha-Sattva'' (Pure Goodness) and the abundance of grace. As one of the Pancharama Kshetras, the vibration is one of ancient, white-light spiritual power. A visit here is believed to grant the devotee the purity of the heart and the fulfillment of all spiritual desires. The air is always vibrant with the scent of the temple milk and the soaring presence of the 120-foot white tower.",
        "longDescription": "The Kshira Ramalingeshwara Swamy temple in Palakollu is the final piece of the Pancharama puzzle. The main deity is a small crystalline Lingam. The site is called Kshirarama because legend says the Lord created a ''Sea of Milk'' (Kshira Sagara) to satisfy the hunger of the son of Sage Upamanyu. The temple is famous for its Pedda Gopuram, a massive 120-foot tall white entrance tower that is one of the tallest in the region. The temple complex is a grand display of Chalukyan and later local styles, featuring several beautiful mandapams and a sacred tank. Palakollu is a major center for the coconut and fruit trade, reflecting the abundance associated with the Mother Goddess and the Lord''s gift of milk.",
        "spiritualArchitecture": "The temple is famous for its 120-foot tall Rajagopuram, which features nine levels and is covered with hundreds of intricate sculptures. The main sanctum is a two-storied structure, following the Pancharama tradition. The architecture is characterized by its vertical emphasis and the use of white-wash, giving it a bright and celestial appearance. The pillars are covered with relief carvings of the various forms of Shiva and Vishnu, reflecting the non-dual tradition of the region. The complex also features a separate shrine for the Goddess Parvati, known here as Rajya Lakshmi Thayar.",
        "vedicReferences": "Palakollu is celebrated in the Skanda Purana and is considered a primary site for the study of the Shaiva Siddhanta in the Godavari delta.",
        "deepInsights": "The gift of the sea of milk represents the infinite abundance of the divine that is available to the sincere seeker. Palakollu teaches that the Lord is the ultimate provider who nourishes both the body and the soul.",
        "ancientLore": "Lore tells that the Lingam here is the largest of the five pieces of the shattered Atma-Lingam. Another legend says that the Lord personally accepted the milk offering from the child Upamanyu, showing his maternal love for his devotees.",
        "keyRituals": [
                {
                        "name": "Kshirabhishekam",
                        "description": "The ritual bathing of the crystalline Lingam with massive quantities of fresh milk, continuing the ancient legend."
                },
                {
                        "name": "Brahmotsavam at Palakollu",
                        "description": "The grand annual festival celebrated during the month of Magha with chariot processions."
                },
                {
                        "name": "Kalyanotsavam",
                        "description": "The ritual marriage of the Lord and the Goddess, celebrated with great pomp."
                },
                {
                        "name": "Pradosha Puja",
                        "description": "The twilight worship where the Lord is adorned with special floral decorations."
                }
        ],
        "highlights": [
                {
                        "name": "120-foot Rajagopuram",
                        "description": "The massive white tower that is the landmark of the city."
                },
                {
                        "name": "Crystalline Lingam",
                        "description": "The small but intensely powerful self-manifested crystal pillar."
                },
                {
                        "name": "Kshira Pushkarani",
                        "description": "The sacred temple tank associated with the Sea of Milk legend."
                },
                {
                        "name": "Gokarneswara Shrine",
                        "description": "A unique sub-shrine within the complex with its own ancient history."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by rail and road; Palakollu is a major town on the Kakinada-Vijayawada line.",
                "nearestAirport": "Rajahmundry Airport.",
                "nearestRailway": "Palakollu Railway Station."
        },
        "tips": [
                "Visit in the early morning to see the 120-foot tower illuminated by the rising sun; it is a spectacular sight.",
                "Observe the milk Abhishekam; it is the most significant ritual of this temple.",
                "Combine your visit with Bhimavaram, which is just 20km away."
        ],
        "faqs": [
                {
                        "question": "Why is it called Kshirarama?",
                        "answer": "It is named after ''Kshira'' (Milk), commemorating the Lord''s gift of a sea of milk to a child devotee."
                },
                {
                        "question": "How old is the tower?",
                        "answer": "The main gopuram was built in the 14th century and has been meticulously maintained and white-washed for centuries."
                },
                {
                        "question": "Is it near the other Pancharamas?",
                        "answer": "Yes, it is very close to Bhimavaram, and both can be easily visited in a single day."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Simhachalam', 
    'simhachalam', 
    'Sacred Destination', 
    'ap', 
    'The ''Hill of the Lion,'' Simhachalam is home to the unique Varaha Lakshmi Narasimha Swamy. It is a site where the Lord is worshipped in a form that is covered in sandalwood paste for 364 days a year, revealing his true form only during the auspicious Chandanotsavam.', 
    '660.2', 
    '500.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sandalwood Lord of the Lion Hill', 
    'Simhachalam Narasimha | Andhra Pradesh, Chandanotsavam & Ancient Lore', 
    'Discover the mystical power of Simhachalam. Explore the sandalwood-covered Lord, the legend of Prahalada, and the profound energy of the hill pilgrimage.', 
    'Simhachalam, Andhra Pradesh, Narasimha, Lord Vishnu, Chandanotsavam, Hindu Pilgrimage, Ancient Lore, Vizag', 
    '103', 
    '{
        "spiritualEssence": "Simhachalam is the manifestation of the divine as the fierce protector whose heat is cooled by the fragrance of devotion. The energy here is intense, protective, and intensely fragrant. It is the site where the raw power of the Narasimha avatar is balanced by the maternal grace of Lakshmi and the soothing nature of sandalwood. The vibration is one of ''Shanti'' (Peace) achieved through the containment of power. As a hilltop temple, it represents the elevated state of the protective spirit. A visit here is believed to grant the devotee the courage to face any fear and the coolness of mind to handle any situation. The air is always vibrant with the scent of the sandalwood paste and the cool breeze of the Bay of Bengal.",
        "longDescription": "The Varaha Lakshmi Narasimha temple in Simhachalam is one of the most important Vaishnavite shrines in India. The main deity is a unique combination of the Varaha (Boar) and Narasimha (Lion) avatars. According to legend, the heat of the Lord was so intense after killing the demon Hiranyakasipu that the sages covered him in sandalwood paste to cool him down. This tradition continues to this day; the idol is covered in layers of sandalwood paste and appears as a golden mound (Linga-like) for the entire year. On the day of Akshaya Tritiya, the paste is removed in the ''Chandanotsavam'' festival, and for 12 hours, the true form of the Lord is visible to lakhs of pilgrims. The temple architecture is a spectacular blend of Kalinga, Chalukya, and Chola styles, standing majestically on a hill near Visakhapatnam.",
        "spiritualArchitecture": "The temple is a masterpiece of stone architecture, featuring a grand gopuram and a massive pillared hall (Kappa Sthambha). The architecture is characterized by its intricate relief carvings depicting the stories of the avatars and the life of Prahalada. A unique feature is the Kappa Sthambha (the pole of the turtle), which is believed to have the power to fulfill any wish. The architecture reflects the various dynasties that patronized it, with the outer walls showing Chola and Chalukyan influences and the inner sanctum retaining an older, more primordial feel. The use of dark granite and the precision of the carvings make it one of the most beautiful hill temples in the country.",
        "vedicReferences": "Simhachalam is celebrated in the Skanda Purana and is considered a primary site for the study of the Narasimha tradition in South India.",
        "deepInsights": "The covering of the Lord in sandalwood represents the veiling of the absolute power by the fragrance of love and devotion. Simhachalam teaches that the highest power is the one that is contained and cooled by spiritual discipline.",
        "ancientLore": "Lore tells that the site was originally chosen by Prahalada himself after he was saved by the Lord. Another legend says that the sandalwood used for the Lord must be of a specific variety that only grows in certain parts of the Western Ghats.",
        "keyRituals": [
                {
                        "name": "Chandanotsavam",
                        "description": "The most important annual festival where the sandalwood paste is removed to reveal the true form of the Lord for 12 hours."
                },
                {
                        "name": "Kalyanotsavam",
                        "description": "The ritual marriage of the Lord and the Goddess, celebrated with grand processions."
                },
                {
                        "name": "Kappa Sthambha Puja",
                        "description": "Devotees hug the sacred pillar to have their wishes fulfilled and their problems resolved."
                },
                {
                        "name": "Giri Pradakshina",
                        "description": "The 32km circumambulation of the Simhachalam hill, performed by thousands during the auspicious months."
                }
        ],
        "highlights": [
                {
                        "name": "The Sandalwood-Covered Lord",
                        "description": "The unique idol that remains hidden under layers of paste for most of the year."
                },
                {
                        "name": "Kappa Sthambha",
                        "description": "The legendary pillar believed to be a wish-fulfilling tree in stone."
                },
                {
                        "name": "Intricate Stone Carvings",
                        "description": "Some of the finest relief work in Andhra, depicting the Puranic epics."
                },
                {
                        "name": "Hilltop View",
                        "description": "Spectacular views of the Visakhapatnam city and the sea from the sacred hill."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Chandanotsavam in April/May).",
                "howToReach": "15km from Visakhapatnam city, well connected by road and bus service. Regular buses run from Vizag.",
                "nearestAirport": "Visakhapatnam International Airport.",
                "nearestRailway": "Visakhapatnam Junction / Simhachalam Station."
        },
        "tips": [
                "Prepare for very long queues during Chandanotsavam; it is better to book special Darshan tickets in advance.",
                "Visit the Kappa Sthambha and follow the local tradition of hugging it with a sincere heart.",
                "Take the steps (Giri Pradakshina path) if you are physically fit to experience the hill''s natural beauty."
        ],
        "faqs": [
                {
                        "question": "When can I see the true form of the Lord?",
                        "answer": "Only on the day of Akshaya Tritiya (April/May) during the Chandanotsavam festival."
                },
                {
                        "question": "What is the Kappa Sthambha?",
                        "answer": "It is a sacred stone pillar in the temple believed to have wish-fulfilling powers."
                },
                {
                        "question": "How far from Vizag?",
                        "answer": "It is about 15 kilometers and can be reached in 30-40 minutes by road."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Annavaram', 
    'annavaram', 
    'Sacred Destination', 
    'ap', 
    'The ''Abode of the Supreme Truth,'' Annavaram is home to Sri Veera Venkata Satyanarayana Swamy. Located on the Ratnagiri hill, it is the primary center for the Satyanarayana Vrata, a site of immense peace where devotees seek the blessing of the Lord for a life of truth and prosperity.', 
    '650.5', 
    '515.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hill of Eternal Truth and Sacred Unions', 
    'Annavaram Satyanarayana Swamy | Andhra Pradesh, Vrata & Ancient Lore', 
    'Experience the spiritual power of Annavaram. Discover the Satyanarayana Vrata tradition, the architecture of the Ratnagiri hill, and the profound energy of the Abode of Truth.', 
    'Annavaram, Andhra Pradesh, Satyanarayana Swamy, Ratnagiri, Hindu Pilgrimage, Ancient Lore, Vrata, Marriage', 
    '104', 
    '{
        "spiritualEssence": "Annavaram is the manifestation of the divine as the absolute and actionable truth (Satya). The energy here is serene, auspicious, and intensely focused on the fulfillment of householder duties. It is the site where the simple act of a Vrata (vow) is believed to yield the highest spiritual and material fruits. The vibration is one of ''Sankalpa-Siddhi'' (fulfillment of intent). As a hilltop temple overlooking the Pampa river, it represents the elevated state of a life lived in truth. A visit here is believed to grant the devotee the grace of the Lord for a happy family life and the prosperity of their endeavors. The air is always vibrant with the scent of the Prasadam and the constant, collective chanting of the Satyanarayana Katha.",
        "longDescription": "The Satyanarayana Swamy temple in Annavaram is one of the most popular pilgrimage sites in Andhra Pradesh. The temple is unique because it is built in the shape of a chariot, representing the sun and the flow of time. The main deity is Lord Satyanarayana, a form of Vishnu who is worshipped for the fulfillment of wishes and the removal of obstacles. Annavaram is globally famous for the Satyanarayana Vrata; thousands of families perform this ritual simultaneously in the temple''s massive halls, especially before marriages and new ventures. The temple was built in the late 19th century by the local Zamindar and has since grown into a major spiritual powerhouse. The site''s name, Annavaram (the place of the boon of food), reflects its tradition of providing for its pilgrims.",
        "spiritualArchitecture": "The temple architecture is a modern masterpiece designed by the visionary Raja Ramanarayana. The main shrine is built on two levels, with the lower level representing the material world and the upper level representing the spiritual. The entire structure is designed as a chariot pulled by horses, symbolizing the Lord''s journey across the heavens. The use of white marble and the large, open halls for the Vrata rituals create a sense of scale and auspiciousness. The hilltop setting provides panoramic views of the Pampa river and the lush green fields, making the architecture feel integrated with the natural abundance of the region.",
        "vedicReferences": "Annavaram is considered the primary site for the modern practice of the Satyanarayana Vrata as described in the Skanda Purana.",
        "deepInsights": "The Satyanarayana Vrata represents the power of a simple, truthful intent. Annavaram teaches that the divine is easily accessible to anyone who approaches with a clean heart and a sincere vow.",
        "ancientLore": "Lore tells that the Lord appeared in a dream to the local ruler and asked to be installed on the Ratnagiri hill. Another legend says that the Pampa river was created from the divine energy of the Lord to provide a sacred bathing spot for his devotees.",
        "keyRituals": [
                {
                        "name": "Satyanarayana Swamy Vrata",
                        "description": "The massive and sacred ritual of vow-making, performed by thousands every day in the temple halls."
                },
                {
                        "name": "Pampa River Snanam",
                        "description": "The ritual bath in the river at the foot of the hill before the climb."
                },
                {
                        "name": "Kalyanotsavam",
                        "description": "The grand annual marriage ceremony of the Lord and the Goddess celebrated with thousands of devotees."
                },
                {
                        "name": "Annavaram Prasadam Distribution",
                        "description": "The unique ritual of receiving the special wheat-based halwa, which is considered a divine boon."
                }
        ],
        "highlights": [
                {
                        "name": "Chariot-Shaped Temple",
                        "description": "The unique and magnificent architecture of the main shrine."
                },
                {
                        "name": "Ratnagiri Hill",
                        "description": "The sacred hill on which the temple is situated, offering beautiful views."
                },
                {
                        "name": "Vrata Halls",
                        "description": "The massive, organized spaces where thousands perform rituals simultaneously."
                },
                {
                        "name": "The Golden Spire",
                        "description": "The gleaming Kalasa of the temple that can be seen from the railway line."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road and rail; Annavaram is a major stop on the Chennai-Howrah line.",
                "nearestAirport": "Rajahmundry Airport / Visakhapatnam Airport.",
                "nearestRailway": "Annavaram Railway Station."
        },
        "tips": [
                "Perform the Satyanarayana Vrata personally; it is the most significant experience of this pilgrimage.",
                "The Annavaram Prasadam (the wheat halwa) is world-famous; make sure to get some for your family.",
                "The temple is very crowded on auspicious days like Ekadashi and during the marriage season."
        ],
        "faqs": [
                {
                        "question": "What is the Satyanarayana Vrata?",
                        "answer": "It is a popular Hindu ritual dedicated to Lord Vishnu, performed to express gratitude and seek blessings for success and harmony."
                },
                {
                        "question": "How long does it take?",
                        "answer": "A typical group Vrata at the temple takes about 1.5 to 2 hours."
                },
                {
                        "question": "Is it near the railway station?",
                        "answer": "Yes, the temple is situated on a hill just a few kilometers from the Annavaram railway station."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Yadagirigutta', 
    'yadagirigutta', 
    'Sacred Destination', 
    'ts', 
    'The ''Abode of the Five Narasimhas,'' Yadagirigutta is the most prominent spiritual center of Telangana. Recently rebuilt into a magnificent stone citadel, it is where the Lord manifested in a cave to a sage, offering protection and healing to all who visit.', 
    '500.2', 
    '580.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Golden Citadel of the Protector Lord', 
    'Yadagirigutta Narasimha | Telangana, Pancha Narasimha & Ancient Lore', 
    'Experience the architectural and spiritual grandeur of Yadagirigutta. Discover the five forms of Narasimha, the new stone temple complex, and the profound energy of the sacred cave.', 
    'Yadagirigutta, Telangana, Narasimha, Lord Vishnu, Pancha Narasimha, Hindu Pilgrimage, Ancient Lore, Hyderabad', 
    '105', 
    '{
        "spiritualEssence": "Yadagirigutta is the manifestation of the divine as the supreme refuge and the healer of the spirit. The energy here is powerful, protective, and intensely focused on the transformation of the devotee. It is the site where the raw energy of the Narasimha avatar is channeled through the silence of a cave. The vibration is one of ''Raksha'' (Protection) and the removal of all psychological and physical ailments. As a recently rebuilt stone citadel, the vibration is one of cultural pride and spiritual revival. A visit here is believed to grant the devotee the mental strength to face any challenge and the peace of the soul. The air is always vibrant with the scent of the sacred fire and the silent, heavy energy of the massive black granite pillars.",
        "longDescription": "Yadagirigutta, also known as Yadadri, is located on a hill in the Nalgonda district. The temple is dedicated to Lord Narasimha in five different forms (Pancha Narasimha): Jwala, Yogananda, Gandabherunda, Ugra, and Lakshmi Narasimha. According to legend, these forms were revealed to the sage Yada Maharshi in a cave on this hill. For centuries, the temple was a small cave shrine, but it has recently been completely transformed into a massive stone temple using the ancient principles of the Agamas. Over 2,500 stonemasons worked for six years to create this ''Golden Temple of Telangana,'' which is built entirely of black granite without the use of any cement or steel. The temple is a major center for healing, with devotees staying for 40 days (Mandala) to be cured of various afflictions.",
        "spiritualArchitecture": "The new Yadadri temple is a masterpiece of modern-ancient architecture. It is built entirely of black granite (Krushna Shila), featuring massive pillars with intricate carvings of the Alwars and the various forms of Vishnu. The main sanctum remains inside the original cave, but it is now surrounded by a grand 12-acre stone complex. The architecture features seven massive gopurams, including one covered in gold (Swarna Gopuram). The use of the Kakatiya and Dravidian styles, with the precision of modern engineering, makes it one of the most spectacular stone temples built in the last millennium. The architecture is designed to focus the energy into the ancient cave while providing a grand stage for the Lord''s public rituals.",
        "vedicReferences": "Yadagirigutta is celebrated in the local sthalapuranas and is considered a primary site for the worship of the Narasimha avatar in the Telangana region.",
        "deepInsights": "The five forms represent the multiple dimensions of the protective energy. Yadagirigutta teaches that the divine is both the fire (Jwala) and the peace (Lakshmi-Narasimha) that we need to balance our lives.",
        "ancientLore": "Lore tells that the sage Yada was the son of the great Rishyasringa and performed penance here until the Lord appeared in multiple forms to satisfy his devotion. Another legend says that the Sudarshana Chakra of the Lord glows at the top of the hill at night to protect the region.",
        "keyRituals": [
                {
                        "name": "Sudarshana Homam",
                        "description": "The powerful fire ritual performed daily for the protection and well-known of the devotees."
                },
                {
                        "name": "Nitya Kalyanam",
                        "description": "The daily marriage ceremony of the Lord and the Goddess, attracting hundreds of families."
                },
                {
                        "name": "Cave Darshan",
                        "description": "The unique experience of worshipping the five forms of the Lord inside the natural rock cave."
                },
                {
                        "name": "Brahmotsavam at Yadadri",
                        "description": "The grand annual festival celebrated in the month of Phalguna with massive processions."
                }
        ],
        "highlights": [
                {
                        "name": "The Sacred Cave",
                        "description": "The natural cave where the five forms of Narasimha are worshipped."
                },
                {
                        "name": "The Black Granite Temple",
                        "description": "A magnificent new stone structure built entirely without cement or steel."
                },
                {
                        "name": "Swarna Gopuram",
                        "description": "The main tower covered in 125kg of pure gold."
                },
                {
                        "name": "Alwar Pillars",
                        "description": "Intricately carved stone pillars depicting the 12 supreme devotees of Vishnu."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "60km from Hyderabad, well connected by road and rail. Regular buses and taxis are available from Hyderabad city.",
                "nearestAirport": "Rajiv Gandhi International Airport, Hyderabad.",
                "nearestRailway": "Raigir Railway Station / Secunderabad Junction."
        },
        "tips": [
                "Visit on a weekday if possible, as the weekends and holidays are extremely crowded.",
                "Take the time to observe the carvings on the pillars in the main hall; each one is a work of art.",
                "The temple has a very efficient queue system and massive guesthouses; plan for a half-day trip from Hyderabad."
        ],
        "faqs": [
                {
                        "question": "Is it the same as the old temple?",
                        "answer": "The main deity remains in the original cave, but the entire surrounding complex has been rebuilt into a massive stone temple."
                },
                {
                        "question": "How far from Hyderabad?",
                        "answer": "It is approximately 60 kilometers and takes about 1.5 to 2 hours by road."
                },
                {
                        "question": "What is unique about the construction?",
                        "answer": "It is built entirely of black granite using ancient interlocking techniques without any modern cement or steel."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Basara (Gnana Saraswati)', 
    'basara', 
    'Sacred Destination', 
    'ts', 
    'Located on the banks of the Godavari river, Basara is home to the rare Gnana Saraswati temple. It is one of the very few temples in India dedicated to the Goddess of Knowledge, a site where the sage Vyasa is said to have meditated and established the deity using sand.', 
    '480.2', 
    '560.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of Wisdom and the River of Learning', 
    'Basara Gnana Saraswati | Telangana, Vyasa & Ancient Lore', 
    'Experience the profound energy of Basara. Discover the Goddess of Knowledge, the tradition of Akshara Abhyasam, and the legendary history of the sage Vyasa.', 
    'Basara, Telangana, Goddess Saraswati, Sage Vyasa, Hindu Pilgrimage, Ancient Lore, Godavari River, Education', 
    '106', 
    '{
        "spiritualEssence": "Basara is the manifestation of the divine as the supreme clarity and the source of all creative expression. The energy here is gentle, luminous, and intensely scholarly. It is the site where the silence of the sage was transformed into the light of knowledge. The vibration is one of ''Jnana-Shakti'' (the power of wisdom) and the absolute purity of the mind. As a temple on the Godavari, the vibration is one of the flow of ideas and the purification of the intellect. A visit here is believed to grant the devotee the gift of eloquence and the success in all academic and creative pursuits. The air is always vibrant with the scent of the river water and the rhythmic sound of children writing their first letters in rice.",
        "longDescription": "The Gnana Saraswati temple in Basara is a unique landmark in the spiritual map of India. While Saraswati temples are rare, Basara is considered the most important of them all. Legend says that Sage Vyasa, the author of the Mahabharata, spent time here in meditation after the great war. He brought three handfuls of sand from the Godavari and shaped them into idols of Saraswati, Lakshmi, and Kali. Basara is the primary center for ''Akshara Abhyasam'' (the initiation into the world of letters); thousands of families bring their young children here to start their education by writing on a slate or in rice. The temple is located at a scenic point where the Godavari river flows through the Adilabad district, creating a serene environment that is perfectly suited for a Goddess of wisdom.",
        "spiritualArchitecture": "The temple is built in the traditional South Indian style with a focus on simplicity and auspiciousness. It features a small but powerful sanctum and a large hall for the initiation rituals. The architecture is characterized by its white-washed towers and the use of granite for the main shrines. A unique feature is the Vedavyasa cave located nearby, where the sage is said to have lived. The complex also features an ancient pillar that produces musical notes when struck, reflecting the Goddess''s association with the arts. The architecture is designed to handle large numbers of families performing rituals while maintaining a sense of quiet, focused devotion.",
        "vedicReferences": "Basara is celebrated in the local chronicles and is considered a primary site for the study of the Saraswati tradition as described in the Puranas.",
        "deepInsights": "The use of sand to create the idol represents the manifestation of the eternal truth from the simplest of materials. Basara teaches that knowledge is the ultimate wealth that cannot be stolen or lost.",
        "ancientLore": "Lore tells that the Goddess personally appeared to Vyasa and asked him to establish her here to bless the people of the South. Another legend says that the river Godavari personally washes the feet of the Goddess during the massive floods, signaling her divine presence.",
        "keyRituals": [
            {"name": "Akshara Abhyasam", "description": "The sacred ritual where children are initiated into education by writing their first letters in the presence of the Goddess."},
            {"name": "Vasant Panchami", "description": "The grand annual festival dedicated to the Goddess of Knowledge, celebrated with massive crowds and music."},
            {"name": "Saraswati Homam", "description": "The ritual fire sacrifice performed for success in studies and creative works."},
            {"name": "Godavari Aarti", "description": "The evening worship of the sacred river at the temple ghats."}
        ],
        "highlights": [
            {"name": "Gnana Saraswati Shrine", "description": "The central idol made of sacred sand by Sage Vyasa."},
            {"name": "Vedavyasa Cave", "description": "The ancient cave where the sage is said to have performed penance."},
            {"name": "Akshara Abhyasam Halls", "description": "The dedicated spaces where children begin their journey of learning."},
            {"name": "The Musical Pillar", "description": "An ancient stone pillar that resonates with musical tones."}
        ],
        "travelInfo": {
            "bestTime": "October to March (especially during Vasant Panchami).",
            "howToReach": "Well connected by rail and road; Basara is a major stop on the Secunderabad-Manmad line.",
            "nearestAirport": "Rajiv Gandhi International Airport, Hyderabad / Nanded Airport.",
            "nearestRailway": "Basara Railway Station."
        },
        "tips": [
            "If you are bringing a child for Akshara Abhyasam, arrive early in the morning to finish the ritual before the heat.",
            "Visit the Vedavyasa cave and the nearby Godavari bridge for a complete experience of the landscape.",
            "The temple provides simple meals; try the local prasadam which is considered a boon for wisdom."
        ],
        "faqs": [
            {"question": "Is it a rare temple?", "answer": "Yes, temples dedicated primarily to Goddess Saraswati are very few in India, and Basara is one of the most famous."},
            {"question": "Who made the idol?", "answer": "According to legend, the idol was made of sand by Sage Vedavyasa himself."},
            {"question": "How to reach from Hyderabad?", "answer": "It is about 200 kilometers and can be reached by a 4-5 hour train or bus journey."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Beechupally', 
    'beechupally', 
    'Sacred Destination', 
    'ts', 
    'Located on the banks of the Krishna river, Beechupally is home to an ancient Anjaneya Swamy temple. It is a site of immense protective power, where the Lord was installed by a tribal child and where the river crossing has been a sacred tradition for centuries.', 
    '490.5', 
    '595.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Guardian of the Sacred River and the Tribal Heart', 
    'Beechupally Anjaneya Swamy | Telangana, Krishna River & Ancient Lore', 
    'Discover the spiritual power of Beechupally. Explore the ancient Hanuman temple, the legend of the tribal devotee, and the profound energy of the Krishna river crossing.', 
    'Beechupally, Telangana, Anjaneya Swamy, Hanuman, Krishna River, Hindu Pilgrimage, Ancient Lore, Mahbubnagar', 
    '107', 
    '{
        "spiritualEssence": "Beechupally is the manifestation of the divine as the loyal protector and the humble strength of the soul. The energy here is raw, intense, and intensely connected to the elements. It is the site where the high philosophy of the saints met the pure devotion of the tribal heart. The vibration is one of ''Bhakti-Veerya'' (the heroism of devotion). As a temple on a major river crossing, it represents the protection during the transitions of life. A visit here is believed to grant the devotee the courage to overcome all obstacles and the protection during their journeys. The air is always vibrant with the sound of the Krishna river and the constant, rhythmic chanting of the Hanuman Chalisa.",
        "longDescription": "The Anjaneya Swamy temple in Beechupally is located in the Mahbubnagar district, right on the banks of the Krishna river. The temple has a history spanning over 200 years. Legend says that the great saint Vyasatirtha installed the idol, but it was a local tribal boy from the Boya community who first started worshipping it with pure devotion. To this day, the priests of the temple belong to the same tribal community, a rare and beautiful example of the inclusive nature of Indian spirituality. Beechupally is a major site for the Krishna Pushkaram festival, held once every 12 years. The site is a natural spiritual hub, where the river flows wide and calm, providing a perfect backdrop for the worship of the Lord of strength.",
        "spiritualArchitecture": "The temple is a simple but powerful structure built in the local Telangana style. It features a grand gopuram and a spacious hall for the devotees. The architecture is characterized by its proximity to the river, with the temple walls often being touched by the sacred waters during the monsoon. A unique feature is the massive and well-maintained ghats that lead down to the Krishna river. The idol of Anjaneya Swamy is a self-assured and powerful stone image, standing as a sentinel over the river crossing. The recent additions to the temple have expanded its capacity while maintaining the raw, natural energy of the original site.",
        "vedicReferences": "Beechupally is celebrated in the local oral traditions and is considered a primary site for the worship of Hanuman in the southern Telangana region.",
        "deepInsights": "The tribal leadership of the temple rituals represents the truth that pure devotion is the only qualification to reach the divine. Beechupally teaches that the Lord is the guardian of every soul, regardless of their social origin.",
        "ancientLore": "Lore tells that the Lord personally chose this spot to protect the travelers who crossed the river at this dangerous point. Another legend says that the river Krishna personally offers her waters to the Lord during the peak of the floods as a mark of respect.",
        "keyRituals": [
            {"name": "Hanuman Jayanti Brahmotsavam", "description": "The grand annual festival celebrated with massive crowds and unique tribal rituals."},
            {"name": "Krishna Pushkaram", "description": "The 12-year celestial festival where millions bathe in the river at Beechupally."},
            {"name": "Sindoor Puja", "description": "Offering the sacred orange vermilion to the Lord for strength and protection."},
            {"name": "River Arati", "description": "The beautiful evening worship of the Krishna river, mirroring the Ganga Arati."}
        ],
        "highlights": [
            {"name": "Anjaneya Swamy Idol", "description": "The ancient and powerful image of Hanuman guarding the river."},
            {"name": "Krishna River Ghats", "description": "Expansive and sacred steps leading to the wide flow of the Krishna."},
            {"name": "Nizam Sugar Factory Bridge", "description": "A nearby engineering landmark that offers a unique perspective of the temple and river."},
            {"name": "Tribal Priest Tradition", "description": "The unique and ancient practice of the Boya community leading the rituals."}
        ],
        "travelInfo": {
            "bestTime": "October to March (especially during Hanuman Jayanti).",
            "howToReach": "150km from Hyderabad, located right on the Hyderabad-Bangalore NH-44 highway. It is an easy stop for travelers.",
            "nearestAirport": "Rajiv Gandhi International Airport, Hyderabad.",
            "nearestRailway": "Gadwal Railway Station."
        },
        "tips": [
            "It is a perfect stop for people driving between Hyderabad and Bangalore; the temple is right on the highway.",
            "Take a boat ride in the Krishna river during the evening to see the temple and the sunset together.",
            "Respect the unique tribal traditions of the temple and the local customs."
        ],
        "faqs": [
            {"question": "Is it a very old temple?", "answer": "The current temple structure is about 200 years old, though the site has been sacred for much longer."},
            {"question": "Who are the priests?", "answer": "The priests belong to the local Boya (tribal) community, continuing a unique historical tradition."},
            {"question": "Is it on the highway?", "answer": "Yes, it is perfectly located on the side of the Hyderabad-Bangalore National Highway (NH-44)."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Mayapur', 
    'mayapur', 
    'Sacred Destination', 
    'wb', 
    'The birthplace of Chaitanya Mahaprabhu and the global headquarters of ISKCON, Mayapur is the spiritual heart of the Gaudiya Vaishnava tradition. Located at the confluence of the Jalangi and Ganges, it is a city of constant chanting and divine ecstasy.', 
    '720.2', 
    '450.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Global Capital of Krishna Consciousness', 
    'Mayapur | West Bengal, ISKCON HQ, Chaitanya & Ancient Lore', 
    'Experience the ecstatic Bhakti of Mayapur. Discover the Temple of the Vedic Planetarium, the birthplace of Chaitanya Mahaprabhu, and the global heart of the Hare Krishna movement.', 
    'Mayapur, West Bengal, ISKCON, Chaitanya Mahaprabhu, Lord Krishna, Hindu Pilgrimage, Ancient Lore, Gaudiya Vaishnava', 
    '108', 
    '{
        "spiritualEssence": "Mayapur is the manifestation of the divine as the supreme nectar of Nama-Sankirtana (chanting). The energy here is joyful, inclusive, and intensely devotional. It is the site where the absolute reality is experienced through the vibration of the holy name. The vibration is one of ''Prem-Bhakti'' (Pure Love) and the absolute unity of the spiritual family. As a city of constant prayer, it represents the descent of the spiritual world (Vaikuntha) onto the earth. A visit here is believed to grant the devotee the taste for the holy name and the realization of the soul''s eternal relationship with the Lord. The air is always vibrant with the sound of the Mridanga and the constant, melodic chanting of the Maha-Mantra.",
        "longDescription": "Mayapur, located in the Nadia district of West Bengal, is one of the nine islands of Navadwip. It is the birthplace of Chaitanya Mahaprabhu, the 15th-century saint who started the Sankirtana movement. The site was rediscovered in the late 19th century by Bhaktivinoda Thakur. Today, it is famous as the global headquarters of ISKCON (International Society for Krishna Consciousness). The center-piece of the city is the Temple of the Vedic Planetarium (TOVP), one of the largest religious structures in the world, featuring a massive dome and complex astronomical displays. Mayapur is a global village where thousands of devotees from every country live and pray together, creating a unique spiritual atmosphere that is both ancient and modern.",
        "spiritualArchitecture": "The architecture of Mayapur is a spectacular blend of traditional Bengali styles and grand modern monuments. The Temple of the Vedic Planetarium is a masterpiece of modern engineering, featuring the world''s largest stainless steel dome covered with blue Bolivian marble. The architecture includes detailed astronomical models based on the Srimad Bhagavatam. The Yoga Peeth (birthplace of Chaitanya) features a white-washed temple with a tall spire and beautiful gardens. The ISKCON complex is a city in itself, with massive guesthouses, parks, and schools designed to accommodate millions of pilgrims. The use of marble, gold-plating, and intricate relief carvings reflects the regal nature of the divine presence in the Gaudiya tradition.",
        "vedicReferences": "Mayapur is celebrated in the Chaitanya Charitamrita and the Chaitanya Bhagavata as the supreme spiritual abode manifested on the banks of the Ganges.",
        "deepInsights": "The congregational chanting represents the collective awakening of the soul. Mayapur teaches that in the current age (Kali Yuga), the simplest path to the divine is through the vibration of the holy name.",
        "ancientLore": "Lore tells that Chaitanya Mahaprabhu personally predicted that one day a magnificent temple would arise in Mayapur and the holy name would be heard in every town and village of the world. Another legend says that the dust of Mayapur is saturated with the tears of the Lord''s ecstatic love.",
        "keyRituals": [
                {
                        "name": "Mangala Aarti",
                        "description": "The ecstatic early morning worship where thousands of devotees dance and chant in the main temple hall."
                },
                {
                        "name": "Navadwip Mandala Parikrama",
                        "description": "The annual 9-day walking pilgrimage around the nine islands of Navadwip."
                },
                {
                        "name": "Ganga Aarti",
                        "description": "The evening worship of the sacred river Ganges at the Mayapur ghats."
                },
                {
                        "name": "Prasadam Seva",
                        "description": "The ritual of honoring the sanctified food, which is cooked on a massive scale for all visitors."
                }
        ],
        "highlights": [
                {
                        "name": "Temple of the Vedic Planetarium",
                        "description": "The massive new temple and astronomical center of the Gaudiya tradition."
                },
                {
                        "name": "Yoga Peeth",
                        "description": "The exact birthplace of Chaitanya Mahaprabhu, marked by a beautiful temple."
                },
                {
                        "name": "Srila Prabhupada Pushpa Samadhi",
                        "description": "The grand memorial dedicated to the founder of ISKCON."
                },
                {
                        "name": "Navadwip Islands",
                        "description": "The surrounding landscape of nine islands, each representing a limb of devotional service."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Gaura Purnima).",
                "howToReach": "130km from Kolkata, well connected by road and rail (Nabadwip Dham station). Regular boats run across the river from Nabadwip to Mayapur.",
                "nearestAirport": "Netaji Subhash Chandra Bose International Airport, Kolkata.",
                "nearestRailway": "Nabadwip Dham / Krishnanagar City Junction."
        },
        "tips": [
                "Stay at the ISKCON guesthouses to experience the full early morning and late night spiritual cycle of the city.",
                "Participate in the evening Sankirtana; it is the most vibrant and ecstatic experience in Mayapur.",
                "Take a boat ride on the Ganges at sunset to see the temple domes from the river."
        ],
        "faqs": [
                {
                        "question": "What is the Vedic Planetarium?",
                        "answer": "It is a massive temple that includes a cosmic model of the universe as described in the ancient Vedic texts."
                },
                {
                        "question": "Is it open to everyone?",
                        "answer": "Yes, Mayapur is a global center that welcomes people of all backgrounds and nationalities."
                },
                {
                        "question": "How to reach from Kolkata?",
                        "answer": "The most common way is by a 3-4 hour taxi ride or by taking a train to Nabadwip and then a short boat ride."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Parshuram Kund', 
    'parshuram-kund', 
    'Sacred Destination', 
    'ar', 
    'Located in the lower reaches of the Lohit river in Arunachal Pradesh, Parshuram Kund is a site of immense mythological importance. It is where the sage Parshuram is said to have washed away his sins after performing an extreme act of duty, making it a primary center for purification in the North-East.', 
    '850.5', 
    '320.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Waters of the Axe-Wielder and the Himalayan Purification', 
    'Parshuram Kund | Arunachal Pradesh, Lohit & Ancient Lore', 
    'Discover the spiritual power of Parshuram Kund. Explore the sacred Lohit river site, the legend of the axe-washing, and the profound energy of the Makar Sankranti pilgrimage.', 
    'Parshuram Kund, Arunachal Pradesh, Lohit River, Parshuram, Hindu Pilgrimage, Ancient Lore, Makar Sankranti', 
    '109', 
    '{
        "spiritualEssence": "Parshuram Kund is the manifestation of the divine as the supreme redeemer and the washer of deep karmic burdens. The energy here is raw, cold, and intensely liberating. It is the site where the heavy burden of duty (even violent duty) was finally released into the flow of nature. The vibration is one of ''Prayashchitta'' (Atonement) and the return to the state of innocence. As a site on the turquoise waters of the Lohit, the vibration is one of crystalline purity. A visit here is believed to grant the devotee the removal of the most stubborn mental and spiritual stains. The air is always vibrant with the sound of the rushing Himalayan waters and the silent, heavy energy of the surrounding mountains.",
        "longDescription": "Parshuram Kund is situated in the Mishmi plateau of Arunachal Pradesh. According to the Puranas, the sage Parshuram killed his mother on his father''s orders, but the axe got stuck to his hand as a sign of the sin. He traveled across India and finally arrived at this spot, where he dipped his hand into the Lohit river; the axe fell off, and his sin was washed away. The site is a major pilgrimage center, especially during Makar Sankranti, when tens of thousands of pilgrims brave the freezing temperatures to take a dip in the holy waters. The natural beauty of the site, with the crystal-clear Lohit river flowing through the dense forests and steep mountains, adds a deep, primeval sanctity to the experience.",
        "spiritualArchitecture": "The architecture of Parshuram Kund is minimal and respects the natural geological features of the river. There is a small shrine dedicated to the sage, but the primary ''architecture'' is the Kund (pool) itself, formed by the natural bend in the river. The government has recently expanded the facilities, including stone-paved ghats and steps to handle the massive crowds during Makar Sankranti. The use of local stone and the integration with the forest landscape reflect the tribal and Himalayan traditions of the region, where nature itself is seen as the grandest temple of the divine.",
        "vedicReferences": "Parshuram Kund is mentioned in the Kalika Purana and various local North-East Indian spiritual oral traditions.",
        "deepInsights": "The sticking of the axe represents the psychological weight of our actions. Parshuram Kund teaches that even the most extreme actions can be purified through sincere atonement and the grace of nature.",
        "ancientLore": "Lore tells that the river Lohit was named so (Lohit means red) because it was originally turned red by the blood of the kings defeated by Parshuram. Another legend says that the pool is bottomless and connects directly to the cosmic waters.",
        "keyRituals": [
                {
                        "name": "Makar Sankranti Snan",
                        "description": "The massive ritual bath in the freezing waters of the Lohit at the break of dawn."
                },
                {
                        "name": "Axe Worship",
                        "description": "Special prayers dedicated to the symbolic axe of Parshuram for protection and strength."
                },
                {
                        "name": "River Arati",
                        "description": "The offering of lamps to the Lohit river during the festival nights."
                },
                {
                        "name": "Mishmi Tribal Rituals",
                        "description": "The unique local traditions that blend with the Hindu pilgrimage at the site."
                }
        ],
        "highlights": [
                {
                        "name": "The Sacred Kund",
                        "description": "The natural pool in the Lohit river where the purification takes place."
                },
                {
                        "name": "Lohit River View",
                        "description": "The spectacular turquoise waters flowing through the Mishmi hills."
                },
                {
                        "name": "Parshuram Temple",
                        "description": "A small but significant shrine dedicated to the 6th avatar of Vishnu."
                },
                {
                        "name": "Makar Sankranti Fair",
                        "description": "The massive gathering of pilgrims and tribal communities from across India."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Makar Sankranti in mid-January).",
                "howToReach": "150km from Tinsukia (Assam) and 25km from Tezu. Well connected by road; regular buses and taxis run from Tinsukia.",
                "nearestAirport": "Dibrugarh Airport (Assam).",
                "nearestRailway": "Tinsukia Junction."
        },
        "tips": [
                "Carry warm clothing as the temperatures can be very low, especially during the January pilgrimage.",
                "Obtain the necessary Inner Line Permit (ILP) required for entering Arunachal Pradesh.",
                "Participate in the Makar Sankranti bath if you are physically fit; it is considered a life-changing experience."
        ],
        "faqs": [
                {
                        "question": "Why is it called Parshuram Kund?",
                        "answer": "It is named after the sage Parshuram, who is believed to have washed his blood-stained axe here."
                },
                {
                        "question": "How cold is the water?",
                        "answer": "In January, the water is near freezing, yet thousands take a ritual dip for its spiritual merit."
                },
                {
                        "question": "Is it safe for tourists?",
                        "answer": "Yes, it is a well-managed pilgrimage site, though the roads can be challenging during the monsoon."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Unakoti', 
    'unakoti', 
    'Sacred Destination', 
    'tr', 
    'The ''Lost Hill of a Million Gods,'' Unakoti is a magnificent rock-cut pilgrimage site in Tripura. It features massive stone bas-reliefs of Shiva and other deities, dating back to the 7th-9th centuries, hidden in a lush rainforest where stone and nature have merged into a spiritual masterpiece.', 
    '820.2', 
    '430.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Million Gods in the Heart of the Forest', 
    'Unakoti | Tripura, Rock-cut Shiva & Ancient Lore', 
    'Discover the mysterious rock-cut wonders of Unakoti. Explore the massive Shiva reliefs, the legend of the million gods, and the profound energy of the Tripura rainforest.', 
    'Unakoti, Tripura, Lord Shiva, Rock-cut, Hindu Pilgrimage, Ancient Lore, Rainforest, Bas-relief', 
    '110', 
    '{
        "spiritualEssence": "Unakoti is the manifestation of the divine as the silent and overwhelming presence of the sacred in nature. The energy here is mysterious, ancient, and intensely grounded. It is the site where the gods themselves were turned into stone, yet their vibration continues to breathe through the moss and the trees. The vibration is one of ''Siddha-Kshetra'' (a site of perfection) and the absolute scale of the divine manifestation. As a rock-cut site in a dense forest, it represents the indwelling spirit of the earth. A visit here is believed to grant the devotee the sense of awe and the realization of the infinite forms of the one truth. The air is always vibrant with the sound of the forest cicadas and the silent, stone-cold power of the 30-foot Shiva face.",
        "longDescription": "Unakoti, which means ''one less than a crore'' (ten million) in Bengali, is a site of absolute artistic and spiritual wonder. The hill is covered with massive rock-cut carvings and stone images. The central figure is the Unakotiswara Kal Bhairav, a 30-foot tall face of Shiva with a magnificent headdress. Beside it are massive figures of Durga standing on a lion and other celestial beings. The origin of these carvings is shrouded in mystery, with historical dates ranging from the 7th to the 12th century CE. The site is a major center for Shaiva worship in the North-East and is famous for the Ashokastami Mela, when thousands of pilgrims gather in the forest to worship the stone gods. Unakoti is a unique bridge between the tribal traditions of Tripura and the mainstream Puranic Shaivism.",
        "spiritualArchitecture": "The ''architecture'' of Unakoti is entirely rock-cut, where the hill itself has been transformed into a temple. The carvings are executed in a unique style that blends tribal aesthetics with classical Indian iconography. The 30-foot Shiva face is the highlight, featuring a third eye and a grand decorative headdress. There are numerous smaller figures of Ganesha, Vishnu, and local deities scattered across the rock face. The site also features natural waterfalls that flow over the carvings, creating a dynamic and living spiritual environment. The use of the vertical rock wall as a canvas creates a sense of scale that is rare in Indian temple architecture, where the mountain itself is the deity.",
        "vedicReferences": "Unakoti is celebrated in local Tripuri oral traditions and is considered a primary site for the study of the Shaivite influence in the tribal North-East.",
        "deepInsights": "The name ''one less than a crore'' represents the humility of the human effort in the face of the infinite. Unakoti teaches that the divine is everywhere, even in the most secluded corners of the natural world.",
        "ancientLore": "Lore tells that Lord Shiva was traveling to Kashi with a crore of gods; they stopped here for the night, but none could wake up at dawn except Shiva. He cursed them all to stay here as stone images, hence the name. Another legend says that a local master-sculptor named Kallu Kumara was asked to carve a crore of gods in a single night to make the place a second Kashi; he fell short by one, leaving the site as Unakoti.",
        "keyRituals": [
                {
                        "name": "Ashokastami Mela",
                        "description": "The grand annual festival held in the spring where thousands bathe in the natural pools and worship the stone reliefs."
                },
                {
                        "name": "Shiva Ratri Puja",
                        "description": "Night-long prayers and offerings performed at the base of the massive Shiva face."
                },
                {
                        "name": "Tribal Offerings",
                        "description": "Unique rituals performed by the local Tripuri communities, integrating their ancestral traditions with Shaiva worship."
                },
                {
                        "name": "River Bath",
                        "description": "Taking a ritual bath in the natural waterfalls and pools that surround the rock carvings."
                }
        ],
        "highlights": [
                {
                        "name": "Unakotiswara Kal Bhairav",
                        "description": "The massive 300-foot rock-cut face of Lord Shiva."
                },
                {
                        "name": "Ganesha Figures",
                        "description": "Unique rock-cut images of Ganesha, some with multiple trunks."
                },
                {
                        "name": "Natural Waterfalls",
                        "description": "The scenic cascades that flow over the ancient stone gods."
                },
                {
                        "name": "The Rainforest Trail",
                        "description": "The beautiful trek through the dense forest to reach the different carving sites."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Ashokastami in April).",
                "howToReach": "180km from Agartala and 8km from Kailashahar. Well connected by road; regular buses and taxis run from Agartala.",
                "nearestAirport": "Maharaja Bir Bikram Airport, Agartala.",
                "nearestRailway": "Kumarghat Railway Station."
        },
        "tips": [
                "Wear comfortable walking shoes as the site involves climbing many stone steps and forest paths.",
                "Visit in the morning to see the sunlight hit the massive stone face of Shiva; the effect is breathtaking.",
                "Carry water and light snacks, as the facilities within the forest site are limited."
        ],
        "faqs": [
                {
                        "question": "What does Unakoti mean?",
                        "answer": "It means ''one less than a crore'' (9,999,999) in Bengali."
                },
                {
                        "question": "How old are the carvings?",
                        "answer": "Historians date them to between the 7th and 9th centuries CE, though local lore says they are much older."
                },
                {
                        "question": "Is it a difficult trek?",
                        "answer": "It involves climbing many steps, but it is manageable for most people with average fitness; the path is well-defined."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Umananda (Peacock Island)', 
    'umananda', 
    'Sacred Destination', 
    'as', 
    'The smallest inhabited river island in the world, Umananda is located in the middle of the Brahmaputra river in Guwahati. It is home to an ancient Shiva temple and is a site of intense peace, representing the place where Shiva is said to have burned Kamadeva to ashes.', 
    '780.5', 
    '385.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Island of the Destroyer of Desire and the Great River', 
    'Umananda Temple | Assam, Brahmaputra & Ancient Lore', 
    'Discover the spiritual peace of Umananda. Explore the smallest river island, the legend of Kamadeva''s burning, and the profound energy of the Brahmaputra pilgrimage.', 
    'Umananda, Guwahati, Assam, Lord Shiva, Brahmaputra River, Hindu Pilgrimage, Ancient Lore, Peacock Island', 
    '111', 
    '{
        "spiritualEssence": "Umananda is the manifestation of the divine as the absolute stillness in the middle of the flow. The energy here is quiet, powerful, and intensely transformative. It is the site where the lower desires (Kamadeva) were consumed by the fire of the third eye. The vibration is one of ''Vairagya'' (Detachment) and the peace of the soul. As a tiny island in the massive Brahmaputra, it represents the small, secure island of the self amidst the turbulent river of life. A visit here is believed to grant the devotee the power to control their senses and the realization of the internal bliss (Ananda). The air is always vibrant with the sound of the rushing river and the silent, cool energy of the ancient stone temple.",
        "longDescription": "The Umananda temple was built in 1694 by King Gadadhar Singha of the Ahom dynasty. The island was named ''Bhasmachal'' (Hill of Ashes) because it is where Shiva burned Kamadeva with his third eye when he tried to interrupt his meditation. The British named it ''Peacock Island'' due to its unique shape. The temple is dedicated to Lord Shiva as Umananda (the one who gives joy to Uma). Despite being damaged in a massive earthquake in 1897, the temple was meticulously rebuilt and remains a primary center for Shaiva worship in Assam. The island is also home to the rare Golden Langur, which is considered a sacred resident. Reaching the island by a short ferry ride from the Guwahati ghats is an essential part of the spiritual experience, offering a unique perspective of the mighty Brahmaputra.",
        "spiritualArchitecture": "The temple is a beautiful example of the Ahom style of architecture, featuring an octagonal plan and a sloping roof. The architecture is sturdy and compact, designed to withstand the river floods and seismic activity. The interior features a small sanctum with a self-manifested Lingam. The complex includes several beautiful relief carvings depicting the various forms of Shiva and the stories of the Ahom kings. The use of local stone and brick, along with the integration with the rocky outcrops of the island, creates a sense of an organic and indestructible spiritual citadel in the middle of the river.",
        "vedicReferences": "Umananda is mentioned in the Kalika Purana as one of the primary sites for the worship of Shiva in the Pragjyotishpura (Assam) region.",
        "deepInsights": "The burning of Kamadeva represents the destruction of the ego and its distracting desires. Umananda teaches that true joy (Ananda) is found only when the fire of wisdom consumes the illusions of the mind.",
        "ancientLore": "Lore tells that the island was created by Lord Shiva to give a place of solitude to his consort Uma. Another legend says that the Golden Langurs on the island are the descendants of the celestial beings who came to watch Shiva''s meditation.",
        "keyRituals": [
                {
                        "name": "Maha Shivaratri",
                        "description": "The grand annual festival celebrated with night-long prayers and thousands of devotees traveling to the island by boat."
                },
                {
                        "name": "Brahmaputra Arati",
                        "description": "The ritual offering of lamps to the river from the island ghats."
                },
                {
                        "name": "Shravana Masam Puja",
                        "description": "Special rituals performed during the auspicious rainy season when the river is in full flow."
                },
                {
                        "name": "Deepavali",
                        "description": "The festival of lights where the entire island is illuminated, visible from the Guwahati shore."
                }
        ],
        "highlights": [
                {
                        "name": "Umananda Shiva Temple",
                        "description": "The ancient Ahom-style shrine at the peak of the island."
                },
                {
                        "name": "Peacock Island Landscape",
                        "description": "The unique and beautiful rock formations of the smallest inhabited river island."
                },
                {
                        "name": "Golden Langurs",
                        "description": "The rare and sacred monkeys that are unique to this island and the nearby forests."
                },
                {
                        "name": "Brahmaputra Ferry Ride",
                        "description": "The scenic and spiritual transit from the mainland to the island."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Accessible by a 10-minute ferry ride from Sukreshwar Ghat or Fancy Bazaar Ghat in Guwahati city.",
                "nearestAirport": "Lokpriya Gopinath Bordoloi International Airport, Guwahati.",
                "nearestRailway": "Guwahati Railway Station."
        },
        "tips": [
                "Take the government ferry for a safe and economical crossing to the island.",
                "Do not disturb or feed the Golden Langurs; they are protected and highly sensitive residents.",
                "Visit in the late afternoon to catch the sunset over the Brahmaputra; it is a truly meditative sight."
        ],
        "faqs": [
                {
                        "question": "How large is the island?",
                        "answer": "It is very small, often cited as the smallest inhabited river island in the world."
                },
                {
                        "question": "Who built the temple?",
                        "answer": "The original stone temple was built by the Ahom King Gadadhar Singha in the late 17th century."
                },
                {
                        "question": "Is it open during the monsoon?",
                        "answer": "Ferry services may be suspended during peak flood times for safety; it is best to check during the heavy rains."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Tawang Monastery', 
    'tawang-monastery', 
    'Sacred Destination', 
    'ar', 
    'Perched at an altitude of 10,000 feet in the mountains of Arunachal Pradesh, Tawang is the largest monastery in India and the second largest in the world. Known as ''Galden Namgey Lhatse'' (Celestial Paradise of Divine Victory), it is a site of immense peace and the spiritual heart of the Monpa people.', 
    '880.5', 
    '300.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Celestial Paradise of the Himalayan Snows', 
    'Tawang Monastery | Arunachal Pradesh, Buddhist Lore & Ancient Lore', 
    'Experience the profound serenity of Tawang. Discover the largest monastery in India, the 18-foot golden Buddha, and the legendary history of the Celestial Paradise.', 
    'Tawang, Arunachal Pradesh, Buddhist, Monastery, Dalai Lama, Hindu Pilgrimage, Ancient Lore, Himalayas', 
    '112', 
    '{
        "spiritualEssence": "Tawang is the manifestation of the divine as the supreme clarity and the silence of the high peaks. The energy here is vast, cold, and intensely compassionate. It is the site where the heart of the Himalayas was dedicated to the enlightenment of all beings. The vibration is one of ''Karuna'' (Compassion) and the absolute stillness of the meditative mind. As a monastery overlooking a deep valley, it represents the elevated vision of the soul. A visit here is believed to grant the devotee the same peace and clarity that the high lamas experience in their deep retreats. The air is always vibrant with the scent of the juniper incense and the low, rhythmic chanting of the monks.",
        "longDescription": "Tawang Monastery was founded by Merak Lama Lodre Gyatso in 1680, as per the wishes of the 5th Dalai Lama. It belongs to the Gelugpa (Yellow Hat) school of Tibetan Buddhism. The site was chosen by a horse that wandered onto this specific ridge, giving it the name Tawang (Ta means Horse, Wang means Chosen). The monastery is a massive fortified complex housing over 400 monks and an incredible collection of ancient manuscripts, including the Kangyur and Tengyur. The centerpiece is the Dukhang (Assembly Hall), which houses a magnificent 18-foot tall gilded statue of the Buddha. Tawang is also significant as the birthplace of the 6th Dalai Lama and remains a primary center for the preservation of Himalayan Buddhist culture and wisdom.",
        "spiritualArchitecture": "The architecture of Tawang is a spectacular example of a Buddhist fortified monastery (Dzong). It features massive white-washed stone walls and red-painted wooden balconies. The Dukhang is the most architecturally significant building, featuring three stories and a grand entrance with a curtain. The interiors are covered with vibrant frescoes depicting various Buddhas and the Wheel of Life. The 18-foot Buddha is a masterpiece of gilded sculpture. The complex is designed as a self-contained town, with narrow stone-paved alleys, residential quarters, and a massive library. The use of wood, stone, and the vibrant colors of the Tibetan tradition creates a sense of a royal palace of the spirit.",
        "vedicReferences": "Tawang is celebrated in the Buddhist sthalapuranas and is considered a primary site for the study of the Kalachakra and other high Tantric traditions.",
        "deepInsights": "The choosing of the site by a horse represents the role of intuition and nature in the spiritual life. Tawang teaches that the highest truth is found in the heights of compassion and the depths of silence.",
        "ancientLore": "Lore tells that the Merak Lama was unable to find a site until he meditated in a cave and his horse disappeared, only to be found standing on this magnificent ridge. Another legend says that the monastery is protected by the spirit of the mountain itself.",
        "keyRituals": [
                {
                        "name": "Torgya Festival",
                        "description": "The grand annual festival celebrated in the 11th month of the lunar calendar, featuring the famous masked Chham dances."
                },
                {
                        "name": "Daily Puja",
                        "description": "The morning and evening assembly where monks chant the ancient sutras to the sound of long horns and drums."
                },
                {
                        "name": "Losar",
                        "description": "The Tibetan New Year, celebrated with massive prayers and cultural festivities for 15 days."
                },
                {
                        "name": "Library Recitation",
                        "description": "The periodic reading of the ancient manuscripts to bless the monastery and the world."
                }
        ],
        "highlights": [
                {
                        "name": "Dukhang (Assembly Hall)",
                        "description": "The magnificent three-storied hall housing the 18-foot gilded Buddha."
                },
                {
                        "name": "Monastic Library",
                        "description": "Containing thousands of ancient and rare Buddhist manuscripts."
                },
                {
                        "name": "Parkhang (Printing Press)",
                        "description": "Where traditional wood-block printing of sacred texts is still performed."
                },
                {
                        "name": "Tawang Valley View",
                        "description": "The spectacular panorama of the Himalayas from the monastery ridge."
                }
        ],
        "travelInfo": {
                "bestTime": "March to June and September to October.",
                "howToReach": "13-hour drive from Tezpur (Assam) or Bomdila. The roads are high-altitude and require an Inner Line Permit (ILP).",
                "nearestAirport": "Tezpur Airport / Guwahati Airport.",
                "nearestRailway": "Rangapara Junction (Tezpur) / Guwahati Junction."
        },
        "tips": [
                "Allow time for acclimatization, as Tawang is located at a high altitude (10,000 feet).",
                "The journey to Tawang via the Sela Pass (13,700 feet) is one of the most beautiful drives in the world.",
                "Dress respectfully and follow the silence and protocols of the Dukhang during the prayer sessions."
        ],
        "faqs": [
                {
                        "question": "How large is the monastery?",
                        "answer": "It is the largest in India and the second largest in the world, with over 60 buildings in the complex."
                },
                {
                        "question": "What is the meaning of ''Tawang''?",
                        "answer": "It means ''Chosen by the Horse'' (Ta-Wang)."
                },
                {
                        "question": "Is it open to tourists?",
                        "answer": "Yes, but you must obtain an Inner Line Permit (ILP) or Protected Area Permit (PAP) to enter the region."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Prayagraj', 
    'prayagraj', 
    'Spiritual City', 
    'up', 
    'Known as the ''Tirtha Raj'' (The King of Pilgrimages), Prayagraj is the site of the Triveni Sangam—the sacred confluence of the Ganges, Yamuna, and the invisible Saraswati. It is the host of the world''s largest spiritual gathering, the Kumbh Mela.', 
    '510.2', 
    '330.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The King of All Pilgrimages and the Confluence of Eternity', 
    'Prayagraj Triveni Sangam | Uttar Pradesh, Kumbh Mela & Ancient Lore', 
    'Experience the supreme power of Prayagraj. Discover the Triveni Sangam, the legend of the Kumbh Mela, and the profound energy of the confluence of three sacred rivers.', 
    'Prayagraj, Uttar Pradesh, Triveni Sangam, Ganges, Yamuna, Saraswati, Kumbh Mela, Hindu Pilgrimage, Ancient Lore, Tirtha Raj', 
    '118', 
    '{
        "spiritualEssence": "Prayagraj is the manifestation of the divine as the supreme convergence and the absolute dissolution of all dualities. The energy here is vast, regal, and intensely purifying. It is the site where the cosmic waters meet to offer the highest liberation to the soul. The vibration is one of ''Samyama'' (Perfect Control) and the absolute unity of the spiritual elements. As the Tirtha Raj, the vibration is one of undisputed spiritual authority. A visit here is believed to grant the devotee the merit of all other pilgrimages combined. The air is always vibrant with the scent of the river silt and the massive, collective roar of millions of voices in prayer.",
        "longDescription": "Prayagraj, formerly Allahabad, is one of the oldest cities in the world. Its significance centers on the Sangam, where the muddy waters of the Ganges meet the clear blue waters of the Yamuna and the mystical, underground Saraswati. This site is the primary location for the Kumbh Mela, held every 12 years, which is the largest peaceful gathering of humans on Earth. The city was founded by the Vedic sages and has been a major center of learning and power for millennia. It is home to the Akshayavat, the undying banyan tree, and the massive Allahabad Fort built by Akbar around the sacred sites. Prayagraj is not just a city but a spiritual crossroads where the history of India and the mythology of the Vedas are perfectly blended.",
        "spiritualArchitecture": "The architecture of Prayagraj is characterized by its expansive river ghats and the massive stone structures of the fort and temples. The Sangam itself is an open, natural arena of water, but the surrounding ghats are designed to handle millions of pilgrims. The Akshayavat temple, located within the fort, features a unique subterranean shrine. The Hanuman temple near the Sangam is unique for its reclining 20-foot tall idol of the Lord. The modern architecture includes the grand Swaraj Bhawan and the various university buildings that reflect the city''s intellectual heritage. The use of red sandstone and the grand scale of the riverfront structures create a sense of imperial spiritual dignity.",
        "vedicReferences": "Prayagraj is mentioned in the Rig Veda as the most auspicious place for sacrifice and is celebrated in all the Puranas as the King of Pilgrimages.",
        "deepInsights": "The confluence represents the merging of the individual soul (Jiva) with the universal consciousness (Brahman). Prayagraj teaches that all paths eventually lead to the same one truth.",
        "ancientLore": "Lore tells that when the gods and demons were churning the ocean, four drops of the nectar of immortality (Amrit) fell on earth, and Prayagraj is the most significant of those spots. Another legend says that the creator Lord Brahma performed his first sacrifice (Pra-Yaga) here, giving the city its name.",
        "keyRituals": [
                {
                        "name": "Sangam Snan",
                        "description": "The ritual bath at the exact confluence, believed to wash away all karmic debts and grant liberation."
                },
                {
                        "name": "Shahi Snan",
                        "description": "The grand royal procession and bath of the Akharas (monastic orders) during the Kumbh Mela."
                },
                {
                        "name": "Kalpavas",
                        "description": "The ritual of living a simple, meditative life on the banks of the river for the entire month of Magh."
                },
                {
                        "name": "Akshayavat Puja",
                        "description": "Worshipping the undying banyan tree for eternal life and spiritual stability."
                }
        ],
        "highlights": [
                {
                        "name": "Triveni Sangam",
                        "description": "The sacred confluence of the three holy rivers."
                },
                {
                        "name": "Patalpuri Temple",
                        "description": "The underground shrine within the fort, home to many ancient deities."
                },
                {
                        "name": "Lete Hanuman Temple",
                        "description": "The unique reclining Hanuman shrine, often submerged during the monsoon."
                },
                {
                        "name": "Allahabad Fort",
                        "description": "The massive 16th-century stone fortress that protects the sacred sites."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Magh Mela or Kumbh Mela).",
                "howToReach": "Well connected by rail, road, and air. Prayagraj Junction is one of the busiest railway hubs in India.",
                "nearestAirport": "Prayagraj Airport / Lal Bahadur Shastri International Airport, Varanasi.",
                "nearestRailway": "Prayagraj Junction."
        },
        "tips": [
                "Take a boat from the ghats to reach the exact point of the Sangam for your ritual bath.",
                "Visit during the Magh Mela (January-February) to experience the true spiritual scale of the city.",
                "Carry a small bottle to take back some sacred Sangam water (Gangajal) for your home altar."
        ],
        "faqs": [
                {
                        "question": "What is the Triveni Sangam?",
                        "answer": "It is the meeting point of the Ganges, Yamuna, and the mythical Saraswati rivers."
                },
                {
                        "question": "When is the next Kumbh Mela?",
                        "answer": "The Mahakumbh is held every 12 years; check the lunar calendar for the specific upcoming dates."
                },
                {
                        "question": "Can I visit the Akshayavat?",
                        "answer": "Yes, part of the fort is open to pilgrims to visit the sacred banyan tree and the underground temples."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Mount Abu (Dilwara Temples)', 
    'mount-abu-dilwara', 
    'Sacred Destination', 
    'rj', 
    'The highest peak in the Aravalli range, Mount Abu is home to the world-famous Dilwara Jain Temples. These temples are the ultimate masterpiece of marble carving, where stone has been transformed into delicate, translucent lace, representing the peak of human devotion and artistic skill.', 
    '280.2', 
    '450.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lace of the Gods and the Marble Pinnacle of Peace', 
    'Mount Abu Dilwara Temples | Rajasthan, Jain Architecture & Ancient Lore', 
    'Experience the breathtaking beauty of Dilwara. Discover the marble wonders of Mount Abu, the legend of the Vimal Vasahi, and the profound serenity of the Jain pilgrimage.', 
    'Mount Abu, Rajasthan, Dilwara Temples, Jainism, Marble Carving, Hindu Pilgrimage, Ancient Lore, Aravallis', 
    '119', 
    '{
        "spiritualEssence": "Dilwara is the manifestation of the divine as the supreme refinement and the absolute clarity of the soul. The energy here is cool, luminous, and intensely detailed. It is the site where the hard material (marble) was completely surrendered to the softest touch of the spirit. The vibration is one of ''Kevala Jnana'' (Supreme Knowledge) and the absolute peace of the Tirthankaras. As a temple cluster in the high Aravallis, it represents the elevated and refined state of consciousness. A visit here is believed to grant the devotee the clarity to see the intricate patterns of their own soul. The air is always vibrant with the scent of the mountain pines and the silent, white radiance of the thousand-year-old marble.",
        "longDescription": "The Dilwara temples, built between the 11th and 13th centuries, are a group of five Jain shrines located about 2.5km from Mount Abu. They are world-renowned for their extraordinary marble carvings. The most famous is the Vimal Vasahi temple, dedicated to the first Tirthankara, Lord Rishabha. It took 1,500 workers and 1,200 laborers fourteen years to complete its intricate interiors. The temples were built by the ministers of the Solanki rulers of Gujarat. The level of detail in the ceilings, pillars, and doorways is so fine that the marble appears almost transparent. Mount Abu has also been a major center for Hindu sages, including Vashistha, making it a unique spiritual hill-station that blends the best of Rajasthani and Gujarati spiritual traditions.",
        "spiritualArchitecture": "The architecture of Dilwara is the absolute peak of the Maru-Gurjara style. While the exteriors are simple to avoid drawing unwanted attention in historical times, the interiors are a riot of marble craftsmanship. The highlights are the Rang Mandapa (assembly hall) ceilings, which feature 16 Vidya Devis (Goddesses of Knowledge) carved in such fine detail that their ornaments seem to move. The pillars are covered with hundreds of tiny figures and floral motifs, all carved out of single blocks of white marble. The use of the ''flying arch'' (Torana) and the multi-layered domes create a sense of a celestial palace. The architecture is designed to overwhelm the senses with beauty and then lead them into the profound silence of the inner sanctum.",
        "vedicReferences": "Mount Abu is mentioned as ''Arbudanchal'' in the Puranas and is celebrated as the site where the great sage Vashistha performed the Agnikula sacrifice.",
        "deepInsights": "The transformation of hard marble into delicate lace represents the power of the soul to refine the material world. Dilwara teaches that the highest form of discipline leads to the highest form of beauty.",
        "ancientLore": "Lore tells that the stone-carvers were paid in gold corresponding to the amount of marble dust they scraped off, encouraging them to carve as finely as possible. Another legend says that the Goddess Ambika personally guided the builders to find the specific marble needed for the temples.",
        "keyRituals": [
                {
                        "name": "Prakshal Puja",
                        "description": "The ritual cleaning of the Tirthankara idols with sacred waters and milk every morning."
                },
                {
                        "name": "Siddhachakra Mahapujan",
                        "description": "The grand collective prayer for spiritual perfection and world peace."
                },
                {
                        "name": "Nakki Lake Arati",
                        "description": "The evening worship of the sacred lake in Mount Abu, which is believed to have been dug by the gods with their nails."
                },
                {
                        "name": "Adhar Devi Darshan",
                        "description": "Visiting the cave temple of the Goddess who is believed to be hanging in the mid-air."
                }
        ],
        "highlights": [
                {
                        "name": "Vimal Vasahi Temple",
                        "description": "The oldest and most intricately carved of the Dilwara group."
                },
                {
                        "name": "Luna Vasahi Temple",
                        "description": "Famous for its massive marble dome and the delicate ''lotus petal'' carvings."
                },
                {
                        "name": "The Ceiling of 16 Goddesses",
                        "description": "The world-famous marble dome featuring the deities of knowledge."
                },
                {
                        "name": "Gaumukh Temple",
                        "description": "The site of the ancient Agnikula Yagna, featuring a natural spring flowing from a stone cow''s mouth."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road from Udaipur (160km) and Ahmedabad (220km). The nearest railway station is Abu Road, about 28km away.",
                "nearestAirport": "Maharana Pratap Airport, Udaipur / Ahmedabad Airport.",
                "nearestRailway": "Abu Road."
        },
        "tips": [
                "Photography is strictly prohibited inside the Dilwara temples to maintain their sanctity; deposit your cameras and phones at the gate.",
                "Dress modestly and follow the traditional Jain protocols (no leather items allowed inside).",
                "Visit in the early morning to see the marble in its most natural and beautiful light."
        ],
        "faqs": [
                {
                        "question": "How old are the temples?",
                        "answer": "They were built between the 11th and 13th centuries CE during the Solanki and Dholka dynasties."
                },
                {
                        "question": "Why is it called the ''Lace of the Gods''?",
                        "answer": "Due to the incredibly fine and intricate marble carvings that look more like delicate lace than stone."
                },
                {
                        "question": "Is it a difficult climb?",
                        "answer": "The temples are easily accessible by road; the Gaumukh temple involves about 700 steps but the main Dilwara complex is on flat ground."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Ranakpur', 
    'ranakpur', 
    'Sacred Destination', 
    'rj', 
    'Hidden in a remote valley of the Aravalli hills, Ranakpur is home to the Chaturmukha Dharana Vihara. It is a architectural forest of 1,444 uniquely carved marble pillars, where no two are alike, representing the infinite variety of the manifest world within the one truth.', 
    '290.5', 
    '460.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Infinite Forest of Pillars and the Geometry of Enlightenment', 
    'Ranakpur Jain Temple | Rajasthan, 1444 Pillars & Ancient Lore', 
    'Discover the architectural wonder of Ranakpur. Explore the 1444 unique pillars, the three-storied marble granduer, and the profound serenity of the forest pilgrimage.', 
    'Ranakpur, Rajasthan, Jain Temple, 1444 Pillars, Adinath, Hindu Pilgrimage, Ancient Lore, Aravallis', 
    '120', 
    '{
        "spiritualEssence": "Ranakpur is the manifestation of the divine as the supreme order and the infinite diversity of creation. The energy here is rhythmic, light-filled, and intensely mathematical. It is the site where the complex laws of the universe were translated into the language of marble columns. The vibration is one of ''Siddha-Sila'' (the stone of the liberated) and the absolute harmony of the elements. As a massive three-storied structure in a forest valley, it represents the cosmic mountain (Meru). A visit here is believed to grant the devotee the realization of the interconnectedness of all things. The air is always vibrant with the scent of the temple incense and the rhythmic, silent dance of light and shadow among the 1,444 pillars.",
        "longDescription": "The Ranakpur Jain temple was built in the 15th century by Dharna Shah, a local merchant, with the support of Rana Kumbha of Mewar. It is dedicated to Lord Adinath, the first Tirthankara. The temple is built on a massive platform of 48,000 square feet. It features four main entrances, each facing a different direction (Chaturmukha), ensuring that the Lord is visible from every side. The defining feature is the 1,444 marble pillars, each carved with unique motifs so that no two pillars are identical. The temple is designed to catch the sunlight at every hour, ensuring that the interiors are always filled with a soft, ethereal glow. Ranakpur is not just a temple but a three-dimensional mandala in stone, offering a profound meditative experience in the heart of the desert hills.",
        "spiritualArchitecture": "The architecture of Ranakpur is the pinnacle of the late Maru-Gurjara style. The temple is a three-storied structure with 29 halls and 80 domes supported by the 1,444 pillars. The engineering is so precise that even with such a dense forest of columns, the view of the main deity from any point is never completely blocked. The highlights include the ''Kalpavriksha'' (Wish-fulfilling tree) carved into a single marble slab and the spectacular engraved ceilings of the assembly halls. The use of light is a key architectural element; the open courtyards allow for natural ventilation and constant illumination, reflecting the Jain ideal of transparency and clarity. The entire structure is built of light-colored marble that changes its hue from gold to white to blue throughout the day.",
        "vedicReferences": "Ranakpur is celebrated in the Jain sthalapuranas as a primary site where the material wealth of a devotee was perfectly converted into spiritual merit.",
        "deepInsights": "The 1,444 unique pillars represent the infinite forms of life and thought in the universe. Ranakpur teaches that while the forms are many, the foundation (the temple floor) and the goal (the deity) are one.",
        "ancientLore": "Lore tells that the architect, Depa, had a vision of a celestial vehicle in his dream and designed the temple to match it. Another legend says that it is impossible to count the pillars correctly; every time a person tries, they come up with a different number, signifying the mystery of the divine.",
        "keyRituals": [
                {
                        "name": "Adinath Mahapujan",
                        "description": "The grand ritual worship of the four-faced idol of the first Tirthankara."
                },
                {
                        "name": "Evening Aarti",
                        "description": "The offering of 108 lamps in the main hall, creating a spectacular display of light among the pillars."
                },
                {
                        "name": "Chaumukhi Darshan",
                        "description": "The practice of visiting the deity from all four directions to symbolize the omnipresence of the truth."
                },
                {
                        "name": "Vihara Meditation",
                        "description": "Walking slowly through the forest of pillars as a form of mobile meditation."
                }
        ],
        "highlights": [
                {
                        "name": "1,444 Carved Pillars",
                        "description": "The world-famous forest of marble columns, each with a unique design."
                },
                {
                        "name": "Chaturmukha Adinath Idol",
                        "description": "The four-faced white marble image of the first Tirthankara."
                },
                {
                        "name": "The Incomplete Pillar",
                        "description": "A specific pillar left slightly unfinished to remind the devotee that only the divine is perfect."
                },
                {
                        "name": "Marwar Forest Landscape",
                        "description": "The beautiful valley setting of the Aravalli hills surrounding the temple."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "95km from Udaipur and 160km from Jodhpur. Well connected by road; regular buses and taxis run from Udaipur.",
                "nearestAirport": "Maharana Pratap Airport, Udaipur.",
                "nearestRailway": "Falna Railway Station (35km away)."
        },
        "tips": [
                "Visit between 12:00 PM and 5:00 PM; this is when the sunlight enters the temple most beautifully.",
                "Audio guides are available and highly recommended to understand the specific symbolism of the carvings.",
                "Maintain a peaceful demeanor; Ranakpur is known for its intense silence and meditative atmosphere."
        ],
        "faqs": [
                {
                        "question": "How many pillars are there?",
                        "answer": "There are exactly 1,444 pillars, and famously, no two pillars feature the same carving."
                },
                {
                        "question": "Is it near Udaipur?",
                        "answer": "Yes, it is about a 2-hour drive from Udaipur and is often visited as a day trip."
                },
                {
                        "question": "Are there other temples nearby?",
                        "answer": "Yes, the complex includes a beautiful Sun Temple and smaller Jain shrines from the same period."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Sanchi Stupa', 
    'sanchi-stupa', 
    'Sacred Destination', 
    'mp', 
    'The oldest stone structure in India, Sanchi is a world-renowned Buddhist pilgrimage site established by Emperor Ashoka. It is a site where the life and teachings of the Buddha are captured in magnificent stone gateways, representing the expansion of the light of Dharma from a local sect to a global philosophy.', 
    '450.5', 
    '400.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Dome of Eternal Dharma and the Lion of Peace', 
    'Sanchi Stupa | Madhya Pradesh, Ashoka & Ancient Lore', 
    'Experience the profound serenity of Sanchi. Discover the Great Stupa, the Ashokan pillars, and the legendary stone gateways depicting the life of the Buddha.', 
    'Sanchi, Madhya Pradesh, Buddhist, Stupa, Ashoka, Hindu Pilgrimage, Ancient Lore, Dharma', 
    '121', 
    '{
        "spiritualEssence": "Sanchi is the manifestation of the divine as the supreme equilibrium and the absolute stillness of the enlightened mind. The energy here is vast, silent, and intensely compassionate. It is the site where the material power of an empire (Ashoka) was surrendered to the spiritual power of the Buddha. The vibration is one of ''Dharma-Chakra'' (the turning of the wheel of truth) and the absolute peace of the middle path. As a massive dome on a hill, it represents the cosmic egg and the unity of the universe. A visit here is believed to grant the devotee the same stability and clarity that lead to nirvana. The air is always vibrant with the scent of the dry forest and the silent, heavy energy of the 2,300-year-old stone.",
        "longDescription": "Sanchi, located in the Raisen district of Madhya Pradesh, is home to several Buddhist monuments dating from the 3rd century BCE to the 12th century CE. The Great Stupa was originally commissioned by Emperor Ashoka over the relics of the Buddha. The most famous features are the four Toranas (gateways) built in the 1st century BCE, which are covered with intricate relief carvings depicting the Jataka tales and the life of the Buddha. Sanchi is unique because the Buddha is never shown in human form in the older carvings; he is represented by symbols like the Bodhi tree, the wheel, or his footprints. The site was abandoned for centuries until it was rediscovered in 1818. Today, it is a UNESCO World Heritage site and a global center for Buddhist pilgrimage, representing the enduring legacy of Ashoka''s message of peace.",
        "spiritualArchitecture": "The architecture of Sanchi is the foundation of Indian stone art. The Great Stupa is a massive hemispherical dome representing the sky. It is surrounded by a stone railing (Vedika) and the four magnificent gateways. The Toranas are masterpieces of stone narrative art, featuring thousands of figures, animals, and floral motifs carved with the precision of ivory-work. A unique feature is the Ashokan Pillar, whose four-lion capital became the national emblem of India. The site also features several smaller stupas and the ruins of ancient monasteries (viharas). The architecture is designed to facilitate the ritual of circumambulation (Pradakshina), where the devotee walks around the dome to align themselves with the cosmic center.",
        "vedicReferences": "Sanchi is mentioned in local Buddhist chronicles and is considered a primary site for the study of the spread of Dharma during the Mauryan period.",
        "deepInsights": "The absence of the Buddha''s human form in the carvings represents the truth that the teacher is not the body, but the teaching (Dharma) itself. Sanchi teaches that the path to peace is found in the center of the world''s turbulence.",
        "ancientLore": "Lore tells that Ashoka chose this site because it was the birthplace of his queen, Devi, and it was here that they first met. Another legend says that the stone of the gateways was carved by the ivory workers of Vidisha, explaining the incredible level of detail.",
        "keyRituals": [
                {
                        "name": "Pradakshina",
                        "description": "The ritual of walking around the Great Stupa in a clockwise direction while meditating on the Dharma."
                },
                {
                        "name": "Flower Offering",
                        "description": "Offering fresh flowers at the base of the gateways to honor the Buddha''s life."
                },
                {
                        "name": "Silent Meditation on the Hill",
                        "description": "The practice of sitting in the ruins of the ancient monasteries to connect with the silence of the high site."
                },
                {
                        "name": "Vaisakha Purnima Celebration",
                        "description": "The grand annual celebration of the Buddha''s birth, enlightenment, and passing away."
                }
        ],
        "highlights": [
                {
                        "name": "The Great Stupa",
                        "description": "The massive Ashokan dome at the heart of the site."
                },
                {
                        "name": "The Four Toranas",
                        "description": "The magnificent 1st-century BCE gateways with their detailed narrative carvings."
                },
                {
                        "name": "The Ashokan Pillar",
                        "description": "The remains of the pillar that once bore the famous lion capital."
                },
                {
                        "name": "Stupa 3",
                        "description": "The smaller stupa that contained the relics of the Buddha''s chief disciples, Sariputta and Moggallana."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "46km from Bhopal, well connected by road and rail. Sanchi has its own railway station on the main line.",
                "nearestAirport": "Raja Bhoj Airport, Bhopal.",
                "nearestRailway": "Sanchi / Bhopal Junction."
        },
        "tips": [
                "Allow at least 3-4 hours to explore the site and read the detailed plaques near each carving.",
                "Visit the Sanchi Museum at the foot of the hill to see the original lion capital and other important artifacts.",
                "The site is very open; carry an umbrella or hat to protect yourself from the sun during the day."
        ],
        "faqs": [
                {
                        "question": "Did the Buddha ever visit Sanchi?",
                        "answer": "No, Sanchi was established by Ashoka about 250 years after the Buddha''s time as a center for the spread of his teachings."
                },
                {
                        "question": "What is inside the Stupa?",
                        "answer": "Originally, it contained a portion of the sacred relics of the Buddha, though the dome is solid stone and earth."
                },
                {
                        "question": "How old is the oldest structure?",
                        "answer": "The core of the Great Stupa dates back to the 3rd century BCE (the Mauryan period)."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Thiruchendur', 
    'thiruchendur', 
    'Sacred Destination', 
    'tn', 
    'One of the six abodes (Arupadai Veedu) of Lord Murugan, Thiruchendur is unique as the only one situated on the seashore. It is a site of immense spiritual power where the Lord is worshipped as the supreme warrior who defeated the demon Surapadma on these very sands.', 
    '310.2', 
    '880.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Warrior of the Waves and the Spear of Liberation', 
    'Thiruchendur Murugan | Tamil Nadu, Arupadai Veedu & Ancient Lore', 
    'Experience the coastal power of Thiruchendur. Discover the seaside Murugan temple, the legend of the Soorasamharam, and the profound energy of the warrior Lord.', 
    'Thiruchendur, Tamil Nadu, Murugan, Kartikeya, Arupadai Veedu, Hindu Pilgrimage, Ancient Lore, Bay of Bengal', 
    '122', 
    '{
        "spiritualEssence": "Thiruchendur is the manifestation of the divine as the supreme courage and the absolute victory of light over darkness. The energy here is dynamic, protective, and intensely oceanic. It is the site where the sound of the holy name (Om Saravana Bhava) merges with the roar of the waves. The vibration is one of ''Skanda-Shakti'' (the power of the warrior) and the absolute protection of the righteous. As a temple on the shore, it represents the guardian who stands at the threshold of the infinite. A visit here is believed to grant the devotee the strength to overcome any internal or external obstacle. The air is always vibrant with the scent of the sea salt and the constant, rhythmic chanting of the Tiruppugazh.",
        "longDescription": "Thiruchendur is the second of the six abodes of Lord Murugan and is considered one of the most beautiful temples in India. Unlike the other five abodes which are on hills, Thiruchendur is situated right on the edge of the Bay of Bengal. The main deity is Lord Murugan in his form as Senthilandavar. The temple commemorates the final battle where Murugan used his divine spear (Vel) to defeat the demon Surapadma. The temple is famous for its 157-foot tall Rajagopuram and the fact that it remained untouched by the 2004 Tsunami, which is considered a modern miracle by the devotees. Thiruchendur is a site where the ancient Sangam literature and the living faith of the Tamil people come together in a spectacular coastal landscape.",
        "spiritualArchitecture": "The temple architecture is a grand example of the Dravidian style, characterized by its massive gopurams and extensive stone-paved courtyards. A unique feature is the ''Shanmugha Vilasa Mandapam,'' a grand assembly hall with intricate carvings. The temple features two main sanctums, one for Murugan and another for Lord Shiva, reflecting the deep connection between the father and the son. The Rajagopuram is 157 feet tall and is built on nine levels, serving as a landmark for miles across the sea. The use of dark granite and the precision of the stone work, combined with the constant presence of the ocean breeze, creates an atmosphere of timeless spiritual power. The temple also features the ''Nazhikkinaru,'' a sacred well of fresh water located right on the salty seashore, which is an architectural and geological marvel.",
        "vedicReferences": "Thiruchendur is mentioned in the Skanda Purana and is celebrated in the ancient Tamil epic Silappathikaram and the works of the poet-saint Nakkeerar.",
        "deepInsights": "The defeat of the demon on the shore represents the destruction of the ego at the boundary of the conscious and the subconscious. Thiruchendur teaches that true victory is achieved through the union of courage and divine grace.",
        "ancientLore": "Lore tells that after the battle, the demon turned into a mango tree, which Murugan split into two with his Vel; one part became a peacock (his vehicle) and the other a rooster (his flag). Another legend says that the Lord personally performed penance here to worship his father, Lord Shiva, after the war.",
        "keyRituals": [
                {
                        "name": "Soorasamharam",
                        "description": "The grand annual enactment of the battle between Murugan and the demon, attracting over a million devotees to the sands of Thiruchendur."
                },
                {
                        "name": "Nazhikkinaru Snanam",
                        "description": "The ritual bath in the sacred fresh-water well on the seashore before entering the temple."
                },
                {
                        "name": "Kanda Sashti Vratam",
                        "description": "The 6-day fast and prayer observed by devotees to seek the protection and grace of the Lord."
                },
                {
                        "name": "Sea Aarti",
                        "description": "The ritual offering of lamps to the ocean, acknowledging the divine presence in the elements."
                }
        ],
        "highlights": [
                {
                        "name": "The Senthilandavar Sanctum",
                        "description": "The main shrine where the Lord is worshipped in his victorious warrior form."
                },
                {
                        "name": "Nazhikkinaru Well",
                        "description": "The miraculous fresh-water well on the edge of the salt-water sea."
                },
                {
                        "name": "Shanmugha Vilasa Mandapam",
                        "description": "The grand pillared hall with exquisite carvings of the Lord''s pastimes."
                },
                {
                        "name": "The Temple Shore",
                        "description": "The sacred stretch of sand where the cosmic battle is believed to have taken place."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Kanda Sashti).",
                "howToReach": "Well connected by road and rail; Thiruchendur has its own railway station. Regular buses and taxis run from Tuticorin (40km) and Tirunelveli (60km).",
                "nearestAirport": "Tuticorin Airport / Madurai Airport.",
                "nearestRailway": "Thiruchendur Railway Station."
        },
        "tips": [
                "Participate in the Nazhikkinaru ritual bath; it is an essential part of the pilgrimage experience.",
                "Be prepared for massive crowds during the Soorasamharam festival; it is one of the largest gatherings in South India.",
                "Take a walk along the shore at sunrise to see the sun rising out of the Bay of Bengal and hitting the temple gopuram."
        ],
        "faqs": [
                {
                        "question": "Is it near the sea?",
                        "answer": "Yes, it is the only one of the six Murugan abodes located directly on the seashore."
                },
                {
                        "question": "What is the Nazhikkinaru?",
                        "answer": "It is a 24-foot deep well of fresh water located very close to the sea, considered highly sacred."
                },
                {
                        "question": "How old is the temple?",
                        "answer": "The core of the temple is over 2,000 years old, mentioned in the earliest Tamil Sangam literature."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Navagraha Cluster (Kumbakonam)', 
    'navagraha-cluster', 
    'Sacred Destination', 
    'tn', 
    'A cluster of nine ancient temples around Kumbakonam, each dedicated to one of the nine celestial bodies (Grahas) of Indian astrology. It is the world''s primary center for planetary remedies, a site where the cosmic forces are aligned through ritual and stone.', 
    '330.2', 
    '780.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Celestial Alignment and the Power of Planetary Grace', 
    'Kumbakonam Navagraha Temples | Tamil Nadu, Astrology & Ancient Lore', 
    'Experience the profound cosmic energy of the Navagraha cluster. Discover the nine planetary temples, the science of Indian astrology, and the profound energy of planetary remedies.', 
    'Navagraha, Kumbakonam, Tamil Nadu, Astrology, Shani, Surya, Hindu Pilgrimage, Ancient Lore, Remedy', 
    '123', 
    '{
        "spiritualEssence": "The Navagraha cluster is the manifestation of the divine as the supreme order of the cosmos and the law of Karma. The energy here is diverse, rhythmic, and intensely mathematical. It is the site where the individual destiny meets the universal forces. The vibration is one of ''Graha-Shanti'' (Planetary Peace) and the absolute balance of the cosmic elements. As a cluster of nine temples, it represents the entire solar system in a spiritual map. A visit here is believed to grant the devotee the alignment with the cosmic rhythm and the mitigation of challenging karmic cycles. The air is always vibrant with the scent of the sesame oil and the constant, rhythmic chanting of the Navagraha Stotram.",
        "longDescription": "The Navagraha temples are located in the Cauvery delta region around Kumbakonam. Each temple is dedicated to one of the nine planets: Surya (Sun) at Suriyanar Koil, Chandra (Moon) at Thingalur, Angaraka (Mars) at Vaitheeswaran Koil, Budha (Mercury) at Thiruvenkadu, Guru (Jupiter) at Alangudi, Shukra (Venus) at Kanjanoor, Shani (Saturn) at Thirunallar, Rahu at Thirunageswaram, and Ketu at Keezhperumpallam. These temples date back to the Chola period and are the most important sites for planetary remedies (Pariharam) in the world. Millions of people travel from across the globe to perform specific rituals at these temples to balance their horoscopes. The cluster represents a unique bridge between Indian astronomy, astrology, and spiritual practice.",
        "spiritualArchitecture": "Each of the nine temples is a grand example of Chola stone architecture, featuring massive gopurams and intricate relief carvings. A unique feature is that in each temple, the main deity is a form of Lord Shiva or the Goddess, with a separate and powerful shrine for the specific Graha. The Suriyanar Koil is unique because it is the only one where Surya is the primary deity and is shown with all the other eight planets facing him. The Thirunallar Shani temple is world-famous for its sacred tank (Nala Theertham), which is believed to have the power to remove the effects of Saturn. The architecture is designed to focus the planetary energy into the sanctum while providing large spaces for the complex Parihara rituals.",
        "vedicReferences": "The Navagraha temples are celebrated in the Puranas and are considered primary sites for the study of the Jyotish-Sastra (Indian Astrology) in the southern tradition.",
        "deepInsights": "The nine planets represent the different dimensions of our consciousness and our karmic journey. The Navagraha cluster teaches that by aligning with the cosmic order, we can transcend the limitations of our individual destiny.",
        "ancientLore": "Lore tells that the planets once performed intense penance to Lord Shiva here to be granted their positions as the governors of human destiny. Another legend says that the sage Agastya personally established the protocols for the rituals at each of these nine temples.",
        "keyRituals": [
                {
                        "name": "Parihara Puja",
                        "description": "Specific ritual offerings performed to balance the influence of a particular planet in one''s horoscope."
                },
                {
                        "name": "Nala Theertham Snanam",
                        "description": "Taking a ritual bath in the sacred tank at Thirunallar, believed to be the most powerful remedy for Shani (Saturn)."
                },
                {
                        "name": "Rahu Kaala Abhishekam",
                        "description": "The unique ritual of bathing the Rahu idol with milk at Thirunageswaram, where the milk miraculously turns blue."
                },
                {
                        "name": "Navagraha Homam",
                        "description": "The collective fire sacrifice performed to honor all nine celestial bodies simultaneously."
                }
        ],
        "highlights": [
                {
                        "name": "Suriyanar Koil",
                        "description": "The only temple where the Sun is the primary deity among the cluster."
                },
                {
                        "name": "Thirunallar Shani Temple",
                        "description": "The most visited and powerful Shani shrine in the world."
                },
                {
                        "name": "Vaitheeswaran Koil",
                        "description": "The temple of Mars, also known for its incredible healing traditions (Naadi Astrology)."
                },
                {
                        "name": "Thirunageswaram Rahu Temple",
                        "description": "Famous for the milk Abhishekam and its spectacular Chola architecture."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Kumbakonam is the base city for visiting all nine temples. Well connected by rail and road; taxis are the best way to cover the 60-100km circuit.",
                "nearestAirport": "Tiruchirappalli International Airport.",
                "nearestRailway": "Kumbakonam Railway Station."
        },
        "tips": [
                "It takes at least 2 full days to visit all nine temples comfortably; hire a taxi from Kumbakonam for the entire circuit.",
                "Follow the specific color and grain offerings for each planet (e.g., black sesame for Shani, wheat for Surya).",
                "Be prepared for large crowds, especially at Thirunallar (Saturdays) and Alangudi (Thursdays)."
        ],
        "faqs": [
                {
                        "question": "Can I visit all in one day?",
                        "answer": "It is physically possible with a very early start and a fast car, but 2 days are recommended for a proper spiritual experience."
                },
                {
                        "question": "Where should I stay?",
                        "answer": "Kumbakonam is the best base city with many accommodation options and good connectivity to all nine temples."
                },
                {
                        "question": "Do I need an astrologer?",
                        "answer": "While not mandatory, most people visit based on their specific horoscopes; the temple priests can also guide you on the necessary rituals."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Ladakh Circuit (Hemis & Pathar Sahib)', 
    'ladakh-circuit', 
    'Sacred Destination', 
    'jk', 
    'The high-altitude spiritual crown of India, the Ladakh circuit includes the Hemis Monastery and the Pathar Sahib Gurudwara. It is a site where Buddhist monasticism and Sikh heroism meet in the cold, thin air of the trans-Himalayas, representing the absolute resilience of the spirit.', 
    '450.2', 
    '50.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Silence of the High Peaks and the Stone of the Guru', 
    'Ladakh Spiritual Circuit | Jammu & Kashmir, Hemis & Pathar Sahib Lore', 
    'Experience the profound serenity of the Ladakh circuit. Discover the Hemis monastery, the legend of Pathar Sahib, and the profound energy of the high-altitude pilgrimage.', 
    'Ladakh, Hemis, Pathar Sahib, Buddhist, Sikh, Guru Nanak, Hindu Pilgrimage, Ancient Lore, Himalayas', 
    '124', 
    '{
        "spiritualEssence": "The Ladakh circuit is the manifestation of the divine as the supreme endurance and the absolute clarity of the thin air. The energy here is vast, silent, and intensely luminous. It is the site where the spirit of man reached its highest limits of physical and spiritual focus. The vibration is one of ''Sunyata'' (Emptiness) and the absolute presence of the Guru. As a circuit of monasteries and shrines in the cold desert, it represents the indomitable nature of faith. A visit here is believed to grant the devotee the same resilience and clarity that is forged in the silence of the high peaks. The air is always vibrant with the scent of the butter lamps and the silent, heavy energy of the ancient mountain passes.",
        "longDescription": "The spiritual landscape of Ladakh is dominated by Tibetan Buddhist monasteries (Gompas), with Hemis being the largest and most wealthy. Founded in the 17th century by Stagsang Raspa, it is famous for its masked dances and its unique collection of ancient manuscripts. Parallel to this is the Pathar Sahib Gurudwara, located at 12,000 feet on the Leh-Srinagar highway. It commemorates the visit of Guru Nanak Dev to Ladakh in 1517. Legend says a demon rolled a massive boulder to kill the Guru, but the stone turned soft as wax when it touched his body, leaving a permanent imprint. The circuit also includes the Thiksey and Diskit monasteries, creating a spectacular spiritual journey across the Moon-land of Ladakh.",
        "spiritualArchitecture": "The architecture of Ladakh is a masterclass in adaptation to a high-altitude cold desert. Hemis is built into a mountain side, featuring massive white-washed walls and brightly painted red wooden structures. The Dukhang (Assembly Hall) features intricate frescoes and a grand gilded Buddha. Pathar Sahib is a sturdy, modern-ancient hybrid structure that protects the original sacred boulder. The architecture of the Gompas is characterized by the use of mud-brick, stone, and poplar wood, with the flat roofs serving as meditative platforms. The use of vibrant colors—red, yellow, and blue—against the stark brown and grey landscape creates a visual mandala that reflects the spiritual interiority of the region.",
        "vedicReferences": "Ladakh is mentioned in ancient Tibetan and Indian records as the land of the gods (Mang-yul) and is considered a primary site for the study of the Mahayana and Vajrayana traditions.",
        "deepInsights": "The softening of the stone at Pathar Sahib represents the power of non-violence (Ahimsa) over raw aggression. The Ladakh circuit teaches that the highest truth is the one that remains constant in the most challenging environments.",
        "ancientLore": "Lore tells that the Guru personally meditated in the cave at Pathar Sahib and his presence brought a rare spring of fresh water to the dry mountain. Another legend says that the Hemis monastery contains a secret library with records of the ''Lost Years'' of Jesus in India.",
        "keyRituals": [
                {
                        "name": "Hemis Festival",
                        "description": "The grand annual festival celebrating the birth of Guru Padmasambhava with the famous masked Chham dances."
                },
                {
                        "name": "Guru Nanak Jayanti at Pathar Sahib",
                        "description": "The grand celebration of the Guru''s birth at 12,000 feet, featuring collective prayers and Langar."
                },
                {
                        "name": "Daily Butter Lamp Offering",
                        "description": "The ritual lighting of hundreds of lamps in the monasteries to ward off the darkness of ignorance."
                },
                {
                        "name": "Mani Stone Carving",
                        "description": "The ancient practice of carving prayers onto stones and placing them on the mountain passes."
                }
        ],
        "highlights": [
                {
                        "name": "Hemis Monastery",
                        "description": "The largest and wealthiest Buddhist center in Ladakh."
                },
                {
                        "name": "Pathar Sahib Gurudwara",
                        "description": "The sacred site marking the visit of Guru Nanak and the miracle of the softened boulder."
                },
                {
                        "name": "Thiksey Monastery",
                        "description": "The spectacular 12-story complex that resembles the Potala Palace."
                },
                {
                        "name": "Khardung La Pass",
                        "description": "The spiritual threshold of the high mountains, covered in thousands of prayer flags."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September.",
                "howToReach": "Leh is the base for the circuit. Well connected by air from Delhi and by road from Manali or Srinagar (only in summer).",
                "nearestAirport": "Kushok Bakula Rimpoche Airport, Leh.",
                "nearestRailway": "Jammu Tawi (700km away; road travel is the only option)."
        },
        "tips": [
                "Acclimatization is mandatory; spend at least 2 days in Leh before attempting to visit the higher monasteries or Pathar Sahib.",
                "Respect the silence and the photography rules in the monastic assembly halls.",
                "The Langar at Pathar Sahib is open to everyone and is maintained with great devotion by the Indian Army."
        ],
        "faqs": [
                {
                        "question": "How high is Pathar Sahib?",
                        "answer": "It is located at an altitude of approximately 12,000 feet above sea level."
                },
                {
                        "question": "What is the Hemis Festival?",
                        "answer": "It is a world-famous 2-day festival featuring sacred masked dances (Chham) performed by the monks."
                },
                {
                        "question": "Is it open in winter?",
                        "answer": "Leh is accessible by air in winter, but the roads are closed and many monasteries have limited accessibility due to heavy snow."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Jageshwar Dham Temple Complex', 
    'jageshwar-dham', 
    'Sacred Destination', 
    'uk', 
    'A cluster of 124 ancient stone temples hidden in a dense deodar forest of the Kumaon Himalayas, Jageshwar is one of the most important Shaivite sites in India. It is a site of immense antiquity where the Lord is said to have personally resided as a forest dweller.', 
    '520.2', 
    '260.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Stone Forest of the Lord and the Deodar Silence', 
    'Jageshwar Dham | Uttarakhand, Kumaon & Ancient Lore', 
    'Experience the profound serenity of Jageshwar. Discover the 124 stone temples, the legend of the Darukavana, and the profound energy of the deodar forest pilgrimage.', 
    'Jageshwar, Uttarakhand, Lord Shiva, Kumaon, Hindu Pilgrimage, Ancient Lore, Deodar Forest, Jyotirlinga', 
    '125', 
    '{
        "spiritualEssence": "Jageshwar is the manifestation of the divine as the supreme silence and the absolute harmony of the forest. The energy here is quiet, cool, and intensely primeval. It is the site where the Lord personally lived as the master of the wilderness. The vibration is one of ''Tapasyatvam'' (Meditative quality) and the absolute peace of the natural world. As a cluster of stone temples in a deep deodar grove, it represents the indwelling spirit of the Himalayas. A visit here is believed to grant the devotee the same stability and peace that is found in the ancient trees. The air is always vibrant with the scent of the cedar resin and the silent, heavy energy of the 1,000-year-old stone towers.",
        "longDescription": "Jageshwar is located in the Almora district and is often identified as the ''Darukavana'' (Forest of Deodars) mentioned in the Puranas. The cluster consists of 124 small and large stone temples dating from the 7th to the 12th century CE, built by the Katyuri and Chand kings. The main temple is dedicated to Jageshwar (the Lord of the World), a form of Shiva. The site is considered the birthplace of the Lakulisha Shaivite sect. Jageshwar is also a major center for the study of ancient North Indian temple architecture, with the temples featuring the classic Nagara style with heavy stone shikharas. The location, where the Jata Ganga river flows through the narrow valley of deodars, creates a spectacular spiritual landscape that feels untouched by the modern world.",
        "spiritualArchitecture": "The architecture of Jageshwar is a magnificent display of the Nagara style. Each temple is built of massive blocks of local stone, featuring tall, tapered shikharas with intricate relief carvings of the various forms of Shiva and the Mother Goddess. A unique feature is the ''Ek Mukhi Lingam'' (One-faced Lingam) and the presence of numerous small votive shrines. The architecture is sturdy and compact, designed to withstand the heavy snow and rain of the Himalayas. The use of dark stone against the deep green of the deodar forest creates a unique visual and spiritual contrast. The complex also features a grand temple dedicated to Mahamrityunjaya, the Lord of Life and Death, which is one of the most important of its kind in India.",
        "vedicReferences": "Jageshwar is celebrated in the Skanda Purana and the Linga Purana as the supreme forest of meditation for the sages.",
        "deepInsights": "The deodar trees are considered the sages who took the form of trees to stay near the Lord forever. Jageshwar teaches that the highest truth is found in the silence of the forest and the stability of the stone.",
        "ancientLore": "Lore tells that the Lord personally performed penance here to hide from the sages who were testing his divinity. Another legend says that the river Jata Ganga was created from the matted hair of Shiva to wash the feet of the deities in the forest.",
        "keyRituals": [
                {
                        "name": "Mahamrityunjaya Jaap",
                        "description": "The powerful ritual chanting for health and longevity, performed in the dedicated ancient shrine."
                },
                {
                        "name": "Jageshwar Monsoon Festival",
                        "description": "The grand annual festival celebrated during the month of Shravana when the forest is at its greenest."
                },
                {
                        "name": "Jata Ganga Snan",
                        "description": "The ritual bath in the cold mountain stream that flows through the temple complex."
                },
                {
                        "name": "Deep Daan",
                        "description": "The ritual offering of lamps among the stone temples during the evening Aarti."
                }
        ],
        "highlights": [
                {
                        "name": "Main Jageshwar Shrine",
                        "description": "The largest and most important temple in the cluster."
                },
                {
                        "name": "Mahamrityunjaya Temple",
                        "description": "One of the oldest and most spiritually powerful shrines for the conquest of death."
                },
                {
                        "name": "Dandeshwar Temple",
                        "description": "The tallest temple in the region, located slightly away from the main cluster."
                },
                {
                        "name": "Ancient Deodar Forest",
                        "description": "The surrounding grove of thousand-year-old trees that forms the natural temple walls."
                }
        ],
        "travelInfo": {
                "bestTime": "April to June and September to November.",
                "howToReach": "35km from Almora city. Well connected by road; regular taxis and buses run from Almora.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station (120km away)."
        },
        "tips": [
                "Spend at least a few hours just sitting in the forest near the temples; the silence is the primary teaching of this site.",
                "Perform the Mahamrityunjaya Jaap personally if you are seeking healing or longevity.",
                "The drive from Almora through the pine and deodar forests is spectacularly beautiful; have your camera ready."
        ],
        "faqs": [
                {
                        "question": "How many temples are there?",
                        "answer": "There are 124 temples in the main Jageshwar cluster, along with several others scattered in the nearby valley."
                },
                {
                        "question": "Is it a Jyotirlinga?",
                        "answer": "Some traditions identify it as the ''Nageshwar'' Jyotirlinga (the one in the Darukavana), making it a site of supreme significance."
                },
                {
                        "question": "Who built them?",
                        "answer": "They were built primarily by the Katyuri and Chand dynasties between the 7th and 12th centuries CE."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Patal Bhuvaneshwar Cave Temple', 
    'patal-bhuvaneshwar', 
    'Sacred Destination', 
    'uk', 
    'One of the most mysterious spiritual sites in India, Patal Bhuvaneshwar is an underground cave temple located in the Pithoragarh district. It is a site where the history of the universe is said to be etched in limestone, representing the place where all the gods reside in their subterranean form.', 
    '540.5', 
    '270.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Cave of the Universe and the Prophecy of the Stone', 
    'Patal Bhuvaneshwar | Uttarakhand, Mystical Cave & Ancient Lore', 
    'Discover the subterranean wonders of Patal Bhuvaneshwar. Explore the cave of the 33 crore gods, the legend of the Four Yugas, and the profound energy of the underground pilgrimage.', 
    'Patal Bhuvaneshwar, Uttarakhand, Lord Shiva, Cave Temple, Hindu Pilgrimage, Ancient Lore, Pithoragarh, Prophecy', 
    '126', 
    '{
        "spiritualEssence": "Patal Bhuvaneshwar is the manifestation of the divine as the supreme mystery and the hidden foundation of existence. The energy here is intense, subterranean, and intensely primordial. It is the site where the entire cosmos is believed to be contained within the womb of the earth. The vibration is one of ''Antaryamin'' (the indwelling witness) and the absolute cycles of time. As a deep limestone cave, it represents the subconscious mind and the secrets of the spirit. A visit here is believed to grant the devotee the realization of the scale of the divine drama and the release from the fear of time. The air is always vibrant with the scent of the earth and the silent, dripping power of the limestone formations.",
        "longDescription": "Patal Bhuvaneshwar is a 160-meter long cave located 90 feet below the surface. According to the Skanda Purana, this cave contains the manifestations of all the 33 crore gods of the Hindu pantheon. It was first discovered by King Rituparna in the Treta Yuga and later rediscovered by Adi Shankaracharya in the 8th century CE. The cave features extraordinary stalactite and stalagmite formations that represent various deities, including the matted hair of Shiva, the tongue of Kali, and the 1,000-legged elephant of Indra. The most significant feature is the four stone structures representing the Satya, Treta, Dwapara, and Kali Yugas. Legend says that the Kali Yuga stone is slowly growing, and when it touches the roof of the cave, the current world cycle will come to an end.",
        "spiritualArchitecture": "The ''architecture'' of Patal Bhuvaneshwar is entirely natural, created by the slow work of water on limestone over millions of years. The entrance is a narrow, steep tunnel that leads into a series of massive underground chambers. The formations are so incredibly precise that they appear to be carved by divine hands. A unique feature is the ''Way to Heaven'' (Swarga Dwar) and the various natural pools of water (Kunds) within the cave. The government has installed electric lighting and chains for the steep descent, but the core of the cave remains a raw, primeval space where the silence of the earth is the primary experience. The architecture is a literal representation of the Puranic cosmology in stone.",
        "vedicReferences": "Patal Bhuvaneshwar is extensively documented in the Manaskhand of the Skanda Purana, which states that visiting this cave is equal to visiting Kashi and all the Char Dhams combined.",
        "deepInsights": "The descent into the cave represents the journey into the depths of the self. Patal Bhuvaneshwar teaches that the divine is not just in the heights of the sky but in the very foundation of the earth.",
        "ancientLore": "Lore tells that the great serpent Shesha Naga personally supports the roof of this cave on his hood. Another legend says that the Pandavas meditated here before their final ascent to the heavens.",
        "keyRituals": [
                {
                        "name": "Subterranean Aarti",
                        "description": "The unique experience of watching the priests perform worship in the deep, narrow chambers of the cave."
                },
                {
                        "name": "Yuga Stone Offering",
                        "description": "Touching the stones representing the four ages of the world to understand the cycles of time."
                },
                {
                        "name": "Gupt Puja",
                        "description": "Secret or hidden rituals performed by the local priests who have guarded the cave for generations."
                },
                {
                        "name": "Ritual Descent",
                        "description": "The act of descending into the cave itself is considered a ritual of rebirth and purification."
                }
        ],
        "highlights": [
                {
                        "name": "The Great Serpent Hood",
                        "description": "The massive limestone formation representing the head of Shesha Naga."
                },
                {
                        "name": "The Four Yuga Stones",
                        "description": "The prophetic stone formations that track the passage of cosmic time."
                },
                {
                        "name": "The Tongue of Kali",
                        "description": "A spectacular dripping formation representing the Goddess in her fierce form."
                },
                {
                        "name": "The Thousand-Legged Elephant",
                        "description": "A complex stalagmite representing Airavata, the vehicle of Indra."
                }
        ],
        "travelInfo": {
                "bestTime": "October to June.",
                "howToReach": "Well connected by road from Almora (110km) and Pithoragarh (80km). The final approach involves a scenic drive through the Himalayan ridges.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "The entrance is very narrow and steep; it is not recommended for people with extreme claustrophobia or breathing issues.",
                "Hire a local guide (provided at the gate) to identify the hundreds of specific formations and their Puranic stories.",
                "Wear shoes with good grip as the cave floor can be slippery due to the constant dripping of water."
        ],
        "faqs": [
                {
                        "question": "How deep is the cave?",
                        "answer": "The main chambers are about 90 feet (around 12-15 meters) below the surface level."
                },
                {
                        "question": "Is it natural or man-made?",
                        "answer": "It is a 100% natural limestone cave, with the formations being created by geological processes over millions of years."
                },
                {
                        "question": "Can children go inside?",
                        "answer": "Yes, but they should be carefully supervised as the descent is steep and the interior is rocky."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Puttaparthi (Prashanthi Nilayam)', 
    'puttaparthi', 
    'Spiritual City', 
    'ap', 
    'The ''Abode of Supreme Peace,'' Puttaparthi is the birthplace and the headquarters of the global mission of Sathya Sai Baba. It is a site where modern spirituality and universal service meet, attracting millions of international seekers to experience the message of love and selfless service.', 
    '520.2', 
    '700.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Global Heart of Selfless Love and Universal Peace', 
    'Puttaparthi Prashanthi Nilayam | Andhra Pradesh, Sai Baba & Ancient Lore', 
    'Experience the profound serenity of Puttaparthi. Discover the Prashanthi Nilayam ashram, the message of Sathya Sai Baba, and the global heart of universal spirituality.', 
    'Puttaparthi, Andhra Pradesh, Sathya Sai Baba, Prashanthi Nilayam, Hindu Pilgrimage, Ancient Lore, Universal Peace', 
    '127', 
    '{
        "spiritualEssence": "Puttaparthi is the manifestation of the divine as the supreme love and the absolute equality of all beings. The energy here is gentle, inclusive, and intensely humanitarian. It is the site where the high philosophy of the Vedas was translated into the simple language of service (Seva). The vibration is one of ''Shanti'' (Peace) and the absolute unity of the world religions. As a global ashram, it represents the modern face of the eternal wisdom. A visit here is believed to grant the devotee the peace of the mind and the inspiration to serve others. The air is always vibrant with the scent of the incense and the massive, melodic chanting of multi-faith bhajans.",
        "longDescription": "Puttaparthi, once a tiny village in the Anantapur district, was transformed by the presence of Sathya Sai Baba. The heart of the city is the Prashanthi Nilayam ashram, founded in 1950. The mission of the ashram is based on the five pillars of Truth, Right Conduct, Peace, Love, and Non-violence. Puttaparthi is unique for its world-class infrastructure provided entirely for free, including massive super-specialty hospitals and a university. The city is a global village, with citizens from over 100 countries living and serving together. The ashram remains a center for spiritual education and the practice of universal love, continuing the legacy of the Baba''s message that ''Love All, Serve All''.",
        "spiritualArchitecture": "The architecture of Puttaparthi is a unique blend of traditional South Indian styles and modern, functional design. The Prashanthi Nilayam features the grand Kulwant Hall, a massive open assembly space where thousands gather for Darshan and Bhajans. The architecture is characterized by its use of soft colors—pink, blue, and yellow—symbolizing love, spirit, and peace. A unique feature is the Chaitanya Jyoti Museum, which uses state-of-the-art technology to narrate the spiritual history of the world. The massive super-specialty hospital, designed in the shape of a temple, reflects the idea that service to man is service to God. The architecture is designed to create a sense of scale, order, and immense peace.",
        "vedicReferences": "Puttaparthi is celebrated in the modern spiritual literature as the site where the Sanathana Dharma (Eternal Religion) was revitalized for the contemporary world.",
        "deepInsights": "The message ''Love All, Serve All'' represents the practical application of non-duality (Advaita). Puttaparthi teaches that the divine is found not just in the temple, but in the heart of every suffering being.",
        "ancientLore": "Lore tells that the village was named Puttaparthi (the place of the snake-hills) because of the massive number of ant-hills that once covered the region. Another legend says that the site was personally chosen by the Lord to manifest the power of simple, village-based spiritual revolution.",
        "keyRituals": [
                {
                        "name": "Prashanthi Bhajans",
                        "description": "The world-famous collective singing of the names of the divine from all religions, performed twice daily."
                },
                {
                        "name": "Narayana Seva",
                        "description": "The ritual of providing food and care to the underprivileged, practiced on a massive scale."
                },
                {
                        "name": "Veda Chanting",
                        "description": "The collective chanting of the ancient Vedic hymns by thousands of students and devotees."
                },
                {
                        "name": "Prashanthi Flag Hoisting",
                        "description": "The ritual of honoring the universal flag that represents all world religions in unity."
                }
        ],
        "highlights": [
                {
                        "name": "Prashanthi Nilayam",
                        "description": "The main ashram complex and the heart of the global mission."
                },
                {
                        "name": "Sathya Sai Super Specialty Hospital",
                        "description": "A temple of healing where world-class care is provided entirely for free."
                },
                {
                        "name": "Chaitanya Jyoti Museum",
                        "description": "An award-winning spiritual museum showcasing the message of the Baba."
                },
                {
                        "name": "The Eternal Flame",
                        "description": "A flame lit by the Baba that burns continuously to symbolize the eternal spirit."
                },
                {
                        "name": "Samadhi Mantapam",
                        "description": "The grand white marble shrine marking the final resting place of Sathya Sai Baba."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and during the birthday celebrations in November).",
                "howToReach": "Well connected by road and rail; Puttaparthi has its own major railway station (Sri Sathya Sai Prasanthi Nilayam). Regular buses run from Bangalore (150km).",
                "nearestAirport": "Sri Sathya Sai Airport (local) / Kempegowda International Airport, Bangalore.",
                "nearestRailway": "SSPN Railway Station."
        },
        "tips": [
                "Follow the ashram schedule strictly; the gates for Bhajans and Darshan open at specific times.",
                "Dress in modest, traditional white or light-colored clothing as per the ashram protocols.",
                "Participate in the Seva (voluntary service) if you are staying for a longer duration to experience the core of the mission."
        ],
        "faqs": [
                {
                        "question": "What is the core message?",
                        "answer": "The core message is ''Love All, Serve All'' and ''Help Ever, Hurt Never'', emphasizing universal love and service."
                },
                {
                        "question": "Can anyone visit?",
                        "answer": "Yes, the ashram is open to people of all religions, nationalities, and backgrounds without any discrimination."
                },
                {
                        "question": "Is everything free?",
                        "answer": "While guesthouses and food are provided at very nominal costs, the medical and educational services are provided entirely for free."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Siddhivinayak', 
    'siddhivinayak', 
    'Sacred Destination', 
    'mh', 
    'The most iconic Ganesha temple in Mumbai, Siddhivinayak is the abode of the ''Navasacha Ganpati'' (the Lord who fulfills all vows). It is a site of immense power and high-profile devotion, where the elephant-headed God is worshipped as the supreme remover of obstacles.', 
    '310.2', 
    '640.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lord of Beginnings and the Wish-Fulfilling Heart of Mumbai', 
    'Siddhivinayak Temple Mumbai | Maharashtra, Ganesha & Ancient Lore', 
    'Experience the profound power of Siddhivinayak. Discover the legendary Ganesha temple, the history of the black stone idol, and the profound energy of the Navasacha Ganpati.', 
    'Siddhivinayak, Mumbai, Lord Ganesha, Maharashtra, Hindu Pilgrimage, Ancient Lore, Navasacha, Obstacle Remover', 
    '128', 
    '{
        "spiritualEssence": "Siddhivinayak is the manifestation of the divine as the supreme auspiciousness and the absolute success in all endeavors. The energy here is dynamic, regal, and intensely focused on the manifestation of the devotee''s sincere desires. It is the site where the first prayer of every new journey is offered. The vibration is one of ''Siddhi'' (Perfection) and the absolute removal of all blockages. As the heart of Mumbai''s spiritual life, the vibration is one of intense, collective faith and the fulfillment of vows. A visit here is believed to grant the devotee the wisdom to start any project and the strength to see it to completion. The air is always vibrant with the scent of the modaks and the constant, high-energy chanting of Ganpati Bappa Morya.",
        "longDescription": "The Siddhivinayak temple, located in Prabhadevi, Mumbai, was originally built in 1801. The small structure has grown into one of the richest and most famous temples in India. The main deity is a two-foot tall, monolithic black stone idol of Lord Ganesha with his trunk tilted to the right (Siddhivinayak), which is considered particularly powerful and rare. The idol is flanked by Goddesses Riddhi and Siddhi, symbolizing prosperity and success. The temple is famous for attracting people from all walks of life, including world leaders, business icons, and film stars, all of whom walk barefoot for miles to offer their prayers. The Tuesday Aarti is a world-renowned event where thousands wait for hours to catch a glimpse of the Lord, making it the primary spiritual landmark of India''s financial capital.",
        "spiritualArchitecture": "The modern temple architecture is a spectacular multi-storied structure with a gold-plated dome (Kalash). The architecture is designed to accommodate massive crowds while maintaining an atmosphere of intense devotion. The inner roof of the sanctum is plated with gold, and the wooden doors are carved with images of the eight forms of Ganesha (Ashtavinayak). A unique feature is the use of high-tech security and crowd management systems integrated with traditional rituals. The outer walls are adorned with marble and intricate relief carvings. The use of gold, marble, and polished black stone creates a sense of a royal palace dedicated to the Lord of Beginnings.",
        "vedicReferences": "Siddhivinayak is celebrated in the Ganesha Purana and is considered a primary site for the worship of the elephant-headed God in the modern era.",
        "deepInsights": "The trunk tilted to the right represents the sun (Surya-Nadi) and the power to achieve results quickly. Siddhivinayak teaches that with the right intent and divine grace, any obstacle can be turned into a stepping stone.",
        "ancientLore": "Lore tells that the original temple was built by a childless lady named Deubai Patil so that the Lord could grant children to other women. Another legend says that the idol is self-manifested (Swayambhu) and contains the concentrated energy of the mountain where it was found.",
        "keyRituals": [
                {
                        "name": "Tuesday Maha Aarti",
                        "description": "The grand weekly worship where thousands of devotees gather at dawn to sing the praises of the Lord."
                },
                {
                        "name": "Angarki Chaturthi",
                        "description": "The most auspicious day for Ganesha worship when the Chaturthi falls on a Tuesday, attracting millions to the temple."
                },
                {
                        "name": "Navas offering",
                        "description": "The ritual of making a vow to the Lord and returning to offer specific prayers or donations once the desire is fulfilled."
                },
                {
                        "name": "Ganesh Chaturthi",
                        "description": "The grand 10-day festival where the temple becomes the epicenter of Mumbai''s massive celebrations."
                }
        ],
        "highlights": [
                {
                        "name": "The Golden Kalash",
                        "description": "The massive gold-plated dome that crowns the multi-storied temple structure."
                },
                {
                        "name": "The Right-Tilted Trunk Idol",
                        "description": "The rare and powerful black stone image of the Siddhivinayak."
                },
                {
                        "name": "The Silver Mouse",
                        "description": "The large silver idol of the Lord''s vehicle, where devotees whisper their secret prayers."
                },
                {
                        "name": "Inner Golden Sanctum",
                        "description": "The beautifully decorated main shrine where the Lord resides among his consorts."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially Tuesdays and during Ganesh Chaturthi).",
                "howToReach": "Located in the heart of Mumbai (Prabhadevi). Well connected by local trains (Dadar station) and taxis.",
                "nearestAirport": "Chhatrapati Shivaji Maharaj International Airport, Mumbai.",
                "nearestRailway": "Dadar / Mumbai CSMT."
        },
        "tips": [
                "Visit in the early morning (before 5 AM) on non-Tuesdays to avoid long queues.",
                "Follow the traditional queue system; there are separate lines for ''Mukh Darshan'' (view from afar) and ''Charan Darshan'' (touching the feet).",
                "Maintain the sanctity of the high-security zone; photography is restricted in the main sanctum."
        ],
        "faqs": [
                {
                        "question": "Why is the trunk to the right?",
                        "answer": "A right-tilted trunk represents the ''Siddhi Vinayak'' form, which is believed to be more powerful and requires stricter rituals."
                },
                {
                        "question": "How old is the temple?",
                        "answer": "The original small shrine was built in 1801; the current grand structure is a modern reconstruction."
                },
                {
                        "question": "Is there an entry fee?",
                        "answer": "General Darshan is free, though there are ''Paid Darshan'' options for those who wish to skip the long queues."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Pawapuri', 
    'pawapuri', 
    'Sacred Destination', 
    'br', 
    'The ''Sinless City'' of Jainism, Pawapuri is the site of the Nirvana (liberation) of Lord Mahavira, the 24th Tirthankara. It is home to the stunning Jal Mandir (Water Temple), a white marble shrine located in the middle of a massive lake filled with blooming lotuses.', 
    '650.5', 
    '380.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lotus Temple of Nirvana and the Light of Mahavira', 
    'Pawapuri Jal Mandir | Bihar, Jainism & Ancient Lore', 
    'Experience the profound serenity of Pawapuri. Discover the water temple, the site of Mahavira''s Nirvana, and the legendary history of the Sinless City.', 
    'Pawapuri, Bihar, Jainism, Lord Mahavira, Jal Mandir, Hindu Pilgrimage, Ancient Lore, Nirvana', 
    '129', 
    '{
        "spiritualEssence": "Pawapuri is the manifestation of the divine as the supreme liberation and the absolute purity of the soul. The energy here is cool, watery, and intensely peaceful. It is the site where the final shackles of the material world were broken by the great Tirthankara. The vibration is one of ''Moksha'' (Liberation) and the absolute cessation of the cycle of birth and death. As a white marble temple in a lotus lake, it represents the soul that remains untouched by the mud of the world. A visit here is believed to grant the devotee the inspiration for self-conquest and the peace that comes from non-violence. The air is always vibrant with the scent of the lotuses and the silent, shimmering light of the water.",
        "longDescription": "Pawapuri, located in the Nalanda district of Bihar, is one of the most sacred sites for Jains worldwide. It was here that Lord Mahavira delivered his final sermon and attained Nirvana in 527 BCE. The Jal Mandir was built by his elder brother, King Nandivardhan, to mark the spot of his cremation. Legend says that the demand for the sacred ashes was so great that devotees scooped away so much soil that a massive lake was formed, which is now filled with lotuses. The temple is a stunning white marble structure reached by a long stone bridge. Pawapuri is a site where the history of Indian philosophy and the architectural beauty of the Jain tradition are perfectly captured in a landscape of water and stone.",
        "spiritualArchitecture": "The architecture of the Jal Mandir is a spectacular example of the medieval Jain style. The temple is built on a high platform in the center of a square tank (lake) measuring about 17 acres. The main shrine is a compact, elegant structure with a tiered shikhara. A long stone bridge with arched gateways connects the mainland to the temple. The interiors feature white marble floors and pillars with delicate carvings. A unique feature is the presence of the footprint (Charan Paduka) of Lord Mahavira in the sanctum. The architecture is designed to create a sense of isolation from the world, with the surrounding water acting as a natural buffer that focuses the mind on the infinite.",
        "vedicReferences": "Pawapuri is celebrated in the Jain Kalpa Sutra and other Agamic texts as the supreme site of the 24th Tirthankara''s final departure.",
        "deepInsights": "The lotus blooming in the lake represents the enlightened mind that remains pure despite being rooted in the material world. Pawapuri teaches that liberation is the final goal of all spiritual effort.",
        "ancientLore": "Lore tells that when Mahavira attained Nirvana, the gods themselves came down and illuminated the city with such brilliance that there was no night. Another legend says that the lotuses in the lake bloom in response to the prayers of the sincere devotees.",
        "keyRituals": [
                {
                        "name": "Nirvana Ladoo Offering",
                        "description": "The ritual offering of a massive sweet (Ladoo) on the day of Diwali to commemorate the Nirvana of Mahavira."
                },
                {
                        "name": "Prakshal Puja",
                        "description": "The ritual cleaning of the sacred footprints with milk and water at dawn."
                },
                {
                        "name": "Deepavali Mahotsav",
                        "description": "The grand festival of lights where the entire lake and temple are illuminated with thousands of lamps."
                },
                {
                        "name": "Siddhachakra Pujan",
                        "description": "The collective prayer for the attainment of the eight spiritual perfections."
                }
        ],
        "highlights": [
                {
                        "name": "Jal Mandir",
                        "description": "The world-famous marble temple in the middle of the lotus lake."
                },
                {
                        "name": "Gaon Mandir",
                        "description": "The village temple marking the site where Mahavira delivered his last sermon."
                },
                {
                        "name": "Samosharan Temple",
                        "description": "A beautiful modern temple depicting the celestial assembly of the Tirthankara."
                },
                {
                        "name": "The Lotus Lake",
                        "description": "The 17-acre sacred tank that surrounds the main shrine."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Diwali).",
                "howToReach": "100km from Patna and 35km from Rajgir. Well connected by road; regular buses and taxis run from Patna.",
                "nearestAirport": "Jay Prakash Narayan International Airport, Patna.",
                "nearestRailway": "Pawapuri Road Railway Station / Rajgir Junction."
        },
        "tips": [
                "Visit during sunrise or sunset to see the marble temple reflected in the lotus-filled waters; it is a photographer''s paradise.",
                "Maintain the silence and the strict non-violence (Ahimsa) protocols of the Jain site.",
                "Explore the nearby ruins of Nalanda University to understand the historical spiritual context of the region."
        ],
        "faqs": [
                {
                        "question": "Why is it in the middle of a lake?",
                        "answer": "Legend says the lake was formed when millions of devotees took away a pinch of soil from the site where Mahavira was cremated."
                },
                {
                        "question": "When did Mahavira attain Nirvana?",
                        "answer": "In 527 BCE, on the day of Diwali, which is why Diwali is a major festival for Jains."
                },
                {
                        "question": "Is it open to non-Jains?",
                        "answer": "Yes, Pawapuri welcomes visitors of all faiths to experience its peace and beauty."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Kukke Subramanya', 
    'kukke-subramanya', 
    'Sacred Destination', 
    'ka', 
    'Located in the Western Ghats of Karnataka, Kukke Subramanya is the primary center for ''Sarpa Dosha'' (Serpent Remedy) rituals. It is the site where Lord Subramanya (Kartikeya) is worshipped as the protector of the serpent king Vasuki, offering relief from all ancestral and spiritual burdens.', 
    '300.5', 
    '720.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Guardian of the Serpents and the Peak of Healing Grace', 
    'Kukke Subramanya Temple | Karnataka, Sarpa Dosha & Ancient Lore', 
    'Discover the spiritual power of Kukke Subramanya. Explore the serpent remedy rituals, the legend of Vasuki, and the profound energy of the Western Ghats pilgrimage.', 
    'Kukke Subramanya, Karnataka, Lord Murugan, Kartikeya, Sarpa Dosha, Hindu Pilgrimage, Ancient Lore, Serpent Worship', 
    '130', 
    '{
        "spiritualEssence": "Kukke Subramanya is the manifestation of the divine as the supreme protector and the healer of deep, ancestral karmic wounds. The energy here is earthy, protective, and intensely focused on the balance of the serpentine forces (Kundalini). It is the site where the Lord offers sanctuary to those who are burdened by the shadows of the past. The vibration is one of ''Abhaya'' (Fearlessness) and the absolute neutralizing of negative influences. As a temple surrounded by the Kumara Parvatha mountains, it represents the grounding of the celestial fire into the earth. A visit here is believed to grant the devotee the release from the fear of the unknown and the healing of the lineage. The air is always vibrant with the scent of the forest soil and the silent, heavy energy of the sacred serpent mounds.",
        "longDescription": "Kukke Subramanya is situated in the village of Subramanya in South Kannada. According to the Skanda Purana, after killing the demon Taraka, Lord Murugan came to these mountains and gave protection to the serpent king Vasuki, who was hiding from the eagle-god Garuda. Since then, the Lord has been worshipped here as Subramanya (the one who is good for the serpents). The temple is famous worldwide for its ''Ashlesha Bali'' and ''Sarpa Samskara'' rituals, which attract thousands of people seeking remedies for various life challenges. The natural beauty of the site, with the Kumaradhara river flowing nearby and the dense rainforests of the Western Ghats, adds a deep, primeval sanctity to the experience.",
        "spiritualArchitecture": "The temple is built in the traditional Kerala-Karnataka style, featuring a sloping roof and a sturdy stone-and-wood construction. The architecture is designed to handle the heavy monsoon rains of the Western Ghats. The main deity is Lord Subramanya standing on a pedestal with the serpent king Vasuki. A unique feature is the ''Adi Subramanya'' temple, a smaller and older shrine located nearby where the Lord is worshipped in the form of ant-hills (valmika). The complex includes several beautiful mandapams for the performance of the complex serpent rituals. The use of dark stone and the presence of ancient inscriptions reflect the long historical patronage of the local rulers and the Hoysalas.",
        "vedicReferences": "Kukke Subramanya is mentioned in the Sahyadri Khanda of the Skanda Purana as the supreme site for the worship of the serpent-lord.",
        "deepInsights": "The serpent represents the unmanifested energy and the cycles of time. Kukke Subramanya teaches that by honoring the serpentine forces, we can harmonize our own internal energy with the cosmic flow.",
        "ancientLore": "Lore tells that the sage Kanva performed intense penance here and had a vision of the Lord protecting the world. Another legend says that the river Kumaradhara was created when the Lord washed his spear (Vel) in the waters after the cosmic war.",
        "keyRituals": [
                {
                        "name": "Sarpa Samskara",
                        "description": "The elaborate two-day ritual performed to remove the effects of harming a serpent in this or previous lives."
                },
                {
                        "name": "Ashlesha Bali",
                        "description": "The ritual offering to the serpent gods performed during the Ashlesha Nakshatra for protection and prosperity."
                },
                {
                        "name": "Kumaradhara Snanam",
                        "description": "Taking a ritual bath in the sacred river before entering the temple for the main prayers."
                },
                {
                        "name": "Nagapratishte",
                        "description": "The ritual of installing a stone serpent image to seek the blessings of the Naga deities."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Sanctum",
                        "description": "Housing the powerful combined idol of Subramanya and Vasuki."
                },
                {
                        "name": "Adi Subramanya",
                        "description": "The ancient shrine where the Lord is worshipped in his primordial form."
                },
                {
                        "name": "Kumaradhara River",
                        "description": "The sacred mountain stream that flows through the pilgrimage town."
                },
                {
                        "name": "Kumara Parvatha",
                        "description": "The majestic mountain peak that forms the backdrop of the temple, popular for trekking."
                }
        ],
        "travelInfo": {
                "bestTime": "September to March.",
                "howToReach": "Well connected by road and rail; Subramanya Road is the nearest railway station (7km away). Regular buses run from Mangalore (100km) and Bangalore (280km).",
                "nearestAirport": "Mangalore International Airport.",
                "nearestRailway": "Subramanya Road Railway Station."
        },
        "tips": [
                "If you plan to perform the Sarpa Samskara, book your slot at least 3-4 months in advance as they are highly in demand.",
                "Dress modestly and follow the strict protocols of the temple, especially regarding the ritual baths.",
                "The road through the Bisle Ghat to reach Kukke is one of the most scenic drives in the Western Ghats."
        ],
        "faqs": [
                {
                        "question": "What is the Sarpa Samskara?",
                        "answer": "It is a powerful two-day ritual performed at Kukke to mitigate the ''Serpent Curse'' (Sarpa Dosha)."
                },
                {
                        "question": "How to reach from Bangalore?",
                        "answer": "The most common way is by overnight train to Subramanya Road or a 6-hour bus/car drive via the Sakleshpur ghats."
                },
                {
                        "question": "Is it only for people with horoscopic issues?",
                        "answer": "No, while it is famous for remedies, it is a major spiritual site that welcomes everyone seeking the blessings of Lord Murugan."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Aundha Nagnath', 
    'aundha-nagnath', 
    'Sacred Destination', 
    'mh', 
    'Widely considered the 8th Jyotirlinga (Nageshwar), Aundha Nagnath is a site of immense antiquity and architectural wonder. It is where the Lord is said to have personally rotated the temple to face a devotee, representing the absolute power of faith over the constraints of the material world.', 
    '380.2', 
    '580.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Rotated Temple and the Ancient Light of Nageshwar', 
    'Aundha Nagnath Jyotirlinga | Maharashtra, Hingoli & Ancient Lore', 
    'Experience the profound power of Aundha Nagnath. Discover the 8th Jyotirlinga, the legend of Namdev, and the spectacular Hemadpanthi architecture of the rotated temple.', 
    'Aundha Nagnath, Maharashtra, Jyotirlinga, Lord Shiva, Nageshwar, Hindu Pilgrimage, Ancient Lore, Hemadpanthi', 
    '131', 
    '{
        "spiritualEssence": "Aundha Nagnath is the manifestation of the divine as the supreme responsiveness and the absolute subversion of the physical laws for a devotee. The energy here is ancient, heavy, and intensely responsive. It is the site where the unshakeable foundation (the temple) moved in response to a sincere heart. The vibration is one of ''Bhaktadhina'' (Subservience to the devotee) and the absolute presence of the primal light. As a Jyotirlinga of immense historical depth, the vibration is one of concentrated spiritual authority. A visit here is believed to grant the devotee the realization that the divine is always facing them, no matter which direction they are in. The air is always vibrant with the scent of the river silt and the silent, stone-cold power of the massive black basalt carvings.",
        "longDescription": "Aundha Nagnath, located in the Hingoli district of Maharashtra, is a site of absolute architectural and spiritual wonder. It is often identified as the ''Nageshwar'' Jyotirlinga mentioned in the Puranas. The temple was originally built by the eldest Pandava, Yudhishthira, and the current structure dates back to the 13th-century Seuna (Yadava) period. The temple is a masterpiece of the Hemadpanthi style, featuring a unique star-shaped layout and incredible relief carvings. Legend says that the 14th-century saint Namdev was singing bhajans behind the temple because the priests would not let him in the front; the entire temple rotated its face to the back to listen to him. This is why the main Nandi is located at the back of the temple today, a unique feature in all of India.",
        "spiritualArchitecture": "The architecture of Aundha Nagnath is the absolute peak of the Hemadpanthi (Yadava) style. Built of black basalt stone without any mortar, the temple features an incredible density of carvings depicting the various forms of Shiva, the avatars of Vishnu, and the stories of the Puranas. The star-shaped plan creates a series of offsets that play with light and shadow. A unique feature is the subterranean sanctum (Garbagriha), which requires the devotee to descend a few steps into the womb of the earth to worship the Jyotirlinga. The temple was damaged during the Mughal era and the upper shikhara was later rebuilt using brick and plaster, but the massive stone base and the pillars remain in their original 13th-century glory.",
        "vedicReferences": "Aundha Nagnath is celebrated in the Shiva Purana and the Skanda Purana as one of the twelve pillars of light.",
        "deepInsights": "The rotation of the temple represents the truth that the divine is not limited by architectural or social constraints. Aundha Nagnath teaches that the heart of the devotee is the true direction of the Lord.",
        "ancientLore": "Lore tells that Aurangzeb tried to destroy the temple but was stopped by a swarm of thousands of bees that emerged from the stone, forcing his army to flee. Another legend says that the temple was originally seven stories high before being buried in the sands of time.",
        "keyRituals": [
                {
                        "name": "Maha Shivaratri",
                        "description": "The grand annual festival celebrated with night-long prayers and massive processions through the ancient town."
                },
                {
                        "name": "Rudrabhishekam",
                        "description": "The ritual bathing of the subterranean Jyotirlinga with eleven sacred substances while chanting the Sri Rudram."
                },
                {
                        "name": "Namdev Bhajan Utsav",
                        "description": "Special gatherings where the songs of Saint Namdev are sung to commemorate the miracle of the temple''s rotation."
                },
                {
                        "name": "Somvati Amavasya Puja",
                        "description": "Special rituals performed when the new moon falls on a Monday, attracting thousands of pilgrims from across Maharashtra."
                }
        ],
        "highlights": [
                {
                        "name": "Subterranean Sanctum",
                        "description": "The intense, low-lit chamber where the 8th Jyotirlinga is worshipped."
                },
                {
                        "name": "The Rotated Nandi",
                        "description": "The unique placement of the bull at the back of the temple, marking the site of the miracle."
                },
                {
                        "name": "Hemadpanthi Carvings",
                        "description": "The spectacular black stone relief work that covers every inch of the outer walls."
                },
                {
                        "name": "The Pandava Well",
                        "description": "An ancient well nearby believed to have been dug by the Pandavas during their exile."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "60km from Hingoli and 100km from Nanded. Well connected by road; regular buses and taxis run from Nanded and Aurangabad.",
                "nearestAirport": "Hazur Sahib Airport, Nanded / Aurangabad Airport.",
                "nearestRailway": "Chondi Railway Station (local) / Hingoli / Nanded."
        },
        "tips": [
                "The descent into the sanctum involves a narrow and steep set of steps; take your time and be careful if you have mobility issues.",
                "Hire a local guide to point out the specific carvings of the Dashavatara and the various forms of Shiva on the outer walls.",
                "Combine your visit with Hazur Sahib Nanded, which is just a few hours away."
        ],
        "faqs": [
                {
                        "question": "Is it the real Nageshwar?",
                        "answer": "There is a debate between this site and the one in Gujarat; both are ancient and highly revered by different traditions."
                },
                {
                        "question": "Why is the Nandi at the back?",
                        "answer": "According to legend, the temple rotated its face to hear the bhajans of Saint Namdev, leaving the Nandi at the original entrance."
                },
                {
                        "question": "How old is the temple?",
                        "answer": "The core structure is from the 13th century CE, though the site is mentioned in much older Puranic texts."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Parli Vaijnath', 
    'parli-vaijnath', 
    'Sacred Destination', 
    'mh', 
    'One of the twelve Jyotirlingas, Parli Vaijnath is a site of immense healing and spiritual power. It is where the Lord is worshipped as the supreme physician (Vaidyanath), offering health and liberation to all who seek his grace on the slopes of the Meru mountains.', 
    '360.5', 
    '610.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Physician and the Light of Healing Grace', 
    'Parli Vaijnath Jyotirlinga | Maharashtra, Beed & Ancient Lore', 
    'Discover the spiritual power of Parli Vaijnath. Explore the Jyotirlinga of healing, the legend of Ravana, and the profound energy of the Vaidyanath pilgrimage.', 
    'Parli Vaijnath, Maharashtra, Jyotirlinga, Lord Shiva, Vaidyanath, Hindu Pilgrimage, Ancient Lore, Healing', 
    '132', 
    '{
        "spiritualEssence": "Parli Vaijnath is the manifestation of the divine as the supreme healer and the absolute restorer of the natural order. The energy here is cool, medicinal, and intensely compassionate. It is the site where the Lord offers the balm of grace to the suffering soul. The vibration is one of ''Arogya'' (Health) and the absolute protection of the life-force. As a Jyotirlinga situated on a hill, it represents the elevated perspective that leads to well-being. A visit here is believed to grant the devotee the removal of all physical and mental ailments and the realization of the soul''s eternal health. The air is always vibrant with the scent of the mountain herbs and the constant, rhythmic sound of the bells.",
        "longDescription": "Parli Vaijnath, located in the Beed district of Maharashtra, is a site of immense spiritual and historical importance. It is one of the three sites (along with Deoghar and Alandi) that claim the status of the Vaidyanath Jyotirlinga. The temple is situated on the edge of the Meru or Nagyan mountains. The main deity is a powerful Lingam that is worshipped with specific medicinal herbs. Legend says that this is the spot where Ravana stopped while carrying the Shiva Lingam from Kailash to Lanka; the Lingam got stuck here and manifested as the Jyotirlinga. The temple was significantly expanded by the famous Queen Ahilyabai Holkar in the 18th century, who rebuilt the shikhara and the surrounding structures in her characteristic elegant style.",
        "spiritualArchitecture": "The temple is built on a high stone platform and is accessed by a grand flight of wide stone steps. The architecture is a beautiful example of the late Maratha style with influence from the earlier Hemadpanthi period. The main sanctum is a sturdy stone structure with silver-plated doors. A unique feature is the presence of several small shrines for various deities within the massive stone-paved courtyard. The temple is surrounded by a high stone wall with a grand entrance gate. The use of grey granite and the presence of ancient inscriptions reflect the long historical patronage. The atmosphere is one of rugged spiritual power combined with the elegance of the Holkar era.",
        "vedicReferences": "Parli Vaijnath is celebrated in the Shiva Purana and the Skanda Purana as the supreme site where the Lord manifested to heal the universe.",
        "deepInsights": "The Lord as Vaidyanath represents the truth that the divine is the ultimate source of all healing. Parli teaches that true health is the alignment of the body, mind, and spirit with the cosmic law.",
        "ancientLore": "Lore tells that the Goddess Parvati personally prepared medicinal oils here to heal the Lord after the churning of the ocean. Another legend says that the waters of the nearby river became sacred when a drop of the nectar of immortality fell into them.",
        "keyRituals": [
                {
                        "name": "Vaidyanath Abhishekam",
                        "description": "The ritual bathing of the Jyotirlinga with sacred waters and medicinal herbs every morning."
                },
                {
                        "name": "Deep Puja",
                        "description": "The ritual offering of thousands of oil lamps on the temple steps during the auspicious month of Kartika."
                },
                {
                        "name": "Pradosha Puja",
                        "description": "The grand bi-monthly celebration of the evening of Shiva, attracting thousands of local devotees."
                },
                {
                        "name": "Maha Shivaratri",
                        "description": "The grand annual festival celebrated with night-long prayers and a spectacular chariot procession."
                }
        ],
        "highlights": [
                {
                        "name": "The Jyotirlinga Sanctum",
                        "description": "The powerful and ancient shrine of the Supreme Physician."
                },
                {
                        "name": "Ahilyabai Holkar Steps",
                        "description": "The grand stone staircase that leads to the temple, built by the legendary Queen."
                },
                {
                        "name": "The Sacred Lingam of Ravana",
                        "description": "The specific idol believed to have been placed here by the King of Lanka."
                },
                {
                        "name": "View of the Meru Mountains",
                        "description": "The scenic landscape of the surrounding hills from the temple platform."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by rail and road; Parli Vaijnath is a major railway junction. Regular buses run from Aurangabad (220km) and Nanded (110km).",
                "nearestAirport": "Hazur Sahib Airport, Nanded / Aurangabad Airport.",
                "nearestRailway": "Parli Vaijnath Junction."
        },
        "tips": [
                "Visit in the early morning to participate in the Abhishekam; the energy of the temple at dawn is particularly medicinal and peaceful.",
                "The temple involves a short climb; use the steps which are well-maintained and wide.",
                "Explore the local market for traditional Ayurvedic herbs and oils, which are a specialty of the region."
        ],
        "faqs": [
                {
                        "question": "Is it one of the 12 Jyotirlingas?",
                        "answer": "Yes, it is one of the most prominent Jyotirlingas in Maharashtra, worshipped as the Lord of Healing."
                },
                {
                        "question": "Who built the current temple?",
                        "answer": "The current structure was significantly expanded and rebuilt by Queen Ahilyabai Holkar in the 18th century."
                },
                {
                        "question": "How to reach from Nanded?",
                        "answer": "It is a 2.5 to 3-hour drive or a short train journey from Nanded."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Alandi', 
    'alandi', 
    'Sacred Destination', 
    'mh', 
    'The spiritual heart of Maharashtra, Alandi is the site of the ''Sanjivan Samadhi'' of the 13th-century saint-philosopher Dnyaneshwar Maharaj. Located on the banks of the Indrayani river, it is the primary center of the Varkari tradition and a site of immense peace.', 
    '300.2', 
    '630.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Abode of the Living Saint and the Flow of Indrayani', 
    'Alandi Devachi | Maharashtra, Dnyaneshwar & Ancient Lore', 
    'Experience the profound serenity of Alandi. Discover the Sanjivan Samadhi of Dnyaneshwar Maharaj, the legend of the Indrayani river, and the profound energy of the Varkari pilgrimage.', 
    'Alandi, Maharashtra, Dnyaneshwar Maharaj, Varkari, Indrayani River, Hindu Pilgrimage, Ancient Lore, Samadhi', 
    '133', 
    '{
        "spiritualEssence": "Alandi is the manifestation of the divine as the supreme wisdom and the absolute presence of the living master. The energy here is gentle, cool, and intensely devotional. It is the site where the great saint chose to enter eternal meditation to bless the world forever. The vibration is one of ''Bhakti-Jnana'' (the union of love and knowledge) and the absolute peace of the self-realized soul. As a city on the Indrayani river, the vibration is one of constant flow and purification. A visit here is believed to grant the devotee the same clarity and love that Dnyaneshwar Maharaj radiated in his life. The air is always vibrant with the scent of the Tulsi and the constant, melodic chanting of Dnyanba-Tukaram.",
        "longDescription": "Alandi, located 25km from Pune, is known as ''Alandi Devachi'' (Alandi of the Gods). It was here that Sant Dnyaneshwar, at the young age of 21, entered his Sanjivan Samadhi (eternal meditation) in 1296 CE. The temple marks the spot where he is believed to be still residing in his subtle form. Alandi is the starting point of the grand annual Palkhi procession to Pandharpur. The saint was a revolutionary who translated the Bhagavad Gita into the local language (Dnyaneshwari), making spiritual wisdom accessible to all. The city is a major center for the study of the Varkari philosophy and is home to hundreds of monasteries (maths) that keep the ancient traditions alive. A dip in the Indrayani river is considered an essential part of the pilgrimage, purifying the devotee for the darshan of the master.",
        "spiritualArchitecture": "The temple complex is built in the traditional Maratha style, featuring a massive stone-paved courtyard and several grand entrance gates. The main samadhi shrine is a small, intense stone chamber located below the level of the temple floor, creating a sense of descending into the presence of the master. The architecture is characterized by its simplicity and sturdy construction. The temple features a grand shikhara and several beautiful pillared halls (mandapams) where continuous chanting and kirtans are performed. The use of black stone and the presence of an ancient Ajab-vriksha (a tree believed to have grown from the saint''s meditation seat) create an atmosphere of living history and spiritual continuity.",
        "vedicReferences": "Alandi is celebrated in the works of all the 13th-17th century saints of Maharashtra and is considered a primary site for the study of the Advaita philosophy in the Marathi tradition.",
        "deepInsights": "The Sanjivan Samadhi represents the truth that the teacher never leaves the student. Alandi teaches that the highest form of meditation is the one that is undertaken for the welfare of the whole world.",
        "ancientLore": "Lore tells that when the saint entered his samadhi, the entire Indrayani river flowed backward to catch a final glimpse of him. Another legend says that the saint once made a stone wall fly to meet a prideful yogi, representing the power of humility over occult skills.",
        "keyRituals": [
                {
                        "name": "Sanjivan Samadhi Darshan",
                        "description": "The ritual of touching the sacred platform where the saint entered his eternal meditation."
                },
                {
                        "name": "Palkhi Sohala",
                        "description": "The grand annual departure of the saint''s sandals in a palanquin to Pandharpur, involving hundreds of thousands of pilgrims."
                },
                {
                        "name": "Akhanda Bhajan",
                        "description": "The continuous, 24-hour singing of the names of the Lord in the temple courtyard."
                },
                {
                        "name": "Indrayani Snan",
                        "description": "Taking a ritual bath in the sacred river before entering the main shrine."
                }
        ],
        "highlights": [
                {
                        "name": "The Samadhi Shrine",
                        "description": "The intense and peaceful chamber of Sant Dnyaneshwar."
                },
                {
                        "name": "The Flying Wall ( भिंत )",
                        "description": "The legendary stone wall that the saint is said to have flown through his yogic power."
                },
                {
                        "name": "The Indrayani Ghats",
                        "description": "The beautiful riverfront where the daily spiritual cycle of the city unfolds."
                },
                {
                        "name": "The Golden Tree",
                        "description": "The ancient tree within the complex believed to be linked to the saint''s life."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Kartika Ekadashi).",
                "howToReach": "25km from Pune city. Well connected by road; regular buses and taxis run from Pune.",
                "nearestAirport": "Pune International Airport.",
                "nearestRailway": "Pune Junction / Pimpri Railway Station."
        },
        "tips": [
                "Visit during the early morning hours to hear the traditional Abhangas (spiritual songs) being sung; the atmosphere is truly ethereal.",
                "Participate in the simple community meal (Prasadam) if available; it is an experience of the Varkari equality.",
                "Dress modestly and follow the protocols of the samadhi shrine, which is a place of deep silence."
        ],
        "faqs": [
                {
                        "question": "Who was Sant Dnyaneshwar?",
                        "answer": "He was a 13th-century saint-philosopher who wrote the Dnyaneshwari and is the founding figure of the Varkari tradition in Maharashtra."
                },
                {
                        "question": "What is Sanjivan Samadhi?",
                        "answer": "It is a rare spiritual state where a master enters eternal meditation while still in the body, believing they can bless the world forever from that site."
                },
                {
                        "question": "Is it near Pune?",
                        "answer": "Yes, it is about a 45-minute to 1-hour drive from Pune city center."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Shegaon', 
    'shegaon', 
    'Sacred Destination', 
    'mh', 
    'The abode of the 19th-century saint Gajanan Maharaj, Shegaon is one of the most efficient and spiritually vibrant pilgrimage sites in India. Known for its impeccable cleanliness and selfless service, it is a site where the presence of the master is felt through the absolute order and love of the community.', 
    '420.2', 
    '550.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Compassionate Master and the Model of Spiritual Service', 
    'Shegaon Gajanan Maharaj | Maharashtra, Buldhana & Ancient Lore', 
    'Discover the spiritual peace of Shegaon. Explore the temple of Gajanan Maharaj, the legendary Anand Sagar, and the profound energy of the modern saintly tradition.', 
    'Shegaon, Maharashtra, Gajanan Maharaj, Buldhana, Hindu Pilgrimage, Ancient Lore, Seva, Cleanliness', 
    '134', 
    '{
        "spiritualEssence": "Shegaon is the manifestation of the divine as the supreme compassion and the absolute discipline of the soul. The energy here is bright, efficient, and intensely loving. It is the site where the chaotic world is transformed into a model of spiritual order. The vibration is one of ''Seva'' (Selfless Service) and the absolute presence of the master in every action. As a pilgrimage center managed with military-like precision, the vibration is one of modern spiritual excellence. A visit here is believed to grant the devotee the peace of the mind and the inspiration to live a life of selfless service. The air is always vibrant with the scent of the fresh Mahaprasad and the silent, high-energy discipline of the volunteers.",
        "longDescription": "Shegaon, located in the Buldhana district of Maharashtra, was the home of Sant Gajanan Maharaj for 32 years until his Samadhi in 1910. The saint was first seen in the village eating leftover grains from a leaf, representing his absolute detachment and identity with the divine. Today, the Sansthan (Trust) that manages the temple is a model for all religious organizations in India, known for its incredible cleanliness, free food distribution, and transparent management. The city is also home to Anand Sagar, a spectacular spiritual park that combines modern landscaping with ancient wisdom. Shegaon is a site where the 19th-century saintly tradition continues to thrive through the living practice of his teachings—''Gani Gana Ganat Bote'' (The Lord is in every soul).",
        "spiritualArchitecture": "The temple complex is a beautiful and modern-ancient hybrid structure built primarily of white marble and black stone. The architecture is designed for extreme efficiency, with massive halls that can handle tens of thousands of pilgrims in a continuous, peaceful flow. The main Samadhi shrine is a quiet, intense space with a silver-plated idol of the saint. The architecture is characterized by its impeccably clean white marble floors and the grand gopurams. A unique feature is the ''Anand Sagar'' complex, which features a massive meditation hall, beautifully manicured gardens, and a grand lake with a 100-foot tall idol of Vivekananda. The use of modern lighting, sound systems, and crowd-control technology integrated with traditional worship reflects the forward-thinking spirit of the Shegaon Sansthan.",
        "vedicReferences": "Shegaon is celebrated in the modern Marathi spiritual literature (Gajanan Vijay) as the supreme site where the Parabrahman manifested in the form of a simple saint.",
        "deepInsights": "The saint''s detachment from social status represents the truth that the soul is beyond all material categories. Shegaon teaches that spirituality is not just about prayer but about the absolute excellence in how we treat the world.",
        "ancientLore": "Lore tells that the saint once restored a dried-up well by his mere presence and changed the heart of a cruel bandit with a single glance. Another legend says that he continues to guide the management of the Sansthan through the dreams of the sincere volunteers.",
        "keyRituals": [
            {"name": "Samadhi Darshan", "description": "The ritual of offering prayers at the final resting place of the saint, performed in a continuous, silent queue."},
            {"name": "Mahaprasad Seva", "description": "Participating in the massive, free community meal which is considered the highest form of service in Shegaon."},
            {"name": "Gajanan Vijay Path", "description": "The melodic reading of the 21 chapters of the saint''s life and miracles in the temple halls."},
            {"name": "Palkhi Procession", "description": "The grand weekly procession of the saint''s idol through the temple complex every Thursday."}
        ],
        "highlights": [
            {"name": "The Samadhi Shrine", "description": "The intense and peaceful heart of Shegaon."},
            {"name": "Anand Sagar", "description": "The world-class spiritual park and lake situated on the outskirts of the town."},
            {"name": "Sansthan Kitchen", "description": "The massive, ultra-modern kitchen that provides free, hygienic food to millions annually."},
            {"name": "The First Sight Spot", "description": "The exact place in the village where the saint was first seen by the devotees."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "Well connected by rail; Shegaon is a major station on the Mumbai-Howrah main line. Regular buses run from Akola (40km) and Nagpur (300km).",
            "nearestAirport": "Dr. Babasaheb Ambedkar International Airport, Nagpur / Aurangabad Airport.",
            "nearestRailway": "Shegaon Railway Station."
        },
        "tips": [
            "Shegaon is perhaps the cleanest temple town in India; help maintain its sanctity by following all the cleanliness rules.",
            "Stay at the Sansthan''s guesthouses (Bhakta Niwas); they are world-class, extremely affordable, and provide a deep spiritual environment.",
            "Plan a full day for Anand Sagar; it is a massive complex that requires several hours to explore fully."
        ],
        "faqs": [
            {"question": "Who was Gajanan Maharaj?", "answer": "He was a 19th-century saint of Maharashtra, known for his absolute detachment and his message of universal divinity."},
            {"question": "Is the food free?", "answer": "Yes, the Sansthan provides free, high-quality Mahaprasad to every visitor, regardless of their background."},
            {"question": "How far from Nagpur?", "answer": "It is about a 5-6 hour journey by train or road from Nagpur."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Rajgir', 
    'rajgir', 
    'Spiritual City', 
    'br', 
    'The ancient capital of the Magadha Empire, Rajgir is a unique spiritual complex where Buddhism, Jainism, and Hinduism meet. It is home to the Gridhakuta Hill (Vulture''s Peak) and the sacred Brahmakund hot springs, representing the site where the Buddha delivered some of his most profound sutras.', 
    '640.2', 
    '390.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Valley of the Kings and the Peak of the Lotus Sutra', 
    'Rajgir Spiritual Complex | Bihar, Buddhist & Ancient Lore', 
    'Experience the profound serenity of Rajgir. Discover the Vulture''s Peak, the Vishwa Shanti Stupa, and the profound energy of the hot springs and ancient ruins.', 
    'Rajgir, Bihar, Buddhism, Jainism, Lord Buddha, Hindu Pilgrimage, Ancient Lore, Magadha, Gridhakuta', 
    '135', 
    '{
        "spiritualEssence": "Rajgir is the manifestation of the divine as the supreme dialogue and the absolute stillness of the high peaks. The energy here is vast, historical, and intensely multi-layered. It is the site where the highest truths were debated and taught by the greatest masters of the East. The vibration is one of ''Shanti'' (Peace) and the absolute unity of the spiritual paths. As a valley surrounded by five holy hills, it represents the protection of the soul by the forces of nature. A visit here is believed to grant the devotee the same clarity and insight that the Buddha shared on the Vulture''s Peak. The air is always vibrant with the scent of the wild forest and the silent, cool energy of the ancient stone ruins.",
        "longDescription": "Rajgir, located in Bihar, was the capital of the Magadha empire before Pataliputra. It was a favorite retreat of the Buddha, who spent several rainy seasons here at the Gridhakuta hill. It was here that he delivered the Lotus Sutra and the Prajnaparamita sutras. For Jains, Rajgir is equally sacred as it was a frequent residence of Lord Mahavira and is the site where the first Jain council was held. For Hindus, the city is famous for its Brahmakund hot springs, which are believed to have medicinal properties and were visited by Krishna. The city is a spectacular archaeological landscape, featuring the ancient cyclopean walls, the jail of King Bimbisara, and the stunning white marble Vishwa Shanti Stupa built by the Japanese Buddhist community.",
        "spiritualArchitecture": "The architecture of Rajgir is a unique blend of ancient stone ruins and grand modern monuments. The Vishwa Shanti Stupa is a spectacular white marble dome located on the Ratnagiri hill, featuring four golden statues of the Buddha. A modern ropeway provides access to this peak. The Gridhakuta hill features the simple stone foundations of the Buddha''s meditation seat and the caves where his disciples lived. The Brahmakund complex is a series of stone-paved enclosures where natural hot water flows from the mountain into various pools. The ancient cyclopean wall, made of massive unhewn stones, is one of the few examples of prehistoric military architecture in India. The use of local stone, marble, and the integration with the hills creates a sense of an eternal spiritual citadel.",
        "vedicReferences": "Rajgir is mentioned in the Mahabharata as Girivraja and is celebrated in the Pali Canon and the Jain Agamas as a primary site of the great spiritual masters.",
        "deepInsights": "The meeting of three religions in one valley represents the common root of all spiritual seeking. Rajgir teaches that the highest truth is one that is reached through the heights of meditation and the warmth of compassion.",
        "ancientLore": "Lore tells that the hills of Rajgir were personally established by the gods to protect the Magadha kings. Another legend says that the hot springs were created when the sage Agastya brought the fire of the earth to the surface to heal the suffering people.",
        "keyRituals": [
            {"name": "Gridhakuta Meditation", "description": "The modern ritual of sitting in silence on the Vulture''s Peak to connect with the energy of the Buddha''s teachings."},
            {"name": "Brahmakund Snan", "description": "Taking a ritual bath in the sacred hot springs for physical and spiritual healing."},
            {"name": "Shanti Stupa Parikrama", "description": "The ritual of walking around the massive white dome while chanting for world peace."},
            {"name": "Bimbisara Jail Pilgrimage", "description": "Visiting the site where the King meditated on the Buddha even in captivity, symbolizing the freedom of the soul."}
        ],
        "highlights": [
            {"name": "Vishwa Shanti Stupa", "description": "The massive white marble peace pagoda on the Ratnagiri hill."},
            {"name": "Gridhakuta (Vulture''s Peak)", "description": "The iconic hill where the Buddha delivered his most profound sermons."},
            {"name": "Brahmakund Hot Springs", "description": "The sacred and medicinal natural springs at the foot of the hills."},
            {"name": "Cyclopean Wall", "description": "The 40km long prehistoric stone wall that once encircled the ancient city."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "100km from Patna and 15km from Nalanda. Well connected by road; regular buses and taxis run from Patna.",
            "nearestAirport": "Jay Prakash Narayan International Airport, Patna.",
            "nearestRailway": "Rajgir Railway Station / Gaya Junction."
        },
        "tips": [
            "Take the ropeway to reach the Shanti Stupa; it offers spectacular views of the five hills and the valley.",
            "Visit the Gridhakuta hill in the early morning or late afternoon to avoid the heat and the crowds.",
            "Hire a local guide to find the specific caves and ruins mentioned in the Buddhist and Jain texts."
        ],
        "faqs": [
            {"question": "Why is it important for Buddhists?", "answer": "It was a favorite retreat of the Buddha and the site where many foundational Mahayana sutras were first taught."},
            {"question": "Are the hot springs safe?", "answer": "Yes, they are well-managed and believed to have therapeutic properties, though they can be crowded on holidays."},
            {"question": "What is the Vishwa Shanti Stupa?", "answer": "It is a massive peace monument built in the 1960s by the Japanese Buddhist monk Nichidatsu Fujii."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Thirupparamkunram', 
    'thirupparamkunram', 
    'Sacred Destination', 
    'tn', 
    'The first of the six abodes (Arupadai Veedu) of Lord Murugan, Thirupparamkunram is where the Lord was married to Goddess Deivayanai. It is a spectacular rock-cut temple carved into a massive granite hill, representing the supreme union of the soul with the divine power.', 
    '330.2', 
    '850.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The First Abode and the Sacred Union of the Hill', 
    'Thirupparamkunram Murugan | Tamil Nadu, Arupadai Veedu & Ancient Lore', 
    'Experience the profound power of Thirupparamkunram. Discover the rock-cut Murugan temple, the legend of the divine marriage, and the profound energy of the first abode.', 
    'Thirupparamkunram, Madurai, Tamil Nadu, Murugan, Kartikeya, Arupadai Veedu, Hindu Pilgrimage, Ancient Lore, Rock-cut', 
    '136', 
    '{
        "spiritualEssence": "Thirupparamkunram is the manifestation of the divine as the supreme union and the absolute joy of the spiritual marriage. The energy here is festive, grounded, and intensely rocky. It is the site where the warrior Lord transformed into the groom, representing the balance of power and love. The vibration is one of ''Mangalyam'' (Auspiciousness) and the absolute unity of the Shiva and Shakti energies. As a rock-cut temple in a massive granite hill, it represents the unshakeable nature of the divine promise. A visit here is believed to grant the devotee the blessings for a harmonious life and the realization of the union within. The air is always vibrant with the scent of the jasmine and the constant, melodic sound of the traditional Nadaswaram.",
        "longDescription": "Thirupparamkunram is located 8km from Madurai and is mentioned in the earliest Tamil Sangam literature. The main temple is carved directly into a massive granite hill, making it one of the most important rock-cut sites in South India. The main deity is Lord Murugan, worshipped here in his marriage form with Deivayanai (the daughter of Indra). A unique feature is that the main sanctum is shared by several deities including Shiva, Vishnu, Durga, and Ganesha, all carved into the same rock face. The site commemorates the victory over the demon Surapadma and the subsequent celebration of the divine wedding. Thirupparamkunram is a site where the Vedic and the Tamil traditions are perfectly unified in a landscape of stone and light.",
        "spiritualArchitecture": "The architecture of Thirupparamkunram is a spectacular display of Pandyan rock-cut engineering. The main sanctum (Garbagriha) is excavated from a single rock, featuring massive pillars and dynamic relief carvings. The temple features a grand 7-tiered Rajagopuram and several extensive pillared halls (Mandapams) built in later periods. A unique feature is the placement of the various deities side-by-side in the rock-cut sanctum, reflecting a rare non-dualistic worship pattern. The use of dark granite and the precision of the rock excavation create an atmosphere of immense age and spiritual gravity. The temple also features the ''Saravana Poigai,'' a sacred tank where the Lord is said to have manifested from the six sparks of Shiva''s eye.",
        "vedicReferences": "Thirupparamkunram is celebrated in the Tirumurugatruppadai of Nakkeerar and is considered the foundational site of the Murugan tradition in the South.",
        "deepInsights": "The marriage at the first abode represents the first stage of the soul''s journey—the union with the divine grace. Thirupparamkunram teaches that true victory leads to a state of eternal harmony and joy.",
        "ancientLore": "Lore tells that the hill itself is a form of the Lord and that the various caves were the dwelling places of the sages who came to witness the divine wedding. Another legend says that the saint Nakkeerar was rescued from a demon here by the Lord, leading to the composition of his famous verses.",
        "keyRituals": [
            {"name": "Thirukkalyanam", "description": "The grand annual celebration of the divine marriage between Murugan and Deivayanai, attracting thousands of couples."},
            {"name": "Kanda Sashti", "description": "The 6-day festival commemorating the victory over the demon, with special prayers in the rock-cut halls."},
            {"name": "Panguni Uthiram", "description": "The festival of the full moon where the Lord is taken in a spectacular procession around the sacred hill."},
            {"name": "Abhishekam to the Rock", "description": "The ritual bathing of the rock-cut deities with sacred substances, which flows back into the mountain."}
        ],
        "highlights": [
            {"name": "The Rock-cut Sanctum", "description": "The ancient heart of the temple carved directly into the granite hill."},
            {"name": "Saravana Poigai", "description": "The sacred tank where the divine sparks are believed to have landed."},
            {"name": "The Wedding Hall", "description": "The beautifully carved mandapam where the divine marriage is celebrated annually."},
            {"name": "The View of Madurai", "description": "The spectacular panorama of the temple city from the higher slopes of the hill."}
        ],
        "travelInfo": {
            "bestTime": "October to March (especially during the wedding festivals).",
            "howToReach": "8km from Madurai city center. Well connected by road; regular buses and taxis run from the Madurai Meenakshi temple area.",
            "nearestAirport": "Madurai Airport.",
            "nearestRailway": "Madurai Junction / Thirupparamkunram Railway Station."
        },
        "tips": [
            "Visit in the early morning to avoid the heat of the granite hill; the rock stays cool inside the sanctum.",
            "Explore the small cave shrines scattered around the base of the hill for a more quiet and meditative experience.",
            "Maintain the silence in the rock-cut areas; the acoustics are incredible and even a whisper can travel far."
        ],
        "faqs": [
            {"question": "What is the Arupadai Veedu?", "answer": "It is the group of six most sacred abodes of Lord Murugan in Tamil Nadu; Thirupparamkunram is the first of these."},
            {"question": "Who was married here?", "answer": "Lord Murugan was married to Deivayanai, the daughter of the king of gods, Indra, at this site."},
            {"question": "Is it near the Meenakshi temple?", "answer": "Yes, it is only 8 kilometers away and is an essential part of the Madurai pilgrimage circuit."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Akkalkot', 
    'akkalkot', 
    'Sacred Destination', 
    'mh', 
    'The abode of Swami Samarth Maharaj, a 19th-century saint believed to be an incarnation of Lord Dattatreya. Akkalkot is a site of immense faith and simple devotion, where the master''s message of ''Fear not, I am with you'' continues to offer solace to millions.', 
    '330.5', 
    '650.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Eternal Presence of the Guru and the Banyan Shade', 
    'Akkalkot Swami Samarth | Maharashtra, Solapur & Ancient Lore', 
    'Experience the profound serenity of Akkalkot. Discover the Swami Samarth temple, the legend of the Banyan tree, and the profound energy of the Dattatreya tradition.', 
    'Akkalkot, Maharashtra, Swami Samarth, Dattatreya, Solapur, Hindu Pilgrimage, Ancient Lore, Guru', 
    '137', 
    '{
        "spiritualEssence": "Akkalkot is the manifestation of the divine as the supreme assurance and the absolute protection of the Guru. The energy here is fatherly, firm, and intensely comforting. It is the site where the fear of the worldly life is surrendered to the grace of the master. The vibration is one of ''Abhaya'' (Fearlessness) and the absolute presence of the eternal teacher. As a site centered around the Banyan tree where the Swami resided, it represents the shade and security of the spiritual life. A visit here is believed to grant the devotee the same strength and fearlessness that the Swami radiated. The air is always vibrant with the scent of the incense and the constant, reassuring chant of Shri Swami Samarth.",
        "longDescription": "Akkalkot, located near Solapur in Maharashtra, was the home of Swami Samarth for 22 years until his Mahasamadhi in 1878. The Swami is one of the most revered figures in the Dattatreya tradition, known for his eccentric yet profoundly wise ways and his many miracles. The heart of the pilgrimage is the Vatavruksha Swami Samarth Devasthan, a temple built around the massive Banyan tree where the Swami used to spend most of his time. Akkalkot is a site where the barriers of caste and religion were broken by the master''s universal love. The city continues to attract millions who come to seek the Swami''s protection, especially those facing deep personal or spiritual crises, drawn by his famous promise: ''Bhiu Nakos, Mi Tuzya Pathishi Aahe'' (Fear not, I am behind you).",
        "spiritualArchitecture": "The temple architecture is a sturdy and traditional Maratha style, built primarily of stone and wood. The centerpiece is the massive Banyan tree, which is integrated into the temple structure. The main Samadhi shrine is a beautifully carved marble structure located in the same complex. The architecture is characterized by its large, open courtyards that allow for the continuous flow of pilgrims and the performance of collective prayers. A unique feature is the ''Palakhi'' (palanquin) hall, where the silver sandals of the Swami are kept. The use of simple stone and marble, combined with the presence of the ancient tree, creates an atmosphere of an organic and living spiritual sanctuary where nature and the master are one.",
        "vedicReferences": "Akkalkot is celebrated in the Gurucharitra and the modern Swami Charitra as the supreme site where the Dattatreya energy manifested for the modern world.",
        "deepInsights": "The Banyan tree represents the expansive and protective nature of the Guru''s grace. Akkalkot teaches that the highest form of security is found in the absolute surrender to the master''s will.",
        "ancientLore": "Lore tells that the Swami once stopped a train by his mere will to bless a devotee and turned a dry stick into a blooming plant. Another legend says that he continues to appear to his sincere devotees in various forms to protect them in times of danger.",
        "keyRituals": [
            {"name": "Vatavruksha Darshan", "description": "The ritual of worshipping the sacred Banyan tree where the Swami resided and performed his pastimes."},
            {"name": "Swami Samadhi Puja", "description": "Offering prayers and floral tributes at the final resting place of the master every morning."},
            {"name": "Palakhi Sohala", "description": "The grand weekly procession of the Swami''s sandals every Thursday, accompanied by music and chanting."},
            {"name": "Annadaan Seva", "description": "Participating in the massive community kitchen that provide free meals to thousands of pilgrims daily."}
        ],
        "highlights": [
            {"name": "The Sacred Banyan Tree", "description": "The massive ancient tree that served as the Swami''s primary seat."},
            {"name": "The Samadhi Shrine", "description": "The peaceful white marble shrine where the Swami''s physical remains were placed."},
            {"name": "The Silver Sandals", "description": "The sacred Padukas believed to carry the eternal energy of the master."},
            {"name": "The Armoury Museum", "description": "A nearby museum in the Akkalkot Palace showcasing the historical links between the royal family and the saint."}
        ],
        "travelInfo": {
            "bestTime": "October to March (especially on Thursdays).",
            "howToReach": "40km from Solapur city. Well connected by road; regular buses and taxis run from Solapur.",
            "nearestAirport": "Pune Airport / Hyderabad Airport.",
            "nearestRailway": "Solapur Junction / Akkalkot Road Station."
        },
        "tips": [
            "Visit on a Thursday if you wish to experience the full intensity of the Akkalkot devotion, but be prepared for massive crowds.",
            "Stay at the Bhakta Niwas guesthouses for a simple and authentic pilgrimage experience.",
            "Spend some time sitting quietly under the shade of the Banyan tree; the silence there is the most direct connection to the Swami''s energy."
        ],
        "faqs": [
            {"question": "Who was Swami Samarth?", "answer": "He was a 19th-century saint of the Dattatreya tradition, believed by millions to be a direct incarnation of the divine."},
            {"question": "What is his most famous saying?", "answer": "''Bhiu Nakos, Mi Tuzya Pathishi Aahe'' (Fear not, I am behind you/I am with you)."},
            {"question": "Is it near Solapur?", "answer": "Yes, it is a 45-minute to 1-hour drive from Solapur city."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Shikharji', 
    'shikharji', 
    'Sacred Destination', 
    'jh', 
    'The most sacred pilgrimage site in Jainism, Shikharji (Parasnath Hill) is the site where 20 out of the 24 Tirthankaras attained Nirvana. It is a massive spiritual mountain in Jharkhand, representing the peak of self-conquest and eternal liberation.', 
    '680.5', 
    '420.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mountain of Liberation and the Peak of the 20 Tirthankaras', 
    'Shikharji Parasnath | Jharkhand, Jainism & Ancient Lore', 
    'Experience the profound serenity of Shikharji. Discover the mountain of liberation, the 27km parikrama, and the profound energy of the 20 Tirthankaras who attained Nirvana here.', 
    'Shikharji, Jharkhand, Jainism, Parasnath, Lord Parshvanatha, Hindu Pilgrimage, Ancient Lore, Nirvana', 
    '138', 
    '{
        "spiritualEssence": "Shikharji is the manifestation of the divine as the supreme liberation and the absolute victory over the cycle of rebirth. The energy here is vast, thin, and intensely focused on the spiritual heights. It is the site where the earth meets the heavens in the silence of the high peaks. The vibration is one of ''Moksha-Marga'' (The Path to Liberation) and the absolute peace of the Tirthankaras. As a mountain ridge with hundreds of white marble shrines, it represents the ladder of consciousness. A visit here is believed to grant the devotee the seed of liberation and the strength to overcome all karmic bonds. The air is always vibrant with the scent of the incense and the silent, cool energy of the high Himalayan-like ridges of Jharkhand.",
        "longDescription": "Shikharji, located in the Giridih district of Jharkhand, is the highest peak in the state. The hill is named after Lord Parshvanatha, the 23rd Tirthankara, who attained Nirvana here. The pilgrimage involves a 27-kilometer long trek (Parikrama) up the mountain and along the ridge, visiting 31 Tonks (shrines) that mark the spots of Nirvana. The mountain is considered so sacred that Jains believe every atom of the soil has been touched by the feet of the enlightened ones. Shikharji is a site of absolute silence and non-violence, where millions of pilgrims walk barefoot for hours at night to reach the peaks by sunrise, creating a spectacle of deep, collective devotion that has remained unchanged for millennia.",
        "spiritualArchitecture": "The architecture of Shikharji is characterized by its numerous small, white marble Tonks (shrines) scattered along the mountain ridge. Each Tonk features the footprint (Charan Paduka) of a Tirthankara. The main temple at the highest peak is dedicated to Lord Parshvanatha and features a grand marble structure with a tall shikhara. The architecture is designed to withstand the extreme weather of the high peaks while maintaining a minimalist and pure aesthetic. The use of white marble against the deep green and brown of the forest hill creates a unique visual and spiritual contrast. The complex at the foot of the hill (Madhuban) features several grand temples and guesthouses with intricate carvings in the Maru-Gurjara style.",
        "vedicReferences": "Shikharji is celebrated in the Jain Kalpa Sutra and other Agamic texts as the supreme ''Siddha Kshetra'' (Site of Perfection) of the current world cycle.",
        "deepInsights": "The 27km trek represents the difficult and long journey of the soul towards its final goal. Shikharji teaches that the highest peaks of spirituality are reached through the simple and persistent steps of discipline and non-violence.",
        "ancientLore": "Lore tells that the mountain once glowed with a celestial light that was visible for hundreds of miles during the Nirvana of the Tirthankaras. Another legend says that the wildlife of the hill, including tigers and serpents, lived in perfect peace with the meditating sages.",
        "keyRituals": [
                {
                        "name": "27km Parikrama",
                        "description": "The ritual trek up the hill, usually started at 2 AM to reach the first peak by sunrise."
                },
                {
                        "name": "Charan Paduka Puja",
                        "description": "Worshipping the sacred footprints at each of the 31 Tonks along the mountain ridge."
                },
                {
                        "name": "Prakshal Puja at Madhuban",
                        "description": "The ritual bathing of the Tirthankara idols in the base temples before starting the climb."
                },
                {
                        "name": "Deep Daan on the Peak",
                        "description": "The offering of lamps at the Parshvanatha peak during the auspicious evening hours."
                }
        ],
        "highlights": [
                {
                        "name": "Parshvanatha Tonk",
                        "description": "The highest and most sacred point on the mountain, marking the Nirvana of the 23rd Tirthankara."
                },
                {
                        "name": "The 31 Tonks",
                        "description": "The series of white marble shrines marking the spots of Nirvana for 20 Tirthankaras and 11 Ganadharas."
                },
                {
                        "name": "Madhuban",
                        "description": "The base village filled with beautiful temples and residential ashrams."
                },
                {
                        "name": "Gandharva Nala",
                        "description": "A natural stream on the trek path where pilgrims traditionally stop for rest and purification."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road from Dhanbad (60km) and Ranchi (190km). The nearest railway station is Parasnath (ISRI).",
                "nearestAirport": "Ranchi Airport / Birsa Munda Airport.",
                "nearestRailway": "Parasnath Railway Station."
        },
        "tips": [
                "The trek is 27km and takes about 9-12 hours; start early (around 2 AM) to avoid the heat of the day.",
                "Dolis (palanquins) are available for the elderly or those with physical difficulties.",
                "Maintain the absolute sanctity of the site; carry no leather items and respect the rules of non-violence (Ahimsa)."
        ],
        "faqs": [
                {
                        "question": "How many Tirthankaras attained Nirvana here?",
                        "answer": "Exactly 20 out of the 24 Tirthankaras of the current age attained Nirvana at Shikharji."
                },
                {
                        "question": "What is the length of the trek?",
                        "answer": "The complete Parikrama (ascent, ridge walk, and descent) is approximately 27 kilometers."
                },
                {
                        "question": "Is it a difficult climb?",
                        "answer": "It is a long trek but the path is well-defined and paved in many parts; average fitness is required."
                }
        ],
        "relationships": {
                "related_pujas": [],
                "nearby_destinations": [],
                "related_blogs": [],
                "related_festivals": []
        }
}'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";