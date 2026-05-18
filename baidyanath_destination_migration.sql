-- Delete both legacy Baidyanath entries (the isolated Jyotirlinga and isolated Shakti Peeth)
DELETE FROM "public"."destinations" WHERE slug IN ('baidyanath', 'baidyanath-deoghar');

-- Insert the comprehensive, merged Baidyanath Destination Entry
INSERT INTO "public"."destinations" (
    "id", 
    "name", 
    "slug", 
    "type", 
    "state_id", 
    "description", 
    "x", 
    "y", 
    "size", 
    "images", 
    "is_featured", 
    "is_active", 
    "tagline", 
    "seo_title", 
    "seo_description", 
    "seo_keywords", 
    "order_rank", 
    "content"
) VALUES (
    gen_random_uuid(), 
    'Baidyanath (Deoghar)', 
    'baidyanath-deoghar', 
    'Jyotirlinga & Shakti Peeth', 
    'jh', 
    'Located in Deoghar, Jharkhand, Baba Baidyanath is incredibly rare—it is simultaneously revered as one of the 12 Jyotirlingas of Lord Shiva and one of the 51 Shakti Peeths of Goddess Sati. It is the ultimate spiritual sanctuary of healing.', 
    '399.3', 
    '295.3', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1604582531633-8898950d60d3?auto=format&fit=crop&w=1200&q=80'], 
    'true', 
    'true', 
    'The Supreme Healer & Heart of Sati', 
    'Baidyanath Dham | Jyotirlinga & Shakti Peeth in Deoghar', 
    'Explore Baidyanath Dham (Deoghar). Discover its profound significance as both a Jyotirlinga and Shakti Peeth, the story of Ravana, and the Shravani Mela rituals.', 
    'Baidyanath, Deoghar, Jyotirlinga, Shakti Peeth, Lord Shiva, Kamna Linga, Shravani Mela, Hindu Pilgrimage, Jharkhand', 
    '9', 
    '{
        "spiritualEssence": "Baba Baidyanath is uniquely positioned as the supreme healer of the cosmos. The presiding deity is known as ''Kamna Linga''—the lingam that fulfills all sincere desires. Because the heart (Hridaya) of Goddess Sati fell exactly in this very region, the spiritual energy here is an incredibly potent synthesis of Shiva''s masculine consciousness and Shakti''s divine feminine grace. Devotees believe that even a single offering of sacred water (Jalabhishek) here possesses the power to cure chronic ailments and grant complete spiritual rejuvenation.",
        
        "longDescription": "The mythological origin of Baidyanath Dham is intrinsically tied to the demon king, Ravana. According to the Shiva Purana, Ravana—the greatest devotee of Lord Shiva—performed severe penance in the Himalayas to please the Lord. He even began cutting off his own heads, one by one, to offer to the Shivalinga. Pleased by this extreme devotion, Shiva descended, healed Ravana (acting as a ''Vaidya'' or doctor), and granted him a boon. Ravana requested to take a Jyotirlinga back to his kingdom of Lanka to make it invincible.\n\nLord Shiva agreed, but with one condition: if Ravana placed the Lingam on the ground anywhere during the journey, it would be permanently fixed there. The gods, terrified of Ravana gaining ultimate power, orchestrated a divine intervention. Lord Vishnu took the form of a shepherd boy and offered to hold the Lingam while Ravana answered a call of nature. The boy quickly placed the heavy Lingam on the ground. When Ravana returned, he could not uproot it despite his immense strength. That very spot became Baidyanath Dham.\n\nSimultaneously, this exact land is revered in the Devi Bhagavata Purana. When Lord Shiva carried the burning corpse of Goddess Sati, Lord Vishnu severed her body with his Sudarshan Chakra to stop Shiva''s destructive dance of grief (Tandava). Sati''s heart fell in Deoghar, making it a supreme Shakti Peeth known as the Hridaya Peeth (Seat of the Heart). Today, thousands of devotees, especially during the holy month of Shravan, walk barefoot for over 100 kilometers carrying water from the Ganges at Sultanganj to offer it at this sacred sanctuary.",
        
        "spiritualArchitecture": "The central temple of Baba Baidyanath is a magnificent stone structure facing east, soaring to a height of 72 feet. Its architecture is classic Nagara style, crowned with three ascending, gold-plated vessels (Kalash) donated by Maharaja Puran Singh. Uniquely, the top of the temple is adorned with a Punchshula (five knives) rather than the standard Trishul (trident), which is considered a symbol of absolute protection. The temple complex is a sprawling spiritual city in itself, housing 21 additional shrines dedicated to various deities, all interconnected with red sacred threads tied by devotees between the Shiva temple and the adjacent Parvati temple, symbolizing their eternal cosmic union.",
        
        "vedicReferences": "Baidyanath is celebrated in several ancient texts. The Matsya Purana refers to the region as ''Chitabhoomi'' or ''Hardapeetha.'' The Shiva Purana details the legend of Ravana and the establishment of the Kamna Linga. It is revered as a site where dual cosmic forces operate in perfect equilibrium, making it a focal point for Tantric practitioners and ascetic yogis for millennia.",
        
        "localLegends": "A powerful local legend states that because Ravana pressed the Lingam into the earth with his thumb in a fit of rage after failing to uproot it, the top of the Baidyanath Jyotirlinga is slightly indented. The priests (Pandas) of the temple claim direct lineage from the ancient sages who first established the worship protocols here, maintaining an unbroken chain of Vedic rituals spanning centuries.",
        
        "keyRituals": [
            {
                "name": "Shravani Mela Jalabhishek",
                "description": "During the monsoon month of Shravan, millions of ''Kanwariyas'' fetch holy water from the Ganges at Sultanganj and trek 108km barefoot to pour it over the Jyotirlinga."
            },
            {
                "name": "Shringaar Aarti",
                "description": "A visually spectacular evening ritual where the Lingam is adorned with fragrant flowers, sandalwood paste, and a majestic silver crown, accompanied by the hypnotic beating of massive temple drums (Dholak)."
            },
            {
                "name": "Gathbandhan (Sacred Tying)",
                "description": "Devotees tie a long red sacred thread connecting the Shikhar (top) of the main Shiva temple to the top of the Maa Parvati temple, seeking marital bliss and harmony."
            }
        ],
        
        "highlights": [
            {
                "name": "Maa Parvati Temple",
                "description": "Situated directly across from the main Shiva shrine, this is the exact location of the Shakti Peeth where the Goddess is worshipped."
            },
            {
                "name": "Naulakha Mandir",
                "description": "Located just 1.5 km from the main temple, this architectural marvel was built at a cost of 9 lakh rupees (hence ''Naulakha'') and resembles the Ramakrishna Math in Belur."
            },
            {
                "name": "Basukinath Temple",
                "description": "A crucial secondary shrine located about 43 km away. It is believed that the pilgrimage to Baidyanath is incomplete without a subsequent visit and offering to Lord Basukinath."
            },
            {
                "name": "Tapovan",
                "description": "A tranquil hill located 10 km from Deoghar featuring numerous caves where Sage Valmiki is said to have undertaken deep penance."
            }
        ],
        
        "travelInfo": {
            "bestTime": "October to March for a comfortable visit. (July-August is specifically for the Shravani Mela, which is extremely crowded).",
            "nearestAirport": "Deoghar Airport (DGH) has direct flights from Delhi and Kolkata. Alternatively, Kazi Nazrul Islam Airport, Durgapur (approx. 150 km).",
            "nearestRailway": "Deoghar Junction (DGHR) and Jasidih Junction (JSME - 8 km away) which is on the major Delhi-Howrah main line.",
            "howToReach": "Easily accessible by road, rail, and air. Jasidih is highly recommended as the primary railhead for maximum connectivity."
        },
        
        "tips": [
            "Opt for the ''Sighra Darshan'' (VIP pass) if you are traveling with elderly family members to bypass the often-massive queues.",
            "Beware of unauthorized guides or aggressive priests offering expedited rituals; stick to the official temple committee counters.",
            "Do not miss the famed ''Peda'' of Deoghar—a delicious milk-based sweet that is the signature Prasad of the temple.",
            "Wear slip-on shoes, as footwear must be left far away from the main temple entrance."
        ],
        
        "faqs": [
            {
                "question": "Why is it called the Kamna Linga?",
                "answer": "Lord Shiva, pleased by Ravana''s devotion, declared that anyone who prays at this specific Lingam with a pure heart will have all their worldly and spiritual desires (Kamna) fulfilled."
            },
            {
                "question": "Is Baidyanath a Jyotirlinga or a Shakti Peeth?",
                "answer": "It is remarkably both. The Jyotirlinga was brought by Ravana, and the heart of Goddess Sati fell at the exact same location, making it a dual epicenter of divine masculine and feminine energies."
            },
            {
                "question": "How long is the queue for Darshan?",
                "answer": "On normal weekdays, it takes about 1-2 hours. However, during Mondays, Mahashivratri, and the month of Shravan, the wait can exceed 6 to 10 hours."
            },
            {
                "question": "Can non-Hindus enter the main temple?",
                "answer": "While the larger temple complex is generally open to all respectful visitors, entry into the inner Garbhagriha (sanctum sanctorum) to touch the Lingam is strictly reserved for practicing Hindus."
            }
        ]
    }'
);
