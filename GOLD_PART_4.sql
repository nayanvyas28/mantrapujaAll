-- GOLD STANDARD PART 4 for Spritual_locations
INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Rudraprayag (Alaknanda-Mandakini Confluence)', 
    'rudraprayag-confluence', 
    'Sacred Destination', 
    'uk', 
    'The "Confluence of the Lord of Music", Rudraprayag is where the Alaknanda and the Mandakini rivers meet. Located in the heart of the Garhwal Himalayas, it is the site where Lord Shiva (as Rudra) is believed to have performed penance to master the music, representing the absolute harmony of the divine sound and the sacred junction of the two primary Himalayan pilgrimage routes.', 
    '520.2', 
    '245.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Confluence of the Music and the Gateway to the Twin Dhams', 
    'Rudraprayag Confluence | Uttarakhand, Rudranath Temple & Ancient Lore', 
    'Experience the profound harmony of Rudraprayag. Discover the confluence of Alaknanda and Mandakini, the ancient Rudranath temple, and the profound energy of the Panch Prayag.', 
    'Rudraprayag, Uttarakhand, Shiva, Rudra, Alaknanda, Mandakini, Hindu Pilgrimage, Ancient Lore, Confluence', 
    '230', 
    '{
        "spiritualEssence": "Rudraprayag is the manifestation of the divine as the supreme harmony and the absolute resonance of the cosmic sound. The energy here is vibrant, musical, and intensely strategic. It is the site where the roar of the mountain rivers becomes a Vedic chant. The vibration is one of ''Nada'' (Sound) and the absolute clarity of the spiritual rhythm. As a town set at the fork of the roads leading to Kedarnath and Badrinath, it represents the spiritual heart-chakra of the Garhwal range. A visit here is believed to grant the devotee the absolute control over their speech and the blessing of the divine music. The air is always vibrant with the scent of the river pine and the constant, thunderous sound of the Mandakini joining the Alaknanda.",
        "longDescription": "Rudraprayag is named after Lord Shiva who manifested in his Rudra form to bless the Sage Narada, who performed penance here to master the Veena and the musical arts. The site features the ancient Rudranath Temple at the confluence and the nearby Chamunda Devi temple. It is the second of the five prayags and acts as the administrative and logistics hub for the entire Char Dham region. The most spectacular sight is the confluence itself, where the calm, deep Alaknanda receives the fast and turbulent Mandakini. Rudraprayag is a site where the highest aesthetic of the divine sound and the most practical path of the mountain traveler are perfectly unified.",
        "spiritualArchitecture": "The architecture of Rudraprayag is a spectacular display of the modern hill town style with ancient stone anchors. The Rudranath Temple is the primary architectural landmark at the river bank, featuring a traditional stone shikhara and a small, powerful mandapam. A unique feature is the use of the massive river boulders as the foundation for the various ghats and shrines. The architecture is designed to lead the pilgrim from the busy highway to the intimate and noisy presence of the confluence. The use of the vibrant paints on the newer shrines and the gray, weathered stone of the older temples create a sense of a spiritual city that is constantly evolving with the flow of the rivers. The complex includes several suspension bridges that connect the different parts of the town over the deep gorges.",
        "vedicReferences": "Rudraprayag is celebrated in the Puranas as the site where the Lord Shiva personally revealed the secrets of the Ghandarva Veda (music) to the humanity.",
        "deepInsights": "The name Rudraprayag represents the truth that the divine can be reached through the absolute mastery of the sound. It teaches that the highest harmony is found where the diverse energies of life meet.",
        "ancientLore": "Lore tells that the Sage Narada became so proficient in music here that the Lord Shiva himself came to listen to him. Another legend says that the rocks at the confluence carry the footprints of the Rudra who danced here at the dawn of time.",
        "keyRituals": [
                {
                        "name": "Sangam Snanam (Rudraprayag)",
                        "description": "The ritual dip at the meeting point of the Alaknanda and Mandakini to seek the blessing of the Lord of Music."
                },
                {
                        "name": "Rudranath Aarti",
                        "description": "The daily evening prayer performed at the confluence temple to celebrate the cosmic sound."
                },
                {
                        "name": "Narada Shila Puja",
                        "description": "Praying at the rock where the Sage Narada is believed to have performed his musical penance."
                },
                {
                        "name": "Mandakini River Arghya",
                        "description": "Offering sacred water to the river that flows from the heights of Kedarnath."
                }
        ],
        "highlights": [
                {
                        "name": "The Confluence (Mandakini)",
                        "description": "The powerful visual meeting of the two major Himalayan rivers."
                },
                {
                        "name": "Rudranath Temple",
                        "description": "The ancient stone shrine dedicated to Lord Shiva at the very edge of the water."
                },
                {
                        "name": "Chamunda Devi Temple",
                        "description": "A nearby powerful Shakti shrine associated with the protection of the town."
                },
                {
                        "name": "Koteshwar Cave",
                        "description": "A nearby cave temple where Shiva is believed to have meditated before moving to Kedarnath."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the confluence is most dramatic during the post-monsoon months).",
                "howToReach": "140km from Rishikesh. Well connected by road; regular taxis and buses run from Haridwar and Rishikesh.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Stay in one of the river-side hotels to hear the constant sound of the confluence; it is a powerful natural meditation.",
                "Visit the Koteshwar cave temple located 3km away for a more silent and intimate spiritual experience.",
                "Rudraprayag is the point where you decide between the Kedarnath and Badrinath routes; seek the Lord''s guidance for your journey here."
        ],
        "faqs": [
                {
                        "question": "Which rivers meet at Rudraprayag?",
                        "answer": "The Alaknanda and the Mandakini rivers meet here."
                },
                {
                        "question": "Who was Narada?",
                        "answer": "He was the celestial sage and messenger of the gods who is believed to have mastered music at this spot."
                },
                {
                        "question": "Is it a safe place to visit?",
                        "answer": "Yes, it is a major and well-developed town, though the river banks can be slippery during the monsoon."
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
    'Karnaprayag (Alaknanda-Pindar Confluence)', 
    'karnaprayag-confluence', 
    'Sacred Destination', 
    'uk', 
    'The "Confluence of the Hero Karna", Karnaprayag is where the Alaknanda and the Pindar rivers meet. Located in the Chamoli district of Uttarakhand, it is the site where the legendary hero Karna of the Mahabharata is believed to have performed penance to the Sun God, representing the absolute charity of the soul and the sacred union of the mountain streams.', 
    '530.2', 
    '235.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Altar of the Solar Penance and the Confluence of the Heroic Spirit', 
    'Karnaprayag Confluence | Uttarakhand, Karna & Ancient Lore', 
    'Experience the profound energy of Karnaprayag. Discover the confluence of Alaknanda and Pindar, the legend of Karna, and the profound energy of the Panch Prayag.', 
    'Karnaprayag, Uttarakhand, Karna, Surya, Alaknanda, Pindar, Hindu Pilgrimage, Ancient Lore, Confluence', 
    '231', 
    '{
        "spiritualEssence": "Karnaprayag is the manifestation of the divine as the supreme charity and the absolute endurance of the individual spirit. The energy here is heroic, bright, and intensely persistent. It is the site where the human will was unified with the solar light. The vibration is one of ''Dana'' (Charity) and the absolute clarity of the karmic duty. As a town set at the confluence of the Alaknanda and the ice-cold Pindar flowing from the Pindari glacier, it represents the spiritual forge of the Central Himalayas. A visit here is believed to grant the devotee the absolute strength of character and the blessing of the divine generosity. The air is always vibrant with the scent of the high mountain ice and the constant, rhythmic roar of the Pindar river.",
        "longDescription": "Karnaprayag is named after Karna, the son of the Sun God Surya, who performed penance for many years to gain his impenetrable armor (Kavacha) and earrings (Kundala). Legend tells that he also performed the last rites for his mother Kunti here. The site features the ancient Karna Temple and the Uma Devi Temple. It is the third of the five prayags and acts as a critical link to the Kumaon region via the Pindar valley. The most spectacular sight is the confluence itself, where the gray-blue Alaknanda meets the white, frothy waters of the Pindar. Karnaprayag is a site where the highest level of Mahabharata epic and the most rugged beauty of the Himalayan rivers are perfectly unified.",
        "spiritualArchitecture": "The architecture of Karnaprayag is a spectacular display of the traditional stone style with modern hill-station refinements. The Karna Temple is the primary architectural landmark, featuring a simple but powerful stone shikhara and a courtyard facing the river. A unique feature is the use of the natural rock formations as part of the ritual space where the sun''s rays hit the water during the dawn. The architecture is designed to lead the pilgrim from the winding market streets to the peaceful and windy confluence point. The use of the local gray stone and the white marble in the newer shrines create a sense of a spiritual city that honors the light of the sun. The complex includes several small niches dedicated to the various solar deities.",
        "vedicReferences": "Karnaprayag is celebrated in the Puranas as the site where the seeker can gain the solar energy (Surya Tejas) required for the absolute spiritual victory.",
        "deepInsights": "The penance of Karna represents the truth that the highest strength is gained through the absolute focus on the source of all light. Karnaprayag teaches that the spirit is indestructible when it is aligned with the truth.",
        "ancientLore": "Lore tells that the Lord Krishna personally came to Karnaprayag to honor the charity of Karna after the war. Another legend says that the water of the Pindar river carries the cooling essence of the high glaciers to balance the heat of the solar penance.",
        "keyRituals": [
                {
                        "name": "Sangam Snanam (Karnaprayag)",
                        "description": "The ritual dip at the meeting point of the Alaknanda and Pindar to seek the blessing of the solar strength."
                },
                {
                        "name": "Karna Temple Aarti",
                        "description": "The daily prayer performed in the hero''s shrine to celebrate the power of charity and duty."
                },
                {
                        "name": "Surya Arghya (Karnaprayag)",
                        "description": "Offering sacred water to the Sun God at the very spot where Karna meditated."
                },
                {
                        "name": "Pindar River Puja",
                        "description": "Praying at the banks of the river that flows from the sacred Pindari glacier."
                }
        ],
        "highlights": [
                {
                        "name": "The Confluence (Pindar)",
                        "description": "The dramatic visual meeting of the two major mountain streams."
                },
                {
                        "name": "Karna Temple",
                        "description": "The ancient stone shrine dedicated to the hero of the Mahabharata."
                },
                {
                        "name": "Uma Devi Temple",
                        "description": "A nearby powerful shrine dedicated to the Goddess Parvati, associated with the town''s protection."
                },
                {
                        "name": "The Pindar Valley View",
                        "description": "The breathtaking perspective of the valley that leads to the high Himalayan glaciers."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially in the autumn when the skies are clearest for solar rituals).",
                "howToReach": "170km from Rishikesh and 30km from Rudraprayag. Well connected by road; regular buses and taxis run from Rishikesh and Almora.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit the temple at dawn to witness the first light on the confluence; it is the most sacred time of the day at this site.",
                "Respect the local history; Karna is a highly revered figure in this region and the temple maintains a solemn atmosphere.",
                "The Pindar river water is extremely cold even in summer; be prepared for a very refreshing and sharp ritual dip."
        ],
        "faqs": [
                {
                        "question": "Which rivers meet at Karnaprayag?",
                        "answer": "The Alaknanda and the Pindar rivers meet here."
                },
                {
                        "question": "Who was Karna?",
                        "answer": "He was the son of Kunti and the Sun God Surya, a central hero of the Mahabharata known for his unmatched charity."
                },
                {
                        "question": "Can we go to the glacier from here?",
                        "answer": "Yes, the road along the Pindar river leads toward the base camp for the Pindari Glacier trek."
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
    'Katarmal Sun Temple', 
    'katarmal-sun-temple', 
    'Sacred Destination', 
    'uk', 
    'The "Second Sun of India", Katarmal Sun Temple is a 9th-century architectural marvel in the Almora district of Uttarakhand. It is a site of absolute solar authority and ancient Kumaon majesty, being the second most important sun temple in India after Konark, representing the absolute alignment of the earth with the celestial light and the spiritual power of the Katyuri kings.', 
    '550.2', 
    '250.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Stone Mirror of the Sun and the Jewel of the Almora Hills', 
    'Katarmal Sun Temple | Uttarakhand, Solar Architecture & Ancient Lore', 
    'Experience the profound light of Katarmal. Discover the 9th-century sun temple, the legend of the Katyuri kings, and the profound energy of the solar pilgrimage.', 
    'Katarmal, Sun Temple, Uttarakhand, Almora, Solar Architecture, Hindu Pilgrimage, Ancient Lore, Katyuri', 
    '232', 
    '{
        "spiritualEssence": "Katarmal is the manifestation of the divine as the supreme light and the absolute precision of the cosmic alignment. The energy here is bright, geometric, and intensely ancient. It is the site where the stone was carved to trap the first rays of the sun. The vibration is one of ''Surya-Tejas'' (Solar Radiance) and the absolute clarity of the spiritual vision. As a massive stone complex perched on a hill facing the East, it represents the spiritual observatory of the Kumaon Himalayas. A visit here is believed to grant the devotee the absolute removal of all physical and mental darkness and the blessing of the solar vitality. The air is always vibrant with the scent of the dry mountain grass and the silent, heavy energy of the 1,100-year-old stone shikharas.",
        "longDescription": "The Katarmal Sun Temple (also known as Bara Aditya) was built by King Katarmalla of the Katyuri dynasty in the 9th century. It is a complex of 45 small stone temples surrounding the main shrine dedicated to the Sun God (Burhaditya). The main temple is famous for its intricate stone carvings on the walls and the wooden doors (now preserved in the National Museum, Delhi). The temple is designed so that the first rays of the sun fall directly on the idol of the deity during certain times of the year. The site offers a spectacular view of the Almora valley and the surrounding Himalayan peaks. Katarmal is a site where the highest levels of medieval Indian astronomy and the most refined stone craftsmanship are perfectly unified.",
        "spiritualArchitecture": "The architecture of Katarmal is a spectacular display of the Katyuri style, characterized by its high, tiered shikharas and the use of the massive gray stone blocks. The main temple is a square structure with a curvilinear spire. A unique feature is the cluster of 45 smaller subsidiary shrines, each a masterpiece of stone relief carving. The architecture is designed to create a spiritual city that reflects the order of the solar system. The use of the intricate carvings of deities, animals, and geometric patterns create a sense of a spiritual library in stone. The complex includes several stone-cut tanks and platforms used for solar rituals.",
        "vedicReferences": "Katarmal is celebrated in the local Manaskhanda of the Skanda Purana as the supreme site where the Sun God personally resides to bless the land of Kumaon.",
        "deepInsights": "The direct alignment with the sun represents the truth that the highest realization is achieved through the direct experience of the light. Katarmal teaches that the spirit must be shaped with precision to reflect the divine brilliance.",
        "ancientLore": "Lore tells that the temple was built in a single night by the heavenly architects as a tribute to the Sun God''s protection of the valley. Another legend says that the ancient wooden doors of the temple carry the secrets of the Vedic solar science.",
        "keyRituals": [
                {
                        "name": "Surya Namaskar (Katarmal)",
                        "description": "The ritual of performing the sun-salutation in the temple courtyard at dawn to align with the first rays of the light."
                },
                {
                        "name": "Burhaditya Puja",
                        "description": "The daily prayer performed to the ancient Sun God to seek the health and the vitality of the spirit."
                },
                {
                        "name": "Makar Sankranti (Katarmal)",
                        "description": "The grand annual celebration of the sun''s transition, attracting thousands of pilgrims from across the region."
                },
                {
                        "name": "Architectural Meditation",
                        "description": "Reflecting on the precise geometry of the temple complex to understand the order of the universe."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Sun Shrine",
                        "description": "The ancient stone heart of the complex dedicated to the Sun God."
                },
                {
                        "name": "The 45 Subsidiary Temples",
                        "description": "The unique cluster of smaller shrines that surround the main deity."
                },
                {
                        "name": "The Solar Alignment Point",
                        "description": "The specific spot in the sanctum where the first ray of the sun hits the deity."
                },
                {
                        "name": "The Almora Valley View",
                        "description": "The breathtaking panoramic perspective of the hills and the snow peaks from the temple heights."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during the winter months for the clearest sunrise views).",
                "howToReach": "17km from Almora. Reached by a short 1.5km trek from the main road. Well connected by road from Kathgodam and Haldwani.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Reach the temple at least 30 minutes before sunrise to witness the incredible play of light on the ancient stone.",
                "The 1.5km walk from the road is through a beautiful pine forest; wear comfortable walking shoes.",
                "The temple is a protected monument by the ASI; respect the site and do not attempt to touch or deface the ancient carvings."
        ],
        "faqs": [
                {
                        "question": "How old is the temple?",
                        "answer": "It was built in the 9th century, making it over 1,100 years old."
                },
                {
                        "question": "Is it active for worship?",
                        "answer": "Yes, while it is a protected monument, it remains a site of active worship and pilgrimage."
                },
                {
                        "question": "Who built it?",
                        "answer": "It was built by King Katarmalla of the Katyuri dynasty, who ruled much of Kumaon in the medieval period."
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
    'Kasar Devi', 
    'kasar-devi-temple', 
    'Sacred Destination', 
    'uk', 
    'The "Magnetic Peak of the Himalayas", Kasar Devi is an ancient temple in the Almora district of Uttarakhand. It is a site of absolute spiritual mystery and modern scientific intrigue, famous for being one of the few places in the world (along with Stonehenge and Machu Picchu) under the Van Allen Belt magnetic field, representing the absolute convergence of the sacred earth and the cosmic energy.', 
    '555.2', 
    '252.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Peak of the Van Allen Belt and the Sanctuary of the Great Seekers', 
    'Kasar Devi Temple | Uttarakhand, Magnetic Field & Ancient Lore', 
    'Experience the profound energy of Kasar Devi. Discover the magnetic temple, the legend of the Van Allen Belt, and the profound energy of the global spiritual pilgrimage.', 
    'Kasar Devi, Uttarakhand, Almora, Magnetic Field, Van Allen Belt, Hindu Pilgrimage, Ancient Lore, Meditation', 
    '233', 
    '{
        "spiritualEssence": "Kasar Devi is the manifestation of the divine as the supreme resonance and the absolute grounding of the cosmic electromagnetic fields. The energy here is high-frequency, luminous, and intensely conductive. It is the site where the bridge between the human nervous system and the planetary grid is most accessible. The vibration is one of ''Akasha'' (Ether) and the absolute clarity of the meditative state. As a small cave temple perched on a high ridge overlooking the Himalayas, it represents the spiritual antenna of the Kumaon region. A visit here is believed to grant the devotee the absolute acceleration of the inner growth and the blessing of the profound silence. The air is always vibrant with the scent of the cedar forests and the silent, heavy energy of the thousands of years of continuous seeking.",
        "longDescription": "Kasar Devi dates back to the 2nd century. It became famous in the modern era after Swami Vivekananda meditated here in 1890 and wrote about his experiences. In the 1960s and 70s, it became a major hub for the \"Hippie Trail,\" attracting figures like Bob Dylan, George Harrison, and Timothy Leary. Scientific studies by NASA and other organizations have confirmed that the site falls under a unique magnetic field (the Van Allen Belt), similar to Stonehenge and Machu Picchu, which makes it exceptionally conducive to deep meditation. The temple is dedicated to the Goddess Kasar Devi, a form of Durga. It is a site where the ancient Puranic worship and the modern scientific understanding of planetary energy are perfectly unified.",
        "spiritualArchitecture": "The architecture of Kasar Devi is a spectacular display of the simple mountain cave style with modern stone refinements. The temple is built around a natural rock cave where the idol of the Goddess is housed. A unique feature is the presence of several meditation platforms and rocks where the great seekers of the past have sat. The architecture is designed to emphasize the verticality and the isolation of the ridge, offering 360-degree views of the Nanda Devi and Trishul peaks. The use of the local weathered stone and the simple white-washed facade create a sense of a spiritual home that is suspended between the earth and the sky. The complex includes the nearby Crank''s Ridge, which remains a site of global bohemian and spiritual interest.",
        "vedicReferences": "Kasar Devi is celebrated in the local oral traditions as the site where the great sages could directly perceive the cosmic sound (Nada Brahma) due to the unique purity of the mountain air.",
        "deepInsights": "The unique magnetic field represents the truth that the earth herself has points of intense spiritual conductivity. Kasar Devi teaches that the highest meditation is the alignment of the individual breath with the planetary pulse.",
        "ancientLore": "Lore tells that the mountain personally shifted its magnetic axis to accommodate the deep penance of the ancient rishis. Another legend says that the lights seen over the peaks of Kasar Devi at night are the subtle bodies of the masters who still reside in the higher dimensions of the ridge.",
        "keyRituals": [
                {
                        "name": "Silent Ridge Meditation",
                        "description": "Sitting on the magnetic rocks of Kasar Devi to experience the profound depth of the meditative state."
                },
                {
                        "name": "Vivekananda Rock Darshan",
                        "description": "Reflecting at the specific spot where the Swami attained a high state of realization in 1890."
                },
                {
                        "name": "Kasar Devi Aarti",
                        "description": "The daily evening prayer performed in the cave-shrine to seek the blessing of the Mother Goddess."
                },
                {
                        "name": "Himalayan Peak Japa",
                        "description": "Chanting the mantras while facing the massive snow peaks of the Nanda Devi from the temple heights."
                }
        ],
        "highlights": [
                {
                        "name": "The Magnetic Cave Shrine",
                        "description": "The ancient heart of the temple where the energy is most intensely felt."
                },
                {
                        "name": "Swami Vivekananda Meditation Point",
                        "description": "The historic rock associated with the great master''s Himalayan experience."
                },
                {
                        "name": "Crank''s Ridge",
                        "description": "The global hub of spiritual and creative energy that surrounds the temple area."
                },
                {
                        "name": "The 180-Degree Himalayan View",
                        "description": "The breathtaking panoramic perspective of the second highest peak of India, Nanda Devi."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially October to March for the clearest magnetic and peak-viewing conditions).",
                "howToReach": "8km from Almora. Well connected by road; regular taxis and local buses run from Almora town.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Spend at least 30 minutes in absolute silence at the meditation rocks to feel the unique magnetic energy of the site.",
                "The area is famous for its creative and spiritual community; explore the local cafes and libraries for a deeper connection.",
                "Visit during the Kasar Devi fair in November for a more traditional and festive experience of the local Kumaon culture."
        ],
        "faqs": [
                {
                        "question": "What is the magnetic field?",
                        "answer": "Kasar Devi is believed to fall under a unique magnetic belt (the Van Allen Belt), which is said to enhance meditative experiences."
                },
                {
                        "question": "Who was Swami Vivekananda?",
                        "answer": "The great Indian monk and philosopher who meditated here in 1890 and described it as one of the most powerful spots in the world."
                },
                {
                        "question": "Is it a difficult climb?",
                        "answer": "No, it is a short and easy walk from the main road through a beautiful forested path."
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
    'Kainchi Dham', 
    'kainchi-dham-ashram', 
    'Sacred Destination', 
    'uk', 
    'The ashram of the "Miracle Baba", Kainchi Dham is the seat of Neem Karoli Baba. Located in the Kumaon hills near Nainital, it is a site of absolute unconditional love and global spiritual resonance, famous for attracting seekers like Steve Jobs and Mark Zuckerberg, representing the absolute bridge between the ancient Himalayan wisdom and the modern global consciousness.', 
    '540.5', 
    '260.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Home of Neem Karoli Baba and the Global Lighthouse of Love', 
    'Kainchi Dham Ashram | Uttarakhand, Neem Karoli Baba & Ancient Lore', 
    'Experience the profound energy of Kainchi Dham. Discover the ashram of Neem Karoli Baba, the legend of the Miracle Baba, and the profound energy of the modern spiritual pilgrimage.', 
    'Kainchi Dham, Uttarakhand, Neem Karoli Baba, Maharaj-ji, Hindu Pilgrimage, Ancient Lore, Nainital, Ashram', 
    '234', 
    '{
        "spiritualEssence": "Kainchi Dham is the manifestation of the divine as the supreme love and the absolute simplicity of the spiritual presence. The energy here is warming, inclusive, and intensely personal. It is the site where the high walls of the ego are dissolved by the simple gaze of the master. The vibration is one of ''Prem'' (Love) and the absolute trust in the divine will. As a small ashram set in a narrow valley between two hills (forming a shape like scissors - Kainchi), it represents the spiritual heart of the modern Kumaon. A visit here is believed to grant the devotee the absolute emotional healing and the blessing of the Master''s presence. The air is always vibrant with the scent of the temple khichdi and the constant, rhythmic chanting of the Hanuman Chalisa.",
        "longDescription": "Kainchi Dham was established in 1962 by the great saint Neem Karoli Baba (known as Maharaj-ji). He was a devotee of Lord Hanuman and is believed to have been an incarnation of the deity. The ashram gained global fame in the 1970s and 2010s as a place of transformation for global leaders seeking clarity. The site features the Hanuman Temple and the Samadhi of Maharaj-ji. It is famous for the June 15th Bhandara, where hundreds of thousands of pilgrims are fed. Maharaj-ji taught the path of ''Love all, Serve all, Feed all,'' making the ashram a site where the highest Vedic bhakti and the most practical global service are perfectly unified.",
        "spiritualArchitecture": "The architecture of Kainchi Dham is a spectacular display of the simple mountain ashram style with vibrant colors and lush gardens. The temple features a distinctive red and white dome and a series of well-maintained halls and residential quarters. A unique feature is the use of the natural valley floor as a communal space where thousands of devotees sit together for the daily prayers. The architecture is designed to emphasize the accessibility and the humility of the master, with the main sanctum being an intimate space that overlooks the river. The use of the vibrant paints and the meticulous gardens create a sense of a spiritual home that is welcoming to all, regardless of their background.",
        "vedicReferences": "Kainchi Dham is celebrated in the modern spiritual literature as the primary ground for the performance of the ''Bhakti Yoga'' in the lineage of the great Himalayan saints.",
        "deepInsights": "The name Kainchi (Scissors) represents the truth that the master cuts away the bonds of the world with the power of love. Kainchi Dham teaches that the highest realization is found in the service of the humanity.",
        "ancientLore": "Lore tells that Maharaj-ji personally transformed the river water into Ghee for the temple ritual during a shortage. Another legend says that the master could be in multiple places at once, appearing to his devotees across the world while sitting in the Kainchi valley.",
        "keyRituals": [
                {
                        "name": "Hanuman Chalisa Path",
                        "description": "The collective and rhythmic chanting of the 40 verses of Hanuman to seek the master''s grace."
                },
                {
                        "name": "Kainchi Bhandara (June 15th)",
                        "description": "The grand annual feast where the entire valley is fed as an act of selfless service and gratitude."
                },
                {
                        "name": "Maharaj-ji Samadhi Darshan",
                        "description": "Praying at the final resting place of the saint to connect with his eternal presence."
                },
                {
                        "name": "Khichdi Prasad",
                        "description": "The ritual of partaking in the simple and sacred meal of the ashram, believed to heal the body and the mind."
                }
        ],
        "highlights": [
                {
                        "name": "The Hanuman Temple",
                        "description": "The beautiful and powerful central shrine dedicated to the Lord of the Devotion."
                },
                {
                        "name": "Neem Karoli Baba Samadhi",
                        "description": "The spiritual anchor of the ashram where the master''s energy is most intensely felt."
                },
                {
                        "name": "The Kainchi Valley",
                        "description": "The unique scissors-shaped geographical formation that gives the site its name and energy."
                },
                {
                        "name": "The Global Visitor Log",
                        "description": "The historic connection with the modern world''s most influential creative and tech leaders."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially June 15th for the grand fair).",
                "howToReach": "18km from Nainital on the Almora highway. Well connected by road; regular taxis and buses run from Nainital and Kathgodam.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Maintain absolute silence and respect the ashram rules; it is a place of serious spiritual practice despite the large crowds.",
                "If you are visiting for the first time, spend some time sitting in the courtyard; the energy of Maharaj-ji is said to be most accessible to the quiet mind.",
                "Be prepared for very long queues and massive crowds during the June 15th festival; plan your logistics well in advance."
        ],
        "faqs": [
                {
                        "question": "Who was Neem Karoli Baba?",
                        "answer": "He was a great Hindu saint and an adept of Bhakti Yoga, widely revered as an incarnation of Lord Hanuman."
                },
                {
                        "question": "Why did Steve Jobs visit?",
                        "answer": "He visited in the 1970s seeking spiritual clarity and a deeper understanding of his life''s purpose before starting Apple."
                },
                {
                        "question": "Can we stay in the ashram?",
                        "answer": "Accommodation is limited and usually reserved for long-term practitioners; most visitors stay in nearby Nainital or Bhowali."
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
    'Beatles Ashram', 
    'beatles-ashram-rishikesh', 
    'Sacred Destination', 
    'uk', 
    'The "Chaurasi Kutia", Beatles Ashram is a legendary spiritual landmark in the Rajaji National Park area of Rishikesh. It is a site of absolute global cultural authority and creative resonance, where the Beatles studied Transcendental Meditation under Maharishi Mahesh Yogi in 1968, representing the absolute intersection of the Eastern mysticism and Western pop culture.', 
    '445.5', 
    '255.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Global Icon of the 60s Spiritual Revolution and the Home of the Transcendental Sound', 
    'Beatles Ashram Rishikesh | Uttarakhand, Maharishi & Creative Lore', 
    'Experience the profound resonance of the Beatles Ashram. Discover the Chaurasi Kutia, the legend of the Maharishi, and the profound energy of the creative-spiritual pilgrimage.', 
    'Beatles Ashram, Rishikesh, Chaurasi Kutia, Maharishi Mahesh Yogi, The Beatles, Transcendental Meditation, Spiritual Revolution, Rajaji National Park', 
    '245', 
    '{
        "spiritualEssence": "The Beatles Ashram is the manifestation of the divine as the supreme creativity and the absolute bridging of the cultures. The energy here is nostalgic, artistic, and intensely vibrant. It is the site where the high-altitude silence meets the global rock-and-roll legacy. The vibration is one of ''Srishti'' (Creation) and the absolute exploration of the consciousness through sound. As a site reclaimed by the forest on the banks of the Ganga, it represents the spiritual laboratory of the modern age. A visit here is believed to grant the devotee the absolute spark of the creativity and the blessing of the inner harmony. The air is always vibrant with the scent of the wild jasmine and the silent, heavy energy of the millions of meditations performed in the stone igloos.",
        "longDescription": "The ashram, originally known as Chaurasi Kutia (84 Huts), was established by Maharishi Mahesh Yogi to provide a secluded space for deep meditation. In 1968, the Beatles stayed here for several weeks, writing many of the songs for the White Album. The site fell into ruin for decades but has recently been opened to the public as a museum and spiritual park. It features a series of unique stone meditation domes (igloos) and grand lecture halls covered in psychedelic graffiti and spiritual murals. The ashram is a critical site for the history of global spirituality, as it marked the moment when the Indian meditation techniques entered the global mainstream. It is a site where the highest level of Himalayan yogic science and the most influential art of the 20th century are perfectly unified.",
        "spiritualArchitecture": "The architecture of the Beatles Ashram is a spectacular display of the brutalist-spiritual style using the local river stone and concrete. The Chaurasi Kutia (84 huts) are small stone domes designed to hold the energy of a single meditator, creating a sense of a spiritual beehive. A unique feature is the presence of the grand meditation hall, now known as the Beatles Cathedral, featuring massive murals of the band and the Maharishi. The architecture is designed to emphasize the solitude of the seeker and the scale of the collective study. The use of the raw stone against the encroaching green forest creates a sense of a spiritual ruin that is still alive with the memory of the light. The complex includes several multi-story residential wings with unique circular windows.",
        "vedicReferences": "The Beatles Ashram is celebrated in the modern global history as the supreme site where the ''Dhyana'' was translated for the benefit of the global youth.",
        "deepInsights": "The creative output of the Beatles here represents the truth that the meditation is the ultimate fuel for the human expression. The ashram teaches that the spirit can sing even in the silence of the forest.",
        "ancientLore": "Lore tells that the 84 huts represent the 84 lakh cycles of the rebirth that the seeker must transcend to reach the liberation. Another legend says that the songs written here are infused with the subtle frequencies of the Ganga, which is why they continue to resonate with the millions across the world.",
        "keyRituals": [
                {
                        "name": "Transcendental Meditation Session",
                        "description": "Sitting in one of the 84 stone huts to practice the silent meditation in the tradition of the Maharishi."
                },
                {
                        "name": "Beatles Cathedral Walk",
                        "description": "The ritual of walking through the grand hall to absorb the creative energy and the artistic tributes of the global devotees."
                },
                {
                        "name": "Ganga Forest Silence",
                        "description": "Meditating on the banks of the river within the ashram premises to seek the alignment with the natural flow."
                },
                {
                        "name": "Mural Contemplation",
                        "description": "Reflecting on the spiritual messages etched in the psychedelic art of the ashram to seek the intellectual expansion."
                }
        ],
        "highlights": [
                {
                        "name": "The Chaurasi Kutia",
                        "description": "The 84 iconic stone meditation domes that form the heart of the ashram."
                },
                {
                        "name": "The Beatles Cathedral",
                        "description": "The massive meditation hall featuring world-famous graffiti and spiritual art."
                },
                {
                        "name": "Maharishi''s Bungalow",
                        "description": "The residence of the master, overlooking the river and the forest peaks."
                },
                {
                        "name": "The Graffiti Gallery",
                        "description": "The series of walls and buildings covered in global artistic tributes to the spiritual journey."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (the forest trail is most comfortable during the cooler months).",
                "howToReach": "Located at the end of the Swarg Ashram area in Rishikesh. Accessible by walking through the river bank trail or by vehicle via the Ram Jhula area.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Carry a bottle of water and wear comfortable walking shoes; the ashram complex is large and requires significant walking.",
                "Respect the forest environment; the ashram is part of the Rajaji National Park, and wild animals (monkeys and occasionally elephants) are present.",
                "Spend some time sitting in silence in the stone domes; even without formal training, the acoustics and the history make it a profound experience."
        ],
        "faqs": [
                {
                        "question": "Why is it called the Beatles Ashram?",
                        "answer": "Because the band stayed here in 1968, bringing unprecedented global attention to Indian spirituality and meditation."
                },
                {
                        "question": "Is it still an active ashram?",
                        "answer": "No, it is currently managed by the Forest Department as a heritage site and museum, though it remains a powerful place for meditation."
                },
                {
                        "question": "How long did the Beatles stay?",
                        "answer": "The stay varied for each member, but George Harrison and John Lennon stayed for the longest duration, approximately two months."
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
    'Parmarth Niketan', 
    'parmarth-niketan-rishikesh', 
    'Sacred Destination', 
    'uk', 
    'The "Abode of Supreme Meaning", Parmarth Niketan is the largest ashram in Rishikesh and one of the most prominent spiritual centers in India. Located on the banks of the Ganga in Swarg Ashram, it is a site of absolute Vedic authority and social service, representing the absolute dedication to the Yoga and the profound energy of the daily Ganga Aarti.', 
    '444.2', 
    '256.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Global Heart of Yoga and the Sanctuary of the Eternal Ganga Aarti', 
    'Parmarth Niketan Rishikesh | Uttarakhand, Yoga & Ancient Lore', 
    'Experience the profound energy of Parmarth Niketan. Discover the home of the International Yoga Festival, the legend of the Swami Shukdevanand, and the profound energy of the Ganga pilgrimage.', 
    'Parmarth Niketan, Rishikesh, Yoga, Ganga Aarti, Swami Chidanand Saraswati, International Yoga Festival, Swarg Ashram, Hindu Pilgrimage', 
    '246', 
    '{
        "spiritualEssence": "Parmarth Niketan is the manifestation of the divine as the supreme discipline and the absolute expansion of the heart through service. The energy here is disciplined, joyful, and intensely river-connected. It is the site where the ancient Gurukul tradition meets the global outreach. The vibration is one of ''Sadhana'' (Spiritual Practice) and the absolute clarity of the Vedic path. As a massive complex featuring over 1,000 rooms and beautifully landscaped gardens on the holy river bank, it represents the spiritual anchor of the modern Rishikesh. A visit here is believed to grant the devotee the absolute purity of the mind and the blessing of the compassionate living. The air is always vibrant with the scent of the incense and the constant, rhythmic sound of the Vedic chanting and the flowing Ganga.",
        "longDescription": "Parmarth Niketan was founded in 1942 by Swami Shukdevanand Saraswati. Today, under the leadership of Swami Chidanand Saraswati, it has become a global hub for Yoga, environmental conservation, and social service. It is famous for its daily Ganga Aarti at Sunset, performed by the resident students (Rishikumars) on the Parmarth Ghat. The ashram is the primary host of the International Yoga Festival, attracting thousands of seekers from over 100 countries. It features an extensive range of spiritual activities, including Hatha Yoga, Vedic chanting, and meditation. The site is a critical center for the ''Clean Ganga'' and ''Wash'' initiatives. Parmarth Niketan is a site where the highest level of Himalayan austerity and the most impactful global service are perfectly unified.",
        "spiritualArchitecture": "The architecture of Parmarth Niketan is a spectacular display of the traditional ashram style with significant modern comforts and grand scale. The complex features numerous residential blocks, grand lecture halls, and a series of beautiful gardens filled with life-sized statues of the Hindu deities. A unique feature is the Parmarth Ghat, a beautifully paved river bank with a massive statue of Lord Shiva in meditation over the water. The architecture is designed to accommodate thousands of seekers while maintaining a sense of a peaceful sanctuary. The use of the vibrant colors, the white-washed buildings, and the expansive courtyards create a sense of a spiritual city that is both welcoming and sacred. The complex includes one of the largest libraries on the Vedic scriptures in the region.",
        "vedicReferences": "Parmarth Niketan is celebrated in the modern spiritual literature as the supreme site where the ''Seva'' and ''Yoga'' have been unified to protect the Sanatana Dharma.",
        "deepInsights": "The daily Ganga Aarti represents the truth that the light of the consciousness must be offered back to the source of the life. Parmarth Niketan teaches that the highest Yoga is the one that serves the world.",
        "ancientLore": "Lore tells that the founder Swami Shukdevanand personally chose this spot because of its alignment with the subterranean currents of the Saraswati river. Another legend says that the prayers performed during the sunset Aarti at Parmarth have the power to heal the generational karmas of the participants.",
        "keyRituals": [
                {
                        "name": "Sunset Ganga Aarti (Parmarth)",
                        "description": "Participating in the world-famous fire ritual on the river bank to seek the blessing of the Mother Ganga."
                },
                {
                        "name": "Morning Yoga Sadhana",
                        "description": "Practicing the traditional Hatha Yoga and the pranayama in the ashram halls to seek the physical and spiritual alignment."
                },
                {
                        "name": "Vedic Chanting Circle",
                        "description": "Joining the resident students in the collective chanting of the Vedas to seek the intellectual purification."
                },
                {
                        "name": "Ganga Seva (River Cleaning)",
                        "description": "Participating in the environmental cleaning projects of the ashram as a form of spiritual offering."
                }
        ],
        "highlights": [
                {
                        "name": "The Giant Shiva Statue",
                        "description": "The iconic statue of Shiva in meditation, standing in the middle of the Ganga river."
                },
                {
                        "name": "Parmarth Ghat",
                        "description": "The sacred river bank where the daily Aarti and the holy dips take place."
                },
                {
                        "name": "The Ashram Gardens",
                        "description": "The beautifully maintained green spaces featuring the statues of the sages and the deities."
                },
                {
                        "name": "The International Yoga Hall",
                        "description": "The grand space that hosts the largest collective Yoga sessions in the world."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (March is the peak season during the Yoga Festival).",
                "howToReach": "Located in the Swarg Ashram area, across the Ram Jhula. Reached by foot over the bridge or by a boat across the river.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Arrive early for the Ganga Aarti (at least 45 minutes before sunset) to secure a good spot on the steps.",
                "Participate in the morning Yoga classes; they are open to all and provide a great introduction to the ashram life.",
                "Maintain the code of conduct and dress modestly while inside the ashram premises; respect the monastic environment."
        ],
        "faqs": [
                {
                        "question": "Can I stay at Parmarth Niketan?",
                        "answer": "Yes, the ashram provides clean and simple accommodation for seekers, but prior booking is highly recommended."
                },
                {
                        "question": "When is the International Yoga Festival?",
                        "answer": "It is held annually in the first week of March (March 1st to 7th)."
                },
                {
                        "question": "Is the Ganga Aarti free?",
                        "answer": "Yes, everyone is welcome to participate in the Aarti on the Parmarth Ghat at no cost."
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
    'Kunjapuri Devi', 
    'kunjapuri-devi-temple', 
    'Sacred Destination', 
    'uk', 
    'The "Flower Goddess of the Peaks", Kunjapuri Devi is a high-altitude Shakti Peeth located on a ridge above Rishikesh. It is a site of absolute solar authority and divine perspective, where the chest of Sati is believed to have fallen, representing the absolute opening of the heart at the gateway to the Greater Himalayas.', 
    '440.2', 
    '250.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sunrise Shakti of the Rishikesh Ridges and the Gate to the High Peaks', 
    'Kunjapuri Devi Temple | Uttarakhand, Shakti Peeth & Ancient Lore', 
    'Experience the profound energy of Kunjapuri Devi. Discover the ridgetop Shakti Peeth, the legend of the falling chest of Sati, and the profound energy of the sunrise pilgrimage.', 
    'Kunjapuri Devi, Uttarakhand, Shakti Peeth, Rishikesh, Hindu Pilgrimage, Ancient Lore, High Altitude, Sunrise View', 
    '247', 
    '{
        "spiritualEssence": "Kunjapuri is the manifestation of the divine as the supreme radiance and the absolute clarity of the dawn. The energy here is solar, uplifting, and intensely panoramic. It is the site where the first light of the sun touches the spiritual grid of Rishikesh. The vibration is one of ''Udaya'' (Rising) and the absolute awakening of the inner fire. As a temple perched on a 1,645-meter peak offering views of the Swarga Rohini, Gangotri, and Banderpunch ranges, it represents the spiritual eye of the lower Himalayas. A visit here is believed to grant the devotee the absolute expansion of the heart and the blessing of the new beginnings. The air is always vibrant with the scent of the mountain herbs and the silent, heavy energy of the zero-obstacle horizon.",
        "longDescription": "Kunjapuri is one of the 51 Shakti Peethas. According to the tradition, when Lord Shiva was carrying the charred body of Sati, her chest (Kunja) fell at this spot. The temple is famous for its spectacular sunrise views, making it the most popular dawn destination for Yoga practitioners and trekkers in Rishikesh. It requires a climb of approximately 300 steps from the road head. The site provides a direct spiritual link to the nearby shrines of Surkanda and Chandrabadni. Legend tells that the Goddess personally chose this peak to ensure that her devotees would always be the first to receive the solar energy of the Himalayas. Kunjapuri is a site where the highest level of geographic observation and the most intense devotion of the ridge-people are perfectly unified.",
        "spiritualArchitecture": "The architecture of Kunjapuri is a spectacular display of the ridge-peak style with a heavy emphasis on the horizontal platforms and the open-air courtyards. The temple features a prominent red and white shikhara and a series of paved walkways that wrap around the mountain top. A unique feature is the presence of the sunrise viewing deck where hundreds of pilgrims stand in silence to witness the birth of the day. The architecture is designed to minimize the visual obstruction of the Himalayan horizon, creating a sense of a spiritual observatory. The use of the vibrant colors and the simple stone construction create a sense of a spiritual home that is anchored to the rock of the peak. The complex includes several small meditation spots near the ancient trees.",
        "vedicReferences": "Kunjapuri is celebrated in the local oral epics as the supreme site where the solar deity Surya first offered prayers to the Divine Mother.",
        "deepInsights": "The falling of the chest represents the truth that the heart is the center of the spiritual radiation. Kunjapuri teaches that the seeker must rise above the valleys of the mind to see the eternal light.",
        "ancientLore": "Lore tells that the bells of the Kunjapuri temple can be heard in the celestial realms during the autumn equinox. Another legend says that the water of the temple well is personally replenished by the clouds of the monsoon to serve the Goddess.",
        "keyRituals": [
                {
                        "name": "Kunjapuri Sunrise Arghya",
                        "description": "Offering sacred water to the rising sun while facing the snow peaks to seek the inner illumination."
                },
                {
                        "name": "Devi Havan (Peak)",
                        "description": "Performing the fire ritual at the ridge top to seek the protection of the Mother for the spiritual path."
                },
                {
                        "name": "Kunja Archana",
                        "description": "Offering the mountain flowers to the chest of the Goddess in the inner sanctum to seek the emotional healing."
                },
                {
                        "name": "Ridge Circumambulation",
                        "description": "Walking around the temple peak to align the individual energy with the mountain''s spiritual axis."
                }
        ],
        "highlights": [
                {
                        "name": "The Sunrise Viewpoint",
                        "description": "The world-famous vantage point for witnessing the sun rise over the Himalayan snow peaks."
                },
                {
                        "name": "The Main Shakti Shrine",
                        "description": "The sacred heart of the temple where the energy of the Shakti Peeth is most intense."
                },
                {
                        "name": "The Himalayan Panorama",
                        "description": "The 360-degree view of the Ganga valley on one side and the high snow ranges on the other."
                },
                {
                        "name": "The Ancient Peepal Tree",
                        "description": "A sacred and ancient tree on the peak where many yogis have performed deep penance."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (sunrise is most clear from October to March).",
                "howToReach": "25km from Rishikesh. Reached by road to the base, followed by a short climb of 300 steps. Popularly visited via a downhill trek to Rishikesh.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Arrive at the temple at least 30 minutes before the calculated sunrise time to experience the pre-dawn glow.",
                "The downhill trek from Kunjapuri back to Rishikesh (via Neer Garh waterfall) is a spectacular spiritual and nature walk; highly recommended for fit travelers.",
                "Carry a light jacket as the ridge top can be quite windy and cold in the early morning hours."
        ],
        "faqs": [
                {
                        "question": "How high is the temple?",
                        "answer": "It is located at an altitude of approximately 1,645 meters (5,400 feet)."
                },
                {
                        "question": "Is it a difficult climb?",
                        "answer": "The 300 steps are well-paved and manageable for most people; it takes about 15-20 minutes."
                },
                {
                        "question": "Which peaks are visible?",
                        "answer": "On a clear day, you can see Swarga Rohini, Gangotri, Yamunotri, and several other high peaks of the Garhwal Himalayas."
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
    'Mahavatar Babaji Cave', 
    'mahavatar-babaji-cave-pandukholi', 
    'Sacred Destination', 
    'uk', 
    'The "Biological Source of Kriya Yoga", the Mahavatar Babaji Cave is located in the Pandukholi hills near Dwarahat. It is a site of absolute esoteric authority and global lineage, being the specific spot where the immortal master Mahavatar Babaji initiated Lahiri Mahasaya into the Kriya Yoga in 1861, representing the absolute revival of the ancient yogic science in the modern world.', 
    '520.5', 
    '245.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Birthplace of the Modern Kriya Yoga and the Sanctuary of the Immortal Master', 
    'Mahavatar Babaji Cave Pandukholi | Uttarakhand, Kriya Yoga & Ancient Lore', 
    'Experience the profound silence of the Mahavatar Babaji Cave. Discover the Pandukholi hills, the legend of the immortal master, and the profound energy of the Kriya Yoga pilgrimage.', 
    'Mahavatar Babaji, Kriya Yoga, Pandukholi, Dwarahat, Lahiri Mahasaya, Paramahansa Yogananda, Autobiography of a Yogi, Hindu Pilgrimage, Ancient Lore', 
    '248', 
    '{
        "spiritualEssence": "The Mahavatar Babaji Cave is the manifestation of the divine as the supreme immortality and the absolute preservation of the yogic light. The energy here is thin, luminous, and intensely subtle. It is the site where the time itself seems to suspend. The vibration is one of ''Amritatva'' (Immortality) and the absolute transmission of the spiritual power from the master to the disciple. As a small, natural cave located on a high mountain ridge surrounded by dense pine and oak forests, it represents the spiritual womb of the global Kriya Yoga community. A visit here is believed to grant the devotee the absolute quickening of the spiritual progress and the blessing of the immortal presence. The air is always vibrant with the silent, heavy energy of the masters who are said to still inhabit the area in the subtle forms.",
        "longDescription": "The cave is situated at an altitude of approximately 2,500 meters in the Dronagiri (Dunagiri) range. It became world-famous after the publication of ''Autobiography of a Yogi'' by Paramahansa Yogananda, which describes the miraculous meeting between Babaji and Lahiri Mahasaya at this spot. The trek to the cave starts from the village of Kukuchina and leads through spectacular mountain scenery. Nearby is the Pandukholi meadow, where the Pandavas are said to have stayed during their exile. The cave itself is small and simple, often filled with the fragrance of the incense and the deep silence of the meditating yogis. It is a site of extreme sanctity for practitioners of the Self-Realization Fellowship (SRF) and the Yogoda Satsanga Society (YSS). The cave is a site where the highest level of Himalayan mysticism and the most influential global yogic lineage are perfectly unified.",
        "spiritualArchitecture": "The architecture of the Mahavatar Babaji Cave is a spectacular display of the absolute simplicity of nature. The temple is the natural rock formation of the cave itself, which has been preserved in its primitive state. A unique feature is the small stone platform built at the entrance where pilgrims sit in meditation to face the high peaks of the Kumaon. The architecture is designed to minimize the human footprint and maximize the connection to the mountain energy. The use of the raw, unpolished stone and the narrow entrance create a sense of a spiritual retreat that is hidden from the world of the forms. The complex includes several small meditation spots in the surrounding forest and a simple ashram at the base of the hill.",
        "vedicReferences": "The Babaji Cave is celebrated in the modern yogic literature as the supreme site where the ''Prana-Vidya'' was returned to the humanity to guide the current Yuga.",
        "deepInsights": "The meeting of Babaji and Lahiri represents the truth that the divine guide always appears when the seeker is ready. The cave teaches that the highest truth is found in the absolute interiority of the soul.",
        "ancientLore": "Lore tells that the mountain peak of Pandukholi is part of the Dronagiri hill carried by Hanuman, and it still contains the life-giving herbs. Another legend says that Mahavatar Babaji personally materializes a golden palace on this ridge once every century to initiate the high-level masters.",
        "keyRituals": [
                {
                        "name": "Kriya Yoga Meditation",
                        "description": "Performing the sacred breath-control and the meditation techniques inside the cave to seek the spiritual awakening."
                },
                {
                        "name": "Babaji Arati",
                        "description": "The ritual of offering light to the image of the immortal master at the cave entrance to seek the divine guidance."
                },
                {
                        "name": "Pandukholi Parikrama",
                        "description": "Walking around the sacred ridge of the Pandavas to seek the blessing of the ancient heroes and the sages."
                },
                {
                        "name": "Lineage Prayer",
                        "description": "Chanting the names of the Kriya Yoga masters to seek the alignment with the spiritual chain of the transmission."
                }
        ],
        "highlights": [
                {
                        "name": "The Holy Cave",
                        "description": "The specific natural cave where the Kriya Yoga initiation took place in 1861."
                },
                {
                        "name": "Pandukholi Meadow",
                        "description": "The high-altitude alpine meadow associated with the Pandavas, offering spectacular views of the snow ranges."
                },
                {
                        "name": "The Kukuchina Trail",
                        "description": "The scenic and spiritually charged trekking path that leads to the sacred cave."
                },
                {
                        "name": "The Smriti Bhawan",
                        "description": "A small memorial building dedicated to the masters of the Kriya Yoga lineage near the base camp."
                }
        ],
        "travelInfo": {
                "bestTime": "April to June and September to November (the trail is most accessible and beautiful during these months).",
                "howToReach": "Reached via Dwarahat (Almora district). Drive to Kukuchina, followed by a 3km uphill trek to the cave.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Maintain absolute silence while inside and around the cave; it is a dedicated space for deep meditation.",
                "The trek is steep but well-marked; carry adequate water and wear sturdy walking shoes.",
                "If you are a practitioner of Kriya Yoga, coordinate with the YSS or SRF centers for guidance on the specific pilgrimage protocols."
        ],
        "faqs": [
                {
                        "question": "Who is Mahavatar Babaji?",
                        "answer": "An immortal Himalayan master who is said to have lived for centuries and who revived the Kriya Yoga science in the modern era."
                },
                {
                        "question": "How difficult is the trek?",
                        "answer": "It is a 3km uphill climb. It is moderately difficult but manageable for anyone with average fitness."
                },
                {
                        "question": "Can we stay near the cave?",
                        "answer": "There are basic ashram facilities at the base and in Dwarahat, but most pilgrims visit as a day trip from Dwarahat or Ranikhet."
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
    'Golu Devta (Chittai)', 
    'golu-devta-chittai-temple', 
    'Sacred Destination', 
    'uk', 
    'The "God of Justice", Golu Devta is the most celebrated folk deity of the Kumaon region, located near Almora. It is a site of absolute legal and spiritual authority, where the deity is believed to be the supreme judge who hears the petitions of the common people, representing the absolute manifestation of the divine justice and the profound energy of the folk-devotion.', 
    '560.2', 
    '245.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Judge of Kumaon and the Temple of the Thousand Bells', 
    'Golu Devta Chittai Temple | Uttarakhand, Folk Justice & Ancient Lore', 
    'Experience the profound energy of Golu Devta. Discover the temple of the bells, the legend of the God of Justice, and the profound energy of the Kumaon folk pilgrimage.', 
    'Golu Devta, Chittai, Almora, Uttarakhand, God of Justice, Hindu Pilgrimage, Ancient Lore, Folk Deity, Bells Temple', 
    '249', 
    '{
        "spiritualEssence": "Golu Devta is the manifestation of the divine as the supreme fairness and the absolute accessibility of the spiritual law. The energy here is resonant, vibrant, and intensely human. It is the site where the grievances of the earth are presented to the heaven. The vibration is one of ''Nyaya'' (Justice) and the absolute clarity of the truth. As a temple covered in thousands of brass bells of all sizes, it represents the spiritual court of the Himalayas. A visit here is believed to grant the devotee the absolute resolution of the disputes and the blessing of the divine intervention. The air is always vibrant with the constant, melodic ringing of the bells and the silent, heavy energy of the thousands of written prayers.",
        "longDescription": "Golu Devta is considered an incarnation of Gaur Bhairav (Shiva). The Chittai temple is the most famous of his shrines. It is unique in the world because devotees do not just pray; they write formal petitions on stamp paper or simple sheets and hang them in the temple premises. When a wish is fulfilled or justice is served, the devotee returns to hang a brass bell. The sight of thousands of bells and fluttering papers creates a surreal and powerful atmosphere. Golu Devta is known for his white horse and his absolute commitment to the truth. The temple is a critical center for the social and spiritual life of the Kumaon people. It is a site where the highest level of Himalayan folk tradition and the most practical human faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of the Golu Devta temple is a spectacular display of the Kumaoni folk style with a focus on the commemorative and the collective. The temple features a central stone shrine with a simple shikhara, but the true architecture is the canopy of the thousands of brass bells that hang from every available pillar and roof beam. A unique feature is the presence of the expansive courtyard walls covered in written letters and petitions. The architecture is designed to create a sense of a spiritual archive that is constantly growing. The use of the polished brass against the dark stone and the white-washed walls create a sense of a spiritual palace that is built by the gratitude of the people. The complex includes several smaller shrines dedicated to the family of the deity.",
        "vedicReferences": "Golu Devta is celebrated in the local oral epics as the supreme site where the divine law was established to protect the innocent from the tyranny of the ego.",
        "deepInsights": "The hanging of the bell represents the truth that the gratitude is the final step of the prayer. Golu Devta teaches that the divine is always listening to the voice of the common man.",
        "ancientLore": "Lore tells that Golu Devta was a historical prince of the Chand dynasty who was famous for his absolute justice and was deified after his death. Another legend says that the bells of the Chittai temple ring on their own whenever a supreme act of injustice is committed in the mountains.",
        "keyRituals": [
                {
                        "name": "Nyaya Patra Lekhan",
                        "description": "The ritual of writing a formal petition to the God of Justice to seek the resolution of a problem or a dispute."
                },
                {
                        "name": "Ghanti Arpan (Bell Offering)",
                        "description": "The ritual of hanging a brass bell to mark the fulfillment of a vow and to offer thanks to the deity."
                },
                {
                        "name": "Golu Devta Jaagar",
                        "description": "Participating in the traditional night-long ritual of chanting and drumming to invoke the spirit of the God."
                },
                {
                        "name": "White-Horse Puja",
                        "description": "Offering prayers to the symbolic white horse of Golu Devta to seek the speed and the clarity of the justice."
                }
        ],
        "highlights": [
                {
                        "name": "The Canopy of Bells",
                        "description": "The stunning collection of thousands of brass bells that characterize the temple."
                },
                {
                        "name": "The Petition Walls",
                        "description": "The unique space where thousands of written letters to the God are displayed."
                },
                {
                        "name": "The Main Golu Idol",
                        "description": "The powerful image of the deity seated on a white horse, holding a bow and arrow."
                },
                {
                        "name": "The Ancient Courtyard",
                        "description": "The historic stone heart of the temple where the energy of the folk justice is most intensely felt."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the temple is vibrant during the local festivals).",
                "howToReach": "8km from Almora town. Well connected by road; regular taxis and buses run from Almora.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "If you have a genuine grievance, follow the local tradition of writing it down respectfully and hanging it in the temple.",
                "Buy a small bell from the local shops to offer as a token of your visit; the sound of the bell is considered a spiritual vibration.",
                "Respect the local folk traditions; Golu Devta is deeply revered as a living presence by the Kumaoni people."
        ],
        "faqs": [
                {
                        "question": "Why do people hang bells?",
                        "answer": "Bells are hung as a mark of gratitude once a devotee''s prayer or petition for justice has been answered by the deity."
                },
                {
                        "question": "Can I write a letter in English?",
                        "answer": "Yes, devotees write in many languages; it is the intention and the faith that matter to the God of Justice."
                },
                {
                        "question": "Is it the same as the Ghorakhal temple?",
                        "answer": "Both are dedicated to Golu Devta, but the Chittai temple is considered the most important and the original seat of the deity."
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
    'Dunagiri Devi', 
    'dunagiri-devi-temple-dwarahat', 
    'Sacred Destination', 
    'uk', 
    'The "Shakti of the Kriya Valley", Dunagiri Devi is a supreme Shakti shrine located on a high hill near Dwarahat. It is a site of absolute ancient authority and yogic resonance, being the place where the Mother Goddess is believed to have appeared to the sages and where Mahavatar Babaji meditated, representing the absolute source of the spiritual energy in the Dronagiri range.', 
    '522.2', 
    '243.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of the Dronagiri Peaks and the Guardian of the Kriya Yoga Lineage', 
    'Dunagiri Devi Temple | Uttarakhand, Shakti Peeth & Ancient Lore', 
    'Experience the profound energy of Dunagiri Devi. Discover the mountain-top Shakti shrine, the legend of the healing herbs, and the profound energy of the Dwarahat pilgrimage.', 
    'Dunagiri Devi, Uttarakhand, Shakti Peeth, Dwarahat, Mahavatar Babaji, Kriya Yoga, Hindu Pilgrimage, Ancient Lore, High Altitude', 
    '250', 
    '{
        "spiritualEssence": "Dunagiri Devi is the manifestation of the divine as the supreme wisdom and the absolute healing of the Dronagiri peaks. The energy here is ancient, steady, and intensely restorative. It is the site where the earth-energy is concentrated in the form of the Mother. The vibration is one of ''Vidya'' (Knowledge) and the absolute clarity of the spiritual path. As a temple perched on a high ridge overlooking the fertile valleys of Dwarahat and the snow peaks of the North, it represents the spiritual lighthouse of the Kriya Yoga valley. A visit here is believed to grant the devotee the absolute removal of the ignorance and the blessing of the spiritual healing. The air is always vibrant with the scent of the medicinal herbs and the silent, heavy energy of the millennia of the yogic practices.",
        "longDescription": "Dunagiri (also known as Dronagiri) is identified in the local tradition as the mountain that Hanuman carried to save Lakshmana. The temple of Dunagiri Devi is situated at the top of a hill, accessible by a climb of 500 steps. It is considered one of the most powerful Shakti sites in the Kumaon region. The site is intimately connected with the Kriya Yoga lineage; it is said that Mahavatar Babaji meditated at this shrine before establishing the Kriya science. The temple is famous for its simple but intense energy and its association with the ancient sages who lived in the surrounding caves. The area is rich in Ayurvedic herbs and is believed to have the power to heal physical and spiritual ailments. Dunagiri is a site where the highest level of Puranic legend and the most advanced yogic tradition are perfectly unified.",
        "spiritualArchitecture": "The architecture of Dunagiri Devi is a spectacular display of the traditional mountain temple style with a focus on the verticality and the rock-foundation. The temple features a series of narrow stone stairways that lead to the inner sanctum carved into the mountain rock. A unique feature is the presence of the open-air viewing balconies that offer a direct line of sight to the Mahavatar Babaji cave on the opposite ridge. The architecture is designed to emphasize the exposure to the elements and the isolation of the peak, creating a sense of a spiritual lighthouse. The use of the dark gray stone and the vibrant red flags create a sense of a spiritual home that is both ancient and alert. The complex includes several small meditation rooms used by the visiting yogis.",
        "vedicReferences": "Dunagiri is celebrated in the local oral traditions as the supreme site where the Mother personally guarded the secret of the ''Sanjeevani'' (Life-giving) herbs.",
        "deepInsights": "The Goddess of the mountain represents the truth that the spiritual healing is the result of the absolute surrender to the divine Mother. Dunagiri teaches that the highest knowledge is the one that restores the soul.",
        "ancientLore": "Lore tells that the steps of the temple were built by the Pandavas in a single night during their journey to the heavens. Another legend says that the Goddess personally appeared to Lahiri Mahasaya at this spot to confirm his readiness for the Kriya initiation.",
        "keyRituals": [
                {
                        "name": "Dunagiri Devi Aarti",
                        "description": "The ritual of offering light to the Goddess at dawn to seek the spiritual awakening and the mental clarity."
                },
                {
                        "name": "Herbal Archana",
                        "description": "Offering the local medicinal leaves and the flowers to the deity to seek the physical healing and the longevity."
                },
                {
                        "name": "Babaji Smriti Puja",
                        "description": "Performing the special prayers in the temple courtyard to seek the blessing of the Kriya Yoga lineage."
                },
                {
                        "name": "Ridge-Top Meditation",
                        "description": "Sitting on the temple steps to practice the silent meditation while facing the high snow peaks."
                }
        ],
        "highlights": [
                {
                        "name": "The Rock-Cut Sanctum",
                        "description": "The ancient heart of the temple where the energy of the Goddess is most intense."
                },
                {
                        "name": "The 500-Step Climb",
                        "description": "The scenic and spiritually charged stairway that leads to the mountain top shrine."
                },
                {
                        "name": "The Kriya Yoga Viewpoint",
                        "description": "The specific balcony from where one can see the ridge of the Mahavatar Babaji cave."
                },
                {
                        "name": "The Ancient Pine Grove",
                        "description": "The sacred forest that surrounds the temple hill, believed to be the home of the mountain devas."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the views are most clear from October to March).",
                "howToReach": "15km from Dwarahat town. Reached by road to the base, followed by a climb of 500 steps.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "The climb is steep but well-paved; take frequent breaks to enjoy the expanding views of the valley.",
                "Visit the temple early in the morning to experience the silence before the main groups of the pilgrims arrive.",
                "Combine your visit with a trip to the nearby Mahavatar Babaji cave for a complete spiritual experience of the Dronagiri region."
        ],
        "faqs": [
                {
                        "question": "How many steps are there?",
                        "answer": "There are approximately 500 well-paved stone steps to reach the main temple at the top of the hill."
                },
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "While it is not always listed in the primary 51, it is locally and spiritually revered as a supreme Shakti site of the Kumaon region."
                },
                {
                        "question": "Where is it located?",
                        "answer": "Near Dwarahat, a historic town in the Almora district of Uttarakhand."
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
    'Kamakhya', 
    'kamakhya', 
    'Shakti Peeth', 
    'as', 
    'Located on the Nilachal Hill in Guwahati, Kamakhya is the most powerful center of Tantric practice. It is where the Yoni (organ of procreation) of Sati fell, representing the primordial creative power of the universe.', 
    '500.5', 
    '260.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Seat of the Primordial Mother', 
    'Kamakhya Temple | Shakti Peeth, Tantric Secrets & Ancient Lore', 
    'Explore the profound mysteries of Kamakhya, the supreme Shakti Peeth. Discover its Tantric history, the Ambubachi Mela, and the philosophy of creative desire.', 
    'Kamakhya, Shakti Peeth, Guwahati, Assam, Tantra, Ambubachi Mela, Goddess Kamakhya, Hindu Pilgrimage, Ancient Lore', 
    '10', 
    '{
        "spiritualEssence": "Kamakhya is the fountainhead of the creative energy (Shakti) that sustains the cosmos. It is not just a temple, but a living vibration of the feminine principle. Unlike other shrines where deities are represented by idols, the sanctum here houses a natural spring that flows through a rock cleft in the shape of a Yoni. This represents the absolute truth that creation is a sacred act. The energy is intense, grounding, and deeply connected to the cycles of nature. It is the place where desire (Kama) is transformed into divine will. Pilgrims come here to surrender to the Mother, seeking the blessing of life, fertility, and the awakening of their own latent creative potential.",
        "longDescription": "The history of Kamakhya is intertwined with the very origin of the Shakti Peeths. After the death of Sati at Daksha''s Yagna, Lord Shiva in his grief performed the Tandava with her body. To stop the destruction, Lord Vishnu used his Sudarshana Chakra to divide her body into 51 parts. The Yoni of the Goddess fell upon the Nilachal Hill. For centuries, the site remained hidden until it was recovered and worshipped by the local Kirata kings. The current temple was rebuilt in 1565 by King Chilarai of the Koch dynasty after being destroyed by invaders. The temple is unique for its Nilachal style of architecture, featuring a hemispherical dome on a cruciform base. Every year during the Ambubachi Mela, it is believed that the Goddess undergoes her annual menstrual cycle, during which the temple remains closed. The reopening is a massive spiritual event where the Brahmaputra river is said to turn red, symbolizing the fertility of the earth.",
        "spiritualArchitecture": "The Kamakhya temple is a masterpiece of the medieval Koch architecture. The main temple (Garbhagriha) is an underground cave where the natural spring flows. The exterior is adorned with intricate sculptures of various goddesses, warriors, and animals. The Shikhara (spire) is beehive-shaped, a characteristic of the Nilachal style. Surrounding the main shrine are smaller temples dedicated to the ten Mahavidyas (wisdom goddesses), making the entire complex a complete map of the Tantric universe.",
        "vedicReferences": "Kamakhya is extensively documented in the Kalika Purana and the Yogini Tantra. It is hailed as the supreme site for attaining Siddhis (spiritual powers). The texts describe the hill as the body of Shiva himself, with the temple being the most sacred point of union.",
        "deepInsights": "Esoterically, Kamakhya represents the Swadhisthana chakra—the center of creativity and desire. The practice here involves the integration of the material and the spiritual. It teaches that the body is not an obstacle to liberation but a vessel for it. The three-day closure during Ambubachi is a metaphor for the period of internal gestation and the necessity of rest and renewal in the spiritual journey.",
        "ancientLore": "A fascinating lore speaks of the demon Naraka, who wanted to marry the Goddess. Kamakhya set a condition: he had to build a staircase from the foot of the hill to the temple in a single night before the cock crowed. Fearing his success, the Goddess made a cock crow prematurely. The incomplete staircase, known as the Mekhelauja Path, still exists as a reminder of the futility of ego-driven desire.",
        "keyRituals": [
                {
                        "name": "Kumari Puja",
                        "description": "The worship of young girls as living manifestations of the Goddess, particularly performed during Durga Puja."
                },
                {
                        "name": "Nitya Puja",
                        "description": "The daily worship involving the offering of vermilion and flowers to the natural stone Yoni."
                },
                {
                        "name": "Ambubachi Rituals",
                        "description": "Special prayers performed during the annual fertility festival when the temple is closed to the public."
                }
        ],
        "highlights": [
                {
                        "name": "Ten Mahavidya Temples",
                        "description": "Shrines dedicated to the ten forms of the Goddess within the complex."
                },
                {
                        "name": "Nilachal Viewpoint",
                        "description": "Offering a panoramic view of the Brahmaputra river and Guwahati city."
                },
                {
                        "name": "Umananda Temple",
                        "description": "Located on an island in the Brahmaputra, dedicated to Lord Shiva, the consort of Kamakhya."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and June for Ambubachi Mela).",
                "howToReach": "Located in Guwahati, well connected by air (Gopinath Bordoloi Airport) and rail (Guwahati/Kamakhya station).",
                "nearestAirport": "Guwahati Airport.",
                "nearestRailway": "Kamakhya Railway Station."
        },
        "tips": [
                "Be prepared for long queues, especially on Tuesdays and Saturdays.",
                "Wear traditional or modest clothing to maintain the sanctity of the cave.",
                "Do not carry leather items inside the inner sanctum."
        ],
        "faqs": [
                {
                        "question": "What is the significance of the red cloth (Angodak)?",
                        "answer": "It is the sacred cloth distributed after Ambubachi, believed to be saturated with the Goddess''s creative energy."
                },
                {
                        "question": "Can men enter the temple?",
                        "answer": "Yes, men are allowed, though during certain festivals or specific rituals, access might be restricted."
                },
                {
                        "question": "Is there an entry fee?",
                        "answer": "General entry is free, but there are special tickets for faster (VIP) Darshan."
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
    'Trimbakeshwar (Nashik)', 
    'trimbakeshwar', 
    'Jyotirlinga', 
    'mh', 
    'Located near the source of the Godavari river, Trimbakeshwar is unique among Jyotirlingas for its three-faced lingam, representing Brahma, Vishnu, and Mahesh. It is the premier site for ancestral rites and the removal of karmic doshas.', 
    '91.2', 
    '415.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Source of the Godavari', 
    'Trimbakeshwar Jyotirlinga | Nashik, Three-Faced Shiva & Ancestral Lore', 
    'Discover the mysteries of Trimbakeshwar, the three-faced Jyotirlinga. Explore the legend of Sage Gautama, the Godavari source, and the Narayan Nagbali rituals.', 
    'Trimbakeshwar, Jyotirlinga, Nashik, Maharashtra, Godavari, Lord Shiva, Brahma Vishnu Mahesh, Narayan Nagbali, Lore', 
    '11', 
    '{
        "spiritualEssence": "Trimbakeshwar is the point of cosmic balance. The presence of the three faces in one lingam signifies the unity of creation, preservation, and destruction. The energy here is fluid and purifying, mirroring the flow of the Godavari. It is a site of deep karmic cleansing. The vibration is one of paternal protection and spiritual guidance. It is believed that a visit here restores the balance in one''s lineage, healing the wounds of the past and paving the way for a blessed future.",
        "longDescription": "The origin of Trimbakeshwar is linked to the penance of Sage Gautama. During a severe drought, the Sage prayed to Lord Shiva to bring the Ganges to the South. Shiva appeared and released a lock of his hair, from which the Godavari (Gautami Ganga) emerged. The current temple was built by the Peshwa Balaji Baji Rao in the 18th century using black stone. The temple is situated at the foothills of the Brahmagiri mountain. The lingam is situated in a depression on the floor of the sanctum and is constantly washed by a natural spring. The three faces are covered by a golden crown (Mukut) during special festivals, a sight of immense spiritual power.",
        "spiritualArchitecture": "The temple is a masterpiece of the Maratha style, built entirely of black basalt stone. It features a massive courtyard and a towering Shikhara. The carvings on the pillars and walls depict the various legends of Shiva and the avatars of Vishnu. The temple complex also includes the sacred Kushavarta tank, where the Godavari is said to take its first earthly form.",
        "vedicReferences": "Trimbakeshwar is mentioned in the Shiva Purana and the Skanda Purana as one of the most vital sites for spiritual realization. It is the primary center for performing Narayan Nagbali and Kalsarpa Dosha rituals.",
        "deepInsights": "The three faces represent the three Gunas (Sattva, Rajas, Tamas) and the three states of consciousness (Waking, Dreaming, Deep Sleep). Trimbakeshwar teaches that the divine is the underlying reality of all dualities. The depression in which the lingam sits symbolizes the cave of the heart where the divine resides.",
        "ancientLore": "Lore tells of the struggle between Sage Gautama and other sages who tried to frame him for the death of a cow. To prove his innocence and purify himself, he brought the Ganges down. Another legend says that the golden crown of the Lord contains the world''s largest emerald, which was gifted by the Peshwas.",
        "keyRituals": [
                {
                        "name": "Narayan Nagbali",
                        "description": "A powerful 3-day ritual performed to appease the souls of ancestors and remove lineage-related obstacles."
                },
                {
                        "name": "Kushavarta Snan",
                        "description": "The mandatory holy dip in the sacred tank before entering the temple."
                },
                {
                        "name": "Rudrabhishek",
                        "description": "The continuous bathing of the three-faced lingam with Vedic chants."
                }
        ],
        "highlights": [
                {
                        "name": "Brahmagiri Hill",
                        "description": "A 2-hour trek to the source of the Godavari river."
                },
                {
                        "name": "Gorakhnath Gufa",
                        "description": "The cave where Sage Gorakhnath performed penance."
                },
                {
                        "name": "Gangadwar",
                        "description": "The spot on the hill where the Godavari first appears."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "28km from Nashik city, well connected by road and rail.",
                "nearestAirport": "Nashik Airport / Mumbai Airport.",
                "nearestRailway": "Nashik Road Railway Station."
        },
        "tips": [
                "Male devotees must wear a dhoti for certain inner sanctum rituals.",
                "Start early to avoid the heavy rush during weekends.",
                "Carry a change of clothes if you plan to take a dip in Kushavarta."
        ],
        "faqs": [
                {
                        "question": "What is unique about the lingam?",
                        "answer": "It is the only Jyotirlinga that has three faces representing Brahma, Vishnu, and Mahesh."
                },
                {
                        "question": "Why is Narayan Nagbali performed here?",
                        "answer": "Because of the presence of the three-faced Lord and the sacred Godavari, it is considered the most effective site for ancestral peace."
                },
                {
                        "question": "How far is the Brahmagiri trek?",
                        "answer": "It is about 700 steps and takes roughly 2 hours for an average climber."
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
    'Mallikarjuna (Srisailam)', 
    'mallikarjuna', 
    'Jyotirlinga & Shakti Peeth', 
    'ap', 
    'Perched on the Srisailam mountain over the Krishna river, Mallikarjuna is a rare ''Maha Kshetra'' where a Jyotirlinga and a Shakti Peeth (Bhramaramba) coexist. It is the site where Shiva and Parvati resided to be near their son Kartikeya.', 
    '250.2', 
    '500.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mountain Abode of the Divine Couple', 
    'Mallikarjuna Jyotirlinga | Srisailam, Shakti Peeth & Ancient Lore', 
    'Step into the sacred heights of Srisailam. Discover the Mallikarjuna Jyotirlinga, the Bhramaramba Shakti Peeth, and the deep legends of the Krishna river.', 
    'Mallikarjuna, Jyotirlinga, Shakti Peeth, Srisailam, Andhra Pradesh, Lord Shiva, Bhramaramba, Krishna River, Lore', 
    '12', 
    '{
        "spiritualEssence": "Mallikarjuna is the realm of the unified divine. The presence of the Lord as Mallikarjuna (the Jasmine Lord) and the Mother as Bhramaramba (the Bee Mother) creates a vibration of complete cosmic harmony. The energy is one of deep love and parental care. Located amidst the dense Nallamala forests, the site is a sanctuary for the soul. It is believed that even a glimpse of the Srisailam peak (Sikhara Darshanam) guarantees that one will not be reborn into the world of suffering. The vibration is ancient, potent, and deeply transformative.",
        "longDescription": "The legend of Srisailam involves Lord Kartikeya (Murugan). After losing a race around the world to his brother Ganesha, Kartikeya moved to the Kraunja mountain in anger. To be near their son, Shiva and Parvati descended as Mallikarjuna and Bhramaramba. The temple has been patronized by every major dynasty including the Satavahanas, Pallavas, and the great Vijayanagara kings. Shivaji Maharaj also sought blessings here and built a massive gopuram. The temple is fortified by a massive wall (Prakaram) carved with thousands of relief sculptures depicting the epics. The Bhramaramba shrine is one of the 18 Maha Shakti Peeths, where the neck of Sati is said to have fallen.",
        "spiritualArchitecture": "The temple is a masterpiece of Dravidian architecture. The main temple is built in a sprawling complex with towering gopurams. The Prakaram wall is particularly famous for its intricate carvings of elephants, warriors, and divine scenes. The inner sanctum houses a small Jyotirlinga on a silver pedestal. The Bhramaramba temple, located behind the main shrine, is a beautiful structure where the sounds of a humming bee are said to be heard from the walls.",
        "vedicReferences": "Srisailam is mentioned in the Mahabharata, the Skanda Purana, and the Shiva Purana. Adi Shankaracharya composed his famous ''Sivananda Lahiri'' here. It is considered the second Jyotirlinga in the traditional list.",
        "deepInsights": "The name Mallika (Jasmine) and Arjuna (the tree) symbolize the union of the delicate and the strong. The Bee (Bhramara) represents the soul that is constantly humming the name of the divine. Srisailam teaches that the divine is always accessible to those who seek with a pure heart, just as the parents followed their son out of love.",
        "ancientLore": "A fascinating lore speaks of a princess named Chandravati who fled to the mountains and offered a garland of Mallika flowers to the Lord daily. The Lord appeared and resided there as Mallikarjuna. Another lore states that the sages and gods reside in the Nallamala forest as trees to perform eternal worship of the Lord.",
        "keyRituals": [
                {
                        "name": "Sikharam Darshanam",
                        "description": "Viewing the temple spire from a distance, believed to grant liberation."
                },
                {
                        "name": "Sparsha Darshan",
                        "description": "A rare opportunity for devotees to personally touch the Jyotirlinga and perform abhishekam."
                },
                {
                        "name": "Kumbhabhishekam",
                        "description": "The ritualistic consecration of the temple towers with holy water."
                }
        ],
        "highlights": [
                {
                        "name": "Srisailam Dam",
                        "description": "One of the largest dams in India, built across the Krishna river."
                },
                {
                        "name": "Patalganga",
                        "description": "The sacred bathing ghat on the Krishna river, accessible by ropeway or steps."
                },
                {
                        "name": "Akka Mahadevi Caves",
                        "description": "Ancient caves where the famous saint-poetess Akka Mahadevi performed penance."
                }
        ],
        "travelInfo": {
                "bestTime": "September to March.",
                "howToReach": "Connected by road from Hyderabad (230km) and Kurnool. The nearest railway station is Markapur Road.",
                "nearestAirport": "Rajiv Gandhi International Airport, Hyderabad.",
                "nearestRailway": "Markapur Road Railway Station."
        },
        "tips": [
                "Take the ropeway to Patalganga for a scenic view of the river.",
                "Visit the Chenchu Lakshmi Tribal Museum nearby.",
                "Carry warm clothes if visiting during winter as it gets cold in the forest."
        ],
        "faqs": [
                {
                        "question": "Can I touch the lingam?",
                        "answer": "Yes, Mallikarjuna is one of the few Jyotirlingas where devotees are allowed Sparsha Darshan (touching the deity)."
                },
                {
                        "question": "Is there a forest safari nearby?",
                        "answer": "Srisailam is part of the Nagarjunasagar-Srisailam Tiger Reserve, and forest department tours are available."
                },
                {
                        "question": "What is the best way to reach from Hyderabad?",
                        "answer": "Driving or taking a state bus (TSRTC) is the most convenient way; the journey takes about 5-6 hours."
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
    'Omkareshwar', 
    'omkareshwar', 
    'Jyotirlinga', 
    'mp', 
    'Located on an island shaped like the sacred symbol ''Om'' in the Narmada river, Omkareshwar is the manifest form of the primordial sound. It is a site of deep penance and the union of the river and the divine.', 
    '220.5', 
    '320.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Island of the Primordial Sound', 
    'Omkareshwar Jyotirlinga | Narmada Island, Ancient Lore & Deep Insights', 
    'Discover the spiritual power of Omkareshwar. Explore the island shaped like Aum, the legend of King Mandhata, and the sacred Narmada Parikrama.', 
    'Omkareshwar, Jyotirlinga, Madhya Pradesh, Narmada River, Om Island, Lord Shiva, Mandhata, Hindu Pilgrimage', 
    '13', 
    '{
        "spiritualEssence": "Omkareshwar is the sonic heart of the universe. The island itself, Mandhata, is a natural manifestation of the sacred syllable ''Om''. The energy here is one of vibration and resonance. The Narmada river, which is said to be the daughter of Shiva, flows with a unique tranquility here. It is the site where the absolute (Brahman) takes a physical form to bless the seeker. The vibration is one of profound peace and the realization of the interconnectedness of all things. A visit here is believed to awaken the inner sound (Anahata Nada) within the devotee.",
        "longDescription": "The origin of Omkareshwar involves the penance of the Vindhya mountains and the great King Mandhata. To atone for their pride and seek divine grace, they performed intense worship of Shiva. The Lord appeared and divided himself into two forms—Omkareshwar (on the island) and Amareshwar (on the mainland)—to satisfy the devotees. The temple has survived multiple centuries of history and stands as a beacon of Nagara architecture. The entire island is a sacred landscape, and the Omkareshwar Parikrama (circumambulation) is a vital ritual for any pilgrim. The Narmada here is considered so holy that the mere sight of it is equal to a bath in the Ganges.",
        "spiritualArchitecture": "The temple is built in the North Indian Nagara style, featuring a massive assembly hall with 60 huge carved pillars. The Shikhara is intricately designed with multiple tiers. The inner sanctum is simple but powerful, containing the natural rock lingam. The temple complex includes several shrines dedicated to Ganesha, Parvati, and the five Pandavas. The bridge connecting the mainland to the island offers a spectacular view of the temple and the river.",
        "vedicReferences": "Omkareshwar is described in the Skanda Purana (Reva Khanda) and the Shiva Purana. It is hailed as the place where the divine energy is most concentrated due to the sacred geography of the island.",
        "deepInsights": "The island shaped like ''Om'' signifies that the entire material world is a manifestation of the divine sound. Omkareshwar teaches that the divine is both transcendent and immanent. The division of the lingam into two parts represents the duality of the world which ultimately stems from a single source.",
        "ancientLore": "Lore tells of a massive battle between the Gods and the Demons where the Gods were losing. They prayed to Shiva at this spot, and he appeared as Omkareshwar to defeat the demons. Another legend says that King Mandhata, the ancestor of Lord Rama, performed such intense penance here that Shiva agreed to reside on the island permanently.",
        "keyRituals": [
                {
                        "name": "Narmada Aarti",
                        "description": "A beautiful evening ritual performed on the banks of the river, honoring the life-giving water."
                },
                {
                        "name": "Omkareshwar Parikrama",
                        "description": "The 7km walk around the island, visiting various shrines and viewpoints."
                },
                {
                        "name": "Sajja Aarti",
                        "description": "The evening ritual where the Lord is put to rest with the chanting of traditional hymns."
                }
        ],
        "highlights": [
                {
                        "name": "Mandhata Island",
                        "description": "The sacred island shaped like the symbol Om."
                },
                {
                        "name": "Mamleshwar Temple",
                        "description": "The counterpart of Omkareshwar on the southern bank, equally sacred."
                },
                {
                        "name": "Kajal Rani Cave",
                        "description": "A scenic spot offering a panoramic view of the Narmada valley."
                }
        ],
        "travelInfo": {
                "bestTime": "September to March.",
                "howToReach": "77km from Indore, well connected by road. The nearest railway station is Omkareshwar Road.",
                "nearestAirport": "Indore Airport.",
                "nearestRailway": "Omkareshwar Road / Indore Junction."
        },
        "tips": [
                "Take a boat ride around the island for a complete spiritual experience.",
                "Try the local Malwa cuisine in the small towns nearby.",
                "Carry a torch if you plan to explore the caves or trek the island path at dusk."
        ],
        "faqs": [
                {
                        "question": "Is it true that there are two Jyotirlingas here?",
                        "answer": "Yes, Omkareshwar and Mamleshwar are considered two parts of the same divine manifestation and a visit is incomplete without both."
                },
                {
                        "question": "How long is the Parikrama?",
                        "answer": "The island Parikrama is about 7 kilometers and takes 2-3 hours to complete on foot."
                },
                {
                        "question": "Can we take a holy dip in the Narmada?",
                        "answer": "Yes, there are several safe ghats around the island for a ritual bath."
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
    'Baidyanath', 
    'baidyanath', 
    'Jyotirlinga & Shakti Peeth', 
    'jh', 
    'Known as the ''Healer of the Universe,'' Baidyanath is where Ravana offered his ten heads to Shiva. It is a rare site where the Heart of Sati fell, making it a dual seat of the Great Physician and the Mother Jai Durga.', 
    '360.5', 
    '320.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Healer of the Universe', 
    'Baidyanath Jyotirlinga | Deoghar, Shakti Peeth & Ravana''s Legend', 
    'Experience the healing grace of Baidyanath. Discover the legend of Ravana, the Jai Durga Shakti Peeth, and the sacred Kanwar Yatra of Deoghar.', 
    'Baidyanath, Jyotirlinga, Shakti Peeth, Deoghar, Jharkhand, Lord Shiva, Ravana, Jai Durga, Healing, Lore', 
    '14', 
    '{
        "spiritualEssence": "Baidyanath is the sanctuary of the ultimate physician. The name itself means ''Lord of the Physicians''. The energy here is therapeutic and restorative. It is the place where physical and spiritual ailments are dissolved in the grace of the Lord. Because the Heart of Sati fell here, the vibration is one of deep compassion and nurturing. It is a site of absolute surrender, as seen in the legend of Ravana. The atmosphere, especially during Shravan, is one of intense collective devotion. A visit here is believed to grant a healthy life and the wisdom to use that life for spiritual growth.",
        "longDescription": "The legend of Baidyanath involves the great devotee-king Ravana. Seeking to take Shiva to Lanka, Ravana performed extreme penance, offering his heads one by one. Shiva, pleased, healed him and became known as Baidyanath. He agreed to go as a lingam, on the condition that Ravana would not set it down. Through divine play, Ravana was tricked into setting the lingam down at Deoghar, and it became rooted there forever. The temple is one of the most ancient in India, with the current structure featuring a series of 22 temples dedicated to various deities. The Jai Durga Shakti Peeth is located directly opposite the main shrine, connected by red silk threads, symbolizing the eternal union of Shiva and Shakti.",
        "spiritualArchitecture": "The temple is built in a simple but elegant style with a massive pyramidal spire. The 22 temples are enclosed in a common courtyard. The main temple houses the Jyotirlinga, which is slightly broken at the top, believed to be the mark of Ravana''s attempt to pull it out. A unique feature is the presence of a massive brass vessel (Kalash) atop the spire, which is said to have protective properties.",
        "vedicReferences": "Baidyanath is mentioned in the Shiva Purana and the Padma Purana. It is the focal point of the world-famous Kanwar Yatra, where millions carry Ganges water from Sultanganj to Deoghar.",
        "deepInsights": "The healing aspect of Baidyanath refers to the healing of the soul from the disease of ignorance (Avidya). Ravana''s offering of his heads symbolizes the sacrifice of the ego. Deoghar (the home of Gods) teaches that when the ego is surrendered, the heart becomes the dwelling place of the divine.",
        "ancientLore": "Lore tells that the lingam was worshipped by the Gods including Indra and Vishnu before it was found by humans. Another legend states that the Goddess Parvati herself performs worship of the Lord here in the form of a humming bee during the night hours.",
        "keyRituals": [
                {
                        "name": "Kanwar Yatra",
                        "description": "The 105km walk carrying holy water from the Ganges to offer to the Lord."
                },
                {
                        "name": "Shringari Puja",
                        "description": "Evening ritual where the lingam is adorned with sandalwood, flowers, and ornaments."
                },
                {
                        "name": "Jai Durga Aradhana",
                        "description": "Worship at the Shakti Peeth to invoke the protective energy of the Mother."
                }
        ],
        "highlights": [
                {
                        "name": "Naulakha Temple",
                        "description": "A beautiful temple dedicated to Radha-Krishna, built at a cost of nine lakhs."
                },
                {
                        "name": "Trikuta Hills",
                        "description": "A nearby mountain offering panoramic views and adventure sports."
                },
                {
                        "name": "Sultanganj",
                        "description": "The starting point of the Kanwar Yatra on the banks of the Ganges."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and July-August for Shravan Mela).",
                "howToReach": "Connected by rail (Jasidih station is 7km away). Well connected by road from Patna and Ranchi.",
                "nearestAirport": "Deoghar Airport.",
                "nearestRailway": "Jasidih Junction."
        },
        "tips": [
                "Participate in the Shravan Mela to experience the peak of devotion.",
                "Hire a licensed Panda for navigating the complex rituals of the main shrine.",
                "Visit the Naulakha temple for its serene environment and architecture."
        ],
        "faqs": [
                {
                        "question": "Why is the temple called Baidyanath?",
                        "answer": "Because Lord Shiva acted as a Vaidya (Physician) to heal Ravana''s severed heads during his penance."
                },
                {
                        "question": "How long is the Kanwar Yatra?",
                        "answer": "The traditional trek from Sultanganj to Deoghar is approximately 105 kilometers."
                },
                {
                        "question": "Is there a VIP Darshan?",
                        "answer": "Yes, special entry (Shighra Darshanam) tickets are available for a faster experience."
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
    'Kanak Durga', 
    'kanak-durga', 
    'Shakti Peeth', 
    'ap', 
    'Situated on the Indrakeeladri hill overlooking the Krishna river in Vijayawada, Kanak Durga is the self-manifested form of the Goddess in her supreme radiance. She is the protector of the city and the giver of boons.', 
    '250.5', 
    '510.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Golden Goddess of Indrakeeladri', 
    'Kanak Durga Temple | Vijayawada, Shakti Peeth & Ancient Lore', 
    'Experience the radiant grace of Kanak Durga. Discover the legend of Indrakeeladri, the Krishna river connection, and the vibrant Navratri celebrations.', 
    'Kanak Durga, Vijayawada, Shakti Peeth, Andhra Pradesh, Indrakeeladri, Goddess Durga, Krishna River, Hindu Pilgrimage', 
    '15', 
    '{
        "spiritualEssence": "Kanak Durga is the embodiment of spiritual brilliance (Tejas). The name ''Kanak'' refers to her golden radiance. The energy here is protective, empowering, and maternal. Perched above the bustling city of Vijayawada, the temple represents the watchfulness of the divine over human affairs. The vibration of the Krishna river flowing below adds a sense of purification and abundance. It is a site where one seeks the strength to overcome internal and external obstacles. The Goddess is seen here as the ultimate victor over darkness.",
        "longDescription": "The legend of Kanak Durga is linked to the Indrakeeladri hill. It is said that Arjuna, the third of the Pandavas, performed intense penance here to obtain the Pasupata Astra from Lord Shiva. To commemorate this, the Goddess manifested herself as Kanak Durga. Another legend says that a devotee named Keela performed penance to have the Goddess reside in his heart; she agreed to stay on the mountain that was named after him (Indrakeeladri). The temple architecture is a blend of various South Indian styles. The Navratri festival is celebrated with immense fervor, where the Goddess is adorned in different avatars (Alankaram) each day, drawing millions of devotees.",
        "spiritualArchitecture": "The temple is built on a high ledge of the Indrakeeladri hill. It features multiple gopurams and a spacious Prakaram. The main deity is a self-manifested (Swayambhu) idol of the Goddess with eight arms, standing in a posture of victory. The temple walls are carved with scenes from the Devi Mahatmyam and the Mahabharata. The view of the Krishna river and the Prakasam Barrage from the temple is truly breathtaking.",
        "vedicReferences": "Kanak Durga is mentioned in the Brahmanda Purana and is considered one of the key Shakti centers in the Southern part of India. It is a site of extreme importance for Sri Vidya practitioners.",
        "deepInsights": "The golden color of the Goddess represents the purified consciousness that has been refined through the fire of wisdom. Indrakeeladri represents the pillar of the spine (Sushumna), and the Goddess at the top signifies the reached state of realization.",
        "ancientLore": "Lore tells that the Goddess personally killed the demon Mahishasura on this hill, and the earth here is said to be still charged with that victorious energy. Another legend says that Adi Shankaracharya installed a Sri Chakra here to enhance the spiritual potency of the shrine.",
        "keyRituals": [
                {
                        "name": "Kumkumarchana",
                        "description": "The ritualistic offering of vermilion to the Goddess, seeking her eternal protection."
                },
                {
                        "name": "Navratri Alankaram",
                        "description": "The daily changing of the Goddess''s appearance into different forms of Shakti during the nine nights."
                },
                {
                        "name": "Teppotsavam",
                        "description": "The spectacular boat festival in the Krishna river at the end of Navratri."
                }
        ],
        "highlights": [
                {
                        "name": "Indrakeeladri Hill",
                        "description": "The sacred mountain offering views of the entire city."
                },
                {
                        "name": "Prakasam Barrage",
                        "description": "The massive bridge across the Krishna river nearby."
                },
                {
                        "name": "Bhavani Island",
                        "description": "A large river island nearby, popular for tourism and spiritual retreats."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Located in the heart of Vijayawada, easily accessible by road and rail.",
                "nearestAirport": "Vijayawada Airport (Gannavaram).",
                "nearestRailway": "Vijayawada Junction."
        },
        "tips": [
                "Visit during Navratri to see the various Alankarams of the Goddess.",
                "Take the steps up the hill for a more traditional experience.",
                "Try the local Andhra Prasadam offered at the temple."
        ],
        "faqs": [
                {
                        "question": "Is there a ropeway to the temple?",
                        "answer": "Currently, access is primarily by road or steps; check local updates for any recent ropeway developments."
                },
                {
                        "question": "What are the temple timings?",
                        "answer": "The temple is generally open from 4 AM to 9 PM, but timings vary during festivals."
                },
                {
                        "question": "Is photography allowed?",
                        "answer": "Photography is allowed in the complex but restricted inside the inner sanctum."
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
    'Amarnath', 
    'amarnath', 
    'Shakti Peeth', 
    'jk', 
    'Hidden in a glacial cave in the high Himalayas of Kashmir, Amarnath is the site where Shiva revealed the secret of immortality to Parvati. The ice lingam, which waxes and wanes with the moon, is a rare manifestation of the eternal.', 
    '180.2', 
    '80.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Eternal Cave of Immortality', 
    'Amarnath Cave | Kashmir, Ice Lingam & the Secret of Immortality', 
    'Journey to the sacred Amarnath Cave. Discover the mystery of the Ice Lingam, the legend of Amar Katha, and the Shakti Peeth of Mahamaya.', 
    'Amarnath, Ice Lingam, Lord Shiva, Kashmir, Shakti Peeth, Immortality, Hindu Pilgrimage, Ancient Lore, Himalayas', 
    '16', 
    '{
        "spiritualEssence": "Amarnath is the pinnacle of the Himalayan pilgrimage. The cave represents the womb of the earth where the secret of immortality (Amar Katha) resides. The energy is cold, pristine, and transcendent. The self-manifested Ice Lingam is a reminder of the fragility of the physical world and the eternity of the spirit. Because the throat of Sati fell here, it is also the Mahamaya Shakti Peeth. The vibration is one of absolute purity and the silence of the high peaks. It is a site where one goes to hear the whisper of the eternal in the heart of the glacier.",
        "longDescription": "The legend of Amarnath tells of Lord Shiva seeking a place of absolute isolation to reveal the secrets of immortality and the creation of the universe to Goddess Parvati. He chose this cave and left behind all his worldly attachments—his bull Nandi at Pahalgam, the moon from his hair at Chandanwari, and his son Ganesha at Mahagunas Parvat. Inside the cave, he transformed into the Amar Katha. Two pigeons overheard the secret and became immortal, and are still seen by pilgrims today. The cave was rediscovered in modern times by a shepherd named Buta Malik. The pilgrimage occurs only for a few weeks in summer when the ice lingam is fully formed. It is a journey of extreme physical challenge and spiritual triumph.",
        "spiritualArchitecture": "The Amarnath shrine is a natural limestone cave situated at an altitude of 3,888m (12,756 ft). The cave is about 40 meters high and 30 meters deep. The Ice Lingam is formed by water droplets trickling from the roof of the cave and freezing on the floor. To the left of the main lingam are two smaller ice formations representing Ganesha and Parvati. The cave faces the south and is surrounded by snow-capped peaks throughout the year.",
        "vedicReferences": "Amarnath is mentioned in the Rajatarangini (history of Kashmir) and various ancient Puranic texts as the Amareshwar shrine. It is considered one of the holiest sites for Shaivites and Shaktas alike.",
        "deepInsights": "The waxing and waning of the ice lingam with the moon signifies the synchronization of the divine presence with the cosmic cycles. The secret of immortality is not about living forever in the body, but the realization of the deathless nature of the soul (Atman).",
        "ancientLore": "Lore tells that the pigeons who heard the Amar Katha appear to every sincere devotee who reaches the cave. Another legend says that the sages perform worship of the Lord here during the winter months when the cave is inaccessible to humans.",
        "keyRituals": [
                {
                        "name": "Amar Katha Path",
                        "description": "Reading the legend of the cave within its sacred precincts."
                },
                {
                        "name": "Havan at Cave",
                        "description": "Performing sacred fire rituals in the high Himalayan air."
                },
                {
                        "name": "Panchtarni Snan",
                        "description": "Holy bath at the confluence of five rivers before the final ascent."
                }
        ],
        "highlights": [
                {
                        "name": "Sheshnag Lake",
                        "description": "A stunning high-altitude lake where the Lord left his serpent."
                },
                {
                        "name": "Chandanwari",
                        "description": "The starting point of the trek from the Pahalgam side."
                },
                {
                        "name": "Mahagunas Pass",
                        "description": "The highest point of the traditional pilgrimage route."
                }
        ],
        "travelInfo": {
                "bestTime": "July to August (during the annual Yatra).",
                "howToReach": "Trek from Pahalgam (45km) or Baltal (14km). Helicopter services are available from both sides.",
                "nearestAirport": "Srinagar Airport.",
                "nearestRailway": "Jammu Tawi Railway Station."
        },
        "tips": [
                "Complete the mandatory medical fitness certification before applying.",
                "Pack heavy woolens and waterproof gear for the unpredictable weather.",
                "Carry portable oxygen if you are sensitive to high altitudes."
        ],
        "faqs": [
                {
                        "question": "How long is the Yatra?",
                        "answer": "The Pahalgam route takes 3-5 days, while the Baltal route can be done in 1-2 days."
                },
                {
                        "question": "Is the Ice Lingam always there?",
                        "answer": "No, it forms naturally in early summer and melts away by late August."
                },
                {
                        "question": "What is the age limit for the Yatra?",
                        "answer": "Generally, people between 13 and 70 years of age are permitted, subject to medical fitness."
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
    'Vrindavan', 
    'vrindavan', 
    'Spiritual City', 
    'up', 
    'The sacred forest of the Divine Play, Vrindavan is where Lord Krishna spent his childhood. It is a city of thousands of temples, where every street echoes with the sound of Radha-Krishna and the energy of eternal love.', 
    '150.5', 
    '230.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Eternal Playground of Divine Love', 
    'Vrindavan | Krishna''s Playground, Banke Bihari & Deep Insights', 
    'Dive into the heart of Vrindavan. Explore the Banke Bihari temple, the Prem Mandir, and the deep philosophy of Krishna''s Rasa Leela.', 
    'Vrindavan, Lord Krishna, Radha, Banke Bihari, Prem Mandir, ISKCON, Braj, Hindu Pilgrimage, Ancient Lore', 
    '17', 
    '{
        "spiritualEssence": "Vrindavan is not a place on a map; it is a state of the heart. It is the earthly manifestation of the celestial Goloka. The energy here is ''Madhurya''—sweet, intimate, and overflowing with love. Unlike the awe-inspiring energy of the Himalayas, the vibration in Vrindavan is playful and deeply personal. It is the place where the divine is worshipped as a child, a friend, and a lover. The air is saturated with the fragrance of the Kadamba trees and the sound of flutes. It is a site where one comes to lose the intellect and find the heart.",
        "longDescription": "The history of Vrindavan is synonymous with the childhood and youth of Lord Krishna. For centuries, the sacred forests were lost until they were rediscovered by the followers of Chaitanya Mahaprabhu in the 16th century. They identified the sites of Krishna''s various pastimes (Leelas). The city is home to over 5,000 temples. The Banke Bihari temple, where the deity is hidden behind a curtain that is periodically pulled, is the emotional center of the city. The Prem Mandir and the ISKCON temple are modern architectural marvels that continue to draw millions of seekers from across the globe. Vrindavan is the heart of the Braj region, where every dust particle is considered sacred.",
        "spiritualArchitecture": "The architecture of Vrindavan ranges from the ancient red sandstone temples like Govind Dev (built by Raja Man Singh) to the white marble splendor of Prem Mandir. The Banke Bihari temple features a traditional Rajasthani style with intricate silver work. The ISKCON temple (Krishna Balaram Mandir) is a serene white structure with beautiful murals. The Ghats of the Yamuna, especially Keshi Ghat, are built in the classic North Indian style with stone steps and pavilions.",
        "vedicReferences": "Vrindavan is the primary setting for the tenth book of the Bhagavata Purana. It is celebrated in the works of the Six Goswamis and the poetry of Meerabai and Surdas.",
        "deepInsights": "The Rasa Leela (the dance of love) is the esoteric core of Vrindavan. It represents the dance of the soul with the divine. Vrindavan teaches that the ultimate path to God is through pure, unalloyed devotion (Bhakti). The name itself means ''Forest of Tulsi'', symbolizing the purity of the heart required to enter the divine play.",
        "ancientLore": "Lore tells of the Nidhivan forest, where it is believed that Krishna still performs the Rasa Leela every night. No one is allowed to stay in the forest after sunset, and even the monkeys leave. Another legend speaks of the Banke Bihari deity being so mesmerized by the love of a devotee that he almost followed him out of the temple, which is why the curtain is used to break the gaze.",
        "keyRituals": [
                {
                        "name": "Parikrama",
                        "description": "Walking the 10km path around the sacred city, chanting the names of Radha and Krishna."
                },
                {
                        "name": "Yamuna Aarti",
                        "description": "Evening ritual at the Keshi Ghat, honoring the sacred river."
                },
                {
                        "name": "Phoolon ki Holi",
                        "description": "The vibrant celebration of Holi using flowers, a unique tradition of Vrindavan."
                }
        ],
        "highlights": [
                {
                        "name": "Banke Bihari Temple",
                        "description": "The most famous temple where the deity is worshipped with intense love."
                },
                {
                        "name": "Prem Mandir",
                        "description": "A massive marble complex depicting the various pastimes of the Lord."
                },
                {
                        "name": "Nidhivan",
                        "description": "The sacred forest of the nocturnal Rasa Leela."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "15km from Mathura, well connected by road. Mathura is a major railway junction.",
                "nearestAirport": "Agra Airport / Delhi Airport.",
                "nearestRailway": "Mathura Junction."
        },
        "tips": [
                "Be careful of the monkeys; they are notorious for taking glasses and bags.",
                "Visit during Janmashtami or Holi for the most vibrant experience.",
                "Try the local Lassi and Makhan Mishri."
        ],
        "faqs": [
                {
                        "question": "Is Vrindavan different from Mathura?",
                        "answer": "Yes, Mathura is the birthplace of Krishna, while Vrindavan is where he spent his childhood pastimes. They are about 15km apart."
                },
                {
                        "question": "What are the temple timings in Vrindavan?",
                        "answer": "Most temples close in the afternoon (12 PM to 4 PM) and have varying opening times in the morning and evening."
                },
                {
                        "question": "Can I stay in an Ashram?",
                        "answer": "Yes, there are hundreds of Ashrams and guest houses catering to every budget."
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
    'Ayodhya', 
    'ayodhya', 
    'Spiritual City', 
    'up', 
    'The birthplace of Lord Rama, Ayodhya is the ''Unconquerable'' city. Located on the banks of the Sarayu river, it is the site of the newly built Ram Mandir and the eternal symbol of Maryada Purushottam and the ideal of Ram Rajya.', 
    '415.2', 
    '230.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Eternal City of Righteousness and Rama', 
    'Ayodhya | Ram Mandir, Sarayu River & Ancient Lore', 
    'Step into the sacred history of Ayodhya. Explore the new Ram Mandir, the Hanuman Garhi, and the profound philosophy of Dharma and Ram Rajya.', 
    'Ayodhya, Ram Mandir, Lord Rama, Sarayu River, Uttar Pradesh, Dharma, Ram Rajya, Hindu Pilgrimage, Ancient Lore', 
    '18', 
    '{
        "spiritualEssence": "Ayodhya is the anchor of Dharma (righteousness). The name means ''that which cannot be defeated in war''. It is the city of absolute order, truth, and sacrifice. The energy is one of stability, dignity, and deep historical resonance. The Sarayu river, which has witnessed the entire life of Rama, flows with a majestic solemnity. It is a site where one comes to learn the value of duty and the power of character. The vibration is the manifestation of the ideal human life—the Maryada. A visit here is believed to instill a sense of moral clarity and the strength to follow the path of truth.",
        "longDescription": "Ayodhya is one of the seven most sacred cities (Sapta Puri) of India. Founded by the progenitor of mankind, Manu, it was the capital of the Ikshvaku dynasty. The city reached its peak during the reign of Dasharatha and his son Rama. After centuries of struggle, the Ram Janmabhoomi temple has been restored to its original glory. The city is a vibrant tapestry of ancient temples, ghats, and modern infrastructure. From the Hanuman Garhi, which guards the city, to the Kanak Bhawan, every corner tells a story of the Ramayana. The Deepotsav at Ayodhya, where millions of lamps are lit on the Sarayu ghats, is a modern-day reflection of the joy that greeted Rama upon his return from exile.",
        "spiritualArchitecture": "The new Ram Mandir is built in the grand Nagara style using pink sandstone from Rajasthan. It is a three-storied structure with 392 pillars and 44 doors. The Hanuman Garhi is a fort-like structure with 76 steps. The Kanak Bhawan, a palace-temple gifted to Sita by Kaikeyi, is famous for its intricate architecture and gold-crowned deities. The Sarayu Ghats are built with wide steps and pavilions, creating a serene environment for the evening Aarti.",
        "vedicReferences": "Ayodhya is the primary setting of the Ramayana by Valmiki and the Ramcharitmanas by Tulsidas. It is mentioned in the Atharva Veda as a city built by the Gods.",
        "deepInsights": "Ayodhya represents the Ajna chakra—the center of command and vision. It signifies the state of a mind that is no longer in conflict. Ram Rajya (the rule of Rama) is the esoteric ideal of a society where everyone follows their inherent nature (Dharma) in harmony with the whole.",
        "ancientLore": "Lore tells that when Rama ended his earthly stay, the entire city of Ayodhya followed him into the Sarayu river and attained Vaikuntha. Another legend says that Lord Hanuman still resides in the Hanuman Garhi to protect the city and ensure that every pilgrim reaches the feet of Rama.",
        "keyRituals": [
                {
                        "name": "Sarayu Aarti",
                        "description": "The daily evening worship of the river Sarayu, involving massive oil lamps and chanting."
                },
                {
                        "name": "Parikrama",
                        "description": "The circumambulation of the sacred city, especially during the Kartik Purnima."
                },
                {
                        "name": "Ram Navami Celebrations",
                        "description": "The massive festival celebrating the birth of Lord Rama with processions and prayers."
                }
        ],
        "highlights": [
                {
                        "name": "Ram Janmabhoomi Mandir",
                        "description": "The supreme site marking the birthplace of Lord Rama."
                },
                {
                        "name": "Hanuman Garhi",
                        "description": "The 10th-century temple-fort dedicated to Lord Hanuman."
                },
                {
                        "name": "Kanak Bhawan",
                        "description": "The magnificent palace-temple of Rama and Sita."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by the new Maharishi Valmiki International Airport and the Ayodhya Dham Railway Station.",
                "nearestAirport": "Ayodhya Airport / Lucknow Airport.",
                "nearestRailway": "Ayodhya Dham Railway Junction."
        },
        "tips": [
                "Visit the Mani Parvat for a great sunset view of the city.",
                "Try the local Ayodhya sweets like Rabri and Jalebi.",
                "Carry a government ID for entry into the main temple complex."
        ],
        "faqs": [
                {
                        "question": "How to book Darshan for Ram Mandir?",
                        "answer": "Darshan can be done through general queues or by booking special time slots on the official temple trust website."
                },
                {
                        "question": "Is the airport operational?",
                        "answer": "Yes, the Maharishi Valmiki International Airport is now operational with flights from major cities."
                },
                {
                        "question": "What is the best time for Sarayu Aarti?",
                        "answer": "The Aarti is performed at sunset daily; arrive 30 minutes early to get a good spot."
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
    'Anashakti Ashram', 
    'anashakti-ashram-kausani', 
    'Sacred Destination', 
    'uk', 
    'The "Place of Selfless Action", Anashakti Ashram is a legendary spiritual landmark in Kausani. It is a site of absolute historic authority and Gandhian resonance, being the specific spot where Mahatma Gandhi stayed in 1929 and wrote his commentary on the Bhagavad Gita, representing the absolute intersection of the Indian independence movement and the eternal Vedic wisdom.', 
    '510.5', 
    '235.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Switzerland of India and the Sanctuary of the Selfless Wisdom', 
    'Anashakti Ashram Kausani | Uttarakhand, Mahatma Gandhi & Ancient Lore', 
    'Experience the profound silence of Anashakti Ashram. Discover the Kausani ridges, the legend of the Gita commentary, and the profound energy of the Gandhian pilgrimage.', 
    'Anashakti Ashram, Kausani, Mahatma Gandhi, Bhagavad Gita, Anashakti Yoga, Switzerland of India, Kumaon, Hindu Pilgrimage, Ancient Lore', 
    '251', 
    '{
        "spiritualEssence": "Anashakti Ashram is the manifestation of the divine as the supreme equanimity and the absolute clarity of the detached action. The energy here is serene, intellectual, and intensely panoramic. It is the site where the high-altitude silence meets the core philosophy of the Gita. The vibration is one of ''Anashakti'' (Non-attachment) and the absolute focus on the selfless duty. As a peaceful retreat located on a ridge offering one of the most spectacular views of the Trishul and Nanda Devi peaks, it represents the spiritual heart of the central Kumaon. A visit here is believed to grant the devotee the absolute stillness of the mind and the blessing of the philosophical depth. The air is always vibrant with the scent of the pine forests and the constant, heavy energy of the zero-ego presence.",
        "longDescription": "Mahatma Gandhi visited Kausani in 1929 and was so moved by the beauty of the Himalayas that he called the place the ''Switzerland of India.'' He stayed at this spot for 14 days, during which he wrote ''Anashakti Yoga,'' his profound commentary on the Gita. The ashram was later established to commemorate his visit and to promote the Gandhian values of truth and non-violence. It features a prayer hall, a small museum, and a series of simple guest rooms. The site is a critical center for students of history and spirituality, providing a direct link between the political struggle of India and its ancient spiritual roots. It is a site where the highest level of Himalayan aesthetic and the most practical ethical philosophy are perfectly unified.",
        "spiritualArchitecture": "The architecture of Anashakti Ashram is a spectacular display of the simple, functional Gandhian style using the local stone and wood. The complex features a series of white-washed buildings with large windows that frame the high snow peaks. A unique feature is the open-air prayer ground where communal prayers are held at dawn and dusk, mirroring the practice at the Sabarmati Ashram. The architecture is designed to emphasize the transparency of the life and the lack of the material complication. The use of the modest materials against the grand backdrop of the Himalayas creates a sense of a spiritual humility that is elevated by the scale of nature. The complex includes a beautifully maintained garden and a library dedicated to the Gandhian literature.",
        "vedicReferences": "Anashakti Ashram is celebrated in the modern Indian history as the supreme site where the ''Karma Yoga'' was redefined for the contemporary seeker.",
        "deepInsights": "The writing of the Gita commentary here represents the truth that the highest action is the one performed with the complete detachment from the results. The ashram teaches that the spirit can reach the absolute freedom through the selfless service.",
        "ancientLore": "Lore tells that the silence of Kausani was personally chosen by the mountain devas to host the writing of the modern Gita. Another legend says that the reflection of the Nanda Devi peak on the ashram windows can heal the deep mental distress of the visitor.",
        "keyRituals": [
                {
                        "name": "Prarthana Sabha (Prayer)",
                        "description": "Participating in the collective morning and evening prayers featuring the bhajans and the readings from the Gita."
                },
                {
                        "name": "Gita Path (Recitation)",
                        "description": "The ritual of reading the verses of the Bhagavad Gita in the hall where Gandhi wrote his commentary."
                },
                {
                        "name": "Shramdaan (Service)",
                        "description": "Engaging in the voluntary physical work to maintain the ashram as a form of the Karma Yoga."
                },
                {
                        "name": "Himalayan Dhyana",
                        "description": "Sitting in the ashram garden to meditate on the snow peaks to seek the inner stillness."
                }
        ],
        "highlights": [
                {
                        "name": "The Prayer Hall",
                        "description": "The central heart of the ashram where Gandhi meditated and held his daily meetings."
                },
                {
                        "name": "The Himalayan Viewpoint",
                        "description": "The balcony that offers the famous 300km wide view of the high snow ranges."
                },
                {
                        "name": "The Gandhi Museum",
                        "description": "The collection of rare photographs and the writings related to the Mahatma''s stay in Kausani."
                },
                {
                        "name": "The Anashakti Library",
                        "description": "A sacred space containing the core texts of the Gandhian and the Vedic philosophy."
                }
        ],
        "travelInfo": {
                "bestTime": "September to May (the views of the snow peaks are most clear after the monsoon and during the winter).",
                "howToReach": "Located in Kausani, Almora district. Well connected by road from Almora (52km) and Kathgodam (135km).",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Participate in the communal evening prayers; the atmosphere is exceptionally peaceful and grounding.",
                "Spend at least one night in the ashram guest house to truly absorb the silence and the energy of the early morning Himalayas.",
                "Maintain the decorum and the silence of the ashram; it is a space for the serious reflection and the study."
        ],
        "faqs": [
                {
                        "question": "Why did Gandhi call it Switzerland of India?",
                        "answer": "Because of the breathtaking views of the snow-capped Himalayan peaks and the lush green meadows that reminded him of the Swiss landscape."
                },
                {
                        "question": "Can anyone stay at the ashram?",
                        "answer": "Yes, simple accommodation is available for seekers and travelers, but prior booking is recommended during the peak season."
                },
                {
                        "question": "What is Anashakti Yoga?",
                        "answer": "It is Gandhi''s interpretation of the Gita, focusing on the principle of non-attachment to the fruits of one''s labor."
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
    'Baleshwar Temple', 
    'baleshwar-temple-champawat', 
    'Sacred Destination', 
    'uk', 
    'The "Pinnacle of Stone Art", the Baleshwar Temple is an ancient Shaiva shrine located in Champawat. It is a site of absolute architectural authority and historic resonance, being the most spectacular display of the early medieval stone carving in the Kumaon region, representing the absolute perfection of the Himalayan masonry and the profound energy of the Lord Shiva as the Master of the Elements.', 
    '620.2', 
    '255.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Stone Miracle of Champawat and the Sanctuary of the Ancient Masters', 
    'Baleshwar Temple Champawat | Uttarakhand, Stone Art & Ancient Lore', 
    'Experience the profound energy of Baleshwar Temple. Discover the UNESCO-grade stone carvings, the legend of the Chand kings, and the profound energy of the Kumaon heritage pilgrimage.', 
    'Baleshwar Temple, Champawat, Lord Shiva, Stone Architecture, Chand Dynasty, Kumaon Heritage, Hindu Pilgrimage, Ancient Lore', 
    '252', 
    '{
        "spiritualEssence": "Baleshwar Temple is the manifestation of the divine as the supreme craftsmanship and the absolute precision of the spiritual devotion. The energy here is grounded, heavy, and intensely ancient. It is the site where the rock has been transformed into a spiritual poem. The vibration is one of ''Sthapatya'' (Architecture) and the absolute alignment with the cosmic geometry. As a temple complex dating back to the 10th-12th centuries, it represents the spiritual zenith of the Chand dynasty. A visit here is believed to grant the devotee the absolute stability of the life and the blessing of the artistic awakening. The air is always vibrant with the scent of the ancient stones and the silent, heavy energy of the centuries of the silent worship.",
        "longDescription": "The Baleshwar Temple is dedicated to Lord Shiva and is famous for its intricate and high-quality stone carvings. It was built by the early kings of the Chand dynasty, who made Champawat their capital. The temple complex includes several smaller shrines and a sacred water tank (Naula). The quality of the carving is often compared to the Sun Temple at Konark or the temples of Khajuraho. Every inch of the exterior walls is covered in the images of the deities, the celestial beings, and the scenes from the Puranas. The main temple features a beautifully carved ceiling and a massive stone Nandi. The site is a critical monument for the study of the North Indian temple architecture. Baleshwar is a site where the highest level of Himalayan engineering and the most intense devotion of the master masons are perfectly unified.",
        "spiritualArchitecture": "The architecture of Baleshwar is a spectacular display of the Nagar style with a heavy emphasis on the detail and the relief. The temple features a high shikhara and a series of mandapas (halls) with intricately carved pillars. A unique feature is the quality of the stone itself—a dark, fine-grained rock that allows for the absolute precision of the carving. The architecture is designed to overwhelm the human senses with the complexity of the divine form. The use of the deep shadows and the sharp highlights on the carvings creates a sense of a spiritual space that is constantly revealing new layers of meaning. The complex includes one of the most beautiful examples of a Himalayan Naula (stepped well) with its own carved shrines.",
        "vedicReferences": "Baleshwar is celebrated in the local oral history as the supreme site where the Lord Shiva personally guided the hands of the master carvers to manifest the beauty of the Kailash on the earth.",
        "deepInsights": "The intricate carving represents the truth that the divine is present in the smallest detail of the creation. Baleshwar teaches that the highest worship is the one performed with the absolute perfection of the craft.",
        "ancientLore": "Lore tells that the main temple was built in a single night by the supernatural beings who were sent by the Lord to bless the Chand kings. Another legend says that the carver of the temple was so talented that the king ordered his hands to be cut off so he could never build anything more beautiful, but the carver later built an even more stunning temple using only his feet.",
        "keyRituals": [
                {
                        "name": "Baleshwar Mahadev Puja",
                        "description": "The ritual of bathing the ancient stone Lingam with the holy water to seek the stability and the strength."
                },
                {
                        "name": "Sthapatya Archan",
                        "description": "Offering prayers to the divine architects and the master carvers to seek the blessing of the creative success."
                },
                {
                        "name": "Naula Snanam",
                        "description": "Performing the ritual ablutions in the sacred stone well to seek the purification from the elemental toxins."
                },
                {
                        "name": "Puranic Chanting",
                        "description": "Reciting the stories carved on the walls to seek the intellectual alignment with the ancient wisdom."
                }
        ],
        "highlights": [
                {
                        "name": "The Intricate Ceiling",
                        "description": "The spectacular stone ceiling of the main mandapa, featuring the complex geometric and the floral patterns."
                },
                {
                        "name": "The Stone Naula",
                        "description": "The historic stepped well with its own carved shrines and the crystal-clear water source."
                },
                {
                        "name": "The Puranic Reliefs",
                        "description": "The series of exterior wall carvings depicting the various avatars and the cosmic events."
                },
                {
                        "name": "The Ancient Stone Nandi",
                        "description": "A massive and beautifully carved bull, the vahana of Shiva, standing at the entrance of the main shrine."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the stone carvings are most beautiful in the soft light of the winter sun).",
                "howToReach": "Located in the heart of Champawat town. Well connected by road from Almora, Pithoragarh, and Tanakpur.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Tanakpur Railway Station."
        },
        "tips": [
                "Carry a small flashlight to see the intricate details of the carvings in the inner halls and the ceiling.",
                "Spend some time studying the carvings on the exterior walls; they are a visual encyclopedia of the Hindu mythology.",
                "Respect the sanctity of the active worship; although it is a heritage site, it remains a powerful center of the local devotion."
        ],
        "faqs": [
                {
                        "question": "How old is the temple?",
                        "answer": "The current structure dates back to the 10th-12th centuries AD, built by the Chand dynasty rulers."
                },
                {
                        "question": "Who is the main deity?",
                        "answer": "The temple is dedicated to Lord Shiva, worshipped here as Baleshwar Mahadev."
                },
                {
                        "question": "Is it a protected monument?",
                        "answer": "Yes, it is under the protection of the Archaeological Survey of India (ASI) and is considered one of the finest heritage sites in Uttarakhand."
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
    'Golu Devta (Ghorakhal)', 
    'golu-devta-ghorakhal-temple', 
    'Sacred Destination', 
    'uk', 
    'The "Guardian of the Lake District", the Ghorakhal Golu Devta Temple is a high-altitude shrine near Bhowali. It is a site of absolute folk authority and justice, being the most visited shrine of Golu Devta near the popular lake district of Nainital, representing the absolute faith of the Kumaon people in the divine judge and the profound energy of the thousand-bell tradition.', 
    '500.2', 
    '260.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Justice God of the Nainital Hills and the Ridge of the Ringing Bells', 
    'Golu Devta Ghorakhal Temple | Uttarakhand, Folk Justice & Ancient Lore', 
    'Experience the profound energy of Golu Devta Ghorakhal. Discover the mountain-top justice shrine, the legend of the thousand bells, and the profound energy of the Nainital pilgrimage.', 
    'Golu Devta, Ghorakhal, Nainital, Bhowali, Uttarakhand, God of Justice, Hindu Pilgrimage, Ancient Lore, Bells Temple', 
    '253', 
    '{
        "spiritualEssence": "Ghorakhal Golu Devta is the manifestation of the divine as the supreme witness and the absolute accessibility of the spiritual law in the middle hills. The energy here is urgent, resonant, and intensely personal. It is the site where the faith of the hill-folk becomes a tangible sound. The vibration is one of ''Pratyaksha'' (Direct Perception) and the absolute confidence in the divine hearing. As a temple perched on a ridge overlooking the Bhimtal and Sat-tal valleys, it represents the spiritual overseer of the lake region. A visit here is believed to grant the devotee the absolute clarity in the decision-making and the blessing of the swift justice. The air is always vibrant with the constant, rhythmic ringing of the bells and the silent, heavy energy of the thousands of the fulfilled vows.",
        "longDescription": "Ghorakhal (meaning ''pond for horses'') is famous for its Golu Devta temple and the nearby Sainik School. Like the Chittai temple, this shrine is characterized by thousands of brass bells offered by the devotees. It is particularly popular because of its proximity to Nainital and its location on a scenic ridge. Golu Devta is worshipped here as a king who never refused a plea for the justice. The temple atmosphere is one of intense focus and gratitude. The deity is often seen as a protective elder brother of the Kumaon people. The site is a critical anchor for the local culture, especially during the festivals and the local fairs. It is a site where the highest level of the ridge-peak geography and the most practical human petition are perfectly unified.",
        "spiritualArchitecture": "The architecture of the Ghorakhal temple is a spectacular display of the Kumaoni ridge-shrine style with a heavy emphasis on the horizontal platforms and the massive bell-racks. The temple features a simple central shrine, but its defining architectural feature is the series of long, covered walkways filled with thousands of hanging bells. A unique feature is the presence of the open viewpoints that look down into the deep valleys of the lake district. The architecture is designed to facilitate the ritual of hanging the bell and reading the petitions. The use of the simple stone and the vibrant red and yellow flags create a sense of a spiritual home that is anchored to the mountain ridge. The complex includes several small rooms for the priests and the pilgrims.",
        "vedicReferences": "Ghorakhal is celebrated in the local oral epics as the supreme site where the Golu Devta personally rested his horse while surveying the justice of the Northern hills.",
        "deepInsights": "The ringing of the bell represents the truth that the soul must announce its presence to the divine. Ghorakhal teaches that the highest justice is the one that is visible and accessible to all.",
        "ancientLore": "Lore tells that the deity personally guards the Sainik School students and that no harm can come to them while they are under his ridge. Another legend says that the bells of Ghorakhal ring in a specific sequence to announce the arrival of the monsoon to the valleys below.",
        "keyRituals": [
                {
                        "name": "Golu Devta Arghya",
                        "description": "Offering sacred water and grain to the deity to seek the protection and the prosperity."
                },
                {
                        "name": "Nyaya Sankalpa (Petition)",
                        "description": "Performing the formal ritual of stating a problem to the God of Justice and promising a bell upon its resolution."
                },
                {
                        "name": "Ghanti Bandhan",
                        "description": "The ritual of tying a bell to the temple racks as a mark of the gratitude and the fulfilled faith."
                },
                {
                        "name": "Ridge-Top Prarthana",
                        "description": "Offering prayers while facing the valleys to seek the spiritual alignment with the mountain energy."
                }
        ],
        "highlights": [
                {
                        "name": "The Bell Walkways",
                        "description": "The iconic and surreal paths lined with thousands of the brass bells of all sizes."
                },
                {
                        "name": "The Nainital Viewpoint",
                        "description": "The balcony that offers the panoramic views of the surrounding lake district and the high hills."
                },
                {
                        "name": "The Main Golu Shrine",
                        "description": "The sacred heart of the temple where the energy of the folk justice is most intense."
                },
                {
                        "name": "The Sacred Oak Grove",
                        "description": "The forest area surrounding the temple, believed to be the home of the mountain spirits."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the ridge is most beautiful in the spring and the autumn).",
                "howToReach": "4km from Bhowali and 15km from Nainital. Easily accessible by road; taxis and buses are regularly available.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Visit the temple in the early morning to avoid the tourist crowds and to experience the ringing of the bells in the silent air.",
                "Combine your visit with a trip to the nearby lakes of Bhimtal and Sat-tal for a complete Kumaon experience.",
                "Be prepared for monkeys; maintain a safe distance and do not carry food openly in the temple premises."
        ],
        "faqs": [
                {
                        "question": "Who is Golu Devta?",
                        "answer": "He is the most popular folk deity of Kumaon, worshipped as an incarnation of Lord Shiva and the supreme God of Justice."
                },
                {
                        "question": "How many bells are there?",
                        "answer": "There are thousands of bells; the number grows every day as more devotees have their prayers answered."
                },
                {
                        "question": "What is Ghorakhal famous for?",
                        "answer": "Apart from the Golu Devta temple, it is world-famous for the Ghorakhal Sainik School, one of the premier military schools in India."
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
    'Mindrolling Monastery', 
    'mindrolling-monastery-dehradun', 
    'Sacred Destination', 
    'uk', 
    'The "Place of Perfect Emancipation", Mindrolling Monastery is one of the most significant Buddhist centers in India, located in the Clement Town area of Dehradun. It is a site of absolute global Buddhist authority and architectural grandeur, home to the Great Stupa (one of the tallest in the world), representing the absolute preservation of the Nyingma school and the profound energy of the Himalayan peace.', 
    '410.5', 
    '265.2', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Great Stupa of the Dehradun Valley and the Sanctuary of the Eternal Emancipation', 
    'Mindrolling Monastery Dehradun | Uttarakhand, Buddhist Stupa & Ancient Lore', 
    'Experience the profound peace of Mindrolling Monastery. Discover the Great Stupa, the legend of the Nyingma masters, and the profound energy of the Buddhist pilgrimage.', 
    'Mindrolling Monastery, Dehradun, Buddhist Temple, Great Stupa, Nyingma School, Clement Town, Hindu Pilgrimage, Ancient Lore, Tibetan Buddhism', 
    '255', 
    '{
        "spiritualEssence": "Mindrolling is the manifestation of the divine as the supreme discipline and the absolute clarity of the enlightened mind. The energy here is vast, colorful, and intensely silent. It is the site where the Tibetan spiritual tradition has been anchored in the Indian soil. The vibration is one of ''Bodhi'' (Enlightenment) and the absolute resonance of the compasssion. As a massive complex featuring the world-famous Great Stupa (185 feet tall) and beautifully landscaped gardens, it represents the spiritual lighthouse of the Dehradun valley. A visit here is believed to grant the devotee the absolute peace of the soul and the blessing of the universal harmony. The air is always vibrant with the scent of the butter lamps and the constant, rhythmic sound of the Tibetan chanting and the turning of the prayer wheels.",
        "longDescription": "Mindrolling Monastery was originally founded in Tibet in 1676 and was re-established in Dehradun in 1965 by His Eminence Khochhen Rinpoche. It is one of the six major monasteries of the Nyingma school. The complex is world-famous for its Great Stupa, which contains numerous shrines and is decorated with spectacular murals and statues. The monastery is a key center for the study of the Buddhist philosophy, the Tibetan language, and the sacred arts. It features the Ngagyur Nyingma College, one of the largest Buddhist institutes in India. The site attracts thousands of international and domestic seekers who come to experience the authentic Tibetan culture and the profound atmosphere of the meditation. Mindrolling is a site where the highest level of Himalayan Buddhist science and the most stunning architectural scale are perfectly unified.",
        "spiritualArchitecture": "The architecture of Mindrolling is a spectacular display of the traditional Tibetan style with a focus on the grand scale and the intricate symbolic detail. The centerpiece is the Great Stupa, a 185-foot tall structure featuring multiple levels of shrines and a magnificent golden pinnacle. A unique feature is the presence of the 103-foot tall statue of Lord Buddha in the monastery garden. The architecture is designed to map the path to the enlightenment, with every mural and statue representing a specific stage of the consciousness. The use of the vibrant colors (red, gold, and blue), the elaborate wood-carvings, and the expansive courtyards create a sense of a spiritual palace that is both awe-inspiring and welcoming. The complex includes several grand prayer halls (Lhakhangs) with massive statues of the Buddha and the Guru Rinpoche.",
        "vedicReferences": "Mindrolling is celebrated in the modern Buddhist history as the supreme site where the ''Vinaya'' and the ''Dharma'' have been preserved to guide the humanity in the modern age.",
        "deepInsights": "The turning of the prayer wheels represents the truth that the divine word must be constantly circulated to benefit all the beings. Mindrolling teaches that the highest peace is the one that is achieved through the absolute discipline of the mind.",
        "ancientLore": "Lore tells that the location of the monastery was personally blessed by the high masters who saw the Dehradun valley as a perfect container for the light of the Dharma. Another legend says that the shadow of the Great Stupa has the power to purify the karma of anyone who walks beneath it during the full moon.",
        "keyRituals": [
                {
                        "name": "Tibetan Chanting Ceremony",
                        "description": "Participating in the collective morning and evening chanting of the sacred texts by the monks to seek the universal peace."
                },
                {
                        "name": "Kora (Circumambulation)",
                        "description": "The ritual of walking around the Great Stupa in a clockwise direction while turning the prayer wheels to seek the merit."
                },
                {
                        "name": "Butter Lamp Offering",
                        "description": "Offering lamps in the main shrine to seek the removal of the spiritual darkness and the awakening of the wisdom."
                },
                {
                        "name": "Dharma Talk Session",
                        "description": "Listening to the teachings of the Rinpoche or the senior monks on the path of the compassion and the mindfulness."
                }
        ],
        "highlights": [
                {
                        "name": "The Great Stupa",
                        "description": "The iconic 185-foot tall stupa, featuring multiple shrines and spectacular Buddhist murals."
                },
                {
                        "name": "The 103-Foot Buddha Statue",
                        "description": "A magnificent golden statue of the Lord Buddha, standing in the beautifully maintained gardens."
                },
                {
                        "name": "The Main Prayer Hall",
                        "description": "The grand space housing the massive statues and the sacred relics of the Tibetan masters."
                },
                {
                        "name": "The Ngagyur Nyingma College",
                        "description": "The prominent institute for the Buddhist higher studies within the monastery complex."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (the gardens are in full bloom and the weather is perfect for the walking tour).",
                "howToReach": "Located in Clement Town, Dehradun. Easily accessible by road from the Dehradun city center (approx 9km).",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Maintain absolute silence and respect while entering the prayer halls; do not photograph the rituals without explicit permission.",
                "Dress modestly and remove your shoes before entering the shrines or the Stupa chambers.",
                "Spend some time in the monastery gardens; the energy is exceptionally peaceful and conductive to the contemplation."
        ],
        "faqs": [
                {
                        "question": "How high is the Stupa?",
                        "answer": "The Great Stupa is 185 feet tall and is considered one of the tallest stupas in the world."
                },
                {
                        "question": "Who founded the monastery?",
                        "answer": "The original Mindrolling was founded in Tibet in 1676; the Dehradun branch was re-established in 1965 by Khochhen Rinpoche."
                },
                {
                        "question": "Are visitors allowed in the shrines?",
                        "answer": "Yes, visitors are welcome in most of the shrines and the prayer halls, provided they follow the monastery decorum."
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
    'Tapkeshwar Mahadev', 
    'tapkeshwar-mahadev-temple-dehradun', 
    'Sacred Destination', 
    'uk', 
    'The "Cave of the Dripping Lord", Tapkeshwar Mahadev is an ancient Shaiva shrine located on the banks of the Asan river in Dehradun. It is a site of absolute natural authority and primal energy, where water naturally drips from the cave ceiling onto the Shiva Lingam, representing the absolute perpetual abhisheka and the profound energy of the Guru Dronacharya''s taposthali.', 
    '405.2', 
    '262.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Natural Cave Shrine of the Dehradun Valley and the Sanctuary of the Dripping Grace', 
    'Tapkeshwar Mahadev Dehradun | Uttarakhand, Cave Temple & Ancient Lore', 
    'Experience the profound energy of Tapkeshwar Mahadev. Discover the river-side cave shrine, the legend of the Guru Dronacharya, and the profound energy of the Dehradun pilgrimage.', 
    'Tapkeshwar Mahadev, Dehradun, Lord Shiva, Cave Temple, Asan River, Guru Dronacharya, Hindu Pilgrimage, Ancient Lore, Natural Abhisheka', 
    '256', 
    '{
        "spiritualEssence": "Tapkeshwar is the manifestation of the divine as the supreme patience and the absolute continuity of the grace. The energy here is earthy, resonant, and intensely river-connected. It is the site where the rock becomes the medium of the worship. The vibration is one of ''Dhara'' (Stream) and the absolute alignment with the natural cycles. As a temple located inside a natural cave on the river bank, it represents the spiritual foundation of the Dehradun valley. A visit here is believed to grant the devotee the absolute removal of the blockages and the blessing of the constant spiritual growth. The air is always vibrant with the scent of the damp earth and the constant, rhythmic sound of the dripping water and the flowing river.",
        "longDescription": "Tapkeshwar (meaning ''the lord of the dripping water'') is one of the most famous temples in Dehradun. It is situated in a forest area on the banks of the Asan river. The main deity is a Shiva Lingam housed in a natural cave. Water from a subterranean source constantly drips onto the Lingam, creating a perpetual ritual of Abhisheka. The site is legendary as the place where Guru Dronacharya, the teacher of the Pandavas and the Kauravas, performed intense penance to seek the blessing of Lord Shiva. It is also believed to be the birthplace of Ashwatthama. The temple complex includes several smaller shrines and a beautiful river bank area where pilgrims perform ablutions. Tapkeshwar is a site where the highest level of Himalayan cave mysticism and the most popular urban devotion are perfectly unified.",
        "spiritualArchitecture": "The architecture of Tapkeshwar is a spectacular display of the river-side cave style with a focus on the integration of the natural rock and the man-made structure. The temple features a series of narrow stone steps that lead down to the cave opening on the river bank. A unique feature is the inner sanctum where the rock ceiling has been left untouched to allow the natural dripping of the water. The architecture is designed to emphasize the subterranean and the primal nature of the Shaiva worship. The use of the vibrant paint on the exterior structures and the simple stone flooring in the cave create a sense of a spiritual home that is both ancient and active. The complex includes several halls for the pilgrims and a large entrance gate with the colorful statues of the deities.",
        "vedicReferences": "Tapkeshwar is celebrated in the local oral traditions and the Puranic literature as the supreme site where the ''Shiva-Dhara'' was manifested to bless the master of the archery.",
        "deepInsights": "The dripping water represents the truth that the divine grace is constant and subtle. Tapkeshwar teaches that the highest worship is the one that is in harmony with the natural environment.",
        "ancientLore": "Lore tells that Guru Dronacharya prayed here for several decades, surviving only on the milk that was miraculously provided by the mountain cows. Another legend says that the water of the cave has the power to heal the ancestral diseases when consumed at the dawn with the faith.",
        "keyRituals": [
                {
                        "name": "Cave Abhisheka",
                        "description": "Offering sacred water and the milk to the Lingam inside the natural cave to seek the stability and the peace."
                },
                {
                        "name": "Tapkeshwar Mahashivratri",
                        "description": "Participating in the massive annual fair and the night-long vigil to celebrate the marriage of Shiva and Parvati."
                },
                {
                        "name": "Asan River Snanam",
                        "description": "Performing the ritual dip in the holy river at the temple steps to seek the physical purification."
                },
                {
                        "name": "Dronacharya Smriti Puja",
                        "description": "Offering prayers to the great master of the archery at his symbolic seat in the temple complex."
                }
        ],
        "highlights": [
                {
                        "name": "The Natural Cave",
                        "description": "The sacred heart of the temple where the water drips perpetually on the Shiva Lingam."
                },
                {
                        "name": "The Asan River Ghats",
                        "description": "The scenic and spiritually charged river bank area for the ritual bathing and the reflection."
                },
                {
                        "name": "The Drona Cave",
                        "description": "The specific area associated with the penance of the legendary Guru Dronacharya."
                },
                {
                        "name": "The Giant Statue of Shiva",
                        "description": "A prominent and colorful statue of the Lord Shiva in meditation, overlooking the river valley."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the cave is particularly atmospheric during the monsoon and the Mahashivratri festival).",
                "howToReach": "6km from the Dehradun city center. Easily accessible by road; regular taxis and city buses are available.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Be prepared for large crowds during the festivals and the Mondays; visit in the early morning for a more peaceful experience.",
                "The steps can be slippery when wet; wear sensible walking shoes with a good grip.",
                "Spend some time sitting by the river after your Darshan; the sound of the water is very conductive to the meditation."
        ],
        "faqs": [
                {
                        "question": "Why is it called Tapkeshwar?",
                        "answer": "Because of the natural phenomenon where water drips (''tapakti'' in Hindi) from the cave ceiling onto the Shiva Lingam."
                },
                {
                        "question": "Who is the Guru associated with this temple?",
                        "answer": "Guru Dronacharya, the legendary teacher of the Pandavas and Kauravas in the Mahabharata, performed penance here."
                },
                {
                        "question": "Is there an entry fee?",
                        "answer": "No, the temple is open to all and there is no fee for the Darshan or the entry."
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
    'Laxman Sidh', 
    'laxman-sidh-temple-dehradun', 
    'Sacred Destination', 
    'uk', 
    'The "Primary Guardian of the Valley", Laxman Sidh is the most significant of the four Siddh Peethas in Dehradun. It is a site of absolute yogic authority and primal energy, being the specific spot where Laxman, the brother of Lord Rama, performed penance after the battle of Lanka, representing the absolute manifestation of the spiritual purification and the profound energy of the Siddh lineage.', 
    '415.2', 
    '268.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Siddh Peeth of Dehradun and the Sanctuary of the Vedic Penance', 
    'Laxman Sidh Dehradun | Uttarakhand, Siddh Peeth & Ancient Lore', 
    'Experience the profound energy of Laxman Sidh. Discover the forest-shrine of the Siddh lineage, the legend of the Laxman''s penance, and the profound energy of the Dehradun pilgrimage.', 
    'Laxman Sidh, Dehradun, Siddh Peeth, Lord Laxman, Hindu Pilgrimage, Ancient Lore, Forest Temple, Spiritual Purification', 
    '257', 
    '{
        "spiritualEssence": "Laxman Sidh is the manifestation of the divine as the supreme atonement and the absolute clarity of the spiritual restoration. The energy here is dense, silent, and intensely forest-connected. It is the site where the royal spirit meets the yogic discipline. The vibration is one of ''Siddha'' (Perfected) and the absolute alignment with the higher consciousness. As a temple located in a lush green forest on the outskirts of Dehradun, it represents the primary spiritual anchor of the valley. A visit here is believed to grant the devotee the absolute removal of the guilt and the blessing of the inner peace. The air is always vibrant with the scent of the dry leaves and the constant, rhythmic sound of the forest wind and the ancient chants.",
        "longDescription": "Laxman Sidh is part of the four Siddh Peethas surrounding Dehradun, the others being Kalu Sidh, Madhu Sidh, and Manak Sidh. It is believed that Laxman came to this spot to perform penance (Tapasyā) to purify himself from the sin of killing Ravana (who was a Brahman). The temple is a site of intense local devotion, especially on Sundays when thousands of pilgrims visit to seek the blessing of the Siddh. The shrine is simple and ancient, featuring an elevated platform in the middle of a sacred grove. The site is a critical center for the local culture and the spiritual history of the Dehradun valley. Laxman Sidh is a site where the highest level of Puranic legend and the most resilient local forest-tradition are perfectly unified.",
        "spiritualArchitecture": "The architecture of Laxman Sidh is a spectacular display of the forest-shrine style with a focus on the openness and the integration with the surrounding trees. The temple features a central stone platform with a simple roof and a series of courtyards for the pilgrims. A unique feature is the presence of the massive ancient trees that are decorated with the sacred threads and the bells. The architecture is designed to minimize the visual obstruction of the forest, creating a sense of a spiritual clearing. The use of the white-washed walls and the simple stone flooring creates a sense of a spiritual home that is both humble and powerful. The complex includes several small rooms for the resident priests and the meditation spots.",
        "vedicReferences": "Laxman Sidh is celebrated in the local oral traditions as the supreme site where the ''Dharma'' was restored through the power of the high penance.",
        "deepInsights": "The penance of Laxman represents the truth that even the most righteous actions may require a spiritual purification. Laxman Sidh teaches that the highest peace is found in the absolute surrender to the discipline.",
        "ancientLore": "Lore tells that the forest of Laxman Sidh is personally guarded by the celestial beings who appear as deer to the faithful seekers. Another legend says that the soil of the temple has the power to heal the skin diseases when applied with the faith during the sunrise.",
        "keyRituals": [
                {
                        "name": "Siddh Peeth Puja",
                        "description": "Offering sacred water and the flowers to the Siddh seat to seek the mental clarity and the peace."
                },
                {
                        "name": "Sunday Bhandara",
                        "description": "Participating in the collective meal offering on Sundays to seek the blessing of the community and the deity."
                },
                {
                        "name": "Forest Circumambulation",
                        "description": "Walking through the sacred grove surrounding the temple to seek the alignment with the forest energy."
                },
                {
                        "name": "Laxman Smriti Arpan",
                        "description": "Offering prayers to the memory of Lord Laxman to seek the courage and the loyalty."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Siddh Seat",
                        "description": "The sacred heart of the temple where the energy of the Siddh lineage is most intense."
                },
                {
                        "name": "The Sacred Grove",
                        "description": "The ancient forest surrounding the temple, believed to be the home of the mountain devas."
                },
                {
                        "name": "The Ancient Banyan Tree",
                        "description": "A prominent and sacred tree within the temple complex where many pilgrims offer prayers."
                },
                {
                        "name": "The Peace Courtyard",
                        "description": "The expansive open space where pilgrims gather for the meditation and the collective chanting."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (Sundays are most vibrant with the local pilgrims).",
                "howToReach": "12km from the Dehradun city center on the Dehradun-Rishikesh road. Easily accessible by road; regular taxis and buses are available.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Visit on a Sunday to witness the intense local devotion and to participate in the community feast.",
                "Dress modestly and maintain the silence of the forest-shrine; avoid carrying plastic into the sacred grove.",
                "Spend some time walking in the surrounding forest; the energy is exceptionally pure and conductive to the meditation."
        ],
        "faqs": [
                {
                        "question": "Who is worshipped here?",
                        "answer": "The primary deity is Lord Laxman, worshipped here in his form as a Siddh (a perfected yogi)."
                },
                {
                        "question": "What are the 4 Sidh Peeths of Dehradun?",
                        "answer": "They are Laxman Sidh, Kalu Sidh, Madhu Sidh, and Manak Sidh."
                },
                {
                        "question": "Is it inside the city?",
                        "answer": "No, it is located in a forest area on the outskirts of Dehradun, approximately 12km from the city center."
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
    'Bharat Mata Mandir', 
    'bharat-mata-mandir-haridwar', 
    'Sacred Destination', 
    'uk', 
    'The "Mother India Temple", Bharat Mata Mandir is a unique 8-story spiritual landmark in Haridwar. It is a site of absolute patriotic authority and cultural resonance, dedicated to Mother India as a deity, representing the absolute unification of the national identity and the Vedic spirit through a vertical pilgrimage of the Indian history.', 
    '432.5', 
    '272.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Multi-Story Sanctuary of the National Soul and the Mirror of Bharat', 
    'Bharat Mata Mandir Haridwar | Uttarakhand, Patriotic & Ancient Lore', 
    'Experience the unique spiritual patriotism of Bharat Mata Mandir. Discover the 8-story heritage shrine, the map of India, and the profound energy of the Haridwar pilgrimage.', 
    'Bharat Mata Mandir, Haridwar, Mother India, Patriotic Temple, Swami Satyamitranand, Hindu Pilgrimage, Ancient Lore, Indian History', 
    '261', 
    '{
        "spiritualEssence": "Bharat Mata Mandir is the manifestation of the divine as the supreme motherland and the absolute sacrifice of the ancestors. The energy here is respectful, historical, and intensely unified. It is the site where the physical geography of India is worshipped as a spiritual body. The vibration is one of ''Desh-Bhakti'' (Patriotism) and the absolute honor for the diverse culture of the subcontinent. As a massive multi-story structure near the Ganga, it represents the spiritual museum of the Indian identity. A visit here is believed to grant the devotee the absolute expansion of the national consciousness and the blessing of the cultural pride. The air is always vibrant with the scent of the marigolds and the constant, rhythmic sound of the patriotic hymns and the river breeze.",
        "longDescription": "Founded in 1983 by Swami Satyamitranand Giri and inaugurated by Indira Gandhi, this temple is not dedicated to a single god but to the concept of India. Each of its eight floors represents a different aspect of the Indian life: the ground floor features a massive relief map of India; the second floor honors the heroes of the independence; the third floor is dedicated to the women saints; the fourth floor to the great sages; and the top floor to the Lord Vishnu. It is a unique place where the history, the mythology, and the geography are perfectly unified into a single vertical journey. Thousands of people visit the temple to understand the depth of the Indian heritage and to offer their respects to the spirit of the nation. It is a site where the highest level of Himalayan organizational vision and the most intense patriotic devotion are perfectly unified.",
        "spiritualArchitecture": "The architecture of Bharat Mata Mandir is a spectacular display of the modern vertical-shrine style with a focus on the narrative and the scale. The temple features a high tower with eight distinct levels, each accessible by an elevator and a stairway. A unique feature is the massive marble relief map of India on the ground floor, which is worshipped as a deity. The architecture is designed to lead the visitor through a chronological and thematic study of the Indian spirit. The use of the vibrant colors, the detailed statues on each floor, and the expansive balconies create a sense of a spiritual library that is both educational and sacred. The complex includes a beautifully maintained garden and a quiet meditation space near the entrance.",
        "vedicReferences": "Bharat Mata Mandir is celebrated in the modern spiritual discourse as the supreme site where the ''Prithvi Sukta'' (Hymn to Earth) is applied to the modern nation-state.",
        "deepInsights": "The map of India represents the truth that the earth is the primary altar of the humanity. Bharat Mata Mandir teaches that the service of the motherland is the highest form of the spiritual practice.",
        "ancientLore": "Lore tells that the foundation stone of the temple was brought from the seven sacred rivers of India to ensure its national resonance. Another legend says that the top floor of the temple offers a view that can reveal the future glory of Bharat to the sincere seeker.",
        "keyRituals": [
                {
                        "name": "Prithvi Arati",
                        "description": "The ritual of offering light to the map of India to seek the peace and the prosperity for the nation."
                },
                {
                        "name": "Siddha-Vrata Puja",
                        "description": "Offering prayers on the floors of the sages to seek the intellectual and the spiritual guidance."
                },
                {
                        "name": "Shakti Stavan",
                        "description": "Chanting the names of the Indian women saints to seek the empowerment and the grace."
                },
                {
                        "name": "Vertical Pilgrimage",
                        "description": "The ritual of climbing all eight floors to understand the complete spectrum of the Indian spiritual history."
                }
        ],
        "highlights": [
                {
                        "name": "The Marble Map of India",
                        "description": "The massive and detailed relief map on the ground floor, the heart of the temple."
                },
                {
                        "name": "The Heroes Floor",
                        "description": "The gallery dedicated to the freedom fighters and the martyrs who sacrificed for the country."
                },
                {
                        "name": "The Saints Floor",
                        "description": "The level honoring the great spiritual teachers of the various Indian traditions."
                },
                {
                        "name": "The Top-Floor View",
                        "description": "The balcony offering panoramic views of the Haridwar city and the Ganga river Snaking through the plains."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the temple is most comfortable during the cooler months from October to March).",
                "howToReach": "Located 5km from the Haridwar railway station on the Rishikesh road. Easily accessible by rickshaw or taxi.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Haridwar Railway Station."
        },
        "tips": [
                "Use the elevator to reach the top floor first and then walk down to experience each level at a relaxed pace.",
                "Spend time reading the inscriptions on each floor; they provide deep insights into the Indian history and philosophy.",
                "Avoid visiting during the peak afternoon hours as the temple can get quite crowded with the pilgrim groups."
        ],
        "faqs": [
                {
                        "question": "Who founded the temple?",
                        "answer": "It was founded by Swami Satyamitranand Giri, a highly respected saint and the founder of the Samanvaya Parivar."
                },
                {
                        "question": "Is it a religious temple?",
                        "answer": "It is a spiritual and patriotic temple that honors the spirit of India and all its diverse traditions."
                },
                {
                        "question": "How many floors are there?",
                        "answer": "There are eight floors, each dedicated to a specific theme of the Indian culture and history."
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
    'Sapt Rishi Ashram', 
    'sapt-rishi-ashram-haridwar', 
    'Sacred Destination', 
    'uk', 
    'The "Abode of the Seven Sages", Sapt Rishi Ashram is an ancient spiritual landmark in Haridwar. It is a site of absolute Vedic authority and riverine resonance, where the seven great rishis meditated and where the Ganga split into seven streams to avoid disturbing them, representing the absolute harmony between the human penance and the natural flow.', 
    '433.8', 
    '271.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Seven Streams and the Seat of the Ancient Seers', 
    'Sapt Rishi Ashram Haridwar | Uttarakhand, Seven Sages & Ancient Lore', 
    'Experience the profound silence of Sapt Rishi Ashram. Discover the Sapt Dhara (Seven Streams), the legend of the seven rishis, and the profound energy of the Haridwar pilgrimage.', 
    'Sapt Rishi Ashram, Haridwar, Sapt Rishis, Ganga River, Seven Streams, Hindu Pilgrimage, Ancient Lore, Vedic Rishis', 
    '262', 
    '{
        "spiritualEssence": "Sapt Rishi Ashram is the manifestation of the divine as the supreme contemplation and the absolute respect of the nature for the spirit. The energy here is ancient, watery, and intensely peaceful. It is the site where the roar of the river was softened by the power of the meditation. The vibration is one of ''Rishi-Tattva'' (Essence of the Sages) and the absolute clarity of the Vedic transmission. As a tranquil ashram on the banks of the Ganga where the river flows in seven distinct channels, it represents the spiritual gateway to the upper Himalayas. A visit here is believed to grant the devotee the absolute depth of the meditation and the blessing of the ancestral wisdom. The air is always vibrant with the scent of the forest and the constant, rhythmic sound of the seven streams.",
        "longDescription": "According to the Puranas, the seven great rishis (Kashyapa, Atri, Vashishta, Vishwamitra, Gautama, Jamadagni, and Bharadwaja) were meditating at this spot. The Ganga, not wishing to disturb their deep penance with her loud roar, split herself into seven channels (Sapt Dhara). The ashram complex is ancient and features a series of small shrines dedicated to each of the seven sages. It is a favorite spot for the serious seekers and those looking for a quiet alternative to the busy ghats of Haridwar. The ashram also runs a traditional Sanskrit school (pathshala). It is a site where the highest level of Himalayan mythology and the most serene river-side ecology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Sapt Rishi Ashram is a spectacular display of the traditional river-side ashram style with a focus on the multiple small shrines and the open-air courtyards. The complex features a central prayer hall and seven distinct stone shrines, one for each of the great sages. A unique feature is the presence of the Sapt Dhara (Seven Streams) that flow directly adjacent to the ashram walls. The architecture is designed to integrate the sound and the sight of the river into the spiritual practice. The use of the simple brick and the white-washed surfaces create a sense of a spiritual retreat that is unpretentious and deeply rooted in the soil. The complex includes several simple residential rooms and a traditional cowshed (gaushala).",
        "vedicReferences": "Sapt Rishi Ashram is celebrated in the Skanda Purana as the supreme site where the ''Sapt-Rishi Mandala'' (the constellation of the seven sages) is anchored to the earth.",
        "deepInsights": "The splitting of the Ganga represents the truth that the nature always yields to the power of the concentrated consciousness. Sapt Rishi Ashram teaches that the true meditation creates its own space and silence.",
        "ancientLore": "Lore tells that the seven rishis still visit the ashram in their subtle forms during the Brahma Muhurta to bathe in the seven streams. Another legend says that the water from each of the seven streams has a unique spiritual property corresponding to the sage it is named after.",
        "keyRituals": [
                {
                        "name": "Sapt Dhara Snanam",
                        "description": "The ritual of bathing in the seven streams of the Ganga to seek the purification from the seven types of the karmic debts."
                },
                {
                        "name": "Rishi Tarpan",
                        "description": "Offering sacred water and seeds to the ancestors and the ancient sages to seek their blessing."
                },
                {
                        "name": "Sanskrit Pathshala Arati",
                        "description": "Participating in the evening prayers with the students of the Vedic school to seek the intellectual clarity."
                },
                {
                        "name": "Silent Stream Meditation",
                        "description": "Sitting on the banks of the Sapt Dhara to practice the silent meditation while focusing on the sound of the flowing water."
                }
        ],
        "highlights": [
                {
                        "name": "The Seven Rishi Shrines",
                        "description": "The unique collection of the small temples dedicated to each of the great Vedic seers."
                },
                {
                        "name": "The Sapt Dhara",
                        "description": "The spectacular sight of the Ganga splitting into seven channels right next to the ashram."
                },
                {
                        "name": "The Sanskrit Pathshala",
                        "description": "The traditional school where the young students study the ancient scriptures and the language."
                },
                {
                        "name": "The Ancient Banyan Tree",
                        "description": "A massive and sacred tree in the ashram courtyard, believed to be the spot where several sages have meditated."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the river streams are most beautiful after the monsoon and during the winter).",
                "howToReach": "Located 6km from the Haridwar railway station on the road to Rishikesh. Easily accessible by shared auto or taxi.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Haridwar Railway Station."
        },
        "tips": [
                "Visit in the early morning to experience the ashram at its most peaceful and to see the students performing their morning rituals.",
                "Carry some small change to offer at the various shrines of the seven sages; the priests are usually very knowledgeable and willing to share the stories.",
                "Be mindful of the river currents if you choose to bathe in the Sapt Dhara; always use the designated ghat areas."
        ],
        "faqs": [
                {
                        "question": "Who are the seven sages?",
                        "answer": "They are the Kashyapa, Atri, Vashishta, Vishwamitra, Gautama, Jamadagni, and Bharadwaja—the foundational masters of the Vedic wisdom."
                },
                {
                        "question": "Why did the Ganga split?",
                        "answer": "Legend says she split into seven streams to pass by the meditating sages without disturbing them with her loud roar."
                },
                {
                        "question": "Is it near Har Ki Pauri?",
                        "answer": "It is about 5-6 km away from Har Ki Pauri, making it a much quieter and more secluded spot."
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
    'Chandrabadni Devi', 
    'chandrabadni-devi-temple-tehri', 
    'Sacred Destination', 
    'uk', 
    'The "Mountain of the Lunar Face", Chandrabadni Devi is a supreme Shakti Peeth located on a high peak in the Tehri Garhwal region. It is a site of absolute ancient authority and divine presence, where the torso of Sati is believed to have fallen, representing the absolute seat of the spiritual power that completes the sacred triangle with Surkanda and Kunjapuri.', 
    '460.5', 
    '240.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The High Shakti of the Tehri Ridges and the Sanctuary of the Moon-Face Goddess', 
    'Chandrabadni Devi Temple | Uttarakhand, Shakti Peeth & Ancient Lore', 
    'Experience the profound energy of Chandrabadni Devi. Discover the ridgetop Shakti Peeth, the legend of the falling torso of Sati, and the profound energy of the Tehri pilgrimage.', 
    'Chandrabadni Devi, Tehri Garhwal, Uttarakhand, Shakti Peeth, Hindu Pilgrimage, Ancient Lore, High Altitude, Mountain Temple', 
    '263', 
    '{
        "spiritualEssence": "Chandrabadni is the manifestation of the divine as the supreme radiance and the absolute power of the ridgetop presence. The energy here is cool, expansive, and intensely luminous. It is the site where the highest point of the mountain becomes a spiritual beacon for the entire region. The vibration is one of ''Chandratva'' (Moon-like coolness) and the absolute clarity of the mountain vision. As a temple perched on a 2,277-meter peak offering views of the Kedarnath and Badrinath ranges, it represents the spiritual guardian of the central Tehri. A visit here is believed to grant the devotee the absolute removal of the inner heat (anger and desire) and the blessing of the divine peace. The air is always vibrant with the scent of the wild mountain herbs and the constant, rhythmic sound of the wind through the ridge peaks.",
        "longDescription": "Chandrabadni is one of the 51 Shakti Peethas. According to the tradition, when Lord Shiva was carrying the charred body of Sati, her torso fell at this spot. The temple is famous for its unique tradition where the idol of the Goddess is not directly worshipped; instead, a sacred shroud (Shree Yantra) covers the spot, and even the priest performs the ritual with blindfolded eyes. The temple provides spectacular views of the snow-clad Himalayas on one side and the deep valleys of the Alaknanda and Bhagirathi on the other. Legend tells that the great saint Adi Shankaracharya visited this site to establish the Devi as the protector of the central ridges. It is a site where the highest level of Himalayan geography and the most intense local faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Chandrabadni is a spectacular display of the traditional mountain ridge style with a focus on the simplicity and the exposure to the elements. The temple features a small stone shrine with a white-washed exterior and a series of paved platforms that wrap around the mountain top. A unique feature is the presence of several iron tridents (trishuls) anchored into the rock, representing the fierce protection of the Mother. The architecture is designed to minimize the visual obstruction of the horizon, creating a sense of a spiritual home that is suspended in the sky. The use of the local stone and the simple red flags create a sense of a spiritual retreat that is both ancient and alert. The complex includes several small benches for the pilgrims to rest and contemplate the vast landscape.",
        "vedicReferences": "Chandrabadni is celebrated in the local oral traditions as the supreme site where the Mother personally manifested her lunar brilliance to guide the mountain travelers.",
        "deepInsights": "The falling of the torso represents the truth that the heart of the spiritual power is found in the absolute center of the being. Chandrabadni teaches that the highest truth is often hidden from the physical eyes and must be felt in the soul.",
        "ancientLore": "Lore tells that the mountain peak personally rose higher to receive the sacred relic of the Mother. Another legend says that the bells of Chandrabadni can be heard in the Kedarnath valley during the full moon nights, signaling the meeting of the Shiva and Shakti energies.",
        "keyRituals": [
                {
                        "name": "Blindfolded Arati",
                        "description": "Witnessing the unique ritual where the priest offers light to the Goddess while his eyes are covered to seek the respect for the divine mystery."
                },
                {
                        "name": "Shakti Triangle Japa",
                        "description": "Performing the meditation while mentally connecting the three ridgetop shrines (Surkanda, Kunjapuri, Chandrabadni)."
                },
                {
                        "name": "Torso-Peak Parikrama",
                        "description": "Walking around the sacred peak to seek the alignment with the energy of the Shakti Peeth."
                },
                {
                        "name": "Dhwaja Arpan (Tehri)",
                        "description": "Tying the sacred red flags at the highest point of the temple to seek the divine protection and the victory."
                }
        ],
        "highlights": [
                {
                        "name": "The Hidden Shrine",
                        "description": "The sacred heart of the temple where the energy of the Shakti Peeth is housed behind a sacred shroud."
                },
                {
                        "name": "The Himalayan Panorama (Tehri)",
                        "description": "The spectacular 360-degree view of the high snow peaks and the river valleys below."
                },
                {
                        "name": "The Ancient Trishuls",
                        "description": "The collection of historic iron tridents representing the warrior-spirit of the mountain Goddess."
                },
                {
                        "name": "The Peak Meditation Platform",
                        "description": "The open-air area at the very top of the hill, ideal for deep contemplation."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the views are most spectacular from October to March).",
                "howToReach": "Located 22km from Devprayag. Reached by road to the base (Jarmola), followed by a 1km uphill walk.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Start the climb early in the morning to catch the sunrise over the snow peaks; the light at this altitude is exceptionally pure.",
                "Respect the local tradition of the hidden idol; do not attempt to look behind the shroud and maintain the sanctity of the ritual.",
                "The weather can be significantly colder than in the valley; carry a light sweater or shawl even in the summer."
        ],
        "faqs": [
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the 51 Shakti Peethas, where the torso of the Goddess Sati is said to have fallen."
                },
                {
                        "question": "How difficult is the walk?",
                        "answer": "It is a 1km walk on a paved path from the road head. it is relatively easy and takes about 30 minutes."
                },
                {
                        "question": "What is the ''Shakti Triangle''?",
                        "answer": "It is the sacred geographic formation of three ridgetop temples—Surkanda Devi, Kunjapuri Devi, and Chandrabadni Devi—that protect the Garhwal region."
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
    'Danda Nagaraja', 
    'danda-nagaraja-temple-pauri', 
    'Sacred Destination', 
    'uk', 
    'The "Lord of the High Ridges", Danda Nagaraja is a supreme protective shrine in the Pauri Garhwal region. It is a site of absolute folk authority and snake-lineage resonance, dedicated to Lord Krishna in the form of the King of Snakes, representing the absolute manifestation of the divine as the guardian of the mountain forests and the profound energy of the Nag-Tattva.', 
    '480.5', 
    '260.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Guardian of the Pauri Hills and the Sanctuary of the Snake Lord', 
    'Danda Nagaraja Temple | Uttarakhand, Snake Deity & Ancient Lore', 
    'Experience the profound energy of Danda Nagaraja. Discover the ridgetop snake shrine, the legend of the Krishna-Nag manifestation, and the profound energy of the Pauri pilgrimage.', 
    'Danda Nagaraja, Pauri Garhwal, Uttarakhand, Snake Deity, Lord Krishna, Nag Tattva, Hindu Pilgrimage, Ancient Lore, High Altitude', 
    '264', 
    '{
        "spiritualEssence": "Danda Nagaraja is the manifestation of the divine as the supreme protection and the absolute alignment with the earth-energies. The energy here is grounded, protective, and intensely vibrant. It is the site where the serpent-energy of the mountain is harnessed for the spiritual benefit. The vibration is one of ''Nag-Udaya'' (Rising of the Serpent) and the absolute health of the local ecosystem. As a temple perched on a high ridge overlooking the Pauri hills and the distant snow peaks, it represents the spiritual armor of the southern Garhwal. A visit here is believed to grant the devotee the absolute removal of the poisons (physical and mental) and the blessing of the family protection. The air is always vibrant with the scent of the pine needles and the silent, heavy energy of the ancient forest spirits.",
        "longDescription": "Danda Nagaraja is one of the most revered Nag temples in Uttarakhand. Legend tells that Lord Krishna personally took the form of a snake and stayed on this ridge (Danda) to protect the local cowherds and the livestock. The temple is situated in a spectacular location and is famous for the large annual fair held on the Krishna Janmashtami. Devotees offer milk and simple forest flowers to the deity. The site is a critical center for the folk culture of the Pauri region, where the worship of the Nagas is deeply integrated with the agricultural and the social life. It is a site where the highest level of Puranic Krishna-Bhakti and the most ancient Himalayan snake worship are perfectly unified.",
        "spiritualArchitecture": "The architecture of Danda Nagaraja is a spectacular display of the traditional mountain ridge style with a focus on the simplicity and the communal spaces. The temple features a central stone shrine with a white-washed shikhara and a series of large, open courtyards where the folk dancers perform during the festivals. A unique feature is the presence of several stone carvings of the snakes and the Lord Krishna, often depicted in the Kaliya-Mardan pose. The architecture is designed to facilitate the gathering of the thousands of people from the nearby villages. The use of the vibrant colors and the simple local materials create a sense of a spiritual home that is both approachable and sacred. The complex includes several small resting halls for the pilgrims.",
        "vedicReferences": "Danda Nagaraja is celebrated in the local oral epics as the supreme site where the Lord of the Serpents personally established the boundary of the sacred land.",
        "deepInsights": "The snake lord represents the truth that the divine protection is found in the absolute awareness of the earth-energy. Danda Nagaraja teaches that the spirit must be as alert and as flexible as the serpent.",
        "ancientLore": "Lore tells that the bells of Danda Nagaraja can be heard in the celestial realms during the winter solstice. Another legend says that the deity personally guards the mountain pass, ensuring that no negative energy can enter the inner valleys of the Pauri region.",
        "keyRituals": [
                {
                        "name": "Nag-Milk Abhisheka",
                        "description": "Offering sacred milk to the stone images of the snakes to seek the protection from the elemental fears."
                },
                {
                        "name": "Krishna-Nag Jaagar",
                        "description": "Participating in the traditional night-long ritual of chanting and drumming to invoke the spirit of the Nagaraja."
                },
                {
                        "name": "Ridge-Dhwaja Arpan",
                        "description": "Tying the sacred flags at the temple to symbolize the devotee''s prayer for the family well-being."
                },
                {
                        "name": "Pauri Valley Dhyana",
                        "description": "Sitting in the temple courtyard to meditate on the vast valleys below to seek the mental expansion."
                }
        ],
        "highlights": [
                {
                        "name": "The Nagaraja Shrine",
                        "description": "The sacred heart of the temple where the image of the Snake Lord is worshipped."
                },
                {
                        "name": "The Festival Arena",
                        "description": "The large courtyard that hosts the vibrant folk dances and the annual fairs."
                },
                {
                        "name": "The Snake Carvings",
                        "description": "The unique collection of the ancient stone reliefs depicting the various Nagas of the mountain."
                },
                {
                        "name": "The Pauri Viewpoint",
                        "description": "The balcony offering spectacular views of the Pauri town and the surrounding hill ranges."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during the Krishna Janmashtami in August and the spring months).",
                "howToReach": "Located 35km from Pauri town. Reached by road; regular taxis and buses run from Pauri and Kotdwar.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Kotdwar Railway Station."
        },
        "tips": [
                "Visit during the local festivals to experience the vibrant folk culture and the traditional mountain music.",
                "Maintain the cleanliness of the forest area; the temple is located in a beautiful and ecologically sensitive zone.",
                "Respect the local snake-worship traditions; the deity is deeply revered as the ultimate protector of the life and the property."
        ],
        "faqs": [
                {
                        "question": "Who is Danda Nagaraja?",
                        "answer": "He is Lord Krishna worshipped in the form of a snake, the supreme protector of the high ridges (Danda) in Pauri."
                },
                {
                        "question": "What is the main festival?",
                        "answer": "Krishna Janmashtami is the biggest festival, celebrated with a massive local fair and the traditional dances."
                },
                {
                        "question": "Where is it located?",
                        "answer": "In the Pauri Garhwal district, on a high ridge overlooking the surrounding valleys."
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
    'Kandoliya Mahadev', 
    'kandoliya-mahadev-temple-pauri', 
    'Sacred Destination', 
    'uk', 
    'The "City Guardian of Pauri", Kandoliya Mahadev is an ancient Shiva temple located in a dense pine forest near Pauri town. It is a site of absolute regional authority and protective resonance, being the primary deity of the Pauri hills, representing the absolute manifestation of the Lord as the master of the Himalayan forests and the profound energy of the city-sanctuary.', 
    '475.2', 
    '265.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Protector of the Pauri Heights and the Sanctuary of the Pine Forest', 
    'Kandoliya Mahadev Pauri | Uttarakhand, Lord Shiva & Ancient Lore', 
    'Experience the profound peace of Kandoliya Mahadev. Discover the forest shrine, the legend of the city guardian, and the profound energy of the Pauri pilgrimage.', 
    'Kandoliya Mahadev, Pauri, Uttarakhand, Lord Shiva, Pine Forest, City Guardian, Hindu Pilgrimage, Ancient Lore, Pauri Garhwal', 
    '265', 
    '{
        "spiritualEssence": "Kandoliya Mahadev is the manifestation of the divine as the supreme calm and the absolute protection of the local community. The energy here is fresh, pine-scented, and intensely steady. It is the site where the town of Pauri finds its spiritual anchor. The vibration is one of ''Sthirata'' (Stability) and the absolute clarity of the mountain life. As a beautiful temple surrounded by one of the highest-altitude pine and oak forests in the region, it represents the spiritual heart of the Pauri hills. A visit here is believed to grant the devotee the absolute peace of mind and the blessing of the divine guidance in the daily life. The air is always vibrant with the scent of the pine resin and the constant, rhythmic sound of the wind through the high-altitude trees.",
        "longDescription": "Kandoliya Mahadev is the presiding deity of the Pauri town. The temple is located at a high point offering spectacular views of the snow peaks and the Gangetic plains. It is a favorite spot for both pilgrims and the local residents seeking solace in nature. The temple features a beautiful image of the Lord Shiva and several smaller shrines. Nearby is the Kandoliya ground, which is a popular park and a viewpoint. Legend tells that the Lord personally chose this ridge to keep a watch over the people of Pauri. The site is a critical center for the local festivals, especially the Shivratri, when the entire town gathers to offer prayers. It is a site where the highest level of Himalayan forest aesthetic and the most intimate community faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Kandoliya Mahadev is a spectacular display of the traditional Garhwali stone style with a focus on the integration with the forest landscape. The temple features a central stone shrine with a simple but elegant shikhara and a series of paved courtyards that wrap around the ridge. A unique feature is the use of the local weathered stone that blends perfectly with the surrounding pine trunks. The architecture is designed to create a sense of a spiritual clearing in the middle of a dense forest. The use of the modest colors and the beautifully maintained flower gardens create a sense of a spiritual home that is both orderly and natural. The complex includes several small benches and a nearby viewpoint with a large open ground.",
        "vedicReferences": "Kandoliya Mahadev is celebrated in the local oral traditions as the supreme site where the Lord personally rested his trident to protect the mountain dwellers.",
        "deepInsights": "The forest guardian represents the truth that the divine is always present in the silence of the nature. Kandoliya Mahadev teaches that the spirit must be as upright and as resilient as the Himalayan pine.",
        "ancientLore": "Lore tells that the bells of Kandoliya ring on their own during the clear winter nights to announce the arrival of the snow. Another legend says that the water from the temple well has the power to heal the deep fatigue of the mountain travelers.",
        "keyRituals": [
                {
                        "name": "Kandoliya Jal-Abhisheka",
                        "description": "Offering sacred water to the Shiva Lingam to seek the peace and the stability for the family."
                },
                {
                        "name": "Pine-Grove Dhyana",
                        "description": "Sitting in the surrounding forest to practice the silent meditation while focusing on the scent of the pines."
                },
                {
                        "name": "City Guardian Arati",
                        "description": "The ritual of offering light at dusk to seek the protection for the Pauri town and its inhabitants."
                },
                {
                        "name": "Shikhar-Darshan (Pauri)",
                        "description": "Offering prayers while facing the high snow peaks from the temple viewpoint to seek the spiritual expansion."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Forest Shrine",
                        "description": "The sacred heart of the temple where the energy of the Lord Shiva is most intensely felt."
                },
                {
                        "name": "The Kandoliya Ground",
                        "description": "The nearby open park and the viewpoint offering the best views in the Pauri region."
                },
                {
                        "name": "The Ancient Pine Forest",
                        "description": "The spectacular high-altitude forest that surrounds the temple complex."
                },
                {
                        "name": "The Snow Peak Perspective",
                        "description": "The specific spot from where one can see the massive ranges of the Kedarnath and the Badrinath."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the forest is most beautiful in the spring and the early winter).",
                "howToReach": "Located 2km from the Pauri bus stand. Easily accessible by foot or a short rickshaw ride.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Kotdwar Railway Station."
        },
        "tips": [
                "Visit in the early evening to enjoy the sunset over the plains from the Kandoliya ground.",
                "Spend some time walking in the surrounding pine forest; the air is exceptionally clean and invigorating.",
                "Respect the silence of the temple premises; it is a popular spot for the local students and the elderly to meditate."
        ],
        "faqs": [
                {
                        "question": "Who is Kandoliya Mahadev?",
                        "answer": "He is the presiding deity and the supreme guardian of the Pauri town, a manifestation of Lord Shiva."
                },
                {
                        "question": "Is it a difficult climb?",
                        "answer": "No, it is located on a ridge accessible by road; the walk within the temple complex is easy and paved."
                },
                {
                        "question": "What can we see from here?",
                        "answer": "On clear days, you can see a magnificent 180-degree view of the high Himalayas and the deep valleys of the Garhwal."
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
    'Kalsi (Ashokan Edict)', 
    'kalsi-ashokan-edict-dehradun', 
    'Sacred Destination', 
    'uk', 
    'The "Historic Gate of the Yamuna", Kalsi is an ancient site in the Dehradun district. It is a site of absolute historic authority and Mauryan resonance, being the only site in North India where the 14th major Rock Edict of Emperor Ashoka is found, representing the absolute manifestation of the Dharma and the profound energy of the ancient Indian ethical vision at the confluence of the hills and the plains.', 
    '360.2', 
    '250.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Rock of the Eternal Dharma and the Sanctuary of the Mauryan Wisdom', 
    'Kalsi Ashokan Edict | Uttarakhand, History & Ancient Lore', 
    'Experience the profound history of Kalsi. Discover the Ashokan rock edict, the legend of the Mauryan peace, and the profound energy of the Yamuna valley pilgrimage.', 
    'Kalsi, Dehradun, Ashokan Edict, Emperor Ashoka, Mauryan Empire, Ancient India, History, Hindu Pilgrimage, Ancient Lore, Yamuna River', 
    '266', 
    '{
        "spiritualEssence": "Kalsi is the manifestation of the divine as the supreme law and the absolute application of the ethics to the social life. The energy here is grounded, intellectual, and intensely historical. It is the site where the voice of the ancient emperor is etched into the stone of the Himalayas. The vibration is one of ''Dharma'' (Righteousness) and the absolute clarity of the non-violence. As a protected site on the banks of the Yamuna where the river leaves the mountains, it represents the spiritual lighthouse of the ancient Mauryan borders. A visit here is believed to grant the devotee the absolute understanding of the social duty and the blessing of the mental peace through the righteous living. The air is always vibrant with the scent of the river mist and the silent, heavy energy of the millennia of the recorded truth.",
        "longDescription": "The Ashokan Edict at Kalsi is a massive quartz rock inscribed in the 3rd century BCE using the Brahmi script and the Prakrit language. It contains the 14 major rock edicts of Ashoka, which outline his philosophy of Dharma, including the non-violence, the tolerance, and the welfare of all the living beings. The site is uniquely situated at the confluence of the Yamuna and the Tons rivers. The presence of this edict here proves that the region was a critical gateway between the Himalayan interior and the Gangetic plains. The inscription also includes a figure of an elephant, symbolizing the Buddha. Kalsi is a site where the highest level of Himalayan history and the most advanced ethical philosophy of ancient India are perfectly unified.",
        "spiritualArchitecture": "The architecture of Kalsi is a spectacular display of the archaeological preservation with a focus on the natural monument. The site features a protective structure built over the massive quartz rock to prevent the weathering of the inscriptions. A unique feature is the presence of a beautifully maintained garden and a quiet riverfront area that surrounds the historic stone. The architecture is designed to emphasize the permanence of the written word and the scale of the natural altar. The use of the simple protective roof and the informative placards create a sense of a spiritual classroom that is both ancient and accessible. The complex includes several paths leading down to the sacred Yamuna ghats.",
        "vedicReferences": "Kalsi is celebrated in the modern historical literature as the supreme site where the ''Chakravartin'' (Universal Monarch) vision of the Dharma was anchored to the mountain soil.",
        "deepInsights": "The rock edict represents the truth that the highest power is the one that serves the truth. Kalsi teaches that the spiritual values must be written into the foundation of the society to ensure the lasting peace.",
        "ancientLore": "Lore tells that the rock personally appeared from the river Yamuna to receive the emperor''s message. Another legend says that the words of the edict glow in the subtle form during the full moon nights, echoing the emperor''s prayer for the global harmony.",
        "keyRituals": [
                {
                        "name": "Dharma Path (Study)",
                        "description": "The ritual of reading and reflecting on the translations of the Ashokan edicts to seek the ethical guidance."
                },
                {
                        "name": "Yamuna Confluence Snanam",
                        "description": "Bathing at the nearby confluence of the Yamuna and the Tons to seek the purification from the dualistic thoughts."
                },
                {
                        "name": "Stone-Silence Meditation",
                        "description": "Sitting in front of the Ashokan rock to practice the silent meditation while focusing on the permanence of the truth."
                },
                {
                        "name": "Elephas-Vrata",
                        "description": "Offering prayers at the elephant symbol on the rock to seek the wisdom and the strength of the Buddha energy."
                }
        ],
        "highlights": [
                {
                        "name": "The Ashokan Rock",
                        "description": "The massive quartz stone featuring the 14 major rock edicts of the emperor Ashoka."
                },
                {
                        "name": "The Brahmi Inscriptions",
                        "description": "The beautifully preserved ancient script that records the Mauryan philosophy of the Dharma."
                },
                {
                        "name": "The Yamuna Confluence",
                        "description": "The spectacular natural meeting of the Yamuna and the Tons rivers near the historic site."
                },
                {
                        "name": "The Archaeological Garden",
                        "description": "The serene green space that surrounds the monument, offering a peaceful environment for study."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the river views and the gardens are most beautiful in the spring and the autumn).",
                "howToReach": "Located 50km from Dehradun and 5km from Vikasnagar. Reached by road; regular buses and taxis run from Dehradun.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Carry a guidebook or a translation of the edicts to fully understand the historical and the spiritual significance of the inscriptions.",
                "Visit in the late afternoon to enjoy the soft light on the rock and the peaceful atmosphere of the river bank.",
                "Combine your visit with a trip to the nearby Dakpathar barrage for a complete experience of the Yamuna valley."
        ],
        "faqs": [
                {
                        "question": "What are the Ashokan edicts?",
                        "answer": "They are a collection of 33 inscriptions on the pillars and rocks made by the Emperor Ashoka, outlining his philosophy of Dharma."
                },
                {
                        "question": "What language is used at Kalsi?",
                        "answer": "The inscriptions are in the Prakrit language and the Brahmi script."
                },
                {
                        "question": "Why is there an elephant on the rock?",
                        "answer": "The elephant is a symbol of the Buddha, representing the emperor''s commitment to the Buddhist principles of the peace and the compassion."
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
    'Mostamanu Temple', 
    'mostamanu-temple-pithoragarh', 
    'Sacred Destination', 
    'uk', 
    'The "Rain God of the Frontier", Mostamanu is an ancient folk temple located near Pithoragarh. It is a site of absolute regional authority and agricultural resonance, being the primary deity who controls the weather and the rains in the Sor valley, representing the absolute manifestation of the divine as the master of the Himalayan elements and the profound energy of the frontier-devotion.', 
    '610.2', 
    '230.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Master of the Clouds and the Guardian of the Sor Valley', 
    'Mostamanu Temple Pithoragarh | Uttarakhand, Rain God & Ancient Lore', 
    'Experience the profound energy of Mostamanu. Discover the high-altitude folk shrine, the legend of the rain-master, and the profound energy of the Pithoragarh pilgrimage.', 
    'Mostamanu Temple, Pithoragarh, Rain God, Sor Valley, Uttarakhand, Folk Deity, Hindu Pilgrimage, Ancient Lore, High Altitude', 
    '267', 
    '{
        "spiritualEssence": "Mostamanu is the manifestation of the divine as the supreme abundance and the absolute control over the natural forces. The energy here is fresh, airy, and intensely vital. It is the site where the prayers of the farmers meet the response of the sky. The vibration is one of ''Varsha'' (Rain) and the absolute gratitude for the life-sustaining waters. As a temple perched on a high ridge overlooking the wide Pithoragarh valley and the high snow peaks of Nepal and India, it represents the spiritual weather-station of the Eastern Kumaon. A visit here is believed to grant the devotee the absolute removal of the droughts (in life and nature) and the blessing of the timely success. The air is always vibrant with the scent of the moist earth and the constant, rhythmic sound of the mountain wind.",
        "longDescription": "Mostamanu is the most revered folk deity of the Pithoragarh region. The temple is situated at an altitude of approximately 2,000 meters and is famous for the massive annual fair held in August-September, where thousands of people gather to seek the blessing for a good harvest. Legend tells that the deity personally chose this ridge to ensure that his gaze could cover every field in the Sor valley. The temple atmosphere is one of intense local pride and faith. It is said that whenever the region faces a drought, a special ritual at this temple never fails to bring the rain. The site is a critical anchor for the Kumaoni identity in the frontier region. It is a site where the highest level of Himalayan ridge-geography and the most practical human need for the sustenance are perfectly unified.",
        "spiritualArchitecture": "The architecture of Mostamanu is a spectacular display of the traditional Kumaoni ridge-shrine style with a focus on the open spaces and the panoramic framing. The temple features a central stone shrine with a simple shikhara and a massive paved courtyard that serves as the arena for the annual fairs. A unique feature is the presence of several high viewing platforms that offer some of the best views of the Panchachuli and Nanda Devi peaks. The architecture is designed to emphasize the connection to the sky and the vast horizon. The use of the simple white-washed walls and the vibrant multi-colored flags create a sense of a spiritual home that is celebratory and alert. The complex includes several small resting halls for the visiting villagers.",
        "vedicReferences": "Mostamanu is celebrated in the local oral epics as the supreme site where the cloud-deva personally established his throne to serve the mountain people.",
        "deepInsights": "The rain god represents the truth that the human survival is intimately connected with the grace of the nature. Mostamanu teaches that the gratitude for the simple elements is the highest form of the spiritual awareness.",
        "ancientLore": "Lore tells that the first raindrops of the monsoon always fall on the roof of the Mostamanu temple before touching the valley below. Another legend says that the deity personally rides a cloud over the fields at night to ensure the health of the crops.",
        "keyRituals": [
                {
                        "name": "Varsha Prarthana (Rain Prayer)",
                        "description": "The ritual performed during the times of the drought to seek the divine intervention for the rain."
                },
                {
                        "name": "Mostamanu Mela Jaagar",
                        "description": "Participating in the traditional night-long ritual of chanting and drumming during the annual fair."
                },
                {
                        "name": "Crop Offering",
                        "description": "Offering the first harvest of the grain to the deity to seek the continued prosperity of the family."
                },
                {
                        "name": "Ridge-Top Sky Meditation",
                        "description": "Sitting in the temple courtyard to practice the silent meditation while focusing on the movement of the clouds."
                }
        ],
        "highlights": [
                {
                        "name": "The High-Altitude Shrine",
                        "description": "The sacred heart of the temple where the image of the Rain God is worshipped."
                },
                {
                        "name": "The Fair Grounds",
                        "description": "The massive courtyard that hosts one of the largest folk gatherings in the Eastern Kumaon."
                },
                {
                        "name": "The Snow Peak Gallery",
                        "description": "The spectacular vantage point offering views of the high Himalayan giants of India and Nepal."
                },
                {
                        "name": "The Ancient Stone Altar",
                        "description": "The foundation of the temple believed to be the specific spot where the deity first manifested."
                }
        ],
        "travelInfo": {
                "bestTime": "August-September (during the annual fair) and the spring months of March-April.",
                "howToReach": "Located 6km from Pithoragarh town. Easily accessible by road; regular taxis run from the town center.",
                "nearestAirport": "Pithoragarh Airport (Naini Saini).",
                "nearestRailway": "Tanakpur Railway Station."
        },
        "tips": [
                "Visit during the annual fair to experience the true scale of the local faith and the vibrant Kumaoni folk culture.",
                "The temple offers one of the best spots for photography in the Pithoragarh region; carry your camera for the panoramic views.",
                "Maintain the sanctity of the ritual spaces; although it is a popular viewpoint, it remains a site of intense local devotion."
        ],
        "faqs": [
                {
                        "question": "Who is Mostamanu?",
                        "answer": "He is the supreme rain god and the presiding folk deity of the Pithoragarh (Sor) valley."
                },
                {
                        "question": "When is the big fair?",
                        "answer": "The Mostamanu Mela is held annually in the month of August or September, attracting thousands of devotees."
                },
                {
                        "question": "What can we see from the temple?",
                        "answer": "It offers panoramic views of the Pithoragarh town, the Sor valley, and the massive snow peaks of the Himalayas."
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
    'Chandrabani', 
    'chandrabani-temple-dehradun', 
    'Sacred Destination', 
    'uk', 
    'The "Sanctuary of Rishi Gautam", Chandrabani is an ancient spiritual landmark in Dehradun. It is a site of absolute Vedic authority and forest resonance, being the legendary spot where the great sage Gautam meditated and where the celestial stream Gautam Kund is located, representing the absolute manifestation of the Rishi traditions and the profound energy of the nature-based penance.', 
    '385.2', 
    '265.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Forest Home of the Sages and the Sanctuary of the Celestial Stream', 
    'Chandrabani Dehradun | Uttarakhand, Rishi Gautam & Ancient Lore', 
    'Experience the profound silence of Chandrabani. Discover the Gautam Kund, the legend of the ancient sages, and the profound energy of the Dehradun pilgrimage.', 
    'Chandrabani, Dehradun, Rishi Gautam, Gautam Kund, Uttarakhand, Hindu Pilgrimage, Ancient Lore, Forest Temple', 
    '268', 
    '{
        "spiritualEssence": "Chandrabani is the manifestation of the divine as the supreme discipline and the absolute purity of the forest life. The energy here is ancient, watery, and intensely tranquil. It is the site where the earth meets the celestial streams. The vibration is one of ''Tapa'' (Penance) and the absolute clarity of the Vedic science. As a serene temple surrounded by lush green forests on the outskirts of Dehradun, it represents the spiritual womb of the Doon valley. A visit here is believed to grant the devotee the absolute depth of the spiritual insight and the blessing of the physical and mental purification. The air is always vibrant with the scent of the wild flowers and the constant, rhythmic sound of the flowing stream and the bird-song.",
        "longDescription": "Chandrabani (also known as Gautam Kund) is a site of immense spiritual significance. According to the legend, the great sage Gautam lived and meditated here with his family. The site is famous for its natural water spring (Gautam Kund), which is believed to have been manifested by the sage for his daily rituals. The temple complex is simple and peaceful, attracting those looking for a quiet space for meditation and prayer. It is also a favorite spot for the nature lovers and the bird watchers due to its pristine forest environment. Legend tells that even the celestial beings visit this spot to pay their respects to the legacy of the Maharishi. It is a site where the highest level of Himalayan rishi-culture and the most serene valley ecology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Chandrabani is a spectacular display of the traditional forest-shrine style with a focus on the natural integration and the simplicity. The complex features a small central shrine dedicated to the Lord Shiva and a series of paved steps leading to the sacred Gautam Kund. A unique feature is the presence of the numerous small alcoves and the stone platforms beneath the ancient trees where seekers can sit for meditation. The architecture is designed to minimize the visual obstruction of the surrounding green canopy. The use of the simple white-washed walls and the natural stone flooring create a sense of a spiritual home that is both humble and sacred. The complex includes several small rooms for the priests and the visiting seekers.",
        "vedicReferences": "Chandrabani is celebrated in the local oral traditions as the supreme site where the ''Nyaya'' (Logic) philosophy was refined by the sage Gautam in the silence of the forest.",
        "deepInsights": "The celestial stream represents the truth that the divine grace flows wherever there is the sincere effort. Chandrabani teaches that the spirit must become as clear and as constant as the forest spring.",
        "ancientLore": "Lore tells that the water of the Gautam Kund never dries up, even in the harshest summer, proving the sage''s power over the elements. Another legend says that the birds of Chandrabani are the transformed disciples of the Maharishi, who still chant the Vedic verses in the form of their songs.",
        "keyRituals": [
                {
                        "name": "Gautam Kund Marjan",
                        "description": "The ritual of sprinkled the sacred spring water over the self to seek the purification from the mental distractions."
                },
                {
                        "name": "Rishi-Vrata Meditation",
                        "description": "Sitting in the forest temple to practice the silent meditation in the tradition of the Maharishi Gautam."
                },
                {
                        "name": "Aranya Arati (Forest Light)",
                        "description": "The ritual of offering light to the deities at dusk to seek the harmony with the natural spirits."
                },
                {
                        "name": "Vedic Chanting (Doon)",
                        "description": "Participating in the collective reading of the ancient verses in the temple courtyard to seek the intellectual clarity."
                }
        ],
        "highlights": [
                {
                        "name": "The Gautam Kund",
                        "description": "The sacred natural spring believed to be manifested by the power of the sage Gautam."
                },
                {
                        "name": "The Forest Shrine",
                        "description": "The peaceful heart of the complex where the energy of the ancient sages is most accessible."
                },
                {
                        "name": "The Ancient Peepal Grove",
                        "description": "The collection of the centuries-old trees that provide a canopy of silence over the temple."
                },
                {
                        "name": "The Nature Trail",
                        "description": "The beautiful and spiritually charged path that leads through the surrounding forests."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the forest and the spring are most vibrant after the monsoon and during the spring).",
                "howToReach": "Located 7km from the Dehradun city center on the Dehradun-Delhi road. Easily accessible by rickshaw or taxi.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Visit in the early morning to enjoy the bird-song and the absolute silence of the forest environment.",
                "Carry a bottle of water and wear comfortable walking shoes if you plan to explore the surrounding trails.",
                "Maintain the cleanliness of the spring and the forest; do not use soap or detergents in the sacred Gautam Kund."
        ],
        "faqs": [
                {
                        "question": "Who was Rishi Gautam?",
                        "answer": "He was one of the Sapt Rishis (seven great sages) and the founder of the Nyaya school of the Indian philosophy."
                },
                {
                        "question": "What is Gautam Kund?",
                        "answer": "It is a sacred natural water spring at Chandrabani, believed to be the spot where the sage performed his daily ablutions."
                },
                {
                        "question": "Can I meditate there?",
                        "answer": "Yes, the temple and the surrounding forest provide an exceptionally peaceful environment for the meditation and the prayer."
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
    'Bhadraj Temple', 
    'bhadraj-temple-mussoorie', 
    'Sacred Destination', 
    'uk', 
    'The "Lord of the High Peaks", Bhadraj Temple is a supreme spiritual landmark located at the western end of the Mussoorie range. It is a site of absolute ancient authority and divine protection, dedicated to Lord Balbhadra (Balarama), representing the absolute manifestation of the strength and the profound energy of the mountain-summit devotion at the highest point of the Mussoorie hills.', 
    '378.5', 
    '252.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Peak of the Elder Brother and the Sanctuary of the 360-Degree Horizon', 
    'Bhadraj Temple Mussoorie | Uttarakhand, Lord Balbhadra & Ancient Lore', 
    'Experience the profound energy of Bhadraj Temple. Discover the highest peak of Mussoorie, the legend of the Lord Balbhadra, and the profound energy of the mountain pilgrimage.', 
    'Bhadraj Temple, Mussoorie, Lord Balbhadra, Balarama, Uttarakhand, Hindu Pilgrimage, Ancient Lore, High Altitude, Trekking', 
    '269', 
    '{
        "spiritualEssence": "Bhadraj is the manifestation of the divine as the supreme stability and the absolute power of the mountain-top vision. The energy here is vast, airy, and intensely expansive. It is the site where the earth-energy reaches its highest elevation in the Mussoorie range. The vibration is one of ''Bala'' (Strength) and the absolute perspective over the world of the forms. As a temple perched on a 2,200-meter peak offering views of the Doon valley, the Yamuna valley, and the high snow ranges, it represents the spiritual sentinel of the western Garhwal. A visit here is believed to grant the devotee the absolute lifting of the spirit and the blessing of the inner and outer strength. The air is always vibrant with the scent of the wild flowers and the constant, rhythmic sound of the high-altitude winds.",
        "longDescription": "Bhadraj Temple is dedicated to Lord Balbhadra, the elder brother of Lord Krishna. It is located on a peak that marks the western boundary of the Mussoorie hills. The temple is famous for its location, requiring a scenic 11km trek from the Cloud''s End area. The site provides a 360-degree view that is considered one of the best in the Himalayas. Legend tells that the Lord personally chose this peak to keep a watch over the cattle and the cowherds of the surrounding villages. The temple atmosphere is one of intense local devotion, especially during the annual fair held in August. It is a site where the highest level of Himalayan trekking experience and the most ancient pastoral faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Bhadraj Temple is a spectacular display of the simple mountain-top style with a focus on the structural resilience and the panoramic openness. The temple features a small stone shrine with a white-washed exterior and a series of open-air platforms that wrap around the ridge peak. A unique feature is the presence of several stone carvings of the Lord Balbhadra holding his symbolic plow (Hal). The architecture is designed to minimize the visual obstruction of the horizon, creating a sense of a spiritual home that is suspended in the clouds. The use of the vibrant red flags and the simple stone flooring create a sense of a spiritual retreat that is both alert and peaceful. The complex includes several small benches for the pilgrims to rest and contemplate the vast landscape.",
        "vedicReferences": "Bhadraj is celebrated in the local oral traditions as the supreme site where the ''Shesha-Avatar'' (the serpent incarnation) personally manifested to stabilize the mountains.",
        "deepInsights": "The high peak represents the truth that the spiritual elevation is the result of a long and steady journey. Bhadraj teaches that the highest strength is the one that allows us to see the entire creation from a place of peace.",
        "ancientLore": "Lore tells that the mountain peak personally rose higher to receive the footsteps of the Lord Balbhadra. Another legend says that the bells of the Bhadraj temple ring on their own during the equinox to signal the balance of the day and the night.",
        "keyRituals": [
                {
                        "name": "Bhadraj Peak Arati",
                        "description": "The ritual of offering light at dawn to seek the spiritual illumination and the strength."
                },
                {
                        "name": "Plow-Symbol Puja",
                        "description": "Offering prayers to the symbolic plow of the Lord to seek the prosperity and the stability of the family."
                },
                {
                        "name": "High-Peak Parikrama",
                        "description": "Walking around the temple summit to seek the alignment with the energy of the mountain-axis."
                },
                {
                        "name": "Horizon Dhyana",
                        "description": "Sitting on the temple platforms to practice the silent meditation while focusing on the distant snow peaks."
                }
        ],
        "highlights": [
                {
                        "name": "The High-Peak Shrine",
                        "description": "The sacred heart of the temple where the image of Lord Balbhadra is worshipped."
                },
                {
                        "name": "The 360-Degree Viewpoint",
                        "description": "The spectacular vantage point offering views of the Doon, Yamuna, and the Himalayan ranges."
                },
                {
                        "name": "The Cloud''s End Trail",
                        "description": "The beautiful and spiritually charged trekking path that leads to the temple summit."
                },
                {
                        "name": "The Ancient Rock Altar",
                        "description": "The foundation of the temple believed to be the specific spot where the deity first manifested."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (trekking is most pleasant from October to April).",
                "howToReach": "Located 11km from Mussoorie (Cloud''s End). Reached by a scenic trek through the forest and the ridges.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Start the trek early in the morning to catch the clear views and to complete the return journey before sunset.",
                "Carry adequate water and some snacks; there are very few facilities along the trekking trail.",
                "Maintain the cleanliness of the mountain trails; the area is a beautiful and ecologically sensitive zone."
        ],
        "faqs": [
                {
                        "question": "Who is the main deity?",
                        "answer": "The temple is dedicated to Lord Balbhadra (Balarama), the elder brother of Lord Krishna."
                },
                {
                        "question": "How long is the trek?",
                        "answer": "It is an 11km trek from Cloud''s End, which takes about 3-4 hours for an average hiker."
                },
                {
                        "question": "Are there any facilities at the top?",
                        "answer": "There is a small local shop for basic refreshments, but it is best to carry your own supplies."
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
    'Shedup Choephelling Monastery', 
    'shedup-choephelling-monastery-mussoorie', 
    'Sacred Destination', 
    'uk', 
    'The "Sanctuary of the First Refuge", Shedup Choephelling Monastery is a historic Buddhist landmark in Mussoorie. It is a site of absolute spiritual authority and Tibetan resonance, being the first place where the 14th Dalai Lama stayed after his flight from Tibet in 1959, representing the absolute manifestation of the compassion and the profound energy of the Himalayan Buddhist tradition in exile.', 
    '382.5', 
    '254.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Cradle of the Tibetan Legacy and the Sanctuary of the Compassionate Wisdom', 
    'Shedup Choephelling Monastery Mussoorie | Uttarakhand, Dalai Lama & Ancient Lore', 
    'Experience the profound peace of Shedup Choephelling. Discover the Happy Valley monastery, the legend of the first refuge, and the profound energy of the Mussoorie pilgrimage.', 
    'Shedup Choephelling, Mussoorie, Happy Valley, Buddhist Monastery, Dalai Lama, Tibetan Culture, Hindu Pilgrimage, Ancient Lore, Peace', 
    '270', 
    '{
        "spiritualEssence": "Shedup Choephelling is the manifestation of the divine as the supreme resilience and the absolute power of the compassionate heart. The energy here is serene, colorful, and intensely vibrant. It is the site where the ancient wisdom of Tibet was first anchored in the Indian soil. The vibration is one of ''Karuna'' (Compassion) and the absolute clarity of the Buddhist path. As a beautiful monastery perched on a ridge in the Happy Valley area of Mussoorie, it represents the spiritual heart of the Tibetan community in the region. A visit here is believed to grant the devotee the absolute peace of mind and the blessing of the inner harmony. The air is always vibrant with the scent of the butter lamps and the constant, rhythmic sound of the chanting and the spinning prayer wheels.",
        "longDescription": "The monastery was established in 1960 and served as the temporary residence of the 14th Dalai Lama for nearly a year before he moved to Dharamshala. It is located in the Happy Valley, the first Tibetan settlement in India. The monastery features a beautifully decorated prayer hall with a large statue of the Buddha and intricate thangka paintings. The site provides spectacular views of the Doon valley and the surrounding hills. It is a favorite spot for the seekers of the peace and the students of the Tibetan culture. The monastery complex also includes a library and a school for the young monks. It is a site where the highest level of Himalayan Buddhist art and the most intense history of the Tibetan people are perfectly unified.",
        "spiritualArchitecture": "The architecture of Shedup Choephelling is a spectacular display of the traditional Tibetan style with a focus on the vibrant colors and the symbolic ornamentation. The monastery features a multi-story building with a grand prayer hall, topped by the golden roofs and the dharma-wheels. A unique feature is the presence of the long rows of the prayer wheels (Mani Wheels) that surround the outer walls. The architecture is designed to lead the visitor through a visual and a kinetic experience of the dharma. The use of the bright reds, yellows, and the blues against the white walls create a sense of a spiritual oasis that is celebratory and sacred. The complex includes several small meditation rooms and a beautifully maintained garden with the stupas.",
        "vedicReferences": "Shedup Choephelling is celebrated in the modern Buddhist history as the supreme site where the ''Buddha-Dharma'' was preserved for the benefit of the global community.",
        "deepInsights": "The first refuge represents the truth that the spirit can find a home even in the displacement. The monastery teaches that the highest wisdom is the one that creates the peace in the face of the adversity.",
        "ancientLore": "Lore tells that the air of the Happy Valley was personally blessed by the Dalai Lama to ensure that it would always remain a sanctuary for the seekers. Another legend says that the lights of the monastery can be seen as a spiritual beacon by the travelers in the Doon valley below.",
        "keyRituals": [
                {
                        "name": "Mani Wheel Spinning",
                        "description": "The ritual of spinning the prayer wheels to release the prayers for the benefit of all the sentient beings."
                },
                {
                        "name": "Morning Buddha Chanting",
                        "description": "Participating in the collective prayers with the monks to seek the mental purification and the peace."
                },
                {
                        "name": "Butter Lamp Offering",
                        "description": "Lighting the traditional lamps in the prayer hall to seek the spiritual illumination."
                },
                {
                        "name": "Happy Valley Walk",
                        "description": "The ritual of walking through the Tibetan settlement to experience the vibrant culture and the energy of the refuge."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Prayer Hall",
                        "description": "The sacred heart of the monastery featuring the large Buddha statue and the thangkas."
                },
                {
                        "name": "The Dalai Lama Memorial",
                        "description": "The space dedicated to the history of the 14th Dalai Lama''s stay at the monastery."
                },
                {
                        "name": "The Prayer Wheel Rows",
                        "description": "The unique and meditative paths lined with the hundreds of the Tibetan prayer wheels."
                },
                {
                        "name": "The Doon Valley Viewpoint",
                        "description": "The balcony offering spectacular views of the hills and the plains below."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the monastery is particularly peaceful in the spring and the autumn).",
                "howToReach": "Located in the Happy Valley area of Mussoorie. Easily accessible by road or a pleasant walk from the Library Chowk.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Maintain absolute silence while inside the prayer hall; the monks are often engaged in the deep study or the meditation.",
                "Dress modestly and remove your shoes before entering the main shrine area.",
                "Take some time to talk to the monks; they are usually very friendly and willing to share the stories of the monastery''s history."
        ],
        "faqs": [
                {
                        "question": "Why is it historic?",
                        "answer": "It was the first residence of the 14th Dalai Lama in India after he fled Tibet in 1959."
                },
                {
                        "question": "Can I visit the prayer hall?",
                        "answer": "Yes, the main prayer hall is open to the visitors during the daytime; please maintain the decorum."
                },
                {
                        "question": "Where is Happy Valley?",
                        "answer": "It is at the western end of the Mussoorie town, known as the first Tibetan settlement in India."
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
    'Binsar Mahadev', 
    'binsar-mahadev-temple-ranikhet', 
    'Sacred Destination', 
    'uk', 
    'The "Lord of the Cedar Forests", Binsar Mahadev is an ancient Shiva temple located in a dense deodar forest near Ranikhet. It is a site of absolute ancient authority and natural resonance, being one of the most serene forest shrines in the Kumaon region, representing the absolute manifestation of the Lord as the Master of the Stillness and the profound energy of the high-altitude pine-cedar meditation.', 
    '515.2', 
    '245.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Guardian of the Cedar Ridges and the Sanctuary of the Forest Silence', 
    'Binsar Mahadev Ranikhet | Uttarakhand, Lord Shiva & Ancient Lore', 
    'Experience the profound silence of Binsar Mahadev. Discover the deodar shrine, the legend of the forest Lord, and the profound energy of the Ranikhet pilgrimage.', 
    'Binsar Mahadev, Ranikhet, Uttarakhand, Lord Shiva, Deodar Forest, Hindu Pilgrimage, Ancient Lore, High Altitude, Peace', 
    '271', 
    '{
        "spiritualEssence": "Binsar Mahadev is the manifestation of the divine as the supreme stillness and the absolute depth of the natural sanctuary. The energy here is cool, deodar-scented, and intensely heavy with peace. It is the site where the high-altitude forest becomes a cathedral of the spirit. The vibration is one of ''Aranya-Dhyana'' (Forest Meditation) and the absolute clarity of the detached existence. As a beautiful temple complex tucked away in a deep valley surrounded by some of the oldest deodar trees in the Kumaon, it represents the spiritual lungs of the central ridges. A visit here is believed to grant the devotee the absolute removal of the worldly stress and the blessing of the inner verticality. The air is always vibrant with the scent of the cedar resin and the constant, rhythmic sound of the wind through the high-altitude branches.",
        "longDescription": "The Binsar Mahadev temple dates back to the 9th-10th centuries and is dedicated to Lord Shiva. It is situated at an altitude of approximately 2,480 meters. The temple is famous for its location, requiring a drive through a spectacularly dense forest of cedar, oak, and rhododendron. It features a beautiful image of the Lord Shiva, Goddess Parvati, and the Lord Ganesha. Nearby is a sacred water spring and an ashram for the seekers. Legend tells that the temple was built in a single night by the supernatural beings who were sent by the Lord to bless the local rulers. The site is a favorite spot for the serious practitioners of the Yoga and those looking for an absolute escape from the modern noise. It is a site where the highest level of Himalayan forest aesthetic and the most ancient Shaivite mysticism are perfectly unified.",
        "spiritualArchitecture": "The architecture of Binsar Mahadev is a spectacular display of the traditional Kumaoni stone style with a focus on the integration with the massive deodar trunks. The temple features a central stone shrine with a low, wide shikhara and a series of paved courtyards that wrap around the ancient trees. A unique feature is the use of the dark, weathered stone that matches the shadows of the forest. The architecture is designed to create a sense of a spiritual clearing that is both hidden and protective. The use of the modest materials and the beautifully maintained herbal gardens create a sense of a spiritual home that is both ancient and inviting. The complex includes several small meditation cells and a traditional ashram kitchen.",
        "vedicReferences": "Binsar Mahadev is celebrated in the local oral traditions as the supreme site where the Lord personally manifested his ''Vana-Jyoti'' (Forest Light) to guide the mountain sages.",
        "deepInsights": "The cedar forest represents the truth that the spirit must grow tall and deep in its pursuit of the divine. Binsar Mahadev teaches that the highest peace is found in the absolute embrace of the silence.",
        "ancientLore": "Lore tells that the deodar trees of Binsar are the transformed sages who chose to stay with the Lord for eternity. Another legend says that the water of the temple spring never freezes, even in the harshest Himalayan winter, proving the warmth of the divine presence.",
        "keyRituals": [
                {
                        "name": "Binsar Mahadev Jal-Puja",
                        "description": "Offering sacred water to the Shiva Lingam to seek the stability and the peace for the family."
                },
                {
                        "name": "Cedar-Grove Dhyana",
                        "description": "Sitting in the surrounding deodar forest to practice the silent meditation while focusing on the sound of the wind."
                },
                {
                        "name": "Forest Arati",
                        "description": "The ritual of offering light at dusk to seek the harmony with the spirits of the mountain and the trees."
                },
                {
                        "name": "Rudra-Japa (Binsar)",
                        "description": "Chanting the names of the Lord Shiva in the temple courtyard to seek the absolute purification of the mind."
                }
        ],
        "highlights": [
                {
                        "name": "The Ancient Stone Shrine",
                        "description": "The sacred heart of the temple where the energy of the Lord Shiva is most intensely felt."
                },
                {
                        "name": "The Deodar Forest Cathedral",
                        "description": "The spectacular high-altitude forest that surrounds the temple complex."
                },
                {
                        "name": "The Sacred Forest Spring",
                        "description": "A natural water source believed to have the spiritual and the healing properties."
                },
                {
                        "name": "The Binsar Ashram",
                        "description": "The peaceful residential area for the seekers and the students of the Vedic wisdom near the temple."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the forest is most beautiful in the spring and the early winter).",
                "howToReach": "Located 15km from Ranikhet. Reached by road; taxis are regularly available from Ranikhet and Almora.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Visit in the early morning to experience the forest at its most silent and to see the morning mist through the deodars.",
                "Carry a light jacket as the temple is located at a high altitude and the forest shade can be quite cold even in the summer.",
                "Maintain the absolute silence of the forest trails; the area is a dedicated sanctuary for the spiritual practice."
        ],
        "faqs": [
                {
                        "question": "Who built the temple?",
                        "answer": "Historical evidence points to the 9th-10th centuries, likely built by the local rulers or the Kumaoni kings."
                },
                {
                        "question": "How high is the temple?",
                        "answer": "It is located at an altitude of approximately 2,480 meters (8,100 feet)."
                },
                {
                        "question": "Can I stay there?",
                        "answer": "There are basic ashram facilities near the temple for the seekers who wish to engage in the serious spiritual practice."
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
    'Jhalmali Devi', 
    'jhalmali-devi-temple-pauri', 
    'Sacred Destination', 
    'uk', 
    'The "Mystical Ridge Goddess", Jhalmali Devi is a high-altitude Shakti shrine located on a ridge in the Pauri Garhwal region. It is a site of absolute folk authority and protective resonance, being a major center for the local faith in the divine Mother as the guardian of the mountain passes, representing the absolute manifestation of the Shakti and the profound energy of the ridge-peak devotion.', 
    '490.2', 
    '255.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Radiance of the High Pass and the Sanctuary of the Ridge Mother', 
    'Jhalmali Devi Pauri | Uttarakhand, Shakti & Ancient Lore', 
    'Experience the profound energy of Jhalmali Devi. Discover the ridgetop Shakti shrine, the legend of the mountain Mother, and the profound energy of the Pauri pilgrimage.', 
    'Jhalmali Devi, Pauri Garhwal, Uttarakhand, Shakti Shrine, Hindu Pilgrimage, Ancient Lore, High Altitude, Mountain Pass', 
    '272', 
    '{
        "spiritualEssence": "Jhalmali Devi is the manifestation of the divine as the supreme radiance and the absolute power of the protective presence on the ridges. The energy here is bright, expansive, and intensely vibrant. It is the site where the Goddess is believed to shimmer (Jhalmal) with the solar energy. The vibration is one of ''Tejas'' (Brilliance) and the absolute clarity of the mountain path. As a temple perched on a high ridge offering views of the central Garhwal and the distant snow peaks, it represents the spiritual sentinel of the Pauri-Almora border. A visit here is believed to grant the devotee the absolute removal of the inner darkness and the blessing of the divine protection during the journeys. The air is always vibrant with the scent of the wild mountain flowers and the constant, rhythmic sound of the high-altitude wind.",
        "longDescription": "Jhalmali Devi is a highly revered shrine among the local communities of Pauri and the neighboring districts. The temple is famous for its location on a scenic ridge and the unique manifestation of the Goddess. Legend tells that the deity personally appeared on this pass to protect the travelers from the dangerous mountain spirits and the wild animals. The temple atmosphere is one of intense local devotion and faith. It is said that the Goddess personally guides the lost travelers during the heavy fog. The site is a critical center for the local folk festivals and attract thousands of visitors during the Navratri. It is a site where the highest level of Himalayan ridge-geography and the most vibrant folk faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Jhalmali Devi is a spectacular display of the traditional mountain ridge style with a focus on the simplicity and the exposure to the elements. The temple features a central stone shrine with a white-washed exterior and a series of paved courtyards that wrap around the mountain top. A unique feature is the presence of numerous bells and the vibrant red flags that catch the high-altitude winds. The architecture is designed to emphasize the exposure to the elements and the isolation of the peak, creating a sense of a spiritual fortress. The use of the vibrant colors and the simple stone construction create a sense of a spiritual home that is anchored to the rock of the ridge. The complex includes several small meditation spots near the ancient trees.",
        "vedicReferences": "Jhalmali Devi is celebrated in the local oral epics as the supreme site where the Mother personally manifested her shimmer to guide the mountain heroes.",
        "deepInsights": "The shimmering Goddess represents the truth that the divine light is always present, even in the most remote corners of the world. Jhalmali Devi teaches that the spirit must be as bright and as constant as the mountain sun.",
        "ancientLore": "Lore tells that the bells of the Jhalmali temple can be heard in the celestial realms during the clear autumn nights. Another legend says that the deity personally materializes a lamp on the ridge during the heavy monsoons to guide the travelers.",
        "keyRituals": [
                {
                        "name": "Jhalmali Devi Arati",
                        "description": "The ritual of offering light at dawn to seek the spiritual awakening and the protection."
                },
                {
                        "name": "Ridge-Dhwaja Puja",
                        "description": "Tying the sacred flags at the temple summit to seek the blessing for the family and the journeys."
                },
                {
                        "name": "Shakti Ridge Japa",
                        "description": "Performing the repetitive chanting of the Devi mantras while facing the snow peaks at sunrise."
                },
                {
                        "name": "Pass-Guard Offering",
                        "description": "Offering simple forest flowers and grains to the Goddess to seek the safe passage through the mountains."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Ridge Shrine",
                        "description": "The sacred heart of the temple where the energy of the Goddess is most intense."
                },
                {
                        "name": "The Panoramic Viewpoint",
                        "description": "The spectacular vantage point offering views of the Pauri, Almora, and the Himalayan ranges."
                },
                {
                        "name": "The Ancient Stone Altar",
                        "description": "The foundation of the temple believed to be the specific spot where the deity first manifested."
                },
                {
                        "name": "The High-Altitude Forest Grove",
                        "description": "The beautiful and serene forest surrounding the temple peak, offering a peaceful space for meditation."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the views are most clear from October to March).",
                "howToReach": "Located on the Pauri-Thalisain road. Reached by road; regular taxis and buses run from Pauri and Kotdwar.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Kotdwar Railway Station."
        },
        "tips": [
                "Visit in the early morning to enjoy the sunrise over the snow peaks; the light on the ridge is exceptionally pure.",
                "The weather can be quite windy and cold at this altitude; carry a light jacket even in the summer months.",
                "Respect the local folk traditions and the silence of the temple premises; it is a site of deep meditation for many local practitioners."
        ],
        "faqs": [
                {
                        "question": "Who is Jhalmali Devi?",
                        "answer": "She is a manifestation of the Shakti, worshipped as the supreme guardian and the shimmering Goddess of the high ridges in Pauri Garhwal."
                },
                {
                        "question": "Is there a road to the temple?",
                        "answer": "Yes, the temple is located on a ridge that is accessible by the main road, followed by a very short walk within the complex."
                },
                {
                        "question": "When are the main festivals?",
                        "answer": "The Navratri months (March-April and October-November) are the most vibrant times at the temple."
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
    'Bhimashankar', 
    'bhimashankar', 
    'Jyotirlinga', 
    'mh', 
    'Hidden in the dense forests of the Sahyadri mountains near Pune, Bhimashankar is the site where Lord Shiva destroyed the demon Tripura. It is the source of the Bhima river and a center of immense primordial energy.', 
    '150.2', 
    '450.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Protector of the Sahyadri Ranges', 
    'Bhimashankar Jyotirlinga | Pune, Forest Legends & Ancient Lore', 
    'Discover the spiritual power of Bhimashankar. Explore the legend of the Tripura demon, the Bhima river source, and the ancient Nagara architecture.', 
    'Bhimashankar, Jyotirlinga, Maharashtra, Lord Shiva, Bhima River, Pune, Hindu Pilgrimage, Ancient Lore, Sahyadri', 
    '19', 
    '{
        "spiritualEssence": "Bhimashankar is the energy of the divine as the fierce protector. Located in the heart of a wildlife sanctuary, the vibration here is raw, untamed, and intensely grounding. It is the site where the sweat of the Lord, after his battle with the demon Tripura, created the Bhima river. The energy is one of absolute power and the restoration of order in the universe. A visit here is believed to remove the fear of enemies and grant the strength to face life''s challenges with unwavering courage. The atmosphere is saturated with the scents of the ancient forest and the sound of bells echoing through the mountain mist.",
        "longDescription": "The origin of Bhimashankar is linked to the destruction of the demon Tripurasura. Shiva took a massive form (Bhima) to defeat the demon and his three flying cities (Tripura). After the victory, the Lord agreed to stay here as a Jyotirlinga at the request of the Gods and sages. The temple is an architectural transition, featuring a blend of the Nagara and the Hemadpanti styles. The current structure was patronized by the Peshwa statesman Nana Phadnavis in the 18th century. The temple is situated in a deep valley, surrounded by 100-foot tall trees and rare wildlife, including the Malabar Giant Squirrel (Shekru). The entire region is considered sacred, with several smaller shrines and water bodies like the Gupta Bhimashankar and the Hanuman Lake adding to its spiritual geography.",
        "spiritualArchitecture": "The temple is built in the Nagara style, with a unique black stone structure that has weathered centuries of monsoon. The Shikhara is intricately carved with figures of various deities and celestial beings. The temple courtyard is spacious, featuring a massive bronze bell that was captured from the Portuguese by the Marathas. The inner sanctum is located at a lower level than the courtyard, a common feature in many ancient Shiva temples, representing the cave of the heart.",
        "vedicReferences": "Bhimashankar is mentioned in the Shiva Purana and is considered one of the five Jyotirlingas in Maharashtra. It is celebrated as the site of the Tripurantaka manifestation of Shiva.",
        "deepInsights": "Bhimashankar represents the solar plexus (Manipura) chakra of the national spiritual body. It is about the transformation of raw power into divine will. The forest setting signifies that the divine resides even in the most remote and untamed parts of our own consciousness.",
        "ancientLore": "Lore tells of the demon Bhima (son of Kumbhakarna) who tried to destroy the Jyotirlinga, but Shiva appeared from the stone and reduced him to ashes. Another legend says that the river Bhima was created from the sweat of Shiva''s brow, making it as sacred as the Ganges itself.",
        "keyRituals": [
                {
                        "name": "Maha Puja",
                        "description": "The elaborate morning worship involving the offerings of fruits, flowers, and Vedic chants."
                },
                {
                        "name": "Rudrabhishek",
                        "description": "The continuous bathing of the lingam with water from the Bhima river source."
                },
                {
                        "name": "Evening Aarti",
                        "description": "The ritual of lamps performed as the sun sets over the Sahyadri mountains."
                }
        ],
        "highlights": [
                {
                        "name": "Gupta Bhimashankar",
                        "description": "The hidden spot in the forest where the Bhima river is said to originate."
                },
                {
                        "name": "Bhimashankar Wildlife Sanctuary",
                        "description": "Home to the Malabar Giant Squirrel and diverse flora and fauna."
                },
                {
                        "name": "Hanuman Lake",
                        "description": "A serene lake located near the temple complex."
                }
        ],
        "travelInfo": {
                "bestTime": "August to February.",
                "howToReach": "110km from Pune, well connected by road. Regular buses and taxis are available.",
                "nearestAirport": "Pune International Airport.",
                "nearestRailway": "Pune Junction."
        },
        "tips": [
                "Be prepared for a walk as vehicles are parked at a distance from the main temple.",
                "Carry a raincoat if visiting during the monsoon as the Sahyadris receive heavy rainfall.",
                "Do not feed the monkeys near the temple area."
        ],
        "faqs": [
                {
                        "question": "How many steps are there to the temple?",
                        "answer": "The temple is located in a valley, so you need to climb down about 200-250 steps from the parking area."
                },
                {
                        "question": "Is there a direct bus from Mumbai?",
                        "answer": "Yes, several MSRTC (State transport) buses run directly from Mumbai to Bhimashankar."
                },
                {
                        "question": "Can I see the Giant Squirrel here?",
                        "answer": "Yes, they are active in the early morning and late afternoon in the surrounding forest."
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
    'Grishneshwar (Ellora)', 
    'grishneshwar', 
    'Jyotirlinga', 
    'mh', 
    'Located near the world-famous Ellora Caves, Grishneshwar is the 12th and final Jyotirlinga. It is the site of the Lord of Compassion, built by the legendary Queen Ahilyabai Holkar.', 
    '140.5', 
    '430.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Final Gateway of Divine Compassion', 
    'Grishneshwar Jyotirlinga | Ellora, Ahilyabai Holkar & Ancient Lore', 
    'Step into the sacred silence of Grishneshwar. Discover the legend of the devotee Grushma, its architectural beauty, and its connection to the Ellora caves.', 
    'Grishneshwar, Jyotirlinga, Maharashtra, Lord Shiva, Ellora, Aurangabad, Hindu Pilgrimage, Ancient Lore, Compassion', 
    '20', 
    '{
        "spiritualEssence": "Grishneshwar is the manifestation of the Lord as the embodiment of infinite compassion (Grushna). As the final Jyotirlinga, it represents the completion of the spiritual journey. The energy here is serene, intimate, and deeply restorative. The vibration is one of forgiveness and the mending of broken hearts. It is believed that a visit here brings an end to the cycle of suffering and grants the devotee the peace that surpasses all understanding. The temple stands as a testament to the power of a single devotee''s faith, which brought the Lord from his cosmic abode to this earthly site.",
        "longDescription": "The legend of Grishneshwar tells of a devout woman named Grushma. She was a great devotee of Shiva and would immerse a lingam in a nearby lake daily as part of her worship. Her son was killed out of jealousy by her co-wife, but Grushma continued her worship with unwavering faith. When she immersed the lingam that day, her son emerged from the water alive. Shiva appeared and agreed to reside here as Grishneshwar (the Lord of Grushma). The current temple is a masterpiece of the 18th century, rebuilt by Queen Ahilyabai Holkar of Indore. It is made of red stone and is one of the few Jyotirlingas where the structure remains largely in its original, meticulously preserved state. Located just a kilometer from the UNESCO World Heritage site of Ellora, the temple is part of a landscape where art and spirituality have coexisted for millennia.",
        "spiritualArchitecture": "The temple is built in the North Indian Nagara style using red basalt stone. The five-tier spire (Shikhara) is intricately carved with figures of various deities, musicians, and celestial animals. The temple walls feature beautiful relief carvings of the various forms of Shiva. The inner sanctum is a small, quiet space that houses the Jyotirlinga, which is situated at the floor level. The temple courtyard is paved with stone and surrounded by high walls, creating a sense of sanctuary.",
        "vedicReferences": "Grishneshwar is mentioned in the Shiva Purana and is traditionally counted as the last of the twelve Jyotirlingas.",
        "deepInsights": "Grishneshwar represents the final dissolution of the ego into the ocean of divine love. It teaches that through devotion and the regular practice of worship (symbolized by Grushma''s daily immersion), the most impossible obstacles can be overcome.",
        "ancientLore": "Lore tells that the lake in which Grushma immersed the lingam is still charged with healing properties. Another legend says that the Ellora caves were carved by celestial beings who came down to pay homage to Grishneshwar during the night.",
        "keyRituals": [
                {
                        "name": "Jalabhishek",
                        "description": "The ritual bathing of the lingam with sacred water and milk."
                },
                {
                        "name": "Panchamrut Puja",
                        "description": "Worship using five sacred substances, symbolizing the purification of the five elements."
                },
                {
                        "name": "Evening Aarti",
                        "description": "A peaceful ritual of lamps that marks the end of the day''s worship."
                }
        ],
        "highlights": [
                {
                        "name": "Ellora Caves",
                        "description": "The world-famous rock-cut cave complex located just 1km away."
                },
                {
                        "name": "Daulatabad Fort",
                        "description": "A massive medieval hill fort situated nearby."
                },
                {
                        "name": "Ghrishneshwar Lake",
                        "description": "The sacred lake associated with the legend of Grushma."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "30km from Aurangabad (Sambhajinagar), well connected by road and rail.",
                "nearestAirport": "Aurangabad Airport.",
                "nearestRailway": "Aurangabad Railway Station."
        },
        "tips": [
                "Combine your visit with a tour of the Ellora and Ajanta caves.",
                "Male devotees must enter the inner sanctum bare-chested as per local tradition.",
                "Hire a guide to explain the intricate carvings on the temple exterior."
        ],
        "faqs": [
                {
                        "question": "Is there a dress code?",
                        "answer": "Yes, for entering the inner sanctum, men must be bare-chested and wear a dhoti or simple trousers. Women should wear traditional attire."
                },
                {
                        "question": "How far is it from Aurangabad?",
                        "answer": "It is approximately 30 kilometers and takes about 45 minutes to an hour by road."
                },
                {
                        "question": "What is the best time for Darshan?",
                        "answer": "Early morning (5 AM to 7 AM) is the best time for a peaceful experience."
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