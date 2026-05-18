-- GOLD STANDARD PART 6 for Spritual_locations
INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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