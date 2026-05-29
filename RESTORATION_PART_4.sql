-- RESTORATION PART 4
INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Chintpurni', 
    'chintpurni-temple', 
    'Sacred Destination', 
    'hp', 
    'The temple of the Goddess who removes all worries, Chintpurni is one of the 51 Shakti Peethas. Located in the Una district of Himachal Pradesh, it is a site of absolute wish-fulfillment and psychological peace, where the feet of Sati are believed to have fallen, representing the grounding presence of the divine mother.', 
    '420.2', 
    '290.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Remover of Worries and the Sacred Feet of Sati', 
    'Chintpurni Temple | Himachal Pradesh, Shakti Peeth & Ancient Lore', 
    'Experience the profound peace of Chintpurni. Discover the sacred Shakti Peeth, the legend of the headless Goddess, and the profound energy of the hill pilgrimage.', 
    'Chintpurni, Himachal Pradesh, Shakti Peeth, Sati, Hindu Pilgrimage, Ancient Lore, Una, Peace', 
    '203', 
    '{
        "spiritualEssence": "Chintpurni is the manifestation of the divine as the supreme solace and the absolute removal of all mental burdens. The energy here is soothing, maternal, and intensely grounding. It is the site where the feet of the mother were anchored to carry the weight of the devotee''s worries. The vibration is one of ''Sharanam'' (Surrender) and the absolute trust in the divine providence. As a temple set within the low Shivalik hills, it represents the spiritual sanctuary of the northern plains. A visit here is believed to grant the devotee the absolute freedom from all anxieties and the blessing of a peaceful heart. The air is always vibrant with the scent of the temple incense and the constant, melodic chanting of the Chintpurni hymns.",
        "longDescription": "The Chintpurni temple is dedicated to Chinnamastika Devi (The Headless Goddess), who severed her own head to feed her hungry companions, symbolizing the absolute self-sacrifice of the divine. Legend tells that the feet of Sati fell here when her body was divided. The temple was established by a devotee named Mai Das, who was guided by the Goddess in a dream. The central point is the Pindi (stone manifestation) of the Goddess, which is covered with colorful clothes and jewelry. Chintpurni is one of the most popular pilgrimage sites in North India, especially for families seeking blessings for their children. The site is a powerful center for the removal of the ''Chinta'' (worry) through the power of the ''Purni'' (fulfillment).",
        "spiritualArchitecture": "The architecture of Chintpurni is a spectacular display of the traditional hill style with a prominent use of white marble and colorful decorations. The temple features a grand entrance and a spacious mandapam where devotees gather for the aarti. A unique feature is the presence of an ancient banyan tree in the courtyard where devotees tie sacred threads (mouli) while making a wish. The architecture is designed to lead the pilgrim into the intimate sanctum where the Pindi is kept, creating a sense of a direct and personal connection with the Mother. The use of silver ornaments and the vibrant red and gold banners create a sense of a royal palace of the spirit.",
        "vedicReferences": "Chintpurni is celebrated in the Markandeya Purana and the Devi Bhagavata as the site where the divine mother manifests as the supreme sacrifice and the absolute fulfiller of desires.",
        "deepInsights": "The headless form of the Goddess represents the truth that the highest realization is beyond the ego and the intellect. Chintpurni teaches that when the ego is sacrificed, the divine takes over all the worries.",
        "ancientLore": "Lore tells that Mai Das personally saw the Goddess sitting on a lion in the forest before he built the temple. Another legend says that the water from the sacred well in the temple never dries up and has the power to heal all emotional wounds.",
        "keyRituals": [
                {
                        "name": "Chintpurni Navratri Fair",
                        "description": "The grand bi-annual celebration where thousands of families gather to offer their gratitude to the Mother."
                },
                {
                        "name": "Kanya Pujan (Chintpurni)",
                        "description": "The ritual of worshipping young girls as the manifestation of the Goddess to seek her blessing for the family."
                },
                {
                        "name": "Suthra Offering",
                        "description": "The traditional ritual of offering sweets and threads to the Goddess as a sign of a wish fulfilled."
                },
                {
                        "name": "Mundun Ceremony",
                        "description": "The ritual of the first hair-cut of children at the temple to seek the Goddess''s lifelong protection."
                }
        ],
        "highlights": [
                {
                        "name": "The Sacred Pindi",
                        "description": "The formless stone manifestation of the Goddess that is the spiritual heart of the temple."
                },
                {
                        "name": "The Wish-Fulfilling Tree",
                        "description": "The ancient banyan tree covered with thousands of sacred threads of the faithful."
                },
                {
                        "name": "Mai Das Ashram",
                        "description": "The site dedicated to the founder of the temple, representing the power of sincere devotion."
                },
                {
                        "name": "The Shivalik Views",
                        "description": "The peaceful panoramic perspective of the lower Himalayan hills from the temple complex."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during Navratris in March and October).",
                "howToReach": "Well connected by road from Una (55km) and Jalandhar (90km). Regular buses and taxis run from Hosharganj and Jwalamukhi.",
                "nearestAirport": "Gaggal Airport, Kangra / Chandigarh International Airport.",
                "nearestRailway": "Una Himachal Railway Station."
        },
        "tips": [
                "Tie a sacred thread on the banyan tree and make a sincere wish; it is a core tradition of the site.",
                "The temple can get very crowded during the summer months and the Navratris; plan for a long wait for darshan.",
                "Stay in one of the dharamshalas nearby to experience the morning and evening aartis, which are deeply moving."
        ],
        "faqs": [
                {
                        "question": "What does Chintpurni mean?",
                        "answer": "It means ''The Fulfiller of Desires and the Remover of Worries''."
                },
                {
                        "question": "Who was Mai Das?",
                        "answer": "He was the Brahmin devotee who founded the temple in the 15th century after having a divine vision of the Goddess."
                },
                {
                        "question": "Is it near Jwalamukhi?",
                        "answer": "Yes, it is about 35 kilometers from Jwalamukhi and is usually visited as part of the Himachal Devi Yatra."
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
    'Baglamukhi (Bankhandi)', 
    'baglamukhi-hp', 
    'Sacred Destination', 
    'hp', 
    'The temple of the Goddess of Stambhana (Stillness) and victory over enemies, Baglamukhi is located in the Kangra district of Himachal Pradesh. It is a site of absolute Tantric power and supreme authority, where the yellow-clad Goddess is worshipped to silence the critics and gain the power of the word, representing the absolute dominance of the truth.', 
    '460.2', 
    '260.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Goddess of the Golden Light and the Vanquisher of the Ego', 
    'Baglamukhi Temple | Himachal Pradesh, Tantra & Ancient Lore', 
    'Experience the profound power of Baglamukhi. Discover the yellow temple of Bankhandi, the legend of the Mahavidya, and the profound energy of the Tantric pilgrimage.', 
    'Baglamukhi, Himachal Pradesh, Bankhandi, Tantra, Mahavidya, Hindu Pilgrimage, Ancient Lore, Victory', 
    '207', 
    '{
        "spiritualEssence": "Baglamukhi is the manifestation of the divine as the supreme stillness and the absolute paralysis of the negative influences. The energy here is intense, golden-yellow, and intensely authoritative. It is the site where the word is made powerful and the enemy is made silent. The vibration is one of ''Stambhana'' (Immobilization) and the absolute clarity of the divine command. As a temple where everything from the walls to the offerings is yellow, it represents the spiritual epicenter of the golden Mahavidya. A visit here is believed to grant the devotee the absolute victory in all legal and personal conflicts and the power of the effective speech. The air is always vibrant with the scent of the turmeric and the constant, rhythmic chanting of the Baglamukhi Beeja Mantra.",
        "longDescription": "The Baglamukhi temple at Bankhandi is one of the most powerful seats of the Dasha Mahavidyas in India. Legend tells that the Goddess manifested from a lake of turmeric during a cosmic storm to save the universe. She has the power to pull the tongue of the enemy, symbolizing the silencing of the false ego. The temple is especially famous among politicians, lawyers, and those seeking victory in complex battles. The central point is the idol of the Goddess, dressed in vibrant yellow silk and gold. Everything in the temple, including the prasad and the clothes of the priests, is yellow (Pitambara). The site is an active center for advanced Tantric rituals (Anushthans) and is considered one of the few places in the world where the Baglamukhi energy is fully anchored.",
        "spiritualArchitecture": "The architecture of Baglamukhi is a spectacular display of the color-coded spiritual design. The entire temple complex is painted in a vibrant golden yellow. A unique feature is the use of the central fire-altar (Havan Kund) which is used for the continuous performance of the Baglamukhi Yagnas. The architecture is designed to lead the pilgrim into an environment of absolute golden light, reflecting the nature of the deity. The use of traditional hill stone and the modern marble additions create a sense of a spiritual court where justice is served. The complex includes several meditation halls where practitioners perform intense mantra-japa under the guidance of the resident masters.",
        "vedicReferences": "Baglamukhi is celebrated in the Tantrasara and the Shaktisamgama Tantra as the supreme force that can freeze the entire universe with a single gaze.",
        "deepInsights": "The yellow color represents the spiritual light that dissolves all darkness and the stabilizing power of the earth. Baglamukhi teaches that the ultimate victory is the silence of the dualistic mind.",
        "ancientLore": "Lore tells that the Pandavas performed a secret ritual here to gain victory before the Kurukshetra war. Another legend says that the Goddess personally appeared to a great saint in Bankhandi and promised to reside in this spot to protect the seekers of the Kali Yuga.",
        "keyRituals": [
                {
                        "name": "Baglamukhi Havan (Yellow)",
                        "description": "The unique fire ritual using yellow flowers, mustard, and turmeric to invoke the protective power of the Goddess."
                },
                {
                        "name": "Turmeric Abhishekam",
                        "description": "The ritual bath of the Goddess with sacred turmeric water to celebrate her golden manifestation."
                },
                {
                        "name": "Shatru Nashak Puja",
                        "description": "The specific prayers offered to seek the removal of obstacles and the silencing of critics."
                },
                {
                        "name": "Pitambara Vrata",
                        "description": "The ritual of wearing yellow clothes and observing a fast to align with the energy of the Goddess."
                }
        ],
        "highlights": [
                {
                        "name": "The Yellow Sanctum",
                        "description": "The unique golden-colored heart of the temple where the Goddess resides."
                },
                {
                        "name": "The Havan Shala",
                        "description": "The grand hall of the fire rituals where the sound of the mantras is constant."
                },
                {
                        "name": "Bankhandi Forest Path",
                        "description": "The peaceful entrance to the temple through the light Himalayan woods."
                },
                {
                        "name": "The Sacred Well",
                        "description": "The source of the water used for the yellow rituals of the Goddess."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during the Navratris).",
                "howToReach": "30km from Kangra and 40km from Dharamshala. Well connected by road; regular buses and taxis run from Jwalamukhi and Kangra.",
                "nearestAirport": "Gaggal Airport, Kangra.",
                "nearestRailway": "Pathankot Junction / Kangra Mandir."
        },
        "tips": [
                "Wear yellow clothes if possible when visiting the temple to align with the traditional energy of the site.",
                "Participate in the havan (fire ritual) for at least a few minutes; the vibration of the Baglamukhi mantras is intensely powerful.",
                "The temple is a site of serious ritual practice; maintain a quiet and respectful demeanor throughout your visit."
        ],
        "faqs": [
                {
                        "question": "Why is everything yellow?",
                        "answer": "Yellow is the color associated with Baglamukhi (Pitambara Devi), representing the golden light and the power to stabilize."
                },
                {
                        "question": "Who visits this temple?",
                        "answer": "It is famous for those seeking victory in legal battles, politics, and the removal of professional obstacles."
                },
                {
                        "question": "What does Baglamukhi mean?",
                        "answer": "It comes from ''Bagala'' (distortion of Valga - bridle) and ''Mukhi'' (face), meaning the Goddess who has the power to bridle the enemy''s speech."
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
    'Vashishta Temple', 
    'vashishta-temple', 
    'Sacred Destination', 
    'hp', 
    'The temple of the Sage Vashishta, one of the Saptarishis, is located in the Manali region of Himachal Pradesh. It is a site of absolute purification and ancient Vedic wisdom, famous for its natural hot sulfur springs where the sage is believed to have performed penance to overcome his grief, representing the healing power of the earth and the spirit.', 
    '440.2', 
    '230.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sage of the Hot Springs and the Soul of the Beas Valley', 
    'Vashishta Temple | Manali, Rishi & Ancient Lore', 
    'Experience the profound healing of Vashishta Temple. Discover the hot springs, the legend of the sage Vashishta, and the profound energy of the Manali pilgrimage.', 
    'Vashishta Temple, Manali, Himachal Pradesh, Rishi Vashishta, Hot Springs, Hindu Pilgrimage, Ancient Lore, Healing', 
    '209', 
    '{
        "spiritualEssence": "Vashishta is the manifestation of the divine as the supreme wisdom and the absolute purification of the emotional self. The energy here is warm, aquatic, and intensely restorative. It is the site where the fire of the grief was transformed into the light of the soul. The vibration is one of ''Shanti'' (Peace) and the absolute washing away of the mental blocks. As a wooden temple set against the rushing Beas river and the lush mountains, it represents the spiritual bath of the Himalayas. A visit here is believed to grant the devotee the absolute clarity of the purpose and the blessing of the ancient sages. The air is always vibrant with the scent of the sulfur and the constant, rhythmic sound of the water and the temple bells.",
        "longDescription": "The Vashishta Temple is dedicated to Sage Vashishta, the kula-guru (family priest) of Lord Rama. Legend tells that after his children were killed by Vishwamitra, the grief-stricken sage tried to end his life by jumping into the Beas river, but the river (Vipasha - the liberator from bonds) refused to drown him. He then performed penance in this spot, and the hot springs emerged to warm his cold heart. The temple is built in the traditional hill style with exquisite wooden carvings. The hot springs (Kunds) are divided for men and women and are believed to have medicinal properties that can cure skin diseases and emotional wounds. Vashishta is a site where the highest Vedic lineage and the most natural healing elements of the earth are perfectly unified.",
        "spiritualArchitecture": "The architecture of Vashishta Temple is a spectacular display of the traditional wooden hill style. It features a sloping slate roof and a series of intricate wooden carvings on the balconies and pillars depicting scenes from the Ramayana. A unique feature is the separate stone-built tanks (Kunds) for the hot springs, which have been used for thousands of years. The architecture is designed to emphasize the integration with the natural springs and the panoramic views of the Manali valley. The use of the dark, weathered wood and the white-washed stone bases create a sense of a spiritual retreat that is both rustic and divine. The complex includes several smaller shrines dedicated to Lord Rama and the Goddess.",
        "vedicReferences": "Vashishta is celebrated in the Rigveda and the Yoga Vashishta as the supreme master of the spiritual wisdom and the teacher of the Path of Liberation.",
        "deepInsights": "The hot springs emerging from the cold mountain earth represent the truth that the divine warmth is always available in the heart of the most difficult experiences. Vashishta teaches that the ultimate healing is the realization of the eternal self.",
        "ancientLore": "Lore tells that the sage personally designed the hot springs to ensure that the mountain people would always have access to warm water for their spiritual rituals. Another legend says that the river Beas was personally blessed by Vashishta to never overflow its banks in this sacred village.",
        "keyRituals": [
                {
                        "name": "Vashishta Kund Snanam",
                        "description": "The ritual bath in the natural hot sulfur springs to seek the purification of the body and the mind."
                },
                {
                        "name": "Rishi Tarpana (Vashishta)",
                        "description": "Offering sacred water to the sage and the ancestors to honor the Vedic lineage."
                },
                {
                        "name": "Yoga Vashishta Recitation",
                        "description": "Reading or listening to the profound spiritual dialogues between Vashishta and Rama in the temple hall."
                },
                {
                        "name": "Beas River Aarti",
                        "description": "The evening prayer performed at the banks of the river that saved the sage''s life."
                }
        ],
        "highlights": [
                {
                        "name": "The Hot Sulfur Springs",
                        "description": "The natural curative waters that are the primary attraction of the site."
                },
                {
                        "name": "The Wooden Rishi Temple",
                        "description": "The beautiful and ancient structure dedicated to the master sage."
                },
                {
                        "name": "The Rama Temple",
                        "description": "A nearby shrine dedicated to the Lord Rama, the most famous student of Vashishta."
                },
                {
                        "name": "Beas River View",
                        "description": "The spectacular perspective of the river and the snow peaks from the Vashishta village."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during the winter when the hot springs are most inviting).",
                "howToReach": "3km from Manali town center. Well connected by road; easily reached by a short walk or a local taxi/auto from the main market.",
                "nearestAirport": "Bhuntar Airport, Kulu.",
                "nearestRailway": "Joginder Nagar / Chandigarh."
        },
        "tips": [
                "Visit early in the morning to have a more peaceful bath in the kunds before the tourist crowds arrive.",
                "Respect the local dress code and the separate sections for men and women in the hot springs.",
                "Combine your visit with a walk to the nearby Jogini Falls for a complete natural and spiritual experience of the Manali valley."
        ],
        "faqs": [
                {
                        "question": "Who was Sage Vashishta?",
                        "answer": "He was one of the seven great sages (Saptarishis) and the author of several Vedic texts and the Yoga Vashishta."
                },
                {
                        "question": "Are the springs natural?",
                        "answer": "Yes, they are natural volcanic sulfur springs that emerge from the mountain at a constant warm temperature."
                },
                {
                        "question": "Is it safe to bathe in the sulfur?",
                        "answer": "Yes, it is considered very healthy for the skin and the blood circulation, provided you do not stay in for too long."
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
    'Mukteshwar', 
    'mukteshwar-temple', 
    'Sacred Destination', 
    'uk', 
    'The temple of liberation, Mukteshwar is located at an altitude of 2,312 meters in the Nainital district of Uttarakhand. It is a site of absolute spiritual freedom and Himalayan panoramic beauty, where the Lord Shiva is believed to have granted immortality to a demon, representing the victory of the light over the darkness and the soul over the body.', 
    '540.2', 
    '250.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lord of Liberation and the Edge of the Himalayan World', 
    'Mukteshwar Temple | Uttarakhand, Shiva & Ancient Lore', 
    'Experience the profound freedom of Mukteshwar. Discover the stone temple of the ridges, the legend of the demon''s liberation, and the profound energy of the Kumaon pilgrimage.', 
    'Mukteshwar, Uttarakhand, Shiva, Kumaon, Nainital, Hindu Pilgrimage, Ancient Lore, Liberation', 
    '213', 
    '{
        "spiritualEssence": "Mukteshwar is the manifestation of the divine as the supreme liberation and the absolute expanse of the spiritual horizon. The energy here is thin, bright, and intensely liberating. It is the site where the bonds of the world are dissolved by the beauty of the peak. The vibration is one of ''Mukti'' (Freedom) and the absolute transcendence of the self. As a small 350-year-old stone temple perched on the edge of a massive cliff facing the high Himalayas, it represents the spiritual jumping-off point of the Kumaon soul. A visit here is believed to grant the devotee the absolute release from the fear of death and the blessing of eternal peace. The air is always vibrant with the scent of the pine forests and the silent, heavy energy of the eternal snows.",
        "longDescription": "The Mukteshwar Mahadev temple is situated atop a hill called Mukteshwar Kumaon. Legend tells that Lord Shiva fought a fierce battle with a demon here and ultimately granted him ''Mukti'' (liberation), giving the site its name. The site is famous for the ''Chauli-ki-Jali'' (the lattice of the rock), a series of natural rock formations with holes that offer spectacular views of the valley below. Mukteshwar was also a favorite spot of Jim Corbett, who wrote about the spiritual and natural majesty of the region. The temple is reached by a flight of stone steps and provides a 180-degree view of the massive peaks including Nanda Devi, Trishul, and Panchachuli. It is a site where the highest silence of the spirit and the most dramatic beauty of the earth are perfectly unified.",
        "spiritualArchitecture": "The architecture of Mukteshwar is a spectacular display of the simple mountain stone style. The temple is built of local gray stone with a short shikhara and a small, intimate mandapam. A unique feature is the use of the natural rock cliff as part of the temple boundary, with the sanctum appearing to be anchored to the very edge of the world. The architecture is designed to emphasize the verticality and the isolation of the site. The courtyard includes several smaller shrines dedicated to Ganesha, Hanuman, and the Goddess. The use of the simple, weathered stone and the panoramic views of the Himalayas create a sense of a spiritual home that is suspended between the earth and the sky.",
        "vedicReferences": "Mukteshwar is celebrated in the Skanda Purana (Manaskhanda) as the site where the seeker can achieve the absolute liberation from the cycle of birth and death.",
        "deepInsights": "The granting of immortality to the demon represents the truth that the divine grace is available to all who surrender, regardless of their nature. Mukteshwar teaches that the ultimate freedom is found at the edge of the known world.",
        "ancientLore": "Lore tells that the rock lattice of Chauli-ki-Jali was formed by the Lord Shiva''s spear during his battle with the demon. Another legend says that the sages used to perform a unique ritual of flying from the cliff-top in their subtle bodies to reach the higher realms.",
        "keyRituals": [
                {
                        "name": "Mukti-Mantra Meditation",
                        "description": "Sitting on the edge of the cliff to meditate on the life-giving mantra of the Lord of Liberation."
                },
                {
                        "name": "Chauli-ki-Jali Parikrama",
                        "description": "The ritual of walking around the sacred rock lattice to seek the removal of all life''s obstacles."
                },
                {
                        "name": "Himalayan Sunrise Darshan",
                        "description": "The ritual of witnessing the first light on the Nanda Devi peak from the temple courtyard."
                },
                {
                        "name": "Pine Grove Retreat",
                        "description": "Spending time in the silent forests surrounding the temple to connect with the mountain spirit."
                }
        ],
        "highlights": [
                {
                        "name": "Mukteshwar Mahadev Shrine",
                        "description": "The ancient stone heart of the temple dedicated to the Lord of Liberation."
                },
                {
                        "name": "Chauli-ki-Jali",
                        "description": "The spectacular natural rock formation that is a site of deep mythological and spiritual significance."
                },
                {
                        "name": "The High Himalayan View",
                        "description": "The breathtaking panoramic perspective of the second highest peak of India, Nanda Devi."
                },
                {
                        "name": "The 350-Year-Old Steps",
                        "description": "The stone ladder that leads the pilgrim to the top of the sacred hill."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially October to March for the clearest Himalayan views).",
                "howToReach": "50km from Nainital and 70km from Haldwani. Well connected by road; regular buses and taxis run from Nainital and Kathgodam.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Visit the Chauli-ki-Jali at sunset; the light on the rocks and the valley below is spectacular.",
                "Be careful at the cliff edges; the terrain is steep and rocky, so maintain a safe distance while viewing the peaks.",
                "The altitude is 2,312 meters; carry warm clothes even in summer as the evenings can get quite chilly."
        ],
        "faqs": [
                {
                        "question": "What does Mukteshwar mean?",
                        "answer": "It means ''The Lord of Liberation'', referring to where Shiva granted immortality to a demon."
                },
                {
                        "question": "How old is the temple?",
                        "answer": "The current stone structure is approximately 350 years old."
                },
                {
                        "question": "Can we see Nanda Devi from here?",
                        "answer": "Yes, on a clear day, Mukteshwar offers one of the most stunning views of the Nanda Devi and Trishul peaks."
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
    'Neelkanth Mahadev', 
    'neelkanth-mahadev-temple', 
    'Sacred Destination', 
    'uk', 
    'The temple of the Blue-Throated Lord, Neelkanth Mahadev is one of the most revered Shiva temples in the Himalayas. Located at an altitude of 1,330 meters near Rishikesh, it is the site of absolute cosmic sacrifice where the Lord consumed the Halahala poison during the churning of the ocean, representing the supreme compassion of the divine and the protection of the universe.', 
    '510.2', 
    '250.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Lord of the Blue Throat and the Savior of the Universe', 
    'Neelkanth Mahadev Temple | Uttarakhand, Shiva & Ancient Lore', 
    'Experience the profound compassion of Neelkanth Mahadev. Discover the site of the cosmic poison, the legend of the Samudra Manthan, and the profound energy of the Rishikesh pilgrimage.', 
    'Neelkanth Mahadev, Uttarakhand, Shiva, Rishikesh, Samudra Manthan, Hindu Pilgrimage, Ancient Lore, Compassion', 
    '214', 
    '{
        "spiritualEssence": "Neelkanth Mahadev is the manifestation of the divine as the supreme sacrifice and the absolute absorption of the world''s suffering. The energy here is intense, cooling, and intensely compassionate. It is the site where the poison of existence was transformed into the ornament of grace. The vibration is one of ''Karuna'' (Compassion) and the absolute protection of the life-stream. As a temple set within a lush valley surrounded by the Manikoot, Brahmakoot, and Vishnukoot mountains, it represents the spiritual heart of the Rishikesh region. A visit here is believed to grant the devotee the absolute removal of all toxic influences from the life and the blessing of the divine protection. The air is always vibrant with the scent of the mountain herbs and the constant, rhythmic chanting of the Neelkanth Stotra.",
        "longDescription": "The Neelkanth Mahadev temple is situated 32km from Rishikesh. Legend tells that during the Samudra Manthan (churning of the ocean), a lethal poison called Halahala emerged. To save the world, Lord Shiva consumed it, which turned his throat blue (Neelkanth). The temple is unique for its vibrant shikhara featuring spectacular relief carvings of the Samudra Manthan story. The central point is the stone Lingam, which is kept cool with continuous water offerings. The site is a major pilgrimage center during the Shravana month and the Shivratri festival, attracting millions of Kanwariyas. It is a site where the highest level of cosmic myth and the most intense level of mass devotion are perfectly unified.",
        "spiritualArchitecture": "The architecture of Neelkanth Mahadev is a spectacular display of the modern colorful style integrated with ancient stone foundations. The temple features a grand shikhara that is a narrative masterpiece, depicting the entire story of the churning of the ocean and the consumption of the poison. A unique feature is the use of the natural spring water that flows into the temple tank and is used for the continuous abhishekam. The architecture is designed to manage the massive flow of pilgrims through a series of grand halls and circumambulation paths. The use of the vibrant colors and the detailed mythological sculptures create a sense of a living story-book of the spirit.",
        "vedicReferences": "Neelkanth Mahadev is celebrated in the Puranas as the supreme site where the Lord manifested his love for the creation by taking the world''s suffering into himself.",
        "deepInsights": "The blue throat represents the truth that the divine protects the world by holding the toxicity in the throat—neither swallowing it nor spitting it out. Neelkanth teaches that the highest power is that which serves as the shield for the innocent.",
        "ancientLore": "Lore tells that the Lord Shiva meditated for 60,000 years in this valley to cool the heat of the poison after consuming it. Another legend says that the river flowing past the temple is the celestial Ganga which changed its course to offer its cooling waters to the Lord.",
        "keyRituals": [
                {
                        "name": "Neelkanth Jal Abhishekam",
                        "description": "The ritual of offering sacred Ganga water to the blue-throated Lord to cool his cosmic heat."
                },
                {
                        "name": "Samudra Manthan Reflection",
                        "description": "Meditating on the carvings of the temple to understand the balance of the good and evil in the universe."
                },
                {
                        "name": "Kanwar Yatra (Neelkanth)",
                        "description": "The ritual of carrying sacred water on the shoulders to the temple during the month of Shravana."
                },
                {
                        "name": "Mountain Cave Meditation",
                        "description": "Spending time in the nearby caves where the Lord is believed to have rested after the sacrifice."
                }
        ],
        "highlights": [
                {
                        "name": "The Narrative Shikhara",
                        "description": "The world-famous temple spire depicting the story of the cosmic poison."
                },
                {
                        "name": "The Neelkanth Lingam",
                        "description": "The sacred stone of Shiva that represents the supreme savior of the universe."
                },
                {
                        "name": "Manikoot Parvat View",
                        "description": "The spectacular perspective of the holy mountains that surround the temple valley."
                },
                {
                        "name": "The Sacred Spring",
                        "description": "The natural source of the cooling water used for the temple rituals."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (avoiding the monsoon and the extreme crowds of Shravana).",
                "howToReach": "32km from Rishikesh. Well connected by road; regular taxis and buses run from Lakshman Jhula and Rishikesh city.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Be prepared for very large crowds during the Shivratri and Shravana festivals; visit on weekdays for a more peaceful experience.",
                "The road from Rishikesh is winding and narrow; hire an experienced local driver for the journey.",
                "Combine your visit with the nearby waterfalls and the various yoga ashrams of Rishikesh for a complete spiritual immersion."
        ],
        "faqs": [
                {
                        "question": "Why is it called Neelkanth?",
                        "answer": "Because Lord Shiva''s throat (Kanth) turned blue (Neel) after he consumed the Halahala poison."
                },
                {
                        "question": "How far is it from Rishikesh?",
                        "answer": "It is about 32 kilometers from the main town, located in a deep valley."
                },
                {
                        "question": "Is it an ancient temple?",
                        "answer": "The site is ancient, mentioned in the Puranas, though the current colorful structure is of more recent construction."
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
    'Tapovan (Rishikesh)', 
    'tapovan-rishikesh', 
    'Sacred Destination', 
    'uk', 
    'The ''Forest of Penance'', Tapovan is the spiritual gateway of Rishikesh. Located on the banks of the Ganga, it is a site of absolute yogic intensity and modern spiritual seeking, where the sage Lakshmana is believed to have performed penance, representing the eternal path of the seeker and the absolute clarity of the Himalayan air.', 
    '505.2', 
    '260.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Land of the Yogis and the Gateway to the Higher Self', 
    'Tapovan Rishikesh | Uttarakhand, Yoga & Ancient Lore', 
    'Experience the profound energy of Tapovan. Discover the land of the yogis, the legend of Lakshmana, and the profound energy of the modern spiritual pilgrimage.', 
    'Tapovan, Rishikesh, Uttarakhand, Yoga, Penance, Ganga, Hindu Pilgrimage, Ancient Lore, Tapas', 
    '215', 
    '{
        "spiritualEssence": "Tapovan is the manifestation of the divine as the supreme discipline and the absolute focus of the spiritual seeker. The energy here is vibrant, international, and intensely meditative. It is the site where the noise of the world is replaced by the roar of the Ganga and the silence of the breath. The vibration is one of ''Tapas'' (Penance) and the absolute commitment to the inner journey. As a hill-side region overlooking the Lakshman Jhula and the emerald river, it represents the spiritual laboratory of the modern world. A visit here is believed to grant the devotee the absolute inspiration for the practice and the blessing of the lineage of the masters. The air is always vibrant with the scent of the incense and the constant, rhythmic sound of the yoga chants.",
        "longDescription": "Tapovan is the most vibrant spiritual district of Rishikesh. Historically, it was a dense forest where the greatest sages of the Himalayas performed penance. Legend tells that Lakshmana, the brother of Lord Rama, meditated here after the war of Lanka. Today, it is home to some of the world''s most famous yoga ashrams and meditation centers. The site is a melting pot of global spiritual seeking, where the ancient traditions of the Vedas meet the modern science of mindfulness. Tapovan is unique for its panoramic views of the Ganga and its proximity to the Neelkanth Mahadev trail. It remains a site where the highest renunciation and the most active global community are perfectly unified in a landscape of river and sky.",
        "spiritualArchitecture": "The architecture of Tapovan is a spectacular display of the modern ashram style integrated with the traditional mountain landscape. It features a dense cluster of multi-storied ashrams, meditation halls, and organic cafes. A unique feature is the use of the wide stone balconies and rooftops for the collective yoga practice, offering direct views of the sacred river. The architecture is designed to lead the pilgrim from the busy riverfront to the quiet and elevated sanctuaries of the hills. The use of the white and saffron colors and the expansive glass-walled yoga studios create a sense of a spiritual city that is open to the light and the flow of the Ganga.",
        "vedicReferences": "Tapovan is celebrated in the local spiritual literature as the primary ground for the performance of the ''Tapas'' required to achieve the vision of the divine.",
        "deepInsights": "The name Tapovan represents the truth that the spirit must go through the fire of the practice to achieve the coolness of the wisdom. Tapovan teaches that the highest forest is the one within the heart of the seeker.",
        "ancientLore": "Lore tells that the sand of the Tapovan banks was once golden, reflecting the purity of the sages who lived here. Another legend says that the wind in Tapovan carries the secret teachings of the invisible Himalayan masters to those who are ready to listen.",
        "keyRituals": [
                {
                        "name": "Surya Namaskar (Ganga)",
                        "description": "The ritual of performing the sun-salutation at dawn on the banks of the sacred river to align with the cosmic light."
                },
                {
                        "name": "Ashram Satsang",
                        "description": "The daily gathering in the various halls of Tapovan to listen to the discourses of the modern masters."
                },
                {
                        "name": "Ganga Aarti (Tapovan)",
                        "description": "The ritual of offering lamps to the river at the secret ghats of the region to seek the blessings of the Mother Ganga."
                },
                {
                        "name": "Lakshmana Cave Meditation",
                        "description": "Sitting in the ancient cave formations of the hill to connect with the spirit of the brother of Rama."
                }
        ],
        "highlights": [
                {
                        "name": "Lakshman Jhula View",
                        "description": "The iconic perspective of the hanging bridge and the 13-storied temple from the heights of Tapovan."
                },
                {
                        "name": "The International Ashrams",
                        "description": "The world-famous centers of yoga and meditation that define the character of the region."
                },
                {
                        "name": "The High Ghats",
                        "description": "The peaceful stone riverfronts that offer a more private connection with the Ganga."
                },
                {
                        "name": "The Secret Waterfalls",
                        "description": "The hidden mountain streams in the hills of Tapovan that provide a natural meditative retreat."
                }
        ],
        "travelInfo": {
                "bestTime": "October to April (especially during the International Yoga Festival in March).",
                "howToReach": "Adjacent to Rishikesh city. Well connected by road; easily reached by a local rickshaw or a short walk from the Lakshman Jhula area.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station / Yog Nagari Rishikesh."
        },
        "tips": [
                "Enroll in a short-term yoga or meditation course in one of the reputable ashrams to experience the authentic energy of Tapovan.",
                "Walk up to the secret waterfalls early in the morning for a silent and powerful natural retreat away from the crowds.",
                "Be mindful of the local monkeys; they are very active in the Tapovan area and can be quite mischievous with bags and food."
        ],
        "faqs": [
                {
                        "question": "What does Tapovan mean?",
                        "answer": "It means the ''Forest of Penance'', referring to where sages performed intense spiritual practice."
                },
                {
                        "question": "Is it part of Rishikesh?",
                        "answer": "Yes, it is the primary spiritual and tourist district of Rishikesh, located on the higher banks of the Ganga."
                },
                {
                        "question": "Who was Lakshmana?",
                        "answer": "He was the brother of Lord Rama who is believed to have performed penance in this specific forest after the war."
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
    'Har Ki Pauri', 
    'har-ki-pauri-haridwar', 
    'Sacred Destination', 
    'uk', 
    'The "Footstep of God", Har Ki Pauri is the absolute spiritual heart of Haridwar and one of the most sacred ghats in India. Located on the banks of the Ganga where the river leaves the mountains, it is the site where the nectar of immortality is believed to have fallen, representing the eternal flow of the divine grace and the absolute center of the Kumbh Mela.', 
    '500.5', 
    '280.2', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Gateway of the Gods and the Eternal Flow of the Ganga', 
    'Har Ki Pauri Haridwar | Ganga Aarti, Kumbh Mela & Ancient Lore', 
    'Experience the profound energy of Har Ki Pauri. Discover the sacred Footstep of God, the world-famous Ganga Aarti, and the profound energy of the Kumbh pilgrimage.', 
    'Har Ki Pauri, Haridwar, Uttarakhand, Ganga, Kumbh Mela, Hindu Pilgrimage, Ancient Lore, Aarti', 
    '216', 
    '{
        "spiritualEssence": "Har Ki Pauri is the manifestation of the divine as the supreme gateway and the absolute purification of the mass consciousness. The energy here is vibrant, aqueous, and intensely social. It is the site where the sky and the earth were unified through the drop of the Amrita. The vibration is one of ''Pavitrata'' (Purity) and the absolute connection to the ancestral lineage. As a massive stone ghat where the Ganga flows with incredible speed and clarity, it represents the spiritual lighthouse of the northern plains. A visit here is believed to grant the devotee the absolute removal of all sins and the blessing of the celestial ancestors. The air is always vibrant with the scent of the marigolds and the constant, rhythmic sound of the Vedic chants and the evening lamps.",
        "longDescription": "Har Ki Pauri was built by King Vikramaditya in memory of his brother Bhartrihari, who performed penance here. The name refers to the footprints of Lord Vishnu (Hari) that are preserved in a stone on the Brahmakund, the most sacred spot of the ghat. It is one of the four sites in India where the drops of the nectar emerged from the Samudra Manthan, making it a primary venue for the Maha Kumbh Mela every 12 years. The ghat is famous for the evening Ganga Aarti, a spectacular synchronized ritual of fire and hymns that attracts thousands of pilgrims daily. Har Ki Pauri is not just a site of ritual; it is a site of absolute continuity where the history of India and the spirit of the river have flowed together for millennia. It is a site where the individual soul is dissolved into the collective light of the Ganga.",
        "spiritualArchitecture": "The architecture of Har Ki Pauri is a spectacular display of the traditional Indian riverfront design. It features a series of stone steps and platforms that lead into the fast-flowing Ganga. A unique feature is the presence of the Brahmakund island in the middle of the river, connected by bridges, where the most sacred rituals are performed. The architecture is designed to handle millions of pilgrims during the Kumbh Mela, with a complex system of barricades and drainage. The use of the red and white stone for the various shrines and the clock tower (Ghantaghar) create an iconic silhouette against the Shivalik hills. The complex includes hundreds of small niches and temples dedicated to various deities, reflecting the diversity of the Hindu faith.",
        "vedicReferences": "Har Ki Pauri is celebrated in the Skanda Purana and the Mahabharata as the supreme site where the Ganga is most powerful and where the merit of a dip is equal to thousands of yagnas.",
        "deepInsights": "The name ''Footstep of God'' represents the truth that the divine presence is found where the river of consciousness touches the earth. Har Ki Pauri teaches that the highest ritual is the collective offering of light to the source of life.",
        "ancientLore": "Lore tells that the celestial nectar was kept on the Brahmakund for three days during the cosmic battle between the gods and the demons. Another legend says that the river Ganga personally promised King Bhagiratha that she would never leave this spot, making it the eternal bridge to the heavens.",
        "keyRituals": [
                {
                        "name": "Ganga Aarti (Har Ki Pauri)",
                        "description": "The world-famous synchronized ritual of offering giant lamps and chants to the river at sunset."
                },
                {
                        "name": "Brahmakund Snanam",
                        "description": "The ritual dip at the most sacred spot of the ghat to seek the absolute purification of the spirit."
                },
                {
                        "name": "Tarpan (Ancestral)",
                        "description": "Offering sacred water and prayers to the ancestors to ensure their peace in the higher realms."
                },
                {
                        "name": "Deep Daan",
                        "description": "The ritual of floating small leaf-lamps on the river to represent the surrender of the individual soul."
                }
        ],
        "highlights": [
                {
                        "name": "The Brahmakund",
                        "description": "The most sacred point of Har Ki Pauri where the nectar is believed to have fallen."
                },
                {
                        "name": "The Vishnu Footprints",
                        "description": "The ancient stone-carved footprints that give the ghat its sacred name."
                },
                {
                        "name": "Haridwar Clock Tower",
                        "description": "The iconic landmark that stands over the spiritual center of the city."
                },
                {
                        "name": "The Gange Bridges",
                        "description": "The pedestrian bridges that offer a spectacular view of the flowing river and the aarti ceremonies."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during the evening aarti at sunset).",
                "howToReach": "Located in the heart of Haridwar city. Well connected by road; easily reached by foot, rickshaw, or taxi from the Haridwar railway station (2km).",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Haridwar Junction."
        },
        "tips": [
                "Reach the ghat at least 45 minutes before sunset to find a good spot to witness the Ganga Aarti.",
                "Be extremely careful of the fast current of the Ganga; use the safety chains while taking a dip in the river.",
                "Be mindful of the local priests and touts; it is best to perform rituals through the official temple management or established ashrams."
        ],
        "faqs": [
                {
                        "question": "What does Har Ki Pauri mean?",
                        "answer": "It means ''Steps of Lord Hari'' (Vishnu), referring to the footprints of the Lord at the site."
                },
                {
                        "question": "When is the Ganga Aarti?",
                        "answer": "It happens every evening at sunset; the timing changes slightly with the seasons (usually between 6:00 PM and 7:00 PM)."
                },
                {
                        "question": "Is it part of the Kumbh Mela?",
                        "answer": "Yes, it is the primary and most sacred site for the royal baths (Shahi Snan) during the Kumbh Mela."
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
    'Mansa Devi (Haridwar)', 
    'mansa-devi-haridwar', 
    'Sacred Destination', 
    'uk', 
    'The Goddess who fulfills the desires of the mind, Mansa Devi is located atop the Bilwa Parvat in Haridwar. It is a site of absolute wish-fulfillment and protective grace, where the mind-born daughter of Sage Kashyapa is worshipped as the supreme authority over the serpent energy, representing the absolute power of the focused thought.', 
    '500.2', 
    '285.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Fulfiller of the Mind''s Desires and the Guardian of the Bilwa Hill', 
    'Mansa Devi Temple | Haridwar, Shakti & Ancient Lore', 
    'Experience the profound energy of Mansa Devi. Discover the hilltop temple of Haridwar, the legend of the mind-born Goddess, and the profound energy of the wish-fulfilling pilgrimage.', 
    'Mansa Devi, Haridwar, Uttarakhand, Shakti, Hindu Pilgrimage, Ancient Lore, Bilwa Parvat, Wish-Fulfillment', 
    '217', 
    '{
        "spiritualEssence": "Mansa Devi is the manifestation of the divine as the supreme intention and the absolute realization of the mental potential. The energy here is elevated, sharp, and intensely focused. It is the site where the thought is transformed into the reality through the power of the Mother. The vibration is one of ''Sankalpa'' (Resolve) and the absolute removal of all life''s fears. As a temple perched on a high hill overlooking the entire city of Haridwar and the winding Ganga, it represents the spiritual watchtower of the Shivalik range. A visit here is believed to grant the devotee the absolute fulfillment of their sincere desires and the blessing of the mental peace. The air is always vibrant with the scent of the temple incense and the constant, rhythmic sound of the cable car and the bells.",
        "longDescription": "The Mansa Devi temple is one of the ''Panch Tirths'' (Five Pilgrimages) within Haridwar. The Goddess Mansa is the sister of the serpent Vasuki and the daughter of Sage Kashyapa. She is worshipped as the one who can control the forces of nature and the mind. The temple features two main idols of the Goddess: one with three mouths and five arms, and another with eight arms. The site is a major pilgrimage center, especially during the Navratris. It is traditionally visited along with the Chandi Devi temple to complete the Shakti circuit of Haridwar. The temple is reached by a steep trekking path or a modern ropeway (Udan Khatola) that provides spectacular views of the Himalayas and the plains. It is a site where the ancient Puranic lore and the modern devotion of the masses are perfectly unified.",
        "spiritualArchitecture": "The architecture of Mansa Devi is a spectacular display of the North Indian temple style with modern practicalities. The temple features a central sanctum containing the multi-armed idols of the Goddess. A unique feature is the presence of an ancient holy tree in the courtyard where devotees tie sacred threads while making a wish. The architecture is designed to lead the pilgrim from the busy base of the hill to the peaceful and windy heights of the summit. The use of white marble and the colorful flags create a sense of a spiritual palace above the clouds. The complex includes several smaller shrines and observation decks that offer a 360-degree panoramic view of the spiritual landscape of Haridwar.",
        "vedicReferences": "Mansa Devi is celebrated in the Puranas and the Mahabharata as the supreme force that can neutralize the poison of the world and the mind.",
        "deepInsights": "The name Mansa represents the truth that the divine is born from the mind of the sage. Mansa Devi teaches that the highest reality is a reflection of the purity of the seeker''s intention.",
        "ancientLore": "Lore tells that the Goddess personally saved the world from a cosmic serpent crisis through her spiritual power. Another legend says that the sage Kashyapa personally established the temple to anchor the protective energy of his daughter for the benefit of the humanity.",
        "keyRituals": [
                {
                        "name": "Mansa Devi Sankalpa",
                        "description": "The ritual of tying a sacred thread on the holy tree while focusing on a specific mental desire."
                },
                {
                        "name": "Navratri Mahotsav (Mansa)",
                        "description": "The grand celebration of the nine nights where the Goddess is worshipped in her various glorious forms."
                },
                {
                        "name": "Thread Untying (Gratitude)",
                        "description": "Returning to the temple to untie the thread after the wish has been fulfilled by the grace of the Mother."
                },
                {
                        "name": "Bilwa Parvat Parikrama",
                        "description": "Walking around the sacred hill to experience the energy of the guardian goddess."
                }
        ],
        "highlights": [
                {
                        "name": "The Multi-Armed Idols",
                        "description": "The unique and powerful representations of the Goddess inside the sanctum."
                },
                {
                        "name": "The Holy Wish-Tree",
                        "description": "The ancient tree covered with thousands of threads of the faithful."
                },
                {
                        "name": "The Ropeway (Udan Khatola)",
                        "description": "The modern cable car that provides a spectacular aerial perspective of Haridwar."
                },
                {
                        "name": "The Shivalik Viewpoint",
                        "description": "The breathtaking panoramic perspective of the lower Himalayas from the temple heights."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during Navratris in March and October).",
                "howToReach": "Located atop Bilwa Parvat. Reached by a 3km trek or a cable car from the base near Har Ki Pauri.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Haridwar Junction."
        },
        "tips": [
                "Use the cable car service if you have limited time or difficulty in climbing; it also offers the best views of the city.",
                "Be prepared for very long queues during the Navratri festival; plan for an early morning visit.",
                "Carry a sacred thread (mouli) with you to tie on the tree; it is a core tradition of the site."
        ],
        "faqs": [
                {
                        "question": "Who is Mansa Devi?",
                        "answer": "She is the mind-born daughter of Sage Kashyapa and the sister of the serpent king Vasuki."
                },
                {
                        "question": "Is it a difficult climb?",
                        "answer": "The trek is about 3km on a well-paved path; the cable car takes less than 5 minutes to reach the top."
                },
                {
                        "question": "What is the tree for?",
                        "answer": "It is a wish-fulfilling tree where devotees tie threads and pray for their desires to be fulfilled."
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
    'Chandi Devi (Haridwar)', 
    'chandi-devi-haridwar', 
    'Sacred Destination', 
    'uk', 
    'The Goddess who defeated the demons Chanda and Munda, Chandi Devi is located atop the Neel Parvat in Haridwar. It is a site of absolute victory and protective power, where the Adi Shankaracharya is believed to have established the primary idol, representing the absolute triumph of the soul over the shadows of the ego.', 
    '505.2', 
    '285.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Destroyer of the Demons and the Guardian of the Neel Hill', 
    'Chandi Devi Temple | Haridwar, Shakti & Ancient Lore', 
    'Experience the profound power of Chandi Devi. Discover the hilltop temple of Haridwar, the legend of the fierce Goddess, and the profound energy of the protective pilgrimage.', 
    'Chandi Devi, Haridwar, Uttarakhand, Shakti, Hindu Pilgrimage, Ancient Lore, Neel Parvat, Protection', 
    '218', 
    '{
        "spiritualEssence": "Chandi Devi is the manifestation of the divine as the supreme warrior and the absolute destruction of the negative forces. The energy here is intense, elevated, and intensely authoritative. It is the site where the mother took her most fierce form to restore the cosmic order on the peaks of Haridwar. The vibration is one of ''Vijaya'' (Victory) and the absolute removal of all life''s enemies. As a temple perched on a high hill facing the Bilwa Parvat, it represents the second spiritual pillar of the Shivalik range. A visit here is believed to grant the devotee the absolute courage to face their obstacles and the blessing of the divine protection. The air is always vibrant with the scent of the temple flowers and the constant, rhythmic chanting of the Chandi Path.",
        "longDescription": "The Chandi Devi temple is situated on the Neel Parvat. The main idol is said to have been established by Adi Shankaracharya in the 8th century, while the current temple was built by the King of Kashmir, Suchat Singh, in 1929. Legend tells that the Goddess Kaushiki emerged from the Goddess Parvati to kill the demons Shumbha and Nishumbha; after the victory, she rested on this hill. Chandi Devi is one of the three major Shakti sites in Haridwar, along with Mansa Devi and Maya Devi. The temple is reached by a 4km trek through the forest or a cable car. It is a site where the ancient history of the Kashmir kings and the eternal legends of the Devi Mahatmya are perfectly unified in a single stone sanctuary.",
        "spiritualArchitecture": "The architecture of Chandi Devi is a spectacular display of the North Indian shikhara style with a prominent use of white marble and colorful decorations. The temple features a grand entrance and a central sanctum where the ancient idol of the Goddess is kept. A unique feature is the presence of the Hanuman temple at the base of the hill and the presence of several small shrines dedicated to the various aspects of the Mother Goddess. The architecture is designed to lead the pilgrim up the steep hill, creating a sense of a spiritual conquest. The use of silver ornaments and the vibrant red banners create a sense of a royal fortress of the spirit that watches over the Ganga.",
        "vedicReferences": "Chandi Devi is celebrated in the Durga Saptashati as the supreme manifestation of the Goddess''s wrath against the forces of darkness.",
        "deepInsights": "The killing of Chanda and Munda represents the truth that the divine can overcome any external or internal enemy. Chandi Devi teaches that the highest victory is the establishment of the spiritual order.",
        "ancientLore": "Lore tells that the great saint Adi Shankaracharya personally meditated on this hill to receive the power for his battles against the ignorance. Another legend says that the temple is guarded by the spirits of the ancient lions of the Goddess.",
        "keyRituals": [
                {
                        "name": "Chandi Path (Haridwar)",
                        "description": "The ritual recitation of the 700 verses of the Durga Saptashati to invoke the power of the Goddess."
                },
                {
                        "name": "Neel Parvat Yatra",
                        "description": "The ritual of walking up the sacred hill while reflecting on the presence of the Mother."
                },
                {
                        "name": "Anjan Devi Darshan",
                        "description": "Praying at the temple of Anjan Devi (mother of Hanuman) located nearby to seek the blessing of the motherly grace."
                },
                {
                        "name": "Haridwar Darshan from Heights",
                        "description": "Reflecting on the spiritual city below from the sacred heights of the temple."
                }
        ],
        "highlights": [
                {
                        "name": "The Ancient Idol",
                        "description": "The sacred image of the Goddess believed to have been placed by Adi Shankaracharya."
                },
                {
                        "name": "The Neel Parvat Ropeway",
                        "description": "The modern cable car that provides a thrilling ascent to the temple."
                },
                {
                        "name": "The Anjan Devi Shrine",
                        "description": "The peaceful subsidiary temple associated with the mother of Hanuman."
                },
                {
                        "name": "The Panoramic Ganga View",
                        "description": "The breathtaking perspective of the river Ganga split into multiple channels as it enters the plains."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during Navratris).",
                "howToReach": "Located atop Neel Parvat. Reached by a 4km trek or a cable car from the base near Haridwar city center.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Haridwar Junction."
        },
        "tips": [
                "Take the combo ticket for the ropeway which includes both Mansa Devi and Chandi Devi for a complete Shakti experience.",
                "The trek is through a forested area; if walking, go in groups and be mindful of the local wildlife.",
                "The evening view from the top is spectacular as the lights of Haridwar begin to shine like stars."
        ],
        "faqs": [
                {
                        "question": "How old is the temple?",
                        "answer": "The site is ancient, with the idol placed in the 8th century, though the current building dates to 1929."
                },
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is considered one of the primary Shakti Peethas in the region, associated with the heart of Sati in some traditions."
                },
                {
                        "question": "How far is it from Mansa Devi?",
                        "answer": "They are on opposite hills; the distance by road/ropeway combo is about 4-5 kilometers."
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
    'Mount Girnar', 
    'mount-girnar-peak', 
    'Sacred Destination', 
    'gj', 
    'The "Peak of the Ascetic", Mount Girnar is a massive spiritual mountain in the Junagadh district of Gujarat. It is a site of absolute Dattatreya power and supreme Jain authority, featuring 10,000 stone steps that lead to the summit where the Lord Dattatreya performed penance, representing the absolute height of the human effort and the divine realization.', 
    '320.2', 
    '450.5', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Peak of the 10,000 Steps and the Abode of Dattatreya', 
    'Mount Girnar | Gujarat, Dattatreya, Jain & Ancient Lore', 
    'Experience the profound heights of Girnar. Discover the peak of Dattatreya, the ancient Jain temples, and the profound energy of the 10,000-step pilgrimage.', 
    'Mount Girnar, Junagadh, Gujarat, Dattatreya, Jainism, Hindu Pilgrimage, Ancient Lore, Steps', 
    '220', 
    '{
        "spiritualEssence": "Girnar is the manifestation of the divine as the supreme asceticism and the absolute endurance of the soul. The energy here is rugged, elevated, and intensely authoritative. It is the site where the dual streams of the Hindu Siddha tradition and the Jain Tirthankara path are unified on a single peak. The vibration is one of ''Tapasya'' (Endurance) and the absolute conquest of the physical limitations. As a mountain rising sharply from the plains of Saurashtra, it represents the spiritual lighthouse of Western India. A visit here is believed to grant the devotee the absolute strength of the will and the blessing of the eternal master Dattatreya. The air is always vibrant with the scent of the dry mountain grass and the silent, heavy energy of the 2,000-year-old stone steps.",
        "longDescription": "Mount Girnar is older than the Himalayas. It features five principal peaks, each crowned with ancient temples. The most famous is the Dattatreya peak, where the footprints of the Lord are worshipped. The mountain is also the site where the 22nd Jain Tirthankara, Lord Neminath, attained Moksha. The ascent of 9,999 steps is a rite of passage for millions of pilgrims. The base of the mountain is famous for the Ashokan rock edicts and the Bhavnath temple where a massive fair is held during Maha Shivratri. Girnar is a site where the highest philosophy of non-violence (Jainism) and the most intense path of the Nath yogis meet in a landscape of granite and sky. It is a site where every step is a prayer and every peak is a realization.",
        "spiritualArchitecture": "The architecture of Girnar is a spectacular display of the medieval temple design integrated with the mountain terrain. It features the incredible cluster of Jain temples built in the 12th century, featuring some of the most exquisite marble carvings in India. A unique feature is the presence of the small, open-air shrines at the very summits of the peaks, where the wind and the light are the primary ornaments. The architecture is designed to lead the pilgrim through a series of increasingly sacred levels, from the lush base to the barren peaks. The use of the ancient stone steps and the massive fortifications create a sense of a spiritual fortress that is both part of the mountain and a triumph over it. The complex includes several caves (like the Muchukund cave) where sages have meditated for centuries.",
        "vedicReferences": "Girnar (Raivatak Parvat) is celebrated in the Mahabharata and the Puranas as the site where the Lord Krishna often visited and where the great sages performed their final penances.",
        "deepInsights": "The 10,000 steps represent the truth that the spiritual journey is a process of persistent effort and gradual elevation. Girnar teaches that the highest peaks are reserved for those who are willing to transcend their comfort.",
        "ancientLore": "Lore tells that the mountain personally grew to touch the heavens to witness the birth of the divine incarnations. Another legend says that the Lord Dattatreya still walks the peaks of Girnar in his invisible form, appearing only to the most sincere seekers.",
        "keyRituals": [
                {
                        "name": "Girnar Parikrama",
                        "description": "The 36km ritual walk around the base of the mountain during the Kartik Purnima to seek the blessings of the entire range."
                },
                {
                        "name": "Dattatreya Paduka Puja",
                        "description": "Offering prayers and sacred oils to the footprints of the Lord at the highest peak of the mountain."
                },
                {
                        "name": "Bhavnath Mela (Shivratri)",
                        "description": "The grand gathering of the Naga Sadhus at the foot of the mountain before they ascend to the peaks."
                },
                {
                        "name": "Jain Peak Vrata",
                        "description": "The ritual of fasting and silence while ascending to the Moksha-site of Lord Neminath."
                }
        ],
        "highlights": [
                {
                        "name": "The 10,000 Steps",
                        "description": "The monumental stone staircase that is the backbone of the Girnar pilgrimage."
                },
                {
                        "name": "Neminath Jain Temple",
                        "description": "A masterpiece of marble architecture dedicated to the 22nd Tirthankara."
                },
                {
                        "name": "Dattatreya Peak",
                        "description": "The highest and most sacred point of the mountain, dedicated to the master of masters."
                },
                {
                        "name": "Muchukund Cave",
                        "description": "The ancient cave where the King Muchukund is believed to have slept and where the Lord Krishna destroyed a demon."
                }
        ],
        "travelInfo": {
                "bestTime": "November to February (the climb is extremely difficult in the summer heat).",
                "howToReach": "Located near Junagadh city. Well connected by road and rail; regular buses and taxis run from Rajkot and Ahmedabad.",
                "nearestAirport": "Rajkot Airport / Porbandar Airport.",
                "nearestRailway": "Junagadh Junction."
        },
        "tips": [
                "Start the climb at 3:00 AM or 4:00 AM to reach the summit before the afternoon heat; carry plenty of water and salt.",
                "The ropeway service is now available to the Ambaji peak, which covers about 5,000 steps and saves significant time and effort.",
                "Respect the local traditions; the mountain is a high-authority site for both Hindus and Jains and maintains strict dietary and behavioral codes."
        ],
        "faqs": [
                {
                        "question": "How many steps are there?",
                        "answer": "There are approximately 9,999 to 10,000 steps to reach the final Dattatreya peak."
                },
                {
                        "question": "Is there a ropeway?",
                        "answer": "Yes, a modern ropeway now operates from the base to the Ambaji temple peak, which is about halfway up the mountain."
                },
                {
                        "question": "Why is it important for Jains?",
                        "answer": "Because it is the site where the 22nd Tirthankara, Lord Neminath, renounced the world and attained liberation."
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
    'Karthik Swami', 
    'karthik-swami-temple', 
    'Sacred Destination', 
    'uk', 
    'The highest Karthikeya temple in the world, Karthik Swami is located atop the Kronch Parvat in the Rudraprayag district of Uttarakhand. It is a site of absolute devotion and Himalayan grandeur, where the son of Shiva is believed to have offered his bones to his father as a sign of his absolute surrender, representing the peak of the filial love and the spiritual sacrifice.', 
    '520.5', 
    '220.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sky-High Commander and the Pinnacle of Devotion', 
    'Karthik Swami Temple | Uttarakhand, Murugan & Ancient Lore', 
    'Experience the profound heights of Karthik Swami. Discover the highest Karthikeya temple in the world, the legend of the bones of the son, and the profound energy of the mountain pilgrimage.', 
    'Karthik Swami, Uttarakhand, Karthikeya, Murugan, Hindu Pilgrimage, Ancient Lore, Rudraprayag, Peak', 
    '221', 
    '{
        "spiritualEssence": "Karthik Swami is the manifestation of the divine as the supreme sacrifice and the absolute clarity of the mountain warrior. The energy here is thin, bright, and intensely focused. It is the site where the ego was stripped away to the very bone. The vibration is one of ''Nishkama Karma'' (Selfless Action) and the absolute surrender to the source. As a small stone temple perched on a razor-sharp ridge facing the massive peaks of Kedarnath and Chaukhamba, it represents the spiritual lookout of the Garhwal range. A visit here is believed to grant the devotee the absolute strength of character and the blessing of the divine commander. The air is always vibrant with the scent of the wild Himalayan air and the constant, rhythmic sound of the thousands of bells offered by the faithful.",
        "longDescription": "The Karthik Swami temple is situated at an altitude of 3,050 meters. Legend tells that Lord Shiva asked his two sons, Ganesha and Karthikeya, to go around the universe. Ganesha went around his parents, while Karthikeya went around the actual world. Upon finding Ganesha had won, Karthikeya, in deep devotion and slight anger, gave up his flesh and bones to his parents. The temple is reached by a spectacular 3km trek from the village of Kanakchauri. The site is unique for the thousands of bells of all sizes that are tied around the temple, their collective sound creating a powerful meditative frequency. Karthik Swami is one of the few sites in North India dedicated purely to the elder son of Shiva, bridging the gap with the Murugan traditions of the South. It is a site where the raw beauty of the Himalayas and the intense purity of the heart are perfectly unified.",
        "spiritualArchitecture": "The architecture of Karthik Swami is a spectacular display of the simple mountain stone style. The temple is a small structure built on a rocky outcrop at the edge of a deep precipice. A unique feature is the vast forest of bells that surrounds the temple, provided by devotees whose wishes have been fulfilled. The architecture is designed to lead the pilgrim up a narrow ridge, creating a sense of a spiritual walking on a knife-edge. The use of the natural rock as the foundation and the simple stone shikhara create a sense of a spiritual home that is anchored to the very spine of the mountain. The courtyard offers a 360-degree panoramic view of the entire Himalayan range from Bandarpunch to Nanda Devi.",
        "vedicReferences": "Karthik Swami is celebrated in the local Puranic lore as the supreme site where the Skanda (Karthikeya) manifested his absolute love for the Lord Shiva.",
        "deepInsights": "The offering of the bones represents the truth that the highest devotion requires the surrender of the most fundamental parts of the self. Karthik Swami teaches that the peak of the spirit is found through the peak of the sacrifice.",
        "ancientLore": "Lore tells that the bells of the temple ring on their own during the most auspicious hours of the night when the celestial beings visit the peak. Another legend says that the sage Narada personally meditated here to witness the reunion of the son and the father.",
        "keyRituals": [
                {
                        "name": "Karthik Swami Bell Offering",
                        "description": "The unique ritual of tying a brass bell in the temple courtyard to thank the Lord for a fulfilled wish."
                },
                {
                        "name": "Kronch Parvat Aarti",
                        "description": "The daily prayer performed at the edge of the sky, overlooking the massive Himalayan valleys."
                },
                {
                        "name": "Himalayan Peak Meditation",
                        "description": "Sitting at the ridge-top at dawn to witness the light on the snow-capped giants of the North."
                },
                {
                        "name": "Kanakchauri Trek",
                        "description": "The ritual ascent through the rhododendron forests to reach the sacred summit."
                }
        ],
        "highlights": [
                {
                        "name": "The Highest Sanctum",
                        "description": "The sacred stone chamber of the highest Karthikeya temple on earth."
                },
                {
                        "name": "The Forest of Bells",
                        "description": "The thousands of brass bells that create a unique and powerful auditory spiritual experience."
                },
                {
                        "name": "Chaukhamba View",
                        "description": "The most spectacular and intimate view of the four-pillared Chaukhamba peak from the temple ridge."
                },
                {
                        "name": "The Kanakchauri Trail",
                        "description": "The beautiful 3km trek through the dense and vibrant Himalayan forests."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the trek is spectacular in March when the rhododendrons are in bloom).",
                "howToReach": "Reached by a 3km trek from Kanakchauri village. Kanakchauri is well connected by road from Rudraprayag (38km).",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Start the trek from Kanakchauri in the early morning to reach the peak for the sunrise; the light on the peaks is unparalleled.",
                "Carry a small bell to offer at the temple; it is a beautiful local tradition that connects you to the site''s energy.",
                "The ridge is very narrow with steep drops on both sides; walk carefully and stay within the fenced areas of the temple."
        ],
        "faqs": [
                {
                        "question": "How high is Karthik Swami?",
                        "answer": "It is located at an altitude of 3,050 meters (10,000 feet) above sea level."
                },
                {
                        "question": "Is it the same as Murugan?",
                        "answer": "Yes, Karthikeya is known as Murugan in the South; this is the most significant North Indian temple dedicated to him."
                },
                {
                        "question": "How long is the trek?",
                        "answer": "The trek from Kanakchauri is approximately 3 kilometers on a well-defined and scenic path."
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
    'Vasistha Gufa', 
    'vasistha-gufa-rishikesh', 
    'Sacred Destination', 
    'uk', 
    'The "Cave of the Master", Vasistha Gufa is a natural river-side cave on the banks of the Ganga near Rishikesh. It is a site of absolute meditative silence and ancient Vedic history, where the Sage Vasishta is believed to have performed intense penance, representing the eternal peace of the enlightened mind and the absolute sanctuary of the Himalayan earth.', 
    '505.5', 
    '255.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sage''s Sanctuary and the Silent Heart of the Ganga', 
    'Vasistha Gufa | Rishikesh, Yoga & Ancient Lore', 
    'Experience the profound silence of Vasistha Gufa. Discover the natural cave of the master, the legend of the sage Vasishta, and the profound energy of the river-side pilgrimage.', 
    'Vasistha Gufa, Rishikesh, Uttarakhand, Sage Vasishta, Yoga, Meditation, Ganga, Ancient Lore, Peace', 
    '222', 
    '{
        "spiritualEssence": "Vasistha Gufa is the manifestation of the divine as the supreme silence and the absolute depth of the inner being. The energy here is cool, dark, and intensely still. It is the site where the outer noise of the world is completely absorbed by the ancient rock. The vibration is one of ''Dhyana'' (Meditation) and the absolute connection to the primordial masters. As a natural cave opening onto a private beach of white sand on the Ganga, it represents the spiritual womb of the Himalayas. A visit here is believed to grant the devotee the absolute clarity of the meditation and the blessing of the ancient wisdom. The air is always vibrant with the scent of the cold damp earth and the silent, heavy energy of the thousands of years of continuous practice.",
        "longDescription": "Vasistha Gufa is located 25km from Rishikesh on the Badrinath highway. Legend tells that the Sage Vasishta, the mind-born son of Brahma, came here to end his life after the loss of his children, but the river Ganga saved him. He then performed penance in this cave for centuries. The cave is about 60 feet deep and houses a small, powerful Shiva Lingam at the end. The site is maintained by the Swami Purushottamananda Ashram and is considered one of the best places in the world for silent meditation. The combination of the dark, cool cave and the bright, emerald Ganga flowing outside creates a perfect balance of the inner and outer spiritual worlds. It is a site where the highest Vedic lineage and the most raw natural beauty are perfectly unified.",
        "spiritualArchitecture": "The architecture of Vasistha Gufa is a spectacular display of the natural rock-cut sanctuary. The cave features a narrow entrance that leads into a widening chamber where several meditators can sit in absolute silence. A unique feature is the white sand beach of the Ganga located just a few steps from the cave mouth, which serves as an open-air meditation space. The architecture is entirely natural, with the smooth limestone walls reflecting the sound of the breath. The ashram has added a simple stone facade and a series of well-maintained paths that lead through the lush forest to the cave. The atmosphere is one of absolute simplicity and profound gravity.",
        "vedicReferences": "Vasistha Gufa is celebrated in the local oral traditions as the site where the Sage Vasishta received the direct transmission of the absolute truth from the Lord Shiva.",
        "deepInsights": "The depth of the cave represents the truth that the highest realization is found in the darkest and deepest parts of the self. Vasistha Gufa teaches that the ultimate teacher is the silence.",
        "ancientLore": "Lore tells that the Sage personally designed the cave to be invisible to those who are not ready for the path. Another legend says that the water of the Ganga in front of the cave carries the direct blessing of the sage''s penance, making it more powerful than anywhere else.",
        "keyRituals": [
                {
                        "name": "Silent Cave Meditation",
                        "description": "Sitting in absolute silence inside the gufa to experience the depth of the inner being."
                },
                {
                        "name": "Ganga Snanam (Vasistha)",
                        "description": "The ritual dip in the private and peaceful stretch of the river in front of the cave."
                },
                {
                        "name": "Rishi Tarpana (Gufa)",
                        "description": "Offering sacred water and gratitude to the Sage Vasishta at the mouth of the cave."
                },
                {
                        "name": "Sand Beach Contemplation",
                        "description": "Reflecting on the flow of life while sitting on the white sand banks of the Ganga."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Cave",
                        "description": "The 60-foot natural limestone chamber that is the spiritual heart of the site."
                },
                {
                        "name": "The Vasistha Lingam",
                        "description": "The small and powerful Shiva Lingam located deep inside the cave."
                },
                {
                        "name": "White Sand Beach",
                        "description": "The pristine and private stretch of the Ganga that offers a natural meditative retreat."
                },
                {
                        "name": "The Arundhati Gufa",
                        "description": "A smaller nearby cave dedicated to the wife of Vasishta, representing the feminine aspect of the penance."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (avoiding the peak of the monsoon when the river levels rise).",
                "howToReach": "25km from Rishikesh on the Badrinath highway. Well connected by road; regular taxis and buses run from Rishikesh.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Maintain absolute silence while inside and near the cave; it is a high-authority site for serious meditators.",
                "The cave can be quite dark; wait for your eyes to adjust and carry a small torch if you are uncomfortable.",
                "The river current is strong here; enjoy the water at the banks but do not swim far into the middle."
        ],
        "faqs": [
                {
                        "question": "How deep is the cave?",
                        "answer": "It is approximately 60 feet deep, narrowing at the end where the Lingam is placed."
                },
                {
                        "question": "Can anyone meditate there?",
                        "answer": "Yes, the cave is open to all who are willing to maintain silence and respect the spiritual atmosphere."
                },
                {
                        "question": "Who was Sage Vasishta?",
                        "answer": "He was one of the seven great sages (Saptarishis) and the author of the Vasistha Samhita and the Yoga Vasishta."
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
    'Joshimath', 
    'joshimath-mutt', 
    'Sacred Destination', 
    'uk', 
    'The "Jyotirmath", Joshimath is one of the four cardinal institutions established by Adi Shankaracharya. Located at the gateway to Badrinath, it is the winter seat of Lord Badri and a site of absolute Vedic authority, representing the preservation of the spiritual light in the heart of the Himalayas.', 
    '540.5', 
    '230.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Winter Seat of Badrinath and the Northern Pillar of Dharma', 
    'Joshimath Mutt | Uttarakhand, Adi Shankaracharya & Ancient Lore', 
    'Experience the profound energy of Joshimath. Discover the Jyotirmath, the winter seat of Badrinath, and the profound energy of the Shankaracharya pilgrimage.', 
    'Joshimath, Uttarakhand, Adi Shankaracharya, Jyotirmath, Badrinath, Hindu Pilgrimage, Ancient Lore, Winter Seat', 
    '223', 
    '{
        "spiritualEssence": "Joshimath is the manifestation of the divine as the supreme preservation and the absolute light of the Vedic intellect. The energy here is steady, ancient, and intensely authoritative. It is the site where the Northern Pillar of the Dharma was anchored by the Adi Guru. The vibration is one of ''Jyoti'' (Light) and the absolute clarity of the scriptural wisdom. As a town built on a steep slope overlooking the confluence of the Alaknanda and Dhauliganga, it represents the spiritual fortress of the high Himalayas. A visit here is believed to grant the devotee the absolute stability of the faith and the blessing of the lineage of the masters. The air is always vibrant with the scent of the temple camphor and the constant, rhythmic chanting of the Sanskrit shlokas.",
        "longDescription": "Joshimath (Jyotirmath) is the first mutt established by Adi Shankaracharya in the 8th century. It is the winter home of Lord Badrinath; when the main temple closes in November, the deity is brought down to the Vasudeva temple in Joshimath. The site features the Kalpavriksha, a 1,200-year-old mulberry tree under which Shankaracharya meditated and achieved enlightenment. The mutt is also the administrative center for the Badrinath shrine. The town is famous for the Narsingh temple, where the left arm of the idol is believed to be getting thinner with each passing year; it is prophesied that when the arm falls, the path to Badrinath will be closed and the Lord will move to Bhavishya Badri. Joshimath is a site where the highest Vedic scholarship and the most ancient mountain prophecies are perfectly unified.",
        "spiritualArchitecture": "The architecture of Joshimath is a spectacular display of the traditional Himalayan stone and wood style with significant Vedic refinements. The mutt features several temples, libraries, and meditation halls. A unique feature is the Vasudeva temple and the Narsingh temple, which feature heavy stone walls and intricate carvings that reflect the early medieval Nagara style. The architecture is designed to withstand the extreme cold and the seismic activity of the region. The use of the dark stone and the massive wooden beams create a sense of a spiritual library that has preserved the wisdom of the ages. The complex includes the Gufa (cave) of Shankaracharya and the sacred platform of the Kalpavriksha tree.",
        "vedicReferences": "Joshimath is celebrated in the local Puranic literature as the supreme site where the divine light of the Vedas was re-established after the period of decline.",
        "deepInsights": "The Kalpavriksha tree represents the truth that the highest fulfillment is found under the shade of the ancient wisdom. Joshimath teaches that the spiritual light must be preserved through the winter of the soul.",
        "ancientLore": "Lore tells that the Adi Shankaracharya personalmente established the crystal Lingam in the Jyotirmath to anchor the cosmic energy of the North. Another legend says that the mountain peaks of Joshimath act as the guardians of the path to the hidden kingdom of Shambhala.",
        "keyRituals": [
                {
                        "name": "Joshimath Shayan Aarti",
                        "description": "The daily evening prayer performed during the winter months for the Lord Badrinath in his winter abode."
                },
                {
                        "name": "Narsingh Puja",
                        "description": "Praying at the temple of the half-man-half-lion incarnation to seek the protection of the Dharma."
                },
                {
                        "name": "Kalpavriksha Parikrama",
                        "description": "The ritual of walking around the 1,200-year-old tree while reflecting on the lineage of the gurus."
                },
                {
                        "name": "Vedic Shastra Path",
                        "description": "The collective study and recitation of the scriptures in the halls of the Jyotirmath."
                }
        ],
        "highlights": [
                {
                        "name": "Kalpavriksha",
                        "description": "The 1,200-year-old sacred tree where Adi Shankaracharya meditated."
                },
                {
                        "name": "Narsingh Temple",
                        "description": "The powerful temple of the fourth incarnation of Vishnu and the prophetic site of the future."
                },
                {
                        "name": "Shankaracharya Cave",
                        "description": "The small and silent cave where the Adi Guru personally resided."
                },
                {
                        "name": "Winter Vasudeva Temple",
                        "description": "The site where the deity of Badrinath is worshipped during the snowy months."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during the winter months to witness the Badrinath ceremonies).",
                "howToReach": "Well connected by road from Rishikesh (250km) and Srinagar. It is the base for the journey to Badrinath and Auli.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Spend at least an hour in silence under the Kalpavriksha; the vibration of the ancient tree is intensely peaceful.",
                "If visiting in winter, carry very heavy woolens as Joshimath can experience significant snowfall.",
                "The town is the gateway to the Valley of Flowers and Hemkund Sahib; plan your visit to include these if traveling in the monsoon."
        ],
        "faqs": [
                {
                        "question": "Why is it called Jyotirmath?",
                        "answer": "Because it is the ''Mutt of Light'' (Jyoti), the northern center of the four mutts founded by Shankaracharya."
                },
                {
                        "question": "What is the Narsingh prophecy?",
                        "answer": "It is believed that when the thinning arm of the Narsingh idol falls, the path to Badrinath will be blocked by a landslide."
                },
                {
                        "question": "How old is the Kalpavriksha?",
                        "answer": "It is scientifically estimated to be over 1,200 years old, dating back to the time of Adi Shankaracharya."
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
    'kalimath-shakti-peeth', 
    'Sacred Destination', 
    'uk', 
    'One of the most powerful and secretive Shakti Peethas in India, Kalimath is located on the banks of the Saraswati river in the Rudraprayag district of Uttarakhand. It is a site of absolute tantric authority and primeval energy, where the Goddess Kali is believed to have entered the earth after defeating the demon Raktavija, representing the absolute depth of the divine power and the mystery of the dark mother.', 
    '520.5', 
    '238.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hidden Shakti and the Sacred Void of the Mother Kali', 
    'Kalimath Temple | Uttarakhand, Shakti Peeth & Ancient Lore', 
    'Experience the profound power of Kalimath. Discover the sacred Shakti Peeth, the legend of Raktavija, and the profound energy of the tantric pilgrimage.', 
    'Kalimath, Uttarakhand, Shakti Peeth, Kali, Hindu Pilgrimage, Ancient Lore, Rudraprayag, Tantra', 
    '226', 
    '{
        "spiritualEssence": "Kalimath is the manifestation of the divine as the supreme void and the absolute grounding of the cosmic power. The energy here is dark, heavy, and intensely primeval. It is the site where the fierce energy was anchored back into the heart of the earth. The vibration is one of ''Shakti'' (Power) and the absolute removal of all life''s poisons. As a temple where there is no idol, but a silver plate covering a sacred hole in the earth, it represents the spiritual womb of the Mother Kali. A visit here is believed to grant the devotee the absolute mastery over their primal fears and the blessing of the divine protection. The air is always vibrant with the scent of the temple blood-red flowers and the constant, rhythmic sound of the river and the secret tantric chants.",
        "longDescription": "Kalimath is unique among Shakti Peethas. The Goddess is worshipped in a pit (Shakti Kund) covered by a silver plate, which is opened only once a year during Navratri. Legend tells that the Goddess Kali killed the demon Raktavija here; every drop of his blood that touched the earth produced another demon, so she drank his blood and then entered the earth in this spot. The site is associated with the great poet Kalidasa, who is believed to have gained his poetic genius after performing penance here. The temple is surrounded by massive mountains and the rushing waters of the Saraswati river. Kalimath is a site where the highest levels of Kashmiri Shaivism and the most ancient local tribal traditions are perfectly unified in a single dark sanctuary.",
        "spiritualArchitecture": "The architecture of Kalimath is a spectacular display of the simple mountain stone style with a prominent use of silver. The temple features a central sanctum where the silver plate of the Goddess is the primary object of worship. A unique feature is the presence of several subsidiary shrines dedicated to Mahalakshmi and Mahasaraswati, completing the triple goddess circuit. The architecture is designed to lead the pilgrim from the river banks to the intimate and dark interior of the shrine. The use of the black stone and the vibrant red and gold banners create a sense of a spiritual fortress that is both hidden and all-powerful. The complex includes several dharamshalas that cater to the practitioners of the Dasha Mahavidya rituals.",
        "vedicReferences": "Kalimath is celebrated in the Devi Mahatmya and the local Garhwali Puranas as the supreme site where the cosmic mother manifested her most fierce and protective form.",
        "deepInsights": "The absence of an idol represents the truth that the highest power is beyond form and is found in the stillness of the earth. Kalimath teaches that the ultimate healing is the confrontation with the shadow.",
        "ancientLore": "Lore tells that the Adi Shankaracharya personally meditated here to balance the fierce energy of the Goddess with the peace of the Lord. Another legend says that the river Saraswati in front of the temple flows from the underworld to wash the feet of the Mother.",
        "keyRituals": [
                {
                        "name": "Kalimath Silver Plate Darshan",
                        "description": "The ritual of offering prayers to the silver plate that covers the sacred void of the Mother."
                },
                {
                        "name": "Navratri Night Vigil",
                        "description": "The grand annual celebration where the secret rituals are performed in the middle of the night to invoke the power of the Kali."
                },
                {
                        "name": "Saraswati Snanam",
                        "description": "Taking a holy dip in the river in front of the temple to seek the purification of the spirit."
                },
                {
                        "name": "Chandi Path (Kalimath)",
                        "description": "The ritual recitation of the 700 verses of the Devi Mahatmya in the most powerful site of the Mother''s victory."
                }
        ],
        "highlights": [
                {
                        "name": "The Shakti Kund",
                        "description": "The sacred hole in the earth where the Goddess entered, covered by the silver plate."
                },
                {
                        "name": "Kalidasa Ashram",
                        "description": "The nearby site dedicated to the great poet who was blessed by the Mother."
                },
                {
                        "name": "Mahalakshmi Temple",
                        "description": "A beautiful subsidiary shrine within the complex dedicated to the Goddess of Abundance."
                },
                {
                        "name": "The Saraswati Confluence",
                        "description": "The spectacular point where the mountain stream meets the spiritual landscape of the temple."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during Navratris).",
                "howToReach": "Reached by a 10km road from Guptkashi. Well connected by road; regular taxis and buses run from Rudraprayag and Rishikesh.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit during the Navratri festival to see the silver plate being lifted; it is a rare and powerful moment of darshan.",
                "Be prepared for a very intense and focused energy; maintain a quiet and respectful demeanor.",
                "Combine your visit with the nearby Guptkashi and Triyuginarayan temples for a complete Shaiva-Shakti circuit."
        ],
        "faqs": [
                {
                        "question": "Why is there no idol?",
                        "answer": "Because the Goddess is worshipped in her formless aspect as the primeval void inside the earth."
                },
                {
                        "question": "Who was Raktavija?",
                        "answer": "A powerful demon who had the boon that every drop of his blood that fell on the ground would create a duplicate of himself."
                },
                {
                        "question": "What is the silver plate?",
                        "answer": "It is a massive, exquisitely carved plate that covers the sacred opening in the earth where the Goddess resides."
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
    'Bhavishya Badri', 
    'bhavishya-badri-temple', 
    'Sacred Destination', 
    'uk', 
    'The "Future Badrinath", Bhavishya Badri is one of the Panch Badri temples located near Joshimath. It is a site of absolute prophecy and divine transition, where it is believed the Lord Badrinath will be worshipped in the future after the current path to the high peaks is closed, representing the eternal cycle of the spiritual evolution and the absolute preservation of the light.', 
    '550.2', 
    '230.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Future Seat of the Lord and the Prophecy of the New Age', 
    'Bhavishya Badri | Uttarakhand, Badrinath Prophecy & Ancient Lore', 
    'Experience the profound energy of Bhavishya Badri. Discover the future seat of the Lord, the legend of the thinning arm, and the profound energy of the mountain pilgrimage.', 
    'Bhavishya Badri, Uttarakhand, Badrinath, Panch Badri, Hindu Pilgrimage, Ancient Lore, Prophecy, Future Seat', 
    '227', 
    '{
        "spiritualEssence": "Bhavishya Badri is the manifestation of the divine as the supreme potential and the absolute continuity of the sacred lineage across the ages. The energy here is quiet, anticipatory, and intensely prophetic. It is the site where the future is already anchored in the present. The vibration is one of ''Agami'' (The Coming) and the absolute trust in the divine plan. As a small temple reached by a trek through dense forests near the Dhauliganga river, it represents the spiritual lifeboat of the next cycle of time. A visit here is believed to grant the devotee the absolute foresight and the blessing of the future realizations. The air is always vibrant with the scent of the wild cedar and the silent, heavy energy of the eternal mountain prophecy.",
        "longDescription": "Bhavishya Badri is located at an altitude of 2,744 meters. According to the Puranas, when the Kali Yuga reaches its peak, the two mountains of Nara and Narayana (which flank the current Badrinath) will join together, blocking the path to the main temple. At that time, the Lord will manifest here to be worshipped by the faithful. The temple is reached by a spectacular 6km trek from Saldhar. The central point is the stone idol of Narasimha (the lion incarnation), which is believed to be the precursor to the future manifestation. Bhavishya Badri is a site where the linear time of human history and the cyclical time of the cosmic ages are perfectly unified in a single forest shrine.",
        "spiritualArchitecture": "The architecture of Bhavishya Badri is a spectacular display of the simple mountain stone style integrated with the natural landscape. The temple is a small, well-built structure featuring a tiered shikhara and a small mandapam. A unique feature is the use of the natural stone boulders that surround the site, creating a sense of a hidden and protected sanctuary. The architecture is designed to lead the pilgrim through a dense forest trek before reaching the peaceful opening of the temple courtyard. The use of the gray stone and the simple proportions create a sense of a spiritual home that is waiting for its true inhabitant. The courtyard includes a small sacred pool and a shrine dedicated to the Adi Shankaracharya.",
        "vedicReferences": "Bhavishya Badri is celebrated in the Skanda Purana and the local Garhwali texts as the supreme site of the future spiritual refuge for the world.",
        "deepInsights": "The concept of a future seat represents the truth that the divine is never lost, only moved to a more suitable form. Bhavishya Badri teaches that the highest preparation is the cultivation of the faith in the unseen.",
        "ancientLore": "Lore tells that the Adi Shankaracharya personally identified this spot and established the preliminary rituals to ensure the continuity of the Badrinath worship. Another legend says that the mountain peaks surrounding the temple are the sleeping forms of the great sages who will wake up when the Lord arrives.",
        "keyRituals": [
                {
                        "name": "Bhavishya Badri Sankalpa",
                        "description": "The ritual of seeking the Lord''s protection for the coming ages and the future generations."
                },
                {
                        "name": "Saldhar Trek",
                        "description": "The ritual ascent through the cedar and oak forests to reach the prophetic shrine."
                },
                {
                        "name": "Narasimha Paduka Puja",
                        "description": "Offering prayers to the footprints of the lion incarnation to seek the strength for the coming times."
                },
                {
                        "name": "Silent Forest Meditation",
                        "description": "Spending time in the surrounding woods to listen to the whispers of the future."
                }
        ],
        "highlights": [
                {
                        "name": "The Narasimha Idol",
                        "description": "The powerful stone deity that anchors the energy of the future seat."
                },
                {
                        "name": "The Dhauliganga Valley",
                        "description": "The spectacular river valley that provides the backdrop for the spiritual trek."
                },
                {
                        "name": "The Oak and Cedar Grove",
                        "description": "The pristine forest that acts as the natural veil for the sacred shrine."
                },
                {
                        "name": "The Prophecy Stone",
                        "description": "An ancient rock near the temple where the details of the future transition are said to be etched in light."
                }
        ],
        "travelInfo": {
                "bestTime": "May to June and September to October (the trek can be difficult during the heavy monsoon).",
                "howToReach": "Reached by a 6km trek from Saldhar, which is 12km from Joshimath on the Malari road.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "The trek is moderate but requires a good level of fitness; carry water and light snacks.",
                "Visit with a local guide to understand the deep mythological nuances of the prophecy and the various landmarks on the trail.",
                "Maintain a quiet and meditative atmosphere; the site is less crowded than the main Badrinath and offers a more intimate experience."
        ],
        "faqs": [
                {
                        "question": "When will the Lord move here?",
                        "answer": "According to the prophecy, it will happen toward the end of the current Kali Yuga when the mountains Nara and Narayana merge."
                },
                {
                        "question": "Who built the temple?",
                        "answer": "Tradition attributes the site to Adi Shankaracharya, while the current structure is a traditional stone temple of the region."
                },
                {
                        "question": "Is it part of the Panch Badri?",
                        "answer": "Yes, it is one of the five sacred abodes of Vishnu in the Uttarakhand Himalayas."
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
    'guptkashi-temple', 
    'Sacred Destination', 
    'uk', 
    'The "Hidden Kashi", Guptkashi is a major spiritual hub in the Rudraprayag district of Uttarakhand. It is a site of absolute Shaiva mystery and ancient Vedic history, where the Lord Shiva is believed to have hidden from the Pandavas in the form of a bull, representing the absolute play of the divine and the sacred parallels between the mountains and the plains.', 
    '515.2', 
    '242.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Hidden City of Shiva and the Confluence of the Sacred Streams', 
    'Guptkashi Temple | Uttarakhand, Shiva & Ancient Lore', 
    'Experience the profound mystery of Guptkashi. Discover the Vishwanath temple, the legend of the hidden Lord, and the profound energy of the Char Dham pilgrimage.', 
    'Guptkashi, Uttarakhand, Shiva, Vishwanath, Ardhanarishwar, Hindu Pilgrimage, Ancient Lore, Rudraprayag', 
    '228', 
    '{
        "spiritualEssence": "Guptkashi is the manifestation of the divine as the supreme subtlety and the absolute sanctuary of the spiritual secret. The energy here is quiet, elevated, and intensely resonant with the energy of Varanasi. It is the site where the Lord chose to be found only by the most persistent seeker. The vibration is one of ''Gupta'' (Hidden) and the absolute depth of the inner search. As a town set on a high ridge overlooking the Mandakini river and the peaks of Kedarnath, it represents the spiritual mirror of the Kashi Vishwanath on the mountain. A visit here is believed to grant the devotee the absolute clarity of the inner path and the blessing of the hidden truths. The air is always vibrant with the scent of the mountain flowers and the constant, rhythmic sound of the Manikarnika water.",
        "longDescription": "Guptkashi features the ancient Vishwanath temple and the Ardhanarishwar temple. Legend tells that the Pandavas, seeking atonement for the Kurukshetra war, followed Shiva to the Himalayas. To avoid them, Shiva hid in Guptkashi before moving to Kedarnath. The site is famous for the Manikarnika Kund, where two streams of water, representing the Ganga and the Yamuna, are believed to meet. The Vishwanath temple is architecturally similar to the one in Varanasi and is a major center for the Pashupata Shaiva tradition. Guptkashi is a site where the geography of the Himalayas and the spiritual map of the plains are perfectly unified in a single stone courtyard.",
        "spiritualArchitecture": "The architecture of Guptkashi is a spectacular display of the early medieval Nagara style. The Vishwanath temple features a high tiered shikhara and a grand mandapam with massive stone pillars. A unique feature is the presence of the Ardhanarishwar idol (half Shiva, half Parvati) in a separate shrine, which is considered a masterpiece of stone carving. The architecture is designed to lead the pilgrim from the busy market to the peaceful and expansive courtyard that offers direct views of the Kedarnath peak. The use of the gray stone and the intricate relief carvings of the various deities create a sense of a spiritual city that has been preserved for a thousand years. The complex includes the Manikarnika Kund with its two dragon-headed spouts.",
        "vedicReferences": "Guptkashi is celebrated in the Skanda Purana and the Shiva Purana as the supreme site where the Lord manifested his cosmic form to test the devotion of the Pandavas.",
        "deepInsights": "The hiding of Shiva represents the truth that the divine is always present but remains hidden until the seeker is ready to look beyond the surface. Guptkashi teaches that the highest reality is often found in the most humble and hidden spots.",
        "ancientLore": "Lore tells that the water of the Manikarnika Kund never dries up and has the power to heal all life''s blockages. Another legend says that the Adi Shankaracharya personally consecrated the Vishwanath Lingam to create a northern twin of the Kashi temple.",
        "keyRituals": [
                {
                        "name": "Guptkashi Vishwanath Aarti",
                        "description": "The daily prayer performed to the hidden Lord to seek the clarity of the vision."
                },
                {
                        "name": "Manikarnika Kund Snanam",
                        "description": "The ritual of washing the hands and feet with the water of the two sacred streams to seek purification."
                },
                {
                        "name": "Ardhanarishwar Puja",
                        "description": "Praying at the temple of the divine union to seek the balance of the masculine and feminine energies in the life."
                },
                {
                        "name": "Kedarnath Peak Contemplation",
                        "description": "Spending time in the temple courtyard to witness the light on the high mountain abodes."
                }
        ],
        "highlights": [
                {
                        "name": "The Vishwanath Temple",
                        "description": "The ancient stone heart of Guptkashi, dedicated to the Lord of the Universe."
                },
                {
                        "name": "Ardhanarishwar Shrine",
                        "description": "A unique and powerful temple dedicated to the unified form of Shiva and Shakti."
                },
                {
                        "name": "Manikarnika Kund",
                        "description": "The sacred pond where the Ganga and Yamuna are believed to flow into the Himalayas."
                },
                {
                        "name": "View of the Kedarnath Peaks",
                        "description": "The breathtaking panoramic perspective of the high Himalayan abodes from the temple heights."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during the Char Dham yatra season from May to November).",
                "howToReach": "Well connected by road from Rudraprayag (47km) and Rishikesh (185km). It is a major stop on the way to Kedarnath.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Visit the temple during the early morning for a peaceful and intimate experience before the bus-loads of pilgrims arrive.",
                "The Manikarnika Kund water is very sacred; carry a small bottle to take some back with you for your home altar.",
                "Spend some time sitting in the courtyard; the energy of the Vishwanath temple is intensely meditative and resonant."
        ],
        "faqs": [
                {
                        "question": "Why is it called Guptkashi?",
                        "answer": "It means ''Hidden Kashi'', where Lord Shiva is believed to have hidden from the Pandavas."
                },
                {
                        "question": "Is it the same as Kashi Vishwanath?",
                        "answer": "Spiritually, it is considered the northern equivalent of the Varanasi temple, sharing the same deity and energy."
                },
                {
                        "question": "How far is it from Kedarnath?",
                        "answer": "It is about 47 kilometers from Kedarnath, acting as one of the primary base camps for the pilgrimage."
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
    'Devprayag', 
    'devprayag-confluence', 
    'Sacred Destination', 
    'uk', 
    'The "Birthplace of the Ganga", Devprayag is the most sacred of the five prayags (confluences) of the Alaknanda. Located in the Tehri Garhwal district, it is the site where the Alaknanda and the Bhagirathi rivers meet to form the holy Ganga, representing the absolute unification of the divine streams and the absolute start of the spiritual life of the plains.', 
    '505.5', 
    '260.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Confluence of the Gods and the Origin of the Holy Ganga', 
    'Devprayag Confluence | Uttarakhand, Raghunathji Temple & Ancient Lore', 
    'Experience the profound union of Devprayag. Discover the birthplace of the Ganga, the ancient Raghunathji temple, and the profound energy of the Panch Prayag pilgrimage.', 
    'Devprayag, Uttarakhand, Ganga, Alaknanda, Bhagirathi, Raghunathji, Hindu Pilgrimage, Ancient Lore, Confluence', 
    '229', 
    '{
        "spiritualEssence": "Devprayag is the manifestation of the divine as the supreme unification and the absolute birth of the sacred flow. The energy here is vibrant, aqueous, and intensely transformative. It is the site where the two primordial daughters of the Himalayas merge their identities to become the mother of the world. The vibration is one of ''Sangam'' (Union) and the absolute clarity of the spiritual beginning. As a town perched on the narrow ridge between the turquoise Alaknanda and the muddy-green Bhagirathi, it represents the spiritual hourglass of the Himalayas. A visit here is believed to grant the devotee the absolute renewal of the spirit and the blessing of the Ganga''s origin. The air is always vibrant with the scent of the river water and the constant, rhythmic roar of the two streams colliding.",
        "longDescription": "Devprayag is located at an altitude of 830 meters. Legend tells that the Sage Devasharma performed intense penance here, giving the town its name. It is the site where Lord Rama and King Dasharatha performed penance to atone for their sins. The town is dominated by the massive Raghunathji Temple, built of large gray stone blocks, which is over 10,000 years old according to local tradition and one of the 108 Divya Desams of Lord Vishnu. The most spectacular sight is the संगम (confluence) itself, where the clear Alaknanda and the forceful Bhagirathi meet with dramatic visual contrast. Devprayag is a site where the highest Vedic hydrology and the most ancient legends of the Surya dynasty are perfectly unified.",
        "spiritualArchitecture": "The architecture of Devprayag is a spectacular display of the traditional mountain town style integrated with massive stone temple complexes. The Raghunathji Temple is the primary architectural landmark, featuring a high Nagara shikhara and a grand mandapam with ancient inscriptions. A unique feature is the use of the narrow, winding stone staircases that lead down to the confluence ghats. The architecture is designed to emphasize the verticality of the site, with houses appearing to be stacked on top of each other along the cliffs. The use of the local gray stone and the white-washed walls create a sense of a spiritual city that is both grounded in the rock and open to the light of the river. The complex includes several smaller shrines dedicated to Hanuman and Ganesha.",
        "vedicReferences": "Devprayag is celebrated in the Puranas and the Mahabharata as the supreme site where the Ganga takes her earthly form to bless the humanity.",
        "deepInsights": "The meeting of the two rivers represents the truth that the highest purpose is achieved through the integration of the diverse paths. Devprayag teaches that every great flow has a sacred and humble beginning.",
        "ancientLore": "Lore tells that the Lord Rama personally established the Raghunathji temple after returning from Lanka. Another legend says that the rocks at the confluence still carry the vibrations of the celestial music played by the Sage Narada.",
        "keyRituals": [
                {
                        "name": "Sangam Snanam (Devprayag)",
                        "description": "The ritual dip at the exact point where the two rivers meet to seek the absolute purification of the Ganga''s birth."
                },
                {
                        "name": "Raghunathji Aarti",
                        "description": "The daily prayer performed in the ancient Rama temple to seek the blessings of the solar dynasty."
                },
                {
                        "name": "Panch Prayag Sankalpa",
                        "description": "The ritual of starting the journey of the five confluences from this most sacred point."
                },
                {
                        "name": "Tarpan (Ganga Origin)",
                        "description": "Offering sacred water to the ancestors at the very spot where the Ganga begins her journey to the plains."
                }
        ],
        "highlights": [
                {
                        "name": "The Confluence (Sangam)",
                        "description": "The breathtaking visual meeting of the Alaknanda and the Bhagirathi rivers."
                },
                {
                        "name": "Raghunathji Temple",
                        "description": "The ancient and massive stone temple dedicated to Lord Rama."
                },
                {
                        "name": "The Suspension Bridges",
                        "description": "The pedestrian bridges that offer a spectacular bird''s eye view of the spiritual landscape."
                },
                {
                        "name": "Shankaracharya Cave (Devprayag)",
                        "description": "A small cave where the Adi Guru is believed to have stayed during his Himalayan travels."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially from October to March).",
                "howToReach": "70km from Rishikesh on the Badrinath highway. Well connected by road; regular taxis and buses run from Rishikesh and Dehradun.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Walk down to the confluence ghats; the physical sensation of the two rivers meeting is intensely powerful.",
                "Visit the Raghunathji temple during the evening aarti for a truly ancient and resonant spiritual experience.",
                "The town is a major hub for the local Garhwali culture; explore the narrow lanes to find authentic local crafts and food."
        ],
        "faqs": [
                {
                        "question": "What rivers meet at Devprayag?",
                        "answer": "The Alaknanda and the Bhagirathi rivers meet here to form the Ganga."
                },
                {
                        "question": "Is it a Char Dham site?",
                        "answer": "While not one of the four main Dhams, it is a critical and mandatory stop on the way to Badrinath and Kedarnath."
                },
                {
                        "question": "What is the Raghunathji temple?",
                        "answer": "It is an ancient temple dedicated to Lord Rama, considered one of the 108 Divya Desams of the Vaishnava tradition."
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Lakhamandal Temple Complex', 
    'lakhamandal-temple', 
    'Sacred Destination', 
    'uk', 
    'The "Temple of the Lakh of Idols", Lakhamandal is an ancient stone temple in the Jaunsar-Bawar region of Uttarakhand. It is a site of absolute epic history and architectural brilliance, associated with the Mahabharata "House of Wax", representing the absolute preservation of the sacred art and the profound energy of the Yamuna valley.', 
    '480.2', 
    '250.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Stone Jewel of the Mahabharata and the Infinite Lingams of the Yamuna', 
    'Lakhamandal Temple | Uttarakhand, Mahabharata & Ancient Lore', 
    'Experience the profound history of Lakhamandal. Discover the temple of the lakh idols, the legend of the wax house, and the profound energy of the Jaunsari pilgrimage.', 
    'Lakhamandal, Uttarakhand, Mahabharata, Pandavas, Shiva, Hindu Pilgrimage, Ancient Lore, Yamuna, Jaunsar', 
    '236', 
    '{
        "spiritualEssence": "Lakhamandal is the manifestation of the divine as the supreme preservation and the absolute multiplicity of the sacred form. The energy here is heavy, ancient, and intensely resonant with the heroic past. It is the site where the thousands of manifestations of the Lord were anchored in a single mountain valley. The vibration is one of ''Akhanda'' (Indestructibility) and the absolute protection of the soul. As a temple complex overlooking the emerald Yamuna and the massive Shivalik ranges, it represents the spiritual treasure-house of the Western Himalayas. A visit here is believed to grant the devotee the absolute immunity from the fires of life and the blessing of the infinite Shiva. The air is always vibrant with the scent of the ancient stone and the silent, heavy energy of the 1,500-year-old carvings.",
        "longDescription": "Lakhamandal is famous for its association with the Mahabharata. It is believed to be the site of ''Lakhagriha,'' the house of wax built by the Kauravas to burn the Pandavas alive. The Pandavas escaped through a secret tunnel that emerged near the temple. The site features a magnificent 12th-century stone temple built in the Nagara style, containing a massive graphite Lingam that shines brilliantly when water is poured on it. A unique feature is the presence of two massive stone statues (the Dwarapalas) believed to be either Jaya and Vijaya or the Pandava brothers themselves. The surrounding area is literally littered with thousands of ancient stone idols (a ''lakh'' or hundred thousand), reflecting its status as a major regional spiritual center for millennia. It is a site where the highest level of epic narrative and the most refined Himalayan stone art are perfectly unified.",
        "spiritualArchitecture": "The architecture of Lakhamandal is a spectacular display of the late Gupta and early medieval Nagara style. The main temple features a high, tiered shikhara and an intricately carved mandapam. A unique feature is the use of the dark, polished graphite for the central Lingam and the detailed relief carvings of the various deities on the exterior walls. The architecture is designed to lead the pilgrim through a courtyard filled with hundreds of small stone shrines and archaeological remains. The use of the local gray stone and the massive stone-cut steps create a sense of a spiritual city that has been unearthed from the depth of the history. The complex includes several ancient open-air altars where the tribal rituals of the Jaunsar people are still performed.",
        "vedicReferences": "Lakhamandal is celebrated in the local oral epics as the supreme site where the divine protection of the Pandavas was manifested against the forces of darkness.",
        "deepInsights": "The ''Lakh'' of idols represents the truth that the divine is found in the infinite multiplicity of the forms. Lakhamandal teaches that the soul can escape any fire through the secret tunnel of the inner wisdom.",
        "ancientLore": "Lore tells that the two stone guardians at the entrance can bring a recently deceased person back to life for a few moments to receive the final darshan of the Lord. Another legend says that the secret tunnel used by the Pandavas still exists and leads all the way to the banks of the Ganga in Rishikesh.",
        "keyRituals": [
                {
                        "name": "Graphite Lingam Abhishekam",
                        "description": "The unique ritual of pouring water on the dark stone Lingam to see the reflection of the self and the divine light."
                },
                {
                        "name": "Dwarapala Puja",
                        "description": "Offering prayers to the massive stone guardians to seek the protection of the home and the family."
                },
                {
                        "name": "Mahabharata Path (Lakhamandal)",
                        "description": "The ritual recitation of the stories of the Pandavas'' escape to seek the blessing of the divine resilience."
                },
                {
                        "name": "Jaunsari Tribal Festival",
                        "description": "The vibrant annual celebration where the local tribal communities gather to honor the ancient deities of the valley."
                }
        ],
        "highlights": [
                {
                        "name": "The Graphite Lingam",
                        "description": "The stunningly polished and massive Shiva Lingam that is the heart of the temple."
                },
                {
                        "name": "The Dwarapalas (Guardians)",
                        "description": "The massive and lifelike stone statues that stand guard at the temple entrance."
                },
                {
                        "name": "The Lakhagriha Cave",
                        "description": "The legendary site associated with the Pandavas'' escape from the house of wax."
                },
                {
                        "name": "The Archaeological Garden",
                        "description": "The extensive collection of hundreds of ancient stone idols and temple fragments found at the site."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during the spring and autumn months).",
                "howToReach": "125km from Dehradun on the Mussoorie-Yamunotri road. Well connected by road; easily reached by car or bus from Dehradun and Mussoorie.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Observe the reflection in the graphite Lingam after the abhishekam; it is believed to show the purity of the seeker''s heart.",
                "The temple is in a remote and beautiful valley; plan for a full day trip and carry food as there are limited facilities near the site.",
                "Respect the local Jaunsari culture; the temple is a high-authority site for the local communities and maintains unique ritual traditions."
        ],
        "faqs": [
                {
                        "question": "Why is it called Lakhamandal?",
                        "answer": "Because of the thousands (a ''lakh'') of ancient stone idols and temple fragments found scattered around the site."
                },
                {
                        "question": "Was there really a wax house here?",
                        "answer": "According to the Mahabharata and local tradition, this is the specific site where the event occurred."
                },
                {
                        "question": "What is the Lingam made of?",
                        "answer": "It is made of a rare and highly polished dark graphite stone that has a unique reflective quality."
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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