-- BATCH 1: ULTRA ELITE SPIRITUAL PLACES (MAX VOLUME & DEPTH)
-- Locations: Badrinath, Kedarnath, Somnath, Kashi Vishwanath, Mahakaleshwar, Dwarka, Puri, Rameswaram, Vaishno Devi

-- 1. CLEANUP TABLE FOR BATCH 1
TRUNCATE TABLE "public"."spiritual_places";

-- 2. BADRINATH (Char Dham)
INSERT INTO "public"."spiritual_places"  (
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
);

-- 3. KEDARNATH (Jyotirlinga)
INSERT INTO "public"."spiritual_places"  (
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
);

-- 4. SOMNATH (Jyotirlinga)
INSERT INTO "public"."spiritual_places"  (
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
);

-- 5. KASHI VISHWANATH (Jyotirlinga)
INSERT INTO "public"."spiritual_places"  (
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
);

-- 6. MAHAKALESHWAR (Jyotirlinga & Shakti Peeth)
INSERT INTO "public"."spiritual_places"  (
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
);

-- 7. DWARKA (Char Dham)
INSERT INTO "public"."spiritual_places"  (
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
);

-- 8. PURI (Char Dham)
INSERT INTO "public"."spiritual_places"  (
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
);

-- 9. RAMESWARAM (Char Dham, Jyotirlinga & Shakti Peeth)
INSERT INTO "public"."spiritual_places"  (
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
);

-- 10. VAISHNO DEVI (Shakti Peeth)
INSERT INTO "public"."spiritual_places"  (
    "name", "slug", "type", "state_id", "description", "x", "y", "size", "images", "is_featured", "is_active", "tagline", "seo_title", "seo_description", "seo_keywords", "order_rank", "content"
) VALUES (
    'Vaishno Devi', 
    'vaishno-devi', 
    'Shakti Peeth', 
    'jk', 
    'Vaishno Devi is the supreme pilgrimage of the Divine Mother in the Trikuta mountains. The Goddess resides in a natural cave in the form of three self-manifested Pindis, representing the cosmic forces of creation, sustenance, and destruction.', 
    '165.5', 
    '50.2', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1590050752117-23a9d7fc244a?auto=format&fit=crop&w=1200&q=80'], 
    true, 
    true, 
    'The Sacred Call of the Cosmic Mother', 
    'Vaishno Devi Katra | Shakti Peeth, Trikuta Lore & Deep Insights', 
    'Experience the divine call of Maa Vaishno Devi. Discover the journey to Katra, the sacred Bhawan cave, and the blessings of the three Pindis.', 
    'Vaishno Devi, Katra, Shakti Peeth, Jammu, Trikuta Mountains, Durga, Hindu Pilgrimage, Maa Vaishno', 
    '9', 
    '{
        "spiritualEssence": "Vaishno Devi is the mother''s unconditional love. The trek is a spiritual ascent. The three Pindis represent creation, preservation, and transformation.",
        "longDescription": "Legend says Vaishnavi was pursued by Bhairon Nath. She stayed in Ardhkuwari for 9 months before enter the cave and beheading him. Bhairon was forgiven and granted a boon to be visited to complete the pilgrimage.",
        "spiritualArchitecture": "The Bhawan is located at 5,200 ft. The main cave is about 98 feet long. Modern structures have been built around the cave to manage millions of pilgrims.",
        "vedicReferences": "Vaishno Devi is revered as the Shakti of Vishnu. She is mentioned as a powerful deity in various regional texts and Puranic lore.",
        "localLegends": "Lore tells of Sridhar, who discovered the cave. Another legend says during Navratri, all gods descend to the cave to pay homage to the Mother.",
        "keyRituals": [
            {"name": "Atka Aarti", "description": "The morning and evening group worship inside the Bhawan."},
            {"name": "Panchamrit Snan", "description": "Sacred bathing of the Pindis at dawn and dusk."},
            {"name": "Bhairon Nath Darshan", "description": "The mandatory visit to the Bhairon temple after the main Darshan."}
        ],
        "highlights": [
            {"name": "Ardhkuwari", "description": "The cave where the Goddess meditated for nine months."},
            {"name": "Bhairon Ghati", "description": "The site of the Bhairon Nath temple at a higher altitude."},
            {"name": "Banganga", "description": "The holy river where pilgrims take a bath before the trek."}
        ],
        "travelInfo": {
            "bestTime": "March to October.",
            "howToReach": "Trek from Katra (12km); Battery cars and helicopter services are available.",
            "nearestAirport": "Jammu Airport (approx 50km).",
            "nearestRailway": "Shri Mata Vaishno Devi Katra Railway Station."
        },
        "tips": [
            "Book your Yatra Parcha online in advance.",
            "Avoid carrying heavy luggage during the trek.",
            "Carry a medical kit for common ailments like muscle pain."
        ],
        "faqs": [
            {"question": "How long is the trek?", "answer": "The trek from Katra to Bhawan is approximately 12 kilometers."},
            {"question": "Is there a battery car service?", "answer": "Yes, battery cars operate between Ardhkuwari and Bhawan for elderly and sick pilgrims."},
            {"question": "What is the Ardhkuwari cave significance?", "answer": "It is where the Goddess stayed for nine months, just like a child in a womb, hence the name ''Ardhkuwari''."}
        ]
    }'
);
