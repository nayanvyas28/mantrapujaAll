-- RESTORATION PART 3
INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Siddhpur (Matru Gaya)', 
    'siddhpur-matru-gaya', 
    'Sacred Destination', 
    'gj', 
    'The only site in the world dedicated to the Shraddha (ancestral rites) of the mother, Siddhpur is known as the Matru Gaya of India. Located on the banks of the Saraswati river in Gujarat, it is a site of absolute filial gratitude and ancient Vedic authority where the sage Kapila is believed to have performed rites for his mother.', 
    '260.2', 
    '360.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The City of the Sage Kapila and the Supreme Altar of the Mother', 
    'Siddhpur Matru Gaya | Gujarat, Kapila & Ancient Lore', 
    'Experience the profound gratitude of Siddhpur. Discover the only Matru Gaya, the legend of the Bindu Sarovar, and the profound energy of the ancestral pilgrimage.', 
    'Siddhpur, Gujarat, Matru Gaya, Bindu Sarovar, Kapila, Hindu Pilgrimage, Ancient Lore, Ancestors', 
    '179', 
    '{
        "spiritualEssence": "Siddhpur is the manifestation of the divine as the supreme gratitude and the absolute sanctity of the maternal lineage. The energy here is solemn, peaceful, and intensely Vedic. It is the site where the debt to the mother is acknowledged and cleared. The vibration is one of ''Matru-Devo-Bhava'' (The Mother is God) and the absolute continuity of the sacred memory. As a town of ancient havelis and sacred ghats on the Saraswati, it represents the spiritual depth of the North Gujarat landscape. A visit here is believed to grant the devotee the absolute peace of the ancestors and the blessing of the maternal line. The air is always vibrant with the scent of the dry river sand and the silent, heavy energy of the Vedic chants.",
        "longDescription": "Siddhpur is situated in the Patan district of Gujarat. It is mentioned in the Rigveda as a highly sacred town. The central point is the Bindu Sarovar, a sacred lake where Lord Vishnu is believed to have shed a tear of joy. It was here that the sage Kapila (the founder of Samkhya philosophy) performed the funeral rites for his mother Devahuti, thus establishing the tradition of Matru Gaya. Just as Gaya is for the father, Siddhpur is for the mother. The town is also famous for the Rudra Mahalaya temple ruins, once a massive complex dedicated to Shiva. Siddhpur is a rare site where the highest philosophy of the mind (Samkhya) and the most basic human emotion (gratitude to the mother) are unified in a single ritual landscape.",
        "spiritualArchitecture": "The architecture of Siddhpur is a spectacular display of the Solanki and later Maratha styles, combined with the unique European-inspired havelis of the Bohra community. The Bindu Sarovar complex features several small shrines and ghats designed for the performance of the rituals. The Rudra Mahalaya ruins, though fragmented, show the grand scale of the original Solanki architecture with its massive pillars and intricate stone carvings. A unique feature of the town is its narrow streets lined with colorful, multi-storied havelis featuring wooden carvings and neoclassical facades. The architecture is designed to lead the pilgrim from the vibrant life of the town to the silent, reflective waters of the Sarovar.",
        "vedicReferences": "Siddhpur is celebrated in the Rigveda and the Srimad Bhagavata as the supreme site where the sage Kapila enlightened his mother with the knowledge of the soul.",
        "deepInsights": "The performance of Matru Gaya represents the truth that the spiritual journey is incomplete without the acknowledgment of the biological and spiritual source. Siddhpur teaches that the mother is the first and highest teacher.",
        "ancientLore": "Lore tells that the Saraswati river flows underground here to maintain its purity for the sacred rites. Another legend says that the Bindu Sarovar was formed by the tears of Lord Vishnu himself, moved by the devotion of the sage Kardama.",
        "keyRituals": [
                {
                        "name": "Matru Gaya Shraddha",
                        "description": "The unique ritual of performing ancestral rites for the mother, usually performed during the month of Kartik."
                },
                {
                        "name": "Bindu Sarovar Tarpan",
                        "description": "Offering sacred water to the ancestors in the holy lake to ensure their peaceful transition."
                },
                {
                        "name": "Kapila Muni Pujan",
                        "description": "Praying at the shrine of the sage Kapila to seek the wisdom of the Samkhya philosophy."
                },
                {
                        "name": "Kartik Purnima Fair",
                        "description": "The massive annual gathering where thousands of pilgrims perform rites and take a holy dip in the Sarovar."
                }
        ],
        "highlights": [
                {
                        "name": "Bindu Sarovar",
                        "description": "The sacred lake that is the spiritual heart of the Matru Gaya ritual."
                },
                {
                        "name": "Rudra Mahalaya Ruins",
                        "description": "The remains of a massive 12th-century Shiva temple once considered the pride of Gujarat."
                },
                {
                        "name": "Kapila Ashram",
                        "description": "The site where the sage Kapila is believed to have lived and taught."
                },
                {
                        "name": "The Bohra Havelis",
                        "description": "The stunningly colorful and architecturally unique residential quarters of the town."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during the month of Kartik).",
                "howToReach": "Well connected by road and rail from Ahmedabad (115km). Regular buses and trains run from Ahmedabad and Mehsana.",
                "nearestAirport": "Sardar Vallabhbhai Patel International Airport, Ahmedabad.",
                "nearestRailway": "Siddhpur Railway Station."
        },
        "tips": [
                "If performing the Matru Gaya rites, hire a local Panda (priest) who is familiar with the specific Siddhpur traditions.",
                "Take the time to walk through the streets of the old town to see the incredible havelis; the architecture is unlike anywhere else in India.",
                "Maintain a solemn and respectful attitude near the Bindu Sarovar, as many pilgrims are there for serious ancestral rituals."
        ],
        "faqs": [
                {
                        "question": "Is it the only Matru Gaya?",
                        "answer": "Yes, Siddhpur is considered the only site in the world specifically for the Shraddha of the mother."
                },
                {
                        "question": "Who was Kapila Muni?",
                        "answer": "He was an ancient sage and the founder of the Samkhya school of philosophy, one of the six systems of Indian philosophy."
                },
                {
                        "question": "Can I perform rites for my father here?",
                        "answer": "While Gaya is preferred for the father, many pilgrims perform combined rites at Siddhpur, though its primary specialty remains the mother."
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
    'Lalitgiri', 
    'lalitgiri', 
    'Sacred Destination', 
    'od', 
    'The oldest Buddhist site in Odisha, Lalitgiri is a cornerstone of the Diamond Triangle. Dating back to the 1st century BCE, it is a site of absolute archaeological and spiritual significance, famous for its massive stupa and the discovery of sacred bone relics believed to be of the Buddha himself.', 
    '750.2', 
    '440.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mountain of the Red Earth and the Cradle of the Kalinga Dharma', 
    'Lalitgiri Buddhist Site | Odisha, Relics & Ancient Lore', 
    'Experience the profound history of Lalitgiri. Discover the sacred relics, the ancient Mahastupa, and the profound energy of the Buddhist pilgrimage.', 
    'Lalitgiri, Odisha, Buddhist, Diamond Triangle, Relics, Hindu Pilgrimage, Ancient Lore, Monastery', 
    '180', 
    '{
        "spiritualEssence": "Lalitgiri is the manifestation of the divine as the supreme antiquity and the absolute preservation of the sacred essence. The energy here is quiet, earthy, and intensely grounded. It is the site where the Dharma first took root in the red soil of Kalinga. The vibration is one of ''Shanti'' (Peace) and the absolute continuity of the sacred presence. As a landscape of ancient brick ruins and panoramic hill views, it represents the spiritual foundation of the region. A visit here is believed to grant the devotee the sense of the indestructible nature of the truth and the blessing of the Buddha''s physical essence. The air is always vibrant with the scent of the rain-washed brick and the silent, heavy energy of the 2,000-year-old stupa.",
        "longDescription": "Lalitgiri (Red Hill) is the oldest among the Diamond Triangle sites, with its origins reaching back to the 2nd century BCE. The site rose to global prominence in 1985 when three stone caskets were discovered inside the Mahastupa, containing charred bone relics wrapped in gold and silver foil—believed to be the sacred remains of the Buddha. The monastery complex features several viharas, a massive apsidal temple (Chaitya), and a museum housing exquisite Gandhara-influenced sculptures. Lalitgiri remained a vibrant center for both Mahayana and Vajrayana Buddhism for over a thousand years, acting as a spiritual beacon for the maritime travelers of ancient India.",
        "spiritualArchitecture": "The architecture of Lalitgiri is a spectacular display of the early Buddhist structural style. It features a massive brick Mahastupa built on a hill-top, which serves as the spiritual axis of the complex. A unique feature is the apsidal Chaitya-griha, a circular brick temple with a stupa at the center, which is one of the few surviving examples of its kind in India. The monastery ruins show a sophisticated layout of cells and courtyards, designed for the maximum flow of air and light. The architecture is designed to lead the pilgrim from the base of the hill to the expansive, sky-facing stupa at the summit. The use of precisely baked red bricks and the integration with the natural hill contours create a sense of a spiritual city that is both organic and divine.",
        "vedicReferences": "Lalitgiri is celebrated in the archaeological and spiritual context as the site that provided the first physical proof of the Buddha''s presence in the Kalinga region.",
        "deepInsights": "The discovery of the bone relics represents the truth that the physical presence of the teacher remains as a source of energy long after the life is over. Lalitgiri teaches that the most ancient foundations are the most stable.",
        "ancientLore": "Lore tells that the hill of Lalitgiri was personally chosen by the celestial beings to hide the sacred relics during times of spiritual decline. Another legend says that the water from the ancient wells on the hill can grant the seeker the memory of their past lives.",
        "keyRituals": [
                {
                        "name": "Relic Stupa Pradakshina",
                        "description": "The ritual of circumambulating the Mahastupa where the sacred bone relics were originally found."
                },
                {
                        "name": "Chaitya Meditation",
                        "description": "Sitting inside the ancient apsidal temple to connect with the early monastic silence of the 1st century BCE."
                },
                {
                        "name": "Sculpture Contemplation",
                        "description": "Meditating on the exquisite Buddha statues in the museum to understand the evolution of the divine form."
                },
                {
                        "name": "Hill-Top Silence",
                        "description": "The ritual of absolute silence while looking over the Assia valley to experience the peace of the masters."
                }
        ],
        "highlights": [
                {
                        "name": "The Mahastupa",
                        "description": "The massive circular brick stupa that once housed the sacred bone relics."
                },
                {
                        "name": "The Apsidal Chaitya",
                        "description": "A rare and beautiful circular brick temple ruins at the heart of the site."
                },
                {
                        "name": "The Relic Museum",
                        "description": "The modern museum housing the sacred stone caskets and the exquisite carvings found at the site."
                },
                {
                        "name": "The Monastic Cells",
                        "description": "The well-preserved ruins of the ancient residential quarters for the Buddhist monks."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "90km from Bhubaneswar and 60km from Cuttack. Well connected by road; regular taxis and buses run from Cuttack.",
                "nearestAirport": "Biju Patnaik International Airport, Bhubaneswar.",
                "nearestRailway": "Cuttack Railway Station / Jajpur Keonjhar Road."
        },
        "tips": [
                "Visit the museum first to see the relics and the sculptures before exploring the outdoor ruins.",
                "The climb to the Mahastupa is gentle; take your time to enjoy the views of the surrounding hills.",
                "Combine your visit with Ratnagiri and Udayagiri to complete the full Diamond Triangle circuit in a single day."
        ],
        "faqs": [
                {
                        "question": "Are the relics still there?",
                        "answer": "The bone relics are kept in high security; the stone caskets in which they were found are displayed in the Lalitgiri museum."
                },
                {
                        "question": "How old is Lalitgiri?",
                        "answer": "It is the oldest Buddhist site in Odisha, with its roots going back to the 2nd century BCE."
                },
                {
                        "question": "What is the Diamond Triangle?",
                        "answer": "It refers to the trio of major Buddhist sites in Odisha: Lalitgiri, Ratnagiri, and Udayagiri."
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
    'Sankassa', 
    'sankassa', 
    'Sacred Destination', 
    'up', 
    'The site where the Buddha is believed to have descended from the Tushita Heaven after teaching the Abhidharma to his mother, Sankassa is one of the eight major Buddhist pilgrimage sites. Located in the Farrukhabad district of Uttar Pradesh, it is a site of absolute celestial connection and cosmic authority.', 
    '520.5', 
    '380.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Site of the Celestial Descent and the Ashokan Elephant', 
    'Sankassa Buddhist Site | Uttar Pradesh, Buddha & Ancient Lore', 
    'Experience the profound gravity of Sankassa. Discover the site of the heavenly descent, the Ashokan elephant capital, and the profound energy of the Buddhist pilgrimage.', 
    'Sankassa, Uttar Pradesh, Buddhist, Tushita Heaven, Buddha, Hindu Pilgrimage, Ancient Lore, Elephant', 
    '181', 
    '{
        "spiritualEssence": "Sankassa is the manifestation of the divine as the supreme bridge and the absolute return of the enlightened one to the physical world. The energy here is rare, vertical, and intensely cosmic. It is the site where the heavens and the earth were unified by a golden ladder. The vibration is one of ''Devavatara'' (Divine Descent) and the absolute authority of the Abhidharma. As a quiet village landscape dominated by an ancient stupa mound, it represents the spiritual anchor of the celestial Dharma. A visit here is believed to grant the devotee the connection to the higher realms and the blessing of the divine mother in the heavens. The air is always vibrant with the scent of the dry earth and the silent, heavy energy of the Ashokan stone.",
        "longDescription": "Sankassa (modern Sankisa) is a historic site where the Buddha is said to have descended to earth accompanied by the gods Indra and Brahma. He had spent three months in the Tushita Heaven teaching the higher philosophy (Abhidharma) to his mother Maya Devi. The descent took place on a triple ladder made of gold, silver, and jewels. The Emperor Ashoka later visited the site and installed a massive pillar topped with a spectacular elephant capital, which still remains at the site. Sankassa is unique because it is the only site of the eight major pilgrimages that is not associated with a life event but with a miraculous cosmic movement. Today, the site is a large mound (Bisari Devi) covering the ancient ruins, standing as a testament to the intersection of the human and the divine.",
        "spiritualArchitecture": "The architecture of Sankassa is a display of the ancient Mauryan and later archaeological layers. The central feature is the massive stupa mound, which remains mostly unexcavated, giving it the appearance of a natural hill. A unique feature is the elephant capital of the Ashokan pillar, which is housed in a small protective structure; it is considered one of the finest examples of Mauryan stone carving. The site includes a modern temple dedicated to Bisari Devi, which sits atop the ancient ruins, representing the layering of Hindu and Buddhist traditions. The architecture is defined by its isolation and the vast, open horizon of the Uttar Pradesh plains, creating a sense of a spiritual outpost at the edge of the world.",
        "vedicReferences": "Sankassa is celebrated in the Buddhist scriptures as the site that proves the Buddha''s authority over both the human and the celestial realms.",
        "deepInsights": "The descent from heaven represents the truth that the highest wisdom must be brought back to the earth for the benefit of all beings. Sankassa teaches that the bridge between the human and the divine is the realized mind.",
        "ancientLore": "Lore tells that the triple ladder used by the Buddha disappeared into the ground, and only a small portion remained visible for centuries as a sign for the faithful. Another legend says that the site is also the birthplace of the 13th Jain Tirthankara, Lord Vimalanatha.",
        "keyRituals": [
                {
                        "name": "Sankassa Dhamma Yatra",
                        "description": "The annual pilgrimage to the site to celebrate the anniversary of the Buddha''s descent from heaven."
                },
                {
                        "name": "Elephant Capital Puja",
                        "description": "Offering prayers and flowers at the Ashokan elephant, a symbol of royal protection of the Dharma."
                },
                {
                        "name": "Bisari Devi Ritual",
                        "description": "The local tradition of worshipping the Goddess who is believed to protect the ancient ruins."
                },
                {
                        "name": "Abhidharma Chanting",
                        "description": "The ritual recitation of the higher philosophy that the Buddha taught in heaven before his descent."
                }
        ],
        "highlights": [
                {
                        "name": "The Ashokan Elephant",
                        "description": "The stunningly detailed stone elephant capital from the 3rd century BCE."
                },
                {
                        "name": "The Bisari Devi Mound",
                        "description": "The massive ancient stupa mound that dominates the local landscape."
                },
                {
                        "name": "The Marker of Descent",
                        "description": "The exact spot identified by tradition where the Buddha''s feet first touched the earth."
                },
                {
                        "name": "Sankissa Village",
                        "description": "The quiet, rural setting that has preserved the spiritual isolation of the site for centuries."
                }
        ],
        "travelInfo": {
                "bestTime": "November to February.",
                "howToReach": "Well connected by road from Agra (170km) and Kanpur (160km). The nearest town is Pakhna (12km).",
                "nearestAirport": "Agra Airport / Kanpur Airport / Lucknow International Airport.",
                "nearestRailway": "Pakhna Railway Station / Farrukhabad Junction."
        },
        "tips": [
                "Sankassa is very rural and has limited tourist facilities; it is best visited as a day trip from Agra or Kanpur.",
                "Respect the local village traditions; the site is part of the daily life of the local community.",
                "The site is particularly important to the modern Buddhist movement in India; visit during a festival to see the vibrant contemporary devotion."
        ],
        "faqs": [
                {
                        "question": "What happened at Sankassa?",
                        "answer": "According to tradition, this is where Buddha returned to earth after spending three months teaching in the Tushita Heaven."
                },
                {
                        "question": "What is the Tushita Heaven?",
                        "answer": "It is one of the six celestial realms in Buddhist cosmology where bodhisattvas reside before their final birth."
                },
                {
                        "question": "Where is the Ashokan Pillar?",
                        "answer": "The pillar itself is fragmented, but the spectacular elephant capital is preserved at the site under a canopy."
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
    'Dhauli (Shanti Stupa)', 
    'dhauli-shanti-stupa', 
    'Sacred Destination', 
    'od', 
    'The site of the world-changing transformation of Emperor Ashoka, Dhauli is where the fierce warrior became the messenger of peace. Located on the banks of the Daya river near Bhubaneswar, it is a site of absolute historical gravity and spiritual stillness, featuring the first rock edicts of Ashoka and a spectacular modern Peace Pagoda.', 
    '740.5', 
    '440.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hill of Peace and the Transformation of the Great Emperor', 
    'Dhauli Shanti Stupa | Odisha, Ashoka & Ancient Lore', 
    'Experience the profound stillness of Dhauli. Discover the site of the Kalinga War, the Ashokan rock edicts, and the profound energy of the peace pilgrimage.', 
    'Dhauli, Odisha, Shanti Stupa, Ashoka, Kalinga War, Buddhist, Hindu Pilgrimage, Ancient Lore, Peace', 
    '182', 
    '{
        "spiritualEssence": "Dhauli is the manifestation of the divine as the supreme transformation and the absolute victory of peace over power. The energy here is heavy, reflective, and intensely silent. It is the site where the blood of war was washed away by the water of the Dharma. The vibration is one of ''Ahimsa'' (Non-violence) and the absolute remorse of the soul. As a hill overlooking the Daya river, it represents the spiritual turning point of Asian history. A visit here is believed to grant the devotee the power to transform their own inner conflicts and the blessing of a peaceful mind. The air is always vibrant with the scent of the river mist and the silent, heavy energy of the 2,200-year-old stone edicts.",
        "longDescription": "Dhauli Hill is believed to be the site where the bloody Kalinga War was fought in 261 BCE. Witnessing the horrific carnage, Emperor Ashoka was struck with deep remorse and embraced Buddhism, vowing to conquer only through the Dharma (Dharma-Vijaya). The site features the famous Ashokan Rock Edicts, including the one with the carved elephant head, which is the oldest stone sculpture in Odisha. At the summit stands the Dhauli Shanti Stupa (Peace Pagoda), built in 1972 by the Japan Buddha Sangha. The hill also houses the ancient Dhavaleswar Shiva temple, representing the continuity of the local spiritual culture. Dhauli is a site where the history of an empire and the history of a soul are perfectly unified in a landscape of stone and peace.",
        "spiritualArchitecture": "The architecture of Dhauli is a spectacular display of both ancient Mauryan stone-work and modern Japanese Buddhist styles. The Ashokan edicts are carved into a massive rock at the foot of the hill, surmounted by a beautifully simple elephant head. The Shanti Stupa at the peak is a massive white dome featuring five umbrellas (chhatris) and spectacular relief carvings of the life of the Buddha and the transformation of Ashoka. A unique feature is the use of white-washed concrete and the four large Buddha statues facing the four cardinal directions. The architecture is designed to lead the pilgrim from the hard, historical reality of the edicts to the expansive, celestial peace of the summit. The wide platforms and the panoramic views of the Daya river are integral to the meditative experience.",
        "vedicReferences": "Dhauli is celebrated in the historical and spiritual context as the site that marks the birth of the ''Dharma-Rajya'' (The Kingdom of Righteousness) in India.",
        "deepInsights": "The carved elephant head represents the Buddha coming out of the mountain to bless the world. Dhauli teaches that the greatest strength is the courage to admit one''s errors and choose the path of peace.",
        "ancientLore": "Lore tells that the waters of the Daya river turned red with the blood of the Kalinga warriors, and it was this sight that broke the heart of Ashoka. Another legend says that the hill is an eternal guardian of the spirits of the fallen, now pacified by the sound of the Buddhist bells.",
        "keyRituals": [
                {
                        "name": "Peace Meditation (Shanti Stupa)",
                        "description": "Sitting on the high platforms of the stupa at dawn to meditate on the concept of universal peace."
                },
                {
                        "name": "Edict Reading",
                        "description": "The ritual of visiting the Ashokan edicts to reflect on the laws of compassion and righteousness."
                },
                {
                        "name": "Dhavaleswar Temple Puja",
                        "description": "Praying at the ancient Shiva temple to honor the local deity of the hill."
                },
                {
                        "name": "Lighting of the Peace Lamps",
                        "description": "The ritual of lighting hundreds of lamps at the stupa during the annual Dhauli-Kalinga Mahotsav."
                }
        ],
        "highlights": [
                {
                        "name": "The Ashokan Rock Edicts",
                        "description": "The 3rd-century BCE inscriptions that contain the emperor''s message of non-violence."
                },
                {
                        "name": "The Carved Elephant",
                        "description": "The oldest stone sculpture in Odisha, symbolizing the presence of the Buddha."
                },
                {
                        "name": "The Shanti Stupa",
                        "description": "The magnificent white Japanese Peace Pagoda at the summit of the hill."
                },
                {
                        "name": "The Daya River View",
                        "description": "The panoramic perspective of the historic battlefield from the hill-top."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "10km from Bhubaneswar city center. Well connected by road; regular buses and taxis run from the city.",
                "nearestAirport": "Biju Patnaik International Airport, Bhubaneswar.",
                "nearestRailway": "Bhubaneswar Railway Station."
        },
        "tips": [
                "Visit in the late afternoon to see the sunset from the stupa and stay for the light and sound show that explains the history of Ashoka.",
                "The climb to the stupa is not very steep, but comfortable walking shoes are recommended.",
                "Combine your visit with the nearby 64 Yogini temple at Hirapur for a full day of spiritual exploration."
        ],
        "faqs": [
                {
                        "question": "What happened at the Daya river?",
                        "answer": "The river was the site of the Kalinga War, the bloodiest battle in Indian history, which led to Ashoka''s conversion to Buddhism."
                },
                {
                        "question": "Who built the Shanti Stupa?",
                        "answer": "It was built in 1972 as a collaborative project between the Japan Buddha Sangha and the Government of Odisha."
                },
                {
                        "question": "What is written on the rock edicts?",
                        "answer": "They contain Ashoka''s decrees on morality, non-violence, and the proper treatment of all living beings."
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
    'Ratnagiri (Odisha)', 
    'ratnagiri-odisha', 
    'Sacred Destination', 
    'od', 
    'One of the most important Buddhist monastic sites in India, Ratnagiri is the crown of the ''Diamond Triangle''. Located in the Assia hills of Odisha, it is a site of absolute tantric brilliance and artistic perfection, famous for its magnificent monastery gateway and thousands of votive stupas.', 
    '760.2', 
    '430.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hill of Jewels and the Center of Vajrayana Wisdom', 
    'Ratnagiri Buddhist Site | Odisha, Vajrayana & Ancient Lore', 
    'Experience the profound majesty of Ratnagiri. Discover the most beautiful monastery gateway in India, the legend of the Kalachakra, and the profound energy of the Buddhist pilgrimage.', 
    'Ratnagiri, Odisha, Buddhist, Vajrayana, Diamond Triangle, Hindu Pilgrimage, Ancient Lore, Monastery', 
    '183', 
    '{
        "spiritualEssence": "Ratnagiri is the manifestation of the divine as the supreme refinement and the absolute power of the Vajrayana (Diamond Path). The energy here is high-vibration, intricate, and intensely academic. It is the site where the Buddhist Tantra reached its physical and intellectual peak. The vibration is one of ''Vajra'' (Indestructible) and the absolute clarity of the realized mind. As a complex of red-brick monasteries and exquisite chlorite stone carvings, it represents the spiritual treasury of ancient Kalinga. A visit here is believed to grant the devotee the absolute precision of the spirit and the blessing of the thousand Buddhas. The air is always vibrant with the scent of the hill flowers and the silent, heavy energy of the thousand stone stupas.",
        "longDescription": "Ratnagiri, established in the 5th century CE, flourished as a major center of Buddhist learning until the 12th century. It is particularly significant as a site where the Kalachakra Tantra (The Wheel of Time) was studied and developed. The site features two massive monasteries (Viharas) and a grand stupa. Monastery 1 is famous for its spectacularly carved doorway, considered the most beautiful in the Buddhist world. The site is literal with thousands of votive stupas of all sizes, representing the offerings of millions of pilgrims over centuries. Ratnagiri was a site where the austerity of the monastery met the incredible artistic wealth of the Odisha stone-carvers, creating a unique spiritual aesthetic that influenced the Buddhist art of Java and Tibet.",
        "spiritualArchitecture": "The architecture of Ratnagiri is a spectacular display of the Mahayana and Vajrayana styles. It features massive brick monasteries with central courtyards, surrounding which are the cells for the monks. A unique feature is the use of blue-green chlorite stone for the carved doorways and the colossal Buddha heads, which provide a stunning contrast to the red brick. The main monastery doorway features intricate carvings of the celestial musicians, floral motifs, and the various forms of the Bodhisattvas. The architecture is designed to lead the pilgrim through a sequence of increasingly sacred spaces, culminating in the massive seated Buddha in the central sanctum. The presence of thousands of votive stupas surrounding the main stupa creates a sense of a spiritual forest of stone.",
        "vedicReferences": "Ratnagiri is celebrated in the Tibetan Buddhist tradition (Pag Sam Jon Zang) as a primary center of the Dharma that rivaled Nalanda in its intellectual influence.",
        "deepInsights": "The name ''Ratnagiri'' (Hill of Jewels) represents the truth that the highest wealth is the jewelry of the realized mind. Ratnagiri teaches that the path to enlightenment is as precise and indestructible as a diamond.",
        "ancientLore": "Lore tells that the site was protected by a circle of Vajras (thunderbolts) that kept the secrets of the Kalachakra safe from the uninitiated. Another legend says that the great master Prajna personally translated the sacred texts here before taking them to the Chinese emperor.",
        "keyRituals": [
                {
                        "name": "Votive Stupa Offering",
                        "description": "The ritual of meditating on the thousands of stone stupas to understand the vast history of devotion at the site."
                },
                {
                        "name": "Kalachakra Meditation",
                        "description": "Sitting in the courtyard of Monastery 1 to reflect on the cycles of time and the indestructible nature of the soul."
                },
                {
                        "name": "Sanctum Prayer",
                        "description": "Offering prayers to the colossal seated Buddha, whose serene expression is a masterpiece of world art."
                },
                {
                        "name": "Hill-Top Parikrama",
                        "description": "Walking around the entire monastic complex to experience the energy of the Diamond Triangle."
                }
        ],
        "highlights": [
                {
                        "name": "The Monastery 1 Doorway",
                        "description": "The world-famous carved stone entrance that is a pinnacle of Buddhist art."
                },
                {
                        "name": "The Colossal Buddha Head",
                        "description": "A massive and profoundly serene stone head of the Buddha found at the site."
                },
                {
                        "name": "The Field of Votive Stupas",
                        "description": "A unique landscape of over a thousand stone stupas of varying sizes and designs."
                },
                {
                        "name": "The Maha Stupa",
                        "description": "The central brick structure of the hill, offering panoramic views of the Assia valley."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "100km from Bhubaneswar and 70km from Cuttack. Well connected by road; regular taxis run from Bhubaneswar.",
                "nearestAirport": "Biju Patnaik International Airport, Bhubaneswar.",
                "nearestRailway": "Cuttack Railway Station / Jajpur Keonjhar Road."
        },
        "tips": [
                "Visit early in the morning to see the chlorite stone carvings in the soft morning light; the colors are spectacular.",
                "Combine your visit with the nearby sites of Udayagiri and Lalitgiri to complete the Diamond Triangle circuit.",
                "The site is quiet and remote; carry water and snacks as there are limited facilities on the hill."
        ],
        "faqs": [
                {
                        "question": "What is the Diamond Triangle?",
                        "answer": "It is the group of three major Buddhist monastic sites in Odisha: Ratnagiri, Udayagiri, and Lalitgiri."
                },
                {
                        "question": "What is the significance of the votive stupas?",
                        "answer": "They were donated by pilgrims as a form of merit-making; their sheer number at Ratnagiri shows the site''s immense popularity in ancient times."
                },
                {
                        "question": "Is it a Tantric site?",
                        "answer": "Yes, Ratnagiri was a major center for Vajrayana Buddhism, which incorporates tantric practices and the study of the Kalachakra."
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
    'Udayagiri & Khandagiri', 
    'udayagiri-khandagiri-caves', 
    'Sacred Destination', 
    'od', 
    'Ancient rock-cut caves that served as residential blocks for Jain and Buddhist monks, Udayagiri and Khandagiri are the spiritual twin hills of Odisha. Dating back to the 2nd century BCE, they feature spectacular inscriptions and carvings, representing the austerity and artistic depth of the Kalinga spirit under King Kharavela.', 
    '730.2', 
    '450.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sunrise Hills and the Caves of the Jain Sages', 
    'Udayagiri Khandagiri Caves | Odisha, Jainism & Ancient Lore', 
    'Experience the profound history of Udayagiri and Khandagiri. Discover the Rani Gumpha, the Hathigumpha inscription, and the profound energy of the ancient cave pilgrimage.', 
    'Udayagiri, Khandagiri, Odisha, Jain, Buddhist, Caves, Kharavela, Hindu Pilgrimage, Ancient Lore', 
    '184', 
    '{
        "spiritualEssence": "Udayagiri and Khandagiri are the manifestation of the divine as the supreme austerity and the absolute integration of the human will with the living rock. The energy here is ancient, quiet, and intensely focused. It is the site where the sages sought the silence of the stone to find the light of the soul. The vibration is one of ''Tyaga'' (Renunciation) and the absolute resilience of the faith. As twin hills of honey-colored sandstone, they represent the spiritual roots of the Odisha landscape. A visit here is believed to grant the devotee the strength of the character and the connection to the ancient lineage of the masters. The air is always vibrant with the scent of the dry stone and the silent, heavy energy of the 2,000-year-old inscriptions.",
        "longDescription": "The caves of Udayagiri (Hill of Sunrise) and Khandagiri (Broken Hill) were carved during the reign of King Kharavela in the 2nd century BCE. There are 18 caves in Udayagiri and 15 in Khandagiri. The most spectacular is the Rani Gumpha (Queen''s Cave), a two-storied monastic complex with exquisite relief carvings. The Hathigumpha (Elephant Cave) contains the famous 17-line Brahmi inscription of King Kharavela, which is one of the most important historical documents of India. While primarily Jain in origin, the caves also show Buddhist and Hindu influences. The site is unique for its combination of monastic simplicity and sophisticated stone carving, standing as a testament to the peak of the Kalinga civilization.",
        "spiritualArchitecture": "The architecture of the caves is a spectacular display of the early rock-cut monastic style. It features living quarters, assembly halls, and small shrines carved directly into the sandstone cliffs. The architecture is designed to manage the natural light and ventilation, with slanting floors for drainage. A unique feature is the use of animal and floral motifs, along with scenes of daily life and mythology, in the friezes and brackets. The Rani Gumpha features grand arched doorways and multi-layered facades. The architecture of the twin hills is unified by the rock-cut steps and the panoramic views of the modern city of Bhubaneswar, creating a sense of a spiritual bridge across time.",
        "vedicReferences": "Udayagiri is celebrated in the historical context as the site where King Kharavela, a great patron of the Jain Dharma, recorded his victories and his spiritual deeds.",
        "deepInsights": "The caves represent the truth that the highest spiritual realizations are found in the most simple and natural environments. Udayagiri teaches that the spirit can transform even the hard rock into a sanctuary of the soul.",
        "ancientLore": "Lore tells that the hills were once home to millions of celestial beings who left behind these caves for the benefit of the human sages. Another legend says that the water in the Akash Ganga tank at the top never dries up, even in the harshest summer.",
        "keyRituals": [
                {
                        "name": "Sunrise Meditation (Udayagiri)",
                        "description": "Sitting at the top of the Sunrise Hill to meditate on the beginning of the spiritual path."
                },
                {
                        "name": "Hathigumpha Inscription Visit",
                        "description": "The ritual of paying respect to the historical record of the great King Kharavela."
                },
                {
                        "name": "Jain Mandir Puja (Khandagiri)",
                        "description": "Praying at the modern Jain temple at the summit of Khandagiri to honor the Tirthankaras."
                },
                {
                        "name": "Cave Exploration (Ananta Gumpha)",
                        "description": "The ritual of silence inside the ancient meditation cells of the Khandagiri hill."
                }
        ],
        "highlights": [
                {
                        "name": "Rani Gumpha",
                        "description": "The largest and most ornate cave in Udayagiri, featuring spectacular relief carvings."
                },
                {
                        "name": "Hathigumpha",
                        "description": "The cave containing the historic 17-line inscription of King Kharavela."
                },
                {
                        "name": "Ananta Gumpha",
                        "description": "A cave in Khandagiri famous for its carvings of elephants, Lakshmi, and the Sun God."
                },
                {
                        "name": "The Akash Ganga",
                        "description": "A sacred rock-cut tank at the summit that provides a permanent source of water."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "6km from Bhubaneswar city center. Well connected by road; regular buses and taxis run from the city.",
                "nearestAirport": "Biju Patnaik International Airport, Bhubaneswar.",
                "nearestRailway": "Bhubaneswar Railway Station."
        },
        "tips": [
                "Visit early in the morning to avoid the heat and to see the sunrise from Udayagiri; the light on the sandstone is magical.",
                "Be prepared for monkeys on both hills; keep your bags closed and avoid carrying loose food items.",
                "Hire a guide to explain the complex historical and spiritual stories depicted in the carvings and the inscriptions."
        ],
        "faqs": [
                {
                        "question": "How old are the caves?",
                        "answer": "The caves date back to the 2nd century BCE, primarily carved during the reign of King Kharavela."
                },
                {
                        "question": "Who lived in these caves?",
                        "answer": "They were primarily built as residential quarters for Jain monks, though they also housed Buddhist practitioners."
                },
                {
                        "question": "Which hill is better to visit?",
                        "answer": "Udayagiri has the more ornate and larger caves (like Rani Gumpha), while Khandagiri offers better panoramic views and has more active Jain temples at the top."
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
    'Junagadh (Uparkot)', 
    'junagadh-uparkot', 
    'Sacred Destination', 
    'gj', 
    'A city of deep spiritual layers, Junagadh is where the ancient Ashokan edicts, Buddhist caves, and the sacred Girnar hill converge. The Uparkot fortress is a site of absolute historical continuity, representing the integration of Hindu, Buddhist, and Islamic spiritualities in the heart of the Saurashtra peninsula.', 
    '230.2', 
    '440.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Fortress of the Ancients and the Soul of Saurashtra', 
    'Junagadh Uparkot | Gujarat, Ashoka, Buddhist Caves & Ancient Lore', 
    'Experience the profound layers of Junagadh. Discover the Uparkot fortress, the Ashokan edicts, and the profound energy of the multi-spiritual pilgrimage.', 
    'Junagadh, Gujarat, Uparkot, Ashoka, Buddhist Caves, Girnar, Hindu Pilgrimage, Ancient Lore', 
    '185', 
    '{
        "spiritualEssence": "Junagadh is the manifestation of the divine as the supreme continuity and the absolute integration of the sacred time. The energy here is dense, layered, and intensely historic. It is the site where the words of the Emperor, the silence of the monks, and the call of the minaret exist in a single stone embrace. The vibration is one of ''Saurashtra'' (The Land of the Good Empire) and the absolute resilience of the faith. As a city at the foot of the Girnar mountain, it represents the spiritual gateway of Gujarat. A visit here is believed to grant the devotee the sense of the vastness of history and the blessing of the multiple paths. The air is always vibrant with the scent of the dry grass and the silent, heavy energy of the 2,300-year-old rock edicts.",
        "longDescription": "Junagadh (meaning Old Fort) is dominated by the Uparkot fortress, which has stood for over 2,000 years. The site features the famous Ashokan Rock Edicts, containing the messages of Ashoka (3rd c. BCE), Rudradaman (2nd c. CE), and Skandagupta (5th c. CE) on a single massive boulder. Within the fort are the spectacular Buddhist caves (2nd c. CE) carved into the rock, featuring unique multi-storied meditation halls. The site also includes the Adi Kadi Vav and Navghan Kuwo, two massive rock-cut wells that were spiritual and life-giving centers of the fort. Junagadh is the base for the ascent of the Girnar hill, the most sacred mountain of Gujarat for both Hindus and Jains, making it one of the most complex and high-authority spiritual sites in India.",
        "spiritualArchitecture": "The architecture of Junagadh is a spectacular display of the rock-cut Buddhist, Rajput fortress, and Indo-Islamic styles. The Uparkot fortress features massive walls, grand gateways, and the unique circular Buddhist caves with their carved pillars and meditation niches. A unique feature is the Jami Masjid, built using the materials of an ancient temple, showing the layering of religious architecture. The Ashokan rock is housed in a modern protective structure that allows the pilgrim to see the three different scripts on a single stone. The architecture is designed to emphasize the verticality and the defensive strength of the site, creating a sense of a spiritual citadel that has withstood 2,000 years of change.",
        "vedicReferences": "Junagadh is celebrated in the Puranic literature as the site of the ancient Revatak hill, a favorite retreat of Lord Krishna and his family.",
        "deepInsights": "The three different inscriptions on the Ashokan rock represent the truth that the sacred values are timeless even as the empires and the languages change. Junagadh teaches that the highest spirituality is found in the integration of the diverse historical layers.",
        "ancientLore": "Lore tells that the Uparkot fort was forgotten for 300 years and rediscovered only when a woodsman saw a lamp burning at the top of the jungle. Another legend says that the saint Narsinh Mehta personally saw the dance of Lord Krishna on the banks of the Damodar Kund in Junagadh.",
        "keyRituals": [
                {
                        "name": "Ashokan Edict Reading",
                        "description": "The ritual of visiting the rock to reflect on the ancient message of non-violence and social harmony."
                },
                {
                        "name": "Uparkot Cave Meditation",
                        "description": "Sitting in the 2nd-century Buddhist caves to connect with the ancient monastic silence."
                },
                {
                        "name": "Damodar Kund Snanam",
                        "description": "The ritual bath in the sacred pond at the foot of Girnar where the ashes of Narsinh Mehta were immersed."
                },
                {
                        "name": "Girnar Taleti Pooja",
                        "description": "Praying at the base of the Girnar mountain before starting the 10,000-step ascent."
                }
        ],
        "highlights": [
                {
                        "name": "Ashokan Rock Edicts",
                        "description": "The massive boulder containing inscriptions from three different dynasties over 800 years."
                },
                {
                        "name": "Uparkot Buddhist Caves",
                        "description": "Intricate multi-storied rock-cut chambers used by ancient monks."
                },
                {
                        "name": "Adi Kadi Vav",
                        "description": "A spectacular 15th-century stepwell carved entirely out of a single stone."
                },
                {
                        "name": "Mahabat Maqbara",
                        "description": "The breathtakingly beautiful 19th-century mausoleum featuring unique spiral staircases and gothic arches."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during the Bhavnath Fair).",
                "howToReach": "Well connected by rail and road; Junagadh is a major station on the Western Railway. Regular buses run from Rajkot (100km) and Ahmedabad (315km).",
                "nearestAirport": "Rajkot Airport / Keshod Airport / Porbandar Airport.",
                "nearestRailway": "Junagadh Junction."
        },
        "tips": [
                "Wear comfortable walking shoes for exploring the vast Uparkot fort and the Buddhist caves.",
                "Visit the Ashokan rock early in the morning for the best light on the inscriptions.",
                "Combine your visit with the Girnar hill climb; start early (around 3 AM) if you plan to reach the Dattatreya peak."
        ],
        "faqs": [
                {
                        "question": "How old is Uparkot?",
                        "answer": "The foundations of the fort date back over 2,300 years to the Mauryan period."
                },
                {
                        "question": "Who was Narsinh Mehta?",
                        "answer": "He was a 15th-century poet-saint of Junagadh and the composer of the famous hymn ''Vaishnav Jan To''."
                },
                {
                        "question": "What is unique about the Ashokan rock?",
                        "answer": "It contains inscriptions from three different emperors (Ashoka, Rudradaman, Skandagupta) from three different centuries on the same stone."
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
    'Maheshwar', 
    'maheshwar', 
    'Sacred Destination', 
    'mp', 
    'The spiritual capital of Rani Ahilyabai Holkar, Maheshwar is a magnificent temple town on the banks of the Narmada river. It is a site of absolute artistic elegance and deep Shaiva devotion, famous for its massive stone ghats, the Sahasrarjun temple, and the weaving tradition of the Maheshwari sarees.', 
    '450.2', 
    '520.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Kashi of the South and the Spiritual Legacy of the Holkars', 
    'Maheshwar Temple | Madhya Pradesh, Ahilyabai & Ancient Lore', 
    'Experience the profound serenity of Maheshwar. Discover the grand Narmada ghats, the legend of Rani Ahilyabai, and the profound energy of the Shaiva pilgrimage.', 
    'Maheshwar, Madhya Pradesh, Narmada, Ahilyabai Holkar, Lord Shiva, Hindu Pilgrimage, Ancient Lore, Ghats', 
    '186', 
    '{
        "spiritualEssence": "Maheshwar is the manifestation of the divine as the supreme elegance and the absolute dedication of the righteous ruler. The energy here is serene, royal, and intensely artistic. It is the site where the flow of the Narmada meets the steady prayer of the queen. The vibration is one of ''Raja-Dharma'' (The Duty of the Ruler) and the absolute simplicity of the faith. As a town of spectacular stone fortresses and temples reflected in the river, it represents the spiritual heart of central India. A visit here is believed to grant the devotee the absolute peace of the mind and the blessing of the sacred river. The air is always vibrant with the scent of the river water and the constant, rhythmic sound of the looms and the temple bells.",
        "longDescription": "Maheshwar, the ancient capital of the Mahishmati kingdom, rose to spiritual prominence in the 18th century under Rani Ahilyabai Holkar. She transformed the town into a center of Shaivism, building numerous temples and the spectacular ghats that define the town''s skyline. The central point is the Ahilyabai Fort and the Rajwada, which houses the queen''s personal shrine. The Sahasrarjun temple and the Rajarajeshwar temple are masterpieces of Maratha architecture. Maheshwar is unique for its integration of spiritual life with the economy through the Maheshwari weaving industry, which was personally promoted by the queen. The town remains a site where the history of the Maratha resurgence and the devotion of the masses are perfectly unified in a landscape of stone and water.",
        "spiritualArchitecture": "The architecture of Maheshwar is a spectacular display of the late Maratha style with its characteristic stone carvings and massive plinths. The ghats of Maheshwar are considered among the most beautiful in India, featuring a series of grand platforms, steps, and memorial shrines (Chhatris). The architecture is designed to emphasize the horizontal expanse of the river and the vertical majesty of the fort. A unique feature is the use of the local dark stone and the intricate relief carvings on the temple facades, depicting scenes from the Puranas. The architecture of the Rajwada is simple and austere, reflecting the queen''s personal asceticism. The use of repetitive arches and the grand scale of the riverfront create a sense of a spiritual city that is both a fortress and a sanctuary.",
        "vedicReferences": "Maheshwar is celebrated in the Mahabharata and the Puranas as the ancient Mahishmati, the capital of King Kartavirya Arjuna.",
        "deepInsights": "The presence of the queen''s personal shrine in the fort represents the truth that the highest power is that which is surrendered to the divine. Maheshwar teaches that the beauty of the spirit is best expressed through the service of the people.",
        "ancientLore": "Lore tells that the thousand-armed King Sahasrarjun once stopped the flow of the Narmada with his hands to let his wives play in the river. Another legend says that the Lord Shiva personally guided Rani Ahilyabai in her governance of the state.",
        "keyRituals": [
                {
                        "name": "Narmada Aarti (Maheshwar)",
                        "description": "The grand evening prayer performed at the Ahilya Ghat as the lamps are floated on the sacred river."
                },
                {
                        "name": "Ahilyabai Rajwada Puja",
                        "description": "Praying at the personal shrine of the queen to honor her legacy of righteousness and devotion."
                },
                {
                        "name": "Sahasrarjun Deepotsav",
                        "description": "The ritual of lighting thousands of lamps in the ancient temple during the Kartika month."
                },
                {
                        "name": "Maheshwari Weaving Ritual",
                        "description": "The traditional process of weaving the sacred motifs of the river and the temples into the famous silk sarees."
                }
        ],
        "highlights": [
                {
                        "name": "Ahilya Ghat",
                        "description": "The spectacular stone riverfront that is the spiritual and cultural heart of Maheshwar."
                },
                {
                        "name": "Rajarajeshwar Temple",
                        "description": "The primary Shiva temple of the town, famous for its intricate stone work and lamps."
                },
                {
                        "name": "The Rajwada",
                        "description": "The royal palace of the Holkars, housing the humble throne of Rani Ahilyabai."
                },
                {
                        "name": "Sahasrarjun Temple",
                        "description": "The ancient temple dedicated to the legendary thousand-armed king of Mahishmati."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "95km from Indore. Well connected by road; regular buses and taxis run from Indore and Dhamnod.",
                "nearestAirport": "Devi Ahillyabai Holkar International Airport, Indore.",
                "nearestRailway": "Indore Junction / Barwaha (local)."
        },
        "tips": [
                "Visit the Rehwa Society in the fort to see the traditional Maheshwari weaving in action; it is a spiritual experience of craftsmanship.",
                "Take a boat ride on the Narmada at sunset to see the full majesty of the ghats and the temples from the water.",
                "Maheshwar is a quiet and respectful town; dress modestly and maintain the peace of the riverfront."
        ],
        "faqs": [
                {
                        "question": "Who was Rani Ahilyabai Holkar?",
                        "answer": "She was the 18th-century Maratha queen of the Holkar state, famous for her justice, wisdom, and for rebuilding temples across India."
                },
                {
                        "question": "Is it near Omkareshwar?",
                        "answer": "Yes, it is about 65 kilometers from the Jyotirlinga of Omkareshwar and is often visited as part of the same circuit."
                },
                {
                        "question": "What is unique about Maheshwari sarees?",
                        "answer": "They were personally designed by the queen and are characterized by their light weight and the use of temple-inspired borders."
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
    'Mangalagiri', 
    'mangalagiri', 
    'Sacred Destination', 
    'ap', 
    'The Hill of Happiness, Mangalagiri is home to the unique temple of Panakala Narasimha. Located near Vijayawada, it is a site of absolute divine mystery, where the Lord is worshipped only with Jaggery water (Panakam), and it is believed that the idol drinks exactly half of the offering, making a distinct gurgling sound.', 
    '790.2', 
    '540.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Jaggery-Drinking God and the Tallest Gopuram of the South', 
    'Mangalagiri Temple | Andhra Pradesh, Narasimha & Ancient Lore', 
    'Experience the profound mystery of Mangalagiri. Discover the Panakala Narasimha, the tallest gopuram in the region, and the profound energy of the hill pilgrimage.', 
    'Mangalagiri, Andhra Pradesh, Narasimha, Vijayawada, Hindu Pilgrimage, Ancient Lore, Panakam, Mystery', 
    '187', 
    '{
        "spiritualEssence": "Mangalagiri is the manifestation of the divine as the supreme satisfaction and the absolute acceptance of the humble offering. The energy here is mysterious, sweet, and intensely vibrant. It is the site where the fierce fire of the deity is extinguished by the sweetness of the devotee''s love. The vibration is one of ''Ananda'' (Bliss) and the absolute removal of all poisonous influences. As a hill that was once a dormant volcano, it represents the spiritual transformation of the primal fire into divine grace. A visit here is believed to grant the devotee the absolute satisfaction of the heart and the protection from all physical and mental toxins. The air is always vibrant with the scent of the jaggery (Panakam) and the silent, heavy energy of the ancient hill.",
        "longDescription": "Mangalagiri (The Auspicious Hill) is one of the eight Mahakshetras of India. The main temple, Panakala Narasimha, is located halfway up the hill. There is no idol, only a mouth carved into the rock. Devotees offer Jaggery water (Panakam), which is poured into the mouth; a gurgling sound is heard as the Lord drinks exactly half, and the rest is returned as Prasadam. Despite the vast amount of sugar water offered daily, there is not a single ant or fly to be seen at the site. At the foot of the hill is the Lakshmi Narasimha temple, featuring one of the tallest Gopurams in the world, standing at 153 feet with 11 stories. Mangalagiri is a site where the most ancient hill-worship and the grandest temple architecture are perfectly unified.",
        "spiritualArchitecture": "The architecture of Mangalagiri is a spectacular display of the Vijayanagara and later Nayaka styles. The Lakshmi Narasimha temple at the base features a massive Gopuram that is an architectural marvel, designed to be seen from miles away. The Panakala temple on the hill is a rock-cut shrine that emphasizes the natural formation of the mouth. A unique feature is the use of the ''Gali Gopuram'' (Wind Tower) which is so tall that it sways slightly with the wind but remains structurally perfect. The architecture is designed to lead the pilgrim from the grand, man-made fortress of the base to the raw, natural mystery of the hill-shrine. The use of intricate wooden carvings on the temple chariot and the stone relief work on the gopuram create a sense of a spiritual capital of the Telugu people.",
        "vedicReferences": "Mangalagiri is celebrated in the Brahmanda Purana as the site where the Lord manifested to pacify his anger after slaying the demon Namuchi.",
        "deepInsights": "The drinking of the Panakam represents the truth that the divine accepts the essence of our devotion and returns the rest to sustain us. Mangalagiri teaches that even the most fierce energy can be pacified by the sweetness of faith.",
        "ancientLore": "Lore tells that the hill was once a fire-breathing volcano and the Lord manifested here to cool the earth with his presence. Another legend says that the Lord drinks honey in Krita Yuga, ghee in Treta Yuga, milk in Dvapara Yuga, and jaggery water in Kali Yuga.",
        "keyRituals": [
                {
                        "name": "Panakam Offering",
                        "description": "The unique ritual of pouring jaggery water into the mouth of the rock-cut deity and hearing the gurgling sound of the Lord drinking."
                },
                {
                        "name": "Gopuram Darshan",
                        "description": "Praying at the base of the massive 153-foot tower to seek the blessing of the auspicious heights."
                },
                {
                        "name": "Mangalagiri Hill Parikrama",
                        "description": "Walking around the sacred hill to gain the merit of the entire pilgrimage site."
                },
                {
                        "name": "Kalyanotsavam (Mangalagiri)",
                        "description": "The grand annual wedding festival of the Lord and Goddess Lakshmi."
                }
        ],
        "highlights": [
                {
                        "name": "Panakala Narasimha Shrine",
                        "description": "The mysterious rock-cut mouth of the Lord that drinks jaggery water."
                },
                {
                        "name": "The 153-Foot Gali Gopuram",
                        "description": "One of the tallest and most beautiful temple towers in South India."
                },
                {
                        "name": "The Sacred Conch",
                        "description": "An ancient conch believed to have been gifted by Lord Krishna himself to the temple."
                },
                {
                        "name": "Kshira Vruksham",
                        "description": "A sacred tree on the hill where childless couples tie cradles to seek the blessing of a progeny."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "12km from Vijayawada and 25km from Guntur. Well connected by road; regular buses and taxis run from Vijayawada city.",
                "nearestAirport": "Vijayawada International Airport (VGA).",
                "nearestRailway": "Mangalagiri Railway Station / Vijayawada Junction."
        },
        "tips": [
                "The Panakala temple is open only until 3:00 PM; ensure you reach the hill-top well before then.",
                "Visit the handloom weavers in the town of Mangalagiri; the site is world-famous for its traditional Mangalagiri cotton sarees.",
                "The climb to the Panakala temple is not too long, but be prepared for the heat; carry water."
        ],
        "faqs": [
                {
                        "question": "Does the God really drink the water?",
                        "answer": "Yes, devotees hear a distinct gurgling sound as the jaggery water is poured, and it stops exactly when half the pot is empty."
                },
                {
                        "question": "Is the hill a volcano?",
                        "answer": "Geologically, it is an ancient hill, but local lore firmly believes it was a dormant volcano pacified by the Lord."
                },
                {
                        "question": "What is special about the Gali Gopuram?",
                        "answer": "It is 153 feet tall and features 11 levels; it is one of the most iconic landmarks of coastal Andhra Pradesh."
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
    'Badrinath', 
    'badrinath', 
    'Char Dham', 
    'uk', 
    'Nestled in the Garhwal Himalayas along the banks of the Alaknanda River, Badrinath is the supreme earthly abode of Lord Vishnu. It is the most vital of the Char Dham pilgrimages, revered for granting Moksha and unparalleled spiritual awakening.', 
    '230', 
    '125', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Abode of Lord Vishnu', 
    'Badrinath Dham | Sacred Char Dham Pilgrimage & Rituals', 
    'Explore the spiritual magnitude of Badrinath Temple. Discover its ancient history, Vedic architecture, sacred rituals, and the path to ultimate liberation (Moksha) in the Himalayas.', 
    'Badrinath, Char Dham, Lord Vishnu, Badrinath Temple, Alaknanda River, Hindu Pilgrimage, Uttarakhand, Moksha', 
    '1', 
    '{
        "spiritualEssence": "Badrinath is not merely a temple; it is the axis mundi of Vaishnavite devotion. According to the ancient scriptures, it is the sacred realm where Lord Vishnu meditated in the form of Nar-Narayan for thousands of years to benefit all living beings. The spiritual vibration here is intensely concentrated, believed to instantly sever the karmic cycles of birth and death. Pilgrims arriving at these towering Himalayan gates report a profound sense of inner stillness. It is said that merely gazing upon the dark Saligram stone idol of Lord Badri Vishal—seated in a meditative Padmasana posture—awakens the soul''s latent divinity and guarantees Moksha (liberation). The aura is one of ultimate surrender, where the roaring Alaknanda River serves as a constant chanting of the divine cosmic sound, washing away worldly attachments.",
        "longDescription": "The history of Badrinath stretches back into the mists of Satya Yuga. Ancient Hindu texts, including the Bhagavata Purana and the Mahabharata, extol its virtues as a supreme pilgrimage site. The name ''Badrinath'' is derived from the wild berries (Badri) that once covered the region in a dense forest. Legend dictates that when Lord Vishnu sat in harsh penance, Goddess Lakshmi took the form of a massive Badri tree to shield him from the blistering Himalayan sun and snow. Thus, the deity became known as Badrinath, the Lord of the Badri Forest.\n\nFor centuries, the shrine was lost to the snows and shifting eras. It was in the 8th century that the great philosopher-saint Adi Shankaracharya, guided by divine intuition, recovered the original idol of Lord Badrinath from the depths of the Narad Kund. He enshrined it in the Garud Gufa near the Tapt Kund hot springs. The temple underwent numerous constructions and renovations over the centuries, heavily patronized by the Kings of Garhwal and the Katyuri dynasty.\n\nToday, the temple stands at an elevation of 3,133 meters (10,279 feet), flanked by the majestic Nar and Narayan mountain ranges, with the formidable Neelkanth Peak shining like a silver crown in the background. It is a vital node in both the larger Char Dham circuit of India (along with Dwarka, Puri, and Rameswaram) and the Chota Char Dham of Uttarakhand. For six months of the year, due to extreme winter snows, the temple remains closed to the human realm, during which it is believed that the celestial sage Narada performs the daily worship. The reopening of the temple doors (Kapat) in spring is a massive spiritual event, drawing millions of devotees seeking the ultimate blessing.",
        "spiritualArchitecture": "The Badrinath Temple is a masterpiece of traditional Garhwali wooden architecture combined with Katyuri style influences. The towering facade, painted in brilliant, eye-catching shades of red, yellow, and blue, contrasts strikingly against the stark white Himalayan snows. The structure is divided into three distinct sections: the Garbhagriha (sanctum sanctorum), the Darshan Mandap (worship hall), and the Sabha Mandap (assembly hall). The sanctum is capped by a conical roof covered in plates of gold. The main entrance, known as the Singh Dwar (Lion Gate), stands tall and imposing, heavily carved with intricate floral patterns and divine figures. Inside, the main deity is carved from black Saligram stone, sitting under a canopy of solid gold, surrounded by accompanying deities like Uddhava, Kubera, Narada, and the Nar-Narayan twins.",
        "vedicReferences": "Badrinath''s glory is extensively documented in the Skanda Purana, which boldly proclaims: ''There are several sacred shrines in heaven, on earth, and in hell; but there is no shrine like Badrinath.'' The Mahabharata recounts how the Pandavas passed through this very region on their final ascent to Swarga (Heaven). The Bhagavata Purana highlights it as the permanent ascetic ground of Lord Vishnu in his dual avatar as the sages Nar and Narayan.",
        "localLegends": "One of the most fascinating local legends involves Lord Shiva. It is said that Badrinath originally belonged to Lord Shiva and Goddess Parvati. However, Lord Vishnu, seeking a perfect place for deep meditation, transformed himself into a crying infant. Parvati, moved by the child''s tears, picked him up despite Shiva''s warnings. When they returned from bathing in the Alaknanda, the doors were locked from the inside by Vishnu. Recognizing the divine play (Leela), Shiva smiled and moved to the nearby Kedarnath valley, leaving Badrinath as the eternal domain of Lord Vishnu.",
        "keyRituals": [
                {
                        "name": "Maha Abhishek",
                        "description": "The most sacred morning ritual where the deity is bathed with holy water from the Alaknanda, milk, ghee, and honey, accompanied by the continuous chanting of Vedic mantras."
                },
                {
                        "name": "Geeta Path",
                        "description": "Daily recitation of the Bhagavad Gita within the temple premises, creating a highly charged spiritual atmosphere."
                },
                {
                        "name": "Swarna Aarti",
                        "description": "An opulent evening ritual performed with a heavy gold lamp. The reflection of the flames on the dark stone deity is a mesmerizing sight for devotees."
                },
                {
                        "name": "Pind Daan at Brahma Kapal",
                        "description": "Performed on the banks of the Alaknanda, this vital ritual is done for the salvation of ancestors, believed to instantly release their souls to heaven."
                }
        ],
        "highlights": [
                {
                        "name": "Tapt Kund",
                        "description": "A natural thermal spring located just below the temple. Devotees must take a purifying dip in its hot, sulfurous waters before entering the shrine."
                },
                {
                        "name": "Brahma Kapal",
                        "description": "A flat platform on the banks of the Alaknanda where Lord Brahma is said to reside. It is the premier site for ancestral rites."
                },
                {
                        "name": "Mana Village",
                        "description": "The last Indian village before the Tibet border. It houses the legendary Vyas Gufa, where Sage Vyasa dictated the Mahabharata."
                },
                {
                        "name": "Neelkanth Peak",
                        "description": "Known as the ''Queen of Garhwal,'' this majestic snow-clad pyramid mountain towers over the temple, glowing brilliantly at sunrise."
                },
                {
                        "name": "Mata Murti Temple",
                        "description": "Located a few kilometers away, this temple is dedicated to the mother of Nar and Narayan, celebrated during an annual vibrant fair."
                }
        ],
        "travelInfo": {
                "bestTime": "May to June and September to October (Temple remains closed from November to April).",
                "nearestAirport": "Jolly Grant Airport, Dehradun (approx. 310 km away).",
                "nearestRailway": "Rishikesh Railway Station (approx. 295 km away).",
                "howToReach": "Accessible by road from Rishikesh/Haridwar via a scenic but challenging mountain highway along the Alaknanda River. Helicopter services are also available from Dehradun."
        },
        "tips": [
                "Start your journey early in the morning to avoid mountain landslides and traffic.",
                "Pack heavy woolens; temperatures drop drastically at night, even in mid-summer.",
                "Ensure you complete the mandatory biometric registration for the Char Dham Yatra before arriving.",
                "Acclimatize properly, as the high altitude (10,000+ ft) can cause breathlessness.",
                "Carry adequate cash, as ATM services and mobile networks can be highly unreliable."
        ],
        "faqs": [
                {
                        "question": "Why is Badrinath closed for six months?",
                        "answer": "Due to extreme winter conditions and heavy snowfall in the high Himalayas, the region becomes inaccessible. According to tradition, during this period, the celestial sage Narada performs the daily worship of Lord Vishnu."
                },
                {
                        "question": "Can elderly people visit Badrinath?",
                        "answer": "Yes, unlike Kedarnath, the Badrinath temple is directly accessible by road. The vehicle drops you close to the temple, requiring only a short, relatively flat walk, making it very suitable for the elderly."
                },
                {
                        "question": "What is the significance of the Tapt Kund?",
                        "answer": "The Tapt Kund is a natural hot spring. It is considered mandatory to cleanse oneself in its therapeutic waters before having Darshan of Lord Badrinath. It represents physical and spiritual purification."
                },
                {
                        "question": "Is photography allowed inside the temple?",
                        "answer": "No, strict rules prohibit photography and videography inside the main temple complex (Garbhagriha) to maintain the sanctity and spiritual focus of the shrine."
                },
                {
                        "question": "What is the best time to attend the Aarti?",
                        "answer": "The evening Shayan Aarti is highly recommended. You should arrive at least 45 minutes early as the Sabha Mandap fills up quickly with devotees."
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
    'Kedarnath', 
    'kedarnath', 
    'Jyotirlinga', 
    'uk', 
    'Situated at an altitude of 3,583m in the Rudraprayag district of Uttarakhand, Kedarnath is the most remote of the 12 Jyotirlingas. It is the site where Lord Shiva took the form of a bull to elude the Pandavas, eventually leaving his hump behind as a symbol of eternal presence.', 
    '205.2', 
    '105.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Throne of the Himalayan Lord', 
    'Kedarnath Dham | Most Sacred Jyotirlinga, Ancient Lore & Ancient Insights', 
    'Dive into the deep spiritual mysteries of Kedarnath. Explore the Pandava history, the Panch Kedar legends, and the profound esoteric significance of the Bull-form Shiva.', 
    'Kedarnath, Jyotirlinga, Lord Shiva, Chota Char Dham, Uttarakhand, Himalayan Temple, Pandavas, Moksha, Panch Kedar', 
    '2', 
    '{
        "spiritualEssence": "Kedarnath is the pinnacle of Shaivite devotion, a realm where the boundary between the physical and the metaphysical vanishes. Guarded by the towering Kedar Peak and the Chorabari Glacier, the shrine represents the absolute stillness of the cosmic mind. The vibration here is not merely quiet; it is a resonant silence that echoes the primordial sound of ''Aum''. It is the place where the ego is sacrificed at the feet of the Lord of the Wilds. Pilgrims trekking these heights are not just moving through space, but through layers of consciousness, stripping away the mundane to reach the sacred center of the self.",
        "longDescription": "The antiquity of Kedarnath is as vast as the Himalayas. While the present stone temple is attributed to Adi Shankaracharya in the 8th century, the site has been a beacon of light since the Satya Yuga. The Mahabharata recounts how the Pandavas, burdened by the guilt of the Kurukshetra war, sought Shiva for redemption. Shiva, playing the role of the elusive ascetic, fled from them, transforming into a bull at Guptkashi. When Bheem, the strongest of the brothers, tried to seize him, the Bull dove into the earth, leaving its hump at Kedarnath. This triangular lingam is the very symbol of the Lord''s resilience. Over the millennia, the temple has stood against the crushing weight of snow and the fury of floods, most notably the 2013 catastrophe where a massive boulder (Bheem Shila) diverted the waters, sparing the sanctum—a miracle that reaffirmed the shrine''s divine status to the modern world.",
        "spiritualArchitecture": "The Kedarnath temple is a marvel of ancient engineering, built using massive, interlocked grey stone slabs without the use of mortar. It is a classic Katyuri style structure, characterized by its high rectangular plinth and a towering, tiered spire. The entrance is guarded by a massive bronze Nandi, the celestial bull. The inner walls are carved with figures of the Pandavas, Lord Krishna, and the Goddess Parvati. The Garbhagriha contains the natural rock formation (the hump), which is worshipped in its raw, uncarved state, symbolizing the primordial nature of existence.",
        "vedicReferences": "The Kedar Khanda of the Skanda Purana is dedicated entirely to this region. It states: ''By merely seeing the peak of Kedarnath, one is liberated from all sins.'' The Shiva Purana lists it as the supreme pilgrimage for those seeking Moksha (final liberation).",
        "localLegends": "A lesser-known legend states that Lord Shiva once performed his cosmic dance (Tandava) here to settle the tectonic plates of the newly formed Himalayas. Another lore speaks of the celestial sage Narada, who resides in the Narad Kund nearby, performing secret midnight rituals when the temple is closed to humans during the winter months.",
        "keyRituals": [
                {
                        "name": "Maha Abhishek",
                        "description": "Performed at 4 AM, involving the bathing of the deity in milk, curd, honey, and sacred water from the Alaknanda."
                },
                {
                        "name": "Shiva Sahasranamam",
                        "description": "The recitation of the 1000 names of Shiva, believed to create a protective sonic field around the devotee."
                },
                {
                        "name": "Evening Aarti",
                        "description": "A spectacular ritual of lamps and bells that resonates through the entire valley at sunset."
                }
        ],
        "highlights": [
                {
                        "name": "Bheem Shila",
                        "description": "The massive rock that miraculously saved the temple during the 2013 floods."
                },
                {
                        "name": "Chorabari Lake",
                        "description": "A crystal clear lake located 3km above the temple, associated with the Lord''s first teaching of yoga."
                },
                {
                        "name": "Bhairav Nath Temple",
                        "description": "The protector of the Kedar valley, located 500m above the main shrine; his permission is sought before entering Kedarnath."
                }
        ],
        "travelInfo": {
                "bestTime": "May to June; September to October.",
                "howToReach": "16-22km trek from Gauri Kund or via Helicopter from Phata/Sirsi.",
                "nearestAirport": "Dehradun (Jolly Grant).",
                "nearestRailway": "Rishikesh/Haridwar."
        },
        "tips": [
                "Start your journey early to avoid crowds.",
                "Pack heavy woolens; temperatures drop drastically.",
                "Acclimatize properly, as high altitude can cause breathlessness.",
                "Carry adequate cash, as digital networks are unreliable."
        ],
        "faqs": [
                {
                        "question": "How difficult is the Kedarnath trek?",
                        "answer": "The trek is approximately 16km long and is considered moderately difficult. It involves a steep ascent and requires good physical fitness."
                },
                {
                        "question": "Is there a helicopter service?",
                        "answer": "Yes, several operators provide helicopter services from Phata, Sirsi, and Guptkashi."
                },
                {
                        "question": "When does the temple open and close?",
                        "answer": "The temple typically opens on Akshaya Tritiya (April/May) and closes on Bhai Dooj (October/November)."
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
    'Somnath Jyotirlinga | Legend of Chandra, Ancient Resilience & Ancient Lore', 
    'Explore the deep history of Somnath, the first Jyotirlinga. Discover the Moon God''s penance, its architectural splendor, and its spiritual victory over time.', 
    'Somnath, Jyotirlinga, Lord Shiva, Gujarat, Moon God, Chandra, Eternal Shrine, Hindu Pilgrimage', 
    '3', 
    '{
        "spiritualEssence": "Somnath is the manifestation of the Lord as the healer of the cosmos. Located at the Triveni Sangam (confluence of three rivers) and the Arabian Sea, it represents the meeting of the individual soul with the universal ocean of consciousness. The energy here is rhythmic, governed by the tides and the waxing and waning of the moon. It is the site of ultimate renewal; just as the Moon was restored to his full glory here, a devotee finds their spiritual luster restored in the presence of Somnath.",
        "longDescription": "The history of Somnath is an epic of resilience. According to the Puranas, Chandra (the Moon) married the 27 daughters of Daksha Prajapati but loved only Rohini. Daksha cursed him to wither away. Chandra performed intense penance at this spot, and Lord Shiva, moved by his devotion, partially reversed the curse, allowing the moon to cycle through phases. In gratitude, Chandra built a golden temple. This temple was destroyed and rebuilt seven times. Each time invaders tried to extinguish its light, it rose again, more majestic than before.",
        "spiritualArchitecture": "The temple is built in the Kailash Mahameru Prasad style. Its spire reaches 150 feet, adorned with a flag that flutters with the sea breeze. The Baan Stambh (Arrow Pillar) is a remarkable astronomical feature; an arrow points towards the South Pole, indicating that there is no land mass in a straight line from that point to Antarctica.",
        "vedicReferences": "The Skanda Purana details the Prabhas Khanda, highlighting the spiritual significance of this coastal shrine. It is the center for lunar-based spiritual practices.",
        "localLegends": "Legend says that the original Jyotirlinga was a self-manifested (Swayambhu) pillar of light. Another lore states that Lord Krishna took his last earthly step at the nearby Bhalka Teerth, connecting the legacy of the Avatar to the eternal presence of the Lord.",
        "keyRituals": [
                {
                        "name": "Somanatha Mahapuja",
                        "description": "An elaborate morning worship involving 16 steps and chanting of the Sri Rudram."
                },
                {
                        "name": "Samudra Aarti",
                        "description": "Evening ritual where the ocean itself is worshipped as the Lord''s cosmic footstool."
                },
                {
                        "name": "Gangajal Abhishek",
                        "description": "Pouring of holy Ganges water over the lingam, symbolizing the union of all sacred waters."
                }
        ],
        "highlights": [
                {
                        "name": "Triveni Sangam",
                        "description": "Confluence of Hiran, Kapila, and Saraswati rivers."
                },
                {
                        "name": "Baan Stambh",
                        "description": "An ancient pillar marking a straight line to the South Pole."
                },
                {
                        "name": "Bhalka Teerth",
                        "description": "The site where Lord Krishna departed for Vaikuntha."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road and rail from Ahmedabad and Rajkot.",
                "nearestAirport": "Rajkot Airport (approx 200km).",
                "nearestRailway": "Somnath Railway Station."
        },
        "tips": [
                "Attend the evening Light and Sound show.",
                "Respect the dress code within the temple premises.",
                "Carry identity proof for security checks."
        ],
        "faqs": [
                {
                        "question": "Is photography allowed?",
                        "answer": "No, photography is strictly prohibited inside the temple complex."
                },
                {
                        "question": "How many times was the temple rebuilt?",
                        "answer": "The temple is traditionally said to have been rebuilt seven times across different eras."
                },
                {
                        "question": "What is the best time for Aarti?",
                        "answer": "The morning (7 AM), noon (12 PM), and evening (7 PM) Aartis are highly recommended."
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
    '4', 
    '{
        "spiritualEssence": "Kashi is not just a city; it is a state of being. It is believed that Varanasi stands on the tip of Lord Shiva''s Trishul, detached from the physical laws of the earth. The Vishwanath lingam is the luminous pillar of light (Jyotirlinga) that settled the cosmic dispute between Brahma and Vishnu.",
        "longDescription": "Varanasi is the oldest living city on Earth, continuously inhabited for over 3,000 years. The Kashi Vishwanath temple has been the spiritual heart of India through countless ages. The current structure was built by Queen Ahilyabai Holkar in 1780. Its two massive spires are covered in gold donated by Maharaja Ranjit Singh. The recent Vishwanath Corridor has opened the temple directly to the Mother Ganges.",
        "spiritualArchitecture": "The temple is a classic Nagara style structure with three distinct parts. The main spire is 15.5m high, and the gold plating adds a celestial radiance to the shrine. The Kashi Vishwanath Corridor is a modern architectural masterpiece connecting the Ghats to the Sanctum.",
        "vedicReferences": "Kashi is mentioned in the Rig Veda and the Skanda Purana (Kashi Khanda). It is the supreme site for attaining the Taraka Mantra directly from Lord Shiva.",
        "localLegends": "A profound lore tells of how Shiva and Parvati left Kailash to reside in Kashi because the Goddess was enamored with the city. Another legend states that Shiva carries Kashi on his trident during Pralaya to protect it.",
        "keyRituals": [
                {
                        "name": "Sapta Rishi Aarti",
                        "description": "A unique ritual where seven priests represent the celestial sages in worship."
                },
                {
                        "name": "Mangala Aarti",
                        "description": "The 3 AM awakening prayer, considered the most sacred moment for Darshan."
                },
                {
                        "name": "Ganga Jal Arpan",
                        "description": "The offering of sacred Ganges water over the Jyotirlinga."
                }
        ],
        "highlights": [
                {
                        "name": "Dashashwamedh Ghat",
                        "description": "The main Ghat where the daily evening Ganga Aarti is performed."
                },
                {
                        "name": "Manikarnika Ghat",
                        "description": "The most sacred site for cremation and spiritual transition."
                },
                {
                        "name": "Annapurna Temple",
                        "description": "The temple of the Goddess of Food, who feeds all of Kashi."
                }
        ],
        "travelInfo": {
                "bestTime": "November to February.",
                "howToReach": "Very well connected by air, rail, and road.",
                "nearestAirport": "Lal Bahadur Shastri Airport, Varanasi.",
                "nearestRailway": "Varanasi Junction / Pt. Deen Dayal Upadhyaya Junction."
        },
        "tips": [
                "Book Aarti tickets in advance online.",
                "Dress modestly and be prepared for narrow lanes.",
                "Hire a local guide to understand the deep history of the Ghats."
        ],
        "faqs": [
                {
                        "question": "How to reach the temple from the Ghat?",
                        "answer": "The new Kashi Vishwanath Corridor allows direct pedestrian access from the Lalita Ghat and Manikarnika Ghat."
                },
                {
                        "question": "Is there a VIP Darshan?",
                        "answer": "Yes, Sugam Darshan tickets can be purchased for a faster entry experience."
                },
                {
                        "question": "What is the Sapta Rishi Aarti time?",
                        "answer": "It is typically performed around 7:00 PM to 8:30 PM daily."
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
    '5', 
    '{
        "spiritualEssence": "Mahakal is the master of time and transformation. As the only south-facing Jyotirlinga, it represents the force that transcends death. The energy in Ujjain is visceral. It is where one realizes the eternal nature of the soul beyond the physical shell.",
        "longDescription": "Ujjain was the prime meridian of ancient India. The legend of Mahakal describes how the Lord appeared to destroy the demon Dushana. The Bhasma Aarti—where the deity is smeared with sacred ash—is the most famous ritual in the Hindu world, signifying that everything returns to ash but the divine consciousness.",
        "spiritualArchitecture": "The temple is a five-story structure. The lower level houses the Mahakaleshwar lingam, the middle level Omkareshwar, and the top level Nagchandreshwar. The architecture is a blend of Maratha, Bhumija, and Chalukya styles.",
        "vedicReferences": "Ujjain is extensively mentioned in the Puranas as Avantika. It is the site for the Simhastha Kumbh Mela every 12 years.",
        "localLegends": "No king is allowed to stay overnight in Ujjain, as Mahakal is the only True King. Historically, even royal families would stay outside the city limits to show respect to the Lord of Time.",
        "keyRituals": [
                {
                        "name": "Bhasma Aarti",
                        "description": "The world-famous pre-dawn ritual involving sacred ash (Bhasma)."
                },
                {
                        "name": "Jalabhishek",
                        "description": "Continuous pouring of water from several copper pots over the Lingam."
                },
                {
                        "name": "Panchamrut Abhishek",
                        "description": "Worship using five sacred liquids: milk, curd, honey, ghee, and sugar."
                }
        ],
        "highlights": [
                {
                        "name": "Harsiddhi Mata",
                        "description": "The Shakti Peeth where the upper lip of Sati fell."
                },
                {
                        "name": "Kaal Bhairav",
                        "description": "The fierce guardian of Ujjain who accepts liquor as an offering."
                },
                {
                        "name": "Ram Ghat",
                        "description": "The site of the Simhastha Kumbh Mela and the daily evening Aarti."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected to Indore (55km away) by road and rail.",
                "nearestAirport": "Devi Ahilya Bai Holkar Airport, Indore.",
                "nearestRailway": "Ujjain Junction."
        },
        "tips": [
                "Book Bhasma Aarti online weeks in advance.",
                "Avoid wearing leather items inside the temple.",
                "Male devotees must wear a dhoti for certain special Aartis."
        ],
        "faqs": [
                {
                        "question": "How to book Bhasma Aarti?",
                        "answer": "Booking can be done online via the official temple website or at the counter 24 hours in advance (subject to availability)."
                },
                {
                        "question": "Is there a dress code?",
                        "answer": "Yes, for Bhasma Aarti and certain rituals, traditional wear (Dhoti for men, Saree for women) is mandatory."
                },
                {
                        "question": "Why does the lingam face south?",
                        "answer": "South is the direction of Yama (Death). Facing south signifies that Mahakal is the conqueror of Death."
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
    '6', 
    '{
        "spiritualEssence": "Dwarka is the realm of the Jagadguru. It is where the divine took on the role of a king to establish Dharma. The sea breeze at Dwarka is believed to carry the vibrations of the Bhagavad Gita.",
        "longDescription": "The city was built by Vishwakarma. After Krishna''s departure, the original city was reclaimed by the sea. The current Dwarkadhish Temple (Jagat Mandir) is a five-storied limestone structure rising majestically against the sea.",
        "spiritualArchitecture": "The temple is supported by 72 pillars and built using sand-colored limestone. The Dhwaja (flag) is changed five times a day, a major ritual in itself. The temple has two gates: Swarga Dwar (Gate to Heaven) and Moksha Dwar (Gate to Liberation).",
        "vedicReferences": "Dwarka is mentioned in the Mahabharata and the Harivamsa. It is the site of the spiritual kingdom established after Krishna left Mathura.",
        "localLegends": "Lore speaks of Gopi Talav where the soil turned yellow (Gopi Chandan) when Gopis merged into the earth. The Rukmini temple stands outside the city due to a curse by Sage Durvasa.",
        "keyRituals": [
                {
                        "name": "Dhwaja Arohan",
                        "description": "The complex ceremony of hoisting the new temple flag."
                },
                {
                        "name": "Shringar Aarti",
                        "description": "The morning ritual where the Lord is dressed in royal finery."
                },
                {
                        "name": "Gomti Snan",
                        "description": "Purifying bath in the Gomti river confluence."
                }
        ],
        "highlights": [
                {
                        "name": "Bet Dwarka",
                        "description": "The island where Krishna''s residence is believed to have been located."
                },
                {
                        "name": "Nageshwar Jyotirlinga",
                        "description": "One of the 12 Jyotirlingas, located nearby."
                },
                {
                        "name": "Gopi Talav",
                        "description": "The sacred pond associated with the Gopis of Vrindavan."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by rail to major Indian cities; nearest airport is Jamnagar (137km).",
                "nearestAirport": "Jamnagar Airport.",
                "nearestRailway": "Dwarka Railway Station."
        },
        "tips": [
                "Visit the Sudama Setu for a great view of the temple and the sea.",
                "Book a boat for Bet Dwarka early in the morning.",
                "Buy local handicrafts and Gopi Chandan as souvenirs."
        ],
        "faqs": [
                {
                        "question": "How to go to Bet Dwarka?",
                        "answer": "You need to take a ferry from Okha jetty, which is about 30km from Dwarka city."
                },
                {
                        "question": "What is the significance of the flag?",
                        "answer": "The flag features the sun and moon, signifying that Krishna''s kingdom will last as long as they exist in the sky."
                },
                {
                        "question": "Is the original city underwater?",
                        "answer": "Yes, marine archeology has found large structures and stone blocks off the coast of Dwarka."
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
    '7', 
    '{
        "spiritualEssence": "Puri is the realm of Prema (divine love). Jagannath is the deity with no eyelids, never closing them on his devotees. The energy is joyful and communal.",
        "longDescription": "Built in the 12th century, the temple is a masterpiece of Kalinga architecture. The deities are replaced every 19 years in the Nabakalebara ritual. The temple kitchen is the world''s largest, where food is cooked in earthen pots stacked one upon another.",
        "spiritualArchitecture": "The temple spire is 214 feet high. The Nilachakra atop the temple is made of eight metals. A unique feature is that the flag always flutters against the direction of the wind.",
        "vedicReferences": "Puri is identified as Purushottama Kshetra in the Rig Veda and Skanda Purana.",
        "localLegends": "The deities are believed to contain the ''Brahma Padartha''—the divine soul transferred during the Nabakalebara. Legend says the heart of Krishna remained unburnt and was recovered here.",
        "keyRituals": [
                {
                        "name": "Ratha Yatra",
                        "description": "The annual chariot festival meeting millions of devotees."
                },
                {
                        "name": "Chhera Pahanra",
                        "description": "The sweeping of chariots by the King of Puri."
                },
                {
                        "name": "Mahaprasad Seva",
                        "description": "Partaking in the food cooked in earthen pots on wood fire."
                }
        ],
        "highlights": [
                {
                        "name": "Konark Sun Temple",
                        "description": "The 13th-century world heritage site nearby."
                },
                {
                        "name": "Chilika Lake",
                        "description": "Asia''s largest brackish water lagoon."
                },
                {
                        "name": "Puri Beach",
                        "description": "Famous for its golden sands and the annual beach festival."
                }
        ],
        "travelInfo": {
                "bestTime": "June to March.",
                "howToReach": "Well connected by rail to major cities; nearest airport is Bhubaneswar (60km).",
                "nearestAirport": "Biju Patnaik International Airport, Bhubaneswar.",
                "nearestRailway": "Puri Railway Station."
        },
        "tips": [
                "Don''t miss the Mahaprasad at Ananda Bazar.",
                "Hire an authorized temple guide (Panda) for a smooth visit.",
                "Be prepared for large crowds, especially during festivals."
        ],
        "faqs": [
                {
                        "question": "Can non-Hindus enter the temple?",
                        "answer": "No, only practicing Hindus are allowed inside the main Jagannath temple complex."
                },
                {
                        "question": "What is the Mahaprasad?",
                        "answer": "It is the food offered to Lord Jagannath, cooked in a unique way in 7 pots stacked over each other."
                },
                {
                        "question": "When is the Rath Yatra?",
                        "answer": "It typically takes place in June or July each year."
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
    '8', 
    '{
        "spiritualEssence": "Rameswaram is the sanctuary of atonement. Rama sought to cleanse the sin of killing Ravana here. Walking through the 22 Teerthams is a physical act of internal cleansing.",
        "longDescription": "The Ramanathaswamy Temple features the longest corridor in the world. The main lingam was fashioned by Sita from sand, while the second was brought by Hanuman from Kashi. It is also one of the 51 Shakti Peeths.",
        "spiritualArchitecture": "The corridors total nearly 4,000 feet with over 1,200 carved granite pillars. The temple is a pinnacle of Dravidian architecture.",
        "vedicReferences": "Rameswaram is a central site in the Valmiki Ramayana and Skanda Purana.",
        "localLegends": "Lore tells of the Sethu Bandhanam where even a squirrel helped Rama. Another legend states Rama marked the spot for the 22 wells with his arrow.",
        "keyRituals": [
                {
                        "name": "22 Teertham Snanam",
                        "description": "Bathing in the 22 sacred wells in a specific sequence."
                },
                {
                        "name": "Mani Darshanam",
                        "description": "Early morning viewing of the Crystal Lingam."
                },
                {
                        "name": "Sethu Snanam",
                        "description": "Holy dip in the Agni Teertham (sea) before temple entry."
                }
        ],
        "highlights": [
                {
                        "name": "Dhanushkodi",
                        "description": "The ghost town at the edge of the island where the two oceans meet."
                },
                {
                        "name": "Pamban Bridge",
                        "description": "The iconic railway bridge connecting the island to the mainland."
                },
                {
                        "name": "Kothandaramaswamy Temple",
                        "description": "Where Vibhishana surrendered to Rama."
                }
        ],
        "travelInfo": {
                "bestTime": "October to April.",
                "howToReach": "Well connected by road and rail from Madurai and Chennai.",
                "nearestAirport": "Madurai Airport (approx 170km).",
                "nearestRailway": "Rameswaram Railway Station."
        },
        "tips": [
                "Wear quick-drying clothes for the 22 wells bath.",
                "Hire a guide to navigate the vast temple complex efficiently.",
                "Visit Dhanushkodi during the early morning for the best views."
        ],
        "faqs": [
                {
                        "question": "How long does the 22 wells bath take?",
                        "answer": "It usually takes about 1 to 2 hours depending on the crowd."
                },
                {
                        "question": "Can we take a bath in the sea?",
                        "answer": "Yes, Agni Teertham is the sacred sea-front for the holy dip."
                },
                {
                        "question": "Are there lockers available?",
                        "answer": "Yes, there are cloakrooms and lockers near the temple entrance for your belongings."
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
    'Potala Palace', 
    'potala-palace', 
    'Sacred Destination', 
    'int', 
    'The supreme winter residence of the Dalai Lama and the crown of Himalayan Buddhism, the Potala Palace in Lhasa is a site of absolute spiritual sovereignty. Built atop the Red Hill, it is a spectacular fortress-monastery containing thousands of rooms, golden stupas, and the sacred tombs of the past incarnations, representing the heart of the Tibetan soul.', 
    '680.5', 
    '150.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Fortress of the Dharma and the Highest Palace on Earth', 
    'Potala Palace Lhasa | Tibet, Dalai Lama & Ancient Lore', 
    'Experience the profound majesty of the Potala Palace. Discover the seat of the Dalai Lama, the golden stupas, and the profound energy of the Tibetan pilgrimage.', 
    'Potala Palace, Lhasa, Tibet, Dalai Lama, Buddhist, Himalayan, Ancient Lore, Stupa', 
    '188', 
    '{
        "spiritualEssence": "The Potala Palace is the manifestation of the divine as the supreme authority and the absolute preservation of the Himalayan wisdom. The energy here is high-altitude, cold, and intensely golden. It is the site where the temporal and the spiritual realms were unified under the gaze of Avalokiteshvara. The vibration is one of ''Om Mani Padme Hum'' and the absolute resilience of the Tibetan spirit. As a massive red and white fortress overlooking the Lhasa valley, it represents the spiritual lighthouse of the roof of the world. A visit here is believed to grant the devotee the absolute connection to the lineage of the enlightened masters and the blessing of the compassion of the Buddha. The air is always vibrant with the scent of the yak-butter lamps and the silent, heavy energy of the sacred scriptures.",
        "longDescription": "The Potala Palace was first built by King Songtsen Gampo in the 7th century and expanded by the 5th Dalai Lama in 1645. It is divided into the White Palace (the secular administrative wing) and the Red Palace (the spiritual wing dedicated to religious study and prayer). The Red Palace houses several spectacular golden stupas containing the remains of past Dalai Lamas, and the Great West Hall featuring murals of the 17th century. The palace is an architectural marvel, with walls that slope inward to withstand earthquakes and a complex system of internal courtyards. Despite its status as a museum today, it remains the most potent symbol of Tibetan Buddhism and a site of intense secret rituals and historical continuity.",
        "spiritualArchitecture": "The architecture of the Potala is a spectacular display of the traditional Tibetan fortress (Dzong) style. It is built entirely of stone, wood, and earth, without a single iron nail. The architecture is designed to emphasize the verticality and the integration with the Red Hill. A unique feature is the use of white and red colors to distinguish the different functions of the palace. The interiors feature thousands of exquisite murals, thankas, and statues of the Buddhas and Bodhisattvas. The architecture is designed to lead the pilgrim through a maze of narrow corridors and steep ladders, culminating in the golden roofs that shine across the valley. The palace is a masterpiece of Himalayan engineering and spiritual aesthetic.",
        "vedicReferences": "Potala is named after Mount Potalaka, the mythical mountain abode of the Bodhisattva Avalokiteshvara in the Buddhist scriptures.",
        "deepInsights": "The Potala represents the truth that the highest spiritual achievements are often housed in the most defensive and resilient structures. It teaches that the heart of the Dharma is protected by the strength of the community.",
        "ancientLore": "Lore tells that the palace has a secret tunnel that leads to the mystical kingdom of Shambhala. Another legend says that the 5th Dalai Lama personally supervised the construction through his spiritual powers, moving massive stones with the help of the mountain spirits.",
        "keyRituals": [
            {"name": "Potala Kora", "description": "The ritual of circumambulating the base of the palace hill while spinning the prayer wheels."},
            {"name": "Butter Lamp Offering", "description": "Lighting lamps inside the Red Palace to illuminate the path of wisdom and remove the darkness of ignorance."},
            {"name": "Sutra Recitation (Phakpa Lhakhang)", "description": "The ritual of chanting the ancient scriptures in the most sacred and oldest room of the palace."},
            {"name": "Dalai Lama Throne Blessing", "description": "The act of bowing before the vacant throne to acknowledge the continuity of the spiritual lineage."}
        ],
        "highlights": [
            {"name": "The Red Palace", "description": "The spiritual heart of the Potala, housing the tombs and the sacred halls."},
            {"name": "The Golden Stupas", "description": "The massive, jewel-encrusted memorials of the past Dalai Lamas."},
            {"name": "Phakpa Lhakhang", "description": "The 7th-century chapel that is the oldest part of the palace, housing a sacred sandalwood statue of Avalokiteshvara."},
            {"name": "The White Palace", "description": "The living quarters and administrative center of the Dalai Lamas."}
        ],
        "travelInfo": {
            "bestTime": "May to October (avoiding the extreme winter).",
            "howToReach": "Well connected by the Qinghai-Tibet railway and Lhasa Gonggar Airport. Foreign travelers require a Tibet Travel Permit (TTP) and must be on a guided tour.",
            "nearestAirport": "Lhasa Gonggar Airport.",
            "nearestRailway": "Lhasa Railway Station."
        },
        "tips": [
            "Be mindful of the high altitude (3,700m); spend a few days in Lhasa to acclimatize before attempting the steep stairs of the Potala.",
            "Photography is strictly prohibited inside the rooms of the palace; respect the regulations and focus on the spiritual atmosphere.",
            "Tickets are limited and must be booked in advance; be prepared for a strictly timed visit."
        ],
        "faqs": [
            {"question": "Does the Dalai Lama live there?", "answer": "No, the current 14th Dalai Lama has lived in exile in India since 1959, but the palace remains his official seat."},
            {"question": "How many rooms are in the Potala?", "answer": "It is traditionally said to have 1,000 rooms, though the exact count is slightly less."},
            {"question": "Why is it white and red?", "answer": "White symbolizes peace and administration, while Red symbolizes power, spiritual study, and the sacredness of the religious halls."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Kalady', 
    'kalady', 
    'Sacred Destination', 
    'kl', 
    'The birthplace of the great philosopher-saint Adi Shankaracharya, Kalady is the fountainhead of Advaita Vedanta. Located on the banks of the Periyar river in Kerala, it is a site of absolute intellectual brilliance and spiritual simplicity, where the non-dualistic philosophy was first breathed into the world by a young boy who would redefine Indian thought.', 
    '340.2', 
    '880.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Birthplace of the Master and the Source of Advaita', 
    'Kalady | Kerala, Adi Shankara & Ancient Lore', 
    'Experience the profound wisdom of Kalady. Discover the birthplace of Adi Shankara, the Purna river legend, and the profound energy of the Advaita pilgrimage.', 
    'Kalady, Kerala, Adi Shankara, Advaita Vedanta, Periyar, Hindu Pilgrimage, Ancient Lore, Sringeri', 
    '189', 
    '{
        "spiritualEssence": "Kalady is the manifestation of the divine as the supreme intellect and the absolute unity of the soul. The energy here is serene, green, and intensely logical. It is the site where the illusion of duality was first challenged. The vibration is one of ''Aham Brahmasmi'' (I am Brahman) and the absolute clarity of the truth. As a town of lush coconut groves and the quiet waters of the Periyar, it represents the spiritual cradle of modern Hinduism. A visit here is believed to grant the devotee the absolute precision of the spirit and the blessing of the master''s grace. The air is always vibrant with the scent of the temple oil and the constant, rhythmic chanting of the Saundarya Lahari.",
        "longDescription": "Kalady was a forgotten village until it was rediscovered by the 33rd Acharya of Sringeri Sharada Peetham in the late 19th century. The site marks the location where Adi Shankara was born in the 8th century. The central point is the Adi Shankara Keerthi Stambha Mandapam, a massive eight-storied tower that tells the life of the master through relief carvings. The Crocodile Ghat on the Periyar river is where Shankara is said to have been caught by a crocodile to convince his mother to let him take Sanyasa (renunciation). The town also features the shrines of Shankara and Goddess Sharadamba, and the ancient Krishna temple where Shankara''s family worshipped. Kalady is a site where the highest philosophy and the most intimate personal history of a saint are unified in a landscape of water and light.",
        "spiritualArchitecture": "The architecture of Kalady is a spectacular display of the traditional Kerala style with modern commemorative structures. The Keerthi Stambha Mandapam is a unique architectural landmark, an eight-sided tower featuring a series of spiral steps and circular galleries. A unique feature is the use of the traditional sloping tiled roofs and the wooden carvings in the main shrines. The shrines are designed to be simple and meditative, focusing on the presence of the master. The architecture of the Crocodile Ghat is simple and natural, integrating the spiritual story with the flow of the river. The complex is designed to be a center of learning as much as a place of worship, with spacious halls for the study of the Upanishads.",
        "vedicReferences": "Kalady is celebrated in the Shankara Digvijaya as the sacred site where the divine manifestation of Shiva took birth as the teacher of the world.",
        "deepInsights": "The incident of the crocodile represents the truth that the spiritual call often requires a dramatic and absolute surrender. Kalady teaches that the highest wisdom is accessible even to the youngest heart.",
        "ancientLore": "Lore tells that the young Shankara diverted the course of the Periyar river so that his aging mother would not have to walk far for her daily bath. Another legend says that the Goddess Lakshmi personally appeared here to shower golden gooseberries (Kanakadhara) on a poor lady after Shankara sang a hymn for her.",
        "keyRituals": [
            {"name": "Shankara Jayanti", "description": "The grand annual celebration of the birth of Adi Shankara, featuring massive philosophical debates and recitations."},
            {"name": "Periyar Snanam", "description": "The ritual bath in the sacred river at the Crocodile Ghat to seek the courage of renunciation."},
            {"name": "Kanakadhara Stotra Chanting", "description": "The collective recitation of the hymn for prosperity and divine grace at the site of the miracle."},
            {"name": "Vedic Study Vrata", "description": "Spending time in the Kalady Pathashala to study the commentaries of the master."}
        ],
        "highlights": [
            {"name": "Keerthi Stambha Mandapam", "description": "The 8-storied tower that is the iconic landmark of the town."},
            {"name": "Crocodile Ghat", "description": "The exact spot on the river where the life of Shankara took its spiritual turn."},
            {"name": "Shrine of the Mother", "description": "The temple dedicated to Aryamba, the mother of Shankara, representing the sanctity of the parent."},
            {"name": "Ancient Krishna Temple", "description": "The family deity of the master, which still remains an active center of worship."}
        ],
        "travelInfo": {
            "bestTime": "September to March.",
            "howToReach": "10km from Cochin International Airport and 45km from Kochi city. Well connected by road; regular buses and taxis run from Kochi.",
            "nearestAirport": "Cochin International Airport (COK).",
            "nearestRailway": "Angamaly Railway Station / Aluva Railway Station."
        },
        "tips": [
            "Visit the Keerthi Stambha Mandapam in the evening for a panoramic view of the Kerala landscape.",
            "Participate in the morning rituals at the Sringeri Math to experience the authentic Vedic atmosphere of the site.",
            "Kalady is a center of active learning; respect the students and the teachers in the various pathashalas."
        ],
        "faqs": [
            {"question": "Who was Adi Shankaracharya?", "answer": "He was an 8th-century philosopher-saint who consolidated the doctrine of Advaita Vedanta and established four major monasteries across India."},
            {"question": "What is the legend of the crocodile?", "answer": "A crocodile caught Shankara''s leg in the river, and he told his mother he would be released only if she allowed him to become a monk."},
            {"question": "What is the Kanakadhara miracle?", "answer": "Shankara sang a hymn to Lakshmi, who then rained golden amlas (gooseberries) on a poor lady''s house."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Thiruvanaikaval', 
    'thiruvanaikaval-temple', 
    'Sacred Destination', 
    'tn', 
    'One of the five Pancha Bhuta Sthalams, Thiruvanaikaval represents the Water element (Appu Lingam). Located near Trichy, it is a site of absolute divine mystery where the Shiva Lingam is perpetually submerged in water from a natural spring, representing the cooling presence of the divine and the legendary devotion of an elephant and a spider.', 
    '580.2', 
    '810.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Temple of the Water Element and the Sacred Jambu Tree', 
    'Thiruvanaikaval Temple | Tamil Nadu, Water Element & Ancient Lore', 
    'Experience the profound energy of Thiruvanaikaval. Discover the Appu Lingam, the legend of the elephant and the spider, and the profound energy of the Pancha Bhuta pilgrimage.', 
    'Thiruvanaikaval, Tamil Nadu, Water Element, Shiva, Pancha Bhuta, Hindu Pilgrimage, Ancient Lore, Trichy', 
    '190', 
    '{
        "spiritualEssence": "Thiruvanaikaval is the manifestation of the divine as the supreme fluidity and the absolute coolness of the cosmic flow. The energy here is moist, calm, and intensely purifying. It is the site where the fire of existence is tempered by the grace of the water. The vibration is one of ''Shantih'' (Peace) and the absolute washing away of the karmic heat. As a temple set within five massive concentric walls, it represents the spiritual fortress of the Chola heartland. A visit here is believed to grant the devotee the absolute emotional balance and the blessing of spiritual purity. The air is always vibrant with the scent of the wet stone and the constant, rhythmic chanting of the Panchakshari Mantra.",
        "longDescription": "The Jambukeswarar Temple at Thiruvanaikaval is one of the most revered Shiva temples in South India. The central deity, an Appu Lingam (Water Lingam), is housed in a sanctum where a perennial spring keeps the Lingam submerged, even in summer. Legend tells of an elephant and a spider who both worshipped the Lingam under a Jambu tree; the spider wove a web to protect it from leaves, while the elephant washed it with river water. In their competition, both attained liberation. The temple is also unique because the Goddess Akilandeswari is the primary teacher here, and the priests perform the midday rituals dressed as a woman to honor her. The temple is a massive complex of 18 acres, featuring spectacular Chola architecture and the sacred Jambu tree that is believed to be thousands of years old.",
        "spiritualArchitecture": "The architecture of Thiruvanaikaval is a spectacular display of the early and medieval Chola styles. It features five massive enclosures (Prakarams) with seven grand Gopurams. A unique feature is the use of the monolithic stone pillars with intricate carvings of the yali and the various forms of Shiva. The main sanctum is a masterpiece of hydraulic engineering, allowing the underground spring to flow around the Lingam without flooding the temple. The architecture is designed to lead the pilgrim through a sequence of increasingly cool and dark spaces, reflecting the nature of the water element. The massive stone walls and the expansive temple tanks create a sense of a spiritual city that is anchored in the earth and the water.",
        "vedicReferences": "Thiruvanaikaval is celebrated in the Tevaram hymns of the Nayanars as the supreme site where the Lord manifests as the life-giving water.",
        "deepInsights": "The perpetually submerged Lingam represents the truth that the divine is always accessible through the medium of purity and grace. Thiruvanaikaval teaches that the smallest effort (like the spider''s web) is as valuable as the grandest offering (like the elephant''s water).",
        "ancientLore": "Lore tells that the spider was reborn as the Chola King Kochenganan, who built 78 temples for Shiva, ensuring that an elephant could never enter the inner sanctum. Another legend says that the Goddess Parvati personally performed penance here to receive the knowledge of the soul from Lord Shiva.",
        "keyRituals": [
            {"name": "Pancha Bhuta Abhishekam", "description": "The special offering of water to the Appu Lingam to celebrate its elemental power."},
            {"name": "Akilandeswari Midday Puja", "description": "The unique ritual where the priest dresses as the Goddess to perform the prayers at the Shiva shrine."},
            {"name": "Jambu Tree Pradakshina", "description": "The ritual of walking around the ancient sacred tree to seek the longevity of the soul."},
            {"name": "Floating Festival (Teppotsavam)", "description": "The grand celebration where the deities are taken on a decorated float in the massive temple tank."}
        ],
        "highlights": [
            {"name": "The Appu Lingam", "description": "The sacred water Lingam that is perpetually submerged in a natural spring."},
            {"name": "Akilandeswari Shrine", "description": "The magnificent shrine of the Goddess, one of the primary seats of Shakti in the South."},
            {"name": "The Fourth Prakaram Wall", "description": "A massive stone wall built by Lord Shiva himself, according to tradition, using the vibhuti (sacred ash) of the devotees."},
            {"name": "The Thousand-Pillar Hall", "description": "A spectacular hall featuring exquisite Chola stone carvings and structural grandeur."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "Adjacent to Srirangam and 5km from Trichy city center. Well connected by road; regular buses and taxis run from Trichy.",
            "nearestAirport": "Tiruchirappalli International Airport (TRZ).",
            "nearestRailway": "Srirangam Railway Station / Trichy Junction."
        },
        "tips": [
            "Visit during the midday puja to see the unique ritual of the priest dressing as the Goddess.",
            "The temple is very large; allocate at least 2-3 hours to see the outer walls and the various shrines.",
            "Combine your visit with the nearby Srirangam temple for a complete Vaishnava-Shaiva spiritual day."
        ],
        "faqs": [
            {"question": "What is the Appu Lingam?", "answer": "It is the Shiva Lingam that represents the element of Water, one of the five elements of nature."},
            {"question": "Why did the priest dress like a woman?", "answer": "To symbolize the Goddess Akilandeswari performing the daily puja to her Lord and teacher, Shiva."},
            {"question": "Is the water always there?", "answer": "Yes, a natural underground spring constantly feeds the inner sanctum, ensuring the Lingam is always in contact with water."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Halebidu (Hoysaleswara)', 
    'halebidu-temple', 
    'Sacred Destination', 
    'ka', 
    'The pinnacle of Hoysala stone-craft, Halebidu is home to the spectacular Hoysaleswara temple. Located in the Hassan district of Karnataka, it is a site of absolute artistic perfection where every inch of the soapstone is carved with breathtaking detail, representing the spiritual peak of the 12th century and the indestructible beauty of the Kalinga-Dravida fusion.', 
    '440.2', 
    '830.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Jewel of the Hoysalas and the Epic in Stone', 
    'Halebidu Temple | Karnataka, Architecture & Ancient Lore', 
    'Experience the profound beauty of Halebidu. Discover the Hoysaleswara temple, the soapstone carvings, and the profound energy of the artistic pilgrimage.', 
    'Halebidu, Karnataka, Hoysala, Shiva, Architecture, Hindu Pilgrimage, Ancient Lore, Soapstone', 
    '191', 
    '{
        "spiritualEssence": "Halebidu is the manifestation of the divine as the supreme craftsmanship and the absolute patience of the creative spirit. The energy here is intricate, tactile, and intensely detailed. It is the site where the hard stone was made to flow like poetry. The vibration is one of ''Kala'' (Art) and the absolute dedication of the human hand to the divine service. As a temple complex set in a quiet, green landscape, it represents the spiritual treasury of the Deccan. A visit here is believed to grant the devotee the absolute appreciation of the divine beauty and the blessing of the creative muse. The air is always vibrant with the scent of the dry earth and the silent, heavy energy of the millions of carved figures.",
        "longDescription": "Halebidu, formerly known as Dorasamudra, was the capital of the Hoysala Empire. The Hoysaleswara temple, built in the 12th century, is a double temple dedicated to Shiva. It is famous for its exterior walls which are covered with thousands of relief carvings of animals, deities, and scenes from the Ramayana and Mahabharata. No two carvings are identical. The temple is built of chloritic schist (soapstone), which is soft when quarried but hardens on exposure. Despite being sacked multiple times, the temple stands as a testament to the resilience of the Hoysala spirit. The site also features several Jain Basadis and the Kedareshwara temple, making it a site where the diverse spiritual paths of the medieval Deccan found a common artistic language.",
        "spiritualArchitecture": "The architecture of Halebidu is a spectacular display of the Hoysala style, characterized by its star-shaped (stellate) platform and the intricate friezes. The temple features two identical sanctums connected by a common hall. A unique feature is the use of the lathe-turned pillars, which are so precise they appear to be made of metal. The exterior friezes are organized in horizontal layers, starting with elephants at the base for strength, then lions for courage, followed by horses and floral motifs. The architecture is designed to lead the pilgrim in a slow, meditative circumambulation of the exterior before entering the dark, cool interior. The massive Nandi statues at the entrance are among the largest and most beautifully carved in the world.",
        "vedicReferences": "Halebidu is celebrated in the historical and spiritual context as the site where the Vedic stories were given their most detailed physical form in the history of the world.",
        "deepInsights": "The infinite variety of the carvings represents the truth that the divine manifests in a billion forms yet remains a single reality. Halebidu teaches that the highest meditation is the absolute focus on the detail of the work.",
        "ancientLore": "Lore tells that the sculptor Jakanachari personally carved the entire complex in a single night with the help of a divine lamp. Another legend says that the temple was never finished because the gods themselves were jealous of its perfection.",
        "keyRituals": [
            {"name": "Nandi Pujan", "description": "Offering prayers at the massive and spectacularly carved Nandi statues to seek the strength of the spirit."},
            {"name": "Stellar Pradakshina", "description": "The ritual of walking around the star-shaped platform while reflecting on the epic stories carved into the walls."},
            {"name": "Soapstone Meditation", "description": "Sitting in the dark interior of the temple to experience the silence of the lathe-turned pillars."},
            {"name": "Shivratri at Halebidu", "description": "The grand annual celebration of the Lord of the Hoysalas, featuring music and traditional dance."}
        ],
        "highlights": [
            {"name": "Hoysaleswara Temple", "description": "The magnificent twin temple that is the architectural centerpiece of the site."},
            {"name": "The Exterior Friezes", "description": "The horizontal layers of carvings that cover the entire exterior of the temple."},
            {"name": "The Lathe-Turned Pillars", "description": "The perfectly circular and polished stone pillars inside the temple hall."},
            {"name": "The Monolithic Nandi", "description": "The two massive and intricately detailed stone bulls that guard the temple."},
            {"name": "Jain Basadis", "description": "The nearby ancient Jain temples that show the diversity of the Hoysala spiritual world."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "31km from Hassan and 210km from Bangalore. Well connected by road; regular buses run from Hassan and Bangalore.",
            "nearestAirport": "Bangalore International Airport (BLR).",
            "nearestRailway": "Hassan Railway Station."
        },
        "tips": [
            "Use a high-quality flashlight or the guide''s lamp to see the details of the carvings in the darker parts of the temple.",
            "The site is a paradise for photography; visit in the early morning for the best light on the exterior walls.",
            "Respect the sanctity of the sanctums; although it is a historical site, it remains an active place of worship."
        ],
        "faqs": [
            {"question": "Why is it called Halebidu?", "answer": "The name means ''Old City'' in Kannada, referring to its status after the capital was moved."},
            {"question": "What is soapstone?", "answer": "It is a type of metamorphic rock that is easy to carve but becomes extremely durable over time."},
            {"question": "Are there other temples nearby?", "answer": "Yes, the Belur Chennakesava temple is only 16km away and is its architectural twin."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Belur (Chennakesava)', 
    'belur-temple', 
    'Sacred Destination', 
    'ka', 
    'The first capital of the Hoysala Empire, Belur is home to the stunning Chennakesava temple. Located on the banks of the Yagachi river, it is a site of absolute Vaishnava grace and architectural bravado, famous for its exquisite bracket figures (Madanikas) and the monumental gopuram that marks the beginning of the Hoysala golden age.', 
    '430.2', 
    '840.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Beautiful Vishnu and the Pinnacle of the Hoysala Art', 
    'Belur Temple | Karnataka, Vishnu & Ancient Lore', 
    'Experience the profound grace of Belur. Discover the Chennakesava temple, the Madanika figures, and the profound energy of the Vaishnava pilgrimage.', 
    'Belur, Karnataka, Hoysala, Vishnu, Architecture, Hindu Pilgrimage, Ancient Lore, Madanika', 
    '192', 
    '{
        "spiritualEssence": "Belur is the manifestation of the divine as the supreme beauty and the absolute refinement of the Vaishnava spirit. The energy here is elegant, royal, and intensely celebratory. It is the site where the victory of the Dharma was celebrated through the perfection of the stone. The vibration is one of ''Saundarya'' (Beauty) and the absolute joy of the divine presence. As a temple set within a massive courtyard, it represents the spiritual heart of the Malnad region. A visit here is believed to grant the devotee the absolute refinement of the character and the blessing of the divine protector. The air is always vibrant with the scent of the temple jasmine and the silent, heavy energy of the 12th-century stone.",
        "longDescription": "The Chennakesava Temple at Belur was commissioned by King Vishnuvardhana in 1117 CE to celebrate his victory over the Cholas and his conversion to Vaishnavism under the influence of Ramanujacharya. The name ''Chennakesava'' means ''The Beautiful Vishnu''. The temple is famous for its 42 Madanika (bracket) figures, depicting celestial dancers in various poses of incredible complexity and grace. The main temple is built on a raised platform and features a spectacular circular hall with a domed ceiling. Unlike Halebidu, Belur has remained a living temple for over 900 years. The site includes several smaller shrines dedicated to the various incarnations of Vishnu and the Goddess, making it a complete Vaishnava universe in stone.",
        "spiritualArchitecture": "The architecture of Belur is a spectacular display of the early Hoysala style. The main temple is star-shaped and built of soapstone. A unique feature is the use of the Mohini pillar, which is carved with such precision that it features a small gap through which a thread can be passed. The domed ceiling of the main hall is a masterpiece of concentric circles and relief carvings. The Madanika figures are the highlight, showing a level of anatomical detail and ornamentation that is unparalleled in world art. The architecture is designed to lead the pilgrim from the grand, 11-storied gopuram (a later addition) to the intimate and beautifully lit sanctum where the 6-foot tall idol of Vishnu resides.",
        "vedicReferences": "Belur is celebrated in the Vaishnava literature as the site where the supreme beauty of the Lord was captured in stone to inspire the heart of the devotee.",
        "deepInsights": "The Madanika figures represent the truth that the divine beauty is reflected in the grace of the human form and the arts. Belur teaches that the worship of the beautiful is a direct path to the divine.",
        "ancientLore": "Lore tells that the sculptor Jakanachari discovered that the main idol had a flaw, and he cut off his own hand in penance before the divine restored it and the idol was perfected. Another legend says that the temple is protected by a golden eagle that appears in the sky during important festivals.",
        "keyRituals": [
            {"name": "Chennakesava Abhishekam", "description": "The elaborate ritual bath of the beautiful Vishnu idol with sacred waters and oils."},
            {"name": "Madanika Parikrama", "description": "The ritual of walking around the exterior to contemplate the 42 bracket figures and their spiritual meanings."},
            {"name": "Yagachi River Snanam", "description": "Taking a holy dip in the river that flows past the temple to purify the body before darshan."},
            {"name": "Rathotsavam (Belur)", "description": "The grand annual chariot festival where the deity is taken through the streets of the old town."}
        ],
        "highlights": [
            {"name": "Chennakesava Shrine", "description": "The heart of the temple housing the spectacularly beautiful idol of Vishnu."},
            {"name": "The 42 Madanikas", "description": "The world-famous bracket figures that are the peak of Hoysala stone-work."},
            {"name": "The Narasimha Pillar", "description": "A lathe-turned pillar that once used to rotate on its axis."},
            {"name": "The Domed Ceiling", "description": "An incredible stone dome featuring the various incarnations of the Lord."},
            {"name": "The Deepa Stambha", "description": "A gravity-defying stone pillar that stands in the courtyard without any foundation."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "38km from Hassan and 220km from Bangalore. Well connected by road; regular buses run from Hassan and Bangalore.",
            "nearestAirport": "Bangalore International Airport (BLR).",
            "nearestRailway": "Hassan Railway Station."
        },
        "tips": [
            "Spend time observing the Madanika figures; each one has a specific name and a story (e.g., the lady with the mirror, the lady with the parrot).",
            "Hire a certified guide to point out the hidden details in the carvings, such as the rotating pillar and the Mohini figure.",
            "Belur is a living temple; be respectful of the ongoing rituals and follow the dress code."
        ],
        "faqs": [
            {"question": "Who was King Vishnuvardhana?", "answer": "He was the greatest king of the Hoysala dynasty who established the empire''s cultural and military supremacy."},
            {"question": "Is it different from Halebidu?", "answer": "Yes, Belur is a living Vaishnava temple, while Halebidu is primarily a Shaiva historical site, though both share the same artistic style."},
            {"question": "How long did it take to build?", "answer": "The main temple took over 103 years to complete across three generations of kings."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Tiruttani', 
    'tiruttani-temple', 
    'Sacred Destination', 
    'tn', 
    'One of the six Arupadai Veedu (holy abodes) of Lord Murugan, Tiruttani is the site of absolute peace. Located on a hill in the Tiruvallur district of Tamil Nadu, it is where the Lord stayed after his victory over the demon Surapadman, choosing the silence of the hill to cool his righteous anger and marry the maiden Valli.', 
    '590.2', 
    '780.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Abode of Divine Peace and the Marriage of Valli', 
    'Tiruttani Temple | Tamil Nadu, Murugan & Ancient Lore', 
    'Experience the profound serenity of Tiruttani. Discover the hill abode of Murugan, the legend of the elephant vahanam, and the profound energy of the Murugan pilgrimage.', 
    'Tiruttani, Tamil Nadu, Murugan, Arupadai Veedu, Hindu Pilgrimage, Ancient Lore, Valli, Peace', 
    '193', 
    '{
        "spiritualEssence": "Tiruttani is the manifestation of the divine as the supreme peace and the absolute rest of the warrior. The energy here is calm, elevated, and intensely marital. It is the site where the spear (Vel) was laid down in the garden of the heart. The vibration is one of ''Thanihai'' (Calming) and the absolute sweetness of the divine union. As a temple set atop a hill with 365 steps, it represents the spiritual ascent of the year and the soul. A visit here is believed to grant the devotee the absolute removal of all mental agitation and the blessing of a happy family life. The air is always vibrant with the scent of the mountain herbs and the constant, rhythmic chanting of the Thirupugazh.",
        "longDescription": "Tiruttani is the fifth of the six abodes of Murugan. Legend says that the Lord came here after the war in Tiruchendur to find peace (Thani-kai). It is also the site where the Lord married Valli, the daughter of the mountain hunters. A unique feature of the temple is that the Lord uses an elephant as his vehicle (vahanam) instead of a peacock, representing his royal status. The elephant faces the opposite direction because Indra gifted his divine elephant Iravatam, and it was allowed to look back at the celestial kingdom. The temple is reached by 365 steps, symbolizing the 365 days of the year, emphasizing that the Lord is the master of time and peace throughout the year.",
        "spiritualArchitecture": "The architecture of Tiruttani is a spectacular display of the Pallava and later Vijayanagara styles. The temple is built on a massive hill with grand stone gateways and a spacious circumambulation path. A unique feature is the use of the elephant motifs throughout the carvings. The main sanctum features a beautiful idol of Murugan with a crown and the sacred Vel. The architecture is designed to lead the pilgrim up the hill, providing panoramic views of the surrounding plains before entering the intimate and cool sanctum. The massive stone pillars and the well-maintained temple tanks (Pushkaranis) at the foot of the hill create a sense of a spiritual retreat elevated above the mundane world.",
        "vedicReferences": "Tiruttani is celebrated in the Skanda Purana and the Sangam literature as the supreme site where the Lord manifests as the source of all peace.",
        "deepInsights": "The laying down of the Vel represents the truth that the ultimate goal of all struggle is the achievement of inner peace. Tiruttani teaches that the divine is found in the silence after the victory.",
        "ancientLore": "Lore tells that the great saint Arunagirinathar was personally blessed by the Lord here with the knowledge of the divine music. Another legend says that the 365 steps were personally carved by the sages to represent the ladder of the soul''s evolution.",
        "keyRituals": [
            {"name": "Padi Tiruvizha", "description": "The unique step-festival on December 31st where thousands of devotees sing hymns on each of the 365 steps."},
            {"name": "Murugan Abhishekam (Tiruttani)", "description": "The ritual bath of the Lord with sandalwood, honey, and sacred waters to celebrate his peace."},
            {"name": "Valli Kalyanam", "description": "The grand annual celebration of the marriage of Murugan and Valli."},
            {"name": "Kiruthigai Festival", "description": "The massive monthly gathering where thousands of devotees carry the Kavadi up the hill."}
        ],
        "highlights": [
            {"name": "The 365 Steps", "description": "The sacred ladder representing the days of the year and the ascent to peace."},
            {"name": "The Elephant Vahanam", "description": "The unique divine mount of the Lord that faces the East."},
            {"name": "Saravana Poigai", "description": "The sacred pond at the foot of the hill where the Lord is said to have bathed."},
            {"name": "Valli Hill", "description": "The nearby hill where the divine marriage is believed to have taken place."}
        ],
        "travelInfo": {
            "bestTime": "October to March (especially during the step-festival on Dec 31st).",
            "howToReach": "85km from Chennai and 65km from Tirupati. Well connected by road and rail; regular trains and buses run from Chennai.",
            "nearestAirport": "Chennai International Airport (MAA).",
            "nearestRailway": "Tiruttani Railway Station."
        },
        "tips": [
            "If the 365 steps are difficult, there is a good motorable road that leads directly to the temple entrance at the top.",
            "Visit during the early morning or late evening to avoid the heat of the stone steps.",
            "Participate in the chanting of the Thirupugazh to experience the unique musical tradition of the Murugan abodes."
        ],
        "faqs": [
            {"question": "What is the meaning of Tiruttani?", "answer": "It means the ''Holy Calming Hill'', referring to where Murugan calmed himself after the war."},
            {"question": "Why is the elephant the vehicle here?", "answer": "It was a gift from Indra (the King of Gods) to celebrate Murugan''s victory and marriage."},
            {"question": "How long does it take to climb?", "answer": "It takes about 30-45 minutes to climb the 365 steps at a steady pace."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Swamimalai', 
    'swamimalai-temple', 
    'Sacred Destination', 
    'tn', 
    'One of the six Arupadai Veedu of Lord Murugan, Swamimalai is the site of absolute wisdom. Located near Kumbakonam, it is where the son (Murugan) became the teacher to his father (Shiva), explaining the supreme meaning of the Pranava Mantra (Om), representing the eternal truth that the divine can manifest as the student of its own creation.', 
    '610.2', 
    '810.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hill of the Divine Teacher and the Master of the Pranava', 
    'Swamimalai Temple | Tamil Nadu, Murugan & Ancient Lore', 
    'Experience the profound wisdom of Swamimalai. Discover the hill abode where the son taught the father, the 60 steps of the years, and the profound energy of the Murugan pilgrimage.', 
    'Swamimalai, Tamil Nadu, Murugan, Arupadai Veedu, Hindu Pilgrimage, Ancient Lore, Pranava, Shiva', 
    '194', 
    '{
        "spiritualEssence": "Swamimalai is the manifestation of the divine as the supreme teacher and the absolute depth of the sacred word. The energy here is scholarly, elevated, and intensely luminous. It is the site where the source of all knowledge was explained by the one who is knowledge itself. The vibration is one of ''Jnana'' (Wisdom) and the absolute power of the Om. As a temple set on an artificial hill with 60 steps, it represents the spiritual master of the human lifecycle. A visit here is believed to grant the devotee the absolute clarity of the intellect and the blessing of the divine guidance. The air is always vibrant with the scent of the sacred ash and the constant, rhythmic chanting of the Pranava Mantra.",
        "longDescription": "Swamimalai is the fourth abode of Murugan. Legend says that the Lord imprisoned Brahma for not knowing the meaning of ''Om'' and explained its supreme significance to Lord Shiva himself, who took the role of a student. Because of this, Murugan is known here as Swaminatha (The Master of the Lord). The temple is unique as it is built on an artificial hill (Kattu-malai). The 60 steps leading to the sanctum represent the 60 years of the Hindu calendar cycle (Prabhava to Akshaya), emphasizing that the Lord is the teacher of the entire human experience. Swamimalai is also a world-renowned center for the traditional art of bronze casting, making it a site where the spiritual word and the spiritual form are both perfectly mastered.",
        "spiritualArchitecture": "The architecture of Swamimalai is a spectacular display of the late Chola and Vijayanagara styles. The temple is built on an elevated platform with grand gateways and three concentric enclosures. A unique feature is the 60 granite steps, each named after a year of the cycle. The main sanctum features a magnificent 6-foot tall idol of Swaminatha Swamy. The architecture is designed to emphasize the elevation and the teacher-status of the deity. The massive stone pillars and the well-maintained temple tanks create a sense of a spiritual academy. The use of the granite stone and the intricate relief carvings of the various deities create a sense of a permanent and indestructible seat of wisdom.",
        "vedicReferences": "Swamimalai is celebrated in the Skanda Purana and the hymns of the Nayanars as the supreme site where the secret of the Vedas was revealed.",
        "deepInsights": "The son teaching the father represents the truth that the divine wisdom is not bound by the age or the order of creation. Swamimalai teaches that the ultimate teacher is the truth itself, regardless of its form.",
        "ancientLore": "Lore tells that the Lord Shiva personally carried the son on his shoulders to hear the secret of the Om. Another legend says that the sages of the universe gather here in their invisible forms to listen to the eternal discourse of the master.",
        "keyRituals": [
            {"name": "Pranava Upadesham Meditation", "description": "Sitting in the silent halls of the hill-temple to meditate on the meaning of the Om."},
            {"name": "Swaminatha Abhishekam", "description": "The ritual bath of the divine teacher with honey, milk, and sacred herbs."},
            {"name": "The 60 Steps Puja", "description": "Offering prayers on each of the 60 steps to honor the cycle of time and life."},
            {"name": "Kavadi Offering (Swamimalai)", "description": "The ritual of carrying the decorated bow of the devotees up the steps to seek the blessing of the master."}
        ],
        "highlights": [
            {"name": "The 60 Sacred Steps", "description": "The unique ladder of time that leads to the divine teacher."},
            {"name": "Swaminatha Swamy Shrine", "description": "The heart of the temple where the son taught the father."},
            {"name": "Bronze Casting Workshops", "description": "The traditional artisan village surrounding the temple where the divine forms are cast in bronze."},
            {"name": "The Golden Chariot", "description": "The spectacular vehicle used to take the Lord around the temple hill."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "6km from Kumbakonam. Well connected by road; regular buses and taxis run from Kumbakonam and Tanjavur.",
            "nearestAirport": "Tiruchirappalli International Airport (TRZ).",
            "nearestRailway": "Swamimalai Railway Station / Kumbakonam Junction."
        },
        "tips": [
            "Visit the bronze casting workshops in the village to see the incredible 1,000-year-old process of the Cire Perdue (lost wax) technique.",
            "The 60 steps are not very steep, but take them slowly to appreciate the naming of each year.",
            "Combine your visit with the other Navagraha temples and the Great Chola temples of the Kumbakonam region."
        ],
        "faqs": [
            {"question": "What does Swaminatha mean?", "answer": "It means ''The Lord of the Lord'', referring to Murugan being the teacher of Shiva."},
            {"question": "What is the significance of the 60 steps?", "answer": "They represent the 60 years of the Tamil/Hindu calendar cycle."},
            {"question": "Why is it an artificial hill?", "answer": "In the flat delta of the Kaveri, the temple was built on a raised platform to symbolize the elevated status of the teacher."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Nagarjunakonda', 
    'nagarjunakonda', 
    'Sacred Destination', 
    'ap', 
    'The ''Island of the Dharma'', Nagarjunakonda is one of the most important Buddhist sites in South India. Located in the center of the Nagarjuna Sagar dam in Andhra Pradesh, it is a site of absolute monastic brilliance and historical tragedy, once the capital of the Ikshvaku dynasty and the home of the great philosopher Nagarjuna, now preserved as a spectacular island museum.', 
    '780.2', 
    '560.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Island of the Sun and the Seat of the Madhyamaka', 
    'Nagarjunakonda | Andhra Pradesh, Nagarjuna & Ancient Lore', 
    'Experience the profound history of Nagarjunakonda. Discover the island museum, the ruins of the Mahachaitya, and the profound energy of the Buddhist pilgrimage.', 
    'Nagarjunakonda, Andhra Pradesh, Buddhist, Nagarjuna, Madhyamaka, Ikshvaku, Hindu Pilgrimage, Ancient Lore', 
    '195', 
    '{
        "spiritualEssence": "Nagarjunakonda is the manifestation of the divine as the supreme intellect and the absolute resilience of the sacred memory. The energy here is expansive, aquatic, and intensely academic. It is the site where the philosophy of the ''Middle Way'' reached its physical and intellectual peak in the South. The vibration is one of ''Sunyata'' (Emptiness) and the absolute flow of the time. As an island rising from the deep blue waters of the dam, it represents the spiritual ark of the Dharma. A visit here is believed to grant the devotee the absolute clarity of the mind and the blessing of the ancient sages. The air is always vibrant with the scent of the river water and the silent, heavy energy of the salvaged limestone carvings.",
        "longDescription": "Nagarjunakonda (Nagarjuna''s Hill) was the capital of the Ikshvaku kings in the 2nd and 3rd centuries CE. It was a major center for the Mahayana and later Vajrayana schools, attracting scholars from as far as China and Sri Lanka. The site is named after Nagarjuna, the 2nd-century Buddhist master who founded the Madhyamaka (Middle Way) school. When the Nagarjuna Sagar dam was built in the 1960s, the entire valley was flooded, but the most important ruins were salvaged and reconstructed on the hill-top, which became an island. The site features the Mahachaitya (housing a relic of the Buddha), numerous viharas, and the world''s only salvaged Buddhist university complex. It is a site where the highest philosophy of existence and the modern reality of human development are perfectly unified.",
        "spiritualArchitecture": "The architecture of Nagarjunakonda is a spectacular display of the early Andhra and Amaravati styles. It features the use of the unique greenish-white limestone (Palnad marble) for the relief carvings and the stupas. A unique feature is the wheel-shaped plan of the stupas, which were designed for both structural stability and symbolic meaning. The monastery ruins show a sophisticated layout of lecture halls, residential cells, and communal kitchens. The architecture is designed to lead the pilgrim through a sequence of salvaged sites set within a lush island garden. The museum is a masterpiece of modern salvage architecture, housing some of the most beautiful Buddhist relief carvings in the world, depicting the life of the Buddha with incredible realism and grace.",
        "vedicReferences": "Nagarjunakonda is celebrated in the Buddhist scriptures as the site where the great Nagarjuna achieved the highest realization of the nature of reality.",
        "deepInsights": "The salvaged nature of the island represents the truth that the sacred wisdom can be preserved even across the floods of time and change. Nagarjunakonda teaches that the middle way is the only path that survives the extremes.",
        "ancientLore": "Lore tells that the great Nagarjuna personally lived in a secret cave on the hill and used his alchemical powers to provide gold for the construction of the monasteries. Another legend says that the river Krishna was personally diverted by the sages to protect the sacred relics from the uninitiated.",
        "keyRituals": [
            {"name": "Island Parikrama", "description": "The ritual of walking around the entire island to connect with the various salvaged monastic sites."},
            {"name": "Mahachaitya Prayer", "description": "Offering prayers at the site of the grand stupa where the sacred relic was originally found."},
            {"name": "Madhyamaka Meditation", "description": "Sitting in the ruins of the ancient university to reflect on the nature of reality and emptiness."},
            {"name": "Boat Yatra (Krishna)", "description": "The ritual journey across the river to reach the sacred island, representing the crossing of the ocean of existence."}
        ],
        "highlights": [
            {"name": "The Mahachaitya", "description": "The central stupa of the valley, salvaged and rebuilt on the island."},
            {"name": "The Island Museum", "description": "A world-class collection of 3rd-century Buddhist sculptures and salvaged artifacts."},
            {"name": "The salvaged University", "description": "The ruins of the ancient center of learning where scholars from across Asia gathered."},
            {"name": "Apsidal Temple Ruins", "description": "The beautiful circular brick structures that were the heart of the monastic prayer."},
            {"name": "The Ashwamedha Site", "description": "The rare evidence of the Vedic horse-sacrifice performed by the Ikshvaku kings near the Buddhist sites."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "150km from Hyderabad. Reached by a 45-minute boat ride from the Vijayapuri launch station. Regular buses run from Hyderabad to the dam site.",
            "nearestAirport": "Rajiv Gandhi International Airport, Hyderabad (HYD).",
            "nearestRailway": "Macherla Railway Station."
        },
        "tips": [
            "The island is only accessible by the government-run ferry; check the boat timings in advance as they are limited (usually 9:30 AM and 1:30 PM).",
            "Carry a hat and plenty of water; the island can get very hot, and there is a lot of walking involved between the ruins.",
            "Allocate at least 4-5 hours for the boat ride and the exploration of the island and the museum."
        ],
        "faqs": [
            {"question": "Who was Nagarjuna?", "answer": "He was a 2nd-century Buddhist philosopher, widely considered the most important thinker after the Buddha himself."},
            {"question": "Is the original site underwater?", "answer": "Yes, the original valley is now at the bottom of the Nagarjuna Sagar reservoir; the ruins on the island were relocated stone by stone."},
            {"question": "Can we stay on the island?", "answer": "No, it is a protected archaeological site and all visitors must leave on the last ferry back to the mainland."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Bhimbetka', 
    'bhimbetka-caves', 
    'Sacred Destination', 
    'mp', 
    'The dawn of spiritual consciousness, Bhimbetka is home to the world''s oldest rock paintings. Located in the Raisen district of Madhya Pradesh, it is a site of absolute primal energy where the human spirit first expressed its connection to the divine and the natural world over 30,000 years ago, representing the bedrock of the Indian soul.', 
    '480.2', 
    '540.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Caves of the First Spirit and the Art of the Ancestors', 
    'Bhimbetka Caves | Madhya Pradesh, Prehistoric & Ancient Lore', 
    'Experience the profound roots of Bhimbetka. Discover the prehistoric rock art, the legend of Bhima, and the profound energy of the primal pilgrimage.', 
    'Bhimbetka, Madhya Pradesh, Prehistoric, Rock Art, Bhima, Hindu Pilgrimage, Ancient Lore, UNESCO', 
    '196', 
    '{
        "spiritualEssence": "Bhimbetka is the manifestation of the divine as the supreme origin and the absolute continuity of the human consciousness. The energy here is raw, ancient, and intensely tribal. It is the site where the first prayers were painted in red and white on the living rock. The vibration is one of ''Mula'' (The Root) and the absolute unity with the earth. As a complex of sandstone shelters set within a lush forest, it represents the spiritual womb of the Indian subcontinent. A visit here is believed to grant the devotee the absolute connection to the primal source and the blessing of the ancestors. The air is always vibrant with the scent of the dry forest and the silent, heavy energy of the 30,000-year-old drawings.",
        "longDescription": "Bhimbetka (meaning the sitting place of Bhima) is a UNESCO World Heritage site consisting of seven hills and over 750 rock shelters. The paintings date from the Upper Paleolithic to the Medieval period, showing a continuous human presence for over 30,000 years. The central point is the Auditorium Cave, a massive cathedral-like shelter featuring rock gongs and paintings of bulls and tigers. The Zoo Rock is another highlight, featuring hundreds of animals in a single panel. Bhimbetka is unique because it shows the evolution of the spiritual and social life of man, from hunting and dancing to the worship of the elements and the early forms of the gods. It is a site where the modern man meets his first self in a landscape of stone and color.",
        "spiritualArchitecture": "The architecture of Bhimbetka is a spectacular display of the natural rock-cut design. It features massive sandstone overhangs and deep caves formed by erosion over millions of years. The architecture is defined by its organic shapes and the way it provided shelter and sanctuary to the early man. A unique feature is the use of the natural contours of the rock as a canvas for the paintings. The shelters are organized in clusters, with some appearing like natural cathedrals and others like intimate family dwellings. The architecture of the site is unified by the forest paths and the panoramic views of the Vindhya range, creating a sense of a spiritual city that is entirely integrated with the planet.",
        "vedicReferences": "Bhimbetka is celebrated in the local lore as the site where the Pandava prince Bhima used to sit and reflect during their exile.",
        "deepInsights": "The rock paintings represent the truth that the impulse to create and to connect with the divine is as old as the human species itself. Bhimbetka teaches that the most ancient values are the most permanent.",
        "ancientLore": "Lore tells that the hills were the playground of the giants and the gods before the coming of man. Another legend says that the red color of the paintings was made from the blood of the earth itself, ensuring they never fade across thirty millennia.",
        "keyRituals": [
            {"name": "Ancestral Reflection", "description": "Sitting in the Auditorium Cave to reflect on the 30,000-year history of the human spirit."},
            {"name": "The Rock Gong Ritual", "description": "Striking the naturally resonant stones to hear the same sound that the prehistoric man used for his rituals."},
            {"name": "Zoo Rock Pradakshina", "description": "Walking around the massive painted rock to understand the unity of all life forms depicted by the ancestors."},
            {"name": "Vindhya Nature Walk", "description": "Walking through the forest surrounding the caves to connect with the natural environment that inspired the first artists."}
        ],
        "highlights": [
            {"name": "The Auditorium Cave", "description": "The massive, majestic shelter that is the spiritual heart of the complex."},
            {"name": "The Zoo Rock", "description": "A single rock panel featuring hundreds of animals and human figures in a spectacular composition."},
            {"name": "The Boar Rock", "description": "A giant prehistoric painting of a boar that is a masterpiece of ancient art."},
            {"name": "Rock Shelters of the Bhil", "description": "The areas where the local tribal communities still maintain a connection to the ancient sites."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "45km from Bhopal. Well connected by road; regular buses and taxis run from Bhopal city.",
            "nearestAirport": "Raja Bhoj Airport, Bhopal.",
            "nearestRailway": "Bhopal Junction."
        },
        "tips": [
            "Visit early in the morning to see the colors of the paintings in the natural morning light; they are most vibrant then.",
            "Hire a guide to help you spot the various layers of paintings, as some are over 30,000 years old and others are much more recent.",
            "Wear sturdy walking shoes as the terrain between the shelters is uneven and rocky."
        ],
        "faqs": [
            {"question": "How old are the paintings?", "answer": "The oldest paintings are estimated to be 30,000 years old, dating back to the Upper Paleolithic period."},
            {"question": "What colors were used?", "answer": "Mainly red and white, made from manganese, hematite, and coal mixed with fat or resin."},
            {"question": "Why is it called Bhimbetka?", "answer": "It is named after Bhima, the second of the five Pandava brothers from the Mahabharata."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Udayagiri (MP)', 
    'udayagiri-mp-caves', 
    'Sacred Destination', 
    'mp', 
    'The pinnacle of the Gupta spiritual golden age, the Udayagiri caves in Madhya Pradesh are home to the iconic Varaha carving. Located near Vidisha, it is a site of absolute cosmic authority where the Lord Vishnu in his boar incarnation is depicted rescuing the Earth, representing the supreme protective power of the divine and the peak of Indian classical art.', 
    '470.2', 
    '530.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hill of the Sunrise and the Rescue of the Earth', 
    'Udayagiri Caves MP | Madhya Pradesh, Varaha & Ancient Lore', 
    'Experience the profound power of Udayagiri. Discover the Varaha cave, the Gupta inscriptions, and the profound energy of the ancient cave pilgrimage.', 
    'Udayagiri, Madhya Pradesh, Gupta, Varaha, Vishnu, Hindu Pilgrimage, Ancient Lore, Vidisha', 
    '197', 
    '{
        "spiritualEssence": "Udayagiri is the manifestation of the divine as the supreme protector and the absolute restoration of the sacred order. The energy here is royal, powerful, and intensely authoritative. It is the site where the Lord emerged from the depths of the ocean to save the planet. The vibration is one of ''Dharoddhara'' (Rescue of the Earth) and the absolute victory of the cosmic will. As a series of rock-cut caves set in a lush hill near the Betwa river, it represents the spiritual heart of the Gupta Empire. A visit here is believed to grant the devotee the absolute strength of the spirit and the blessing of the divine protector. The air is always vibrant with the scent of the rain-washed stone and the silent, heavy energy of the 1,600-year-old inscriptions.",
        "longDescription": "The Udayagiri caves (meaning Hill of Sunrise) were carved during the reign of Chandragupta II in the early 5th century CE. There are 20 caves in total, both Hindu and Jain. Cave 5 is the world-famous site of the colossal Varaha relief, depicting Vishnu as the boar-man lifting Bhu Devi (the Earth Goddess) from the cosmic waters. The site also features the oldest surviving inscriptions that link the Gupta kings to the lineage of the divine. The caves are perfectly aligned to the astronomical events, with the sun shining into specific shrines during the equinoxes. Udayagiri is a site where the highest level of royal patronages and the deepest levels of Vedic symbolism are perfectly unified in a landscape of stone and light.",
        "spiritualArchitecture": "The architecture of Udayagiri is a spectacular display of the classical Gupta style. It features the use of the T-shaped doorframes and the magnificent stone relief carvings that define the beginning of the Hindu temple style. A unique feature is the Varaha relief, which is considered one of the greatest masterpieces of Indian sculpture. The caves are carved into a sandstone hill and feature several monolithic pillars and flat-roofed shrines. The architecture is designed to emphasize the integration with the living rock and the alignment with the celestial bodies. The use of precisely carved friezes of the river goddesses Ganga and Yamuna at the entrances creates a sense of a spiritual gateway of the imperial age.",
        "vedicReferences": "Udayagiri is celebrated in the Puranas as the site that marks the beginning of the current Kalpa, the Varaha Kalpa, where the earth was restored by the divine.",
        "deepInsights": "The Varaha relief represents the truth that the divine always intervenes to restore the balance when the earth is in distress. Udayagiri teaches that the highest power is that which serves the planet.",
        "ancientLore": "Lore tells that the hill was a secret observatory where the ancient sages calculated the movements of the stars. Another legend says that the massive iron pillar of Delhi was originally located at the foot of the Udayagiri hill.",
        "keyRituals": [
            {"name": "Varaha Sankalpa Meditation", "description": "Sitting before the colossal Varaha relief to resolve to protect the earth and the soul."},
            {"name": "Equinox Sun Darshan", "description": "The ritual of visiting the caves during the equinox to see the sun illuminate the inner sanctum."},
            {"name": "Gupta Inscription Study", "description": "The act of reflecting on the ancient records of the kings who vowed to protect the Dharma."},
            {"name": "Betwa River Snanam", "description": "Taking a holy dip in the river near the caves to purify the mind before entering the sacred hill."}
        ],
        "highlights": [
            {"name": "The Varaha Cave (Cave 5)", "description": "The magnificent and world-famous colossal relief of the Lord Vishnu."},
            {"name": "Cave 1 (The False Cave)", "description": "The oldest cave at the site featuring early Gupta stone work."},
            {"name": "The Inscription of Chandragupta", "description": "The historic 5th-century record of the great emperor''s visit to the hill."},
            {"name": "Cave 20 (The Jain Cave)", "description": "A beautiful Jain cave at the top of the hill featuring carvings of the Tirthankaras."},
            {"name": "Astronomical Alignments", "description": "The unique structural design of the caves that interacts with the movements of the sun."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "6km from Vidisha and 60km from Bhopal. Well connected by road; regular taxis run from Bhopal and Sanchi.",
            "nearestAirport": "Raja Bhoj Airport, Bhopal.",
            "nearestRailway": "Vidisha Railway Station / Sanchi Railway Station."
        },
        "tips": [
            "Visit in the early morning for the best light on the Varaha relief; it faces East and looks spectacular as the sun rises.",
            "Carry water and wear a hat, as there is some walking and climbing involved between the 20 caves.",
            "Combine your visit with the nearby Sanchi Stupa and the Heliodorus Pillar for a full day of Gupta-era exploration."
        ],
        "faqs": [
            {"question": "What is the Varaha relief?", "answer": "It is a massive 5th-century stone carving of the boar incarnation of Vishnu rescuing the Earth Goddess."},
            {"question": "Who built these caves?", "answer": "They were primarily commissioned by the ministers and kings of the Gupta Empire, specifically Chandragupta II."},
            {"question": "Are they the same as Udayagiri in Odisha?", "answer": "No, these are in Madhya Pradesh near Sanchi; the ones in Odisha are Jain/Buddhist caves."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Aruvippuram', 
    'aruvippuram', 
    'Sacred Destination', 
    'kl', 
    'The site of a spiritual revolution, Aruvippuram is where Sree Narayana Guru challenged the status of the caste system. Located on the banks of the Neyyar river in Kerala, it is a site of absolute human dignity and spiritual courage, where the Guru installed a Shiva Lingam taken from the river, declaring it a site for ''One Caste, One Religion, One God for Man''.', 
    '330.2', 
    '900.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The River of the Guru and the Altar of Human Unity', 
    'Aruvippuram | Kerala, Sree Narayana Guru & Ancient Lore', 
    'Experience the profound courage of Aruvippuram. Discover the site of the silent revolution, the Neyyar river legend, and the profound energy of the social-spiritual pilgrimage.', 
    'Aruvippuram, Kerala, Sree Narayana Guru, Shiva, Social Reform, Hindu Pilgrimage, Ancient Lore, Neyyar', 
    '198', 
    '{
        "spiritualEssence": "Aruvippuram is the manifestation of the divine as the supreme equality and the absolute dignity of every human being. The energy here is revolutionary, peaceful, and intensely compassionate. It is the site where the monopoly over the sacred was broken by the silent power of a realized soul. The vibration is one of ''Advaita'' in action and the absolute brotherhood of man. As a temple set within a beautiful riverside forest, it represents the spiritual conscience of modern Kerala. A visit here is believed to grant the devotee the absolute removal of all prejudices and the blessing of a universal vision. The air is always vibrant with the scent of the forest and the silent, heavy energy of the Guru''s message.",
        "longDescription": "Aruvippuram became a landmark in 1888 when Sree Narayana Guru, a self-realized saint from a marginalized community, picked up a stone from the Neyyar river and installed it as a Shiva Lingam. When challenged by the orthodox, he famously replied that he was installing an ''Ezhava Shiva'' (a Shiva for his own people), thus exposing the fallacy of caste-based worship. This act started a massive social reform movement in India. The site features the original Shiva temple, a beautiful ashram, and a meditation cave where the Guru lived. The Neyyar river flows with a gentle roar past the temple, creating a natural and meditative atmosphere. Aruvippuram remains a site where the highest philosophy of non-duality is lived as a social reality of absolute inclusion.",
        "spiritualArchitecture": "The architecture of Aruvippuram is a spectacular display of the simple and natural Kerala style. The temple is built of stone and wood, with a focus on the natural environment. A unique feature is the use of the riverside rocks as part of the temple complex. The architecture is designed to be accessible and humble, reflecting the Guru''s message. The meditation cave is a natural formation that has been minimally modified to provide a silent sanctuary. The expansive hall for the community gatherings and the well-maintained river ghats create a sense of a spiritual home for all of humanity. The use of the traditional lamps and the white-washed walls create a sense of purity and light.",
        "vedicReferences": "Aruvippuram is celebrated in the modern spiritual context as the site where the true meaning of the Vedic ''Atman'' (the universal soul) was established beyond the barriers of caste.",
        "deepInsights": "The installation of the Lingam represents the truth that the divine belongs to no one and everyone simultaneously. Aruvippuram teaches that the highest ritual is the establishment of human dignity.",
        "ancientLore": "Lore tells that the Guru spent an entire night underwater in the Neyyar river to find the perfect stone for the Lingam. Another legend says that the very animals of the forest used to sit peacefully around the Guru during his meditation in the cave.",
        "keyRituals": [
            {"name": "Aruvippuram Shivarathri", "description": "The grand annual celebration of the original installation of the Lingam, attracting millions of people from all communities."},
            {"name": "Neyyar River Snanam", "description": "The ritual bath in the river from which the Guru took the sacred stone."},
            {"name": "Guru Smriti Meditation", "description": "Sitting in the meditation cave of the Guru to reflect on the message of human unity."},
            {"name": "Satsang (Aruvippuram)", "description": "The collective gathering of people from all religions to discuss the philosophy of the Guru."}
        ],
        "highlights": [
            {"name": "Sree Narayana Guru Temple", "description": "The site of the historic 1888 installation of the Shiva Lingam."},
            {"name": "The Meditation Cave", "description": "The natural cave where the Guru lived and performed his intense penance."},
            {"name": "The Neyyar River Ghats", "description": "The beautiful stone steps leading to the river that was the Guru''s primary sanctuary."},
            {"name": "The Ashram complex", "description": "A center for spiritual study and community service that continues the Guru''s legacy."}
        ],
        "travelInfo": {
            "bestTime": "September to March.",
            "howToReach": "24km from Thiruvananthapuram. Well connected by road; regular buses and taxis run from the capital city.",
            "nearestAirport": "Trivandrum International Airport (TRV).",
            "nearestRailway": "Neyyattinkara Railway Station / Thiruvananthapuram Central."
        },
        "tips": [
            "Visit during Shivarathri to see the full cultural and spiritual vibrancy of the Guru''s followers.",
            "Spend time in silent meditation by the river; the sound of the water is a natural aid to the practice.",
            "Read the Guru''s works (like the Atmopadesa Satakam) before visiting to understand the philosophical depth of the site."
        ],
        "faqs": [
            {"question": "Who was Sree Narayana Guru?", "answer": "He was a great saint and social reformer of Kerala who preached the message of ''One Caste, One Religion, One God for All''."},
            {"question": "What was the 1888 incident?", "answer": "The Guru installed a Shiva Lingam, which was traditionally only the right of high-caste priests, thus starting a revolution for equality."},
            {"question": "Is it open to all religions?", "answer": "Yes, Aruvippuram is one of the most inclusive spiritual sites in the world, welcoming everyone regardless of faith or background."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Pazhamudhircholai', 
    'pazhamudhircholai-temple', 
    'Sacred Destination', 
    'tn', 
    'One of the six Arupadai Veedu of Lord Murugan, Pazhamudhircholai is the site of the divine test of wisdom. Located in the Alagar hills near Madurai, it is where the Lord appeared as a young boy to the poetess-saint Avvaiyar to teach her that the heat of the world can only be cooled by the fruit of knowledge.', 
    '600.2', 
    '830.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Orchard of the Divine Fruit and the Wisdom of Avvaiyar', 
    'Pazhamudhircholai Temple | Tamil Nadu, Murugan & Ancient Lore', 
    'Experience the profound wisdom of Pazhamudhircholai. Discover the hill abode of Murugan, the legend of the roasted fruit, and the profound energy of the Murugan pilgrimage.', 
    'Pazhamudhircholai, Tamil Nadu, Murugan, Arupadai Veedu, Hindu Pilgrimage, Ancient Lore, Avvaiyar, Fruit', 
    '199', 
    '{
        "spiritualEssence": "Pazhamudhircholai is the manifestation of the divine as the supreme teacher and the absolute simplicity of the truth. The energy here is lush, forest-like, and intensely intimate. It is the site where the pride of the scholar was transformed into the humility of the seeker. The vibration is one of ''Jnana-Pazham'' (The Fruit of Knowledge) and the absolute sweetness of the divine grace. As a temple set within the dense forests of the Alagar hills, it represents the spiritual oasis of the Madurai region. A visit here is believed to grant the devotee the absolute removal of all ego and the blessing of the divine wisdom. The air is always vibrant with the scent of the forest flowers and the constant, rhythmic chanting of the Tamil hymns.",
        "longDescription": "Pazhamudhircholai is the sixth of the six abodes of Murugan. Legend tells of the elderly poetess Avvaiyar sitting under a jamun tree, when a young boy (Murugan in disguise) asked her if she wanted ''roasted'' or ''unroasted'' fruit. Confused, she asked for unroasted. The boy shook the tree, and the fruit fell into the sand. As she blew the sand off, the boy laughed, asking why she was blowing on the fruit if it wasn''t roasted (hot). Avvaiyar realized that the boy was teaching her that the sand of the world makes the fruit of life ''hot'' and requires the breath of wisdom to cool it. The temple is unique for its natural forest setting and the sacred Noopura Ganga spring that flows nearby. It is a site where the highest literature and the simplest nature-worship are perfectly unified.",
        "spiritualArchitecture": "The architecture of Pazhamudhircholai is a spectacular display of the simple and elegant Dravidian style. The temple is built on a high slope of the Alagar hill with grand stone gateways and a beautiful central sanctum. A unique feature is the use of the natural stone and the integration with the surrounding forest. The main sanctum features a beautiful idol of Murugan with his consorts Valli and Deivayanai. The architecture is designed to lead the pilgrim through a sequence of winding hill-roads and steep steps, providing a sense of a spiritual journey into the heart of nature. The nearby Noopura Ganga shrine features a natural spring that has been integrated into the temple complex with stone carvings of the river goddesses.",
        "vedicReferences": "Pazhamudhircholai is celebrated in the Skanda Purana and the Sangam literature as the supreme site where the Lord manifests as the fruit of the spirit.",
        "deepInsights": "The roasted fruit represents the truth that the life is seasoned by the struggles and the wisdom of the experience. Pazhamudhircholai teaches that the greatest teacher can appear in the most humble form.",
        "ancientLore": "Lore tells that the Noopura Ganga spring was formed by the water that fell from the Lord Vishnu''s anklet when he measured the universe. Another legend says that the jamun tree in the temple yields fruit out of season during the Skanda Sashti festival as a sign of divine grace.",
        "keyRituals": [
            {"name": "Noopura Ganga Snanam", "description": "The ritual bath in the sacred spring to seek the purification of the mind and the body."},
            {"name": "Murugan Abhishekam (Pazhamudhircholai)", "description": "The ritual bath of the Lord with honey, milk, and fruit juices to celebrate his sweetness."},
            {"name": "Avvaiyar Smriti Meditation", "description": "Sitting under the jamun trees to reflect on the lessons of humility and wisdom."},
            {"name": "Skanda Sashti (Pazhamudhircholai)", "description": "The grand annual six-day festival celebrating the victory and the wisdom of the Lord."}
        ],
        "highlights": [
            {"name": "Swaminatha Shrine", "description": "The heart of the temple housing the beautiful idols of Murugan and his consorts."},
            {"name": "Noopura Ganga", "description": "The perennial sacred spring that flows at the top of the hill."},
            {"name": "The Sacred Jamun Tree", "description": "The site of the divine test of Avvaiyar, where the roasted fruit legend took place."},
            {"name": "Alagar Kovil Path", "description": "The scenic and spiritual forest road that leads to the temple from the base of the hill."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "25km from Madurai. Well connected by road; regular buses and taxis run from Madurai city and Alagar Kovil.",
            "nearestAirport": "Madurai International Airport (IXM).",
            "nearestRailway": "Madurai Junction."
        },
        "tips": [
            "Visit the Alagar Kovil temple at the foot of the hill before heading up to Pazhamudhircholai for a complete spiritual experience.",
            "The road to the temple is narrow and winding; hire a local taxi or use the regular temple buses for a safer journey.",
            "Drink the water of the Noopura Ganga; it is believed to have medicinal properties and a unique spiritual taste."
        ],
        "faqs": [
            {"question": "What is the meaning of Pazhamudhircholai?", "answer": "It means the ''Orchard of the Ripe Fruits'', referring to the lush forest environment of the temple."},
            {"question": "Who was Avvaiyar?", "answer": "She was a legendary Tamil poetess and saint known for her wisdom and for her close relationship with Lord Murugan."},
            {"question": "What is roasted fruit?", "answer": "In the legend, it refers to the fruit covered in sand, which Avvaiyar had to blow on, making it look like she was cooling hot food."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Thirupparamkunram', 
    'thirupparamkunram-temple', 
    'Sacred Destination', 
    'tn', 
    'The first of the six Arupadai Veedu of Lord Murugan, Thirupparamkunram is the site of the divine marriage. Located at the foot of a massive granite hill near Madurai, it is where the Lord married Deivayanai, the daughter of Indra, after his victory over the demon Surapadman, representing the absolute union of the divine and the royal grace.', 
    '590.2', 
    '840.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hill of the First Abode and the Divine Marriage', 
    'Thirupparamkunram Temple | Tamil Nadu, Murugan & Ancient Lore', 
    'Experience the profound grace of Thirupparamkunram. Discover the rock-cut abode of Murugan, the legend of the divine wedding, and the profound energy of the Murugan pilgrimage.', 
    'Thirupparamkunram, Tamil Nadu, Murugan, Arupadai Veedu, Hindu Pilgrimage, Ancient Lore, Marriage, Deivayanai', 
    '200', 
    '{
        "spiritualEssence": "Thirupparamkunram is the manifestation of the divine as the supreme union and the absolute auspiciousness of the sacred bond. The energy here is grand, festive, and intensely rock-solid. It is the site where the warrior Lord was anchored in the joy of the marriage. The vibration is one of ''Mangalam'' (Auspiciousness) and the absolute celebration of the divine victory. As a rock-cut temple set within a massive granite hill, it represents the spiritual bedrock of the Tamil soul. A visit here is believed to grant the devotee the absolute stability of the life and the blessing of a successful marriage. The air is always vibrant with the scent of the temple camphor and the constant, rhythmic sound of the Vedic mantras.",
        "longDescription": "Thirupparamkunram is the first of the six abodes. It is unique for being a rock-cut temple (Kudaivarai Kovil) carved during the Pandya period. Legend says that after the victory over Surapadman, Lord Murugan stayed here and married Deivayanai, the daughter of the King of Gods, Indra. The temple is special because it houses five deities in the main sanctum (Shiva, Vishnu, Durga, Ganesha, and Murugan), emphasizing the unity of the diverse spiritual paths. The massive granite hill (Paramkunram) is considered a form of the divine itself. The site is also famous for the presence of a dargah at the top of the hill, representing the shared spiritual space of the region. Thirupparamkunram is a site where the ancient rock-cut art and the grandest of the divine celebrations are perfectly unified.",
        "spiritualArchitecture": "The architecture of Thirupparamkunram is a spectacular display of the early rock-cut and later Nayaka styles. The main sanctum is carved directly into the granite hill, featuring a magnificent facade with multi-layered relief carvings. A unique feature is the presence of the Shiva and Vishnu shrines facing each other, a rare occurrence in Dravidian architecture. The temple features a grand thousand-pillar hall (Ayiram Kaal Mandapam) with intricately carved pillars depicting the various myths of Murugan. The architecture is designed to lead the pilgrim into the heart of the hill, creating a sense of a spiritual womb. The massive stone walls and the grand gopurams create a sense of a spiritual fortress at the edge of the sacred mountain.",
        "vedicReferences": "Thirupparamkunram is celebrated in the Tevaram and the Tiruppugazh as the supreme site where the Lord began his earthly abodes.",
        "deepInsights": "The divine marriage represents the truth that the highest victory is the achievement of harmony and the union of the soul with the divine grace. Thirupparamkunram teaches that the foundation of the spirit is as solid as the granite hill.",
        "ancientLore": "Lore tells that the sun and the moon personally attended the divine wedding and left their impressions on the rocks of the hill. Another legend says that the sages performed penance here for millions of years to witness the moment of the Lord''s marriage.",
        "keyRituals": [
            {"name": "Deivayanai Kalyanam", "description": "The grand annual celebration of the divine wedding of Murugan and Deivayanai, attracting thousands of couples."},
            {"name": "Rock-Cut Sanctum Meditation", "description": "Sitting in the silence of the ancient carved hall to experience the energy of the mountain."},
            {"name": "Hill Parikrama (Girisivalam)", "description": "The ritual of walking around the massive granite hill to seek the blessing of the mountain-deity."},
            {"name": "Kavadi Offering (Thirupparamkunram)", "description": "The ritual of carrying the decorated bow to celebrate the Lord''s first abode."}
        ],
        "highlights": [
            {"name": "The Rock-Cut Sanctum", "description": "The 8th-century heart of the temple carved into the living granite."},
            {"name": "The Five Deities Shrine", "description": "A unique assembly of the major Hindu gods in a single sanctum."},
            {"name": "The Thousand-Pillar Hall", "description": "A masterpiece of Nayaka stone-work featuring spectacular relief carvings."},
            {"name": "The Paramkunram Hill", "description": "The massive granite mountain that is the spiritual axis of the town."},
            {"name": "The Saravana Poigai", "description": "The sacred pond at the base where the divine marriage rituals are initiated."}
        ],
        "travelInfo": {
            "bestTime": "October to March.",
            "howToReach": "8km from Madurai city center. Well connected by road and rail; regular buses and local trains run from Madurai.",
            "nearestAirport": "Madurai International Airport (IXM).",
            "nearestRailway": "Thirupparamkunram Railway Station / Madurai Junction."
        },
        "tips": [
            "Visit during the early morning to see the sun rising over the granite hill; the light on the stone carvings is spectacular.",
            "The temple is often crowded with wedding parties; maintain a respectful and celebratory attitude.",
            "Take the time to walk around the base of the hill; it provides a unique perspective on the integration of the temple and the mountain."
        ],
        "faqs": [
            {"question": "Who did Murugan marry here?", "answer": "He married Deivayanai, the daughter of Lord Indra, the King of the Gods."},
            {"question": "What is a rock-cut temple?", "answer": "It is a temple carved entirely out of a single mountain of rock rather than being built with bricks or stone blocks."},
            {"question": "Is it the first Murugan abode?", "answer": "Yes, it is traditionally considered the first of the six Arupadai Veedu of Lord Murugan."}
        ]
    }'
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Tungnath', 
    'tungnath-temple', 
    'Sacred Destination', 
    'uk', 
    'The highest Shiva temple in the world, Tungnath is one of the five Panch Kedar temples. Located at an altitude of 3,680 meters in the Rudraprayag district of Uttarakhand, it is a site of absolute spiritual peak and Himalayan majesty, where the Lord''s arms (Bahu) are believed to have emerged after the Pandavas sought his presence.', 
    '520.5', 
    '230.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sky-High Lord and the Pinnacle of the Panch Kedar', 
    'Tungnath Temple | Uttarakhand, Highest Shiva Temple & Ancient Lore', 
    'Experience the profound heights of Tungnath. Discover the highest Shiva temple in the world, the legend of the Pandavas, and the profound energy of the Himalayan pilgrimage.', 
    'Tungnath, Uttarakhand, Shiva, Panch Kedar, Highest Temple, Himalayan, Ancient Lore, Rudraprayag', 
    '201', 
    '{
        "spiritualEssence": "Tungnath is the manifestation of the divine as the supreme height and the absolute proximity to the heavens. The energy here is thin, cold, and intensely luminous. It is the site where the arms of the divine reached out to embrace the seeker at the very top of the world. The vibration is one of ''Urdhva'' (Ascent) and the absolute clarity of the mountain spirit. As a small stone temple perched on a ridge facing the massive peaks of Nanda Devi and Trishul, it represents the spiritual lighthouse of the high Himalayas. A visit here is believed to grant the devotee the absolute transcendence of the mind and the blessing of the Lord of the Peaks. The air is always vibrant with the scent of the wild rhododendrons and the silent, heavy energy of the eternal snows.",
        "longDescription": "Tungnath (meaning Lord of the Peaks) is traditionally dated back over 1,000 years, built in the classic Nagara style of the mountains. It is the third temple in the sequence of the Panch Kedar. Legend tells that the Pandavas, seeking atonement for the Kurukshetra war, were advised to seek Shiva. The Lord took the form of a bull and disappeared into the earth; his arms emerged at Tungnath. The temple is reached by a spectacular 4km trek from Chopta through lush meadows (Bugyals) and rhododendron forests. The site is famous for the Chandrashila peak, located 1km above the temple, which offers a 360-degree view of the entire Himalayan range. Tungnath is a site where the raw power of nature and the steady devotion of the human heart are perfectly unified.",
        "spiritualArchitecture": "The architecture of Tungnath is a spectacular display of the ancient mountain stone style. The temple is built of massive gray stone slabs, featuring a short shikhara and a small mandapam. A unique feature is the use of the natural stone found on the ridge, allowing the temple to blend seamlessly with the rocky environment. The main sanctum houses a small, natural rock formation representing the arms of Shiva. The architecture is designed to withstand the extreme weather and the heavy snow of the winters. The courtyard includes several smaller shrines and a beautiful Nandi statue. The simplicity of the structure highlights the monumental scale of the surrounding Himalayan peaks.",
        "vedicReferences": "Tungnath is celebrated in the Skanda Purana as the supreme site where the divine manifested to bless the Pandavas on their path to the heavens.",
        "deepInsights": "The emergence of the arms represents the truth that the divine always reaches out to help the soul that is willing to climb the highest peaks. Tungnath teaches that the final stage of the journey is always a vertical ascent.",
        "ancientLore": "Lore tells that the great poet-saint Vyasa personally meditated in a cave near Tungnath to receive the vision of the Mahabharata. Another legend says that the Lord Rama performed penance at the Chandrashila peak after defeating Ravana.",
        "keyRituals": [
                {
                        "name": "Tungnath Aarti (Peak)",
                        "description": "The daily prayer performed at the summit of the world, overlooking the massive Himalayan ranges."
                },
                {
                        "name": "Panch Kedar Yatra",
                        "description": "The ritual of visiting the five sacred sites of Shiva''s bull-manifestation in the Uttarakhand mountains."
                },
                {
                        "name": "Chandrashila Sunrise Meditation",
                        "description": "Sitting at the peak above the temple at dawn to witness the first light on the Nanda Devi."
                },
                {
                        "name": "Holy Dip at Chopta",
                        "description": "The ritual of purification at the base of the trek before ascending to the Lord''s abode."
                }
        ],
        "highlights": [
                {
                        "name": "The Highest Sanctum",
                        "description": "The sacred stone chamber of the highest Shiva temple on the planet."
                },
                {
                        "name": "Chandrashila Peak",
                        "description": "The mountain-top offering the most spectacular panoramic view of the Himalayas."
                },
                {
                        "name": "Chopta Meadows",
                        "description": "The lush green bugyals that act as the base camp for the spiritual ascent."
                },
                {
                        "name": "The Ancient Nandi",
                        "description": "The stone bull that has guarded the high-altitude shrine for a millennium."
                }
        ],
        "travelInfo": {
                "bestTime": "May to June and September to October (the temple is closed in winter).",
                "howToReach": "Reached by a 4km trek from Chopta. Chopta is well connected by road from Rishikesh (210km) and Ukhimath.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station / Haridwar."
        },
        "tips": [
                "Start the trek from Chopta early in the morning to reach the temple and Chandrashila before the clouds cover the peaks.",
                "The trek is relatively easy but the high altitude can cause breathlessness; walk slowly and carry water.",
                "During the winter, the idol is moved to the Markateshwar Temple in Makkumath; the temple itself becomes inaccessible due to snow."
        ],
        "faqs": [
                {
                        "question": "How high is Tungnath?",
                        "answer": "It is located at an altitude of 3,680 meters (12,073 feet) above sea level."
                },
                {
                        "question": "Is it a difficult trek?",
                        "answer": "The 4km trek from Chopta is on a well-paved stone path; it is considered easy to moderate in difficulty."
                },
                {
                        "question": "Who built the temple?",
                        "answer": "Tradition attributes the building to the Pandavas, while the current structure is believed to be about 1,000 years old."
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