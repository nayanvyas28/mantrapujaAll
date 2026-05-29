-- GOLD STANDARD PART 7 for Spritual_locations
INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
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

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Hemkund Sahib (High Altitude Shrine)', 
    'hemkund-sahib-sikh-shrine-high-altitude', 
    'Sacred Destination', 
    'uk', 
    'The "Lake of Gold", Hemkund Sahib is a magnificent high-altitude Sikh pilgrimage site at 4,632 meters. It is a site of absolute heroic authority and divine resonance, where Guru Gobind Singh is believed to have meditated in his previous birth, representing the absolute manifestation of the spiritual strength and the profound energy of the high Himalayan peaks.', 
    '510.2', 
    '195.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Seven Peaks and the Highest Gurudwara in the World', 
    'Hemkund Sahib | Uttarakhand, Guru Gobind Singh & Ancient Lore', 
    'Experience the profound majesty of Hemkund Sahib. Discover the high-altitude sacred lake, the legend of the tenth Guru, and the profound energy of the Chamoli pilgrimage.', 
    'Hemkund Sahib, Uttarakhand, Guru Gobind Singh, Sikh Pilgrimage, Hindu Pilgrimage, Ancient Lore, High Altitude, Chamoli', 
    '311', 
    '{
        "spiritualEssence": "Hemkund is the manifestation of the divine as the supreme sacrifice and the absolute power of the high-altitude devotion. The energy here is thin, luminous, and intensely vibrant. It is the site where the sky-water is held in a bowl of seven snow peaks. The vibration is one of ''Seva'' (Service) and the absolute connection to the celestial realms. As a Gurudwara built of the white marble and stone at the edge of a crystal-clear lake, it represents the spiritual lighthouse of the higher Chamoli. A visit here is believed to grant the devotee the absolute removal of the spiritual fatigue and the blessing of the divine resilience. The air is always vibrant with the scent of the eternal snow and the constant, rhythmic sound of the Gurbani echoing across the freezing waters.",
        "longDescription": "Hemkund Sahib (literally ''Lake of Ice'') is mentioned in the Bachitar Natak, the autobiography of Guru Gobind Singh. It is surrounded by seven peaks, each adorned with a Nishan Sahib (Sikh flag). The site also features an ancient temple dedicated to the Lord Lakshmana, who is believed to have meditated here to regain his strength after the battle with Meghnada. The trek to Hemkund is one of the most challenging and beautiful in the Himalayas, passing through the dense forests and the alpine meadows. The site is famous for the Brahma Kamal (celestial lotus) that blooms in the surrounding rocks. It is a site where the highest level of Sikh heroism and the most ancient Hindu mythology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Hemkund Sahib is a spectacular display of the modern high-altitude style with a focus on the structural resilience and the panoramic integration. The Gurudwara features a unique star-shaped design with a high roof made of the aluminum and the stone to withstand the heavy winter snow. A unique feature is the presence of the large bathing pool (Sarovar) where the pilgrims take a holy dip in the freezing waters. The architecture is designed to reflect the form of the surrounding peaks. The use of the white colors and the vibrant saffron flags create a sense of a spiritual home that is both ancient and alert. The complex includes a large community kitchen (Langar) and a nearby Lakshmana temple.",
        "vedicReferences": "Hemkund is celebrated in the local oral traditions as the supreme site where the ''Sesh-Nag'' (the cosmic serpent) personally anchored the mountain peaks to protect the sacred lake.",
        "deepInsights": "The high-altitude lake represents the truth that the highest realization is found at the peak of the personal effort. Hemkund teaches that the spirit must become as clear and as deep as the mountain water.",
        "ancientLore": "Lore tells that the seven peaks personally bowed to the Guru Gobind Singh during his meditation. Another legend says that the Brahma Kamal flowers only bloom for those who have attained a state of pure devotion at the Hemkund lake.",
        "keyRituals": [
                {
                        "name": "Hemkund Sarovar Snanam",
                        "description": "Taking a holy dip in the freezing waters of the sacred lake to seek the absolute spiritual purification."
                },
                {
                        "name": "Gurbani Path (Hemkund)",
                        "description": "Listening to the sacred hymns in the highest Gurudwara to seek the mental clarity and the peace."
                },
                {
                        "name": "Lakshmana Temple Archana",
                        "description": "Offering prayers at the ancient Hindu shrine to seek the heroic strength and the protection."
                },
                {
                        "name": "Brahma Kamal Offering",
                        "description": "Offering the rare celestial lotus to the sacred book or the deity as a symbol of the high-altitude devotion."
                }
        ],
        "highlights": [
                {
                        "name": "The High-Altitude Gurudwara",
                        "description": "The magnificent white heart of the pilgrimage, perched at over 15,000 feet."
                },
                {
                        "name": "The Hemkund Sarovar",
                        "description": "The crystal-clear high-altitude lake that reflects the seven surrounding peaks."
                },
                {
                        "name": "The Lakshmana Temple",
                        "description": "The ancient stone shrine associated with the epic Ramayana history."
                },
                {
                        "name": "The Seven Peaks (Saptrishi)",
                        "description": "The spectacular mountain circle that frames the sacred lake and the Gurudwara."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (the site is inaccessible and covered in deep snow during the winter).",
                "howToReach": "Reached by a challenging 6km trek from Ghangaria (which is 13km from Govindghat).",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Start the trek from Ghangaria very early in the morning; the weather often changes in the afternoon.",
                "The altitude is very high; maintain a slow and steady pace and avoid any over-exertion.",
                "The water in the lake is freezing; do not stay in the water for more than a few seconds during the holy dip."
        ],
        "faqs": [
                {
                        "question": "How high is Hemkund Sahib?",
                        "answer": "It is located at an altitude of approximately 4,632 meters (15,200 feet)."
                },
                {
                        "question": "Who was it dedicated to?",
                        "answer": "It is dedicated to the tenth Sikh Guru, Guru Gobind Singh, and is also sacred to Lord Lakshmana."
                },
                {
                        "question": "Is it open all year?",
                        "answer": "No, it is only open from late May to early October; for the rest of the year, it is buried under 20-30 feet of snow."
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
    'Valley of Flowers', 
    'valley-of-flowers-national-park-spiritual-nature', 
    'Sacred Destination', 
    'uk', 
    'The "Garden of the Gods", the Valley of Flowers is a spectacular high-altitude alpine meadow in Chamoli. It is a site of absolute botanical authority and divine beauty, where hundreds of species of wild-flowers bloom in a natural bowl, representing the absolute manifestation of the creative abundance and the profound energy of the Pushpawati river valley.', 
    '505.2', 
    '190.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Alpine Bloom and the Garden of the Celestial Spirits', 
    'Valley of Flowers | Uttarakhand, Nature & Ancient Lore', 
    'Experience the profound beauty of the Valley of Flowers. Discover the high-altitude floral sanctuary, the legend of the celestial garden, and the profound energy of the Chamoli pilgrimage.', 
    'Valley of Flowers, Uttarakhand, Nature, Chamoli, Hindu Pilgrimage, Ancient Lore, High Altitude, Alpine Flowers', 
    '312', 
    '{
        "spiritualEssence": "The Valley of Flowers is the manifestation of the divine as the supreme beauty and the absolute power of the natural abundance. The energy here is fresh, fragrant, and intensely ecstatic. It is the site where the colors of the rainbow are anchored to the earth. The vibration is one of ''Ananda'' (Bliss) and the absolute connection to the creative force of the universe. As a valley set between the massive snow peaks of the Zanskar and the Great Himalayan ranges, it represents the spiritual garden of the northern Garhwal. A visit here is believed to grant the devotee the absolute revitalization of the spirit and the blessing of the divine harmony. The air is always vibrant with the scent of a thousand flowers and the constant, rhythmic sound of the Pushpawati river.",
        "longDescription": "The Valley of Flowers is a UNESCO World Heritage site, famous for its diverse flora and its connection to the Hindu mythology. It is traditionally believed to be the place where the Gandharvas (celestial musicians) and the Apsaras (nymphs) reside. According to the Ramayana, Hanuman found the Sanjivani herb for the wounded Lakshmana in this very region. The valley was brought to the attention of the modern world by the British mountaineer Frank Smythe in 1931. It features rare species like the Brahma Kamal, the Blue Poppy, and the Cobra Lily. The valley is only accessible during the summer months when the snow melts and the flowers bloom in a spectacular riot of colors. It is a site where the highest level of high-altitude ecology and the most ancient nature-worship are perfectly unified.",
        "spiritualArchitecture": "The architecture of the Valley of Flowers is a spectacular display of the divine landscaping of the nature. The \"temple\" is the valley floor itself, featuring a series of natural meadows and rock gardens. A unique feature is the absolute variety of the colors and the textures that change every week as the different species bloom. The \"architecture\" is designed to overwhelm the human senses with its scale and its absolute beauty. The use of the vibrant flower-carpets against the backdrop of the dark rocks and the white snow create a sense of a spiritual palace that is renewed every year. The site includes several small stone bridges over the Pushpawati river and a simple memorial for the botanist Joan Margaret Legge.",
        "vedicReferences": "The Valley of Flowers is celebrated in the local oral epics as the supreme site where the ''Pushpa-Drishti'' (the vision of the flowers) was personally manifested by the gods to celebrate the victory of the Dharma.",
        "deepInsights": "The blooming of the flowers represents the truth that the spirit must bloom where it is planted, even in the most rugged environments. The Valley of Flowers teaches that the highest worship is the appreciation of the divine beauty in the nature.",
        "ancientLore": "Lore tells that the flowers of the valley personally bow to the pilgrims of the Hemkund Sahib. Another legend says that the scent of the valley can heal the deepest emotional wounds of those who walk through its meadows with a pure heart.",
        "keyRituals": [
                {
                        "name": "Alpine-Flower Contemplation",
                        "description": "Walking in silence through the meadows to experience the oneness with the creative abundance of the nature."
                },
                {
                        "name": "Pushpawati River Arghya",
                        "description": "Offering sacred water to the river that flows through the valley to seek the purification of the spirit."
                },
                {
                        "name": "Himalayan Nature Prayer",
                        "description": "Offering a silent prayer for the protection of the mountain ecology while standing among the flowers."
                },
                {
                        "name": "Brahma Kamal Darshan",
                        "description": "Searching for the rare celestial lotus to seek the blessing of the spiritual attainment."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Flower Meadow",
                        "description": "The central heart of the valley where the most intense blooming occurs."
                },
                {
                        "name": "The Pushpawati River",
                        "description": "The beautiful and fast-flowing stream that defines the geography of the valley."
                },
                {
                        "name": "Joan Margaret Legge Memorial",
                        "description": "The peaceful spot dedicated to the botanist who lost her life while studying the flowers of the valley."
                },
                {
                        "name": "The Zanskar Peak View",
                        "description": "The spectacular perspective of the high snow peaks that guard the northern end of the valley."
                }
        ],
        "travelInfo": {
                "bestTime": "July to August (the peak blooming season).",
                "howToReach": "Reached by an 11km trek from Ghangaria (which is 13km from Govindghat).",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit the valley as early as possible in the morning; the entry is limited and you must return to Ghangaria by the evening.",
                "Carry adequate rain gear; the monsoon months of July and August are the best for the flowers but involve heavy rains.",
                "Do not pick any flowers or plants; the valley is a strictly protected national park and a sacred site."
        ],
        "faqs": [
                {
                        "question": "How long is the trek?",
                        "answer": "It is a 4km trek from Ghangaria to the entrance of the valley, and then you can walk another 5-10km within the valley."
                },
                {
                        "question": "Are there any facilities inside?",
                        "answer": "No, there are no shops, toilets, or shelters inside the valley; you must carry your own food and water and return the same day."
                },
                {
                        "question": "Who discovered it?",
                        "answer": "While it was known to the locals for centuries, it was introduced to the world by the British mountaineer Frank Smythe in 1931."
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
    'Mana Village', 
    'mana-village-vyas-gufa-last-indian-village', 
    'Sacred Destination', 
    'uk', 
    'The "Last Village of India", Mana is a historic settlement near Badrinath. It is a site of absolute literary authority and divine resonance, where the Sage Vyasa is believed to have composed the Mahabharata, representing the absolute manifestation of the spiritual wisdom and the profound energy of the high Himalayan frontier.', 
    '520.2', 
    '185.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Eternal Epic and the Cradle of the Vedic Wisdom', 
    'Mana Village Vyas Gufa | Uttarakhand, Mahabharata & Ancient Lore', 
    'Experience the profound energy of Mana Village. Discover the Vyas Gufa, the legend of the Ganesh Gufa, and the profound energy of the Badrinath frontier pilgrimage.', 
    'Mana Village, Uttarakhand, Vyas Gufa, Ganesh Gufa, Mahabharata, Hindu Pilgrimage, Ancient Lore, Badrinath, Last Indian Village', 
    '313', 
    '{
        "spiritualEssence": "Mana is the manifestation of the divine as the supreme wisdom and the absolute power of the spiritual transmission. The energy here is ancient, resonant, and intensely authoritative. It is the site where the great epics were given form. The vibration is one of ''Vidya'' (Knowledge) and the absolute connection to the roots of the Indian civilization. As a village set on the banks of the Saraswati and Alaknanda at the edge of the Tibetan plateau, it represents the spiritual sentinel of the northern frontier. A visit here is believed to grant the devotee the absolute clarity of the intellect and the blessing of the divine inspiration. The air is always vibrant with the scent of the juniper and the silent, heavy energy of the ancient stone caves.",
        "longDescription": "Mana is famous for its connection to the Sage Vyasa and the Lord Ganesha. The Vyas Gufa is a natural cave where the sage is said to have lived while composing the Mahabharata and the 18 Puranas. Nearby is the Ganesh Gufa, where the elephant-headed god is believed to have written the epic as Vyasa dictated it. The village also features the Bheem Pul, a massive natural stone bridge over the Saraswati river, said to have been placed by Bhima for Draupadi. It is the last human settlement before the Indo-Tibetan border. Mana is a site where the highest level of Vedic literature and the most rugged frontier culture are perfectly unified.",
        "spiritualArchitecture": "The architecture of Mana is a spectacular display of the traditional Bhotia stone style with a focus on the structural permanence and the cave-integration. The Vyas Gufa features a natural rock formation that resembles the pages of a manuscript (the Vyas Pothi). A unique feature is the presence of the small, thick-walled stone houses and the intricately carved wooden balconies. The architecture is designed to withstand the extreme winters of the high Himalayas. The use of the local gray stone and the vibrant flags create a sense of a spiritual home that is both ancient and alert. The complex includes several sacred spots associated with the Pandavas'' final journey (Swargarohini).",
        "vedicReferences": "Mana is celebrated in the Mahabharata as the supreme site where the ''Itihasa'' (History) of the great war was personally recorded for the benefit of the future generations.",
        "deepInsights": "The caves of the sages represent the truth that the highest wisdom is found in the simplicity of the mountain life. Mana teaches that the spirit must reach its final frontier to find the true story of the existence.",
        "ancientLore": "Lore tells that the river Saraswati personally became silent at Mana to avoid disturbing the Sage Vyasa while he was dictating the Mahabharata. Another legend says that the Bheem Pul was placed by a single hand of the heroic brother during the trek to the heavens.",
        "keyRituals": [
                {
                        "name": "Vyas Gufa Pothi Puja",
                        "description": "Offering prayers to the sacred manuscript-shaped rock to seek the intellectual and spiritual wisdom."
                },
                {
                        "name": "Ganesh Gufa Archana",
                        "description": "Offering prayers at the writing site of the Lord Ganesha to seek the removal of the obstacles in the studies and the work."
                },
                {
                        "name": "Saraswati River Arghya (Mana)",
                        "description": "Offering sacred water to the river at its manifest source to seek the blessing of the speech and the arts."
                },
                {
                        "name": "Bheem Pul Contemplation",
                        "description": "Reflecting on the strength and the sacrifice of the Pandavas while standing on the natural stone bridge."
                }
        ],
        "highlights": [
                {
                        "name": "The Vyas Gufa",
                        "description": "The sacred natural cave where the great sage composed the world''s longest epic."
                },
                {
                        "name": "The Ganesh Gufa",
                        "description": "The historic writing spot of the elephant-headed god nearby."
                },
                {
                        "name": "Bheem Pul",
                        "description": "The massive natural stone bridge over the roaring Saraswati river."
                },
                {
                        "name": "The Last Indian Tea Shop",
                        "description": "The iconic and peaceful spot that marks the spiritual and geographical edge of the nation."
                }
        ],
        "travelInfo": {
                "bestTime": "May to June and September to October (the village is buried in snow during the winter).",
                "howToReach": "Located 3km from Badrinath. Easily accessible by foot or taxi from the Badrinath town.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit the Vyas Gufa during the early morning hours to enjoy the silence of the cave before the crowds arrive.",
                "Take the time to walk to the Saraswati river source (Keshav Prayag) nearby; the energy of the meeting rivers is exceptionally powerful.",
                "Respect the local Bhotia culture; Mana is a living village with its own unique traditions and the way of life."
        ],
        "faqs": [
                {
                        "question": "Why is it called the last village?",
                        "answer": "Because it is the last human settlement in India on the road leading to the Indo-Tibetan border."
                },
                {
                        "question": "What is the Vyas Pothi?",
                        "answer": "It is a rock formation near the Vyas Gufa that looks like a stack of ancient palm-leaf manuscripts."
                },
                {
                        "question": "Is the Saraswati river visible here?",
                        "answer": "Yes, the Saraswati river is clearly visible in Mana before it joins the Alaknanda and then disappears underground according to the tradition."
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
    'Satopanth Tal', 
    'satopanth-tal-lake-of-the-trinity', 
    'Sacred Destination', 
    'uk', 
    'The "Lake of the Divine Truth", Satopanth Tal is a spectacular triangular lake at 4,600 meters. It is a site of absolute celestial authority and divine resonance, where the Trinity of Brahma, Vishnu, and Mahesh are believed to meditate on the three corners, representing the absolute manifestation of the cosmic balance.', 
    '525.2', 
    '175.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Three Corners and the Mirror of the High Himalayan Gods', 
    'Satopanth Tal | Uttarakhand, Trinity & Ancient Lore', 
    'Experience the profound majesty of Satopanth Tal. Discover the triangular sacred lake, the legend of the meditating Trinity, and the profound energy of the high Badrinath pilgrimage.', 
    'Satopanth Tal, Uttarakhand, Trinity, Brahma, Vishnu, Shiva, Hindu Pilgrimage, Ancient Lore, High Altitude, Badrinath', 
    '314', 
    '{
        "spiritualEssence": "Satopanth is the manifestation of the divine as the supreme truth and the absolute power of the high-altitude silence. The energy here is thin, crystal-clear, and intensely sacred. It is the site where the three primal forces of the universe are perfectly unified. The vibration is one of ''Sattva'' (Purity) and the absolute connection to the celestial realms. As a triangular lake set among the massive snow peaks of the Chaukhamba and the Nilkantha, it represents the spiritual crown of the upper Alaknanda. A visit here is believed to grant the devotee the absolute removal of the karmic dualities and the blessing of the cosmic harmony. The air is always vibrant with the scent of the eternal snow and the silent, heavy energy of the peaks that touch the heaven.",
        "longDescription": "Satopanth Tal is reached by a challenging 25km trek from Badrinath. The lake is uniquely triangular in shape and is believed to be the spot where the Trinity (Brahma, Vishnu, and Shiva) took their holy baths and meditated. According to the Mahabharata, the Pandavas passed this lake on their final journey to the heavens (Swargarohini). The water of the lake is exceptionally pure and remains crystal clear throughout the year. The trek passes through the Laxmi Van and the Sahasradhara waterfalls. It is a site where the highest level of high-altitude adventure and the most intense Puranic mythology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Satopanth Tal is a spectacular display of the raw, uncarved majesty of nature. The \"temple\" is the lake itself, featuring a series of natural stone terraces and ice ridges. A unique feature is the perfect triangular geometry of the water body, which is seen as a physical manifestation of the sacred Yantra. The \"architecture\" is designed to humble the human spirit through its scale and its absolute isolation. The use of the brilliant turquoise water against the white snow and the dark rock create a sense of a spiritual palace that is not built by hands. The site includes several small stone shelters used by the high-altitude pilgrims.",
        "vedicReferences": "Satopanth is celebrated in the Skanda Purana as the supreme site where the ''Satya'' (Truth) was personally anchored to the glacier soil to guide the seekers of the highest reality.",
        "deepInsights": "The triangular shape represents the truth that the creation, the maintenance, and the dissolution are part of a single divine process. Satopanth teaches that the spirit must reach its highest altitude to see the oneness of the Trinity.",
        "ancientLore": "Lore tells that the birds of the region personally clean the lake of any straw or dust that falls into the water. Another legend says that the Trinity personally visits the lake every Ekadashi to take a holy dip in the subtle form.",
        "keyRituals": [
                {
                        "name": "Satopanth Trinity Snanam",
                        "description": "Taking a holy dip in the freezing triangular waters to seek the purification from the three types of the karmic debts."
                },
                {
                        "name": "Three-Corner Archana",
                        "description": "Offering prayers at the three distinct corners of the lake to seek the blessing of the Brahma, the Vishnu, and the Shiva."
                },
                {
                        "name": "Chaukhamba Reflection Meditation",
                        "description": "Sitting in the silence of the lake while focusing on the reflection of the massive peaks to seek the inner depth."
                },
                {
                        "name": "Swargarohini Path-Sankalpa",
                        "description": "Taking a sacred vow at the lake to follow the path of the truth and the righteousness."
                }
        ],
        "highlights": [
                {
                        "name": "The Triangular Lake",
                        "description": "The unique and sacred water body that defines the spiritual geography of the site."
                },
                {
                        "name": "Chaukhamba Peak View",
                        "description": "The stunning and direct perspective of the massive four-pillared mountain that guards the lake."
                },
                {
                        "name": "Laxmi Van",
                        "description": "The high-altitude forest area on the trail associated with the Goddess Laxmi."
                },
                {
                        "name": "Sahasradhara Waterfalls",
                        "description": "The spectacular series of a thousand falls that the pilgrim passes on the way to the lake."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (the trek is inaccessible and buried in deep snow for the rest of the year).",
                "howToReach": "Reached by a challenging 25km trek from Badrinath (via Mana). Requires a specialized forest permit and a local guide.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Ensure you are medically fit for high-altitude trekking; the oxygen levels at 4,600 meters are significantly lower.",
                "The trek involves crossing moving glaciers and narrow rock paths; use professional guides and be extremely careful.",
                "Carry all your waste back with you; the Satopanth area is an extremely sensitive and sacred ecological zone."
        ],
        "faqs": [
                {
                        "question": "How long is the trek?",
                        "answer": "The trek is about 25km from Mana village and usually takes 3-4 days to complete (to and fro)."
                },
                {
                        "question": "Why is it triangular?",
                        "answer": "Legend says it is triangular to accommodate the three gods of the Trinity—Brahma, Vishnu, and Mahesh—at the three corners."
                },
                {
                        "question": "Can I stay at the lake?",
                        "answer": "There are no permanent shelters; you must carry your own tents and camping equipment for the stay at the lake."
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
    'Swargarohini', 
    'swargarohini-path-to-heaven-himalayas', 
    'Sacred Destination', 
    'uk', 
    'The "Stairway to the Heaven", Swargarohini is a massive snow peak and glacier system in the upper Garhwal. It is a site of absolute final authority and divine transition, believed to be the spot where the Pandavas ascended to the celestial realms, representing the absolute manifestation of the spiritual liberation.', 
    '530.2', 
    '170.5', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Final Frontier of the Mortal Journey and the Sanctuary of the Celestial Transition', 
    'Swargarohini Peak | Uttarakhand, Mahabharata & Ancient Lore', 
    'Experience the profound majesty of Swargarohini. Discover the stairway to the heaven, the legend of the Pandavas'' final journey, and the profound energy of the high Himalayan frontier.', 
    'Swargarohini, Uttarakhand, Mahabharata, Pandavas, Heaven, Hindu Pilgrimage, Ancient Lore, High Altitude, Badrinath', 
    '315', 
    '{
        "spiritualEssence": "Swargarohini is the manifestation of the divine as the supreme transition and the absolute power of the final liberation. The energy here is thin, cold, and intensely celestial. It is the site where the earthly matter is dissolved into the light. The vibration is one of ''Moksha'' (Liberation) and the absolute connection to the heavens. As a series of massive snow ridges that appear like a stairway to the sky, it represents the spiritual culmination of the Mahabharata cycle. A visit here (or the contemplation of the peak) is believed to grant the devotee the absolute clarity of the soul and the blessing of the divine reception. The air is always vibrant with the scent of the eternal ice and the silent, heavy energy of the world''s edge.",
        "longDescription": "Swargarohini (literally ''the path to the heaven'') is located beyond the Satopanth Tal. According to the Mahabharata, this is the route taken by the five Pandavas, Draupadi, and a dog on their final journey. It is said that only Yudhishthira and the dog were able to complete the ascent in their mortal bodies. The peak is architecturally spectacular, with three distinct steps that resemble a massive ladder. It is a site of extreme mountaineering challenge and intense spiritual significance. Swargarohini is a site where the highest level of Himalayan high-altitude geography and the most profound epic resolution are perfectly unified in a single snow-capped majesty.",
        "spiritualArchitecture": "The architecture of Swargarohini is a spectacular display of the raw, uncarved majesty of nature. The \"temple\" is the mountain peak itself, featuring a series of natural ice ridges and rock steps. A unique feature is the absolute verticality of the ridges, which creates the uncanny resemblance to a stairway. The \"architecture\" is designed to humble the human spirit through its scale and its absolute isolation. The use of the brilliant white snow against the dark blue sky creates a sense of a spiritual palace that is not built by hands but by the breath of the divine. The site includes several high-altitude glacier valleys that are rarely visited by humans.",
        "vedicReferences": "Swargarohini is celebrated in the Mahabharata (Mahaprasthanika Parva) as the supreme site where the ''Dharma'' (the dog) personally accompanied the King Yudhishthira to the gates of the heaven.",
        "deepInsights": "The stairway to heaven represents the truth that the spiritual life is a gradual ascent that requires the absolute sacrifice of the earthly attachments. Swargarohini teaches that the spirit must reach its final peak to find the true home.",
        "ancientLore": "Lore tells that the mountain peak personally opened its gates for the righteous King Yudhishthira. Another legend says that the dog who accompanied him was actually the Lord Dharma in disguise, testing the king''s compassion for the last time.",
        "keyRituals": [
                {
                        "name": "Final-Journey Contemplation",
                        "description": "Sitting in the silence of the high mountains to reflect on the nature of the mortal journey and the liberation."
                },
                {
                        "name": "Yudhishthira-Dharma Meditation",
                        "description": "Meditating on the power of the righteousness and the compassion while facing the Swargarohini peak."
                },
                {
                        "name": "Himalayan Sky-Offering",
                        "description": "Offering a silent prayer to the celestial realms from the highest accessible point of the trek."
                },
                {
                        "name": "Dharma-Sankalpa (Swargarohini)",
                        "description": "Taking a sacred vow at the edge of the glacier to live a life of absolute truth and the compassion."
                }
        ],
        "highlights": [
                {
                        "name": "The Three Steps of Heaven",
                        "description": "The unique natural rock and ice formations that look like a massive ladder."
                },
                {
                        "name": "The Swargarohini Glacier",
                        "description": "The massive ice field that surrounds the base of the peak, associated with the final trek of the Pandavas."
                },
                {
                        "name": "The Celestial Horizon",
                        "description": "The spectacular perspective of the high Himalayan sky from the world''s edge."
                },
                {
                        "name": "The Path of the Sages",
                        "description": "The historic high-altitude route that has been contemplated by the seekers for thousands of years."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (the peak is inaccessible and covered in deep snow for the rest of the year).",
                "howToReach": "Reached by an extremely challenging trek beyond Satopanth Tal (which is 25km from Mana). Requires professional mountaineering equipment and a guide.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Do not attempt to reach the base of Swargarohini without professional mountaineering experience and equipment; the terrain is extremely dangerous.",
                "Contemplate the peak from the safety of the Satopanth Tal or the high ridges nearby; the spiritual energy is accessible from a distance.",
                "Respect the absolute silence of the high Himalayas; it is a site of final transition and the highest spiritual authority."
        ],
        "faqs": [
                {
                        "question": "Did the Pandavas really go here?",
                        "answer": "According to the Mahabharata, yes, this was the route for their final departure from the mortal world."
                },
                {
                        "question": "Can I climb the peak?",
                        "answer": "Climbing Swargarohini is a major mountaineering feat and requires specialized permits and a high level of technical skill."
                },
                {
                        "question": "Why is it called the stairway to heaven?",
                        "answer": "Because of its unique physical appearance with distinct, massive rock steps that lead toward the summit and the sky."
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
    'Khatling Glacier', 
    'khatling-glacier-source-of-bhilangna-river', 
    'Sacred Destination', 
    'uk', 
    'The "Source of the Bhilangna", Khatling Glacier is a magnificent ice system in the Tehri district. It is a site of absolute wilderness authority and divine emergence at 3,717 meters, representing the absolute manifestation of the hidden river-power and the profound energy of the high Garhwal ice.', 
    '420.2', 
    '210.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Hidden River and the Sanctuary of the Blue Ice Caves', 
    'Khatling Glacier | Uttarakhand, Bhilangna Source & Ancient Lore', 
    'Experience the profound majesty of Khatling. Discover the high-altitude glacier snout, the legend of the river-goddess Bhilangna, and the profound energy of the Tehri pilgrimage.', 
    'Khatling Glacier, Uttarakhand, Bhilangna River, Source, Tehri, Hindu Pilgrimage, Ancient Lore, High Altitude, Wilderness', 
    '316', 
    '{
        "spiritualEssence": "Khatling is the manifestation of the divine as the supreme emergence and the absolute power of the hidden flow. The energy here is cold, silent, and intensely primordial. It is the site where the river Bhilangna takes its first breath. The vibration is one of ''Gupta (River)'' (Hidden) and the absolute connection to the subterranean womb of the world. As a massive ice system surrounded by peaks like the Jogin and the Kirti Stambh, it represents the spiritual heart of the central Garhwal. A visit here is believed to grant the devotee the absolute removal of the inner obstacles and the blessing of the steady progress. The air is always vibrant with the scent of the glacier rock and the constant, rhythmic sound of the water carving its way through the ice.",
        "longDescription": "Khatling Glacier is one of the most significant and least visited sources of the Himalayan rivers. It is the source of the river Bhilangna, which later joins the Bhagirathi at the Tehri dam. The glacier is surrounded by several high-altitude meadows (bugyals) and is a favorite for the serious trekkers and the seekers of the absolute isolation. Legend tells that the river Bhilangna was a beautiful maiden who performed penance here to marry the Lord Shiva, but was later transformed into a river to serve the world. The trek to Khatling is rugged and passes through the remote villages of the Ghuttu region. Khatling is a site where the highest level of high-altitude wilderness and the most intimate mountain folklore are perfectly unified.",
        "spiritualArchitecture": "The architecture of Khatling is a spectacular display of the raw, uncarved majesty of the nature. The \"temple\" is the glacier snout itself, featuring a series of blue ice walls and natural stone arches. A unique feature is the presence of the vast lateral moraines (ridges of rock and ice) that frame the glacier valley. The \"architecture\" is designed to focus the human mind on the singularity of the natural force. The use of the brilliant white snow and the dark blue of the ice create a sense of a spiritual palace that is not built by hands. The site includes several small meditation spots in the surrounding high-altitude meadows.",
        "vedicReferences": "Khatling is celebrated in the local oral epics as the supreme site where the ''Bhilangna-Shakti'' was personally anchored to the glacier soil to protect the central valleys.",
        "deepInsights": "The emergence of the river from the ice represents the truth that the highest service is a continuous flow from the hidden source. Khatling teaches that the spirit must remain as pure and as persistent as the glacier stream.",
        "ancientLore": "Lore tells that the glacier personally protects the hidden treasures of the ancient sages who meditated in the surrounding caves. Another legend says that the lights of Khatling can be seen by the realized souls during the summer solstice, signaling the divine presence.",
        "keyRituals": [
                {
                        "name": "Bhilangna Source Arghya",
                        "description": "Offering sacred water to the sun at the snout of the glacier to seek the purification of the intentions."
                },
                {
                        "name": "Wilderness Meditation (Khatling)",
                        "description": "Sitting in the silence of the high-altitude meadows to seek the inner depth and the clarity."
                },
                {
                        "name": "Glacier-Rock Offering",
                        "description": "Placing a small stone on a nearby cairn to symbolize the individual''s connection to the glacier."
                },
                {
                        "name": "Himalayan Nature Vow",
                        "description": "Taking a sacred vow at the glacier to protect the mountain environment and the river sources."
                }
        ],
        "highlights": [
                {
                        "name": "The Glacier Snout",
                        "description": "The massive ice heart of the glacier from where the river Bhilangna emerges."
                },
                {
                        "name": "The Jogin Peak View",
                        "description": "The stunning and direct perspective of the Jogin peaks that guard the glacier valley."
                },
                {
                        "name": "The Sahasra Tal Group",
                        "description": "A series of a thousand small high-altitude lakes located on the ridges surrounding the glacier."
                },
                {
                        "name": "The Khatling Meadows (Bugyals)",
                        "description": "The spectacular alpine grasslands that provide a natural sanctuary for the trekkers and the seekers."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (the trek is inaccessible and covered in deep snow during the winter).",
                "howToReach": "Reached by a challenging trek from the village of Ghuttu in the Tehri district. Requires a specialized forest permit and a local guide.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Ensure you are medically fit for high-altitude trekking; the oxygen levels are significantly lower than the plains.",
                "The trek is rugged and less traveled; use professional guides and carry all your supplies and camping equipment.",
                "Respect the absolute silence of the high Himalayas; it is a site of pure wilderness and spiritual authority."
        ],
        "faqs": [
                {
                        "question": "How long is the trek?",
                        "answer": "The trek is about 40-50km from Ghuttu and usually takes 7-9 days to complete (to and fro)."
                },
                {
                        "question": "Is it the source of a river?",
                        "answer": "Yes, Khatling Glacier is the primary source of the Bhilangna river, a major tributary of the Bhagirathi."
                },
                {
                        "question": "Can I stay at the glacier?",
                        "answer": "There are no permanent shelters; you must carry your own tents and camping equipment for the entire trek."
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
    'Pindari Glacier', 
    'pindari-glacier-source-of-pindar-river', 
    'Sacred Destination', 
    'uk', 
    'The "Ice Soul of the Kumaon", Pindari Glacier is a magnificent ice system in the Bageshwar district. It is a site of absolute high-altitude authority and divine emergence at 3,660 meters, representing the absolute manifestation of the river-power and the profound energy of the Nanda Devi sanctuary.', 
    '570.2', 
    '210.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Pindar River and the Sanctuary of the Eternal Snow', 
    'Pindari Glacier | Uttarakhand, Pindar Source & Ancient Lore', 
    'Experience the profound majesty of Pindari. Discover the high-altitude glacier snout, the legend of the river Pindar, and the profound energy of the Kumaon pilgrimage.', 
    'Pindari Glacier, Uttarakhand, Pindar River, Source, Bageshwar, Hindu Pilgrimage, Ancient Lore, High Altitude, Kumaon', 
    '317', 
    '{
        "spiritualEssence": "Pindari is the manifestation of the divine as the supreme emergence and the absolute power of the life-giving flow. The energy here is cold, fresh, and intensely resonant. It is the site where the river Pindar takes its first liquid form. The vibration is one of ''Prana'' (Life-Force) and the absolute connection to the glacier sources. As a massive ice system set between the Nanda Devi and Nanda Kot peaks, it represents the spiritual heart of the higher Kumaon. A visit here is believed to grant the devotee the absolute revitalization of the spirit and the blessing of the divine energy. The air is always vibrant with the scent of the cold rock and the constant, rhythmic sound of the water carving its way through the ice.",
        "longDescription": "Pindari Glacier is the most accessible and the most famous of the Kumaon glaciers. It is the source of the river Pindar, which later joins the Alaknanda at Karnaprayag. The glacier is 3km long and is surrounded by some of the most spectacular peaks in the Himalayas. The trek to Pindari is legendary for its beauty, passing through the villages of Khati and the high meadows of Phurkia. Legend tells that the river Pindar personally brings the blessings of the Mother Nanda Devi to the lower valleys. Pindari is a site where the highest level of Himalayan trekking and the most ancient nature-worship are perfectly unified.",
        "spiritualArchitecture": "The architecture of Pindari is a spectacular display of the raw, uncarved majesty of the nature. The \"temple\" is the glacier snout itself, featuring a series of white ice walls and natural stone arches. A unique feature is the presence of the Zero Point, a spectacular vantage point from where one can see the massive ice-fall of the glacier. The \"architecture\" is designed to focus the human mind on the scale and the power of the high Himalayas. The use of the brilliant white snow against the dark rock and the blue sky create a sense of a spiritual palace that is not built by hands. The site includes several small meditation spots in the surrounding high-altitude meadows.",
        "vedicReferences": "Pindari is celebrated in the local oral epics of the Kumaon as the supreme site where the ''Pindar-Shakti'' was personally manifested to protect the eastern valleys.",
        "deepInsights": "The emergence of the river from the ice represents the truth that the highest service is a continuous flow from the frozen stillness. Pindari teaches that the spirit must remain as pure and as persistent as the mountain stream.",
        "ancientLore": "Lore tells that the glacier personally protects the spirits of the ancestors who reside in the high peaks. Another legend says that the water of the Pindari source has the power to heal all the spiritual fatigue of the sincere seeker.",
        "keyRituals": [
                {
                        "name": "Pindar Source Arghya",
                        "description": "Offering sacred water to the sun at the snout of the glacier to seek the purification of the spirit."
                },
                {
                        "name": "Himalayan Silence Meditation",
                        "description": "Sitting in the silence of the Zero Point to seek the inner depth and the clarity."
                },
                {
                        "name": "Kumaon Frontier Vow",
                        "description": "Taking a sacred vow at the glacier to protect the mountain environment and the traditional culture."
                },
                {
                        "name": "Glacier-Rock Offering (Pindari)",
                        "description": "Placing a small stone on a nearby cairn to symbolize the individual''s connection to the ice-source."
                }
        ],
        "highlights": [
                {
                        "name": "The Pindari Glacier Zero Point",
                        "description": "The spectacular vantage point at the snout of the glacier."
                },
                {
                        "name": "Nanda Devi Peak View",
                        "description": "The stunning and direct perspective of the sacred peak from the glacier trail."
                },
                {
                        "name": "Khati Village",
                        "description": "The last human settlement on the trail, known for its ancient culture and the hospitality."
                },
                {
                        "name": "The Phurkia Meadows",
                        "description": "The beautiful alpine grasslands that provide a natural sanctuary for the trekkers."
                }
        ],
        "travelInfo": {
                "bestTime": "May to June and September to October (the trek is inaccessible and covered in deep snow during the winter).",
                "howToReach": "Reached by a 45km trek from the village of Loharkhet in the Bageshwar district. Well connected by road to Bageshwar and Almora.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "The trek is manageable but requires good physical fitness; acclimatize properly before reaching the higher altitudes.",
                "Carry all your waste back with you; the Pindari area is a strictly protected and sensitive ecological zone.",
                "Visit the Khati village to experience the traditional Kumaon mountain life and the culture."
        ],
        "faqs": [
                {
                        "question": "How long is the trek?",
                        "answer": "The trek is about 45km from Loharkhet and usually takes 6-7 days to complete (to and fro)."
                },
                {
                        "question": "Is it the source of a river?",
                        "answer": "Yes, Pindari Glacier is the primary source of the Pindar river, a major tributary of the Alaknanda."
                },
                {
                        "question": "Is it accessible to beginners?",
                        "answer": "Yes, compared to other glaciers, the Pindari trek is considered one of the more accessible and popular treks for beginners in the Himalayas."
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
    'Milam Glacier', 
    'milam-glacier-source-of-gori-ganga-river', 
    'Sacred Destination', 
    'uk', 
    'The "Glacier of the High Frontier", Milam is a massive ice system in the Pithoragarh district. It is a site of absolute high-altitude authority and divine emergence at 3,438 meters, representing the absolute manifestation of the river-power and the profound energy of the Indo-Tibetan border.', 
    '610.2', 
    '215.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Gori Ganga and the Sanctuary of the High Frontier Silence', 
    'Milam Glacier | Uttarakhand, Gori Ganga Source & Ancient Lore', 
    'Experience the profound majesty of Milam. Discover the high-altitude glacier snout, the legend of the river Gori Ganga, and the profound energy of the high Kumaon pilgrimage.', 
    'Milam Glacier, Uttarakhand, Gori Ganga River, Source, Pithoragarh, Hindu Pilgrimage, Ancient Lore, High Altitude, Frontier', 
    '318', 
    '{
        "spiritualEssence": "Milam is the manifestation of the divine as the supreme emergence and the absolute power of the high Himalayan currents. The energy here is cold, thin, and intensely vibrant. It is the site where the river Gori Ganga takes its first liquid form. The vibration is one of ''Shakti'' (Power) and the absolute connection to the glacier sources. As a massive ice system set at the base of the Trishuli and Hardeol peaks, it represents the spiritual heart of the Johar valley. A visit here is believed to grant the devotee the absolute removal of the mental dualities and the blessing of the divine resilience. The air is always vibrant with the scent of the eternal snow and the constant, rhythmic sound of the water carving its way through the ice.",
        "longDescription": "Milam Glacier is the largest glacier in the Kumaon Himalayas. It is the source of the river Gori Ganga, which later joins the Kali river at Jauljibi. The glacier is 16km long and was once a major trade route to the Tibet. The trek to Milam is legendary for its rugged beauty, passing through the remote villages of the Johar valley like Munsiyari and Milam village. Legend tells that the river Gori Ganga personally protects the ancient trade routes of the Bhotia tribes. Milam is a site where the highest level of frontier history and the most ancient nature-worship are perfectly unified.",
        "spiritualArchitecture": "The architecture of Milam is a spectacular display of the raw, uncarved majesty of the nature. The \"temple\" is the glacier snout itself, featuring a series of white ice walls and natural stone arches. A unique feature is the presence of the vast lateral moraines (ridges of rock and ice) that frame the glacier valley. The \"architecture\" is designed to focus the human mind on the scale and the power of the high Himalayas. The use of the brilliant white snow against the dark rock and the blue sky create a sense of a spiritual palace that is not built by hands. The site includes several small meditation spots in the surrounding high-altitude meadows.",
        "vedicReferences": "Milam is celebrated in the local oral epics of the Johar valley as the supreme site where the ''Gori-Shakti'' was personally manifested to protect the northern borders.",
        "deepInsights": "The emergence of the river from the ice represents the truth that the highest service is a continuous flow from the frozen stillness. Milam teaches that the spirit must remain as pure and as persistent as the mountain stream.",
        "ancientLore": "Lore tells that the glacier personally protects the hidden treasures of the ancient traders who meditated in the surrounding caves. Another legend says that the lights of Milam can be seen by the realized souls during the summer solstice, signaling the divine presence.",
        "keyRituals": [
                {
                        "name": "Gori Ganga Source Arghya",
                        "description": "Offering sacred water to the sun at the snout of the glacier to seek the purification of the spirit."
                },
                {
                        "name": "Frontier Silence Meditation",
                        "description": "Sitting in the silence of the glacier valley to seek the inner depth and the clarity."
                },
                {
                        "name": "Bhotia Lineage Vow",
                        "description": "Taking a sacred vow at the glacier to protect the traditional mountain culture and the environment."
                },
                {
                        "name": "Glacier-Rock Offering (Milam)",
                        "description": "Placing a small stone on a nearby cairn to symbolize the individual''s connection to the ice-source."
                }
        ],
        "highlights": [
                {
                        "name": "The Milam Glacier Snout",
                        "description": "The massive ice heart of the glacier from where the river Gori Ganga emerges."
                },
                {
                        "name": "Trishuli Peak View",
                        "description": "The stunning and direct perspective of the three-pointed peak that guards the glacier valley."
                },
                {
                        "name": "Milam Village",
                        "description": "The historic and now mostly deserted village on the trail, known for its unique frontier culture."
                },
                {
                        "name": "The Johar Valley Vistas",
                        "description": "The spectacular perspective of the deep mountain valley that leads to the glacier."
                }
        ],
        "travelInfo": {
                "bestTime": "June to September (the trek is inaccessible and covered in deep snow during the winter).",
                "howToReach": "Reached by a challenging 60km trek from the town of Munsiyari in the Pithoragarh district. Requires a specialized inner-line permit.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Ensure you are medically fit for high-altitude trekking; the oxygen levels are significantly lower than the plains.",
                "The trek is long and rugged; use professional guides and carry all your supplies and camping equipment.",
                "Respect the sensitive nature of the border area; follow all the security protocols and avoid the photography of the military installations."
        ],
        "faqs": [
                {
                        "question": "How long is the trek?",
                        "answer": "The trek is about 60km from Munsiyari and usually takes 8-10 days to complete (to and fro)."
                },
                {
                        "question": "Is it near the China border?",
                        "answer": "Yes, it is located in the high frontier region, making the Inner Line Permit mandatory for the visitors."
                },
                {
                        "question": "What is the source of the river?",
                        "answer": "Milam Glacier is the primary source of the Gori Ganga river, a major tributary of the Kali river."
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
    'Chorabari Tal', 
    'chorabari-tal-gandhi-sarovar-kedarnath', 
    'Sacred Destination', 
    'uk', 
    'The "Lake of the Primeval Sound", Chorabari Tal (Gandhi Sarovar) is a spectacular high-altitude lake above Kedarnath at 3,900 meters. It is a site of absolute yogic authority and divine resonance, where the Lord Shiva is believed to have taught the first yoga to the Saptarishis, representing the absolute manifestation of the spiritual wisdom.', 
    '470.2', 
    '210.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the First Yoga and the Footstool of the Kedarnath Peak', 
    'Chorabari Tal Gandhi Sarovar | Uttarakhand, Yoga & Ancient Lore', 
    'Experience the profound energy of Chorabari Tal. Discover the high-altitude sacred lake, the legend of the First Yogi, and the profound energy of the Kedarnath pilgrimage.', 
    'Chorabari Tal, Gandhi Sarovar, Uttarakhand, Yoga, Shiva, Kedarnath, Hindu Pilgrimage, Ancient Lore, High Altitude, Saptarishi', 
    '319', 
    '{
        "spiritualEssence": "Chorabari is the manifestation of the divine as the supreme wisdom and the absolute power of the high-altitude silence. The energy here is thin, crystal-clear, and intensely sacred. It is the site where the sky-water is held in a bowl of the Kedarnath glacier. The vibration is one of ''Jnana'' (Knowledge) and the absolute connection to the celestial realms. As a lake set at the base of the massive Kedarnath peak, it represents the spiritual crown of the Mandakini valley. A visit here is believed to grant the devotee the absolute clarity of the soul and the blessing of the divine instruction. The air is always vibrant with the scent of the eternal snow and the silent, heavy energy of the peak that touches the heaven.",
        "longDescription": "Chorabari Tal is located 3km uphill from the Kedarnath temple. According to the tradition, this is the site where Lord Shiva (the Adiyogi) personally transmitted the science of Yoga to his first seven disciples, the Saptarishis. The lake is also known as Gandhi Sarovar because a portion of the ashes of Mahatma Gandhi were immersed here in 1948. The lake is fed by the Chorabari glacier and offers a stunning reflection of the Kedarnath peak. It was the source of the massive water surge during the 2013 floods, adding a layer of the contemporary awe to its ancient sanctity. It is a site where the highest level of yogic history and the most dramatic high-altitude ecology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Chorabari Tal is a spectacular display of the raw, uncarved majesty of nature. The \"temple\" is the lake itself, featuring a series of natural stone terraces and ice ridges. A unique feature is the presence of the massive rock slabs that serve as natural meditation platforms. The \"architecture\" is designed to humble the human spirit through its scale and its absolute isolation. The use of the brilliant turquoise water against the white snow and the dark rock create a sense of a spiritual palace that is not built by hands. The site includes several small stone cairns built by the pilgrims.",
        "vedicReferences": "Chorabari is celebrated in the yogic literature as the supreme site where the ''Adi-Yoga'' (the first yoga) was personally anchored to the glacier soil to guide the world.",
        "deepInsights": "The high-altitude lake represents the truth that the highest wisdom is found at the peak of the personal silence. Chorabari teaches that the spirit must reach its highest altitude to receive the divine instruction.",
        "ancientLore": "Lore tells that the birds of the region personally clean the lake of any dust that falls into the water. Another legend says that the water of the Chorabari reflects the past lives of the seeker during the dawn of the summer solstice.",
        "keyRituals": [
                {
                        "name": "Adiyogi-Dhyana",
                        "description": "Sitting in the silence of the lake while focusing on the form of the Kedarnath peak to seek the yogic alignment."
                },
                {
                        "name": "Chorabari Jal-Arghya",
                        "description": "Offering sacred water from the lake to the sun to seek the purification of the mind."
                },
                {
                        "name": "Saptarishi Archana",
                        "description": "Offering prayers to the first seven disciples of Shiva to seek the blessing of the spiritual wisdom."
                },
                {
                        "name": "Kedarnath Peak-Sankalpa",
                        "description": "Taking a sacred vow at the lake to follow the path of the truth and the righteousness."
                }
        ],
        "highlights": [
                {
                        "name": "The High-Altitude Lake",
                        "description": "The crystal-clear water body that reflects the massive Kedarnath peak."
                },
                {
                        "name": "The Adiyogi Site",
                        "description": "The specific spot where the first yoga is believed to have been taught."
                },
                {
                        "name": "The Kedarnath Glacier",
                        "description": "The massive ice field that feeds the lake and the Mandakini river."
                },
                {
                        "name": "The Chorabari Cliff-View",
                        "description": "The spectacular vantage point offering views of the Kedarnath town from above."
                }
        ],
        "travelInfo": {
                "bestTime": "May to June and September to October (the lake is inaccessible and covered in deep snow during the winter).",
                "howToReach": "Reached by a challenging 3km uphill trek from the Kedarnath temple.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Start the trek from Kedarnath very early in the morning; the weather often changes in the afternoon.",
                "The altitude is significant; maintain a slow and steady pace and avoid any over-exertion.",
                "The terrain can be unstable due to the glacier movement; use caution and stay on the marked paths."
        ],
        "faqs": [
                {
                        "question": "How far is it from Kedarnath?",
                        "answer": "It is a 3km trek from the main Kedarnath temple."
                },
                {
                        "question": "Why is it called Gandhi Sarovar?",
                        "answer": "Because the ashes of Mahatma Gandhi were immersed in the sacred waters of the lake in 1948."
                },
                {
                        "question": "Was it affected by the 2013 floods?",
                        "answer": "Yes, the lake partially burst its banks during the extreme rainfall, contributing to the massive flood surge in the Mandakini valley."
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