-- GOLD STANDARD PART 5 for Spritual_locations
INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Nageshwar (Gujarat)', 
    'nageshwar', 
    'Jyotirlinga', 
    'gj', 
    'Located near Dwarka, Nageshwar is the Lord of Serpents. It is the site where Shiva protected his devotee Supriya from the demon Daruka, and it represents the power of the divine to overcome all poisons and fears.', 
    '25.5', 
    '340.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582201943021-e8e5b3061b33?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Protector from All Evils', 
    'Nageshwar Jyotirlinga | Dwarka, Serpent Lore & Ancient Insights', 
    'Explore the spiritual power of Nageshwar, the Lord of Serpents. Discover the legend of Supriya, the massive 80-foot Shiva statue, and the path to fearless devotion.', 
    'Nageshwar, Jyotirlinga, Dwarka, Gujarat, Lord Shiva, Serpent, Supriya, Hindu Pilgrimage, Ancient Lore', 
    '21', 
    '{
        "spiritualEssence": "Nageshwar is the manifestation of the Lord as the controller of the serpent power (Kundalini). The energy here is protective, intense, and liberating. It is the site where the Lord appeared to save his devotees from the clutches of the demoness Daruka. The vibration is one that dissolves all fears, especially the fear of death and hidden enemies. A visit here is believed to grant protection from the ''poisons'' of life—anger, jealousy, and attachment. The presence of the Lord as Nageshwar (the Lord of Snakes) signifies that he is the one who wears the most feared symbols as ornaments, showing his mastery over all aspects of nature.",
        "longDescription": "The legend of Nageshwar is found in the Shiva Purana. A demon named Daruka had imprisoned a group of Shiva devotees, led by a merchant named Supriya. When the demon tried to kill Supriya, he prayed intensely to Lord Shiva. The Lord appeared from a pillar of light and destroyed the demon and his army. The Goddess Parvati also appeared as Nageshwari to protect the region. The temple is famous for its 80-foot tall statue of Lord Shiva in a sitting posture, which is visible from a great distance. The main lingam is unique as it faces South, which according to Vedic science, is the direction of the conqueror of death. The temple was renovated in recent decades by the late Gulshan Kumar, bringing it to its current architectural prominence.",
        "spiritualArchitecture": "The temple is built in a modern Nagara style with a large, airy courtyard. The most striking feature is the massive, orange-colored Shiva statue that towers over the temple complex. The inner sanctum is quiet and houses the Jyotirlinga, which is slightly lower than the ground level. The temple walls are decorated with murals and sculptures depicting the legend of Daruka and Supriya. The entire complex is designed to manage large crowds of pilgrims while maintaining a serene atmosphere.",
        "vedicReferences": "Nageshwar is mentioned in the Shiva Purana as one of the twelve Jyotirlingas, specifically located in the ''Darukavana'' (forest of Daruka).",
        "deepInsights": "The serpent around Shiva''s neck represents the ego that has been tamed and transformed into an ornament. Nageshwar teaches that the things we fear the most can be overcome through total surrender to the divine.",
        "ancientLore": "Lore tells that the demoness Daruka was a devotee of Goddess Parvati and had received a boon that the forest where she lived would move with her. This made it impossible for anyone to find the imprisoned devotees until Shiva himself intervened. Another legend says that the lingam here is the earthly manifestation of the primordial serpent, Shesha Naga.",
        "keyRituals": [
                {
                        "name": "Rudra Abhishek",
                        "description": "The ritual bathing of the Jyotirlinga with various sacred liquids."
                },
                {
                        "name": "Dhwaja Arohan",
                        "description": "The ceremonial changing of the temple flag."
                },
                {
                        "name": "Evening Aarti",
                        "description": "A vibrant ritual of lamps performed in the shadow of the massive Shiva statue."
                }
        ],
        "highlights": [
                {
                        "name": "80-foot Shiva Statue",
                        "description": "One of the tallest Shiva statues in India."
                },
                {
                        "name": "Gopi Talav",
                        "description": "The sacred pond nearby where the Gopis are said to have merged with the earth."
                },
                {
                        "name": "Dwarka City",
                        "description": "The sacred city of Lord Krishna located just 17km away."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "17km from Dwarka city, easily accessible by taxi or auto-rickshaw.",
                "nearestAirport": "Jamnagar Airport.",
                "nearestRailway": "Dwarka Railway Station."
        },
        "tips": [
                "Combine your visit with a trip to the Dwarkadhish temple and Bet Dwarka.",
                "The temple is less crowded during the afternoon hours.",
                "Carry a camera to capture the majestic Shiva statue."
        ],
        "faqs": [
                {
                        "question": "Where is Nageshwar located?",
                        "answer": "It is located in the Jamnagar district of Gujarat, about 17km from the city of Dwarka."
                },
                {
                        "question": "Is there a dress code?",
                        "answer": "Standard modest temple attire is expected; avoid shorts and sleeveless tops."
                },
                {
                        "question": "How much time is needed for Darshan?",
                        "answer": "On a normal day, it takes about 30-45 minutes."
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
    'Kalighat (Kolkata)', 
    'kalighat', 
    'Shakti Peeth', 
    'wb', 
    'The heart of the City of Joy, Kalighat is where the four toes of Sati''s right foot fell. It is the seat of the fierce yet compassionate Mother Kali, the destroyer of time and the giver of spiritual liberation.', 
    '420.5', 
    '330.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Seat of the Dark Mother', 
    'Kalighat Temple | Kolkata, Shakti Peeth & Ancient Lore', 
    'Experience the intense energy of Kalighat. Discover the legend of the four toes of Sati, the unique idol of Mother Kali, and the vibrant Tantric traditions of Bengal.', 
    'Kalighat, Shakti Peeth, Kolkata, West Bengal, Mother Kali, Durga, Hindu Pilgrimage, Ancient Lore, Tantra', 
    '22', 
    '{
        "spiritualEssence": "Kalighat is the epicenter of the divine feminine energy in its most transformative form. The Mother Kali here is not to be feared but to be loved as the ultimate source of life and death. The energy is intense, bustling, and deeply connected to the pulse of the city. The vibration is one of raw power and the destruction of the ego. It is believed that a visit here grants the devotee the strength to face the challenges of life with absolute fearlessness. The Mother here is ''Dakshina Kali'', the one who stands on the heart of Shiva, signifying that Shakti is the animating force of the universe.",
        "longDescription": "The history of Kalighat dates back to the 15th century, though the site has been sacred since antiquity. When Lord Vishnu divided the body of Sati, the four toes of her right foot fell at this spot. The original temple was a small hut on the banks of the Adi Ganga. The current temple was built in 1809 under the patronage of the Sabarna Roy Choudhury family. The idol of Kali is unique, made of black stone with three huge eyes, a long golden tongue, and four golden hands. Two of her hands hold a sword and a severed head, while the other two are in the mudras of protection and blessing. The temple has been a center for great saints like Sri Ramakrishna Paramahansa, who saw the living Mother in the stone idol. The atmosphere is an explosion of red hibiscus flowers, vermilion, and the constant chanting of ''Jai Ma Kali''.",
        "spiritualArchitecture": "The temple is built in the traditional Bengal ''Chala'' style with multiple roofs and a large courtyard. The Nat Mandir (assembly hall) is a spacious area where devotees gather. The sanctum is a small, intense space where the unique idol resides. The temple walls are decorated with tiles depicting various Hindu deities. The complex also includes the Soshthi Tala (shrine for child protection) and the Harikat-tala (site of ritual sacrifice).",
        "vedicReferences": "Kalighat is mentioned in various Tantric texts including the Mahaneervana Tantra. It is considered the most vital of the 51 Shakti Peeths in Eastern India.",
        "deepInsights": "The four toes signify the four goals of human life (Purusharthas)—Dharma, Artha, Kama, and Moksha. Kali represents the power of time (Kala) that eventually consumes all material things, leaving only the eternal soul.",
        "ancientLore": "Lore tells of a devotee named Atmaram Brahmachari who discovered the toes of the Goddess in a lake called the ''Kali Kunda''. Another legend says that the river Adi Ganga shifted its course just to touch the feet of the Mother.",
        "keyRituals": [
                {
                        "name": "Nitya Puja",
                        "description": "The daily worship involving the offering of red hibiscus flowers and sweets."
                },
                {
                        "name": "Snana Yatra",
                        "description": "The ceremonial bathing of the Mother Kali once a year, a massive event for the city."
                },
                {
                        "name": "Kumari Puja",
                        "description": "Worship of young girls during the Navratri festival."
                }
        ],
        "highlights": [
                {
                        "name": "Adi Ganga",
                        "description": "The original course of the Ganges river flowing near the temple."
                },
                {
                        "name": "Soshthi Tala",
                        "description": "A sacred spot for the protection of children and mothers."
                },
                {
                        "name": "Mother House",
                        "description": "The home of Mother Teresa, located in the vicinity of the temple complex."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (during Durga Puja and Kali Puja).",
                "howToReach": "Located in South Kolkata, well connected by Metro (Kalighat station) and local buses.",
                "nearestAirport": "Netaji Subhash Chandra Bose International Airport.",
                "nearestRailway": "Howrah / Sealdah Station."
        },
        "tips": [
                "Use the Metro to reach the temple to avoid the city''s heavy traffic.",
                "Be prepared for a very intense and crowded experience.",
                "Beware of unofficial guides who may demand excessive money."
        ],
        "faqs": [
                {
                        "question": "What is the best time for Darshan?",
                        "answer": "Early morning (6 AM to 8 AM) is relatively less crowded."
                },
                {
                        "question": "Is sacrifice still practiced?",
                        "answer": "Ritual sacrifice is practiced on certain days; check local schedules if you wish to avoid it."
                },
                {
                        "question": "Are cameras allowed?",
                        "answer": "Photography is strictly prohibited inside the main sanctum."
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
    'Jwalamukhi (Himachal)', 
    'jwalamukhi', 
    'Shakti Peeth', 
    'hp', 
    'Located in the Kangra valley of Himachal Pradesh, Jwalamukhi is unique because there is no idol. The Goddess is worshipped in the form of nine natural eternal flames that emerge from the rocks, representing the tongue of Sati.', 
    '210.5', 
    '140.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Eternal Light of the Divine Mother', 
    'Jwalamukhi Temple | Kangra, Eternal Flames & Ancient Lore', 
    'Discover the mystery of Jwalamukhi, the temple of eternal flames. Explore the legend of Sati''s tongue, the nine flames of the Goddess, and the Kangra valley history.', 
    'Jwalamukhi, Shakti Peeth, Himachal Pradesh, Kangra, Eternal Flame, Goddess Durga, Sati, Hindu Pilgrimage', 
    '23', 
    '{
        "spiritualEssence": "Jwalamukhi is the manifestation of the Mother as the light of knowledge and the fire of transformation. The energy here is ethereal, radiant, and intensely pure. The absence of an idol signifies that the divine is a living, formless energy. The nine flames represent the nine forms of Durga (Navadurga). The vibration is one of constant awakening. It is believed that a visit here burns away the dross of ignorance and illuminates the path of the soul. The sight of a blue flame emerging from the cold rocks of the Himalayas is a visual metaphor for the emergence of spirit from matter.",
        "longDescription": "The legend of Jwalamukhi is central to the Shakti Peeth tradition. When Sati''s body was divided, her tongue fell here. Since then, nine flames have been burning naturally without any fuel. The temple was built by Raja Bhumi Chand Katoch, an ancient ruler of the Kangra state. The temple is so famous that even the Mughal Emperor Akbar visited it. Skeptical of the eternal flames, he tried to douse them with water and even covered them with an iron plate, but the flames emerged victorious. In repentance, Akbar offered a golden umbrella (Chattra) to the Goddess, which miraculously turned into a different metal when he tried to take credit for it. The current temple architecture is a blend of the Indo-Sikh style, with a massive golden dome donated by Maharaja Ranjit Singh.",
        "spiritualArchitecture": "The temple is built on a high platform with a large courtyard. The most striking feature is the golden dome and the massive silver doors. Inside the sanctum, there is no idol, only a square pit where the eternal flames emerge. The main flame is dedicated to Jwalamukhi Devi, while others represent Annapurna, Chandi, Hinglaj, and other forms of Shakti. The architecture is simple but reflects the royal patronage it has received over the centuries.",
        "vedicReferences": "Jwalamukhi is mentioned in the Devi Mahatmyam and various Puranic texts as one of the most powerful Shakti centers in the Himalayas.",
        "deepInsights": "Fire is the mediator between humans and the divine. Jwalamukhi teaches that the divine is an ever-burning presence within us, often hidden but always accessible through devotion.",
        "ancientLore": "Lore tells that the flames have never gone out since the Satya Yuga. Another legend states that the Goddess personally protects the Kangra valley from all calamities as long as the flames burn.",
        "keyRituals": [
                {
                        "name": "Panch Aarti",
                        "description": "The five main rituals performed daily, offering prayers to the nine flames."
                },
                {
                        "name": "Bhajan Sandhya",
                        "description": "Evening devotional singing in the temple courtyard."
                },
                {
                        "name": "Mundan Sanskar",
                        "description": "The traditional first hair-cutting ceremony for children, performed at the temple."
                }
        ],
        "highlights": [
                {
                        "name": "Gorakh Dibbi",
                        "description": "A small pool of water that appears to be boiling but is actually cold to the touch."
                },
                {
                        "name": "Nagini Mata Temple",
                        "description": "A nearby shrine dedicated to the serpent goddess."
                },
                {
                        "name": "Kangra Fort",
                        "description": "The massive ancient fort located a few kilometers away."
                }
        ],
        "travelInfo": {
                "bestTime": "March to October.",
                "howToReach": "35km from Kangra city, well connected by road. The nearest railway station is Jawalamukhi Road.",
                "nearestAirport": "Gaggal Airport, Kangra.",
                "nearestRailway": "Jawalamukhi Road (Narrow Gauge) / Pathankot (Broad Gauge)."
        },
        "tips": [
                "Be prepared for a walk as the temple is located on a slight incline.",
                "Visit during Navratri for a spectacular spiritual atmosphere.",
                "Do not touch the flames as they are considered highly sacred."
        ],
        "faqs": [
                {
                        "question": "How many flames are there?",
                        "answer": "There are nine eternal flames representing different forms of the Goddess."
                },
                {
                        "question": "What happened to Akbar''s golden Chattra?",
                        "answer": "It is said to have turned into an unknown metal as a lesson against the Emperor''s pride; it is still preserved in the temple."
                },
                {
                        "question": "How to reach from Dharamshala?",
                        "answer": "It is about a 2-hour drive (55km) from Dharamshala via well-maintained roads."
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
    'Tarapith (Bengal)', 
    'tarapith', 
    'Shakti Peeth', 
    'wb', 
    'Located on the banks of the Dwaraka river, Tarapith is the seat of the Goddess Tara. It is a major center for Tantric practice and the site where the legendary saint Bamakhepa attained enlightenment.', 
    '415.5', 
    '320.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother Who Rescues from All Calamities', 
    'Tarapith Temple | Birbhum, Goddess Tara & Bamakhepa Lore', 
    'Enter the mystical realm of Tarapith. Discover the legend of Goddess Tara, the life of saint Bamakhepa, and the profound Tantric traditions of Birbhum.', 
    'Tarapith, Shakti Peeth, Birbhum, West Bengal, Goddess Tara, Bamakhepa, Tantra, Hindu Pilgrimage, Ancient Lore', 
    '24', 
    '{
        "spiritualEssence": "Tarapith is the manifestation of the Mother as the savior (Tara). The energy here is raw, mystical, and deeply connected to the cremation grounds (Maha Shamshan). It is not a site for the faint of heart; it is where the illusion of the material world is directly confronted. The vibration is one of absolute surrender and the breaking of the cycle of birth and death. It is believed that the Mother Tara suckles her devotees with the milk of wisdom, just as she did with Shiva to save him from the poison of the Halahala. A visit here is a journey into the depth of the soul, guided by the mother who carries her children through the ocean of existence.",
        "longDescription": "The history of Tarapith is intertwined with the life of the ''mad saint'' Bamakhepa. He spent his entire life in the cremation grounds, worshipping Tara as his own mother. He is said to have attained such high spiritual states that the Goddess herself would manifest to him. The temple is a small, traditional structure made of red stone. The idol of Tara is hidden within a larger metal image. The inner idol depicts Tara suckling Shiva in his infant form. The cremation ground adjacent to the temple is considered one of the most sacred sites for Tantric sadhana in India. The air is always thick with the scent of incense and the sound of the Dwaraka river, which flows backwards (uttar-vahini) at this spot, signifying the reversal of worldly tendencies.",
        "spiritualArchitecture": "The temple is built in the traditional Bengal ''aat-chala'' (eight-roofed) style with terracotta decorations. The entrance is marked by a large gate and a spacious courtyard. The inner sanctum is a small, dimly lit room where the intense energy of the Mother is concentrated. The temple walls are carved with scenes from the epics and the lives of various saints. The cremation ground nearby is a sprawling area with ancient trees and smaller shrines.",
        "vedicReferences": "Tara is one of the ten Mahavidyas and is highly revered in both Hindu and Buddhist Tantra. Tarapith is traditionally counted as one of the 51 Shakti Peeths where the third eye of Sati fell.",
        "deepInsights": "Tara represents the power of speech and the ability to navigate through the storms of life. The suckling of Shiva signifies that the ultimate knowledge (Shiva) is nourished by the creative power (Shakti).",
        "ancientLore": "Lore tells that when the ocean was churned and Shiva drank the poison, it was Tara who appeared and suckled him to cool his throat. Another legend states that the river Dwaraka flows backwards here just to stay in the presence of the Mother.",
        "keyRituals": [
                {
                        "name": "Maha Shamshan Puja",
                        "description": "Special rituals performed in the cremation grounds to appease the fierce forms of Shakti."
                },
                {
                        "name": "Snana Yatra",
                        "description": "The ceremonial bathing of the Mother Tara with sacred water."
                },
                {
                        "name": "Anjali Puja",
                        "description": "Massive group prayers performed during the annual festivals."
                }
        ],
        "highlights": [
                {
                        "name": "Maha Shamshan",
                        "description": "The legendary cremation ground where saint Bamakhepa lived."
                },
                {
                        "name": "Bamakhepa''s Samadhi",
                        "description": "The final resting place of the great saint, located near the temple."
                },
                {
                        "name": "Dwaraka River",
                        "description": "The sacred river that flows backwards at Tarapith."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Located in Birbhum district, well connected by rail to Kolkata (Rampurhat station is 10km away).",
                "nearestAirport": "Kolkata Airport.",
                "nearestRailway": "Rampurhat Railway Station."
        },
        "tips": [
                "Visit the cremation ground to understand the deep philosophy of the site, but maintain silence and respect.",
                "Be prepared for a very intense and ritual-heavy environment.",
                "Try the local sweets of Birbhum."
        ],
        "faqs": [
                {
                        "question": "Who was Bamakhepa?",
                        "answer": "He was a 19th-century saint known for his intense and unconventional devotion to Goddess Tara."
                },
                {
                        "question": "Why is it called Tarapith?",
                        "answer": "Because it is believed to be the spot where the third eye (Anya chakra) or the pupils of Sati''s eyes fell."
                },
                {
                        "question": "How far is it from Shantiniketan?",
                        "answer": "It is about 60km (2 hours) from Shantiniketan, making it a common day-trip for visitors."
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
    'Tirupati (Balaji)', 
    'tirupati', 
    'Spiritual City', 
    'ap', 
    'The abode of Lord Venkateswara, Tirupati is the world''s most visited spiritual site. Located on the seven hills of Tirumala, it is the place where the Lord resides in the Kali Yuga to protect his devotees from all karmic burdens.', 
    '230.2', 
    '520.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Abode of the Lord of the Seven Hills', 
    'Tirumala Tirupati Balaji | Seven Hills, Ancient Lore & Deep Insights', 
    'Experience the divine glory of Tirupati Balaji. Discover the legend of the seven hills, the unique rituals of Tirumala, and the path to spiritual prosperity.', 
    'Tirupati, Balaji, Venkateswara, Tirumala, Andhra Pradesh, Seven Hills, Hindu Pilgrimage, Ancient Lore, Kali Yuga', 
    '26', 
    '{
        "spiritualEssence": "Tirupati is the focal point of divine abundance and grace in the Kali Yuga. The Lord Venkateswara is believed to be the living manifestation of Vishnu, who has taken this form to alleviate the suffering of humanity. The energy here is one of absolute devotion, surrender, and the dissolution of ego through the act of tonsure (head shaving). The vibration on the seven hills is ethereal, organized, and intensely concentrated. It is the place where the divine is worshipped with unmatched opulence, reflecting the Lord''s status as the king of the universe. A visit here is believed to grant both material prosperity and spiritual liberation.",
        "longDescription": "The history of Tirumala is as old as time itself. The seven hills represent the seven hoods of the cosmic serpent Shesha Naga. Lord Vishnu descended to these hills in search of Goddess Lakshmi and eventually took the form of Venkateswara. The temple has been patronized by every major South Indian dynasty, from the Pallavas and Cholas to the great Vijayanagara Emperor Krishnadevaraya, who donated immense wealth to the shrine. The temple architecture is a supreme example of Dravidian style, with a massive gold-plated dome (Ananda Nilayam). The idol of the Lord is self-manifested (Swayambhu) and is made of black stone, adorned with diamonds and emeralds beyond count. Tirupati is not just a temple; it is a spiritual city that manages the faith of millions with incredible precision.",
        "spiritualArchitecture": "The Tirumala temple is a masterpiece of Dravidian engineering. The main gateway (Gopuram) is towering and intricately carved. The Ananda Nilayam—the golden dome over the sanctum—is a sight of celestial beauty. The temple walls are carved with thousands of inscriptions detailing the history and donations over the centuries. The complex includes several massive halls (Mandapams) and a sacred tank called the Swami Pushkarini.",
        "vedicReferences": "Tirupati is mentioned in the Rig Veda and various Puranas including the Varaha Purana and the Bhavishyottara Purana. It is hailed as the supreme site for the present age.",
        "deepInsights": "The act of shaving the head (Mundan) signifies the removal of the ego and the offering of one''s pride to the Lord. The seven hills represent the seven chakras of the human body, and the climb to the top signifies the ascent of consciousness.",
        "ancientLore": "Lore tells that the Lord took a loan from Kubera for his wedding with Goddess Padmavati, and devotees offer wealth to the Lord to help him repay that loan, which in turn brings them prosperity. Another legend says that the Lord''s eyes are covered with camphor because his gaze is so powerful that it could overwhelm the devotee.",
        "keyRituals": [
                {
                        "name": "Suprabhata Seva",
                        "description": "The ritual of awakening the Lord with sacred hymns at the break of dawn."
                },
                {
                        "name": "Kalyanotsavam",
                        "description": "The daily celebration of the divine wedding of the Lord with his consorts."
                },
                {
                        "name": "Naivedyam",
                        "description": "The offering of the world-famous Tirupati Laddu to the Lord."
                },
                {
                        "name": "Tonsure (Mundan)",
                        "description": "The offering of hair as a symbol of surrendering the ego."
                }
        ],
        "highlights": [
                {
                        "name": "Tirumala Seven Hills",
                        "description": "The sacred mountain range representing Shesha Naga."
                },
                {
                        "name": "Silathoranam",
                        "description": "A natural rock arch on the hills, considered very rare and sacred."
                },
                {
                        "name": "Akasa Ganga",
                        "description": "A sacred waterfall on the hills used for the Lord''s daily abhishekam."
                }
        ],
        "travelInfo": {
                "bestTime": "September to March.",
                "howToReach": "Well connected by rail and road from Chennai and Bangalore. Tirupati has its own international airport.",
                "nearestAirport": "Tirupati International Airport (Renigunta).",
                "nearestRailway": "Tirupati Main / Renigunta Junction."
        },
        "tips": [
                "Book your Darshan tickets (Special Entry or Seva) online months in advance.",
                "Follow the strict dress code: Dhoti/Kurta for men and Saree/Chudidar for women.",
                "Keep your identity proof ready for multiple security checks."
        ],
        "faqs": [
                {
                        "question": "How to book Darshan online?",
                        "answer": "Tickets can be booked on the official TTD (Tirumala Tirupati Devasthanams) website."
                },
                {
                        "question": "How long does Darshan take?",
                        "answer": "It can range from 2 hours to 24 hours depending on the type of ticket and the crowd."
                },
                {
                        "question": "Can we walk up the hills?",
                        "answer": "Yes, there are two walking paths (Alipiri and Srivari Mettu) for those who wish to trek to the top."
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
    'Rishikesh', 
    'rishikesh', 
    'Spiritual City', 
    'uk', 
    'The Yoga Capital of the World, Rishikesh is the gateway to the Himalayas. Located where the Ganges emerges from the mountains, it is a city of sages, ashrams, and the eternal quest for peace and self-realization.', 
    '230.5', 
    '180.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Gateway to the Gods and Yoga', 
    'Rishikesh | Yoga Capital, Ganga Aarti & Himalayan Lore', 
    'Step into the peaceful vibration of Rishikesh. Discover the world-famous Yoga ashrams, the iconic Lakshman Jhula, and the sacred Ganga Aarti of Parmarth Niketan.', 
    'Rishikesh, Yoga, Ganges, Uttarakhand, Ashrams, Lakshman Jhula, Ganga Aarti, Hindu Pilgrimage, Ancient Lore', 
    '27', 
    '{
        "spiritualEssence": "Rishikesh is the sanctuary of the seeker. The name means ''Lord of the Senses''. The energy here is light, expansive, and deeply meditative. Unlike the ritual-heavy Haridwar, Rishikesh is about the internal practice—Yoga, Meditation, and Jnana (Knowledge). The vibration of the emerald-green Ganges flowing through the Himalayan foothills is incredibly soothing. It is the site where the great sages (Rishis) have performed penance for millennia. A visit here is an invitation to turn inward and listen to the silent voice of the soul.",
        "longDescription": "Rishikesh is legendary as the place where Raibhya Rishi performed intense penance, and Lord Vishnu appeared as Hrishikesh. The city gained global prominence in the 1960s when the Beatles visited the ashram of Maharishi Mahesh Yogi. Since then, it has become the global hub for Yoga and Vedanta. The city is divided by the Ganges and connected by the iconic suspension bridges—Lakshman Jhula and Ram Jhula. The evening Aarti at Parmarth Niketan and Triveni Ghat is a sight of celestial beauty, where thousands gather to offer lamps to the holy river. Rishikesh is also the starting point for the Char Dham Yatra, making it the spiritual launchpad for the Himalayan journey.",
        "spiritualArchitecture": "The architecture of Rishikesh is a tapestry of ancient temples like Bharat Mandir and modern ashrams with expansive meditation halls. The suspension bridges are engineering marvels that have become symbols of the city. The Ghats are built in a simple, natural style that respects the flow of the mountain river. The various ashrams, such as Parmarth Niketan and Sivananda Ashram, feature beautiful gardens and stone structures that blend perfectly with the natural landscape.",
        "vedicReferences": "Rishikesh is mentioned in the Skanda Purana as a part of the sacred Kedar Khanda. It is the site where Lord Rama performed penance after the battle of Lanka.",
        "deepInsights": "Rishikesh represents the Anahata (Heart) and Vishuddha (Throat) chakras. It is about the opening of the heart to love and the purification of speech. The flowing river teaches the art of non-attachment—letting the past go and moving towards the ocean of consciousness.",
        "ancientLore": "Lore tells that Lakshman, the brother of Rama, crossed the Ganges using a bridge made of jute ropes, which later became the Lakshman Jhula. Another legend says that the sage Bharadwaj performed penance here and received the knowledge of Ayurveda.",
        "keyRituals": [
                {
                        "name": "Ganga Aarti",
                        "description": "The world-famous evening ritual at Parmarth Niketan involving songs and lamps."
                },
                {
                        "name": "Yoga & Meditation",
                        "description": "The primary daily practice in the hundreds of ashrams along the river."
                },
                {
                        "name": "Deep Daan",
                        "description": "Offering floating lamps to the Ganges at sunset, symbolizing the release of individual prayers."
                }
        ],
        "highlights": [
                {
                        "name": "Lakshman Jhula",
                        "description": "The iconic suspension bridge (currently under renovation/replacement)."
                },
                {
                        "name": "Parmarth Niketan",
                        "description": "One of the largest and most famous ashrams in India."
                },
                {
                        "name": "Triveni Ghat",
                        "description": "The main bathing ghat and site of the grand evening Aarti."
                }
        ],
        "travelInfo": {
                "bestTime": "September to November and March to May.",
                "howToReach": "Well connected by road from Delhi (250km). Has its own railway station and is close to Dehradun airport.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh / Yog Nagari Rishikesh Railway Station."
        },
        "tips": [
                "Enroll in a Yoga or Meditation course for at least a few days to experience the city''s true spirit.",
                "Avoid swimming in the river at spots with strong currents; use the designated ghats.",
                "Respect the vegetarian and alcohol-free status of the city."
        ],
        "faqs": [
                {
                        "question": "Is Rishikesh safe for solo travelers?",
                        "answer": "Yes, it is considered one of the safest cities in India for solo and international travelers."
                },
                {
                        "question": "What is the ''Beatles Ashram''?",
                        "answer": "It is the Chaurasi Kutia ashram where the Beatles stayed; it is now a part of the Rajaji National Park and open to visitors."
                },
                {
                        "question": "Can I do white-water rafting?",
                        "answer": "Yes, Rishikesh is a major hub for adventure sports, but check seasonal availability (usually closed during monsoon)."
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
    'Haridwar', 
    'haridwar', 
    'Spiritual City', 
    'up', 
    'The ''Gateway to God,'' Haridwar is where the Ganges first enters the plains. It is a city of ancient rituals, vibrant ghats, and the world-famous Kumbh Mela, where millions gather to wash away their sins in the celestial river.', 
    '230.2', 
    '210.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Threshold to the Divine Presence', 
    'Haridwar | Ganga Aarti, Kumbh Mela & Ancient Lore', 
    'Experience the vibrant faith of Haridwar. Discover the Har Ki Pauri ghat, the Chandi Devi temple, and the profound mysteries of the Kumbh Mela.', 
    'Haridwar, Ganges, Uttarakhand, Kumbh Mela, Har Ki Pauri, Lord Shiva, Lord Vishnu, Hindu Pilgrimage, Ancient Lore', 
    '28', 
    '{
        "spiritualEssence": "Haridwar is the gateway to the divine realm. The energy here is dynamic, festive, and intensely communal. Unlike the meditative Rishikesh, Haridwar is the site of active, vibrant rituals. The vibration at Har Ki Pauri—the Ghat of the Lord''s Footprint—is electric. It is where the celestial river meets the human world. A visit here is a ritualistic purification. The air is always filled with the sound of bells, the smell of camphor, and the collective prayers of millions. It is the place where time is measured in centuries and faith is as deep as the river itself.",
        "longDescription": "Haridwar is one of the four sites of the Kumbh Mela, where drops of the nectar of immortality (Amrit) fell from the sky. The city has been a major pilgrimage center since the Vedic era. The Har Ki Pauri ghat is the focal point, built around the footprint of Lord Vishnu on a stone. The city is also a center for Ayurvedic medicine and Vedic learning. From the hilltop temples of Mansa Devi and Chandi Devi to the ancient Daksha Mahadev temple, Haridwar is a complete spiritual ecosystem. The evening Ganga Aarti at Har Ki Pauri is a world-renowned event where hundreds of massive lamps are waved in perfect synchronization, creating a sea of light reflected in the river.",
        "spiritualArchitecture": "The architecture of Haridwar is characterized by its ancient stone ghats and the cluster of temples along the riverbanks. The hilltop temples are accessible by modern ropeways. The ashrams in Haridwar are often grand, with large gateways and traditional courtyards. The Har Ki Pauri ghat is a masterpiece of public spiritual architecture, designed to accommodate millions of people during the Kumbh Mela.",
        "vedicReferences": "Haridwar is mentioned in the Skanda Purana and the Mahabharata as Gangadwara (Gateway of the Ganges). It is considered one of the seven holiest cities (Sapta Puri).",
        "deepInsights": "Haridwar represents the Muladhara (Root) chakra of the national spiritual body. It is the foundation of the Himalayan journey. The act of bathing in the Ganges signifies the washing away of the past to prepare for the ascent to the higher peaks of consciousness.",
        "ancientLore": "Lore tells that King Bhagiratha performed penance here to bring the Ganges to earth. Another legend states that Lord Shiva himself resides in the Kankhal region of Haridwar. The footprints at Har Ki Pauri are said to have been left by Lord Vishnu during the Satya Yuga.",
        "keyRituals": [
                {
                        "name": "Ganga Aarti",
                        "description": "The grand evening ritual at Har Ki Pauri, a spectacle of light and sound."
                },
                {
                        "name": "Holy Dip",
                        "description": "The ritual bath at Brahmakund, considered the most sacred spot in the river."
                },
                {
                        "name": "Pind Daan",
                        "description": "Ancestral rites performed on the banks of the river to ensure peace for the departed souls."
                }
        ],
        "highlights": [
                {
                        "name": "Har Ki Pauri",
                        "description": "The most sacred ghat where the Ganges leaves the mountains."
                },
                {
                        "name": "Mansa Devi Temple",
                        "description": "Hilltop temple dedicated to the goddess who fulfills wishes."
                },
                {
                        "name": "Chandi Devi Temple",
                        "description": "Located on the Neel Parvat, dedicated to the fierce form of the Goddess."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and during Kumbh Mela).",
                "howToReach": "Well connected by rail and road to Delhi (210km). Haridwar is a major railway junction.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Haridwar Junction."
        },
        "tips": [
                "Arrive at Har Ki Pauri at least an hour before the Aarti to get a good seat.",
                "Use the ropeway for Mansa Devi and Chandi Devi to save time and energy.",
                "Be cautious of the river currents while bathing."
        ],
        "faqs": [
                {
                        "question": "When is the next Kumbh Mela in Haridwar?",
                        "answer": "The Kumbh Mela occurs every 12 years; the last was in 2021, and the Ardh Kumbh occurs every 6 years."
                },
                {
                        "question": "Is Haridwar safe for kids?",
                        "answer": "Yes, but keep them close during the Aarti and crowded festivals as it can be very overwhelming."
                },
                {
                        "question": "How to reach from Delhi?",
                        "answer": "The fastest way is by train (Shatabdi or Vande Bharat) which takes about 4 hours."
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
    'Madurai Meenakshi', 
    'madurai-meenakshi', 
    'Shakti Peeth', 
    'tn', 
    'The crown jewel of Dravidian architecture, the Meenakshi Amman Temple in Madurai is the center of the Tamil spiritual universe. It is the site where the Goddess Meenakshi (the fish-eyed one) married Lord Sundareswarar (Shiva) in a celestial union.', 
    '220.2', 
    '750.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Living Heart of Tamil Devotion and Sovereignty', 
    'Meenakshi Amman Temple | Madurai, Shakti Peeth & Ancient Lore', 
    'Explore the spiritual grandeur of Madurai Meenakshi. Discover the legend of the fish-eyed Goddess, the 1000-pillar hall, and the profound secrets of Dravidian architecture.', 
    'Madurai Meenakshi, Shakti Peeth, Madurai, Tamil Nadu, Goddess Meenakshi, Lord Sundareswarar, Hindu Pilgrimage, Ancient Lore, Dravidian', 
    '29', 
    '{
        "spiritualEssence": "Madurai Meenakshi is the manifestation of the Mother as the sovereign ruler. The name Meenakshi (Meen + Akshi) refers to her eyes that never close, just like a fish, constantly watching over her children. The energy here is regal, meticulously organized, and deeply cultural. It is the center of the Tamil consciousness. The vibration is one of prosperity, artistic perfection, and the harmonious union of the masculine and feminine principles. A visit here is believed to grant one the clarity of vision and the strength to rule over one''s own internal kingdom with righteousness and grace. The air is always vibrant with the fragrance of jasmine and the intricate chanting of Tamil hymns.",
        "longDescription": "The history of Madurai is as old as the Tamil civilization itself. Legend says the Goddess Meenakshi was born with three breasts; the third was destined to disappear only when she met her true consort. After conquering the eight directions, she reached Kailash and saw Lord Shiva, at which point the prophecy was fulfilled. Their wedding, the Meenakshi Tirukalyanam, is the most celebrated event in the city. The temple was built over centuries, reaching its peak under the Nayak rulers in the 16th and 17th centuries. It is a sprawling complex of 14 massive gopurams (towers), the tallest reaching 170 feet. The temple is famous for its 1000-pillar hall (Meenakshi Nayakkar Mandapam), where every pillar is a unique work of art. Madurai is known as the ''Athens of the East'' and has been a center for the Tamil Sangam (literary academies) for millennia.",
        "spiritualArchitecture": "The temple is the pinnacle of Dravidian architecture. It is designed as a mandala, with the shrines of Meenakshi and Sundareswarar at the center. The gopurams are covered with thousands of brightly painted stone figures of gods, demons, and animals. The 1000-pillar hall features intricate carvings of the avatars of Vishnu, various forms of Shiva, and figures from Tamil folklore. The temple tank, the Golden Lotus Pond (Porthamarai Kulam), is surrounded by ancient murals and is considered highly sacred.",
        "vedicReferences": "Madurai is mentioned in the Halasya Mahatmya and various ancient Tamil texts like the Tiruvilaiyadal Puranam. It is considered one of the 51 Shakti Peeths where the middle finger of Sati fell.",
        "deepInsights": "The fish-eye of the Goddess signifies the power of concentrated focus. In the silence of the temple, the devotee is encouraged to find their own internal focus. The union of Meenakshi and Sundareswarar represents the integration of power (Shakti) and consciousness (Shiva).",
        "ancientLore": "Lore tells of the ''Sangam Plank'' in the temple tank which would grow to accommodate true poets and shrink to reject those with false verses. Another legend says that Lord Shiva performed 64 divine plays (Tiruvilaiyadal) in and around Madurai to bless his devotees.",
        "keyRituals": [
                {
                        "name": "Pallaiyarai Puja",
                        "description": "The nightly ritual where the image of Sundareswarar is carried to the chamber of Meenakshi."
                },
                {
                        "name": "Abhishekam",
                        "description": "The ritual bathing of the deities with various sacred substances throughout the day."
                },
                {
                        "name": "Golden Lotus Dip",
                        "description": "Taking a ritual bath in the sacred pond before entering the main shrines."
                }
        ],
        "highlights": [
                {
                        "name": "1000-Pillar Hall",
                        "description": "A museum of Dravidian sculpture featuring 985 uniquely carved pillars."
                },
                {
                        "name": "Golden Lotus Pond",
                        "description": "The ancient tank where the Tamil Sangam poets used to gather."
                },
                {
                        "name": "Musical Pillars",
                        "description": "Stone pillars that produce different musical notes when tapped."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and April for the Chithirai Festival).",
                "howToReach": "Well connected by air, rail, and road. Madurai has its own international airport and is a major railway hub.",
                "nearestAirport": "Madurai International Airport.",
                "nearestRailway": "Madurai Junction."
        },
        "tips": [
                "Visit during the early morning or late evening to see the temple in its full ritualistic glory.",
                "Hire a licensed guide to understand the complex iconography of the 1000-pillar hall.",
                "Photography is allowed in the outer areas but restricted inside the sanctums."
        ],
        "faqs": [
                {
                        "question": "What is the Chithirai Festival?",
                        "answer": "It is the annual festival celebrating the wedding of Meenakshi and Sundareswarar, drawing millions to the city."
                },
                {
                        "question": "How many gopurams does the temple have?",
                        "answer": "The temple has 14 gopurams, with the Southern one being the tallest and most famous."
                },
                {
                        "question": "Is there a dress code?",
                        "answer": "Yes, traditional South Indian attire is preferred (Dhoti/Kurta for men, Saree/Chudidar for women)."
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
    'Kanchipuram (Kamakshee)', 
    'kanchipuram-kamakshee', 
    'Shakti Peeth', 
    'tn', 
    'Kanchipuram is the ''City of Thousand Temples'' and one of the seven holiest cities of India. The Kamakshee Amman Temple is the seat of the Goddess as the giver of all desires and the center of the Sri Vidya tradition.', 
    '230.5', 
    '680.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Seat of Grace and Wisdom', 
    'Kamakshee Amman Temple | Kanchipuram, Shakti Peeth & Sri Vidya Lore', 
    'Discover the spiritual essence of Kanchipuram Kamakshee. Explore the Sri Chakra connection, the legend of the Mango tree, and the profound wisdom of the Kanchi Peetham.', 
    'Kanchipuram, Kamakshee, Shakti Peeth, Tamil Nadu, Sri Vidya, Adi Shankaracharya, Hindu Pilgrimage, Ancient Lore, Kanchi', 
    '30', 
    '{
        "spiritualEssence": "Kamakshee is the manifestation of the Mother as the fulfillment of the soul''s highest desires. The name Kamakshee means ''she whose eyes fulfill all desires''. The energy here is serene, high-vibrational, and deeply meditative. Kanchipuram is the ''Nabhi'' (navel) of the spiritual body of India. The vibration is one of absolute grace (Kripa) and the awakening of the intellect (Buddhi). It is the primary seat of the Sri Vidya tradition. A visit here is believed to grant the devotee the wisdom to distinguish the eternal from the transient and the grace to follow the path of truth. The atmosphere is one of timeless wisdom, flavored by the sound of Vedic chanting from the Kanchi Kamakoti Peetham.",
        "longDescription": "Kanchipuram is one of the oldest cities in South India, a center for both Shaivite and Vaishnavite learning. The Kamakshee Amman Temple is unique because it is the only Shakti temple in the city, and all other temples in Kanchi pay homage to her. The current structure is an architectural jewel of the Pallava and Chola periods. The main deity is seated in a Padmasana posture, holding a sugarcane bow and five flower arrows, representing the five senses. Adi Shankaracharya installed the Sri Chakra (the cosmic geometric pattern) in front of the deity to transform her fierce energy into benevolent grace. Kanchipuram is also world-famous for its silk weaving, a tradition that is considered a form of worship in itself, dressing the divine and the devotee in the finest threads.",
        "spiritualArchitecture": "The temple is a classic example of Dravidian architecture with a beautiful golden gopuram over the sanctum. The temple features a massive courtyard with several smaller shrines and a sacred tank. The pillars are carved with various forms of the Goddess and the figures of great sages. The Kanchi Kamakoti Peetham, established by Adi Shankaracharya, is located nearby and continues to be a major center for Vedic studies and Sanskrit learning.",
        "vedicReferences": "Kanchipuram is mentioned in the Kanchi Mahatmya and is one of the Sapta Puri (seven holy cities). It is the site where the navel of Sati fell according to some traditions.",
        "deepInsights": "The sugarcane bow signifies the mind, and the flower arrows represent the five senses. Kamakshee teaches that when the mind and senses are offered to the divine, they become instruments of joy rather than bondage.",
        "ancientLore": "Lore tells of the Goddess performing penance under a mango tree on the banks of the Vegavathi river to attain Lord Shiva. Another legend says that the river flooded during her penance, and she embraced the sand lingam (Ekambareswarar) to protect it, an act of supreme devotion.",
        "keyRituals": [
                {
                        "name": "Sri Chakra Puja",
                        "description": "The complex ritual worship of the cosmic geometric pattern installed by Adi Shankaracharya."
                },
                {
                        "name": "Suprabhatham",
                        "description": "The awakening of the Goddess with sacred chants at dawn."
                },
                {
                        "name": "Thiruveedi Ula",
                        "description": "The ceremonial procession of the Goddess through the streets of Kanchipuram during festivals."
                }
        ],
        "highlights": [
                {
                        "name": "Ekambareswarar Temple",
                        "description": "The massive Shiva temple nearby, featuring a 3,500-year-old mango tree."
                },
                {
                        "name": "Varadaraja Perumal Temple",
                        "description": "A major Vaishnavite shrine known for its architectural splendor."
                },
                {
                        "name": "Kanchi Kamakoti Peetham",
                        "description": "The spiritual heart of the city and a center for Vedic learning."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "75km from Chennai, well connected by road and rail.",
                "nearestAirport": "Chennai International Airport.",
                "nearestRailway": "Kanchipuram Railway Station."
        },
        "tips": [
                "Visit the silk weaving centers to see how the famous Kanchipuram sarees are made.",
                "Try the unique Kanchipuram Idli, a local culinary specialty.",
                "Attend the evening Chariot festival if visiting during the Brahmotsavam."
        ],
        "faqs": [
                {
                        "question": "Who installed the Sri Chakra here?",
                        "answer": "It was installed by the great philosopher-saint Adi Shankaracharya in the 8th century."
                },
                {
                        "question": "Why is it called the navel of India?",
                        "answer": "In the mapping of Shakti Peeths to the human body, Kanchipuram is traditionally associated with the Nabhi (navel) chakra."
                },
                {
                        "question": "Are there other temples to visit in Kanchi?",
                        "answer": "Yes, there are over 100 significant temples; Ekambareswarar and Varadaraja Perumal are the most prominent ones besides Kamakshee."
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
    'Mathura', 
    'mathura', 
    'Spiritual City', 
    'up', 
    'The birthplace of Lord Krishna, Mathura is one of the oldest cities in India and the starting point of the Braj spiritual circuit. The Krishna Janmabhoomi temple marks the site of the prison cell where the Avatar of Love descended to the earth.', 
    '150.2', 
    '235.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Holy Birthplace of the Divine Avatar', 
    'Mathura | Krishna Janmabhoomi, Yamuna Ghats & Ancient Lore', 
    'Explore the sacred history of Mathura. Discover the Krishna Janmabhoomi, the ancient Vishram Ghat, and the profound spiritual heritage of the Braj region.', 
    'Mathura, Lord Krishna, Janmabhoomi, Uttar Pradesh, Braj, Yamuna River, Hindu Pilgrimage, Ancient Lore, Vrindavan', 
    '31', 
    '{
        "spiritualEssence": "Mathura is the ground of the divine descent. The energy here is historical, potent, and deeply emotional. It is where the transition from the old world to the age of Bhakti began. The vibration is one of hope and the triumph of the divine over tyranny. Mathura is the ''Garbha'' (womb) of the Krishna consciousness. A visit here is a return to the origin of the spiritual path. The air is charged with the memory of the great battle between Kamsa and Krishna, and the ultimate peace that follows the restoration of Dharma. The atmosphere is vibrant with the sound of the Yamuna and the bells of ancient temples.",
        "longDescription": "Mathura has a history spanning over 2,500 years and is mentioned in the Ramayana as the capital of the demon Lavanasura, later liberated by Shatrughna. The Krishna Janmabhoomi complex is the most sacred site, where archaeological excavations have revealed layers of temple construction dating back to the Mauryan era. The city is situated on the western bank of the Yamuna. Vishram Ghat is the most important of its 25 ghats, where Krishna is said to have rested after killing Kamsa. Mathura is a city of narrow lanes, ancient Havelis, and the world-famous Mathura Museum, which houses one of the largest collections of Buddhist and Hindu sculptures in the world. It is the hub of the 84-kos Braj Parikrama, a pilgrimage that takes devotees through all the sites associated with Krishna''s life.",
        "spiritualArchitecture": "The architecture of Mathura is a mix of ancient brick temples and massive modern structures like the Keshavdeva temple within the Janmabhoomi complex. The Vishram Ghat features beautiful stone pavilions and wide steps. The Dwarkadhish temple is a fine example of the Rajasthani style with intricate paintings and marble work. The Mathura Museum is a masterpiece of British-Indian architecture, housing priceless artifacts from the Kushana and Gupta periods.",
        "vedicReferences": "Mathura is mentioned in the Mahabharata, the Bhagavata Purana, and the records of ancient travelers like Megasthenes and Xuanzang. It is one of the seven holy cities (Sapta Puri).",
        "deepInsights": "The birth of Krishna in a prison cell signifies that the divine can manifest even in the most restricted and difficult circumstances of our lives. Mathura teaches that the soul''s liberation begins with the awakening of the internal Krishna.",
        "ancientLore": "Lore tells that the original deity of Mathura was given by Krishna to his grandson Vajranabha. Another legend says that the river Yamuna changed its course just to provide a path for Vasudeva to carry the infant Krishna to safety.",
        "keyRituals": [
                {
                        "name": "Janmashtami",
                        "description": "The grand celebration of Krishna''s birth, occurring in August/September."
                },
                {
                        "name": "Yamuna Aarti",
                        "description": "The daily evening ritual at Vishram Ghat, honoring the sacred river."
                },
                {
                        "name": "Braj Parikrama",
                        "description": "The 84-mile pilgrimage visiting various sites of Krishna''s pastimes."
                }
        ],
        "highlights": [
                {
                        "name": "Krishna Janmabhoomi",
                        "description": "The temple complex marking the birthplace of Lord Krishna."
                },
                {
                        "name": "Vishram Ghat",
                        "description": "The most sacred bathing spot on the Yamuna river."
                },
                {
                        "name": "Mathura Museum",
                        "description": "One of India''s premier archaeological museums."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "150km from Delhi, well connected by the Taj Expressway and major rail lines.",
                "nearestAirport": "Agra Airport / Delhi Airport.",
                "nearestRailway": "Mathura Junction."
        },
        "tips": [
                "Start your Braj tour from Mathura before heading to Vrindavan.",
                "Try the famous Mathura Peda, a traditional milk-based sweet.",
                "Be prepared for security checks at the Janmabhoomi complex."
        ],
        "faqs": [
                {
                        "question": "How far is Mathura from Vrindavan?",
                        "answer": "It is about 15 kilometers away and takes 30-40 minutes by road."
                },
                {
                        "question": "Is the original prison cell still there?",
                        "answer": "There is a cave-like room within the complex that traditionally marks the spot of the prison cell."
                },
                {
                        "question": "What is the best time for Yamuna Aarti?",
                        "answer": "The Aarti is performed at sunset daily at Vishram Ghat."
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
    'Gaya (Vishnupad)', 
    'gaya-vishnupad', 
    'Spiritual City', 
    'br', 
    'Gaya is the premier site for ancestral salvation in India. The Vishnupad Temple, located on the banks of the Phalgu river, houses the 40cm long footprint of Lord Vishnu, symbolizing his eternal protection over the world of the living and the dead.', 
    '430.5', 
    '280.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Threshold of Ancestral Salvation', 
    'Vishnupad Temple Gaya | Ancestral Rites, Lord Vishnu & Ancient Lore', 
    'Discover the spiritual power of Gaya. Explore the Vishnupad Temple, the legend of the demon Gayaasura, and the profound significance of Pind Daan rituals.', 
    'Gaya, Vishnupad, Pind Daan, Bihar, Lord Vishnu, Ancestral Rites, Hindu Pilgrimage, Ancient Lore, Phalgu River', 
    '32', 
    '{
        "spiritualEssence": "Gaya is the point of transit for the soul. The energy here is solemn, ritualistic, and intensely transformative. It is the bridge between the ancestors and the divine. The vibration is one of absolute surrender to the laws of life and death. The Phalgu river, which flows beneath its sandy bed, signifies the hidden spiritual truth that lies beneath the surface of the material world. A visit here is a duty to one''s lineage, believed to release the souls of ancestors from the cycle of birth and death. The atmosphere is quiet, flavored by the sound of mantras and the smell of sacred offerings. It is the place where the footprint of the divine is the only constant in a changing world.",
        "longDescription": "The origin of Gaya is linked to the demon Gayaasura, who performed such intense penance that his body became so pure that anyone who touched him attained heaven. To maintain the balance of the world, Lord Vishnu placed his foot on the demon''s head to stabilize him. In gratitude, the demon asked that the spot remain sacred forever for ancestral rites. The Vishnupad temple was rebuilt in 1787 by Queen Ahilyabai Holkar in a stunning grey granite style. The city is one of the oldest in India and has been a center for Vedic learning and ritual for thousands of years. The Pitrupaksha Mela, held annually, draws millions of people who come to perform Pind Daan (offerings) for their forefathers. Gaya is also the gateway to Bodh Gaya, where the Buddha attained enlightenment, making the region a unique hub for multiple spiritual traditions.",
        "spiritualArchitecture": "The Vishnupad temple is an architectural masterpiece of grey granite. It features a massive eight-tiered spire (Shikhara) and a spacious courtyard. The inner sanctum houses the 40cm footprint of Lord Vishnu on a solid rock, surrounded by a silver-plated basin. The temple columns are carved with various figures of the avatars of Vishnu and the legends of the Puranas. The temple is located on the banks of the Phalgu river, with wide stone steps leading down to the water.",
        "vedicReferences": "Gaya is mentioned in the Rig Veda, the Ramayana, and the Mahabharata. It is hailed in the Puranas as the supreme site for Pitru Karma (ancestral rites).",
        "deepInsights": "The footprint of Vishnu represents the grounding of the divine energy into the earth. Gaya teaches that our connection to our ancestors is a vital part of our own spiritual evolution.",
        "ancientLore": "Lore tells that the river Phalgu was cursed by Goddess Sita because it told a lie about Rama''s father. As a result, the river now flows underground. Another legend says that Lord Rama himself performed Pind Daan for his father Dasharatha here.",
        "keyRituals": [
                {
                        "name": "Pind Daan",
                        "description": "The essential ritual of offering rice balls to ancestors to ensure their salvation."
                },
                {
                        "name": "Tarpanam",
                        "description": "The offering of water with sesame seeds to the departed souls."
                },
                {
                        "name": "Vishnupad Darshan",
                        "description": "Viewing the sacred footprint of the Lord, believed to grant ultimate protection."
                }
        ],
        "highlights": [
                {
                        "name": "Phalgu River",
                        "description": "The sacred river that flows beneath the sand, where ancestral rites are performed."
                },
                {
                        "name": "Akshayabat",
                        "description": "The undying banyan tree, believed to be the site where Sita gave a boon to the ancestors."
                },
                {
                        "name": "Pretshila Hill",
                        "description": "A hill located nearby associated with the liberation of troubled spirits."
                }
        ],
        "travelInfo": {
                "bestTime": "September to March (and during Pitrupaksha Mela).",
                "howToReach": "100km from Patna, well connected by rail and road. Gaya has its own international airport.",
                "nearestAirport": "Gaya International Airport.",
                "nearestRailway": "Gaya Junction."
        },
        "tips": [
                "Hire an authorized priest (Gayawal Panda) to guide you through the complex Pind Daan rituals.",
                "Start your rituals early in the morning for a more peaceful experience.",
                "Combine your visit with a trip to Bodh Gaya, just 12km away."
        ],
        "faqs": [
                {
                        "question": "Why is Pind Daan performed here?",
                        "answer": "Due to the legend of Gayaasura and the presence of Vishnu''s footprint, it is considered the most effective site for ancestral peace."
                },
                {
                        "question": "How long do the rituals take?",
                        "answer": "A full Pind Daan ceremony can take anywhere from 3 to 6 hours depending on the detail."
                },
                {
                        "question": "Can women perform the rituals?",
                        "answer": "Traditionally men perform the rites, but there are certain traditions that allow women to participate; consult a local priest."
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
    'Pushkar', 
    'pushkar', 
    'Spiritual City', 
    'rj', 
    'Located on the edge of the Thar desert, Pushkar is home to the world''s only prominent temple dedicated to Lord Brahma. The sacred Pushkar Lake, with its 52 ghats, is believed to have been created by the falling petals of the Lord''s lotus.', 
    '120.2', 
    '280.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Lotus of the Creator', 
    'Brahma Temple Pushkar | Sacred Lake, 52 Ghats & Ancient Lore', 
    'Discover the unique spiritual aura of Pushkar. Explore the world''s only Brahma temple, the sacred 52 ghats of Pushkar Lake, and the vibrant Camel Fair traditions.', 
    'Pushkar, Lord Brahma, Rajasthan, Pushkar Lake, Hindu Pilgrimage, Ancient Lore, Camel Fair, 52 Ghats, Creator', 
    '33', 
    '{
        "spiritualEssence": "Pushkar is the energy of creation itself. The name Pushkar means ''blue lotus flower''. The vibration here is unique—peaceful, bohemian, and intensely atmospheric. It is the site where the creator, Lord Brahma, performed a massive yagna to bless the world. The energy is one of primordial beginnings. The 52 ghats of the lake represent a map of the universe. A visit here is a return to the source of existence. The air is always vibrant with the sound of bells and the chanting of the Brahma Gayatri. It is a site where the desert meets the divine, creating a sense of infinite space and inner stillness.",
        "longDescription": "The origin of Pushkar is linked to a cosmic battle between Lord Brahma and a demon named Vajranabha. Brahma used a lotus flower as a weapon, and three petals fell to the earth, creating the three Pushkar lakes. The current Brahma temple dates back to the 14th century, though the original site is ancient. The temple is built of marble and stone stabs, with a distinct red spire and a bird (Hamsa) symbol. Pushkar is one of the five sacred lakes (Panch-Sarovar) of India. The city is famous for the Pushkar Camel Fair, one of the world''s largest tribal gatherings, which takes place during the Kartik Purnima. The lake is surrounded by over 400 temples, making it a complete spiritual landscape on the edge of the desert.",
        "spiritualArchitecture": "The Brahma temple is an architectural jewel with a marble floor and a red Shikhara. The entrance features a beautiful silver turtle. The lake is surrounded by 52 white ghats, each with its own history and significance. The Varaha temple and the Savitri temple (on the hilltop) are other architectural highlights. The city has a unique circular layout centered around the lake, with narrow winding lanes filled with handicrafts and cafes.",
        "vedicReferences": "Pushkar is mentioned in the Padma Purana as the place where the Creator resides. It is the site of the primary Yagna performed at the beginning of the current era.",
        "deepInsights": "The Lotus represents the unfolding of consciousness. Pushkar teaches that even in the midst of the desert (the dryness of material life), the flower of spirituality can bloom. The rarity of Brahma temples signifies that creation is a unique and precious act.",
        "ancientLore": "Lore tells of a curse by Goddess Savitri, who was angry with Brahma for performing a yagna with another goddess (Gayatri). She declared that he would be worshipped only in Pushkar. Another legend says that a dip in the lake during Kartik Purnima is equivalent to performing a hundred yagnas.",
        "keyRituals": [
                {
                        "name": "Pushkar Snan",
                        "description": "The ritual bath in the sacred lake, especially during the full moon of Kartik."
                },
                {
                        "name": "Brahma Aarti",
                        "description": "The evening worship at the Brahma temple, a rare and peaceful ritual."
                },
                {
                        "name": "Deep Daan",
                        "description": "Offering floating lamps to the lake at sunset."
                }
        ],
        "highlights": [
                {
                        "name": "Pushkar Lake",
                        "description": "The sacred lake with 52 ghats, the heart of the city."
                },
                {
                        "name": "Savitri Temple",
                        "description": "Located on a hilltop, offering a panoramic view of the lake and the desert."
                },
                {
                        "name": "Pushkar Camel Fair",
                        "description": "The massive annual cultural and spiritual gathering."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (and November for the Camel Fair).",
                "howToReach": "15km from Ajmer, well connected by road and rail. Ajmer is the nearest major railway junction.",
                "nearestAirport": "Kishangarh Airport / Jaipur Airport.",
                "nearestRailway": "Ajmer Junction / Pushkar Terminus."
        },
        "tips": [
                "Take the ropeway to the Savitri temple for a spectacular sunrise view.",
                "Respect the holy status of the lake; avoid using soap or cameras near the water.",
                "The city is strictly vegetarian and alcohol-free."
        ],
        "faqs": [
                {
                        "question": "Why is there only one Brahma temple?",
                        "answer": "According to legend, it is due to a curse by Goddess Savitri; Pushkar is the only site where he is prominently worshipped."
                },
                {
                        "question": "How far is Pushkar from Ajmer?",
                        "answer": "It is about 15 kilometers (30 minutes) by road over the Nag Pahar hill."
                },
                {
                        "question": "When is the Camel Fair?",
                        "answer": "It takes place annually during the Hindu month of Kartik, usually falling in November."
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
    'Harsiddhi (Ujjain)', 
    'harsiddhi-ujjain', 
    'Shakti Peeth', 
    'mp', 
    'Harsiddhi Mata is the guardian goddess of Ujjain and one of the 51 Shakti Peeths. It is where the upper lip of Goddess Sati fell, and she is the deity who gave victory to the legendary King Vikramaditya.', 
    '216.5', 
    '322.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Victorious Mother of Ujjain', 
    'Harsiddhi Mata Temple | Ujjain Shakti Peeth, Vikramaditya & Lore', 
    'Discover the spiritual power of Harsiddhi Mata. Explore the legend of King Vikramaditya, the iconic 1000-lamp pillars, and the profound Shakti Peeth traditions of Ujjain.', 
    'Harsiddhi, Ujjain, Shakti Peeth, Madhya Pradesh, Goddess Durga, Vikramaditya, Hindu Pilgrimage, Ancient Lore, Mahakal', 
    '34', 
    '{
        "spiritualEssence": "Harsiddhi is the manifestation of the Mother as the granter of victory (Siddhi). The name means ''she who gives joy and success''. The energy here is dynamic, triumphant, and deeply protective. While Mahakal represents the power of Time, Harsiddhi represents the power of Action (Kriya Shakti). The vibration is one of intense brilliance. It is the site where the upper lip of the Goddess fell, signifying the power of the spoken word and the divine command. A visit here is believed to grant success in all endeavors and the protection of the Mother in the face of adversity. The atmosphere is electric, especially during the evening when the thousand lamps are lit.",
        "longDescription": "The history of Harsiddhi is intertwined with the legendary King Vikramaditya, the ruler of Ujjain. It is said that he worshipped the Goddess with such devotion that he offered his head multiple times, and each time she restored it. In return, she granted him unparalleled wisdom and victory. The temple is one of the most important Shakti Peeths in Central India. The current structure features two massive stone pillars (Deepstambhas) that stand about 50 feet tall, each containing nearly 500 lamps. Lighting these lamps is a major ritual that creates a sea of fire and light. The temple is located near the Shipra river and the Mahakaleshwar temple, making Ujjain a unique site where Shiva and Shakti reside in close proximity.",
        "spiritualArchitecture": "The temple is built in a classic Maratha style with a large courtyard and a tiered Shikhara. The two stone lamp pillars are the most striking architectural feature, unique to this temple. The inner sanctum houses the idol of the Goddess, painted in bright vermilion. The temple walls are carved with various forms of Durga and the legends of King Vikramaditya. The complex also includes shrines dedicated to various other Hindu deities.",
        "vedicReferences": "Harsiddhi is mentioned in the Shiva Purana and the Skanda Purana (Avantika Khanda) as a primary Shakti Peeth.",
        "deepInsights": "The lighting of the thousand lamps represents the awakening of the light of consciousness within the devotee. Harsiddhi teaches that true victory comes when our actions are aligned with the divine will.",
        "ancientLore": "Lore tells that the Goddess killed the demons Chand and Mund here after they had troubled the sages. Another legend says that the Goddess personally guided Vikramaditya in his administration, making his reign a golden age of Indian history.",
        "keyRituals": [
                {
                        "name": "Deepstambha Lighting",
                        "description": "The spectacular ritual of lighting 1000 oil lamps on the two massive stone pillars at sunset."
                },
                {
                        "name": "Kumkumarchana",
                        "description": "Offering of vermilion to the Goddess, seeking her protection and grace."
                },
                {
                        "name": "Navratri Utsav",
                        "description": "The nine-day festival of the Goddess celebrated with great pomp and show."
                }
        ],
        "highlights": [
                {
                        "name": "Deepstambhas",
                        "description": "The two massive 50-foot tall stone pillars containing 1000 lamps."
                },
                {
                        "name": "Vikramaditya Statue",
                        "description": "A nearby monument dedicated to the legendary king of Ujjain."
                },
                {
                        "name": "Mahakaleshwar Temple",
                        "description": "The Jyotirlinga temple located just a short walk away."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Located in the heart of Ujjain, well connected by road and rail from Indore.",
                "nearestAirport": "Indore Airport.",
                "nearestRailway": "Ujjain Junction."
        },
        "tips": [
                "Arrive at sunset to witness the magnificent lighting of the lamp pillars.",
                "Combine your visit with the Mahakaleshwar Darshan.",
                "Be prepared for large crowds during the Navratri festival."
        ],
        "faqs": [
                {
                        "question": "How many lamps are on the pillars?",
                        "answer": "There are approximately 1,011 lamps on the two massive pillars."
                },
                {
                        "question": "Can I pay for the lamp lighting?",
                        "answer": "Yes, devotees can sponsor the lighting of the lamps as an offering to the Goddess."
                },
                {
                        "question": "Is it near Mahakal temple?",
                        "answer": "Yes, it is about 500 meters away, making it very easy to visit both on the same day."
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
    'Amritapuri (Kollam)', 
    'amritapuri-kollam', 
    'Sacred Destination', 
    'kl', 
    'Amritapuri is the international headquarters of the Mata Amritanandamayi Math. Located on a narrow peninsula between the Arabian Sea and the Kerala backwaters, it is the birthplace and residence of ''Amma,'' the world-renowned spiritual leader and humanitarian.', 
    '175.5', 
    '650.8', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Abode of Unconditional Love and Service', 
    'Amritapuri | Kerala Backwaters, Amma''s Birthplace & Global Spirituality', 
    'Experience the profound vibration of Amritapuri. Discover the birthplace of Amma, the global humanitarian mission, and the path of selfless service in Kerala.', 
    'Amritapuri, Amma, Kerala, Mata Amritanandamayi, Kollam, Backwaters, Hindu Pilgrimage, Selfless Service, Global Spirituality', 
    '35', 
    '{
        "spiritualEssence": "Amritapuri is the manifestation of the Mother as unconditional love and selfless service (Seva). The energy here is compassionate, global, and intensely active. Unlike ancient stone temples, Amritapuri is a living, breathing spiritual laboratory. The vibration is one of ''Amma''—the Mother—who embraces all regardless of caste, creed, or nationality. It is the site where the individual soul is encouraged to expand its heart to include the whole world. A visit here is a call to action. The air is always vibrant with the sound of Bhajans, the chanting of the Lalita Sahasranama, and the hum of thousands of volunteers working for humanity. The vibration is one of pure, practical spirituality.",
        "longDescription": "Amritapuri was originally a small coastal village called Parayakadavu. It is the birthplace of Sudhamani, who later became Mata Amritanandamayi (Amma). Over the last 40 years, it has transformed into a massive international ashram and educational hub. The ashram is located on a narrow strip of land between the sea and the backwaters. It is home to thousands of residents from across the globe. The central prayer hall (Bhajan Hall) is the heart of the ashram, where Amma gives her world-famous Darshan (the embrace). The ashram is also the center for the ''Embracing the World'' humanitarian organization, which runs hospitals, schools, and disaster relief programs. Amritapuri is a site where modern science and ancient spirituality coexist in harmony.",
        "spiritualArchitecture": "The architecture of Amritapuri is a mix of traditional Kerala style and functional modern buildings. The main temple is a beautiful red structure with a gold-plated dome. The ashram buildings are multi-storied to accommodate the large number of residents and visitors. The atmosphere is serene, with coconut groves and the sound of the ocean providing a natural backdrop. The ashram also features several eco-friendly and sustainable building practices.",
        "vedicReferences": "While a modern site, the practices at Amritapuri are deeply rooted in the Vedic tradition, particularly the path of Bhakti (devotion) and Karma Yoga (selfless service).",
        "deepInsights": "The embrace of Amma represents the opening of the heart. Amritapuri teaches that the highest form of worship is the service of the poor and the suffering. It signifies that the divine resides in every living being.",
        "ancientLore": "Lore tells of the various miracles performed by Amma in her childhood, where she would share her family''s food with the hungry and care for the animals of the village. These small acts of love became the foundation of her global mission.",
        "keyRituals": [
                {
                        "name": "Amma''s Darshan",
                        "description": "The unique ritual of receiving a personal embrace and blessing from the Mother."
                },
                {
                        "name": "Lalita Sahasranama Archana",
                        "description": "The daily chanting of the 1000 names of the Divine Mother."
                },
                {
                        "name": "Bhajan Sandhya",
                        "description": "Evening devotional singing led by Amma or ashram residents."
                }
        ],
        "highlights": [
                {
                        "name": "Amritapuri Beach",
                        "description": "The beautiful stretch of coastline where Amma spent her childhood."
                },
                {
                        "name": "Kerala Backwaters",
                        "description": "The serene waterways surrounding the ashram peninsula."
                },
                {
                        "name": "Amrita University",
                        "description": "The world-class research and educational institution nearby."
                }
        ],
        "travelInfo": {
                "bestTime": "August to March.",
                "howToReach": "Well connected by road and rail from Kochi and Trivandrum. The nearest major railway stations are Kayankulam and Karunagappally.",
                "nearestAirport": "Trivandrum International Airport / Kochi Airport.",
                "nearestRailway": "Kayankulam Junction."
        },
        "tips": [
                "Check Amma''s travel schedule on the official website before visiting.",
                "Participate in the ashram activities (Seva) to experience the true spirit of the place.",
                "Respect the ashram rules regarding dress and conduct."
        ],
        "faqs": [
                {
                        "question": "Can anyone visit Amritapuri?",
                        "answer": "Yes, people of all backgrounds and faiths are welcome to visit and stay at the ashram."
                },
                {
                        "question": "How to get Darshan?",
                        "answer": "Darshan is free, but you may need to take a token and wait for your turn, especially during large gatherings."
                },
                {
                        "question": "Is there accommodation available?",
                        "answer": "Yes, the ashram provides simple and clean accommodation for visitors; it is best to book in advance."
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
    'Shirdi (Sai Baba)', 
    'shirdi-sai-baba', 
    'Sacred Destination', 
    'mh', 
    'Shirdi is the sacred home of the 19th-century saint Sai Baba, who taught the unity of all religions. It is a site of immense faith where the simple mosque of Dwarkamai and the Samadhi Mandir serve as beacons of peace and universal brotherhood.', 
    '125.5', 
    '440.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Land of Faith and Compassion', 
    'Shirdi Sai Baba Temple | Maharashtra, Dwarkamai & Ancient Lore', 
    'Experience the profound peace of Shirdi. Discover the Samadhi Mandir, the Dwarkamai mosque, and the timeless teachings of Sai Baba on faith and patience.', 
    'Shirdi, Sai Baba, Maharashtra, Samadhi Mandir, Dwarkamai, Hindu Pilgrimage, Ancient Lore, Faith, Patience', 
    '36', 
    '{
        "spiritualEssence": "Shirdi is the manifestation of the divine as the simple, accessible master. The energy here is quiet, deeply personal, and universally welcoming. Sai Baba''s core teaching of ''Sabka Malik Ek'' (One God for All) permeates the entire town. The vibration is one of Shraddha (Faith) and Saburi (Patience). Shirdi is the site where the rigid boundaries of religion were dissolved in the fire of the Lord''s love. A visit here is believed to fulfill the deepest prayers of the heart. The air is always vibrant with the scent of Udi (sacred ash) and the sound of the Sai Satcharitra being recited. It is a site of absolute trust and the realization of the presence of the master in everyday life.",
        "longDescription": "Shirdi was a small, obscure village until Sai Baba arrived in the mid-19th century. He spent most of his life in a dilapidated mosque he named Dwarkamai, where he kept a sacred fire (Dhuni) burning. His simple life of begging for food and healing the sick drew people from all walks of life. The current Samadhi Mandir houses his mortal remains and a magnificent white marble statue of the saint. The town has become one of the busiest pilgrimage sites in India, managed with incredible efficiency. Shirdi is also a center for various charitable activities, following Baba''s example of selfless service. Every corner of the town, from the Chavadi to the Lendi Garden, is filled with stories of his miracles and teachings.",
        "spiritualArchitecture": "The architecture of Shirdi is a blend of simple, historical structures and grand modern temples. The Dwarkamai mosque is a humble stone and wood structure that reflects Baba''s simplicity. The Samadhi Mandir is a grand building with a gold-plated spire and a large assembly hall. The marble statue of Sai Baba is a masterpiece of modern sculpture, capturing his compassionate gaze. The temple complex is designed to handle millions of visitors with multiple queue halls and large dining facilities (Prasadalaya).",
        "vedicReferences": "While not an ancient Vedic site, the teachings of Sai Baba are deeply aligned with the principles of Advaita Vedanta and the Bhakti tradition.",
        "deepInsights": "The Dhuni (eternal fire) represents the fire of knowledge that burns away our past karmas. Shirdi teaches that the divine is found in the simple acts of kindness and the unwavering faith in the words of the master.",
        "ancientLore": "Lore tells of various miracles where Baba turned water into oil to light lamps and protected his devotees from calamities across great distances. His promise that ''Whoever steps on this soil will find their sufferings at an end'' continues to draw millions.",
        "keyRituals": [
                {
                        "name": "Kakad Aarti",
                        "description": "The beautiful early morning awakening ritual of the saint."
                },
                {
                        "name": "Dhuni Darshan",
                        "description": "Offering wood or prayers to the eternal fire kept burning by Baba since his time."
                },
                {
                        "name": "Sai Satcharitra Parayan",
                        "description": "The reading of the life and teachings of Sai Baba within the temple complex."
                }
        ],
        "highlights": [
                {
                        "name": "Samadhi Mandir",
                        "description": "The main temple housing the tomb and the marble statue of Sai Baba."
                },
                {
                        "name": "Dwarkamai",
                        "description": "The mosque where Sai Baba lived for most of his life."
                },
                {
                        "name": "Lendi Garden",
                        "description": "The garden where Baba used to spend time in meditation and planted various trees."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road and rail. Shirdi has its own international airport and a dedicated railway station (Sainagar Shirdi).",
                "nearestAirport": "Shirdi International Airport.",
                "nearestRailway": "Sainagar Shirdi Railway Station."
        },
        "tips": [
                "Book your Darshan and Aarti slots online in advance to save time.",
                "Try the Prasad offered at the temple kitchen (Prasadalaya), one of the largest in India.",
                "Dress modestly and maintain silence within the temple precincts."
        ],
        "faqs": [
                {
                        "question": "How to book Darshan online?",
                        "answer": "Tickets can be booked on the official Shirdi Sai Trust website."
                },
                {
                        "question": "Is Shirdi near Mumbai?",
                        "answer": "It is about 240km (5-6 hours) from Mumbai by road."
                },
                {
                        "question": "What is Udi?",
                        "answer": "It is the sacred ash from the eternal fire (Dhuni) lit by Sai Baba, believed to have healing properties."
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
    'Mahabodhi (Bodh Gaya)', 
    'mahabodhi-bodh-gaya', 
    'Sacred Destination', 
    'br', 
    'The site of the supreme enlightenment, the Mahabodhi Temple in Bodh Gaya is the center of the Buddhist world. It is where Siddhartha Gautama sat under the Bodhi Tree and attained the state of absolute awakening (Buddhahood).', 
    '440.5', 
    '290.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Ground of Absolute Enlightenment', 
    'Mahabodhi Temple | Bodh Gaya, Bodhi Tree & Ancient Lore', 
    'Step into the sacred silence of Bodh Gaya. Discover the Mahabodhi Temple, the legendary Bodhi Tree, and the profound philosophy of the Middle Path.', 
    'Mahabodhi, Bodh Gaya, Bihar, Buddha, Enlightenment, Bodhi Tree, Hindu Pilgrimage, Ancient Lore, Middle Path', 
    '37', 
    '{
        "spiritualEssence": "Mahabodhi is the manifestation of the divine as pure awareness. The energy here is exceptionally still, radiant, and profoundly peaceful. It is the site where the struggle of the individual soul was finally resolved in the light of truth. The vibration is one of absolute clarity and compassion. Bodh Gaya is the heart of the Buddhist world, where the boundaries of self and other are dissolved in the silence of meditation. A visit here is a return to the source of wisdom. The air is always vibrant with the sound of Buddhist chanting and the rustle of the leaves of the Bodhi Tree. It is a site of ultimate awakening.",
        "longDescription": "The history of Bodh Gaya dates back to the 6th century BCE. After years of extreme asceticism, Siddhartha Gautama sat under a Pipal tree and vowed not to rise until he found the truth. He attained enlightenment on a full moon night. The first temple was built by Emperor Ashoka in the 3rd century BCE. The current structure, a UNESCO World Heritage site, is a magnificent brick temple dating back to the 5th or 6th century CE. It is one of the oldest brick structures in India. The temple is surrounded by several other sites where the Buddha spent seven weeks after his enlightenment, including the Animesh Lochan Chaitya and the Chankramana (Jewel Walkway). Bodh Gaya is a global spiritual hub, with monasteries built by various Buddhist nations adding to its diverse cultural landscape.",
        "spiritualArchitecture": "The Mahabodhi Temple is a masterpiece of early Indian brick architecture. It features a massive central spire reaching 55 meters, surrounded by four smaller spires. The temple walls are carved with scenes from the Buddha''s life and various Buddhist deities. The Bodhi Tree stands directly behind the temple, protected by a low stone railing. The complex includes several stupas, statues, and the sacred Lotus Pond (Muchalinda Lake).",
        "vedicReferences": "While a Buddhist site, Gaya is traditionally associated with Lord Vishnu, and Buddha is revered as the ninth avatar of Vishnu in many Hindu traditions.",
        "deepInsights": "The Bodhi Tree represents the interconnectedness of all life. Mahabodhi teaches that enlightenment is not a destination but the realization of our true nature here and now.",
        "ancientLore": "Lore tells of the demon Mara who tried to distract the Buddha from his meditation with visions of desire and fear, but the Buddha remained unmoved. Another legend says that the earth itself shook when he attained enlightenment, acknowledging the supreme event.",
        "keyRituals": [
                {
                        "name": "Meditation under Bodhi Tree",
                        "description": "The primary practice of sitting in silence near the site of enlightenment."
                },
                {
                        "name": "Chanting",
                        "description": "Massive group chanting of Buddhist scriptures by monks and laypeople."
                },
                {
                        "name": "Circumambulation (Parikrama)",
                        "description": "Walking the sacred path around the temple and the Bodhi Tree."
                }
        ],
        "highlights": [
                {
                        "name": "The Bodhi Tree",
                        "description": "The direct descendant of the tree under which the Buddha attained enlightenment."
                },
                {
                        "name": "Vajrasana",
                        "description": "The Diamond Throne marking the exact spot of the Buddha''s enlightenment."
                },
                {
                        "name": "Muchalinda Lake",
                        "description": "The pond where the serpent king Muchalinda protected the Buddha from a storm."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "12km from Gaya city, well connected by road and rail. Gaya has its own international airport.",
                "nearestAirport": "Gaya International Airport.",
                "nearestRailway": "Gaya Junction."
        },
        "tips": [
                "Join a meditation retreat in one of the local monasteries for a deeper experience.",
                "Visit during the Buddha Purnima festival for a spectacular spiritual celebration.",
                "Respect the silence and meditative atmosphere of the temple complex."
        ],
        "faqs": [
                {
                        "question": "Is it the original Bodhi Tree?",
                        "answer": "It is a direct descendant of the original tree, planted from a sapling of the tree in Sri Lanka which was taken from the original Bodhi tree."
                },
                {
                        "question": "How far is it from Gaya Vishnupad?",
                        "answer": "It is about 12 kilometers (30 minutes) by road."
                },
                {
                        "question": "Are there other monasteries to visit?",
                        "answer": "Yes, there are many beautiful monasteries built by Japan, Thailand, Bhutan, and other Buddhist countries in Bodh Gaya."
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";

INSERT INTO "public"."Spritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
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
) ON CONFLICT (slug) DO UPDATE SET "name" = EXCLUDED."name", "type" = EXCLUDED."type", "state_id" = EXCLUDED."state_id", "description" = EXCLUDED."description", "x" = EXCLUDED."x", "y" = EXCLUDED."y", "size" = EXCLUDED."size", "images" = EXCLUDED."images", "is_featured" = EXCLUDED."is_featured", "is_active" = EXCLUDED."is_active", "tagline" = EXCLUDED."tagline", "seo_title" = EXCLUDED."seo_title", "seo_description" = EXCLUDED."seo_description", "seo_keywords" = EXCLUDED."seo_keywords", "order_rank" = EXCLUDED."order_rank", "content" = EXCLUDED."content";