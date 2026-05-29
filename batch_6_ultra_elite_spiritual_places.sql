-- BATCH 6: ULTRA ELITE SPIRITUAL PLACES (MAX VOLUME & DEPTH)
-- Locations: Srirangam, Thanjavur, Kumbakonam, Palani, Guruvayur, Sabarimala, Murudeshwar, Gokarna, Ahobilam, Lepakshi

-- 1. SRIRANGAM (Ranganathaswamy Temple)
INSERT INTO "public"."spiritual_places"  (
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
), (
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
), (
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
), (
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
), (
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
), (
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
), (
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
), (
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
), (
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
), (
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
);
