-- BATCH 5: ULTRA ELITE SPIRITUAL PLACES (MAX VOLUME & DEPTH)
-- Locations: Dakshineswar, Kanyakumari, Khajuraho, Chidambaram, Tiruvannamalai, Udupi, Sravanabelagola, Hampi, Kushinagar, Sarnath

-- 1. DAKSHINESWAR (Kolkata)
INSERT INTO "public"."spiritual_places"  (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Dakshineswar', 
    'dakshineswar', 
    'Sacred Destination', 
    'wb', 
    'Located on the eastern bank of the Hooghly river, Dakshineswar is the world-renowned temple of Bhavatarini (Kali). It is the site where the great saint Sri Ramakrishna Paramahansa realized the Divine Mother and taught the harmony of all religions.', 
    '425.5', 
    '335.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Temple of the Savior of the Universe', 
    'Dakshineswar Kali Temple | Kolkata, Ramakrishna & Ancient Lore', 
    'Experience the profound vibration of Dakshineswar. Discover the Bhavatarini temple, the room of Sri Ramakrishna, and the message of universal spiritual harmony.', 
    'Dakshineswar, Kali Temple, Kolkata, West Bengal, Bhavatarini, Ramakrishna Paramahansa, Hindu Pilgrimage, Ancient Lore, Hooghly', 
    '38', 
    '{
        "spiritualEssence": "Dakshineswar is the manifestation of the Mother as the savior of the universe (Bhavatarini). The energy here is serene, high-vibrational, and deeply meditative. Unlike the fierce Kalighat, Dakshineswar is the site of the ''Madhura Bhava''—the sweet relationship between the child and the Mother. The vibration is one of pure, unalloyed love and the realization that all paths lead to the same truth. It is the place where the modern spiritual renaissance of India began. A visit here is believed to grant the devotee the vision of the divine in all aspects of life. The air is always vibrant with the sound of the Hooghly river and the silent presence of the many saints who have walked these grounds.",
        "longDescription": "The temple was built in 1855 by Rani Rashmoni, a visionary and devotee of the Mother. She was inspired by a dream to build a temple instead of going to Varanasi. The central shrine is a massive nine-spired (Navaratna) temple dedicated to Goddess Kali, surrounded by 12 identical Shiva temples and a shrine to Radha-Krishna. Dakshineswar gained global fame through Sri Ramakrishna Paramahansa, who served as the priest here for decades. His room, located in the northwestern corner of the complex, is a major pilgrimage site where he entered into various spiritual states (Samadhi). The temple complex also includes the sacred Panchavati garden, where Ramakrishna performed his various spiritual practices (Sadhanas) under five different trees. Dakshineswar is a site where the traditional rituals of Bengal meet the universal message of Vedanta.",
        "spiritualArchitecture": "The main temple is built in the Navaratna style of Bengal architecture, featuring a three-storied structure with nine spires. The temple is situated on a high platform with wide stone steps leading up from the river. The 12 Shiva temples are built in the traditional ''aat-chala'' (eight-roofed) style, arranged in a row facing the river. The complex features a spacious courtyard and a Nat Mandir (assembly hall) with beautiful pillars and carvings. The entire structure is a masterpiece of 19th-century brick and lime mortar engineering.",
        "vedicReferences": "While a 19th-century construction, Dakshineswar is built according to the strict principles of Tantric and Vedic architecture. It is hailed as the site where the Mother revealed herself to the modern world.",
        "deepInsights": "The nine spires represent the nine gates of the human body, and the central spire signifies the reached state of Brahman. Dakshineswar teaches that the divine mother is not just an idol but a living, breathing reality that can be realized by anyone with a pure heart.",
        "ancientLore": "Lore tells that when Rani Rashmoni was looking for land, she found this spot which was traditionally known as a place for spiritual practice for centuries. Another legend says that the Mother herself told Ramakrishna that she was staying in the idol just for his sake.",
        "keyRituals": [
                {
                        "name": "Nitya Puja",
                        "description": "The daily worship of Bhavatarini involving the offering of rice, sweets, and flowers."
                },
                {
                        "name": "Sandhya Aarti",
                        "description": "The evening ritual of lamps performed simultaneously in the main temple and the 12 Shiva shrines."
                },
                {
                        "name": "Kali Puja",
                        "description": "The massive annual celebration in October/November, where the temple is decorated with thousands of lamps."
                }
        ],
        "highlights": [
                {
                        "name": "Sri Ramakrishna''s Room",
                        "description": "The preserved room where the saint lived and attained various spiritual states."
                },
                {
                        "name": "The 12 Shiva Temples",
                        "description": "A row of beautiful temples representing the twelve months and the zodiac."
                },
                {
                        "name": "Panchavati Garden",
                        "description": "The sacred grove where Ramakrishna performed his various spiritual disciplines."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Located in the northern part of Kolkata, well connected by road, rail, and ferry from Belur Math. Dakshineswar has its own metro and railway station.",
                "nearestAirport": "Netaji Subhash Chandra Bose International Airport.",
                "nearestRailway": "Dakshineswar Railway Station."
        },
        "tips": [
                "Take the ferry across the river to visit Belur Math, the headquarters of the Ramakrishna Mission.",
                "Visit in the early morning for a more peaceful experience at the Panchavati.",
                "Photography is strictly prohibited inside the main sanctum and Ramakrishna''s room."
        ],
        "faqs": [
                {
                        "question": "Who was Rani Rashmoni?",
                        "answer": "She was a wealthy and visionary widow from Kolkata who built the temple in 1855 against many social odds."
                },
                {
                        "question": "Can I visit the Panchavati?",
                        "answer": "Yes, it is open to all visitors and is a perfect place for quiet meditation."
                },
                {
                        "question": "Is it near the airport?",
                        "answer": "Yes, it is about 12km (30-40 minutes) from the Kolkata international airport."
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
    'Kanyakumari', 
    'kanyakumari', 
    'Shakti Peeth', 
    'tn', 
    'At the southernmost tip of India, Kanyakumari is where the Arabian Sea, the Bay of Bengal, and the Indian Ocean meet. It is the site of the Goddess Kanya Kumari (the Virgin Goddess) who performs eternal penance to attain Lord Shiva.', 
    '235.2', 
    '880.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Tip of the Eternal Mother', 
    'Kanyakumari | Ocean Confluence, Shakti Peeth & Vivekananda Lore', 
    'Experience the spiritual power of Kanyakumari. Discover the Virgin Goddess temple, the Vivekananda Rock Memorial, and the unique confluence of the three oceans.', 
    'Kanyakumari, Shakti Peeth, Tamil Nadu, Goddess Kanyakumari, Vivekananda Rock, Ocean Confluence, Hindu Pilgrimage, Ancient Lore, Southern Tip', 
    '39', 
    '{
        "spiritualEssence": "Kanyakumari is the manifestation of the Mother as eternal aspiration. The energy here is vast, oceanic, and deeply grounding. It is the threshold of India. The vibration is one of waiting and longing for the divine union. Because the back of Sati fell here, it is also a powerful Shakti Peeth. The vibration is unique as it is governed by the sunrises and sunsets over the three oceans. It is a site where one seeks the purity and the strength of the Goddess to stay on the spiritual path. The air is always vibrant with the sound of the crashing waves and the chanting of the Devi Mahatmyam.",
        "longDescription": "The history of Kanyakumari is as ancient as the land itself. Legend tells of the Goddess Parvati in her avatar as Kanya Kumari performing intense penance to marry Lord Shiva. When the marriage did not take place due to divine play, she vowed to remain a virgin and stay at the tip of the land to protect it. The temple is an ancient structure with a beautiful gopuram. Kanyakumari gained modern fame through Swami Vivekananda, who meditated on a rock in the sea and received his vision of India''s mission to the world. The Vivekananda Rock Memorial and the massive Thiruvalluvar Statue are modern symbols that complement the ancient temple. The city is the only place in India where one can see both the sunrise and the sunset from the same spot, especially during the full moon when the moon rises as the sun sets.",
        "spiritualArchitecture": "The Kanyakumari temple is built in the Dravidian style with stone-carved pillars and a tiered gopuram. The main idol of the Goddess is made of blue stone, featuring a diamond nose-ring that is said to be so bright that it was once mistaken for a lighthouse by sailors. The Vivekananda Rock Memorial is a masterpiece of modern spiritual architecture, combining various Indian temple styles. The Thiruvalluvar Statue, standing 133 feet tall, is a feat of modern stone engineering.",
        "vedicReferences": "Kanyakumari is mentioned in the Ramayana, the Mahabharata, and the Periplus of the Erythraean Sea. It is a central site in the geography of the Shakti Peeths.",
        "deepInsights": "The virgin goddess represents the unmanifested power (Para Shakti) that is the source of all creation. Kanyakumari teaches that the highest goal is the divine union, and everything else is secondary.",
        "ancientLore": "Lore tells that the uncooked rice and grains intended for the Goddess''s wedding were turned into stones and sand when the marriage was cancelled, which is why the sand at Kanyakumari has multiple colors and shapes. Another legend says that the footprint of the Goddess is still visible on the Vivekananda Rock.",
        "keyRituals": [
                {
                        "name": "Nirmalya Darshan",
                        "description": "Viewing the Goddess in the early morning before she is adorned with jewels and flowers."
                },
                {
                        "name": "Samudra Aarti",
                        "description": "The evening ritual of lamps performed at the confluence of the three oceans."
                },
                {
                        "name": "Vijayadashami Festival",
                        "description": "The massive annual celebration marking the victory of the Goddess over evil."
                }
        ],
        "highlights": [
                {
                        "name": "Vivekananda Rock Memorial",
                        "description": "The sacred rock where the great saint meditated and received his vision."
                },
                {
                        "name": "Thiruvalluvar Statue",
                        "description": "A 133-foot tall stone statue dedicated to the great Tamil poet and philosopher."
                },
                {
                        "name": "Triveni Sangam",
                        "description": "The exact point where the Arabian Sea, Bay of Bengal, and Indian Ocean meet."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by rail and road from Chennai and Madurai. It is the southernmost station of the Indian Railways.",
                "nearestAirport": "Trivandrum International Airport (approx 90km).",
                "nearestRailway": "Kanyakumari Railway Station."
        },
        "tips": [
                "Wake up early to catch the sunrise over the sea; it is a life-changing experience.",
                "Take the ferry to the Vivekananda Rock Memorial early in the morning to avoid long queues.",
                "Visit the Gandhi Mandapam, where the ashes of Mahatma Gandhi were kept before immersion."
        ],
        "faqs": [
                {
                        "question": "Can I see both sunrise and sunset?",
                        "answer": "Yes, especially during the full moon, you can see the sun setting and the moon rising simultaneously from the same spot."
                },
                {
                        "question": "How to reach from Madurai?",
                        "answer": "It is about 245km (4-5 hours) by road or rail."
                },
                {
                        "question": "Is there a dress code for the temple?",
                        "answer": "Yes, men must be bare-chested and wear a dhoti or trousers; women should wear traditional attire."
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
    'Khajuraho (Matangeshwar)', 
    'khajuraho-matangeshwar', 
    'Spiritual City', 
    'mp', 
    'Beyond its world-famous erotic sculptures, Khajuraho is a city of profound spiritual architecture. The Matangeshwar Temple is the only living temple in the ancient complex, housing a massive 8-foot tall emerald-green lingam that is said to grow every year.', 
    '300.5', 
    '280.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Pinnacle of Devotional and Sacred Art', 
    'Khajuraho Temples | Matangeshwar, Chandela Lore & Ancient Insights', 
    'Discover the spiritual depth of Khajuraho. Explore the Matangeshwar temple, the unique Chandela architecture, and the philosophy of the integration of the material and the divine.', 
    'Khajuraho, Matangeshwar, Madhya Pradesh, Chandela Dynasty, Lord Shiva, Hindu Pilgrimage, Ancient Lore, Architecture', 
    '40', 
    '{
        "spiritualEssence": "Khajuraho is the manifestation of the divine in the perfection of form. The energy here is expansive, artistic, and deeply integrated. It is the site where the material and the spiritual are seen as part of the same continuum. The vibration is one of beauty as a path to truth. The Matangeshwar temple, dedicated to Shiva as the Master of Senses, represents the grounding of this artistic energy into daily life. The vibration is ancient, potent, and incredibly sophisticated. A visit here is believed to grant the devotee the ability to see the divine in all forms of existence. The air is always vibrant with the history of the Chandela kings and the silent majesty of the stone temples.",
        "longDescription": "Built by the Chandela dynasty between 950 and 1050 CE, the Khajuraho group of temples is a UNESCO World Heritage site. Originally a complex of 85 temples, only 25 remain today. The temples are famous for their Nagara-style architecture and intricate sculptures. The Matangeshwar temple is located outside the main Western Group and is the only one where active worship has never ceased. The main lingam is a massive 8.4 feet tall structure made of polished stone. Khajuraho is a city where every stone tells a story of the Vedic worldview—from the four goals of life (Purusharthas) to the cycles of the cosmos. The temples are situated in a serene landscape that has survived centuries of neglect, rediscoverd by a British officer in the 19th century.",
        "spiritualArchitecture": "The temples are built of sandstone using a unique mortarless construction technique. The architecture is characterized by its high plinths and towering, multi-tiered Shikharas that resemble the peaks of the Himalayas. The Matangeshwar temple is a simple, massive structure with a square plan. The interior is dominated by the huge lingam, which is worshipped with milk, water, and flowers daily. The other temples, like Kandariya Mahadeva, are masterpieces of complex architectural geometry and detailed sculpture.",
        "vedicReferences": "Khajuraho is mentioned in the records of ancient travelers like Al-Biruni and Ibn Battuta. It is hailed as a supreme center for the Nagara style of temple building.",
        "deepInsights": "The sculptures of Khajuraho represent the integration of all aspects of life—kama (desire), artha (wealth), dharma (duty), and moksha (liberation). It teaches that one cannot reach the top of the temple (liberation) without passing through the layers of the base (material life).",
        "ancientLore": "Lore tells that the Matangeshwar lingam grows by the length of a barley grain every year, marking the passage of time in the current era. Another legend says that the Chandela kings were descended from the Moon God himself.",
        "keyRituals": [
                {
                        "name": "Mahashivratri",
                        "description": "The most important festival where thousands gather to perform abhishekam of the Matangeshwar lingam."
                },
                {
                        "name": "Nitya Puja",
                        "description": "Daily morning and evening rituals involving the chanting of Vedic hymns."
                },
                {
                        "name": "Light and Sound Show",
                        "description": "An evening cultural ritual that tells the history of the Chandela kings and the temples."
                }
        ],
        "highlights": [
                {
                        "name": "Kandariya Mahadeva Temple",
                        "description": "The largest and most ornate temple in the Khajuraho complex."
                },
                {
                        "name": "Matangeshwar Temple",
                        "description": "The only living temple where active worship is still performed."
                },
                {
                        "name": "Raneh Falls",
                        "description": "A stunning canyon and waterfall located nearby, known as the Grand Canyon of India."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road and rail. Khajuraho has its own airport and a dedicated railway station.",
                "nearestAirport": "Khajuraho Airport.",
                "nearestRailway": "Khajuraho Railway Station."
        },
        "tips": [
                "Visit the temples during the Khajuraho Dance Festival in February for a unique cultural experience.",
                "Hire a licensed guide to understand the deep symbolism of the sculptures.",
                "The Matangeshwar temple is open to all and is a great place to experience local devotion."
        ],
        "faqs": [
                {
                        "question": "Is it true the lingam grows?",
                        "answer": "Yes, local tradition firmly believes the Matangeshwar lingam grows slightly every year, and it is measured regularly by the priests."
                },
                {
                        "question": "How many temples are there?",
                        "answer": "Out of the original 85 temples, about 25 are well-preserved and open to the public."
                },
                {
                        "question": "What is the best way to reach from Delhi?",
                        "answer": "There are direct trains (Bhopal Shatabdi or Vande Bharat to near cities) and occasional direct flights from Delhi."
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
    'Chidambaram (Nataraja)', 
    'chidambaram-nataraja', 
    'Spiritual City', 
    'tn', 
    'Chidambaram is the site of the ''Akasha'' (Ether) Lingam and the cosmic dance of Lord Shiva as Nataraja. It is the spiritual heart of the Shaivite world, where the Lord performs his Ananda Tandava in the hall of consciousness.', 
    '235.5', 
    '720.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Cosmic Dance of Eternal Consciousness', 
    'Chidambaram Nataraja Temple | Akasha Lingam, Tandava & Ancient Lore', 
    'Experience the cosmic vibration of Chidambaram. Discover the Nataraja temple, the mystery of the Akasha Lingam, and the profound philosophy of the Ananda Tandava.', 
    'Chidambaram, Nataraja, Tamil Nadu, Akasha Lingam, Lord Shiva, Tandava, Hindu Pilgrimage, Ancient Lore, Consciousness', 
    '41', 
    '{
        "spiritualEssence": "Chidambaram is the manifestation of the divine as pure space and consciousness (Chid + Ambaram). The energy here is ethereal, rhythmic, and intensely high-vibrational. It is the site where Shiva performs his dance of bliss (Ananda Tandava). The vibration is one of the eternal motion that underlies all stillness. As the Akasha Lingam, it represents the most subtle of the five elements. The vibration is one of absolute freedom and the realization that the entire universe is a dance of the divine. A visit here is believed to awaken the inner dancer within the devotee. The air is always vibrant with the sound of the Damaru and the chanting of the Tevaram hymns.",
        "longDescription": "The history of Chidambaram is linked to the sages Patanjali and Vyaghrapada, who performed penance to see the Lord''s dance. Shiva appeared and performed the Ananda Tandava in the Thillai forest. The temple is one of the few where Shiva is worshipped in his anthropomorphic form as Nataraja rather than a Lingam. The current structure was patronized by the Chola kings, who considered Nataraja their family deity. The temple is famous for its five Sabhas (halls), including the Kanaka Sabha (Golden Hall) where the main deity resides. The roof of the sanctum is covered with 21,600 golden tiles, representing the number of breaths a human takes in a day. Chidambaram is also the site of the ''Chidambara Rahasyam''—the secret of the empty space behind a curtain, signifying that God is ultimate space.",
        "spiritualArchitecture": "The temple is a masterpiece of Chola architecture with four massive gopurams decorated with the 108 poses of Bharatanatyam. The Kanaka Sabha is a beautiful structure with a golden roof. The temple features a large sacred tank called the Shivaganga. The pillars are carved with various forms of the Lord and the legends of the Nayanars. The temple is unique as it is managed by a group of hereditary priests called the Dikshitars, following ancient Vedic traditions.",
        "vedicReferences": "Chidambaram is celebrated in the Tevaram and Tiruvachakam. It is considered the primary site for the study of the cosmic dance of Shiva.",
        "deepInsights": "The dance of Nataraja represents the five activities of the divine: creation, maintenance, destruction, concealment, and grace. Chidambaram teaches that the ultimate reality is the space of consciousness in which the world arises and set.",
        "ancientLore": "Lore tells that the Lord defeated the pride of the sages in the Thillai forest by performing his dance. Another legend says that the Goddess Kali challenged Shiva to a dance competition here, which he won by performing the Urdhva Tandava.",
        "keyRituals": [
                {
                        "name": "Abhishekam",
                        "description": "The ritual bathing of the Nataraja idol performed six times a year on specific auspicious days."
                },
                {
                        "name": "Chidambara Rahasya Darshan",
                        "description": "The unveiling of the curtain to reveal the empty space, signifying the formless divine."
                },
                {
                        "name": "Arudra Darshan",
                        "description": "The most important festival of the temple, celebrated in December/January."
                }
        ],
        "highlights": [
                {
                        "name": "Kanaka Sabha",
                        "description": "The Golden Hall where the main deity Nataraja resides."
                },
                {
                        "name": "1000-Pillar Hall",
                        "description": "A massive hall used for various festivals and cultural events."
                },
                {
                        "name": "Shivaganga Tank",
                        "description": "The sacred tank located within the temple complex."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and during Arudra Darshan).",
                "howToReach": "Well connected by rail and road from Chennai (245km) and Pondicherry. Chidambaram has its own railway station.",
                "nearestAirport": "Chennai International Airport / Pondicherry Airport.",
                "nearestRailway": "Chidambaram Railway Station."
        },
        "tips": [
                "Visit during the Natyanjali Dance Festival in February for a unique cultural experience.",
                "Be prepared for the unique and strict ritual practices of the Dikshitar priests.",
                "Photography is allowed in the outer courtyard but strictly prohibited inside the Sabhas."
        ],
        "faqs": [
                {
                        "question": "What is the Chidambara Rahasyam?",
                        "answer": "It is the ''secret'' of the empty space behind a curtain, representing that the divine is both with form (Nataraja) and without form (Akasha)."
                },
                {
                        "question": "Why is it called the Akasha Lingam?",
                        "answer": "Because it represents the ''Ether'' or ''Space'' element, the most subtle of the five elements of nature."
                },
                {
                        "question": "How far is it from Pondicherry?",
                        "answer": "It is about 65 kilometers (1.5 to 2 hours) by road."
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
    'Tiruvannamalai (Arunachala)', 
    'tiruvannamalai-arunachala', 
    'Spiritual City', 
    'tn', 
    'Tiruvannamalai is the site of the ''Agni'' (Fire) Lingam and the sacred Arunachala hill, which is believed to be Shiva himself in the form of a mountain. It is the land of the great sage Ramana Maharshi and the center of self-inquiry.', 
    '230.2', 
    '700.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Fire of Eternal Self-Realization', 
    'Arunachala Tiruvannamalai | Agni Lingam, Ramana Maharshi & Lore', 
    'Explore the spiritual power of Arunachala. Discover the Annamalaiyar temple, the sacred Giri Pradakshina, and the profound wisdom of Ramana Maharshi.', 
    'Tiruvannamalai, Arunachala, Tamil Nadu, Agni Lingam, Lord Shiva, Ramana Maharshi, Giri Pradakshina, Hindu Pilgrimage, Ancient Lore', 
    '42', 
    '{
        "spiritualEssence": "Tiruvannamalai is the manifestation of the divine as the fire of wisdom (Jnana Agni). The energy here is silent, powerful, and intensely inward-drawing. The Arunachala hill is not just a mountain; it is the physical form of the eternal spirit. The vibration is one of absolute silence and the question ''Who am I?''. As the Agni Lingam, it represents the transformative power of truth. The vibration is ancient, potent, and considered the spiritual heart of the world. A visit here is believed to instantly dissolve the ego. The air is always vibrant with the presence of the many siddhas (perfected beings) who reside in the caves of the hill.",
        "longDescription": "The legend of Arunachala tells of a dispute between Brahma and Vishnu regarding their superiority. Shiva appeared as an infinite pillar of fire, and neither could find its end. Brahma lied about seeing the top, while Vishnu admitted his failure. Shiva then settled as the Arunachala hill to bless the world. The Annamalaiyar temple at the foot of the hill is one of the largest in India, covering 25 acres. Tiruvannamalai gained global fame through Ramana Maharshi, who came to the hill at the age of 16 and stayed until his departure, teaching the path of self-inquiry (Atma-Vichara). The city is famous for the Karthigai Deepam festival, where a massive fire is lit on the top of the hill, visible for miles around. The Giri Pradakshina (circumambulation of the hill) is a 14km ritual walk performed by millions every full moon.",
        "spiritualArchitecture": "The Annamalaiyar temple is a masterpiece of Dravidian architecture with nine massive gopurams. The eastern gopuram (Rajagopuram) is 217 feet tall. The temple features four large Prakarams (courtyards) and several thousand-pillar halls. The inner sanctum houses the Agni Lingam. The Ramana Ashram, located nearby, is a simple and serene complex with a beautiful meditation hall and the Samadhi of the sage. The architecture of the ashram reflects the simplicity and directness of Ramana''s teachings.",
        "vedicReferences": "Arunachala is mentioned in the Shiva Purana and the Skanda Purana (Arunachala Mahatmya). It is hailed as the supreme site for attaining liberation without any effort.",
        "deepInsights": "The hill represents the stillness of the self, while the fire represents the knowledge that burns away the illusion of the ego. Tiruvannamalai teaches that the ultimate reality is our own being.",
        "ancientLore": "Lore tells that the hill has been present through all the Yugas—appearing as a pillar of fire in Satya Yuga, as a hill of jewels in Treta Yuga, as a hill of gold in Dvapara Yuga, and as a hill of stone in the current Kali Yuga. Another legend says that the Goddess Parvati performed penance here to be reunited with Shiva.",
        "keyRituals": [
                {
                        "name": "Giri Pradakshina",
                        "description": "The 14km ritual walk around the sacred Arunachala hill, especially performed on full moon nights."
                },
                {
                        "name": "Karthigai Deepam",
                        "description": "The massive fire lit on the top of the hill annually in November/December."
                },
                {
                        "name": "Panchamrut Abhishek",
                        "description": "The ritual bathing of the Agni Lingam with five sacred substances."
                }
        ],
        "highlights": [
                {
                        "name": "Arunachala Hill",
                        "description": "The sacred mountain believed to be Lord Shiva himself."
                },
                {
                        "name": "Annamalaiyar Temple",
                        "description": "One of the largest and most ancient temples in India."
                },
                {
                        "name": "Ramana Ashram",
                        "description": "The world-famous center for self-inquiry and meditation."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and during Karthigai Deepam).",
                "howToReach": "190km from Chennai, well connected by road and rail. The nearest airport is Chennai.",
                "nearestAirport": "Chennai International Airport.",
                "nearestRailway": "Tiruvannamalai Railway Station."
        },
        "tips": [
                "Perform the Giri Pradakshina during the early morning hours to avoid the heat.",
                "Spend time in the meditation hall of the Ramana Ashram for a deep spiritual experience.",
                "Be prepared for large crowds during the Pournami (Full Moon) nights."
        ],
        "faqs": [
                {
                        "question": "How long is the Giri Pradakshina?",
                        "answer": "The walk around the hill is approximately 14 kilometers and takes 3-4 hours at a steady pace."
                },
                {
                        "question": "Who was Ramana Maharshi?",
                        "answer": "He was a 20th-century sage who attained enlightenment at a young age and taught the path of ''Who am I?'' from Arunachala."
                },
                {
                        "question": "Can I climb the hill?",
                        "answer": "Yes, there are paths leading to the caves of Ramana Maharshi (Virupaksha and Skanda), but climbing to the very top is restricted on certain days."
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
    'Udupi (Krishna Mutt)', 
    'udupi-krishna-mutt', 
    'Spiritual City', 
    'ka', 
    'Udupi is the land of Lord Krishna as a young boy and the center of the Dwaita philosophy. The unique feature is that the Lord is seen through a nine-holed silver window (Kanakana Kindi), signifying the power of a true devotee''s love.', 
    '150.2', 
    '580.8', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lord of the Nine-Holed Window', 
    'Udupi Krishna Mutt | Madhvacharya, Kanakana Kindi & Ancient Lore', 
    'Discover the unique spiritual aura of Udupi. Explore the Krishna Mutt, the legend of Kanakadasa, and the profound wisdom of the Dwaita philosophy.', 
    'Udupi, Krishna Mutt, Karnataka, Madhvacharya, Kanakadasa, Lord Krishna, Hindu Pilgrimage, Ancient Lore, Dwaita', 
    '43', 
    '{
        "spiritualEssence": "Udupi is the manifestation of the divine as the playful and accessible Lord. The energy here is joyful, disciplined, and deeply traditional. It is the heart of the Dvaita (dualism) philosophy established by Sri Madhvacharya. The vibration is one of Bhakti (devotion) combined with meticulous ritual. The unique feature of the Lord being visible only through a window signifies that the divine is reached through the small openings of a sincere heart. A visit here is believed to grant the devotee the same intimacy that the cowherds of Vrindavan had with Krishna. The air is always vibrant with the sound of the drums and the fragrance of the temple cuisine (Udupi meals), which is considered a form of prasadam.",
        "longDescription": "The history of Udupi is linked to the 13th-century philosopher-saint Madhvacharya, who recovered the idol of Lord Krishna from a ship carrying gopi-chandan. The idol is unique as it depicts Krishna as a small boy holding a churning rod. Madhvacharya established the eight monasteries (Ashta Mathas) to manage the temple rituals in a rotating cycle (Paryaya). Udupi gained legendary fame through the devotee Kanakadasa, a low-caste saint who was denied entry. He prayed so intensely from the outside that the Lord turned his back to the entrance and created a hole in the wall to give him Darshan. This hole, now covered with a silver window called Kanakana Kindi, remains the only way to see the Lord. Udupi is also famous as the birthplace of the world-renowned Udupi cuisine, which originated in the temple kitchens.",
        "spiritualArchitecture": "The Krishna Mutt is built in the traditional Coastal Karnataka style with several wooden courtyards and tiled roofs. The temple features a large sacred tank called the Madhva Sarovar. The Kanakana Kindi is an intricate silver-plated window with nine holes through which the deity is visible. The complex includes several shrines dedicated to Ganesha, Hanuman, and the various mathas. The atmosphere is one of ancient discipline, with the priests following rituals that have been unchanged for 800 years.",
        "vedicReferences": "Udupi is celebrated in the works of Madhvacharya and the Haridasa movement of Karnataka. It is considered the primary site for the Dvaita school of Vedanta.",
        "deepInsights": "The nine holes of the window represent the nine gates of the body which must be purified to see the divine. Udupi teaches that God responds to the love of a devotee, regardless of their social standing.",
        "ancientLore": "Lore tells that the original idol was worshipped by Rukmini in Dwarka and was later hidden in a mound of clay for protection. Another legend says that Madhvacharya personally calmed a storm in the Arabian Sea to save the ship carrying the idol.",
        "keyRituals": [
                {
                        "name": "Paryaya",
                        "description": "The unique biennial festival marking the transfer of temple management between the eight mathas."
                },
                {
                        "name": "Kanakana Kindi Darshan",
                        "description": "Viewing the Lord through the sacred nine-holed silver window."
                },
                {
                        "name": "Anna Dana",
                        "description": "The daily ritual of feeding thousands of devotees with temple prasadam."
                }
        ],
        "highlights": [
                {
                        "name": "Krishna Mutt",
                        "description": "The main temple complex and heart of the city."
                },
                {
                        "name": "Madhva Sarovar",
                        "description": "The sacred temple tank used for various rituals."
                },
                {
                        "name": "Anantheshwar Temple",
                        "description": "An ancient 8th-century temple where Madhvacharya used to teach."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and during Paryaya in January).",
                "howToReach": "60km from Mangalore, well connected by road and rail. Udupi has its own railway station on the Konkan line.",
                "nearestAirport": "Mangalore International Airport.",
                "nearestRailway": "Udupi Railway Station."
        },
        "tips": [
                "Don''t miss the traditional Udupi meal offered at the temple dining hall.",
                "Visit the nearby Malpe beach and St. Mary''s Island for a natural break.",
                "Respect the dress code within the temple (Dhoti/Kurta for men, Saree/Chudidar for women)."
        ],
        "faqs": [
                {
                        "question": "Who was Kanakadasa?",
                        "answer": "He was a 16th-century saint and poet whose devotion was so great that the Lord turned to give him Darshan through a hole in the wall."
                },
                {
                        "question": "What is the Paryaya festival?",
                        "answer": "It is a major event every two years when the responsibility of worshipping the Lord is handed over to the next of the eight mathas."
                },
                {
                        "question": "Is the temple open all day?",
                        "answer": "The temple is generally open from 5 AM to 9 PM, but the main Darshan has specific timings; check local updates."
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
), (
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
), (
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
), (
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
);
