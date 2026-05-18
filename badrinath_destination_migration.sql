-- Delete existing duplicate entries for Badrinath to ensure a clean slate
DELETE FROM "public"."destinations" WHERE slug = 'badrinath';

-- Insert the comprehensive Badrinath Destination Entry
INSERT INTO "public"."destinations" (
    "id", 
    "name", 
    "slug", 
    "type", 
    "state_id", 
    "description", 
    "x", 
    "y", 
    "size", 
    "images", 
    "is_featured", 
    "is_active", 
    "tagline", 
    "seo_title", 
    "seo_description", 
    "seo_keywords", 
    "order_rank", 
    "content"
) VALUES (
    gen_random_uuid(), 
    'Badrinath', 
    'badrinath', 
    'Char Dham', 
    'uk', 
    'Nestled in the Garhwal Himalayas along the banks of the Alaknanda River, Badrinath is the supreme earthly abode of Lord Vishnu. It is the most vital of the Char Dham pilgrimages, revered for granting Moksha and unparalleled spiritual awakening.', 
    '230', 
    '125', 
    '15', 
    ARRAY['https://images.unsplash.com/photo-1626244675545-92db0f88126b?auto=format&fit=crop&w=1200&q=80'], 
    'true', 
    'true', 
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
        ]
    }'
);
