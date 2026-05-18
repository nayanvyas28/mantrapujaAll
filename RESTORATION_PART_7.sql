-- RESTORATION PART 7
INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Melukote (Cheluvanarayana Swamy)', 
    'melukote', 
    'Sacred Destination', 
    'ka', 
    'Located on the rocky hills of the Mandya district, Melukote is the spiritual home of the great saint Ramanuja. It is where the Lord appeared to the saint in a dream and where the crown jewel ''Vairamudi'' is brought annually from the Mysore palace.', 
    '155.2', 
    '555.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hill of the Divine Jewel and the Great Saint', 
    'Melukote Cheluvanarayana Swamy | Karnataka, Ramanuja Lore & Ancient Lore', 
    'Experience the spiritual heritage of Melukote. Discover the Cheluvanarayana temple, the legend of the Vairamudi crown, and the profound legacy of the saint Ramanuja.', 
    'Melukote, Karnataka, Cheluvanarayana Swamy, Ramanuja, Hindu Pilgrimage, Ancient Lore, Vairamudi, Mandya', 
    '85', 
    '{
        "spiritualEssence": "Melukote is the manifestation of the divine as the supreme refuge (Sharanagati). The energy here is scholarly, intense, and deeply devotional. It is the site where the Sri Vaishnava tradition found a stronghold during a time of crisis. The vibration is one of ''Bhuloka Vaikuntha'' (Vaikuntha on Earth). As a hill town, it represents the elevated state of the surrender to the divine. A visit here is believed to grant the devotee the same grace and protection that the saint Ramanuja promised to all his followers. The air is always vibrant with the scent of the Puliyogare (tamarind rice) and the chanting of the Nalayira Divya Prabandham.",
        "longDescription": "Melukote, also known as Thirunarayanapuram, is a sacred site with a history dating back to the Puranas. In the 12th century, the great philosopher-saint Ramanuja lived here for 12 years after being forced to leave Tamil Nadu. He discovered the lost idol of Lord Cheluvanarayana Swamy in a mound of mud on the hill and restored the temple. The town is famous for the Vairamudi Utsavam, where the deity is adorned with a diamond-studded crown that is said to have been brought by Garuda from the milky ocean. The crown is kept in the Mysore palace and brought to Melukote under high security once a year. The town is also a major center for Sanskrit and Vedic learning, housing several traditional Gurukuls and the Academy of Sanskrit Research.",
        "spiritualArchitecture": "The temple is built in the Dravidian style with several Hoysala influences. It features a grand gopuram and a spacious pillared hall (Mandapam). The architecture is characterized by its rocky hilltop setting and the use of granite. A unique feature is the Yoganarasimha temple located on the highest peak of the hill, offering breathtaking views of the surrounding plains. The town itself is an architectural masterpiece of a traditional Vedic settlement, with narrow streets and ancient houses (Agraharas) centered around the temple and the sacred tank (Kalyani).",
        "vedicReferences": "Melukote is mentioned in the Narada Purana and is celebrated as one of the four most sacred sites (Divya Desams) for the Sri Vaishnava tradition in Karnataka.",
        "deepInsights": "The rediscovery of the idol from the mud represents the unveiling of the true self from the layers of the ego. Melukote teaches that the divine is always present, even when hidden by the dust of time.",
        "ancientLore": "Lore tells that the diamond crown (Vairamudi) cannot be seen by the human eye in its full radiance, and the priest who places it on the deity must be blindfolded. Another legend says that Ramanuja personally traveled to Delhi to recover the processional idol from the Sultan''s daughter, who had become devoted to it.",
        "keyRituals": [
                {
                        "name": "Vairamudi Utsavam",
                        "description": "The grand annual festival where the Lord is adorned with the legendary diamond crown."
                },
                {
                        "name": "Panchamrut Abhishekam",
                        "description": "The ritual bathing of the Yoganarasimha deity on the hilltop peak."
                },
                {
                        "name": "Tiruppavai Chanting",
                        "description": "The daily singing of the hymns of Andal, especially during the month of Margazhi."
                }
        ],
        "highlights": [
                {
                        "name": "Cheluvanarayana Swamy Temple",
                        "description": "The main shrine at the foot of the hill, associated with Ramanuja."
                },
                {
                        "name": "Yoganarasimha Temple",
                        "description": "The hilltop shrine dedicated to the fierce yet meditative form of Narasimha."
                },
                {
                        "name": "Melukote Kalyani",
                        "description": "The massive and beautiful sacred tank at the heart of the town."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and during Vairamudi Utsavam in March/April).",
                "howToReach": "50km from Mysore and 130km from Bangalore, well connected by road. Regular buses run from Mysore and Mandya.",
                "nearestAirport": "Mysore Airport / Bangalore International Airport.",
                "nearestRailway": "Mandya Railway Station / Mysore Junction."
        },
        "tips": [
                "Don''t miss the famous Melukote Puliyogare, which is served as prasadam and is a local culinary specialty.",
                "The climb to the Yoganarasimha temple is steep but paved; it offers the best view of the region.",
                "Visit the Academy of Sanskrit Research for a glimpse into ancient Vedic manuscripts."
        ],
        "faqs": [
                {
                        "question": "What is the Vairamudi?",
                        "answer": "It is a legendary diamond-studded crown that is placed on the deity once a year; it is kept in the Mysore palace for the rest of the year."
                },
                {
                        "question": "Did Ramanuja really live here?",
                        "answer": "Yes, he spent approximately 12 years in Melukote in the 12th century and established the spiritual protocols of the temple."
                },
                {
                        "question": "How many steps to the top temple?",
                        "answer": "There are approximately 300-400 steps to reach the Yoganarasimha temple at the peak."
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
    'Talakadu', 
    'talakadu', 
    'Spiritual City', 
    'ka', 
    'Located on the banks of the Kaveri, Talakadu is a mystical city of sand. Once a grand capital of the Ganga dynasty, it is famous for its five Shiva temples that remain buried under the sand dunes and are unearthed for the Panchalinga Darshana once every 12 years.', 
    '160.5', 
    '565.8', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mystical City of the Moving Sands', 
    'Talakadu | Karnataka, Panchalinga Darshana & Ancient Lore', 
    'Discover the mystery of Talakadu. Explore the buried Shiva temples, the legend of the curse of Alamelamma, and the profound energy of the shifting sand dunes.', 
    'Talakadu, Karnataka, Kaveri, Panchalinga Darshana, Lord Shiva, Hindu Pilgrimage, Ancient Lore, Sand Dunes', 
    '86', 
    '{
        "spiritualEssence": "Talakadu is the manifestation of the divine as the unshakeable truth amidst the shifting sands of time. The energy here is mysterious, quiet, and deeply evocative. It is the site of a powerful curse that transformed a fertile land into a desert. The vibration is one of ''Vairagya'' (Detachment) and the transience of material power. As a site where the temples are buried and revealed, it represents the soul that is hidden by the layers of the ego. A visit here is believed to grant the devotee the realization of the permanence of the spirit. The air is always vibrant with the scent of the dry sand and the silent flow of the Kaveri that bends here in a unique curve.",
        "longDescription": "Talakadu was once the flourishing capital of the Ganga dynasty. In the 17th century, according to legend, the Queen Alamelamma cursed the land when she was pursued by the Mysore army, saying: ''Let Talakadu become sand; let Malangi become a whirlpool; let the Mysore Rajas fail to produce heirs.'' To this day, Talakadu is covered by mysterious sand dunes despite being on the banks of a river, and the Mysore royal family has historically struggled to produce direct heirs. There are over 30 temples buried here, with the five most prominent ones (Vaidyanatheshwara, Pathaleshwara, Maruleshwara, Arkeshwara, and Mallikarjuna) being the center of the Panchalinga Darshana. This festival, occurring once every 12 years, attracts millions who walk across the sand to worship all five forms of Shiva.",
        "spiritualArchitecture": "The architecture of the Talakadu temples is a blend of Ganga and Chola styles, mostly made of granite. The temples are simple and sturdy, built to withstand the pressure of being buried under sand for years. The Vaidyanatheshwara temple is the largest and most prominent, featuring beautiful stone carvings and two massive monolithic dwarapalas. The most striking architectural feature of Talakadu is not the buildings themselves, but their constant battle with the natural environment, requiring them to be excavated periodically to allow for worship.",
        "vedicReferences": "Talakadu is mentioned in various Kannada and Tamil spiritual works and is considered a primary site for the study of the Shaivite traditions in Southern Karnataka.",
        "deepInsights": "The sand represents the material desires that bury our spiritual nature. Talakadu teaches that even when buried for centuries, the sacred remains intact and ready to be revealed to the seeker.",
        "ancientLore": "Lore tells of the two hunters, Tala and Kadu, who discovered a tree being worshipped by wild elephants; the Lord appeared to them, giving the city its name. Another legend is the living history of the Alamelamma curse, which remains a subject of great interest and debate among historians and locals alike.",
        "keyRituals": [
                {
                        "name": "Panchalinga Darshana",
                        "description": "The grand 12-year festival where devotees visit five specific Shiva temples between sunrise and sunset."
                },
                {
                        "name": "Kaveri Snanam",
                        "description": "Taking a ritual bath in the unique curve of the river before visiting the sand-temples."
                },
                {
                        "name": "Shravana Masam Puja",
                        "description": "Special rituals performed during the auspicious rainy season when the sands are cool."
                }
        ],
        "highlights": [
                {
                        "name": "Buried Shiva Temples",
                        "description": "Over 30 stone temples that remain mostly hidden under shifting sand dunes."
                },
                {
                        "name": "Vaidyanatheshwara Temple",
                        "description": "The most prominent excavated temple, known for its healing powers."
                },
                {
                        "name": "The Sand Dunes",
                        "description": "A unique geological phenomenon where desert-like dunes exist in a river valley."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "45km from Mysore and 130km from Bangalore, well connected by road.",
                "nearestAirport": "Mysore Airport / Bangalore International Airport.",
                "nearestRailway": "Mysore Junction."
        },
        "tips": [
                "Wear comfortable footwear suitable for walking on sand.",
                "Visit during a weekday to enjoy the quiet and mystical atmosphere of the dunes.",
                "Combine your visit with Shivanasamudra Falls located nearby."
        ],
        "faqs": [
                {
                        "question": "Why is there sand in Talakadu?",
                        "answer": "Spiritually it is attributed to the curse of Queen Alamelamma; geologically it is a rare case of riverine sand accumulation due to a specific bend in the Kaveri."
                },
                {
                        "question": "When is the next Panchalinga Darshana?",
                        "answer": "The timing depends on specific astronomical alignments; the last one was in 2020, and the next is expected in 2032."
                },
                {
                        "question": "Is the curse still believed today?",
                        "answer": "Yes, it is a very strong local belief, often cited in relation to the history of the Mysore royal family."
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
    'Aihole & Pattadakal', 
    'aihole-pattadakal', 
    'Sacred Destination', 
    'ka', 
    'The cradle of Hindu temple architecture, Aihole and Pattadakal represent the experimental and mature phases of the Chalukyan dynasty. A UNESCO World Heritage site, it is where the various styles of Indian temples—from the North and South—were first fused into stone masterpieces.', 
    '150.2', 
    '480.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Birthplace of the Stone Temple Spirit', 
    'Aihole & Pattadakal | Karnataka, Chalukyan Lore & Ancient Lore', 
    'Discover the roots of Hindu architecture at Aihole and Pattadakal. Explore the Durga temple, the Virupaksha shrine, and the profound legacy of the Chalukyan stone masters.', 
    'Aihole, Pattadakal, Karnataka, Chalukya Dynasty, Hindu Architecture, UNESCO, Hindu Pilgrimage, Ancient Lore, Stone Temples', 
    '87', 
    '{
        "spiritualEssence": "Aihole and Pattadakal are the manifestation of the divine as the evolution of form. The energy here is scholarly, foundational, and intensely creative. It is the site where the sacred language of the temple was first written in stone. The vibration is one of ''Sthapatya'' (the science of building). As a cluster of hundreds of temples, it represents the multiple ways the human mind tries to frame the infinite. A visit here is believed to grant the devotee the understanding of the roots of their spiritual culture. The air is always vibrant with the scent of the Malaprabha river and the silent whispers of the ancient sculptors who turned a valley into a laboratory of the divine.",
        "longDescription": "Aihole, with its 125 temples, was the regional capital and a major center for Vedic studies and trade. It is where architects experimented with different designs, including the apsidal Durga temple. Pattadakal, located nearby, was the site for the coronation of the Chalukyan kings and represents the mature phase of their architecture. It features 10 major temples, including the Virupaksha temple, built by Queen Lokamahadevi in the 8th century. The site is unique for showcasing both the Nagara (Northern) and Dravida (Southern) styles of temple towers side by side. These sites are UNESCO World Heritage monuments and remain some of the most significant archaeological and spiritual landmarks in the world.",
        "spiritualArchitecture": "The architecture is characterized by its experimentation. Aihole features the Durga temple, which has a unique apsidal (semi-circular) plan similar to Buddhist chaityas. Pattadakal features the Virupaksha temple, which is a masterpiece of Dravidian style with detailed relief carvings of the Puranas. The temples are built of locally available sandstone and are known for their massive pillars, ceiling panels, and the first use of the Shikhara (tower). The architecture at Pattadakal shows a sophisticated understanding of acoustics and solar alignment, with the temples designed to endure the harsh Deccan sun while maintaining a cool, meditative interior.",
        "vedicReferences": "Aihole is famous for its inscriptions, specifically the Aihole Prashasti by the poet Ravikirti, which provides a detailed record of the Chalukyan history and their patronage of the Vedas.",
        "deepInsights": "The transition from rock-cut caves to structural temples represents the movement of the divine from the hidden to the manifest. Aihole teaches that every masterpiece begins with a thousand experiments.",
        "ancientLore": "Lore tells that the name Aihole comes from ''Ayya-hole'' (O river!), spoken by Parashurama when he washed his blood-stained axe in the Malaprabha river here. Another legend says that Pattadakal was named because it was the site of the coronation (Pattabhisheka) of the kings.",
        "keyRituals": [
                {
                        "name": "Pattadakal Dance Festival",
                        "description": "The grand annual cultural festival held in the courtyard of the ancient temples."
                },
                {
                        "name": "Virupaksha Rathotsava",
                        "description": "The annual chariot festival of the main functioning temple at Pattadakal."
                },
                {
                        "name": "Vedic Chanting Sessions",
                        "description": "Occasional gatherings of scholars to revive the ancient tradition of learning in Aihole."
                }
        ],
        "highlights": [
                {
                        "name": "Durga Temple (Aihole)",
                        "description": "A unique apsidal temple with spectacular carvings and a pillared corridor."
                },
                {
                        "name": "Virupaksha Temple (Pattadakal)",
                        "description": "The largest and most grand of the coronation temples."
                },
                {
                        "name": "Lad Khan Temple",
                        "description": "One of the oldest structures, originally a village assembly hall transformed into a shrine."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road from Badami (35km) and Hubli. The nearest major airport is Hubli.",
                "nearestAirport": "Hubli Airport / Belgaum Airport.",
                "nearestRailway": "Badami Railway Station."
        },
        "tips": [
                "Use Badami as your base and spend a full day exploring both Aihole and Pattadakal.",
                "Look for the ceiling panels in Aihole; they contain some of the most detailed early carvings of Hindu deities.",
                "Carry water and sun protection as the sites are vast and open to the sun."
        ],
        "faqs": [
                {
                        "question": "What is the ''Cradle of Indian Architecture''?",
                        "answer": "It is the title given to Aihole because of the hundreds of experimental temples built there by the Chalukyas."
                },
                {
                        "question": "Are these sites near each other?",
                        "answer": "Yes, Aihole and Pattadakal are about 14km apart and are usually visited together along with Badami."
                },
                {
                        "question": "Is entry free?",
                        "answer": "There is a nominal entry fee for both Aihole and Pattadakal as they are managed by the ASI."
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
    'Patal Bhuvaneshwar Cave Temple', 
    'patal-bhuvaneshwar-cave-temple', 
    'Sacred Destination', 
    'uk', 
    'The "Subterranean World of the Gods", Patal Bhuvaneshwar is an ancient limestone cave temple in the Pithoragarh district. It is a site of absolute mystical authority and subterranean resonance, where the entire Hindu pantheon is believed to reside in the form of the natural rock formations, representing the absolute manifestation of the hidden divine and the profound energy of the inner-earth pilgrimage.', 
    '600.5', 
    '235.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Cave of the Thirty-Three Crore Gods and the Hidden Heart of the Himalayas', 
    'Patal Bhuvaneshwar Cave | Uttarakhand, Shiva & Ancient Lore (TEMPLE)', 
    'Experience the profound mystery of Patal Bhuvaneshwar. Discover the limestone cave world, the legend of the thirty-three crore gods, and the profound energy of the Kumaon pilgrimage.', 
    'Patal Bhuvaneshwar, Uttarakhand, Shiva, Cave Temple, Pithoragarh, Hindu Pilgrimage, Ancient Lore, Subterranean', 
    '274', 
    '{
        "spiritualEssence": "Patal Bhuvaneshwar is the manifestation of the divine as the supreme mystery and the absolute depth of the inner spiritual journey. The energy here is heavy, moist, and intensely mystical. It is the site where the outer world is left behind to enter the womb of the Mother Earth. The vibration is one of ''Gupta'' (Hidden) and the absolute connection to the primal forces of the creation. As a limestone cave system that descends deep into the mountain, it represents the spiritual treasure-house of the Eastern Kumaon. A visit here is believed to grant the devotee the absolute removal of the fear of the dark and the blessing of the all the gods in a single moment. The air is always vibrant with the scent of the damp stone and the silent, heavy energy of the millennia of the geological and the spiritual time.",
        "longDescription": "Patal Bhuvaneshwar is a complex of several caves, though only the main one is accessible to the pilgrims. According to the Skanda Purana, the cave was first discovered by the King Rituparna in the Treta Yuga and later by the Pandavas in the Dwapara Yuga. In the 8th century, Adi Shankaracharya personally visited the cave and established the current form of worship. The cave features a series of stalactite and stalagmite formations that represent the various deities, including the Lord Ganesha, the Sheshnag, the Lord Shiva''s matted hair, and the four gates of the ages (Yugas). The descent is through a narrow, dark tunnel, adding to the sense of a mystical transition. It is a site where the highest level of natural geological wonder and the most ancient Puranic mythology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Patal Bhuvaneshwar is a spectacular display of the divine craftsmanship of the nature. The \"temple\" is the limestone cave itself, featuring a series of large chambers and narrow passages. A unique feature is the presence of the natural rock formations that uncannily resemble the various sacred symbols and the figures of the Hindu mythology. The architecture is designed to lead the pilgrim through a series of levels, each representing a different aspect of the cosmic hierarchy. The use of the dim lighting and the natural shadows create a sense of a spiritual realm that is both terrifying and awe-inspiring. The complex includes several natural water pools (kunds) that are believed to have been used by the gods.",
        "vedicReferences": "Patal Bhuvaneshwar is celebrated in the Manaskhanda of the Skanda Purana as the supreme site where the thirty-three crore deities reside in the absolute silence.",
        "deepInsights": "The subterranean journey represents the truth that the highest realization is found in the depth of the inner self. Patal Bhuvaneshwar teaches that the divine is present even in the darkest corners of the existence.",
        "ancientLore": "Lore tells that the Sheshnag personally supports the roof of the cave to prevent the mountain from collapsing. Another legend says that the gate to the Satyuga (the age of the truth) will open only when the humanity returns to its primal purity.",
        "keyRituals": [
                {
                        "name": "Subterranean Jal-Abhisheka",
                        "description": "Offering sacred cave-water to the various rock formations to seek the blessing of the entire pantheon."
                },
                {
                        "name": "Sheshnag Archana",
                        "description": "Offering prayers to the massive stalactite representing the King of Snakes to seek the stability of the life."
                },
                {
                        "name": "Inner-Earth Meditation",
                        "description": "Sitting in one of the cave chambers to practice the silent meditation while focusing on the heartbeat of the Earth."
                },
                {
                        "name": "Yuga-Gate Contemplation",
                        "description": "Reflecting on the four stages of the cosmic time while standing before the symbolic rock gates."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Cave Chamber",
                        "description": "The massive underground hall where the primary rock formations are located."
                },
                {
                        "name": "The Sheshnag Formation",
                        "description": "A stunning stalactite that perfectly resembles the multiple heads of the cosmic serpent."
                },
                {
                        "name": "The Ganesha Statue",
                        "description": "A natural rock formation that looks like the Lord Ganesha, with the water dripping over it from a stalactite above."
                },
                {
                        "name": "The Gates of the Yugas",
                        "description": "The unique rock formations representing the four ages of the Hindu cosmology."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the cave maintains a constant temperature, but the mountain journey is best in the spring and the autumn).",
                "howToReach": "Located near Gangolihat in Pithoragarh district. Reached by road; regular taxis run from Almora and Pithoragarh.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Wear shoes with a good grip as the cave floor can be quite slippery and uneven in some places.",
                "If you suffer from the claustrophobia, consult with the guides before attempting the descent into the narrow tunnel.",
                "Listen carefully to the stories of the local guides; they have a deep oral tradition that brings the rock formations to life."
        ],
        "faqs": [
                {
                        "question": "How deep is the cave?",
                        "answer": "The cave system is extensive, but the accessible portion descends about 90 feet into the earth."
                },
                {
                        "question": "Is it natural or man-made?",
                        "answer": "It is a 100% natural limestone cave formation that has been sacred for thousands of years."
                },
                {
                        "question": "Can children visit?",
                        "answer": "Yes, children can visit, but they must be supervised carefully due to the narrow passages and the slippery floors."
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
    'Haat Kalika Temple (Gangolihat)', 
    'haat-kalika-temple-gangolihat', 
    'Sacred Destination', 
    'uk', 
    'The "Warrior Guardian of the Kumaon", Haat Kalika is a powerful Shakti shrine in Gangolihat. It is a site of absolute military and spiritual authority, being the primary deity of the Kumaon Regiment, representing the absolute ferocity and the protective grace of the Divine Mother in the Eastern Himalayas.', 
    '570.2', 
    '235.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Protector of the Warriors and the Dark Mother of the Gangolihat Forests', 
    'Haat Kalika Temple | Uttarakhand, Kali & Ancient Lore (GANGOLIHAT)', 
    'Experience the profound power of Haat Kalika. Discover the warrior-goddess shrine, the legend of the Kumaon Regiment, and the profound energy of the Kali pilgrimage.', 
    'Haat Kalika, Uttarakhand, Kali, Gangolihat, Kumaon Regiment, Hindu Pilgrimage, Ancient Lore, Pithoragarh (GANGOLIHAT)', 
    '275', 
    '{
        "spiritualEssence": "Haat Kalika is the manifestation of the divine as the supreme protection and the absolute fearlessness of the warrior spirit. The energy here is dark, intense, and intensely protective. It is the site where the sword of the Goddess is anchored in the forest soil. The vibration is one of ''Veera'' (Heroism) and the absolute immunity from the forces of chaos. As a temple surrounded by dense deodar and oak forests in the high hills of Kumaon, it represents the spiritual armor of the Northern frontiers. A visit here is believed to grant the devotee the absolute victory over the inner and outer enemies and the blessing of the fierce grace. The air is always vibrant with the scent of the deodar resin and the constant, rhythmic sound of the army bands and the ancient chants.",
        "longDescription": "Haat Kalika is legendary for its connection with the Indian Army (Gangolihat)''s Kumaon Regiment. It is believed that the Goddess personally protects the soldiers in battle, and the regimental war cry ''Kalika Mata Ki Jai'' is a testament to this faith. The temple was established by Adi Shankaracharya in the 8th century to balance the fierce energy of the region. The idol of the Goddess is kept behind a curtain, and only the high priest is allowed to see her in full form. The temple complex features a series of ancient stone structures and a sacred grove of trees that are centuries old. It is a site where the highest level of Himalayan mysticism and the most practical military tradition are perfectly unified.",
        "spiritualArchitecture": "The architecture of Haat Kalika is a spectacular display of the ancient Kumaoni stone style with a heavy emphasis on the dark, weathered wood and slate. The temple features a low, wide roof and a series of intricately carved wooden pillars. A unique feature is the presence of numerous bells donated by soldiers and the Kumaon Regiment, creating a resonant canopy over the entrance. The architecture is designed to create a sense of an ancient forest sanctuary that is both hidden and powerful. The use of the dark stones and the deep shadows of the inner courtyard create a sense of a spiritual space that is reserved for the serious practitioner and the brave. The complex includes several rooms dedicated to the history of the regimental connection.",
        "vedicReferences": "Haat Kalika is celebrated in the local oral epics as the supreme site where the Mother personally forged the weapons of the gods to protect the Dharma.",
        "deepInsights": "The Goddess of the Warriors represents the truth that the spirit must be fierce in its pursuit of the righteousness. Haat Kalika teaches that the highest protection is found in the absolute surrender to the divine power.",
        "ancientLore": "Lore tells that a bed is laid every night for the Goddess in her room, and in the morning, the sheets are found rumpled, proving her physical presence. Another legend says that the Goddess personally led the Kumaon Regiment to victory in several historic battles, appearing as a young girl to guide the commanders.",
        "keyRituals": [
                {
                        "name": "Regimental Puja",
                        "description": "The ritual performed by the soldiers of the Kumaon Regiment to seek the blessing of the Mother for the safety and the victory."
                },
                {
                        "name": "Kalika Deepam",
                        "description": "Offering lamps in the forest grove at dusk to seek the protection of the Goddess from the darkness."
                },
                {
                        "name": "Haat Kalika Jaagar",
                        "description": "The ritual of chanting and drumming to invoke the energy of the Goddess in the local community."
                },
                {
                        "name": "Secret Darshan",
                        "description": "The ritual of praying before the veiled Goddess to experience the subtle and intense power of her presence."
                }
        ],
        "highlights": [
                {
                        "name": "The Veiled Shrine",
                        "description": "The mysterious heart of the temple where the idol of Kali is housed."
                },
                {
                        "name": "The Kumaon Regiment Bells",
                        "description": "The unique collection of thousands of bells offered by the Indian soldiers over the decades."
                },
                {
                        "name": "The Ancient Deodar Grove",
                        "description": "The sacred forest that surrounds the temple, believed to be the dwelling of the mountain spirits."
                },
                {
                        "name": "The Adi Shankaracharya Altar",
                        "description": "The historic spot associated with the great master''s visit to Gangolihat."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the forest is beautiful in every season).",
                "howToReach": "75km from Pithoragarh and 100km from Almora. Well connected by road; regular taxis and buses run from Almora and Pithoragarh.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Maintain absolute respect for the military traditions of the temple; it is a site of high honor for the Indian Army.",
                "Do not attempt to look behind the curtain of the Goddess; respect the local ritual traditions and the sanctity of the shrine.",
                "Spend some time walking in the surrounding deodar forest; the energy is exceptionally pure and conductive to meditation."
        ],
        "faqs": [
                {
                        "question": "Why is it the regimental deity?",
                        "answer": "Because of several miraculous events where the Goddess is believed to have saved and guided the Kumaon Regiment in battle."
                },
                {
                        "question": "Who founded the temple?",
                        "answer": "Local tradition and historical evidence point to Adi Shankaracharya as the person who established the current form of worship."
                },
                {
                        "question": "Where is it located?",
                        "answer": "In Gangolihat, a historic town in the Pithoragarh district of Uttarakhand."
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
    'Purnagiri Devi Shakti Peeth', 
    'purnagiri-devi-shakti-peeth', 
    'Sacred Destination', 
    'uk', 
    'The "Mountain of Abundance", Purnagiri Devi is a supreme Shakti Peeth on the banks of the Sharda river. It is a site of absolute regional authority and divine fulfillment, where the skin of Sati is believed to have fallen, representing the absolute abundance of the spiritual energy at the gateway to the Nepal Himalayas.', 
    '625.5', 
    '280.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of Abundance and the Guardian of the Sharda River', 
    'Purnagiri Devi Temple | Uttarakhand, Shakti Peeth & Ancient Lore (PEETH)', 
    'Experience the profound energy of Purnagiri Devi. Discover the mountain-top Shakti Peeth, the legend of the falling skin of Sati, and the profound energy of the Eastern Kumaon pilgrimage.', 
    'Purnagiri Devi, Uttarakhand, Shakti Peeth, Tanakpur, Hindu Pilgrimage, Ancient Lore, Sharda River, Nepal Border (PEETH)', 
    '276', 
    '{
        "spiritualEssence": "Purnagiri is the manifestation of the divine as the supreme fulfillment and the absolute flow of the creative abundance. The energy here is warm, river-fed, and intensely maternal. It is the site where the vastness of the plains meets the first surge of the mountains. The vibration is one of ''Purna'' (Fullness) and the absolute gratitude for the gifts of life. As a temple perched on a high rock overlooking the wide, emerald Sharda river and the hills of Nepal, it represents the spiritual heart of the Kumaon Terai. A visit here is believed to grant the devotee the absolute removal of the poverty and the blessing of the material and spiritual abundance. The air is always vibrant with the scent of the river mist and the constant, rhythmic sound of the bells of the thousands of pilgrims.",
        "longDescription": "Purnagiri is one of the most visited shrines in Uttarakhand, attracting millions of devotees during the Chaitra Navratri fair. It is believed to be the spot where the skin of Sati fell. The temple is located at an altitude of 3,000 feet and requires a climb through a scenic mountain trail. The site is famous for its connection with the Nepal Himalayas; the hills of Nepal are clearly visible from the temple courtyard. Legend tells that the great saint Adi Shankaracharya visited this site to establish the Devi as the protector of the Eastern borders. The temple is a site of immense faith for the people of Kumaon and Western Uttar Pradesh. It is a site where the highest Puranic tradition and the most vibrant folk faith of the river-plains are perfectly unified.",
        "spiritualArchitecture": "The architecture of Purnagiri is a spectacular display of the tiered mountain style with massive stone stairways and open-air platforms. The main shrine is an intimate space carved into the natural rock, housing the idol of the Goddess. A unique feature is the presence of the expansive river-viewing galleries where pilgrims stand to offer prayers to the Sharda river below. The architecture is designed to manage the flow of massive crowds while maintaining the sanctity of the peak. The use of the vibrant red paints and the extensive use of the bells create a sense of a spiritual celebration that is continuous. The complex includes several resting halls and smaller shrines dedicated to the guardians of the mountain.",
        "vedicReferences": "Purnagiri is celebrated in the Devi Bhagavata Purana as the supreme site where the Mother manifests the fullness of her grace for the inhabitants of the Aryavarta.",
        "deepInsights": "The falling of the skin represents the truth that the divine protection covers all aspects of the existence. Purnagiri teaches that the heart must become full (Purna) before it can receive the truth.",
        "ancientLore": "Lore tells that the mountain personally leaned toward the river Sharda to allow the Goddess to bathe in its waters. Another legend says that the lights seen on the Nepal hills across the river at night are the lamps lit by the celestials to honor the Purnagiri Mother.",
        "keyRituals": [
                {
                        "name": "Purnagiri Navratri Mela",
                        "description": "Participating in the massive spring festival to seek the blessing of the Mother of Abundance."
                },
                {
                        "name": "Sharda River Arghya",
                        "description": "Offering sacred water to the river Sharda before the climb to seek the purification of the intentions."
                },
                {
                        "name": "Chunari Bandhan",
                        "description": "Tying a sacred red cloth at the temple to symbolize the devotee''s prayer for the fulfillment of the desires."
                },
                {
                        "name": "Bhairav Darshan (Purnagiri)",
                        "description": "The ritual of visiting the nearby shrine of Bhairav to complete the pilgrimage to the Mother Goddess."
                }
        ],
        "highlights": [
                {
                        "name": "The Rock Shrine",
                        "description": "The ancient heart of the temple where the energy of the Shakti Peeth is most accessible."
                },
                {
                        "name": "The Sharda River View",
                        "description": "The spectacular perspective of the wide river valley and the plains of India and Nepal."
                },
                {
                        "name": "The Ancient Steps",
                        "description": "The historic stone stairway that has been climbed by millions of seekers over the centuries."
                },
                {
                        "name": "The Nepal Hills Perspective",
                        "description": "The unique geographic position that offers a direct spiritual connection to the higher Himalayan reaches of Nepal."
                }
        ],
        "travelInfo": {
                "bestTime": "March to May (during the Chaitra Navratri) and October to December.",
                "howToReach": "20km from Tanakpur. Reached by road to the base camp (Tunyas), followed by a 3km uphill trek.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Tanakpur Railway Station."
        },
        "tips": [
                "Be prepared for very large crowds during the Navratri months; the lines can be several kilometers long.",
                "The climb is manageable but requires good walking shoes; carry water as the path is exposed to the sun.",
                "Visit the Sharda river ghats in Tanakpur for a holy dip before starting your journey to the temple peak."
        ],
        "faqs": [
                {
                        "question": "Why is it called Purnagiri?",
                        "answer": "It means the  (Peeth)''Mountain of Fullness'' or ''Abundance,'' referring to the Goddess who fulfills all desires."
                },
                {
                        "question": "Where is it located?",
                        "answer": "It is in the Champawat district, very close to the town of Tanakpur and the Nepal border."
                },
                {
                        "question": "Which part of Sati fell here?",
                        "answer": "According to the tradition, the skin (Charma) of the Goddess fell at this spot."
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
    'Adi Kailash Peak (Pithoragarh)', 
    'adi-kailash-peak-pithoragarh', 
    'Sacred Destination', 
    'uk', 
    'The "Chhota Kailash", Adi Kailash is a sacred mountain in the Pithoragarh district. It is a site of absolute high-altitude authority and divine mirroring, being the primary substitute for those unable to visit the Tibetan Kailash, representing the absolute majesty of the Lord Shiva in the Indian frontier.', 
    '620.5', 
    '210.2', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Indian Mirror of Kailash and the Supreme Peak of the Eastern Himalayas', 
    'Adi Kailash Peak | Uttarakhand, Shiva & Ancient Lore (PITHORAGARH)', 
    'Experience the profound majesty of Adi Kailash. Discover the Indian Kailash, the sacred Parvati Tal, and the profound energy of the high-frontier pilgrimage.', 
    'Adi Kailash, Uttarakhand, Shiva, Pithoragarh, Hindu Pilgrimage, Ancient Lore, High Altitude, Chhota Kailash (PITHORAGARH)', 
    '277', 
    '{
        "spiritualEssence": "Adi Kailash is the manifestation of the divine as the supreme reflection and the absolute purity of the high Himalayan peaks. The energy here is thin, luminous, and intensely silent. It is the site where the earthly rock takes the form of the cosmic axis. The vibration is one of ''Shuddha (Pithoragarh)'' (Purity) and the absolute connection to the celestial realms. As a mountain peak that perfectly mirrors the shape of the Tibetan Kailash, it represents the spiritual northern anchor of the Indian territory. A visit here is believed to grant the devotee the absolute clarity of the soul and the blessing of the Lord Shiva''s immediate presence. The air is always vibrant with the scent of the eternal snow and the silent, heavy energy of the zero-oxygen atmosphere.",
        "longDescription": "Adi Kailash (also known as Little Kailash) is located near the Indo-Tibetan border at an altitude of 5,945 meters. It is a site of extreme pilgrimage and is considered the second most important home of Shiva after the main Kailash. The peak is accompanied by the beautiful Parvati Tal, a high-altitude lake that reflects the mountain in its crystal-clear waters. Nearby is the Gauri Kund, another sacred water body. The area is inhabited by the local Bhotia tribes who have preserved the ancient rituals of the mountain worship. Following the opening of the new motorable roads, it has become a major destination for domestic pilgrims seeking the Kailash experience within India. Adi Kailash is a site where the highest level of geographic wonder and the most intense devotion of the frontier people are perfectly unified.",
        "spiritualArchitecture": "The architecture of Adi Kailash is a spectacular display of the raw, uncarved majesty of nature. The \"temple\" is the mountain itself, featuring a series of natural ice formations and rock ridges that resemble the sacred symbols of Shaivism. A unique feature is the presence of the small stone shrines and cairns (paths of stone) built by pilgrims over centuries to mark the progress of their circumambulation (Parikrama). The \"architecture\" is designed to humble the human spirit through its scale and its absolute isolation. The use of the white snow against the dark blue sky create a sense of a spiritual palace that is not built by hands but by the breath of the divine. The complex includes several small cave dwellings used by high-altitude yogis.",
        "vedicReferences": "Adi Kailash is celebrated in the local oral epics of the Kumaon Himalayas as the supreme site where the Lord Shiva personally meditated before moving to the Tibetan Kailash.",
        "deepInsights": "The mirroring of Kailash represents the truth that the divine source is available in multiple manifestations for the benefit of the seeker. Adi Kailash teaches that the highest peak is reached through the absolute surrender of the ego.",
        "ancientLore": "Lore tells that the mountain peak personally shaped by the Nandi to provide a home for the Lord in the Indian lands. Another legend says that the water of the Parvati Tal can heal all ancestral karmas when offered at the dawn.",
        "keyRituals": [
                {
                        "name": "Adi Kailash Parikrama",
                        "description": "The ritual of walking around the base of the sacred peak to align the individual energy with the mountain''s axis."
                },
                {
                        "name": "Parvati Tal Arghya",
                        "description": "Offering sacred water to the reflective lake to seek the blessing of the Mother Goddess."
                },
                {
                        "name": "Gauri Kund Snanam",
                        "description": "The ritual of washing the hands and face in the freezing waters of the sacred pool to seek purification."
                },
                {
                        "name": "Frontier Havan",
                        "description": "The performance of the fire ritual at the base camp to seek protection for the journey and the nation."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Peak",
                        "description": "The stunning snow-capped mountain that mirrors the form of Mount Kailash."
                },
                {
                        "name": "Parvati Tal",
                        "description": "The high-altitude sacred lake that provides a perfect reflection of the Adi Kailash peak."
                },
                {
                        "name": "Gauri Kund (Adi Kailash)",
                        "description": "A sacred pool located at the base of the mountain, associated with the penance of Parvati."
                },
                {
                        "name": "Kuti Village",
                        "description": "The last human settlement on the trail, associated with the Pandavas'' mother, Kunti."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (the site is inaccessible during the heavy winters).",
                "howToReach": "Reached via Dharchula in Pithoragarh district. Requires a specialized high-altitude permit and a multi-day journey by 4x4 vehicles and trekking.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Ensure you are medically fit for high-altitude travel; the oxygen levels are significantly lower than the plains.",
                "Acclimatize properly at Dharchula or Gunji before attempting the final ascent to the base of the peak.",
                "Carry adequate warm clothing and follow the instructions of the local guides and the security forces stationed at the border."
        ],
        "faqs": [
                {
                        "question": "Is it the same as Mount Kailash?",
                        "answer": "No, it is a different peak located in India, but it is spiritually considered the twin of the Tibetan Kailash."
                },
                {
                        "question": "Do I need a passport?",
                        "answer": "No, as it is in India, but you do need an Inner Line Permit due to its proximity to the international border."
                },
                {
                        "question": "How high is it?",
                        "answer": "The peak stands at approximately 5,945 meters (19,505 feet) above sea level."
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
    'Om Parvat Peak (Vedic Wonder)', 
    'om-parvat-peak-pithoragarh', 
    'Sacred Destination', 
    'uk', 
    'The "Mountain of the Eternal Sound", Om Parvat is a unique peak where the snow naturally settles in the shape of the sacred "Om" symbol, representing the absolute manifestation of the primordial sound in the physical earth.', 
    '630.2', 
    '205.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Natural Signature of the Divine and the Peak of the Primordial Sound', 
    'Om Parvat Peak | Uttarakhand, Vedic Wonder & Ancient Lore (PITHORAGARH)', 
    'Experience the profound miracle of Om Parvat. Discover the mountain of the natural Om, the legend of the sacred sound, and the profound energy of the high-frontier pilgrimage.', 
    'Om Parvat, Uttarakhand, Om, Pithoragarh, Hindu Pilgrimage, Ancient Lore, High Altitude, Natural Miracle (PITHORAGARH)', 
    '278', 
    '{
        "spiritualEssence": "Om Parvat is the manifestation of the divine as the supreme signature and the absolute visibility of the primordial vibration. The energy here is high-vibrational, ecstatic, and intensely miraculous. It is the site where the logos of the universe is etched in the eternal snow. The vibration is one of ''Pranava (Pithoragarh)'' (The Om) and the absolute resonance of the spiritual sound. As a peak standing on the border of India and Nepal, it represents the spiritual lighthouse of the Eastern Himalayas. A visit here is believed to grant the devotee the absolute awakening of the inner sound and the blessing of the cosmic harmony. The air is always vibrant with the silent, heavy energy of the mountain that speaks without words.",
        "longDescription": "Om Parvat is located at an altitude of 6,191 meters. Its most unique feature is the natural deposition of snow on the black rock face, which clearly forms the Hindi character for ''Om'' (ॐ). Of the eight mountain peaks in the Himalayas that are said to bear the Om symbol, this is the only one that has been identified and is accessible to pilgrims. The mountain is sacred to multiple religions and is a key destination for the Kailash-Mansarovar pilgrims who travel via the Lipulekh pass. The site is visible from the village of Nabidhang. Om Parvat is a site where the highest level of natural pattern-recognition and the most ancient Vedic philosophy are perfectly unified in a single snow-capped miracle.",
        "spiritualArchitecture": "The architecture of Om Parvat is a spectacular display of the divine geometry of the Himalayas. The \"temple\" is the rock face itself, featuring a series of natural ridges and hollows that hold the snow in the precise shape of the Om. A unique feature is the absolute contrast between the dark black rock and the brilliant white snow, making the symbol visible from many miles away. The \"architecture\" is designed to focus the human mind on the singularity of the divine sound. The use of the immense scale of the mountain and the clarity of the high-altitude light creates a sense of a spiritual broadcast that is directed at the entire humanity. The site includes several small meditation spots in the surrounding meadows.",
        "vedicReferences": "Om Parvat is celebrated in the ancient texts as the site where the first sound of the creation was anchored to guide the sages of the North.",
        "deepInsights": "The natural Om represents the truth that the divine presence has signed the creation itself. Om Parvat teaches that the highest wisdom is to hear the sound of the silence within.",
        "ancientLore": "Lore tells that the Om was etched on the mountain by the Adi Guru himself to ensure that the sound of the Vedas would never fade from the earth. Another legend says that the snow of the Om never melts, even in the hottest summers, as it is protected by the celestial guardians.",
        "keyRituals": [
                {
                        "name": "Om Japa (Frontier)",
                        "description": "Performing the repetitive chanting of the Om while facing the sacred peak at the dawn."
                },
                {
                        "name": "Pranava Dhyana",
                        "description": "Meditating on the form of the Om Parvat to seek the alignment of the inner chakras."
                },
                {
                        "name": "Nabidhang Darshan",
                        "description": "The ritual of witnessing the mountain from the closest accessible vantage point to seek the divine signature."
                },
                {
                        "name": "White-Stone Offering",
                        "description": "Placing a white stone on a nearby cairn to symbolize the individual''s connection to the snow-peak."
                }
        ],
        "highlights": [
                {
                        "name": "The Snow Om",
                        "description": "The world-famous natural formation of the sacred symbol on the mountain face."
                },
                {
                        "name": "Nabidhang Base Camp",
                        "description": "The primary viewpoint for witnessing the Om Parvat in all its glory."
                },
                {
                        "name": "Lipulekh Pass",
                        "description": "The historic high-altitude pass nearby that leads toward the Tibetan plateau."
                },
                {
                        "name": "The Mahakali River Source",
                        "description": "The spectacular mountain stream that originates in the glaciers surrounding the peak."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (clear skies are essential for the visibility of the Om symbol).",
                "howToReach": "Reached via Dharchula and Gunji in Pithoragarh district. Requires specialized permits and a multi-day journey through the high frontier.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Use a high-quality pair of binoculars to see the details of the Om formation; the scale is deceptive in the high mountains.",
                "The site is at very high altitude; maintain a slow pace and stay hydrated to avoid altitude sickness.",
                "Respect the sensitive nature of the border area; follow all security protocols and avoid photography of military installations."
        ],
        "faqs": [
                {
                        "question": "How is the Om formed?",
                        "answer": "It is a natural geological formation of the rock that allows snow to settle in that specific pattern."
                },
                {
                        "question": "Can we climb the mountain?",
                        "answer": "Climbing the Om Parvat is generally prohibited due to its sacred status and its location on the international border."
                },
                {
                        "question": "Is it visible all year?",
                        "answer": "The symbol is most prominent after the fresh snowfall, but it is generally visible throughout the summer and autumn months."
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
    'Narayan Ashram (Pithoragarh)', 
    'narayan-ashram-pithoragarh-frontier', 
    'Sacred Destination', 
    'uk', 
    'A masterpiece of high-altitude social spirituality, Narayan Ashram was founded by Narayan Swami in 1936. It is a site of absolute Himalayan peace and service at 2,734 meters, representing the absolute dedication to the mountain communities.', 
    '615.2', 
    '220.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Jewel of the Kumaon Frontier and the Legacy of Narayan Swami', 
    'Narayan Ashram | Uttarakhand, Narayan Swami & Ancient Lore (FRONTIER)', 
    'Experience the profound silence of Narayan Ashram. Discover the high-altitude sanctuary, the legend of the social master, and the profound energy of the frontier pilgrimage.', 
    'Narayan Ashram, Uttarakhand, Pithoragarh, Narayan Swami, Hindu Pilgrimage, Ancient Lore, High Altitude, Social Work (FRONTIER)', 
    '279', 
    '{
        "spiritualEssence": "Narayan Ashram is the manifestation of the divine as the supreme service and the absolute integration of the meditation and the action. The energy here is steady, compassionate, and intensely organized. It is the site where the high Himalayan air is infused with the spirit of the selfless work. The vibration is one of ''Seva (Frontier)'' (Service) and the absolute clarity of the social-spiritual mission. As a beautifully maintained stone complex surrounded by wild-flower gardens and snow-capped peaks, it represents the spiritual lighthouse of the Far East. A visit here is believed to grant the devotee the absolute balance of the inner and outer life and the blessing of the compassionate action. The air is always vibrant with the scent of the alpine flowers and the silent, heavy energy of the master''s legacy.",
        "longDescription": "Narayan Ashram was established by the Karnataka-born saint Narayan Swami as a center for spiritual and social upliftment of the border people. It features a grand temple dedicated to the Lord Shiva and a series of schools, libraries, and vocational training centers. The ashram is architecturally unique, blending the South Indian temple aesthetic with the rugged Himalayan stone style. It became a critical stop for the Kailash-Mansarovar pilgrims, providing shelter and medical aid. The site is famous for its incredible views of the snow ranges and its atmosphere of absolute discipline and peace. Narayan Ashram is a site where the highest level of Vedantic philosophy and the most practical mountain development are perfectly unified.",
        "spiritualArchitecture": "The architecture of Narayan Ashram is a spectacular display of the polished mountain stone style with significant South Indian refinements. The main temple features a beautifully carved stone shikhara and a grand courtyard with polished slate floors. A unique feature is the presence of the expansive gardens that house a variety of rare Himalayan medicinal plants and flowers. The architecture is designed to create a sense of a spiritual university that is perfectly integrated with the wild landscape. The use of the dark gray stone and the white-washed residential wings create a sense of a spiritual home that is both robust and welcoming. The complex includes a large library and a community hall where the Vedic and social discourses are held.",
        "vedicReferences": "Narayan Ashram is celebrated in the modern Himalayan literature as the supreme site where the ''Karma Yoga'' was re-established to protect the frontier culture.",
        "deepInsights": "The integration of the temple and the school represents the truth that the highest worship is the development of the human potential. Narayan Ashram teaches that the spirit must serve where the earth is most rugged.",
        "ancientLore": "Lore tells that Narayan Swami personally carried the first stone of the temple from the river bed to the high ridge. Another legend says that the flowers of the ashram garden never wither during the winter, as they are nourished by the devotion of the resident monks.",
        "keyRituals": [
                {
                        "name": "Narayan Swami Samadhi Puja",
                        "description": "Offering prayers at the final resting place of the master to seek the blessing of the selfless service."
                },
                {
                        "name": "Alpine Flower Archana",
                        "description": "The ritual of offering the local high-altitude flowers to the Lord Shiva in the main temple."
                },
                {
                        "name": "Vedic Study Session",
                        "description": "Participating in the collective study of the scriptures in the ashram library to seek the intellectual clarity."
                },
                {
                        "name": "Frontier Seva",
                        "description": "Participating in the local community service projects organized by the ashram as a form of spiritual offering."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Shiva Temple",
                        "description": "The beautifully carved stone heart of the ashram."
                },
                {
                        "name": "Narayan Swami Cottage",
                        "description": "The simple and peaceful room where the master resided, now a site of pilgrimage."
                },
                {
                        "name": "The Himalayan Library",
                        "description": "A significant collection of books on spiritual, social, and cultural themes of the border region."
                },
                {
                        "name": "The Snow Peak Viewpoint",
                        "description": "The spectacular vantage point within the ashram that offers direct views of the high Himalayan ranges."
                }
        ],
        "travelInfo": {
                "bestTime": "March to June and September to November (the site is beautiful in the spring when the flowers bloom).",
                "howToReach": "44km from Pithoragarh town. Reached by road through the scenic hills of the eastern Kumaon.",
                "nearestAirport": "Pantnagar Airport / Pithoragarh Airstrip (limited).",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Maintain the discipline of the ashram; follow the timings for the meals and the prayers strictly.",
                "Spend some time in the library; it is a unique window into the history and the culture of the Kumaon frontier.",
                "Support the local social projects of the ashram; it is the most effective way to honor the legacy of Narayan Swami."
        ],
        "faqs": [
                {
                        "question": "Who was Narayan Swami?",
                        "answer": "A great saint and social reformer from Karnataka who dedicated his life to the service of the Himalayan border people."
                },
                {
                        "question": "Can we stay in the ashram?",
                        "answer": "Yes, the ashram offers peaceful accommodation for pilgrims and seekers, but it requires prior booking."
                },
                {
                        "question": "Is it near the China border?",
                        "answer": "It is located in the border district of Pithoragarh, but it is a safe and accessible site for all visitors."
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
    'Champawat', 
    'champawat-ancient-temples', 
    'Sacred Destination', 
    'uk', 
    'The "First Capital of the Kumaon", Champawat is a historic town rich in Puranic lore. It is a site of absolute ancient authority and divine incarnation, where the Lord Vishnu is believed to have manifested as the Kurma (Tortoise) Avatar, representing the absolute stability of the world and the profound energy of the Katyuri-Chand heritage.', 
    '595.2', 
    '255.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Land of the Kurma Avatar and the Cradle of the Kumaon Kings', 
    'Champawat Temples | Uttarakhand, Kurma Avatar & Ancient Lore', 
    'Experience the profound history of Champawat. Discover the Baleshwar temple, the legend of the Kurma Avatar, and the profound energy of the Kumaon heritage pilgrimage.', 
    'Champawat, Uttarakhand, Kurma Avatar, Baleshwar Temple, Kumaon, Hindu Pilgrimage, Ancient Lore, Katyuri Kings', 
    '280', 
    '{
        "spiritualEssence": "Champawat is the manifestation of the divine as the supreme stability and the absolute protection of the foundations. The energy here is ancient, stone-clad, and intensely royal. It is the site where the earth was anchored by the divine tortoise. The vibration is one of ''Sthapana'' (Establishment) and the absolute resonance of the ancestral power. As a town located in a high valley with spectacular stone architecture from the medieval era, it represents the spiritual cradle of the Kumaon monarchy. A visit here is believed to grant the devotee the absolute grounding of the family lineage and the blessing of the divine perseverance. The air is always vibrant with the scent of the weathered stone and the silent, heavy energy of the centuries of the royal devotion.",
        "longDescription": "Champawat is legendary as the site where Lord Vishnu took the Kurma Avatar (Tortoise incarnation) to support the Mandara mountain during the churning of the ocean (Samudra Manthan). The town features the spectacular Baleshwar Temple complex, a 10th-century masterpiece of the stone carving dedicated to the Lord Shiva. It was the first capital of the Chand kings, who ruled Kumaon for centuries. The site also includes the Nagnath temple and several ancient step-wells (Naulas). Champawat is a site where the highest level of Puranic mythology and the most refined Himalayan medieval architecture are perfectly unified.",
        "spiritualArchitecture": "The architecture of Champawat is a spectacular display of the refined Nagara style with a focus on the dense relief carving and the structural symmetry. The Baleshwar Temple features two magnificent stone shrines with high, tiered shikharas and a central mandapam. A unique feature is the presence of the absolute mastery of the stone-cutters, who carved every inch of the gray stone with figures of the gods, the celestial dancers, and the intricate geometric patterns. The architecture is designed to reflect the majesty of the Chand kings and the power of the Shaivite tradition. The use of the dark stone and the expansive temple courtyards create a sense of a spiritual city that has survived the passage of the time. The complex includes several ancient Naulas (stone-lined springs) with beautifully carved entrances.",
        "vedicReferences": "Champawat is celebrated in the Skanda Purana (Manaskhanda) as the supreme site where the ''Kurmanchal'' (the land of the tortoise) takes its name and its spiritual authority.",
        "deepInsights": "The tortoise avatar represents the truth that the spirit must provide a stable foundation for the evolution to occur. Champawat teaches that the highest achievement is built on the rock-solid patience.",
        "ancientLore": "Lore tells that the stone for the Baleshwar temple was personally blessed by the sage Vyasa. Another legend says that the original capital of the Kumaon was protected by a celestial eagle that still circles the Champawat valley during the annual royal festivals.",
        "keyRituals": [
                {
                        "name": "Baleshwar Jal-Abhisheka",
                        "description": "Offering sacred water to the ancient stone Lingam to seek the blessing of the ancestral strength."
                },
                {
                        "name": "Kurmanchal Arghya",
                        "description": "Offering prayers to the land of Champawat as the sacred body of the Kurma Avatar."
                },
                {
                        "name": "Naula Marjan",
                        "description": "The ritual of washing the hands in the ancient step-wells to seek the purification of the intentions."
                },
                {
                        "name": "Katyuri Lineage Path",
                        "description": "Reflecting on the history of the great kings in the temple courtyard to seek the leadership and the vision."
                }
        ],
        "highlights": [
                {
                        "name": "The Baleshwar Temple",
                        "description": "The world-famous stone heart of Champawat, a masterpiece of the medieval Kumaon art."
                },
                {
                        "name": "The Kurmanchal Ridge",
                        "description": "The high ground associated with the manifestation of the Kurma Avatar."
                },
                {
                        "name": "Ek Hathiya Naula",
                        "description": "A unique and legendary step-well believed to have been carved by a one-handed mason in a single night."
                },
                {
                        "name": "Nagnath Temple",
                        "description": "An ancient and powerful shrine dedicated to the snake deities, reflecting the primal faith of the region."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the town is most pleasant during the spring and the early winter).",
                "howToReach": "75km from Tanakpur and 150km from Kathgodam. Well connected by road; regular taxis and buses run from Almora and Tanakpur.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Tanakpur Railway Station."
        },
        "tips": [
                "Spend time observing the details of the Baleshwar temple carvings; they are among the most refined in the entire Himalayan region.",
                "Visit the Ek Hathiya Naula to understand the unique architectural folklore of the Kumaon.",
                "Maintain the sanctity of the ancient step-wells; they are still used by the local community and represent a sacred connection to the water."
        ],
        "faqs": [
                {
                        "question": "Why is it called Champawat?",
                        "answer": "Legend says it was named after Champawati, the daughter of the King Arjun Deo, or after the Champa trees that once filled the valley."
                },
                {
                        "question": "What is the connection with the Kurma Avatar?",
                        "answer": "The region is traditionally called Kurmanchal because it is believed to be the site of the Kurma (Tortoise) Avatar of Lord Vishnu."
                },
                {
                        "question": "How old are the temples?",
                        "answer": "The main Baleshwar temple dates back to the 10th-12th centuries, built during the peak of the Chand and Katyuri dynasties."
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
    'Advaita Ashram (Mayavati)', 
    'advaita-ashram-mayavati-himalayas', 
    'Sacred Destination', 
    'uk', 
    'The Himalayan seat of the Advaita philosophy, Mayavati Ashram is a site of absolute intellectual silence. Established by Swami Vivekananda in 1899, it is a center dedicated purely to the non-dualistic realization, where all external rituals are prohibited.', 
    '580.2', 
    '245.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Non-Dual and the Vivekananda Peak of the Himalayas', 
    'Advaita Ashram Mayavati | Uttarakhand, Vivekananda & Ancient Lore (HIMALAYAS)', 
    'Experience the profound silence of Mayavati. Discover the Advaita Ashram, the legend of Swami Vivekananda''s Himalayan stay, and the profound energy of the philosophical pilgrimage.', 
    'Advaita Ashram, Mayavati, Uttarakhand, Vivekananda, Advaita Vedanta, Hindu Pilgrimage, Ancient Lore, Meditation (HIMALAYAS)', 
    '281', 
    '{
        "spiritualEssence": "Mayavati is the manifestation of the divine as the supreme non-duality and the absolute silence of the realized mind. The energy here is cold, thin, and intensely intellectual. It is the site where the outer forms of ritual are dissolved into the inner light of the self. The vibration is one of ''Advaita'' (Oneness) and the absolute clarity of the Brahman-realization. As an ashram set within a dense forest of oak and deodar facing the snow peaks, it represents the spiritual laboratory of the modern Vedanta. A visit here is believed to grant the devotee the absolute stillness of the thoughts and the blessing of the profound self-inquiry. The air is always vibrant with the scent of the pine needles and the silent, heavy energy of the continuous contemplation.",
        "longDescription": "The Advaita Ashram at Mayavati was founded in 1899 by Captain Sevier and Mrs. Sevier (disciples of Swami Vivekananda), under the guidance of the Swami himself. It is unique among the Ramakrishna Mission centers as it prohibits all external rituals, idols, and even the blowing of the conch, focusing purely on the Advaita (non-dual) aspect of the truth. Swami Vivekananda stayed here in 1901 and was moved by the absolute peace of the site. It is the publishing house for the ''Prabuddha Bharata'' magazine, the oldest English-language journal in India. The ashram is located at an altitude of 1,940 meters and is surrounded by 50 acres of pristine Himalayan forest. It is a site where the highest level of Western intellectual discipline and the most ancient Eastern wisdom are perfectly unified.",
        "spiritualArchitecture": "The architecture of Mayavati is a spectacular display of the colonial-Himalayan style integrated with the natural forest. The main building is a simple, elegant structure with wooden balconies and stone walls. A unique feature is the absence of any temple or prayer hall; instead, there is a dedicated meditation room where seekers sit in absolute silence. The architecture is designed to emphasize the isolation and the focus on the inner world. The use of the white-washed walls and the dark wooden frames create a sense of a spiritual library or a mountain retreat. The complex includes the cottage where Swami Vivekananda stayed, which is preserved as a sacred site of contemplation.",
        "vedicReferences": "Mayavati is celebrated in the modern Vedantic literature as the primary ground for the practice of the  (Himalayas)''Jnana Yoga'' and the realization of the Aham Brahmasmi.",
        "deepInsights": "The absence of ritual represents the truth that the ultimate reality is beyond all form and ceremony. Mayavati teaches that the highest forest is the one where the mind becomes one with the mountain.",
        "ancientLore": "Lore tells that Swami Vivekananda personally chose the site because its energy reminded him of the absolute silence of the high Himalayas. Another legend says that the snow peaks of the Nanda Devi personally reflect the light of the Advaita realization to those who meditate in the Mayavati forest.",
        "keyRituals": [
                {
                        "name": "Silent Forest Contemplation",
                        "description": "Walking in absolute silence through the ashram woods to experience the oneness of the self and the nature."
                },
                {
                        "name": "Advaita Meditation (Mayavati)",
                        "description": "Sitting in the dedicated meditation hall to practice the non-dualistic inquiry of ''Who am I?''."
                },
                {
                        "name": "Prabuddha Bharata Reading",
                        "description": "Reflecting on the philosophical articles of the historic journal in the ashram library."
                },
                {
                        "name": "Vivekananda Cottage Visit",
                        "description": "Spending time in the room where the great master stayed to seek the inspiration for the spiritual journey."
                }
        ],
        "highlights": [
                {
                        "name": "The Advaita Meditation Room",
                        "description": "The unique space where no rituals are performed, only silent inquiry."
                },
                {
                        "name": "Vivekananda Cottage",
                        "description": "The historic room where the Swami stayed and meditated in 1901."
                },
                {
                        "name": "The Himalayan Library",
                        "description": "One of the most significant collections of Vedantic and philosophical literature in the Himalayas."
                },
                {
                        "name": "The Old Press",
                        "description": "The site where the Prabuddha Bharata has been continuously published for over a century."
                }
        ],
        "travelInfo": {
                "bestTime": "March to June and September to November (the winters are extremely cold and peaceful).",
                "howToReach": "9km from Lohaghat and 22km from Champawat. Reached by a scenic motorable road through the forest.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station / Tanakpur Railway Station."
        },
        "tips": [
                "Maintain absolute silence and follow the ashram schedule; it is a place for serious seekers and does not cater to casual tourists.",
                "The ashram offers limited accommodation for those interested in serious study; write to the President in advance to seek permission.",
                "Respect the unique rule of no-ritual; do not carry incense, lamps, or idols into the ashram premises."
        ],
        "faqs": [
                {
                        "question": "Why are there no rituals?",
                        "answer": "According to the wish of Swami Vivekananda, the ashram is dedicated purely to the Advaita (non-dual) truth, which is beyond all external forms."
                },
                {
                        "question": "Who was Captain Sevier?",
                        "answer": "He was a British disciple of Swami Vivekananda who, along with his wife, dedicated his life and wealth to establishing this Himalayan sanctuary."
                },
                {
                        "question": "Is it open to the public?",
                        "answer": "Yes, visitors are welcome to visit during the day to meditate and explore the library and the Vivekananda cottage."
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
    'Haidakhan Babaji Ashram', 
    'haidakhan-babaji-ashram-kumaon', 
    'Sacred Destination', 
    'uk', 
    'The ashram of the "Immortal Mahavatar", Haidakhan is a site of absolute Kriya Yoga power. Located on the banks of the Gautami Ganga, it represents the absolute youth of the spirit and the eternal message of Truth, Simplicity, and Love.', 
    '545.2', 
    '255.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Home of the Mahavatar and the Sacred Valley of the Gautami Ganga', 
    'Haidakhan Babaji Ashram | Uttarakhand, Kriya Yoga & Ancient Lore (KUMAON)', 
    'Experience the profound energy of Haidakhan. Discover the ashram of Babaji, the legend of the immortal master, and the profound energy of the global spiritual pilgrimage.', 
    'Haidakhan, Uttarakhand, Babaji, Mahavatar, Kriya Yoga, Hindu Pilgrimage, Ancient Lore, Ranikhet, Ashram (KUMAON)', 
    '282', 
    '{
        "spiritualEssence": "Haidakhan is the manifestation of the divine as the supreme youth and the absolute revitalization of the spiritual path. The energy here is vibrant, river-side, and intensely global. It is the site where the ancient lineage of the masters is made fresh for the modern age. The vibration is one of ''Satya'' (Truth) and the absolute alignment with the cosmic flow. As an ashram set in a peaceful valley where the river flows over white pebbles, it represents the spiritual sanctuary of the central Kumaon. A visit here is believed to grant the devotee the absolute clarity of the purpose and the blessing of the immortal master. The air is always vibrant with the scent of the temple havan and the constant, rhythmic sound of the river and the chanting of the Om Namah Shivaya.",
        "longDescription": "The Haidakhan ashram is dedicated to Haidakhan Babaji, who appeared in a cake here in 1970 and is believed by many to be the same Mahavatar Babaji mentioned in Yogananda''s ''Autobiography of a Yogi.'' He taught the simple path of work as worship (Karma Yoga) and the repetition of the Om Namah Shivaya mantra. The ashram features nine temples built on a hillside, representing the nine forms of the Mother Goddess. It attracts a global community of seekers who live and work together in a spirit of ''Vasudhaiva Kutumbakam (Kumaon)'' (The world is one family). The site is famous for its beautiful river-front and the cave where Babaji performed his initial penance. It is a site where the highest Himalayan mysticism and the most active global community are perfectly unified.",
        "spiritualArchitecture": "The architecture of Haidakhan is a spectacular display of the simple mountain ashram style with a prominent use of white and saffron colors. The nine temples are arranged in a tiered pattern on the hill, overlooking the river valley. A unique feature is the presence of the open-air dhuni (fire-pit) where the sacred fire is kept burning continuously. The architecture is designed to lead the pilgrim from the river banks to the higher shrines through a series of stone-cut steps and pathways. The use of the vibrant murals and the simple, clean-lined structures create a sense of a spiritual city that is both modern and ancient. The complex includes a large community hall where the global satsangs are held.",
        "vedicReferences": "Haidakhan is celebrated in the modern spiritual literature as the primary ground for the performance of the ''Karma Yoga'' and the realization of the eternal truth of the Om Namah Shivaya.",
        "deepInsights": "The message of Truth, Simplicity, and Love represents the truth that the highest spiritual path is not complex. Haidakhan teaches that the work done with the name of God on the lips is the most powerful meditation.",
        "ancientLore": "Lore tells that Babaji personally brought the Gautami Ganga river to the ashram through his spiritual power. Another legend says that the master can still be seen by the sincere seekers walking on the river banks in the middle of the night.",
        "keyRituals": [
                {
                        "name": "Haidakhan Havan (Fire)",
                        "description": "The daily fire ritual performed at dawn to seek the purification of the world and the self."
                },
                {
                        "name": "Gautami Ganga Snanam",
                        "description": "The ritual dip in the crystal clear waters of the river in front of the ashram to seek the revitalization of the spirit."
                },
                {
                        "name": "Karma Yoga (Seva)",
                        "description": "The ritual of performing physical work in the ashram as a form of selfless offering to the master."
                },
                {
                        "name": "Om Namah Shivaya Japa",
                        "description": "The continuous repetition of the sacred mantra in the temple halls and by the river."
                }
        ],
        "highlights": [
                {
                        "name": "The Nine Goddess Temples",
                        "description": "The beautiful cluster of shrines that define the hillside of the ashram."
                },
                {
                        "name": "Babaji''s Cave",
                        "description": "The sacred natural cave where the master first appeared and performed penance."
                },
                {
                        "name": "The Dhuni (Eternal Fire)",
                        "description": "The spiritual heart of the ashram where the sacred flame is kept alive."
                },
                {
                        "name": "The River Gautami Ganga",
                        "description": "The peaceful mountain stream that flows past the ashram, providing a natural sanctuary."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially October to March).",
                "howToReach": "30km from Haldwani and 40km from Ranikhet. Reached by a motorable road that crosses the river bed (accessible by taxi).",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Participate in the morning havan and the evening aarti; the vibration of the group chanting is intensely powerful.",
                "Be prepared to engage in some physical work (Seva) if you stay in the ashram; it is the core teaching of Babaji.",
                "The road crosses a river bed which can be difficult during the monsoon; check the weather and road conditions before traveling."
        ],
        "faqs": [
                {
                        "question": "Who was Haidakhan Babaji?",
                        "answer": "A great spiritual master who appeared in 1970 and taught the path of Truth, Simplicity, and Love through the mantra Om Namah Shivaya."
                },
                {
                        "question": "Is it the same as Mahavatar Babaji?",
                        "answer": "Many devotees believe so, though the master himself rarely spoke about his past or his identity."
                },
                {
                        "question": "Can westerners visit?",
                        "answer": "Yes, the ashram has a very large international community and is very welcoming to seekers from all over the world."
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
    'Bageshwar Bagnath Temple', 
    'bageshwar-bagnath-kumaon', 
    'Sacred Destination', 
    'uk', 
    'The "Varanasi of Kumaon", Bageshwar is located at the confluence of the Sarayu and Gomti. It is a site of absolute Shaiva authority, where Lord Shiva is worshipped as Bagnath (the Tiger Lord), representing the absolute lordship over nature.', 
    '560.2', 
    '240.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Tiger Lord of the Confluence and the Soul of the Kumaon Sages', 
    'Bageshwar Bagnath Temple | Uttarakhand, Shiva & Ancient Lore (KUMAON)', 
    'Experience the profound energy of Bageshwar. Discover the Bagnath temple, the legend of the tiger-transformation, and the profound energy of the Kumaon pilgrimage.', 
    'Bageshwar, Uttarakhand, Shiva, Bagnath, Kumaon, Hindu Pilgrimage, Ancient Lore, Confluence (KUMAON)', 
    '283', 
    '{
        "spiritualEssence": "Bageshwar is the manifestation of the divine as the supreme master and the absolute guardian of the river-lands. The energy here is ancient, resonant, and intensely authoritative. It is the site where the wild spirit of the mountains was anchored in the form of the tiger. The vibration is one of  (Kumaon)''Moksha'' (Liberation) and the absolute connection to the ancestral waters. As a town set at the junction of the two most sacred rivers of Kumaon, it represents the spiritual epicenter of the central Himalayas. A visit here is believed to grant the devotee the absolute freedom from the karmic debts and the blessing of the divine protection. The air is always vibrant with the scent of the river mist and the constant, rhythmic sound of the bells of the Bagnath.",
        "longDescription": "Bageshwar (derived from Bagnath - Tiger Lord) is famous for the Bagnath Temple, which dates back to the 14th century. Legend tells that the Sage Markandeya meditated here, and Lord Shiva appeared to him in the form of a tiger. The town is considered equivalent to Varanasi; a dip at the confluence here grants the same merit as a dip in the Ganga at Kashi. The site is the venue for the massive Uttarayani fair in January. Bageshwar is a site where the highest Puranic mythology and the most vibrant Kumaon tribal traditions are perfectly unified.",
        "spiritualArchitecture": "The architecture of Bageshwar is a spectacular display of the medieval Nagara style with high, tiered shikharas and massive stone walls. The Bagnath Temple features a prominent spire and a series of intricate relief carvings. A unique feature is the presence of hundreds of small stone Lingams and idols donated by devotees, creating a \"forest of stone\" in the courtyard. The architecture is designed to lead the pilgrim from the river ghats to the central sanctum, emphasizing the connection between the water and the fire of the deity. The use of the local gray stone and the expansive riverfront platforms create a sense of a spiritual city that has stood for a thousand years.",
        "vedicReferences": "Bageshwar is celebrated in the Skanda Purana (Manaskhanda) as the site where the Sarayu and Gomti rivers meet to create the absolute ground for liberation.",
        "deepInsights": "The transformation into a tiger represents the truth that the divine can take any form to respect the devotion of the sincere seeker. Bageshwar teaches that the highest mastery is the control over the animal nature.",
        "ancientLore": "Lore tells that the great saint Adi Shankaracharya personally meditated here to balance the energy of the rivers. Another legend says that the fish in the Bageshwar confluence are the protectors of the souls of the ancestors.",
        "keyRituals": [
                {
                        "name": "Bagnath Jal Abhishekam",
                        "description": "The ritual of offering sacred river water to the Tiger Lord to seek his protection and grace."
                },
                {
                        "name": "Uttarayani Mela Snanam",
                        "description": "The grand annual dip at the confluence during the winter solstice to seek the absolute purification."
                },
                {
                        "name": "Sarayu Deep Daan",
                        "description": "Offering lamps to the river Sarayu at sunset to seek the blessing of the cosmic flow."
                },
                {
                        "name": "Markandeya Meditation",
                        "description": "Sitting in the temple courtyard to reflect on the eternal life of the sage who saw the Lord here."
                }
        ],
        "highlights": [
                {
                        "name": "Bagnath Temple",
                        "description": "The ancient stone heart of the town dedicated to the Tiger Lord."
                },
                {
                        "name": "Sarayu-Gomti Sangam",
                        "description": "The spectacular confluence of the two major rivers that defines the spiritual geography of Bageshwar."
                },
                {
                        "name": "Chandika Temple",
                        "description": "A nearby powerful Shakti shrine associated with the protection of the town."
                },
                {
                        "name": "The Medieval Stone Lingams",
                        "description": "The unique collection of thousands of sacred stones that fill the temple complex."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially January for the Uttarayani fair).",
                "howToReach": "90km from Almora and 150km from Kathgodam. Well connected by road; regular buses and taxis run from Almora and Kathgodam.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Visit the temple during the morning aarti for a truly resonant and ancient experience of the Himalayan Shaivism.",
                "Participate in the fish-feeding ritual at the river ghats; it is a traditional act of compassion in Bageshwar.",
                "Combine your visit with a trip to the nearby Pindari Glacier base camp for a complete experience of the Kumaon mountains."
        ],
        "faqs": [
                {
                        "question": "Why is it called the Varanasi of Kumaon?",
                        "answer": "Because of its location at a sacred confluence and its reputation as a major center for liberation and ancestral rituals."
                },
                {
                        "question": "How old is the temple?",
                        "answer": "The current structure was built in 1450 by the Chand king Laxmi Chand, but the site has been sacred since the Puranic era."
                },
                {
                        "question": "Who is Bagnath?",
                        "answer": "It refers to Lord Shiva as the ''Lord of the Tigers'' (Bag - Tiger, Nath - Lord)."
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
    'Baijnath', 
    'baijnath-temple-complex-kumaon', 
    'Sacred Destination', 
    'uk', 
    'The "Temples of the Gomti Valley", Baijnath is an ancient stone complex on the banks of the Gomti river. It is a site of absolute artistic authority and divine resonance, where the Lord Shiva is worshipped as Vaidyanath (the Lord of Physicians), representing the absolute manifestation of the healing power and the profound energy of the Katyuri architecture.', 
    '555.2', 
    '235.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Healing Lord of the Gomti and the Stone Masterpiece of the Katyuri Kings', 
    'Baijnath Temple Complex | Uttarakhand, Shiva & Ancient Lore', 
    'Experience the profound beauty of Baijnath. Discover the 12th-century stone temples, the legend of the healing Lord, and the profound energy of the Kumaon pilgrimage.', 
    'Baijnath, Uttarakhand, Shiva, Vaidyanath, Gomti River, Kumaon, Hindu Pilgrimage, Ancient Lore, Katyuri Kings', 
    '284', 
    '{
        "spiritualEssence": "Baijnath is the manifestation of the divine as the supreme healing and the absolute refinement of the sacred art. The energy here is tranquil, river-side, and intensely luminous. It is the site where the high Himalayan spirit is reflected in the waters of the Gomti. The vibration is one of ''Arogya'' (Health) and the absolute clarity of the physical and spiritual well-being. As a complex of 18 ancient stone temples set in a wide, fertile valley, it represents the spiritual jewel of the central Kumaon. A visit here is believed to grant the devotee the absolute restoration of the health and the blessing of the divine beauty. The air is always vibrant with the scent of the river reeds and the silent, heavy energy of the ancient stone-craft.",
        "longDescription": "Baijnath was the capital of the Katyuri kings, who ruled over the region between the 7th and 13th centuries. The temple complex is famous for its life-sized statue of the Goddess Parvati, carved out of the gray chloride schist. Legend tells that the Lord Shiva and the Goddess Parvati were married at the confluence of the Gomti and the Garur Ganga nearby. The temples are a masterpiece of the stone carving, featuring intricate designs on the ceilings and the pillars. The site is a favorite of the art historians and the spiritual seekers alike. It is a site where the highest level of Himalayan medieval sculpture and the most serene valley-side ecology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Baijnath is a spectacular display of the refined Nagara style with a focus on the smooth surfaces and the elegant proportions. The main temple features a high shikhara and an intricately carved entrance hall (mandapam). A unique feature is the presence of the numerous small shrines dedicated to the various deities. The architecture is designed to lead the pilgrim from the river ghats to the central sanctum, emphasizing the connection between the water and the fire of the deity. The use of the local gray stone and the expansive riverfront platforms create a sense of a spiritual city that has stood for a thousand years.",
        "vedicReferences": "Baijnath is celebrated in the local oral traditions as the supreme site where the divine physicians (the Ashvins) offered prayers to the Lord Shiva.",
        "deepInsights": "The healing Lord represents the truth that the spirit is the source of all the physical well-being. Baijnath teaches that the highest beauty is the one that reflects the divine order.",
        "ancientLore": "Lore tells that the statue of Parvati in the temple was personally carved by the celestial architect Vishwakarma. Another legend says that the fish in the Gomti river at Baijnath are protected by the Goddess and will never leave the temple stretch of the water.",
        "keyRituals": [
                {
                        "name": "Baijnath Healing Abhishekam",
                        "description": "The ritual of offering sacred river water to the Lord Vaidyanath to seek the physical and the spiritual healing."
                },
                {
                        "name": "Gomti River Arghya",
                        "description": "Offering prayers to the river Gomti at sunset to seek the blessing of the life-giving waters."
                },
                {
                        "name": "Parvati Darshan",
                        "description": "Praying before the magnificent statue of the Goddess to seek the blessing of the divine grace and the beauty."
                },
                {
                        "name": "Fish-Feeding (Baijnath)",
                        "description": "The ritual of feeding the sacred fish in the river as an act of compassion and the gratitude."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Vaidyanath Temple",
                        "description": "The ancient stone heart of the complex dedicated to the Lord of Healing."
                },
                {
                        "name": "The Parvati Statue",
                        "description": "One of the most beautiful and refined stone statues of the Goddess in the Himalayas."
                },
                {
                        "name": "The Gomti River Ghats",
                        "description": "The peaceful river banks that offer a perfect spot for the meditation and the prayer."
                },
                {
                        "name": "The Katyuri Capital Remains",
                        "description": "The archaeological remains of the ancient capital of the Kumaon kings."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the valley is most beautiful in the spring and the autumn).",
                "howToReach": "20km from Kausani and 70km from Almora. Well connected by road; regular taxis and buses run from Kausani and Almora.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Visit the temple in the late afternoon to see the golden light reflected on the stone and the river.",
                "Spend time in the Gomti river ghats; it is one of the most peaceful river-side spots in the Kumaon.",
                "Maintain the absolute respect for the ancient sculptures; do not touch the delicate carvings in the inner sanctum."
        ],
        "faqs": [
                {
                        "question": "Who were the Katyuri kings?",
                        "answer": "They were an ancient dynasty that ruled Kumaon and established many of its most famous stone temples."
                },
                {
                        "question": "What is the Gomti river connection?",
                        "answer": "The temple is located on the banks of the Gomti, which is considered a sacred river in the Kumaon region."
                },
                {
                        "question": "Is it near Kausani?",
                        "answer": "Yes, it is only 20km from Kausani, making it a popular day-trip destination."
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
    'Dhari Devi (Guardian of Alaknanda)', 
    'dhari-devi-temple-srinagar-garhwal', 
    'Sacred Destination', 
    'uk', 
    'The "Guardian of the Alaknanda", Dhari Devi is a powerful Shakti shrine located on the banks of the Alaknanda river near Srinagar. It is a site of absolute regional authority and protective resonance, being the guardian deity of the Char Dham, representing the absolute manifestation of the Mother as the master of the river currents and the profound energy of the mountain-watch.', 
    '450.2', 
    '265.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Protector of the Char Dham and the Goddess of the Alaknanda Waves', 
    'Dhari Devi Temple | Uttarakhand, Shakti & Ancient Lore (GARHWAL)', 
    'Experience the profound power of Dhari Devi. Discover the river-shrine, the legend of the Char Dham guardian, and the profound energy of the Garhwal pilgrimage.', 
    'Dhari Devi, Uttarakhand, Shakti, Alaknanda River, Char Dham, Hindu Pilgrimage, Ancient Lore, Srinagar Garhwal', 
    '285', 
    '{
        "spiritualEssence": "Dhari Devi is the manifestation of the divine as the supreme protection and the absolute power of the mountain sentinel. The energy here is fresh, river-fed, and intensely alert. It is the site where the upper half of the Goddess Kali is worshipped. The vibration is one of ''Raksha'' (Protection) and the absolute awareness of the Himalayan movements. As a temple that was moved to a raised platform following the construction of the Srinagar dam, it represents the spiritual resilience of the Garhwal. A visit here is believed to grant the devotee the absolute safety during the Char Dham yatra and the blessing of the divine guidance. The air is always vibrant with the scent of the river mist and the constant, rhythmic sound of the Alaknanda flowing beneath the temple floor.",
        "longDescription": "Dhari Devi is one of the most revered Shakti shrines in Uttarakhand. According to the legend, the upper half of the Goddess Kali is worshipped here, while the lower half is in Kalimath. She is considered the protector of the Char Dham pilgrims. The temple gained massive international attention in 2013, when local faith connected the removal of the original idol for the dam project to the devastating Himalayan floods. The idol of the Goddess is famous for changing its appearance—looking like a young girl in the morning, a young woman at noon, and an old woman in the evening. It is a site where the highest level of mountain folklore and the most intense river-side devotion are perfectly unified.",
        "spiritualArchitecture": "The architecture of Dhari Devi is a spectacular display of the modern high-platform style integrated with the ancient stone shrine. Following the dam project, the temple was elevated on a massive concrete platform that stands directly in the middle of the Alaknanda river. A unique feature is the use of the glass and the open balconies that allow the pilgrims to look directly down into the emerald green waters. The architecture is designed to emphasize the exposure to the elements and the river. The use of the vibrant red flags and the simple stone sanctum create a sense of a spiritual fortress that is both ancient and adapted. The complex includes a long walkway connecting the shore to the river-top shrine.",
        "vedicReferences": "Dhari Devi is celebrated in the local oral traditions as the supreme site where the Mother personally manifested to protect the sacred river path of the sages.",
        "deepInsights": "The changing face of the Goddess represents the truth that the divine is present in all the stages of the human life. Dhari Devi teaches that the spirit must remain watchful and adaptive in the face of the change.",
        "ancientLore": "Lore tells that the original idol of the Goddess was found floating in the Alaknanda after a major landslide centuries ago. Another legend says that the Goddess personally commanded the kings of the Garhwal to build her temple at this specific bend of the river to anchor the mountain energy.",
        "keyRituals": [
                {
                        "name": "Alaknanda Deep Arati",
                        "description": "The ritual of offering lamps to the river from the temple platform to seek the safe passage for the pilgrims."
                },
                {
                        "name": "Dhari Devi Jal-Puja",
                        "description": "Offering sacred river water to the Goddess to seek the family protection and the stability."
                },
                {
                        "name": "Face-Transformation Darshan",
                        "description": "The ritual of visiting the temple at different times of the day to witness the changing features of the Goddess."
                },
                {
                        "name": "Char Dham Sankalpa",
                        "description": "Taking a sacred vow at Dhari Devi before starting the journey to the four high Himalayan shrines."
                }
        ],
        "highlights": [
                {
                        "name": "The River-Top Shrine",
                        "description": "The unique elevated heart of the temple located in the middle of the Alaknanda."
                },
                {
                        "name": "The Manifesting Idol",
                        "description": "The sacred image of the Goddess known for changing its appearance throughout the day."
                },
                {
                        "name": "The Alaknanda View",
                        "description": "The spectacular perspective of the river flowing through the deep Garhwal valley."
                },
                {
                        "name": "The Sacred Bells",
                        "description": "The collection of the historic bells that ring with the sound of the river wind."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the river is most beautiful in the spring and the autumn).",
                "howToReach": "Located 15km from Srinagar (Garhwal) on the road to Rudraprayag. Easily accessible by taxi or bus.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit the temple at different times of the day to experience the unique changes in the idol''s expression.",
                "Maintain absolute respect for the river environment; do not throw any plastic or waste into the Alaknanda from the platform.",
                "The temple can be quite windy; carry a light shawl or jacket even during the summer months."
        ],
        "faqs": [
                {
                        "question": "Why is she called the guardian of the Char Dham?",
                        "answer": "Because it is traditionally believed that no pilgrimage to the four high shrines is complete or safe without seeking her blessing first."
                },
                {
                        "question": "How do we reach the temple?",
                        "answer": "The temple is located directly on the main highway between Srinagar and Rudraprayag, with a walkway leading to the river-top shrine."
                },
                {
                        "question": "What happened during the 2013 floods?",
                        "answer": "Local tradition links the floods to the removal of the Goddess''s original idol from its ancient spot just hours before the disaster."
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
    'Surkanda Devi (Dhanaulti)', 
    'surkanda-devi-temple-dhanaulti', 
    'Sacred Destination', 
    'uk', 
    'The "Goddess of the High Ridges", Surkanda Devi is a supreme Shakti Peeth located at an altitude of 2,756 meters near Dhanaulti. It is a site of absolute ridgetop authority and divine presence, where the head of Sati is believed to have fallen, representing the absolute seat of the intellectual and the spiritual power that crowns the Garhwal Himalayas.', 
    '410.2', 
    '245.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Crown of the Garhwal Hills and the Sanctuary of the High Snow Peaks', 
    'Surkanda Devi Temple | Uttarakhand, Shakti Peeth & Ancient Lore (DHANAULTI)', 
    'Experience the profound energy of Surkanda Devi. Discover the ridgetop Shakti Peeth, the legend of the falling head of Sati, and the profound energy of the Mussoorie-Dhanaulti pilgrimage.', 
    'Surkanda Devi, Uttarakhand, Shakti Peeth, Dhanaulti, Hindu Pilgrimage, Ancient Lore, High Altitude, Snow Peaks', 
    '286', 
    '{
        "spiritualEssence": "Surkanda is the manifestation of the divine as the supreme clarity and the absolute power of the ridgetop vision. The energy here is cool, expansive, and intensely luminous. It is the site where the head of the Mother Goddess became the crown of the mountain. The vibration is one of ''Jnana'' (Knowledge) and the absolute perspective over the world. As a temple perched on a 360-degree viewing peak offering panoramic views of the high Himalayas, it represents the spiritual guardian of the central ridges. A visit here is believed to grant the devotee the absolute removal of the mental confusion and the blessing of the divine wisdom. The air is always vibrant with the scent of the wild mountain herbs and the constant, rhythmic sound of the high-altitude winds through the rhododendrons.",
        "longDescription": "Surkanda Devi is one of the most important Shakti Peethas in Uttarakhand. According to the Puranas, when Lord Shiva was carrying the charred body of Sati, her head fell at this spot. The original name was ''Sirkhanda'' (The place where the head fell), which later became Surkanda. The temple is famous for its location, requiring a steep 2km climb from the Kaddukhal area, though a ropeway now makes it accessible to all. The site provides one of the best views of the high Himalayan giants, including the Nanda Devi, the Kedarnath, and the Badrinath ranges. Legend tells that the great saint Adi Shankaracharya visited this site to establish the Devi as the supreme intellect of the mountains. It is a site where the highest level of ridgetop geography and the most intense local faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Surkanda is a spectacular display of the traditional mountain ridge style with a focus on the simplicity and the exposure to the horizon. The temple features a small stone shrine with a white-washed exterior and a series of paved platforms that wrap around the peak. A unique feature is the presence of several iron tridents (trishuls) anchored into the rock, representing the fierce protection of the Mother. The architecture is designed to minimize the visual obstruction of the sky, creating a sense of a spiritual home that is suspended in the clouds. The use of the vibrant red flags and the simple stone flooring create a sense of a spiritual retreat that is both ancient and alert. The complex includes several small benches and a nearby viewpoint with a large open ground.",
        "vedicReferences": "Surkanda is celebrated in the local oral traditions as the supreme site where the Mother personally manifested her lunar brilliance to guide the mountain travelers.",
        "deepInsights": "The falling of the head represents the truth that the highest realization is the transformation of the intellect into the divine wisdom. Surkanda teaches that the spirit must rise to the highest point to see the truth clearly.",
        "ancientLore": "Lore tells that the mountain peak personally rose higher to receive the sacred relic of the Mother. Another legend says that the bells of Surkanda can be heard in the celestial realms during the autumn equinox, signaling the balance of the cosmic energies.",
        "keyRituals": [
                {
                        "name": "Surkanda Head-Puja",
                        "description": "The ritual of offering sacred flowers to the Goddess to seek the mental clarity and the intellectual growth."
                },
                {
                        "name": "Ridgetop Havan",
                        "description": "The performance of the fire ritual at the highest point of the peak to seek the purification of the world."
                },
                {
                        "name": "Himalayan Panorama Japa",
                        "description": "Performing the meditation while focusing on the high snow peaks from the temple courtyard."
                },
                {
                        "name": "Dhwaja Arpan (Surkanda)",
                        "description": "Tying the sacred red flags at the peak to seek the divine protection and the victory."
                }
        ],
        "highlights": [
                {
                        "name": "The High-Peak Shrine",
                        "description": "The sacred heart of the temple where the energy of the Shakti Peeth is housed."
                },
                {
                        "name": "The 360-Degree Himalayan View",
                        "description": "The spectacular vantage point offering views of the entire Garhwal and Kumaon ranges."
                },
                {
                        "name": "The Surkanda Ropeway",
                        "description": "The modern aerial path that provides a unique perspective of the ridge during the ascent."
                },
                {
                        "name": "The Ancient Trishul Gallery",
                        "description": "The collection of the historic iron tridents representing the warrior-spirit of the mountain Mother."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially the Navratri months and the spring).",
                "howToReach": "Located 40km from Mussoorie near Dhanaulti. Reached by road to Kaddukhal, followed by a 2km trek or a ropeway ride.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Start the climb early in the morning to enjoy the sunrise over the snow peaks; the light at this altitude is exceptionally pure.",
                "The weather can be significantly colder than in Mussoorie; carry a light sweater or shawl even in the summer.",
                "Spend some time sitting in the open courtyard; the energy of the high ridge is exceptionally conductive to meditation."
        ],
        "faqs": [
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the important Shakti Peethas, where the head of the Goddess Sati is said to have fallen."
                },
                {
                        "question": "Is there a ropeway?",
                        "answer": "Yes, a recently inaugurated ropeway now takes you directly to the temple peak from the road head."
                },
                {
                        "question": "How long is the trek?",
                        "answer": "The trek is about 2km on a well-paved but steep path, taking about 1 hour for a slow walk."
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
    'Lakhamandal Temple Complex', 
    'lakhamandal-temple-complex-dehradun', 
    'Sacred Destination', 
    'uk', 
    'The "Abode of the Million Lingams", Lakhamandal is an ancient stone temple complex in the Yamuna valley. It is a site of absolute archaeological and spiritual authority, believed to be the spot where the Mahabharata''s "House of Lac" was located, representing the absolute manifestation of the eternal spirit and the profound energy of the ancient stone-craft.', 
    '350.2', 
    '240.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Million Shivas and the Ancient House of the Mahabharata', 
    'Lakhamandal Temple Complex | Uttarakhand, Shiva & Ancient Lore', 
    'Experience the profound history of Lakhamandal. Discover the thousand-year-old stone temples, the legend of the Pandavas, and the profound energy of the Yamuna valley pilgrimage.', 
    'Lakhamandal, Uttarakhand, Shiva, Mahabharata, Pandavas, Hindu Pilgrimage, Ancient Lore, Yamuna Valley, Archaeology', 
    '287', 
    '{
        "spiritualEssence": "Lakhamandal is the manifestation of the divine as the supreme endurance and the absolute multiplicity of the spiritual form. The energy here is ancient, stone-clad, and intensely resonant. It is the site where the heavy scent of the wet earth meets the vibration of the thousand-year-old chloride schist. The vibration is one of ''Akshaya'' (Imperishable) and the absolute connection to the historical roots of the Dharma. As a complex of shrines set in a high valley overlooking the Yamuna, it represents the spiritual sentinel of the western Garhwal. A visit here is believed to grant the devotee the absolute removal of the ancestral debts and the blessing of the spiritual multiplicity. The air is always vibrant with the scent of the river mist and the silent, heavy energy of the millions of the unseen Lingams.",
        "longDescription": "Lakhamandal is one of the most significant archaeological sites in India. The name is derived from the belief that there are over a lakh (one hundred thousand) or even a million Lingams in and around the complex. The main temple, dedicated to the Lord Shiva, dates back to the 12th-13th centuries and is built in the Nagara style. According to the local tradition, this is the site of the ''Lakshagriha'' (House of Lac) built by the Kauravas to burn the Pandavas alive. The site features two magnificent stone statues of the temple guardians, Arjuna and Bhima, and a unique graphite Lingam that shines when water is poured on it. It is a site where the highest level of Himalayan stone-sculpture and the most intense Mahabharata lore are perfectly unified.",
        "spiritualArchitecture": "The architecture of Lakhamandal is a spectacular display of the refined stone style of the medieval Himalayas, primarily using the dark chloride schist and the local gray stone. The main temple features a high, tiered shikhara and an intricately carved entrance hall (mandapam). A unique feature is the presence of hundreds of small stone Lingams and fragments of the ancient carvings scattered around the temple courtyard. The architecture is designed to lead the pilgrim through a forest of stone, where every corner reveals a piece of the ancient history. The use of the dark, polished stone against the backdrop of the emerald green hills creates a sense of a spiritual library that is both ancient and accessible. The complex includes several sacred water tanks and stone-paved platforms.",
        "vedicReferences": "Lakhamandal is celebrated in the local oral epics as the supreme site where the Pandavas personally worshipped the Lord Shiva to seek the strength for the great war.",
        "deepInsights": "The million Lingams represent the truth that the divine is present in every particle of the existence. Lakhamandal teaches that the spirit can survive even the most intense fire if it is anchored in the truth.",
        "ancientLore": "Lore tells that if a person dies in front of the main Lingam, they are momentarily brought back to life by the divine energy to speak their last wish. Another legend says that the graphite Lingam was personally brought from the underworld by the Naga kings to honor the Lord of the Lakhamandal.",
        "keyRituals": [
                {
                        "name": "Graphite Lingam Abhisheka",
                        "description": "Offering sacred Yamuna water to the unique black Lingam to see the divine reflection and seek the mental clarity."
                },
                {
                        "name": "Lakha-Lingam Parikrama",
                        "description": "Walking in silence through the hundreds of the stone Lingams to absorb the cumulative energy of the site."
                },
                {
                        "name": "Pandava Gufa Meditation",
                        "description": "Sitting in the nearby caves associated with the Pandavas to practice the silent contemplation."
                },
                {
                        "name": "Yamuna Valley Arati",
                        "description": "The ritual of offering light at dusk to seek the harmony with the spirits of the river and the valley."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Shiva Temple",
                        "description": "The ancient stone heart of the complex, a masterpiece of the medieval Garhwali art."
                },
                {
                        "name": "The Graphite Lingam",
                        "description": "The unique and sacred stone that shines with a celestial light when moistened."
                },
                {
                        "name": "The Guardian Statues",
                        "description": "The massive stone images of Arjuna and Bhima that protect the temple entrance."
                },
                {
                        "name": "The Ancient Lingam Field",
                        "description": "The spectacular collection of hundreds of stone carvings that fill the temple courtyard."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the valley is most beautiful in the spring and the autumn).",
                "howToReach": "Located 128km from Dehradun and 35km from Chakrata. Reached by a scenic road through the Yamuna valley.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Spend time observing the details of the stone carvings; they provide deep insights into the medieval Himalayan culture and the mythology.",
                "The graphite Lingam is particularly beautiful when viewed during the morning rituals; try to visit early.",
                "Maintain the absolute respect for the ancient monuments; do not touch or move any of the small Lingams in the courtyard."
        ],
        "faqs": [
                {
                        "question": "Why is it called Lakhamandal?",
                        "answer": "Because of the belief that there are a ''lakh'' (hundred thousand) or more Lingams located in the complex and the surrounding fields."
                },
                {
                        "question": "Is it connected to the Mahabharata?",
                        "answer": "Yes, it is traditionally believed to be the site of the ''Lakshagriha'' (the House of Lac) mentioned in the epic."
                },
                {
                        "question": "What is the unique feature of the Lingam?",
                        "answer": "The main Lingam is made of graphite, which becomes exceptionally shiny and reflective when water is poured on it."
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
    'Kalimath Shakti Peeth', 
    'kalimath-temple-rudraprayag', 
    'Sacred Destination', 
    'uk', 
    'The "Womb of the Mother", Kalimath is one of the most powerful Shakti shrines in India. Located on the banks of the Saraswati river near Guptkashi, it is a site of absolute mystical authority and divine ferocity, where the Goddess Kali is believed to have entered the earth after slaying the demon Raktavija, representing the absolute manifestation of the hidden power and the profound energy of the Tantric-Shakti tradition.', 
    '460.5', 
    '230.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Dark Sanctuary of the Mandakini Valley and the Root of the Shakti Power', 
    'Kalimath Temple | Uttarakhand, Kali & Ancient Lore', 
    'Experience the profound power of Kalimath. Discover the hidden Shakti shrine, the legend of the Goddess Kali, and the profound energy of the Kedarnath valley pilgrimage.', 
    'Kalimath, Uttarakhand, Kali, Shakti Peeth, Rudraprayag, Hindu Pilgrimage, Ancient Lore, Tantra, Saraswati River', 
    '288', 
    '{
        "spiritualEssence": "Kalimath is the manifestation of the divine as the supreme mystery and the absolute power of the hidden presence. The energy here is dark, intense, and intensely resonant. It is the site where the earth was split by the force of the Goddess. The vibration is one of ''Shakti'' (Power) and the absolute connection to the subterranean womb of the world. As a temple where the idol is not a statue but a silver plate covering a sacred pit, it represents the spiritual root of the Garhwal Shakti. A visit here is believed to grant the devotee the absolute removal of the deepest fears and the blessing of the fierce protection. The air is always vibrant with the scent of the iron and the constant, rhythmic sound of the Saraswati river roaring past the temple walls.",
        "longDescription": "Kalimath is uniquely significant as one of the 108 Shakti Peethas and is considered the only place where the Goddess Kali is worshipped along with her sisters Lakshmi and Saraswati in their highest forms. According to the tradition, after killing the demon Raktavija, the Goddess entered the earth at this spot. The temple is famous for not having an idol; instead, the Goddess is worshipped in a sacred pit (Yantra) covered by a silver plate. Legend tells that the great saint Adi Shankaracharya personally established the temple to anchor the fierce energy of the valley. It is also the birthplace of the legendary poet Kalidasa, who is said to have received his wisdom here by the grace of the Mother. It is a site where the highest level of Tantric mysticism and the most ancient mountain geography are perfectly unified.",
        "spiritualArchitecture": "The architecture of Kalimath is a spectacular display of the traditional Garhwali stone style with a focus on the simplicity and the concealment. The temple features a low stone shrine with a white-washed exterior and a series of dark, smoke-stained inner chambers. A unique feature is the presence of the massive silver plate that covers the central sacred pit, which is opened only once a year during the Navratri. The architecture is designed to create a sense of an ancient, grounded sanctuary that is both hidden and protective. The use of the local gray stone and the vibrant red flags create a sense of a spiritual home that is both ancient and alert. The complex includes several smaller shrines dedicated to the various manifestations of the Goddess and the Lord Shiva.",
        "vedicReferences": "Kalimath is celebrated in the Devi Mahatmya as the supreme site where the Mother personally withdrew her manifest form to protect the balance of the universe.",
        "deepInsights": "The hidden shrine represents the truth that the highest power is the one that is found in the absolute center of the silence. Kalimath teaches that the spirit must enter the depth of the inner earth to find the true light.",
        "ancientLore": "Lore tells that the river Saraswati personally changed its course to flow past the temple to wash the feet of the Goddess. Another legend says that the silver plate of Kalimath can be seen glowing in the subtle form during the Amavasya (new moon) nights, signaling the presence of the Mother.",
        "keyRituals": [
                {
                        "name": "Kalimath Silver Plate Puja",
                        "description": "Offering prayers and flowers to the sacred silver cover to seek the protection and the empowerment."
                },
                {
                        "name": "Saraswati River Snanam (Kalimath)",
                        "description": "Bathing in the fast-flowing river next to the temple to seek the purification from the ignorance."
                },
                {
                        "name": "Navratri Night Jaagar",
                        "description": "Participating in the night-long ritual of chanting and drumming to invoke the spirit of the Goddess during the sacred nine nights."
                },
                {
                        "name": "Bhairav Darshan (Kalimath)",
                        "description": "Visiting the nearby shrine of the protective Bhairav to seek the complete alignment with the temple energy."
                }
        ],
        "highlights": [
                {
                        "name": "The Hidden Shakti Pit",
                        "description": "The sacred heart of the temple where the energy of the Goddess Kali is most intensely concentrated."
                },
                {
                        "name": "The Silver Plate of the Mother",
                        "description": "The unique and sacred object that covers the site of the Goddess''s entry into the earth."
                },
                {
                        "name": "The Saraswati River Cascade",
                        "description": "The spectacular natural waterfall and the river flow that surround the temple complex."
                },
                {
                        "name": "The Kalidasa Memorial",
                        "description": "The spot associated with the great poet''s enlightenment by the grace of the Mother Kali."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the Navratri months of October and March are particularly vibrant).",
                "howToReach": "Located 20km from Guptkashi in the Rudraprayag district. Reached by road; regular taxis run from Guptkashi and Rudraprayag.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Maintain absolute silence and respect the local Tantric traditions; the temple is a site of intense spiritual work.",
                "The river current is extremely strong; do not attempt to bathe in the deep areas, use the designated safe spots near the temple.",
                "Respect the privacy of the priests during the secret rituals; do not attempt to look into the sacred pit without permission."
        ],
        "faqs": [
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the 108 Shakti Peethas, where the Goddess Kali is believed to have entered the earth."
                },
                {
                        "question": "Why is there no idol?",
                        "answer": "The tradition here focuses on the subterranean energy; the Goddess is worshipped in a sacred pit (Yantra) rather than a physical form."
                },
                {
                        "question": "What is the connection with Kalidasa?",
                        "answer": "Legend says that the poet was a simple man who received the gift of the immense wisdom and the poetic skill after worshipping the Mother at Kalimath."
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
    'Triyuginarayan (Wedding Temple)', 
    'triyuginarayan-temple-wedding-shiva-parvati', 
    'Sacred Destination', 
    'uk', 
    'The "Temple of the Eternal Flame", Triyuginarayan is a historic Vishnu temple in the Rudraprayag district. It is a site of absolute mythological authority and divine union, being the legendary spot where Lord Shiva and Goddess Parvati were married, representing the absolute manifestation of the cosmic balance and the profound energy of the eternal wedding fire.', 
    '470.5', 
    '225.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Divine Marriage and the Akhand Dhuni of the Three Ages', 
    'Triyuginarayan Temple | Uttarakhand, Shiva-Parvati Wedding & Ancient Lore (PARVATI)', 
    'Experience the profound energy of Triyuginarayan. Discover the eternal wedding flame, the legend of the divine marriage, and the profound energy of the Kedarnath pilgrimage.', 
    'Triyuginarayan, Uttarakhand, Shiva, Parvati, Vishnu, Divine Wedding, Hindu Pilgrimage, Ancient Lore, Eternal Flame, Rudraprayag', 
    '289', 
    '{
        "spiritualEssence": "Triyuginarayan is the manifestation of the divine as the supreme union and the absolute commitment of the spirit. The energy here is warm, celebratory, and intensely stable. It is the site where the fire of the cosmic wedding still burns. The vibration is one of ''Mangala'' (Auspiciousness) and the absolute resonance of the sacred vows. As a temple set in a beautiful village overlooking the snow peaks of the Kedarnath range, it represents the spiritual heart of the divine partnership. A visit here is believed to grant the devotee the absolute harmony in the relationships and the blessing of the eternal love. The air is always vibrant with the scent of the wood-smoke and the constant, rhythmic sound of the ancient wedding hymns.",
        "longDescription": "Triyuginarayan is one of the most significant pilgrimage sites in the Himalayas. According to the Puranas, Lord Vishnu personally acted as the brother of Goddess Parvati and performed the wedding rituals, while Lord Brahma served as the priest. The temple is famous for its ''Akhand Dhuni'' (Eternal Flame) that has been burning continuously since the time of the divine wedding. Devotees offer wood to the fire and take the sacred ash (Vibhuti) as a blessing. The site also features three sacred pools (kunds)—the Rudra Kund, the Vishnu Kund, and the Brahma Kund—where the gods performed their ablutions. It is a site where the highest level of Puranic mythology and the most romantic spiritual tradition are perfectly unified.",
        "spiritualArchitecture": "The architecture of Triyuginarayan is a spectacular display of the traditional Garhwali stone style with a focus on the structural permanence and the communal space. The temple features a central stone shrine with a tiered shikhara and a large open-air courtyard where the sacred fire is kept. A unique feature is the presence of the massive iron tridents and the ancient stone inscriptions that record the history of the temple. The architecture is designed to emphasize the warmth and the light of the eternal flame. The use of the local gray stone and the vibrant saffron flags create a sense of a spiritual home that is both ancient and inviting. The complex includes several small resting halls and the three sacred kunds located just outside the main gate.",
        "vedicReferences": "Triyuginarayan is celebrated in the Skanda Purana as the supreme site where the ''Vivaha-Sanskara'' (the sacrament of marriage) was personally performed by the gods.",
        "deepInsights": "The eternal flame represents the truth that the divine union is a process that continues through all the ages of time. Triyuginarayan teaches that the highest commitment is the one that is kept alive through the constant offering of the self.",
        "ancientLore": "Lore tells that the wood for the eternal fire is personally brought by the celestial messengers from the high Himalayan forests. Another legend says that the smoke of the Triyuginarayan fire can be seen by the realized souls in the heaven, signaling the continued balance of the world.",
        "keyRituals": [
                {
                        "name": "Akhand Dhuni Wood Offering",
                        "description": "Offering a piece of wood to the eternal fire to seek the long life and the harmony for the family."
                },
                {
                        "name": "Divine Marriage Sankalpa",
                        "description": "Taking a sacred vow at the wedding site to seek the blessing of the Lord Shiva and the Mother Parvati for a successful partnership."
                },
                {
                        "name": "Kund Snanam (Triyuginarayan)",
                        "description": "Bathing in the three sacred pools to seek the purification from the three types of the karmic debts."
                },
                {
                        "name": "Eternal Ash Tilak",
                        "description": "Applying the sacred ash from the wedding fire to the forehead to seek the divine protection."
                }
        ],
        "highlights": [
                {
                        "name": "The Akhand Dhuni",
                        "description": "The eternal fire of the divine wedding that has been burning for three ages (Yugas)."
                },
                {
                        "name": "The Vishnu-Shiva Altar",
                        "description": "The specific spot within the temple where the wedding rituals were performed."
                },
                {
                        "name": "The Three Sacred Kunds",
                        "description": "The natural water pools associated with the three supreme gods of the Hindu pantheon."
                },
                {
                        "name": "The Snow Peak Horizon",
                        "description": "The spectacular views of the high Himalayas that frame the temple village."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the site is particularly beautiful during the spring and the autumn).",
                "howToReach": "Located 12km from Sonprayag in the Rudraprayag district. Reached by road; regular taxis run from Sonprayag and Guptkashi.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Participate in the wood offering ritual; it is the most significant way to connect with the energy of the eternal flame.",
                "Carry a small container to take back some of the sacred ash (Vibhuti) from the Dhuni.",
                "Spend some time in the quiet village of Triyuginarayan; the atmosphere is exceptionally peaceful and grounding."
        ],
        "faqs": [
                {
                        "question": "Did Shiva and Parvati really get married here?",
                        "answer": "According to the Puranic tradition, yes, this is the exact spot of their divine wedding."
                },
                {
                        "question": "How long has the fire been burning?",
                        "answer": "Legend says it has been burning continuously through three Yugas (ages), giving the temple its name Tri-Yugi-Narayan."
                },
                {
                        "question": "Can common people get married here?",
                        "answer": "Yes, many couples choose to have their wedding ceremonies performed at this sacred site to seek the divine blessing."
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
    'Guptkashi (Hidden Kashi)', 
    'guptkashi-vishwanath-temple-kedarnath-valley', 
    'Sacred Destination', 
    'uk', 
    'The "Hidden Varanasi", Guptkashi is a historic town in the Mandakini valley. It is a site of absolute Shaiva authority and divine concealment, where Lord Shiva is believed to have hidden from the Pandavas in the form of a bull, representing the absolute manifestation of the hidden truth and the profound energy of the Kedarnath gateway.', 
    '465.2', 
    '235.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hidden Seat of the Lord and the Sanctuary of the Two Rivers', 
    'Guptkashi Vishwanath Temple | Uttarakhand, Shiva & Ancient Lore', 
    'Experience the profound energy of Guptkashi. Discover the Vishwanath temple, the legend of the hidden bull, and the profound energy of the Kedarnath pilgrimage.', 
    'Guptkashi, Uttarakhand, Shiva, Vishwanath, Kedarnath Valley, Hindu Pilgrimage, Ancient Lore, Hidden Kashi, Rudraprayag', 
    '290', 
    '{
        "spiritualEssence": "Guptkashi is the manifestation of the divine as the supreme concealment and the absolute power of the hidden presence. The energy here is quiet, authoritative, and intensely resonant. It is the site where the Varanasi of the plains meets its Himalayan mirror. The vibration is one of ''Gupta'' (Hidden) and the absolute connection to the Kedarnath energy. As a town set on a high ridge overlooking the Mandakini river and the high snow peaks, it represents the spiritual administrative center of the upper Garhwal. A visit here is believed to grant the devotee the absolute removal of the outer distractions and the blessing of the inner vision. The air is always vibrant with the scent of the river mist and the constant, rhythmic sound of the temple bells.",
        "longDescription": "Guptkashi is legendary for its Vishwanath Temple, which is dedicated to the Lord Shiva and is considered equivalent to the Kashi Vishwanath in Varanasi. The name means ''Hidden Kashi,'' referring to the legend where Shiva hid from the Pandavas to test their devotion. The temple features an ancient stone architecture and a sacred pool called the Manikarnika Kund, where the waters of the Yamuna and the Ganga are believed to meet. It also houses the Ardhanarishwar temple, where the Lord is worshipped in his half-male, half-female form. Guptkashi is a critical stop for the Kedarnath pilgrims and a major center for the local festivals. It is a site where the highest level of Shaivite philosophy and the most intimate mountain community are perfectly unified.",
        "spiritualArchitecture": "The architecture of Guptkashi is a spectacular display of the traditional Garhwali stone style with a focus on the structural symmetry and the communal space. The Vishwanath Temple features a central stone shrine with a high, tiered shikhara and a series of paved courtyards. A unique feature is the presence of the Manikarnika Kund, which has two stone spouts carved in the shape of a cow''s head (Gomukh) and an elephant''s head. The architecture is designed to create a sense of a spiritual city that is both ancient and alert. The use of the local gray stone and the vibrant red flags create a sense of a spiritual home that is both robust and welcoming. The complex includes several smaller shrines dedicated to the various manifestations of the Lord and the Mother Goddess.",
        "vedicReferences": "Guptkashi is celebrated in the Skanda Purana as the supreme site where the Lord personally established the second Kashi to protect the mountain dwellers.",
        "deepInsights": "The hidden bull represents the truth that the divine is always present, even when it seems to be avoiding the seeker. Guptkashi teaches that the spirit must search for the truth in the silence of the mountains.",
        "ancientLore": "Lore tells that the waters of the Manikarnika Kund have the power to heal all the mental diseases when used for the holy dip. Another legend says that the bells of Guptkashi ring in synchronization with the bells of the Kashi Vishwanath in Varanasi during the midnight aarti.",
        "keyRituals": [
                {
                        "name": "Vishwanath Jal-Abhisheka (Guptkashi)",
                        "description": "Offering sacred water to the Shiva Lingam to seek the peace and the prosperity for the family."
                },
                {
                        "name": "Manikarnika Kund Snanam",
                        "description": "Bathing in the sacred pool where the two rivers meet to seek the purification of the intentions."
                },
                {
                        "name": "Ardhanarishwar Archana",
                        "description": "Offering prayers to the half-male, half-female form of the Lord to seek the balance in the life."
                },
                {
                        "name": "Kedarnath Path-Sankalpa",
                        "description": "Taking a sacred vow at the Guptkashi temple before proceeding to the high Kedarnath shrine."
                }
        ],
        "highlights": [
                {
                        "name": "The Vishwanath Temple",
                        "description": "The ancient stone heart of the town dedicated to the Lord of the World."
                },
                {
                        "name": "The Manikarnika Kund",
                        "description": "The unique sacred pool where the waters of the Ganga and Yamuna are believed to emerge."
                },
                {
                        "name": "The Ardhanarishwar Shrine",
                        "description": "The beautiful temple dedicated to the absolute union of the Shiva and the Shakti."
                },
                {
                        "name": "The Mandakini Valley Viewpoint",
                        "description": "The spectacular vantage point offering views of the deep river valley and the snow peaks."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially the pilgrimage season from May to October).",
                "howToReach": "Located 45km from Rudraprayag. Well connected by road; regular taxis and buses run from Rudraprayag and Rishikesh.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit the temple during the early morning hours to enjoy the peaceful atmosphere and the morning rituals at the Kund.",
                "Respect the local traditions and the privacy of the pilgrims; Guptkashi is a site of deep and serious devotion.",
                "Spend some time walking in the ancient market of the town; it provides a unique window into the mountain culture."
        ],
        "faqs": [
                {
                        "question": "Why is it called Hidden Kashi?",
                        "answer": "Because Lord Shiva is believed to have hidden here from the Pandavas after the Mahabharata war."
                },
                {
                        "question": "Is it near Kedarnath?",
                        "answer": "It is a major town on the way to Kedarnath, located about 45km before the shrine (by road to Sonprayag/Gaurikund)."
                },
                {
                        "question": "What is unique about the Manikarnika Kund?",
                        "answer": "It is believed that the water from two separate spouts represents the meeting of the Ganga and the Yamuna rivers."
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
    'Ukhimath (Winter Seat)', 
    'ukhimath-winter-seat-kedarnath-madhyamaheshwar', 
    'Sacred Destination', 
    'uk', 
    'The "Winter Capital of the Gods", Ukhimath is the sacred home of Lord Kedarnath and Lord Madhyamaheshwar during the winter months. It is a site of absolute administrative and spiritual authority, representing the absolute manifestation of the Lord as the Master of the Seasons and the profound energy of the rhythmic Himalayan transition.', 
    '475.2', 
    '230.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Winter Silence and the Ancient Seat of the Mandakini Kings', 
    'Ukhimath Omkareshwar Temple | Uttarakhand, Kedarnath & Ancient Lore', 
    'Experience the profound energy of Ukhimath. Discover the winter seat of Kedarnath, the legend of the Usha-Aniruddha wedding, and the profound energy of the Mandakini valley pilgrimage.', 
    'Ukhimath, Uttarakhand, Kedarnath, Madhyamaheshwar, Winter Seat, Omkareshwar Temple, Hindu Pilgrimage, Ancient Lore, Rudraprayag', 
    '291', 
    '{
        "spiritualEssence": "Ukhimath is the manifestation of the divine as the supreme resilience and the absolute power of the seasonal cycles. The energy here is steady, protective, and intensely focused. It is the site where the high Himalayan spirits find refuge from the snow. The vibration is one of ''Sthiti'' (Maintenance) and the absolute connection to the rhythmic breathing of the mountain. As a town set on a south-facing slope with spectacular views of the Kedarnath and Neelkanth peaks, it represents the spiritual fortress of the central Garhwal. A visit here is believed to grant the devotee the absolute stability during the times of the transition and the blessing of the divine presence even in the depths of the winter. The air is always vibrant with the scent of the pine and the constant, rhythmic sound of the Vedic chanting in the Omkareshwar temple.",
        "longDescription": "Ukhimath is famous for the Omkareshwar Temple, where the idols from Kedarnath and Madhyamaheshwar are brought in the grand processions when the high shrines are closed due to the snow. The name is derived from ''Ushapuri,'' associated with the wedding of Usha (daughter of Banasura) and Aniruddha (grandson of Lord Krishna). The temple complex is ancient and features several small shrines and a beautifully maintained garden. It is the residence of the Rawal (High Priest) of Kedarnath during the winter. Ukhimath is also a major trekking base for the Deoria Tal and the Chandrashila peak. It is a site where the highest level of Himalayan administrative ritual and the most romantic Puranic history are perfectly unified.",
        "spiritualArchitecture": "The architecture of Ukhimath is a spectacular display of the traditional Garhwali stone style with significant royal and administrative refinements. The Omkareshwar Temple features a massive stone tower with a high, tiered shikhara and a series of grand courtyards. A unique feature is the presence of the beautifully carved wooden balconies and the intricate murals that depict the stories of the Krishna and the Shiva. The architecture is designed to accommodate the thousands of people who participate in the seasonal processions. The use of the vibrant colors and the simple, robust stone structures create a sense of a spiritual capital that is both ancient and alert. The complex includes several residential halls for the priests and the visiting pilgrims.",
        "vedicReferences": "Ukhimath is celebrated in the local oral epics as the supreme site where the ''Agni'' (Fire) of the divine marriage was personally established to protect the valley culture.",
        "deepInsights": "The winter seat represents the truth that the divine presence never leaves the world, it only changes its form and its location. Ukhimath teaches that the spirit must find its inner home during the times of the external cold.",
        "ancientLore": "Lore tells that the sun personally shines longer on the Ukhimath slopes to keep the Lord warm during the winter. Another legend says that the bells of Ukhimath can be heard in the high Kedarnath valley when the first snow of the season falls, signaling the Lord''s descent.",
        "keyRituals": [
                {
                        "name": "Kedarnath Winter Arati",
                        "description": "Participating in the daily rituals of the Lord Kedarnath in his winter home to seek the divine blessing."
                },
                {
                        "name": "Usha-Aniruddha Archana",
                        "description": "Offering prayers to the divine couple to seek the harmony and the success in the family life."
                },
                {
                        "name": "Mandakini Valley Meditation",
                        "description": "Sitting on the temple platforms to meditate while facing the high snow peaks of the Kedarnath range."
                },
                {
                        "name": "Seasonal Procession Participation",
                        "description": "Joining the grand walk that brings the idols from the high mountains to the Ukhimath shrine."
                }
        ],
        "highlights": [
                {
                        "name": "The Omkareshwar Temple",
                        "description": "The sacred heart of the town and the winter home of the Lord Kedarnath."
                },
                {
                        "name": "The Usha-Aniruddha Wedding Site",
                        "description": "The historic spot associated with the famous Puranic marriage."
                },
                {
                        "name": "The Rawal Niwas",
                        "description": "The traditional residence of the high priest of Kedarnath within the temple complex."
                },
                {
                        "name": "The Kedarnath Snow View",
                        "description": "The spectacular perspective of the high Himalayan peaks from the temple courtyard."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the winter months from November to April are particularly significant for the Kedarnath rituals).",
                "howToReach": "Located 40km from Rudraprayag and 15km from Guptkashi. Well connected by road; regular taxis and buses run from Rudraprayag and Rishikesh.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit during the winter months to witness the unique and intense rituals of the Lord Kedarnath in his lower home.",
                "The town is a perfect base for trekking to the Deoria Tal; start early in the morning for the best reflection of the peaks.",
                "Respect the absolute sanctity of the inner temple area; it is a site of high spiritual authority and administrative tradition."
        ],
        "faqs": [
                {
                        "question": "Why is it called the winter seat?",
                        "answer": "Because it is the location where the idols and the energy of the Kedarnath and Madhyamaheshwar are moved when the high-altitude shrines are closed due to the winter snow."
                },
                {
                        "question": "Is it accessible in the winter?",
                        "answer": "Yes, Ukhimath is located at a lower altitude and remains accessible and vibrant throughout the year."
                },
                {
                        "question": "What is the Omkareshwar temple?",
                        "answer": "It is the main temple of Ukhimath, named after the primal sound Om, and it houses the high Himalayan deities during the winter."
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
    'Karnaprayag (Alaknanda-Pindar Confluence)', 
    'karnaprayag-confluence-alaknanda-pindar', 
    'Sacred Destination', 
    'uk', 
    'The "Confluence of the Almsgiver", Karnaprayag is the meeting point of the Alaknanda and Pindar rivers. It is a site of absolute heroic authority and divine sacrifice, where the legendary hero Karna meditated and received his celestial armor, representing the absolute manifestation of the charity and the profound energy of the mountain-warrior.', 
    '500.2', 
    '255.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Confluence of the Great Heart and the Sanctuary of the Heroic Sacrifice', 
    'Karnaprayag Temple | Uttarakhand, Karna & Ancient Lore', 
    'Experience the profound energy of Karnaprayag. Discover the Uma Devi temple, the legend of the hero Karna, and the profound energy of the Alaknanda-Pindar confluence.', 
    'Karnaprayag, Uttarakhand, Alaknanda River, Pindar River, Karna, Mahabharata, Hindu Pilgrimage, Ancient Lore, Chamoli', 
    '292', 
    '{
        "spiritualEssence": "Karnaprayag is the manifestation of the divine as the supreme generosity and the absolute power of the selfless sacrifice. The energy here is noble, resonant, and intensely heroic. It is the site where the sound of the rivers meets the spirit of the great almsgiver. The vibration is one of ''Daan'' (Charity) and the absolute connection to the warrior-spirit of the Himalayas. As a town set at the junction of the two most powerful rivers of the central Garhwal, it represents the spiritual gateway to the upper Chamoli. A visit here is believed to grant the devotee the absolute depth of the inner strength and the blessing of the compassionate action. The air is always vibrant with the scent of the river spray and the constant, rhythmic sound of the Alaknanda and Pindar colliding in the deep gorge.",
        "longDescription": "Karnaprayag is one of the five sacred confluences (Panch Prayag). According to the Mahabharata, this is the site where Karna, the elder brother of the Pandavas, performed intense penance to the Sun God and received his impenetrable armor (Kavacha) and earrings (Kundala). The town features the ancient Uma Devi temple and a shrine dedicated to the Karna. It is a critical stop for the Badrinath pilgrims and a major center for the local trade and culture. Legend tells that the great saint Adi Shankaracharya personally meditated here to balance the energy of the two rivers. It is a site where the highest level of epic history and the most dramatic river geography are perfectly unified.",
        "spiritualArchitecture": "The architecture of Karnaprayag is a spectacular display of the traditional Garhwali stone style with a focus on the riverside integration and the monumental scale. The Uma Devi Temple features a central stone shrine with a high, tiered shikhara and a series of paved platforms that wrap around the confluence. A unique feature is the presence of the massive stone walls and the high stairways that lead down to the very heart of the river meeting. The architecture is designed to emphasize the power and the movement of the water. The use of the local gray stone and the vibrant red flags create a sense of a spiritual home that is both ancient and alert. The complex includes several small resting halls and the sacred ghats for the pilgrims.",
        "vedicReferences": "Karnaprayag is celebrated in the Skanda Purana as the supreme site where the ''Surya-Tapa'' (Penance to the Sun) was personally anchored to the mountain soil.",
        "deepInsights": "The sacrifice of the armor represents the truth that the highest protection is the one that is offered by the divine grace. Karnaprayag teaches that the spirit must become as generous and as brave as the great hero.",
        "ancientLore": "Lore tells that the river Pindar personally slows down its flow to respect the spot where Karna meditated. Another legend says that the water of the Karnaprayag confluence has the power to grant the absolute clarity of the purpose to the sincere seeker.",
        "keyRituals": [
                {
                        "name": "Alaknanda-Pindar Sangam Snanam",
                        "description": "The ritual dip at the confluence to seek the purification from the selfish thoughts."
                },
                {
                        "name": "Karna-Deepam (Sun Prayer)",
                        "description": "Offering lamps to the sun at the confluence to seek the heroic strength and the vision."
                },
                {
                        "name": "Uma Devi Archana",
                        "description": "Offering prayers to the Mother Goddess to seek the protection for the family and the community."
                },
                {
                        "name": "Heroic Vow (Sankalpa)",
                        "description": "Taking a sacred vow at the Karna shrine to commit the life to the service of the Dharma."
                }
        ],
        "highlights": [
                {
                        "name": "The Alaknanda-Pindar Confluence",
                        "description": "The spectacular natural meeting of the two major Himalayan rivers."
                },
                {
                        "name": "The Uma Devi Temple",
                        "description": "The ancient stone heart of the town dedicated to the Mother Goddess."
                },
                {
                        "name": "The Karna Altar",
                        "description": "The specific spot where the legendary hero is believed to have performed his penance."
                },
                {
                        "name": "The Pindar Valley Viewpoint",
                        "description": "The spectacular vantage point offering views of the deep river valley and the distant snow peaks."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the confluence is most dramatic in the spring and the early summer).",
                "howToReach": "Located on the main highway to Badrinath. Well connected by road; regular taxis and buses run from Rishikesh and Rudraprayag.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit the confluence during the early morning or the late afternoon to catch the soft light on the water.",
                "Be careful at the ghats; the river current at the confluence is extremely strong and the water is deep.",
                "Spend some time in the quiet Uma Devi temple; the energy is exceptionally peaceful and grounding."
        ],
        "faqs": [
                {
                        "question": "Why is it called Karnaprayag?",
                        "answer": "It is named after the Mahabharata hero Karna, who is believed to have performed penance here."
                },
                {
                        "question": "Which two rivers meet here?",
                        "answer": "The Alaknanda river from the Badrinath side and the Pindar river from the Pindari glacier side."
                },
                {
                        "question": "Is it one of the Panch Prayag?",
                        "answer": "Yes, it is the third of the five sacred confluences along the Alaknanda river."
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
    'Rudraprayag (Alaknanda-Mandakini Confluence)', 
    'rudraprayag-confluence-alaknanda-mandakini', 
    'Sacred Destination', 
    'uk', 
    'The "Confluence of the Lord Rudra", Rudraprayag is the meeting point of the Alaknanda and Mandakini rivers. It is a site of absolute musical authority and divine resonance, where the Sage Narada meditated and Lord Shiva appeared as the Lord of Music, representing the absolute manifestation of the sound and the profound energy of the mountain-axis.', 
    '475.2', 
    '255.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Confluence of the Primal Sound and the Sanctuary of the Celestial Music', 
    'Rudraprayag Temple | Uttarakhand, Shiva & Ancient Lore', 
    'Experience the profound energy of Rudraprayag. Discover the Rudranath temple, the legend of the Sage Narada, and the profound energy of the Alaknanda-Mandakini confluence.', 
    'Rudraprayag, Uttarakhand, Alaknanda River, Mandakini River, Shiva, Narada, Hindu Pilgrimage, Ancient Lore, Panch Prayag', 
    '293', 
    '{
        "spiritualEssence": "Rudraprayag is the manifestation of the divine as the supreme resonance and the absolute power of the spiritual sound. The energy here is vibrant, river-side, and intensely focused. It is the site where the two great arteries of the Garhwal meet. The vibration is one of ''Nada'' (Sound) and the absolute connection to the celestial music. As a town set at the junction of the two most sacred rivers of the central Himalayas, it represents the spiritual heart of the pilgrimage route. A visit here is believed to grant the devotee the absolute clarity of the communication and the blessing of the divine harmony. The air is always vibrant with the scent of the river mist and the constant, rhythmic sound of the Alaknanda and Mandakini merging in the deep rock canyon.",
        "longDescription": "Rudraprayag is one of the five sacred confluences (Panch Prayag). According to the Puranas, the Sage Narada performed intense penance here to Lord Shiva to master the science of music. The Lord appeared as Rudra and taught the sage the secrets of the celestial sound. The town features the ancient Rudranath Temple and a shrine dedicated to the Narada. It is a critical stop for both the Badrinath and Kedarnath pilgrims. Legend tells that the great saint Adi Shankaracharya personally meditated here to balance the energy of the two rivers. It is a site where the highest level of Puranic mythology and the most dramatic river geography are perfectly unified.",
        "spiritualArchitecture": "The architecture of Rudraprayag is a spectacular display of the traditional Garhwali stone style with a focus on the riverside integration and the panoramic viewing. The Rudranath Temple features a central stone shrine with a high, tiered shikhara and a series of paved platforms that wrap around the confluence. A unique feature is the presence of the massive rock formations that naturally frame the river meeting. The architecture is designed to emphasize the power and the movement of the water. The use of the local gray stone and the vibrant red flags create a sense of a spiritual home that is both ancient and alert. The complex includes several small resting halls and the sacred ghats for the pilgrims.",
        "vedicReferences": "Rudraprayag is celebrated in the Skanda Purana as the supreme site where the ''Gandharva-Vijnana'' (the science of music) was personally anchored to the mountain soil.",
        "deepInsights": "The confluence of the rivers represents the truth that all the separate paths lead to the one divine source. Rudraprayag teaches that the spirit must become as harmonious and as constant as the river sound.",
        "ancientLore": "Lore tells that the river Mandakini personally slows down its flow to respect the spot where the Sage Narada meditated. Another legend says that the water of the Rudraprayag confluence has the power to grant the absolute depth of the meditation to the sincere seeker.",
        "keyRituals": [
                {
                        "name": "Alaknanda-Mandakini Sangam Snanam",
                        "description": "The ritual dip at the confluence to seek the purification from the emotional dualities."
                },
                {
                        "name": "Nada-Puja (Sound Prayer)",
                        "description": "Offering prayers and chanting at the confluence to seek the mastery of the communication and the music."
                },
                {
                        "name": "Rudranath Archana",
                        "description": "Offering prayers to the Lord as Rudra to seek the protection for the family and the community."
                },
                {
                        "name": "Panch Prayag Sankalpa",
                        "description": "Taking a sacred vow at the Rudraprayag temple while proceeding to the higher Himalayan confluences."
                }
        ],
        "highlights": [
                {
                        "name": "The Alaknanda-Mandakini Confluence",
                        "description": "The spectacular natural meeting of the two major Himalayan rivers."
                },
                {
                        "name": "The Rudranath Temple",
                        "description": "The ancient stone heart of the town dedicated to the Lord Shiva."
                },
                {
                        "name": "The Narada Shila",
                        "description": "The specific rock where the legendary sage is believed to have performed his penance."
                },
                {
                        "name": "The Kedarnath-Badrinath Gateway",
                        "description": "The unique geographic position that marks the split of the pilgrimage routes to the two high shrines."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the confluence is most dramatic in the spring and the autumn).",
                "howToReach": "Located on the main highway to Badrinath and Kedarnath. Well connected by road; regular taxis and buses run from Rishikesh and Dehradun.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit the confluence during the early morning or the late afternoon to catch the soft light on the water.",
                "Be careful at the ghats; the river current at the confluence is extremely strong and the water is deep.",
                "Spend some time in the quiet Rudranath temple; the energy is exceptionally peaceful and grounding."
        ],
        "faqs": [
                {
                        "question": "Why is it called Rudraprayag?",
                        "answer": "It is named after Lord Shiva in his manifestation as Rudra, who taught music to the Sage Narada here."
                },
                {
                        "question": "Which two rivers meet here?",
                        "answer": "The Alaknanda river from the Badrinath side and the Mandakini river from the Kedarnath side."
                },
                {
                        "question": "Is it one of the Panch Prayag?",
                        "answer": "Yes, it is the second of the five sacred confluences along the Alaknanda river."
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
    'Nandprayag', 
    'nandprayag-confluence-alaknanda-mandakini-chamoli', 
    'Sacred Destination', 
    'uk', 
    'The "Confluence of the Fatherhood", Nandprayag is the meeting point of the Alaknanda and Nandakini rivers. It is a site of absolute paternal authority and divine gratitude, where the King Nanda meditated to seek a divine child, representing the absolute manifestation of the devotion and the profound energy of the mountain-ancestry.', 
    '505.2', 
    '250.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Confluence of the Grateful Heart and the Sanctuary of the Ancient Lineage', 
    'Nandprayag Temple | Uttarakhand, King Nanda & Ancient Lore', 
    'Experience the profound energy of Nandprayag. Discover the Gopalji temple, the legend of the King Nanda, and the profound energy of the Alaknanda-Nandakini confluence.', 
    'Nandprayag, Uttarakhand, Alaknanda River, Nandakini River, King Nanda, Hindu Pilgrimage, Ancient Lore, Chamoli, Panch Prayag', 
    '294', 
    '{
        "spiritualEssence": "Nandprayag is the manifestation of the divine as the supreme gratitude and the absolute power of the paternal devotion. The energy here is steady, river-side, and intensely peaceful. It is the site where the prayers of the father were answered by the arrival of the divine. The vibration is one of ''Vatsalya'' (Parental Love) and the absolute connection to the ancestral roots of the mountain life. As a town set at the junction of the Alaknanda and the small, crystal-clear Nandakini, it represents the spiritual jewel of the middle Chamoli. A visit here is believed to grant the devotee the absolute harmony in the family life and the blessing of the virtuous offspring. The air is always vibrant with the scent of the river mist and the constant, rhythmic sound of the Nandakini merging with the Alaknanda.",
        "longDescription": "Nandprayag is one of the five sacred confluences (Panch Prayag). According to the Puranas, the King Nanda (the foster father of Lord Krishna) performed intense penance here to Lord Vishnu to seek the blessing of having the Lord as his son. The town features the ancient Gopalji Temple and a shrine dedicated to the Shiva and the Parvati. It is a critical stop for the Badrinath pilgrims and a major center for the local culture. Legend tells that the great saint Adi Shankaracharya personally meditated here to balance the energy of the two rivers. It is a site where the highest level of Puranic mythology and the most serene river geography are perfectly unified.",
        "spiritualArchitecture": "The architecture of Nandprayag is a spectacular display of the traditional Garhwali stone style with a focus on the riverside integration and the simplicity. The Gopalji Temple features a central stone shrine with a white-washed exterior and a series of paved platforms that wrap around the confluence. A unique feature is the presence of the beautifully carved stone spouts and the ancient stone walls that protect the town from the river floods. The architecture is designed to create a sense of a spiritual home that is both ancient and alert. The use of the local gray stone and the vibrant saffron flags create a sense of a spiritual retreat that is both unpretentious and sacred. The complex includes several small resting halls and the sacred ghats for the pilgrims.",
        "vedicReferences": "Nandprayag is celebrated in the Skanda Purana as the supreme site where the ''Vatsalya-Tapa'' (Penance of Parental Love) was personally anchored to the mountain soil.",
        "deepInsights": "The confluence of the rivers represents the truth that the sincere prayer of the heart always meets the divine response. Nandprayag teaches that the highest achievement is the gratitude for the lineage.",
        "ancientLore": "Lore tells that the river Nandakini personally brings the essence of the Nanda Devi peak to the confluence. Another legend says that the water of the Nandprayag confluence has the power to grant the absolute peace of mind to the sincere seeker.",
        "keyRituals": [
                {
                        "name": "Alaknanda-Nandakini Sangam Snanam",
                        "description": "The ritual dip at the confluence to seek the purification from the ancestral debts."
                },
                {
                        "name": "Gopalji Archana",
                        "description": "Offering prayers to the Lord Krishna as a child to seek the blessing for the family and the children."
                },
                {
                        "name": "Lineage-Path Meditation",
                        "description": "Reflecting on the history of the family and the ancestors while sitting at the confluence."
                },
                {
                        "name": "Nanda-Vrata",
                        "description": "Participating in the local community festivals that celebrate the spirit of the King Nanda and the mountain culture."
                }
        ],
        "highlights": [
                {
                        "name": "The Alaknanda-Nandakini Confluence",
                        "description": "The spectacular natural meeting of the two major Himalayan rivers."
                },
                {
                        "name": "The Gopalji Temple",
                        "description": "The ancient stone heart of the town dedicated to the Lord Krishna."
                },
                {
                        "name": "The Nanda Altar",
                        "description": "The specific spot where the legendary king is believed to have performed his penance."
                },
                {
                        "name": "The Chamoli Valley Viewpoint",
                        "description": "The spectacular vantage point offering views of the deep river valley and the distant snow peaks."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the confluence is most beautiful in the spring and the autumn).",
                "howToReach": "Located on the main highway to Badrinath. Well connected by road; regular taxis and buses run from Rishikesh and Rudraprayag.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit the confluence during the early morning or the late afternoon to catch the soft light on the water.",
                "Be careful at the ghats; although the Nandakini is smaller, the Alaknanda current remains strong.",
                "Spend some time in the quiet Gopalji temple; the energy is exceptionally peaceful and grounding."
        ],
        "faqs": [
                {
                        "question": "Why is it called Nandprayag?",
                        "answer": "It is named after the King Nanda, the foster father of Lord Krishna, who is believed to have performed penance here."
                },
                {
                        "question": "Which two rivers meet here?",
                        "answer": "The Alaknanda river from the Badrinath side and the Nandakini river from the Nanda Devi glacier side."
                },
                {
                        "question": "Is it one of the Panch Prayag?",
                        "answer": "Yes, it is the fourth of the five sacred confluences along the Alaknanda river."
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
    'Vishnuprayag', 
    'vishnuprayag-confluence-alaknanda-dhauliganga', 
    'Sacred Destination', 
    'uk', 
    'The "Confluence of the Celestial Support", Vishnuprayag is the meeting point of the Alaknanda and Dhauliganga rivers. It is a site of absolute high-altitude authority and divine resonance, where the Sage Narada meditated and Lord Vishnu appeared to him, representing the absolute manifestation of the support and the profound energy of the high Himalayan confluence.', 
    '520.5', 
    '240.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Confluence of the Universal Power and the Sanctuary of the High Snow Rivers', 
    'Vishnuprayag Temple | Uttarakhand, Vishnu & Ancient Lore', 
    'Experience the profound energy of Vishnuprayag. Discover the Vishnu temple, the legend of the Sage Narada, and the profound energy of the Alaknanda-Dhauliganga confluence.', 
    'Vishnuprayag, Uttarakhand, Alaknanda River, Dhauliganga River, Vishnu, Narada, Hindu Pilgrimage, Ancient Lore, Panch Prayag', 
    '295', 
    '{
        "spiritualEssence": "Vishnuprayag is the manifestation of the divine as the supreme stability and the absolute power of the high Himalayan currents. The energy here is fresh, thin, and intensely vibrant. It is the site where the white waters of the Dhauliganga meet the emerald Alaknanda. The vibration is one of ''Sthiti'' (Stability) and the absolute connection to the glacier sources. As a confluence set in a narrow rock gorge near Joshimath, it represents the spiritual northern anchor of the Panch Prayag system. A visit here is believed to grant the devotee the absolute depth of the inner peace and the blessing of the divine protection. The air is always vibrant with the scent of the eternal snow and the constant, rhythmic roar of the two rivers colliding with immense force.",
        "longDescription": "Vishnuprayag is the first of the five sacred confluences (Panch Prayag) for a pilgrim coming from Badrinath. According to the Puranas, the Sage Narada performed intense penance here to Lord Vishnu, who appeared to him and blessed the spot. The town features an ancient temple dedicated to the Lord Vishnu and a shrine for the Narada. It is uniquely situated in a rugged landscape where the river Dhauliganga (meaning white river) joins the Alaknanda. The site is a favorite for the serious seekers and those looking for the absolute raw power of the mountain rivers. It is a site where the highest level of high-altitude geography and the most ancient Puranic mythology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Vishnuprayag is a spectacular display of the traditional mountain stone style with a focus on the structural resilience and the riverside framing. The Vishnu Temple features a small stone shrine with a white-washed exterior and a series of paved platforms that wrap around the rock edge. A unique feature is the presence of the massive iron chains and the ancient stone anchors that help pilgrims reach the water during the high flow. The architecture is designed to emphasize the power and the movement of the rivers. The use of the local gray stone and the vibrant red flags create a sense of a spiritual home that is both ancient and alert. The complex includes several small resting halls and the sacred ghats for the pilgrims.",
        "vedicReferences": "Vishnuprayag is celebrated in the Skanda Purana as the supreme site where the ''Vishnu-Tattva'' (the essence of the Vishnu) was personally anchored to the glacier soil.",
        "deepInsights": "The confluence of the rivers represents the truth that the divine support is found at the meeting point of the separate efforts. Vishnuprayag teaches that the spirit must be as powerful and as constant as the glacier stream.",
        "ancientLore": "Lore tells that the river Dhauliganga personally brings the milk of the celestial cows to the confluence. Another legend says that the water of the Vishnuprayag confluence has the power to grant the absolute clarity of the spiritual path to the sincere seeker.",
        "keyRituals": [
                {
                        "name": "Alaknanda-Dhauliganga Sangam Snanam",
                        "description": "The ritual dip at the confluence to seek the purification from the dualistic fears."
                },
                {
                        "name": "Vishnu Archana (Confluence)",
                        "description": "Offering prayers and chanting at the confluence to seek the mastery of the life-path."
                },
                {
                        "name": "Narada-Vrata Meditation",
                        "description": "Sitting in the temple courtyard to practice the silent meditation while focusing on the sound of the rivers."
                },
                {
                        "name": "Badrinath Path-Blessing",
                        "description": "Taking a sacred vow at the Vishnuprayag temple before proceeding to the high Badrinath shrine."
                }
        ],
        "highlights": [
                {
                        "name": "The Alaknanda-Dhauliganga Confluence",
                        "description": "The spectacular natural meeting of the two major high-altitude rivers."
                },
                {
                        "name": "The Vishnu Temple",
                        "description": "The ancient stone heart of the confluence dedicated to the Lord Vishnu."
                },
                {
                        "name": "The Narada Shila (Vishnuprayag)",
                        "description": "The specific rock where the legendary sage is believed to have performed his penance."
                },
                {
                        "name": "The Joshimath Gorge",
                        "description": "The spectacular natural rock formations that surround the confluence complex."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the confluence is most beautiful in the spring and the early winter).",
                "howToReach": "Located 10km from Joshimath on the road to Badrinath. Reached by road; regular taxis and buses run from Joshimath.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit the confluence during the early morning hours to enjoy the soft light on the white water of the Dhauliganga.",
                "Be extremely careful at the ghats; the river current is one of the strongest in the entire Alaknanda system.",
                "Spend some time in the quiet Vishnu temple; the energy is exceptionally powerful and grounding."
        ],
        "faqs": [
                {
                        "question": "Why is it called Vishnuprayag?",
                        "answer": "It is named after Lord Vishnu, who is believed to have appeared here to the Sage Narada."
                },
                {
                        "question": "Which two rivers meet here?",
                        "answer": "The Alaknanda river from the Badrinath side and the Dhauliganga river from the Dhaulagiri/Joshimath side."
                },
                {
                        "question": "Is it one of the Panch Prayag?",
                        "answer": "Yes, it is the first of the five sacred confluences along the Alaknanda river when coming from Badrinath."
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
    'Devidhura', 
    'devidhura-barahi-devi-temple-champawat', 
    'Sacred Destination', 
    'uk', 
    'The "Temple of the Sacred Stones", Devidhura is a powerful Shakti shrine in the Champawat district. It is a site of absolute folk authority and divine combat, famous for the Bagwal (stone-pelting) festival, representing the absolute manifestation of the Mother as the master of the tribal honor and the profound energy of the Kumaon mountain-faith.', 
    '590.2', 
    '260.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Stone Warriors and the Dark Mother of the Champawat Forests', 
    'Devidhura Barahi Devi Temple | Uttarakhand, Shakti & Ancient Lore', 
    'Experience the profound power of Devidhura. Discover the Barahi Devi shrine, the legend of the Bagwal festival, and the profound energy of the Champawat pilgrimage.', 
    'Devidhura, Uttarakhand, Barahi Devi, Shakti Shrine, Champawat, Hindu Pilgrimage, Ancient Lore, Bagwal Festival, Kumaon', 
    '296', 
    '{
        "spiritualEssence": "Devidhura is the manifestation of the divine as the supreme protection and the absolute power of the tribal commitment. The energy here is dark, intense, and intensely vibrant. It is the site where the earth and the human blood were unified in the sacred play of the Goddess. The vibration is one of ''Shakti'' (Power) and the absolute connection to the forest spirits of the Kumaon. As a temple surrounded by massive boulders and ancient forests at the junction of three districts, it represents the spiritual armor of the southern Kumaon. A visit here is believed to grant the devotee the absolute removal of the inner weakness and the blessing of the fierce grace. The air is always vibrant with the scent of the mountain flowers and the silent, heavy energy of the ancient warrior-spirits.",
        "longDescription": "Devidhura is world-famous for its annual Bagwal festival held during the Raksha Bandhan. During this festival, two groups of local tribes (Kham) pelt each other with stones while using wooden shields, believing that the Goddess demands a sacrifice of blood equivalent to one human life. The temple is dedicated to the Mother Barahi and is situated among massive boulders that are said to have been used by the Pandavas. Legend tells that the great saint Adi Shankaracharya visited this site to balance the energy of the tribal rituals. It is a site where the highest level of Himalayan folk culture and the most intense physical expression of faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Devidhura is a spectacular display of the traditional Kumaoni stone style with a focus on the natural integration and the massive boulders. The temple features a central stone shrine with a white-washed exterior and a series of open-air courtyards where the folk dancers perform during the festivals. A unique feature is the presence of several massive stone formations that form the natural walls and the caves of the temple complex. The architecture is designed to facilitate the gathering of the thousands of people during the Bagwal festival. The use of the vibrant colors and the simple local materials create a sense of a spiritual home that is both approachable and sacred. The complex includes several small resting halls for the pilgrims.",
        "vedicReferences": "Devidhura is celebrated in the local oral epics as the supreme site where the Mother personally established the boundary of the sacred land using the celestial stones.",
        "deepInsights": "The stone-pelting festival represents the truth that the divine protection is found in the absolute commitment to the collective honor. Devidhura teaches that the spirit must be as resilient as the mountain rock.",
        "ancientLore": "Lore tells that the boulders of Devidhura were personally brought by the Bhima during the Pandavas'' exile. Another legend says that the bells of the Devidhura temple ring on their own during the midnight of the Raksha Bandhan, announcing the arrival of the Goddess.",
        "keyRituals": [
                {
                        "name": "Bagwal (Stone-Pelting) Participation",
                        "description": "Witnessing or participating in the traditional ritual of throwing stones to seek the blessing of the Mother Barahi."
                },
                {
                        "name": "Barahi Devi Jal-Puja",
                        "description": "Offering sacred water to the stone images of the Goddess to seek the protection and the stability for the family."
                },
                {
                        "name": "Boulder-Parikrama",
                        "description": "Walking around the massive sacred boulders to seek the alignment with the energy of the ancient Pandavas."
                },
                {
                        "name": "Kham-Sankalpa",
                        "description": "Taking a sacred vow at the temple to uphold the honor of the clan and the community."
                }
        ],
        "highlights": [
                {
                        "name": "The Barahi Devi Shrine",
                        "description": "The sacred heart of the temple where the image of the Goddess is worshipped."
                },
                {
                        "name": "The Bagwal Arena",
                        "description": "The open courtyard where the historic stone-pelting festival takes place every year."
                },
                {
                        "name": "The Pandava Boulders",
                        "description": "The unique collection of massive rocks associated with the stay of the five brothers in the Kumaon."
                },
                {
                        "name": "The Three-District Viewpoint",
                        "description": "The spectacular vantage point from where one can see the hills of Almora, Pithoragarh, and Champawat."
                }
        ],
        "travelInfo": {
                "bestTime": "August (during the Raksha Bandhan/Bagwal festival) and the spring months.",
                "howToReach": "Located 60km from Almora and 75km from Champawat. Well connected by road; regular taxis and buses run from Almora and Haldwani.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Visit during the Bagwal festival for a truly unique and intense experience of the Himalayan culture, but maintain a safe distance from the stone-pelting arena.",
                "Spend some time exploring the massive rock formations; they provide a unique window into the geological and the mythical history of the region.",
                "Respect the local tribal traditions; the deity is deeply revered as the ultimate protector of the life and the honor of the Kham communities."
        ],
        "faqs": [
                {
                        "question": "What is the Bagwal festival?",
                        "answer": "It is an ancient ritual of stone-pelting where devotees offer their blood to the Goddess Barahi, believing she demands a sacrifice."
                },
                {
                        "question": "Who is Barahi Devi?",
                        "answer": "She is a powerful manifestation of the Shakti, often associated with the boar-headed form of the Mother Goddess."
                },
                {
                        "question": "Where is it located?",
                        "answer": "In the Champawat district, at a high-altitude pass that connects Almora, Pithoragarh, and Champawat."
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
    'Jwala Ji Temple (Eternal Flame)', 
    'jwala-ji-temple-jwalamukhi-eternal-flame', 
    'Sacred Destination', 
    'hp', 
    'The "Goddess of the Eternal Light", Jwala Ji is a supreme Shakti Peeth in Kangra. It is a site of absolute mystical authority and divine manifestation, where the tongue of Sati is believed to have fallen, represented by the nine natural blue flames that burn eternally from the rock without any fuel.', 
    '310.2', 
    '285.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of the Eternal Flame and the Sanctuary of the Blue Light', 
    'Jwala Ji Temple | Himachal Pradesh, Shakti Peeth & Ancient Lore (FLAME)', 
    'Experience the profound miracle of Jwala Ji. Discover the eternal blue flames, the legend of the falling tongue of Sati, and the profound energy of the Kangra valley pilgrimage.', 
    'Jwala Ji, Himachal Pradesh, Shakti Peeth, Jwalamukhi, Eternal Flame, Hindu Pilgrimage, Ancient Lore, Kangra', 
    '297', 
    '{
        "spiritualEssence": "Jwala Ji is the manifestation of the divine as the supreme light and the absolute power of the unquenchable spirit. The energy here is warm, luminous, and intensely miraculous. It is the site where the word of the Goddess is transformed into the physical flame. The vibration is one of ''Jyoti'' (Light) and the absolute connection to the subterranean fire of the world. As a temple where there is no idol, only the natural flames burning from the rock, it represents the spiritual heart of the lower Himalayas. A visit here is believed to grant the devotee the absolute clarity of the speech and the blessing of the eternal truth. The air is always vibrant with the scent of the ghee and the silent, heavy energy of the flames that have burned for thousands of years.",
        "longDescription": "Jwala Ji is one of the most famous Shakti Peethas in India. According to the Puranas, the tongue of Sati fell at this spot. The temple is architecturally unique, with a gold-plated dome and a series of nine eternal flames (Jwalas) that emerge from the fissures in the rock. The most famous attempt to extinguish these flames was by the Emperor Akbar, who eventually bowed to the Goddess and offered a golden umbrella (Chhatra) as an apology. The site has been a center of pilgrimage for kings and commoners alike for centuries. It is a site where the highest level of natural phenomenon and the most intense Puranic mythology are perfectly unified in a single luminous miracle.",
        "spiritualArchitecture": "The architecture of Jwala Ji is a spectacular display of the Indo-Sikh style with a focus on the gold and the stone. The temple features a prominent golden dome and a series of paved courtyards that lead to the inner rock shrine. A unique feature is the presence of the silver-plated entrance and the intricately carved pillars that surround the sacred flames. The architecture is designed to manage the massive flow of pilgrims while focusing the attention on the natural light. The use of the vibrant colors and the expansive temple platforms create a sense of a spiritual city that is both ancient and celebratory. The complex includes several smaller shrines and a sacred pool called the Gorakh Dibbi.",
        "vedicReferences": "Jwala Ji is celebrated in the Devi Bhagavata Purana as the supreme site where the Mother personally manifested her speech as the eternal light to guide the world.",
        "deepInsights": "The eternal flame represents the truth that the divine light can never be extinguished by the forces of the world. Jwala Ji teaches that the spirit must burn as brightly and as constantly as the sacred fire.",
        "ancientLore": "Lore tells that the water of the Gorakh Dibbi boils without heat due to the spiritual power of the Guru Gorakhnath. Another legend says that the flames of Jwala Ji are the lamps lit by the celestial guardians to honor the tongue of the Mother.",
        "keyRituals": [
                {
                        "name": "Jwala-Aarti",
                        "description": "The ritual of offering light and chants to the nine eternal flames at dawn and dusk to seek the divine guidance."
                },
                {
                        "name": "Panch-Amrit Puja",
                        "description": "Offering the five sacred substances to the main flame to seek the purification of the intentions."
                },
                {
                        "name": "Havan (Jwalamukhi)",
                        "description": "Performing the fire ritual in the temple courtyard to align the individual energy with the cosmic light."
                },
                {
                        "name": "Akbar-Chhatra Meditation",
                        "description": "Reflecting on the power of the faith while standing before the golden umbrella offered by the emperor."
                }
        ],
        "highlights": [
                {
                        "name": "The Nine Eternal Flames",
                        "description": "The sacred blue lights that burn from the rock without any human aid."
                },
                {
                        "name": "The Golden Dome",
                        "description": "The magnificent shikhara of the temple, a symbol of the Goddess''s royal majesty."
                },
                {
                        "name": "Gorakh Dibbi",
                        "description": "The unique sacred pool with the mysterious boiling-water phenomenon."
                },
                {
                        "name": "The Silver Gateway",
                        "description": "The beautiful entrance to the inner shrine, donated by the historic kings of the Kangra."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during the Navratri months of October and March).",
                "howToReach": "35km from Kangra and 50km from Dharamshala. Well connected by road; regular taxis and buses run from Kangra and Pathankot.",
                "nearestAirport": "Gaggal Airport, Kangra.",
                "nearestRailway": "Pathankot Railway Station."
        },
        "tips": [
                "Visit the temple during the morning aarti to witness the special offerings to the flames; it is a deeply resonant experience.",
                "Respect the absolute sanctity of the flames; do not attempt to touch them or throw any objects into the fissures.",
                "Spend some time in the outer courtyard; the energy of the Jwalamukhi valley is exceptionally pure and grounding."
        ],
        "faqs": [
                {
                        "question": "How do the flames burn?",
                        "answer": "Scientifically, it is a natural gas seepage from the earth, but spiritually, they are considered the eternal presence of the Goddess."
                },
                {
                        "question": "Which part of Sati fell here?",
                        "answer": "According to the tradition, the tongue (Jihva) of the Goddess Sati fell at this spot."
                },
                {
                        "question": "Who built the golden dome?",
                        "answer": "The golden plating was commissioned by the Maharaja Ranjit Singh and later refined by his son."
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
    'Chamunda Devi Temple', 
    'chamunda-devi-temple-kangra-valley', 
    'Sacred Destination', 
    'hp', 
    'The "Fierce Guardian of the Kangra Valley", Chamunda Devi is a powerful Shakti shrine on the banks of the Baner river. It is a site of absolute protection and divine ferocity, where the Goddess is worshipped as the slayer of the demons Chanda and Munda, representing the absolute manifestation of the warrior-mother and the profound energy of the Dhauladhar foothills.', 
    '325.2', 
    '275.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Protector of the Baner River and the Sanctuary of the Fierce Grace', 
    'Chamunda Devi Temple | Himachal Pradesh, Shakti & Ancient Lore (VALLEY)', 
    'Experience the profound power of Chamunda Devi. Discover the river-shrine, the legend of the demon-slayer, and the profound energy of the Dharamshala pilgrimage.', 
    'Chamunda Devi, Himachal Pradesh, Shakti, Kangra, Hindu Pilgrimage, Ancient Lore, Baner River, Dharamshala', 
    '298', 
    '{
        "spiritualEssence": "Chamunda is the manifestation of the divine as the supreme ferocity and the absolute power of the righteous destruction. The energy here is fresh, river-side, and intensely protective. It is the site where the sword of the Goddess is anchored in the valley soil. The vibration is one of ''Veera'' (Heroism) and the absolute connection to the primal forces of the mountain-watch. As a temple set against the backdrop of the massive snow peaks of the Dhauladhar, it represents the spiritual armor of the Himachal. A visit here is believed to grant the devotee the absolute victory over the inner enemies and the blessing of the fierce protection. The air is always vibrant with the scent of the river mist and the constant, rhythmic sound of the Baner river roaring past the temple ghats.",
        "longDescription": "Chamunda Devi is one of the most revered shrines in Himachal Pradesh. According to the Devi Mahatmya, the Goddess took this form to kill the two generals of the demon king Shumbha-Nishumbha. The temple is unique as it also houses a shrine for the Lord Shiva in his manifestation as the Nandikeshwar (the Lord of the Nandi), creating a perfect balance of the Shiva and the Shakti. The site features a series of ancient stone carvings and a large bathing ghat on the river. It is a major center for the Tantric and the folk traditions of the Kangra valley. It is a site where the highest level of Himalayan mysticism and the most practical river-side devotion are perfectly unified.",
        "spiritualArchitecture": "The architecture of Chamunda Devi is a spectacular display of the traditional Himachali stone style with a focus on the riverside integration and the panoramic viewing. The temple features a central stone shrine with a tiered shikhara and a large open-air courtyard that overlooks the river. A unique feature is the presence of the beautifully carved wooden balconies and the iron tridents (trishuls) that represent the power of the Goddess. The architecture is designed to emphasize the connection between the mountain peak and the river flow. The use of the vibrant red flags and the simple stone structures create a sense of a spiritual home that is both ancient and alert. The complex includes several smaller shrines and a sacred cremation ground nearby, reflecting the Tantric nature of the site.",
        "vedicReferences": "Chamunda Devi is celebrated in the Durga Saptashati as the supreme site where the Mother personally forged her warrior form to protect the balance of the three worlds.",
        "deepInsights": "The slaying of the demons represents the truth that the spirit must be fierce in its pursuit of the righteousness. Chamunda teaches that the highest protection is found in the absolute surrender to the divine power.",
        "ancientLore": "Lore tells that the river Baner personally changed its course to touch the feet of the Goddess. Another legend says that the bells of Chamunda can be heard in the celestial realms during the midnight of the Mahanavratri, signaling the victory of the light.",
        "keyRituals": [
                {
                        "name": "Baner River Snanam",
                        "description": "The ritual dip in the sacred river next to the temple to seek the purification and the strength."
                },
                {
                        "name": "Chamunda Khadga Puja",
                        "description": "Offering prayers to the symbolic sword of the Goddess to seek the protection and the bravery."
                },
                {
                        "name": "Nandikeshwar Abhishekam",
                        "description": "Offering sacred water and milk to the Lord Shiva shrine within the complex to seek the spiritual balance."
                },
                {
                        "name": "Siddha-Dhyana",
                        "description": "Sitting in the quiet corners of the temple to practice the meditation while focusing on the high Dhauladhar peaks."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Chamunda Shrine",
                        "description": "The sacred heart of the temple where the image of the Goddess is worshipped."
                },
                {
                        "name": "The Baner River Ghats",
                        "description": "The beautiful and powerful river frontage that defines the spiritual geography of the site."
                },
                {
                        "name": "The Nandikeshwar Temple",
                        "description": "The unique Shiva shrine located within the same complex, symbolizing the union of the power and the stillness."
                },
                {
                        "name": "The Dhauladhar Snow Backdrop",
                        "description": "The spectacular views of the high Himalayan range that frames the entire temple complex."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially the Navratri months and the spring).",
                "howToReach": "15km from Dharamshala and 10km from Kangra. Well connected by road; regular taxis and buses run from Dharamshala and Pathankot.",
                "nearestAirport": "Gaggal Airport, Kangra.",
                "nearestRailway": "Pathankot Railway Station."
        },
        "tips": [
                "Visit the temple during the early morning or the late afternoon to catch the soft light on the river and the snow peaks.",
                "Be prepared for the cold wind coming off the Dhauladhars; carry a light jacket even during the summer.",
                "Respect the sensitive nature of the river area; do not throw any waste or plastic into the Baner river."
        ],
        "faqs": [
                {
                        "question": "Who is Chamunda Devi?",
                        "answer": "She is the manifestation of the Mother Goddess who killed the demons Chanda and Munda, as described in the Durga Saptashati."
                },
                {
                        "question": "Why is it unique?",
                        "answer": "Because it houses both the fierce Goddess and the Lord Shiva as Nandikeshwar in a single sacred complex."
                },
                {
                        "question": "How far is it from Dharamshala?",
                        "answer": "It is about 15km away, making it a very popular and easy day trip for visitors staying in Dharamshala or McLeod Ganj."
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
    'Brajeshwari Devi (Kangra Town)', 
    'brajeshwari-devi-temple-kangra-town', 
    'Sacred Destination', 
    'hp', 
    'The "Goddess of the Golden Shrine", Brajeshwari Devi is a supreme Shakti Peeth in Kangra town. It is a site of absolute royal authority and divine abundance, where the left breast of Sati is believed to have fallen, representing the absolute manifestation of the maternal nourishment and the profound energy of the ancient Kangra kingdom.', 
    '320.2', 
    '280.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of the Kangra Valley and the Sanctuary of the Golden Grace', 
    'Brajeshwari Devi Temple | Himachal Pradesh, Shakti Peeth & Ancient Lore (TOWN)', 
    'Experience the profound energy of Brajeshwari Devi. Discover the golden temple, the legend of the falling left breast of Sati, and the profound energy of the Kangra pilgrimage.', 
    'Brajeshwari Devi, Himachal Pradesh, Shakti Peeth, Kangra, Hindu Pilgrimage, Ancient Lore, Golden Temple, Kangra Kingdom', 
    '299', 
    '{
        "spiritualEssence": "Brajeshwari is the manifestation of the divine as the supreme nourishment and the absolute power of the maternal grace. The energy here is warm, golden, and intensely regal. It is the site where the heart of the Kangra valley is anchored. The vibration is one of ''Pushti'' (Nourishment) and the absolute connection to the royal heritage of the Himalayas. As a temple rebuilt in a grand style after the 1905 earthquake, it represents the spiritual resilience of the Himachal. A visit here is believed to grant the devotee the absolute fulfillment of the inner hunger and the blessing of the divine abundance. The air is always vibrant with the scent of the incense and the constant, rhythmic sound of the bells of the golden shrine.",
        "longDescription": "Brajeshwari Devi (also known as Vajreshwari) is one of the most important Shakti Peethas. The original temple was legendary for its wealth and was looted by several invaders, including Mahmud Ghazni and the Mughals, only to be rebuilt each time. It was famously destroyed by the 1905 Kangra earthquake and rebuilt by the local community in the current magnificent style. The Goddess is worshipped here as the manifestation of the divine energy that provides the sustenance to the universe. Legend tells that the great saint Adi Shankaracharya personally visited the site to revitalize the worship. It is a site where the highest level of royal history and the most resilient local faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Brajeshwari Devi is a spectacular display of the Indo-Saracenic and Himachali styles with a focus on the structural grandeur and the golden ornamentation. The temple features a high shikhara with a prominent golden umbrella and a series of intricately carved stone pillars. A unique feature is the presence of the massive silver doors and the inner sanctum where the deity is worshipped in the form of a Pindi (natural stone). The architecture is designed to lead the pilgrim through a series of grand halls to the golden heart of the shrine. The use of the vibrant colors and the extensive use of the gold and the silver create a sense of a spiritual palace that has survived the trials of the time. The complex includes several smaller shrines and a sacred courtyard for the local festivals.",
        "vedicReferences": "Brajeshwari Devi is celebrated in the Devi Bhagavata Purana as the supreme site where the Mother personally manifested her nourishing power to sustain the gods during the cosmic battles.",
        "deepInsights": "The falling of the left breast represents the truth that the divine protection is maternal and all-encompassing. Brajeshwari teaches that the spirit must be resilient in its pursuit of the truth, regardless of the external destruction.",
        "ancientLore": "Lore tells that the Goddess personally appeared in the dream of the King of Kangra to command the rebuilding of the temple after its destruction. Another legend says that the butter applied to the Pindi during the Makar Sankranti festival has miraculous healing powers.",
        "keyRituals": [
                {
                        "name": "Makarsankranti Butter Offering",
                        "description": "The unique ritual of covering the main deity with 36 quintals of butter to seek the divine healing and the prosperity."
                },
                {
                        "name": "Golden Umbrella Archana",
                        "description": "Offering prayers to the Goddess to seek the royal protection and the success in the life."
                },
                {
                        "name": "Kangra Valley Sankalpa",
                        "description": "Taking a sacred vow at the Brajeshwari temple to seek the blessing of the Mother of the valley."
                },
                {
                        "name": "Silver Door Darshan",
                        "description": "The ritual of praying before the massive silver gates to experience the majesty of the Goddess."
                }
        ],
        "highlights": [
                {
                        "name": "The Golden Shikhara",
                        "description": "The magnificent heart of the temple that shines over the Kangra town."
                },
                {
                        "name": "The Silver Entrance Doors",
                        "description": "The beautifully carved gates that represent the wealth and the devotion of the Kangra people."
                },
                {
                        "name": "The Ancient Pindi",
                        "description": "The natural stone form of the Goddess that has been worshipped for thousands of years."
                },
                {
                        "name": "The Earthquake Memorial Gate",
                        "description": "The historic entrance that records the resilience of the temple after the 1905 disaster."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during the Navratri months and the Makar Sankranti).",
                "howToReach": "Located in the heart of Kangra town. Easily accessible by taxi or auto-rickshaw from Kangra or Dharamshala.",
                "nearestAirport": "Gaggal Airport, Kangra.",
                "nearestRailway": "Pathankot Railway Station."
        },
        "tips": [
                "Visit the temple during the Makar Sankranti to witness the spectacular butter-offering ritual; it is a unique cultural event.",
                "Maintain absolute respect for the royal traditions of the temple; it is a site of high honor for the people of Himachal.",
                "The temple is in a busy market area; be prepared for crowds and allow extra time for the parking and the walk."
        ],
        "faqs": [
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the important Shakti Peethas, where the left breast of the Goddess Sati is said to have fallen."
                },
                {
                        "question": "Why was it looted so many times?",
                        "answer": "Historically, the temple was legendary for its immense wealth in gold and jewels, making it a target for several medieval invaders."
                },
                {
                        "question": "What is unique about the butter ritual?",
                        "answer": "During Makar Sankranti, the deity is covered in a massive layer of butter, which is later distributed to the devotees for its healing properties."
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
    'Chintpurni', 
    'chintpurni-devi-temple-una', 
    'Sacred Destination', 
    'hp', 
    'The "Remover of Worries", Chintpurni is a supreme Shakti Peeth in the Una district. It is a site of absolute emotional authority and divine relief, where the feet of Sati are believed to have fallen, represented by the Goddess Chinnamastika, the self-decapitated Mother who grants the absolute removal of the mental burdens.', 
    '280.2', 
    '300.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of the Relieved Heart and the Sanctuary of the Chinnamastika Shakti', 
    'Chintpurni Devi Temple | Himachal Pradesh, Shakti Peeth & Ancient Lore', 
    'Experience the profound relief of Chintpurni. Discover the Chinnamastika shrine, the legend of the falling feet of Sati, and the profound energy of the Una pilgrimage.', 
    'Chintpurni, Himachal Pradesh, Shakti Peeth, Una, Hindu Pilgrimage, Ancient Lore, Chinnamastika, Remover of Worries', 
    '300', 
    '{
        "spiritualEssence": "Chintpurni is the manifestation of the divine as the supreme relief and the absolute power of the self-sacrifice. The energy here is warm, maternal, and intensely grounding. It is the site where the heavy burdens of the mind are dissolved. The vibration is one of ''Abhaya'' (Fearlessness) and the absolute connection to the root of the existence. As a temple set on a high ridge in the Sivalik hills, it represents the spiritual refuge of the lower Himalayas. A visit here is believed to grant the devotee the absolute removal of the worries and the blessing of the divine peace. The air is always vibrant with the scent of the sandalwood and the constant, rhythmic sound of the bells of the relieved seekers.",
        "longDescription": "Chintpurni is one of the 51 Shakti Peethas. The Goddess here is worshipped as Chinnamastika, the one who severed her own head to feed her attendants, symbolizing the absolute selflessness of the Mother. The name Chintpurni literally means ''the one who fulfills all desires and removes all worries.'' The temple is unique for its banyan tree where devotees tie sacred threads. Legend tells that the great saint Pandit Mai Das established the temple after the Goddess appeared to him in a vision. It is a major center for the pilgrims from Punjab and Himachal, especially during the Navratri fairs. It is a site where the highest level of Tantric symbolism and the most intimate folk faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Chintpurni is a spectacular display of the traditional Himachali style with a focus on the simplicity and the communal flow. The temple features a central stone shrine with a white-washed exterior and a large open-air courtyard that houses an ancient banyan tree. A unique feature is the presence of the silver-plated entrance and the intricate carvings that depict the story of the Goddess. The architecture is designed to manage the massive flow of pilgrims while maintaining a sense of a peaceful sanctuary. The use of the vibrant colors and the simple stone flooring create a sense of a spiritual home that is both ancient and accessible. The complex includes several resting halls and a sacred well nearby.",
        "vedicReferences": "Chintpurni is celebrated in the Pradhana Rahasya of the Chandi Path as the supreme site where the Mother personally manifested her self-sacrificing form to teach the secret of the liberation.",
        "deepInsights": "The self-decapitated form represents the truth that the highest realization is the transcendence of the ego. Chintpurni teaches that the spirit must become free of the worries to receive the divine light.",
        "ancientLore": "Lore tells that the Goddess personally guided Pandit Mai Das to the spot where her feet had fallen. Another legend says that the banyan tree of Chintpurni never sheds its leaves during the winter, as it is protected by the divine grace.",
        "keyRituals": [
                {
                        "name": "Chinnamastika Archan",
                        "description": "Offering prayers and sacred substances to the self-decapitated form of the Mother to seek the mental peace."
                },
                {
                        "name": "Thread-Tying (Chintpurni)",
                        "description": "Tying a sacred thread on the ancient banyan tree to symbolize the devotee''s prayer for the removal of the worries."
                },
                {
                        "name": "Sivalik Ridgetop Meditation",
                        "description": "Sitting in the temple courtyard to meditate while focusing on the horizon of the lower Himalayas."
                },
                {
                        "name": "Mai Das Memorial Puja",
                        "description": "Offering prayers at the shrine of the founding saint to seek the blessing of the true devotion."
                }
        ],
        "highlights": [
                {
                        "name": "The Chinnamastika Shrine",
                        "description": "The sacred heart of the temple where the energy of the Goddess is housed."
                },
                {
                        "name": "The Ancient Banyan Tree",
                        "description": "The spiritual anchor of the temple where millions of prayers are tied in the form of the threads."
                },
                {
                        "name": "The Silver Gateway (Chintpurni)",
                        "description": "The beautifully carved entrance that represents the gratitude of the devotees."
                },
                {
                        "name": "The Sivalik Hill Perspective",
                        "description": "The spectacular views of the lower mountain ranges that surround the temple town."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the Navratri months are particularly vibrant).",
                "howToReach": "30km from Hoshiarpur and 40km from Una. Well connected by road; regular taxis and buses run from Una and Chandigarh.",
                "nearestAirport": "Chandigarh Airport / Gaggal Airport.",
                "nearestRailway": "Una Himachal Railway Station."
        },
        "tips": [
                "Visit the temple during the early morning hours to avoid the massive crowds that arrive later in the day.",
                "Participate in the thread-tying ritual; it is a deeply personal way to connect with the tradition of the temple.",
                "Respect the sensitive nature of the Chinnamastika form; it is a site of deep and serious Tantric symbolism."
        ],
        "faqs": [
                {
                        "question": "Who is Chinnamastika?",
                        "answer": "She is a powerful manifestation of the Mother Goddess who is depicted as having severed her own head, symbolizing the absolute self-sacrifice and the transcendence of the ego."
                },
                {
                        "question": "Why is it called Chintpurni?",
                        "answer": "Because the Goddess is believed to fulfill (purna) all the desires and remove all the worries (chinta) of her devotees."
                },
                {
                        "question": "Is it near the Punjab border?",
                        "answer": "Yes, it is very close to the border of Himachal and Punjab, making it a major pilgrimage site for people from both states."
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
    'Naina Devi Temple (Bilaspur)', 
    'naina-devi-temple-bilaspur-himachal', 
    'Sacred Destination', 
    'hp', 
    'The "Goddess of the Sacred Sight", Naina Devi is a supreme Shakti Peeth in the Bilaspur district. It is a site of absolute ridgetop authority and divine vision, where the eyes of Sati are believed to have fallen, representing the absolute manifestation of the inner sight and the profound energy of the mountain-top pilgrimage.', 
    '290.2', 
    '310.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of the Divine Vision and the Sanctuary of the High Ridge', 
    'Naina Devi Temple | Himachal Pradesh, Shakti Peeth & Ancient Lore (HIMACHAL)', 
    'Experience the profound energy of Naina Devi. Discover the ridgetop Shakti Peeth, the legend of the falling eyes of Sati, and the profound energy of the Bilaspur pilgrimage.', 
    'Naina Devi, Himachal Pradesh, Shakti Peeth, Bilaspur, Hindu Pilgrimage, Ancient Lore, High Altitude, Divine Vision', 
    '301', 
    '{
        "spiritualEssence": "Naina Devi is the manifestation of the divine as the supreme vision and the absolute power of the ridgetop perspective. The energy here is cool, expansive, and intensely luminous. It is the site where the eyes of the Mother became the crown of the mountain. The vibration is one of ''Drishti'' (Vision) and the absolute connection to the celestial light. As a temple perched on a high ridge overlooking the Gobind Sagar lake and the plains of Punjab, it represents the spiritual guardian of the southern Himachal. A visit here is believed to grant the devotee the absolute removal of the spiritual blindness and the blessing of the inner clarity. The air is always vibrant with the scent of the mountain flowers and the constant, rhythmic sound of the bells echoing across the lake.",
        "longDescription": "Naina Devi is one of the most important Shakti Peethas. According to the Puranas, the eyes of Sati fell at this spot. The temple is famous for its location, requiring a steep climb or a ropeway ride to the peak. Legend tells that the great Sikh Guru, Guru Gobind Singh, personally performed a massive Havan here before starting his battles against the Mughal oppression. The temple features an ancient stone structure and a sacred cave where the Goddess is believed to have taken refuge. It is a major center for the pilgrims from all over North India, especially during the Shravan Ashtami fair. It is a site where the highest level of Puranic mythology and the most heroic Sikh history are perfectly unified.",
        "spiritualArchitecture": "The architecture of Naina Devi is a spectacular display of the traditional Himachali ridgetop style with a focus on the visibility and the structural grandeur. The temple features a central stone shrine with a white-washed exterior and a series of grand courtyards that wrap around the peak. A unique feature is the presence of the massive silver-plated entrance and the ropeway that provides a bird''s eye view of the entire region. The architecture is designed to focus the attention on the horizon and the sky. The use of the vibrant red flags and the extensive use of the bells create a sense of a spiritual fortress that is both ancient and celebratory. The complex includes several smaller shrines and a sacred cave called the Naina Devi Gufa.",
        "vedicReferences": "Naina Devi is celebrated in the Devi Bhagavata Purana as the supreme site where the Mother personally manifested her sight to guide the souls through the darkness of the Kali Yuga.",
        "deepInsights": "The falling of the eyes represents the truth that the highest realization is the opening of the inner sight. Naina Devi teaches that the spirit must rise to the highest point to see the truth of the existence.",
        "ancientLore": "Lore tells that the mountain peak personally rose higher to receive the sacred relic of the Mother. Another legend says that the water of the sacred cave has the power to heal all the diseases of the eyes.",
        "keyRituals": [
                {
                        "name": "Naina-Aarti",
                        "description": "The ritual of offering light and chants to the Goddess of Vision at dawn and dusk to seek the mental clarity."
                },
                {
                        "name": "Ridgetop Havan (Naina Devi)",
                        "description": "The performance of the fire ritual at the peak to seek the protection and the success in the life."
                },
                {
                        "name": "Gobind Sagar Arghya",
                        "description": "Offering prayers to the massive lake below from the temple courtyard to seek the abundance."
                },
                {
                        "name": "Naina Gufa Darshan",
                        "description": "Entering the sacred cave to seek the blessing of the hidden Mother."
                }
        ],
        "highlights": [
                {
                        "name": "The High-Peak Shrine",
                        "description": "The sacred heart of the temple where the energy of the Shakti Peeth is housed."
                },
                {
                        "name": "The Naina Devi Ropeway",
                        "description": "The modern aerial path that provides a unique perspective of the ridgetop and the lake."
                },
                {
                        "name": "The Gobind Sagar View",
                        "description": "The spectacular vantage point offering views of the massive turquoise lake and the Punjab plains."
                },
                {
                        "name": "The Guru Gobind Singh Altar",
                        "description": "The historic spot associated with the great Guru''s penance at the peak."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially the Navratri months and the Shravan Ashtami).",
                "howToReach": "Located 20km from Bilaspur and 100km from Chandigarh. Reached by road to the base, followed by a climb or a ropeway ride.",
                "nearestAirport": "Chandigarh Airport.",
                "nearestRailway": "Anandpur Sahib Railway Station."
        },
        "tips": [
                "Visit the temple during the early morning hours to enjoy the sunrise over the lake and the plains; it is a breathtaking sight.",
                "The ropeway is a convenient way to reach the peak, but the traditional climb offers a more meditative experience.",
                "Respect the absolute sanctity of the sacred cave; it is a site of deep and quiet devotion."
        ],
        "faqs": [
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the important Shakti Peethas, where the eyes of the Goddess Sati are said to have fallen."
                },
                {
                        "question": "How do we reach the peak?",
                        "answer": "You can either walk up the paved path or take the modern ropeway from the base of the hill."
                },
                {
                        "question": "What is the connection with the Sikh Gurus?",
                        "answer": "Guru Gobind Singh, the tenth Sikh Guru, is believed to have performed a major ritual at this temple before establishing the Khalsa Panth."
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
    'Baba Balak Nath (Deotsidh)', 
    'baba-balak-nath-temple-deotsidh-himachal', 
    'Sacred Destination', 
    'hp', 
    'The "Immortal Boy of the Himalayas", Baba Balak Nath is a supreme Siddha shrine in Deotsidh. It is a site of absolute yogic authority and divine celibacy, where the saint is believed to have meditated for eternity in a natural cave, representing the absolute manifestation of the eternal youth and the profound energy of the Siddha tradition.', 
    '300.2', 
    '300.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Eternal Youth of the Deotsidh Ridge and the Sanctuary of the Immortal Sidh', 
    'Baba Balak Nath Temple | Himachal Pradesh, Siddha & Ancient Lore (HIMACHAL)', 
    'Experience the profound energy of Baba Balak Nath. Discover the cave temple of Deotsidh, the legend of the immortal boy, and the profound energy of the Hamirpur pilgrimage.', 
    'Baba Balak Nath, Himachal Pradesh, Deotsidh, Siddha, Hindu Pilgrimage, Ancient Lore, Cave Temple, Immortal Boy', 
    '302', 
    '{
        "spiritualEssence": "Baba Balak Nath is the manifestation of the divine as the supreme youth and the absolute power of the yogic celibacy. The energy here is vibrant, clean, and intensely focused. It is the site where the time stands still in the form of a child-saint. The vibration is one of ''Sidhi'' (Attainment) and the absolute connection to the ancient lineage of the masters. As a cave temple perched on a high ridge in the Hamirpur district, it represents the spiritual lighthouse of the central Himachal. A visit here is believed to grant the devotee the absolute removal of the obstacles and the blessing of the eternal vitality. The air is always vibrant with the scent of the burning wood and the constant, rhythmic sound of the chants of the Sidh.",
        "longDescription": "Baba Balak Nath (also known as Sidh Baba) is worshipped as an incarnation of the Lord Kartikeya in the Satya Yuga. He is believed to have remained a child-saint for eternity through his yogic powers. The temple is a natural cave at Deotsidh where the saint performed his final penance. A unique tradition of the temple is that women are not allowed to enter the main cave but can view the deity from a separate platform. Devotees offer rot (large sweetened bread) as the primary offering. Legend tells that the saint was a disciple of the Guru Gorakhnath but chose the path of the independent Siddha. It is a site where the highest level of Himalayan yogic tradition and the most intense local faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Baba Balak Nath is a spectacular display of the traditional Himachali ridge style with a focus on the natural integration and the accessibility. The temple features a central stone shrine that frames the natural cave and a series of grand courtyards that wrap around the ridge. A unique feature is the presence of the viewing platforms for the female devotees and the massive iron tridents (trishuls) that represent the power of the Sidh. The architecture is designed to lead the pilgrim through a series of levels to the mouth of the sacred cave. The use of the vibrant colors and the simple stone structures create a sense of a spiritual home that is both ancient and alert. The complex includes several residential halls and a large community kitchen.",
        "vedicReferences": "Baba Balak Nath is celebrated in the local oral epics as the supreme site where the ''Yoga-Maya'' (the power of the illusion) was personally transcended by the eternal child.",
        "deepInsights": "The eternal youth represents the truth that the spirit never ages and the soul is always fresh. Baba Balak Nath teaches that the highest attainment is the preservation of the inner purity.",
        "ancientLore": "Lore tells that the saint personally milked the celestial cows to feed the hungry travelers. Another legend says that the lights of Deotsidh are lit by the stars every night to honor the immortal Sidh.",
        "keyRituals": [
                {
                        "name": "Sidh-Rot Offering",
                        "description": "The unique ritual of offering large sweetened breads to the saint to seek the prosperity and the protection."
                },
                {
                        "name": "Cave-Mouth Darshan",
                        "description": "The ritual of praying at the entrance of the sacred cave to seek the blessing of the immortal youth."
                },
                {
                        "name": "Siddha-Deepam",
                        "description": "Offering lamps at the ridgetop at dusk to seek the divine guidance in the life."
                },
                {
                        "name": "Deotsidh Sankalpa",
                        "description": "Taking a sacred vow at the temple to maintain the purity of the thoughts and the actions."
                }
        ],
        "highlights": [
                {
                        "name": "The Sacred Cave of Deotsidh",
                        "description": "The natural rock heart of the temple where the saint is believed to reside."
                },
                {
                        "name": "The Female Viewing Platform",
                        "description": "The unique architectural feature that respects the ancient traditions of the temple."
                },
                {
                        "name": "The Eternal Dhuni (Sidh)",
                        "description": "The spiritual fire that has been kept alive by the devotees for centuries."
                },
                {
                        "name": "The Ridge Viewpoint",
                        "description": "The spectacular vantage point offering views of the surrounding hills of the central Himachal."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially the spring months and the Holi festival).",
                "howToReach": "45km from Hamirpur and 70km from Bilaspur. Well connected by road; regular taxis and buses run from Hamirpur and Chandigarh.",
                "nearestAirport": "Chandigarh Airport.",
                "nearestRailway": "Una Himachal Railway Station."
        },
        "tips": [
                "Participate in the Rot-offering ritual; it is the most significant way to connect with the energy of the saint.",
                "Respect the traditional rules regarding the entry of the women into the main cave; the viewing platform provides an excellent darshan.",
                "Spend some time in the quiet corners of the ridge; the energy of the Deotsidh is exceptionally peaceful and grounding."
        ],
        "faqs": [
                {
                        "question": "Who was Baba Balak Nath?",
                        "answer": "He is a revered child-saint and an immortal Siddha, believed to be an incarnation of Lord Kartikeya."
                },
                {
                        "question": "Why are women not allowed in the cave?",
                        "answer": "This is an ancient tradition based on the saint''s commitment to absolute celibacy; however, women are provided with special platforms for a clear view of the deity."
                },
                {
                        "question": "What is Deotsidh?",
                        "answer": "Deotsidh is the name of the sacred ridge and the temple complex where the saint''s cave is located."
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
    'Baijnath Himachal', 
    'baijnath-shiva-temple-kangra-himachal', 
    'Sacred Destination', 
    'hp', 
    'The "Healing Lord of the Dhauladhars", Baijnath is an ancient stone temple in the Kangra district. It is a site of absolute architectural authority and divine resonance, where Lord Shiva is worshipped as Vaidyanath (the Lord of Physicians), representing the absolute manifestation of the healing power and the profound energy of the 13th-century stone-craft.', 
    '340.2', 
    '270.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Stone Masterpiece of the Binwa River and the Sanctuary of the Healing Lord', 
    'Baijnath Temple | Himachal Pradesh, Shiva & Ancient Lore', 
    'Experience the profound beauty of Baijnath. Discover the 1204 AD stone temple, the legend of the healing Lord, and the profound energy of the Kangra valley pilgrimage.', 
    'Baijnath, Himachal Pradesh, Shiva, Vaidyanath, Kangra, Hindu Pilgrimage, Ancient Lore, Nagara Architecture, Binwa River', 
    '303', 
    '{
        "spiritualEssence": "Baijnath is the manifestation of the divine as the supreme healing and the absolute refinement of the sacred art. The energy here is tranquil, stone-clad, and intensely resonant. It is the site where the high Himalayan spirit is reflected in the waters of the Binwa. The vibration is one of ''Arogya'' (Health) and the absolute clarity of the physical and spiritual well-being. As a 13th-century Nagara style temple that has survived countless invasions and earthquakes, it represents the spiritual jewel of the central Himachal. A visit here is believed to grant the devotee the absolute restoration of the health and the blessing of the divine beauty. The air is always vibrant with the scent of the river mist and the silent, heavy energy of the ancient stone-craft.",
        "longDescription": "Baijnath is world-famous for its Shiva Temple, built in 1204 AD by two local merchants, Ahuka and Manyuka. It is one of the most beautiful examples of the North Indian Nagara style. According to the legend, this is the site where the demon king Ravana performed intense penance to Lord Shiva to receive the Atma-Linga. The temple has remained a major center of pilgrimage for centuries and is unique for not celebrating the Dussehra festival out of respect for Ravana''s devotion. The site features an ancient stone structure with a high shikhara and a series of intricately carved relief sculptures. It is a site where the highest level of Himalayan medieval sculpture and the most serene valley-side ecology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Baijnath is a spectacular display of the refined Nagara style with a focus on the smooth surfaces and the elegant proportions. The temple features a high shikhara and an intricately carved entrance hall (mandapam) with two massive stone balconies. A unique feature is the presence of the life-sized statues of the various deities and the celestial dancers in the outer niches. The architecture is designed to lead the pilgrim from the river ghats to the central sanctum, emphasizing the connection between the water and the fire of the deity. The use of the local gray stone and the expansive temple courtyard create a sense of a spiritual city that has stood for over 800 years. The complex includes several smaller shrines and a sacred well nearby.",
        "vedicReferences": "Baijnath is celebrated in the local oral traditions as the supreme site where the divine physicians (the Ashvins) offered prayers to the Lord Shiva to seek the secret of the eternal health.",
        "deepInsights": "The healing Lord represents the truth that the spirit is the source of all the physical well-being. Baijnath teaches that the highest beauty is the one that reflects the divine order.",
        "ancientLore": "Lore tells that the main Lingam of Baijnath was personally blessed by the Lord Shiva after Ravana''s penance. Another legend says that the fish in the Binwa river at Baijnath are protected by the Lord and will never leave the temple stretch of the water.",
        "keyRituals": [
                {
                        "name": "Baijnath Healing Abhishekam",
                        "description": "The ritual of offering sacred river water to the Lord Vaidyanath to seek the physical and the spiritual healing."
                },
                {
                        "name": "Binwa River Arghya",
                        "description": "Offering prayers to the river Binwa at sunset to seek the blessing of the life-giving waters."
                },
                {
                        "name": "Ravana-Bhakti Reflection",
                        "description": "Meditating in the temple courtyard to reflect on the power of the intense devotion and the surrender."
                },
                {
                        "name": "Stone-Path Parikrama",
                        "description": "Walking in silence around the ancient temple to absorb the cumulative energy of the centuries of the prayer."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Vaidyanath Temple",
                        "description": "The 13th-century stone heart of the complex dedicated to the Lord of Healing."
                },
                {
                        "name": "The Nagara Shikhara",
                        "description": "One of the most perfectly preserved examples of the North Indian temple spires."
                },
                {
                        "name": "The Binwa River View",
                        "description": "The peaceful river banks that offer a perfect spot for the meditation and the prayer."
                },
                {
                        "name": "The Ancient Relief Sculptures",
                        "description": "The beautiful and detailed stone carvings that decorate the outer walls of the temple."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the valley is most beautiful in the spring and the autumn).",
                "howToReach": "15km from Palampur and 50km from Dharamshala. Well connected by road; regular taxis and buses run from Palampur and Kangra.",
                "nearestAirport": "Gaggal Airport, Kangra.",
                "nearestRailway": "Pathankot Railway Station / Palampur Narrow Gauge Station."
        },
        "tips": [
                "Visit the temple in the late afternoon to see the golden light reflected on the stone and the river.",
                "Spend time in the Binwa river ghats; it is one of the most peaceful river-side spots in the Kangra valley.",
                "Maintain the absolute respect for the ancient sculptures; do not touch the delicate carvings in the inner sanctum."
        ],
        "faqs": [
                {
                        "question": "How old is the temple?",
                        "answer": "The main temple was built in 1204 AD, making it over 800 years old."
                },
                {
                        "question": "What is the connection with Ravana?",
                        "answer": "Legend says that Ravana performed his penance to Lord Shiva at this very spot to obtain the Atma-Linga."
                },
                {
                        "question": "Is it different from the Baijnath in Uttarakhand?",
                        "answer": "Yes, while both are dedicated to Shiva as Vaidyanath, they are in different states and have different architectural histories."
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
    'Hidimba Devi', 
    'hidimba-devi-temple-manali-cedar-forest', 
    'Sacred Destination', 
    'hp', 
    'The "Mother of the Cedar Forests", Hidimba Devi is a unique wooden temple in Manali. It is a site of absolute forest authority and divine protection, where the Goddess Hidimba is worshipped in a natural cave under a four-tiered pagoda roof, representing the absolute manifestation of the spirit of the woods and the profound energy of the Mahabharata lore.', 
    '360.2', 
    '255.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Protector of the Beas Valley and the Sanctuary of the Ancient Cedar Grove', 
    'Hidimba Devi Temple | Himachal Pradesh, Mahabharata & Ancient Lore', 
    'Experience the profound magic of Hidimba Devi. Discover the wooden pagoda temple, the legend of the forest Mother, and the profound energy of the Manali pilgrimage.', 
    'Hidimba Devi, Himachal Pradesh, Manali, Mahabharata, Hindu Pilgrimage, Ancient Lore, Pagoda Temple, Cedar Forest', 
    '304', 
    '{
        "spiritualEssence": "Hidimba is the manifestation of the divine as the supreme nature and the absolute power of the forest silence. The energy here is cool, woody, and intensely primal. It is the site where the heavy scent of the cedar resin meets the vibration of the ancient rock. The vibration is one of ''Prakriti'' (Nature) and the absolute connection to the spirits of the mountains. As a wooden temple set in a dense grove of towering cedars (Dhungri), it represents the spiritual heart of the upper Beas valley. A visit here is believed to grant the devotee the absolute grounding in the nature and the blessing of the divine protection. The air is always vibrant with the scent of the pine needles and the silent, heavy energy of the massive trunks.",
        "longDescription": "Hidimba Devi is unique as she is worshipped not as a human manifestation but as a forest goddess. According to the Mahabharata, she was the sister of the demon Hidimb and became the wife of Bhima. She performed intense penance in these forests to receive the status of a deity. The temple, built in 1553 AD by Raja Bahadur Singh, is a masterpiece of the wooden architecture, featuring a four-tiered pagoda roof and intricately carved wooden doors depicting the animals and the sacred symbols. The main deity is a footprint on a natural rock inside the cave. It is a major center for the local Kullu festivals. It is a site where the highest level of Himalayan wooden craft and the most ancient forest mythology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Hidimba Devi is a spectacular display of the unique pagoda style with a focus on the wooden structural integrity and the natural integration. The temple features three tiers of square roofs and a fourth conical roof at the top, all made of the dark cedar wood and the local stone. A unique feature is the presence of the massive horns of the wild animals fixed on the outer walls, representing the fierce protection of the Mother. The architecture is designed to reflect the form of the surrounding cedar trees. The use of the deep wood carvings and the natural cave interior create a sense of a spiritual home that is both rustic and sacred. The complex includes a separate shrine for the Goddess''s son, Ghatotkacha.",
        "vedicReferences": "Hidimba Devi is celebrated in the local oral epics of the Kullu valley as the supreme site where the Mother personally manifested her forest-grace to protect the mountain dwellers.",
        "deepInsights": "The Goddess of the Forest represents the truth that the divine is present in the wild and the uncarved aspects of the world. Hidimba teaches that the highest wisdom is to live in harmony with the natural order.",
        "ancientLore": "Lore tells that the king who commissioned the temple personally cut off the hands of the master craftsman to ensure no such masterpiece was ever built again. Another legend says that the cedar trees of the Dhungri grove are the physical forms of the sages who meditated with the Goddess.",
        "keyRituals": [
                {
                        "name": "Dhungri Mela Participation",
                        "description": "The grand annual festival celebrating the birth of the Goddess with the local music and the dance."
                },
                {
                        "name": "Cedar Forest Meditation",
                        "description": "Sitting in the silence of the massive trees surrounding the temple to seek the inner peace."
                },
                {
                        "name": "Footprint-Archan",
                        "description": "Offering sacred flowers to the natural footprints of the Goddess within the cave shrine."
                },
                {
                        "name": "Forest-Protection Sankalpa",
                        "description": "Taking a sacred vow at the temple to protect the mountain ecology and the forests."
                }
        ],
        "highlights": [
                {
                        "name": "The Four-Tiered Pagoda",
                        "description": "The unique and magnificent wooden heart of the temple."
                },
                {
                        "name": "The Dhungri Forest Grove",
                        "description": "The sacred cedar forest that provides a natural sanctuary for the temple."
                },
                {
                        "name": "The Ghatotkacha Shrine",
                        "description": "The nearby open-air altar dedicated to the heroic son of the Goddess Hidimba."
                },
                {
                        "name": "The Carved Wooden Doors",
                        "description": "The historic entrance featuring some of the most intricate wood-work in the Himalayas."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially May for the Dhungri Mela and the winter for the snow-covered forest).",
                "howToReach": "Located in Old Manali. Easily accessible by foot, auto-rickshaw, or taxi from the Manali town center.",
                "nearestAirport": "Bhuntar Airport, Kullu.",
                "nearestRailway": "Joginder Nagar Narrow Gauge / Pathankot."
        },
        "tips": [
                "Visit the temple during the early morning hours to enjoy the silence of the forest before the tourists arrive.",
                "Spend some time walking in the surrounding Dhungri forest; the energy is exceptionally pure and grounding.",
                "Respect the local traditions; the deity is deeply revered as the ultimate protector of the Beas valley."
        ],
        "faqs": [
                {
                        "question": "Who was Hidimba?",
                        "answer": "She was a forest-dwelling goddess and the wife of Bhima (the second Pandava), and the mother of the hero Ghatotkacha."
                },
                {
                        "question": "Why is the architecture different?",
                        "answer": "The temple follows the unique pagoda style which is rare in mainland India but common in certain Himalayan pockets like Himachal and Nepal."
                },
                {
                        "question": "How old is the temple?",
                        "answer": "The current wooden structure was built in 1553 AD by the Raja of Kullu, though the site has been sacred since the Mahabharata era."
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
    'Manikaran', 
    'manikaran-hot-springs-kullu-valley', 
    'Sacred Destination', 
    'hp', 
    'The "Valley of the Sacred Jewel", Manikaran is a unique spiritual site in the Parvati valley. It is a site of absolute thermal authority and divine resonance, where the earring of Goddess Parvati is believed to have fallen, represented by the natural hot springs that serve both the Hindu temple and the grand Gurudwara, representing the absolute manifestation of the healing warmth and the profound energy of the cross-cultural faith.', 
    '370.2', 
    '260.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Healing Waters of the Parvati Valley and the Sanctuary of the Eternal Warmth', 
    'Manikaran Sahib | Himachal Pradesh, Shiva-Parvati & Guru Nanak Lore', 
    'Experience the profound energy of Manikaran. Discover the natural hot springs, the legend of the sacred jewel, and the profound energy of the Parvati valley pilgrimage.', 
    'Manikaran, Himachal Pradesh, Parvati Valley, Hot Springs, Guru Nanak, Shiva, Hindu Pilgrimage, Ancient Lore, Sikh Pilgrimage', 
    '305', 
    '{
        "spiritualEssence": "Manikaran is the manifestation of the divine as the supreme healing and the absolute power of the inner warmth. The energy here is steamy, vibrant, and intensely communal. It is the site where the cold river water meets the boiling subterranean fire. The vibration is one of ''Seva'' (Service) and the absolute connection to the life-giving warmth. As a town set in a narrow gorge where the Parvati river roars past the hot springs, it represents the spiritual hearth of the Kullu Himalayas. A visit here is believed to grant the devotee the absolute removal of the physical ailments and the blessing of the spiritual harmony. The air is always vibrant with the scent of the sulfur and the constant, rhythmic sound of the river and the chanting of the Gurbani and the Shiva-Mantra.",
        "longDescription": "Manikaran is sacred to both the Hindus and the Sikhs. For the Hindus, it is the site where Lord Shiva and Goddess Parvati stayed for eleven hundred years, and where her earring (Mani) was lost and recovered from the earth. For the Sikhs, it is the site where Guru Nanak Dev Ji personally visited and performed a miracle by bringing forth the hot springs to cook the food for the hungry. The site features a series of natural hot springs, a large Shiva temple, and a magnificent Gurudwara. The water is so hot that it is used to cook the rice and the pulses for the community kitchen (Langar). It is a site where the highest level of geological wonder and the most intense inter-faith devotion are perfectly unified.",
        "spiritualArchitecture": "The architecture of Manikaran is a spectacular display of the integrated mountain style with a focus on the riverside framing and the thermal management. The complex features a central stone Shiva temple and a massive multi-storeyed Gurudwara with marble floors and golden domes. A unique feature is the presence of the hot-spring bathing pools (kunds) and the steam rooms built over the natural vents. The architecture is designed to lead the pilgrim from the freezing river banks to the warmth of the sacred waters. The use of the white marble and the colorful flags create a sense of a spiritual city that is both vibrant and peaceful. The complex includes several large community halls and residential wings for the pilgrims.",
        "vedicReferences": "Manikaran is celebrated in the Brahmanda Purana as the supreme site where the ''Agni'' (Fire) of the earth was personally tamed by the Lord Shiva to serve the humanity.",
        "deepInsights": "The boiling water represents the truth that the divine energy can provide sustenance even in the most rugged environments. Manikaran teaches that the highest service is to share the warmth of the heart with all.",
        "ancientLore": "Lore tells that the Sheshnag personally blew the jewel out of the earth with a single breath, creating the first hot spring. Another legend says that the water of Manikaran has the power to heal all the chronic bone diseases and the spiritual fatigue.",
        "keyRituals": [
            {"name": "Manikaran Hot Spring Snanam", "description": "Bathing in the sacred warm waters to seek the physical healing and the spiritual purification."},
            {"name": "Langar Participation", "description": "Eating the food cooked in the natural hot springs at the Gurudwara to seek the blessing of the Guru Nanak."},
            {"name": "Parvati Valley Arati", "description": "Offering light at dusk to the river and the mountains to seek the divine balance."},
            {"name": "Cross-Faith Prayer", "description": "Visiting both the Shiva temple and the Gurudwara to experience the unity of the spiritual truth."}
        ],
        "highlights": [
            {"name": "The Natural Hot Springs", "description": "The unique geological heart of the site where the water boils naturally."},
            {"name": "The Sri Guru Nanak Dev Ji Gurudwara", "description": "The magnificent Sikh shrine that provides a home and the food for all seekers."},
            {"name": "The Lord Shiva Temple (Manikaran)", "description": "The ancient stone shrine associated with the legend of the sacred jewel."},
            {"name": "The Parvati River Gorge", "description": "The spectacular natural scenery that surrounds the spiritual complex."}
        ],
        "travelInfo": {
            "bestTime": "Throughout the year (the winter months provide a spectacular contrast between the snow and the steam).",
            "howToReach": "Located 35km from Bhuntar in the Parvati valley. Well connected by road; regular taxis and buses run from Kullu and Kasol.",
            "nearestAirport": "Bhuntar Airport, Kullu.",
            "nearestRailway": "Joginder Nagar Narrow Gauge / Pathankot."
        },
        "tips": [
            "Be careful when entering the hot springs; the water can be extremely hot in some areas.",
            "Participate in the Langar (community meal); it is one of the most significant and peaceful experiences in Manikaran.",
            "Respect the traditions of both the faiths; cover your head in the Gurudwara and remove your shoes at the designated spots."
        ],
        "faqs": [
            {"question": "How hot is the water?", "answer": "The water temperature ranges from 70°C to 100°C, hot enough to cook rice and dal in the natural pools."},
            {"question": "What is the legend of the Mani?", "answer": "Legend says Goddess Parvati lost her earring (Mani) in the water, which was later found by the Lord Shiva after he threatened to destroy the world."},
            {"question": "Is it accessible in the winter?", "answer": "Yes, the hot springs make it a very popular destination even during the snowy winter months."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Tabo Monastery', 
    'tabo-monastery-spiti-ajanta-of-himalayas', 
    'Sacred Destination', 
    'hp', 
    'The "Ajanta of the Himalayas", Tabo is a supreme center of the Buddhist learning in Spiti. Founded in 996 AD, it is a site of absolute artistic authority and divine silence, where the ancient mud-walls house the most refined frescoes and the life-sized clay statues of the Indo-Tibetan world.', 
    '450.2', 
    '230.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Thousand-Year-Old Sanctuary of the Spiti Valley and the Jewel of the Mud Architecture', 
    'Tabo Monastery | Himachal Pradesh, Buddhism & Ancient Lore', 
    'Experience the profound silence of Tabo. Discover the 10th-century mud monastery, the legend of the Great Translator Rinchen Zangpo, and the profound energy of the Spiti pilgrimage.', 
    'Tabo Monastery, Spiti Valley, Himachal Pradesh, Buddhism, Hindu Pilgrimage, Ancient Lore, Mud Architecture, Rinchen Zangpo', 
    '306', 
    '{
        "spiritualEssence": "Tabo is the manifestation of the divine as the supreme stillness and the absolute power of the ancient transmission. The energy here is dry, earthen, and intensely meditative. It is the site where the earth was shaped into the cosmic mandalas. The vibration is one of ''Shunyata'' (Emptiness) and the absolute connection to the lineage of the great masters. As a monastery complex made of the sun-dried mud bricks at an altitude of 3,050 meters, it represents the spiritual heart of the Western Tibet frontier. A visit here is believed to grant the devotee the absolute removal of the mental noise and the blessing of the primordial wisdom. The air is always vibrant with the scent of the dry desert and the silent, heavy energy of the millennia of the continuous prayer.",
        "longDescription": "Tabo is one of the oldest continuously functioning Buddhist institutions in the world. It was founded by the legendary Great Translator Rinchen Zangpo during the Second Diffusion of the Buddhism. The monastery features nine temples, 23 chortens, and a series of meditation caves. Its most unique feature is the ''Main Temple'' (Tsuglhakhang), which houses 33 life-sized clay statues of the Vajradhatu Mandala and frescoes that represent the highest point of the Indo-Tibetan art. The Dalai Lama has expressed his desire to retire to Tabo, highlighting its supreme sanctity. It is a site where the highest level of artistic refinement and the most rugged high-altitude environment are perfectly unified.",
        "spiritualArchitecture": "The architecture of Tabo is a spectacular display of the mud-brick (adobe) style with a focus on the internal mural-decoration and the structural simplicity. The monastery features low, square buildings with massive walls that have withstood the earthquakes for over a thousand years. A unique feature is the absolute darkness of the inner chambers, which protects the ancient vegetable-dye frescoes. The architecture is designed to reflect the humility of the human spirit in the face of the vast mountain desert. The use of the natural earth tones and the intricate wood carvings create a sense of a spiritual home that is both grounded and celestial. The complex includes several small prayer rooms and a new monastery building for the modern community.",
        "vedicReferences": "Tabo is celebrated in the Tibetan Buddhist literature as the supreme site where the ''Vajradhatu'' (Diamond Realm) was personally manifested to protect the frontier Dharma.",
        "deepInsights": "The mud-walls represent the truth that the most durable treasures are often made of the simplest materials. Tabo teaches that the spirit must become like the clay—malleable yet resilient—to receive the truth.",
        "ancientLore": "Lore tells that the statues of the main temple were personally blessed by the celestial architects. Another legend says that the lights of the Tabo meditation caves can be seen by the realized souls at night, signaling the presence of the ancient protectors.",
        "keyRituals": [
                {
                        "name": "Tabo Mandala Meditation",
                        "description": "Meditating in the main temple surrounded by the 33 clay statues to seek the cosmic alignment."
                },
                {
                        "name": "Mud-Temple Parikrama",
                        "description": "Walking in silence around the thousand-year-old walls to seek the connection with the lineage."
                },
                {
                        "name": "Desert-Silence Observation",
                        "description": "Spending time in the surrounding high-altitude desert to experience the absolute stillness."
                },
                {
                        "name": "Ancient Text Recitation",
                        "description": "Listening to the chanting of the monks in the assembly hall to seek the intellectual and spiritual clarity."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Temple (Tsuglhakhang)",
                        "description": "The thousand-year-old mud heart of the monastery housing the Vajradhatu Mandala."
                },
                {
                        "name": "The Ancient Frescoes",
                        "description": "The world-famous murals that depict the lives of the Buddha and the various deities."
                },
                {
                        "name": "The Meditation Caves",
                        "description": "The natural rock dwellings on the hillside where the monks have meditated for centuries."
                },
                {
                        "name": "The Golden Stupa",
                        "description": "The unique sacred monument that marks the continuity of the ancient faith."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (the site is accessible but extremely cold during the winter).",
                "howToReach": "Reached via Shimla (400km) or Manali (250km) in the Spiti valley. Requires a multi-day journey through the high Himalayas.",
                "nearestAirport": "Bhuntar Airport / Chandigarh Airport.",
                "nearestRailway": "Shimla Narrow Gauge / Chandigarh."
        },
        "tips": [
                "Do not use flash photography inside the temples; the ancient frescoes are extremely sensitive to the light.",
                "Respect the absolute silence of the meditation areas; Tabo is a place of deep and continuous spiritual work.",
                "The altitude is significant; maintain a slow pace and stay hydrated to avoid altitude sickness."
        ],
        "faqs": [
                {
                        "question": "How old is Tabo?",
                        "answer": "It was founded in 996 AD, making it over 1025 years old."
                },
                {
                        "question": "Why is it called the Ajanta of the Himalayas?",
                        "answer": "Because of its incredible collection of ancient frescoes and sculptures that rival the beauty and the significance of the Ajanta caves."
                },
                {
                        "question": "Is it open in the winter?",
                        "answer": "Yes, but the road access is extremely limited and the temperatures drop to -30°C."
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
    'Ki Monastery', 
    'ki-monastery-spiti-fortress-on-the-ridge', 
    'Sacred Destination', 
    'hp', 
    'The "Fortress of the Spiti Spirit", Ki (Kee) Monastery is a magnificent hilltop complex at 4,166 meters. It is a site of absolute defensive authority and divine resonance, representing the absolute manifestation of the monastic resilience and the profound energy of the high Himalayan fortress-temples.', 
    '440.2', 
    '225.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Jewel of the Spiti Ridge and the Sanctuary of the High Snow Peaks', 
    'Ki Monastery | Himachal Pradesh, Buddhism & Ancient Lore', 
    'Experience the profound majesty of Ki Monastery. Discover the hilltop fortress-temple, the legend of the Gelugpa masters, and the profound energy of the high-Spiti pilgrimage.', 
    'Ki Monastery, Spiti Valley, Himachal Pradesh, Buddhism, Hindu Pilgrimage, Ancient Lore, Fortress Architecture, High Altitude', 
    '307', 
    '{
        "spiritualEssence": "Ki is the manifestation of the divine as the supreme resilience and the absolute power of the hilltop watch. The energy here is thin, luminous, and intensely alert. It is the site where the spirit of the dharma was protected from the marauders of the north. The vibration is one of ''Raksha'' (Protection) and the absolute connection to the sky. As a monastery that resembles a white castle perched on a conical hill, it represents the spiritual lighthouse of the upper Spiti. A visit here is believed to grant the devotee the absolute clarity of the purpose and the blessing of the divine resilience. The air is always vibrant with the scent of the juniper and the silent, heavy energy of the hundreds of the young monks in training.",
        "longDescription": "Ki Monastery (also spelled Key or Kee) is the largest and the most iconic monastery in the Spiti valley. It was founded in the 11th century and has survived numerous attacks by the Mongols and other invaders, each time being rebuilt into a larger and more complex structure. It features a unique collection of the thangkas, the ancient weapons, and the rare musical instruments like the long brass trumpets (Dungchen). The monastery is a center for the Gelugpa (Yellow Hat) sect and serves as a significant educational institution for the regional children. It is a site where the highest level of high-altitude communal living and the most intense monastic discipline are perfectly unified.",
        "spiritualArchitecture": "The architecture of Ki is a spectacular display of the fortress-monastery style with a focus on the multi-layered structures and the defensive positioning. The monastery features a series of white-washed buildings stacked one upon another, following the contour of the hill. A unique feature is the presence of the narrow, winding stairways and the small, thick-walled windows that protect the interior from the high-altitude winds. The architecture is designed to create a sense of a spiritual city that is both isolated and powerful. The use of the vibrant colors on the window frames and the simple white-wash of the walls create a sense of a spiritual home that is both rugged and celebratory. The complex includes several prayer halls, a large community kitchen, and a guest house for the pilgrims.",
        "vedicReferences": "Ki Monastery is celebrated in the Tibetan Buddhist literature as the supreme site where the ''Vajra-Protectors'' personally manifested to guard the transmission of the sacred texts.",
        "deepInsights": "The stacking of the buildings represents the truth that the spiritual life is a gradual ascent toward the light. Ki teaches that the spirit must become as solid as a rock to withstand the storms of the world.",
        "ancientLore": "Lore tells that the monastery was personally chosen by the celestial masters because its hill resembles the heart of the world. Another legend says that the music of the Ki trumpets can be heard in the celestial realms during the solstice, signaling the arrival of the light.",
        "keyRituals": [
                {
                        "name": "Ki Chanting Session",
                        "description": "Participating in the group prayer session to experience the powerful resonance of the hundreds of the voices."
                },
                {
                        "name": "Thangka Reflection",
                        "description": "Meditating while focusing on the ancient sacred scrolls to seek the divine visualization."
                },
                {
                        "name": "Ridge-Top Meditation (Ki)",
                        "description": "Sitting on the highest platform of the monastery to seek the absolute clarity of the sky."
                },
                {
                        "name": "Juniper-Smoke Offering",
                        "description": "Burning the sacred juniper to seek the purification of the environment and the mind."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Assembly Hall",
                        "description": "The spiritual heart of the monastery where the most important rituals are held."
                },
                {
                        "name": "The Ancient Thangka Gallery",
                        "description": "One of the most significant collections of the sacred Buddhist art in the Himalayas."
                },
                {
                        "name": "The Hilltop Viewpoint",
                        "description": "The spectacular vantage point offering a 360-degree view of the Spiti valley and the snow peaks."
                },
                {
                        "name": "The Dungchen Trumpets",
                        "description": "The unique long brass instruments that define the soundscape of the Ki rituals."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (the site is accessible but extremely isolated during the winter).",
                "howToReach": "12km from Kaza (the district headquarters of Spiti). Reached by road; regular taxis and buses run from Kaza.",
                "nearestAirport": "Bhuntar Airport / Chandigarh Airport.",
                "nearestRailway": "Shimla Narrow Gauge / Chandigarh."
        },
        "tips": [
                "Visit the monastery during the morning hours to witness the group chanting and the training of the young monks.",
                "Accept the invitation for the tea from the monks; it is a unique way to connect with the local culture and the hospitality.",
                "Respect the sensitive nature of the border area; follow all the local protocols regarding the photography and the movement."
        ],
        "faqs": [
                {
                        "question": "How high is Ki Monastery?",
                        "answer": "It is located at an altitude of approximately 4,166 meters (13,668 feet)."
                },
                {
                        "question": "Who founded it?",
                        "answer": "It was founded in the 11th century, traditionally associated with the disciples of the Great Translator Rinchen Zangpo."
                },
                {
                        "question": "Can we stay in the monastery?",
                        "answer": "The monastery offers simple accommodation in its guest house for the pilgrims and the visitors, though it is basic."
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
    'Dhankar Monastery', 
    'dhankar-monastery-spiti-hanging-monastery', 
    'Sacred Destination', 
    'hp', 
    'The "Hanging Monastery of the Spiti Valley", Dhankar is a magnificent cliff-top complex at 3,894 meters. It is a site of absolute structural authority and divine resonance, representing the absolute manifestation of the spirit perched on the edge of the world.', 
    '445.2', 
    '235.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Guardian of the Spiti-Pin Confluence and the Sanctuary of the Cliff-Top Silence', 
    'Dhankar Monastery | Himachal Pradesh, Buddhism & Ancient Lore', 
    'Experience the profound majesty of Dhankar. Discover the hanging monastery, the legend of the ancient Spiti kings, and the profound energy of the high-cliff pilgrimage.', 
    'Dhankar Monastery, Spiti Valley, Himachal Pradesh, Buddhism, Hindu Pilgrimage, Ancient Lore, Cliff Architecture, High Altitude', 
    '308', 
    '{
        "spiritualEssence": "Dhankar is the manifestation of the divine as the supreme precariousness and the absolute power of the edge-dwelling spirit. The energy here is thin, luminous, and intensely exhilarating. It is the site where the earth drops away to reveal the vastness of the space. The vibration is one of ''Akasha'' (Space) and the absolute connection to the void. As a monastery that seems to hang from the jagged limestone ridges, it represents the spiritual sentinel of the middle Spiti. A visit here is believed to grant the devotee the absolute removal of the fear of the fall and the blessing of the divine balance. The air is always vibrant with the scent of the dry mountain herbs and the silent, heavy energy of the thousand-year-old mud and the stone.",
        "longDescription": "Dhankar (meaning ''Fort on a Cliff'') was the ancient capital of the Spiti valley. The monastery was built in the 12th century and is famous for its location, perched on the edge of a 1000-foot drop to the confluence of the Spiti and Pin rivers. It features a unique collection of the ancient scriptures and a magnificent statue of the Vairochana (the Meditating Buddha). The monastery is architecturally fragile and has been listed as one of the most endangered monuments in the world. Above the monastery is the ancient Dhankar Fort, and a 2km trek leads to the beautiful high-altitude Dhankar Lake. It is a site where the highest level of dramatic Himalayan geography and the most ancient royal history are perfectly unified.",
        "spiritualArchitecture": "The architecture of Dhankar is a spectacular display of the cliff-integration style with a focus on the structural adaptation and the panoramic exposure. The monastery features a series of mud and stone buildings that follow the narrow ridges of the limestone cliffs. A unique feature is the presence of the cantilevered balconies and the narrow windows that look directly into the river abyss. The architecture is designed to create a sense of a spiritual home that is suspended between the earth and the sky. The use of the natural earth tones and the simple white-wash of the walls create a sense of a spiritual retreat that is both ancient and alert. The complex includes several prayer halls and the remains of the ancient royal palace.",
        "vedicReferences": "Dhankar Monastery is celebrated in the local oral epics as the supreme site where the ''Vajra-Throne'' was personally manifested to protect the junction of the sacred rivers.",
        "deepInsights": "The hanging buildings represent the truth that the spiritual life is a balance between the material earth and the celestial space. Dhankar teaches that the spirit must find its stability in the absolute center of the void.",
        "ancientLore": "Lore tells that the cliffs of Dhankar were personally shaped by the celestial guardians to provide a home for the Spiti kings. Another legend says that the water of the Dhankar Lake reflects the pure intention of the seeker during the full moon nights.",
        "keyRituals": [
                {
                        "name": "Vairochana Meditation",
                        "description": "Meditating before the statue of the Meditating Buddha to seek the inner clarity and the balance."
                },
                {
                        "name": "Cliff-Edge Reflection",
                        "description": "Sitting on the balconies of the monastery to seek the absolute perspective over the world."
                },
                {
                        "name": "Dhankar Lake Arghya",
                        "description": "Offering prayers at the high-altitude lake to seek the purification of the spirit."
                },
                {
                        "name": "Ancient Text Study (Dhankar)",
                        "description": "Reflecting on the unique collection of the scriptures in the monastery library."
                }
        ],
        "highlights": [
                {
                        "name": "The Hanging Monastery Complex",
                        "description": "The thousand-year-old cliff-top heart of the ancient Spiti capital."
                },
                {
                        "name": "The Vairochana Statue",
                        "description": "The beautiful and serene image of the Buddha that anchors the monastery prayer hall."
                },
                {
                        "name": "The Spiti-Pin Confluence View",
                        "description": "The spectacular vantage point from the monastery cliff looking down at the river meeting."
                },
                {
                        "name": "The Dhankar Lake",
                        "description": "The sacred high-altitude pool located a short trek above the monastery ridge."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (the site is accessible but extremely cold and isolated during the winter).",
                "howToReach": "25km from Kaza. Reached by road; regular taxis and buses run from Kaza and Tabo.",
                "nearestAirport": "Bhuntar Airport / Chandigarh Airport.",
                "nearestRailway": "Shimla Narrow Gauge / Chandigarh."
        },
        "tips": [
                "Be extremely careful when walking on the monastery platforms; the structure is fragile and the drops are significant.",
                "The trek to Dhankar Lake is steep but rewarding; carry water and start early to avoid the afternoon sun.",
                "Respect the absolute sanctity of the ancient prayer halls; maintain silence and do not touch the delicate murals."
        ],
        "faqs": [
                {
                        "question": "Why is it called the Hanging Monastery?",
                        "answer": "Because of its spectacular and precarious location perched on the edge of the high limestone cliffs."
                },
                {
                        "question": "Was it a capital city?",
                        "answer": "Yes, Dhankar was the traditional capital of the Spiti kings before it was moved to Kaza in the modern era."
                },
                {
                        "question": "Is it endangered?",
                        "answer": "Yes, due to its fragile mud and stone structure and its location on the eroding cliffs, it is considered one of the most at-risk heritage sites."
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
    'Gaumukh', 
    'gaumukh-source-of-ganga-glacier', 
    'Sacred Destination', 
    'uk', 
    'The "Mouth of the Cow", Gaumukh is the physical source of the Bhagirathi (Ganga) river. It is a site of absolute elemental authority and divine emergence at 3,892 meters, representing the absolute manifestation of the life-giving flow and the profound energy of the high Himalayan ice.', 
    '440.2', 
    '180.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Source of the Sacred Flow and the Sanctuary of the Eternal Ice', 
    'Gaumukh | Uttarakhand, Ganga Source & Ancient Lore', 
    'Experience the profound majesty of Gaumukh. Discover the Gangotri glacier snout, the legend of Bhagiratha''s penance, and the profound energy of the high Himalayan pilgrimage.', 
    'Gaumukh, Uttarakhand, Ganga, Bhagirathi, Source, Gangotri Glacier, Hindu Pilgrimage, Ancient Lore, High Altitude', 
    '309', 
    '{
        "spiritualEssence": "Gaumukh is the manifestation of the divine as the supreme emergence and the absolute power of the primordial purity. The energy here is freezing, luminous, and intensely resonant. It is the site where the sky-water touches the earth for the first time in its liquid form. The vibration is one of ''Janma'' (Birth) and the absolute connection to the celestial realms. As a massive ice cave shaped like the snout of a cow at the base of the Bhagirathi peaks, it represents the spiritual womb of the Indian civilization. A visit here is believed to grant the devotee the absolute purification of the karmas and the blessing of the eternal flow. The air is always vibrant with the scent of the crushed rock and the constant, rhythmic sound of the massive ice blocks crashing into the turquoise waters of the Bhagirathi.",
        "longDescription": "Gaumukh is located 18km uphill from Gangotri. It is one of the most sacred spots in the Hindu geography. According to the Puranas, the river Ganga descended from the locks of Shiva at this spot after the intense penance of King Bhagiratha. The site is a favorite for the serious seekers, yogis, and mountaineers. The snout of the glacier has been receding over the decades, making it a powerful symbol of the environmental and spiritual change. The trek passes through the beautiful Chirbasa and Bhojbasa, offering spectacular views of the Shivling and Bhagirathi peaks. Gaumukh is a site where the highest level of geological power and the most ancient Vedic mythology are perfectly unified in a single, freezing moment.",
        "spiritualArchitecture": "The architecture of Gaumukh is a spectacular display of the raw, uncarved majesty of the nature. The \"temple\" is the ice cave itself, featuring a series of blue-tinted ice walls and natural stone arches. A unique feature is the presence of the massive boulders that have been carried by the glacier for centuries, serving as natural altars for the pilgrims. The \"architecture\" is designed to humble the human spirit through its scale and its absolute indifference to the human time. The use of the brilliant white snow and the deep blue of the ice create a sense of a spiritual palace that is not built by hands but by the breath of the divine. The site includes several temporary stone shelters built by the meditating sadhus.",
        "vedicReferences": "Gaumukh is celebrated in the Skanda Purana and the Mahabharata as the supreme site where the ''Akash-Ganga'' (the celestial Ganga) personally anchored its power to the world.",
        "deepInsights": "The emergence of the river from the ice represents the truth that the highest wisdom is a continuous flow from the stillness. Gaumukh teaches that the spirit must remain as pure and as persistent as the mountain stream.",
        "ancientLore": "Lore tells that the snout of the glacier was personally shaped by the Nandi to provide a safe passage for the Mother Ganga. Another legend says that the water of the Gaumukh is the physical form of the nectar (Amrit) that spilled during the cosmic churning.",
        "keyRituals": [
                {
                        "name": "Bhagirathi Source Snanam",
                        "description": "Taking a quick, freezing dip in the waters at the snout to seek the absolute spiritual purification."
                },
                {
                        "name": "Glacier-Ice Offering",
                        "description": "Offering a piece of the sacred ice back to the river to seek the balance of the elements."
                },
                {
                        "name": "Bhagiratha Penance Meditation",
                        "description": "Sitting in silence facing the glacier to reflect on the power of the singular focus and the sacrifice."
                },
                {
                        "name": "Frontier Arghya",
                        "description": "Offering sacred water to the sun from the base of the Bhagirathi peaks to seek the divine protection."
                }
        ],
        "highlights": [
                {
                        "name": "The Glacier Snout",
                        "description": "The massive ice cave from where the river Bhagirathi emerges."
                },
                {
                        "name": "Bhagirathi Peaks",
                        "description": "The spectacular trinity of mountain peaks that frame the source of the Ganga."
                },
                {
                        "name": "Bhojbasa",
                        "description": "The peaceful base camp known for its ancient birch (Bhojpatra) trees, used for writing the ancient scriptures."
                },
                {
                        "name": "Shivling Peak View",
                        "description": "The stunning view of the iconic Shivling peak, often called the ''Matterhorn of the East''."
                }
        ],
        "travelInfo": {
                "bestTime": "May to June and September to October (the trek is inaccessible during the heavy winters).",
                "howToReach": "Reached by an 18km trek from Gangotri. Requires a specialized forest permit (limited numbers per day).",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Ensure you are medically fit for high-altitude trekking; the oxygen levels are lower and the terrain is rugged.",
                "Carry all your waste back with you; the Gaumukh area is an extremely sensitive ecological zone.",
                "The glacier is constantly moving; do not attempt to walk on the ice without professional equipment and guidance."
        ],
        "faqs": [
                {
                        "question": "How long is the trek?",
                        "answer": "The trek is 18km one way from Gangotri, usually done over two days with a stay at Bhojbasa."
                },
                {
                        "question": "Do I need a permit?",
                        "answer": "Yes, a permit from the Uttarkashi forest department is mandatory for entering the Gangotri National Park."
                },
                {
                        "question": "Is it the actual source?",
                        "answer": "Yes, Gaumukh is the physical snout of the Gangotri glacier and the primary source of the Bhagirathi river."
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
    'Tapovan', 
    'tapovan-meditation-ground-above-gaumukh', 
    'Sacred Destination', 
    'uk', 
    'The "High Meadow of the Sages", Tapovan is a spectacular alpine meadow located above the Gaumukh glacier at 4,463 meters. It is a site of absolute yogic authority and divine silence, representing the absolute manifestation of the high Himalayan meditation and the profound energy of the Shivling peak.', 
    '445.2', 
    '175.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Silent Sages and the Footstool of the Shivling Peak', 
    'Tapovan High Meadow | Uttarakhand, Yoga & Ancient Lore', 
    'Experience the profound energy of Tapovan. Discover the high-altitude meditation ground, the legend of the silent yogis, and the profound energy of the high Himalayan pilgrimage.', 
    'Tapovan, Uttarakhand, Yoga, Meditation, Gaumukh, Shivling Peak, Hindu Pilgrimage, Ancient Lore, High Altitude', 
    '310', 
    '{
        "spiritualEssence": "Tapovan is the manifestation of the divine as the supreme stillness and the absolute power of the high-altitude penance. The energy here is thin, luminous, and intensely resonant. It is the site where the earth touches the sky in a field of wild-flowers and snow. The vibration is one of ''Tapa'' (Penance) and the absolute connection to the celestial silence. As a meadow perched at the base of the iconic Shivling peak, it represents the spiritual heart of the higher Garhwal. A visit here is believed to grant the devotee the absolute removal of the mental fluctuations and the blessing of the profound inner peace. The air is always vibrant with the scent of the alpine herbs and the silent, heavy energy of the eternal snow peaks.",
        "longDescription": "Tapovan (literally ''the forest of penance'') is one of the most significant sites for high-altitude yoga and meditation. It is accessible via a steep and challenging climb from the Gaumukh glacier. The meadow is famous for its incredible views of the Shivling, the Meru, and the Bhagirathi peaks. It is the residence of several high-altitude yogis who live in simple stone caves (gufas) even during the harsh winters. Legend tells that the great sages of the Vedas personally chose this spot to perform the rituals for the benefit of the humanity. Tapovan is a site where the highest level of mountaineering challenge and the most intense spiritual discipline are perfectly unified.",
        "spiritualArchitecture": "The architecture of Tapovan is a spectacular display of the raw, uncarved majesty of the high Himalayas. The \"temple\" is the meadow itself, featuring a series of natural rock formations and high-altitude streams. A unique feature is the presence of the small stone cairns and the simple cave dwellings used by the meditating sadhus. The \"architecture\" is designed to humble the human spirit through its scale and its absolute isolation. The use of the emerald green grass against the white snow and the deep blue sky creates a sense of a spiritual palace that is not built by hands. The site includes several sacred water pools formed by the melting glaciers.",
        "vedicReferences": "Tapovan is celebrated in the ancient texts as the supreme site where the ''Rishis'' (Sages) personally received the vibrations of the Vedas from the celestial sounds.",
        "deepInsights": "The high meadow represents the truth that the highest realization is found above the noise of the world. Tapovan teaches that the spirit must rise to the highest point to find the true stillness.",
        "ancientLore": "Lore tells that the Shivling peak personally protects the Tapovan meadow from the fierce mountain storms. Another legend says that the wild-flowers of Tapovan are the transformed souls of the ancient seekers who attained liberation here.",
        "keyRituals": [
                {
                        "name": "Shivling Dhyana",
                        "description": "Sitting in the silence of the meadow while focusing on the form of the Shivling peak to seek the spiritual alignment."
                },
                {
                        "name": "Glacier-Water Arghya (Tapovan)",
                        "description": "Offering sacred water from the alpine streams to the sun to seek the purification of the mind."
                },
                {
                        "name": "Sage-Blessing Visit",
                        "description": "Paying respects to the resident yogis in their cave dwellings to seek the guidance and the inspiration."
                },
                {
                        "name": "Himalayan Silence Vow",
                        "description": "Taking a vow of silence for the duration of the stay in Tapovan to seek the inner depth."
                }
        ],
        "highlights": [
                {
                        "name": "The Shivling Peak View",
                        "description": "The stunning and direct perspective of one of the most sacred peaks in the world."
                },
                {
                        "name": "The Alpine Flower Meadows",
                        "description": "The spectacular natural gardens that bloom in the high Himalayan summer."
                },
                {
                        "name": "The Sadhu Gufas",
                        "description": "The simple stone caves that have been the home of the meditating sages for centuries."
                },
                {
                        "name": "The Meru Peak View",
                        "description": "The spectacular vantage point offering views of the Meru peak, the mythological center of the universe."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (the meadow is inaccessible during the heavy winters).",
                "howToReach": "Reached by a steep 4km climb from Gaumukh (which is 18km from Gangotri). Requires professional guidance and a specialized permit.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Acclimatize properly at Bhojbasa or Gaumukh before attempting the climb to Tapovan; the altitude is significant.",
                "The path from Gaumukh involves crossing the moving glacier; use professional guides and be extremely careful.",
                "Respect the privacy of the meditating sadhus; do not disturb them or enter their caves without permission."
        ],
        "faqs": [
                {
                        "question": "How high is Tapovan?",
                        "answer": "It is located at an altitude of approximately 4,463 meters (14,640 feet)."
                },
                {
                        "question": "Can I stay overnight?",
                        "answer": "Yes, but it requires camping equipment; there are no permanent guest houses or hotels in the meadow."
                },
                {
                        "question": "Who lives there?",
                        "answer": "Several high-altitude yogis and sadhus live in Tapovan, some of whom stay throughout the year in the stone caves."
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