-- BATCH 2: ULTRA ELITE SPIRITUAL PLACES (MAX VOLUME & DEPTH)
-- Locations: Kamakhya, Trimbakeshwar, Mallikarjuna, Omkareshwar, Baidyanath, Kanak Durga, Amarnath, Vrindavan, Ayodhya

-- 1. KAMAKHYA (The Goddess of Desire and Creation)
INSERT INTO "public"."spiritual_places"  (
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
), (
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
), (
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
), (
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
), (
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
);

-- 6. KANAK DURGA (Shakti Peeth)
INSERT INTO "public"."spiritual_places"  (
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
), (
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
), (
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
), (
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
);
