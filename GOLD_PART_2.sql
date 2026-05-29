-- GOLD STANDARD PART 2 for Spritual_locations
INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Old Goa (Basilica of Bom Jesus)', 
    'old-goa-bom-jesus', 
    'Sacred Destination', 
    'ga', 
    'A UNESCO World Heritage site, the Basilica of Bom Jesus is the spiritual heart of the Christian West in India. It houses the sacred remains of St. Francis Xavier and is a masterpiece of Baroque architecture, representing the global reach of the spiritual mission.', 
    '280.2', 
    '700.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Saint of the East and the Baroque Splendor of the West', 
    'Old Goa Basilica of Bom Jesus | Goa, St. Francis Xavier & Ancient Lore', 
    'Discover the spiritual majesty of Old Goa. Explore the Basilica of Bom Jesus, the sacred relics of St. Francis Xavier, and the profound energy of the Baroque pilgrimage.', 
    'Old Goa, Goa, Basilica of Bom Jesus, St. Francis Xavier, Christian Pilgrimage, Ancient Lore, Baroque Architecture', 
    '139', 
    '{
        "spiritualEssence": "The Basilica of Bom Jesus is the manifestation of the divine as the supreme mission and the absolute endurance of the saintly spirit. The energy here is regal, heavy, and intensely reverent. It is the site where the remains of a global missionary continue to draw people of all faiths. The vibration is one of ''Pavitrata'' (Holiness) and the absolute dedication to a higher cause. As a massive stone monument in the tropical landscape of Goa, it represents the bridge between the European and Indian spiritual worlds. A visit here is believed to grant the devotee the sense of the global family of faith and the power of selfless dedication. The air is always vibrant with the scent of the old stone and the silent, echoing power of the high vaulted ceilings.",
        "longDescription": "The Basilica of Bom Jesus, completed in 1605, is one of the finest examples of Baroque architecture in the world. Its name ''Bom Jesus'' means ''Good Jesus'' or ''Infant Jesus''. The basilica is world-famous for housing the incorrupt body of St. Francis Xavier, the patron saint of the East. The body is kept in a silver casket inside a magnificent three-tiered marble and jasper tomb gifted by the Duke of Tuscany. Every ten years, the body is brought down for public viewing during the ''Exposition,'' attracting millions of pilgrims from across the globe. Old Goa was once the capital of the Portuguese empire in the East, and this basilica remains the absolute pinnacle of its spiritual and architectural legacy, a site where the history of the world and the history of faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of the Basilica is a spectacular example of the Jesuit Baroque style. The exterior is unique because it is unplastered, showing the raw red laterite stone, which is rare for churches of that period. The facade is a masterpiece of proportions, featuring Corinthian, Doric, and lonic orders. The interior is characterized by its grand scale and its incredible gilded altars. The main altar is dedicated to St. Ignatius of Loyola and features a massive gold-plated statue. A unique feature is the use of the local laterite stone combined with fine marble from Italy. The architecture is designed to create a sense of the infinite and the majestic, where the high ceilings and the play of light through the large windows lead the soul towards the celestial.",
        "vedicReferences": "Old Goa is celebrated in the Goan spiritual history as the ''Rome of the East'' and is considered a primary site for the study of the Christian influence in India.",
        "deepInsights": "The incorrupt body represents the triumph of the spirit over the decay of time. The Basilica teaches that the message of love and service is a universal language that transcends all borders.",
        "ancientLore": "Lore tells that when the saint''s body was first examined months after his death, it was found to be fresh and bleeding as if he were still alive. Another legend says that the site of the basilica was personally chosen by the saint in a vision before his arrival in Goa.",
        "keyRituals": [
                {
                        "name": "Feast of St. Francis Xavier",
                        "description": "The grand annual celebration on December 3rd, featuring massive masses and a fair that draws thousands."
                },
                {
                        "name": "The Exposition",
                        "description": "The once-in-a-decade public viewing of the sacred relics of the saint."
                },
                {
                        "name": "Novena Prayers",
                        "description": "The 9-day ritual of prayers and chanting leading up to the feast day."
                },
                {
                        "name": "Daily Mass in Konkani",
                        "description": "The ritual of the holy sacrifice of the mass performed in the local language, reflecting the integration of faith and culture."
                }
        ],
        "highlights": [
                {
                        "name": "The Sacred Relics",
                        "description": "The silver casket containing the incorrupt body of St. Francis Xavier."
                },
                {
                        "name": "The Jasper Tomb",
                        "description": "The magnificent three-tiered marble and jasper monument gifted by the Medici family."
                },
                {
                        "name": "The Gilded Main Altar",
                        "description": "The massive gold-plated altar dedicated to the founder of the Jesuits."
                },
                {
                        "name": "The Laterite Facade",
                        "description": "The iconic red stone exterior that has become a symbol of Old Goa."
                }
        ],
        "travelInfo": {
                "bestTime": "October to February (especially during the December feast).",
                "howToReach": "10km from Panjim, well connected by road and ferry. Regular buses and taxis run from Panjim and Madgaon.",
                "nearestAirport": "Dabolim Airport / Manohar International Airport (Mopa).",
                "nearestRailway": "Karmali Railway Station (2km away)."
        },
        "tips": [
                "Maintain the silence and the decorum of the church, especially during the mass services.",
                "The basilica is right across from the Se Cathedral; plan enough time to visit both as they form a single spiritual complex.",
                "Visit the art gallery within the basilica complex to see rare 16th-century paintings."
        ],
        "faqs": [
                {
                        "question": "Who was St. Francis Xavier?",
                        "answer": "He was a 16th-century Spanish missionary and the co-founder of the Jesuit order, known as the ''Apostle of the East''."
                },
                {
                        "question": "Is the body still visible?",
                        "answer": "The body is kept in a silver casket and is only brought down for public viewing every ten years during the Exposition."
                },
                {
                        "question": "What is the meaning of ''Bom Jesus''?",
                        "answer": "It is a Portuguese term meaning ''Good Jesus'', referring to the Infant Jesus."
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
    'Mangueshi Temple', 
    'mangueshi-temple', 
    'Sacred Destination', 
    'ga', 
    'The most important Hindu temple in Goa, Mangueshi is dedicated to a form of Lord Shiva. It is a site where the unique Goan Hindu architecture reached its peak, featuring the magnificent seven-story Deepstambha (lamp tower) that represents the ascent of the soul into light.', 
    '285.5', 
    '705.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lord of the Deepstambha and the Goan Stone Heritage', 
    'Mangueshi Temple Goa | Ponda, Lord Shiva & Ancient Lore', 
    'Experience the unique beauty of Mangueshi. Discover the 7-story lamp tower, the legend of the tiger-Shiva, and the profound energy of the Goan Hindu pilgrimage.', 
    'Mangueshi Temple, Goa, Lord Shiva, Ponda, Hindu Pilgrimage, Ancient Lore, Deepstambha, Goan Architecture', 
    '140', 
    '{
        "spiritualEssence": "Mangueshi is the manifestation of the divine as the supreme light and the absolute harmony of the local and the universal. The energy here is bright, elegant, and intensely festive. It is the site where the ancient Shaiva tradition found a unique and resilient form in the hills of Ponda. The vibration is one of ''Deepa-Jyoti'' (The Light of the Lamp) and the absolute joy of the community. As a temple featuring a massive white lamp tower against the tropical green, it represents the victory of the spirit. A visit here is believed to grant the devotee the clarity of the mind and the warmth of the heart. The air is always vibrant with the scent of the mogra flowers and the constant, rhythmic sound of the temple bells.",
        "longDescription": "The Mangueshi temple is located in the Priol village of Ponda. The deity, Lord Manguesh (a form of Shiva), was originally located in Salcete but was moved to this site in the 16th century to protect it from the Portuguese. The temple is unique for its architectural style, which blends Goan, Maratha, and later European influences. The defining feature is the 7-story high Deepstambha (lamp tower), which is illuminated with hundreds of oil lamps during festivals. Mangueshi is the family deity of many prominent Indian families, including the Mangeshkar family. The temple is famous for its ''Palakhi'' (palanquin) procession every Monday, where the Lord is taken around the courtyard in a spectacular silver palanquin, a site that captures the vibrant heart of Goan Hindu culture.",
        "spiritualArchitecture": "The architecture of Mangueshi is a spectacular display of the Goan Hindu style. It features a large water tank (Talay) at the entrance and a grand courtyard. The main temple has a domed structure with a mix of arches and traditional pillars. The highlight is the Deepstambha, a massive octagonal tower with seven levels of lamp brackets. The interiors feature massive crystal chandeliers and a silver-plated sanctum. A unique feature is the use of the ''Kaavi'' art (red-and-white mural art) in some of the surrounding structures. The architecture is designed to be airy and festive, reflecting the tropical and inclusive nature of Goan spirituality, where the temple is the center of both social and spiritual life.",
        "vedicReferences": "Manguesh is celebrated in the Sahyadri Khanda of the Skanda Purana as the form of Shiva who personally came to Goa to bless the sages.",
        "deepInsights": "The seven-story lamp tower represents the seven chakras and the ascent of the inner light. Mangueshi teaches that the divine is found in the brightness of the community and the warmth of the tradition.",
        "ancientLore": "Lore tells that Shiva once took the form of a tiger to frighten his consort Parvati; when she saw him, she cried out ''Trahi Mam Girisha'' (Protect me, Lord of the Mountains). The name Manguesh is believed to be derived from a modified form of this cry. Another legend says that the deity personally guided the devotees through the forest to reach this secret refuge.",
        "keyRituals": [
                {
                        "name": "Monday Palakhi",
                        "description": "The grand weekly procession of the Lord in a silver palanquin through the temple courtyard."
                },
                {
                        "name": "Deepstambha Deepotsav",
                        "description": "The ritual lighting of all seven levels of the lamp tower during major festivals, creating a pillar of fire."
                },
                {
                        "name": "Abhishekam",
                        "description": "The ritual bathing of the Lingam with five sacred substances while chanting the Chamakam."
                },
                {
                        "name": "Jatra Festival",
                        "description": "The grand annual fair and festival held in January, featuring massive chariot processions."
                }
        ],
        "highlights": [
                {
                        "name": "7-Story Deepstambha",
                        "description": "The iconic white octagonal lamp tower that is the symbol of the temple."
                },
                {
                        "name": "The Silver Palanquin",
                        "description": "The magnificent carriage used for the weekly and festive processions."
                },
                {
                        "name": "The Sacred Talay",
                        "description": "The massive ancient water tank at the entrance of the temple complex."
                },
                {
                        "name": "Crystal Chandeliers",
                        "description": "The unique interior decoration that reflects the Goan-European aesthetic fusion."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during the Jatra in January).",
                "howToReach": "20km from Panjim and 15km from Madgaon. Well connected by road; regular buses and taxis run from all major Goan cities.",
                "nearestAirport": "Dabolim Airport / मनोहर International Airport (Mopa).",
                "nearestRailway": "Madgaon Junction / Karmali Railway Station."
        },
        "tips": [
                "Dress modestly and follow the traditional dress code (avoid shorts and sleeveless clothes inside the temple).",
                "Visit on a Monday evening to witness the spectacular Palakhi procession; it is the most vibrant time for darshan.",
                "The temple is part of a cluster in Ponda; you can also visit the nearby Nageshi and Mahalsa temples in a single trip."
        ],
        "faqs": [
                {
                        "question": "Who is Lord Manguesh?",
                        "answer": "He is an incarnation of Lord Shiva, particularly worshipped in Goa and parts of coastal Karnataka."
                },
                {
                        "question": "What is the Deepstambha?",
                        "answer": "It is a 7-story lamp tower unique to Goan and Maratha temples, used to illuminate the complex during festivals."
                },
                {
                        "question": "Why is the temple in Ponda?",
                        "answer": "The deity was moved from Salcete to the hills of Ponda in the 16th century to protect it during the Portuguese era."
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
    'Lalbaugcha Raja', 
    'lalbaugcha-raja', 
    'Sacred Destination', 
    'mh', 
    'The most famous Ganesha idol in India, Lalbaugcha Raja is the supreme cultural and spiritual icon of Mumbai. While a temporary idol during the Ganesh festival, it attracts millions who wait for over 24 hours in queue, representing the absolute peak of collective faith and the fulfillment of vows.', 
    '315.2', 
    '645.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The King of Lalbaug and the Ocean of Collective Faith', 
    'Lalbaugcha Raja Mumbai | Maharashtra, Ganesha & Ancient Lore', 
    'Experience the unparalleled energy of Lalbaugcha Raja. Discover the King of Ganeshas, the legend of the Navas, and the profound energy of the world''s largest street festival.', 
    'Lalbaugcha Raja, Mumbai, Lord Ganesha, Maharashtra, Hindu Pilgrimage, Ancient Lore, Navas, Ganesh Chaturthi', 
    '141', 
    '{
        "spiritualEssence": "Lalbaugcha Raja is the manifestation of the divine as the supreme king and the absolute hope of the common man. The energy here is massive, protective, and intensely communal. It is the site where the individual identity is completely lost in the ocean of the collective faith. The vibration is one of ''Sankalpa'' (Vow) and the absolute belief in the miraculous. As a temporary manifestation that draws millions, it represents the transient and the eternal nature of the divine. A visit here is believed to grant the devotee the fulfillment of their most impossible desires and the strength of the community. The air is always vibrant with the scent of the incense and the constant, deafening roar of ''Ganpati Bappa Morya''.",
        "longDescription": "The Lalbaugcha Raja Sarvajanik Ganeshotsav Mandal was founded in 1934 in the Lalbaug market of Mumbai. The idol is famous for being a ''Navasacha Ganpati'' (the one who fulfills all vows). Every year, the idol is designed in a specific regal pose, often seated on a throne, standing about 12 to 14 feet tall. The devotion is so intense that there are two separate queues: the ''Mukh Darshan'' for a quick glimpse, and the ''Navas Line'' for those who wish to touch the feet of the Lord, where the waiting time can exceed 24 to 48 hours. The immersion procession (Visarjan) on the 10th day is one of the largest peaceful gatherings in the world, taking nearly 24 hours to reach the sea, a spectacular display of Mumbai''s spirit and the power of Ganesha.",
        "spiritualArchitecture": "The ''architecture'' of Lalbaugcha Raja is a massive temporary palace (Pandal) built every year with a different theme, ranging from ancient Indian temples to celestial palaces. The Pandal is designed to handle millions of people with sophisticated barricading and ventilation systems. The idol itself is a masterpiece of clay and plaster art, designed by the Kambli family for generations. A unique feature is the use of high-tech lighting and grand backdrops that create a sense of a royal court. The architecture is temporary but its spiritual impact is permanent, reflecting the ancient tradition of the Lord coming to the streets to be among his people. The use of vibrant colors, gold-plated thrones, and massive chandeliers create a sense of overwhelming spiritual majesty.",
        "vedicReferences": "Lalbaugcha Raja is celebrated in the modern spiritual culture of Maharashtra as the supreme manifest form of the Ganapatya tradition.",
        "deepInsights": "The massive queue represents the spiritual quality of patience and the intensity of desire. Lalbaugcha Raja teaches that the divine is accessible to everyone, regardless of their social or economic standing.",
        "ancientLore": "Lore tells that the Ganesha Mandal was formed as a vow by the local fishermen and merchants after the marketplace was saved from closure during the British era. Another legend says that the Lord personally arrives in the Pandal on the first day to listen to the millions of prayers that will follow.",
        "keyRituals": [
                {
                        "name": "Maha Arati",
                        "description": "The grand worship performed on the first and the final days, witnessed by millions through live broadcasts."
                },
                {
                        "name": "Navas offerings",
                        "description": "The ritual of offering miniature gold or silver limbs, houses, or cradles to the Lord as a sign of a fulfilled vow."
                },
                {
                        "name": "Visarjan Miravnuk",
                        "description": "The epic 24-hour immersion procession where the King is taken through the heart of Mumbai to the Arabian Sea."
                },
                {
                        "name": "Foot-touching (Navas Line)",
                        "description": "The ultimate ritual of surrender where the devotee touches the feet of the massive idol after days of waiting."
                }
        ],
        "highlights": [
                {
                        "name": "The Regal Throne",
                        "description": "The massive and often gold-plated throne on which the King of Ganeshas sits."
                },
                {
                        "name": "The Navas Queue",
                        "description": "The world-famous line of faith that stretches for miles outside the Pandal."
                },
                {
                        "name": "The Gilded Mouse",
                        "description": "The large golden idol of the Lord''s vehicle placed near the entrance."
                },
                {
                        "name": "The Immersion Ceremony",
                        "description": "The final spectacular farewell at Girgaon Chowpatty in the Arabian Sea."
                }
        ],
        "travelInfo": {
                "bestTime": "During the 10 days of Ganesh Chaturthi (usually in August or September).",
                "howToReach": "Located in Lalbaug, Mumbai. Accessible by local train (Currey Road or Chinchpokli station).",
                "nearestAirport": "Chhatrapati Shivaji Maharaj International Airport, Mumbai.",
                "nearestRailway": "Currey Road / Chinchpokli / Byculla."
        },
        "tips": [
                "If you are not in the Navas Line, take the Mukh Darshan queue which is much faster but still requires several hours.",
                "Carry water and simple snacks, and be prepared for massive crowds and high humidity.",
                "Follow the instructions of the volunteers (Karyakartas) who manage the world''s most complex spiritual crowd."
        ],
        "faqs": [
                {
                        "question": "How long is the queue?",
                        "answer": "The Navas queue can range from 24 to 60 hours during the peak days of the festival."
                },
                {
                        "question": "Why is it so famous?",
                        "answer": "Due to its reputation as a ''Navasacha Ganpati''—a Lord who fulfills every sincere vow."
                },
                {
                        "question": "Is it a permanent temple?",
                        "answer": "No, it is a temporary Pandal during the Ganesh festival, though the Mandal operates year-round for social service."
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
    'Kateel Durgaparameshwari', 
    'kateel-durgaparameshwari', 
    'Sacred Destination', 
    'ka', 
    'Situated on a beautiful island in the middle of the Nandini River in Karnataka, Kateel is one of the most powerful Shakti Peeths of the South. It is a site where the Goddess manifested as a bee to defeat a demon, representing the protection of nature and the power of the divine feminine.', 
    '295.2', 
    '730.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Island Goddess and the Flow of the Nandini', 
    'Kateel Durgaparameshwari | Karnataka, Mangalore & Ancient Lore', 
    'Discover the spiritual power of Kateel. Explore the river-island temple, the legend of the divine bee, and the profound energy of the Shakti pilgrimage.', 
    'Kateel, Karnataka, Goddess Durga, Nandini River, Shakti Peeth, Hindu Pilgrimage, Ancient Lore, Mangalore', 
    '142', 
    '{
        "spiritualEssence": "Kateel is the manifestation of the divine as the supreme protection and the absolute beauty of the life-giving waters. The energy here is cool, rhythmic, and intensely maternal. It is the site where the mother Goddess stands as an island of peace amidst the flow of life. The vibration is one of ''Poushtika'' (Nourishment) and the absolute victory of grace over ego. As a temple surrounded by the river, it represents the soul that is anchored in the divine. A visit here is believed to grant the devotee the removal of all fears and the blessing of abundance. The air is always vibrant with the scent of the river silt and the constant, musical roar of the waterfalls around the temple.",
        "longDescription": "Kateel is located 26km from Mangalore and is mentioned in the Skanda Purana. The name ''Kateel'' is derived from ''Kati'' (Waist) and ''Ila'' (Earth), signifying the center of the earth. The temple is situated on an islet in the Nandini River. According to legend, the river was cursed to dry up until the Goddess manifested here to bless the land and defeat the demon Arunasura by taking the form of a massive rock-bee (Bhramari). The temple is famous for its Yakshagana troupe, which performs the stories of the Goddess throughout the year. Kateel is a site where the lush landscape of the Tulu Nadu and the intense devotion of the Shakti tradition are perfectly unified in a landscape of water and stone.",
        "spiritualArchitecture": "The temple architecture is a beautiful example of the coastal Karnataka style, featuring a sloping roof and a sturdy stone construction. The main sanctum is a small, intense space where the Goddess is worshipped in her self-manifested stone form. A unique feature is the bridge that connects the mainland to the island temple. The temple is designed to withstand the massive floods of the Nandini river, with the base of the structure built on solid rock. The complex includes several beautiful mandapams for the performance of Yakshagana and other rituals. The use of dark granite and the presence of ancient inscriptions reflect the long historical patronage of the Alupa and Vijayanagara rulers.",
        "vedicReferences": "Kateel is celebrated in the Sahyadri Khanda of the Skanda Purana as the supreme site for the worship of the Goddess on the banks of the Nandini.",
        "deepInsights": "The temple being in the middle of the river represents the truth that the divine is the source of all life and its sustenance. Kateel teaches that even the smallest being (the bee) can become a vessel of the supreme power when used for Dharma.",
        "ancientLore": "Lore tells that the river Nandini was originally a celestial cow who came to earth to end a drought. Another legend says that the waterfalls around the temple never dry up, even in the harshest summers, as they are the eternal tears of joy of the river Goddess.",
        "keyRituals": [
                {
                        "name": "Bhramari Seva",
                        "description": "The unique ritual of worshipping the Goddess in her bee form, believed to grant protection from all hidden enemies."
                },
                {
                        "name": "Yakshagana Seva",
                        "description": "The traditional dance-drama performed throughout the night in the temple courtyard as an offering to the Goddess."
                },
                {
                        "name": "Nandini Arati",
                        "description": "The evening worship of the sacred river from the temple island."
                },
                {
                        "name": "Maha Puja",
                        "description": "The grand ritual bathing and decoration of the Goddess with thousands of flowers and jewels every afternoon."
                }
        ],
        "highlights": [
                {
                        "name": "The Island Sanctum",
                        "description": "The main shrine of Durgaparameshwari situated on the rocky islet."
                },
                {
                        "name": "The Nandini Waterfall",
                        "description": "The beautiful natural cascade that surrounds the temple complex."
                },
                {
                        "name": "Yakshagana Stage",
                        "description": "The dedicated area where the ancient traditional arts are performed daily."
                },
                {
                        "name": "Adi Kateel",
                        "description": "The ancient site on the river bank where the Goddess first manifested."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Navratri).",
                "howToReach": "26km from Mangalore city center. Well connected by road; regular buses and taxis run from Mangalore.",
                "nearestAirport": "Mangalore International Airport.",
                "nearestRailway": "Mangalore Junction / Surathkal Railway Station."
        },
        "tips": [
                "Visit in the late evening to catch the Yakshagana performance; it is a world-class cultural and spiritual experience.",
                "Maintain the sanctity of the river; do not throw anything into the Nandini from the bridge.",
                "Take the free Mahaprasad (lunch) provided by the temple; it is considered a blessing of the Mother herself."
        ],
        "faqs": [
                {
                        "question": "What does ''Kateel'' mean?",
                        "answer": "It means the ''Waist of the Earth'' (Kati-Ila)."
                },
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the most revered Shakti sites in coastal Karnataka."
                },
                {
                        "question": "How to reach from Mangalore?",
                        "answer": "It is about a 45-minute drive from Mangalore city center by taxi or bus."
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
    'Swamimalai', 
    'swamimalai', 
    'Sacred Destination', 
    'tn', 
    'The fourth of the six abodes (Arupadai Veedu) of Lord Murugan, Swamimalai is where the Lord became the teacher of his father, Lord Shiva. It is a site of immense wisdom and spiritual authority, representing the place where the son revealed the secret of the Pranava Mantra (OM) to the Father.', 
    '330.5', 
    '790.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Teacher of the Gods and the Secret of the OM', 
    'Swamimalai Murugan | Tamil Nadu, Arupadai Veedu & Ancient Lore', 
    'Experience the profound wisdom of Swamimalai. Discover the hilltop Murugan temple, the legend of the Pranava Mantra, and the profound energy of the fourth abode.', 
    'Swamimalai, Tamil Nadu, Murugan, Kartikeya, Arupadai Veedu, Hindu Pilgrimage, Ancient Lore, Wisdom, OM', 
    '143', 
    '{
        "spiritualEssence": "Swamimalai is the manifestation of the divine as the supreme teacher (Guru) and the absolute wisdom that transcends even the greatest of the gods. The energy here is intellectual, paternal, and intensely illuminating. It is the site where the hierarchy of knowledge was reversed for the sake of the ultimate truth. The vibration is one of ''Upadesha'' (Instruction) and the absolute clarity of the sacred syllable OM. As a temple on a hill with 60 steps representing the years, it represents the ascent of the soul towards wisdom. A visit here is believed to grant the devotee the clarity of the intellect and the realization of the internal master. The air is always vibrant with the scent of the vibhuti and the constant, rhythmic chanting of the Pranava Mantra.",
        "longDescription": "Swamimalai is located near Kumbakonam and is the fourth of the six abodes of Lord Murugan. The temple is unique because the Lord is worshipped as Swaminatha Swami (the Lord of the Teacher). According to legend, when Brahma could not explain the meaning of OM, Murugan imprisoned him. Shiva intervened, and Murugan agreed to release Brahma only if Shiva himself could explain it. When Shiva pleaded ignorance, Murugan taught him the secret, but only after Shiva took the position of a student. The temple is built on an artificial hillock, and the climb involves 60 steps, each named after one of the 60 years in the Hindu calendar cycle. Swamimalai is also the world center for the traditional lost-wax method of bronze casting, where the master-sculptors (Sthapatis) have been creating divine idols for over a thousand years.",
        "spiritualArchitecture": "The architecture of Swamimalai is a magnificent example of the Chola style, characterized by its massive granite construction and tiered gopurams. The main sanctum is situated at the top of the 60-step hillock. A unique feature is the presence of the shrine of Lord Shiva (Sundareswarar) at the base of the hill, representing his position as the student. The temple features three grand gopurams and several extensive pillared halls with intricate carvings of the Lord''s pastimes. The use of dark granite and the precision of the stone work create an atmosphere of immense spiritual authority. The architecture is designed to emphasize the height and the status of the Lord as the Supreme Teacher of the Universe.",
        "vedicReferences": "Swamimalai is celebrated in the Skanda Purana and the works of the poet-saint Arunagirinathar as the supreme site of divine instruction.",
        "deepInsights": "The son teaching the father represents the truth that wisdom is not a matter of age but of the direct realization of the spirit. Swamimalai teaches that the ultimate truth (OM) is the foundation of all existences.",
        "ancientLore": "Lore tells that the hill was personally brought from the Himalayas by the eagle-god Garuda to serve as a pedestal for the Lord. Another legend says that the 60 steps were personally blessed by the Goddess of Time to ensure that every year of a devotee''s life is sanctified by the climb.",
        "keyRituals": [
                {
                        "name": "Pranava Upadesha Puja",
                        "description": "The special ritual commemorating the teaching of the OM to Lord Shiva, performed in the main sanctum."
                },
                {
                        "name": "Step Puja",
                        "description": "Worshipping each of the 60 steps during the annual New Year festival for a blessed life cycle."
                },
                {
                        "name": "Abhishekam to Swaminatha",
                        "description": "The ritual bathing of the Lord with honey and milk, which is considered highly auspicious for intellectual growth."
                },
                {
                        "name": "Vaikasi Visakam",
                        "description": "The grand annual festival celebrating the birth of Murugan, with massive processions and chariot festivals."
                }
        ],
        "highlights": [
                {
                        "name": "The 60 Sacred Steps",
                        "description": "The unique staircase where each step represents a year in the Hindu calendar."
                },
                {
                        "name": "The Swaminatha Sanctum",
                        "description": "The hilltop shrine of the Teacher of the Gods."
                },
                {
                        "name": "Bronze Casting Center",
                        "description": "The surrounding village where the thousand-year-old art of divine sculpture is still practiced."
                },
                {
                        "name": "Netra Deepam",
                        "description": "The eternal lamp in the sanctum that is believed to represent the third eye of wisdom."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "5km from Kumbakonam. Well connected by road; regular buses and taxis run from Kumbakonam and Thanjavur.",
                "nearestAirport": "Tiruchirappalli International Airport.",
                "nearestRailway": "Swamimalai / Kumbakonam Railway Station."
        },
        "tips": [
                "Visit the bronze casting workshops in the village to see the incredible skill of the traditional Sthapatis.",
                "Take your time climbing the 60 steps; each one is a prayer for a different year of your life.",
                "The temple can be very crowded on Tuesdays and Thursdays; plan your visit accordingly."
        ],
        "faqs": [
                {
                        "question": "Who did Murugan teach here?",
                        "answer": "He taught the secret meaning of the Pranava Mantra (OM) to his father, Lord Shiva."
                },
                {
                        "question": "What is the significance of the 60 steps?",
                        "answer": "Each step is named after one of the sixty years of the Hindu calendar (Prabhava, Vibhava, etc.)."
                },
                {
                        "question": "Is it a hill temple?",
                        "answer": "Yes, it is built on an artificial hillock known as ''Kattu Malai''."
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
    'Tiruttani', 
    'tiruttani', 
    'Sacred Destination', 
    'tn', 
    'The fifth of the six abodes (Arupadai Veedu) of Lord Murugan, Tiruttani is the site where the Lord''s anger cooled after his victory over the demon Surapadma. It is a site of immense peace and marital bliss, where the Lord is worshipped with his two consorts, Valli and Deivayanai.', 
    '340.2', 
    '810.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hill of Tranquility and the Peace of the Warrior', 
    'Tiruttani Murugan | Tamil Nadu, Arupadai Veedu & Ancient Lore', 
    'Discover the spiritual serenity of Tiruttani. Explore the hilltop Murugan temple, the 365 sacred steps, and the profound energy of the fifth abode.', 
    'Tiruttani, Tamil Nadu, Murugan, Kartikeya, Arupadai Veedu, Hindu Pilgrimage, Ancient Lore, Peace', 
    '144', 
    '{
        "spiritualEssence": "Tiruttani is the manifestation of the divine as the supreme tranquility and the absolute cooling of the fires of war and ego. The energy here is calm, marital, and intensely peaceful. It is the site where the warrior Lord laid down his spear to find the rest of the soul. The vibration is one of ''Shanti'' (Peace) and the absolute harmony of the domestic and the spiritual. As a temple on a hill with 365 steps representing the days of the year, it represents the sanctification of the daily life. A visit here is believed to grant the devotee the removal of all anger and the blessing of a peaceful family life. The air is always vibrant with the scent of the sandalwood and the constant, melodic chanting of the Thirukkazhukundram verses.",
        "longDescription": "Tiruttani is located in the Thiruvallur district and is the fifth of the six abodes of Lord Murugan. The hill is known as Thanikai Malai (The Hill of Peace). According to legend, after defeating the demon, Murugan came to this hill to find solitude and peace. It is here that he met and married his second consort, Valli, the daughter of a local tribal chief. The temple is unique because the 365 steps leading to the hilltop shrine represent the 365 days of the year, signifying that every day is a step towards the divine. Tiruttani is a major center for the Adi Krithigai festival, where hundreds of thousands of pilgrims carry the ''Kavadi'' (spiritual burden) up the hill to seek the Lord''s grace.",
        "spiritualArchitecture": "The temple architecture is a grand example of the Pallava and Chola fusion style, characterized by its sturdy stone construction and tiered gopurams. The main sanctum is situated at the peak of the hill and features a beautiful idol of Murugan with his two consorts. A unique feature is the absence of the rooster flag in some parts of the temple, reflecting the Lord''s peaceful state. The temple features several extensive mandapams with detailed relief carvings of the Valli Kalyanam (the marriage with Valli). The use of light grey granite and the precision of the stone work create an atmosphere of rugged but refined spiritual power. The architecture is designed to emphasize the transition from the base of the hill to the peaceful heights of the summit.",
        "vedicReferences": "Tiruttani is celebrated in the Tiruppugazh and is considered the supreme site for the cooling of the mind in the Tamil spiritual tradition.",
        "deepInsights": "The cooling of the anger represents the stage of the spiritual journey where the internal conflicts are resolved. Tiruttani teaches that the ultimate goal of all struggle is the attainment of eternal peace.",
        "ancientLore": "Lore tells that the Lord Indra personally gifted his white elephant, Airavata, to Murugan here as a wedding gift. Another legend says that the hill is a fragment of the mountain Meru that fell to earth to provide a resting place for the Lord.",
        "keyRituals": [
                {
                        "name": "Adi Krithigai",
                        "description": "The grand annual festival where thousands of devotees perform the Kavadi dance and climb the 365 steps."
                },
                {
                        "name": "English New Year Step Puja",
                        "description": "The unique ritual of worshipping each of the 365 steps on January 1st to sanctify the upcoming year."
                },
                {
                        "name": "Valli Kalyanam Utsav",
                        "description": "The ritual reenactment of the Lord''s marriage with the tribal princess Valli."
                },
                {
                        "name": "Sandalwood Paste Offering",
                        "description": "The ritual application of cooling sandalwood paste to the deity to commemorate the cooling of his anger."
                }
        ],
        "highlights": [
                {
                        "name": "The 365 Sacred Steps",
                        "description": "The staircase where each step represents a day of the year."
                },
                {
                        "name": "Thanikai Malai Peak",
                        "description": "The hilltop sanctum of the peaceful Warrior Lord."
                },
                {
                        "name": "Saravana Poigai",
                        "description": "The sacred tank at the base of the hill for ritual purification."
                },
                {
                        "name": "The Elephant Vehicle",
                        "description": "The unique white elephant idol gifted by Indra, which replaces the peacock in some temple rituals."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road and rail; Tiruttani has its own railway station on the Chennai-Renigunta line. Regular buses run from Chennai (85km).",
                "nearestAirport": "Chennai International Airport.",
                "nearestRailway": "Tiruttani Railway Station."
        },
        "tips": [
                "Climb the steps slowly and treat each one as a prayer for a specific day of your life.",
                "The temple is very close to Chennai and can be easily visited as a day trip by train or car.",
                "Participate in the Kavadi rituals if you are visiting during the Krithigai month; the energy is infectious."
        ],
        "faqs": [
                {
                        "question": "Why is it called Tiruttani?",
                        "answer": "The name is derived from ''Thanigai'', which means to cool or calm down, referring to the Lord''s peaceful state here."
                },
                {
                        "question": "How many steps are there?",
                        "answer": "There are exactly 365 steps, representing the days of the year."
                },
                {
                        "question": "Who did he marry here?",
                        "answer": "He met and married Valli, his second consort, on this hill."
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
    'Pazhamudircholai', 
    'pazhamudircholai', 
    'Sacred Destination', 
    'tn', 
    'The sixth and final of the six abodes (Arupadai Veedu) of Lord Murugan, Pazhamudircholai is located in a lush forest on the Alagar hills. It is a site of natural beauty and profound simplicity, representing the final stage of the soul''s journey into the divine grove of eternal fruitfulness.', 
    '335.5', 
    '860.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Fruitful Grove and the Final Abode of the Alagar Hills', 
    'Pazhamudircholai Murugan | Tamil Nadu, Arupadai Veedu & Ancient Lore', 
    'Experience the profound serenity of Pazhamudircholai. Discover the forest Murugan temple, the legend of the fruit-seller, and the profound energy of the final abode.', 
    'Pazhamudircholai, Madurai, Tamil Nadu, Murugan, Kartikeya, Arupadai Veedu, Hindu Pilgrimage, Ancient Lore, Forest', 
    '145', 
    '{
        "spiritualEssence": "Pazhamudircholai is the manifestation of the divine as the supreme abundance and the absolute fruitfulness of the soul. The energy here is cool, green, and intensely natural. It is the site where the Lord resides as the protector of the forest and the provider of the spiritual harvest. The vibration is one of ''Siddhi'' (Fruitfulness) and the absolute completion of the journey. As a simple temple in the dense forest of the Alagar hills, it represents the return to the source. A visit here is believed to grant the devotee the final realization of the sweetness of the divine presence. The air is always vibrant with the scent of the wild fruits and the silent, cool energy of the ancient trees.",
        "longDescription": "Pazhamudircholai is located 25km from Madurai, situated higher up the same hill as the famous Alagar Koil. It is the final abode of the six-temple circuit. According to legend, the Lord tested the intelligence of the great Tamil poetess Avvaiyar here by appearing as a simple boy and asking if she wanted ''cooked'' or ''uncooked'' fruits from a jamun tree. When she asked for cooked ones, he shook the tree and the fruits fell into the dust; she blew on them to clean them, and he laughed, saying she was blowing to cool the ''hot'' fruit, teaching her a lesson in humility. The temple is unique for its simplicity, as the Lord is worshipped with his consorts Valli and Deivayanai in a serene forest environment.",
        "spiritualArchitecture": "The temple architecture is simple and elegant, designed to integrate with the surrounding forest. Unlike the grand gopurams of the other abodes, Pazhamudircholai features a more modest stone structure with a small shikhara. The main sanctum is a quiet, intense space where the Lord is worshipped as the one who grants the fruits of spiritual effort. A unique feature is the presence of the ''Noopura Ganga'' (also known as Silambar), a natural spring that flows from the mountain and is believed to have been created by the tinkling of the Lord''s anklets. The architecture is characterized by its use of local stone and the open spaces that allow the sounds and scents of the forest to enter the temple halls.",
        "vedicReferences": "Pazhamudircholai is celebrated in the Silappathikaram and the Tirumurugatruppadai as the supreme grove of the Lord.",
        "deepInsights": "The ''cooked'' and ''uncooked'' fruits represent the difference between acquired knowledge and direct realization. Pazhamudircholai teaches that the final stage of the journey is one of profound simplicity and humility.",
        "ancientLore": "Lore tells that the Jamun tree (Naval Maram) in the temple courtyard blooms and bears fruit only during the auspicious month of Aippasi, regardless of the season. Another legend says that the spring water contains the minerals of all the sacred mountains of the world.",
        "keyRituals": [
            {"name": "Noopura Ganga Snanam", "description": "Taking a ritual bath in the natural spring water that flows from the mountain peak."},
            {"name": "Fruit Abhishekam", "description": "The ritual bathing of the Lord with various forest fruits to celebrate the abundance of nature."},
            {"name": "Soorasamharam (Local)", "description": "The final day of the Kanda Sashti festival celebrated with specific forest-themed processions."},
            {"name": "Avvaiyar Puja", "description": "Offering prayers to the poet-saint who is believed to have attained her highest wisdom here."}
        ],
        "highlights": [
            {"name": "The Forest Sanctum", "description": "The peaceful main shrine situated in the heart of the Alagar hills."},
            {"name": "Noopura Ganga Spring", "description": "The miraculous mountain spring with high medicinal and spiritual value."},
            {"name": "The Sacred Jamun Tree", "description": "The ancient tree associated with the legend of Avvaiyar."},
            {"name": "View of the Valley", "description": "The spectacular look-out from the temple over the dense forests of Madurai."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "25km from Madurai. Accessible by road; regular buses run from Madurai to Alagar Koil, from where a local shuttle takes pilgrims to Pazhamudircholai.",
            "nearestAirport": "Madurai Airport.",
            "nearestRailway": "Madurai Junction."
        },
        "tips": [
            "Drink the water from the Noopura Ganga; it is famous for its purity and medicinal properties.",
            "The temple is very close to the Alagar Koil (Vishnu temple); visit both to experience the unity of the Shaiva and Vaishnava traditions in Madurai.",
            "Be prepared for monkeys in the forest; keep your belongings secure and do not feed them."
        ],
        "faqs": [
            {"question": "Is it the final abode?", "answer": "Yes, it is the sixth and final abode of the Arupadai Veedu circuit."},
            {"question": "Who is Avvaiyar?", "answer": "She was a legendary Tamil poetess who was a great devotee of Murugan and was taught a lesson in humility here."},
            {"question": "Is there a lot of walking?", "answer": "The temple is accessible by car/bus right to the entrance, but exploring the surrounding forest and springs involves some walking."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Shravasti', 
    'shravasti', 
    'Sacred Destination', 
    'up', 
    'One of the eight primary Buddhist pilgrimage sites, Shravasti was the capital of the ancient kingdom of Kosala. It is where the Buddha spent 24 rainy seasons and performed the ''Twin Miracle,'' representing the absolute expansion of the light of Dharma in the face of all doubt.', 
    '510.5', 
    '280.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Capital of the Twin Miracle and the Twenty-Four Rainy Seasons', 
    'Shravasti Buddhist Circuit | Uttar Pradesh, Gonda & Ancient Lore', 
    'Experience the profound serenity of Shravasti. Discover the Jetavana monastery, the site of the Twin Miracle, and the profound energy of the Kosala pilgrimage.', 
    'Shravasti, Uttar Pradesh, Buddhist, Lord Buddha, Jetavana, Hindu Pilgrimage, Ancient Lore, Miracle', 
    '146', 
    '{
        "spiritualEssence": "Shravasti is the manifestation of the divine as the supreme refuge and the absolute miracle of the transformed mind. The energy here is vast, quiet, and intensely scholarly. It is the site where the teacher (Buddha) made his longest home and shared his most extensive teachings. The vibration is one of ''Sravana'' (Listening) and the absolute clarity of the Sangha. As a landscape of ancient brick ruins and massive monasteries, it represents the stability of the truth. A visit here is believed to grant the devotee the same refuge and wisdom that the Buddha offered to the people of Kosala. The air is always vibrant with the scent of the earth and the silent, heavy energy of the 2,500-year-old Bodhi tree.",
        "longDescription": "Shravasti, located near Gonda in Uttar Pradesh, was the capital of King Pasenadi of Kosala. It is most famous for the Jetavana Monastery, which was gifted to the Buddha by the merchant Anathapindika after covering the ground with gold coins. The Buddha spent 24 monsoon retreats (Varshas) here, more than any other site. It is also where he performed the ''Twin Miracle'' (Yamak-Pratiharya), where he manifested fire and water simultaneously from his body to defeat the doubts of his critics. Shravasti is a site where the history of the Buddhist expansion and the devotion of the ancient rulers remain frozen in spectacular brick ruins and modern global monasteries. It is also an important site for Jains as the birthplace of the 3rd Tirthankara, Lord Sambhavanatha.",
        "spiritualArchitecture": "The architecture of Shravasti is characterized by its massive brick foundations and the unique layout of the ancient Jetavana monastery. The highlights are the Gandhakuti (The Fragrant Chamber), which was the Buddha''s personal residence, and the numerous stupas marking the sites of his miracles. A unique feature is the Anandabodhi Tree, which was planted by Anathapindika from a sapling of the original Bodhi tree in Bodh Gaya. The architecture is sturdy and spread out, designed to accommodate thousands of monks. Modern additions include grand monasteries built by the Thai, Sri Lankan, and Burmese communities, each featuring their unique national Buddhist styles. The use of traditional brick-work combined with the lush gardens creates a sense of a living spiritual university.",
        "vedicReferences": "Shravasti is celebrated in the Pali Canon and the Jain Agamas as one of the six great cities of ancient India.",
        "deepInsights": "The gift of Jetavana (gold-covered earth) represents the absolute surrender of material wealth for the spiritual path. Shravasti teaches that the true miracle is the conversion of the heart through wisdom.",
        "ancientLore": "Lore tells that the Buddha multiplied himself into a thousand forms during the Twin Miracle, reaching every person in the crowd simultaneously. Another legend says that the site of the Gandhakuti was chosen because it was the most peaceful spot in the kingdom where even the birds would stop their singing to listen to the silence.",
        "keyRituals": [
            {"name": "Gandhakuti Meditation", "description": "Sitting in silence at the site of the Buddha''s residence to connect with his long-term presence."},
            {"name": "Anandabodhi Puja", "description": "The ritual of offering water and prayers at the ancient Bodhi tree, representing the continuity of the lineage."},
            {"name": "Chanting of the Sutras", "description": "The collective melodic recitation of the teachings that were originally delivered at this site."},
            {"name": "Thai Monastery Visit", "description": "Participating in the traditional Thai Buddhist prayers in the grand modern complex nearby."}
        ],
        "highlights": [
            {"name": "Jetavana Monastery", "description": "The ancient site where the Buddha lived for 24 rainy seasons."},
            {"name": "The Twin Miracle Site", "description": "The stupa marking the spot of the Buddha''s spectacular display of divine powers."},
            {"name": "Anandabodhi Tree", "description": "The 2,500-year-old tree that is the living link to the original enlightenment."},
            {"name": "Angulimala Stupa", "description": "The site where the fierce bandit was converted and transformed into a saint."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "150km from Lucknow and 15km from Balrampur. Well connected by road; regular buses and taxis run from Lucknow and Gonda.",
            "nearestAirport": "Lucknow Airport / Shravasti Airport (local).",
            "nearestRailway": "Balrampur / Gonda Junction."
        },
        "tips": [
            "Hire a local guide to understand the specific layout of the Jetavana ruins and the location of the Buddha''s chamber.",
            "Visit the modern international monasteries; the Thai and Sri Lankan ones are particularly beautiful and peaceful.",
            "Allow enough time to sit under the Anandabodhi tree; it is one of the most meditative spots on the entire Buddhist circuit."
        ],
        "faqs": [
            {"question": "How long did the Buddha stay here?", "answer": "He spent 24 monsoon retreats (rainy seasons) in Shravasti, making it his most frequent residence."},
            {"question": "What is the Twin Miracle?", "answer": "It was a display where the Buddha manifested fire and water simultaneously to prove the power of the Dharma."},
            {"question": "Is it important for Jains?", "answer": "Yes, it is the birthplace of the 3rd Tirthankara, Lord Sambhavanatha, and is a major Jain pilgrimage site."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Vaishali', 
    'vaishali', 
    'Sacred Destination', 
    'br', 
    'The world''s first republic and a site of immense spiritual significance, Vaishali is where the Buddha delivered his last sermon and where Lord Mahavira was born. It is home to the Ashokan Pillar and the Relic Stupa, representing the peak of ancient Indian democracy and spiritual enlightenment.', 
    '630.2', 
    '385.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The First Republic and the Site of the Last Sermon', 
    'Vaishali Spiritual Site | Bihar, Buddhist & Ancient Lore', 
    'Discover the spiritual and historical majesty of Vaishali. Explore the Ashokan pillar, the Relic stupa, and the profound energy of the Buddha''s final journey.', 
    'Vaishali, Bihar, Buddhist, Lord Buddha, Lord Mahavira, Hindu Pilgrimage, Ancient Lore, Republic', 
    '147', 
    '{
        "spiritualEssence": "Vaishali is the manifestation of the divine as the supreme freedom and the absolute clarity of the final departure. The energy here is quiet, noble, and intensely historical. It is the site where the spirit of equality (democracy) and the spirit of enlightenment (Buddha/Mahavira) were first unified. The vibration is one of ''Sangha-Karma'' (Collective Action) and the absolute peace of the final teaching. As a landscape of ancient stupas and massive stone pillars, it represents the unshakeable nature of the truth. A visit here is believed to grant the devotee the same clarity and courage that the Buddha displayed before his passing. The air is always vibrant with the scent of the mango groves and the silent, heavy energy of the Ashokan stone.",
        "longDescription": "Vaishali, located in Bihar, was the capital of the Licchavi republic, the world''s first known democratic state. It was a favorite city of the Buddha, and it was here that he allowed women to enter the Sangha for the first time. The site is most famous for the Ashokan Pillar, topped by a single lion, which remains in near-perfect condition. It is also where the Buddha announced his approaching Mahaparinirvana. For Jains, Vaishali is the birthplace of Lord Mahavira (at Kundagram), making it a site of absolute primary importance. The city is home to the Relic Stupa, where one-eighth of the Buddha''s original ashes were once enshrined. Vaishali is a site where the roots of Indian politics and spirituality are found in the same soil.",
        "spiritualArchitecture": "The architecture of Vaishali is characterized by its massive brick stupas and the spectacular Ashokan Pillar. The pillar is a 11-meter high monolithic shaft of polished sandstone, topped by a seated lion facing north—the direction of the Buddha''s final journey. A unique feature is the coronation tank (Abhishek Pushkarni), where the elected representatives of the republic were once consecrated. The Relic Stupa is an ancient mud-and-brick mound that is one of the oldest in the world. Modern additions include the Vishwa Shanti Stupa built by the Japanese community and several beautiful monasteries. The use of simple brick-work and massive polished stone creates a sense of an indestructible and egalitarian spiritual foundation.",
        "vedicReferences": "Vaishali is celebrated in the Mahabharata, the Pali Canon, and the Jain Agamas as the supreme city of virtue and freedom.",
        "deepInsights": "The last sermon of the Buddha at Vaishali emphasizes the importance of the individual effort in the spiritual path. Vaishali teaches that the highest form of governance is the one that allows for the highest form of spiritual realization.",
        "ancientLore": "Lore tells that a monkey offered the Buddha a bowl of honey here, and the earth shook in joy at the simple act of devotion. Another legend says that the Lichhavis were so beautiful and virtuous that the Buddha compared them to the gods of the Tavatimsa heaven.",
        "keyRituals": [
            {"name": "Ashokan Pillar Pradakshina", "description": "The ritual of walking around the massive stone pillar while meditating on the strength of the Dharma."},
            {"name": "Mahavir Jayanti", "description": "The grand annual celebration of the birth of the 24th Tirthankara at the nearby Kundagram."},
            {"name": "Last Sermon Recitation", "description": "Reading the Maha-Parinibbana Sutta at the spot where the Buddha announced his final departure."},
            {"name": "Abhishek Pushkarni Snan", "description": "Taking a ritual bath in the ancient coronation tank for spiritual purification."}
        ],
        "highlights": [
            {"name": "Ashokan Pillar", "description": "The magnificent and complete 11-meter lion pillar of the Mauryan empire."},
            {"name": "Relic Stupa", "description": "The ancient mound that once housed the sacred ashes of the Buddha."},
            {"name": "Vishwa Shanti Stupa", "description": "The grand modern peace pagoda overlooking the ancient ruins."},
            {"name": "Kundagram", "description": "The sacred birthplace of Lord Mahavira, located just a few kilometers away."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "60km from Patna, well connected by road. Regular buses and taxis run from Patna and Hajipur.",
            "nearestAirport": "Jay Prakash Narayan International Airport, Patna.",
            "nearestRailway": "Hajipur Junction / Muzaffarpur Junction."
        },
        "tips": [
            "The site is quite spread out; hire a local auto-rickshaw to visit the pillar, the relic stupa, and Kundagram.",
            "Visit the local archaeological museum to see the artifacts found during the excavation of the stupas.",
            "The mango groves of Vaishali are famous; try the local varieties if you are visiting during the summer months."
        ],
        "faqs": [
            {"question": "Who was born here?", "answer": "Lord Mahavira, the 24th Tirthankara of Jainism, was born in Kundagram, which is part of the Vaishali complex."},
            {"question": "What is unique about the Ashokan pillar?", "answer": "It is one of the few Ashokan pillars that is still complete and in its original position, featuring a single lion capital."},
            {"question": "Is it the world''s first republic?", "answer": "Yes, Vaishali was the capital of the Vajjian confederacy, which is considered the first known democratic republic in world history."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Kailash Mansarovar', 
    'kailash-mansarovar', 
    'Sacred Destination', 
    'intl', 
    'The ultimate spiritual pinnacle of the world, Mount Kailash is the abode of Lord Shiva and the center of the universe for Hindus, Buddhists, Jains, and Bon. Paired with the sacred Mansarovar Lake, it is a site of absolute transcendence and the highest pilgrimage on Earth.', 
    '480.2', 
    '150.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Abode of Shiva and the Axis of the Universe', 
    'Kailash Mansarovar Yatra | Tibet, Lord Shiva & Ancient Lore', 
    'Experience the ultimate pilgrimage to Kailash Mansarovar. Discover the sacred peak of Shiva, the lake of the mind, and the profound energy of the axis mundi.', 
    'Kailash Mansarovar, Tibet, Lord Shiva, Mount Kailash, Hindu Pilgrimage, Ancient Lore, Buddhism, Jainism, Axis Mundi', 
    '148', 
    '{
        "spiritualEssence": "Kailash Mansarovar is the manifestation of the divine as the supreme stillness and the absolute center of all existence. The energy here is vast, crystalline, and intensely transcendental. It is the site where the physical world dissolves into the pure light of consciousness. The vibration is one of ''Param-Shiva'' (The Absolute Shiva) and the absolute origin of the four great rivers of Asia. As a pyramid of black rock and snow, it represents the cosmic Meru. A visit here is believed to grant the devotee the absolute dissolution of the ego and the realization of the eternal self. The air is always vibrant with the scent of the high mountain ozone and the silent, heavy energy of the thin, sacred atmosphere.",
        "longDescription": "Mount Kailash (6,638m), located in the Tibet Autonomous Region, is considered the most sacred peak in the world. For Hindus, it is the eternal residence of Shiva and Parvati. For Buddhists, it is the home of Demchok. For Jains, it is the mountain (Ashtapada) where the first Tirthankara attained Nirvana. The pilgrimage involves the ''Kora'' (circumambulation) of the peak, a 52-kilometer trek at altitudes exceeding 18,000 feet. Paired with this is the Lake Mansarovar, the highest freshwater lake in the world, which is believed to have been created in the mind (Manas) of Lord Brahma. Kailash is a site where the physical endurance of the pilgrim is tested against the vast spiritual scale of the cosmos, representing the ultimate journey of the human soul.",
        "spiritualArchitecture": "The architecture of Kailash is entirely natural, a spectacular four-faced pyramid of black rock and perpetual snow. Each face of the mountain is perfectly aligned with the four cardinal directions. The architecture of the surrounding landscape includes several ancient Tibetan Buddhist monasteries (Gompas) like Dirapuk and Zutulpuk, which serve as resting points on the Kora. The Lake Mansarovar is a perfectly circular body of water that reflects the sapphire blue of the high-altitude sky. The architecture of the pilgrimage is one of movement—the clockwise circumambulation (Pradakshina) that mirrors the rotation of the galaxies. The use of natural stone, ice, and the shifting patterns of light creates a sense of a living, cosmic cathedral that has never been conquered by human climbers.",
        "vedicReferences": "Kailash is celebrated in the Vedas, the Puranas, and the Ramayana as the supreme site of the gods and the source of the Ganges.",
        "deepInsights": "The unclimbed status of Kailash represents the truth that the highest divinity is beyond human conquest and can only be approached through surrender. Kailash teaches that the center of the world is also the center of the heart.",
        "ancientLore": "Lore tells that the great yogi Milarepa was the only human ever to reach the summit, using the rays of the sun. Another legend says that the mountain is a massive, solid crystal that emits the light of the spirit to all corners of the world.",
        "keyRituals": [
                {
                        "name": "Kailash Kora",
                        "description": "The 52-kilometer circumambulation of the mountain, often performed over three days to purify the soul."
                },
                {
                        "name": "Mansarovar Snanam",
                        "description": "Taking a ritual bath in the freezing waters of the sacred lake to wash away the sins of a lifetime."
                },
                {
                        "name": "Tarchen Prayer Flag Hoisting",
                        "description": "The ritual of raising massive vertical prayer flags during the Saga Dawa festival to bless the universe."
                },
                {
                        "name": "Shiva Puja at Gauri Kund",
                        "description": "Offering prayers at the turquoise ''Lake of Compassion'' where Goddess Parvati is believed to have bathed."
                }
        ],
        "highlights": [
                {
                        "name": "The North Face",
                        "description": "The most iconic and vertical face of Kailash, visible from Dirapuk monastery."
                },
                {
                        "name": "Dolma La Pass",
                        "description": "The highest point of the trek (18,600ft), marking the threshold of spiritual rebirth."
                },
                {
                        "name": "Lake Mansarovar",
                        "description": "The sacred freshwater lake representing the purity of the mind."
                },
                {
                        "name": "Gauri Kund",
                        "description": "The beautiful high-altitude lake of the Goddess, located near the summit pass."
                }
        ],
        "travelInfo": {
                "bestTime": "May to September.",
                "howToReach": "Accessible via organized tours from Kathmandu (Nepal) or Lhasa (Tibet). Requires special permits and a high degree of physical fitness.",
                "nearestAirport": "Ngari Gunsa Airport (Tibet) / Kathmandu International Airport.",
                "nearestRailway": "None; accessible only by specialized 4WD vehicles and trekking."
        },
        "tips": [
                "Acclimatize in Lhasa or Kathmandu for at least 3-4 days before attempting the high-altitude journey.",
                "The weather can change in minutes; carry high-quality layering and protection for extreme cold.",
                "The journey is as much mental as physical; maintain a steady, meditative pace during the Kora."
        ],
        "faqs": [
                {
                        "question": "Has anyone climbed Kailash?",
                        "answer": "No, it is strictly unclimbed out of respect for its spiritual status and the belief that the Lord resides on the summit."
                },
                {
                        "question": "How long is the Kora?",
                        "answer": "The full circumambulation is 52 kilometers, usually covered in three days of trekking."
                },
                {
                        "question": "Is it in India?",
                        "answer": "No, Mount Kailash is located in the Tibet Autonomous Region of China."
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
    'Pashupatinath', 
    'pashupatinath', 
    'Sacred Destination', 
    'intl', 
    'The most important Shaivite temple in Nepal, Pashupatinath is the abode of the ''Lord of All Living Beings.'' Located on the banks of the sacred Bagmati river in Kathmandu, it is a UNESCO World Heritage site and the supreme protector of the Himalayan spiritual world.', 
    '580.5', 
    '320.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lord of the Elements and the Golden Heart of Nepal', 
    'Pashupatinath Temple Kathmandu | Nepal, Lord Shiva & Ancient Lore', 
    'Experience the profound power of Pashupatinath. Discover the golden temple, the legend of the Bagmati, and the profound energy of the Lord of All Beings.', 
    'Pashupatinath, Kathmandu, Nepal, Lord Shiva, Bagmati River, Hindu Pilgrimage, Ancient Lore, UNESCO', 
    '149', 
    '{
        "spiritualEssence": "Pashupatinath is the manifestation of the divine as the supreme protector of all life (Pashu) and the absolute master of the elements. The energy here is ancient, intense, and intensely transformative. It is the site where life and death are bridged on the banks of the river. The vibration is one of ''Mrityunjaya'' (Victory over Death) and the absolute compassion of the Lord. As a golden pagoda in the heart of the Himalayas, it represents the spiritual crown of the region. A visit here is believed to grant the devotee the release from the animalistic instincts and the realization of their divine nature. The air is always vibrant with the scent of the sandalwood and the constant, rhythmic sound of the Bagmati aarti.",
        "longDescription": "The Pashupatinath temple complex is a vast network of shrines and ghats dating back to the 5th century CE. The main temple is a magnificent two-tiered golden pagoda with silver-plated doors. The main deity is a four-faced Lingam representing the different dimensions of Shiva. Only Hindus are allowed inside the main courtyard, but the entire complex is a spectacular display of Newari and traditional Hindu architecture. Pashupatinath is famous for its daily evening aarti and its role as the primary site for final rites in Nepal. The presence of the sacred Bagmati river, which flows to the Ganges, makes it a site of immense purification and spiritual continuity for the entire subcontinent.",
        "spiritualArchitecture": "The architecture of Pashupatinath is a masterpiece of the Nepalese pagoda style. The main temple features a tiered roof covered in gold and heavy wood-carved beams. The architecture is designed to integrate with the natural slope of the river bank. A unique feature is the presence of 492 small Shiva shrines (Sivalayas) that line the terraces of the complex. The silver-plated doors and the massive golden Nandi (bull) in the courtyard reflect the imperial patronage of the Malla and Shah dynasties. The use of local wood, stone, and the intricate relief work on the windows create a sense of a living spiritual museum that has survived for over 1,500 years.",
        "vedicReferences": "Pashupatinath is celebrated in the Shiva Purana and the Skanda Purana as the supreme site where Shiva lived as a deer in the forest of Nepal.",
        "deepInsights": "The term ''Pashu'' represents the human being tied by the ropes (Pasha) of ignorance. Pashupatinath teaches that the Lord is the one who cuts these ropes to grant liberation.",
        "ancientLore": "Lore tells that the Lord once escaped from the gods and hid in the Kathmandu valley in the form of a golden-horned deer. Another legend says that the site was personally rediscovered by a cow who offered her milk to the hidden Lingam buried in the earth.",
        "keyRituals": [
                {
                        "name": "Bagmati Aarti",
                        "description": "The spectacular evening ritual of offering lamps to the river, accompanied by rhythmic music and chanting."
                },
                {
                        "name": "Maha Shivaratri in Nepal",
                        "description": "The grandest annual celebration where over a million pilgrims and thousands of Naga Sadhus gather from across India and Nepal."
                },
                {
                        "name": "Pashupatinath Mukti Snanam",
                        "description": "The ritual bath in the sacred Bagmati river before entering the temple for the main prayers."
                },
                {
                        "name": "Ekadasa Rudra Puja",
                        "description": "The special collective worship of the eleven forms of Shiva performed in the main sanctum."
                }
        ],
        "highlights": [
                {
                        "name": "The Golden Pagoda",
                        "description": "The main shrine of the temple with its two-tiered gold-plated roof."
                },
                {
                        "name": "The Four-Faced Lingam",
                        "description": "The unique and powerful main deity of the Lord of All Beings."
                },
                {
                        "name": "Arya Ghat",
                        "description": "The sacred riverbank used for royal cremations and spiritual purification."
                },
                {
                        "name": "Mrigasthali Forest",
                        "description": "The surrounding grove where the Lord is said to have wandered as a deer."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Shivaratri).",
                "howToReach": "Located in Kathmandu city center, just a few kilometers from the international airport. Well connected by taxis and local transport.",
                "nearestAirport": "Tribhuvan International Airport, Kathmandu.",
                "nearestRailway": "None; Kathmandu is best reached by air."
        },
        "tips": [
                "Non-Hindus can view the main temple from across the river (Slesmantak Forest), which offers the best overall perspective of the complex.",
                "Respect the sanctity of the cremation ceremonies; photography at the Arya Ghat is strictly regulated.",
                "Visit in the early morning or during the evening aarti for the most intense spiritual experience."
        ],
        "faqs": [
                {
                        "question": "Who can enter the main temple?",
                        "answer": "Only people of Hindu faith are allowed inside the main temple courtyard, though everyone can visit the rest of the complex."
                },
                {
                        "question": "Is it a Jyotirlinga?",
                        "answer": "While not part of the traditional 12, it is considered the head of the Jyotirlingas in many traditions."
                },
                {
                        "question": "What is the Bagmati river?",
                        "answer": "It is a sacred river that flows through Kathmandu and eventually joins the Ganges in India."
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
    'Angkor Wat', 
    'angkor-wat', 
    'Sacred Destination', 
    'intl', 
    'The world''s largest religious monument, Angkor Wat was originally built as a Hindu temple dedicated to Lord Vishnu and later transformed into a Buddhist site. It is a spectacular architectural representation of the cosmic Mount Meru, representing the absolute peak of the Khmer civilization''s spiritual vision.', 
    '880.2', 
    '550.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Celestial City and the Stone Ocean of Vishnu', 
    'Angkor Wat Cambodia | Siem Reap, Lord Vishnu & Ancient Lore', 
    'Discover the spiritual majesty of Angkor Wat. Explore the world''s largest temple, the legend of the Churning of the Ocean, and the profound energy of the Khmer pilgrimage.', 
    'Angkor Wat, Cambodia, Lord Vishnu, Siem Reap, Hindu Pilgrimage, Ancient Lore, Buddhism, UNESCO', 
    '150', 
    '{
        "spiritualEssence": "Angkor Wat is the manifestation of the divine as the supreme order and the absolute scale of the cosmic vision. The energy here is vast, mathematical, and intensely regal. It is the site where the earth was literally reshaped to reflect the heavens. The vibration is one of ''Vishwa-Roopa'' (The Universal Form) and the absolute harmony of the elements. As a massive stone city surrounded by a celestial moat, it represents the ocean of milk. A visit here is believed to grant the devotee the sense of the grand scale of the divine plan and the eternity of the spirit. The air is always vibrant with the scent of the tropical stone and the silent, heavy energy of the 900-year-old sandstone corridors.",
        "longDescription": "Angkor Wat, built in the early 12th century by King Suryavarman II, is the masterpiece of Khmer architecture. It was designed as a funerary temple and a symbolic representation of Mount Meru, the home of the gods. The temple is surrounded by a massive 200-meter wide moat and features five central towers representing the peaks of the cosmic mountain. The most famous feature is the nearly 1,000 square meters of intricate bas-reliefs depicting scenes from the Ramayana, the Mahabharata, and the Churning of the Ocean of Milk. Angkor Wat is unique because it faces West, the direction of Vishnu, unlike most Khmer temples that face East. Today, it remains a living Buddhist pilgrimage site and the national symbol of Cambodia, representing the enduring legacy of the Hindu-Buddhist fusion in Southeast Asia.",
        "spiritualArchitecture": "The architecture of Angkor Wat is the absolute peak of the Khmer style. It uses the ''temple mountain'' layout, featuring three concentric galleries rising to a central sanctuary. The architecture is perfectly mathematical, with the dimensions and alignments corresponding to astronomical cycles. A unique feature is the use of the ''corbelled arch'' and the massive sandstone blocks that are fitted together without any mortar. The 2,000 Apsaras (celestial dancers) carved into the walls are world-renowned for their detail and diversity. The architecture is designed to lead the pilgrim through a series of thresholds, moving from the earthly world (the moat) to the celestial peaks (the central tower), a literal journey through the cosmos in stone.",
        "vedicReferences": "Angkor Wat is celebrated as the supreme physical manifestation of the Puranic cosmology and is considered a primary site for the study of the Vaishnava tradition in the East.",
        "deepInsights": "The reflection of the temple in the moat represents the truth that the material world is a mirror of the divine reality. Angkor Wat teaches that the highest form of human achievement is the one that honors the cosmic order.",
        "ancientLore": "Lore tells that the temple was built in a single night by a divine architect who used a miraculous liquid to soften the stones. Another legend says that the King personally communicated with the gods in the central sanctuary every evening to ensure the prosperity of his empire.",
        "keyRituals": [
                {
                        "name": "Sunrise Meditation",
                        "description": "The modern ritual of gathering at the reflection pool to watch the sun rise behind the five towers, symbolizing the birth of the Dharma."
                },
                {
                        "name": "Buddhist Water Blessing",
                        "description": "The ritual of receiving a sacred water blessing from the monks who reside in the modern pagodas within the complex."
                },
                {
                        "name": "Pradakshina of the Bas-Reliefs",
                        "description": "Walking slowly around the main gallery to ''read'' the cosmic stories of the gods carved in stone."
                },
                {
                        "name": "Equinox Alignment",
                        "description": "The ritual gathering during the spring equinox when the sun rises exactly over the central tower."
                }
        ],
        "highlights": [
                {
                        "name": "The Five Central Towers",
                        "description": "The iconic sandstone peaks representing the summits of Mount Meru."
                },
                {
                        "name": "Churning of the Ocean Relief",
                        "description": "The 49-meter long masterpiece depicting the cosmic struggle for the nectar of immortality."
                },
                {
                        "name": "The Reflection Pool",
                        "description": "The sacred water body that creates the world-famous symmetrical view of the temple."
                },
                {
                        "name": "The Apsara Carvings",
                        "description": "Over 2,000 unique celestial dancers that adorn the walls of the galleries."
                }
        ],
        "travelInfo": {
                "bestTime": "November to February.",
                "howToReach": "Located in Siem Reap, Cambodia. Well connected by air from all major Asian cities. The temple complex is just a 15-minute drive from the city center.",
                "nearestAirport": "Siem Reap-Angkor International Airport.",
                "nearestRailway": "None; accessible by road and air."
        },
        "tips": [
                "Get a 3-day pass; it is impossible to see the scale and the detail of Angkor Wat and the surrounding temples in a single day.",
                "Arrive before 5 AM for the sunrise; even with the crowds, it is a profound spiritual experience.",
                "Hire a certified archaeological guide to understand the complex astronomical and Puranic symbolism of the architecture."
        ],
        "faqs": [
                {
                        "question": "Is it a Hindu or Buddhist temple?",
                        "answer": "It was built as a Hindu temple for Vishnu but was later converted to a Buddhist site in the 14th century."
                },
                {
                        "question": "How large is the complex?",
                        "answer": "The main temple complex covers about 400 acres, while the entire Angkor archaeological park covers over 400 square kilometers."
                },
                {
                        "question": "Who built it?",
                        "answer": "It was built by King Suryavarman II in the early 12th century CE."
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
    'Muktinath', 
    'muktinath', 
    'Sacred Destination', 
    'intl', 
    'The ''Place of Liberation,'' Muktinath is a sacred site in the Mustang region of Nepal, located at 12,000 feet. It is one of the 108 Divya Desams and is famous for its 108 eternal waterspouts and the flame that burns from the water, representing the absolute union of the five elements.', 
    '570.2', 
    '310.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Portal of Liberation and the 108 Eternal Springs', 
    'Muktinath Temple Mustang | Nepal, Vishnu & Ancient Lore', 
    'Discover the spiritual power of Muktinath. Explore the 108 waterspouts, the eternal flame of Jwala Mai, and the profound energy of the high-altitude pilgrimage.', 
    'Muktinath, Nepal, Mustang, Lord Vishnu, Hindu Pilgrimage, Ancient Lore, Buddhism, 108 Waterspouts', 
    '151', 
    '{
        "spiritualEssence": "Muktinath is the manifestation of the divine as the supreme liberation and the absolute harmony of the elements. The energy here is cold, luminous, and intensely purifying. It is the site where the soul is washed clean by the 108 streams of the Dharma. The vibration is one of ''Mukti'' (Freedom) and the absolute union of the fire and the water. As a temple at the base of the Thorong La pass, it represents the gateway to the infinite. A visit here is believed to grant the devotee the release from the cycle of birth and death and the healing of all karmic wounds. The air is always vibrant with the scent of the mountain wind and the constant, icy music of the 108 sacred springs.",
        "longDescription": "Muktinath is one of the most revered pilgrimage sites in the Himalayas, situated in the Mustang district. For Hindus, it is Mukti Kshetra (the place of salvation) and one of the 108 Divya Desams dedicated to Lord Vishnu. The main deity is a golden idol of Vishnu. For Buddhists, it is Chumig Gyatsa (Hundred Waters) and is associated with Guru Padmasambhava. The temple is world-famous for its 108 brass waterspouts arranged in a semi-circle, through which cold mountain water flows continuously. Nearby is the Jwala Mai temple, where a natural gas flame has been burning from the water and the earth for centuries, representing the divine presence in the elements of nature.",
        "spiritualArchitecture": "The architecture of Muktinath is a beautiful example of the Nepalese pagoda style, built primarily of stone and wood with a tiered roof. The most significant architectural feature is the outer courtyard containing the 108 brass lion-faced waterspouts. The architecture is designed to facilitate the ritual bath in the thin, cold air of 3,800 meters. The Jwala Mai temple is a smaller structure built over the natural springs and gas vents. The use of local mountain stone and the presence of thousands of prayer flags reflect the unique Hindu-Buddhist fusion of the Mustang region. The architecture is sturdy and simple, reflecting the rugged spiritual endurance required to reach this high-altitude portal.",
        "vedicReferences": "Muktinath is celebrated in the Puranas as the supreme site for the finding of Saligrams (sacred stones) in the nearby Gandaki river.",
        "deepInsights": "The 108 waterspouts represent the 108 dimensions of the divine. Muktinath teaches that liberation is reached through the purification of all aspects of our being.",
        "ancientLore": "Lore tells that the 108 waterspouts were created by the touch of the 108 fingers of the 108 celestial sages. Another legend says that the eternal flame at Jwala Mai was lit personally by the Goddess to show the path to the seekers in the dark ages.",
        "keyRituals": [
                {
                        "name": "108 Waterspout Bath",
                        "description": "The ritual of running under all 108 icy waterspouts in succession to wash away the sins of lifetimes."
                },
                {
                        "name": "Jwala Mai Darshan",
                        "description": "Offering prayers to the eternal flame that burns from the water, symbolizing the unity of the elements."
                },
                {
                        "name": "Saligram Aradhana",
                        "description": "Worshipping the sacred stones from the Gandaki river, which are believed to be natural forms of Lord Vishnu."
                },
                {
                        "name": "Mukti-Snanam",
                        "description": "Taking a ritual bath in the two sacred pools (Kunda) before entering the main temple."
                }
        ],
        "highlights": [
                {
                        "name": "The 108 Waterspouts",
                        "description": "The semi-circular wall of sacred lion-faced brass springs."
                },
                {
                        "name": "Jwala Mai Temple",
                        "description": "The shrine of the eternal natural flame burning from the earth."
                },
                {
                        "name": "Main Vishnu Temple",
                        "description": "The central pagoda dedicated to the Lord of Liberation."
                },
                {
                        "name": "Gandaki River",
                        "description": "The sacred river flowing through the valley, the only source of the Saligram stones."
                }
        ],
        "travelInfo": {
                "bestTime": "March to June and September to November.",
                "howToReach": "Accessible by flight from Pokhara to Jomsom followed by a 4WD drive and a short trek. Also accessible by a multi-day trek from the Annapurna circuit.",
                "nearestAirport": "Jomsom Airport / Pokhara Airport.",
                "nearestRailway": "None; accessible only by air and mountain road."
        },
        "tips": [
                "Be prepared for extreme cold and the effects of high altitude; move slowly and stay hydrated.",
                "The water in the 108 spouts is icy cold; if you plan to do the ritual bath, do it quickly and have dry clothes ready immediately.",
                "Combine your visit with a trip to the nearby village of Kagbeni to see the ancient spiritual culture of the Mustang."
        ],
        "faqs": [
                {
                        "question": "How high is the temple?",
                        "answer": "It is located at an altitude of approximately 3,800 meters (12,467 feet) above sea level."
                },
                {
                        "question": "What are Saligrams?",
                        "answer": "They are sacred fossilized stones found in the Gandaki river, worshipped by Hindus as natural manifestations of Vishnu."
                },
                {
                        "question": "Is it open in winter?",
                        "answer": "The temple is often inaccessible in mid-winter due to heavy snow and extreme cold."
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
    'Batu Caves', 
    'batu-caves', 
    'Sacred Destination', 
    'intl', 
    'The spiritual heart of the Hindu diaspora in Malaysia, Batu Caves is a massive limestone hill featuring a series of magnificent cave temples. It is famous for the world''s tallest statue of Lord Murugan and the spectacular 272 colorful steps, representing the ascent of the soul to the heights of the spirit.', 
    '950.5', 
    '750.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Golden Guardian and the Rainbow Ascent of the Caves', 
    'Batu Caves Kuala Lumpur | Malaysia, Murugan & Ancient Lore', 
    'Experience the profound energy of Batu Caves. Discover the world''s tallest Murugan statue, the 272 colorful steps, and the profound energy of the Malaysian Hindu pilgrimage.', 
    'Batu Caves, Malaysia, Lord Murugan, Kuala Lumpur, Hindu Pilgrimage, Ancient Lore, Thaipusam, Limestone', 
    '152', 
    '{
        "spiritualEssence": "Batu Caves is the manifestation of the divine as the supreme guardian and the absolute resilience of the spirit in a distant land. The energy here is vast, humid, and intensely colorful. It is the site where the ancient faith found a spectacular home in the limestone cathedrals of the jungle. The vibration is one of ''Vijay-Shakti'' (The Power of Victory) and the absolute devotion of the diaspora. As a golden statue standing before a mountain of caves, it represents the protection of the righteous. A visit here is believed to grant the devotee the courage to overcome any challenge and the strength of the community. The air is always vibrant with the scent of the tropical forest and the constant, high-energy chanting of Vel Vel Vetrivel.",
        "longDescription": "Batu Caves, located near Kuala Lumpur, is a series of caves in a limestone hill believed to be 400 million years old. The site was dedicated to Lord Murugan in 1890 by K. Thamboosamy Pillai. The defining feature is the 140-foot tall golden statue of Murugan, the tallest of its kind in the world, which took three years to complete. The pilgrimage involves climbing 272 steps, which were recently painted in vibrant rainbow colors, to reach the main Cathedral Cave. Batu Caves is the global epicenter for the Thaipusam festival, where over a million devotees gather to perform the Kavadi and seek the Lord''s grace. It is a site where the ancient Tamil traditions and the modern multicultural spirit of Malaysia are perfectly unified in a spectacular tropical landscape.",
        "spiritualArchitecture": "The architecture of Batu Caves is a unique blend of natural limestone formations and grand Dravidian temple design. The main Cathedral Cave features a massive vaulted ceiling reaching 100 meters, with natural skylights that allow the tropical sun to illuminate the shrines. The architecture is designed for verticality, emphasizing the climb and the ascent. The 272 steps are a masterpiece of functional and symbolic design, now world-famous for their rainbow colors. The 140-foot golden statue is made of concrete and steel, coated with 300 liters of gold paint. The use of vibrant colors and the integration of the shrines within the natural cave walls create a sense of a living, breathing mountain that has become a temple.",
        "vedicReferences": "Batu Caves is celebrated in the modern global Murugan tradition as the supreme site of the Lord''s presence in Southeast Asia.",
        "deepInsights": "The climb up the 272 steps represents the difficult but colorful journey of life towards the spiritual truth. Batu Caves teaches that the divine presence can be found and built in any corner of the world through faith.",
        "ancientLore": "Lore tells that the entrance of the main cave was shaped like the tip of Murugan''s spear (Vel), which led the early settlers to dedicate the hill to him. Another legend says that the spirits of the limestone mountain personally guard the temple during the night.",
        "keyRituals": [
                {
                        "name": "Thaipusam Kavadi",
                        "description": "The world''s largest and most intense manifestation of the Kavadi ritual, where devotees carry elaborate structures to the cave peak."
                },
                {
                        "name": "Paal Kudam Offering",
                        "description": "The ritual of carrying pots of milk up the 272 steps as an offering of purity and devotion."
                },
                {
                        "name": "Daily Murugan Aarti",
                        "description": "The ritual worship at the base and the peak shrines, accompanied by traditional Nadaswaram music."
                },
                {
                        "name": "Vetrivel Chanting",
                        "description": "The collective rhythmic chanting that fuels the climb of the thousands of pilgrims every morning."
                }
        ],
        "highlights": [
                {
                        "name": "World''s Tallest Murugan Statue",
                        "description": "The 140-foot golden monument that guards the entrance to the caves."
                },
                {
                        "name": "The Rainbow Steps",
                        "description": "The 272 colorful stairs that lead to the spiritual heart of the hill."
                },
                {
                        "name": "Cathedral Cave",
                        "description": "The massive main cave with its high ceilings and natural light."
                },
                {
                        "name": "Ramayana Cave",
                        "description": "A separate cave featuring spectacular life-sized dioramas of the epic stories."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during Thaipusam in January/February).",
                "howToReach": "Located 13km from Kuala Lumpur city center. Well connected by the KTM Komuter train and taxis. The train station is right at the temple entrance.",
                "nearestAirport": "Kuala Lumpur International Airport (KLIA).",
                "nearestRailway": "Batu Caves KTM Station."
        },
        "tips": [
                "Dress modestly; cover your shoulders and knees. Wraps are available for rent at the base of the stairs.",
                "Watch out for the monkeys on the steps; keep your belongings inside your bags and do not carry food openly.",
                "Visit in the early morning (around 7 AM) to beat the heat and the large tourist crowds."
        ],
        "faqs": [
                {
                        "question": "How many steps are there?",
                        "answer": "There are exactly 272 steps leading up to the main cave."
                },
                {
                        "question": "Is it free to enter?",
                        "answer": "The main cave and the stairs are free to visit, though some of the smaller themed caves have an entry fee."
                },
                {
                        "question": "When is the Thaipusam festival?",
                        "answer": "It is usually held in late January or early February; check the lunar calendar for the specific date."
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
    'Besakih Temple', 
    'besakih-temple', 
    'Sacred Destination', 
    'intl', 
    'The ''Mother Temple'' of Bali, Besakih is a massive complex of over 80 temples situated 1,000 meters up the slopes of the sacred Mount Agung volcano. it is the spiritual heart of Balinese Hinduism, representing the absolute unity of the people with the divine forces of nature.', 
    '1080.2', 
    '780.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother Temple and the Volcanic Heart of Bali', 
    'Besakih Temple Bali | Indonesia, Mount Agung & Ancient Lore', 
    'Experience the profound majesty of Besakih. Discover the Mother Temple of Bali, the legend of Mount Agung, and the profound energy of the Balinese Hindu pilgrimage.', 
    'Besakih Temple, Bali, Indonesia, Mount Agung, Hindu Pilgrimage, Ancient Lore, Balinese Hinduism, UNESCO', 
    '153', 
    '{
        "spiritualEssence": "Besakih is the manifestation of the divine as the supreme mother and the absolute resilience of faith in the face of the volcanic power. The energy here is vast, misty, and intensely hierarchical. It is the site where the Balinese universe is anchored to the sacred mountain. The vibration is one of ''Dharma-Shanti'' (The Peace of Dharma) and the absolute protection of the island. As a cascading complex of black stone pagodas (Merus) on the mountain side, it represents the connection between the earth and the sky. A visit here is believed to grant the devotee the sense of their place in the cosmic order and the protection of the ancestors. The air is always vibrant with the scent of the incense and the silent, cool energy of the mountain clouds.",
        "longDescription": "Pura Besakih, located on the slopes of Mount Agung, is the largest and holiest of all Balinese Hindu temples. It has been the center of spiritual life in Bali since the 8th century. The complex is organized into 22 separate temples that step up the mountain in a series of terraces. The most important is Pura Penataran Agung, dedicated to the Hindu trinity (Trimurti). In 1963, a massive eruption of Mount Agung devastated the surrounding villages but miraculously stopped just meters away from the temple walls, which is considered the ultimate modern miracle of the island. Besakih is a site where the unique Balinese calendar of festivals and the ancient traditions of the mountain-spirit worship are perfectly unified in a landscape of black stone and tropical flowers.",
        "spiritualArchitecture": "The architecture of Besakih is the absolute peak of the Balinese style. It is characterized by the ''Meru'' towers—multi-roofed pagodas made of black volcanic stone and thatched with black palm fiber. The number of roofs (always odd) represents the status of the deity. The architecture is organized according to the principle of Kaja-Kelod (Mountain-Sea), where the most sacred shrines are always towards the mountain peak. A unique feature is the grand split gateway (Candi Bentar) that marks the entrance to each courtyard. The use of black volcanic rock and the tiered organization against the slope of the volcano create a sense of a spiritual stairway to the heavens.",
        "vedicReferences": "Besakih is celebrated in the Balinese palm-leaf manuscripts (Lontars) as the supreme site where the first Hindu sage, Rishi Markandeya, established the faith on the island.",
        "deepInsights": "The survival of the temple during the eruption represents the truth that the spirit is indestructible. Besakih teaches that the highest form of devotion is the one that is rooted in the respect for the power of nature.",
        "ancientLore": "Lore tells that Mount Agung was a fragment of the cosmic Mount Meru brought to Bali by the gods to provide a spiritual center. Another legend says that a great dragon (Basuki) lives in the depths of the mountain and protects the temple with his breath.",
        "keyRituals": [
                {
                        "name": "Pura Besakih Odalan",
                        "description": "The massive annual temple anniversary festival where thousands of Balinese arrive in white dress to offer prayers and music."
                },
                {
                        "name": "Eka Dasa Rudra",
                        "description": "A rare and grand ritual performed once every 100 years to restore the balance of the universe."
                },
                {
                        "name": "Tirta Seva",
                        "description": "The ritual of receiving sacred mountain water from the high priests for purification."
                },
                {
                        "name": "Ancestral Offerings",
                        "description": "The daily ritual of placing colorful ''Canang Sari'' offerings at the hundreds of family shrines within the complex."
                }
        ],
        "highlights": [
                {
                        "name": "Pura Penataran Agung",
                        "description": "The central and largest temple dedicated to Brahma, Vishnu, and Shiva."
                },
                {
                        "name": "The Black Meru Towers",
                        "description": "The iconic multi-tiered pagodas that are the signature of Balinese architecture."
                },
                {
                        "name": "Candi Bentar",
                        "description": "The magnificent split gateway that offers a framed view of the mountain peak."
                },
                {
                        "name": "Mount Agung Backdrop",
                        "description": "The sacred volcano that provides the dramatic and spiritual setting for the temple."
                }
        ],
        "travelInfo": {
                "bestTime": "April to October (dry season).",
                "howToReach": "Located about 2 hours drive from Ubud and 3 hours from Kuta. Best reached by hiring a private car or driver.",
                "nearestAirport": "Ngari Rai International Airport (Denpasar).",
                "nearestRailway": "None; Bali has no railway system."
        },
        "tips": [
                "A sarong and sash are mandatory to enter; you can rent them at the entrance. Dress in light, modest clothing.",
                "Ignore the unofficial ''guides'' at the parking lot who claim you cannot enter without them; you only need your ticket and proper dress.",
                "Visit early in the morning (around 8 AM) to avoid the heat and the afternoon clouds that often hide the mountain peak."
        ],
        "faqs": [
                {
                        "question": "How many temples are there?",
                        "answer": "The complex consists of 22 major temples and over 80 smaller shrines organized into terraces."
                },
                {
                        "question": "Is it active?",
                        "answer": "Yes, it is the most active and important center of worship for the over 4 million Hindus in Bali."
                },
                {
                        "question": "Can I climb the volcano?",
                        "answer": "Mount Agung can be climbed, but it is a difficult trek and the mountain is often closed for hiking during major religious festivals."
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
    'Prambanan', 
    'prambanan', 
    'Sacred Destination', 
    'intl', 
    'The largest Hindu temple complex in Indonesia, Prambanan is a 9th-century masterpiece of the Sanjaya dynasty. It is a spectacular architectural poem in stone dedicated to the Trimurti, representing the absolute peak of the classical Javanese Hindu civilization.', 
    '1050.5', 
    '810.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Towering Shiva and the Stone Epic of Java', 
    'Prambanan Temple Yogyakarta | Indonesia, Trimurti & Ancient Lore', 
    'Discover the spiritual majesty of Prambanan. Explore the tallest Hindu temple in SE Asia, the legend of the Thousand Temples, and the profound energy of the Javanese pilgrimage.', 
    'Prambanan, Indonesia, Yogyakarta, Hindu Pilgrimage, Ancient Lore, Lord Shiva, UNESCO, Javanese Architecture', 
    '154', 
    '{
        "spiritualEssence": "Prambanan is the manifestation of the divine as the supreme order and the absolute verticality of the soul''s aspiration. The energy here is rhythmic, stone-heavy, and intensely focused on the heights. It is the site where the ancient Hindu vision was translated into the unique volcanic stone of Java. The vibration is one of ''Vishwa-Dharma'' (Universal Law) and the absolute beauty of the cosmic dance. As a cluster of tall, tapered towers in the fertile plains of Java, it represents the axis mundi. A visit here is believed to grant the devotee the sense of the grand scale of the spiritual history and the resilience of the truth across the oceans. The air is always vibrant with the scent of the humid earth and the silent, heavy energy of the 1,100-year-old stone towers.",
        "longDescription": "Prambanan, located near Yogyakarta, was built around 850 CE by Rakai Pikatan. It is a UNESCO World Heritage site and the most important Hindu site in Indonesia. The complex originally consisted of 240 temples, with the three main towers dedicated to Shiva, Vishnu, and Brahma. The Shiva temple is the tallest (47 meters) and houses a magnificent statue of the four-armed God. The temple is famous for its extensive bas-reliefs depicting the Ramayana in a unique Javanese style. Prambanan was abandoned for centuries after a volcanic eruption and rediscovered in the 18th century. Today, it remains a site of immense pride and a living center for the performance of the Ramayana Ballet, representing the enduring cultural heart of Java.",
        "spiritualArchitecture": "The architecture of Prambanan is the pinnacle of the classical Javanese (Mataram) style. It is characterized by its tall, slender towers (Candi) built of grey volcanic stone. The layout follows the Vastu Shastra, with the main temples in the center of three concentric squares. A unique feature is the use of the ''corbel'' technique for the massive roofs. The bas-reliefs on the inner walls of the galleries are world-renowned for their narrative detail and the way they adapt the Indian epics to the Javanese landscape and flora. The architecture is designed to lead the mind from the outer world to the intense, narrow sanctums where the powerful stone deities reside, a vertical ascent to the spirit.",
        "vedicReferences": "Prambanan is celebrated as the supreme site of the Shaiva and Vaishnava traditions in the southern seas and is a primary site for the study of the Hindu-Javanese fusion.",
        "deepInsights": "The towering height of the central Shiva temple represents the unshakeable nature of the truth amidst the changes of history. Prambanan teaches that the spirit can bloom and build its greatest monuments in any land.",
        "ancientLore": "Lore tells the legend of Rara Jonggrang, a princess who asked her suitor to build 1,000 temples in a single night. He almost succeeded with the help of spirits, but she tricked him; in anger, he turned her into the 1,000th statue, which is identified as the Durga idol in the Shiva temple.",
        "keyRituals": [
                {
                        "name": "Ramayana Ballet",
                        "description": "The world-famous performance of the epic at night with the illuminated temples as the backdrop, a cultural ritual of immense power."
                },
                {
                        "name": "Nyepi Celebrations",
                        "description": "The grand Hindu festivals held at the complex during the Balinese-Javanese New Year."
                },
                {
                        "name": "Pradakshina of the Reliefs",
                        "description": "The ritual of walking around the main towers to read the Ramayana carved in the stone galleries."
                },
                {
                        "name": "Evening Arati",
                        "description": "Special ritual offerings performed by the modern Hindu community of Java in the main sanctums."
                }
        ],
        "highlights": [
                {
                        "name": "The Shiva Temple",
                        "description": "The 47-meter tall central tower with its powerful four-chambered sanctum."
                },
                {
                        "name": "The Ramayana Bas-Reliefs",
                        "description": "The incredible stone carvings that wrap around the inner galleries of the main temples."
                },
                {
                        "name": "The Durga Mahishasuramardini Statue",
                        "description": "The beautiful and legendary ''Rara Jonggrang'' idol inside the Shiva temple."
                },
                {
                        "name": "Candi Sewu",
                        "description": "The massive Buddhist temple complex nearby, reflecting the peaceful coexistence of the two faiths."
                }
        ],
        "travelInfo": {
                "bestTime": "May to October (dry season).",
                "howToReach": "17km from Yogyakarta city center. Well connected by road; regular buses and taxis run from the city. Also accessible by bike from Yogyakarta.",
                "nearestAirport": "Yogyakarta International Airport / Adisutjipto Airport.",
                "nearestRailway": "Yogyakarta Tugu Station."
        },
        "tips": [
                "Visit in the late afternoon to see the sunset behind the towers, then stay for the Ramayana Ballet performance.",
                "Hire an official guide to point out the specific narrative details of the Ramayana reliefs; they are incredibly complex.",
                "Wear comfortable walking shoes; the complex is large and the stone paths can be uneven."
        ],
        "faqs": [
                {
                        "question": "How old is the temple?",
                        "answer": "It was built around 850 CE during the Sanjaya dynasty of the Mataram Kingdom."
                },
                {
                        "question": "Why is it called the ''Thousand Temples''?",
                        "answer": "Due to the legend of Rara Jonggrang and the fact that the original complex had 240 temples."
                },
                {
                        "question": "Is it a Shiva temple?",
                        "answer": "The main and tallest tower is dedicated to Lord Shiva, while the others honor Brahma and Vishnu."
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
    'Jambukeswarar (Thiruvanaikaval)', 
    'jambukeswarar', 
    'Sacred Destination', 
    'tn', 
    'One of the five elements (Panch Bhuta Sthalam) representing ''Water'' (Appu), Jambukeswarar is a site of immense antiquity and natural wonder. It is where the Lord is worshipped as a Lingam that is permanently submerged in water, representing the absolute fluidity of the divine.', 
    '335.2', 
    '785.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lord of the Water Element and the Elephant''s Forest', 
    'Jambukeswarar Temple Trichy | Tamil Nadu, Panch Bhuta & Ancient Lore', 
    'Experience the profound power of the Water element. Discover the Jambukeswarar temple, the legend of the elephant and the spider, and the profound energy of the Appu Lingam.', 
    'Jambukeswarar, Trichy, Tamil Nadu, Lord Shiva, Panch Bhuta Sthalam, Water Element, Hindu Pilgrimage, Ancient Lore', 
    '155', 
    '{
        "spiritualEssence": "Jambukeswarar is the manifestation of the divine as the supreme fluidity and the absolute life-giving power of water. The energy here is cool, rhythmic, and intensely purifying. It is the site where the Lord resides in the depths of the sacred spring. The vibration is one of ''Appu'' (Water) and the absolute cooling of the fires of the material world. As a temple where the Lingam is always submerged, it represents the immersion of the soul in the divine grace. A visit here is believed to grant the devotee the clarity of the mind and the washing away of all karmic impurities. The air is always vibrant with the scent of the damp earth and the silent, cool energy of the underground springs.",
        "longDescription": "Jambukeswarar temple, located in Thiruvanaikaval near Trichy, is over 1,800 years old. It is one of the five Panch Bhuta Sthalams, representing the element of Water. The main deity, Jambukeswarar, is worshipped as a Lingam situated over a natural spring that never dries up. According to legend, Goddess Parvati performed penance here in the form of Akhilandeswari, creating a Lingam out of water (Appu Lingam) to worship Shiva. The name ''Thiruvanaikaval'' means ''Protected by the Elephant,'' referring to an elephant that used to worship the Lingam daily with water from the Cauvery. The temple is famous for its unique rituals, including the priest dressing as the Goddess to perform the afternoon aarti, symbolizing the Mother''s devotion to the Lord.",
        "spiritualArchitecture": "The architecture of Jambukeswarar is a spectacular display of the early and middle Chola style. It features five concentric stone walls (Prakarams) and several massive gopurams. The fourth wall is particularly famous, having been built by Shiva himself in the form of a laborer according to legend. The main sanctum is a low-lit chamber where the Lingam is seen partially submerged in the flowing spring water. The architecture is designed to manage the flow of water and provide a cool, meditative atmosphere even in the heat of Tamil Nadu. The use of dark granite and the presence of intricate relief carvings of the elephant and the spider stories reflect the deep integration of mythology and stone.",
        "vedicReferences": "Jambukeswarar is celebrated in the Tevaram hymns of the Nayanars and is considered a primary site for the study of the elemental worship of Shiva.",
        "deepInsights": "Water represents the quality of adaptability and purification. Jambukeswarar teaches that the soul must become fluid and transparent to receive the divine light.",
        "ancientLore": "Lore tells of an elephant and a spider who both worshipped the Lingam; the spider spun a web to protect it from leaves, while the elephant washed the web away to bathe the Lord. After many lives of conflict, they both attained liberation through their opposing forms of devotion. Another legend says that the Lord personally built the ''Vibhuti Wall'' to show that selfless labor is the highest form of worship.",
        "keyRituals": [
                {
                        "name": "Uchchi Kala Puja",
                        "description": "The unique afternoon ritual where the priest dresses as Goddess Akhilandeswari to perform the aarti to the Lord."
                },
                {
                        "name": "Appu Lingam Abhishekam",
                        "description": "The ritual bathing of the water-submerged Lingam with sacred substances while chanting the Vedic hymns."
                },
                {
                        "name": "Panch Bhuta Mahotsav",
                        "description": "The grand annual festival celebrating the five elements, with Jambukeswarar representing the water domain."
                },
                {
                        "name": "Elephant Seva",
                        "description": "The ritual of the temple elephant offering prayers to the Lord, commemorating the ancient legend."
                }
        ],
        "highlights": [
                {
                        "name": "The Appu Lingam",
                        "description": "The sacred Shiva Lingam permanently submerged in the natural spring water."
                },
                {
                        "name": "Akhilandeswari Shrine",
                        "description": "The powerful shrine of the Goddess, considered one of the major Shakti centers in the South."
                },
                {
                        "name": "The Vibhuti Wall",
                        "description": "The massive 4th outer wall believed to have been built by the Lord himself."
                },
                {
                        "name": "The Jamun Tree",
                        "description": "The ancient tree from which the temple takes its name (Jambukeswarar)."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Located in Trichy, very close to the Srirangam temple. Well connected by road and rail; regular buses and taxis run from Trichy city center.",
                "nearestAirport": "Tiruchirappalli International Airport.",
                "nearestRailway": "Srirangam / Trichy Junction."
        },
        "tips": [
                "Visit during the afternoon (around 1 PM) to witness the unique ritual of the priest dressing as the Goddess; it is a rare and profound experience.",
                "The temple is very close to Srirangam; you can easily visit both in a single day trip.",
                "Wear traditional cotton clothes; the temple can be humid due to the constant presence of water."
        ],
        "faqs": [
                {
                        "question": "Which element does it represent?",
                        "answer": "It represents the element of ''Water'' (Appu)."
                },
                {
                        "question": "Why is it always wet?",
                        "answer": "The Lingam is situated directly over a natural underground spring that flows continuously."
                },
                {
                        "question": "How old is the temple?",
                        "answer": "The core structure is believed to be over 1,800 years old, with major expansions by the Chola kings."
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
    'Tirunelveli (Nellaiappar)', 
    'tirunelveli-nellaiappar', 
    'Sacred Destination', 
    'tn', 
    'One of the five cosmic dance halls of Lord Shiva (Pancha Sabhai), the Nellaiappar temple represents the ''Thamira Sabhai'' (Copper Hall). It is a massive temple complex in South Tamil Nadu, representing the absolute rhythm of the divine dance and the protection of the righteous.', 
    '315.2', 
    '870.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Copper Hall of the Cosmic Dance and the Protective Fence of Paddy', 
    'Nellaiappar Temple Tirunelveli | Tamil Nadu, Pancha Sabhai & Ancient Lore', 
    'Discover the spiritual majesty of Tirunelveli. Explore the Copper Hall of Shiva, the legend of the paddy fence, and the profound energy of the cosmic dance.', 
    'Tirunelveli, Nellaiappar, Tamil Nadu, Lord Shiva, Pancha Sabhai, Copper Hall, Hindu Pilgrimage, Ancient Lore', 
    '156', 
    '{
        "spiritualEssence": "Tirunelveli is the manifestation of the divine as the supreme rhythm and the absolute protection of the devotee''s efforts. The energy here is dynamic, festive, and intensely musical. It is the site where the Lord dances in the hall of copper, representing the warmth and the resonance of the spirit. The vibration is one of ''Thamira'' (Copper) and the absolute protection of the righteous. As a massive temple complex on the banks of the Thamirabarani river, it represents the spiritual heart of the deep South. A visit here is believed to grant the devotee the alignment with the cosmic rhythm and the protection from all external threats. The air is always vibrant with the scent of the river silt and the constant, rhythmic sound of the musical pillars.",
        "longDescription": "The Nellaiappar temple, located in Tirunelveli, is one of the largest and most ancient temples in Tamil Nadu, dating back over 2,000 years. It is famous as the Thamira Sabhai (Copper Hall), one of the five places where Lord Shiva is believed to have performed his cosmic dance. The name ''Tirunelveli'' is derived from ''Tiru'' (Sacred), ''Nel'' (Paddy), and ''Veli'' (Fence), referring to a miracle where the Lord protected a devotee''s drying paddy from a massive flood by creating a fence of rain around it. The complex is unique for being a twin temple dedicated to both Lord Nellaiappar (Shiva) and Goddess Kanthimathi Amman, connected by a grand pillared corridor. It is a site where the ancient Pandyan history and the living musical traditions of the South are perfectly unified.",
        "spiritualArchitecture": "The architecture of the Nellaiappar temple is a spectacular display of the Pandyan and later Nayak styles. The complex covers over 14 acres and features massive stone walls and grand gopurams. The highlight is the Thamira Sabhai, a beautifully carved hall with a copper-plated roof where the cosmic dance is celebrated. A unique feature is the presence of the ''Musical Pillars,'' carved from single blocks of granite that produce different musical notes when tapped. The architecture is characterized by its extensive use of dark granite and the precision of the narrative carvings. The 1,000-pillared hall (Aayiram Kaal Mandapam) is a masterpiece of proportions and relief art, reflecting the absolute peak of the Southern stone engineering.",
        "vedicReferences": "Tirunelveli is celebrated in the Tevaram hymns and is considered a primary site for the study of the Shaivite dance tradition in the South.",
        "deepInsights": "The paddy fence represents the truth that the divine protects even the simplest efforts of a sincere devotee. Tirunelveli teaches that the entire universe is a dance of energy that is governed by the rhythm of love.",
        "ancientLore": "Lore tells that the sage Agastya personally witnessed the cosmic dance here after being directed by the Lord. Another legend says that the Thamirabarani river was created from the matted hair of Shiva to provide a perpetual source of life to the temple city.",
        "keyRituals": [
                {
                        "name": "Thamira Sabhai Aradhana",
                        "description": "The special ritual worship of the Lord in his dancing form in the copper hall, performed with intense music and chanting."
                },
                {
                        "name": "Anavarata Khan Puja",
                        "description": "A unique ritual of offering prayers to the Lord through a specific stone window, commemorating the protection of the paddy."
                },
                {
                        "name": "Kanthimathi Amman Kalyanam",
                        "description": "The grand annual celebration of the divine marriage between Shiva and the Goddess, featuring a spectacular chariot festival."
                },
                {
                        "name": "Thamirabarani Snanam",
                        "description": "Taking a ritual bath in the sacred river before entering the temple for the main prayers."
                }
        ],
        "highlights": [
                {
                        "name": "Thamira Sabhai",
                        "description": "The world-famous Copper Hall of the cosmic dance."
                },
                {
                        "name": "The Musical Pillars",
                        "description": "The granite columns that emit melodic notes, a masterpiece of ancient sound engineering."
                },
                {
                        "name": "The Twin Temple Corridor",
                        "description": "The grand 17th-century corridor connecting the Shiva and the Goddess shrines."
                },
                {
                        "name": "Aayiram Kaal Mandapam",
                        "description": "The majestic thousand-pillared hall with exquisite carvings."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during the Arudhra Darshan in December/January).",
                "howToReach": "Well connected by rail and road; Tirunelveli is a major railway hub in South India. Regular buses run from Madurai (160km) and Kanyakumari (90km).",
                "nearestAirport": "Tuticorin Airport / Madurai Airport.",
                "nearestRailway": "Tirunelveli Junction."
        },
        "tips": [
                "Ask a local priest or guide to demonstrate the musical notes of the pillars; it is a mind-blowing experience of ancient technology.",
                "Visit in the early morning to see the sun hitting the copper roof of the Sabhai; it creates a golden glow throughout the hall.",
                "Explore the local market outside the temple for the world-famous ''Tirunelveli Halwa'', a traditional sweet made with Thamirabarani water."
        ],
        "faqs": [
                {
                        "question": "What is the Thamira Sabhai?",
                        "answer": "It is the ''Copper Hall'', one of the five venues where Lord Shiva performed his cosmic dance."
                },
                {
                        "question": "What does the name Tirunelveli mean?",
                        "answer": "It means the ''Sacred Paddy Fence'', referring to a miracle of divine protection."
                },
                {
                        "question": "Are the musical pillars real?",
                        "answer": "Yes, they are solid granite pillars that produce different swaras (notes) when tapped, showcasing incredible ancient engineering."
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
    'Katas Raj', 
    'katas-raj', 
    'Sacred Destination', 
    'intl', 
    'An ancient complex of Shiva temples in the Chakwal district of Pakistan, Katas Raj is mentioned in the Mahabharata as the site where the Pandavas spent their exile. It is famous for the emerald green sacred pond, believed to have been created by the tears of Shiva.', 
    '420.2', 
    '80.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Pond of Tears and the Ancient Heritage of the Mahabharata', 
    'Katas Raj Temples Chakwal | Pakistan, Lord Shiva & Ancient Lore', 
    'Discover the spiritual history of Katas Raj. Explore the ancient Shiva temples, the emerald sacred pond, and the profound energy of the Mahabharata pilgrimage site.', 
    'Katas Raj, Pakistan, Lord Shiva, Mahabharata, Pandavas, Hindu Pilgrimage, Ancient Lore, Chakwal', 
    '157', 
    '{
        "spiritualEssence": "Katas Raj is the manifestation of the divine as the supreme sorrow and the absolute endurance of the heritage. The energy here is ancient, quiet, and intensely nostalgic. It is the site where the divine tears formed a pool of eternal memory. The vibration is one of ''Viraha'' (Separation) and the absolute resilience of the stone against the tides of history. As a cluster of temples around a deep green pond, it represents the depth of the spiritual emotion. A visit here is believed to grant the devotee the sense of the vastness of the Indian spiritual map and the unshakeable presence of the Lord in every land. The air is always vibrant with the scent of the dry hills and the silent, heavy energy of the 1,500-year-old carvings.",
        "longDescription": "Katas Raj, located in the Salt Range of Pakistan, is one of the most important Hindu sites in the region. According to legend, the sacred pond was created when Lord Shiva wept inconsolably after the death of Sati; one tear fell in Pushkar (Rajasthan) and the other in Katas Raj. The complex is also where the Pandavas are said to have stayed during their exile and where the famous Yaksha Prashna (questions of the spirit) took place. The site features temples dating from the 6th to the 11th century CE, showing the transition of Northern Indian architectural styles. Katas Raj remains a symbol of the ancient shared heritage of the subcontinent, attracting pilgrims from India and beyond who come to witness the persistence of the eternal tradition.",
        "spiritualArchitecture": "The architecture of Katas Raj is a spectacular display of the Gandhara and later North Indian stone styles. The temples are built of local limestone, featuring square plans and tiered shikharas. The highlight is the Satgraha (Seven Temples) complex, which includes a grand temple dedicated to Shiva. A unique feature is the integration of the architecture with the natural limestone caves and the deep emerald pond. The architecture is designed to focus the attention on the water, which is the heart of the site. The use of robust stone-work and the presence of ancient stupas nearby reflect the long historical layer of Hindu, Buddhist, and Jain presence in the region. The architecture is a literal stone record of the spiritual history of the Silk Road era.",
        "vedicReferences": "Katas Raj is celebrated in the Mahabharata and the Puranas as the supreme site of the ''Tear of the Lord''.",
        "deepInsights": "The emerald pond represents the truth that the divine feels the human sorrow. Katas Raj teaches that the sacred remains sacred even when the borders of the world change.",
        "ancientLore": "Lore tells that the water of the pond has the power to wash away the sins of an entire era. Another legend says that the Pandavas personally built the main Shiva temple out of the local salt-range stone to honor the Lord during their difficult times.",
        "keyRituals": [
                {
                        "name": "Katas Raj Snanam",
                        "description": "The ritual bath in the emerald green pond, believed to be particularly auspicious on Maha Shivaratri."
                },
                {
                        "name": "Mahabharata Recitation",
                        "description": "Chanting the verses of the Yaksha Prashna near the pond to connect with the wisdom of the epic."
                },
                {
                        "name": "Shiva Aradhana",
                        "description": "The ritual worship in the ancient limestone sanctums, performed with flowers and incense by visiting pilgrims."
                },
                {
                        "name": "Deep Daan on the Water",
                        "description": "Offering lamps to the sacred pond during the evening to honor the tears of the Lord."
                }
        ],
        "highlights": [
                {
                        "name": "The Emerald Pond",
                        "description": "The deep, natural sacred pool at the heart of the temple complex."
                },
                {
                        "name": "Satgraha Temples",
                        "description": "The cluster of seven ancient stone temples dating back over a thousand years."
                },
                {
                        "name": "The Buddhist Stupa",
                        "description": "The remains of a 3rd-century BCE stupa nearby, reflecting the multi-religious history of the site."
                },
                {
                        "name": "Hanuman Temple",
                        "description": "A beautifully carved shrine dedicated to the Lord of Strength within the complex."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Shivaratri).",
                "howToReach": "Located in Chakwal district, Pakistan. Accessible by road from Islamabad (2.5 hours) or Lahore (3 hours). Requires specific visas and permits for international pilgrims.",
                "nearestAirport": "Islamabad International Airport.",
                "nearestRailway": "Chakwal Railway Station."
        },
        "tips": [
                "International pilgrims should apply for visas through the official religious tourism channels well in advance.",
                "The site is under the protection of the Pakistan government; follow all the security and heritage conservation rules.",
                "Combine your visit with a trip to the nearby Khewra Salt Mines, which are among the oldest in the world."
        ],
        "faqs": [
                {
                        "question": "How old is the site?",
                        "answer": "The current temple structures date back to the 6th-11th centuries CE, though the site is mentioned in the much older Mahabharata."
                },
                {
                        "question": "Why is the water green?",
                        "answer": "The pond is natural and takes its deep emerald color from the local minerals and depth."
                },
                {
                        "question": "Can I bathe in the pond?",
                        "answer": "Yes, ritual bathing is allowed and is an essential part of the pilgrimage experience."
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
    'Tuljapur Bhavani', 
    'tuljapur-bhavani', 
    'Sacred Destination', 
    'mh', 
    'One of the 3.5 Shakti Peethas of Maharashtra, Tuljapur Bhavani is the family deity of the Bhosale clan and Chhatrapati Shivaji Maharaj. It is a site of immense warrior spirit and maternal protection, where the Goddess manifested to slay the demon Mahishasura.', 
    '340.5', 
    '680.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Goddess of the Swarajya and the Warrior Mother of Tuljapur', 
    'Tuljapur Bhavani Temple | Maharashtra, Shivaji Maharaj & Ancient Lore', 
    'Experience the profound power of Tuljapur Bhavani. Discover the Goddess of Shivaji Maharaj, the history of the self-manifested idol, and the profound energy of the Shakti pilgrimage.', 
    'Tuljapur, Bhavani, Maharashtra, Shakti Peeth, Chhatrapati Shivaji Maharaj, Hindu Pilgrimage, Ancient Lore, Warrior Goddess', 
    '158', 
    '{
        "spiritualEssence": "Tuljapur Bhavani is the manifestation of the divine as the supreme protection and the absolute strength of the righteous warrior. The energy here is dynamic, fierce, and intensely maternal. It is the site where the spirit of freedom (Swarajya) was blessed by the divine mother. The vibration is one of ''Kshatra-Dharma'' (The Duty of the Warrior) and the absolute victory of light over darkness. As a temple that has witnessed the rise of empires, it represents the backbone of the Maratha spiritual heritage. A visit here is believed to grant the devotee the courage to face any battle and the protection of the Mother in all endeavors. The air is always vibrant with the scent of the turmeric (Bhandara) and the constant, high-energy chanting of Jai Bhavani, Jai Shivaji.",
        "longDescription": "Tuljapur is located in the Osmanabad district of Maharashtra. The temple is dedicated to Goddess Bhavani, a form of Durga. The idol is self-manifested (Swayambhu) and is made of metamorphic rock. It is unique because it is not fixed to the ground but can be moved for specific rituals. Chhatrapati Shivaji Maharaj was a staunch devotee and it is believed that the Goddess personally gifted him a sword (the Bhavani Talwar) to establish the Maratha Empire. The temple features two main entrances: the Raja Shahaji Mahadwar and the Rajmata Jijau Mahadwar. Tuljapur is a site where the history of Indian resistance and the devotion of the masses are perfectly unified in a landscape of stone and legend.",
        "spiritualArchitecture": "The architecture of Tuljapur is a spectacular display of the Hemadpanthi and later Maratha styles. The main temple is situated in a deep courtyard, requiring the devotee to descend steps to reach the sanctum, a unique feature symbolizing the return to the womb of the Mother. The temple features a grand shikhara with intricate relief carvings of the various forms of the Goddess. A unique feature is the presence of the Kallola Tirtha and the Gomukha Tirtha, sacred water bodies where pilgrims purify themselves. The use of dark basalt stone combined with the vibrant colors of the festive offerings creates a sense of an indestructible and ancient spiritual fortress. The architecture is designed to manage massive crowds during the Navratri festival while maintaining an atmosphere of intense, focused devotion.",
        "vedicReferences": "Tuljapur is celebrated in the Skanda Purana and the Devi Bhagavata as the supreme site where the Goddess rested after her victory over Mahishasura.",
        "deepInsights": "The Goddess being moveable represents the truth that the divine protection follows the devotee wherever they go. Tuljapur teaches that true strength comes from the alignment with the divine motherly grace.",
        "ancientLore": "Lore tells that the Goddess personally appeared before Shivaji Maharaj in a dream and gave him the strength to face the massive armies of Afzal Khan. Another legend says that the main idol was personally installed by Lord Rama during his search for Sita.",
        "keyRituals": [
                {
                        "name": "Bhandara Offering",
                        "description": "The unique ritual of showering the deity and the temple with turmeric powder, symbolizing the brightness of the spirit."
                },
                {
                        "name": "Gondhal",
                        "description": "A traditional folk-ritual performance of singing and dancing in honor of the Goddess, often performed after weddings."
                },
                {
                        "name": "Palkhi Procession",
                        "description": "The grand ritual where the Goddess is taken around the town in a silver palanquin during the Navratri festival."
                },
                {
                        "name": "Abhishek with Milk and Curd",
                        "description": "The ritual bathing of the self-manifested idol with five sacred substances every morning."
                }
        ],
        "highlights": [
                {
                        "name": "The Swayambhu Idol",
                        "description": "The ancient metamorphic rock idol of Goddess Bhavani with eight arms."
                },
                {
                        "name": "Kallola Tirtha",
                        "description": "The massive sacred tank at the entrance where all 33 crore gods are believed to have gathered."
                },
                {
                        "name": "The Chintamani Stone",
                        "description": "A sacred stone that is believed to guide the devotees in their decision-making process."
                },
                {
                        "name": "Shahaji Mahadwar",
                        "description": "The grand entrance gate named after the father of Shivaji Maharaj."
                }
        ],
        "travelInfo": {
                "bestTime": "September to March (especially during Navratri).",
                "howToReach": "Well connected by road from Solapur (45km) and Pune (290km). Solapur is the nearest major railway hub.",
                "nearestAirport": "Pune International Airport / Aurangabad Airport.",
                "nearestRailway": "Solapur Railway Station."
        },
        "tips": [
                "Be prepared for massive crowds during the 10 days of Navratri; the queues can be several hours long.",
                "Take part in a Gondhal performance if possible; it is the most authentic way to experience the local spiritual culture.",
                "Maintain the sanctity of the temple; photography is restricted in the main sanctum."
        ],
        "faqs": [
                {
                        "question": "Why is it called 3.5 Shakti Peethas?",
                        "answer": "In Maharashtra, there are three full Shakti Peethas (Tuljapur, Kolhapur, Mahur) and one half (Saptashrungi)."
                },
                {
                        "question": "What is the connection with Shivaji Maharaj?",
                        "answer": "She was his family deity and he is believed to have received his spiritual and physical strength from her blessings."
                },
                {
                        "question": "Can the idol be moved?",
                        "answer": "Yes, unlike most idols, the Bhavani idol is ''Chala'' (moveable) and is moved three times a year for specific festivals."
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
    'Kolhapur Mahalakshmi', 
    'kolhapur-mahalakshmi', 
    'Sacred Destination', 
    'mh', 
    'Known as ''Karveer Kshetra,'' Kolhapur Mahalakshmi is one of the most significant Shakti Peethas in India. It is the site where Goddess Lakshmi resides in her most powerful and benevolent form, representing the absolute abundance and the spiritual crown of Western India.', 
    '330.2', 
    '710.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Kashi of the South and the Goddess of Eternal Abundance', 
    'Kolhapur Mahalakshmi Temple | Maharashtra, Shakti Peeth & Ancient Lore', 
    'Discover the spiritual majesty of Kolhapur Mahalakshmi. Explore the ancient stone temple, the miracle of the Kirana Utsav, and the profound energy of the Shakti pilgrimage.', 
    'Kolhapur, Mahalakshmi, Maharashtra, Shakti Peeth, Hindu Pilgrimage, Ancient Lore, Ambabai, Abundance', 
    '159', 
    '{
        "spiritualEssence": "Kolhapur Mahalakshmi is the manifestation of the divine as the supreme abundance and the absolute sovereignty of the soul. The energy here is regal, golden, and intensely nurturing. It is the site where the Goddess chosen to reside after leaving Vaikuntha, making it a home of immense spiritual wealth. The vibration is one of ''Aishwarya'' (Prosperity) and the absolute fulfillment of the seeker''s journey. As a massive stone temple in the heart of the historic city, it represents the spiritual stability of the Deccan. A visit here is believed to grant the devotee the blessing of both material prosperity and spiritual liberation. The air is always vibrant with the scent of the lotus flowers and the constant, melodic chanting of the Sri Suktam.",
        "longDescription": "The Mahalakshmi temple, also known as Ambabai temple, dates back to the 7th century Chalukyan era. The idol is a monolithic black stone carving weighing about 40kg, featuring the Goddess with four arms, holding a fruit, a mace, a shield, and a bowl. A unique feature is the presence of a stone lion (the vehicle) behind the idol. The temple is built in the Maru-Gurjara style and is famous for its ''Kirana Utsav'' (Festival of Sunrays), where for three days a year, the setting sunrays fall directly on the feet, waist, and face of the idol through the temple windows, a spectacular display of ancient astronomical and architectural precision.",
        "spiritualArchitecture": "The architecture of the Kolhapur temple is a masterpiece of the classical stone style. It features a grand structure with five main towers (Shikharas) and several extensive mandapams. The architecture is designed with precise astronomical alignments to facilitate the Kirana Utsav. A unique feature is the presence of the Matulinga (a Shiva Lingam) on the top of the Goddess''s crown, representing the unity of Shiva and Shakti. The temple features several beautiful carvings of the various deities and celestial dancers. The use of dark, polished basalt stone and the presence of ancient inscriptions reflect the long history of royal patronage from the Chalukyas, Shilaharas, and Marathas. The architecture is designed to create a sense of a royal court where the Goddess sits as the supreme empress.",
        "vedicReferences": "Kolhapur is celebrated in the Skanda Purana and the Devi Gita as one of the six primary sites where the Goddess grants both worldly success and final liberation.",
        "deepInsights": "The sunrays falling on the Goddess represent the truth that all physical energy (Surya) is ultimately an offering to the supreme consciousness (Shakti). Kolhapur teaches that true abundance is the harmony of the inner and outer worlds.",
        "ancientLore": "Lore tells that after a dispute with Lord Vishnu, Lakshmi came to Kolhapur to perform penance and was so pleased with the devotion of the people that she decided to stay here forever. Another legend says that the city was saved from a demon named Kolhasura who, in his final moments, asked that the city be named after him and be blessed by the Goddess.",
        "keyRituals": [
                {
                        "name": "Kirana Utsav",
                        "description": "The spectacular 3-day event in January/February and November when the sunrays illuminate the deity from feet to face."
                },
                {
                        "name": "Lalita Panchami Palkhi",
                        "description": "The grand procession of the Goddess to the Temblai hill during the Navratri festival."
                },
                {
                        "name": "Sri Suktam Path",
                        "description": "The daily melodic recitation of the Vedic hymns to Lakshmi, performed by the temple scholars."
                },
                {
                        "name": "Kumkumarchana",
                        "description": "The ritual offering of vermilion (Kumkum) while chanting the thousand names of the Goddess (Lalita Sahasranama)."
                }
        ],
        "highlights": [
                {
                        "name": "The Monolithic Idol",
                        "description": "The 1,800-year-old black stone idol of Ambabai with the unique Matulinga on her crown."
                },
                {
                        "name": "Kirana Utsav Windows",
                        "description": "The specially designed architectural openings that allow the sunrays to reach the sanctum."
                },
                {
                        "name": "The Golden Palanquin",
                        "description": "The magnificent carriage used for the weekly and festive processions of the Goddess."
                },
                {
                        "name": "Sheshashayi Shrine",
                        "description": "A beautiful shrine within the complex depicting Vishnu reclining on the serpent."
                },
                {
                        "name": "Deepstambhas",
                        "description": "The massive stone lamp towers at the entrance that are lit during festivals."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Kirana Utsav).",
                "howToReach": "Well connected by road and rail; Kolhapur has its own railway station. Regular buses run from Pune (230km) and Mumbai (380km).",
                "nearestAirport": "Kolhapur Airport (local) / Belagavi Airport / Pune Airport.",
                "nearestRailway": "Kolhapur CRS Railway Station."
        },
        "tips": [
                "Check the dates for Kirana Utsav well in advance; it is a once-in-a-lifetime experience but requires careful planning.",
                "Dress in traditional Maharashtrian attire if possible to participate in the special Pujas.",
                "Try the local Kolhapuri Misal and the famous ''Tambada-Pandhara'' Rassa after your darshan; the city is as famous for its food as its faith."
        ],
        "faqs": [
                {
                        "question": "What is Kirana Utsav?",
                        "answer": "It is a natural phenomenon where the setting sun''s rays fall directly on the idol, occurring twice a year."
                },
                {
                        "question": "Who is Ambabai?",
                        "answer": "It is the local name for Goddess Mahalakshmi, the presiding deity of Kolhapur."
                },
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is considered one of the 108 Shakti Peethas and one of the 3.5 primary ones in Maharashtra."
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
    'Mahur Renuka Devi', 
    'mahur-renuka-devi', 
    'Sacred Destination', 
    'mh', 
    'The third full Shakti Peetha of Maharashtra, Mahur is the birthplace of Lord Dattatreya and the site of Goddess Renuka Devi. It is a site of immense spiritual power where the traditions of Shakti and the Guru are perfectly unified in the rugged hills of Nanded.', 
    '380.2', 
    '520.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of Dattatreya and the Power of the Sahyadri', 
    'Mahur Renuka Devi Temple | Maharashtra, Dattatreya \u0026 Ancient Lore', 
    'Experience the profound energy of Mahur. Discover the birthplace of Dattatreya, the temple of Renuka Devi, and the profound energy of the Shakti pilgrimage.', 
    'Mahur, Renuka Devi, Maharashtra, Shakti Peeth, Dattatreya, Hindu Pilgrimage, Ancient Lore, Nanded', 
    '160', 
    '{
        "spiritualEssence": "Mahur is the manifestation of the divine as the supreme source and the absolute power of the maternal lineage. The energy here is raw, hilly, and intensely protective. It is the site where the mother of the Guru-avatara resides. The vibration is one of ''Avadhuta'' (The Free Soul) and the absolute grace of the Shakti. As a temple set on three distinct hills, it represents the integration of the three cosmic qualities (Gunas). A visit here is believed to grant the devotee the blessing of a noble lineage and the protection of the primal mother. The air is always vibrant with the scent of the wild herbs and the constant, rhythmic chanting of the Datta-Atreya.",
        "longDescription": "Mahur, located in the Nanded district, is famous for the Renuka Devi temple. Renuka Devi was the mother of Lord Parshurama and the wife of Sage Jamadagni. The temple is one of the three full Shakti Peethas of Maharashtra. Nearby is the Anasuya Hill, the birthplace of Lord Dattatreya (the incarnation of the Trinity). The site is a complex of several temples across three hills, requiring the pilgrim to climb hundreds of steps. Mahur is a site where the ancient Puranic stories of family, sacrifice, and the manifestation of the divine as the Guru are lived every day. It remains a primary center for both the Datta Sampradaya and the Shakti worshippers of Western India.",
        "spiritualArchitecture": "The architecture of Mahur is a classic display of the Maratha hill-fort style. The main temple of Renuka Devi features a grand entrance and a stone shikhara that stands out against the green hills. The architecture is designed to accommodate the steep terrain, with well-laid stone steps connecting the various shrines. A unique feature is the presence of several ancient caves and natural springs (Kunds) that are integrated into the spiritual layout. The use of dark basalt and the expansive views of the valley create a sense of a spiritual peak that is both secluded and sovereign.",
        "vedicReferences": "Mahur is celebrated in the Devi Bhagavata and the Datta Purana as the supreme site where the Goddess manifested to protect the lineage of the sages.",
        "deepInsights": "The three hills represent the unity of Brahma, Vishnu, and Shiva under the grace of the Mother. Mahur teaches that the highest wisdom (Datta) is born from the womb of absolute devotion (Renuka).",
        "ancientLore": "Lore tells that Parshurama personally installed the idol of his mother here after she was brought back to life. Another legend says that the three hills were formed from the sacred fire of Brahma''s sacrifice.",
        "keyRituals": [
                {
                        "name": "Datta Janmotsav",
                        "description": "The grand annual celebration of the birth of Lord Dattatreya, featuring a massive gathering of Avadhutas."
                },
                {
                        "name": "Renuka Devi Abhishekam",
                        "description": "The ritual bathing of the deity with sacred waters and the offering of green bangles (Oti)."
                },
                {
                        "name": "Palkhi Yatra (Mahur)",
                        "description": "The colorful procession of the Goddess across the three hills during festivals."
                },
                {
                        "name": "Gondhal of Mahur",
                        "description": "The traditional folk-ritual songs performed to invoke the power of the Mother."
                }
        ],
        "highlights": [
                {
                        "name": "Renuka Devi Temple",
                        "description": "The main Shakti Peetha shrine located on the highest peak."
                },
                {
                        "name": "Anasuya Mata Temple",
                        "description": "The shrine marking the birthplace of Lord Dattatreya."
                },
                {
                        "name": "Parshurama Temple",
                        "description": "A temple dedicated to the sixth avatar of Vishnu who is the son of Renuka."
                },
                {
                        "name": "Matru Tirtha",
                        "description": "The sacred pond where Parshurama performed the final rites of his father."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "130km from Nanded. Well connected by road; regular buses and taxis run from Nanded and Nagpur.",
                "nearestAirport": "Nanded Airport / Nagpur International Airport.",
                "nearestRailway": "Nanded Railway Station / Kinwat Railway Station."
        },
        "tips": [
                "Be prepared for significant walking and climbing; wear comfortable footwear.",
                "Visit all three hills (Renuka, Anasuya, and Datta) for the complete spiritual circuit.",
                "The area is famous for its natural beauty; try to visit in the post-monsoon season when the hills are emerald green."
        ],
        "faqs": [
                {
                        "question": "Who is Renuka Devi?",
                        "answer": "She is the mother of Parshurama and one of the most revered forms of the Goddess in Maharashtra."
                },
                {
                        "question": "Is it a full Shakti Peeth?",
                        "answer": "Yes, it is one of the three full Shakti Peethas of Maharashtra, along with Tuljapur and Kolhapur."
                },
                {
                        "question": "How many steps are there?",
                        "answer": "There are approximately 200-300 steps to reach the main Renuka Devi shrine."
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
    'Saptashrungi Vani', 
    'saptashrungi-vani', 
    'Sacred Destination', 
    'mh', 
    'Known as the ''Half Shakti Peetha'' of Maharashtra, Saptashrungi is the site of the Goddess with eighteen arms, located in the spectacular seven-peaked mountains near Nashik. It is a site of immense primal power and breathtaking natural beauty.', 
    '310.5', 
    '640.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of the Seven Peaks and the Goddess of the 18 Arms', 
    'Saptashrungi Devi Temple | Maharashtra, Nashik \u0026 Ancient Lore', 
    'Experience the profound majesty of Saptashrungi. Discover the 10-foot idol of the Goddess, the spectacular seven peaks, and the profound energy of the Shakti pilgrimage.', 
    'Saptashrungi, Vani, Maharashtra, Shakti Peeth, Nashik, Hindu Pilgrimage, Ancient Lore, Eighteen Arms', 
    '161', 
    '{
        "spiritualEssence": "Saptashrungi is the manifestation of the divine as the supreme nature and the absolute expansion of the Shakti. The energy here is high-altitude, breezy, and intensely vibrant. It is the site where the Goddess revealed herself in her most majestic, multi-armed form. The vibration is one of ''Prakriti'' (Nature) and the absolute beauty of the manifestation. As a temple carved into the side of a massive cliff, it represents the spirit that cannot be contained. A visit here is believed to grant the devotee the expansion of their own capabilities and the removal of all limitations. The air is always vibrant with the scent of the mountain flowers and the constant, melodic chanting of the Mahishasura Mardini Stotram.",
        "longDescription": "Saptashrungi (The Seven Peaks) is located 60km from Nashik. The temple is home to a massive 10-foot tall idol of the Goddess, coated in vermilion (Sindoor), featuring eighteen arms holding various weapons and divine symbols. It is considered a ''half'' Shakti Peetha because the Goddess is believed to have rested here. The temple is reached by climbing 510 steps, though a modern ropeway (funicular) now provides easy access. Saptashrungi is particularly sacred to the local tribes and the farmers of Maharashtra. It is a site where the raw power of the Sahyadri mountains and the deep devotion of the masses create an atmosphere of intense, unshakeable faith. The Goddess is seen as the protector of the region, watching over the valleys from her high mountain throne.",
        "spiritualArchitecture": "The architecture of Saptashrungi is unique because the main sanctum is a large natural cave carved into the face of a vertical basalt cliff. The architecture is vertical and integrated with the mountain. The temple features a grand entrance and a series of wide platforms that offer panoramic views of the surrounding seven peaks. A unique feature is the presence of the modern funicular railway, one of the steepest in India, which mimics the traditional climb. The use of dark stone, vibrant red vermilion, and the dramatic backdrop of the sky create a sense of a spiritual observatory. The architecture is designed to emphasize the height and the sovereign nature of the deity.",
        "vedicReferences": "Saptashrungi is mentioned in the Devi Bhagavata and is considered a primary site for the worship of the Goddess as the vanquisher of the demon Mahishasura.",
        "deepInsights": "The eighteen arms represent the various powers of nature working in harmony. Saptashrungi teaches that the divine is both the mountain (immovable) and the wind (ever-flowing).",
        "ancientLore": "Lore tells that when Lord Rama, Lakshmana, and Sita were in the forest of Dandakaranya, they came here to seek the blessings of the Mother. Another legend says that the Goddess took this form specifically to deal with the most powerful of the demons who had fled to these peaks.",
        "keyRituals": [
                {
                        "name": "Saptashrungi Devi Oti",
                        "description": "The ritual offering of a saree, coconut, and green bangles to the Mother, a primary tradition for Maharashtrian families."
                },
                {
                        "name": "Ghatasthapana",
                        "description": "The grand ritual of establishing the sacred pot during Navratri, marking the presence of the Mother in every home."
                },
                {
                        "name": "Abhishek with Sindoor",
                        "description": "The unique ritual of coating the entire 10-foot idol with fresh vermilion once every few years."
                },
                {
                        "name": "Deepotsav (Vani)",
                        "description": "The lighting of thousands of lamps on the steps leading to the temple during the full moon of Chaitra."
                }
        ],
        "highlights": [
                {
                        "name": "The 10-Foot Idol",
                        "description": "The massive, self-manifested form of the eighteen-armed Goddess."
                },
                {
                        "name": "The Funicular Railway",
                        "description": "The spectacular ropeway that carries pilgrims up the near-vertical cliff."
                },
                {
                        "name": "The Seven Peaks",
                        "description": "The breathtaking circle of mountains that surround the temple site."
                },
                {
                        "name": "Saptashrungi Kund",
                        "description": "The sacred mountain spring whose water is used for the daily rituals of the temple."
                }
        ],
        "travelInfo": {
                "bestTime": "September to April (especially during Navratri and Chaitra Vari).",
                "howToReach": "60km from Nashik. Well connected by road; regular buses and taxis run from Nashik city center.",
                "nearestAirport": "Ozar Airport, Nashik / Mumbai International Airport.",
                "nearestRailway": "Nashik Road Railway Station."
        },
        "tips": [
                "Use the funicular railway if you have elderly pilgrims; it is a safe and spectacular ride.",
                "Be prepared for monkeys on the traditional steps; keep your offerings secure.",
                "Carry a light jacket as the temperature on the peaks is always cooler than in the Nashik valley."
        ],
        "faqs": [
                {
                        "question": "Why is it called a ''half'' Shakti Peeth?",
                        "answer": "In Maharashtra, three are considered ''full'' (Tuljapur, Kolhapur, Mahur) and Saptashrungi is considered the half peeth to complete the count of 3.5."
                },
                {
                        "question": "How many steps to the top?",
                        "answer": "There are approximately 510 steps from the base to the cave temple."
                },
                {
                        "question": "Is there a ropeway?",
                        "answer": "Yes, there is a modern funicular train (trolley) that takes you to the temple in a few minutes."
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
    'Naimisharanya', 
    'naimisharanya', 
    'Sacred Destination', 
    'up', 
    'The ''Forest of Knowledge'' and one of the most important Puranic sites in India, Naimisharanya is where 88,000 sages performed penance and where the 18 Puranas were narrated. It is a site of immense Vedic authority and the source of the entire Hindu mythological tradition.', 
    '500.2', 
    '300.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Epicenter of the Puranas and the Forest of the 88,000 Sages', 
    'Naimisharanya Temple | Uttar Pradesh, Misrikh & Ancient Lore', 
    'Experience the profound wisdom of Naimisharanya. Discover the sacred Chakra Tirtha, the history of the 88,000 sages, and the profound energy of the Puranic pilgrimage.', 
    'Naimisharanya, Uttar Pradesh, Misrikh, Lord Vishnu, Puranas, Hindu Pilgrimage, Ancient Lore, Sages', 
    '162', 
    '{
        "spiritualEssence": "Naimisharanya is the manifestation of the divine as the supreme knowledge and the absolute continuity of the sacred word. The energy here is ancient, earthy, and intensely scholarly. It is the site where the breath of the divine was translated into the stories of the gods. The vibration is one of ''Jnana'' (Wisdom) and the absolute clarity of the tradition. As a landscape of ancient groves and circular water bodies, it represents the wheel of Dharma. A visit here is believed to grant the devotee the understanding of the cosmic laws and the removal of all spiritual ignorance. The air is always vibrant with the scent of the dry leaves and the constant, low-frequency chanting of the Puranic verses.",
        "longDescription": "Naimisharanya, located on the banks of the Gomti river in Uttar Pradesh, is mentioned in the Mahabharata and the Puranas. It is considered a ''Swayamvyakta Kshetra'' (Self-manifested site). The central point is the Chakra Tirtha, a perfectly circular water body believed to have been created by the discus of Lord Vishnu to mark the center of the world. It is here that the sage Suta Goswami narrated the Puranas to the assembled 88,000 sages during a thousand-year sacrifice. Naimisharanya is also one of the 108 Divya Desams. The site is a collection of various ashrams and temples that have served as the ultimate university of Indian mythology for thousands of years.",
        "spiritualArchitecture": "The architecture of Naimisharanya is unique because it is centered around a massive circular water body (Chakra Tirtha). The architecture is spread out and integrated with the ancient forest. The main temple of Vishnu (Lalita Devi and Devaraja Perumal) features a mix of North Indian and Dravidian styles, reflecting its status as a Divya Desam. A unique feature is the presence of the Vyas Gaddi, a simple platform where the sage Vyasa is believed to have divided the Vedas and written the Puranas. The architecture is designed to facilitate the oral tradition, with several open-air mandapams for the recitation of the epics. The use of traditional brick and stone, often weathered by centuries, creates a sense of an indestructible and primal spiritual source.",
        "vedicReferences": "Naimisharanya is celebrated in the Rig Veda and is the primary setting for almost all the Puranas and the Mahabharata.",
        "deepInsights": "The circular Chakra Tirtha represents the truth that the divine knowledge has no beginning and no end. Naimisharanya teaches that the study and the sharing of the sacred stories is the highest form of spiritual practice.",
        "ancientLore": "Lore tells that Brahma personally sent a sacred wheel (Chakra) to the world and told the sages that the place where the wheel''s rim (Nemi) broke would be the most sacred spot for penance—hence the name Naimisha. Another legend says that the Gomti river flows backwards here to salute the sages.",
        "keyRituals": [
                {
                        "name": "Chakra Tirtha Snanam",
                        "description": "The ritual bath in the circular holy pool to align oneself with the cosmic wheel of Dharma."
                },
                {
                        "name": "Purana Path",
                        "description": "Participating in or listening to the 7-day recitation of a Purana (Saptah) in the sacred groves."
                },
                {
                        "name": "Vyas Gaddi Darshan",
                        "description": "Offering prayers at the seat of the sage Vyasa, the author of the epics."
                },
                {
                        "name": "Panchkosi Parikrama",
                        "description": "The 5-mile ritual circumambulation of the entire sacred forest complex."
                }
        ],
        "highlights": [
                {
                        "name": "Chakra Tirtha",
                        "description": "The perfectly circular sacred pool that is the spiritual center of the forest."
                },
                {
                        "name": "Vyas Gaddi",
                        "description": "The ancient platform of Sage Vyasa, the chronicler of the divine."
                },
                {
                        "name": "Lalita Devi Temple",
                        "description": "One of the Shakti Peethas where the Goddess is worshipped as the presiding mother of the forest."
                },
                {
                        "name": "Hanuman Garhi (Naimisha)",
                        "description": "A unique shrine depicting a massive Hanuman carrying Rama and Lakshmana on his shoulders."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "90km from Lucknow and 10km from Sitapur. Well connected by road; regular buses and taxis run from Lucknow.",
                "nearestAirport": "Chaudhary Charan Singh International Airport, Lucknow.",
                "nearestRailway": "Naimisharanya Railway Station / Sitapur Junction."
        },
        "tips": [
                "The site is best experienced with a guide who can narrate the specific Puranic stories associated with each ashram.",
                "Visit the Dadhichi Kund nearby, the site where the sage Dadhichi gave up his bones to create the thunderbolt of Indra.",
                "Be prepared for a very traditional and rustic environment; Naimisharanya is a place of deep learning, not a tourist hub."
        ],
        "faqs": [
                {
                        "question": "What does Naimisharanya mean?",
                        "answer": "It means ''The Forest of the Rim'', where the rim of Brahma''s wheel fell to the earth."
                },
                {
                        "question": "How many sages lived here?",
                        "answer": "According to the Puranas, 88,000 sages performed penance here simultaneously."
                },
                {
                        "question": "Is it a Divya Desam?",
                        "answer": "Yes, it is one of the 108 most sacred shrines of Lord Vishnu."
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
    'Thiruvalangadu (Gem Hall)', 
    'thiruvalangadu-gem-hall', 
    'Sacred Destination', 
    'tn', 
    'One of the five cosmic dance halls of Lord Shiva (Pancha Sabhai), Thiruvalangadu represents the ''Ratna Sabhai'' (Gem Hall). It is a site of immense power where the Lord performed his fierce Oordhava Tandava dance, representing the absolute victory of the spirit over the ego.', 
    '330.2', 
    '770.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Gem Hall of the Cosmic Dance and the Forest of the Banyan', 
    'Thiruvalangadu Temple | Tamil Nadu, Pancha Sabhai & Ancient Lore', 
    'Discover the spiritual power of Thiruvalangadu. Explore the Gem Hall of Shiva, the legend of the fierce dance, and the profound energy of the Ratna Sabhai.', 
    'Thiruvalangadu, Tamil Nadu, Lord Shiva, Pancha Sabhai, Gem Hall, Hindu Pilgrimage, Ancient Lore, Karaikkal Ammeiyar', 
    '163', 
    '{
        "spiritualEssence": "Thiruvalangadu is the manifestation of the divine as the supreme intensity and the absolute brilliance of the spirit. The energy here is fierce, rhythmic, and intensely transformative. It is the site where the Lord danced with his leg raised to the heavens, representing the breaking of all limits. The vibration is one of ''Ratna'' (Gem) and the absolute clarity of the diamond-like soul. As a temple set in what was once a dense Banyan forest, it represents the wild and free nature of the divine. A visit here is believed to grant the devotee the victory over their deepest fears and the removal of the most stubborn ego. The air is always vibrant with the scent of the sacred ash and the constant, echoing rhythm of the Tandava.",
        "longDescription": "Thiruvalangadu, located near Chennai, is home to the Vadaranyeswarar temple. It is the Ratna Sabhai (Gem Hall), the first of the five venues of Shiva''s cosmic dance. According to legend, Shiva and Kali engaged in a dance competition here. To defeat Kali''s ego, Shiva dropped his earring and picked it up with his foot, raising his leg to his ear (Oordhava Tandava)—a pose Kali could not repeat out of modesty. The temple is also the final resting place of the great woman-saint Karaikkal Ammeiyar, who is said to have walked on her head to this site to avoid desecrating the ground with her feet. The temple is a site where the most intense forms of Shaivism and the deepest forms of female devotion are perfectly unified in a landscape of ancient stone.",
        "spiritualArchitecture": "The architecture of Thiruvalangadu is a magnificent example of the early Chola style with later Vijayanagara expansions. The highlight is the Ratna Sabhai, a beautifully carved hall with a tiered roof where the bronze idol of the Oordhava Tandava Murti is kept. The architecture is designed to emphasize the verticality and the power of the dance. A unique feature is the presence of the Banyan tree as the Sthala Vriksha, which is hundreds of years old. The temple features two main gopurams and several extensive mandapams with detailed relief carvings of the dance competition. The use of dark granite and the precision of the bronze-work create an atmosphere of immense, concentrated spiritual energy. The architecture is designed to create a sense of an ancient, forest-bound theater of the gods.",
        "vedicReferences": "Thiruvalangadu is celebrated in the Tevaram hymns and the works of Karaikkal Ammeiyar as the supreme site of the fiercest divine dance.",
        "deepInsights": "The ''Oordhava Tandava'' represents the soul reaching for the highest dimensions. Thiruvalangadu teaches that the divine is found in the absolute intensity of the spiritual effort.",
        "ancientLore": "Lore tells that the earth shook so violently during the dance that the gods had to pray to Shiva to slow down the rhythm. Another legend says that Karaikkal Ammeiyar personally resides under the feet of the Lord in the Gem Hall to witness the dance for eternity.",
        "keyRituals": [
                {
                        "name": "Ratna Sabhai Abhishekam",
                        "description": "The special ritual bathing of the bronze Tandava idol with sacred oils and powders to honor the brilliance of the Gem Hall."
                },
                {
                        "name": "Ammeiyar Guru Puja",
                        "description": "The annual celebration of the great woman-saint, featuring the recitation of her poems and a massive feast for the poor."
                },
                {
                        "name": "Arudhra Darshan (Thiruvalangadu)",
                        "description": "The grandest annual celebration of the cosmic dance, where thousands gather to see the Lord bedecked in jewels."
                },
                {
                        "name": "Oordhava Tandava Archana",
                        "description": "A unique worship ritual where the thousand names of Shiva are chanted to commemorate his victory in the dance competition."
                }
        ],
        "highlights": [
                {
                        "name": "The Ratna Sabhai",
                        "description": "The world-famous Gem Hall where the fierce cosmic dance is celebrated."
                },
                {
                        "name": "Oordhava Tandava Idol",
                        "description": "The spectacular bronze statue of Shiva with his leg raised to his ear."
                },
                {
                        "name": "The Ancient Banyan Tree",
                        "description": "The sacred forest-tree that is the living link to the temple''s origin."
                },
                {
                        "name": "Karaikkal Ammeiyar Shrine",
                        "description": "The simple but powerful shrine dedicated to the foremost woman-saint of Shaivism."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "60km from Chennai city center. Well connected by the Chennai suburban train (Thiruvalangadu station) and local buses.",
                "nearestAirport": "Chennai International Airport.",
                "nearestRailway": "Thiruvalangadu Railway Station / Arakkonam Junction."
        },
        "tips": [
                "Visit in the early morning to witness the traditional rituals in the Ratna Sabhai; the atmosphere is intensely ancient.",
                "Read the life story of Karaikkal Ammeiyar before visiting; it will deeply change your perspective on the devotion at this site.",
                "The temple is part of a rural landscape; combine your visit with a trip to the nearby Sholur temple for a complete day out."
        ],
        "faqs": [
                {
                        "question": "Which hall does it represent?",
                        "answer": "It is the ''Ratna Sabhai'' or the Gem Hall."
                },
                {
                        "question": "What is the Oordhava Tandava?",
                        "answer": "It is the fierce pose of Shiva''s dance with one leg raised vertically, signifying his victory over the ego."
                },
                {
                        "question": "Who was Karaikkal Ammeiyar?",
                        "answer": "She was one of the 63 Nayanars (Shaivite saints) and the first to write devotional poetry in Tamil."
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
    'Courtallam (Picture Hall)', 
    'courtallam-picture-hall', 
    'Sacred Destination', 
    'tn', 
    'One of the five cosmic dance halls of Lord Shiva (Pancha Sabhai), Courtallam represents the ''Chitra Sabhai'' (Picture Hall). It is a site of immense natural beauty and artistic brilliance, where the Lord is worshipped as a series of magnificent murals rather than an idol, representing the absolute visual manifestation of the divine.', 
    '320.5', 
    '880.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Picture Hall of the Cosmic Dance and the Sacred Waterfalls', 
    'Courtallam Temple | Tamil Nadu, Pancha Sabhai & Ancient Lore', 
    'Discover the spiritual beauty of Courtallam. Explore the Picture Hall of Shiva, the legend of the medicinal waterfalls, and the profound energy of the Chitra Sabhai.', 
    'Courtallam, Tamil Nadu, Lord Shiva, Pancha Sabhai, Picture Hall, Hindu Pilgrimage, Ancient Lore, Waterfalls', 
    '164', 
    '{
        "spiritualEssence": "Courtallam is the manifestation of the divine as the supreme art and the absolute healing power of nature. The energy here is cool, rhythmic, and intensely visual. It is the site where the Lord is seen in the colors and forms of the sacred murals. The vibration is one of ''Chitra'' (Picture) and the absolute harmony of the creative spirit. As a temple set amidst nine sacred waterfalls, it represents the purification of the senses. A visit here is believed to grant the devotee the healing of the body and the awakening of the artistic soul. The air is always vibrant with the scent of the medicinal herbs and the constant, musical roar of the falling water.",
        "longDescription": "Courtallam, located in the Western Ghats of Tenkasi district, is home to the Kutralanathar temple. It is the Chitra Sabhai, the fifth and final venue of Shiva''s cosmic dance. The temple is unique because the dance hall is located separate from the main temple and its walls are entirely covered with ancient murals depicting the stories of the gods. The name ''Courtallam'' is derived from ''Kootru-Alam'', referring to the Lord''s victory over death. The town is famous for its nine waterfalls, which are believed to have high medicinal value as they flow through forests of rare herbs. Courtallam is a site where the ancient Shaiva art and the rejuvenating power of the mountains are perfectly unified in a landscape of mist and color.",
        "spiritualArchitecture": "The architecture of Courtallam is a magnificent example of the later Pandyan style, featuring a grand stone temple and a unique separate dance hall. The Chitra Sabhai is a spectacular rectangular structure with a tiled roof, where the interior walls are a literal gallery of ancient frescoes. The architecture is designed to lead the pilgrim from the water (the falls) to the art (the Sabhai) and finally to the stone (the main temple). A unique feature is the presence of the ''musical waterfalls'' where the acoustics are used in ritual worship. The main temple features several beautiful mandapams with intricate relief carvings of the sage Agastya. The use of vibrant colors in the murals and the grey stone of the temple creates a unique sensory spiritual experience.",
        "vedicReferences": "Courtallam is celebrated in the Tevaram and is considered the supreme site where the sage Agastya personally modified the form of the deity.",
        "deepInsights": "The Lord being worshipped as a ''Picture'' represents the truth that the divine is the source of all beauty and form. Courtallam teaches that the external nature and the internal art are one and the same.",
        "ancientLore": "Lore tells that the sage Agastya was sent by Shiva to the South to balance the earth during the divine wedding in the North. When he found a Vishnu temple here, he used his spiritual power to compress the idol into a Shiva Lingam. Another legend says that the waterfalls are the celestial Ganga brought down to earth to heal the world.",
        "keyRituals": [
                {
                        "name": "Chitra Sabhai Deepotsav",
                        "description": "The ritual lighting of the mural hall with thousands of oil lamps, making the ancient paintings come to life."
                },
                {
                        "name": "Kutralanathar Abhishekam",
                        "description": "The ritual bathing of the Lord with the medicinal waters from all nine waterfalls of the town."
                },
                {
                        "name": "Arudhra Darshan (Courtallam)",
                        "description": "The grandest annual celebration of the dance hall, where the murals are specially decorated with flowers and jewels."
                },
                {
                        "name": "Agastya Puja",
                        "description": "Offering prayers to the great sage who is the spiritual founder of the site and the creator of the Tamil language."
                }
        ],
        "highlights": [
                {
                        "name": "The Chitra Sabhai",
                        "description": "The world-famous mural-hall of the cosmic dance."
                },
                {
                        "name": "The Main Falls (Peraruvi)",
                        "description": "The largest and most sacred waterfall where pilgrims take their first ritual bath."
                },
                {
                        "name": "Five Falls (Aintharuvi)",
                        "description": "A spectacular natural site where the river splits into five distinct falls representing the five elements."
                },
                {
                        "name": "The Agastya Shrine",
                        "description": "The ancient shrine marking the spot where the sage performed his miracle."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (during the monsoon/falls season) and October to March.",
                "howToReach": "6km from Tenkasi. Well connected by road and rail; Tenkasi has its own railway station. Regular buses run from Madurai (160km).",
                "nearestAirport": "Tuticorin Airport / Madurai Airport.",
                "nearestRailway": "Tenkasi Junction."
        },
        "tips": [
                "Visit during the ''Season'' (June to September) to experience the full power and medicinal value of the waterfalls.",
                "The Chitra Sabhai is a separate building located about 500 meters from the main temple; make sure to visit both.",
                "Carry a change of dry clothes as ritual bathing in the falls is an essential part of the spiritual journey here."
        ],
        "faqs": [
                {
                        "question": "Which hall does it represent?",
                        "answer": "It is the ''Chitra Sabhai'' or the Picture Hall."
                },
                {
                        "question": "Why is it called the Picture Hall?",
                        "answer": "Unlike other halls with idols, the Lord is worshipped here through ancient and spectacular murals."
                },
                {
                        "question": "Are the waterfalls medicinal?",
                        "answer": "Yes, they flow through a dense forest of medicinal herbs in the Western Ghats and are believed to have high healing properties."
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
    'Namchi Siddhesvara Dham', 
    'namchi-siddhesvara-dham', 
    'Sacred Destination', 
    'sk', 
    'A spectacular pilgrimage complex in South Sikkim, Namchi Siddhesvara Dham (Solophok) features a 108-foot tall statue of Lord Shiva and replicas of the four sacred Char Dhams. It is a site of immense modern devotion and architectural grandeur, representing the spiritual heart of the Himalayas.', 
    '890.2', 
    '240.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Char Dham of the North East and the Giant Shiva of Solophok', 
    'Namchi Siddhesvara Dham | Sikkim, Char Dham & Ancient Lore', 
    'Experience the profound majesty of Namchi. Discover the 108-foot Shiva, the replicas of the four Char Dhams, and the profound energy of the Himalayan pilgrimage.', 
    'Namchi, Sikkim, Siddhesvara Dham, Solophok, Lord Shiva, Char Dham, Hindu Pilgrimage, Ancient Lore', 
    '165', 
    '{
        "spiritualEssence": "Namchi Siddhesvara Dham is the manifestation of the divine as the supreme synthesis and the absolute accessibility of the sacred sites. The energy here is vast, clean, and intensely devotional. It is the site where the four corners of India are brought together under the gaze of the giant Shiva. The vibration is one of ''Ekata'' (Unity) and the absolute grandeur of the faith. As a massive complex on the Solophok hill, it represents the spiritual lighthouse of Sikkim. A visit here is believed to grant the devotee the merit of visiting all the four Dhams in a single mountain breath. The air is always vibrant with the scent of the mountain mist and the silent, heavy energy of the towering Shiva.",
        "longDescription": "Siddhesvara Dham, located on the Solophok Hill near Namchi, was inaugurated in 2011 to promote spiritual tourism. The central attraction is the 108-foot tall seated statue of Lord Shiva (Kirateshwar), surrounded by replicas of the twelve Jyotirlingas. The complex also features scaled-down but highly detailed replicas of the four most sacred Hindu Dhams: Badrinath, Jagannath, Dwarka, and Rameshwaram. The site is a masterpiece of modern spiritual architecture, designed to provide a comprehensive pilgrimage experience in the heart of the Himalayas. Namchi (meaning Sky High) provides a celestial backdrop to this divine assembly, making it one of the most visited spiritual sites in the North East.",
        "spiritualArchitecture": "The architecture of Namchi is a spectacular display of the modern synthesis of traditional Indian styles. It features a grand central platform for the 108-foot Shiva statue, which is constructed with high-grade materials to withstand the mountain weather. The four Dhams are built according to their original architectural plans but on a smaller scale, using traditional stone carving techniques. A unique feature is the presence of the twelve Jyotirlinga shrines surrounding the main deity. The architecture is designed to handle large numbers of pilgrims while providing clear sightlines to the mountain peaks. The use of white marble, local stone, and vibrant landscaping creates a sense of a celestial garden that is both orderly and divine.",
        "vedicReferences": "Namchi is celebrated in the modern context as the site that unifies the geographic spiritual landscape of India into a single Himalayan point.",
        "deepInsights": "The giant Shiva looking over the replicas of the Dhams represents the truth that all paths and all sites emerge from the same source of consciousness. Namchi teaches that the spirit of pilgrimage is independent of distance.",
        "ancientLore": "Lore tells that the hill of Solophok was personally blessed by the Lord in his form as Kirateshwar (the hunter) during his meeting with Arjuna. Another legend says that the site was chosen because it aligns perfectly with the Kanchenjunga peak.",
        "keyRituals": [
                {
                        "name": "Maha Shivaratri (Namchi)",
                        "description": "The grandest annual celebration where the 108-foot Shiva is illuminated and worshipped throughout the night."
                },
                {
                        "name": "Char Dham Parikrama",
                        "description": "The ritual of visiting all four replica temples in a specific sequence to gain the merit of the national pilgrimage."
                },
                {
                        "name": "Jyotirlinga Abhishekam",
                        "description": "The daily ritual of offering sacred water to each of the twelve replica Jyotirlingas surrounding the main statue."
                },
                {
                        "name": "Evening Aarti (Siddhesvara)",
                        "description": "The prayer performed at the base of the giant Shiva as the sun sets over the Sikkim hills."
                }
        ],
        "highlights": [
                {
                        "name": "The 108-Foot Shiva",
                        "description": "The towering central statue of Lord Shiva, visible from miles away."
                },
                {
                        "name": "The Four Dham Replicas",
                        "description": "Detailed architectural replicas of Badrinath, Dwarka, Jagannath, and Rameshwaram."
                },
                {
                        "name": "The 12 Jyotirlingas",
                        "description": "A circle of shrines dedicated to the twelve self-manifested forms of Shiva."
                },
                {
                        "name": "Solophok Hill View",
                        "description": "The breathtaking panoramic perspective of the Himalayas from the temple complex."
                }
        ],
        "travelInfo": {
                "bestTime": "March to June and September to November.",
                "howToReach": "80km from Gangtok and 100km from Siliguri. Well connected by road; regular taxis and buses run from Gangtok and Namchi town.",
                "nearestAirport": "Pakyong Airport (local) / Bagdogra International Airport.",
                "nearestRailway": "New Jalpaiguri Junction (NJP)."
        },
        "tips": [
                "Visit in the early morning or late afternoon for the best views of the mountains and the giant statue.",
                "Carry a light jacket even in summer as the hill can get breezy and cool.",
                "The complex is very large; wear comfortable walking shoes to explore all the Dham replicas and the Jyotirlingas."
        ],
        "faqs": [
                {
                        "question": "How tall is the Shiva statue?",
                        "answer": "The statue is 108 feet tall, one of the tallest in the region."
                },
                {
                        "question": "Are these the real Char Dhams?",
                        "answer": "They are highly detailed replicas designed to provide the spiritual essence of the original sites to the people of the Himalayas."
                },
                {
                        "question": "Is there an entry fee?",
                        "answer": "There is a nominal entry fee for maintenance and development of the complex."
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
    'Rumtek Monastery', 
    'rumtek-monastery', 
    'Sacred Destination', 
    'sk', 
    'The seat of the 16th Karmapa and the largest monastery in Sikkim, Rumtek is a masterpiece of Tibetan Buddhist architecture. It is the headquarters of the Karma Kagyu lineage and a site of immense spiritual authority, representing the preservation of the Dharma in the Himalayan clouds.', 
    '880.5', 
    '230.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Dharma Chakra Centre and the Seat of the Black Crown', 
    'Rumtek Monastery Sikkim | Gangtok, Buddhism & Ancient Lore', 
    'Discover the spiritual power of Rumtek. Explore the seat of the Karmapa, the legend of the Black Crown, and the profound energy of the Karma Kagyu pilgrimage.', 
    'Rumtek, Sikkim, Buddhist, Karmapa, Gangtok, Hindu Pilgrimage, Ancient Lore, Monastery, Black Crown', 
    '166', 
    '{
        "spiritualEssence": "Rumtek is the manifestation of the divine as the supreme lineage and the absolute continuity of the teacher-disciple transmission. The energy here is regal, intense, and intensely focused on the practice of the Dharma. It is the site where the ancient wisdom of the Kagyu lineage found a new home in the hills of Sikkim. The vibration is one of ''Mahamudra'' (The Great Seal) and the absolute clarity of the Vajrayana. As a grand complex mirroring the original Tsurphu monastery in Tibet, it represents the spiritual resilience of the lineage. A visit here is believed to grant the devotee the connection to the lineage of the masters and the protection of the Black Crown. The air is always vibrant with the scent of the pine forests and the constant, deep sound of the monastic horns.",
        "longDescription": "Rumtek Monastery, also known as the Dharma Chakra Centre, was rebuilt in the 1960s by the 16th Karmapa, Rangjung Rigpe Dorje, who fled Tibet. It is a near-perfect replica of the Tsurphu Monastery in Tibet. The complex is famous for its Golden Stupa, which contains the relics of the 16th Karmapa, and its incredible collection of Thangkas, scriptures, and ritual objects. Rumtek is the site of the legendary ''Black Crown'' (Vajra Mukut), which is believed to have been woven from the hair of ten thousand dakinis and is used in specific high-level empowerment ceremonies. The monastery is a world center for the study of Buddhist philosophy and the practice of meditation, attracting seekers from every continent.",
        "spiritualArchitecture": "The architecture of Rumtek is a spectacular example of the traditional Tibetan monastic style combined with the unique Sikkimese landscape. It features a grand four-story assembly hall with a gold-plated roof and intricate wall paintings depicting the lineage of the Kagyu masters. The architecture is designed to facilitate the complex rituals and the mass gatherings of the Sangha. A unique feature is the presence of the Golden Stupa, encrusted with turquoise and coral, housed in a separate shrine. The use of vibrant primary colors (red, gold, blue) and the presence of massive prayer wheels create a sense of an otherworldly spiritual realm. The architecture is designed to lead the mind from the outer courtyard of active life to the inner sanctums of profound meditation.",
        "vedicReferences": "Rumtek is celebrated in the Tibetan Buddhist world as the ''Tsurphu of the South'' and the primary seat of the Buddha''s activity in the modern age.",
        "deepInsights": "The Black Crown represents the truth that the highest realization is invisible to the ordinary eye. Rumtek teaches that the Dharma is a living stream that flows across borders through the power of the lineage.",
        "ancientLore": "Lore tells that the 16th Karmapa chose the site for Rumtek because it featured seven auspicious signs, including a flowing stream and the protective mountain peaks that mirrored his original home in Tibet. Another legend says that the Black Crown can only be seen by those with a pure heart.",
        "keyRituals": [
                {
                        "name": "Black Crown Ceremony",
                        "description": "A rare and profound ritual where the Karmapa wears the Vajra Mukut to bless the congregation with the light of realization."
                },
                {
                        "name": "Gutor Mask Dance",
                        "description": "The spectacular ritual dance performed before the Tibetan New Year to clear the obstacles of the past year."
                },
                {
                        "name": "Dharma Chakra Chanting",
                        "description": "The daily collective ritual of the monks chanting the sacred verses in the main assembly hall."
                },
                {
                        "name": "Tara Puja",
                        "description": "Offering prayers to the Goddess Tara for protection and the swift removal of all spiritual blockages."
                }
        ],
        "highlights": [
                {
                        "name": "The Golden Stupa",
                        "description": "The magnificent 13-foot stupa containing the sacred relics of the 16th Karmapa."
                },
                {
                        "name": "The Main Assembly Hall",
                        "description": "A grand space filled with massive Buddha statues and ancient Thangkas."
                },
                {
                        "name": "The Nalanda Institute",
                        "description": "The prestigious center for higher Buddhist studies within the monastery complex."
                },
                {
                        "name": "Gangtok Viewpoint",
                        "description": "The spectacular view of the capital city of Sikkim from the monastery terraces."
                }
        ],
        "travelInfo": {
                "bestTime": "March to June and September to November.",
                "howToReach": "24km from Gangtok. Well connected by road; regular taxis and local buses run from Gangtok city center.",
                "nearestAirport": "Pakyong Airport (local) / Bagdogra International Airport.",
                "nearestRailway": "New Jalpaiguri Junction (NJP)."
        },
        "tips": [
                "Carry your identification (Passport/Aadhar) as there is a security check at the entrance due to the monastery''s significance.",
                "Visit in the late morning to witness the monks in study or debate; it is a fascinating look into the monastic life.",
                "The monastery has a beautiful guest house; consider staying overnight for a truly immersive spiritual experience."
        ],
        "faqs": [
                {
                        "question": "Who is the Karmapa?",
                        "answer": "He is the head of the Karma Kagyu lineage, the third most important figure in Tibetan Buddhism after the Dalai Lama and Panchen Lama."
                },
                {
                        "question": "What is the Black Crown?",
                        "answer": "A sacred crown believed to be a self-manifested spiritual object that grants liberation upon seeing (Mukti by Sight)."
                },
                {
                        "question": "Is it the largest in Sikkim?",
                        "answer": "Yes, it is the largest and most influential monastery in the state of Sikkim."
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
    'McLeod Ganj (Dharamshala)', 
    'mcleod-ganj-dharamshala', 
    'Sacred Destination', 
    'hp', 
    'The ''Little Lhasa'' and the global residence of His Holiness the Dalai Lama, McLeod Ganj is the spiritual capital of the Tibetan world in exile. Located in the Dhauladhar range, it is a site of immense compassion and universal peace, representing the global reach of the Buddhist message.', 
    '450.5', 
    '210.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Abode of Compassion and the Global Heart of the Dalai Lama', 
    'McLeod Ganj Dharamshala | Himachal Pradesh, Buddhism & Ancient Lore', 
    'Experience the profound energy of McLeod Ganj. Discover the Tsuglagkhang complex, the residence of the Dalai Lama, and the profound energy of the Himalayan pilgrimage.', 
    'McLeod Ganj, Dharamshala, Himachal Pradesh, Buddhist, Dalai Lama, Tibetan Exile, Hindu Pilgrimage, Ancient Lore', 
    '167', 
    '{
        "spiritualEssence": "McLeod Ganj is the manifestation of the divine as the supreme compassion (Karuna) and the absolute resilience of the peaceful heart. The energy here is global, intellectual, and intensely compassionate. It is the site where the ancient wisdom of Tibet was saved and shared with the entire world. The vibration is one of ''Metta'' (Loving Kindness) and the absolute commitment to non-violence. As a town clinging to the pine-forested slopes of the Himalayas, it represents the bridge between the local and the global. A visit here is believed to grant the devotee the sense of the interconnectedness of all life and the inspiration for a life of kindness. The air is always vibrant with the scent of the butter tea and the constant, melodic chanting of Om Mani Padme Hum.",
        "longDescription": "McLeod Ganj, a suburb of Dharamshala in Himachal Pradesh, became the residence of the 14th Dalai Lama in 1960. The town is the headquarters of the Tibetan Government-in-Exile and a world-renowned center for the study of Buddhism. The main spiritual site is the Tsuglagkhang Complex, which includes the Dalai Lama''s temple, the Namgyal Monastery, and the Tibet Museum. The town is famous for its vibrant Tibetan culture, featuring numerous monasteries, meditation centers, and shops selling traditional arts. McLeod Ganj is a site where the tragedy of exile has been transformed into a global message of peace, attracting thousands of international seekers who come to attend the Dalai Lama''s public teachings and experience the unique spiritual energy of the Dhauladhar mountains.",
        "spiritualArchitecture": "The architecture of McLeod Ganj is a unique blend of British colonial style and traditional Tibetan monastic design. The Tsuglagkhang complex is a simple but powerful structure built of local stone and wood, featuring massive prayer wheels and spectacular gilded statues of the Buddha, Padmasambhava, and Avalokiteshvara. The architecture is designed to be accessible and humble, reflecting the values of the Dalai Lama. A unique feature is the presence of the ''Lingkhor'' (sacred path) that circumambulates the entire complex, lined with hundreds of prayer wheels and small shrines. The use of vibrant Tibetan colors against the dark green of the Himalayan deodar forests creates a unique and peaceful visual spiritual landscape. The architecture is designed to facilitate both the massive public gatherings and the quiet, solitary meditation of the monks.",
        "vedicReferences": "McLeod Ganj is celebrated in the modern spiritual world as the ''Nalanda of the West'' where the ancient logic and compassion traditions are preserved.",
        "deepInsights": "The presence of the Dalai Lama in a simple mountain town represents the truth that the highest spiritual authority is found in humility and peace. McLeod Ganj teaches that a home can be built anywhere when the heart is full of compassion.",
        "ancientLore": "Lore tells that the Dalai Lama personally chose this site because the Dhauladhar mountains reminded him of the sacred peaks of Lhasa. Another legend says that the natural spring water of the town contains the blessings of the white Tara.",
        "keyRituals": [
                {
                        "name": "The Kora (Tsuglagkhang)",
                        "description": "The ritual circumambulation of the Dalai Lama''s temple complex, performed by hundreds of locals and pilgrims every morning and evening."
                },
                {
                        "name": "Public Teachings",
                        "description": "The unique modern ritual of attending the Dalai Lama''s discourses on Buddhist philosophy and practice."
                },
                {
                        "name": "Kalachakra Initiation",
                        "description": "The grand and rare empowerment ceremony performed by the Dalai Lama to bring peace to the world."
                },
                {
                        "name": "Lighting of Butter Lamps",
                        "description": "The daily ritual of offering lamps at the main temple for the long life of the teacher and the peace of the world."
                }
        ],
        "highlights": [
                {
                        "name": "Tsuglagkhang Complex",
                        "description": "The spiritual heart of the town, housing the Dalai Lama''s temple and the Namgyal Monastery."
                },
                {
                        "name": "The Namgyal Monastery",
                        "description": "The personal monastery of the Dalai Lama, famous for its intricate sand mandalas and debating monks."
                },
                {
                        "name": "Tibet Museum",
                        "description": "A powerful site documenting the history and the spiritual journey of the Tibetan people."
                },
                {
                        "name": "Dhauladhar Range Views",
                        "description": "The spectacular snow-capped peaks that form the constant backdrop to the town''s spiritual life."
                }
        ],
        "travelInfo": {
                "bestTime": "March to June and September to November.",
                "howToReach": "10km from Dharamshala city center. Well connected by road; regular buses and taxis run from Pathankot (90km) and Delhi (480km).",
                "nearestAirport": "Gaggal Airport (Dharamshala).",
                "nearestRailway": "Pathankot Junction / Pathankot Cantt."
        },
        "tips": [
                "Check the Dalai Lama''s official schedule for public teachings; they are free but require registration at his office in the town.",
                "Take part in the morning Kora with the locals; it is the most authentic way to experience the heartbeat of the spiritual life here.",
                "Visit the Norbulingka Institute nearby to see the preservation of traditional Tibetan arts like Thangka painting and wood carving."
        ],
        "faqs": [
                {
                        "question": "Does the Dalai Lama live here?",
                        "answer": "Yes, McLeod Ganj has been his official residence and the headquarters of the Tibetan Government-in-Exile since 1960."
                },
                {
                        "question": "What is ''Little Lhasa''?",
                        "answer": "It is the nickname for McLeod Ganj due to its large Tibetan population and its role as the spiritual capital of the Tibetan world."
                },
                {
                        "question": "Is it part of Dharamshala?",
                        "answer": "Yes, it is the upper suburb of the city of Dharamshala, situated about 500 meters higher in altitude."
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
    'Ambaji', 
    'ambaji', 
    'Sacred Destination', 
    'gj', 
    'One of the 51 Shakti Peethas, Ambaji is unique as it contains no idol but a sacred Yantra (the Vishwa Yantra). Located on the Arasur hills, it is the heart of Gujarati spiritual culture and a site of immense primal power where the heart of Sati is believed to have fallen.', 
    '280.5', 
    '380.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of Gujarat and the Sacred Yantra of the Arasur Hills', 
    'Ambaji Temple | Gujarat, Shakti Peeth & Ancient Lore', 
    'Experience the profound power of Ambaji. Discover the sacred Vishwa Yantra, the legend of the heart of Sati, and the profound energy of the Arasur hill pilgrimage.', 
    'Ambaji, Gujarat, Shakti Peeth, Arasur, Hindu Pilgrimage, Ancient Lore, Vishwa Yantra, Mother Goddess', 
    '168', 
    '{
        "spiritualEssence": "Ambaji is the manifestation of the divine as the formless power and the absolute presence of the supreme mother. The energy here is vibrant, maternal, and intensely ancient. It is the site where the heart of the universe (Sati''s heart) was anchored. The vibration is one of ''Arupi'' (Formless) and the absolute source of all forms. As a temple that worships a sacred Yantra rather than an idol, it represents the highest level of Tantric realization where the symbol becomes the reality. A visit here is believed to grant the devotee the absolute emotional stability and the protection of the Mother. The air is always vibrant with the scent of the incense and the constant, rhythmic chanting of Jai Ambe.",
        "longDescription": "Ambaji is situated in the Banaskantha district of Gujarat, near the border with Rajasthan. The main temple is built of white marble with gold cones. A unique feature is that there is no image or statue of the Goddess; instead, a sacred ''Vishwa Yantra'' is worshipped, which is covered with clothes and ornaments to look like an idol. The Yantra is never to be seen by the naked eye; worship is done with eyes closed or while wearing a blindfold in certain high-rituals. Nearby is the Gabbar Hill, where the Goddess is believed to have first manifested and where her heart fell. The temple is famous for its grand Navratri celebrations and the massive Purnima fairs where millions of pilgrims walk hundreds of kilometers to offer their prayers.",
        "spiritualArchitecture": "The architecture of Ambaji is a spectacular display of the Nagar style with modern marble refinements. The main temple features a grand shikhara and a spacious mandapam with intricate carvings on the pillars and ceilings. The architecture is designed to emphasize the central sanctum where the Yantra is kept. A unique feature is the use of white marble that glows under the sun and the moon. The complex includes several smaller shrines and a massive courtyard for the pilgrims. The architecture is designed to manage the flow of millions while maintaining the intense focus on the formless deity. The Gabbar hill features a series of steps and a ropeway, leading to the spot where the eternal lamp (Akhand Jyot) burns.",
        "vedicReferences": "Ambaji is celebrated in the Devi Bhagavata and the Skanda Purana as one of the primary sites where the Mother Goddess resides in her most potent form.",
        "deepInsights": "The worship of the Yantra represents the truth that the divine is beyond all physical attributes yet accessible through sacred symbols. Ambaji teaches that the heart of the devotee is the true seat of the Goddess.",
        "ancientLore": "Lore tells that the Goddess personally appeared to help the Pandavas during their exile. Another legend says that the sage Vishwamitra performed intense penance here to invoke the cosmic power of the Mother.",
        "keyRituals": [
                {
                        "name": "Vishwa Yantra Pujan",
                        "description": "The unique daily ritual of decorating and worshipping the formless Yantra as the living Mother."
                },
                {
                        "name": "Gabbar Hill Parikrama",
                        "description": "The ritual of circumambulating the Gabbar hill, which is believed to be the original site of the Goddess."
                },
                {
                        "name": "Navratri Garba",
                        "description": "The world-famous annual dance-ritual performed in the temple courtyard to celebrate the victory of the Mother."
                },
                {
                        "name": "Purnima Fair",
                        "description": "The massive monthly gathering where pilgrims offer silk flags and coconuts to the deity."
                }
        ],
        "highlights": [
                {
                        "name": "The Sacred Vishwa Yantra",
                        "description": "The formless central object of worship, believed to be intensely powerful."
                },
                {
                        "name": "Gabbar Hill",
                        "description": "The sacred hill near the temple where the heart of Sati fell."
                },
                {
                        "name": "The Akhand Jyot",
                        "description": "The eternal flame that has been burning for centuries on the Gabbar hill."
                },
                {
                        "name": "Chachar Chowk",
                        "description": "The massive courtyard where the main rituals and dances are performed."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Navratri).",
                "howToReach": "Well connected by road from Ahmedabad (180km) and Mount Abu (45km). Abu Road is the nearest railway station.",
                "nearestAirport": "Sardar Vallabhbhai Patel International Airport, Ahmedabad.",
                "nearestRailway": "Abu Road Railway Station."
        },
        "tips": [
                "Be prepared for long queues during the Navratri festival; the atmosphere is ecstatic but crowded.",
                "Take the ropeway to Gabbar Hill for a spectacular view of the Arasur mountains.",
                "Respect the traditions of the temple; photography is strictly prohibited in the main sanctum."
        ],
        "faqs": [
                {
                        "question": "Where is the idol?",
                        "answer": "There is no idol in Ambaji; the Goddess is worshipped in the form of a sacred Yantra."
                },
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the 51 primary Shakti Peethas, where the heart of Goddess Sati is believed to have fallen."
                },
                {
                        "question": "How to reach Gabbar Hill?",
                        "answer": "You can either climb the 999 steps or take the ropeway service available at the base."
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
    'Nalanda', 
    'nalanda', 
    'Sacred Destination', 
    'br', 
    'The site of the world''s first residential university, Nalanda is the cradle of Buddhist and Vedic scholarship. It is a site of absolute intellectual brilliance and spiritual depth, where the greatest minds of Asia gathered to study the Dharma and the sciences.', 
    '650.2', 
    '330.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The University of Enlightenment and the Light of Ancient Asia', 
    'Nalanda University Ruins | Bihar, Buddhism & Ancient Lore', 
    'Experience the profound wisdom of Nalanda. Discover the ruins of the world''s first university, the legend of the 10,000 students, and the profound energy of the intellectual pilgrimage.', 
    'Nalanda, Bihar, Buddhist, University, Xuanzang, Hindu Pilgrimage, Ancient Lore, Knowledge', 
    '169', 
    '{
        "spiritualEssence": "Nalanda is the manifestation of the divine as the supreme intellect and the absolute power of the refined mind. The energy here is silent, expansive, and intensely scholarly. It is the site where the breath of the Buddha was translated into the logic of the sages. The vibration is one of ''Bodhi-Jnana'' (The Wisdom of Enlightenment) and the absolute continuity of the teacher-disciple tradition. As a landscape of red-brick ruins and ancient meditation cells, it represents the spiritual battery of the ancient world. A visit here is believed to grant the devotee the clarity of thought and the blessing of the great masters like Nagarjuna and Aryadeva. The air is always vibrant with the silent echoes of the thousands of students who once debated these grounds.",
        "longDescription": "Nalanda, established in the 5th century CE, was a global center of learning for over 700 years. It housed over 10,000 students and 2,000 teachers from as far as Korea, Japan, and Turkey. The university was famous for its massive library, the ''Dharma Gunj'' (Mountain of Truth), which was said to have burned for months when the university was destroyed in the 12th century. Nalanda was the heart of Mahayana Buddhism, but it also taught the Vedas, grammar, medicine, and logic. The site was visited and documented extensively by the Chinese traveler Xuanzang. Today, the ruins covering 14 hectares are a UNESCO World Heritage site, standing as a testament to the peak of Indian civilization.",
        "spiritualArchitecture": "The architecture of Nalanda is a spectacular example of the classical red-brick monastic style. It features a series of massive monasteries (Viharas) and temples (Chaityas) organized in a linear pattern. Each monastery is a square complex with a central courtyard surrounded by meditation cells for the monks. A unique feature is the presence of the Sariputra Stupa, a tiered structure with multiple smaller shrines and intricate stucco figures. The architecture is designed for both communal study and solitary meditation, with a sophisticated system of drainage and granaries. The use of precisely baked red bricks and the grand scale of the structures create a sense of a spiritual city that was built to last for eternity.",
        "vedicReferences": "Nalanda is celebrated in the modern context as the site where the logic of the Vedas and the compassion of the Buddha were unified into a single educational system.",
        "deepInsights": "The ruins of Nalanda represent the truth that while the form can be destroyed, the knowledge that the form was built to hold remains eternal. Nalanda teaches that the highest spiritual practice is the refinement of the intellect.",
        "ancientLore": "Lore tells that the site was once a mango grove where the Buddha personally taught for many seasons. Another legend says that the university was protected by a dragon (Naga) who lived in the central pond, giving the site its name (Nalam-da, or Giver of Knowledge).",
        "keyRituals": [
                {
                        "name": "Vishwa Shanti Stupa Pilgrimage",
                        "description": "The ritual walk from the Nalanda ruins to the nearby Peace Pagoda in Rajgir."
                },
                {
                        "name": "Scholarly Meditation",
                        "description": "Meditating in the ancient cells to invoke the spirit of the great Buddhist logic masters."
                },
                {
                        "name": "Xuanzang Memorial Visit",
                        "description": "Offering prayers at the modern memorial dedicated to the Chinese traveler who saved the history of the university."
                },
                {
                        "name": "Scripture Offering",
                        "description": "The symbolic ritual of offering books or knowledge at the site of the ancient library."
                }
        ],
        "highlights": [
                {
                        "name": "Sariputra Stupa",
                        "description": "The most iconic structure of the ruins, believed to contain the relics of the Buddha''s disciple."
                },
                {
                        "name": "Monastery Number 1",
                        "description": "The best-preserved monastic complex showing the life of the ancient students."
                },
                {
                        "name": "The Library Site",
                        "description": "The historic ground where the Mountain of Truth once stood."
                },
                {
                        "name": "Nalanda Archaeological Museum",
                        "description": "A treasure house containing the exquisite bronze and stone idols found at the site."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "90km from Patna and 15km from Rajgir. Well connected by road; regular buses and taxis run from Patna.",
                "nearestAirport": "Jay Prakash Narayan International Airport, Patna.",
                "nearestRailway": "Nalanda Railway Station / Rajgir Junction."
        },
        "tips": [
                "Hire a certified guide to understand the complex layout and the historical significance of the different monasteries.",
                "Visit the nearby Xuanzang Memorial Hall for a deeper understanding of the international impact of Nalanda.",
                "Be prepared for a lot of walking; carry water and wear a hat as the site is vast and open."
        ],
        "faqs": [
                {
                        "question": "Who destroyed Nalanda?",
                        "answer": "It was destroyed in the 12th century by the invading forces of Bakhtiyar Khalji."
                },
                {
                        "question": "How many students lived here?",
                        "answer": "At its peak, Nalanda had over 10,000 students and 2,000 teachers from all over Asia."
                },
                {
                        "question": "Is it a functioning university now?",
                        "answer": "A new Nalanda University has been established nearby, but the original site remains a protected archaeological ruin."
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
    'Borobudur', 
    'borobudur', 
    'Sacred Destination', 
    'int', 
    'The largest Buddhist temple in the world, Borobudur is a massive 9th-century structure in Indonesia. It is a site of absolute architectural and spiritual transcendence, representing the cosmic mountain and the path to Nirvana through its thousands of relief panels and stupas.', 
    '1100.2', 
    '650.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mountain of a Thousand Buddhas and the Path to the Infinite', 
    'Borobudur Temple Indonesia | Java, Buddhism & Ancient Lore', 
    'Experience the profound majesty of Borobudur. Discover the largest Buddhist temple, the legend of the hidden base, and the profound energy of the Javanese pilgrimage.', 
    'Borobudur, Indonesia, Java, Buddhist, UNESCO, Hindu Pilgrimage, Ancient Lore, Stupa', 
    '170', 
    '{
        "spiritualEssence": "Borobudur is the manifestation of the divine as the cosmic order and the absolute journey of the soul to enlightenment. The energy here is vast, symmetrical, and intensely serene. It is the site where the Buddhist philosophy was carved into the volcanic stone of Java. The vibration is one of ''Sunyata'' (Emptiness) and the absolute clarity of the path. As a massive stone lotus set in the Kedu Plain, it represents the spiritual heart of the Indonesian archipelago. A visit here is believed to grant the devotee the map of the consciousness and the removal of the layers of worldly desire. The air is always vibrant with the scent of the morning mist and the silent, heavy energy of the 504 Buddha statues.",
        "longDescription": "Borobudur was built in the 9th century during the reign of the Sailendra Dynasty. It was abandoned in the 14th century as the Javanese people converted to Islam and the temple was buried under volcanic ash and jungle. Rediscovered in 1814, it is now a UNESCO World Heritage site. The temple is built as a single massive stupa, which when viewed from above, takes the form of a giant tantric Buddhist Mandala. It features nine stacked platforms—six square and three circular—surmounted by a central dome. The temple is decorated with 2,672 relief panels and 504 Buddha statues. The central dome is surrounded by 72 Buddha statues, each seated inside a perforated stupa. Borobudur is a site where the Indian Gupta architecture meets the indigenous Javanese mountain worship.",
        "spiritualArchitecture": "The architecture of Borobudur is a spectacular display of the Mahayana Buddhist cosmology. It is built as a step pyramid with a total height of 35 meters. The architecture is designed to lead the pilgrim through the three levels of Buddhist cosmology: Kamadhatu (the world of desire), Rupadhatu (the world of forms), and Arupadhatu (the world of formlessness). A unique feature is the use of dark andesite stone and the precise interlocking joinery without the use of mortar. The relief carvings are considered the most complete and elegant in the world, depicting the life of the Buddha and various Jaina stories. The architecture is designed to be a physical path of circumambulation (Pradakshina), where the pilgrim walks over 5 kilometers to reach the summit.",
        "vedicReferences": "Borobudur is celebrated in the modern context as the supreme site where the Indian concepts of the Mandala and the Stupa were brought to their ultimate physical expression.",
        "deepInsights": "The transition from the square platforms to the circular ones represents the truth that the soul must move from the structured world of desire to the formless world of spirit. Borobudur teaches that the path to enlightenment is a steady, rhythmic climb.",
        "ancientLore": "Lore tells that the temple was built by a divine architect named Gunadharma, who is said to have personally carved the layout of the mountains to match the temple. Another legend says that if you can touch the Buddha inside the stupas at the top, your wishes will come true.",
        "keyRituals": [
                {
                        "name": "Waisak Celebration",
                        "description": "The grand annual festival celebrating the birth, enlightenment, and death of the Buddha, featuring thousands of monks lighting lanterns."
                },
                {
                        "name": "Ritual Circumambulation",
                        "description": "The 5-kilometer meditative walk around the nine levels of the temple while contemplating the relief panels."
                },
                {
                        "name": "Sunrise Meditation",
                        "description": "Meditating at the top level (Arupadhatu) as the sun rises over the Merapi and Merbabu volcanoes."
                },
                {
                        "name": "Monastic Chanting",
                        "description": "Participating in the collective chanting of the sacred sutras during specific full moon days."
                }
        ],
        "highlights": [
                {
                        "name": "The Great Stupa",
                        "description": "The massive central dome at the summit, representing the absolute reality."
                },
                {
                        "name": "The 72 Perforated Stupas",
                        "description": "Bell-shaped structures at the top circular levels, each housing a seated Buddha."
                },
                {
                        "name": "The Hidden Base Reliefs",
                        "description": "Ancient carvings at the foot of the temple that depict the laws of cause and effect (Karma)."
                },
                {
                        "name": "The Relief Galleries",
                        "description": "Miles of stone carvings depicting the Jataka tales and the life of Prince Siddhartha."
                }
        ],
        "travelInfo": {
                "bestTime": "April to October (Dry season).",
                "howToReach": "40km from Yogyakarta city center. Well connected by road; regular buses and taxis run from Yogyakarta.",
                "nearestAirport": "Yogyakarta International Airport (YIA).",
                "nearestRailway": "Yogyakarta Railway Station (Tugu)."
        },
        "tips": [
                "Visit at dawn for the famous Borobudur sunrise; the view of the mist-covered valley and the volcanoes is spiritual in itself.",
                "Hire a guide to explain the complex stories depicted in the relief panels; it is a literal stone book of wisdom.",
                "Dress respectfully and be prepared for a significant climb; the stone steps are steep and high."
        ],
        "faqs": [
                {
                        "question": "Who built Borobudur?",
                        "answer": "It was built by the Sailendra Dynasty between 750 and 850 CE."
                },
                {
                        "question": "How many Buddha statues are there?",
                        "answer": "There are 504 Buddha statues in total across the various levels of the temple."
                },
                {
                        "question": "Is it a temple or a tomb?",
                        "answer": "It is a temple and a stupa, designed to be a place of pilgrimage and a map of the Buddhist cosmos."
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
    'Shegaon (Gajanan Maharaj)', 
    'shegaon-gajanan-maharaj', 
    'Sacred Destination', 
    'mh', 
    'The spiritual home of the 19th-century saint Shri Gajanan Maharaj, Shegaon is a site of immense faith and discipline. It is where the saint entered Samadhi in 1910, promising to remain with his devotees, and it has since become a model of spiritual administration and selfless service.', 
    '380.5', 
    '460.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Living Samadhi of the Avadhuta and the Pride of Vidarbha', 
    'Shegaon Gajanan Maharaj Temple | Maharashtra, Vidarbha & Ancient Lore', 
    'Experience the profound peace of Shegaon. Discover the Samadhi of Gajanan Maharaj, the legend of the ''Gana Gana Ganat Bote'', and the profound energy of the modern pilgrimage.', 
    'Shegaon, Gajanan Maharaj, Maharashtra, Vidarbha, Hindu Pilgrimage, Ancient Lore, Samadhi, Discipline', 
    '171', 
    '{
        "spiritualEssence": "Shegaon is the manifestation of the divine as the supreme simplicity and the absolute availability of the saint to the common man. The energy here is quiet, orderly, and intensely devotional. It is the site where the boundary between the human and the divine was blurred by a simple Avadhuta. The vibration is one of ''Gana Gana Ganat Bote'' (The Divine resides in every heart). As a temple complex in the heart of Vidarbha, it represents the spiritual stability of the region. A visit here is believed to grant the devotee the removal of all worldly anxieties and the peace of the soul. The air is always vibrant with the scent of the incense and the constant, disciplined rhythm of the daily prayers.",
        "longDescription": "Shri Gajanan Maharaj appeared in Shegaon in 1878 as a young man and spent 32 years here. He is revered as an incarnation of Lord Ganesha or Dattatreya. The temple is built over the exact spot where he entered Samadhi. Shegaon is famous for its ''Anand Sagar'' spiritual park and the incredible management of the Sansthan, which runs schools, hospitals, and free meals (Anna Dana) for thousands. The discipline and cleanliness of the Shegaon temple are considered among the best in India. The temple remains a site of intense pilgrimage where the spirit of the saint is felt in every stone and every service provided to the pilgrims.",
        "spiritualArchitecture": "The architecture of Shegaon is a modern display of the traditional Maharashtrian stone style. The main temple is a grand structure with a white marble shikhara and an underground Samadhi hall. The architecture is designed to manage massive crowds with absolute order and cleanliness. A unique feature is the presence of the original items used by the Maharaj, preserved in a separate hall. The complex includes several prayer halls, a massive dining area, and the spectacular Anand Sagar gardens. The use of high-quality stone, marble, and the integration with modern facilities create a sense of a spiritual city that is both ancient and contemporary.",
        "vedicReferences": "Shegaon is celebrated in the modern Marathi spiritual literature (Gajanan Vijay) as the supreme site of the manifestation of the divine in the Kali Yuga.",
        "deepInsights": "The mantra ''Gana Gana Ganat Bote'' represents the truth that the divine is not distant but resides within the self. Shegaon teaches that true spirituality is found in the discipline of the mind and the service of others.",
        "ancientLore": "Lore tells that the Maharaj was first seen eating leftovers from a leaf, showing his absolute detachment from the world. Another legend says that he once brought a dead person back to life and stopped a runaway train through his spiritual power.",
        "keyRituals": [
                {
                        "name": "Samadhi Darshan",
                        "description": "The ritual of praying at the underground chamber where the saint entered eternal rest."
                },
                {
                        "name": "Gajanan Maharaj Pothi Path",
                        "description": "The daily collective reading of the life story of the Maharaj (Gajanan Vijay)."
                },
                {
                        "name": "Mahaprasad Seva",
                        "description": "Participating in the massive daily ritual of serving and eating the blessed food for free."
                },
                {
                        "name": "Shegaon Palkhi",
                        "description": "The grand annual walking pilgrimage from Shegaon to Pandharpur."
                }
        ],
        "highlights": [
                {
                        "name": "The Samadhi Temple",
                        "description": "The heart of the complex where the saint resides in his subtle form."
                },
                {
                        "name": "Anand Sagar",
                        "description": "A massive spiritual and cultural park with a lake and artificial hills."
                },
                {
                        "name": "The Original Relics",
                        "description": "A collection of items used by the Maharaj, including his wooden bed and clothes."
                },
                {
                        "name": "The Golden Shikhara",
                        "description": "The towering white and gold spire that dominates the Shegaon skyline."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Rishi Panchami).",
                "howToReach": "Well connected by rail and road; Shegaon is a major station on the Mumbai-Howrah line. Regular buses run from Nagpur (280km) and Akola (45km).",
                "nearestAirport": "Nagpur International Airport / Aurangabad Airport.",
                "nearestRailway": "Shegaon Railway Station."
        },
        "tips": [
                "Follow the strict discipline and queues of the temple; it is one of the most orderly sites in India.",
                "Spend a full day at Anand Sagar; it is a unique blend of spiritual education and natural beauty.",
                "Participate in the Anna Dana; the food is simple, sacred, and served with immense love."
        ],
        "faqs": [
                {
                        "question": "Who was Gajanan Maharaj?",
                        "answer": "He was a 19th-century saint of Maharashtra who taught the path of devotion and selfless service."
                },
                {
                        "question": "What is the meaning of Gana Gana Ganat Bote?",
                        "answer": "It is the mantra of the saint, meaning ''The individual soul is part of the divine soul residing in all''."
                },
                {
                        "question": "Is it easy to find accommodation?",
                        "answer": "Yes, the Sansthan provides extensive and high-quality accommodation for thousands of pilgrims at very low costs."
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
    'Dehu (Tukaram Maharaj)', 
    'dehu-tukaram-maharaj', 
    'Sacred Destination', 
    'mh', 
    'The birthplace and the site of the heavenly departure of Sant Tukaram, Dehu is the soul of the Varkari movement. Located on the banks of the Indrayani river near Pune, it is a site of immense Bhakti, where the simple verses of the Abhangas were transformed into the supreme philosophy of the common man.', 
    '300.2', 
    '690.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Abode of the Abhangas and the Gateway to the Varkari Spirit', 
    'Dehu Tukaram Maharaj Temple | Maharashtra, Pune & Ancient Lore', 
    'Experience the profound energy of Dehu. Discover the Gatha Mandir, the legend of the floating books, and the profound energy of the Bhakti pilgrimage.', 
    'Dehu, Tukaram Maharaj, Maharashtra, Pune, Varkari, Hindu Pilgrimage, Ancient Lore, Bhakti', 
    '172', 
    '{
        "spiritualEssence": "Dehu is the manifestation of the divine as the supreme devotion and the absolute power of the sacred word. The energy here is humble, poetic, and intensely musical. It is the site where the common language became the vehicle of God-realization. The vibration is one of ''Vitthala Vitthala'' and the absolute equality of all seekers. As a riverside town on the Indrayani, it represents the flow of the spirit into the daily life. A visit here is believed to grant the devotee the same unwavering faith that the saint had even in the face of absolute poverty. The air is always vibrant with the sound of the Veena and the constant, melodic chanting of the Abhangas.",
        "longDescription": "Dehu is the birthplace of Sant Tukaram, the 17th-century poet-saint of Maharashtra. He is famous for his Abhangas (short poems) dedicated to Lord Vitthala of Pandharpur. The town is home to the Gatha Mandir, a spectacular modern temple where the entire collection of his verses is carved into the marble walls. Dehu is also the site of the ''Viman Temple'', marking the spot where he is believed to have departed for the heavens in a divine chariot. The Indrayani river flowing beside the town is sacred, especially the spot where his books, thrown into the water by jealous rivals, are said to have floated back after 13 days of his meditation. Dehu is the starting point of the grand annual Palkhi procession to Pandharpur, a tradition that has continued for over 300 years.",
        "spiritualArchitecture": "The architecture of Dehu is a display of both ancient stone styles and modern marble grandeur. The Gatha Mandir is a unique structure built entirely of white marble, designed like a library of stone where each wall is an Abhanga. The architecture features a grand dome and intricate relief carvings of the life of the saint. A unique feature is the presence of the original house and the temple of Vithoba where Tukaram personally worshipped. The Indrayani ghats with their wide stone steps and the serene river view are integral to the spiritual layout. The use of light-colored stone and the presence of numerous open mandapams create a sense of a spiritual university of the masses.",
        "vedicReferences": "Dehu is celebrated in the modern Marathi literature as the site where the secrets of the Vedas were simplified into the language of the farmers.",
        "deepInsights": "The floating books represent the truth that the sacred word, when born of true realization, cannot be destroyed by the world. Dehu teaches that the highest form of worship is the singing of the divine name.",
        "ancientLore": "Lore tells that when Tukaram was leaving the world, a divine plane (Viman) appeared and he invited everyone to join him, but only he was ready. Another legend says that the Lord personally came to serve him in the form of a shepherd boy.",
        "keyRituals": [
                {
                        "name": "Dehu Palkhi Sohala",
                        "description": "The grand annual ritual of taking the footprints (Padukas) of the saint in a silver chariot to Pandharpur."
                },
                {
                        "name": "Gatha Pathan",
                        "description": "The collective ritual of singing the Abhangas in the Gatha Mandir, often accompanied by the Veena."
                },
                {
                        "name": "Indrayani Snanam",
                        "description": "Taking a ritual bath in the sacred river where the books of the saint were miraculously saved."
                },
                {
                        "name": "Bhajan Sandhya",
                        "description": "The evening gathering of the Varkaris for devotional singing and spiritual discourse."
                }
        ],
        "highlights": [
                {
                        "name": "Gatha Mandir",
                        "description": "The spectacular marble temple where all 4,000+ Abhangas of Tukaram are carved."
                },
                {
                        "name": "Viman Temple",
                        "description": "The shrine marking the spot of the saint''s heavenly departure."
                },
                {
                        "name": "Tukaram Maharaj Wada",
                        "description": "The ancestral home and the temple where the saint personally lived and prayed."
                },
                {
                        "name": "Indrayani River Ghats",
                        "description": "The peaceful stone steps leading to the sacred river of the Varkaris."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during the Ashadhi and Kartiki Ekadashi).",
                "howToReach": "30km from Pune city center. Well connected by road and local train (Dehu Road station). Regular buses run from Pune.",
                "nearestAirport": "Pune International Airport.",
                "nearestRailway": "Dehu Road Railway Station / Pune Junction."
        },
        "tips": [
                "Visit during the Palkhi departure (usually in June/July) to see the town in its full spiritual glory with thousands of Varkaris.",
                "Take the time to read at least a few Abhangas in the Gatha Mandir; they are the heart of the site.",
                "The town is very simple and rustic; respect the local Varkari culture and maintain a humble attitude."
        ],
        "faqs": [
                {
                        "question": "Who was Sant Tukaram?",
                        "answer": "He was a 17th-century Varkari saint and one of the greatest poets of India, who simplified spirituality for the masses."
                },
                {
                        "question": "What is an Abhanga?",
                        "answer": "It is a form of devotional poetry in Marathi that is ''un-broken'' (A-bhang) and rhythmic."
                },
                {
                        "question": "Is it near Pune?",
                        "answer": "Yes, it is about 30 kilometers from Pune and is easily accessible by road and rail."
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
    'Kataragama', 
    'kataragama', 
    'Sacred Destination', 
    'int', 
    'The most important multi-religious pilgrimage site in Sri Lanka, Kataragama is dedicated to Lord Murugan (Skanda). It is a site of absolute spiritual unity, where Hindus, Buddhists, and Muslims have gathered for centuries to seek the protection of the warrior god in the southern jungles.', 
    '950.5', 
    '920.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Jungle Shrine of the Warrior God and the Unity of Faith', 
    'Kataragama Temple Sri Lanka | Skanda, Murugan & Ancient Lore', 
    'Experience the profound energy of Kataragama. Discover the jungle shrine of Lord Murugan, the legend of the Vedda princess Valli, and the profound energy of the multi-religious pilgrimage.', 
    'Kataragama, Sri Lanka, Murugan, Skanda, Buddhist, Hindu Pilgrimage, Ancient Lore, Unity', 
    '173', 
    '{
        "spiritualEssence": "Kataragama is the manifestation of the divine as the supreme protector and the absolute unity of the diverse human spirit. The energy here is wild, fierce, and intensely primal. It is the site where the warrior god of the South chose to reside. The vibration is one of ''Veera'' (Heroism) and the absolute protection of the devotee. As a jungle shrine on the banks of the Menik Ganga, it represents the raw source of the sacred. A visit here is believed to grant the devotee the courage to overcome all inner and outer enemies. The air is always vibrant with the scent of the burning camphor and the constant, rhythmic sound of the ''Kavadi'' drums.",
        "longDescription": "Kataragama is situated in the Moneragala district of southern Sri Lanka. The main temple is dedicated to Skanda-Murugan (known as Katargama Deviyo to Buddhists). It is a rare site where the temple features no idol but a curtain (Tirassery) behind which the sacred power is believed to reside. Legend says that Murugan came to Sri Lanka to help the people and fell in love with a local Vedda princess named Valli. The site includes the ancient Kiri Vehera Stupa for Buddhists and a mosque for Muslims, representing a unique spiritual synthesis. The temple is famous for its grand annual Esala Pantoja festival, featuring spectacular fire-walking rituals and elephant processions through the jungle.",
        "spiritualArchitecture": "The architecture of Kataragama is a unique blend of South Indian Hindu and traditional Sri Lankan Buddhist styles. The main shrine is a simple structure with a tiled roof, emphasizing the sacred curtain rather than a grand shikhara. The architecture is designed to integrate with the surrounding jungle and the river. A unique feature is the presence of the seven-fold curtain depicting the God and his two consorts. The complex includes several separate shrines for the various deities and a massive open-air courtyard for the festivals. The use of wood, stone, and the vibrant colors of the ritual flags create a sense of an ancient, forest-bound sanctuary of the gods.",
        "vedicReferences": "Kataragama is celebrated in the Skanda Purana and local Sri Lankan legends as the supreme site where the Lord rested after his victory over the demon Surapadman.",
        "deepInsights": "The absence of an idol and the use of a curtain represent the truth that the divine is a presence that is felt rather than a form that is seen. Kataragama teaches that the sacred is found in the unity of the diverse paths.",
        "ancientLore": "Lore tells that the Lord personally chose the jungle of Kataragama to live with his bride Valli, away from the royal courts of the North. Another legend says that the river Menik Ganga (River of Gems) was formed by the tears of the Gods who were moved by the Lord''s victory.",
        "keyRituals": [
                {
                        "name": "Esala Festival (Kataragama)",
                        "description": "The spectacular 2-week annual festival featuring fire-walking, Kavadi dancing, and a grand elephant procession."
                },
                {
                        "name": "Menik Ganga Snanam",
                        "description": "The ritual of bathing in the ''River of Gems'' before entering the main shrine to purify the soul."
                },
                {
                        "name": "Fruit Basket Offering",
                        "description": "The traditional ritual of offering a basket of tropical fruits to the Lord, which is then returned as Prasadam."
                },
                {
                        "name": "Fire Walking (Kataragama)",
                        "description": "The extreme ritual of crossing a bed of glowing coals to prove one''s devotion and the protection of the God."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Shrine (Maha Devale)",
                        "description": "The heart of the complex where the sacred curtain is kept."
                },
                {
                        "name": "Kiri Vehera Stupa",
                        "description": "The ancient white Buddhist stupa believed to have been visited by the Buddha himself."
                },
                {
                        "name": "Valli Amma Cave",
                        "description": "A nearby cave temple dedicated to the Lord''s jungle bride, located on the Sella Kataragama hill."
                },
                {
                        "name": "The Menik Ganga",
                        "description": "The sacred river flowing beside the temple, known for its clear and healing waters."
                }
        ],
        "travelInfo": {
                "bestTime": "July to August (during the Esala Festival) and December to April.",
                "howToReach": "Well connected by road from Colombo (280km) and Kandy. Regular buses and taxis run from all major cities of Sri Lanka.",
                "nearestAirport": "Mattala Rajapaksa International Airport (HRI) / Colombo International Airport.",
                "nearestRailway": "Beliatta Railway Station (then 70km by road)."
        },
        "tips": [
                "Participate in the evening Pooja to experience the intense atmosphere of the drums and the camphor light.",
                "Dress in white or light-colored clothes, as is the tradition for pilgrims in Sri Lanka.",
                "Respect the sensitivities of all three religions (Hindu, Buddhist, Muslim) that share this sacred space."
        ],
        "faqs": [
                {
                        "question": "Who is Kataragama Deviyo?",
                        "answer": "It is the local name for Lord Murugan (Skanda), the warrior son of Shiva and Parvati."
                },
                {
                        "question": "Can I see the idol?",
                        "answer": "There is no idol in the main shrine; the deity is represented by a sacred curtain and is never shown to the public."
                },
                {
                        "question": "Is there an elephant procession?",
                        "answer": "Yes, during the Esala Festival in July/August, there are massive and spectacular elephant parades every night."
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
    'Lumbini', 
    'lumbini', 
    'Sacred Destination', 
    'int', 
    'The birthplace of Siddhartha Gautama, who became the Buddha, Lumbini is located in the plains of southern Nepal. It is a site of absolute peace and historical gravity, representing the beginning of the Buddhist spiritual revolution that changed the world.', 
    '620.5', 
    '280.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Garden of Peace and the Birthplace of the Enlightened One', 
    'Lumbini Temple Nepal | Buddha, Maya Devi & Ancient Lore', 
    'Experience the profound serenity of Lumbini. Discover the Maya Devi temple, the Ashoka Pillar, and the profound energy of the global Buddhist pilgrimage.', 
    'Lumbini, Nepal, Buddhist, Maya Devi, Buddha Birthplace, Hindu Pilgrimage, Ancient Lore, Peace', 
    '174', 
    '{
        "spiritualEssence": "Lumbini is the manifestation of the divine as the supreme potential and the absolute beginning of the path of liberation. The energy here is quiet, spacious, and intensely grounding. It is the site where the light of Asia first flickered in the physical world. The vibration is one of ''Karuna'' (Compassion) and the absolute purity of the origin. As a vast garden of international monasteries, it represents the global unity of the Buddhist spirit. A visit here is believed to grant the devotee the sense of their own potential for enlightenment and the removal of the seeds of suffering. The air is always vibrant with the scent of the lotus and the silent, heavy energy of the Ashokan stone.",
        "longDescription": "Lumbini is situated in the Kapilvastu district of Nepal. The central point is the Maya Devi Temple, marking the exact spot where Queen Maya Devi gave birth to Prince Siddhartha in 623 BCE. The temple houses an ancient stone relief depicting the birth and the marker stone identifying the exact location. Nearby is the Ashoka Pillar, installed by the Emperor Ashoka in 249 BCE to commemorate his pilgrimage. The site also features the Puskarni pond, where the Queen is said to have bathed before the birth. Today, Lumbini is a sprawling monastic zone where various Buddhist countries have built their own unique temples, representing the global reach of the Buddha''s message. It is one of the four primary pilgrimage sites for Buddhists worldwide.",
        "spiritualArchitecture": "The architecture of Lumbini is a display of both ancient archaeological ruins and modern international styles. The Maya Devi temple is a protective white structure built over the 2,500-year-old foundations. The architecture of the monastic zone is unique, featuring separate sectors for Mahayana and Theravada traditions, with temples built in the styles of Thailand, Burma, Japan, Korea, and Tibet. A unique feature is the presence of the World Peace Pagoda at the northern end of the complex. The use of local brick for the ruins and the diverse materials for the international temples create a sense of a global spiritual village. The architecture is designed as a vast park (the Lumbini Development Zone) to facilitate both silent meditation and communal study.",
        "vedicReferences": "Lumbini is celebrated in the Buddhist scriptures (Lalitavistara) as the garden of delight where the gods gathered to witness the birth of the Great Being.",
        "deepInsights": "The marker stone represents the truth that even the most vast spiritual movements have a specific, humble beginning in the physical world. Lumbini teaches that every soul has the capacity for the supreme awakening.",
        "ancientLore": "Lore tells that the Queen gave birth while holding the branch of a Sal tree and that the newborn Prince immediately took seven steps, and lotus flowers bloomed under his feet. Another legend says that the Ashoka Pillar was once topped by a horse capital, symbolizing the great departure.",
        "keyRituals": [
                {
                        "name": "Maya Devi Temple Prayer",
                        "description": "Meditating at the exact birthplace to invoke the potential of the Buddha-nature within oneself."
                },
                {
                        "name": "Ashoka Pillar Circumambulation",
                        "description": "The ritual of walking around the 2,200-year-old pillar to honor the protector of the Dharma."
                },
                {
                        "name": "Puskarni Pond Bathing",
                        "description": "Taking a ritual dip in the sacred pond to commemorate the purification of the Queen before the birth."
                },
                {
                        "name": "International Monastery Tour",
                        "description": "Visiting the various national temples to experience the diversity of the Buddhist world."
                }
        ],
        "highlights": [
                {
                        "name": "Maya Devi Temple",
                        "description": "The central shrine housing the birth marker stone and the ancient stone relief."
                },
                {
                        "name": "The Ashoka Pillar",
                        "description": "The historic stone pillar with an inscription identifying the site as the birthplace of the Buddha."
                },
                {
                        "name": "The Puskarni Pond",
                        "description": "The sacred pond where Queen Maya Devi and the infant Buddha were bathed."
                },
                {
                        "name": "The Eternal Peace Flame",
                        "description": "A continuously burning flame at the heart of the garden symbolizing the light of non-violence."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road from Siddharthanagar (Bhairahawa). Regular buses and taxis run from Kathmandu (280km) and Sunauli (Indian border, 25km).",
                "nearestAirport": "Gautam Buddha International Airport, Bhairahawa.",
                "nearestRailway": "Nautanwa Railway Station (India, 30km away)."
        },
        "tips": [
                "Obtain your Nepal visa in advance if coming from a non-SAARC country; if coming from India, ensure you have your Aadhar or Passport.",
                "Hire a bicycle or an e-rickshaw to explore the vast monastic zone; walking the entire distance can be tiring.",
                "Maintain absolute silence and respect the meditation environments of the various monasteries."
        ],
        "faqs": [
                {
                        "question": "When was Buddha born?",
                        "answer": "The Buddhist tradition records his birth in 623 BCE in the gardens of Lumbini."
                },
                {
                        "question": "Is it in India or Nepal?",
                        "answer": "Lumbini is located in southern Nepal, about 25 kilometers from the border with India (Sunauli)."
                },
                {
                        "question": "What is the Ashoka Pillar?",
                        "answer": "It is a massive stone pillar installed by the Indian Emperor Ashoka in 249 BCE to mark the exact site of the Buddha''s birth."
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
    'Tarkeshwar', 
    'tarkeshwar', 
    'Sacred Destination', 
    'wb', 
    'The most significant Shaiva pilgrimage site in West Bengal, Tarkeshwar is dedicated to Lord Taraknath (Shiva). It is a site of immense faith and physical endurance, famous for its Sravani Mela where millions of barefoot pilgrims carry Ganges water to offer to the self-manifested Lingam.', 
    '710.2', 
    '390.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lord of Redemption and the Soul of the Bengali Shaiva Spirit', 
    'Tarkeshwar Temple | West Bengal, Hooghly & Ancient Lore', 
    'Experience the profound energy of Tarkeshwar. Discover the self-manifested Lingam, the legend of the dream, and the profound energy of the Sravani pilgrimage.', 
    'Tarkeshwar, West Bengal, Hooghly, Lord Shiva, Taraknath, Hindu Pilgrimage, Ancient Lore, Sravani', 
    '175', 
    '{
        "spiritualEssence": "Tarkeshwar is the manifestation of the divine as the supreme redeemer and the absolute answer to the sincere prayer. The energy here is intense, earthy, and intensely popular. It is the site where the Lord revealed himself from the depths of the forest. The vibration is one of ''Tarak'' (The Savior) and the absolute resilience of the common man''s faith. As a temple that anchors the spiritual life of rural Bengal, it represents the unshakeable stability of the Shaiva spirit. A visit here is believed to grant the devotee the fulfillment of their deepest wishes and the removal of all suffering. The air is always vibrant with the scent of the bael leaves and the constant, rhythmic chanting of Bhole Baba Par Karega.",
        "longDescription": "The Taraknath temple was built in 1729 by Raja Bharamalla. Legend says that the self-manifested Lingam was discovered in a forest by a local man who saw a cow pouring milk on a stone every day. The Lord then appeared in a dream to the Raja and asked him to build a temple at the site. Tarkeshwar is particularly famous during the month of Sravan (July-August) and for the Charak festival. The most unique ritual is the ''Bol-Bhom'' pilgrimage, where devotees (often called Bom) carry water in decorated pots from the Ganges at Sheoraphuli, walking 38 kilometers barefoot to offer it to the Lingam. The temple is a site where the highest Shaivism is lived through the most humble and rigorous physical devotion.",
        "spiritualArchitecture": "The architecture of Tarkeshwar is a spectacular example of the traditional Bengali Atchala (eight-roofed) style. It features a grand structure with tiered roofs and a spacious Nat-Mandir (dance hall) for the pilgrims. The architecture is designed to manage massive crowds, especially during the Sravani Mela. A unique feature is the presence of the Dudhpukur, a sacred pond where the water is believed to have medicinal properties and is used for the purification of the pilgrims. The use of traditional brick and lime-plaster, often painted in vibrant colors, creates a sense of a spiritual center that is deeply integrated with the rural Bengali landscape. The architecture is designed to lead the pilgrim from the physical water (the pond) to the intense, dark sanctum of the Savior.",
        "vedicReferences": "Tarkeshwar is celebrated in the modern Bengali spiritual literature as the supreme site where the Lord Shiva personally intervenes in the lives of his devotees in the modern age.",
        "deepInsights": "The name ''Tarak'' represents the truth that the divine is the bridge that carries us across the ocean of life. Tarkeshwar teaches that the most arduous physical journey (the walk) leads to the most profound spiritual discovery.",
        "ancientLore": "Lore tells that the Lord personally protected the city from several invasions by manifesting a divine wall of fire. Another legend says that the water of the Dudhpukur once turned into milk to feed a hungry devotee who had no other food.",
        "keyRituals": [
                {
                        "name": "Bol-Bhom Yatra",
                        "description": "The rigorous barefoot walk from the Ganges to the temple while carrying sacred water in decorated pots."
                },
                {
                        "name": "Sravani Mela (Tarkeshwar)",
                        "description": "The massive month-long festival in July/August where millions offer Ganges water to the Lingam."
                },
                {
                        "name": "Charak Festival",
                        "description": "The extreme ritual of physical endurance and swinging from poles to honor the power of Shiva at the end of the year."
                },
                {
                        "name": "Dudhpukur Snanam",
                        "description": "Taking a ritual bath in the sacred pond to cure physical ailments before entering the temple."
                }
        ],
        "highlights": [
                {
                        "name": "The Swayambhu Lingam",
                        "description": "The self-manifested stone of Shiva that is the spiritual heart of the temple."
                },
                {
                        "name": "Dudhpukur",
                        "description": "The sacred medicinal pond located beside the temple complex."
                },
                {
                        "name": "The Nat-Mandir",
                        "description": "The massive open hall where the pilgrims gather for devotional singing."
                },
                {
                        "name": "The Raja''s Gate",
                        "description": "The grand entrance gate commemorating the founder of the temple."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (for pleasant weather) and July to August (for the full spiritual experience).",
                "howToReach": "Well connected by road and rail from Kolkata (60km). Regular local trains run from Howrah Station to Tarkeshwar.",
                "nearestAirport": "Netaji Subhash Chandra Bose International Airport, Kolkata.",
                "nearestRailway": "Tarkeshwar Railway Station."
        },
        "tips": [
                "If participating in the Bol-Bhom Yatra, be prepared for a physically demanding 38km walk; ensure you are fit and have local support.",
                "The temple gets incredibly crowded on Mondays; if you prefer a quiet experience, visit on a weekday morning.",
                "Visit the nearby shrines dedicated to Kali and Lakshmi to experience the full spiritual circuit of the town."
        ],
        "faqs": [
                {
                        "question": "Who is Taraknath?",
                        "answer": "It is a name for Lord Shiva, meaning ''The Savior'' or ''The Lord of Redemption''."
                },
                {
                        "question": "How far is it from Kolkata?",
                        "answer": "It is approximately 60 kilometers and takes about 2 to 2.5 hours by local train from Howrah."
                },
                {
                        "question": "Is the pond water medicinal?",
                        "answer": "Devotees believe that a bath in the Dudhpukur can cure several skin and stomach ailments through the grace of the Lord."
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
    'Pavagadh (Kalika Mata)', 
    'pavagadh-kalika-mata', 
    'Sacred Destination', 
    'gj', 
    'Located on a spectacular cliff in the Panchmahal district of Gujarat, Pavagadh is home to the ancient Kalika Mata temple. It is one of the 51 Shakti Peethas and a site of immense primal power, where the Goddess is worshipped on the peak of a volcanic hill overlooking the historic city of Champaner.', 
    '270.2', 
    '410.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of the Peak and the Ancient Power of Champaner', 
    'Pavagadh Kalika Mata Temple | Gujarat, Shakti Peeth & Ancient Lore', 
    'Experience the profound majesty of Pavagadh. Discover the cliffside temple of Mahakali, the UNESCO ruins of Champaner, and the profound energy of the Shakti pilgrimage.', 
    'Pavagadh, Gujarat, Kalika Mata, Champaner, Shakti Peeth, Hindu Pilgrimage, Ancient Lore, Mahakali', 
    '176', 
    '{
        "spiritualEssence": "Pavagadh is the manifestation of the divine as the supreme peak and the absolute power of the fierce mother. The energy here is high-altitude, raw, and intensely vibrant. It is the site where the great mother watches over the plains from her mountain throne. The vibration is one of ''Kali'' (The Consumer of Time) and the absolute victory of the spirit. As a temple set on the tip of a vertical cliff, it represents the height of the spiritual aspiration. A visit here is believed to grant the devotee the absolute fearlessness and the protection of the fierce mother. The air is always vibrant with the wind of the plateau and the constant, rhythmic sound of the bells echoing across the Champaner ruins.",
        "longDescription": "Pavagadh hill is a dormant volcanic peak that rises 800 meters above the surrounding plains. The Kalika Mata temple is one of the three most important Shakti Peethas of Gujarat (along with Ambaji and Bahucharaji). It is believed to be the site where the great toe of Goddess Sati fell. The temple is reached by climbing over 2,000 steps or by a modern ropeway. The hill is also home to several ancient Jain temples and the UNESCO World Heritage site of Champaner-Pavagadh, featuring spectacular mosques and fortifications from the 15th century. Pavagadh is a site where the Hindu, Jain, and Islamic histories are layered upon each other on a single magnificent mountain.",
        "spiritualArchitecture": "The architecture of Pavagadh is a spectacular display of the ancient hill-fort style with modern stone refinements. The main temple is a simple but powerful structure that is built into the rock of the peak. The architecture is designed to facilitate the flow of the thousands of pilgrims who climb the hill every day. A unique feature is the presence of the grand shikhara which was recently renovated to include a golden flag-mast (Dhwaja-danda). The complex includes several open platforms that offer 360-degree views of the Gujarat plains. The use of local basalt stone and the integration with the natural caves create a sense of a spiritual fortress that is anchored to the primal earth.",
        "vedicReferences": "Pavagadh is celebrated in the local Gujarati Garba literature and is considered a primary site for the worship of the Goddess in her Mahakali form.",
        "deepInsights": "The climb to the peak represents the truth that the realization of the Mother requires the steady and difficult ascent of the soul. Pavagadh teaches that the highest perspective is reached through the most arduous effort.",
        "ancientLore": "Lore tells that the sage Vishwamitra personally installed the idol of Kalika Mata on the peak after performing intense penance. Another legend says that the mountain is a piece of the Gandhamadana hill carried by Hanuman.",
        "keyRituals": [
                {
                        "name": "Navratri Garba (Pavagadh)",
                        "description": "The unique annual dance-ritual where devotees from across Gujarat climb the hill to dance for the Mother."
                },
                {
                        "name": "Shakti Peeth Parikrama",
                        "description": "The ritual of walking around the various shrines on the hill to complete the Shakti circuit."
                },
                {
                        "name": "Abhishek with Kumkum",
                        "description": "The daily ritual of offering red vermilion to the Goddess to invoke her fierce and protective power."
                },
                {
                        "name": "Evening Aarti (The Peak)",
                        "description": "The prayer performed at the summit as the sun sets over the ruins of Champaner."
                }
        ],
        "highlights": [
                {
                        "name": "Kalika Mata Main Shrine",
                        "description": "The ancient temple at the very tip of the Pavagadh peak."
                },
                {
                        "name": "The Pavagadh Ropeway",
                        "description": "The spectacular ride that carries pilgrims from the base to the plateau near the temple."
                },
                {
                        "name": "Dudhiya Talav",
                        "description": "A sacred white water pond located on the plateau, believed to have medicinal value."
                },
                {
                        "name": "Champaner Ruins",
                        "description": "The historic UNESCO city at the base of the hill, featuring the grand Jami Masjid."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Navratri).",
                "howToReach": "45km from Vadodara. Well connected by road; regular buses and taxis run from Vadodara and Halol.",
                "nearestAirport": "Vadodara Airport (BDQ) / Ahmedabad Airport.",
                "nearestRailway": "Vadodara Junction."
        },
        "tips": [
                "Use the ropeway if you have limited time or have elderly pilgrims; the view from the cabin is breathtaking.",
                "Be prepared for monkeys on the climb; keep your food and offerings inside your bag.",
                "Visit the Champaner archaeological park at the base after your descent; it is one of the most important historical sites in India."
        ],
        "faqs": [
                {
                        "question": "How many steps to the top?",
                        "answer": "There are approximately 2,000 steps from the base to the temple peak."
                },
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the 51 primary Shakti Peethas, marking the spot where the great toe of Goddess Sati fell."
                },
                {
                        "question": "Is there a ropeway?",
                        "answer": "Yes, there is a modern ropeway service that takes you most of the way up the hill."
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
    'Mount Sinai', 
    'mount-sinai', 
    'Sacred Destination', 
    'int', 
    'Known as the ''Mountain of Moses'' (Jabal Musa), Mount Sinai is one of the most important spiritual sites in the world. Located in the Sinai Peninsula of Egypt, it is where the Ten Commandments were revealed, representing the absolute source of the law and the covenant in the Abrahamic traditions.', 
    '1500.2', 
    '450.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mountain of the Commandments and the Peak of Revelation', 
    'Mount Sinai Egypt | Moses, St. Catherine & Ancient Lore', 
    'Experience the profound gravity of Mount Sinai. Discover the site of the Ten Commandments, the burning bush, and the profound energy of the desert pilgrimage.', 
    'Mount Sinai, Egypt, Moses, St. Catherine, Ten Commandments, Global Spiritual, Ancient Lore, Revelation', 
    '177', 
    '{
        "spiritualEssence": "Mount Sinai is the manifestation of the divine as the supreme law and the absolute clarity of the command. The energy here is stark, silent, and intensely powerful. It is the site where the voice of the divine was translated into the ethical foundations of civilization. The vibration is one of ''Kavod'' (Glory) and the absolute authority of the sacred word. As a granite peak in the heart of the desert, it represents the spiritual stability of the human spirit. A visit here is believed to grant the devotee the sense of the absolute moral order and the removal of the confusion of the material world. The air is always vibrant with the scent of the dry mountain air and the silent, heavy energy of the ancient granite.",
        "longDescription": "Mount Sinai, rising 2,285 meters in the southern Sinai Peninsula, is sacred to Jews, Christians, and Muslims. According to the Torah and the Quran, it is the mountain where God gave Moses the Ten Commandments. At the foot of the mountain lies Saint Catherine''s Monastery, the oldest continuously inhabited Christian monastery in the world, founded by Emperor Justinian in the 6th century. The monastery houses the legendary ''Burning Bush'' and one of the world''s most important libraries of ancient manuscripts. Mount Sinai is a site where the raw power of the desert landscape and the profound weight of history create an atmosphere of intense, primordal faith.",
        "spiritualArchitecture": "The architecture of the Sinai complex is a display of both natural granite majesty and the fortress-like Byzantine style of Saint Catherine''s. The monastery features massive defensive walls, a grand basilica with spectacular mosaics, and a mosque built within the walls to protect the monks. A unique feature is the presence of the library, which contains thousands of priceless manuscripts in Greek, Arabic, and Syriac. The climb to the peak features the ''Steps of Penitence'', a series of 3,750 stone steps carved by a monk. The small chapel and mosque at the summit represent the unity of the seekers on the peak of revelation. The use of local granite and the integration with the vertical cliffs create a sense of a spiritual fortress that is part of the mountain itself.",
        "vedicReferences": "Mount Sinai is celebrated in the global spiritual context as the supreme site of the ''Word'' manifesting as the Law, mirroring the Vedic concept of Dharma.",
        "deepInsights": "The climb through the dark desert night to witness the sunrise on the peak represents the journey of the soul from the ignorance of the world to the light of truth. Sinai teaches that the divine is found in the absolute silence of the wilderness.",
        "ancientLore": "Lore tells that the mountain shook and was covered in smoke when the divine presence descended. Another legend says that the body of Saint Catherine was carried by angels to the nearby peak after her martyrdom.",
        "keyRituals": [
                {
                        "name": "Sunrise Ascent",
                        "description": "The ritual climb of the mountain during the night to reach the summit for the first light of dawn."
                },
                {
                        "name": "Burning Bush Prayer",
                        "description": "Praying at the site of the unconsumed flame at Saint Catherine''s to invoke the presence of the divine."
                },
                {
                        "name": "Monastic Vigil",
                        "description": "Participating in the ancient evening prayers and the silence of the Byzantine monks."
                },
                {
                        "name": "Steps of Penitence",
                        "description": "Climbing the 3,750 steps as a ritual of purification and spiritual effort."
                }
        ],
        "highlights": [
                {
                        "name": "The Summit (Jabal Musa)",
                        "description": "The 2,285-meter peak where the Ten Commandments were revealed."
                },
                {
                        "name": "Saint Catherine''s Monastery",
                        "description": "The UNESCO world heritage site and the fortress of the desert monks."
                },
                {
                        "name": "The Burning Bush",
                        "description": "A rare bramble bush believed to be the exact descendant of the one seen by Moses."
                },
                {
                        "name": "The Library of Icons",
                        "description": "A world-famous collection of ancient Christian icons and manuscripts."
                }
        ],
        "travelInfo": {
                "bestTime": "October to April (avoid the extreme summer heat).",
                "howToReach": "Well connected by road from Sharm El Sheikh (230km) and Dahab (130km). Guided tours are mandatory for night ascents.",
                "nearestAirport": "Sharm El Sheikh International Airport (SSH).",
                "nearestRailway": "None (Desert landscape; travel is by road only)."
        },
        "tips": [
                "Start your climb around 2:00 AM to reach the summit in time for the sunrise; the experience is legendary but requires good fitness.",
                "Carry a warm jacket and gloves; the temperature at the summit is freezing even if the desert is warm at the base.",
                "Respect the silence of the monastery and the security protocols of the Egyptian authorities in the Sinai region."
        ],
        "faqs": [
                {
                        "question": "How long is the climb?",
                        "answer": "The climb takes about 2 to 3 hours depending on your pace and the path you choose."
                },
                {
                        "question": "Can I ride a camel?",
                        "answer": "Yes, camels are available to take you about 70% of the way up the mountain; the final steps must be climbed on foot."
                },
                {
                        "question": "Is it safe?",
                        "answer": "The site is heavily guarded and remains a peaceful pilgrimage destination; always follow local travel advisories."
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
    'Janakpur', 
    'janakpur', 
    'Sacred Destination', 
    'int', 
    'The ancient capital of the Mithila Kingdom and the birthplace of Goddess Sita, Janakpur is the twin soul of Ayodhya. It is a site of absolute marital devotion and cultural brilliance, where the Ramayana comes alive in the spectacular Janaki Mandir and the sacred ponds of the Mithila plains.', 
    '640.5', 
    '270.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The City of Sita and the Cultural Cradle of Mithila', 
    'Janakpur Temple Nepal | Sita Birthplace, Ramayana & Ancient Lore', 
    'Experience the profound love of Janakpur. Discover the birthplace of Sita, the spectacular Janaki Mandir, and the profound energy of the Mithila pilgrimage.', 
    'Janakpur, Nepal, Sita, Janaki Mandir, Ramayana, Hindu Pilgrimage, Ancient Lore, Mithila', 
    '178', 
    '{
        "spiritualEssence": "Janakpur is the manifestation of the divine as the supreme daughter and the absolute grace of the feminine spirit. The energy here is soft, colorful, and intensely traditional. It is the site where the earth gave birth to the ideal woman. The vibration is one of ''Sita-Rama'' and the absolute sanctity of the household (Grihastha) Dharma. As a city of hundreds of sacred ponds (Pokharis), it represents the cooling presence of the divine mother in the heat of the plains. A visit here is believed to grant the devotee the blessing of a stable and harmonious family life and the grace of the Mother Earth. The air is always vibrant with the scent of the Mithila paintings and the constant, melodic chanting of the Ramayana verses.",
        "longDescription": "Janakpur, located in south-eastern Nepal, was the capital of King Janaka. The central attraction is the Janaki Mandir, a massive white temple built in 1910 in a unique blend of Mughal and Rajput styles, often called the ''Nau Lakha Mandir'' (Nine Lakh Temple) because of its construction cost. The site marks the exact location where the wedding of Rama and Sita took place. Janakpur is famous for its vibrant Mithila Art (Madhubani), which covers the walls of the city. The city features over 115 sacred ponds, with the Ganga Sagar and Dhanush Sagar being the most important. Every year, thousands of pilgrims from India and Nepal gather here for Vivaha Panchami, the anniversary of the divine wedding, making it the most important site for the Ramayana circuit outside India.",
        "spiritualArchitecture": "The architecture of Janakpur is a spectacular display of the late Indo-Islamic and Rajput styles. The Janaki Mandir is a three-storied structure with 60 rooms, featuring numerous turrets, domes, and arched windows. The architecture is designed to resemble a royal palace rather than a traditional Hindu temple, reflecting the status of Sita as the Princess of Mithila. A unique feature is the use of white-washed stone and the intricate plasterwork that covers every inch of the facade. The complex includes several smaller shrines, a museum, and a courtyard that can hold thousands of devotees. The architecture of the city is defined by its relation to the sacred ponds, which act as spiritual cooling centers for the community.",
        "vedicReferences": "Janakpur is celebrated in the Ramayana and the Vishnu Purana as the supreme site where the divine took birth as the daughter of the earth to restore the Dharma.",
        "deepInsights": "The city of Janakpur represents the truth that the divine is found in the refined culture and the sacred bonds of the family. Janakpur teaches that the highest form of devotion is the celebration of the divine marriage.",
        "ancientLore": "Lore tells that King Janaka found the baby Sita in a furrow of a field he was plowing for a ritual. Another legend says that the bow of Shiva, which Rama broke to win Sita''s hand, fell into the ground at Janakpur and formed the Dhanush Sagar pond.",
        "keyRituals": [
                {
                        "name": "Vivaha Panchami",
                        "description": "The grand annual celebration of the wedding of Rama and Sita, featuring a massive symbolic procession and wedding ceremony."
                },
                {
                        "name": "Mithila Painting Ritual",
                        "description": "The traditional art of painting the walls of the home and temple with sacred motifs to invite the blessing of the Goddess."
                },
                {
                        "name": "Ganga Sagar Aarti",
                        "description": "The evening prayer performed at the banks of the most sacred pond of Janakpur."
                },
                {
                        "name": "Janaki Darshan",
                        "description": "The daily ritual of offering prayers to the beautiful idols of Rama and Sita in the main sanctum."
                }
        ],
        "highlights": [
                {
                        "name": "Janaki Mandir",
                        "description": "The spectacular Nau Lakha temple that is the spiritual heart of the city."
                },
                {
                        "name": "Vivaha Mandap",
                        "description": "The exact spot where the divine wedding of Rama and Sita took place, marked by a marble shrine."
                },
                {
                        "name": "Ganga Sagar",
                        "description": "The largest and most sacred pond of the city, believed to contain the water of the Ganges."
                },
                {
                        "name": "Dhanush Sagar",
                        "description": "The sacred pond where the broken piece of Shiva''s bow is said to have fallen."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Vivaha Panchami in November/December).",
                "howToReach": "Well connected by road from India (Jayanagar, Bihar is only 30km away). Regular flights run from Kathmandu. The Jayanagar-Janakpur railway is a unique cross-border train experience.",
                "nearestAirport": "Janakpur Airport / Kathmandu International Airport.",
                "nearestRailway": "Janakpur Railway Station / Jayanagar (India)."
        },
        "tips": [
                "Participate in the Vivaha Panchami festival to see the city in its full cultural glory; be prepared for very large crowds.",
                "Explore the small streets of the city to see the incredible Mithila Art on the walls of the houses.",
                "Carry small change for the numerous small shrines and ponds that you will visit."
        ],
        "faqs": [
                {
                        "question": "Is Janakpur in India?",
                        "answer": "No, it is located in the Dhanusa district of southern Nepal, about 30 kilometers from the Indian border."
                },
                {
                        "question": "Who was King Janaka?",
                        "answer": "He was the philosopher-king of Mithila and the father of Goddess Sita."
                },
                {
                        "question": "What is Mithila Art?",
                        "answer": "It is a traditional style of folk painting characterized by geometric patterns and vibrant colors, representing spiritual stories."
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