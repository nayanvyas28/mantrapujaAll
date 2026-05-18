-- BATCH 12: ULTRA ELITE SPIRITUAL PLACES (MAX VOLUME & DEPTH)
-- Locations: Mayapur, Parshuram Kund, Unakoti, Umananda, Tawang, Tuljapur, Kolhapur, Vindhyachal, Chitrakoot, Awantipora

-- 1. MAYAPUR (ISKCON HEADQUARTERS)
INSERT INTO "public"."spiritual_places"  (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Mayapur', 
    'mayapur', 
    'Sacred Destination', 
    'wb', 
    'The birthplace of Chaitanya Mahaprabhu and the global headquarters of ISKCON, Mayapur is the spiritual heart of the Gaudiya Vaishnava tradition. Located at the confluence of the Jalangi and Ganges, it is a city of constant chanting and divine ecstasy.', 
    '720.2', 
    '450.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Global Capital of Krishna Consciousness', 
    'Mayapur | West Bengal, ISKCON HQ, Chaitanya & Ancient Lore', 
    'Experience the ecstatic Bhakti of Mayapur. Discover the Temple of the Vedic Planetarium, the birthplace of Chaitanya Mahaprabhu, and the global heart of the Hare Krishna movement.', 
    'Mayapur, West Bengal, ISKCON, Chaitanya Mahaprabhu, Lord Krishna, Hindu Pilgrimage, Ancient Lore, Gaudiya Vaishnava', 
    '108', 
    '{
        "spiritualEssence": "Mayapur is the manifestation of the divine as the supreme nectar of Nama-Sankirtana (chanting). The energy here is joyful, inclusive, and intensely devotional. It is the site where the absolute reality is experienced through the vibration of the holy name. The vibration is one of ''Prem-Bhakti'' (Pure Love) and the absolute unity of the spiritual family. As a city of constant prayer, it represents the descent of the spiritual world (Vaikuntha) onto the earth. A visit here is believed to grant the devotee the taste for the holy name and the realization of the soul''s eternal relationship with the Lord. The air is always vibrant with the sound of the Mridanga and the constant, melodic chanting of the Maha-Mantra.",
        "longDescription": "Mayapur, located in the Nadia district of West Bengal, is one of the nine islands of Navadwip. It is the birthplace of Chaitanya Mahaprabhu, the 15th-century saint who started the Sankirtana movement. The site was rediscovered in the late 19th century by Bhaktivinoda Thakur. Today, it is famous as the global headquarters of ISKCON (International Society for Krishna Consciousness). The center-piece of the city is the Temple of the Vedic Planetarium (TOVP), one of the largest religious structures in the world, featuring a massive dome and complex astronomical displays. Mayapur is a global village where thousands of devotees from every country live and pray together, creating a unique spiritual atmosphere that is both ancient and modern.",
        "spiritualArchitecture": "The architecture of Mayapur is a spectacular blend of traditional Bengali styles and grand modern monuments. The Temple of the Vedic Planetarium is a masterpiece of modern engineering, featuring the world''s largest stainless steel dome covered with blue Bolivian marble. The architecture includes detailed astronomical models based on the Srimad Bhagavatam. The Yoga Peeth (birthplace of Chaitanya) features a white-washed temple with a tall spire and beautiful gardens. The ISKCON complex is a city in itself, with massive guesthouses, parks, and schools designed to accommodate millions of pilgrims. The use of marble, gold-plating, and intricate relief carvings reflects the regal nature of the divine presence in the Gaudiya tradition.",
        "vedicReferences": "Mayapur is celebrated in the Chaitanya Charitamrita and the Chaitanya Bhagavata as the supreme spiritual abode manifested on the banks of the Ganges.",
        "deepInsights": "The congregational chanting represents the collective awakening of the soul. Mayapur teaches that in the current age (Kali Yuga), the simplest path to the divine is through the vibration of the holy name.",
        "ancientLore": "Lore tells that Chaitanya Mahaprabhu personally predicted that one day a magnificent temple would arise in Mayapur and the holy name would be heard in every town and village of the world. Another legend says that the dust of Mayapur is saturated with the tears of the Lord''s ecstatic love.",
        "keyRituals": [
                {
                        "name": "Mangala Aarti",
                        "description": "The ecstatic early morning worship where thousands of devotees dance and chant in the main temple hall."
                },
                {
                        "name": "Navadwip Mandala Parikrama",
                        "description": "The annual 9-day walking pilgrimage around the nine islands of Navadwip."
                },
                {
                        "name": "Ganga Aarti",
                        "description": "The evening worship of the sacred river Ganges at the Mayapur ghats."
                },
                {
                        "name": "Prasadam Seva",
                        "description": "The ritual of honoring the sanctified food, which is cooked on a massive scale for all visitors."
                }
        ],
        "highlights": [
                {
                        "name": "Temple of the Vedic Planetarium",
                        "description": "The massive new temple and astronomical center of the Gaudiya tradition."
                },
                {
                        "name": "Yoga Peeth",
                        "description": "The exact birthplace of Chaitanya Mahaprabhu, marked by a beautiful temple."
                },
                {
                        "name": "Srila Prabhupada Pushpa Samadhi",
                        "description": "The grand memorial dedicated to the founder of ISKCON."
                },
                {
                        "name": "Navadwip Islands",
                        "description": "The surrounding landscape of nine islands, each representing a limb of devotional service."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Gaura Purnima).",
                "howToReach": "130km from Kolkata, well connected by road and rail (Nabadwip Dham station). Regular boats run across the river from Nabadwip to Mayapur.",
                "nearestAirport": "Netaji Subhash Chandra Bose International Airport, Kolkata.",
                "nearestRailway": "Nabadwip Dham / Krishnanagar City Junction."
        },
        "tips": [
                "Stay at the ISKCON guesthouses to experience the full early morning and late night spiritual cycle of the city.",
                "Participate in the evening Sankirtana; it is the most vibrant and ecstatic experience in Mayapur.",
                "Take a boat ride on the Ganges at sunset to see the temple domes from the river."
        ],
        "faqs": [
                {
                        "question": "What is the Vedic Planetarium?",
                        "answer": "It is a massive temple that includes a cosmic model of the universe as described in the ancient Vedic texts."
                },
                {
                        "question": "Is it open to everyone?",
                        "answer": "Yes, Mayapur is a global center that welcomes people of all backgrounds and nationalities."
                },
                {
                        "question": "How to reach from Kolkata?",
                        "answer": "The most common way is by a 3-4 hour taxi ride or by taking a train to Nabadwip and then a short boat ride."
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
    'Parshuram Kund', 
    'parshuram-kund', 
    'Sacred Destination', 
    'ar', 
    'Located in the lower reaches of the Lohit river in Arunachal Pradesh, Parshuram Kund is a site of immense mythological importance. It is where the sage Parshuram is said to have washed away his sins after performing an extreme act of duty, making it a primary center for purification in the North-East.', 
    '850.5', 
    '320.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Waters of the Axe-Wielder and the Himalayan Purification', 
    'Parshuram Kund | Arunachal Pradesh, Lohit & Ancient Lore', 
    'Discover the spiritual power of Parshuram Kund. Explore the sacred Lohit river site, the legend of the axe-washing, and the profound energy of the Makar Sankranti pilgrimage.', 
    'Parshuram Kund, Arunachal Pradesh, Lohit River, Parshuram, Hindu Pilgrimage, Ancient Lore, Makar Sankranti', 
    '109', 
    '{
        "spiritualEssence": "Parshuram Kund is the manifestation of the divine as the supreme redeemer and the washer of deep karmic burdens. The energy here is raw, cold, and intensely liberating. It is the site where the heavy burden of duty (even violent duty) was finally released into the flow of nature. The vibration is one of ''Prayashchitta'' (Atonement) and the return to the state of innocence. As a site on the turquoise waters of the Lohit, the vibration is one of crystalline purity. A visit here is believed to grant the devotee the removal of the most stubborn mental and spiritual stains. The air is always vibrant with the sound of the rushing Himalayan waters and the silent, heavy energy of the surrounding mountains.",
        "longDescription": "Parshuram Kund is situated in the Mishmi plateau of Arunachal Pradesh. According to the Puranas, the sage Parshuram killed his mother on his father''s orders, but the axe got stuck to his hand as a sign of the sin. He traveled across India and finally arrived at this spot, where he dipped his hand into the Lohit river; the axe fell off, and his sin was washed away. The site is a major pilgrimage center, especially during Makar Sankranti, when tens of thousands of pilgrims brave the freezing temperatures to take a dip in the holy waters. The natural beauty of the site, with the crystal-clear Lohit river flowing through the dense forests and steep mountains, adds a deep, primeval sanctity to the experience.",
        "spiritualArchitecture": "The architecture of Parshuram Kund is minimal and respects the natural geological features of the river. There is a small shrine dedicated to the sage, but the primary ''architecture'' is the Kund (pool) itself, formed by the natural bend in the river. The government has recently expanded the facilities, including stone-paved ghats and steps to handle the massive crowds during Makar Sankranti. The use of local stone and the integration with the forest landscape reflect the tribal and Himalayan traditions of the region, where nature itself is seen as the grandest temple of the divine.",
        "vedicReferences": "Parshuram Kund is mentioned in the Kalika Purana and various local North-East Indian spiritual oral traditions.",
        "deepInsights": "The sticking of the axe represents the psychological weight of our actions. Parshuram Kund teaches that even the most extreme actions can be purified through sincere atonement and the grace of nature.",
        "ancientLore": "Lore tells that the river Lohit was named so (Lohit means red) because it was originally turned red by the blood of the kings defeated by Parshuram. Another legend says that the pool is bottomless and connects directly to the cosmic waters.",
        "keyRituals": [
                {
                        "name": "Makar Sankranti Snan",
                        "description": "The massive ritual bath in the freezing waters of the Lohit at the break of dawn."
                },
                {
                        "name": "Axe Worship",
                        "description": "Special prayers dedicated to the symbolic axe of Parshuram for protection and strength."
                },
                {
                        "name": "River Arati",
                        "description": "The offering of lamps to the Lohit river during the festival nights."
                },
                {
                        "name": "Mishmi Tribal Rituals",
                        "description": "The unique local traditions that blend with the Hindu pilgrimage at the site."
                }
        ],
        "highlights": [
                {
                        "name": "The Sacred Kund",
                        "description": "The natural pool in the Lohit river where the purification takes place."
                },
                {
                        "name": "Lohit River View",
                        "description": "The spectacular turquoise waters flowing through the Mishmi hills."
                },
                {
                        "name": "Parshuram Temple",
                        "description": "A small but significant shrine dedicated to the 6th avatar of Vishnu."
                },
                {
                        "name": "Makar Sankranti Fair",
                        "description": "The massive gathering of pilgrims and tribal communities from across India."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Makar Sankranti in mid-January).",
                "howToReach": "150km from Tinsukia (Assam) and 25km from Tezu. Well connected by road; regular buses and taxis run from Tinsukia.",
                "nearestAirport": "Dibrugarh Airport (Assam).",
                "nearestRailway": "Tinsukia Junction."
        },
        "tips": [
                "Carry warm clothing as the temperatures can be very low, especially during the January pilgrimage.",
                "Obtain the necessary Inner Line Permit (ILP) required for entering Arunachal Pradesh.",
                "Participate in the Makar Sankranti bath if you are physically fit; it is considered a life-changing experience."
        ],
        "faqs": [
                {
                        "question": "Why is it called Parshuram Kund?",
                        "answer": "It is named after the sage Parshuram, who is believed to have washed his blood-stained axe here."
                },
                {
                        "question": "How cold is the water?",
                        "answer": "In January, the water is near freezing, yet thousands take a ritual dip for its spiritual merit."
                },
                {
                        "question": "Is it safe for tourists?",
                        "answer": "Yes, it is a well-managed pilgrimage site, though the roads can be challenging during the monsoon."
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
    'Unakoti', 
    'unakoti', 
    'Sacred Destination', 
    'tr', 
    'The ''Lost Hill of a Million Gods,'' Unakoti is a magnificent rock-cut pilgrimage site in Tripura. It features massive stone bas-reliefs of Shiva and other deities, dating back to the 7th-9th centuries, hidden in a lush rainforest where stone and nature have merged into a spiritual masterpiece.', 
    '820.2', 
    '430.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Million Gods in the Heart of the Forest', 
    'Unakoti | Tripura, Rock-cut Shiva & Ancient Lore', 
    'Discover the mysterious rock-cut wonders of Unakoti. Explore the massive Shiva reliefs, the legend of the million gods, and the profound energy of the Tripura rainforest.', 
    'Unakoti, Tripura, Lord Shiva, Rock-cut, Hindu Pilgrimage, Ancient Lore, Rainforest, Bas-relief', 
    '110', 
    '{
        "spiritualEssence": "Unakoti is the manifestation of the divine as the silent and overwhelming presence of the sacred in nature. The energy here is mysterious, ancient, and intensely grounded. It is the site where the gods themselves were turned into stone, yet their vibration continues to breathe through the moss and the trees. The vibration is one of ''Siddha-Kshetra'' (a site of perfection) and the absolute scale of the divine manifestation. As a rock-cut site in a dense forest, it represents the indwelling spirit of the earth. A visit here is believed to grant the devotee the sense of awe and the realization of the infinite forms of the one truth. The air is always vibrant with the sound of the forest cicadas and the silent, stone-cold power of the 30-foot Shiva face.",
        "longDescription": "Unakoti, which means ''one less than a crore'' (ten million) in Bengali, is a site of absolute artistic and spiritual wonder. The hill is covered with massive rock-cut carvings and stone images. The central figure is the Unakotiswara Kal Bhairav, a 30-foot tall face of Shiva with a magnificent headdress. Beside it are massive figures of Durga standing on a lion and other celestial beings. The origin of these carvings is shrouded in mystery, with historical dates ranging from the 7th to the 12th century CE. The site is a major center for Shaiva worship in the North-East and is famous for the Ashokastami Mela, when thousands of pilgrims gather in the forest to worship the stone gods. Unakoti is a unique bridge between the tribal traditions of Tripura and the mainstream Puranic Shaivism.",
        "spiritualArchitecture": "The ''architecture'' of Unakoti is entirely rock-cut, where the hill itself has been transformed into a temple. The carvings are executed in a unique style that blends tribal aesthetics with classical Indian iconography. The 30-foot Shiva face is the highlight, featuring a third eye and a grand decorative headdress. There are numerous smaller figures of Ganesha, Vishnu, and local deities scattered across the rock face. The site also features natural waterfalls that flow over the carvings, creating a dynamic and living spiritual environment. The use of the vertical rock wall as a canvas creates a sense of scale that is rare in Indian temple architecture, where the mountain itself is the deity.",
        "vedicReferences": "Unakoti is celebrated in local Tripuri oral traditions and is considered a primary site for the study of the Shaivite influence in the tribal North-East.",
        "deepInsights": "The name ''one less than a crore'' represents the humility of the human effort in the face of the infinite. Unakoti teaches that the divine is everywhere, even in the most secluded corners of the natural world.",
        "ancientLore": "Lore tells that Lord Shiva was traveling to Kashi with a crore of gods; they stopped here for the night, but none could wake up at dawn except Shiva. He cursed them all to stay here as stone images, hence the name. Another legend says that a local master-sculptor named Kallu Kumara was asked to carve a crore of gods in a single night to make the place a second Kashi; he fell short by one, leaving the site as Unakoti.",
        "keyRituals": [
                {
                        "name": "Ashokastami Mela",
                        "description": "The grand annual festival held in the spring where thousands bathe in the natural pools and worship the stone reliefs."
                },
                {
                        "name": "Shiva Ratri Puja",
                        "description": "Night-long prayers and offerings performed at the base of the massive Shiva face."
                },
                {
                        "name": "Tribal Offerings",
                        "description": "Unique rituals performed by the local Tripuri communities, integrating their ancestral traditions with Shaiva worship."
                },
                {
                        "name": "River Bath",
                        "description": "Taking a ritual bath in the natural waterfalls and pools that surround the rock carvings."
                }
        ],
        "highlights": [
                {
                        "name": "Unakotiswara Kal Bhairav",
                        "description": "The massive 300-foot rock-cut face of Lord Shiva."
                },
                {
                        "name": "Ganesha Figures",
                        "description": "Unique rock-cut images of Ganesha, some with multiple trunks."
                },
                {
                        "name": "Natural Waterfalls",
                        "description": "The scenic cascades that flow over the ancient stone gods."
                },
                {
                        "name": "The Rainforest Trail",
                        "description": "The beautiful trek through the dense forest to reach the different carving sites."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Ashokastami in April).",
                "howToReach": "180km from Agartala and 8km from Kailashahar. Well connected by road; regular buses and taxis run from Agartala.",
                "nearestAirport": "Maharaja Bir Bikram Airport, Agartala.",
                "nearestRailway": "Kumarghat Railway Station."
        },
        "tips": [
                "Wear comfortable walking shoes as the site involves climbing many stone steps and forest paths.",
                "Visit in the morning to see the sunlight hit the massive stone face of Shiva; the effect is breathtaking.",
                "Carry water and light snacks, as the facilities within the forest site are limited."
        ],
        "faqs": [
                {
                        "question": "What does Unakoti mean?",
                        "answer": "It means ''one less than a crore'' (9,999,999) in Bengali."
                },
                {
                        "question": "How old are the carvings?",
                        "answer": "Historians date them to between the 7th and 9th centuries CE, though local lore says they are much older."
                },
                {
                        "question": "Is it a difficult trek?",
                        "answer": "It involves climbing many steps, but it is manageable for most people with average fitness; the path is well-defined."
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
    'Umananda (Peacock Island)', 
    'umananda', 
    'Sacred Destination', 
    'as', 
    'The smallest inhabited river island in the world, Umananda is located in the middle of the Brahmaputra river in Guwahati. It is home to an ancient Shiva temple and is a site of intense peace, representing the place where Shiva is said to have burned Kamadeva to ashes.', 
    '780.5', 
    '385.2', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1582512118780-6084042857d4?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Island of the Destroyer of Desire and the Great River', 
    'Umananda Temple | Assam, Brahmaputra & Ancient Lore', 
    'Discover the spiritual peace of Umananda. Explore the smallest river island, the legend of Kamadeva''s burning, and the profound energy of the Brahmaputra pilgrimage.', 
    'Umananda, Guwahati, Assam, Lord Shiva, Brahmaputra River, Hindu Pilgrimage, Ancient Lore, Peacock Island', 
    '111', 
    '{
        "spiritualEssence": "Umananda is the manifestation of the divine as the absolute stillness in the middle of the flow. The energy here is quiet, powerful, and intensely transformative. It is the site where the lower desires (Kamadeva) were consumed by the fire of the third eye. The vibration is one of ''Vairagya'' (Detachment) and the peace of the soul. As a tiny island in the massive Brahmaputra, it represents the small, secure island of the self amidst the turbulent river of life. A visit here is believed to grant the devotee the power to control their senses and the realization of the internal bliss (Ananda). The air is always vibrant with the sound of the rushing river and the silent, cool energy of the ancient stone temple.",
        "longDescription": "The Umananda temple was built in 1694 by King Gadadhar Singha of the Ahom dynasty. The island was named ''Bhasmachal'' (Hill of Ashes) because it is where Shiva burned Kamadeva with his third eye when he tried to interrupt his meditation. The British named it ''Peacock Island'' due to its unique shape. The temple is dedicated to Lord Shiva as Umananda (the one who gives joy to Uma). Despite being damaged in a massive earthquake in 1897, the temple was meticulously rebuilt and remains a primary center for Shaiva worship in Assam. The island is also home to the rare Golden Langur, which is considered a sacred resident. Reaching the island by a short ferry ride from the Guwahati ghats is an essential part of the spiritual experience, offering a unique perspective of the mighty Brahmaputra.",
        "spiritualArchitecture": "The temple is a beautiful example of the Ahom style of architecture, featuring an octagonal plan and a sloping roof. The architecture is sturdy and compact, designed to withstand the river floods and seismic activity. The interior features a small sanctum with a self-manifested Lingam. The complex includes several beautiful relief carvings depicting the various forms of Shiva and the stories of the Ahom kings. The use of local stone and brick, along with the integration with the rocky outcrops of the island, creates a sense of an organic and indestructible spiritual citadel in the middle of the river.",
        "vedicReferences": "Umananda is mentioned in the Kalika Purana as one of the primary sites for the worship of Shiva in the Pragjyotishpura (Assam) region.",
        "deepInsights": "The burning of Kamadeva represents the destruction of the ego and its distracting desires. Umananda teaches that true joy (Ananda) is found only when the fire of wisdom consumes the illusions of the mind.",
        "ancientLore": "Lore tells that the island was created by Lord Shiva to give a place of solitude to his consort Uma. Another legend says that the Golden Langurs on the island are the descendants of the celestial beings who came to watch Shiva''s meditation.",
        "keyRituals": [
                {
                        "name": "Maha Shivaratri",
                        "description": "The grand annual festival celebrated with night-long prayers and thousands of devotees traveling to the island by boat."
                },
                {
                        "name": "Brahmaputra Arati",
                        "description": "The ritual offering of lamps to the river from the island ghats."
                },
                {
                        "name": "Shravana Masam Puja",
                        "description": "Special rituals performed during the auspicious rainy season when the river is in full flow."
                },
                {
                        "name": "Deepavali",
                        "description": "The festival of lights where the entire island is illuminated, visible from the Guwahati shore."
                }
        ],
        "highlights": [
                {
                        "name": "Umananda Shiva Temple",
                        "description": "The ancient Ahom-style shrine at the peak of the island."
                },
                {
                        "name": "Peacock Island Landscape",
                        "description": "The unique and beautiful rock formations of the smallest inhabited river island."
                },
                {
                        "name": "Golden Langurs",
                        "description": "The rare and sacred monkeys that are unique to this island and the nearby forests."
                },
                {
                        "name": "Brahmaputra Ferry Ride",
                        "description": "The scenic and spiritual transit from the mainland to the island."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Accessible by a 10-minute ferry ride from Sukreshwar Ghat or Fancy Bazaar Ghat in Guwahati city.",
                "nearestAirport": "Lokpriya Gopinath Bordoloi International Airport, Guwahati.",
                "nearestRailway": "Guwahati Railway Station."
        },
        "tips": [
                "Take the government ferry for a safe and economical crossing to the island.",
                "Do not disturb or feed the Golden Langurs; they are protected and highly sensitive residents.",
                "Visit in the late afternoon to catch the sunset over the Brahmaputra; it is a truly meditative sight."
        ],
        "faqs": [
                {
                        "question": "How large is the island?",
                        "answer": "It is very small, often cited as the smallest inhabited river island in the world."
                },
                {
                        "question": "Who built the temple?",
                        "answer": "The original stone temple was built by the Ahom King Gadadhar Singha in the late 17th century."
                },
                {
                        "question": "Is it open during the monsoon?",
                        "answer": "Ferry services may be suspended during peak flood times for safety; it is best to check during the heavy rains."
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
    'Tawang Monastery', 
    'tawang-monastery', 
    'Sacred Destination', 
    'ar', 
    'Perched at an altitude of 10,000 feet in the mountains of Arunachal Pradesh, Tawang is the largest monastery in India and the second largest in the world. Known as ''Galden Namgey Lhatse'' (Celestial Paradise of Divine Victory), it is a site of immense peace and the spiritual heart of the Monpa people.', 
    '880.5', 
    '300.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Celestial Paradise of the Himalayan Snows', 
    'Tawang Monastery | Arunachal Pradesh, Buddhist Lore & Ancient Lore', 
    'Experience the profound serenity of Tawang. Discover the largest monastery in India, the 18-foot golden Buddha, and the legendary history of the Celestial Paradise.', 
    'Tawang, Arunachal Pradesh, Buddhist, Monastery, Dalai Lama, Hindu Pilgrimage, Ancient Lore, Himalayas', 
    '112', 
    '{
        "spiritualEssence": "Tawang is the manifestation of the divine as the supreme clarity and the silence of the high peaks. The energy here is vast, cold, and intensely compassionate. It is the site where the heart of the Himalayas was dedicated to the enlightenment of all beings. The vibration is one of ''Karuna'' (Compassion) and the absolute stillness of the meditative mind. As a monastery overlooking a deep valley, it represents the elevated vision of the soul. A visit here is believed to grant the devotee the same peace and clarity that the high lamas experience in their deep retreats. The air is always vibrant with the scent of the juniper incense and the low, rhythmic chanting of the monks.",
        "longDescription": "Tawang Monastery was founded by Merak Lama Lodre Gyatso in 1680, as per the wishes of the 5th Dalai Lama. It belongs to the Gelugpa (Yellow Hat) school of Tibetan Buddhism. The site was chosen by a horse that wandered onto this specific ridge, giving it the name Tawang (Ta means Horse, Wang means Chosen). The monastery is a massive fortified complex housing over 400 monks and an incredible collection of ancient manuscripts, including the Kangyur and Tengyur. The centerpiece is the Dukhang (Assembly Hall), which houses a magnificent 18-foot tall gilded statue of the Buddha. Tawang is also significant as the birthplace of the 6th Dalai Lama and remains a primary center for the preservation of Himalayan Buddhist culture and wisdom.",
        "spiritualArchitecture": "The architecture of Tawang is a spectacular example of a Buddhist fortified monastery (Dzong). It features massive white-washed stone walls and red-painted wooden balconies. The Dukhang is the most architecturally significant building, featuring three stories and a grand entrance with a curtain. The interiors are covered with vibrant frescoes depicting various Buddhas and the Wheel of Life. The 18-foot Buddha is a masterpiece of gilded sculpture. The complex is designed as a self-contained town, with narrow stone-paved alleys, residential quarters, and a massive library. The use of wood, stone, and the vibrant colors of the Tibetan tradition creates a sense of a royal palace of the spirit.",
        "vedicReferences": "Tawang is celebrated in the Buddhist sthalapuranas and is considered a primary site for the study of the Kalachakra and other high Tantric traditions.",
        "deepInsights": "The choosing of the site by a horse represents the role of intuition and nature in the spiritual life. Tawang teaches that the highest truth is found in the heights of compassion and the depths of silence.",
        "ancientLore": "Lore tells that the Merak Lama was unable to find a site until he meditated in a cave and his horse disappeared, only to be found standing on this magnificent ridge. Another legend says that the monastery is protected by the spirit of the mountain itself.",
        "keyRituals": [
                {
                        "name": "Torgya Festival",
                        "description": "The grand annual festival celebrated in the 11th month of the lunar calendar, featuring the famous masked Chham dances."
                },
                {
                        "name": "Daily Puja",
                        "description": "The morning and evening assembly where monks chant the ancient sutras to the sound of long horns and drums."
                },
                {
                        "name": "Losar",
                        "description": "The Tibetan New Year, celebrated with massive prayers and cultural festivities for 15 days."
                },
                {
                        "name": "Library Recitation",
                        "description": "The periodic reading of the ancient manuscripts to bless the monastery and the world."
                }
        ],
        "highlights": [
                {
                        "name": "Dukhang (Assembly Hall)",
                        "description": "The magnificent three-storied hall housing the 18-foot gilded Buddha."
                },
                {
                        "name": "Monastic Library",
                        "description": "Containing thousands of ancient and rare Buddhist manuscripts."
                },
                {
                        "name": "Parkhang (Printing Press)",
                        "description": "Where traditional wood-block printing of sacred texts is still performed."
                },
                {
                        "name": "Tawang Valley View",
                        "description": "The spectacular panorama of the Himalayas from the monastery ridge."
                }
        ],
        "travelInfo": {
                "bestTime": "March to June and September to October.",
                "howToReach": "13-hour drive from Tezpur (Assam) or Bomdila. The roads are high-altitude and require an Inner Line Permit (ILP).",
                "nearestAirport": "Tezpur Airport / Guwahati Airport.",
                "nearestRailway": "Rangapara Junction (Tezpur) / Guwahati Junction."
        },
        "tips": [
                "Allow time for acclimatization, as Tawang is located at a high altitude (10,000 feet).",
                "The journey to Tawang via the Sela Pass (13,700 feet) is one of the most beautiful drives in the world.",
                "Dress respectfully and follow the silence and protocols of the Dukhang during the prayer sessions."
        ],
        "faqs": [
                {
                        "question": "How large is the monastery?",
                        "answer": "It is the largest in India and the second largest in the world, with over 60 buildings in the complex."
                },
                {
                        "question": "What is the meaning of ''Tawang''?",
                        "answer": "It means ''Chosen by the Horse'' (Ta-Wang)."
                },
                {
                        "question": "Is it open to tourists?",
                        "answer": "Yes, but you must obtain an Inner Line Permit (ILP) or Protected Area Permit (PAP) to enter the region."
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
    'Tuljapur', 
    'tuljapur', 
    'Sacred Destination', 
    'mh', 
    'The abode of Goddess Bhavani, Tuljapur is one of the three and a half Shakti Peeths of Maharashtra. It is a site of immense power and royal history, where the Goddess is said to have gifted a sword to Chhatrapati Shivaji Maharaj to establish a righteous empire.', 
    '320.2', 
    '630.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of Valor and the Sword of Dharma', 
    'Tuljapur Bhavani Temple | Maharashtra, Shivaji & Ancient Lore', 
    'Experience the powerful energy of Tuljapur. Discover the Bhavani temple, the legend of the divine sword, and the profound royal heritage of the Maratha empire.', 
    'Tuljapur, Maharashtra, Goddess Bhavani, Shivaji Maharaj, Shakti Peeth, Hindu Pilgrimage, Ancient Lore, Valor', 
    '113', 
    '{
        "spiritualEssence": "Tuljapur is the manifestation of the divine as the supreme valor and the protector of the righteous. The energy here is fiery, royal, and intensely empowering. It is the site where the motherly grace of the Goddess is channeled into the strength of the warrior. The vibration is one of ''Kshatradharma'' (the duty of the warrior) and the absolute protection of the devotee. As the family deity of the Marathas, the vibration is one of cultural pride and spiritual sovereignty. A visit here is believed to grant the devotee the courage to fight for truth and the victory over all external and internal enemies. The air is always vibrant with the scent of the turmeric (Bhandara) and the constant, rhythmic sound of the nagaras.",
        "longDescription": "The Bhavani temple in Tuljapur is situated in the Osmanabad district. It is one of the most important pilgrimage sites in Maharashtra, deeply linked to the life of Chhatrapati Shivaji Maharaj, who was a staunch devotee. The idol is a three-foot tall image of the eight-armed Goddess Bhavani, made of black stone (Shaligram). Unlike most idols, this is a ''Chala'' idol, meaning it is not fixed and can be moved. The temple is famous for its unique layout, where the entrance is at a higher level and the main shrine is located in a deep courtyard. The town is a major center for the Gondhal folk art, where traditional singers perform the stories of the Goddess. Tuljapur represents the heart of the Maratha spirit, where spirituality and political freedom were seen as two sides of the same coin.",
        "spiritualArchitecture": "The temple is built in a mix of Maratha and later Hemadpanthi styles. It features two grand gopurams (Kallola Tirth and Gomukh Tirth) and a massive courtyard. The main sanctum is a sturdy stone structure with silver-plated doors. A unique feature is the ''Kallola Tirth,'' a large sacred tank located at the entrance where the waters of all holy rivers are said to have gathered. The architecture is designed for security and grandeur, with high stone walls and several beautiful mandapams for rituals. The use of black basalt stone and the presence of ancient inscriptions reflect the long historical patronage of various dynasties, especially the Bhonsle family.",
        "vedicReferences": "Tuljapur is celebrated in the Skanda Purana as the spot where the Goddess defeated the demon Matanga.",
        "deepInsights": "The gift of the sword to Shivaji represents the divine empowerment of the human will for a righteous cause. Tuljapur teaches that true power is the one that is used for the service of Dharma.",
        "ancientLore": "Lore tells that the Goddess personally appeared to Shivaji and gave him the ''Bhavani Talwar'' (sword) to liberate the land. Another legend says that the Goddess can leave the sanctum at night to walk the surrounding hills, and her footsteps can still be seen in the rocks.",
        "keyRituals": [
                {
                        "name": "Bhandara Offering",
                        "description": "The ritual throwing of turmeric powder onto the deity and the temple walls, symbolizing abundance and protection."
                },
                {
                        "name": "Gondhal",
                        "description": "The traditional folk performance by devotees, singing the praises and stories of Goddess Bhavani."
                },
                {
                        "name": "Prakshal Puja",
                        "description": "The ritual bathing of the deity during the auspicious transition of the seasons."
                },
                {
                        "name": "Navratri Mahotsav",
                        "description": "The grand 10-day festival where the Goddess is adorned in various forms and taken out in spectacular processions."
                }
        ],
        "highlights": [
                {
                        "name": "Bhavani Idol",
                        "description": "The three-foot tall black stone image of the Mother of Valor."
                },
                {
                        "name": "Kallola Tirth",
                        "description": "The massive sacred tank at the entrance of the temple complex."
                },
                {
                        "name": "The Silver Door",
                        "description": "The grand entrance to the sanctum, gifted by royal patrons."
                },
                {
                        "name": "Gomukh Tirth",
                        "description": "The natural spring where water flows out of a stone cow''s mouth into a pool."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Navratri).",
                "howToReach": "45km from Solapur and 25km from Osmanabad. Well connected by road; regular buses run from Solapur.",
                "nearestAirport": "Pune Airport / Aurangabad Airport.",
                "nearestRailway": "Solapur Junction."
        },
        "tips": [
                "Be prepared for large crowds, especially on Tuesdays, Fridays, and during Navratri.",
                "Follow the tradition of applying the Bhandara (turmeric) to your forehead; it is considered the Goddess''s protection.",
                "Visit the nearby Kallola Tirth and perform the ritual sprinkling of water for purification."
        ],
        "faqs": [
                {
                        "question": "Who was the most famous devotee?",
                        "answer": "Chhatrapati Shivaji Maharaj, the founder of the Maratha Empire, was the most celebrated devotee of Tulja Bhavani."
                },
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the three and a half (Saade Teen) Shakti Peeths of Maharashtra."
                },
                {
                        "question": "What is unique about the idol?",
                        "answer": "It is a ''Chala'' (moveable) idol, which is rare for such a significant shrine."
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
    'Kolhapur', 
    'kolhapur', 
    'Spiritual City', 
    'mh', 
    'The abode of Goddess Mahalakshmi (Ambaba), Kolhapur is one of the most powerful Shakti Peeths in India. Known as the ''Dakshina Kashi,'' it is a site where the Lord Vishnu is said to reside as the Goddess, offering eternal liberation and material prosperity to all.', 
    '300.5', 
    '670.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Mother of the Universe and the City of Golden Grace', 
    'Kolhapur Mahalakshmi | Maharashtra, Ambabai & Ancient Lore', 
    'Discover the spiritual grandeur of Kolhapur Mahalakshmi. Explore the ancient stone temple, the mystical Kirnotsav, and the profound energy of the Dakshina Kashi.', 
    'Kolhapur, Maharashtra, Mahalakshmi, Ambabai, Shakti Peeth, Hindu Pilgrimage, Ancient Lore, Kirnotsav', 
    '114', 
    '{
        "spiritualEssence": "Kolhapur is the manifestation of the divine as the supreme abundance and the mistress of the manifest universe. The energy here is regal, maternal, and intensely powerful. It is the site where the soul finds the perfect balance between material fulfillment and spiritual liberation. The vibration is one of ''Aishvarya'' (Splendor) and the absolute grace of the Mother. As the Dakshina Kashi, the vibration is one of ancient, concentrated spiritual power. A visit here is believed to grant the devotee the same merit as Kashi, along with the blessing of prosperity. The air is always vibrant with the scent of the incense and the silent, heavy energy of the massive black basalt stone carvings.",
        "longDescription": "The Mahalakshmi temple in Kolhapur is an architectural and spiritual marvel dating back to the 7th century CE. The main deity is Goddess Mahalakshmi, also known as Ambabai, a three-foot tall monolithic idol holding a shield, a mace, and a fruit. The temple is famous for the ''Kirnotsav'' (Festival of Rays), where for three days twice a year, the setting sun''s rays travel through the temple gates to fall directly on the deity''s feet, then chest, and finally the face. This astronomical precision is a testament to the ancient architects. Kolhapur is also a major center for Maratha culture, famous for its wrestling traditions, spicy cuisine, and the world-famous Kolhapuri footwear, all of which are seen as part of the Goddess''s vibrant manifest world.",
        "spiritualArchitecture": "The temple is a masterpiece of the Hemadpanthi style, built without any mortar using interlocking stones. The architecture is characterized by its star-shaped layout and the incredible density of its relief carvings. The temple features a massive stone tower (Shikhara) and several grand mandapams. A unique feature is the placement of the main deity facing west, which allows for the solar Kirnotsav. The use of black basalt stone and the presence of numerous smaller shrines for various deities create an atmosphere of a celestial palace. The temple is surrounded by massive stone walls and has four grand entrance gates, each representing a different aspect of the divine power.",
        "vedicReferences": "Kolhapur is mentioned in the Devi Gita and various Puranas as one of the six places where one can obtain both worldly pleasures and liberation.",
        "deepInsights": "The Kirnotsav represents the alignment of the physical sun with the spiritual heart. Kolhapur teaches that the divine mother is the source of all light and the goal of all journeys.",
        "ancientLore": "Lore tells that Goddess Mahalakshmi left Vaikuntha after a disagreement with Vishnu and settled in Kolhapur, making it her eternal home. Another legend says that the city is built on the body of the demon Kolhasura, who asked to be redeemed by the Goddess.",
        "keyRituals": [
                {
                        "name": "Kirnotsav",
                        "description": "The rare bi-annual event where the sun''s rays worship the deity directly through a specific architectural alignment."
                },
                {
                        "name": "Palakhi Sohala",
                        "description": "The grand procession of the Goddess in a silver palanquin every Friday and on auspicious days."
                },
                {
                        "name": "Abhishekam",
                        "description": "The ritual bathing of the black stone idol with five sacred substances every morning."
                },
                {
                        "name": "Deepotsav",
                        "description": "The festival of lamps where the entire star-shaped complex is illuminated with thousands of oil lamps."
                }
        ],
        "highlights": [
                {
                        "name": "Mahalakshmi Idol",
                        "description": "The ancient three-foot tall black stone image of the Mother Goddess."
                },
                {
                        "name": "Hemadpanthi Architecture",
                        "description": "The mortar-less stone construction that has stood for over a millennium."
                },
                {
                        "name": "Kirnotsav Windows",
                        "description": "The specific architectural openings designed for the solar alignment."
                },
                {
                        "name": "Rankala Lake",
                        "description": "A beautiful and sacred lake located nearby, associated with the temple''s history."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Navratri and Kirnotsav).",
                "howToReach": "Well connected by road and rail; Kolhapur is a major city on the Pune-Bangalore highway.",
                "nearestAirport": "Kolhapur Airport / Pune Airport.",
                "nearestRailway": "Chhatrapati Shahu Maharaj Terminus (Kolhapur)."
        },
        "tips": [
                "Check the dates for Kirnotsav (usually in January and November) if you wish to witness the solar phenomenon.",
                "The temple has a strict but efficient queue system; use the online booking if available.",
                "Explore the local market around the temple for authentic Kolhapuri sarees and footwear."
        ],
        "faqs": [
                {
                        "question": "Why is it called Dakshina Kashi?",
                        "answer": "It is believed that those who cannot visit Varanasi (Kashi) can obtain the same merit by visiting Kolhapur."
                },
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the most prominent Shakti Peeths in India."
                },
                {
                        "question": "What is the Kirnotsav?",
                        "answer": "It is a natural phenomenon where the setting sun''s rays light up the idol of the Goddess for three consecutive days."
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
    'Vindhyachal', 
    'vindhyachal', 
    'Sacred Destination', 
    'up', 
    'The only Shakti Peeth located on the banks of the Ganges, Vindhyachal is home to Goddess Vindhyavasini. It is a site of immense antiquity and power, representing the midpoint of India and the abode of the Goddess who took birth as the sister of Krishna.', 
    '490.2', 
    '330.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Goddess of the Midpoint and the Sister of the Lord', 
    'Vindhyavasini Temple | Uttar Pradesh, Mirzapur & Ancient Lore', 
    'Experience the profound power of Vindhyachal. Discover the Vindhyavasini temple, the Trikona Parikrama, and the profound energy of the Ganges pilgrimage.', 
    'Vindhyachal, Uttar Pradesh, Vindhyavasini, Shakti Peeth, Hindu Pilgrimage, Ancient Lore, Mirzapur, Ganges', 
    '115', 
    '{
        "spiritualEssence": "Vindhyachal is the manifestation of the divine as the supreme stability and the center of the earth''s energy. The energy here is raw, ancient, and intensely focused on the protection of the soul. It is the site where the Goddess chose to reside after her miraculous escape from the prison of Kansa. The vibration is one of ''Yoga-Maya'' (the divine power of illusion and truth). As a site on the Ganges where the mountains meet the river, it represents the union of the heights and the depths. A visit here is believed to grant the devotee the same protection that the Goddess gave to the child Krishna. The air is always vibrant with the scent of the river silt and the constant, high-vibrational chanting of the Durga Saptashati.",
        "longDescription": "Vindhyachal, located near Mirzapur, is a major pilgrimage center in North India. The main deity is Goddess Vindhyavasini, who is worshipped as the supreme form of Shakti. According to the Puranas, she is the same Goddess who was born as the sister of Krishna and escaped from Kansa''s hands, declaring his death. Vindhyachal is unique for its ''Trikona Parikrama'' (Triangle Pilgrimage), where devotees visit three temples: Vindhyavasini (Sattva), Kali Khoh (Tamas), and Ashtabhuja (Rajas), representing the three Gunas of nature. The temple is situated on a hill right on the banks of the Ganges, creating a spectacular spiritual environment. The site is a primary center for Tantric and Vedic worship, attracting thousands of seekers who wish to awaken their inner power.",
        "spiritualArchitecture": "The temple is a sturdy and ancient stone structure built in the North Indian style. The main sanctum is a small, intense chamber where the Goddess is worshipped in her self-manifested stone form. The architecture is characterized by its massive stone walls and the use of the local red sandstone. A unique feature is the placement of the temple on a high platform overlooking the Ganges. The complex has recently been expanded with the ''Vindhya Corridor,'' a grand stone promenade that connects the temple to the river and provides modern facilities for the massive crowds. The architecture of the Kali Khoh and Ashtabhuja temples is more rugged, being integrated into the natural caves of the Vindhya range.",
        "vedicReferences": "Vindhyachal is mentioned in the Mahabharata and the Devi Mahatmya as the supreme abode of the Goddess who protects the universe.",
        "deepInsights": "The Trikona Parikrama represents the balance of the three forces of nature—creation, preservation, and destruction. Vindhyachal teaches that the divine mother resides in every aspect of the manifest world.",
        "ancientLore": "Lore tells that the mountain Vindhya once grew so high that it blocked the sun; it bowed down only when the Goddess took residence here. Another legend says that the Goddess personally appeared to the sage Agastya to grant him the wisdom to cross the mountains.",
        "keyRituals": [
                {
                        "name": "Trikona Parikrama",
                        "description": "The ritual of visiting the three major temples (Vindhyavasini, Kali Khoh, Ashtabhuja) to complete the spiritual triangle."
                },
                {
                        "name": "Navratri Mahotsav",
                        "description": "The grand 9-day celebration where millions gather for special prayers and night-long rituals."
                },
                {
                        "name": "Ganga Snan",
                        "description": "Taking a ritual bath in the sacred river at the temple ghats before starting the pilgrimage."
                },
                {
                        "name": "Durga Saptashati Path",
                        "description": "The melodic recitation of the 700 verses of the Goddess''s glory in the temple courtyard."
                }
        ],
        "highlights": [
                {
                        "name": "Vindhyavasini Shrine",
                        "description": "The main temple of the Goddess of the Midpoint."
                },
                {
                        "name": "Kali Khoh Temple",
                        "description": "The ancient cave temple dedicated to Goddess Kali, representing the power of destruction."
                },
                {
                        "name": "Ashtabhuja Temple",
                        "description": "The hilltop temple of the eight-armed Goddess, representing the power of creation."
                },
                {
                        "name": "Vindhya Corridor",
                        "description": "The grand new stone promenade connecting the temple to the Ganges."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (especially during Navratri).",
                "howToReach": "8km from Mirzapur and 70km from Varanasi. Well connected by road and rail; regular taxis run from Varanasi.",
                "nearestAirport": "Lal Bahadur Shastri International Airport, Varanasi.",
                "nearestRailway": "Vindhyachal Railway Station / Mirzapur Junction."
        },
        "tips": [
                "Hire a local e-rickshaw or taxi to complete the Trikona Parikrama; it takes about 3-4 hours to visit all three sites.",
                "Participate in the early morning Aarti; the energy of the temple and the river together is unique.",
                "Dress modestly and follow the protocols of the cave temples, especially at Kali Khoh."
        ],
        "faqs": [
                {
                        "question": "Who is Vindhyavasini?",
                        "answer": "She is the form of the Goddess who took birth as the daughter of Yashoda and Nanda to protect the child Krishna."
                },
                {
                        "question": "What is the Trikona Parikrama?",
                        "answer": "It is a pilgrimage that covers three temples representing the three Gunas (qualities) of nature."
                },
                {
                        "question": "How far from Varanasi?",
                        "answer": "It is about 70 kilometers and can be reached in 1.5 to 2 hours by road."
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
    'Chitrakoot', 
    'chitrakoot', 
    'Spiritual City', 
    'mp-up', 
    'The ''Hill of Many Wonders,'' Chitrakoot is where Lord Rama, Sita, and Lakshmana spent 11 years of their 14-year exile. Located on the banks of the Mandakini river, it is a site of immense serenity and the primary center for the worship of Rama in his forest form.', 
    '470.5', 
    '350.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Forest of Exile and the Hill of Eternal Rama', 
    'Chitrakoot | Mandakini River, Rama Lore & Ancient Lore', 
    'Discover the spiritual serenity of Chitrakoot. Explore the Kamadgiri hill, the sacred Mandakini ghats, and the profound energy of the forest where the Lord resided.', 
    'Chitrakoot, Madhya Pradesh, Uttar Pradesh, Lord Rama, Mandakini River, Hindu Pilgrimage, Ancient Lore, Exile', 
    '116', 
    '{
        "spiritualEssence": "Chitrakoot is the manifestation of the divine as the supreme patience and the beauty of a simple, spiritual life. The energy here is calm, forest-like, and intensely peaceful. It is the site where the absolute reality lived as a humble forest dweller. The vibration is one of ''Maryada'' (Righteousness) and the absolute surrender to the divine will. As a city on the Mandakini river, the vibration is one of flow and the purification of the heart. A visit here is believed to grant the devotee the same strength and patience that Rama and Sita displayed during their exile. The air is always vibrant with the scent of the wild tulsi and the silent, heavy energy of the sacred Kamadgiri hill.",
        "longDescription": "Chitrakoot is spread across the border of Madhya Pradesh and Uttar Pradesh. It is mentioned in the Ramayana as the place where the sages Valmiki and Atri lived. The heart of the city is the Kamadgiri hill, which is believed to be the Lord himself in the form of a hill. Devotees perform a 5km circumambulation (Parikrama) of this hill. The city is also famous for the Ram Ghat on the Mandakini river, where the saint Tulsidas is said to have had a vision of Rama and Lakshmana. Chitrakoot is a site where every rock and stream is linked to a story from the Ramayana, creating a living spiritual landscape that has remained largely unchanged for millennia.",
        "spiritualArchitecture": "The architecture of Chitrakoot is characterized by its simple and sturdy stone temples and extensive river ghats. The Kamadgiri Parikrama path features hundreds of small shrines and residential mutts. The Bharat Milap temple is a small but significant stone structure marking the spot where Bharat met Rama to ask him to return to Ayodhya. The architecture is designed to integrate with the natural forest and the hill, using local red sandstone. The Mandakini ghats are beautifully paved and feature several open platforms for the evening Aarti. The use of traditional North Indian styles with the influence of the local Bundelkhandi culture reflects the rugged and resilient spirit of the region.",
        "vedicReferences": "Chitrakoot is a primary site in the Ramayana and is celebrated in the works of Tulsidas as the supreme forest abode of the Lord.",
        "deepInsights": "The exile in the forest represents the withdrawal of the senses from the material world to focus on the spiritual. Chitrakoot teaches that the divine can be found in the simplest and most natural surroundings.",
        "ancientLore": "Lore tells that Bharat brought the waters of all holy rivers to Chitrakoot to crown Rama, and when Rama refused to return, Bharat poured the water into a well known as Bharat Koop. Another legend says that the river Mandakini was created by the penance of the sage Anusuya.",
        "keyRituals": [
                {
                        "name": "Kamadgiri Parikrama",
                        "description": "The 5km ritual walk around the sacred hill, often performed with bare feet."
                },
                {
                        "name": "Deep Daan at Ram Ghat",
                        "description": "The ritual offering of lamps into the Mandakini river during the evening Aarti."
                },
                {
                        "name": "Hanuman Dhara",
                        "description": "Visiting the hilltop shrine where a natural spring falls on the idol of Hanuman, said to have cooled him after the burning of Lanka."
                },
                {
                        "name": "Bharat Koop Snan",
                        "description": "Taking a ritual bath in the ancient well believed to contain the waters of all sacred rivers."
                }
        ],
        "highlights": [
                {
                        "name": "Kamadgiri Hill",
                        "description": "The sacred hill believed to be the wish-fulfilling form of Lord Rama."
                },
                {
                        "name": "Ram Ghat",
                        "description": "The main riverfront where Tulsidas had his divine vision."
                },
                {
                        "name": "Janaki Kund",
                        "description": "The beautiful and serene pool where Goddess Sita is said to have bathed."
                },
                {
                        "name": "Gupt Godavari",
                        "description": "The mysterious underground river and cave system where the Lord held court."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "Well connected by road and rail; Chitrakoot Dham (Karwi) is the nearest railway station. Regular buses run from Allahabad and Satna.",
                "nearestAirport": "Chitrakoot Airport (local) / Prayagraj Airport.",
                "nearestRailway": "Chitrakoot Dham Karwi."
        },
        "tips": [
                "The Kamadgiri Parikrama is best done in the early morning when the air is cool and the birds are active.",
                "Hire a local guide to find the specific spots mentioned in the Ramayana, especially the Gupt Godavari caves.",
                "Maintain the sanctity of the forest and the river; Chitrakoot is as much a nature retreat as a pilgrimage."
        ],
        "faqs": [
                {
                        "question": "How long did Rama stay here?",
                        "answer": "It is believed that the Lord spent approximately 11 and a half years of his 14-year exile in Chitrakoot."
                },
                {
                        "question": "What is Kamadgiri?",
                        "answer": "It is the sacred hill of Chitrakoot, whose name means ''the hill which fulfills all desires''."
                },
                {
                        "question": "Is it in MP or UP?",
                        "answer": "It is located right on the border, with parts of the spiritual city in both Madhya Pradesh and Uttar Pradesh."
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
    'Awantipora', 
    'awantipora', 
    'Sacred Destination', 
    'jk', 
    'The ruins of the grand capital of King Awantivarman, Awantipora is home to the massive 9th-century temples of Avantiswami and Avantiswara. Located on the banks of the Jhelum, it is a site where the grandeur of the ancient Kashmiri empire remains frozen in spectacular stone ruins.', 
    '420.2', 
    '150.5', 
    '12', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Silent Echoes of the Sun Empire and the Jhelum', 
    'Awantipora Ruins | Kashmir, Awantivarman & Ancient Lore', 
    'Discover the archaeological majesty of Awantipora. Explore the 9th-century Shiva and Vishnu temples, the legend of King Awantivarman, and the profound legacy of the Kashmiri empire.', 
    'Awantipora, Kashmir, Awantivarman, Lord Shiva, Lord Vishnu, Hindu Pilgrimage, Ancient Lore, Jhelum', 
    '117', 
    '{
        "spiritualEssence": "Awantipora is the manifestation of the divine as the eternal presence amidst the ruins of time. The energy here is quiet, melancholy, and intensely noble. It is the site where the material greatness of an empire was surrendered to the elements. The vibration is one of ''Kala'' (Time) and the transience of all things. As a site on the Jhelum, the vibration is one of memory and the continuity of the spirit. A visit here is believed to grant the devotee the perspective on the ephemeral nature of life and the permanence of the divine. The air is always vibrant with the scent of the Kashmiri pines and the silent, heavy energy of the massive stone pillars that once reached the heavens.",
        "longDescription": "Awantipora, located on the Srinagar-Jammu highway, was the capital of the Utpala dynasty in the 9th century CE. King Awantivarman built two grand temples here: Avantiswara dedicated to Shiva and Avantiswami dedicated to Vishnu. These temples were once the absolute peak of Kashmiri architecture, featuring massive stone blocks and intricate carvings that show a blend of Gandharan, Greek, and Indian styles. The temples were buried for centuries under the silt of the Jhelum floods before being excavated by archaeologists in the early 20th century. Today, the ruins stand as a testament to the lost golden age of Kashmir, attracting seekers who wish to connect with the profound historical and spiritual roots of the valley.",
        "spiritualArchitecture": "The architecture of Awantipora is characterized by its massive scale and its unique blend of cultural influences. The temples are built on large stone platforms (Jagati) and feature a central shrine surrounded by four smaller shrines. The use of enormous limestone blocks, held together by iron clamps, reflects the advanced engineering of the 9th century. The carvings are noted for their dynamic figures and the unique Gandharan influence in the drapery and the facial features. The Avantiswami temple features a magnificent colonnaded courtyard with over 60 smaller shrines. The architecture is designed to create a sense of imperial spiritual power, where the King''s devotion was as grand as his empire.",
        "vedicReferences": "Awantipora is celebrated in the Rajatarangini of Kalhana as a city that rivaled the heavens in its beauty and spiritual merit.",
        "deepInsights": "The ruins represent the return of human ambition to the silence of the divine. Awantipora teaches that while the form may crumble, the energy of the devotion that built it remains in the land.",
        "ancientLore": "Lore tells that King Awantivarman was so devoted to the Lord that he personally carried the stone blocks for the foundation. Another legend says that the temples were protected by the mountain spirits when the invaders tried to destroy them.",
        "keyRituals": [
                {
                        "name": "Silent Meditation",
                        "description": "The modern ritual of connecting with the ancient energy through silence amidst the stone ruins."
                },
                {
                        "name": "Jhelum Snan",
                        "description": "Taking a ritual bath in the sacred river that flows just behind the temple complex."
                },
                {
                        "name": "Archaeological Prayer",
                        "description": "Visiting the site with the intent of honoring the ancestors and the lost wisdom of the valley."
                },
                {
                        "name": "Spring Equinox Gathering",
                        "description": "Occasional gatherings of scholars and seekers to witness the solar alignment with the ancient ruins."
                }
        ],
        "highlights": [
                {
                        "name": "Avantiswami Temple",
                        "description": "The massive Vishnu temple ruins with its spectacular colonnaded courtyard."
                },
                {
                        "name": "Avantiswara Temple",
                        "description": "The Shiva temple ruins located just a kilometer away, known for its grand proportions."
                },
                {
                        "name": "The Jhelum Viewpoint",
                        "description": "The scenic riverfront behind the temples, where the ancient city once stood."
                },
                {
                        "name": "Intricate Relief Carvings",
                        "description": "The remaining stone fragments depicting celestial dancers and the King himself."
                }
        ],
        "travelInfo": {
                "bestTime": "April to October.",
                "howToReach": "30km from Srinagar on the Srinagar-Pahalgam road. Well connected by road; regular taxis and buses run from Srinagar.",
                "nearestAirport": "Srinagar Airport.",
                "nearestRailway": "Srinagar Railway Station (local) / Jammu Tawi (main)."
        },
        "tips": [
                "The site is right on the highway; it is an easy and essential stop while traveling to Pahalgam or Anantnag.",
                "Hire a local guide to understand the specific architectural details and the history of the Utpala dynasty.",
                "The site is managed by the ASI; respect the rules of the archaeological monument."
        ],
        "faqs": [
                {
                        "question": "Who was Awantivarman?",
                        "answer": "He was the 9th-century King of Kashmir who founded the Utpala dynasty and built this grand capital city."
                },
                {
                        "question": "Why are they in ruins?",
                        "answer": "They were damaged by earthquakes and floods, and were largely buried under silt for centuries before being rediscovered."
                },
                {
                        "question": "Is it a functioning temple?",
                        "answer": "No, it is an archaeological site, though it remains a site of great spiritual and historical pilgrimage."
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
