-- RESTORATION PART 5
INSERT INTO "public"."spiritual_locations" (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Golu Devta (Ghorakhal)', 
    'golu-devta-ghorakhal-temple', 
    'Sacred Destination', 
    'uk', 
    'The "Guardian of the Lake District", the Ghorakhal Golu Devta Temple is a high-altitude shrine near Bhowali. It is a site of absolute folk authority and justice, being the most visited shrine of Golu Devta near the popular lake district of Nainital, representing the absolute faith of the Kumaon people in the divine judge and the profound energy of the thousand-bell tradition.', 
    '500.2', 
    '260.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Justice God of the Nainital Hills and the Ridge of the Ringing Bells', 
    'Golu Devta Ghorakhal Temple | Uttarakhand, Folk Justice & Ancient Lore', 
    'Experience the profound energy of Golu Devta Ghorakhal. Discover the mountain-top justice shrine, the legend of the thousand bells, and the profound energy of the Nainital pilgrimage.', 
    'Golu Devta, Ghorakhal, Nainital, Bhowali, Uttarakhand, God of Justice, Hindu Pilgrimage, Ancient Lore, Bells Temple', 
    '253', 
    '{
        "spiritualEssence": "Ghorakhal Golu Devta is the manifestation of the divine as the supreme witness and the absolute accessibility of the spiritual law in the middle hills. The energy here is urgent, resonant, and intensely personal. It is the site where the faith of the hill-folk becomes a tangible sound. The vibration is one of ''Pratyaksha'' (Direct Perception) and the absolute confidence in the divine hearing. As a temple perched on a ridge overlooking the Bhimtal and Sat-tal valleys, it represents the spiritual overseer of the lake region. A visit here is believed to grant the devotee the absolute clarity in the decision-making and the blessing of the swift justice. The air is always vibrant with the constant, rhythmic ringing of the bells and the silent, heavy energy of the thousands of the fulfilled vows.",
        "longDescription": "Ghorakhal (meaning ''pond for horses'') is famous for its Golu Devta temple and the nearby Sainik School. Like the Chittai temple, this shrine is characterized by thousands of brass bells offered by the devotees. It is particularly popular because of its proximity to Nainital and its location on a scenic ridge. Golu Devta is worshipped here as a king who never refused a plea for the justice. The temple atmosphere is one of intense focus and gratitude. The deity is often seen as a protective elder brother of the Kumaon people. The site is a critical anchor for the local culture, especially during the festivals and the local fairs. It is a site where the highest level of the ridge-peak geography and the most practical human petition are perfectly unified.",
        "spiritualArchitecture": "The architecture of the Ghorakhal temple is a spectacular display of the Kumaoni ridge-shrine style with a heavy emphasis on the horizontal platforms and the massive bell-racks. The temple features a simple central shrine, but its defining architectural feature is the series of long, covered walkways filled with thousands of hanging bells. A unique feature is the presence of the open viewpoints that look down into the deep valleys of the lake district. The architecture is designed to facilitate the ritual of hanging the bell and reading the petitions. The use of the simple stone and the vibrant red and yellow flags create a sense of a spiritual home that is anchored to the mountain ridge. The complex includes several small rooms for the priests and the pilgrims.",
        "vedicReferences": "Ghorakhal is celebrated in the local oral epics as the supreme site where the Golu Devta personally rested his horse while surveying the justice of the Northern hills.",
        "deepInsights": "The ringing of the bell represents the truth that the soul must announce its presence to the divine. Ghorakhal teaches that the highest justice is the one that is visible and accessible to all.",
        "ancientLore": "Lore tells that the deity personally guards the Sainik School students and that no harm can come to them while they are under his ridge. Another legend says that the bells of Ghorakhal ring in a specific sequence to announce the arrival of the monsoon to the valleys below.",
        "keyRituals": [
                {
                        "name": "Golu Devta Arghya",
                        "description": "Offering sacred water and grain to the deity to seek the protection and the prosperity."
                },
                {
                        "name": "Nyaya Sankalpa (Petition)",
                        "description": "Performing the formal ritual of stating a problem to the God of Justice and promising a bell upon its resolution."
                },
                {
                        "name": "Ghanti Bandhan",
                        "description": "The ritual of tying a bell to the temple racks as a mark of the gratitude and the fulfilled faith."
                },
                {
                        "name": "Ridge-Top Prarthana",
                        "description": "Offering prayers while facing the valleys to seek the spiritual alignment with the mountain energy."
                }
        ],
        "highlights": [
                {
                        "name": "The Bell Walkways",
                        "description": "The iconic and surreal paths lined with thousands of the brass bells of all sizes."
                },
                {
                        "name": "The Nainital Viewpoint",
                        "description": "The balcony that offers the panoramic views of the surrounding lake district and the high hills."
                },
                {
                        "name": "The Main Golu Shrine",
                        "description": "The sacred heart of the temple where the energy of the folk justice is most intense."
                },
                {
                        "name": "The Sacred Oak Grove",
                        "description": "The forest area surrounding the temple, believed to be the home of the mountain spirits."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the ridge is most beautiful in the spring and the autumn).",
                "howToReach": "4km from Bhowali and 15km from Nainital. Easily accessible by road; taxis and buses are regularly available.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Visit the temple in the early morning to avoid the tourist crowds and to experience the ringing of the bells in the silent air.",
                "Combine your visit with a trip to the nearby lakes of Bhimtal and Sat-tal for a complete Kumaon experience.",
                "Be prepared for monkeys; maintain a safe distance and do not carry food openly in the temple premises."
        ],
        "faqs": [
                {
                        "question": "Who is Golu Devta?",
                        "answer": "He is the most popular folk deity of Kumaon, worshipped as an incarnation of Lord Shiva and the supreme God of Justice."
                },
                {
                        "question": "How many bells are there?",
                        "answer": "There are thousands of bells; the number grows every day as more devotees have their prayers answered."
                },
                {
                        "question": "What is Ghorakhal famous for?",
                        "answer": "Apart from the Golu Devta temple, it is world-famous for the Ghorakhal Sainik School, one of the premier military schools in India."
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
    'Mindrolling Monastery', 
    'mindrolling-monastery-dehradun', 
    'Sacred Destination', 
    'uk', 
    'The "Place of Perfect Emancipation", Mindrolling Monastery is one of the most significant Buddhist centers in India, located in the Clement Town area of Dehradun. It is a site of absolute global Buddhist authority and architectural grandeur, home to the Great Stupa (one of the tallest in the world), representing the absolute preservation of the Nyingma school and the profound energy of the Himalayan peace.', 
    '410.5', 
    '265.2', 
    '25', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Great Stupa of the Dehradun Valley and the Sanctuary of the Eternal Emancipation', 
    'Mindrolling Monastery Dehradun | Uttarakhand, Buddhist Stupa & Ancient Lore', 
    'Experience the profound peace of Mindrolling Monastery. Discover the Great Stupa, the legend of the Nyingma masters, and the profound energy of the Buddhist pilgrimage.', 
    'Mindrolling Monastery, Dehradun, Buddhist Temple, Great Stupa, Nyingma School, Clement Town, Hindu Pilgrimage, Ancient Lore, Tibetan Buddhism', 
    '255', 
    '{
        "spiritualEssence": "Mindrolling is the manifestation of the divine as the supreme discipline and the absolute clarity of the enlightened mind. The energy here is vast, colorful, and intensely silent. It is the site where the Tibetan spiritual tradition has been anchored in the Indian soil. The vibration is one of ''Bodhi'' (Enlightenment) and the absolute resonance of the compasssion. As a massive complex featuring the world-famous Great Stupa (185 feet tall) and beautifully landscaped gardens, it represents the spiritual lighthouse of the Dehradun valley. A visit here is believed to grant the devotee the absolute peace of the soul and the blessing of the universal harmony. The air is always vibrant with the scent of the butter lamps and the constant, rhythmic sound of the Tibetan chanting and the turning of the prayer wheels.",
        "longDescription": "Mindrolling Monastery was originally founded in Tibet in 1676 and was re-established in Dehradun in 1965 by His Eminence Khochhen Rinpoche. It is one of the six major monasteries of the Nyingma school. The complex is world-famous for its Great Stupa, which contains numerous shrines and is decorated with spectacular murals and statues. The monastery is a key center for the study of the Buddhist philosophy, the Tibetan language, and the sacred arts. It features the Ngagyur Nyingma College, one of the largest Buddhist institutes in India. The site attracts thousands of international and domestic seekers who come to experience the authentic Tibetan culture and the profound atmosphere of the meditation. Mindrolling is a site where the highest level of Himalayan Buddhist science and the most stunning architectural scale are perfectly unified.",
        "spiritualArchitecture": "The architecture of Mindrolling is a spectacular display of the traditional Tibetan style with a focus on the grand scale and the intricate symbolic detail. The centerpiece is the Great Stupa, a 185-foot tall structure featuring multiple levels of shrines and a magnificent golden pinnacle. A unique feature is the presence of the 103-foot tall statue of Lord Buddha in the monastery garden. The architecture is designed to map the path to the enlightenment, with every mural and statue representing a specific stage of the consciousness. The use of the vibrant colors (red, gold, and blue), the elaborate wood-carvings, and the expansive courtyards create a sense of a spiritual palace that is both awe-inspiring and welcoming. The complex includes several grand prayer halls (Lhakhangs) with massive statues of the Buddha and the Guru Rinpoche.",
        "vedicReferences": "Mindrolling is celebrated in the modern Buddhist history as the supreme site where the ''Vinaya'' and the ''Dharma'' have been preserved to guide the humanity in the modern age.",
        "deepInsights": "The turning of the prayer wheels represents the truth that the divine word must be constantly circulated to benefit all the beings. Mindrolling teaches that the highest peace is the one that is achieved through the absolute discipline of the mind.",
        "ancientLore": "Lore tells that the location of the monastery was personally blessed by the high masters who saw the Dehradun valley as a perfect container for the light of the Dharma. Another legend says that the shadow of the Great Stupa has the power to purify the karma of anyone who walks beneath it during the full moon.",
        "keyRituals": [
                {
                        "name": "Tibetan Chanting Ceremony",
                        "description": "Participating in the collective morning and evening chanting of the sacred texts by the monks to seek the universal peace."
                },
                {
                        "name": "Kora (Circumambulation)",
                        "description": "The ritual of walking around the Great Stupa in a clockwise direction while turning the prayer wheels to seek the merit."
                },
                {
                        "name": "Butter Lamp Offering",
                        "description": "Offering lamps in the main shrine to seek the removal of the spiritual darkness and the awakening of the wisdom."
                },
                {
                        "name": "Dharma Talk Session",
                        "description": "Listening to the teachings of the Rinpoche or the senior monks on the path of the compassion and the mindfulness."
                }
        ],
        "highlights": [
                {
                        "name": "The Great Stupa",
                        "description": "The iconic 185-foot tall stupa, featuring multiple shrines and spectacular Buddhist murals."
                },
                {
                        "name": "The 103-Foot Buddha Statue",
                        "description": "A magnificent golden statue of the Lord Buddha, standing in the beautifully maintained gardens."
                },
                {
                        "name": "The Main Prayer Hall",
                        "description": "The grand space housing the massive statues and the sacred relics of the Tibetan masters."
                },
                {
                        "name": "The Ngagyur Nyingma College",
                        "description": "The prominent institute for the Buddhist higher studies within the monastery complex."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March (the gardens are in full bloom and the weather is perfect for the walking tour).",
                "howToReach": "Located in Clement Town, Dehradun. Easily accessible by road from the Dehradun city center (approx 9km).",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Maintain absolute silence and respect while entering the prayer halls; do not photograph the rituals without explicit permission.",
                "Dress modestly and remove your shoes before entering the shrines or the Stupa chambers.",
                "Spend some time in the monastery gardens; the energy is exceptionally peaceful and conductive to the contemplation."
        ],
        "faqs": [
                {
                        "question": "How high is the Stupa?",
                        "answer": "The Great Stupa is 185 feet tall and is considered one of the tallest stupas in the world."
                },
                {
                        "question": "Who founded the monastery?",
                        "answer": "The original Mindrolling was founded in Tibet in 1676; the Dehradun branch was re-established in 1965 by Khochhen Rinpoche."
                },
                {
                        "question": "Are visitors allowed in the shrines?",
                        "answer": "Yes, visitors are welcome in most of the shrines and the prayer halls, provided they follow the monastery decorum."
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
    'Tapkeshwar Mahadev', 
    'tapkeshwar-mahadev-temple-dehradun', 
    'Sacred Destination', 
    'uk', 
    'The "Cave of the Dripping Lord", Tapkeshwar Mahadev is an ancient Shaiva shrine located on the banks of the Asan river in Dehradun. It is a site of absolute natural authority and primal energy, where water naturally drips from the cave ceiling onto the Shiva Lingam, representing the absolute perpetual abhisheka and the profound energy of the Guru Dronacharya''s taposthali.', 
    '405.2', 
    '262.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Natural Cave Shrine of the Dehradun Valley and the Sanctuary of the Dripping Grace', 
    'Tapkeshwar Mahadev Dehradun | Uttarakhand, Cave Temple & Ancient Lore', 
    'Experience the profound energy of Tapkeshwar Mahadev. Discover the river-side cave shrine, the legend of the Guru Dronacharya, and the profound energy of the Dehradun pilgrimage.', 
    'Tapkeshwar Mahadev, Dehradun, Lord Shiva, Cave Temple, Asan River, Guru Dronacharya, Hindu Pilgrimage, Ancient Lore, Natural Abhisheka', 
    '256', 
    '{
        "spiritualEssence": "Tapkeshwar is the manifestation of the divine as the supreme patience and the absolute continuity of the grace. The energy here is earthy, resonant, and intensely river-connected. It is the site where the rock becomes the medium of the worship. The vibration is one of ''Dhara'' (Stream) and the absolute alignment with the natural cycles. As a temple located inside a natural cave on the river bank, it represents the spiritual foundation of the Dehradun valley. A visit here is believed to grant the devotee the absolute removal of the blockages and the blessing of the constant spiritual growth. The air is always vibrant with the scent of the damp earth and the constant, rhythmic sound of the dripping water and the flowing river.",
        "longDescription": "Tapkeshwar (meaning ''the lord of the dripping water'') is one of the most famous temples in Dehradun. It is situated in a forest area on the banks of the Asan river. The main deity is a Shiva Lingam housed in a natural cave. Water from a subterranean source constantly drips onto the Lingam, creating a perpetual ritual of Abhisheka. The site is legendary as the place where Guru Dronacharya, the teacher of the Pandavas and the Kauravas, performed intense penance to seek the blessing of Lord Shiva. It is also believed to be the birthplace of Ashwatthama. The temple complex includes several smaller shrines and a beautiful river bank area where pilgrims perform ablutions. Tapkeshwar is a site where the highest level of Himalayan cave mysticism and the most popular urban devotion are perfectly unified.",
        "spiritualArchitecture": "The architecture of Tapkeshwar is a spectacular display of the river-side cave style with a focus on the integration of the natural rock and the man-made structure. The temple features a series of narrow stone steps that lead down to the cave opening on the river bank. A unique feature is the inner sanctum where the rock ceiling has been left untouched to allow the natural dripping of the water. The architecture is designed to emphasize the subterranean and the primal nature of the Shaiva worship. The use of the vibrant paint on the exterior structures and the simple stone flooring in the cave create a sense of a spiritual home that is both ancient and active. The complex includes several halls for the pilgrims and a large entrance gate with the colorful statues of the deities.",
        "vedicReferences": "Tapkeshwar is celebrated in the local oral traditions and the Puranic literature as the supreme site where the ''Shiva-Dhara'' was manifested to bless the master of the archery.",
        "deepInsights": "The dripping water represents the truth that the divine grace is constant and subtle. Tapkeshwar teaches that the highest worship is the one that is in harmony with the natural environment.",
        "ancientLore": "Lore tells that Guru Dronacharya prayed here for several decades, surviving only on the milk that was miraculously provided by the mountain cows. Another legend says that the water of the cave has the power to heal the ancestral diseases when consumed at the dawn with the faith.",
        "keyRituals": [
                {
                        "name": "Cave Abhisheka",
                        "description": "Offering sacred water and the milk to the Lingam inside the natural cave to seek the stability and the peace."
                },
                {
                        "name": "Tapkeshwar Mahashivratri",
                        "description": "Participating in the massive annual fair and the night-long vigil to celebrate the marriage of Shiva and Parvati."
                },
                {
                        "name": "Asan River Snanam",
                        "description": "Performing the ritual dip in the holy river at the temple steps to seek the physical purification."
                },
                {
                        "name": "Dronacharya Smriti Puja",
                        "description": "Offering prayers to the great master of the archery at his symbolic seat in the temple complex."
                }
        ],
        "highlights": [
                {
                        "name": "The Natural Cave",
                        "description": "The sacred heart of the temple where the water drips perpetually on the Shiva Lingam."
                },
                {
                        "name": "The Asan River Ghats",
                        "description": "The scenic and spiritually charged river bank area for the ritual bathing and the reflection."
                },
                {
                        "name": "The Drona Cave",
                        "description": "The specific area associated with the penance of the legendary Guru Dronacharya."
                },
                {
                        "name": "The Giant Statue of Shiva",
                        "description": "A prominent and colorful statue of the Lord Shiva in meditation, overlooking the river valley."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the cave is particularly atmospheric during the monsoon and the Mahashivratri festival).",
                "howToReach": "6km from the Dehradun city center. Easily accessible by road; regular taxis and city buses are available.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Be prepared for large crowds during the festivals and the Mondays; visit in the early morning for a more peaceful experience.",
                "The steps can be slippery when wet; wear sensible walking shoes with a good grip.",
                "Spend some time sitting by the river after your Darshan; the sound of the water is very conductive to the meditation."
        ],
        "faqs": [
                {
                        "question": "Why is it called Tapkeshwar?",
                        "answer": "Because of the natural phenomenon where water drips (''tapakti'' in Hindi) from the cave ceiling onto the Shiva Lingam."
                },
                {
                        "question": "Who is the Guru associated with this temple?",
                        "answer": "Guru Dronacharya, the legendary teacher of the Pandavas and Kauravas in the Mahabharata, performed penance here."
                },
                {
                        "question": "Is there an entry fee?",
                        "answer": "No, the temple is open to all and there is no fee for the Darshan or the entry."
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
    'Laxman Sidh', 
    'laxman-sidh-temple-dehradun', 
    'Sacred Destination', 
    'uk', 
    'The "Primary Guardian of the Valley", Laxman Sidh is the most significant of the four Siddh Peethas in Dehradun. It is a site of absolute yogic authority and primal energy, being the specific spot where Laxman, the brother of Lord Rama, performed penance after the battle of Lanka, representing the absolute manifestation of the spiritual purification and the profound energy of the Siddh lineage.', 
    '415.2', 
    '268.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Supreme Siddh Peeth of Dehradun and the Sanctuary of the Vedic Penance', 
    'Laxman Sidh Dehradun | Uttarakhand, Siddh Peeth & Ancient Lore', 
    'Experience the profound energy of Laxman Sidh. Discover the forest-shrine of the Siddh lineage, the legend of the Laxman''s penance, and the profound energy of the Dehradun pilgrimage.', 
    'Laxman Sidh, Dehradun, Siddh Peeth, Lord Laxman, Hindu Pilgrimage, Ancient Lore, Forest Temple, Spiritual Purification', 
    '257', 
    '{
        "spiritualEssence": "Laxman Sidh is the manifestation of the divine as the supreme atonement and the absolute clarity of the spiritual restoration. The energy here is dense, silent, and intensely forest-connected. It is the site where the royal spirit meets the yogic discipline. The vibration is one of ''Siddha'' (Perfected) and the absolute alignment with the higher consciousness. As a temple located in a lush green forest on the outskirts of Dehradun, it represents the primary spiritual anchor of the valley. A visit here is believed to grant the devotee the absolute removal of the guilt and the blessing of the inner peace. The air is always vibrant with the scent of the dry leaves and the constant, rhythmic sound of the forest wind and the ancient chants.",
        "longDescription": "Laxman Sidh is part of the four Siddh Peethas surrounding Dehradun, the others being Kalu Sidh, Madhu Sidh, and Manak Sidh. It is believed that Laxman came to this spot to perform penance (Tapasyā) to purify himself from the sin of killing Ravana (who was a Brahman). The temple is a site of intense local devotion, especially on Sundays when thousands of pilgrims visit to seek the blessing of the Siddh. The shrine is simple and ancient, featuring an elevated platform in the middle of a sacred grove. The site is a critical center for the local culture and the spiritual history of the Dehradun valley. Laxman Sidh is a site where the highest level of Puranic legend and the most resilient local forest-tradition are perfectly unified.",
        "spiritualArchitecture": "The architecture of Laxman Sidh is a spectacular display of the forest-shrine style with a focus on the openness and the integration with the surrounding trees. The temple features a central stone platform with a simple roof and a series of courtyards for the pilgrims. A unique feature is the presence of the massive ancient trees that are decorated with the sacred threads and the bells. The architecture is designed to minimize the visual obstruction of the forest, creating a sense of a spiritual clearing. The use of the white-washed walls and the simple stone flooring creates a sense of a spiritual home that is both humble and powerful. The complex includes several small rooms for the resident priests and the meditation spots.",
        "vedicReferences": "Laxman Sidh is celebrated in the local oral traditions as the supreme site where the ''Dharma'' was restored through the power of the high penance.",
        "deepInsights": "The penance of Laxman represents the truth that even the most righteous actions may require a spiritual purification. Laxman Sidh teaches that the highest peace is found in the absolute surrender to the discipline.",
        "ancientLore": "Lore tells that the forest of Laxman Sidh is personally guarded by the celestial beings who appear as deer to the faithful seekers. Another legend says that the soil of the temple has the power to heal the skin diseases when applied with the faith during the sunrise.",
        "keyRituals": [
                {
                        "name": "Siddh Peeth Puja",
                        "description": "Offering sacred water and the flowers to the Siddh seat to seek the mental clarity and the peace."
                },
                {
                        "name": "Sunday Bhandara",
                        "description": "Participating in the collective meal offering on Sundays to seek the blessing of the community and the deity."
                },
                {
                        "name": "Forest Circumambulation",
                        "description": "Walking through the sacred grove surrounding the temple to seek the alignment with the forest energy."
                },
                {
                        "name": "Laxman Smriti Arpan",
                        "description": "Offering prayers to the memory of Lord Laxman to seek the courage and the loyalty."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Siddh Seat",
                        "description": "The sacred heart of the temple where the energy of the Siddh lineage is most intense."
                },
                {
                        "name": "The Sacred Grove",
                        "description": "The ancient forest surrounding the temple, believed to be the home of the mountain devas."
                },
                {
                        "name": "The Ancient Banyan Tree",
                        "description": "A prominent and sacred tree within the temple complex where many pilgrims offer prayers."
                },
                {
                        "name": "The Peace Courtyard",
                        "description": "The expansive open space where pilgrims gather for the meditation and the collective chanting."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (Sundays are most vibrant with the local pilgrims).",
                "howToReach": "12km from the Dehradun city center on the Dehradun-Rishikesh road. Easily accessible by road; regular taxis and buses are available.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Visit on a Sunday to witness the intense local devotion and to participate in the community feast.",
                "Dress modestly and maintain the silence of the forest-shrine; avoid carrying plastic into the sacred grove.",
                "Spend some time walking in the surrounding forest; the energy is exceptionally pure and conductive to the meditation."
        ],
        "faqs": [
                {
                        "question": "Who is worshipped here?",
                        "answer": "The primary deity is Lord Laxman, worshipped here in his form as a Siddh (a perfected yogi)."
                },
                {
                        "question": "What are the 4 Sidh Peeths of Dehradun?",
                        "answer": "They are Laxman Sidh, Kalu Sidh, Madhu Sidh, and Manak Sidh."
                },
                {
                        "question": "Is it inside the city?",
                        "answer": "No, it is located in a forest area on the outskirts of Dehradun, approximately 12km from the city center."
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
    'Bharat Mata Mandir', 
    'bharat-mata-mandir-haridwar', 
    'Sacred Destination', 
    'uk', 
    'The "Mother India Temple", Bharat Mata Mandir is a unique 8-story spiritual landmark in Haridwar. It is a site of absolute patriotic authority and cultural resonance, dedicated to Mother India as a deity, representing the absolute unification of the national identity and the Vedic spirit through a vertical pilgrimage of the Indian history.', 
    '432.5', 
    '272.2', 
    '20', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Multi-Story Sanctuary of the National Soul and the Mirror of Bharat', 
    'Bharat Mata Mandir Haridwar | Uttarakhand, Patriotic & Ancient Lore', 
    'Experience the unique spiritual patriotism of Bharat Mata Mandir. Discover the 8-story heritage shrine, the map of India, and the profound energy of the Haridwar pilgrimage.', 
    'Bharat Mata Mandir, Haridwar, Mother India, Patriotic Temple, Swami Satyamitranand, Hindu Pilgrimage, Ancient Lore, Indian History', 
    '261', 
    '{
        "spiritualEssence": "Bharat Mata Mandir is the manifestation of the divine as the supreme motherland and the absolute sacrifice of the ancestors. The energy here is respectful, historical, and intensely unified. It is the site where the physical geography of India is worshipped as a spiritual body. The vibration is one of ''Desh-Bhakti'' (Patriotism) and the absolute honor for the diverse culture of the subcontinent. As a massive multi-story structure near the Ganga, it represents the spiritual museum of the Indian identity. A visit here is believed to grant the devotee the absolute expansion of the national consciousness and the blessing of the cultural pride. The air is always vibrant with the scent of the marigolds and the constant, rhythmic sound of the patriotic hymns and the river breeze.",
        "longDescription": "Founded in 1983 by Swami Satyamitranand Giri and inaugurated by Indira Gandhi, this temple is not dedicated to a single god but to the concept of India. Each of its eight floors represents a different aspect of the Indian life: the ground floor features a massive relief map of India; the second floor honors the heroes of the independence; the third floor is dedicated to the women saints; the fourth floor to the great sages; and the top floor to the Lord Vishnu. It is a unique place where the history, the mythology, and the geography are perfectly unified into a single vertical journey. Thousands of people visit the temple to understand the depth of the Indian heritage and to offer their respects to the spirit of the nation. It is a site where the highest level of Himalayan organizational vision and the most intense patriotic devotion are perfectly unified.",
        "spiritualArchitecture": "The architecture of Bharat Mata Mandir is a spectacular display of the modern vertical-shrine style with a focus on the narrative and the scale. The temple features a high tower with eight distinct levels, each accessible by an elevator and a stairway. A unique feature is the massive marble relief map of India on the ground floor, which is worshipped as a deity. The architecture is designed to lead the visitor through a chronological and thematic study of the Indian spirit. The use of the vibrant colors, the detailed statues on each floor, and the expansive balconies create a sense of a spiritual library that is both educational and sacred. The complex includes a beautifully maintained garden and a quiet meditation space near the entrance.",
        "vedicReferences": "Bharat Mata Mandir is celebrated in the modern spiritual discourse as the supreme site where the ''Prithvi Sukta'' (Hymn to Earth) is applied to the modern nation-state.",
        "deepInsights": "The map of India represents the truth that the earth is the primary altar of the humanity. Bharat Mata Mandir teaches that the service of the motherland is the highest form of the spiritual practice.",
        "ancientLore": "Lore tells that the foundation stone of the temple was brought from the seven sacred rivers of India to ensure its national resonance. Another legend says that the top floor of the temple offers a view that can reveal the future glory of Bharat to the sincere seeker.",
        "keyRituals": [
                {
                        "name": "Prithvi Arati",
                        "description": "The ritual of offering light to the map of India to seek the peace and the prosperity for the nation."
                },
                {
                        "name": "Siddha-Vrata Puja",
                        "description": "Offering prayers on the floors of the sages to seek the intellectual and the spiritual guidance."
                },
                {
                        "name": "Shakti Stavan",
                        "description": "Chanting the names of the Indian women saints to seek the empowerment and the grace."
                },
                {
                        "name": "Vertical Pilgrimage",
                        "description": "The ritual of climbing all eight floors to understand the complete spectrum of the Indian spiritual history."
                }
        ],
        "highlights": [
                {
                        "name": "The Marble Map of India",
                        "description": "The massive and detailed relief map on the ground floor, the heart of the temple."
                },
                {
                        "name": "The Heroes Floor",
                        "description": "The gallery dedicated to the freedom fighters and the martyrs who sacrificed for the country."
                },
                {
                        "name": "The Saints Floor",
                        "description": "The level honoring the great spiritual teachers of the various Indian traditions."
                },
                {
                        "name": "The Top-Floor View",
                        "description": "The balcony offering panoramic views of the Haridwar city and the Ganga river Snaking through the plains."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the temple is most comfortable during the cooler months from October to March).",
                "howToReach": "Located 5km from the Haridwar railway station on the Rishikesh road. Easily accessible by rickshaw or taxi.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Haridwar Railway Station."
        },
        "tips": [
                "Use the elevator to reach the top floor first and then walk down to experience each level at a relaxed pace.",
                "Spend time reading the inscriptions on each floor; they provide deep insights into the Indian history and philosophy.",
                "Avoid visiting during the peak afternoon hours as the temple can get quite crowded with the pilgrim groups."
        ],
        "faqs": [
                {
                        "question": "Who founded the temple?",
                        "answer": "It was founded by Swami Satyamitranand Giri, a highly respected saint and the founder of the Samanvaya Parivar."
                },
                {
                        "question": "Is it a religious temple?",
                        "answer": "It is a spiritual and patriotic temple that honors the spirit of India and all its diverse traditions."
                },
                {
                        "question": "How many floors are there?",
                        "answer": "There are eight floors, each dedicated to a specific theme of the Indian culture and history."
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
    'Sapt Rishi Ashram', 
    'sapt-rishi-ashram-haridwar', 
    'Sacred Destination', 
    'uk', 
    'The "Abode of the Seven Sages", Sapt Rishi Ashram is an ancient spiritual landmark in Haridwar. It is a site of absolute Vedic authority and riverine resonance, where the seven great rishis meditated and where the Ganga split into seven streams to avoid disturbing them, representing the absolute harmony between the human penance and the natural flow.', 
    '433.8', 
    '271.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sanctuary of the Seven Streams and the Seat of the Ancient Seers', 
    'Sapt Rishi Ashram Haridwar | Uttarakhand, Seven Sages & Ancient Lore', 
    'Experience the profound silence of Sapt Rishi Ashram. Discover the Sapt Dhara (Seven Streams), the legend of the seven rishis, and the profound energy of the Haridwar pilgrimage.', 
    'Sapt Rishi Ashram, Haridwar, Sapt Rishis, Ganga River, Seven Streams, Hindu Pilgrimage, Ancient Lore, Vedic Rishis', 
    '262', 
    '{
        "spiritualEssence": "Sapt Rishi Ashram is the manifestation of the divine as the supreme contemplation and the absolute respect of the nature for the spirit. The energy here is ancient, watery, and intensely peaceful. It is the site where the roar of the river was softened by the power of the meditation. The vibration is one of ''Rishi-Tattva'' (Essence of the Sages) and the absolute clarity of the Vedic transmission. As a tranquil ashram on the banks of the Ganga where the river flows in seven distinct channels, it represents the spiritual gateway to the upper Himalayas. A visit here is believed to grant the devotee the absolute depth of the meditation and the blessing of the ancestral wisdom. The air is always vibrant with the scent of the forest and the constant, rhythmic sound of the seven streams.",
        "longDescription": "According to the Puranas, the seven great rishis (Kashyapa, Atri, Vashishta, Vishwamitra, Gautama, Jamadagni, and Bharadwaja) were meditating at this spot. The Ganga, not wishing to disturb their deep penance with her loud roar, split herself into seven channels (Sapt Dhara). The ashram complex is ancient and features a series of small shrines dedicated to each of the seven sages. It is a favorite spot for the serious seekers and those looking for a quiet alternative to the busy ghats of Haridwar. The ashram also runs a traditional Sanskrit school (pathshala). It is a site where the highest level of Himalayan mythology and the most serene river-side ecology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Sapt Rishi Ashram is a spectacular display of the traditional river-side ashram style with a focus on the multiple small shrines and the open-air courtyards. The complex features a central prayer hall and seven distinct stone shrines, one for each of the great sages. A unique feature is the presence of the Sapt Dhara (Seven Streams) that flow directly adjacent to the ashram walls. The architecture is designed to integrate the sound and the sight of the river into the spiritual practice. The use of the simple brick and the white-washed surfaces create a sense of a spiritual retreat that is unpretentious and deeply rooted in the soil. The complex includes several simple residential rooms and a traditional cowshed (gaushala).",
        "vedicReferences": "Sapt Rishi Ashram is celebrated in the Skanda Purana as the supreme site where the ''Sapt-Rishi Mandala'' (the constellation of the seven sages) is anchored to the earth.",
        "deepInsights": "The splitting of the Ganga represents the truth that the nature always yields to the power of the concentrated consciousness. Sapt Rishi Ashram teaches that the true meditation creates its own space and silence.",
        "ancientLore": "Lore tells that the seven rishis still visit the ashram in their subtle forms during the Brahma Muhurta to bathe in the seven streams. Another legend says that the water from each of the seven streams has a unique spiritual property corresponding to the sage it is named after.",
        "keyRituals": [
                {
                        "name": "Sapt Dhara Snanam",
                        "description": "The ritual of bathing in the seven streams of the Ganga to seek the purification from the seven types of the karmic debts."
                },
                {
                        "name": "Rishi Tarpan",
                        "description": "Offering sacred water and seeds to the ancestors and the ancient sages to seek their blessing."
                },
                {
                        "name": "Sanskrit Pathshala Arati",
                        "description": "Participating in the evening prayers with the students of the Vedic school to seek the intellectual clarity."
                },
                {
                        "name": "Silent Stream Meditation",
                        "description": "Sitting on the banks of the Sapt Dhara to practice the silent meditation while focusing on the sound of the flowing water."
                }
        ],
        "highlights": [
                {
                        "name": "The Seven Rishi Shrines",
                        "description": "The unique collection of the small temples dedicated to each of the great Vedic seers."
                },
                {
                        "name": "The Sapt Dhara",
                        "description": "The spectacular sight of the Ganga splitting into seven channels right next to the ashram."
                },
                {
                        "name": "The Sanskrit Pathshala",
                        "description": "The traditional school where the young students study the ancient scriptures and the language."
                },
                {
                        "name": "The Ancient Banyan Tree",
                        "description": "A massive and sacred tree in the ashram courtyard, believed to be the spot where several sages have meditated."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the river streams are most beautiful after the monsoon and during the winter).",
                "howToReach": "Located 6km from the Haridwar railway station on the road to Rishikesh. Easily accessible by shared auto or taxi.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Haridwar Railway Station."
        },
        "tips": [
                "Visit in the early morning to experience the ashram at its most peaceful and to see the students performing their morning rituals.",
                "Carry some small change to offer at the various shrines of the seven sages; the priests are usually very knowledgeable and willing to share the stories.",
                "Be mindful of the river currents if you choose to bathe in the Sapt Dhara; always use the designated ghat areas."
        ],
        "faqs": [
                {
                        "question": "Who are the seven sages?",
                        "answer": "They are the Kashyapa, Atri, Vashishta, Vishwamitra, Gautama, Jamadagni, and Bharadwaja—the foundational masters of the Vedic wisdom."
                },
                {
                        "question": "Why did the Ganga split?",
                        "answer": "Legend says she split into seven streams to pass by the meditating sages without disturbing them with her loud roar."
                },
                {
                        "question": "Is it near Har Ki Pauri?",
                        "answer": "It is about 5-6 km away from Har Ki Pauri, making it a much quieter and more secluded spot."
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
    'Chandrabadni Devi', 
    'chandrabadni-devi-temple-tehri', 
    'Sacred Destination', 
    'uk', 
    'The "Mountain of the Lunar Face", Chandrabadni Devi is a supreme Shakti Peeth located on a high peak in the Tehri Garhwal region. It is a site of absolute ancient authority and divine presence, where the torso of Sati is believed to have fallen, representing the absolute seat of the spiritual power that completes the sacred triangle with Surkanda and Kunjapuri.', 
    '460.5', 
    '240.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The High Shakti of the Tehri Ridges and the Sanctuary of the Moon-Face Goddess', 
    'Chandrabadni Devi Temple | Uttarakhand, Shakti Peeth & Ancient Lore', 
    'Experience the profound energy of Chandrabadni Devi. Discover the ridgetop Shakti Peeth, the legend of the falling torso of Sati, and the profound energy of the Tehri pilgrimage.', 
    'Chandrabadni Devi, Tehri Garhwal, Uttarakhand, Shakti Peeth, Hindu Pilgrimage, Ancient Lore, High Altitude, Mountain Temple', 
    '263', 
    '{
        "spiritualEssence": "Chandrabadni is the manifestation of the divine as the supreme radiance and the absolute power of the ridgetop presence. The energy here is cool, expansive, and intensely luminous. It is the site where the highest point of the mountain becomes a spiritual beacon for the entire region. The vibration is one of ''Chandratva'' (Moon-like coolness) and the absolute clarity of the mountain vision. As a temple perched on a 2,277-meter peak offering views of the Kedarnath and Badrinath ranges, it represents the spiritual guardian of the central Tehri. A visit here is believed to grant the devotee the absolute removal of the inner heat (anger and desire) and the blessing of the divine peace. The air is always vibrant with the scent of the wild mountain herbs and the constant, rhythmic sound of the wind through the ridge peaks.",
        "longDescription": "Chandrabadni is one of the 51 Shakti Peethas. According to the tradition, when Lord Shiva was carrying the charred body of Sati, her torso fell at this spot. The temple is famous for its unique tradition where the idol of the Goddess is not directly worshipped; instead, a sacred shroud (Shree Yantra) covers the spot, and even the priest performs the ritual with blindfolded eyes. The temple provides spectacular views of the snow-clad Himalayas on one side and the deep valleys of the Alaknanda and Bhagirathi on the other. Legend tells that the great saint Adi Shankaracharya visited this site to establish the Devi as the protector of the central ridges. It is a site where the highest level of Himalayan geography and the most intense local faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Chandrabadni is a spectacular display of the traditional mountain ridge style with a focus on the simplicity and the exposure to the elements. The temple features a small stone shrine with a white-washed exterior and a series of paved platforms that wrap around the mountain top. A unique feature is the presence of several iron tridents (trishuls) anchored into the rock, representing the fierce protection of the Mother. The architecture is designed to minimize the visual obstruction of the horizon, creating a sense of a spiritual home that is suspended in the sky. The use of the local stone and the simple red flags create a sense of a spiritual retreat that is both ancient and alert. The complex includes several small benches for the pilgrims to rest and contemplate the vast landscape.",
        "vedicReferences": "Chandrabadni is celebrated in the local oral traditions as the supreme site where the Mother personally manifested her lunar brilliance to guide the mountain travelers.",
        "deepInsights": "The falling of the torso represents the truth that the heart of the spiritual power is found in the absolute center of the being. Chandrabadni teaches that the highest truth is often hidden from the physical eyes and must be felt in the soul.",
        "ancientLore": "Lore tells that the mountain peak personally rose higher to receive the sacred relic of the Mother. Another legend says that the bells of Chandrabadni can be heard in the Kedarnath valley during the full moon nights, signaling the meeting of the Shiva and Shakti energies.",
        "keyRituals": [
                {
                        "name": "Blindfolded Arati",
                        "description": "Witnessing the unique ritual where the priest offers light to the Goddess while his eyes are covered to seek the respect for the divine mystery."
                },
                {
                        "name": "Shakti Triangle Japa",
                        "description": "Performing the meditation while mentally connecting the three ridgetop shrines (Surkanda, Kunjapuri, Chandrabadni)."
                },
                {
                        "name": "Torso-Peak Parikrama",
                        "description": "Walking around the sacred peak to seek the alignment with the energy of the Shakti Peeth."
                },
                {
                        "name": "Dhwaja Arpan (Tehri)",
                        "description": "Tying the sacred red flags at the highest point of the temple to seek the divine protection and the victory."
                }
        ],
        "highlights": [
                {
                        "name": "The Hidden Shrine",
                        "description": "The sacred heart of the temple where the energy of the Shakti Peeth is housed behind a sacred shroud."
                },
                {
                        "name": "The Himalayan Panorama (Tehri)",
                        "description": "The spectacular 360-degree view of the high snow peaks and the river valleys below."
                },
                {
                        "name": "The Ancient Trishuls",
                        "description": "The collection of historic iron tridents representing the warrior-spirit of the mountain Goddess."
                },
                {
                        "name": "The Peak Meditation Platform",
                        "description": "The open-air area at the very top of the hill, ideal for deep contemplation."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the views are most spectacular from October to March).",
                "howToReach": "Located 22km from Devprayag. Reached by road to the base (Jarmola), followed by a 1km uphill walk.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Rishikesh Railway Station."
        },
        "tips": [
                "Start the climb early in the morning to catch the sunrise over the snow peaks; the light at this altitude is exceptionally pure.",
                "Respect the local tradition of the hidden idol; do not attempt to look behind the shroud and maintain the sanctity of the ritual.",
                "The weather can be significantly colder than in the valley; carry a light sweater or shawl even in the summer."
        ],
        "faqs": [
                {
                        "question": "Is it a Shakti Peeth?",
                        "answer": "Yes, it is one of the 51 Shakti Peethas, where the torso of the Goddess Sati is said to have fallen."
                },
                {
                        "question": "How difficult is the walk?",
                        "answer": "It is a 1km walk on a paved path from the road head. it is relatively easy and takes about 30 minutes."
                },
                {
                        "question": "What is the ''Shakti Triangle''?",
                        "answer": "It is the sacred geographic formation of three ridgetop temples—Surkanda Devi, Kunjapuri Devi, and Chandrabadni Devi—that protect the Garhwal region."
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
    'Danda Nagaraja', 
    'danda-nagaraja-temple-pauri', 
    'Sacred Destination', 
    'uk', 
    'The "Lord of the High Ridges", Danda Nagaraja is a supreme protective shrine in the Pauri Garhwal region. It is a site of absolute folk authority and snake-lineage resonance, dedicated to Lord Krishna in the form of the King of Snakes, representing the absolute manifestation of the divine as the guardian of the mountain forests and the profound energy of the Nag-Tattva.', 
    '480.5', 
    '260.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Guardian of the Pauri Hills and the Sanctuary of the Snake Lord', 
    'Danda Nagaraja Temple | Uttarakhand, Snake Deity & Ancient Lore', 
    'Experience the profound energy of Danda Nagaraja. Discover the ridgetop snake shrine, the legend of the Krishna-Nag manifestation, and the profound energy of the Pauri pilgrimage.', 
    'Danda Nagaraja, Pauri Garhwal, Uttarakhand, Snake Deity, Lord Krishna, Nag Tattva, Hindu Pilgrimage, Ancient Lore, High Altitude', 
    '264', 
    '{
        "spiritualEssence": "Danda Nagaraja is the manifestation of the divine as the supreme protection and the absolute alignment with the earth-energies. The energy here is grounded, protective, and intensely vibrant. It is the site where the serpent-energy of the mountain is harnessed for the spiritual benefit. The vibration is one of ''Nag-Udaya'' (Rising of the Serpent) and the absolute health of the local ecosystem. As a temple perched on a high ridge overlooking the Pauri hills and the distant snow peaks, it represents the spiritual armor of the southern Garhwal. A visit here is believed to grant the devotee the absolute removal of the poisons (physical and mental) and the blessing of the family protection. The air is always vibrant with the scent of the pine needles and the silent, heavy energy of the ancient forest spirits.",
        "longDescription": "Danda Nagaraja is one of the most revered Nag temples in Uttarakhand. Legend tells that Lord Krishna personally took the form of a snake and stayed on this ridge (Danda) to protect the local cowherds and the livestock. The temple is situated in a spectacular location and is famous for the large annual fair held on the Krishna Janmashtami. Devotees offer milk and simple forest flowers to the deity. The site is a critical center for the folk culture of the Pauri region, where the worship of the Nagas is deeply integrated with the agricultural and the social life. It is a site where the highest level of Puranic Krishna-Bhakti and the most ancient Himalayan snake worship are perfectly unified.",
        "spiritualArchitecture": "The architecture of Danda Nagaraja is a spectacular display of the traditional mountain ridge style with a focus on the simplicity and the communal spaces. The temple features a central stone shrine with a white-washed shikhara and a series of large, open courtyards where the folk dancers perform during the festivals. A unique feature is the presence of several stone carvings of the snakes and the Lord Krishna, often depicted in the Kaliya-Mardan pose. The architecture is designed to facilitate the gathering of the thousands of people from the nearby villages. The use of the vibrant colors and the simple local materials create a sense of a spiritual home that is both approachable and sacred. The complex includes several small resting halls for the pilgrims.",
        "vedicReferences": "Danda Nagaraja is celebrated in the local oral epics as the supreme site where the Lord of the Serpents personally established the boundary of the sacred land.",
        "deepInsights": "The snake lord represents the truth that the divine protection is found in the absolute awareness of the earth-energy. Danda Nagaraja teaches that the spirit must be as alert and as flexible as the serpent.",
        "ancientLore": "Lore tells that the bells of Danda Nagaraja can be heard in the celestial realms during the winter solstice. Another legend says that the deity personally guards the mountain pass, ensuring that no negative energy can enter the inner valleys of the Pauri region.",
        "keyRituals": [
                {
                        "name": "Nag-Milk Abhisheka",
                        "description": "Offering sacred milk to the stone images of the snakes to seek the protection from the elemental fears."
                },
                {
                        "name": "Krishna-Nag Jaagar",
                        "description": "Participating in the traditional night-long ritual of chanting and drumming to invoke the spirit of the Nagaraja."
                },
                {
                        "name": "Ridge-Dhwaja Arpan",
                        "description": "Tying the sacred flags at the temple to symbolize the devotee''s prayer for the family well-being."
                },
                {
                        "name": "Pauri Valley Dhyana",
                        "description": "Sitting in the temple courtyard to meditate on the vast valleys below to seek the mental expansion."
                }
        ],
        "highlights": [
                {
                        "name": "The Nagaraja Shrine",
                        "description": "The sacred heart of the temple where the image of the Snake Lord is worshipped."
                },
                {
                        "name": "The Festival Arena",
                        "description": "The large courtyard that hosts the vibrant folk dances and the annual fairs."
                },
                {
                        "name": "The Snake Carvings",
                        "description": "The unique collection of the ancient stone reliefs depicting the various Nagas of the mountain."
                },
                {
                        "name": "The Pauri Viewpoint",
                        "description": "The balcony offering spectacular views of the Pauri town and the surrounding hill ranges."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (especially during the Krishna Janmashtami in August and the spring months).",
                "howToReach": "Located 35km from Pauri town. Reached by road; regular taxis and buses run from Pauri and Kotdwar.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Kotdwar Railway Station."
        },
        "tips": [
                "Visit during the local festivals to experience the vibrant folk culture and the traditional mountain music.",
                "Maintain the cleanliness of the forest area; the temple is located in a beautiful and ecologically sensitive zone.",
                "Respect the local snake-worship traditions; the deity is deeply revered as the ultimate protector of the life and the property."
        ],
        "faqs": [
                {
                        "question": "Who is Danda Nagaraja?",
                        "answer": "He is Lord Krishna worshipped in the form of a snake, the supreme protector of the high ridges (Danda) in Pauri."
                },
                {
                        "question": "What is the main festival?",
                        "answer": "Krishna Janmashtami is the biggest festival, celebrated with a massive local fair and the traditional dances."
                },
                {
                        "question": "Where is it located?",
                        "answer": "In the Pauri Garhwal district, on a high ridge overlooking the surrounding valleys."
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
    'Kandoliya Mahadev', 
    'kandoliya-mahadev-temple-pauri', 
    'Sacred Destination', 
    'uk', 
    'The "City Guardian of Pauri", Kandoliya Mahadev is an ancient Shiva temple located in a dense pine forest near Pauri town. It is a site of absolute regional authority and protective resonance, being the primary deity of the Pauri hills, representing the absolute manifestation of the Lord as the master of the Himalayan forests and the profound energy of the city-sanctuary.', 
    '475.2', 
    '265.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Protector of the Pauri Heights and the Sanctuary of the Pine Forest', 
    'Kandoliya Mahadev Pauri | Uttarakhand, Lord Shiva & Ancient Lore', 
    'Experience the profound peace of Kandoliya Mahadev. Discover the forest shrine, the legend of the city guardian, and the profound energy of the Pauri pilgrimage.', 
    'Kandoliya Mahadev, Pauri, Uttarakhand, Lord Shiva, Pine Forest, City Guardian, Hindu Pilgrimage, Ancient Lore, Pauri Garhwal', 
    '265', 
    '{
        "spiritualEssence": "Kandoliya Mahadev is the manifestation of the divine as the supreme calm and the absolute protection of the local community. The energy here is fresh, pine-scented, and intensely steady. It is the site where the town of Pauri finds its spiritual anchor. The vibration is one of ''Sthirata'' (Stability) and the absolute clarity of the mountain life. As a beautiful temple surrounded by one of the highest-altitude pine and oak forests in the region, it represents the spiritual heart of the Pauri hills. A visit here is believed to grant the devotee the absolute peace of mind and the blessing of the divine guidance in the daily life. The air is always vibrant with the scent of the pine resin and the constant, rhythmic sound of the wind through the high-altitude trees.",
        "longDescription": "Kandoliya Mahadev is the presiding deity of the Pauri town. The temple is located at a high point offering spectacular views of the snow peaks and the Gangetic plains. It is a favorite spot for both pilgrims and the local residents seeking solace in nature. The temple features a beautiful image of the Lord Shiva and several smaller shrines. Nearby is the Kandoliya ground, which is a popular park and a viewpoint. Legend tells that the Lord personally chose this ridge to keep a watch over the people of Pauri. The site is a critical center for the local festivals, especially the Shivratri, when the entire town gathers to offer prayers. It is a site where the highest level of Himalayan forest aesthetic and the most intimate community faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Kandoliya Mahadev is a spectacular display of the traditional Garhwali stone style with a focus on the integration with the forest landscape. The temple features a central stone shrine with a simple but elegant shikhara and a series of paved courtyards that wrap around the ridge. A unique feature is the use of the local weathered stone that blends perfectly with the surrounding pine trunks. The architecture is designed to create a sense of a spiritual clearing in the middle of a dense forest. The use of the modest colors and the beautifully maintained flower gardens create a sense of a spiritual home that is both orderly and natural. The complex includes several small benches and a nearby viewpoint with a large open ground.",
        "vedicReferences": "Kandoliya Mahadev is celebrated in the local oral traditions as the supreme site where the Lord personally rested his trident to protect the mountain dwellers.",
        "deepInsights": "The forest guardian represents the truth that the divine is always present in the silence of the nature. Kandoliya Mahadev teaches that the spirit must be as upright and as resilient as the Himalayan pine.",
        "ancientLore": "Lore tells that the bells of Kandoliya ring on their own during the clear winter nights to announce the arrival of the snow. Another legend says that the water from the temple well has the power to heal the deep fatigue of the mountain travelers.",
        "keyRituals": [
                {
                        "name": "Kandoliya Jal-Abhisheka",
                        "description": "Offering sacred water to the Shiva Lingam to seek the peace and the stability for the family."
                },
                {
                        "name": "Pine-Grove Dhyana",
                        "description": "Sitting in the surrounding forest to practice the silent meditation while focusing on the scent of the pines."
                },
                {
                        "name": "City Guardian Arati",
                        "description": "The ritual of offering light at dusk to seek the protection for the Pauri town and its inhabitants."
                },
                {
                        "name": "Shikhar-Darshan (Pauri)",
                        "description": "Offering prayers while facing the high snow peaks from the temple viewpoint to seek the spiritual expansion."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Forest Shrine",
                        "description": "The sacred heart of the temple where the energy of the Lord Shiva is most intensely felt."
                },
                {
                        "name": "The Kandoliya Ground",
                        "description": "The nearby open park and the viewpoint offering the best views in the Pauri region."
                },
                {
                        "name": "The Ancient Pine Forest",
                        "description": "The spectacular high-altitude forest that surrounds the temple complex."
                },
                {
                        "name": "The Snow Peak Perspective",
                        "description": "The specific spot from where one can see the massive ranges of the Kedarnath and the Badrinath."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the forest is most beautiful in the spring and the early winter).",
                "howToReach": "Located 2km from the Pauri bus stand. Easily accessible by foot or a short rickshaw ride.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Kotdwar Railway Station."
        },
        "tips": [
                "Visit in the early evening to enjoy the sunset over the plains from the Kandoliya ground.",
                "Spend some time walking in the surrounding pine forest; the air is exceptionally clean and invigorating.",
                "Respect the silence of the temple premises; it is a popular spot for the local students and the elderly to meditate."
        ],
        "faqs": [
                {
                        "question": "Who is Kandoliya Mahadev?",
                        "answer": "He is the presiding deity and the supreme guardian of the Pauri town, a manifestation of Lord Shiva."
                },
                {
                        "question": "Is it a difficult climb?",
                        "answer": "No, it is located on a ridge accessible by road; the walk within the temple complex is easy and paved."
                },
                {
                        "question": "What can we see from here?",
                        "answer": "On clear days, you can see a magnificent 180-degree view of the high Himalayas and the deep valleys of the Garhwal."
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
    'Kalsi (Ashokan Edict)', 
    'kalsi-ashokan-edict-dehradun', 
    'Sacred Destination', 
    'uk', 
    'The "Historic Gate of the Yamuna", Kalsi is an ancient site in the Dehradun district. It is a site of absolute historic authority and Mauryan resonance, being the only site in North India where the 14th major Rock Edict of Emperor Ashoka is found, representing the absolute manifestation of the Dharma and the profound energy of the ancient Indian ethical vision at the confluence of the hills and the plains.', 
    '360.2', 
    '250.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Rock of the Eternal Dharma and the Sanctuary of the Mauryan Wisdom', 
    'Kalsi Ashokan Edict | Uttarakhand, History & Ancient Lore', 
    'Experience the profound history of Kalsi. Discover the Ashokan rock edict, the legend of the Mauryan peace, and the profound energy of the Yamuna valley pilgrimage.', 
    'Kalsi, Dehradun, Ashokan Edict, Emperor Ashoka, Mauryan Empire, Ancient India, History, Hindu Pilgrimage, Ancient Lore, Yamuna River', 
    '266', 
    '{
        "spiritualEssence": "Kalsi is the manifestation of the divine as the supreme law and the absolute application of the ethics to the social life. The energy here is grounded, intellectual, and intensely historical. It is the site where the voice of the ancient emperor is etched into the stone of the Himalayas. The vibration is one of ''Dharma'' (Righteousness) and the absolute clarity of the non-violence. As a protected site on the banks of the Yamuna where the river leaves the mountains, it represents the spiritual lighthouse of the ancient Mauryan borders. A visit here is believed to grant the devotee the absolute understanding of the social duty and the blessing of the mental peace through the righteous living. The air is always vibrant with the scent of the river mist and the silent, heavy energy of the millennia of the recorded truth.",
        "longDescription": "The Ashokan Edict at Kalsi is a massive quartz rock inscribed in the 3rd century BCE using the Brahmi script and the Prakrit language. It contains the 14 major rock edicts of Ashoka, which outline his philosophy of Dharma, including the non-violence, the tolerance, and the welfare of all the living beings. The site is uniquely situated at the confluence of the Yamuna and the Tons rivers. The presence of this edict here proves that the region was a critical gateway between the Himalayan interior and the Gangetic plains. The inscription also includes a figure of an elephant, symbolizing the Buddha. Kalsi is a site where the highest level of Himalayan history and the most advanced ethical philosophy of ancient India are perfectly unified.",
        "spiritualArchitecture": "The architecture of Kalsi is a spectacular display of the archaeological preservation with a focus on the natural monument. The site features a protective structure built over the massive quartz rock to prevent the weathering of the inscriptions. A unique feature is the presence of a beautifully maintained garden and a quiet riverfront area that surrounds the historic stone. The architecture is designed to emphasize the permanence of the written word and the scale of the natural altar. The use of the simple protective roof and the informative placards create a sense of a spiritual classroom that is both ancient and accessible. The complex includes several paths leading down to the sacred Yamuna ghats.",
        "vedicReferences": "Kalsi is celebrated in the modern historical literature as the supreme site where the ''Chakravartin'' (Universal Monarch) vision of the Dharma was anchored to the mountain soil.",
        "deepInsights": "The rock edict represents the truth that the highest power is the one that serves the truth. Kalsi teaches that the spiritual values must be written into the foundation of the society to ensure the lasting peace.",
        "ancientLore": "Lore tells that the rock personally appeared from the river Yamuna to receive the emperor''s message. Another legend says that the words of the edict glow in the subtle form during the full moon nights, echoing the emperor''s prayer for the global harmony.",
        "keyRituals": [
                {
                        "name": "Dharma Path (Study)",
                        "description": "The ritual of reading and reflecting on the translations of the Ashokan edicts to seek the ethical guidance."
                },
                {
                        "name": "Yamuna Confluence Snanam",
                        "description": "Bathing at the nearby confluence of the Yamuna and the Tons to seek the purification from the dualistic thoughts."
                },
                {
                        "name": "Stone-Silence Meditation",
                        "description": "Sitting in front of the Ashokan rock to practice the silent meditation while focusing on the permanence of the truth."
                },
                {
                        "name": "Elephas-Vrata",
                        "description": "Offering prayers at the elephant symbol on the rock to seek the wisdom and the strength of the Buddha energy."
                }
        ],
        "highlights": [
                {
                        "name": "The Ashokan Rock",
                        "description": "The massive quartz stone featuring the 14 major rock edicts of the emperor Ashoka."
                },
                {
                        "name": "The Brahmi Inscriptions",
                        "description": "The beautifully preserved ancient script that records the Mauryan philosophy of the Dharma."
                },
                {
                        "name": "The Yamuna Confluence",
                        "description": "The spectacular natural meeting of the Yamuna and the Tons rivers near the historic site."
                },
                {
                        "name": "The Archaeological Garden",
                        "description": "The serene green space that surrounds the monument, offering a peaceful environment for study."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the river views and the gardens are most beautiful in the spring and the autumn).",
                "howToReach": "Located 50km from Dehradun and 5km from Vikasnagar. Reached by road; regular buses and taxis run from Dehradun.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Carry a guidebook or a translation of the edicts to fully understand the historical and the spiritual significance of the inscriptions.",
                "Visit in the late afternoon to enjoy the soft light on the rock and the peaceful atmosphere of the river bank.",
                "Combine your visit with a trip to the nearby Dakpathar barrage for a complete experience of the Yamuna valley."
        ],
        "faqs": [
                {
                        "question": "What are the Ashokan edicts?",
                        "answer": "They are a collection of 33 inscriptions on the pillars and rocks made by the Emperor Ashoka, outlining his philosophy of Dharma."
                },
                {
                        "question": "What language is used at Kalsi?",
                        "answer": "The inscriptions are in the Prakrit language and the Brahmi script."
                },
                {
                        "question": "Why is there an elephant on the rock?",
                        "answer": "The elephant is a symbol of the Buddha, representing the emperor''s commitment to the Buddhist principles of the peace and the compassion."
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
    'Mostamanu Temple', 
    'mostamanu-temple-pithoragarh', 
    'Sacred Destination', 
    'uk', 
    'The "Rain God of the Frontier", Mostamanu is an ancient folk temple located near Pithoragarh. It is a site of absolute regional authority and agricultural resonance, being the primary deity who controls the weather and the rains in the Sor valley, representing the absolute manifestation of the divine as the master of the Himalayan elements and the profound energy of the frontier-devotion.', 
    '610.2', 
    '230.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Master of the Clouds and the Guardian of the Sor Valley', 
    'Mostamanu Temple Pithoragarh | Uttarakhand, Rain God & Ancient Lore', 
    'Experience the profound energy of Mostamanu. Discover the high-altitude folk shrine, the legend of the rain-master, and the profound energy of the Pithoragarh pilgrimage.', 
    'Mostamanu Temple, Pithoragarh, Rain God, Sor Valley, Uttarakhand, Folk Deity, Hindu Pilgrimage, Ancient Lore, High Altitude', 
    '267', 
    '{
        "spiritualEssence": "Mostamanu is the manifestation of the divine as the supreme abundance and the absolute control over the natural forces. The energy here is fresh, airy, and intensely vital. It is the site where the prayers of the farmers meet the response of the sky. The vibration is one of ''Varsha'' (Rain) and the absolute gratitude for the life-sustaining waters. As a temple perched on a high ridge overlooking the wide Pithoragarh valley and the high snow peaks of Nepal and India, it represents the spiritual weather-station of the Eastern Kumaon. A visit here is believed to grant the devotee the absolute removal of the droughts (in life and nature) and the blessing of the timely success. The air is always vibrant with the scent of the moist earth and the constant, rhythmic sound of the mountain wind.",
        "longDescription": "Mostamanu is the most revered folk deity of the Pithoragarh region. The temple is situated at an altitude of approximately 2,000 meters and is famous for the massive annual fair held in August-September, where thousands of people gather to seek the blessing for a good harvest. Legend tells that the deity personally chose this ridge to ensure that his gaze could cover every field in the Sor valley. The temple atmosphere is one of intense local pride and faith. It is said that whenever the region faces a drought, a special ritual at this temple never fails to bring the rain. The site is a critical anchor for the Kumaoni identity in the frontier region. It is a site where the highest level of Himalayan ridge-geography and the most practical human need for the sustenance are perfectly unified.",
        "spiritualArchitecture": "The architecture of Mostamanu is a spectacular display of the traditional Kumaoni ridge-shrine style with a focus on the open spaces and the panoramic framing. The temple features a central stone shrine with a simple shikhara and a massive paved courtyard that serves as the arena for the annual fairs. A unique feature is the presence of several high viewing platforms that offer some of the best views of the Panchachuli and Nanda Devi peaks. The architecture is designed to emphasize the connection to the sky and the vast horizon. The use of the simple white-washed walls and the vibrant multi-colored flags create a sense of a spiritual home that is celebratory and alert. The complex includes several small resting halls for the visiting villagers.",
        "vedicReferences": "Mostamanu is celebrated in the local oral epics as the supreme site where the cloud-deva personally established his throne to serve the mountain people.",
        "deepInsights": "The rain god represents the truth that the human survival is intimately connected with the grace of the nature. Mostamanu teaches that the gratitude for the simple elements is the highest form of the spiritual awareness.",
        "ancientLore": "Lore tells that the first raindrops of the monsoon always fall on the roof of the Mostamanu temple before touching the valley below. Another legend says that the deity personally rides a cloud over the fields at night to ensure the health of the crops.",
        "keyRituals": [
                {
                        "name": "Varsha Prarthana (Rain Prayer)",
                        "description": "The ritual performed during the times of the drought to seek the divine intervention for the rain."
                },
                {
                        "name": "Mostamanu Mela Jaagar",
                        "description": "Participating in the traditional night-long ritual of chanting and drumming during the annual fair."
                },
                {
                        "name": "Crop Offering",
                        "description": "Offering the first harvest of the grain to the deity to seek the continued prosperity of the family."
                },
                {
                        "name": "Ridge-Top Sky Meditation",
                        "description": "Sitting in the temple courtyard to practice the silent meditation while focusing on the movement of the clouds."
                }
        ],
        "highlights": [
                {
                        "name": "The High-Altitude Shrine",
                        "description": "The sacred heart of the temple where the image of the Rain God is worshipped."
                },
                {
                        "name": "The Fair Grounds",
                        "description": "The massive courtyard that hosts one of the largest folk gatherings in the Eastern Kumaon."
                },
                {
                        "name": "The Snow Peak Gallery",
                        "description": "The spectacular vantage point offering views of the high Himalayan giants of India and Nepal."
                },
                {
                        "name": "The Ancient Stone Altar",
                        "description": "The foundation of the temple believed to be the specific spot where the deity first manifested."
                }
        ],
        "travelInfo": {
                "bestTime": "August-September (during the annual fair) and the spring months of March-April.",
                "howToReach": "Located 6km from Pithoragarh town. Easily accessible by road; regular taxis run from the town center.",
                "nearestAirport": "Pithoragarh Airport (Naini Saini).",
                "nearestRailway": "Tanakpur Railway Station."
        },
        "tips": [
                "Visit during the annual fair to experience the true scale of the local faith and the vibrant Kumaoni folk culture.",
                "The temple offers one of the best spots for photography in the Pithoragarh region; carry your camera for the panoramic views.",
                "Maintain the sanctity of the ritual spaces; although it is a popular viewpoint, it remains a site of intense local devotion."
        ],
        "faqs": [
                {
                        "question": "Who is Mostamanu?",
                        "answer": "He is the supreme rain god and the presiding folk deity of the Pithoragarh (Sor) valley."
                },
                {
                        "question": "When is the big fair?",
                        "answer": "The Mostamanu Mela is held annually in the month of August or September, attracting thousands of devotees."
                },
                {
                        "question": "What can we see from the temple?",
                        "answer": "It offers panoramic views of the Pithoragarh town, the Sor valley, and the massive snow peaks of the Himalayas."
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
    'Chandrabani', 
    'chandrabani-temple-dehradun', 
    'Sacred Destination', 
    'uk', 
    'The "Sanctuary of Rishi Gautam", Chandrabani is an ancient spiritual landmark in Dehradun. It is a site of absolute Vedic authority and forest resonance, being the legendary spot where the great sage Gautam meditated and where the celestial stream Gautam Kund is located, representing the absolute manifestation of the Rishi traditions and the profound energy of the nature-based penance.', 
    '385.2', 
    '265.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Forest Home of the Sages and the Sanctuary of the Celestial Stream', 
    'Chandrabani Dehradun | Uttarakhand, Rishi Gautam & Ancient Lore', 
    'Experience the profound silence of Chandrabani. Discover the Gautam Kund, the legend of the ancient sages, and the profound energy of the Dehradun pilgrimage.', 
    'Chandrabani, Dehradun, Rishi Gautam, Gautam Kund, Uttarakhand, Hindu Pilgrimage, Ancient Lore, Forest Temple', 
    '268', 
    '{
        "spiritualEssence": "Chandrabani is the manifestation of the divine as the supreme discipline and the absolute purity of the forest life. The energy here is ancient, watery, and intensely tranquil. It is the site where the earth meets the celestial streams. The vibration is one of ''Tapa'' (Penance) and the absolute clarity of the Vedic science. As a serene temple surrounded by lush green forests on the outskirts of Dehradun, it represents the spiritual womb of the Doon valley. A visit here is believed to grant the devotee the absolute depth of the spiritual insight and the blessing of the physical and mental purification. The air is always vibrant with the scent of the wild flowers and the constant, rhythmic sound of the flowing stream and the bird-song.",
        "longDescription": "Chandrabani (also known as Gautam Kund) is a site of immense spiritual significance. According to the legend, the great sage Gautam lived and meditated here with his family. The site is famous for its natural water spring (Gautam Kund), which is believed to have been manifested by the sage for his daily rituals. The temple complex is simple and peaceful, attracting those looking for a quiet space for meditation and prayer. It is also a favorite spot for the nature lovers and the bird watchers due to its pristine forest environment. Legend tells that even the celestial beings visit this spot to pay their respects to the legacy of the Maharishi. It is a site where the highest level of Himalayan rishi-culture and the most serene valley ecology are perfectly unified.",
        "spiritualArchitecture": "The architecture of Chandrabani is a spectacular display of the traditional forest-shrine style with a focus on the natural integration and the simplicity. The complex features a small central shrine dedicated to the Lord Shiva and a series of paved steps leading to the sacred Gautam Kund. A unique feature is the presence of the numerous small alcoves and the stone platforms beneath the ancient trees where seekers can sit for meditation. The architecture is designed to minimize the visual obstruction of the surrounding green canopy. The use of the simple white-washed walls and the natural stone flooring create a sense of a spiritual home that is both humble and sacred. The complex includes several small rooms for the priests and the visiting seekers.",
        "vedicReferences": "Chandrabani is celebrated in the local oral traditions as the supreme site where the ''Nyaya'' (Logic) philosophy was refined by the sage Gautam in the silence of the forest.",
        "deepInsights": "The celestial stream represents the truth that the divine grace flows wherever there is the sincere effort. Chandrabani teaches that the spirit must become as clear and as constant as the forest spring.",
        "ancientLore": "Lore tells that the water of the Gautam Kund never dries up, even in the harshest summer, proving the sage''s power over the elements. Another legend says that the birds of Chandrabani are the transformed disciples of the Maharishi, who still chant the Vedic verses in the form of their songs.",
        "keyRituals": [
                {
                        "name": "Gautam Kund Marjan",
                        "description": "The ritual of sprinkled the sacred spring water over the self to seek the purification from the mental distractions."
                },
                {
                        "name": "Rishi-Vrata Meditation",
                        "description": "Sitting in the forest temple to practice the silent meditation in the tradition of the Maharishi Gautam."
                },
                {
                        "name": "Aranya Arati (Forest Light)",
                        "description": "The ritual of offering light to the deities at dusk to seek the harmony with the natural spirits."
                },
                {
                        "name": "Vedic Chanting (Doon)",
                        "description": "Participating in the collective reading of the ancient verses in the temple courtyard to seek the intellectual clarity."
                }
        ],
        "highlights": [
                {
                        "name": "The Gautam Kund",
                        "description": "The sacred natural spring believed to be manifested by the power of the sage Gautam."
                },
                {
                        "name": "The Forest Shrine",
                        "description": "The peaceful heart of the complex where the energy of the ancient sages is most accessible."
                },
                {
                        "name": "The Ancient Peepal Grove",
                        "description": "The collection of the centuries-old trees that provide a canopy of silence over the temple."
                },
                {
                        "name": "The Nature Trail",
                        "description": "The beautiful and spiritually charged path that leads through the surrounding forests."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the forest and the spring are most vibrant after the monsoon and during the spring).",
                "howToReach": "Located 7km from the Dehradun city center on the Dehradun-Delhi road. Easily accessible by rickshaw or taxi.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Visit in the early morning to enjoy the bird-song and the absolute silence of the forest environment.",
                "Carry a bottle of water and wear comfortable walking shoes if you plan to explore the surrounding trails.",
                "Maintain the cleanliness of the spring and the forest; do not use soap or detergents in the sacred Gautam Kund."
        ],
        "faqs": [
                {
                        "question": "Who was Rishi Gautam?",
                        "answer": "He was one of the Sapt Rishis (seven great sages) and the founder of the Nyaya school of the Indian philosophy."
                },
                {
                        "question": "What is Gautam Kund?",
                        "answer": "It is a sacred natural water spring at Chandrabani, believed to be the spot where the sage performed his daily ablutions."
                },
                {
                        "question": "Can I meditate there?",
                        "answer": "Yes, the temple and the surrounding forest provide an exceptionally peaceful environment for the meditation and the prayer."
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
    'Bhadraj Temple', 
    'bhadraj-temple-mussoorie', 
    'Sacred Destination', 
    'uk', 
    'The "Lord of the High Peaks", Bhadraj Temple is a supreme spiritual landmark located at the western end of the Mussoorie range. It is a site of absolute ancient authority and divine protection, dedicated to Lord Balbhadra (Balarama), representing the absolute manifestation of the strength and the profound energy of the mountain-summit devotion at the highest point of the Mussoorie hills.', 
    '378.5', 
    '252.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Peak of the Elder Brother and the Sanctuary of the 360-Degree Horizon', 
    'Bhadraj Temple Mussoorie | Uttarakhand, Lord Balbhadra & Ancient Lore', 
    'Experience the profound energy of Bhadraj Temple. Discover the highest peak of Mussoorie, the legend of the Lord Balbhadra, and the profound energy of the mountain pilgrimage.', 
    'Bhadraj Temple, Mussoorie, Lord Balbhadra, Balarama, Uttarakhand, Hindu Pilgrimage, Ancient Lore, High Altitude, Trekking', 
    '269', 
    '{
        "spiritualEssence": "Bhadraj is the manifestation of the divine as the supreme stability and the absolute power of the mountain-top vision. The energy here is vast, airy, and intensely expansive. It is the site where the earth-energy reaches its highest elevation in the Mussoorie range. The vibration is one of ''Bala'' (Strength) and the absolute perspective over the world of the forms. As a temple perched on a 2,200-meter peak offering views of the Doon valley, the Yamuna valley, and the high snow ranges, it represents the spiritual sentinel of the western Garhwal. A visit here is believed to grant the devotee the absolute lifting of the spirit and the blessing of the inner and outer strength. The air is always vibrant with the scent of the wild flowers and the constant, rhythmic sound of the high-altitude winds.",
        "longDescription": "Bhadraj Temple is dedicated to Lord Balbhadra, the elder brother of Lord Krishna. It is located on a peak that marks the western boundary of the Mussoorie hills. The temple is famous for its location, requiring a scenic 11km trek from the Cloud''s End area. The site provides a 360-degree view that is considered one of the best in the Himalayas. Legend tells that the Lord personally chose this peak to keep a watch over the cattle and the cowherds of the surrounding villages. The temple atmosphere is one of intense local devotion, especially during the annual fair held in August. It is a site where the highest level of Himalayan trekking experience and the most ancient pastoral faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Bhadraj Temple is a spectacular display of the simple mountain-top style with a focus on the structural resilience and the panoramic openness. The temple features a small stone shrine with a white-washed exterior and a series of open-air platforms that wrap around the ridge peak. A unique feature is the presence of several stone carvings of the Lord Balbhadra holding his symbolic plow (Hal). The architecture is designed to minimize the visual obstruction of the horizon, creating a sense of a spiritual home that is suspended in the clouds. The use of the vibrant red flags and the simple stone flooring create a sense of a spiritual retreat that is both alert and peaceful. The complex includes several small benches for the pilgrims to rest and contemplate the vast landscape.",
        "vedicReferences": "Bhadraj is celebrated in the local oral traditions as the supreme site where the ''Shesha-Avatar'' (the serpent incarnation) personally manifested to stabilize the mountains.",
        "deepInsights": "The high peak represents the truth that the spiritual elevation is the result of a long and steady journey. Bhadraj teaches that the highest strength is the one that allows us to see the entire creation from a place of peace.",
        "ancientLore": "Lore tells that the mountain peak personally rose higher to receive the footsteps of the Lord Balbhadra. Another legend says that the bells of the Bhadraj temple ring on their own during the equinox to signal the balance of the day and the night.",
        "keyRituals": [
                {
                        "name": "Bhadraj Peak Arati",
                        "description": "The ritual of offering light at dawn to seek the spiritual illumination and the strength."
                },
                {
                        "name": "Plow-Symbol Puja",
                        "description": "Offering prayers to the symbolic plow of the Lord to seek the prosperity and the stability of the family."
                },
                {
                        "name": "High-Peak Parikrama",
                        "description": "Walking around the temple summit to seek the alignment with the energy of the mountain-axis."
                },
                {
                        "name": "Horizon Dhyana",
                        "description": "Sitting on the temple platforms to practice the silent meditation while focusing on the distant snow peaks."
                }
        ],
        "highlights": [
                {
                        "name": "The High-Peak Shrine",
                        "description": "The sacred heart of the temple where the image of Lord Balbhadra is worshipped."
                },
                {
                        "name": "The 360-Degree Viewpoint",
                        "description": "The spectacular vantage point offering views of the Doon, Yamuna, and the Himalayan ranges."
                },
                {
                        "name": "The Cloud''s End Trail",
                        "description": "The beautiful and spiritually charged trekking path that leads to the temple summit."
                },
                {
                        "name": "The Ancient Rock Altar",
                        "description": "The foundation of the temple believed to be the specific spot where the deity first manifested."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (trekking is most pleasant from October to April).",
                "howToReach": "Located 11km from Mussoorie (Cloud''s End). Reached by a scenic trek through the forest and the ridges.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Start the trek early in the morning to catch the clear views and to complete the return journey before sunset.",
                "Carry adequate water and some snacks; there are very few facilities along the trekking trail.",
                "Maintain the cleanliness of the mountain trails; the area is a beautiful and ecologically sensitive zone."
        ],
        "faqs": [
                {
                        "question": "Who is the main deity?",
                        "answer": "The temple is dedicated to Lord Balbhadra (Balarama), the elder brother of Lord Krishna."
                },
                {
                        "question": "How long is the trek?",
                        "answer": "It is an 11km trek from Cloud''s End, which takes about 3-4 hours for an average hiker."
                },
                {
                        "question": "Are there any facilities at the top?",
                        "answer": "There is a small local shop for basic refreshments, but it is best to carry your own supplies."
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
    'Shedup Choephelling Monastery', 
    'shedup-choephelling-monastery-mussoorie', 
    'Sacred Destination', 
    'uk', 
    'The "Sanctuary of the First Refuge", Shedup Choephelling Monastery is a historic Buddhist landmark in Mussoorie. It is a site of absolute spiritual authority and Tibetan resonance, being the first place where the 14th Dalai Lama stayed after his flight from Tibet in 1959, representing the absolute manifestation of the compassion and the profound energy of the Himalayan Buddhist tradition in exile.', 
    '382.5', 
    '254.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Cradle of the Tibetan Legacy and the Sanctuary of the Compassionate Wisdom', 
    'Shedup Choephelling Monastery Mussoorie | Uttarakhand, Dalai Lama & Ancient Lore', 
    'Experience the profound peace of Shedup Choephelling. Discover the Happy Valley monastery, the legend of the first refuge, and the profound energy of the Mussoorie pilgrimage.', 
    'Shedup Choephelling, Mussoorie, Happy Valley, Buddhist Monastery, Dalai Lama, Tibetan Culture, Hindu Pilgrimage, Ancient Lore, Peace', 
    '270', 
    '{
        "spiritualEssence": "Shedup Choephelling is the manifestation of the divine as the supreme resilience and the absolute power of the compassionate heart. The energy here is serene, colorful, and intensely vibrant. It is the site where the ancient wisdom of Tibet was first anchored in the Indian soil. The vibration is one of ''Karuna'' (Compassion) and the absolute clarity of the Buddhist path. As a beautiful monastery perched on a ridge in the Happy Valley area of Mussoorie, it represents the spiritual heart of the Tibetan community in the region. A visit here is believed to grant the devotee the absolute peace of mind and the blessing of the inner harmony. The air is always vibrant with the scent of the butter lamps and the constant, rhythmic sound of the chanting and the spinning prayer wheels.",
        "longDescription": "The monastery was established in 1960 and served as the temporary residence of the 14th Dalai Lama for nearly a year before he moved to Dharamshala. It is located in the Happy Valley, the first Tibetan settlement in India. The monastery features a beautifully decorated prayer hall with a large statue of the Buddha and intricate thangka paintings. The site provides spectacular views of the Doon valley and the surrounding hills. It is a favorite spot for the seekers of the peace and the students of the Tibetan culture. The monastery complex also includes a library and a school for the young monks. It is a site where the highest level of Himalayan Buddhist art and the most intense history of the Tibetan people are perfectly unified.",
        "spiritualArchitecture": "The architecture of Shedup Choephelling is a spectacular display of the traditional Tibetan style with a focus on the vibrant colors and the symbolic ornamentation. The monastery features a multi-story building with a grand prayer hall, topped by the golden roofs and the dharma-wheels. A unique feature is the presence of the long rows of the prayer wheels (Mani Wheels) that surround the outer walls. The architecture is designed to lead the visitor through a visual and a kinetic experience of the dharma. The use of the bright reds, yellows, and the blues against the white walls create a sense of a spiritual oasis that is celebratory and sacred. The complex includes several small meditation rooms and a beautifully maintained garden with the stupas.",
        "vedicReferences": "Shedup Choephelling is celebrated in the modern Buddhist history as the supreme site where the ''Buddha-Dharma'' was preserved for the benefit of the global community.",
        "deepInsights": "The first refuge represents the truth that the spirit can find a home even in the displacement. The monastery teaches that the highest wisdom is the one that creates the peace in the face of the adversity.",
        "ancientLore": "Lore tells that the air of the Happy Valley was personally blessed by the Dalai Lama to ensure that it would always remain a sanctuary for the seekers. Another legend says that the lights of the monastery can be seen as a spiritual beacon by the travelers in the Doon valley below.",
        "keyRituals": [
                {
                        "name": "Mani Wheel Spinning",
                        "description": "The ritual of spinning the prayer wheels to release the prayers for the benefit of all the sentient beings."
                },
                {
                        "name": "Morning Buddha Chanting",
                        "description": "Participating in the collective prayers with the monks to seek the mental purification and the peace."
                },
                {
                        "name": "Butter Lamp Offering",
                        "description": "Lighting the traditional lamps in the prayer hall to seek the spiritual illumination."
                },
                {
                        "name": "Happy Valley Walk",
                        "description": "The ritual of walking through the Tibetan settlement to experience the vibrant culture and the energy of the refuge."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Prayer Hall",
                        "description": "The sacred heart of the monastery featuring the large Buddha statue and the thangkas."
                },
                {
                        "name": "The Dalai Lama Memorial",
                        "description": "The space dedicated to the history of the 14th Dalai Lama''s stay at the monastery."
                },
                {
                        "name": "The Prayer Wheel Rows",
                        "description": "The unique and meditative paths lined with the hundreds of the Tibetan prayer wheels."
                },
                {
                        "name": "The Doon Valley Viewpoint",
                        "description": "The balcony offering spectacular views of the hills and the plains below."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the monastery is particularly peaceful in the spring and the autumn).",
                "howToReach": "Located in the Happy Valley area of Mussoorie. Easily accessible by road or a pleasant walk from the Library Chowk.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Dehradun Railway Station."
        },
        "tips": [
                "Maintain absolute silence while inside the prayer hall; the monks are often engaged in the deep study or the meditation.",
                "Dress modestly and remove your shoes before entering the main shrine area.",
                "Take some time to talk to the monks; they are usually very friendly and willing to share the stories of the monastery''s history."
        ],
        "faqs": [
                {
                        "question": "Why is it historic?",
                        "answer": "It was the first residence of the 14th Dalai Lama in India after he fled Tibet in 1959."
                },
                {
                        "question": "Can I visit the prayer hall?",
                        "answer": "Yes, the main prayer hall is open to the visitors during the daytime; please maintain the decorum."
                },
                {
                        "question": "Where is Happy Valley?",
                        "answer": "It is at the western end of the Mussoorie town, known as the first Tibetan settlement in India."
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
    'Binsar Mahadev', 
    'binsar-mahadev-temple-ranikhet', 
    'Sacred Destination', 
    'uk', 
    'The "Lord of the Cedar Forests", Binsar Mahadev is an ancient Shiva temple located in a dense deodar forest near Ranikhet. It is a site of absolute ancient authority and natural resonance, being one of the most serene forest shrines in the Kumaon region, representing the absolute manifestation of the Lord as the Master of the Stillness and the profound energy of the high-altitude pine-cedar meditation.', 
    '515.2', 
    '245.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Guardian of the Cedar Ridges and the Sanctuary of the Forest Silence', 
    'Binsar Mahadev Ranikhet | Uttarakhand, Lord Shiva & Ancient Lore', 
    'Experience the profound silence of Binsar Mahadev. Discover the deodar shrine, the legend of the forest Lord, and the profound energy of the Ranikhet pilgrimage.', 
    'Binsar Mahadev, Ranikhet, Uttarakhand, Lord Shiva, Deodar Forest, Hindu Pilgrimage, Ancient Lore, High Altitude, Peace', 
    '271', 
    '{
        "spiritualEssence": "Binsar Mahadev is the manifestation of the divine as the supreme stillness and the absolute depth of the natural sanctuary. The energy here is cool, deodar-scented, and intensely heavy with peace. It is the site where the high-altitude forest becomes a cathedral of the spirit. The vibration is one of ''Aranya-Dhyana'' (Forest Meditation) and the absolute clarity of the detached existence. As a beautiful temple complex tucked away in a deep valley surrounded by some of the oldest deodar trees in the Kumaon, it represents the spiritual lungs of the central ridges. A visit here is believed to grant the devotee the absolute removal of the worldly stress and the blessing of the inner verticality. The air is always vibrant with the scent of the cedar resin and the constant, rhythmic sound of the wind through the high-altitude branches.",
        "longDescription": "The Binsar Mahadev temple dates back to the 9th-10th centuries and is dedicated to Lord Shiva. It is situated at an altitude of approximately 2,480 meters. The temple is famous for its location, requiring a drive through a spectacularly dense forest of cedar, oak, and rhododendron. It features a beautiful image of the Lord Shiva, Goddess Parvati, and the Lord Ganesha. Nearby is a sacred water spring and an ashram for the seekers. Legend tells that the temple was built in a single night by the supernatural beings who were sent by the Lord to bless the local rulers. The site is a favorite spot for the serious practitioners of the Yoga and those looking for an absolute escape from the modern noise. It is a site where the highest level of Himalayan forest aesthetic and the most ancient Shaivite mysticism are perfectly unified.",
        "spiritualArchitecture": "The architecture of Binsar Mahadev is a spectacular display of the traditional Kumaoni stone style with a focus on the integration with the massive deodar trunks. The temple features a central stone shrine with a low, wide shikhara and a series of paved courtyards that wrap around the ancient trees. A unique feature is the use of the dark, weathered stone that matches the shadows of the forest. The architecture is designed to create a sense of a spiritual clearing that is both hidden and protective. The use of the modest materials and the beautifully maintained herbal gardens create a sense of a spiritual home that is both ancient and inviting. The complex includes several small meditation cells and a traditional ashram kitchen.",
        "vedicReferences": "Binsar Mahadev is celebrated in the local oral traditions as the supreme site where the Lord personally manifested his ''Vana-Jyoti'' (Forest Light) to guide the mountain sages.",
        "deepInsights": "The cedar forest represents the truth that the spirit must grow tall and deep in its pursuit of the divine. Binsar Mahadev teaches that the highest peace is found in the absolute embrace of the silence.",
        "ancientLore": "Lore tells that the deodar trees of Binsar are the transformed sages who chose to stay with the Lord for eternity. Another legend says that the water of the temple spring never freezes, even in the harshest Himalayan winter, proving the warmth of the divine presence.",
        "keyRituals": [
                {
                        "name": "Binsar Mahadev Jal-Puja",
                        "description": "Offering sacred water to the Shiva Lingam to seek the stability and the peace for the family."
                },
                {
                        "name": "Cedar-Grove Dhyana",
                        "description": "Sitting in the surrounding deodar forest to practice the silent meditation while focusing on the sound of the wind."
                },
                {
                        "name": "Forest Arati",
                        "description": "The ritual of offering light at dusk to seek the harmony with the spirits of the mountain and the trees."
                },
                {
                        "name": "Rudra-Japa (Binsar)",
                        "description": "Chanting the names of the Lord Shiva in the temple courtyard to seek the absolute purification of the mind."
                }
        ],
        "highlights": [
                {
                        "name": "The Ancient Stone Shrine",
                        "description": "The sacred heart of the temple where the energy of the Lord Shiva is most intensely felt."
                },
                {
                        "name": "The Deodar Forest Cathedral",
                        "description": "The spectacular high-altitude forest that surrounds the temple complex."
                },
                {
                        "name": "The Sacred Forest Spring",
                        "description": "A natural water source believed to have the spiritual and the healing properties."
                },
                {
                        "name": "The Binsar Ashram",
                        "description": "The peaceful residential area for the seekers and the students of the Vedic wisdom near the temple."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the forest is most beautiful in the spring and the early winter).",
                "howToReach": "Located 15km from Ranikhet. Reached by road; taxis are regularly available from Ranikhet and Almora.",
                "nearestAirport": "Pantnagar Airport.",
                "nearestRailway": "Kathgodam Railway Station."
        },
        "tips": [
                "Visit in the early morning to experience the forest at its most silent and to see the morning mist through the deodars.",
                "Carry a light jacket as the temple is located at a high altitude and the forest shade can be quite cold even in the summer.",
                "Maintain the absolute silence of the forest trails; the area is a dedicated sanctuary for the spiritual practice."
        ],
        "faqs": [
                {
                        "question": "Who built the temple?",
                        "answer": "Historical evidence points to the 9th-10th centuries, likely built by the local rulers or the Kumaoni kings."
                },
                {
                        "question": "How high is the temple?",
                        "answer": "It is located at an altitude of approximately 2,480 meters (8,100 feet)."
                },
                {
                        "question": "Can I stay there?",
                        "answer": "There are basic ashram facilities near the temple for the seekers who wish to engage in the serious spiritual practice."
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
    'Jhalmali Devi', 
    'jhalmali-devi-temple-pauri', 
    'Sacred Destination', 
    'uk', 
    'The "Mystical Ridge Goddess", Jhalmali Devi is a high-altitude Shakti shrine located on a ridge in the Pauri Garhwal region. It is a site of absolute folk authority and protective resonance, being a major center for the local faith in the divine Mother as the guardian of the mountain passes, representing the absolute manifestation of the Shakti and the profound energy of the ridge-peak devotion.', 
    '490.2', 
    '255.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Radiance of the High Pass and the Sanctuary of the Ridge Mother', 
    'Jhalmali Devi Pauri | Uttarakhand, Shakti & Ancient Lore', 
    'Experience the profound energy of Jhalmali Devi. Discover the ridgetop Shakti shrine, the legend of the mountain Mother, and the profound energy of the Pauri pilgrimage.', 
    'Jhalmali Devi, Pauri Garhwal, Uttarakhand, Shakti Shrine, Hindu Pilgrimage, Ancient Lore, High Altitude, Mountain Pass', 
    '272', 
    '{
        "spiritualEssence": "Jhalmali Devi is the manifestation of the divine as the supreme radiance and the absolute power of the protective presence on the ridges. The energy here is bright, expansive, and intensely vibrant. It is the site where the Goddess is believed to shimmer (Jhalmal) with the solar energy. The vibration is one of ''Tejas'' (Brilliance) and the absolute clarity of the mountain path. As a temple perched on a high ridge offering views of the central Garhwal and the distant snow peaks, it represents the spiritual sentinel of the Pauri-Almora border. A visit here is believed to grant the devotee the absolute removal of the inner darkness and the blessing of the divine protection during the journeys. The air is always vibrant with the scent of the wild mountain flowers and the constant, rhythmic sound of the high-altitude wind.",
        "longDescription": "Jhalmali Devi is a highly revered shrine among the local communities of Pauri and the neighboring districts. The temple is famous for its location on a scenic ridge and the unique manifestation of the Goddess. Legend tells that the deity personally appeared on this pass to protect the travelers from the dangerous mountain spirits and the wild animals. The temple atmosphere is one of intense local devotion and faith. It is said that the Goddess personally guides the lost travelers during the heavy fog. The site is a critical center for the local folk festivals and attract thousands of visitors during the Navratri. It is a site where the highest level of Himalayan ridge-geography and the most vibrant folk faith are perfectly unified.",
        "spiritualArchitecture": "The architecture of Jhalmali Devi is a spectacular display of the traditional mountain ridge style with a focus on the simplicity and the exposure to the elements. The temple features a central stone shrine with a white-washed exterior and a series of paved courtyards that wrap around the mountain top. A unique feature is the presence of numerous bells and the vibrant red flags that catch the high-altitude winds. The architecture is designed to emphasize the exposure to the elements and the isolation of the peak, creating a sense of a spiritual fortress. The use of the vibrant colors and the simple stone construction create a sense of a spiritual home that is anchored to the rock of the ridge. The complex includes several small meditation spots near the ancient trees.",
        "vedicReferences": "Jhalmali Devi is celebrated in the local oral epics as the supreme site where the Mother personally manifested her shimmer to guide the mountain heroes.",
        "deepInsights": "The shimmering Goddess represents the truth that the divine light is always present, even in the most remote corners of the world. Jhalmali Devi teaches that the spirit must be as bright and as constant as the mountain sun.",
        "ancientLore": "Lore tells that the bells of the Jhalmali temple can be heard in the celestial realms during the clear autumn nights. Another legend says that the deity personally materializes a lamp on the ridge during the heavy monsoons to guide the travelers.",
        "keyRituals": [
                {
                        "name": "Jhalmali Devi Arati",
                        "description": "The ritual of offering light at dawn to seek the spiritual awakening and the protection."
                },
                {
                        "name": "Ridge-Dhwaja Puja",
                        "description": "Tying the sacred flags at the temple summit to seek the blessing for the family and the journeys."
                },
                {
                        "name": "Shakti Ridge Japa",
                        "description": "Performing the repetitive chanting of the Devi mantras while facing the snow peaks at sunrise."
                },
                {
                        "name": "Pass-Guard Offering",
                        "description": "Offering simple forest flowers and grains to the Goddess to seek the safe passage through the mountains."
                }
        ],
        "highlights": [
                {
                        "name": "The Main Ridge Shrine",
                        "description": "The sacred heart of the temple where the energy of the Goddess is most intense."
                },
                {
                        "name": "The Panoramic Viewpoint",
                        "description": "The spectacular vantage point offering views of the Pauri, Almora, and the Himalayan ranges."
                },
                {
                        "name": "The Ancient Stone Altar",
                        "description": "The foundation of the temple believed to be the specific spot where the deity first manifested."
                },
                {
                        "name": "The High-Altitude Forest Grove",
                        "description": "The beautiful and serene forest surrounding the temple peak, offering a peaceful space for meditation."
                }
        ],
        "travelInfo": {
                "bestTime": "Throughout the year (the views are most clear from October to March).",
                "howToReach": "Located on the Pauri-Thalisain road. Reached by road; regular taxis and buses run from Pauri and Kotdwar.",
                "nearestAirport": "Jolly Grant Airport, Dehradun.",
                "nearestRailway": "Kotdwar Railway Station."
        },
        "tips": [
                "Visit in the early morning to enjoy the sunrise over the snow peaks; the light on the ridge is exceptionally pure.",
                "The weather can be quite windy and cold at this altitude; carry a light jacket even in the summer months.",
                "Respect the local folk traditions and the silence of the temple premises; it is a site of deep meditation for many local practitioners."
        ],
        "faqs": [
                {
                        "question": "Who is Jhalmali Devi?",
                        "answer": "She is a manifestation of the Shakti, worshipped as the supreme guardian and the shimmering Goddess of the high ridges in Pauri Garhwal."
                },
                {
                        "question": "Is there a road to the temple?",
                        "answer": "Yes, the temple is located on a ridge that is accessible by the main road, followed by a very short walk within the complex."
                },
                {
                        "question": "When are the main festivals?",
                        "answer": "The Navratri months (March-April and October-November) are the most vibrant times at the temple."
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
    'Bhimashankar', 
    'bhimashankar', 
    'Jyotirlinga', 
    'mh', 
    'Hidden in the dense forests of the Sahyadri mountains near Pune, Bhimashankar is the site where Lord Shiva destroyed the demon Tripura. It is the source of the Bhima river and a center of immense primordial energy.', 
    '150.2', 
    '450.5', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1621370511871-39fe2475960d?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Protector of the Sahyadri Ranges', 
    'Bhimashankar Jyotirlinga | Pune, Forest Legends & Ancient Lore', 
    'Discover the spiritual power of Bhimashankar. Explore the legend of the Tripura demon, the Bhima river source, and the ancient Nagara architecture.', 
    'Bhimashankar, Jyotirlinga, Maharashtra, Lord Shiva, Bhima River, Pune, Hindu Pilgrimage, Ancient Lore, Sahyadri', 
    '19', 
    '{
        "spiritualEssence": "Bhimashankar is the energy of the divine as the fierce protector. Located in the heart of a wildlife sanctuary, the vibration here is raw, untamed, and intensely grounding. It is the site where the sweat of the Lord, after his battle with the demon Tripura, created the Bhima river. The energy is one of absolute power and the restoration of order in the universe. A visit here is believed to remove the fear of enemies and grant the strength to face life''s challenges with unwavering courage. The atmosphere is saturated with the scents of the ancient forest and the sound of bells echoing through the mountain mist.",
        "longDescription": "The origin of Bhimashankar is linked to the destruction of the demon Tripurasura. Shiva took a massive form (Bhima) to defeat the demon and his three flying cities (Tripura). After the victory, the Lord agreed to stay here as a Jyotirlinga at the request of the Gods and sages. The temple is an architectural transition, featuring a blend of the Nagara and the Hemadpanti styles. The current structure was patronized by the Peshwa statesman Nana Phadnavis in the 18th century. The temple is situated in a deep valley, surrounded by 100-foot tall trees and rare wildlife, including the Malabar Giant Squirrel (Shekru). The entire region is considered sacred, with several smaller shrines and water bodies like the Gupta Bhimashankar and the Hanuman Lake adding to its spiritual geography.",
        "spiritualArchitecture": "The temple is built in the Nagara style, with a unique black stone structure that has weathered centuries of monsoon. The Shikhara is intricately carved with figures of various deities and celestial beings. The temple courtyard is spacious, featuring a massive bronze bell that was captured from the Portuguese by the Marathas. The inner sanctum is located at a lower level than the courtyard, a common feature in many ancient Shiva temples, representing the cave of the heart.",
        "vedicReferences": "Bhimashankar is mentioned in the Shiva Purana and is considered one of the five Jyotirlingas in Maharashtra. It is celebrated as the site of the Tripurantaka manifestation of Shiva.",
        "deepInsights": "Bhimashankar represents the solar plexus (Manipura) chakra of the national spiritual body. It is about the transformation of raw power into divine will. The forest setting signifies that the divine resides even in the most remote and untamed parts of our own consciousness.",
        "ancientLore": "Lore tells of the demon Bhima (son of Kumbhakarna) who tried to destroy the Jyotirlinga, but Shiva appeared from the stone and reduced him to ashes. Another legend says that the river Bhima was created from the sweat of Shiva''s brow, making it as sacred as the Ganges itself.",
        "keyRituals": [
                {
                        "name": "Maha Puja",
                        "description": "The elaborate morning worship involving the offerings of fruits, flowers, and Vedic chants."
                },
                {
                        "name": "Rudrabhishek",
                        "description": "The continuous bathing of the lingam with water from the Bhima river source."
                },
                {
                        "name": "Evening Aarti",
                        "description": "The ritual of lamps performed as the sun sets over the Sahyadri mountains."
                }
        ],
        "highlights": [
                {
                        "name": "Gupta Bhimashankar",
                        "description": "The hidden spot in the forest where the Bhima river is said to originate."
                },
                {
                        "name": "Bhimashankar Wildlife Sanctuary",
                        "description": "Home to the Malabar Giant Squirrel and diverse flora and fauna."
                },
                {
                        "name": "Hanuman Lake",
                        "description": "A serene lake located near the temple complex."
                }
        ],
        "travelInfo": {
                "bestTime": "August to February.",
                "howToReach": "110km from Pune, well connected by road. Regular buses and taxis are available.",
                "nearestAirport": "Pune International Airport.",
                "nearestRailway": "Pune Junction."
        },
        "tips": [
                "Be prepared for a walk as vehicles are parked at a distance from the main temple.",
                "Carry a raincoat if visiting during the monsoon as the Sahyadris receive heavy rainfall.",
                "Do not feed the monkeys near the temple area."
        ],
        "faqs": [
                {
                        "question": "How many steps are there to the temple?",
                        "answer": "The temple is located in a valley, so you need to climb down about 200-250 steps from the parking area."
                },
                {
                        "question": "Is there a direct bus from Mumbai?",
                        "answer": "Yes, several MSRTC (State transport) buses run directly from Mumbai to Bhimashankar."
                },
                {
                        "question": "Can I see the Giant Squirrel here?",
                        "answer": "Yes, they are active in the early morning and late afternoon in the surrounding forest."
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
    'Grishneshwar (Ellora)', 
    'grishneshwar', 
    'Jyotirlinga', 
    'mh', 
    'Located near the world-famous Ellora Caves, Grishneshwar is the 12th and final Jyotirlinga. It is the site of the Lord of Compassion, built by the legendary Queen Ahilyabai Holkar.', 
    '140.5', 
    '430.8', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Final Gateway of Divine Compassion', 
    'Grishneshwar Jyotirlinga | Ellora, Ahilyabai Holkar & Ancient Lore', 
    'Step into the sacred silence of Grishneshwar. Discover the legend of the devotee Grushma, its architectural beauty, and its connection to the Ellora caves.', 
    'Grishneshwar, Jyotirlinga, Maharashtra, Lord Shiva, Ellora, Aurangabad, Hindu Pilgrimage, Ancient Lore, Compassion', 
    '20', 
    '{
        "spiritualEssence": "Grishneshwar is the manifestation of the Lord as the embodiment of infinite compassion (Grushna). As the final Jyotirlinga, it represents the completion of the spiritual journey. The energy here is serene, intimate, and deeply restorative. The vibration is one of forgiveness and the mending of broken hearts. It is believed that a visit here brings an end to the cycle of suffering and grants the devotee the peace that surpasses all understanding. The temple stands as a testament to the power of a single devotee''s faith, which brought the Lord from his cosmic abode to this earthly site.",
        "longDescription": "The legend of Grishneshwar tells of a devout woman named Grushma. She was a great devotee of Shiva and would immerse a lingam in a nearby lake daily as part of her worship. Her son was killed out of jealousy by her co-wife, but Grushma continued her worship with unwavering faith. When she immersed the lingam that day, her son emerged from the water alive. Shiva appeared and agreed to reside here as Grishneshwar (the Lord of Grushma). The current temple is a masterpiece of the 18th century, rebuilt by Queen Ahilyabai Holkar of Indore. It is made of red stone and is one of the few Jyotirlingas where the structure remains largely in its original, meticulously preserved state. Located just a kilometer from the UNESCO World Heritage site of Ellora, the temple is part of a landscape where art and spirituality have coexisted for millennia.",
        "spiritualArchitecture": "The temple is built in the North Indian Nagara style using red basalt stone. The five-tier spire (Shikhara) is intricately carved with figures of various deities, musicians, and celestial animals. The temple walls feature beautiful relief carvings of the various forms of Shiva. The inner sanctum is a small, quiet space that houses the Jyotirlinga, which is situated at the floor level. The temple courtyard is paved with stone and surrounded by high walls, creating a sense of sanctuary.",
        "vedicReferences": "Grishneshwar is mentioned in the Shiva Purana and is traditionally counted as the last of the twelve Jyotirlingas.",
        "deepInsights": "Grishneshwar represents the final dissolution of the ego into the ocean of divine love. It teaches that through devotion and the regular practice of worship (symbolized by Grushma''s daily immersion), the most impossible obstacles can be overcome.",
        "ancientLore": "Lore tells that the lake in which Grushma immersed the lingam is still charged with healing properties. Another legend says that the Ellora caves were carved by celestial beings who came down to pay homage to Grishneshwar during the night.",
        "keyRituals": [
                {
                        "name": "Jalabhishek",
                        "description": "The ritual bathing of the lingam with sacred water and milk."
                },
                {
                        "name": "Panchamrut Puja",
                        "description": "Worship using five sacred substances, symbolizing the purification of the five elements."
                },
                {
                        "name": "Evening Aarti",
                        "description": "A peaceful ritual of lamps that marks the end of the day''s worship."
                }
        ],
        "highlights": [
                {
                        "name": "Ellora Caves",
                        "description": "The world-famous rock-cut cave complex located just 1km away."
                },
                {
                        "name": "Daulatabad Fort",
                        "description": "A massive medieval hill fort situated nearby."
                },
                {
                        "name": "Ghrishneshwar Lake",
                        "description": "The sacred lake associated with the legend of Grushma."
                }
        ],
        "travelInfo": {
                "bestTime": "October to March.",
                "howToReach": "30km from Aurangabad (Sambhajinagar), well connected by road and rail.",
                "nearestAirport": "Aurangabad Airport.",
                "nearestRailway": "Aurangabad Railway Station."
        },
        "tips": [
                "Combine your visit with a tour of the Ellora and Ajanta caves.",
                "Male devotees must enter the inner sanctum bare-chested as per local tradition.",
                "Hire a guide to explain the intricate carvings on the temple exterior."
        ],
        "faqs": [
                {
                        "question": "Is there a dress code?",
                        "answer": "Yes, for entering the inner sanctum, men must be bare-chested and wear a dhoti or simple trousers. Women should wear traditional attire."
                },
                {
                        "question": "How far is it from Aurangabad?",
                        "answer": "It is approximately 30 kilometers and takes about 45 minutes to an hour by road."
                },
                {
                        "question": "What is the best time for Darshan?",
                        "answer": "Early morning (5 AM to 7 AM) is the best time for a peaceful experience."
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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

INSERT INTO "public"."spiritual_locations" (
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