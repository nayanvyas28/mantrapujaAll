-- BATCH 7: ULTRA ELITE SPIRITUAL PLACES (MAX VOLUME & DEPTH)
-- Locations: Gangotri, Yamunotri, Kalahasti, Rockfort Trichy, Srirangapatna, Golden Temple, Anandpur Sahib, Hemkund Sahib, Kartarpur Sahib, Paonta Sahib

-- 1. GANGOTRI
INSERT INTO "public"."spiritual_places"   (
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
), (
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
), (
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
), (
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
), (
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
), (
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
), (
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
), (
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
), (
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
), (
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
);
