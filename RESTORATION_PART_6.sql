-- RESTORATION PART 6
INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Sravanabelagola (Bahubali)', 
    'sravanabelagola-bahubali', 
    'Sacred Destination', 
    'ka', 
    'Home to the world''s tallest monolithic stone statue, Sravanabelagola is the supreme pilgrimage for Jains. The 57-foot tall statue of Gommateshwara (Bahubali) stands as a symbol of absolute detachment, non-violence, and self-conquest.', 
    '160.5', 
    '550.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Monolith of Absolute Detachment and Peace', 
    'Gommateshwara Sravanabelagola | Bahubali, Jainism & Ancient Lore', 
    'Experience the awe-inspiring presence of Bahubali at Sravanabelagola. Discover the 57-foot monolith, the Mahamastakabhisheka festival, and the profound Jain philosophy.', 
    'Sravanabelagola, Bahubali, Jainism, Karnataka, Gommateshwara, Monolith, Hindu Pilgrimage, Ancient Lore, Peace', 
    '44', 
    '{
        "spiritualEssence": "Sravanabelagola is the manifestation of the divine as absolute self-conquest. The energy here is towering, silent, and incredibly high-vibrational. The 57-foot statue of Bahubali, standing naked and serene, represents the ultimate state of detachment (Kayotsarga). The vibration is one of Ahimsa (Non-violence) and Aparigraha (Non-attachment). It is the site where the great king Bharata''s brother, Bahubali, meditated for a year in a standing posture, so still that creepers grew around his legs. The vibration is one of profound peace and the realization that the greatest victory is the victory over one''s own ego. A visit here is a journey into the heights of the soul, literally and figuratively, as one climbs the Vindhyagiri hill.",
        "longDescription": "Sravanabelagola has a history spanning over 2,000 years. The Great Monolith of Gommateshwara was commissioned in 981 CE by Chavundaraya, the minister of the Ganga dynasty. The statue is carved from a single block of fine-grained grey granite. The city is situated between two hills—Vindhyagiri and Chandragiri. Chandragiri is where the Mauryan Emperor Chandragupta Maurya is said to have performed his final fast (Sallekhana) after embracing Jainism. Sravanabelagola is famous for the Mahamastakabhisheka, a grand head-anointing ceremony held once every 12 years, where the statue is bathed in milk, sugarcane juice, saffron, and gold coins. It is a center for Jain art, architecture, and manuscript preservation.",
        "spiritualArchitecture": "The Gommateshwara statue is an architectural wonder of the world. It stands on the top of the Vindhyagiri hill, accessible by climbing over 600 steps carved into the rock. The statue shows Bahubali with curly hair, large ears, and an enigmatic smile, with vines (Madhavi) entwined around his arms and legs. The surrounding temple complex features several pillars and shrines with intricate carvings. The Chandragiri hill features several ancient Jain temples (Bastis) built in the Dravidian style.",
        "vedicReferences": "While a Jain site, Sravanabelagola is a vital part of the Indian spiritual landscape, sharing the common Vedic roots of meditation, penance, and liberation.",
        "deepInsights": "The standing posture (Kayotsarga) signifies the total disregard for the physical body in the quest for the spirit. Bahubali teaches that even a great king must let go of all power to find the truth.",
        "ancientLore": "Lore tells that when the statue was being consecrated, the milk offered by thousands of kings would not flow down past the navel, but when a simple old woman offered a small bowl of milk with pure devotion, it flowed down to the very base. Another legend says that the creepers represent the binding of the soul by karma, which only falls away in total meditation.",
        "keyRituals": [
                {
                        "name": "Mahamastakabhisheka",
                        "description": "The spectacular once-in-12-years ritual of bathing the massive statue with sacred substances."
                },
                {
                        "name": "Nitya Puja",
                        "description": "Daily rituals performed at the feet of the monolith by Jain monks."
                },
                {
                        "name": "Pradakshina",
                        "description": "Circumambulating the massive platform on which the statue stands."
                }
        ],
        "highlights": [
                {
                        "name": "Vindhyagiri Hill",
                        "description": "The hill housing the 57-foot Gommateshwara monolith."
                },
                {
                        "name": "Chandragiri Hill",
                        "description": "The site of several ancient Jain temples and the memorial of Chandragupta Maurya."
                },
                {
                        "name": "Sravanabelagola Lake",
                        "description": "The white pond (Bela-gola) from which the city gets its name."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "150km from Bangalore and 80km from Mysore, well connected by road and rail.",
                "nearestAirport": "Bangalore International Airport / Mysore Airport.",
                "nearestRailway": "Sravanabelagola Railway Station."
        },
        "tips": [
                "Start the climb early in the morning to avoid the heat of the midday sun on the rock.",
                "Dolis (palanquins) are available for the elderly and those unable to climb the steps.",
                "The site is strictly vegetarian; respect the Jain traditions of the town."
        ],
        "faqs": [
                {
                        "question": "How many steps to the top?",
                        "answer": "There are approximately 620-650 steps to reach the main statue on Vindhyagiri hill."
                },
                {
                        "question": "When is the next Mahamastakabhisheka?",
                        "answer": "The last one was in 2018; the next grand ceremony is scheduled for 2030."
                },
                {
                        "question": "Who was Bahubali?",
                        "answer": "He was the second son of the first Jain Tirthankara, Rishabhanatha; he is revered for his supreme detachment."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Hampi (Virupaksha)', 
    'hampi-virupaksha', 
    'Spiritual City', 
    'ka', 
    'The capital of the once-mighty Vijayanagara Empire, Hampi is a surreal landscape of boulders and ruins. The Virupaksha Temple, dedicated to Shiva as the consort of Pampa (the Tungabhadra river), is the living heart of this UNESCO World Heritage site.', 
    '180.5', 
    '500.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Golden Ruins of the Forgotten Empire', 
    'Virupaksha Temple Hampi | Vijayanagara, Tungabhadra & Ancient Lore', 
    'Explore the spiritual grandeur of Hampi. Discover the Virupaksha temple, the boulder-strewn landscape, and the profound history of the Vijayanagara Empire.', 
    'Hampi, Virupaksha, Karnataka, Vijayanagara, Tungabhadra, Lord Shiva, Hindu Pilgrimage, Ancient Lore, UNESCO', 
    '45', 
    '{
        "spiritualEssence": "Hampi is the manifestation of the divine as the resilient spirit. The energy here is nostalgic, vast, and intensely atmospheric. It is the site where the golden era of the Vijayanagara Empire met its tragic end, yet the Virupaksha temple continued to thrive. The vibration is one of the persistence of the sacred through the ruins of the material. As the site of Kishkindha (from the Ramayana), the vibration is also one of ancient loyalty and strength. A visit here is a journey through a dreamscape of stone and river. The air is always vibrant with the sound of the Tungabhadra and the silent stories of a thousand ruined shrines.",
        "longDescription": "Hampi has a history dating back to the Ramayana era, identified as the monkey kingdom of Kishkindha. It rose to global prominence as the capital of the Vijayanagara Empire in the 14th century, described by travelers as more magnificent than Rome. The Virupaksha temple is the oldest and most sacred, standing since the 7th century. The city is a sprawling museum of over 1,600 monuments, including the Vittala temple with its stone chariot and musical pillars. The landscape is dominated by massive granite boulders and the sacred Tungabhadra river. Hampi is a site where every hill (Matanga, Hemakuta, Anjanadri) has a spiritual story to tell. It is a UNESCO World Heritage site that captures the pinnacle of medieval Indian art and architecture.",
        "spiritualArchitecture": "The architecture of Hampi is a unique blend of Dravidian, Indo-Islamic, and local styles. The Virupaksha temple features a towering 160-foot gopuram and a spacious courtyard. The Vittala temple is a masterpiece of the Vijayanagara style, known for its ornate pillars and the iconic Stone Chariot. The city includes royal structures like the Lotus Mahal and the Elephant Stables. The landscape itself is a form of architecture, where the temples are perfectly integrated into the natural boulder formations.",
        "vedicReferences": "Hampi is celebrated in the Pampa Mahatmya and is the site of the legendary Kishkindha Kanda of the Ramayana.",
        "deepInsights": "The ruins of Hampi represent the impermanence of all material empires. The living Virupaksha temple signifies that while the body (the city) may fall, the spirit (the temple) remains eternal.",
        "ancientLore": "Lore tells that the Goddess Pampa performed penance here to marry Shiva (Virupaksha). Another legend says that Lord Rama met Hanuman and Sugriva on the nearby Anjanadri hill, which is the birthplace of Hanuman.",
        "keyRituals": [
                {
                        "name": "Kalyanotsavam",
                        "description": "The daily celebration of the divine wedding of Virupaksha and Pampa."
                },
                {
                        "name": "Hampi Utsav",
                        "description": "The massive annual cultural festival celebrating the glory of the empire."
                },
                {
                        "name": "Tungabhadra Aarti",
                        "description": "The evening ritual of lamps performed on the banks of the sacred river."
                }
        ],
        "highlights": [
                {
                        "name": "Vittala Temple",
                        "description": "The most ornate temple complex featuring the famous Stone Chariot."
                },
                {
                        "name": "Virupaksha Temple",
                        "description": "The living heart of Hampi where active worship is performed."
                },
                {
                        "name": "Anjanadri Hill",
                        "description": "The birthplace of Lord Hanuman, offering a panoramic view of the ruins."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road from Bangalore (350km). The nearest railway station is Hospet (13km).",
                "nearestAirport": "Jindal Vidyanagar Airport / Hubballi Airport.",
                "nearestRailway": "Hospet Junction."
        },
        "tips": [
                "Rent a bicycle or a moped to explore the vast ruins at your own pace.",
                "Cross the river by coracle (traditional round boat) to visit the ''Hippie Island'' side.",
                "Hike up Matanga hill for the most spectacular sunrise over the ruins."
        ],
        "faqs": [
                {
                        "question": "How many days are needed to see Hampi?",
                        "answer": "At least 3 days are needed to cover the main monuments and experience the atmosphere."
                },
                {
                        "question": "Is Hampi a holy city?",
                        "answer": "Yes, especially the Virupaksha area is highly sacred, and alcohol/meat is restricted in the temple vicinity."
                },
                {
                        "question": "Where is Hanuman''s birthplace?",
                        "answer": "It is traditionally believed to be the Anjanadri hill, located across the river from the main ruins."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Kushinagar', 
    'kushinagar', 
    'Sacred Destination', 
    'up', 
    'The site of the Buddha''s final departure, Kushinagar is the place of the Mahaparinirvana. It is where the Tathagata laid down his physical form between two Sal trees, leaving behind the message of the impermanence of all conditioned things.', 
    '380.5', 
    '230.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Ground of the Final Liberation', 
    'Kushinagar | Mahaparinirvana, Reclining Buddha & Ancient Lore', 
    'Discover the spiritual peace of Kushinagar. Explore the Mahaparinirvana temple, the 1500-year-old reclining Buddha statue, and the profound message of the Buddha''s departure.', 
    'Kushinagar, Buddha, Uttar Pradesh, Mahaparinirvana, Reclining Buddha, Hindu Pilgrimage, Ancient Lore, Peace', 
    '46', 
    '{
        "spiritualEssence": "Kushinagar is the manifestation of the divine as the final release. The energy here is quiet, reflective, and deeply solemn. It is the site where the great teacher completed his earthly mission. The vibration is one of the absolute acceptance of the cycle of life and death. The Mahaparinirvana temple, housing the 6-meter long reclining Buddha, represents the ultimate peace that comes from the cessation of craving. A visit here is a journey into the depth of one''s own mortality and the quest for that which is deathless. The air is always vibrant with the scent of incense and the silent prayers of pilgrims from all over Asia.",
        "longDescription": "The history of Kushinagar is linked to the Malla kingdom of ancient India. The Buddha chose this quiet forest to spend his final hours, instructing his disciples to ''strive on with diligence.'' The Mahaparinirvana Temple and the Rambhar Stupa (the site of his cremation) were rediscovered by British archaeologists in the 19th century. The city has since become one of the four most important Buddhist pilgrimage sites in the world. The reclining Buddha statue, carved from a single block of red sandstone, dates back to the 5th century CE. Kushinagar is a site of international spiritual collaboration, with monasteries built by Myanmar, Tibet, Japan, and Sri Lanka, each adding to the city''s peaceful and diverse atmosphere.",
        "spiritualArchitecture": "The Mahaparinirvana temple is a modern white structure built on the ancient foundations, housing the 1500-year-old reclining Buddha. The Rambhar Stupa is a massive circular brick structure that marks the cremation site. The complex includes several ancient ruins of monasteries and smaller stupas. The architecture of the various international monasteries reflects the unique styles of their respective Buddhist traditions.",
        "vedicReferences": "While a Buddhist site, the Buddha is revered as the ninth avatar of Vishnu in many Hindu traditions, and Kushinagar is a vital stop for seekers of all paths.",
        "deepInsights": "The reclining posture of the Buddha represents the state of perfect awareness even at the moment of death. Kushinagar teaches that the true teacher is within, and the final liberation is attained by the one who conquers themselves.",
        "ancientLore": "Lore tells that the Sal trees under which the Buddha lay flowered out of season to pay homage to the teacher. Another legend says that the river Kakuttha, where he took his last bath, turned crystal clear and sweet to quench his thirst.",
        "keyRituals": [
                {
                        "name": "Meditation at Nirvana Temple",
                        "description": "Silent sitting in the presence of the reclining Buddha statue."
                },
                {
                        "name": "Offering of Cloth",
                        "description": "Covering the reclining Buddha statue with silk robes, a traditional act of devotion."
                },
                {
                        "name": "Parikrama of Rambhar Stupa",
                        "description": "Circumambulating the cremation site while chanting or in silence."
                }
        ],
        "highlights": [
                {
                        "name": "Mahaparinirvana Temple",
                        "description": "The shrine housing the 1500-year-old reclining Buddha statue."
                },
                {
                        "name": "Rambhar Stupa",
                        "description": "The 15-meter tall stupa marking the site of the Buddha''s cremation."
                },
                {
                        "name": "Matha Kuar Shrine",
                        "description": "A nearby site where a massive 10th-century blue stone statue of the Buddha is enshrined."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "55km from Gorakhpur, well connected by road. Kushinagar has its own international airport.",
                "nearestAirport": "Kushinagar International Airport / Gorakhpur Airport.",
                "nearestRailway": "Gorakhpur Junction."
        },
        "tips": [
                "Visit the various international monasteries for a glimpse into different Buddhist cultures.",
                "Maintain silence and decorum within the Nirvana temple complex.",
                "Combine your visit with Lumbini (Nepal), the birthplace of the Buddha, about 170km away."
        ],
        "faqs": [
                {
                        "question": "What is the meaning of Mahaparinirvana?",
                        "answer": "It refers to the final ''blowing out'' of the fires of greed, hatred, and delusion at the time of the death of an enlightened being."
                },
                {
                        "question": "How old is the reclining Buddha statue?",
                        "answer": "It was carved in the 5th century CE during the Gupta period."
                },
                {
                        "question": "Is the airport operational?",
                        "answer": "Yes, Kushinagar International Airport is operational with flights from various domestic and international locations."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Sarnath', 
    'sarnath', 
    'Sacred Destination', 
    'up', 
    'Located just 10km from Varanasi, Sarnath is where the Buddha gave his first sermon after attaining enlightenment. It is the birthplace of the Dharma and the site of the iconic Dhamekh Stupa and the Ashokan Lion Capital.', 
    '415.5', 
    '245.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Ground of the First Turning of the Wheel', 
    'Sarnath | First Sermon, Dhamekh Stupa & Ashokan Lore', 
    'Discover the spiritual origins of Sarnath. Explore the Dhamekh Stupa, the Ashokan Lion Capital, and the profound wisdom of the first sermon on the Four Noble Truths.', 
    'Sarnath, Buddha, Varanasi, Uttar Pradesh, First Sermon, Dhamekh Stupa, Ashoka, Hindu Pilgrimage, Ancient Lore, Dharma', 
    '47', 
    '{
        "spiritualEssence": "Sarnath is the manifestation of the divine as the teacher. The energy here is scholarly, peaceful, and intensely inspiring. It is the site where the wheel of Dharma (Dhammacakkappavattana) was first turned. The vibration is one of the beginning of the path of wisdom. The Dhamekh Stupa, a massive brick structure, represents the stability and the reach of the teachings. A visit here is a call to learn and to apply the principles of the Middle Path. The air is always vibrant with the scent of the deer park and the sound of the world''s major Buddhist traditions meeting in harmony. It is a site of intellectual and spiritual awakening.",
        "longDescription": "The history of Sarnath dates back to the 6th century BCE when the Buddha met his five former companions here. He taught them the Four Noble Truths and the Eightfold Path. The Emperor Ashoka visited the site in the 3rd century BCE and built the grand Dhamekh Stupa and the famous Ashokan Pillar, whose Lion Capital is now the National Emblem of India. Sarnath was a major center for Buddhist learning for over 1,500 years until it was destroyed in the 12th century. Rediscovered in the 19th century, it is now one of the most important archaeological and spiritual sites in the world. The city is home to several international monasteries and the world-class Sarnath Museum, which houses the original Ashokan Lion Capital and the iconic preaching Buddha statue from the Gupta period.",
        "spiritualArchitecture": "The Dhamekh Stupa is a massive circular tower, 43 meters high, built of brick and stone with intricate floral carvings. The Dharmarajika Stupa and the Ashokan Pillar ruins are other key architectural features. The Mulagandha Kuti Vihar is a modern temple with beautiful murals by Japanese artists. The Sarnath Museum is a masterpiece of British-Indian architecture, housing some of the most famous sculptures in the history of art.",
        "vedicReferences": "Sarnath is also associated with the Jain Tirthankara Shreyansanath, who was born nearby, and it remains a site of deep respect for seekers of all Indian traditions.",
        "deepInsights": "The first sermon teaches that the path to peace lies between the extremes of self-indulgence and self-mortification. Sarnath teaches that the truth must be shared to be fully realized.",
        "ancientLore": "Lore tells that the Buddha traveled from Bodh Gaya to Sarnath on foot to share his realization with his friends. Another legend says that the deer in the park still gather to listen when the Dharma is chanted correctly.",
        "keyRituals": [
                {
                        "name": "Meditation at Dhamekh Stupa",
                        "description": "Sitting in silence near the site of the first sermon."
                },
                {
                        "name": "Chanting of First Sermon",
                        "description": "Reciting the Dhammacakkappavattana Sutta within the stupa precincts."
                },
                {
                        "name": "Offering of Flowers",
                        "description": "Laying flowers at the ruins of the ancient monasteries as a mark of respect."
                }
        ],
        "highlights": [
                {
                        "name": "Dhamekh Stupa",
                        "description": "The massive 43-meter tall stupa marking the site of the first sermon."
                },
                {
                        "name": "Ashokan Lion Capital",
                        "description": "The original stone sculpture that is now the National Emblem of India, kept in the museum."
                },
                {
                        "name": "Mulagandha Kuti Vihar",
                        "description": "The modern temple featuring beautiful murals and a sacred relic of the Buddha."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "10km from Varanasi, easily accessible by taxi, auto-rickshaw, or local bus.",
                "nearestAirport": "Lal Bahadur Shastri Airport, Varanasi.",
                "nearestRailway": "Varanasi Junction / Sarnath Railway Station."
        },
        "tips": [
                "Combine your visit with the morning or evening Ganga Aarti in Varanasi.",
                "The Sarnath Museum is closed on Fridays; plan accordingly.",
                "Maintain the peaceful and scholarly atmosphere of the deer park."
        ],
        "faqs": [
                {
                        "question": "What did the Buddha teach here?",
                        "answer": "He taught the Four Noble Truths and the Eightfold Path, known as the First Turning of the Wheel of Dharma."
                },
                {
                        "question": "Is the original Lion Capital in Sarnath?",
                        "answer": "Yes, the original 3rd-century BCE Ashokan Lion Capital is housed in the Sarnath Museum."
                },
                {
                        "question": "How long to spend in Sarnath?",
                        "answer": "A half-day (3-4 hours) is sufficient to see the main ruins and the museum."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Srirangam', 
    'srirangam', 
    'Spiritual City', 
    'tn', 
    'The world''s largest functioning Hindu temple complex, Srirangam is the primary of the 108 Divya Desams. Located on an island between the Kaveri and Kollidam rivers, it is the supreme abode of Lord Ranganatha (Vishnu) in his reclining form.', 
    '230.2', 
    '730.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Abode of the Reclining Lord', 
    'Srirangam Ranganathaswamy Temple | Kaveri Island, Divya Desam & Lore', 
    'Explore the spiritual majesty of Srirangam. Discover the world''s largest temple complex, the legend of the reclining Vishnu, and the profound wisdom of the Vishishtadvaita philosophy.', 
    'Srirangam, Ranganathaswamy, Tamil Nadu, Vishnu, Divya Desam, Kaveri, Hindu Pilgrimage, Ancient Lore, Ramanuja', 
    '48', 
    '{
        "spiritualEssence": "Srirangam is the manifestation of the divine as the cosmic king residing in his capital. The energy here is regal, expansive, and intensely organized. It is the heart of the Sri Vaishnava tradition. The vibration is one of Sharanagati (absolute surrender) and the realization of the Lord''s infinite grace. As an island temple, it represents the soul (the island) surrounded by the waters of the material world, yet always centered on the divine. The vibration is ancient, potent, and considered the ''Bhuloka Vaikuntha'' (Vaikuntha on earth). A visit here is believed to grant the devotee the same peace that the Lord experiences in his eternal reclining state. The air is always vibrant with the sound of the Kaveri and the chanting of the Nalayira Divya Prabandham.",
        "longDescription": "The history of Srirangam spans millennia, with the temple being patronized by the Cholas, Pandyas, Hoysalas, and the Vijayanagara Empire. The temple complex covers 156 acres and features 21 massive gopurams, including the Rajagopuram which is one of the tallest in Asia. The main deity, Lord Ranganatha, is seen reclining on the five-hooded serpent Adisesha. The temple is the center of the life and work of the great philosopher-saint Ramanuja, whose mortal remains are still preserved in a seated posture within the temple complex. Srirangam is a city-temple, where the first seven concentric walls (Prakarams) house the residences and shops of the devotees, making the temple part of the daily life of the people. It is a UNESCO Asia-Pacific Award winner for cultural heritage conservation.",
        "spiritualArchitecture": "The temple is the pinnacle of Dravidian city planning and architecture. It features 21 gopurams, 39 pavilions, 50 shrines, and several sacred tanks. The Rajagopuram stands at 236 feet tall. The Hall of 1000 Pillars (actually 953) is a masterpiece of sculpture, featuring rearing horses and warriors carved from single blocks of granite. The inner sanctum (Srirangam Vimanam) is gold-plated and shaped like the sacred symbol ''Om''. The architecture is designed as a mandala, representing the seven layers of the human body and the seven heavens.",
        "vedicReferences": "Srirangam is celebrated in the Silappadikaram and the works of the Alvars (Vaishnavite saints). It is the primary site for the study of the Vishishtadvaita school of Vedanta.",
        "deepInsights": "The reclining posture (Sayana) of the Lord represents his constant awareness while in a state of yogic sleep. Srirangam teaches that the divine is both the ruler of the universe and the most accessible friend of the devotee.",
        "ancientLore": "Lore tells that the idol of Ranganatha was originally worshipped by Lord Rama and was gifted to Vibhishana. On his way to Lanka, Vibhishana placed the idol on the banks of the Kaveri, and it became fixed there, choosing to stay in the beautiful forest of Srirangam forever.",
        "keyRituals": [
                {
                        "name": "Vaikuntha Ekadashi",
                        "description": "The most important festival where the ''Paramapada Vasal'' (gate to heaven) is opened for devotees."
                },
                {
                        "name": "Vishwaroopa Darshan",
                        "description": "The first morning ritual where the Lord is awakened with sacred hymns."
                },
                {
                        "name": "Thayar Sannidhi Puja",
                        "description": "Special rituals dedicated to Goddess Ranganayaki (Lakshmi), the consort of the Lord."
                }
        ],
        "highlights": [
                {
                        "name": "Rajagopuram",
                        "description": "The massive 236-foot tall gateway, one of the tallest in the world."
                },
                {
                        "name": "Ramanuja Shrine",
                        "description": "The unique shrine housing the preserved body of the great saint Ramanuja."
                },
                {
                        "name": "1000-Pillar Hall",
                        "description": "A spectacular hall of sculptures dating back to the Vijayanagara period."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and during Vaikuntha Ekadashi).",
                "howToReach": "Located in Tiruchirappalli (Trichy), well connected by air, rail, and road. Trichy has its own international airport.",
                "nearestAirport": "Tiruchirappalli International Airport.",
                "nearestRailway": "Srirangam Railway Station / Trichy Junction."
        },
        "tips": [
                "Allocate at least a full day to explore the massive temple complex and its multiple shrines.",
                "Hire a licensed guide to understand the complex history and iconography of the various Prakarams.",
                "Respect the traditional dress code (Dhoti for men, Saree/Chudidar for women)."
        ],
        "faqs": [
                {
                        "question": "How many gopurams are there?",
                        "answer": "The temple complex has 21 gopurams, with the Rajagopuram being the most prominent."
                },
                {
                        "question": "Is it the largest temple in the world?",
                        "answer": "It is often cited as the largest functioning Hindu temple complex in the world (Angkor Wat is larger but not fully functioning)."
                },
                {
                        "question": "Can I see the Ramanuja statue?",
                        "answer": "Yes, there is a dedicated shrine for Sri Ramanuja within the temple complex."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Thanjavur (Brihadisvara)', 
    'thanjavur-brihadisvara', 
    'Spiritual City', 
    'tn', 
    'The ''Big Temple'' of Thanjavur is a masterpiece of Chola engineering and the site of the massive 13-foot tall Shiva Lingam. Built by Raja Raja Chola I, it is a UNESCO World Heritage site that represents the pinnacle of Tamil architectural genius.', 
    '235.5', 
    '740.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Granite Majesty of the Chola Empire', 
    'Brihadisvara Temple Thanjavur | Big Temple, Chola Lore & Ancient Lore', 
    'Discover the architectural wonder of Thanjavur Brihadisvara. Explore the 13-foot Shiva Lingam, the massive monolithic Nandi, and the profound secrets of Chola stone engineering.', 
    'Thanjavur, Brihadisvara, Tamil Nadu, Chola Dynasty, Lord Shiva, UNESCO, Hindu Pilgrimage, Ancient Lore, Big Temple', 
    '49', 
    '{
        "spiritualEssence": "Thanjavur is the manifestation of the divine as the supreme architect and ruler. The energy here is grand, stable, and intensely powerful. It is the site where the Chola empire''s spiritual and political power reached its zenith. The vibration is one of absolute perfection in form and sound. The massive Brihadisvara (the Great Lord) lingam represents the infinite nature of Shiva. The vibration is ancient, potent, and considered a bridge between the earth and the heavens. A visit here is believed to grant the devotee the vision of the divine order in the universe. The air is always vibrant with the scent of the granite and the memory of the thousands of dancers and musicians who once served the Lord here.",
        "longDescription": "Built in 1010 CE, the Brihadisvara temple is one of the largest and oldest temples in the world. It was constructed entirely of granite, which was transported from over 60km away. The temple tower (Vimanam) stands 216 feet tall and is capped by a monolithic stone (Kumbam) weighing 80 tons. The main deity is a 13-foot tall Shiva Lingam, one of the largest in India. The temple features a massive monolithic Nandi (bull) at the entrance, carved from a single stone weighing 25 tons. The walls are decorated with beautiful murals from the Chola and Nayak periods and thousands of inscriptions that provide a detailed record of the temple''s administration and donations. Thanjavur is also the birthplace of the Bharatanatyam dance form and the Thanjavur style of painting.",
        "spiritualArchitecture": "The temple is the supreme example of Dravidian architecture. It features a massive courtyard (Prakaram) surrounded by high walls. The Vimanam is unique as it is taller than the gateway (Gopuram), a reversal of later Dravidian styles. The temple is designed such that the shadow of the main tower is said to never fall on the ground at noon. The interior includes several smaller shrines dedicated to Ganesha, Murugan, and the Goddess. The stone carvings are incredibly detailed, showing various forms of Shiva and celestial beings.",
        "vedicReferences": "Thanjavur is celebrated in the works of the Nayanars and various Chola inscriptions. It is a primary site for the study of the Shaiva Siddhanta philosophy.",
        "deepInsights": "The massive size of the temple and the lingam represents the ''Brihat'' (Great) aspect of the divine that encompasses all. Thanjavur teaches that the highest form of beauty is the one that reflects the divine perfection.",
        "ancientLore": "Lore tells that a massive earthen ramp, several kilometers long, was built to roll the 80-ton stone to the top of the Vimanam. Another legend says that the main lingam was installed by a great sage who used his spiritual power to stabilize the massive stone.",
        "keyRituals": [
                {
                        "name": "Maha Abhishekam",
                        "description": "The grand ritual bathing of the 13-foot lingam with massive quantities of milk, honey, and sacred water."
                },
                {
                        "name": "Pradosha Puja",
                        "description": "Special worship of the massive Nandi and Lord Shiva during the auspicious twilight hours."
                },
                {
                        "name": "Thanjavur Dance Festival",
                        "description": "Annual cultural celebration featuring Bharatanatyam performances by world-renowned artists."
                }
        ],
        "highlights": [
                {
                        "name": "The Great Vimanam",
                        "description": "The 216-foot tall granite tower, a masterpiece of ancient engineering."
                },
                {
                        "name": "Monolithic Nandi",
                        "description": "One of the largest monolithic bulls in India, carved from a single stone."
                },
                {
                        "name": "Chola Murals",
                        "description": "Ancient paintings depicting scenes from the life of Shiva and the Chola kings."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "60km from Trichy, well connected by road and rail. The nearest airport is Trichy.",
                "nearestAirport": "Tiruchirappalli International Airport.",
                "nearestRailway": "Thanjavur Junction."
        },
        "tips": [
                "Visit the temple during the late afternoon to see the granite glow in the setting sun.",
                "Explore the nearby Thanjavur Royal Palace and Museum for a deeper look into the region''s history.",
                "Wear comfortable footwear as you will need to walk barefoot on the stone courtyard."
        ],
        "faqs": [
                {
                        "question": "Is the temple really made of granite?",
                        "answer": "Yes, the entire temple is built from approximately 130,000 tons of granite."
                },
                {
                        "question": "Who built the Big Temple?",
                        "answer": "It was built by the Chola Emperor Raja Raja Chola I between 1003 and 1010 CE."
                },
                {
                        "question": "Does the shadow of the Vimanam ever fall on the ground?",
                        "answer": "Local tradition says it doesn''t at noon, though modern observations show it might; it remains a testament to the Chola''s astronomical precision."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Kumbakonam', 
    'kumbakonam', 
    'Spiritual City', 
    'tn', 
    'Known as the ''Cambridge of South India'' and a major temple city, Kumbakonam is the site of the legendary Mahamaham festival. It is where the cosmic pot (Kumbha) of nectar settled after the Pralaya, making it the center of universal rejuvenation.', 
    '240.2', 
    '735.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The City of the Divine Nectar Pot', 
    'Kumbakonam | Temple City, Mahamaham & Ancient Lore', 
    'Experience the spiritual richness of Kumbakonam. Discover the Sarangapani temple, the Mahamaham tank, and the profound secrets of the Navagraha temples surrounding the city.', 
    'Kumbakonam, Tamil Nadu, Temple City, Mahamaham, Lord Shiva, Lord Vishnu, Hindu Pilgrimage, Ancient Lore, Navagraha', 
    '50', 
    '{
        "spiritualEssence": "Kumbakonam is the manifestation of the divine as the source of eternal life (Amrit). The energy here is scholarly, ritualistic, and intensely concentrated. It is a city of over 188 temples. The vibration is one of renewal and the preservation of the sacred seeds of life. As the site where the cosmic pot of nectar fell, the vibration is one of absolute abundance and the cycles of time. A visit here is believed to grant the devotee the same rejuvenation that the universe experiences after a deluge. The air is always vibrant with the sound of the Kaveri and the chanting of both Shaivite and Vaishnavite hymns, as both traditions coexist in perfect harmony here.",
        "longDescription": "Kumbakonam has a history dating back to the Sangam era. Legend says that at the end of the Pralaya (cosmic deluge), Lord Brahma placed the seeds of creation and the nectar of immortality in a pot (Kumbha) and let it float. Shiva, as a hunter (Kirata), broke the pot with an arrow at this spot, and the nectar flowed into the Mahamaham tank. The city is home to several massive temples, including the Sarangapani temple (Vaishnavite) and the Kumbheswarar temple (Shaivite). Kumbakonam is also the hub for the nine Navagraha (planetary) temples, each located in a nearby village. The city is a center for traditional arts, including bronze casting, silk weaving, and Vedic studies. The Mahamaham festival, held once every 12 years, is known as the ''Kumbh Mela of the South,'' where millions gather to bathe in the sacred tank.",
        "spiritualArchitecture": "The architecture of Kumbakonam is a spectacular display of late Chola and Nayak styles. The Sarangapani temple is shaped like a chariot and features a towering 173-foot gopuram. The Mahamaham tank is a massive stepped tank surrounded by 16 small shrines dedicated to various deities and sacred rivers. The temples are known for their intricate carvings, massive stone pillars, and beautiful murals. The city layout is designed around these massive temple complexes, creating a unique urban spiritual landscape.",
        "vedicReferences": "Kumbakonam is celebrated in the works of the Alvars and Nayanars. It is considered one of the holiest sites in South India, specifically mentioned in the Puranas as the site of the cosmic pot.",
        "deepInsights": "The Kumbha (pot) represents the human body, and the nectar represents the soul. Kumbakonam teaches that when the ego is broken (by the Lord''s arrow), the nectar of divine love flows out to bless the world.",
        "ancientLore": "Lore tells that the nine sacred rivers of India (Ganga, Yamuna, etc.) come to the Mahamaham tank once every 12 years to wash away the sins of the devotees. Another legend says that the city was named after the ''corner'' (Konam) of the ''pot'' (Kumbha).",
        "keyRituals": [
                {
                        "name": "Mahamaham Snan",
                        "description": "The ritual bath in the sacred tank during the Mahamaham festival once every 12 years."
                },
                {
                        "name": "Rathotsavam",
                        "description": "The grand chariot festival of the Sarangapani temple, one of the largest in South India."
                },
                {
                        "name": "Navagraha Yatra",
                        "description": "The sacred circuit of visiting the nine planetary temples surrounding the city."
                }
        ],
        "highlights": [
                {
                        "name": "Mahamaham Tank",
                        "description": "The massive sacred tank at the heart of the city''s legends."
                },
                {
                        "name": "Sarangapani Temple",
                        "description": "A magnificent Vaishnavite temple shaped like a divine chariot."
                },
                {
                        "name": "Kumbheswarar Temple",
                        "description": "The primary Shaivite temple dedicated to the Lord of the Pot."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by rail and road from Chennai (270km) and Trichy (90km). Kumbakonam has its own major railway station.",
                "nearestAirport": "Tiruchirappalli International Airport.",
                "nearestRailway": "Kumbakonam Railway Station."
        },
        "tips": [
                "Use Kumbakonam as a base to visit the nine Navagraha temples in the surrounding villages.",
                "Try the famous Kumbakonam Degree Coffee, a local specialty.",
                "Allocate at least 2-3 days to explore the major temples within the city."
        ],
        "faqs": [
                {
                        "question": "When is the next Mahamaham festival?",
                        "answer": "The last one was in 2016; the next grand festival is scheduled for 2028."
                },
                {
                        "question": "What are the Navagraha temples?",
                        "answer": "These are nine temples dedicated to the planetary deities (Sun, Moon, Mars, etc.) located in villages around Kumbakonam."
                },
                {
                        "question": "Is it a vegetarian city?",
                        "answer": "Like most major temple cities in Tamil Nadu, the areas around the temples are strictly vegetarian."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Palani', 
    'palani', 
    'Spiritual City', 
    'tn', 
    'The hill abode of Lord Murugan (Kartikeya), Palani is the site where the Lord resided as a hermit after a divine dispute. It is the center of the Kavadi ritual and one of the Arupadaiveedu (six abodes) of the Tamil God of Youth and Wisdom.', 
    '210.5', 
    '780.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hill of Divine Knowledge and Renunciation', 
    'Palani Murugan Temple | Hill Abode, Kavadi & Ancient Lore', 
    'Discover the spiritual power of Palani. Explore the hill temple of Lord Murugan, the legend of the fruit of wisdom, and the profound traditions of the Kavadi pilgrimage.', 
    'Palani, Murugan, Kartikeya, Tamil Nadu, Hill Temple, Kavadi, Hindu Pilgrimage, Ancient Lore, Arupadaiveedu', 
    '51', 
    '{
        "spiritualEssence": "Palani is the manifestation of the divine as the supreme renunciate (Bhikshatana). The energy here is youthful, powerful, and intensely ascetic. It is the site where Lord Murugan, after losing the race for the fruit of wisdom, renounced his royal life and chose to stay as a hermit (Dhandayuthapani). The vibration is one of simple living and high thinking. As a hill temple, it represents the ascent of the soul to the heights of wisdom. The vibration is one of absolute strength and the conquest of the ego. A visit here is believed to grant the devotee the courage to face the truth and the strength to overcome all obstacles. The air is always vibrant with the sound of the ''Panchamrutam'' bells and the chanting of the ''Kanda Sashti Kavasam''.",
        "longDescription": "The history of Palani is linked to a divine race between Murugan and Ganesha for a mango called the fruit of wisdom. While Murugan flew around the world on his peacock, Ganesha circumambulated his parents, Shiva and Parvati, claiming they were his world. Ganesha won the fruit, and a disappointed Murugan renounced everything and stayed on the Palani hill. The main idol of the Lord is unique, made by the Siddha Bhogar using a secret combination of nine poisonous substances (Navapashanam) that, when mixed, become a powerful medicine. The temple is situated on a hill 450 feet high, accessible by 689 steps or a modern ropeway and winch. Palani is the most famous of the six abodes of Murugan and is a major center for the Kavadi ritual, where devotees carry decorated yokes as an act of penance and gratitude.",
        "spiritualArchitecture": "The temple is built in the Dravidian style on a flattened hilltop. It features a beautiful gopuram and a spacious courtyard with views of the surrounding plains. The inner sanctum houses the unique Navapashanam idol. The temple is known for its discipline and the use of modern technology (ropeways) to assist pilgrims. The steps leading up to the hill are lined with several smaller shrines and resting spots. The architecture reflects the blend of ancient Siddha traditions and royal patronage over the centuries.",
        "vedicReferences": "Palani is celebrated in the Skanda Purana and the ancient Tamil works like Tirumurugatruppadai. It is the third of the six abodes of Murugan.",
        "deepInsights": "The fruit of wisdom represents the realization of the self. Palani teaches that true wisdom is not found in the external world (the race around the globe) but within (the circle around the source).",
        "ancientLore": "Lore tells that the sage Agastya asked his disciple Idumban to carry two hills (Sivagiri and Shaktigiri) to the South. Idumban placed them here, and they became the Palani hills. Another legend says that the Panchamrutam (five sacred substances) offered to the deity never spoils due to the medicinal property of the idol.",
        "keyRituals": [
                {
                        "name": "Kavadi Attam",
                        "description": "The ritual dance of devotees carrying decorated yokes to the hilltop temple."
                },
                {
                        "name": "Thaipusam",
                        "description": "The most important festival where millions gather to celebrate the victory of the Lord."
                },
                {
                        "name": "Panchamrutam Abhishekam",
                        "description": "The ritual bathing of the deity with the famous medicinal five-substance mixture."
                }
        ],
        "highlights": [
                {
                        "name": "Palani Hill",
                        "description": "The sacred hill housing the temple of Lord Dhandayuthapani."
                },
                {
                        "name": "The Navapashanam Idol",
                        "description": "The unique medicinal idol created by the Siddha Bhogar."
                },
                {
                        "name": "Palani Ropeway",
                        "description": "A modern assist for pilgrims offering spectacular views of the landscape."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and during Thaipusam in January/February).",
                "howToReach": "Well connected by road and rail from Coimbatore (105km) and Madurai (120km).",
                "nearestAirport": "Coimbatore International Airport / Madurai Airport.",
                "nearestRailway": "Palani Railway Station."
        },
        "tips": [
                "Take the steps early in the morning to experience the traditional pilgrim route.",
                "Try the famous Palani Panchamrutam, which is the temple''s unique prasadam.",
                "Book ropeway or winch tickets in advance online to avoid long queues."
        ],
        "faqs": [
                {
                        "question": "What is Navapashanam?",
                        "answer": "It is a secret blend of nine medicinal and poisonous substances created by the sage Bhogar to make a durable and healing idol."
                },
                {
                        "question": "How many steps to the temple?",
                        "answer": "There are approximately 689 steps to reach the hilltop shrine."
                },
                {
                        "question": "Why do people carry Kavadi?",
                        "answer": "It is a form of penance and an offering of gratitude to Lord Murugan for fulfilling their prayers."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Guruvayur', 
    'guruvayur', 
    'Sacred Destination', 
    'kl', 
    'Known as the ''Bhuloka Vaikuntha'' (Vaikuntha on Earth), Guruvayur is the home of Lord Krishna in his four-armed form as Guruvayurappan. It is one of the most sacred sites in Kerala, famous for its strict adherence to ancient rituals and its massive elephant sanctuary.', 
    '165.5', 
    '620.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Vaikuntha of the Southern Lands', 
    'Guruvayur Krishna Temple | Kerala, Guruvayurappan & Ancient Lore', 
    'Experience the divine vibration of Guruvayur. Discover the legend of Guru and Vayu, the unique temple rituals, and the majestic Punnathur Kotta elephant sanctuary.', 
    'Guruvayur, Krishna, Kerala, Guruvayurappan, Hindu Pilgrimage, Ancient Lore, Elephant, Narayaneeyam', 
    '52', 
    '{
        "spiritualEssence": "Guruvayur is the manifestation of the divine as the child-god who is also the master of the universe. The energy here is serene, disciplined, and intensely devotional. It is the site where the absolute consciousness (Vishnu) resides in its most charming form. The vibration is one of absolute purity and the healing of both body and mind. As the site where Guru (Jupiter) and Vayu (Wind) installed the idol, the vibration is one of cosmic balance. A visit here is believed to grant the devotee the same joy and protection that the people of Dwarka received from Krishna. The air is always vibrant with the sound of the Chenda drums and the chanting of the Narayaneeyam.",
        "longDescription": "The history of Guruvayur is linked to the end of the Dwapara Yuga. When Dwarka was being submerged, Krishna asked Uddhava to save his idol. Guru and Vayu found the idol and installed it in this spot in Kerala, hence the name Guru-Vayu-Ur. The main idol is made of Patala Anjana stone and depicts Vishnu with four arms holding the conch, discus, mace, and lotus. The temple is famous for its strict code of conduct and the use of the Malayalam calendar for its many festivals. Guruvayur is also known for its association with the great poet Narayana Bhattathiri, who was cured of paralysis here and composed the masterpiece Narayaneeyam. The temple manages the Punnathur Kotta, a palace housing over 60 elephants dedicated to the service of the Lord.",
        "spiritualArchitecture": "The temple is built in the classic Kerala style with tiled roofs, wooden carvings, and a copper-plated sanctum. The architecture is intimate and human-scaled, unlike the massive gopurams of Tamil Nadu. The temple features a massive gold-plated flagstaff (Deepastambham) which is lit with thousands of oil lamps every evening. The inner sanctum (Sri Kovil) is a square structure with a conical roof. The temple complex includes several halls (Mandapams) and a sacred tank called the Rudrathirtha.",
        "vedicReferences": "Guruvayur is celebrated in the Narayaneeyam and various Kerala Puranic traditions. It is considered one of the five primary Krishna temples in India.",
        "deepInsights": "The four arms of the Lord represent the four directions and his all-pervading nature. Guruvayur teaches that the divine can be approached with the simplicity of a child and the devotion of a sage.",
        "ancientLore": "Lore tells that Lord Shiva himself performed penance in the Rudrathirtha tank of the temple. Another legend says that the elephant Gajarajan Guruvayur Keshavan was so devoted that he died facing the temple on the day of Ekadashi.",
        "keyRituals": [
                {
                        "name": "Nirmalyam",
                        "description": "The earliest morning darshan where the Lord is seen in his natural state before the abhishekam."
                },
                {
                        "name": "Udayastamana Puja",
                        "description": "The special full-day ritual consisting of 15-21 separate pujas performed for the Lord."
                },
                {
                        "name": "Elephant Procession (Seeveli)",
                        "description": "The daily ritual where the Lord''s image is carried on a majestic elephant around the temple."
                }
        ],
        "highlights": [
                {
                        "name": "Punnathur Kotta",
                        "description": "The unique elephant sanctuary housing over 60 temple elephants."
                },
                {
                        "name": "Rudrathirtha",
                        "description": "The sacred temple tank associated with Lord Shiva."
                },
                {
                        "name": "Mammiyoor Temple",
                        "description": "The nearby Shiva temple which is traditionally visited after Guruvayur."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "30km from Thrissur, well connected by road and rail. Guruvayur has its own railway station.",
                "nearestAirport": "Kochi International Airport (approx 80km).",
                "nearestRailway": "Guruvayur Railway Station / Thrissur Junction."
        },
        "tips": [
                "Follow the strict dress code: Men must wear a Mundu (Dhoti) and be bare-chested; women should wear a Saree or long skirt.",
                "Mobile phones and cameras are strictly prohibited inside the temple premises.",
                "Arrive very early (before 3 AM) if you wish to see the Nirmalyam darshan."
        ],
        "faqs": [
                {
                        "question": "Can non-Hindus enter the temple?",
                        "answer": "As per current temple traditions, entry is restricted to Hindus only."
                },
                {
                        "question": "What is the Punnathur Kotta?",
                        "answer": "It is a massive elephant sanctuary located 3km from the temple, where the temple''s many elephants are cared for."
                },
                {
                        "question": "Is there a long wait for Darshan?",
                        "answer": "On busy days and weekends, the wait can be 3-5 hours; on normal days, it is about 1-2 hours."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Sabarimala', 
    'sabarimala', 
    'Sacred Destination', 
    'kl', 
    'Located in the heart of the Periyar Tiger Reserve, Sabarimala is the abode of Lord Ayyappa. It is one of the world''s largest pilgrimage sites, where millions of devotees perform 41 days of penance to climb the 18 sacred gold-plated steps.', 
    '180.2', 
    '680.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mountain Abode of the Son of Shiva and Mohini', 
    'Sabarimala Ayyappa Temple | Western Ghats, 18 Steps & Ancient Lore', 
    'Experience the intense devotion of Sabarimala. Discover the legend of Ayyappa, the 41-day Vratam, and the profound mystery of the Makaravilakku light.', 
    'Sabarimala, Ayyappa, Kerala, Western Ghats, Hindu Pilgrimage, Ancient Lore, 18 Steps, Vratam, Makaravilakku', 
    '53', 
    '{
        "spiritualEssence": "Sabarimala is the manifestation of the divine as the supreme celibate and protector. The energy here is intense, heroic, and deeply transformative. It is the site where the seeker becomes the divine (Tat Tvam Asi). The vibration is one of absolute equality, where every devotee is called ''Ayyappa''. As a forest shrine, it represents the journey through the wilderness of the mind to reach the peaks of consciousness. The vibration is one of discipline and the conquest of the senses. A visit here is believed to grant the devotee the strength to overcome all internal and external enemies. The air is always vibrant with the sound of the forest and the thunderous chanting of ''Swamiye Saranam Ayyappa''.",
        "longDescription": "The history of Sabarimala is linked to Lord Ayyappa, the son of Shiva and Mohini (Vishnu). He took birth to defeat the demoness Mahishi and later chose to stay on the Sabari hill to bless his devotees. The temple is famous for its 18 sacred steps (Pathinettampadi), representing the five senses, eight emotions, three qualities (gunas), vidya (knowledge), and avidya (ignorance). Devotees must undergo a 41-day period of strict penance (Vratam) involving celibacy, vegetarianism, and wearing black clothes before embarking on the trek through the dense forests of the Western Ghats. The pilgrimage culminates during the Mandala Puja and the Makaravilakku, when a miraculous celestial light is said to appear on a distant hill.",
        "spiritualArchitecture": "The temple is a simple but powerful structure built in the Kerala style with a gold-plated roof. The most striking feature is the 18 gold-plated steps leading to the sanctum. The temple is situated on a plateau at an altitude of 1500 feet, surrounded by 18 hills. The complex includes shrines dedicated to the Goddess Malikappurathamma and the Muslim saint Vavar, symbolizing communal harmony. The architecture is designed to manage millions of pilgrims who trek up the Pamba river valley to reach the Lord.",
        "vedicReferences": "Sabarimala is celebrated in various Kerala Puranic traditions and is considered the primary site for the Ayyappa cult, which blends Shaivite, Vaishnavite, and tribal traditions.",
        "deepInsights": "The 18 steps represent the stages of spiritual evolution. Sabarimala teaches that the divine is not separate from the devotee, as expressed in the Mahavakya ''Tat Tvam Asi'' (That Thou Art) inscribed on the temple.",
        "ancientLore": "Lore tells that the Goddess Sabari, an ancient seeker from the Ramayana, performed penance here, and the hill is named after her. Another legend says that Ayyappa himself designed the 18 steps to signify the path to liberation.",
        "keyRituals": [
                {
                        "name": "Irumudikettu",
                        "description": "The sacred two-compartment bag carried by devotees, containing offerings for the Lord and travel supplies."
                },
                {
                        "name": "Pamba Snanam",
                        "description": "The ritual bath in the sacred Pamba river before starting the final trek."
                },
                {
                        "name": "Makaravilakku Darshan",
                        "description": "Witnessing the divine light on the hill of Ponnambalamedu on the day of Makara Sankranti."
                }
        ],
        "highlights": [
                {
                        "name": "The 18 Sacred Steps",
                        "description": "The gold-plated steps that represent the victory over the senses and qualities."
                },
                {
                        "name": "Pamba River",
                        "description": "The sacred river flowing at the foot of the hill, known as the Dakshina Ganga."
                },
                {
                        "name": "Vavar Shrine",
                        "description": "A shrine dedicated to Ayyappa''s Muslim companion, a symbol of universal brotherhood."
                }
        ],
        "travelInfo": {
                "bestTime": "November to January (during the Mandala season).",
                "howToReach": "Well connected by road from Kottayam (120km) and Kochi. The nearest railway station is Chengannur or Kottayam.",
                "nearestAirport": "Kochi International Airport / Trivandrum Airport.",
                "nearestRailway": "Chengannur Railway Station / Kottayam Railway Station."
        },
        "tips": [
                "Complete the 41-day Vratam with sincerity to fully experience the spiritual power of the pilgrimage.",
                "Be prepared for a strenuous trek and carry minimal supplies in your Irumudikettu.",
                "Follow the virtual queue booking system introduced by the Kerala police for a smoother Darshan."
        ],
        "faqs": [
                {
                        "question": "Who can climb the 18 steps?",
                        "answer": "Only those devotees who carry the Irumudikettu and have completed the 41-day Vratam are allowed to climb the 18 steps."
                },
                {
                        "question": "What is the age limit for women?",
                        "answer": "Traditionally, women between the ages of 10 and 50 were restricted; this remains a subject of legal and social discussion; check current local updates."
                },
                {
                        "question": "How long is the trek?",
                        "answer": "The main trek from Pamba to the hilltop temple is about 4-5 kilometers of steep incline."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Murudeshwar', 
    'murudeshwar', 
    'Sacred Destination', 
    'ka', 
    'Home to the world''s second tallest Shiva statue, Murudeshwar is a coastal spiritual marvel. Located on the Kanduka Hill surrounded by the Arabian Sea on three sides, it is the site where a piece of the Atma Lingam fell during Ravana''s journey.', 
    '145.5', 
    '520.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Majestic Guardian of the Western Coast', 
    'Murudeshwar | Tallest Shiva Statue, Atma Lingam & Ocean Lore', 
    'Discover the spiritual grandeur of Murudeshwar. Explore the 123-foot Shiva statue, the towering Rajagopuram, and the legend of the Atma Lingam.', 
    'Murudeshwar, Shiva Statue, Karnataka, Atma Lingam, Gokarna, Hindu Pilgrimage, Ancient Lore, Arabian Sea', 
    '54', 
    '{
        "spiritualEssence": "Murudeshwar is the manifestation of the divine as the infinite guardian. The energy here is vast, oceanic, and incredibly grand. It is the site where the sacred Atma Lingam was partially shattered, signifying that the divine remains whole even when fragmented. The vibration is one of absolute majesty and the protection of the coastal lands. The 123-foot Shiva statue, seen against the backdrop of the sapphire sea, is a visual metaphor for the cosmic presence. A visit here is believed to grant the devotee the broad vision of the ocean and the stillness of the mountain. The air is always vibrant with the sound of the waves and the chanting of the Shiva Sahasranama.",
        "longDescription": "The history of Murudeshwar is linked to the legend of the Atma Lingam from Gokarna. When Ravana failed to carry the lingam to Lanka, he tried to destroy it in anger. The cloth covering the lingam fell at Murudeshwar, hence the name. The temple is an ancient one, but it has been transformed into a modern architectural marvel by the philanthropist R.N. Shetty. The 123-foot tall Shiva statue is the world''s second tallest and is designed to withstand the coastal winds. The temple entrance features a 20-storied Rajagopuram, 237 feet tall, equipped with a lift that takes pilgrims to the top for a breathtaking view of the statue and the sea. Murudeshwar is a unique site where modern engineering serves ancient devotion, creating one of India''s most photographed spiritual landmarks.",
        "spiritualArchitecture": "The temple is a blend of ancient stone architecture and modern reinforced concrete engineering. The Rajagopuram is a massive Dravidian-style tower with intricate carvings. The 123-foot Shiva statue is the focal point, surrounded by other smaller statues depicting scenes from the Ramayana. The main temple is built of granite and features a beautiful inner sanctum housing the Murudeshwar Lingam. The complex is situated on a hill projecting into the sea, providing a 270-degree view of the Arabian Sea.",
        "vedicReferences": "Murudeshwar is mentioned in the Skanda Purana as part of the sacred Sahyadri range and is linked to the primary Atma Lingam legends of Gokarna.",
        "deepInsights": "The massive statue represents the ''Vishwa Roopa'' (universal form) of Shiva. Murudeshwar teaches that the divine is larger than any material obstacle and remains steady like a rock amidst the waves of life.",
        "ancientLore": "Lore tells that the piece of the Atma Lingam that fell here was the cloth covering (Vastra) of the divine stone. Another legend says that the site was originally used by great sages for coastal penance to protect the land from the sea.",
        "keyRituals": [
                {
                        "name": "Lingabhishek",
                        "description": "The ritual bathing of the Murudeshwar Lingam with sacred liquids."
                },
                {
                        "name": "Mahashivratri",
                        "description": "The most important festival where the entire temple and the statue are illuminated."
                },
                {
                        "name": "Deepotsava",
                        "description": "The festival of lamps where thousands of oil lamps are lit around the temple complex."
                }
        ],
        "highlights": [
                {
                        "name": "123-foot Shiva Statue",
                        "description": "The towering landmark of the city and the second tallest Shiva statue in the world."
                },
                {
                        "name": "Rajagopuram Lift",
                        "description": "A unique lift taking visitors to the top of the 237-foot tower for a panoramic view."
                },
                {
                        "name": "Murudeshwar Beach",
                        "description": "A beautiful beach surrounding the temple hill."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road from Mangalore (160km) and Goa. Murudeshwar has its own railway station on the Konkan line.",
                "nearestAirport": "Mangalore International Airport / Goa Airport.",
                "nearestRailway": "Murudeshwar Railway Station."
        },
        "tips": [
                "Arrive at sunset for the most spectacular views of the Shiva statue against the changing colors of the sky.",
                "Take the lift to the top of the Rajagopuram for the best photography spot.",
                "Respect the temple decorum and avoid wearing shorts or sleeveless tops."
        ],
        "faqs": [
                {
                        "question": "How tall is the Shiva statue?",
                        "answer": "The statue is 123 feet (37 meters) tall."
                },
                {
                        "question": "Is it the tallest in the world?",
                        "answer": "It was for a long time, but it is currently the second tallest (after the one in Nepal)."
                },
                {
                        "question": "How far is it from Gokarna?",
                        "answer": "It is about 80 kilometers (1.5 to 2 hours) by road from Gokarna."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Gokarna', 
    'gokarna', 
    'Spiritual City', 
    'ka', 
    'Known as the ''Kashi of the South,'' Gokarna is the site of the original Atma Lingam given by Shiva to Ravana. Located on the pristine coast of Karnataka, it is a city where the mountains of the Western Ghats meet the Arabian Sea in the shape of an ear (Gokarna).', 
    '140.2', 
    '500.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Ear of the Divine Earth', 
    'Gokarna Mahabaleshwar | Atma Lingam, Kashi of South & Ancient Lore', 
    'Discover the mystical power of Gokarna. Explore the Mahabaleshwar temple, the legend of the Atma Lingam, and the unique geography of this coastal spiritual city.', 
    'Gokarna, Mahabaleshwar, Karnataka, Atma Lingam, Lord Shiva, Hindu Pilgrimage, Ancient Lore, Kashi of South, Beach', 
    '55', 
    '{
        "spiritualEssence": "Gokarna is the manifestation of the divine as the unshakeable truth. The energy here is ancient, mystical, and deeply connected to the elements. It is the site of the Atma Lingam—the soul-stone of the Lord. The vibration is one of absolute power and the inability of the ego (Ravana) to control the divine. As the site where the earth took the shape of a cow''s ear, the vibration is one of listening and receptivity to the cosmic sound. A visit here is believed to grant the devotee the same merit as a visit to Kashi. The air is always vibrant with the sound of the ocean and the chanting of the Rudram in the traditional Gokarna style.",
        "longDescription": "The history of Gokarna is centered on the legend of Ravana, who performed penance to get the Atma Lingam for his mother. Shiva gave it with the condition that it should never be placed on the ground. Through divine play, Ganesha appeared as a boy and placed it on the ground at Gokarna, where it became fixed as Mahabaleshwar. The temple is one of the most sacred sites for Shaivites and is a major center for ancestral rites. Gokarna is also unique for its geography, featuring four pristine beaches (Om, Kudle, Half Moon, Paradise) that attract both spiritual seekers and travelers. The city is a major center for Sanskrit learning and Vedic ritual, maintaining a tradition that dates back thousands of years.",
        "spiritualArchitecture": "The Mahabaleshwar temple is built in the traditional Dravidian style using granite. The inner sanctum houses the Atma Lingam, which is kept in a square pit and is visible only partially. The temple features a beautiful carved ceiling and several smaller shrines dedicated to Ganesha and the Goddess. The city layout is traditional, with narrow stone-paved streets and ancient houses (Havelis). The temple of Maha Ganapati, who saved the lingam, is also an important architectural and spiritual site.",
        "vedicReferences": "Gokarna is mentioned in the Ramayana, the Mahabharata, and the Skanda Purana. It is considered one of the seven Mukti Sthalas (places of liberation) of Karnataka.",
        "deepInsights": "The Atma Lingam represents the true self that cannot be moved or owned by the ego. Gokarna teaches that the divine is always fixed in its truth, no matter how much we try to manipulate it for our own ends.",
        "ancientLore": "Lore tells that when Ravana tried to pull the lingam out of the ground, he exerted so much force that the stone took the shape of a cow''s ear. Another legend says that the site is the place where the earth (Prithvi) took refuge when it was troubled by the demons.",
        "keyRituals": [
                {
                        "name": "Atma Lingam Darshan",
                        "description": "Touching and worshipping the sacred stone, believed to be the soul of Lord Shiva."
                },
                {
                        "name": "Pitri Karma",
                        "description": "Performing ancestral rites on the banks of the Kotiteertha tank."
                },
                {
                        "name": "Mahashivratri Rath Yatra",
                        "description": "The grand chariot festival where the entire city gathers to pull the massive temple cars."
                }
        ],
        "highlights": [
                {
                        "name": "Mahabaleshwar Temple",
                        "description": "The ancient temple housing the Atma Lingam."
                },
                {
                        "name": "Kotiteertha",
                        "description": "The massive sacred tank where pilgrims take a ritual dip."
                },
                {
                        "name": "Om Beach",
                        "description": "A naturally occurring beach in the shape of the sacred symbol ''Om''."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road from Goa (140km) and Mangalore. Gokarna has its own railway station (Gokarna Road) on the Konkan line.",
                "nearestAirport": "Goa International Airport (Dabolim).",
                "nearestRailway": "Gokarna Road Railway Station."
        },
        "tips": [
                "Visit the Maha Ganapati temple first before going to the Mahabaleshwar temple, as per tradition.",
                "Hire a local priest if you wish to perform specific rituals or ancestral rites.",
                "The temple is strictly traditional; follow the dress code (Dhoti for men, Saree for women)."
        ],
        "faqs": [
                {
                        "question": "What is the Atma Lingam?",
                        "answer": "It is believed to be the very soul of Lord Shiva, given to Ravana and later fixed at Gokarna."
                },
                {
                        "question": "Can I touch the lingam?",
                        "answer": "Yes, unlike many other major temples, devotees are allowed to enter the inner sanctum and touch the Atma Lingam during specific hours."
                },
                {
                        "question": "Is Gokarna good for trekking?",
                        "answer": "Yes, the ''Beach Trek'' connecting the four main beaches is one of the most beautiful coastal treks in India."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Ahobilam', 
    'ahobilam', 
    'Sacred Destination', 
    'ap', 
    'Located in the Nallamala forests, Ahobilam is the site where Lord Narasimha emerged from the pillar to protect Prahlad. It is the only site in the world with nine temples dedicated to the nine forms of the Lion-God (Nava Narasimha).', 
    '235.2', 
    '580.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Seat of the Lion-God Narasimha', 
    'Ahobilam | Nava Narasimha, Nallamala Forest & Ancient Lore', 
    'Experience the raw spiritual power of Ahobilam. Discover the nine Narasimha temples, the legendary Ugra Stambham, and the profound secrets of the Nallamala forests.', 
    'Ahobilam, Narasimha, Andhra Pradesh, Nallamala, Nava Narasimha, Lord Vishnu, Hindu Pilgrimage, Ancient Lore, Prahlad', 
    '56', 
    '{
        "spiritualEssence": "Ahobilam is the manifestation of the divine as the fierce protector and the destroyer of ego. The energy here is intense, primal, and deeply liberating. It is the site where the column of light and power (Narasimha) shattered the material pillars of ignorance. The vibration is one of absolute courage and the protection of the innocent. As the Nava Narasimha Kshethram, it represents the nine aspects of the Lord''s power. A visit here is believed to grant the devotee the strength to face any internal or external demon. The air is always vibrant with the sound of the forest and the chanting of the ''Narasimha Kavacham''. It is a site of pure, untamed spiritual energy.",
        "longDescription": "The history of Ahobilam is centered on the Narasimha Avatar. The name comes from ''Aho Bilam'' (What a cave!) or ''Aho Balam'' (What strength!). The site is divided into Upper and Lower Ahobilam. The Nallamala forest is believed to be the body of Adisesha, with Ahobilam as the navel. The nine temples are spread across the hills and can only be reached by trekking through the dense forest. The most sacred spot is the Ugra Stambham—the pillar from which the Lord emerged. Ahobilam has been patronized by the Chalukyas and the Vijayanagara Empire. It is also the site where the great saint Adi Shankaracharya composed the ''Lakshmi Narasimha Karavalamba Stotram'' when he was attacked by a demon in these very forests.",
        "spiritualArchitecture": "The temples of Ahobilam are a mix of ancient cave shrines and grand Dravidian stone structures. Lower Ahobilam features a massive temple complex with intricate carvings of the Vijayanagara period. Upper Ahobilam temples are mostly cave shrines situated on steep cliffs. The architecture is rugged and perfectly integrated with the mountain terrain. The Ugra Stambham is a massive natural rock pillar on the highest peak, representing the original site of the Lord''s appearance.",
        "vedicReferences": "Ahobilam is mentioned in the Brahmanda Purana and the Vishnu Purana. It is celebrated as the supreme site for Narasimha worship in South India.",
        "deepInsights": "The emergence of Narasimha from the pillar signifies that the divine is present everywhere, even in inanimate objects. Ahobilam teaches that when devotion is absolute (like Prahlad''s), the divine must manifest to protect it.",
        "ancientLore": "Lore tells that the Garuda performed penance here to see the Narasimha avatar, and the mountains are named Garudachala. Another legend says that the Lord washed his hands in the Bhavanashini river after killing Hiranyakashipu, making its waters red and sacred.",
        "keyRituals": [
                {
                        "name": "Nava Narasimha Yatra",
                        "description": "The sacred trek to visit all nine temples of Narasimha in the forest."
                },
                {
                        "name": "Panchamrut Abhishekam",
                        "description": "The ritual bathing of the cave deities with five sacred substances."
                },
                {
                        "name": "Ahobilam Brahmotsavam",
                        "description": "The grand annual festival celebrated in the month of Phalguna (February/March)."
                }
        ],
        "highlights": [
                {
                        "name": "Ugra Stambham",
                        "description": "The natural rock pillar marking the spot of Narasimha''s appearance."
                },
                {
                        "name": "Lower Ahobilam Temple",
                        "description": "The main administrative temple with spectacular Vijayanagara carvings."
                },
                {
                        "name": "Jwala Narasimha",
                        "description": "The cave temple marking the exact spot where the demon was defeated."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Located in Kurnool district, well connected by road from Nandyal (70km) and Tirupati. The nearest major town is Nandyal.",
                "nearestAirport": "Tirupati Airport / Cuddapah Airport.",
                "nearestRailway": "Nandyal Railway Station."
        },
        "tips": [
                "Be prepared for significant trekking; wear comfortable shoes and carry plenty of water.",
                "Hire a local guide to navigate the forest paths between the nine temples.",
                "Watch out for monkeys and wild animals as the temples are in a reserve forest."
        ],
        "faqs": [
                {
                        "question": "How many Narasimha temples are there?",
                        "answer": "There are nine temples dedicated to the nine forms (Nava Narasimha) of the Lord."
                },
                {
                        "question": "Is the trek difficult?",
                        "answer": "Yes, some of the upper temples (like Jwala and Ugra Stambham) require a strenuous trek over steep and rocky terrain."
                },
                {
                        "question": "Where to stay?",
                        "answer": "There are basic guesthouses run by the Ahobilam Mutt in both Lower and Upper Ahobilam."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Lepakshi', 
    'lepakshi', 
    'Sacred Destination', 
    'ap', 
    'Lepakshi is a marvel of the Vijayanagara Empire, famous for its hanging pillar and the world''s largest monolithic Nandi. It is a site where art, engineering, and spiritual lore meet in the stunning Veerabhadra Temple.', 
    '230.2', 
    '560.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Floating Pillar of Ancient Mystery', 
    'Lepakshi Veerabhadra Temple | Hanging Pillar, Giant Nandi & Lore', 
    'Discover the architectural mysteries of Lepakshi. Explore the hanging pillar, the massive monolithic Nandi, and the profound murals of the Vijayanagara era.', 
    'Lepakshi, Veerabhadra, Andhra Pradesh, Hanging Pillar, Monolithic Nandi, Hindu Pilgrimage, Ancient Lore, Vijayanagara', 
    '57', 
    '{
        "spiritualEssence": "Lepakshi is the manifestation of the divine as the fierce and protective Veerabhadra. The energy here is mysterious, artistic, and deeply evocative. It is a site that challenges the laws of physics. The vibration is one of the strength of the divine word and the protection of the righteous. As the site where the bird Jatayu is said to have fallen, the vibration is also one of supreme sacrifice. A visit here is believed to grant the devotee the clarity of vision and the strength to stand tall in the face of life''s challenges. The air is always vibrant with the scent of old stone and the silent whispers of the masterpieces painted on the ceilings.",
        "longDescription": "Built in the 16th century by the brothers Virupanna and Viranna, the Veerabhadra temple is a supreme example of Vijayanagara style. The temple is famous for its 70 massive stone pillars, one of which—the Hanging Pillar—does not touch the ground, a testament to ancient engineering. The ceilings are covered with world-famous murals depicting scenes from the Mahabharata, Ramayana, and the incarnations of Shiva. A few hundred meters away stands the massive monolithic Nandi, 15 feet high and 27 feet long, carved from a single granite stone. Lepakshi is a site where every stone is a canvas, from the giant Naga Lingam to the footprints of Goddess Sita. It is a place where history feels alive and breathing.",
        "spiritualArchitecture": "The temple is built on a low rocky hill (Kurmasaila), shaped like a tortoise. It features three shrines dedicated to Veerabhadra, Papanasheshvara, and Raghunatha. The architecture is famous for its carved pillars, each unique, and the spectacular fresco paintings on the ceiling. The giant Naga Lingam—a Shiva Lingam protected by a massive seven-hooded serpent—is a masterpiece of monolithic sculpture. The temple layout includes several spacious mandapams and an incomplete open-air hall that adds to its mysterious aura.",
        "vedicReferences": "Lepakshi is linked to the Skanda Purana and is traditionally identified as the spot where Lord Rama spoke to the dying Jatayu, saying ''Le Pakshi'' (Rise, bird).",
        "deepInsights": "The hanging pillar signifies that the world is supported by a divine power that is not visible to the eye. Lepakshi teaches that true art is an offering to the divine.",
        "ancientLore": "Lore tells of the bird Jatayu falling here after his battle with Ravana. Another legend says that the red stains on the temple walls are the eyes of Virupanna, which he plucked out and threw against the wall when he was falsely accused of embezzlement.",
        "keyRituals": [
                {
                        "name": "Veerabhadra Swamy Abhishekam",
                        "description": "The ritual bathing of the fierce main deity with sacred liquids."
                },
                {
                        "name": "Lakshdeepotsavam",
                        "description": "The festival of one lakh lamps celebrated with grand illumination of the temple."
                },
                {
                        "name": "Shravana Masam Puja",
                        "description": "Special rituals performed during the auspicious month of Shravana."
                }
        ],
        "highlights": [
                {
                        "name": "The Hanging Pillar",
                        "description": "A stone pillar that remains suspended from the ceiling without touching the floor."
                },
                {
                        "name": "Monolithic Nandi",
                        "description": "The world''s largest stone bull, located near the temple entrance."
                },
                {
                        "name": "Giant Naga Lingam",
                        "description": "A massive Shiva Lingam sheltered by a seven-hooded stone serpent."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "120km from Bangalore and 15km from Hindupur, well connected by road. Lepakshi is a popular day-trip from Bangalore.",
                "nearestAirport": "Bangalore International Airport.",
                "nearestRailway": "Hindupur Railway Station."
        },
        "tips": [
                "Don''t miss the ceiling murals; they are some of the best-preserved examples of Vijayanagara art.",
                "Check the hanging pillar by sliding a thin piece of paper or cloth underneath it.",
                "Combine your visit with the Nandi statue located just outside the main temple gate."
        ],
        "faqs": [
                {
                        "question": "Does the hanging pillar really hang?",
                        "answer": "Yes, it is slightly detached from the ground, though modern attempts to check it have made it touch the ground at one corner; it still doesn''t bear the weight of the structure."
                },
                {
                        "question": "How old is the temple?",
                        "answer": "The current structure was built in 1530 CE during the reign of the Vijayanagara King Achyuta Deva Raya."
                },
                {
                        "question": "Is there a direct bus from Bangalore?",
                        "answer": "Yes, several APSRTC and KSRTC buses run from Bangalore to Lepakshi or via Hindupur."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Gangotri', 
    'gangotri', 
    'Char Dham', 
    'uk', 
    'The source of the holy river Ganges, Gangotri is where the Goddess Ganga descended to earth to wash away the sins of humanity. Located at an altitude of 3,100 meters in the Uttarkashi district, it is a site of immense purity and cosmic power.', 
    '240.2', 
    '110.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Celestial Descent of the Mother Goddess', 
    'Gangotri Temple | Char Dham, Source of Ganga & Ancient Lore', 
    'Experience the profound purity of Gangotri. Discover the legend of King Bhagiratha, the white granite temple of Ganga, and the trek to the Gaumukh glacier.', 
    'Gangotri, Char Dham, Uttarakhand, Ganges, Bhagiratha, Gaumukh, Hindu Pilgrimage, Ancient Lore, Himalayas', 
    '58', 
    '{
        "spiritualEssence": "Gangotri is the manifestation of the divine as the flow of life and purification. The energy here is ethereal, cold, and intensely clear. It is the site where the celestial Ganga first touched the earth. The vibration is one of absolute surrender and the washing away of the heavy burdens of the past. As the source of the river that sustains millions, the vibration is one of maternal grace and infinite abundance. A visit here is believed to purify the soul for seven generations. The air is always vibrant with the sound of the crashing Bhagirathi river and the silent majesty of the snow-capped peaks.",
        "longDescription": "The history of Gangotri is centered on the epic penance of King Bhagiratha, who prayed for thousands of years to bring the Ganges to earth to liberate the souls of his ancestors. To break the force of her descent, Lord Shiva caught the river in his matted hair. The white granite temple was built in the 18th century by the Gorkha commander Amar Singh Thapa. The actual source of the river is at Gaumukh (the cow''s mouth), located 19km further up the glacier. The temple remains closed for six months during the winter, when the Goddess is moved to the village of Mukhba. Gangotri is a site of extreme physical and spiritual challenge, attracting both devout pilgrims and mountain explorers from across the globe.",
        "spiritualArchitecture": "The temple is a simple but elegant structure made of white granite, designed to withstand the harsh Himalayan winters. It features a central spire and a small courtyard. The architecture is human-scaled, respecting the overwhelming scale of the surrounding mountains. The temple is situated on the right bank of the Bhagirathi river. The interior is small and intense, housing the silver idol of the Goddess Ganga. The complex includes several smaller shrines and resting spots for pilgrims.",
        "vedicReferences": "Gangotri is extensively documented in the Skanda Purana and the Mahabharata. It is hailed as one of the four essential Char Dham sites of the North.",
        "deepInsights": "The descent of the Ganges represents the flow of consciousness into the material world. Gangotri teaches that even the most celestial energy must find a grounding (Shiva''s matted hair) to be beneficial to the world.",
        "ancientLore": "Lore tells that the rock where King Bhagiratha meditated, the Bhagiratha Shila, is still visible near the temple. Another legend says that the river was named Bhagirathi until it reaches Devprayag, in honor of the king who brought it down.",
        "keyRituals": [
                {
                        "name": "Ganga Aarti",
                        "description": "The beautiful evening ritual of lamps performed on the banks of the Bhagirathi."
                },
                {
                        "name": "Snana (Holy Dip)",
                        "description": "Taking a ritual bath in the freezing waters of the river to purify the soul."
                },
                {
                        "name": "Mukhba Transfer",
                        "description": "The ceremonial procession carrying the Goddess to her winter abode in October/November."
                }
        ],
        "highlights": [
                {
                        "name": "Gangotri Temple",
                        "description": "The 18th-century white granite shrine dedicated to the Goddess Ganga."
                },
                {
                        "name": "Gaumukh Glacier",
                        "description": "The actual source of the Ganges, located a 19km trek from the temple."
                },
                {
                        "name": "Bhagiratha Shila",
                        "description": "The sacred rock where King Bhagiratha is said to have performed his penance."
                }
        ],
        "travelInfo": {
                "bestTime": "May to June and September to October.",
                "howToReach": "Well connected by road from Rishikesh (270km). The nearest airport is Dehradun.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station / Haridwar."
        },
        "tips": [
                "Acclimatize yourself for a day in Uttarkashi or Harsil before reaching Gangotri.",
                "Carry heavy woollens even in the summer as the temperature can drop significantly at night.",
                "Obtain necessary permits if you plan to trek to Gaumukh."
        ],
        "faqs": [
                {
                        "question": "How far is the Gaumukh trek?",
                        "answer": "It is a 19km trek one way from the Gangotri temple and usually takes 2 days with an overnight stay at Bhojbasa."
                },
                {
                        "question": "When does the temple open?",
                        "answer": "The temple opens annually on the auspicious day of Akshaya Tritiya (April/May)."
                },
                {
                        "question": "Is there a direct bus from Delhi?",
                        "answer": "There are buses from Delhi to Rishikesh/Haridwar, from where you need to take local buses or taxis to Gangotri."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Yamunotri', 
    'yamunotri', 
    'Char Dham', 
    'uk', 
    'The source of the river Yamuna, Yamunotri is the first stop on the Char Dham yatra. Located at an altitude of 3,293 meters, it is a site of healing and renewal, where the sacred river emerges from the Kalind mountain.', 
    '225.5', 
    '115.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Source of the Daughter of the Sun', 
    'Yamunotri Temple | Char Dham, Source of Yamuna & Ancient Lore', 
    'Discover the spiritual power of Yamunotri. Explore the legend of Goddess Yamuna, the hot water springs of Surya Kund, and the challenging trek through the Himalayas.', 
    'Yamunotri, Char Dham, Uttarakhand, Yamuna, Surya Kund, Hindu Pilgrimage, Ancient Lore, Himalayas', 
    '59', 
    '{
        "spiritualEssence": "Yamunotri is the manifestation of the divine as the energy of life and resilience. The energy here is grounding, warm, and deeply transformative. As the daughter of the Sun (Surya) and the sister of the God of Death (Yama), the vibration is one of the protection from untimely death. The presence of hot springs (Surya Kund) in the middle of the freezing mountains is a visual metaphor for the warmth of the divine heart. A visit here is believed to free the devotee from the fear of death. The air is always vibrant with the steam of the springs and the scent of the sacred offerings of rice and potatoes cooked in the thermal waters.",
        "longDescription": "The history of Yamunotri is linked to the sage Asit Muni, who lived here and bathed in both the Ganga and the Yamuna. In his old age, when he could no longer travel to Gangotri, a stream of the Ganges emerged beside the Yamuna to bless him. The current temple was built by Maharani Gularia of Jaipur in the 19th century and has been rebuilt several times due to damage from snow and earthquakes. The temple houses a silver idol of the Goddess Yamuna. The unique feature of Yamunotri is the Surya Kund, a hot water spring where pilgrims cook rice and potatoes as an offering (Prasadam). The trek to the temple from Janki Chatti is a 6km steep climb that tests the physical and spiritual endurance of the pilgrims.",
        "spiritualArchitecture": "The temple is a sturdy structure built in the Pahari style with a wooden facade and a stone base. It features a beautiful silver-plated door. The temple is situated on the left bank of the Yamuna. The complex includes the Surya Kund (hot spring) and the Gauri Kund (temperate spring) for ritual bathing. The architecture is designed to be functional and resilient against the heavy snowfall and natural calamities of the region.",
        "vedicReferences": "Yamunotri is mentioned in the Rig Veda and various Puranas as the sacred source of the river that flows through the heart of India.",
        "deepInsights": "Yamuna represents the heart and the emotional energy. Yamunotri teaches that even in the coldest and most difficult parts of our journey, the divine provides the warmth (Surya Kund) needed to survive and thrive.",
        "ancientLore": "Lore tells that a bath in the Yamuna at its source ensures that the devotee will not be troubled by the messengers of Yama. Another legend says that the river Yamuna was named after the Kalind mountain from which it emerges, hence its name Kalindi.",
        "keyRituals": [
                {
                        "name": "Surya Kund Offering",
                        "description": "Cooking rice or potatoes in the boiling water of the spring and offering it to the Goddess."
                },
                {
                        "name": "Yamuna Aarti",
                        "description": "The morning and evening rituals of lamps performed by the river."
                },
                {
                        "name": "Dhwaja Arohan",
                        "description": "The ceremonial changing of the temple flag at the start of the season."
                }
        ],
        "highlights": [
                {
                        "name": "Surya Kund",
                        "description": "The natural hot water spring with temperatures reaching 190°F."
                },
                {
                        "name": "Divya Shila",
                        "description": "A sacred rock that is worshipped before entering the temple."
                },
                {
                        "name": "Saptrishi Kund",
                        "description": "A high-altitude glacial lake located 10km further up from the temple."
                }
        ],
        "travelInfo": {
                "bestTime": "May to June and September to October.",
                "howToReach": "Well connected by road from Rishikesh to Janki Chatti, followed by a 6km trek.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh / Dehradun."
        },
        "tips": [
                "Start your trek from Janki Chatti early in the morning to avoid the afternoon sun.",
                "Horses and palanquins are available for those who cannot trek the 6km climb.",
                "Be prepared for very basic facilities at the temple site."
        ],
        "faqs": [
                {
                        "question": "How difficult is the Yamunotri trek?",
                        "answer": "The trek is 6km long and quite steep, but it is well-paved and manageable for most people of average fitness."
                },
                {
                        "question": "Can we cook food in Surya Kund?",
                        "answer": "Yes, devotees traditionally cook rice and potatoes in small bags in the boiling water as an offering."
                },
                {
                        "question": "Is there a place to stay at the temple?",
                        "answer": "There are very basic dharamshalas; most pilgrims prefer to stay at Janki Chatti."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Kalahasti (Sri Kalahasteeswara)', 
    'kalahasti', 
    'Spiritual City', 
    'ap', 
    'Known as the ''Kashi of the South,'' Sri Kalahasteeswara temple is the site of the ''Vayu'' (Wind) Lingam. Located on the banks of the Swarnamukhi river near Tirupati, it is a site of immense energy where the lamp in the inner sanctum is said to flicker constantly without any wind.', 
    '235.5', 
    '525.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Eternal Breath of the Divine Lord', 
    'Sri Kalahasteeswara Temple | Vayu Lingam, Rahu Ketu Puja & Lore', 
    'Discover the spiritual power of Kalahasti. Explore the Vayu Lingam, the legend of the spider, snake, and elephant, and the profound Rahu-Ketu Sarpa Dosha rituals.', 
    'Kalahasti, Vayu Lingam, Andhra Pradesh, Lord Shiva, Rahu Ketu, Hindu Pilgrimage, Ancient Lore, Tirupati', 
    '60', 
    '{
        "spiritualEssence": "Kalahasti is the manifestation of the divine as the cosmic breath (Vayu). The energy here is dynamic, invisible, and intensely liberating. It is the site where the absolute consciousness (Shiva) resides as the element of wind. The vibration is one of movement and the removal of blockages. As the site where a spider (Kala), a snake (Hasti), and an elephant (Hala) worshipped the Lord, the vibration is one of universal inclusion. A visit here is believed to grant the devotee the same freedom that the wind enjoys. The air is always vibrant with the sound of the Swarnamukhi river and the constant flickering of the sacred lamp in the windless sanctum.",
        "longDescription": "The history of Kalahasti dates back to the Pallava and Chola periods, with the current massive structure built by the Vijayanagara King Krishnadevaraya in the 16th century. The temple is unique as it is one of the few sites where the Rahu-Ketu Sarpa Dosha puja is performed to balance planetary influences. The name Kalahasti is derived from three animals: the spider (Kala) who spun a web over the lingam, the snake (Hasti) who placed a gem on it, and the elephant (Hala) who washed it with water. The Lord granted all three salvation. The temple is also associated with the legendary devotee Kannappa Nayanar, who offered his own eyes to the Lord. Kalahasti is a site of architectural grandeur, with its massive white gopurams and the temple being partially carved into the side of a hill.",
        "spiritualArchitecture": "The temple is a masterpiece of Dravidian and Vijayanagara architecture. It features a massive 120-foot tall Rajagopuram and several internal mandapams with thousands of carved pillars. The inner sanctum is a small, quiet space where the Vayu Lingam resides. A unique feature is that the priests do not touch the lingam during worship. The temple is situated between two hills, with the river Swarnamukhi flowing beside it. The architecture is designed to capture the natural flow of the energy from the mountains and the river.",
        "vedicReferences": "Kalahasti is celebrated in the Tevaram and various Puranic traditions. It is considered one of the five primary elemental (Pancha Bhoota) temples of Shiva.",
        "deepInsights": "The wind represents the mind and the life-force (Prana). Kalahasti teaches that when the mind is offered to the divine, it becomes as free and all-pervading as the wind.",
        "ancientLore": "Lore tells of the lamp in the sanctum that flickers constantly, signifying the presence of the Vayu Lingam. Another legend says that the river Swarnamukhi contains gold particles due to the penance of the sages on its banks.",
        "keyRituals": [
                {
                        "name": "Rahu-Ketu Sarpa Dosha Puja",
                        "description": "The world-famous ritual to alleviate the negative effects of the lunar nodes."
                },
                {
                        "name": "Abhishekam",
                        "description": "The ritual bathing of the Lord, where the priests maintain a distance from the Vayu Lingam."
                },
                {
                        "name": "Mahashivratri",
                        "description": "The grand 10-day festival celebrated with multiple chariot processions."
                }
        ],
        "highlights": [
                {
                        "name": "Vayu Lingam",
                        "description": "The sacred elemental stone representing the wind."
                },
                {
                        "name": "Rajagopuram",
                        "description": "The massive 120-foot tall gateway built by Krishnadevaraya."
                },
                {
                        "name": "Swarnamukhi River",
                        "description": "The sacred river flowing near the temple, associated with many legends."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "35km from Tirupati, well connected by road and rail. Regular buses and taxis are available from Tirupati.",
                "nearestAirport": "Tirupati International Airport.",
                "nearestRailway": "Sri Kalahasti Railway Station / Tirupati Junction."
        },
        "tips": [
                "Combine your visit with the Tirupati Balaji Darshan.",
                "If performing the Rahu-Ketu puja, arrive early as the queues can be long.",
                "Maintain the sanctity of the temple; follow the traditional dress code."
        ],
        "faqs": [
                {
                        "question": "Why does the lamp flicker?",
                        "answer": "It is believed to be the presence of the Vayu (Wind) Lingam; the lamp flickers even when the sanctum is completely sealed from external wind."
                },
                {
                        "question": "How long does the Rahu-Ketu puja take?",
                        "answer": "The ritual itself takes about 30-45 minutes, but the total time including queues can be 2-3 hours."
                },
                {
                        "question": "Is it near Tirupati?",
                        "answer": "Yes, it is about a 45-minute drive from Tirupati, making it a very common pilgrimage combination."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Rockfort Trichy (Uchi Pillayar)', 
    'rockfort-trichy', 
    'Spiritual City', 
    'tn', 
    'Perched on an 83-meter high rock that is one of the oldest in the world, the Uchi Pillayar temple is dedicated to Lord Ganesha. It is a site where history, geology, and spiritual lore meet, offering a panoramic view of the temple city of Trichy.', 
    '230.5', 
    '745.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Guardian on the Ancient Stone Throne', 
    'Rockfort Uchi Pillayar | Trichy, Ganesha Lore & Ancient Geology', 
    'Experience the spiritual height of Trichy Rockfort. Discover the Uchi Pillayar temple, the legend of Vibhishana, and the 3.8 billion-year-old rock history.', 
    'Rockfort, Trichy, Uchi Pillayar, Tamil Nadu, Lord Ganesha, Hindu Pilgrimage, Ancient Lore, Geology', 
    '61', 
    '{
        "spiritualEssence": "Rockfort is the manifestation of the divine as the unshakeable foundation and the remover of obstacles. The energy here is high, commanding, and deeply historical. It is the site where Lord Ganesha, in his playful form, outsmarted the demon-king Vibhishana to ensure that the Ranganatha idol stayed in Srirangam. The vibration is one of absolute stability and the overview of life. As one of the oldest rocks in the world, the vibration is one of the timelessness of the spirit. A visit here is believed to grant the devotee the clarity to see their obstacles as mere stepping stones. The air is always vibrant with the sound of the wind at the peak and the bells of the Srirangam temple visible in the distance.",
        "longDescription": "The Rockfort is an 83-meter high rock formation that is estimated to be 3.8 billion years old, making it older than the Himalayas. The Uchi Pillayar temple was built by the Pallavas in the 7th century and later expanded by the Nayaks. According to legend, Lord Ganesha took the form of a young boy and offered to hold the Ranganatha idol for Vibhishana. When he placed it on the ground at Srirangam, a chase ensued, ending on this rock where the boy revealed himself as Ganesha. The complex also includes the Thayumanaswamy temple dedicated to Shiva. The climb involves over 400 stone steps carved into the rock. The fort has seen several battles between the Marathas, the Carnatic Nawabs, and the British, but it remains a primary spiritual landmark of South India.",
        "spiritualArchitecture": "The temple is a masterpiece of rock-cut and Dravidian architecture. It features several cave temples carved by the Pallavas with beautiful relief sculptures. The Uchi Pillayar shrine at the very top is a small, sturdy stone structure. The Thayumanaswamy temple, located halfway up, is larger and features a beautiful gopuram and a spacious hall. The architecture is a testament to the skill of the ancient sculptors who transformed a massive granite rock into a spiritual citadel.",
        "vedicReferences": "Rockfort is mentioned in various Tamil Puranic traditions and is a key site in the legend of the arrival of Ranganatha to Srirangam.",
        "deepInsights": "The climb to the rock represents the effort needed to reach the higher states of consciousness. Uchi Pillayar teaches that the divine is always at the highest point of our own awareness, watching over the world.",
        "ancientLore": "Lore tells that the rock still bears the dent made by Vibhishana when he struck the young boy (Ganesha) in anger. Another legend says that the rock was originally a piece of the Himalayas carried by the wind god Vayu.",
        "keyRituals": [
                {
                        "name": "Vinayaka Chaturthi",
                        "description": "The grand celebration of Ganesha''s birth, where the entire rock is illuminated."
                },
                {
                        "name": "Girivalam",
                        "description": "The ritual circumambulation of the Rockfort hill, performed by thousands of devotees."
                },
                {
                        "name": "Evening Aarti",
                        "description": "The prayer at the peak as the city of Trichy lights up below."
                }
        ],
        "highlights": [
                {
                        "name": "Uchi Pillayar Temple",
                        "description": "The Ganesha shrine at the very peak of the 83-meter rock."
                },
                {
                        "name": "Thayumanaswamy Temple",
                        "description": "The Shiva temple halfway up, known for its unique healing legends."
                },
                {
                        "name": "Pallava Cave Temples",
                        "description": "Ancient 7th-century rock-cut shrines with spectacular sculptures."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Located in the heart of Tiruchirappalli, well connected by air, rail, and road.",
                "nearestAirport": "Tiruchirappalli International Airport.",
                "nearestRailway": "Trichy Fort / Trichy Junction."
        },
        "tips": [
                "Start the climb in the early morning or late evening to avoid the heat of the rock.",
                "Carry water as the climb of 400+ steps can be tiring.",
                "The view of Srirangam from the top is a must-see for every visitor."
        ],
        "faqs": [
                {
                        "question": "How many steps to the top?",
                        "answer": "There are approximately 417-437 stone steps to reach the Uchi Pillayar temple at the peak."
                },
                {
                        "question": "Is it older than the Himalayas?",
                        "answer": "Yes, geologically the rock is about 3.8 billion years old, making it one of the oldest in the world."
                },
                {
                        "question": "Who is Thayumanaswamy?",
                        "answer": "It is a form of Lord Shiva who is said to have taken the form of a mother to help a devotee in labor."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Srirangapatna', 
    'srirangapatna', 
    'Spiritual City', 
    'ka', 
    'Located on an island in the Kaveri river, Srirangapatna is the site of the Adi Ranga (the first Ranga). It was the capital of Tipu Sultan and remains a major center for Vaishnavite pilgrimage and ancestral rites.', 
    '155.5', 
    '560.8', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Island of the Primordial Reclining Lord', 
    'Srirangapatna Temple | Adi Ranga, Kaveri Island & Ancient Lore', 
    'Experience the spiritual history of Srirangapatna. Discover the Adi Ranga temple, the confluence at Paschima Vahini, and the profound legacy of the Ganga and Vijayanagara dynasties.', 
    'Srirangapatna, Adi Ranga, Karnataka, Lord Vishnu, Kaveri, Hindu Pilgrimage, Ancient Lore, Tipu Sultan', 
    '62', 
    '{
        "spiritualEssence": "Srirangapatna is the manifestation of the divine as the primordial protector. The energy here is historical, serene, and deeply connected to the river Kaveri. It is the first of the three Ranga temples on the islands of Kaveri. The vibration is one of ancestral peace and the continuity of the sacred through the shifts of political power. As an island city, it represents the sanctuary of the soul. A visit here is believed to grant the devotee the same protection that the Lord gave to the Ganga kings. The air is always vibrant with the sound of the Kaveri flowing through the Paschima Vahini and the silent presence of the many warriors who fought on these grounds.",
        "longDescription": "The history of Srirangapatna dates back to the 9th century when the temple was built by the Ganga dynasty. It was later expanded by the Hoysalas and the Vijayanagara kings. The city became the capital of the Mysore state under Haider Ali and Tipu Sultan. Despite being a capital of a Muslim ruler, the temple of Sri Ranganatha remained protected and active. The city is situated on an island and is famous for the Paschima Vahini, where the Kaveri flows westwards, considered highly sacred for ancestral rites. Srirangapatna is a site where history is visible in the form of forts, dungeons, and grand temples. It is part of the sacred trinity of Ranganatha temples, along with Srirangam and Shivanasamudra.",
        "spiritualArchitecture": "The temple is a masterpiece of the Ganga and Hoysala styles, featuring a massive gopuram and a spacious courtyard with several carved pillars. The main idol of Lord Ranganatha is seen reclining on the serpent Adisesha. The city includes royal structures like the Daria Daulat Bagh and the Gumbaz. The architecture is a unique blend of ancient Dravidian styles and Indo-Islamic influences from the Tipu Sultan era.",
        "vedicReferences": "Srirangapatna is mentioned in various Kannada and Tamil Puranic traditions and is a key site in the geography of the Kaveri river pilgrimage.",
        "deepInsights": "The Adi Ranga represents the beginning of the spiritual journey. Srirangapatna teaches that the sacred remains constant even when the outer world is in a state of constant conflict and change.",
        "ancientLore": "Lore tells that the sage Gautama performed penance here to see the reclining form of Vishnu. Another legend says that the river Kaveri requested the Lord to stay on this island to protect her from the sins she washes away.",
        "keyRituals": [
                {
                        "name": "Pitri Karma",
                        "description": "Performing ancestral rites at the Paschima Vahini confluence of the river."
                },
                {
                        "name": "Sankranthi Chariot Festival",
                        "description": "The grand annual chariot procession of the Ranganatha temple."
                },
                {
                        "name": "Kaveri Pushkaram",
                        "description": "The massive 12-year celebration of the sacred river."
                }
        ],
        "highlights": [
                {
                        "name": "Sri Ranganatha Temple",
                        "description": "The ancient 9th-century shrine of the Adi Ranga."
                },
                {
                        "name": "Paschima Vahini",
                        "description": "The sacred spot where the Kaveri flows westwards, used for ancestral rites."
                },
                {
                        "name": "Tipu''s Fort",
                        "description": "The ruins of the historic fort that once protected the island city."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "15km from Mysore and 125km from Bangalore, well connected by road and rail.",
                "nearestAirport": "Mysore Airport / Bangalore International Airport.",
                "nearestRailway": "Srirangapatna Railway Station / Mysore Junction."
        },
        "tips": [
                "Combine your visit with the Mysore Palace and the Brindavan Gardens.",
                "Visit the Paschima Vahini in the early morning to observe the traditional rites.",
                "Respect the history of the site; visit both the temple and the historic ruins."
        ],
        "faqs": [
                {
                        "question": "What is the Adi Ranga?",
                        "answer": "It is the first of the three major temples dedicated to the reclining Vishnu on the islands of the river Kaveri."
                },
                {
                        "question": "How far is it from Mysore?",
                        "answer": "It is about 15 kilometers (20-30 minutes) from Mysore city center."
                },
                {
                        "question": "Who built the temple?",
                        "answer": "The original temple was built by a minister of the Ganga dynasty in 894 CE and later expanded by various kings."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Golden Temple (Amritsar)', 
    'golden-temple-amritsar', 
    'Sacred Destination', 
    'pb', 
    'The Harmandir Sahib, or Golden Temple, is the most sacred site of Sikhism. Built around a man-made pool (Amrit Sarovar) in the heart of Amritsar, it is a site of absolute equality, selfless service, and the eternal light of the Guru Granth Sahib.', 
    '110.2', 
    '150.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Abode of God and the Pool of Nectar', 
    'Golden Temple Amritsar | Harmandir Sahib, Amrit Sarovar & Lore', 
    'Experience the profound peace of the Golden Temple. Discover the history of the Guru Granth Sahib, the world''s largest free kitchen (Langar), and the message of universal equality.', 
    'Golden Temple, Amritsar, Punjab, Harmandir Sahib, Sikhism, Guru Nanak, Guru Granth Sahib, Hindu Pilgrimage, Ancient Lore, Peace', 
    '63', 
    '{
        "spiritualEssence": "The Golden Temple is the manifestation of the divine as absolute humility and universal love. The energy here is serene, high-vibrational, and deeply welcoming. It is the site where the boundaries of religion, caste, and status are completely dissolved. The vibration is one of ''Seva (Amritsar)'' (Selfless Service) and ''Simran'' (Meditation). As a temple surrounded by a pool of nectar, it represents the soul being washed clean by the name of the Guru. The vibration is one of eternal peace and the realization that the divine resides in every human heart. A visit here is believed to grant the devotee the strength to serve humanity without any expectation. The air is always vibrant with the sound of the Gurbani and the aroma of the Langar.",
        "longDescription": "The foundation stone of the Harmandir Sahib was laid in 1589 by a Muslim Sufi saint, Sai Mian Mir, at the request of the fifth Sikh Guru, Guru Arjan Dev. The temple was built to be open from all four sides, signifying that it is open to all faiths and directions. The central shrine was later gold-plated by Maharaja Ranjit Singh in the 19th century. The temple houses the Guru Granth Sahib, the eternal Guru of the Sikhs. The complex includes the Akal Takht (the seat of temporal authority), the massive Amrit Sarovar (Pool of Nectar), and the Guru-Ka-Langar, which feeds over 100,000 people daily for free. The Golden Temple is not just a place of worship; it is a living symbol of the Sikh commitment to social justice, equality, and compassion.",
        "spiritualArchitecture": "The architecture of the Golden Temple is a unique blend of Hindu and Islamic styles, known as Sikh architecture. The main shrine is a two-storied structure made of white marble and covered with gold leaf. It stands in the middle of the Amrit Sarovar, connected by a causeway. The interiors are decorated with intricate floral designs and gold-work. The four entrances signify the temple''s openness to everyone. The complex also features several historical buildings and gateways with beautiful carvings and frescoes.",
        "vedicReferences": "While a Sikh site, the spiritual roots of the Golden Temple are deeply connected to the broader Indian tradition of the Sant Mat and the Bhakti movement.",
        "deepInsights": "The four doors represent the equality of all four varnas (social classes) in the eyes of the Guru. The Golden Temple teaches that true spirituality is found in the service of the poor and the constant remembrance of the divine.",
        "ancientLore": "Lore tells that the land for the temple was gifted by the Mughal Emperor Akbar to the daughter of the third Guru. Another legend says that a dip in the Amrit Sarovar cured a leper, signifying the healing power of faith.",
        "keyRituals": [
                {
                        "name": "Palki Sahib",
                        "description": "The ceremonial procession carrying the Guru Granth Sahib from the main shrine to the Akal Takht at night and back at dawn."
                },
                {
                        "name": "Langar Seva",
                        "description": "The ritual of preparing and serving free meals to all visitors, regardless of their background."
                },
                {
                        "name": "Ishnaan",
                        "description": "Taking a ritual dip in the sacred Amrit Sarovar."
                }
        ],
        "highlights": [
                {
                        "name": "Harmandir Sahib",
                        "description": "The central gold-plated shrine and the heart of the complex."
                },
                {
                        "name": "Amrit Sarovar",
                        "description": "The sacred pool of nectar surrounding the main temple."
                },
                {
                        "name": "Akal Takht",
                        "description": "The seat of temporal authority of the Sikh religion, located opposite the main shrine."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by air, rail, and road. Amritsar has its own international airport and a major railway station.",
                "nearestAirport": "Sri Guru Ram Dass Jee International Airport, Amritsar.",
                "nearestRailway": "Amritsar Junction."
        },
        "tips": [
                "Cover your head and remove your shoes before entering the temple complex.",
                "Participate in the Langar to experience the true spirit of Sikhism.",
                "Visit the temple at night to see it beautifully illuminated and witness the Palki Sahib ceremony."
        ],
        "faqs": [
                {
                        "question": "Who can visit the Golden Temple?",
                        "answer": "People of all religions, nationalities, and backgrounds are welcome to visit."
                },
                {
                        "question": "How much gold is on the temple?",
                        "answer": "It is estimated that over 750kg of gold has been used to plate the temple."
                },
                {
                        "question": "What is the Langar?",
                        "answer": "It is the free community kitchen where thousands of people are fed daily as an act of service and equality."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Anandpur Sahib', 
    'anandpur-sahib', 
    'Sacred Destination', 
    'pb', 
    'The ''City of Bliss,'' Anandpur Sahib is the birthplace of the Khalsa. Located in the foothills of the Shivalik range, it is a site of martial spirit, spiritual courage, and the iconic Hola Mohalla festival where the Sikh martial arts are celebrated.', 
    '115.5', 
    '160.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Citadel of Spiritual Bliss and Courage', 
    'Anandpur Sahib | Birthplace of Khalsa, Hola Mohalla & Ancient Lore', 
    'Discover the heroic history of Anandpur Sahib. Explore the Kesgarh Sahib Gurudwara, the legend of the Five Beloved Ones, and the vibrant Hola Mohalla festival.', 
    'Anandpur Sahib, Punjab, Khalsa, Guru Gobind Singh, Hola Mohalla, Sikhism, Hindu Pilgrimage, Ancient Lore, Courage', 
    '64', 
    '{
        "spiritualEssence": "Anandpur Sahib is the manifestation of the divine as spiritual sovereignty and courage. The energy here is heroic, disciplined, and intensely high-vibrational. It is the site where the tenth Guru, Guru Gobind Singh, created the Khalsa panth. The vibration is one of ''Anand'' (Bliss) that comes from the readiness to sacrifice for truth. As a city of forts, it represents the protection of the righteous. A visit here is believed to grant the devotee the strength of character and the spirit of the warrior-saint. The air is always vibrant with the sound of the Nagara drums and the chanting of the Jaap Sahib. It is a site of absolute spiritual empowerment.",
        "longDescription": "Founded in 1665 by the ninth Guru, Guru Tegh Bahadur, Anandpur Sahib became the center of the Sikh resistance against tyranny. It was here in 1699 that Guru Gobind Singh initiated the first five Sikhs into the Khalsa (the Pure), giving them the title of Panj Pyare (Five Beloved Ones). The city is home to several historic Gurudwaras, with Takht Sri Kesgarh Sahib being the most prominent. Anandpur is famous for the Hola Mohalla festival, started by Guru Gobind Singh as a military exercise for the Sikhs, featuring mock battles, martial arts (Gatka), and equestrian displays. The city is a masterpiece of historical and spiritual geography, surrounded by the Satluj river and the Shivalik mountains.",
        "spiritualArchitecture": "The architecture of Anandpur Sahib is characterized by its white-washed Gurudwaras and massive forts (Qilas). Takht Sri Kesgarh Sahib is a grand structure with several domes and a large courtyard. The Virasat-e-Khalsa museum, located nearby, is a modern architectural marvel that tells the 500-year history of the Sikh religion. The architecture reflects the blend of spiritual peace and martial strength, with thick walls and strategic locations integrated with beautiful gardens and prayer halls.",
        "vedicReferences": "While a Sikh site, the name Anandpur and the focus on internal bliss are deeply connected to the Vedic concepts of Ananda and Dharma.",
        "deepInsights": "The creation of the Khalsa represents the birth of a collective spiritual consciousness. Anandpur teaches that true bliss is found when one is ready to stand for justice without fear.",
        "ancientLore": "Lore tells that the head of Guru Tegh Bahadur was brought here from Delhi by a brave devotee, and the tenth Guru performed the final rites. Another legend says that the Guru turned sparrows into hawks to signify the empowerment of the weak.",
        "keyRituals": [
                {
                        "name": "Hola Mohalla",
                        "description": "The grand annual festival featuring martial arts, poetry competitions, and massive processions."
                },
                {
                        "name": "Khande di Pahul",
                        "description": "The initiation ritual into the Khalsa, using a double-edged sword to stir the nectar (Amrit)."
                },
                {
                        "name": "Bhog of Akhand Path",
                        "description": "The completion of the continuous reading of the Guru Granth Sahib during major festivals."
                }
        ],
        "highlights": [
                {
                        "name": "Takht Sri Kesgarh Sahib",
                        "description": "One of the five seats of authority in Sikhism and the site of the Khalsa''s creation."
                },
                {
                        "name": "Virasat-e-Khalsa",
                        "description": "A world-class museum dedicated to the history and heritage of the Sikhs."
                },
                {
                        "name": "Qila Anandgarh Sahib",
                        "description": "One of the five historic forts built to protect the city."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Hola Mohalla).",
                "howToReach": "Well connected by road and rail from Chandigarh (85km) and Amritsar.",
                "nearestAirport": "Chandigarh International Airport.",
                "nearestRailway": "Anandpur Sahib Railway Station."
        },
        "tips": [
                "Visit during Hola Mohalla (usually in March) to see the spectacular martial arts displays.",
                "Explore the Virasat-e-Khalsa museum; allocate at least 3-4 hours for it.",
                "Dress modestly and cover your head in all Gurudwaras."
        ],
        "faqs": [
                {
                        "question": "What is the Khalsa?",
                        "answer": "It refers to the community of initiated Sikhs who follow a specific code of conduct and are committed to justice and equality."
                },
                {
                        "question": "How far is it from Chandigarh?",
                        "answer": "It is about 85 kilometers and takes 1.5 to 2 hours by road."
                },
                {
                        "question": "What is Hola Mohalla?",
                        "answer": "It is a three-day Sikh festival celebrated with martial arts displays, started by Guru Gobind Singh."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Hemkund Sahib (High Altitude Shrine)', 
    'hemkund-sahib', 
    'Sacred Destination', 
    'uk', 
    'Located at an altitude of 4,329 meters beside a crystal-clear glacial lake, Hemkund Sahib is the world''s highest Gurudwara. It is the site where the tenth Guru meditated in his previous life, surrounded by seven snow-capped peaks.', 
    '235.2', 
    '125.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Glacial Throne of the Eternal Guru', 
    'Hemkund Sahib | Glacial Lake, Seven Peaks & Ancient Lore', 
    'Experience the high-altitude spirituality of Hemkund Sahib. Discover the glacial lake, the legend of Guru Gobind Singh''s previous life, and the challenging Himalayan trek.', 
    'Hemkund Sahib, Uttarakhand, Sikhism, Guru Gobind Singh, Himalayas, Hindu Pilgrimage, Ancient Lore, Glacial Lake', 
    '65', 
    '{
        "spiritualEssence": "Hemkund Sahib is the manifestation of the divine as absolute silence and high-altitude purity. The energy here is ethereal, cold, and intensely meditative. It is the site where the soul meets the sky. The vibration is one of deep internal penance and the transcendence of the physical body. As a lake surrounded by seven peaks, it represents the seven chakras of the subtle body. The vibration is one of total stillness. A visit here is a journey of extreme physical and spiritual testing. The air is always vibrant with the scent of the Brahmakamal flowers and the silent presence of the Guru who meditated here for thousands of years in his previous life.",
        "longDescription": "The history of Hemkund is linked to the autobiography of Guru Gobind Singh (Bachittar Natak), where he describes a place called ''Hemkunt Parbat Sapt Sring'' where he performed intense meditation. The site was rediscovered in the 1930s by Sohan Singh and Modan Singh. The Gurudwara is a unique star-shaped structure designed to withstand the heavy snow. The lake is considered highly sacred, and taking a dip in its freezing waters is a ritual of purification. Hemkund is also associated with Lord Lakshman, who is said to have performed penance on the banks of this lake. The trek to Hemkund is a 6km steep climb from Ghangaria, often through snow even in the summer months.",
        "spiritualArchitecture": "The Gurudwara is an architectural marvel of high-altitude construction. It is a star-shaped structure made of stone and concrete with a roof designed to slope steeply to shed snow. The interior is simple and spacious, with the Guru Granth Sahib placed in the center. The lake is surrounded by stone steps (ghats). The complex also includes a small shrine dedicated to Lord Lakshman. The architecture respects the fragile mountain ecosystem and the extreme weather conditions of the site.",
        "vedicReferences": "Hemkund is mentioned in the Bachittar Natak and is linked to the Puranic traditions of high-altitude meditation by sages and gods.",
        "deepInsights": "The seven peaks represent the seven obstacles to enlightenment. Hemkund teaches that the highest spiritual states are reached only after great physical and mental effort. The stillness of the lake reflects the stillness of the enlightened mind.",
        "ancientLore": "Lore tells that Guru Gobind Singh, in his previous life as Rishi Dusht Daman, meditated here until he was merged with the divine. Another legend says that Lakshman was brought here after being wounded in the battle with Indrajit, and his health was restored by the mountain air and the sacred water.",
        "keyRituals": [
                {
                        "name": "Sarovar Snan",
                        "description": "Taking a ritual dip in the freezing waters of the Hemkund lake."
                },
                {
                        "name": "Gurbani Chanting",
                        "description": "Continuous devotional singing within the star-shaped Gurudwara."
                },
                {
                        "name": "Brahmakamal Offering",
                        "description": "Seeing the rare Himalayan flower that blooms only in these high altitudes."
                }
        ],
        "highlights": [
                {
                        "name": "Hemkund Sarovar",
                        "description": "The crystal-clear glacial lake at 14,000 feet."
                },
                {
                        "name": "Star-shaped Gurudwara",
                        "description": "The unique architectural landmark at the highest altitude."
                },
                {
                        "name": "Valley of Flowers",
                        "description": "The world-famous alpine valley located just a few kilometers from the trekking base."
                }
        ],
        "travelInfo": {
                "bestTime": "July to September (the temple is closed for the rest of the year).",
                "howToReach": "Well connected by road from Rishikesh to Govindghat, followed by a 13km trek to Ghangaria and a final 6km steep trek to Hemkund.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh / Haridwar."
        },
        "tips": [
                "Acclimatize for a day in Ghangaria before attempting the final 6km climb to Hemkund.",
                "Carry raincoats and heavy woollens as the weather can change in minutes.",
                "Start your descent from Hemkund by 2 PM to reach Ghangaria before sunset."
        ],
        "faqs": [
                {
                        "question": "How hard is the trek?",
                        "answer": "The trek from Ghangaria to Hemkund is 6km long and very steep; it is considered one of the most challenging pilgrim treks in India."
                },
                {
                        "question": "Can we stay at the Gurudwara?",
                        "answer": "No, visitors must return to Ghangaria for the night as the oxygen levels and temperatures at Hemkund are too low for an overnight stay."
                },
                {
                        "question": "Is there a pony service?",
                        "answer": "Yes, ponies and palanquins are available for those who cannot walk the steep incline."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Kartarpur Sahib', 
    'kartarpur-sahib', 
    'Sacred Destination', 
    'pb', 
    'Located just across the border in Pakistan, Kartarpur Sahib is the site where Guru Nanak Dev, the founder of Sikhism, spent the last 18 years of his life. It is a site of peace, reconciliation, and the eternal message of universal brotherhood.', 
    '105.2', 
    '155.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Final Abode of the First Guru', 
    'Kartarpur Sahib | Guru Nanak, Peace Corridor & Ancient Lore', 
    'Experience the spiritual grace of Kartarpur Sahib. Discover the fields where Guru Nanak farmed, the peaceful Gurudwara complex, and the message of the Kartarpur Corridor.', 
    'Kartarpur Sahib, Guru Nanak, Pakistan, Sikhism, Peace Corridor, Hindu Pilgrimage, Ancient Lore, Universal Brotherhood', 
    '66', 
    '{
        "spiritualEssence": "Kartarpur is the manifestation of the divine as the simple, hardworking human spirit. The energy here is serene, agricultural, and deeply peaceful. It is the site where the Guru transformed from a traveler to a farmer, showing that spirituality is lived in the daily labor of life. The vibration is one of ''Kirat Karo'' (Honest Labor) and ''Vand Chako'' (Share with others). As a site recently connected by a peace corridor, the vibration is also one of reconciliation and the overcoming of political boundaries. A visit here is believed to grant the devotee the same clarity and simplicity that Guru Nanak taught through his life. The air is always vibrant with the sound of the Ravi river and the silent growth of the fields.",
        "longDescription": "Founded by Guru Nanak in 1522, Kartarpur (The City of the Creator) is where the first Guru established the first Sikh community. He lived here as a simple farmer, teaching his disciples the path of devotion and hard work. The current Gurudwara was rebuilt in its present grand form and is one of the largest in the world. The site gained global prominence in 2019 with the opening of the Kartarpur Corridor, allowing Indian pilgrims to visit without a visa. Kartarpur is unique as it houses both a grave and a samadhi of the Guru, signifying that he belonged to both the Hindus and the Muslims. It is a site where the spiritual transcends the political, serving as a beacon of hope for peace in the subcontinent.",
        "spiritualArchitecture": "The Gurudwara is a grand white marble structure with multiple domes and a spacious courtyard. The architecture is a modern interpretation of the traditional Sikh style, designed to accommodate thousands of pilgrims. The complex includes the main prayer hall, a large Langar hall, and preserved historical sites such as the well used by the Guru. The surrounding area is kept as agricultural land to honor the Guru''s time as a farmer. The architecture is characterized by its openness and the use of white marble to create a sense of celestial purity.",
        "vedicReferences": "The teachings of Guru Nanak at Kartarpur are the culmination of the ancient Indian quest for the formless divine (Nirguna Brahman) translated into a practical way of life.",
        "deepInsights": "The Guru''s transition to farming teaches that no work is low and that the divine is found in the soil and the sweat of honest labor. Kartarpur teaches that the highest spiritual state is the one of the householder who remains detached.",
        "ancientLore": "Lore tells that when the Guru died, his Hindu and Muslim followers fought over whether to cremate or bury him. When they lifted the sheet covering his body, they found only flowers, which they divided and buried/cremated according to their traditions.",
        "keyRituals": [
                {
                        "name": "Darshan at the Fields",
                        "description": "Visiting the land where the Guru personally farmed for 18 years."
                },
                {
                        "name": "Nagar Kirtan",
                        "description": "Ceremonial processions within the Gurudwara complex celebrating the Guru''s life."
                },
                {
                        "name": "Langar Seva",
                        "description": "The practice of eating together in the community kitchen, a tradition started by the Guru here."
                }
        ],
        "highlights": [
                {
                        "name": "Gurudwara Darbar Sahib",
                        "description": "The main shrine at the site of the Guru''s final residence."
                },
                {
                        "name": "The Guru''s Well",
                        "description": "The historic well used by Guru Nanak to irrigate his fields."
                },
                {
                        "name": "Kartarpur Corridor",
                        "description": "The 4.7km long bridge and border crossing connecting India and Pakistan."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Accessible from India via the Kartarpur Corridor from Dera Baba Nanak in Gurdaspur district. Requires online registration.",
                "nearestAirport": "Amritsar International Airport.",
                "nearestRailway": "Dera Baba Nanak Railway Station."
        },
        "tips": [
                "Register online at least 10 days in advance on the official government portal.",
                "Carry your passport as identity proof for the corridor crossing.",
                "The visit is currently limited to a single day; you must return to India by sunset."
        ],
        "faqs": [
                {
                        "question": "Do I need a visa?",
                        "answer": "No, Indian pilgrims can use the corridor with an Electronic Travel Authorization (ETA) and their passport."
                },
                {
                        "question": "How long is the walk?",
                        "answer": "The corridor is about 4.7km; shuttle services are available from the border to the Gurudwara."
                },
                {
                        "question": "Is it safe?",
                        "answer": "Yes, it is a highly secure and managed corridor specifically for pilgrims."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Paonta Sahib', 
    'paonta-sahib', 
    'Sacred Destination', 
    'hp', 
    'Located on the banks of the Yamuna in Himachal Pradesh, Paonta Sahib is the site where Guru Gobind Singh spent over four years of his life. It is a site of literary genius and martial training, where the Guru composed many of his major works.', 
    '235.5', 
    '170.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'Where the Guru Reined in the River', 
    'Paonta Sahib Gurudwara | Himachal, Yamuna Lore & Ancient Lore', 
    'Discover the spiritual history of Paonta Sahib. Explore the Kavi Darbar, the legend of the silent Yamuna, and the profound literary legacy of Guru Gobind Singh.', 
    'Paonta Sahib, Himachal Pradesh, Guru Gobind Singh, Yamuna, Sikhism, Hindu Pilgrimage, Ancient Lore, Literature', 
    '67', 
    '{
        "spiritualEssence": "Paonta Sahib is the manifestation of the divine as the union of the pen and the sword. The energy here is creative, disciplined, and intensely intellectual. It is the site where the Guru resided in a state of high creative flow. The vibration is one of ''Kavi'' (Poet) and ''Soora'' (Warrior). As a riverside shrine, it represents the flow of wisdom. The vibration is one of quiet strength. A visit here is believed to grant the devotee the clarity of thought and the courage to express the truth. The air is always vibrant with the sound of the Yamuna—which is said to flow silently here to not disturb the Guru''s writing—and the chanting of the Dasam Granth.",
        "longDescription": "Guru Gobind Singh arrived here at the invitation of the Raja of Nahan and built a fort on the banks of the Yamuna. The name Paonta comes from ''Paon'' (Foot), where the Guru first placed his foot in this region. During his four and a half years here, he composed the Jaap Sahib and many other parts of the Dasam Granth. The Gurudwara features a ''Kavi Darbar'' where the Guru held poetry competitions among his 52 court poets. Paonta Sahib is also the site where the Guru won the battle of Bhangani against the combined forces of several local kings. The city is a beautiful blend of the Himalayan foothills and the sacred river plains, serving as a center for both spiritual and martial learning.",
        "spiritualArchitecture": "The Gurudwara is a beautiful white marble structure with golden domes, situated right on the edge of the river Yamuna. It features a large prayer hall and a spacious courtyard with views of the mountains. The complex includes the Kavi Darbar hall and a museum housing historical weapons and manuscripts. The architecture is characterized by its peaceful riverside location and the use of marble and gold to reflect the Guru''s royal yet spiritual status.",
        "vedicReferences": "While a Sikh site, the Guru''s work at Paonta Sahib often drew inspiration from ancient Indian epics and the philosophy of the Puranas.",
        "deepInsights": "The silence of the Yamuna at this spot signifies that nature itself bows to the higher vibration of spiritual wisdom. Paonta Sahib teaches that the greatest warrior is also the greatest poet.",
        "ancientLore": "Lore tells that the river Yamuna used to roar loudly at this spot, but when the Guru asked it to be quiet so his poets could read their work, it became silent and has remained so ever since. Another legend says that the Guru personally tested the bravery of his followers in the nearby forests.",
        "keyRituals": [
                {
                        "name": "Kavi Darbar",
                        "description": "The ritual of reciting poetry and devotional songs, continuing the Guru''s tradition."
                },
                {
                        "name": "Hola Mohalla Procession",
                        "description": "Vibrant celebrations featuring martial arts and equestrian displays."
                },
                {
                        "name": "Deep Mala",
                        "description": "The lighting of thousands of lamps along the river banks during major festivals."
                }
        ],
        "highlights": [
                {
                        "name": "Paonta Sahib Gurudwara",
                        "description": "The main shrine located on the banks of the Yamuna."
                },
                {
                        "name": "Kavi Darbar",
                        "description": "The hall dedicated to the Guru''s literary assembly."
                },
                {
                        "name": "Yamuna Ghat",
                        "description": "The peaceful stone steps leading down to the silent river."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road from Chandigarh (100km) and Dehradun (45km).",
                "nearestAirport": "Jolly Grant Airport, Dehradun / Chandigarh Airport.",
                "nearestRailway": "Yamunanagar Railway Station / Dehradun Junction."
        },
        "tips": [
                "Take some time to sit by the river and observe the ''silence'' of the water.",
                "Visit the museum to see the weapons and manuscripts from the Guru''s time.",
                "Respect the peaceful and contemplative atmosphere of the site."
        ],
        "faqs": [
                {
                        "question": "Why is it called Paonta?",
                        "answer": "It is derived from the word ''Paon'' meaning foot, as it is where the Guru first set foot in the Nahan state."
                },
                {
                        "question": "Did the Guru write the Jaap Sahib here?",
                        "answer": "Yes, it is traditionally believed that many major parts of the Dasam Granth were composed at Paonta Sahib."
                },
                {
                        "question": "How far is it from Dehradun?",
                        "answer": "It is about 45 kilometers and takes approximately 1 to 1.5 hours by road."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Patna Sahib', 
    'patna-sahib', 
    'Sacred Destination', 
    'br', 
    'The birthplace of the tenth Sikh Guru, Guru Gobind Singh, Patna Sahib is one of the five Takhts (seats of authority) of Sikhism. Located on the banks of the Ganges in Patna, it is a site of immense historical and spiritual significance.', 
    '620.2', 
    '350.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Cradle of the Warrior-Saint', 
    'Takht Sri Patna Sahib | Birthplace of Guru Gobind Singh & Lore', 
    'Experience the spiritual heritage of Patna Sahib. Discover the birthplace of the tenth Guru, the sacred relics of the Khalsa, and the profound message of the Shabad Guru.', 
    'Patna Sahib, Bihar, Guru Gobind Singh, Sikhism, Takht, Hindu Pilgrimage, Ancient Lore, Ganges', 
    '68', 
    '{
        "spiritualEssence": "Patna Sahib is the manifestation of the divine as the cradle of spiritual revolution. The energy here is youthful, powerful, and intensely transformative. It is the site where the great light (Guru Gobind Singh) first manifested in the physical world. The vibration is one of ''Chardi Kala'' (Eternal Optimism) and the preparation for the protection of Dharma. As a riverside Takht, it represents the flow of the eternal word into the heart of India. A visit here is believed to grant the devotee the courage to stand for truth from the very beginning of their journey. The air is always vibrant with the sound of the Gurbani and the silent presence of the Guru who spent his early years playing on these banks.",
        "longDescription": "Takht Sri Patna Sahib, also known as Harmandir Sahib Patna, was built to commemorate the birth of Guru Gobind Singh in 1666. The Gurudwara was patronized by Maharaja Ranjit Singh, who rebuilt the shrine after it was damaged in a fire. The temple houses several sacred relics of the tenth Guru, including his cradle, a gold-plated pair of sandals, and four iron arrows. Patna was already a sacred site before the Guru''s birth, having been visited by Guru Nanak and Guru Tegh Bahadur. The city of Patna, ancient Pataliputra, serves as a backdrop to this spiritual powerhouse, which remains a primary center for Sikhism in Eastern India. The Gurudwara is a site of grand celebrations during the Guru''s birth anniversary (Prakash Parv), attracting millions of devotees.",
        "spiritualArchitecture": "The Gurudwara is a grand white marble structure built in the Sikh architectural style with multiple domes and a spacious courtyard. The architecture is characterized by its use of marble, gold leaf, and intricate frescoes. The main shrine features a large prayer hall where the Guru Granth Sahib is placed under a gold-plated canopy. The complex includes a museum housing historical relics and a large Langar hall. The architecture reflects the royal status of the Takht, signifying its role as a seat of spiritual and temporal authority.",
        "vedicReferences": "While a Sikh site, the Guru''s birth in Patna is seen as a fulfillment of the ancient Indian tradition of the divine manifesting to protect the righteous, as described in the Bhagavad Gita.",
        "deepInsights": "The birth of the Guru in the ancient capital of Pataliputra signifies the union of spiritual power with temporal history. Patna Sahib teaches that the seeds of greatness are sown in the simplicity of childhood.",
        "ancientLore": "Lore tells that a Hindu queen who was childless prayed to Guru Tegh Bahadur, and he blessed her that she would have a son who would be a great savior. Another legend says that the young Guru Gobind Singh used to play with his friends on the banks of the Ganges, leading them in mock battles even as a child.",
        "keyRituals": [
                {
                        "name": "Relic Darshan",
                        "description": "The ceremonial viewing of the sacred items used by Guru Gobind Singh during his childhood."
                },
                {
                        "name": "Prakash Parv Procession",
                        "description": "The massive annual parade celebrating the Guru''s birthday with music and martial arts."
                },
                {
                        "name": "Shabad Kirtan",
                        "description": "The continuous singing of hymns that fills the Takht day and night."
                }
        ],
        "highlights": [
                {
                        "name": "Main Shrine",
                        "description": "The magnificent white marble Gurudwara at the site of the Guru''s birth."
                },
                {
                        "name": "Sacred Relics",
                        "description": "Historical items including the Guru''s cradle and gold-plated sandals."
                },
                {
                        "name": "Museum of Sikh History",
                        "description": "A repository of weapons, paintings, and manuscripts from the Guru''s era."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by air, rail, and road. Patna has its own major airport and railway station.",
                "nearestAirport": "Jay Prakash Narayan International Airport, Patna.",
                "nearestRailway": "Patna Sahib Railway Station / Patna Junction."
        },
        "tips": [
                "Visit during the Prakash Parv to see the city in its full spiritual glory.",
                "Explore the museum to understand the early life of the tenth Guru.",
                "Respect the protocols of the Takht; cover your head and remove your shoes."
        ],
        "faqs": [
                {
                        "question": "Why is it called a Takht?",
                        "answer": "A Takht is one of the five seats of temporal and spiritual authority in Sikhism."
                },
                {
                        "question": "Can we see the relics?",
                        "answer": "Yes, the relics are displayed for the devotees during specific hours every day."
                },
                {
                        "question": "How far is it from the main Patna station?",
                        "answer": "It is about 10-12 kilometers and takes 30-45 minutes by road."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Hazur Sahib', 
    'hazur-sahib', 
    'Sacred Destination', 
    'mh', 
    'The site where Guru Gobind Singh left his physical form, Takht Sri Hazur Sahib is located on the banks of the Godavari in Nanded. It is where the Guru declared the Guru Granth Sahib as the eternal Guru of the Sikhs, making it a site of ultimate spiritual transition.', 
    '320.5', 
    '480.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Eternal Presence of the Guru', 
    'Takht Sri Hazur Sahib Nanded | Godavari, Eternal Guru & Lore', 
    'Discover the profound history of Hazur Sahib. Explore the site of the Guru''s final departure, the declaration of the Shabad Guru, and the majestic laser show on Sikh history.', 
    'Hazur Sahib, Nanded, Maharashtra, Guru Gobind Singh, Sikhism, Takht, Hindu Pilgrimage, Ancient Lore, Godavari', 
    '69', 
    '{
        "spiritualEssence": "Hazur Sahib is the manifestation of the divine as the eternal presence. The energy here is royal, disciplined, and intensely high-vibrational. It is the site where the personal Guru merged into the eternal word (Shabad). The vibration is one of absolute finality and the beginning of a new spiritual era. As a Takht on the banks of the Godavari, it represents the grounding of the Sikh spirit in the heart of the Deccan. A visit here is believed to grant the devotee the realization that the Guru never truly leaves his followers. The air is always vibrant with the sound of the Nagara drums and the scent of the incense from the inner sanctum where the Guru''s weapons are preserved.",
        "longDescription": "Takht Sri Hazur Sahib, also known as Sachkhand (The Realm of Truth), is where Guru Gobind Singh spent his final days in 1708. It was here that he was stabbed by an assassin and subsequently left his physical body. Before his departure, he ended the line of human Gurus and commanded the Sikhs to look upon the Guru Granth Sahib as their living Guru forever. The current Gurudwara was built by Maharaja Ranjit Singh in the 1830s. The site is famous for its preservation of the Guru''s weapons and the ''Angitha Sahib'' (the funeral pyre site). Nanded is a city transformed by this spiritual presence, with multiple Gurudwaras marking various events of the Guru''s stay. The Laser Show at the Gobind Bagh is a world-class attraction that narrate the 10 Gurus'' history through light and sound.",
        "spiritualArchitecture": "The Gurudwara is a spectacular white marble structure with gold-plated domes and intricately carved interiors. The inner sanctum houses the Guru Granth Sahib and a display of the Guru''s weapons. The architecture is grand and fortress-like, reflecting the martial spirit of the Khalsa. The complex includes several marble halls, a museum, and a large dining area. The use of marble and gold work is similar to the Golden Temple, creating a sense of a royal court of the divine.",
        "vedicReferences": "While a Sikh site, the Guru''s final departure on the banks of the Godavari echoes the ancient Indian tradition of great sages choosing their time and place of Mahasamadhi.",
        "deepInsights": "The transition from a human Guru to a book (the Shabad) signifies the democratization of spiritual wisdom. Hazur Sahib teaches that the truth is found in the word, not the form.",
        "ancientLore": "Lore tells that the Guru personally selected the site for his departure, identifying it as a place where great sages had performed penance in ancient times. Another legend says that he appeared on his horse to a devotee several days after his funeral pyre was lit, showing that he remains eternally present.",
        "keyRituals": [
                {
                        "name": "Shastra Darshan",
                        "description": "The ceremonial display of the weapons used by Guru Gobind Singh."
                },
                {
                        "name": "Laser Show",
                        "description": "The nightly light and sound show narrating the history of the Sikh Gurus."
                },
                {
                        "name": "Amrit Sanchar",
                        "description": "The sacred initiation ritual performed regularly at the Takht."
                }
        ],
        "highlights": [
                {
                        "name": "Main Shrine (Sachkhand Sahib)",
                        "description": "The magnificent marble temple at the site of the Guru''s departure."
                },
                {
                        "name": "The Guru''s Weapons",
                        "description": "A priceless collection of historical swords, bows, and arrows."
                },
                {
                        "name": "Godavari River Ghats",
                        "description": "The peaceful stone steps leading down to the sacred river."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by rail and road from Mumbai and Hyderabad. Nanded has its own airport with limited flights.",
                "nearestAirport": "Shri Guru Gobind Singh Ji Airport, Nanded / Hyderabad Airport.",
                "nearestRailway": "Hazur Sahib Nanded Railway Station."
        },
        "tips": [
                "Attend the Shastra Darshan in the evening to see the Guru''s weapons.",
                "Don''t miss the Laser Show at Gobind Bagh; it is one of the best in India.",
                "Dress respectfully and follow the strict protocols of the Takht."
        ],
        "faqs": [
                {
                        "question": "Is it the same as the Golden Temple?",
                        "answer": "No, it is one of the five Takhts, similar in importance but located in Maharashtra, marking the Guru''s final departure."
                },
                {
                        "question": "Can we see the Guru''s weapons?",
                        "answer": "Yes, they are displayed for the public every evening inside the main shrine."
                },
                {
                        "question": "Is there a direct train from Delhi?",
                        "answer": "Yes, several trains including the Sachkhand Express connect Delhi and Nanded directly."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Tarn Taran Sahib', 
    'tarn-taran-sahib', 
    'Sacred Destination', 
    'pb', 
    'Home to the largest sacred pool (Sarovar) in the world, Tarn Taran Sahib was founded by the fifth Guru, Guru Arjan Dev. It is a site of immense healing and peace, where the water is believed to have the power to cure even the most incurable diseases.', 
    '105.5', 
    '145.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Boat that Crosses the Ocean of Life', 
    'Tarn Taran Sahib | World''s Largest Sarovar, Healing & Lore', 
    'Discover the spiritual power of Tarn Taran. Explore the largest Sikh Sarovar, the legend of the healing waters, and the profound architectural beauty of the fifth Guru''s legacy.', 
    'Tarn Taran, Punjab, Guru Arjan Dev, Sikhism, Healing Waters, Hindu Pilgrimage, Ancient Lore, Sarovar', 
    '70', 
    '{
        "spiritualEssence": "Tarn Taran is the manifestation of the divine as the vessel of salvation. The energy here is vast, watery, and incredibly soothing. It is the site where the Guru created a space for both spiritual and physical healing. The vibration is one of absolute peace and the washing away of the suffering of the world. As the site with the largest Sarovar, the vibration is one of cosmic depth. A visit here is believed to grant the devotee the same relief that the lepers and the sick felt when the Guru built this city for them. The air is always vibrant with the sound of the Gurbani echoing over the massive expanse of water.",
        "longDescription": "Founded in 1590, Tarn Taran (The Boat to Cross Over) was established by Guru Arjan Dev at a time when lepers were treated as outcasts. The Guru built a healing center and a massive Sarovar, teaching that every human being deserves dignity and care. The main Gurudwara is a beautiful gold-plated structure that stands on the edge of the lake. The Sarovar is unique as it is the largest in the Sikh world, covering over 10 acres. During the reign of Maharaja Ranjit Singh, the Gurudwara was rebuilt with marble and gold work similar to the Golden Temple. Tarn Taran is a site where the spirit of service (Seva) is palpable in every corner, continuing the Guru''s mission of compassion for the suffering.",
        "spiritualArchitecture": "The Gurudwara is a masterpiece of Sikh architecture, featuring a three-storied main shrine with a gold-plated dome. The architecture is designed to emphasize the massive Sarovar, with wide marble walkways (Parikrama) surrounding the water. The complex includes several historical gateways and a high-rise minaret (Minar) added during the British era. The use of white marble and gold leaf creates a stunning visual reflection in the calm waters of the lake, making it one of the most serene sites in Punjab.",
        "vedicReferences": "While a Sikh site, the name Tarn Taran is a direct reference to the ancient Indian concept of the divine being the ''Taraka'' (the one who helps us cross the ocean of existence).",
        "deepInsights": "The massive size of the water body represents the infinite grace of the divine. Tarn Taran teaches that spiritual health is inseparable from the compassionate service of those in pain.",
        "ancientLore": "Lore tells that Guru Arjan Dev personally treated lepers here, washing their wounds with his own hands. Another legend says that the water of the Sarovar never dries up and has a unique mineral composition that aids in healing skin diseases.",
        "keyRituals": [
                {
                        "name": "Sarovar Ishnaan",
                        "description": "Taking a ritual bath in the healing waters of the world''s largest Sikh Sarovar."
                },
                {
                        "name": "Amrit Vela Kirtan",
                        "description": "The early morning hymns sung as the sun rises over the massive lake."
                },
                {
                        "name": "Massive Langar Seva",
                        "description": "Serving meals to thousands, continuing the Guru''s mission of universal care."
                }
        ],
        "highlights": [
                {
                        "name": "World''s Largest Sarovar",
                        "description": "The massive 10-acre sacred pool at the heart of the city."
                },
                {
                        "name": "Main Gurudwara",
                        "description": "The gold-plated three-storied shrine reflecting in the water."
                },
                {
                        "name": "Historical Gateways",
                        "description": "Ancient arches that lead to the sacred complex."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "25km from Amritsar, well connected by road and rail. Regular buses run from Amritsar.",
                "nearestAirport": "Amritsar International Airport.",
                "nearestRailway": "Tarn Taran Railway Station / Amritsar Junction."
        },
        "tips": [
                "Visit in the early morning for the most peaceful experience by the water.",
                "Take the time to walk the full circle of the massive Sarovar (approx. 1km).",
                "Respect the traditions of the site; cover your head and remove your shoes."
        ],
        "faqs": [
                {
                        "question": "How large is the pool?",
                        "answer": "The Sarovar at Tarn Taran is the largest in the Sikh world, covering approximately 10 acres."
                },
                {
                        "question": "Is it older than the Golden Temple?",
                        "answer": "It was founded in 1590, just a few years after the Golden Temple (1589)."
                },
                {
                        "question": "Can women bathe in the Sarovar?",
                        "answer": "Yes, there are separate, covered areas for women to take a ritual dip."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Biraja Temple (Jajpur)', 
    'biraja-temple-jajpur', 
    'Sacred Destination', 
    'or', 
    'One of the 51 Shakti Peeths and known as the Gadakshetra, the Biraja Temple is where the navel of Sati fell. It is a site of ancient power where the Goddess is worshipped as the one who represents the primordial creative energy.', 
    '650.5', 
    '420.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Navel of the Universe', 
    'Biraja Temple Jajpur | Shakti Peeth, Gadakshetra & Lore', 
    'Explore the mystical power of Biraja Temple. Discover the legend of the navel of Sati, the ancient traditions of Jajpur, and the profound significance of the Gadakshetra.', 
    'Biraja Temple, Jajpur, Odisha, Shakti Peeth, Gadakshetra, Hindu Pilgrimage, Ancient Lore, Navel of Sati', 
    '71', 
    '{
        "spiritualEssence": "Biraja is the manifestation of the divine as the center of creation. The energy here is grounding, maternal, and intensely ancient. It is the site where the central axis (the navel) of the universe was established. The vibration is one of ''Biraja'' (Free from dust/impurity). As a Gadakshetra, it represents the power that anchors the spirit to the earth. A visit here is believed to grant the devotee the same centeredness and stability that the earth itself enjoys. The air is always vibrant with the sound of the Vaitarani river and the chanting of the Devi Suktam in the traditional Odia style.",
        "longDescription": "The Biraja temple is situated in Jajpur, the ancient capital of Odisha. It is one of the oldest Shakti Peeths in India. The main deity is a two-armed image of Goddess Durga, seen piercing the chest of the demon Mahishasura. A unique feature is that the crown of the Goddess features symbols of the sun, moon, and the serpent. The temple is also associated with Lord Brahma, who is said to have performed a massive sacrifice (Yajna) here, giving the city its name (Jajpur from Yajnapura). The temple complex is a site of immense spiritual activity, especially during the Pitri Paksha, when thousands come to perform ancestral rites on the banks of the Vaitarani river. Jajpur is considered one of the four sacred kshetras of Odisha, representing the Gadha (mace) of Vishnu.",
        "spiritualArchitecture": "The temple is built in the classic Kalinga architectural style with a square sanctum and a pyramidal porch. The architecture is sturdy and elegant, featuring intricate carvings on the outer walls depicting various forms of the Goddess. The inner sanctum houses the ancient idol of Biraja Devi. The complex includes several smaller shrines dedicated to Shiva and Ganesha. The proximity to the Vaitarani river and the presence of ancient stone steps (ghats) add a serene, natural element to the spiritual experience.",
        "vedicReferences": "Biraja is mentioned in the Mahabharata and several Puranas as a primary site of the Goddess and a center for ancestral liberation.",
        "deepInsights": "The navel represents the source of life and the connection between the mother and the child. Biraja teaches that the divine is the center from which all life emerges and to which it eventually returns.",
        "ancientLore": "Lore tells that when Lord Vishnu''s mace fell on the earth, its handle became the city of Jajpur. Another legend says that the river Vaitarani is the boundary between the material world and the realm of Yama, and the Goddess Biraja protects the souls who cross it.",
        "keyRituals": [
                {
                        "name": "Biraja Rath Yatra",
                        "description": "The unique annual chariot festival of the Goddess, held during Durga Puja."
                },
                {
                        "name": "Vaitarani Pitri Karma",
                        "description": "Performing ancestral rites on the banks of the sacred river to liberate the souls of ancestors."
                },
                {
                        "name": "Sahasra Kumbha Abhishekam",
                        "description": "The ritual bathing of the Goddess with a thousand pitchers of sacred water."
                }
        ],
        "highlights": [
                {
                        "name": "Main Shrine",
                        "description": "The ancient Kalinga-style temple housing the two-armed Durga."
                },
                {
                        "name": "Vaitarani River",
                        "description": "The sacred river flowing beside Jajpur, associated with the journey of the soul."
                },
                {
                        "name": "Nabhigaya",
                        "description": "The sacred spot within the temple complex where the navel of Sati is believed to have fallen."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "100km from Bhubaneswar and 30km from Jajpur-Keonjhar Road railway station. Well connected by road.",
                "nearestAirport": "Biju Patnaik International Airport, Bhubaneswar.",
                "nearestRailway": "Jajpur-Keonjhar Road Railway Station."
        },
        "tips": [
                "Participate in the Rath Yatra if visiting during Durga Puja to see the Goddess in her grand chariot.",
                "Visit the Vaitarani ghats early in the morning to observe the traditional rituals.",
                "Respect the local traditions; the temple is highly sacred and follows strict protocols."
        ],
        "faqs": [
                {
                        "question": "What is the Gadakshetra?",
                        "answer": "It is one of the four sacred regions of Odisha, representing the mace (Gadha) of Lord Vishnu."
                },
                {
                        "question": "Why is the navel significant?",
                        "answer": "It is believed to be the spot where the navel of the Goddess Sati fell, making it a primary Shakti Peeth."
                },
                {
                        "question": "How far is it from Bhubaneswar?",
                        "answer": "It is approximately 100 kilometers and takes about 2 to 2.5 hours by road."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Kshir Bhawani', 
    'kshir-bhawani', 
    'Sacred Destination', 
    'jk', 
    'Located in the beautiful Ganderbal district of Kashmir, Kshir Bhawani is a temple dedicated to the Goddess Ragnya Devi. It is famous for its sacred spring, whose waters are said to change color to predict the future of the region.', 
    '110.5', 
    '100.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Goddess of the Sacred Spring', 
    'Kshir Bhawani Temple | Kashmir, Color-Changing Spring & Lore', 
    'Experience the mystical peace of Kshir Bhawani. Discover the sacred spring, the legend of Ravana and Hanuman, and the profound tradition of the Kashmiri Pandits.', 
    'Kshir Bhawani, Kashmir, Ragnya Devi, Ganderbal, Hindu Pilgrimage, Ancient Lore, Sacred Spring', 
    '72', 
    '{
        "spiritualEssence": "Kshir Bhawani is the manifestation of the divine as the shifting waters of destiny. The energy here is peaceful, introspective, and intensely connected to the land of Kashmir. It is the site where the Goddess protects her children through her subtle signs. The vibration is one of ''Kshir'' (Milk), representing the sweet and maternal nature of the divine. As a spring temple, it represents the deep source of the unconscious mind. A visit here is believed to grant the devotee the grace of the Mother and a sense of belonging to the eternal. The air is always vibrant with the scent of the Chinar trees and the silent whispers of the spring.",
        "longDescription": "The temple of Ragnya Devi, popularly known as Kshir Bhawani, is situated in the village of Tulmulla. Legend says that the Goddess was originally worshipped by Ravana in Lanka. When Ravana became unrighteous, the Goddess asked Lord Hanuman to move her to Kashmir. The temple is built over a sacred spring which is known to change its color. While milky white, pink, or light blue are considered auspicious, shades of black or dark red are said to signal troubled times for the valley. The temple is the most important spiritual site for the Kashmiri Pandit community, who gather here in thousands for the Zyestha Ashtami festival. The name Kshir Bhawani comes from the tradition of offering Kheer (rice pudding) and milk to the Goddess in the spring.",
        "spiritualArchitecture": "The temple is a simple but beautiful structure made of white marble, situated in the middle of a large hexagonal spring. The architecture is a blend of traditional Kashmiri styles and modern marble work. The main shrine is a small, ornate canopy under which the Goddess is worshipped. The complex is surrounded by massive, ancient Chinar trees that provide a sense of timeless protection. The layout is designed to allow pilgrims to circumambulate the spring while making their offerings of milk and flowers.",
        "vedicReferences": "Kshir Bhawani is celebrated in the Rajatarangini and various local Kashmiri spiritual texts. It is considered a primary site for the worship of the Devi in her peaceful form.",
        "deepInsights": "The color-changing spring represents the dynamic nature of the divine presence in our lives. Kshir Bhawani teaches that the Mother communicates with her children through the elements of nature.",
        "ancientLore": "Lore tells that when Hanuman brought the Goddess to Kashmir, she first settled in the village of Shadipora before moving to the present site at Tulmulla. Another legend says that the spring appeared in a dream to a local priest, leading to its discovery.",
        "keyRituals": [
                {
                        "name": "Kheer Offering",
                        "description": "Offering milk and rice pudding into the sacred spring to please the Goddess."
                },
                {
                        "name": "Zyestha Ashtami",
                        "description": "The grand annual festival where thousands of Kashmiri Pandits return to the valley to pray."
                },
                {
                        "name": "Evening Aarti",
                        "description": "The prayer performed as the sun sets behind the massive Chinar trees."
                }
        ],
        "highlights": [
                {
                        "name": "The Sacred Spring",
                        "description": "The mystical water body that changes color according to the region''s destiny."
                },
                {
                        "name": "Ancient Chinar Trees",
                        "description": "Massive trees surrounding the temple, some said to be centuries old."
                },
                {
                        "name": "White Marble Shrine",
                        "description": "The elegant central canopy standing in the heart of the spring."
                }
        ],
        "travelInfo": {
                "bestTime": "May to October (especially during Zyestha Ashtami).",
                "howToReach": "25km from Srinagar, well connected by road. Regular taxis are available from Srinagar.",
                "nearestAirport": "Srinagar Airport.",
                "nearestRailway": "Srinagar Railway Station (local) / Jammu Tawi (main)."
        },
        "tips": [
                "Maintain silence and respect the sensitive security and spiritual environment of the valley.",
                "Visit in the early morning for the most peaceful experience.",
                "Be prepared for security checks as it is a highly protected site."
        ],
        "faqs": [
                {
                        "question": "Does the water really change color?",
                        "answer": "Yes, it is a documented phenomenon where the spring takes on different hues; pilgrims observe this closely to predict future events."
                },
                {
                        "question": "Why is milk offered to the spring?",
                        "answer": "It is the traditional offering to the Goddess Ragnya Devi, hence the name ''Kshir'' (Milk) Bhawani."
                },
                {
                        "question": "Is it safe to visit?",
                        "answer": "The temple is highly protected and remains a peaceful oasis in the valley; check local travel advisories before visiting."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Martand Sun Temple', 
    'martand-sun-temple', 
    'Sacred Destination', 
    'jk', 
    'The ruins of the Martand Sun Temple are a testament to the grand spiritual and architectural past of Kashmir. Built in the 8th century by Lalitaditya Muktapida, it was once a colossal shrine dedicated to Surya, the Sun God, standing on a plateau with views of the entire valley.', 
    '115.2', 
    '105.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Golden Ruins of the Solar Dynasty', 
    'Martand Sun Temple Ruins | Kashmir, Surya Lore & Ancient Lore', 
    'Explore the majestic ruins of the Martand Sun Temple. Discover the 8th-century Chola-style architecture, the legend of Lalitaditya, and the solar alignment of this ancient masterpiece.', 
    'Martand Sun Temple, Kashmir, Surya, Lalitaditya, Hindu Pilgrimage, Ancient Lore, Ruins, Anantnag', 
    '73', 
    '{
        "spiritualEssence": "Martand is the manifestation of the divine as the fading yet resilient light of the past. The energy here is melancholic, grand, and intensely powerful. It is a site where the sun continues to worship even in the absence of an idol. The vibration is one of the persistence of the sacred through the passage of empires. As a ruined temple, it represents the transience of form and the permanence of the divine source (Surya). A visit here is believed to grant the devotee the strength to rebuild their inner temple from the ruins of the past. The air is always vibrant with the wind of the plateau and the silent echoes of the massive stone blocks.",
        "longDescription": "The Martand Sun Temple was built by King Lalitaditya of the Karkota dynasty between 724 and 760 CE. It was designed to be one of the largest and most magnificent temples in the world, combining Gandharan, Greek, and Indian architectural styles. The temple was dedicated to Martand (the Sun). It was systematically destroyed in the 15th century during the reign of Sikandar Butshikan. Despite being in ruins, the massive colonnades, the central shrine, and the 84 smaller shrines that surround the courtyard still evoke a sense of awe. The temple is situated on a plateau near Anantnag, offering a 360-degree view of the Kashmir valley. It remains a primary site of archaeological and spiritual interest, representing the peak of the medieval Kashmiri civilization.",
        "spiritualArchitecture": "The architecture is characterized by its massive scale and the use of massive limestone blocks. It features a large central shrine (Vimana) surrounded by a courtyard with 84 smaller shrines, representing the days in the week or the cycles of time. The architecture is a unique blend of Gandharan (influenced by Greek) and traditional Hindu styles, with trefoil arches and fluted columns. The temple was designed such that the first rays of the sun would fall on the idol of Surya. The ruins today show the incredible precision of the 8th-century stonemasons who created this solar palace.",
        "vedicReferences": "Martand is another name for Surya, mentioned in the Rig Veda. The temple represents the ancient Indian commitment to solar worship and the cosmic order (Rta).",
        "deepInsights": "The 84 shrines represent the divisions of the year and the cycles of the sun. Martand teaches that even when the form is broken, the light that the form was built to catch remains eternal.",
        "ancientLore": "Lore tells that the temple was so grand that its golden canopy could be seen from miles away. Another legend says that King Lalitaditya used secret spiritual powers to move the massive stones to the plateau.",
        "keyRituals": [
                {
                        "name": "Surya Namaskar",
                        "description": "Devotees and visitors often perform sun salutations amidst the ruins at dawn."
                },
                {
                        "name": "Archaeological Prayer",
                        "description": "The silent meditation on the transience of time and the greatness of ancient builders."
                },
                {
                        "name": "Solar Observation",
                        "description": "Observing the alignment of the sun with the temple ruins during the equinoxes."
                }
        ],
        "highlights": [
                {
                        "name": "Central Shrine Ruins",
                        "description": "The massive remains of the once-towering solar altar."
                },
                {
                        "name": "Colonnaded Courtyard",
                        "description": "The 84 shrines and the fluted columns that still stand against the sky."
                },
                {
                        "name": "Plateau View",
                        "description": "The spectacular 360-degree view of the Kashmir valley from the temple site."
                }
        ],
        "travelInfo": {
                "bestTime": "April to October.",
                "howToReach": "60km from Srinagar and 10km from Anantnag, well connected by road.",
                "nearestAirport": "Srinagar Airport.",
                "nearestRailway": "Anantnag Railway Station (local)."
        },
        "tips": [
                "Visit at sunrise or sunset for the most dramatic lighting of the ruins.",
                "Wear comfortable walking shoes as the plateau is rocky and vast.",
                "Hire a local guide to understand the complex architectural history of the site."
        ],
        "faqs": [
                {
                        "question": "Who destroyed the temple?",
                        "answer": "It was systematically destroyed in the 15th century by the ruler Sikandar Butshikan."
                },
                {
                        "question": "Is it a functioning temple?",
                        "answer": "No, it is an archaeological site, though many spiritual seekers visit for meditation and sun worship."
                },
                {
                        "question": "Can I take photos?",
                        "answer": "Yes, it is one of the most photographed archaeological sites in India; photography is permitted."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Mantralayam', 
    'mantralayam', 
    'Sacred Destination', 
    'ap', 
    'The abode of the great Madhva saint Sri Raghavendra Swami, Mantralayam is located on the banks of the Tungabhadra river. It is where the saint entered Jeeva Samadhi (living samadhi) in 1671, promising to bless his devotees from the Brindavan for 700 years.', 
    '230.2', 
    '590.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Living Presence of the Compassionate Saint', 
    'Mantralayam Raghavendra Swamy | Tungabhadra, Brindavan & Lore', 
    'Experience the spiritual peace of Mantralayam. Discover the Jeeva Samadhi of Sri Raghavendra Swami, the legend of the 700-year promise, and the profound traditions of the Madhva line.', 
    'Mantralayam, Raghavendra Swami, Andhra Pradesh, Tungabhadra, Hindu Pilgrimage, Ancient Lore, Samadhi', 
    '75', 
    '{
        "spiritualEssence": "Mantralayam is the manifestation of the divine as the compassionate protector and the teacher. The energy here is gentle, disciplined, and intensely reassuring. It is the site where the bridge between the physical and the subtle world is permanently established. The vibration is one of ''Guru Sarvabhouma'' (The Supreme King of Teachers). As a riverside shrine, it represents the constant flow of grace. A visit here is believed to grant the devotee the same protection that the saint gave to his disciples during his lifetime. The air is always vibrant with the sound of the Tungabhadra and the chanting of the ''Raghavendra Stotra''. It is a site where the promise of the Guru is felt in every breath.",
        "longDescription": "Sri Raghavendra Swami was a 17th-century saint and philosopher of the Madhva tradition. He is revered as an incarnation of Prahlada. After a life of miracles and scholarly work, he chose Mantralayam for his Jeeva Samadhi. He personally supervised the construction of his Brindavan (tomb) and entered it while still alive, continuing his meditation inside. He left a message that he would remain present in the Brindavan in a subtle form for 700 years to guide humanity. Mantralayam has since become a major pilgrimage center, attracting people from all over India, regardless of their caste or religion. The site is known for its discipline, the quality of its Vedic studies, and the massive free meals (Anna Dana) served to thousands of pilgrims every day.",
        "spiritualArchitecture": "The temple complex is built in the traditional South Indian style with white marble and granite. The central shrine houses the Brindavan of Sri Raghavendra Swami, which is worshipped daily. The architecture is characterized by its cleanliness and order. The complex includes several halls for prayer and Vedic chanting, a large dining hall, and multiple guesthouses. The temple is situated right on the banks of the Tungabhadra, with beautiful stone steps leading down to the water. The use of modern materials like marble has been integrated with ancient stone construction to create a serene and durable spiritual center.",
        "vedicReferences": "Mantralayam is a primary center for the Dvaita philosophy of Sri Madhvacharya, which teaches the distinction between the soul and the supreme divine.",
        "deepInsights": "The Jeeva Samadhi represents the triumph of the spirit over the body. Mantralayam teaches that the Guru''s grace is not limited by physical presence or the passage of time.",
        "ancientLore": "Lore tells that even the Mughal Emperor Aurangzeb''s officials were convinced of the Swami''s power after witnessing a miracle here. Another legend says that the stones for the Brindavan were personally selected by the Swami for their spiritual resonance.",
        "keyRituals": [
                {
                        "name": "Brindavan Darshan",
                        "description": "The ritual of circumambulating the sacred tomb of the saint."
                },
                {
                        "name": "Anna Dana",
                        "description": "The massive daily ritual of feeding thousands of pilgrims for free."
                },
                {
                        "name": "Panchamrut Abhishekam",
                        "description": "The ritual bathing of the Brindavan with five sacred substances."
                }
        ],
        "highlights": [
                {
                        "name": "Raghavendra Swamy Brindavan",
                        "description": "The central sacred tomb where the saint resides in Jeeva Samadhi."
                },
                {
                        "name": "Tungabhadra River",
                        "description": "The sacred river flowing beside the temple, used for ritual baths."
                },
                {
                        "name": "Panchamukhi Anjaneya",
                        "description": "A nearby temple dedicated to the five-faced Hanuman, where the Swami meditated."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by rail and road from Bangalore and Hyderabad. Mantralayam Road is the nearest railway station (15km away).",
                "nearestAirport": "Hyderabad Airport / Bangalore International Airport.",
                "nearestRailway": "Mantralayam Road Railway Station."
        },
        "tips": [
                "Follow the traditional dress code: Men should wear a Dhoti and women should wear a Saree or long skirt.",
                "Try to attend the evening Aarti when the entire Brindavan is beautifully decorated.",
                "Visit the Panchamukhi temple located about 20km away for a complete experience."
        ],
        "faqs": [
                {
                        "question": "What is Jeeva Samadhi?",
                        "answer": "It is a state where a saint enters a tomb while still alive, remaining in a deep meditative state to bless devotees for centuries."
                },
                {
                        "question": "Can I get free food there?",
                        "answer": "Yes, the temple provides free meals (Anna Dana) to all pilgrims every day in its massive dining hall."
                },
                {
                        "question": "How far is the railway station?",
                        "answer": "The Mantralayam Road station is about 15 kilometers from the temple; regular buses and autos are available."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Sringeri', 
    'sringeri', 
    'Spiritual City', 
    'ka', 
    'The site of the first of the four Amnaya Peethams established by Adi Shankaracharya, Sringeri is located on the banks of the Tunga river in the Western Ghats. It is a site of supreme Vedantic learning and the abode of Goddess Sharadamba.', 
    '150.5', 
    '540.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Seat of Universal Wisdom and Harmony', 
    'Sringeri Sharada Peetham | Tunga River, Shankara Lore & Ancient Lore', 
    'Experience the profound wisdom of Sringeri. Discover the Sharada temple, the architectural marvel of the Vidyashankara temple, and the legacy of the first Peetham.', 
    'Sringeri, Sharada Peetham, Karnataka, Adi Shankara, Tunga River, Hindu Pilgrimage, Ancient Lore, Vedanta', 
    '76', 
    '{
        "spiritualEssence": "Sringeri is the manifestation of the divine as absolute knowledge (Jnana) and peace. The energy here is intellectual, serene, and deeply rooted in the Advaita tradition. It is the site where the first pillar of Shankara''s spiritual revival was placed. The vibration is one of ''Aham Brahmasmi'' (I am the Divine). As a riverside town in the rainforests, it represents the harmony between the human mind and nature. A visit here is believed to grant the devotee the clarity of thought and the blessing of the Goddess of Wisdom. The air is always vibrant with the sound of the Tunga river and the chanting of the Vedas from the traditional Gurukuls.",
        "longDescription": "The history of Sringeri begins with Adi Shankaracharya in the 8th century. Legend says he chose this spot because he saw a cobra protecting a frog from the sun with its hood, signifying a place where even natural enemies lived in harmony. He established the Sharada Peetham here, dedicated to the Goddess of Knowledge. The city is home to the spectacular Vidyashankara temple, built in the 14th century, which is an architectural marvel of the Vijayanagara period. Sringeri remains the primary center for the study of Advaita Vedanta and is led by a line of illustrious Jagadgurus. The town is a perfect blend of a pilgrimage center and a center for higher Vedic learning, maintaining a tradition of over 1200 years without interruption.",
        "spiritualArchitecture": "The architecture of Sringeri is a display of both ancient and medieval styles. The Vidyashankara temple is unique, featuring 12 pillars (the Zodiac pillars) designed such that the sun''s rays fall on a specific pillar according to the month of the year. It is built entirely of stone and is a mix of Hoysala and Vijayanagara styles. The Sharada temple is a beautiful structure with a golden idol of the Goddess. The complex includes the Guru Niwas, where the Jagadguru stays, and several traditional Gurukuls. The Tunga river bridge and the stone steps (ghats) are integral parts of the temple layout, creating a seamless connection between the shrine and the sacred water.",
        "vedicReferences": "Sringeri is the primary site for the study of the Yajur Veda and the Advaita philosophy as taught by Shankara. It is mentioned in various Sanskrit works as the Dakshinamnaya Peetham.",
        "deepInsights": "The cobra and the frog legend represents the state of ''Samatvam'' (equanimity) that one reaches through wisdom. Sringeri teaches that true knowledge leads to universal peace and the cessation of all conflict.",
        "ancientLore": "Lore tells that Adi Shankara brought the idol of Sharada from Kashmir to Sringeri, and it became fixed here. Another legend says that the sage Rishyashringa performed penance here, which brought rain to a drought-stricken kingdom, giving the town its name.",
        "keyRituals": [
                {
                        "name": "Sharada Navratri",
                        "description": "The grand 10-day festival celebrating the Goddess of Wisdom with Vedic chanting and processions."
                },
                {
                        "name": "Jagadguru Darshan",
                        "description": "The ritual of seeking the blessings and guidance of the current head of the Peetham."
                },
                {
                        "name": "Tunga River Fish Feeding",
                        "description": "The unique tradition of feeding the sacred fish in the river, which are protected by the temple."
                }
        ],
        "highlights": [
                {
                        "name": "Vidyashankara Temple",
                        "description": "The 14th-century astronomical and architectural marvel with 12 zodiac pillars."
                },
                {
                        "name": "Sharada Temple",
                        "description": "The main shrine dedicated to the Goddess of Knowledge."
                },
                {
                        "name": "The Tunga River",
                        "description": "The sacred river flowing through the heart of the temple complex, home to sacred fish."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road from Mangalore (100km) and Bangalore. The nearest railway station is Shimoga or Birur.",
                "nearestAirport": "Mangalore International Airport.",
                "nearestRailway": "Shimoga Railway Station / Birur Junction."
        },
        "tips": [
                "Visit the Vidyashankara temple at noon to see the astronomical alignment of the pillars.",
                "Feed the fish in the Tunga river as it is considered an auspicious act of compassion.",
                "Check the Jagadguru''s schedule if you wish to have a personal audience or attend a lecture."
        ],
        "faqs": [
                {
                        "question": "Who founded Sringeri?",
                        "answer": "It was founded by the great philosopher Adi Shankaracharya in the 8th century CE."
                },
                {
                        "question": "What are the zodiac pillars?",
                        "answer": "These are 12 pillars in the Vidyashankara temple that correspond to the 12 signs of the zodiac; the sun''s rays fall on the pillar of the current month."
                },
                {
                        "question": "Is it a good place for meditation?",
                        "answer": "Yes, the peaceful riverside environment and the high-vibrational energy make it one of the best sites for silent contemplation."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Belur Math', 
    'belur-math', 
    'Sacred Destination', 
    'wb', 
    'The headquarters of the Ramakrishna Math and Mission, Belur Math is located on the banks of the Hooghly river near Kolkata. Founded by Swami Vivekananda, it is a site of universal religion, blending Hindu, Christian, and Islamic architectural elements to symbolize the harmony of all faiths.', 
    '720.5', 
    '380.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Temple of Universal Harmony', 
    'Belur Math Kolkata | Ramakrishna Mission, Vivekananda & Lore', 
    'Experience the profound peace of Belur Math. Discover the message of Sri Ramakrishna, the visionary architecture of Swami Vivekananda, and the global mission of selfless service.', 
    'Belur Math, Kolkata, Ramakrishna Mission, Swami Vivekananda, Hindu Pilgrimage, Ancient Lore, West Bengal, Peace', 
    '77', 
    '{
        "spiritualEssence": "Belur Math is the manifestation of the divine as the unity of all religions and the service of man as God. The energy here is serene, expansive, and intensely intellectual. It is the site where the ancient ideals of the Vedas were modernized for the contemporary world. The vibration is one of ''Atmano Mokshartham Jagat Hitaya Cha'' (For one''s own salvation and for the welfare of the world). As a riverside math, it represents the meeting of the sacred with the social. A visit here is believed to grant the devotee a broad, universal vision of the divine. The air is always vibrant with the sound of the Ganga and the silent, disciplined energy of the monks who have dedicated their lives to humanity.",
        "longDescription": "Belur Math was founded in 1898 by Swami Vivekananda, the foremost disciple of Sri Ramakrishna Paramahamsa. The site was chosen to serve as the heart of a global movement for spiritual and social upliftment. The main temple is a unique architectural masterpiece that combines elements of a cathedral, a mosque, and a temple, reflecting Sri Ramakrishna''s teaching that all religions lead to the same goal. The complex houses the mortal remains of Sri Ramakrishna, Sarada Devi, and Swami Vivekananda. Belur Math is not just a place of prayer but the administrative center for hundreds of centers worldwide that manage schools, hospitals, and relief work. It is a site where the highest philosophy is practiced through the humblest service.",
        "spiritualArchitecture": "The architecture of Belur Math is a deliberate blend of multiple traditions. From certain angles, the main temple looks like a mosque; from others, like a Gothic cathedral or a traditional Hindu temple. It features a massive central dome, ornate pillars, and a spacious prayer hall without any idols, reflecting the formless nature of the ultimate reality. The architecture was personally designed by Swami Vivekananda and refined by an English architect. The use of light brown stone and the integration with the riverside gardens create a sense of celestial peace and universal belonging.",
        "vedicReferences": "Belur Math is the center for the study of the Neo-Vedanta philosophy, which applies the ancient insights of the Upanishads to the practical problems of modern life.",
        "deepInsights": "The fusion of architectural styles represents the ''Jato Mat Tato Path'' (As many faiths, so many paths) teaching of Ramakrishna. Belur Math teaches that true religion is the manifestation of the divinity already in man.",
        "ancientLore": "Lore tells that Swami Vivekananda personally selected the site and predicted that it would become a great center of light for the whole world. Another legend says that the spirit of Sri Ramakrishna is felt most intensely during the evening prayers in the main hall.",
        "keyRituals": [
                {
                        "name": "Sandhya Aarti",
                        "description": "The beautiful evening ritual of lamps and devotional singing, famous for its deep meditative atmosphere."
                },
                {
                        "name": "Ramakrishna Birth Anniversary",
                        "description": "The grand annual celebration attracting thousands of people of all faiths."
                },
                {
                        "name": "Durga Puja at Belur Math",
                        "description": "The unique celebration of the Goddess, including the Kumari Puja where a young girl is worshipped as the Devi."
                }
        ],
        "highlights": [
                {
                        "name": "Sri Ramakrishna Temple",
                        "description": "The main universal temple and the heart of the Belur Math complex."
                },
                {
                        "name": "Swami Vivekananda''s Room",
                        "description": "The preserved room where the great saint lived and left his physical form."
                },
                {
                        "name": "The Hooghly River Banks",
                        "description": "The peaceful stone steps where the monks and visitors meditate by the sacred water."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Located in Howrah, well connected by road and ferry from Kolkata. Regular ferries run from Dakshineswar to Belur Math.",
                "nearestAirport": "Netaji Subhash Chandra Bose International Airport, Kolkata.",
                "nearestRailway": "Howrah Junction / Belur Railway Station."
        },
        "tips": [
                "Take the ferry from Dakshineswar to Belur Math for a beautiful and traditional experience of the river.",
                "Maintain absolute silence in the main prayer hall and during the evening Aarti.",
                "Visit the museum to see the personal belongings of the great masters of the mission."
        ],
        "faqs": [
                {
                        "question": "Who founded Belur Math?",
                        "answer": "It was founded by Swami Vivekananda in 1898 as the headquarters of the Ramakrishna Mission."
                },
                {
                        "question": "Can non-Hindus visit?",
                        "answer": "Yes, Belur Math is dedicated to the harmony of all religions and welcomes everyone regardless of their faith."
                },
                {
                        "question": "How to reach from Kolkata?",
                        "answer": "You can take a taxi, a local train to Belur station, or the popular ferry service from Dakshineswar or Kutighat."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Konark Sun Temple', 
    'konark-sun-temple', 
    'Sacred Destination', 
    'or', 
    'The ''Black Pagoda'' of Konark is a 13th-century architectural marvel designed as a colossal chariot for the Sun God, Surya. A UNESCO World Heritage site, it represents the absolute pinnacle of Kalinga stone artistry and astronomical precision.', 
    '660.2', 
    '430.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Chariot of the Eternal Light', 
    'Konark Sun Temple | Odisha, Black Pagoda, Surya Lore & Ancient Lore', 
    'Explore the architectural majesty of Konark. Discover the 24 stone wheels, the legend of the magnetic idol, and the profound solar symbolism of the Black Pagoda.', 
    'Konark, Sun Temple, Odisha, Surya, Black Pagoda, UNESCO, Hindu Pilgrimage, Ancient Lore, Kalinga', 
    '78', 
    '{
        "spiritualEssence": "Konark is the manifestation of the divine as the cosmic rhythm and the power of time. The energy here is grand, solar, and intensely precise. It is the site where the sun''s journey is frozen in stone. The vibration is one of ''Surya-Vijnana'' (the science of the sun). As a temple designed as a chariot, it represents the soul''s journey across the heavens. A visit here is believed to grant the devotee the clarity of the sun and the alignment with the cosmic cycles. The air is always vibrant with the sound of the nearby Bay of Bengal and the silent, mathematical perfection of the stone wheels that act as sundials.",
        "longDescription": "Built in the 13th century by King Narasimhadeva I of the Eastern Ganga Dynasty, Konark is one of the most famous temples in India. The entire temple is designed as a massive chariot for Lord Surya, featuring 24 intricately carved stone wheels and pulled by seven horses, representing the days of the week. The temple was originally built at the mouth of the Chandrabhaga river. It was called the ''Black Pagoda'' by European sailors due to its dark color and magnetic power that allegedly drew ships toward the shore. Although the main sanctum has collapsed, the surviving audience hall (Jagamohana) and the dancing hall (Nata Mandira) remain breathtaking. The stone carvings cover every inch of the temple, depicting everything from celestial beings to daily life and the famous erotic sculptures that represent the union of the soul with the divine.",
        "spiritualArchitecture": "The temple is the ultimate expression of Kalinga architecture. It features a massive stone platform with 12 pairs of wheels, each 10 feet in diameter. The wheels are famous for their precision as sundials, capable of telling time to the minute. The architecture is designed such that the first rays of the sun would pass through the main entrance and fall on the diamond placed on the head of the deity in the inner sanctum. The temple is built of Khondalite rocks and is held together by massive iron beams. The sculptures are noted for their dynamic movement and anatomical precision, especially the seven horses that seem to be leaping forward into the sky.",
        "vedicReferences": "Konark is celebrated in the Brahma Purana and the Samba Purana, which tells the story of Krishna''s son Samba who built a temple for the sun here to be cured of leprosy.",
        "deepInsights": "The 24 wheels represent the 24 fortnights of the year, and the seven horses represent the seven colors of light. Konark teaches that the divine is the motor of time and the source of all energy.",
        "ancientLore": "Lore tells that a massive magnet was placed at the top of the temple, which kept the idol suspended in the air. Another legend says that the temple was completed by a 12-year-old boy named Dharmapada, who sacrificed his life to save the honor of 1200 stonemasons.",
        "keyRituals": [
                {
                        "name": "Konark Dance Festival",
                        "description": "The grand annual cultural celebration where world-class Odissi dancers perform against the backdrop of the temple."
                },
                {
                        "name": "Chandrabhaga Mela",
                        "description": "The massive gathering on the seventh day of the bright half of Magha, where devotees bathe in the sacred river."
                },
                {
                        "name": "Surya Puja",
                        "description": "The ritual offering of water and prayers to the sun at dawn amidst the ruins."
                }
        ],
        "highlights": [
                {
                        "name": "Stone Wheels",
                        "description": "The 24 massive wheels that act as precise sundials."
                },
                {
                        "name": "Nata Mandira",
                        "description": "The pillared dancing hall featuring spectacular carvings of musicians and dancers."
                },
                {
                        "name": "Colossal Statues",
                        "description": "The massive stone elephants and lions that guard the temple entrance."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "35km from Puri and 65km from Bhubaneswar, well connected by the Marine Drive. The nearest major airport is Bhubaneswar.",
                "nearestAirport": "Biju Patnaik International Airport, Bhubaneswar.",
                "nearestRailway": "Puri Railway Station / Bhubaneswar Junction."
        },
        "tips": [
                "Visit in the early morning to see the sun light up the stone carvings.",
                "Hire a government-certified guide to understand the complex sundial mechanism of the wheels.",
                "Combine your visit with the serene Chandrabhaga beach located nearby."
        ],
        "faqs": [
                {
                        "question": "Can I enter the main temple?",
                        "answer": "The main audience hall is currently sealed for preservation, but you can explore the entire exterior and the surrounding structures."
                },
                {
                        "question": "How do the wheels tell time?",
                        "answer": "The shadow of the central axle falls on the carved spokes, which act as markers for specific times of the day."
                },
                {
                        "question": "Is there an entry fee?",
                        "answer": "Yes, there is a nominal entry fee for Indian citizens and a higher fee for international visitors."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Lingaraj Temple', 
    'lingaraj-temple', 
    'Spiritual City', 
    'or', 
    'The crown jewel of Bhubaneswar, the ''City of Temples,'' Lingaraj is dedicated to Lord Harihara—a unique combination of Shiva and Vishnu. Built in the 11th century, it is the largest and most sacred temple in the city, representing the absolute peak of Odishan architecture.', 
    '655.5', 
    '425.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Majestic Confluence of Hari and Hara', 
    'Lingaraj Temple Bhubaneswar | Odisha, Harihara & Ancient Lore', 
    'Discover the spiritual grandeur of the Lingaraj temple. Explore the 180-foot deul, the sacred Bindu Sagar tank, and the unique worship of Shiva and Vishnu as one.', 
    'Lingaraj Temple, Bhubaneswar, Odisha, Harihara, Lord Shiva, Lord Vishnu, Hindu Pilgrimage, Ancient Lore, Kalinga', 
    '79', 
    '{
        "spiritualEssence": "Lingaraj is the manifestation of the divine as the supreme synthesis. The energy here is grand, stable, and intensely powerful. It is the site where the apparent division between Shaivism and Vaishnavism is dissolved into the unified form of Harihara. The vibration is one of ''Samatva'' (Equanimity) and the realization that all paths lead to the same truth. As the center of the ''Ekamra Kshetra,'' the vibration is one of ancient, concentrated spiritual power. A visit here is believed to grant the devotee the same merit as visiting all the sacred sites of India. The air is always vibrant with the scent of the Bindu Sagar and the chanting of the Shiva Sahasranama mixed with Vishnu hymns.",
        "longDescription": "Built in the 11th century by King Jajati Keshari, the Lingaraj temple is the most prominent landmark of Bhubaneswar. The temple is dedicated to Tribhuvaneswara (the Lord of the Three Worlds). The main deity is a Swayambhu (self-manifested) lingam that is worshipped as both Shiva and Vishnu (Harihara). The temple complex is massive, housing over 50 smaller shrines within its high walls. The main tower (Deul) stands 180 feet tall and is visible from miles away. The temple is famous for its strict adherence to traditional rituals and its association with the Bindu Sagar tank, which is said to contain drops of water from all the sacred rivers of India. Lingaraj is the heart of the Ekamra Kshetra (the mango forest), which has been a major spiritual hub for over 2000 years.",
        "spiritualArchitecture": "The temple is the supreme example of the mature Kalinga style. It features four distinct structures: the Vimana (sanctum), the Jagamohana (audience hall), the Nata Mandira (dancing hall), and the Bhoga Mandapa (offering hall). The architecture is characterized by its vertical soaring lines and the incredibly detailed carvings of deities, dancers, and flora. The 180-foot tower is a masterpiece of stone engineering, designed with a slight curve that gives it a sense of dynamic energy. The use of dark sandstone and the precision of the carvings make it one of the most beautiful temples in India.",
        "vedicReferences": "Lingaraj is celebrated in the Ekamra Purana and various Odishan spiritual texts. It is considered one of the primary seats of Shiva in Eastern India.",
        "deepInsights": "The worship of Harihara teaches that the creative (Brahma/Vishnu) and destructive (Shiva) forces of the universe are two sides of the same coin. Lingaraj teaches that true wisdom is the ability to see unity in diversity.",
        "ancientLore": "Lore tells that Goddess Parvati defeated the demons Kirti and Vasa at this spot, and Lord Shiva created the Bindu Sagar tank to quench her thirst. Another legend says that the temple was originally located in a forest of a single mango tree, hence the name Ekamra.",
        "keyRituals": [
                {
                        "name": "Rukuna Rath Yatra",
                        "description": "The grand annual chariot festival of Lord Lingaraj held on the day of Ashokashtami."
                },
                {
                        "name": "Bindu Sagar Snan",
                        "description": "The ritual bath in the sacred tank, believed to contain water from all holy rivers."
                },
                {
                        "name": "Mahashivratri",
                        "description": "The most important festival where the entire temple is illuminated and a massive lamp (Mahadipa) is lit on the spire."
                }
        ],
        "highlights": [
                {
                        "name": "Main Deul",
                        "description": "The 180-foot tall tower, a masterpiece of Kalinga architecture."
                },
                {
                        "name": "Bindu Sagar Tank",
                        "description": "The massive sacred tank located just outside the temple complex."
                },
                {
                        "name": "Bhoga Mandapa",
                        "description": "The hall where 56 types of offerings (Mahaprasad) are prepared for the Lord."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Located in the heart of Bhubaneswar, well connected by air, rail, and road.",
                "nearestAirport": "Biju Patnaik International Airport, Bhubaneswar.",
                "nearestRailway": "Bhubaneswar Railway Station."
        },
        "tips": [
                "Non-Hindus are not allowed inside the main temple, but there is a viewing platform that offers a spectacular view of the complex.",
                "Visit the Bindu Sagar tank and the nearby Ananta Vasudeva temple for a complete experience of the Ekamra Kshetra.",
                "Respect the local dress code and the traditional protocols of the temple."
        ],
        "faqs": [
                {
                        "question": "Who can enter the temple?",
                        "answer": "As per long-standing tradition, entry to the inner complex is restricted to Hindus only."
                },
                {
                        "question": "What is Harihara?",
                        "answer": "It is a unified form of Lord Vishnu (Hari) and Lord Shiva (Hara), representing their non-dual nature."
                },
                {
                        "question": "How old is the temple?",
                        "answer": "The current structure dates back to the 11th century CE, though the site has been sacred for much longer."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Tara Tarini Temple', 
    'tara-tarini-temple', 
    'Sacred Destination', 
    'or', 
    'Located on the Kumari hills on the banks of the Rishikulya river, Tara Tarini is one of the four major Shakti Peeths in India. It is where the breasts of Sati fell, making it a site of immense maternal and creative power, worshipped as twin goddesses.', 
    '640.2', 
    '410.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Twin Goddesses of the Kumari Hill', 
    'Tara Tarini Temple | Odisha, Twin Shakti Peeth & Ancient Lore', 
    'Experience the spiritual power of Tara Tarini. Discover the twin goddesses, the legend of the breasts of Sati, and the profound energy of the Rishikulya river pilgrimage.', 
    'Tara Tarini, Odisha, Shakti Peeth, Goddess Durga, Twin Goddesses, Hindu Pilgrimage, Ancient Lore, Ganjam', 
    '80', 
    '{
        "spiritualEssence": "Tara Tarini is the manifestation of the divine as the dual power of nurturing and protection. The energy here is soft, powerful, and intensely maternal. It is the site where the heart of maternal sacrifice (the breasts) was grounded. The vibration is one of ''Karuna'' (Compassion) and the infinite sustenance of the universe. As a hill temple overlooking a river, it represents the elevated state of the nurturing spirit. A visit here is believed to grant the devotee the same protection and love that a mother gives to her twin children. The air is always vibrant with the breeze of the Rishikulya and the scent of the sandalwood paste offered to the twin deities.",
        "longDescription": "The Tara Tarini temple is situated on a hill 708 feet high near Berhampur. It is considered the Adi Shakti Peeth, one of the four most sacred seats of the Goddess. The main deities are two stone idols decorated with silver ornaments and silk, representing the sisters Tara and Tarini. The temple has been a major center for Tantric worship for centuries. The site is famous for the Chaitra Mela, held on every Tuesday of the month of Chaitra, when hundreds of thousands of pilgrims climb the 999 steps to seek the blessings of the twin goddesses. The temple has recently been rebuilt in the classic Kalinga style using modern khondalite stone, creating a grand spiritual citadel on the hill.",
        "spiritualArchitecture": "The new temple is a grand structure built in the Rekha Deul style of Odisha. It features intricate stone carvings depicting various forms of the Goddess and scenes from the Puranas. The hilltop location is accessible via a steep road, a ropeway, and a traditional path of 999 steps. The architecture is designed to offer panoramic views of the surrounding plains and the winding Rishikulya river. The complex includes several mandapams for rituals and resting spots for pilgrims, perfectly integrated with the natural beauty of the Kumari hill.",
        "vedicReferences": "Tara Tarini is mentioned in the Kalika Purana and the Ashtashakti as a primary seat of the Goddess. It is traditionally linked to the Buddhist tradition of Tara as well.",
        "deepInsights": "The twin goddesses represent the two aspects of nature—the nurturing and the liberating. Tara Tarini teaches that the divine mother is always present in multiple forms to support her children.",
        "ancientLore": "Lore tells that the Goddesses appeared as two young girls to a childless Brahmin named Basu Praharaj and lived with him as his daughters before revealing their divine nature. Another legend says that the site was originally a center for ancient maritime travelers who prayed for a safe journey.",
        "keyRituals": [
                {
                        "name": "Chaitra Mangalabara Mela",
                        "description": "The massive festivals held on Tuesdays in the month of Chaitra, featuring unique rituals and fairs."
                },
                {
                        "name": "Mundana (Tonsuring)",
                        "description": "A very popular ritual where children''s first hair is offered to the Goddesses for their protection."
                },
                {
                        "name": "Rishikulya Snan",
                        "description": "Taking a ritual bath in the sacred river at the foot of the hill before the climb."
                }
        ],
        "highlights": [
                {
                        "name": "Twin Goddess Idols",
                        "description": "The ancient stone images of Tara and Tarini, decorated with silver."
                },
                {
                        "name": "The 999 Steps",
                        "description": "The traditional pilgrim path leading to the hilltop shrine."
                },
                {
                        "name": "Tara Tarini Ropeway",
                        "description": "A modern facility offering spectacular views of the Ganjam district."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and during Chaitra Mela in March/April).",
                "howToReach": "30km from Berhampur, well connected by road. Berhampur is a major railway station in South Odisha.",
                "nearestAirport": "Biju Patnaik International Airport, Bhubaneswar.",
                "nearestRailway": "Berhampur Railway Station."
        },
        "tips": [
                "Visit on a Tuesday if you wish to see the temple in its full ritual vibrant state.",
                "Use the ropeway for an easy ascent and the steps for the descent to enjoy the landscape.",
                "Combine your visit with the nearby Gopalpur-on-Sea beach."
        ],
        "faqs": [
                {
                        "question": "Why are there two goddesses?",
                        "answer": "They are worshipped as twin sisters, representing the dual power of the primordial Goddess."
                },
                {
                        "question": "How many steps are there?",
                        "answer": "There are approximately 999 stone steps to reach the hilltop temple."
                },
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the four major (Adi) Shakti Peeths where the breasts of Sati are said to have fallen."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Belur (Chennakeshava)', 
    'belur-chennakeshava', 
    'Sacred Destination', 
    'ka', 
    'The Chennakeshava Temple at Belur is the absolute pinnacle of Hoysala stone artistry. Built in 1117 CE to celebrate a military victory, it is a site where granite was carved like ivory, creating a temple of such intricate beauty that it took 103 years to complete.', 
    '155.5', 
    '520.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Handsome Lord in a Palace of Stone', 
    'Belur Chennakeshava Temple | Karnataka, Hoysala Lore & Ancient Lore', 
    'Discover the architectural wonder of Belur. Explore the Chennakeshava temple, the world-famous Madanikas, and the profound secrets of Hoysala stone engineering.', 
    'Belur, Chennakeshava, Karnataka, Hoysala Dynasty, Lord Vishnu, Hindu Pilgrimage, Ancient Lore, Architecture', 
    '81', 
    '{
        "spiritualEssence": "Belur is the manifestation of the divine as absolute beauty (Sundara) and grace. The energy here is artistic, regal, and intensely detailed. It is the site where the material (stone) was completely surrendered to the spiritual vision of the artist. The vibration is one of ''Saundarya'' (Beauty) as a path to the divine. As a temple of the ''Handsome Vishnu'' (Chennakeshava), the vibration is one of attraction and the joy of the soul. A visit here is believed to grant the devotee the refinement of the senses and the vision of the divine in every detail of creation. The air is always vibrant with the scent of the incense and the silent thunder of the masterpieces carved on every pillar.",
        "longDescription": "The Chennakeshava temple was commissioned by King Vishnuvardhana of the Hoysala Empire in 1117 CE. It was built using soapstone, which is soft when quarried but hardens over time, allowing for incredibly intricate carvings. The temple is famous for its 42 Madanika (bracket figures)—celestial dancers and musicians who represent the highest standard of Indian feminine beauty and grace. Every inch of the temple, from the star-shaped base to the towering ceiling, is covered with sculptures of deities, animals, and scenes from the epics. The main deity, Chennakeshava, is a 6-foot tall standing Vishnu of extraordinary beauty. Belur was the early capital of the Hoysalas and remains a primary site for anyone seeking to understand the height of medieval Indian civilization.",
        "spiritualArchitecture": "The temple is the supreme example of the Hoysala style. It features a star-shaped platform (Jagati) that provides multiple angles for the sculptures. The architecture is characterized by its low height and horizontal emphasis, contrasting with the soaring towers of the Dravidian style. The pillars are a unique feature—many are lathe-turned and polished to a mirror finish, with one (the Narasimha pillar) said to have been capable of rotating. The ceiling of the main hall is a massive stone dome with a central pendant that is a masterpiece of suspended sculpture. The 42 Madanikas are the highlight, showing dancers in various complex poses with incredible anatomical detail.",
        "vedicReferences": "Belur is celebrated in the works of various medieval poets and is considered a primary site for the study of the Sri Vaishnava tradition in Karnataka.",
        "deepInsights": "The star-shaped platform represents the expansion of the divine energy in all directions. Belur teaches that the highest form of discipline is the one that produces the highest form of beauty.",
        "ancientLore": "Lore tells that the sculptor Jakanachari personally carved the masterpieces and challenged anyone to find a flaw. His son later found a small frog in a stone, leading to a legendary reunion. Another legend says that the Madanika figures were modeled after the Queen Shantala Devi, who was an accomplished dancer herself.",
        "keyRituals": [
                {
                        "name": "Panchamrut Abhishekam",
                        "description": "The ritual bathing of the 6-foot idol of Chennakeshava with five sacred substances."
                },
                {
                        "name": "Belur Rathotsava",
                        "description": "The grand annual chariot festival where the Lord is taken out in a massive wooden chariot."
                },
                {
                        "name": "Madanika Deepotsava",
                        "description": "The festival of lamps where the bracket figures are illuminated to show their intricate details."
                }
        ],
        "highlights": [
                {
                        "name": "The 42 Madanikas",
                        "description": "World-famous bracket figures depicting celestial dancers and musicians."
                },
                {
                        "name": "The Narasimha Pillar",
                        "description": "A lathe-turned pillar with thousands of tiny carvings, believed to have once rotated."
                },
                {
                        "name": "Star-shaped Jagati",
                        "description": "The massive platform that provides a unique layout for the temple''s art."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "40km from Hassan and 220km from Bangalore, well connected by road. Regular buses run from Hassan.",
                "nearestAirport": "Bangalore International Airport / Mangalore Airport.",
                "nearestRailway": "Hassan Junction."
        },
        "tips": [
                "Hire an official guide; you will miss 90% of the symbolism without one.",
                "Carry a torch to see the incredible details on the ceiling and the darker corners of the pillars.",
                "Combine your visit with Halebidu, located just 16km away."
        ],
        "faqs": [
                {
                        "question": "How long did it take to build?",
                        "answer": "It took 103 years and three generations of kings to complete the entire temple complex."
                },
                {
                        "question": "What is soapstone?",
                        "answer": "It is a type of chloritic schist that is soft when first quarried, allowing for ivory-like carving, but hardens into durable stone over time."
                },
                {
                        "question": "Is there a dress code?",
                        "answer": "While less strict than some Kerala temples, modest clothing is expected and shoes must be left outside."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Halebidu (Hoysaleswara)', 
    'halebidu-hoysaleswara', 
    'Sacred Destination', 
    'ka', 
    'The Hoysaleswara Temple at Halebidu is the largest and most complex of the Hoysala temples. A twin-temple dedicated to Lord Shiva, it features an endless frieze of stone carvings that are considered among the finest examples of Hindu art in existence.', 
    '160.2', 
    '525.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Stone Symphony of the Hoysala Kings', 
    'Halebidu Hoysaleswara Temple | Karnataka, Shiva Lore & Ancient Lore', 
    'Explore the spiritual and artistic majesty of Halebidu. Discover the twin Shiva temples, the massive monolithic Nandis, and the legendary friezes of the Hoysala era.', 
    'Halebidu, Hoysaleswara, Karnataka, Hoysala Dynasty, Lord Shiva, Hindu Pilgrimage, Ancient Lore, Architecture', 
    '82', 
    '{
        "spiritualEssence": "Halebidu is the manifestation of the divine as the infinite diversity of creation. The energy here is expansive, complex, and intensely detailed. It is the site where the entire world—gods, animals, and humans—is gathered to worship the Lord. The vibration is one of ''Vishwaroopa'' (Universal Form). As a twin temple, it represents the balance between the masculine and feminine aspects of the divine. A visit here is believed to grant the devotee the ability to see the sacred in every aspect of life. The air is always vibrant with the scent of the soapstone and the silent hum of the thousands of figures that seem to breathe in the stone.",
        "longDescription": "Built in the 12th century by King Vishnuvardhana, Halebidu (The Old Capital) was originally called Dwarasamudra. The Hoysaleswara temple is unique for its Dwikuta (twin) design, with two identical temples joined by a common platform, dedicated to Hoysaleswara and Shantaleswara (named after the King and Queen). The exterior walls feature 11 rows of friezes, starting from elephants at the base and moving up to celestial beings. Each row is carved from a single continuous stone band around the entire temple. Despite being sacked multiple times by the Delhi Sultanate, the temple remains a spectacular display of what is possible when spiritual devotion meets absolute artistic mastery. The site also features two massive monolithic Nandis (bulls), each housed in its own pavilion.",
        "spiritualArchitecture": "The temple is the largest of the Hoysala structures and is famous for its intricate outer walls. The star-shaped plan creates thousands of vertical and horizontal surfaces for carving. The friezes are the highlight—one row alone contains over 1200 elephants, no two of which are identical. The temple features massive monolithic Nandis carved from high-quality soapstone with a mirror finish. The interiors are equally grand, with lathe-turned pillars and spectacular bracket figures. The architecture is designed to draw the viewer into a meditative state through the sheer overwhelming detail of the divine manifestation.",
        "vedicReferences": "Halebidu is celebrated as a primary site for the study of the medieval Shaivite traditions and the cultural history of the Hoysala empire.",
        "deepInsights": "The rows of elephants, lions, and horses at the base represent the strength and stability upon which the spiritual world rests. Halebidu teaches that the divine is found in the infinite variations of the one truth.",
        "ancientLore": "Lore tells that the temple was so beautiful that the invaders were blinded by its radiance. Another legend says that the architects purposefully left the temple without its towers (Vimanams) to show that the art on the walls was enough to reach the heavens.",
        "keyRituals": [
                {
                        "name": "Mahashivratri",
                        "description": "The grand celebration of Shiva''s night where the twin temples are illuminated with thousands of lamps."
                },
                {
                        "name": "Pradosha Puja",
                        "description": "Special rituals performed for the massive monolithic Nandis during the auspicious twilight hours."
                },
                {
                        "name": "Halebidu Utsav",
                        "description": "A major annual cultural festival featuring music and dance performances by the temples."
                }
        ],
        "highlights": [
                {
                        "name": "The Frieze of 1200 Elephants",
                        "description": "A continuous band of stone elephants around the temple base, each unique."
                },
                {
                        "name": "Monolithic Nandis",
                        "description": "Two of the most beautiful and polished stone bulls in India."
                },
                {
                        "name": "Dwikuta Shrine",
                        "description": "The unique twin-temple design that joins the masculine and feminine shrines."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "16km from Belur and 32km from Hassan, well connected by road.",
                "nearestAirport": "Bangalore International Airport / Mangalore Airport.",
                "nearestRailway": "Hassan Junction."
        },
        "tips": [
                "Allow at least 2-3 hours to walk around the exterior walls and appreciate the friezes.",
                "Hire a guide to point out the specific stories from the Ramayana and Mahabharata depicted in the carvings.",
                "Visit the nearby Jain Basadis, which feature equally beautiful and polished stone work."
        ],
        "faqs": [
                {
                        "question": "Why does it have no towers?",
                        "answer": "Historical accounts suggest they were never completed due to the repeated invasions of the city in the 14th century."
                },
                {
                        "question": "What is the meaning of Halebidu?",
                        "answer": "It means ''Old City'' or ''Old Residence,'' referring to its status after the capital was moved."
                },
                {
                        "question": "Is it a functioning temple?",
                        "answer": "Yes, rituals are still performed in both the Hoysaleswara and Shantaleswara shrines."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Darasuram (Airavatesvara)', 
    'darasuram-airavatesvara', 
    'Sacred Destination', 
    'tn', 
    'The Airavatesvara temple at Darasuram is a ''Great Living Chola Temple'' and a UNESCO World Heritage site. Built in the 12th century, it is a site of refined elegance, famous for its chariot-shaped dancing hall and its unique ''singing steps.''', 
    '245.5', 
    '730.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Celestial Chariot of the White Elephant', 
    'Darasuram Airavatesvara Temple | Tamil Nadu, Chola Lore & Ancient Lore', 
    'Discover the architectural elegance of Darasuram. Explore the chariot-shaped Nata Mandira, the singing stone steps, and the legend of Indra''s white elephant.', 
    'Darasuram, Airavatesvara, Tamil Nadu, Chola Dynasty, Lord Shiva, UNESCO, Hindu Pilgrimage, Ancient Lore, Architecture', 
    '83', 
    '{
        "spiritualEssence": "Darasuram is the manifestation of the divine as celestial rhythm and refinement. The energy here is delicate, melodic, and intensely sophisticated. It is the site where the Chola architectural genius was refined into a jewel-like perfection. The vibration is one of ''Gandharva-Gana'' (the song of the celestials). As a temple where the white elephant of Indra (Airavata) was healed, the vibration is one of restoration and divine beauty. A visit here is believed to grant the devotee the refinement of the soul and the healing of the spirit through the power of sacred art and sound. The air is always vibrant with the memory of the singing steps and the visual music of the stone carvings.",
        "longDescription": "Built by Rajaraja Chola II in the 12th century, Darasuram is the third of the Great Living Chola Temples. It is smaller and more refined than the temples of Thanjavur and Gangaikonda Cholapuram. The temple is dedicated to Lord Shiva as Airavatesvara, because Indra''s white elephant, Airavata, is said to have worshipped here to be cured of a curse. The temple is famous for its Rajagambhiram Mandapam, which is designed as a chariot pulled by elephants and horses, complete with stone wheels. A unique feature of the temple is the set of ''Singing Steps'' (Saptaswara Steps) near the Nandi pavilion, which produce different musical notes when struck. The temple is covered with miniature carvings that are so detailed they require a magnifying glass to fully appreciate.",
        "spiritualArchitecture": "The temple is a masterpiece of late Chola architecture. It features a smaller Vimanam compared to Thanjavur but compensates with incredible detail. The Nata Mandira (dancing hall) is shaped like a chariot, a design that influenced later temples like Konark. The pillars are covered with miniature sculptures depicting scenes from the Periya Puranam (lives of 63 Nayanars). The stone work is so fine that it is often compared to metal work. The complex includes a separate shrine for the Goddess Periya Nayaki, added during the later Nayak period. The entire temple is a visual symphony of stone, where every surface is a work of art.",
        "vedicReferences": "Darasuram is celebrated in the works of the later Nayanars and various Chola inscriptions. It is a primary site for the study of the Shaiva Siddhanta and medieval Tamil culture.",
        "deepInsights": "The chariot design represents the divine in constant motion through the universe. Darasuram teaches that the highest form of worship is the one that engages all the senses in the appreciation of divine beauty.",
        "ancientLore": "Lore tells that Airavata, the white elephant, regained its lost white color after bathing in the sacred tank of the temple. Another legend says that Yama (the God of Death) was also cured of a burning sensation here, and hence the Lord is also called Yama-Dharama-Eswarar.",
        "keyRituals": [
                {
                        "name": "Pradosha Abhishekam",
                        "description": "The ritual bathing of the Lord during the twilight hours, attracting thousands of local devotees."
                },
                {
                        "name": "Chaitra Brahmotsavam",
                        "description": "The grand annual festival celebrated with chariot processions and music performances."
                },
                {
                        "name": "Nandi Puja",
                        "description": "Special worship of the massive Nandi at the entrance of the complex."
                }
        ],
        "highlights": [
                {
                        "name": "Chariot Mandapam",
                        "description": "The spectacular dancing hall shaped like a divine chariot with stone wheels."
                },
                {
                        "name": "Singing Steps",
                        "description": "Stone steps that produce the seven musical notes (Saptaswara) when struck."
                },
                {
                        "name": "Miniature Sculptures",
                        "description": "Incredibly detailed carvings depicting the stories of the 63 Nayanars."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "4km from Kumbakonam, well connected by road and local transport. It is an easy day trip from Kumbakonam.",
                "nearestAirport": "Tiruchirappalli International Airport.",
                "nearestRailway": "Kumbakonam Railway Station."
        },
        "tips": [
                "Visit during the early morning or late afternoon to see the sunlight highlight the miniature carvings.",
                "The singing steps are currently protected by a grill to prevent damage; you can observe them but strike them only with the permission of the temple authorities.",
                "Combine your visit with the other two Great Living Chola Temples (Thanjavur and Gangaikonda Cholapuram)."
        ],
        "faqs": [
                {
                        "question": "Is it a UNESCO site?",
                        "answer": "Yes, it is part of the Great Living Chola Temples UNESCO World Heritage site."
                },
                {
                        "question": "Why is it called Airavatesvara?",
                        "answer": "It is named after Airavata, the white elephant of Lord Indra, who is said to have worshipped Shiva here."
                },
                {
                        "question": "How far is it from Kumbakonam?",
                        "answer": "It is just 4 kilometers away and can be reached by a 10-minute auto-ride."
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Gangaikonda Cholapuram', 
    'gangaikonda-cholapuram', 
    'Sacred Destination', 
    'tn', 
    'The ''City of the Chola Who Conquered the Ganges,'' this temple was built by Rajendra Chola I to commemorate his victory in the North. It is a more feminine and refined version of the Big Temple of Thanjavur, featuring a spectacular 13-foot Shiva Lingam and the largest monolithic Nandi in the state.', 
    '250.2', 
    '725.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Water of the Ganges in a Golden Temple', 
    'Gangaikonda Cholapuram Temple | Tamil Nadu, Rajendra Chola & Ancient Lore', 
    'Discover the grand history of Gangaikonda Cholapuram. Explore the successor to the Big Temple, the massive 13-foot Lingam, and the profound legacy of the Chola maritime empire.', 
    'Gangaikonda Cholapuram, Tamil Nadu, Chola Dynasty, Lord Shiva, UNESCO, Hindu Pilgrimage, Ancient Lore, Rajendra Chola', 
    '84', 
    '{
        "spiritualEssence": "Gangaikonda Cholapuram is the manifestation of the divine as the triumphant yet graceful conqueror. The energy here is vast, regal, and intensely stable. It is the site where the waters of the Ganges were ceremonially unified with the southern lands. The vibration is one of ''Vijay'' (Victory) that is dedicated to the divine. As the successor to Thanjavur, the vibration is more curved, graceful, and feminine. A visit here is believed to grant the devotee the strength to overcome any obstacle and the wisdom to dedicate their success to the higher power. The air is always vibrant with the scent of the granite and the memory of the massive artificial lake that once surrounded the city.",
        "longDescription": "Built in 1035 CE by Rajendra Chola I, the son of Raja Raja Chola I, this temple was the center of a new capital city. After his victorious campaign to the banks of the Ganges, Rajendra Chola brought the sacred water to this spot and created a massive artificial lake (Chola Gangam) and this grand temple. The temple is a slightly smaller but more detailed version of the Thanjavur temple. The main deity is a 13-foot tall Shiva Lingam, one of the largest in India. The temple also features the largest monolithic Nandi in Tamil Nadu, made of a single piece of limestone. Despite the city being destroyed by later dynasties, the temple remains a spectacular UNESCO World Heritage site, standing as a lone guardian of the Chola maritime empire''s legacy.",
        "spiritualArchitecture": "The architecture is characterized by its massive Vimanam (tower) which stands 180 feet tall. Unlike the straight lines of Thanjavur, the tower here has a concave curve, giving it a more elegant and feminine silhouette. The temple features a massive courtyard and several beautiful relief sculptures, including the famous Chola bronze style in stone. The Nandi at the entrance is a monolithic masterpiece. The architecture is designed to emphasize the massive size of the inner sanctum while maintaining a sense of artistic refinement in every carving.",
        "vedicReferences": "The temple is celebrated in various Chola inscriptions and is a primary site for the study of the Shaiva Siddhanta and the political history of medieval India.",
        "deepInsights": "The concave curve of the tower represents the ''Laya'' (the gentle rhythm) of the universe. Gangaikonda Cholapuram teaches that true victory is the one that is grounded in spiritual grace.",
        "ancientLore": "Lore tells that Rajendra Chola commanded all the defeated kings of the North to bring a pot of Ganges water to fill the artificial lake he created here. Another legend says that the temple''s foundation was laid using a unique combination of five metals to ensure its stability for millennia.",
        "keyRituals": [
                {
                        "name": "Anna Abhishekam",
                        "description": "The massive ritual where the 13-foot lingam is completely covered with cooked rice during the full moon of Ashwayuja."
                },
                {
                        "name": "Pradosha Puja",
                        "description": "The ritual worship of the massive Nandi and Lord Shiva during the twilight hours."
                },
                {
                        "name": "Mahashivratri",
                        "description": "The grand annual celebration with night-long prayers and multiple processions."
                }
        ],
        "highlights": [
                {
                        "name": "180-foot Vimanam",
                        "description": "The concave curved tower, a unique variation of the Chola style."
                },
                {
                        "name": "13-foot Shiva Lingam",
                        "description": "One of the largest monolithic lingams in India."
                },
                {
                        "name": "Largest Monolithic Nandi",
                        "description": "A massive limestone bull guarding the temple entrance."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "35km from Kumbakonam and 70km from Thanjavur, well connected by road. Regular buses and taxis are available from both cities.",
                "nearestAirport": "Tiruchirappalli International Airport.",
                "nearestRailway": "Kumbakonam Railway Station."
        },
        "tips": [
                "Visit the nearby ruins of the Chola palace to get a sense of the lost city''s scale.",
                "Observe the unique Concave curve of the tower from a distance to appreciate its silhouette.",
                "Combine your visit with Thanjavur and Darasuram for the full ''Living Chola Temples'' circuit."
        ],
        "faqs": [
                {
                        "question": "Who built it?",
                        "answer": "It was built by Rajendra Chola I in 1035 CE to commemorate his victory over Northern kingdoms."
                },
                {
                        "question": "Is it part of UNESCO?",
                        "answer": "Yes, it is one of the three Great Living Chola Temples on the UNESCO World Heritage list."
                },
                {
                        "question": "What is the meaning of the name?",
                        "answer": "It means ''The City of the Chola who took (conquered) the Ganges''."
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